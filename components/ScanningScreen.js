
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ScanningResultScreen from './ScanningResultScreen';

const ScanningScreen = ({ onExit }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
     
  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true); // Disable further scanning temporarily
    console.log(`Scanned Data: ${data}`);
  
    try {
      // Send scanned data to the Django backend
      const response = await fetch('http://192.168.136.159:8000/linkGoogle/fetch-google-sheet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registration_number: data }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        if (result.exists) {
          // Display student info if registration exists
          setStudentInfo({
            name: result.name,
            registrationNumber: data,
            attended: true,
          });
  
        } else {
          Alert.alert('Not Found', 'Registration number does not exist.');
        }
      } else {
        Alert.alert('Error', result.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to connect to the backend.');
    }
  
    // Reset scanning after a delay
    setTimeout(() => setScanned(false), 2000);
  };
  
  // If camera permission is not granted
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // If a student is selected, render ScanningResultScreen
  if (selectedStudent) {
    return (
      <ScanningResultScreen
        student={selectedStudent}
        onRegisterAnother={() => {
          setSelectedStudent(null); // Reset to enter a new student number
          setStudentNumber(''); // Clear the input field
        }}
        onConfirm={() => console.log("Confirmed")}
      />
    );
  }

  // If scanning is true, show the QR code scanner
  if (scanning) {
    return (
      <View className='flex-1 justify-center items-center'>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} // Only look for QR codes
          style={{ width: '100%', height: '100%' }}
        />
        <TouchableOpacity
          className='absolute top-5 right-5 bg-white p-2 rounded-full'
          onPress={() => setScanning(false)}
        >
          <Text className='text-blue-700 font-semibold'>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main scanning screen to enter student number or scan QR code
  return (
    <View className='w-full h-full bg-white p-0 m-0 rounded-[15px]'>
      <View className='w-full h-full bg-white relative'>
        <View className='flex-1 justify-center items-center'>
          <View className='w-full px-4 bg-blue-700 py-6 rounded-[15px] relative'>
            <TouchableOpacity
              className='absolute top-5 right-5 p-2'
              onPress={onExit}
            >
              <MaterialIcons name="close" size={28} color="white" />
            </TouchableOpacity>

            <View className='mb-4'>
              <Text className='text-white text-2xl font-semibold text-center'>
                Scan Student ID
              </Text>
            </View>

            <View className='mb-4 flex justify-center items-center'>
              <TouchableOpacity onPress={() => setScanning(true)}>
              <MaterialCommunityIcons name="qrcode-scan" size={100} color="white" />             
              </TouchableOpacity>
            </View>

            <View className='mb-4'>
              <Text className='text-white text-lg'>Enter Student Number</Text>
              <View className='relative'>
                <TextInput
                  className='bg-white p-3 text-lg pr-16 rounded-[20px]'
                  placeholder="BSC-14-22"
                  placeholderTextColor="#A9A9A9"
                  value={studentNumber}
                  onChangeText={setStudentNumber}
                />
                <TouchableOpacity
                  className='absolute top-2 right-2 bg-blue-700 p-2 rounded-lg'
                  onPress={ handleBarCodeScanned } 
                >
                  <Text className='text-white text-lg font-semibold'>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ScanningScreen;

