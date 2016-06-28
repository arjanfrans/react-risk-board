import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Conquete, { PLAYER_EVENTS, GAME_EVENTS } from 'conquete';
import config from './config';
import AiSimulation from './ai/simulation';
import debug from 'debug';

const game = Conquete.Game(config.game);

const aiListeners = config.aiListeners;
const simulation = AiSimulation(game);

Object.keys(aiListeners).forEach(playerId => {
    const time = 500;
    const log = debug(`${playerId}`)
    let aiEvent = aiListeners[playerId];

    aiEvent.on(PLAYER_EVENTS.REQUIRE_DICE_ROLL, data => {
        log(`${data.type} dice roll required, ${data.maxDice} dice available`);

        setTimeout(() => {
            game.act.rollDice(playerId, data.maxDice);
        }, time);
    });

    aiEvent.on(PLAYER_EVENTS.NEW_CARD, data => {
        log(`new card received: ${data.card}`);
    });

    aiEvent.on(PLAYER_EVENTS.REQUIRE_TERRITORY_CLAIM, data => {
        log(`claim a territory: ${data.territoryIds.join(', ')}`);

        setTimeout(() => {
            simulation.simulateSetupA();
        }, time);
    });

    aiEvent.on(PLAYER_EVENTS.QUEUED_MOVE, data => {
        log(`${data.units} units queued to move from ${data.from} to ${data.to}`);
    });

    aiEvent.on(PLAYER_EVENTS.REQUIRE_ONE_UNIT_DEPLOY, data => {
        log(`deploy 1 unit to one of your territitories (${data.remainingUnits} units remaining)`);

        setTimeout(() => {
            simulation.simulateSetupB();
        }, time);
    });

    aiEvent.on(PLAYER_EVENTS.REQUIRE_PLACEMENT_ACTION, data => {
        log(`redeem cards and deploy units (${data.availableUnits} units available)`);

        setTimeout(() => {
            simulation.simulatePlacement();
        }, time);
    });

    aiEvent.on(PLAYER_EVENTS.REQUIRE_ATTACK_ACTION, (data) => {
        log(`attack or continue to fortify`);

        setTimeout(() => {
            simulation.simulateAttack();
        }, time);
    });

    aiEvent.on(PLAYER_EVENTS.REQUIRE_FORTIFY_ACTION, data => {
        log(`move units or end your turn`);

        setTimeout(() => {
            simulation.simulateFortify();
        }, time);
    });
});

ReactDOM.render(
    <App
        game={ game }
        players={ config.players }
        gameListener={ config.game.listener }
        localPlayers={ config.players.filter((player) => config.localPlayers.includes(player.id)) }
    />
, document.getElementById('app'));
