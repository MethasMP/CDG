import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import Polyline from '@arcgis/core/geometry/Polyline';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import FeatureSet from '@arcgis/core/rest/support/FeatureSet';
import * as closestFacility from '@arcgis/core/rest/closestFacility';
import ClosestFacilityParameters from '@arcgis/core/rest/support/ClosestFacilityParameters';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import Polygon from '@arcgis/core/geometry/Polygon';
@Component({
  selector: 'app-closest-facility',
  templateUrl: './closest-facility.component.html',
  styleUrls: ['./closest-facility.component.css'],
})
export class ClosestFacilityComponent implements OnInit, AfterViewInit {
  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;
  map: Map | null = null;
  mapView: MapView | null = null;
  point: Point | null = null;
  marker: SimpleMarkerSymbol | null = null;
  pointGraphic: Graphic | null = null;
  selectedRowIndex: number | null = null;
  pointGeometry: any;
  whenClick: any;
  variable: any
  pathLine: any;
  pointCities:any = []
  queriedFeatures: any;
    classestInfo: any;
  drawAllPath: Graphic[] = []
  firstDot:any
  bufferCircle:any
  polylineGraphic:any
  ngOnInit(){

  }
  
  ngAfterViewInit() {
    this.map = new Map({
      basemap: 'topo-vector',
    });

    this.mapView = new MapView({
      container: this.mapPanel.nativeElement,
      map: this.map,
      center: [-117.161087, 32.715736], // [longitude, latitude]
      zoom: 15,
    });

    const citiesLayer = new FeatureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
    });
    this.map!.add(citiesLayer);

    this.marker = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    });

    const pointSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    });

    const pointGeometry = new Point({
      longitude: -117.161087,
      latitude: 32.715736,
    });

    this.firstDot = new Graphic({
      geometry: pointGeometry,
      symbol: pointSymbol,
    });
    this.mapView.graphics.removeAll();
    this.mapView.graphics.add(this.firstDot);


    this.mapView.on('click', (event) => {
      if (this.mapView) {
        this.mapView.graphics.remove(this.polylineGraphic)
        this.pointCities.forEach((res:any) => {
          this.mapView?.graphics.remove(res)
        })
        this.pointCities = []
        this.drawAllPath.forEach((res:any) => {
          this.mapView?.graphics.remove(res)
        })
        this.drawAllPath = []
    
        this.mapView.graphics.remove(this.pointGraphic!)
        this.mapView?.graphics.remove(this.bufferCircle)
        this.mapView.graphics.remove(this.firstDot)
        const polygonSymbol = new SimpleMarkerSymbol({
          color: new Color([255, 165, 0, 0.5]),
          outline: {
            color: [255, 165, 0, 1],
            width: 2,
          },
        });

        const pointGeometry = new Point({
          longitude: event.mapPoint.longitude,
          latitude: event.mapPoint.latitude,
        });
        this.pointGraphic = new Graphic({
          geometry: pointGeometry,
          symbol: polygonSymbol
        })
        
        this.mapView.graphics.add(this.pointGraphic)
        const polygonGeometry: any = geometryEngine.buffer(
          event.mapPoint,
          20,
          'kilometers'
        );

        this.bufferCircle = new Graphic({
          geometry: polygonGeometry,
          symbol: new SimpleFillSymbol({
            color: [255, 165, 0, 0.5],
            outline: {
              color: [255, 165, 0, 1],
              width: 2,
            },
          }),
        });

        this.mapView.graphics.add(this.bufferCircle);
        const query = citiesLayer.createQuery();
        query.geometry = polygonGeometry;
        query.spatialRelationship = 'intersects';
        query.returnGeometry = true;

       //queryFeatureCity
        citiesLayer.queryFeatures(query).then((response) => {
          this.variable = response.features
          console.log(response.features);

          this.queriedFeatures = citiesLayer.queryFeatures(query);
          response.features.forEach((res:any) => {
            const point = new Point({
              latitude: res.geometry.latitude,
              longitude: res.geometry.longitude
            })
            const paint = new SimpleMarkerSymbol({
              color: [255,0,255],
              style: "square"
              
            })
            
            const dotCities = new Graphic({
              geometry:point,
              symbol: paint,
              attributes: {
                name: res.attributes.areaname
              }
            })
           
            this.mapView?.graphics.add(dotCities)
            this.pointCities.push(dotCities)
          })

          closestFacility.solve('https://sampleserver6.arcgisonline.com/arcgis/rest/services/NetworkAnalysis/SanDiego/NAServer/ClosestFacility',
            new ClosestFacilityParameters({
              incidents: new FeatureSet({
                features: [this.pointGraphic!],
              }),
              facilities: new FeatureSet({
                features: this.pointCities,
              }),
              returnRoutes: true,
              defaultTargetFacilityCount: 10,
            })
          )
          .then((response: any) => {
            
            this.classestInfo = response.routes.features;
            
            response.routes.features.forEach((path: any) => {
              // console.log(path)

              const pathTodestination = new Polyline({
                paths: path.geometry.paths,
               
              })
              this.whenClick = pathTodestination.paths;
              const line = new SimpleLineSymbol({
                color: 'cyan',
                width: '2px',
                style: 'solid'
              })

              const drawPath = new Graphic({
                geometry: pathTodestination,
                symbol: line
              }) 
              this.drawAllPath.push(drawPath)
              this.mapView?.graphics.add(drawPath)
            })
        });
      
    });
  }
  
}

//13.703620604185586, 100.54497605480664

    )}

    onRowclick(state: any) {

      this.classestInfo.forEach((i:any) => {
        i.clicked = false;
      })
      state.clicked = true;
      console.log(state)
      this.mapView?.graphics.remove(this.polylineGraphic)
      // Assuming the feature geometry is a polyline
      const polylineGeometry: any = state.geometry;
    
      const lineSymbol = new SimpleLineSymbol({
        color: 'black',
        width: '2px',
        style: 'solid'
      });
      this.polylineGraphic = new Graphic({
        geometry: polylineGeometry,
        symbol: lineSymbol
      });
      this.mapView!.graphics.add(this.polylineGraphic);
      this.mapView!.goTo(state.extent);
     
      }

      zoomToRoute(geometry: any) {
        // ทำการ Zoom ไปที่ข้อมูลทางลงใน <ol>
        this.mapView!.goTo(geometry.extent);
      }
    
}
