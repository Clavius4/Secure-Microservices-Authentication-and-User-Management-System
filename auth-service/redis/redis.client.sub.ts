// import { createClient } from 'redis';
//
// // Create a Redis subscriber instance
// const redisSubscriber = createClient({
//     url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
// });
//
// // Connect to Redis
// redisSubscriber.connect().catch((err) => {
//     console.error('Redis Subscriber Connection Error:', err);
// });
//
// // Subscribe to channels and handle messages
// const initRedisSubscriber = () => {
//     redisSubscriber.on('message', (channel, message) => {
//         console.log(`Received message on channel "${channel}":`, message);
//
//         if (channel === 'user_created') {
//             handleUserCreated(JSON.parse(message));
//         }
//     });
//
//     // @ts-ignore
//     redisSubscriber.subscribe('user_created').then(() => {
//         console.log('Subscribed to channel: user_created');
//     }).catch((err) => {
//         console.error('Error subscribing to channel:', err);
//     });
// };
//
// // Define how to handle incoming user_created messages
// const handleUserCreated = (data: { userId: string; email: string }) => {
//     console.log('Processing user_created event:', data);
// };
//
//
// const shutdownRedisSubscriber = async () => {
//     try {
//         console.log('Disconnecting Redis Subscriber...');
//         await redisSubscriber.quit();
//         console.log('Redis Subscriber disconnected.');
//     } catch (error) {
//         console.error('Error during Redis Subscriber disconnection:', error);
//     }
// };
//
// export { initRedisSubscriber, redisSubscriber, shutdownRedisSubscriber };
//
