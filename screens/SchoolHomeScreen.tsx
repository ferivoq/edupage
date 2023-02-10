import { Link, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Button, ScrollView, Text, TouchableNativeFeedback, View } from 'react-native';
import { SchoolHomeRoute, useNavigation } from '../navigation';
import seedrandom from 'seedrandom';
import { useGlobalStore } from '../state/GlobalStore';
import { ControlPanel } from '../components/schoolHome/ControlPanel';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcons from '@expo/vector-icons/Feather';

export function SchoolHomeScreen(){
    let route = useRoute<SchoolHomeRoute>();
    let navigation = useNavigation();
    let schoolId = route.params.schoolId;
    let {timetable, versions, updateTimetable} = useGlobalStore(({versions, timetable, updateTimetable})=>({versions,timetable,updateTimetable}));

    useEffect(() => {
        updateTimetable(schoolId,undefined);
    }, []);

    if (versions && !versions.current){
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
            <View
                style={{
                    backgroundColor: "#2aa2a2",
                    borderRadius: 12,
                    overflow: 'hidden',
                }}
            >
                <TouchableNativeFeedback
                    onPress={()=>{
                        navigation.pop();
                    }}
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
                        <FeatherIcons name='arrow-left' color={"#fff"} size={25} />
                        <Text
                            style={{
                                color: "#fff",
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginLeft: 7,
                            }}
                        >Go back</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    }

    return <ScrollView>
        <SafeAreaView>
            <ControlPanel />
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
            { timetable?.classes.map(_class=>{
                return <View
                    key={_class.id}    
                    style={{
                        borderWidth: 2,
                        borderColor: "#ECECEC",
                        borderRadius: 13.66,
                        overflow: 'hidden',
                        marginBottom: 20.66,
                        marginHorizontal: 10.33,
                    }}
                >
                    <View
                        style={{
                            width: 87.33,
                            height: 87.33,
                        }}
                    >
                        <Link to={`/${schoolId}/timetable/${versions?.current?.id}/class/${_class.id}`}>
                            <TouchableNativeFeedback
                                onPress={()=>{
                                    navigation.navigate("TimetableViewer", {
                                        schoolId,
                                        type: "class",
                                        timetableId: String(versions?.current?.id),
                                        objectId: String(_class.id)
                                    });
                                }}
                                style={{
                                    backgroundColor: 'red'
                                }}
                            >
                                <View
                                    style={{
                                        width: 87.33,
                                        height: 87.33,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            position: "absolute",
                                            borderRadius: 49,
                                            backgroundColor: `hsl(${Math.floor(seedrandom(_class.id)()*360)}, 100%, 88%)`,
                                            width: 49,
                                            height: 49,
                                        }}
                                    >
                                        
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 18.38,
                                            color: "#000000A6",
                                            fontWeight: "bold",
                                            zIndex: 1,
                                            textAlign: 'center'
                                        }}
                                        numberOfLines={2}
                                    >{_class.shortName}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </Link>
                    </View>
                </View>
            }) }
            </View>
        </SafeAreaView>
    </ScrollView>
}