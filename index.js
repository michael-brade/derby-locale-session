module.exports = function (app, options) {
  return {
    init: function () {
      return function (req, res, next) {
        var model = req.getModel();
        model.push('$locale.preferred', req.session.locale);
        model.set('_session.locale', req.session.locale);
        next();
      };
    },
    routes: function () {
      app.post('/locale/changeLocale', function (req, res, next) {
        req.session.locale = req.body.locale;
        next();
      });

      return function (req, res, next) {
        next();
      }
    }
  };
};