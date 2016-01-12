
export function routes(app)
{	
	app.use(function(req, res, next){
		// console.log(req.cookies)
		
		// req.session.user = { "_id" : "62b9d6553a27ac04", "username" : "junjun16818", "email" : "junjun16818@hotmail.com", "password" : "wenlai" }
		next()
	})
	
	
	app.get('/a', function(req, res){
		res.end('aaaaabb')
	})
}
