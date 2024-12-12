const mongoose = require('mongoose');
const { DefaultTime } = require('../../config/defaultValues');

const shortLinkSchema = new mongoose.Schema({
    linkName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    shortLink: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        default: DefaultTime.ONE_MINUTE
    },
    isActive: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    clickCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

// Add a pre-save hook to update the updatedAt field
shortLinkSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('ShortLink', shortLinkSchema);
