import moment from 'moment';

export const getToday = () => {
    return moment(new Date()).format('DD.MM.YYYY');
};

export const getFullWeek = () => {
    let week = [],
        mom = moment(new Date());

    for (let i=0; i<7; i++) {
        week.push(mom.format('DD.MM.YYYY'));
        mom.add(1,'days');
    }
    return week;
};

export const getCurrentTime = () => {
    return new Date();
};

export const composeDateTime = (hours, minutes) => {
    let datetime = new Date();
    datetime.setHours(hours, minutes);
    return datetime;
};