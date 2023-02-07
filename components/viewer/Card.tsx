import { Entry as EntryObject } from "../../data/entries";
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { Lesson } from "../../data/lessons";
import { Styles } from "../../styles/styles";
import { Group } from "../../data/groups";
import { CardData } from "../../data/card";

interface Props {
    card: CardData
}

export function Card({card}: Props) {
    let {lesson, entry, groups} = card;
    let duration = lesson?.duration || 1;

    return <View
        style={{
            marginRight: Styles.viewer.spacing,
            backgroundColor: "green",
            flex: 1,
            borderRadius: 8.66,
            height: Styles.viewer.rowHeight * duration + Styles.viewer.spacing * (duration-1),
            overflow: "hidden"
        }}
    >
        <TouchableNativeFeedback>
            <View
                style={{
                    padding: 7,
                    width: "100%",
                    height: "100%",
                    alignSelf: "stretch",
                    flexGrow: 1,
                }}
            >
                <Text>{lesson?.subjectId} {lesson?.duration}</Text>
                <Text>{groups?.map(e=>`${e.divisionId}`).join("|")}</Text>
            </View>
        </TouchableNativeFeedback>
    </View>
}