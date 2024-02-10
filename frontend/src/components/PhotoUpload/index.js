const AWS = require('aws-sdk')
const uuid = require('uuid')

const keyMaker = () => {
    return uuid.v4();
}

function photoUpload(image) {
    AWS.config.update({
        accessKeyId: 'AKIAQ3EGUVDX32FGXG7H',
        secretAccessKey: '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'
    })

    const uniqueKey = keyMaker()
    
    const s3 = new AWS.S3({
       
    })

    ACL: 'public-read',
    Body: fs.createReadStream(image),
    Key: uniqueKey,
    ContentType: 'application/octet-steam'
}

// AWS.config.update({
//     accessKeyId: 'AKIAQ3EGUVDX32FGXG7H',
//     secretAccessKey: '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'
// })

// const s3 = new AWS.S3({
//     ACL: 'public-read',
//     Body: fs.createReadStream('./test.jpg'),
// })