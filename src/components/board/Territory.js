import React, { PropTypes } from 'react';

class Territory extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        path: PropTypes.string,
        center: PropTypes.object,
        continentFill: PropTypes.string,
        hoverHandler: PropTypes.func,
        clickHandler: PropTypes.func
    };

    constructor (props) {
        super(props);

        this.state = {
            stroke: null,
            strokeWidth: 1
        };
    }

    render () {
        const { name } = this.props;
        const clickHandler = (evt) => {
            this.props.clickHandler(evt);
        };

        const enterHandler = (evt) => {
            this.setState({
                stroke: '#535353',
                strokeWidth: 2
            });
            this.props.hoverHandler(this.props.data);
        };

        const leaveHandler = (evt) => {
            this.setState({
                stroke: null,
                strokeWidth: 1
            });
        }

        let ownerColor = null;

        if (this.props.data.owner) {
            ownerColor = this.props.data.owner.color;
        }

        const svgPath = (
            <g>
                <path
                    id={ this.props.id }
                    onMouseEnter={ enterHandler }
                    onMouseLeave={ leaveHandler }
                    onClick={ clickHandler }
                    fill={ this.props.continentFill }
                    d={ this.props.path }
                    stroke={ ownerColor || this.state.stroke }
                    strokeOpacity={ ownerColor && this.state.stroke ? 1 : 0.6 }
                    strokeWidth={ 2 }
                >
                </path>
            </g>
        );


        return svgPath;
    }
}

export default Territory;
