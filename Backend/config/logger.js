import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

// Color map for levels
const levelColors = {
  error: '\x1b[31m',   // red
  warn: '\x1b[33m',    // yellow
  info: '\x1b[36m',    // cyan
  http: '\x1b[35m',    // magenta
  debug: '\x1b[32m',   // green
  reset: '\x1b[0m',
};

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),

  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const color = levelColors[level] || '';
    const reset = levelColors.reset;

    // Known context keys
    const parts = [];
    const ctxKeys = ['id', 'method', 'url', 'status', 'durationMs', 'length', 'authUser', 'host', 'port'];

    ctxKeys.forEach((key) => {
      if (typeof meta[key] !== 'undefined') {
        parts.push(`${key}=${meta[key]}`);
        delete meta[key];
      }
    });

    // Inline context
    const ctxInline = parts.length ? `  ${parts.join('  ')}` : '';

    // Remaining meta printed in pretty JSON
    const rest = Object.keys(meta).length ? `\n    ${JSON.stringify(meta, null, 2)}` : '';

    // Final beautiful log line
    return `${timestamp}  ${color}${level.toUpperCase()}${reset}  ${message}${ctxInline}${rest}`;
  })
);

export const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});

export default logger;
