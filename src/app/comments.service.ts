import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Comments} from "./comments";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments?:Comments

  getCommentsUrl = 'http://127.0.0.1:5000/api/films';

  constructor(private http: HttpClient) {
  }

  getComments(id: string) {
    return this.http.get(this.getCommentsUrl + `/id=${id}/comments`);
  }

  updateLikes(id: string): Observable<any> {
    return this.http.get(this.getCommentsUrl + `/id=${id}/like`);
  }

  updateDislikes(id: string): Observable<any> {
    return this.http.get(this.getCommentsUrl + `/id=${id}/dislike`);
  }

  addComments(content:Comments, id: string): Observable<any> {
    return this.http.post(this.getCommentsUrl+`/id=${id}/addComment`, content);
  }

}
