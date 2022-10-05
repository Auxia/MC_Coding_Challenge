const User = require('../models/User')

const register = async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(200).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = user.createJWT()
    res.status(200).json({ user: { name: user.name }, token })
}

module.exports = {
    register,
    login
}