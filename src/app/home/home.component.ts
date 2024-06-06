import { Component } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private message: NzMessageService) {
  }

  goToDetail(){
    this.message.success('电影详情页')
  }
  goToVisualization(){
    this.message.success('可视化')
  }
}
