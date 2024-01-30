import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';



const TermsOfUseScreen = ({ route, navigation }) => {
    const terms = `Terms of Use for Galactic Stories
    Introduction
    
    Welcome to Galactic Stories! These terms of use ("Terms") govern your use of Galactic Stories and provide important information about your rights, obligations, and restrictions. By accessing or using the Galactic Stories application, you agree to be bound by these Terms.
    
    1. Acceptance of Terms
    
    By using Galactic Stories, you agree to these Terms. If you do not agree with any part of these Terms, you must not use this application.
    
    2. Use of Service
    
    Galactic Stories allows users to input their age, gender, and optional preferences such as story theme and special characters to generate personalized stories using OpenAI's ChatGPT 3.5 API. Users can also utilize the expo-speech API and Apple's voice for reading stories aloud.
    
    You agree to use Galactic Stories only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the application.
    
    3. Changes to Terms or Services
    
    We may modify the Terms at any time, in our sole discretion. If we do so, we'll let you know either by posting the modified Terms on the site or through other communications. It's important that you review the Terms whenever we modify them because continuing to use the Services after we have posted modified Terms constitutes your agreement to the modified Terms.
    
    4. Privacy
    
    Your use of Galactic Stories is subject to our Privacy Policy. By using the service, you agree that we can use such data in accordance with our Privacy Policy.
    
    5. No Warranty
    
    Galactic Stories is provided "as is" and "as available" without any warranty of any kind. We do not guarantee that the app will function without interruption or errors. We provide the service without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
    
    6. Limitation of Liability
    
    To the maximum extent permitted by law, Galactic Stories shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to, use of, or inability to access or use the service; (b) any conduct or content of any third party on the service.
    
    7. User Responsibilities
    
    You are responsible for your use of the service and any content you provide, including compliance with applicable laws, rules, and regulations. You should only provide content that you are comfortable sharing with others.
    
    8. Termination
    
    We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
    
    9. Governing Law
    
    These Terms shall be governed and construed in accordance with the laws of the jurisdiction of the app owner, without regard to its conflict of law provisions.
    
    10. Contact Information
    
    For any questions about these Terms, please contact us at info@galacticstories.com.
    
    Disclaimer
    
    Galactic Stories does not claim ownership, endorsement, or validation of the stories generated through the OpenAI API and Apple's voice technology. The stories are the result of automated processes without any editorial control or endorsement by Galactic Stories. We disclaim all liability in connection with the content of the stories generated.
    `;

    return (
        <ImageBackground source={require('./assets/welcome.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.storyContainer}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.storyText}>{terms}</Text>
                    </ScrollView>
                </View>
                

                

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Go back</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    storyContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 20,
        padding: 20,
        marginTop: 60,
        width: '90%',
        minHeight: '60%',
        maxHeight: '80%', // Set a maximum height
    },
    scrollView: {
        // Additional styles if needed for the scroll view
    },
    storyText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: 'black',
        textAlign: 'justify',
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        textAlign: 'center',

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    smallButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        flex: 1,
        marginHorizontal: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'lightgrey',
        borderRadius: 15,
        padding: 5,
    },
    closeButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    pickerStyle: {
        width: '100%',
        height: 150,
    },
});

export default TermsOfUseScreen;