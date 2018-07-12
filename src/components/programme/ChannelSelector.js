import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { channels } from '../../api/channels';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectChannel } from '../../redux/action-creators';

const ChannelSelectorComponent = ({selectedChannel, onChangeSelectedChannel}) =>
    <div className="row">
        <Select name="channel-select"
                value={selectedChannel}
                onChange={onChangeSelectedChannel}
                options={channels}
                labelKey='name'
                valueKey='param' />
    </div>
;

const mapStateToProps = (state) => ({
    selectedChannel : state.selectedChannel
});

const mapDispatchToProps = (dispatch) => ({
    onChangeSelectedChannel : (selectedChannel) => dispatch(selectChannel(selectedChannel))
});

const ChannelSelector = connect(mapStateToProps, mapDispatchToProps)(ChannelSelectorComponent);

/*ChannelSelector.propTypes = {
    selectedChannels : PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeSelectedChannels : PropTypes.func.isRequired
};*/

export default ChannelSelector;