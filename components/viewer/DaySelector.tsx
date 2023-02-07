import { MutableRefObject, Ref, RefObject } from 'react';
import { View, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import PagerView from 'react-native-pager-view';
import { create } from 'zustand';
import { useGlobalStore } from '../../state/GlobalStore'

interface Props {
    pagerRef: RefObject<PagerView>
}

interface DaySelectorState {
    selectedDay: number
}

export const useDaySelectorStore = create<DaySelectorState>(set=>({
    selectedDay: 0,
}))

export function DaySelector({pagerRef}: Props){
    let days = useGlobalStore(state=>state.timetable?.days);
    let selectedDay = useDaySelectorStore(state=>state.selectedDay);

    return <View
        style={{
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8
        }}
    >
        { days?.filter(e=>e.val != null).map(day=>{
            let active = day.val == selectedDay;
            return <View
                style={{
                    marginHorizontal: 31.16/2,
                    width: 35.33,
                    height: 35.33,
                }}
                key={day.id}
            >
                <TouchableOpacity
                    onPress={()=>{
                        pagerRef.current?.setPageWithoutAnimation(Number(day.val));
                        useDaySelectorStore.setState({selectedDay: Number(day.val)})
                    }}
                >
                    <View
                        style={{
                            width: 30.33,
                            height: 30.33,
                            borderRadius: 30.33,
                            backgroundColor: active ? "#0074D921" : "transparent",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15.16,
                                fontWeight: "bold",
                                color: active ? "#0074D9" : "#3C3C3C"
                            }}
                        >{day.shortName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }) }
    </View>
}