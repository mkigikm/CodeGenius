CodeGenius.Collections.Feed = Backbone.Collection.extend({
  model: CodeGenius.Models.FeedItem,

  url: function () {
    return "/api/users/" + this.user_id + "/feed";
  },

  initialize: function (options) {
    this.user_id = options.user_id;
  }
});
