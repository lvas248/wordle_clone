class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.references :user, null: false, foreign_key: true
      t.references :word, foreign_key: true
      t.integer :attempts, default: 0
      t.string :status, default: 'pending'

      t.timestamps
    end
  end
end
