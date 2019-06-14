import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Button, Input } from 'reactstrap';
import moment from 'moment';
import './shopDetails.scss';
import { Redirect } from 'react-router-dom';

class ShopDetails extends Component {
  render () {
  //const { shop } = props;
  const { auth, shop } = this.props;
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (shop) {
      return (
        <>
        <div className="detailsTitle">Full data of shop</div>
        <div className="group-row">
          <div className="col text">Shop creator is</div>
          <div className="col text">{shop.authorFirstName} {shop.authorLastName}</div>
          <div className="col"></div>
          <div className="col" id="inp"></div>
        </div>
        <div className="group-row">
          <div className="col text">Shop created at</div>
          <div className="col text">{moment(shop.createdAt.toDate()).calendar()}</div>
          <div className="col"></div>
          <div className="col" id="inp"></div>
        </div>
        <div class="group-row">
          <div className="col text">Shop name</div>
          <div className="col text">{shop.name}</div>
          <Input className="col input" id="inp" placeholder="type the new name to update"/>
          <Button color="success" className="col" id="btn" size="sm">Update</Button>
        </div>
        <div class="group-row">
          <div className="col text">Shop city</div>
          <div className="col text">{shop.city}</div>
          <Input className="col input" id="inp" placeholder="type the new city to update"/>
          <Button color="success" className="col" id="btn" size="sm">Update</Button>
        </div>
        <div class="group-row">
          <div className="col text">Shop address</div>
          <div className="col text">{shop.address}</div>
          <Input className="col input" id="inp" placeholder="type the new address to update"/>
          <Button color="success" id="btn" className="col" size="sm">Update</Button>
        </div>     
        </>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      )
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  const id = ownProps.match.params.id;
  const shops = state.firestore.data.shops;
  const shop = shops ? shops[id] : null
  return {
    auth: state.firebase.auth,
    shop: shop
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'shops'
  }])
)(ShopDetails)

// class ShopDetails extends Component {
//   state = {
//     name: '',
//     city: '',
//     address: ''
//   }
//   handleChange = (e) => {
//     this.setState({
//       [e.target.id]: e.target.value
//     })
//   }
//   handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('st', this.props.shops[3].id);
//     //console.log('uid', this.auth.uid);

//     this.props.updateShop(this.props.shop.id);
//     this.props.history.push('/');
//     // this.props.updateShop(this.state, this.auth.uid);
//     // this.props.history.push('/');
//   }

//   render () {
//   console.log(this.props);  
//   const { auth, shops } = this.props;
//   console.log('shop ', shop);
//   if (!auth.uid) return <Redirect to='/signin' /> 
//   if (shops) {
//     return (
//       <div className="container section project-details">
//         <div className="card z-depth-0">
//           <div className="card-content">
//             <span className="card-title">{shop.name}</span> */}
//             <p>{shop.city}</p>
//             <input type="text" 
//                         id="name" 
//                         placeholder="name"
//                         value={this.state.name}
//                         onChange={this.handleChange}
//                         input/>
//           </div>
//           <button onClick={this.handleSubmit} className="btn btn-success btn-lg btn-block">Submit</button>

//           <div className="card-action grey lighten-4 grey-text">
//             <div>Posted by {shop.address} {shop.authorFirstName}</div>
//           </div>
//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <div className="container center">
//         <p>Loading shops...</p>
//       </div>
//     )
//   }
// }
// }

// const mapStateToProps = (state, ownProps) => {
//   // console.log(state);
//   return {
//     auth: state.firebase.auth,
//     shops: state.firestore.ordered.shops
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     updateShop: (shop, uid) => dispatch(updateShop(shop, uid)),
//   }
// }

// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   firestoreConnect([{
//     collection: 'shops'
//   }])
// )(ShopDetails)
