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
                title={{title: this.props.title}}
                statusBar={{hidden: true}} // ios的状态栏才有效
                leftButton={{
                    title: this.props.leftText,
                    handler: ()=>this.props.leftFunc(),
                    tintColor: "#666666",
                    style:{width: 50,alignItems: 'center'}
                }}
                rightButton={{
                    title: this.props.rightText,
                    handler: ()=>this.props.rightFunc(),
                    tintColor: "#666666",
                    style:{width: 50, alignItems: 'center'}
                }}
            />
        );
    }
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;