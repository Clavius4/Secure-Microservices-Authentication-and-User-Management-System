"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const node_path_1 = __importDefault(require("node:path"));
const routes_1 = __importDefault(require("./routes"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
// Initialize the database connection
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
// View engine setup
app.set('views', node_path_1.default.join(node_path_1.default.resolve(), 'views'));
app.set('view engine', 'pug');
// Middleware setup
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(node_path_1.default.join(node_path_1.default.resolve(), 'public')));
// Routes setup
app.use('/', routes_1.default);
app.use('/users', users_1.default);
// 404 error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// General error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
