import React from 'react';
import moment from 'moment';
import '../../stylesheets/notifications.scss';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types'; 
import messages from '../../en.messages';

const Notifications = (props) => {
  const { notifications } = props;
  return (
    <div className="notifications">
          <div className="notificationTitle">{messages.notifications}</div>
          <ListGroup>
              { notifications && notifications.map(item =>{
                return <ListGroupItem className="notifications" key={item.id}>
                  <span className="userName">{item.user} </span>
                  <span className="content">{item.content} </span>
                  <span className="shopName">{item.shop} </span>
                  <span className="date">{moment(item.time.toDate()).fromNow()}</span>
                </ListGroupItem>
              })}
          </ListGroup>
    </div>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired
};

export default Notifications
