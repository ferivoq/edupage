import { z } from 'zod';
import type { Schema } from 'zod';

import { ClassesSchema, Class } from './classes';
import { Period, PeriodsSchema } from './periods';

export const TimetableSchema = z.object({
    r: z.object({
        dbiAccessorRes: z.object({
            tables: z.array(
                z.any()
                .or(ClassesSchema)
                .or(PeriodsSchema)
            )
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

    constructor(json: TimetableJson){
        this.periods = findBySchema(json.r.dbiAccessorRes.tables,PeriodsSchema)
            .data_rows.map(e=>new Period(e));
        this.classes = findBySchema(json.r.dbiAccessorRes.tables,ClassesSchema)
            .data_rows.map(e=>new Class(e));
    }
}