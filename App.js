import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateStory from './CreateStory'; // Import your CreateStory component
import StoryView from './StoryView'; // Import StoryView
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import TermsOfUseScreen from './TermsOfUseScreen';

const bgPath = './assets/welcome.jpg';
const fontPath = './assets/Montserrat.ttf';
const titleFontPath = './assets/Montserrat-Bold.ttf';

const Stack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;
const titleFontSize = windowWidth >= 768 ? 24 : 34;
const isDesktop = windowWidth >= 1024; // Assuming desktop width starts from 1024px

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/Montserrat.ttf'),
    'Montserrat-Bold': require('./assets/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  

  return (
    <ImageBackground source={require('./assets/welcome.jpg')} style={styles.backgroundImage}>

    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Galactic{"\n"}Stories</Text>
          <Text style={styles.description}>Explore the galaxy, create your story.</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => 
              navigation.reset({
                index: 0,
                routes: [{ name: 'Create a Story' }],
              })
            }
          >
            <Text style={styles.buttonText}>Let's Start</Text>
          </TouchableOpacity>
          <View style={styles.ackContainer}>
  <Text style={styles.ack}>By clicking 'Let's Start' you accept </Text>
  <TouchableOpacity onPress={() => navigation.navigate('Privacy Policy Screen')}>
    <Text style={styles.linkText}>Privacy Policy</Text>
  </TouchableOpacity>
  <Text style={styles.ack}> and </Text>
  <TouchableOpacity onPress={() => navigation.navigate('Terms Of Use Screen')}>
    <Text style={styles.linkText}>Terms of Use</Text>
  </TouchableOpacity>
</View>

        </View>
    </View>
    </ImageBackground>

  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ headerShown: false }} // This sets the option for all screens
      ><Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create a Story" component={CreateStory} />
        <Stack.Screen name="Story View" component={StoryView} />
        <Stack.Screen name="Privacy Policy Screen" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Terms Of Use Screen" component={TermsOfUseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: isDesktop ? '50%' : '100%', // Limit width on desktop
    alignSelf: 'center', // Center the container for desktop view

  },
  title: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgb(247, 247, 247)',
    fontWeight: '700',
    letterSpacing: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: titleFontSize,
  },
  description: {
    fontFamily: 'Montserrat',
    color: 'white',
    fontSize: 19, // Adjust as needed
    textAlign: 'center',
    marginTop: 20, // Adjust spacing as needed
  },
  ackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Adds some padding around the container
  },
  ack: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  linkText: {
    color: 'white',
    fontFamily: 'Montserrat',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 5, // Adds a little space before the link text
    marginRight: 5, // Adds a little space after the link text
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 70,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    padding: 15,
    paddingHorizontal:80,
    borderRadius: 23,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});

export default App;
