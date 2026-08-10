import type { MethodContent } from './types';

const moderatedUsabilityTesting: MethodContent = {
  slug: 'moderated-usability-testing',
  name: 'Moderated Usability Testing',
  shortName: 'Moderated UT',
  tagline: 'Watch real users attempt real tasks to identify where a design fails — and why.',
  status: 'prototype',

  axis: 'behavioral',
  scale: 'qualitative',
  context: 'moderated',
  phases: ['evaluative'],

  typicalParticipants: '5–8 participants',
  typicalSessionDuration: '60–75 minutes',
  typicalStudyTimeline: '2–3 weeks',

  landscape: { qualQuant: 0.28, attiBeha: 0.82 },

  overview: `Moderated usability testing places a real user in front of a product — a prototype, a staging environment, or a live site — and asks them to complete representative tasks while thinking aloud. A researcher observes, takes notes, and may ask clarifying questions, but does not instruct or assist the participant.

The goal is to identify usability problems: places where the design causes confusion, error, or abandonment. Think-aloud protocol is the standard technique: participants speak what they are thinking as they work through tasks, making visible the reasoning and expectations that drive their behavior.

Unlike interviews, which collect what people say, usability testing collects what people do. A participant may confidently explain that they always use the search bar — and then navigate by clicking through menus for four minutes before finding what they were looking for. Observed behavior is a more reliable signal than reported behavior.

Moderated testing is qualitative: a skilled researcher can follow unexpected behavior, probe at moments of confusion, and adjust the protocol mid-session. This depth is the method's advantage over unmoderated testing, where sessions run without a researcher present.`,

  whatItAnswers: [
    'Can users complete representative tasks with the current design?',
    'Where do users get confused, make errors, or abandon a task?',
    'What do users expect to happen at key decision points in the interface?',
    'Why do users fail at a specific step? (The "why" is accessible via think-aloud and probe questions.)',
    'Does the current design meet a defined usability benchmark?',
    'Which of two design variants produces fewer errors or faster task completion?',
  ],

  whenToUse: [
    'You have something to test: a clickable prototype, a staging build, or a live product.',
    'You need to identify usability problems before or after a release.',
    'Your team has disagreements about a design decision that a user test could resolve empirically.',
    'You need qualitative insight into why users fail, not just task completion rates.',
    'You are evaluating a specific user flow end-to-end.',
    'Stakeholders need evidence that a design change is worth pursuing.',
  ],

  whenNotToUse: [
    'You have nothing to test — not even a rough prototype. Use interviews or contextual inquiry to inform the design first.',
    'Your question is about attitudes, motivations, or mental models rather than task performance. Use interviews.',
    'You need statistically significant task completion rates across a large sample. Use unmoderated testing at scale.',
    'Your research question is about general product satisfaction or feature preferences. Use a survey.',
    'The task environment cannot be realistically recreated in a testing session — consider contextual inquiry instead.',
  ],

  sopSteps: [
    {
      id: 1,
      phase: 'prepare',
      title: 'Define tasks and success criteria',
      description: 'A usability test is only as good as its tasks. Tasks must be realistic (representing actual user goals), unambiguous (participants must understand what they are being asked to do), and non-leading (the task wording must not reveal the intended interaction path). Define what success looks like before the session.',
      checklist: [
        { text: 'Write 3–5 representative tasks based on actual user goals, not feature inventory' },
        { text: 'Write tasks as user goals, not instructions', note: 'e.g., "Find the return policy for a recent order" — not "Click Settings then Returns"' },
        { text: 'Define success criteria for each task: what does successful completion look like?' },
        { text: 'Identify the key metrics: task completion rate, time on task, error count, or usability benchmark score' },
        { text: 'Establish a scenario/context for the session to make tasks feel realistic' },
        { text: 'Time each task: most task-based sessions have 3–5 tasks that fit within a 45-minute testing window' },
      ],
      example: 'Scenario: "You ordered a jacket last Tuesday and want to return it because the size is wrong." Task: "Please return the jacket you ordered." This is realistic, goal-based, and does not hint at the path.',
      commonMistakes: [
        'Tasks that describe interface actions rather than user goals lead participants to perform the described action rather than navigate naturally',
        'Tasks with "correct" answers participants can infer from the wording — e.g., "Use the search bar to find..."',
        'Too many tasks for the session length — quality of observation degrades as the session overruns',
      ],
      expectedOutput: 'A test plan document with tasks, success criteria, and session structure — reviewed before recruitment begins.',
      templateRef: 'Test Plan',
    },
    {
      id: 2,
      phase: 'prepare',
      title: 'Set up the test environment',
      description: 'The test environment must let the researcher observe participant behavior without the environment itself becoming an obstacle. Whether the session is in-person or remote, the participant should be able to focus on the tasks without friction from the technology.',
      checklist: [
        { text: 'Confirm the prototype or product build is stable and accessible' },
        { text: 'Set up screen recording (with participant consent)' },
        { text: 'Configure audio and camera if video is needed' },
        { text: 'For in-person: set up observer room or remote observation link for stakeholders' },
        { text: 'For remote: test the screen-share and recording setup with a colleague before participant sessions' },
        { text: 'Create a fresh session state for each participant (reset accounts, clear browser history) so previous participants\' data doesn\'t contaminate' },
        { text: 'Prepare notetaking sheets with task prompts and timestamp columns' },
        { text: 'Run a full pilot session with a colleague to catch setup problems' },
      ],
      example: 'For a remote session: use a separate browser profile for the participant screen share, reset the prototype to its initial state, and test screen recording before each session.',
      commonMistakes: [
        'Discovering technical problems during the first participant session — always pilot',
        'Forgetting to reset session state between participants — a participant who sees another\'s data or a partially completed flow cannot complete the task naturally',
        'Recording without confirmed consent',
      ],
      expectedOutput: 'A fully tested session setup that can be consistently reproduced for each participant.',
      templateRef: 'Session Checklist',
    },
    {
      id: 3,
      phase: 'prepare',
      title: 'Recruit and screen participants',
      description: 'Usability testing participants should represent the actual target users of the product or feature being tested. A well-known NN/g heuristic recommends 5 participants for qualitative usability testing — this is a guideline for identifying the most significant usability problems in a single round, not a ceiling for all study designs.',
      checklist: [
        { text: 'Define screener criteria matching the target user population for this specific product or feature' },
        { text: 'Recruit 5–8 participants for a qualitative round; plan a second round if the first round produces major design changes' },
        { text: 'Include participants at the edges of your target range — both novice and experienced users often reveal different failure modes' },
        { text: 'Schedule participants with 15-minute breaks between sessions for the researcher' },
        { text: 'Send a participation consent form in advance, confirming recording permission' },
        { text: 'For complex or specialized products, confirm domain knowledge via a screener' },
      ],
      example: 'For a B2B invoice management tool: screener criteria include "manages invoice approval as part of their regular job", "approves at least 10 invoices per month", "not in a finance or accounting role" (specialists may not represent the typical approver).',
      commonMistakes: [
        'Recruiting existing heavy users who know the product — they typically skip the flows where new users fail',
        'Ignoring the 5-participant guideline in the wrong direction — running 3 participants and treating results as conclusive',
        'Treating 5 as a hard maximum when the study has multiple distinct user segments that need separate testing',
      ],
      expectedOutput: 'A confirmed schedule of 5–8 participants with screener criteria met, consent forms sent.',
      templateRef: 'Screener Survey Template',
    },
    {
      id: 4,
      phase: 'conduct',
      title: 'Facilitate the test session',
      description: 'The facilitator\'s role is to observe, not assist. When a participant struggles, the researcher\'s instinct is to help — resisting this instinct is the discipline of moderated testing. Intervention destroys the data. Think-aloud protocol is the primary tool: asking participants to verbalize what they are thinking as they work.',
      checklist: [
        { text: 'Open with a standard introduction: explain think-aloud, confirm consent, set expectations' },
        { text: 'Practice think-aloud with a warm-up task unrelated to the product (e.g., "Show me how you\'d find a local restaurant online") before the test tasks begin' },
        { text: 'Present tasks one at a time on a card or screen — do not read all tasks at the start' },
        { text: 'Prompt for think-aloud when the participant goes quiet: "What are you thinking right now?"' },
        { text: 'Do not hint, point, or explain — observe what the participant does without intervention' },
        { text: 'Note timestamp, task, and behavior for every significant event' },
        { text: 'Mark task completion (with or without assistance) and time-on-task for each task' },
        { text: 'Ask post-task questions to probe observed behavior: "I noticed you paused there — what were you looking for?"' },
        { text: 'Close with a brief post-session questionnaire (e.g., SUS or a 3-question satisfaction survey)' },
      ],
      example: 'Participant pauses for 45 seconds on the checkout page, moves cursor to the navigation bar, then returns to the page. Researcher does not intervene. After the task, asks: "I noticed you moved toward the top navigation — can you tell me what you were thinking at that point?" This surfaces the participant\'s mental model without leading them during the task.',
      commonMistakes: [
        'Intervening when a participant is stuck — even nodding or leaning forward signals approval',
        'Asking questions mid-task that interrupt the flow — save them for post-task',
        'Not prompting for think-aloud — silent sessions are hard to analyze',
        'Skipping the warm-up task — participants unfamiliar with think-aloud produce shallow verbalization',
      ],
      expectedOutput: 'Session recordings and completed notetaking sheets for each participant, with task outcomes and timestamps.',
      templateRef: 'Notetaking Template',
    },
    {
      id: 5,
      phase: 'analyze',
      title: 'Identify and classify usability problems',
      description: 'Usability testing analysis involves reviewing session recordings and notes to identify moments of failure, confusion, or inefficiency — and classifying them by severity. A structured severity rating focuses the team\'s attention on problems that most affect users.',
      checklist: [
        { text: 'Review notes and recordings session by session' },
        { text: 'Create a problem log: one row per observed problem, with participant ID, task, description, and a quote or behavior description' },
        { text: 'Assign a severity rating to each problem', note: 'A simple 3-level scale works: Critical (blocks task completion), Moderate (causes delay or frustration but recoverable), Minor (causes hesitation but users self-correct quickly)' },
        { text: 'Note the frequency of each problem across participants' },
        { text: 'Identify the underlying cause for each problem (e.g., unexpected terminology, hidden affordance, workflow mismatch)' },
        { text: 'Consolidate duplicate problems: the same error in multiple sessions is one problem, with higher frequency' },
      ],
      expectedOutput: 'A usability problem log with severity ratings, frequency counts, and root cause notes.',
      commonMistakes: [
        'Treating frequency as the only severity signal — a problem that blocks one participant is critical regardless of frequency',
        'Cataloguing every minor hesitation rather than focusing on problems that affect task completion',
        'Not linking problems to specific observable evidence — "users found it confusing" without a timestamp or quote is not actionable',
      ],
    },
    {
      id: 6,
      phase: 'synthesize',
      title: 'Synthesize recommendations',
      description: 'Usability findings become useful when they are translated into design recommendations. A recommendation is not "fix the confusion on step 3" — it is a specific, testable direction for the design team.',
      checklist: [
        { text: 'For each critical and moderate problem, write a specific recommendation', note: 'e.g., "Replace \'Submit\' with \'Place Order\' on the checkout CTA — 4 of 5 participants were uncertain whether their order would be placed immediately or reviewed first"' },
        { text: 'Prioritize recommendations by severity and likely implementation effort' },
        { text: 'Distinguish findings (what users did) from interpretations (why) from recommendations (what to try)' },
        { text: 'Flag findings that require a second round of testing to validate a proposed solution' },
        { text: 'Summarize quantitative signals: task completion rate and time-on-task by task' },
      ],
      expectedOutput: 'A prioritized list of recommendations with evidence-backed rationale for each.',
      commonMistakes: [
        'Recommending specific UI solutions when the problem is a deeper conceptual or workflow issue',
        'Treating all problems as equal — a prioritized list is actionable; a flat list is not',
      ],
    },
    {
      id: 7,
      phase: 'share',
      title: 'Share findings and plan next steps',
      description: 'Usability test findings are most valuable when shared quickly while the product team still has design decisions open. A live readout with team members watching session highlights is often more effective than a written report.',
      checklist: [
        { text: 'Compile a highlight reel of 3–5 key moments from recordings (with participant consent for internal sharing)' },
        { text: 'Present findings organized by severity, not by task order' },
        { text: 'Lead with the top 3 critical findings before presenting the full problem log' },
        { text: 'Agree on next steps in the session: who is responsible for which recommendation? By when?' },
        { text: 'Archive all session recordings, notes, and the problem log in the research repository' },
        { text: 'Document which problems were not addressed and why — this is institutional memory for future rounds' },
      ],
      expectedOutput: 'A findings presentation or summary shared with the product team; agreed next steps and responsible owners recorded.',
      templateRef: 'Findings Report Template',
    },
  ],

  analysisApproach: `Usability test analysis is more structured than interview analysis. The primary output is a usability problem log: a systematic record of each failure, confusion, or error observed across participants, with severity ratings and frequency counts.

Severity rating is the key analytical judgment: a critical problem (blocks task completion) requires immediate attention regardless of how many participants experienced it. A minor problem (brief hesitation, self-corrected) may be deferred or deprioritized.

Quantitative signals from the session — task completion rates, time-on-task, error counts — are useful for benchmarking and trend analysis across rounds of testing. With 5–8 participants, these numbers are indicative, not statistically significant.`,

  synthesisApproach: `Synthesis translates the problem log into design recommendations. Each recommendation should be specific and testable: "Replace X with Y because participants expected Z" is a recommendation; "improve clarity" is not.

Where possible, classify the cause of usability problems — wrong affordances, misleading labels, workflow mismatches, hidden features, error recovery failure — to allow for broader design principles to be extracted alongside specific fixes. A pattern of problems with terminology, for example, may point to a broader content strategy intervention rather than individual label changes.`,

  typicalOutputs: [
    'Usability problem log with severity ratings and frequency counts (primary deliverable)',
    'Prioritized recommendations with evidence-based rationale',
    'Session highlight reel (3–5 critical moments, for stakeholder presentations)',
    'Task completion rates and time-on-task summary table',
    'Post-session questionnaire results (SUS or equivalent)',
    'Archived session recordings and notes',
  ],

  templates: [
    {
      name: 'Test Plan',
      description: 'Document defining study goals, tasks, success criteria, session structure, and participant criteria.',
      format: 'Google Doc',
      url: null,
    },
    {
      name: 'Screener Survey Template',
      description: 'Short screening survey to qualify participants against target user criteria.',
      format: 'Google Form / Typeform',
      url: null,
    },
    {
      name: 'Session Checklist',
      description: 'Pre-session setup checklist covering environment, recording, and consent verification.',
      format: 'Google Doc',
      url: null,
    },
    {
      name: 'Notetaking Template',
      description: 'Structured note sheet with task prompts, timestamp columns, and observation fields.',
      format: 'Google Doc',
      url: null,
    },
    {
      name: 'Usability Problem Log',
      description: 'Spreadsheet template for recording problems with severity, frequency, cause, and recommendation columns.',
      format: 'Google Sheets',
      url: null,
    },
    {
      name: 'Consent Form',
      description: 'Participant consent for recording and internal sharing of session data. Requires legal review before use.',
      format: 'PDF',
      url: null,
    },
  ],

  relatedMethods: [
    {
      slug: 'user-interviews',
      name: 'User Interviews',
      relationship: 'precedes',
      reason: 'Interviews in discovery establish the user mental models and goals that inform task design for a usability test.',
    },
    {
      slug: 'contextual-inquiry',
      name: 'Contextual Inquiry',
      relationship: 'alternative',
      reason: 'Contextual inquiry observes users in their natural environment; use it when the testing environment cannot adequately represent real conditions, or when the workflow spans multiple tools and contexts.',
    },
    {
      slug: 'tree-testing',
      name: 'Tree Testing',
      relationship: 'complementary',
      reason: 'If usability test findings point to navigation structure problems, tree testing provides a faster, lower-fidelity way to evaluate alternative IA structures at scale.',
    },
  ],

  sources: [
    {
      id: 'nielsen-2000',
      author: 'Nielsen, J.',
      title: 'Why You Only Need to Test with 5 Users',
      publisher: 'Nielsen Norman Group',
      year: '2000',
      url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/',
      usedFor: 'The 5-participant guideline for qualitative usability testing, and the rationale for iterative rounds of testing.',
      note: 'Synthesized from training data. The "85% of problems with 5 users" finding applies specifically to a single user population and single round of testing.',
    },
    {
      id: 'nng-guide',
      author: 'Moran, K. (Nielsen Norman Group)',
      title: 'A Guide to UX Research Methods',
      publisher: 'Nielsen Norman Group',
      year: '2019',
      url: 'https://www.nngroup.com/articles/guide-ux-research-methods/',
      usedFor: 'Classification of moderated usability testing as behavioral, qualitative, and scripted context of use in the 3-dimensional framework.',
      note: 'Synthesized from training data.',
    },
    {
      id: 'rubin-chisnell-2008',
      author: 'Rubin, J. & Chisnell, D.',
      title: 'Handbook of Usability Testing (2nd ed.)',
      publisher: 'Wiley',
      year: '2008',
      usedFor: 'Task writing principles, think-aloud protocol, severity rating approach, and the distinction between facilitator intervention and observation.',
      note: 'Primary reference for usability testing methodology. Training data synthesis.',
    },
    {
      id: 'practitioner',
      author: 'Practitioner knowledge',
      title: 'Practitioner knowledge',
      usedFor: 'SOP step structure, setup checklist items, and session facilitation details.',
    },
  ],
};

export default moderatedUsabilityTesting;
