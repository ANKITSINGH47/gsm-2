import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class CreateTasksContentMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bounds: null,
            markers: [],
            activeMarkerInfo: null,
            activeMarker: null,
            isInfoWindowOpen: false,
        }
    }

    componentDidUpdate (prevProps) {
        const { locations } = this.props;
        if (locations.length && prevProps.locations !== locations) {
            const bounds = new this.props.google.maps.LatLngBounds();
            const markers = [];
            console.log('locations', locations);
            locations.map((locationItem, i) => {
                if (locationItem.location) {
                    const location = {
                        lat: locationItem.location.coordinates[1],
                        lng: locationItem.location.coordinates[0],
                    };
                    // extend the view, so that all markers are visible
                    bounds.extend(location);
                    markers.push(
                        <Marker
                            onClick={(props, marker) => {
                                this.setState({
                                    activeMarker: marker,
                                    activeMarkerInfo: {
                                        raw_address: locationItem.raw_address
                                    },
                                    isInfoWindowOpen: true,
                                });
                            }}
                            key={i}
                            position={location}
                            name={locationItem.raw_address}
                        />
                    );
                }
            });
            this.setState({ markers });
            if (!this.state.bounds) {
                this.setState({ bounds });
            }
        }
    }

    render () {

        const { bounds, markers, isInfoWindowOpen, activeMarker, activeMarkerInfo } = this.state;

        return (
            <div className="create-tasks-content-map">
                <Map
                    google={this.props.google}
                    bounds={bounds}
                    onClick={() => {
                        this.setState({
                            isInfoWindowOpen: false,
                            activeMarkerInfo: null,
                        });
                    }}
                >
                    {markers}
                    <InfoWindow
                        visible={isInfoWindowOpen}
                        onClose={() => this.setState({ isInfoWindowOpen: false, })}
                        marker={activeMarker}
                    >
                        <div className="map-infowindow">
                            <span className="address">
                                {activeMarkerInfo && activeMarkerInfo.raw_address}
                            </span>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('XXXXXXXXXXXXXXXX'),
})(CreateTasksContentMap);
