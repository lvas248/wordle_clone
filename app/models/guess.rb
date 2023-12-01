class Guess < ApplicationRecord
  belongs_to :game
  
  has_many :character_checks, dependent: :destroy

  validates :word, uniqueness: true, length: { is: 5 }
  validate :check_if_word

  after_create :check_characters

  
  private 

  def check_characters
    self.word.chars.each_with_index {|c,index| self.character_checks.create!(char: c, index: index) }
    if(self.character_checks.all? { |c| c.correct == true })
      self.game.update(status: 'won')
    end
  
  end

  def check_if_word
    unless Word.find_by(word: self.word)
      errors.add(:word, 'Not a word')
    end
  end 


  
end
