var pty = require('pty.js')
    , pty = require('pty.js')
    , sio = require('socket.io')
    , config = require('../../conf/config.js')
    
module.exports = function(server)
{
    var tid = 0
    
    sio.listen(server).sockets.on('connection', function(socket)
    {
        socket.on('createTerminal', function(term_id, func)
        {
            var name = term_id.split('§')[0]
            
            term_id = tid++
            console.log('docker', ['-H', config.endpoint, 'exec', '-it', name, '/bin/bash'].join(' '))
            var term = pty.spawn('docker', ['-H', config.endpoint, 'exec', '-it', name, '/bin/bash'], {cwd: '/'})
            // console.log('docker', ['-H', config.endpoint, 'exec', '-it', name, '/bin/bash'])
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
