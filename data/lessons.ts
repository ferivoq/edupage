import { z } from 'zod';
import { TableSchema } from './table';

const LessonSchema = z.object({
    id: z.string(),
    subjectid: z.string(),
    teacherids: z.array(z.string()),
    groupids: z.array(z.string()),
    classids: z.array(z.string()),
    count: z.number(),
    durationperiods: z.number(),
})

export const LessonsSchema = TableSchema.extend({
    id: z.literal("lessons"),
    data_rows: z.array(LessonSchema)
});

type LessonJson = z.infer<typeof LessonSchema>

export class Lesson {
    id: string;
    subjectId: string;
    teacherIds: string[];
    groupIds: string[];
    classIds: string[];
    duration: number;

    constructor(json: LessonJson){
        this.id = json.id;
        this.subjectId = json.subjectid;
        this.teacherIds = json.teacherids;
        this.groupIds = json.groupids;
        this.classIds = json.classids;
        this.duration = json.durationperiods;
    }
}