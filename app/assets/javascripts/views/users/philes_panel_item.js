CodeGenius.Views.PhilesPanelItem = Backbone.View.extend({
  template: JST["users/philes_panel_item"],

  tagName: "li",

  className: "clearfix",

  initialize: function (options) {
    this.displayControls = options.displayControls;
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.taggings(), "add", this.render);
  },

  render: function () {
    this.$el.html(this.template({
      phile: this.model,
      displayControls: this.displayControls
    }));

    return this;
  }
});
