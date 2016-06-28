import EventEmitter from 'events';
import Conquete from 'conquete';

const playerEvents = new EventEmitter();

const aiEventEmitters = {
    '1': new EventEmitter(),
    '2': new EventEmitter(),
    '3': new EventEmitter()
};

const gameEvents = new EventEmitter();

const gameOptions = {
    map: Conquete.maps.classic(),
    debug: true,
    startUnits: {
        2: 40,
        3: 35,
        4: 30,
        5: 25,
        6: 20
    },
    listener: gameEvents,
    players: [
        {
            id: '1',
            // listener: aiEventEmitters['1']
            listener: playerEvents
        },
        {
            id: '2',
            listener: aiEventEmitters['2']
        }, {
            id: '3',
            listener: aiEventEmitters['3']
        }
    ],
    jokerCards: 2,
    cardBonus: [
        {
            cards: ['cavalry', 'artillery', 'infantry'],
            bonus: 10
        },
        {
            cards: ['artillery', 'artillery', 'artillery'],
            bonus: 8,
        },
        {
            cards: ['cavalry', 'cavalry', 'cavalry'],
            bonus: 6,
        },
        {
            cards: ['infantry', 'infantry', 'infantry'],
            bonus: 4,
        }
    ]
};

const playerConfig = [
    {
        id: '1',
        name: 'P1',
        listener: playerEvents,
        color: 'red'
    },
    {
        id: '2',
        name: 'AI1',
        color: 'blue'
    },
    {
        id: '3',
        name: 'AI2',
        color: 'green'
    }
];

export default {
    game: gameOptions,
    players: playerConfig,
    localPlayers: [ '1' ],
    aiListeners: aiEventEmitters
};
