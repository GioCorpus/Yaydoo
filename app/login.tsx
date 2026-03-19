import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { BrandColors } from '../constants/theme';
import { useAuthStore } from '../src/store/authStore';

export default function LoginScreen() {
    const router = useRouter();
    const { 
        login, 
        checkBiometrics, 
        hasBiometrics, 
        isAuthenticated, 
        isLoading,
        error,
        clearError 
    } = useAuthStore();

    // Check biometric availability on mount
    useEffect(() => {
        checkBiometrics();
    }, []);

    // Navigate when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/(tabs)');
        }
    }, [isAuthenticated]);

    // Show error alert when error occurs
    useEffect(() => {
        if (error) {
            Alert.alert(
                'Authentication Error',
                error,
                [{ text: 'OK', onPress: clearError }]
            );
        }
    }, [error]);

    const handleLogin = useCallback(async () => {
        const success = await login();
        if (success) {
            router.replace('/(tabs)');
        }
    }, [login, router]);

    const handleCreateAccount = useCallback(() => {
        // TODO: Navigate to registration screen
        Alert.alert(
            'Create Account',
            'Account creation would be implemented here with proper form validation and API integration.',
            [{ text: 'OK' }]
        );
    }, []);

    const handleForgotPassword = useCallback(() => {
        // TODO: Navigate to password reset
        Alert.alert(
            'Forgot Password',
            'Password reset functionality would be implemented here.',
            [{ text: 'OK' }]
        );
    }, []);

    return (
        <View className="flex-1 bg-slate-900 justify-center items-center p-6">
            <StatusBar style="light" />

            {/* Logo Section */}
            <View className="items-center mb-8">
                <View 
                    className="w-24 h-24 bg-emerald-500 rounded-full items-center justify-center mb-6 shadow-2xl"
                    style={{ shadowColor: BrandColors.primary, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10 }}
                >
                    <Ionicons name="wallet-outline" size={48} color="white" />
                </View>
                
                <Text className="text-white text-3xl font-bold mb-2">NeoWallet</Text>
                <Text className="text-slate-400 text-base text-center max-w-xs">
                    Secure, fast, and biometric-ready financial management for Mexico.
                </Text>
            </View>

            {/* Features List */}
            <View className="w-full mb-8">
                <View className="flex-row items-center mb-3">
                    <Ionicons name="shield-checkmark" size={20} color={BrandColors.primary} />
                    <Text className="text-slate-400 text-sm ml-3">Bank-level security with encryption</Text>
                </View>
                <View className="flex-row items-center mb-3">
                    <Ionicons name="flash" size={20} color={BrandColors.primary} />
                    <Text className="text-slate-400 text-sm ml-3">Instant transfers between Mexican banks</Text>
                </View>
                <View className="flex-row items-center">
                    <Ionicons name="analytics" size={20} color={BrandColors.primary} />
                    <Text className="text-slate-400 text-sm ml-3">Track your spending with smart insights</Text>
                </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl flex-row justify-center items-center shadow-lg active:bg-emerald-600 ${isLoading ? 'bg-slate-600' : 'bg-emerald-500'}`}
                style={{ 
                    shadowColor: BrandColors.primary, 
                    shadowOpacity: 0.3, 
                    shadowRadius: 10, 
                    elevation: 5 
                }}
            >
                {isLoading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <>
                        <Ionicons 
                            name={hasBiometrics ? "finger-print" : "log-in-outline"} 
                            size={24} 
                            color="white" 
                        />
                        <Text className="text-white font-bold text-lg ml-2">
                            {hasBiometrics ? 'Login with Biometrics' : 'Login'}
                        </Text>
                    </>
                )}
            </TouchableOpacity>

            {/* Create Account Link */}
            <View className="flex-row mt-8">
                <Text className="text-slate-500 text-sm">Don't have an account? </Text>
                <TouchableOpacity onPress={handleCreateAccount}>
                    <Text className="text-emerald-400 text-sm font-medium">Create one</Text>
                </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
                className="mt-4"
                onPress={handleForgotPassword}
            >
                <Text className="text-slate-500 text-sm">Forgot your password?</Text>
            </TouchableOpacity>
        </View>
    );
}
