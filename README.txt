GURPS javascript character sheet package
version 1.11
Jim Thurmond; January 2020

Use this package by simply opening one of the html files in the "csheets"
directory.  You don't even need to have internet access, after installation.

This package is fully functional using Chrome (66+, maybe earlier versions),
Firefox (version 15+), Vivaldi (2.4), and Safari (11+, maybe 10+).

In supported browsers, you can:

1. create characters using 3rd or 4th edition (or 4th edition Lite) GURPS rules,

2. save characters as local files,

3. open, edit, and print saved files,

4. view and edit many things on the sheet - mouse over stuff.


The basic package comes with the 3rd-edition (plus Compendia) and 4th-edition
rulesets (both Basic and Lite); comprising all the advantages, disadvantages,
skills, spells, equipment, and templates therein.

At some point in the future, you will be able to download/access
supplementary rulesets using some kind of (probably fee-based) online tool.
A few are available now, with free access (this may change later):
Low Tech, Magic (2nd and 3rd editions), Ultra Tech, and Fantasy Folk.
Using these requires internet access.

Anything else you might want can be created using the customizing machinery
in the dialogs for attaching each of these things to a character sheet.

GURPS is a trademark of Steve Jackson Games, and its rules and art are copyrighted by Steve Jackson Games.
All rights are reserved by Steve Jackson Games. This game aid is the original creation of James Thurmond
and is released for free distribution, and not for resale, under the permissions granted in the
<a href="http://www.sjgames.com/general/online_policy.html">Steve Jackson Games Online Policy</a>.


New in version 1.11:
- Restored the background image for the custom armor form.
- Better support for "stacked" Magery types. (E.g., some "full" Magery with some
  aspected Magery on top of that.)
- Added a Core-Rules Only filter to Ads/Disads, Skills, and Equipment dialog boxes.
  These filters are specific to Third Edition rules, and remove everything except
  what appears in the Basic Set (items in the Appendix are not filtered out).
- Traits with modifiers or descriptions are now displayed with an open-close
  toggle, so that you can choose whether to show all the details.  These details
  are now printed on multiple lines when they are shown, for better clarity.
- Rules regarding magical Runes and improvised spells are now better supported.
- Finished (finally) filling in spell stats for the Magic2e library.
- Custom Wildcard skills (4th edition) are now supported.
- Instabilities in the code for re-ordering various lists (skills, traits, and
  equipment) have been greatly improved.  Equipment items in these lists are
  printed with a little more detail, so you can tell your two broadswords apart.
- The Third Editions sheets can now display split HT stats for characters with
  Extra or Reduced Hit Points traits.
- More improvements to styling and rendering.


New in version 1.10:

- Library reports can now be generated from the menu: File → Reports.
  These are pretty useful, if I do say so myself, especially if you have
  imported supplemental libraries.
  Column sorting (where present) is ludicrously slow; use with a sense of humor.
- Added three new character sheets:  a new sheet designed for NPCs, one with a
  more modern look, and a Dungeon Fantasy sheet.
- New "print blank" option for printing character sheets that can be filled in
  by hand.  Fixed some printing problems.
- "Natural" weapons (fists, teeth, claws, etc.) have been added to the Weapon
  tables.  Damage adjustments for Brawling, Karate, and Boxing are calculated.
  You can (but do not need to) "wield" these weapons, to change the displayed
  Parry score and damage.  Note that you can "buy" these natural weapons without
  having taken the required advantages.
- Made some improvements to handling of units for height, weight, costs, etc.
- New characters now have a "non" option for gender.  There are also new line
  drawings for non-human characters (and a "blank") available in the character
  creation dialog.
- Created a supplemental library for Fantasy Folk (2nd edition), compatible with
  GURPS 3rd Edition rules.  It's incomplete; I do not yet support 3e Split ST
  (I'm not at all sure I ever will), so the Centaur/Onocentaur, Giant, Dolphin,
  Ogre, and Sasquatch races were omitted.
- Saved sheets should now be more stable (unusual text characters were causing
  problems in re-loading).
- Reworked how the Magery advantage is handled in the 4th Edition library.
  Downside: Magery-0 is now a separate advantage; you must take it as a prere-
  quisite to any further Magery.
  Upsides: costs for college-aspected and other Limited forms of Magery are now
  correctly calculated, AND you can take combinations (like two levels of "full"
  Magery and then a separate level of sun-aspected Magery, for instance).
- The Templates dialog box now displays a summary for the template selected in
  the menu.
- Added a lot of equipment from Compendium II that was somehow missed before to
  the 3rd-edition library.
- Clothing is now found under Armor, and can be "worn" on character sheets.
- Added little X "close" buttons to all of the Dialog boxes, and implemented
  closing when the Escape key is typed.
- Installed Steve Jackson Games disclaimers in the README documentation, [on the
  JCSP web page,] and in the menu on each character sheet.
- More improvements to the random character generation software.
  Someday I'll be happy with this, but not yet.
- Improved styling and layout of various dialog forms.  Also improved web-based
  styling (scroll bars, responsiveness, etc.) in many places in various sheets.


New in version 1.9:

- Fixed rounding error reported by Kraydak (GURPS Forum: JCSP, 2016-11-19).
- Tuned up Edit Linkers machinery.
- Mouseovers for virtual points now display half-points as fractions, when that
  is the preference.
- Added name-generation to the New Character dialog random character form.
- Fixed half a dozen bugs in the random character generation code.
- Jazzed up the Green theme, and darkened Green and Metal a bit (they were a
  little hard to read).
- The 3rd-edition skill Thrown Weapon clearly requires a specialization;
  this is now enforced.
- Fixed some issues with text areas (Character Story/Notes) in some sheets.
- Fixed a bug which caused custom spells to lack the Magery adjustment.
- Added a Water theme.
- All Quirks from Basic pp. 162-165 in the basic4e_library.js file were entered
  as 1-point advantages, i.e., as Perks. Fixed.
- Changed the extension used for saving files from .gurps to .jcsp
- Re-implemented Character Art panels using background-image CSS.  Much better
  control over positioning and size, so it is now nicer to unedited images.
- Implemented a Reports menu command and one report (Spell Colleges).
- In the New Character / Random form, 'generate random name' is now disabled
  when there is no generator. Only available for elves, dwarves, orcs, goblins.
- Implemented (min)TL filtering and sorting for the Skills dialog menu.
- Reputation display is improved.
- Changes to calculation and title annotation of active defenses.
  Shield DB is no longer included in Dodge or Parry by default
  (it only applies to front/side attacks: B374).
- I added Paths to the Spells list (and in their respective College groups).
  If you take them as Spells, they show up in the Grimoire.
  They're still in Skills too.
- Poisons skill didn't have Tech Levels ticked in the 4e library. Fixed.
- Tweaked the Hit Location tables in the Jim4e and 4e2pg_landscape2 sheets,
  adding a column for random hit rolling.
- Implemented a toggle-able overlay of body part DR in Character Art blocks.
- The 4e Lifting ST advantage now actually affects Basic Lift (and thus
  Encumbrance), as intended. This is the way to buy “extra encumbrance” in 4e.
- Noticed that Musical Ability was not linked to Singing or Musical Instrument
  skills because the Adjustment object in the 3e library was using a non-
  existant group - added it.
- Fixed a bug in the Skill attribute default code that would sometimes return
  a level of zero when an attribute default should apply.
- Did some work on Move, Swim, Flight and their modifiers.
- The Build Auto-Adjust preference now defaults to 'off'.
- Added support for the Enhanced Parry (bare hands) and Enhanced Parry
  (Weapon) advantages.
- Ambidextrous characters can now wield a 'dominant hand' weapon in each hand.
- Made a basic library for the GURPS Lite 4th edition rules.
- Dialog boxes now pop in front of other open dialogs when opened, clicked,
  or grabbed by the mouse. Updated styling of dialog boxes too.
- Stealth skill now shows the penalty for encumbrance level.
- The cost for Talents in a 3rd-edition sheet was using the same formula as for
  4th-edition sheets, which was incorrect. In 3rd, a Talent is called a
  “Group Skill Bonus”, and it costs a flat 6 pts per level,
  regardless of the number of skills in the group (Compendium I, pg177);
  Group Skill Bonuses for characters in 3rd-edition sheets now work this way.
- Users can now load any of the three available basic rulesets into any
  character sheet.  When the sheet does not “match” the ruleset being used, that
  ruleset is displayed prominently at the right of the toolbar.


version 1.8 (November 2016) Addendum

After a quick bug-spotting, I have updated the 'live' code on the site for v1.8;
I will not be updating the code for download until the next release. The bug in
question affected the cost calculations for certain modified traits.



New in version 1.8:

- Restored the 'load into Use Template menu' option for Save As Template.
- Themes have gotten some attention, and there are two new ones.
- The "Import Library" function has been removed, I hope temporarily.
- Added a 3rd-edition NPC card character sheet.
- Added a single-page 4th-edition sheet based on the 4e remix.
- The armor coverage forms in the Select Armor: Custom and Edit Equipment
  dialogs got a makeover.
- Added a 'Quality Group' filter to Weapons dialog.
- PD/DR now shown below menu in 3e Select Armor dialog (was only showing DR).
- Added some grenades the to 3e library.
- Equipment items that are measured, rather than counted (i.e. rope, wine, etc.)
  are now handled better.  No more "rations, travellers'es, 5" on sheets.
- Edited the Chainmail items in the 3e library to more accurately reflect note
  at the bottom of B210.  Fixed a bug in PD/DR calculation affecting chainmail.
  Resolved how to deal with complex armor layering, like cloth + chain + plate,
  where there are odd 3e rules and weird possible interpretations.
- The Random Character Generation functionality has been substantially improved.
- Various bugs and display issues were addressed.  Display and calculation of
  heights and weights in particular have been improved.
- Improvements to Reaction area; free text now saves and displays properly.


New in version 1.7:

- Implemented default point boosts from alternate stat-based defaults.
  (Like Raphael Holyoak's half-point in Stealth from its IQ-5 default.)
- Height and weight stats for new characters now adjust when you change ST.
  This can be turned off (or on) under Edit -> Preferences (Auto-adjust Build).
  Random characters also auto-adjust, but have random variance as well.
- Tweaked several aspects of Encumbrance handling, which fixed at least one bug.
- Supplemental library support code broke the loading of the main library files
  on some browsers: fixed.
- Completed support for supplemental library 'linkers' by adding handling for
  Groups.
- Added a new "All Possessions" page to all (full) character sheets.
- Made improvements to Collection handling.
- Shields now display a skill level, like weapons, in Possessions tables.
- Cleaned up and added a bit to 3rd edition equipment in that library.
- Display of Tech Level info is now a preference.
- Costs (points, $) can now be displayed using common fractions (e.g. ½, ¾),
  where applicable, with a preference setting.
- Made a few small (hopefully only cosmetic) changes to several character sheets
  (text size, spacing, input type, etc).
- The 4e "landscape1" sheet contains a 'Spells' section; this had a number of
  issues which are now fixed.
- The 'Swim' section in the 2-page 3rd-edition sheet now gets filled using the
  3rd-edition Swimming rules (pg B91).


New in version 1.6:

- Added support for loading supplemental rules libraries.
  Non-Basic-Set Spells have been removed from the Basic rules libraries.
- Support for supplemental libraries requires attaching new 'linkers' (defaults,
  prerequisites, etc.) from supplemental libraries to character objects.
  A new 'Edit Linkers' dialog allows editing or removing linkers if needed.

- Fixed a few bugs left over from Skills/Spells meld.

- User-defined specialization Prerequisites and group specialization
  Prerequisites (e.g. "any two Musical Instrument skills" for the Conducting
  specialization of the Group Performance skill) now work properly.

- Fixed a bug which had broken the draggability of dialog boxes.

- "Perqs" are now "Perks".  <grumble>
  http://boards.straightdope.com/sdmb/showthread.php?t=668404

- Two tutorials are now included in the package; one general tutorial
  and one for creating templates.


New in version 1.5:

- Spells and skills are no longer distinct in the Character object.
  Users should see few effects from this change, except that spells
  will no longer be forcibly sorted to the bottom of the skills list,
  so they can now be interspersed with other skills.

- There are now two landscape-oriented 4th-edition sheets.
  I found a layout that seemed somewhat "official" and differed a bit
  from the one I had already created.


New in version 1.4:

- The New Character dialog now lets you apply a racial template to your new
  character at creation.  The embedded random character generator has also
  been greatly expanded.

- Technique/Maneuver editing is now part of the Edit Skills dialog.
  A bug with editing of defaults has been fixed here too.

- Damage-by-ST and ST cost progressions have been fixed.

- Added an NPC Card character sheet.

New in version 1.3:

- The various trait sub-classes were merged into ‘Traits’ in this release.

