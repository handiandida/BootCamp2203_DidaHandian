const db = require('../db')

exports.getDiscussion = async (req, res) => {
    try {
      const { rows : discussion } = await db.query('SELECT * FROM discussion')

        return res.status(200).json({
            success: true,
            discuss: discussion,
        })
        } catch (error) {
        console.log(error.message)
        }
    }

exports.deleteDiscussion = async (req, res) => {
    try {
        const { id_thread } = req.params
        const { rows : discussion } = await db.query(`delete from discussion where id_thread = ${id_thread}`)
    
        return res.status(200).json({
            success: true,
            discuss: discussion,
        })
        } catch (error) {
        console.log(error.message)
        }
    }

exports.addDiscussion = async (req, res) => {
    try {
        const {title_thread, body_thread, date_thread, id_main, id_sub, id_user} = req.body
        // const img_main = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename.replace(/\\/g, '/')
        await db.query(`INSERT INTO main_forum ( title_thread, body_thread, date_thread, id_main, id_sub, id_user ) VALUES ('${title_thread}','${body_thread}', '${date_thread}', '2', '2', '2')`)
        return res.status(200).json({
            success: true,
            message: 'Added Data has succsessfully',
        })
        } catch (error) {
        console.log(error.message)
        return res.status(500).json({
        error: error.message,
        })
        }
    }

    exports.getDiscussionId = async (req, res) => {
        try {
            const { id_thread } = req.params
            const { rows : discussion } = await db.query(`SELECT * FROM discussion where id_thread = ${id_thread}`)
        
            return res.status(200).json({
                success: true,
                discuss: discussion,
            })
            } catch (error) {
            console.log(error.message)
            }
        }
    
    exports.updateDiscussion = async (req, res) => {
        try {
        const { id_thread } = req.params
        const {updateTitle_thread, updateBody_thread, updateDate_thread} = req.body
        const { rows : discussion } = await db.query(`UPDATE discussion SET title_thread='${updateTitle_thread}', body_thread='${updateBody_thread}', date_thread='${updateDate_thread}' WHERE id_thread = ${id_thread}`)
    
        return res.status(200).json({
            success: true,
            discuss: discussion,
            message: 'Data has been edited',
        })
        } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
        }
    }