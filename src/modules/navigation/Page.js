import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {match} from 'react-router';
import routesConfig from './routes';

export default class Page extends React.Component {
    static propTypes = {
        location: PropTypes.string,
        extraParams: PropTypes.object,
    };
    state = {};
    componentWillMount() {
        this.doMatch();
    }
    componentWillReceiveProps() {
        this.doMatch();
    }
    doMatch() {
        if (__DEV__) {
            console.log('Current location:', this.props.location);
        }
        match({
            location: this.props.location,
            routes: routesConfig,
        }, (err, redirectLocation, renderProps) => {
            this.setState({ routerState: renderProps });
        });
    }
    render() {
        if (this.state.routerState) {
            const {
                routes,
                params,
            } = this.state.routerState;
            return routes.reduceRight((children, route) => {
                const Component = route.component;
                return Component ? (
                    <Component
                        route={route}
                        extraParams={this.props.extraParams || {}}
                        navigator={this.props.navigator}
                        alertBox={this.props.alertBox}
                        params={params}
                    >
                        {children}
                    </Component>
                ) : children;
            }, undefined);
        }
        return <View />;
    }
}
