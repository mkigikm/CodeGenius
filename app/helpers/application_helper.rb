module ApplicationHelper
  def notate_phile(phile)
    offset, notated_body = 0, ""

    phile.notes.each do |note|
      notated_body += h(phile.body[offset...note.start])
      notated_body += "<a href='#{note_url(note)}'>" +
          h(phile.body[note.start..note.finish]) + "</a>"

      offset = note.finish + 1
    end

    (notated_body + h(phile.body[offset..-1])).html_safe
  end

  def auth_token
    <<-HTML.html_safe
    <input type="hidden" name="authenticity_token"
      value="#{form_authenticity_token}">
    HTML
  end

  def error_messages(errors, field)
    if errors.has_key?(field)
      <<-HTML.html_safe
      <strong>#{errors.full_messages_for(field).join(" ")}</strong>
      HTML
    end
  end
end
