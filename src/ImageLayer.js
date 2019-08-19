import React, { Component } from 'react';
import Uploader from "./Uploader";
import ImageControls from "./ImageControls";

class ImageLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gradient: 0.9,
            direction: "left",
            angle: 0,
            fitToScreen: true,
            width: window.innerWidth - 250,
            height: window.innerHeight - 20
        }
        this.handleControlChange.bind(this);
    }
    // Compute size
    // Compute dimensions to maximize image size to fit screen
    getDimensions(img) {
        let width = null,
            height = null;
        if (this.state.fitToScreen === true) {
            // Maximize area of photo
            let imageRatio = img.naturalWidth / img.naturalHeight;
            let screenRatio = this.state.width / this.state.height;
            let scale = Math.min(this.state.width / img.naturalWidth, this.state.height / img.naturalHeight);
            if (imageRatio > screenRatio) {
                width = Math.floor(this.state.width);
                height = Math.floor(img.naturalHeight * scale);
            } else {
                height = Math.floor(this.state.height);
                width = Math.floor(img.naturalWidth * scale);
            }
        } else {
            height = img.naturalHeight;
            width = img.naturalWidth;
        }
        return {
            width: width,
            height: height
        }
    }
    // Render the image
    drawCanvas(img) {
        let canvas = document.getElementById(this.props.outputCanvas);
        let dims = this.getDimensions(img);
        let width = dims.width;
        let height = dims.height;
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext('2d');

        // Linear gradient
        this.gradient = this.ctx.createLinearGradient(0, height / 2, width, height / 2);

        // Set color stops (depending on direction)
        if (this.state.direction == "left") {
            this.gradient.addColorStop(this.state.gradient, 'rgba(255, 255, 255, 0)');
            this.gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
        }
        else {
            this.gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            this.gradient.addColorStop(this.state.gradient, 'rgba(255, 255, 255, 0)');
        }


        // Move registration point to the center of the canvas
        this.ctx.translate(width / 2, height / 2);

        // Rotate 1 degree
        this.ctx.rotate(this.state.angle * Math.PI / 180);

        // Move registration point back to the top left corner of canvas
        this.ctx.translate(-width / 2, -height / 2);

        // Set the fill style and draw a rectangle

        this.ctx.drawImage(img, 0, 0, width, height);
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, width, height);

        if (typeof (this.state.img) === "undefined") {
            this.setState({ img: img });
        }
    }
    handleControlChange(id, val) {
        console.log("control chnage", id, val)
        let newState = {};
        newState[id] = val;
        this.setState(newState)
    }
    render() {
        console.log(typeof (this.state.img))
        if (typeof (this.state.img) !== "undefined") {
            this.drawCanvas(this.state.img);
        }
        return (
            <div>
                <Uploader onUpload={(val) => this.drawCanvas(val)} />
                {typeof (this.state.img) !== "undefined" &&
                    <ImageControls
                        sliderChange={(val) => this.handleControlChange("gradient", val)}
                        sliderValue={this.state.gradient}
                        toggleValue={this.state.direction}
                        toggleChange={(val) => this.handleControlChange("direction", val)}
                        angleChange={(val) => this.handleControlChange("angle", val)}
                    />
                }
            </div>

        )
    }
}
export default ImageLayer;