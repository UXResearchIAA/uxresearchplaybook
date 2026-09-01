import type { MethodContent } from './types';

const userInterviews: MethodContent = {
  slug: 'user-interviews',
  name: 'User Interviews',
  shortName: 'Interviews',
  tagline: 'Understand the motivations, mental models, and attitudes behind user behavior.',
  status: 'prototype',

  axis: 'attitudinal',
  scale: 'qualitative',
  context: 'moderated',
  phases: ['discovery', 'exploratory'],

  typicalParticipants: '6–12 participants',
  typicalSessionDuration: '45–75 minutes',
  typicalStudyTimeline: '2–4 weeks',

  landscape: { qualQuant: 0.1, attiBeha: 0.1 },

  overview: `A user interview is a structured or semi-structured conversation between a researcher and participant designed to uncover attitudes, motivations, mental models, and lived experiences. Unlike observation, interviews focus on what people say about their experiences rather than what they actually do. They are most appropriate when the research question centers on what people think and feel, while behavioral methods such as contextual inquiry or usability testing are better for understanding actions. Interviews are flexible and can produce rich, contextual insights by allowing researchers to probe unexpected topics and explore responses in depth. However, they are resource-intensive and produce qualitative findings that are not statistically generalizable.`,

  whatItAnswers: [
    'Why do users approach a task or decision the way they do?',
    'What mental models or expectations are users bringing to a product or domain?',
    'What needs, frustrations, or goals are users trying to satisfy?',
    'How do users describe their experience in their own language?',
    'What context or constraints are shaping user behavior?',
    'What are users\' attitudes toward a product, feature, or concept?',
  ],

  whenToUse: [
    'You need to understand motivations, attitudes, or mental models — not just behaviors.',
    'You are in a discovery or exploratory phase and need to define the problem before designing a solution.',
    'You need rich, contextual data that can be quoted and illustrated.',
    'The research question requires follow-up probing and cannot be fully answered by a predefined survey.',
    'You are exploring a domain that is new to the team and need to build empathy with users.',
    'You want to understand how users think about a category or topic — not just how they use a specific product.',
  ],

  whenNotToUse: [
    'Your research question is behavioral — what users actually do, rather than what they say they do. Use contextual inquiry or usability testing instead.',
    'You need statistically significant findings across a large sample. Use a survey or analytics.',
    'Your question can be answered by a simpler, faster method (a 5-question survey, analytics data already available).',
    'Your timeline is under one week. Recruiting and scheduling interviews takes time.',
    'Participants are unlikely to accurately recall or reflect on the behavior you\'re asking about. Self-reported behavior is often unreliable for frequent, habitual actions.',
  ],

  sopSteps: [
    // ── Prepare ──────────────────────────────────────────────────────────────
    {
      id: 1,
      phase: 'prepare',
      title: 'Define research objectives',
      description: 'Before writing a single question, get the research objective in writing. An objective is not "understand users" — it is a specific claim you are trying to confirm, deny, or develop. The objective determines who to recruit, what to ask, and what a useful finding looks like.',
      checklist: [
        { text: 'Write a primary research question in one sentence', note: 'e.g., "Why do users abandon the onboarding flow at the account-linking step?"' },
        { text: 'Write 2–3 secondary research questions that support the primary' },
        { text: 'Identify what you already know (to avoid re-discovering it)' },
        { text: 'Get stakeholder sign-off on the research questions before proceeding' },
        { text: 'Confirm that attitudinal/qualitative data is the right type for these questions' },
      ],
      example: 'Primary question: "What makes it difficult for first-time users to understand what the product does?" Secondary questions: "What prior products or experiences are users comparing us to?", "What language do users use to describe the problem we solve?"',
      commonMistakes: [
        'Writing objectives as activities ("conduct interviews about onboarding") rather than questions to be answered',
        'Setting objectives so broad they can never be answered in one study',
        'Skipping stakeholder alignment — leading to findings that answer the wrong question',
      ],
      expectedOutput: 'A written research brief (1–2 pages) with confirmed primary and secondary questions, agreed with stakeholders.',
      templateRef: 'Research Brief',
    },
    {
      id: 2,
      phase: 'prepare',
      title: 'Write a discussion guide',
      description: 'A discussion guide is a structured set of topics and questions — not a rigid script. It ensures coverage of all research objectives while leaving room for the interviewer to probe unexpected directions. Interview questions should be open-ended, non-leading, and focused on drawing out stories and examples rather than opinions.',
      checklist: [
        { text: 'Write a warm-up section: easy, relationship-building questions about the participant\'s role and context' },
        { text: 'Write topic areas that map to each secondary research question' },
        { text: 'Under each topic, write 2–4 open-ended questions' },
        { text: 'Add probe prompts: "Can you tell me more about that?", "What happened next?", "Can you give me an example?"' },
        { text: 'Include a closing section: "Is there anything you expected me to ask but didn\'t?"' },
        { text: 'Time the guide: aim for 80% of the session time, leaving room for unexpected depth' },
        { text: 'Pilot the guide with a colleague before the first real session' },
      ],
      example: 'Topic: mental models of the product category. Questions: "Before you started using [product], how did you handle [problem]?", "When you first opened the app, what were you expecting to find?", "How would you describe what [product] does to a friend who\'d never heard of it?"',
      commonMistakes: [
        'Writing leading questions: "Don\'t you find it frustrating when...?" invites agreement',
        'Asking hypothetical questions: "Would you use a feature that...?" predicts nothing about actual behavior',
        'Overpacking the guide — 60 minutes does not fit 60 questions',
        'Including closed (yes/no) questions as primary questions rather than as qualifiers',
      ],
      expectedOutput: 'A discussion guide document (2–4 pages), reviewed and approved before recruiting begins.',
      templateRef: 'Discussion Guide',
    },
    {
      id: 3,
      phase: 'prepare',
      title: 'Recruit and screen participants',
      description: 'Participant recruitment is a critical quality gate. The wrong participants produce findings that cannot be applied to the actual user population — no matter how well the interviews are conducted. Define criteria precisely, then screen against them.',
      checklist: [
        { text: 'Define 3–5 screener criteria based on the target population', note: 'e.g., uses the product weekly; primary buyer, not IT administrator; has completed onboarding in the last 30 days' },
        { text: 'Write a screener survey of 5–8 questions' },
        { text: 'Include at least one disqualifying question to filter out unsuitable participants' },
        { text: 'Recruit for diversity across relevant dimensions (experience level, context of use, job function)' },
        { text: 'Aim for 6–8 participants for a single research question; add segments if you have multiple distinct user types' },
        { text: 'Schedule 15-minute buffers between sessions' },
        { text: 'Prepare and send a consent form before the session date' },
        { text: 'Send a session reminder 24 hours in advance with logistics details' },
      ],
      example: 'Screener criterion: "Uses the product at least once per week" — not "uses the product regularly." Vague criteria produce vague samples.',
      commonMistakes: [
        'Using convenience samples (colleagues, friends) that don\'t represent the real population',
        'Recruiting too many participants in a single session block, risking researcher fatigue in analysis',
        'Skipping the consent step — especially important for sessions that will be recorded',
        'No-shows are common: over-recruit by 20% or schedule backup participants',
      ],
      expectedOutput: 'A confirmed participant list with screener responses, scheduled sessions, and sent consent forms.',
      templateRef: 'Screener Survey Template',
    },

    // ── Conduct ──────────────────────────────────────────────────────────────
    {
      id: 4,
      phase: 'conduct',
      title: 'Conduct the interview',
      description: 'The interview is a skilled activity. The researcher\'s primary job is to listen — not to explain, justify, or react to what participants say. Silence is productive: let participants finish their thought before asking the next question. Refer to your discussion guide, but follow the conversation when it goes somewhere interesting.',
      checklist: [
        { text: 'Set up recording with participant consent before beginning' },
        { text: 'Introduce yourself, explain the purpose (you\'re testing the product/situation, not the participant), and set expectations for time' },
        { text: 'Complete the warm-up section to build rapport' },
        { text: 'Use the discussion guide as a map, not a script — follow the participant\'s lead' },
        { text: 'Probe for specifics and concrete examples rather than accepting generalities', note: '"Tell me about a time when..." vs. "Do you ever...?"' },
        { text: 'Take timestamped notes on key moments, direct quotes, and surprising turns' },
        { text: 'Close with the "anything else" question and a genuine thank you' },
        { text: 'Write a brief session memo within 30 minutes of each interview while memory is fresh' },
      ],
      example: '"You mentioned it was confusing — can you walk me through exactly what happened? What did you expect to see at that point?" This probes a generality ("confusing") for specific, actionable detail.',
      commonMistakes: [
        'Explaining or defending the product when a participant criticizes it',
        'Asking two questions at once — participants answer the easier one and the harder question goes unasked',
        'Accepting "I usually..." without probing for a specific example — generalizations are often inaccurate',
        'Rushing past silence instead of waiting for the participant to continue',
        'Neglecting the session memo — raw recordings are hard to analyze without your in-the-room impressions',
      ],
      expectedOutput: 'A completed session recording (audio/video) and contemporaneous notes for each participant.',
      templateRef: 'Notetaking Template',
    },
    {
      id: 5,
      phase: 'conduct',
      title: 'Debrief after each interview',
      description: 'After each session, take 10–15 minutes to debrief — alone or with your note-taker. Debriefs capture immediate impressions before they fade and help you track patterns across sessions in real time. This discipline makes analysis faster and reduces the risk of missing themes that only become visible across sessions.',
      checklist: [
        { text: 'Write a session memo (3–5 bullet points) covering the most memorable moments, direct quotes, and surprises' },
        { text: 'Note which discussion guide areas worked well and which needed adjustment' },
        { text: 'Flag any recurring themes you have now heard across multiple sessions' },
        { text: 'If working with a note-taker, compare impressions before moving on' },
        { text: 'Update the discussion guide if a question consistently confuses participants or fails to generate useful responses' },
      ],
      example: 'Session memo bullet: "P3 described using a workaround involving email — third participant to mention this. Likely a significant finding. Add a follow-up question for remaining sessions."',
      commonMistakes: [
        'Skipping the debrief when time is short — the memo takes 10 minutes and is worth it',
        'Writing debriefs days later when the session is no longer fresh',
        'Treating the debrief as a final analysis step rather than a real-time pattern check',
      ],
      expectedOutput: 'A session memo for each interview (1 page or less) capturing immediate impressions and notable quotes.',
    },

    // ── Analyze & Reflect ─────────────────────────────────────────────────────
    {
      id: 6,
      phase: 'analyze',
      title: 'Process and code the data',
      description: 'Qualitative analysis requires converting raw recordings and notes into structured, searchable data. Work through each session systematically — extract discrete observations and quotes, then apply codes based on meaning, not question structure.',
      checklist: [
        { text: 'Transcribe or review recordings for each session' },
        { text: 'Extract discrete observations and direct quotes as individual notes or cards' },
        { text: 'Include participant ID and timestamp on each observation' },
        { text: 'Apply codes based on what each observation means, not which question produced it' },
        { text: 'Note frequency (how many participants mentioned this) but weight salience over volume' },
        { text: 'Flag observations that contradict stakeholder assumptions — these are often the most valuable' },
      ],
      expectedOutput: 'A coded set of raw observations with participant IDs, ready for grouping.',
      commonMistakes: [
        'Grouping observations by question structure (answers to Q3) rather than by emergent meaning',
        'Treating the most vocal participant as representative of all',
        'Confirming hypotheses you already had instead of looking for disconfirming evidence',
      ],
    },
    {
      id: 7,
      phase: 'analyze',
      title: 'Conduct affinity diagramming',
      description: 'Affinity diagramming is a bottom-up method for organizing coded observations into emergent themes. Rather than sorting data into categories defined in advance, you group individual observations until patterns become visible. This works best as a team activity.',
      checklist: [
        { text: 'Write each discrete observation as a single note — one idea per note' },
        { text: 'Include participant ID on each note so you can trace themes back to sources' },
        { text: 'Sort notes into groups without naming them yet — let structure emerge from the data' },
        { text: 'Name each group to describe the pattern it represents, not just the topic it covers' },
        { text: 'Collapse and reorganize as needed until the number of groups feels right (typically 5–12)' },
        { text: 'Photograph or digitize the final diagram before disassembling' },
      ],
      example: 'Group name: "Users don\'t know the product can do X" — not just "Feature awareness." The name should express the finding, not the category.',
      commonMistakes: [
        'Naming groups before sorting — this anchors the grouping to assumptions rather than the data',
        'Creating too many groups (more than 15) — collapse until themes are meaningful and distinct',
        'Working alone when a team is available — multiple perspectives reduce confirmation bias',
      ],
      expectedOutput: 'An affinity diagram with labeled theme clusters, each linked to specific participant observations.',
    },
    {
      id: 8,
      phase: 'analyze',
      title: 'Synthesize findings',
      description: 'Synthesis is where analysis becomes insight. A finding is not a summary of what participants said — it is a claim about what their responses mean for the design or product. Good findings are actionable and specific.',
      checklist: [
        { text: 'Write a finding for each major theme: "Users [do/believe/experience] X because Y"' },
        { text: 'Support each finding with 2–3 direct quotes and behavioral evidence where available' },
        { text: 'Assign a confidence level: how many participants? Is it corroborated by multiple sources?' },
        { text: 'Write implications: "This suggests the team should consider..."' },
        { text: 'Identify what you still don\'t know — what new questions did this study raise?' },
        { text: 'Review findings against original research questions: did you answer them?' },
      ],
      expectedOutput: 'A set of written findings (3–8 is typical for a 6–10 participant study) with supporting evidence and implications.',
      commonMistakes: [
        'Writing findings as observations ("participants mentioned X") rather than insights ("users avoid X because they believe Y")',
        'Overgeneralizing from a small sample — qualified language ("most participants", "some users") is honest and appropriate',
      ],
    },
    {
      id: 9,
      phase: 'analyze',
      title: 'Create personas if applicable',
      description: 'Personas synthesize interview findings into representative character profiles — a tool for keeping the user\'s perspective visible in design decisions. Create personas only when the data reveals meaningfully distinct user types. Not all interview studies warrant them.',
      checklist: [
        { text: 'Review findings for patterns that cluster across participants in distinct, meaningful ways' },
        { text: 'Define each persona by behavior, goal, and context — not demographics alone' },
        { text: 'Write a brief narrative for each persona grounded in specific participant evidence' },
        { text: 'Limit to 2–4 personas — more than four is typically too many to hold in mind during design' },
        { text: 'Validate persona attributes against your coded data before distributing' },
      ],
      example: 'A persona defined by: "Manages 3–5 contractors; plans projects weekly; frustrated by status updates arriving out of context" — grounded in behavior and goal, not age or job title.',
      commonMistakes: [
        'Creating personas when the data does not reveal distinct user types — a single persona is better than three forced ones',
        'Basing personas on demographics rather than behavioral patterns',
        'Treating personas as fixed rather than updating them when new research contradicts them',
      ],
      expectedOutput: '1–4 persona documents, each grounded in specific participant evidence from the study.',
    },
    {
      id: 10,
      phase: 'analyze',
      title: 'Conduct a research process retrospective',
      description: 'Before moving to sharing, review how the research process itself performed. A short retrospective surfaces what worked, what to improve, and whether the findings answered the original research questions.',
      checklist: [
        { text: 'Review the original research questions: did the study answer them? If not, why not?' },
        { text: 'Assess the discussion guide: which questions generated the most useful responses?' },
        { text: 'Assess recruitment: did the sample represent the target population?' },
        { text: 'Note what you would do differently on the next study' },
        { text: 'Write a brief process note for colleagues who may run similar studies' },
      ],
      expectedOutput: 'A short retrospective note (1 page) covering what worked, what to improve, and any open research questions the study raised.',
    },
    {
      id: 11,
      phase: 'analyze',
      title: 'Document lessons learned',
      description: 'Lessons learned are observations about the research practice itself — not about the users. Documenting them creates institutional knowledge for the research team and improves the quality of future studies.',
      checklist: [
        { text: 'Document any unexpected challenges in recruitment, scheduling, or consent' },
        { text: 'Note any techniques or question framings that worked particularly well' },
        { text: 'Document any data quality issues (poor audio, off-topic responses) and how you handled them' },
        { text: 'Add lessons to the team\'s shared research operations documentation' },
      ],
      expectedOutput: 'Lessons documented in the team\'s research operations notes or SharePoint site.',
    },

    // ── Share & Archive ───────────────────────────────────────────────────────
    {
      id: 12,
      phase: 'share',
      title: 'Share findings with stakeholders',
      description: 'Research findings only have impact when they reach decision-makers in a form they can act on. Tailor the output to the audience and the decision being made. A research report that no one reads has no value.',
      checklist: [
        { text: 'Identify the primary audience and the decision the findings need to support' },
        { text: 'Choose the right format: slide deck for stakeholder presentation; written report for archival; 1-pager for quick reference' },
        { text: 'Lead with findings and implications — not with methodology' },
        { text: 'Include at least one direct participant quote per finding' },
        { text: 'Schedule a readout session rather than emailing a report and hoping it gets read' },
        { text: 'Add findings to the team\'s research repository with relevant tags' },
      ],
      expectedOutput: 'A findings presentation or document shared with relevant stakeholders; archived materials added to the research repository.',
      templateRef: 'Findings Report Template',
      commonMistakes: [
        'Leading with methodology instead of findings — stakeholders want to know what you learned, not how you learned it',
        'Sending a report without scheduling a readout — reports without a conversation are rarely acted on',
      ],
    },
    {
      id: 13,
      phase: 'share',
      title: 'Store research artifacts and data in SharePoint',
      description: 'Raw research data — recordings, transcripts, notes, and consent forms — must be stored in the team\'s designated SharePoint location. Proper archiving enables future meta-analysis and meets data governance requirements.',
      checklist: [
        { text: 'Upload session recordings to the designated SharePoint folder with appropriate access controls' },
        { text: 'Upload transcripts and notes with participant IDs (not names) in file names' },
        { text: 'Store consent forms separately in the secure consent folder' },
        { text: 'Add the study to the research project registry with relevant metadata (date, method, participant count, research questions)' },
        { text: 'Confirm access is restricted to team members with a need to view participant data' },
      ],
      expectedOutput: 'All study artifacts stored in SharePoint with appropriate naming conventions and access controls.',
      commonMistakes: [
        'Using participant names in file names — always use participant IDs',
        'Storing recordings locally rather than in SharePoint — local storage is not backed up or access-controlled',
        'Skipping the project registry entry — this makes the study invisible to future meta-analysis',
      ],
    },
    {
      id: 14,
      phase: 'share',
      title: 'Wrap up and close the research project',
      description: 'Close out the project formally to keep the team\'s research log current and ensure any follow-up work is tracked. A clean close also confirms that all deliverables are in their final location.',
      checklist: [
        { text: 'Mark the research project as complete in the team\'s project tracker' },
        { text: 'Link all deliverables (findings report, personas, affinity diagram) to the project record' },
        { text: 'Send a brief summary to stakeholders confirming the project is closed and where findings live' },
        { text: 'Note any follow-up research questions for the next research cycle' },
      ],
      expectedOutput: 'Project marked closed in the tracker; stakeholders notified of final deliverables location.',
    },
  ],

  analysisApproach: `Qualitative interview data is typically analyzed using affinity diagramming (bottom-up grouping of observations into themes) or thematic coding (applying codes to segments of transcript text). Both approaches work; affinity diagramming is more team-friendly and visual; thematic coding produces a more structured audit trail.

The key discipline in qualitative analysis is treating each participant's response as an individual data point — not averaging across participants the way quantitative data is averaged. A theme that appeared in 4 of 8 interviews is significant even if it was mentioned only once each time. A response mentioned 10 times by one participant is not the same as a theme shared across participants.`,

  synthesisApproach: `Synthesis converts coded themes into actionable insights. The standard format is: "Users [do/believe/experience X] because [Y]" — a claim about the user's perspective that is supported by evidence from the data. See the Synthesize findings step in the Analyze & Reflect phase for the full checklist.`,

  typicalOutputs: [
    'Findings report or slide deck (primary deliverable)',
    'Direct quotes bank (verbatim participant quotes, anonymized)',
    'Affinity diagram or theme map',
    'Persona or mental model diagram (if warranted by the data)',
    'Research questions raised by the study (for future work)',
    'Archived recordings and transcripts (appropriately consented and anonymized)',
  ],

  templates: [
    {
      name: 'Research Brief',
      description: 'One-page document aligning the team on research questions, rationale, and success criteria before work begins.',
      format: 'Google Doc',
      url: null,
    },
    {
      name: 'Discussion Guide',
      description: 'Semi-structured interview guide with warm-up, topic areas, open-ended questions, and probe prompts.',
      format: 'Google Doc',
      url: null,
    },
    {
      name: 'Participant Screener',
      description: 'Short survey to qualify or disqualify potential participants against recruitment criteria.',
      format: 'Google Form / Typeform',
      url: null,
    },
    {
      name: 'Consent Form',
      description: 'Participant consent for recording and use of session data. Includes GDPR-aligned language. Requires legal review before use.',
      format: 'PDF',
      url: null,
    },
    {
      name: 'Notetaking Template',
      description: 'Structured note sheet for capturing key observations, quotes, and body language during a session.',
      format: 'Google Doc',
      url: null,
    },
  ],

  relatedMethods: [
    {
      slug: 'contextual-inquiry',
      name: 'Contextual Inquiry',
      relationship: 'complementary',
      reason: 'Contextual inquiry adds behavioral observation to the attitudinal data from interviews, closing the gap between what users say and what they do.',
    },
    {
      slug: 'moderated-usability-testing',
      name: 'Moderated Usability Testing',
      relationship: 'follows',
      reason: 'Interviews in discovery often inform the hypotheses and task designs for a subsequent usability test.',
    },
    {
      slug: 'surveys',
      name: 'Surveys',
      relationship: 'complementary',
      reason: 'After interviews establish which dimensions matter, a survey can quantify their distribution across a larger population.',
    },
  ],

  sources: [
    {
      id: 'nng-guide',
      author: 'Moran, K. (Nielsen Norman Group)',
      title: 'A Guide to UX Research Methods',
      publisher: 'Nielsen Norman Group',
      year: '2019',
      url: 'https://www.nngroup.com/articles/guide-ux-research-methods/',
      usedFor: 'The 3-dimensional method classification framework (attitudinal/behavioral, qualitative/quantitative, context of use) that informs the taxonomy and landscape positioning.',
      note: 'Synthesized from training data. URL confirmed valid at time of IA authorship; content unverified against current article text.',
    },
    {
      id: 'nng-when',
      author: 'Pernice, K. (Nielsen Norman Group)',
      title: 'When to Use Which UX Research Methods',
      publisher: 'Nielsen Norman Group',
      year: '2018',
      url: 'https://www.nngroup.com/articles/which-ux-research-methods/',
      usedFor: 'Activity-type framing (Discover, Explore, Test, Listen) and guidance on selecting between attitudinal and behavioral methods.',
      note: 'Synthesized from training data. URL confirmed valid at time of IA authorship; content unverified against current article text.',
    },
    {
      id: 'portigal-2013',
      author: 'Portigal, S.',
      title: 'Interviewing Users: How to Uncover Compelling Insights',
      publisher: 'Rosenfeld Media',
      year: '2013',
      usedFor: 'Discussion guide structure, probing techniques, common mistakes in interviewer behavior, and the session memo practice.',
      note: 'Primary authoritative source for interview technique. Training data synthesis.',
    },
    {
      id: 'practitioner',
      author: 'Practitioner knowledge',
      title: 'Practitioner knowledge',
      usedFor: 'SOP step structure, checklist items, and output descriptions draw on general practitioner experience where no single published source applies.',
    },
  ],
};

export default userInterviews;
