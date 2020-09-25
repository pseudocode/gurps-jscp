/*  Assumptions
    This is a supplemental rules library.  This means that the main library objects
    (Traits, Skills, Spells, Groups, Prerequisites, Adjustments, Modifiers) must already
    be defined in a 'main' library file (basic3e_library.js, for instance).
    Add-on libraries like this one will add new entries to those objects.
*/
var newLibrary = "GURPS Fantasy Folk, 2nd edition";   // this gets processed like NewEquipment, etc. in processNewLibraryItems(), not when this file gets loaded
/* This library is compatible with GURPS Basic Set, 3rd edition */
var libAbrv = 'FF2E';     // This should match one found in the list is at http://www.sjgames.com/gurps/abbrevs.html (also in gurps.js:titleForAbbreviation)

/*
  The biggest question for this library:  Do I include the large number of Racial Traits described in FF2E?
  There may well be variances from those in B3E, and for those cases this would be desirable.
  The work-to-benefit ratio is not very good, though.

  The OTHER biggest question is about split ST.  I have left out Centaurs and Onocentaurs, Giants, Dolphins, Ogres, and Sasquatch
  because they require the use of split ST in their templates.  I don't support split ST right now.
*/


// NewTemplates._blank = {
//   name : '',
//   value : 0,
//   ref : libAbrv+##,
//   traits : [
//     // attribute & 2nd char mods
//     // traits, by referring to Basic Library Trait objects, i.e.
//     Traits.key.clone(),
//   ],
//   metatraits : [
//     e.g.
//     Templates.MetaTraitTemplate,
//   ],
//   skills : [],
//   spells : [],
//   adjustments : []  // no need to add these for existing ads/disads; they should already apply - reserve for traits defined inside the template
// };
// Then levels, descriptions, etc. for objects included inside Template object, i.e.
// NewTemplates._blank.traits[n].levels = ##;
// NewTemplates._blank.traits[n].description = "text";

NewTemplates.Bale = {
  name  : 'Bale',
  value :  100,
  ref   : "FF2E42",
  traits : [
    Traits.RacialIQModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.DamageResistance.clone(),
    Traits.DoesntEatorDrink.clone(),
    Traits.HardtoKill.clone(),
    Traits.ImmunitytoDisease.clone(),         // 5
    Traits.ImmunitytoPoison.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.Magery.clone(),
    Traits.MetabolismControl.clone(),
    Traits.Regeneration.clone(),              // 10
    Traits.TemperatureTolerance.clone(),
    Traits.Unaging.clone(),
    Traits.Bloodlust.clone(),
    Traits.Dependency.clone(),
    Traits.Fanaticism.clone(),                // 15
    Traits.Intolerance.clone(),
    Traits.Megalomania.clone(),
    Traits.OdiousPersonalHabit.clone(),
    Traits.Paranoia.clone(),
    Traits.Sadism.clone(),                    // 20
    new Trait( 'Magical Skills Bonus', 'A', 'M', 6, true ),
  ],
  adjustments : [
    { from: 'MagicalSkillsBonus', fromCategory: 'AD', amount: 1, upto: 4, targetCategory: 'group', target: 'MagicalSkills' },
  ]
};
NewTemplates.Bale.traits[0].levels = 3;
NewTemplates.Bale.traits[1].levels = 2;
NewTemplates.Bale.traits[2].levels = 3;
NewTemplates.Bale.traits[4].levels = 2;
NewTemplates.Bale.traits[7].ConstantModsArray = [ { text:"No Blood", value: 5 } ];
NewTemplates.Bale.traits[8].levels = 1;
NewTemplates.Bale.traits[9].levels = 5;
NewTemplates.Bale.traits[10].ConstantModsArray = [ { text: "Regular (1 HP/hr)", value: 25 } ];
NewTemplates.Bale.traits[11].levels = 10;
NewTemplates.Bale.traits[14].ConstantModsArray = [ { text: "Sentient humanoid blood", value: -20 } ];
NewTemplates.Bale.traits[14].MultipliersArray  = [ { text: "Monthly (1 HT per day)", value: 1 } ];
NewTemplates.Bale.traits[16].levels =  2;
NewTemplates.Bale.traits[18].name = "Odious Racial Habit";
NewTemplates.Bale.traits[18].description = "Blood-Drinkers";
NewTemplates.Bale.traits[18].levels =  3;
NewTemplates.Bale.traits[21].key    =  'MagicalSkillsBonus';  // keys are undefined for de novo Trait objects
NewTemplates.Bale.traits[21].levels =  1;

/* Centaurs */
/* Onocentaurs */

NewTemplates.Dwarf = {
  name  : 'Dwarf',
  value :  40,
  ref   : "FF2E50",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.ExtraFatigue.clone(),
    Traits.DamageResistance.clone(),
    Traits.ExtendedLifespan.clone(),
    Traits.ExtraEncumbrance.clone(),
    Traits.HardtoKill.clone(),
    Traits.Longevity.clone(),
    new Trait( 'Crafts Talent', 'A', 'M', 6, true ),
    Traits.Greed.clone(),
    Traits.Miserliness.clone(),
    Traits.ReducedMove.clone(),
    new Trait( "Suspicious of Elves and Goblins", 'Q', 'M', -1 ),
    new Trait( "Never Shave Beard", 'Q', 'M', -1 ),
    new Trait( "Intolerance for Orcs", 'Q', 'M', -1 ),
  ],
  skills : [
    Skills.AxeMace.clone(),
    Skills.Merchant.clone(),
  ],
  adjustments : [
    { from: 'CraftsTalent', fromCategory: 'AD', amount: 1, upto: 4, targetCategory: 'group', target: 'CraftSkills' },
  ]
};
NewTemplates.Dwarf.traits[0].levels  =  2;  // +2 ST
NewTemplates.Dwarf.traits[1].levels  =  2;  // +2 Fatigue
NewTemplates.Dwarf.traits[2].levels  =  1;  // +1 DR
NewTemplates.Dwarf.traits[3].levels  =  1;  // Extended Lifespan +1
NewTemplates.Dwarf.traits[5].levels  =  1;  // Hard to Kill +1
NewTemplates.Dwarf.traits[7].key     =  'CraftsTalent';  // keys are undefined for de novo Trait objects
NewTemplates.Dwarf.traits[7].levels  =  3;  // Craft skills +3
NewTemplates.Dwarf.traits[10].levels =  1;  // Reduced Move -1
NewTemplates.Dwarf.traits[10].description = 'running';  // Reduced Move mode
NewTemplates.Dwarf.traits[11].key = "Suspicious_quirk";
NewTemplates.Dwarf.traits[12].key = "Beard_quirk";
NewTemplates.Dwarf.traits[13].key = "Intolerance_quirk";
NewTemplates.Dwarf.skills[0].points  =  4;  // Axe/Mace at DX+1 (4 pts)
NewTemplates.Dwarf.skills[1].points  =  2;  // Merchant at IQ   (2 pts)

NewTemplates.Gnome = {
  name  : 'Gnome',
  value :  25,
  ref   : "FF2E50",
  traits : [
    Traits.DamageResistance.clone(),
    Traits.ExtraEncumbrance.clone(),
    Traits.ExtraFatigue.clone(),
    Traits.HardtoKill.clone(),
    Traits.Longevity.clone(),
    new Trait( 'Soft Crafts Talent', 'A', 'M', 3, true ),
    Traits.ReducedMove.clone(),
    new Trait( "Does not like to live underground", 'Q', 'M', -1 ),
    new Trait( "Never forget a favor or an injury", 'Q', 'M', -1 ),
    new Trait( "Trims beard close", 'Q', 'M', -1 ),
  ],
  adjustments : [
    { from: 'SoftCraftsTalent', fromCategory: 'AD', amount: 1, upto: 4, targetCategory: 'group', target: 'SoftCraftSkills' },
  ]
};
NewTemplates.Gnome.traits[0].levels =  1;  // +1 DR
NewTemplates.Gnome.traits[2].levels =  1;  // +1 FP
NewTemplates.Gnome.traits[3].levels =  1;  // Hard to Kill +1
NewTemplates.Gnome.traits[5].levels =  4;  // Soft Craft skills +4
NewTemplates.Gnome.traits[5].key    =  'SoftCraftsTalent';  // keys are undefined for de novo Trait objects
NewTemplates.Gnome.traits[6].levels =  1;  // Reduced Move -1
NewTemplates.Gnome.traits[6].description = 'running';  // Reduced Move mode
NewTemplates.Gnome.traits[7].key = "Quirk1";
NewTemplates.Gnome.traits[8].key = "Quirk2";
NewTemplates.Gnome.traits[9].key = "Quirk3";

NewTemplates.Ellyllon = {
  name  : 'Ellyllon',
  value :  20,
  ref   : "FF2E54",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.ReducedHitPoints.clone(),
    Traits.AcuteHearing.clone(),
    Traits.AcuteVision.clone(),
    Traits.Appearance.clone(),              // 5
    Traits.Flight.clone(),
    Traits.NightVision.clone(),
    Traits.PassiveDefense.clone(),
    Traits.Ultrahearing.clone(),
    Traits.CodeofHonor.clone(),             // 10
    Traits.Fragile.clone(),
    Traits.Impulsiveness.clone(),
    Traits.InconvenientSizeSmall.clone(),
  ],
  defaults : [
    { target: 'Flight', penalty: 0, from: 'DX' }
  ],
  skills : [
    Skills.Flight.clone(),
    Skills.SavoirFaire.clone(),
    Skills.Stealth.clone(),
  ],
};
NewTemplates.Ellyllon.traits[0].levels = -5;
NewTemplates.Ellyllon.traits[1].levels = 3;
NewTemplates.Ellyllon.traits[2].levels = 4;
NewTemplates.Ellyllon.traits[3].levels = 2;
NewTemplates.Ellyllon.traits[4].levels = 3;
NewTemplates.Ellyllon.traits[5].levels = 3;
NewTemplates.Ellyllon.traits[6].EnhLimsArray = [ { text: "Winged", value: -25 } ];
NewTemplates.Ellyllon.traits[10].description = "courtliness";
NewTemplates.Ellyllon.skills[0].specialization = 'Winged';
NewTemplates.Ellyllon.skills[0].points = 2;
NewTemplates.Ellyllon.skills[1].points = 1;
NewTemplates.Ellyllon.skills[2].points = 2;

NewTemplates.Elf = {
  name  : 'Elf',
  value :  40,
  ref   : "FF2E58",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.Appearance.clone(),
    Traits.CombatReflexes.clone(),
    Traits.Magery.clone(),                    // 5
    Traits.MusicalAbility.clone(),
    Traits.Unaging.clone(),
    new Trait( "Elven skill bonuses (Bard, Savoir-Faire)", 'A', 'M' , 3 ),
    Traits.CodeofHonor.clone(),
    Traits.SenseOfDuty.clone(),               // 10
  ],
  adjustments : [
    { from: 'ElvenskillbonusesBardSavoirFaire', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Bard' },
    { from: 'ElvenskillbonusesBardSavoirFaire', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'SavoirFaire' },
  ]
};
NewTemplates.Elf.traits[0].levels = -1;  // -1 ST
NewTemplates.Elf.traits[1].levels =  1;  // +1 DX
NewTemplates.Elf.traits[2].levels =  1;  // +1 IQ
NewTemplates.Elf.traits[3].levels =  1;  // +1 Appearance - Attractive
NewTemplates.Elf.traits[5].levels =  1;  // Magery 1
NewTemplates.Elf.traits[6].levels =  2;  // Musical Ability 2
NewTemplates.Elf.traits[8].key = 'ElvenskillbonusesBardSavoirFaire';  // keys are undefined for de novo Trait objects
NewTemplates.Elf.traits[9].description = "live an elegant life";
NewTemplates.Elf.traits[9].levels =  2;
NewTemplates.Elf.traits[10].description = "nature";
NewTemplates.Elf.traits[10].levels =  3;

NewTemplates.HalfElf = {
  name  : 'Half-Elf',
  value :  30,
  ref   : "FF2E58",
  traits : [
    Traits.RacialIQModifier.clone(),
    Traits.ExtendedLifespan.clone(),
    Traits.Magery.clone(),
  ],

};
NewTemplates.HalfElf.traits[0].levels = 1;  // +1 IQ
NewTemplates.HalfElf.traits[1].levels = 1;  // Extended Lifespan level 1
NewTemplates.HalfElf.traits[2].levels = 1;  // Magery 1

NewTemplates.ExaltedHorse = {
  name  : 'Exalted Horse',
  value :  25,
  ref   : "FF2E62",
  traits : [
    Traits.EnhancedST24_30.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.AcuteHearing.clone(),
    Traits.AcuteTasteSmell.clone(),
    Traits.AppearanceAttractive.clone(),
    Traits.Teeth.clone(),                     // 5
    Traits.EnhancedMove.clone(),
    Traits.ExtraLegs.clone(),
    Traits.PeripheralVision.clone(),
    Traits.BadSight.clone(),
    Traits.Horizontal.clone(),                // 10
    Traits.InconvenientSizeLarge.clone(),
    Traits.Mute.clone(),
    Traits.NoFineManipulators.clone(),
    Traits.PovertyDeadBrokex0.clone(),
    Traits.Primitive.clone(),                 // 15
    Traits.SocialStigma.clone(),
    Traits.Uneducated.clone(),
  ],
  skills : [
    Skills.Brawling.clone(),
    Skills.Gesture.clone(),
    Skills.Running.clone(),
  ],
};
NewTemplates.ExaltedHorse.traits[0].levels  =  5;  // ST 28
NewTemplates.ExaltedHorse.traits[0].EnhLimsArray = [ { text: "No Fine Manipulators", value : -40 } ];
NewTemplates.ExaltedHorse.traits[1].levels  =  3;  // HT +3
NewTemplates.ExaltedHorse.traits[2].levels  =  3;  // Hearing +3
NewTemplates.ExaltedHorse.traits[3].levels  =  3;  // Taste/Smell +3
NewTemplates.ExaltedHorse.traits[5].levels  =  0;  // Blunt teeth
NewTemplates.ExaltedHorse.traits[6].levels  =  2;  // Running speed (2 half-levels)
NewTemplates.ExaltedHorse.traits[7].levels  =  1;  // 4 legs
NewTemplates.ExaltedHorse.traits[14].description = '';  // remove 'clothes only'
NewTemplates.ExaltedHorse.traits[15].levels =  3;  // quite primitive
NewTemplates.ExaltedHorse.traits[16].levels =  2;  // Stigma -2
NewTemplates.ExaltedHorse.traits[16].description = 'viewed as "clever animals"';
NewTemplates.ExaltedHorse.skills[0].points =  1;  // Brawling at DX
NewTemplates.ExaltedHorse.skills[1].points =  1;  // Gesture at IQ
NewTemplates.ExaltedHorse.skills[2].points =  2;  // Running at HT-1

NewTemplates.Faun = {
  name  : 'Faun',
  value :  25,
  ref   : "FF2E66",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.Alertness.clone(),
    Traits.AnimalEmpathy.clone(),
    Traits.MusicalAbility.clone(),
    Traits.Lecherousness.clone(),
    Traits.Reputation.clone(),
  ],
  skills : [
    Skills.Carousing.clone(),
    Skills.Scrounging.clone(),
  ],
};
NewTemplates.Faun.traits[0].levels  = -2;  // -2 ST
NewTemplates.Faun.traits[1].levels  =  3;  // +3 DX
NewTemplates.Faun.traits[2].levels  =  1;  // +1 HT
NewTemplates.Faun.traits[3].levels  =  2;  // +2 Alertness
NewTemplates.Faun.traits[5].levels  =  2;  // +2 Musical Ability
NewTemplates.Faun.traits[7].levels  = -1;  // -1 Reputation
NewTemplates.Faun.traits[7].description = 'crude and unreliable';
NewTemplates.Faun.skills[0].points  =  2;  // Carousing at HT
NewTemplates.Faun.skills[1].points  =  1;  // Scrounging at IQ

NewTemplates.Fishman = {
  name  : 'Fishman',
  value :  30,
  ref   : "FF2E70",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.AcuteTasteSmell.clone(),
    Traits.Amphibious.clone(),
    Traits.DarkVision.clone(),
    Traits.DamageResistance.clone(),        // 5
    Traits.Gills.clone(),
    Traits.NictatingMembrane.clone(),
    Traits.PassiveDefense.clone(),
    Traits.PressureSupport.clone(),
    Traits.SpeakwithFish.clone(),           // 10
    Traits.BadSight.clone(),
    Traits.ColdBlooded.clone(),
    Traits.Dependency.clone(),
    Traits.Fanaticism.clone(),
    Traits.Intolerance.clone(),             // 15
    Traits.OdiousPersonalHabit.clone(),
    Traits.Reputation.clone(),
    Traits.AppearanceUnattractive.clone(),
  ],
};
NewTemplates.Fishman.traits[0].levels  =  1;  // +1 ST
NewTemplates.Fishman.traits[1].levels  =  2;  // +2 HT
NewTemplates.Fishman.traits[2].levels  =  1;  // +1 Taste/Smell
NewTemplates.Fishman.traits[5].levels  =  1;  // +1 DR
NewTemplates.Fishman.traits[8].levels  =  1;  // +1 PD
NewTemplates.Fishman.traits[9].levels  =  3;  // any depth
NewTemplates.Fishman.traits[13].ConstantModsArray = [ { text: "Water (common)", value: -5 } ];
NewTemplates.Fishman.traits[13].MultipliersArray  = [ { text: "Daily (1 HT/hr)", value: 3 } ];
NewTemplates.Fishman.traits[15].levels =  2;
NewTemplates.Fishman.traits[16].name = "Odious Racial Habit";
NewTemplates.Fishman.traits[16].description = "Eat Other Sentients";
NewTemplates.Fishman.traits[16].levels =  3;
NewTemplates.Fishman.traits[17].levels = -4;

NewTemplates.Gargoyle = {
  name  : 'Gargoyle',
  value :  25,
  art   : '../images/lineart/gargoyle.jpg', // https://i.pinimg.com/originals/55/7f/77/557f77853c712b7deb665ae481e44f2b.jpg
  ref   : "FF2E74",
  traits : [
    Traits.RacialIQModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.Claws.clone(),
    Traits.DamageResistance.clone(),
    Traits.Flight.clone(),
    Traits.NightVision.clone(),
    Traits.Coward.clone(),
    Traits.Gluttony.clone(),
    Traits.Lazy.clone(),
    Traits.Reputation.clone(),
    Traits.AppearanceUgly.clone(),
    Traits.Uneducated.clone(),
    new Trait( "Bully", 'Q', 'M', -1 ),
  ],
};
NewTemplates.Gargoyle.traits[0].levels  = -1;  // -1 IQ
NewTemplates.Gargoyle.traits[1].levels  =  2;  // +2 HT
NewTemplates.Gargoyle.traits[3].levels  =  2;  // +2 DR
NewTemplates.Gargoyle.traits[4].EnhLimsArray = [ { text: "Winged", value: -25 } ];
NewTemplates.Gargoyle.traits[9].levels  = -1;  // -1 Reputation
NewTemplates.Gargoyle.traits[9].description = 'thieves and bums';
NewTemplates.Gargoyle.traits[12].key = "Bully_quirk";

NewTemplates.Ghoul = {
  name  : 'Ghoul',
  value :  -5,
  ref   : "FF2E78",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.Alertness.clone(),
    Traits.DoubleJointed.clone(),
    Traits.ImmunitytoDisease.clone(),
    Traits.NightVision.clone(),
    Traits.Silence.clone(),               // 5
    Traits.Dependency.clone(),
    Traits.OdiousPersonalHabit.clone(),
    Traits.Reputation.clone(),
    Traits.SenseOfDuty.clone(),
    Traits.AppearanceUgly.clone(),
  ],
  skills : [
    Skills.Camouflage.clone(),
    Skills.Scrounging.clone(),
    Skills.Stealth.clone(),
  ],
};
NewTemplates.Ghoul.traits[0].levels  =  2;   // +2 ST
NewTemplates.Ghoul.traits[1].levels  =  2;   // +2 Alertness
NewTemplates.Ghoul.traits[5].levels  =  1;   // +1 Silence
NewTemplates.Ghoul.traits[6].ConstantModsArray = [ { text: "Fresh Brains (from sentient beings; no more than 1 week old; 1 brain will feed ten ghouls)", value: -10 } ];
NewTemplates.Ghoul.traits[6].MultipliersArray  = [ { text: "Monthly (1 HT per day)", value: 1 } ];
NewTemplates.Ghoul.traits[7].name = "Odious Racial Habit";
NewTemplates.Ghoul.traits[7].description = "eat Human carrion";
NewTemplates.Ghoul.traits[7].levels  =  3;
NewTemplates.Ghoul.traits[8].levels  = -4;   // -4 Reputation
NewTemplates.Ghoul.traits[9].levels  =  3;   // strong Sense of Duty
NewTemplates.Ghoul.traits[9].description = 'to welfare of race';
NewTemplates.Ghoul.skills[0].points  =  2;  // Camouflage at IQ+1
NewTemplates.Ghoul.skills[1].points  =  1;  // Scrounging at IQ
NewTemplates.Ghoul.skills[2].points  =  2;  // Stealth at DX

/* Giants */

NewTemplates.Goblin = {
  name  : 'Goblin',
  value :  5,
  ref   : "FF2E86",
  traits : [
    Traits.RacialDXModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.NightVision.clone(),
    Traits.RacialSTModifier.clone(),
    Traits.Impulsiveness.clone(),
  ],
};
NewTemplates.Goblin.traits[0].levels  =  1;  // +1 DX
NewTemplates.Goblin.traits[1].levels  =  1;  // +1 IQ
NewTemplates.Goblin.traits[3].levels  = -2;  // -2 ST

NewTemplates.Hobgoblin = {
  name  : 'Hobgoblin',
  value : -25,
  ref   : "FF2E86",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.NightVision.clone(),
    Traits.BadTemper.clone(),
    Traits.PovertyDeadBrokex0.clone(),
    Traits.Stubborn.clone(),
  ],
};
NewTemplates.Hobgoblin.traits[0].levels =  1;  // +1 ST
NewTemplates.Hobgoblin.traits[1].levels =  1;  // +1 DX
NewTemplates.Hobgoblin.traits[2].levels = -2;  // -2 IQ

NewTemplates.GreatEagle = {
  name  : 'Great Eagle',
  value :  25,
  ref   : "FF2E91",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.AcuteVision.clone(),
    Traits.Claws.clone(),
    Traits.Flight.clone(),                    // 5
    Traits.PeripheralVision.clone(),
    Traits.Teeth.clone(),
    Traits.TelescopicVision.clone(),
    Traits.Bloodlust.clone(),
    Traits.CompulsiveBehavior.clone(),        // 10
    Traits.Fragile.clone(),
    Traits.Intolerance.clone(),
    Traits.Mute.clone(),
    Traits.PovertyDeadBrokex0.clone(),
    Traits.Primitive.clone(),                 // 15
  ],
  defaults : [
    { target: 'Flight', penalty: 0, from: 'DX' }
  ],
  skills : [
    Skills.Flight.clone(),
  ],
};
NewTemplates.GreatEagle.traits[0].levels =  3;   // +3 ST
NewTemplates.GreatEagle.traits[1].levels =  2;   // +2 DX
NewTemplates.GreatEagle.traits[2].levels =  2;   // +2 HT
NewTemplates.GreatEagle.traits[3].levels =  1;   // +1 Vision
NewTemplates.GreatEagle.traits[5].EnhLimsArray = [ { text: "Winged", value: -25 } ];
NewTemplates.GreatEagle.traits[7].name =  'Beak';
NewTemplates.GreatEagle.traits[7].levels =  1;
NewTemplates.GreatEagle.traits[8].levels =  1;
NewTemplates.GreatEagle.traits[10].levels = 3;
NewTemplates.GreatEagle.traits[10].description = 'rabidly seeks solitude';
NewTemplates.GreatEagle.traits[12].levels = 2;
NewTemplates.GreatEagle.traits[15].levels = 3;
NewTemplates.GreatEagle.skills[0].points = 2;
NewTemplates.GreatEagle.skills[0].specialization = 'Winged';

NewTemplates.Halfling = {
  name  : 'Halfling',
  value :  10,
  ref   : "FF2E95",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.Reputation.clone(),
    Traits.Silence.clone(),
    new Trait( "Halfling skill bonus: +2 to Bow",      'A', 'P', 4 ),
    new Trait( "Halfling skill bonus: +2 to Sling",    'A', 'P', 4 ),
    new Trait( "Halfling skill bonus: +2 to Throwing", 'A', 'P', 4 ),
    Traits.CodeofHonor.clone(),
    Traits.Gluttony.clone(),
    Traits.ReducedMove.clone(),
    new Trait( "Dislikes traveling by water", 'Q', 'M', -1 ),
  ],
  skills : [
    Skills.Stealth.clone(),
  ],
  adjustments : [
    { from: 'HalflingBowBonus',      fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Bow' },
    { from: 'HalflingSlingBonus',    fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Sling' },
    { from: 'HalflingThrowingBonus', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Throwing' },
  ]
};
NewTemplates.Halfling.traits[0].levels  = -3;  // -3 ST
NewTemplates.Halfling.traits[1].levels  =  1;  // +1 DX
NewTemplates.Halfling.traits[2].levels  =  1;  // +1 HT
NewTemplates.Halfling.traits[3].levels  =  1;  // +1 reaction
NewTemplates.Halfling.traits[3].description = "good neighbors";
NewTemplates.Halfling.traits[4].levels =  1;  // Silence 1
NewTemplates.Halfling.traits[5].key = "HalflingBowBonus";
NewTemplates.Halfling.traits[6].key = "HalflingSlingBonus";
NewTemplates.Halfling.traits[7].key = "HalflingThrowingBonus";
NewTemplates.Halfling.traits[8].description = "hospitality";
NewTemplates.Halfling.traits[8].levels  =  1;
NewTemplates.Halfling.traits[10].levels =  1;  // Reduced Move -1
NewTemplates.Halfling.traits[10].description = 'running';  // Reduced Move mode
NewTemplates.Halfling.traits[11].key = "water_travel_quirk";
NewTemplates.Halfling.skills[0].points  = 4;  // Stealth at DX+1

NewTemplates.InsectMan = {
  name  : 'Insect Man',
  value :  35,
  ref   : "FF2E99",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.DamageResistance.clone(),
    Traits.PassiveDefense.clone(),
    Traits.SecretCommunication.clone(),
    Traits.Mute.clone(),                      // 5
    Traits.Eunuch.clone(),
    Traits.AppearanceUnattractive.clone(),
    new Trait( "Secretive", 'Q', 'M', -1 ),
  ],
};
NewTemplates.InsectMan.traits[0].levels  =  1;   // +1 ST
NewTemplates.InsectMan.traits[1].levels  =  1;   // +1 HT
NewTemplates.InsectMan.traits[2].levels  =  2;   // +2 DR
NewTemplates.InsectMan.traits[3].levels  =  1;   // +1 PD
NewTemplates.InsectMan.traits[6].name = 'Sterile';
NewTemplates.InsectMan.traits[8].key = "Secretive_quirk";

NewTemplates.InsectWarrior = {
  name  : 'Insect Warrior',
  value :  50,
  ref   : "FF2E99",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.DamageResistance.clone(),
    Traits.ExtraArms.clone(),
    Traits.FullCoordination.clone(),              // 5
    Traits.PassiveDefense.clone(),
    Traits.SecretCommunication.clone(),
    Traits.Mute.clone(),
    Traits.ShortLifespan.clone(),
    Traits.SlaveMentality.clone(),                // 10
    Traits.Status.clone(),
    Traits.Eunuch.clone(),
    Traits.AppearanceUnattractive.clone(),
    new Trait( "Secretive", 'Q', 'M', -1 ),
  ],
};
NewTemplates.InsectWarrior.traits[0].levels  =  2;   // +2 ST
NewTemplates.InsectWarrior.traits[1].levels  = -1;   // -1 IQ
NewTemplates.InsectWarrior.traits[2].levels  =  1;   // +1 HT
NewTemplates.InsectWarrior.traits[3].levels  =  2;   // +2 DR
NewTemplates.InsectWarrior.traits[4].levels  =  2;   // 2 Extra Arms
NewTemplates.InsectWarrior.traits[5].levels  =  1;   // 1 Extra Attack
NewTemplates.InsectWarrior.traits[6].levels  =  1;   // +1 PD
NewTemplates.InsectWarrior.traits[11].levels = -1;   // low Status
NewTemplates.InsectWarrior.traits[11].description = 'warrior and servant caste';
NewTemplates.InsectWarrior.traits[12].name = 'Sterile';
NewTemplates.InsectWarrior.traits[14].key = "Secretive_quirk";

NewTemplates.Kobold = {
  name  : 'Kobold',
  value : -30,
  ref   : "FF2E103",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.CastIronStomach.clone(),
    Traits.ShortAttentionSpan.clone(),
    Traits.Uneducated.clone(),              // 5
    Traits.WeakWill.clone(),
    new Trait( "Love Practical Jokes", 'Q', 'M', -1 ),
    new Trait( "Easily Offended", 'Q', 'M', -1 ),
  ],
};
NewTemplates.Kobold.traits[0].levels  = -2;   // -2 ST
NewTemplates.Kobold.traits[1].levels  =  1;   // +1 DX
NewTemplates.Kobold.traits[2].levels  = -2;   // -2 IQ
NewTemplates.Kobold.traits[6].levels  =  1;   // weak Will
NewTemplates.Kobold.traits[7].key = "Practical_Jokes_quirk";
NewTemplates.Kobold.traits[8].key = "Easily_Offended_quirk";

NewTemplates.Leprechaun = {
  name  : 'Leprechaun',
  value :  5,
  ref   : "FF2E103",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.AcuteHearing.clone(),
    Traits.Longevity.clone(),
    Traits.Luck.clone(),
    Traits.Magery.clone(),
    Traits.MusicalAbility.clone(),
    Traits.NightVision.clone(),
    Traits.InconvenientSizeSmall.clone(),
    Traits.Miserliness.clone(),
    Traits.ReducedHitPoints.clone(),
    new Trait( "May buy up to 3 racially innate spells, with some limitations", 'A', 'M', 0 ),
  ],
  skills : [
    Skills.Leatherworking.clone(),
  ]
};
NewTemplates.Leprechaun.traits[0].levels  = -4;  // ST -4
NewTemplates.Leprechaun.traits[1].levels  =  2;  // DX +2
NewTemplates.Leprechaun.traits[2].levels  =  1;  // Hearing +1
NewTemplates.Leprechaun.traits[5].levels  =  1;  // Magery 1
NewTemplates.Leprechaun.traits[6].levels  =  1;  // Musical Ability 1
NewTemplates.Leprechaun.traits[10].levels =  2;  // HP -2
NewTemplates.Leprechaun.traits[11].key = "racially_innate_spells_advantage";
NewTemplates.Leprechaun.skills[0].points  =  2;  // Leatherworking at IQ+1

Templates.Merfolk = {
  name  : 'Merfolk',
  value :  40,
  ref   : "FF2E111",
  traits : [
    Traits.EnhancedSwim.clone(),
    Traits.Gills.clone(),
    Traits.PressureSupport.clone(),
    Traits.SonarVision.clone(),
    Traits.Dependency.clone(),
  ],
};
Templates.Merfolk.traits[0].levels  =  2;   // 2 half-levels of Enhanced Swim
Templates.Merfolk.traits[2].levels  =  2;   // 100× pressure multiplier
Templates.Merfolk.traits[4].ConstantModsArray = [ { text: "Water (common)", value: -5 } ];
Templates.Merfolk.traits[4].MultipliersArray  = [ { text: "Daily (1 HT/hr)", value: 3 } ];

/* Dolphins */

NewTemplates.Minotaur = {
  name  : 'Minotaur',
  value :  75,
  ref   : "FF2E116",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.AbsoluteDirection.clone(),
    Traits.AcuteHearing.clone(),
    Traits.DamageResistance.clone(),
    Traits.Striker.clone(),
    Traits.MagicResistance.clone(),
    Traits.PeripheralVision.clone(),
    new Trait( 'Extra skull DR +2', 'A', 'P', 3, false ),
    Traits.Berserk.clone(),
    Traits.Bloodlust.clone(),
    Traits.AppearanceHideous.clone(),
    Traits.Intolerance.clone(),
    Traits.OdiousPersonalHabit.clone(),
    Traits.Uneducated.clone(),
  ],
  skills : [
    Skills.Brawling.clone(),
  ],
  equipment : [
    new Armor( 'extra skull DR', 0, 0,  1,  5,  2,  0, ['skull'], 'FF2E117' ),
  ],
  weapons : [
    Weapons.longtusks.clone(),
  ],
};
NewTemplates.Minotaur.traits[0].levels  =  3;   // +3 ST
NewTemplates.Minotaur.traits[1].levels  =  1;   // +1 DX
NewTemplates.Minotaur.traits[2].levels  = -2;   // -2 IQ
NewTemplates.Minotaur.traits[3].levels  =  3;   // +3 HT
NewTemplates.Minotaur.traits[5].levels  =  3;   // +3 Hearing
NewTemplates.Minotaur.traits[6].levels  =  3;   // +3 DR
NewTemplates.Minotaur.traits[7].description = 'long horns, reach 1; thr/imp or sw/cut';
NewTemplates.Minotaur.traits[7].cost = 50;
NewTemplates.Minotaur.traits[8].levels  =  3;   // +3 magic resistance
NewTemplates.Minotaur.traits[10].key = 'SkullDR';
NewTemplates.Minotaur.traits[14].levels  =  2;   // very intolerant
NewTemplates.Minotaur.traits[15].name = "Odious Racial Habit";
NewTemplates.Minotaur.traits[15].description = "Eat Other Sentients";
NewTemplates.Minotaur.traits[15].levels =  3;
NewTemplates.Minotaur.skills[0].points  =  1;  // Brawling at DX
NewTemplates.Minotaur.equipment[0].number =  1;
NewTemplates.Minotaur.equipment[0].flexible = true;
NewTemplates.Minotaur.equipment[0].layerable = true;
NewTemplates.Minotaur.weapons[0].name =  'horns';
delete NewTemplates.Minotaur.weapons[0].description;
NewTemplates.Minotaur.weapons[0].number =  1;

/* Ogres */

NewTemplates.Orc = {
  name  : 'Orc',
  value : -10,
  ref   : "FF2E124",
  traits : [
    Traits.RacialHTModifier.clone(),
    Traits.ExtraHitPoints.clone(),
    Traits.AcuteHearing.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.Intolerance.clone(),
    Traits.Reputation.clone(),
  ],
  skills : [
    Skills.Brawling.clone(),
  ],
};
NewTemplates.Orc.traits[0].levels =  2;  // +2 HT
NewTemplates.Orc.traits[1].levels =  1;  // +1 HP
NewTemplates.Orc.traits[2].levels =  2;  // Acute Hearing +2
NewTemplates.Orc.traits[3].levels = -2;  // -2 IQ
NewTemplates.Orc.traits[4].levels =  2;  // 'thoroughly' Intolerant
NewTemplates.Orc.traits[5].levels = -3;  // -3 reputation
NewTemplates.Orc.skills[0].points =  1;  // Brawling at DX (1 pt)

NewTemplates.ReptileMan = {
  name  : 'Reptile Man',
  value :  75,
  ref   : "FF2E128",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.Claws.clone(),
    Traits.DamageResistance.clone(),
    Traits.Longevity.clone(),
    Traits.PeripheralVision.clone(),
    Traits.Teeth.clone(),
    Traits.TemperatureTolerance.clone(),
    Traits.Intolerance.clone(),
    Traits.Reputation.clone(),
    Traits.Shyness.clone(),
    new Trait( "Inscrutable", 'Q', 'So', -1 ),
  ],
  skills : [
    Skills.Camouflage.clone(),
    Skills.Survival.clone(),
  ],
};
NewTemplates.ReptileMan.traits[0].levels  =  4;   // +4 ST
NewTemplates.ReptileMan.traits[1].levels  = -1;   // -1 IQ
NewTemplates.ReptileMan.traits[2].levels  =  2;   // +2 HT
NewTemplates.ReptileMan.traits[4].levels  =  1;   // +1 DR
NewTemplates.ReptileMan.traits[7].levels  =  1;   // sharp teeth
NewTemplates.ReptileMan.traits[8].levels  =  5;   // 5
NewTemplates.ReptileMan.traits[9].levels  =  2;   // very intolerant
NewTemplates.ReptileMan.traits[10].levels = -3;  // -3 reputation
NewTemplates.ReptileMan.traits[12].key = "Inscrutable_quirk";
NewTemplates.ReptileMan.skills[0].points  =  1;  // Camouflage at IQ
NewTemplates.ReptileMan.skills[1].points  =  2;  // Survival at IQ
NewTemplates.ReptileMan.skills[1].specialization = 'desert';
NewEquipment.ReptileManHideArmorSuit    = new Armor( 'Reptile Man hide armor', 30,  800,  1,  5,  3,  3, bodySuit, 'FF2E128' );
NewEquipment.ReptileManHideArmorSuit.detail = 'suit of';

NewTemplates.Wildman = {
  name  : 'Wildman',
  value :  35,
  ref   : "FF2E132",
  traits : [
    Traits.RacialDXModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.Alertness.clone(),
    Traits.AnimalEmpathy.clone(),
    Traits.DangerSense.clone(),
    Traits.DamageResistance.clone(),
    Traits.Mimicry.clone(),
    Traits.PassiveDefense.clone(),
    Traits.Silence.clone(),
    Traits.CodeofHonor.clone(),
    Traits.Pacifism.clone(),
    Traits.PovertyPoorx15.clone(),
    Traits.Primitive.clone(),
    Traits.Shyness.clone(),
    Traits.Truthfulness.clone(),
    Traits.Vow.clone(),
  ],
  skills : [
    Skills.Camouflage.clone(),
    Skills.Stealth.clone(),
    Skills.Survival.clone(),
  ],
};
NewTemplates.Wildman.traits[0].levels  =  1;
NewTemplates.Wildman.traits[1].levels  =  2;
NewTemplates.Wildman.traits[2].levels  =  2;
NewTemplates.Wildman.traits[5].levels  =  2;   // DR +2
NewTemplates.Wildman.traits[7].levels  =  1;   // PD +1
NewTemplates.Wildman.traits[8].levels  =  1;   // Silence +1
NewTemplates.Wildman.traits[9].levels  =  2;   // Code +2
NewTemplates.Wildman.traits[10].description = 'self-defense only';
NewTemplates.Wildman.traits[12].levels =  3;   // quite primitive
NewTemplates.Wildman.traits[13].levels =  2;   // very shy
NewTemplates.Wildman.traits[15].levels =  3;   // powerful vow
NewTemplates.Wildman.skills[0].points  =  1;  // Camouflage at IQ
NewTemplates.Wildman.skills[1].points  =  2;  // Stealth at DX
NewTemplates.Wildman.skills[2].points  =  6;  // Survival at IQ+2
NewTemplates.Wildman.skills[2].specialization = 'Woodland';

/* Sasquatch */

NewTemplates.WingedFolk = {
  name  : 'Winged Folk',
  value :  50,
  ref   : "FF2E136",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.AcuteVision.clone(),
    Traits.Flight.clone(),
    Traits.Fragile.clone(),
  ],
  defaults : [
    { target: 'Flight', penalty: 0, from: 'DX' }
  ],
  skills : [
    Skills.Bolas.clone(),
    Skills.Flight.clone(),
  ],
};
NewTemplates.WingedFolk.traits[0].levels  =  1;  // +1 ST
NewTemplates.WingedFolk.traits[1].levels  =  2;  // +2 DX
NewTemplates.WingedFolk.traits[2].levels  =  3;  // +3 Vision
NewTemplates.WingedFolk.traits[3].EnhLimsArray = [ { text: "Winged", value: -25 } ];
NewTemplates.WingedFolk.skills[0].points  =  2;  // Bolas at DX
NewTemplates.WingedFolk.skills[1].points  =  2;  // Flight at DX+1
NewTemplates.WingedFolk.skills[1].specialization = 'Winged';

for ( var t in NewTemplates ) {
    if( !NewTemplates[t].hasOwnProperty('key') ) NewTemplates[t].key = t;
};
