// 首页
import Login from '../../pages/Login';
import SplashScreen from '../../pages/SplashScreen';
import User from '../../pages/User';
import Register from '../../pages/Register';
import Reset from '../../pages/Reset';

module.exports = {
    path: '/',
    indexRoute: {
        component: Login,
    },
    childRoutes: [
        {
            component: Register,
            path: '/register'
        },
        {
            component: Reset,
            path: '/reset'
        },
        {
            component: SplashScreen,
            path: '/splashScreen'
        },
        {
            component: User,
            path: '/user'
        }
    ]
}