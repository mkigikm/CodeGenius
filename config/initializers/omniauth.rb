Rails.application.config.middleware.use OmniAuth::Builder do
  provider :gplus, ENV["GPLUS_KEY"], ENV["GPLUS_SECRET"]
  provider :twitter, ENV["TWITTER_KEY"], ENV["TWITTER_SECRET"]
end
