const express = require("express");
const api = express();
const port = 3030;
const usersRouter = require("./routes/users");

api.use(express.json());
api.use(
    express.urlencoded({
        extended: true
    })
);

api.get("/", (req, res) => {
    res.json({ message: "ok" });
});
api.use("/users", usersRouter);
/**
 * Error handler middleware
 */
api.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
});

api.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
})