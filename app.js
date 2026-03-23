/* ══════════════════════════════════════════════════════
   app.js  —  State, navigation, and all step renderers
   Depends on: data.js, download.js
══════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────
   STATE
───────────────────────────────────────────────────── */
const resumeState = {
  field: '',
  contact:     { name: '', email: '', phone: '', location: '' },
  summary:     '',
  experiences: [{ title: '', org: '', dates: '', bullets: '' }],
  hardSkills:  [],
  softSkills:  [],
  education:   { school: '', grad: '', gpa: '', extra: '' },
};

const linkedinState = {
  field: '', who: '', skill: '', goal: '', about: '',
  expTitle: '', expOrg: '', expDates: '', expBullets: '', skills: [],
};

const portfolioState = {
  field: '', format: '',
  projects: [{ goal: '', problem: '', created: '', tools: '', outcome: '', learned: '', imageData: '', imageName: '' }],
};

const clState = {
  company: '', position: '', jobDesc: '',
  opening: '', body1: '', body2: '', closing: '',
};

const interviewState = {
  field: '', company: '', values: '', diff: '', answers: {},
};

const collegeState = {
  personalStatement: '',
  activities: ['','','','',''],
  essayDraft: '',
  thankYouNote: '',
};

const sterlingState = {
  ssCategory: '',
  serviceLog: '',
  essayDraft: '',
  thankYouNote: '',
};

/* ─────────────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────────────── */
let activeTool   = null;
let currentStep  = 0;

const TOOL_COLORS = {
  resume:      { color: '#c8973a', light: '#f7e8ca', name: 'Resume Builder'       },
  linkedin:    { color: '#243656', light: '#dce3ef', name: 'LinkedIn Builder'      },
  portfolio:   { color: '#3a7a62', light: '#dff0e9', name: 'Portfolio Builder'     },
  coverletter: { color: '#c45c3a', light: '#faeae5', name: 'Cover Letter'          },
  interview:   { color: '#7c5cbf', light: '#ede8f7', name: 'Interview Prep'        },
  college:     { color: '#1a7a8c', light: '#ddf1f5', name: 'College Applications'  },
  sterling:    { color: '#8b4db8', light: '#f0e8f7', name: 'Sterling Scholar'      },
};
let steps        = [];

function showLanding() {
  document.getElementById('landing').style.display   = 'flex';
  document.getElementById('homeHub').classList.add('hidden');
  document.getElementById('app').classList.add('hidden');
}

function showHub() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('homeHub').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
}

function showApp() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('homeHub').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

function startTool(tool) {
  activeTool  = tool;
  currentStep = 0;
  const tc = TOOL_COLORS[tool] || TOOL_COLORS.resume;
  document.documentElement.style.setProperty('--tool-color', tc.color);
  document.documentElement.style.setProperty('--tool-color-light', tc.light);
  document.body.dataset.tool = tool;
  showApp();

  const toolMap = {
    resume:      resumeSteps,
    linkedin:    linkedinSteps,
    portfolio:   portfolioSteps,
    coverletter: clSteps,
    interview:   interviewSteps,
    college:     collegeSteps,
    sterling:    sterlingSteps,
  };
  steps = toolMap[tool] || resumeSteps;
  renderStep();
}

function renderStep() {
  const c = document.getElementById('stepContainer');
  c.innerHTML = '';
  c.className = 'step-container anim';
  void c.offsetWidth; // force reflow for re-animation
  updateProgress();
  steps[currentStep](c);
  window.scrollTo(0, 0);
}

function updateProgress() {
  const pct = Math.round(((currentStep + 1) / steps.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  const tc = TOOL_COLORS[activeTool] || {};
  document.getElementById('stepLabel').innerHTML =
    `<span class="tool-name-sm">${tc.name || ''}</span>` +
    `<span class="step-num-sm">Step ${currentStep + 1} of ${steps.length}</span>`;
  document.getElementById('backBtn').style.display    = currentStep === 0 ? 'none' : 'inline-block';
}

function goBack() {
  if (currentStep > 0) { currentStep--; renderStep(); }
  else showHub();
}

function nextStep() {
  if (currentStep < steps.length - 1) { currentStep++; renderStep(); }
}

/* ─────────────────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────────────────── */
function fieldGrid(selected, onSelectFn) {
  return `<div class="field-grid">
    ${FIELDS.map(f => `
      <div class="field-card ${selected === f.id ? 'selected' : ''}"
           onclick="${onSelectFn}('${f.id}', this)">
        <span class="f-icon">${f.svg}</span>
        <span class="f-label">${f.label}</span>
      </div>`).join('')}
  </div>`;
}

function exampleBox(content) {
  return `<div class="example-section">
    <div class="example-section-header">
      <span><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span> Examples</span>
    </div>
    <div class="example-placeholder">${content}</div>
  </div>`;
}

function navButtons(backFn, nextFn, nextLabel = 'Continue →') {
  return `<div class="nav-buttons">
    <button class="btn-back" onclick="${backFn}">← Back</button>
    <button class="btn-next" onclick="${nextFn}">${nextLabel}</button>
  </div>`;
}

/* ─────────────────────────────────────────────────────
   EXPERIENCE BLOCK RENDERER
───────────────────────────────────────────────────── */
function renderExpBlocks() {
  const container = document.getElementById('exp-blocks');
  if (!container) return;
  container.innerHTML = resumeState.experiences.map((e, i) => `
    <div class="exp-block">
      <div class="exp-block-title">
        <span>Position ${i + 1}</span>
        ${i > 0 ? `<button class="btn-remove" onclick="removeExp(${i})">✕ Remove</button>` : ''}
      </div>
      <div class="form-group">
        <label class="fl">Job Title / Role</label>
        <input type="text" value="${e.title}" placeholder="Barista, Volunteer, Team Captain, Intern…"
               oninput="resumeState.experiences[${i}].title = this.value">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="fl">Organization / Company</label>
          <input type="text" value="${e.org}" placeholder="Company or school"
                 oninput="resumeState.experiences[${i}].org = this.value">
        </div>
        <div class="form-group">
          <label class="fl">Dates</label>
          <input type="text" value="${e.dates}" placeholder="June 2023 – Aug 2023"
                 oninput="resumeState.experiences[${i}].dates = this.value">
        </div>
      </div>
      <div class="form-group">
        <label class="fl">Bullet Points — one per line</label>
        <textarea rows="4"
                  oninput="resumeState.experiences[${i}].bullets = this.value"
                  placeholder="Managed daily opening procedures for a team of 6 employees…">${e.bullets}</textarea>
      </div>
    </div>`).join('');
}

function addExpBlock() {
  resumeState.experiences.push({ title: '', org: '', dates: '', bullets: '' });
  renderExpBlocks();
}

function removeExp(i) {
  resumeState.experiences.splice(i, 1);
  renderExpBlocks();
}

/* ─────────────────────────────────────────────────────
   PORTFOLIO PROJECT RENDERER
───────────────────────────────────────────────────── */
function renderPortfolioProjects() {
  const container = document.getElementById('portfolio-projects');
  if (!container) return;
  const field = portfolioState.field;

  const placeholders = {
    design:      { goal: 'Design a brand identity for a local coffee shop…', problem: 'They had no logo or consistent visual style…', created: 'Logo, color palette, business card, social templates…', tools: 'Adobe Illustrator, Figma, Photoshop…', outcome: 'Client used it for their grand opening…', learned: 'How to present concepts and handle revision feedback…' },
    business:    { goal: 'Launch a social media campaign for a school fundraiser…', problem: 'Low awareness — last year only 40 people showed up…', created: 'Instagram content calendar, flyers, email blast…', tools: 'Canva, Google Sheets, Mailchimp…', outcome: 'Attendance doubled to 80+, raised $1,500…', learned: 'Scheduling content in advance saves huge time…' },
    healthcare:  { goal: 'Assist with patient intake at a free clinic…', problem: 'Staff were overwhelmed during peak hours…', created: 'Intake checklist, organized waiting area system…', tools: 'EHR software, paper forms, communication protocols…', outcome: 'Wait times dropped by 20 minutes on average…', learned: 'Clear communication reduces patient anxiety significantly…' },
    engineering: { goal: 'Build a sensor-guided robot for FIRST Robotics…', problem: 'Autonomous navigation kept failing on curved paths…', created: 'Custom sensor mount + PID control algorithm…', tools: 'Python, RoboRIO, CAD, 3D printer…', outcome: 'Placed 2nd in autonomous challenge at state…', learned: 'Iterative testing beats trying to perfect it on paper…' },
    trades:      { goal: 'Complete residential electrical panel installation…', problem: 'Outdated wiring in a 1970s home posed fire risk…', created: 'Full panel replacement with updated breaker map…', tools: 'Wire stripper, multimeter, conduit bender, OSHA safety gear…', outcome: 'Passed all safety inspections on first review…', learned: 'Labeling every wire before disconnecting saves hours…' },
    education:   { goal: 'Tutor 4 students struggling in Algebra 1…', problem: 'All four were failing — lacked foundational fraction skills…', created: 'Weekly 1-on-1 session plans, custom practice worksheets…', tools: 'Khan Academy, Google Classroom, whiteboard…', outcome: '3 of 4 students passed with a C or better…', learned: 'Meeting students where they are matters more than the curriculum…' },
    hospitality: { goal: 'Plan and run the school\'s end-of-year banquet…', problem: 'Previous years ran 45 min over schedule with vendor issues…', created: 'Event timeline, vendor checklist, seating chart, run-of-show doc…', tools: 'Google Sheets, email coordination, venue walk-through…', outcome: 'Event ran on time, 95% positive feedback from attendees…', learned: 'A detailed run-of-show prevents almost every crisis…' },
    general:     { goal: 'Organize a neighborhood yard sale fundraiser…', problem: 'Past efforts were disorganized and raised little money…', created: 'Marketing flyers, item pricing system, volunteer schedule…', tools: 'Canva, Google Forms, Venmo for payments…', outcome: 'Raised $340 for a local animal shelter…', learned: 'Assigning roles to volunteers makes everything run smoother…' },
  };
  const ph = placeholders[field] || placeholders.general;

  container.innerHTML = portfolioState.projects.map((p, i) => `
    <div class="exp-block">
      <div class="exp-block-title">
        <span>Project ${i + 1}</span>
        ${i > 0 ? `<button class="btn-remove" onclick="removePortfolioProject(${i})">✕ Remove</button>` : ''}
      </div>

      <div class="proj-image-row">
        <div class="proj-image-zone" id="imgZone${i}">
          ${p.imageData
            ? `<img src="${p.imageData}" alt="Project ${i+1}" class="proj-img-preview">
               <div class="proj-img-actions">
                 <label class="proj-img-btn">Replace <input type="file" accept="image/*" style="display:none" onchange="handleProjectImage(${i}, this)"></label>
                 <button class="proj-img-btn danger" onclick="clearProjectImage(${i})">Remove</button>
               </div>`
            : `<div class="proj-img-placeholder">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                 <span>Project Image</span>
                 <label class="proj-img-upload-btn">Upload Photo <input type="file" accept="image/*" style="display:none" onchange="handleProjectImage(${i}, this)"></label>
               </div>`
          }
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="fl">What was the goal?</label>
          <input type="text" value="${p.goal}" placeholder="${ph.goal}"
                 oninput="portfolioState.projects[${i}].goal = this.value">
        </div>
        <div class="form-group">
          <label class="fl">What problem were you solving?</label>
          <input type="text" value="${p.problem}" placeholder="${ph.problem}"
                 oninput="portfolioState.projects[${i}].problem = this.value">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="fl">What did you create?</label>
          <input type="text" value="${p.created}" placeholder="${ph.created}"
                 oninput="portfolioState.projects[${i}].created = this.value">
        </div>
        <div class="form-group">
          <label class="fl">Tools you used</label>
          <input type="text" value="${p.tools}" placeholder="${ph.tools}"
                 oninput="portfolioState.projects[${i}].tools = this.value">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="fl">What was the outcome?</label>
          <input type="text" value="${p.outcome}" placeholder="${ph.outcome}"
                 oninput="portfolioState.projects[${i}].outcome = this.value">
        </div>
        <div class="form-group">
          <label class="fl">What did you learn?</label>
          <input type="text" value="${p.learned}" placeholder="${ph.learned}"
                 oninput="portfolioState.projects[${i}].learned = this.value">
        </div>
      </div>
    </div>`).join('');
}

function handleProjectImage(i, input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    portfolioState.projects[i].imageData = e.target.result;
    portfolioState.projects[i].imageName = file.name;
    renderPortfolioProjects();
  };
  reader.readAsDataURL(file);
}

function clearProjectImage(i) {
  portfolioState.projects[i].imageData = '';
  portfolioState.projects[i].imageName = '';
  renderPortfolioProjects();
}

function addPortfolioProject() {
  portfolioState.projects.push({ goal: '', problem: '', created: '', tools: '', outcome: '', learned: '', imageData: '', imageName: '' });
  renderPortfolioProjects();
}

function removePortfolioProject(i) {
  portfolioState.projects.splice(i, 1);
  renderPortfolioProjects();
}

/* ─────────────────────────────────────────────────────
   FIELD SELECTORS
───────────────────────────────────────────────────── */
function selectResumeField(id, el)    { resumeState.field    = id; highlightField(el); showFieldFocus(id, 'resume'); }
function selectLinkedinField(id, el)  { linkedinState.field  = id; highlightField(el); showFieldFocus(id, 'linkedin'); }
function selectPortfolioField(id, el) { portfolioState.field = id; highlightField(el); showFieldFocus(id, 'portfolio'); }
function selectInterviewField(id, el) { interviewState.field = id; highlightField(el); showFieldFocus(id, 'interview'); }

function highlightField(el) {
  document.querySelectorAll('.field-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

/* ─────────────────────────────────────────────────────
   MISC HELPERS
───────────────────────────────────────────────────── */
function insertIntoSummary(v) {
  const t = document.getElementById('sum-txt');
  if (!t) return;
  const pos   = t.selectionStart;
  t.value     = t.value.slice(0, pos) + v + ' ' + t.value.slice(pos);
  resumeState.summary = t.value;
  t.focus();
}

function buildHeadline() {
  const parts = [];
  if (linkedinState.who)   parts.push(linkedinState.who);
  if (linkedinState.skill) parts.push(linkedinState.skill);
  if (linkedinState.goal)  parts.push('Open to ' + linkedinState.goal);
  return parts.join(' | ') || 'Your headline will appear here as you type…';
}

function updateHeadlinePreview() {
  const el = document.getElementById('headlinePreview');
  if (el) el.textContent = buildHeadline();
}

function toggleResumeSkill(type, skill, checked) {
  const arr = type === 'hard' ? resumeState.hardSkills : resumeState.softSkills;
  if (checked && !arr.includes(skill)) arr.push(skill);
  if (!checked) { const i = arr.indexOf(skill); if (i > -1) arr.splice(i, 1); }
}

/* ══════════════════════════════════════════════════════
   RESUME BUILDER STEPS
══════════════════════════════════════════════════════ */
const resumeSteps = [

  /* 0 — Key Concepts */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Before You Begin · Resume Builder</div>
        <h1 class="step-title">A Few Key Concepts</h1>
        <p class="step-desc">Knowing these four ideas will make your resume significantly stronger. Takes about two minutes.</p>
      </div>
      <div class="glossary-grid">
        <div class="gcard">
          <div class="gcard-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
          <div class="gcard-title">Action Verbs</div>
          <div class="gcard-body">Strong action verbs start your bullet points and show employers what you actually <em>did</em> — not just what you were responsible for. They make you sound confident and capable.</div>
          <div class="gcard-example"><span class="inline-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span> "Responsible for social media"<br><span class="inline-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></span> "Managed social media accounts, growing followers by 40%"</div>
        </div>
        <div class="gcard">
          <div class="gcard-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
          <div class="gcard-title">Why Field-Specific Matters</div>
          <div class="gcard-body">A healthcare employer looks for different skills than a design studio. Tailoring your resume to your field shows employers you understand their world — and you get past ATS filters faster.</div>
          <div class="gcard-example">Healthcare: "Assisted patients" vs. Design: "Illustrated brand assets" — same role, different language.</div>
        </div>
        <div class="gcard">
          <div class="gcard-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg></div>
          <div class="gcard-title">Soft Skills</div>
          <div class="gcard-body">Soft skills are personal traits that affect how you work — communication, teamwork, adaptability. Employers consistently rank them as top hiring factors, often above technical skills.</div>
          <div class="gcard-example">Hard skill: "Adobe Illustrator"<br>Soft skill: "Collaborated across teams to meet tight deadlines"</div>
        </div>
        <div class="gcard">
          <div class="gcard-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg></div>
          <div class="gcard-title">What is ATS?</div>
          <div class="gcard-body">Applicant Tracking Systems scan resumes <em>before</em> a human reads them. They filter out resumes with unusual formatting or missing keywords. Simple formatting is key.</div>
          <div class="gcard-example"><span class="inline-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></span> Simple font, standard headings, no images = passes ATS<br><span class="inline-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span> Tables, graphics, text boxes = often rejected</div>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-back" onclick="showHub()">← Back to Hub</button>
        <button class="btn-next" onclick="nextStep()">I'm Ready →</button>
      </div>`;
  },

  /* 1 — Field */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 1 · Resume Builder</div>
        <h1 class="step-title">Choose Your Field</h1>
        <p class="step-desc">This personalizes your action verbs, skill suggestions, and summary starter throughout the entire builder.</p>
      </div>
      ${fieldGrid(resumeState.field, 'selectResumeField')}

      <div class="nav-buttons">
        <button class="btn-back" onclick="goBack()">← Back</button>
        <button class="btn-next" onclick="if(resumeState.field){nextStep();}else{alert('Please choose a field first!')}">Continue →</button>
      </div>`;
  },

  /* 2 — Contact */
  function (c) {
    const s = resumeState.contact;
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 2 · Resume Builder</div>
        <h1 class="step-title">Contact Information</h1>
        <p class="step-desc">This is the first thing employers see. Keep it clean, accurate, and professional.</p>
      </div>
      <div class="tip rust">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span> Privacy Note</strong>
        Not comfortable putting in your real info right now? That's totally fine — use placeholder information while you practice. Just remember to replace it with your real details before submitting to an actual job!
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="15" x2="8" y2="15"/><line x1="16" y1="15" x2="16" y2="15"/></svg></span> ATS Tip</strong>
        Avoid fancy fonts, text boxes, and images. ATS systems scan plain text — simplicity wins every time.
      </div>
      <div class="form-group">
        <label class="fl">Full Name</label>
        <input type="text" value="${s.name}" placeholder="Jane Smith"
               oninput="resumeState.contact.name = this.value">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="fl">Email Address</label>
          <input type="email" value="${s.email}" placeholder="jane@email.com"
                 oninput="resumeState.contact.email = this.value">
        </div>
        <div class="form-group">
          <label class="fl">Phone Number</label>
          <input type="tel" value="${s.phone}" placeholder="(555) 123-4567"
                 oninput="resumeState.contact.phone = this.value">
        </div>
      </div>
      <div class="form-group">
        <label class="fl">City, State</label>
        <input type="text" value="${s.location}" placeholder="Austin, TX"
               oninput="resumeState.contact.location = this.value">
      </div>
      <div class="tip sage">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Pro Tip</strong>
        Use a professional email — firstname.lastname@gmail.com is ideal. Avoid nicknames like "coolkid99" or birth years.
      </div>
      ${exampleBox(`<strong><span class="inline-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></span> Good:</strong> Jane Smith · jane.smith@gmail.com · (555) 123-4567 · Austin, TX<br>
        <strong><span class="inline-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span> Avoid:</strong> jsmith99queen@hotmail.com (use a clean, professional address)`)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 3 — Summary */
  function (c) {
    const fd = FIELD_DATA[resumeState.field] || FIELD_DATA.general;
    if (!resumeState.summary) resumeState.summary = fd.summary;
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 3 · Resume Builder</div>
        <h1 class="step-title">Professional Summary</h1>
        <p class="step-desc">2–3 sentences that tell employers who you are and what you bring. We've started it for you — customize it to sound like you.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span> Writing Formula</strong>
        Who you are → Your top skills → Your goal. Keep it under 60 words. Write in third person (no "I").
      </div>
      <div class="form-group">
        <label class="fl">Your Summary</label>
        <textarea id="sum-txt" rows="5" oninput="resumeState.summary = this.value">${resumeState.summary}</textarea>
      </div>
      <div class="chips-label"><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Click a verb to insert it into your summary</div>
      <div class="chips">${fd.verbs.map(v => `<div class="chip" onclick="insertIntoSummary('${v}')">${v}</div>`).join('')}</div>
      ${exampleBox(FIELD_EXAMPLES.resumeSummary[resumeState.field] || FIELD_EXAMPLES.resumeSummary.general)}
      ${navButtons('goBack()', "resumeState.summary=document.getElementById('sum-txt').value;nextStep()")}`;
  },

  /* 4 — Experience */
  function (c) {
    const fd       = FIELD_DATA[resumeState.field] || FIELD_DATA.general;
    const fieldLabel = FIELDS.find(f => f.id === resumeState.field)?.label || 'Your Field';
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 4 · Resume Builder</div>
        <h1 class="step-title">Experience</h1>
        <p class="step-desc">Jobs, volunteering, clubs, school projects — if you contributed, it counts. Add as many positions as you need.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Bullet Point Formula</strong>
        <strong style="font-size:1rem;text-transform:none;letter-spacing:0;color:var(--ink)">Action Verb + What You Did + Result</strong><br>
        Example: <em>Organized a school fundraiser that raised $2,000 for the local food bank.</em>
      </div>
      <div id="exp-blocks"></div>
      <button class="btn-add" onclick="addExpBlock()">+ Add Another Position</button>
      <div class="chips-label"><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg></span> Action Verbs for ${fieldLabel}</div>
      <div class="chips">${fd.verbs.map(v => `<div class="chip">${v}</div>`).join('')}</div>
            ${exampleBox(FIELD_EXAMPLES.resumeExperience[resumeState.field] || FIELD_EXAMPLES.resumeExperience.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
    renderExpBlocks();
  },

  /* 5 — Skills */
  function (c) {
    const hard       = HARD_SKILLS[resumeState.field] || HARD_SKILLS.general;
    const soft       = SOFT_SKILLS[resumeState.field] || SOFT_SKILLS.general;
    const allSoft    = SOFT_SKILLS_LIST;
    const fieldLabel = FIELDS.find(f => f.id === resumeState.field)?.label || 'Your Field';
    const fieldData  = FIELD_DATA[resumeState.field] || FIELD_DATA.general;
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 5 · Resume Builder</div>
        <h1 class="step-title">Skills</h1>
        <p class="step-desc">Select the skills that genuinely describe you. Honesty matters — interviewers may ask you about anything on here.</p>
      </div>
      <div class="tip sage">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Top soft skills for ${fieldLabel}:</strong>
        ${soft.join(' · ')}
      </div>
      <div class="skill-cols">
        <div class="skill-col">
          <h4><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span> Hard Skills — ${fieldLabel}</h4>
          ${hard.map(s => `<label class="scheck">
            <input type="checkbox" ${resumeState.hardSkills.includes(s) ? 'checked' : ''}
                   onchange="toggleResumeSkill('hard','${s}',this.checked)"> ${s}
          </label>`).join('')}
        </div>
        <div class="skill-col">
          <h4><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14"/></svg></span> Soft Skills</h4>
          ${allSoft.map(s => `<label class="scheck">
            <input type="checkbox" ${resumeState.softSkills.includes(s) ? 'checked' : ''}
                   onchange="toggleResumeSkill('soft','${s}',this.checked)"> ${s}
          </label>`).join('')}
        </div>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span> ATS Keywords for ${fieldLabel}</strong><br>
        Including these terms helps your resume pass automated filters:<br>
        <em>${(fieldData.atsKeywords || []).join(' · ')}</em>
      </div>
            ${exampleBox(FIELD_EXAMPLES.resumeSkills[resumeState.field] || FIELD_EXAMPLES.resumeSkills.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 6 — ATS Check */
  function (c) {
    const fieldData  = FIELD_DATA[resumeState.field] || FIELD_DATA.general;
    const fieldLabel = FIELDS.find(f => f.id === resumeState.field)?.label || 'Your Field';
    const avoid      = fieldData.avoidPhrases || [];
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 6 · Resume Builder</div>
        <h1 class="step-title">ATS Check</h1>
        <p class="step-desc">Before you download, make sure your resume can pass the automated filters most companies use.</p>
      </div>
      <div class="tip navy">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="15" x2="8" y2="15"/><line x1="16" y1="15" x2="16" y2="15"/></svg></span> What is ATS?</strong>
        Most companies use Applicant Tracking Systems to automatically filter resumes before a human reads them. If your resume has fancy formatting or missing keywords, it may never reach a hiring manager.
      </div>
      <ul class="ats-list">
        <li><span class="ats-check">✓</span> No images, icons, or graphics in your resume file</li>
        <li><span class="ats-check">✓</span> Standard section headings (Experience, Education, Skills)</li>
        <li><span class="ats-check">✓</span> Simple, readable font — avoid decorative styles</li>
        <li><span class="ats-check">✓</span> Save as PDF or .docx format</li>
        <li><span class="ats-check">✓</span> Keywords match the job description you're applying to</li>
        <li><span class="ats-check">✓</span> One page (for students and recent grads)</li>
        <li><span class="ats-warn">✗</span> No tables, columns, or text boxes</li>
        <li><span class="ats-warn">✗</span> No contact info in headers/footers (ATS often can't read those)</li>
      </ul>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span> Power keywords for ${fieldLabel}:</strong><br>
        <em>${(fieldData.atsKeywords || []).join(' · ')}</em><br><br>
        <strong><span class="inline-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span> Avoid these weak phrases for ${fieldLabel}:</strong><br>
        <em style="color:var(--rust)">${avoid.join(' · ')}</em>
      </div>
      <div class="form-group">
        <label class="fl"><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Optional: Paste a job description to identify keywords to include</label>
        <textarea rows="4" placeholder="Paste the job posting here and look for important words to match in your resume…"></textarea>
      </div>
            ${exampleBox(FIELD_EXAMPLES.resumeATS[resumeState.field] || FIELD_EXAMPLES.resumeATS.general)}
      ${navButtons('goBack()', 'nextStep()', 'Preview My Resume →')}`;
  },

  /* 7 — Preview & Download */
  function (c) {
    const s         = resumeState;
    const allSkills = [...s.hardSkills, ...s.softSkills];
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 7 · Resume Builder</div>
        <h1 class="step-title">Review & Download</h1>
        <p class="step-desc">Check every line carefully — typos, accuracy, and make sure your contact info is real if you're submitting this for a job.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span> Before You Download</strong>
        Read everything out loud. Fix any typos. Confirm all contact info is correct and professional.
      </div>
      <div class="resume-preview">
        <div class="rp-name">${s.contact.name || 'Your Name'}</div>
        <div class="rp-contact">${[s.contact.email, s.contact.phone, s.contact.location].filter(Boolean).join(' · ') || 'your@email.com · (555) 000-0000 · City, State'}</div>
        ${s.summary ? `<div class="rp-sec"><div class="rp-sec-title">Professional Summary</div><p>${s.summary}</p></div>` : ''}
        ${s.experiences.filter(e => e.title).length ? `
          <div class="rp-sec">
            <div class="rp-sec-title">Experience</div>
            ${s.experiences.filter(e => e.title).map(e => `
              <div class="rp-entry">
                <div class="rp-entry-head">${e.title}${e.org ? ' — ' + e.org : ''} <span class="rp-entry-meta">${e.dates}</span></div>
                ${e.bullets ? `<ul class="rp-bullets">${e.bullets.split('\n').filter(b => b.trim()).map(b => `<li>${b.trim()}</li>`).join('')}</ul>` : ''}
              </div>`).join('')}
          </div>` : ''}
        ${allSkills.length ? `<div class="rp-sec"><div class="rp-sec-title">Skills</div><p>${allSkills.join(' · ')}</p></div>` : ''}
      </div>
      <div class="celebrate">
        <span class="celebrate-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
        <h2>You're resume-ready!</h2>
        <p>Download your resume in your preferred format and start applying. You built something real today.</p>
        <div class="download-group">
          <button class="download-btn docx" onclick="downloadDOCX()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span> Download .docx</button>
          <button class="download-btn pdf"  onclick="downloadPDF()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span> Download PDF</button>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-back" onclick="goBack()">← Back</button>
        <button class="btn-next" onclick="showHub()">Back to Hub →</button>
      </div>`;
  },
];

/* ══════════════════════════════════════════════════════
   LINKEDIN BUILDER STEPS
══════════════════════════════════════════════════════ */
const linkedinSteps = [

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Before You Begin · LinkedIn Builder</div>
        <h1 class="step-title">Why LinkedIn Matters</h1>
        <p class="step-desc">LinkedIn is the world's largest professional network — and employers actively use it to find candidates like you.</p>
      </div>
      <div class="module-intro">
        <span class="module-intro-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></span>
        <h3>What LinkedIn Does for You</h3>
        <ul class="benefit-list">
          <li>Lets employers find <em>you</em> — even before you apply</li>
          <li>Shows your skills, goals, and personality professionally</li>
          <li>Builds credibility with a complete, polished profile</li>
          <li>Connects you to internships, jobs, and industry contacts</li>
          <li>Stays with you for your entire career — start building now</li>
        </ul>
      </div>
      <div class="tip navy">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span> Key Insight</strong>
        Recruiters use LinkedIn's search to find candidates by skills and keywords. A strong profile means opportunities can come to <em>you</em>.
      </div>
      ${navButtons('showHub()', 'nextStep()', 'Build My Profile →')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 1 · LinkedIn Builder</div>
        <h1 class="step-title">Choose Your Field</h1>
        <p class="step-desc">This shapes your headline suggestions, keywords, and skill recommendations.</p>
      </div>
      ${fieldGrid(linkedinState.field, 'selectLinkedinField')}
      ${navButtons('goBack()', "if(linkedinState.field){nextStep();}else{alert('Please choose a field!')}", 'Continue →')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 2 · LinkedIn Builder</div>
        <h1 class="step-title">Profile Photo</h1>
        <p class="step-desc">Your photo is the first thing people notice. A good photo increases profile views by up to 14x.</p>
      </div>
      <ul class="ats-list">
        <li><span class="ats-check">✓</span> Neutral or clean background (white, grey, or outdoor)</li>
        <li><span class="ats-check">✓</span> Good, natural lighting — face the light source</li>
        <li><span class="ats-check">✓</span> Professional or smart-casual clothing</li>
        <li><span class="ats-check">✓</span> Only you in the photo — no group shots</li>
        <li><span class="ats-check">✓</span> Face takes up 60–70% of the frame</li>
        <li><span class="ats-check">✓</span> Friendly, confident expression</li>
        <li><span class="ats-warn">✗</span> No heavy filters, sunglasses, or cropped group photos</li>
      </ul>
      ${exampleBox(`<strong>Great options for students:</strong><br>
        • A headshot taken outside with natural light and a clean background<br>
        • A classroom or school setting with a neutral background<br>
        • A professional photo from a school event or award ceremony`)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 3 · LinkedIn Builder</div>
        <h1 class="step-title">Build Your Headline</h1>
        <p class="step-desc">Your headline appears under your name everywhere on LinkedIn. Make it specific and searchable.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Headline Formula</strong>
        <strong style="font-size:1rem;text-transform:none;letter-spacing:0;color:var(--ink)">Who You Are | Key Skill | Career Goal</strong><br>
        Keep it under 120 characters. Use keywords employers search for.
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="fl">I am a…</label>
          <input type="text" value="${linkedinState.who}" placeholder="Aspiring Graphic Designer, Future Nurse…"
                 oninput="linkedinState.who = this.value; updateHeadlinePreview()">
        </div>
        <div class="form-group">
          <label class="fl">My strongest skill is…</label>
          <input type="text" value="${linkedinState.skill}" placeholder="Adobe Illustrator, Patient Care…"
                 oninput="linkedinState.skill = this.value; updateHeadlinePreview()">
        </div>
      </div>
      <div class="form-group">
        <label class="fl">I am seeking…</label>
        <input type="text" value="${linkedinState.goal}" placeholder="Internship Opportunities, Entry-Level Healthcare Role…"
               oninput="linkedinState.goal = this.value; updateHeadlinePreview()">
      </div>
      <div class="headline-preview">
        <div class="headline-preview-label">Your LinkedIn Headline Preview</div>
        <div class="headline-preview-text" id="headlinePreview">${buildHeadline()}</div>
      </div>
            ${exampleBox(FIELD_EXAMPLES.linkedinHeadline[linkedinState.field] || FIELD_EXAMPLES.linkedinHeadline.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 4 · LinkedIn Builder</div>
        <h1 class="step-title">About Section</h1>
        <p class="step-desc">Your "About" is your story. Write in first person — warm, confident, and honest.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span> Three-Paragraph Structure</strong>
        <strong style="text-transform:none;letter-spacing:0;font-size:.95rem;color:var(--ink)">Para 1:</strong> Who you are + your passion<br>
        <strong style="text-transform:none;letter-spacing:0;font-size:.95rem;color:var(--ink)">Para 2:</strong> What you're good at + relevant experience<br>
        <strong style="text-transform:none;letter-spacing:0;font-size:.95rem;color:var(--ink)">Para 3:</strong> What you're looking for + how to reach you
      </div>
      <div class="form-group">
        <label class="fl">Your About Section</label>
        <textarea rows="8" oninput="linkedinState.about = this.value"
                  placeholder="I am a passionate design student at [School] with a love for visual storytelling…">${linkedinState.about}</textarea>
      </div>
      <div class="tip sage">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Tips</strong>
        Write in first person ("I am…" not "Jane is…"). Mention at least one soft skill. End with a call to action.
      </div>
            ${exampleBox(FIELD_EXAMPLES.linkedinAbout[linkedinState.field] || FIELD_EXAMPLES.linkedinAbout.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 5 · LinkedIn Builder</div>
        <h1 class="step-title">Networking Strategy</h1>
        <p class="step-desc">LinkedIn is most powerful when you actually connect with people. Here's how to do it without feeling awkward.</p>
      </div>
      <div class="tip sage"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M17 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg></span> Who to Connect With First</strong></div>
      <ul class="ats-list">
        <li><span class="ats-check">✓</span> Teachers and school counselors</li>
        <li><span class="ats-check">✓</span> Past employers, even from part-time jobs</li>
        <li><span class="ats-check">✓</span> Family friends who work in your field</li>
        <li><span class="ats-check">✓</span> Internship and program coordinators</li>
        <li><span class="ats-check">✓</span> School alumni who are now working professionals</li>
      </ul>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span> Always Send a Message When You Connect</strong>
        A short personal note is the difference between being remembered and being ignored.
      </div>
            ${exampleBox(FIELD_EXAMPLES.linkedinNetworking[linkedinState.field] || FIELD_EXAMPLES.linkedinNetworking.general)}
      <div class="celebrate">
        <span class="celebrate-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></span>
        <h2>Your LinkedIn is ready!</h2>
        <p>Take these prompts and build your real profile at linkedin.com. The sooner you start, the sooner opportunities find you.</p>
        <div class="download-group">
          <button class="download-btn pdf"  onclick="downloadLinkedinPDF()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span> Download PDF</button>
          <button class="download-btn docx" onclick="downloadLinkedinDOCX()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span> Download .docx</button>
          <a class="download-btn link" href="https://www.linkedin.com/profile/edit" target="_blank">Open LinkedIn →</a>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-back" onclick="goBack()">← Back</button>
        <button class="btn-next" onclick="showHub()">Back to Hub →</button>
      </div>`;
  },
];

/* ══════════════════════════════════════════════════════
   PORTFOLIO BUILDER STEPS
══════════════════════════════════════════════════════ */
const portfolioSteps = [

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Before You Begin · Portfolio Builder</div>
        <h1 class="step-title">Show Your Work, Not Just Your Words</h1>
        <p class="step-desc">A portfolio is proof. Anyone can say they're creative — your portfolio shows it.</p>
      </div>
      <div class="module-intro">
        <span class="module-intro-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/></svg></span>
        <h3>What a Strong Portfolio Does</h3>
        <ul class="benefit-list">
          <li>Shows employers real examples of what you can do</li>
          <li>Demonstrates growth, process, and problem-solving — not just results</li>
          <li>Sets you apart from candidates with similar resumes</li>
          <li>Works especially well for design, tech, education, business, and trades</li>
        </ul>
      </div>
      <div class="form-group">
        <label class="fl">Choose Your Portfolio Format</label>
        <select onchange="portfolioState.format = this.value">
          <option value="">Select a format…</option>
          <option value="pdf"     ${portfolioState.format==='pdf'?'selected':''}>PDF Portfolio (easiest to share)</option>
          <option value="website" ${portfolioState.format==='website'?'selected':''}>Personal Website (Google Sites, Wix, Squarespace)</option>
          <option value="drive"   ${portfolioState.format==='drive'?'selected':''}>Project Showcase (Google Drive / Slides)</option>
          <option value="behance" ${portfolioState.format==='behance'?'selected':''}>Behance / Dribbble (design-specific)</option>
          <option value="github"  ${portfolioState.format==='github'?'selected':''}>GitHub (tech / coding projects)</option>
        </select>
      </div>
      ${navButtons('showHub()', 'nextStep()', 'Continue →')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 1 · Portfolio Builder</div>
        <h1 class="step-title">Choose Your Field</h1>
        <p class="step-desc">This personalizes the project types, suggestions, and descriptions we recommend.</p>
      </div>
      ${fieldGrid(portfolioState.field, 'selectPortfolioField')}
      ${navButtons('goBack()', "if(portfolioState.field){nextStep();}else{alert('Please choose a field!')}", 'Continue →')}`;
  },

  function (c) {
    const fieldLabel   = FIELDS.find(f => f.id === portfolioState.field)?.label || 'Your Field';
    const projTypes    = PORTFOLIO_PROJECTS[portfolioState.field] || PORTFOLIO_PROJECTS.general;
    const fieldGuide   = {
      design:      { highlight: 'Show process — sketches, iterations, final result. Name the tools used. Include a real client project if you have one.', format: 'Behance · PDF Portfolio · Personal Website · Dribbble' },
      business:    { highlight: 'Lead with measurable outcomes. Show your thinking process alongside the result. Include any real-world impact (fundraiser totals, follower growth).', format: 'Google Slides PDF · Personal Website · LinkedIn Featured' },
      healthcare:  { highlight: 'Include certifications (CPR, First Aid, CNA). Describe patient interactions (no names — HIPAA). Show empathy and communication through reflection writing.', format: 'PDF Binder · Google Drive Folder · Simple Website' },
      engineering: { highlight: 'Document the problem, approach, and solution. Include code snippets, diagrams, or CAD screenshots. Show iteration — what didn\'t work and what you learned.', format: 'GitHub Profile · Personal Website · PDF with Screenshots' },
      trades:      { highlight: 'Show before and after on any repair or build. List all certifications. Describe tools and equipment you operate. Include apprenticeship or shop hours.', format: 'PDF with Photos · Google Drive Folder · Simple Website' },
      education:   { highlight: 'Show student growth or outcomes you contributed to. Demonstrate differentiated instruction. Include leadership roles in school or youth programs.', format: 'PDF Portfolio · Google Drive Folder · Simple Website' },
      hospitality: { highlight: 'Document events you planned or coordinated. Include performance metrics: ratings, attendance, revenue. Show problem-solving with difficult guests.', format: 'PDF Portfolio · Google Drive · Simple Website' },
      general:     { highlight: 'Any proof of responsibility: babysitting, lawn care, family business help. School projects that show creativity or problem-solving. Community involvement, clubs, leadership.', format: 'Google Slides PDF · Google Site · Physical Binder' },
    };
    const guide = fieldGuide[portfolioState.field] || fieldGuide.general;
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 2 · Portfolio Builder</div>
        <h1 class="step-title">Select Your Projects</h1>
        <p class="step-desc">Choose 3–6 projects that best show your skill, creativity, and growth. Quality over quantity every time.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span> Best project types for ${fieldLabel}:</strong><br>
        ${projTypes.map(p => `<span style="display:inline-block;background:var(--gold-light);border-radius:100px;padding:2px 10px;font-size:.8rem;margin:2px 2px;">${p}</span>`).join('')}
      </div>
      <div class="tip sage">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> What to highlight:</strong> ${guide.highlight}<br><br>
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Best format for ${fieldLabel}:</strong> ${guide.format}
      </div>
      ${portfolioState.field === 'design' ? `
      <div class="tip" style="background:#f5edfb;border-left-color:#8b4db8">
        <strong style="color:#8b4db8"><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span> You're a Designer — Your Portfolio IS Your Resume</strong>
        Employers in design barely read your resume. They click your portfolio link first. Every project should show your <em>process</em>, not just the final file. Include the rough sketches, the first bad version, the client feedback, and the final result. That journey is what separates a student with Illustrator skills from a designer who actually thinks visually. Use Behance or a personal site — a PDF alone won't cut it in this field.
      </div>` : ''}
      <div id="portfolio-projects"></div>
      <button class="btn-add" onclick="addPortfolioProject()">+ Add Another Project</button>
      ${exampleBox(PORTFOLIO_EXAMPLES[portfolioState.field] || PORTFOLIO_EXAMPLES.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
    renderPortfolioProjects();
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 3 · Portfolio Builder</div>
        <h1 class="step-title">Organize & Present</h1>
        <p class="step-desc">How you organize your portfolio is as important as what's in it.</p>
      </div>
      <ul class="ats-list">
        <li><span class="ats-check">✓</span> Lead with your strongest project — first impressions matter</li>
        <li><span class="ats-check">✓</span> Use consistent fonts and colors throughout</li>
        <li><span class="ats-check">✓</span> Include a short description with every project</li>
        <li><span class="ats-check">✓</span> Show the process, not just the final result</li>
        <li><span class="ats-check">✓</span> Keep navigation simple — 3 clicks to anything</li>
        <li><span class="ats-warn">✗</span> Avoid too many fonts, clutter, or long text blocks</li>
        <li><span class="ats-warn">✗</span> Don't include unfinished or very early-stage work</li>
      </ul>
      ${exampleBox(`<strong>Suggested order:</strong><br>
        1. Your best / most impressive project (lead strong)<br>
        2. A project that shows a different skill or medium<br>
        3. A collaborative or team-based project<br>
        4. A project that shows growth or problem-solving`)}
      <div class="celebrate">
        <span class="celebrate-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48"><path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/></svg></span>
        <h2>Portfolio framework complete!</h2>
        <p>Use your project descriptions to build your real portfolio in your chosen format.</p>
        <div class="download-group">
          <button class="download-btn pdf"  onclick="downloadPortfolioPDF()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span> Download PDF</button>
          <button class="download-btn docx" onclick="downloadPortfolioDOCX()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span> Download .docx</button>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-back" onclick="goBack()">← Back</button>
        <button class="btn-next" onclick="showHub()">Back to Hub →</button>
      </div>`;
  },
];

/* ══════════════════════════════════════════════════════
   COVER LETTER STEPS
══════════════════════════════════════════════════════ */
const clSteps = [

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Before You Begin · Cover Letter</div>
        <h1 class="step-title">Why Cover Letters Work</h1>
        <p class="step-desc">A great cover letter answers three questions: Why you? Why this job? Why now?</p>
      </div>
      <div class="module-intro">
        <span class="module-intro-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
        <h3>What Makes a Cover Letter Powerful</h3>
        <ul class="benefit-list">
          <li>Shows personality and communication skills your resume can't</li>
          <li>Connects your experience directly to what the employer needs</li>
          <li>Demonstrates genuine interest — not just a mass application</li>
          <li>Gives you space to address anything unusual in your background</li>
        </ul>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg></span> Avoid Generic Templates</strong>
        "I am writing to express my interest in this position" — every hiring manager has read this 500 times. We'll help you write something real.
      </div>
      ${navButtons('showHub()', 'nextStep()', 'Start Writing →')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 1 · Cover Letter</div>
        <h1 class="step-title">Job Information</h1>
        <p class="step-desc">Enter details about the specific job you're applying for. The more specific, the stronger your letter.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg></span> Keyword Tip</strong>
        Paste the job description below and look for key skills and phrases. Use those exact words in your cover letter — it helps with ATS and shows you read the posting.
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="fl">Company Name</label>
          <input type="text" value="${clState.company}" placeholder="BrightCo, City Hospital…"
                 oninput="clState.company = this.value">
        </div>
        <div class="form-group">
          <label class="fl">Position Title</label>
          <input type="text" value="${clState.position}" placeholder="Marketing Intern, Patient Care Aide…"
                 oninput="clState.position = this.value">
        </div>
      </div>
      <div class="form-group">
        <label class="fl">Job Description / Key Requirements</label>
        <textarea rows="5" oninput="clState.jobDesc = this.value"
                  placeholder="Paste the job description here…">${clState.jobDesc}</textarea>
      </div>
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 2 · Cover Letter</div>
        <h1 class="step-title">Opening Paragraph</h1>
        <p class="step-desc">Hook them immediately. State the role, show genuine excitement, and connect it to your field.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Opening Formula</strong>
        State the position + Show excitement + Connect to your passion<br>
        <em>Example: "I'm excited to apply for the Marketing Intern role at ${clState.company || '[Company]'} because I'm passionate about digital strategy and brand storytelling."</em>
      </div>
      <div class="form-group">
        <label class="fl">Your Opening Paragraph</label>
        <textarea rows="5" oninput="clState.opening = this.value"
                  placeholder="I'm thrilled to apply for the ${clState.position || '[Position]'} at ${clState.company || '[Company]'} because…">${clState.opening}</textarea>
      </div>
            ${exampleBox(FIELD_EXAMPLES_COVER_OPENING[resumeState.field] || FIELD_EXAMPLES_COVER_OPENING.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 3 · Cover Letter</div>
        <h1 class="step-title">Body Paragraphs</h1>
        <p class="step-desc">This is where you prove you're the right person. Use real examples, not vague claims.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Body Structure</strong>
        Para 1: Relevant experience + one specific measurable example<br>
        Para 2: Soft skills + how you'd contribute to their team
      </div>
      <div class="form-group">
        <label class="fl">Paragraph 1 — Relevant Experience</label>
        <textarea rows="4" oninput="clState.body1 = this.value"
                  placeholder="Tell a short story. Include one measurable example — numbers, outcomes, or impact…">${clState.body1}</textarea>
      </div>
      <div class="form-group">
        <label class="fl">Paragraph 2 — Soft Skills & Strengths</label>
        <textarea rows="4" oninput="clState.body2 = this.value"
                  placeholder="Describe how you work — your communication style, teamwork, adaptability — and connect it to this role…">${clState.body2}</textarea>
      </div>
            ${exampleBox(FIELD_EXAMPLES.coverLetterBody[resumeState.field] || FIELD_EXAMPLES.coverLetterBody.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 4 · Cover Letter</div>
        <h1 class="step-title">Closing & Final Check</h1>
        <p class="step-desc">End with confidence. Reaffirm your interest, thank them, and invite next steps.</p>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Closing Formula</strong>
        Reaffirm interest + Express appreciation + State availability
      </div>
      <div class="form-group">
        <label class="fl">Your Closing Paragraph</label>
        <textarea rows="4" oninput="clState.closing = this.value"
                  placeholder="I would love the opportunity to contribute to your team and discuss how my skills align with your needs. Thank you for your time and consideration…">${clState.closing}</textarea>
      </div>
      <div class="tip navy"><strong><span class="inline-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></span> Final Checklist</strong></div>
      <ul class="ats-list">
        <li><span class="ats-check">✓</span> One page maximum</li>
        <li><span class="ats-check">✓</span> Addressed to a specific person if possible</li>
        <li><span class="ats-check">✓</span> No generic phrases — every sentence is specific to this job</li>
        <li><span class="ats-check">✓</span> Proofread at least twice</li>
      </ul>
            ${exampleBox(FIELD_EXAMPLES.coverLetterClosing[resumeState.field] || FIELD_EXAMPLES.coverLetterClosing.general)}
      <div class="celebrate">
        <span class="celebrate-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
        <h2>Cover letter complete!</h2>
        <p>Copy your paragraphs into a clean document and pair it with your resume. You're ready to apply.</p>
        <div class="download-group">
          <button class="download-btn pdf"  onclick="downloadCoverLetterPDF()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span> Download PDF</button>
          <button class="download-btn docx" onclick="downloadCoverLetterDOCX()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span> Download .docx</button>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-back" onclick="goBack()">← Back</button>
        <button class="btn-next" onclick="showHub()">Back to Hub →</button>
      </div>`;
  },
];

/* ══════════════════════════════════════════════════════
   INTERVIEW PREP STEPS
══════════════════════════════════════════════════════ */
const interviewSteps = [

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Before You Begin · Interview Prep</div>
        <h1 class="step-title">What Interviews Actually Measure</h1>
        <p class="step-desc">Most students think interviews test what you know. They actually test how you communicate, think, and show up.</p>
      </div>
      <div class="module-intro">
        <span class="module-intro-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
        <h3>What Employers Are Really Evaluating</h3>
        <ul class="benefit-list">
          <li>Communication — can you explain yourself clearly?</li>
          <li>Confidence — do you believe in yourself?</li>
          <li>Soft skills — are you someone they'd want to work with?</li>
          <li>Cultural fit — do your values match theirs?</li>
          <li>Problem-solving — can you think on your feet?</li>
        </ul>
      </div>
      <div class="tip sage">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Remember This</strong>
        They are not looking for perfection. They're looking for a real person who communicates honestly, reflects on their experience, and shows genuine interest. You can do that.
      </div>
      ${navButtons('showHub()', 'nextStep()', 'Start Preparing →')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 1 · Interview Prep</div>
        <h1 class="step-title">Choose Your Field</h1>
        <p class="step-desc">This personalizes the practice questions to match what interviewers in your field actually ask.</p>
      </div>
      ${fieldGrid(interviewState.field, 'selectInterviewField')}
      ${navButtons('goBack()', "if(interviewState.field){nextStep();}else{alert('Please choose a field!')}", 'Continue →')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 2 · Interview Prep</div>
        <h1 class="step-title">The STAR Method</h1>
        <p class="step-desc">Most "tell me about a time when…" questions are best answered using the STAR framework.</p>
      </div>
      <div class="star-grid">
        <div class="star-card"><div class="star-letter">S</div><div class="star-word">Situation</div><div class="star-def">Set the scene. Where were you? What was happening?</div></div>
        <div class="star-card"><div class="star-letter">T</div><div class="star-word">Task</div><div class="star-def">What was your responsibility in that situation?</div></div>
        <div class="star-card"><div class="star-letter">A</div><div class="star-word">Action</div><div class="star-def">What specific steps did you take? Use action verbs!</div></div>
        <div class="star-card"><div class="star-letter">R</div><div class="star-word">Result</div><div class="star-def">What happened? What did you learn? Any numbers?</div></div>
      </div>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> STAR Example</strong>
        Question: "Tell me about a time you solved a problem."<br>
        <strong>S:</strong> "Our school fundraiser venue cancelled two days before the event."<br>
        <strong>T:</strong> "As event coordinator, I needed to find a new location immediately."<br>
        <strong>A:</strong> "I contacted 8 local businesses within 4 hours and negotiated a free community hall."<br>
        <strong>R:</strong> "The event went ahead as planned and raised $3,200 — our best year yet."
      </div>
            ${exampleBox(FIELD_EXAMPLES.interviewSTAR[interviewState.field] || FIELD_EXAMPLES.interviewSTAR.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    const specific = INTERVIEW_QUESTIONS[interviewState.field] || INTERVIEW_QUESTIONS.general;
    const common = [
      { q: 'Tell me about yourself.',         hint: 'Keep it professional. 60 seconds: who you are, what you do, what you\'re looking for.' },
      { q: 'Why should we hire you?',          hint: 'Combine your top skill + a soft skill + enthusiasm for the role.' },
      { q: 'What is your biggest strength?',   hint: 'Be specific. Name it, explain why, give a quick example.' },
      { q: 'What is a weakness?',              hint: 'Choose something real but minor. Explain what you\'re doing to improve it.' },
      { q: 'Describe a time you solved a problem.', hint: 'Perfect STAR method question. Prepare a real story.' },
    ];
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 3 · Interview Prep</div>
        <h1 class="step-title">Practice Questions</h1>
        <p class="step-desc">Think for 30 seconds, then write your answer. Honest answers are the best answers.</p>
      </div>
      <div class="tip sage"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Common Questions (All Fields)</strong></div>
      ${common.map((q, i) => `
        <div class="form-group">
          <label class="fl">${q.q}</label>
          <div style="font-size:.8rem;color:var(--muted);margin-bottom:.4rem;font-style:italic">Hint: ${q.hint}</div>
          <textarea rows="3"
                    oninput="interviewState.answers['q${i}'] = this.value"
                    placeholder="Write your answer here — be specific and use real examples…">${interviewState.answers['q' + i] || ''}</textarea>
        </div>`).join('')}
      <div class="tip" style="margin-top:1.5rem"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span> Field-Specific Questions · ${FIELDS.find(f => f.id === interviewState.field)?.label || 'Your Field'}</strong></div>
      ${specific.map((q, i) => `
        <div class="form-group">
          <label class="fl">${q}</label>
          <textarea rows="3"
                    oninput="interviewState.answers['fq${i}'] = this.value"
                    placeholder="Your answer…">${interviewState.answers['fq' + i] || ''}</textarea>
        </div>`).join('')}
            ${exampleBox(FIELD_EXAMPLES.interviewAnswers[interviewState.field] || FIELD_EXAMPLES.interviewAnswers.general)}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 4 · Interview Prep</div>
        <h1 class="step-title">Body Language & Presence</h1>
        <p class="step-desc">Research shows 55% of communication is nonverbal. How you show up matters as much as what you say.</p>
      </div>
      <ul class="ats-list">
        <li><span class="ats-check">✓</span> Make eye contact — look at the camera if it's virtual</li>
        <li><span class="ats-check">✓</span> Speak clearly and at a steady pace — slow down when nervous</li>
        <li><span class="ats-check">✓</span> Sit up straight — shows engagement and confidence</li>
        <li><span class="ats-check">✓</span> Dress one level above the company's typical dress code</li>
        <li><span class="ats-check">✓</span> Arrive 10–15 minutes early (or log in early for virtual)</li>
        <li><span class="ats-check">✓</span> Bring 2 printed copies of your resume</li>
        <li><span class="ats-check">✓</span> Prepare 2–3 questions to ask them at the end</li>
        <li><span class="ats-warn">✗</span> Don't check your phone during the interview</li>
        <li><span class="ats-warn">✗</span> Avoid filler words — "um," "like," "you know"</li>
      </ul>
      <div class="tip">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg></span> Questions to Ask Them</strong>
        "What does a successful first 90 days look like in this role?"<br>
        "What do you enjoy most about working here?"<br>
        "What opportunities are there to grow and learn?"
      </div>
      
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 5 · Interview Prep</div>
        <h1 class="step-title">After the Interview</h1>
        <p class="step-desc">Most students skip this step. The ones who don't stand out every time.</p>
      </div>
      <div class="tip sage">
        <strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span> Send a Thank You Within 24 Hours</strong>
        A short, sincere thank you email shows professionalism and keeps you top of mind. Most candidates don't send one — which means you instantly stand out if you do.
      </div>
      <div class="form-group">
        <label class="fl">Thank You Email — Customize This Template</label>
        <textarea rows="9" placeholder="Subject: Thank You — [Position Title] Interview&#10;&#10;Dear [Name],&#10;&#10;Thank you so much for the opportunity to interview for the [Position] role at [Company]. I really enjoyed learning about [something specific they mentioned] and left the conversation even more excited about the possibility of joining your team.&#10;&#10;[Add one sentence connecting your skills to something they mentioned.]&#10;&#10;I look forward to hearing from you. Please don't hesitate to reach out if you need any additional information.&#10;&#10;Thank you again,&#10;[Your Name]"></textarea>
      </div>
            ${exampleBox(FIELD_EXAMPLES_INTERVIEW_THANKYOU[interviewState.field] || FIELD_EXAMPLES_INTERVIEW_THANKYOU.general)}
      <div class="celebrate">
        <span class="celebrate-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
        <h2>You're interview-ready!</h2>
        <p>Practice your answers out loud — say them to a mirror, a friend, or record yourself. The more you practice, the more natural it feels.</p>
        <div class="download-group">
          <button class="download-btn pdf"  onclick="downloadInterviewPDF()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span> Download PDF</button>
          <button class="download-btn docx" onclick="downloadInterviewDOCX()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span> Download .docx</button>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-back" onclick="goBack()">← Back</button>
        <button class="btn-next" onclick="showHub()">Back to Hub →</button>
      </div>`;
  },
];

/* ══════════════════════════════════════════════════════
   COLLEGE APPS & STERLING SCHOLAR STEPS
══════════════════════════════════════════════════════ */

const SS_CATEGORIES = [
  { id: 'ag',       emoji: '🌾', name: 'Agricultural Science',         desc: 'Outstanding scholarship & achievement in agriculture science.',
    evidence: 'Competition awards, equipment devised for school use, unusual progress in the field.',
    special: '' },
  { id: 'biz',      emoji: '📊', name: 'Business & Marketing',          desc: 'Business management, accounting, data/word processing, related business fields.',
    evidence: 'Competition awards, outside business activities that support career development.',
    special: '' },
  { id: 'cs',       emoji: '💻', name: 'Computer Technology',           desc: 'Programming, networking, repair, design, media & multi-media.',
    evidence: 'Awards or recognitions, skills used for school/community, innovative progress.',
    special: '' },
  { id: 'dance',    emoji: '💃', name: 'Dance',                         desc: 'Exceptional skill, achievement & creative expression in artistic dance.',
    evidence: 'Training received, dances choreographed, major performances, dance service to school/community.',
    special: '⚠️ Must perform a self-choreographed solo (~3 min) and respond to an improvisational problem during the interview.' },
  { id: 'english',  emoji: '📝', name: 'English',                       desc: 'Creative writing, journalism, literature & related subjects.',
    evidence: '2 published or classroom work samples required (4 extra portfolio pages allowed). Judged on thought quality, maturity, originality & technical skill.',
    special: '⚠️ Must submit 2 work samples with your portfolio.' },
  { id: 'fcs',      emoji: '🍳', name: 'Family & Consumer Sciences',    desc: 'Child development, interior design, food & nutrition, culinary arts, clothing & fashion.',
    evidence: 'Expertise in at least one discipline. Awards from competitions or youth organizations; service to school, church, or organizations.',
    special: '' },
  { id: 'gen',      emoji: '🏆', name: 'General Scholarship',           desc: 'Most prestigious — highly capable scholars with excellence across MANY fields.',
    evidence: 'High excellence in many areas with no noticeable weaknesses. Scholarship, leadership, citizenship & service across multiple areas.',
    special: '⚠️ This is the "MVP" of Sterling Scholar — only nominate if strong across all subjects.' },
  { id: 'math',     emoji: '🧮', name: 'Mathematics',                   desc: 'Outstanding scholarship in mathematics & related areas.',
    evidence: 'Math competition records, state/national test scores, contributions to mathematical knowledge.',
    special: '⚠️ Must solve a math equation live during the interview. Submit all standardized math test scores.' },
  { id: 'music',    emoji: '🎵', name: 'Music',                         desc: 'Composition, vocal or instrumental music — talent plus service.',
    evidence: 'Service to school/community through music talent.',
    special: '⚠️ Must perform vocal or instrumental for ~3 minutes during interview. Video allowed only if required instrument is unavailable at judging site.' },
  { id: 'science',  emoji: '🔬', name: 'Science',                       desc: 'Biology, chemistry, engineering, physics, health science & related subjects.',
    evidence: 'Advanced work, inventiveness, or outstanding service. Imagination & originality receive major consideration.',
    special: '' },
  { id: 'sts',      emoji: '🔧', name: 'Skilled & Technical Sciences',  desc: 'Auto services, carpentry, cosmetology, drafting/CADD, welding, CNC, film making & more.',
    evidence: 'Competition awards, equipment or materials devised for school use, unusual progress in the field.',
    special: '' },
  { id: 'soc',      emoji: '🏛️', name: 'Social Science',                desc: 'American government, geography, history, economics, social issues, world affairs.',
    evidence: 'Broad background in social sciences, demonstrated citizenship, inventiveness relating social studies to real problems.',
    special: '' },
  { id: 'drama',    emoji: '🎭', name: 'Speech / Drama',                desc: 'Debate, drama, theater, public speaking, forensic events.',
    evidence: '2 work samples or activity descriptions required.',
    special: '⚠️ Must give a ~3 min oral communication demonstration during interview. Expertise in at least one discipline required.' },
  { id: 'art',      emoji: '🎨', name: 'Visual Arts',                   desc: 'Drawing, photography, commercial art, mixed media, painting, sculpture & related fields.',
    evidence: 'Professional potential in one or more disciplines, outstanding service to school, success in district/state art shows.',
    special: '' },
  { id: 'lang',     emoji: '🌐', name: 'World Languages',               desc: 'Any world language offered for credit — Spanish, French, ASL, Mandarin, etc.',
    evidence: 'Language festival rankings, resume of language projects/adventures.',
    special: '⚠️ Must demonstrate speaking, listening, reading & writing during interview. Cannot compete in native language or language spoken at home.' },
];

/* ══════════════════════════════════════════════════════
   COLLEGE APPLICATIONS STEPS  (separate tool)
══════════════════════════════════════════════════════ */
const collegeSteps = [

  /* 0 — Overview */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Before You Begin · College Applications</div>
        <h1 class="step-title">Your College Application Journey</h1>
        <p class="step-desc">Applying to college is one of the most important processes of your high school career. This tool guides you through every piece — from your personal statement to your final checklist.</p>
      </div>
      <div class="module-intro">
        <span class="module-intro-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg></span>
        <h3>What Goes Into a College Application?</h3>
        <ul class="benefit-list">
          <li><strong>GPA & Transcript</strong> — your academic record, sent directly from your school</li>
          <li><strong>Test Scores</strong> — SAT or ACT (many schools are now test-optional)</li>
          <li><strong>Personal Statement</strong> — a 650-word essay showing who you are beyond grades</li>
          <li><strong>Activities List</strong> — up to 10 extracurriculars, 150 characters each</li>
          <li><strong>Letters of Recommendation</strong> — from 2–3 teachers and your counselor</li>
          <li><strong>Supplemental Essays</strong> — school-specific short answers ("Why us?")</li>
          <li><strong>FAFSA</strong> — financial aid application, opens Oct 1 of senior year</li>
        </ul>
        <div class="tip teal" style="margin-bottom:0"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Key insight:</strong> Colleges are not just evaluating your achievements — they're trying to understand who you are, how you think, and what you'll contribute to their campus community.</div>
      </div>
      ${exampleBox('<em>Add a local success story here — a past student from your program, what schools they applied to, what made their application strong, and any advice they\'d share. Real examples inspire action.</em>')}
      ${navButtons('showHub()', 'nextStep()')}`;
  },

  /* 1 — Timeline */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 1 · College Applications</div>
        <h1 class="step-title">Your Application Timeline</h1>
        <p class="step-desc">College applications reward students who start early. Here's your complete junior-to-senior year roadmap.</p>
      </div>
      <div class="timeline-grid">
        <div class="tcard">
          <div class="tcard-season">Junior Year — Spring</div>
          <div class="tcard-title">Build Your Foundation</div>
          <ul class="tcard-tasks">
            <li>Take the SAT or ACT for the first time</li>
            <li>Start a "brag file" — document every achievement</li>
            <li>Research 5–10 target colleges</li>
            <li>Ask teachers if they'd write recommendations — early</li>
            <li>Shadow or volunteer in your field of interest</li>
            <li>Get involved in clubs or leadership you care about</li>
          </ul>
        </div>
        <div class="tcard">
          <div class="tcard-season">Rising Senior — Summer</div>
          <div class="tcard-title">Start Writing</div>
          <ul class="tcard-tasks">
            <li>Draft your Common App personal statement</li>
            <li>Retake SAT/ACT if needed</li>
            <li>Finalize your school list</li>
            <li>Confirm recommendation writers and give them your resume</li>
            <li>Create accounts on Common App / Coalition App</li>
            <li>Begin supplemental essays for top schools</li>
          </ul>
        </div>
        <div class="tcard">
          <div class="tcard-season">Senior Year — Fall</div>
          <div class="tcard-title">Submit Applications</div>
          <ul class="tcard-tasks">
            <li>Early Action / Decision deadline: Nov 1–15</li>
            <li>Submit supplemental essays per school</li>
            <li>Send official transcripts and test scores</li>
            <li>Complete FAFSA (opens Oct 1 — submit ASAP)</li>
            <li>Follow up with recommendation writers</li>
            <li>Regular Decision deadline: Jan 1–15</li>
          </ul>
        </div>
        <div class="tcard">
          <div class="tcard-season">Senior Year — Spring</div>
          <div class="tcard-title">Decisions &amp; Commitment</div>
          <ul class="tcard-tasks">
            <li>Review and compare financial aid award letters</li>
            <li>Visit campuses if possible</li>
            <li>Submit enrollment deposit by May 1</li>
            <li>Send thank-you notes to all recommenders</li>
            <li>Notify schools you're declining</li>
            <li>Celebrate — you did it!</li>
          </ul>
        </div>
      </div>
      <div class="tip teal"><strong>⏰ The #1 mistake:</strong> Waiting until fall of senior year to start. Students who begin junior year write better essays, get stronger letters, and have far less stress.</div>
      ${exampleBox('<em>Add a month-by-month student example here — what a strong applicant from your program did each step, and what the outcome was. Include both the timeline and the result.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 2 — Personal Statement */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 2 · College Applications</div>
        <h1 class="step-title">Personal Statement</h1>
        <p class="step-desc">Your personal statement is the one place in the application that is entirely yours. A specific, honest story about who you are beats a polished, generic one every time.</p>
      </div>
      <div class="essay-formula"><strong>Common App Prompts — pick the one that fits your best story:</strong><p>Background or identity · Challenge overcome · Belief you questioned · Problem you solved · Personal growth moment · Captivating topic of your choice</p></div>
      <div class="two-col-info">
        <div class="info-card navy">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span> What Makes a Strong Essay</h3>
          <ul class="benefit-list">
            <li><strong>650 words max</strong> — every word should earn its place</li>
            <li><strong>Start with a specific scene</strong> — where were you, what were you doing, what happened?</li>
            <li><strong>Write in your own voice</strong> — if it sounds like a thesaurus, rewrite it</li>
            <li><strong>Show, don't tell</strong> — "I led" is weak; describe the moment you actually led</li>
            <li><strong>End with insight</strong> — what did this experience teach you about yourself?</li>
            <li><strong>2+ people should proofread</strong> — never submit a first draft</li>
          </ul>
        </div>
        <div class="info-card teal">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> What Admissions Officers Say</h3>
          <ul class="benefit-list">
            <li>The best essays are often about <strong>small, specific moments</strong> — not mission trips or championships</li>
            <li>They want to hear your <strong>actual voice</strong>, not what you think they want to hear</li>
            <li>Essays that <strong>explain your transcript</strong> (a bad semester, a gap) can be powerful</li>
            <li>They read <strong>thousands of essays</strong> — be memorable by being real</li>
            <li>The essay should make them <strong>want to meet you</strong></li>
          </ul>
          <div class="tip teal" style="margin:0"><strong>Common mistakes:</strong> Summarizing your resume · Starting with a quote · Writing about a famous person · Trying to sound impressive instead of real</div>
        </div>
      </div>
      <div class="form-group">
        <label class="fl">Draft Your Personal Statement</label>
        <textarea rows="14"
                  oninput="collegeState.essayDraft = this.value"
                  placeholder="Start with a specific moment. Where were you? What were you doing? What happened?&#10;&#10;Example opening: 'The moment the circuit board sparked, I realized the problem wasn\'t the wiring. It was my assumption.'&#10;&#10;Then: what did you do, what did you learn, and how does this connect to who you are now?">${collegeState.essayDraft}</textarea>
      </div>
      ${exampleBox('<em>Add annotated essay excerpts from past students here (with permission). Show what a strong opening looks like vs. a generic one, and walk through a revision — original sentence vs. the improved version.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 3 — Activities List */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 3 · College Applications</div>
        <h1 class="step-title">Activities List</h1>
        <p class="step-desc">Up to 10 activities, 150 characters each. This is your chance to show colleges who you are outside the classroom — and what you've actually done with your time.</p>
      </div>
      <div class="tip teal"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> The 150-Character Formula:</strong> Role / Title → What you did → Impact or Result</div>
      <div class="two-col-info" style="margin-bottom:1.2rem">
        <div style="background:var(--sage-light);border-radius:10px;padding:1rem">
          <div style="font-weight:700;font-size:.84rem;color:var(--sage);margin-bottom:.4rem"><span class="inline-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></span> Strong Entry</div>
          <div style="font-size:.82rem;font-style:italic">"Co-captain, Varsity Soccer. Led 22-player team to region finals; organized 4 youth clinics serving 80+ kids."</div>
        </div>
        <div style="background:var(--rust-light);border-radius:10px;padding:1rem">
          <div style="font-weight:700;font-size:.84rem;color:var(--rust);margin-bottom:.4rem"><span class="inline-x"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span> Weak Entry</div>
          <div style="font-size:.82rem;font-style:italic">"I played soccer and was a leader on my team and we did community service sometimes."</div>
        </div>
      </div>
      <div class="form-group">
        <label class="fl">Activity 1 — Your Most Important</label>
        <input type="text" maxlength="200" value="${collegeState.activities[0]}"
               placeholder="Role / Title — What you did — Impact or outcome"
               oninput="collegeState.activities[0] = this.value">
      </div>
      <div class="form-group">
        <label class="fl">Activity 2</label>
        <input type="text" maxlength="200" value="${collegeState.activities[1]}"
               placeholder="Role / Title — What you did — Impact or outcome"
               oninput="collegeState.activities[1] = this.value">
      </div>
      <div class="form-group">
        <label class="fl">Activity 3</label>
        <input type="text" maxlength="200" value="${collegeState.activities[2]}"
               placeholder="Role / Title — What you did — Impact or outcome"
               oninput="collegeState.activities[2] = this.value">
      </div>
      <div class="form-group">
        <label class="fl">Activity 4</label>
        <input type="text" maxlength="200" value="${collegeState.activities[3]}"
               placeholder="Role / Title — What you did — Impact or outcome"
               oninput="collegeState.activities[3] = this.value">
      </div>
      <div class="form-group">
        <label class="fl">Activity 5</label>
        <input type="text" maxlength="200" value="${collegeState.activities[4]}"
               placeholder="Role / Title — What you did — Impact or outcome"
               oninput="collegeState.activities[4] = this.value">
      </div>
      <ul class="benefit-list" style="margin-bottom:1.5rem">
        <li>List in order of <strong>importance to you</strong>, not perceived prestige</li>
        <li>On Common App, also include <strong>hours/week and weeks/year</strong> for each</li>
        <li><strong>Unusual activities stand out</strong> — don't hide niche hobbies, side hustles, or family responsibilities</li>
        <li>Don't pad the list with one-day volunteering — <strong>depth over breadth</strong></li>
      </ul>
      ${exampleBox('<em>Add examples of strong activities lists from past students here. Show the contrast between a strong 150-character entry and a weak one, and how to frame work, family responsibilities, and self-directed projects.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 4 — Recommendations & Supplementals */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 4 · College Applications</div>
        <h1 class="step-title">Recommendations &amp; Supplemental Essays</h1>
        <p class="step-desc">Strong letters and customized supplemental essays can tip a borderline application. These pieces show colleges you've done your homework — on yourself and on them.</p>
      </div>
      <div class="two-col-info">
        <div class="info-card navy">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M17 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg></span> Letters of Recommendation</h3>
          <div class="step-flow">
            <div class="sf"><div class="sf-num">1</div><div><h4>Who to Ask</h4><p>2 core-subject teachers who know your work well. Counselor required by most schools. Optional: coach, employer, or mentor for character perspective.</p></div></div>
            <div class="sf"><div class="sf-num">2</div><div><h4>When to Ask</h4><p>By end of junior year or early summer. Give writers 4–6 weeks minimum. Ask in person first, then confirm by email with details.</p></div></div>
            <div class="sf"><div class="sf-num">3</div><div><h4>What to Give Them</h4><p>Your resume, activities list, essay draft, and 2–3 memorable moments from class. Make it easy for them to write a specific, compelling letter.</p></div></div>
            <div class="sf"><div class="sf-num">4</div><div><h4>After Submission</h4><p>Send a handwritten thank-you card. It's rare, it's remembered, and it's the right thing to do.</p></div></div>
          </div>
        </div>
        <div class="info-card teal">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span> Supplemental Essays</h3>
          <ul class="benefit-list">
            <li>Most schools ask <strong>"Why us?"</strong> — answer with specific programs, professors, or courses, not vibes</li>
            <li><strong>Research every school</strong> you list — generic "Why us?" essays are easy to spot and hurt your chances</li>
            <li>Short answers (25–150 words) reward <strong>clarity and specificity</strong> — don't pad them</li>
            <li>Common prompts: Why this major? · Diversity contribution · Intellectual interest · Community involvement</li>
            <li>Supplement essays can be adapted from your personal statement — <strong>don't start from scratch each time</strong></li>
          </ul>
          <div class="tip teal" style="margin:0"><strong>💡 Strong "Why Us" formula:</strong> Name a specific program or professor → Connect it to something you've already done → Explain what you'll contribute to that community.</div>
        </div>
      </div>
      ${exampleBox('<em>Add examples of strong vs. weak "Why us?" supplemental essay responses here. Show what specific looks like vs. generic, and how students can research schools efficiently to customize each answer.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 5 — FAFSA & Final Checklist */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 5 · College Applications</div>
        <h1 class="step-title">FAFSA &amp; Final Submission Checklist</h1>
        <p class="step-desc">The FAFSA is free money on the table — don't leave it. And before you submit anything, run through this checklist. A thorough final review catches what spell-check misses.</p>
      </div>
      <div class="two-col-info">
        <div class="info-card navy">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span> FAFSA — Don't Skip This</h3>
          <ul class="benefit-list">
            <li>FAFSA = Free Application for Federal Student Aid</li>
            <li>Opens <strong>October 1</strong> of senior year — submit immediately</li>
            <li>Earlier submission = more aid options at many schools</li>
            <li>Required for federal grants, work-study, and loans</li>
            <li>Many state and school scholarships also require it</li>
            <li>Even if you think you won't qualify — file it anyway. You might be surprised.</li>
          </ul>
          <div class="tip" style="margin:0"><strong>You'll need:</strong> Your (and parents') Social Security numbers, federal tax returns, W-2s, bank statements, and investment records.</div>
        </div>
        <div class="info-card teal">
          <h3><span class="inline-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></span> Pre-Submission Checklist</h3>
          <ul class="coll-checklist">
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Personal statement — revised &amp; proofread</strong><span>Read aloud. 2+ people have reviewed it.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Activities list complete</strong><span>Ordered by importance. Hours/week and weeks/year filled in.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Supplemental essays customized per school</strong><span>No generic "Why us?" answers.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Official transcripts requested</strong><span>Order early — registrar offices back up in fall.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>SAT/ACT scores sent from source</strong><span>Directly from College Board or ACT — not self-reported.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Recommendation writers have everything</strong><span>Resume, draft, deadlines — confirmed by email.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>FAFSA submitted</strong><span>As early as possible after Oct 1.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Counselor has reviewed your list</strong><span>They know you — use that resource.</span></div></li>
          </ul>
        </div>
      </div>
      <div class="form-group">
        <label class="fl">Thank You Note to Recommenders — Customize This Template</label>
        <textarea rows="7"
                  oninput="collegeState.thankYouNote = this.value"
                  placeholder="Dear [Name],&#10;&#10;Thank you so much for writing a letter of recommendation for me. Your time and support mean more than I can express. I wanted to let you know that I submitted my applications to [schools] and feel really good about what I put together.&#10;&#10;I'll be sure to share the news when decisions come in!&#10;&#10;With gratitude,&#10;[Your Name]">${collegeState.thankYouNote}</textarea>
      </div>
      ${exampleBox('<em>Add a local example here — a past student\'s timeline from application to acceptance, including what made their application stand out and what advice they\'d share with students just starting this process.</em>')}
      <div class="celebrate">
        <span class="celebrate-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg></span>
        <h2>Applications submitted!</h2>
        <p>You've done the work. Now breathe. The student who gets in isn't always the most polished — it's the one who showed up as their truest, most prepared self. That's you.</p>
        <div class="download-group">
          <button class="download-btn pdf"  onclick="downloadCollegePDF()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span> Download PDF</button>
          <button class="download-btn docx" onclick="downloadCollegeDOCX()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span> Download .docx</button>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-back" onclick="goBack()">← Back</button>
        <button class="btn-next" onclick="showHub()">Back to Hub →</button>
      </div>`;
  },
];

/* ── College helper functions ── */
function selectCollegePath(path, el) {
  collegeState.path = path;
  document.querySelectorAll('.path-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

/* ══════════════════════════════════════════════════════
   STERLING SCHOLAR STEPS  (separate tool)
══════════════════════════════════════════════════════ */
const sterlingSteps = [

  /* 0 — Overview */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Before You Begin · Sterling Scholar</div>
        <h1 class="step-title">What Is Sterling Scholar?</h1>
        <p class="step-desc">Utah's premier high school excellence award. Students compete in one of 15 subject categories by demonstrating mastery, leadership, and community service through a portfolio binder and live interview.</p>
      </div>
      <div class="module-intro">
        <span class="module-intro-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H17V13a5 5 0 0 1-10 0V4z"/><path d="M7 9H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4"/><path d="M17 9h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4"/></svg></span>
        <h3>Sterling Scholar — The Big Picture</h3>
        <ul class="benefit-list">
          <li><strong>15 SEDC categories</strong> — compete in the one where you have the most depth and passion</li>
          <li><strong>Portfolio binder</strong> — physical record of your academic excellence, leadership, and service</li>
          <li><strong>Community service</strong> — documented hours connected to your category</li>
          <li><strong>Live interview</strong> — judges want to see your passion, knowledge, and professionalism</li>
          <li><strong>Levels:</strong> School → District → State recognition + scholarship opportunities</li>
          <li><strong>Who nominates you:</strong> A teacher in your category subject area</li>
        </ul>
        <div class="tip teal" style="margin-bottom:0"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span> Important rule for ALL categories:</strong> Interview exhibits must be carried by the nominee in one trip, without help. No carts or similar devices allowed.</div>
      </div>
      <div class="tip"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Pro tip:</strong> Your CareerLaunch resume goes directly into the portfolio binder. Start building it now — every section you complete is one less thing to do later.</div>
      ${exampleBox('<em>Add a local success story here — a past Sterling Scholar from your school, what category they competed in, what their portfolio looked like, and what advice they\'d give. Real stories are the most motivating.</em>')}
      ${navButtons('showHub()', 'nextStep()')}`;
  },

  /* 1 — Choose Category */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 1 · Sterling Scholar</div>
        <h1 class="step-title">Choose Your Category</h1>
        <p class="step-desc">There are 15 official SEDC categories. You can only compete in one. Choose where you have the most depth, achievement, and genuine passion — not just your favorite class.</p>
      </div>
      <div class="tip teal"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> How to choose:</strong> Pick the category where you have the most evidence — awards, projects, certifications, competitions, and hours spent. Passion + proof = strong portfolio.</div>
      <div class="sterling-cats">
        ${SS_CATEGORIES.map(cat => `
          <div class="scat"
               onclick="selectSSCat('${cat.id}', this)"
               style="${sterlingState.ssCategory === cat.id ? 'border-color:#8b4db8;background:#f5edfb;' : ''}cursor:pointer">
            <div class="scat-name">${cat.emoji} ${cat.name}</div>
            <div class="scat-desc">${cat.desc}</div>
            <div class="scat-tip"><strong>Key evidence:</strong> ${cat.evidence}</div>
            ${cat.special ? `<div class="scat-warn">${cat.special}</div>` : ''}
          </div>`).join('')}
      </div>
      ${exampleBox('<em>Add examples of past Sterling Scholar winners from your school in each category — what they submitted, what stood out, and advice they shared.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 2 — Portfolio Binder */
  function (c) {
    const cat = SS_CATEGORIES.find(x => x.id === sterlingState.ssCategory);
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 2 · Sterling Scholar</div>
        <h1 class="step-title">Build Your Portfolio Binder</h1>
        <p class="step-desc">Your portfolio binder is your entire case for why you deserve this award. It must be organized, professional, and complete. Every item tells part of your story.</p>
      </div>
      ${cat ? `<div class="tip" style="background:#f5edfb;border-left-color:#8b4db8"><strong>Your category: ${cat.emoji} ${cat.name}</strong><br><small style="color:var(--muted)">${cat.evidence}</small>${cat.special ? `<br><small style="color:var(--rust)">${cat.special}</small>` : ''}</div>` : '<div class="tip teal">Complete Step 1 to see category-specific requirements.</div>'}
      <div class="two-col-info">
        <div class="info-card gold">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/></svg></span> Required Portfolio Sections</h3>
          <ul class="coll-checklist">
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Personal Statement / Narrative Essay</strong><span>1–2 pages on your passion, journey, and future goals in this category</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Academic Record</strong><span>Official transcript, GPA, AP/honors/dual enrollment courses</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Résumé</strong><span>Field-specific and current — use CareerLaunch Resume Builder!</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Evidence of Excellence</strong><span>Awards, competition results, certifications, recognitions in your category</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Community Service Log</strong><span>Dates, organization, hours, your specific role, supervisor contact</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Leadership Evidence</strong><span>Offices held, teams led, programs or clubs started</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Letters of Recommendation (2+)</strong><span>From teachers or community leaders who know your work deeply</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Work Samples</strong><span>Projects, writing, photos, recordings, certificates relevant to your field</span></div></li>
          </ul>
        </div>
        <div class="info-card teal">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Presentation Tips</h3>
          <ul class="benefit-list">
            <li>Use <strong>tabbed dividers</strong> — one section per item above</li>
            <li>Place your <strong>personal statement first</strong> — it frames everything</li>
            <li>All pages should be <strong>clean, unfolded, and professional</strong></li>
            <li>Use a <strong>sturdy 3-ring binder</strong> with a clear front cover insert</li>
            <li>Include a <strong>table of contents</strong> so judges can navigate quickly</li>
            <li>Print all documents — no handwritten pages unless it's an art sample</li>
            <li>Proofread every page — judges notice spelling errors</li>
          </ul>
          <div class="tip teal" style="margin:0"><strong>Remember:</strong> Judges review many binders. Yours should look polished and be easy to flip through quickly.</div>
        </div>
      </div>
      ${exampleBox('<em>Add a photo or scan of a well-organized Sterling Scholar binder from a past student (with their permission). Show what strong section dividers, a clean layout, and quality work samples look like in practice.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 3 — Narrative Essay */
  function (c) {
    const cat = SS_CATEGORIES.find(x => x.id === sterlingState.ssCategory);
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 3 · Sterling Scholar</div>
        <h1 class="step-title">Your Narrative Essay</h1>
        <p class="step-desc">Your personal statement is the heart of your portfolio. Judges read dozens — the ones that stand out tell a specific, authentic story about genuine passion.</p>
      </div>
      ${cat ? `<div class="tip" style="background:#f5edfb;border-left-color:#8b4db8"><strong>Writing for: ${cat.emoji} ${cat.name}</strong></div>` : ''}
      <div class="essay-formula"><strong>Cover these 3 things (1–2 pages):</strong><p>1. <strong>Your origin story</strong> — when did your passion for this category begin? What specific moment hooked you?<br>2. <strong>Your most meaningful achievement</strong> — a competition, project, or moment of real progress<br>3. <strong>Where you're headed</strong> — how does this category connect to your future goals?</p></div>
      <ul class="benefit-list" style="margin-bottom:1.5rem">
        <li>Be <strong>specific</strong> — name competitions, teachers, projects, places, and moments</li>
        <li>Connect your category to your <strong>community service</strong> — show it's more than a grade</li>
        <li>Show <strong>leadership</strong> — how did you go beyond just being a good student?</li>
        <li>This essay is also your interview warmup — know it well enough to speak from memory</li>
        <li>Have a teacher in your category review the draft before finalizing</li>
      </ul>
      <div class="form-group">
        <label class="fl">Draft Your Sterling Scholar Narrative Essay</label>
        <textarea rows="14"
                  oninput="sterlingState.essayDraft = this.value"
                  placeholder="Start with a specific moment — where were you, what were you doing, what changed?&#10;&#10;Example opening: 'The first time I welded a clean bead on my own, I knew this was more than a class. It was a calling.'&#10;&#10;Then move to: your achievements, your service, and where this passion takes you next.">${sterlingState.essayDraft}</textarea>
      </div>
      <div class="tip"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Common mistake:</strong> Writing a general summary of your achievements instead of a personal story. Judges can see your achievements in the rest of the binder. The essay is where they get to know <em>you</em>.</div>
      ${exampleBox('<em>Add annotated essay excerpts from past Sterling Scholars (with permission). Show what a strong opening line looks like vs. a generic one, and how a specific moment creates more impact than a list of accomplishments.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 4 — Community Service Log */
  function (c) {
    const cat = SS_CATEGORIES.find(x => x.id === sterlingState.ssCategory);
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 4 · Sterling Scholar</div>
        <h1 class="step-title">Community Service Log</h1>
        <p class="step-desc">Community service is a core requirement. Judges want to see that you've used your skills and passion to help others — not just excel in a classroom.</p>
      </div>
      <div class="two-col-info">
        <div class="info-card sage">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M17 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg></span> What Judges Want to See</h3>
          <ul class="benefit-list">
            <li><strong>Service connected to your category</strong> — a Science scholar doing STEM outreach is compelling</li>
            <li><strong>Sustained commitment</strong> over time, not a one-day event</li>
            <li>Aim for <strong>40–100+ documented hours</strong> over 2 years</li>
            <li>Evidence of <strong>leadership within service</strong> — did you organize, lead, or start something?</li>
            <li>Every entry must be <strong>verifiable</strong> — supervisor name and contact required</li>
          </ul>
          <div class="tip sage" style="margin:0"><strong>Service ideas by category:</strong> Tutor in your subject · Run a workshop · Volunteer at a relevant organization · Start a club that serves the community</div>
        </div>
        <div class="info-card navy">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Log Format Requirements</h3>
          <ul class="benefit-list">
            <li><strong>Organization name</strong> — full official name</li>
            <li><strong>Dates</strong> — specific date ranges, not just year</li>
            <li><strong>Total hours</strong> — track every session</li>
            <li><strong>Your specific role</strong> — what exactly did you do?</li>
            <li><strong>Supervisor contact</strong> — name, phone or email</li>
            <li><strong>Impact/outcome</strong> — how many people served? What changed?</li>
          </ul>
          ${cat ? `<div class="tip" style="margin:0">For <strong>${cat.emoji} ${cat.name}</strong>: Look for service organizations, schools, nonprofits, or community groups where your category skills are directly useful.</div>` : ''}
        </div>
      </div>
      <div class="form-group">
        <label class="fl">Community Service Log — Enter Your Hours</label>
        <textarea rows="8"
                  oninput="sterlingState.serviceLog = this.value"
                  placeholder="Organization | Date(s) | Hours | Your Role | Supervisor &amp; Contact | Impact&#10;&#10;Examples:&#10;Cedar City Food Bank | Jan–May 2024 | 32 hrs | Sorted donations, stocked shelves, trained 3 new volunteers | Sarah Jones, 435-555-0100 | Served 200+ families&#10;&#10;NHS Tutoring Program | Fall 2023 | 18 hrs | Tutored 4 students in Algebra weekly | Mrs. Anderson, anderson@school.edu | All 4 students improved grade">${sterlingState.serviceLog}</textarea>
      </div>
      ${exampleBox('<em>Add a sample completed service log from a past Sterling Scholar (with permission). Show what the judges consider "well-documented" vs. "too vague," and how category-connected service stands out from generic volunteering.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 5 — Interview Prep */
  function (c) {
    const cat = SS_CATEGORIES.find(x => x.id === sterlingState.ssCategory);
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 5 · Sterling Scholar</div>
        <h1 class="step-title">Interview Preparation</h1>
        <p class="step-desc">The interview is where your portfolio comes to life. Judges want to see your passion, depth of knowledge, and professional communication — not a memorized speech.</p>
      </div>
      ${cat ? `<div class="tip" style="background:#f5edfb;border-left-color:#8b4db8"><strong>Preparing for: ${cat.emoji} ${cat.name}</strong>${cat.special ? `<br><span style="color:var(--rust);font-size:.82rem">${cat.special}</span>` : ''}</div>` : ''}
      <div class="two-col-info">
        <div class="info-card teal">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span> Interview Prep — Step by Step</h3>
          <div class="step-flow">
            <div class="sf"><div class="sf-num">1</div><div><h4>Know Your Portfolio Cold</h4><p>Be ready to speak to every page — why you included it, what it means, what you learned from it. Judges may point to any item and ask.</p></div></div>
            <div class="sf"><div class="sf-num">2</div><div><h4>Prepare Your "Why" Story</h4><p>Why this category? What moment sparked your passion? Authentic beats rehearsed every time — judges can tell the difference.</p></div></div>
            <div class="sf"><div class="sf-num">3</div><div><h4>Practice Out Loud — Many Times</h4><p>Mock interview with a teacher, counselor, or parent. Record yourself on your phone. Goal: confident and natural, not memorized.</p></div></div>
            <div class="sf"><div class="sf-num">4</div><div><h4>Prepare Questions to Ask</h4><p>"What qualities do you most often see in strong Sterling Scholars?" — asking thoughtful questions shows maturity.</p></div></div>
            <div class="sf"><div class="sf-num">5</div><div><h4>Dress Business Professional</h4><p>This is a formal competition. First impressions count significantly. Have your outfit pressed and ready the week before.</p></div></div>
          </div>
        </div>
        <div class="info-card navy">
          <h3><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span> Questions to Practice</h3>
          <ul class="benefit-list">
            <li>"Tell me about yourself and your passion for [category]."</li>
            <li>"What is the most significant achievement in your portfolio?"</li>
            <li>"How has your community service connected to your category?"</li>
            <li>"Describe a challenge you faced in this field and how you overcame it."</li>
            <li>"Where do you see yourself in 5 years in this field?"</li>
            <li>"What did you learn from your biggest setback or failure?"</li>
            <li>"Why should you be named the Sterling Scholar in [category]?"</li>
          </ul>
          <div class="tip" style="margin:0"><strong><span class="tip-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Answer structure:</strong> Specific story → What you did → What you learned. Short, concrete, honest answers beat long, vague ones every time.</div>
        </div>
      </div>
      ${exampleBox('<em>Add mock interview video clips or annotated transcripts from past Sterling Scholars here. Show what a strong answer sounds like vs. a vague one, and how to stay composed when a question is unexpected.</em>')}
      ${navButtons('goBack()', 'nextStep()')}`;
  },

  /* 6 — Final Checklist */
  function (c) {
    c.innerHTML = `
      <div class="step-header">
        <div class="step-eyebrow">Step 6 · Sterling Scholar</div>
        <h1 class="step-title">Final Checklist &amp; Submission</h1>
        <p class="step-desc">Use this checklist before you submit your portfolio. A complete, polished binder tells judges you take this seriously.</p>
      </div>
      <div class="two-col-info">
        <div class="info-card gold">
          <h3><span class="inline-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></span> Portfolio Binder Checklist</h3>
          <ul class="coll-checklist">
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Nominated by a teacher in your category</strong><span>Talk to your strongest teacher in that subject early — don't wait.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Binder is organized with tabbed dividers</strong><span>Professional appearance — clean layout, no loose papers.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Personal statement written and polished</strong><span>1–2 pages. Read aloud. Teacher in your category has reviewed it.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Academic record included</strong><span>Official transcript + GPA + relevant AP/honors courses.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Résumé current and field-specific</strong><span>Built with CareerLaunch Resume Builder and proofread.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Evidence of excellence included</strong><span>Awards, certifications, competition results in your category.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Community service log complete</strong><span>All entries have dates, org, hours, role, and supervisor contact.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Letters of recommendation (2+) secured</strong><span>From teachers or community leaders who know your work.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Work samples included</strong><span>Tangible evidence — photos, projects, certificates, recordings.</span></div></li>
          </ul>
        </div>
        <div class="info-card teal">
          <h3><span class="inline-check"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg></span> Interview Day Checklist</h3>
          <ul class="coll-checklist">
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Mock interview done at least twice</strong><span>With a teacher, counselor, or parent. Record yourself once.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Know your portfolio cold</strong><span>Ready to speak to any page, project, or award in the binder.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Business professional outfit ready</strong><span>Pressed and ready the week before — don't leave this to the night before.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Prepared questions to ask judges</strong><span>Having thoughtful questions shows confidence and curiosity.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Exhibits carried in one trip</strong><span>All interview materials must be carried by you, no carts allowed.</span></div></li>
            <li><span class="ck-icon">✓</span><div class="ck-text"><strong>Thank-you notes written</strong><span>Send within 24 hours after the interview — this is rare and memorable.</span></div></li>
          </ul>
        </div>
      </div>
      <div class="form-group">
        <label class="fl">Thank You Note to Judges — Customize This Template</label>
        <textarea rows="7"
                  oninput="sterlingState.thankYouNote = this.value"
                  placeholder="Dear [Judge's Name],&#10;&#10;Thank you for your time and for the thoughtful questions during the Sterling Scholar interview. It was a privilege to share my work in [category] with you.&#10;&#10;Your program has pushed me to grow in ways I didn't expect, and I'm grateful for the opportunity regardless of the outcome.&#10;&#10;With appreciation,&#10;[Your Name]">${sterlingState.thankYouNote}</textarea>
      </div>
      ${exampleBox('<em>Add a photo of a completed, well-organized binder from a past student (with permission). Show what category-specific work samples look like and what level of effort the judges expect.</em>')}
      <div class="celebrate">
        <span class="celebrate-icon" style="color:var(--tool-color)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" width="48" height="48"><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H17V13a5 5 0 0 1-10 0V4z"/><path d="M7 9H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4"/><path d="M17 9h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4"/></svg></span>
        <h2>Your portfolio is ready!</h2>
        <p>You've built the case for why you deserve this honor. Walk into that interview with confidence — you've done the work. Now go show them who you are.</p>
        <div class="download-group">
          <button class="download-btn pdf"  onclick="downloadSterlingPDF()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span> Download PDF</button>
          <button class="download-btn docx" onclick="downloadSterlingDOCX()"><span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span> Download .docx</button>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-back" onclick="goBack()">← Back</button>
        <button class="btn-next" onclick="showHub()">Back to Hub →</button>
      </div>`;
  },
];

/* ── Sterling Scholar helper ── */
function selectSSCat(id, el) {
  sterlingState.ssCategory = id;
  document.querySelectorAll('.scat').forEach(c => {
    c.style.borderColor = '';
    c.style.background  = '';
  });
  el.style.borderColor = '#8b4db8';
  el.style.background  = '#f5edfb';
}
/* ─────────────────────────────────────────────────────
   FIELD FOCUS MODAL  —  shown after field selection
───────────────────────────────────────────────────── */

const FIELD_FOCUS = {
  resume: {
    design:      { headline: 'Lead with your visual work', icon: '🎨', points: ['List software skills prominently — Adobe CC, Figma, Canva', 'Use verbs like Designed, Illustrated, Branded, Produced', 'Include any freelance, class, or personal projects as experience', 'Link to a portfolio or Behance if you have one', 'Keep formatting clean and ATS-safe — no columns or image headers'] },
    business:    { headline: 'Quantify everything you can', icon: '📊', points: ['Numbers win: followers gained, revenue raised, events managed', 'Use verbs like Managed, Grew, Analyzed, Led, Launched', 'Highlight tools: Excel, Google Analytics, Canva, CRM basics', 'Show leadership — clubs, school store, student council all count', 'Include a strong professional summary that names your specialty'] },
    healthcare:  { headline: 'Demonstrate compassion and precision', icon: '🩺', points: ['List every certification front and center: CPR, First Aid, CNA', 'Use verbs like Assisted, Monitored, Documented, Coordinated', 'Describe patient interactions carefully — no names or identifying details', 'Emphasize dependability, attention to detail, and teamwork', 'ATS tip: include terms like "patient care," "clinical support," "HIPAA"'] },
    engineering: { headline: 'Show what you actually built', icon: '⚙️', points: ['Lead with technical skills: languages, tools, platforms you know', 'Use verbs like Engineered, Built, Programmed, Debugged, Optimized', 'Describe projects with outcome — what problem did it solve?', 'Include GitHub, robotics, science fair, or class projects', 'GPA and relevant courses matter more here than in other fields'] },
    trades:      { headline: 'Prove your hands-on experience', icon: '🔧', points: ['List certifications immediately: OSHA 10, welding certs, licenses', 'Use verbs like Installed, Repaired, Constructed, Operated, Inspected', 'Describe equipment and tools you can operate confidently', 'Include apprenticeship hours, shop class projects, or side jobs', 'Safety record and reliability are your strongest selling points'] },
    education:   { headline: 'Show student impact', icon: '📚', points: ['Describe tutoring, mentoring, or leadership with real outcomes', 'Use verbs like Tutored, Mentored, Facilitated, Guided, Developed', 'Mention any classroom or youth program experience — even babysitting', 'Highlight patience, communication, and adaptability as skills', 'Certifications (First Aid, youth programs) add strong credibility'] },
    hospitality: { headline: 'Customer experience is your proof', icon: '🍽️', points: ['Ratings, reviews, and repeat customers are powerful bullets', 'Use verbs like Served, Managed, Coordinated, Resolved, Trained', 'List certifications: ServSafe, Food Handler, alcohol training', 'Fast-paced environment experience = a major selling point', 'Emphasize volume: "Served 80+ guests per shift" is strong evidence'] },
    general:     { headline: 'Show responsibility and growth', icon: '⭐', points: ['Any paid or volunteer work counts — list it all', 'Use verbs like Organized, Assisted, Managed, Contributed, Completed', 'School clubs, sports, and leadership roles belong in Experience', 'Soft skills like reliability and communication are your edge', 'Be honest — a small honest resume beats a padded dishonest one'] },
  },
  linkedin: {
    design:      { headline: 'Make your profile a portfolio teaser', icon: '🎨', points: ['Your headline should name your speciality: "Brand Identity & Digital Illustration"', 'Use the Featured section to pin 2–3 portfolio pieces directly', 'Write your About in first person — tell the story behind your style', 'List every Adobe or design tool in your Skills section', 'Connect with design studios, creative directors, and local agencies'] },
    business:    { headline: 'Position yourself as a results-driven professional', icon: '📊', points: ['Headline tip: "Marketing Student | Social Media Strategy | Seeking Internship"', 'Quantify every experience: follower growth, event totals, campaign reach', 'Follow companies you admire and engage with their posts', 'Join LinkedIn Groups for your industry to build early visibility', 'Your About should end with a clear call to action'] },
    healthcare:  { headline: 'Credibility and compassion lead everything', icon: '🩺', points: ['List certifications in your headline and Skills section immediately', 'Write an About that shows both your technical skills and your "why"', 'Connect with nurses, hospital HR contacts, and clinical program alumni', 'Privacy matters: never mention patient details, even vaguely', 'Volunteer healthcare work counts just as much as paid experience'] },
    engineering: { headline: 'GitHub + LinkedIn = your portfolio', icon: '⚙️', points: ['Pin your GitHub profile in the Featured section', 'Your headline should name your stack: "Python & Embedded Systems"', 'Describe projects with outcomes — what it did, not just what you used', 'Follow engineering recruiters and firms you want to work for', 'Your About should signal what kind of problems excite you'] },
    trades:      { headline: 'Certifications and skills are your headline', icon: '🔧', points: ['Lead your headline with your trade and certs: "Apprentice Electrician | OSHA 10"', 'Photos of completed work in the Featured section are incredibly powerful', 'Your About should tell the story of how you got into the trades', 'Connect with local contractors, union halls, and trade school alumni', 'Skills section: list every tool, equipment type, and certification'] },
    education:   { headline: 'Show your impact on students', icon: '📚', points: ['Headline: "Future Elementary Teacher | Differentiated Instruction | Seeking Practicum"', 'Describe tutoring and mentoring with outcomes: "5 of 6 students improved a full grade"', 'Your About should explain your teaching philosophy in plain language', 'Connect with teachers, principals, and district HR on LinkedIn', 'Follow education organizations to stay current and visible'] },
    hospitality: { headline: 'Personality and professionalism together', icon: '🍽️', points: ['Your headline should name your speciality: "Event Coordinator | Guest Experience"', 'Ratings and performance reviews are powerful to reference', 'Your About should be warm and personable — hospitality is about people', 'Connect with hotel GMs, event planners, and food & bev directors', 'Certifications like ServSafe belong front and center in your Skills'] },
    general:     { headline: 'Show who you are, not just what you\'ve done', icon: '⭐', points: ['Your headline should name your goal: "High School Student | Seeking First Job in Retail"', 'Any experience is worth listing — babysitting, lawn care, school clubs', 'Your About should be honest and enthusiastic — you\'re early in your career, own it', 'Connect with family friends and local businesses in your area', 'Ask a teacher or counselor to write you a LinkedIn recommendation'] },
  },
  portfolio: {
    design:      { headline: 'Process beats polish', icon: '🎨', points: ['Show sketches, iterations, and the final — not just the finished piece', 'Name the client, brief, and problem you were solving', 'Include 3–5 pieces of real depth rather than 10 surface-level examples', 'Behance or a PDF are ideal; keep your layout as clean as your work', 'One real client project (even unpaid) carries more weight than 10 class assignments'] },
    business:    { headline: 'Lead with measurable outcomes', icon: '📊', points: ['Every project should have a number: followers, revenue, attendance, reach', 'Show your thinking process — strategy decks and plans are strong pieces', 'A real-world fundraiser, school store, or event is better than a class project', 'Google Slides PDF or a simple website work great for this field', 'Include any data you gathered and what decisions you made from it'] },
    healthcare:  { headline: 'Evidence, empathy, and ethics', icon: '🩺', points: ['Certifications and training logs are your strongest portfolio pieces', 'Write a short reflection for each experience — what you observed, what you learned', 'Never include patient names, photos, or identifying details', 'Community health events and first aid work are compelling evidence', 'A PDF binder or clean Google Drive folder works well for this field'] },
    engineering: { headline: 'Document the build, not just the result', icon: '⚙️', points: ['Describe the problem, your approach, what didn\'t work, and the final solution', 'Code snippets, circuit diagrams, and screenshots belong in every tech project', 'GitHub is your primary portfolio tool — keep repos clean and documented', 'Show iteration: a project that failed and what you learned is as strong as a win', 'Science fair entries, robotics builds, and capstone projects all count'] },
    trades:      { headline: 'Before and after is your proof', icon: '🔧', points: ['Photo documentation of builds, installs, and repairs is the most powerful evidence', 'Include every certification document in its own section', 'List tools and equipment you can operate — be specific', 'Describe the scope of each project: how big, how long, what was involved', 'A PDF with photos or a simple Google Drive folder works great for trades'] },
    education:   { headline: 'Show student growth, not just your effort', icon: '📚', points: ['Document outcomes: grade improvements, engagement, student feedback', 'Lesson plans and activity materials you created are strong evidence', 'Describe your approach to students who were struggling', 'Photos of classroom activities (no faces if minors) add real impact', 'A reflection essay in each project section shows professional maturity'] },
    hospitality: { headline: 'Every event is a case study', icon: '🍽️', points: ['Document events with: goal, budget, attendance, challenges, outcome', 'Customer ratings and feedback — even informal ones — are powerful', 'Show your problem-solving: "the venue cancelled and here\'s what I did"', 'Menus, programs, or materials you designed are strong portfolio pieces', 'Certifications (ServSafe, etc.) belong in a dedicated section'] },
    general:     { headline: 'Show responsibility in action', icon: '⭐', points: ['A school project you\'re genuinely proud of is a legitimate portfolio piece', 'Side hustles (lawn care, crafts, tutoring) show entrepreneurial drive', 'Document any leadership role — what you did, who you helped, what changed', 'Community service hours with a reflection are compelling for first-job seekers', 'Google Slides PDF or a physical binder are perfect formats for you'] },
  },
  interview: {
    design:      { headline: 'Your portfolio is the conversation', icon: '🎨', points: ['Practice narrating each project: brief → process → outcome → what you learned', 'Have an answer ready for: "How do you handle feedback you disagree with?"', 'Be ready to talk about your creative process start to finish', 'Interviewers want to see your thinking, not just your final files', 'Prepare 2–3 questions about their creative team and culture'] },
    business:    { headline: 'Lead with data and strategy', icon: '📊', points: ['Practice answering: "How would you improve our marketing/strategy?"', 'Have a STAR story ready involving a measurable result', 'Show you\'ve researched the company — mention something specific', 'Be ready to talk through a decision you made using data or analysis', 'Your questions should show strategic curiosity: "What does success look like in 90 days?"'] },
    healthcare:  { headline: 'Compassion and composure under pressure', icon: '🩺', points: ['Practice: "Tell me about a stressful situation and how you handled it"', 'Know your certifications cold — dates, what they cover, when they expire', 'Have a STAR story that demonstrates empathy and professionalism together', 'Never reveal patient details in any interview answer', 'Ask about team culture, training, and mentorship — shows long-term thinking'] },
    engineering: { headline: 'Walk them through your problem-solving', icon: '⚙️', points: ['Practice narrating a technical project from problem → approach → solution', 'Be ready to explain a time your code or design failed and what you did', '"How do you debug something you\'ve never seen?" — have a real process answer', 'Show curiosity: ask about their tech stack, team structure, and current challenges', 'Confidence with uncertainty matters: "I\'d research X, test Y, then ask a colleague" is a strong answer'] },
    trades:      { headline: 'Safety, skill, and work ethic first', icon: '🔧', points: ['Be ready to describe hands-on experience with specific tools and equipment', '"How do you ensure safety on a job site?" — have a detailed, practiced answer', 'Bring your certification cards to the interview if possible', 'A story about completing something under deadline pressure is gold', 'Ask about apprenticeship structure, mentorship, and how they handle on-the-job training'] },
    education:   { headline: 'Show you teach the student, not the subject', icon: '📚', points: ['Practice: "How do you adapt your approach for struggling learners?"', 'Have a specific example of a student who was difficult to reach and what you tried', 'Be ready to describe a lesson or activity you designed — what was the goal?', '"What is your classroom management philosophy?" — know your answer clearly', 'Ask about student populations, co-teaching opportunities, and growth support'] },
    hospitality: { headline: 'Grace under pressure is your superpower', icon: '🍽️', points: ['Practice: "Tell me about a very difficult customer and how you resolved it"', '"How do you stay calm during a rush?" — have a real, specific answer', 'Be ready to describe a moment you went genuinely above and beyond', 'Know your certifications (ServSafe, etc.) and when you got them', 'Ask about scheduling, team culture, and advancement opportunities'] },
    general:     { headline: 'Be honest, enthusiastic, and specific', icon: '⭐', points: ['Practice "Tell me about yourself" until it flows naturally in 60 seconds', '"Why do you want to work here?" — research the company and answer specifically', 'Have one real example of responsibility or problem-solving ready', 'It\'s okay to say you\'re new — pair it with eagerness to learn', 'Ask: "What does a great first 90 days look like for this role?"'] },
  },
};

function showFieldFocus(field, tool) {
  const focus = (FIELD_FOCUS[tool] || {})[field];
  if (!focus) return;

  const fieldMeta = FIELDS.find(f => f.id === field) || {};
  const toolLabels = { resume: 'Resume Builder', linkedin: 'LinkedIn Builder', portfolio: 'Portfolio Builder', interview: 'Interview Prep' };

  // Remove any existing modal
  const existing = document.getElementById('fieldFocusModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'fieldFocusModal';
  overlay.innerHTML = `
    <div class="ffm-backdrop" onclick="closeFieldFocus()"></div>
    <div class="ffm-panel">
      <div class="ffm-eyebrow">${fieldMeta.label || ''} · ${toolLabels[tool] || tool}</div>
      <div class="ffm-icon">${fieldMeta.svg || ''}</div>
      <h2 class="ffm-headline">${focus.headline}</h2>
      <p class="ffm-subtitle">Here's what to focus on as you build:</p>
      <ul class="ffm-list">
        ${focus.points.map(p => `<li><span class="ffm-bullet">✦</span><span>${p}</span></li>`).join('')}
      </ul>
      <button class="ffm-btn" onclick="closeFieldFocus()">Got it — let's build →</button>
    </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('ffm-open'));
}

function closeFieldFocus() {
  const modal = document.getElementById('fieldFocusModal');
  if (!modal) return;
  modal.classList.remove('ffm-open');
  setTimeout(() => modal.remove(), 280);
}
