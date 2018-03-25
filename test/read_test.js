const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let riza, samet, ayse, fatma;


    beforeEach((done) => {
        riza = new User({ name: 'riza' });
        samet = new User({ name: 'samet' });
        ayse = new User({ name: 'ayse' });
        fatma = new User({ name: 'fatma' });

        Promise.all([riza.save(), samet.save(), ayse.save(), fatma.save()])
            .then(() => done());
    });

    it('finds all users with name of riza', (done) => {
        User.find({ name: 'riza' }).then((users) => {
            // typeof _id is object. for assertition we need to convert to string
            assert(users[0]._id.toString() === riza._id.toString());
            done();
        });

    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: riza._id })
            .then((user) => {
                assert(user.name === 'riza');
                done();
            });

    });

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then(users => {
                assert(users.length === 2);
                assert(users[0].name === 'fatma');
                assert(users[1].name === 'riza');
                done();
            })
    });
});