import React, { Component } from 'react';
import DateSelector from './DateSelector';
import { getToday, getFullWeek } from '../../util/date-util';
import { connect } from 'react-redux';
import { changeDate } from '../../redux/action-creators';
import PropTypes from 'prop-types';
import ChannelSelector from './ChannelSelector';
import { loadProgramme } from '../../api/ct-api';
import ProgrammeItem from './ProgrammeItem';
import Loader from '../common/Loader';
import { loadProgrammeAfterDateChange } from '../../redux/change-date-thunk';

class ProgrammeContainerComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.doFetchProgramme(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedChannel !== nextProps.selectedChannel) {
            this.doFetchProgramme(nextProps);
        }
    }

    doFetchProgramme(propsData) {
        const { selectedChannel, selectedDate } = propsData;
        this.props.handleFetchProgramme(selectedChannel, selectedDate);
    }

    render() {
        const { selectedDate, error, loading } = this.props;

        return (
            <div className="container">
                <DateSelector allDates={getFullWeek()} selected={selectedDate} onChangeDate={this.props.handleChangeDate} />
                <br />
                <ChannelSelector />
                <br />
                {error ?
                    <div className="alert alert-danger" role="alert">
                        Programme can be loaded only once per 60 seconds!
                    </div>
                    : loading ? <Loader /> : <ProgrammeItem />
                }
            </div>
        );
    };

}

const mapStateToProps = (state) => ({
    selectedDate : state.selectedDate || getToday(),
    selectedChannel : state.selectedChannel,
    error : state.ajax.error,
    loading : state.ajax.loading
});

const mapDispatchToProps = (dispatch) => ({
    handleChangeDate : (date) => dispatch(loadProgrammeAfterDateChange(date)),
    handleFetchProgramme : (channel, date) => dispatch(loadProgramme(channel, date))
});

const ProgrammeContainer = connect(mapStateToProps, mapDispatchToProps)(ProgrammeContainerComponent);

/*ProgrammeContainer.propTypes = {
    selectedDate : PropTypes.string.idRequired,
    handleChangeDate : PropTypes.func.isRequired,
    programme : PropTypes.arrayOf(
        PropTypes.any.isRequired // TODO
    ).isRequired
};*/

export default ProgrammeContainer;