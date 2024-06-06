import {Component} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'films';
  isCollapsed = false;
  theme = true;

  constructor(private message: NzMessageService) {
  }

  goToHome(): void {
    this.message.create('success', '返回主页')
  }
  goToDetail(): void {
    this.message.create('success','电影详情页')
  }
  goToCountByYear(): void {
    this.message.success('CountByYear')
  }
  goToAvgRateRegion(){
    this.message.success('avgRateRegion')
  }
  goToCalendar(){
    this.message.success('日历')
  }
  onChange(status: boolean): void {
    console.log(status);
  }
  goToTop(){
    this.message.success('返回顶部')
  }
}
