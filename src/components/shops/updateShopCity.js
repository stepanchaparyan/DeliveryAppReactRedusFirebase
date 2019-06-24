import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import './updateShop.scss';
import { Redirect } from 'react-router-dom';
import { updateShopCity } from '../../store/actions/shopActions'

class UpdateShopCity extends Component {
  state = {
    city: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  updateShopCity = (e) => {
    e.preventDefault();
    const { shopId } = this.props;
    this.props.updateShopCity(this.state.city, shopId);
    this.setState({
        city: ''
    });
  }

  render () {
  const { auth, shop } = this.props;
  //console.log('Details - props ', this.props);
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (shop) {
      return (
        <div className="detailsPage">          
            <Input onChange={this.handleChange} className="col input" value={this.state.city} name="city" id="city" type="text" placeholder="new city"/>
            <Button onClick={this.updateShopCity} outline color="info" className="col" id="btn" size="sm">Update</Button>
        </div>
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
  //console.log('state ', ownProps)
  const id = ownProps.id;
  const shops = state.firestore.data.shops;
  const shop = shops ? shops[id] : null
  return {
    auth: state.firebase.auth,
    shop: shop,
    shopId: id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateShopCity: (shopCity, shopId) => dispatch(updateShopCity(shopCity, shopId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateShopCity)