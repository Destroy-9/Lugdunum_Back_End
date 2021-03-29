//Controllers for the main methods - used in routes/index.js

exports.rendering = (req, res, next) => {
    res.render('index', { title: 'Express'
    });
}

exports.createUser = (req, res, next) => {

}



