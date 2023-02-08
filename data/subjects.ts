import { z } from 'zod';
import { TableSchema } from './table';

const SubjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
    color: z.string()
})

export const SubjectsSchema = TableSchema.extend({
    id: z.literal("subjects"),
    data_rows: z.array(SubjectSchema)
});

type SubjectJson = z.infer<typeof SubjectSchema>

export class Subject {
    id: string;
    name: string;
    shortName: string;
    color: string;

    constructor(json: SubjectJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
        this.color = json.color;
    }
}