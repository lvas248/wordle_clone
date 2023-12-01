class Game < ApplicationRecord

  before_validation :assign_word

  belongs_to :user
  belongs_to :word

  has_many :guesses, dependent: :destroy

  private

  def assign_word
    self.word = Word.all.sample
  end

end
