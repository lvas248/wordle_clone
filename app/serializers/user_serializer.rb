class UserSerializer < ActiveModel::Serializer

  attributes :username, :open_game, :leaderboard, :games_won, :games_played, :guess_distribution, :current_streak, :best_streak, :guess_average

  def open_game
    self.object.get_open_game
  end

  def leaderboard
    User.top_users.map{ |u| { games_won: u.get_games_won, games_played: u.get_games_played, username: u.username, guess_average: u.guess_average,}}
  end

  def games_won
    self.object.get_games_won
  end

  def games_played
    self.object.get_games_played
  end

  def guess_distribution
    self.object.guess_distribution
  end



  

 




end
