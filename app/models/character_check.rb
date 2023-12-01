class CharacterCheck < ApplicationRecord
  belongs_to :guess

  validates :char, presence: true

  before_create :check
  
  private

  def check
    self.correct = (self.guess.game.word.word[self.index] == self.char)
    self.exists = (self.guess.game.word.word.include?(self.char))
  end
end
