"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.person_data = void 0;
const helpers_1 = require("@/utils/helpers");
const person_data = [
    {
        name: 'Sheldon Cooper',
        email: 'sheldon@example.com',
        password: (0, helpers_1.hash)('123456'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
    },
    {
        name: 'Leonard Hofstadter',
        email: 'leonard@example.com',
        password: (0, helpers_1.hash)('123456'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
    },
    {
        name: 'Penny',
        email: 'penny@example.com',
        password: (0, helpers_1.hash)('123456'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
    },
    {
        name: 'Howard Wolowitz',
        email: 'howard@example.com',
        password: (0, helpers_1.hash)('123456'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
    },
    {
        name: 'Rajesh Koothrappali',
        email: 'raj@example.com',
        password: (0, helpers_1.hash)('123456'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
    },
    {
        name: 'Bernadette Rostenkowski',
        email: 'bernadette@example.com',
        password: (0, helpers_1.hash)('123456'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
    },
    {
        name: 'Amy Farrah Fowler',
        email: 'amy@example.com',
        password: (0, helpers_1.hash)('123456'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
    },
];
exports.person_data = person_data;
//# sourceMappingURL=dummy-data.js.map