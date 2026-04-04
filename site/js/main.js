/* ============================================================
   samcrawford.dev — GitHub-themed Portfolio JS
   ============================================================ */

// --- Project Data ---
var projects = {
  'memepickup': {
    name: 'memepickup-architecture',
    title: 'MemePickup',
    desc: 'Mobile meme discovery app for iOS and Android. Built with React Native for cross-platform development. Deployed on Vercel with 120+ countries reached.',
    tags: ['React Native', 'iOS', 'Android', 'Vercel'],
    diagram: 'assets/memepickup-arch.svg',
    video: null,
    github: 'https://github.com/samcraw1/memepickup-architecture',
    live: null
  },
  'unioncase': {
    name: 'unioncase-grievance-tracker',
    title: 'UnionCase',
    desc: 'Progressive web app for tracking union grievances and managing cases. Helps USPS letter carriers organize and follow the status of their grievance filings.',
    tags: ['PWA', 'React', 'Supabase', 'Vercel'],
    diagram: 'assets/unioncase-arch.svg',
    video: null,
    github: 'https://github.com/samcraw1/unioncase-grievance-tracker',
    live: 'https://app.unioncase.org'
  },
  'unioncase-migration': {
    name: 'unioncase-aws-migration',
    title: 'UnionCase — AWS Migration',
    desc: 'Migrated a production union grievance tracking PWA from Vercel + Supabase to a fully AWS-architected solution using 10 AWS services, completed in ~75 minutes via AWS CLI. Aligned with AWS SAA-C03 exam concepts.',
    tags: ['AWS', 'Lambda', 'RDS', 'CloudFront', 'Cognito', 'API Gateway', 'S3', 'Route 53', 'EventBridge', 'VPC'],
    diagram: 'assets/unioncase-migration-arch.svg',
    video: 'assets/unioncase-walkthrough.mp4',
    github: 'https://github.com/samcraw1/unioncase-grievance-tracker',
    live: 'https://app.unioncase.org'
  },
  'pybyte': {
    name: 'pybyte',
    title: 'PyByte',
    desc: 'Interactive Python learning platform with hands-on coding exercises. Built to help beginners learn Python through practice-based lessons.',
    tags: ['Python', 'AWS', 'Lambda', 'DynamoDB', 'Terraform'],
    diagram: 'assets/pybyte-arch.svg',
    video: null,
    github: 'https://github.com/samcraw1/pybyte',
    live: null
  },
  'security-scanner': {
    name: 'aws-security-scanner',
    title: 'AWS Security Scanner',
    desc: 'Automated tool for scanning and auditing AWS infrastructure security. Checks for misconfigurations, open permissions, and security best practices.',
    tags: ['AWS', 'Python', 'Lambda', 'EventBridge', 'SNS', 'Terraform'],
    diagram: 'assets/security-scanner-diagram.svg',
    video: null,
    github: 'https://github.com/samcraw1/aws-security-scanner',
    live: null
  },
  'usps-vehicle-inspection': {
    name: 'usps-vehicle-inspection',
    title: 'USPS Pre-Route Scanners',
    desc: 'AI-powered vehicle inspection tracking system for USPS carriers. Digitizes the pre-route vehicle inspection process for mail carriers.',
    tags: ['React Native', 'OpenAI Vision', 'JavaScript'],
    diagram: 'assets/preroute-scanner-diagram.svg',
    video: null,
    github: 'https://github.com/samcraw1/usps-vehicle-inspection',
    live: null
  },
  'usps-job-helper': {
    name: 'usps-job-helper-2',
    title: 'USPS Job Helper',
    desc: 'AI chatbot for USPS hiring guidance. Helps applicants navigate the USPS hiring process with guidance and resources.',
    tags: ['Next.js', 'Claude API', 'TypeScript', 'Vercel'],
    diagram: 'assets/usps-jobhelper-arch.svg',
    video: null,
    github: 'https://github.com/samcraw1/usps-job-helper-2',
    live: 'https://uspsjobshelper.com'
  },
  'nalc-branch-226': {
    name: 'branch-226-digital',
    title: 'NALC Branch 226',
    desc: 'Digital platform for NALC Branch 226 union communications. Provides members with news, resources, and branch information.',
    tags: ['Next.js', 'Vercel', 'TypeScript'],
    diagram: 'assets/nalc-branch-arch.svg',
    video: null,
    github: 'https://github.com/samcraw1/branch-226-digital',
    live: 'https://branch-226-digital.vercel.app'
  },
  'deadline-tracker': {
    name: 'deadline-tracker',
    title: 'Deadline Tracker',
    desc: 'Track and manage important deadlines. Helps you stay on top of due dates with a clean, organized interface.',
    tags: ['React', 'Vercel', 'JavaScript'],
    diagram: 'assets/deadline-tracker-arch.svg',
    video: null,
    github: 'https://github.com/samcraw1/deadline-tracker',
    live: 'https://deadline-tracker-lake.vercel.app/deadlines'
  }
};

// --- Tab Navigation ---
function switchTab(tabName) {
  // Hide all tab content
  document.querySelectorAll('.gh-tab-content').forEach(function(el) {
    el.classList.remove('gh-tab-active');
  });

  // Show selected tab
  var target = document.getElementById('tab-' + tabName);
  if (target) target.classList.add('gh-tab-active');

  // Update nav tabs
  document.querySelectorAll('.gh-nav-tab').forEach(function(t) {
    t.classList.remove('gh-nav-tab-active');
    if (t.dataset.tab === tabName) t.classList.add('gh-nav-tab-active');
  });

  // Update profile tabs
  document.querySelectorAll('.gh-profile-tab').forEach(function(t) {
    t.classList.remove('gh-profile-tab-active');
    if (t.dataset.tab === tabName) t.classList.add('gh-profile-tab-active');
  });
}

// SC logo click — go to overview
document.getElementById('nav-logo').addEventListener('click', function(e) {
  e.preventDefault();
  switchTab('overview');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Nav search — switches to repos tab and filters
document.getElementById('nav-search').addEventListener('input', function() {
  var query = this.value.toLowerCase();
  if (query.length > 0) {
    switchTab('repositories');
    document.getElementById('repo-search').value = query;
    filterRepos();
  }
});

// "/" keyboard shortcut to focus search
document.addEventListener('keydown', function(e) {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    document.getElementById('nav-search').focus();
  }
});

// Nav tab clicks
document.querySelectorAll('.gh-nav-tab, .gh-profile-tab').forEach(function(tab) {
  tab.addEventListener('click', function(e) {
    e.preventDefault();
    switchTab(this.dataset.tab);
  });
});

// --- Repo Detail View ---
function openRepo(repoKey) {
  var project = projects[repoKey];
  if (!project) return;

  // Hide all tabs, show repo detail
  document.querySelectorAll('.gh-tab-content').forEach(function(el) {
    el.classList.remove('gh-tab-active');
  });
  document.getElementById('tab-repo-detail').classList.add('gh-tab-active');

  // Set repo name
  document.getElementById('repo-detail-name').textContent = project.name;

  // Build README content
  var readme = '<h1>' + project.title + '</h1>';
  readme += '<p>' + project.desc + '</p>';
  readme += '<h2>Tech Stack</h2>';
  readme += '<div class="readme-tags">';
  project.tags.forEach(function(tag) {
    readme += '<span class="readme-tag">' + tag + '</span>';
  });
  readme += '</div>';
  readme += '<div class="readme-links">';
  if (project.live) {
    readme += '<a href="' + project.live + '" class="readme-link readme-link-primary" target="_blank" rel="noopener">Live Site</a>';
  }
  readme += '<a href="' + project.github + '" class="readme-link readme-link-outline" target="_blank" rel="noopener">GitHub</a>';
  readme += '</div>';
  document.getElementById('repo-readme-content').innerHTML = readme;

  // Architecture diagram
  document.getElementById('repo-arch-content').innerHTML =
    '<img src="' + project.diagram + '" alt="' + project.title + ' Architecture">';

  // Video
  if (project.video) {
    document.getElementById('repo-video-content').innerHTML =
      '<video controls preload="metadata"><source src="' + project.video + '" type="video/mp4"></video>';
  } else {
    document.getElementById('repo-video-content').innerHTML =
      '<div class="gh-video-placeholder">Video Walkthrough Coming Soon</div>';
  }

  // Reset to README tab
  document.querySelectorAll('.gh-repo-tab').forEach(function(t) {
    t.classList.remove('gh-repo-tab-active');
  });
  document.querySelector('.gh-repo-tab[data-rtab="readme"]').classList.add('gh-repo-tab-active');
  document.querySelectorAll('.gh-repo-tab-content').forEach(function(el) {
    el.classList.remove('gh-repo-tab-active');
  });
  document.getElementById('rtab-readme').classList.add('gh-repo-tab-active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Pinned card clicks
document.querySelectorAll('.gh-pinned-card').forEach(function(card) {
  card.addEventListener('click', function(e) {
    e.preventDefault();
    openRepo(this.dataset.repo);
  });
});

// Repo list link clicks
document.querySelectorAll('.gh-repo-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    openRepo(this.dataset.repo);
  });
});

// Back button from repo detail
document.getElementById('repo-back').addEventListener('click', function(e) {
  e.preventDefault();
  switchTab('overview');
});

// Repo detail sub-tabs (README / Architecture / Video)
document.querySelectorAll('.gh-repo-tab').forEach(function(tab) {
  tab.addEventListener('click', function(e) {
    e.preventDefault();
    var rtab = this.dataset.rtab;
    document.querySelectorAll('.gh-repo-tab').forEach(function(t) {
      t.classList.remove('gh-repo-tab-active');
    });
    this.classList.add('gh-repo-tab-active');
    document.querySelectorAll('.gh-repo-tab-content').forEach(function(el) {
      el.classList.remove('gh-repo-tab-active');
    });
    document.getElementById('rtab-' + rtab).classList.add('gh-repo-tab-active');
  });
});

// --- Repo Search & Filter ---
var searchInput = document.getElementById('repo-search');
var langFilter = document.getElementById('repo-lang-filter');

function filterRepos() {
  var query = searchInput.value.toLowerCase();
  var lang = langFilter.value;

  document.querySelectorAll('.gh-repo-item').forEach(function(item) {
    var name = item.dataset.name.toLowerCase();
    var itemLang = item.dataset.lang;
    var matchesSearch = !query || name.indexOf(query) !== -1;
    var matchesLang = !lang || itemLang === lang;
    item.style.display = (matchesSearch && matchesLang) ? '' : 'none';
  });
}

searchInput.addEventListener('input', filterRepos);
langFilter.addEventListener('change', filterRepos);

// --- Contribution Graph ---
function generateContribGraph() {
  var grid = document.getElementById('contrib-grid');
  var weeks = 52;
  var levels = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

  // Seed-based pseudo-random for consistent display
  var seed = 42;
  function seededRandom() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  for (var w = 0; w < weeks; w++) {
    for (var d = 0; d < 7; d++) {
      var cell = document.createElement('div');
      cell.className = 'gh-contrib-cell';
      var r = seededRandom();
      var level;
      if (r < 0.4) level = 0;
      else if (r < 0.6) level = 1;
      else if (r < 0.75) level = 2;
      else if (r < 0.9) level = 3;
      else level = 4;
      cell.style.background = levels[level];
      grid.appendChild(cell);
    }
  }
}

// --- Visitor Counter ---
async function updateVisitorCount() {
  try {
    var response = await fetch('/api/visitors');
    var data = await response.json();
    var el = document.getElementById('visitor-count');
    el.textContent = data.count.toLocaleString() + ' profile views';
  } catch (error) {
    document.getElementById('visitor-count').textContent = '';
  }
}

// --- Contact Form ---
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  var submitBtn = this.querySelector('button[type="submit"]');
  var statusEl = document.getElementById('form-status');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  var payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    var response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    var data = await response.json();

    if (response.ok) {
      statusEl.textContent = 'Issue submitted! I\'ll get back to you soon.';
      statusEl.classList.add('form-status-success');
      this.reset();
    } else {
      statusEl.textContent = data.error || 'Something went wrong. Please try again.';
      statusEl.classList.add('form-status-error');
    }
  } catch (error) {
    statusEl.textContent = 'Network error. Please try again later.';
    statusEl.classList.add('form-status-error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit new issue';
  }
});

// --- Init ---
document.addEventListener('DOMContentLoaded', function() {
  generateContribGraph();
  updateVisitorCount();
});
