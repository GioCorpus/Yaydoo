import * as LocalAuthentication from 'expo-local-authentication';
import { create } from 'zustand';

export const storage = new MMKV();

interface AuthState {
    isAuthenticated: boolean;
    hasBiometrics: boolean;
    checkBiometrics: () => Promise<void>;
    login: () => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    hasBiometrics: false,

    checkBiometrics: async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        set({ hasBiometrics: hasHardware && isEnrolled });
    },

    login: async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to access your dashboard',
            fallbackLabel: 'Use Passcode',
        });

        if (result.success) {
            set({ isAuthenticated: true });
            return true;
        }
        return false;
    },

    logout: () => set({ isAuthenticated: false }),
}));
