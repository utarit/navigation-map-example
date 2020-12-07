/*
    Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.

    Licensed under the Apache License, Version 2.0 (the "License")
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  StatusBar,
  Button,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';

import HMSMap, {
  Circle,
  Marker,
  Polygon,
  Polyline,
  GroundOverlay,
  TileOverlay,
  InfoWindow,
  MapTypes,
  PatternItemTypes,
  JointTypes,
  CapTypes,
  FillMode,
  Interpolator,
  RepeatMode,
} from '@hmscore/react-native-hms-map';

// import mapStyleJson from './mapStyle.json';

const base64String = 'data:image/png;base64,';
let mapView;
let markerView;
let tileOverlayView;

const takeSnapshot = () => mapView.takeSnapshot();

const setCameraPosition = (lat, lng, zoom, tilt, bearing) => {
  console.log(lat, lng);
  mapView &&
    mapView.setCameraPosition({
      target: {latitude: lat, longitude: lng},
      zoom: zoom,
      tilt: tilt,
      bearing: bearing,
    });
};
const updateCamera = () => {
  /*
   * These functions can be used for camera update
   *  mapView.zoomIn();
   *  mapView.zoomOut();
   *  mapView.zoomTo(10.5);
   *  mapView.zoomBy(-1.5);
   *  mapView.zoomBy(2, {x: 0, y: 0});
   *  mapView.scrollBy(100, 100);
   *  mapView.setBounds([{latitude: 41.5, longitude: 28.5},{latitude: 40.5, longitude: 29.5}],1);
   *  mapView.setCameraPosition({target: {latitude: 41, longitude: 29}, zoom:13, tilt:40});
   */
  mapView.setCoordinates({latitude: 41, longitude: 29}, 12);
};
const getHuaweiMapInfo = () =>
  mapView &&
  mapView
    .getHuaweiMapInfo()
    .then((a) => console.log(a.visibleRegion))
    .catch((a) => console.log(a));

const clearMap = () => mapView && mapView.clear();

const getLayerOptionsInfo = () =>
  mapView &&
  markerView &&
  mapView
    .getLayerOptionsInfo(markerView)
    .then((a) => console.log(a))
    .catch((e) => console.log(e));

const getLayerInfo = () =>
  mapView &&
  markerView &&
  mapView
    .getLayerInfo(markerView)
    .then((a) => console.log(a))
    .catch((e) => console.log(e));

const showInfoWindow = () => markerView && markerView.showInfoWindow();

const hideInfoWindow = () => markerView && markerView.hideInfoWindow();

const getCoordinateFromPoint = () =>
  mapView &&
  mapView
    .getCoordinateFromPoint({x: 100, y: 100})
    .then((a) => console.log(a))
    .catch((a) => console.log(a));

const getPointFromCoordinate = () =>
  mapView &&
  mapView
    .getPointFromCoordinate({latitude: 0, longitude: 0})
    .then((a) => console.log(a))
    .catch((a) => console.log(a));

const stopAnimation = () => mapView.stopAnimation();

const animateMarker = () => {
  console.log('Animation Button');
  if (markerView) {
    markerView.setAnimation(
      {
        rotate: {fromDegree: 0, toDegree: 250, duration: 5000},
        alpha: {fromAlpha: 0.5, toAlpha: 1},
        scale: {
          fromX: 1,
          fromY: 1,
          toX: 3,
          toY: 3,
          duration: 6000,
          fillMode: FillMode.FORWARDS,
        },
        translate: {
          latitude: 4.196762137072112,
          longitude: 15.686358445008585,
          duration: 1000,
          fillMode: FillMode.BACKWARDS,
          interpolator: Interpolator.BOUNCE,
          repeatCount: 3,
        },
      },
      {duration: 2000, repeatMode: RepeatMode.REVERSE},
    );
    markerView.startAnimation();
  }
};

const calculateDistance = () => {
  HMSMap.module
    .getDistance({latitude: 41, longitude: 29}, {latitude: 41, longitude: 28})
    .then((a) => console.log(a))
    .catch((a) => console.log(a));
};

const resetMinMaxZoomPreference = () =>
  mapView && mapView.resetMinMaxZoomPreference();

const clearTileCache = () =>
  tileOverlayView && tileOverlayView.clearTileCache();

const enableLogger = () =>
  HMSMap.module.enableLogger().then(() => console.log('Logger enabled'));

const disableLogger = () =>
  HMSMap.module.disableLogger().then(() => console.log('Logger disabled'));

const getDefaultState = () => ({
  zoom: 3,
  lat: 0.0,
  lng: 0.0,
  bearing: 0.0,
  tilt: 0.0,
  compassEnabled: true,
  mapType: 1, // Just use normal(1) and empty(0) m,
  minZoomPreference: 3,
  maxZoomPreference: 20,
  rotateGesturesEnabled: true,
  scrollGesturesEnabled: true,
  tiltGesturesEnabled: true,
  zoomControlsEnabled: true,
  zoomGesturesEnabled: true,
  myLocationEnabled: false,
  myLocationButtonEnabled: false,
  markerClustering: false,
  scrollGesturesEnabledDuringRotateOrZoom: true,
  stylingMap: false,
  useAnimation: true,
  markerCol: 2,
  markerRow: 5,
  showTileOvelay: false,
  pixel: 100,
  showSnapshot: false,
  snapshotString: base64String,
  isDefaultAction: true,
});

const CircleComplex = () => (
  <Circle
    center={{latitude: 10, longitude: 0}}
    radius={900000}
    clickable={true}
    fillColor={538066306} // transparent blue(0x20123D82)
    strokeWidth={10}
    strokeColor={-256} // yellow(0xFFFFFF00)
    strokePattern={[
      {type: PatternItemTypes.DASH, length: 20},
      {type: PatternItemTypes.DOT},
      {type: PatternItemTypes.GAP, length: 20},
    ]}
    visible={true}
    zIndex={2}
    onClick={(e) => console.log('Circle onClick')}
  />
);

const PolygonComplex = () => (
  <Polygon
    points={[
      {latitude: 10.5, longitude: 18.5},
      {latitude: 0.5, longitude: 18.5},
      {latitude: 0.5, longitude: 9.5},
      {latitude: 10.5, longitude: 9.5},
    ]}
    holes={[
      [
        {latitude: 5.5, longitude: 13.5},
        {latitude: 3.5, longitude: 13.5},
        {latitude: 3.5, longitude: 15.5},
      ],
      [
        {latitude: 6.5, longitude: 18.0},
        {latitude: 8.5, longitude: 18.0},
        {latitude: 8.5, longitude: 16.5},
      ],
    ]}
    clickable={true}
    geodesic={true}
    fillColor={538066306} // transparent blue(0x20123D82)
    strokeColor={-256} // yellow(0xFFFFFF00)
    strokeJointType={JointTypes.BEVEL}
    strokePattern={[
      {type: PatternItemTypes.DASH, length: 20},
      {type: PatternItemTypes.DOT},
      {type: PatternItemTypes.GAP, length: 20},
    ]}
    zIndex={2}
    onClick={(e) => console.log('Polygon onClick')}
  />
);
const PolylineComplex = () => (
  <Polyline
    points={[
      {latitude: -10, longitude: -10},
      {latitude: -15, longitude: -10},
      {latitude: -10, longitude: -15},
    ]}
    clickable={true}
    geodesic={true}
    color={538066306} // transparent blue(0x20123D82)
    jointType={JointTypes.BEVEL}
    pattern={[{type: PatternItemTypes.DASH, length: 20}]}
    startCap={{type: CapTypes.ROUND}}
    endCap={{
      type: CapTypes.CUSTOM,
      refWidth: 1000,
      asset: 'ic_launcher.png', // under assets folder
    }}
    visible={true}
    width={20.0}
    zIndex={2}
    onClick={(e) => console.log('Polyline onClick')}
  />
);

const GroundOverlaySimple = () => (
  <GroundOverlay
    image={{
      // hue: 30.0,
      asset: 'ic_launcher.png', // under assets folder
      // path on the device
      // path:
      //   "/data/data/com.huawei.rnhmsmapdemo/files/map-style/img/native_dianhua_dire_arrow.png",
      // file: 'filename',
    }}
    coordinate={[
      {latitude: -10, longitude: 10},
      {latitude: -10, longitude: 20},
      {latitude: -25, longitude: 10},
    ]}
  />
);

const GroundOverlayComplex = () => (
  <GroundOverlay
    image={{
      asset: 'ic_launcher.png', // under assets folder
    }}
    coordinate={{latitude: 0, longitude: -10, height: 1000000, width: 1000000}}
    anchor={[0.5, 0.5]}
    bearing={220}
    clickable={true}
    transparency={0.5}
    visible={true}
    zIndex={3}
    onClick={(e) => console.log('GroundOverlay onClick e:', e.nativeEvent)}
  />
);
const MarkerComplex = (props) => (
  <Marker
    onAnimationStart={(e) =>
      console.log(`Animation ${e.nativeEvent.type} Started`)
    }
    onAnimationEnd={(e) =>
      console.log(
        `Animation ${e.nativeEvent.type} Ended in ${e.nativeEvent.duration} ms`,
      )
    }
    coordinate={{latitude: -10, longitude: 0}}
    draggable={true}
    flat={true}
    icon={{
      asset: 'ic_launcher.png', // under assets folder
    }}
    alpha={0.8}
    defaultActionOnClick={props.isDefaultAction}
    markerAnchor={[0.5, 0.5]}
    infoWindowAnchor={[0.5, 0.5]}
    rotation={30.0}
    visible={true}
    zIndex={0}
    clusterable={false}
    onClick={(e) => console.log('Marker onClick')}
    onDragStart={(e) => console.log('Marker onDragStart')}
    onDrag={(e) => console.log('Marker onDrag')}
    onDragEnd={(e) => console.log('Marker onDragEnd')}
    onInfoWindowClick={(e) => console.log('Marker onInfoWindowClick')}
    onInfoWindowClose={(e) => console.log('Marker onInfoWindowClose')}
    onInfoWindowLongClick={(e) => console.log('Marker onInfoWindowLongClick')}
    ref={(e) => {
      markerView = e;
    }}>
    <InfoWindow>
      <View style={{backgroundColor: 'transparent'}}>
        <View
          style={{
            backgroundColor: 'rgb(49,49,49)',
            borderRadius: 6,
            paddingHorizontal: 14,
            paddingVertical: 6,
          }}>
          <Text style={{color: '#fff', fontFamily: 'Muli', fontSize: 12}}>
            {' '}
            This is a custom window
          </Text>
        </View>
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 8,
            borderRightWidth: 8,
            borderBottomWidth: 16,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'rgb(49,49,49)',
            alignSelf: 'center',
            transform: [{rotate: '180deg'}],
          }}
        />
      </View>
    </InfoWindow>
  </Marker>
);

const MarkerSimple = (props) => (
  <Marker
    icon={{hue: (props.markerRow * props.col + props.row) * 30}}
    coordinate={{latitude: props.col, longitude: props.row}}
    title="Hello"
    snippet={'My lat:' + props.col + ' lon:' + props.row}
    clusterable={true}
  />
);

const TileOverlayComplex = (props) => (
  <TileOverlay
    tileProvider={{
      url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: [4, 5, 6],
    }}
    visible={props.showTileOvelay}
    fadeIn={false}
    zIndex={10}
    transparency={0.2}
    ref={(el) => (tileOverlayView = el)}
  />
);

class App extends React.Component {
  constructor() {
    super();
    this.state = getDefaultState();
  }

  render() {
    return (
      <SafeAreaView>
        <HMSMap
          style={styles.mapView}
          camera={{
            target: {latitude: 60.322308, longitude: 25.064569},
            zoom: 11,
            bearing: 5,
          }}
          compassEnabled={true}
          zoomControlsEnabled={true}
          mapType={MapTypes.NORMAL}
          mapStyle={
            '[{"mapFeature":"all","options":"labels.icon","paint":{"icon-type":"night"}}]'
          }
          myLocationEnabled={true}
          myLocationButtonEnabled={true}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    height: '100%',
  },
});

// const styles = StyleSheet.create({
//   flexRow: {flexDirection: 'row'},
//   flexCol: {flexDirection: 'column'},
//   flex1: {flex: 1},
//   flex2: {flex: 2},
//   width30: {width: 30},
//   width40: {width: 40},
//   width100: {width: 100},
//   mapView: {height: 300, backgroundColor: 'red'},
//   snapView: {height: 200, backgroundColor: 'yellow'},
//   infoWindow: {backgroundColor: 'white', alignSelf: 'baseline'},
//   container: {flexDirection: 'column', alignSelf: 'flex-start'},
// });

export default App;
