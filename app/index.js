import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';


export default Login = () => {
  const router = useRouter();

  const [instructor_id, setInstructorId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {  // handle login
    
    if (!instructor_id.trim() || !password.trim()) {
      Toast.show({
        type: 'error' ,
        text1: 'Validation Error: Both fields are required',
      });

      // compare 
      if (Platform.OS === 'web') {
        alert("Please fill in both fields");
      } else {
        Alert.alert('Validation Error', 'Please fill in both fields');
      }
      return;
    }

    try {
      setLoading(true);

      // Make the fetch POST request
      const response = await fetch('http://192.168.234.159:8000/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructor_id, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        console.log('Response:', data);
        router.push('/home');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      if (Platform.OS === 'web') {
        alert("Network or Server Error");
      } else {
        Alert.alert('Login Error', 'An error occurred while trying to log in');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="instructorId"
        value={instructor_id}
        onChangeText={setInstructorId}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


