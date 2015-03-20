CodeGenius.Views.NoteRevisionModal = Backbone.View.extend({
  template: JST["notes/revision_modal"],

  events: {
    "click .modal-overlay": "remove",
    "click a": "remove"
  },

  render: function () {
    this.$el.html(this.template({note: this.model}));
    return this;
  }
});
