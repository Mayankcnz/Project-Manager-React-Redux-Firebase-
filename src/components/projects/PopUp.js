import React, { Component } from 'react';
import './Form.css';
import {Button, Modal} from 'react-bootstrap';


class PopUp extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleHide = this.handleHide.bind(this);
  
      this.state = {
        show: false
      };
    }

    handleHide() {
      this.setState({ show: false });
    }

    handleSave = () =>{
      if(this.props.save) this.props.save();
      if(this.props.closeHandle)
            this.handleClose();
    }

    handleClose = () =>{
      this.handleHide();
    }

    setStart = () =>{
      this.setState({ show: true });
    }

    handleClear = () =>{
      if(this.props.clear)
          this.props.clear();
    }

    render() {

      return (
        <div className="modal-container" style={{ height: 60}}>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.setStart}
          >
          {this.props.buttonName}
          </Button>
  
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton  dialogClassName="border-radius-2"style={{background:"#B29D9D", radius:"2px"}}>
              <Modal.Title id="contained-modal-title">
                {this.props.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background:"#B29D9D", radius:"2px"}}>
              {this.props.children}
            </Modal.Body>
            <Modal.Footer style={{background:"#B29D9D", radius:"2px", paddingLeft: "50px"}}>
              <Button onClick={this.handleClear} style={{position: "absolute", left: "5%"}}>clear</Button>
              <Button onClick={this.handleHide} style={{position: "absolute", left: "45%"}}>close</Button>
              <Button onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

export default PopUp;

/**
 * <p style={{color: "red"}}> {this.props.message}</p>
 */