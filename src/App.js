import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import ImageLayer from "./ImageLayer";
import domtoimage from 'dom-to-image'; // didn't work
import html2canvas from 'html2canvas';// didn't work
import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

class App extends Component {
    constructor(props) {
        super(props);
    }
    download() {
        domtoimage.toBlob(document.getElementById('canvasContainer'))
            .then(function (blob) {
                saveAs(blob, 'blended-images.png');
            });
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div id="sideBar" style={{ width: "240px", padding: "10px" }}>
                        <div id="title">
                            <h1>Image Blender</h1>
                            <p>Layer and blend images</p>
                        </div>
                        <div id="content" >
                            <ImageLayer outputCanvas={"canvas1"} />
                            <ImageLayer outputCanvas={"canvas2"} />
                        </div>
                        <button id="download" onClick={() => this.download()}>Download</button>
                    </div>
                    <div id="canvasContainer" style={{ top: '0px', left: '250px', position: "absolute", mixBlendMode: "multiply" }}>
                        <canvas id="canvas1" style={{ position: 'absolute', top: '0px', left: '0px', mixBlendMode: "multiply" }} />
                        <canvas id="canvas2" style={{ position: 'absolute', top: '0px', left: '0px', mixBlendMode: "multiply" }} />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }


}

export default App;

// Failed wrestling with different download options!

// htmlToImage.toSvgDataURL(document.getElementById("canvasContainer"))
//     .then(function (dataUrl) {
//         var img = new Image();
//         img.src = dataUrl;
//         document.body.appendChild(img);
//     })
// html2canvas(document.getElementById("canvasContainer"), {
//     onrendered: function (canvas) {
//         alert("test2")
//         // canvas is the final rendered <canvas> element
//         document.body.appendChild(canvas);
//         var myImage = canvas.toDataURL("image/png");
//         window.open(myImage);
//     },
//     allowTaint: true
// });
// html2canvas(document.getElementById("canvasContainer")).then(function (canvas) {
//     document.body.appendChild(canvas);
// });

// html2canvas(document.getElementById("canvasContainer")).then(function (canvas) {
//     document.body.appendChild(canvas);
// const imgData = canvas.toDataURL('image/png');
// var w = window.open('about:blank', 'image from canvas');
// w.document.write("<img src='" + imgData + "' alt='from canvas'/>");


// this.href = imgData;
// this.click()
// });

// Works, just not with ref!
// domtoimage.toPng(document.getElementById("canvasContainer"))
//     .then(function (dataUrl) {
//         var img = new Image();
//         img.src = dataUrl;
//         document.body.appendChild(img);
//     })
//     .catch(function (error) {
//         console.error('oops, something went wrong!', error);
//     });

    // setDownloadBlob(linkId, canvasId, filename) {
//     let canvas = document.getElementById(canvasId);
//     let link = document.getElementById(linkId);

//     // Convert to blob and download
//     canvas.toBlob(function (blob) {
//         let url = URL.createObjectURL(blob);
//         link.href = url;
//         link.download = filename;
//     });
// }