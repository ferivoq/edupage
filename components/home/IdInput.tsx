import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { create } from "zustand";
import FeatherIcons from '@expo/vector-icons/Feather';
import { Link } from "@react-navigation/native";

export function IdInput(){
    let [schoolId, setSchoolId] = useState("");
    
    let textStyle = {
        fontSize: 16,
        color: "#000"
    }

    let inputHeight = 45;
    let borderRadius = 12;

    return <View
        style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100%"
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
                        color: "#2aa2a2",
                        fontWeight: "bold",
                    }
                ]}
                onChangeText={(text)=>{
                    setSchoolId(text.toLocaleLowerCase())
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
                backgroundColor: "#2aa2a2",
                height: inputHeight,
                width: inputHeight,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 7,
                borderRadius
            }}
        >
            <Link to={`/${schoolId}/`}>
                <FeatherIcons name="arrow-right" size={25} color={"#fff"}></FeatherIcons>
            </Link>
        </View>
    </View>
}