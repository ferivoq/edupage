import { Link, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState, version } from 'react';
import { ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import type { NavigationProps, SchoolHomeProps } from '../App';
import { getTimetableData, getVersions } from '../data/api';
import { Timetable } from '../data/timetable';
import { Versions } from '../data/versions';
import seedrandom from 'seedrandom';

export function SchoolHomeScreen(){
    let route = useRoute<SchoolHomeProps['route']>();
    let navigation = useNavigation<SchoolHomeProps['navigation']>();
    let schoolId = route.params.schoolId;
    let [versions, setVersions] = useState<Versions | undefined>();
    let [timetable, setTimetable] = useState<Timetable | undefined>();
    
    useEffect(()=>{
        getVersions(schoolId).then(setVersions);
    },[])
    useEffect(()=>{
        if (versions?.current){
            getTimetableData(schoolId,versions.current.id).then(setTimetable);
        }
    },[versions])

    return <ScrollView>
        <View
            style={{
                flexDirection: "column",
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    margin: 20.66,
                    borderRadius: 10.33,
                    width: 320, 
                    overflow: "hidden",
                }}
            >
                <TouchableNativeFeedback>
                    <View
                        style={{
                            height: 36.33,
                            backgroundColor: "#EDEDED",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                color: "#515151",
                                fontSize: 16
                            }}
                        >{versions?.current?.text}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
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
    </ScrollView>
}