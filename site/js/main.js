/* ============================================================
   samcrawford.dev — portfolio JS
   ============================================================ */

// --- Project Data ---
// One entry per project. `category` drives the Index filters.
// Featured projects have full write-ups on the page, so their Index rows
// jump to that section instead of opening the detail dialog.
var projects = {
  'nba-data-pipeline': {
    name: 'NBA-Project',
    title: 'NBA Analytics Pipeline',
    summary: 'PostgreSQL on RDS for the app, S3 and Athena for 111,285 player-game rows across five seasons.',
    category: 'data',
    featured: true,
    tags: ['Python', 'SQL', 'PostgreSQL', 'Amazon RDS', 'FastAPI', 'S3', 'Athena', 'Glue Data Catalog', 'Terraform'],
    github: 'https://github.com/samcraw1/NBA-Project'
  },
  'nfl-wr-pipeline': {
    name: 'nfl-wr-project',
    title: 'NFL Wide Receiver Rankings Pipeline',
    summary: 'Weekly ingestion, Parquet, rankings in Supabase, data quality checks, and a GitHub Actions schedule.',
    category: 'data',
    featured: true,
    tags: ['TypeScript', 'Python', 'Parquet', 'Supabase', 'GitHub Actions'],
    github: 'https://github.com/samcraw1/nfl-wr-project'
  },
  'payment-reconciliation-api': {
    name: 'Payment-Reconciliation-API',
    title: 'Payment Reconciliation API',
    summary: 'FastAPI and MySQL reconciliation with SQL joins, covered by 34 pytest tests.',
    category: 'data',
    featured: true,
    tags: ['Python', 'FastAPI', 'MySQL', 'SQL', 'pytest'],
    github: 'https://github.com/samcraw1/Payment-Reconciliation-API'
  },
  'unioncase-migration': {
    name: 'unioncase-aws-migration',
    title: 'UnionCase — AWS Migration',
    summary: 'Moved a production PWA from Vercel and Supabase to 10 AWS services in about 75 minutes.',
    desc: 'Migrated a production union grievance tracking PWA from Vercel + Supabase to a fully AWS-architected solution using 10 AWS services, completed in ~75 minutes via AWS CLI. Aligned with AWS SAA-C03 exam concepts.',
    category: 'cloud',
    tags: ['AWS', 'Lambda', 'RDS', 'CloudFront', 'Cognito', 'API Gateway', 'S3', 'Route 53', 'EventBridge', 'VPC'],
    diagram: 'assets/unioncase-migration-arch.svg',
    video: 'assets/unioncase-walkthrough.mp4',
    github: 'https://github.com/samcraw1/unioncase-grievance-tracker',
    live: 'https://app.unioncase.org'
  },
  'memepickup-migration': {
    name: 'memepickup-migration',
    title: 'MemePickup — AWS Migration',
    summary: 'Full AWS deployment of MemePickup with a redesigned architecture.',
    desc: 'Migrated MemePickup infrastructure to AWS. Full cloud deployment with architecture redesign.',
    category: 'cloud',
    tags: ['AWS', 'Migration', 'React Native', 'CloudFront', 'S3', 'Lambda'],
    diagram: 'assets/memepickup-migration-arch.svg',
    video: 'assets/memepickup-migration.mp4',
    github: 'https://github.com/samcraw1/memepickup-architecture'
  },
  'security-scanner': {
    name: 'aws-security-scanner',
    title: 'AWS Security Scanner',
    summary: 'Automated S3 security scanning and remediation with Lambda, EventBridge, and SNS.',
    desc: 'Automated tool for scanning and auditing AWS infrastructure security. Checks for misconfigurations, open permissions, and security best practices.',
    category: 'cloud',
    tags: ['AWS', 'Python', 'Lambda', 'EventBridge', 'SNS', 'Terraform'],
    diagram: 'assets/security-scanner-diagram.svg',
    github: 'https://github.com/samcraw1/aws-security-scanner'
  },
  'pybyte': {
    name: 'pybyte',
    title: 'PyByte',
    summary: 'Interactive Python learning platform on Lambda and DynamoDB, deployed with Terraform.',
    desc: 'Interactive Python learning platform with hands-on coding exercises. Built to help beginners learn Python through practice-based lessons.',
    category: 'cloud',
    tags: ['Python', 'AWS', 'Lambda', 'DynamoDB', 'Terraform'],
    diagram: 'assets/pybyte-arch.svg',
    github: 'https://github.com/samcraw1/pybyte'
  },
  'unioncase': {
    name: 'unioncase-grievance-tracker',
    title: 'UnionCase',
    summary: 'Grievance tracking PWA for USPS letter carriers. React, Supabase, Vercel.',
    desc: 'Progressive web app for tracking union grievances and managing cases. Helps USPS letter carriers organize and follow the status of their grievance filings.',
    category: 'apps',
    tags: ['PWA', 'React', 'Supabase', 'Vercel'],
    diagram: 'assets/unioncase-arch.svg',
    github: 'https://github.com/samcraw1/unioncase-grievance-tracker',
    live: 'https://app.unioncase.org'
  },
  'memepickup': {
    name: 'memepickup-architecture',
    title: 'MemePickup',
    summary: 'Cross-platform meme discovery app for iOS and Android, built with React Native.',
    desc: 'Mobile meme discovery app for iOS and Android. Built with React Native for cross-platform development. Deployed on Vercel with 120+ countries reached.',
    category: 'apps',
    tags: ['React Native', 'iOS', 'Android', 'Vercel'],
    diagram: 'assets/memepickup-arch.svg',
    github: 'https://github.com/samcraw1/memepickup-architecture'
  },
  'nalc-branch-226': {
    name: 'branch-226-digital',
    title: 'NALC Branch 226',
    summary: 'Digital platform for a letter carriers’ union branch: news, resources, and branch information.',
    desc: 'Digital platform for NALC Branch 226 union communications. Provides members with news, resources, and branch information.',
    category: 'apps',
    tags: ['Next.js', 'Vercel', 'TypeScript'],
    diagram: 'assets/nalc-branch-arch.svg',
    github: 'https://github.com/samcraw1/branch-226-digital',
    live: 'https://branch-226-digital.vercel.app'
  },
  'deadline-tracker': {
    name: 'deadline-tracker',
    title: 'Deadline Tracker',
    summary: 'Track and manage important deadlines with a clean, organized interface.',
    desc: 'Track and manage important deadlines. Helps you stay on top of due dates with a clean, organized interface.',
    category: 'apps',
    tags: ['React', 'Vercel', 'JavaScript'],
    diagram: 'assets/deadline-tracker-arch.svg',
    github: 'https://github.com/samcraw1/deadline-tracker',
    live: 'https://deadline-tracker-lake.vercel.app/deadlines'
  },
  'usps-vehicle-inspection': {
    name: 'usps-vehicle-inspection',
    title: 'USPS Pre-Route Scanners',
    summary: 'AI-assisted vehicle inspection for USPS carriers. React Native and OpenAI Vision.',
    desc: 'AI-powered vehicle inspection tracking system for USPS carriers. Digitizes the pre-route vehicle inspection process for mail carriers.',
    category: 'ai',
    tags: ['React Native', 'OpenAI Vision', 'JavaScript'],
    diagram: 'assets/preroute-scanner-diagram.svg',
    github: 'https://github.com/samcraw1/usps-vehicle-inspection'
  },
  'usps-job-helper': {
    name: 'usps-job-helper-2',
    title: 'USPS Job Helper',
    summary: 'AI chatbot that guides applicants through USPS hiring. Next.js and the Claude API.',
    desc: 'AI chatbot for USPS hiring guidance. Helps applicants navigate the USPS hiring process with guidance and resources.',
    category: 'ai',
    tags: ['Next.js', 'Claude API', 'TypeScript', 'Vercel'],
    diagram: 'assets/usps-jobhelper-arch.svg',
    github: 'https://github.com/samcraw1/usps-job-helper-2',
    live: 'https://uspsjobshelper.com'
  }
};

var categoryLabels = { data: 'Data', cloud: 'Cloud', apps: 'Apps', ai: 'AI' };

// Small DOM helper: el('p', 'class', 'text')
function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// --- Index: render, filter, search ---
var indexList = document.getElementById('index-list');
var indexCount = document.getElementById('index-count');
var searchInput = document.getElementById('project-search');
var filterButtons = document.querySelectorAll('.filter');
var activeFilter = 'all';

function renderIndex() {
  Object.keys(projects).forEach(function(key) {
    var p = projects[key];
    var row = el('li', 'index-row');
    row.dataset.key = key;
    row.dataset.category = p.category;
    // Everything the search box can match, lowercased once.
    row.dataset.search = [p.title, p.name, p.summary, p.desc || '', p.tags.join(' '), categoryLabels[p.category]]
      .join(' ').toLowerCase();

    // Featured: link to the write-up. Others: button that opens the dialog.
    var control;
    if (p.featured) {
      control = el('a');
      control.href = '#' + key;
      control.className = 'index-link';
    } else {
      control = el('button');
      control.type = 'button';
      control.setAttribute('aria-haspopup', 'dialog');
      control.addEventListener('click', function() { openProject(key); });
    }
    control.appendChild(el('span', 'index-title', p.title));
    control.appendChild(el('span', 'index-desc', p.summary));
    control.appendChild(el('span', 'index-cat' + (p.featured ? ' index-featured' : ''),
      p.featured ? 'Featured' : categoryLabels[p.category]));
    row.appendChild(control);
    indexList.appendChild(row);
  });
}

function filterIndex() {
  var query = searchInput.value.trim().toLowerCase();
  var shown = 0;
  indexList.querySelectorAll('.index-row').forEach(function(row) {
    var matchesFilter = activeFilter === 'all' || row.dataset.category === activeFilter;
    var matchesSearch = !query || row.dataset.search.indexOf(query) !== -1;
    var visible = matchesFilter && matchesSearch;
    row.hidden = !visible;
    if (visible) shown++;
  });

  var empty = indexList.querySelector('.index-empty');
  if (shown === 0 && !empty) {
    empty = el('li', 'index-empty', 'No projects match. Try another filter or search term.');
    indexList.appendChild(empty);
  } else if (shown > 0 && empty) {
    empty.remove();
  }
  var total = Object.keys(projects).length;
  indexCount.textContent = shown === total ? total + ' projects' : 'Showing ' + shown + ' of ' + total + ' projects';
}

filterButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    activeFilter = this.dataset.filter;
    filterButtons.forEach(function(b) { b.setAttribute('aria-pressed', String(b === btn)); });
    filterIndex();
  });
});
searchInput.addEventListener('input', filterIndex);

// "/" focuses the project search
document.addEventListener('keydown', function(e) {
  var tag = document.activeElement.tagName;
  if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
    e.preventDefault();
    searchInput.focus();
  }
});

// --- Project detail dialog ---
var dialog = document.getElementById('project-dialog');

function linkTo(href, label) {
  var a = el('a', 'repo-link', label + ' ');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener';
  var arrow = el('span', null, '↗');
  arrow.setAttribute('aria-hidden', 'true');
  a.appendChild(arrow);
  return a;
}

function openProject(key) {
  var p = projects[key];
  if (!p) return;

  document.getElementById('dialog-kind').textContent = categoryLabels[p.category] + ' · ' + p.name;
  document.getElementById('dialog-title').textContent = p.title;
  document.getElementById('dialog-desc').textContent = p.desc || p.summary;

  var tags = document.getElementById('dialog-tags');
  tags.replaceChildren();
  p.tags.forEach(function(t) { tags.appendChild(el('li', null, t)); });

  var media = document.getElementById('dialog-media');
  media.replaceChildren();
  if (p.diagram) {
    var img = el('img');
    img.src = p.diagram;
    img.alt = p.title + ' architecture diagram';
    img.loading = 'lazy';
    media.appendChild(img);
  }
  if (p.video) {
    var video = el('video');
    video.controls = true;
    video.preload = 'metadata';
    video.src = p.video;
    media.appendChild(video);
  }

  var links = document.getElementById('dialog-links');
  links.replaceChildren();
  if (p.live) links.appendChild(linkTo(p.live, 'Live site'));
  links.appendChild(linkTo(p.github, 'View on GitHub'));

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    window.open(p.github, '_blank', 'noopener'); // very old browsers
  }
}

document.getElementById('dialog-close').addEventListener('click', function() { dialog.close(); });
// Click on the backdrop closes the dialog
dialog.addEventListener('click', function(e) { if (e.target === dialog) dialog.close(); });
// Stop any playing video when the dialog closes
dialog.addEventListener('close', function() {
  var v = dialog.querySelector('video');
  if (v) v.pause();
});

// --- Nav: highlight the section in view ---
var navLinks = document.querySelectorAll('.nav-links a');
if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function(a) {
        if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'index', 'skills', 'contact'].forEach(function(id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
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
// Posts { name, email, message } to /api/contact (API Gateway → Lambda → DynamoDB).
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  var submitBtn = this.querySelector('button[type="submit"]');
  var statusEl = document.getElementById('form-status');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
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
      statusEl.textContent = 'Message sent. I\'ll get back to you soon.';
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
    submitBtn.textContent = 'Send message';
  }
});

// --- Init ---
renderIndex();
filterIndex();
updateVisitorCount();
