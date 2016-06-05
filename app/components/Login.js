import * as React from 'react';
import {Component} from 'react';
import {TextField, RaisedButton} from 'material-ui';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'username') {
      this.setState({username: event.target.value})
    } if (event.target.id === 'password') {
      this.setState({password: event.target.value})
    }
  }

  login(e) {
    e.preventDefault();
    /*
    Auth.login(this.state.user, this.state.password)
      .catch(err => {
        window.console.error('Error logging in', err);
      });
      */
  }

  render() {
    return (
      <div style={{textAlign:'center'}}>
        <form role='form' noValidate>
          <div className='form-group'>
            <div>
              <TextField
                id='username'
                hintText='Username...'
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                id='password'
                hintText='Password...'
                type='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <RaisedButton
            type='submit'
            primary={true}
            onClick={this.login}
            label='Login'
          />
        </form>
      </div>
    );
  }
}

export default Login;
