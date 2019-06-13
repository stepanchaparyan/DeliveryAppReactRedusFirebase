import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addShop } from '../../store/actions/shopActions'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import logo from '../../assets/logo.png';
import './addShop.scss';

class AddShop extends Component {
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addShop(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (

    <div className="loginContainer">
        <div className="formAddShop">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="title">Add Shop</div>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup className="form-group">
                <Label className="lebel" for="name">Name</Label>
                <Input  type="text" 
                        id="name" 
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                        />
              </FormGroup>
              <FormGroup className="form-group">
                <Label className="lebel" for="name">City</Label>
                <Input  type="text" 
                        id="city" 
                        placeholder="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        />
              </FormGroup>
              <FormGroup className="form-group">
                <Label className="lebel" for="name">Address</Label>
                <Input  type="text" 
                        id="address" 
                        placeholder="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                        />
              </FormGroup>
              <Button className="btn btn-success btn-lg btn-block">Submit</Button>
            </Form>
        </div>
    </div>  
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addShop: (shop) => dispatch(addShop(shop))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShop)
