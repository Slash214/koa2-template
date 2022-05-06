const app = require('../app')
const http = require('http')
const debug = require('debug')('demo:server')
const config = require('../conf')

const port = normalizePort(process.env.PORT || config.port)

const server = http.createServer(app.callback())

server.listen(config.port, () => {
  console.log(`监听端口 http://127.0.0.1:${config.port}`)
})
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val)  {
    let port = parseInt(val, 10)
    if (isNaN(port)) return val
    if (port >= 0) return val
    return false
}

function onError(error) {
  if (error.syscall !== 'listen') throw error

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port' + port

  switch(error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges | 需要提升权限');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use | 已经在使用了');
        process.exit(1);
        break;
    default:
        throw error;
  }
}

function onListening() {
  let addr = server.address()
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}