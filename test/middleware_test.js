const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');


describe('Middleware', () => {
    let riza, blogPost;

    beforeEach((done) => {
        riza = new User({ name: 'rıza' });
        blogPost = new BlogPost({ title: 'JS is great', content: 'Yep is really is' });

        riza.blogPosts.push(blogPost);

        Promise.all([riza.save(), blogPost.save()])
            .then(() => done());

    });

    it('users clean up dangling blogposts on remove', (done) => {
        riza.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });

});