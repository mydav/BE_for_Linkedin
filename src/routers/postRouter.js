const express = require("express")
const Post = require("../models/post")
const passport = require("passport")
const mongoose = require("mongoose")


const router = express.Router()

router.get("/", async (req, res) => {
    res.send(await Tweet.find())
})

router.post("/", passport.authenticate("jwt"), async(req, res)=>{
    req.body.userId = req.user._id
    const post = new Post(req.body)
    await post.save()
    res.send(post)
})

router.put("/:postId", passport.authenticate("jwt"), async(req, res)=>{
    const post = await Post.findById(req.params.tweetId)
    if (!post)
        return res.status(404).send("Not found")

    const converted =  new mongoose.Types.ObjectId(req.user._id); //we have to cast the string in a ObjectId and then use the .equals method
    if (!converted.equals(post.userId)) //don't try this at home! we have to fix the conversion instad of using the cast
        return res.status(401).send("You can only modify your posts")

    const resp = await Post.findByIdAndUpdate(req.params.postId, {
        text: req.body.text
    })

    res.send(resp)
})

router.get("/myPosts", passport.authenticate("jwt"), async (req, res)=>{
    res.send(await Post
        .find({ userId: req.user._id})
        .sort("-updatedAt"))
})


module.exports = router;