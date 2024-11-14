import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ScanningScreen from '../../components/ScanningScreen';
import ScanningResultScreen from '../../components/ScanningResultScreen';

export default scanner = () => {
  const [scanningComplete, setScanningComplete] = useState(false);

  // Sample student data; you can update this with actual scan data
  const [studentData, setStudentData] = useState({
    name: "Andrew Banda",
    regNo: "BSC/14/22",
    course: "COM314",
    status: "Attended"
  });

  // Function to handle completing a scan and moving to the results screen
  const handleScanComplete = () => {
    setScanningComplete(true); // Set scanningComplete to true to show results screen
  };

  // Function to handle "Register Another Student" button click
  const handleRegisterAnother = () => {
    setScanningComplete(false); // Set scanningComplete to false to go back to scanning screen
  };
  return (
    <View style={{ flex: 1 }}>
      {scanningComplete ? (
        // Display the ScanningResultScreen when scan is complete
        <ScanningResultScreen
          student={studentData}
          onRegisterAnother={handleRegisterAnother}
          onConfirm={() => console.log("Confirmed")}
        />
      ) : (
        // Display the ScanningScreen when waiting to scan
        <ScanningScreen 
          onExit={() => console.log("Exit Scan")}
          onScanComplete={handleScanComplete} // Pass the handleScanComplete function
        />
      )}
    </View>
  )
}

