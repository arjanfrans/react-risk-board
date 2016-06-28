import React, { PropTypes } from 'react';

class TurnInfo extends React.Component {
    static propTypes = {
        // id: PropTypes.string.isRequired,
        // name: PropTypes.string.isRequired,
        // continent: PropTypes.object.isRequired,
        // owner: PropTypes.object,
        // x: PropTypes.number,
        // x: PropTypes.number
    };

    static defaultProps = {
        x: 350,
        y: 650
    };

    render () {
        const {
            x,
            y,
            players,
            player,
            gamePhase,
            phase,
            phaseNames,
            availableUnits
        } = this.props;
        const playerData = players.find((value) => value.id === player);

        let displayPhase = null;

        if (gamePhase === 'battle') {
            displayPhase = phaseNames[phase];
        } else {
            displayPhase = phaseNames[gamePhase];
        }

        let turnText = null;

        if (gamePhase === 'setup_a') {
            turnText = (
                <g>
                    <text
                        x={ x + 5 }
                        y={ y + 51 }
                        fontSize={ 14 }
                    >
                        Units available: { availableUnits }
                    </text>
                </g>
            );
        }

        return (
            <g>
                <rect
                    fill="#cdbc8a"
                    stroke="#010101"
                    strokeWidth={ 1 }
                    width={ 200 }
                    height={ 100 }
                    x={ x }
                    y={ y }
                />
                <text
                    x={ x + 5 }
                    y={ y + 21 }
                    fontSize={ 16 }
                >
                    Turn: { playerData.name }
                </text>
                <text
                    x={ x + 5 }
                    y={ y + 37 }
                    fontSize={ 14 }
                >
                    Phase: { displayPhase }
                </text>
                { turnText }
            </g>
        );
    }
}

export default TurnInfo;
