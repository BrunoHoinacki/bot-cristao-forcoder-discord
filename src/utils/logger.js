function log(level, ...args) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}]`, ...args);
}

module.exports = {
  info: (...args) => log("info", ...args),
  error: (...args) => log("error", ...args),
  warn: (...args) => log("warn", ...args)
};
