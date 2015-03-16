require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SampleProjectProposalMaster
  class Application < Rails::Application
    config.paperclip_defaults = {
      :storage => :s3,
      :path => "images/:class/:id.:style.:extension",
      :s3_credentials =>  {
        :bucket => ENV["S3_BUCKET"],
        :access_key_id => ENV["S3_ACCESS_KEY_ID"],
        :secret_access_key => ENV["S3_SECRET_ACCESS_KEY"],
        :s3_host_name => "s3.amazonaws.com"
      }
    }
  end
end
