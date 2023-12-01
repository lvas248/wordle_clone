class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :stats, :distribution

  def stats

    { 
      games_played: self.object.games.where.not(status: 'pending').count, 
      games_won: self.object.games.where(status: 'won').count,
      current_streak: 0,
      best_streak: 0
    
    }
  end

  def distribution
    [
      self.object.games.where(attempts: 1).count ,
      self.object.games.where(attempts: 2).count,
      self.object.games.where(attempts: 3).count,
      self.object.games.where(attempts: 4).count,
      self.object.games.where(attempts: 5).count,
      self.object.games.where(attempts: 6).count,
    ]

  end



end
