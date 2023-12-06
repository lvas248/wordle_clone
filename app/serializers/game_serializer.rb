class GameSerializer < ActiveModel::Serializer
  attributes :status, :character_checks

  # has_many :guesses

  # def character_checks
  #   self.object.character_checks
  # end
  

end
