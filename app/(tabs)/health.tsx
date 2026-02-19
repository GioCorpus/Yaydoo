import { CreditScore } from '@/components/CreditScore';
import { SpendingChart } from '@/components/SpendingChart';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HealthScreen() {
    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                <Text className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                    Financial Health
                </Text>

                <CreditScore score={742} />

                <View className="mt-6">
                    <Text className="text-slate-500 mb-2 font-medium">Monthly Analysis</Text>
                    <SpendingChart />
                </View>

                <View className="bg-slate-800 rounded-2xl p-4 mt-6 flex-row items-center">
                    <View className="bg-blue-500/20 p-3 rounded-full mr-4">
                        <Text className="text-blue-400 text-xl">💡</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-white font-bold">Insight</Text>
                        <Text className="text-slate-400 text-xs">You spent 15% less on dining out this month compared to last month. Keep it up!</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
