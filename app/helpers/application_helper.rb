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
end
