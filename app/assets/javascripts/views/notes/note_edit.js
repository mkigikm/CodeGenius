CodeGenius.Views.NoteEdit = Backbone.View.extend({
  template: JST["notes/note_edit"],

  render: function () {
    this.$el.html(this.template({note: this.model}));
    return this;
  }
});
