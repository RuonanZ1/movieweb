import { Component } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-all-visualization',
  templateUrl: './all-visualization.component.html',
  styleUrl: './all-visualization.component.css'
})
export class AllVisualizationComponent {
  constructor(private message: NzMessageService) {
  }
  goToVisualization(){
      this.message.success('每年电影数量')
  }

  goToAvgRateRyRegion(){
    this.message.success('平均得分')
  }
}
