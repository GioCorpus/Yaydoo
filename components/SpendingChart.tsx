import { CategoryColors } from '@/constants/theme';
import { formatCurrency } from '@/src/utils/formatters';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

/**
 * Spending Category Data
 */
export interface SpendingCategory {
    /** Category name */
    name: string;
    /** Category key for color mapping */
    category: string;
    /** Amount spent in this category */
    amount: number;
    /** Percentage of total */
    percentage: number;
}

/**
 * SpendingChart Component Props
 */
interface SpendingChartProps {
    /** Array of spending categories */
    categories?: SpendingCategory[];
    /** Total spending amount */
    totalSpending?: number;
    /** Chart container style */
    containerStyle?: ViewStyle;
    /** Callback when a category is pressed */
    onCategoryPress?: (category: SpendingCategory) => void;
}

// Default categories for demo
export const DEFAULT_CATEGORIES: SpendingCategory[] = [
    { name: 'Food & Groceries', category: 'food', amount: 850, percentage: 40 },
    { name: 'Transport', category: 'transport', amount: 450, percentage: 30 },
    { name: 'Entertainment', category: 'entertainment', amount: 200, percentage: 20 },
    { name: 'Others', category: 'others', amount: 100, percentage: 10 },
];

/**
 * NeoWallet Spending Chart Component
 * Displays spending breakdown by category as a pie/donut chart
 */
export const SpendingChart: React.FC<SpendingChartProps> = ({
    categories = DEFAULT_CATEGORIES,
    totalSpending,
    containerStyle,
    onCategoryPress,
}) => {
    // Calculate total if not provided
    const calculatedTotal = totalSpending ?? categories.reduce((sum, cat) => sum + cat.amount, 0);

    // Convert categories to pie chart data format
    const pieData = categories.map((category) => ({
        value: category.amount,
        color: CategoryColors[category.category as keyof typeof CategoryColors] || CategoryColors.others,
        text: `${category.percentage}%`,
        category: category.category,
    }));

    // Render legend item
    const renderLegendItem = (category: SpendingCategory) => {
        const color = CategoryColors[category.category as keyof typeof CategoryColors] || CategoryColors.others;
        
        return (
            <View 
                key={category.category}
                className="flex-row items-center mx-3 mb-2"
            >
                <View 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: color }}
                />
                <Text className="text-slate-500 text-xs">{category.name}</Text>
                <Text className="text-slate-800 dark:text-white text-xs font-medium ml-1">
                    {formatCurrency(category.amount)}
                </Text>
            </View>
        );
    };

    return (
        <View 
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 mt-4 shadow-sm"
            style={containerStyle}
        >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-slate-900 dark:text-white font-bold text-lg">
                    Spending Breakdown
                </Text>
                <Text className="text-emerald-500 font-medium text-sm">
                    This Month
                </Text>
            </View>

            {/* Chart */}
            <View className="items-center">
                <PieChart
                    data={pieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    radius={90}
                    innerRadius={60}
                    innerCircleColor={'#0f172a'}
                    centerLabelComponent={() => (
                        <View className="justify-center items-center">
                            <Text className="text-2xl font-bold text-white">
                                {formatCurrency(calculatedTotal, { showCents: false })}
                            </Text>
                            <Text className="text-xs text-slate-400">Total</Text>
                        </View>
                    )}
                />
            </View>

            {/* Legend */}
            <View className="flex-row justify-center mt-6 flex-wrap">
                {categories.map(renderLegendItem)}
            </View>
        </View>
    );
};
