import { createClient } from "redis";

const redisPublisher = createClient({
    url: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || "6379"}`,
});

redisPublisher.on("connect", () => {
    console.log("Connected to Redis Publisher");
});

redisPublisher.on("error", (err) => {
    console.error("Redis Publisher Error", err);
});

export default redisPublisher;
