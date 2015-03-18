json.feed @feed do |notification|
  json.type notification.notifiable_type
  json.who case notification.notifiable_type
  when "Phile"
    notification.owner
  when "Annotation"
    notification.author
  when "Follow"
    notification.follower
  end
end
