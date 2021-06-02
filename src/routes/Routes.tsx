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
import { useAppSelector, useAppDispatch } from "redux/hooks"
import {
  isIfAuthenticated,
  selectUserType,
  setUser,
} from "redux/reducers/auth/authSlice"
import authService from "utils/services/authService"

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
  const dispatch = useAppDispatch()

  /** In case when the browser page reloads */
  React.useEffect(() => {
    if (!isAuthenticated && authService.isAuthenticated()) {
      const id = authService.getCurrentUserId()
      const type = authService.getCurrentUserType()
      dispatch(setUser({ id, type }))
    }
  }, [isAuthenticated])

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
