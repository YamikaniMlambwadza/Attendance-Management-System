import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import TabLayout from '../(tabs)/_layout'


const AttendanceRecords = () => {
  return (
    <>
    <View>
      <Text>AttendanceRecods</Text>
      <Link href='/home'>Go to sheet</Link>
      <TabLayout/>
    </View>
   
    </>
  )
}

export default AttendanceRecords
