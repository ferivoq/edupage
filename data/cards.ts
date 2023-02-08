import { Division } from "./divisions";
import { Entry } from "./entries";
import { Group } from "./groups";
import { Lesson } from "./lessons";
import { Timetable } from "./timetable";

export interface CardData {
    entry: Entry
    lesson: Lesson
    groups: Group[]
}

export interface PlaceholderCardData {
    entry: undefined
    lesson: undefined
    groups: Group[]
}

export function getCardKey(data: CardData | PlaceholderCardData){
    if (isPlaceholder(data)){
        return data.groups.map(e=>e.id).join(",");
    } else {
        return data.entry.id;
    }
}

export function isPlaceholder(data: CardData | PlaceholderCardData): data is PlaceholderCardData {
    return !data.lesson && !data.entry;
}

function findCommonDivision(timetable: Timetable,cards: CardData[]): Division | undefined {
    let divisionCount = new Map<string,number>();
    cards.forEach(card=>{
        card.groups?.forEach(group=>{
            if (divisionCount.has(group.divisionId)){
                divisionCount.set(group.divisionId,(divisionCount.get(group.divisionId) as number)+1);
            } else {
                divisionCount.set(group.divisionId,1);
            }
        })
    })
    let divisions = [...divisionCount.entries()]
        .map(([key,value])=>({id: key,count: value}))
        .sort((a,b)=>{
            return b.count - a.count
        })
    
    let commonDivisionId = divisions[0]?.id;
    return timetable.divisions.find(e=>e.id == commonDivisionId);
}

export function getCardsInRow(timetable: Timetable, dayId: string, periodId: string, classId: string): (CardData | PlaceholderCardData)[] {
    let day = timetable.days.find(e=>e.id == dayId);
    let lessons = timetable.lessons;
    let cards = timetable.entires.filter(entry=>{
        return day?.match(entry.days) && entry.periodId == periodId
    }).map(entry=>{
        let lesson = lessons.find(lesson=>lesson.id == entry.lessonId);
        if (!lesson){
            return undefined;
        }
        let groups = lesson.groupIds
            .map(groupId=>timetable.groups.find(e=>e.id == groupId))
            .filter(e=>e != undefined) as Group[];
        
        let card: CardData = {
            entry,
            lesson,
            groups,
        }
        return card;
    }).filter(card=>card != undefined && card.lesson?.classIds.includes(classId)) as CardData[];
    
    let cardsAndPlaceholders = [...cards] as (CardData | PlaceholderCardData)[];

    let division = findCommonDivision(timetable,cards);
    if (division){
        for (let groupId of division.groupIds){
            // if the group doesn't have a lesson in this row then create a placeholder for the group
            // all groups in the division must have either a card or a placeholder
            // this makes sure that when lessons that last more than one period overflow, they flow over the placeholder element instead of a card
            let exists = cards.find(e=>e.lesson.groupIds.includes(groupId)) != undefined;
            if (!exists){
                let group = timetable.groups.find(e=>e.id == groupId);
                if (!group){
                    continue;
                }

                cardsAndPlaceholders.push({
                    entry: undefined,
                    lesson: undefined,
                    groups: [group],
                })
            }
        }
    }

    cardsAndPlaceholders.sort((a,b)=>{
        let aName = a.groups[0]?.name || "";
        let bName = b.groups[0]?.name || "";
        return aName.localeCompare(bName);
    })

    return cardsAndPlaceholders;
}