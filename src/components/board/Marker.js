import React, { PropTypes } from 'react';

class Marker extends React.Component {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        owner: PropTypes.object,
        units: PropTypes.number
    };

    render () {
        const { x, y, name, owner, units } = this.props;
        let circle = null;

        if (owner) {
            circle = (
                <circle
                    cx={ x }
                    cy={ y }
                    fill={ owner.color }
                    r={ 10 }
                />
            );
        }

        return (
            <g>
                { circle }
                <text
                    x={ x }
                    y={ y }
                    fill="black"
                    strokeWidth={ 0 }
                    fontSize={ 14 }
                >
                    ({ units }) { name }
                </text>
            </g>
        );
    }
}

export default Marker;
