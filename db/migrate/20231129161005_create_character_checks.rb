class CreateCharacterChecks < ActiveRecord::Migration[7.0]
  def change
    create_table :character_checks do |t|
      t.references :guess, null: false, foreign_key: true
      t.string :char
      t.integer :index
      t.boolean :correct
      t.boolean :exists

      t.timestamps
    end
  end
end
