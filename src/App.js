import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import { useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Lobby from "./pages/Lobby"
import Room from "./pages/Room"

const auth = getAuth()

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [firstStateChange, setFirstStateChange] = useState(false)

  onAuthStateChanged(auth, user => {
    if (user) setLoggedIn(true)
    else setLoggedIn(false)
    if (!firstStateChange) setFirstStateChange(true)
  })

  return (
    !firstStateChange ? <></> :
      <Router>
        <Switch>
          <Route path="/lobby" exact>
            {loggedIn ? <Lobby /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/lobby/:roomCode">
            {loggedIn ? <Room /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/signin">
            {loggedIn ? <Redirect to="/lobby" /> : <SignIn />}
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
  )
}