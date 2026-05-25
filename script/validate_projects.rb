#!/usr/bin/env ruby
# frozen_string_literal: true

require 'yaml'

projects = YAML.load_file('_data/projects.yml')
post_titles = Dir['_posts/*.md'].filter_map do |path|
  File.foreach(path) do |line|
    if line.start_with?('title:')
      break line.split(':', 2)[1].strip
    end
  end
end

missing_posts = projects.keys.reject { |key| post_titles.include?(key) }
unless missing_posts.empty?
  warn 'projects.yml entries without a matching post title:'
  missing_posts.each { |key| warn "  - #{key}" }
  exit 1
end

missing_projects = post_titles.reject { |title| projects.key?(title) }
unless missing_projects.empty?
  warn 'Posts without a matching projects.yml entry:'
  missing_projects.each { |title| warn "  - #{title}" }
  exit 1
end

puts "Validated #{projects.size} projects.yml entries against #{post_titles.size} posts."
