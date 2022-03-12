import { PostService } from '../../../../services/post/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '@its-market/post';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.css'],
})
export class PostBoxComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }
}
