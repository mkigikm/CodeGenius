CodeGenius.Views.NoteShow = Backbone.View.extend({
  template: JST["notes/note_show"],

  className: "annotation",

  events: {
    "click button.note-save": "save",
    "click button.note-cancel": "toggleEdit",
    "click a.annotation-edit-link": "toggleEdit",
    "click a.annotation-delete-link": "delete"
  },

  initialize: function (options) {
    this.listenTo(this.model, "change", this.render);

    this.$placementEl = options.$placementEl;
    this.$placementEl.bind("contentchanged", this.render.bind(this));
    this.fileHeight = options.fileHeight;

    this.editing = false;
    this.model.fetch();
  },

  render: function () {
    this.$el.html(this.template({note: this.model}));

    if (this.editing) {
      this.$("aside").addClass("hidden");
      this.$("form").removeClass("hidden");
    } else {
      this.$("aside").removeClass("hidden");
      this.$("form").addClass("hidden");
    }

    this.positionNote();
    return this;
  },

  toggleEdit: function (event) {
    event.preventDefault();
    this.$("textarea").val(this.model.escape("body"));
    this.editing = !this.editing;
    this.render();
  },

  delete: function (event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        this.remove();
        Backbone.history.navigate("deleted");
      }.bind(this)
    });
  },

  save: function (event) {
    event.preventDefault();

    this.model.save({body: this.$("textarea").val()}, {
      success: function () {
        this.editing = false;
        this.render();
      }.bind(this)
    });
  },

  positionNote: function () {
    var noteEl = this.noteEl();
    noteEl && this.$el.css("top", this.maxTop(noteEl));
  },

  noteEl: function () {
    var url = this.model.isNew() ? "#" : "#notes/" + this.model.id;
    return _.find(this.$placementEl.find("a"), function (a) {
      return $(a).attr("href") === url;
    });
  },

  abovePixels: function () {
    return this.$placementEl.offset().top;
  },

  maxTop: function (noteEl) {
    return Math.min(noteEl.offsetTop - this.abovePixels(),
        $("pre").height() - this.$("> :not(.hidden)").height());
  }
});
