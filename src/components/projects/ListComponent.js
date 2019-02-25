import React, { Component } from 'react'
import './Form.css'

class ListComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            edit: false,
            type: this.props.type,
            oldInformation: this.props.information,
            information: this.props.information
        }
      }

     editable = (e) =>{

        this.setState({
            open: !this.state.open,
            edit: !this.state.edit
        })

        if(this.state.information !== this.state.oldInformation){ // information has been altered


            //this.props.updateProject(this.props.id, this.props.project, this.props.type, this.state.information);
            this.setState({
                oldInformation: this.state.information
            })

        }

      }

       handleChange = (event) => {
            this.setState({
                information: event.target.value
            })
            this.props.handlechange(this.props.selector, event.target.value);
            
      } 

    render(){

        
        const {open} = this.state;

        let style;
        let icon;

        if(open){ 
            style = "btn btn-info"
            icon = <i class="fas fa-check-square"></i>
        }else {
            style = "btn btn-danger"
            icon =  <i class="far fa-edit"></i>
        }
        return(

         <tbody>
                          <tr>
                            <td align="center" style={{maxWidth:"80px"}}>
                              <a onClick={this.editable} class={style} style={{margin:"10px"}}>{icon}</a>
                              <a class="btn btn-danger"><em class="fa fa-trash"></em></a>
                            </td>
                            <td style={{whiteSpace:"no-wrap"}}>{this.props.type}</td>
                            <td style={{whiteSpace:"no-wrap"}}>{this.state.edit ? <input id={"information"} className="text-center" type="text" autoFocus={true} value={this.props.information} onChange={this.handleChange} contentEditable={open.toString()} /> : this.props.information} </td>
                          </tr>
                          <tr></tr>
                        </tbody>
     );
    }
}


export default ListComponent;