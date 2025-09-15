import { AppState } from './state'

export const selectCount = (state: AppState) => state.count
export const selectKpis = (state: AppState) => state.kpis
export const selectFeed = (state: AppState) => state.feed
