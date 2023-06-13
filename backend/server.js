const express = require('express')
const mongoose = require('mongoose')
const Post = require('./models/PostModel')
const cors = require('cors')
const app = express()
const port = 3000


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello world!!')
})
app.get('/posts', async(req, res) => {
    try{
        const posts = await Post.find({})
        res.status(200).json(posts) 
   }
   catch(error){
        res.status(500).json({message: error.message})
   }
})
app.get('/posts/:id', async(req, res) => {
    try{
        const {id} = req.params
        const post = await Post.findById(id)
        res.status(200).json(post) 
   }
   catch(error){
        res.status(500).json({message: error.message})
   }
})
app.post('/blogpost', async(req, res) => {
   try{
        const post = await Post.create(req.body)
        res.status(200).json(post) 
   }
   catch(error){
    console.log(error)
    res.status(500).json({message: error.message})
   }
})
app.put('/posts/:id', async(req, res) => {
    try{
        const {id} = req.params
        const post = await Post.findByIdAndUpdate(id, req.body)
        if(!post){
            return res.status(404).json({message: `cannot find post with id ${id}`})
        }
        const updatedPost = await Post.findById(id)
        res.status(200).json(updatedPost) 
   }
   catch(error){
        res.status(500).json({message: error.message})
   }
})


mongoose.connect('mongodb+srv://markdreed512:f28f4HJb9xvl1Uzi@mean-blog.z9x29sd.mongodb.net/Mean-Blog?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })