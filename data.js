/* ══════════════════════════════════════════════════════
   data.js  —  All static content: fields, verbs, skills
   Synced with careerlunch-flowchart.html field guides
══════════════════════════════════════════════════════ */

const FIELDS = [
  { id: 'design',      icon: 'pen-tool',      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>', label: 'Graphic Design'      },
  { id: 'business',    icon: 'bar-chart-2',   svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', label: 'Business / Marketing' },
  { id: 'healthcare',  icon: 'heart-pulse',   svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h4.28"/></svg>', label: 'Healthcare'           },
  { id: 'engineering', icon: 'cpu',           svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>', label: 'Engineering'          },
  { id: 'trades',      icon: 'wrench',        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>', label: 'Skilled Trades'       },
  { id: 'education',   icon: 'book-open',     svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>', label: 'Education'            },
  { id: 'hospitality', icon: 'utensils',      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>', label: 'Hospitality'          },
  { id: 'general',     icon: 'star',          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', label: 'General / First Job'  },
];

const FIELD_DATA = {
  design: {
    summary: 'I am a creative problem-solver with a passion for visual storytelling and design. I excel at…',
    verbs: ['Designed','Created','Illustrated','Branded','Produced','Visualized','Crafted','Conceptualized','Revised'],
    bulletExample: 'Designed a complete brand identity — logo, flyer, and social graphics — for a school fundraiser, increasing event attendance by 30%.',
    avoidPhrases: ['Responsible for art','Did some graphics','Good at drawing'],
    atsKeywords: ['brand identity','visual design','digital illustration','layout design','print design'],
  },
  business: {
    summary: 'I am a results-driven and organized individual with a passion for marketing and business strategy. I excel at…',
    verbs: ['Managed','Analyzed','Increased','Led','Launched','Coordinated','Negotiated','Grew','Presented'],
    bulletExample: 'Managed our school store\'s Instagram, growing followers from 120 to 850 in one semester through consistent posting and story content.',
    avoidPhrases: ['Helped with business','Did marketing stuff','Was in charge of'],
    atsKeywords: ['digital marketing','campaign management','customer engagement','market research'],
  },
  healthcare: {
    summary: 'I am a detail-oriented and compassionate individual committed to supporting patient health and wellness. I excel at…',
    verbs: ['Assisted','Monitored','Documented','Supported','Educated','Administered','Assessed','Coordinated','Collaborated'],
    bulletExample: 'Assisted nursing staff with intake for 20+ patients daily, accurately documenting vitals and flagging changes to the charge nurse.',
    avoidPhrases: ['Helped patients','Did healthcare stuff','Was nice to people'],
    atsKeywords: ['patient care','clinical support','healthcare compliance','medical documentation'],
  },
  engineering: {
    summary: 'I am an analytical and solution-focused student with a strong foundation in engineering principles. I excel at…',
    verbs: ['Engineered','Programmed','Designed','Tested','Optimized','Built','Analyzed','Prototyped','Debugged'],
    bulletExample: 'Built and programmed a sensor-guided robot for the state FIRST Robotics competition, placing 2nd in autonomous navigation.',
    avoidPhrases: ['Did coding','Worked on tech stuff','Helped with engineering'],
    atsKeywords: ['software development','systems design','technical analysis','quality assurance'],
  },
  trades: {
    summary: 'I am a dependable and hands-on worker with a strong work ethic and commitment to quality craftsmanship. I excel at…',
    verbs: ['Installed','Repaired','Maintained','Constructed','Operated','Inspected','Troubleshot','Fabricated','Completed'],
    bulletExample: 'Completed installation of residential electrical panels for 3 homes during a summer apprenticeship, passing all safety inspections on first review.',
    avoidPhrases: ['Fixed stuff','Did some work','Helped build things'],
    atsKeywords: ['safety compliance','quality control','equipment operation','technical maintenance'],
  },
  education: {
    summary: 'I am a patient and enthusiastic individual who loves helping others learn and grow. I excel at…',
    verbs: ['Tutored','Mentored','Facilitated','Guided','Developed','Assessed','Inspired','Organized','Presented'],
    bulletExample: 'Tutored 6 middle school students in algebra over one semester, with 5 of 6 improving their grades by at least one full letter.',
    avoidPhrases: ['Helped kids','Taught stuff','Was a helper'],
    atsKeywords: ['student engagement','academic support','youth development','instructional design'],
  },
  hospitality: {
    summary: 'I am a friendly and customer-focused individual who thrives in fast-paced service environments. I excel at…',
    verbs: ['Served','Managed','Welcomed','Coordinated','Resolved','Trained','Exceeded','Delivered','Scheduled'],
    bulletExample: 'Served 80+ guests per shift at a high-volume restaurant, maintaining a 4.9-star customer satisfaction rating over 6 months.',
    avoidPhrases: ['Worked at restaurant','Did customer service','Was friendly'],
    atsKeywords: ['guest experience','food safety','customer satisfaction','service excellence'],
  },
  general: {
    summary: 'I am a motivated and dependable team player eager to contribute and grow in a professional environment. I excel at…',
    verbs: ['Organized','Assisted','Managed','Contributed','Completed','Improved','Communicated','Supported','Achieved'],
    bulletExample: 'Organized weekly community events for 80+ attendees as student body treasurer, managing a $2,000 budget and coordinating with 5 vendors.',
    avoidPhrases: ['Hard worker','Fast learner','No experience'],
    atsKeywords: ['team collaboration','organizational skills','detail-oriented','self-motivated'],
  },
};

const SOFT_SKILLS = {
  design:      ['Creativity','Attention to Detail','Communication','Time Management','Adaptability'],
  business:    ['Leadership','Critical Thinking','Communication','Initiative','Problem Solving'],
  healthcare:  ['Compassion','Attention to Detail','Dependability','Adaptability','Teamwork'],
  engineering: ['Critical Thinking','Problem Solving','Attention to Detail','Teamwork','Dependability'],
  trades:      ['Work Ethic','Safety Awareness','Teamwork','Initiative','Dependability'],
  education:   ['Patience','Communication','Adaptability','Empathy','Leadership'],
  hospitality: ['Customer Service','Teamwork','Adaptability','Work Ethic','Communication'],
  general:     ['Dependability','Teamwork','Communication','Work Ethic','Initiative'],
};

// Legacy flat list for backward compat (used in skills step checkboxes)
const SOFT_SKILLS_LIST = [
  'Communication','Teamwork','Adaptability','Time Management','Problem Solving',
  'Leadership','Work Ethic','Attention to Detail','Creativity','Initiative',
  'Critical Thinking','Dependability','Compassion','Patience','Empathy',
  'Safety Awareness','Customer Service',
];

const HARD_SKILLS = {
  design:      ['Adobe Illustrator','Photoshop','Figma','InDesign','Canva','After Effects','Typography','Color Theory','UX/UI Basics'],
  business:    ['Microsoft Excel','Google Analytics','Social Media Marketing','Public Speaking','Email Marketing','Data Analysis','CRM Basics'],
  healthcare:  ['CPR Certified','First Aid','Patient Care','HIPAA Compliance','Medical Terminology','Vital Signs','EHR Software'],
  engineering: ['Python','AutoCAD','MATLAB','SolidWorks','3D Printing','JavaScript','Circuit Design','Data Analysis'],
  trades:      ['Welding (MIG/TIG)','Electrical Wiring','Plumbing','OSHA 10 Certified','Blueprint Reading','Heavy Equipment','Hand & Power Tools','Quality Control'],
  education:   ['Lesson Planning','Google Classroom','Classroom Management','Assessment Design','Differentiated Instruction'],
  hospitality: ['POS Systems','Food Handler Certified','ServSafe','Reservation Software','Cash Handling','Event Coordination'],
  general:     ['Microsoft Office','Google Workspace','Customer Service','Cash Handling','Data Entry','Social Media','Scheduling'],
};

/* Interview questions per field */
const INTERVIEW_QUESTIONS = {
  design:      ['Walk me through your portfolio.','How do you handle client feedback you disagree with?','Describe your creative process from brief to final design.'],
  business:    ['How would you improve our marketing strategy?','Describe a time you used data to make a decision.','How do you prioritize when you have multiple projects?'],
  healthcare:  ['How do you handle a stressful patient situation?','Describe a time you showed compassion under pressure.','How do you ensure patient privacy and HIPAA compliance?'],
  engineering: ['Describe a technical problem you solved.','Walk me through a project you built from scratch.','How do you approach debugging a problem you\'ve never seen before?'],
  trades:      ['Describe your hands-on experience with [tool/skill].','How do you ensure safety on a job site?','Tell me about completing a project under a tight deadline.'],
  education:   ['How do you adapt your approach to different learners?','Describe a time a student was struggling and how you helped.','What is your classroom or session management philosophy?'],
  hospitality: ['How do you handle a difficult customer?','Describe a time you went above and beyond for a guest.','How do you stay focused and calm during a very busy shift?'],
  general:     ['Why do you want to work here specifically?','What would your teachers or coworkers say about you?','Describe a challenge you overcame and what you learned.'],
};

/* Portfolio project types per field */
const PORTFOLIO_PROJECTS = {
  design:      ['Logo & Brand Identity','Poster / Flyer','Social Media Campaign','Typography Study','Website Mockup','Illustration Series'],
  business:    ['Marketing Campaign','Business Plan','Event Budget & Recap','Social Media Strategy','Competitive Analysis'],
  healthcare:  ['Health Education Materials','Research Summary','Community Health Event','Volunteer Log','Certification Evidence'],
  engineering: ['GitHub Coding Projects','Robotics Build','Science Fair Entry','CAD Design','3D Print Project','App / Website'],
  trades:      ['Before/After Build Photos','Blueprint or Plan','Certification Docs','Safety Inspection Report','Video of Completed Work'],
  education:   ['Lesson Plans','Tutoring Progress Report','Activity You Led','Curriculum Unit','Workshop Materials','Reflection Essay'],
  hospitality: ['Event You Planned','Customer Service Story','Menu / Program Created','Training Guide','Certification Documentation'],
  general:     ['School Project You\'re Proud Of','Club / Team Leadership','Community Service Log','Side Hustle Evidence','Personal Skill Demo'],
};

/* Field-specific portfolio example box content */
const PORTFOLIO_EXAMPLES = {
  design: `<strong>Strong Design Portfolio Entry:</strong><br>
    <strong>Project:</strong> Brand Identity for Cedar City Youth Theater<br>
    <strong>Goal:</strong> Create a full visual identity from scratch for a new nonprofit theater program<br>
    <strong>Process:</strong> Sketched 12 logo concepts → narrowed to 3 → presented to board → revised twice → finalized<br>
    <strong>Deliverables:</strong> Logo (3 variations), color system, typography guide, poster template, social media kit<br>
    <strong>Tools:</strong> Adobe Illustrator, InDesign, Figma for presentation<br>
    <strong>Outcome:</strong> Identity launched with their first production — 200+ attendees saw it opening night<br>
    <em>💡 Include the sketch phase and early bad versions — that process is what employers want to see.</em>`,

  business: `<strong>Strong Business Portfolio Entry:</strong><br>
    <strong>Project:</strong> Social Media Rebrand for School Bookstore<br>
    <strong>Goal:</strong> Grow Instagram following and increase in-store foot traffic<br>
    <strong>Strategy:</strong> Audited competitors, identified 3 content pillars, built a 30-day posting calendar<br>
    <strong>Deliverables:</strong> Content calendar, 30 posts, analytics report at end of semester<br>
    <strong>Tools:</strong> Canva, Instagram Insights, Google Sheets<br>
    <strong>Outcome:</strong> Grew from 87 to 412 followers; store reported 18% more student visits<br>
    <em>💡 Numbers are everything in business. If you don't have them, estimate conservatively and explain how.</em>`,

  healthcare: `<strong>Strong Healthcare Portfolio Entry:</strong><br>
    <strong>Project:</strong> Volunteer at Dixie Regional Medical Center — Patient Flow Assistant<br>
    <strong>Goal:</strong> Help reduce bottlenecks during peak intake hours<br>
    <strong>Role:</strong> Greeted patients, assisted with paperwork, directed to correct departments, flagged urgent cases to staff<br>
    <strong>Hours:</strong> 48 hours over 3 months (documented in service log)<br>
    <strong>Outcome:</strong> Supervisor noted improved waiting room communication during shifts I covered<br>
    <strong>Certifications:</strong> CPR/AED certified, First Aid, HIPAA training completed<br>
    <em>💡 Never include patient names or identifying details. Focus on your role and what you contributed.</em>`,

  engineering: `<strong>Strong Engineering Portfolio Entry:</strong><br>
    <strong>Project:</strong> FIRST Robotics — Autonomous Navigation System<br>
    <strong>Goal:</strong> Build a robot that could navigate a curved obstacle course without human input<br>
    <strong>Problem:</strong> Initial PID loop caused the robot to overshoot every turn<br>
    <strong>Approach:</strong> Tested 6 different tuning configurations over 3 weeks, documented each result<br>
    <strong>Solution:</strong> Added a gyroscope correction layer that compensated in real time<br>
    <strong>Tools:</strong> Python, RoboRIO, CAD, 3D printer for custom mount<br>
    <strong>Outcome:</strong> 2nd place autonomous challenge at state competition<br>
    <em>💡 Show what failed and why. Engineers who document failure are more trusted than those who only show wins.</em>`,

  trades: `<strong>Strong Trades Portfolio Entry:</strong><br>
    <strong>Project:</strong> Residential Electrical Panel Replacement — Apprenticeship<br>
    <strong>Scope:</strong> Full panel upgrade on a 1970s home with outdated wiring (fire hazard identified during inspection)<br>
    <strong>My Role:</strong> Assisted journeyman electrician — ran conduit, labeled all circuits, installed breakers under supervision<br>
    <strong>Tools Used:</strong> Wire stripper, multimeter, conduit bender, voltage tester, PPE throughout<br>
    <strong>Certifications:</strong> OSHA 10, First Aid, Electrical Safety Fundamentals<br>
    <strong>Outcome:</strong> Passed all inspections first review. Homeowner had zero issues at 6-month follow-up<br>
    <em>💡 Before/after photos of your work are the most powerful thing you can include. Always ask permission first.</em>`,

  education: `<strong>Strong Education Portfolio Entry:</strong><br>
    <strong>Project:</strong> After-School Algebra Tutoring Program — 1 Semester<br>
    <strong>Students:</strong> 6 middle schoolers referred by teachers for failing grades<br>
    <strong>Approach:</strong> Diagnosed each student's gap, built individualized 4-week plans, used visual math tools<br>
    <strong>Materials Created:</strong> 12 custom worksheets, a fraction review game, a progress tracking sheet<br>
    <strong>Tools:</strong> Khan Academy, Google Classroom, physical manipulatives<br>
    <strong>Outcome:</strong> 5 of 6 students improved by at least one full letter grade by semester end<br>
    <em>💡 Student outcomes — not your effort — are what matter most. Always document the "before" so you can show the "after."</em>`,

  hospitality: `<strong>Strong Hospitality Portfolio Entry:</strong><br>
    <strong>Project:</strong> Cedar High End-of-Year Banquet — Lead Student Coordinator<br>
    <strong>Scope:</strong> 200-guest formal dinner, 4 vendors, 3-hour program, $3,200 budget<br>
    <strong>My Role:</strong> Created run-of-show, coordinated with catering and AV vendors, managed 8 student volunteers<br>
    <strong>Challenge:</strong> Catering arrived 25 minutes late — rearranged program order to cover, guests didn't notice<br>
    <strong>Tools:</strong> Google Sheets (timeline + budget), email coordination, night-of walkie talkies<br>
    <strong>Outcome:</strong> Event ended on time. Post-event survey: 94% rated experience "excellent"<br>
    <em>💡 Employers love a story about something that went wrong and how you handled it. Don't hide the crisis — own the solution.</em>`,

  general: `<strong>Strong First-Job Portfolio Entry:</strong><br>
    <strong>Project:</strong> Neighborhood Yard Sale Fundraiser — Organizer<br>
    <strong>Goal:</strong> Raise money for a local animal shelter while clearing out donated items<br>
    <strong>What I Did:</strong> Made flyers, organized items by category and price, recruited 4 neighbors to help, handled all payments<br>
    <strong>Tools:</strong> Canva for flyers, Venmo for digital payments, hand-written signage<br>
    <strong>Outcome:</strong> Raised $340 in one Saturday. Donated 2 truckloads of unsold items to Deseret Industries<br>
    <strong>What I Learned:</strong> Delegating tasks to specific people (not "everyone") is the difference between chaos and smooth<br>
    <em>💡 Any project where you took responsibility and something happened counts. School projects, family responsibilities, side hustles — all fair game.</em>`,
};

const FIELD_EXAMPLES_COVER_OPENING = {
  design:      `<strong>Design opening:</strong> "I'm thrilled to apply for the Graphic Design Internship at [Company]. I've been following your studio's work for the past year — particularly the brand identity you developed for [Client] — and I knew immediately this was where I wanted to learn what great design looks like up close."`,
  business:    `<strong>Business opening:</strong> "I'm excited to apply for the Marketing Intern position at [Company] because I've been studying your campaigns and I see a team that takes strategy seriously. I want to be part of an environment where data and creativity work together — and everything I've seen from your brand tells me that's exactly what you build."`,
  healthcare:  `<strong>Healthcare opening:</strong> "I'm honored to apply for the Patient Care Aide role at [Company]. Supporting patients through difficult moments isn't just a career goal for me — it's the reason I've spent 48 hours volunteering at Dixie Regional and earned my CPR certification before finishing my junior year."`,
  engineering: `<strong>Engineering opening:</strong> "I'm applying for the Engineering Internship at [Company] because your focus on embedded systems and iterative prototyping aligns directly with the work I've been doing in FIRST Robotics — where I've learned that the best engineers are the ones who document failure as carefully as success."`,
  trades:      `<strong>Trades opening:</strong> "I'm applying for the Electrical Apprenticeship at [Company] because your reputation for code-compliant, quality work is exactly the environment where I want to earn my journeyman certification. I take this trade seriously — OSHA 10 certified, 120 apprenticeship hours completed, and ready to work."`,
  education:   `<strong>Education opening:</strong> "I'm applying for the Teacher's Aide position at [School] because your commitment to differentiated instruction matches the approach I've seen work firsthand — tutoring six struggling students and watching five of them improve by at least one letter grade by semester end."`,
  hospitality: `<strong>Hospitality opening:</strong> "I'm excited to apply for the Event Coordinator role at [Company]. I coordinated our school's 200-guest year-end banquet from vendor contracts to run-of-show, and I learned that great hospitality is really about solving problems before guests ever know they existed."`,
  general:     `<strong>General opening:</strong> "I'm excited to apply for the [Position] at [Company]. I'm a motivated high school student with real work experience, a strong attendance record, and the kind of attitude that makes teams better — I show up ready to work and I don't need to be asked twice."`,
};
