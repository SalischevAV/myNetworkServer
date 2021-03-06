const Album = require('../Model').Album;

module.exports.getAll = (req, res, next) => {
    Album.countDocuments({}, (err, total_count)=>{
        Album.find({}).skip((req.query.page-1)*req.query.limit).limit(Number(req.query.limit)).sort({_id: -1}).exec((err, albums) => {
            if (albums) {
                res.status(200);
                res.json({total_count, albums});
            } else {
                next(err);
            }
        });
    });       
}

module.exports.get = (req, res, next)=>{
    Album.findById(req.params.id, (err, data)=>{
        if(data){
            res.status(200);
            res.json(data);
        }else {
            next(err);
        }
    });
};

module.exports.post = (req, res, next) =>{
    Album.create({
        userId: req.body.userId,
        title: req.body.title,
    }, (err, data)=>{
        if(data){
            res.status(201);
            res.set('Location', `${req.baseUrl}/${data.id}`);
            res.json(data);
        } else {
            next(err);
        }
    });
};

module.exports.delete = (req, res, next)=>{
    Album.findByIdAndDelete(req.params.id, (err, data)=>{
        if(data){
            res.status(204);
            res.end();
        } else{
            next(err);
        }
    })
}
