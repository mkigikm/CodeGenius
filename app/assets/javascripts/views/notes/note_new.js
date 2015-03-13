CodeGenius.Views.NoteNew = CodeGenius.Views.NoteView.extend({
  template: JST["notes/note_new"],

  className: "annotation",

  events: {
    "click button.note-save": "save",
    "click button.note-cancel": "cancel",
  },

  initialize: function (options) {
    this.$placementEl = options.$placementEl;
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  save: function (event) {
    event.preventDefault();

    this.model.save({body: this.$("textarea").val()}, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate("#notes/" + this.model.id, {trigger: true});
      }.bind(this)
    });
  },

  cancel: function (event) {
    event.preventDefault();
    this.remove();
  }
});
