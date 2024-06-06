import { Component } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css'
})
export class Page404Component {
  constructor(private message: NzMessageService) {}
  backHome(){
    this.message.success('返回首页')
  }
}
