import React, { PropTypes } from 'react';
import Board from '../components/Board';
import TerritoryInfo from '../components/TerritoryInfo';
import BonusInfo from '../components/BonusInfo';
import viewData from '../assets/board.json';
import config from '../config';

class App extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            selectedTerritory: null
        };
    }

    render () {
        const territoryClickHandler = (evt) => {
            console.log('click', evt);
        };

        const territoryHoverHandler = (territory) => {
            this.setState({
                selectedTerritory: territory
            });
        };

        let territoryInfo = null;

        if (this.state.selectedTerritory) {
            territoryInfo = (
                <TerritoryInfo
                    { ...this.state.selectedTerritory }
                />
            );
        }

        const data = {
            ...viewData,
            continents: viewData.continents.map((viewContinent) => {
                const continent = config.continents.find((continent) => {
                    return continent.id === viewContinent.id;
                });

                return {
                    ...viewContinent,
                    ...continent
                };
            }),
            territories: viewData.territories.map((viewTerritory) => {
                const territory = config.territories.find((territory) => {
                    return territory.id === viewTerritory.id;
                });

                return {
                    ...viewTerritory,
                    ...territory
                };
            })
        };

        return (
            <div>
                <div>
                    <Board
                        data={ data }
                        onTerritoryHover={ territoryHoverHandler }
                        onTerritoryClick={ territoryClickHandler }
                    >
                        { territoryInfo }
                        <BonusInfo
                            continents={ data.continents }
                        />
                    </Board>
                </div>
            </div>
        );
    }
}

export default App;
