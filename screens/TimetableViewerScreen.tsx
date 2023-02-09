import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, Text, TouchableNativeFeedback, View } from 'react-native';
import type { TimetableViewerProps } from '../App';
import { createRef } from 'react';
import { useGlobalStore } from '../state/GlobalStore';
import { DaySelector, useDaySelectorStore } from '../components/viewer/DaySelector';
import { Day } from '../components/viewer/Day';
import PagerView from 'react-native-pager-view';
import { Styles } from '../styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export function TimetableViewerScreen(){
    let route = useRoute<TimetableViewerProps['route']>();
    let navigation = useNavigation<TimetableViewerProps['navigation']>();

    let timetable = useGlobalStore((state)=>state.timetable);

    let _class = timetable?.classes.find(e=>e.id == route.params.objectId);

    let pagerRef = createRef<PagerView>();

    // note: we don't use it as a hook, so the component doesn't rerender when the value changes.
    let selectedDay = useDaySelectorStore.getState().selectedDay;

    return <View
        style={{
            flexDirection: 'column',
            flex: 1,
        }}
    >
        <ScrollView
            style={{
                flex: 1
            }}
        >
            <SafeAreaView>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            margin: 10,
                            backgroundColor: "#EDEDED",
                            width: 84.66,
                            borderRadius: 10.33,
                            overflow: "hidden",
                        }}
                    >
                        <TouchableNativeFeedback
                            onPress={()=>{
                                navigation.pop();
                            }}
                        >
                            <View
                                style={{
                                    paddingVertical: 3.66,
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: "#515151"
                                    }}
                                >{_class?.name}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View
                    style={{
                        flexGrow: 1,
                        alignSelf: 'stretch',
                        flexDirection: 'row'
                    }}
                >
                    <View style={{
                        width: 30.33,
                    }}>
                        { timetable?.periods.map(period=>{
                            return <View
                                key={period.id}
                                style={{
                                    height: Styles.viewer.rowHeight,
                                    marginBottom: Styles.viewer.spacing,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18.38,
                                        color: "#2F2F2F",
                                    }}
                                >{period.name}</Text>
                            </View>
                        }) }
                    </View>
                    <View style={{
                        flexGrow: 1,
                        alignSelf: 'stretch'
                    }}>
                        <PagerView
                            ref={pagerRef}
                            style={{
                                flexGrow: 1,
                                alignSelf: 'stretch'
                            }}
                            onPageSelected={(event)=>{
                                let pos = event.nativeEvent.position;
                                useDaySelectorStore.setState({selectedDay:pos});
                            }}
                            initialPage={selectedDay}
                        >
                            { timetable?.days.filter(e=>e.val != null).map(day=>{
                                return <Day key={day.id} dayId={day.id} classId={route.params.objectId}></Day>
                            }) }
                        </PagerView>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
        <DaySelector pagerRef={pagerRef}></DaySelector>
    </View>
}