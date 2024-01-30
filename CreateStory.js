import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Keyboard, Platform,Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

import RNPickerSelect from 'react-native-picker-select';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const isDesktop = windowWidth >= 1024;

const getResponsiveFontSize = () => {
  // Example of responsive font size calculation
  // You can adjust the divisor to control the size
  const baseFontSize = 16; // Base font size for small screens
  const scale = windowWidth / 300; // Scale based on screen width
  return baseFontSize * scale; 
};
const CreateStory = ({ navigation }) => {
  const [theme, setTheme] = useState('');
  const [characters, setCharacters] = useState('');
  const [language, setLanguage] = useState('English');
  const [voice, setVoice] = useState('alloy');
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wordCount, setWordCount] = useState('100');

  const languages = [
    "Afrikaans", "Arabic", "Armenian", "Azerbaijani", "Belarusian", "Bosnian", 
    "Bulgarian", "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch", 
    "English", "Estonian", "Finnish", "French", "Galician", "German", "Greek", 
    "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Italian", 
    "Japanese", "Kannada", "Kazakh", "Korean", "Latvian", "Lithuanian", 
    "Macedonian", "Malay", "Marathi", "Maori", "Nepali", "Norwegian", "Persian", 
    "Polish", "Portuguese", "Romanian", "Russian", "Serbian", "Slovak", 
    "Slovenian", "Spanish", "Swahili", "Swedish", "Tagalog", "Tamil", "Thai", 
    "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh"
  ];

  const wordCounts = ["100", "200", "300"];

  const voices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];

  const playSound = async (voice) => {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      const source = getAudioSource(voice);
      const { sound: newSound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();

      // When the audio finishes playing, reset the play button
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish && !status.isLooping) {
      setIsPlaying(false);
      // If the sound is not looping and just finished playing, reset the play state
    }
  };
  
  
  const getAudioSource = (voice) => {
    switch (voice) {
      case 'alloy':
        return require('./assets/sample_alloy.mp3');
      case 'echo':
        return require('./assets/sample_echo.mp3');
      case 'fable':
        return require('./assets/sample_fable.mp3');
      case 'onyx':
        return require('./assets/sample_onyx.mp3');
      case 'nova':
        return require('./assets/sample_nova.mp3');
      case 'shimmer':
        return require('./assets/sample_shimmer.mp3');
      default:
        return null;
    }
  };
  
  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);
  
  const renderLanguagePicker = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => setLanguage(value)}
        items={languages.map((lang) => ({ label: lang, value: lang }))}
        style={pickerSelectStyles}
        value={language}
        useNativeAndroidPickerStyle={false}
        placeholder={{

        }}
      />
    );
  };

  const renderWordCountPicker = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => setWordCount(value)}
        items={wordCounts.map((word) => ({ label: word, value: word }))}
        style={pickerSelectStyles}
        value={wordCount}
        useNativeAndroidPickerStyle={false}
        placeholder={{

        }}
      />
    );
  };

  const renderVoicePicker = () => {
    return (
      <View style={styles.voicePickerContainer}>
      <View style={styles.pickerSelectContainer}>
        <RNPickerSelect
          onValueChange={(value) => {
            setVoice(value);
            setIsPlaying(false); // Reset play state when a new voice is selected
          }}
          items={voices.map((voice) => ({ label: voice, value: voice }))}
          style={pickerSelectStyles}
          value={voice}
          useNativeAndroidPickerStyle={false}
          placeholder={{

          }}
        />
              </View>

              <TouchableOpacity
        style={styles.playButton}
        onPress={() => playSound(voice)}
        disabled={!voice}
      >
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={20}
          color="white"
        />
      </TouchableOpacity>
      </View>
    );
  };



  const navigateToStoryView = () => {
    navigation.navigate('Story View', { language, voice, theme, characters,wordCount });
  };


  return (
    <ImageBackground source={require('./assets/welcome.jpg')} style={styles.backgroundImage}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps='handled'
          extraScrollHeight={20} // Adjust this value as needed
          enableOnAndroid={true}
        >

            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create Your Story</Text>
            </View>
            
            <View style={styles.formContainer}>
              
              <Text style={styles.label}>Choose Voice:</Text>
          <View style={styles.pickerContainer}>
          
           {renderVoicePicker()}
          </View>

          


          <Text style={styles.label}>Choose Language:</Text>
          <View style={styles.pickerContainer}>
            {renderLanguagePicker()}
          </View>


            <Text style={styles.label}>Story Theme:</Text>
<TextInput
    style={styles.basicTextInputStyle}
    placeholder="Story theme"
    onChangeText={setTheme}
    value={theme}
    multiline={true}
    returnKeyType="done"
    keyboardType="default"
    onBlur={Keyboard.dismiss}
/>

<Text style={styles.label}>Special Characters:</Text>
<TextInput
    style={styles.basicTextInputStyle}
    placeholder="Special characters (separated by comma)"
    onChangeText={setCharacters}
    value={characters}
    multiline={true}
    returnKeyType="done"
    keyboardType="default"
    onBlur={Keyboard.dismiss}
/>


<Text style={styles.label}>Word count:</Text>

<View style={styles.pickerContainer}>
{renderWordCountPicker()}

</View>
            <TouchableOpacity style={styles.createButton} onPress={navigateToStoryView}>
              <Text style={styles.createButtonText}>Create Story</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    width: '80%', // Match width of other inputs
    marginVertical: 5,
    fontFamily: 'Montserrat',
  },
  inputAndroid: {
    fontSize: 16,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    width: '80%', // Match width of other inputs
    marginVertical: 5,
    fontFamily: 'Montserrat',
  },
  inputWeb:{
    fontSize: 16,
    borderWidth: 0,

    color: 'black',
    marginVertical: 5,
    fontFamily: 'Montserrat',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    outline: 'none', 
    boxShadow: 'none',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  basicTextInputStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: '80%',
    padding: 15,
    minHeight:'8%',
    marginVertical: 5,
    borderRadius: 10,
    fontFamily: 'Montserrat',
    fontSize: 16, // Use a fixed size for testing
    color: 'black',
  },
  voicePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Change to '100%' to ensure it takes the full width
    paddingHorizontal: 10, // Horizontal padding for inner space
  },
  pickerSelectContainer: {
    flex: 1, // Allow picker to fill the container but leave space for the button
  },

  scrollViewContainer: {
    flexGrow: 1, // Ensures that the container expands to fit the content
    paddingBottom: 20, // Add some padding to the bottom
    width: isDesktop ? '50%' : '100%', // Limit width on desktop
    alignSelf: 'center',

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? '1%' :'13%', // Responsive font size for web
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgb(247, 247, 247)',
    fontSize: 34,
    fontWeight: '500',
    letterSpacing: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  formContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  createButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop:30,

  },
  createButtonText: {
    fontFamily: 'Montserrat',
    fontSize: 26, // Adjust for '-' text
    color: 'black',
  },
  label: {
    fontFamily: 'Montserrat',
    color: 'white',
    fontSize: 23,
    marginBottom: 1,
    alignSelf: 'flex-start', // Align text to the left
    left: '10%',

  },
  textArea: {
    textAlignVertical: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: '80%', // Match the width of your text input fields
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    fontFamily: 'Montserrat',
    fontSize: 16, 
    color: 'black',

   },

  pickerContainer: {
    width: '80%', // Match the width of your text input fields
    marginVertical: 5, // Match the vertical spacing of your text input fields
    padding: 10, // Match the padding of your text input fields
    borderWidth: 1, // Optional: if you want to show a border
    borderColor: 'gray', // Match the border color of your text input fields
    borderRadius: 10, // Match the border radius of your text input fields
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Match the background color
    fontFamily: 'Montserrat', // Match the font family
    fontSize: 16, // Match the font size
    color: 'black', // Match the font color
  },
});

export default CreateStory;
