import React, { Component } from 'react'
import './Location.css'
import axios from 'axios'
import {connect} from 'react-redux';
import {firestoreConnect} from  'react-redux-firebase';
import {compose} from 'redux';

class Location extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
      this.renderMap();
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAs6V1XK0vIJ51PJ3J-x9Gyhha1JwpqUv8&callback=initMap")
    
    window.initMap = this.initMap
  }

  /** getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
      client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
      query: "food",
      near: "Sydney",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }**/

  initMap = () => {



    const {coords} = this.props.project.address.address;
 
    // Create A Map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: coords.lat, lng: coords.lon},
      zoom: 18
    })

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow()

    // Display Dynamic Markers
    this.state.venues.map(myVenue => {

      var contentString = `${myVenue.venue.name}`

      // position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })

      // Click on A Marker!
      marker.addListener('click', function() {

        // Change the content
        infowindow.setContent(contentString)

        // Open An InfoWindow
        infowindow.open(map, marker)
      })

    })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}


export default Location;

