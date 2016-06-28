import React, { PropTypes } from 'react';

class Marker extends React.Component {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        owner: PropTypes.object
    };

    render () {
        const { x, y, name, owner } = this.props;
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
                    { name }
                </text>
            </g>
        );
    }
}

export default Marker;
