import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { SchoolHomeScreen } from './screens/SchoolHomeScreen';
import { TimetableViewerScreen } from './screens/TimetableViewerScreen';
import { Stack, stackLinking } from './navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <NavigationContainer linking={stackLinking}>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: {
                        backgroundColor: "#fff"
                    },
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SchoolHome" component={SchoolHomeScreen} />
                <Stack.Screen name="TimetableViewer" component={TimetableViewerScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}