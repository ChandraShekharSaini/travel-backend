import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
