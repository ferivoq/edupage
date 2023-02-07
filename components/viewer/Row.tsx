import { View, Text } from "react-native";
import { CardData } from "../../data/card";
import { Group } from "../../data/groups";
import { Lesson } from "../../data/lessons";
import { useGlobalStore } from "../../state/GlobalStore";
import { Styles } from "../../styles/styles";
import { Card } from "./Card";

interface Props {
    dayId: string
    periodId: string
    classId: string
}

export function Row({dayId, periodId, classId}: Props){

    let timetable = useGlobalStore(state=>state.timetable);
    let day = timetable?.days.find(e=>e.id == dayId);
    let lessons = timetable?.lessons;
    let items = timetable?.entires.filter(entry=>{
        return day?.match(entry.days) && entry.periodId == periodId
    }).map(entry=>{
        let lesson = lessons?.find(lesson=>lesson.id == entry.lessonId);
        let groups = lesson?.groupIds.map(groupId=>timetable?.groups.find(e=>e.id == groupId) as Group);
        let card: CardData = {
            lesson,
            entry,
            groups
        }
        return card;
    }).filter(({lesson})=>{
        return lesson && lesson?.classIds.includes(classId);
    });

    return <View
        style={{
            height: Styles.viewer.rowHeight,
            width: "100%",
            marginBottom: Styles.viewer.spacing,
            flexDirection: "row"
        }}
    >
        { items?.map(card=>{
            return <Card key={card.entry?.id || JSON.stringify(card)} card={card}></Card>
        }) }
    </View>
}