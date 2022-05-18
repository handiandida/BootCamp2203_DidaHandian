const db = require('../db')

exports.getSub = async (req, res) => {
    try {
      const { rows : sub } = await db.query('SELECT * FROM sub_forum')

        return res.status(200).json({
            success: true,
            subs: sub,
        })
        } catch (error) {
        console.log(error.message)
        }
    }
    exports.addSub = async (req, res) => {
      try {
          const {title_sub, body_sub, date_sub, id_main} = req.body
          // const img_main = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename.replace(/\\/g, '/')
          await db.query(`INSERT INTO sub_forum ( title_sub, body_sub, date_sub, id_main ) VALUES ('${title_sub}','${body_sub}', '${date_sub}', '2')`)
    
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
    
      exports.getSubbyId = async (req, res) => {
        try {
            const {id_sub} = req.params
            const { rows : sub } = await db.query(`SELECT * FROM sub_forum where id_sub = ${id_sub}`)
        
            return res.status(200).json({
                success: true,
                subs: sub,
            })
            } catch (error) {
            console.log(error.message)
            }
        }
    
      exports.updateSub = async (req, res) => {
        try {
          const {id_sub} = req.params
          const {updateTitle_sub, updateBody_sub, updateDate_sub} = req.body
          const { rows : sub } = await db.query(`UPDATE sub_forum SET title_sub='${updateTitle_sub}', body_sub='${updateBody_sub}', date_sub='${updateDate_sub}' WHERE id_sub = ${id_sub}`)
    
          return res.status(200).json({
            success: true,
            subs: sub,
            message: 'Data has been edited',
          })
        } catch (error) {
          console.log(error.message)
          return res.status(500).json({
            error: error.message,
          })
        }
      }
    
      exports.deleteSub = async (req, res) => {
        try {
            const { id_sub } = req.params
            const { rows : sub } = await db.query(`delete from main_forum where id_sub = ${id_sub}`)
        
            return res.status(200).json({
                success: true,
                subs: sub,
            })
            } catch (error) {
            console.log(error.message)
            }
        }