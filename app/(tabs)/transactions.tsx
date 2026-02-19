import { Text, View } from 'react-native';

export default function TransactionsScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
            <Text className="text-xl font-bold dark:text-white">Transactions</Text>
            <Text className="text-slate-500 mt-2">Full history coming soon...</Text>
        </View>
    );
}
