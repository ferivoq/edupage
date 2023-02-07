import { z } from 'zod';
import { TableSchema } from './table';

const ClassSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
    color: z.string(),
})

export const ClassesSchema = TableSchema.extend({
    id: z.literal("classes"),
    data_rows: z.array(ClassSchema)
});

type ClassJson = z.infer<typeof ClassSchema>

export class Class {
    id: string;
    name: string;
    shortName: string;
    color: string;

    constructor(json: ClassJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
        this.color = json.color;
    }
}