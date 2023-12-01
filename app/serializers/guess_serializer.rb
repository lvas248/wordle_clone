class GuessSerializer < ActiveModel::Serializer
  attributes :result, :game_status
  # has_many :character_checks

  def result 
      self.object.character_checks.map{ |c| {char: c.char, correct: c.correct, exists: c.exists}}
  end

  def game_status
    self.object.game.status
  end

end
