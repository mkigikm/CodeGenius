# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150311121732) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "followings", force: true do |t|
    t.integer "follower_id", null: false
    t.integer "followed_id", null: false
  end

  add_index "followings", ["followed_id"], name: "index_followings_on_followed_id", using: :btree
  add_index "followings", ["follower_id"], name: "index_followings_on_follower_id", using: :btree

  create_table "notes", force: true do |t|
    t.integer "phile_id",  null: false
    t.integer "start",     null: false
    t.integer "finish",    null: false
    t.integer "author_id", null: false
    t.text    "body",      null: false
  end

  add_index "notes", ["author_id"], name: "index_notes_on_author_id", using: :btree
  add_index "notes", ["phile_id"], name: "index_notes_on_phile_id", using: :btree

  create_table "philes", force: true do |t|
    t.integer "owner_id", null: false
    t.string  "name",     null: false
    t.text    "body",     null: false
  end

  add_index "philes", ["owner_id"], name: "index_philes_on_owner_id", using: :btree

  create_table "users", force: true do |t|
    t.string "email",           null: false
    t.string "password_digest", null: false
    t.string "session_token",   null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
