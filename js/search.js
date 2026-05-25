(function () {
  'use strict';

  var grid = document.getElementById('project-grid');
  var input = document.getElementById('project-search');
  var emptyMessage = document.getElementById('project-search-empty');
  if (!grid || !input) {
    return;
  }

  var baseurl = grid.getAttribute('data-baseurl') || '';
  var links = Array.prototype.slice.call(grid.querySelectorAll('.blocklink'));
  var linkByTitle = {};
  var projects = [];

  links.forEach(function (link) {
    var title = link.getAttribute('data-title') || '';
    var description = link.getAttribute('data-description') || '';
    var tags = link.getAttribute('data-tags') || '';
    linkByTitle[title] = link;
    projects.push({ title: title, description: description, tags: tags.split(/\s+/).filter(Boolean) });
  });

  function filter(query) {
    var needle = query.toLowerCase().trim();
    var visibleCount = 0;

    projects.forEach(function (project) {
      var link = linkByTitle[project.title];
      if (!link) {
        return;
      }

      var tagText = Array.isArray(project.tags) ? project.tags.join(' ') : (project.tags || '');
      var haystack = (project.title + ' ' + (project.description || '') + ' ' + tagText).toLowerCase();
      var visible = !needle || haystack.indexOf(needle) !== -1;
      link.style.display = visible ? '' : 'none';
      if (visible) {
        visibleCount += 1;
      }
    });

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount > 0;
    }
  }

  fetch(baseurl + '/search.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Failed to load search.json');
      }
      return response.json();
    })
    .then(function (data) {
      projects = data;
    })
    .catch(function () {})
    .then(function () {
      input.addEventListener('input', function () {
        filter(input.value);
      });
    });
})();
