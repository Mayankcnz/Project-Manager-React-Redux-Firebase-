import React, { Component } from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import List from './List';
import Location from './Location';
import TaskList from '../TaskManager/TaskList'

class TabBar extends React.Component{


    render(){

        return(
            
            <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
  <Tab eventKey={1} title="Profile">
      <List id={this.props.id} project={this.props.project.form} />
  </Tab>
  <Tab eventKey={2} title="Location">
    <Location project = {this.props.project}/>
  </Tab>
  <Tab eventKey={3} title="Task Manager">
     <TaskList />
    </Tab>
    <Tab eventKey={4} title="Pictures">
    Coming soon
    </Tab>
    <Tab eventKey={5} title="Members">
    Kayak
    </Tab>
</Tabs>
            
        );
    }
}

export default TabBar;

