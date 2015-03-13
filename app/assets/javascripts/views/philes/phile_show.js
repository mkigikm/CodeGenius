CodeGenius.Views.PhileShow = Backbone.View.extend({
  template: JST["philes/phile_show"],

  events: {
    "mouseup pre": "newNote",
    // "mouseup pre *": "newNote"
  },

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.notes(), "add", this.render);
    this.$newNoteEl = options.$newNoteEl;
  },

  render: function () {
    this.$el.html(this.template({phile: this.model, newNote: this.newNote}));
    this._textNodes = null;
    this.$el.trigger("contentchanged");
    return this;
  },

  newNote: function (event) {
    var selection = window.getSelection(),
        start, finish, newNote;

    if (this.invalidSelection(selection) || selection === this.selection) {
      return;
    }
    this.selection = selection;

    start = this.findSelectionStart(selection);
    finish = start + selection.toString().length - 1;

    newNote = new CodeGenius.Models.Note({
      start: start,
      finish: finish,
      phile_id: this.model.id
    });

    this.newNoteView = new CodeGenius.Views.NoteNew({
      model: newNote,
      collection: this.model.notes(),
      top: this.topOffset(selection),
      fileHeight: this.$("pre").height()
    });
    this.$newNoteEl.html(this.newNoteView.render().$el);

    this.newNoteView.setTop();
  },

  topOffset: function (selection) {
    return selection.getRangeAt(0).getBoundingClientRect().top -
        this.$("pre").offset().top + $(window).scrollTop();
  },

  invalidSelection: function (selection) {
    debugger
    return selection.toString().length === 0 ||
        this.textNodes().indexOf(selection.anchorNode) === -1 ||
        this.textNodes().indexOf(selection.focusNode ) === -1
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
  }
});
