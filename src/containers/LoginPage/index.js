import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import styles from './styles.module.css';
import { withFirebase } from '../../components/Firebase/firebase';
import TextInput from '../../components/TextInput';
import { isAuthenticated, signToken } from '../../components/JWT/utils';

const TOKEN_NAME = 'jwt-token';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    };

    this.firebase = props.firebase;
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoggedIn: isAuthenticated() });
  }

  onSubmit(e) {
    e.preventDefault();

    this.firebase.signInWithEmail(this.state.email, this.state.password, (res) => {
      if (!res.success) {
        // TODO(dpowers): better error handling
        console.error(res.err);
      } else {
        signToken(this.state.email, (err) => {
          if (err) {
            console.error(err);
          } else {
            this.props.history.push('/iloveyou');
          }
        });
      }
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/iloveyou" />
    }

    return (
      <div className={styles.container}>
        <form onSubmit={this.onSubmit} className={styles.form}>
          <div className={styles.header}>
            Hi love :)
          </div>
          <TextInput
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="email"
            type="text"
            width="80%"
          />
          <TextInput
            customStyle={{ marginTop: '15px' }}
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="password"
            type="password"
            width="80%"
          />
          <input 
            className={styles.button}
            type="submit"
            value="Login"
            tabIndex={0}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebase(LoginPage));