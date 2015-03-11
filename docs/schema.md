# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## files
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
name        | string    | not null
body        | text      |
url         | string    |

## notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
file_id     | integer   | not null, foreign key (references files)
start       | integer   | not null,
span        | integer   | not null
author_id   | integer   | not null, foreign key (references users)
body        | text      | not null

## followings
column name | data type | details
------------------------------------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
followed_id | integer   | not null, foreign key (references users)

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
file_id     | integer   | not null, foreign key (references files)
body        | text      | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
file_id     | integer   | not null, foreign key (references files)
tag_id      | integer   | not null, foreign key (references tags)
