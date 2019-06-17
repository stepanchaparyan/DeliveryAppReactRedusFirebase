import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import moment from 'moment';
import './shopDetails.scss';
import { Redirect } from 'react-router-dom';
import { updateShopName, updateShopCity, updateShopAddress } from '../../store/actions/shopActions'

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
  updateShopName = (e) => {
    e.preventDefault();
    const { shopId } = this.props;
    this.props.updateShopName(this.state.name, shopId);
    this.props.history.push();
    this.setState({
        name: ''
    });
  }

  updateShopCity = (e) => {
    e.preventDefault();
    const { shopId } = this.props;
    this.props.updateShopCity(this.state.city, shopId);
    this.setState({
        city: ''
    });
  }

  updateShopAddress = (e) => {
    e.preventDefault();
    const { shopId } = this.props;
    this.props.updateShopAddress(this.state.address, shopId);
    this.setState({
        address: ''
    });
  }
  render () {
  const { auth, shop } = this.props;
  console.log('Details - props ', this.props);
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
        <div className="group-row">
          <div className="col text">Shop name</div>
          <div className="col text">{shop.name}</div>
          <Input onChange={this.handleChange} className="col input" value={this.state.name} name="name" id="name" type="text"  placeholder="type the new name to update"/>
          <Button onClick={this.updateShopName} color="success" className="col" id="btn" size="sm">Update</Button>
        </div>
        <div className="group-row">
          <div className="col text">Shop city</div>
          <div className="col text">{shop.city}</div>
          <Input onChange={this.handleChange} className="col input" value={this.state.city} name="city" id="city" type="text" placeholder="type the new city to update"/>
          <Button onClick={this.updateShopCity} color="success" className="col" id="btn" size="sm">Update</Button>
        </div>
        <div className="group-row">
          <div className="col text">Shop address</div>
          <div className="col text">{shop.address}</div>
          <Input onChange={this.handleChange} className="col input" value={this.state.address} name="address" id="address" type="text"  placeholder="type the new address to update"/>
          <Button onClick={this.updateShopAddress} color="success" id="btn" className="col" size="sm">Update</Button>
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
  console.log('mapstate', state);
  const id = ownProps.match.params.id;
  const shops = state.firestore.data.shops;
  const shop = shops ? shops[id] : null
  return {
    auth: state.firebase.auth,
    shop: shop,
    shopId: id
  }
}

const mapDispatchToProps = dispatch => {
  console.log('mapdispatch',);
  return {
    updateShopName: (shopName, shopId) => dispatch(updateShopName(shopName, shopId)),
    updateShopCity: (shopCity, shopId) => dispatch(updateShopCity(shopCity, shopId)),
    updateShopAddress: (shopAddress, shopId) => dispatch(updateShopAddress(shopAddress, shopId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetails)