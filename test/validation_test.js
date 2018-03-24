const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required');
    });

    it('requires a user longer then 2 char', () => {
        const user = new User({ name: 'al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer then 2 characters');
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'al' });
        user.save()
        .then()
        .catch((validationResult) => {
            const { message} = validationResult.errors.name;
            assert(message === 'Name must be longer then 2 characters');
            done();
        });       
       
    });


});