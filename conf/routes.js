/* global __dirname */
'use strict';

var path = require('path')
var ejs = require('ejs')
var fs = require('fs')
var K8s = require('k8s')
var request = require('request')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var exec = require('child_process').exec
var tar =  require('tar')
var dockerCommand = 'docker -H 101.251.243.38:8080 '

module.exports = function(app)
{	
	app.use(function(req, res, next){
		next()
	})
	
	app.post('/upload', multipartMiddleware, function(req, res)
	{
		for( var key in req.files )
		{
			var cmd = dockerCommand + 'cp ' + req.files[key].path + ' ubuntu:/root/'+req.files[key].name
			console.log(cmd)
			exec(cmd, function(err, stdout){
				if( err )
					return res.json(400, {error: err.toString()})
				else
					res.json(200, {})
			})
		}
	})
	
	app.get('/getFile', function(req, res)
	{		
		res.writeHead(200, {
			'Content-Type' : req.query.type
		})
		
		return request.post({ url:'http://101.251.243.38:8080/containers/0579d58fc445/copy', json: { "Resource": req.query.url } }).pipe(tar.Parse()).pipe(res)
	})
    
	app.get('/cat/:name', function(req, res)
	{
        console.log(dockerCommand + 'exec ubuntu cat '+ req.query.path)
		exec(dockerCommand + 'exec ubuntu cat '+ req.query.path, function(err, data){
			res.json(200, { body: data})
		})
	})
    
	app.get('/unzip/:name', function(req, res)
	{
        var paths = req.query.path.split('/')
        paths.pop()
        paths = paths.join('/')+'/'
        
        console.log(dockerCommand + 'exec ubuntu unzip -o -d ' + paths + ' ' + req.query.path)
		exec(dockerCommand + 'exec ubuntu unzip -o -d ' + paths + ' ' + req.query.path, function(err, data){
			res.json(200, { body: data})
		})
	})
    
	app.post('/rename/:name', function(req, res)
	{
        var paths = req.query.path.split('/')
        paths.pop()
        paths = paths.join('/')+'/'+req.query.name
        
        console.log(dockerCommand + 'exec ubuntu mv ' + req.query.path + ' ' + paths)
		exec(dockerCommand + 'exec ubuntu mv ' + req.query.path + ' ' + paths, function(err, data){
			res.json(200, { body: data})
		})
	})
    
	app.post('/delete/:name', function(req, res)
	{
        console.log(dockerCommand + 'exec ubuntu rm -r ' + req.query.path)
		exec(dockerCommand + 'exec ubuntu rm -r ' + req.query.path, function(err, data){
			res.json(200, { body: data})
		})
	})
    
	app.post('/touch/:name', function(req, res)
	{
        console.log(dockerCommand + 'exec ubuntu touch ' + req.query.path)
		exec(dockerCommand + 'exec ubuntu touch ' + req.query.path, function(err, data){
			res.json(200, { body: data})
		})
	})
    
	app.post('/cp/:name', function(req, res)
	{
        console.log(dockerCommand + 'exec ubuntu cp -r ' + req.query.source + ' ' + req.query.to)
		exec(dockerCommand + 'exec ubuntu cp -r ' + req.query.source + ' ' + req.query.to, function(err, data){
			res.json(200, { body: data})
		})
	})
    
	app.post('/mkdir/:name', function(req, res)
	{
        console.log(dockerCommand + 'exec ubuntu mkdir ' + req.query.path)
		exec(dockerCommand + 'exec ubuntu mkdir ' + req.query.path, function(err, data){
            if( err )
                console.log(err)
			res.json(200, { body: data})
		})
	})
    
	app.post('/write/:name', function(req, res)
	{
        var filename = './tmp/file-'+parseInt(Math.random()*100+'')
        fs.writeFileSync(filename, req.body.body)
        
        var cmd = dockerCommand + 'cp ' + filename + ' ubuntu:'+req.query.path
		
        console.log(cmd)
        exec(cmd, function(err, stdout){
            if( err )
                return res.json(400, {error: err.toString()})
            else
                res.json(200, {})
        })
	})
    
	app.get('/ls/:name', function(req, res)
	{
		exec(dockerCommand + 'exec ubuntu bash -c "file '+ req.query.path + '/* --mime" ', function(err, data)
		{
			var list = []
			
			data.split('\n').forEach(function(item, index)
			{
				item = item.replace(/ /g, '')
				
				if( !item )
					return
				
				var str = item.split(':')
				
				if( str[0].split('/').pop() === '*' )
					return 
				
				list.push({
					type: str[1].split(';')[0],
					name: str[0].split('/').pop(),
					path: str[0]
				})
			})
			res.json(200, list)
		})
	})
}
