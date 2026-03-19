/**
 * NeoWallet Fintech Theme - Yaydoo Mexico
 * Colors and design tokens for the financial application
 * Supports light and dark modes with fintech-appropriate colors
 */

import { Platform } from 'react-native';

// Primary brand colors
export const BrandColors = {
    primary: '#10b981',      // Emerald 500 - Main brand color
    primaryDark: '#059669',   // Emerald 600 - Pressed state
    primaryLight: '#34d399', // Emerald 400 - Light variant
    secondary: '#0f172a',    // Slate 900 - Dark backgrounds
    accent: '#f59e0b',       // Amber 500 - Highlights
};

// Semantic colors for fintech
export const SemanticColors = {
    success: '#10b981',      // Emerald - Positive/income
    successLight: '#d1fae5', // Emerald 100
    error: '#f43f5e',        // Rose 500 - Negative/expenses
    errorLight: '#ffe4e6',   // Rose 100
    warning: '#f59e0b',      // Amber 500 - Warnings
    warningLight: '#fef3c7', // Amber 100
    info: '#3b82f6',         // Blue 500 - Information
    infoLight: '#dbeafe',    // Blue 100
};

// Credit score colors
export const CreditScoreColors = {
    excellent: '#10b981',    // 750+
    good: '#22c55e',         // 700-749
    fair: '#eab308',         // 650-699
    poor: '#f43f5e',         // Below 650
};

// Transaction type colors
export const TransactionColors = {
    income: '#10b981',
    expense: '#f97316',
    incomeBg: '#d1fae5',
    expenseBg: '#ffedd5',
};

// Category colors for spending chart
export const CategoryColors = {
    food: '#f97316',         // Orange 500
    transport: '#3b82f6',    // Blue 500
    entertainment: '#8b5cf6',// Violet 500
    shopping: '#ec4899',    // Pink 500
    bills: '#ef4444',        // Red 500
    others: '#10b981',       // Emerald 500
};

const tintColorLight = BrandColors.primary;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#f8fafc',   // Slate 50
    card: '#ffffff',
    tint: tintColorLight,
    icon: '#64748b',        // Slate 500
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorLight,
    border: '#e2e8f0',       // Slate 200
    secondaryText: '#64748b',
  },
  dark: {
    text: '#ECEDEE',
    background: '#0f172a',  // Slate 900
    card: '#1e293b',         // Slate 800
    tint: tintColorDark,
    icon: '#94a3b8',         // Slate 400
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorDark,
    border: '#334155',       // Slate 700
    secondaryText: '#94a3b8',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
