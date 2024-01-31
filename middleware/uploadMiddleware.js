const multer = require("multer")
// const uploadMiddleware = multer({dest: 'uploads/'});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
 const uploadMiddleware = multer({ 
    storage, 
})

module.exports = uploadMiddleware