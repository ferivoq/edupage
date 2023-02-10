import { create } from 'zustand'
import { getTimetable as getTimetableFromApi, getVersions as getVersionsFromApi } from '../data/api'
import { Timetable } from '../data/timetable'
import { Versions } from '../data/versions'
import { getTimetableFromCache, getVersionsFromCache } from '../storage/cache'

interface GlobalState {
    timetable?: Timetable
    versions?: Versions
    schoolId?: string
    timetableId?: string
    updateTimetable: (schoolId: string, timetableId: string | undefined)=>void
    updateTimetableFromCache: (schoolId: string, timetableId: string | undefined)=>void
    updateTimetableFromApi: (schoolId: string, timetableId: string | undefined)=>void
    updateTimetableFromFunctions: (
        schoolId: string, timetableId: string | undefined,
        getVersions: (schoolId: string)=>Promise<Versions | null>,
        getTimetable: (schoolId: string, timetableId: string)=>Promise<Timetable | null>
    )=>void
}

export const useGlobalStore = create<GlobalState>((set,get)=>({
    async updateTimetable(schoolId, timetableId) {
        if (schoolId != get().schoolId || timetableId != get().timetableId){
            set({
                schoolId,
                timetable: undefined,
                versions: undefined
            })
            get().updateTimetableFromCache(schoolId,timetableId);
            get().updateTimetableFromApi(schoolId,timetableId);
        }
    },
    async updateTimetableFromFunctions(schoolId, timetableId, getVersions, getTimetable) {
        let versions = await getVersions(schoolId);
        if (!versions){
            return;
        }
        set({versions});
        let currentVersion = versions.current;
        if (!currentVersion){
            return;
        }
        if (!timetableId){
            timetableId = currentVersion.id;
        }
        let cachedTimetable = await getTimetable(schoolId,timetableId);
        if (cachedTimetable) {
            set({timetable: cachedTimetable, timetableId})
        }
    },
    async updateTimetableFromCache(schoolId, timetableId) {
        return get().updateTimetableFromFunctions(
            schoolId,timetableId,
            getVersionsFromCache,getTimetableFromCache
        )
    },
    async updateTimetableFromApi(schoolId, timetableId) {
        return get().updateTimetableFromFunctions(
            schoolId,timetableId,
            getVersionsFromApi,getTimetableFromApi
        )
    }
}))