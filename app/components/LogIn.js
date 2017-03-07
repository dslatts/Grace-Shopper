import React from 'react';
import Dialog from 'material-ui/Dialog';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { addUser } from '../actions/users'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 20,
    fontWeight: 400,
  },
  form: {
    width: '50%',
    margin: '0 auto',
  },
  input: {
    outline: 'none',
    display: 'block',
    width: '100%',
    padding: 7,
    border: 'none',
    borderBottom: '1px solid #ddd',
    background: 'transparent',
    marginBottom: 10,
    font: '16px Arial, Helvetica, sans-serif',
    height: 45
  },
  oAuth: {
    marginRight: 12
  }
};


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  LoginUser (event) {
    const { user } = this.props;
    event.preventDefault();
    addUser(user);
  }

  render() {
    const actions = [
      <RaisedButton
        label="join with Google"
        href="/api/auth/google"
        primary={true}
        style={styles.oAuth}
      >
        <i className="fa fa-google" />
      </RaisedButton>,
      <RaisedButton
        label="join with Twitter"
        href="/api/auth/twitter"
        primary={true}
        style={styles.oAuth}
      >
        <i className="fa fa-twitter" />
      </RaisedButton>,
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.loginSubmit}
      />
    ];

    return (
      <div>
        <RaisedButton label="Sign In/ Register" onTouchTap={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Tabs>
            <Tab label="Sign In">
              <div style={styles.form}>
                <h2 style={styles.headline}>Already Have An Account?</h2>
                <form action="">
                  
                  <input style={styles.input} type="text" placeholder="Email" />
                  <input style={styles.input} type="text" placeholder="Password" />
                </form>
              </div>
            </Tab>
            <Tab label = "Register">
              <div style={styles.form}>
                <h2 style={styles.headline}>New to AlchemEtsy?</h2>
                <form action="">
                  <input style={styles.input} type="text" name="first" placeholder="First Name" />
                  <input style={styles.input} type="text" name="last" placeholder="Last Name" />
                  <input style={styles.input} type="email" name="field2" placeholder="Email" />
                  <input style={styles.input} type="password" name="psw" placeholder="Password" />
                  <input style={styles.input} type="password" name="psw" placeholder="Re-enter Password" />
                </form>
              </div>
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    this.props.login(credentials);
  }
}