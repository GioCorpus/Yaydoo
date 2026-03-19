import { BalanceCard } from '@/components/BalanceCard';
import { Transaction, TransactionList } from '@/components/TransactionList';
import { BrandColors } from '@/constants/theme';
import { formatCurrency } from '@/src/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { Alert, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types for user profile
interface UserProfile {
    name: string;
    initials: string;
    accountType: string;
}

// Quick action type
interface QuickAction {
    id: string;
    name: string;
    icon: string;
    color: string;
    action: () => void;
}

// Dummy Data - In production, this would come from an API/store
const DUMMY_USER: UserProfile = {
    name: 'Alex Doe',
    initials: 'AD',
    accountType: 'Premium',
};

const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Store',
    subtitle: 'Food & Groceries',
    amount: -85.50,
    date: 'Today',
    type: 'expense',
    category: 'groceries',
  },
  {
    id: '2',
    title: 'Salary Deposit',
    subtitle: 'Employer Inc.',
    amount: 3500.00,
    date: 'Yesterday',
    type: 'income',
    category: 'salary',
  },
  {
    id: '3',
    title: 'Netflix Subscription',
    subtitle: 'Entertainment',
    amount: -15.99,
    date: 'Feb 15',
    type: 'expense',
    category: 'entertainment',
  },
  {
    id: '4',
    title: 'Freelance Payment',
    subtitle: 'Client X',
    amount: 450.00,
    date: 'Feb 14',
    type: 'income',
    category: 'income',
  },
  {
    id: '5',
    title: 'Gas Station',
    subtitle: 'Transport',
    amount: -45.00,
    date: 'Feb 12',
    type: 'expense',
    category: 'transport',
  },
];

// Account summary
const ACCOUNT_SUMMARY = {
    balance: 12450.75,
    income: 3950.00,
    expense: 2146.49,
    monthlyLimit: 5000.00,
};

/**
 * NeoWallet Dashboard Screen
 * Main financial overview and quick actions
 */
export default function DashboardScreen() {
    // Quick action handlers
    const handleTopUp = useCallback(() => {
        Alert.alert('Top Up', 'Add funds to your NeoWallet account.\n\nIntegration with Mexican banks (BBVA, Santander, etc.) would be implemented here.');
    }, []);

    const handleTransfer = useCallback(() => {
        Alert.alert('Transfer', 'Send money to any Mexican bank account.\n\nSPEI transfer functionality would be implemented here.');
    }, []);

    const handleQR = useCallback(() => {
        Alert.alert('QR Payment', 'Scan QR code to receive or send payments.\n\nQR payment integration would be implemented here.');
    }, []);

    const handleMore = useCallback(() => {
        Alert.alert('More Options', 'Additional options:\n- Pay bills\n- Load phone credit\n- View statements');
    }, []);

    const handleTransactionPress = useCallback((transaction: Transaction) => {
        Alert.alert(
            transaction.title,
            `${transaction.type === 'income' ? 'Received' : 'Spent'} ${formatCurrency(Math.abs(transaction.amount))}\n\nCategory: ${transaction.subtitle}\nDate: ${transaction.date}`
        );
    }, []);

    const handleSeeAllTransactions = useCallback(() => {
        Alert.alert('All Transactions', 'Full transaction history would be displayed here.');
    }, []);

    // Define quick actions
    const quickActions: QuickAction[] = [
        { id: '1', name: 'Top Up', icon: 'add', color: '#3b82f6', action: handleTopUp },
        { id: '2', name: 'Transfer', icon: 'swap-horizontal', color: '#8b5cf6', action: handleTransfer },
        { id: '3', name: 'QR Code', icon: 'qr-code', color: BrandColors.primary, action: handleQR },
        { id: '4', name: 'More', icon: 'ellipsis-horizontal', color: '#64748b', action: handleMore },
    ];

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
            <StatusBar barStyle="dark-content" />
            <ScrollView 
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View className="px-6 pt-4 pb-2 flex-row justify-between items-center">
                    <View>
                        <Text className="text-slate-500 text-sm">Welcome back,</Text>
                        <Text className="text-2xl font-bold text-slate-800 dark:text-white">
                            {DUMMY_USER.name}
                        </Text>
                        <Text className="text-emerald-500 text-xs font-medium mt-1">
                            {DUMMY_USER.accountType} Account
                        </Text>
                    </View>
                    {/* Profile Avatar */}
                    <TouchableOpacity 
                        className="w-12 h-12 bg-slate-200 rounded-full items-center justify-center border-2 border-emerald-500"
                        activeOpacity={0.7}
                    >
                        <Text className="text-slate-700 font-bold text-lg">{DUMMY_USER.initials}</Text>
                    </TouchableOpacity>
                </View>

                {/* Balance Card with monthly limit */}
                <BalanceCard
                    balance={ACCOUNT_SUMMARY.balance}
                    income={ACCOUNT_SUMMARY.income}
                    expense={ACCOUNT_SUMMARY.expense}
                    monthlyLimit={ACCOUNT_SUMMARY.monthlyLimit}
                />

                {/* Quick Actions */}
                <View className="px-4 mt-2">
                    <Text className="text-lg font-bold text-slate-800 dark:text-white mb-4 px-2">
                        Quick Actions
                    </Text>
                    <View className="flex-row justify-between">
                        {quickActions.map((action) => (
                            <TouchableOpacity
                                key={action.id}
                                onPress={action.action}
                                className="items-center flex-1"
                                activeOpacity={0.7}
                            >
                                <View 
                                    className="w-14 h-14 rounded-2xl items-center justify-center shadow-sm mb-2"
                                    style={{ backgroundColor: action.color }}
                                >
                                    <Ionicons name={action.icon as any} size={24} color="white" />
                                </View>
                                <Text className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                    {action.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Recent Activity */}
                <View className="px-4">
                    <TransactionList 
                        transactions={DUMMY_TRANSACTIONS}
                        limit={5}
                        showSeeAll
                        onTransactionPress={handleTransactionPress}
                        onSeeAllPress={handleSeeAllTransactions}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
