var pty = require('pty.js')
    , pty = require('pty.js')
    , sio = require('socket.io')
	// , Zones = require('../../tools/mongodb.js').getCollection('zones')

module.exports = function(server)
{
    var tid = 0
    
    sio.listen(server).sockets.on('connection', function(socket)
    {
        socket.on('createTerminal', function(term_id, func)
        {
            var name = term_id.split('§')[0]
            var zone_id = term_id.split('§')[1]
            
            term_id = tid++
            
            var term = pty.spawn('docker', ['-H', '101.251.243.38:8080', 'exec', '-it', 'ubuntu', '/bin/bash'], {cwd: '/'})
            
            .on('data', function(data){
                socket.emit('data'+ term_id, data)
            })
            .on('exit', function(){
                socket.emit('exit', {})
            })
            
            socket.on('data'+ term_id, function(data){ 
                term.write(data)
            })
            .on('resize'+term_id, function(data){
                term.resize(data.cols, data.rows)
            })
            .on('disconnect', function(){
                term.destroy()
            })
            
            func(term_id)
        })
    })
}
