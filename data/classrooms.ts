import { z } from 'zod';
import { TableSchema } from './table';

const ClassroomSchema = z.object({
    id: z.string(),
    name: z.string(),
    short: z.string(),
})

export const ClassroomsSchema = TableSchema.extend({
    id: z.literal("classrooms"),
    data_rows: z.array(ClassroomSchema)
});

type ClassroomJson = z.infer<typeof ClassroomSchema>

export class Classroom {
    id: string;
    name: string;
    shortName: string;

    constructor(json: ClassroomJson){
        this.id = json.id;
        this.name = json.name;
        this.shortName = json.short;
    }
}