import { create } from 'zustand'
import { Timetable } from '../data/timetable'
import { Versions } from '../data/versions'

interface GlobalState {
    timetable?: Timetable
    versions?: Versions
}

export const useGlobalStore = create<GlobalState>((set)=>({
    timetable: undefined,
    versions: undefined
}))