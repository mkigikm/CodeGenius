CodeGenius.Routers.PhileRouter = Backbone.Router.extend({
  routes: {
    "": "show",
    "notes/new/:start/:finish": "newNote",
    "notes/:id": "showNote"
  },

  initialize: function () {
    this.findPhile();
  },

  findPhile: function () {
    var phileId = _.last(window.location.pathname.split("/"));
    this.phile = new CodeGenius.Models.Phile({id: phileId});
    this.phile.fetch();
  },

  show: function () {
    this.phileView = new CodeGenius.Views.PhileShow({
      model: this.phile,
      el: $(".file-body")
    });

    this.phileView.render();
  },

  showNote: function (id) {
    this.phileView || this.show();

    var noteView = new CodeGenius.Views.NoteShow({
      model: this.phile.notes().getOrAdd(id),
      $placementEl: this.phileView.$el
    });

    this._swapNoteView(noteView);
  },

  newNote: function (start, finish) {
    var note, noteView;

    this.phileView || this.show();

    note = new CodeGenius.Models.Note({
      phile_id: this.phile.id,
      start: start,
      finish: finish
    });

    noteView = new CodeGenius.Views.NoteShow({
      model: note,
      collection: this.phile.notes()
    });
    this._swapNoteView(noteView);
  },

  _swapNoteView: function (newView) {
    this._noteView && this._noteView.remove();
    this._noteView = newView;
    $(".file-annotation").html(newView.render().$el);
  }
});
