import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions';
import _ from 'lodash';
import axios from 'axios';

import { Segment, Icon } from 'semantic-ui-react';

export class EventDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderMaps();
  }

  renderMaps() {
    let map, marker;
    let address = this.props.events[this.props.eventId].address;
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        let mapOptions = {
          center: results[0].geometry.location,
          zoom: 15
        };
        
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        let marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocoding was unsuccessful. There will not be a GMap displayed: ', status);
      }
    });
  }

  renderWeather() {
    let address = this.props.events[this.props.eventId].address;
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, (results, status) => {
      if (status === 'OK') {
        let lat = (results[0].geometry.location.lat()).toFixed(2);
        let lng = (results[0].geometry.location.lng()).toFixed(2);

        axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=16&APPID=300dbc7cef6e1d88d172735c5f3cb721`)
          .then(result => {
            console.log('received weather data', result);
          });
      } else {
        console.log('Geocoding unsuccessful. Weather will not display', status);
      }
    });

    return <div> shoull return the weather </div>;
  }

  render() {
    let currentEvent = this.props.events[this.props.eventId];
    return (
      <div> 
        <h3>{currentEvent.name} </h3>
        <strong>Date:</strong> {currentEvent.date} <br/>
        <strong>Location:</strong> {currentEvent.address} <br/>
        <div id='map-canvas'></div>
        <strong>Time:</strong> {currentEvent.time} <br/>
        <div>
          <strong>Weather</strong>
          {this.renderWeather()}
        </div> 
      </div>
    );
  } 

}

const mapStateToProps = function(state) {
  return { events: state.events };
};

export default connect(mapStateToProps, {})(EventDetails);