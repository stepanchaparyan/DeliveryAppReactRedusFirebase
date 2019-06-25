import React, { Component, Fragment } from 'react';
import { Table, Button } from 'reactstrap';
import './productList.scss';
import { connect } from 'react-redux';
import { deleteProduct } from '../../store/actions/productActions';
import UpdateProduct from './updateProduct';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      show: false,
      id: ''
    };
  }

  toggle(e) {
    this.setState(({ 
      show: !this.state.show,
      id: e.target.id  
    }));
  }

  render () {
    const { products } = this.props;
    return ( 
        <Table striped>
          <thead>
            <tr>
                <th className="firstTD">#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th> 
            </tr>
          </thead>
          <tbody> 
            { products && products.map((product, i) => {
                return (
                  <Fragment key={i}>
                  <tr key={i}>
                    <td className="firstTD" scope="row">{i+1}</td>
                    <td>{product.name}</td>             
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td id="x" onClick={() => this.props.deleteProduct(product.id)}>x</td>
                    <td id="tdButton">
                      <Button className="btnUpdate" outline color="info" id={i} onClick={this.toggle}>Update</Button>
                    </td>
                  </tr>
                  { this.state.show && i==this.state.id ? 
                  <tr className="updateTR">
                    <td className="emptySpace"></td>
                    <td>      
                      <UpdateProduct id={product.id} data="name"/>
                    </td>
                    <td>
                      <UpdateProduct id={product.id} data="price"/>
                    </td>                  
                    <td>
                      <UpdateProduct id={product.id} data="quantity"/>
                    </td>
                    <td className="emptySpace"></td>
                    <td className="emptySpace"></td>
                  </tr>  
                  : null }
                  </Fragment>
                )
              }
            )}                  
          </tbody>
      </Table>        
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: (id) => dispatch(deleteProduct(id))
  }
}

 export default connect(null, mapDispatchToProps)(ProductList)