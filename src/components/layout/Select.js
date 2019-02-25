import React, { Component } from 'react';
import {ButtonToolbar, Dropdown, MenuItem} from 'react-bootstrap';


class Select extends Component {

  constructor(props){
    super(props);
    this.state = { selectedId: 1 }
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = (eventKey) => {
    this.setState({ selectedId: eventKey })
    this.props.onselect(users[eventKey-1].name);
  }
  
  render() {
    const { selectedId } = this.state;
    
    const selectedUser = users.find(user => user.id === selectedId);
    return (
      <Dropdown onSelect={this.onSelect} id="d" bsSize="medium">
        <Dropdown.Toggle>
          <img alt={selectedUser.img} />
          &nbsp;
          {selectedUser.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {users.map(user => (
            <MenuItem eventKey={user.id} key={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const users = [
  {id: 1, name: "User"},
  {id:2, name:"Admin"}
];


export default Select;