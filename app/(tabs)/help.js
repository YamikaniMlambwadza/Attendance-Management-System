
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
          1. Register a student
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


