const multer = require("multer")
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/storage/files')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        // console.log(name);
        // const extension = path.extname(file.originalname)
        // const extension = 'ok'
        const fileName = `${Date.now()}-${name}`
        // console.log(fileName);
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

module.exports = upload