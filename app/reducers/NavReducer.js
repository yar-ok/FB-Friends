import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../App';

const router = AppNavigator.router;
const startNavAction = router.getActionForPathAndParams('Splash');
const initialNavState = router.getStateForAction(startNavAction);

const NavReducer = (state = initialNavState, action) => {
    return router.getStateForAction(action, state);
};

export default NavReducer;
