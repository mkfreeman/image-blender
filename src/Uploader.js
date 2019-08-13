import React, {Component} from 'react';
import Dropzone from 'react-dropzone'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.onDrop.bind(this);
  }
  onDrop(acceptedFiles) {
    const reader = new FileReader()
    reader.onload = () => {
        // Make an image that isn't shown to draw it as a canvas
        this.img = new Image();
        this.img.src = reader.result;
        this.img.onload = () => {
          this.drawCanvas(this.img)
        }
    }
    acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }

  drawCanvas(img) {
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
    if(this.props.direction == "left") {
      this.gradient.addColorStop(this.props.gradient, 'rgba(255, 255, 255, 0)');        
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
  render() {    
    // this.drawCanvas()
    if(this.img !== undefined) {
      this.drawCanvas(this.img);
    }
    return (
      
      <div>        
        <Dropzone onDrop={(d) => this.onDrop(d)}>
          {({getRootProps, getInputProps}) => (          
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        
        <div style={{mixBlendMode:"multiply"}}>
          <canvas id="canvas" ref="canvasCopy" style={{position:'absolute', top:'0px', right:'0px'}}/>
        </div>
        
      </div>
    )
  }
  
  
}

export default Uploader;


// Create gradient, from middle to borders
/*
// Outside gradient (just for fun)
var gradient = ctx.createRadialGradient(150, 150, 0,
        150, 150, 150);

var gradient = ctx.createRadialGradient(width/2, height/2, 0,
            width/2, height/2, height/2);

// Opaque white in the middle
gradient.addColorStop(0, 'rgba(255,255,255,0)');

// Transparent white at the borders
gradient.addColorStop(1, 'rgba(255,255,255,1)');

ctx.globalCompositeOperation = 'destination-out';
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height); // Fill rectangle over image with the gradient
*/


 /* !!!!!!!! note -- you can't actually see through 
            canvas images, even if you have a transparent gradient. 
            To get this affect, you should use images and do the css 
            (as in marxandangles) 
            
            
            this was the crux! mix blend mode! see: https://getflywheel.com/layout/css-blend-modes/
            */
