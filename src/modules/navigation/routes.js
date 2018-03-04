// 首页
import Login from '../../pages/Login';
import SplashScreen from '../../pages/SplashScreen';
import User from '../../pages/User';

module.exports = {
    path: '/',
    indexRoute: {
        component: Login,
    },
    childRoutes: [
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