const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let riza;

    beforeEach((done) => {
        riza = new User({ name: 'riza' });
        riza.save()
            .then(() => done())
    });

    it('finds all users with name of riza', (done) => {
         User.find({ name: 'riza'}).then((users) => {
             // typeof _id is object. for assertition we need to convert to string
            assert(users[0]._id.toString() === riza._id.toString());
            done();
         });
       
    });

    it('find a user with a particular id', (done) => {
        User.findOne({_id: riza._id})
        .then((user) => {
            assert(user.name === 'riza');
            done();
        });

    });
});