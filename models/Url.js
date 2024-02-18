const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI);

const UrlSchema = new Schema({
    url: String,
});

const Url = mongoose.model('Url', UrlSchema);

const create = async (req_url, done) => {
    const url = new Url({
        url: req_url
    });

    try {
        const data = await url.save();
        done(null, data);
    } catch (err) {
        console.error(err);
        done(err, null);
    }
};

const find = async (id, done) => {
    try {
        const data = await Url.findById(id);
        done(null, data);
    } catch (err) {
        console.error(err);
        done(err, null);
    }
};

exports.UrlModel = Url;
exports.create = create;
exports.find = find;