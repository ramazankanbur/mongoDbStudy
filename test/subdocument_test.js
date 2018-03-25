const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocumnet', (done) => {
        const riza = new User({
            name: 'rıza',
            posts: [{ title: 'Post1' }, { title: 'post2' }]
        });

        riza.save()
            .then(() => User.findOne({ name: 'rıza' }))
            .then((user) => {
                assert(user.posts[0].title === 'Post1');
                done();
            });
    });


    it('can add subdocuments to an existing record', (done) => {
        const riza = new User({
            name: 'rıza',
            posts: []
        });

        riza.save()
            .then(() => User.findOne({ name: 'rıza' }))
            .then((user) => {
                user.posts.push({ title: 'post1' });
                return user.save();
            })
            .then(() => User.findOne({ name: 'rıza' }))
            .then((user) => {
                assert(user.posts[0].title === 'post1');
                done();
            });

    });

    it('can remove an existing subdocument', (done) => {
        const riza = new User({
            name: 'rıza',
            posts: [{ title: 'post1' }, { title: 'post2' }]
        });

        riza.save()
            .then(() => User.findOne({ name: 'rıza' }))
            .then((user) => {
                 user.posts[0].remove();
                 return user.save();
            })
            .then(() => User.findOne({name: 'rıza'}))
            .then(user => {
                assert(user.posts.length === 1);
                done();
            });
    });

});