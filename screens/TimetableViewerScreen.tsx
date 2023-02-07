import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import type { TimetableViewerProps } from '../App';

export function TimetableViewerScreen(){
    let route = useRoute<TimetableViewerProps['route']>();

    return <View>
        <Text>{route.params.schoolId}</Text>
        <Text>{route.params.timetableId}</Text>
        <Text>{route.params.type}</Text>
        <Text>{route.params.objectId}</Text>
    </View>
}