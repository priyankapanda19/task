const express = require('express')
const userController = require("../controler/userControler");
const postController = require("../controler/postControler");
const {Authentication,Authorization} = require("../auth/authentication");
const router = express.Router()



router.post("/registration",userController.createUser)
router.post('/login', userController.userlogin)

router.post("/create",postController.createPost)
router.get('/getPost/:id', postController.getPost)
router.put("/updatePost/:userId/:postId", Authentication, Authorization ,postController.updatePost)
router.delete('/deletePost/:userId/:Id',Authentication, Authorization, postController.deletePost)
router.get("/getActIna",postController.getActIna)
router.get("/getGeoLocation",postController.getGeoLocation)

//errorHandling for wrong address
router.all("/**", function (req, res) {         
    res.status(400).send({
        status: false,
        msg: "The api you request is not available"
    })
})
module.exports=router