CodeGenius.Views.NoteShow = Backbone.View.extend({
  template: JST["notes/note_show"],

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    this.$el.html(this.template({note: this.model}));
    return this;
  }
});
