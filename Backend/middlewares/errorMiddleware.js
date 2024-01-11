const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl || req.url}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //Mongoose error handling
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export { notFound, errorHandler };
