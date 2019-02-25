import React from 'react'
import './style.css'
import moment from 'moment'
import {BrowserRouter, Route, NavLink, Switch, Redirect, Link} from 'react-router-dom';
import CreateProject from '../projects/CreateProject'
import ProjectDetails from '../projects/ProjectDetails';
import App from '../../App'


const Notifications = (props) => {

  const { notifications } = props;


    return (
        <div className="container-fluid">
  <h3 className="title">NOTIFICATIONS</h3>
{notifications && notifications.map(notification =>{

  let icon = "icon fa fa-star"; // default icon

  if(notification.content.includes("Added")){
    icon = "icon fa fa-sticky-note"
  }else if(notification.content.includes("Delete")){
    icon = 'icon fas fa-eraser'
  }

  console.log(notification.id,"ID");
return <div key ={notification.id} className="notification">
      <div className="alert">
      <i className={icon}></i>
      <div className="alert-content">
      <span>{notification.user} <Link to={"/project/"+notification.projectId} >{notification.content}</Link></span></div>

    </div>
    <div className="alert-time">{moment(notification.time.toDate()).fromNow()}</div>
  </div>

})}
</div>
    )
}

export default Notifications;

/**
 * 
 * 
 *  <div className="notification">
    <div className="alert">
      <i className="icon fa fa-comment"></i>
      <div className="alert-content">
        <span className="alert-name">Sasha Tran</span> commented your post</div>
    </div>
    <div className="alert-time">5s</div>
  </div>
  <div className="notification">
    <div className="alert">
      <i className="icon fa fa-sticky-note"></i>
      <div className="alert-content">
        <span className="alert-name">Tris </span> posted a new post</div>
    </div>
    <div className="alert-time">3m</div>
  </div>

 */