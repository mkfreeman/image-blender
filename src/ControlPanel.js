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


class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // Handle slider change
    handleSliderChange(key, val) {
        let obj = {}
        obj[key] = val;
        this.setState(obj);
    }
    render() {
        return(
            <div class="container" style={{width:"100px"}}>
                <Slider min={0} max={1} step={.01 } 
                    onChange={ (e, val) => this.props.handleSliderChange(val) }                     
                    />
            </div>
        )
    }
}
export default ControlPanel; 