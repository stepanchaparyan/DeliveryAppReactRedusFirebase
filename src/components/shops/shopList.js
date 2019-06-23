import React, { Component, Fragment } from 'react'
import { Table } from 'reactstrap';
import './shopList.scss';
import { connect } from 'react-redux'
import { deleteShop } from '../../store/actions/shopActions'
import UpdateShopName from './updateShopName';
import UpdateShopCity from './updateShopCity';
import UpdateShopAddress from './updateShopAddress';
import { Button } from 'reactstrap';

class ShopList extends Component {
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
    const { shops } = this.props;
    return ( 
        <Table striped>
          <thead>
            <tr>
                <th className="firstTD">#</th>
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
                    <td className="firstTD" scope="row">{i+1}</td>
                    <td>{shop.name}</td>             
                    <td>{shop.city}</td>
                    <td>{shop.address}</td>
                    <td id="x" onClick={() => this.props.deleteShop(shop.id)}>x</td>
                    <td>
                      <Button className="btnUpdate" color="secondary" id={i} onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
                    </td>
                  </tr>
                  { this.state.show && i==this.state.id ? 
                  <tr className="updateTR">
                    <td className="firstTD"></td>
                    <td>       
                      <UpdateShopName isOpen={this.state.collapse} id={shop.id} />
                    </td>
                    <td>       
                      <UpdateShopCity id={shop.id} />
                    </td>                  
                    <td>       
                      <UpdateShopAddress id={shop.id} />
                    </td>
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
    deleteShop: (id) => dispatch(deleteShop(id))
  }
}

 export default connect(null, mapDispatchToProps)(ShopList)