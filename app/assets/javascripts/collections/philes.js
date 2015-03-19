CodeGenius.Collections.Philes = Backbone.Collection.extend({
  model: CodeGenius.Models.Phile,

  url: function () {
    return "/api/users/" + this.user_id + "/philes?page=" + this.page +
        "&prefix=" + this.prefix;
  },

  initialize: function (options) {
    this.user_id = options.user_id;
    this.page = 1;
    this.prefix = "";
  },

  nextpage: function () {
    this.page++;
  },

  prevpage: function () {
    this.page > 1 && this.page--;
  },

  search: function (prefix) {
    this.prefix = prefix;
  }
});
