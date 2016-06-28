import React, { PropTypes } from 'react';
import Board from '../components/board/Board';
import TerritoryInfo from '../components/TerritoryInfo';
import TurnInfo from '../components/TurnInfo';
import BonusInfo from '../components/BonusInfo';
import viewData from '../assets/board.json';
import config from '../config';

const PHASE_NAMES = {
    placement: 'Placement',
    attacking: 'Attack',
    fortifying: 'Fortify',
    setup_a: 'Setup I',
    setup_b: 'Setup II',
    battle: 'Battle',
};

class App extends React.Component {
    static propTypes = {
        game: PropTypes.object.isRequired,
        players: PropTypes.array.isRequired
    };

    constructor (props) {
        super(props);

        this.state = {
            selectedTerritory: null
        };
    }

    render () {
        const { game } = this.props;

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

        const gameState = game.state;
        const data = {
            continents: gameState.board.continents,
            territories: gameState.board.territories
        };

        return (
            <div>
                <div>
                    <Board
                        viewData={ viewData }
                        data={ data }
                        onTerritoryHover={ territoryHoverHandler }
                        onTerritoryClick={ territoryClickHandler }
                    >
                        { territoryInfo }
                        <BonusInfo
                            continents={ data.continents }
                            continentsViewData={ viewData.continents }
                        />
                        <TurnInfo
                            { ...gameState.turn }
                            gamePhase={ gameState.phase }
                            availableUnits={ game.getAvailableUnits(gameState.turn.player) }
                            players={ this.props.players }
                            phaseNames={ PHASE_NAMES }
                        />
                    </Board>
                </div>
            </div>
        );
    }
}

export default App;
