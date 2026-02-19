import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../src/store/authStore';

export default function LoginScreen() {
    const router = useRouter();
    const { login, checkBiometrics, hasBiometrics, isAuthenticated } = useAuthStore();

    useEffect(() => {
        checkBiometrics();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/(tabs)');
        }
    }, [isAuthenticated]);

    const handleLogin = async () => {
        const success = await login();
        if (success) {
            router.replace('/(tabs)');
        }
    };

    return (
        <View className="flex-1 bg-slate-900 justify-center items-center p-6">
            <StatusBar style="light" />

            <View className="w-24 h-24 bg-emerald-500 rounded-full items-center justify-center mb-8 shadow-2xl shadow-emerald-500/50">
                <Ionicons name="wallet-outline" size={48} color="white" />
            </View>

            <Text className="text-white text-3xl font-bold mb-2">NeoWallet</Text>
            <Text className="text-slate-400 text-base mb-12 text-center">
                Secure, fast, and biometric-ready financial management.
            </Text>

            <TouchableOpacity
                onPress={handleLogin}
                className="w-full bg-emerald-500 py-4 rounded-xl flex-row justify-center items-center shadow-lg shadow-emerald-500/20 active:bg-emerald-600"
            >
                <Ionicons name={hasBiometrics ? "finger-print" : "log-in-outline"} size={24} color="white" className="mr-3" />
                <Text className="text-white font-bold text-lg ml-2">
                    {hasBiometrics ? 'Login with Face ID' : 'Login'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-6">
                <Text className="text-slate-500 text-sm">Create an account</Text>
            </TouchableOpacity>
        </View>
    );
}
