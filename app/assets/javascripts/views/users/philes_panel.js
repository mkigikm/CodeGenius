CodeGenius.Views.PhilesPanel = Backbone.View.extend({
  template: JST["users/philes_panel"],

  tagName: "section",

  className: "file-panel",

  events: {
    "click button.file-upload": "choosePhile",
    "change input.file-upload-selector": "uploadPhile",
    "click button.phile-delete": "deletePhile",
    "click button.phile-tag": "tagPhile",
    "submit .file-search": "void",
    "keydown .file-search > input": "searchPress",
    "click .tag-search": "tagSearch"
  },

  initialize: function () {
    this.philes = this.model.philes();
    this.listenTo(this.philes, "sync", this.renderPhileList);
    this.listenTo(this.philes, "change", this.renderPhileList);
    this.philes.fetch();
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));
    this.renderPhileList();
    return this;
  },

  renderPhileList: function () {
    var itemView;

    this.removeItemViews();
    this.philes.each(function (phile) {
      itemView = new CodeGenius.Views.PhilesPanelItem({
        model: phile,
        displayControls: this.model.get("is_current_user")
      });
      this.$(".file-list").append(itemView.render().$el);
      this._itemViews.push(itemView);
    }.bind(this));
  },

  removeItemViews: function () {
    if (this._itemViews) {
      this._itemViews.forEach(function (itemView) {
        itemView.remove();
      });
    }

    this._itemViews = [];
  },

  remove: function () {
    this.removeItemViews();
  },

  search: function () {
    this.philes.search(this.$(".file-search > input").val());
    this.philes.fetch();
  },

  void: function (event) {
    event.preventDefault();
  },

  searchPress: function (event) {
    clearInterval(this.searchTimeout)
    this.searchTimeout = setTimeout(this.search.bind(this), 200);
  },

  tagSearch: function (event) {
    var tagText = "tag:" + $(event.currentTarget).data("tag");
    event.preventDefault();

    this.$(".file-search > input").val(tagText);
    this.search();
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
        success: function () {
          this.philes.search("");
          this.philes.fetch();
        }.bind(this)
      });
    }.bind(this)
    reader.readAsText(file);
  },

  deletePhile: function (event) {
    var phile;
    event.preventDefault();

    phile = this.philes.get($(event.currentTarget).data("phile-id"));
    phile.destroy({
      success: this.philes.fetch.bind(this.philes)
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
