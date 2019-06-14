import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addShop } from '../../store/actions/shopActions'
import { Button, FormGroup } from 'reactstrap';
import './addShops.scss';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { DebounceInput } from 'react-debounce-input';

class AddShop extends Component {
  state = {
    name: '',
    city: '',
    address: ''
  }
  formRef = React.createRef();

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addShop(this.state);
    this.setState({
        name: '',
        city: '',
        address: ''
    });
    this.resetForm();
  }
  resetForm = () => {
    let formRef = this.formRef.current;
    formRef.resetValidationState(this.state.clearInputOnReset);
  }
  render() {
    return (
    <ValidationForm className="form" onSubmit={this.handleSubmit}  ref={this.formRef}>
        <FormGroup>
            <DebounceInput element={TextInput}
                    debounceTimeout={500}
                    name="name"
                    id="name"
                    type="text"
                    placeholder="name"
                    required
                    pattern=".{1,16}"
                    errorMessage={{
                        required: "Name is required",
                        pattern: "Name should be at maximum 16 characters long"
                    }}
                    value={this.state.name}
                    onChange={this.handleChange}
                />
        </FormGroup>
        <FormGroup>
            <DebounceInput element={TextInput}  
                    debounceTimeout={500}
                    name="city"
                    id="city" 
                    type="text"                       
                    placeholder="city"
                    required
                    pattern=".{1,16}"
                    errorMessage={{
                        required: "City is required",
                        pattern: "City should be at maximum 16 characters long"
                    }}
                    value={this.state.city}
                    onChange={this.handleChange}
                    />
        </FormGroup>
        <FormGroup>
            <DebounceInput element={TextInput}
                    debounceTimeout={500}
                    name="address"
                    type="text" 
                    id="address"
                    placeholder="address"
                    pattern=".{0,16}"
                    errorMessage={{
                        pattern: "Address should be at maximum 16 characters long"
                    }}
                    value={this.state.address}
                    onChange={this.handleChange}
                    />
        </FormGroup>
        <Button outline color="success">Add</Button>
    </ValidationForm>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addShop: (shop) => dispatch(addShop(shop))
  }
}

export default connect(null, mapDispatchToProps)(AddShop)
