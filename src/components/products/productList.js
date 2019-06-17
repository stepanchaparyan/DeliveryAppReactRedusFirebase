import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';
import './productList.scss';
import { connect } from 'react-redux'
import { deleteProduct } from '../../store/actions/productActions'

class ProductList extends Component {
  render () {
    const { products } = this.props;
    return (
        <Table striped>
          <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
          </thead>
          <tbody> 
            { products && products.map((product, i) => {
                return ( 
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <th>       
                    {/* <Link to={'/product/' + product.id}>{product.name}</Link> */}
                    <a href={'/product/' + product.id}>{product.name}</a>
                    </th>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td id="x" onClick={() => this.props.deleteProduct(product.id)}>x</td>
                  </tr>
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