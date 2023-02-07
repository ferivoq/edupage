import { z } from 'zod';
import { TableSchema } from './table';

const GroupSchema = z.object({
    id: z.string(),
    name: z.string(),
    classid: z.string(),
    entireclass: z.boolean(),
    divisionid: z.string(),
    color: z.string()
})

export const GroupsSchema = TableSchema.extend({
    id: z.literal("groups"),
    data_rows: z.array(GroupSchema)
});

type GroupJson = z.infer<typeof GroupSchema>

export class Group {
    id: string;
    name: string;
    classId: string;
    isEntireClass: boolean;
    divisionId: string;
    color: string;

    constructor(json: GroupJson){
        this.id = json.id;
        this.name = json.name;
        this.classId = json.classid;
        this.isEntireClass = json.entireclass;
        this.divisionId = json.divisionid;
        this.color = json.color;
    }
}