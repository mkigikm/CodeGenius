CodeGenius.Views.NoteShow = Backbone.View.extend({
  template: JST["notes/note_show"],

  tagName: "aside",

  className: "annotation-show",

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    var url, el;
    this.$el.html(this.template({note: this.model}));

    url = "#notes/" + this.model.id;
    el = _.find($("a"), function (a) {
      return $(a).attr("href") === url
    });
    el && this.$el.css("top", el.offsetTop - $("pre").offset().top);
    
    return this;
  }
});
