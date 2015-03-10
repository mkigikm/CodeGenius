# Code Genius

[Heroku link][heroku]

[heroku]: https://codegeniuses.herokuapp.com/

## Minimum Viable Product
Code Genius is a clone of Rap Genius built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Upload files
- [ ] Create annotations of files in Markdown
- [ ] View other user's files / annotations
- [ ] Follow other users
- [ ] Get notifications of annotations added to their files
- [ ] Get notifications when their followed users post files / annotations
- [ ] Search for users by email

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 0: User Authentication, File Upload (~1 day)
I will implement user authentication and file uploading in Rails. By the end of this phase, users will be able to see their profiles, and upload files via a Rails view. They will be able to view files and annotations, but not update them, since that really needs to go through backbone to be done smoothly (Rap Genius doesn't allow adding/editing without javascript on, only viewing on a separate page).

[Details][phase-zero]

### Phase 1: Following (~0.5 day)
I will add controllers and views for following users from their profile pages. They will have a feed which notifies them of activity on their account, and their followed accounts.

[Details][phase-one]

### Phase 2: Viewing and Annotating Files in Backbone (~1.5 days)
I will add API routes to serve files and annotation data as JSON, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to to view/annotate a file on a single page. I will also add markdown to the annotations.

[Details][phase-two]

### Phase 3: Layout Design (~2 days)
I will make the layout for the profile and file pages look like my wireframes using css. By the end of this phase, everything on the users profile page will be in the right position; and on the files pages, annotations will popup beside the text they are annotating.

[Details][phase-three]

### Phase 4: User profiles with Backbone (~1 day)
I will switch the user profile page to use backbone. Users will be able to follow and upload a file without reloading the page. They will also be to follow on the file page without reloading.

[Details][phase-four]

### Bonus Features (TBD)
- [ ] Tag files
- [ ] Search for files by tag
- [ ] Linking to files in addition to uploading them
- [ ] Leave general comments on files
- [ ] "Like" button for annotations
- [ ] Support syntax highlighting
- [ ] Sign up with Google+
- [ ] Typeahead search bar for tags
- [ ] Multiple sessions/session management

[phase-zero]: ./docs/phases/phase0.md
[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
