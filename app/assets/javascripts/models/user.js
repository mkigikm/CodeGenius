CodeGenius.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  philes: function () {
    this._philes || (this._philes = new CodeGenius.Collections.Philes());
    return this._philes;
  },

  parse: function (payload) {
    if (payload.philes) {
      this.philes().add(payload.philes.map(function (phile) {
        return new CodeGenius.Models.Phile(phile)
      }), {merge: true});

      delete payload.philes;
    }

    return payload;
  }
});
