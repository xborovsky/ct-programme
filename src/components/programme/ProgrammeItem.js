import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentTime, composeDateTime } from '../../util/date-util';

const getHiddenSubtitlesMsg = () => {
    return <span className="hidden_subtitles_msg">Contains hidden subtitles</span>;
};

const shouldMarkAsActive = (currentItem, nextItem) => {
    if (!currentItem || !nextItem) {
        return false;
    }
    const currentItemText = currentItem.cas._text,
          nextItemText = nextItem.cas._text,
          now = getCurrentTime(),
          current = composeDateTime(
            currentItemText.substring(0, currentItemText.indexOf(':')),
            currentItemText.substring(currentItemText.indexOf(':') + 1),
          ),
          next = composeDateTime(
            nextItemText.substring(0, nextItemText.indexOf(':')),
            nextItemText.substring(nextItemText.indexOf(':') + 1),
          );

    return (next > now) && (current < now);
};

const ProgrammeItemComponent = ({programme}) =>
    <div className="row justify-content-center">
        <div className="col-xs-12 col-md-10 col-lg-8">
            {programme && programme.data ?
                programme.data.map((program, idx) => {
                    const active = shouldMarkAsActive(program, programme.data[idx+1]);
                    return(
                        <div className="list-group" key={`programme-${program.cas._text}`}>
                            <div className={`list-group-item list-group-item-action flex-column align-items-start
                                ${active ? 'active' : ''}`}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-3">
                                        <small>{program.cas._text}</small> {program.nazvy.nazev._text}
                                        {program.zanr._text && program.zanr._text.length ? <small> ({program.zanr._text})</small> : null}
                                        {active && program.linky.ivysilani && program.linky.ivysilani._text ?
                                            <a href={program.linky.ivysilani._text} target="_blank">
                                                <img src="/img/play.png" title="Přehrát" alt="Tlačítko play" className="icon play" />
                                            </a>
                                            : null}
                                        {program.ikonky.hd._text === '1' ? <img src="/img/hd.png" title="HD" alt="HD" className="icon top-right" /> : null}
                                    </h5>
                                </div>
                                <div className="row">
                                    <div className="span4">
                                        {program.obrazky.tv_program && program.obrazky.tv_program._text ?
                                            <img src={program.obrazky.tv_program._text} className="img-thumbnail"
                                                alt={program.nazvy.nazev._text} title={program.nazvy.nazev._text} /> : null }
                                        <p className="mb-1">{program.noticka._text}</p>
                                        <p className="mb-1">
                                            {program.skryte_titulky === '1' ?
                                                getHiddenSubtitlesMsg() : null
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }) : null}
        </div>
    </div>
;

const mapStateToProps = (state) => ({
    programme : state.programme
});

const ProgrammeItem = connect(mapStateToProps)(ProgrammeItemComponent);

/*ProgrammeItem.PropTypes = {
    channelName : PropTypes.string.isRequired,
    isLoading : PropTypes.boolean
};*/

export default ProgrammeItem;