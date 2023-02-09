import { Entry as EntryObject } from "../../data/entries";
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { Lesson } from "../../data/lessons";
import { Styles } from "../../styles/styles";
import { Group } from "../../data/groups";
import { CardData, getCardColor, getShortClassroomText, getGroupText, getTeacherText, isPlaceholderCardData, PlaceholderCardData, isCardData } from "../../data/cards";
import { useLessonModalStore } from "./LessonModal";

interface Props {
    card: CardData | PlaceholderCardData
}

export function Card({card}: Props) {
    if (!isCardData(card)) {
        return <View
            style={{
                marginRight: Styles.viewer.spacing,
                flex: 1,
                zIndex: 0
            }}
        >
        </View>
    }

    let {lesson, entry, groups, subject} = card;
    let duration = lesson.duration || 1;
    let isEntireClass = groups[0]?.isEntireClass;

    let textStyle = {
        fontSize: 14,
        lineHeight: 14,
        color: "#000000",
    }

    return <View
        style={{
            marginRight: Styles.viewer.spacing,
            backgroundColor: getCardColor(card),
            flex: 1,
            borderRadius: 8.66,
            height: Styles.viewer.rowHeight * duration + Styles.viewer.spacing * (duration-1),
            overflow: "hidden",
            zIndex: 1
        }}
    >
        <TouchableNativeFeedback
            onPress={()=>{
                useLessonModalStore.getState().show(card);
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    alignSelf: "stretch",
                    flexGrow: 1,
                    justifyContent: "space-between",
                    padding: 7,
                }}
            >
                <View
                    style={{
                        flexDirection: "row"
                    }}
                >
                    <Text
                        style={textStyle}
                        numberOfLines={1}
                    >{getGroupText(card)}</Text>
                    <Text
                        style={[textStyle,{
                            flex: 1,
                            textAlign: "right"
                        }]}
                        numberOfLines={1}
                    >{getShortClassroomText(card)}</Text>
                </View>
                <Text
                    style={[textStyle,{textAlign: "center"}]}
                    numberOfLines={duration * 2}
                >{subject.name}</Text>
                <Text
                    style={[textStyle,{textAlign: "right"}]}
                    numberOfLines={1}
                >{getTeacherText(card)}</Text>
            </View>
        </TouchableNativeFeedback>
    </View>
}