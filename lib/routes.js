module.exports = function (app) {
  return function () {
    app.post('/locale/session/change', function (req, res) {
      req.session.locale = req.body.locale;
      res.send();
    });

    return function (req, res, next) {
      next();
    }
  }
};