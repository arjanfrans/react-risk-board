import React, { PropTypes } from 'react';

class TerritoryInfo extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        continent: PropTypes.object.isRequired,
        owner: PropTypes.object,
        x: PropTypes.number,
        x: PropTypes.number
    };

    static defaultProps = {
        x: 10,
        y: 600
    };

    render () {
        const { x, y } = this.props;

        return (
            <g>
                <rect
                    fill="#cdbc8a"
                    stroke="#010101"
                    strokeWidth={ 1 }
                    width={ 160 }
                    height={ 100 }
                    x={ x }
                    y={ y }
                />
                <text
                    x={ x + 5 }
                    y={ y + 21 }
                    fontSize={ 16 }
                >
                    { this.props.name }
                </text>
                <text
                    x={ x + 5 }
                    y={ y + 37 }
                    fontSize={ 14 }
                >
                    { this.props.continent.name }
                </text>
                { this.props.owner ? (
                    <text
                        x={ x + 5 }
                        y={ y + 51 }
                        fill={ this.props.owner.color }
                        fontSize={ 14 }
                    >
                        { this.props.owner.name }
                    </text>
                ) : null }
            </g>
        );
    }
}

export default TerritoryInfo;
