CodeGenius.Views.FeedPanel = Backbone.View.extend({
  template: JST["users/feed_panel"],

  tagName: "section",

  className: "feed-panel",

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.collection.fetch();
  },

  render: function () {
    this.$el.html(this.template({feed: this.collection}));

    return this;
  }
});
