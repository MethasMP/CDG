import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import { CustomPoint } from 'app/Begin/Assignment3/locator/CustomPoint';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import * as route from "@arcgis/core/rest/route";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters.js";
import { ButtonModule } from 'primeng/button';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";

@Component({
  selector: 'app-PostTest1',
  templateUrl: './PostTest1.component.html',
  styleUrls: ['./PostTest1.component.css']
})

export class PostTest1 implements OnInit {
  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;
  //@Output() guy:EventEmitter<CustomPoint> = new EventEmitter<CustomPoint>();
  map: Map | null = null;
  mapView: MapView | null = null;
  point: Point | null = null;
  pointGraphic:any
  customPoint: CustomPoint = new CustomPoint();
  stateOutline!: Graphic;
  LineGuy:Graphic[]=[]
  tempArea:any = []
  title!: string;
  latitude: number | null = null;
  longitude: number | null = null;
  index!: number;
  marker: SimpleMarkerSymbol | null = null;

  onClick(): void {
    this.mapView!.graphics.removeAll();
    this.mapView!.zoom=18
    this.LineGuy = []
  }
  
  addData() {
    if (
      this.longitude == null ||
      this.latitude == null ||
      isNaN(this.latitude) ||
      isNaN(this.longitude) ||
      this.latitude < -90 ||
      this.latitude > 90 ||
      this.longitude < -180 ||
      this.longitude > 180
    ) {
      alert('Invalid latitude or longitude value');
      return;
    }

    const newData = {
        title: this.title,
        latitude: this.latitude,
        longitude: this.longitude
    };
    this.tempArea.push(newData);

    this.title;
    this.latitude;
    this.longitude;

    const marker = new SimpleMarkerSymbol({
      color: [226, 119, 40],
        outline: {
            color: [255, 255, 255],
            width: 2,
      },
    });
    
    this.mapView?.graphics.removeAll()
    const newCenter = new Point({
      longitude: this.longitude ?? undefined,
      latitude: this.latitude ?? undefined,
    });
    
    this.marker = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
          color: [255, 255, 255],
          width: 2,
      },
    });
    this.pointGraphic = new Graphic({
      geometry: newCenter,
      symbol: this.marker,
    });
    this.mapView?.graphics.add(this.pointGraphic);
    this.mapView?.goTo(newCenter);}


  
removeData(data: any) {
  const index = this.tempArea.indexOf(data);

  if (index !== -1) {
      this.tempArea.splice(index, 1);
  }
}

clearData() {
  this.title = '';
  this.latitude = null; // You can set this to null or any default value
  this.longitude = null; // You can set this to null or any default value
}

  onRowClick(temp: any) {
    this.title = temp.title;
    this.latitude = temp.latitude;
    this.longitude = temp.longitude;
  
    const newCenter = new Point({
      longitude: this.longitude ?? undefined,
      latitude: this.latitude ?? undefined,
    });
  
    const marker = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    });
  
    const pointGraphic = new Graphic({
      geometry: newCenter,
      symbol: marker,
    });
  
    // Remove previous graphics
    this.mapView?.graphics.removeAll();
  
    // Add the new graphic
    this.mapView?.graphics.add(pointGraphic);
  
    // Zoom to the clicked point
    this.mapView?.goTo(newCenter, { duration: 1000 });
  
    // Highlight the clicked row
    this.highlightRow(temp);
  }  

  highlightRow(state: any) {
    this.LineGuy.forEach((row: any) => {
      row.attributes.highlighted = false;
    });
  
    state.attributes.highlighted = true;
    this.mapView!.goTo(state.geometry.extent, { duration: 1000 });
  }

  ngOnInit() {
  this.map = new Map({
  basemap: 'topo-vector',
  });
  this.mapView = new MapView({
  container: this.mapPanel.nativeElement,
  map: this.map,
  center: [100.543341, 13.70307],
  zoom: 18, 
  });
  this.point = new Point({
    latitude: 100.543341,
    longitude: 13.70307,
  });
  }
}
