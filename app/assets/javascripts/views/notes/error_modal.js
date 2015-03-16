CodeGenius.Views.ErrorModal = Backbone.View.extend({
  template: JST["notes/error_modal"],

  events: {
    "click .modal-overlay": "remove",
    "click a": "remove"
  },

  render: function () {
    console.log("rendered")
    this.$el.html(this.template());
    return this;
  }
});
