const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {

        const riza = new User({name:'rıza', posts: [{title: 'post1'},{title: 'post2'}]});

        riza.save()
        .then(() => User.findOne({name:'rıza'}))
        .then((user) => {
            assert(riza.postCount === 2);
            done();
        });
    });
});