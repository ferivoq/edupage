import { Link } from "@react-navigation/native";
import { TouchableNativeFeedback, View, Text } from "react-native";
import { useGlobalStore } from "../../state/GlobalStore";
import FeatherIcons from '@expo/vector-icons/Feather';

export function ControlPanel(){

    let versions = useGlobalStore(state=>state.versions);

    let size = 36.33;
    let backgroundColor = "#EDEDED";
    let color = "#515151";
    let borderRadius = 10.33;

    if (!versions || !versions.current) {
        return <></>
    }
    
    return <View
        style={{
            alignItems: "center"
        }}
    >
        <View
            style={{
                flexDirection: "row",
                width: 315,
                alignItems: 'center',
                justifyContent: "center",
                margin: 20.66,
            }}
        >
            <View
                style={{
                    borderRadius,
                    overflow: "hidden",
                    flex: 1,
                }}
            >
                <TouchableNativeFeedback>
                    <View
                        style={{
                            height: size,
                            backgroundColor,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                color,
                                fontSize: 16
                            }}
                        >{versions.current.text}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
            <View
                style={{
                    marginLeft: 7,
                }}
            >
                <Link to={"/"}>
                    <View
                        style={{
                            backgroundColor,
                            width: size,
                            height: size,
                            borderRadius,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FeatherIcons name="settings" size={18} color={color}></FeatherIcons>
                    </View>
                </Link>
            </View>
        </View>
    </View>
}