import { Post } from "../publicaciones/post.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = []; //primera matriz
  private postsUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api.posts').pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          pares: post.pares,
          process: post.process,
          style: post.style,
          corrida: post.corrida
        }
      })
    })).subscribe((transformedPost) => {
      this.posts = transformedPost;
      this.postsUpdate.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, pares: string, process: string, style: string, corrida: string }>("http://localhost:3000/api.posts" + id);
  }

  getPostsUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  addPost(title: string, content: string, pares: string, process: string, style: string, corrida: string) {
    const post: Post = { id: null, title: title, content: content, pares: pares, process: process, style: style, corrida: corrida }
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api.posts', post).subscribe((responseData) => {
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdate.next([...this.posts]);
      this.router.navigate(["/"]);
    });

  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api.posts/" + postId).subscribe(() => {
      const updatePosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatePosts;
      this.postsUpdate.next([...this.posts]);
    });
  }

  updatePost(id: string, title: string, content: string, pares: string, process: string, style: string, corrida: string) {
    const post: Post = { id: id, title: title, content: content, pares: pares, process: process, style: style, corrida: corrida };
    this.http.put("http://localhost:3000/api.posts/" + id, post).subscribe(response => {
      const updatePost = [...this.posts];
      const oldPostIndex = updatePost.findIndex(p => p.id === post.id);
      updatePost[oldPostIndex] = post;
      this.posts = updatePost;
      this.postsUpdate.next([...this.posts]);
      this.router.navigate(["/"]);
    })
  }


}
