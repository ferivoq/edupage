import { Link, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Button, ScrollView, Text, TouchableNativeFeedback, View } from 'react-native';
import { SchoolHomeRoute, useNavigation } from '../navigation';
import seedrandom from 'seedrandom';
import { useGlobalStore } from '../state/GlobalStore';
import { ControlPanel } from '../components/schoolHome/ControlPanel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NoTimetablesScreen } from './NoTimetablesScreen';
import { ErrorScreen } from './ErrorScreen';
import { LoadingScreen } from './LoadingScreen';

export function SchoolHomeScreen(){
    let route = useRoute<SchoolHomeRoute>();
    let navigation = useNavigation();
    let schoolId = route.params.schoolId;
    let {timetable, versions, updateTimetable, error} = useGlobalStore(({versions, timetable, updateTimetable, error})=>({versions,timetable,updateTimetable,error}));

    useEffect(() => {
        updateTimetable(schoolId,undefined);
    }, []);

    if (error != undefined){
        return <ErrorScreen />
    }

    if (versions && !versions.current){
        return <NoTimetablesScreen />
    }

    return <View
        style={{
            flex: 1,
        }}
    >
        <View
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%'
            }}
        >
            { (!versions || !timetable) && <LoadingScreen /> }
        </View>
         <ScrollView>
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
    </View>
}