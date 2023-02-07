import { z } from 'zod';
import { TableSchema } from './table';

const EntrySchema = z.object({
    id: z.string(),
    lessonid: z.string(),
    period: z.string(),
    days: z.string(),
    weeks: z.string(),
    classroomids: z.array(z.string())
})

export const EntriesSchema = TableSchema.extend({
    id: z.literal("cards"),
    data_rows: z.array(EntrySchema)
});

type EntryJson = z.infer<typeof EntrySchema>

export class Entry {
    id: string;
    lessonId: string;
    periodId: string;
    days: string;
    weeks: string;
    classroomIds: string[]

    constructor(json: EntryJson){
        this.id = json.id;
        this.lessonId = json.lessonid;
        this.periodId = json.period;
        this.days = json.days;
        this.weeks = json.weeks;
        this.classroomIds = json.classroomids;
    }
}