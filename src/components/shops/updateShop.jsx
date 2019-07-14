import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import '../../stylesheets/updateShop.scss';
import { Redirect } from 'react-router-dom';
import { updateShop } from '../../store/actions/shopActions'
import PropTypes from 'prop-types';

class UpdateShop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      [props.data]: ''
    }
  }

  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.string,
    shopId: PropTypes.string,
    updateShop: PropTypes.func,
    shop: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  updateShop = (e) => {
    e.preventDefault();
    const { shopId } = this.props;
    this.props.updateShop(this.props.data, this.state[this.props.data], shopId);
    this.setState({
      [this.props.data]: ''
    });
  }

  render () {
  const { auth, shop } = this.props;
  //console.log('Details - props ', this.props);
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (shop) {
      return (
        <div className="detailsPage">          
            <Input onChange={this.handleChange} className="col input" value={this.state[this.props.data]} name={this.props.data} id={this.props.data} type="text" placeholder={this.props.data}/>
            <Button onClick={this.updateShop} outline color="info" className="col updatebtn" id="btn" size="sm">Update</Button>
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
    updateShop: (data, shopData, shopId) => dispatch(updateShop(data, shopData, shopId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateShop)