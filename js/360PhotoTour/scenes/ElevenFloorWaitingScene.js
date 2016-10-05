/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';
import { polarToCartesian } from 'polarToCartesian';


var ElevenFloorMeetingScene = require('../scenes/ElevenFloorMeetingScene');
var ElevenFloorCommonScene = require('../scenes/ElevenFloorCommonScene');
var BackElement = require('../custom_controls/BackElement');
var PortalElement = require('../custom_controls/PortalElement');
var LoadingSpinner = require('../custom_controls/LoadingSpinner');

import {
    StyleSheet,
    ViroScene,
    ViroLight,
    Viro360Photo,
    ViroImageCard,
    Materials,
    ViroView,
    ViroAnimations,
    ViroAnimatedComponent,
} from 'react-viro';
var MAINCARD_REF = 'maincard';

var ElevenFloorWaitingScene = React.createClass({
  getInitialState() {
    return {
        showSceneItems:false,
    };
  },
  render: function() {
    return (
        <ViroScene style={styles.container} >
            <ViroLight type="omni" position={[0, 0, 0]} color="#ffffff"
                     attenuationStartDistance={40} attenuationEndDistance={50}
                     spotInnerAngle={0} spotOuterAngle={20} />
            <LoadingSpinner visible={!this.state.showSceneItems} position={polarToCartesian([-5, 93, -3])}/>
            <ViroView visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                <ViroAnimatedComponent animation="fadeIn" runOnMount={false} loop={false} ref={MAINCARD_REF}>
                    <ViroView opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                        <Viro360Photo source={require('../img/wework_11th_waiting.jpg')}  onLoadEnd={this._onLoadEnd} />
                        <PortalElement  iconOffset={0.70} sceneLength={1} sceneText="Meeting Room" position={[0, 0, -5]} jumpToScene={ElevenFloorMeetingScene} sceneNavigator={this.props.sceneNavigator}/>
                        <PortalElement  iconOffset={0.72} sceneLength={1} sceneText="Main Commons" position={[0, 0, 5]} jumpToScene={ElevenFloorCommonScene} sceneNavigator={this.props.sceneNavigator}/>
                        <BackElement sceneNavigator={this.props.sceneNavigator}/>
                    </ViroView>
                </ViroAnimatedComponent>
            </ViroView>
        </ViroScene>
    );
  },
    _onLoadEnd(){
        if (this.state.showSceneItems != true) {
            this.setState({
                showSceneItems: true,
            });
            this.refs[MAINCARD_REF].startAnimation();
        }
    },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = ElevenFloorWaitingScene;
