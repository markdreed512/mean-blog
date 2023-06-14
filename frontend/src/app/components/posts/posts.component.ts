import { Component } from '@angular/core';
import { Post  } from './../../models/Post'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  title = "Blog Posts"
  posts: any[] = []
  inputPost:string = ""
  

  async ngOnInit() {
    const postsFromDB = await this.getPostsFromDB()
    this.posts = postsFromDB
    // this.posts.push(postsFromDB[0])
    
    // this.posts = data
    // iterate over, create Post objects of each and push to this.posts
    // for(let post in data){
    //   console.log(post)
    // }
    
  }
  async getPostsFromDB (){
    const response = await fetch('http://localhost:3000/posts')
    const data = await response.json()
    console.log(data)
    return data
  }
  async addPostToDB (): Promise<object>{
    const data = {
      "content": this.inputPost,
      "public": false
    }
    const response = await fetch('http://localhost:3000/blogpost', {
      method: "Post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    return response.json()
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
