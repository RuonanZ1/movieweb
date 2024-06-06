import {Component} from '@angular/core';
import {FilmsService} from "../films.service";
import {Film} from "../films";
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-filmsinfo',
  templateUrl: './filmsinfo.component.html',
  styleUrl: './filmsinfo.component.css'
})
export class FilmsinfoComponent {
  films: Film[] = [];
  isLoading: boolean = false;
  pageIndex: number = 1; // 当前页码，初始为1
  pageSize: number = 30; // 你每页想显示的数据条数
  total: number = 0; // 总数据条数，应该从后端获得
  // selectedType: string = ''; // 当前选定的类型，默认为空，表示所有类型
  // types: string[] = ['类型1', '类型2', '类型3']; // 假设的电影类型数组
  constructor(private filmsService: FilmsService, private message: NzMessageService) {
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.fetchData(page, this.pageSize); // 当页码改变时，重新获取数据
  }


  fetchData(page: number, pageSize: number): void {
    this.isLoading = true; // 开始加载数据
    this.filmsService.getFilms(page, pageSize).subscribe(
      (res: any) => { // 根据你的后端响应类型，这里可能需要调整
        this.films = res['films']; // 假设响应中电影列表的键是'films'
        this.total = res['total']; // 假设响应中总电影数的键是'total'
        this.isLoading = false; // 加载完成
        this.message.success(`获取到${pageSize}条电影信息`);
      },
      error => {
        this.isLoading = false; // 确保即使发生错误，加载状态也会被正确更新
        this.message.error('加载电影信息失败');
        console.error('Error fetching films:', error);
      }
    );
  }

  getFilmsInfo() {
    this.fetchData(this.pageIndex, this.pageSize); // 简化为直接调用fetchData
  }

}
