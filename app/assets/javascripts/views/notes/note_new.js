CodeGenius.Views.NoteNew = Backbone.View.extend({
  template: JST["notes/note_new"],

  className: "annotation",

  events: {
    "click button.note-save": "save",
    "click button.note-cancel": "cancel",
    "click .annotation-start > a": "startAnnotation"
  },

  initialize: function (options) {
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

  startAnnotation: function (event) {
    event.preventDefault();
    if (this.collection.overlaps(this.model)) {
      alert("annotations cannot overlap");
    } else {
      this.$el.children().toggleClass("hidden");
      this.setTop();
    }
  },

  cancel: function (event) {
    event.preventDefault();
    this.remove();
  },

  setTop: function () {
    this.$el.css("top", this.maxTop());
  },

  maxTop: function () {
    return Math.min(this.top, this.fileHeight -
        this.$("> :not(.hidden)").height());
  }
});
