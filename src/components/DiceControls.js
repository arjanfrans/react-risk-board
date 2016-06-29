import React, { PropTypes } from 'react';

class DiceControls extends React.Component {
    static PropTypes = {
        maxDice: PropTypes.number.isRequired,
        color: PropTypes.string,
        onDiceRoll: PropTypes.func.isRequired
    };

    static defaultProps = {
        color: 'red'
    };

    constructor (props) {
        super(props);

        this.state = {
            selectedDice: props.maxDice
        };
    }

    diceChangeHandler () {
        this.setState({
            selectedDice: Math.min(Math.max(1, this.refs.diceSelect.value), this.props.maxDice)
        });
    }

    render () {
        let diceOptions = [];

        for (let i = 1; i <= this.props.maxDice; i++) {
            diceOptions.push(
                <option
                    key={ i }
                    value={ i }
                >
                    { i }
                </option>
            );
        }

        return (
            <div>
                <svg
                    width={ 30 }
                    height={ 30 }
                >
                    <rect
                        x={ 0 }
                        y={ 0 }
                        width={ 30 }
                        height={ 30 }
                        fill={ this.props.color }
                        stroke="black"
                    />
                    <circle
                        cx={ 15 }
                        cy={ 15 }
                        r={ 3 }
                        fill="black"
                    />
                </svg>

                <select
                    ref="diceSelect"
                    onChange={ ::this.diceChangeHandler }
                    value={ this.state.selectedDice }
                >
                    { diceOptions }
                </select>
                <input
                    type="button"
                    onClick={ this.props.onDiceRoll.bind(null, this.state.selectedDice) }
                    value="Roll"
                />
            </div>
        );
    }
}

export default DiceControls;
