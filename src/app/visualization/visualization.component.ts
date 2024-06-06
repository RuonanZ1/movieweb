import {Component, OnInit} from '@angular/core';
import {FilmsService} from "../films.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.css'
})
export class VisualizationComponent implements OnInit {
  chartOptions: any;
  isLoading: boolean = false;
  total: number = 0;
  time = Date.now()

  constructor(private message: NzMessageService, private filmsService: FilmsService) {
  }

  ngOnInit() {
    // 在组件初始化时获取数据
    this.byYearData();
    this.getTotal()
  }

  goBack() {
    this.message.success('返回成功')
  }

  byYearData() {
    this.isLoading = true;
    this.filmsService.byYear().subscribe(
      data => {
        // 将 data 数组转换为适合配置的格式
        const years = data.map(item => item.year); // 提取所有年份
        const counts = data.map(item => item.count); // 提取所有数量

        // 设置图表的配置
        this.chartOptions = {
          title: {
            text: '年度数据统计'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: years // 使用提取的年份
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: counts, // 使用提取的数量
            type: 'bar'
          }]
        };
        // 由于是 ngx-echarts，不需要手动初始化，配置更新后，图表会自动更新
        this.isLoading = false;
      },
      error => {
        console.log('Error: ', error);
      }
    );
  }
  getTotal(){
    this.filmsService.getTotalNum().subscribe(
      (res:any) => {
        this.total = res['total_num']
        console.log(res)
      }
    )
  }

}
