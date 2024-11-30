
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const courses = [
  { id: '1', code: 'COM312', name: ' HCI ' },
  { id: '2', code: 'COM314', name: ' Algorithms & Data Structures ' },
  { id: '3', code: 'COM313', name: ' Computer Security ' },
  { id: '4', code: 'COM311', name: ' Software Engineering ' }, 
  { id: '5', code: 'COM315', name: ' Linux Systems Administration ' }
];

export default function AttendanceTracker() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mt-10">
      <Text className="text-3xl font-semibold text-gray-800 mb-4">Attendance Tracker</Text>
      {courses.map((course) => (
        <View key={course.id} className="mb-14 bg-blue-500 rounded-2xl shadow-lg">
          <View className="p-4">
               <Link href='/attendanceRecords'>
            <Text className="text-white text-lg font-bold">{course.code}:</Text>
             <Text className="text-white">{course.name}</Text>
                </Link>
   <TouchableOpacity
              onPress={() => toggleDropdown(course.id)}
              className="flex-row justify-between items-center bg-white mt-2 p-2 rounded-md"
            >
              <Text className="text-gray-700">Register Student</Text>
              <Ionicons name="chevron-down" size={20} color="gray" />
            </TouchableOpacity>
            {openDropdown === course.id && (
              <View className="bg-white mt-2 rounded-md border border-gray-300">
                <TouchableOpacity className="p-2 border-b border-gray-300">
                  <Text className="text-gray-700">Attended</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                  <Text className="text-gray-700">Submitted</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}
        <Link href='/scanner'>To scanner</Link>
    </ScrollView>
  );
}
