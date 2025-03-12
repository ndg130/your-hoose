import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';  // Import PropTypes
import { useAuth } from '../context/authContext';  // Import the useAuth hook

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();  // Get user state from context

  return (
    <Route
      {...rest}  // Spread other props, like path="/admin/dashboard"
      render={props =>
        user ? (  // If user is logged in, render the component
          <Component {...props} />
        ) : (  // If not logged in, redirect to login
          <Redirect to="/login" />
        )
      }
    />
  );
};

// Add PropTypes validation
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,  // `component` must be a React component (e.g. Dashboard)
  rest: PropTypes.object,  // `rest` will be the other props passed to the Route component, e.g., `path`
};

export default PrivateRoute;