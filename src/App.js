import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Uploader from "./Uploader";
import ControlPanel from "./ControlPanel"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradient:.9
    }
    this.handleSliderChange.bind(this);
  }
  handleSliderChange(val) {
    this.setState({gradient:val})
  } 
  render() {    
    return (
      <MuiThemeProvider>    
        <ControlPanel handleSliderChange = {(val) => this.handleSliderChange(val)}/>   
        <Uploader direction = "left" gradient = {this.state.gradient}/>
        <Uploader direction = "right"/>
      </MuiThemeProvider>
    )
  }
  
  
}

export default App;