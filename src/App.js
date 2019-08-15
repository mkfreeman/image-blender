import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import ImageLayer from "./ImageLayer";
class App extends Component {
  constructor(props) {
    super(props);
  }
   
  render() {    
    return (
      <MuiThemeProvider>    
        <div>
          <div style={{width:"240px", padding:"10px"}}>
            <ImageLayer />
            <ImageLayer />
          </div>                
        </div>
      </MuiThemeProvider>
    )
  }
  
  
}

export default App;