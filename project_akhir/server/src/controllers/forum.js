const db = require('../db')

exports.getForum = async (req, res) => {
    try {
        const { rows : forum } = await db.query('SELECT * FROM main_forum')

        return res.status(200).json({
            success: true,
            mains: forum,
        })
        } catch (error) {
        console.log(error.message)
        }
    }

exports.addForum = async (req, res) => {
  try {
      const {title_main, body_main, date_main} = req.body
      const img_main = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename.replace(/\\/g, '/')
      await db.query(`INSERT INTO main_forum ( title_main, body_main, date_main, img_main ) VALUES ('${title_main}','${body_main}', '${date_main}', '${img_main}')`)

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

  exports.getForumbyId = async (req, res) => {
    try {
        const {id_main} = req.params
        const { rows : forum } = await db.query(`SELECT * FROM main_forum where id_main = ${id_main}`)
    
        return res.status(200).json({
            success: true,
            mains: forum,
        })
        } catch (error) {
        console.log(error.message)
        }
    }

  exports.updateForum = async (req, res) => {
    try {
      const { id_main } = req.params
      const {updateTitle_main, updateBody_main, updateDate_main} = req.body
      const { rows : forum } = await db.query(`UPDATE main_forum SET title_main='${updateTitle_main}', body_main='${updateBody_main}', date_main='${updateDate_main}' WHERE id_main = ${id_main}`)

      return res.status(200).json({
        success: true,
        mains: forum,
        message: 'Data has been edited',
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  exports.deleteForum = async (req, res) => {
    try {
        const { id_main } = req.params
        const { rows : forum } = await db.query(`delete from main_forum where id_main = ${id_main}`)
    
        return res.status(200).json({
            success: true,
            mains: forum,
        })
        } catch (error) {
        console.log(error.message)
        }
    }
  