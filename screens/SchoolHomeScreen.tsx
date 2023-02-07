import { Link, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import type { SchoolHomeProps } from '../App';

export function SchoolHomeScreen(){
    let route = useRoute<SchoolHomeProps['route']>();

    return <View>
        <Text>{route.params.schoolId}</Text>
        <Link to={"/eszi/timetable/95/class/-44"}>test</Link>
    </View>
}