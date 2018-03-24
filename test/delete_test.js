const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let riza;
    beforeEach((done) => {
        riza = new User({ name: 'riza' });
        riza.save().then(() => done());
    });

    it('model instance remove', (done) => {
        riza.remove()
            .then(() => User.findOne({ name: 'riza' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        User.remove({ name: 'riza' })
            .then(() => User.findOne({ name: 'riza' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({ name: 'riza' })
        .then(() => User.findOne({ name: 'riza' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(riza._id)
        .then(() => User.findOne({ name: 'riza' }))
        .then((user) => {
            assert(user === null);
            done();
        });
    });
});