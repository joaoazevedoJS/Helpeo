const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads', 'points'),
    filename(req, file, cb) {
      const hash = crypto.randomBytes(12).toString('hex')

      const fileName = `${hash}_${file.originalname}`

      cb(null, fileName)
    }
  })
}
