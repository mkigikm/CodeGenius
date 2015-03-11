CodeGenius.Views.PhileShow = Backbone.View.extend({
  template: JST["philes/phile_show"],

  events: {
    "click pre": "newNote"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.notes(), "add", this.render);
  },

  render: function () {
    this.$el.html(this.template({phile: this.model}));
    return this;
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
