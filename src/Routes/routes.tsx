/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-types */
import AuthService from "Http/Services/AuthService";
import IRouteModel, { IProtectedRouteModel } from "Models/IRouteModel";
import React from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Redirect, useHistory } from "react-router";
import config from "./config";
import { PersistUser } from "Http/Redux/Actions/AuthAction";

interface IRoute {
  auth?: any;
  PersistUser: Function;
}

const ProtectedRoute = ({
  component: Component,
  PersistUser: PersistUser,
  ...params
}: IProtectedRouteModel) => {
  return (
    <Route
      {...params}
      render={(routeProps: any) => {
        const authenticatedUser = AuthService.GetLoggedInUser(); //pending when authentication is set
        if (!authenticatedUser) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { referrer: routeProps.location },
              }}
            />
          );
        }

        return <Component {...routeProps} />;
      }}
    />
  );
};

const Routes: React.FunctionComponent<IRoute> = (properties: IRoute) => {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        {config.map((route: IRouteModel, i) => {
          const { component: Component, ...params } = route;
          if (route.auth) {
            return (
              <ProtectedRoute
                component={Component}
                key={i}
                PersistUser={properties.PersistUser}
                {...params}
              />
            );
          } else {
            return (
              <Route
                key={i}
                {...params}
                render={(routeProps: any) => <Component {...routeProps} />}
              />
            );
          }
        })}
      </Switch>
    </Router>
  );
};

Routes.defaultProps = {
  auth: undefined,
};
const mapStateToProps = (state: any) => ({ auth: state.auth });

export default connect(mapStateToProps, { PersistUser })(Routes);
