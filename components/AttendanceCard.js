import { Link } from 'expo-router';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,} from 'react-native';
import Sheet from '../app/(attendance)/sheet';

function AttendanceCard({ attendance }) {
  return (
    <View style={styles.card}>
      <Text style={styles.courseCode}>{attendance.courseCode} EXAM</Text>
      <View style={styles.details}>
        <Text>Students Enrolled: <Text style={styles.bold}>{attendance.studentsEnrolled}</Text></Text>
        <Text>Students Attended: <Text style={styles.bold}>{attendance.studentsAttended}</Text></Text>
        <Text>Students Submitted: <Text style={styles.bold}>{attendance.studentsSubmitted}</Text></Text>
        <Text>Exam Date: <Text style={styles.bold}>{attendance.examDate}</Text></Text>
        <Text>Exam Room: <Text style={styles.bold}>{attendance.examRoom}</Text></Text>
        <Text>Invigilator: <Text style={styles.bold}>{attendance.invigilator}</Text></Text>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4d6bff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginVertical: 10,
  },
  courseCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  details: {
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
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

export default AttendanceCard;
