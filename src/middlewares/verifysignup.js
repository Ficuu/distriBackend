import User from '../models/users'
import { ROLES } from '../models/rol'

export const checkDuplicateUsername = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})
    if(user) return res.status(400).json({message: 'The user already exists'})

    next()
}

export const checkRolesExisted = (req, res, next) => {
    console.log(req.body.roles)
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({message: `Role ${req.body.roles[i]} does not exists`})
            }
        }
    }
    next()
}