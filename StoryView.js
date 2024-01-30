import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView,Dimensions, Platform ,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Audio } from 'expo-av';
import NetInfo from '@react-native-community/netinfo';

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const isDesktop = windowWidth >= 1024;

const StoryView = ({ route, navigation }) => {
    const { language, voice, theme, characters,wordCount} = route.params;
    const [storyText, setStoryText] = useState('');
    const [sessionId] = useState(Math.random().toString(36).substr(2, 9));
    const [renderedStory, setRenderedStory] = useState(null); // Holds the rendered story component

    const [sound, setSound] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); // Add a new state for playing status
    const [isLoaded, setIsLoaded] = useState(false); // New state for loading status
    const [loadingMessage, setLoadingMessage] = useState('Generating Story');
    const [errorMessage, setErrorMessage] = useState(''); // New state for error message
    const [networkError, setNetworkError] = useState(false);


    const isPlayingRef = useRef(false);

    function RenderNetworkError() {
      return (
          <View style={styles.errorContainer}>
              <Text style={styles.errorText}>No internet connection. Please check your connection and try again.</Text>
          </View>
      );
  }
    function RenderLoading() {
      return (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white"  />
        <Text style={styles.storyText}>{loadingMessage}</Text>
    </View>
      );
  };

  const fetchWithTimeout = (url, options, timeout =65000) => {
    return Promise.race([
        fetch(url, options).catch(err => {
            console.log('Error in fetch: ', err);
            throw err;
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout: Server is taking too long to respond')), timeout))
    ]);
};


  useEffect(() => {
    const messages = ['Generating Story', 'Generating Image', 'Generating Audio',"Almost There", "Loading", "Please wait"];

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setLoadingMessage(messages[randomIndex]);
  }, 3000); // Change message every 3 seconds

  return () => clearInterval(interval); // Cleanup interval on component unmount
}, []);
  
function RenderStory({ story, image, audio }) {
        const [sound, setSound] = useState(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const isPlayingRef = useRef(false);
    
        useEffect(() => {
            return sound
                ? () => {
                    console.log('Unloading Sound');
                    sound.unloadAsync(); 
                }
                : undefined;
        }, [sound]);
    
        const playSound = async () => {
            try {
                await sound?.playAsync();
                setIsPlaying(true);
                isPlayingRef.current = true;
            } catch (error) {
                console.log('Error playing sound: ', error);
            }
        };

        useEffect(() => {
            // Load sound initially or when the audio URL changes
            loadSound();
    
            return () => {
                // Unload sound when the component is unmounted or audio URL changes
                sound?.unloadAsync();
            };
        }, [audio]);

        const loadSound = async () => {
            if (audio) {
                try {
                    const { sound: newSound } = await Audio.Sound.createAsync({ uri: audio });
                    setSound(newSound);
                } catch (error) {
                    console.log('Error loading sound: ', error);
                }
            }
        };
        
        const pauseSound = async () => {
            try {
                await sound?.pauseAsync();
                setIsPlaying(false);
                isPlayingRef.current = false;
            } catch (error) {
                console.log('Error pausing sound: ', error);
            }
        };

        const restartAudio = async () => {
            try {
                await sound?.stopAsync();
                await sound?.setPositionAsync(0);
                await playSound();
            } catch (error) {
                console.log('Error restarting sound: ', error);
            }
        };


        const renderAudioControls = () => {
            const togglePlayPause = async () => {
                if (!isPlayingRef.current) {
                    await playSound();
                } else {
                    await pauseSound();
                }
            };
            
            return (
                <View style={styles.audioControlContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={restartAudio}>
                  <Ionicons
                    name='refresh'
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            );
          };

    console.log('Rendering Story');
    return (<>
            <ImageBackground
                source={{ uri: image }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {/* Move the audio controls into the ImageBackground */}
                <View style={styles.audioControlContainer}>
                    {renderAudioControls()}
                </View>
            </ImageBackground>
            <ScrollView style={styles.storyTextContainer}>
                <Text style={styles.storyText}>{story}</Text>
            </ScrollView></>
    );
};

    const togglePlayPause = async () => {
        if (!isPlayingRef.current) {
            await playSound();
        } else {
            await pauseSound();
        }
    };

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); 
            }
            : undefined;
    }, [sound]);

    const playSound = async () => {
        console.log('Loading and Playing Sound');
        let newSound;
        if (!sound) {
            const result = await Audio.Sound.createAsync(
                { uri: audioUrl },
                { shouldPlay: true }
            );
            newSound = result.sound;
            setSound(newSound);
        } else {
            // If already loaded, just play
            newSound = sound;
            await newSound.playAsync();
        }
        setIsPlaying(true);
        isPlayingRef.current = true;
    };
    
    // Function to pause the audio
    const pauseSound = async () => {
        console.log('Pausing Sound');
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
            isPlayingRef.current = false;
        }
    };

    const stopSound = async () => {
        console.log('Stopping Sound');
        if (sound) {
            await sound.stopAsync();
            await sound.setPositionAsync(0);
            isPlayingRef.current = false;
        }
    };


  
    const fetchStoryData = useCallback(async () => {
        try {
            const networkState = await NetInfo.fetch();

            if (!networkState.isConnected) {
                setNetworkError(true);
                setErrorMessage('No internet connection. Please check your connection and try again.');
                return;
            }

            const response = await fetchWithTimeout('https://galacticstories.com/app/api/story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language, voice, theme, characters, sessionId, wordCount }),
            });

            if (response.ok) { 
                const data = await response.json();
                setAudioUrl(data.audioUrl);
                setImageUrl(data.imageUrl);
                setStoryText(data.story);
                setIsLoaded(true);
                
                setRenderedStory(
                    <RenderStory
                        story={data.story}
                        image={data.imageUrl}
                        audio={data.audioUrl}
                    />
                );
            } else {
                setErrorMessage(error.message || 'An error occurred while fetching the story.');
            }

        } catch (error) {
            console.log('Error in fetchStoryData: ', error);

            setErrorMessage(error.message || 'An error occurred while fetching the story.');
        }
    }, [language, voice, theme, characters, sessionId, wordCount]);
  
    useEffect(() => {
        fetchStoryData();
    }, [fetchStoryData]);

  function RenderError() {
    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
    );
}
 


    return (
        <View style={styles.outerContainer}>

        <View style={styles.mainContainer}>
            {networkError ? <RenderNetworkError /> : errorMessage ? <RenderError /> : isLoaded ? renderedStory : <RenderLoading />}
        </View>
        </View>

    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: 'rgba(13, 1, 25, 1)', // Set the background color for the full screen
        alignItems: Platform.OS === 'web' ? 'center' : undefined, 

        justifyContent: Platform.OS === 'web' ? 'center' : undefined, 
    },
    mainContainer: {
        width: Platform.OS === 'web' && isDesktop ? '50%' : '100%', // Different width for web/desktop
        maxHeight: Platform.OS === 'web' ? '100%' : undefined, 
        flex: 1,

    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(13, 1, 25, 1)', // Set the background color for the full screen
    },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
},
    storyTextContainer: {
        flex: 1, 
        padding: 20,
        backgroundColor: 'rgba(13, 1, 25, 1)',
    },
      backgroundImage: {
        width: '100%',
        height: windowHeight * 0.35, // 25% of the screen height
        justifyContent: 'flex-end', // Align child views to the top
    },
    customHeader: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 30,
        left: 10,
        zIndex: 10,
        padding: 10,
        backgroundColor: 'rgba(13, 1, 25, 0.5)',
        borderRadius: 30,
      },
      storyText: {
        fontFamily: 'Montserrat',
        fontSize: 19,
        color: 'white',
        textAlign: 'justify',
      },
      audioControlContainer: {
        height: 55, 
        left: 0,
        borderRadius: 15,
        marginBottom:10,
        flexDirection: 'row',
        paddingHorizontal: 0,
        marginTop: 0, 
    },
      controlButton: {
        padding: 15,
        borderRadius: 25,
        marginHorizontal: 10, 
        backgroundColor: 'rgba(13, 1, 25, 0.5)',

      },
      controlButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat',
      },
});

export default StoryView;