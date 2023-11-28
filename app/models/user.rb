class User < ApplicationRecord
    has_secure_password

    validates :email, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, uniqueness: true, presence: true
end
