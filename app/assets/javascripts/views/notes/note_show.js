CodeGenius.Views.NoteShow = Backbone.View.extend({
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
    var noteEl;
    this.$el.html(this.template({note: this.model}));

    noteEl = this.noteEl();
    noteEl && this.$el.css("top", noteEl.offsetTop - this.abovePixels());

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

  noteEl: function () {
    var url = "#notes/" + this.model.id;
    return _.find(this.$placementEl.find("a"), function (a) {
      return $(a).attr("href") === url;
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

  abovePixels: function () {
    return this.$placementEl.offset().top;
  }
});
