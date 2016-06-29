import React, { PropTypes } from 'react';

function isDisabled (props) {
    const {
        availableUnits,
        gamePhase,
        phase,
        currentLocalPlayer,
        player
    } = props;

    if (!currentLocalPlayer || currentLocalPlayer !== player) {
        return true;
    }

    if (gamePhase !== 'battle') {
        return true;
    }

    if (phase === 'placement') {
        if (availableUnits !== 0) {
            return true;
        }

        return false;
    }

    if (phase === 'attacking') {
        return false;
    }

    if (phase === 'fortifying') {
        return false;
    }

    return true;
}

class TurnControls extends React.Component {
    static propTypes = {
        currentLocalPlayer: PropTypes.string,
        onNextPhaseClick: PropTypes.func
        // game: PropTypes.object.isRequired,
    };

    constructor (props) {
        super(props);
    }

    render () {
        const { gamePhase, phase, currentLocalPlayer, player }  = this.props;

        let value = 'Go to attack phase';

        if (phase === 'fortifying') {
            value = 'End turn'
        } else if (phase === 'attacking') {
            value = 'Fortify'
        }

        const nextPhaseButton = (
            <input
                type="button"
                value={ value }
                onClick={ this.props.onNextPhaseClick }
                disabled={ isDisabled(this.props) }
            />
        );

        return (
            <div>
                { nextPhaseButton }
            </div>
        );
    }
};

export default TurnControls;
