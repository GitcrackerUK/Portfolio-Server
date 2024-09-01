const email = require('./Email/contact_email.js')
const data = require('./Email/AutoReply_DATA.js')
const MY_AutoReply_DATA = data.MY_AutoReply_DATA
const AutoReply_DATA = data.AutoReply_DATA
const router = require('express').Router()
const sendEmail = email.sendEmail
router.route('/').post((req, res) => {
    res.send(
        !req.body.Email ? `No email specified` : `Data received to a server.`
    )
    if (req.body.Email) {
        const senderEmail = req.body.Email
        const senderName = req.body.FirstName
        const senderMessage = req.body.Message
        sendEmail(senderEmail, AutoReply_DATA(senderName))
        sendEmail(process.env.MY_GMAIL, MY_AutoReply_DATA(senderName, senderEmail, senderMessage))
    }
})
module.exports = router