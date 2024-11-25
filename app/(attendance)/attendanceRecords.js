
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import TabLayout from '../(tabs)/_layout'
import AttendanceCard from '../../components/AttendanceCard'


const AttendanceRecords = () => {
  const attendanceData = {
    courseCode: 'COM312',
    studentsEnrolled: 35,
    studentsAttended: 30,
    studentsSubmitted: 29,
    examDate: '25 JUNE 2030',
    examRoom: 'Mwamba 1 Lecture Theatre',
    invigilator: 'Mr. Kenneth Kazembe',
  };
  return (
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Attendance Summary</Text>
      </View>
      <AttendanceCard attendance={attendanceData} />
      <TouchableOpacity style={styles.button} className=''>
      <Link href='/sheet' style={styles.buttonText} className='w-full text-center' >View Details</Link>
      </TouchableOpacity>
    </SafeAreaView>

   
   
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#3b4fcc',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default AttendanceRecords
