import {Component, OnInit} from '@angular/core';
import {Film} from "../films";
import {FilmsService} from "../films.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchFilms: Film[] = [];      // 用来存储搜索结果的数组
  searchControl = new FormControl(); // 创建FormControl实例, 绑定到输入框的搜索词

  constructor(private filmsService: FilmsService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.initializeSearch();
  }

  initializeSearch() {
    // 监听searchControl的值的变化
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // 等待0.3秒
      distinctUntilChanged() // 只有当值发生变化时才发送请求
    ).subscribe(searchTerm => {
      // 条件判断，确保搜索词不为空
      if (!searchTerm.trim()) {
        // 如果为空，清空搜索结果或进行其他适当操作
        this.searchFilms = [];
        return;
      }
      // 调用搜索服务
      this.filmsService.searchFilms(searchTerm).subscribe(
        (data: Film[]) => {
          console.log(data);
          this.message.success('搜索成功')
          this.searchFilms = data; // 使用搜索结果更新films属性
        },
        error => {
          // 错误处理
          console.error('Error occurred while searching for films:', error);
        }
      );
    });
  }

}
