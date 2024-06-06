import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {Film} from "./films";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  filmsUrl = 'http://127.0.0.1:5000/api/films/';
  filmsYearUrl = 'http://127.0.0.1:5000/api/films/count_by_year';
  avgRateRegionUrl = 'http://127.0.0.1:5000/api/films/avg_rate_by_region';
  getTotalNumUrl = 'http://127.0.0.1:5000/api/films/total';
  searchUrl = 'http://127.0.0.1:5000/api/films/searchFilms';
  detailUrl = 'http://127.0.0.1:5000/api/films/detail';

  constructor(private http: HttpClient) {
  }

  private handleError(error: any) {
    // 错误处理逻辑, 可以打印错误日志, 并根据需要决定是否抛出错误让订阅者处理
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getFilms(page: number, pageSize: number): Observable<Film[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Film[]>(this.filmsUrl, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: params
    })
  }

  byYear(): Observable<any[]> {
    return this.http.get<{ [key: string]: number }>(this.filmsYearUrl, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      // 假设响应的数据格式和您提供的一样
      map(data => {
        // 转换数据为数组形式，以方便前端处理
        return Object.entries(data).map(([year, count]) => ({year, count}));
      })
    );
  }

  avg_rate_by_region(): Observable<any> {
    return this.http.get(this.avgRateRegionUrl, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      map(response => {
        // 数据处理逻辑, 比如重新格式化或数据转换为更方便前端使用的格式
        return response;
      }),
      catchError(this.handleError) // 处理可能出现的错误
    );
  }

  getTotalNum(): Observable<any> {
    return this.http.get(this.getTotalNumUrl, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      catchError(this.handleError)
    )
  }

  searchFilms(term: string): Observable<Film[]> {
    // 去除搜索词的前后空白字符
    if (!term.trim()) {
      // 如果没有搜索词，立即返回一个空数组
      return of([]);
    }
    return this.http.get<Film[]>(`${this.searchUrl}?filmName=${term}`, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).pipe(
      tap(_ => this.log(`found films matching "${term}"`)), // 成功时记录消息
      catchError(this.handleError) // 处理失败的情况
    )
  }

  getDetail(id:string): Observable<Film> {
    return this.http.get<Film>(this.detailUrl+`/${id}`, {
      withCredentials: true,
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }

  // 实现记录日志的方法
  private log(message: string): void {
    // 在这里实现您的log逻辑，或调用另一个服务来记录消息
  }
}
