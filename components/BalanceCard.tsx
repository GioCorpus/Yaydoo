import { BrandColors, SemanticColors } from '@/constants/theme';
import { formatCurrency } from '@/src/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

/**
 * BalanceCard Props
 * Displays the user's total balance, income, and expenses
 */
interface BalanceCardProps {
    /** Current total balance */
    balance: number;
    /** Total income for the period */
    income: number;
    /** Total expenses for the period */
    expense: number;
    /** Monthly spending limit */
    monthlyLimit?: number;
    /** Card container style override */
    containerStyle?: ViewStyle;
    /** Callback when card is pressed */
    onPress?: () => void;
}

/**
 * NeoWallet Balance Card Component
 * Shows total balance, income/expense breakdown, and monthly limit progress
 */
export const BalanceCard: React.FC<BalanceCardProps> = ({
    balance,
    income,
    expense,
    monthlyLimit,
    containerStyle,
    onPress,
}) => {
    // Calculate monthly limit percentage if limit is provided
    const limitPercentage = monthlyLimit ? Math.min((expense / monthlyLimit) * 100, 100) : 65;
    const isOverLimit = monthlyLimit ? expense > monthlyLimit : false;

    return (
        <View 
            className="bg-slate-900 rounded-2xl p-6 m-4 shadow-lg"
            style={containerStyle}
        >
            {/* Header */}
            <View className="flex-row justify-between items-start">
                <View>
                    <Text className="text-slate-400 text-sm font-medium">Total Balance</Text>
                    <Text className="text-white text-4xl font-bold mt-2">
                        {formatCurrency(balance)}
                    </Text>
                </View>
                {/* NeoWallet Logo/Icon */}
                <View className="bg-emerald-500/20 p-2 rounded-lg">
                    <Ionicons name="wallet" size={24} color={BrandColors.primary} />
                </View>
            </View>

            {/* Income & Expense Summary */}
            <View className="flex-row justify-between mt-6 pt-4 border-t border-slate-700">
                {/* Income */}
                <View className="flex-row items-center flex-1">
                    <View className="bg-emerald-500/20 p-2 rounded-full mr-3">
                        <Ionicons name="arrow-down" size={20} color={SemanticColors.success} />
                    </View>
                    <View>
                        <Text className="text-slate-400 text-xs">Income</Text>
                        <Text className="text-emerald-400 font-bold text-lg">
                            +{formatCurrency(income, { showCents: false })}
                        </Text>
                    </View>
                </View>

                {/* Expense */}
                <View className="flex-row items-center flex-1 justify-end">
                    <View className="bg-rose-500/20 p-2 rounded-full mr-3">
                        <Ionicons name="arrow-up" size={20} color={SemanticColors.error} />
                    </View>
                    <View>
                        <Text className="text-slate-400 text-xs">Expense</Text>
                        <Text className="text-rose-400 font-bold text-lg">
                            -{formatCurrency(expense, { showCents: false })}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Monthly Limit Progress */}
            {monthlyLimit && (
                <View className="mt-6">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-slate-400 text-xs">Monthly Limit</Text>
                        <Text className={`text-xs font-medium ${isOverLimit ? 'text-rose-400' : 'text-slate-400'}`}>
                            {Math.round(limitPercentage)}% used
                        </Text>
                    </View>
                    <View className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <View 
                            className={`h-full rounded-full ${isOverLimit ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${limitPercentage}%` }}
                        />
                    </View>
                    <Text className="text-slate-500 text-xs mt-1">
                        {formatCurrency(expense)} of {formatCurrency(monthlyLimit)}
                    </Text>
                </View>
            )}
        </View>
    );
};
