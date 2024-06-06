import {Component} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeZh from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZh, 'zh-cn');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  listDataMap = {
    eight: [
      {type: 'warning', content: 'This is warning event.'},
      {type: 'success', content: 'This is usual event.'}
    ],
    ten: [
      {type: 'warning', content: 'This is warning event.'},
      {type: 'success', content: 'This is usual event.'},
      {type: 'error', content: 'This is error event.'}
    ],
    eleven: [
      {type: 'warning', content: 'This is warning event'},
      {type: 'success', content: 'This is very long usual event........'},
      {type: 'error', content: 'This is error event 1.'},
      {type: 'error', content: 'This is error event 2.'},
      {type: 'error', content: 'This is error event 3.'},
      {type: 'error', content: 'This is error event 4.'}
    ]
  };

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
}
