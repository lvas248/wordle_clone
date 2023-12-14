class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.float :guess_average, default: 0
      t.integer :current_streak, default: 0
      t.integer :best_streak, default: 0

      t.timestamps
    end
  end
end
