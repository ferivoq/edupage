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
            source={require("../assets/icon.png")}
            style={{
                width: 100,
                height: 100,
                marginBottom: 40,
            }}
        />
        <IdInput />
    </View>
}