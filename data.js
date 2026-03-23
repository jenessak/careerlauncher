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

/* ══════════════════════════════════════════════════════
   FIELD-SPECIFIC EXAMPLE CONTENT
══════════════════════════════════════════════════════ */
const FIELD_EXAMPLES = {
  resumeSummary: {
    design:      `<strong>Design:</strong> "Detail-oriented graphic design student with hands-on experience in brand identity, digital illustration, and print layout. Proficient in Adobe Illustrator, Photoshop, and Figma. Seeking a creative internship where I can contribute original thinking and grow alongside a professional design team."`,
    business:    `<strong>Business:</strong> "Motivated business student with experience running school fundraisers, managing social media accounts, and analyzing campaign performance. Skilled in Google Sheets, Canva, and data-driven decision making. Looking for an entry-level marketing or sales role."`,
    healthcare:  `<strong>Healthcare:</strong> "Compassionate healthcare student with 48+ volunteer hours at a regional medical center. CPR/AED and First Aid certified. Strong communicator with a commitment to patient dignity. Seeking a CNA or medical assistant role."`,
    engineering: `<strong>Engineering:</strong> "Problem-solving engineering student with experience building autonomous robotics systems and writing Python automation scripts. Comfortable with CAD, 3D printing, and iterative design. Looking for a technical internship."`,
    trades:      `<strong>Trades:</strong> "Hardworking trades student with hands-on experience in residential electrical wiring under licensed supervision. OSHA 10 certified. Known for clean work and a strong safety mindset. Seeking an apprenticeship."`,
    education:   `<strong>Education:</strong> "Dedicated education student with tutoring experience supporting 6 middle school students in Algebra. Patient communicator. Seeking a teacher's aide or youth program role."`,
    hospitality: `<strong>Hospitality:</strong> "Organized hospitality student with experience coordinating a 200-guest formal banquet from timeline creation to vendor management. Seeking a front-of-house or event coordination position."`,
    general:     `<strong>General:</strong> "Reliable high school student with experience in customer service, cash handling, and team coordination. Quick learner with a positive attitude. Looking for a part-time or summer role."`,
  },
  resumeExperience: {
    design:      `<strong>Design bullet examples:</strong><br>✅ "Designed 12 logo concepts for a local nonprofit; final version used at their 200-person launch event"<br>✅ "Created Instagram template series that increased client engagement by 34%"<br>❌ "Made logos and social media stuff"`,
    business:    `<strong>Business bullet examples:</strong><br>✅ "Managed school store's Instagram, growing followers from 87 to 412 over one semester"<br>✅ "Coordinated a $3,200 fundraiser, securing 4 vendor sponsors and exceeding revenue goal by 18%"<br>❌ "Helped with social media and fundraising"`,
    healthcare:  `<strong>Healthcare bullet examples:</strong><br>✅ "Assisted nursing staff with patient intake for 6-hour weekly shifts, serving 30+ patients per shift"<br>✅ "Completed 48 volunteer hours; recognized by floor supervisor for clear communication"<br>❌ "Volunteered at a hospital and helped patients"`,
    engineering: `<strong>Engineering bullet examples:</strong><br>✅ "Built autonomous navigation robot using Python and a custom PID loop; placed 2nd at state competition"<br>✅ "Designed and 3D-printed a sensor mounting bracket that reduced setup time by 15 minutes"<br>❌ "Worked on robotics and did programming"`,
    trades:      `<strong>Trades bullet examples:</strong><br>✅ "Assisted licensed electrician in full residential panel replacement; passed first-time safety inspection"<br>✅ "Operated conduit bender, multimeter, and voltage tester across 3 job sites over 120 apprenticeship hours"<br>❌ "Helped with electrical work and used tools"`,
    education:   `<strong>Education bullet examples:</strong><br>✅ "Tutored 6 middle school students weekly; 5 of 6 improved by at least one letter grade by semester end"<br>✅ "Designed 12 differentiated worksheets aligned to Utah Core Standards"<br>❌ "Tutored some students and made worksheets"`,
    hospitality: `<strong>Hospitality bullet examples:</strong><br>✅ "Coordinated 200-guest banquet including vendor contracts, seating chart, and full run-of-show doc"<br>✅ "Managed 8 student volunteers; resolved a 25-minute catering delay without disrupting guest experience"<br>❌ "Helped plan an event and managed volunteers"`,
    general:     `<strong>First job bullet examples:</strong><br>✅ "Processed 50+ customer transactions daily with zero cash drawer discrepancies over 3 months"<br>✅ "Organized neighborhood fundraiser that raised $340 for a local animal shelter"<br>❌ "Worked at a store and helped customers"`,
  },
  resumeSkills: {
    design:      `<strong>Design skill combo:</strong><br>Hard: Adobe Illustrator, Figma, Photoshop, InDesign, Procreate<br>Soft: Creative problem-solving, attention to detail, client communication, deadline management`,
    business:    `<strong>Business skill combo:</strong><br>Hard: Google Sheets, Canva, Mailchimp, Excel, Instagram Insights<br>Soft: Strategic thinking, persuasive communication, adaptability, collaboration`,
    healthcare:  `<strong>Healthcare skill combo:</strong><br>Hard: CPR/AED certified, First Aid, EHR data entry, HIPAA compliance<br>Soft: Empathy, active listening, composure under pressure, clear documentation`,
    engineering: `<strong>Engineering skill combo:</strong><br>Hard: Python, CAD (Fusion 360), 3D printing, Arduino, circuit design<br>Soft: Analytical thinking, iterative problem-solving, technical documentation`,
    trades:      `<strong>Trades skill combo:</strong><br>Hard: OSHA 10, conduit bending, multimeter operation, blueprint reading<br>Soft: Safety mindset, precision, dependability, willingness to learn`,
    education:   `<strong>Education skill combo:</strong><br>Hard: Google Classroom, Khan Academy, differentiated instruction, assessment design<br>Soft: Patience, adaptability, empathy, clear verbal communication`,
    hospitality: `<strong>Hospitality skill combo:</strong><br>Hard: Event timeline planning, vendor coordination, POS systems, food handler certified<br>Soft: Grace under pressure, conflict resolution, customer-first mindset`,
    general:     `<strong>First job skill combo:</strong><br>Hard: Cash handling, inventory tracking, Microsoft Word, social media platforms<br>Soft: Reliability, positive attitude, team player, quick learner`,
  },
  resumeATS: {
    design:      `<strong>Design ATS example:</strong><br>Job says: "proficiency in Adobe Creative Suite and experience with brand guidelines"<br>✅ Resume: "Proficient in Adobe Creative Suite (Illustrator, Photoshop, InDesign); created brand guidelines for 2 client projects"<br>❌ Weak: "Good with design software and branding"`,
    business:    `<strong>Business ATS example:</strong><br>Job says: "social media management and data analysis"<br>✅ Resume: "Managed Instagram and TikTok; analyzed weekly engagement data using Instagram Insights and Google Sheets"<br>❌ Weak: "Ran social media and looked at the numbers"`,
    healthcare:  `<strong>Healthcare ATS example:</strong><br>Job says: "CPR certified, patient intake experience, strong communication"<br>✅ Resume: "CPR/AED certified; assisted with patient intake at Dixie Regional (48 hrs)"<br>❌ Weak: "Helped at a hospital and have CPR"`,
    engineering: `<strong>Engineering ATS example:</strong><br>Job says: "Python programming, problem-solving, hardware experience"<br>✅ Resume: "Wrote Python PID control algorithm for autonomous robot; designed and 3D-printed custom hardware mounts"<br>❌ Weak: "Did coding and built robot parts"`,
    trades:      `<strong>Trades ATS example:</strong><br>Job says: "OSHA certified, residential wiring, safety protocols"<br>✅ Resume: "OSHA 10 certified; completed residential panel replacement; zero safety violations across 120 hrs"<br>❌ Weak: "Did electrical work and know safety stuff"`,
    education:   `<strong>Education ATS example:</strong><br>Job says: "youth experience, lesson planning, progress monitoring"<br>✅ Resume: "Tutored 6 students weekly; created individualized lesson plans aligned to Utah Core Standards"<br>❌ Weak: "Worked with kids and made some lessons"`,
    hospitality: `<strong>Hospitality ATS example:</strong><br>Job says: "event coordination, vendor management, customer service"<br>✅ Resume: "Coordinated 200-guest banquet; managed 4 vendor contracts; handled real-time guest service issues"<br>❌ Weak: "Helped plan events and talked to vendors"`,
    general:     `<strong>General ATS example:</strong><br>Job says: "customer service, cash handling, reliable and punctual"<br>✅ Resume: "Processed 50+ daily transactions with 100% cash drawer accuracy; zero unexcused absences over 3 months"<br>❌ Weak: "Worked register and showed up on time"`,
  },
  linkedinHeadline: {
    design:      `<strong>Design:</strong> Aspiring Graphic Designer | Adobe Illustrator &amp; Brand Identity | Seeking Creative Internship<br><strong>Alt:</strong> Visual Design Student | Figma · Procreate · InDesign | Available for Freelance &amp; Internships`,
    business:    `<strong>Business:</strong> Business &amp; Marketing Student | Social Media Strategy · Analytics | Seeking Entry-Level Role<br><strong>Alt:</strong> Aspiring Marketing Professional | Google Sheets · Canva | Open to Internships`,
    healthcare:  `<strong>Healthcare:</strong> Pre-CNA Healthcare Student | CPR/AED Certified · Patient Care | Seeking Clinical Internship<br><strong>Alt:</strong> Aspiring Medical Assistant | Dixie Regional Volunteer | Committed to Compassionate Care`,
    engineering: `<strong>Engineering:</strong> Engineering &amp; Robotics Student | Python · CAD · 3D Printing | FIRST Robotics — State Competitor<br><strong>Alt:</strong> Aspiring Software Engineer | Python · Arduino | Seeking Tech Internship`,
    trades:      `<strong>Trades:</strong> Electrical Trades Student | OSHA 10 Certified · Residential Wiring | Seeking Apprenticeship<br><strong>Alt:</strong> Skilled Trades Apprentice | HVAC &amp; Electrical | Committed to Quality Craftsmanship`,
    education:   `<strong>Education:</strong> Future Educator | Algebra Tutor · Differentiated Instruction | Seeking Teaching Aide Position<br><strong>Alt:</strong> Education Student | Youth Mentorship · Google Classroom | Passionate About Student Growth`,
    hospitality: `<strong>Hospitality:</strong> Hospitality &amp; Events Student | Banquet Coordination · Vendor Management | Seeking Entry-Level Role<br><strong>Alt:</strong> Aspiring Event Coordinator | Guest Experience · Run-of-Show Planning | Available Immediately`,
    general:     `<strong>General:</strong> Motivated High School Student | Customer Service · Cash Handling | Seeking Part-Time Work<br><strong>Alt:</strong> Hard-Working &amp; Reliable | Team Player · Quick Learner | Available Weekends &amp; Evenings`,
  },
  linkedinAbout: {
    design:      `<strong>Design About example:</strong><br>"I'm a graphic design student at [School] with a passion for visual storytelling and brand identity. I've designed logos, social media templates, and print materials for local organizations — my favorite project was creating a full brand identity for a nonprofit theater that launched with 200 attendees. I work in Adobe Illustrator, Figma, and Photoshop. Currently seeking internship or freelance opportunities."`,
    business:    `<strong>Business About example:</strong><br>"I'm a business and marketing student who loves turning data into decisions. I managed social media accounts, planned fundraising campaigns, and analyzed performance metrics. My proudest project grew a school account from 87 to 412 followers in one semester. I'm looking for an entry-level marketing or operations role."`,
    healthcare:  `<strong>Healthcare About example:</strong><br>"I'm a healthcare student with 48 volunteer hours at Dixie Regional Medical Center and current CPR/AED certification. I've assisted with patient intake, supported nursing staff during peak hours, and learned how clear communication impacts patient experience. Seeking a CNA position or clinical internship."`,
    engineering: `<strong>Engineering About example:</strong><br>"I'm an engineering student who builds things that solve real problems. Through FIRST Robotics, I've written Python control algorithms, designed parts in CAD, and 3D-printed custom components. I placed 2nd in the autonomous challenge at state last year. Looking for a technical internship."`,
    trades:      `<strong>Trades About example:</strong><br>"I'm a skilled trades student specializing in electrical work. I've completed 120+ apprenticeship hours on residential jobs — including a full panel replacement that passed all safety inspections on the first review. OSHA 10 certified. Seeking an apprenticeship toward journeyman certification."`,
    education:   `<strong>Education About example:</strong><br>"I'm an education student who believes every student can succeed with the right support. I spent one semester tutoring 6 middle schoolers in Algebra — by semester end, 5 of 6 improved by at least one letter grade. Looking for a teacher's aide or youth program role."`,
    hospitality: `<strong>Hospitality About example:</strong><br>"I'm a hospitality student who thrives in fast-paced, people-first environments. I coordinated our school's 200-guest banquet — managing vendors, creating the run-of-show, and directing 8 volunteers. When catering arrived late, I adjusted the program on the fly and guests never noticed. Seeking a front-of-house or event coordination position."`,
    general:     `<strong>General About example:</strong><br>"I'm a [School] student looking for my first professional opportunity. I've handled real responsibility — managing a fundraiser that raised $340, working a register with 100% cash accuracy, and volunteering consistently. I show up, learn fast, and care about doing things right."`,
  },
  linkedinNetworking: {
    design:      `<strong>To a designer:</strong> "Hi [Name], I'm a graphic design student and I've been following your work — the brand identity you did for [Project] really stood out. I'd love to connect and learn more about your path in the industry."<br><strong>To a teacher:</strong> "Hi [Name], I'm building my LinkedIn and would love to connect. Your design class taught me how to think visually — that's shaped everything I've done since."`,
    business:    `<strong>To a professional:</strong> "Hi [Name], I'm a marketing student and I've been learning about digital strategy. I'd love to connect — your work at [Company] looks like exactly the kind of environment I'm hoping to enter."<br><strong>To a teacher:</strong> "Hi [Name], I'm setting up my LinkedIn and wanted to connect. Your Business class gave me the framework I needed to start thinking like a professional."`,
    healthcare:  `<strong>To a healthcare professional:</strong> "Hi [Name], I'm a pre-CNA student beginning to build my professional network. I'd love to connect — I admire the work you do at [Organization] and would appreciate any advice for someone just starting out."<br><strong>To a supervisor:</strong> "Hi [Name], thank you for letting me volunteer at [Facility]. Working alongside your team meant a great deal to me — I'd love to stay connected."`,
    engineering: `<strong>To an engineer:</strong> "Hi [Name], I'm an engineering student working on robotics and Python projects. I'd love to connect — your work on [Project] is exactly the kind of problem I want to work on someday."<br><strong>To a FIRST mentor:</strong> "Hi [Name], thank you for mentoring our robotics team. Your guidance made a real difference. I'd love to stay connected as I pursue engineering in college."`,
    trades:      `<strong>To a journeyman:</strong> "Hi [Name], I'm a trades student working toward my electrical apprenticeship. I'd love to connect and learn from someone with your experience in the field."<br><strong>To a supervisor:</strong> "Hi [Name], I really appreciated the chance to work alongside you. I learned more in those hours than in any classroom. I'd love to stay connected."`,
    education:   `<strong>To a teacher:</strong> "Hi [Name], you've been one of the most influential people in my learning. I'd love to connect as I start building my professional network in education."<br><strong>To a program director:</strong> "Hi [Name], I volunteered with your tutoring program last semester — it was a genuinely impactful experience. I'd love to stay connected as I pursue a career in education."`,
    hospitality: `<strong>To an event professional:</strong> "Hi [Name], I'm a hospitality student who recently coordinated a 200-guest banquet. I'd love to connect — your work in event planning is exactly the direction I'm heading."<br><strong>To a manager:</strong> "Hi [Name], working at [Venue] taught me so much about how great hospitality actually works. I'd love to stay in touch."`,
    general:     `<strong>To a local employer:</strong> "Hi [Name], I'm a [School] student looking for part-time work this summer. I've heard great things about [Company] and would love to connect and learn more about opportunities there."<br><strong>To a teacher:</strong> "Hi [Name], I'm building my LinkedIn and wanted to connect. Thank you for always pushing me to take my work seriously."`,
  },
  coverLetterBody: {
    design:      `<strong>Design body paragraph:</strong> "During my junior year, I was commissioned to design the full brand identity for Cedar City Youth Theater — logo, color system, poster template, and social media kit. I presented three concepts to their board, incorporated feedback across two revision rounds, and delivered a final package that launched with their first production. Over 200 attendees saw that brand on opening night."`,
    business:    `<strong>Business body paragraph:</strong> "Last semester I managed the social media presence for our school's bookstore as a marketing class project. I audited competitors, identified three content pillars, and built a 30-day posting calendar. By semester end, we grew from 87 to 412 followers and the store reported 18% more student foot traffic."`,
    healthcare:  `<strong>Healthcare body paragraph:</strong> "Over three months, I completed 48 volunteer hours at Dixie Regional Medical Center assisting with patient intake during peak hours. I greeted patients, helped with paperwork, and flagged urgent situations to nursing staff. My supervisor noted that communication in the waiting area improved noticeably during my shifts."`,
    engineering: `<strong>Engineering body paragraph:</strong> "As part of our FIRST Robotics team, I was responsible for the autonomous navigation system. Our initial PID loop consistently overshot turns, so I spent three weeks testing six different tuning configurations and ultimately added a gyroscope correction layer. We placed 2nd in the autonomous challenge at the state competition."`,
    trades:      `<strong>Trades body paragraph:</strong> "During my apprenticeship, I assisted a licensed journeyman on a full residential panel replacement in a 1970s home with outdated wiring. I ran conduit, labeled all circuits, and installed breakers under direct supervision. The installation passed all safety inspections on the first review with zero corrections required."`,
    education:   `<strong>Education body paragraph:</strong> "Last semester I tutored six middle school students referred by their teachers for failing grades in Algebra. I diagnosed each student's foundational gaps, built individualized four-week plans, and met with them weekly after school. By semester end, five of the six improved by at least one full letter grade."`,
    hospitality: `<strong>Hospitality body paragraph:</strong> "I served as lead student coordinator for our school's 200-guest year-end banquet — managing a $3,200 budget, four vendor contracts, and a team of eight volunteers. When catering arrived 25 minutes late, I reordered the program on the fly, kept the room calm, and the event ended on time. Post-event surveys showed 94% rated the experience 'excellent.'"`,
    general:     `<strong>General body paragraph:</strong> "In my part-time retail position, I processed 50+ customer transactions daily and maintained a perfect cash drawer accuracy record over three months. When we were short-staffed, I cross-trained in two departments within a week and covered shifts without being asked."`,
  },
  coverLetterClosing: {
    design:      `<strong>Design closing:</strong> "Please find my resume attached, which details my qualifications and includes a link to my portfolio. I would welcome the opportunity to discuss how my design process and creative background align with your team's work. Thank you for your time and consideration."`,
    business:    `<strong>Business closing:</strong> "Please find my resume attached. I would welcome the opportunity to discuss how my marketing experience and analytical mindset can contribute to your team's goals. Thank you for your consideration — I look forward to hearing from you."`,
    healthcare:  `<strong>Healthcare closing:</strong> "Please find my resume attached. I would be honored to join your team and contribute to the quality of care you provide. I'm available for an interview at your convenience and can provide references from my volunteer supervisor. Thank you for your time."`,
    engineering: `<strong>Engineering closing:</strong> "Please find my resume attached. I would welcome the chance to discuss how my technical skills and problem-solving mindset could contribute to your team. I'm happy to walk through any of my projects in more detail. Thank you for considering my application."`,
    trades:      `<strong>Trades closing:</strong> "Please find my resume attached. I'm eager to continue building my skills under experienced guidance and would be grateful for the opportunity to join your crew. I'm available to start immediately and can provide references from my apprenticeship supervisor. Thank you for your time."`,
    education:   `<strong>Education closing:</strong> "Please find my resume attached. I would be grateful for the opportunity to contribute to your students' growth. I'm available for an interview at any time and can provide references from my tutoring coordinator. Thank you for your consideration."`,
    hospitality: `<strong>Hospitality closing:</strong> "Please find my resume attached. I would love the opportunity to bring my coordination skills and guest-first mindset to your team. I look forward to the possibility of discussing how I can contribute to your events and guest experience. Thank you for your time."`,
    general:     `<strong>General closing:</strong> "Please find my resume attached. Thank you for taking the time to consider my application. I'm excited about the opportunity and would welcome the chance to speak with you. I'm available any day after 3pm on weekdays and all day on weekends."`,
  },
  interviewSTAR: {
    design:      `<strong>Design STAR — "Tell me about a challenge you faced":</strong><br><em>S:</em> "I was hired to design a logo for a local bakery, but the owner kept rejecting concepts without explaining why."<br><em>T:</em> "I needed to figure out what she actually wanted."<br><em>A:</em> "I scheduled a call, asked targeted questions, and brought three new directions based on her answers."<br><em>R:</em> "She chose one on the spot. It's now on her signage and packaging."`,
    business:    `<strong>Business STAR — "Describe a time you achieved a goal":</strong><br><em>S:</em> "Our school store's Instagram had 87 followers and almost no engagement."<br><em>T:</em> "I was tasked with growing it as a marketing project."<br><em>A:</em> "I researched competitors, built a content calendar, and posted consistently for 16 weeks."<br><em>R:</em> "We ended the semester with 412 followers and the store reported 18% more foot traffic."`,
    healthcare:  `<strong>Healthcare STAR — "Tell me about a time you stayed calm under pressure":</strong><br><em>S:</em> "Three patients arrived simultaneously during a busy intake shift with complex needs."<br><em>T:</em> "I needed to triage paperwork and communicate clearly without creating panic."<br><em>A:</em> "I worked through each patient calmly and made sure the nurse on duty was informed within minutes."<br><em>R:</em> "All three patients were seen quickly. My supervisor commented on how I handled it."`,
    engineering: `<strong>Engineering STAR — "Describe a technical problem you solved":</strong><br><em>S:</em> "Our robot's autonomous navigation kept overshooting turns."<br><em>T:</em> "I needed to fix the PID loop before state competition in three weeks."<br><em>A:</em> "I systematically tested six tuning configurations and added a gyroscope correction layer."<br><em>R:</em> "The robot placed 2nd in the autonomous challenge at state."`,
    trades:      `<strong>Trades STAR — "Tell me about catching a mistake before it became a problem":</strong><br><em>S:</em> "During a panel replacement, I noticed a circuit was mislabeled on the original diagram."<br><em>T:</em> "If wired to the label, we'd have connected live circuits to the wrong breakers."<br><em>A:</em> "I flagged it to the journeyman immediately; we traced every wire before proceeding."<br><em>R:</em> "The job passed inspection first try. The journeyman said that's what separates good apprentices."`,
    education:   `<strong>Education STAR — "Tell me about a student you helped succeed":</strong><br><em>S:</em> "One tutoring student had a failing grade and wouldn't attempt problems in front of me."<br><em>T:</em> "I needed to rebuild his confidence before addressing content gaps."<br><em>A:</em> "I started with problems he could solve, celebrated small wins, and never moved forward until he felt solid."<br><em>R:</em> "He ended the semester with a C+ and came back the next semester voluntarily."`,
    hospitality: `<strong>Hospitality STAR — "Tell me about something that went wrong at an event":</strong><br><em>S:</em> "Our catering vendor arrived 25 minutes late to our 200-person banquet."<br><em>T:</em> "I needed to keep the program moving without revealing the issue."<br><em>A:</em> "I reordered the run-of-show and moved speaker remarks earlier."<br><em>R:</em> "The event ended on time. 94% of guests rated the experience 'excellent.'"`,
    general:     `<strong>General STAR — "Tell me about a time you worked hard to meet a goal":</strong><br><em>S:</em> "I organized a neighborhood yard sale fundraiser for a local animal shelter."<br><em>T:</em> "My goal was to raise at least $200 and donate unsold items."<br><em>A:</em> "I made flyers, organized items by category, recruited 4 neighbors, and set up a Venmo."<br><em>R:</em> "We raised $340 in one Saturday and donated two truckloads of items."`,
  },
  interviewAnswers: {
    design:      `<strong>Design — "Why do you want this job?":</strong><br>✅ "I've been following your agency's work for two years — specifically the rebranding you did for [Client]. I want to work somewhere where design is taken seriously and where I'll be pushed to get better. I want to work on real client projects, not just exercises."<br><br>❌ Weak: "I like design and I think it would be a cool experience."`,
    business:    `<strong>Business — "What's your biggest strength?":</strong><br>✅ "I'm a strong analytical thinker who also understands the emotional side of marketing. In my social media project, I didn't just track follower count — I tracked which post types drove the most saves and used that to reshape the whole strategy."<br><br>❌ Weak: "I'm a hard worker and a team player."`,
    healthcare:  `<strong>Healthcare — "Why healthcare?":</strong><br>✅ "My grandmother was hospitalized for three months and I watched how much the quality of communication from the care team affected her experience. I want to be the person who makes patients feel seen, especially when everything feels uncertain."<br><br>❌ Weak: "I want to help people and I'm good with science."`,
    engineering: `<strong>Engineering — "Describe your problem-solving process":</strong><br>✅ "I start by making sure I actually understand the problem — not just the symptom. Then I form a hypothesis, test it in isolation, and document what I learn whether it works or not. The gyroscope fix on our robot took six failed configurations before I found the solution."<br><br>❌ Weak: "I just try different things until it works."`,
    trades:      `<strong>Trades — "Why do you want an apprenticeship with us?":</strong><br>✅ "You have a reputation for doing clean, code-compliant work and for actually investing in your apprentices. I want to earn my journeyman certification under people who hold high standards, because that's the only way to become someone who holds high standards themselves."<br><br>❌ Weak: "I need a job and I like working with my hands."`,
    education:   `<strong>Education — "How do you handle a student who refuses to engage?":</strong><br>✅ "I try not to take it personally — disengagement is usually communication. I find one thing they can do successfully, acknowledge it specifically, and build from there. With my most disengaged student, it took four sessions of rebuilding trust before we could work on Algebra."<br><br>❌ Weak: "I try to make it fun and hope they come around."`,
    hospitality: `<strong>Hospitality — "How do you handle a difficult guest?":</strong><br>✅ "I listen first without interrupting, because most people just want to feel heard. Then I apologize for their experience and fix what I can fix clearly and quickly. At our banquet, when one table wasn't set up correctly, I had it resolved in under three minutes."<br><br>❌ Weak: "I try to stay calm and be polite."`,
    general:     `<strong>General — "What makes you a good fit?":</strong><br>✅ "I show up, I pay attention, and I don't need to be asked twice. At my last job I cross-trained in two departments within a week because I asked to learn more. I don't have years of experience yet, but I have the attitude that makes experience accumulate fast."<br><br>❌ Weak: "I'm a hard worker and a fast learner."`,
  },
};

const FIELD_EXAMPLES_INTERVIEW_THANKYOU = {
  design:      `<strong>Design thank you:</strong><br>Subject: Thank You — Graphic Design Internship Interview<br><br>"Dear [Name], thank you for taking the time to meet with me about the design internship. I really enjoyed hearing about how your team approaches the brief-to-concept phase — it reinforced exactly why I want to work in a studio environment. I've attached one additional portfolio piece that felt relevant to the campaign work you mentioned."`,
  business:    `<strong>Business thank you:</strong><br>Subject: Thank You — Marketing Intern Interview<br><br>"Dear [Name], I really appreciated the conversation today about your Q3 campaign strategy. Learning how your team uses A/B testing made me even more motivated to contribute in a data-focused role. I'm confident my experience building content calendars and tracking engagement metrics would translate well to what you're working on."`,
  healthcare:  `<strong>Healthcare thank you:</strong><br>Subject: Thank You — CNA Position Interview<br><br>"Dear [Name], thank you for the opportunity to interview. I left the conversation with even more respect for the standard of care your team upholds. The emphasis on clear patient communication aligns exactly with what I experienced as a volunteer at Dixie Regional. I'm excited about the possibility of contributing to your team."`,
  engineering: `<strong>Engineering thank you:</strong><br>Subject: Thank You — Engineering Internship Interview<br><br>"Dear [Name], thank you for the thoughtful conversation. I especially appreciated when you described the debugging process your team uses — it closely mirrors how I approach problems. I'm attaching my GitHub profile in case it's helpful to see the code behind the robotics project we discussed."`,
  trades:      `<strong>Trades thank you:</strong><br>Subject: Thank You — Electrical Apprenticeship Interview<br><br>"Dear [Name], I want to thank you for your time and for the tour. I came away impressed by the standard of work your crew holds and even more motivated to earn a spot on your team. I'm ready to start immediately and committed to showing up every day."`,
  education:   `<strong>Education thank you:</strong><br>Subject: Thank You — Teacher's Aide Interview<br><br>"Dear [Name], thank you for the opportunity to speak with you. Hearing about your school's approach to differentiated instruction reinforced why I wanted to apply — that philosophy is exactly how I approached tutoring. I'm excited about the possibility of contributing to your students' growth."`,
  hospitality: `<strong>Hospitality thank you:</strong><br>Subject: Thank You — Event Coordinator Interview<br><br>"Dear [Name], thank you so much for speaking with me today. Learning about the scope of events your venue coordinates confirmed this is exactly the kind of fast-paced environment where I do my best work. I look forward to the possibility of bringing that same energy to your team."`,
  general:     `<strong>General thank you:</strong><br>Subject: Thank You — [Position] Interview<br><br>"Dear [Name], thank you for taking the time to meet with me. I left the conversation genuinely excited about the role and your team. I'm a fast learner, I show up ready to work, and I wouldn't take this opportunity for granted. I hope to hear from you soon."`,
};

const FIELD_EXAMPLES_COVER_OPENING = {
  design:      `<strong>Design opening:</strong> "I was thrilled to learn of the Graphic Design Internship at [Company] through [Source]. As an aspiring designer with experience in brand identity and digital illustration, I appreciate your studio's commitment to [specific quality]. I am confident that my skills in Adobe Illustrator, Figma, and client communication will allow me to contribute meaningfully to your team."`,
  business:    `<strong>Business opening:</strong> "I was excited to discover the Marketing Intern position at [Company] on [Source]. As a business student with hands-on experience in social media strategy and campaign analytics, I have followed your brand's approach to [specific area] and believe my background aligns well with what your team is building."`,
  healthcare:  `<strong>Healthcare opening:</strong> "I am honored to apply for the Patient Care Aide role at [Company]. As a healthcare student with 48 volunteer hours at Dixie Regional Medical Center and current CPR/AED certification, I am deeply committed to compassionate, detail-oriented patient care — and your organization's reputation for [specific quality] made this position stand out immediately."`,
  engineering: `<strong>Engineering opening:</strong> "I was thrilled to find the Engineering Internship listing at [Company] on [Source]. As an engineering student with experience in robotics, Python programming, and iterative hardware design, I am drawn to your team's focus on [specific area] and confident that my technical background and problem-solving mindset will allow me to contribute from day one."`,
  trades:      `<strong>Trades opening:</strong> "I am writing to apply for the Electrical Apprenticeship at [Company]. Having completed 120 hours of supervised residential electrical work and earned my OSHA 10 certification, I am eager to continue building my skills under the guidance of an experienced crew — and your company's reputation for code-compliant, quality work made this opportunity stand out."`,
  education:   `<strong>Education opening:</strong> "I am writing to express my interest in the Teacher's Aide position at [School], as advertised on [Source]. As an education student with firsthand experience tutoring six students in Algebra — five of whom improved by at least one letter grade — I am passionate about meeting students where they are and your school's commitment to differentiated instruction aligns directly with that belief."`,
  hospitality: `<strong>Hospitality opening:</strong> "I was excited to learn of the Event Coordinator role at [Company] through [Source]. As a hospitality student who recently served as lead coordinator for a 200-guest formal banquet — managing vendors, volunteers, and a live program schedule — I am drawn to your organization's reputation for [specific quality] and believe my experience translates directly to what you need."`,
  general:     `<strong>General opening:</strong> "I am writing to apply for the [Position] at [Company], as advertised on [Source]. As a motivated high school student with experience in customer service, cash handling, and team coordination, I am eager to bring my reliability and positive attitude to your team and grow in a professional environment."`,
};
