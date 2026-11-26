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
  'usps-scanner-migration': {
    name: 'usps-scanner-aws-migration',
    title: 'USPS Scanner AWS Migration',
    summary: 'Moved the vehicle inspection app onto serverless AWS: Lambda, S3, CloudFront, and API Gateway.',
    desc: 'Migrated the USPS vehicle inspection app to AWS as a full cloud deployment on a serverless architecture using Lambda, S3, CloudFront, and API Gateway.',
    category: 'cloud',
    tags: ['AWS', 'Migration', 'Lambda', 'S3', 'CloudFront', 'API Gateway'],
    diagram: 'assets/usps-scanner-migration-arch.svg',
    video: 'assets/usps-scanner-migration.mp4',
    github: 'https://github.com/samcraw1/usps-vehicle-inspection'
  },
  'flask-2tier-aws': {
    name: 'flask-2tier-aws',
    title: 'Flask 2-Tier AWS Infrastructure',
    summary: 'Modular Terraform for a Flask app: VPC, Multi-AZ RDS, Fargate, CloudFront, and OIDC-based CI/CD.',
    desc: 'Modular Terraform infrastructure for a Flask web app: a 3-tier VPC with isolated database subnets, Multi-AZ RDS, serverless Fargate containers, a CloudFront CDN with TLS, and OIDC-based CI/CD with no stored secrets. Each module includes a RATIONALE.md explaining its design decisions.',
    category: 'cloud',
    tags: ['Terraform', 'ECS Fargate', 'RDS MySQL', 'CloudFront', 'VPC', 'GitHub OIDC', 'ALB', 'Secrets Manager'],
    github: 'https://github.com/samcraw1/flask-2tier-aws',
    steps: [
      { label: 'Bootstrap: remote state', diagram: 'assets/flask-2tier-step1-bootstrap.svg' },
      { label: 'Network: VPC and subnets', diagram: 'assets/flask-2tier-step2-network.svg' },
      { label: 'Data: RDS and secrets', diagram: 'assets/flask-2tier-step3-data.svg' },
      { label: 'Compute: Fargate and ALB', diagram: 'assets/flask-2tier-step4-compute.svg' },
      { label: 'Edge: CloudFront and DNS', diagram: 'assets/flask-2tier-step5-edge.svg' },
      { label: 'Pipeline: CI/CD', diagram: 'assets/flask-2tier-step6-pipeline.svg' }
    ]
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
    summary: 'Site for a 1,100-member Fort Worth letter carriers’ union branch. React and Vite on Vercel.',
    desc: 'Digital home for NALC Branch 226, the Fort Worth letter carriers’ union, which has represented its members since 1889 and now has more than 1,100. A React single-page app built with Vite, Tailwind, and shadcn/ui, deployed on Vercel with edge caching, SSL, and SEO and Open Graph metadata. It serves branch news, meeting schedules, the officer directory, and member resources.',
    category: 'apps',
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vercel'],
    diagram: 'assets/nalc-branch-arch.svg',
    github: 'https://github.com/samcraw1/branch-226-digital',
    live: 'https://branch-226-digital.vercel.app'
  },
  'deadline-tracker': {
    name: 'tpa-compliance-tracker',
    title: 'Deadline Tracker',
    summary: 'DOL notice deadline tracking for retirement plan administrators. Next.js, Supabase Postgres, and a daily cron.',
    desc: 'Automated tracking of Department of Labor (DOL) retirement plan notice deadlines for third-party administrators (TPAs).',
    category: 'apps',
    tags: ['Next.js 16', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row Level Security', 'OpenAI GPT-4o-mini', 'Tailwind v4', 'shadcn/ui', 'Vercel Cron'],
    diagram: 'assets/deadline-tracker-arch.svg',
    github: 'https://github.com/samcraw1/tpa-compliance-tracker',
    live: 'https://deadline-tracker-lake.vercel.app/deadlines',
    sections: [
      {
        heading: 'The problem',
        body: 'TPAs manage dozens of retirement plans, each requiring 8–15 DOL-mandated notices per year. Missing a single deadline means compliance risk, potential penalties, and audit headaches. Most firms track this in spreadsheets that break when plans change, staff turn over, or plan year ends vary across clients.'
      },
      {
        heading: 'What it does',
        list: [
          { title: 'Deadline engine', desc: 'Generates notice deadlines from each client’s plan type (401k, 403b, DB, 457b), plan year end, and features (Safe Harbor, Auto Enrollment, RMD). Handles annual, quarterly, and event-driven notices.' },
          { title: 'Dashboard with overdue alerts', desc: 'At-a-glance view of what’s overdue, due this week, and upcoming.' },
          { title: 'Status workflow', desc: 'Pending → Sent → Confirmed, with timestamped notes for an audit trail.' },
          { title: 'Compliance reports', desc: 'CSV export and printable reports per client, ready for DOL auditors.' },
          { title: 'AI compliance assistant', desc: 'Built-in chatbot for quick answers about DOL notice requirements and ERISA regulations.' },
          { title: 'Daily cron', desc: 'Marks past-due deadlines as overdue and logs alerts.' }
        ]
      },
      {
        heading: 'Architecture decisions',
        list: [
          { title: 'Server Components everywhere', desc: 'All pages fetch data on the server, so the dashboard loads with real data instead of loading skeletons.' },
          { title: 'Deadline engine as pure logic', desc: 'lib/deadline-engine.ts takes a client and notice types and returns deadline objects, with no side effects beyond the final database upsert. Easy to test and extend.' },
          { title: 'URL-driven filters', desc: 'Filters live in searchParams, so filtered views are shareable and survive a refresh.' },
          { title: 'Row Level Security', desc: 'Every table has RLS policies, so the schema is ready for multi-tenant isolation.' },
          { title: 'Upsert keyed on plan_year', desc: 'A unique constraint on (client_id, notice_type_id, plan_year) means regenerating deadlines never creates duplicates.' }
        ]
      },
      {
        heading: 'What I’d add next',
        list: [
          'Email notifications at 60, 30, and 7 days before a deadline',
          'Multi-tenant workspaces that isolate data by TPA firm using Supabase RLS',
          'ICS calendar export for Outlook and Google Calendar',
          'Bulk status updates',
          'Branded PDF compliance reports',
          'File attachments for proof of delivery',
          'Audit versioning: who changed each status, when, and why'
        ]
      }
    ]
  },
  'mail-carrier-game': {
    name: 'usps-mail-carrier-game',
    title: 'Mail Carrier Game',
    summary: '2D Java Swing game about delivering mail, built with no game engine.',
    desc: 'A 2D Java Swing game where you play a USPS mail carrier delivering packages across a pixel-art neighborhood. Built from scratch with only Java’s standard library: 4 levels (3 walking routes and 1 driving route), an LLV truck mechanic with road-only collision, tile-based maps loaded from text files, and pixel-art sprites drawn in code.',
    category: 'apps',
    tags: ['Java 17', 'Java Swing', 'AWT', '2D Arrays', 'File I/O', 'OOP', 'Game Loop', 'Collision Detection'],
    github: 'https://github.com/samcraw1/usps-mail-carrier-game'
  },
  'usps-vehicle-inspection': {
    name: 'usps-vehicle-inspection',
    title: 'USPS Vehicle Inspection AI System',
    summary: 'Carriers photograph their truck and GPT-4o flags safety issues. 12 AWS services managed with Terraform.',
    desc: 'Mobile app where USPS mail carriers photograph their LLV truck before starting their route. OpenAI GPT-4o checks the photo for safety issues such as tire damage, fluid leaks, body damage, and broken lights. If a vehicle is unsafe, the supervisor gets an email alert immediately, and supervisors can review every inspection on a web dashboard. There are two backend paths: serverless (API Gateway → Lambda) and EC2 (ALB → an Auto Scaling group in private subnets). All 12 AWS services are managed with Terraform.',
    category: 'ai',
    tags: ['React Native', 'OpenAI GPT-4o', 'Terraform', 'EC2', 'DynamoDB', 'S3', 'ALB', 'Lambda', 'SNS', 'VPC', 'Auto Scaling', 'CloudWatch'],
    diagram: 'assets/usps-vehicle-inspection-arch.svg',
    video: 'assets/usps-vehicle-inspection.mp4',
    github: 'https://github.com/samcraw1/usps-vehicle-inspection'
  },
  'vehicle-scanner-api': {
    name: 'usps-vehicle-scanner-api',
    title: 'USPS Vehicle Scanner API',
    summary: 'Java and Spring Boot API that uses OpenAI Vision to check truck photos for hazards. JUnit-tested.',
    desc: 'Java and Spring Boot backend that uses OpenAI Vision (GPT-4o-mini) to analyze USPS LLV truck photos for damage, tire issues, fluid leaks, and safety hazards. It has 4 REST endpoints, 5 JUnit tests with mocked services, and a built-in HTML upload page. Services are interface-based with dependency inversion, CORS is enabled, and secrets come from environment variables. It is the Java backend companion to the React Native inspection app.',
    category: 'ai',
    tags: ['Java 17', 'Spring Boot 3.3', 'OpenAI Vision API', 'JUnit 5', 'Mockito', 'AWS Elastic Beanstalk', 'Maven', 'REST API', 'MockMvc'],
    github: 'https://github.com/samcraw1/usps-vehicle-scanner-api'
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

// Step-by-step diagram walkthrough: numbered buttons swap the image shown.
function buildSteps(p) {
  var wrap = el('div', 'steps-walk');
  var nav = el('div', 'steps-nav');
  nav.setAttribute('role', 'group');
  nav.setAttribute('aria-label', 'Build steps');
  var img = el('img');
  var caption = el('p', 'steps-caption');
  function show(i) {
    img.src = p.steps[i].diagram;
    img.alt = 'Step ' + (i + 1) + ': ' + p.steps[i].label;
    caption.textContent = 'Step ' + (i + 1) + ' of ' + p.steps.length + ': ' + p.steps[i].label;
    nav.querySelectorAll('button').forEach(function(b, j) { b.setAttribute('aria-pressed', String(j === i)); });
  }
  p.steps.forEach(function(step, i) {
    var b = el('button', 'filter', String(i + 1));
    b.type = 'button';
    b.title = step.label;
    b.setAttribute('aria-label', 'Step ' + (i + 1) + ': ' + step.label);
    b.addEventListener('click', function() { show(i); });
    nav.appendChild(b);
  });
  wrap.appendChild(nav);
  wrap.appendChild(caption);
  wrap.appendChild(img);
  show(0);
  return wrap;
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

  // Optional long-form write-up (headings with a paragraph or a list)
  var sections = document.getElementById('dialog-sections');
  sections.replaceChildren();
  (p.sections || []).forEach(function(sec) {
    sections.appendChild(el('h3', 'dialog-h', sec.heading));
    if (sec.body) sections.appendChild(el('p', null, sec.body));
    if (sec.list) {
      var ul = el('ul', 'dialog-list');
      sec.list.forEach(function(item) {
        var li = el('li');
        if (typeof item === 'string') {
          li.textContent = item;
        } else {
          li.appendChild(el('strong', null, item.title));
          li.appendChild(document.createTextNode(': ' + item.desc));
        }
        ul.appendChild(li);
      });
      sections.appendChild(ul);
    }
  });

  var media = document.getElementById('dialog-media');
  media.replaceChildren();
  if (p.steps) media.appendChild(buildSteps(p));
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
