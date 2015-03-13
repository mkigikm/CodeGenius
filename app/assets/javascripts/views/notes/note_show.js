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
    this.$placementEl.bind("contentchanged", function () {
      this.render();
    }.bind(this));
  },

  render: function () {
    var noteEl;
    this.$el.html(this.template({note: this.model}));

    noteEl = this.noteEl();
    noteEl && this.$el.css("top", noteEl.offsetTop - this.abovePixels());
    debugger
    return this;
  },

  toggleEdit: function (event) {
    event.preventDefault();
    this.$("textarea").val(this.model.escape("body"));
    this.$el.children().toggleClass("hidden");
  },

  noteEl: function () {
    var url = "#notes/" + this.model.id;
    return _.find(this.$placementEl.find("a"), function (a) {
      return $(a).attr("href") === url;
    });
  },

  save: function (event) {
    event.preventDefault();
    this.model.set("body", this.$("textarea").val());
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model, {merge: true});
        Backbone.history.navigate(
          "/notes/" + this.model.id,
          {trigger: true}
        );
      }.bind(this)
    });
  },

  abovePixels: function () {
    return this.$placementEl.offset().top;
  }
});
