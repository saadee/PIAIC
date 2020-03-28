const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authMiddleware')
// const Profile = require('../../models/Post')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator');



// route for getting user profile
router.get('/me', auth, async (req, res) => {
    try {
        // const profile = await Profile.findOne({ user: req.user.id })    // this user is getting through profile model
        const user = await User.findById(req.user.id);

        if (!user.profile) {
            return res.status(400).json([{ msg: "There is no profile for this user" }])
        }
        res.json(user.profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Profile-server Error')

    }
});

// creating user Profile
router.post('/', auth, async (req, res) => {

    const { userName, fName,city, gender, program, image } = req.body;
    //Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (userName) profileFields.userName = userName;
    if (fName) profileFields.fName = fName;
    if (program) profileFields.program = program;
    if (image) profileFields.image = image;
    if (city) profileFields.city = city;
    if (gender) profileFields.gender = gender


    try {
        // let profile = await Profile.findOne({ user: req.user.id });

        // if (profile) {
        //     //updatte the profile
        //     profile = await Profile.findOneAndUpdate(
        //         { user: req.user.id },
        //         { $set: profileFields },
        //         { new: true });

        //     return res.json(profile);


        // }

        // if not found then we would create
        const user = await User.findById(req.user.id);
        user.profile=profileFields
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Profile-Server Error ");

    }

})

//@route  Get Api/profile
//@desc  get all user profile 
//@access Public

router.get('/', async (req, res) => {
    try {
        const user = await User.find().populate('user', ['name', 'program'])
        res.json(user.profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server Error");

    }
});
//@route  Get api/profile/user/:user_id
//@desc  get Profile by user ID
//@access Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const user = await User.findOne({ user: req.params.user_id }).populate('user', ['name', 'program']);

        if (!user.profile) return res.status(400).json({ msg: "Profile not found" });

        res.json(user.profile);

    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId');
        res.status(500).json({ msg: "Profile not found" });

    }
});

//@route  DELETE api/profile
//@desc   delete a profile,user and posts
//@access Private

router.delete('/', auth, async (req, res) => {
    try {
        //@todo- Removing Posts

        //Removing Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Removing User
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: " User removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server Error");

    }
});



module.exports = router;    