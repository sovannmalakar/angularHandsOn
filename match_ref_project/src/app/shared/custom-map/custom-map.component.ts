import { Component, OnInit, ViewChild, AfterViewInit, Input, ElementRef } from '@angular/core';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig, MapComponent, InfoBoxComponent
} from 'angular-maps';
import { SessionService } from '../../core/services/session.service';
import { LoggedInUserModel } from '../../core/model/logged-in-user.model';
import { runInThisContext } from 'vm';

let markerData = [];
@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrls: ['./custom-map.component.scss']
})



export class CustomMapComponent implements  AfterViewInit , OnInit {
  @Input() markerData;
  currentUser: LoggedInUserModel;
  _markerTypeId = MarkerTypeId;
  _options: IMapOptions = {
    disableBirdseye: true,
    disableStreetside: true,
    navigationBarMode: 0,
    mapTypeId: 6,
    zoom: 19
  };

  _infoBox: InfoBoxComponent;

  _promise: Promise<any>;
  _map: any;

  _box: IBox = {
    maxLatitude: Math.max.apply(null , this.markerData ? this.markerData.map((f) => (f.latitude)) : [35]),
    maxLongitude: Math.max.apply(null , this.markerData ?  this.markerData.map((f) => (f.longitude)) : [-91]),
    minLatitude: Math.min.apply(null ,  this.markerData ?  this.markerData.map((f) => (f.latitude)) : [34]),
    minLongitude: Math.min.apply(null , this.markerData ?  this.markerData.map((f) => (f.longitude)) : [-93]),
  };

  private _iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.ScaledImageMarker,
    url: './assets/img/marker.png',
    scale : 0.05,
    markerOffsetRatio: { x: 0.5, y: 1},
  };

  private _iconInfo2: IMarkerIconInfo = {
    markerType: MarkerTypeId.ScaledImageMarker,
    url: './assets/img/marker.png',
    scale : 0.05,
    markerOffsetRatio: { x: 0.5, y: 1},
  };
  _markers: Array<any> = new Array<any>();
  _markers2: Array<any> = new Array<any>();
  _showInfoBox = false;

  @ViewChild('xmap')   _map1;


  constructor ( private sessionService: SessionService ) {
    // tslint:disable-next-line:max-line-length
  }

  _processMapPromise (promise: Promise<any>) {
    this._promise = promise;
    this._promise.then(x => {
        this._map = x;
        console.log('MapInstance available...');
    });
}

closeInfoBox () {
  this._infoBox.Close();
}

RepositionCardCenter (b , a) {
}


ShowCard (a , b) {
  this._showInfoBox = true;
}

HideCard() {
  this._showInfoBox = false;
}

  ngOnInit() {
    this._box = {
      maxLatitude: Math.max.apply(null , this.markerData ? this.markerData.map((f) => (f.latitude)) : [35]),
      maxLongitude: Math.max.apply(null , this.markerData ?  this.markerData.map((f) => (f.longitude)) : [-91]),
      minLatitude: Math.min.apply(null ,  this.markerData ?  this.markerData.map((f) => (f.latitude)) : [34]),
      minLongitude: Math.min.apply(null , this.markerData ?  this.markerData.map((f) => (f.longitude)) : [-93]),
    };
    this._markers = this.markerData;
    markerData = this._markers;
    if (navigator.geolocation && this.markerData) {
      navigator.geolocation.getCurrentPosition(this.locateCurrentPosition.bind(this) );
    } else {
    }
  }

  locateCurrentPosition(position) {
    this.sessionService.currentUser.subscribe(x => this.currentUser = x);
    this._markers2.push({ latitude: position.coords.latitude, longitude: position.coords.longitude, name: this.currentUser.firstName});
  }



  ngAfterViewInit() {
  }

  replyToJob () {
  }
}
