"use strict";
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

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
        // const classes = useStyles();
        return (
            <div style={{ cursor: "pointer" }}>
                <Dropzone onDrop={(d) => this.onDrop(d)}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p><Button><Icon color="primary" fontSize="large">add_circle</Icon></Button>Add an image</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        )
    }


}

export default Uploader;