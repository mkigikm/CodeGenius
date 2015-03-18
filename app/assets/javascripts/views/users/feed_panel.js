CodeGenius.Views.FeedPanel = Backbone.View.extend({
  template: JST["users/feed_panel"],

  tagName: "section",

  className: "feed-panel",

  events: {
    "click a.feed-prev": "prev",
    "click a.feed-next": "next",
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.collection.fetch();
  },

  render: function () {
    this.$el.html(this.template({feed: this.collection}));

    return this;
  },

  prev: function () {
    this.collection.prevpage();
    this.collection.fetch();
  },

  next: function () {
    this.collection.nextpage();
    this.collection.fetch();
  }
});
