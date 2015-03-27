# Code Genius

[live link](http://www.codegeniuses.us)

## Description
Code Genius is source code annotation app inspired by [Genius](http://www.genius.com).
Users can
* Create accounts
* Upload files
* Tag/search for files
* View annotations
* Manage there file's annotations by deleting/reverting
* Create annotations using markdown
* Search for other users
* View their files/annotations
* Follow other users

## Design Choices
Most functionality comes through a RESTful API that the browser queries through
Ajax. This allows for a straightforward, easy to understand implementation that
should be maintainable as the site expands.

A few non-RESTful routes were needed. Following users and tagging files are both
non-RESTful routes. Annotation revisions are as well. Annotation history is
managed through `ActiveRecord::Callbacks`. Every time an annotation is edited,
the old content is stored in an `note_revisions` table. The file owner has the
ability to revert to any previous history entry, deleting the revisions that
came after it.

## Third-party functionality
Code Genius is written with Ruby on Rails and Backbone. Additionally, core
functionality was provided with
* [OmniAuth](http://intridea.github.io/omniauth/) for registering/signing in through twitter
* [marked](https://github.com/chjj/marked) for parsing markdown annotations
* [google-code-prettify](https://code.google.com/p/google-code-prettify/) for adding syntax highlighting
* [Amazon Web Services](http://aws.amazon.com/) for storing files
* [Paperclip](https://github.com/thoughtbot/paperclip) for managing user avatars
* [CanCan](https://github.com/ryanb/cancan) for authorization
