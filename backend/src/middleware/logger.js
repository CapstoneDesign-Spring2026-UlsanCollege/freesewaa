const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    };
    
    if (res.statusCode >= 400) {
      console.error(`[ERROR] ${log.method} ${log.path} - ${res.statusCode} (${duration}ms)`);
    } else {
      console.log(`[INFO] ${log.method} ${log.path} - ${res.statusCode} (${duration}ms)`);
    }
  });
  
  next();
};

module.exports = logger;