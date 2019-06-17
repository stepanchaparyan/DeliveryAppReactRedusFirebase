import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Table } from 'reactstrap';
import './shopList.scss';
import { connect } from 'react-redux'
import { deleteShop } from '../../store/actions/shopActions'

class ShopList extends Component {

  render () {
    const { shops } = this.props;
    //console.log('shopList ', shops);
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
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <th>
                    <NavLink exact to={'/shop/' + shop.id}>{shop.name}</NavLink>
                    </th>
                    <td>{shop.city}</td>
                    <td>{shop.address}</td>
                    <td id="x" onClick={() => this.props.deleteShop(shop.id)}>x</td>
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
    deleteShop: (id) => dispatch(deleteShop(id))
  }
}

// const mapStateToProps = (state) => {
//   console.log('state_in_List', state);
//   return {
//     shops: state.firestore.ordered.shops
//   }
// }

 export default connect(null, mapDispatchToProps)(ShopList)