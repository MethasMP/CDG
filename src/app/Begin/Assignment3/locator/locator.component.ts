// // locator.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomPoint } from './CustomPoint';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css'],
})
export class LocatorComponent {
  formTitle: string = 'Locator';
  customPoint :CustomPoint = new CustomPoint()
  @Input() 
  set logla(data:CustomPoint) {
      this.customPoint = data
  }
  get coordinate():CustomPoint {
      return this.customPoint
  }
  @Output() locate: EventEmitter<CustomPoint> = new EventEmitter<CustomPoint>();

  ngOnInit(): void {
      // console.log(this.customPoint)
  }

  onLocate () {
      this.locate.emit(this.customPoint)
  }
}
