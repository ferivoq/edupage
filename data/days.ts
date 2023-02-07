import { z } from 'zod';
import { TableSchema } from './table';

const DaySchema = z.object({
    id: z.string(),
    vals: z.array(z.string()),
    val: z.number().or(z.null()),
    name: z.string(),
    short: z.string()
})

export const DaysSchema = TableSchema.extend({
    id: z.literal("daysdefs"),
    data_rows: z.array(DaySchema)
});

type DayJson = z.infer<typeof DaySchema>

export class Day {
    id: string;
    name: string;
    shortName: string;
    val: number | null;
    vals: string[];

    match(val: string){
        return this.vals.includes(val);
    }

    constructor(json: DayJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
        this.val = json.val;
        this.vals = json.vals;
    }
}