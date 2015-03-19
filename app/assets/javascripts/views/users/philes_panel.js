CodeGenius.Views.PhilesPanel = Backbone.View.extend({
  template: JST["users/philes_panel"],

  tagName: "section",

  className: "file-panel",

  events: {
    "click button.file-upload": "choosePhile",
    "change input.file-upload-selector": "uploadPhile",
    "click button.phile-delete": "deletePhile",
    "click button.phile-tag": "tagPhile",
    "submit .file-search": "search"
  },

  initialize: function () {
    this.philes = this.model.philes();
    this.listenTo(this.philes, "sync", this.render);
    this.philes.fetch();
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));

    return this;
  },

  search: function (event) {
    event.preventDefault();
    this.philes.search(this.$(".file-search > input").val());
    this.philes.fetch();
  },

  choosePhile: function (event) {
    event.preventDefault();
    this.$(".file-upload-selector").trigger("click");
  },

  uploadPhile: function (event) {
    var file, reader, phile, philes = this.model.philes();
    event.preventDefault();

    file = this.$(".file-upload-selector")[0].files[0];
    phile = new CodeGenius.Models.Phile({name: file.name});

    reader = new FileReader();
    reader.onloadend = function () {
      phile.save({"body": reader.result}, {
        success: philes.fetch.bind(philes)
      });
    }
    reader.readAsText(file);
  },

  deletePhile: function (event) {
    var phile;
    event.preventDefault();

    phile = philes.get($(event.currentTarget).data("phile-id"));
    phile.destroy({
      success: philes.fetch.bind(philes)
    });
  },

  tagPhile: function (event) {
    var phileModal;
    event.preventDefault();

    phileModal = new CodeGenius.Views.PhileModal({
      model: this.philes.get($(event.currentTarget).data("phile-id"))
    });
    $("body").append(phileModal.render().$el);
  }
});
