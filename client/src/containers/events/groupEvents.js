import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import _ from 'lodash';
import { fetchEvents } from '../../actions';
import { Segment, Icon, Button } from 'semantic-ui-react';
=======
import { fetchChannels } from '../../actions';
import CreateEvent from './createEvent';
import _ from 'lodash';

import { Segment, Icon, Modal, Button } from 'semantic-ui-react';
>>>>>>> add event handler for event form

export class GroupEvents extends Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents(props.groupdId);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick(eventId) {
    this.props.handleEventDetails(eventId);
  }

  renderEvents() {
    return _.map(this.props.events, event => {
      return (
        <Segment key={event.id}>
          <Button onClick={ () => { this.handleEventClick(event.id); } }>
            {event.name}
          </Button>
        </Segment>
      );
    });
  }

  render() {
    return (
      <Modal trigger={<Button><Icon name='plus circle' size='big'/></Button>}>
        <CreateEvent />
      </Modal>
    );
  }
}

const mapStateToProps = function(state) {
  return { events: state.events };
};

export default connect(mapStateToProps, { fetchEvents })(GroupEvents);