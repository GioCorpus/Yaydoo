import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

export interface Transaction {
    id: string;
    title: string;
    subtitle: string;
    amount: number;
    date: string;
    type: 'income' | 'expense';
    icon?: string;
}

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionItem = ({ item }: { item: Transaction }) => {
    const isExpense = item.type === 'expense';

    return (
        <View className="flex-row justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
            <View className="flex-row items-center">
                <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${isExpense ? 'bg-orange-100' : 'bg-blue-100'}`}>
                    <Ionicons
                        name={isExpense ? 'cart-outline' : 'cash-outline'}
                        size={24}
                        color={isExpense ? '#f97316' : '#3b82f6'}
                    />
                </View>
                <View>
                    <Text className="font-bold text-slate-800 dark:text-white text-base">{item.title}</Text>
                    <Text className="text-slate-500 text-sm">{item.subtitle}</Text>
                </View>
            </View>
            <View className="items-end">
                <Text className={`font-bold text-base ${isExpense ? 'text-slate-900 dark:text-white' : 'text-emerald-500'}`}>
                    {isExpense ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
                </Text>
                <Text className="text-slate-400 text-xs">{item.date}</Text>
            </View>
        </View>
    );
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
    return (
        <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 flex-1 mt-4">
            <Text className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Recent Activity</Text>
            <FlatList
                data={transactions}
                renderItem={({ item }) => <TransactionItem item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};
