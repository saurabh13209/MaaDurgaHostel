import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const handleClick = async () => {
    const docRef = firestore().collection('users').doc('user_123');

    await docRef.set({
      name: 'Saurabh Agrawal',
      age: 28,
      profession: 'Software Engineer',
      isActive: true,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="On Click"
        onPress={handleClick}
      />
      <Text style={{ marginTop: 20 }}>Something</Text>
    </View>
  );
};

export default App;
