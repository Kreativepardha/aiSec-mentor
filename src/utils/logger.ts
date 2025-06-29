import winston, { addColors, createLogger, format, transports } from "winston"
import util from "util"



const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    http: 'magenta',
    debug: 'blue'
}


addColors(logColors)

const consoleFormat = format.printf(({ level, message, timestamp, ...rest}) => {
    const colorizer = winston.format.colorize()
    const safeTimestamp = timestamp || new Date().toISOString()
    const safeMessage = typeof message === 'string' ? message : util.inspect(message, { depth: null, colors: true})

     const meta = rest[Symbol.for('splat')]?.[0] ?? {}
     const metaString = Object.keys(meta).length
         ? `\nMETA: ${util.inspect(meta, { depth: null })}`
        : ''

    return colorizer.colorize(level, `${level.toUpperCase()} -- [${safeTimestamp}] ${safeMessage} ${metaString}`)
})

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  defaultMeta: { service: 'ai-security-mentor' },
  format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), consoleFormat),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
})

export default logger