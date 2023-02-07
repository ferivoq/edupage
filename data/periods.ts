import { z } from 'zod';
import { TableSchema } from './table';

export const PeriodSchema = z.object({
    id: z.string(),
    starttime: z.string(),
    endtime: z.string(),
    period: z.string(),
})

export type PeriodJson = z.infer<typeof PeriodSchema>

export const PeriodsSchema = TableSchema.extend({
    id: z.literal("periods"),
    data_rows: z.array(PeriodSchema)
})

export class Period {

    id: string;
    startTime: string;
    endTime: string;
    name: string;

    constructor(json: PeriodJson){
        this.id = json.id;
        this.startTime = json.starttime;
        this.endTime = json.endtime;
        this.name = json.period;
    }
}