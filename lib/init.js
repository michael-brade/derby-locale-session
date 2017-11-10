module.exports = function () {
  return function () {
    return function (req, res, next) {
      var model = req.model;
      if (!model) return next();
      model.push('$locale.preferred', req.session.locale);
      model.set('_session.locale', req.session.locale);
      next();
    };
  }
};
