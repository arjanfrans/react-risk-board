import React, { PropTypes } from 'react';

class CurrentBattle extends React.Component {
    static propTypes = {
        battle: PropTypes.object,
        players: PropTypes.array.isRequired,
        currentLocalPlayer: PropTypes.string
    };

    render () {
        const { battle, players } = this.props;

        if (!battle) {
            return null;
        }

        const attacker = players.find((player) => {
            return player.id === battle.attacker.player;
        });
        const defender = players.find((player) => {
            return player.id === battle.defender.player;
        });

        return (
            <div>
                <div>Attacker: { attacker.name } - { battle.attacker.dice.join(', ') } - { battle.attacker.units }</div>
                <div>Defender: { defender.name } - { battle.defender.dice.join(', ') } - { battle.defender.units }</div>
            </div>
        );
    }
};

export default CurrentBattle;
