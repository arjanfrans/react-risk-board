import React, { PropTypes } from 'react';
import Continent from './Continent';
import Territory from './Territory';
import Marker from './Marker';

class Board extends React.Component {
    static propTypes = {
        viewData: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
        players: PropTypes.array.isRequired,
        onTerritoryHover: PropTypes.func,
        onTerritoryClick: PropTypes.func
    };

    render () {
        const continentNodes = [];
        const markerNodes = [];
        const { viewData, players } = this.props;

        for (const continentData of this.props.data.continents) {
            const continentTerritories = [];
            const continentViewData = viewData.continents.find((value) => {
                return value.id === continentData.id;
            });

            const territoryNodes = continentData.territoryIds.map((id) => {
                const territoryData = this.props.data.territories.find((territory) => {
                    return territory.id === id;
                });
                const territoryViewData = viewData.territories.find((value) => {
                    return value.id === id;
                });

                const territory = {
                    id: territoryData.id,
                    name: territoryData.name,
                    owner: players.find((player) => player.id === territoryData.owner),
                    continentFill: continentViewData.fill,
                    continent: {
                        id: continentData.id,
                        name: continentData.name
                    }
                };

                const marker = (
                    <Marker
                        key={ territory.id }
                        { ...territory }
                        { ...territoryViewData.center }
                    />
                )

                markerNodes.push(marker);

                continentTerritories.push(territory);

                return (
                    <Territory
                        hoverHandler={ this.props.onTerritoryHover }
                        clickHandler={ this.props.onTerritoryClick }
                        key={ territoryData.id }
                        id={ territoryData.id }
                        name={ territoryData.name }
                        path={ territoryViewData.path }
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
                    stroke={ continentViewData.stroke }
                    fill={ continentViewData.fill }
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
                { markerNodes }
                { this.props.children }
            </svg>
        );
    }
}

export default Board;
