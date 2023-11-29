class Guess < ApplicationRecord
  belongs_to :game
  has_many :character_checks
  
end
