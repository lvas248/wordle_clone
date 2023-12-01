class CharacterCheckSerializer < ActiveModel::Serializer
  attributes :char, :correct, :exists
end
