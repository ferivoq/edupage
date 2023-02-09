import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinkingOptions, NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { SchoolHomeScreen } from './screens/SchoolHomeScreen';
import { TimetableViewerScreen } from './screens/TimetableViewerScreen';

interface ParamList extends ParamListBase {
  Home: {},
  SchoolHome: {
    schoolId: string
  },
  TimetableViewer: {
    schoolId: string
    type: string
    timetableId: string
    objectId: string
  }
}

export type NavigationProps = NativeStackScreenProps<ParamList>
export type SchoolHomeProps = NativeStackScreenProps<ParamList,'SchoolHome'>
export type TimetableViewerProps = NativeStackScreenProps<ParamList,'TimetableViewer'>

const Stack = createNativeStackNavigator<ParamList>();

const stackLinking: LinkingOptions<ParamList> = {
  prefixes: [],
  config:{
    screens:{
      Home: {
        path: ""
      },
      SchoolHome:{
        path: "/:schoolId/",
      },
      TimetableViewer:{
        path: "/:schoolId/timetable/:timetableId/:type/:objectId",
      }
    },
    initialRouteName:"Home",
  },
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
