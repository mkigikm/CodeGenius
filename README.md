# Code Genius

[Heroku link][heroku]

[heroku]: http://.herokuapp.com

## Minimum Viable Product
Code Genius is a clone of Rap Genius built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Upload files
- [ ] Create annotations of files
- [ ] View other files / annotations
- [ ] Follow other users
- [ ] Get notifications of annotations added to their files
- [ ] Get notifications when their followed users post files / annotations
- [ ] Search for users by email
- [ ] Tag files
- [ ] Search for files by tag

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 0: User Authentication, File Upload (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to upload files or
input them via text in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-zero]

### Phase 1: Viewing and Annotating Files (~2 days)
I will add API routes to serve files and annotation data as JSON, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to upload files and annotate them in a single
Backbone page.

[Details][phase-one]

### Phase 2: Editing and Displaying Posts (~2 days)
I plan to use third-party libraries to add functionality to the `PostForm` and
`PostShow` views in this phase. First I'll need to add a Markdown editor to the
`PostForm`, and make sure that the Markdown is properly escaped and formatted in
the `PostShow` view. I also plan to integrate Filepicker for file upload so
users can add images to blog posts.

[Details][phase-two]

### Phase 4: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`subscribed_blogs` association to serve a list of blog posts ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose `posts`
collection fetches from the new route.  Ultimately, this will be the page users
see after logging in.

[Details][phase-three]

### Phase 5: Searching for Blogs and Posts (~2 days)
I'll need to add `search` routes to both the Blogs and Posts controllers. On the
Backbone side, there will be a `SearchResults` composite view has `BlogsIndex`
and `PostsIndex` subviews. These views will use plain old `blogs` and `posts`
collections, but they will fetch from the new `search` routes.

[Details][phase-four]

### Bonus Features (TBD)
- [ ] Link to files
- [ ] "Like" button for annotations
- [ ] General comments on files
- [ ] Pagination/infinite scroll
- [ ] Activity history (e.g. likes, reblogs, taggings)
- [ ] Annotate with different MIME types
- [ ] Annotate in markdown
- [ ] Multiple sessions/session management
- [ ] Support syntax highlighting
- [ ] Typeahead search bar
- [ ] Sign up with Google+

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
