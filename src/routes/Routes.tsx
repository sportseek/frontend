import React from "react"
import { Route, Switch, Redirect, RouteComponentProps } from "react-router-dom"
import {
  SignIn,
  MainLayout,
  MainLayoutType,
  getPages,
  PageDataType,
  SignUp,
} from "pages"
import { useAppSelector } from "redux/hooks"
import {
  isIfAuthenticated,
  selectUserType,
} from "redux/reducers/auth/authSlice"

const childRoutes = (
  valid: boolean,
  Layout: MainLayoutType,
  routes: PageDataType[]
) =>
  routes.map(({ id, path, Component }) => (
    <Route
      key={id}
      path={path}
      exact
      render={(props: RouteComponentProps) =>
        valid ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to={{ pathname: "/signin" }} />
        )
      }
    />
  ))

const Routes = () => {
  const userType = useAppSelector(selectUserType)
  const isAuthenticated = useAppSelector(isIfAuthenticated)

  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/home" />} />
      {childRoutes(
        isAuthenticated,
        MainLayout as MainLayoutType,
        getPages(userType)
      )}
      <Route path="/signin" render={() => <SignIn />} />
      <Route path="/signup" render={() => <SignUp />} />
    </Switch>
  )
}

export default Routes
