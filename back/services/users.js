const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, email, firstname, lastname, birthdate, created_at, updated_at FROM user LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    
    return {
        data,
        meta
    };
}

async function create(user) {
    const result = await db.query(
        `INSERT INTO user (email, password, firstname, lastname, birthdate, created_at, updated_at) VALUES ('${user.email}', '${user.password}', '${user.firstname}', '${user.lastname}', '${user.birthdate}', NOW(), NOW())`
    );

    let message = 'Error in creating user!';

    if (result.affectedRows) {
        message = 'User created successfully!';
    }

    return {message};
}

async function update(id, user) {
    const result = await db.query(
        `UPDATE user SET email='${user.email}', password='${user.password}', firstname='${user.firstname}', lastname='${user.lastname}', birthdate='${user.birthdate}', updated_at=NOW() WHERE id=${id}`
    );

    let message = 'Error in updating user!';
    
    if (result.affectedRows) {
        message = 'User updated successfully!';
    }

    return {message};
}

module.exports = {
    getMultiple,
    create,
    update
}