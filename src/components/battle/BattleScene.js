import React, { PropTypes, Component } from 'react';

class BattleScene extends Component {

    render () {
        const { battle } = this.props;

        return (
            <g>
                <text
                    x="50%"
                    textAnchor="middle";
                    y="10%"
                >
                </text>
                { this.props.children }
            </g>
        );
    }
}

export default BattleScene;
