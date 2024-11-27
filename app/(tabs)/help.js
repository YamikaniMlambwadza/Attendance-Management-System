import { Text, View } from 'react-native';
import React from 'react';

export default function Help() {
  return (
    <View className="items-center h-full pt-10 bg-white">
      <Text className="text-black text-lg font-bold mb-6">
        help and support
      </Text>
      <View className="px-6">
      
        <Text className="text-black text-base mb-4 text-left">
          1. Register student
        </Text>

      
        <Text className="text-black text-base mb-4 text-left ml-8">
          1. Go to attendance marking
        </Text>
        <Text className="text-black text-base mb-4 text-left ml-8">
          2. Press the pointing down button below the course name, and it gives two options:
        </Text>
        <Text className="text-black text-base mb-4 text-left ml-12">
          a. Attended
        </Text>
        <Text className="text-black text-base mb-4 text-left ml-12">
          b. Submitted
        </Text>

        {/* New section for "3. To mark attended" */}
        <Text className="text-black text-base mb-4 text-left ml-8">
          3. To mark attended
        </Text>
        <Text className="text-black text-base mb-4 text-left ml-12">
          i. Press attended
        </Text>
        <Text className="text-black text-base mb-4 text-left ml-12">
          ii. Scan student id
        </Text>
        <Text className="text-black text-base mb-4 text-left ml-12">
          iii. Press ok to confirm
        </Text>

        <Text className="text-black text-base mb-4 text-left">
          2. Check records
        </Text>
        <Text className="text-black text-base mb-4 text-left">
          3. Frequently Asked Questions (FAQs)
        </Text>
      </View>
    </View>
  );
}



