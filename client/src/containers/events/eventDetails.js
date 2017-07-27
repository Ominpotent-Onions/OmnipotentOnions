import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChannels } from '../../actions';
import _ from 'lodash';

import { Segment, Icon } from 'semantic-ui-react';

export class EventDetails extends Component {
  constructor(props) {
    super(props);
    console.log('event details rendered. event id: ', this.props.eventId);
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
        alert('geocode unsuccessful: ', status);
      }
    });
  }

  render() {
    let currentEvent = this.props.events[this.props.eventId];
    console.log('current event! ', currentEvent );
    return (
      <div> 
        <h3>{currentEvent.name} </h3>
        <strong>Date:</strong> {currentEvent.date} <br/>
        <strong>Address:</strong> {currentEvent.address} <br/>
        <div id='map-canvas'></div>
        <strong>Time:</strong> {currentEvent.time} <br/>
      </div>
    );
  } 

}

const mapStateToProps = function(state) {
  return { events: state.events };
};

export default connect(mapStateToProps, {})(EventDetails);