import { z } from "zod";
import type { Schema } from 'zod';
import { TimetableJson } from "./timetable";

export const TableSchema = z.object({
    id: z.string(),
    data_rows: z.array(z.any())
})

export function findBySchema<T extends Schema>(array: unknown[], id: string, schema: T): z.infer<T> {

    const TableSchema = z.object({
        id: z.literal(id),
        data_rows: z.array(schema)
    })

    for(let e of array){
        let result = TableSchema.safeParse(e);
        if (result.success){
            return result.data;
        }
    }
    throw new Error("No object matching the provided schema was found in the array");
}
export function getTableItems<ResultType>(json: TimetableJson, id: string, schema: Schema, factory: (itemJson: any)=>ResultType): ResultType[] {
    return findBySchema(json.r.dbiAccessorRes.tables, id, schema)
        .data_rows.map(factory);
}