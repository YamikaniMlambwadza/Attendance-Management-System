
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ScanningResultScreen = ({ student, onRegisterAnother, onConfirm }) => {
  return (
    <View className ='flex-1 justify-center items-center bg-blue-700 px-6 py-8'>
      <View className='w-full bg-white rounded-[20px] p-6 items-center'>
        {/* Success Message */}
        <Text className='text-blue-700 text-xl font-bold mb-4'>Successful!</Text>
 
        {/* Student Details */}
        <View className='mb-6'>
          <Text className='text-lg text-gray-800'>
            <Text className='font-semibold'>Name:</Text> {student.name}
          </Text>
          <Text className='text-lg text-gray-800'>
            <Text className='font-semibold'>Reg No:</Text> {student.regNo}
          </Text>
          <Text className='text-lg text-gray-800'>
            <Text className='font-semibold'>Course:</Text> {student.course}
          </Text>
          <Text className='text-lg text-gray-800'>
            <Text className='font-semibold'>Status:</Text> {student.status}
          </Text>
        </View>

        {/* Buttons */}
        <View className='flex-row justify-between w-full mt-4'>
          <TouchableOpacity
            className='bg-transparent border border-blue-700 rounded-[15px] px-4 py-2 mr-2'
            onPress={onRegisterAnother}
          >
            <Text className='text-blue-700 text-lg font-semibold'>Register Another Student</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-blue-700 rounded-15 px-6 py-2'
            onPress={onConfirm}
          >
            <Text className='text-white text-lg font-semibold'>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScanningResultScreen;
