CodeGenius.Views.NoteNew = CodeGenius.Views.NoteView.extend({
  template: JST["notes/note_new"],

  className: "annotation",

  events: {
    "click button.note-save": "save",
    "click button.note-cancel": "cancel",
  },

  initialize: function (options) {
    this.$placementEl = options.$placementEl;
    this.top = options.top;
    this.fileHeight = options.fileHeight;
  },

  render: function () {
    this.$el.html(this.template());
    this.setTop();
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

  setTop: function () {
    this.$el.css("top", this.maxTop());
  },

  maxTop: function () {
    return Math.min(this.top, this.fileHeight-this.$("form").height());
  },

  cancel: function (event) {
    event.preventDefault();
    this.remove();
  }
});
