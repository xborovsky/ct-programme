import { FETCH_PROGRAMME, CHANGE_DATE, SELECT_CHANNEL } from './actions';
import { START, SUCCESS, ERROR } from './fetch-statuses';

export const fetchProgramme = (channel) => ({
    type : FETCH_PROGRAMME,
    status : START,
    channel
});

export const fetchProgrammeSuccess = (channel, data) => ({
    type : FETCH_PROGRAMME,
    status : SUCCESS,
    channel,
    data
});

export const fetchProgrammeError = (channel, error) => ({
    type : FETCH_PROGRAMME,
    status : ERROR,
    channel,
    error
});

export const changeDate = (date) => ({
    type : CHANGE_DATE,
    date
});

export const selectChannel = (selectedChannel) => ({
    type : SELECT_CHANNEL,
    selectedChannel : selectedChannel.param
});