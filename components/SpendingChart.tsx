import React from 'react';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

export const SpendingChart = () => {
    const pieData = [
        { value: 40, color: '#f97316', text: '40%' }, // Food
        { value: 30, color: '#3b82f6', text: '30%' }, // Transport
        { value: 20, color: '#8b5cf6', text: '20%' }, // Ent
        { value: 10, color: '#10b981', text: '10%' }, // Others
    ];

    return (
        <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 mt-4 shadow-sm">
            <Text className="text-slate-900 dark:text-white font-bold text-lg mb-4">Spending Breakdown</Text>
            <View className="items-center">
                <PieChart
                    data={pieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    radius={90}
                    innerRadius={60}
                    innerCircleColor={'#0f172a'} // Dark mode match
                    centerLabelComponent={() => {
                        return (
                            <View className="justify-center items-center">
                                <Text className="text-2xl font-bold text-white">$2.4k</Text>
                                <Text className="text-xs text-slate-400">Total</Text>
                            </View>
                        );
                    }}
                />
            </View>
            <View className="flex-row justify-center mt-6 flex-wrap gap-4">
                <View className="flex-row items-center"><View className="w-3 h-3 bg-orange-500 rounded-full mr-2" /><Text className="text-slate-500 text-xs">Food</Text></View>
                <View className="flex-row items-center"><View className="w-3 h-3 bg-blue-500 rounded-full mr-2" /><Text className="text-slate-500 text-xs">Transport</Text></View>
                <View className="flex-row items-center"><View className="w-3 h-3 bg-violet-500 rounded-full mr-2" /><Text className="text-slate-500 text-xs">Ent.</Text></View>
            </View>
        </View>
    );
};
