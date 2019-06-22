import React, { Component, Fragment } from 'react'
import { Table } from 'reactstrap';
import './shopList.scss';
import { connect } from 'react-redux'
import { deleteShop } from '../../store/actions/shopActions'
import ShopDetails from './shopDetails';

class ShopList extends Component {

  render () {
    const { shops } = this.props;
    return ( 
        <Table striped>
          <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>City</th>
                <th>Address</th>
            </tr>
          </thead>
          <tbody> 
            { shops && shops.map((shop, i) => {
                return ( 
                  <Fragment key={i}>
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{shop.name}</td>             
                    <td>{shop.city}</td>
                    <td>{shop.address}</td>
                    <td id="x" onClick={() => this.props.deleteShop(shop.id)}>x</td>
                  </tr>
                  <tr>
                    <td>
                      <ShopDetails id={shop.id} />
                    </td>
                    <td>
                      <ShopDetails id={shop.id} />
                    </td>
                    <td>
                      <ShopDetails id={shop.id} />
                    </td>
                  </tr>
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
    deleteShop: (id) => dispatch(deleteShop(id))
  }
}

 export default connect(null, mapDispatchToProps)(ShopList)