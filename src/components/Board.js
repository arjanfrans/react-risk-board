import React, { PropTypes } from 'react';
import Continent from './Continent';
import Territory from './Territory';

class Board extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onTerritoryHover: PropTypes.func,
        onTerritoryClick: PropTypes.func,
    };

    render () {
        const continentNodes = [];

        for (const continentData of this.props.data.continents) {
            const continentTerritories = [];
            const territoryNodes = continentData.territoryIds.map((id) => {
                const territoryData = this.props.data.territories.find((territory) => {
                    return territory.id === id;
                });

                const territory = {
                    id: territoryData.id,
                    name: territoryData.name,
                    owner: territoryData.owner,
                    continentFill: continentData.fill,
                    continent: {
                        id: continentData.id,
                        name: continentData.name
                    }
                };

                continentTerritories.push(territory);

                return (
                    <Territory
                        hoverHandler={ this.props.onTerritoryHover }
                        clickHandler={ this.props.onTerritoryClick }
                        key={ territoryData.id }
                        id={ territoryData.id }
                        name={ territoryData.name }
                        path={ territoryData.path }
                        data={ territory }
                    />
                );
            });

            const continent = {
                id: continentData.id,
                name: continentData.name,
                fill: continentData.fill,
                bonus: continentData.bonus,
                territories: continentTerritories
            };

            const continentNode = (
                <Continent
                    key={ continentData.id }
                    id={ continentData.id }
                    name={ continentData.name }
                    stroke={ continentData.stroke }
                    fill={ continentData.fill }
                    data={ continent }
                >
                    { territoryNodes }
                </Continent>
            );

            continentNodes.push(continentNode);
        }

        return (
            <svg
                width="90%" height="90%"
                viewBox="0 0 1024 792"
                preserveAspectRatio="xMinYMin meet"
            >
                { continentNodes }
                { this.props.children }
            </svg>
        );
    }
}

export default Board;
