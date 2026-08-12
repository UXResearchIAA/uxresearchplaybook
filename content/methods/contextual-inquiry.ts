import type { MethodContent } from './types';

const contextualInquiry: MethodContent = {
  slug: 'contextual-inquiry',
  name: 'Contextual Inquiry',
  shortName: 'Contextual Inquiry',
  tagline: 'Observe and interview users in their own environment to understand actual work practices.',
  status: 'prototype',

  axis: 'behavioral',
  scale: 'qualitative',
  context: 'naturalistic',
  phases: ['discovery', 'exploratory'],

  typicalParticipants: '6–12 participants',
  typicalSessionDuration: '90–180 minutes',
  typicalStudyTimeline: '3–6 weeks',

  landscape: { qualQuant: 0.15, attiBeha: 0.78 },

  overview: `Contextual inquiry is a field research method that combines observation and structured interviewing in the participant's natural work environment. The researcher visits the participant at their workplace (or wherever they actually perform the activity being studied) and observes them working on real tasks — asking questions as behaviors occur, rather than reconstructing events after the fact.

The method was formally developed by Karen Holtzblatt and Hugh Beyer in the 1990s as part of their Contextual Design process. It rests on four principles: context (observe in the actual environment, not a lab or screen share), partnership (researcher and participant work together to understand the work), interpretation (the researcher forms and checks hypotheses with the participant as the work unfolds), and focus (the inquiry follows a defined scope rather than open-ended observation).

The master-apprentice model defines the relationship: the participant is the expert on their own work; the researcher is an apprentice trying to learn it. This framing — researcher as learner, not evaluator — reduces pressure on participants to perform or justify their work.

Contextual inquiry surfaces what interview methods cannot: the workarounds users have built around broken processes, the tacit knowledge they apply without realizing it, the tools and people they rely on outside the product, and the environmental constraints that shape their behavior. It closes the gap between what users say they do and what they actually do.`,

  whatItAnswers: [
    'What do users actually do — not just what they say they do?',
    'What workarounds have users built around broken processes or inadequate tools?',
    'What environmental, organizational, or social constraints are shaping behavior?',
    'What tacit knowledge are experienced users applying that novices lack?',
    'What tools, resources, and people does the user rely on alongside the product?',
    'Where does the actual workflow differ from the designed workflow?',
    'What triggers specific behaviors, and what do users do immediately before and after using the product?',
  ],

  whenToUse: [
    'You are designing for a complex or specialized work context and the team has limited direct experience of that context.',
    'User interviews have produced answers that feel inconsistent or incomplete — you suspect a gap between stated and actual behavior.',
    'The activity you are researching spans multiple tools, people, and physical environments that cannot be adequately recreated in a lab or screen-share session.',
    'You are in a discovery phase and need to understand the actual problem before defining the design problem.',
    'The product is intended to change or support a real workflow, and the team does not yet fully understand that workflow.',
    'Previous research has produced conflicting findings about user behavior that could be resolved by direct observation.',
  ],

  whenNotToUse: [
    'You need to evaluate a specific design or prototype. Use moderated usability testing — contextual inquiry is discovery and exploratory, not evaluative.',
    'The workflow you are studying is sensitive, confidential, or subject to access restrictions that prevent observation.',
    'Access to the participant\'s actual work environment is impractical within the study timeline.',
    'Your research question is about attitudes, opinions, or mental models disconnected from observable behavior. Use interviews.',
    'You need findings quickly. Contextual inquiry sessions are long and logistically intensive — timeline of under 3 weeks is high risk.',
    'You need statistical findings across a large population. Use surveys or unmoderated tools.',
  ],

  sopSteps: [
    {
      id: 1,
      phase: 'prepare',
      title: 'Define research focus and scope',
      description: 'Contextual inquiry generates a large volume of rich data. Without a defined focus, the field work produces observations that cannot be turned into actionable findings. A focus is not a hypothesis to confirm — it is a lens that determines which aspects of the work to attend to and which to set aside.',
      checklist: [
        { text: 'Write a primary focus statement: what aspect of the work are you studying?', note: 'e.g., "How do invoice approvers manage multi-step approval workflows across email and the ERP system?"' },
        { text: 'Define the scope: what activities and contexts are in scope, and what is out of scope?' },
        { text: 'Identify the key questions you want the field work to answer' },
        { text: 'Confirm the focus with stakeholders before recruitment begins' },
        { text: 'Brief any additional observers on the focus so their attention is calibrated' },
      ],
      example: 'Focus: "The first 30 minutes of a new patient visit at a GP surgery, from patient check-in to the start of the consultation." Out of scope: consultation content, post-visit documentation. This scope makes the field sessions manageable and the analysis tractable.',
      commonMistakes: [
        'No focus — treating the session as open observation generates too much data to synthesize',
        'A focus that is a hypothesis ("we think users struggle with X") rather than a domain to understand',
        'Scope that is too broad for a single-day field visit',
      ],
      expectedOutput: 'A written research focus document (1 page), shared with the team and any participant-hosting organizations.',
    },
    {
      id: 2,
      phase: 'prepare',
      title: 'Identify and recruit participants',
      description: 'Contextual inquiry participants are people who perform the target work activity regularly, in a real context. Unlike usability testing, you are recruiting for their work expertise — not testing what they do with your product. Access negotiation may require organizational approval at multiple levels.',
      checklist: [
        { text: 'Define participant criteria: role, frequency of the target activity, organizational context' },
        { text: 'Identify 6–12 participants representing meaningful variation in role, context, and experience level' },
        { text: 'Contact the participant\'s organization or manager for access approval where necessary' },
        { text: 'Explain the nature of the session clearly: the researcher will observe real work, not a demonstration' },
        { text: 'Send a consent form in advance covering observation, note-taking, and any recording' },
        { text: 'Brief participants: there are no right or wrong answers; the researcher is learning from them, not assessing their performance' },
        { text: 'Confirm logistics: where will the session take place? What work activity will be in progress?' },
      ],
      example: 'Recruiting for a study of GP surgery workflows: approach the practice manager, not individual GPs directly. Explain the research purpose (improving health IT tools), confirm that no clinical information about patients will be recorded, and get written approval before scheduling.',
      commonMistakes: [
        'Participants who prepare a demo instead of doing real work — the session produces a performance, not observation',
        'Skipping organizational access negotiation — sessions can be cancelled on the day if management didn\'t agree',
        'Participants who are too senior and rarely perform the target activity themselves',
      ],
      expectedOutput: 'A confirmed list of 6–12 participants with access approval, consent forms sent, and session logistics confirmed.',
      templateRef: 'Participant Consent Form',
    },
    {
      id: 3,
      phase: 'prepare',
      title: 'Prepare the field guide',
      description: 'A contextual inquiry field guide is lighter than an interview discussion guide. It defines the focus, the key questions to explore, and the observer\'s role — but it does not script the inquiry, because the inquiry follows the work as it happens. Prepare the team for naturalistic observation.',
      checklist: [
        { text: 'Write a one-page field guide with: focus statement, 5–8 key questions to explore during observation' },
        { text: 'Define the observer role: primary researcher (conducts inquiry), note-taker (records observations)' },
        { text: 'Agree on notation conventions for notes: behaviors, quotes, interpretations, and questions should be distinguishable' },
        { text: 'Plan data capture: paper notes, digital notes, photos, screen recordings (all with consent)' },
        { text: 'Brief any additional observers — they observe and note, not question or interrupt' },
        { text: 'Pilot the approach with a colleague in a low-stakes context' },
      ],
      example: 'Field guide excerpt — key questions: "What triggers this activity?", "What does the participant refer to or consult during this step?", "What happens when something goes wrong?", "What would make this faster or easier?" These questions guide attention without scripting the interaction.',
      commonMistakes: [
        'Treating the field guide as a script — contextual inquiry follows the work, not the questions',
        'Sending multiple researchers into a session without briefing them — uncoordinated observers disrupt the participant',
        'Not preparing for unexpected content — field sessions surface things you didn\'t plan for; the researcher must be comfortable with ambiguity',
      ],
      expectedOutput: 'A field guide and team briefing document, reviewed before the first session.',
    },
    {
      id: 4,
      phase: 'conduct',
      title: 'Conduct the field session',
      description: 'Arrive at the participant\'s environment and let the work drive the session. Open with a brief orientation, then ask the participant to work normally while you observe and ask questions as things happen. The master-apprentice posture — you are learning from the expert — frames every interaction.',
      checklist: [
        { text: 'Arrive early; orient to the physical environment before the participant begins' },
        { text: 'Introduce yourself and reiterate the purpose: you are there to learn how the work is done, not to evaluate the participant' },
        { text: 'Ask the participant to work as they normally would, explaining what they are doing as they go' },
        { text: 'Ask questions about what you observe as it happens: "I noticed you switched to email there — can you tell me why?"' },
        { text: 'Ask about artifacts: "What is this spreadsheet used for?", "Who else uses this?"' },
        { text: 'Follow threads that diverge from the main flow — workarounds and ad hoc solutions are often the most valuable findings' },
        { text: 'Record interpretations you form and check them with the participant: "It seems like the reason you use email here is because the system doesn\'t notify the right people — is that right?"' },
        { text: 'Note the physical and social environment: who is nearby? What is on the walls? What tools are within reach?' },
        { text: 'Close with a brief summary: share 2–3 key observations with the participant and invite correction' },
      ],
      example: 'Participant opens a new browser tab mid-task and navigates to a spreadsheet on SharePoint. Researcher: "I see you\'ve gone to a spreadsheet — can you tell me what you\'re looking for there?" Participant: "This is where we keep the actual approved vendor list — the system doesn\'t always have the latest version." This workaround would never surface in an interview.',
      commonMistakes: [
        'Asking participants to "show you" a feature rather than observing actual work — demonstrations are performances, not practices',
        'Taking over — the researcher\'s instinct to help is counterproductive in a CI session',
        'Only noting problems with the product being studied; the session should capture all tools, processes, and people involved in the work',
        'Letting the closing summary become validation-seeking ("So the system is working well for you, right?") rather than verification',
      ],
      expectedOutput: 'Session notes, photos (with consent), and any artifacts collected, with interpretations flagged separately from observations.',
      templateRef: 'Field Observation Notes',
    },
    {
      id: 5,
      phase: 'analyze',
      title: 'Consolidate and model findings',
      description: 'Contextual inquiry analysis produces work models — structured diagrams that represent the work as the researcher observed it, rather than as the organization believes it to be. Holtzblatt and Beyer\'s Contextual Design process defines five work models; for most product teams, a simplified flow model and affinity diagram are sufficient.',
      checklist: [
        { text: 'Write individual field notes into discrete observations (one per sticky note or card)' },
        { text: 'Distinguish observations (what you saw), quotes (what participants said, verbatim), and interpretations (your analysis)' },
        { text: 'Create an affinity diagram: group observations bottom-up into emerging themes' },
        { text: 'Draw a simplified workflow model for the target activity, based on observed behavior rather than the official process' },
        { text: 'Annotate the workflow with: pain points, workarounds, alternative tools, and decision points' },
        { text: 'Identify patterns that appear across multiple participants — these are robust findings' },
        { text: 'Identify contradictions between participants — these flag variation in the population or context, not noise to average out' },
      ],
      expectedOutput: 'An affinity diagram organized into themes; a simplified workflow model of the observed activity.',
      commonMistakes: [
        'Analyzing one participant\'s session before others are complete — cross-contaminating interpretation',
        'Conflating the official process with the observed process — the whole point of CI is to surface the gap between the two',
        'Treating contradictions between participants as problems to resolve rather than signals of meaningful variation',
      ],
    },
    {
      id: 6,
      phase: 'synthesize',
      title: 'Synthesize design opportunities',
      description: 'Contextual inquiry findings are most useful when they point toward design opportunities — places where the designed system could better support the actual work. Synthesis converts observations and workflow models into actionable design briefs.',
      checklist: [
        { text: 'Write a finding for each major theme: "Users [do/experience X] because [Y]"' },
        { text: 'For each significant workaround, identify the underlying need it is meeting' },
        { text: 'Identify gaps between the intended workflow and the observed workflow' },
        { text: 'Write design opportunity statements: "How might we support [observed need] in a way that [reduces/replaces/improves the current workaround]?"' },
        { text: 'Distinguish findings the team can act on now from findings that require further research to validate' },
        { text: 'Prioritize findings by frequency and impact on the core workflow' },
      ],
      expectedOutput: 'A set of design opportunity statements grounded in observed user behavior, with supporting evidence.',
      commonMistakes: [
        'Jumping to solutions before fully synthesizing findings — "we should build X" is not a finding',
        'Ignoring findings that don\'t confirm existing hypotheses — disconfirming evidence is often the most valuable output of a field study',
      ],
    },
    {
      id: 7,
      phase: 'share',
      title: 'Share findings and workflow models',
      description: 'Contextual inquiry findings are especially powerful when shared visually. The workflow model, annotated with pain points and workarounds, can change how the product team understands the problem — more durably than a slide deck of quotes.',
      checklist: [
        { text: 'Present the workflow model to the product team as the primary artifact — walk through it as if re-creating the observed work' },
        { text: 'Annotate the model live in the presentation to show where and why the work breaks down' },
        { text: 'Include photographs of the environment and artifacts (with consent) to ground the findings in reality' },
        { text: 'Present the affinity diagram to show the scope of themes discovered' },
        { text: 'Close with design opportunity statements, not product recommendations — let the team participate in generating solutions' },
        { text: 'Archive all field notes, models, and photographs in the research repository, anonymized where required' },
      ],
      expectedOutput: 'A findings presentation built around the workflow model; archived field materials with appropriate consents.',
      templateRef: 'Findings Report Template',
    },
  ],

  analysisApproach: `Contextual inquiry analysis is more complex than interview analysis because it combines observation data (what users did) with interview data (what they said) and artifact data (what tools, documents, and systems they used). The primary analytical structure is the workflow model — a diagram of the actual work as observed.

The Holtzblatt-Beyer Contextual Design process defines five formal work models (flow model, sequence model, artifact model, cultural model, physical model). Most product teams find that a simplified workflow sequence — showing the steps, decision points, tools, and actors involved — provides sufficient analytical structure without adopting the full Contextual Design process.

Affinity diagramming is used alongside the models to group themes and surface patterns across participants.`,

  synthesisApproach: `Synthesis in contextual inquiry converts the gap between the intended workflow and the observed workflow into design opportunities. The most useful analytical move is: "The system assumes X; users actually do Y; this suggests the design should consider Z."

Workarounds are particularly valuable synthesis inputs: each workaround is evidence of an unmet need. A user who has built a parallel spreadsheet to manage something the system should handle is telling the team exactly what the system fails to provide.

Design opportunity statements ("How might we…") are a useful output format: they frame the finding as a space for design exploration rather than a specific solution, which keeps findings relevant as designs evolve.`,

  typicalOutputs: [
    'Workflow model: a diagram of the observed activity with annotations',
    'Affinity diagram organized into design-relevant themes',
    'Design opportunity statements grounded in observed behavior',
    'Findings report or presentation with workflow model as anchor',
    'Photograph documentation of physical environment and artifacts (with consent)',
    'Archived field notes and recordings',
  ],

  templates: [
    {
      name: 'Research Focus Document',
      description: 'One-page document defining the study focus, scope, and key questions — shared with participants and stakeholders before sessions begin.',
      format: 'Google Doc',
      url: null,
    },
    {
      name: 'Field Observation Notes',
      description: 'Structured field note template distinguishing observations, quotes, interpretations, and open questions.',
      format: 'Google Doc / Paper',
      url: null,
    },
    {
      name: 'Participant Consent Form',
      description: 'Consent form for observation, note-taking, photography, and recording in a naturalistic setting. Requires legal review before use.',
      format: 'PDF',
      url: null,
    },
    {
      name: 'Affinity Diagram Guide',
      description: 'Step-by-step process guide for running a team affinity diagramming session with CI field data.',
      format: 'Google Doc',
      url: null,
    },
  ],

  relatedMethods: [
    {
      slug: 'user-interviews',
      name: 'User Interviews',
      relationship: 'complementary',
      reason: 'Interviews surface attitudes and mental models; contextual inquiry surfaces actual behavior. Used together, they build a complete picture.',
    },
    {
      slug: 'moderated-usability-testing',
      name: 'Moderated Usability Testing',
      relationship: 'follows',
      reason: 'Contextual inquiry identifies the real workflow and design problems; usability testing evaluates whether a proposed solution actually addresses them.',
    },
    {
      slug: 'diary-studies',
      name: 'Diary Studies',
      relationship: 'alternative',
      reason: 'Diary studies capture longitudinal behavioral data without researcher presence — useful when the activity is too distributed or private for direct observation.',
    },
  ],

  sources: [
    {
      id: 'holtzblatt-beyer-1993',
      author: 'Holtzblatt, K. & Beyer, H.',
      title: 'Making customer-centered design work for teams',
      publisher: 'Communications of the ACM',
      year: '1993',
      usedFor: 'The four CI principles (context, partnership, interpretation, focus) and the master-apprentice model. Primary originating source for contextual inquiry.',
      note: 'This is the primary source for CI methodology, predating NN/g\'s coverage of the method.',
    },
    {
      id: 'holtzblatt-beyer-1997',
      author: 'Holtzblatt, K. & Beyer, H.',
      title: 'Contextual Design: Defining Customer-Centered Systems',
      publisher: 'Morgan Kaufmann',
      year: '1997',
      usedFor: 'Work model types (flow, sequence, artifact, cultural, physical) and the full Contextual Design process. Primary reference for the five-model analysis framework.',
      note: 'Training data synthesis. The full CD process is rarely adopted wholesale by product teams; this playbook uses a simplified subset appropriate for most product contexts.',
    },
    {
      id: 'nng-guide',
      author: 'Moran, K. (Nielsen Norman Group)',
      title: 'A Guide to UX Research Methods',
      publisher: 'Nielsen Norman Group',
      year: '2019',
      url: 'https://www.nngroup.com/articles/guide-ux-research-methods/',
      usedFor: 'Classification of contextual inquiry as behavioral, qualitative, and naturalistic context of use in the 3-dimensional framework.',
      note: 'Synthesized from training data.',
    },
    {
      id: 'practitioner',
      author: 'Practitioner knowledge',
      title: 'Practitioner knowledge',
      usedFor: 'SOP step structure, recruitment and access negotiation guidance, and field facilitation details.',
    },
  ],
};

export default contextualInquiry;
