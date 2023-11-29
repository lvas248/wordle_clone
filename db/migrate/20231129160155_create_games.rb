class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.references :user, null: false, foreign_key: true
      t.references :word, null: false, foreign_key: true
      t.integer :attempts_allowed, default: 6
      t.string :status, default: 'pending'

      t.timestamps
    end
  end
end
