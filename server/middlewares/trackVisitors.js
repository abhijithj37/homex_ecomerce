
// Create a MongoDB schema and model for visitors
// const visitorSchema = new mongoose.Schema({
//   ip: String,
//   userAgent: String,
//   visits: Number,
// });
const Visitor = require('../models/visitor')


const trackVisitors = async (req, res, next) => {
    const { ip } = req;
    const userAgent = req.get('User-Agent');
    try {
        // Check if the visitor exists in the database
        const existingVisitor = await Visitor.findOne({ ip });
        if (!existingVisitor) {
            // If the visitor doesn't exist, create a new record
            await Visitor.create({ ip, userAgent, visits: 1 });
        } else {
            // If the visitor exists, update the visits count
            await Visitor.updateOne({ ip }, { $inc: { visits: 1 } });
        }
        next();
    } catch (error) {
        console.error('Error tracking visitor:', error);
        next();
    }
};



module.exports = { trackVisitors } 