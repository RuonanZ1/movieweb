import {Component, OnInit} from '@angular/core';
import {FilmsService} from "../films.service";
import {ECharts} from 'echarts';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-avg-rate-by-region',
  templateUrl: './avg-rate-by-region.component.html',
  styleUrl: './avg-rate-by-region.component.css'
})
export class AvgRateByRegionComponent implements OnInit {
  constructor(private filmsService: FilmsService, private message: NzMessageService) {
  }

  echartsInstance: any;
  chartOptions: any;
  selectedRegion = 'cn';
  avgRateData: any;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.get_avg_rate_by_region();
  }

  goBack() {
    this.message.success('返回成功')
  }

  get_avg_rate_by_region() {
    this.isLoading = true;
    this.filmsService.avg_rate_by_region().subscribe(
      data => {
        this.avgRateData = data; // 存储数据供后续使用
        this.updateChartOptions(); // 更新图表
        this.isLoading = false;
      },
      error => {
        // 处理错误情况
        console.error('Error fetching data: ', error);
      }
    );
  }

  updateChartOptions() {
    const averageRatings = this.avgRateData[this.selectedRegion];
    const xAxisData = Object.keys(averageRatings).sort();
    const seriesData = xAxisData.map(year => averageRatings[year]);

    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => { // 这里为 params 明确指定了 any 类型
          const param = params[0];
          return `${param.axisValueLabel}: ${param.data}`;
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: seriesData,
        type: 'bar'
      }]
    };
    if (this.echartsInstance) {
      this.echartsInstance.setOption(this.chartOptions, true);
    }
  }

  onChartInit(ec: ECharts) {
    this.echartsInstance = ec;
  }

  onRegionChange(region: string) {
    this.selectedRegion = region;
    this.get_avg_rate_by_region(); // Fetch data for new region
  }

}
