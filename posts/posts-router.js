//imports
const express = require("express")
const Posts = require("../data/db")

// router
const router = express.Router()


// Get 
router.get("/", (req, res) => {

    Posts.find(req.query)

        .then(posts => {
            // console.log('Get Request', posts)
            res.status(200).json({ query: req.query, data: posts })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

// Get by id
router.get("/:id", (req, res) => {

    Posts.findById(req.params.id)

        .then(post => {
            if (post) {
                res.status(200).json({ post })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

//Post
router.post('/', (req, res) => {

    Posts.insert(req.body)

        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'There was an error while saving the post to the database'
            });
        });
});

router.put("/:id", (req, res) => {

    const changes = req.body

    Posts.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json({ post })
            } else if (!title || !contents) {
                res.status(400).json({ error: "Please provide title and contents for the post" })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be modified." })
        })
})

router.delete("/:id", (req, res) => {

    const post = req.body

    Posts.remove(req.params.id)

        .then(content => {
            if (content > 0) {
                res.status(200).json({ post })
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post could not be removed." })
        })
})

module.exports = router 