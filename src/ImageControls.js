"use strict";
import React, { Component } from 'react';
import "./ImageControls.css"
import Slider from 'material-ui/Slider';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AnglePicker from "./AnglePicker.js";
export default function ImageControls(props) {

    const [alignment, setAlignment] = React.useState('left');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        props.toggleChange(newAlignment);
    };
    return (
        <div className="container">
            <h2>Image {props.imageNum + 1}</h2>
            <span className="controlLabel">Gradient Location</span>
            <Slider value={props.sliderValue} min={0} max={1} step={.01}
                onChange={(e, val) => props.sliderChange(val)}
                style={{ marginTop: "-25px", marginBottom: "-32px" }}
            />
            <span className="controlLabel">Gradient Direction</span>
            <ToggleButtonGroup value={props.toggleValue} exclusive onChange={handleChange}>
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <br />
            <span className="controlLabel">Rotation Angle</span>
            <AnglePicker onChange={(val) => props.angleChange(val)} />
            <hr></hr>
        </div>
    )
}
// export default ImageControls;