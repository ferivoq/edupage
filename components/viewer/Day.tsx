import { View, Text } from "react-native";
import { useGlobalStore } from "../../state/GlobalStore";

interface DayProps {
    dayId: string
}

export function Day({dayId}: DayProps){

    let timetable = useGlobalStore(state=>state.timetable);
    let day = timetable?.days.find(e=>e.id == dayId);

    return <View>
        <Text>{day?.name}</Text>
    </View>
}