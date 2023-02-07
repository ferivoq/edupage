import { z } from 'zod';
import type { Schema } from 'zod';

import { ClassesSchema, Class } from './classes';
import { Period, PeriodsSchema } from './periods';
import { Day, DaysSchema } from './days';
import { EntriesSchema, Entry } from './entries';
import { Lesson, LessonsSchema } from './lessons';
import { Group, GroupsSchema } from './groups';

export const TimetableSchema = z.object({
    r: z.object({
        dbiAccessorRes: z.object({
            tables: z.array(z.any())
        })
    })
});
type TimetableJson = z.infer<typeof TimetableSchema>

function findBySchema<T extends Schema>(array: unknown[], schema: T): z.infer<T> {
    for(let e of array){
        let result = schema.safeParse(e);
        if (result.success){
            return result.data;
        }
    }
    throw new Error("No object matching the provided schema was found in the array");
}

export class Timetable {

    periods: Period[]
    classes: Class[]
    days: Day[]
    entires: Entry[]
    lessons: Lesson[]
    groups: Group[]

    constructor(json: TimetableJson){
        this.periods = findBySchema(json.r.dbiAccessorRes.tables,PeriodsSchema)
            .data_rows.map(e=>new Period(e));
        this.classes = findBySchema(json.r.dbiAccessorRes.tables,ClassesSchema)
            .data_rows.map(e=>new Class(e));
        this.days = findBySchema(json.r.dbiAccessorRes.tables,DaysSchema)
            .data_rows.map(e=>new Day(e));
        this.entires = findBySchema(json.r.dbiAccessorRes.tables,EntriesSchema)
            .data_rows.map(e=>new Entry(e));
        this.lessons = findBySchema(json.r.dbiAccessorRes.tables,LessonsSchema)
            .data_rows.map(e=>new Lesson(e));
        this.groups = findBySchema(json.r.dbiAccessorRes.tables,GroupsSchema)
            .data_rows.map(e=>new Group(e));
    }
}