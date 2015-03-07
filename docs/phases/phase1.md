# Phase 1: Viewing Files and Annotations

## Rails
### Models

### Controllers
Api::FilesController (index, create, destroy, show)
Api::AnnotationsController (create, destroy, show, update)

### Views
* files/index.json.jbuilder
* files/show.json.jbuilder

## Backbone
### Models
* File (parses nested `annotations` association)
* Annotation

### Collections
* Files
* Annotations

### Views
* FileIndex
* FileForm
* FileShow (composite view, contains AnnotationShow subview)
* AnnotationShow

## Gems/Libraries
* Markdown-js
* Bootstrap Markdown
