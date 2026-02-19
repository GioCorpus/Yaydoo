import { BalanceCard } from '@/components/BalanceCard';
import { Transaction, TransactionList } from '@/components/TransactionList';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dummy Data
const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Store',
    subtitle: 'Food & Groceries',
    amount: -85.50,
    date: 'Today',
    type: 'expense',
  },
  {
    id: '2',
    title: 'Salary Deposit',
    subtitle: 'Employer Inc.',
    amount: 3500.00,
    date: 'Yesterday',
    type: 'income',
  },
  {
    id: '3',
    title: 'Netflix Subscription',
    subtitle: 'Entertainment',
    amount: -15.99,
    date: 'Feb 15',
    type: 'expense',
  },
  {
    id: '4',
    title: 'Freelance Payment',
    subtitle: 'Client X',
    amount: 450.00,
    date: 'Feb 14',
    type: 'income',
  },
  {
    id: '5',
    title: 'Gas Station',
    subtitle: 'Transport',
    amount: -45.00,
    date: 'Feb 12',
    type: 'expense',
  },
];

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2 flex-row justify-between items-center">
          <View>
            <Text className="text-slate-500 text-sm">Welcome back,</Text>
            <Text className="text-2xl font-bold text-slate-800 dark:text-white">Alex Doe</Text>
          </View>
          <View className="w-10 h-10 bg-slate-200 rounded-full items-center justify-center border border-slate-300">
            <Text className="text-slate-600 font-bold">AD</Text>
          </View>
        </View>

        {/* Balance Card */}
        <BalanceCard
          balance={12450.75}
          income={3950.00}
          expense={146.49}
        />

        {/* Action Buttons (Quick Access) */}
        <View className="flex-row justify-around px-4 my-2">
          <View className="items-center">
            <View className="w-14 h-14 bg-blue-500 rounded-2xl items-center justify-center shadow-sm mb-2">
              <Text className="text-white text-xl font-bold">+</Text>
            </View>
            <Text className="text-xs text-slate-600 dark:text-slate-400">Top Up</Text>
          </View>
          <View className="items-center">
            <View className="w-14 h-14 bg-indigo-500 rounded-2xl items-center justify-center shadow-sm mb-2">
              <Text className="text-white text-xl font-bold">➜</Text>
            </View>
            <Text className="text-xs text-slate-600 dark:text-slate-400">Transfer</Text>
          </View>
          <View className="items-center">
            <View className="w-14 h-14 bg-slate-800 dark:bg-slate-700 rounded-2xl items-center justify-center shadow-sm mb-2">
              <Text className="text-white text-xl font-bold">⋮</Text>
            </View>
            <Text className="text-xs text-slate-600 dark:text-slate-400">More</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <TransactionList transactions={DUMMY_TRANSACTIONS} />
      </ScrollView>
    </SafeAreaView>
  );
}
