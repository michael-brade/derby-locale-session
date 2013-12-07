module.exports = function (app) {
  app.post('/locale/changeLocale', function (req, res, next) {
    req.session.locale = req.body.locale;
    next();
  });

  return function (req, res, next) {
    next();
  }
};