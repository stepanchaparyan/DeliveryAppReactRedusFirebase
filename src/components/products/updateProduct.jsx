import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import '../../stylesheets/updateProduct.scss';
import { Redirect } from 'react-router-dom';
import { updateProduct } from '../../store/actions/productActions'
import PropTypes from 'prop-types';

class UpdateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [props.data]: ''
    }
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    updateProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired
    }),
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  updateProduct = (e) => {
    e.preventDefault();
    const { productId } = this.props;
    this.props.updateProduct(this.props.data, this.state[this.props.data], productId);
    this.setState({
      [this.props.data]: ''
    });
  }

  render () {
  const { auth, product } = this.props;
  //console.log('Details - props ', this.props);
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (product) {
      return (
        <div className="detailsPage">          
            <Input onChange={this.handleChange} className="col input" value={this.state[this.props.data]} name={this.props.data} id={this.props.data} type="text" placeholder={this.props.data}/>
            <Button onClick={this.updateProduct} outline color="info" className="col updatebtn" id="btn" size="sm">Update</Button>
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
    updateProduct: (data, productData, productId) => dispatch(updateProduct(data, productData, productId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)