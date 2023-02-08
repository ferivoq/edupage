import { z } from 'zod';
import { TableSchema } from './table';

const DivisionSchema = z.object({
    id: z.string(),
    groupids: z.array(z.string())
})

export const DivisionsSchema = TableSchema.extend({
    id: z.literal("divisions"),
    data_rows: z.array(DivisionSchema)
});

type DivisionJson = z.infer<typeof DivisionSchema>

export class Division {
    id: string;
    groupIds: string[];

    constructor(json: DivisionJson){
        this.id = json.id;
        this.groupIds = json.groupids;
    }
}