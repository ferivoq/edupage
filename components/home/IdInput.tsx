import { TextInput, View, Text, TouchableNativeFeedback, ActivityIndicator } from "react-native";
import { create } from "zustand";
import FeatherIcons from '@expo/vector-icons/Feather';
import { useNavigation } from "../../navigation";
import { doesSchoolExist } from "../../data/api";
import { useGlobalStore } from "../../state/GlobalStore";

interface State {
    schoolId: string
    isValidSchoolId: boolean | undefined
    setSchoolId: (id: string)=>void
}
let validationTimeout: NodeJS.Timeout;

let useStore = create<State>(set=>({
    schoolId: "",
    isValidSchoolId: undefined,
    setSchoolId(schoolId){
        set({
            schoolId,
            isValidSchoolId: undefined
        })
        clearTimeout(validationTimeout);
        if (schoolId != ""){
            validationTimeout = setTimeout(()=>{
                doesSchoolExist(schoolId).then(isValidSchoolId=>{
                    set({
                        isValidSchoolId
                    })
                })
            },300)
        }
    }
}))

export function IdInput(){
    let { schoolId, isValidSchoolId, setSchoolId } = useStore();

    let navigation = useNavigation();
    
    let textStyle = {
        fontSize: 16,
        color: "#000"
    }

    let inputHeight = 45;
    let borderRadius = 12;

    let buttonColor = "#4d4d4d";

    if (isValidSchoolId == true){
        buttonColor = "#2aa2a2";
    }
    else if (isValidSchoolId == false){
        buttonColor = "#d74942";
    }

    let isLoading = isValidSchoolId == undefined;

    if (schoolId == ""){
        isLoading = false;
    }

    return <View
        style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100%",
            paddingHorizontal: 7,
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EDEDED",
                height: inputHeight,
                paddingHorizontal: 14,
                borderRadius,
                flexShrink: 1
            }}
        >
            <Text
                style={textStyle}
            >http://</Text>
            <TextInput
                style={[
                    textStyle,
                    {
                        textAlign: "center",
                        padding: 0,
                        margin: 0,
                        flexShrink: 1,
                        color: isValidSchoolId == false ? "#d74942" : "#2aa2a2",
                        fontWeight: "bold",
                    }
                ]}
                onChangeText={(text)=>{
                    let schoolId = text.toLocaleLowerCase();
                    setSchoolId(schoolId);
                }}
                placeholder={"id"}
                placeholderTextColor={"#6c9393"}
                value={schoolId}
            ></TextInput>
            <Text
                style={textStyle}
            >.edupage.org</Text>
        </View>
        <View
            style={{
                borderRadius,
                overflow: "hidden",
                marginLeft: 7,
            }}
        >
            <TouchableNativeFeedback
                onPress={()=>{
                    if (isValidSchoolId){
                        useGlobalStore.getState().updateTimetable(schoolId,undefined);
                        navigation.navigate("SchoolHome",{
                            schoolId
                        })
                    }
                }}
            >
                <View
                    style={{
                        backgroundColor: buttonColor,
                        height: inputHeight,
                        width: inputHeight,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    { isLoading && <ActivityIndicator size={"small"} color={"#fff"} /> }
                    { !isLoading && <FeatherIcons name={isValidSchoolId == false ? "x" : "arrow-right"} size={25} color={"#fff"}></FeatherIcons> }
                </View>
            </TouchableNativeFeedback>
        </View>
    </View>
}