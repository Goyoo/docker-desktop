#!/usr/bin/env node
/* global __dirname */
var debug = require('debug')('test:server')
	, http = require('http')
	, config = require('./conf/config.js')
	, port = config.port
	, express = require('express')
	// , logger = require('morgan')
	, cookieParser = require('cookie-parser')
	, bodyParser = require('body-parser')
	, app = express()
	, cookieSession = require('cookie-session')
	, path = require('path')
	, partials = require('express-partials')
	, routes = require('./conf/routes.js')
	, terminal = require('./server/manager/terminal.js')

app.engine('.html', require('ejs').__express)
app.set('views', __dirname + '/server/views')
app.set('view engine', 'html')

app.use(partials())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cookieSession({
  	name: 'session',
	httpOnly: false,
  	keys: ['key1', 'key2']
}))

app.use(express.static(path.join(__dirname, 'dist')))

routes(app)

var server = http.createServer(app)

console.log(port)
server.listen(port)
server.on('listening', onListening)

function onListening() {
    debug('Listening on port ' + server.address().port)
}

terminal(server)
