CodeGenius.Views.NoteShow = CodeGenius.Views.NoteView.extend({
  template: JST["notes/note_show"],

  className: "annotation",

  events: {
    "click button.note-save": "save",
    "click button.note-cancel": "toggleEdit",
    "click a.annotation-edit-link": "toggleEdit"
  },

  initialize: function (options) {
    this.listenTo(this.model, "change", this.render);

    this.$placementEl = options.$placementEl;
    this.$placementEl.bind("contentchanged", this.render.bind(this));

    this.editing = false;
  },

  render: function () {
    this.$el.html(this.template({note: this.model}));
    this.positionNote();

    if (this.editing) {
      this.$("aside").addClass("hidden");
      this.$("form").removeClass("hidden");
    } else {
      this.$("aside").removeClass("hidden");
      this.$("form").addClass("hidden");
    }

    return this;
  },

  toggleEdit: function (event) {
    event.preventDefault();
    this.$("textarea").val(this.model.escape("body"));
    this.editing = !this.editing;
    this.render();
  },

  save: function (event) {
    event.preventDefault();

    this.model.save({body: this.$("textarea").val()}, {
      success: function () {
        this.editing = false;
        this.render();
      }.bind(this)
    });
  }
});
