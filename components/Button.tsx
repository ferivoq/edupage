import { TouchableNativeFeedback, View, Text } from "react-native";
import FeatherIcons from '@expo/vector-icons/Feather';

type FeatherIconsName = React.ComponentProps<typeof FeatherIcons>['name'];

interface ButtonProps {
    onPress: ()=>void
    icon: FeatherIconsName
    text: string
    backgroundColor: string
    color: string
}

export interface SpecializedButtonProps {
    onPress: ()=>void
    icon: FeatherIconsName
    text: string
}

export function Button({onPress, icon, text, backgroundColor, color}: ButtonProps){
    return <View
        style={{
            backgroundColor,
            borderRadius: 12,
            overflow: 'hidden',
        }}
    >
        <TouchableNativeFeedback
            onPress={onPress}
        >
            <View
                style={{
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 12
                }}
            >
                <FeatherIcons name={icon} color={color} size={25} />
                <Text
                    style={{
                        color,
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginLeft: 7,
                    }}
                >{text}</Text>
            </View>
        </TouchableNativeFeedback>
    </View>
}