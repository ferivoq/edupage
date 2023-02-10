import { View, Image } from 'react-native';
import { IdInput } from '../components/home/IdInput';

export function HomeScreen(){
    return <View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        }}
    >
        <Image
            source={require("../assets/homepage.png")}
            resizeMode={"contain"}
            style={{
                width: "100%",
                height: "30%",
                marginBottom: 50,
            }}
        />
        <IdInput />
    </View>
}