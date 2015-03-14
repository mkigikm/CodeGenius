CodeGenius.Views.UserShow = Backbone.View.extend({
  template: JST["users/user_show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.philesView = new CodeGenius.Views.PhilesPanel({model: this.model});
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));

    this.$tabs = this.$(".main-panel");
    this.$tabs.append(this.philesView.render().$el);

    return this;
  }
});
