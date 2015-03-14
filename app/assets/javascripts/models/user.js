CodeGenius.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  philes: function () {
    this._philes || (this._philes = new CodeGenius.Collections.Philes());
    return this._philes;
  },

  follows: function () {
    this._follows || (this._follows = new CodeGenius.Collections.Users());
    return this._follows;
  },

  parse: function (payload) {
    if (payload.philes) {
      this.philes().add(payload.philes.map(function (phile) {
        return new CodeGenius.Models.Phile(phile)
      }), {merge: true});

      delete payload.philes;
    }

    if (payload.follows) {
      this.follows().add(payload.follows.map(function (user) {
        return new CodeGenius.Models.User(user)
      }), {merge: true});

      delete payload.followings;
    }

    return payload;
  }
});