import React, { PropTypes } from 'react';
import Board from '../components/board/Board';
import TerritoryInfo from '../components/TerritoryInfo';
import TurnInfo from '../components/TurnInfo';
import BonusInfo from '../components/BonusInfo';
import StartButton from '../components/StartButton';
import viewData from '../assets/board.json';
import config from '../config';
import { PLAYER_EVENTS, GAME_EVENTS } from 'conquete';

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
        players: PropTypes.array.isRequired,
        gameListener: PropTypes.object.isRequired,
        localPlayers: PropTypes.array.isRequired
    };

    static defaultProps = {
        localPlayers: []
    };

    constructor (props) {
        super(props);

        this.state = {
            selectedTerritory: null,
            started: false,
            currentLocalPlayer: null
        };
    }

    componentDidMount () {
        const gameListener = this.props.gameListener;
        const localPlayerIds = this.props.localPlayers.map((player) => player.id);

        gameListener.on(GAME_EVENTS.TURN_CHANGE, (data) => {
            if (localPlayerIds.includes(data.playerId)) {
                this.setState({
                    currentLocalPlayer: data.playerId
                });
            }
        });

        gameListener.on(GAME_EVENTS.TERRITORY_CLAIMED, data => {
            this.forceUpdate();
        });

        const playerListeners = this.props.players.filter((player) => {
            return player.listener;
        }).map((player) => player.listener);

        for (const listener of playerListeners) {
            listener.on(PLAYER_EVENTS.REQUIRE_TERRITORY_CLAIM, (data) => {
            });
        }
    }

    render () {
        const { game } = this.props;
        const gameState = game.state;

        const territoryClickHandler = (territory) => {
            if (gameState.phase === 'setup_a') {
                game.act.claimTerritory(this.state.currentLocalPlayer, territory.id);
            }
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
                        players={ this.props.players }
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
