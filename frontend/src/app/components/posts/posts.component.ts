import { Component } from '@angular/core';
import { Post  } from './../../models/Post'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  title = "Blog Posts"
  posts:Post[]

  inputPost:string = ""

  ngOnInit(): void {
    const posts = this.getPostsFromDB()
    console.log("from DB: ", posts)
  }
  async getPostsFromDB (): Promise<object>{
    const response = await fetch('http://localhost:3000/posts')
    const postsFromDB = await response.json()
    return postsFromDB
  }
  togglePublic (id: number): void {
    this.posts = this.posts.map((post, i) =>{
      if(i == id){
        post.public = !post.public
      }
      return post
    })
  }
  deletePost(id: number): void{
    this.posts = this.posts.filter((post, i) => {
      return id !== i
    })
  }
  addPost() {
    this.posts.push({
      content: this.inputPost,
      public: false
    })
    this.inputPost = ""
  }
}
