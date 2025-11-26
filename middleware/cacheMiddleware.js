const Redis = require('ioredis');
const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
});
const cacheMiddleware = async (req, res, next) => {
    const cacheKey = req.originalUrl;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        // Cache Hit
        console.log('✅ Cache Hit:', cacheKey);
        return res.send(JSON.parse(cachedData));
    }
    // Cache Miss
    console.log('⚡ Cache Miss:', cacheKey);
    res.sendResponse = res.send;
    res.send = async (body) => {
        await redisClient.set(cacheKey, JSON.stringify(body), 'EX', 10);
        res.sendResponse(body);
    };

    next();
};

module.exports = { cacheMiddleware, redisClient };
