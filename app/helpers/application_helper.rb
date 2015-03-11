module ApplicationHelper
  def annotate_phile(phile)
    offset, annotated_body = 0, ""

    phile.annotations.each do |annotation|
      start, finish = annotation.start, annotation.finish

      annotated_body += h(phile.body[offset..(start - 1)]) if start > 0
      annotated_body += "<a href='#{annotation_url(annotation)}'>" +
        h(phile.body[start..finish]) + "</a>"

      offset = finish + 1
    end

    (annotated_body + h(phile.body[offset..-1])).html_safe
  end
end
