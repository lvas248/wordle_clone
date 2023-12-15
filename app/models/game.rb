class Game < ApplicationRecord

  after_update :update_user_stats

  belongs_to :user
  belongs_to :word

  has_many :guesses, dependent: :destroy
  has_many :character_checks, through: :guesses



  private


  def update_user_stats


    if self.status == 'won'
      
      self.user.update_user_stats_after_win
    
    elsif self.status == 'lost'

      self.user.update_user_stats_after_loss
    end

  end





end
