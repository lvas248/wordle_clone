class Game < ApplicationRecord


  belongs_to :user
  belongs_to :word

  has_many :guesses, dependent: :destroy
  has_many :character_checks, through: :guesses

  private





end
