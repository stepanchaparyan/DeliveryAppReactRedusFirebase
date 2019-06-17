import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProduct } from '../../store/actions/productActions'
import { Button, FormGroup } from 'reactstrap';
import './addProduct.scss';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { DebounceInput } from 'react-debounce-input';

class AddProduct extends Component {
  state = {
    name: '',
    price: '',
    quantity: ''
  }
  formRef = React.createRef();

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addProduct(this.state);
    this.setState({
        name: '',
        price: '',
        quantity: ''
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
                    pattern=".{1,24}"
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
                    name="price"
                    id="price" 
                    type="number"                       
                    placeholder="price"
                    required
                    pattern=".{1,16}"
                    errorMessage={{
                        required: "Price is required",
                        pattern: "Price should be at maximum 16 characters long"
                    }}
                    value={this.state.price}
                    onChange={this.handleChange}
                    />
        </FormGroup>       
        <FormGroup>
            <DebounceInput element={TextInput}  
                    debounceTimeout={500}
                    name="quantity"
                    id="quantity" 
                    type="number"                       
                    placeholder="quantity"
                    required
                    pattern=".{1,16}"
                    errorMessage={{
                        required: "Quantity is required",
                        pattern: "Quantity should be at maximum 16 characters long"
                    }}
                    value={this.state.quantity}
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
    addProduct: (product) => dispatch(addProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
