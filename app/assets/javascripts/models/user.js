CodeGenius.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  philes: function () {
    this._philes || (this._philes = new CodeGenius.Collections.Philes({
      user_id: this.id
    }));
    return this._philes;
  },
  
  feed: function () {
    this._feed || (this._feed = new CodeGenius.Collections.Feed({
      user_id: this.id
    }));
    return this._feed;
  },

  follows: function () {
    this._follows || (this._follows = new CodeGenius.Collections.Users());
    return this._follows;
  },

  parse: function (payload) {
    if (payload.follows) {
      this.follows().add(payload.follows.map(function (user) {
        return new CodeGenius.Models.User(user)
      }), {merge: true});

      delete payload.followings;
    }

    return payload;
  },

  toJSON: function () {
    return {user: _.clone(this.attributes)};
  }
});
