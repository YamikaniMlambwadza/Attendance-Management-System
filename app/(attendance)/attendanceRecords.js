import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';

function Attendance_summary({ route, navigation }) {
  const [attendedData, setAttendedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendedData = async () => {
      try {
        const response = await fetch('http://192.168.136.159:8000/attendance-summary/fetch-attendance-summary/');
        
        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        if (result.attendance_summary) {
          setAttendedData(result.attendance_summary || []);
        } else {
          Alert.alert('Error', result.error || 'Failed to fetch attendance data.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', 'Failed to connect to the backend or invalid response.');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendedData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Attendance Summary</Text>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!attendedData || attendedData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Attendance Summary</Text>
        <Text style={styles.noDataText}>No attendance data available.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Summary</Text>

      <FlatList
        data={attendedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentInfo}>
            <Text style={styles.info}>
              {item.name} : {item.registration_number}
            </Text>
            {item.registration_number ? (
              <Text style={styles.attendedText}>Attended ✔️</Text>
            ) : (
              <Text style={styles.attendedText}>Not Attended ❌</Text>
            )}
          </View>
        )}
      />

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
    </View>
  );
}

export default Attendance_summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  studentInfo: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
  info: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  attendedText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4CAF50',
    marginTop: 5,
  },
  button: {
    marginTop: 20,
  },
});
