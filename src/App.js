import React, {Component} from 'react';
import {View, Text, StatusBar, Platform} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import { Provider } from 'react-redux';
import store from './modules/redux/store';
import Page from './modules/navigation/Page';
import NavigatorProvider from './modules/navigation/NavigatorProvider';
import BackManager from './modules/BackManager';

const INITIAL_ROUTE = {
    location: '/',
};

function initSceneConfig() {
    const base = Navigator.SceneConfigs.HorizontalSwipeJump;
    return {
        ...base,
        gestures: null,
    }
}

const sceneConfig = initSceneConfig();

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // 初始化物理返回键的事件监听
        BackManager.init({navigator: this.refs.navigator});
    }
    configureScene = route => {
        if (route.configure) {
            return route.configure;
        }
        return sceneConfig;
    };
    renderScene = (route, navigator) => (
        <NavigatorProvider navigator={navigator}>
            <Page extraParams={route.extraParams} location={route.location} navigator={navigator} alertBox={this.alertBox}/>
        </NavigatorProvider>
    );
    render() {
        return (
            <View style={{flex: 1}}>
                <Provider store={store} key="provider">
                    <Navigator
                        ref="navigator"
                        initialRoute={INITIAL_ROUTE}
                        configureScene={this.configureScene}
                        renderScene={this.renderScene}
                    />
                </Provider>
            </View>
        );
    }
}
