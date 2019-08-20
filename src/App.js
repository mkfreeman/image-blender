"use strict";
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import ImageLayer from "./ImageLayer";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import Button from '@material-ui/core/Button';
import AppControls from "./AppControls";
import Draggable from 'react-draggable';
import Footer from "./Footer";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLayers: 1,
            blendMode: "multiply",
            backgroundColor: "#d3d3d3"
        };
    }
    download() {
        domtoimage.toBlob(document.getElementById('canvasContainer'))
            .then(function (blob) {
                saveAs(blob, 'blended-images.png');
            });
    }
    addLayer() {
        this.setState({
            imageLayers: this.state.imageLayers + 1
        });
    }
    handleControlChange(id, val) {
        let newState = {};
        newState[id] = val;
        this.setState(newState);
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div id="sideBar" style={{ width: "262px", height: "95vh" }}>
                        <div id="title">
                            <h1>Image Blender</h1>
                            <p>Layer and blend images</p>
                        </div>
                        <div id="content" >
                            {Array.from(Array(this.state.imageLayers).keys()).map((d, i) => {
                                return (<ImageLayer imageNum={d} key={d} onAdd={() => this.addLayer()} outputCanvas={"canvas" + i} />)
                            })
                            }
                            <hr></hr>
                            <br />

                        </div>
                        <AppControls backgroundColor={this.state.backgroundColor} value={this.state.blendMode} update={(id, val) => this.handleControlChange(id, val)} />
                    </div>
                    <div id="canvasContainer"
                        style={{
                            overflow: "hidden",
                            top: '10px',
                            left: '276px',
                            position: "absolute",
                            width: window.innerWidth - 285,
                            height: window.innerHeight - 30,
                            mixBlendMode: this.state.blendMode,
                            backgroundColor: this.state.backgroundColor
                        }}
                    >
                        {Array.from(Array(this.state.imageLayers).keys()).map((d, i) => {
                            return (
                                <Draggable key={d} style={{ cursor: "pointer" }}>
                                    <canvas id={"canvas" + i} style={{ position: 'absolute', top: '0px', left: '0px', mixBlendMode: this.state.blendMode }} />
                                </Draggable>
                            )
                        })
                        }
                        {this.state.imageLayers === 1 &&
                            <div style={{
                                width: window.innerWidth * 0.8 - 350,
                                height: window.innerHeight - 50,
                                textAlign: "center",
                                margin: "auto",
                                padding: "50px",
                                verticalAlign: "middle"
                            }}>
                                <div style={{ opacity: .6, backgroundColor: this.state.backgroundColor, height: "100vh", paddingTop: "50vh" }}>
                                    <div>Use the control panel to upload and manipulate layers of draggable images.</div>
                                </div>
                            </div>

                        }
                    </div>
                    <Button id="download" color="primary" variant="contained" onClick={() => this.download()}>Download</Button>
                </div>
                <Footer />
            </MuiThemeProvider >
        )
    }
}

export default App;
