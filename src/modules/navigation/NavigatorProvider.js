/**
 * Created by LzxHahaha on 2016/1/28.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

export default class NavigatorProvider extends React.Component {
  static childContextTypes = {
    navigator: PropTypes.object
  };

  getChildContext() {
    return {
      navigator: this.props.navigator
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.children}
      </View>
    );
  }
}
