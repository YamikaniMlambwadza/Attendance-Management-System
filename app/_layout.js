import { StyleSheet, Text, View } from 'react-native';
import "../global.css";
import { Stack } from 'expo-router';


 
export default function App() {

  return (
    <>
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
      >
       <Stack.Screen name="index" options={ {headerShown: false }} />
       <Stack.Screen name="signUser" options={ {headerShown: false }} />
       <Stack.Screen name="(tabs)" options={ {headerShown: false }} />
       
    </Stack>
    </>
  );
}

