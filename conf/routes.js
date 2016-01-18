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
var config = require('./config.js')
var dockerCommand = 'docker -H ' + config.endpoint + ' '


console.log(dockerCommand)
module.exports = function(app)
{	
	app.use(function(req, res, next){
		next()
	})
	
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '/../dist/', 'index.html'))
    })
    
    app.get('/desktop/:container_id', function(req, res){
        res.sendFile(path.join(__dirname, '/../dist/', 'index.html'))
    })
    
    app.post('/container/create', function(req, res)
    {
        var image = 'dhub.yunpro.cn/junjun16818/'+req.body.image
        var cmd = dockerCommand + ' run --label zone='+req.body.zone + ' -p 80 --name ' + req.body.name + ' -d -it ' + image + ' tail -f /etc/hosts'
        
        exec(cmd, function(err, stdout){
            if( err )
                return res.json(400, {error: err.toString()})
            else
                res.json(200, {})
        })
    })
    
    var ipMap = {
        '192.168.100.102': '118.193.87.2',
        '192.168.100.103': '118.193.87.3',
        '192.168.100.104': '118.193.87.4',
        '192.168.100.2': '101.251.243.38'
    }
    
    app.get('/container/list', function(req, res)
    {
        request.get('http://'+config.endpoint+'/containers/json', function(err, data, body)
        {
            if( err )
                return res.json(400, { err: err.toString() })
            
            body = JSON.parse(body)
            var list = []
            
            body.forEach(function(item){
                if( !item.Labels || !item.Labels.zone )
                    return 
                
                
                item.Ports.forEach(function(rec){
                    rec.IP = ipMap[rec.IP]
                })
                
                list.push({
                    id: item.Id,
                    name: item.Names[0].replace('/localhost/', ''),
                    status: item.Status,
                    port: item.Ports?item.Ports[0]: null,
                    image: item.Image
                })
            })
            
            res.json(200, list)
        }) 
    })
    
	app.post('/upload/:name', multipartMiddleware, function(req, res)
	{
		for( var key in req.files )
		{
			var cmd = dockerCommand + 'cp ' + req.files[key].path + ' '+req.params.name +':/root/'+req.files[key].name
			exec(cmd, function(err, stdout){
				if( err )
					return res.json(400, {error: err.toString()})
				else
					res.json(200, {})
			})
		}
	})
	
	app.get('/getFile/:name', function(req, res)
	{		
		res.writeHead(200, {
			'Content-Type' : req.query.type
		})
		
		return request.post({ url:'http://'+config.endpoint+'/containers/'+req.params.name+'/copy', json: { "Resource": req.query.url } }).pipe(tar.Parse()).pipe(res)
	})
    
	app.get('/unzip/:name', function(req, res)
	{
        var paths = req.query.path.split('/')
        paths.pop()
        paths = paths.join('/')+'/'
        
        console.log(dockerCommand + 'exec '+req.params.name+' unzip -o -d ' + paths + ' ' + req.query.path)
		exec(dockerCommand + 'exec '+req.params.name+' unzip -o -d ' + paths + ' ' + req.query.path, function(err, data){
			res.json(200, { body: data})
		})
	})
    
    
	app.post('/write/:name', function(req, res)
	{
        var filename = './tmp/file-'+parseInt(Math.random()*100+'')
        fs.writeFileSync(filename, req.body.body)
        
        var cmd = dockerCommand + 'cp ' + filename + ' '+req.params.name+':'+req.query.path
		
        console.log(cmd)
        exec(cmd, function(err, stdout){
            if( err )
                return res.json(400, {error: err.toString()})
            else
                res.json(200, {})
        })
	})
    
	app.post('/delete/:name', function(req, res)
	{
        console.log(dockerCommand + 'exec '+req.params.name+' rm -r ' + req.query.path)
		exec(dockerCommand + 'exec '+req.params.name+' rm -r ' + req.query.path, function(err, data){
			res.json(200, { body: data})
		})
	})
    
	// app.get('/cat/:name', function(req, res)
	// {
    //     console.log(dockerCommand + 'exec ubuntu cat '+ req.query.path)
	// 	exec(dockerCommand + 'exec ubuntu cat '+ req.query.path, function(err, data){
	// 		res.json(200, { body: data})
	// 	})
	// })
	// app.post('/rename/:name', function(req, res)
	// {
    //     var paths = req.query.path.split('/')
    //     paths.pop()
    //     paths = paths.join('/')+'/'+req.query.name
        
    //     console.log(dockerCommand + 'exec ubuntu mv ' + req.query.path + ' ' + paths)
	// 	exec(dockerCommand + 'exec ubuntu mv ' + req.query.path + ' ' + paths, function(err, data){
	// 		res.json(200, { body: data})
	// 	})
	// })
    
	// app.post('/touch/:name', function(req, res)
	// {
    //     console.log(dockerCommand + 'exec ubuntu touch ' + req.query.path)
	// 	exec(dockerCommand + 'exec ubuntu touch ' + req.query.path, function(err, data){
	// 		res.json(200, { body: data})
	// 	})
	// })
    
	// app.post('/cp/:name', function(req, res)
	// {
    //     console.log(dockerCommand + 'exec ubuntu cp -r ' + req.query.source + ' ' + req.query.to)
	// 	exec(dockerCommand + 'exec ubuntu cp -r ' + req.query.source + ' ' + req.query.to, function(err, data){
	// 		res.json(200, { body: data})
	// 	})
	// })
    
	// app.post('/mkdir/:name', function(req, res)
	// {
    //     console.log(dockerCommand + 'exec ubuntu mkdir ' + req.query.path)
	// 	exec(dockerCommand + 'exec ubuntu mkdir ' + req.query.path, function(err, data){
    //         if( err )
    //             console.log(err)
	// 		res.json(200, { body: data})
	// 	})
	// })
	// app.get('/ls/:name', function(req, res)
	// {
	// 	exec(dockerCommand + 'exec ubuntu bash -c "file '+ req.query.path + '/* --mime" ', function(err, data)
	// 	{
	// 		var list = []
			
	// 		data.split('\n').forEach(function(item, index)
	// 		{
	// 			item = item.replace(/ /g, '')
				
	// 			if( !item )
	// 				return
				
	// 			var str = item.split(':')
				
	// 			if( str[0].split('/').pop() === '*' )
	// 				return 
				
	// 			list.push({
	// 				type: str[1].split(';')[0],
	// 				name: str[0].split('/').pop(),
	// 				path: str[0]
	// 			})
	// 		})
	// 		res.json(200, list)
	// 	})
	// })
}
// request.get('http://www.baidu.com/', function(err, data, d){
//     console.log(d)
// })