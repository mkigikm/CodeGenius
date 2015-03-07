# Code Genius

[Heroku link][heroku]

[heroku]: http://.herokuapp.com

## Minimum Viable Product
Code Genius is a clone of Rap Genius built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Upload files / Link to file
- [ ] Create annotations of files in Markdown
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
App Academy. By the end of this phase, users will be able to see their profiles, upload files or input them via text in a Rails view. They will be able to view annotations, but not update them, since that really needs to go through backbone to be done smoothly (Rap Genius doesn't allow adding/editing without javascript on, only viewing on a separate page). They will also be able to follow other users from profile pages.

[Details][phase-zero]

### Phase 1: Viewing and Annotating Files (~2 days)
I will add API routes to serve files and annotation data as JSON, then add Backbone models and collections that fetch data from those routes. By the end of this phase, users will be able to add/delete files on a single page, then navigate them and view/annotate them on a single page. I will also add markdown to the annotations.

[Details][phase-one]

### Phase 2: Layout Design (~2 days)
I will make the layout for the profile and file pages look like my wireframes using css. By the end of this phase, everything on the users profile page will be in the right position, and on the files pages, annotations will popup beside the text they are annotating.

[Details][phase-two]

### Phase 3: User Profiles (~1 day)

[Details][phase-three]

### Bonus Features (TBD)
- [ ] Leave general comments on files
- [ ] "Like" button for annotations
- [ ] Activity history (e.g. likes, annotations, uploads, comments)
- [ ] Support syntax highlighting
- [ ] Sign up with Google+
- [ ] Typeahead search bar
- [ ] Multiple sessions/session management

[phase-zero]: ./docs/phases/phase0.md
[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
