const express = require('express')
const passport = require('passport')
const User = require('../models/user')

exports.create = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
})

exports.destroy = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
}

exports.signUp = passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/',
})
