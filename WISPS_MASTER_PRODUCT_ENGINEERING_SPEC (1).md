# WISPS --- MASTER PRODUCT & ENGINEERING SPECIFICATION

**Status:** Canonical / Living Source of Truth\
**Version:** 3.0\
**Last Updated:** 2026-09-16\
**Product:** Wisps\
**Domain:** wisps.in\
**Primary Interface:** iMessage via Linq\
**Architecture:** Production-grade modular monolith with event-driven
background workers\
**Audience:** Founder, CTO, engineers, AI/ML engineers, product/design,
future contributors

------------------------------------------------------------------------

## 0. DOCUMENT PURPOSE

This is the canonical source of truth for what Wisps is, why it exists,
what it must do, how it should be architected, how agents connect, what
data is stored, how connectors feed the system, how actions are
executed, and how AI quality is evaluated and monitored.

If a future engineer reads only one document before working on Wisps, it
should be this one.

### It must answer

1.  What problem are we solving?
2.  Who are we solving it for?
3.  What exactly is Wisps?
4.  What capabilities are in scope?
5.  What products/categories are we functionally consolidating?
6.  What is the moat?
7.  What connectors are required?
8.  What data do connectors produce?
9.  How does data become memory/context?
10. Which agents exist and why?
11. How do agents communicate?
12. How does an iMessage request become an action?
13. How do we prevent hallucination and stale context?
14. When do we require approval?
15. What is stored in the database?
16. What is synchronous vs asynchronous?
17. How do we evaluate AI quality?
18. How do we monitor production?
19. What gets built first?
20. What is explicitly not being built?

### Non-negotiable principle

> **Wisps should know enough about the user's work to make the next
> action obvious --- and should be able to execute that action through
> the user's connected tools.**

------------------------------------------------------------------------

# 1. PRODUCT CHARTER

## 1.1 One-line definition

> **Wisps is an AI work layer that lives in iMessage, understands your
> work, relationships, conversations, documents, commitments and
> priorities across connected tools, and helps you decide and execute
> what should happen next.**

## 1.2 The experience

The user should not think:

> "Which app contains the context I need?"

They should think:

> "I'll ask Wisps."

Examples:

-   "What should I reply to Sarah?"
-   "What did we promise Mark?"
-   "Prepare me for my 2 PM."
-   "Find the latest pricing numbers."
-   "Draft the update for the team."
-   "Who am I waiting on?"
-   "Who is waiting on me?"
-   "Follow up with everyone who hasn't replied."
-   "Create a sales follow-up routine."
-   "Every morning, tell me what needs my attention."
-   "Reply to Sarah using the latest proposal."
-   "Post this to LinkedIn tomorrow morning."
-   "What happened with the Acme deal?"
-   "Find the document we discussed yesterday."

Wisps should resolve the request using connected data and tools rather
than asking the user to manually assemble context.

------------------------------------------------------------------------

# 2. THE PROBLEM

Modern professional work is fragmented across:

-   Gmail / Outlook
-   Google Calendar / Outlook Calendar
-   Slack
-   LinkedIn
-   WhatsApp / iMessage
-   Notion
-   Google Drive / Dropbox
-   meeting notes/transcripts
-   GitHub / GitLab
-   CRM
-   task/project management

The problem is not simply "too many apps."

The deeper problem is:

> **Context is fragmented, memory is incomplete, and action is
> disconnected from understanding.**

A user can have all the information needed to make a good decision but
still waste significant time finding it.

### Canonical example

Sarah sends:

> "Any update on the revised pricing?"

A generic AI sees one message.

Wisps should determine:

-   Sarah is referring to Tuesday's pricing conversation.
-   The user promised a revised proposal by Friday.
-   The old proposal exists in Drive.
-   The latest pricing numbers were discussed in Slack yesterday.
-   The current proposal still contains the old numbers.
-   Sarah has followed up already.
-   The appropriate next action is to update the proposal, not merely
    send a generic apology.

Desired behavior:

> **"Sarah is following up on the revised pricing you promised Tuesday.
> You still haven't sent it. The latest proposal in Drive has the old
> pricing, but I found the updated numbers in yesterday's Slack
> discussion. I can update the proposal and draft the reply."**

That is the quality bar.

------------------------------------------------------------------------

# 3. WHY WISPS EXISTS

Wisps began as a professional relationship-memory product and is now
expanding that foundation into a broader work intelligence layer.

It combines four capability layers:

### 3.1 Assistant

Tomo-like conversational assistance through iMessage.

### 3.2 Relationship intelligence

Goodword/Dex/Pally-like relationship memory and follow-through.

### 3.3 Unified communication context

Kinso-like cross-channel conversation understanding and context-aware
drafting.

### 3.4 Work intelligence + execution

Arlo/Town/Mira-like ability to search work data, reason over it, create
routines, and execute actions through connected tools.

Therefore Wisps is not merely:

> "an AI chatbot in iMessage."

It is:

> **a persistent work context + relationship + action system with
> iMessage as the control surface.**

------------------------------------------------------------------------

# 4. PRODUCT POSITIONING

## 4.1 Wisps = Personal Work Intelligence Layer

``` text
                    USER
                     |
                  iMessage
                     |
                   LINQ
                     |
              WISPS ORCHESTRATOR
                     |
       +-------------+-------------+
       |             |             |
   CONTEXT        MEMORY         AGENTS
    ENGINE         ENGINE        /TOOLS
       |             |             |
       +-------------+-------------+
                     |
              CONNECTOR LAYER
                     |
    +--------+-------+-------+---------+
    |        |       |       |         |
  Gmail   Calendar Slack  LinkedIn   Drive
    |        |       |       |         |
    +--------+-------+-------+---------+
                     |
          Notion / GitHub / CRM / etc.
```

The user should experience one assistant, not an architecture diagram.

------------------------------------------------------------------------

# 5. WHAT WISPS FUNCTIONALLY CONSOLIDATES

This is **functional consolidation**, not a claim that every competitor
has identical scope.

## 5.1 Relationship layer

Reference products/categories:

-   Dex
-   Goodword
-   Pally
-   relationship-focused CRMs

Wisps covers jobs such as:

-   relationship timeline
-   people memory
-   notes
-   meeting history
-   last interaction
-   follow-up reminders
-   relationship context
-   "who is this person?"
-   "what did we discuss?"
-   "when should I reconnect?"
-   personalized outreach

## 5.2 Communication intelligence layer

Reference:

-   Kinso
-   AI inbox/communication assistants

Wisps covers:

-   unified conversation search
-   thread understanding
-   context-aware drafting
-   voice/tone adaptation
-   cross-channel context
-   morning briefing
-   prioritization

## 5.3 Work intelligence / assistant layer

Reference:

-   Arlo
-   Town
-   Mira
-   general work agents
-   workflow/routine assistants

Wisps covers:

-   search work data
-   read documents
-   inspect calendar
-   create tasks
-   draft updates
-   recurring routines
-   natural-language workflows
-   approved actions

## 5.4 Strategic point

We are not trying to reproduce every UI feature of every competitor.

We are consolidating the underlying jobs-to-be-done into one persistent
system.

The user should not need to maintain:

> relationship CRM + inbox AI + work assistant + automation tool

if Wisps can provide those capabilities through one context layer.

------------------------------------------------------------------------

# 6. THE MOAT

Features are copyable. The moat must therefore be deeper than "we have
an iMessage bot."

## 6.1 Context graph

Wisps builds a continuously updated graph of:

``` text
People
  |
Relationships
  |
Conversations
  |
Meetings
  |
Documents
  |
Projects
  |
Tasks
  |
Commitments
  |
Decisions
  |
Actions
```

## 6.2 Temporal memory

Wisps understands:

-   what happened
-   when it happened
-   what changed
-   what was promised
-   whether the promise was completed
-   what the current state is

This prevents old facts from being treated as current facts.

## 6.3 Relationship-specific personalization

Wisps learns:

-   how the user writes to Sarah
-   how the user writes to an investor
-   how the user writes to a teammate
-   how often the user follows up
-   what topics matter to each relationship

## 6.4 Cross-source reasoning

The strongest outputs can require multiple sources.

Example:

``` text
Email:
Sarah asks for pricing.

Slack:
Team discussed updated pricing yesterday.

Drive:
Proposal contains old pricing.

Calendar:
Review call with Sarah tomorrow.

Wisps:
The correct next action is to update the proposal,
then send Sarah the revised version before the call.
```

## 6.5 Action history

Wisps remembers what it did:

-   drafted
-   sent
-   scheduled
-   created
-   updated
-   reminded
-   requested approval
-   failed
-   was rejected

This creates operational memory of the assistant itself.

------------------------------------------------------------------------

# 7. NORTH STAR

## Product north star

> **Useful next action with sufficient context.**

Every important interaction should move toward:

> **Understand → Decide → Act**

rather than:

> Search → Open app → Read → Copy → Paste → Switch app → Act

## Five product questions

Every feature should help answer one or more:

1.  **What is happening?**
2.  **Who/what does it involve?**
3.  **What do I already know about it?**
4.  **What should happen next?**
5.  **Can Wisps do it for me?**

------------------------------------------------------------------------

# 8. CORE PRODUCT CAPABILITIES

## 8.1 Ask anything about work

Examples:

-   "What happened with Acme?"
-   "What did John say about the launch?"
-   "Find every promise I made this week."
-   "What am I waiting on?"
-   "Who is waiting on me?"
-   "What changed since yesterday?"
-   "What do I need to know before this meeting?"

## 8.2 Context-aware drafting

Drafting must use:

1.  current request
2.  full relevant thread
3.  relationship memory
4.  user communication profile
5.  recent related conversations
6.  commitments/promises
7.  latest source-of-truth documents
8.  user priorities
9.  action state

Generic drafting is not acceptable.

## 8.3 Relationship intelligence

For every important person:

-   identity
-   organization
-   role
-   relationship type
-   interaction timeline
-   shared meetings
-   open commitments
-   past promises
-   preferences
-   communication style
-   relevant documents
-   related projects
-   next suggested action

## 8.4 Work memory

Wisps remembers:

-   facts
-   decisions
-   commitments
-   deadlines
-   project state
-   document state
-   meeting outcomes
-   tasks
-   preferences
-   recurring workflows
-   user instructions
-   action history

## 8.5 Document intelligence

Wisps must understand connected documents.

Capabilities:

-   search
-   retrieve
-   summarize
-   compare
-   extract facts
-   identify latest version
-   identify source-of-truth
-   link documents to people/projects
-   use document content when drafting actions

Example:

> "Use the latest proposal."

Wisps must locate the relevant proposal and determine which version is
current.

## 8.6 Meeting intelligence

Before meeting:

-   attendees
-   relationship history
-   recent conversation
-   open commitments
-   relevant documents
-   relevant projects
-   previous meeting outcomes
-   suggested talking points

After meeting:

-   summarize
-   extract decisions
-   extract commitments
-   create follow-ups
-   update relationship memory
-   draft follow-up communication

## 8.7 Follow-up intelligence

Detect:

-   user promised something
-   another person promised something
-   reply is overdue
-   deadline approaching
-   important relationship is going cold
-   document was requested but not sent
-   task has no owner
-   meeting produced an unresolved action

## 8.8 User-created routines / agents

Wisps supports natural-language routine creation.

Examples:

> "Every morning, summarize anything important from my inbox and Slack."

> "Every Friday, find leads I haven't followed up with and draft
> messages."

> "After every meeting, summarize the notes and draft follow-ups."

> "Watch my inbox for urgent customer emails and text me."

> "Create a sales mode for me."

Internally, these are structured workflow definitions, not arbitrary
executable code.

------------------------------------------------------------------------

# 9. USE CASES

## 9.1 Relationship

**User:** "Who is Sarah?"

Wisps:

-   identifies canonical Sarah
-   summarizes relationship
-   retrieves latest interactions
-   identifies open commitments
-   identifies next action

## 9.2 Reply

**User:** "What should I reply to Sarah?"

Wisps:

1.  identify Sarah
2.  identify current thread
3.  retrieve relevant history
4.  retrieve relationship memory
5.  retrieve latest work context
6.  identify outstanding commitment
7.  retrieve current document/data
8.  draft response
9.  explain why when useful
10. request approval before sending

## 9.3 Meeting

**User:** "Prep me for tomorrow's call with Acme."

Wisps:

-   finds calendar event
-   resolves attendees
-   retrieves relationship history
-   retrieves recent email/Slack
-   retrieves relevant documents
-   retrieves project status
-   generates concise briefing

## 9.4 Work status

**User:** "What's the status of the login feature?"

Wisps may inspect:

-   GitHub
-   Linear/Jira
-   Slack
-   docs
-   recent meetings

Then produce:

-   current state
-   blockers
-   owner
-   latest change
-   next action

## 9.5 Follow-up

**User:** "Who do I need to follow up with?"

Wisps combines:

-   unanswered outbound messages
-   promises
-   deadlines
-   meeting commitments
-   relationship importance
-   task state

## 9.6 Document + relationship

**User:** "Reply to Sarah using the latest proposal."

``` text
Sarah
  ↓
Current thread
  ↓
Relationship context
  ↓
Find proposal
  ↓
Determine latest version
  ↓
Check whether pricing is current
  ↓
Draft response
  ↓
Approval
  ↓
Send
```

## 9.7 Routine

**User:** "Create a morning briefing."

``` yaml
trigger: weekday 08:30
sources:
  - gmail
  - calendar
  - slack
  - tasks
steps:
  - detect urgent items
  - detect overdue commitments
  - summarize meetings
  - identify relationship follow-ups
  - rank by importance
delivery:
  - imessage
```

------------------------------------------------------------------------

# 10. PRODUCT MODES

Wisps should not require separate apps for different jobs.

The same assistant can operate in modes:

-   Default work mode
-   Relationship mode
-   Communication mode
-   Sales mode
-   Marketing mode
-   Executive mode
-   Project mode

Modes are configuration/context profiles over the same underlying
platform.

They do not create separate memory silos unless explicitly configured.

------------------------------------------------------------------------

# 11. CONNECTOR STRATEGY

A connector is not just an API wrapper.

Every connector exposes two classes of capability.

### Read

-   search
-   list
-   retrieve
-   metadata
-   history
-   attachments/files
-   relationships

### Write

-   create
-   update
-   send
-   schedule
-   comment
-   assign
-   archive
-   publish where permitted

Every connector declares:

-   permission requirements
-   supported capabilities
-   approval requirements
-   rate limits
-   sync strategy
-   webhook/delta support

------------------------------------------------------------------------

# 12. CONNECTORS --- TARGET MAP

## Tier 0 --- Core interface

### Linq / iMessage

Purpose:

-   user interaction
-   incoming commands
-   proactive notifications
-   approval requests
-   agent output
-   drafts
-   confirmations

Linq is the interaction channel, not the system of record.

------------------------------------------------------------------------

## Tier 1 --- Core context

### Gmail

Read:

-   messages
-   threads
-   participants
-   attachments
-   labels
-   timestamps

Write:

-   draft
-   send
-   label
-   archive

### Google Calendar

Read:

-   events
-   attendees
-   availability
-   recurring events

Write:

-   create
-   update
-   cancel
-   invite

### Google Drive

Read:

-   files
-   folders
-   content
-   metadata
-   versions

Write:

-   create
-   update
-   move
-   share where permitted

### Slack

Read:

-   channels
-   messages
-   threads
-   users
-   files
-   reactions

Write:

-   message
-   reply
-   reaction
-   channel action where permitted

------------------------------------------------------------------------

## Tier 2 --- Relationship context

### LinkedIn

Capabilities depend on officially available and authorized access.

Read/write functionality must use legitimate platform access. Do not
design the system around scraping or unsupported automation.

### Contacts

-   Apple/Google contacts
-   contact identity resolution

------------------------------------------------------------------------

## Tier 3 --- Work knowledge

### Notion

-   pages
-   databases
-   comments
-   search
-   page creation/update

### Dropbox

-   files
-   folders
-   search
-   content retrieval

### GitHub / GitLab

-   repositories
-   commits
-   pull requests
-   issues
-   reviews
-   files/diffs
-   comments

### Linear / Jira

-   issues
-   projects
-   status
-   comments
-   assignments
-   milestones

------------------------------------------------------------------------

## Tier 4 --- CRM / operations

Target:

-   HubSpot
-   Salesforce
-   Attio
-   Pipedrive
-   Asana
-   ClickUp
-   Monday
-   Todoist
-   Calendly / Cal.com

------------------------------------------------------------------------

# 13. CONNECTOR ABSTRACTION

Every connector implements a common interface.

``` ts
interface Connector {
  id: string;
  provider: ConnectorProvider;
  capabilities(): ConnectorCapability[];

  authenticate(): Promise<AuthResult>;

  search(input: SearchInput): Promise<SearchResult[]>;
  get(input: GetInput): Promise<ConnectorResource>;
  list(input: ListInput): Promise<ConnectorResource[]>;

  execute(action: ConnectorAction): Promise<ActionResult>;

  sync(cursor?: string): Promise<SyncResult>;

  health(): Promise<ConnectorHealth>;
}
```

Capabilities:

``` ts
type ConnectorCapability =
  | "search"
  | "read"
  | "create"
  | "update"
  | "delete"
  | "send"
  | "schedule"
  | "comment"
  | "upload"
  | "download";
```

Agents must not assume every connector can do everything.

------------------------------------------------------------------------

# 14. CONTEXT ENGINE

The Context Engine is the most important subsystem after the
connector/data layer.

Its job:

> **Given a request, determine the minimum sufficient context required
> to answer or act correctly.**

## Context layers

``` text
L0 — Current message
L1 — Conversation context
L2 — Entity context
L3 — Relationship context
L4 — Work/project context
L5 — Document context
L6 — Temporal context
L7 — User preferences
L8 — Historical memory
L9 — Action history
```

Do not dump all available data into the model.

Retrieve selectively.

------------------------------------------------------------------------

# 15. MEMORY ARCHITECTURE

Wisps retains the original three-tier memory concept and extends it for
work execution.

## 15.1 Working memory

Short-lived:

-   current iMessage thread
-   current request
-   current task
-   current agent execution
-   recently retrieved sources

## 15.2 Episodic memory

Events:

-   meetings
-   conversations
-   actions
-   decisions
-   messages
-   completed tasks
-   sent emails
-   document changes

## 15.3 Semantic memory

Facts:

-   people facts
-   project facts
-   preferences
-   recurring instructions
-   relationship facts
-   organization facts

## 15.4 Procedural memory

How the user wants work done:

-   preferred tone
-   approval level
-   workflow instructions
-   routines
-   sales process
-   meeting follow-up style
-   content style

## 15.5 Action memory

What Wisps did:

-   action requested
-   action approved
-   action executed
-   result
-   timestamp
-   source
-   failure/retry
-   user correction

------------------------------------------------------------------------

# 16. MEMORY OBJECTS

``` text
fact
preference
promise
commitment
decision
deadline
task
relationship_signal
project_state
meeting_outcome
document_fact
communication_pattern
user_instruction
workflow
action
```

Every memory has provenance.

``` ts
interface MemoryObject {
  id: string;
  userId: string;

  type: MemoryType;
  content: string;

  sourceType: SourceType;
  sourceId: string;

  subjectEntityId?: string;

  confidence: number;
  importance: number;

  validFrom?: Date;
  validUntil?: Date;

  status: "active" | "resolved" | "superseded" | "dismissed";

  createdAt: Date;
  updatedAt: Date;
}
```

Wisps must be able to answer:

> "Why do you think that?"

with source-backed context.

------------------------------------------------------------------------

# 17. ENTITY RESOLUTION

A person may appear as:

``` text
Sarah Khan
sarah@acme.com
LinkedIn Sarah Khan
Slack @sarah
Calendar attendee sarah@acme.com
Drive collaborator Sarah
```

All should resolve to one canonical person entity.

Resolution priority:

1.  exact email
2.  provider ID
3.  phone
4.  normalized name
5.  company/domain
6.  profile URL
7.  semantic/entity similarity
8.  model-assisted fallback

Never merge two people solely because names are similar.

Merges must be auditable and reversible.

------------------------------------------------------------------------

# 18. WORK ENTITY GRAPH

Wisps models:

``` text
Person
Organization
Project
Conversation
Meeting
Document
Task
Commitment
Decision
Event
Workflow
Action
```

Relationships:

``` text
Person --participated_in--> Conversation
Person --attended--> Meeting
Person --works_at--> Organization
Person --owns--> Task
Person --promised--> Commitment
Conversation --about--> Project
Document --belongs_to--> Project
Task --belongs_to--> Project
Meeting --about--> Project
Action --caused_by--> UserRequest
Action --affects--> Entity
```

V1 uses PostgreSQL relationships + metadata. A dedicated graph database
is not required.

------------------------------------------------------------------------

# 19. AGENT ARCHITECTURE

Do not build dozens of autonomous agents.

Use a small number of domain agents coordinated by one Orchestrator.

## 19.1 Orchestrator Agent

Responsible for:

-   intent understanding
-   planning
-   selecting agents/tools
-   context requirements
-   execution order
-   approval decisions
-   final response

It does not own connector implementations.

## 19.2 Intent Agent

Classifies:

``` text
casual
question
search
relationship
draft
action
workflow
briefing
status
meeting_prep
followup
```

Simple conversational requests should avoid unnecessary context
retrieval.

## 19.3 Context Agent

Responsible for:

-   entity identification
-   context retrieval
-   source selection
-   temporal filtering
-   relationship context
-   project context
-   document context

Output:

``` ts
ContextBundle {
  entities
  sources
  memories
  currentState
  openCommitments
  relevantDocuments
  confidence
}
```

## 19.4 Memory Agent

Responsible for:

-   memory extraction
-   updates
-   contradiction resolution
-   superseding stale memory
-   entity linking
-   provenance

## 19.5 Relationship Agent

Responsible for:

-   relationship summary
-   interaction history
-   follow-up detection
-   relationship state
-   communication patterns
-   suggested relationship action

## 19.6 Document Agent

Responsible for:

-   document search
-   retrieval
-   version selection
-   extraction
-   comparison
-   source-of-truth detection
-   document-to-project linking

## 19.7 Communication Agent

Responsible for:

-   drafting
-   summarizing
-   tone adaptation
-   channel-specific formatting
-   thread continuity
-   reply intent

It receives context; it does not independently invent context.

## 19.8 Planning Agent

Responsible for multi-step plans.

Example:

``` text
"Get Sarah the latest proposal and reply."

1. Resolve Sarah.
2. Find current conversation.
3. Find latest proposal.
4. Check freshness.
5. Compare against latest pricing.
6. Identify updated pricing if needed.
7. Update proposal.
8. Draft reply.
9. Ask for approval.
10. Send.
```

## 19.9 Action Agent

Responsible for executing approved actions.

It:

-   validates action
-   checks connector capability
-   checks permissions
-   executes
-   records action
-   retries safely
-   returns result

## 19.10 Workflow Agent

Converts natural-language routines into structured workflow definitions.

It must not generate arbitrary executable code.

## 19.11 Briefing Agent

Responsible for:

-   morning briefings
-   meeting prep
-   daily summaries
-   weekly reviews

------------------------------------------------------------------------

# 20. AGENT CONNECTION GRAPH

``` text
                    +----------------+
                    |    iMessage    |
                    |     / Linq     |
                    +-------+--------+
                            |
                            v
                    +---------------+
                    | Orchestrator  |
                    +-------+-------+
                            |
             +--------------+--------------+
             |              |              |
             v              v              v
        Intent Agent   Context Agent   Planning Agent
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
          Memory Agent  Relationship  Document Agent
                            |
              +-------------+-------------+
                            |
                            v
                   Communication Agent
                            |
                            v
                      Action Agent
                            |
          +-----------------+------------------+
          |        |        |        |         |
        Gmail  Calendar   Slack  LinkedIn    Drive
          |        |        |        |         |
          +--------+--------+--------+---------+
                            |
                            v
                    Action / Event Log
                            |
                            v
                      Memory Agent
```

Critical loop:

``` text
Connectors
   ↓
Events
   ↓
Memory / State
   ↓
Context
   ↓
Reasoning
   ↓
Action
   ↓
Action Result
   ↓
Memory / State Update
```

------------------------------------------------------------------------

# 21. REQUEST EXECUTION FLOW

Canonical request:

> "What should I reply to Sarah?"

``` text
1. iMessage receives request
2. Linq sends event to Wisps
3. Authenticate user
4. Orchestrator receives request
5. Intent Agent => draft_reply
6. Entity Resolver => Sarah
7. Context Agent builds context plan
8. Retrieve current Sarah thread
9. Retrieve recent Sarah conversations
10. Retrieve relationship memories
11. Retrieve open commitments
12. Retrieve relevant project
13. Document Agent finds latest proposal
14. Context Agent checks temporal freshness
15. Planning Agent determines next action
16. Communication Agent drafts
17. Evidence/provenance attached
18. Safety layer checks action
19. Draft sent to iMessage
20. User approves
21. Action Agent sends through connector
22. Action logged
23. Memory Agent updates state
24. iMessage confirms completion
```

------------------------------------------------------------------------

# 22. APPROVAL MODEL

## Level 0 --- Read-only

No approval:

-   search
-   summarize
-   retrieve
-   analyze
-   prepare briefing

## Level 1 --- Draft

Approval required before external communication:

-   email draft
-   Slack draft
-   LinkedIn draft
-   document draft

## Level 2 --- Low-risk write

Configurable:

-   create internal task
-   add note
-   create reminder

## Level 3 --- External action

Initially always require explicit approval:

-   send email
-   send LinkedIn message
-   send Slack message
-   schedule external meeting
-   publish post

## Level 4 --- High-impact

Explicit confirmation + preview:

-   delete
-   financial action
-   permission/share changes
-   bulk sends
-   destructive operations

Always show:

``` text
WHAT will happen
WHERE it will happen
WHO will receive it
WHAT data will be used
```

------------------------------------------------------------------------

# 23. TOOL / ACTION HARNESS

Every tool call passes through one common harness.

``` text
Agent
  |
  v
Tool Registry
  |
  v
Permission Check
  |
  v
Input Validation
  |
  v
Context / Policy Check
  |
  v
Approval Check
  |
  v
Connector
  |
  v
Result Validation
  |
  v
Action Log
```

Tool contract:

``` ts
interface Tool {
  name: string;
  description: string;

  inputSchema: ZodSchema;
  outputSchema: ZodSchema;

  riskLevel: RiskLevel;
  requiredScopes: string[];

  execute(ctx: ToolContext, input: unknown): Promise<unknown>;
}
```

No agent calls provider APIs directly.

------------------------------------------------------------------------

# 24. SOURCE-OF-TRUTH RULES

When sources disagree, Wisps must not blindly choose one.

Source priority is configurable by entity type.

Example:

### Project status

``` text
Linear/Jira status
    >
GitHub activity
    >
Slack discussion
    >
old document
```

### Pricing

``` text
latest approved pricing document
    >
authoritative CRM/data source
    >
Slack discussion
    >
old email
```

### Meeting schedule

``` text
Calendar
    >
email mention
```

Record:

-   source selected
-   source timestamp
-   source authority
-   conflicting sources

------------------------------------------------------------------------

# 25. TEMPORAL REASONING

Every retrieved fact is evaluated for:

-   created_at
-   updated_at
-   valid_from
-   valid_until
-   superseded_by
-   source freshness

Example:

``` text
March:
Pricing = $100

August:
Pricing = $120
```

A vector search may retrieve March.

Wisps must determine August is current.

------------------------------------------------------------------------

# 26. CONTRADICTION / RECONCILIATION

When new information conflicts with memory:

``` text
Old:
"Sarah wants annual billing."

New:
"Sarah said monthly billing is preferred."
```

Do not delete the old memory.

Instead:

``` text
old.status = superseded
new.status = active
new.supersedes = old
```

If uncertainty remains:

> "I found conflicting information. The latest message says monthly
> billing, while an older note says annual. Which should I use?"

------------------------------------------------------------------------

# 27. DATABASE ARCHITECTURE

## Core stack

-   PostgreSQL
-   Supabase
-   pgvector
-   Supabase Auth
-   Supabase Storage where needed
-   Trigger.dev for background jobs
-   Vercel for application/API hosting

## Architecture rule

Start as a modular monolith.

Do not introduce:

-   Kubernetes
-   Kafka
-   microservices
-   Temporal
-   distributed event infrastructure

until actual scale requires them.

Solo-founder test:

> **Can one engineer understand, debug and ship this?**

------------------------------------------------------------------------

# 28. DATABASE SCHEMA

Exact SQL migrations live in `/supabase/migrations`.

## users

``` sql
id uuid primary key
email text unique not null
name text
avatar_url text
timezone text
preferences jsonb
created_at timestamptz
updated_at timestamptz
```

## integrations

``` sql
id uuid primary key
user_id uuid references users(id)
provider text not null
status text
external_account_id text
scopes jsonb
encrypted_credentials text
cursor jsonb
last_sync_at timestamptz
created_at timestamptz
updated_at timestamptz

unique(user_id, provider, external_account_id)
```

## people

``` sql
id uuid primary key
user_id uuid references users(id)
canonical_name text
primary_email text
company text
role text
phone text
linkedin_url text
avatar_url text
relationship_type text
importance numeric
last_interaction_at timestamptz
metadata jsonb
created_at timestamptz
updated_at timestamptz
```

## identities

``` sql
id uuid primary key
user_id uuid
person_id uuid references people(id)
provider text
provider_user_id text
email text
username text
profile_url text
metadata jsonb
created_at timestamptz

unique(user_id, provider, provider_user_id)
```

## conversations

``` sql
id uuid primary key
user_id uuid
provider text
external_thread_id text
channel text
subject text
participants jsonb
started_at timestamptz
last_message_at timestamptz
metadata jsonb
created_at timestamptz
updated_at timestamptz
```

## messages

``` sql
id uuid primary key
user_id uuid
conversation_id uuid
provider text
external_message_id text
sender_person_id uuid
direction text
body text
normalized_body text
attachments jsonb
sent_at timestamptz
is_processed boolean default false
metadata jsonb
created_at timestamptz
updated_at timestamptz
```

## meetings

``` sql
id uuid primary key
user_id uuid
provider text
external_event_id text
title text
start_at timestamptz
end_at timestamptz
location text
attendees jsonb
status text
briefing jsonb
created_at timestamptz
updated_at timestamptz
```

## documents

``` sql
id uuid primary key
user_id uuid
provider text
external_file_id text
name text
mime_type text
path text
url text
size_bytes bigint
modified_at timestamptz
content_hash text
version_metadata jsonb
project_id uuid
created_at timestamptz
updated_at timestamptz
```

## document_chunks

``` sql
id uuid primary key
document_id uuid
user_id uuid
chunk_index int
content text
embedding vector(1536)
metadata jsonb
created_at timestamptz
```

## projects

``` sql
id uuid primary key
user_id uuid
name text
description text
status text
owner_person_id uuid
metadata jsonb
created_at timestamptz
updated_at timestamptz
```

## tasks

``` sql
id uuid primary key
user_id uuid
project_id uuid
assignee_person_id uuid
title text
description text
status text
priority text
due_at timestamptz
source_type text
source_id uuid
created_at timestamptz
updated_at timestamptz
```

## memories

``` sql
id uuid primary key
user_id uuid
type text
content text
person_id uuid
project_id uuid
source_type text
source_id uuid
confidence numeric
importance numeric
valid_from timestamptz
valid_until timestamptz
status text
supersedes_memory_id uuid
created_at timestamptz
updated_at timestamptz
```

## embeddings

``` sql
id uuid primary key
user_id uuid
entity_type text
entity_id uuid
embedding vector(1536)
created_at timestamptz
```

Use pgvector indexes appropriate to dataset size. Benchmark before
choosing IVFFlat/HNSW configuration.

## relationship_states

``` sql
id uuid primary key
user_id uuid
person_id uuid
relationship_type text
importance numeric
interaction_frequency numeric
recency_score numeric
response_latency numeric
relationship_summary text
state jsonb
computed_at timestamptz
```

## commitments

``` sql
id uuid primary key
user_id uuid
person_id uuid
project_id uuid
description text
owner text
due_at timestamptz
status text
source_type text
source_id uuid
resolved_at timestamptz
created_at timestamptz
updated_at timestamptz
```

## workflows

``` sql
id uuid primary key
user_id uuid
name text
description text
definition jsonb
status text
created_by text
created_at timestamptz
updated_at timestamptz
```

## workflow_runs

``` sql
id uuid primary key
workflow_id uuid
user_id uuid
status text
triggered_at timestamptz
completed_at timestamptz
input jsonb
output jsonb
error jsonb
created_at timestamptz
```

## actions

``` sql
id uuid primary key
user_id uuid
agent_run_id uuid
tool_name text
connector text
action_type text
risk_level text
input_redacted jsonb
output_redacted jsonb
approval_status text
execution_status text
external_action_id text
error jsonb
created_at timestamptz
completed_at timestamptz
```

## agent_runs

``` sql
id uuid primary key
user_id uuid
request_id uuid
agent_type text
status text
input jsonb
output jsonb
latency_ms int
model text
token_usage jsonb
error jsonb
created_at timestamptz
completed_at timestamptz
```

## requests

``` sql
id uuid primary key
user_id uuid
channel text
external_message_id text
content text
intent text
status text
created_at timestamptz
completed_at timestamptz
```

## notifications

``` sql
id uuid primary key
user_id uuid
type text
title text
body text
payload jsonb
read_at timestamptz
created_at timestamptz
```

------------------------------------------------------------------------

# 29. DATABASE RULES

Every user-owned table must:

-   have UUID primary key
-   include `user_id`
-   use RLS
-   have timestamps
-   have appropriate indexes
-   use foreign keys where relationships matter
-   avoid duplicating canonical data
-   preserve provenance
-   support state transitions where history matters

Never hard-delete important AI memory or action history without a
deliberate retention policy.

------------------------------------------------------------------------

# 30. EVENT MODEL

Wisps is internally event-driven.

Examples:

``` text
message.received
message.sent
meeting.created
meeting.updated
document.created
document.updated
task.created
task.updated
person.discovered
memory.created
memory.superseded
commitment.created
commitment.resolved
workflow.triggered
action.requested
action.approved
action.executed
action.failed
```

Events trigger:

-   extraction
-   memory updates
-   indexing
-   relationship updates
-   notifications
-   workflows

------------------------------------------------------------------------

# 31. BACKGROUND JOBS

Use Trigger.dev.

## connector_sync_job

-   delta sync
-   upsert
-   cursor update
-   emit events

## memory_extraction_job

-   extract memories
-   extract commitments
-   detect decisions
-   update entity links

## embedding_job

Create embeddings for:

-   memory
-   document chunks
-   conversations
-   important messages
-   entities

## relationship_update_job

Update:

-   interaction history
-   relationship state
-   importance
-   follow-up signals

## meeting_briefing_job

Triggered before meetings.

## followup_detection_job

Runs daily and on relevant events.

## workflow_runner_job

Executes scheduled/event-driven workflows.

## action_retry_job

Retries only safe, idempotent actions.

------------------------------------------------------------------------

# 32. JOB RELIABILITY

Every background job must have:

-   idempotency key
-   retry policy
-   exponential backoff
-   timeout
-   structured logging
-   dead-letter/failure state
-   per-user concurrency control
-   connector rate-limit handling
-   request/trace ID

Never allow a retry to accidentally send the same external message
twice.

------------------------------------------------------------------------

# 33. APPLICATION STRUCTURE

Suggested repository:

``` text
/app
  /(auth)
  /(app)
    /dashboard
    /contacts
    /people/[id]
    /meetings
    /search
    /workflows
    /settings
  /api
    /auth
    /connectors
    /requests
    /search
    /draft
    /actions
    /workflows
    /webhooks

/components

/lib
  /ai
  /agents
  /connectors
  /context
  /memory
  /entities
  /actions
  /db
  /security
  /observability

/workers

/types

/supabase
  /migrations

/evals
  /golden
  /regression
  /fixtures

/docs
```

------------------------------------------------------------------------

# 34. AGENT CODE ORGANIZATION

``` text
/lib/agents
  orchestrator.ts
  intent-agent.ts
  context-agent.ts
  memory-agent.ts
  relationship-agent.ts
  document-agent.ts
  communication-agent.ts
  planning-agent.ts
  action-agent.ts
  workflow-agent.ts
  briefing-agent.ts
```

Every agent exposes a narrow interface.

``` ts
interface Agent<TInput, TOutput> {
  name: string;
  run(input: TInput, ctx: AgentContext): Promise<TOutput>;
}
```

Agents do not access arbitrary database tables or connectors directly.

Use domain services.

------------------------------------------------------------------------

# 35. CONTEXT BUNDLE CONTRACT

Models receive structured context.

``` ts
interface ContextBundle {
  request: RequestContext;

  entities: EntityContext[];

  conversations: ConversationContext[];

  memories: MemoryContext[];

  commitments: CommitmentContext[];

  documents: DocumentContext[];

  meetings: MeetingContext[];

  projects: ProjectContext[];

  currentState: CurrentState;

  provenance: SourceReference[];

  confidence: number;
}
```

This makes prompts testable and debuggable.

------------------------------------------------------------------------

# 36. MODEL STRATEGY

The model layer must be provider-agnostic.

``` ts
interface ModelProvider {
  generate(input: ModelRequest): Promise<ModelResponse>;
  structured<T>(input: StructuredRequest<T>): Promise<T>;
  embed(input: string[]): Promise<number[][]>;
}
```

Select models by task:

-   reasoning/planning → high-quality reasoning model
-   extraction → structured-output model
-   embeddings → embedding model
-   lightweight classification → lower-cost model
-   drafting → high-quality generation model

Model versions are configuration, not business logic.

------------------------------------------------------------------------

# 37. PROMPT ENGINEERING

Prompts must be versioned.

``` text
/prompts
  intent/v1
  memory-extraction/v1
  context-ranking/v1
  drafting/v1
  planning/v1
  relationship/v1
  document-analysis/v1
```

Every production AI call records:

-   prompt version
-   model
-   configuration
-   input token count
-   output token count
-   latency
-   tool calls
-   outcome/eval score where available

Never silently change a production prompt.

------------------------------------------------------------------------

# 38. RESPONSE QUALITY

Wisps prefers:

### Groundedness over fluency

A confident incorrect answer is worse than:

> "I couldn't verify that."

### Current source over stale memory

### Explicit uncertainty over fabricated certainty

### Actionable output over generic explanation

### Short output by default

iMessage is conversational.

------------------------------------------------------------------------

# 39. CANONICAL SARAH GOLDEN PATH

### User

> "What should I reply to Sarah?"

### System must discover

``` text
Sarah = canonical person

Current conversation:
pricing follow-up

Relationship:
existing professional relationship

Promise:
user said revised proposal would be sent

Status:
not completed

Drive:
proposal exists

Proposal:
old pricing

Slack:
updated pricing discussed yesterday

Calendar:
meeting tomorrow
```

### Wisps

> "Sarah is following up on the revised pricing you promised Tuesday.
> You still haven't sent it. The proposal in Drive has the old pricing,
> but I found updated numbers in yesterday's Slack discussion. I'd
> update the proposal and send it before tomorrow's call. Want me to
> draft it?"

This is the product reference behavior.

------------------------------------------------------------------------

# 40. USER-CREATED AGENTS / ROUTINES

The platform eventually supports:

``` text
Trigger
+
Context
+
Conditions
+
Reasoning
+
Actions
+
Approval policy
+
Delivery channel
```

Example:

> "Make me a sales agent."

Wisps should ask only necessary questions and create:

``` yaml
name: Sales Follow-up
goal: Keep qualified leads moving
sources:
  - Gmail
  - Calendar
  - CRM
actions:
  - identify stale leads
  - summarize relationship
  - draft follow-up
approval:
  send: required
schedule:
  daily: 09:00
delivery:
  imessage
```

This is configuration over existing Wisps capabilities, not a separate
agent runtime.

------------------------------------------------------------------------

# 41. WORKFLOW ENGINE

## Triggers

-   schedule
-   message received
-   email received
-   calendar event
-   document updated
-   task changed
-   manual
-   webhook

## Conditions

-   entity match
-   time
-   status
-   absence of reply
-   memory exists
-   deadline
-   priority
-   source metadata

## Steps

-   search
-   retrieve
-   summarize
-   classify
-   draft
-   create
-   update
-   notify
-   request approval
-   execute

## Control

-   sequential
-   conditional
-   retry
-   timeout
-   stop
-   human approval

------------------------------------------------------------------------

# 42. SECURITY MODEL

Wisps handles highly sensitive work data.

Security is a product feature.

## Isolation

Every query must be scoped to:

``` text
authenticated user
+
authorized connector/account
```

## RLS

Supabase RLS on every user-owned table.

## Credentials

Never store provider tokens in plaintext.

Use encrypted credential storage / managed secrets.

## Logs

Never log:

-   access tokens
-   refresh tokens
-   raw private message bodies
-   full private document contents
-   credentials

Logs should use:

``` text
user_id hash
request_id
action_id
provider
latency
status
error class
```

## Approval

External writes require approval according to risk policy.

## Deletion

User deletion must remove or purge according to policy:

-   connector credentials
-   messages
-   documents
-   memories
-   embeddings
-   actions
-   workflows
-   applicable logs

------------------------------------------------------------------------

# 43. PRIVACY PRINCIPLES

Wisps follows:

1.  least privilege
2.  explicit connector consent
3.  source attribution
4.  user-controlled permissions
5.  no hidden external writes
6.  auditability
7.  deletion support
8.  encryption in transit and at rest
9.  no training on user data by default unless explicitly stated by
    product policy
10. strict user-data isolation

------------------------------------------------------------------------

# 44. EVAL HARNESS

AI quality cannot be judged by demos alone.

Wisps requires a permanent eval suite.

## Retrieval

-   correct source?
-   important context missed?
-   stale context retrieved?

## Entity resolution

-   correct person?
-   correct project?
-   correct conversation?

## Memory

-   correct extraction?
-   correct type?
-   correct provenance?
-   correct temporal validity?
-   contradiction handled?

## Reasoning

-   correct next action?
-   fact vs assumption distinguished?

## Drafting

-   grounded?
-   tone correct?
-   channel appropriate?
-   commitments preserved?
-   concise?

## Tool selection

-   correct connector?
-   minimum necessary tools?

## Action safety

-   approval requested?
-   unauthorized write avoided?
-   duplicate execution prevented?

## Workflow

-   correct trigger?
-   correct conditions?
-   correct action sequence?

------------------------------------------------------------------------

# 45. GOLDEN DATASET

Create curated scenarios:

``` text
Sarah pricing
Investor follow-up
Meeting preparation
Old vs new document
Conflicting Slack vs email
Duplicate person
No-reply detection
Urgent customer email
LinkedIn outreach
GitHub project status
Document version selection
Recurring workflow
Approval-required action
Failed connector
Stale memory
Ambiguous person
```

Each case contains:

-   input
-   expected entities
-   expected sources
-   expected context
-   expected action
-   acceptable response range
-   safety requirements

------------------------------------------------------------------------

# 46. EVAL METRICS

### Retrieval

-   Recall@K
-   Precision@K
-   MRR

### Memory

-   extraction precision
-   extraction recall
-   temporal accuracy
-   provenance accuracy

### Entity resolution

-   precision
-   false merge rate
-   false split rate

### Drafting

-   groundedness
-   personalization
-   tone match
-   factual accuracy
-   human acceptance rate
-   edit distance after correction

### Actions

-   tool success rate
-   approval correctness
-   duplicate action rate
-   action failure rate

### End-to-end

-   task completion rate
-   first-response usefulness
-   user correction rate
-   abandonment rate

------------------------------------------------------------------------

# 47. HUMAN EVAL LOOP

If a user heavily edits a draft, store:

``` text
generated draft
final draft
difference
relationship
channel
context
```

Use corrections as:

-   preference signals
-   eval examples
-   prompt/context improvement

Do not blindly fine-tune on every correction.

------------------------------------------------------------------------

# 48. PRODUCTION OBSERVABILITY

Every request gets:

-   `request_id`
-   `agent_run_id`
-   `action_id`

Trace:

``` text
request
  -> orchestrator
  -> context retrieval
  -> agents
  -> tool calls
  -> result
  -> response
```

## Metrics

### Reliability

-   request success rate
-   connector success rate
-   job failure rate
-   webhook failure rate
-   retry rate

### Performance

-   p50 latency
-   p95 latency
-   p99 latency
-   connector latency
-   model latency
-   retrieval latency

### AI

-   tool-call accuracy
-   context retrieval score
-   eval score
-   hallucination rate
-   refusal/error rate
-   user correction rate

### Product

-   daily active users
-   requests/user
-   connected integrations/user
-   actions/user
-   approval rate
-   workflow adoption
-   successful tasks

### Cost

-   tokens/request
-   model cost/user
-   connector API usage
-   embedding cost
-   workflow cost

------------------------------------------------------------------------

# 49. ALERTING

Alert on:

-   connector outage
-   authentication failures spike
-   action failure spike
-   duplicate action detected
-   model error spike
-   latency degradation
-   queue backlog
-   sync lag
-   memory extraction failure
-   abnormal token usage
-   abnormal external action volume

------------------------------------------------------------------------

# 50. AUDIT LOG

Every meaningful action is auditable.

``` json
{
  "request_id": "...",
  "user_id": "...",
  "agent": "action-agent",
  "connector": "gmail",
  "action": "send_email",
  "approval": "approved",
  "recipient": "redacted",
  "status": "success",
  "timestamp": "..."
}
```

The user should be able to ask:

> "What did Wisps do today?"

and receive a clear action history.

------------------------------------------------------------------------

# 51. FAILURE HANDLING

Wisps must fail safely.

### Retrieval failure

> "I couldn't access your Drive right now, so I haven't assumed what's
> in the latest proposal."

### Connector auth expired

Tell the user which connection needs reauthorization.

### Model uncertainty

Ask for clarification.

### Action failure

Never claim success.

### Unknown action state

Do not blindly retry. Reconcile provider state first.

------------------------------------------------------------------------

# 52. IDEMPOTENCY

For every external action:

``` text
idempotency_key =
hash(user_id + action_type + target + normalized_payload)
```

Before retry:

``` text
if action already succeeded:
    return previous result

if provider confirms execution:
    reconcile

otherwise:
    retry safely
```

------------------------------------------------------------------------

# 53. CONNECTOR SYNC

Prefer provider-native incremental sync.

Each connector stores:

``` json
{
  "cursor": "...",
  "last_sync_at": "...",
  "sync_status": "healthy",
  "error": null
}
```

Pipeline:

``` text
Provider
  ↓
Webhook / Delta API / Poll
  ↓
Normalizer
  ↓
Canonical entities
  ↓
Event
  ↓
Memory / indexing
```

------------------------------------------------------------------------

# 54. NORMALIZATION LAYER

Provider-specific data is normalized.

``` ts
interface NormalizedMessage {
  provider: string;
  externalId: string;
  conversationExternalId?: string;

  sender: NormalizedIdentity;
  recipients: NormalizedIdentity[];

  body: string;
  timestamp: Date;

  attachments: NormalizedAttachment[];
  metadata: Record<string, unknown>;
}
```

Agents consume normalized data, not Gmail/Slack-specific schemas.

------------------------------------------------------------------------

# 55. SEARCH ARCHITECTURE

Wisps needs hybrid search.

## Keyword

Exact names, emails, IDs, titles.

## Semantic

Meaning-based retrieval.

## Temporal

Recent/current information.

## Entity

Person/project/document filters.

## Relationship

Data connected to a person.

## Hybrid ranking

``` text
final_score =
  semantic_score
+ lexical_score
+ recency_score
+ entity_score
+ source_authority
+ relationship_relevance
```

Semantic similarity alone must never decide truth.

------------------------------------------------------------------------

# 56. RETRIEVAL PIPELINE

``` text
User Request
    ↓
Query Understanding
    ↓
Entity Resolution
    ↓
Candidate Retrieval
    ├── keyword
    ├── vector
    ├── relational
    ├── temporal
    └── connector search
    ↓
Reranking
    ↓
Freshness Check
    ↓
Source Authority Check
    ↓
Context Bundle
    ↓
Reasoning
```

------------------------------------------------------------------------

# 57. PROACTIVE INTELLIGENCE

Wisps should not only wait for questions.

Examples:

> "You have a meeting with Sarah in 40 minutes. She last asked about the
> revised pricing. The proposal in Drive still has the old numbers."

> "Three people are waiting on you today: Sarah, Mike, and John."

> "You promised Aman a demo yesterday. Want me to draft the follow-up?"

Proactive notifications must be:

-   relevant
-   explainable
-   low-noise
-   dismissible
-   configurable

------------------------------------------------------------------------

# 58. MORNING BRIEFING

Example:

``` text
Good morning.

3 things need your attention:

1. Sarah is waiting on the revised proposal.
   Your Drive copy still has old pricing.

2. You have a 2 PM call with Acme.
   Last discussion: renewal terms.
   Open item: security review.

3. Mike hasn't replied to your proposal in 5 days.
   I can draft a follow-up.
```

The briefing should answer:

> What matters today?

not:

> What happened in every app?

------------------------------------------------------------------------

# 59. MEETING BRIEFING

``` text
2 PM — Sarah / Acme

Relationship:
You have spoken 8 times in the last 60 days.

Last discussion:
Pricing and renewal.

Open commitment:
You promised revised pricing.

Relevant document:
Acme Proposal v4.

Potential issue:
v4 contains old pricing.

Suggested talking point:
Confirm whether the revised annual pricing works
before discussing renewal timing.
```

------------------------------------------------------------------------

# 60. RELATIONSHIP PROFILE

``` text
Sarah Khan
Acme
VP Partnerships

Relationship:
High-value / active

Last interaction:
Today

Current topic:
Pricing

Open commitment:
Revised proposal

Communication:
Direct, short, usually responds within 1 day

Relevant projects:
Acme renewal

Next action:
Send updated proposal before tomorrow's call
```

------------------------------------------------------------------------

# 61. COMMUNICATION PERSONALIZATION

Maintain two profiles.

### User-level

-   overall tone
-   common phrases
-   typical length
-   greeting
-   signoff
-   emoji behavior
-   formatting

### Relationship-level

-   Sarah: direct/warm
-   Investor: formal
-   teammate: concise/casual

Never force one universal user voice.

------------------------------------------------------------------------

# 62. SOURCE ATTRIBUTION

Important AI outputs should expose source context.

Example:

> "The updated pricing came from yesterday's #sales Slack thread."

Users can ask:

> "Show me."

Wisps returns the source.

This is essential for trust.

------------------------------------------------------------------------

# 63. UX PRINCIPLES

Primary UI: iMessage.

Web app exists for:

-   onboarding
-   integrations
-   settings
-   memory inspection
-   workflows
-   action history
-   debugging/admin
-   advanced search

Do not make a dashboard mandatory for daily use.

## iMessage principles

-   concise
-   conversational
-   approval-friendly
-   source-aware
-   no giant walls of text
-   no fake "thinking"
-   no unnecessary confirmations

------------------------------------------------------------------------

# 64. ONBOARDING FLOW

``` text
Landing
  ↓
Sign in
  ↓
Connect iMessage/Linq
  ↓
Connect Google
  ↓
Select integrations
  ↓
Permissions
  ↓
Initial sync
  ↓
Identity resolution
  ↓
Memory bootstrap
  ↓
"Ask Wisps anything"
```

Initial sync should communicate progress.

Do not require the user to configure 20 settings before first value.

------------------------------------------------------------------------

# 65. FIRST VALUE MOMENT

The first session should demonstrate:

``` text
I connected my work
→ Wisps understood it
→ Wisps found something I forgot
→ Wisps can help me act
```

Example:

> "I found 4 open commitments from your recent conversations. One is
> overdue: Sarah is still waiting for the revised proposal."

Then:

> "Want me to draft it?"

------------------------------------------------------------------------

# 66. MVP SCOPE

MVP proves the core loop, not the entire platform.

## Interface

-   iMessage via Linq
-   onboarding
-   approval flow

## Connectors

-   Gmail
-   Google Calendar
-   Google Drive
-   Slack

## Intelligence

-   entity resolution
-   conversation retrieval
-   memory extraction
-   relationship context
-   document retrieval
-   temporal freshness
-   context bundling

## Agents

-   Orchestrator
-   Intent
-   Context
-   Memory
-   Relationship
-   Document
-   Communication
-   Action

## Actions

-   draft email
-   send email with approval
-   create calendar event with approval
-   create/update task
-   create reminders
-   send Slack message with approval

## Proactive

-   follow-up detection
-   meeting briefing
-   morning briefing

## Workflows

-   basic scheduled routine
-   approval step

------------------------------------------------------------------------

# 67. PHASE 2

Add:

-   LinkedIn where officially supported
-   Notion
-   GitHub
-   Linear/Jira
-   CRM
-   richer workflows
-   relationship intelligence
-   document comparison
-   multi-step agents
-   stronger proactive intelligence

------------------------------------------------------------------------

# 68. PHASE 3

Add:

-   broader connector ecosystem
-   custom MCP/tool connectors
-   advanced workflow builder
-   shared/team capabilities
-   agent templates
-   deeper project intelligence
-   richer analytics

Do not build these before the core context → action loop is excellent.

------------------------------------------------------------------------

# 69. WHAT WE DO NOT BUILD BY DEFAULT

Unless product evidence demands it:

-   a new email client
-   a new CRM UI
-   a generic chatbot dashboard
-   a standalone task manager
-   a complex enterprise admin suite
-   a custom vector database
-   microservices
-   autonomous unrestricted sending
-   arbitrary code execution from user-created workflows
-   dozens of specialized agents
-   a separate app for every capability

Wisps should feel like one system.

------------------------------------------------------------------------

# 70. BUILD ORDER

## Stage 1 --- Foundation

1.  Supabase
2.  Auth
3.  RLS
4.  schema
5.  connector abstraction
6.  Linq webhook
7.  request/event model

## Stage 2 --- Google context

8.  Gmail connector
9.  Calendar connector
10. Drive connector
11. normalization
12. sync workers

## Stage 3 --- Memory

13. entity resolution
14. memory extraction
15. embeddings
16. retrieval
17. temporal reconciliation

## Stage 4 --- Intelligence

18. Context Agent
19. Relationship Agent
20. Document Agent
21. Communication Agent
22. Orchestrator

## Stage 5 --- Actions

23. Tool registry
24. approval layer
25. Action Agent
26. action logs
27. idempotency

## Stage 6 --- Proactive

28. meeting prep
29. follow-up engine
30. morning briefing

## Stage 7 --- Workflows

31. workflow schema
32. workflow creation
33. scheduler
34. workflow execution
35. approval steps

## Stage 8 --- Slack

36. Slack connector
37. Slack context
38. Slack actions

## Stage 9 --- Evaluation

39. golden dataset
40. eval harness
41. tracing
42. production dashboards
43. regression tests

------------------------------------------------------------------------

# 71. ENGINEERING QUALITY BAR

## TypeScript

-   strict
-   no `any`
-   no `@ts-ignore`
-   Zod validation
-   generated DB types

## API

-   authenticated
-   authorized
-   validated
-   observable

## AI

-   structured outputs where possible
-   versioned prompts
-   provenance
-   confidence
-   eval coverage

## Data

-   RLS
-   encryption
-   indexes
-   migrations
-   provenance

## Jobs

-   idempotent
-   retryable
-   observable
-   bounded

## Connectors

-   capability declarations
-   normalized output
-   rate-limit handling
-   auth refresh
-   sync cursor

------------------------------------------------------------------------

# 72. TESTING STRATEGY

## Unit

-   entity resolver
-   ranking
-   temporal logic
-   memory parsing
-   workflow parser
-   permission checks
-   approval logic

## Integration

-   Gmail sync
-   Calendar sync
-   Drive retrieval
-   Slack sync
-   Linq webhook
-   action execution

## AI evals

-   retrieval
-   memory
-   reasoning
-   drafting
-   tool selection
-   safety

## End-to-end

``` text
Ask → retrieve → answer
Ask → retrieve → draft → approve → send
Ask → retrieve → plan → approve → execute
Event → memory → proactive notification
Schedule → workflow → context → action
```

------------------------------------------------------------------------

# 73. DEFINITION OF DONE

A feature is not done when the UI works.

It is done when:

-   product behavior is documented
-   schema is migrated
-   connector/tool contract exists
-   auth is enforced
-   RLS is tested
-   AI prompt is versioned
-   eval case exists
-   error handling exists
-   logging exists
-   action audit exists if applicable
-   monitoring exists
-   user behavior is tested
-   rollback/failure behavior is understood

------------------------------------------------------------------------

# 74. PRODUCTION READINESS CHECKLIST

## Security

-   [ ] RLS verified
-   [ ] credentials encrypted
-   [ ] secrets outside repo
-   [ ] webhook signatures verified
-   [ ] rate limits
-   [ ] audit logs

## Reliability

-   [ ] retries
-   [ ] idempotency
-   [ ] dead-letter handling
-   [ ] provider outage behavior
-   [ ] sync recovery

## AI

-   [ ] golden eval suite
-   [ ] prompt versions
-   [ ] structured outputs
-   [ ] provenance
-   [ ] hallucination tests

## Observability

-   [ ] request tracing
-   [ ] agent tracing
-   [ ] action tracing
-   [ ] latency metrics
-   [ ] cost metrics
-   [ ] connector health

## Product

-   [ ] approval UX
-   [ ] source attribution
-   [ ] correction flow
-   [ ] delete/export controls
-   [ ] onboarding recovery

------------------------------------------------------------------------

# 75. DOCUMENTATION-FIRST REPOSITORY

Wisps remains documentation-first.

``` text
/
  AGENTS.md
  README.md
  PRODUCT.md
  ARCHITECTURE.md
  SECURITY.md

  /docs
    /company
      AGENTS.md
    /product
      AGENTS.md
    /architecture
      AGENTS.md
    /memory
      AGENTS.md
    /ai
      AGENTS.md
    /backend
      AGENTS.md
    /frontend
      AGENTS.md
    /agents
      AGENTS.md
    /connectors
      AGENTS.md
    /security
      AGENTS.md
    /sprints
      AGENTS.md

  /supabase
    /migrations

  /evals
    /golden
    /regression
    /fixtures
```

Root `AGENTS.md` defines engineering rules.

Domain `AGENTS.md` files define local constraints.

------------------------------------------------------------------------

# 76. AGENTS.MD RULES

Every engineer/agent working in the repository must:

1.  Read root `AGENTS.md`.
2.  Read relevant domain `AGENTS.md`.
3.  Understand canonical architecture.
4.  Never bypass connector abstractions.
5.  Never bypass approval policies.
6.  Never call provider APIs directly from UI code.
7.  Never create an untracked memory source.
8.  Add tests/evals for behavior changes.
9.  Update docs when architecture changes.
10. Preserve backward compatibility unless migration is explicit.

------------------------------------------------------------------------

# 77. ENVIRONMENT VARIABLES

Example:

``` env
# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=Wisps

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Linq
LINQ_API_KEY=
LINQ_WEBHOOK_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

# Slack
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
SLACK_SIGNING_SECRET=

# AI
AI_PROVIDER_API_KEY=
EMBEDDING_API_KEY=

# Trigger
TRIGGER_API_KEY=
TRIGGER_API_URL=

# Observability
OTEL_EXPORTER_OTLP_ENDPOINT=
SENTRY_DSN=
```

Never commit actual values.

------------------------------------------------------------------------

# 78. API PRINCIPLES

Every endpoint:

``` text
authenticate
→ authorize
→ validate
→ execute
→ audit
→ respond
```

Consistent response:

``` json
{
  "data": {},
  "error": null,
  "request_id": "..."
}
```

Error example:

``` json
{
  "data": null,
  "error": {
    "code": "CONNECTOR_AUTH_EXPIRED",
    "message": "Google Drive needs to be reconnected."
  },
  "request_id": "..."
}
```

Never expose internal stack traces.

------------------------------------------------------------------------

# 79. WEBHOOK PRINCIPLES

Every webhook:

1.  verify signature
2.  identify provider
3.  validate payload
4.  deduplicate
5.  persist event metadata
6.  normalize
7.  emit internal event
8.  return quickly

Do not run long AI operations inside webhook request handlers.

------------------------------------------------------------------------

# 80. RATE LIMITING

Apply limits at:

-   user
-   connector
-   provider
-   tool
-   workflow

Bulk operations must be bounded.

Example:

> "Message every lead"

must become:

``` text
detect bulk external action
→ summarize scope
→ require explicit approval
→ execute with rate limits
```

------------------------------------------------------------------------

# 81. COST CONTROL

Track cost per:

-   request
-   user
-   connector
-   workflow
-   agent
-   model

Avoid sending entire documents or histories to models.

Use:

``` text
retrieve
→ rank
→ compress
→ reason
```

not:

``` text
dump database
→ prompt model
```

------------------------------------------------------------------------

# 82. CONTEXT BUDGET

Every context bundle has a budget.

Example:

``` text
current request: full
current thread: full/recent
relationship: compact summary
memory: top relevant
documents: top relevant chunks
Slack: top relevant
calendar: relevant events
```

The Context Agent decides what earns model context.

------------------------------------------------------------------------

# 83. HUMAN OVERRIDE

Users can:

-   correct person
-   correct memory
-   dismiss memory
-   edit draft
-   cancel action
-   disable workflow
-   disconnect connector
-   change approval policy
-   delete data

Corrections become signals, not unquestioned truth.

------------------------------------------------------------------------

# 84. PRODUCT TRUST RULES

Wisps should never say:

> "Done."

unless the action actually completed.

### Success

> "Done --- I sent the email to Sarah."

### Waiting

> "Draft ready. I haven't sent it."

### Failure

> "I couldn't send it because Gmail authorization expired."

### Uncertainty

> "I found two proposals and can't confidently tell which is current."

Trust is more important than conversational smoothness.

------------------------------------------------------------------------

# 85. ULTIMATE USER EXPERIENCE

### User

> "Handle Sarah."

### Wisps

> "Sarah is waiting for the revised pricing you promised Tuesday. The
> latest proposal still has old pricing; yesterday's Slack discussion
> has the updated numbers. I'll update the proposal and draft the reply.
> I'll ask before sending."

### User

> "Do it."

### Wisps

> "Updated the proposal and drafted the reply. Ready to send?"

### User

> "Yes."

### Wisps

> "Sent. I marked the pricing commitment as completed."

That is the product.

------------------------------------------------------------------------

# 86. PRODUCT LOOP

The company should be organized around:

``` text
CONNECT
  ↓
UNDERSTAND
  ↓
REMEMBER
  ↓
REASON
  ↓
ACT
  ↓
VERIFY
  ↓
LEARN
  ↓
UNDERSTAND BETTER
```

This is the core system loop and the foundation of the moat.

------------------------------------------------------------------------

# 87. FINAL PRODUCT STATEMENT

> **Wisps is the personal AI work layer that lives in iMessage. It
> connects to the tools where your work happens, builds a living
> understanding of your people, conversations, documents, projects,
> commitments and priorities, and helps you figure out what should
> happen next --- then executes it through your connected tools with
> your approval.**

The user should not need to maintain Wisps.

**Wisps maintains the context.**

The user should not need to remember everything.

**Wisps remembers.**

The user should not need to open five apps.

**Wisps connects them.**

The user should not need to explain context repeatedly.

**Wisps already knows.**

The ultimate product feeling:

> **"Wisps already knows. I just need to act."**

------------------------------------------------------------------------

# APPENDIX A --- COMPETITIVE REFERENCE MAP

These are reference products/categories, not claims that their products
are identical.

  -----------------------------------------------------------------------
  Reference               Capability to learn     Wisps functional
                          from                    equivalent
  ----------------------- ----------------------- -----------------------
  Tomo                    iMessage-native         iMessage assistant +
                          assistant, routines,    routines
                          conversational work     

  Kinso                   unified                 communication/context
                          communications +        layer
                          contextual drafting     

  Goodword                relationship            relationship engine
                          intelligence + network  
                          context                 

  Dex                     personal relationship   people memory +
                          management              follow-up

  Pally                   relationship            relationship workflows
                          tracking/follow-up      

  Arlo                    work context + action   work context + action
                                                  layer

  Town                    connected work          work assistant +
                          assistant + routines +  workflow engine
                          actions                 

  Mira                    conversational agent    conversational agent
                          interaction             interface

  Almanac                 work/knowledge          work knowledge layer
                          productivity            

  Turnstone               agent-oriented          agent/workflow
                          automation reference    architecture
  -----------------------------------------------------------------------

Strategic lesson:

> **Do not compete feature-by-feature. Build the shared context
> infrastructure that makes the user's work available to every
> interaction and action.**

------------------------------------------------------------------------

# APPENDIX B --- REFERENCE SOURCES

Current product capabilities should be rechecked before making external
competitive claims.

-   Town: https://www.town.com/docs
-   Town Assistant: https://www.town.com/docs/using-town/assistant
-   Goodword: https://www.goodword.com/
-   Goodword Relationship Copilot:
    https://www.goodword.com/blog/what-a-relationship-copilot-is-and-why-professionals-will-need-one
-   Kinso: https://www.kinso.ai/
-   Dex: https://getdex.com/
-   Dex Core Features: https://getdex.com/docs/dex-core
-   Wisps: https://wisps.in/

------------------------------------------------------------------------

# APPENDIX C --- CANONICAL RULES

If a future proposal conflicts with this document, ask:

1.  Does it improve the Connect → Understand → Remember → Reason → Act
    loop?
2.  Does it make context more useful?
3.  Does it reduce app switching?
4.  Does it increase trust?
5.  Can one engineer maintain it?
6.  Can we evaluate whether it works?
7.  Can we observe it in production?
8.  Does it preserve user control?

If not, do not add the complexity by default.

------------------------------------------------------------------------

# APPENDIX D --- CHANGE CONTROL

This document is a living source of truth.

Any architectural/product change should update:

-   this document
-   relevant `AGENTS.md`
-   schema migrations
-   connector contracts
-   agent contracts
-   eval cases
-   monitoring requirements
-   build plan

Never allow implementation to silently diverge from architecture.

------------------------------------------------------------------------

# APPENDIX E --- SERVICE AS SOFTWARE (BUSINESS MODEL PRINCIPLE)

## E.1 The core distinction

Wisps is not built, priced, or marketed as Software as a Service.

Wisps is **Service as Software**.

> **We do not sell access to an AI tool. We sell the outcome of work
> getting done. The AI is the delivery mechanism, not the product.**

## E.2 What this means in practice

| Software as a Service | Service as Software (Wisps) |
|---|---|
| User pays to *use* a tool | User pays for an *outcome* |
| Value = features available | Value = work actually completed |
| User does the labor, software assists | Wisps does the labor, user approves |
| Pricing tied to seats/usage of the tool | Pricing can be tied to outcomes delivered (replies sent, follow-ups closed, nothing dropped) |
| Success metric: engagement/DAU | Success metric: things handled without the user having to do them |

## E.3 Why this matters for every product decision

Every feature should be evaluated against:

> **Does this get an outcome done for the user, or does it just give the user a better tool to do it themselves?**

A feature that produces a great *insight* but requires the user to still do the work (open Gmail, copy the info, write the reply, send it) is a **Software as a Service** feature — informative, not transformative.

A feature that produces a **completed action** (drafted, and on approval, sent — commitment marked resolved, memory updated) is a **Service as Software** feature.

Per Section 84 (Product Trust Rules): Wisps should say "Done" only when something is actually done. This is not just a trust rule — it is the business-model rule. **"Done" is the unit of value we sell.**

## E.4 Implication for the moat (ties to Section 6)

The context graph, temporal memory, and cross-source reasoning described in Section 6 are not the product. They are the **infrastructure required to reliably deliver outcomes without the user having to supervise every step**. A user does not pay for a context graph. A user pays for never having to say "wait, can you catch me up on Sarah" again — for the follow-up that got sent, the proposal that got updated, the reply that went out correctly and on time.

## E.5 What this rules out

- Do not market Wisps as "an AI tool that helps you..." — this frames the user as still doing the work.
- Do not price purely on message-volume or seat-count if outcome-based pricing becomes viable — volume-based SaaS pricing rewards Wisps for making the user do more, not less.
- Do not ship features whose entire value is "here is information you didn't have" without a corresponding path to action. Insight without action is a dead end for this business model.

------------------------------------------------------------------------

# APPENDIX F --- MARKET-FACING SUMMARY (for landing page, SEO, pitches)

This section is the only approved source for external copy — website, ads, decks, cold outreach, and SEO content. Internal architecture terms (Work Brain, Context Engine, Orchestrator, agent names) must never appear in user-facing material.

## F.1 One-liner

> Wisps remembers everyone and everything about your work — so you never have to explain yourself twice.

## F.2 Category

AI personal CRM that lives in iMessage — positioned above both "personal AI agent" (Instinct, Poke, Tomo) and "personal CRM" (Dex, Goodword, Pally) categories, per the positioning below.

## F.3 Category positioning

> Instinct handles your life. Dex remembers your network. Wisps runs your work — it knows your people, your commitments, and your history well enough to act, not just remind.

Do not compete feature-by-feature with either category. Compete on: depth of professional-context understanding combined with the willingness to actually execute, not just inform.

## F.4 Target user (initial wedge)

Solo founders — highest pain from context-switching across LinkedIn, email, and Slack with no team to catch what they drop.

## F.5 Core features to market (public language only)

1. **Tone Memory** — drafts that sound like you.
2. **One Brain, Every Tool** — remembers context across Email, Slack, LinkedIn.
3. **Ask Anything** — instant answers about any person or conversation.
4. **Smart Follow-ups** — resurfaces what needs you, right when it matters.

## F.6 SEO keyword targets

**Tier 1 (long-tail, lower competition, prioritize first):**
- AI CRM for LinkedIn email Slack
- iMessage AI assistant
- AI that remembers your conversations
- personal CRM without dashboard

**Tier 2 (category-defining, longer-term):**
- AI personal CRM
- relationship intelligence tool
- AI relationship assistant

## F.7 The business-model line (use sparingly, mainly in pitches)

> We don't sell software. We sell the outcome of your work getting done — Wisps is the AI that makes that possible, not the product itself.

**End of specification.**
