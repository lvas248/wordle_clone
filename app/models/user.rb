class User < ApplicationRecord

    has_secure_password

    has_many :games

    validates :email, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, uniqueness: true, presence: true



    # def get_or_create_open_game
    #     self.games.find_by(status: 'pending') || self.games.create!(word: Word.all.sample)
    # end

end
