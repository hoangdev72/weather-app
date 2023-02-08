var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  let url = process.env.API_KEY + '&q=hanoi'
  process.env.TZ = 'Asia/Bangkok'

  fetch(url)
    .then((res) => res.json())
    .then((weather) => {
      res.render('index', {
        title: 'Weather app | Home page',
        user: req.user,
        weather: weather,
      })
    })
    .catch((err) => console.error('error:' + err))
})

module.exports = router
