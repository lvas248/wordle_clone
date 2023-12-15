class User < ApplicationRecord

    has_secure_password

    has_many :games
    has_many :guesses, through: :games

    validates :email, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, uniqueness: true, presence: true

    def self.top_users
        users = joins(:games)
          .where(games: { status: 'won' })
          .group('users.id')
          .order('COUNT(games.id) DESC')
          .limit(10)

          users
    end

    def get_open_game
        game = self.games.find_by_status('pending')
        if game
          return {
            status: game.status,
            game_board: game.guesses.map{ |g| g.character_checks.map{ |c| { char: c.char, correct: c.correct, exists: c.exists}} }
          }
        end
    end

    def get_games_won
        self.games.where(status: 'won').count
    end
    
    def get_games_played
        self.games.where.not(status: 'pending').count
    end

    def calculate_guess_average
       
        total_guesses_of_games_won = self.guess_distribution.each_with_index.reduce(0) do | acc, (val, index) | 
            acc + ( val * ( index + 1) )
        end

        games_won = self.guess_distribution.reduce { |acc, val| acc + val }
        


        avg = ((total_guesses_of_games_won.to_f + 1) / games_won.to_f ).round(1)
      
    end

    def update_user_stats_after_win
        updated_current_streak = self.current_streak + 1
        updated_best_streak = updated_current_streak > self.best_streak ? updated_current_streak : self.best_streak
        self.update!( guess_average: calculate_guess_average, current_streak: updated_current_streak, best_streak: updated_best_streak )
    end

    def update_user_stats_after_loss
        self.update!( current_streak: 0 )
    end

    def guess_distribution
        return [
            self.games.where(attempts: 1).count,
            self.games.where(attempts: 2).count,
            self.games.where(attempts: 3).count,
            self.games.where(attempts: 4).count,
            self.games.where(attempts: 5).count,
            self.games.where(attempts: 6).count,
        ]
    end

    private



end
