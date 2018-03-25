const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let riza;

    beforeEach((done) => {
        riza = new User({ name: 'rıza', likes: 0 });
        riza.save().then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then(users => {
                assert(users.length === 1);
                assert(users[0].name = 'monarıza');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        // not saved to db yet         
        riza.set('name', 'mona rıza');
        assertName(riza.save(), done);

    });

    it('A model instance can update', (done) => {
        assertName(riza.update({ name: 'monarıza' }), done);
    });

    it('A model class can update ', (done) => {
        assertName(User.update({ name: 'riza' }, { name: 'monarıza' }), done);
    });

    it('A model class can update one record', (done) => {
        assertName(User.findOneAndUpdate({ name: 'riza' }, { name: 'monarıza' }), done);
    });

    it('A model class can find a record with Id and update', (done) => {
        assertName(User.findByIdAndUpdate(riza._id, { name: 'monarıza' }), done);
    });

    it('A user can have their likes incremented by 1', (done) => {
        //mongo update operators
        User.update({ name: 'rıza' }, { $inc: { likes: 1 } })
            .then(() =>  User.findOne({ name: 'rıza' }) )
            .then((user) => {
                assert(user.likes === 1);
                done();
            });

    });
});