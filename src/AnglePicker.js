import React, { Component } from 'react';
class AnglePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {angle:0}
    }
    updateAngle(pt){
        let dx = this.props.radius + 5 - pt.nativeEvent.offsetX;
        let dy = this.props.radius + 5 -pt.nativeEvent.offsetY;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;
        this.props.onChange(angle);
        this.setState(
            {angle:angle}
        )
    }
    calculatePosition() {
        let radians = this.state.angle * Math.PI / 180;
        return (
            {
                x0:0, 
                x1:this.props.radius * Math.sin(radians),
                y0:0, 
                y1:-this.props.radius * Math.cos(radians),
            }
        )
    }
    render() {
        let pos = this.calculatePosition();
        return(
            <svg>
                <g transform={`translate(${this.props.radius + 5}, ${this.props.radius + 5})`}>
                    <circle r={this.props.radius} style={{opacity:.2}} onMouseMove = {(val) => this.updateAngle(val)}/>
                    <line x0={pos.x0} x1={pos.x1} y0={pos.y0} y1={pos.y1} style={{stroke:"black"}}/>
                </g>
            </svg>
        )
    }
}

AnglePicker.defaultProps = {
    radius:50
}
export default AnglePicker;