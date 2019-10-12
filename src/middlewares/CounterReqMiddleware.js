let numberOfRequests = 0;

export default (req, res, next) => {
    numberOfRequests++;
    console.log(`Número de requisições: ${numberOfRequests}`);

    next();
}