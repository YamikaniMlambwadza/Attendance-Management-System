import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react';
//import axios from 'axios';
import { Link } from 'expo-router';

export default Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const backendUrl = 'http://localhost:3000/admin/signIn';

  const handleLogin = async () => {
    console.log("Login button clicked");

    // Check if fields are empty
    if (!username.trim() || !password.trim()) {
      console.log("Validation Error: Both fields are required");
      
      if (Platform.OS === 'web') {
        alert("Please fill in both fields"); // `alert` for web
      } else {
        Alert.alert('Validation Error', 'Please fill in both fields'); // `Alert` for mobile
      }
      return;
    }

    console.log("Attempting to login with", username, password);

    try {
      setLoading(true);
      
      const response = await axios.post(backendUrl, { username, password });
      
      if (response.status === 201) { 
        const { accessToken } = response.data;
        console.log("Login Successful:", accessToken);

        if (Platform.OS === 'web') {
          alert("Login Successful");
        } else {
          Alert.alert('Login Successful', `Token: ${accessToken}`);
        }
        
      } else {
        console.log("Login Failed: Invalid credentials");

        if (Platform.OS === 'web') {
          alert("Invalid username or password");
        } else {
          Alert.alert('Login Failed', 'Invalid username or password');
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      
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
      placeholder="Username"
      value={username}
      onChangeText={setUsername}
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

    <TouchableOpacity className='p-2'>
    <Link href="/home">Go Home </Link>
    </TouchableOpacity>

    <TouchableOpacity className='p-2'>
    <Link href="/signUser">Forget Password</Link>
    </TouchableOpacity>   
    
  </View> 
   
  )
}


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









































