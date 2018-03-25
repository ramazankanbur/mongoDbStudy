const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');


describe('Associations', () => {
    let riza, blogPost, comment;

    beforeEach((done) => {
        riza = new User({ name: 'rıza' });
        blogPost = new BlogPost({ title: 'JS is great', content: 'Yep is really is' });
        comment = new Comment({ content: 'Congrats on great post' });

        riza.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = riza;

        Promise.all([riza.save(), blogPost.save(), comment.save()])
            .then(() => done());

    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'rıza' })
            .populate('blogPosts')
            .then(user => {
                assert(user.blogPosts[0].title === 'JS is great');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'rıza' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }

                }
            })
            .then((user) => {
               assert(user.blogPosts[0].comments[0].user.name === 'rıza')
                done();
            });

    });
});