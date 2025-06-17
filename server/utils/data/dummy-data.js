const { hash } = require('../helpers/index.js');

const person_data = [
  { name: 'Sheldon Cooper', email: 'sheldon@example.com', password: hash('123456'), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: 'Leonard Hofstadter', email: 'leonard@example.com', password: hash('123456'), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: 'Penny', email: 'penny@example.com', password: hash('123456'), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: 'Howard Wolowitz', email: 'howard@example.com', password: hash('123456'), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: 'Rajesh Koothrappali', email: 'raj@example.com', password: hash('123456'), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: 'Bernadette Rostenkowski', email: 'bernadette@example.com', password: hash('123456'), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: 'Amy Farrah Fowler', email: 'amy@example.com', password: hash('123456'), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
];

const data = { person_data };

module.exports = data;
