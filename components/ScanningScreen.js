
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ScanningResultScreen from './ScanningResultScreen';

const students = [
  { name: "Andrew Banda", regNo: "BSC-14-22", course: "COM314", status: "Attended" },
  { name: "Michael Enock", regNo: "BSC-15-22", course: "COM314", status: "Attended" },
  { name: "Sarah Chanda", regNo: "BSC-16-22", course: "COM315", status: "Absent" },
  // Add more students as needed
];

const ScanningScreen = ({ onExit }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Function to search for student by regNo
  const handleSearchStudent = () => {
    const student = students.find((s) => s.regNo.toUpperCase() === studentNumber.toUpperCase());
    if (student) {
      setSelectedStudent(student); // Set selected student to display their details
    } else {
      Alert.alert("Student not found");
    }
  };

  // Handle QR code scan result
  const handleBarCodeScanned = ({ data }) => {
    console.log("Scanned QR Code Data:", data); // Log scanned data
    setScanning(false); // Close scanner after scan
    setStudentNumber(data); // Set scanned student number
    handleSearchStudent(); // Search for student in array
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
                  onPress={handleSearchStudent}
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

