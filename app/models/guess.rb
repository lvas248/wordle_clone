class Guess < ApplicationRecord
  belongs_to :game
  
  has_many :character_checks, dependent: :destroy

  validates :word, presence: true, length: { is: 5 }
  validate :is_word?

  after_create :check_characters
  after_save :update_game_status
  
  private 

  def check_characters
    self.word.chars.each_with_index {|c,index| self.character_checks.create!(char: c, index: index) }
    
    if(self.character_checks.all? { |c| c.correct == true })
      self.game.update(status: 'won')
    end

  end

  def is_word?
    unless Word.find_by(word: self.word)
      errors.add(:word, 'Not a word')
    end
  end 

  def update_game_status

      if(self.character_checks.all? { |c| c.correct == true })
        self.game.update(status: 'won')
        self.game.update(attempts: self.game.guesses.count)
        
      elsif (self.game.guesses.count > 5)
        self.game.update(status: 'lost')
      end

  end

 

 


  
end
