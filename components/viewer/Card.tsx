import { Entry as EntryObject } from "../../data/entries";
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { Lesson } from "../../data/lessons";
import { Styles } from "../../styles/styles";
import { Group } from "../../data/groups";
import { CardData, isPlaceholder, PlaceholderCardData } from "../../data/cards";

interface Props {
    card: CardData | PlaceholderCardData
}

export function Card({card}: Props) {
    let {lesson, entry, groups} = card;
    let duration = lesson?.duration || 1;

    if (isPlaceholder(card)) {
        return <View
            style={{
                marginRight: Styles.viewer.spacing,
                flex: 1,
                zIndex: 0
            }}
        >
        </View>
    }

    return <View
        style={{
            marginRight: Styles.viewer.spacing,
            backgroundColor: "green",
            flex: 1,
            borderRadius: 8.66,
            height: Styles.viewer.rowHeight * duration + Styles.viewer.spacing * (duration-1),
            overflow: "hidden",
            zIndex: 1
        }}
    >
        <TouchableNativeFeedback
            onPress={()=>{
                alert(JSON.stringify(card.groups))
            }}
        >
            <View
                style={{
                    padding: 7,
                    width: "100%",
                    height: "100%",
                    alignSelf: "stretch",
                    flexGrow: 1,
                }}
            >
                <Text>{groups?.map(e=>`${e.id}`).join("|")}</Text>
                <Text>{groups?.map(e=>`${e.name}`).join("|")}</Text>
            </View>
        </TouchableNativeFeedback>
    </View>
}