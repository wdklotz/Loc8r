/* GET default home page */
module.exports.index = function(req, res) {
  res.render('index', { title: 'Express' }); // render view index.jade
};
