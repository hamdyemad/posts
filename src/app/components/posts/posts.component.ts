import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent implements OnInit, OnDestroy {

  constructor(private postService: PostService) { }

  isLoading: boolean = true;
  posts: Object;
  postsSubscription: Subscription;
  ngOnInit() {
    // Fire Get All Posts
    this.getAllPosts();
  }

  // Get All Posts
  getAllPosts() {
    this.postsSubscription = this.postService.getAllPosts().subscribe(res => {
      if (res.type == HttpEventType.Sent) {
        this.isLoading = true;
      } else if (res.type == HttpEventType.Response) {
        this.isLoading = false;
        this.posts = res.body;
      }
    })
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
