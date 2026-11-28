# Universal Principles of Design — Reference

100 principles from *Universal Principles of Design* by William Lidwell, Kritina Holden, and Jill Butler.
Each entry includes: definition, UI/UX application notes, and cross-references.

## Table of Contents

Principles are organized alphabetically. Jump to a section:

- [A](#80-20-rule) — 80/20 Rule through Attractiveness Bias
- [B–C](#baby-face-bias) — Baby-Face Bias through Convergence
- [C–D](#cost-benefit) — Cost-Benefit through Development Cycle
- [E–F](#entry-point) — Entry Point through Form Follows Function
- [F–G](#framing) — Framing through Gutenberg Diagram
- [H](#hicks-law) — Hick's Law through Highlighting
- [I–L](#iconic-representation) — Iconic Representation through Life Cycle
- [M–N](#mapping) — Mapping through Normal Distribution
- [O–P](#ockhams-razor) — Ockham's Razor through Proximity
- [R–S](#readability) — Readability through Symmetry
- [T–W](#threat-detection) — Threat Detection through Weakest Link

---

## 80/20 Rule
**Definition**: A high percentage of effects in any large system are caused by a low percentage of variables. ~80% of effects come from ~20% of causes (also: Pareto's Principle).
**UI/UX application**: Focus design and testing resources on the critical 20% of features that account for 80% of usage. Reevaluate the remaining 80% of features for removal or de-emphasis. When redesigning, improvements beyond the critical 20% yield diminishing returns.
**See also**: Cost-Benefit, Form Follows Function, Highlighting, Normal Distribution

## Accessibility
**Definition**: Objects and environments should be designed to be usable, without modification, by as many people as possible. Four characteristics: perceptibility, operability, simplicity, and forgiveness.
**UI/UX application**: Use redundant coding (text + icon + color). Ensure compatibility with assistive technologies (screen readers, alt text). Remove unnecessary complexity. Use progressive disclosure. Provide clear feedback and error recovery. Accommodate a wide range of literacy and ability levels.
**See also**: Affordance, Forgiveness, Legibility, Normal Distribution, Readability

## Advance Organizer
**Definition**: An instructional technique that helps people understand new information in terms of what they already know. Presented at a more abstract level than the content that follows.
**UI/UX application**: Use expository advance organizers for novel features (briefly describe what it is and what it does before details). Use comparative advance organizers when introducing updates to existing features (compare old vs. new). Effective in onboarding flows and documentation.
**See also**: Inverted Pyramid, Wayfinding

## Aesthetic-Usability Effect
**Definition**: Aesthetic designs are perceived as easier to use than less-aesthetic designs, whether they actually are or not. Early impressions influence long-term attitudes.
**UI/UX application**: Invest in visual polish — it creates positive first impressions that make users more tolerant of minor usability problems. Aesthetic designs foster positive emotional relationships, loyalty, and creative thinking. This is especially important in stressful or high-cognitive-load contexts.
**See also**: Attractiveness Bias, Form Follows Function, Golden Ratio, Law of Pragnanz, Ockham's Razor, Rule of Thirds

## Affordance
**Definition**: A property in which the physical characteristics of an object or environment influence its function. Round wheels afford rolling; handles afford pulling.
**UI/UX application**: Design interactive elements so their appearance signals how they should be used. Buttons should look pressable, sliders should look draggable. When affordances conflict with function (a door handle that must be pushed), the design fails. In software, leverage metaphors from physical objects (folders, trash cans, toggles). Negatively afford improper use where possible.
**See also**: Constraint, Mapping, Mimicry, Wayfinding

## Alignment
**Definition**: The placement of elements such that edges line up along common rows or columns, or their bodies along a common center.
**UI/UX application**: Align elements to create unity, cohesion, and visual stability. Left-aligned and right-aligned text blocks provide stronger alignment cues than center-aligned. Use grid systems. Justified text works well in complex compositions. Keep diagonal alignments at 30° or more apart for perceptibility. Misalignment should be intentional (to attract attention), not accidental.
**See also**: Aesthetic-Usability Effect, Good Continuation

## Archetypes
**Definition**: Universal patterns of theme and form resulting from innate biases or dispositions — found in myths, characters, imagery.
**UI/UX application**: Align branding, product personality, and design language with appropriate archetypes (hero, outlaw, sage, etc.). Archetypes influence perception on an unconscious, affective level — useful when traditional communication (language) can't carry the full message. Test archetype alignment with target populations, as reactions may vary across cultures.
**See also**: Affordance, Mimicry, Threat Detection

## Attractiveness Bias
**Definition**: A tendency to see attractive people (and by extension, things) as more intelligent, competent, moral, and sociable. Driven by both biological factors (symmetry, proportions) and environmental/cultural factors.
**UI/UX application**: Visual polish and attractiveness in UI design creates a halo effect — users attribute higher quality and trustworthiness to better-looking interfaces. In marketing contexts, consider biological attractiveness factors (symmetry, proportions) and cultural ones.
**See also**: Baby-Face Bias, Most Average Facial Appearance Effect, Waist-to-Hip Ratio

---

## Baby-Face Bias
**Definition**: A tendency to see people and things with baby-faced features (round, large eyes, small nose, high forehead) as more naive, helpless, and honest.
**UI/UX application**: Characters, mascots, and brand avatars with baby-face features (large eyes, round shapes) are perceived as more approachable, innocent, and trustworthy. Useful for onboarding, error states, and empty states. Mature features convey expertise and authority — use in contexts requiring credibility.
**See also**: Attractiveness Bias, Mimicry, Savanna Preference

## Chunking
**Definition**: Combining many units of information into a limited number of chunks so information is easier to process and remember. Short-term memory limit: ~4 ± 1 chunks.
**UI/UX application**: Break complex information into groups of 3–5 items (navigation menus, form sections, step indicators). Apply to tasks involving memory and recall, not scanning/searching tasks (don't limit dictionary entries to 4 per page). In noisy or stressful contexts, chunk even more aggressively.
**See also**: Errors, Mnemonic Device, Performance Load, Signal-to-Noise Ratio

## Classical Conditioning
**Definition**: A technique for associating a stimulus with an unconscious physical or emotional response. Pair the new stimulus with an existing trigger repeatedly.
**UI/UX application**: Consistent pairing of UI sounds, animations, or visual patterns with positive outcomes creates conditioned positive associations. Notification sounds, success animations, and brand sounds all leverage classical conditioning. Ensure pairings are consistent to build and maintain the association.
**See also**: Exposure Effect, Operant Conditioning, Shaping

## Closure
**Definition**: A Gestalt principle — people tend to perceive a set of individual elements as a single, recognizable pattern rather than separate elements, even filling in gaps.
**UI/UX application**: Use closure to reduce visual complexity. Logos, icons, and illustrations can omit lines/contours when the overall pattern is recognizable — making them more interesting because viewers participate in completion. In storytelling and onboarding, let users fill in logical gaps rather than explaining everything.
**See also**: Good Continuation, Law of Pragnanz, Proximity

## Cognitive Dissonance
**Definition**: The mental discomfort when attitudes, thoughts, or beliefs conflict. People alleviate it by reducing importance of the conflict, adding justifying thoughts, or changing beliefs.
**UI/UX application**: Engagement techniques that require time/energy investment create dissonance at the point of decision (free trials, profile setup). Use minimal incentives to drive attitude change — over-incentivizing lets people justify participation without changing beliefs. In persuasive design, create dissonance then offer a simple resolution.
**See also**: Consistency, Cost-Benefit, Hierarchy of Needs

## Color
**Definition**: Color attracts attention, groups elements, indicates meaning, and enhances aesthetics. Key dimensions: number of colors, combinations, saturation, and symbolism.
**UI/UX application**: Limit palettes to ~5 colors. Never use color as the sole information channel (accessibility). Use warm colors for foreground, cool for background. Light gray is safe for grouping without competing. Desaturated bright = friendly/professional; desaturated dark = serious/professional; saturated = exciting/dynamic. No universal color-emotion mappings exist — verify cultural meanings.
**See also**: Expectation Effect, Highlighting, Interference Effects, Similarity, Uniform Connectedness

## Common Fate
**Definition**: A Gestalt principle — elements moving in the same direction are perceived as more related than those moving differently or staying still.
**UI/UX application**: Group related animated elements by giving them shared motion direction, timing, and velocity. Moving elements are perceived as figure (foreground); stationary elements as ground. Used in loading animations, transitions, and data visualizations. Flickering/pulsing elements group by shared rhythm.
**See also**: Figure-Ground Relationship, Similarity

## Comparison
**Definition**: Illustrating relationships and patterns by representing two or more variables in a controlled way. Key techniques: apples-to-apples, single context, and benchmarks.
**UI/UX application**: In dashboards and reports, use common measures and units across compared items. Present related data in a single view (not across separate pages/screens). Always include benchmark data for context (past performance, competitors, industry standards). Use small multiples for pattern detection.
**See also**: Garbage In-Garbage Out, Layering, Signal-to-Noise Ratio

## Confirmation
**Definition**: A technique for preventing unintended actions by requiring verification before critical actions are performed. Two types: dialog confirmation and two-step operation.
**UI/UX application**: Reserve confirmations for critical or irreversible operations only — overuse trains users to ignore them. Dialog messages should be concise, end with a clear yes/no question, and use action verbs (not OK/Cancel). For less critical confirmations, offer an option to disable. Two-step operations (arm/fire) work for hardware and high-stakes actions.
**See also**: Constraint, Errors, Forgiveness, Garbage In-Garbage Out

## Consistency
**Definition**: Systems are more usable when similar parts are expressed in similar ways. Four types: aesthetic, functional, internal, and external.
**UI/UX application**: Aesthetic consistency (same fonts, colors, logo usage) builds recognition. Functional consistency (same controls for same actions) enables knowledge transfer. Internal consistency (within your product) builds trust. External consistency (with platform conventions) leverages existing user knowledge. Don't sacrifice clarity for consistency — "foolish consistency is the hobgoblin of little minds."
**See also**: Modularity, Recognition Over Recall, Similarity

## Constancy
**Definition**: The tendency to perceive objects as unchanging despite changes in sensory input (size, brightness, shape, loudness constancy).
**UI/UX application**: In 3D UIs, VR, simulations, and responsive design — changes in distance, perspective, and illumination should behave naturally. Use recognizable objects as reference points for scale. Be aware that background color and lighting can trick perception of element colors (especially in dark/light mode transitions).
**See also**: Color, Highlighting, Interference Effects, Orientation Sensitivity

## Constraint
**Definition**: Limiting the actions that can be performed on a system. Physical constraints (paths, axes, barriers) and psychological constraints (symbols, conventions, mappings).
**UI/UX application**: Dim or hide unavailable options. Use paths (scroll bars), axes (dials, sliders), and barriers (screen edges) to direct input. Use symbols for labeling/warning, conventions for predictable behavior ("red = destructive action"), and mappings for spatial relationships between controls and their effects. Constraints dramatically reduce errors.
**See also**: Affordance, Archetypes, Control, Errors, Forgiveness, Mapping

## Control
**Definition**: The level of control should relate to user proficiency. Beginners need less control (structured, guided); experts need more (direct, customizable).
**UI/UX application**: Provide two paths: a simple one for novices (menus, wizards) and a fast one for experts (keyboard shortcuts, command palettes). Limit to two methods per task — more adds unnecessary complexity. Conceal expert methods from beginners. For infrequently used systems (kiosks, onboarding), assume all users are first-time users. For complex, frequently-used systems, allow customization.
**See also**: Constraint, Flexibility-Usability Tradeoff, Hierarchy of Needs

## Convergence
**Definition**: A process by which similar characteristics evolve independently in unrelated systems due to similar environmental pressures.
**UI/UX application**: When multiple products independently arrive at the same interaction pattern, it's likely an effective solution. Study convergent patterns across competitors and adjacent products. Be cautious about innovating away from converged patterns — they may represent optimal solutions for shared constraints.
**See also**: Life Cycle

---

## Cost-Benefit
**Definition**: An activity will be pursued only if its benefits equal or exceed its costs. Costs and benefits can be financial, time-based, cognitive, or social.
**UI/UX application**: Reduce interaction cost for high-value tasks. Make the benefit of an action clear before asking users to invest effort. Sign-up walls, lengthy forms, and multi-step flows increase cost — ensure perceived benefit justifies them. Reduce cognitive cost through simplicity. Users satisfice: they pick "good enough" rather than optimizing.
**See also**: 80/20 Rule, Hierarchy of Needs, Performance Load, Satisficing

## Defensible Space
**Definition**: An environment designed to signal ownership, provide surveillance opportunities, and deter unauthorized access through physical and symbolic boundaries.
**UI/UX application**: In digital contexts, create clear boundaries between personal/private and public/shared spaces. Use visual cues for ownership (profile indicators, permission badges). Design admin interfaces to make access levels visible. In social products, give users control over their "territory."
**See also**: Hierarchy, Prospect-Refuge, Wayfinding

## Depth of Processing
**Definition**: Information processed at deeper levels (meaning, implication) is recalled more easily than information processed at shallow levels (appearance, sound).
**UI/UX application**: If you want users to remember something, engage them with its meaning — not just its surface appearance. Asking users to make judgments, comparisons, or decisions about information results in deeper processing and better retention than passive reading. Interactive tutorials outperform static documentation.
**See also**: Chunking, Exposure Effect, Mnemonic Device, Storytelling

## Development Cycle
**Definition**: All products progress through four stages: requirements, design, development, and testing. Each stage varies in its relative length and emphasis.
**UI/UX application**: Requirements must be thorough — errors here are the most expensive to fix later. Design should use prototyping to catch issues early. Development should proceed iteratively. Testing should happen continuously, not only at the end. Iterating through the cycle multiple times produces better designs than trying to get it right in one pass.
**See also**: Convergence, Errors, Iteration, Prototyping

---

## Entry Point
**Definition**: A point of physical or attentional entry into a design. Good entry points have minimal barriers, progressive lure, and provide orientation.
**UI/UX application**: Landing pages, splash screens, and home screens are critical entry points. Minimize barriers (registration walls, loading times, complex instructions). Use progressive lure — give a taste of value before asking for commitment. Provide orientation — make it clear what the product does and where to start. Entry points set the expectations for the entire experience.
**See also**: Advance Organizer, Framing, Gutenberg Diagram, Progressive Disclosure

## Errors
**Definition**: An action or omission that yields an unintended result. Two types: slips (unconscious, right intention, wrong action) and mistakes (conscious, wrong intention).
**UI/UX application**: Prevent slips through affordances and constraints. Prevent mistakes through clear communication and mental model alignment. Most errors are caused by poor design, not user incompetence. Minimize error consequences through reversibility (undo), safety nets, and confirmation for critical actions. Error messages should explain what happened and how to recover — never blame the user.
**See also**: Affordance, Confirmation, Constraint, Forgiveness, Garbage In-Garbage Out

## Expectation Effect
**Definition**: People's expectations influence their perception and behavior. Things conform to expectations through two mechanisms: self-fulfilling prophecy and experimenter bias.
**UI/UX application**: Users' prior experiences set expectations for your product. Meet or exceed platform conventions. If your design intentionally breaks expectations, signal the difference clearly. Placebo effects exist in design: perceived speed improvements (progress bars, animations) can satisfy users even without actual performance gains. Be cautious about user research — experimenter bias can skew results.
**See also**: Aesthetic-Usability Effect, Classical Conditioning, Cognitive Dissonance, Framing

## Exposure Effect
**Definition**: Repeated exposure to stimuli increases liking of them, even without conscious awareness. Most effective with brief, repeated exposures over long periods. Novel stimuli initially disliked become liked through exposure.
**UI/UX application**: Users become more comfortable with UI patterns through repeated exposure. New features may face initial resistance that fades over time. Subtle, consistent branding (color, shape, sound) builds positive association through repeated exposure. Be patient with novel design patterns — familiarity drives preference.
**See also**: Aesthetic-Usability Effect, Classical Conditioning, Cognitive Dissonance, Framing

## Face-ism Ratio
**Definition**: The ratio of face to body in an image influences perception. High face-ism = focus on intellect and personality. Low face-ism = focus on physical/sensual attributes.
**UI/UX application**: For profile photos, team pages, and about sections — high face-ism ratios (face fills image) communicate intelligence and authority. Low face-ism ratios communicate physicality. The perception is the same regardless of viewer or subject gender. Relevant for avatar design, user photos, and marketing imagery.
**See also**: Attractiveness Bias, Baby-Face Bias, Framing, Waist-to-Hip Ratio

## Factor of Safety
**Definition**: Using more elements than thought necessary to offset unknown variables and prevent system failure. Safety factor size corresponds to level of ignorance about design parameters.
**UI/UX application**: Design for more load, more users, more edge cases than you think you need. New/novel designs need larger safety factors. As designs prove reliable over time, safety factors can be cautiously reduced — but this usually continues until a failure occurs. Rate systems for their safe capacity, not their maximum theoretical capacity.
**See also**: Errors, Modularity, Structural Forms, Weakest Link

## Feedback Loop
**Definition**: A relationship where consequences feed back into the system as input. Positive feedback amplifies change (growth or decline). Negative feedback dampens output and stabilizes.
**UI/UX application**: Every user action should produce visible feedback (hover states, click responses, loading indicators, success/error messages). Positive feedback loops drive engagement (social validation, streaks, progress indicators) but need negative feedback loops to prevent burnout. Consider unintended feedback loops — e.g., more features → more complexity → more support requests → more features to fix support issues.
**See also**: Convergence, Errors, Shaping

## Fibonacci Sequence
**Definition**: A sequence where each number is the sum of the two preceding numbers (1, 1, 2, 3, 5, 8, 13...). Found throughout nature and classical art, music, and architecture. Closely related to the golden ratio.
**UI/UX application**: Use Fibonacci numbers for sizing scales (spacing, typography, layout proportions) — they produce naturally harmonious progressions. Don't contrive designs to incorporate Fibonacci sequences, but explore them when other aspects aren't compromised. Common in responsive breakpoints and modular scales.
**See also**: Aesthetic-Usability Effect, Golden Ratio, Most Average Facial Appearance Effect

## Figure-Ground Relationship
**Definition**: A Gestalt principle — elements are perceived as either figures (objects of focus) or ground (undifferentiated background). Stable relationships have clear figure/ground; unstable ones are ambiguous.
**UI/UX application**: Make primary content and CTAs clearly figure (closer, defined shape, below horizon line). Push secondary content and backgrounds to ground. Modals and overlays create explicit figure-ground separation. Lower-positioned elements are more likely perceived as figure. Use contrast, shadow, and layering to establish stable figure-ground relationships.
**See also**: Gutenberg Diagram, Law of Pragnanz, Top-Down Lighting Bias

## Fitts' Law
**Definition**: The time to move to a target is a function of target size and distance. Smaller and more distant targets take longer to reach. Speed-accuracy tradeoff: faster movement = more errors.
**UI/UX application**: Make important interactive targets (buttons, links, CTAs) large and close to the user's likely cursor/finger position. Screen edges and corners have effectively infinite height — put key controls there (macOS menu bar). Use constraints (scroll bars, snap points) to reduce homing movements. Make destructive actions harder to reach, not easier. Critical for touch interfaces where finger precision is limited.
**See also**: Constraint, Errors, Hick's Law

## Five Hat Racks
**Definition**: There are only five ways to organize information: Category, Time, Location, Alphabet, and Continuum (LATCH). Every organizational scheme is a variation of one of these.
**UI/UX application**: Category: when natural groupings exist (product types, feature areas). Time: for chronological data (activity feeds, history, timelines). Location: for spatial/geographic data (maps, store finders). Alphabet: for reference and lookup (contacts, indexes). Continuum: for ranked/measured data (search results, leaderboards). Choose the organization that best serves the user's task.
**See also**: Advance Organizer, Consistency, Framing

## Flexibility-Usability Tradeoff
**Definition**: As flexibility increases, usability decreases. "Jack of all trades, master of none." Flexible designs serve more functions but perform each less efficiently.
**UI/UX application**: Don't default to maximum flexibility — it increases complexity and cost. Favor specialization when users clearly know their needs. Favor flexibility when users can't anticipate future needs. Over a product's lifecycle, expect a general shift from flexibility toward specialization as user needs become better defined. Swiss Army Knife vs. chef's knife.
**See also**: 80/20 Rule, Convergence, Hierarchy of Needs, Life Cycle, Modularity, Progressive Disclosure

## Forgiveness
**Definition**: Designs should help people avoid errors and minimize negative consequences when errors occur. Strategies: good affordances, reversibility, safety nets, confirmations, warnings, help.
**UI/UX application**: Prefer affordances and reversibility (undo) over warnings and confirmations. If affordances are good, help is less necessary; if actions are reversible, confirmations are less necessary. Avoid cryptic error messages — state the problem and what to do about it. Too many confirmations/warnings = users ignore them. The amount of help needed is inversely proportional to design quality.
**See also**: Affordance, Confirmation, Errors, Factor of Safety

## Form Follows Function
**Definition**: Beauty results from purity of function and absence of ornamentation (descriptive). Aesthetic considerations should be secondary to functional ones (prescriptive).
**UI/UX application**: Use the descriptive interpretation as an aesthetic guide — functional clarity often produces timeless design. But don't follow the prescriptive interpretation blindly. Ask "what aspects are critical to success?" not "what ornament should I remove?" Success criteria — not dogmatic allegiance to form or function — should drive design decisions and tradeoffs.
**See also**: Aesthetic-Usability Effect, Exposure Effect, Ockham's Razor

---

## Framing
**Definition**: Manipulating how information is presented to influence decisions and judgment. Positive frames elicit risk-seeking behavior; negative frames elicit risk-avoiding behavior.
**UI/UX application**: "95% uptime" vs. "down 18 days per year." "Save $50" vs. "Don't lose $50." Frame features positively to encourage adoption, frame risks negatively to discourage harmful actions. Stress and time pressure amplify framing effects. Conflicting frames neutralize each other — present balanced frames when you want users to think independently.
**See also**: Expectation Effect, Exposure Effect

## Garbage In-Garbage Out
**Definition**: Output quality depends on input quality. Problems of type (wrong input kind) and problems of quality (right kind, but defective). Use affordances/constraints to prevent type errors; previews/confirmations to prevent quality errors.
**UI/UX application**: Structure form inputs to prevent bad data — use dropdowns, date pickers, validation, and input masks instead of freeform fields. Show previews before submission. Auto-fill from stored data where possible. For critical inputs, require independent verification. The redesigned form (constrained, previewed, validated) always outperforms the freeform one.
**See also**: Errors, Feedback Loop, Signal-to-Noise Ratio

## Golden Ratio
**Definition**: A ratio of approximately 0.618 (or 1.618) found throughout nature, art, and architecture. Whether the aesthetic preference is innate or learned is debated, but its influence on design is undeniable.
**UI/UX application**: Use golden ratio proportions for layout dimensions, card ratios, image crops, and typography scales when it doesn't compromise other objectives. Don't contrive designs around it. The golden rectangle (~1:1.618) is a common starting point for page and component proportions.
**See also**: Aesthetic-Usability Effect, Form Follows Function, Rule of Thirds, Waist-to-Hip Ratio

## Good Continuation
**Definition**: A Gestalt principle — elements arranged along a straight line or smooth curve are perceived as a group and as more related than unaligned elements. Lines are perceived as maintaining their established direction.
**UI/UX application**: Align related elements along continuous paths. In data visualization, arrange bar charts so endpoints form smooth lines for easier reading. Use visual continuity to guide the eye through a layout. Discontinuities break perceived relationships — use intentionally to separate unrelated groups. Used in camouflage patterns and can be exploited or avoided in UI grouping.
**See also**: Alignment, Chunking, Five Hat Racks, Uniform Connectedness

## Gutenberg Diagram
**Definition**: Describes the Z-pattern eye movement for evenly distributed, homogeneous information. Four quadrants: primary optical area (top-left), strong fallow area (top-right), weak fallow area (bottom-left), terminal area (bottom-right).
**UI/UX application**: For text-heavy pages with even distribution, place key information at top-left (headline), center (main content), and bottom-right (CTA, contact). Only applies to homogeneous layouts — for heterogeneous layouts, element weight and composition drive eye movement. Familiar users scan based on known content locations, not the diagram.
**See also**: Alignment, Entry Point, Progressive Disclosure, Serial Position Effects

---

## Hick's Law
**Definition**: Decision time increases with the number of alternatives. Applies to simple stimulus-response decisions, not to tasks involving complex reading or problem solving.
**UI/UX application**: Minimize options in time-critical decisions (emergency UI, checkout flows). Doesn't apply to complex menus involving reading and scanning (a 20-item alphabetical menu may be faster than a 5-item menu requiring comprehension). Reduce option counts through categorization and progressive disclosure. Train users on fewer response options for time-critical tasks.
**See also**: Errors, Fitts' Law, Progressive Disclosure, Wayfinding

## Hierarchy
**Definition**: Hierarchical organization is the simplest structure for visualizing and understanding complexity. Three visual forms: trees, nests, and stairs.
**UI/UX application**: Trees (org charts, sitemaps) for moderate-complexity overviews. Nests (Venn diagrams, containers) for grouping information and simple logical relationships. Stairs (outlines, file trees, accordions) for complex, evolving hierarchies — use progressive disclosure to manage depth. Visual hierarchy through size, weight, color, and position is fundamental to UI design.
**See also**: Advance Organizer, Alignment, Five Hat Racks, Layering, Proximity

## Hierarchy of Needs
**Definition**: Designs must satisfy low-level needs before higher-level needs can be addressed. Five levels: functionality → reliability → usability → proficiency → creativity.
**UI/UX application**: Don't invest in delight and polish if basic functionality is broken. The levels in order: (1) Functionality — does it work at all? (2) Reliability — does it work consistently? (3) Usability — is it easy and forgiving? (4) Proficiency — does it enable power use? (5) Creativity — does it enable users to create and innovate beyond the original purpose? Each level must be reasonably satisfied before the next becomes relevant.
**See also**: Accessibility, Aesthetic-Usability Effect, Flexibility-Usability Tradeoff

## Highlighting
**Definition**: A technique for drawing attention to an area of a design by visually contrasting it with other areas. Methods include bold/italic text, color, inverse, blinking, size changes, and enclosure.
**UI/UX application**: Limit highlighting to ~10% of the visible design — if everything is highlighted, nothing is. Bold and italic are most effective for text; color and size for graphical elements. Blinking and animation should be used sparingly (disruptive, accessibility concerns). Highlighting competes with itself — use a clear hierarchy of emphasis.
**See also**: Color, Interference Effects, Signal-to-Noise Ratio, von Restorff Effect

---

## Iconic Representation
**Definition**: Using pictorial images to improve recognition and recall. Four types: similar (image resembles concept), example (image of a common example), symbolic (image of a symbol associated with concept), and arbitrary (image with no relationship to concept, learned through repetition).
**UI/UX application**: Similar icons are easiest to understand (magnifying glass = search). Example icons work for concrete objects (a house = home). Symbolic icons leverage cultural convention (heart = like). Arbitrary icons require learning (hamburger menu). Use text labels alongside icons for clarity, especially for symbolic and arbitrary icons. Test icon comprehension with target users.
**See also**: Advance Organizer, Interference Effects, Recognition Over Recall

## Immersion
**Definition**: A state of mental focus so intense that awareness of the "real" world is lost, creating a sense of being in and interacting with an alternate reality.
**UI/UX application**: Support immersion through sensory saturation (rich visuals, sound, interaction), cognitive challenges matching user skill level, and minimal interruptions/distractions. Flow states emerge when challenge meets ability. Avoid breaking immersion with unnecessary confirmations, ads, or context switches. Most relevant for gaming, VR, and focused creative tools.
**See also**: Interference Effects, Performance Load

## Interference Effects
**Definition**: Mental processing of certain stimuli is impaired by the presence of other stimuli. Key types: Stroop (word meaning conflicts with visual), Garner (irrelevant variation slows processing), and proactive/retroactive interference (old/new memories conflict).
**UI/UX application**: Don't use color names in a different color than the name says (Stroop). Minimize irrelevant variation near critical information (Garner). Be cautious when redesigning familiar interfaces — old habits interfere with new patterns (proactive interference). Information presented close together in time or space can interfere with recall of each item.
**See also**: Chunking, Highlighting, Readability, Signal-to-Noise Ratio

## Inverted Pyramid
**Definition**: A method of information presentation in which the most important information is presented first, followed by decreasing levels of detail.
**UI/UX application**: Lead with the conclusion, key insight, or most important content. Follow with supporting details. End with background information. Essential for notifications, emails, search results, documentation, and any context where users scan rather than read. The inverted pyramid respects that most users won't read everything.
**See also**: Advance Organizer, Gutenberg Diagram, Progressive Disclosure, Serial Position Effects

## Iteration
**Definition**: A process of repeating a set of operations until a specific result is achieved. Each repetition is an iteration, and each result is used to refine the next.
**UI/UX application**: Complex designs almost never succeed on the first attempt. Build iteration into the design process — prototype, test, refine, repeat. The more complex the problem, the more iterations needed. Time box iterations rather than trying to achieve perfection in one pass. Embrace the "fail fast" philosophy to converge on good solutions efficiently.
**See also**: Development Cycle, Prototyping

---

## Law of Pragnanz
**Definition**: A Gestalt principle — people interpret ambiguous images in the simplest way possible. The brain prefers simple, regular, and symmetrical forms.
**UI/UX application**: Users will perceive UI elements in their simplest interpretation. Design with clean, simple forms that don't require complex interpretation. Reduce visual noise. When simplicity and complexity conflict, simplicity wins in user perception. This is why flat design, clean typography, and generous whitespace tend to test well.
**See also**: Closure, Figure-Ground Relationship, Ockham's Razor, Similarity

## Layering
**Definition**: The process of organizing information into related groupings and presenting them one at a time to manage complexity. Two types: two-dimensional (visual layers) and three-dimensional (depth).
**UI/UX application**: Use visual layering (color, weight, opacity) to separate information tiers — primary content, secondary metadata, background chrome. Use interaction layering (progressive disclosure, drill-down, expand/collapse) to reveal detail on demand. Maps are a classic example of layered information (terrain, roads, labels, POIs). Avoid revealing all layers simultaneously.
**See also**: Chunking, Hierarchy, Progressive Disclosure, Signal-to-Noise Ratio

## Legibility
**Definition**: The visual clarity of text, influenced by size, typeface, contrast, text block, and spacing. Distinct from readability (ability to understand).
**UI/UX application**: Use high-contrast text (dark on light or light on dark). Set body text at 9–12pt for print, 14–18px for screens. Use common, well-designed typefaces. Limit line length to 45–75 characters. Avoid all-caps for body text (reduced legibility). Provide adequate line height (1.4–1.6× font size). Ensure legibility across device sizes and viewing conditions.
**See also**: Accessibility, Readability

## Life Cycle
**Definition**: All products progress through stages of creation: introduction, growth, maturity, and decline. Needs and priorities change at each stage.
**UI/UX application**: Introduction: focus on core value proposition and early adopters. Growth: scale features and reach. Maturity: optimize, refine, defend market position. Decline: simplify, sunset gracefully, or pivot. Design decisions should match the product's current life stage — introducing new complex features during decline rarely succeeds.
**See also**: Convergence, Development Cycle, Flexibility-Usability Tradeoff

---

## Mapping
**Definition**: A relationship between controls and their effects. Good mapping between controls and their effects reduces learning time and errors.
**UI/UX application**: Controls should be spatially and conceptually close to what they affect. Stove knob layout should match burner layout. Toggle switches should be near the element they toggle. Scrollbar position should indicate content position. Natural mapping (moving a control up makes something go up) is always preferred over arbitrary mapping. Poor mapping is one of the most common causes of user error.
**See also**: Affordance, Constraint, Visibility

## Mental Model
**Definition**: A person's internal understanding of how a system works. People form mental models through experience and inference, then use them to predict system behavior.
**UI/UX application**: Your design's interaction model should match users' mental models of how it should work. Research existing mental models before designing. When your model must differ from expectations, provide strong onboarding and feedback to help users build an accurate new model. "It's intuitive" usually means "it matches existing mental models." File/folder metaphors persist because the mental model is deeply ingrained.
**See also**: Affordance, Advance Organizer, Mapping, Visibility

## Mimicry
**Definition**: The act of copying properties of familiar objects, organisms, or environments to gain the benefits of those properties.
**UI/UX application**: Skeuomorphic design (leather textures, paper shadows) leverages mimicry to help users understand digital interfaces. Even flat design retains mimicry at a conceptual level (toggle switches, folders, trash). Use mimicry to transfer user knowledge from physical to digital contexts. Surface mimicry (purely visual) is less valuable than behavioral mimicry (matching how the real-world analog actually works).
**See also**: Affordance, Archetypes, Classical Conditioning

## Mnemonic Device
**Definition**: A method for reorganizing information to make it easier to remember. Common types: rhyme, acronym, keyword, feature, and image mnemonics.
**UI/UX application**: Use memorable patterns for systems users must recall: keyboard shortcuts with meaningful letters (Ctrl+B = Bold), acronyms for processes (LATCH for organization methods), and consistent spatial positions for navigation items. Icons serve as visual mnemonics. Reduce reliance on recall by favoring recognition-based interfaces.
**See also**: Chunking, Depth of Processing, Recognition Over Recall

## Modularity
**Definition**: Managing system complexity by dividing large systems into smaller, self-contained parts (modules) that can be independently created, modified, replaced, and reused.
**UI/UX application**: Design systems and component libraries are modularity applied to UI. Modular components (cards, modals, form elements) can be assembled into different configurations. Modules should have clear interfaces and minimal dependencies. Modularity enables parallel work, easier testing, and incremental updates. The tradeoff: modular systems require upfront architecture investment.
**See also**: Consistency, Flexibility-Usability Tradeoff, Hierarchy

## Most Average Facial Appearance Effect
**Definition**: A tendency to prefer faces with averaged features (closer to the population mean). Average faces are perceived as more attractive than distinctive faces.
**UI/UX application**: In UI design, "average" often means "familiar and comfortable." Designs that feel familiar and expected (adhering to conventions) tend to be preferred over novel, distinctive designs — at least initially. This parallels the exposure effect. Relevant for illustration styles, avatar design, and brand character design.
**See also**: Attractiveness Bias, Exposure Effect, Golden Ratio, Savanna Preference

## Normal Distribution
**Definition**: A bell-curve distribution where most values cluster around the average, with fewer at the extremes. Most physical and psychological attributes follow this pattern.
**UI/UX application**: Design for the middle of the bell curve (the majority) first, then accommodate the tails. Input validation ranges, default settings, and breakpoints should target the most common user context. Accessibility considerations specifically target the tails of the distribution. Performance testing should use realistic load distributions, not just averages or peaks.
**See also**: Accessibility, Cost-Benefit, Hierarchy of Needs

---

## Ockham's Razor
**Definition**: Given multiple solutions that address a problem equally well, the simplest solution should be selected. Simplicity means the fewest assumptions and the smallest conceptual surface area.
**UI/UX application**: When two designs solve the same problem equally well, choose the simpler one. Complexity should be added only when it addresses a demonstrated need. Features should be challenged: does removing this feature materially hurt the user experience? "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."
**See also**: Form Follows Function, Law of Pragnanz

## Operant Conditioning
**Definition**: A learning technique where behaviors are modified by consequences: positive reinforcement (reward), negative reinforcement (removal of unpleasant stimulus), punishment, and extinction.
**UI/UX application**: Reward desired behaviors (success animations, achievement badges, progress indicators). Variable-ratio reinforcement schedules (unpredictable rewards) produce the most persistent engagement — but use ethically. Fixed-interval schedules (daily rewards) create predictable return patterns. Punishment (error penalties) should be minimal and educational. Don't accidentally train users to ignore your UI through extinction (unrewarded clicks, ignored feedback).
**See also**: Classical Conditioning, Exposure Effect, Shaping

## Orientation Sensitivity
**Definition**: People are better at detecting and processing horizontal and vertical elements than oblique (diagonal) ones. This bias affects response times, accuracy, and perception.
**UI/UX application**: Use horizontal and vertical orientations for primary layout, information hierarchy, and navigation. Diagonal elements require more cognitive effort and can feel unstable — use sparingly for intentional dynamism. Grid-based layouts align with this natural processing preference. Text should always be horizontal.
**See also**: Alignment, Constancy, Figure-Ground Relationship

---

## Performance Load
**Definition**: The greater the effort required to accomplish a task, the lower the probability of successful completion. Two types: cognitive load (thinking effort) and kinematic load (physical effort).
**UI/UX application**: Reduce cognitive load by eliminating unnecessary decisions, using chunking, leveraging recognition over recall, and providing defaults. Reduce kinematic load by minimizing steps, clicks, scrolling, and data entry. Automate calculations and transformations. Pre-fill known information. Every additional step in a funnel reduces completion rates.
**See also**: 80/20 Rule, Chunking, Hick's Law, Recognition Over Recall

## Performance Versus Preference
**Definition**: What people prefer and what actually performs better are often different. Users often prefer designs that lead to lower performance.
**UI/UX application**: Don't rely solely on user preference when evaluating designs. Measure actual performance (task completion, error rate, time on task) alongside stated preference. A/B tests measuring outcomes are more reliable than user surveys asking preferences. Users may prefer visual complexity but perform better with simplicity. Always validate preference with performance data.
**See also**: Aesthetic-Usability Effect, Expectation Effect, Form Follows Function

## Picture Superiority Effect
**Definition**: Pictures are remembered better than words. Recognition memory for pictures is superior to that for text.
**UI/UX application**: Use images alongside text for critical information that must be remembered (instructions, warnings, tutorials). Icons + labels outperform labels alone for navigation. In data presentation, visualizations and charts are remembered better than tables of numbers. Use imagery in onboarding and educational contexts. Most effective when pictures and words reinforce the same concept.
**See also**: Iconic Representation, Redundancy

## Progressive Disclosure
**Definition**: A strategy for managing information complexity by presenting only necessary or requested information at each level.
**UI/UX application**: Show the minimum information needed at each step. Provide "More info," expand/collapse, drill-down, and layered navigation to let users access detail on demand. Reduces errors, cognitive load, and visual clutter. Essential for complex applications — settings panels, admin tools, data-heavy dashboards. The primary interface should be simple; complexity is available but not forced.
**See also**: 80/20 Rule, Chunking, Hick's Law, Hierarchy, Layering

## Prospect-Refuge
**Definition**: A preference for environments with a clear view (prospect) and a place to hide or retreat (refuge). Derived from evolutionary survival advantages.
**UI/UX application**: In spatial interfaces (games, VR, architectural visualization), open views paired with protected vantage points feel comfortable. In UI metaphor, users prefer interfaces that give them overview (prospect) while maintaining a sense of control and safe haven (undo, home button, escape routes). Dashboard designs satisfy prospect; familiar navigation patterns provide refuge.
**See also**: Defensible Space, Savanna Preference, Wayfinding

## Prototyping
**Definition**: Creating simplified models of a design to explore, test, and refine concepts. The purpose is to learn, not to produce a final product.
**UI/UX application**: Prototype early and often. Low-fidelity prototypes (paper, wireframes) are best for exploring concepts and getting early feedback. High-fidelity prototypes (interactive mockups) are best for testing detailed interactions and usability. Prototypes should be disposable — attachment to prototype fidelity impedes iteration. Test prototypes with real users in realistic scenarios.
**See also**: Development Cycle, Iteration

## Proximity
**Definition**: A Gestalt principle — elements that are close together are perceived as more related than elements that are far apart.
**UI/UX application**: Group related elements by placing them close together. Separate unrelated groups with whitespace. In forms, labels should be closer to their corresponding inputs than to adjacent inputs. Navigation items within a group should be closer to each other than to items in other groups. Proximity is one of the most powerful and simplest grouping tools available. It often trumps other visual cues (color, shape) for perceived relatedness.
**See also**: Chunking, Closure, Uniform Connectedness

---

## Readability
**Definition**: The degree to which text is understandable based on the complexity of words and sentences. Distinct from legibility (visual clarity).
**UI/UX application**: Use simple, common words. Keep sentences short. Use active voice. Structure information with the inverted pyramid. Match reading level to audience — err on the side of simpler. Technical jargon is acceptable for expert audiences but should be avoided or explained for general audiences. Test readability with standardized measures (Flesch-Kincaid, etc.).
**See also**: Accessibility, Legibility

## Recognition Over Recall
**Definition**: Memory for recognizing things is better than memory for recalling them. Recognition cues trigger memory retrieval; recall requires unaided retrieval.
**UI/UX application**: Favor recognition-based interfaces over recall-based ones. Use menus, icons, and visible options instead of requiring users to remember commands. Show recently used items, suggestions, and autocomplete. Don't make users remember information from one screen to use on another — carry context forward. Search should offer suggestions, not demand exact recall.
**See also**: Chunking, Iconic Representation, Mnemonic Device, Visibility

## Redundancy
**Definition**: Using more elements than necessary to maintain system performance in case of component failure. Same-function redundancy (backup of the same type) and diverse-function redundancy (backup of a different type).
**UI/UX application**: Provide multiple ways to accomplish the same task (menu + keyboard shortcut + toolbar button). Use redundant coding for critical information (color + icon + text for alerts). In error-prone processes, use diverse redundancy (automated + manual verification). For critical systems, ensure no single point of failure in the user's path to key outcomes.
**See also**: Accessibility, Factor of Safety, Modularity

## Rule of Thirds
**Definition**: A composition technique dividing a display into thirds (horizontally and vertically), with important elements placed along the lines or at intersections.
**UI/UX application**: Position key UI elements (CTAs, hero images, focal points) at rule-of-thirds intersections rather than dead center. Creates more dynamic, engaging compositions than centered layouts. Effective for hero sections, card layouts, dashboard widgets, and any composition where visual interest matters. Not a rigid rule — a starting point for composition.
**See also**: Alignment, Golden Ratio, Gutenberg Diagram

---

## Satisficing
**Definition**: People select the first option that adequately satisfies their needs ("good enough") rather than continuing to search for the optimal option. Coined by Herbert Simon.
**UI/UX application**: Users won't evaluate all options — they'll pick the first one that seems good enough. Place the most important/recommended options first. Default selections should be the best choice for most users. Don't assume users will read all options in a long list. Simplify choices: users overwhelmed by too many options may not choose at all (choice paralysis).
**See also**: Cost-Benefit, Hick's Law, Progressive Disclosure

## Savanna Preference
**Definition**: A preference for environments resembling the African savanna — open, grassy spaces with scattered trees and water, offering prospect and refuge.
**UI/UX application**: In spatial design (games, VR, environments), savanna-like qualities (openness, natural elements, water features) generate positive emotional responses. In UI, the metaphorical equivalent is clean, spacious layouts with clear visual landmarks and natural imagery. Background imagery featuring natural landscapes tends to be preferred over urban scenes.
**See also**: Defensible Space, Prospect-Refuge

## Scaling Fallacy
**Definition**: The assumption that a design that works at one scale will work at a different scale. Properties of a system often change disproportionately when scaled.
**UI/UX application**: A design that works for 100 users may break at 10,000 users. An interface optimized for desktop may not work on mobile (not just layout — the entire interaction paradigm may need rethinking). Organizational processes that work for a 5-person team don't scale to 50 without redesign. Always test at the intended scale.
**See also**: Development Cycle, Factor of Safety

## Self-Similarity
**Definition**: A form made up of parts similar to the whole (a property of fractals). Found throughout nature in trees, coastlines, mountains, and blood vessels.
**UI/UX application**: Self-similar patterns in UI create visual harmony and consistency at different scales. A card component that mirrors the overall page layout. Navigation patterns that repeat at different levels of hierarchy. Design systems inherently leverage self-similarity — components share visual DNA with the overall system. Self-similar compositions feel naturally "right."
**See also**: Fibonacci Sequence, Golden Ratio, Modularity

## Serial Position Effects
**Definition**: Items at the beginning (primacy) and end (recency) of a list are remembered better than items in the middle.
**UI/UX application**: Place the most important items at the beginning and end of lists, menus, and navigation bars. The middle positions receive the least attention and recall. In onboarding flows, make the first and last steps the most impactful. For critical information, use the primacy position (first item) or recency position (last item), never the middle.
**See also**: Advance Organizer, Inverted Pyramid, von Restorff Effect

## Shaping
**Definition**: A conditioning technique in which desired behaviors are taught by reinforcing increasingly close approximations to the target behavior.
**UI/UX application**: Onboarding should guide users through progressive steps toward proficiency — rewarding each small step (profile setup, first action, first achievement). Tooltips and coach marks shape behavior by highlighting the next small step. Gamification mechanics (leveling, unlocking features) are shaping in action. Never expect users to learn complex behaviors in one step.
**See also**: Classical Conditioning, Feedback Loop, Operant Conditioning

## Signal-to-Noise Ratio
**Definition**: The ratio of relevant to irrelevant information in a display. High signal-to-noise = clear communication. Every unnecessary element degrades signal.
**UI/UX application**: Maximize data-ink ratio — every visual element should communicate information. Remove decorative gridlines, unnecessary labels, redundant chrome, and visual clutter. Minimize non-data ink in charts and graphs. In UI, reduce visual noise (excessive borders, shadows, dividers) that doesn't communicate structure. Flat design principles are largely about improving signal-to-noise ratio.
**See also**: Chunking, Highlighting, Layering, Ockham's Razor, Performance Load

## Similarity
**Definition**: A Gestalt principle — elements that share visual characteristics (shape, color, size, orientation) are perceived as related.
**UI/UX application**: Use consistent visual treatment for functionally related elements. All primary buttons should look the same; all section headers should look the same. When similarity is high between elements that should be distinguished, introduce intentional contrast. Similarity grouping can conflict with proximity grouping — use both consistently to avoid ambiguity.
**See also**: Color, Common Fate, Proximity, Uniform Connectedness

## Storytelling
**Definition**: A method of communicating information through narrative. Stories engage more cognitive resources than facts alone, creating deeper processing and better recall.
**UI/UX application**: Frame product features as user stories and journeys, not feature lists. Case studies, testimonials, and scenario-based documentation leverage storytelling. Onboarding narratives ("Here's what you can accomplish") outperform feature tours. In presentation design, narrative structure (setup → conflict → resolution) is more compelling than bullet points.
**See also**: Depth of Processing, Exposure Effect, Immersion

## Structural Forms
**Definition**: There are three fundamental structural forms for distributing loads: mass (solid material), frame (interconnected struts), and shell (thin outer surface).
**UI/UX application**: In software architecture (conceptually): mass structures are monolithic systems (simple but heavy); frame structures are modular, service-oriented systems (efficient but require careful connection design); shell structures are thin-client/API approaches (elegant but fragile at connection points). The metaphor extends to UI: dense interfaces (mass), component-based layouts (frame), and minimal-surface designs (shell).
**See also**: Factor of Safety, Modularity, Weakest Link

## Symmetry
**Definition**: A property where a form remains unchanged after a transformation (reflection, rotation, or translation). Symmetrical forms are perceived as more aesthetically pleasing and stable.
**UI/UX application**: Symmetrical layouts convey stability, formality, and balance — appropriate for corporate, institutional, and trust-critical contexts (banking, healthcare). Asymmetrical layouts convey dynamism and modernity. Use symmetry as a foundation, then introduce controlled asymmetry for visual interest. Reflective symmetry (mirrored left-right) is the most commonly used in UI.
**See also**: Alignment, Aesthetic-Usability Effect, Golden Ratio

---

## Threat Detection
**Definition**: An ability to detect threatening stimuli more efficiently than nonthreatening stimuli. Angular, sharp forms are detected faster than curved, rounded forms.
**UI/UX application**: Warning icons, error states, and destructive action buttons can leverage angular/sharp forms to convey urgency and danger. Rounded, curved forms communicate safety and friendliness. In data visualization, threat/critical states should use angular markers. In marketing and brand, be intentional about the emotional weight of sharp vs. rounded design language.
**See also**: Archetypes, Face-ism Ratio, Savanna Preference

## Three-Dimensional Projection
**Definition**: The representation of three-dimensional objects in two-dimensional space. Common techniques: isometric, oblique, and perspective projection.
**UI/UX application**: Use 3D projection intentionally — it adds visual complexity. Isometric projections are useful for architectural/technical diagrams and some game UIs. Perspective depth cues (shadows, blur, size gradients) establish visual hierarchy in flat UIs. Material Design's elevation system is a form of 3D projection. Avoid gratuitous 3D in charts — it distorts data perception.
**See also**: Constancy, Figure-Ground Relationship, Top-Down Lighting Bias

## Top-Down Lighting Bias
**Definition**: A tendency to interpret shaded objects as three-dimensional and lit from above. Shapes with light tops and dark bottoms appear convex (raised); the reverse appears concave (inset).
**UI/UX application**: UI elements that should appear raised (buttons, cards, modals) should have lighter top edges and darker bottom edges/shadows. Elements that should appear inset (input fields, wells) should reverse this. This bias is deeply ingrained and largely universal. Breaking it (bottom-lit elements) creates an uncanny, unstable feeling. Drop shadows should fall downward, not upward.
**See also**: Figure-Ground Relationship, Three-Dimensional Projection

## Uncertainty Principle
**Definition**: The act of measuring or observing a system inevitably alters it. You cannot measure/observe a system without introducing change.
**UI/UX application**: Usability testing changes user behavior — participants act differently when observed. A/B tests alter the experience being measured. Analytics instrumentation adds load. Surveys about satisfaction change how users think about their satisfaction. Design research methods should account for their own influence. Use unobtrusive measures (behavioral data) alongside observed measures (testing) for a more complete picture.
**See also**: Errors, Expectation Effect, Feedback Loop

## Uniform Connectedness
**Definition**: Elements that are visually connected (by lines, common regions, or other visual properties) are perceived as more related than elements not connected.
**UI/UX application**: Use containers (cards, panels, bordered regions) to group related elements. Use connecting lines for explicit relationships (flowcharts, hierarchies). Shared background color or texture creates implicit grouping. Uniform connectedness is one of the strongest Gestalt cues — it can override proximity and similarity. Use it for critical grouping relationships that must be unambiguous.
**See also**: Closure, Good Continuation, Proximity, Similarity

---

## Visibility
**Definition**: The usability of a system improves when the system's status and methods of use are clearly visible.
**UI/UX application**: System state should always be visible — loading states, progress indicators, selection states, mode indicators. Available actions should be discoverable without recall. Hidden features are features that don't exist (to most users). Use progressive disclosure to manage complexity while keeping current options visible. "Out of sight, out of mind" is literally true for UI elements.
**See also**: Affordance, Feedback Loop, Mapping, Recognition Over Recall

## von Restorff Effect
**Definition**: A unique or distinctive item in a group is remembered better than common items (also called the isolation effect or novelty effect).
**UI/UX application**: Make the most important element on a page visually distinctive from everything else. "Recommended" plan badges, featured items, and primary CTAs all leverage this effect. Use contrast in color, size, shape, or animation to create isolation. Works best when only one element is isolated — multiple isolated elements cancel each other out (same problem as over-highlighting).
**See also**: Highlighting, Serial Position Effects, Signal-to-Noise Ratio

## Waist-to-Hip Ratio
**Definition**: A preference for specific body proportions (0.70 for women, 0.90 for men) as indicators of health and fertility. Cross-culturally consistent preference.
**UI/UX application**: Primarily relevant to character design, illustration, avatar systems, and marketing imagery. In broader UI terms, the principle suggests that proportional harmony matters — elements with balanced, natural-feeling proportions are perceived more positively than distorted ones.
**See also**: Attractiveness Bias, Face-ism Ratio, Golden Ratio

## Wayfinding
**Definition**: The process of using spatial and environmental information to navigate to a destination. Four stages: orientation, route decision, route monitoring, and destination recognition.
**UI/UX application**: Users need to know: Where am I? Where can I go? How do I get there? How do I know I've arrived? Provide breadcrumbs, clear navigation labels, progress indicators, page titles, and visual landmarks. Use consistent information architecture. Provide multiple wayfinding aids for complex applications (search, navigation, sitemap, breadcrumbs). Environmental cues (color coding by section, persistent navigation) reduce cognitive load.
**See also**: Affordance, Constraint, Hierarchy, Mapping, Visibility

## Weakest Link
**Definition**: A system is only as strong as its weakest component. The weakest link determines overall system performance and reliability.
**UI/UX application**: Identify and strengthen the weakest point in user flows — the step with the highest drop-off, the most confusing screen, the slowest-loading page. Security is only as strong as the weakest access point. A beautifully designed app with a broken checkout flow fails at its weakest link. Regularly audit for weakest links: error rates, support tickets, abandonment data, and heat maps all reveal them.
**See also**: Errors, Factor of Safety, Redundancy
