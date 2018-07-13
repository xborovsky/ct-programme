import { fetchProgramme, fetchProgrammeSuccess, fetchProgrammeError } from '../redux/action-creators';
import convert from 'xml-js';

const BASE_URL = 'http://cors-anywhere.herokuapp.com/http://www.ceskatelevize.cz/services/programme/xml/schedule.php?user=xborovsky';

export const loadProgramme = (channel, date) => {
    return dispatch => {
        dispatch(fetchProgramme());
        return timeout(1500, fetch(`${BASE_URL}&date=${date}&channel=${channel}`, { method : 'POST' }))
            .then(handleErrors)
            .then(res => res.text())
            .then(xml => JSON.parse(convert.xml2json(xml, {compact: true})))
            .then(json => {
                if (json.errors) {
                    throw Error(json.errors.error._text);
                }
                dispatch(fetchProgrammeSuccess(channel, json.program));
                return json.program;
            })
            .catch(error => {
                dispatch(fetchProgrammeError(error))
            });
        }
};

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const timeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("timeout")), ms);
        promise.then(resolve, reject);
    });
};