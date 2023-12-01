class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :stats

  def stats
    { games_played: self.object.games.where.not(status: 'pending').count, games_won: self.object.games.where(status: 'won').count }
  end

end
