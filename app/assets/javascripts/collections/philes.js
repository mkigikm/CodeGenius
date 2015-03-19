CodeGenius.Collections.Philes = Backbone.Collection.extend({
  model: CodeGenius.Models.Phile,

  url: function () {
    return "/api/users/" + this.user_id + "/philes?page=" + this.page +
        "&query=" + this.query;
  },

  initialize: function (options) {
    this.user_id = options.user_id;
    this.page = 1;
    this.query = "";
  },

  nextpage: function () {
    this.page++;
  },

  prevpage: function () {
    this.page > 1 && this.page--;
  },

  search: function (query) {
    this.query = query;
    this.page = 1;
  }
});
