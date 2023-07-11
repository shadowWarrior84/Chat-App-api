const generateToken = require("../config/generateToken")
const User = require("../models/userModel")

const registerUser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body

        if(!name || !email || !password) {
            return res.status(400)
            throw new Error("Please Enter all the Fields")
        }

        const userExists = await User.findOne({email})

        if(userExists) {
            res.status(400)
            throw new Error("User already exists")
        }

        const user = await User.create({
            name,email,password,pic
        })

        if(user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id)})
        } else {
            res.status(400)
            throw new Error("Failed to Create the User")
        }
        
    } catch (error) {
        console.log(error)
    }

}

const authUser = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)})
    } else {
        res.status(400)
        throw new Error("Failed to Create the User")
    }
}

const allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i"} },
            { email: { $regex: req.query.search, $options: "i"}}
        ]
    } : {}

    const users = await User.find(keyword).find({_id: { $ne: req.user._id }})
    res.send(users)
}

module.exports = { registerUser, authUser, allUsers }