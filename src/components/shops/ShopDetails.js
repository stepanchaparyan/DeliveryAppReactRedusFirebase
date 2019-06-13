import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateShop } from '../../store/actions/shopActions'

class ShopDetails extends Component {
  state = {
    name: '',
    city: '',
    address: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('st', this.props.shops[3].id);
    //console.log('uid', this.auth.uid);

    this.props.updateShop(this.props.shop.id);
    this.props.history.push('/');
    // this.props.updateShop(this.state, this.auth.uid);
    // this.props.history.push('/');
  }

  render () {
  //console.log(this.props);  
  const { auth, shops } = this.props;
  // console.log('shop ', shop);
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (shops) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            {/* <span className="card-title">{shop.name}</span> */}
            {/* <p>{shop.city}</p> */}
            {/* <input type="text" 
                        id="name" 
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        input/> */}
          </div>
          <button onClick={this.handleSubmit} className="btn btn-success btn-lg btn-block">Submit</button>

          <div className="card-action grey lighten-4 grey-text">
            {/* <div>Posted by {shop.address} {shop.authorFirstName}</div> */}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading shops...</p>
      </div>
    )
  }
}
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    shops: state.firestore.ordered.shops
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateShop: (shop, uid) => dispatch(updateShop(shop, uid)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'shops'
  }])
)(ShopDetails)
