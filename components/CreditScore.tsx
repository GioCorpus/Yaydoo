import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface CreditScoreProps {
    score: number;
}

export const CreditScore = ({ score }: CreditScoreProps) => {
    // Simple categorization
    let color = 'text-red-500';
    let message = 'Needs Work';
    if (score > 650) { color = 'text-yellow-500'; message = 'Fair'; }
    if (score > 700) { color = 'text-emerald-500'; message = 'Good'; }
    if (score > 750) { color = 'text-emerald-400'; message = 'Excellent'; }

    const percentage = Math.min(Math.max((score - 300) / (850 - 300), 0), 1) * 100;

    return (
        <View className="bg-slate-900 rounded-3xl p-6 shadow-lg items-center">
            <View className="flex-row justify-between w-full mb-4">
                <Text className="text-white font-bold text-lg">Credit Score</Text>
                <Ionicons name="shield-checkmark" size={24} color="#10b981" />
            </View>

            <View className="w-40 h-40 rounded-full border-8 border-slate-800 items-center justify-center relative">
                {/* Simple visualization of progress via wrapper or SVG can be complex without libs, 
             so we use a text-based representation enhanced with borders for MVP */}
                <View className={`w-36 h-36 rounded-full border-4 items-center justify-center ${score > 700 ? 'border-emerald-500' : 'border-yellow-500'}`}>
                    <Text className="text-5xl font-bold text-white">{score}</Text>
                    <Text className={`text-sm font-medium ${color}`}>{message}</Text>
                </View>
            </View>

            <Text className="text-slate-400 text-xs mt-4 text-center">
                Updated 2 days ago • Equifax
            </Text>
        </View>
    );
};
