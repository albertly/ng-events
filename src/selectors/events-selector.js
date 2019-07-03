import { createSelector } from 'reselect'

export const selectEvents = state => state.events.events;

export const selectEvent = createSelector( state => state.events.currentEvent, value1 => value1);