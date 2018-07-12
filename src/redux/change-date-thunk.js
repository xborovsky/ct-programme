import { changeDate } from '../redux/action-creators';
import { loadProgramme } from '../api/ct-api';

export function loadProgrammeAfterDateChange(date) {
    return (dispatch, getState) => {
        dispatch(changeDate(date));
        const newDate = getState().selectedDate,
              channel = getState().selectedChannel;
        dispatch(loadProgramme(channel, newDate));
    }
};