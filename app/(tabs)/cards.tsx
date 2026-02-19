import { Text, View } from 'react-native';

export default function CardsScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
            <Text className="text-xl font-bold dark:text-white">My Cards</Text>
            <Text className="text-slate-500 mt-2">Virtual cards management coming soon...</Text>
        </View>
    );
}
