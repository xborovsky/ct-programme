import { CHANGE_DATE, FETCH_PROGRAMME, SELECT_CHANNEL } from './actions';
import { START, SUCCESS, ERROR } from './fetch-statuses';
import { channels } from '../api/channels';

const initialState = {
    selectedDate : null,
    selectedChannel : 'ct1',
    programme : { name: 'ČT 1', data: null },
    ajax : {
        loading : false,
        error : false
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_DATE:
            return {...state, selectedDate : action.date};
        case FETCH_PROGRAMME:
            switch (action.status) {
                case START:
                    return {...state, ajax : {loading : true, error: false}};
                case SUCCESS:
                    return {...state, programme : {name : action.channel, data : action.data.porad}, ajax : {loading : false, error: false}};
                case ERROR:
                    return {...state, ajax : {loading : false, error: true}};
            }
        case SELECT_CHANNEL:
            return {...state, selectedChannel : action.selectedChannel};
        default:
            return state;
    }
}