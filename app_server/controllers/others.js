/* GET about page */
module.exports.about = function(req, res) {
  res.render('generic_text', { title: 'About' }); // render view generic_text.jade
};
