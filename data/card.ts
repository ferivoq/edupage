import { Entry } from "./entries";
import { Group } from "./groups";
import { Lesson } from "./lessons";

export interface CardData {
    groups?: Group[]
    lesson?: Lesson
    entry?: Entry
}