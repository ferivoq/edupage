import { Modal, View, Text, TouchableWithoutFeedback } from "react-native";
import { create } from "zustand";
import { CardData, getCardColor, getClassroomText, getGroupText, getShortClassroomText, getTeacherText } from "../../data/cards";
import { useGlobalStore } from "../../state/GlobalStore";

interface LessonModalState {
    cardData?: CardData
    show: (cardData: CardData) => void
    hide: ()=>void
}

export const useLessonModalStore = create<LessonModalState>(set=>({
    cardData: undefined,
    show(cardData){
        set({cardData});
    },
    hide(){
        set({cardData: undefined});
    }
}))

function ModalInner(props: {card: CardData}){
    let { card } = props;
    let timetable = useGlobalStore(state=>state.timetable);

    if (!timetable){
        return <></>
    }

    let startPeriodIndex = timetable.periods.findIndex(e=>e.id == card.entry.periodId);
    let startPeriod = timetable.periods[startPeriodIndex];
    let endPeriod = timetable.periods[startPeriodIndex+(card.lesson.duration-1)];

    let periodText = startPeriod.name;

    if (startPeriod != endPeriod){
        periodText += `-${endPeriod.name}`;
    }

    let details: string[][] = [
        [timetable.strings.teacher,getTeacherText(card)],
        [timetable.strings.classroom,getClassroomText(card)],
        [timetable.strings.group,getGroupText(card)],
        [timetable.strings.week,card.week.name],
    ]

    return <View
        style={{
            borderRadius: 17.66,
            backgroundColor: getCardColor(card),
            padding: 18.66,
            maxWidth: 266.66,
            width: "100%",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            elevation: 1,
        }}
    >
        <Text
            style={{
                fontSize: 19,
                textAlign: "center"
            }}
        >{card.subject.name}</Text>
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 12.33
            }}
        >
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 21.33,
                    marginRight: 11.16
                }}
            >{periodText}</Text>
            <View>
                <Text>{`${startPeriod.startTime}-${endPeriod.endTime}`}</Text>
                <Text style={{opacity: 0.75}}>{getShortClassroomText(card)}</Text>
            </View>
        </View>
        { details.map(([title,text])=>{
            return <Text
                key={title}
            >
                <Text style={{fontWeight: "bold"}}>{title}</Text>
                <Text>{": "+text}</Text>
            </Text>
        }) }
    </View>
}

export function LessonModal(){

    let { cardData: card, show, hide } = useLessonModalStore();

    return <Modal
        animationType="fade"
        visible={card != undefined}
        transparent={true}
        onRequestClose={hide}
    >
        <TouchableWithoutFeedback
            onPress={hide}
        >
            <View
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                { card && <ModalInner card={card} /> }
            </View>
        </TouchableWithoutFeedback>
    </Modal>
}