import React, { PropTypes } from 'react';
import Board from '../components/board/Board';
import TerritoryInfo from '../components/TerritoryInfo';
import TurnInfo from '../components/TurnInfo';
import BonusInfo from '../components/BonusInfo';
import StartButton from '../components/StartButton';
import DiceControls from '../components/DiceControls';
import TurnControls from '../components/TurnControls';
import ActionButton from '../components/ui/ActionButton';
import viewData from '../assets/board.json';
import CurrentBattle from '../components/CurrentBattle';
import config from '../config';
import { PLAYER_EVENTS, GAME_EVENTS } from 'conquete';

const ATTACK_COLOR = '#444444';
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
            currentLocalPlayer: null,
            attackFrom: null,
            attackTo: null
        };
    }

    componentDidMount () {
        const gameListener = this.props.gameListener;
        const localPlayerIds = this.props.localPlayers.map((player) => player.id);

        const isLocalTurn = () => {
            if (localPlayerIds.includes(this.props.game.currentPlayer.id)) {
                return true;
            }

            return false;
        }

        if (isLocalTurn()) {
            this.setState({
                currentLocalPlayer: this.props.game.currentPlayer.id
            });
        }

        gameListener.on(GAME_EVENTS.TURN_CHANGE, (data) => {
            if (isLocalTurn()) {
                this.setState({
                    currentLocalPlayer: data.playerId
                });
            } else {
                this.forceUpdate();
            }
        });

        gameListener.on(GAME_EVENTS.DEFEND_DICE_ROLL, () => {
            this.forceUpdate();
        });

        gameListener.on(GAME_EVENTS.ATTACK_DICE_ROLL, () => {
            this.forceUpdate();
        });

        gameListener.on(GAME_EVENTS.TURN_PHASE_CHANGE, data => {
            this.forceUpdate();
        });

        gameListener.on(GAME_EVENTS.TERRITORY_CLAIMED, data => {
            this.forceUpdate();
        });

        gameListener.on(GAME_EVENTS.DEPLOY_UNITS, (data) => {
            this.forceUpdate();
        });

        gameListener.on(GAME_EVENTS.ATTACK, (data) => {
            this.forceUpdate();
        });

        gameListener.on(GAME_EVENTS.BATTLE_END, () => {
            this.forceUpdate();
        });

        gameListener.on(GAME_EVENTS.MOVE_UNITS, () => {
            this.forceUpdate();
        });

        const playerListeners = this.props.players.filter((player) => {
            return player.listener;
        }).map((player) => player.listener);

        for (const listener of playerListeners) {
            listener.on(PLAYER_EVENTS.REQUIRE_DICE_ROLL, (data) => {
            });
        }
    }

    render () {
        const { game } = this.props;
        const localPlayerIds = this.props.localPlayers.map((player) => player.id);
        const gameState = game.state;

        const territoryClickHandler = (territory, setFillColor) => {
            if (!localPlayerIds.includes(this.props.game.currentPlayer.id)) {
                return;
            }

            if (gameState.phase === 'setup_a') {
                game.act.claimTerritory(this.state.currentLocalPlayer, territory.id);
            } else if (gameState.phase === 'setup_b') {
                game.act.deployOneUnit(this.state.currentLocalPlayer, territory.id);
            } else if (gameState.phase === 'battle') {
                if (gameState.turn.phase === 'placement') {
                    game.act.deployUnits(this.state.currentLocalPlayer, territory.id, 1);
                } else if (gameState.turn.phase === 'attacking') {
                    if (territory.owner !== this.state.currentLocalPlayer) {
                        return;
                    }

                    if (this.state.attackFrom && !this.state.attackTo) {
                        this.setState({
                            attackTo: territory.id
                        });

                        setFillColor(ATTACK_COLOR);
                    } else if (!this.state.attackFrom) {
                        this.setState({
                            attackFrom: territory.id
                        });

                        setFillColor(ATTACK_COLOR);
                    }
                }
            }
        };

        const territoryHoverHandler = (territory) => {
            this.setState({
                selectedTerritory: territory
            });
        };

        const diceRollHandler = (dice) => {
            const { battle } = gameState.turn;

            if (battle && battle.turn) {
                game.act.rollDice(battle.turn, dice);
            }
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

        const nextPhaseClickHandler = () => {
            if (gameState.turn.phase === 'placement') {
                game.act.attackPhase(this.state.currentLocalPlayer);
            } else if (gameState.turn.phase === 'attacking') {
                game.act.fortifyPhase(this.state.currentLocalPlayer);
            } else if (gameState.turn.phase === 'fortifying') {
                game.act.endTurn(this.state.currentLocalPlayer);
            }
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
            <svg
                width="70%" height="70%"
                viewBox="0 0 1024 792"
                preserveAspectRatio="xMinYMin meet"
            >
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
                {/* <TurnControls */}
                {/*     { ...gameState.turn } */}
                {/*     currentLocalPlayer={ this.state.currentLocalPlayer } */}
                {/*     gamePhase={ gameState.phase } */}
                {/*     availableUnits={ game.getAvailableUnits(gameState.turn.player) } */}
                {/*     onNextPhaseClick={ nextPhaseClickHandler } */}
                {/* /> */}
                {/* <CurrentBattle */}
                {/*     battle={ gameState.turn.battle } */}
                {/*     players= { this.props.players } */}
                {/*     currentLocalPlayer={ this.state.currentLocalPlayer } */}
                {/* /> */}
                {/* <DiceControls */}
                {/*     maxDice={ 3 } */}
                {/*     onDiceRoll={ diceRollHandler } */}
                {/*     color="red" */}
                {/* /> */}
                <ActionButton
                    game={ game }
                />
            </svg>
        );
    }
}

export default App;
