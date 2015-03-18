CodeGenius.Collections.Feed = Backbone.Collection.extend({
  model: CodeGenius.Models.FeedItem,

  url: function () {
    return "/api/users/" + this.user_id + "/feed?page=" + this.page;
  },

  initialize: function (options) {
    this.user_id = options.user_id;
    this.page = 1;
  },

  nextpage: function () {
    this.page++;
  },

  prevpage: function () {
    this.page > 1 && this.page--;
  }
});
