import React, { PropTypes, Component } from 'react';

const DISABLED_COLOR = '#006600';

class ActionButton extends Component {
    static propTypes = {
        game: PropTypes.object,
        x: PropTypes.number,
        x: PropTypes.number
    };

    static defaultProps = {
        x: 800,
        y: 700,
        width: 200,
        height: 30
    };

    render () {
        const { x, y, game, width, height } = this.props;
        const gameState = game.state;
        const turnPhase = game.turn ? game.turn.phase : null;

        let text = null;
        let clickHandler = null;
        let disabled = true;

        if (gameState.phase === 'setup_a' || gameState.phase === 'setup_b') {
            text = 'Go to attack phase';
        } else if (gameState.phase === 'battle') {
            if (turnPhase === 'placement') {
                text = 'Go to attack phase';

                if (game.getAvailableUnits(game.turn.player) === 0) {
                    disabled = false;
                    clickHandler = () => {
                        game.act.attackPhase(game.turn.player);
                    };
                }
            } else if (turnPhase === 'attacking') {
                if (!game.turn.battle) {
                    disabled = false;
                    text = 'Fortify';
                    clickHandler = () => {
                        game.act.fortifyPhase(game.turn.player);
                    }
                }
            } else if (turnPhase === 'fortifying') {
                disabled = false;
                text = 'End turn';
                clickHandler = () => {
                    game.act.endTurn(game.turn.player);
                }
            }
        }

        return (
            <g>
                <rect
                    fill={ disabled ? DISABLED_COLOR: '#009933' }
                    x={ x }
                    y={ y }
                    width={ width }
                    height={ height }
                />
                <text
                    x={ x + width / 2 }
                    y={ y + height / 2 }
                    fontSize={ 14 }
                    textAnchor="middle"
                >
                    { text }
                </text>
            </g>
        );
    }
}

export default ActionButton;
