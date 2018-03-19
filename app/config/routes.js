import SignInScreen from '../components/SignInScreen'
import Friends from '../components/Friends'
import SplashScreen from '../components/SplashScreen'
import ReduxScreen from '../components/ReduxScreen'

import Drawer from './drawer_routs'

const Stack = {
  Splash: { screen: SplashScreen },
  SignIn: { screen: SignInScreen },
  Friends: { screen: Friends },
}

const Routs = {
  ...Stack,
  Drawer: { screen: Drawer }
}

export default Routs
