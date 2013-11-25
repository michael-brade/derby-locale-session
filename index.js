var _ = require('lodash')
  , locale = require('locale');

module.exports = function (app, options) {
  return {
    init: function () {
      return function (req, res, next) {
        var model = req.getModel()
          , prefferedLocales = req.headers['accept-language'].split(',')
          , supportedLocales = new locale.Locales(_.keys(model.get('$lang.translations')));

        prefferedLocales.unshift(req.session.locale || '');
        prefferedLocales = new locale.Locales(prefferedLocales);
        req.session.locale = prefferedLocales.best(supportedLocales).toString();
        model.set('_session.locale', req.session.locale);
        next();
      };
    },
    routes: function () {
      app.post('/language/changeLocale', function (req, res) {
        var model = req.getModel();
        var supportedLocales = _.keys(model.get('$lang.translations'));
        if (!req.body.locale) return res.send(400, {error: 'locale missing'});
        if (!_.contains(supportedLocales, req.body.locale)) return res.send(400, {error: 'unsupported locale'});
        req.session.locale = req.body.locale;
        res.send();
      });

      return function (req, res, next) {
        next();
      }
    }
  };
};