import { View, Text, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "../navigation";
import { PrimaryButton } from "../components/PrimaryButton";
import FeatherIcons from '@expo/vector-icons/Feather';

export function NoTimetablesScreen(){

    let navigation = useNavigation();

    return <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        }}
    >
        <FeatherIcons name='meh' color={"#000"} size={60} />
        <Text
            style={{
                fontWeight: 'bold',
                fontSize: 23,
                marginVertical: 25,
                width: 120,
                textAlign: 'center'
            }}
        >No timetables available</Text>
        <PrimaryButton
            onPress={()=>{
                navigation.pop();
            }}
            icon='arrow-left'
            text='Go back'
        />
    </View>
}