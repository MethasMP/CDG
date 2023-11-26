import { Component, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import { CustomPoint } from '../../Begin/Assignment3/locator/CustomPoint';
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";


@Component({
  selector: 'app-quearytask',
  templateUrl: './QueryTask.component.html',
  styleUrls: ['./QueryTask.component.css'],
})
export class QueryTaskComponent implements AfterViewInit, OnInit {

  @Output() longla: EventEmitter<CustomPoint> = new EventEmitter<CustomPoint>();
  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;

  map: Map | null = null;
  mapView: MapView | null = null;
  point: Point | null = null;
  marker: SimpleMarkerSymbol | null = null;
  pointGraphic: Graphic | null = null;
  customPoint: CustomPoint = new CustomPoint();
  queriedFeatures: any;
  selectState: Graphic[] = [];
  selectedRowIndex: number | null = null;

  ngOnInit() {
    this.autofill();
  }

  async autofill() {
    this.map = new Map({
      basemap: 'topo-vector',
    });

    this.mapView = new MapView({
      container: this.mapPanel.nativeElement,
      map: this.map,
      center: [-98.5795, 39.8283], // [longitude, latitude]
      zoom: 15,
    });

    const featureLayer = new FeatureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2'
    });
    const query = featureLayer.createQuery();
    query.where = '1=1';
    query.outFields = ['*'];
    query.returnGeometry = true;

    featureLayer.queryFeatures(query).then((response) => {
      console.log(response);
      this.selectState = response.features
    });
    
    this.map!.add(featureLayer);
    this.queriedFeatures = await featureLayer.queryFeatures(query);

    this.point = new Point({
      longitude: -98.5795,
      latitude: 13.7034348,
    });

    this.marker = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    });

    this.pointGraphic = new Graphic({
      geometry: this.point,
      symbol: this.marker,
    });
    this.mapView.graphics.add(this.pointGraphic);
  }

  ngAfterViewInit() {
    const identifyURL = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer";
    //
    const identifyLayer = new MapImageLayer({
      url: identifyURL,
      opacity: 0.5
    });

    const map = new Map({
      basemap: "osm"
    });
    map.add(identifyLayer);


  }
  onRowclick(feature: any, rowIndex: number) {

    this.selectedRowIndex = rowIndex;
    const geoSym = new SimpleFillSymbol({
      color: [255, 165, 0, 0.5],
    });

    const polygon = new Polygon({
      rings: feature.geometry.rings
      
    })

    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: geoSym,
    });

    this.mapView!.graphics.removeAll();
    this.mapView!.graphics.addMany([polygonGraphic]);

    this.mapView!.goTo(polygon.centroid);
    this.mapView!.extent = polygon.extent.expand(1.5)
  }

}

