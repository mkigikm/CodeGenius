CodeGenius.Views.PhileModal = Backbone.View.extend({
  template: JST["users/phile_modal"],

  events: {
    "click .modal-overlay": "remove",
    "click a": "remove"
  },

  render: function () {
    this.$el.html(this.template({phile: this.model}));
    return this;
  }
});
