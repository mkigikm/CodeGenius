json.feed @feed do |notification|
  json.type notification.notifiable_type

  notice = notification.notifiable
  who = case notification.notifiable_type
  when "Phile"
    notice.owner
  when "Note"
    notice.author
  when "Follow"
    notice.follower
  end

  json.who_name who.name
  json.who_id who.id
end
