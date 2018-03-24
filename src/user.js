const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    name: {
        type: String,
        validate: {
            validator: name => name.length > 2,
            message: 'Name must be longer then 2 characters'
        },
        required: [true, 'Name is required']
    },
    postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;