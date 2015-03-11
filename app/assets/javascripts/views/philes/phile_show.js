CodeGenius.Views.PhileShow = Backbone.View.extend({
  events: {
    "click pre": "newNote"
  },

  render: function () {
    this.$el.find("a").each(function () {
      var $this = $(this),
          noteId = _.last($this.attr("href").split("/"))

      $this.attr("href", "#/notes/" + noteId);
    });
  },

  newNote: function (event) {
    var selection = window.getSelection(),
        start, finish;

    if (selection.toString().length === 0) return;

    start = this.findTextNodeOffset(selection.anchorNode) +
        selection.anchorOffset;
    finish = start + selection.toString().length - 1;
    Backbone.history.navigate(
      "notes/new/" + start + "/" + finish,
      {trigger: true}
    );
  },

  findTextNodeOffset: function (node, nodeList) {
    var offset = 0;

    _.find(this.findTextNodes(), function (curNode) {
      offset += curNode.length;
      return curNode === node;
    });

    return offset - node.length;
  },

  findTextNodes: function ($el, nodeList) {
    $el      || ($el = $(this.$el.find("pre")));
    nodeList || (nodeList = []);

    _.each($el.contents(), function (node) {
      //text nodes have a nodeType === 3
      node.nodeType === 3 ? nodeList.push(node) :
          this.findTextNodes($(node), nodeList);
    }, this);

    return nodeList;
  }
});
