// module.exports = {
// 	port: 8088,
//     endpoint: process.env.ENDPOENT || '101.251.243.38:8080'
// }
module.exports = {
	port: 8088,
    endpoint: process.env.DOCKER_HOST || '127.0.0.1:8080'
}
