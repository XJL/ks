import React, { Component } from 'react';
import {Image} from 'react-native';

import {styles} from '../styles/pages/SplashScreen.style';
import {AppImage} from '../resource/AppImage';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(()=>this.jump(), 3000);
    }

    jump() {
        this.props.navigator.replace({
            location: "/user"
        })
    }

    render() {
        return <Image style={styles.container} source={AppImage.bg}/>
    }
}