import React, { PropTypes } from 'react';

class Continent extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        stroke: PropTypes.string,
        fill: PropTypes.string
    };

    render () {
        return (
            <g
                id={ this.props.id }
                stroke={ this.props.stroke }
                fill={ this.props.fill }
            >
                { this.props.children }
            </g>
        );
    }
}

export default Continent;
