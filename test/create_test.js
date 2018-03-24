const assert = require('assert');
const User = require('../src/user');
const mongoose = require('mongoose');



describe('Creating records', () => {
    it('saves a user', (done) => {
        const riza = new User({ name: 'Mona Rıza' });
        riza.save()
            .then(() => {
                assert(!riza.isNew);
                done();
            });
    });

   
});