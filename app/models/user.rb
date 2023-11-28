class User < ApplicationRecord
    has_secure_password

    validates :email, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }

end
