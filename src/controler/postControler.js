
const postModel = require("../model/postModel");
const mongoose = require("mongoose")
const isObjectId = mongoose.Types.ObjectId.isValid




const { isEmpty, isValidBody, isValidGeoLocation, isValidStatus } = require("../validation/validate");


//----------------------create Post Details--------------------------->>>>>>>>>>>
const createPost = async (req, res) => {
    try {

        let data = req.body;

        let { Title, Body, CreatedBy, Status, GeoLocation } = data;

        if (!isEmpty(Title)) return res.status(400).send({ status: false, message: "title required" });


        if (!isEmpty(Body)) return res.status(400).send({ status: false, message: "body required" });


        if (!isEmpty(CreatedBy)) return res.status(400).send({ status: false, message: "createdBy required" });

        if (!isValidStatus(Status)) return res.status(400).send({ status: false, message: "Active or Inactive required" });

        if (!isEmpty(GeoLocation)) return res.status(400).send({ status: false, message: "geolocation required" });

        const createdPost = await postModel.create(data);

        return res.status(201).send({ status: true, message: 'Success', data: createdPost });

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}





//----------------------Get Post Details--------------------------->>>>>>>>>>>
const getPost = async function (req, res) {
    try {

        let postId = req.params.id;



        let getPost = await postModel.findById(postId);
        //console.log(getPost,postId)

        if (!getPost) return res.status(404).send({ status: false, message: `no Post found with the postId: ${postId}.` });


        return res.status(200).send({ status: true, message: 'Success', data: getPost });

    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}


//----------------------update Post Details--------------------------->>>>>>>>>>>

const updatePost = async function (req, res) {

    try {
        let { title, body, geolocation } = req.body
        let postId = req.params.postId

        if (isValidBody(req.body))
            return res.status(400).send({ status: false, message: "Request body can't be empty" });
        if (title) {
            if (!isValidName(title))
                return res.status(400).send({ status: false, message: "Title Name must be present and only Alphabats " });
        }
        if (body) {
            if (!isValidName(body))
                return res.status(400).send({ status: false, message: "Body must be present in validformat" });
        }

        if (geolocation) {
            if (!isValidGeoLocation(geolocation))
                return res.status(400).send({ status: false, message: "Invalid Geo-Location" });
        }
        let data = await postModel.findOneAndUpdate({ Status: "Active", _id: postId }, { title, body, geolocation }, { new: true });
        res.status(201).send({ status: true, message: "Success", data: data });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



//----------------------delelete Post Details-------------------------->>>>>>>>
const deletePost = async function (req, res) {
    try {
        let postId = req.params.postId;



        let postData = await postModel.findById(postId);

        if (!postData) return res.status(404).send({ status: false, message: `No post details found with the postId: ${postId}.` });



        let deletePost = await postModel.findOneAndUpdate(
            { _id: postId },
            { deletedAt: new Date() },
            { new: true }
        );

        return res.status(200).send({ status: true, message: "post is deleted successfully", });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}



const getGeoLocation = async (req, res) => {
    try {
        const geoLocation = req.body.geoLocation
        if (!isValidGeoLocation(geoLocation))
            return res.status(400).send({ status: false, message: "Invalid GeoLocation" });

        const finalData = await postModel.findOne({ geoLocation ,isDeleted:false})

        if (finalData.length == 0)
            return res.status(404).send({ status: false, message: 'post not found' });

        return res.status(200).send({ status: true, message: 'Success', data: finalData });
    } catch (err) {
        res.status(500).send({ status: false, err: err.message })
    }
}


const getActIna = async (req, res) => {
    try {
        const active = await postModel.find({ isDeleted: false, Status: "Active" })
        const inactive = await postModel.find({ isDeleted: false, Status: "Inactive" })
        return res.status(200).send({ status: true, message: 'Success', TotleActive: active.length, TotleInactive: inactive.length });
    } catch (err) {
        res.status(500).send({ status: false, err: err.message })
    }
}

module.exports = { createPost, getPost, deletePost, updatePost,getGeoLocation,getActIna }