# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_11_29_161005) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "character_checks", force: :cascade do |t|
    t.bigint "guess_id", null: false
    t.string "char"
    t.integer "index"
    t.boolean "correct"
    t.boolean "exists"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guess_id"], name: "index_character_checks_on_guess_id"
  end

  create_table "games", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "word_id"
    t.integer "attempts", default: 0
    t.string "status", default: "pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_games_on_user_id"
    t.index ["word_id"], name: "index_games_on_word_id"
  end

  create_table "guesses", force: :cascade do |t|
    t.bigint "game_id", null: false
    t.string "word"
    t.integer "attempt_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_guesses_on_game_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "words", force: :cascade do |t|
    t.string "word"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "character_checks", "guesses"
  add_foreign_key "games", "users"
  add_foreign_key "games", "words"
  add_foreign_key "guesses", "games"
end
