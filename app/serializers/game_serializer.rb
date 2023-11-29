class GameSerializer < ActiveModel::Serializer
  attributes :id, :attempts_allowed, :status
  has_one :user
  has_one :word
end
