import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect, Link } from 'react-router-dom'
import '../../stylesheets/auth.scss'
import { ValidationForm, TextInput, TextInputGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { FaEye } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { DebounceInput } from 'react-debounce-input';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'; 
import messages from '../../en.messages';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    type: 'password'
  }
  
  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired
    }),
    authError: PropTypes.any,
    signIn: PropTypes.func.isRequired
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  showhidepass = (e) => {
    this.state.type === 'password' ? this.setState({type: 'text'}) : this.setState({type: 'password'})
  }

  render() {
    console.log(this.props);
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="loginContainer">
       <div className="formSignIn">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="title">{messages.login}</div>
          <ValidationForm onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label className="lebel" htmlFor="email">{messages.email}</label>
                <DebounceInput element={TextInput}
                    debounceTimeout={500}
                    name="email"
                    id="email"
                    type="email"
                    validator={validator.isEmail}
                    errorMessage={{ validator: "Please enter a valid email" }}
                    value={this.state.email}
                    onChange={this.handleChange}
                    autoFocus               
                />
            </div>
            <div className="form-group">
                <label className="lebel" htmlFor="password">{messages.password}</label>
                <DebounceInput element={TextInputGroup}
                    debounceTimeout={500}
                    name="password"
                    id="password"
                    type={this.state.type}
                    required
                    pattern=".{6,}"
                    errorMessage={{
                        required: "Password is required",
                        pattern: "Password should be at least 6 characters long"
                    }}
                    value={this.state.password}
                    onChange={this.handleChange}
                    append={<div id="eye" onClick={this.showhidepass}><FaEye /></div>}
                />
            </div>
            <div id="wrongUser">
                { authError ? <p>{authError}</p> : null }
            </div>
            <div className="form-group" id="btn">
              <Button className="btnSignIn" size="lg" block color="info">{messages.submit}</Button>
            </div>
            <Link className="forgotPassword" to="/forgotPassword">{messages.forgotPassword}</Link>
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
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
