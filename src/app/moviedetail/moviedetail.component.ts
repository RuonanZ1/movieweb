import {Component, OnInit} from '@angular/core';
import {FilmsService} from "../films.service";
import {ActivatedRoute} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {Film} from "../films";
import {formatDistance} from 'date-fns';
import {Comments} from "../comments";
import {CommentsService} from "../comments.service";

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrl: './moviedetail.component.css'
})
export class MoviedetailComponent implements OnInit {
  detailinfo?: Film;
  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());
  comments: Comments[] = [];
  isnull: boolean = true;

  constructor(private filmService: FilmsService, private messageService: NzMessageService, private route: ActivatedRoute, private commentsService: CommentsService) {
  };

  getComments() {
    const id = this.route.snapshot.params['id'];
    this.commentsService.getComments(id).subscribe(
      (res: any) => {
        this.isnull = res.length <= 0;
        console.log('getComments', res);
        this.messageService.success(`获取${res.length}条评论`);
        for (let re of res) {
          this.likes = Number(re['like']);
          this.dislikes = Number(re['dislike']);
        }
        this.comments = res
      }
    )
  };

  detailInfo(): void {
    const id = this.route.snapshot.params['id']
    this.filmService.getDetail(id).subscribe(
      (res: any) => {
        this.detailinfo = res['film']
        console.log('detailInfo', res);
        this.messageService.success(res['film'].title + '的详细信息')
      }
    )
  };

  // 现在还不能区分是谁点的赞,哪个用户给哪个评论点赞----------------------------------用户登录
  like(user_id: string): void {
    this.commentsService.updateLikes(user_id).subscribe(
      (res: any) => {
        console.log('like', res);
        this.likes = res['like'];
      }
    )
  };

  dislike(user_id: string): void {
    this.commentsService.updateDislikes(user_id).subscribe(
      (res: any) => {
        console.log('dislike', res);
        this.dislikes = res['dislike'];
      }
    )
  };

  ngOnInit() {
    this.detailInfo()
    this.getComments()
  };

  submitting: boolean = false;
  inputValue:string = ''
  // 下面是添加评论，没有实现区分不同用户-----------------------------登录功能，记录用户信息，根据信息携带用户id参数提交
  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = ''; // 清空输入框，准备下一次输入
    // 构建符合Comments接口的payload
    const commentPayload: Comments = {
      like: "0", // 假设初始点赞数为0
      dislike: "0", // 假设初始反对数为0
      content: content, // 用户输入的评论内容
      user_id: '20220986', // 假设this.user中已经包含了用户ID
      movie_id: this.route.snapshot.params['id'], // 这里需要根据实际情况获取正确的电影ID
    };
    // 使用之前定义的addComments方法发送评论数据
    this.commentsService.addComments(commentPayload, commentPayload.movie_id).subscribe({
      next: (res) => {
        this.getComments();
      },
      error: (error) => {
        console.error('Error adding comment:', error);
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }

}
