CodeGenius.Routers.PhileRouter = Backbone.Router.extend({
  routes: {
    "": "show",
    ":name": "show",
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

  show: function (id) {
    this.phileView = new CodeGenius.Views.PhileShow({
      model: this.phile,
      el: $(".file-body"),
      $newNoteEl: $(".file-annotation")
    });

    this.phileView.render();
  },

  showNote: function (id) {
    var note;
    this.phileView || this.show();

    note = this.phile.notes().getOrFetch(id, {
      error: function () {
        this._noteView.remove();
      }.bind(this)
    });
    var noteView = new CodeGenius.Views.NoteShow({
      model: note,
      $placementEl: this.phileView.$el
    });

    this._swapNoteView(noteView);
  },

  _swapNoteView: function (newView) {
    this._noteView && this._noteView.remove();
    this._noteView = newView;
    $(".file-annotation").html(newView.render().$el);
    this._noteView.positionNote();
  }
});
