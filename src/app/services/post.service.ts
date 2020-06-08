import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const backend_URL = environment.backend_URL;
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }



  // Get All Posts
  getAllPosts() {
    return this.http.get(backend_URL, {
      observe: 'events'
    });
  }

  // Get Post
  getPost(id) {
    return this.http.get(`${backend_URL}/${id}`, {
      observe: 'events'
    })
  }

  // Delete Post
  deletePost(id: string) {
    return this.http.delete(`${backend_URL}/${id}`, {
      observe: 'events'
    })
  }

  // Update Post
  updatePost(id: string, title: string, body: string) {
    return this.http.patch(`${backend_URL}/${id}`, {
      title,
      body
    }, {
      observe: 'events'
    })
  }
}
