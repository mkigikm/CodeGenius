CodeGenius.Views.PhileShow = Backbone.View.extend({
  template: JST["philes/phile_show"],

  events: {
    "mouseup pre": "newNote",
    "click a.annotation": "toggleAnnotation",
    "click pre a": "canceledNote"
  },

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.notes(), "add", this.render);
    this.$newNoteEl = options.$newNoteEl;
    this.$el.bind("notestarted", this.render.bind(this));
    this.$el.bind("notecanceled", this.canceledNote.bind(this));
  },

  render: function () {
    this.$el.html(this.template({phile: this.model, newNote: this._newNote}));

    this._textNodes = null;
    this.$el.trigger("contentchanged");
    prettyPrint();
    return this;
  },

  canceledNote: function () {
    this._newNote = null;
    this.render();
  },

  newNote: function (event) {
    var selection = window.getSelection(),
        start, finish, newNote;

    if (this.invalidSelection(selection)) {
      this._newNote = null;
      return;
    }

    this.oldSelection = selection.toString();

    start = this.findSelectionStart(selection);
    finish = start + selection.toString().length - 1;

    this._newNote = new CodeGenius.Models.Note({
      start: start,
      finish: finish,
      phile_id: this.model.id
    });

    this.newNoteView = new CodeGenius.Views.NoteNew({
      model: this._newNote,
      collection: this.model.notes(),
      top: this.topOffset(selection),
      $parentEl: this.$el,
      fileHeight: this.$("pre").height()
    });
    this.$newNoteEl.html(this.newNoteView.render().$el);

    this.newNoteView.setTop();
    Backbone.history.navigate(this.model.escape("name"));
  },

  topOffset: function (selection) {
    return selection.getRangeAt(0).getBoundingClientRect().top -
        this.$("pre").offset().top + $(window).scrollTop();
  },

  invalidSelection: function (selection) {
    return selection.toString().length === 0 ||
        this.textNodes().indexOf(selection.anchorNode) === -1 ||
        this.textNodes().indexOf(selection.focusNode ) === -1 ||
        selection.toString() === this.oldSelection;
  },

  findTextNodeOffset: function (node, nodeList) {
    var offset = 0;

    _.find(this.textNodes(), function (curNode) {
      offset += curNode.length;
      return curNode === node;
    });

    return node ? offset - node.length : 0;
  },

  findSelectionStart: function (selection) {
    var startNode;

    if (this.textNodes().indexOf(selection.anchorNode) <=
        this.textNodes().indexOf(selection.focusNode)) {
      startNode = selection.anchorNode;
    } else {
      startNode = selection.focusNode;
    }

    return this.findTextNodeOffset(startNode) +
        selection.getRangeAt(0).startOffset;
  },

  textNodes: function () {
    this._textNodes || this._findTextNodes(this.$("pre"), []);
    return this._textNodes;
  },

  _findTextNodes: function ($el, nodeList) {
    _.each($el.contents(), function (node) {
      //text nodes have a nodeType === 3
      node.nodeType === 3 ? nodeList.push(node) :
          this._findTextNodes($(node), nodeList);
    }, this);

    this._textNodes = nodeList;
  },

  toggleAnnotation: function (event) {
    event.preventDefault();
    var href = $(event.currentTarget).attr("href");

    if (href === window.location.hash) {
      Backbone.history.navigate(this.model.escape("name"));
      this.$newNoteEl.empty();
    } else {
      Backbone.history.navigate(href, {trigger: true});
    }

    this.oldSelection = "";
  }
});
