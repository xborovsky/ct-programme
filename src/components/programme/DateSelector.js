import React from 'react';
import PropTypes from 'prop-types';

const DateSelector = ({allDates, selected, onChangeDate}) =>
    <div className="row">
        <div className="btn-group d-flex w-100">
            {allDates.map((date, cnt) =>
                <button key={'day-' + cnt}
                        className={`btn ${date === selected ? 'btn-light' : 'btn-secondary'} w-100`}
                        onClick={() => onChangeDate(date)}>
                    <span className="d-none d-md-block">{date}</span>
                    <span className="d-md-none d-lg-none d-xl-none short-date">{date.substr(0, date.lastIndexOf('.'))}</span>
                </button>
            )}
        </div>
    </div>
;

DateSelector.propTypes = {
    allDates : PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    selected : PropTypes.string.isRequired,
    onChangeDate : PropTypes.func
};

export default DateSelector;