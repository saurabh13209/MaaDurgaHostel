import React, { useState, useEffect } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const StudentOtp = () => {
  const [mobileNumbers, setMobileNumbers] = useState([]); // To store fetched document keys
  const [mobileNumber, setMobileNumber] = useState(''); // To store input value
  const [confirm, setConfirm] = useState(null);  
  const [code, setCode] = useState('');



  const PhoneSignIn = () => {
    function onAuthStateChanged(user: any) {
      if (user) {
        console.log("LOGGED IN")
        console.log(user)
      }
    }
  }
  

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const collectionRef = firestore().collection('users');
        const snapshot = await collectionRef.get();
        const mobile_number:any = snapshot.docs.map((x) => x.id);
        setMobileNumbers(mobile_number);
      } catch (error) {
        console.error('Error fetching document keys:', error);
      }
    };
    asyncFunc();
  }, []);


  const sendOTP = async () => {
    if (!mobileNumber.startsWith('+')) {
      Alert.alert('Invalid Phone Number', 'Please include the country code (e.g., +91 for India).');
      return;
    }
    try {
      const confirmation = await auth().signInWithPhoneNumber(mobileNumber);
      setConfirm(confirmation);
      Alert.alert('OTP Sent', 'Please check your messages.');
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  const handleClick = async () => {
    try {
      if (!(mobileNumbers.includes(mobileNumber))){
        console.log("wond")
        const docRef = firestore().collection('users').doc(mobileNumber);

        await docRef.set({
          name: 'Saurabh Agrawal',
          age: 28,
          profession: 'Software Engineer',
          isActive: true,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }else{
        Alert.alert("Mobile number already exists")
      }

    } catch (error) {
      console.error('Error writing document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{
        margin:10,
        fontWeight:"bold",
        fontSize:50,
        marginBottom:80,
        marginTop:20,
      }}>
        Student Page
      </Text>
      <Text style={styles.label}>Enter Student Mobile Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />
      <Button title="Send Otp" onPress={sendOTP} />
      <Text style={{ marginTop: 20 }}>Fetched Document Keys:</Text>
      {mobileNumbers.length > 0 ? (
        mobileNumbers.map((key) => (
          <Text key={key} style={{ marginTop: 5 }}>
            {key}
          </Text>
        ))
      ) : (
        <Text>No keys fetched yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default StudentOtp;
