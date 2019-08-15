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
          this.props.onUpload(this.img)
        }
    }
    acceptedFiles.forEach(file => reader.readAsDataURL(file))
  }
  render() {    
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
