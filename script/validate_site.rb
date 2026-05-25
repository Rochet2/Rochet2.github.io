#!/usr/bin/env ruby
# frozen_string_literal: true

require 'yaml'

errors = []

projects = YAML.load_file('_data/projects.yml')
post_paths = Dir['_posts/*.md'].sort

post_titles = post_paths.filter_map do |path|
  File.foreach(path) do |line|
    if line.start_with?('title:')
      break line.split(':', 2)[1].strip
    end
  end
end

missing_posts = projects.keys.reject { |key| post_titles.include?(key) }
missing_posts.each { |key| errors << "projects.yml entry without a matching post title: #{key}" }

missing_projects = post_titles.reject { |title| projects.key?(title) }
missing_projects.each { |title| errors << "Post without a matching projects.yml entry: #{title}" }

def front_matter(path)
  content = File.read(path)
  return nil unless content.start_with?("---\n")

  end_idx = content.index("\n---\n", 4)
  return nil unless end_idx

  content[4...end_idx]
end

post_paths.each do |path|
  fm = front_matter(path)
  unless fm&.match?(/^description:\s*\S/m)
    errors << "Missing or empty description in front matter: #{path}"
  end
end

projects.each do |title, data|
  next unless data.is_a?(Hash) && data['downloads']

  data['downloads'].each do |download|
    url = download['url']
    next if url.nil? || url.include?('://')

    local_path = url.sub(%r{\A/}, '')
    unless File.file?(local_path)
      errors << "Missing download file #{local_path} (#{title}: #{download['label']})"
    end
  end
end

post_titles.each do |title|
  icon_path = "images/icon_#{title}.png"
  unless File.file?(icon_path)
    errors << "Missing project icon: #{icon_path}"
  end
end

def insecure_http?(line)
  line.gsub('https://', '').include?('http://')
end

scan_patterns = [
  '_data/projects.yml',
  '_posts/*.md',
  '_layouts/*.html',
  'index.html',
  'contact/index.html',
  'downloads/index.html'
]

scan_patterns.each do |pattern|
  Dir[pattern].sort.each do |file|
    File.readlines(file, chomp: true).each_with_index do |line, index|
      next unless insecure_http?(line)

      errors << "#{file}:#{index + 1} uses http:// (use https:// where possible)"
    end
  end
end

unless errors.empty?
  warn 'Site validation failed:'
  errors.each { |message| warn "  - #{message}" }
  exit 1
end

puts "Validated #{projects.size} projects, #{post_titles.size} posts, icons, downloads, descriptions, and URLs."
