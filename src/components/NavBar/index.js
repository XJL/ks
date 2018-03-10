import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NavigationBar from 'react-native-navbar';
import {styles} from './style';

const propTypes = {
    title: PropTypes.string,
    leftText: PropTypes.string,
    leftFunc: PropTypes.func,
    rightText: PropTypes.string,
    rightFunc: PropTypes.func,
};

const defaultProps = {
    title: "",
    leftText: "",
    leftFunc: ()=>{},
    rightText: "",
    rightFunc: ()=>{},
};

export default class NavBar extends Component {
    render() {
        return (
            <NavigationBar
                style={styles.navbar}
                title={{
                    title: this.props.title, 
                    tintColor: "#ffffff",
                    style: styles.title
                }}
                statusBar={{hidden: true}} // ios的状态栏才有效
                leftButton={{
                    title: this.props.leftText,
                    handler: ()=>this.props.leftFunc(),
                    tintColor: "#ffffff",
                    style: styles.btn_text
                }}
                rightButton={{
                    title: this.props.rightText,
                    handler: ()=>this.props.rightFunc(),
                    tintColor: "#ffffff",
                    style: styles.btn_text
                }}
            />
        );
    }
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;