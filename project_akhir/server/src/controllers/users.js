const db = require('../db')

exports.getUser = async (req, res) => {
    try {
      const { rows : users } = await db.query('SELECT * FROM users')

        return res.status(200).json({
            success: true,
            users: users,
        })
        } catch (error) {
        console.log(error.message)
        }
    }

exports.getUserbyId = async (req, res) => {
    try {
        const { id_user } = req.params
        const { rows : user } = await db.query(`SELECT * FROM users where id_user = ${id_user}`)
    
        return res.status(200).json({
            success: true,
            users: user,
        })
        } catch (error) {
        console.log(error.message)
        }
    }

exports.deleteUser = async (req, res) => {
    try {
        const { id_user } = req.params
        const { rows : user } = await db.query(`DELETE FROM users WHERE id_user = ${id_user}`)

        return res.status(200).json({
            success: true,
            users: user,
        })
        } catch (error) {
        console.log(error.message)
        }
    }

exports.updateUser = async (req, res) => {
    try {
        const { id_user } = req.params
        const { updateName} = req.body
        // const { updateImg } = req.file.path.replace(/\\/g, '/')
        const { rows : user } = await db.query(`UPDATE users SET name = '${updateName}' WHERE id_user = ${id_user}`)

        return res.status(200).json({
            success: true,
            users: user,
        })
        } catch (error) {
        console.log(error.message)
        }
    }