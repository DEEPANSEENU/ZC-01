import React from "react";
import "../styles/header.css";

import { GoogleLogin } from 'react-google-login';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: "",
      display: "none",
      loginModalIsOpen:false,
      isLoggedIn:false,
      loggedInUser:undefined
    };
  }

  componentDidMount() {
    const path = window.location.pathname;
    this.setAttributes(path);
  }

  setAttributes = (path) => {
    let bg, display;
    if (path === "/") {
      bg = "transparent";
      display = "none";
    } else {
      bg = "#ff0000";
      display = "inline-block";
    }
    this.setState({ backgroundColor: bg, display: display });
  };

  handleLogin=()=>{
      this.setState({loginModalIsOpen : true});
  }

  handleCancel=()=>{
    this.setState({loginModalIsOpen : false});
}

responseGoogle = (response) => {
  // Handle Google login response here

  this.setState({isLoggedIn:true,loggedInUser:""});
  //this.setState({ loginModalIsOpen: false });
}

handleLogout=()=>{
  this.setState({isLoggedIn:false,loggedInUser:undefined});
}


  render() {
    const { backgroundColor, display, loginModalIsOpen, isLoggedIn, loggedInUser} = this.state;
    return (
      <div className="header" style={{ backgroundColor: backgroundColor }}>
        <div className="header-logo" style={{ display: display }}>
          <p>e!</p>
        </div>
        {!isLoggedIn ?
        <div className="user-account">
          <div className="login" onClick={this.handleLogin} style={{ marginLeft: "auto" }}>Login</div>
          <div className="signup" style={{ marginLeft: "auto" }}>Create an account</div>
        </div>
      :   <div className="user-account">
          <div className="login" style={{ marginLeft: "auto" }} >{loggedInUser}</div>
          <div className="signup" style={{ marginLeft: "auto" }} onClick={this.handleLogout}>Logout</div>
        </div>}
        <Modal
            isOpen={loginModalIsOpen} 
            style={customStyles}>
            <div>
            <h2>Login</h2>
            <input type="text" placeholder='Email' /> <br />
            <input type="text" placeholder='Password' />
            <div>
            <button>Login</button>
            <button onClick={this.handleCancel}>Cancel</button>
            </div>    
        <GoogleLogin
          clientId="485459684317-ci1q82s4e0sf2jrst0qvfl1jsi4pqgti.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
            </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
