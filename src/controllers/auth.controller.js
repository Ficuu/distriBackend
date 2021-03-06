import User from '../models/users'
import Role from '../models/rol'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async (req, res) => {
    const { username, password, roles } = req.body
    console.log(req.body.roles)
    const newUser = new User({
        username,
        password: await User.encryptPassword(password)
    })
    
    if(roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id]
    }

    const saveUser = await newUser.save()
    console.log(saveUser)
    
    const token = jwt.sign({id: saveUser._id}, config.SECRET, {
        expiresIn: 86400 // 24 Hs
    })
    res.status(200).json({token})
}

export const signIn = async (req, res) => {
    
    const userFound = await User.findOne({username: req.body.username}).populate('roles')
    if(!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'})

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 84600
    })

    
    res.json({token})

}