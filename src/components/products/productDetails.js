import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Button, Input } from 'reactstrap';
import moment from 'moment';
import './productDetails.scss';
import { Redirect } from 'react-router-dom';
import { updateProductName, updateProductPrice, updateProductQuantity } from '../../store/actions/productActions'

class ProductDetails extends Component {
  state = {
    name: '',
    price: '',
    quantity: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  updateProductName = (e) => {
    e.preventDefault();
    const { productId } = this.props;
    this.props.updateProductName(this.state.name, productId);
    this.props.history.push();
    this.setState({
        name: ''
    });
  }
  updateProductPrice = (e) => {
    e.preventDefault();
    const { productId } = this.props;
    this.props.updateProductPrice(this.state.price, productId);
    this.setState({
        price: ''
    });
  }
  updateProductQuantity = (e) => {
    e.preventDefault();
    const { productId } = this.props;
    this.props.updateProductQuantity(this.state.quantity, productId);
    this.setState({
        quantity: ''
    });
  }
  render () {
  const { auth, product } = this.props;
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (product) {
      return (
        <>
        <div className="detailsTitle">Full data of product</div>
        <div className="group-row">
          <div className="col text">Product creator is</div>
          <div className="col text">{product.authorFirstName} {product.authorLastName}</div>
          <div className="col"></div>
          <div className="col" id="inp"></div>
        </div>
        <div className="group-row">
          <div className="col text">Product created at</div>
          <div className="col text">{moment(product.createdAt.toDate()).calendar()}</div>
          <div className="col"></div>
          <div className="col" id="inp"></div>
        </div>
        <div className="group-row">
          <div className="col text">Product name</div>
          <div className="col text">{product.name}</div>
          <Input onChange={this.handleChange} className="col input" value={this.state.name} name="name" id="name" type="text"  placeholder="type the new name to update"/>
          <Button onClick={this.updateProductName} color="success" className="col" id="btn" size="sm">Update</Button>
        </div>
        <div className="group-row">
          <div className="col text">Product price</div>
          <div className="col text">{product.price}</div>
          <Input onChange={this.handleChange} className="col input" value={this.state.price} name="price" id="price" type="number" placeholder="type the new price to update"/>
          <Button onClick={this.updateProductPrice} color="success" className="col" id="btn" size="sm">Update</Button>
        </div>
        <div className="group-row">
          <div className="col text">Product quantity</div>
          <div className="col text">{product.quantity}</div>
          <Input onChange={this.handleChange} className="col input" value={this.state.quantity} name="quantity" id="quantity" type="number"  placeholder="type the new quantity to update"/>
          <Button onClick={this.updateProductQuantity} color="success" id="btn" className="col" size="sm">Update</Button>
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
  const id = ownProps.match.params.id;
  const products = state.firestore.data.products;
  const product = products ? products[id] : null
  return {
    auth: state.firebase.auth,
    product: product,
    productId: id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProductName: (productName, productId) => dispatch(updateProductName(productName, productId)),
    updateProductPrice: (productPrice, productId) => dispatch(updateProductPrice(productPrice, productId)),
    updateProductQuantity: (productQuantity, productId) => dispatch(updateProductQuantity(productQuantity, productId))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'products'
  }])
)(ProductDetails)

