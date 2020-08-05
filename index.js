const express = require("express")
const postsRouter = require("./posts/posts-router")
const server = express()
server.use(express.json())

//router
server.use("/api/posts", postsRouter)


// server.get('/', (req,res)=>{
//     res.json({ query: req.query, params: req.params, headers: req.headers });
// })

const port = 4000
server.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`)
}) 