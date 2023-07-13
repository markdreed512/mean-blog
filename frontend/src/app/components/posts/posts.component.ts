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
  }
  async getPostsFromDB (){
    const response = await fetch('http://localhost:3000/posts')
    const data = await response.json()
    console.log(data)
    return data
  }
  async addPostToDB (): Promise<object>{
    const date = Date.now()
    const data = {
      "content": this.inputPost,
      "public": false,
      "timestamp": date.toString()
    }
    const response = await fetch('http://localhost:3000/blogpost', {
      method: "Post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    this.posts = await this.getPostsFromDB()
    this.inputPost = ""
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
  async deletePost(id: number): Promise<void>{
    // Delet request to api w/ ID
    const response = await fetch(`http://localhost:3000/posts/${id}`, {method: 'DELETE'})
    const data = await response.json()
    console.log(data)

    // this.posts = this.posts.filter((post, i) => {
    //   return id !== this.posts.length - 1 - i
    // })
    console.log(this.posts )
  }
  // addPost() {
  //   this.posts.push({
  //     content: this.inputPost,
  //     public: false
  //   })
  //   this.inputPost = ""
  // }
}
