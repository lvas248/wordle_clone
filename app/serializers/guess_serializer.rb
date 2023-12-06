class GuessSerializer < ActiveModel::Serializer

  attributes :result, :game_progress, :word

  def result 
      self.object.character_checks.map{ |c| {char: c.char, correct: c.correct, exists: c.exists}}
  end

  def game_progress
    status = self.object.game.status
  end

  def word
    unless self.object.game.status == 'pending'
      return self.object.game.word.word
    end
  end



end
