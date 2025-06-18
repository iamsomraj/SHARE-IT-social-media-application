"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
require("./config/db-config");
const error_1 = require("@/middlewares/error");
const environments_1 = require("@/utils/constants/environments");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const corsOrigins = [
    environments_1.IS_PRODUCTION
        ? process.env.PRODUCTION_CLIENT_ORIGIN
        : process.env.DEVELOPMENT_CLIENT_ORIGIN,
].filter((origin) => Boolean(origin));
app.use((0, cors_1.default)({
    origin: corsOrigins.length > 0 ? corsOrigins : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((_req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    next();
});
const personRoutes_1 = __importDefault(require("@/routes/personRoutes"));
const postRoutes_1 = __importDefault(require("@/routes/postRoutes"));
const authRoutes_1 = __importDefault(require("@/routes/authRoutes"));
app.use('/api/v1/persons', personRoutes_1.default);
app.use('/api/v1/posts', postRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
app.get('/', (_req, res) => {
    res.json({
        message: 'SHARE IT Social Media API is running',
        version: '2.1.0',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
    });
});
app.use(error_1.pageNotFound);
app.use(error_1.errorHandler);
const PORT = parseInt(process.env.PORT || '4500', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';
const server = app.listen(PORT, () => {
    console.log(colors_1.default.bold.blue.bgWhite(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`));
    console.log(colors_1.default.bold.green(`📱 API URL: http://localhost:${PORT}`));
    console.log(colors_1.default.bold.cyan(`🏥 Health Check: http://localhost:${PORT}/health`));
});
const gracefulShutdown = (signal) => {
    console.log(colors_1.default.yellow(`${signal} signal received. Closing HTTP server.`));
    server.close(() => {
        console.log(colors_1.default.green('HTTP server closed successfully.'));
        process.exit(0);
    });
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (error) => {
    console.error(colors_1.default.red('Uncaught Exception:'), error.message);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    console.error(colors_1.default.red('Unhandled Promise Rejection:'), reason);
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=index.js.map