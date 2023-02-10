import { View, Text, TouchableNativeFeedback, ActivityIndicator } from "react-native";

export function LoadingScreen(){
    return <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            alignSelf: 'stretch'
        }}
    >
        <ActivityIndicator color={"#000"} size={"large"}></ActivityIndicator>
    </View>
}