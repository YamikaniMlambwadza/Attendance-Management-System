
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router';

const AttendLayout = () => {
  return (
    <Stack>
    <Stack.Screen name="scanner" options={  {headerShown: false, title:'scanner' }} />    
    <Stack.Screen name="attendanceRecords" options={ {headerShown: false }} />
    <Stack.Screen name="sheet" options={ {headerShown: false }} />
 </Stack>

  )
}

export default AttendLayout