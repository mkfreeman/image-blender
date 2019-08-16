import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AnglePicker from "./AnglePicker.js";
export default function ImageControls(props) {
    
    const [alignment, setAlignment] = React.useState('left');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        props.toggleChange(newAlignment);
    };
    return(
        <div class="container" style={{width:"200px"}}>
            <span>Gradient Location</span>
            <Slider value = {props.sliderValue} min={0} max={1} step={.01 } 
                onChange={ (e, val) => props.sliderChange(val) }                     
            />
            <span>Gradient Direction</span>
            <ToggleButtonGroup value={props.toggleValue} exclusive onChange={handleChange}>
                <ToggleButton value="left">Left</ToggleButton>
                <ToggleButton value="right">Right</ToggleButton>
            </ToggleButtonGroup>
            <br/>
            <span>Rotation Angle</span>
            <AnglePicker onChange = {(val) => props.angleChange(val)}/>
        </div>
    )
}
// export default ImageControls; 