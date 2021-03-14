const express = require('express')
const path = require('path')
const auth = require('http-auth')
const {check, validationResult} = require('express-validator')
const RegistrationModel = require('../models/Registration')
const router = express.Router()

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
})

router.get('/', function (req, res, next) {
    res.render('form', {title: 'Registration Form'})
})

router.post('/', [
    check('name')
        .isLength({min: 1})
        .withMessage('Please enter a name'),
    check('email')
        .isLength({min: 1})
        .withMessage('Please enter an email')
], (req, res) => {
    console.log(req.body)

    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const registration = new RegistrationModel(req.body)
        registration.save()
            .then(() => {
                res.send('Thank you for your registration!')
            })
            .catch((err) => {
                console.log({err})
                res.send('Sorry! Something went wrong with Registration API')
            })

    } else {
        res.render('form', {
            title: 'Registration form',
            errors: errors.array(),
            data: req.body
        })
    }
})

router.get('/registrations', basic.check((req, res) => {

        RegistrationModel.find()
            .then((registrations) => {
                res.render('index', {title: 'Listening registrations', registrations})
            })
            .catch(() => {
                res.send('Sorry! Something went wrong while we were retrieving the registration from the database')
            })
    })
)
module.exports = router