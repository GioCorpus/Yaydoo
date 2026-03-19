import { TransactionColors } from '@/constants/theme';
import { formatCurrency, formatDate, getCategoryIcon } from '@/src/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

/**
 * Transaction Type
 */
export interface Transaction {
    id: string;
    title: string;
    subtitle: string;
    amount: number;
    date: string | Date;
    type: 'income' | 'expense';
    category?: string;
    icon?: string;
}

/**
 * TransactionList Props
 */
interface TransactionListProps {
    transactions: Transaction[];
    /** Maximum number of transactions to show */
    limit?: number;
    /** Show "See All" button */
    showSeeAll?: boolean;
    /** Callback when a transaction is pressed */
    onTransactionPress?: (transaction: Transaction) => void;
    /** Callback when "See All" is pressed */
    onSeeAllPress?: () => void;
    /** Container style */
    containerStyle?: ViewStyle;
    /** Empty state message */
    emptyMessage?: string;
}

/**
 * Transaction Item Component
 */
const TransactionItem: React.FC<{
    item: Transaction;
    onPress?: (transaction: Transaction) => void;
}> = ({ item, onPress }) => {
    const isExpense = item.type === 'expense';
    const iconName = item.icon || (isExpense ? getCategoryIcon(item.category || 'default') : 'cash');
    
    // Get colors based on transaction type
    const bgColor = isExpense ? TransactionColors.expenseBg : TransactionColors.incomeBg;
    const iconColor = isExpense ? TransactionColors.expense : TransactionColors.income;

    const handlePress = useCallback(() => {
        onPress?.(item);
    }, [item, onPress]);

    return (
        <TouchableOpacity 
            onPress={handlePress}
            activeOpacity={0.7}
            className="flex-row justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800"
        >
            <View className="flex-row items-center flex-1">
                <View 
                    className="w-12 h-12 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: bgColor }}
                >
                    <Ionicons
                        name={iconName as any}
                        size={24}
                        color={iconColor}
                    />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-slate-800 dark:text-white text-base" numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text className="text-slate-500 text-sm" numberOfLines={1}>
                        {item.subtitle}
                    </Text>
                </View>
            </View>
            <View className="items-end ml-2">
                <Text className={`font-bold text-base ${isExpense ? 'text-slate-900 dark:text-white' : 'text-emerald-500'}`}>
                    {isExpense ? '-' : '+'}{formatCurrency(Math.abs(item.amount))}
                </Text>
                <Text className="text-slate-400 text-xs">
                    {formatDate(item.date, 'relative')}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

/**
 * TransactionList Component
 * Displays a list of financial transactions with income/expense styling
 */
export const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    limit,
    showSeeAll = false,
    onTransactionPress,
    onSeeAllPress,
    containerStyle,
    emptyMessage = 'No transactions yet',
}) => {
    // Apply limit if specified
    const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;
    const hasMore = limit && transactions.length > limit;

    const renderItem = useCallback(({ item }: { item: Transaction }) => (
        <TransactionItem 
            item={item} 
            onPress={onTransactionPress}
        />
    ), [onTransactionPress]);

    const keyExtractor = useCallback((item: Transaction) => item.id, []);

    const renderEmptyState = () => (
        <View className="py-8 items-center">
            <Ionicons name="receipt-outline" size={48} color="#94a3b8" />
            <Text className="text-slate-400 text-base mt-2">{emptyMessage}</Text>
        </View>
    );

    const renderHeader = () => (
        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-slate-900 dark:text-white">
                Recent Activity
            </Text>
            {showSeeAll && hasMore && (
                <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
                    <Text className="text-emerald-500 font-medium">See All</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View className="bg-white dark:bg-slate-900 rounded-3xl p-6 mt-4 flex-1" style={containerStyle}>
            {renderHeader()}
            <FlatList
                data={displayedTransactions}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
                scrollEnabled={false}
            />
        </View>
    );
};
