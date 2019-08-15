import React, {Component} from 'react';
import Uploader from "./Uploader";
import ImageControls from "./ImageControls";
class ImageLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gradient:.9, 
            direction:"right"
        }
        this.handleControlChange.bind(this);
    }
    
    drawCanvas(img) {
        this.img = img;
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        this.refs.canvasCopy.width = width;
        this.refs.canvasCopy.height = height;
        this.ctx = this.refs.canvasCopy.getContext('2d');
        this.ctx.clearRect(0, 0, width, height);            
        this.ctx.drawImage(img, 0, 0, width, height);
        
        // Linear gradient
        this.gradient = this.ctx.createLinearGradient(0,height, width,height);
    
        // Set color stops (depending on direction)
        if(this.state.direction == "left") {
            console.log("this.state.gradient", this.state.gradient)
          this.gradient.addColorStop(this.state.gradient, 'rgba(255, 255, 255, 0)');        
          this.gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
        }
        else {
          this.gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');        
          this.gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
            
        // Set the fill style and draw a rectangle
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, width, height);
    } 
    handleControlChange(id, val) {
        let newState = {};
        newState[id] = val;
        console.log("new state", newState, id, val)
        this.setState(newState)
    }    
    render() {
        console.log("render!")
        if(this.img !== undefined) {
            this.drawCanvas(this.img);
        }
        return(
            <div>
                <Uploader onUpload = {(val) => this.drawCanvas(val)}/>
                <div style={{mixBlendMode:"multiply"}}>
                    <canvas id="canvas" ref="canvasCopy" style={{position:'absolute', top:'0px', right:'0px'}}/>
                </div>
                <ImageControls 
                    sliderChange = {(val) => this.handleControlChange("gradient", val)}
                    sliderValue = {this.state.gradient}
                    toggleValue = {this.state.direction}
                    toggleChange = {(val) => this.handleControlChange("direction", val)}/>
            </div>
            
        )
    } 
}
export default ImageLayer;