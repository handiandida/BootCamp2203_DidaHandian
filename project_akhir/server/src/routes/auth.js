const { Router } = require('express')

// Multer
const multer  = require('multer');
const bodyParser = require('body-parser')
const path = require('path');
const db = require('../db')

const express = require('express')

const app = express()
const cors = require('cors')
// End Multer

const {
  register,
  login,
  protected,
  logout,
} = require('../controllers/auth')
const {
  validationMiddleware,
} = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middlewares/auth-middleware')
const { 
  getUser, 
  deleteUser, 
  getUserbyId, 
  updateUser 
} = require('../controllers/users')
const { 
  getDiscussion, 
  deleteDiscussion,
  addDiscussion,
  updateDiscussion,
} = require('../controllers/discussion')
const {
  getForum, 
  addForum, 
  updateForum, 
  deleteForum, 
  getForumbyId,
} = require('../controllers/forum')
const {
  getSub, 
  addSub, 
  updateSub, 
  deleteSub,
  getSubbyId,
} = require('../controllers/sub')



const router = Router()

// Start Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
  cb(null, `image-${Date.now().toString()}` + '_' + file.originalname)
      //path.extname get the uploaded file extension
  }
});

const multerFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
    // upload only png and jpg format
    return cb(new Error('Please upload a Image'))
        }
    cb(null, true)   
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
// End Multer


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'))
// app.use('/public',express.static('./public'))
// app.use(express.static(path.join(__dirname, "public")));


//users
router.get('/users', getUser)
router.get('/users/:id_user', getUserbyId)
router.put('/users/:id_user', updateUser)
router.delete('/users/:id_user', deleteUser)

//main forum
router.get('/main-forum', getForum)
router.get('/main-forum/:id_main', getForumbyId)
router.post('/main-forum/add', this.upload.single('img_main'), addForum)
router.put('/main-forum/:id_main', updateForum)
router.delete('/main-forum/:id_main', deleteForum)

//sub forum
router.get('/sub-forum', getSub)
router.get('/sub-forum/:id_sub', getSubbyId)
router.post('/sub-forum/add', addSub)
router.put('/sub-forum/:id_sub', updateSub)
router.delete('/sub-forum/:id_sub', deleteSub)

//discussion
router.get('/discussion', getDiscussion)
router.delete('/discussion/:id_thread', deleteDiscussion)
router.post('/discussion/add', addDiscussion)
router.put('/discussion/:id_thread', updateDiscussion)
router.delete('/discussion/:id_thread', deleteDiscussion)

//auth
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

module.exports = router