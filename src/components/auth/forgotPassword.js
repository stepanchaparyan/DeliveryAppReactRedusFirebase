import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../../store/actions/authActions';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import './auth.scss';
import logo from '../../assets/logo.png';
import SweetAlert from 'sweetalert2-react';
import 'sweetalert2/dist/sweetalert2.css';

class ForgotPasword extends Component {
    state = {
        email: ''
    }    
    
    handleChange = (e, value) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendEmail = (e) => {
        e.preventDefault();
        this.props.resetPassword(this.state.email);
        this.setState({ show: true });
    }

    render () {
        return (
        <div className="loginContainer">  
          <div className="formForgotPassword">          
            <div className="logo">
                <img src={logo} alt="Logo"/>
            </div>
            <div className="title">Forgot password</div>            
            <ValidationForm onSubmit={this.sendEmail}>
                <div className="form-group">
                    <label className="lebel" htmlFor="email">Enter your email to reset password</label>
                    <TextInput  name="email" 
                                id="email" 
                                type="email" 
                                validator={validator.isEmail} 
                                errorMessage={{validator:"Please enter a valid email"}}
                                value={this.state.email}
                                onChange={this.handleChange}
                    />
                </div>
                <SweetAlert
                    show={this.state.show}
                    title="GOOD!"            
                    text="Please check your email"
                    onConfirm={() => this.setState({ show: false })}
                />
                <div className="form-group" id="btn">
                    <button className="btn btn-success btn-lg btn-block">Send</button>
                </div>
                </ValidationForm>
          </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
   return{
     authError: state.auth.authError,
     auth: state.firebase.auth
   }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
     resetPassword: (email) => dispatch(resetPassword(email))
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasword);