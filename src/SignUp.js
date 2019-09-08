import React from "react";
import Script from "react-load-script";
import PropTypes from "prop-types";
import axios from "axios";
import ImageUploader from 'react-images-upload';
import "./styles.css";


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
    "avatar": "",
		"name": "",
		"email": "",
		"password": "",
		"passwordConfirmation": "",
    "avatar": "default-image.jpeg"

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    fileChangedHandler = event => {
  this.setState({ selectedFile: event.target.files[0] })
}

uploadHandler = () => {
  console.log(this.state.selectedFile)
}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('https://meet-in-the-middle-backend-api.herokuapp.com/users', { user: this.state })
    .then(response => {
      console.log("yay");
    	console.log(response)
    })
    .catch(error => {
      console.log("nooo");
        console.log(error.response)
    });
  }


  render() {
  return (
    <div className="signUpContainer">
      <form
        onSubmit={e => {
          this.onSubmit(e);
        }}
      >

    <center> <div className="signUpForm">
      <img className="formLogo" src="midl-logo.png" />
        <div className="formHeading">
          Create your meet in the midl account
        </div>
        <img className="signUpAvatar" src={this.state.avatar}/>



        <input className="selectAvatar" type="file" onChange={this.fileChangedHandler}/>
        <input className="uploadAvatarButton" value="Upload" onClick={this.uploadHandler}/>

          <center><input
            className="formFillIn"
            id="user_name"
            type="text"
            name="name"
            placeholder={"Name"}
            value={this.state.name}
            onChange={this.onChange}
          /></center>
            <input
              className="formFillIn"
              id="user_email"
              type="text"
              placeholder={"Email address"}
              name="email"
              value={this.state.email}
              onChange={this.onChange}

            />
              <div className="passwordInfo" > Password must be at least 6 letters </div>
              <input
                className="formFillIn"
                id="user_password"
                type="password"
                placeholder={"Password"}
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
                <input
                  className="formFillIn"
                  id="user_password_confirmation"
                  type="password"
                  name="passwordConfirmation"
                  placeholder={"Confirm password"}
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                />
              <input
                id="sign_up_button"
                className="enterButton"
                type="submit"
                value="Sign up"
              />
            </div> </center>
        </form>
      </div>
    );
  }
}

export default SignUp;
