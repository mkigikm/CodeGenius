json.array! @feed do |notification|
  json.type notification.notifiable_type

  notice = notification.notifiable
  who = case notification.notifiable_type
  when "Phile"
    json.phile_id notice.id
    json.phile_name notice.name
    notice.owner
  when "Note"
    json.phile_id notice.phile.id
    json.phile_name notice.phile.name
    notice.author
  when "Follow"
    notice.follower
  end

  json.who_name who.name
  json.who_id who.id
end
