import React, { PropTypes } from 'react';

class StartButton extends React.Component {
    static propTypes = {
        x: PropTypes.number,
        x: PropTypes.number,
        clickHandler: PropTypes.func
    };

    static defaultProps = {
        x: 200,
        y: 100
    };

    render () {
        const { x, y, clickHandler } = this.props;

        return (
            <g
                onClick={ clickHandler }
            >
                <rect
                    fill="#9d0000"
                    stroke="#010101"
                    strokeWidth={ 1 }
                    width={ 400 }
                    height={ 200 }
                    x={ x }
                    y={ y }
                />
                <text
                    x={ x + 50 }
                    y={ y + 51 }
                    fontSize={ 48 }
                >
                    Start!
                </text>
            </g>
        );
    }
}

export default StartButton;
