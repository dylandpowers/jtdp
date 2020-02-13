import React from 'react';
import { isAuthenticated } from '../components/JWT/utils';
import { Route, Redirect, withRouter } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAccess: false,
      isLoaded: false
    };

    this.checkAccess = this.checkAccess.bind(this);
  }

  componentDidMount() {
    this.checkAccess();
  }

  checkAccess = () => {
    const isUserAuthenticated = isAuthenticated();
    this.setState({
      hasAccess: isUserAuthenticated,
      isLoaded: true
    });
  };

  render() {
    if (!this.state.isLoaded) {
      return null;
    }

    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) => {
          return this.state.hasAccess ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
    );
  }
}

export default withRouter(ProtectedRoute);