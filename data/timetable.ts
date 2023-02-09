import { z } from 'zod';
import { Class, parseClasses } from './classes';
import { Period, parsePeriods } from './periods';
import { Day, parseDays } from './days';
import { Entry, parseEntires } from './entries';
import { Lesson, parseLessons } from './lessons';
import { Group, parseGroups } from './groups';
import { Division, parseDivisions } from './divisions';
import { Subject, parseSubjects } from './subjects';
import { Teacher, parseTeachers } from './teachers';
import { Classroom, parseClassrooms } from './classrooms';

export const TimetableSchema = z.object({
    r: z.object({
        dbiAccessorRes: z.object({
            tables: z.array(z.any())
        })
    })
});

export type TimetableJson = z.infer<typeof TimetableSchema>
export class Timetable {

    periods: Period[]
    classes: Class[]
    days: Day[]
    entires: Entry[]
    lessons: Lesson[]
    groups: Group[]
    divisions: Division[]
    subjects: Subject[]
    teachers: Teacher[]
    classrooms: Classroom[]

    constructor(json: TimetableJson){
        this.periods = parsePeriods(json);
        this.classes = parseClasses(json);
        this.days = parseDays(json);
        this.entires = parseEntires(json);
        this.lessons = parseLessons(json);
        this.groups = parseGroups(json);
        this.divisions = parseDivisions(json);
        this.subjects = parseSubjects(json);
        this.teachers = parseTeachers(json);
        this.classrooms = parseClassrooms(json);
    }
}