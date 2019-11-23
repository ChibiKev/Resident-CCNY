import React from 'react';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '45%',
  height: '90%'
};

export class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  displayMarkers = () => {
    return this.state.locations.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
     }}
      onClick={this.onMarkerClick} 
      name = {store.name}
      address = {store.address}
      />
    })
  }

  render() {
    return (
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
            <p> City College of New York Offers Dorms </p>
            <Map
                google={this.props.google} // Google Maps
                style={mapStyles} // Sizing of Map
                zoom={17} // How Far We Zoom For Google Map
                initialCenter={{ // Starting Location (Manhattan)
                lat: 40.814702,
                lng: -73.950881
                }}
                onClick={this.onMapClicked} // Clickable Map
            >
            <Marker
                name = {'The Towers at CCNY'}
                position={{lat: 40.814702, lng: -73.950881}}
                address = {'401 W 130th St, New York, 10027'} 
                onClick ={this.onMarkerClick} />
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                <div>
                    <p><b>Name: </b>{this.state.selectedPlace.name}</p>
                    <hr/>
                    <p><b>Location: </b>{this.state.selectedPlace.address}</p>
                </div>
            </InfoWindow>
          </Map>
        </div>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCw1Cu5QmZqsFLWq-D7m12E3Qqjjj13xWY'
})(InfoPage);
