"use strict";
import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
const options = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
];
class AppControls extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <InputLabel htmlFor="blend-mode">Blending Technique</InputLabel>
                <Select name="blend-mode" value={this.props.value} onChange={(e, val) => this.props.update(e.target.value)}>
                    {options.map((d) =>
                        <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                    )}
                </Select>
            </div>
        )
    }
}

export default AppControls;