import { saveToCache } from "../storage/cache";
import { Timetable, TimetableSchema } from "./timetable";
import { Versions, VersionsSchema } from "./versions";

function makeRequest(url: string, params: any[]){
    return fetch(url,{
        method:"POST",
        body: JSON.stringify({
            "__args":[null,...params],
            "__gsh":"00000000"
        }),
    }).then(r=>{
        if (r.status != 200){
            throw new Error(`Invalid status: ${r.status} ${r.statusText}`);
        }
        return r;
    }).then(r=>r.json());
}
export function getVersions(schoolId: string){
    let date = new Date();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let schoolYear = year;
    if (month < 8){ 
        schoolYear--;
    }
    return makeRequest(
        "https://"+schoolId+".edupage.org/timetable/server/ttviewer.js?__func=getTTViewerData",
        [schoolYear]
    ).then(json=>{
        saveToCache(`versions-${schoolId}`,json);
        let parsed = VersionsSchema.parse(json);
        return new Versions(parsed);
    })
}
export function doesSchoolExist(schoolId: string){
    return getVersions(schoolId).then(()=>{
        return true;
    }).catch(()=>{
        return false;
    })
}
export function getTimetable(schoolId: string, id: string){
    return makeRequest(
        "https://"+schoolId+".edupage.org/timetable/server/regulartt.js?__func=regularttGetData",
        [id]
    ).then(json=>{
        saveToCache(`timetable-${schoolId}-${id}`,json);
        let parsed = TimetableSchema.parse(json);
        return new Timetable(parsed);
    })
}