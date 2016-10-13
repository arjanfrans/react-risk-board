import React, { PropTypes } from 'react';

class BattleScene extends React.Component {
    static propTypes = {
        viewData: PropTypes.object.isRequired,
        attackTerritory: PropTypes.string.isRequired,
        defendTerritory: PropTypes.string.isRequired
    };

    render () {
        const { viewData } = this.props;

        const attack = viewData.territories.find((v) => v.id === this.props.attackTerritory);
        const defend = viewData.territories.find((v) => v.id === this.props.defendTerritory);

        const attackNode = (
            <path
                d={ attack.path }
                x={ 0 }
                y={ 0 }
                width={ 200 }
                height={ 200 }
                strokeWidth={ 2 }
            />
        );

        const defendNode = (
            <path
                d={ defend.path }
                x={ 200 }
                y={ 0 }
                width={ 200 }
                height={ 200 }
                strokeWidth={ 2 }
            />
        );

        return (
            <svg
                width={ 400 }
                height={ 200 }
                viewBox="0 0 400 200"
                preserveAspectRatio="xMinYMin meet"
            >
                { attackNode }
                { defendNode }
            </svg>
        );
    }
}

export default BattleScene;
