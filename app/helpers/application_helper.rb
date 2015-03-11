module ApplicationHelper
  def annotate_phile(phile)
    offset = 0
    annotated_body = ""

    return phile.body if phile.annotations.empty?

    phile.annotations.each do |annotation|
      start, finish = annotation.start, annotation.finish

      annotated_body += h(phile.body[offset..(start - 1)]) if start - offset > 0
      annotated_body += "<a href='#{annotation_url(annotation)}'>" +
        h(phile.body[start..finish]) + "</a>"

      offset = finish + 1
    end

    remainder = phile.annotations.last.finish + 1

    (annotated_body + h(phile.body[remainder..-1])).html_safe
  end
end
