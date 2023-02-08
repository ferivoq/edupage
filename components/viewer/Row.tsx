import { View } from "react-native";
import { CardData, getCardKey, getCardsInRow, PlaceholderCardData } from "../../data/cards";
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
    let cards: (CardData | PlaceholderCardData)[] = [];
    if (timetable){
        cards = getCardsInRow(timetable,dayId,periodId,classId);
    }

    return <View
        style={{
            height: Styles.viewer.rowHeight,
            width: "100%",
            marginBottom: Styles.viewer.spacing,
            flexDirection: "row"
        }}
    >
        { cards.map(card=>{
            return <Card key={getCardKey(card)} card={card}></Card>
        }) }
    </View>
}