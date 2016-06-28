import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Conquete from 'conquete';
import config from './config';

const game = Conquete.Game(config.game);

ReactDOM.render(
    <App
        game={ game }
        players={ config.players }
    />
, document.getElementById('app'));
