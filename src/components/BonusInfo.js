import React, { PropTypes } from 'react';

class BonusInfo extends React.Component {
    static propTypes = {
        continents: PropTypes.array.isRequired,
        continentsViewData: PropTypes.array.isRequired,
        x: PropTypes.number,
        x: PropTypes.number
    };

    static defaultProps = {
        x: 600,
        y: 580
    };

    render () {
        const { x, y, continents, continentsViewData } = this.props;

        const continentBonusNodes = continents.sort((a, b) => {
            return a.bonus < b.bonus;
        }).map((continent, index) => {
            const continentViewData = continentsViewData.find((value) => {
                return value.id === continent.id
            });

            return (
                <g
                    key={ index }
                >
                    <rect
                        fill={ continentViewData.fill }
                        x={ x + 4 }
                        y={ y + 10 + (26 * index) }
                        width={ 120 }
                        height={ 21 }
                    />
                    <text
                        x={ x + 8 }
                        y={ y + 24 + (26 * index) }
                        fontSize={ 14 }
                    >
                        { continent.name }: { continent.bonus }
                    </text>

                </g>
            );
        });

        return (
            <g>
                <rect
                    fill="#cdbc8a"
                    stroke="#010101"
                    strokeWidth={ 1 }
                    width={ 150 }
                    height={ continentBonusNodes.length * 26 + 10 }
                    x={ x }
                    y={ y }
                />
                { continentBonusNodes }
            </g>
        );
    }
}

export default BonusInfo;
