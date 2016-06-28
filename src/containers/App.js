import React, { PropTypes } from 'react';
import Board from '../components/board/Board';
import TerritoryInfo from '../components/TerritoryInfo';
import TurnInfo from '../components/TurnInfo';
import BonusInfo from '../components/BonusInfo';
import StartButton from '../components/StartButton';
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
            selectedTerritory: null,
            started: false
        };
    }

    render () {
        const { game } = this.props;

        const territoryClickHandler = (evt) => {
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

        const handleStartClick = () => {
            game.start();

            this.setState({
                started: true
            });
        };

        let startButton = null;

        if (!this.state.started) {
            startButton = (
                <StartButton
                    clickHandler={ handleStartClick }
                />
            );
        }

        return (
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
                        { startButton }
                    </Board>
            </div>
        );
    }
}

export default App;
