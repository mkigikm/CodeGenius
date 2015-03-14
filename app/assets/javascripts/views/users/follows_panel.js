CodeGenius.Views.FollowsPanel = Backbone.View.extend({
  template: JST["users/follows_panel"],

  tagName: "section",

  className: "follows-panel",

  render: function () {
    this.$el.html(this.template({user: this.model}));
    return this;
  }
});
