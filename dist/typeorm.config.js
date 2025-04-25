"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const task_entity_1 = require("./src/tasks/task.entity");
const userDataPath = electron_1.app.getPath('userData');
const dbPath = path_1.default.join(userDataPath, 'tasks.db');
exports.typeOrmConfig = {
    type: 'sqlite',
    database: dbPath,
    entities: [task_entity_1.Task],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map