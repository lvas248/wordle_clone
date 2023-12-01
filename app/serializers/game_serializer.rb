class GameSerializer < ActiveModel::Serializer
  attributes :status

  has_many :guesses



end
