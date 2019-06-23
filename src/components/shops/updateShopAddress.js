import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import './shopDetails.scss';
import { Redirect } from 'react-router-dom';
import { updateShopAddress } from '../../store/actions/shopActions'

class UpdateShopAddress extends Component {
  state = {
    address: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
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
  //console.log('Details - props ', this.props);
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (shop) {
      return (
        <div className="detailsPage">          
            <Input onChange={this.handleChange} className="col input" value={this.state.address} name="address" id="address" type="text" placeholder="new address"/>
            <Button onClick={this.updateShopAddress} color="success" className="col" id="btn" size="sm">Update</Button>
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
    updateShopAddress: (shopAddress, shopId) => dispatch(updateShopAddress(shopAddress, shopId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateShopAddress)