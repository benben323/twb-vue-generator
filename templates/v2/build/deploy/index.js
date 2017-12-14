'use strict'

const upload = require('./upload')
const path = require('path')

upload(path.resolve(__dirname, '..', '..', 'dist'))
