import { CreditScoreColors } from '@/constants/theme';
import { getCreditScoreInfo } from '@/src/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

/**
 * CreditScore Component Props
 */
interface CreditScoreProps {
    /** Credit score value (300-850) */
    score: number;
    /** Last update date */
    lastUpdated?: string | Date;
    /** Credit bureau (e.g., 'Equifax', 'TransUnion', 'Buró de Crédito') */
    bureau?: string;
    /** Show detailed breakdown */
    showDetails?: boolean;
    /** Card container style */
    containerStyle?: ViewStyle;
    /** Callback when card is pressed */
    onPress?: () => void;
}

/**
 * NeoWallet Credit Score Component
 * Displays user's credit score with visual indicator and bureau info
 */
export const CreditScore: React.FC<CreditScoreProps> = ({
    score,
    lastUpdated = new Date(),
    bureau = 'Equifax',
    showDetails = false,
    containerStyle,
    onPress,
}) => {
    // Get credit score info from utility
    const { color, label, category } = getCreditScoreInfo(score);
    
    // Calculate percentage for circular progress (300-850 range)
    const percentage = Math.min(Math.max((score - 300) / (850 - 300), 0), 1) * 100;
    
    // Determine border color based on score
    const borderColor = score > 700 
        ? CreditScoreColors.excellent 
        : score > 650 
            ? CreditScoreColors.fair 
            : CreditScoreColors.poor;

    // Format last updated date
    const formattedDate = lastUpdated instanceof Date 
        ? lastUpdated.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })
        : new Date(lastUpdated).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });

    return (
        <View 
            className="bg-slate-900 rounded-3xl p-6 shadow-lg"
            style={containerStyle}
        >
            {/* Header */}
            <View className="flex-row justify-between items-center w-full mb-4">
                <View className="flex-row items-center">
                    <Text className="text-white font-bold text-lg">Credit Score</Text>
                    <Ionicons 
                        name="shield-checkmark" 
                        size={20} 
                        color={CreditScoreColors.excellent}
                        style={{ marginLeft: 8 }}
                    />
                </View>
            </View>

            {/* Score Circle */}
            <View className="items-center justify-center py-4">
                <View 
                    className="w-40 h-40 rounded-full border-8 items-center justify-center"
                    style={{ 
                        borderColor: borderColor,
                        backgroundColor: '#1e293b',
                    }}
                >
                    <View 
                        className="w-36 h-36 rounded-full border-4 items-center justify-center"
                        style={{ 
                            borderColor: `${borderColor}40`,
                        }}
                    >
                        <Text className="text-5xl font-bold text-white">{score}</Text>
                        <Text 
                            className="text-sm font-medium mt-1"
                            style={{ color }}
                        >
                            {label}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Details Section */}
            {showDetails && (
                <View className="mt-4 w-full">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-slate-400 text-xs">Payment History</Text>
                        <Text className="text-emerald-400 text-xs font-medium">Excellent</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-slate-400 text-xs">Credit Utilization</Text>
                        <Text className="text-emerald-400 text-xs font-medium">Good</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-slate-400 text-xs">Credit Age</Text>
                        <Text className="text-yellow-400 text-xs font-medium">Fair</Text>
                    </View>
                </View>
            )}

            {/* Footer */}
            <Text className="text-slate-400 text-xs mt-4 text-center">
                Updated {formattedDate} • {bureau}
            </Text>
        </View>
    );
};
