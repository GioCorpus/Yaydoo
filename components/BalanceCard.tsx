import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface BalanceCardProps {
    balance: number;
    income: number;
    expense: number;
}

export const BalanceCard = ({ balance, income, expense }: BalanceCardProps) => {
    return (
        <View className="bg-slate-900 rounded-2xl p-6 m-4 shadow-lg">
            <Text className="text-slate-400 text-sm font-medium">Total Balance</Text>
            <Text className="text-white text-4xl font-bold mt-2">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>

            <View className="flex-row justify-between mt-6 pt-4 border-t border-slate-700">
                <View className="flex-row items-center">
                    <View className="bg-emerald-500/20 p-2 rounded-full mr-3">
                        <Ionicons name="arrow-down" size={20} color="#10b981" />
                    </View>
                    <View>
                        <Text className="text-slate-400 text-xs">Income</Text>
                        <Text className="text-emerald-400 font-bold text-lg">
                            +${income.toLocaleString()}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center">
                    <View className="bg-rose-500/20 p-2 rounded-full mr-3">
                        <Ionicons name="arrow-up" size={20} color="#f43f5e" />
                    </View>
                    <View>
                        <Text className="text-slate-400 text-xs">Expense</Text>
                        <Text className="text-rose-400 font-bold text-lg">
                            -${expense.toLocaleString()}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Chart Placeholder / Integration */}
            <View className="mt-6 items-center">
                <View className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <View className="w-2/3 h-full bg-emerald-500" />
                </View>
                <Text className="text-slate-500 text-xs mt-2 self-start">Monthly Limit: 65% used</Text>
            </View>
        </View>
    );
};
