import { z } from 'zod';
import { TableSchema } from './table';

const TeacherSchema = z.object({
    id: z.string(),
    short: z.string(),
})

export const TeachersSchema = TableSchema.extend({
    id: z.literal("teachers"),
    data_rows: z.array(TeacherSchema)
});

type TeacherJson = z.infer<typeof TeacherSchema>

export class Teacher {
    id: string;
    name: string;

    constructor(json: TeacherJson){
        this.id = json.id;
        this.name = json.short;
    }
}