CodeGenius.Views.FollowsPanelItem = Backbone.View.extend({
  template: JST["users/follows_panel_item"],

  tagName: "li",

  className: "clearfix",

  initialize: function () {
    this.followButton = new CodeGenius.Views.FollowButton({model: this.model});
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));
    this.$el.append(this.followButton.render().$el);

    return this;
  },

  remove: function () {
    this.followButton.remove();
  }
});
