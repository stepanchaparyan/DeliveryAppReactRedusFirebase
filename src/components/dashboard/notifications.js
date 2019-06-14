import React from 'react';
import moment from 'moment';
import './notifications.scss';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Notifications = (props) => {
  const { notifications } = props;
  return (
    <div className="notifications">
          <div className="notificationTitle">Notifications</div>
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

export default Notifications
