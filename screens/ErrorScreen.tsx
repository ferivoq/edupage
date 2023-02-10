import { View, Text, TouchableNativeFeedback } from "react-native";
import { useNavigation } from "../navigation";
import { PrimaryButton } from "../components/PrimaryButton";
import FeatherIcons from '@expo/vector-icons/Feather';
import { SecondaryButton } from "../components/SecondaryButton";
import { ErrorType, useGlobalStore } from "../state/GlobalStore";

export function ErrorScreen(){

    let navigation = useNavigation();
    let canGoBack = navigation.canGoBack();
    let error = useGlobalStore(state=>state.error);
    let errorMessage = "An error occurred";
    if (error == ErrorType.offline){
        errorMessage = "There is no internet";
    }

    return <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        }}
    >
        <FeatherIcons name='alert-triangle' color={"#000"} size={60} />
        <Text
            style={{
                fontWeight: 'bold',
                fontSize: 23,
                marginVertical: 25,
                width: 120,
                textAlign: 'center'
            }}
        >{errorMessage}</Text>
        <PrimaryButton
            onPress={()=>{
                let {schoolId, timetableId, updateTimetable} = useGlobalStore.getState();
                if (!schoolId){
                    return;
                }
                updateTimetable(schoolId, timetableId);
            }}
            icon='refresh-cw'
            text='Refresh'
        />
        { canGoBack && <View
            style={{
                marginTop: 7,
            }}
        >
            <SecondaryButton
                onPress={()=>{
                    navigation.pop();
                }}
                icon='arrow-left'
                text='Go back'
            />
        </View> }
    </View>
}