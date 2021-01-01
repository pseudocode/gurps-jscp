//if( window.console && reportLevel ) { console.log('[basic3e_library.js] loading the 3rd edition rules library (timestamp: '+(new Date().getTime())+')'); }
var libraryName = 'GURPS Basic Set 3rd edition Lite (German)';
var libraryList = [libraryName];
var ruleset = 'e3';
var CostOfLiving_for_Status = {
    '-4' : 50,
    '-3' : 50,
    '-2' : 50,
    '-1' : 100,
     0 : 200,
     1 : 400,
     2 : 800,
     3 : 1500,
     4 : 2500,
     5 : 5000,
     6 : 10000,
     7 : 20000,
     8 : 50000,
};
var defaultTL = 3;
var TechLevelOptionsList = [
    { text: 'Stone Age (0)',      value: 0,  title: 'fire, lever, language' },
    { text: 'Bronze Age (1)',     value: 1,  title: 'Athens: wheel, writing, agriculture' },
    { text: 'Iron Age (2)',       value: 2,  title: 'Rome: keystone arch' },
    { text: 'Medieval (3)',       value: 3,  title: 'pre-1450: steel weapons, mathematics with zero' },
    { text: 'Renaissance (4)',    value: 4,  title: '1450-1700: gunpowder, printing' },
    { text: 'Industrial (5)',     value: 5,  title: '1701-1900: mass production, steam power, telegraph' },
    { text: 'World Wars (6)',     value: 6,  title: '1901-1950: cars, airplanes, radio' },
    { text: 'Modern (7)',         value: 7,  title: '1951-2000: nuclear energy, computer, laser, rockets' },
    { text: 'Spacefaring (8)',    value: 8,  title: '2001-2050?: slower-than-light space travel, fusion power, implants' },
    { text: 'Starfaring (9)',     value: 9,  title: 'faster-than-light star travel, sentient computers, longevity, deteronic frombotzer' },
    { text: 'Antimatter (10)',    value: 10, title: 'antimatter power, artificial gravity, slow FTL radio' },
    { text: 'Force (11)',         value: 11, title: 'force screens, tractor beams, fast FTL radio' },
    { text: 'Gravitic (12)',      value: 12, title: 'contragravity, grav compensators, personal force screens' },
    { text: 'Worldbuilding (13)', value: 13, title: 'full terraforming of planets' },
    { text: 'Dysonian (14)',      value: 14, title: 'construction of worlds, ringworlds and so on' },
    { text: 'MT (15)',            value: 15, title: 'matter transmission, cosmic power' }
];  // Basic p185 sidebar
var TechLevelOptionsCompactList = [
    { text: '0',  value: 0,  title: 'Stone Age: fire, lever, language' },
    { text: '1',  value: 1,  title: 'Bronze Age; Athens: wheel, writing, agriculture' },
    { text: '2',  value: 2,  title: 'Iron Age; Rome: keystone arch' },
    { text: '3',  value: 3,  title: 'Medieval; pre-1450: steel weapons, mathematics with zero' },
    { text: '4',  value: 4,  title: 'Renaissance; 1450-1700: gunpowder, printing' },
    { text: '5',  value: 5,  title: 'Industrial; 1701-1900: mass production, steam power, telegraph' },
    { text: '6',  value: 6,  title: 'World Wars; 1901-1950: cars, airplanes, radio' },
    { text: '7',  value: 7,  title: 'Modern; 1951-2000: nuclear energy, computer, laser, rockets' },
    { text: '8',  value: 8,  title: 'Spacefaring; 2001-2050?: slower-than-light space travel, fusion power, implants' },
    { text: '9',  value: 9,  title: 'Starfaring: faster-than-light star travel, sentient computers, longevity, deteronic frombotzer' },
    { text: '10', value: 10, title: 'Antimatter: antimatter power, artificial gravity, slow FTL radio' },
    { text: '11', value: 11, title: 'Force: force screens, tractor beams, fast FTL radio' },
    { text: '12', value: 12, title: 'Gravitic: contragravity, grav compensators, personal force screens' },
    { text: '13', value: 13, title: 'Worldbuilding: full terraforming of planets' },
    { text: '14', value: 14, title: 'Dysonian: construction of worlds, ringworlds and so on' },
    { text: '15', value: 15, title: 'matter transmission, cosmic power' }
];  // Basic p185 sidebar
/* var TL_StartingWealth_OptionsList = [
    { text: 'low-tech ($1,000)',   value: 1000,  title: 'Fantasy/Medieval worlds' },
    { text: '6 ($750)',            value: 750,   title: 'late 19th century / early 1900s ("Roaring 20s")' },
    { text: '7 ($5,000)',          value: 5000,  title: 'Mid-20th century (WWII era)' },
    { text: '8 ($15,000)',         value: 15000, title: 'Modern (late 20th century)' },
    { text: 'high-tech ($15,000)', value: 15000, title: 'Interstellar campaign' }
];  // Basic p16 sidebar */
var StartingWealth_for_TL = [1000,1000,1000,1000,1000,750,5000,15000,15000,15000,15000,15000,15000,15000,15000,15000];
var TL_StartingWealth_OptionsList = [
    { text: 'low-tech',      value:  1000, title: 'Earth up to TL4, most fantasy settings' },
    { text: '5',             value:   750, title: '' },
    { text: '6 (1900-1930)', value:   750, title: 'early 1900s ("Roaring 20s")' },
    { text: '6 (1930s)',     value:  1000, title: '1931-1940' },
    { text: '6 (1940s)',     value:  3000, title: '1941-1950' },
    { text: '7 (1950s)',     value:  5000, title: '1951-1960' },
    { text: '7 (1960s)',     value:  7500, title: '1961-1970' },
    { text: '7 (1970s)',     value: 10000, title: '1971-1980' },
    { text: '7 (1980s)',     value: 15000, title: '1981-1990' },
    { text: '8',             value: 15000, title: '' },
    { text: '8 (cyberpunk)', value: 10000, title: '' }
];  // Compendium II p8
var LegalityClassOptionsList = [
    { text: 'Class 6',  value: 6, title: 'Wholly nonlethal items, like short-range stunners.' },
    { text: 'Class 5',  value: 5, title: 'More powerful nonlethal weapons, like stun rifles, and low-tech armor.' },
    { text: 'Class 4',  value: 4, title: 'Hunting weapons, like single-shot laser rifles, shotguns and rifles. Knives and other low-tech weapons' },
    { text: 'Class 3',  value: 3, title: 'Light concealable weapons, like most pistols, and light body armor.' },
    { text: 'Class 2',  value: 2, title: 'Medium weapons, such as single-shot elephant guns or disruptors.' },
    { text: 'Class 1',  value: 1, title: 'Military hand weapons, like automatic rifles. Light, nonlethal vehicular weapons, such as oil jets, smokescreens, vehicular stunners and water cannon.' },
    { text: 'Class 0',  value: 0, title: 'Heavy personal weapons, like hand grenades, and squad-level military weapons. Most lethal vehicular weaponry, such as heavy machine guns, rocket launchers, etc.' },
    { text: 'Class -1', value: 0, title: 'Heavy military weapons, such as guided missiles, tank guns and naval cannon. Strategic weapons such as nerve gas and nuclear warheads.' }
];  // Compendium II p188-9
var ControlRatingOptionsList = [
    { text: 'Anarchy',       value: 0, title: "There are no laws or taxes." },
    { text: 'Very free',     value: 1, title: "Nothing is illegal except (perhaps) use of force or intimidation against other citizens. Ownership of all but military weapons is unrestricted. Taxes are light or voluntary." },
    { text: 'Free',          value: 2, title: "Some laws exist; most benefit the individual. Hunting weaponry is legal. Taxes are light." },
    { text: 'Moderate',      value: 3, title: "There are many laws, but most benefit the individual. Hunting weaponry is allowed by registration. Taxes are moderate and fair." },
    { text: 'Controlled',    value: 4, title: "Many laws exist; most are for the convenience of the state. Only light weaponry may be owned, and licenses are required. Broadcast communications are regulated: private broadcasts (like CB) and printing may be restricted. Taxation is often heavy and sometimes unfair." },
    { text: 'Repressive',    value: 5, title: "There are many laws and regulations, strictly enforced. Taxation is heavy and often unfair. What civilian weapons are allowed are strictly controlled and licensed and may not be carried in public. There is strict regulation of home computers, photocopiers, broadcasters and other means of information distribution and access." },
    { text: 'Total control', value: 6, title: "Laws are numerous and complex. Taxation is crushing, taking most of an ordinary citizen's income. Censorship is common. The individual exists to serve the state. Private ownership of weaponry, broadcasting or duplication equipment is prohibited. The death penalty is common for offenses, and trials - if conducted at all - are a mockery." }
];  // Basic appendix p249; Compendium II p188
var DamageTypeOptionsList = [
    { text: 'crushing', value: 'cr' },
    { text: 'cutting',  value: 'cut' },
    { text: 'impaling', value: 'imp' }
];
var QualityEffectGroupTextForOption = {
		'other'    : 'other',
    'edged'    : 'swords/knives',
    'pole/axe' : 'axes/polearms',
    'mace/cr'  : 'maces',
    'bow'      : 'bows/crossbows',
    'gun/bw'   : 'guns/beam weapons'
};
var QualityEffectGroupOptionsList = [
    { text: 'other',             value: '' },
    { text: 'swords/knives',     value: 'edged' },
    { text: 'axes/polearms',     value: 'pole/axe' },
    { text: 'maces',             value: 'mace/cr' },
    { text: 'bows/crossbows',    value: 'bow' },
    { text: 'guns/beam weapons', value: 'gun/bw' }
];  // Basic p74 sidebar
var ShieldSkillsOptionsList = [
    { text: 'Shield', value: 'Shield' },
    { text: 'Buckler',  value: 'Buckler' },
    { text: 'Force Shield', value: 'ForceShield' },
    { text: 'Cloak', value: 'Cloak' }
];
var AttributeOptionsList = [
    { text: 'ST', value: 'ST' },
    { text: 'GE', value: 'DX' },
    { text: 'IQ', value: 'IQ' },
    { text: 'KO', value: 'HT' }
];



/****  traits and traits  ****/

/* Traits methods */
var AttributeCostFunction3e = function( levels ) {
         if( levels >=  8 ) return 100 + 25*(levels-7);
    else if( levels >=  6 ) return  60 + 20*(levels-5);
    else if( levels >=  4 ) return  30 + 15*(levels-3);
    else if( levels >= -1 ) return       10*levels;
    else if( levels == -2 ) return -15;
    else if( levels <  -2 ) return       10*(levels+1);
} // not using this at the moment

Traits = {};

/*
The 'group' flag indicates a set of traits from which a character may only take one instance.
A character cannot, for instance, be both 'attractive' and 'hideous'.
*/
// physical appearance group
// Traits.AppearanceHorrific      = new Trait( "Horrific", 'D', 'P', -30, false, "CI80" );
// Traits.AppearanceHorrific.group = 'appearance';
// Traits.AppearanceHorrific.description = '-6 rxn';
// Traits.AppearanceMonstrous     = new Trait( "Monstrous", 'D', 'P', -25, false, "CI80" );
// Traits.AppearanceMonstrous.group = 'appearance';
// Traits.AppearanceMonstrous.description = '-5 rxn';
Traits.AppearanceHideous       = new Trait( "Hideous", 'D', 'P', -20, false, "B3E15" );
Traits.AppearanceHideous.group = 'appearance';
Traits.AppearanceHideous.description = '-4 rxn';
Traits.AppearanceUgly          = new Trait( "Ugly", 'D', 'P', -10, false, "B3E15" );
Traits.AppearanceUgly.group = 'appearance';
Traits.AppearanceUgly.description = '-2 rxn';
Traits.AppearanceUnattractive  = new Trait( "Unattractive", 'D', 'P', -5, false, "B3E15" );
Traits.AppearanceUnattractive.group = 'appearance';
Traits.AppearanceUnattractive.description = '-1 rxn';
Traits.AppearanceAttractive    = new Trait( "Attractive", 'A', 'P', 5, false, "B3E15" );
Traits.AppearanceAttractive.group = 'appearance';
Traits.AppearanceAttractive.description = '+1 rxn';
Traits.AppearanceBeautiful     = new Trait( "Beautiful", 'A', 'P', 15, false, "B3E15" );
Traits.AppearanceBeautiful.group = 'appearance';
Traits.AppearanceBeautiful.description = '+2 rxn; +4 by those attracted to your sex';
Traits.AppearanceHandsome      = new Trait( "Handsome", 'A', 'P', 15, false, "B3E15" );
Traits.AppearanceHandsome.group = 'appearance';
Traits.AppearanceHandsome.description = '+2 rxn; +4 by those attracted to your sex';
Traits.AppearanceVeryBeautiful = new Trait( "Very Beautiful", 'A', 'P', 25, false, "B3E15" );
Traits.AppearanceVeryBeautiful.group = 'appearance';
Traits.AppearanceVeryBeautiful.description = '+2 rxn; +6 by those attracted to your sex';
Traits.AppearanceVeryHandsome  = new Trait( "Wunderschön", 'A', 'P', 25, false, "B3E15" );
Traits.AppearanceVeryHandsome.group = 'appearance';
Traits.AppearanceVeryHandsome.description = '+2 rxn; +6 by those attracted to your sex';

// could do this way
Traits.Appearance          = new Trait( "Aussehen" , 'AD', 'P', 5, true, "B3E15" );
Traits.Appearance.group = 'appearance';
Traits.Appearance.hasLevels = true;
Traits.Appearance.posNegLevels = true;
Traits.Appearance.lowestLevel = -6;
Traits.Appearance.highestLevel = 4;
Traits.Appearance.levelNames
    = [ 'Horrific','Monstrous','Hideous','Revolting','Ugly','Unattractive','Average',
        'Attractive','Good-Looking','Handsome/Beautiful','Wunderschön'];
// If I do it this way, I could define the various separate traits above and below by cloning from this one.
// How to clone just a single level of a trait with levels?  (Analogous to similar problem with Skills)
// Then Adjustments could be done more simply:
// Adjustments.whatever_from_appearance = { from: 'Appearance', fromCat: 'AD', amount: 1, targetCat: 'SK', target: 'whatever' }
// This would get you a bonus (or penalty) equal to the level associated with that appearance.

// Traits.SpatialSense3D      = new Trait( "3D Spatial Sense", 'A', 'P', 10, false, "CI30" );
// Traits.Vision360           = new Trait( "360° Vision", 'A', 'P', 25, false, "CI68" );
// Traits.Vision360.exoticSprntl = 'Exotic';
// Traits.Vision360.mods = "Eyestalks";

// Traits.AccelerationTolerance = new Trait( "Acceleration Tolerance", 'A', 'P', 10, false, "CI19" );
// Traits.AccelerationWeakness = new Trait( "Acceleration Weakness", 'D', 'P', -5, false, "CI79" );
// Traits.AbsentMinded        = new Trait( "Absent-Minded", 'D', 'M', -15, false, "B3E30" );
Traits.AbsoluteDirection   = new Trait( "Richtungssinn", 'A', 'M', 5, false, "GL12" );
// Traits.AbsoluteTiming      = new Trait( "Absolute Timing", 'A', 'M', 5, false, "B3E19" );
// Traits.Absorption          = new Trait( "Absorption", 'A', 'P', 12, true, "CI49" );
// Traits.Absorption.description = 'what kind of attack damage is absorbed';
// Traits.Absorption.exoticSprntl = 'Exotic';
// Traits.Absorption.levelsName = 'die of damage';
// Traits.Absorption.mods = 'Absorption';
// Traits.AcuteFaz            = new Trait( "Acute Faz", 'A', 'P', 2, true, "CI55" );
Traits.AcuteHearing        = new Trait( "Ausgeprägtes Gehör", 'A', 'P', 2, true, "GL10" );
Traits.AcuteHearing.group = 'hearing';
Traits.AcuteTasteSmell     = new Trait( "Ausgeprägter Geruchs- und Geschmackssinn", 'A', 'P', 2, true, "GL10" );
Traits.AcuteVision         = new Trait( "Ausgeprägtes Sehvermögen", 'A', 'P', 2, true, "GL10" );
Traits.AcuteVision.group = 'vision';
// Traits.Addiction           = new Trait( "Addiction", 'D', 'M', 0, false, "B3E30" );
// Traits.Addiction.multiple = true;
// Traits.Addiction.mods = "Addiction, Legality";
Traits.Age50plus           = new Trait( "Alter", 'D', 'P', -3, true, "B3E27" );
Traits.Age50plus.levelsName = 'Jahre';
Traits.Age50plus.detail = '50+';
// Traits.AdministrativeRank  = new Trait( "Administrative Rank", 'A', 'So', 5, true, "CI19" );
// Traits.Albinism            = new Trait( "Albinism", 'D', 'P', -10, false, "B3E27" );
// Traits.AlcoholTolerance    = new Trait( "Alcohol Tolerance", 'A', 'P', 5, false, "CI19" );
// Traits.Alcoholic           = new Trait( "Alcoholic", 'D', 'P', -15, false, "B3E30" );
// Traits.Alcoholic.mods = "Legality";
Traits.Alertness           = new Trait( "Wachsamkeit", 'A', 'P', 5, true, "GL12" );
// Traits.AllergicSusceptibility= new Trait( "Allergic Susceptibility", 'D', 'P', -5, true, "CI96" );
// Traits.AllergicSusceptibility.exoticSprntl = 'Supernatural';
// Traits.AllergicSusceptibility.levelsName = 'prevalence level';
// Traits.AllergicSusceptibility.levelNames = ['occasional','common','very common'];
// Traits.AllergicSusceptibility.multiple = true;
// Traits.Ally                = new Trait( "Ally", 'A', 'So', 5, true, "B3E23" );
// Traits.Ally.instructions = 'Cannot exceed your pts by >50.';
// Traits.Ally.multiple = true;
// Traits.Ally.mods = "Allies, Frequency, Favor";
// Traits.Ally.levelsName = 'power level';
// Traits.Ally.levelNames = ['76-100 pts','101-150 pts','151-200 pts','201-250 pts','251-300 pts'];
// Traits.AllyGroup           = new Trait( "Ally Group", 'A', 'So', 10, true, "B3E232; CI19" );
// Traits.AllyGroup.instructions = 'Alla Group members have 75 points by default';
// Traits.AllyGroup.multiple = true;
// Traits.AllyGroup.highestLevel = 3;
// Traits.AllyGroup.levelsName = 'power level';
// Traits.AllyGroup.levelNames = ["2-5 members","6-20 members","20-100, or 6-20 w/ some formidable"];
// Traits.AllyGroup.mods = "Ally Group, Frequency, Favor";
// Traits.AllyGroupSmall      = new Trait( "Ally Group (2-5)", 'So', 10 );
// Traits.AllyGroupSmall.multiple = true;
// Traits.AllyGroupSmall.mods = "Ally Group, Frequency";
// Traits.AllyGroupMedium     = new Trait( "Ally Group (6-20)", 'So', 20 );
// Traits.AllyGroupMedium.multiple = true;
// Traits.AllyGroupMedium.mods = "Ally Group, Frequency";
// Traits.AllyGroupMediumGood = new Trait( "Ally Group (6-20, some good)", 'So', 30 );
// Traits.AllyGroupMediumGood.multiple = true;
// Traits.AllyGroupMediumGood.mods = "Ally Group, Frequency";
// Traits.AllyGroupLarge      = new Trait( "Ally Group (21-100)", 'So', 30 );
// Traits.AllyGroupLarge.multiple = true;
// Traits.AllyGroupLarge.mods = "Ally Group, Frequency";
// Traits.AlteredTimeRate     = new Trait( "Altered Time Rate", 'A', 'M', 100, true, "CI49" );
// Traits.AlteredTimeRate.levelsName = 'extra turn-maneuver';
// Traits.AlteredTimeRate.exoticSprntl = 'Exotic';
// Traits.AlternateIdentity   = new Trait( "Alternate Identity", 'A', 'So', 15, false, "B3E233; CI20" );
// Traits.AlternateIdentity.multiple = true;
// Traits.AlternateIdentity.mods = "altID";
Traits.Ambidexterity       = new Trait( "Beidhändigkeit", 'A', 'P', 10, false, "B3E19" );
// Traits.Amnesia             = new Trait( "Amnesia", 'D', 'M', -15, true, "B3E239; CI86" );
// Traits.Amnesia.fixedCost = 5;
// Traits.Amnesia.lowestLevel = 1;
// Traits.Amnesia.levelNames = ['Partial','Total'];
// Traits.Amphibious          = new Trait( "Amphibious", 'A', 'P', 10, false, "CI49" );
// Traits.Amphibious.exoticSprntl = 'Exotic';
// Traits.Anaerobic           = new Trait( "Anaerobic", 'D', 'P', -30, false, "CI101" );
// Traits.Anaerobic.exoticSprntl = 'Exotic';
Traits.AnimalEmpathy       = new Trait( "Gespür für Tiere", 'A', 'M', 5, false, "GL11" );
Traits.AnimalEmpathy.exoticSprntl = 'Supernatural';
// Traits.AnimalForm          = new Trait( "Animal Form", 'A', 'P', 100, false, "CI33" );
// Traits.AnimalForm.multiple = true;
// Traits.AnimalForm.exoticSprntl = 'Supernatural';
// Traits.AnimalForm.mods = 'ExtinctForm';
// Traits.Anosmia             = new Trait( "Anosmia", 'D', 'P', -5, false, "B3E29" );
// Traits.Anosmia.buttonLabel = 'Anosmia';
// Traits.Anosmia.description = "No Sense of Smell/Taste";
// Traits.Aquatic             = new Trait( "Aquatic", 'D', 'P', -40, false, "CI101" );
// Traits.Aquatic.exoticSprntl = 'Exotic';
// Traits.ScalesArmorPlates   = new Trait( "Armor Plates, scales", 'A', 'P', 59, false, "CI57" );
// Traits.ScalesArmorPlates.exoticSprntl = 'Exotic';
// Traits.AstralEntity        = new Trait( "Astral Entity", 'D', 'P', -25, false, "CI96" );
// Traits.Autotrance          = new Trait( "Autotrance", 'A', 'M', 5, false, "CI20" );
// Traits.Awareness           = new Trait( "Wachsamkeit", 'A', 'M', 15, false, "GL12" );
// Traits.Awareness.exoticSprntl = 'Supernatural';
// Traits.AwarenessAuras      = new Trait( "Awareness + auras", 'A', 'M', 35, false, "CI33" );
// Traits.AwarenessAuras.exoticSprntl = 'Supernatural';

// Traits.BadBack             = new Trait( "Bad Back", 'D', 'P', -10, true, "CI80" );
// Traits.BadBack.fixedCost = -5;
// Traits.BadBack.lowestLevel = 1;
// Traits.BadBack.levelNames = ['','severe'];
// Traits.BadGrip             = new Trait( "Bad Grip", 'D', "P", -10, false, "CI101" );
// Traits.BadGrip.group = 'manipulators';
// Traits.BadSmell            = new Trait( "Bad Smell", 'D', 'P', -10, false, "CI80" );
Traits.BadTemper           = new Trait( "Unbeherrschtheit", 'D', "M", -10, false, "GL16" );
Traits.BadTemper.group = 'temper';
Traits.BadSight            = new Trait( "Sehfehler", 'D', "P", -25, false, "GL16" );
Traits.BadSight.mods = 'vision';
Traits.BadSight.group = 'vision';
// Traits.BardicImmunity      = new Trait( "Bardic Immunity", 'A', 'So', 10, false, "CI21" );
// Traits.BeastKin            = new Trait( "Beast-Kin", 'A', 'M', 15, false, "CI21" );
// Traits.BeingofPureThought  = new Trait( "Being of Pure Thought", 'A', 'P', 290, false, "CI34" );
// Traits.BeingofPureThought.exoticSprntl = 'Supernatural';
// Traits.Berserk             = new Trait( 'Berserk', 'D', 'M', -15, false, "B3E31" );
// Traits.Berserk.group = 'temper';
// Traits.Bestial             = new Trait( "Bestial", 'D', "M", -10, false, "CI101" );
// Traits.Bestial.exoticSprntl = 'Exotic';
// Traits.Bestial.mods = 'Savage';
// Traits.BioelectricShock    = new Trait( "Bioelectric Shock", 'A', 'P', 10, false, "CI50" );
// Traits.BioelectricShock.exoticSprntl = 'Exotic';
// Traits.Bite                = new Trait( "Bite", 'A', 'P', 5, true, "CI50" );
// Traits.Bite.fixedCost = 30;
// Traits.Bite.levelsName = 'extra per-turn drained HT pt';
// Traits.Bite.lowestLevel = 0;
// Traits.Bite.exoticSprntl = 'Exotic';
// Traits.Blessed             = new Trait( "Blessed", 'M', 10, false, "CI34" );
// Traits.Blessed.mods = 'Blessed';
// Traits.BlessedDivination = new Trait( "Blessed, Divination", 'A', 'M', 10, true, "B3E233; CI34" );
// Traits.BlessedDivination.highestLevel = 2;
// Traits.BlessedDivination.description = [];
// Traits.BlessedDivination.exoticSprntl = 'Supernatural';
// Traits.BlessedHeroicFeatsST = new Trait( "Blessed, Heroic Feats of ST", 'A', 'M', 10, false, "B3E234; CI34" );
// Traits.BlessedHeroicFeatsST.exoticSprntl = 'Supernatural';
// Traits.BlessedHeroicFeatsDX = new Trait( "Blessed, Heroic Feats of DX", 'A', 'M', 10, false, "B3E234; CI34" );
// Traits.BlessedHeroicFeatsDX.exoticSprntl = 'Supernatural';
// Traits.BlessedHeroicFeatsHT = new Trait( "Blessed, Heroic Feats of HT", 'A', 'M', 10, false, "B3E234; CI34" );
// Traits.BlessedHeroicFeatsHT.exoticSprntl = 'Supernatural';
// for other variants of Blessed (Immunity, etc.), take the equivalent advantage directly (perhaps with a zero-point modifier indicating that it is a Blessing)
// Traits.Blind               = new Trait( "Blind", 'D', "P", -50, false, "B3E27" );
// Traits.Blind.group = 'vision';
// Traits.Bloodlust           = new Trait( "Bloodlust", 'D', "M", -10, false, "B3E31" );
// Traits.Bloodthirst         = new Trait( "Bloodthirst", 'D', 'P', -15, false, "CI96" );
// Traits.BodyofAir           = new Trait( "Body of Air", 'A', 'P', 50, false, "CI50" );
// Traits.BodyofAir.exoticSprntl = 'Exotic';
// Traits.BodyofAir.group = 'bodyof';
// Traits.BodyofAir.mods = 'Body of Air, Carry Objects, Unswitchable Disad';
// Traits.BodyofEarth         = new Trait( "Body of Earth", 'A', 'P', 40, false, "CI50" );
// Traits.BodyofEarth.exoticSprntl = 'Exotic';
// Traits.BodyofEarth.group = 'bodyof';
// Traits.BodyofEarth.mods = 'BodyofEarth';
// Traits.BodyofFire          = new Trait( "Body of Fire", 'A', 'P', 5, true, "CI50" );
// Traits.BodyofFire.exoticSprntl = 'Exotic';
// Traits.BodyofFire.group = 'bodyof';
// Traits.BodyofFire.mods = 'BodyofFire';
// Traits.BodyofIce           = new Trait( "Body of Ice", 'A', 'P', 25, false, "CI50" );
// Traits.BodyofIce.exoticSprntl = 'Exotic';
// Traits.BodyofIce.group = 'bodyof';
// Traits.BodyofIce.mods = 'BodyofIce';
// Traits.BodyofMetal         = new Trait( "Body of Metal", 'A', 'P', 9, true, "CI50" );
// Traits.BodyofMetal.exoticSprntl = 'Exotic';
// Traits.BodyofMetal.group = 'bodyof';
// Traits.BodyofMetal.mods = 'BodyofMetal';
// Traits.BodyofStone         = new Trait( "Body of Stone", 'A', 'P', 8, true, "CI51" );
// Traits.BodyofStone.exoticSprntl = 'Exotic';
// Traits.BodyofStone.group = 'bodyof';
// Traits.BodyofStone.mods = 'BodyofStone';
// Traits.BodyofWater         = new Trait( "Body of Water", 'A', 'P', 40, false, "CI51" );
// Traits.BodyofWater.exoticSprntl = 'Exotic';
// Traits.BodyofWater.group = 'bodyof';
// Traits.BodyofWater.mods = 'BodyofWater, Carry Objects, Unswitchable Disad';
// Traits.Bouncing            = new Trait( "Bouncing", 'A', 'P', 12, true, "CI51" );
// Traits.Bouncing.exoticSprntl = 'Exotic';
// Traits.Bouncing.mods = 'Bouncing';
// Traits.Brachiator          = new Trait( "Brachiator", 'A', 'P', 5, false, "CI51" );
// Traits.Brachiator.exoticSprntl = 'Exotic';
// Traits.BreatheFireCheap    = new Trait( "Breathe Fire, cheap", 'A', 'P', 6, true, "CI72" );
// Traits.BreatheFireCheap.exoticSprntl = 'Exotic';
// Traits.BreatheFireCheap.fixedCost = 14;
// Traits.BreatheFireCheap.lowestLevel = 1;
// Traits.BreatheFireCheap.levelsName = 'die';
// Traits.BreatheFireCheap.mods = 'Natural Attacks (Cheap), Natural Attack DX roll';
// Traits.BreatheFire         = new Trait( "Breathe Fire", 'A', 'P', 20, false, "CI72" );
// Traits.BreatheFire.exoticSprntl = 'Exotic';
// Traits.BreatheFire.mods = 'Natural Attack Damage, Natural Attack Range, Natural Attack Skill, Natural Attack DX roll';
// Traits.BreathHolding       = new Trait( "Breath-Holding", 'A', 'P', 2, true, "CI21" );
// Traits.BreathHolding.group = "breathing";
// Traits.Broadcast           = new Trait( "Broadcast", 'A', 'P', 3, true, "CI51" );
// prereq: Radio Hearing
// Traits.Broadcast.exoticSprntl = 'Exotic';
// Traits.Broadcast.mods = 'Broadcast';
Traits.Bully               = new Trait( "Tyrann", 'D', 'M', -10, false, "GL16" );

// Traits.Callous             = new Trait( "Callous", 'D', 'M', -6, false, "CI86" );
// Traits.Callous.group = 'empathy';
Traits.CannotHarmInnocents = new Trait( "Cannot Harm Innocents", 'D', 'M', -10, false, "CI86" );
// Traits.CannotLearn         = new Trait( "Cannot Learn", 'D', 'M', -30, false, "CI86" );
// Traits.Carapace            = new Trait( "Carapace", 'A', 'P', 56, false, "CI57" );
// Traits.Carapace.exoticSprntl = 'Exotic';
// Traits.CastIronStomach     = new Trait( "Cast-Iron Stomach", 'A', 'P', 15, false, "CI51" );
// Traits.CastIronStomach.exoticSprntl = 'Exotic';
// Traits.Catfall             = new Trait( "Catfall", 'A', 'P', 10, false, "CI51" );
// Traits.Catfall.exoticSprntl = 'Exotic';
// Traits.Chameleon           = new Trait( "Chameleon", 'A', 'P', 7, true, "CI51" );
// Traits.Chameleon.exoticSprntl = 'Exotic';
// Traits.Chameleon.mods = 'Chameleon';
// Traits.Channeling          = new Trait( "Channeling", 'A', 'M', 10, false, "CI34" );
// Traits.Channeling.exoticSprntl = 'Supernatural';
Traits.Charisma            = new Trait( 'Charisma', 'A', 'M', 5, true, "B3E19" );
// Traits.Charitable          = new Trait( "Charitable", 'D', 'M', -15, false, "CI86" );
// Traits.ChronicDepression   = new Trait( "Chronic Depression", 'D', 'M', -2, true, "CI87" );
// Traits.ChronicDepression.fixedCost = -15;
// Traits.ChronicDepression.highestLevel = 5;
// Traits.ChronicDepression.levelsName = 'Will roll minus';
// Traits.Chronolocation      = new Trait( "Chronolocation", 'A', 'M', 15, false, "CI21" );
// Traits.Chummy              = new Trait( "Chummy", 'D', 'M', -5, false, "CI87" );
// Traits.ClaimtoHospitality  = new Trait( "Claim to Hospitality", 'A', 'So', 'varies', false, "CI21" );
// Traits.ClaimtoHospitality.requestBasicCost = true;
// Traits.ClaimtoHospitality.multiple = true;
// Traits.Claws               = new Trait( "Claws", 'A', 'P', 15, false, "CI67" );
// Traits.Claws.exoticSprntl = 'Exotic';
// Traits.Claws.mods = 'Claws';
// Traits.ClericalInvestment  = new Trait( "Clerical Investment", 'A', 'So', 5, true, "B3E19; CI22 & 35" );
// Traits.ClericalInvestment.description = [];
// Traits.ClericalInvestment.levelsName = 'rank';
// Traits.ClericalInvestment.mods = 'Clerical Magic';
// Traits.Clinging            = new Trait( "Clinging", 'A', 'P', 25, false, "CI51" );
// Traits.Clinging.exoticSprntl = 'Exotic';
// Traits.Clinging.mods = 'Clinging';
// Traits.Clueless            = new Trait( "Clueless", 'D', 'M', -10, false, "CI87" );
Traits.CodeofHonor         = new Trait( "Ehrenkodex", 'D', 'M', -5, true, "GL13" );
Traits.CodeofHonor.highestLevel = 3;
Traits.CodeofHonor.multiple = true;
// Traits.ColdBlooded         = new Trait( "Cold-Blooded", 'D', 'P', -5, true, "CI101" );
// Traits.ColdBlooded.exoticSprntl = 'Exotic';
// Traits.ColdBlooded.levelsName = 'threshold temperature';
// Traits.ColdBlooded.levelNames = ['50&deg;','65&deg;'];
// Traits.Collected           = new Trait( "Collected", 'A', 'M', 5, false, "CI22" );
// Traits.ColorBlind          = new Trait( "Color Blind", 'D', 'P', -10, false, "B3E28" );
// Traits.CombatParalysis     = new Trait( "Combat Paralysis", 'D', 'M', -15, false, "B3E32" );
Traits.CombatReflexes      = new Trait( "Kampfreflexe", 'A', 'M', 15, false, "GL11" );
Traits.CombatReflexes.group = 'reflexes';
Traits.CommonSense         = new Trait( "Gesunder Menschenverstand", 'A', 'M', 10, false, "GL11" );
// Traits.CompartmentalizedMind = new Trait( "Compartmentalized Mind", 'A', 'M', 50, true, "CI52" );
// Traits.CompartmentalizedMind.exoticSprntl = 'Exotic';
// Traits.CompartmentalizedMind.mods = 'CompartmentalizedMind';
// Traits.Composed            = new Trait( "Composed", 'A', 'M', 5, false, "CI22" );
Traits.CompulsiveBehavior  = new Trait( "Zwanghaftes Verhalten", 'D', 'M', -5, true, "GL16" );
Traits.CompulsiveBehavior.highestLevel = 3;
Traits.CompulsiveBehavior.multiple = true;
// Traits.CompulsiveCarousing = new Trait( "Compulsive Carousing", 'D', 'M', -5, false, "B3E239; CI87" );
// Traits.CompulsiveCarousing.mods = 'Carousing';
// Traits.CompulsiveGambling  = new Trait( "Compulsive Gambling", 'D', 'M', -5, true, "CI88" );
// Traits.CompulsiveGambling.levelNames = ['<1 hr/day','1-6 hrs/day','6+ hrs/day'];
// Traits.CompulsiveGenerosity= new Trait( "Compulsive Generosity", 'D', 'M', -5, false, "B3E239; CI88" );
// Traits.CompulsiveLying     = new Trait( "Compulsive Lying", 'D', 'M', -15, false, "B3E32" );
// Traits.CompulsiveSpending  = new Trait( "Compulsive Spending", 'D', 'M', -5, true, "CI88" );
// Traits.CompulsiveSpending.levelNames = ['mild','serious','wastrel'];
// Traits.CompulsiveSpendthrift=new Trait( "Compulsive Spendthrift", 'D', 'M', -5, true, "B3E240" );
// Traits.CompulsiveSpendthrift.levelNames = ['mild','serious','wastrel'];
// Traits.CompulsiveVowing    = new Trait( "Compulsive Vowing", 'D', 'M', -5, false, "CI88" );
// Traits.Confused            = new Trait( "Confused", 'D', 'M', -10, false, "CI88" );
// Traits.ConstrictionAttack  = new Trait( "Constriction Attack", 'A', 'P', 15, false, "CI52" );
// prereq: Extra Flexibility
// Traits.ConstrictionAttack.exoticSprntl = 'Exotic';
// Traits.Contact             = new Trait( "Contact", 'A', 'So', 1, true, "B3E234; CI22" );
// Traits.Contact.highestLevel = 4;
// Traits.Contact.levelNames = ['12+','15+','18+','21+'];
// Traits.Contact.levelsName = 'effective skill level';
// Traits.Contact.multiple = true;
// Traits.Contact.mods = "Frequency, Reliability, Favor";
// Traits.Cool                = new Trait( "Cool", 'P', 'M', 1, false, "CI23" );
// Traits.CoolCheap           = new Trait( "Cool, cheap", 'A', 'P', 6, true, "CI72" );
// Traits.CoolCheap.exoticSprntl = 'Exotic';
// Traits.CoolCheap.fixedCost = 9;
// Traits.CoolCheap.lowestLevel = 1;
// Traits.CoolCheap.levelsName = '10&deg; drop';
// Traits.CoolCheap.mods = 'Natural Attacks (Cheap), At Will, Natural Attack IQ roll';
// Traits.CoolNaturalAttack   = new Trait( "Cool", 'A', 'P', 15, false, "CI72" );
// Traits.CoolNaturalAttack.exoticSprntl = 'Exotic';
// Traits.CoolNaturalAttack.mods = 'At Will, Natural Attack Skill, Natural Attack Area, Natural Attack IQ roll';
// Traits.Costume             = new Trait( "Costume", 'A', 'P', 15, false, "CI52" );
// Traits.Costume.exoticSprntl = 'Exotic';
// Traits.Costume.cinematic = true;
// Traits.CourtesyRank        = new Trait( "Courtesy Rank", 'A', 'So', 1, true, "CI23" );
// Traits.Coward              = new Trait( "Feigheit", 'D', 'M', -10, false, "GL14" );
// Traits.CulturalAdaptability= new Trait( "Cultural Adaptability", 'A', 'M', 25, false, "CI23" );
// Traits.Curious             = new Trait( "Curious", 'D', 'M', -5, true, 'B3E240' );
// Traits.Curious.levelNames = ['','extreme','insatiable'];
// Traits.Cursed              = new Trait( "Cursed", 'D', 'M', -75, false, "B3E240; CI96" );
// Traits.Cursed.exoticSprntl = 'Supernatural';
// Traits.CyberRejection      = new Trait( "Cyber-Rejection", 'D', 'P', -15, true, "CI81" );
// Traits.CyberRejection.fixedCost = 5;
// Traits.CyberRejection.lowestLevel = 1;
// Traits.CyberRejection.levelNames = ['implants uncommon','implants common'];

// Traits.DamageResistance    = new Trait( "Damage Resistance", 'A', 'P', 3, true, "CI52" );
// Traits.DamageResistance.exoticSprntl = 'Exotic';
// Traits.DamageResistance.mods = "DR, Ablative, Hardened";
// Traits.DamageResistance.multiple = true;    // for cases like Alligator template (Bestiary pg 107), DR varies by body location
// Traits.DampenCheap         = new Trait( "Dampen, cheap", 'A', 'P', 6, true, "CI72" );
// Traits.DampenCheap.exoticSprntl = 'Exotic';
// Traits.DampenCheap.fixedCost = 9;
// Traits.DampenCheap.lowestLevel = 1;
// Traits.DampenCheap.mods = 'Natural Attacks (Cheap), Natural Attack Involuntary, Natural Attack IQ roll';
// Traits.Dampen              = new Trait( "Dampen", 'A', 'P', 15, false, "CI72" );
// Traits.Dampen.exoticSprntl = 'Exotic';
// Traits.Dampen.mods = 'Natural Attack Area, Natural Attack Skill, Natural Attack Involuntary, Natural Attack IQ roll';
Traits.DangerSense         = new Trait( "Gefahreninstinkt", 'A', 'M', 15, false, "GL11" );
// Traits.DangerSense.exoticSprntl = 'Supernatural'
Traits.Daredevil           = new Trait( "Wagemut", 'A', 'M', 15, false, "GL12" );
// Traits.DarkVision          = new Trait( "Dark Vision", 'A', 'P', 25, false, "B3E235; CI52" );
// Traits.DarkVision.exoticSprntl = 'Exotic';
// Traits.DarkVision.takesConstantMods = true;
// Traits.DarkVision.group = "Dark Vision";
// Traits.DarkVision.mods = "Dark Vision";
// Traits.Deaf                = new Trait( 'Deaf', 'D', 'P', -20, false, "B3E28" );
// Traits.Deaf.group = 'hearing';
// Traits.DeafenCheap         = new Trait( "Deafen, cheap", 'A', 'P', 6, true, "CI72" );
// Traits.DeafenCheap.exoticSprntl = 'Exotic';
// Traits.DeafenCheap.fixedCost = 9;
// Traits.DeafenCheap.lowestLevel = 1;
// Traits.DeafenCheap.mods = 'Natural Attacks (Cheap), Natural Attack IQ roll';
// Traits.Deafen              = new Trait( "Deafen", 'A', 'P', 15, false, "CI72" );
// Traits.Deafen.exoticSprntl = 'Exotic';
// Traits.Deafen.mods = 'Natural Attack Area, Natural Attack Range, Natural Attack Skill, Natural Attack Duration, Natural Attack DX roll';
// Traits.DecreasedLifeSupport= new Trait( "Decreased Life Support", 'A', 'P', 10, false, "CI52" );
// Traits.DecreasedLifeSupport.exoticSprntl = 'Exotic';
// Traits.DecreasedTimeRate   = new Trait( "Decreased Time Rate", 'D', 'M', -100, false, "CI101" );
// Traits.DecreasedTimeRate.exoticSprntl = 'Exotic';
/*Traits.DecreasedDX         = new Trait( "Decreased Dexterity", 'P', 'att', true );
Traits.DecreasedHT         = new Trait( "Decreased Health", 'P', 'att', true );
Traits.DecreasedIQ         = new Trait( "Decreased Intelligence", 'M', 'att', true );
Traits.DecreasedSpeed      = new Trait( "Decreased Basic Speed", 'P', -5, true );*/
// Traits.DeepSleeper         = new Trait( "Deep Sleeper", 'A', 'P', 5, false, "CI23" );
// Traits.DelicateMetabolism  = new Trait( "Delicate Metabolism", 'D', 'P', -20, true, "CI81" );
// Traits.DelicateMetabolism.highestLevel = 2;
// Traits.Delusion            = new Trait( "Delusion", 'D', 'M', -5, true, "B3E32" );
// Traits.Delusion.multiple = true;
// Traits.Delusion.levelsName = 'severity level';
// Traits.Delusion.levelNames = ['Minor','Major','Severe'];
// Traits.Dependency          = new Trait( "Dependency", 'D', 'P', 0, false, "CI81" );
// Traits.Dependency.exoticSprntl = 'Exotic';
// Traits.Dependency.mods = "Dependency,Legality";
// Traits.Dependency.multiple = true;
// Traits.Dependent           = new Trait( "Dependent", 'D', 'So', -6, false, "B3E38" );
// Traits.Dependent.takesMultipliers = true;
// Traits.Dependent.multiple = true;     // character can take this ad or disad multiple times
// Traits.Dependent.mods = "Dependent, Frequency";
// Traits.Destiny             = new Trait( "Destiny", 'A', 'So', 5, true, "B3E235; CI35, 97" );
// Traits.Destiny.exoticSprntl = 'Supernatural';
// Traits.Destiny.lowestLevel = -3;
// Traits.Destiny.levelNames = [ "Great Disadvantage", "Major Disadvantage", "Minor Disadvantage",
//                                   "", "Minor Advantage", "Major Advantage", "Great Advantage", ];
// Traits.DiplomaticImmunity  = new Trait( "Diplomatic Immunity", 'A', 'So', 20, false, "CI24" );
// Traits.DisciplineOfFaith   = new Trait( "Discipline Of Faith", 'D', 'M', -5, true, "CI89" );
// Traits.DisciplineOfFaith.description = [];
// Traits.DisciplineOfFaith.instructions = 'describe religious discipline (Ascetic, Monastic, Ritualistic, etc.)';
// Traits.DisciplineOfFaith.highestLevel = 3;
// Traits.DiscriminatorySmell = new Trait( "Discriminatory Smell", 'A', 'P', 15, false, "CI52" );
// Traits.DiscriminatorySmell.exoticSprntl = 'Exotic';
// Traits.DiscriminatorySmell.mods = 'Smell';
// Traits.DiscriminatoryTaste = new Trait( "Discriminatory Taste", 'A', 'P', 10, false, "CI53" );
// Traits.DiscriminatoryTaste.exoticSprntl = 'Exotic';
Traits.DiseaseResistant    = new Trait( "Disease-Resistant", 'A', 'P', 5, false, "CI24" );
// Disembodied Brain disad is cloned from No Physical Body
// Traits.Disowned            = new Trait( "Disowned", 'D', 'So', -10, true, "CI77" );
// Traits.Disowned.fixedCost = 5;
// Traits.Disowned.lowestLevel = 1;
// Traits.Disowned.levelNames = ['supplanted','publicly shamed'];
// Traits.DisturbingVoice     = new Trait( "Disturbing Voice", 'D', 'P', -10, false, "CI81" );
// Traits.DisturbingVoice.group = "voice";
// Traits.DivinationTalent    = new Trait( "Divination Talent", 'A', 'M', 5, false, "CI36" );
// Traits.DivinationTalent.exoticSprntl = 'Supernatural';
// Traits.DivinationTalent.multiple = true;
// Traits.DivineCurse         = new Trait( "Divine Curse", 'D', 'So', 'varies', false, "CI96" );
// Traits.DivineCurse.exoticSprntl = 'Supernatural';
// Traits.DivineCurse.instructions = 'If cursed with an existing disad, take that disad with a "Divine Curse" modifier; use Divine Curse only for a "custom" curse.';
// Traits.DivineFavor         = new Trait( "Divine Favor", 'A', 'So', 25, false, "CI36" );
// Traits.DivineFavor.exoticSprntl = 'Supernatural';
// Traits.DivineFavor.mods = "Divine, Frequency";
// Traits.DoesntBreathe       = new Trait( "Doesn't Breathe", 'A', 'P', 20, false, "CI53" );
// Traits.DoesntBreathe.group = "breathing";
// Traits.DoesntBreathe.mods = "DoesntBreathe";
// Traits.DoesntEatorDrink    = new Trait( "Doesn't Eat or Drink", 'A', 'P', 10, false, "CI53" );
// Traits.DoesntEatorDrink.exoticSprntl = 'Exotic';
// Traits.DoesntSleep         = new Trait( "Doesn't Sleep", 'A', 'P', 20, false, "CI53" );
// Traits.DoesntSleep.exoticSprntl = 'Exotic';
// Traits.Dominance           = new Trait( "Dominance", 'A', 'M', 15, true, "CI53" );
// Traits.Dominance.exoticSprntl = 'Exotic';
// Traits.Dominance.fixedCost = 5;
// has a zero-th level
// Traits.Dominance.levelsName = 'pts controlled &times;100';
Traits.DoubleJointed       = new Trait( "Gelenkigkeit", 'A', 'P', 5, false, "GL11" );
Traits.DoubleJointed.group = "flex";
// Traits.Draining            = new Trait( "Draining", 'D', 'P', -10, false, "CI97" );
// Traits.Draining.exoticSprntl = 'Supernatural';
// Traits.Dread               = new Trait( "Dread", 'D', 'M', -1, true, "CI97" );
// Traits.Dread.exoticSprntl = 'Supernatural';
// Traits.Dread.fixedCost = -10;
// Traits.Dread.levelsName = 'extra yard';
// Traits.Dread.multiple = true;
// Traits.Dread.mods = 'Rarity, Dread';
// Traits.DrugFactory         = new Trait( "Drug Factory", 'A', 'P', 10, true, "CI53" );
// Traits.DrugFactory.exoticSprntl = 'Exotic';
// Traits.DrugFactory.fixedCost = 10;
// Traits.DrugFactory.lowestLevel = 1;
// Traits.DrugFactory.levelsName = 'drug';
// Traits.DrugFactory.description = [];
// Traits.DrugFactory.instructions = 'list 1 drug per level';
// Traits.Duplication         = new Trait( "Duplication", 'A', 'MP', 75, true, "CI53" );
// Traits.Duplication.exoticSprntl = 'Exotic';
// Traits.Duplication.levelsName = 'Dupe';
// Traits.Duplication.mods = 'Duplication';
// Traits.Duty                = new Trait( "Duty", 'D', 'So', 0, false, "B3E39" );
// Traits.Duty.multiple = true;
// Traits.Duty.mods = "Frequency Base Cost, Duty";
// Traits.Dwarfism            = new Trait( "Dwarfism", 'D', 'P', -15, false, "B3E28" );
// Traits.DyingRace           = new Trait( "Dying Race", 'D', 'So', -10, false, "CI102" );
// Traits.Dyslexia            = new Trait( "Dyslexia", 'D', 'M', -5, false, "B3E33" );
// Traits.Dyslexia.mods = "LiteracyNorms";

// Traits.EarlyMaturation     = new Trait( "Early Maturation", 'A', 'P', 5, true, "CI53" );
// Traits.EarlyMaturation.exoticSprntl = 'Exotic';
// Traits.EasyToRead          = new Trait( "Easy to Read", 'D', 'M', -10, false, "CI89" );
// Traits.Edgy                = new Trait( "Edgy", 'D', 'M', -5, true, "CI90" );
// Traits.EideticMemoryE3     = new Trait( "Eidetic Memory", 'A', 'M', 30, true, "B3E20" );
// Traits.EideticMemoryE3.highestLevel = 2;
// Traits.ElasticSkin         = new Trait( "Elastic Skin", 'A', 'P', 20, false, "CI53" );
// Traits.ElasticSkin.exoticSprntl = 'Exotic';
Traits.Empathy             = new Trait( "Empathie", 'A', 'M', 15, false, "GL11" );
Traits.Empathy.exoticSprntl = 'Supernatural';
Traits.Empathy.group = 'empathy';
// Traits.Enemy               = new Trait( "Enemy", 'D', 'So', -5, true, "B3E39" );
// Traits.Enemy.multiple = true;
// Traits.Enemy.levelsName = "power level";
// Traits.Enemy.levelNames = ["50-pt person","100-pt person, or 3-5 people","","6-20 people","","20-1000 people"];
// Traits.Enemy.mods = "Enemy, Frequency";

// Traits.Enemy50pts          = new Trait( "Enemy (50-pt person)", 'So', -5, false, true );
// Traits.Enemy50pts.multiple = true;
// Traits.Enemy50pts.requestBasicCost = true;
// Traits.Enemy50pts.mods = "Enemy, Frequency";
// Traits.Enemy100pts         = new Trait( "Enemy (100-pt person)", 'So', -10, false, true );
// Traits.Enemy100pts.multiple = true;
// Traits.Enemy100pts.requestBasicCost = true;
// Traits.Enemy100pts.mods = "Enemy, Frequency";
// Traits.EnemySmallGroup     = new Trait( "Enemy (small group, 3-5)", 'So', -10, false, true );
// Traits.EnemySmallGroup.multiple = true;
// Traits.EnemySmallGroup.requestBasicCost = true;
// Traits.EnemySmallGroup.buttonLabel = "Enemy (sm group)";
// Traits.EnemySmallGroup.mods = "Enemy, Frequency";
// Traits.EnemyMediumGroup    = new Trait( "Enemy (group, 6-20)", 'So', -20, false, true );
// Traits.EnemyMediumGroup.multiple = true;
// Traits.EnemyMediumGroup.requestBasicCost = true;
// Traits.EnemyMediumGroup.buttonLabel = "Enemy (med group)";
// Traits.EnemyMediumGroup.mods = "Enemy, Frequency";
// Traits.EnemyPowerfulGroup  = new Trait( "Enemy (powerful group)", 'So', -30, false, true );
// Traits.EnemyPowerfulGroup.multiple = true;
// Traits.EnemyPowerfulGroup.requestBasicCost = true;
// Traits.EnemyPowerfulGroup.buttonLabel = "Enemy (pwrfl group)";
// Traits.EnemyPowerfulGroup.mods = "Enemy, Frequency";
// Traits.EnemyLargeGroup     = new Trait( "Enemy (large group, 20-1000)", 'So', -30, false, true );
// Traits.EnemyLargeGroup.multiple = true;
// Traits.EnemyLargeGroup.requestBasicCost = true;
// Traits.EnemyLargeGroup.buttonLabel = "Enemy (lg group)";
// Traits.EnemyLargeGroup.mods = "Enemy, Frequency";
// Traits.EnemyFormidable     = new Trait( "Enemy (formidable organization)", 'So', -40, false, true );
// Traits.EnemyFormidable.multiple = true;
// Traits.EnemyFormidable.requestBasicCost = true;
// Traits.EnemyFormidable.buttonLabel = "Enemy (formidable)";
// Traits.EnemyFormidable.mods = "Enemy, Frequency";

// Traits.EnhancedBlock       = new Trait( "Enhanced Block", 'A', 'P', 6, false, "CI24" );
// Traits.EnhancedBlock.cinematic = true;
// Traits.EnhancedDodge       = new Trait( "Enhanced Dodge", 'A', 'P', 15, false, "CI24" );
// Traits.EnhancedDodge.cinematic = true;
// Traits.EnhancedFly         = new Trait( "Enhanced Fly", 'A', 'P', 5, true, "CI54" );
// Traits.EnhancedFly.levelsName = 'half-level';
// Traits.EnhancedFly.multiple = true;
// Traits.EnhancedMove        = new Trait( "Enhanced Move", 'A', 'P', 5, true, "CI54" );
// Traits.EnhancedMove.levelsName = 'half-level';
// Traits.EnhancedMove.multiple = true;
// Traits.EnhancedSwim        = new Trait( "Enhanced Swim", 'A', 'P', 5, true, "CI54" );
// Traits.EnhancedSwim.levelsName = 'half-level';
// Traits.EnhancedSwim.multiple = true;
// Traits.EnhancedParrybarehands = new Trait( "Enhanced Parry, bare hands", 'A', 'P', 6, false, "CI24" );
// Traits.EnhancedParrybarehands.cinematic = true;
// Traits.EnhancedParryweapon = new Trait( "Enhanced Parry, 1 weapon", 'A', 'P', 6, false, "CI24" );
// Traits.EnhancedParryweapon.description = [];
// Traits.EnhancedParryweapon.instructions = "indicate a weapon skill";
// Traits.EnhancedParryweapon.cinematic = true;
// Traits.EnhancedParryAllWeapons = new Trait( "Enhanced Parry, all weapons", 'A', 'P', 10, false, "CI24" );
// Traits.EnhancedParryAllWeapons.cinematic = true;
// Traits.EnhancedST          = new Trait( "Enhanced Strength", 'P', 'att', true, "CI7" );
// Traits.EnhancedST.group = 'enhancedST';
// Traits.EnhancedST16_23     = new Trait( "Enhanced Strength (16-23)", 'A', 'P',  10, true, "CI7" );
// Traits.EnhancedST16_23.fixedCost = 60;
// Traits.EnhancedST16_23.lowestLevel = 1;
// Traits.EnhancedST16_23.highestLevel = 8;
// Traits.EnhancedST16_23.levelsName = 'ST';
// Traits.EnhancedST16_23.levelNames = [16,17,18,19,20,21,22,23];
// Traits.EnhancedST16_23.group = 'enhancedST';
// Traits.EnhancedST24_30     = new Trait( "Enhanced Strength (24-30)", 'A', 'P', 5, true, "CI7" );
// Traits.EnhancedST24_30.fixedCost = 140;
// Traits.EnhancedST24_30.lowestLevel = 1;
// Traits.EnhancedST24_30.highestLevel = 7;
// Traits.EnhancedST24_30.levelsName = 'ST';
// Traits.EnhancedST24_30.levelNames = [24,25,26,27,28,29,30];
// Traits.EnhancedST24_30.group = 'enhancedST';
// Traits.EnhancedST31plus    = new Trait( "Enhanced Strength (31+)", 'A',   'P', 0.5, true, "CI7" );
// Traits.EnhancedST31plus.fixedCost = 175;
// Traits.EnhancedST31plus.lowestLevel = 1;
// Traits.EnhancedST31plus.levelsName = 'above-30 level';
// Traits.EnhancedST31plus.group = 'enhancedST';
// Traits.EnhancedTimeSense   = new Trait( "Enhanced Time Sense", 'A', 'MP', 45, true, "CI54" );
// Traits.EnhancedTimeSense.exoticSprntl = 'Exotic';
// Traits.EnhancedTimeSense.group = 'reflexes';
// Traits.Epilepsy            = new Trait( "Epilepsy", 'D', 'P', -30, false, "B3E28" );
// Traits.Eunuch              = new Trait( "Eunuch", 'D', 'P', -5, false, "B3E28" );
// Traits.EvilTwin            = new Trait( "Evil Twin", 'D', 'So', -5, true, "CI77" );
// Traits.EvilTwin.fixedCost = -5;
// Traits.EvilTwin.lowestLevel = 1;
// Traits.EvilTwin.levelNames = ['same skills/abilities','higher skills or abilities','higher skills and abilities'];
// Traits.EvilTwin.multiple = true;
// Traits.EvilTwin.mods = 'Frequency';
// Traits.Excommunicated      = new Trait( "Excommunicated", 'D', 'So', -5, true, "CI78" );
// Traits.Excommunicated.levelNames = ['social/political','social & supernatural'];
// Traits.ExtendedLifespan    = new Trait( "Extended Lifespan", 'A', 'P', 5, true, "CI54" );
// Traits.ExtendedLifespan.exoticSprntl = 'Exotic';
// Traits.ExtendedLifespan.levelsName = 'lifespan doubling';
// Traits.ExtendedLifespan.group = 'aging';
// Traits.ExtraArms           = new Trait( "Extra Arms", 'A', 'P', 10, true, "CI54" );
// Traits.ExtraArms.exoticSprntl = 'Exotic';
// Traits.ExtraArms.levelsName = 'extra arm';
// Traits.ExtraArms.multiple = true;
// Traits.ExtraArms.instructions = 'sets of extra arms with different modifiers will require description';
// Traits.ExtraArms.mods = "Arms";
// Traits.ExtraEncumbrance    = new Trait( "Extra Encumbrance", 'A', 'P', 5, false, "CI55" );
// Traits.ExtraFatigue        = new Trait( "Extra Fatigue", 'A', 'P', 3, true, "B3E236; CI24" );
// Traits.ExtraFlexibility    = new Trait( "Extra Flexibility", 'A', 'P', 5, true, "CI55" );
// Traits.ExtraFlexibility.exoticSprntl = 'Exotic';
// Traits.ExtraFlexibility.levelNames = ['1 limb','all limbs'];
// Traits.ExtraHitPoints      = new Trait( "Extra Hit Points", 'A', 'P', 5, true, "B3E236; CI24" );
// Traits.ExtraLegs           = new Trait( "Extra Legs", 'A', 'P', 5, true, "CI55" );
// Traits.ExtraLegs.exoticSprntl = 'Exotic';
// Traits.ExtraLegs.levelNames = ['3-4 legs','5-6 legs','7+ legs'];
// Traits.ExtraLegs.mods = "Legs";
// Traits.ExtraLife           = new Trait( "Extra Life", 'A', 'P', 25, true, "CI36" );
// Traits.ExtraLife.exoticSprntl = 'Supernatural';
// Traits.ExtraLife.levelsName = 'life';
// Traits.ExtraLife.group = 'life';
// Traits.ExtraSleep          = new Trait( "Extra Sleep", 'D', 'P', -3, true, "CI81" );
// Traits.ExtraSleep.highestLevel = 4;
// Traits.ExtraSleep.levelsName = 'extra hour';
// Traits.ExtraStun           = new Trait( "Extra Stun",  'A','P', 2, true, "CI24" );
// Traits.Extravagance        = new Trait( "Extravagance", 'D', 'M', -10, false, "CI90" );

// Traits.FaerieEmpathy       = new Trait( "Faerie Empathy", 'A', 'M', 10, false, "CI36" );
// Traits.FaerieEmpathy.exoticSprntl = 'Supernatural';
// Traits.FaithHealing        = new Trait( "Faith Healing", 'A', 'M', 30, false, "CI36" );
// Traits.FaithHealing.exoticSprntl = 'Supernatural';
// Traits.Familiar            = new Trait( "Familiar", 'A', 'So', 0, false, "CI37" );
// Traits.Familiar.exoticSprntl = 'Supernatural';
// Traits.Familiar.multiple = true;
// Traits.Familiar.mods = "Fam-Nature, Fam-Limit";
// Traits.Fanaticism          = new Trait( "Fanaticism", 'D', 'M', -15, false, "B3E33" );
// Traits.Fanaticism.description = [];
// Traits.Fanaticism.mods = "Fanaticism";
// Traits.FashionSense        = new Trait( "Fashion Sense", 'A', 'M', 5, false, "CI24" );
// Traits.Fat                 = new Trait( 'Fat', 'D', 'P', -10, true, "B3E28" );
// Traits.Fat                 = new Trait( 'Fat', 'P', -10, false, "B3E28" );
// Traits.Fat.group = 'BMI';
// Traits.Fat.levelsName = '50% weight increase';
// Traits.Fat.highestLevel = 2;
// Traits.Fat.levelNames = ['','Very'];
// Traits.Faz                 = new Trait( "Faz Sense", 'A', 'P', 10, false, "CI55" );
// Traits.Faz.exoticSprntl = 'Exotic';
// Traits.Favor               = new Trait( "Favor", 'A', 'So', 0, false, "B3E236; CI25" );
// Traits.Favor.instructions = "Take an Ally, Contact, or Patron with the Favor modifier instead of taking Favor.";
//Traits.Favor.mods = "Ally, Ally Group, Contact-Type, Reliability, Patron, Favor";
// Traits.Fearlessness        = new Trait( "Fearlessness", 'A', 'M', 2, true, "B3E236; CI25" );
// Traits.FieldSense          = new Trait( "Field Sense", 'A', 'P', 10, false, "CI55" );
// Traits.FieldSense.exoticSprntl = 'Exotic';
// Traits.FilterLungs         = new Trait( "Filter Lungs", 'A', 'P', 5, false, "CI56" );
// Traits.FilterLungs.exoticSprntl = 'Exotic';
// Traits.Fit                 = new Trait( "Fit", 'A', 'P', 5, false, "CI25" );
// Traits.Fit.group = 'fitness';
// Traits.Unfit               = new Trait( "Unfit", 'D', 'P', -5, false, "CI85" );
// Traits.Unfit.group = 'fitness';
// Traits.VeryFit             = new Trait( "Very Fit", 'A', 'P', 15, false, "CI31" );
// Traits.VeryFit.group = 'fitness';
// Traits.VeryUnfit           = new Trait( "Very Unfit", 'D', 'P', -15, false, "CI85" );
// Traits.VeryUnfit.group = 'fitness';
// Traits.FlashCheap          = new Trait( "Flash, cheap", 'A', 'P', 6, true, "CI72" );
// Traits.FlashCheap.exoticSprntl = 'Exotic';
// Traits.FlashCheap.fixedCost = 9;
// Traits.FlashCheap.lowestLevel = 1;
// Traits.FlashCheap.mods = 'Natural Attacks (Cheap), Natural Attack IQ roll';
// Traits.Flash               = new Trait( "Flash", 'A', 'P', 15, false, "CI72" );
// Traits.Flash.exoticSprntl = 'Exotic';
// Traits.Flash.mods = 'Natural Attack Area, Natural Attack Duration, Natural Attack IQ roll';
// Traits.Flashbacks          = new Trait( "Flashbacks", 'D', 'M', 0, false, "B3E240; CI90" );
// Traits.Flashbacks.mods = 'Flashbacks';
// Traits.Flexibility         = new Trait( "Flexibility", 'A', 'P', 15, false, "CI56" );
// Traits.Flexibility.group = "flex";
// Traits.Flight              = new Trait( "Flight", 'A', 'P', 40, false, "CI56" );
// Traits.Flight.exoticSprntl = 'Exotic';
// Traits.Flight.mods = "Flight";
// Traits.Fragile             = new Trait( "Fragile", 'D', 'P', -20, false, "CI102" );
// Traits.Fragile.exoticSprntl = 'Exotic';
// Traits.FreeSick            = new Trait( "Free Sick", 'D', 'P', -10, false, "CI81" );
// Traits.FrightensAnimals    = new Trait( "Frightens Animals", 'D', 'P', -5, false, "CI97" );
// Traits.FrightensAnimals.exoticSprntl = 'Supernatural';
// Traits.FrightensAnimals.mods = 'Low Tech';
// Traits.FullCoordination    = new Trait( "Full Coordination", 'A', 'P', 50, true, "CI56" );
// Traits.FullCoordination.exoticSprntl = 'Supernatural';
// Traits.FullCoordination.levelsName = 'extra attack';
// Traits.Fugue               = new Trait( "Fugue", 'A', 'M', 50, false, "CI38" );
// Traits.Fugue.exoticSprntl = 'Supernatural';
// Traits.FurThin             = new Trait( "Thin Fur", 'A', 'P', 0, false, "CI56" );
// // Traits.FurThin.description = ['thin'];
// Traits.FurThin.exoticSprntl = 'Exotic';
// Traits.Fur                 = new Trait( "Fur", 'A', 'P', 4, false, "CI56" );
// Traits.Fur.exoticSprntl = 'Exotic';
// Traits.FurThick            = new Trait( "Thick Fur", 'A', 'P', 29, false, "CI56" );
// Traits.FurThick.exoticSprntl = 'Exotic';
// // Traits.FurThick.description = ['thick'];
// Traits.FurSpiny            = new Trait( "Spiny Fur", 'A', 'P', 33, false, "CI56" );
// Traits.FurSpiny.exoticSprntl = 'Exotic';
// // Traits.FurSpiny.description = ['spiny'];

// Traits.GIntolerance        = new Trait( "G-Intolerance", 'D', 'P', -10, true, "CI81" );
// Traits.GIntolerance.levelsName = 'G-increment';
// Traits.GIntolerance.levelNames = ['0.1G','0.05G'];
// Traits.Gadgeteer           = new Trait( "Gadgeteer", 'A', 'M', 25, true, "CI25" );
// Traits.Gadgeteer.levelNames = ['realistic','cinematic'];
// Traits.GExperience         = new Trait( "G-Experience", 'A', 'P', 10, false, "CI25" );
// Traits.Gigantism           = new Trait( "Gigantism", 'D', 'P', -10, false, "B3E28" );
// Traits.Gills               = new Trait( "Gills", 'A', 'P', 10, false, "CI56" );
// Traits.Gills.exoticSprntl = 'Exotic';
// Traits.GloryHound          = new Trait( "Glory Hound", 'D', 'M', -15, false, "B3E240; CI90" );
// Traits.GloryHound.group = 'confidence';
Traits.Gluttony            = new Trait( "Völlerei", 'D', 'M', -5, false, "GL16" );
Traits.Greed               = new Trait( "Habgier", 'D', 'M', -15, false, "GL14" );
// Traits.Gregarious          = new Trait( "Gregarious", 'D', 'M', -10, false, "CI90" );
// Traits.Growth              = new Trait( "Growth", 'A', 'P', 10, true, "CI56" );
// Traits.Growth.exoticSprntl = 'Exotic';
// Traits.Growth.levelsName = '100% increase';
// Growth has a set of 'Growth Activated' mods that can be used to lower the cost of other traits (ST, Extra HP, etc.) - they are complicated.
// Traits.Growth.mods = 'Growth';
// Traits.GuiltComplex        = new Trait( "Guilt Complex", 'D', 'M', -5, false, "CI90" );
// Traits.GuiltComplex.multiple = true;
// Traits.Gullibility         = new Trait( "Gullibility", 'D', 'M', -10, false, "B3E33" );

Traits.HardOfHearing       = new Trait( "Schwerhörigkeit", 'D', 'P', -10, false, "GL15" );
Traits.HardOfHearing.group = 'hearing';
// Traits.HardtoKill          = new Trait( "Hard to Kill", 'A', 'P', 5, true, "B3E236; CI25" );
// Traits.HardtoKill.cinematic = true;
// Traits.HarmonywiththeTao = new Trait( "Harmony with the Tao", 'A', 'M', 20, false, "CI38" );
// Traits.HarmonywiththeTao.exoticSprntl = 'Supernatural';
// Traits.HarmonywiththeTao.cinematic = true;
// Traits.Healing             = new Trait( "Healing", 'A', 'MP', 25, false, "B3E237; CI57" );
// Traits.Healing.exoticSprntl = 'Exotic';
// Traits.Healing.mods = "Healing";
// Traits.Heir                = new Trait( "Heir", 'A', 'So', 5, false, "CI25" );
// Traits.Hemophilia          = new Trait( "Hemophilia", 'D', 'P', -30, false, "B3E28" );
// Traits.Hermaphromorph      = new Trait( "Hermaphromorph", 'A', 'P', 2, false, "CI57" );
// Traits.Hermaphromorph.exoticSprntl = 'Exotic';
// Traits.ThickHide           = new Trait( "Thick Hide", 'A', 'P', 28, false, "CI57" );
// Traits.ThickHide.exoticSprntl = 'Exotic';
// Traits.Hidebound           = new Trait( "Hidebound", 'D', 'M', -5, false, "CI90" );
// Traits.HighPainThreshold   = new Trait( "Schmerzunempfindlichkeit", 'A', 'P', 10, false, "GL12" );
// Traits.HighTechnology1TL   = new Trait( "Hochtechnologie, +1 TL", 'A',  'So',  20, false, "GL11" );
// Traits.HighTechnology2TL   = new Trait( "Hochtechnologie, +2 TLs", 'A', 'So',  50, false, "GL11" );
// Traits.HighTechnology3TL   = new Trait( "Hochtechnologie, +3 TLs", 'A', 'So', 100, false, "GL11" );
// Traits.HigherPurpose       = new Trait( "Higher Purpose", 'A', 'M', 5, false, "CI26" );
// Traits.HiveMentality       = new Trait( 'Hive Mentality', 'D', 'M', -20, false, "CI102" );
// Traits.HiveMentality.exoticSprntl = 'Exotic';
// Traits.Honesty             = new Trait( "Rechtschaffenheit", 'D', 'M', -10, false, "GL15" );
// Traits.Horizontal          = new Trait( "Horizontal", 'D', 'P', -10, false, "CI102" );
// Traits.Horizontal.exoticSprntl = 'Exotic';
// Traits.Hunchback           = new Trait( "Hunchback", 'D', 'P', -10, false, "CI81" );
// Traits.Hyperactive         = new Trait( "Hyperactive", 'A', 'P', 30, false, "CI57" );
// Traits.Hyperactive.exoticSprntl = 'Exotic';
// Traits.Hyperflight         = new Trait( "Hyperflight", 'A', 'P', 50, false, "CI57" );
// Traits.Hyperflight.exoticSprntl = 'Exotic';
// Traits.Hyperflight.mods = 'Hyperflight';
// Traits.HyperReflexes       = new Trait( "Hyper-Reflexes", 'A', 'P', 15, false, "CI58" );
// Traits.HyperReflexes.exoticSprntl = 'Exotic';
// Traits.HyperStrength       = new Trait( "Hyper-Strength", 'A', 'P', 30, false, "CI58" );
// Traits.HyperStrength.exoticSprntl = 'Exotic';
//
// Traits.IceSkates           = new Trait( "Ice Skates", 'A', 'P', 5, false, "CI58" );
// Traits.IceSkates.exoticSprntl = 'Exotic';
// Traits.Ignorance           = new Trait( "Ignorance", 'D', 'So', -5, false, "CI78" );
// Traits.Ignorance.multiple = true;
// Traits.Ignorance.description = [];
// Traits.Ignorance.instructions = 'specify unlearned skill';
// Traits.Illiteracy          = new Trait( "Illiteracy", 'D', 'M', 0, false, "B3E33" );
// Traits.Illiteracy.group = 'literacy';
// Traits.Illiteracy.mods = 'LiteracyNorms';
// Traits.Illuminated         = new Trait( "Illuminated", 'A', 'M', 60, false, "CI38" );
// Traits.Illuminated.exoticSprntl = 'Supernatural';
// Traits.ImageCheap          = new Trait( "Image, cheap", 'A', 'P', 6, true, "CI72" );
// Traits.ImageCheap.exoticSprntl = 'Exotic';
// Traits.ImageCheap.fixedCost = 14;
// Traits.ImageCheap.lowestLevel = 1;
// Traits.ImageCheap.mods = 'Natural Attacks (Cheap), Natural Attack IQ roll';
// Traits.Image               = new Trait( "Image", 'A', 'P', 20, false, "CI72" );
// Traits.Image.exoticSprntl = 'Exotic';
// Traits.Image.mods = 'Natural Attack Area, Natural Attack Range, Natural Attack IQ roll';
// Traits.Immortality         = new Trait( "Immortality", 'A', 'P', 140, false, "CI58" );
// Traits.Immortality.exoticSprntl = 'Supernatural';
Traits.ImmunitytoDisease   = new Trait( "Immunität gegen Krankheiten", 'A', 'P', 10, false, "GL11" );
Traits.ImmunitytoDisease.exoticSprntl = 'Exotic';
// Traits.ImmunitytoPoison    = new Trait( "Immunity to Poison", 'A', 'P', 15, false, "CI58" );
// Traits.ImmunitytoPoison.exoticSprntl = 'Exotic';
// Traits.ImmunitytoTimesickness = new Trait( "Immunity to Timesickness", 'A', 'P', 'varies', false, "CI26" );
// Traits.Imperturbable       = new Trait( "Imperturbable", 'A', 'M', 10, false, "CI26" );
// Traits.ImprovedGTolerance  = new Trait( "Improved G-Tolerance", 'A', 'P', 5, true, "CI26" );
// Traits.ImprovedGTolerance.levelsName = 'G-increment';
// Traits.ImprovedGTolerance.levelNames = ['0.3G','0.5G','1G','5G','10G'];
// Traits.ImprovedGTolerance.exoticSprntl = 'Exotic';
Traits.Impulsiveness       = new Trait( "Impulsivität", 'D', 'M', -10, false, "GL14" );
// skill incompetencies B3E240
// Traits.InconvenientSizeLarge= new Trait( "Inconvenient Size, large", 'D', 'P', -10, false, "CI102" );
// Traits.InconvenientSizeLarge.exoticSprntl = 'Exotic';
// Traits.InconvenientSizeSmall= new Trait( "Inconvenient Size, small", 'D', 'P', -15, false, "CI102" );
// Traits.InconvenientSizeSmall.exoticSprntl = 'Exotic';
// Traits.IncreasedDensity    = new Trait( "Increased Density", 'A', 'P', 5, true, "CI58" );
// Traits.IncreasedDensity.exoticSprntl = 'Exotic';
// Traits.IncreasedDensity.levelsName = '100-lb increment';
// Traits.IncreasedDX         = new Trait( "Increased Dexterity", 'P', 'att', true );
// Traits.IncreasedHT         = new Trait( "Increased Health", 'P', 'att', true );
// Traits.IncreasedIQ         = new Trait( "Increased Intelligence", 'M', 'att', true );
// Traits.IncreasedLifeSupport= new Trait( "Increased Life Support", 'D', 'P', 0, false, "CI102" );
// Traits.IncreasedLifeSupport.exoticSprntl = 'Exotic';
// Traits.IncreasedLifeSupport.mods = 'LifeSupport';
// Traits.IncreasedSpeed      = new Trait( "Increased Basic Speed", 'A', 'P', 25, true, "CI26" );
// Traits.Incurious           = new Trait( "Incurious", 'D', 'M', -5, false, "CI90" );
// Traits.Indecisive          = new Trait( "Indecisive", 'D', 'M', -10, false, "CI90" );
// Traits.IndependentlyFocusableEyes = new Trait( "Independently Focusable Eyes", 'A', 'P', 15, true, "CI58" );
// Traits.IndependentlyFocusableEyes.exoticSprntl = 'Exotic';
// Traits.IndependentlyFocusableEyes.levelsName = 'eye';
// Traits.InfectiousAttack    = new Trait( "Infectious Attack", 'D', 'P', -5, false, "CI97" );
// Traits.InfectiousAttack.exoticSprntl = 'Supernatural';
// Traits.InfectiousAttack.multiple = true;
// Traits.Infravision         = new Trait( "Infravision", 'A', 'P', 15, false, "B3E237; CI58" );
// Traits.Infravision.exoticSprntl = 'Exotic';
// Traits.Infravision.mods = "Sups Enhancements, Sups Limitations";
// Traits.InherentMagicKnackstype = new Trait( "Inherent Magic: Knacks (type)", 'M', 'varies', false );
// Traits.InherentMagicKnackstype.exoticSprntl = 'Supernatural';
// Traits.InjuryTolerance     = new Trait( "Injury Tolerance", 'A', 'P', 0, false, "CI58" );
// Traits.InjuryTolerance.mods = 'Injury';
// Traits.InjuryTolerance.exoticSprntl = 'Exotic';
// Traits.Innumerate          = new Trait( "Innumerate", 'D', 'M', -5, false, "CI90" );
// Traits.Innumerate.mods = 'Innumerate';
// Traits.Insomniac           = new Trait( "Insomniac", 'D', 'P', -5, true, "CI82" );
// Traits.Insomniac.fixedCost = -5;
// Traits.Insomniac.lowestLevel = 1;
// Traits.Insomniac.levelNames = ['','frequent'];
// Traits.Insubstantiality    = new Trait( "Insubstantiality", 'A', 'P', 80, false, "CI59" );
// Traits.Insubstantiality.exoticSprntl = 'Exotic';
// Traits.Insubstantiality.mods = "Carry Objects, Insubstantiality, ";
// Traits.InterfaceJack       = new Trait( "Interface Jack", 'A', 'P', 10, false, "CI26" );
// Traits.Intolerance         = new Trait( "Intolerance", 'D', 'M', -5, true, "B3E34" );
// Traits.Intolerance.levelNames = ['specific', 'exclusive'];
// Traits.Intolerance.multiple = true;
// Traits.Intuition           = new Trait( "Intuition", 'A', 'M', 15, false, "B3E20" );
//Traits.Intuition.exoticSprntl = 'Supernatural';  // by analogy with Animal Empathy?
// Traits.IntuitiveMathematician = new Trait( "Intuitive Mathematician", 'A', 'M', 25, false, "CI26" );
// Traits.Invertebrate        = new Trait( "Invertebrate", 'D', 'P', -20, false, "CI102" );
// Traits.Invertebrate.exoticSprntl = 'Exotic';
// Traits.Invisibility        = new Trait( "Invisibility", 'A', 'P', 40, false, "CI59" );
// Traits.Invisibility.exoticSprntl = 'Exotic';
// Traits.Invisibility.description = [];
// Traits.Invisibility.instructions = "specify which sort of 'vision': electromagnetic, sonar, etc.";
// Traits.Invisibility.mods = 'At Will, Invisibility, Carry Objects';
// Traits.InvisibilityToMachines = new Trait( "Invisibility to Machines", 'A', 'P', 20, false, "CI59" );
// Traits.InvisibilityToMachines.exoticSprntl = 'Exotic';
// Traits.InvisibilityToMachines.mods = 'At Will, Carry Objects';
// Traits.Invulnerability     = new Trait( "Invulnerability", 'A', 'P', 300, false, "CI59" );
// Traits.Invulnerability.exoticSprntl = 'Exotic';
// Traits.Invulnerability.mods = 'Invulnerability';
// Traits.IronHand            = new Trait( "Iron Hand", 'A', 'P', 5, true, "CI26" );
// Traits.IronHand.cinematic = true;
// Traits.IronHand.fixedCost = 5;
// Traits.IronHand.lowestLevel = 1;
// Traits.IronHand.highestLevel = 2;
// Traits.IronHand.levelsName = 'hand';
// Traits.IronHand.levelNames = ['one hand','both hands'];

Traits.Jealousy            = new Trait( "Eifersucht", 'D', 'M', -10, false, "GL13" );
// Traits.Jinxed              = new Trait( "Jinxed", 'D', 'M', -20, true, "B3E240; CI98" );
// Traits.Jinxed.highestLevel = 3;
// Traits.Jinxed.exoticSprntl = 'Supernatural';
//
// Traits.KarmicTies          = new Trait( "Karmic Tie", 'A', 'So', 'varies', false, "CI39, 98" );
// Traits.KarmicTies.exoticSprntl = 'Supernatural';
// Traits.KarmicTies.description = [];
// Traits.KarmicTies.instructions = 'placeholder for a future Ally, Dependent, Enemy or Patron';
// Traits.KarmicTies.requestBasicCost = true;
// Traits.Killjoy             = new Trait( "Killjoy", 'D', 'P', -15, false, "CI91" );
// Traits.Kleptomania         = new Trait( "Kleptomania", 'D', 'M', -15, false, "B3E34" );
// Traits.Klutz               = new Trait( "Klutz", 'D', 'P', -10, true, "CI82" );
// Traits.Klutz.fixedCost = 5;
// Traits.Klutz.lowestLevel = 1;
// Traits.Klutz.levelNames = ['regular','total'];

Traits.LanguageTalent      = new Trait( "Sprachbegabung", 'A', 'M', 2, true, "GL" );
// Traits.LameCrippledLeg     = new Trait( "Lame (crippled leg)", 'P', -15, false, "B3E29" );
// Traits.LameOneLeg          = new Trait( "Lame (one leg)",      'P', -25, false, "B3E29" );
// Traits.LameLegless         = new Trait( "Lame (legless)",      'P', -35, false, "B3E29" );
Traits.Lame                = new Trait( "Gehbehinderung", 'D', 'P', -10, true, "GL14" );
Traits.Lame.fixedCost = -5;
Traits.Lame.lowestLevel = 1;
Traits.Lame.levelNames = ['Verkrüppeltes Bein','Einbeinig','Keine Beine oder Beidseitig Gelähmt'];
// Traits.LaserCheap          = new Trait( "Laser, cheap", 'A', 'P', 6, true, "CI73" );
// Traits.LaserCheap.exoticSprntl = 'Exotic';
// Traits.LaserCheap.fixedCost = 19;
// Traits.LaserCheap.lowestLevel = 1;
// Traits.LaserCheap.mods = 'Laser, Natural Attacks (Cheap), Natural Attack DX roll';
// Traits.Laser               = new Trait( "Laser", 'A', 'P', 25, false, "CI73" );
// Traits.Laser.exoticSprntl = 'Exotic';
// Traits.Laser.mods = 'Laser, Natural Attack Damage, Natural Attack Skill, Natural Attack Range, Natural Attack DX roll';
Traits.Lazy                = new Trait( "Faulheit", 'D', 'M', -10, false, "GL14" );
Traits.Lecherousness       = new Trait( "Lecherousness", 'D', 'M', -15, false, "B3E34" );
// Traits.LegalEnforcementPowers = new Trait( "Legal Enforcement Powers", 'A', 'So', 5, true, "B3E21" );
// Traits.LegalEnforcementPowers.highestLevel = 3;
// Traits.LegalImmunity       = new Trait( "Legal Immunity", 'A', 'So', 5, true, "B3E237; CI27" );
// Traits.LegalImmunity.highestLevel = 3;
// Traits.LegalImmunity.mods = "Pouch";
// Traits.LessSleep           = new Trait( "Less Sleep", 'A', 'P', 3, true, "CI27" );
// Traits.LessSleep.highestLevel = 5;
// Traits.Lifebane            = new Trait( "Lifebane", 'D', 'P', -10, false, "CI98" );
// Traits.LightHangover       = new Trait( "Light Hangover", 'A', 'P', 2, false, "CI27" );
// Traits.LightSleeper        = new Trait( "Light Sleeper", 'D', 'P', -5, false, "CI82" );
// Traits.LightningCheap      = new Trait( "Lightning, cheap", 'A', 'P', 6, true, "CI73" );
// Traits.LightningCheap.exoticSprntl = 'Exotic';
// Traits.LightningCheap.fixedCost = 14;
// Traits.LightningCheap.lowestLevel = 1;
// Traits.LightningCheap.mods = 'Natural Attacks (Cheap), Natural Attack DX roll';
// Traits.Lightning           = new Trait( "Lightning", 'A', 'P', 20, false, "CI73" );
// Traits.Lightning.exoticSprntl = 'Exotic';
// Traits.Lightning.mods = 'Natural Attack Damage, Natural Attack Range, Natural Attack Skill, Natural Attack DX roll';
// Traits.LightningCalculator = new Trait( "Lightning Calculator", 'A', 'M', 5, false, "B3E21" );
Traits.Literacy            = new Trait( "Lesen und Schreiben", 'A', 'M', 5, false, "GL11" );
Traits.Literacy.group = 'literacy';
Traits.Literacy.mods = 'LiteracyNorms';
// Traits.Loner               = new Trait( "Loner", 'D', 'M', -5, false, "CI91" );
// Traits.Longevity           = new Trait( "Longevity", 'A', 'P', 5, false, "B3E21" );
// Traits.LoversDistraction   = new Trait( "Lover's Distraction", 'D', 'M', -15, false, "CI91" );
// Traits.LowEmpathy          = new Trait( "Low Empathy", 'D', 'M', -20, false, "CI91" );
// Traits.LowEmpathy.group = 'empathy';
// Traits.LowPainThreshold    = new Trait( "Low Pain Threshold", 'D', 'P', -10, false, "B3E29" );
// Traits.LowSelfImage        = new Trait( "Low Self-Image", 'D', 'M', -10, false, "CI92" );
Traits.Luck                = new Trait( "Glück", 'A', 'M', 15, false, "GL11" );
Traits.Luck.group = 'luck';
Traits.LuckExtraordinary   = new Trait( "Außergewöhnliches Glück", 'A', 'M', 30, false, "GL11" );
Traits.LuckExtraordinary.cinematic = true;
Traits.LuckExtraordinary.group = 'luck';
// Traits.LuckRidiculous      = new Trait( "Ridiculous Luck", 'A', 'M', 60, false, "CI29" );
// Traits.LuckRidiculous.cinematic = true;
// Traits.LuckRidiculous.group = 'luck';
// Traits.SuperLuck           = new Trait( "Super Luck", 'A', 'M', 100, false, "CI46" );
// Traits.SuperLuck.exoticSprntl = 'Supernatural';
// Traits.LunarInfluence      = new Trait( "Lunar Influence", 'A', 'P', 5, false, "CI39" );
// Traits.LunarInfluence.exoticSprntl = 'Supernatural';
// Traits.Lunacy              = new Trait( "Lunacy", 'D', 'P', -10, false, "CI92" );

Traits.Magery              = new Trait( "Magiebegabung", 'A', 'M', 10, true, "GL12" );
Traits.Magery.fixedCost = 5;
Traits.Magery.lowestLevel = 1;
Traits.Magery.highestLevel = 3;
Traits.Magery.exoticSprntl = 'Supernatural';
Traits.Magery.group = 'magery';
// Traits.MageryAspectedI     = new Trait( "Magery, weakly aspected", 'A', 'M', 6, true, "CI39-40" );
// Traits.MageryAspectedI.exoticSprntl = 'Supernatural';
// Traits.MageryAspectedI.fixedCost = 4;
// Traits.MageryAspectedI.lowestLevel = 1;
// Traits.MageryAspectedI.highestLevel = 3;
// Traits.MageryAspectedI.description = [];
// Traits.MageryAspectedI.instructions = "e.g. solitary, single-college, song aspected";
// Traits.MageryAspectedI.group = 'magery';
// Traits.MageryAspectedII     = new Trait( "Magery, strongly aspected", 'A', 'M', 5, true, "CI39-40" );
// Traits.MageryAspectedII.exoticSprntl = 'Supernatural';
// Traits.MageryAspectedII.fixedCost = 3;
// Traits.MageryAspectedII.lowestLevel = 1;
// Traits.MageryAspectedII.highestLevel = 3;
// Traits.MageryAspectedII.description = [];
// Traits.MageryAspectedII.instructions = "e.g. dance, musical, dark/star/sun/moon aspected";
// Traits.MageryAspectedII.group = 'magery';
// Traits.MagicResistance     = new Trait( "Magic Resistance", 'A', 'M', 2, true, "B3E21" );
// Traits.MagicResistance.exoticSprntl = 'Supernatural'
// Traits.MagicResistance.group = 'magery';
// Traits.MagicSusceptibility = new Trait( "Magic Susceptibility", 'D', 'M', -3, true, "CI98" );
// Traits.MagicSusceptibility.exoticSprntl = 'Supernatural'
// Traits.MagneticSense       = new Trait( "Magnetic Sense", 'A', 'P', 5, true, "CI60" );
// Traits.MagneticSense.exoticSprntl = 'Exotic';
// Traits.ManaDamper          = new Trait( "Mana Damper", 'A', 'P', 5, true, "CI40" );
// Traits.ManaDamper.fixedCost = 10;
// Traits.ManaDamper.lowestLevel = -1;
//Traits.ManaDamper.levelsName = 'radius hex';
// Traits.ManaDamper.levelNames = ['touch only','same hex','2-hex radius','3-hex radius','4-hex radius','5-hex radius','6-hex radius','7-hex radius','8-hex radius','9-hex radius','10-hex radius','11-hex radius','12-hex radius','13-hex radius','14-hex radius','15-hex radius','16-hex radius','17-hex radius','18-hex radius','19-hex radius'];
// Traits.ManaDamper.exoticSprntl = 'Supernatural';
// Traits.ManaDamper.mods = "Mana";
// Traits.ManaDamper.group = 'magery';
// Traits.ManaEnhancer        = new Trait( "Mana Enhancer", 'A', 'P', 25, true, "CI40" );
// Traits.ManaEnhancer.fixedCost = 50;
// Traits.ManaDamper.lowestLevel = -1;
//Traits.ManaEnhancer.levelsName = 'radius hex';
// Traits.ManaEnhancer.levelNames = ['touch only','same hex','2-hex radius','3-hex radius','4-hex radius','5-hex radius','6-hex radius','7-hex radius','8-hex radius','9-hex radius','10-hex radius','11-hex radius','12-hex radius','13-hex radius','14-hex radius','15-hex radius','16-hex radius','17-hex radius','18-hex radius','19-hex radius'];
// Traits.ManaEnhancer.exoticSprntl = 'Supernatural';
// Traits.ManaEnhancer.mods = "Mana";
// Traits.ManicDepressive     = new Trait( "Manic-Depressive", 'D', 'M', -20, false, "B3E241; CI92" );
// Traits.ManualDexterity     = new Trait( "Manual Dexterity", 'A', 'P', 3, true, "CI27 & 83" );
// Traits.ManualDexterity.posNegLevels = true;
// Traits.MathematicalAbility = new Trait( "Mathematical Ability", 'A', 'M', 10, false, "B3E22" );
// Traits.MatterSurfing       = new Trait( "Matter Surfing", 'A', 'P', 30, false, "CI60" );
// Traits.MatterSurfing.exoticSprntl = 'Exotic';
// Traits.MatterSurfing.mods = 'Matter Surfing';
// Traits.MechanicalTelepathy = new Trait( "Mechanical Telepathy", 'A', 'P', 120, false, "CI27" );
// Traits.Medium              = new Trait( "Medium", 'A', 'M', 10, false, "CI41" );
// Traits.Medium.exoticSprntl = 'Supernatural';
// Traits.Megalomania         = new Trait( "Megalomania", 'D', 'M', -10, false, "B3E34" );
// Traits.MetabolismControl   = new Trait( "Metabolism Control", 'A', 'P', 5, true, "CI60" );
// Traits.MetabolismControl.exoticSprntl = 'Exotic';
// Traits.MetabolismControl.highestLevel = 9;
// Traits.MetabolismControl.mods = 'Hibernation';
// Traits.MicrosopicVision    = new Trait( "Microsopic Vision", 'A', 'P', 4, true, "CI60" );
// Traits.MicrosopicVision.exoticSprntl = 'Exotic';
// Traits.MicrosopicVision.levelsName = 'mag &times;2';
// Traits.Migraine            = new Trait( "Migraine", 'D', 'P', -5, true, "CI82" );
// Traits.Migraine.levelNames = ['infrequent (6 or less)','common (8 or less)','frequent (11 or less)','constant (13 or less)'];
// Traits.Mimicry             = new Trait( "Mimicry", 'A', 'M', 15, false, "CI60" );
// Traits.Mimicry.exoticSprntl = 'Exotic';
// Traits.Mindlink            = new Trait( "Mindlink", 'A', 'M', 1, true, "CI41" );
// Traits.Mindlink.exoticSprntl = 'Supernatural';
// Traits.Mindlink.description = [];
// Traits.Mindlink.instructions = 'specify person';
// Traits.Mindlink.multiple = true;
// Traits.Mindshare           = new Trait( "Mindshare", 'A', 'M', 0, false, "CI60" );
// Traits.Mindshare.exoticSprntl = 'Exotic';
// Traits.Mindshare.mods = 'Mindshare';
// Traits.Miserliness         = new Trait( "Geiz", 'D', 'M', -10, false, "GL14" );
// Traits.MissingFinger       = new Trait( "Missing Finger", 'D', 'P', -2, false, "CI82" );
// Traits.MissingThumb        = new Trait( "Missing Thumb",  'D', 'P', -5, false, "CI82" );
// Traits.MistakenIdentity    = new Trait( "Mistaken Identity", 'D', 'So', -5, false, "CI78" );
// Traits.ModifiedArmDX       = new Trait( "Modified Arm DX", 'A', 'P', 'varies', false, "CI61" );
// Traits.ModifiedArmDX.exoticSprntl = 'Exotic';
// Traits.ModifiedArmDX.description = ['1 arm','2 arms','3 or more arms'];
// Traits.ModifiedArmDX.instructions = '1 arm: 60% of extra DX cost; 2 arms: 80% cost; 100% cost otherwise';
// Traits.ModifiedArmST       = new Trait( "Modified Arm ST", 'A', 'P', 'varies', false, "CI61" );
// Traits.ModifiedArmST.exoticSprntl = 'Exotic';
// Traits.ModifiedArmST.description = ['1 arm','2 arms','3 or more arms'];
// Traits.ModifiedArmST.instructions = '1 arm: 60% of extra ST cost; 2 arms: 80% cost; 100% cost otherwise';
// Traits.Morph               = new Trait( "Morph", 'A', 'P', 40, false, "CI61" );
// Traits.Morph.exoticSprntl = 'Exotic';
// Traits.MotionSickness      = new Trait( "Motion Sickness", 'D', 'P', -10, false, "CI82" );
// Traits.MoveThroughIce      = new Trait( "Move Through Ice", 'A', 'P', 10, false, "CI62" );
// Traits.MoveThroughIce.exoticSprntl = 'Exotic';
// Traits.MoveThroughIce.mods = 'Leave Tunnel';
// Traits.MultipleForms       = new Trait( "Multiple Forms", 'A', 'P', 5, true, "CI62" );
// Traits.MultipleForms.exoticSprntl = 'Exotic';
// Traits.MultipleForms.levelsName = 'form';
// Traits.MultipleForms.mods = 'Multiple Forms';
// Traits.MundaneBackground   = new Trait( "Mundane Background", 'D', 'So', -10, false, "CI98" );
// Traits.AddictionMurder     = new Trait( "Murder Addiction", 'D', 'M', -60, false, "CI98" );
// Traits.AddictionMurder.exoticSprntl = 'Supernatural';
Traits.MusicalAbility      = new Trait( "Musikalische Begabung", 'A', 'M', 1, true, "GL12" );
// Traits.Mute                = new Trait( "Mute", 'D', 'P', -25, false, "B3E29" );
//
// Traits.NaturalSpellcasting = new Trait( "Natural Spellcasting", 'A', 'M', 15, false, "CI41" );
// Traits.NaturalSpellcasting.exoticSprntl = 'Supernatural';
// Traits.NeuralCyberdeckInterface = new Trait( "Neural Cyberdeck Interface", 'A', 'P', 5, true, "CI27" );
// Traits.NeuralCyberdeckInterface.fixedCost = 15;
// Traits.NeuralCyberdeckInterface.lowestLevel = 1;
// Traits.NeuralCyberdeckInterface.levelNames = ['marquee','icon','environmental'];
// Traits.NeuralCyberdeckInterface.mods = "Old Tech";
// Traits.NictatingMembrane   = new Trait( "Nictating Membrane", 'A', 'P', 10, true, "CI62" );
// Traits.NictatingMembrane.exoticSprntl = 'Exotic';
// Traits.NightBlindness      = new Trait( "Night Blindness", 'D', 'P', -10, false, "CI82" );
// Traits.NightBlindness.group = "Dark Vision";
Traits.NightVision         = new Trait( "Nachtsicht", 'A', 'P', 10, false, "GL12" );
Traits.NightVision.group = "Dark Vision";
// Traits.Nightmares          = new Trait( "Nightmares", 'D', 'M', -5, false, "CI92" );
// Traits.NoDepthPerception   = new Trait( "No Depth Perception", 'D', 'P', -10, false, "CI82" );
// Traits.NoDepthPerception.group = 'monocular';
// Traits.NoHangover          = new Trait( "No Hangover", 'A', 'P', 5, false, "CI28" );
// Traits.NoPhysicalBody      = new Trait( "No Physical Body", 'D', 'P', -100, false, "CI83" );
// Traits.NonIconographic     = new Trait( "Non-Iconographic", 'D', 'M', -10, false, "CI92" );
// Traits.NoBodyHeat          = new Trait( "No Body Heat", 'D', 'P', -5, false, "CI99" );
// Traits.NoBodyHeat.exoticSprntl = 'Supernatural';
// Traits.NoFineManipulators  = new Trait( "No Fine Manipulators", 'D', 'P', -30, false, "CI103" );
// Traits.NoFineManipulators.exoticSprntl = 'Exotic';
// Traits.NoManipulators      = new Trait( "No Manipulators", 'D', 'P', -50, false, "CI103" );
// Traits.NoManipulators.exoticSprntl = 'Exotic';
// Traits.NoReflection        = new Trait( "No Reflection", 'D', 'P', -10, false, "CI103" );
// Traits.NoReflection.exoticSprntl = 'Supernatural';
// Traits.NoSenseofHumor      = new Trait( "No Sense of Humor", 'D', 'M', -10, false, "B3E241; CI92" );
// Traits.NoSenseofSmellTaste = new Trait( "No Sense of Smell/Taste (Anosmia)", 'D', 'P', -5, false, "B3E29" );
// Traits.NoSenseofSmellTaste.buttonLabel = 'Anosmia';    // I just define this one twice, since it has no associated Adjustments, etc.
// Traits.NoShadow            = new Trait( "No Shadow", 'D', 'P', -10, false, "CI103" );
// Traits.NoShadow.exoticSprntl = 'Supernatural';
// Traits.NonReciprocalDamage = new Trait( "Non-Reciprocal Damage", 'A', 'P', 30, false, "CI41" );
// Traits.NonReciprocalDamage.exoticSprntl = 'Supernatural';
// Traits.Nocturnal           = new Trait( "Nocturnal", 'D', 'M', -10, false, "CI103" );
// Traits.Nocturnal.exoticSprntl = 'Supernatural';

// Traits.Obdurate            = new Trait( "Obdurate", 'D', 'M', -10, false, "CI92" );
// Traits.Oblivious           = new Trait( "Oblivious", 'D', 'M', -5, false, "CI92" );
// Traits.Obsession           = new Trait( "Obsession", 'D', 'M', -5, true, "B3E241; CI93" );
// Traits.Obsession.highestLevel = 3;
// Traits.Obsession.description = [];
// Traits.OdiousPersonalHabit = new Trait( "Odious Personal Habit", 'D', 'So', -5, true, "B3E26" );
// Traits.OdiousPersonalHabit.highestLevel = 3;
// Traits.OdiousPersonalHabit.multiple = true;
Traits.OneArm              = new Trait( "Einarmig", 'D', 'P', -20, false, "GL14" );
Traits.OneEye              = new Trait( "Einäugig", 'D', 'P', -15, false, "GL13" );
Traits.OneEye.group = 'monocular';
// Traits.OneFineManipulator  = new Trait( "One Fine Manipulator", 'D', 'P', -15, false, "CI103" );
// Traits.OneFineManipulator.exoticSprntl = 'Exotic';
// Traits.OneHand             = new Trait( "One Hand", 'D', 'P', -15, false, "B3E29" );
// Traits.OntheEdge           = new Trait( "On the Edge", 'D', 'M', -15, false, "B3E241; CI93" );
// Traits.Oracle              = new Trait( "Oracle", 'A', 'M', 15, false, "CI42" );
// Traits.Oracle.exoticSprntl = 'Supernatural';
Traits.Overconfidence      = new Trait( "Selbstüberschätzung", 'D', 'M', -10, false, "GL16" );
Traits.Overconfidence.group = 'confidence';
Traits.Overweight          = new Trait( 'Overweight', 'D', 'P', -5, false, "B3E29" );
Traits.Overweight.group = 'BMI';
// Traits.OxygenStorage       = new Trait( "Oxygen Storage", 'A', 'P', 14, true, "CI62" );
// Traits.OxygenStorage.exoticSprntl = 'Exotic';
// Traits.OxygenStorage.group = "breathing";

Traits.Pacifism            = new Trait( "Pazifismus", 'D', 'M', -15, true, "GL14" );
Traits.Pacifism.highestLevel = 2;
// Traits.Pallor              = new Trait( "Pallor", 'D', 'P', -10, false, "CI103" );
// Traits.Pallor.exoticSprntl = 'Exotic';
// Traits.Pallor.mods = 'Vampiric Mitigation';
// Traits.PanimmunityTL9      = new Trait( "Panimmunity, +3 HT rolls", 'A', 'P', 2, false, "CI28" );
// Traits.PanimmunityTL10     = new Trait( "Panimmunity, +8 HT rolls", 'A', 'P', 5, false, "CI28" );
// Traits.PanimmunityTL12     = new Trait( "Panimmunity, full", 'A', 'P', 10, false, "CI28" );
// Traits.ParabolicHearing    = new Trait( "Parabolic Hearing", 'A', 'P', 4, true, "CI62" );
// Traits.ParabolicHearing.exoticSprntl = 'Exotic';
// Traits.ParabolicHearing.levelsName = 'range &times;2';
// Traits.Paranoia            = new Trait( "Paranoia", 'D', 'M', -10, false, "B3E35" );
// Traits.Parasite            = new Trait( "Parasite", 'D', 'P', -15, true, "CI103" );
// Traits.Parasite.exoticSprntl = 'Exotic';
// Traits.Parasite.levelsName = 'host requirement';
// Traits.Parasite.levelNames = ['broad','species-specific'];
// Traits.PassiveDefense      = new Trait( "Passive Defense", 'A', 'P', 25, true, "CI62" );
// Traits.PassiveDefense.exoticSprntl = 'Exotic';
// Traits.PassiveDefense.highestLevel = 6;
// Traits.PassiveDefense.multiple = true;    // for cases like Alligator template (Bestiary pg 107), DR varies by body location
// Traits.Patron              = new Trait( "Patron", 'A', 'So', 5, true, "B3E24; CI28" );
// Traits.Patron.multiple = true;
// Traits.Patron.mods = "Patron, Frequency, Favor";
// Traits.Patron.fixedCost = 5;
// Traits.Patron.highestLevel = 5;
// Traits.Patron.levelsName = 'power level';
// Traits.Patron.levelNames = ["person ≤150 pts, or 1000&times;SW org","person ≤200 pts, or 10000&times;SW org","","1000000&times;SW org","Gov't or multinat"];
// Traits.PenetratingCall      = new Trait( "Penetrating Call", 'A', 'P', 5, false, "CI63" );
// Traits.PenetratingCall.exoticSprntl = 'Exotic';
// Traits.PenetratingVision    = new Trait( "Penetrating Vision", 'A', 'P', 10, true, "CI63" );
// Traits.PenetratingVision.exoticSprntl = 'Exotic';
// Traits.PenetratingVision.levelsName = '6&Prime;&times;';
// Traits.PenetratingVision.mods = 'Penetrating Vision';
// Traits.PeripheralVision    = new Trait( "Peripheral Vision", 'A', 'P', 15, false, "B3E22" );
// Traits.PerfectBalance      = new Trait( "Perfect Balance", 'A', 'P', 15, false, "B3E237; CI63" );
// Traits.PerfectBalance.exoticSprntl = 'Exotic';
// Traits.PheromoneControl    = new Trait( "Pheromone Control", 'A', 'P', 25, false, "CI63" );
// Traits.PheromoneControl.exoticSprntl = 'Exotic';
//Traits.Phobia              = new Trait( "Phobia", 'M', -5, false, "B3E35" );
Traits.Phobia              = new Trait( "Phobien", 'D', 'M', -5, true, "GL15" );
Traits.Phobia.levelNames = ['','severe'];
Traits.Phobia.multiple = true;
Traits.Phobia.mods = 'Phobias';
// Traits.Pious               = new Trait( "Pious", 'A', 'M', 5, false, "CI29" );
// Traits.Pitiable            = new Trait( "Pitiable", 'A', 'So', 5, false, "CI29" );
// Traits.Planetbound         = new Trait( "Planetbound", 'D', 'P', -10, true, "CI103" );
// Traits.Planetbound.exoticSprntl = 'Exotic';
// Traits.Planetbound.levelsName = 'safe trip length';
// Traits.Planetbound.levelNames = ['1 month','3 months','1 year','2 years'];
// Traits.Planetbound.mods = 'Planetbound';
// Traits.PlantEmpathy        = new Trait( "Plant Empathy", 'A', 'M', 5, false, "CI29" );
// supernatural?
// Traits.PolarizedEyes       = new Trait( "Polarized Eyes", 'A', 'P', 5, false, "CI63" );
// Traits.PolarizedEyes.exoticSprntl = 'Exotic';
// Traits.PoorGrip            = new Trait( "Poor Grip", 'D', "P", -5, false, "CI101" );
// Traits.PoorGrip.group = 'manipulators';
// Traits.PostCombatShakes    = new Trait( "Post-Combat Shakes", 'D', 'M', -5, false, "CI93" );
// Traits.PowerInvestiture    = new Trait( "Power Investiture", 'A', 'M', 10, true, "CI42" );
// Traits.PowerInvestiture.exoticSprntl = 'Supernatural';
// Traits.PrefrontalLobotomy  = new Trait( "Prefrontal Lobotomy", 'D', 'M', -15, false, "CI93" );
// Traits.Presentient         = new Trait( "Presentient", 'D', 'M', -20, false, "CI103" );
// Traits.Presentient.exoticSprntl = 'Exotic';
// Traits.PressureSupport     = new Trait( "Pressure Support", 'A', 'P', 5, true, "CI63" );
// Traits.PressureSupport.exoticSprntl = 'Exotic';
//Traits.PressureSupport.highestLevel = 3;
// Traits.PressureSupport.levelsName = 'pressure multiplier';
// Traits.PressureSupport.levelNames = ['10&times;','100&times;','∞'];
Traits.Primitive           = new Trait( "Primitivität", 'D', 'So', -5, true, "GL15" );
// Traits.PsionicResistance   = new Trait( "Psionic Resistance", 'A', 'M', 2, true, "B3E22; CI42" );
// Traits.PsionicResistance.exoticSprntl = 'Exotic';
Traits.Pyromania           = new Trait( "Pyromanie", 'D', 'M', -5, false, "GL15" );

// Traits.Quadriplegic        = new Trait( "Quadriplegic", 'D', 'P', -50, false, "CI83" );
//
// Traits.RacialDXModifier    = new Trait( "Racial DX Modifier", 'AD', 'P', 'att', true, "CI175" );
// Traits.RacialDXModifier.posNegLevels = true;
// Traits.RacialDXModifier.lowestLevel = -8;
// Traits.RacialDXModifier.costFunction = AttributeCostFunction3e;   // this IS the right way to attach a custom function, if I can figure out how to make things work downstream
// Traits.RacialHTModifier    = new Trait( "Racial HT Modifier", 'AD', 'P', 'att', true, "CI175" );
// Traits.RacialHTModifier.posNegLevels = true;
// Traits.RacialHTModifier.lowestLevel = -8;
// Traits.RacialSTModifier.costFunction = AttributeCostFunction3e;
// Traits.RacialIQModifier    = new Trait( "Racial IQ Modifier", 'AD', 'M', 'att', true, "CI175" );
// Traits.RacialIQModifier.posNegLevels = true;
// Traits.RacialIQModifier.lowestLevel = -8;
// Traits.RacialSTModifier.costFunction = AttributeCostFunction3e;
// Traits.RacialSTModifier    = new Trait( "Racial ST Modifier", 'AD', 'P', 'att', true, "CI175" );
// Traits.RacialSTModifier.posNegLevels = true;
// Traits.RacialSTModifier.lowestLevel = -8;
// Traits.RacialSTModifier.costFunction = AttributeCostFunction3e;
//
// Traits.RacialMemory        = new Trait( "Racial Memory", 'A', 'M', 25, true, "CI42" );
// Traits.RacialMemory.fixedCost = -10;
// Traits.RacialMemory.lowestLevel = 1;
// Traits.RacialMemory.levelNames = ['passive','active'];
// Traits.RacialMemory.exoticSprntl = 'Supernatural';
// Traits.RacialMemoryPassive = new Trait( "Racial Memory (passive)", 'M', 15 );
// Traits.RacialMemoryPassive.exoticSprntl = 'Supernatural';
// Traits.RacialMemoryActive = new Trait( "Racial Memory (active)", 'M', 40 );
// Traits.RacialMemoryActive.exoticSprntl = 'Supernatural';
// Traits.RadarSense          = new Trait( "Radar Sense", 'A', 'P', 1, true, "CI63" );
// Traits.RadarSense.exoticSprntl = 'Exotic';
// Traits.RadarSense.fixedCost = 50;
// Traits.RadarSense.levelsName = 'hex';
// Traits.RadarSense.mods = 'Radar Sense';
// Traits.RadioHearing        = new Trait( "Radio Hearing", 'A', 'P', 10, false, "CI64" );
// Traits.RadioHearing.exoticSprntl = 'Exotic';
// Traits.RadioSpeech         = new Trait( "Radio Speech", 'A', 'P', 25, false, "CI64" );
// Traits.RadioSpeech.exoticSprntl = 'Exotic';
// Traits.MilitaryRank        = new Trait( "Rank", 'A', 'So', 5, true, "B3E22; CI29" );
// Traits.MilitaryRank.highestLevel = 8;
// Traits.MilitaryRank.description = [];
// Traits.MilitaryRank.mods = "Rank-Status, Rank-Wealth";
Traits.RapidHealing        = new Trait( "Schnelle Heilung", 'A', 'P', 5, false, "GL12" );
Traits.RapidHealing.group = 'healing';
Traits.VeryRapidHealing    = new Trait( "Sehr Schnelle Heilung", 'A', 'P', 15, false, "GL12" );
Traits.VeryRapidHealing.group = 'healing';
// Traits.RapierWit           = new Trait( "Rapier Wit", 'A', 'M', 5, false, "CI29" );
// Traits.Reawakened          = new Trait( "Reawakened", 'A', 'M', 10, false, "CI43" );
// Traits.Reawakened.exoticSprntl = 'Supernatural';
// Traits.Reclusive           = new Trait( "Reclusive", 'D', 'M', -10, false, "CI93" );
// Traits.ReciprocalRest      = new Trait( "Reciprocal Rest", 'A', 'P', 15, false, "CI43" );
// Traits.ReciprocalRest.exoticSprntl = 'Supernatural';
// Traits.Recovery            = new Trait( "Recovery", 'A', 'P', 10, false, "CI64" );
// Traits.Recovery.exoticSprntl = 'Exotic';
// Traits.ReducedHitPoints    = new Trait( "Reduced Hit Points", 'D', 'P', -5, true, "CI83" );
// Traits.ReducedMove         = new Trait( "Reduced Move",       'D', 'P', -5, true, "CI103" );
// Traits.ReducedSwim         = new Trait( "Reduced Swim Move",  'D', 'P', -5, true, "CI103" );
// Traits.ReducedFly          = new Trait( "Reduced Fly Move",   'D', 'P', -5, true, "CI103" );
// Traits.ReducedSleep        = new Trait( "Reduced Sleep", 'A', 'P', 10, false, "CI64" );
// Traits.ReducedSleep.exoticSprntl = 'Exotic';
// Traits.Reflection          = new Trait( "Reflection", 'A', 'P', 8, true, "CI64" );
// Traits.Reflection.description = [];
// Traits.Reflection.instructions = 'what kind of attack damage is reflected';
// Traits.Reflection.levelsName = 'die of damage';
// Traits.Reflection.mods = 'Reflection';
// Traits.Regeneration        = new Trait( "Regeneration", 'A', 'P', 0, false, "CI64" );
// Traits.Regeneration.exoticSprntl = 'Exotic';
// Traits.Regeneration.mods = 'Regeneration';
// Traits.Regeneration.group = 'healing';
// Traits.Regrowth            = new Trait( "Regrowth", 'A', 'P', 40, false, "CI64" );
// Traits.Regrowth.exoticSprntl = 'Exotic';
// Traits.Regrowth.mods = 'Regrowth';
// Traits.ReligiousRank       = new Trait( "Religious Rank", 'A', 'So', 5, true, "CI22 & 29" );
// Traits.Reprogrammable      = new Trait( "Reprogrammable Duty", 'D', 'M', -25, false, "CI104" );
// Traits.Reprogrammable.exoticSprntl = 'Exotic';
Traits.Reputation          = new Trait( "Ruf", 'AD', 'So', 5, true, "B3E17" );
Traits.Reputation.multiple = true;
Traits.Reputation.posNegLevels = true;
Traits.Reputation.lowestLevel = -4;
Traits.Reputation.highestLevel = 4;
Traits.Reputation.takesMultipliers = true;
Traits.Reputation.mods = "Reputation";
Traits.ResistanttoPoison   = new Trait( "Giftresistenz", 'A', 'P', 5, false, "GL11" );
// Traits.Resurrection        = new Trait( "Resurrection", 'A', 'P', 150, false, "CI64" );
// Traits.Resurrection.exoticSprntl = 'Exotic';
// Traits.Resurrection.group = 'life';
// Traits.Resurrection.mods = 'Resurrection';
// Traits.Retrogression       = new Trait( "Retrogression", 'A', 'M', 40, false, "CI43" );
// Traits.Retrogression.exoticSprntl = 'Supernatural';
// Traits.Sadism              = new Trait( "Sadism", 'D', 'M', -15, false, "B3E36" );
// Traits.Sanctity            = new Trait( "Sanctity", 'A', 'So', 5, false, "CI29" );
// Traits.SanitizedMetabolism = new Trait( "Sanitized Metabolism", 'A', 'P', 5, false, "CI65" );
// Traits.SanitizedMetabolism.exoticSprntl = 'Exotic';
// Traits.Scales              = new Trait( "Scales", 'A', 'P', 3, false, "CI57" );
// Traits.Scales.exoticSprntl = 'Exotic';
// Traits.ScalesHeavy         = new Trait( "Scales, heavy", 'A', 'P', 28, false, "CI57" );
// Traits.ScalesHeavy.exoticSprntl = 'Exotic';
// Traits.Scalped             = new Trait( "Scalped", 'D', 'P', -5, false, "CI84" );
// Traits.SecondSight         = new Trait( "Second Sight", 'A', 'M', 5, false, "CI43" );
// Traits.SecondSight.exoticSprntl = 'Supernatural';
// Traits.SecondSight.mods = 'Second Sight';
// Traits.SecondSightNonMage  = new Trait( "Second Sight: Non-Mage", 'M', 5, false );
// Traits.SecondSightNonMage.exoticSprntl = 'Supernatural';
// Traits.SecondSightMage     = new Trait( "Second Sight: Mage", 'M', 2, false );
// Traits.SecondSightMage.exoticSprntl = 'Supernatural';
// Traits.Secret              = new Trait( "Secret", 'D', 'So', -5, true, "B3E238; CI78" );
// Traits.Secret.levelNames = ['embarrassment','utter rejection','','imprisonment/exile','','possible death'];
// Traits.Secret.levelsName = 'consequence level';
// Traits.Secret.multiple = true;
// Traits.Secret.mods = 'Secret';
// Traits.SecretCommunication = new Trait( "Secret Communication", 'A', 'MP', 20, false, "CI65" );
// Traits.SecretCommunication.exoticSprntl = 'Exotic';
// Traits.SecretCommunication.mods = 'Secret Communication';
// Traits.SecurityClearanceI  = new Trait( "Security Clearance, nation/corp", 'A', 'So', 2, true, "CI29" );
// Traits.SecurityClearanceI.buttonLabel = "Clearance, nation/corp";
// Traits.SecurityClearanceII = new Trait( "Security Clearance, superpower/supercorp", 'A', 'So', 5, true, "CI29" );
// Traits.SecurityClearanceII.buttonLabel = "Clearance, int'l";
// Traits.SeeInvisible        = new Trait( "See Invisible", 'A', 'P', 15, false, "CI65" );
// Traits.SeeInvisible.exoticSprntl = 'Exotic';
// Traits.SeeInvisible.multiple = true;
// Traits.SeeInvisible.description = [];
// Traits.SeeInvisible.instructions = 'specify type of Invisibility (EM, sonar, etc. - see Invisibility)';
// Traits.SelfCentered        = new Trait( "Self-Centered", 'D', 'M', -10, false, "CI94" );
// Traits.SelfDestruct        = new Trait( "Self-Destruct", 'D', 'P', -20, false, "CI104" );
// Traits.SelfDestruct.exoticSprntl = 'Exotic';
// Traits.Selfish             = new Trait( "Selfish", 'D', 'M', -5, false, "CI94" );
// Traits.Selfless            = new Trait( "Selfless", 'D', 'M', -10, false, "CI94" );
// Traits.SemiLiteracy        = new Trait( "Semi-Literacy", 'A', 'M', 5, false, "CI29" );
// Traits.SemiLiteracy.group = 'literacy';
// Traits.SemiLiteracy.mods = 'LiteracyNorms';
// Traits.SemiUpright         = new Trait( "Semi-Upright", 'D', 'P', -5, false, "CI103" );
// Traits.SemiUpright.exoticSprntl = 'Exotic';
// Traits.SenseOfDuty         = new Trait( "Pflichtgefühl", 'D', 'M', -5, true, "GL15" );
// Traits.SenseOfDuty.multiple = true;
// Traits.SenseOfDuty.highestLevel = 4;
// Traits.SenseofPerception   = new Trait( "Sense of Perception", 'A', 'P', 100, false, "CI65" );
// Traits.SenseofPerception.exoticSprntl = 'Exotic';
// Traits.SensieTalent        = new Trait( "Sensie Talent", 'A', 'M', 2, true, "CI30" );
// Traits.Sensitive           = new Trait( "Sensitive", 'A', 'M', 5, false, "CI30" );
// Traits.SensitiveTouch      = new Trait( "Sensitive Touch", 'A', 'P', 10, false, "CI65" );
// Traits.SensitiveTouch.exoticSprntl = 'Exotic';
// Traits.Serendipity         = new Trait( "Serendipity", 'A', 'M', 15, true, "CI30" );
// Traits.Serendipity.highestLevel = 2;
// Traits.Sessile             = new Trait( "Sessile", 'D', 'P', -50, false, "CI104" );
// Traits.Sessile.exoticSprntl = 'Exotic';
// compare to Animal Form, or 4th ed Shapeshifting: Alternate Form
// Traits.ShadowForm          = new Trait( "Shadow Form", 'A', 'P', 50, false, "CI65" );
// Traits.ShadowForm.exoticSprntl = 'Exotic';
// Traits.ShadowForm.mods = 'Shadow Form, Carry Objects, Unswitchable Disad';
// Traits.Shapeshifter        = new Trait( "Shapeshifter", 'A', 'P', 0, false, "CI43-44" );
// Traits.Shapeshifter.exoticSprntl = 'Supernatural';
// Traits.Shapeshifter.mods = 'Shapes';
// Traits.ShapeshifterWerebear = new Trait( "Shapeshifter: Werebear", 'A', 'P', 15, false );
// Traits.ShapeshifterWerebear.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWereboar = new Trait( "Shapeshifter: Wereboar", 'A', 'P', 25, false );
// Traits.ShapeshifterWereboar.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWerebull = new Trait( "Shapeshifter: Werebull", 'A', 'P', 30, false );
// Traits.ShapeshifterWerebull.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWeredeerStag = new Trait( "Shapeshifter: Weredeer Stag", 'A', 'P', 20, false );
// Traits.ShapeshifterWeredeerStag.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWeredeerDoe = new Trait( "Shapeshifter: Weredeer Doe", 'A', 'P', 15, false );
// Traits.ShapeshifterWeredeerDoe.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWereeagle = new Trait( "Shapeshifter: Were-eagle", 'A', 'P', 20, false );
// Traits.ShapeshifterWereeagle.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWerehorse = new Trait( "Shapeshifter: Werehorse", 'A', 'P', 25, false );
// Traits.ShapeshifterWerehorse.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWereleopard = new Trait( "Shapeshifter: Wereleopard", 'A', 'P', 30, false );
// Traits.ShapeshifterWereleopard.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWerelion = new Trait( "Shapeshifter: Werelion", 'A', 'P', 40, false );
// Traits.ShapeshifterWerelion.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWeresnake = new Trait( "Shapeshifter: Weresnake", 'A', 'P', 10, false );
// Traits.ShapeshifterWeresnake.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWeretiger = new Trait( "Shapeshifter: Weretiger", 'A', 'P', 40, false );
// Traits.ShapeshifterWeretiger.exoticSprntl = 'Supernatural';
// Traits.ShapeshifterWerewolf = new Trait( "Shapeshifter: Werewolf", 'A', 'P', 15, false );
// Traits.ShapeshifterWerewolf.exoticSprntl = 'Supernatural';
// Traits.Sharpshooter        = new Trait( "Sharpshooter", 'A', 'M', 45, false, "CI30" );
// Traits.Sharpshooter.cinematic = true;
// Traits.Shock               = new Trait( "Shock", 'A', 'P', 20, false, "CI73" );
// Traits.Shock.exoticSprntl = 'Exotic';
// Traits.Shock.mods = 'Natural Attack Damage, Natural Attack Skill, Natural Attack DX roll';
// Traits.ShockCheap          = new Trait( "Shock, cheap", 'A', 'P', 6, true, "CI73" );
// Traits.ShockCheap.exoticSprntl = 'Exotic';
// Traits.ShockCheap.fixedCost = 14;
// Traits.ShockCheap.lowestLevel = 1;
// Traits.ShockCheap.mods = 'Natural Attacks (Cheap), Natural Attack DX roll';
// Traits.ShortArms            = new Trait( "Short Arms", 'D', 'P', -10, false, "CI104" );
// Traits.ShortArms.exoticSprntl = 'Exotic';
// Traits.ShortAttentionSpan  = new Trait( 'Short Attention Span', 'D', 'M', -10, false, "CI94" );
// Traits.ShortLifespan       = new Trait( "Short Lifespan", 'D', 'P', -10, true, "CI104" );
// Traits.ShortLifespan.exoticSprntl = 'Exotic';
// Traits.ShortLifespan.levelsName = '¾ × lifespan';
// Traits.ShortLifespan.group = 'aging';
// Traits.Shrinking           = new Trait( "Shrinking", 'A', 'P', 20, true, "CI65" );
// Traits.Shrinking.exoticSprntl = 'Exotic';
// Traits.Shrinking.highestLevel = 5;
// Traits.Shrinking.mods = 'ShrinkingAD, Carry Objects';
// Traits.ShrinkingPermanent  = new Trait( "Shrinking, permanent", 'D', 'P', 0, false, "CI65" );
// Traits.ShrinkingPermanent.exoticSprntl = 'Exotic';
// Traits.ShrinkingPermanent.highestLevel = 4;
// Traits.ShrinkingPermanent.mods = 'ShrinkingDI';
// Traits.Shyness             = new Trait( "Shyness", 'D', 'M', -5, true, "B3E37" );
// Traits.Shyness.lowestLevel  = 1;
// Traits.Shyness.highestLevel = 4;
// Traits.Shyness.levelNames = ['mild','severe','crippling'];
// Traits.Silence             = new Trait( "Silence", 'A', 'P', 5, true, "CI66" );
// Traits.Silence.exoticSprntl = 'Exotic';
// Traits.SingleMinded        = new Trait( "Zielbewußtsein", 'A', 'M', 5, false, "GL13" );
Traits.Skinny              = new Trait( 'Schmächtig', 'D', 'P', -5, false, "B3E29" );
Traits.Skinny.group = 'BMI';
// Traits.SlaveMentality      = new Trait( 'Slave Mentality', 'D', 'M', -40, false, "CI94" );
// Traits.Sleepwalker         = new Trait( "Sleepwalker", 'D', 'P', -5, false, "CI84" );
// Traits.Sleepy              = new Trait( "Sleepy", 'D', 'P', 0, false, "CI104" );
// Traits.Sleepy.exoticSprntl = 'Exotic';
// Traits.Sleepy.mods = "Sleepy";
// Traits.SlowEater           = new Trait( "Slow Eater", 'D', 'P', -10, false, "CI104" );
// Traits.SlowEater.exoticSprntl = 'Exotic';
// Traits.SlowHealing         = new Trait( "Slow Healing", 'D', 'P', -5, true, "CI104" );
// Traits.SlowHealing.exoticSprntl = 'Exotic';
// Traits.SlowHealing.highestLevel = 3;
// Traits.SlowHealing.group = 'healing';
// Traits.SlowHealing.levelsName = 'double HT roll interval &times;';
// Traits.SlowMetabolism      = new Trait( "Slow Metabolism", 'D', 'P', -10, true, "CI104" );
// Traits.SlowMetabolism.exoticSprntl = 'Exotic';
// Traits.SlowMetabolism.levelsName = '&times;10';
// Traits.Smoke               = new Trait( "Smoke", 'A', 'P', 15, false, "CI73" );
// Traits.Smoke.exoticSprntl = 'Exotic';
// Traits.Smoke.mods = 'Natural Attack Area, Natural Attack Duration, Natural Attack Skill, Natural Attack DX roll';
// Traits.SmokeCheap          = new Trait( "Smoke, cheap", 'A', 'P', 6, true, "CI73" );
// Traits.SmokeCheap.exoticSprntl = 'Exotic';
// Traits.SmokeCheap.fixedCost = 9;
// Traits.SmokeCheap.lowestLevel = 1;
// Traits.SmokeCheap.mods = 'Natural Attacks (Cheap), Natural Attack DX roll';
// Traits.Snatcher            = new Trait( "Snatcher", 'A', 'M', 80, false, "CI45" );
// Traits.Snatcher.exoticSprntl = 'Supernatural';
// Traits.Snatcher.takesConstantMods = true;
// Traits.Snatcher.mods = "Snatcher";
// Traits.SocialDisease       = new Trait( "Social Disease", 'D', 'P', -5, true, "CI84" );
// Traits.SocialStigma        = new Trait( "Social Stigma", 'D', 'So', -5, true, "B3E27" );
// Traits.SocialStigma.multiple = true;
// Traits.SocialStigma.highestLevel = 4;
// Traits.Solipsist           = new Trait( 'Solipsist', 'D', 'M', -10, false, "CI94" );
// Traits.SonarVision         = new Trait( "Sonar Vision", 'A', 'P', 25, false, "CI66" );
// Traits.SonarVision.exoticSprntl = 'Exotic';
// Traits.SonarVision.mods = 'Sonar Vision';
// Traits.SonicBlast          = new Trait( "Sonic Blast", 'A', 'P', 20, false, "CI73" );
// Traits.SonicBlast.exoticSprntl = 'Exotic';
// Traits.SonicBlast.mods = 'Natural Attack Damage, Natural Attack Range, Natural Attack Skill, Natural Attack DX roll';
// Traits.SonicBlastCheap     = new Trait( "Sonic Blast, cheap", 'A', 'P', 6, true, "CI73" );
// Traits.SonicBlastCheap.exoticSprntl = 'Exotic';
// Traits.SonicBlastCheap.fixedCost = 14;
// Traits.SonicBlastCheap.lowestLevel = 1;
// Traits.SonicBlastCheap.mods = 'Natural Attacks (Cheap), Natural Attack DX roll';
// Traits.SpaceSickness       = new Trait( "Space Sickness", 'D', 'P', -10, false, "CI84" );
// Traits.SpeakUnderwater     = new Trait( "Speak Underwater", 'A', 'P', 8, false, "CI66" );
// Traits.SpeakUnderwater.exoticSprntl = 'Exotic';
// Traits.SpeakUnderwater.mods = 'Speak Underwater';
// Traits.SpeakwithAnimals     = new Trait( "Speak with Animals", 'A', 'P', 15, false, "CI66" );
// Traits.SpeakwithAnimals.exoticSprntl = 'Exotic';
// Traits.SpeakwithAnimals.mods = 'Speak with Animals';
// Traits.SpeakwithFish        = new Trait( "Speak with Fish", 'A', 'P', 10, false, "CI66" );
// Traits.SpeakwithFish.exoticSprntl = 'Exotic';
// Traits.SpeakwithPlants      = new Trait( "Speak with Plants", 'A', 'P', 15, false, "CI66" );
// Traits.SpeakwithPlants.exoticSprntl = 'Exotic';
// Traits.Spear               = new Trait( "Spear", 'A', 'P', 30, false, "CI67" );
// Traits.Spear.exoticSprntl = 'Exotic';
// Traits.Spear.mods = 'Strikers';
// Traits.SpecialRapport      = new Trait( "Special Rapport", 'A', 'M', 10, false, "CI46" );
// Traits.SpecialRapport.exoticSprntl = 'Supernatural';
// Traits.SpecialRapport.multiple = true;
// Traits.SpectrumVision      = new Trait( "Spectrum Vision", 'A', 'P', 40, false, "CI66" );
// Traits.SpectrumVision.exoticSprntl = 'Exotic';
// Traits.Spines              = new Trait( "Spines", 'A', 'P', 10, true, "CI67" );
// Traits.Spines.exoticSprntl = 'Exotic';
// Traits.Spines.fixedCost = -5;
// Traits.Spines.lowestLevel = 1;
// Traits.Spines.levelNames = ['short (1-2", 1d-2 imp, reach C)','long (1-2&lsquo;, 1d imp, reach 1)'];
// Traits.SpiritEmpathy       = new Trait( "Spirit Empathy", 'A', 'M', 10, false, "CI46" );
// Traits.SpiritEmpathy.exoticSprntl = 'Supernatural';
// Traits.SplitPersonality    = new Trait( "Split Personality", 'D', 'M', -5, true, "B3E37" );
// Traits.SplitPersonality.fixedCost = -5;
// Traits.SplitPersonality.lowestLevel = 1;
// Traits.SplitPersonality.highestLevel = 2;
// Traits.SplitPersonality.levelNames = ['faceted','distinct'];
// Traits.Status              = new Trait( "Status", 'AD', 'So', 5, true, "B3E18" );
// Traits.Status.description  = [];
// Traits.Status.posNegLevels = true;
// Traits.Status.lowestLevel  = -4;
// Traits.Status.highestLevel = 8;
// Traits.Sterile             = new Trait( "Sterile", 'D', 'P', -3, false, "CI84" );
// Traits.StressAtavism       = new Trait( "Stress Atavism", 'D', 'M', -4, true, "CI105" );
// Traits.StressAtavism.exoticSprntl = 'Exotic';
// Traits.StressAtavism.fixedCost = -8;
// Traits.StressAtavism.lowestLevel = 1;
// Traits.StressAtavism.levelNames = ['Mild','Moderate','Severe'];
// Traits.StressAtavism.mods = 'Atavism Attack Frequency';
// Traits.Stretching          = new Trait( "Stretching", 'A', 'P', 15, true, "CI66" );
// Traits.Stretching.exoticSprntl = 'Exotic';
// Traits.Stretching.fixedCost = 15;
// Traits.Stretching.lowestLevel = 1;
// Traits.Stretching.group = "flex";
// Traits.StretchingInflexible = new Trait( "Stretching, not flexible", 'A', 'P', 7.5, true, "CI66" );
// Traits.StretchingInflexible.exoticSprntl = 'Exotic';
// Traits.StretchingInflexible.fixedCost = 7.5;
// Traits.StretchingInflexible.lowestLevel = 1;
Traits.Stubborn            = new Trait( "Dickköpfigkeit", 'D', 'M', -5, false, "GL13" );
// Traits.Stuttering          = new Trait( "Stuttering", 'D', 'P', -10, false, "B3E29" );
// Traits.Striker             = new Trait( "Striker", 'A', 'P', 5, false, "CI67" );
// Traits.Striker.exoticSprntl = 'Exotic';
// Traits.Striker.multiple = true;
// Traits.Striker.mods = 'Strikers';
Traits.StrongWill          = new Trait( "Starker Wille", 'A', 'M', 4, true, "GL12" );
Traits.StrongWill.group = 'will';
// Traits.StyleFamiliarity    = new Trait( "Style Familiarity", 'A', 'M', 1, false, "CI30" );
// Traits.StyleFamiliarity.multiple = true;
// Traits.StyleFamiliarityAllStyles = new Trait( "Style Familiarity, all styles", 'A', 'M', 20, false, "CI30" );
// Traits.StyleFamiliarityAllStyles.mods = "Secret Styles";
// Traits.Subjugation         = new Trait( "Subjugation", 'D', 'P', -20, false, "CI105" );
// Traits.Subjugation.exoticSprntl = 'Exotic';
// Traits.SubsonicHearing     = new Trait( "Subsonic Hearing", 'A', 'P', 5, false, "CI67" );
// Traits.SubsonicHearing.exoticSprntl = 'Exotic';
// Traits.SubsonicHearing.mods = 'Sole Sense';
// Traits.SubsonicSpeech      = new Trait( "Subsonic Speech", 'A', 'P', 20, false, "CI67" );
// Traits.SubsonicSpeech.exoticSprntl = 'Exotic';
// Traits.SubsonicSpeech.mods = 'Sole Speech Mode';
// Traits.SuperClimbing       = new Trait( "Super Climbing", 'A', 'P', 3, true, "CI67" );
// Traits.SuperClimbing.exoticSprntl = 'Exotic';
// Traits.SuperFlight         = new Trait( "Super Flight", 'A', 'P', 20, true, "CI67" );
// Traits.SuperFlight.exoticSprntl = 'Exotic';
// Traits.SuperJump           = new Trait( "Super Jump", 'A', 'P', 10, true, "CI68" );
// Traits.SuperJump.exoticSprntl = 'Exotic';
// Traits.SuperRunning        = new Trait( "Super Running", 'A', 'P', 20, true, "CI68" );
// Traits.SuperRunning.exoticSprntl = 'Exotic';
// Traits.Supersensitive      = new Trait( "Supersensitive", 'D', 'M', -2, true, "CI99" );
// Traits.Supersensitive.exoticSprntl = 'Supernatural';
// Traits.SuperSwimming       = new Trait( "Super Swimming", 'A', 'P', 10, true, "CI68" );
// Traits.SuperSwimming.exoticSprntl = 'Exotic';
// Traits.Surge               = new Trait( "Surge", 'A', 'P', 15, false, "CI73" );
// Traits.Surge.exoticSprntl = 'Exotic';
// Traits.Surge.mods = 'Natural Attack Range, Natural Attack Skill, Natural Attack IQ roll';
// Traits.SurgeCheap          = new Trait( "Surge, cheap", 'A', 'P', 6, true, "CI73" );
// Traits.SurgeCheap.exoticSprntl = 'Exotic';
// Traits.SurgeCheap.fixedCost = 9;
// Traits.SurgeCheap.lowestLevel = 1;
// Traits.SurgeCheap.mods = 'Natural Attacks (Cheap), Natural Attack IQ roll';
// Traits.SusceptibilityToPoison = new Trait( "Susceptibility To Poison", 'D', 'P', -5, true, "CI84" );

// Traits.Teeth               = new Trait( "Teeth", 'A', 'P', 5, true, "CI68" );
// Traits.Teeth.exoticSprntl = 'Exotic';
// Traits.Teeth.lowestLevel = 0;
// Traits.Teeth.highestLevel = 2;
// Traits.Teeth.levelNames = ['blunt (cr based on &half; ST bite, B140)','sharp (cut based on full ST bite, B140)','fangs (imp based on full ST bite, B140)'];
// Traits.TelepathicAddiction = new Trait( "Telepathic Addiction", 'D', 'M', -10, false, "CI99" );
// Traits.TelepathicAddiction.exoticSprntl = 'Supernatural';
// Traits.TelepathicAddiction.mods = 'Telepathic Addiction';
// Traits.TelescopicVision    = new Trait( "Telescopic Vision", 'A', 'P', 6, true, "CI68" );
// Traits.TelescopicVision.exoticSprntl = 'Exotic';
// Traits.TelescopicVision.levelsName = 'mag &times;2';
// Traits.TemperatureTolerance = new Trait( "Temperature Tolerance (mundane)", 'P', 1, true, "CI30" );
// Traits.TemperatureTolerance.highestLevel = 2;
// Traits.TemperatureTolerance = new Trait( "Temperature Tolerance", 'A', 'P', 1, true, "CI30" );
// Traits.TemperatureTolerance.exoticSprntl = 'Supernatural';
// Traits.TemperatureTolerance.levelsName = '× HT + 55°';
// Traits.TemporalInertia     = new Trait( "Temporal Inertia", 'A', 'M', 15, false, "CI46" );
// Traits.TemporalInertia.exoticSprntl = 'Supernatural';
// Traits.Tenure              = new Trait( "Tenure", 'So', 'A', 5, false, "CI31" );
// Traits.TerminallyIll       = new Trait( "Terminally Ill", 'D', 'P', -25, true, "B3E239; CI84" );
// Traits.TerminallyIll.fixedCost = -25;
// Traits.TerminallyIll.lowestLevel = 1;
// Traits.TerminallyIll.highestLevel = 3;
// Traits.TerminallyIll.levelsName = 'remaining time';
// Traits.TerminallyIll.levelNames = ['≤2 years','≤1 year','≤1 month'];
// Traits.TimeJumper          = new Trait( "Time-Jumper", 'A', 'M', 100, false, "CI46" );
// Traits.TimeJumper.exoticSprntl = 'Supernatural';
// Traits.TimeJumper.takesConstantMods = true;
// Traits.TimeJumper.mods = "Jumper Loads, Jumper Mods, Time-Jumper Mods";
// Traits.Timesickness        = new Trait( "Timesickness", 'D', 'P', 0, false, "CI84" );
// Traits.Timesickness.mods = 'Timesickness';
Traits.Toughness           = new Trait( "Zähigkeit", 'A', 'P', 15, true, "GL12" );
Traits.Toughness.fixedCost = -5;
Traits.Toughness.highestLevel = 2;
// Traits.TourettesSyndrome   = new Trait( "Tourette's Syndrome", 'D', 'P', -15, true, "CI85" );
// Traits.TourettesSyndrome.highestLevel = 2;
// Traits.TourettesSyndrome.mods = 'Tourettes';
// Traits.Trademark           = new Trait( "Trademark", 'D', 'M', -5, true, "B3E241; CI94" );
// Traits.Trademark.highestLevel = 3;
// Traits.TrainedbyaMaster    = new Trait( "Trained by a Master", 'A', 'M', 40, false, "CI31" );
// Traits.TrainedbyaMaster.cinematic = true;
// Traits.Transference        = new Trait( "Transference", 'A', 'P', 40, true, "CI68" );
// Traits.Transference.exoticSprntl = 'Exotic';
// Traits.Transformation      = new Trait( "Transformation", 'A', 'P', 15, false, "CI68" );
// Traits.Transformation.exoticSprntl = 'Exotic';
// Traits.Transformation.mods = 'Limited Use, Takes Extra Time';
// Traits.Trickster           = new Trait( "Trickster", 'D', 'M', -15, false, "CI94" );
Traits.Truthfulness        = new Trait( "Ehrlichkeit", 'D', 'M', -5, false, "GL13" );
// Traits.TreeKin             = new Trait( "Tree-Kin", 'A', 'M', 15, false, "CI31" );
// supernatural?
// Traits.TrueFaith           = new Trait( "True Faith", 'A', 'M', 15, false, "CI47" );
// Traits.TrueFaith.exoticSprntl = 'Supernatural';
// Traits.Tunnel              = new Trait( "Tunnel", 'A', 'P', 10, true, "CI69" );
// Traits.Tunnel.fixedCost = 40;
// Traits.Tunnel.lowestLevel = 1;
// Traits.Tunnel.exoticSprntl = 'Exotic';
// Traits.Tunnel.levelsName = 'Tunnelling Move point';
//
// Traits.Ultrahearing        = new Trait( "Ultrahearing", 'A', 'P', 5, false, "CI69" );
// Traits.Ultrahearing.exoticSprntl = 'Exotic';
// Traits.Ultrahearing.mods = 'Sole Sense';
// Traits.UltrasonicSpeech    = new Trait( "Ultrasonic Speech", 'A', 'P', 25, false, "CI69" );
// Traits.UltrasonicSpeech.exoticSprntl = 'Exotic';
// Traits.UltrasonicSpeech.fixedCost = -25;
// Traits.UltrasonicSpeech.highestLevel = 2;
// Traits.UltrasonicSpeech.mods = 'Sole Speech Mode';
// Traits.Unaging             = new Trait( "Unaging", 'A', 'P', 15, false, "CI69" );
// Traits.Unaging.exoticSprntl = 'Exotic';
// Traits.Unaging.mods = "Unaging";
// Traits.UncontrolledChange  = new Trait( "Uncontrolled Change", 'D', 'P', -10, true, "CI105" );
// Traits.UncontrolledChange.exoticSprntl = 'Exotic';
// Traits.UncontrolledChange.fixedCost = -10;
// Traits.UncontrolledChange.lowestLevel = 1;
// Traits.UncontrolledChange.levelsName = 'rxn penalty';
// Traits.UncontrolledChange.levelNames = [-1,-2,-3,-4,-5,-6];
// Traits.UncontrolledChange.mods = "Uncontrolled Change";
// Traits.UncontrolledChangeLosePowers = new Trait( "Uncontrolled Change, loss of powers", 'D', 'P', -50, false, "CI105" );
// Traits.UncontrolledChangeLosePowers.exoticSprntl = 'Exotic';
// Traits.Undying             = new Trait( "Undying", 'A', 'P', 175, false, "CI69" );
// Traits.Undying.exoticSprntl = 'Exotic';
// Traits.Uneducated          = new Trait( "Uneducated", 'D', 'So', -5, false, "CI79" );
// Traits.Unfazeable          = new Trait( "Unfazeable", 'A', 'M', 15, false, "B3E237; CI31" );
// Traits.Unfazeable.takesConstantMods = true;
// Traits.Unhealing           = new Trait( "Unhealing", 'D', 'P', -20, false, "CI106" );
// Traits.Unhealing.exoticSprntl = 'Exotic';
// Traits.Unhealing.mods = 'Unhealing';
// Traits.Unique              = new Trait( "Unique", 'D', 'MP', -5, false, "CI99" );
// Traits.Unique.exoticSprntl = 'Supernatural';
// Traits.UniversalDigestion  = new Trait( "Universal Digestion", 'A', 'P', 15, false, "CI69" );
// Traits.UniversalDigestion.exoticSprntl = 'Exotic';
// Traits.Unliving            = new Trait( "Unliving", 'D', 'P', -50, false, "CI100" );
// Traits.Unliving.exoticSprntl = 'Supernatural';
// Traits.Unluckiness         = new Trait( "Unluckiness", 'D', 'M', -10, false, "B3E37" );
// Traits.Unluckiness.group = 'luck';
// Traits.UnnaturalFeature    = new Trait( "Unnatural Feature", 'D', 'P', -5, false, "CI85" );
// Traits.UnnaturalFeature.multiple = true;
// Traits.UntrainedShapeChanging = new Trait( "Untrained Shape-Changing", 'D', 'P', -15, false, "CI100" );
// Traits.UntrainedShapeChanging.exoticSprntl = 'Supernatural';
// Traits.UnusualBackground   = new Trait( "Unusual Background", 'A', 'So', 'varies', false, "B3E23" );
// Traits.UnusualBackground.description = [];
// Traits.UnusualBackground.requestBasicCost = 10;
// Traits.UnusualBiochemistry = new Trait( "Unusual Biochemistry", 'D', 'P', -5, false, "CI106" );
// Traits.UnusualBiochemistry.exoticSprntl = 'Exotic';

// Traits.VacuumAdaptation    = new Trait( "Vacuum Adaptation", 'A', 'P', 27, false, "CI69" );
// Traits.VacuumAdaptation.exoticSprntl = 'Exotic';
// Traits.VacuumSupport       = new Trait( "Vacuum Support", 'A', 'P', 40, false, "CI70" );
// Traits.VacuumSupport.exoticSprntl = 'Exotic';
// Traits.VacuumSupport.mods = "Sups Enhancements, Sups Limitations";
// Traits.VampiricDependency  = new Trait( "Vampiric Dependency", 'D', 'P', -50, false, "CI106" );
// Traits.VampiricDependency.exoticSprntl = 'Exotic';
// Traits.VampiricDominance   = new Trait( "Vampiric Dominance", 'A', 'P', 5, false, "CI70,53" );
// Traits.VampiricDominance.exoticSprntl = 'Exotic';
// Traits.VampiricDominance.mods = "Dominance";
// Traits.VampiricImmortality = new Trait( "Vampiric Immortality", 'A', 'P', 60, false, "CI70" );
// Traits.VampiricImmortality.exoticSprntl = 'Exotic';
// Traits.VampiricInvulnerability = new Trait( "Vampiric Invulnerability", 'A', 'P', 150, false, "CI70" );
// Traits.VampiricInvulnerability.exoticSprntl = 'Exotic';
// Traits.VampiricResurrection = new Trait( "Vampiric Resurrection", 'A', 'P', 150, false, "CI70" );
// Traits.VampiricResurrection.exoticSprntl = 'Exotic';
// Traits.VampiricResurrection.mods = "Resurrection";
// Traits.Venom               = new Trait( "Venom", 'A', 'P', 15, true, "CI71" );
// Traits.Venom.exoticSprntl = 'Exotic';
// Traits.Venom.mods = "Venom";
// Traits.Versatile           = new Trait( "Versatile", 'A', 'M', 5, false, "CI31" );
// Traits.VeryFat             = new Trait( 'Very Fat', 'P', -20, false, "B3E28" );
// Traits.VeryFat.group = 'BMI';
// Traits.Visualization       = new Trait( "Visualization", 'A', 'M', 10, false, "CI47" );
// Traits.Visualization.exoticSprntl = 'Supernatural';
Traits.Voice               = new Trait( "Wohlklang", 'A', 'P', 10, false, "B3E23" );
// Traits.Voices              = new Trait( "Voices", 'D', 'M', -5, true, "CI94" );
// Traits.Voices.levelNames = ['annoying','disturbing','diabolical'];
// Traits.VowMinor            = new Trait( "Minor Vow", 'M', -5 );
// Traits.VowMinor.multiple = true;
// Traits.VowMajor            = new Trait( "Major Vow", 'M', -5 );
// Traits.VowMajor.multiple = true;
// Traits.VowGreat            = new Trait( "Great Vow", 'M', -5 );
// Traits.VowGreat.multiple = true;
Traits.Vow                 = new Trait( "Schwur", 'D', 'M', -5, true, "GL16" );
Traits.Vow.lowestLevel  = 1;
Traits.Vow.highestLevel = 3;
Traits.Vow.levelNames = ['Minor','Major','Great'];
Traits.Vow.instructions = 'for a Trivial Vow, create a Quirk';
// Traits.VRAddiction         = new Trait( "VR Addiction", 'D', 'M', -25, false, "CI95" );
// Traits.Vulnerability       = new Trait( "Vulnerability", 'D', 'P', -5, true, "CI106" );
// Traits.Vulnerability.exoticSprntl = 'Exotic';
// Traits.Vulnerability.levelsName = 'die';
// Traits.Vulnerability.mods = "Vulnerability";
//
// Traits.WalkonAir           = new Trait( "Walk on Air", 'A', 'P', 20, false, "CI70" );
// Traits.WalkonAir.exoticSprntl = 'Exotic';
// Traits.WalkonLiquid        = new Trait( "Walk on Liquid", 'A', 'P', 15, false, "CI70" );
// Traits.WalkonLiquid.exoticSprntl = 'Exotic';
//
// Traits.Warm                = new Trait( "Warm", 'A', 'P', 15, false, "CI73" );
// Traits.Warm.exoticSprntl = 'Exotic';
// Traits.Warm.mods = 'At Will, Natural Attack Area, Natural Attack Skill, Natural Attack IQ roll';
// Traits.WarmCheap           = new Trait( "Warm, cheap", 'A', 'P', 6, true, "CI73" );
// Traits.WarmCheap.exoticSprntl = 'Exotic';
// Traits.WarmCheap.fixedCost = 9;
// Traits.WarmCheap.lowestLevel = 1;
// Traits.WarmCheap.levelsName = '10° increase';
// Traits.WarmCheap.mods = 'At Will, Natural Attacks (Cheap), Natural Attack IQ roll';

// Traits.WeakImmuneSystem    = new Trait( "Weak Immune System", 'D', 'P', -30, false, "CI85" );
Traits.WeakWill            = new Trait( "Schwacher Wille", 'D', 'M', -8, true, "GL15" );
Traits.WeakWill.group = 'will';
// Traits.Weakness            = new Trait( "Weakness", 'D', 'P', -10, false, "CI106" );
// Traits.Weakness.exoticSprntl = 'Exotic';
// Traits.Weakness.multiple = true;
// Traits.Weakness.mods = "Weakness, Rarity";
// Traits.WeaponMaster = new Trait( "Weapon Master", 'A', 'M', 25, true, "CI32" );
// Traits.WeaponMaster.fixedCost = -5;
// Traits.WeaponMaster.lowestLevel = 1;
// Traits.WeaponMaster.description = [];
// Traits.WeaponMaster.cinematic = true;
// Traits.WeaponMaster.levelNames = ['1 weapon','all weapons',];
/* This way may make more sense, but it would require work in the Prerequisites: */
// Traits.WeaponMaster = new Trait( "Weapon Master", 'M', 20, false );
// Traits.WeaponMaster.description = 'specify a weapon';
// Traits.WeaponMaster.cinematic = true;
// Traits.WeaponMasterAllWeapons = new Trait( "Weapon Master (all weapons)", 'M', 45, false );
// Traits.WeaponMasterAllWeapons.cinematic = true;
// Traits.Webbing               = new Trait( "Webbing", 'A', 'P', 2, true, "CI71" );
// Traits.Webbing.exoticSprntl = 'Exotic';
// Traits.Webbing.fixedCost = 20;
// Traits.Webbing.levelsName = 'ST +';
// Traits.WeirdnessMagnet     = new Trait( "Weirdness Magnet", 'D', 'M', -15, false, "B3E239; CI100" );
// Traits.WeirdnessMagnet.exoticSprntl = 'Supernatural';
// Traits.Workaholic          = new Trait( "Workaholic", 'D', 'M', -5, false, "CI95" );
// Traits.WorldJumper         = new Trait( "World-Jumper", 'A', 'M', 100, false, "CI48" );
// Traits.WorldJumper.exoticSprntl = 'Supernatural';
// Traits.WorldJumper.takesConstantMods = true;
// Traits.WorldJumper.mods = "Jumper Loads, Jumper Mods, World-Jumper Mods";
// Traits.WorldSight          = new Trait( "World Sight", 'A', 'M', 10, false, "CI48" );
// Traits.WorldSight.exoticSprntl = 'Supernatural';
/* Wyrd should be re-defined as a clone of Destiny */
// Traits.Wyrd                = new Trait( "Wyrd", 'A', 'So', 0, false, "CI48, 100" );
// Traits.Wyrd.exoticSprntl = 'Supernatural';
// Traits.Wyrd.lowestLevel = -3;
// Traits.Wyrd.highestLevel = 3;
// Traits.Wyrd.mods = "Destiny";
//
// Traits.Xenophilia = new Trait( "Xenophilia", 'D', 'M', -10, true, "CI95" );
// Traits.Xenophilia.fixedCost = 5;
// Traits.Xenophilia.lowestLevel = 1;
// Traits.Xenophilia.highestLevel = 2;
//
// Traits.YinYangImbalance = new Trait( "Yin-Yang Imbalance", 'D', 'M', -5, false, "CI100" );
// Traits.YinYangImbalance.exoticSprntl = 'Supernatural';
// Traits.YinYangImbalance.mods = 'Yin-Yang';
// Traits.YinYangImbalanceYangFemale = new Trait( "Yin-Yang Imbalance (Yang-Female)", '', -10, false );
// Traits.YinYangImbalanceYangFemale.exoticSprntl = 'Supernatural';
// Traits.YinYangImbalanceYangMale = new Trait( "Yin-Yang Imbalance (Yang-Male)", '', -5, false );
// Traits.YinYangImbalanceYangMale.exoticSprntl = 'Supernatural';
// Traits.YinYangImbalanceYinFemale = new Trait( "Yin-Yang Imbalance (Yin-Female)", '', -5, false );
// Traits.YinYangImbalanceYinFemale.exoticSprntl = 'Supernatural';
// Traits.YinYangImbalanceYinMale = new Trait( "Yin-Yang Imbalance (Yin-Male)", '', -10, false );
// Traits.YinYangImbalanceYinMale.exoticSprntl = 'Supernatural';
Traits.Youth               = new Trait( "Jugend", 'D', 'P', -2, true, "GL14" );
Traits.Youth.levelsName = 'Jahre';
Traits.Youth.highestLevel = 3;

// Traits.Zeroed              = new Trait( "Zeroed", 'A', 'So', 10, false, "B3E237; CI32" );

// Wealth group
// Traits.Wealth              = new Trait( "Wealth", 'So', 10, true );
// Traits.Wealth.description = [];
// Traits.Wealth.posNegLevels = true;
// Traits.Wealth.lowestLevel = -3;
// Traits.Wealth.highestLevel = 4;
// Traits.Wealth.levelNames = ['Dead Broke','Poor','Struggling','','Comfortable','Wealthy','Very Wealthy','Filthy Rich'];
Traits.PovertyDeadBrokex0   = new Trait( "Poverty, Dead Broke", 'D', 'So', -25, false, "B3E16" );
Traits.PovertyDeadBrokex0.buttonLabel = 'Dead Broke';
Traits.PovertyDeadBrokex0.group = 'wealth';
Traits.PovertyDeadBrokex0.description = 'clothes only';
Traits.PovertyPoorx15       = new Trait( "Poverty, Poor", 'D', 'So', -15, false, "B3E16" );
Traits.PovertyPoorx15.buttonLabel = 'Poor';
Traits.PovertyPoorx15.group = 'wealth';
Traits.PovertyPoorx15.description = '⅕ starting wealth';
Traits.PovertyStrugglingx12 = new Trait( "Poverty, Struggling", 'D', 'So', -10, false, "B3E16" );
Traits.PovertyStrugglingx12.buttonLabel = 'Struggling';
Traits.PovertyStrugglingx12.group = 'wealth';
Traits.PovertyStrugglingx12.description = '½ starting wealth';
Traits.WealthComfortablex2 = new Trait( "Wealth, Comfortable", 'A', 'So', 10, false, "B3E16" );
Traits.WealthComfortablex2.buttonLabel = 'Comfortable';
Traits.WealthComfortablex2.group = 'wealth';
Traits.WealthComfortablex2.description = '2× starting wealth';
Traits.WealthComfortablex2.mods = "Wealth";
Traits.WealthWealthyx5     = new Trait( "Wealth, Wealthy", 'A', 'So', 20, false, "B3E16" );
Traits.WealthWealthyx5.buttonLabel = 'Wealthy';
Traits.WealthWealthyx5.group = 'wealth';
Traits.WealthWealthyx5.description = '5× starting wealth';
Traits.WealthWealthyx5.mods = "Wealth";
Traits.WealthVeryWealthyx20 = new Trait( "Wealth, Very Wealthy", 'A', 'So', 30, false, "B3E16" );
Traits.WealthVeryWealthyx20.buttonLabel = 'Very Wealthy';
Traits.WealthVeryWealthyx20.group = 'wealth';
Traits.WealthVeryWealthyx20.description = '20× starting wealth';
Traits.WealthFilthyRichx100 = new Trait( "Wealth, Filthy Rich", 'A', 'So', 50, false, "B3E16" );
Traits.WealthFilthyRichx100.buttonLabel = 'Filthy Rich';
Traits.WealthFilthyRichx100.group = 'wealth';
Traits.WealthFilthyRichx100.description = '100× starting wealth';
Traits.Multimillionaire    = new Trait( "Multimillionaire", 'A', 'So', 25, true, "B3E237; CI27" );
Traits.Multimillionaire.description = "for each level, multiply starting wealth x10";
Traits.Multimillionaire.levelsName = "Starting Wealth ×10";

// Psionic powers
Traits.TP = new Trait( "Telepathy", 'A', 'M', 5, true, 'B3E167' );
Traits.TP.mods = "Psi";
Traits.PsiSense = new Trait( "Psi Sense, single-skill TP", 'A', 'M', 1, true, 'B3E167' );
Traits.PsiSense.mods = "Psi";
Traits.EmotionSense = new Trait( "Emotion Sense, single-skill TP", 'A', 'M', 2, true, 'B3E167' );
Traits.EmotionSense.mods = "Psi";
Traits.Telesend = new Trait( "Telesend, single-skill TP", 'A', 'M', 3, true, 'B3E168' );
Traits.Telesend.mods = "Psi";
Traits.Telereceive = new Trait( "Telereceive, single-skill TP", 'A', 'M', 3, true, 'B3E168' );
Traits.Telereceive.mods = "Psi";
Traits.MindShield = new Trait( "Mind Shield, single-skill TP", 'A', 'M', 3, true, 'B3E169' );
Traits.MindShield.mods = "Psi";
Traits.PK = new Trait( "Psychokinesis", 'A', 'M', 5, true, 'B3E172' );
Traits.PK.mods = "Psi";
Traits.Telekinesis = new Trait( "Telekinesis, single-skill PK", 'A', 'M', 4, true, 'B3E172' );
Traits.Telekinesis.mods = "Psi";
Traits.Levitation = new Trait( "Levitation, single-skill PK", 'A', 'M', 3, true, 'B3E173' );
Traits.Levitation.mods = "Psi";
Traits.Pyrokinesis = new Trait( "Pyrokinesis, single-skill PK", 'A', 'M', 3, true, 'B3E173' );
Traits.Pyrokinesis.mods = "Psi";
Traits.Cryokinesis = new Trait( "Cryokinesis, single-skill PK", 'A', 'M', 2, true, 'B3E173' );
Traits.Cryokinesis.mods = "Psi";
Traits.PKShield = new Trait( "PK Shield, single-skill PK", 'A', 'M', 2, true, 'B3E174' );
Traits.PKShield.mods = "Psi";
Traits.ESP = new Trait( "Extra-Sensory Perception", 'A', 'M', 3, true, 'B3E174' );
Traits.ESP.mods = "Psi";
Traits.Clairvoyance = new Trait( "Clairvoyance, single-skill ESP", 'A', 'M', 2, true, 'B3E174' );
Traits.Clairvoyance.mods = "Psi";
Traits.Clairaudience = new Trait( "Clairaudience, single-skill ESP", 'A', 'M', 2, true, 'B3E174' );
Traits.Clairaudience.mods = "Psi";
Traits.Psychometry = new Trait( "Psychometry, single-skill ESP", 'A', 'M', 1, true, 'B3E174' );
Traits.Psychometry.mods = "Psi";
Traits.Precognition = new Trait( "Precognition, single-skill ESP", 'A', 'M', 2, true, 'B3E174' );
Traits.Precognition.mods = "Psi";
Traits.Teleport = new Trait( "Teleport", 'A', 'M', 5, true, 'B3E175' );
Traits.Teleport.mods = "Psi";
Traits.Antipsi = new Trait( "Antipsi", 'A', 'M', 3, true, 'B3E176' );
Traits.Antipsi.mods = "Psi";
Traits.PsiStatic = new Trait( "Psi Static, single-skill Antipsi", 'A', 'M', 2, true, 'B3E176' );
Traits.PsiStatic.mods = "Psi";
Traits.PsiHealing = new Trait( "Healing, Psi", 'A', 'M', 3, true, 'B3E175' );
Traits.PsiHealing.mods = "Psi";
// pside effects and drawbacks

for ( var t in Traits ) {
    if( !Traits[t].hasOwnProperty('key') ) Traits[t].key = t;
}

// alternate names for traits (Trait object keys will be different, so these must be defined after the add-key loop above)
Traits.Magery.copyAs("Magical Aptitude");
Traits.NoPhysicalBody.copyAs("Disembodied Brain");
Traits.ShortLifespan.copyAs("Accelerated Aging");
Traits.DamageResistance.copyAs("DR");
Traits.PassiveDefense.copyAs("PD");


var AdsGURPSLite = ['AbsoluteDirection','AcuteHearing','AcuteVision','AcuteTasteSmell','Alertness',
'Ambidexterity','AnimalEmpathy','Appearance','Charisma','ClericalInvestment','CombatReflexes',
'CommonSense','DangerSense','Daredevil','DiseaseResistant','DoubleJointed','Empathy',
'HighPainThreshold','HighTechnology1TL','HighTechnology2TL','HighTechnology3TL','ImmunitytoDisease',
'LanguageTalent','LegalEnforcementPowers','Literacy','Luck','Magery','MilitaryRank','MusicalAbility',
'NightVision','RapidHealing','Reputation','ResistanttoPoison','SingleMinded','Status','StrongWill',
'Toughness','Voice','WealthComfortablex2','WealthWealthyx5','WealthVeryWealthyx20'];

var DisadsGURPSLite = ['BadSight','BadTemper','Bully','CodeofHonor','CompulsiveBehavior','Coward',
'Duty','Fat','Gluttony','Greed','HardOfHearing','Honesty','Impulsiveness','Jealousy','Lame','Lazy',
'Miserliness','OdiousPersonalHabit','OneArm','OneEye','Overconfidence','Overweight',
'Pacifism','Phobia','Primitive','Pyromania','SenseOfDuty','Skinny','SocialStigma','Stubborn',
'Truthfulness','Vow','WeakWill','Youth','PovertyDeadBrokex0','PovertyPoorx15','PovertyStrugglingx12'];

var QuirksList = ['Abrasive', 'Acceleration Weakness', 'Aches and Pains', 'Admiration',
'Affected by Magnetism', 'Alcohol Intolerance', 'Allergy', 'Alternative Sexuality', 'Ambitious',
'Amoral', 'Appearance Change', 'Argumentative', 'Aristocratic', 'Atheist', 'Attentive', 'Bad Posture',
'Bitter', 'Blunt', 'Boring', 'Born Goon', 'Bowlegged', 'Broad-Minded', 'Bulky Frame',
'Can Be Turned By True Faith', 'Can’t Read Music', 'Cannot Float', 'Care', 'Careful planner',
'Careful', 'Carries backup weapons', 'Chauvinistic', 'Checkered Past', 'Cheerful', 'Clean freak',
'Clumsy Runner', 'Code of Honor', 'Cold Intolerance', 'Collector', 'College Incompetence', 'Combat Hesitancy',
'Complicated', 'Compulsion', 'Congenial', 'Cooperative', 'Cosmetic Eyeglasses', 'Credulous', 'Crude',
'Cruel', 'Crush', 'Cyclothymic', 'Cynical', 'Daily Ritual', 'Damned', 'Dead Giveaway', 'Dead Weight',
'Decisive', 'Delusion', 'Delusional Competence', 'Depressing', 'Desirous', 'Determined',
'Disadvantage Embellishment', 'Disciplined', 'Dishonest Face', 'Dislike', 'Dislikes haste', 'Disorganized',
'Distinctive Features', 'Distinctive Speech', 'Distractible', 'Docile', 'Doesn’t trust banks', 'Dorky',
'Dreamer', 'Dual Identity', 'Dull', 'Dull Taste or Smell,', 'Dweeby', 'Easily Frustrated', 'Easily Influenced',
'Easily Mistaken Sex', 'Easily Suppressed Disadvantage', 'Easily Winded', 'Eavesdropper', 'Enthusiastic',
'Epicure', 'Epitome', 'Expensive Habit', 'Expression', 'External Mood Influence', 'Extra Drawback',
'Extremely Limited Disadvantage', 'Extrovert', 'Faithless', 'False Memory', 'Fashion Disaster',
'Fast Talker', 'Fatalistic', 'Fatigues Easily Under Loads', 'Favor Owed', 'Fickle', 'Flirtatious',
'Forbidden Word', 'Forgetful', 'Former Alcoholic', 'Foul-Mouthed', 'Friendly', 'Friendly Drunk',
'Gallant', 'Glimpses of Clarity', 'Gloating', 'Grudge', 'Habit', 'Hated by', 'Heat Intolerance',
'Hedonist', 'Hero Worship', 'High-Frequency Hearing Loss', 'High-Pressure Intolerance',
'High Rejection Threshold', 'Hoarder', 'Horrible Hangovers', 'Humble', 'Hungry', 'Idealistic',
'Ignoble', 'Ill-Advised Hobby', 'Imaginative', 'Impatient', 'Inaccessible Idioms',
'Inappropriate Manner', 'Incompetence', 'Insensitive', 'Interviews Badly', 'Involuntary Ability Use',
'Involuntary Utterance', 'Ironic', 'Jovial', 'Layabout', 'Lazy Skill', 'Legalistic', 'Like',
'Limited Colorblindness', 'Limited Hearing Loss', 'Literal-Minded', 'Loud Voice',
'Low-Frequency Hearing Loss', 'Low-Pressure Intolerance', 'Martial', 'Math-Shy', 'Melancholy',
'Methodical', 'Mild Dyslexia', 'Mind-Numbing Magnetism', 'Minor Addiction', 'Minor Alcoholism',
'Minor Handicap', 'Mirror-Image Disadvantages', 'Missing Disadvantage', 'Missing Teeth',
'Missing Toes', 'Mitigated Disadvantage', 'Mouthy', 'Name-Bound', 'Nano-Fever', 'Nerdy',
'Nervous Stomach', 'Neutered', 'Never raises voice', 'Nostalgic', 'Nosy', 'Obsession', 'Obvious',
'Oily', 'Optimistic', 'Outgoing', 'Overcautious Habit', 'Overspecialization', 'Overweight',
'Pain-Sensitive', 'Pensive', 'Perfectionist', 'Persistent', 'Personality Change', 'Pessimistic',
'Philosophical', 'Phony', 'Photosensitivity', 'Playful', 'Poor Night Vision', 'Posh',
'Positive Secret', 'Practical Joker', 'Precise', 'Preferred Looks', 'Preferred Tactics',
'Pressure Intolerance', 'Pretense', 'Prickly', 'Proud', 'Pushy', 'Record-Keeper', 'Red Tape',
'Religious', 'Residual Personality', 'Responsible', 'Responsive', 'Restless Sleeper',
'Restricted Casting Style', 'Risk-Taking Behavior', 'Romantic', 'Rule of 15', 'Rules Exclusion',
'Salacious', 'Sanctimonious', 'Sarcastic', 'Scornful', 'Scummy', 'Secret Powers', 'Secretive',
'Self-Imposed Limit', 'Sensualist', 'Serious', 'Sexless', 'Shaky Hands',
'Sharpens weapons at every opportunity', 'Shocking Affectation', 'Show-Off', 'Skimpy dresser',
'Sleep of the Dead', 'Sleeptalker', 'Sleepy Drinker', 'Sleepyhead', 'Slightly Unusual Biochemistry',
'Slow Reflexes', 'Smug', 'Soft Spot', 'Speech Mannerisms', 'Spell Signature', 'Spell Susceptibility',
'Staid', 'Stereotype', 'Strikes with precision, not speed', 'Substance Intolerance',
'Sunburns Easily', 'Supernatural Dislike', 'Superstition', 'Susceptible to', 'Suspicious', 'Sybarite',
'Symbol-Shy', 'Taboo Traits', 'Tactless', 'Talkative', 'Tattletale', 'Taunting',
'Temperature Intolerance', 'Tests Positive for', 'Thin Skull', 'Third Person', 'Time-Server',
'Timid', 'Tiny Hands', 'Token', 'Tone-Deaf', 'Trademark', 'Treacherous', 'Trivial Destiny',
'Trivial Reputation', 'Trivial Secret', 'Twitchy', 'Unbelievable at', 'Uncongenial', 'Ungentlemanly',
'Unimaginative', 'Unwelcome Accessory', 'Variable Quirk', 'Villain-Worshipper', 'Vindictive', 'Vow',
'Willful Ignorance', 'Wishy-Washy', 'Won’t carry a load'];


/****  Modifiers  ****/
var Modifiers = {};
Modifiers.Ablative = [
    [
        { text: "Ablative", mod: -15, type: 'enhanceLimit' }
    ]
];
Modifiers.Absorption = [
    [
        { text: "Prevalence: Everything", mod:   1, type: 'multiplier' },
        { text: "Prevalence: Common",     mod: '5/6', type: 'multiplier' },
        { text: "Prevalence: Occasional", mod: '2/3', type: 'multiplier' },
        { text: "Prevalence: Rare",       mod: '1/3', type: 'multiplier' },
        { text: "Prevalence: Very Rare",  mod: '1/6', type: 'multiplier' }
    ],
    [
        { text: "Points can only improve [one power or attribute: edit]", mod: -20, type: 'enhanceLimit' }
    ]
];
Modifiers.Addiction = [
    [
//         { text: "Cheap: ≤ $20/day",           mod:  -5, type: 'constantMod', required: true },
//         { text: "Expensive: $21-$100/day",    mod: -10, type: 'constantMod' },
//         { text: "Very Expensive: > $100/day", mod: -20, type: 'constantMod' },
        { text: "Expensive: $21-$100/day",    mod:  -5, type: 'constantMod' },
        { text: "Very Expensive: > $100/day", mod: -15, type: 'constantMod' }
    ],
    [
        { text: "Incapacitating/Hallucinogenic", mod: -10, type: 'constantMod' },
    ],
    [
        { text:  "Highly Addictive", mod:  -5, type: 'constantMod' },
        { text: "Totally Addictive", mod: -10, type: 'constantMod' }
    ]
];
Modifiers.Allies = [
	[
		{ text: "Special Abilities (5 to 10)", mod: 5, type: 'constantMod' }
	],
// 	[
// 		{ text: "Unwilling; members are +25 points", mod: 0, type: 'constantMod' }
// 	]
];
Modifiers.AllyGroup = [
	[
		{ text: "100-point members", mod: 10, type: 'constantMod' }
	],
	[
		{ text: "Unwilling; members are +25 points", mod: 0, type: 'constantMod' }
	]
];
Modifiers.altID = [
	[
		{ text: "legal (prereq: ≥10 pts in Legal Enforcement Powers)", mod: -10, type: 'constantMod' }
	]
];
Modifiers.Arms = [
	[
    { text: "Short", mod: -50, type: 'enhanceLimit' },
		{ text: "Long (+100% per hex extra reach)", mod: 100, type: 'enhanceLimit' }
	],
	[
		{ text: "Non-striker", mod: -50, type: 'enhanceLimit' }
	]
];
/*
Modifiers.Arms = [
    [
        { text: "Extra-Flexible", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Foot Manipulator", mod: -30, type: 'enhanceLimit' }
    ],
    [
        { text: "No Physical Attack", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Weapon Mount", mod: -80, type: 'enhanceLimit' },
        { text: "Long, +1 SM", mod: 100, type: 'enhanceLimit', levels: true },
        { text: "Short", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Weak, ½ ST", mod: -25, type: 'enhanceLimit' },
        { text: "Weak, ¼ ST", mod: -50, type: 'enhanceLimit' }
    ]
];
*/
Modifiers.AtWill = [
	[
		{ text: "At Will", mod: 10, type: 'enhanceLimit' }
	]
];
Modifiers.AtavismAttackFrequency = [
	[
		{ text: "Frequency: Common",   mod:   1, type: 'multiplier' },
		{ text: "Frequency: Uncommon", mod: '1/2', type: 'multiplier' },
		{ text: "Frequency: Rare",     mod: '1/4', type: 'multiplier' }
	]
];
Modifiers.BiteDamage = [
	[
		{ text: "Additional damage (+1)", mod: "5/+5", type: 'constantMod' }
	]
];
// Modifiers.Blessed = [
// 	[
// 		{ text: "Divination", mod: 0, type: 'constantMod' },
// 		{ text: "Very Blessed (Divination +5)", mod: 10, type: 'constantMod' },
// 		{ text: "Heroic Feats (ST)", mod: 0, type: 'constantMod' },
// 		{ text: "Heroic Feats (DX)", mod: 0, type: 'constantMod' },
// 		{ text: "Heroic Feats (HT)", mod: 0, type: 'constantMod' }
// 	]
// ];
Modifiers.BodyofAir = [
    [
        { text: "Unswitchable", mod: -80, type: 'constantMod' }
    ]
];
Modifiers.BodyofEarth = [
    [
        { text: "Unswitchable", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.BodyofFire = [
    [
        { text: "Unswitchable", mod: -40, type: 'enhanceLimit' }
    ]
];
Modifiers.BodyofIce = [
    [
        { text: "Unswitchable", mod: -60, type: 'enhanceLimit' }
    ]
];
Modifiers.BodyofMetal = [
    [
        { text: "Non-ferrous", mod: 10, type: 'enhanceLimit' }
    ],
    [
        { text: "Amorphous", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Unswitchable", mod: -20, type: 'enhanceLimit' }
    ]
];
Modifiers.BodyofStone = [
    [
        { text: "Amorphous", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Unswitchable", mod: -25, type: 'enhanceLimit' }
    ]
];
Modifiers.BodyofWater = [
    [
        { text: "Unswitchable", mod: -60, type: 'constantMod' }
    ]
];
Modifiers.Bouncing = [
	[
		{ text: "No Super Jump", mod: -25, type: 'enhanceLimit' }
	]
];
Modifiers.Broadcast = [
	[
		{ text: "Video Broadcast", mod: 40, type: 'enhanceLimit' }
	]
];
Modifiers.Carousing = [
	[
		{ text: "Puritanical setting", mod: -5, type: 'constantMod' }
	]
];
Modifiers.CarryObjects = [
    [
      { text: "Affects Carried Objects up to No encumbrance",     mod:  10, type: 'enhanceLimit' },
      { text: "Affects Carried Objects up to Light encumbrance",  mod:  20, type: 'enhanceLimit' },
      { text: "Affects Carried Objects up to Medium encumbrance", mod:  50, type: 'enhanceLimit' },
      { text: "Affects Carried Objects up to Heavy encumbrance",  mod: 100, type: 'enhanceLimit' }
    ]
];
Modifiers.Chameleon = [
	[
		{ text: "Cannot turn off", mod: -5, type: 'constantMod' }
	]
];
Modifiers.Claws = [
	[
		{ text: "sharp", mod: 10, type: 'constantMod' },
		{ text: "talons", mod: 25, type: 'constantMod' },
		{ text: "long talons", mod: 40, type: 'constantMod' }
	]
];
Modifiers.Clinging = [
	[
		{ text: "Only one Substance: Common", mod: -30, type: 'enhanceLimit' },
		{ text: "Only one Substance: Rare",   mod: -50, type: 'enhanceLimit' }
	]
];
Modifiers.ClericalMagic = [
	[
		{ text: "Can cast spells: 1 College  or ≤10 spells (specify)", mod: 10, type: 'constantMod' },
		{ text: "Can cast spells: 2 Colleges or ≤25 spells (specify)", mod: 12, type: 'constantMod' },
		{ text: "Can cast spells: 3 Colleges or ≤40 spells (specify)", mod: 15, type: 'constantMod' }
	],
	[
		{ text: "Spell skill bonus: +1", mod:  5, type: 'constantMod' },
		{ text: "Spell skill bonus: +2", mod: 10, type: 'constantMod' },
		{ text: "Spell skill bonus: +3", mod: 15, type: 'constantMod' },
		{ text: "Healing Spell skill bonus: +1", mod: 2, type: 'constantMod' },
		{ text: "Healing Spell skill bonus: +2", mod: 4, type: 'constantMod' },
		{ text: "Healing Spell skill bonus: +3", mod: 6, type: 'constantMod' }
	],
	[
		{ text: "Associated Vow (specify; mod may be worth -2 to -5)", mod: -2, type: 'constantMod' },
	]
];
Modifiers.DarkVision = [
	[
		{ text: "Can see colors in the dark", mod: 20, type: 'enhanceLimit' }
	]
];
Modifiers.Dependency = [
	[
		{ text: "Availability: Rare",       mod: -30, type: 'constantMod' },
		{ text: "Availability: Infrequent", mod: -20, type: 'constantMod' },
		{ text: "Availability: Occasional", mod: -10, type: 'constantMod' },
		{ text: "Availability: Common",     mod:  -5, type: 'constantMod', required: true }
	],
	[
		{ text: "Aging: 2 years / HT lost", mod: -10, type: 'constantMod' }
	],
	[
    { text: "Frequency: Constantly (1 HT/min)",    mod:   5,    type: 'multiplier' },
    { text: "Frequency: Hourly (1 HT/10 mins)",    mod:   4,    type: 'multiplier' },
    { text: "Frequency: Daily (1 HT/hr)",          mod:   3,    type: 'multiplier' },
    { text: "Frequency: Weekly (1 HT/6 hrs)",      mod:   2,    type: 'multiplier' },
    { text: "Frequency: Monthly (1 HT/day)",       mod:   1,    type: 'multiplier', required: true }
	],
	[
		{ text: "Only affects super-powers", mod: 1/2, type: 'multiplier' }
	]
];
Modifiers.Dependent = [
    [
        { text: "Point Value: 26-50",   mod:   0, type: 'constantMod', required: true },
        { text: "Point Value: 1-25",    mod:  -6, type: 'constantMod' },
        { text: "Point Value: ≤ 0 pts", mod: -10, type: 'constantMod' },
    ],
    [
        { text: "Employer/Acquaintance", mod: '1/2', type: 'multiplier' },
        { text: "Friend",    mod: 1, type: 'multiplier', required: true },
        { text: "Loved One", mod: 2, type: 'multiplier' }
    ]
];
Modifiers.Divine = [
	[
		{ text: "Minor Deity", mod: -5, type: 'constantMod' }
	],
	[
		{ text: "Higher Favor", mod: 1, type: 'constantMod', levels: true, highestLevel: 5 }
	],
	[
		{ text: "Lower Favor", mod: -1, type: 'constantMod', levels: true, highestLevel: 5 }
	]
];
Modifiers.DR = [
	[
    { text: "Prevalence: Everything", mod:      1, type: 'multiplier' },
    { text: "Prevalence: Common",     mod:  '2/3', type: 'multiplier' },
    { text: "Prevalence: Occasional", mod:  '1/3', type: 'multiplier' },
    { text: "Prevalence: Rare",       mod:  '1/6', type: 'multiplier' },
    { text: "Prevalence: Very Rare",  mod: '1/12', type: 'multiplier' }
	]
];
Modifiers.Dread = [
	[
		{ text: "Temporarily broken if carried in by an outside force", mod: '1/2', type: 'multiplier' }
	]
];
Modifiers.Duplication = [
	[
		{ text: "Dupes in telepathic contact", mod: '4/3', type: 'multiplier' }
	],
	[
		{ text: "Other Dupes not stunned if a Dupe is killed or hurt", mod: 20, type: 'enhanceLimit' }
	],
	[
		{ text: "Health divided among Dupes", mod: -40, type: 'enhanceLimit' }
	]
];
Modifiers.Duty = [
	[
		{ text: "Extremely Hazardous", mod: -5, type: 'constantMod' },
		{ text: "Not Life Threatening", mod: 5, type: 'constantMod' }
	],
	[
		{ text: "Involuntary", mod: -5, type: 'constantMod' }
	]
];
Modifiers.Enemy = [
//   [
//     { text: "single 50-pt person",       mod:  -5, type: 'constantMod' },
//     { text: "single 100-pt person",      mod: -10, type: 'constantMod' },
//     { text: "group of 3-5 avg people",   mod: -10, type: 'constantMod' },
//     { text: "group of 6-20 people",      mod: -20, type: 'constantMod' },
//     { text: "group of 20-1000 people",   mod: -30, type: 'constantMod' },
//     { text: "group w/ powerful members", mod: -30, type: 'constantMod' },
//     { text: "formidable group",          mod: -40, type: 'constantMod' }
//   ],
	[
		{ text: "Unknown Enemy", mod: -5, type: 'constantMod' }
	]
];
Modifiers.EnhancedTime = [
	[
		{ text: "Psionics Instantaneous", mod: 15, type: 'constantMod' }
	]
];
Modifiers.EvilTwin = [
	[
		{ text: "Same Power", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Slightly More Powerful", mod: -15, type: 'constantMod' }
	],
	[
		{ text: "Much More Powerful", mod: -20, type: 'constantMod' }
	]
];
Modifiers.ExtinctForm = [
    [
        { text: "extinct species", mod: 50, type: 'constantMod' }
    ]
];
Modifiers.Eyestalks = [
	[
		{ text: "Eyestalks", mod: -20, type: 'enhanceLimit' }
	]
];
Modifiers.Faith = [
	[
		{ text: "Asceticism", mod: -15, type: 'constantMod' }
	],
	[
		{ text: "Iconism", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Monasticism", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Mysticism", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Ritualism", mod: -5, type: 'constantMod' }
	]
];
Modifiers.FamLimit = [
	[
		{ text: "Limited Range (100 yds)", mod: '1/2', type: 'multiplier' }
	],
	[
		{ text: "Limited Time (specify what fraction of the day)", mod: '1/2', type: 'multiplier' }
	],
	[
		{ text: "Erratic Powers: Occasionally (8 or less)",   mod: '1/3', type: 'multiplier' },
		{ text: "Erratic Powers: Half the Time (10 or less)", mod: '1/2', type: 'multiplier' },
		{ text: "Erratic Powers: Quite Often (12 or less)",   mod: '3/4', type: 'multiplier' }
	]
];
Modifiers.FamNature = [
	[
		{ text: "Extra Fatigue", mod: 3, type: 'constantMod', levels: true }
	],
	[
		{ text: "Rider Within", mod: 5, type: 'constantMod' }
	],
	[
		{ text: "Special Ability (specify; cost per ability)", mod: 0, type: 'constantMod' }
	],
	[
		{ text: "Shapeshifting", mod: 5, type: 'constantMod', levels: true }
	],
	[
		{ text: "Intelligent (+5/IQ above 6)", mod: 5, type: 'constantMod', levels: true },
		{ text: "Demonic (-5 at IQ 7, + -10/IQ above 7, max IQ 10)", mod: -5, type: 'constantMod', levels: true }
	],
	[
		{ text: "Speech: Mental", mod:  5, type: 'constantMod' }
	],
	[
		{ text: "Speech: Actual", mod: 10, type: 'constantMod' }
	],
	[
		{ text: "Nine Lives (feline familiars only!)", mod: 5, type: 'constantMod' }
	],
	[
		{ text: "Wounds affect Mage", mod: -15, type: 'constantMod' }
	]
];
Modifiers.Fanaticism = [
	[
		{ text: "Extreme (+3 Will rolls; ready to die for cause)", mod: 0, type: 'constantMod' }
	]
];
Modifiers.Fatigue = [
	[
		{ text: "Only for Magic and Psionics", mod: '1/3', type: 'multiplier' }
	]
];
Modifiers.Favor = [
	[
		{ text: "Favor", mod: '1/5', type: 'multiplier' }
	]
];
Modifiers.Flashbacks = [
	[
		{ text: "Severity: 2d seconds, -2 to rolls", mod:  -5, type: 'constantMod', required: true },
		{ text: "Severity: 1d minutes, -5 to rolls", mod: -10, type: 'constantMod' },
		{ text: "Severity: 3d minutes, complete",    mod: -20, type: 'constantMod' }
	]
];
Modifiers.Flex = [
	[
		{ text: "Single limb only", mod: -5, type: 'constantMod' }
	]
];
Modifiers.Flight = [
	[
		{ text: "Wings: Large", mod: -25, type: 'enhanceLimit' },
		{ text: "Wings: Small", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Gliding", mod: -50, type: 'enhanceLimit' },
		{ text: "Gliding: Controlled", mod: -45, type: 'enhanceLimit' },
		{ text: "Cannot Hover", mod: -15, type: 'enhanceLimit' }
	],
	[
		{ text: "Low Ceiling: 30 ft", mod: -10, type: 'enhanceLimit' },
		{ text: "Low Ceiling: 10 ft", mod: -20, type: 'enhanceLimit' },
		{ text: "Low Ceiling: 5 ft",  mod: -25, type: 'enhanceLimit' }
	]
];
Modifiers.Frequency = [
	[
		{ text: "Frequency: Almost all the time (15 or less)", mod: 3, type: 'multiplier' },
		{ text: "Frequency: Quite often (12 or less)", mod: 2, type: 'multiplier' },
		{ text: "Frequency: Fairly often (9 or less)", mod: 1, type: 'multiplier', required: true },
		{ text: "Frequency: Rarely (6 or less)", mod: '1/2', type: 'multiplier' }
	]
];
Modifiers.FrequencyBaseCost = [
  [
    { text: "Frequency: Almost All the Time (15 or less)", mod: -15, type: 'constantMod' },
    { text: "Frequency: Quite Often (12 or less)", mod: -10, type: 'constantMod' },
    { text: "Frequency: Fairly Often (9 or less)", mod: -5, type: 'constantMod', required: true },
    { text: "Frequency: Occasionally (6 or less)", mod: -2, type: 'constantMod' }
  ]
];
Modifiers.Growth = [
	[
		{ text: "Maximum Size Only", mod: -40, type: 'enhanceLimit' }
	]
];
Modifiers.Hardened = [
	[
		{ text: "Hardened", mod: "+30%/+30", type: 'enhanceLimit' }
	]
];
Modifiers.Healing = [
	[
		{ text: "Own Race Only", mod: -20, type: 'enhanceLimit' }
	],
	[
		{ text: "Xenohealing (All members of your biological order)", mod:  20, type: 'enhanceLimit' },
		{ text: "Xenohealing (All life on your planet)",              mod:  40, type: 'enhanceLimit' },
		{ text: "Xenohealing (All life with similar chemistry)",      mod:  60, type: 'enhanceLimit' },
		{ text: "Xenohealing (Anything alive)",                       mod:  80, type: 'enhanceLimit' },
		{ text: "Xenohealing (Anything animate)",                     mod: 100, type: 'enhanceLimit' }
	]
];
Modifiers.Hibernation = [
	[
		{ text: "Hibernation", mod: -50, type: 'enhanceLimit' }
	]
];
Modifiers.Hyperflight = [
	[
		{ text: "1 LY/day/level of Super Flight", mod: 25, type: 'constantMod' },
	],
	[
		{ text: "You can Maneuver", mod: 10, type: 'enhanceLimit' },
		{ text: "Cannot Clearly Navigate", mod: -30, type: 'enhanceLimit' }
	]
];
Modifiers.InconvenientSize = [
	[
		{ text: "Over 8 feet", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "under 2 feet", mod: -15, type: 'constantMod' }
	],
	[
		{ text: "Over 1000 pounds", mod: -10, type: 'constantMod' }
	]
];
Modifiers.Injury = [
	[
		{ text: "No Blood",  mod: 5, type: 'constantMod' }
	],
	[
		{ text: "No Brain",  mod: 5, type: 'constantMod' }
	],
	[
		{ text: "No Cutting Bonus", mod: 20, type: 'constantMod' },
		{ text: "No Impaling Bonus", mod: 20, type: 'constantMod' },
		{ text: "No Cutting or Impaling Bonus", mod: 30, type: 'constantMod' }
	],
	[
		{ text: "No Neck",   mod: 5, type: 'constantMod' }
	],
	[
		{ text: "No Vitals", mod: 5, type: 'constantMod' }
	]
];
Modifiers.Innumerate = [
	[
		{ text: "non-tech setting (quirk)", mod:  4, type: 'constantMod' },
		{ text: "highly technical setting", mod: -5, type: 'constantMod' }
	]
];
Modifiers.Insubstantiality = [
	[
		{ text: "Partial Insubstantiality: Self Only", mod: 20, type: 'enhanceLimit' },
		{ text: "Partial Insubstantiality: Self & Objects Carried", mod: 100, type: 'enhanceLimit' }
	],
	[
		{ text: "Abilities can affect substantial world", mod: 100, type: 'enhanceLimit' }
	],
	[
		{ text: "Always On", mod: -50, type: 'enhanceLimit' }
	]
];
Modifiers.Invisibility = [
	[
		{ text: "Invisible to (other vision type)", mod: 20, type: 'enhanceLimit' }
	],
	[
		{ text: "Can be seen in mirrors", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Cast a shadow", mod: -10, type: 'enhanceLimit' }
	]
];
Modifiers.Invulnerability = [
	[
    { text: "Any Kinetic Damage",                mod:   1, type: 'multiplier' },
    { text: "Common Attack Type (specify)",      mod: '1/2', type: 'multiplier' },
    { text: "Occassional Attack Type (specify)", mod: '1/3', type: 'multiplier', required: true },
    { text: "Rare Attack Type (specify)",        mod: '1/4', type: 'multiplier' },
    { text: "Very Rare Attack Type (specify)",   mod: '1/6', type: 'multiplier' }
	],
	[
		{ text: "The Attack Does Not Cause Knockback", mod: 20, type: 'enhanceLimit' }
	]
];
Modifiers.JumperMods = [
	[
		{ text: "Teleport Jump", mod: 10, type: 'constantMod' }
	],
	[
		{ text: "Drift", mod: -15, type: 'constantMod' }
	],
	[
		{ text: "Stunning", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Uncontrollable", mod: -10, type: 'constantMod' }
	]
];
Modifiers.JumperLoads = [
	[
		{ text: "Load: Naked",                                mod: -10, type: 'constantMod' },
		{ text: "Load: No 'Encumbrance' (IQ-based)",          mod:   0, type: 'constantMod', required: true },
		{ text: "Load: Light 'Encumbrance' (IQ-based)",       mod:  10, type: 'constantMod' },
		{ text: "Load: Medium 'Encumbrance' (IQ-based)",      mod:  20, type: 'constantMod' },
		{ text: "Load: Heavy 'Encumbrance' (IQ-based)",       mod:  30, type: 'constantMod' },
		{ text: "Load: Extra-Heavy 'Encumbrance' (IQ-based)", mod:  50, type: 'constantMod' }
	]
];
Modifiers.Laser = [
	[
		{ text: "Can be defocused for Flash", mod: 25, type: 'enhanceLimit' }
	],
	[
		{ text: "Use as weapon costs 2 fatigue", mod: -10, type: 'enhanceLimit', levels: true }
	]
];
Modifiers.LeaveTunnel = [
	[
		{ text: "You leave a tunnel at will", mod: 40, type: 'enhanceLimit' }
	]
];
Modifiers.Legality = [
    [
//        { text: "Legal",   mod:  0, type: 'constantMod', required: true },
        { text: "Illegal", mod: -5, type: 'constantMod' }
    ]
];
Modifiers.Legs = [
	[
		{ text: "Cannot Kick", mod: -5, type: 'constantMod' }
	],
	[
		{ text: "Long Legs: Extra hex of reach", mod: "10/+10", type: 'constantMod' }
	]
];
Modifiers.LifeSupport = [
	[
		{ text: "Extra Food", mod: -10, type: 'constantMod', levels:true }
	],
	[
		{ text: "Special Pressure", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Temperature: >200° F", mod: -10, type: 'constantMod' },
		{ text: "Temperature: <0° F",   mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Radioactive", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Massive; per extra ton", mod: -10, type: 'constantMod', levels:true }
	]
];
Modifiers.LimitedUse = [
    [
        { text: "Limited Use: 1 per day",   mod: -40, type: 'enhanceLimit' },
        { text: "Limited Use: 2 per day",   mod: -30, type: 'enhanceLimit' },
        { text: "Limited Use: 3-4 per day", mod: -20, type: 'enhanceLimit' },
        { text: "Limited Use: 5-6 per day", mod: -10, type: 'enhanceLimit' }
    ],
];
Modifiers.LiteracyNorms = [
  [
    { text: "Illiteracy norm",    mod:   0, type: 'constantMod' },
    { text: "Semi-Literacy norm", mod:  -5, type: 'constantMod', required: true },
    { text: "Literacy norm",      mod: -10, type: 'constantMod' }
  ]
];
Modifiers.LowTech = [
  [
    { text: "TL <5", mod: -5, type: 'constantMod' }
  ]
];
Modifiers.Mana = [
	[
		{ text: "Turn On/Off", mod: 100, type: 'enhanceLimit' }
	],
	[
		{ text: "each extra level of change in Mana level", mod: "+100%/+100", type: 'enhanceLimit', levels: true }
	]
];
Modifiers.MatterSurfing = [
	[
		{ text: "Track does not vanish immediately", mod: -10, type: 'enhanceLimit' },
	],
	[
		{ text: "Track does 1d damage every other turn", mod: 40, type: 'enhanceLimit' },
	],
	[
		{ text: "Fly at any height", mod: 33, type: 'enhanceLimit' },
		{ text: "Any-height track that will land you while unconscious", mod: 50, type: 'enhanceLimit' }
	]
];
Modifiers.Mindshare = [
	[
		{ text: "Link: Hive Mind", mod: 20, type: 'constantMod', required: true },
		{ text: "Link: Racial Memory", mod: 40, type: 'constantMod' },
		{ text: "Link: Global Consciousness", mod: 60, type: 'constantMod' }
	],
	[
		{ text: "Drone: Mindless",    mod: -10, type: 'constantMod', required: true },
		{ text: "Drone: Maintenance", mod:   5, type: 'constantMod' },
		{ text: "Drone: Defense",     mod:  15, type: 'constantMod' },
		{ text: "Drone: Intelligent", mod:  25, type: 'constantMod' }
	],
	[
		{ text: "Distance: Touch",           mod: -15, type: 'constantMod' },
		{ text: "Distance: 1 mile",          mod:   0, type: 'constantMod', required: true },
		{ text: "Distance: 100 miles",       mod:  10, type: 'constantMod' },
		{ text: "Distance: 1000 miles",      mod:  20, type: 'constantMod' },
		{ text: "Distance: Planet-wide",     mod:  30, type: 'constantMod' },
		{ text: "Distance: System-wide",     mod:  40, type: 'constantMod' },
		{ text: "Distance: Galaxy-wide",     mod:  50, type: 'constantMod' },
		{ text: "Distance: Universal",       mod:  60, type: 'constantMod' },
		{ text: "Distance: Multi-universal", mod:  75, type: 'constantMod' }
	],
	[
		{ text: "Number of Drones: 2-9", mod: -10, type: 'constantMod' },
		{ text: "Number of Drones: 10-99", mod: 0, type: 'constantMod', required: true },
		{ text: "Number of Drones: 100-999", mod: 10, type: 'constantMod' },
		{ text: "Number of Drones: 1000-9999", mod: 20, type: 'constantMod' },
		{ text: "Number of Drones: Additional powers of 10", mod: 10, type: 'constantMod' }
	],
	[
		{ text: "Detectable by non-telepathic means", mod: -20, type: 'enhanceLimit' }
	],
	[
		{ text: "Can be blocked or jammed", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Limited to the speed of light", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Normal telepathic means", mod: -10, type: 'enhanceLimit' }
	]
];
Modifiers.MultipleForms = [
    [
        { text: "Time to Change: < 1 minute", mod:   0, type: 'enhanceLimit', required: true },
        { text: "Time to Change: 1d minutes or set time up to 1 hr", mod: -20, type: 'enhanceLimit' },
        { text: "Time to Change: 1d hours or set time more than 1 hr",   mod: -40, type: 'enhanceLimit' }
    ],
    // note that these are the same as the 'Carry Objects' mods...
    [
        { text: "Absorptive Change: No Encumbrance",     mod:  10, type: 'enhanceLimit' },
        { text: "Absorptive Change: Light Encumbrance",  mod:  20, type: 'enhanceLimit' },
        { text: "Absorptive Change: Medium Encumbrance", mod:  50, type: 'enhanceLimit' },
        { text: "Absorptive Change: Heavy Encumbrance",  mod: 100, type: 'enhanceLimit' },
        { text: "Absorptive Change, bidirectional: No Encumbrance",     mod:  20, type: 'enhanceLimit' },
        { text: "Absorptive Change, bidirectional: Light Encumbrance",  mod:  40, type: 'enhanceLimit' },
        { text: "Absorptive Change, bidirectional: Medium Encumbrance", mod: 100, type: 'enhanceLimit' },
        { text: "Absorptive Change, bidirectional: Heavy Encumbrance",  mod: 200, type: 'enhanceLimit' }
    ]
];
Modifiers.NaturalAttackArea = [
    [
        { text: "+1 area increment, per 100%", mod: 100, type: 'enhanceLimit', levels: true }
    ]
];
Modifiers.NaturalAttacksCheap = [
    [
        { text: "+1 attack skill", mod: 4, type: 'constantMod', levels: true }
    ]
];
Modifiers.NaturalAttackDamage = [
    [
        { text: "+1 damage increment, per 100%", mod: 100, type: 'enhanceLimit', levels: true }
    ]
];
Modifiers.NaturalAttackDuration = [
    [
        { text: "+1 duration increment, per 100%", mod: 100, type: 'enhanceLimit', levels: true }
    ]
];
Modifiers.NaturalAttackDXroll = [
    [
        { text: "Roll <i>vs</i> max( DX + any skill bonus, 12 )", mod: 0, type: 'constantMod', required: true }
    ]
];
Modifiers.NaturalAttackInvoluntary = [
    [
        { text: "Involuntary; always on", mod: -1, type: 'multiplier' }
    ]
];
Modifiers.NaturalAttackIQroll = [
    [
        { text: "Roll <i>vs</i> max( IQ + any skill bonus, 12 )", mod: 0, type: 'constantMod', required: true }
    ]
];
Modifiers.NaturalAttackRange = [
    [
        { text: "+1 range increment, per 100%", mod: 100, type: 'enhanceLimit', levels: true }
    ]
];
Modifiers.NaturalAttackSkill = [
    [
        { text: "+1 to attack skill, per 100%", mod: 100, type: 'enhanceLimit', levels: true }
    ]
];
Modifiers.NaturalAttackSkillCheap = [
    [
        { text: "+1 attack skill", mod: 4, type: 'constantMod', levels: true }
    ]
];
Modifiers.OldTech = [
	[
		{ text: "Old Technology", mod: '1/2', type: 'multiplier', levels: true, highestLevel: 2 }
	]
];
Modifiers.Patron = [
	[
		{ text: "Supplies equipment", mod:  5, type: 'constantMod' },
		{ text: "Supplies valuable equipment", mod: 10, type: 'constantMod' }
	],
	[
		{ text: "Secret", mod: -5, type: 'constantMod' }
	],
	[
		{ text: "Unwilling", mod: -5, type: 'constantMod' }
	]
];
Modifiers.PenetratingVision = [
	[
		{ text: "Blockable: (common substance)",   mod: -30, type: 'enhanceLimit' },
		{ text: "Blockable: (uncommon substance)", mod: -20, type: 'enhanceLimit' },
		{ text: "Blockable: (single material)",    mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Only through (common substance)",   mod: -40, type: 'enhanceLimit' },
		{ text: "Only through (uncommon substance)", mod: -60, type: 'enhanceLimit' },
		{ text: "Only through (weird substance)",    mod: -80, type: 'enhanceLimit' }
	]
];
Modifiers.Phobias = [
	[
		{ text: "easily avoided", mod:   1, type: 'multiplier', required: true },
		{ text: "hard to avoid",  mod:   2, type: 'multiplier' },
		{ text: "unavoidable",    mod:   3, type: 'multiplier' },
		{ text: "ruinous",        mod:   4, type: 'multiplier' }
	]
];
Modifiers.Planetbound = [
// 	[
// 		{ text: "Time Limit: 1 Month",  mod: -40, type: 'constantMod' },
// 		{ text: "Time Limit: 3 Months", mod: -30, type: 'constantMod' },
// 		{ text: "Time Limit: 1 Year",   mod: -20, type: 'constantMod' },
// 		{ text: "Time Limit: 2 Years",  mod: -10, type: 'constantMod' }
// 	],
	[
		{ text: "Lose 1 HT per day",     mod:   2, type: 'multiplier' },
		{ text: "Lose 1 HT per week",    mod:   1, type: 'multiplier', required: true },
		{ text: "Lose 1 HT per 2 weeks", mod: '1/2', type: 'multiplier' }
	],
	[
		{ text: "'Home' planet rare but not unique", mod: '1/2', type: 'multiplier' }
	]
];
Modifiers.Pouch = [
	[
		{ text: "Diplomatic Pouch", mod: 5, type: 'constantMod' }
	]
];
Modifiers.Psi = [
    [
        { text: "Untrainable", mod: -40, type: 'enhanceLimit' },
    ],
    [
        { text: "Emergencies Only", mod: -30, type: 'enhanceLimit' },
    ],
    [
        { text: "Full Power In Emergencies Only", mod: -20, type: 'enhanceLimit' },
    ],
    [
        { text: "Uncontrollable", mod: -30, type: 'enhanceLimit' },
    ],
    [
        { text: "Fickle (5 or less)",  mod: -70, type: 'enhanceLimit' },
        { text: "Fickle (8 or less)",  mod: -30, type: 'enhanceLimit' },
        { text: "Fickle (11 or less)", mod: -20, type: 'enhanceLimit' },
        { text: "Fickle (14 or less)", mod: -10, type: 'enhanceLimit' },
    ],
    [
        { text: "Useless Under Stress", mod: -60, type: 'enhanceLimit' },
    ],
    [
        { text: "Usable Only vs. Psis (or Non-Psis)", mod: -50, type: 'enhanceLimit' },
    ],
    [
        { text: "Usable Only vs. Opposite Sex (or Own Sex)", mod: -20, type: 'enhanceLimit' },
    ],
    [
        { text: "Usable Only in Hypnotic Trance (or under Incapacitating Drugs)", mod: -30, type: 'enhanceLimit' },
    ],
    [
        { text: "Usable Only by One Side of Split Personality", mod: -40, type: 'enhanceLimit' },
    ],
    [
        { text: "Unreliable (5 or less)",  mod: -70, type: 'enhanceLimit' },
        { text: "Unreliable (8 or less)",  mod: -30, type: 'enhanceLimit' },
        { text: "Unreliable (11 or less)", mod: -20, type: 'enhanceLimit' },
        { text: "Unreliable (14 or less)", mod: -10, type: 'enhanceLimit' },
    ]
];
Modifiers.RadarSense = [
	[
		{ text: "See inside objects", mod: 40, type: 'enhanceLimit' }
	],
	[
		{ text: "See colors", mod: 20, type: 'enhanceLimit' }
	],
	[
		{ text: "Low-Res, high range (hexes become miles)", mod: 0, type: 'enhanceLimit' },
		{ text: "Imaging & Low-Res modes", mod: 50, type: 'enhanceLimit' }
	]
];
Modifiers.RankStatus = [
	[
		{ text: "Status per Rank", mod: 2, type: 'multiplier' }
	]
];
Modifiers.RankWealth = [
	[
		{ text: "Wealth per Rank", mod: 2, type: 'multiplier' }
	]
];
Modifiers.Rarity = [
	[
		{ text: "Rare", mod: '1/2', type: 'multiplier' },
		{ text: "Occasional", mod: 1, type: 'multiplier', required: true },
		{ text: "Common", mod: 2, type: 'multiplier' },
		{ text: "Very Common", mod: 3, type: 'multiplier' }
	]
];
Modifiers.Reflection = [
	[
        { text: "Prevalence: Everything", mod:   1,   type: 'multiplier' },
        { text: "Prevalence: Common",     mod: '3/4', type: 'multiplier' },
        { text: "Prevalence: Occasional", mod: '1/2', type: 'multiplier' },
        { text: "Prevalence: Rare",       mod: '1/4', type: 'multiplier' },
        { text: "Prevalence: Very Rare",  mod: '1/8', type: 'multiplier' }
	]
];
Modifiers.Regeneration = [
	[
		{ text: "Slow (1 HP / 12 hrs)",  mod:  10, type: 'constantMod', required: true },
		{ text: "Regular (1 HP/hr)",     mod:  25, type: 'constantMod' },
		{ text: "Fast (1 HP/min)",       mod:  50, type: 'constantMod' },
		{ text: "'Instant' (1 HP/turn)", mod: 100, type: 'constantMod' }
	]
];
Modifiers.Regrowth = [
	[
	  { text: "only small extremities", mod: -50, type: 'enhanceLimit' }
	]
];
Modifiers.Reliability = [
	[
		{ text: "Completely Reliable", mod:   3, type: 'multiplier' },
		{ text: "Usually Reliable",    mod:   2, type: 'multiplier' },
		{ text: "Somewhat Reliable",   mod:   1, type: 'multiplier', required: true },
		{ text: "Unreliable",          mod: '1/2', type: 'multiplier' }
	]
];
Modifiers.Reputation = [
	[
		{ text: "People: Everyone",    mod:   1, type: 'multiplier', required: true },
		{ text: "People: Large class", mod: '1/2', type: 'multiplier' },
		{ text: "People: Small class", mod: '1/3', type: 'multiplier' }
	],
	[
		{ text: "Frequency: Always", mod: 1, type: 'multiplier', required: true },
		{ text: "Frequency: Sometimes (10 or less)", mod: '1/2', type: 'multiplier' },
		{ text: "Frequency: Occasionally (7 or less)", mod: '1/3', type: 'multiplier' }
	]
];
Modifiers.Resurrection = [
	[
		{ text: "Substance Prevents Resurrection while in body (Rare)",   mod: -10, type: 'enhanceLimit' },
		{ text: "Substance Prevents Resurrection while in body (Common)", mod: -30, type: 'enhanceLimit' }
	],
	[
		{ text: "Class of Damage Cannot Be Healed (Rare)",       mod: -10, type: 'enhanceLimit' },
		{ text: "Class of Damage Cannot Be Healed (Occasional)", mod: -20, type: 'enhanceLimit' },
		{ text: "Class of Damage Cannot Be Healed( Common)",     mod: -30, type: 'enhanceLimit' }
	],
	[
		{ text: "Killed permanently by Vulnerability damage (Rare)",       mod:  -5, type: 'enhanceLimit' },
		{ text: "Killed permanently by Vulnerability damage (Occasional)", mod: -15, type: 'enhanceLimit' },
		{ text: "Killed permanently by Vulnerability damage (Common)",     mod: -25, type: 'enhanceLimit' }
	],
	[
		{ text: "Reincarnation", mod: -20, type: 'enhanceLimit' }
	]
];
Modifiers.Savage = [
	[
		{ text: "Savage behavior", mod: -5, type: 'constantMod' }
	]
];
Modifiers.SecondSight = [
	[
		{ text: "Mage discount", mod: -3, type: 'constantMod' }
	]
];
Modifiers.Secret = [
// 	[
// 		{ text: "Serious Embarrassment", mod: -5, type: 'constantMod', required: true },
// 		{ text: "Utter Rejection", mod: -10, type: 'constantMod' },
// 		{ text: "Imprisonment or Exile", mod: -20, type: 'constantMod' },
// 		{ text: "Possible Death", mod: -30, type: 'constantMod' }
// 	],
	[
		{ text: "Secret Identity", mod: 0, type: 'constantMod' },
		{ text: "Secret Identity, Status 3+", mod: -10, type: 'constantMod' }
	]
];
Modifiers.SecretCommunication = [
	[
		{ text: "Communicating cannot be perceived by other races", mod: 40, type: 'enhanceLimit' }
	],
	[
		{ text: "Only general concepts and emotions", mod: -50, type: 'enhanceLimit' }
	]
];
Modifiers.ShadowForm = [
	[
		{ text: "Unswitchable", mod: -70, type: 'constantMod' }
	]
];
Modifiers.Shapes = [
	[
		{ text: "Were-wolf",    mod: 15, type: 'constantMod', required: true },
		{ text: "Were-bear",    mod: 15, type: 'constantMod' },
		{ text: "Were-boar",    mod: 25, type: 'constantMod' },
		{ text: "Were-bull",    mod: 30, type: 'constantMod' },
		{ text: "Were-doe",     mod: 15, type: 'constantMod' },
		{ text: "Were-eagle",   mod: 20, type: 'constantMod' },
		{ text: "Were-horse",   mod: 25, type: 'constantMod' },
		{ text: "Were-leopard", mod: 30, type: 'constantMod' },
		{ text: "Were-lion",    mod: 40, type: 'constantMod' },
		{ text: "Were-snake",   mod: 10, type: 'constantMod' },
		{ text: "Were-stag",    mod: 20, type: 'constantMod' },
		{ text: "Were-tiger",   mod: 40, type: 'constantMod' }
	]
];
Modifiers.ShrinkingAD = [
	[
		{ text: "Affects Others (per person)", mod: 50, type: 'enhanceLimit' }
	],
	[
		{ text: "Retain Normal Hit Points", mod: 30, type: 'enhanceLimit' }
	],
	[
		{ text: "Damage remains normal", mod: 100, type: 'enhanceLimit' }
	],
	[
		{ text: "Levels beyond 5 (100 pts/level)", mod: 100, type: 'constantMod' }
	]
];
Modifiers.ShrinkingDI = [
	[
		{ text: "Affects Others (per person)", mod: -50, type: 'enhanceLimit' }
	],
	[
		{ text: "Retain Normal Hit Points", mod: -30, type: 'enhanceLimit' }
	],
	[
		{ text: "Damage remains normal", mod: -100, type: 'enhanceLimit' }
	],
	[
		{ text: "1 level  (1/2 height)",   mod:  -15, type: 'constantMod', required: true },
		{ text: "2 levels (1/4 height)",   mod:  -20, type: 'constantMod' },
		{ text: "3 levels (1/8 height)",   mod:  -30, type: 'constantMod' },
		{ text: "4 levels (1/16 height)",  mod:  -40, type: 'constantMod' },
		{ text: "5 levels (1/32 height)",  mod:  -50, type: 'constantMod' },
		{ text: "6 levels (1/64 height)",  mod:  -70, type: 'constantMod' },
		{ text: "7+ levels",               mod: -100, type: 'constantMod' }
	]
];
Modifiers.Sleepy = [
	[
		{ text: "sleeps 50% of the time", mod: -10, type: 'constantMod', required: true },
		{ text: "sleeps 67% of the time", mod: -20, type: 'constantMod' },
		{ text: "sleeps 75% of the time", mod: -25, type: 'constantMod' },
		{ text: "sleeps 90% of the time", mod: -35, type: 'constantMod' }
	]
];
Modifiers.Smell = [
	[
		{ text: "Detect Emotional state", mod: 50, type: 'enhanceLimit' }
	],
	[
		{ text: "Offensive Odor: Common",     mod: -50, type: 'enhanceLimit' },
		{ text: "Offensive Odor: Occasional", mod: -20, type: 'enhanceLimit' },
		{ text: "Offensive Odor: Rare",       mod: -10, type: 'enhanceLimit' }
	]
];
Modifiers.Smoke = [
	[
		{ text: "Members of race are unaffected", mod: 20, type: 'enhanceLimit' }
	]
];
Modifiers.Snatcher = [
	[
		{ text: "Weight: up to 5 pounds", mod:   0, type: 'constantMod', required: true },
		{ text: "Weight: up to 3 pounds", mod:  -5, type: 'constantMod' },
		{ text: "Weight: up to 2 pounds", mod: -10, type: 'constantMod' },
		{ text: "Weight: up to 1 pound",  mod: -15, type: 'constantMod' },
		{ text: "Weight: up to 4 ounces", mod: -20, type: 'constantMod' },
		{ text: "Weight: up to 1 ounce",  mod: -25, type: 'constantMod' }
	],
	[
		{ text: "Takes Extra Time: 1 minute",   mod:  -5, type: 'constantMod' },
		{ text: "Takes Extra Time: 5 minutes",  mod: -10, type: 'constantMod' },
		{ text: "Takes Extra Time: 30 minutes", mod: -15, type: 'constantMod' }
	],
	[
		{ text: "Specialization: Only Weapons",     mod: -10, type: 'constantMod' },
		{ text: "Specialization: Only Information", mod: -15, type: 'constantMod' },
		{ text: "Specialization: Only Money",       mod: -10, type: 'constantMod' },
		{ text: "Specialization: Only Metal",       mod:  -5, type: 'constantMod' },
		{ text: "Specialization: No Metal",         mod: -15, type: 'constantMod' },
		{ text: "Specialization: Only Blue Things", mod: -20, type: 'constantMod' }
	],
	[
		{ text: "Stunning", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Uncontrollable", mod: -20, type: 'constantMod' }
	]
];
Modifiers.SoleSpeechMode = [
	[
		{ text: "Sole mode of speech", mod: 0, type: 'multiplier' }
	]
];
Modifiers.SoleSense = [
	[
		{ text: "Sole sense of this type (vision, hearing, etc.)", mod: -5, type: 'constantMod' }
	]
];
Modifiers.SonarVision = [
	[
		{ text: "Sonar Vision is sole vision sense", mod: 0, type: 'multiplier' }
	]
];
Modifiers.SpeakUnderwater = [
	[
		{ text: "Communicate with people not in water", mod: 50, type: 'enhanceLimit' }
	]
];
Modifiers.SpeakwithAnimals = [
	[
		{ text: "Only one phylum of animal (specify mammals, birds, etc.)", mod: -20, type: 'enhanceLimit' },
		{ text: "Only one family of animal (specify felines, frogs, etc.)", mod: -30, type: 'enhanceLimit' },
		{ text: "Only one species of animal (specify)",                     mod: -50, type: 'enhanceLimit' }
	]
];
Modifiers.Strikers = [
	[
		{ text: "Reach: +1 added hex", mod: 5, type: 'constantMod', levels: true }
	]
];
Modifiers.SecretStyles = [
	[
		{ text: "secret styles too", mod: 5, type: 'constantMod' }
	]
];
Modifiers.SupsEnhancements = [
	[
		{ text: "Affects Insubstantial", mod: 20, type: 'enhanceLimit' }
	],
	[
		{ text: "Affects Others", mod: 40, type: 'enhanceLimit' }
	],
	[
		{ text: "Affects Substantial", mod: 40, type: 'enhanceLimit' }
	],
	[
		{ text: "Area Effect", mod: 50, type: 'enhanceLimit' }
	],
	[
		{ text: "Extended Duration", mod: 30, type: 'enhanceLimit' }
	],
	[
		{ text: "Increased Area", mod: 20, type: 'enhanceLimit' }
	],
	[
		{ text: "Instantaneous", mod: 20, type: 'enhanceLimit' }
	],
	[
		{ text: "Link", mod: 10, type: 'enhanceLimit' }
	],
	[
		{ text: "Movable Area", mod: 30, type: 'enhanceLimit' }
	],
	[
		{ text: "No Obvious Effect", mod: "+10%/+10", type: 'enhanceLimit' }
	],
	[
		{ text: "Reduced Fatigue Cost", mod: "+20%/+20", type: 'enhanceLimit' }
	],
	[
		{ text: "Selective Effect", mod: 50, type: 'enhanceLimit' }
	],
	[
		{ text: "Wall", mod: 30, type: 'enhanceLimit' }
	]
];
Modifiers.SupsLimitations = [
	[
		{ text: "Accessibility (Small Limitation)", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Accessibility (Medium Limitation)", mod: -20, type: 'enhanceLimit' }
	],
	[
		{ text: "Accessibility (Large Limitation)", mod: -30, type: 'enhanceLimit' }
	],
	[
		{ text: "Always On (small limitation)", mod: -20, type: 'enhanceLimit' }
	],
	[
		{ text: "Always On (large limitation)", mod: -40, type: 'enhanceLimit' }
	],
	[
		{ text: "Costs Fatigue", mod: "-5%/-5", type: 'enhanceLimit' }
	],
	[
		{ text: "Emergencies Only", mod: -30, type: 'enhanceLimit' }
	],
	[
		{ text: "Exclusivity", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Eye Contact Only", mod: -20, type: 'enhanceLimit' }
	],
	[
		{ text: "Fickle: 5 or less to work", mod: -70, type: 'enhanceLimit' },
		{ text: "Fickle: 8 or less to work", mod: -30, type: 'enhanceLimit' },
		{ text: "Fickle: 11 or less to work", mod: -20, type: 'enhanceLimit' },
		{ text: "Fickle: 14 or less to work", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Leaves Mental Signature", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Limited Use: 1 per day", mod: -40, type: 'enhanceLimit' },
		{ text: "Limited Use: 2 per day", mod: -30, type: 'enhanceLimit' },
		{ text: "Limited Use: 3-4 per day", mod: -20, type: 'enhanceLimit' },
		{ text: "Limited Use: 5-6 per day", mod: -10, type: 'enhanceLimit' }
	],
	[
		{ text: "Nuisance Effect (variable)", mod: "-5/-5", type: 'constantMod' }
	],
	[
		{ text: "Requires Preparation: 1 minute", mod: -20, type: 'enhanceLimit' },
		{ text: "Requires Preparation: 10 minutes", mod: -30, type: 'enhanceLimit' },
		{ text: "Requires Preparation: 1 hour", mod: -50, type: 'enhanceLimit' },
		{ text: "Requires Preparation: 8 hours", mod: -60, type: 'enhanceLimit' }
	],
	[
		{ text: "Weakened Without Preparation: 1 minute", mod: -10, type: 'enhanceLimit' },
		{ text: "Weakened Without Preparation: 10 minutes", mod: -15, type: 'enhanceLimit' },
		{ text: "Weakened Without Preparation: 1 hour", mod: -25, type: 'enhanceLimit' },
		{ text: "Weakened Without Preparation: 8 hours", mod: -30, type: 'enhanceLimit' }
	],
	[
		{ text: "Reduced Range", mod: "-5%/-5", type: 'enhanceLimit' }
	],
	[
		{ text: "Takes Extra Time", mod: "-10%/-10", type: 'enhanceLimit' }
	],
	[
		{ text: "Takes Recharge: 5 seconds", mod: -10, type: 'enhanceLimit' },
		{ text: "Takes Recharge: 15 seconds", mod: -20, type: 'enhanceLimit' },
		{ text: "Takes Recharge: 1 hour", mod: -30, type: 'enhanceLimit' }
	],
	[
		{ text: "Touch Only", mod: -20, type: 'enhanceLimit' }
	],
	[
		{ text: "Unconscious Only", mod: -20, type: 'enhanceLimit' }
	],
	[
		{ text: "Uncontrollable", mod: -30, type: 'enhanceLimit' }
	],
	[
		{ text: "Unreliable: 5 or less to work", mod: -70, type: 'enhanceLimit' },
		{ text: "Unreliable: 8 or less to work", mod: -30, type: 'enhanceLimit' },
		{ text: "Unreliable: 11 or less to work", mod: -20, type: 'enhanceLimit' },
		{ text: "Unreliable: 14 or less to work", mod: -10, type: 'enhanceLimit' }
	]
];
Modifiers.TakesExtraTime = [
    [
        { text: "Takes Extra Time (-10% per ×2)", mod: -10, type: 'enhanceLimit', levels: true }
    ]
];
Modifiers.TelepathicAddiction = [
    [
        { text: "Addicted to rapport with a specific person", mod: -10, type: 'constantMod' }
    ]
];
Modifiers.TimeJumperMods = [
	[
		{ text: "No Concentration", mod: 15, type: 'constantMod' }
	],
	[
		{ text: "Limited Range", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Limited Maximum Range", mod: -10, type: 'constantMod' }
	]
];
Modifiers.Timesickness = [
	[
		{ text: "Severity: Nuisance",    mod:  -2, type: 'constantMod' },
		{ text: "Severity: Mild",        mod:  -5, type: 'constantMod', required: true },
		{ text: "Severity: Severe",      mod: -10, type: 'constantMod' },
		{ text: "Severity: Very Severe", mod: -15, type: 'constantMod' },
		{ text: "Severity: Nightmare",   mod: -15, type: 'constantMod' },
		{ text: "Severity: Critical",    mod: -20, type: 'constantMod' }
	],
	[
		{ text: "Frequency: Rare",          mod: 1/2, type: 'multiplier' },
		{ text: "Frequency: Frequent",      mod:   1, type: 'multiplier', required: true },
		{ text: "Frequency: Very Frequent", mod: 3/2, type: 'multiplier' },
		{ text: "Frequency: Acute",         mod:   2, type: 'multiplier' }
	]
];
Modifiers.Tourettes = [
	[
		{ text: "Acutely Embarrassing and/or Foul Language", mod: -5, type: 'constantMod' }
	]
];
Modifiers.Unaging = [
    [
        { text: "Age in Either Direction At Will", mod: 20, type: 'enhanceLimit' }
    ]
];
Modifiers.UncontrolledChange = [
    [
        { text: "Will roll allowed", mod: '1/2', type: 'multiplier' }
    ],
	[
		{ text: "Metahuman: lose your powers", mod: -40, type: 'constantMod' }
	]
];
Modifiers.Unhealing = [
    [
        { text: "healing requires special conditions", mod:   0, type: 'constantMod', required: true },
        { text: "can never heal naturally",            mod: -10, type: 'constantMod' }
    ]
];
Modifiers.UnswitchableDisad = [
    [
        { text: "Unswitchable: No Encumbrance",     mod:  -10, type: 'enhanceLimit' },
        { text: "Unswitchable: Light Encumbrance",  mod:  -20, type: 'enhanceLimit' },
        { text: "Unswitchable: Medium Encumbrance", mod:  -50, type: 'enhanceLimit' },
        { text: "Unswitchable: Heavy Encumbrance",  mod: -100, type: 'enhanceLimit' }
    ]
];
Modifiers.VampiricMitigation = [
    [
        { text: "condition disappears after feeding",  mod: 5, type: 'constantMod' }
    ]
];
Modifiers.Venom = [
	[
		{ text: "Corrosive", mod: 0, type: 'enhanceLimit', required: true },
		{ text: "Poisonous", mod: 0, type: 'enhanceLimit' },
		{ text: "Irritant",  mod: 0, type: 'enhanceLimit' }
	],
	[
		{ text: "Contact Agent", mod: 70, type: 'enhanceLimit' }
	],
	[
		{ text: "Ranged (Squirt)", mod: 35, type: 'enhanceLimit' }
	],
	[
		{ text: "Cloud of Mist (Spray)", mod: 100, type: 'enhanceLimit' }
	],
	[
		{ text: "Sweat", mod: -70, type: 'enhanceLimit' }
	]
];
Modifiers.vision = [
    [
        { text: "correctable", mod: 15, type: 'constantMod' }
    ]
];
Modifiers.Vulnerability = [
	[
		{ text: "Very Rare",  mod: '3/5', type: 'multiplier' },
		{ text: "Rare",       mod:   1, type: 'multiplier', required: true },
		{ text: "Occasional", mod:   2, type: 'multiplier' },
		{ text: "Common",     mod:   3, type: 'multiplier' }
	],
    [
        { text: "Proximity: -10%/hex range", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Fatigue damage only", mod: '1/2', type: 'multiplier' }
    ]
];
Modifiers.Weakness = [
	[
		{ text: "1d per minute",     mod:   2, type: 'multiplier' },
		{ text: "1d per 5 minutes",  mod:   1, type: 'multiplier', required: true },
		{ text: "1d per 30 minutes", mod: '1/2', type: 'multiplier' }
	],
	[
        { text: "Fatigue damage only", mod: '1/2', type: 'multiplier' }
	]
];
Modifiers.Wealth = [
	[
		{ text: "Temporary Wealth", mod: -50, type: 'enhanceLimit' }
	]
];
Modifiers.WorldJumperMods = [
	[
		{ text: "New Worlds", mod: 50, type: 'constantMod' }
	],
	[
		{ text: "No Concentration", mod: 75, type: 'constantMod' }
	],
	[
		{ text: "Reduced Fatigue", mod: 20, type: 'constantMod' }
	],
	[
		{ text: "Cannot Escort", mod: -10, type: 'constantMod' }
	],
	[
		{ text: "Cannot Follow", mod: -20, type: 'constantMod' }
	],
	[
		{ text: "Tracking", mod: 20, type: 'constantMod' }
	]
];
Modifiers.YinYang = [
	[
		{ text: "Overbearing Yang", mod: 0, type: 'constantMod', required: true },
		{ text: "Overbearing Yin",  mod: 0, type: 'constantMod' }
	],
	[
		{ text: "gender mis-match", mod: -5, type: 'constantMod' },
	]
];

/****  Bonuses & Penalties  ****/
// Adjustments.key = { from: <sourceObject>, amount: ##, target: <adjustedObject> [, fromCategory: <objecttype; default Trait>, targetCategory: <objecttype; default Skill>, type: <*|points|?>, per: <bool, or #> ] }
Adjustments = {};
Adjustments.Accounting_from_IntuitiveMathematician = { from: 'IntuitiveMathematician', fromCategory: 'AD', amount: 5, targetCategory: 'SK', target: 'Accounting' };
Adjustments.Accounting_from_MathematicalAbility    = { from: 'MathematicalAbility',    fromCategory: 'AD', amount: 5, targetCategory: 'SK', target: 'Accounting' };
Adjustments.Acrobatics_from_BadGrip        = { from: 'BadGrip',        fromCategory: 'DI', amount: -4, targetCategory: 'SK', target: 'Acrobatics' };
Adjustments.Acrobatics_from_Brachiator     = { from: 'Brachiator',     fromCategory: 'AD', amount:  1, targetCategory: 'SK', target: 'Acrobatics', type: 'points' };
Adjustments.Acrobatics_from_PerfectBalance = { from: 'PerfectBalance', fromCategory: 'AD', amount:  1, targetCategory: 'SK', target: 'Acrobatics' };
Adjustments.Acrobatics_from_PoorGrip       = { from: 'PoorGrip',       fromCategory: 'DI', amount: -2, targetCategory: 'SK', target: 'Acrobatics' };
Adjustments.Acting_from_LowEmpathy = { from: 'LowEmpathy', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Acting' };
Adjustments.Acting_from_Shyness = { from: 'Shyness', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Acting' };
Adjustments.ActiveDefense_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', fromCategory: 'AD', amount: 1, targetCategory: 'defense', target: 'ActiveDefense' };
Adjustments.AgeAtMaturity_from_EarlyMaturation = { from: 'EarlyMaturation', fromCategory: 'AD', amount: 1/2, type: '*', target: 'AgeAtMaturity' };
Adjustments.Aging_from_ExtendedLifespan = { from: 'ExtendedLifespan', fromCategory: 'AD', amount: 2,   type: '*', target: 'Aging' };
Adjustments.Aging_from_ShortLifespan    = { from: 'ShortLifespan',    fromCategory: 'DI', amount: 3/4, type: '*', target: 'Aging' };
Adjustments.Animal_from_AnimalEmpathy = { from: 'AnimalEmpathy', fromCategory: 'AD', amount: 4, targetCategory: 'CL', target: 'AnimalSkills' };
Adjustments.Animal_from_BeastKin = { from: 'BeastKin', fromCategory: 'AD', amount: 4, targetCategory: 'CL', target: 'Animal' };
Adjustments.ArtisticSkills_from_Versatile = { from: 'Versatile', fromCategory: 'AD', amount: 1, targetCategory: 'CL', target: 'ArtisticSkills' };
Adjustments.Astrogation_from_SpatialSense3D = { from: 'SpatialSense3D', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Astrogation' };

Adjustments.Bard_from_Shyness = { from: 'Shyness', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Bard' };
Adjustments.Bard_from_Voice   = { from: 'Voice',   fromCategory: 'AD', amount:  2, targetCategory: 'SK', target: 'Bard' };
Adjustments.BeamWeapons_from_IQ10 = { from: 'IQ=10',  fromCategory: 'stats', amount: 1, targetCategory: 'SK', target: 'BeamWeapons' };
Adjustments.BeamWeapons_from_IQ11 = { from: 'IQ=11',  fromCategory: 'stats', amount: 1, targetCategory: 'SK', target: 'BeamWeapons' };
Adjustments.BeamWeapons_from_IQ12 = { from: 'IQ>=12', fromCategory: 'stats', amount: 2, targetCategory: 'SK', target: 'BeamWeapons' };
Adjustments.Blacksmith_from_ST12 = { from: 'ST=12', fromCategory: 'stats', amount: -1, targetCategory: 'SK', target: 'Blacksmith' };
Adjustments.Blacksmith_from_ST11 = { from: 'ST=11', fromCategory: 'stats', amount: -2, targetCategory: 'SK', target: 'Blacksmith' };
Adjustments.Blacksmith_from_ST10 = { from: 'ST=10', fromCategory: 'stats', amount: -3, targetCategory: 'SK', target: 'Blacksmith' };
Adjustments.Blacksmith_from_ST9  = { from: 'ST=9',  fromCategory: 'stats', amount: -4, targetCategory: 'SK', target: 'Blacksmith' };
Adjustments.Blacksmith_from_ST8  = { from: 'ST=8',  fromCategory: 'stats', amount: -5, targetCategory: 'SK', target: 'Blacksmith' };
Adjustments.Blacksmith_from_ST7  = { from: 'ST=7',  fromCategory: 'stats', amount: -6, targetCategory: 'SK', target: 'Blacksmith' };
Adjustments.Blacksmith_from_ST6  = { from: 'ST=6',  fromCategory: 'stats', amount: -7, targetCategory: 'SK', target: 'Blacksmith' };
Adjustments.Blacksmith_from_ST5  = { from: 'ST=5',  fromCategory: 'stats', amount: -8, targetCategory: 'SK', target: 'Blacksmith' };
Adjustments.BlackPowderWeapons_from_IQ10 = { from: 'IQ=10', fromCategory: 'stats', amount: 1, targetCategory: 'SK', target: 'BlackPowderWeapons' };
Adjustments.BlackPowderWeapons_from_IQ11 = { from: 'IQ=11', fromCategory: 'stats', amount: 1, targetCategory: 'SK', target: 'BlackPowderWeapons' };
Adjustments.BlackPowderWeapons_from_IQ12 = { from: 'IQ>=12', fromCategory: 'stats', amount: 2, targetCategory: 'SK', target: 'BlackPowderWeapons' };
Adjustments.BlindFighting_from_AcuteHearing = { from: 'AcuteHearing', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'BlindFighting' };
Adjustments.BlindFighting_from_Alertness = { from: 'Alertness', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'BlindFighting' };
Adjustments.Block_from_CombatReflexes    = { from: 'CombatReflexes',    fromCategory: 'AD', amount: 1, targetCategory: 'defense', target: 'Block' };
Adjustments.Block_from_EnhancedBlock     = { from: 'EnhancedBlock',     fromCategory: 'AD', amount: 1, targetCategory: 'defense', target: 'Block' };
Adjustments.Block_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', fromCategory: 'AD', amount: 1, targetCategory: 'defense', target: 'Block' };
Adjustments.Block_from_PrecognitiveParry = { from: 'PrecognitiveParry', fromCategory: 'skills', amount: 1, targetCategory: 'defense', target: 'Block', per: 1 };
Adjustments.BodySense_from_SpatialSense3D = { from: 'SpatialSense3D', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'BodySense' };
Adjustments.BodySense_from_AbsoluteDirection = { from: 'AbsoluteDirection', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'BodySense' };

Adjustments.Carousing_from_LowEmpathy = { from: 'LowEmpathy', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Carousing' };
Adjustments.Carousing_from_Shyness = { from: 'Shyness', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Carousing' };
Adjustments.Chemistry_from_ColorBlind = { from: 'ColorBlind', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Chemistry' };
Adjustments.Climbing_from_BadGrip        = { from: 'BadGrip',        fromCategory: 'DI', amount: -4, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_Brachiator     = { from: 'Brachiator',     fromCategory: 'AD', amount:  2, targetCategory: 'SK', target: 'Climbing', type: 'points' };
Adjustments.Climbing_from_DoubleJointed  = { from: 'DoubleJointed',  fromCategory: 'AD', amount:  3, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_Flexibility    = { from: 'Flexibility',    fromCategory: 'AD', amount:  5, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_Stretching     = { from: 'Stretching',     fromCategory: 'AD', amount:  5, targetCategory: 'SK', target: 'Climbing', per: false };
Adjustments.Climbing_from_PerfectBalance = { from: 'PerfectBalance', fromCategory: 'AD', amount:  1, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_PoorGrip       = { from: 'PoorGrip',       fromCategory: 'DI', amount: -2, targetCategory: 'SK', target: 'Climbing' };
Adjustments.CombatWeaponSkills_from_BadGrip = { from: 'BadGrip', fromCategory: 'DI', amount: -4, targetCategory: 'GR', target: 'CombatWeaponSkills' };
Adjustments.CombatWeaponSkills_from_PoorGrip = { from: 'PoorGrip', fromCategory: 'DI', amount: -2, targetCategory: 'GR', target: 'CombatWeaponSkills' };
Adjustments.Computer_from_IntuitiveMathematician = { from: 'IntuitiveMathematician', fromCategory: 'AD', amount: 3, targetCategory: 'GR', target: 'Computer' };
Adjustments.Computer_from_MathematicalAbility    = { from: 'MathematicalAbility',    fromCategory: 'AD', amount: 3, targetCategory: 'GR', target: 'Computer' };
Adjustments.Criminology_from_LowEmpathy = { from: 'LowEmpathy', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Criminology' };
Adjustments.Cryptanalysis_from_IntuitiveMathematician = { from: 'IntuitiveMathematician', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Cryptanalysis' };
Adjustments.Cryptanalysis_from_MathematicalAbility    = { from: 'MathematicalAbility',    fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Cryptanalysis' };
Adjustments.Cyphering_from_IntuitiveMathematician = { from: 'IntuitiveMathematician', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Cyphering' };
Adjustments.Cyphering_from_MathematicalAbility    = { from: 'MathematicalAbility',    fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Cyphering' };

Adjustments.DetectLies_from_Empathy    = { from: 'Empathy',    fromCategory: 'AD', amount:  4, targetCategory: 'SK', target: 'DetectLies' };
Adjustments.DetectLies_from_LowEmpathy = { from: 'LowEmpathy', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'DetectLies' };
Adjustments.Diplomacy_from_Shyness = { from: 'Shyness', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Diplomacy' };
Adjustments.Diplomacy_from_Voice   = { from: 'Voice',   fromCategory: 'AD', amount:  2, targetCategory: 'SK', target: 'Diplomacy' };
Adjustments.Disguise_from_Fat    = { from: 'Fat',    fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Disguise' };
Adjustments.Disguise_from_Skinny = { from: 'Skinny', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Disguise' };
Adjustments.Dodge_from_CombatReflexes    = { from: 'CombatReflexes',    fromCategory: 'AD', amount:  1, targetCategory: 'defense', target: 'Dodge' };
Adjustments.Dodge_from_EnhancedDodge     = { from: 'EnhancedDodge',     fromCategory: 'AD', amount:  1, targetCategory: 'defense', target: 'Dodge' };
Adjustments.Dodge_from_ReducedDodge      = { from: 'ReducedDodge',      fromCategory: 'AD', amount: -1, targetCategory: 'defense', target: 'Dodge' };
Adjustments.Dodge_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', fromCategory: 'AD', amount:  1, targetCategory: 'defense', target: 'Dodge' };
Adjustments.Dodge_from_PrecognitiveParry = { from: 'PrecognitiveParry', fromCategory: 'SK', amount:  1, targetCategory: 'defense', target: 'Dodge', per: 1 };
Adjustments.DR_from_Absorption        = { from: 'Absorption',        amount:  2, target: 'DR' };
Adjustments.DR_from_BodyofIce         = { from: 'BodyofIce',         amount:  5, target: 'DR' };
Adjustments.DR_from_BodyofMetal       = { from: 'BodyofMetal',       amount:  1, target: 'DR' };
Adjustments.DR_from_BodyofStone       = { from: 'BodyofStone',       amount:2/3, target: 'DR' };
// Adjustments.DR_from_Bouncing          = { from: 'Bouncing',          amount:  1, target: 'DR' };  // DR vs. crushing only
Adjustments.DR_from_DamageResistance  = { from: 'DamageResistance',  amount:  1, target: 'DR' };
Adjustments.DR_from_Fur               = { from: 'Fur',               amount:  1, target: 'DR' };
Adjustments.DR_from_FurThick          = { from: 'FurThick',          amount:  1, target: 'DR' };
Adjustments.DR_from_FurSpiny          = { from: 'FurSpiny',          amount:  1, target: 'DR' };
Adjustments.DR_from_ThickHide         = { from: 'ThickHide',         amount:  1, target: 'DR' };
// Adjustments.DR_from_IncreasedDensity  = { from: 'IncreasedDensity',  amount:  1, target: 'DR' };
Adjustments.DR_from_ScalesArmorPlates = { from: 'ScalesArmorPlates', amount:  3, target: 'DR' };
Adjustments.DR_from_Carapace          = { from: 'Carapace',          amount:  2, target: 'DR' };
Adjustments.DR_from_ScalesHeavy       = { from: 'ScalesHeavy',       amount:  1, target: 'DR' };
Adjustments.DR_from_Scales            = { from: 'Scales',            amount:  1, target: 'DR' };
Adjustments.DR_from_Toughness         = { from: 'Toughness',         amount:  1, target: 'DR' };
Adjustments.DR_from_VacuumAdaptation  = { from: 'VacuumAdaptation',  amount:  1, target: 'DR' };
Adjustments.Driving_from_ColorBlind = { from: 'ColorBlind', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Driving' };
// Adjustments.DX_from_DecreasedDX      = { from: 'DecreasedDX',      fromCategory: 'DI', amount: -1, targetCategory: 'stats', target: 'DX' };
// Adjustments.DX_from_IncreasedDX      = { from: 'IncreasedDX',      fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'DX' };
Adjustments.DX_from_RacialDXModifier = { from: 'RacialDXModifier', fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'DX' };

Adjustments.Electronics_from_Versatile = { from: 'Versatile', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'Electronics' };
Adjustments.Encumbrance_from_Fat        = { from: 'Fat',        fromCategory: 'DI', amount: 1/2, type: '*', target: 'encumbranceFromBMI' };
Adjustments.Encumbrance_from_Overweight = { from: 'Overweight', fromCategory: 'DI', amount: 0.3, type: '*', target: 'encumbranceFromBMI' };
Adjustments.Engineer_from_IntuitiveMathematician = { from: 'IntuitiveMathematician', fromCategory: 'AD', amount: 2, targetCategory: 'GR', target: 'Engineer' };
Adjustments.Engineer_from_MathematicalAbility    = { from: 'MathematicalAbility',    fromCategory: 'AD', amount: 2, targetCategory: 'GR', target: 'Engineer' };
Adjustments.Engineer_from_Versatile              = { from: 'Versatile',              fromCategory: 'AD', amount: 1, /*targetCategory: 'GR',*/ target: 'Engineer' };
Adjustments.Escape_from_DoubleJointed = { from: 'DoubleJointed', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Escape' };
Adjustments.Escape_from_Flexibility   = { from: 'Flexibility',   fromCategory: 'AD', amount: 5, targetCategory: 'SK', target: 'Escape' };
Adjustments.Escape_from_Stretching    = { from: 'Stretching',    fromCategory: 'AD', amount: 5, targetCategory: 'SK', target: 'Escape', per: false };
Adjustments.Exorcism_baseline_penalty        = { from: 'always',             fromCategory: 'stats', amount: -4, targetCategory: 'SK', target: 'Exorcism' };
Adjustments.Exorcism_from_ClericalInvestment = { from: 'ClericalInvestment', fromCategory: 'AD',    amount:  4, targetCategory: 'SK', target: 'Exorcism', per: false };

Adjustments.FastDraw_from_CombatReflexes    = { from: 'CombatReflexes',    fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'FastDraw' };
Adjustments.FastDraw_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'FastDraw' };
Adjustments.FastTalk_from_LowEmpathy     = { from: 'LowEmpathy',     fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.FastTalk_from_Shyness        = { from: 'Shyness',        fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.FastTalk_from_SubsonicSpeech = { from: 'SubsonicSpeech', fromCategory: 'AD', amount: -2, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.Faz_from_Alertness = { from: 'Alertness',  fromCategory: 'AD',  amount:  1,  targetCategory: 'sense',  target: 'Faz' };
Adjustments.FP_from_ExtraFatigue       = { from: 'ExtraFatigue',       fromCategory: 'AD', amount: 1, targetCategory: 'stats', target: 'FP' };
// Adjustments.FP_from_ExtraFatigueRacial = { from: 'ExtraFatigueRacial', fromCategory: 'AD', amount: 1, targetCategory: 'stats', target: 'FP' };
// Adjustments.FazSense_from_AcuteFaz = { from: 'AcuteFaz', fromCategory: 'AD', amount: 1, target: 'FazSense' };
Adjustments.Flight_from_SpatialSense3D = { from: 'SpatialSense3D', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Flight' };
Adjustments.Flight_from_PerfectBalance = { from: 'PerfectBalance', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'Flight' };
Adjustments.Forgery_DXlessthan10 = { from: 'DX<10', fromCategory: 'stats', amount: -1, targetCategory: 'SK', target: 'Forgery' };
Adjustments.FreeFall_from_SpatialSense3D = { from: 'SpatialSense3D', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'FreeFall' };
Adjustments.FrightCheck_from_Collected         = { from: 'Collected',         fromCategory: 'AD', amount:  3, target: 'FrightCheck' };
Adjustments.FrightCheck_from_CombatReflexes    = { from: 'CombatReflexes',    fromCategory: 'AD', amount:  2, target: 'FrightCheck' };
Adjustments.FrightCheck_from_Composed          = { from: 'Composed',          fromCategory: 'AD', amount:  2, target: 'FrightCheck' };
Adjustments.FrightCheck_from_Cool              = { from: 'Cool',              fromCategory: 'AD', amount:  1, target: 'FrightCheck' };
Adjustments.FrightCheck_from_Edgy              = { from: 'Edgy',              fromCategory: 'DI', amount: -1, target: 'FrightCheck' };
Adjustments.FrightCheck_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', fromCategory: 'AD', amount:  2, target: 'FrightCheck' };
Adjustments.FrightCheck_from_Fearlessness      = { from: 'Fearlessness',      fromCategory: 'AD', amount:  1, target: 'FrightCheck' };
Adjustments.FrightCheck_from_Imperturbable     = { from: 'Imperturbable',     fromCategory: 'AD', amount:  5, target: 'FrightCheck' };

Adjustments.Gunner_from_IQ10 = { from: 'IQ=10',  fromCategory: 'stats', amount: 1, targetCategory: 'SK', target: 'Gunner' };
Adjustments.Gunner_from_IQ11 = { from: 'IQ=11',  fromCategory: 'stats', amount: 1, targetCategory: 'SK', target: 'Gunner' };
Adjustments.Gunner_from_IQ12 = { from: 'IQ>=12', fromCategory: 'stats', amount: 2, targetCategory: 'SK', target: 'Gunner' };
Adjustments.Guns_from_IQ10 = { from: 'IQ=10',  fromCategory: 'stats', amount: 1, targetCategory: 'SK', target: 'Guns' };
Adjustments.Guns_from_IQ11 = { from: 'IQ=11',  fromCategory: 'stats', amount: 1, targetCategory: 'SK', target: 'Guns' };
Adjustments.Guns_from_IQ12 = { from: 'IQ>=12', fromCategory: 'stats', amount: 2, targetCategory: 'SK', target: 'Guns' };

Adjustments.HandWeaponSkills_from_BadSight = { from: 'BadSight', amount: -2, targetCategory: 'GR', target: 'HandWeaponSkills' };
Adjustments.Hearing_from_AcuteHearing  = { from: 'AcuteHearing',  fromCategory: 'AD', amount:  1, targetCategory: 'sense', target: 'Hearing' };
Adjustments.Hearing_from_Alertness     = { from: 'Alertness',     fromCategory: 'AD', amount:  1, targetCategory: 'sense', target: 'Hearing' };
Adjustments.Hearing_from_HardOfHearing = { from: 'HardOfHearing', fromCategory: 'DI', amount: -4, targetCategory: 'sense', target: 'Hearing' };
Adjustments.HitPoints_from_ExtraHitPoints   = { from: 'ExtraHitPoints',   fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'HP' };
Adjustments.HitPoints_from_ReducedHitPoints = { from: 'ReducedHitPoints', fromCategory: 'DI', amount: -1, targetCategory: 'stats', target: 'HP' };
// Adjustments.HT_from_DecreasedHT      = { from: 'DecreasedHT',      fromCategory: 'DI', amount: -1, targetCategory: 'stats', target: 'Health' };
// Adjustments.HT_from_IncreasedHT      = { from: 'IncreasedHT',      fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'Health' };
Adjustments.HT_from_RacialHTModifier = { from: 'RacialHTModifier', fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'Health' };

// Adjustments.IQ_from_DecreasedIQ      = { from: 'DecreasedIQ',      fromCategory: 'DI', amount: -1, targetCategory: 'stats', target: 'IQ' };
// Adjustments.IQ_from_IncreasedIQ      = { from: 'IncreasedIQ',      fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'IQ' };
Adjustments.IQ_from_RacialIQModifier = { from: 'RacialIQModifier', fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'IQ' };

Adjustments.Language_from_CulturalAdaptability = { from: 'CulturalAdaptability', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Language' };
Adjustments.Language_from_LanguageTalent = { from: 'LanguageTalent', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'Language' };
Adjustments.Language_from_Linguistics = { from: 'Linguistics', fromCategory: 'SK', amount: 1/10, targetCategory: 'SK', target: 'Language' };
Adjustments.Leadership_from_Charisma   = { from: 'Charisma',   fromCategory: 'AD', amount:  1, targetCategory: 'SK', target: 'Leadership' };
Adjustments.Leadership_from_LowEmpathy = { from: 'LowEmpathy', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Leadership' };
Adjustments.Leadership_from_Shyness    = { from: 'Shyness',    fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Leadership' };
Adjustments.Linguistics_from_CulturalAdaptability = { from: 'CulturalAdaptability', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Linguistics' };
Adjustments.Linguistics_from_LanguageTalent = { from: 'LanguageTalent', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'Linguistics' };

Adjustments.Manual_from_ManualDexterity = { from: 'ManualDexterity', fromCategory: 'AD', amount: 1, targetCategory: 'GR', target: 'Manual' };
// Adjustments.Manual_from_ReducedManualDexterity = { from: 'ReducedManualDexterity', fromCategory: 'DI', amount: -1, targetCategory: 'GR', target: 'Manual' };
Adjustments.Math_from_IntuitiveMathematician = { from: 'IntuitiveMathematician', fromCategory: 'AD', amount: 3, targetCategory: 'GR', target: 'Math' };
Adjustments.Math_from_MathematicalAbility    = { from: 'MathematicalAbility',    fromCategory: 'AD', amount: 3, targetCategory: 'GR', target: 'Math' };
Adjustments.Mechanic_from_DoubleJointed = { from: 'DoubleJointed', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Mechanic' };
Adjustments.Mechanic_from_Flexibility = { from: 'Flexibility', fromCategory: 'AD', amount: 5, targetCategory: 'SK', target: 'Mechanic' };
Adjustments.Mechanic_from_Stretching = { from: 'Stretching', fromCategory: 'AD', amount: 5, targetCategory: 'SK', target: 'Mechanic', per: false };
//Adjustments.MentalSkillPoints_from_EideticMemory = { from: 'EideticMemoryE3', fromCategory: 'AD', amount: 'x2', target: 'MentalSkillPoints' };    // done ad hoc in skill level method
Adjustments.MentalStrength_from_StrongWill = { from: 'StrongWill', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'MentalStrength' };
Adjustments.MentalStrength_from_WeakWill = { from: 'WeakWill', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'MentalStrength' };
Adjustments.Merchant_from_ColorBlind                   = { from: 'ColorBlind', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Merchant_from_CompulsiveSpendthrift = { from: 'CompulsiveSpendthrift', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Merchant_from_CompulsiveSpending    = { from: 'CompulsiveSpending',    fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Merchant_from_Gullibility                  = { from: 'Gullibility', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Merchant_from_LowEmpathy                   = { from: 'LowEmpathy', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Merchant_from_Shyness                      = { from: 'Shyness', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Mimicry_from_Voice = { from: 'Voice', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'Mimicry' };
// Adjustments.Move_from_BodyofMetal = { from: 'BodyofMetal', fromCategory: 'AD',     amount:  -1, targetCategory: 'movement', target: 'Move', per: false };
Adjustments.Move_from_BodyofMetal = { from: 'BodyofMetal', fromCategory: 'AD', amount: 4/5, targetCategory: 'movement', target: 'Move', type: '*' };
Adjustments.Move_from_BodyofStone = { from: 'BodyofStone', fromCategory: 'AD',     amount:  -1, targetCategory: 'movement', target: 'Move', per: false };
// Adjustments.Move_from_BodyofStone = { from: 'BodyofStone', fromCategory: 'AD', amount: 4/5, targetCategory: 'movement', target: 'Move', type: '*' };
Adjustments.Move_from_Dwarfism     = { from: 'Dwarfism',     fromCategory: 'DI',     amount:  -1, targetCategory: 'movement', target: 'Move' };
// Adjustments.Move_from_EnhancedMove = { from: 'EnhancedMove', fromCategory: 'DI',     amount:   1, targetCategory: 'movement', target: 'Move', per: false };
// Adjustments.Move_from_EnhancedMove = { from: 'EnhancedMove', fromCategory: 'DI',     amount:   1, targetCategory: 'movement', target: 'Move', type: '*' };
Adjustments.Move_from_ReducedMove  = { from: 'ReducedMove',  fromCategory: 'DI',     amount:  -1, targetCategory: 'movement', target: 'Move' };
Adjustments.Move_from_Running      = { from: 'Running',      fromCategory: 'skills', amount: 1/8, targetCategory: 'movement', target: 'Move' };
Adjustments.Music_from_MusicalAbility = { from: 'MusicalAbility', fromCategory: 'AD', amount: 1, targetCategory: 'GR', target: 'Music' };

Adjustments.Navigation_from_SpatialSense3D = { from: 'SpatialSense3D', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Navigation' };
Adjustments.Navigation_from_AbsoluteDirection = { from: 'AbsoluteDirection', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Navigation' };

Adjustments.Panhandling_from_Charisma = { from: 'Charisma', fromCategory: 'AD', amount: 1, target: 'Panhandling' };
Adjustments.Panhandling_from_Pitiable = { from: 'Pitiable', fromCategory: 'AD', amount: 3, target: 'Panhandling' };
Adjustments.Parry_from_CombatReflexes          = { from: 'CombatReflexes',          fromCategory: 'AD', amount: 1, targetCategory: 'defense', target: 'Parry' };
Adjustments.Parry_from_EnhancedParryAllWeapons = { from: 'EnhancedParryAllWeapons', fromCategory: 'AD', amount: 1, targetCategory: 'defense', target: 'Parry' };
Adjustments.Parry_from_EnhancedTimeSense       = { from: 'EnhancedTimeSense',       fromCategory: 'AD', amount: 1, targetCategory: 'defense', target: 'Parry' };
Adjustments.Parry_from_PrecognitiveParry       = { from: 'PrecognitiveParry',       fromCategory: 'skills', amount: 1, targetCategory: 'defense', target: 'Parry', per: 1 };
Adjustments.PD_from_BodyofMetal       = { from: 'BodyofMetal',       fromCategory: 'AD', amount:  1/3 , target: 'PD' };
Adjustments.PD_from_BodyofStone       = { from: 'BodyofStone',       fromCategory: 'AD', amount:  1/4 , target: 'PD' };
Adjustments.PD_from_Bouncing          = { from: 'Bouncing',          fromCategory: 'AD', amount:  1/5 , target: 'PD' };
Adjustments.PD_from_FurThick          = { from: 'FurThick',          fromCategory: 'AD', amount:   1,   target: 'PD' };
Adjustments.PD_from_FurSpiny          = { from: 'FurSpiny',          fromCategory: 'AD', amount:   1,   target: 'PD' };
Adjustments.PD_from_ThickHide         = { from: 'ThickHide',         fromCategory: 'AD', amount:   1,   target: 'PD' };
Adjustments.PD_from_PassiveDefense    = { from: 'PassiveDefense',    fromCategory: 'AD', amount:   1,   target: 'PD' };
Adjustments.PD_from_ScalesArmorPlates = { from: 'ScalesArmorPlates', fromCategory: 'AD', amount:   2,   target: 'PD' };
Adjustments.PD_from_Carapace          = { from: 'Carapace',          fromCategory: 'AD', amount:   2,   target: 'PD' };
Adjustments.PD_from_ScalesHeavy       = { from: 'ScalesHeavy',       fromCategory: 'AD', amount:   1,   target: 'PD' };
Adjustments.Performance_from_Voice = { from: 'Voice', fromCategory: 'AD', amount:  2, targetCategory: 'SK', target: 'Performance' };
Adjustments.Piloting_from_ColorBlind     = { from: 'ColorBlind',     fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Piloting' };
Adjustments.Piloting_from_SpatialSense3D = { from: 'SpatialSense3D', fromCategory: 'AD', amount:  1, targetCategory: 'SK', target: 'Piloting' };
Adjustments.Piloting_from_PerfectBalance = { from: 'PerfectBalance', fromCategory: 'AD', amount:  1, targetCategory: 'SK', target: 'Piloting' };
Adjustments.PlantCare_from_PlantEmpathy = { from: 'PlantEmpathy', fromCategory: 'AD', amount: 4, targetCategory: 'GR', target: 'PlantCare' };
Adjustments.PlantCare_from_TreeKin      = { from: 'TreeKin',      fromCategory: 'AD', amount: 4, targetCategory: 'GR', target: 'PlantCare' };
Adjustments.PlantID_from_PlantEmpathy = { from: 'PlantEmpathy', fromCategory: 'AD', amount: 2, targetCategory: 'GR', target: 'PlantID' };
Adjustments.PlantID_from_TreeKin      = { from: 'TreeKin',      fromCategory: 'AD', amount: 4, targetCategory: 'GR', target: 'PlantID' };
Adjustments.Politics_from_LowEmpathy = { from: 'LowEmpathy', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Politics' };
Adjustments.Politics_from_Shyness    = { from: 'Shyness',    fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Politics' };
Adjustments.Politics_from_Voice      = { from: 'Voice',      fromCategory: 'AD', amount:  2, targetCategory: 'SK', target: 'Politics' };
Adjustments.Psychology_from_Empathy    = { from: 'Empathy',    fromCategory: 'AD', amount:  3, targetCategory: 'SK', target: 'Psychology' };
Adjustments.Psychology_from_LowEmpathy = { from: 'LowEmpathy', fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'Psychology' };

Adjustments.Orienteering_from_AbsoluteDirection = { from: 'AbsoluteDirection', fromCategory: 'AD', amount: 3, targetCategory: 'SK', target: 'Orienteering' };

// do these adjustments with group target Appearance do anything?
Adjustments.Appearance_from_AppearanceHideous       = { from: 'AppearanceHideous',       fromCategory: 'DI', amount: -4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceUgly          = { from: 'AppearanceUgly',          fromCategory: 'DI', amount: -2, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceUnattractive  = { from: 'AppearanceUnattractive',  fromCategory: 'DI', amount: -1, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceAttractive    = { from: 'AppearanceAttractive',    fromCategory: 'AD', amount:  1, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceHandsome      = { from: 'AppearanceHandsome',      fromCategory: 'AD', amount:  3, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceBeautiful     = { from: 'AppearanceBeautiful',     fromCategory: 'AD', amount:  3, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceVeryHandsome  = { from: 'AppearanceVeryHandsome',  fromCategory: 'AD', amount:  4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceVeryBeautiful = { from: 'AppearanceVeryBeautiful', fromCategory: 'AD', amount:  4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_Appearance              = { from: 'Appearance',              fromCategory: 'AD', amount:  1, targetCategory: 'GR', target: 'Appearance' }
Adjustments.Reaction_from_Charisma = { from: 'Charisma', fromCategory: 'AD', amount: 1, targetCategory: 'GR', target: 'Reaction' };
Adjustments.Reaction_from_CulturalAdaptability = { from: 'CulturalAdaptability', fromCategory: 'AD', amount: 1, targetCategory: 'GR', target: 'Reaction' };
Adjustments.Reaction_from_Reputation = { from: 'Reputation', fromCategory: 'DI', amount: 1, target: 'Reaction' };
Adjustments.Reputation_from_Reputation = { from: 'Reputation', fromCategory: 'DI', amount: 1, target: 'Reputation' };

Adjustments.SavoirFaire_from_Clueless = { from: 'Clueless', fromCategory: 'DI', amount: -4, targetCategory: 'SK', target: 'SavoirFaire' };
Adjustments.SavoirFaire_from_Shyness  = { from: 'Shyness',  fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'SavoirFaire' };
Adjustments.SavoirFaire_from_Voice    = { from: 'Voice',    fromCategory: 'AD', amount:  2, targetCategory: 'SK', target: 'SavoirFaire' };
Adjustments.SensieInterface_from_SensieTalent = { from: 'SensieTalent', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'SensieInterface' };
Adjustments.SexAppeal_from_LowEmpathy              = { from: 'LowEmpathy',              fromCategory: 'DI', amount: -3, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Shyness                 = { from: 'Shyness',                 fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Voice                   = { from: 'Voice',                   fromCategory: 'AD', amount:  2, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_AppearanceHideous       = { from: 'AppearanceHideous',       fromCategory: 'DI', amount: -8, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_AppearanceUgly          = { from: 'AppearanceUgly',          fromCategory: 'DI', amount: -4, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_AppearanceUnattractive  = { from: 'AppearanceUnattractive',  fromCategory: 'DI', amount: -2, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.Singing_from_Voice = { from: 'Voice',      fromCategory: 'AD', amount:  2, targetCategory: 'SK', target: 'Singing' };
Adjustments.Social_from_Callous              = { from: 'Callous',              fromCategory: 'AD', amount: -2, targetCategory: 'CL', target: 'Social' };
Adjustments.Social_from_CulturalAdaptability = { from: 'CulturalAdaptability', fromCategory: 'AD', amount:  1, targetCategory: 'CL', target: 'Social' };
Adjustments.Social_from_Oblivious            = { from: 'Oblivious',            fromCategory: 'DI', amount: -1, targetCategory: 'CL', target: 'Social' };
Adjustments.Social_from_Solipsist            = { from: 'Solipsist',            fromCategory: 'DI', amount: -3, targetCategory: 'CL', target: 'Social' };
// Adjustments.Speech_from_RadioSpeech = { from: 'RadioSpeech', fromCategory: 'AD', amount: 'ADS:Radio', target: 'Speech' };
Adjustments.Speed_from_Hyperactive = { from: 'Hyperactive', fromCategory: 'AD', amount: 2, targetCategory: 'movement', target: 'Speed' };
Adjustments.Speed_from_HyperReflexes = { from: 'HyperReflexes', fromCategory: 'AD', amount: 1, targetCategory: 'movement', target: 'Speed' };
Adjustments.Speed_from_IncreasedSpeed = { from: 'IncreasedSpeed', fromCategory: 'AD', amount: 1, targetCategory: 'movement', target: 'Speed' };
Adjustments.Spells_from_EideticMemory      = { from: 'EideticMemoryE3',    fromCategory: 'AD', amount: 1, targetCategory: 'group', target: 'Spells' };
Adjustments.Spells_from_Magery             = { from: 'Magery',             fromCategory: 'AD', amount: 1, targetCategory: 'group', target: 'Spells' };
Adjustments.Spells_from_MageryAspectedI    = { from: 'MageryAspectedI',    fromCategory: 'AD', amount: 1, targetCategory: 'group', target: 'Spells' };
Adjustments.Spells_from_MageryAspectedII   = { from: 'MageryAspectedII',   fromCategory: 'AD', amount: 1, targetCategory: 'group', target: 'Spells' };
Adjustments.Spells_from_PowerInvestiture   = { from: 'PowerInvestiture',   fromCategory: 'AD', amount: 1, targetCategory: 'group', target: 'Spells' };
// Adjustments.ST_from_DecreasedST          = { from: 'DecreasedST',      fromCategory: 'DI', amount: -1, targetCategory: 'stats', target: 'Strength' };
// Adjustments.ST_from_IncreasedST          = { from: 'IncreasedST',      fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'Strength' };
// Adjustments.ST_from_EnhancedST           = { from: 'EnhancedST',       fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'Strength' };
Adjustments.ST_from_EnhancedST16_23base  = { from: 'EnhancedST16_23',  fromCategory: 'AD', amount:  5, targetCategory: 'stats', target: 'Strength', per: false };
Adjustments.ST_from_EnhancedST16_23      = { from: 'EnhancedST16_23',  fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'Strength' };
Adjustments.ST_from_EnhancedST24_30base  = { from: 'EnhancedST24_30',  fromCategory: 'AD', amount: 13, targetCategory: 'stats', target: 'Strength', per: false };
Adjustments.ST_from_EnhancedST24_30      = { from: 'EnhancedST24_30',  fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'Strength' };
Adjustments.ST_from_EnhancedST31plusbase = { from: 'EnhancedST31plus', fromCategory: 'AD', amount: 20, targetCategory: 'stats', target: 'Strength', per: false };
Adjustments.ST_from_EnhancedST31plus     = { from: 'EnhancedST31plus', fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'Strength' };
Adjustments.ST_from_RacialSTModifier     = { from: 'RacialSTModifier', fromCategory: 'AD', amount:  1, targetCategory: 'stats', target: 'Strength' };
//Adjustments.Status_from_Status                = { from: 'Status',               fromCategory: 'AD', amount: 1, target: 'Status' };  // remove; Status will always be calculated by starting with levels of the Status advantage anyway
//Adjustments.Status_from_MilitaryRank          = { from: 'MilitaryRank',         fromCategory: 'AD', amount: 1/3, target: 'Status' };  // this will work, if rounded (NOT truncated); see B22
Adjustments.Status_from_WealthWealthyx5       = { from: 'WealthWealthyx5',      fromCategory: 'AD', amount: 1, target: 'Status' };
Adjustments.Status_from_WealthVeryWealthyx20  = { from: 'WealthVeryWealthyx20', fromCategory: 'AD', amount: 1, target: 'Status' };
Adjustments.Status_from_WealthFilthyRichx100  = { from: 'WealthFilthyRichx100', fromCategory: 'AD', amount: 1, target: 'Status' };
Adjustments.Statusupto2_from_Multimillionaire = { from: 'Multimillionaire',     fromCategory: 'AD', amount: 1, target: 'Status' };
Adjustments.Stealth_from_Chameleon    = { from: 'Chameleon',    fromCategory: 'AD',  amount:  1, targetCategory: 'SK', target: 'Stealth' };
Adjustments.Stealth_from_Invisibility = { from: 'Invisibility', fromCategory: 'AD',  amount:  9, targetCategory: 'SK', target: 'Stealth' };
Adjustments.Stealth_from_Silence      = { from: 'Silence',      fromCategory: 'AD',  amount:  1, targetCategory: 'SK', target: 'Stealth' };
Adjustments.Stealth_from_Encumbrance  = { from: 'Encumbrance',  fromCategory: 'stats', targetCategory: 'SK', target: 'Stealth' };
Adjustments.Streetwise_from_Shyness = { from: 'Shyness', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Streetwise' };
Adjustments.Stun_from_ExtraStun = { from: 'ExtraStun', fromCategory: 'AD', amount: 1, targetCategory: 'stats', target: 'Stun' };
Adjustments.Swim_from_ReducedSwim = { from: 'ReducedSwim', fromCategory: 'DI', amount:  -1, targetCategory: 'stats', target: 'Swim' };  // may want to change to "waterMove"
Adjustments.Swimming_from_Fat = { from: 'Fat', fromCategory: 'DI', amount: 5, target: 'Swimming', per: false };
Adjustments.Swimming_from_Overweight = { from: 'Overweight', fromCategory: 'DI', amount: 2, target: 'Swimming' };

Adjustments.TasteSmell_from_AcuteTasteSmell = { from: 'AcuteTasteSmell', fromCategory: 'AD', amount: 1, targetCategory: 'sense', target: 'TasteSmell' };
Adjustments.TasteSmell_from_Alertness       = { from: 'Alertness',       fromCategory: 'AD', amount: 1, targetCategory: 'sense', target: 'TasteSmell' };
Adjustments.TasteSmell_from_DiscriminatorySmell = { from: 'DiscriminatorySmell', fromCategory: 'AD', amount: 4, target: 'TasteSmell' };
Adjustments.Teaching_from_Shyness = { from: 'Shyness', fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Teaching' };
Adjustments.Tracking_from_ColorBlind          = { from: 'ColorBlind',          fromCategory: 'DI', amount: -1, targetCategory: 'SK', target: 'Tracking' };
Adjustments.Tracking_from_DiscriminatorySmell = { from: 'DiscriminatorySmell', fromCategory: 'AD', amount:  4, targetCategory: 'SK', target: 'Tracking' };

Adjustments.Vision_from_AcuteVision = { from: 'AcuteVision', fromCategory: 'AD', amount: 1, targetCategory: 'sense', target: 'Vision' };
Adjustments.Vision_from_Alertness   = { from: 'Alertness',   fromCategory: 'AD', amount: 1, targetCategory: 'sense', target: 'Vision' };

//Adjustments.WaterMove_from_IncrementalEnhancedSwim = { from: "IncrementalEnhancedSwim", fromCategory: "AD", amount: 1.0718, type: "*", target: "WaterMove" }  // experimental

Adjustments.Will_from_HiveMentality = { from: 'HiveMentality', fromCategory: 'DI', amount: -2, target: 'Will', targetCategory: 'stats' };
Adjustments.Will_from_Selfless      = { from: 'Selfless',      fromCategory: 'DI', amount: -1, target: 'Will', targetCategory: 'stats' };
Adjustments.Will_from_StrongWill    = { from: 'StrongWill',    fromCategory: 'AD', amount:  1, target: 'Will', targetCategory: 'stats' };
Adjustments.Will_from_WeakWill      = { from: 'WeakWill',      fromCategory: 'DI', amount: -1, target: 'Will', targetCategory: 'stats' };

// move these
// Adjustments.HeavyEncumbrance_from_ExtraEncumbrance  = { from: 'ExtraEncumbrance', fromCategory: 'AD', amount: '*20/12', target: 'HeavyEncumbrance' };
// Adjustments.LightEncumbrance_from_ExtraEncumbrance  = { from: 'ExtraEncumbrance', fromCategory: 'AD', amount: '*5/4', target: 'LightEncumbrance' };
// Adjustments.MediumEncumbrance_from_ExtraEncumbrance = { from: 'ExtraEncumbrance', fromCategory: 'AD', amount: '*10/6', target: 'MediumEncumbrance' };
// Adjustments.XHeavyEncumbrance_from_ExtraEncumbrance = { from: 'ExtraEncumbrance', fromCategory: 'AD', amount: '*30/20', target: 'XHeavyEncumbrance' };


// The common 'Magery' prerequisite needs to be satisfied by aspected and other non-traditional forms of Magery.
// Create a 'Magery' list/group?  or just a bunch of prereqs in a pgroup?  Harder; this violates the Principle of Updates (new Magery versions would have to be added to the same pgroup - is this actually a violation?).
Prerequisites = {};
/*  attribute rules
    target:     Almost always a Skill key, a few are Traits keys
    targetSpec: For skills with pre-defined specializations, where the specialties will have distinct prerequisites.
    prereq:     For Skills or Traits, will be the key for the corresponding item in those library objects.
                For stats that are attributes or secondary characteristics, should exactly match what is used
                in the Character object (i.e., ST, DX, IQ, HT, FP, HP, Will, Per)
                Other potential 'stats' (weight, group, ???) have not yet come up.
    prereqSpec: For skills with specializations, where the specialties will have distinct prerequisites.
                You can use 'same' here, for skills with user-defined required specializations
                that should match the specializations of the Prerequisites.
                If you use prereqSpec: 'same', don't specify a targetSpec.
    category:   Allowed values (so far) are SK, ADS, GP, stats.  Specifies type for prereq, not target.
    level:      For prereqs where levels make sense (all skills, many traits), a minimum level may be specified.
    pgroup:     Used to indicate that two (or more) Prerequisite items with the same target are to be logically
                joined using 'or' instead of the usual 'and'.  If two items are to be connected in this way, give
                each of them a pgroup attribute, with the same numeric value.
*/

Prerequisites.Accounting_requires_Cyphering = { target: 'Accounting', prereq: 'Cyphering' };
Prerequisites.Accounting_requires_Literacy  = { target: 'Accounting', category: 'ADS', prereq: 'Literacy' };
Prerequisites.AlternateIdentityLegal_requires_LegalEnforcementPowers = { target: 'AlternateIdentityLegal', category: 'ADS', prereq: 'LegalEnforcementPowers' };

Prerequisites.Biochemistry_requires_Chemistry = { target: 'Biochemistry', category: 'SK', prereq: 'Chemistry' };
Prerequisites.BlindFighting_requires_TrainedbyaMaster_pgroup1 = { target: 'BlindFighting', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.BlindFighting_requires_WeaponMaster_pgroup1     = { target: 'BlindFighting', category: 'ADS', prereq: 'WeaponMaster',     pgroup: 1 };
Prerequisites.BlindingTouch_requires_PressurePoints15 = { target: 'BlindingTouch', category: 'SK',  prereq: 'PressurePoints', level: 15 };
Prerequisites.BlindingTouch_requires_TrainedbyaMaster = { target: 'BlindingTouch', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.BodyControl_requires_TrainedbyaMaster = { target: 'BodyControl', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.BodyControl_requires_BreathControl    = { target: 'BodyControl', category: 'SK',  prereq: 'BreathControl' };
Prerequisites.BodyControl_requires_Meditation       = { target: 'BodyControl', category: 'SK',  prereq: 'Meditation' };
Prerequisites.BrainHacking_requires_Psychology = { target: 'BrainHacking', prereq: 'Psychology' };
Prerequisites.BreakingBlow_requires_TrainedbyaMaster = { target: 'BreakingBlow', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.Broadcast_requires_RadioHearing = { target: 'Broadcast', category: 'ADS', prereq: 'RadioHearing' };

Prerequisites.Calligraphy_requires_Literacy = { target: 'Calligraphy', category: 'ADS', prereq: 'Literacy' };
Prerequisites.Captivate_requires_Suggest = { target: 'Captivate', category: 'SK',  prereq: 'Suggest',  level: 12 };
Prerequisites.ChangeControl_requires_MultipleForms = { target: 'ChangeControl', category: 'ADS', prereq: 'MultipleForms' };
Prerequisites.Choreography_requires_Dancing    = { target: 'Choreography', category: 'SK', prereq: 'Dancing' };
Prerequisites.Choreography_requires_Leadership = { target: 'Choreography', category: 'SK', prereq: 'Leadership' };
Prerequisites.ComputerProgramming_requires_ComputerOperation = { target: 'ComputerProgramming', category: 'SK', prereq: 'ComputerOperation' };
Prerequisites.Conducting_requires_2MusicalInstruments = { target: 'Conducting', number: 2, prereq: 'MusicalInstrument' };
Prerequisites.Conducting_requires_Leadership          = { target: 'Conducting', category: 'SK', prereq: 'Leadership' };
Prerequisites.ConstrictionAttack_requires_ExtraFlexibility = { target: 'ConstrictionAttack', category: 'ADS', prereq: 'ExtraFlexibility' };

Prerequisites.Directing_requires_Leadership  = { target: 'Directing', category: 'SK', prereq: 'Leadership' };
Prerequisites.Directing_requires_Performance = { target: 'Directing', category: 'SK', prereq: 'Performance' };
Prerequisites.Dislocating_requires_Escape15         = { target: 'Dislocating', category: 'SK', prereq: 'Escape', level: 15 };
Prerequisites.Dislocating_requires_TrainedbyaMaster = { target: 'Dislocating', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.DrunkenFighting_requires_TrainedbyaMaster_pgroup1 = { target: 'DrunkenFighting', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.DrunkenFighting_requires_WeaponMaster_pgroup1     = { target: 'DrunkenFighting', category: 'ADS', prereq: 'WeaponMaster',     pgroup: 1 };
Prerequisites.DrunkenFighting_requires_Judo16_pgroup2           = { target: 'DrunkenFighting', category: 'SK',  prereq: 'Judo',   level: 16, pgroup: 2 };
Prerequisites.DrunkenFighting_requires_Karate16_pgroup2         = { target: 'DrunkenFighting', category: 'SK',  prereq: 'Karate', level: 16, pgroup: 2 };

Prerequisites.Electronics_requires_Mathematics = { target: 'Electronics', category: 'SK', prereq: 'Mathematics' };
Prerequisites.EquestrianAcrobatics_requires_Riding = { target: 'EquestrianAcrobatics', category: 'SK', prereq: 'Riding' };
Prerequisites.EroticArt_requires_SexAppeal13 = { target: 'EroticArt', level: 13, category: 'SK', prereq: 'SexAppeal' };
Prerequisites.ExplosiveOrdinanceDisposalTL_requires_DX = { target: 'ExplosiveOrdinanceDisposal', category: 'stat', level: 12, prereq: 'DX' };

Prerequisites.Familiar_requires_Magery2 = { target: 'Familiar', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.FightChoreography_requires_Leadership  = { target: 'FightChoreography', category: 'SK', prereq: 'Leadership' };
Prerequisites.FightChoreography_requires_StageCombat = { target: 'FightChoreography', category: 'SK', prereq: 'StageCombat' };
Prerequisites.FlyingFists_requires_TrainedbyaMaster = { target: 'FlyingFists', category: 'ADS',            prereq: 'TrainedbyaMaster' };
Prerequisites.FlyingFists_requires_Karate20         = { target: 'FlyingFists', category: 'SK', level: 20,  prereq: 'Karate' };
Prerequisites.FlyingFists_requires_BreakingBlow16   = { target: 'FlyingFists', category: 'SK', level: 16,  prereq: 'BreakingBlow' };
Prerequisites.FlyingFists_requires_Meditation16     = { target: 'FlyingFists', category: 'SK', level: 16,  prereq: 'Meditation' };
Prerequisites.FlyingFists_requires_MentalStrength16 = { target: 'FlyingFists', category: 'SK', level: 16,  prereq: 'MentalStrength' };
Prerequisites.FlyingFists_requires_PowerBlow16      = { target: 'FlyingFists', category: 'SK', level: 16,  prereq: 'PowerBlow' };
Prerequisites.FlyingLeap_requires_TrainedbyaMaster = { target: 'FlyingLeap', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.FlyingLeap_requires_Jumping          = { target: 'FlyingLeap', category: 'SK',  prereq: 'Jumping' };
Prerequisites.FlyingLeap_requires_PowerBlow        = { target: 'FlyingLeap', category: 'SK',  prereq: 'PowerBlow' };


Prerequisites.HandofDeath_requires_TrainedbyaMaster  = { target: 'HandofDeath', category: 'ADS',           prereq: 'TrainedbyaMaster' };
Prerequisites.HandofDeath_requires_BreakingBlow20    = { target: 'HandofDeath', category: 'SK', level: 20, prereq: 'BreakingBlow' };
Prerequisites.HandofDeath_requires_PowerBlow20       = { target: 'HandofDeath', category: 'SK', level: 20, prereq: 'PowerBlow' };
Prerequisites.HandofDeath_requires_PressureSecrets20 = { target: 'HandofDeath', category: 'SK', level: 20, prereq: 'PressureSecrets' };
Prerequisites.Herbary_requires_Botany12 = { target: 'Herbary', level: 12, category: 'SK', prereq: 'Botany' };
Prerequisites.HerbaryMiraculous_requires_Botany12 = { target: 'HerbaryMiraculous', level: 12, category: 'SK', prereq: 'Botany' };
Prerequisites.Hyperflight_requires_SuperFlight = { target: 'Hyperflight', category: 'ADS', prereq: 'SuperFlight' };
Prerequisites.HyperspacePhysics_requires_Mathematics15    = { target: 'HyperspacePhysics', level: 15, category: 'SK', prereq: 'Mathematics' };
Prerequisites.HyperspacePhysics_requires_NuclearPhysics15 = { target: 'HyperspacePhysics', level: 15, category: 'SK', prereq: 'NuclearPhysics' };
Prerequisites.HyperspacePhysics_requires_Physics15        = { target: 'HyperspacePhysics', level: 15, category: 'SK', prereq: 'Physics' };
Prerequisites.HypnoticHands_requires_TrainedbyaMaster = { target: 'HypnoticHands', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.HypnoticHands_requires_Hypnotism15      = { target: 'HypnoticHands', category: 'SK',  prereq: 'Hypnotism', level: 15 };

Prerequisites.ImmovableStance_requires_TrainedbyaMaster = { target: 'ImmovableStance', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.ImmunitytoDisease_requires_HT = { target: 'ImmunitytoDisease', category: 'stat', level: 12, prereq: 'HT' };
Prerequisites.InvisibilityArt_requires_TrainedbyaMaster = { target: 'InvisibilityArt', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.InvisibilityArt_requires_Hypnotism16      = { target: 'InvisibilityArt', category: 'SK',  prereq: 'Hypnotism', level: 16 };
Prerequisites.InvisibilityArt_requires_Stealth16        = { target: 'InvisibilityArt', category: 'SK',  prereq: 'Stealth', level: 16 };


Prerequisites.Kiai_requires_TrainedbyaMaster = { target: 'Kiai', category: 'ADS', prereq: 'TrainedbyaMaster' };

Prerequisites.Lance_requires_Riding = { target: 'Lance', category: 'SK', prereq: 'Riding' };
Prerequisites.LightWalk_requires_TrainedbyaMaster = { target: 'LightWalk', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.LightWalk_requires_Acrobatics15     = { target: 'LightWalk', category: 'SK',  prereq: 'Acrobatics', level: 15 };
Prerequisites.LightWalk_requires_Stealth15        = { target: 'LightWalk', category: 'SK',  prereq: 'Stealth',    level: 15 };

Prerequisites.Mathematics_requires_Cyphering = { target: 'Mathematics', prereq: 'Cyphering' };
Prerequisites.MentalStrength_requires_TrainedbyaMaster_pgroup1 = { target: 'MentalStrength', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.MentalStrength_requires_WeaponMaster_pgroup1     = { target: 'MentalStrength', category: 'ADS', prereq: 'WeaponMaster', pgroup: 1 };
Prerequisites.Mindlink_requires_Telepathy = { target: 'Mindlink', category: 'ADS', prereq: 'Telepathy' };
Prerequisites.MindReadingSpell_requires_Truthsayer = { target: 'MindReadingSpell', prereq: 'Truthsayer' };
Prerequisites.MountainHeart_requires_TrainedbyaMaster = { target: 'MountainHeart', prereq: 'TrainedbyaMaster', category: 'ADS' };
Prerequisites.MountainHeart_requires_BodyControl15    = { target: 'MountainHeart', prereq: 'BodyControl', level: 15, category: 'SK' };
// Prerequisites.Multimillionaire_requires_Wealth = { target: 'Multimillionaire', category: 'ADS', prereq: 'Wealth' };
Prerequisites.Multimillionaire_requires_WealthFilthyRichx100 = { target: 'Multimillionaire', category: 'ADS', prereq: 'WealthFilthyRichx100' };
Prerequisites.MuscleReading_requires_TrainedbyaMaster = { target: 'MuscleReading', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.MuscleReading_requires_Physiology       = { target: 'MuscleReading', category: 'SK',  prereq: 'Physiology' };
Prerequisites.MuscleReading_requires_Psychology       = { target: 'MuscleReading', category: 'SK',  prereq: 'Psychology' };
Prerequisites.MusicalComposition_requires_MusicalInstrument = { target: 'MusicalComposition', category: 'SK', prereq: 'MusicalInstrument' };

Prerequisites.Neurophon_requires_Physiology10 = { target: 'Neurophon', level: 10, category: 'SK', prereq: 'Physiology' };
Prerequisites.NuclearPhysics_requires_Mathematics15 = { target: 'NuclearPhysics', level: 15, category: 'SK', prereq: 'Mathematics' };
Prerequisites.NuclearPhysics_requires_Physics15 = { target: 'NuclearPhysics', level: 15, category: 'SK', prereq: 'Physics' };


Prerequisites.Packing_requires_AnimalHandling = { target: 'Packing', category: 'SK', prereq: 'AnimalHandling' };
Prerequisites.Paraphysics_requires_Biochemistry12 = { target: 'Paraphysics', level: 12, category: 'SK', prereq: 'Biochemistry' };
Prerequisites.Paraphysics_requires_Physics12      = { target: 'Paraphysics', level: 12, category: 'SK', prereq: 'Physics' };
Prerequisites.Persuade_requires_Bard     = { target: 'Persuade', category: 'SK',  prereq: 'Bard', level: 12 };
Prerequisites.Persuade_requires_Charisma = { target: 'Persuade', category: 'ADS', prereq: 'Charisma', level: 1 };
Prerequisites.Photonics_requires_Mathematics = { target: 'Photonics', category: 'SK', prereq: 'Mathematics' };
Prerequisites.PowerBlow_requires_TrainedbyaMaster_pgroup1 = { target: 'PowerBlow', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.PowerBlow_requires_WeaponMaster_pgroup2     = { target: 'PowerBlow', category: 'ADS', prereq: 'WeaponMaster', pgroup: 2 };
Prerequisites.PrecognitiveParry_requires_TrainedbyaMaster_pgroup1 = { target: 'PrecognitiveParry', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.PrecognitiveParry_requires_WeaponMaster_pgroup1     = { target: 'PrecognitiveParry', category: 'ADS', prereq: 'WeaponMaster',     pgroup: 1 };
Prerequisites.PrecognitiveParry_requires_DangerSense_pgroup2      = { target: 'PrecognitiveParry', category: 'ADS', prereq: 'DangerSense',    pgroup: 2 };
Prerequisites.PrecognitiveParry_requires_ESP3_pgroup2             = { target: 'PrecognitiveParry', category: 'ADS', prereq: 'ESP', level: 3,  pgroup: 2 };
Prerequisites.PrecognitiveParry_requires_Precognition15           = { target: 'PrecognitiveParry', category: 'SK',  prereq: 'Precognition', level: 15 };
Prerequisites.PrecognitiveParry_requires_Weapon20                 = { target: 'PrecognitiveParry', category: 'SK',  prereq: 'WeaponsSkills', number: 1, level: 20 };
Prerequisites.PressurePoints_requires_TrainedbyaMaster = { target: 'PressurePoints', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.PressureSecrets_requires_PressurePoints18 = { target: 'PressureSecrets', level: 18, category: 'SK', prereq: 'PressurePoints' };
Prerequisites.PressureSecrets_requires_TrainedbyaMaster = { target: 'PressureSecrets', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.ProbabilityPhysics_requires_Mathematics15    = { target: 'ProbabilityPhysics', level: 15, category: 'SK', prereq: 'Mathematics' };
Prerequisites.ProbabilityPhysics_requires_NuclearPhysics15 = { target: 'ProbabilityPhysics', level: 15, category: 'SK', prereq: 'NuclearPhysics' };
Prerequisites.ProbabilityPhysics_requires_Physics15        = { target: 'ProbabilityPhysics', level: 15, category: 'SK', prereq: 'Physics' };
Prerequisites.Punning_requires_Language13 = { target: 'Punning', level: 13, category: 'SK', prereq: 'Language' };
Prerequisites.Push_requires_TrainedbyaMaster = { target: 'Push', category: 'ADS', prereq: 'TrainedbyaMaster' };

Prerequisites.RapidHealing_requires_HT = { target: 'RapidHealing', category: 'stat', level: 10, prereq: 'HT' };
Prerequisites.Research_requires_Literacy = { target: 'Research', category: 'AD', prereq: 'Literacy' };
Prerequisites.RuneNounAir_requires_RuneLore = { target: 'RuneNounAir', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounAnimal_requires_RuneLore = { target: 'RuneNounAnimal', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounBodyMan_requires_RuneLore = { target: 'RuneNounBodyMan', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounEarth_requires_RuneLore = { target: 'RuneNounEarth', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounFire_requires_RuneLore = { target: 'RuneNounFire', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounFood_requires_RuneLore = { target: 'RuneNounFood', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounIllusion_requires_RuneLore = { target: 'RuneNounIllusion', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounLightDark_requires_RuneLore = { target: 'RuneNounLightDark', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounMagic_requires_RuneLore = { target: 'RuneNounMagic', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounMind_requires_RuneLore = { target: 'RuneNounMind', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounPlant_requires_RuneLore = { target: 'RuneNounPlant', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounSound_requires_RuneLore = { target: 'RuneNounSound', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounUndead_requires_RuneLore = { target: 'RuneNounUndead', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneNounWater_requires_RuneLore = { target: 'RuneNounWater', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbCommunicate_requires_RuneLore = { target: 'RuneVerbCommunicate', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbControl_requires_RuneLore = { target: 'RuneVerbControl', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbCreate_requires_RuneLore = { target: 'RuneVerbCreate', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbHeal_requires_RuneLore = { target: 'RuneVerbHeal', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbMove_requires_RuneLore = { target: 'RuneVerbMove', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbProtect_requires_RuneLore = { target: 'RuneVerbProtect', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbSense_requires_RuneLore = { target: 'RuneVerbSense', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbStrengthen_requires_RuneLore = { target: 'RuneVerbStrengthen', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbTransform_requires_RuneLore = { target: 'RuneVerbTransform', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbWarn_requires_RuneLore = { target: 'RuneVerbWarn', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };
Prerequisites.RuneVerbWeaken_requires_RuneLore = { target: 'RuneVerbWeaken', prereq: 'RuneLore', prereqSpec: 'same', level: 12  };

Prerequisites.Sacrifice_requires_Theology = { target: 'Sacrifice', category: 'SK', prereq: 'Theology' };
Prerequisites.Science_requires_Research13     = { target: 'Science', level: 13, category: 'SK', prereq: 'Research' };
Prerequisites.Science_requires_2ScienceSkills = { target: 'Science', prereq: 'ScienceSkills', level: '2pts', category: 'GP', number: 2 };
Prerequisites.Shapeshifter_requires_Morph        = { target: 'Shapeshifter', category: 'ADS', prereq: 'Morph' };
// Prerequisites.Shapeshifter_requires_PlanarTravelAbilities = { target: 'Shapeshifter', category: 'ADS', prereq: 'PlanarTravelAbilities' };
Prerequisites.Shiphandling_requires_Meteorology12 = { target: 'Shiphandling', level: 12, category: 'SK', prereq: 'Meteorology' };
Prerequisites.Shiphandling_requires_Navigation12  = { target: 'Shiphandling', level: 12, category: 'SK', prereq: 'Navigation' };
Prerequisites.Shiphandling_requires_Seamanship12  = { target: 'Shiphandling', level: 12, category: 'SK', prereq: 'Seamanship' };
Prerequisites.SonarImaging_requires_SonarVision = { target: 'SonarImaging', category: 'ADS', prereq: 'SonarVision' };
Prerequisites.SpeedReading_requires_Literacy = { target: 'SpeedReading', category: 'ADS', prereq: 'Literacy' };
//Prerequisites.Suggest_requires_Charisma = { target: 'Suggest', category: 'ADS', prereq: 'Charisma', level: 1 };   // pointless, as the required Persuade also requires Charisma 1+
Prerequisites.Suggest_requires_Persuade = { target: 'Suggest', category: 'SK',  prereq: 'Persuade', level: 12 };
Prerequisites.SuperFlight_requires_Flight = { target: 'SuperFlight', category: 'ADS', prereq: 'Flight' };
Prerequisites.SuperSwimming_requires_Amphibious = { target: 'SuperSwimming', category: 'ADS', prereq: 'Amphibious' };
Prerequisites.Supersensitive_requires_Telepathy = { target: 'Supersensitive', category: 'ADS', prereq: 'Telepathy' };
Prerequisites.Surgery_requires_Physician = { target: 'Surgery', category: 'SK', prereq: 'Physician' };
Prerequisites.Surveying_requires_Mathematics = { target: 'Surveying', category: 'SK', prereq: 'Mathematics' };
//Prerequisites.SwayEmotions_requires_Charisma = { target: 'SwayEmotions', category: 'ADS', prereq: 'Charisma', level: 1 };   // pointless, as the required Persuade also requires Charisma 1+
Prerequisites.SwayEmotions_requires_Persuade = { target: 'SwayEmotions', category: 'SK',  prereq: 'Persuade', level: 12 };

Prerequisites.Teamster_requires_AnimalHandling = { target: 'Teamster', category: 'SK', prereq: 'AnimalHandling' };
Prerequisites.Teamster_requires_AnimalHandling = { target: 'Teamster', category: 'SK', prereq: 'AnimalHandling' };
Prerequisites.TelepathicAddiction_requires_Telepathy       = { target: 'TelepathicAddiction', category: 'ADS', prereq: 'Telepathy' };
Prerequisites.TelepathicAddiction_requires_TelereceiveAT10 = { target: 'TelepathicAddiction', category: 'SK',  prereq: 'Telereceive', level: 10 };
Prerequisites.TelepathicAddiction_requires_TelesendAT10    = { target: 'TelepathicAddiction', category: 'SK',  prereq: 'Telesend',    level: 10 };
Prerequisites.TemporalElectronics_requires_TemporalPhysics = { target: 'TemporalElectronics', category: 'SK', prereq: 'TemporalPhysics' };
Prerequisites.TemporalPhysics_requires_Physics = { target: 'TemporalPhysics', category: 'SK', prereq: 'Physics' };
Prerequisites.ThrowingArt_requires_Throwing16       = { target: 'ThrowingArt', level: 16, category: 'SK', prereq: 'Throwing' };
Prerequisites.ThrowingArt_requires_TrainedbyaMaster = { target: 'ThrowingArt', category: 'ADS', prereq: 'TrainedbyaMaster' };

Prerequisites.UnderwaterDemolition_requires_Scuba              = { target: 'UnderwaterDemolition', category: 'SK', prereq: 'Scuba' };
Prerequisites.UnderwaterDemolition_requires_Demolition_pgroup1 = { target: 'UnderwaterDemolition', category: 'SK', prereq: 'Demolition', pgroup: 1 };
Prerequisites.UnderwaterDemolition_requires_Engineer_pgroup1   = { target: 'UnderwaterDemolition', category: 'SK', prereq: 'Engineer', prereqSpec: 'Bombs and Traps', pgroup: 1 };

Prerequisites.VaccSuit_requires_FreeFall = { target: 'VaccSuit', category: 'SK', prereq: 'FreeFall' };
Prerequisites.VaccSuit_requires_FreeFall = { target: 'VeryRapidHealing', category: 'stat', prereq: 'HT', level: 12 };

// Prerequisites.WealthFilthyRichx100_requires_Status = { target: 'WealthFilthyRichx100', level: 0, category: 'AD', prereq: 'Status' };
// Prerequisites.WealthVeryWealthyx20_requires_Status = { target: 'WealthVeryWealthyx20', level: 0, category: 'AD', prereq: 'Status' };
// Prerequisites.WealthWealthyx5_requires_Status = { target: 'WealthWealthyx5', level: 0, category: 'AD', prereq: 'Status' };

Prerequisites.ZenArchery_requires_Bow20 = { target: 'ZenArchery', level: 20, category: 'SK', prereq: 'Bow' };
Prerequisites.ZenArchery_requires_TrainedbyaMaster = { target: 'ZenArchery', category: 'ADS', prereq: 'TrainedbyaMaster' };

/* Technique/Maneuver prerequisites (omit since I am not including Techniques/Maneuvers)
Prerequisites.ArmorWristLock_requires_Judo_pgroup1 = { target: 'ArmorWristLock', category: 'SK', prereq: 'Judo', pgroup: 1 };
Prerequisites.ArmorWristLock_requires_Wrestling_pgroup2 = { target: 'ArmorWristLock', category: ' SK', prereq: 'Wrestling', pgroup: 2 };
Prerequisites.BackKick_requires_Karate = { target: 'BackKick', category: 'SK', prereq: 'Karate' };
Prerequisites.Breakfall_requires_Judo = { target: 'Breakfall', category: 'SK', prereq: 'Judo' };
Prerequisites.ChokeHold_requires_Judo_pgroup1 = { target: 'ChokeHold', category: 'SK', prereq: 'Judo', pgroup: 1 };
Prerequisites.ChokeHold_requires_Wrestling_pgroup1 = { target: 'ChokeHold', category: ' SK', prereq: 'Wrestling', pgroup: 1 };
Prerequisites.CloseCombatKatana_requires_Katana = { target: 'CloseCombatKatana', category: 'SK', prereq: 'Katana' };
Prerequisites.CloseCombatKnife_requires_Knife = { target: 'CloseCombatKnife', category: 'SK', prereq: 'Knife' };
Prerequisites.CloseCombatWeapon_requires_Weapon = { target: 'CloseCombatWeapon', category: 'SK', prereq: 'Weapon' };
Prerequisites.DualWeaponAttackKatana_requires_Katana = { target: 'DualWeaponAttackKatana', category: 'SK', prereq: 'Katana' };
Prerequisites.DualWeaponAttackKnife_requires_Knife = { target: 'DualWeaponAttackKnife', category: 'SK', prereq: 'Knife' };
Prerequisites.DualWeaponAttackWeapon_requires_Weapon = { target: 'DualWeaponAttackWeapon', category: 'SK', prereq: 'Weapon' };
Prerequisites.ElbowStrike_requires_Karate = { target: 'ElbowStrike', category: 'SK', prereq: 'Karate' };
Prerequisites.FeintKarate_requires_Karate = { target: 'FeintKarate', category: 'SK', prereq: 'Karate' };
Prerequisites.FeintKatana_requires_Katana = { target: 'FeintKatana', category: 'SK', prereq: 'Katana' };
Prerequisites.FeintWeapon_requires_Weapon = { target: 'FeintWeapon', category: 'SK', prereq: 'Weapon' };
Prerequisites.GroundFightingJudo_requires_Judo = { target: 'GroundFightingJudo', category: 'SK', prereq: 'Judo' };
Prerequisites.GroundFightingKarate_requires_Karate = { target: 'GroundFightingKarate', category: 'SK', prereq: 'Karate' };
Prerequisites.HeadLock_requires_Judo_pgroup1 = { target: 'HeadLock', category: 'SK', prereq: 'Judo', pgroup: 1 };
Prerequisites.HeadLock_requires_Wrestling_pgroup1 = { target: 'HeadLock', category: ' SK', prereq: 'Wrestling', pgroup: 1 };
Prerequisites.HitLocationKarate_requires_Karate = { target: 'HitLocationKarate', category: 'SK', prereq: 'Karate' };
Prerequisites.HitLocationKatana_requires_Katana = { target: 'HitLocationKatana', category: 'SK', prereq: 'Katana' };
Prerequisites.HitLocationweapon_requires_Weapon = { target: 'HitLocationweapon', category: 'SK', prereq: 'Weapon' };
Prerequisites.HorseArchery_requires_Bow12 = { target: 'HorseArchery', level: 12, category: 'SK', prereq: 'Bow' };
Prerequisites.HorseArchery_requires_Riding12 = { target: 'HorseArchery', level: 12, category: 'SK', prereq: 'Riding' };
Prerequisites.Jab_requires_Boxing = { target: 'Jab', category: 'SK', prereq: 'Boxing' };
Prerequisites.JumpKick_requires_Karate = { target: 'JumpKick', category: 'SK', prereq: 'Karate' };
Prerequisites.Kicking_requires_Brawling_pgroup1 = { target: 'Kicking', category: ' SK', prereq: 'Brawling', pgroup: 1 };
Prerequisites.Kicking_requires_Karate_pgroup1 = { target: 'Kicking', category: 'SK', prereq: 'Karate', pgroup: 1 };
Prerequisites.KneeStrike_requires_Brawling_pgroup2 = { target: 'KneeStrike', category: ' SK', prereq: 'Brawling', pgroup: 2 };
Prerequisites.KneeStrike_requires_Karate_pgroup1 = { target: 'KneeStrike', category: 'SK', prereq: 'Karate', pgroup: 1 };
Prerequisites.OffHandWeaponTrainingKatana_requires_Katana = { target: 'OffHandWeaponTrainingKatana', category: 'SK', prereq: 'Katana' };
Prerequisites.OffHandWeaponTrainingKnife_requires_Knife = { target: 'OffHandWeaponTrainingKnife', category: 'SK', prereq: 'Knife' };
Prerequisites.OffHandWeaponTrainingWeapon_requires_Weapon = { target: 'OffHandWeaponTrainingWeapon', category: 'SK', prereq: 'Weapon' };
Prerequisites.RabbitPunch_requires_Brawling = { target: 'RabbitPunch', category: 'SK', prereq: 'Brawling' };
Prerequisites.RoundhousePunch_requires_Boxing_pgroup1 = { target: 'RoundhousePunch', category: ' SK', prereq: 'Boxing', pgroup: 1 };
Prerequisites.RoundhousePunch_requires_Brawling_pgroup1 = { target: 'RoundhousePunch', category: 'SK', prereq: 'Brawling', pgroup: 1 };
Prerequisites.SpinKick_requires_Karate = { target: 'SpinKick', category: 'SK', prereq: 'Karate' };
Prerequisites.StampKick_requires_Brawling_pgroup2 = { target: 'StampKick', category: ' SK', prereq: 'Brawling', pgroup: 2 };
Prerequisites.StampKick_requires_Karate_pgroup1 = { target: 'StampKick', category: 'SK', prereq: 'Karate', pgroup: 1 };
Prerequisites.SweepingKick_requires_Karate = { target: 'SweepingKick', category: 'SK', prereq: 'Karate' };
*/

/****  Skills  ****/
Skills = {};
// Skills.spacer = {};
// Skills.heading = { heading:'' };

// Make entries in fullSkillNameFor only for skills with multiple-word names.
// Absence will be interpreted to mean that the Weapon object key and the full name are identical.
var fullSkillNameFor = {
    AnimalHandling        : 'Animal Handling',
    AreaKnowledge         : 'Area Knowledge',
    AxeMace               : 'Axe/Mace',
    ArtificialIntelligence: 'Artificial Intelligence',
    AxeThrowing           : 'Axe Throwing',
    BeamWeapons           : 'Beam Weapons',
    BlackPowderWeapons    : 'Black Powder Weapons',
    BlindFighting         : 'Blind Fighting',
    BodyControl           : 'Body Control',
    BodyLanguage          : 'Body Language',
    BodySense             : 'Body Sense',
    BrainHacking          : 'Brain Hacking',
    BreakingBlow          : 'Breaking Blow',
    BreathControl         : 'Breath Control',
    ComputerHacking       : 'ComputerHacking',
    ComputerOperation     : 'Computer Operation',
    ComputerProgramming   : 'Computer Programming',
    DetectLies            : 'Detect Lies',
    ElectronicsOperation  : 'Electronics Operation',
    FastDraw              : 'Fast-Draw',
    FastTalk              : 'Fast-Talk',
    FireEating            : 'Fire Eating',
    FirstAid              : 'First Aid',
    FlyingLeap            : 'Flying Leap',
    ForceSword            : 'Force Sword',
    ForceWhip             : 'Force Whip',
    FortuneTelling        : 'Fortune-Telling',
    ForwardObserver       : 'Forward Observer',
    FreeFall              : 'Free Fall',
    FreightHandling       : 'Freight Handling',
    GroupPerformance      : 'Group Performance',
    HiddenLore            : 'Hidden Lore',
    ImmovableStance       : 'Immovable Stance',
    IntelligenceAnalysis  : 'Intelligence Analysis',
    InvisibilityArt       : 'Invisibility Art',
    JitteSai              : 'Jitte/Sai',
    KiteFlying            : 'Kite Flying',
    KnifeThrowing         : 'Knife Throwing',
    LightWalk             : 'Light Walk',
    MainGauche            : 'Main-Gauche',
    MentalStrength        : 'Mental Strength',
    MindBlock             : 'Mind Block',
    MonowireWhip          : 'Monowire Whip',
    MusicalComposition    : 'Musical Composition',
    MusicalInstrument     : 'Musical Instrument',
    ParryMissileWeapons   : 'Parry Missile Weapons',
    PowerBlow             : 'Power Blow',
    PressurePoints        : 'Pressure Points',
    PressureSecrets       : 'Pressure Secrets',
    RitualMagic           : 'Ritual Magic',
    SavoirFaire           : 'Savoir-Faire',
    SexAppeal             : 'Sex Appeal',
    ShortStaff            : 'Short Staff',
    SleightofHand         : 'Sleight of Hand',
    SpearThrower          : 'Spear Thrower',
    SpearThrowing         : 'Spear Throwing',
    SpeedReading          : 'Speed Reading',
    StaffSkill            : 'Staff',
    StageCombat           : 'Stage Combat',
    SumoWrestling         : 'Sumo Wrestling',
    SwayEmotions          : 'Sway Emotions',
    SymbolDrawing         : 'Symbol Drawing',
    ThrowingArt           : 'Throwing Art',
    ThrownWeapon          : 'Thrown Weapon',
    TwoHandedAxeMace      : 'Two-Handed Axe/Mace',
    TwoHandedSword        : 'Two-Handed Sword',
    VaccSuit              : 'Vacc Suit',
    WeirdScience          : 'Weird Science',
    ZenArchery            : 'Zen Archery',
}

Skills.Abacus = new Skill( "Abacus", 'IQ', 1, "CI153" );
Skills.Accounting = new Skill( 'Accounting', 'IQ', 2, "B3E58" );
Skills.Acrobatics = new Skill( 'Acrobatics', 'DX', 2, "B3E48" );
Skills.Acting = new Skill( 'Acting', 'IQ', 1, "B3E62" );
Skills.Administration = new Skill( 'Administration', 'IQ', 1, "B3E62" );
Skills.Agronomy = new Skill( 'Agronomy', 'IQ', 1, "B3E59" );
Skills.Agronomy.TLs =  true;
Skills.Airshipman = new Skill( "Airshipman", 'IQ', 2, "CI161" );
Skills.Airshipman.TLs = true;
Skills.Airshipman.minTL = 5;
Skills.Alchemy = new Skill( "Alchemy", 'IQ', 3, "CI148" );
Skills.Alchemy.TLs = true;
Skills.AnimalGuise = new Skill( "Animal Guise", 'IQ', 1, "CI152" );
Skills.AnimalHandling = new Skill( 'Animal Handling', 'IQ', 2, "B3E46" );
Skills.Anthropology = new Skill( 'Anthropology', 'IQ', 2, "B3E59" );
Skills.AppreciateBeauty = new Skill( "Appreciate Beauty", 'IQ', 3, "CI129" );
Skills.Archaeology = new Skill( 'Archaeology', 'IQ', 2, "B3E59" );
Skills.Architecture = new Skill( 'Architecture', 'IQ', 1, "B3E59" );
Skills.Architecture.TLs = true;
Skills.AreaKnowledge = new Skill( 'Area Knowledge', 'IQ', 0, "B3E62" );
Skills.AreaKnowledge.specRequiredList = [];
Skills.AreaKnowledge.shortname = "AK";
Skills.ArmouryTL5down = new Skill( 'Armoury (TL≤5)', 'IQ', 1, "B3E53" );
Skills.ArmouryTL5down.TLs = true;
Skills.ArmouryTL6plus = new Skill( 'Armoury (TL6+)', 'IQ', 1, "B3E53" );
Skills.ArmouryTL6plus.specRequiredList = ['Black powder hand weapons','Hand weapons','Armor',
    'Guns (black powder cannon, etc.)','Siege engines','Bows and arrows','Rifles and handguns',
    'Beam handguns','Vehicular weaponry','Spaceship weaponry','Artillery','Body armor',
    'Needle handguns','Airplane weaponry','Psi weaponry','Spaceship armor'];
Skills.ArmouryTL6plus.TLspecs = {
    'Black powder hand weapons':[4,5],
    'Hand weapons'    : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    'Armor'           : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    'Guns (black powder cannon, etc.)' : [4,5],
    'Siege engines'   : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    'Bows and arrows' : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    'Rifles and handguns'       : [5,6,7,8],
    'Beam handguns'                     : [9,10,11,12],
    'Vehicular weaponry'        : [5,6,7,8,9,10,11,12,13,14,15],
    'Spaceship weaponry'                : [9,10,11,12,13,14,15],
    'Artillery'           : [2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    'Body armor'      : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    'Needle handguns'                   : [9,10,11,12],
    'Airplane weaponry'           : [6,7,8,9,10,11,12],
    'Psi weaponry'    : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    'Spaceship armor'                   : [9,10,11,12,13,14,15]
    };
Skills.ArmouryTL6plus.TLs = true;
Skills.ArmouryTL6plus.minTL = 6;
Skills.Artist = new Skill( "Artist", 'IQ', 2, "B3E47" );
Skills.ArtificialIntelligence = new Skill( "Artificial Intelligence", 'IQ', 2, "CI155" );
Skills.ArtificialIntelligence.shortname = "AI";
Skills.ArtificialIntelligence.TLs = true;
Skills.ArtificialIntelligence.minTL = 7;
Skills.Astrogation = new Skill( 'Astrogation', 'IQ', 1, "B3E59" );
Skills.Astrogation.TLs = true;
Skills.Astrogation.minTL = 9;
Skills.Astrogation.specRequiredList = [];
Skills.Astronomy = new Skill( 'Astronomy', 'IQ', 2, "B3E60" );
Skills.Astronomy.TLs =  true;
Skills.Augury = new Skill( "Augury", 'IQ', 3, "CI137" );
Skills.Autohypnosis = new Skill( "Autohypnosis", 'IQ', 2, "CI137" );
Skills.Aviation = new Skill( "Aviation", 'IQ', 1, "CI153" );
Skills.Aviation.TLs = true;
Skills.Aviation.minTL = 6;
Skills.AxeMace = new Skill( 'Axe/Mace', 'DX', 1, "B3E49" );
Skills.AxeThrowing = new Skill( 'Axe Throwing', 'DX', 0, "B3E49" );

Skills.Bard = new Skill( "Bard", 'IQ', 1, "B3E47" );
Skills.BardicLore = new Skill( "Bardic Lore", 'IQ', 2, "CI146" );
Skills.Bartender = new Skill( "Bartender", 'IQ', 1, "CI153" );
Skills.Battlesuit = new Skill( 'Battlesuit', 'DX', 1, "B3E49" );
Skills.Battlesuit.TLs = true;
Skills.Battlesuit.minTL = 9;
Skills.BeamWeapons = new Skill( 'Beam Weapons', 'DX', 0, "B3E49" );
Skills.BeamWeapons.shortname = "BW";
// Skills.BeamWeapons.specRequiredList = ['Blaster Pistol','Laser Pistol','Stun Pistol','Blast Rifle',
//     'Laser Rifle','Military Laser Rifle','Stun Rifle','Disruptor Rifle'];  // where are these from? not Basic or Compendium
Skills.BeamWeapons.specRequiredList = ['Pistol','Rifle'];
Skills.BeamWeapons.TLs = true;
Skills.BeamWeapons.minTL = 8;
Skills.BeverageMaking = new Skill( "Beverage-Making", 'IQ', 0, "CI136" );
Skills.Bicycling = new Skill( "Bicycling", 'DX', 0, "B3E68" );
Skills.Biochemistry = new Skill( "Biochemistry", 'IQ', 3, "B3E60" );
Skills.Biochemistry.TLs = true;
Skills.Biochemistry.minTL = 5;
Skills.Blackjack = new Skill( "Blackjack", 'DX', 0, "B3E49" );
Skills.BlackPowderWeapons = new Skill( "Black Powder Weapons", 'DX', 0, "B3E49" );
Skills.BlackPowderWeapons.shortname = "BP Weapons";
Skills.BlackPowderWeapons.specRequiredList = [];
Skills.BlackPowderWeapons.TLs = true;
Skills.BlackPowderWeapons.minTL = 4;
Skills.Blacksmith = new Skill( 'Blacksmith', 'IQ', 1, "B3E53" );
Skills.BlindFighting = new Skill( "Blind Fighting", 'IQ', 3, "CI138" );
Skills.BlindingTouch = new Skill( "Blinding Touch", 'IQ', 3, "CI138" );
Skills.Blowpipe = new Skill( "Blowpipe", 'DX', 2, "B3E49" );
Skills.BlowpipeFukiya = new Skill( "Blowpipe (Fukiya)", 'DX', 0, "CI132" );
Skills.BlowpipeFukiya.shortname = "Fukiya";
Skills.Boating = new Skill( "Boating", 'DX', 1, "B3E68" );
Skills.BodyControl = new Skill( "Body Control", 'IQ', 3, "CI138" );
Skills.BodyLanguage = new Skill( "Body Language", 'IQ', 2, "CI132" );
Skills.BodySense = new Skill( "Body Sense", 'DX', 2, "B3E242; CI131" );
Skills.Bolas = new Skill( "Bolas", 'DX', 1, "B3E49" );
Skills.Botany = new Skill( "Botany", 'IQ', 2, "B3E60" );
Skills.Botany.TLs = true;
Skills.Bow = new Skill( 'Bow', 'DX', 2, "B3E50" );
Skills.BowandPalette = new Skill( "Bow and Palette", 'DX', 1, "CI152" );
Skills.Boxing = new Skill( 'Boxing', 'DX', 1, "B3E242; CI132" );
Skills.BrainHacking = new Skill( "Brain Hacking", 'IQ', 3, "CI160" );
Skills.BrainHacking.TLs = true;
Skills.BrainHacking.minTL = 8;
Skills.Brawling = new Skill( 'Brawling', 'DX', 0, "B3E50" );
Skills.BreakingBlow = new Skill( "Breaking Blow", 'IQ', 2, "CI138" );
Skills.BreathControl = new Skill( 'Breath Control', 'IQ', 3, "B3E48" );
Skills.Broadsword = new Skill( 'Broadsword', 'DX', 1, "B3E50" );
Skills.Buckler = new Skill( "Buckler", 'DX', 0, "B3E50" );
Skills.Bulldancing = new Skill( "Bulldancing", 'DX', 2, "CI128" );
Skills.Bullfighting = new Skill( "Bullfighting", 'DX', 1, "CI128" );

Skills.Calligraphy = new Skill( "Calligraphy", 'IQ', 1, "B3E47" );
Skills.Camouflage = new Skill( "Camouflage", 'IQ', 0, "B3E65" );
Skills.Captivate = new Skill( "Captivate", 'IQ', 2, "CI140" );
Skills.Carousing = new Skill( 'Carousing', 'HT', 1, "B3E63" );
Skills.Carpentry = new Skill( 'Carpentry', 'IQ', 0, "B3E53" );
Skills.Cartography = new Skill( "Cartography", 'IQ', 1, "CI155" );
Skills.Cartography.TLs = true;
Skills.Cartography.minTL = 1;
Skills.ChangeControl = new Skill( "Change Control", 'IQ', 2, "CI138" );
Skills.Chemistry = new Skill( "Chemistry", 'IQ', 2, "B3E60" );
Skills.Chemistry.TLs = true;
Skills.Chemistry.minTL = 5;
Skills.Chess = new Skill( "Chess", 'IQ', 0, "CI145" );
Skills.ChiTreatment = new Skill( "Chi Treatment", 'IQ', 2, "CI138" );
Skills.Choreography = new Skill( "Choreography", 'IQ', 1, "CI129" );
Skills.Climbing = new Skill( 'Climbing', 'DX', 1, "B3E57" );
Skills.Cloak = new Skill( "Cloak", 'DX', 1, "B3E242; CI132" );
Skills.ComputerHacking = new Skill( "Computer Hacking", 'IQ', 3, "B3E245; CI155" );
Skills.ComputerHacking.shortname = "Hacking";
Skills.ComputerHacking.TLs = true;
Skills.ComputerHacking.minTL = 7;
Skills.ComputerOperation = new Skill( 'Computer Operation', 'IQ', 0, "B3E58" );
Skills.ComputerOperation.shortname = "Computer Op";
Skills.ComputerOperation.TLs = true;
Skills.ComputerOperation.minTL = 7;
Skills.ComputerProgramming = new Skill( "Computer Programming", 'IQ', 1, "B3E60" );
Skills.ComputerProgramming.shortname = "Programming";
Skills.ComputerProgramming.TLs = true;
Skills.ComputerProgramming.minTL = 7;
Skills.Conducting = new Skill( "Conducting", 'IQ', 1, "CI129" );
Skills.ConspiracyTheory = new Skill( "Conspiracy Theory", 'IQ', 3, "CI155" );
Skills.Cooking = new Skill( 'Cooking', 'IQ', 0, "B3E53" );
Skills.Cooperage = new Skill( "Cooperage", 'IQ', 0, "CI136" );
Skills.Courtesan = new Skill( "Courtesan", 'IQ', 1, "CI153" );
Skills.Criminology = new Skill( "Criminology", 'IQ', 1, "B3E60" );
Skills.Criminology.TLs = true;
Skills.Crossbow = new Skill( 'Crossbow', 'DX', 0, "B3E49" );
Skills.Cryptanalysis = new Skill( "Cryptanalysis", 'IQ', 2, "B3E245; CI156" );
Skills.Cryptanalysis.TLs = true;
Skills.Cryptanalysis.minTL = 3;
Skills.Cryptography = new Skill( "Cryptography", 'IQ', 2, "CI156" );
Skills.Cryptography.TLs = true;
Skills.Cryptography.minTL = 3;
Skills.Cryptology = new Skill( "Cryptology", 'IQ', 2, "CI156" );
Skills.Cryptology.TLs = true;
Skills.Cryptology.minTL = 3;
Skills.Cyberaxe = new Skill( "Cyberaxe", 'IQ', 2, "CI129" );
Skills.Cyberaxe.TLs = true;
Skills.Cyberaxe.minTL = 8;
Skills.CyberdeckOperation = new Skill( "Cyberdeck Operation", 'IQ', 3, "CI153" );
Skills.CyberdeckOperation.shortname = "Cyberdeck Op";
Skills.CyberdeckOperation.TLs = true;
Skills.CyberdeckOperation.minTL = 8;
Skills.Cyphering = new Skill( "Cyphering", 'IQ', 0, "CI156" );

Skills.Dancing = new Skill( "Dancing", 'DX', 1, "B3E47" );
Skills.Darts = new Skill( "Darts", 'DX', 0, "CI145" );
Skills.Demolition = new Skill( "Demolition", 'IQ', 1, "B3E65" );
Skills.Demolition.TLs = true;
Skills.Demolition.minTL = 4;
Skills.DetectLies = new Skill( 'Detect Lies', 'IQ', 2, "B3E65" );
Skills.Diagnosis = new Skill( "Diagnosis", 'IQ', 2, "B3E56" );
Skills.Diagnosis.TLs = true;
Skills.Diplomacy = new Skill( "Diplomacy", 'IQ', 2, "B3E63" );
Skills.Directing = new Skill( "Directing", 'IQ', 2, "CI129" );
Skills.Disguise = new Skill( "Disguise", 'IQ', 1, "B3E65" );
Skills.Dislocating = new Skill( "Dislocating", 'DX', 2, "CI138" );
Skills.Distilling = new Skill( "Distilling", 'IQ', 1, "CI136" );
Skills.Dreaming = new Skill( "Dreaming", 'IQ', 3, "CI139" );
Skills.Driving = new Skill( 'Driving', 'DX', 1, "B3E68" );
Skills.Driving.TLs = true;
Skills.Driving.minTL = 6;
Skills.Driving.specRequiredList = ['Stock car', 'Racing vehicle', '18-wheeler', 'Hovercraft',
    'Construction equipment', 'All-Terrain Vehicle', 'Tank'];
Skills.DrunkenFighting = new Skill( "Drunken Fighting", 'DX', 2, "CI139" );
Skills.Dyeing = new Skill( "Dyeing", 'IQ', 1, "CI136" );

Skills.Ecology = new Skill( "Ecology", 'IQ', 2, "B3E60" );
Skills.Ecology.TLs = true;
Skills.Economics = new Skill( "Economics", 'IQ', 2, "B3E60" );
// Skills.Electrician = new Skill( "Electrician", 'IQ', 1 );
// Skills.Electrician.TLs = true;
Skills.Electronics = new Skill( 'Electronics', 'IQ', 2, "B3E60" );
Skills.Electronics.specRequiredList = ['Communications','Computers','Force Shields','Holographics',
    'Matter Transmitters','Medical','Security Systems','Sensors','Weapons'];
Skills.Electronics.TLs = true;
Skills.Electronics.minTL = 7;
Skills.ElectronicsOperation = new Skill( 'Electronics Operation', 'IQ', 1, "B3E58" );
Skills.ElectronicsOperation.shortname = "Electronics Op";
Skills.ElectronicsOperation.specRequiredList = ['Communications','Computers','Force Shields',
    'Holographics','Matter Transmitters','Medical','Security Systems','Sensors','Weapons'];
Skills.ElectronicsOperation.TLs = true;
Skills.ElectronicsOperation.minTL = 7;
Skills.Engineer = new Skill( "Engineer", 'IQ', 2, "B3E60" );
Skills.Engineer.TLs = true;
Skills.Engineer.specRequiredList = ['Primitive machines','Mining','Vehicles','Bombs and Traps',
    'Plumbing','Clockwork','Electrical','Combat','Guns'];
Skills.EquestrianAcrobatics = new Skill( "Equestrian Acrobatics", 'DX', 2, "CI128" );
Skills.EroticArt = new Skill( "Erotic Art", 'DX', 2, "CI159" );
Skills.Escape = new Skill( "Escape", 'DX', 2, "B3E65" );
Skills.Exorcism = new Skill( "Exorcism", 'IQ', 2, "CI153" );
Skills.Exoskeleton = new Skill( "Exoskeleton", 'DX', 1, "B3E247; CI161" );
Skills.Exoskeleton.TLs = true;
Skills.Exoskeleton.minTL = 9;
Skills.ExplosiveOrdinanceDisposal = new Skill( "Explosive Ordinance Disposal", 'IQ', 2, "CI150" );
Skills.ExplosiveOrdinanceDisposal.shortname = "EOD";
Skills.ExplosiveOrdinanceDisposal.TLs = true;
Skills.ExplosiveOrdinanceDisposal.minTL = 5;

Skills.Falconry = new Skill( 'Falconry', 'IQ', 1, "B3E46" );
Skills.Fanning = new Skill( "Fanning", 'DX', 0, "CI133" );
Skills.Fanning.minTL = 5;
Skills.FastDraw = new Skill( 'Fast-Draw', 'DX', 0, "B3E50" );
Skills.FastDraw.specRequiredList = [ 'Arrow', 'Blackjack', 'Knife', 'Knife from Teeth', 'Magazine',
                                     'Pistol', 'Rifle', 'Speedloader', 'Sword', 'Two-Handed Sword' ];
Skills.FastTalk = new Skill( 'Fast-Talk', 'IQ', 1, "B3E63" );
Skills.Featherworking = new Skill( "Featherworking", 'IQ', 1, "CI129" );
Skills.Fencing = new Skill( 'Fencing', 'DX', 1, "B3E50" );
Skills.FightChoreography = new Skill( "Fight Choreography", 'IQ', 1, "CI129" );
Skills.Filch = new Skill( "Filch", 'DX', 1, "CI161" );
Skills.FireEating = new Skill( "Fire Eating", 'DX', 1, "CI129" );
Skills.FireSiphon = new Skill( "Fire-Siphon", 'DX', 1, "CI134" );
Skills.FireWalking = new Skill( "Fire Walking", 'IQ', 2, "CI140" );
Skills.Fireworks = new Skill( "Fireworks", 'IQ', 2, "CI136" );
Skills.Fireworks.TLs = true;
Skills.Fireworks.minTL = 4;
Skills.FirstAid = new Skill( 'First Aid', 'IQ', 0, "B3E56" );
Skills.FirstAid.TLs =  true;
Skills.Fishing = new Skill( 'Fishing', 'IQ', 0, "B3E57" );
Skills.Flail = new Skill( 'Flail', 'DX', 2, "B3E50" );
Skills.Flight = new Skill( "Flight", 'DX', 1, "B3E242; CI131" );
Skills.Flight.specRequiredList = ['Gliding','Winged','Unwinged'];
Skills.FlintSparking = new Skill( "Flint Sparking", 'DX', 0, "CI152" );
Skills.FlowerArranging = new Skill( "Flower Arranging", 'IQ', 0, "CI129" );
Skills.FlyingFists = new Skill( "Flying Fists", 'IQ', 3, "CI140" );
Skills.FlyingLeap = new Skill( "Flying Leap", 'IQ', 2, "CI140" );
Skills.ForceShield = new Skill( 'Force Shield', 'DX', 0, "B3E50" );
Skills.ForceShield.TLs = true;
Skills.ForceShield.minTL = 11;
Skills.ForceSword = new Skill( 'Force Sword', 'DX', 1, "B3E50" );
Skills.ForceSword.TLs = true;
Skills.ForceSword.minTL = 11;
Skills.ForceWhip = new Skill( "Force Whip", 'DX', 1, "CI134" );
Skills.ForceWhip.TLs = true;
Skills.ForceWhip.minTL = 11;
Skills.Forensics = new Skill( "Forensics", 'IQ', 2, "B3E61" );
Skills.Forensics.TLs = true;
Skills.Forensics.minTL = 4;
Skills.Forgery = new Skill( 'Forgery', 'IQ', 2, "B3E65" );
Skills.Forgery.TLs = true;
Skills.Fortunetelling = new Skill( "Fortune Telling", 'IQ', 1, "CI154" );
Skills.ForwardObserver = new Skill( "Forward Observer", 'IQ', 1, "B3E243; CI151" );
Skills.ForwardObserver.TLs = true;
Skills.ForwardObserver.minTL = 6;
Skills.FreeFall = new Skill( 'Free Fall', 'DX', 1, "B3E48" );
Skills.FreeFall.minTL = 7;
Skills.FreightHandling = new Skill( 'Freight Handling', 'IQ', 1, "B3E46" );

Skills.Gambling = new Skill( 'Gambling', 'IQ', 1, "B3E63" );
Skills.Games = new Skill( "Game", 'IQ', 0, "B3E243; CI145" );
Skills.Games.specRequiredList = [];
Skills.Gardening = new Skill( "Gardening", 'IQ', 0, "CI129" );
Skills.Garrote = new Skill( "Garrote", 'DX', 0, "CI134" );
Skills.Genetics = new Skill( "Genetics", 'IQ', 3, "B3E61" );
Skills.Genetics.TLs = true;
Skills.Gesture = new Skill( "Gesture", 'IQ', 0, "B3E55" );
Skills.Geology = new Skill( "Geology", 'IQ', 2, "B3E61" );
Skills.Geology.TLs = true;
Skills.GlassBlowing = new Skill( "Glass Blowing", 'DX', 2, "CI136" );
// Skills.GroupPerformance = new Skill( 'Group Performance', 'IQ', 1 );
Skills.Gunner = new Skill( 'Gunner', 'DX', 1, "B3E50" );
Skills.Gunner.TLs = true;
Skills.Gunner.minTL = 2;
Skills.Gunner.specRequiredList = ['arbalest','catapult','machine gun','mechanical machine gun',
      'rocket launcher/ATGM','mortar','laser','recoilless rifle','naval cannon','tank cannon'];
Skills.Guns = new Skill( 'Guns', 'DX', 0, "B3E51" );
Skills.Guns.TLs = true;
Skills.Guns.minTL = 4;
Skills.Guns.specRequiredList = ['Rifle','Shotgun','Light Automatic','Pistol','Machine Pistol',
      'Grenade Launcher','Light Antitank Weapon (LAW)','Flamethrower'];

Skills.HandofDeath = new Skill( "Hand of Death", 'IQ', 3, "CI140" );
Skills.HardHatDiving = new Skill( "Hard-Hat Diving", 'IQ', 1, "B3E244; CI152" );
Skills.HardHatDiving.TLs = true;
Skills.HardHatDiving.minTL = 6;
Skills.Harpoon = new Skill( "Harpoon", 'DX', 2, "CI134" );
Skills.Heraldry = new Skill( "Heraldry", 'IQ', 1, "B3E58" );
Skills.Herbalist = new Skill( "Herbalist", 'IQ', 2, "CI150" );
Skills.Herbary = new Skill( "Herbary", 'IQ', 1, "CI150" );
Skills.HerbaryMiraculous = new Skill( "Herbary (Miraculous)", 'IQ', 3, "CI150" );
Skills.HiddenLore = new Skill( "Hidden Lore", 'IQ', 1, "CI147" );
Skills.HiddenLore.specRequiredList = [];
Skills.Hiking = new Skill( "Hiking", 'DX', 1, "B3E244; CI152" );
Skills.History = new Skill( "History", 'IQ', 2, "B3E61" );
Skills.HistoryEsoteric = new Skill( "Esoteric History", 'IQ', 0, "CI157" );
Skills.Holdout = new Skill( "Holdout", 'IQ', 1, "B3E66" );
Skills.Hydrology = new Skill( "Hydrology", 'IQ', 1, "CI157" );
Skills.HyperspacePhysics = new Skill( "Hyperspace Physics", 'IQ', 3, "CI157" );
Skills.HyperspacePhysics.shortname = "Hyperphysics";
Skills.HyperspacePhysics.TLs = true;
Skills.HyperspacePhysics.minTL = 10;
Skills.HypnoticHands = new Skill( "Hypnotic Hands", 'IQ', 2, "CI141" );
Skills.Hypnotism = new Skill( "Hypnotism", 'IQ', 2, "B3E56" );

Skills.Illumination = new Skill( "Illumination", 'DX', 1, "CI129" );
Skills.IllusionArt = new Skill( "Illusion Art", 'IQ', 2, "CI148" );
Skills.ImmovableStance = new Skill( "Immovable Stance", 'DX', 2, "CI141" );
Skills.InertialessAgility = new Skill( "Inertialess Agility", 'DX', 2, "CI131" );
Skills.InertialessAgility.minTL = 9;
Skills.IntelligenceAnalysis = new Skill( "Intelligence Analysis", 'IQ', 2, "B3E66; CI161" );
Skills.IntelligenceAnalysis.shortname = "Intel";
Skills.Intimidation = new Skill( 'Intimidation', 'IQ', 1, "B3E246; CI159" );
Skills.Interrogation = new Skill( "Interrogation", 'IQ', 1, "B3E66" );
Skills.InvisibilityArt = new Skill( "Invisibility Art", 'IQ', 3, "CI141" );

Skills.Jeweler = new Skill( 'Jeweler', 'IQ', 2, "B3E53" );
Skills.Jeweler.TLs = true;
Skills.JitteSai = new Skill( "Jitte/Sai", 'DX', 1, "CI134" );
Skills.Judo = new Skill( 'Judo', 'DX', 2, "B3E51" );
Skills.Juggling = new Skill( "Juggling", 'DX', 0, "CI131" );
Skills.Jumping = new Skill( "Jumping", 'DX', 0, "B3E48" );

Skills.Katana = new Skill( "Katana", 'DX', 1, "CI134" );
Skills.Karate = new Skill( 'Karate', 'DX', 2, "B3E51" );
Skills.Kiai = new Skill( "Kiai", 'DX', 2, "CI141" );
Skills.KiteFlying = new Skill( "Kite Flying", 'DX', 0, "CI145" );
Skills.Kicking = new Skill( "Kicking", 'T', 2, 'CI170' );
Skills.Kicking.techniqueDefaultPenalty = -2;
Skills.Kicking.maxRelLevel = 0;
Skills.Kicking.specRequiredList = ['Brawling','Karate'];
Skills.Knife = new Skill( 'Knife', 'DX', 0, "B3E51" );
Skills.KnifeThrowing = new Skill( 'Knife Throwing', 'DX', 0, "B3E51" );
Skills.Kusari = new Skill( "Kusari", 'DX', 2, "CI134" );

Skills.Lance = new Skill( "Lance", 'DX', 1, "B3E51" );
Skills.Lasso = new Skill( "Lasso", 'DX', 1, "B3E51" );
Skills.Law = new Skill( "Law", 'IQ', 2, "B3E58" );
Skills.Leadership = new Skill( 'Leadership', 'IQ', 1, "B3E63" );
Skills.Leatherworking = new Skill( 'Leatherworking', 'IQ', 0, "B3E53" );
Skills.Lifting = new Skill( "Lifting", 'ST', 2, "CI132" );
Skills.LightWalk = new Skill( "Light Walk", 'IQ', 2, "CI142" );
Skills.Linguistics = new Skill( "Linguistics", 'IQ', 3, "B3E61" );
Skills.LipReading = new Skill( "Lip Reading", 'IQ', 1, "B3E66" );
Skills.Literature = new Skill( "Literature", 'IQ', 2, "B3E61" );
Skills.Lockpicking = new Skill( 'Lockpicking', 'IQ', 1, "B3E67" );
Skills.Lockpicking.TLs =  true;
Skills.Lockpicking.minTL =  2;
Skills.LowGFlight = new Skill( "Low-G Flight", 'DX', 1, "CI132" );
Skills.LowGFlight.TLs = true;
Skills.LowGFlight.minTL = 9;
Skills.LucidDreaming = new Skill( "Lucid Dreaming", 'IQ', 0, "CI142" );

Skills.MagicBreath = new Skill( "Magic Breath", 'DX', 0, "CI148" );
Skills.MagicJet = new Skill( "Magic Jet", 'DX', 0, "CI148" );
Skills.MainGauche = new Skill( "Main-Gauche", 'DX', 1, "CI134" );
Skills.MakeUp = new Skill( "Make-Up", 'IQ', 0, "CI129" );
Skills.MakeUp.TLs = true;
Skills.Masonry = new Skill( "Masonry", 'DX', 0, "CI136" );
Skills.Mathematics = new Skill( 'Mathematics', 'IQ', 2, "B3E61" );
Skills.Mathematics.TLs =  true;
Skills.Mathematics.minTL =  1;
Skills.Mechanic = new Skill( 'Mechanic', 'IQ', 1, "B3E54" );
Skills.Mechanic.TLs =  true;
Skills.Mechanic.specRequiredList = ['Wagon', 'Steam engine', 'Clockwork and small gadgets',
    'Small electric motor', 'Gasoline engine',  'Propellor plane engine', 'Jet plane engine',
    'Hovercraft engine', 'Fuel cell/electric motor', 'Ocean-going vessel', 'Spaceship drive',
    'Starship drive', 'Robotics'];
Skills.Meditation = new Skill( "Meditation", 'IQ', 2, "CI142" );
Skills.MeditationCinematic = new Skill( "Meditation (cinematic)", 'IQ', 3, "CI142" );
Skills.MentalStrength = new Skill( "Mental Strength", 'IQ', 2, "CI142" );
Skills.Merchant = new Skill( 'Merchant', 'IQ', 1, "B3E64" );
Skills.Metallurgy = new Skill( 'Metallurgy', 'IQ', 2, "B3E61" );
Skills.Metallurgy.TLs = true;
Skills.Meteorology = new Skill( 'Meteorology', 'IQ', 1, "B3E61" );
Skills.Meteorology.TLs = true;
Skills.Mimicry = new Skill( "Mimicry", 'HT', 2, "CI152" );
Skills.Mimicry.specRequiredList = ['Human Speech', 'Bird Calls', 'Animal Sounds'];
Skills.MindBlock = new Skill( "Mind Block", 'IQ', 1, "B3E244; CI155" );
Skills.MonowireWhip = new Skill( "Monowire Whip", 'DX', 2, "CI135" );
Skills.MonowireWhip.minTL = 9;
Skills.Motorcycle = new Skill( "Motorcycle", 'DX', 0, "B3E69" );
Skills.Motorcycle.specRequiredList = ['motor-scooters/light cycles', 'medium and heavy cycles'];
Skills.Motorcycle.minTL = 6;
Skills.MountainHeart = new Skill( "Mountain Heart", 'IQ', 3, "CI142" );
Skills.MuscleReading = new Skill( "Muscle Reading", 'IQ', 3, "CI143" );
Skills.MusicalComposition = new Skill( "Musical Composition", 'IQ', 2, "CI129" );
Skills.MusicalComposition.shortname = "Composition";
Skills.MusicalInstrument = new Skill( "Musical Instrument", 'IQ', 2, "B3E47" );
Skills.MusicalInstrument.shortname = "Instrument";
Skills.MusicalInstrument.specRequiredList = [];
Skills.MusicalNotation = new Skill( "Musical Notation", 'IQ', 0, "CI154" );

Skills.Naturalist = new Skill( 'Naturalist', 'IQ', 2, "B3E57" );
Skills.Navigation = new Skill( 'Navigation', 'IQ', 3, "B3E57" );
Skills.Navigation.TLs = true;
Skills.Needlecraft = new Skill( "Needlecraft", 'DX', 1, "CI137" );
Skills.NeiTan = new Skill( "Nei Tan", 'IQ', 3, "CI143" );
Skills.Net = new Skill( "Net", 'DX', 2, "B3E51" );
Skills.Netmaking = new Skill( "Netmaking", 'DX', 0, "CI137" );
Skills.Neurophon = new Skill( "Neurophon", 'IQ', 3, "CI130" );
Skills.NoLandingExtraction = new Skill( "No-Landing Extraction", 'IQ', 1, "B3E243; CI151" );
Skills.NoLandingExtraction.minTL = 7;
Skills.NBCWarfare = new Skill( "Nuclear-Biological-Chemical Warfare", 'IQ', 1, "B3E243; CI151" );
Skills.NBCWarfare.shortname = "NBC Warfare";
Skills.NBCWarfare.TLs = true;
Skills.NBCWarfare.minTL = 6;
Skills.NuclearPhysics = new Skill( 'Nuclear Physics', 'IQ', 3, "B3E61" );
Skills.NuclearPhysics.TLs = true;
Skills.NuclearPhysics.minTL = 7;

Skills.Occultism = new Skill( "Occultism", 'IQ', 1, "B3E61" );
Skills.OpenDressDiving = new Skill( "Open-Dress Diving", 'IQ', 1, "CI152" );
Skills.OpenDressDiving.TLs = true;
Skills.OpenDressDiving.minTL = 6;
Skills.OralLiterature = new Skill( "Oral Literature", 'IQ', 2, "CI157" );
Skills.Orienteering = new Skill( "Orienteering", 'IQ', 1, "B3E244; CI153" );
Skills.Origami = new Skill( "Origami", 'IQ', 0, "CI130" );

Skills.Packing = new Skill( 'Packing', 'IQ', 2, "B3E46" );
Skills.Paleontology = new Skill( "Paleontology", 'IQ', 2, "CI157" );
// Skills.Paleontology.specRequiredList = ['Paleozoology','Paleobotany','Paleoanthropology','Micropaleontology'];
Skills.Panhandling = new Skill( "Panhandling", 'IQ', 0, "CI154" );
Skills.Parachuting = new Skill( "Parachuting", 'DX', 0, "B3E48" );
Skills.Parachuting.minTL = 6;
Skills.Paraphysics = new Skill( "Paraphysics", 'IQ', 3, "CI157" );
Skills.Paraphysics.TLs = true;
Skills.Paraphysics.minTL = 10;
Skills.ParryMissileWeapons = new Skill( "Parry Missile Weapons", 'DX', 2, "CI135" );
Skills.ParryMissileWeapons.shortname = "Parry Missiles";
Skills.Performance = new Skill( "Performance", 'IQ', 1, "B3E64" );
Skills.PerformanceRitual = new Skill( "Performance/Ritual", 'IQ', 1, "CI147" );  // don't think this should exist as a separate skill
Skills.PerformanceRitual.specRequiredList = [];
Skills.Persuade = new Skill( "Persuade", 'IQ', 1, "CI139" );
Skills.Pharmacy = new Skill( "Pharmacy", 'IQ', 2, "CI150" );
Skills.Pharmacy.TLs = true;
Skills.Philosophy = new Skill( "Philosophy", 'IQ', 2, "B3E245; CI157" );
Skills.Photography = new Skill( "Photography", 'IQ', 1, "B3E47" );
Skills.Photography.TLs = true;
Skills.Photography.minTL = 5;
Skills.Photonics = new Skill( "Photonics", 'IQ', 2, "CI157" );
Skills.Photonics.TLs = true;
Skills.Photonics.minTL = 8;
Skills.Photonics.specRequiredList = [];
Skills.Physician = new Skill( 'Physician', 'IQ', 2, "B3E56" );
Skills.Physician.TLs = true;
Skills.Physics = new Skill( 'Physics', 'IQ', 2, "B3E61" );
Skills.Physics.TLs = true;
Skills.Physics.minTL = 4;
Skills.Physiology = new Skill( "Physiology", 'IQ', 3, "B3E61" );
Skills.Physiology.TLs = true;
Skills.Physiology.minTL = 4;
Skills.Pickpocket = new Skill( 'Pickpocket', 'DX', 2, "B3E67" );
Skills.PictureWriting = new Skill( "Picture-Writing", 'IQ', 2, "CI130" );
Skills.PictureWriting.specRequiredList = [];
Skills.PictureWriting.specCategName = 'pictographic language';
Skills.Piloting = new Skill( "Piloting", 'DX', 1, "B3E69" );
Skills.Piloting.TLs = true;
Skills.Piloting.minTL = 5;
Skills.Piloting.specRequiredList = ['Ultralight or hang-glider','Glider','Single-engine prop',
    'Twin-engine prop','Multi-engine prop','Multi-engine jet','Military (fighter) jet',
    'Small private jet','Small helicopter','Large helicopter','Space shuttle','Hot-air balloon',
    'Contragravity craft','Contragravity belt','Fighter spacecraft','Large spacecraft'];
Skills.Planetology = new Skill( "Planetology", 'IQ', 1, "B3E245; CI157" );
Skills.Planetology.TLs = true;
Skills.Planetology.minTL = 9;
Skills.Planetology.specRequiredList = ['Rock/Ice Worlds','Earth-like','Hostile Terrestrial','Gas Giants'];
Skills.Poetry = new Skill( "Poetry", 'IQ', 1, "B3E47" );
Skills.Poisons = new Skill( "Poisons", 'IQ', 2, "B3E67" );
Skills.Polearm = new Skill( 'Polearm', 'DX', 1, "B3E51" );
Skills.Politics = new Skill( "Politics", 'IQ', 1, "B3E64" );
Skills.Pottery = new Skill( 'Pottery', 'IQ', 1, "B3E54" );
Skills.Powerboat = new Skill( "Powerboat", 'DX', 1, "B3E69" );
Skills.Powerboat.TLs = true;
Skills.Powerboat.minTL = 6;
Skills.PowerBlow = new Skill( "Power Blow", 'IQ', 2, "CI143" );
Skills.PrecognitiveParry = new Skill( "Precognitive Parry", 'IQ', 2, "CI143" );
Skills.PrecognitiveParry.shortname = "Precog Parry";
Skills.PressurePoints = new Skill( "Pressure Points", 'IQ', 2, "CI144" );
Skills.PressureSecrets = new Skill( "Pressure Secrets", 'IQ', 3, "CI144" );
Skills.ProbabilityPhysics = new Skill( "Probability Physics", 'IQ', 3, "CI158" );
Skills.ProbabilityPhysics.TLs = true;
Skills.ProbabilityPhysics.minTL = 10;
Skills.ProfessionalSkill = new Skill( 'Professional Skill', 'IQ', 1, "B3E62" );
Skills.ProfessionalSkill.specRequiredList = [];
Skills.Prospecting = new Skill( 'Prospecting', 'IQ', 1, "B3E62" );
Skills.Prospecting.TLs = true;
Skills.Psionics = new Skill( "Psionics", 'IQ', 3, "CI158" );
Skills.Psionics.TLs = true;
Skills.Psychology = new Skill( "Psychology", 'IQ', 2, "B3E62" );
Skills.Punning = new Skill( "Punning", 'IQ', 1, "CI130" );
Skills.Push = new Skill( "Push", 'DX', 2, "CI144" );


Skills.Research = new Skill( "Research", 'IQ', 1, "B3E62" );
Skills.Research.minTL = 2;
Skills.Riding = new Skill( 'Riding', 'DX', 1, "B3E46; CI128" );
Skills.Riding.specRequiredList = [];
Skills.RitualMagic = new Skill( "Ritual Magic", 'IQ', 3, "CI144" );
Skills.RitualMagic.specRequiredList = [];
Skills.RitualsandCeremonies = new Skill( "Rituals and Ceremonies", 'IQ', 2, "CI147" );
Skills.RuneLore = new Skill( "Rune-Lore", 'IQ', 3, "CI149" );
Skills.RuneLore.specRequiredList = [];
// Rune skills
Skills.RuneVerbCreate = new Skill( "Rune: Create", 'IQ', 2, "CI149" );
Skills.RuneVerbCreate.specRequiredList = [];
Skills.RuneVerbControl = new Skill( "Rune: Control", 'IQ', 2, "CI149" );
Skills.RuneVerbControl.specRequiredList = [];
Skills.RuneVerbHeal = new Skill( "Rune: Heal", 'IQ', 2, "CI149" );
Skills.RuneVerbHeal.specRequiredList = [];
Skills.RuneVerbTransform = new Skill( "Rune: Transform", 'IQ', 2, "CI149" );
Skills.RuneVerbTransform.specRequiredList = [];
Skills.RuneVerbSense = new Skill( "Rune: Sense", 'IQ', 2, "CI149" );
Skills.RuneVerbSense.specRequiredList = [];
Skills.RuneVerbCommunicate = new Skill( "Rune: Communicate", 'IQ', 1, "CI149" );
Skills.RuneVerbCommunicate.specRequiredList = [];
Skills.RuneVerbWeaken = new Skill( "Rune: Weaken", 'IQ', 1, "CI149" );
Skills.RuneVerbWeaken.specRequiredList = [];
Skills.RuneVerbStrengthen = new Skill( "Rune: Strengthen", 'IQ', 1, "CI149" );
Skills.RuneVerbStrengthen.specRequiredList = [];
Skills.RuneVerbMove = new Skill( "Rune: Move", 'IQ', 1, "CI149" );
Skills.RuneVerbMove.specRequiredList = [];
Skills.RuneVerbProtect = new Skill( "Rune: Protect", 'IQ', 1, "CI149" );
Skills.RuneVerbProtect.specRequiredList = [];
Skills.RuneVerbWarn = new Skill( "Rune: Warn", 'IQ', 1, "CI149" );
Skills.RuneVerbWarn.specRequiredList = [];
Skills.RuneNounEarth = new Skill( "Rune: Earth", 'IQ', 2, "CI149" );
Skills.RuneNounEarth.specRequiredList = [];
Skills.RuneNounAnimal = new Skill( "Rune: Animal", 'IQ', 2, "CI149" );
Skills.RuneNounAnimal.specRequiredList = [];
Skills.RuneNounMagic = new Skill( "Rune: Magic", 'IQ', 2, "CI149" );
Skills.RuneNounMagic.specRequiredList = [];
Skills.RuneNounBodyMan = new Skill( "Rune: Body", 'IQ', 2, "CI149" );
Skills.RuneNounBodyMan.specRequiredList = [];
Skills.RuneNounMind = new Skill( "Rune: Mind", 'IQ', 2, "CI149" );
Skills.RuneNounMind.specRequiredList = [];
Skills.RuneNounUndead = new Skill( "Rune: Undead", 'IQ', 2, "CI149" );
Skills.RuneNounUndead.specRequiredList = [];
Skills.RuneNounAir = new Skill( "Rune: Air", 'IQ', 1, "CI149" );
Skills.RuneNounAir.specRequiredList = [];
Skills.RuneNounFire = new Skill( "Rune: Fire", 'IQ', 1, "CI149" );
Skills.RuneNounFire.specRequiredList = [];
Skills.RuneNounWater = new Skill( "Rune: Water", 'IQ', 1, "CI149" );
Skills.RuneNounWater.specRequiredList = [];
Skills.RuneNounPlant = new Skill( "Rune: Plant", 'IQ', 1, "CI149" );
Skills.RuneNounPlant.specRequiredList = [];
Skills.RuneNounIllusion = new Skill( "Rune: Illusion", 'IQ', 1, "CI149" );
Skills.RuneNounIllusion.specRequiredList = [];
Skills.RuneNounLightDark = new Skill( "Rune: Light/Dark", 'IQ', 1, "CI149" );
Skills.RuneNounLightDark.specRequiredList = [];
Skills.RuneNounFood = new Skill( "Rune: Food", 'IQ', 0, "CI149" );
Skills.RuneNounFood.specRequiredList = [];
Skills.RuneNounSound = new Skill( "Rune: Sound", 'IQ', 0, "CI149" );
Skills.RuneNounSound.specRequiredList = [];
Skills.Running = new Skill( 'Running', 'HT', 2, "B3E48" );

Skills.Sacrifice = new Skill( "Sacrifice", 'IQ', 2, "CI147" );
Skills.Sailor = new Skill( "Sailor", 'IQ', 1, "CI154" );
Skills.Sailor.TLs = true;
Skills.SavoirFaire = new Skill( 'Savoir-Faire', 'IQ', 0, "B3E64" );
Skills.SavoirFaireDojo = new Skill( 'Savoir-Faire (Dojo)', 'IQ', 0, "CI160" );
Skills.SavoirFaireMilitary = new Skill( 'Savoir-Faire (Military)', 'IQ', 0, "CI160" );
Skills.SavoirFaireServant = new Skill( 'Savoir-Faire (Servant)', 'IQ', 0, "CI160" );
Skills.SceneDesign = new Skill( "Scene Design", 'IQ', 1, "CI130" );
Skills.Science = new Skill( "Science!", 'IQ', 3, "CI158" );
Skills.Scrounging = new Skill( 'Scrounging', 'IQ', 0, "B3E67" );
Skills.Scuba = new Skill( 'Scuba', 'IQ', 1, "B3E48" );
Skills.Scuba.minTL = 6;
Skills.Sculpting = new Skill( 'Sculpting', 'IQ', 1, "B3E47" );
Skills.Seamanship = new Skill( "Seamanship", 'IQ', 0, "B3E57" );
Skills.Seamanship.TLs = true;
Skills.SensieInterface = new Skill( "Sensie Interface", 'IQ', 2, "CI130" );
Skills.SensieInterface.TLs = true;
Skills.SensieInterface.minTL = 9;
Skills.Sensitivity = new Skill( "Sensitivity", 'IQ', 3, "CI135" );
Skills.SexAppeal = new Skill( "Sex Appeal", 'HT', 1, "B3E64" );
Skills.SexAppeal.type = 'M';
Skills.Shadowing = new Skill( "Shadowing", 'IQ', 1, "B3E67" );
Skills.Shapeshifting = new Skill( "Shapeshifting", 'IQ', 2, "CI144" );
Skills.Shield = new Skill( 'Shield', 'DX', 0, "B3E52" );
Skills.Shipbuilding = new Skill( "Shipbuilding", 'IQ', 2, "B3E54" );
Skills.Shipbuilding.TLs = true;
Skills.ShipbuildingStarship = new Skill( "Starshipbuilding", 'IQ', 1, "CI137" );
Skills.ShipbuildingStarship.TLs = true;
Skills.ShipbuildingStarship.minTL = 9;
Skills.Shiphandling = new Skill( "Shiphandling", 'IQ', 2, "CI161" );
Skills.Shiphandling.TLs = true;
Skills.ShortStaff = new Skill( "Short Staff", 'DX', 2, "CI135" );
Skills.Shortsword = new Skill( 'Shortsword', 'DX', 1, "B3E52" );
Skills.Shuriken = new Skill( "Shuriken", 'DX', 2, "CI135" );
Skills.SIGINTCollectionJamming = new Skill( "SIGINT Collection/Jamming", 'IQ', 2, "CI151" );
Skills.SIGINTCollectionJamming.shortname = "SIGINT";
Skills.SIGINTCollectionJamming.TLs = true;
Skills.SIGINTCollectionJamming.minTL = 7;
Skills.SignLanguage = new Skill( "Sign Language", 'IQ', 1, "B3E55" );
Skills.Singing = new Skill( "Singing", 'HT', 0, "B3E48" );
Skills.SkaldicLore = new Skill( "Skaldic Lore", 'IQ', 2, "CI147" );
Skills.Skating = new Skill( "Skating", 'DX', 2, "CI132" );
Skills.Skiing = new Skill( "Skiing", 'DX', 2, "B3E49" );
Skills.SleightofHand = new Skill( "Sleight of Hand", 'DX', 2, "B3E67" );
Skills.Sling = new Skill( "Sling", 'DX', 2, "B3E52" );
Skills.SlippingtheHammer = new Skill( "Slipping the Hammer", 'DX', 0, "CI135" );
Skills.SlippingtheHammer.minTL = 5;
Skills.SnakeCharming = new Skill( "Snake Charming", 'IQ', 1, "CI128" );
Skills.SonarImaging = new Skill( "Sonar Imaging", 'IQ', 1, "CI145" );
Skills.Spear = new Skill( 'Spear', 'DX', 1, "B3E52" );
Skills.SpearThrower = new Skill( 'Spear Thrower', 'DX', 1, "B3E52" );
Skills.SpearThrowing = new Skill( 'Spear Throwing', 'DX', 0, "B3E52" );
Skills.SpeedLoad = new Skill( 'Speed-Load', 'DX', 0, "B3E52" );
Skills.SpeedLoad.specRequiredList = ['Black-powder weapon','single-ejecting revolver','power cell',
    'simultaneously-ejecting revolver','integral-magazine weapon','removable-magazine weapon',
    'clip-loading','belt-fed weapon'];
Skills.SpeedLoad.minTL = 4;
Skills.SpeedReading = new Skill( "Speed Reading", 'IQ', 1, "CI158" );
Skills.SpellThrowing = new Skill( "Spell Throwing", 'DX', 0, "B3E244; CI149" );
Skills.SpellThrowing.specRequiredList = ['Ball','Curse-Missile','Ice Dagger',
    'Ice Sphere/Stone Missile','Lightning','Poltergeist','Silk','Spell','Sunbolt','Winged Knife'];
Skills.Sport = new Skill( "Sport", 'DX', 1, "B3E49" );
Skills.Sport.specRequiredList = [];
Skills.StaffSkill = new Skill( 'Staff', 'DX', 2, "B3E52" );
Skills.StageCombat = new Skill( "Stage Combat", 'DX', 1, "CI130" );
Skills.Starglazing = new Skill( "Starglazing", 'DX', 0, "CI161" );
Skills.Stealth = new Skill( 'Stealth', 'DX', 1, "B3E67" );
Skills.StoneKnapping = new Skill( "Stone Knapping", 'IQ', 1, "CI137" );
Skills.Strategy = new Skill( "Strategy", 'IQ', 2, "B3E64" );
Skills.Strategy.specRequiredList = [];
Skills.Streetwise = new Skill( 'Streetwise', 'IQ', 1, "B3E68" );
Skills.StyleAnalysis = new Skill( "Style Analysis", 'IQ', 2, "CI135" );
Skills.Suggest = new Skill( "Suggest", 'IQ', 2, "CI139" );
Skills.SumoWrestling = new Skill( "Sumo Wrestling", 'DX', 1, "CI136" );
Skills.SumoWrestling.shortname = "Sumo";
Skills.Surgery = new Skill( 'Surgery', 'IQ', 3, "B3E56" );
Skills.Surgery.TLs = true;
Skills.Surveying = new Skill( "Surveying", 'IQ', 1, "CI158" );
Skills.Surveying.TLs = true;
Skills.Survival = new Skill( 'Survival', 'IQ', 1, "B3E57" );
Skills.Survival.specRequiredList = ['Artic', 'Desert', 'Island/Beach', 'Jungle', 'Mountains',
                                    'Plains', 'Swampland', 'Woodlands', 'Radioactive', 'Urban' ];
Skills.SwayEmotions = new Skill( "Sway Emotions", 'IQ', 1, "CI139" );
Skills.Swimming = new Skill( "Swimming", 'DX', 0, "B3E49" );
Skills.SymbolDrawing = new Skill( "Symbol Drawing", 'IQ', 2, "CI147" );
Skills.SymbolDrawing.specRequiredList = [];

Skills.Tactics = new Skill( 'Tactics', 'IQ', 2, "B3E64" );
Skills.TacticsNaval = new Skill( 'Tactics - Naval', 'IQ', 2, "CI151" );  // don't think this should exist as a separate skill
Skills.Tanning = new Skill( "Tanning", 'DX', 0, "CI137" );
Skills.Tattooing = new Skill( "Tattooing", 'IQ', 1, "CI137" );
Skills.TeaCeremony = new Skill( "Tea Ceremony", 'IQ', 2, "CI147" );
Skills.TeaCeremony.specRequiredList = [];
Skills.Teaching = new Skill( 'Teaching', 'IQ', 1, "B3E64" );
Skills.Teamster = new Skill( "Teamster", 'IQ', 1, "B3E47" );
Skills.Telegraphy = new Skill( "Telegraphy", 'IQ', 0, "B3E55" );
Skills.Telegraphy.minTL = 5;
Skills.TemporalElectronics = new Skill( "Temporal Electronics", 'IQ', 2, "CI158" );
Skills.TemporalElectronics.TLs = true;
Skills.TemporalElectronics.minTL = 10;
Skills.TemporalOperation = new Skill( "Temporal Operation", 'IQ', 1, "CI154" );
Skills.TemporalOperation.TLs = true;
Skills.TemporalOperation.minTL = 10;
Skills.TemporalPhysics = new Skill( "Temporal Physics", 'IQ', 3, "CI158" );
Skills.TemporalPhysics.TLs = true;
Skills.TemporalPhysics.minTL = 10;
Skills.Thanatology = new Skill( "Thanatology", 'IQ', 2, "CI158" );
Skills.Thaumatology = new Skill( "Thaumatology", 'IQ', 3, "CI149" );
Skills.Theology = new Skill( "Theology", 'IQ', 2, "B3E62" );
Skills.ThrowingArt = new Skill( "Throwing Art", 'DX', 2, "CI145" );
Skills.Throwing = new Skill( "Throwing", 'DX', 2, "B3E49" );
Skills.ThrowingStick = new Skill( "Throwing Stick", 'DX', 0, "B3E243; CI136" );
Skills.ThrownWeapon = new Skill( "Thrown Weapon", 'DX', 0, "B3E52" );
Skills.ThrownWeapon.specRequiredList = [];
Skills.Tonfa = new Skill( "Tonfa", 'DX', 2, "CI136" );
Skills.TournamentLaw = new Skill( "Tournament Law", 'IQ', 0, "CI147" );
Skills.TournamentLaw.specRequiredList = [];
Skills.Tracking = new Skill( 'Tracking', 'IQ', 1, "B3E57" );
Skills.TrafficAnalysis = new Skill( "Traffic Analysis", 'IQ', 2, "CI151" );
Skills.TrafficAnalysis.TLs = true;
Skills.TrafficAnalysis.minTL = 6;
Skills.Traps = new Skill( 'Traps', 'IQ', 1, "B3E68" );
Skills.Traps.TLs = true;
Skills.TwoHandedAxeMace = new Skill( 'Two-handed Axe/Mace', 'DX', 1, "B3E52" );
Skills.TwoHandedAxeMace.shortname = "2H Axe/Mace";
Skills.TwoHandedSword = new Skill( 'Two-handed Sword', 'DX', 1, "B3E52" );
Skills.TwoHandedSword.shortname = "2H Sword";
Skills.Typing = new Skill( "Typing", 'DX', 0, "CI154" );
Skills.Typing.minTL = 5;

Skills.UnderwaterDemolition = new Skill( 'Underwater Demolition', 'IQ', 1, "B3E68" );
Skills.UnderwaterDemolition.TLs = true;
Skills.UnderwaterDemolition.minTL = 6;
Skills.UtteringofBaseCoin = new Skill( "Uttering of Base Coin", 'IQ', 2, "CI161" );
Skills.UtteringofBaseCoin.TLs = true;

Skills.VaccSuit = new Skill( "Vacc Suit", 'IQ', 1, "B3E69" );
Skills.VaccSuit.TLs = true;
Skills.VaccSuit.minTL = 7;
Skills.Ventriloquism = new Skill( 'Ventriloquism', 'IQ', 2, "B3E68" );
Skills.Veterinary = new Skill( 'Veterinary', 'IQ', 2, "B3E47" );
Skills.Veterinary.TLs = true;
Skills.VideoProduction = new Skill( "Video Production", 'IQ', 1, "B3E242; CI130" );
Skills.VideoProduction.TLs = true;
Skills.VideoProduction.minTL = 6;

Skills.Woodworking = new Skill( "Woodworking", 'DX', 1, "B3E54" );
Skills.Weaving = new Skill( "Weaving", 'DX', 0, "CI137" );
Skills.WeirdMagic = new Skill( "Weird Magic", 'IQ', 3, "CI149" );
Skills.WeirdScience = new Skill( "Weird Science", 'IQ', 3, "CI159" );
Skills.Whip = new Skill( 'Whip', 'DX', 1, "B3E52" );
Skills.Wrestling = new Skill( 'Wrestling', 'DX', 1, "B3E243; CI136" );
Skills.Writing = new Skill( "Writing", 'IQ', 1, "B3E47" );

Skills.Xenobiology = new Skill( "Xenobiology", 'IQ', 1, "B3E246; CI159" );
Skills.Xenobiology.TLs = true;
Skills.Xenobiology.minTL = 9;
Skills.Xenobiology.specRequiredList = ['Rock/Ice Worlds','Earth-like','Hostile Terrestrial','Gas Giants'];
Skills.Xenology = new Skill( "Xenology", 'IQ', 2, "B3E246; CI159" );
Skills.Xenology.minTL = 9;

Skills.YinYangHealing = new Skill( "Yin/Yang Healing", 'IQ', 2, "CI145" );

Skills.ZenArchery = new Skill( "Zen Archery", 'IQ', 3, "CI145" );
Skills.Zoology = new Skill( 'Zoology', 'IQ', 2, "B3E62" );

/* psi skills */
// TP
Skills.PsiSense = new Skill( "Psi Sense", 'IQ', 2, 'B3E167' );
Skills.EmotionSense = new Skill( "Emotion Sense", 'IQ', 2, 'B3E167' );
Skills.Telesend = new Skill( "Telesend", 'IQ', 2, 'B3E168' );
Skills.Telereceive = new Skill( "Telereceive", 'IQ', 2, 'B3E168' );
Skills.MentalBlow = new Skill( "Mental Blow", 'IQ', 2, 'B3E169' );
Skills.MindShield = new Skill( "Mind Shield", 'IQ', 2, 'B3E169' );
Skills.Sleep = new Skill( "Sleep", 'IQ', 2, 'B3E170' );
Skills.Mindwipe = new Skill( "Mindwipe", 'IQ', 2, 'B3E171' );
Skills.Telecontrol = new Skill( "Telecontrol", 'IQ', 2, 'B3E171' );
// PK
Skills.Telekinesis = new Skill( "Telekinesis", 'IQ', 2, 'B3E172' );
Skills.Levitation = new Skill( "Levitation", 'IQ', 2, 'B3E173' );
Skills.Pyrokinesis = new Skill( "Pyrokinesis", 'IQ', 2, 'B3E173' );
Skills.Cryokinesis = new Skill( "Cryokinesis", 'IQ', 2, 'B3E173' );
Skills.PKShield = new Skill( "PK Shield", 'IQ', 2, 'B3E174' );
// ESP
Skills.Clairvoyance = new Skill( "Clairvoyance", 'IQ', 2, 'B3E174' );
Skills.Clairaudience = new Skill( "Clairaudience", 'IQ', 2, 'B3E174' );
Skills.Psychometry = new Skill( "Psychometry", 'IQ', 2, 'B3E174' );
Skills.Precognition = new Skill( "Precognition", 'IQ', 2, 'B3E174' );
// Teleport
Skills.Autoteleport = new Skill( "Autoteleport", 'IQ', 2, 'B3E175' );
Skills.Exoteleport = new Skill( "Exoteleport", 'IQ', 2, 'B3E175' );
// Healing
Skills.Healing = new Skill( "Healing", 'IQ', 2, 'B3E175' );
// Antipsi
Skills.PsionicResistance = new Skill( "Psionic Resistance", 'IQ', 2, 'B3E176' );
Skills.PsiStatic = new Skill( "Psi Static", 'IQ', 2, 'B3E176' );

/* languages - for testing the Language machinery */
// Skills.Celtic = new Skill( "Celtic", 'IQ', 1 );
// Skills.Celtic.key = "language";
// Skills.HighTongue = new Skill( "High Tongue", 'IQ', 2 );
// Skills.HighTongue.key = "language";
// Skills.Patois = new Skill( "Patois", 'IQ', 0 );
// Skills.Patois.key = "language";

// add a 'key' attribute to each skill with value equal to its label in the Skills, etc. object
for ( var l in Skills ) {
    if( !Skills[l].hasOwnProperty('key') ) Skills[l].key = l;
}

var SkillsGURPSLite = ['Acrobatics','Acting','AnimalHandling','AreaKnowledge','Armoury','Artist',
'Bard','Blacksmith','Boxing','Brawling','Camouflage','Carpentry','Climbing','ComputerOperation',
'ComputerProgramming','Cooking','Dancing','Demolition','Diagnosis','Disguise',
'Electronics','ElectronicsOperation','Engineer','Escape',
'FirstAid','Forensics','Forgery','Gambling','Holdout',
'Diplomacy','FastTalk','Intimidation','SavoirFaire','SexAppeal','Streetwise', // Influence skills
'Interrogation','Jumping','Karate','Law','Leadership','Lockpicking',
'Masonry','Mechanic','Merchant','Meteorology','MusicalInstrument',
'Agronomy','Astronomy','Biochemistry','Botany','Chemistry','Ecology','Genetics','Geology', // Natural Sciences
'Mathematics','Meteorology','NuclearPhysics','Physics','Physiology','Zoology',             // Natural Sciences
'Naturalist','Navigation','Occultism','Photography','Physician','Pickpocket',
'Research','Riding','Running','Shadowing','Shield','Singing',
'Anthropology','Archaeology','Criminology','Economics','History', // Social Sciences
'Linguistics','Literature','Psychology','Theology','Philosophy',   // Social Sciences
'Stealth','Survival','Swimming','Tactics','Teaching','Throwing','Tracking','Traps',
'Bicycling','Boating','Driving','Motorcycle','Piloting','Powerboat',  // Vehicle skills
'Gesture','SignLanguage',  // Language skills
'Writing',];
/*  Weapon skills not included.  Taken care of for random characters by generation software. */



/****  Defaults  ****/
Defaults = {};
Defaults.Abacus_no_stat_default = { target: 'Abacus', penalty: false, category: 'stat' };
Defaults.Accounting_from_IQ          = { target: 'Accounting', penalty: -10, from: 'IQ' };
Defaults.Accounting_from_Mathematics = { target: 'Accounting', penalty: -5, category: 'SK', from: 'Mathematics' };
Defaults.Accounting_from_Merchant    = { target: 'Accounting', penalty: -5, category: 'SK', from: 'Merchant' };
Defaults.Acting_from_Bard        = { target: 'Acting', penalty: -5, category: 'SK', from: 'Bard' };
Defaults.Acting_from_Performance = { target: 'Acting', penalty: -2, category: 'SK', from: 'Performance' };
Defaults.Administration_from_IQ       = { target: 'Administration', penalty: -6, from: 'IQ' };
Defaults.Administration_from_Merchant = { target: 'Administration', penalty: -3, category: 'SK', from: 'Merchant' };
Defaults.Alchemy_no_stat_default = { target: 'Alchemy', penalty: false, category: 'stat' };
Defaults.AppreciateBeauty_from_IQ          = { target: 'AppreciateBeauty', penalty: -5, from: 'IQ' };
Defaults.AppreciateBeauty_from_SavoirFaire = { target: 'AppreciateBeauty', penalty: -5, category: '"SK', from: 'SavoirFaire' };
Defaults.ArmouryTL5down_from_Blacksmith = { target: 'ArmouryTL5down', penalty: -3, category: 'SK', from: 'Blacksmith' };
Defaults.ArmouryTL5down_from_Weapon     = { target: 'ArmouryTL5down', penalty: -6, category: 'GR', from: 'WeaponsSkills' };
Defaults.ArmouryTL6plus_from_Weapon     = { target: 'ArmouryTL6plus', penalty: -6, category: 'GR', from: 'WeaponsSkills' };
Defaults.ArtificialIntelligence_no_stat_default          = { target: 'ArtificialIntelligence', penalty: false, category: 'stat' };
Defaults.ArtificialIntelligence_from_ComputerProgramming = { target: 'ArtificialIntelligence', penalty: -3, category: 'SK', from: 'ComputerProgramming' };
Defaults.ArtificialIntelligence_from_Teaching            = { target: 'ArtificialIntelligence', penalty: -5, category: 'SK', from: 'Teaching' };
Defaults.Astrogation_from_Astronomy   = { target: 'Astrogation', penalty: -4, category: 'SK', from: 'Astronomy' };
Defaults.Astrogation_from_Mathematics = { target: 'Astrogation', penalty: -4, category: 'SK', from: 'Mathematics' };
Defaults.Astrogation_from_Navigation  = { target: 'Astrogation', penalty: -5, category: 'SK', from: 'Navigation' };
Defaults.Augury_from_Occultism  = { target: 'Augury', penalty: -3, category: 'SK', from: 'Occultism' };
Defaults.Augury_from_Theology   = { target: 'Augury', penalty: -4, category: 'SK', from: 'Theology' };
Defaults.Augury_no_stat_default = { target: 'Augury', penalty: false, category: 'stat' };
Defaults.Autohypnosis_no_stat_default = { target: 'Autohypnosis', penalty: false, category: 'stat' };

Defaults.Bard_from_Performance = { target: 'Bard', penalty: -2, category: 'SK', from: 'Performance' };
Defaults.Bartender_no_stat_default = { target: 'Bartender', penalty: false, category: 'stat' };
Defaults.Bartender_from_Carousing  = { target: 'Bartender', penalty: -3, category: 'SK', from: 'Carousing' };
Defaults.Battlesuit_from_Exoskeleton = { target: 'Battlesuit', penalty: -2, category: 'SK', from: 'Exoskeleton' };
Defaults.Battlesuit_from_DX          = { target: 'Battlesuit', penalty: -5, from: 'DX' };
Defaults.Battlesuit_from_IQ          = { target: 'Battlesuit', penalty: -5, from: 'IQ' };
Defaults.Battlesuit_from_VaccSuit    = { target: 'Battlesuit', penalty: -3, category: 'SK', from: 'VaccSuit' };
Defaults.BeamWeapons_from_BeamWeapons = { target: 'BeamWeapons', targetSpec: 'any', penalty: -4, category: 'SK', from: 'BeamWeapons', fromSpec: 'any' };  // Guns/Gunner uses a shorthand for this
Defaults.Bicycling_from_Motorcycle = { target: 'Bicycling', penalty: 0, category: 'SK', from: 'Motorcycle' };
Defaults.Biochemistry_from_Chemistry   = { target: 'Biochemistry', penalty: -5, category: 'SK', from: 'Chemistry' };
Defaults.Biochemistry_from_Xenobiology = { target: 'Biochemistry', penalty: -4, category: 'SK', from: 'Xenobiology' };
Defaults.Blacksmith_from_Jeweler = { target: 'Blacksmith', penalty: -4, category: 'SK', from: 'Jeweler' };
Defaults.BlindFighting_no_stat_default = { target: 'BlindFighting', penalty: false, category: 'stat' };
Defaults.BlindingTouch_no_stat_default = { target: 'BlindingTouch', penalty: false, category: 'stat' };
//Defaults.BlowpipeFukiya_from_DX = { target: 'BlowpipeFukiya', penalty: -4, from: 'DX' };
Defaults.Boating_from_DX        = { target: 'Boating', penalty: -5, from: 'DX' };
Defaults.Boating_from_IQ        = { target: 'Boating', penalty: -5, from: 'IQ' };
Defaults.Boating_from_Powerboat = { target: 'Boating', penalty: -3, category: 'SK', from: 'Powerboat' };
Defaults.BodyControl_no_stat_default = { target: 'BodyControl', penalty: false, category: 'stat' };
Defaults.BodyLanguage_from_DetectLies = { target: 'BodyLanguage', penalty: -3, category: 'SK', from: 'DetectLies' };
Defaults.BodyLanguage_from_Psychology = { target: 'BodyLanguage', penalty: -3, category: 'SK', from: 'Psychology' };
Defaults.BodySense_from_Acrobatics = { target: 'BodySense', penalty: -3, category: 'SK', from: 'Acrobatics' };
Defaults.Bolas_no_stat_default = { target: 'Bolas', penalty: false, category: 'stat' };
Defaults.Botany_from_Agronomy    = { target: 'Botany', penalty: -5, category: 'SK', from: 'Agronomy' };
Defaults.Botany_from_Xenobiology = { target: 'Botany', penalty: -3, category: 'SK', from: 'Xenobiology' };
Defaults.BrainHacking_from_Will = { target: 'BrainHacking', penalty: -6, from: 'Will' };
Defaults.Brawling_no_stat_default = { target: 'Brawling', penalty: false, category: 'stat' };
Defaults.BreakingBlow_no_stat_default = { target: 'BreakingBlow', penalty: false, category: 'stat' };
Defaults.BreathControl_no_stat_default = { target: 'BreathControl', penalty: false, category: 'stat' };
Defaults.Broadsword_from_ForceSword = { target: 'Broadsword', penalty: -3, category: 'SK', from: 'ForceSword' };
Defaults.Broadsword_from_Shortsword = { target: 'Broadsword', penalty: -2, category: 'SK', from: 'Shortsword' };
Defaults.Buckler_from_Shield = { target: 'Buckler', penalty: -2, category: 'SK', from: 'Shield' };
Defaults.Bulldancing_from_Acrobatics = { target: 'Bulldancing', penalty: -5, category: 'SK', from: 'Acrobatics' };
Defaults.Bulldancing_no_stat_default = { target: 'Bulldancing', penalty: false, category: 'stat' };

Defaults.Calligraphy_from_Artist = { target: 'Calligraphy', penalty: -2, category: 'SK', from: 'Artist' };
Defaults.Camouflage_from_Survival = { target: 'Camouflage', penalty: -2, category: 'SK', from: 'Survival' };
Defaults.Carousing_from_HT = { target: 'Carousing', penalty: -4, from: 'HT' };
Defaults.Carpentry_from_DX = { target: 'Carpentry', penalty: -4, from: 'DX' };
Defaults.Carpentry_from_IQ = { target: 'Carpentry', penalty: -4, from: 'IQ' };
Defaults.Cartography_from_Surveying  = { target: 'Cartography', penalty: -5, category: 'SK', from: 'Surveying' };
Defaults.Cartography_from_Navigation = { target: 'Cartography', penalty: -5, category: 'SK', from: 'Navigation' };
Defaults.ChangeControl_no_stat_default = { target: 'ChangeControl', penalty: false, category: 'stat' };
Defaults.Chess_from_Strategy = { target: 'Chess', penalty: -4, category: 'SK', from: 'Strategy' };
Defaults.Choreography_from_Dancing = { target: 'Choreography', penalty: -2, category: 'SK', from: 'Dancing' };
Defaults.Climbing_from_DX = { target: 'Climbing', penalty: -5, from: 'DX' };
Defaults.Climbing_from_ST = { target: 'Climbing', penalty: -5, from: 'ST' };
Defaults.Cloak_from_Buckler = { target: 'Cloak', penalty: -4, category: 'SK', from: 'Buckler' };
Defaults.Cloak_from_Shield  = { target: 'Cloak', penalty: -4, category: 'SK', from: 'Shield' };
Defaults.ComputerHacking_no_stat_default          = { target: 'ComputerHacking', penalty: false, category: 'stat' };
Defaults.ComputerHacking_from_ComputerOperation   = { target: 'ComputerHacking', penalty: -8, category: 'SK', from: 'ComputerOperation' };
Defaults.ComputerHacking_from_ComputerProgramming = { target: 'ComputerHacking', penalty: -4, category: 'SK', from: 'ComputerProgramming' };
Defaults.Conducting_from_MusicalInstrument = { target: 'Conducting', penalty: -2, category: 'SK', from: 'MusicalInstrument' };
Defaults.ConspiracyTheory_no_stat_default = { target: 'ConspiracyTheory', penalty: false, category: 'stat' };
Defaults.ConspiracyTheory_from_History    = { target: 'ConspiracyTheory', penalty: -4, category: 'SK', from: 'History' };
Defaults.ConspiracyTheory_from_Occultism  = { target: 'ConspiracyTheory', penalty: -4, category: 'SK', from: 'Occultism' };
Defaults.Cooperage_from_DX = { target: 'Cooperage', penalty: -4, from: 'DX' };
Defaults.Cooperage_from_IQ = { target: 'Cooperage', penalty: -4, from: 'IQ' };
Defaults.Courtesan_no_stat_default  = { target: 'Courtesan', penalty: false, category: 'stat' };
Defaults.Courtesan_from_SavoirFaire = { target: 'Courtesan', penalty: -5, category: '"SK', from: 'SavoirFaire' };
Defaults.Criminology_from_IQ = { target: 'Criminology', penalty: -4, from: 'IQ' };
Defaults.Cryptanalysis_from_Cryptography = { target: 'Cryptanalysis', penalty: -5, category: 'SK', from: 'Cryptography' };
Defaults.Cryptanalysis_from_Cryptology   = { target: 'Cryptanalysis', penalty: -5, category: 'SK', from: 'Cryptology' };
//Defaults.Cryptanalysis_from_Mathematics  = { target: 'Cryptanalysis', penalty: -3, category: 'SK', from: 'Mathematics' };
Defaults.Cryptography_from_Cryptanalysis = { target: 'Cryptography', penalty: -5, category: 'SK', from: 'Cryptanalysis' };
Defaults.Cryptography_from_Cryptology    = { target: 'Cryptography', penalty: -5, category: 'SK', from: 'Cryptology' };
Defaults.Cryptology_from_Cryptanalysis = { target: 'Cryptology', penalty: -5, category: 'SK', from: 'Cryptanalysis' };
Defaults.Cryptology_from_Cryptography  = { target: 'Cryptology', penalty: -5, category: 'SK', from: 'Cryptography' };
Defaults.Cyberaxe_from_MusicalInstrument = { target: 'Cyberaxe', penalty: -4, category: 'SK', from: 'MusicalInstrument' };
Defaults.Cyberaxe_no_stat_default        = { target: 'Cyberaxe', penalty: false, category: 'stat' };
Defaults.CyberdeckOperation_no_stat_default        = { target: 'CyberdeckOperation', penalty: false, category: 'stat' };
Defaults.CyberdeckOperation_from_ComputerOperation = { target: 'CyberdeckOperation', penalty: -8, category: 'SK', from: 'ComputerOperation' };
Defaults.Cyphering_from_IQ = { target: 'Cyphering', penalty: -2, from: 'IQ' };

Defaults.Darts_from_Throwing = { target: 'Darts', penalty: 0, category: 'SK', from: 'Throwing' };
Defaults.Demolition_from_Engineer             = { target: 'Demolition', penalty: -3, category: 'SK', from: 'Engineer' };
Defaults.Demolition_from_UnderwaterDemolition = { target: 'Demolition', penalty: -2, category: 'SK', from: 'UnderwaterDemolition' };
Defaults.DetectLies_from_Psychology = { target: 'DetectLies', penalty: -4, category: 'SK', from: 'Psychology' };
Defaults.Diagnosis_from_FirstAid   = { target: 'Diagnosis', penalty: -8, category: 'SK', from: 'FirstAid' };
Defaults.Diagnosis_from_Physician  = { target: 'Diagnosis', penalty: -4, category: 'SK', from: 'Physician' };
Defaults.Diagnosis_from_Veterinary = { target: 'Diagnosis', penalty: -5, category: 'SK', from: 'Veterinary' };
Defaults.Directing_no_stat_default  = { target: 'Directing', penalty: false, category: 'stat' };
Defaults.Directing_from_Performance = { target: 'Directing', penalty: -5, category: 'SK', from: 'Performance' };
Defaults.Dislocating_no_stat_default = { target: 'Dislocating', penalty: false, category: 'stat' };
Defaults.Distilling_from_IQ = { target: 'Distilling', penalty: -4, from: 'IQ' };
Defaults.Dreaming_from_IQ = { target: 'Dreaming', penalty: -1, from: 'IQ' };
Defaults.Driving_from_IQ = { target: 'Driving', penalty: -5, from: 'IQ' };
Defaults.Driving_from_DX = { target: 'Driving', penalty: -5, from: 'DX' };
Defaults.Dyeing_from_IQ = { target: 'Dyeing', penalty: -4, from: 'IQ' };

Defaults.Ecology_from_Naturalist  = { target: 'Ecology', penalty: -3, category: 'SK', from: 'Naturalist' };
Defaults.Ecology_from_Xenobiology = { target: 'Ecology', penalty: -3, category: 'SK', from: 'Xenobiology' };
Defaults.Economics_from_Merchant = { target: 'Economics', penalty: -6, category: 'SK', from: 'Merchant' };
Defaults.ElectronicsOperation_from_Electronics = { target: 'ElectronicsOperation', penalty: -3, category: 'SK', from: 'Electronics', fromSpec: 'same' };
Defaults.Engineer_from_Mechanic = { target: 'Engineer', penalty: -6, category: 'SK', from: 'Mechanic' };
Defaults.EquestrianAcrobatics_from_Acrobatics = { target: 'EquestrianAcrobatics', penalty: -3, category: 'SK', from: 'Acrobatics' };
Defaults.EquestrianAcrobatics_from_Riding     = { target: 'EquestrianAcrobatics', penalty: -3, category: 'SK', from: 'Riding' };
Defaults.EroticArt_from_Acrobatics = { target: 'EroticArt', penalty: -5, category: 'SK', from: 'Acrobatics' };
Defaults.Exorcism_from_Theology = { target: 'Exorcism', penalty: -3, category: 'SK', from: 'Theology' };
Defaults.Exoskeleton_from_IQ         = { target: 'Exoskeleton', penalty: -6, from: 'IQ' };
Defaults.Exoskeleton_from_DX         = { target: 'Exoskeleton', penalty: -6, from: 'DX' };
Defaults.Exoskeleton_from_Battlesuit = { target: 'Exoskeleton', penalty: -2, from: 'Battlesuit', category: 'SK' };
Defaults.ExplosiveOrdinanceDisposal_from_Demolition = { target: 'ExplosiveOrdinanceDisposal', penalty: -4, category: 'SK', from: 'Demolition' };

Defaults.Fanning_from_DX   = { target: 'Fanning', penalty: -6, from: 'DX' };
Defaults.Fanning_from_Guns = { target: 'Fanning', penalty: -4, category: 'SK', from: 'Guns' };
Defaults.FastDraw_no_stat_default = { target: 'FastDraw', penalty: false, category: 'stat' };
Defaults.FastTalk_from_Acting = { target: 'FastTalk', penalty: -5, category: 'SK', from: 'Acting' };
Defaults.FightChoreography_from_StageCombat = { target: 'FightChoreography', penalty: -2, category: 'SK', from: 'StageCombat' };
Defaults.Filch_no_stat_default = { target: 'Filch', penalty: false, from: 'stat' };
Defaults.Filch_from_Pickpocket = { target: 'Filch', penalty: -5,    from: 'Pickpocket', category: 'SK' };
Defaults.FireEating_no_stat_default = { target: 'FireEating', penalty: false, from: 'stat' };
Defaults.FireWalking_from_Will = { target: 'FireWalking', penalty: -5, from: 'Will' };
Defaults.Fireworks_from_Chemistry = { target: 'Fireworks', penalty: -3, category: 'SK', from: 'Chemistry' };
Defaults.FirstAid_from_IQ         = { target: 'FirstAid', penalty: -5, from: 'IQ' };
Defaults.FirstAid_from_Physician  = { target: 'FirstAid', penalty:  0, category: 'SK', from: 'Physician' };
Defaults.FirstAid_from_Physiology = { target: 'FirstAid', penalty: -5, category: 'SK', from: 'Physiology' };
Defaults.FirstAid_from_Veterinary = { target: 'FirstAid', penalty: -5, category: 'SK', from: 'Veterinary' };
Defaults.Flight_from_DX = { target: 'Flight', penalty: -4, from: 'DX' };
Defaults.ForceSword_from_Broadsword = { target: 'ForceSword', penalty: -3, category: 'SK', from: 'Broadsword' };
Defaults.ForceSword_from_Shortsword = { target: 'ForceSword', penalty: -3, category: 'SK', from: 'Shortsword' };
// actually says "any Sword skill - 3"
Defaults.ForceWhip_from_Whip = { target: 'ForceWhip', penalty: -3, category: 'SK', from: 'Whip' };
Defaults.Forensics_from_Criminology = { target: 'Forensics', penalty: -4, category: 'SK', from: 'Criminology' };
Defaults.Forgery_from_Artist = { target: 'Forgery', penalty: -5, from: 'Artist', category: 'SK' };
Defaults.Forgery_from_DX     = { target: 'Forgery', penalty: -8, from: 'DX' };
Defaults.Forgery_from_IQ     = { target: 'Forgery', penalty: -6, from: 'IQ' };
Defaults.Fortunetelling_from_FastTalk = { target: 'Fortunetelling', penalty: -3, category: '"SK', from: 'FastTalk' };
Defaults.Fortunetelling_from_IQ       = { target: 'Fortunetelling', penalty: -4, from: 'IQ' };
Defaults.FreeFall_from_DX = { target: 'FreeFall', penalty: -5, from: 'DX' };  // enter a standard default if there are also other attribute defaults
Defaults.FreeFall_from_HT = { target: 'FreeFall', penalty: -5, from: 'HT' };

Defaults.Gambling_from_Mathematics = { target: 'Gambling', penalty: -5, category: 'SK', from: 'Mathematics' };
Defaults.Games_from_IQ = { target: 'Games', penalty: -5, from: 'IQ' };
Defaults.Garrote_from_DX = { target: 'Garrote', penalty: -5, from: 'DX' };
Defaults.Genetics_from_Biochemistry = { target: 'Genetics', penalty: -5, category: 'SK', from: 'Biochemistry' };
Defaults.Genetics_from_Physiology   = { target: 'Genetics', penalty: -5, category: 'SK', from: 'Physiology' };
Defaults.Genetics_from_Xenobiology  = { target: 'Genetics', penalty: -4, category: 'SK', from: 'Xenobiology' };
//Defaults.Geology_from_IQ = { target: 'Geology', penalty: -6, from: 'IQ' };
Defaults.Geology_from_Prospecting = { target: 'Geology', penalty: -4, category: 'SK', from: 'Prospecting' };
//Defaults.Gesture_from_IQ           = { target: 'Gesture', penalty: -5, from: 'IQ' };
Defaults.Gesture_from_SignLanguage = { target: 'Gesture', penalty: 0, category: 'SK', from: 'SignLanguage' };
Defaults.Gunner_from_Gunner = { target: 'Gunner', penalty: -4, category: 'SK', from: 'Gunner' };  // do we like this shorthand Default format, or the one used above for Beam Weapons?
Defaults.Guns_from_Guns = { target: 'Guns', penalty: -4, from: 'Guns' };

Defaults.HardHatDiving_from_Scuba      = { target: 'HardHatDiving', penalty: -2, category: 'SK', from: 'Scuba' };
Defaults.HardHatDiving_no_stat_default = { target: 'HardHatDiving', penalty: false, category: 'stat' };
Defaults.Harpoon_from_SpearThrowing = { target: 'Harpoon', penalty: -2, category: 'SK', from: 'SpearThrowing' };
Defaults.Heraldry_from_SavoirFaire = { target: 'Heraldry', penalty: -3, category: 'SK', from: 'SavoirFaire' };
Defaults.Herbalist_from_Naturalist = { target: 'Herbalist', penalty: -6, category: 'SK', from: 'Naturalist' };
Defaults.Herbary_no_stat_default = { target: 'Herbary', penalty: false, category: 'stat' };
Defaults.HerbaryMiraculous_no_stat_default = { target: 'HerbaryMiraculous', penalty: false, category: 'stat' };
Defaults.HiddenLore_no_stat_default = { target: 'HiddenLore', penalty: false, category: 'stat' };
Defaults.Hiking_no_stat_default = { target: 'Hiking', penalty: false, category: 'stat' };
Defaults.History_from_Archaeology = { target: 'History', penalty: -6, category: 'SK', from: 'Archaeology' };
Defaults.HistoryEsoteric_no_stat_default = { target: 'HistoryEsoteric', penalty: false, category: 'stat' };
//Defaults.History_from_IQ = { target: 'History', penalty: -6, from: 'IQ' };
Defaults.Holdout_from_SleightofHand = { target: 'Holdout', penalty: -3, category: 'SK', from: 'SleightofHand' };
Defaults.Hydrology_from_Meteorology = { target: 'Hydrology', penalty: -6, category: 'SK', from: 'Meteorology' };
Defaults.Hydrology_no_stat_default  = { target: 'Hydrology', penalty: false, category: 'stat' };
Defaults.Hypnotism_no_stat_default = { target: 'Hypnotism', penalty: false, category: 'stat' };
Defaults.HyperspacePhysics_no_stat_default = { target: 'HyperspacePhysics', penalty: false, category: 'stat' };

Defaults.Illumination_from_Artist = { target: 'Illumination', penalty: -2, category: 'SK', from: 'Artist' };
Defaults.IllusionArt_from_Artist = { target: 'IllusionArt', penalty: -3, category: 'SK', from: 'Artist' };
Defaults.InertialessAgility_no_stat_default = { target: 'InertialessAgility', penalty: false, category: 'stat' };
Defaults.Interrogation_from_Intimidation = { target: 'Interrogation', penalty: -3, category: 'SK', from: 'Intimidation' };
Defaults.Intimidation_from_Acting = { target: 'Intimidation', penalty: -3, category: 'SK', from: 'Acting' };
Defaults.Intimidation_from_ST     = { target: 'Intimidation', penalty: -5, from: 'ST' };

Defaults.Jeweler_from_Blacksmith = { target: 'Jeweler', penalty: -4, category: 'SK', from: 'Blacksmith' };
Defaults.JitteSai_from_Shortsword = { target: 'JitteSai', penalty: -3, category: 'SK', from: 'Shortsword' };
Defaults.Judo_no_stat_default = { target: 'Judo', penalty: false, category: 'stat' };
Defaults.Juggling_from_SleightofHand = { target: 'Juggling', penalty: -3, category: 'SK', from: 'SleightofHand' };
Defaults.Juggling_no_stat_default    = { target: 'Juggling', penalty: false, category: 'stat' };
Defaults.Jumping_no_stat_default = { target: 'Jumping', penalty: false, category: 'stat' };

Defaults.Karate_no_stat_default = { target: 'Karate', penalty: false, category: 'stat' };
Defaults.Katana_from_Broadsword     = { target: 'Katana', penalty: -2, category: 'SK', from: 'Broadsword' };
Defaults.Katana_from_TwoHandedSword = { target: 'Katana', penalty: -2, category: '"SK', from: 'TwoHandedSword' };
Defaults.Kiai_no_stat_default = { target: 'Kiai', penalty: false, category: 'stat' };
Defaults.KiteFlying_from_DX = { target: 'KiteFlying', penalty: -2, from: 'DX' };
Defaults.Kusari_from_DX    = { target: 'Kusari', penalty: -5, from: 'DX' };
Defaults.Kusari_from_Flail = { target: 'Kusari', penalty: -2, category: 'SK', from: 'Flail' };

Defaults.Lance_from_DX = { target: 'Lance', penalty: -6, from: 'DX' };
// also from Spear-3, IF you have Riding-12+ (how the hell to show that?)
Defaults.Lasso_no_stat_default = { target: 'Lasso', penalty: false, category: 'stat' };
Defaults.Leadership_from_ST = { target: 'Leadership', penalty: -5, from: 'ST' };
Defaults.Leatherworking_from_DX = { target: 'Leatherworking', penalty: -5, from: 'DX' };
Defaults.Leatherworking_from_IQ = { target: 'Leatherworking', penalty: -4, from: 'IQ' };
Defaults.LipReading_from_Vision = { target: 'LipReading', penalty: -10, from: 'Vision' };
Defaults.Lifting_no_stat_default = { target: 'Lifting', penalty: false, category: 'stat' };
Defaults.Linguistics_no_stat_default = { target: 'Linguistics', penalty: false, from: 'stat' };
//Defaults.Literature_from_IQ = { target: 'Literature', penalty: -6, from: 'IQ' };
Defaults.LowGFlight_from_PilotingHangGlider = { target: 'LowGFlight', penalty: -4, category: 'SK', from: 'Piloting', fromSpec: 'HangGlider' };
Defaults.LowGFlight_from_PilotingUltralight = { target: 'LowGFlight', penalty: -4, category: 'SK', from: 'Piloting', fromSpec: 'Ultralight' };
Defaults.LowGFlight_from_ST                 = { target: 'LowGFlight', penalty: -6, from: 'ST' };
Defaults.LucidDreaming_from_Will = { target: 'LucidDreaming', penalty: -4, from: 'Will' };

Defaults.MagicBreath_from_DX = { target: 'MagicBreath', penalty: -2, from: 'DX' };
Defaults.MakeUp_from_Disguise = { target: 'MakeUp', penalty: 0, category: 'SK', from: 'Disguise' };
Defaults.Masonry_from_IQ = { target: 'Masonry', penalty: -3, from: 'IQ' };
//Defaults.Mathematics_from_IQ = { target: 'Mathematics', penalty: -6, from: 'IQ' };
Defaults.Mechanic_from_EngineerSpec = { target: 'Mechanic', targetSpec: 'same', penalty: -5, from: 'Engineer', fromSpec: 'same' };
Defaults.Meditation_from_IQ_Realistic = { target: 'Meditation', penalty: -5, from: 'IQ' };
Defaults.MeditationCinematic_no_stat_default = { target: 'MeditationCinematic', penalty: false, from: 'stat' };
Defaults.Metallurgy_from_ArmouryTL5down = { target: 'Metallurgy', penalty: -8, category: 'SK', from: 'ArmouryTL5down' };
Defaults.Metallurgy_from_ArmouryTL6plus = { target: 'Metallurgy', penalty: -8, category: 'SK', from: 'ArmouryTL6plus' };
Defaults.Metallurgy_from_Blacksmith     = { target: 'Metallurgy', penalty: -8, category: 'SK', from: 'Blacksmith' };
Defaults.Metallurgy_from_Chemistry      = { target: 'Metallurgy', penalty: -5, category: 'SK', from: 'Chemistry' };
Defaults.Metallurgy_from_Jeweler        = { target: 'Metallurgy', penalty: -8, category: 'SK', from: 'Jeweler' };
//Defaults.Meteorology_from_IQ = { target: 'Meteorology', penalty: -5, from: 'IQ' };
Defaults.Mimicry_from_HT          = { target: 'Mimicry', penalty: -6, from: 'HT' };
Defaults.Mimicry_from_IQ          = { target: 'Mimicry', penalty: -6, from: 'IQ' };
Defaults.MimicryAS_from_MimicryBC = { target: 'Mimicry', targetSpec: 'Animal Sounds', penalty: -3, from: 'Mimicry', fromSpec: 'Bird Calls' };
Defaults.MimicryBC_from_MimicryAS = { target: 'Mimicry', targetSpec: 'Bird Calls',    penalty: -3, from: 'Mimicry', fromSpec: 'Animal Sounds' };
Defaults.MindBlock_from_Will = { target: 'MindBlock', penalty: -4, from: 'Will' };
Defaults.MonowireWhip_from_Whip = { target: 'MonowireWhip', penalty: -2, category: 'SK', from: 'Whip' };
Defaults.Motorcycle_from_Bicycling = { target: 'Motorcycle', penalty: -5, from: 'Bicycling', category: 'SK' };
Defaults.Motorcycle_from_DX        = { target: 'Motorcycle', penalty: -5, from: 'DX' };
Defaults.Motorcycle_from_IQ        = { target: 'Motorcycle', penalty: -5, from: 'IQ' };
Defaults.MusicalComposition_from_MusicalInstrument = { target: 'MusicalComposition', penalty: -2, category: 'SK', from: 'MusicalInstrument' };
Defaults.MusicalComposition_from_Poetry            = { target: 'MusicalComposition', penalty: -2, category: 'SK', from: 'Poetry' };
Defaults.MusicalComposition_no_stat_default        = { target: 'MusicalComposition', penalty: false, from: 'stat' };
Defaults.MusicalInstrument_from_Cyberaxe = { target: 'MusicalInstrument', penalty: -4, category: 'SK', from: 'Cyberaxe' };
Defaults.MusicalNotation_no_stat_default = { target: 'MusicalNotation', penalty: false, category: 'stat' };

Defaults.Navigation_from_Astronomy  = { target: 'Navigation', penalty: -5, category: 'SK', from: 'Astronomy' };
Defaults.Navigation_from_Seamanship = { target: 'Navigation', penalty: -5, category: 'SK', from: 'Seamanship' };
Defaults.Navigation_no_stat_default = { target: 'Navigation', penalty: false, category: 'stat' };
Defaults.Needlecraft_from_DX = { target: 'Needlecraft', penalty: -4, from: 'DX' };
Defaults.NeiTan_no_stat_default = { target: 'NeiTan', penalty: false, category: 'stat' };
Defaults.Net_no_stat_default = { target: 'Net', penalty: false, category: 'stat' };
Defaults.Netmaking_from_DX = { target: 'Netmaking', penalty: -6, from: 'DX' };
Defaults.Neurophon_no_stat_default = { target: 'Neurophon', penalty: false, from: 'stat' };
Defaults.NoLandingExtraction_from_IQ = { target: 'NoLandingExtraction', penalty: -6, from: 'IQ' };
Defaults.NBCWarfare_from_IQ = { target: 'NBCWarfare', penalty: -6, from: 'IQ' };

Defaults.Occultism_from_IQ = { target: 'Occultism', penalty: -6, from: 'IQ' };
Defaults.OpenDressDiving_from_Scuba       = { target: 'OpenDressDiving', penalty: -2, category: 'SK', from: 'Scuba' };
Defaults.OpenDressDiving_no_stat_default  = { target: 'OpenDressDiving', penalty: false, category: 'stat' };
Defaults.Orienteering_from_Navigation = { target: 'Orienteering', penalty: -2, category: 'SK', from: 'Navigation' };

Defaults.Packing_from_AnimalHandling = { target: 'Packing', penalty: -6, category: 'SK', from: 'AnimalHandling' };
Defaults.Paleontology_from_Anthropology      = { target: 'Paleontology', penalty: -5, category: 'SK', from: 'Anthropology' };   // insane!!
// Defaults.Paleobotany_from_Botany             = { target: 'Paleontology', targetSpec: 'Paleobotany',       penalty: -3, category: 'SK', from: 'Botany' };
// Defaults.Paleoanthropology_from_Anthropology = { target: 'Paleontology', targetSpec: 'Paleoanthropology', penalty: -2, category: 'SK', from: 'Anthropology' };
// Defaults.Paleozoology_from_Zoology           = { target: 'Paleontology', targetSpec: 'Paleozoology',      penalty: -4, category: 'SK', from: 'Zoology' };
// Defaults.Micropaleontology_from_Biochemistry = { target: 'Paleontology', targetSpec: 'Micropaleontology', penalty: -3, category: 'SK', from: 'Biochemistry' };
// Defaults.Micropaleontology_from_Botany       = { target: 'Paleontology', targetSpec: 'Micropaleontology', penalty: -4, category: 'SK', from: 'Botany' };
// Defaults.Paleontology_from_Paleontology      = { target: 'Paleontology', targetSpec: 'other', penalty: -2, category: 'SK', from: 'Paleontology', fromSpec: 'other' };
Defaults.Panhandling_from_Bard     = { target: 'Panhandling', penalty: -3, category: 'SK', from: 'Bard' };
Defaults.Panhandling_from_FastTalk = { target: 'Panhandling', penalty: -2, category: '"SK', from: 'FastTalk' };
Defaults.Panhandling_from_IQ       = { target: 'Panhandling', penalty: -5, from: 'IQ' };
Defaults.Parachuting_from_DX = { target: 'Parachuting', penalty: -4, from: 'DX' };
Defaults.Parachuting_from_IQ = { target: 'Parachuting', penalty: -6, from: 'IQ' };
Defaults.Paraphysics_no_stat_default  = { target: 'Paraphysics', penalty: false, category: 'stat' };
Defaults.Performance_from_Acting = { target: 'Performance', penalty: -2, category: 'SK', from: 'Acting' };
Defaults.Performance_from_Bard   = { target: 'Performance', penalty: -2, category: 'SK', from: 'Bard' };
Defaults.PerformanceRitual_from_Acting = { target: 'PerformanceRitual', penalty: -2, category: 'SK', from: 'Acting' };
Defaults.PerformanceRitual_from_Bard   = { target: 'PerformanceRitual', penalty: -2, category: 'SK', from: 'Bard' };
Defaults.Pharmacy_from_IQ = { target: 'Pharmacy', penalty: -7, from: 'IQ' };
Defaults.Photonics_no_stat_default  = { target: 'Photonics', penalty: false, category: 'stat' };
Defaults.Photonics_from_Electronics = { target: 'Photonics', penalty: -4, category: 'SK', from: 'Electronics', fromSpec: 'same' };
Defaults.Photonics_from_Photonics   = { target: 'Photonics', penalty: -4, category: 'SK', from: 'Photonics',   fromSpec: 'other' };
Defaults.Physician_from_Veterinary = { target: 'Physician', penalty: -5,  from: 'Veterinary', category: 'SK' };
Defaults.Physician_from_FirstAid   = { target: 'Physician', penalty: -11, from: 'FirstAid',   category: 'SK' };
Defaults.Physician_from_IQ         = { target: 'Physician', penalty: -7,  from: 'IQ' };
Defaults.Physiology_from_Xenobiology = { target: 'Physiology', penalty: -4, category: 'SK', from: 'Xenobiology' };
Defaults.Pickpocket_from_SleightofHand = { target: 'Pickpocket', penalty: -4, category: 'SK', from: 'SleightofHand' };
Defaults.PictureWriting_no_stat_default = { target: 'PictureWriting', penalty: false, from: 'stat' };
Defaults.Piloting_from_IQ   = { target: 'Piloting', penalty: -6, from: 'IQ' };
Defaults.Planetology_from_Geology     = { target: 'Planetology', penalty: -4, category: 'SK', from: 'Geology' };
Defaults.Planetology_from_Meteorology = { target: 'Planetology', penalty: -4, category: 'SK', from: 'Meteorology' };
Defaults.Planetology_from_Planetology = { target: 'Planetology', penalty: -3, category: 'SK', from: 'Planetology', fromSpec: 'other' };
Defaults.Poetry_from_Language = { target: 'Poetry', penalty: -5, category: 'GR', from: 'Language' };
Defaults.Poisons_from_Chemistry = { target: 'Poisons', penalty: -5, category: 'SK', from: 'Chemistry' };
Defaults.Poisons_from_Physician = { target: 'Poisons', penalty: -3, category: 'SK', from: 'Physician' };
Defaults.Politics_from_Diplomacy = { target: 'Politics', penalty: -5, category: 'SK', from: 'Diplomacy' };
Defaults.Powerboat_from_Boating = { target: 'Powerboat', penalty: -3, category: 'SK', from: 'Boating' };
Defaults.Powerboat_from_DX      = { target: 'Powerboat', penalty: -5, from: 'DX' };
Defaults.Powerboat_from_IQ      = { target: 'Powerboat', penalty: -5, from: 'IQ' };
Defaults.PressurePoints_from_YinYangHealing = { target: 'PressurePoints', penalty: -4, category: '"SK', from: 'YinYangHealing' };
Defaults.ProbabilityPhysics_no_stat_default = { target: 'ProbabilityPhysics', penalty: false, from: 'stat' };
Defaults.Prospecting_from_Geology = { target: 'Prospecting', penalty: -4, category: 'SK', from: 'Geology' };
Defaults.Psionics_no_stat_default = { target: 'Psionics', penalty: false, from: 'stat' };
Defaults.Punning_from_Bard       = { target: 'Punning', penalty: -3, category: 'SK', from: 'Bard' };
Defaults.Punning_no_stat_default = { target: 'Punning', penalty: false, from: 'stat' };


Defaults.Research_from_Writing = { target: 'Research', penalty: -3, category: 'SK', from: 'Writing' };
Defaults.RidingBeingRidden_from_DX = { target: 'Riding', targetSpec: 'BeingRidden', penalty: -5, from: 'DX' };
// Defaults.RidingFlyingPerson_from_DX = { target: 'Riding', targetSpec: 'FlyingPerson', penalty: -5, from: 'DX' };
// Defaults.RidingFlyingPerson_from_Surfboard  = { target: 'Riding', targetSpec: 'FlyingPerson', penalty: -4, from: 'Surfboard' };
// Defaults.RidingFlyingPerson_from_Skateboard = { target: 'Riding', targetSpec: 'FlyingPerson', penalty: -4, from: 'Skateboard' };
Defaults.Riding_from_AnimalHandling = { target: 'Riding', penalty: -3, category: 'SK', from: 'AnimalHandling' };
//Defaults.Ridingtype_from_DX = { target: 'Ridingtype', penalty: -5, from: 'DX' };
Defaults.RitualMagic_no_stat_default = { target: 'RitualMagic', penalty: false, from: 'stat' };
Defaults.RuneNounAir_no_stat_default = { target: 'RuneNounAir', penalty: false, category: 'stat' };
Defaults.RuneNounAnimal_no_stat_default = { target: 'RuneNounAnimal', penalty: false, category: 'stat' };
Defaults.RuneNounBodyMan_no_stat_default = { target: 'RuneNounBodyMan', penalty: false, category: 'stat' };
Defaults.RuneNounEarth_no_stat_default = { target: 'RuneNounEarth', penalty: false, category: 'stat' };
Defaults.RuneNounFire_no_stat_default = { target: 'RuneNounFire', penalty: false, category: 'stat' };
Defaults.RuneNounFood_no_stat_default = { target: 'RuneNounFood', penalty: false, category: 'stat' };
Defaults.RuneNounIllusion_no_stat_default = { target: 'RuneNounIllusion', penalty: false, category: 'stat' };
Defaults.RuneNounLightDark_no_stat_default = { target: 'RuneNounLightDark', penalty: false, category: 'stat' };
Defaults.RuneNounMagic_no_stat_default = { target: 'RuneNounMagic', penalty: false, category: 'stat' };
Defaults.RuneNounMind_no_stat_default = { target: 'RuneNounMind', penalty: false, category: 'stat' };
Defaults.RuneNounPlant_no_stat_default = { target: 'RuneNounPlant', penalty: false, category: 'stat' };
Defaults.RuneNounSound_no_stat_default = { target: 'RuneNounSound', penalty: false, category: 'stat' };
Defaults.RuneNounUndead_no_stat_default = { target: 'RuneNounUndead', penalty: false, category: 'stat' };
Defaults.RuneNounWater_no_stat_default = { target: 'RuneNounWater', penalty: false, category: 'stat' };
Defaults.RuneVerbCommunicate_no_stat_default = { target: 'RuneVerbCommunicate', penalty: false, category: 'stat' };
Defaults.RuneVerbControl_no_stat_default = { target: 'RuneVerbControl', penalty: false, category: 'stat' };
Defaults.RuneVerbCreate_no_stat_default = { target: 'RuneVerbCreate', penalty: false, category: 'stat' };
Defaults.RuneVerbHeal_no_stat_default = { target: 'RuneVerbHeal', penalty: false, category: 'stat' };
Defaults.RuneVerbMove_no_stat_default = { target: 'RuneVerbMove', penalty: false, category: 'stat' };
Defaults.RuneVerbProtect_no_stat_default = { target: 'RuneVerbProtect', penalty: false, category: 'stat' };
Defaults.RuneVerbSense_no_stat_default = { target: 'RuneVerbSense', penalty: false, category: 'stat' };
Defaults.RuneVerbStrengthen_no_stat_default = { target: 'RuneVerbStrengthen', penalty: false, category: 'stat' };
Defaults.RuneVerbTransform_no_stat_default = { target: 'RuneVerbTransform', penalty: false, category: 'stat' };
Defaults.RuneVerbWarn_no_stat_default = { target: 'RuneVerbWarn', penalty: false, category: 'stat' };
Defaults.RuneVerbWeaken_no_stat_default = { target: 'RuneVerbWeaken', penalty: false, category: 'stat' };
Defaults.Running_no_stat_default = { target: 'Running', penalty: false, from: 'stat' };

Defaults.Sacrifice_no_stat_default = { target: 'Sacrifice', penalty: false, from: 'stat' };
Defaults.SavoirFaireDojo_from_TournamentLaw = { target: 'SavoirFaireDojo', penalty: -3, category: 'SK', from: 'TournamentLaw' };
Defaults.SavoirFaireServant_from_TournamentLaw = { target: 'SavoirFaireServant', penalty: -2, category: 'SK', from: 'SavoirFaire' };
Defaults.SceneDesign_from_Architecture = { target: 'SceneDesign', penalty: -3, category: 'SK', from: 'Architecture' };
Defaults.Science_no_stat_default = { target: 'Science', penalty: false, from: 'stat' };
Defaults.Scuba_from_Swimming = { target: 'Scuba', penalty: -5, category: 'SK', from: 'Swimming' };
Defaults.Sculpting_from_DX = { target: 'Sculpting', penalty: -5, from: 'DX' };
Defaults.SensieInterface_from_CyberdeckOperation = { target: 'SensieInterface', penalty: -3,    from: 'CyberdeckOperation', category: 'SK' };
Defaults.SensieInterface_no_stat_default         = { target: 'SensieInterface', penalty: false, from: 'stat' };
Defaults.SexAppeal_from_HT = { target: 'SexAppeal', penalty: -3, from: 'HT' };
Defaults.Shadowing_from_IQ = { target: 'Shadowing', penalty: -6, from: 'IQ' };
// Defaults.Shadowing_from_Stealth = { target: 'Shadowing', penalty: -4, category: 'SK', from: 'Stealth' };   // on foot only - not a 'real' default
Defaults.Shield_from_Buckler = { target: 'Shield', penalty: -2, category: 'SK', from: 'Buckler' };
Defaults.ShipbuildingStarship_from_IQ           = { target: 'ShipbuildingStarship', penalty: -5, from: 'IQ' };
Defaults.ShipbuildingStarship_from_Shipbuilding = { target: 'ShipbuildingStarship', penalty: -5, category: 'SK', from: 'Shipbuilding' };
Defaults.Shipbuilding_from_ShipbuildingStarship = { target: 'Shipbuilding', penalty: -5, category: 'SK', from: 'ShipbuildingStarship' };
Defaults.ShortStaff_from_DX    = { target: 'ShortStaff', penalty: -5, from: 'DX' };
Defaults.ShortStaff_from_Staff = { target: 'ShortStaff', penalty: -2, category: 'SK', from: 'StaffSkill' };
Defaults.Shortsword_from_Broadsword = { target: 'Shortsword', penalty: -2, category: 'SK', from: 'Broadsword' };
Defaults.Shortsword_from_ForceSword = { target: 'Shortsword', penalty: -3, category: 'SK', from: 'ForceSword' };
Defaults.Shuriken_from_Throwing = { target: 'Shuriken', penalty: -2, category: 'SK', from: 'Throwing' };
Defaults.SIGINTCollectionJamming_no_stat_default = { target: 'SIGINTCollectionJamming', penalty: false, from: 'stat' };
Defaults.SleightofHand_no_stat_default = { target: 'SleightofHand', penalty: false, from: 'stat' };
Defaults.SlippingtheHammer_from_DX   = { target: 'SlippingtheHammer', penalty: -5, from: 'DX' };
Defaults.SlippingtheHammer_from_Guns = { target: 'SlippingtheHammer', penalty: -2, category: 'SK', from: 'Guns' };
Defaults.SnakeCharming_from_AnimalHandling = { target: 'SnakeCharming', penalty: -4, category: 'SK', from: 'AnimalHandling' };
Defaults.SnakeCharming_from_Hypnotism      = { target: 'SnakeCharming', penalty: -2, category: 'SK', from: 'Hypnotism' };
Defaults.Spear_from_StaffSkill = { target: 'Spear', penalty: -2, category: 'SK', from: 'StaffSkill' };
Defaults.SpearThrower_from_DX            = { target: 'SpearThrower', penalty: -4, from: 'DX' };
Defaults.SpearThrower_from_SpearThrowing = { target: 'SpearThrower', penalty: -4, category: 'SK', from: 'SpearThrowing' };
Defaults.SpearThrowing_from_SpearThrower = { target: 'SpearThrowing', penalty: -4, category: 'SK', from: 'SpearThrower' };
Defaults.SpeedLoad_no_stat_default = { target: 'SpeedLoad', penalty: false, from: 'stat' };
Defaults.SpeedReading_no_stat_default = { target: 'SpeedReading', penalty: false, from: 'stat' };
Defaults.SpellThrowing_from_DX       = { target: 'SpellThrowing', penalty: -3, from: 'DX' };
Defaults.SpellThrowing_from_Throwing = { target: 'SpellThrowing', penalty: 0, category: 'SK', from: 'Throwing' };
Defaults.SpellThrowing_from_SpellThrowing = { target: 'SpellThrowing', penalty: -3, from: 'SpellThrowing', fromSpec: 'other' };
Defaults.Sport_from_DX = { target: 'Sport', penalty: -5, from: 'DX' };  // leave here because many sports will have additional attribute defaults (but won't those all be done as custom skills?)
Defaults.StaffSkill_from_DX    = { target: 'StaffSkill', penalty: -5, from: 'DX' };
Defaults.StaffSkill_from_Spear = { target: 'StaffSkill', penalty: -2, category: 'SK', from: 'Spear' };
Defaults.StageCombat_from_CombatSkill     = { target: 'StageCombat', penalty: -3, category: 'GR', from: 'CombatWeaponSkills' };
Defaults.StageCombat_from_CombatWeaponArt = { target: 'StageCombat', penalty: -2, category: 'SK', from: 'CombatWeaponArt' };
Defaults.StageCombat_from_Performance     = { target: 'StageCombat', penalty: -3, category: 'SK', from: 'Performance' };
Defaults.StageCombat_no_stat_default      = { target: 'StageCombat', penalty: false, from: 'stat' };
Defaults.Starglazing_from_Lockpicking = { target: 'Starglazing', penalty: -4, category: 'SK', from: 'Lockpicking' };
Defaults.Stealth_from_IQ = { target: 'Stealth', penalty: -5, from: 'IQ' };
Defaults.Stealth_from_DX = { target: 'Stealth', penalty: -5, from: 'DX' };
Defaults.Strategy_from_Strategy = { target: 'Strategy', penalty: -6, category: 'SK', from: 'Strategy', fromSpec: 'other' };
Defaults.Strategy_from_Tactics  = { target: 'Strategy', penalty: -6, category: 'SK', from: 'Tactics' };
Defaults.StyleAnalysis_from_BodyLanguage      = { target: 'StyleAnalysis', penalty: -6, category: 'SK', from: 'BodyLanguage' };
Defaults.StyleAnalysis_from_TacticsHandtoHand = { target: 'StyleAnalysis', penalty: -6, category: 'SK', from: 'Tactics', fromSpec: 'HandtoHand' };
Defaults.Surgery_from_Veterinary = { target: 'Surgery', penalty:  -5, category: 'SK', from: 'Veterinary' };
Defaults.Surgery_from_Physician  = { target: 'Surgery', penalty:  -5, category: 'SK', from: 'Physician' };
Defaults.Surgery_from_Physiology = { target: 'Surgery', penalty:  -8, category: 'SK', from: 'Physiology' };
Defaults.Surgery_from_FirstAid   = { target: 'Surgery', penalty: -12, category: 'SK', from: 'FirstAid' };
Defaults.Surveying_from_Cartography = { target: 'Surveying', penalty: -5, category: 'SK', from: 'Cartography' };
Defaults.Surveying_from_Navigation  = { target: 'Surveying', penalty: -5, category: 'SK', from: 'Navigation' };
Defaults.Survival_from_Naturalist = { target: 'Survival', penalty: -3, category: 'SK', from: 'Naturalist' };
Defaults.Survival_from_Survival   = { target: 'Survival', penalty: -3, category: 'SK', from: 'Survival' };
Defaults.Swimming_from_DX = { target: 'Swimming', penalty: -4, from: 'DX' };
Defaults.Swimming_from_ST = { target: 'Swimming', penalty: -5, from: 'ST' };
Defaults.SymbolDrawing_from_RitualMagic = { target: 'SymbolDrawing', penalty: -4, category: 'SK', from: 'RitualMagic', fromSpec: 'same' };
Defaults.SymbolDrawing_no_stat_default  = { target: 'SymbolDrawing', penalty: false, from: 'stat' };

Defaults.TacticsNaval_from_Strategy = { target: 'TacticsNaval', penalty: -6, category: 'SK', from: 'Strategy', fromSpec: 'Naval' };   // hmmm...
Defaults.TacticsNaval_from_Tactics  = { target: 'TacticsNaval', penalty: -2, category: 'SK', from: 'Tactics' };   // hmmm...
Defaults.Tactics_from_Strategy      = { target: 'Tactics',      penalty: -6, category: 'SK', from: 'Strategy' };
Defaults.Tanning_from_IQ = { target: 'Tanning', penalty: -4, from: 'IQ' };
Defaults.TeaCeremony_from_Meditation = { target: 'TeaCeremony', penalty: -2, category: 'SK', from: 'Meditation' };
Defaults.Teamster_from_AnimalHandling = { target: 'Teamster', penalty: -4, category: 'SK', from: 'AnimalHandling' };
Defaults.Teamster_from_Riding         = { target: 'Teamster', penalty: -2, category: 'SK', from: 'Riding' };
Defaults.TemporalElectronics_no_stat_default        = { target: 'TemporalElectronics', penalty: false, from: 'stat' };
Defaults.TemporalElectronics_from_Electronics       = { target: 'TemporalElectronics', penalty: -5, category: 'SK', from: 'Electronics' };
Defaults.TemporalElectronics_from_TemporalOperation = { target: 'TemporalElectronics', penalty: -6, category: 'SK', from: 'TemporalOperation' };
Defaults.TemporalOperation_no_stat_default          = { target: 'TemporalOperation', penalty: false, from: 'stat' };
Defaults.TemporalOperation_from_TemporalElectronics = { target: 'TemporalOperation', penalty: -2, category: 'SK', from: 'TemporalElectronics' };
Defaults.TemporalPhysics_no_stat_default          = { target: 'TemporalPhysics', penalty: false, from: 'stat' };
Defaults.TemporalPhysics_from_Physics             = { target: 'TemporalPhysics', penalty: -4, category: 'SK', from: 'Physics' };
Defaults.TemporalPhysics_from_TemporalElectronics = { target: 'TemporalPhysics', penalty: -6, category: 'SK', from: 'TemporalElectronics' };
Defaults.Thanatology_no_stat_default = { target: 'Thanatology', penalty: false, from: 'stat' };
Defaults.Thanatology_from_Diagnosis  = { target: 'Thanatology', penalty: -5, category: 'SK', from: 'Diagnosis' };
Defaults.Thanatology_from_Psychology = { target: 'Thanatology', penalty: -5, category: 'SK', from: 'Psychology' };
//Defaults.Thanatology_from_Sociology  = { target: 'Thanatology', penalty: -5, category: 'SK', from: 'Sociology' };
Defaults.Thanatology_from_Mortician  = { target: 'Thanatology', penalty: -3, category: 'SK', from: 'ProfessionalSkill', fromSpec: 'Mortician' };
Defaults.Thaumatology_from_IQ = { target: 'Thaumatology', penalty: -6, from: 'IQ' };
Defaults.Tonfa_from_Shortsword = { target: 'Tonfa', penalty: -3, category: 'SK', from: 'Shortsword' };
Defaults.TournamentLaw_from_IQ = { target: 'TournamentLaw', penalty: -6, from: 'IQ' };
Defaults.Tracking_from_Naturalist = { target: 'Tracking', penalty: -5, category: 'SK', from: 'Naturalist' };
Defaults.TrafficAnalysis_no_stat_default = { target: 'TrafficAnalysis', penalty: false, from: 'stat' };
Defaults.Traps_from_IQ          = { target: 'Traps', penalty: -5, from: 'IQ' };
Defaults.Traps_from_DX          = { target: 'Traps', penalty: -5, from: 'DX' };
Defaults.Traps_from_Lockpicking = { target: 'Traps', penalty: -3, from: 'Lockpicking', category: 'SK' };
Defaults.TwoHandedSword_from_ForceSword = { target: 'TwoHandedSword', penalty: -3, category: 'SK', from: 'ForceSword' };

Defaults.UnderwaterDemolition_no_stat_default = { target: 'UnderwaterDemolition', penalty: false, from: 'stat' };
// Defaults.UnderwaterDemolition_from_Demolition = { target: 'UnderwaterDemolition', penalty: -2, category: 'SK', from: 'Demolition' };  // not a 'real' default; only for setting charges (doesn't help with scuba!)
Defaults.UtteringofBaseCoin_no_stat_default    = { target: 'UtteringofBaseCoin', penalty: false, from: 'stat' };
Defaults.UtteringofBaseCoin_from_Forgery = { target: 'UtteringofBaseCoin', penalty: -2,    from: 'Forgery', category: 'SK' };

Defaults.VaccSuit_from_IQ = { target: 'VaccSuit', penalty: -6, from: 'IQ' };
Defaults.Ventriloquism_no_stat_default = { target: 'Ventriloquism', penalty: false, from: 'stat' };
Defaults.Veterinary_from_AnimalHandling = { target: 'Veterinary', penalty: -5, category: 'SK', from: 'AnimalHandling' };
Defaults.VideoProduction_from_IQ          = { target: 'VideoProduction', penalty: -6, from: 'IQ' };
Defaults.VideoProduction_from_Performance = { target: 'VideoProduction', penalty: -4, category: 'SK', from: 'Performance' };

Defaults.Weaving_from_DX = { target: 'Weaving', penalty: -2, from: 'DX' };
Defaults.WeirdScience_no_stat_default = { target: 'WeirdScience', penalty: false, from: 'stat' };
Defaults.Whip_no_stat_default = { target: 'Whip', penalty: false, from: 'stat' };
Defaults.Woodworking_from_Carpentry = { target: 'Woodworking', penalty: -3, category: 'SK', from: 'Carpentry' };
Defaults.Writing_from_Language = { target: 'Writing', penalty: -5, category: 'GR', from: 'Language' };

Defaults.Xenobiology_no_stat_default = { target: 'Xenobiology', penalty: false, from: 'stat' };

Defaults.Zoology_from_Xenobiology = { target: 'Zoology', penalty: -3, category: 'SK', from: 'Xenobiology' };


var Groups = {
//   GeneralAds : ['BlessedDivination','BlessedHeroicFeatsST','BlessedHeroicFeatsDX','BlessedHeroicFeatsHT',
//                 'ClericalInvestment','Magery','MagicResistance'],
//  Clerical     : ['Bonus1toHealingSkills'],
//  ClericalMods : ['Bonus1toHealingSkills'],
  // skill categories
  SkillCategories : ['AnimalSkills','ArtisticSkills','AthleticSkills','WeaponsSkills','CombatWeaponSkills','CraftSkills','LanguageSkills','MedicalSkills',
                     'OutdoorSkills','ProfessionalSkills','PsiSkills','ScientificSkills','SocialSkills','ThiefSpySkills','VehicleSkills'],
  // Fishing excluded by Raphael Holyoak (Magic) example; has Animal Empathy but no bonus to Fishing skill
  AnimalSkills : ['AnimalHandling','Falconry','Packing','Riding','Teamster','Tracking','Veterinary',
                  'Bulldancing','Bullfighting','EquestrianAcrobatics','SnakeCharming'],
  ArtisticSkills : ['Artist','Bard','Calligraphy','Dancing','MusicalInstrument','Photography','Poetry','Sculpting','Singing','Writing',
                    'AppreciateBeauty','Bulldancing','Choreography','Conducting','Cyberaxe','Directing','Featherworking','FightChoreography','FireEating',
                    'FlowerArranging','Gardening','Illumination','IllusionArt','Juggling','LucidDreaming','MakeUp','MusicalComposition','Neurophon',
                    'Origami','PictureWriting','Punning','SceneDesign','SensieInterface','StageCombat','SymbolDrawing','VideoProduction','Weaving'],
  AthleticSkills : ['Acrobatics','Bicycling','BreathControl','FreeFall','Jumping','Parachuting','Riding','Running', 'Scuba',
                    'Skiing','Swimming','Throwing', 'BodySense','Bulldancing','Darts','EquestrianAcrobatics',
                    'Flight','Hiking', 'InertialessAgility','Juggling','Lifting','LowGFlight','Skating','StageCombat','TournamentLaw'],
  HandWeaponSkills : ['AxeMace','Blackjack','Broadsword','Fencing','Flail','ForceSword','Garrote',
                      'Harpoon','JitteSai','Katana','Knife','Kusari','Lance','MainGauche','Net',
                      'Polearm','ShortStaff','Shortsword','Spear','StaffSkill','Tonfa',
                      'TwoHandedAxeMace','TwoHandedSword'],
  // plus some (gear and missile weapons?) =
  WeaponsSkills : ['AxeMace','Battlesuit','BeamWeapons','Blackjack','BlackPowderWeapons',
                   'BlowpipeFukiya','Bolas','Bow','Broadsword','Buckler','Crossbow','Fencing',
                   'FireSiphon','Flail','ForceShield','ForceSword','ForceWhip','Garrote','Gunner',
                   'Guns','Harpoon','JitteSai','Katana','Knife','Kusari','Lance','Lasso',
                   'MainGauche','MonowireWhip','Net','Polearm','Shield','ShortStaff','Shortsword',
                   'Shuriken','Sling','Spear','SpearThrower','StaffSkill','ThrowingStick','Tonfa',
                   'TwoHandedAxeMace','TwoHandedSword','Whip'],
  // plus some more (combat skills, e.g. throwing skills?) =
  CombatWeaponSkills : ['AxeMace','AxeThrowing','Battlesuit','BeamWeapons','Blackjack','BlackPowderWeapons','Bolas','Bow','Brawling','Broadsword',
                        'Buckler','Crossbow','FastDraw','Fencing','Flail','ForceShield','ForceSword','Gunner','Guns','Judo',
                        'Karate','Knife','KnifeThrowing','Lance','Lasso','Net','Polearm','Shield','Shortsword','Sling',
                        'Spear','SpearThrower','SpearThrowing','SpeedLoad','StaffSkill','ThrownWeapon','TwoHandedAxeMace','TwoHandedSword','Whip',
                        'BlowpipeFukiya','BodyLanguage','Boxing','Bullfighting','Cloak','Fanning','FireSiphon','ForceWhip','Garrote','Harpoon',
                        'JitteSai','Katana','Kusari','MainGauche','MonowireWhip','ParryMissileWeapons','Sensitivity','ShortStaff','Shuriken','SlippingtheHammer',
                        'SpellThrowing','StageCombat','StyleAnalysis','SumoWrestling','Throwing','ThrowingStick','Tonfa','Wrestling'],
  CraftSkills : ['AppreciateBeauty','ArmouryTL5down','ArmouryTL6plus','BeverageMaking','Blacksmith','Carpentry','Cooking','Cooperage','Distilling','Dyeing',
                 'Fireworks','GlassBlowing','Jeweler','Leatherworking','Masonry','Mechanic','Needlecraft','Netmaking','Pottery',
                 'Shipbuilding','ShipbuildingStarship','StoneKnapping','Tanning','Tattooing','Weaving','Woodworking'],
  SoftCraftSkills : ['AppreciateBeauty','BeverageMaking','Carpentry','Cooking','Cooperage','Distilling','Dyeing','Fireworks','GlassBlowing',
                     'Leatherworking','Needlecraft','Netmaking','Pottery','StoneKnapping','Tanning','Tattooing','Weaving','Woodworking'],
  EsotericSkills : ['Augury','Autohypnosis','BlindFighting','BlindingTouch','BodyControl','BreakingBlow','ChangeControl','ChiTreatment','Dislocating',
                    'Dreaming','DrunkenFighting','Persuade','SwayEmotions','Suggest','Captivate','FireWalking','FlyingFists','FlyingLeap',
                    'HandofDeath','HypnoticHands','ImmovableStance','InvisibilityArt','Kiai','LightWalk','LucidDreaming','Meditation',
                    'MentalStrength','MountainHeart','MuscleReading','PowerBlow','PrecognitiveParry','PressurePoints','PressureSecrets',
                    'Push','RitualMagic','Shapeshifting','SonarImaging','ThrowingArt','YinYangHealing','ZenArchery'],
  HobbySkills : ['Chess','Darts','Games','KiteFlying'],
  KnowledgeSkills : ['BardicLore','HiddenLore','PerformanceRitual','RitualsandCeremonies','RitualMagic','Sacrifice','SkaldicLore','SymbolDrawing','TeaCeremony','TournamentLaw'],
  LanguageSkills : ['Gesture','SignLanguage','Telegraphy'],
  MagicalSkills : ['Alchemy','BodySense','Flight','IllusionArt','MagicBreath','MagicJet','Occultism','RitualMagic','RuneLore','SpellThrowing','SymbolDrawing','Thaumatology','WeirdMagic'],
  MathSkills : ['Accounting','ComputerProgramming','Mathematics','Physics'],
  MedicalSkills : ['Diagnosis','FirstAid','Hypnotism','Physician','Surgery','ChiTreatment','Herbalist','Herbary','Pharmacy','Veterinary','YinYangHealing'],
  MilitarySkills : ['Cryptanalysis','Cryptography','Cryptology','ExplosiveOrdinanceDisposal','ForwardObserver','IntelligenceAnalysis',
                    'NoLandingExtraction','NBCWarfare','SIGINTCollectionJamming','TacticsNaval','TrafficAnalysis'],
  Music : ['Singing','MusicalInstrument'],
  OutdoorSkills : ['AreaKnowledge','Boating','Climbing','Fishing','Naturalist','Navigation','Seamanship','Survival','Tracking',
                   'AnimalGuise','BowandPalette','Cartography','FlintSparking','HardHatDiving','Hiking','Mimicry','OpenDressDiving','Orienteering','Skating','Surveying'],
  ProfessionalSkills : ['Accounting','ComputerOperation','ElectronicsOperation','Heraldry','Law',
                        'Abacus','Aviation','Bartender','Courtesan','CyberdeckOperation','Exorcism','Fortunetelling',
                        'MusicalNotation','Panhandling','Sailor','TemporalOperation','Typing','VideoProduction'],
  PsiSkills : ['PsiSense','EmotionSense','Telesend','Telereceive','MentalBlow','MindShield','Sleep','Mindwipe','Telecontrol',
               'Telekinesis','Levitation','Pyrokinesis','Cryokinesis','PKShield','Clairvoyance','Clairaudience','Psychometry','Precognition',
               'Autoteleport','Exoteleport','Healing','PsionicResistance','PsiStatic',
               'BodySense','Flight','MindBlock','Paraphysics','Psionics'],
  RuneSkills : ['RuneLore','RuneVerbCreate','RuneVerbControl','RuneVerbHeal','RuneVerbTransform','RuneVerbSense',
                'RuneVerbCommunicate','RuneVerbWeaken','RuneVerbStrengthen','RuneVerbMove','RuneVerbProtect','RuneVerbWarn',
                'RuneNounEarth','RuneNounAnimal','RuneNounMagic','RuneNounBodyMan','RuneNounMind','RuneNounUndead','RuneNounAir',
                'RuneNounFire','RuneNounWater','RuneNounPlant','RuneNounIllusion','RuneNounLightDark','RuneNounFood','RuneNounSound'],
  ScienceSkills : ['Agronomy','Alchemy','Anthropology','Archaeology','Architecture','Astrogation','Astronomy','Biochemistry','Botany',
                   'Chemistry','ComputerProgramming','Criminology','Ecology','Economics','Electronics','Engineer','Forensics',
                   'Genetics','Geology','History','Linguistics','Literature','Mathematics','Metallurgy','Meteorology','Naturalist',
                   'NuclearPhysics','Occultism','Physics','Physiology','Prospecting','Psychology','Research','Theology','Zoology',
                   'Abacus','ArtificialIntelligence','Cartography','ComputerHacking','ConspiracyTheory','Cryptanalysis','Cryptography',
                   'Cryptology','Cyphering','Herbalist','Herbary','HistoryEsoteric','Hydrology','HyperspacePhysics','Paleontology',
                   'Paraphysics','Philosophy','Photonics','Planetology','ProbabilityPhysics','Psionics','Science','SpeedReading','Surveying',
                   'TemporalElectronics','TemporalPhysics','Thanatology','Thaumatology','WeirdScience','Xenobiology','Xenology'],
  SocialSkills : ['Acting','Administration','AreaKnowledge','Bard','Diplomacy','FastTalk','Gambling','Leadership',
                  'Merchant','Performance','Politics','SavoirFaire','SexAppeal','Strategy','Tactics','Teaching',
                  'AppreciateBeauty','EroticArt','Intimidation','PerformanceRitual','SavoirFaireDojo','SavoirFaireServant','TeaCeremony'],
  ThiefSpySkills : ['Acting','Climbing','Camouflage','Demolition','DetectLies','Disguise','Escape','FastTalk','Forgery','Holdout',
                    'IntelligenceAnalysis','Interrogation','LipReading','Lockpicking','Pickpocket','Poisons','Scrounging','Shadowing',
                    'SleightofHand','Stealth','Streetwise','Tracking','Traps','UnderwaterDemolition','Ventriloquism',
                    'BrainHacking','ComputerHacking','Filch','Starglazing','UtteringofBaseCoin'],
  VehicleSkills : ['Battlesuit','Bicycling','Boating','Driving','Gunner','Mechanic','Motorcycle','Piloting','Powerboat','Teamster','VaccSuit',
                   'Airshipman','Aviation','Exoskeleton','Sailor','Shiphandling'],

  // MagicColleges is a 'meta-group', a group of groups (entries must all be keys in the Groups object)
  MagicColleges : ['Air','Earth','Fire','Water','Animal','CommunicationEmpathy','Enchantment','Healing',
              'Knowledge','LightDarkness','MakingBreaking','MindControl'],
  // These are in 'book order,' which preserves some sense of the prerequisite chain
  AnimalSpells : ['BeastSoother','BeastSummoning','ReptileControl','BirdControl','MammalControl'],
  CommunicationEmpathySpells   : ['SenseLife','SenseFoes','SenseEmotion','Truthsayer','MindReadingSpell','Persuasion'],
  EarthSpells : ['SeekEarth','ShapeEarth','EarthtoStone','StonetoEarth','CreateEarth','StoneMissile','EarthtoAir','EarthVision',
                 'SummonEarthElemental','ControlEarthElemental','CreateEarthElemental'],
  AirSpells : ['PurifyAir','CreateAir','ShapeAir','PredictWeather','WalkonAir','BreatheWater','Clouds','Rain','EarthtoAir','Lightning',
               'SummonAirElemental','ControlAirElemental','CreateAirElemental'],
  FireSpells : ['IgniteFire','CreateFire','ShapeFire','ExtinguishFire','Heat','Cold','ResistFire','Fireball',
                'SummonFireElemental','ControlFireElemental','CreateFireElemental'],
  WaterSpells : ['SeekWater','PurifyWater','CreateWater','DestroyWater','ShapeWater','BreatheWater','WalkonWater','Fog','IceSphere','Rain',
                 'SummonWaterElemental','ControlWaterElemental','CreateWaterElemental'],
  EnchantmentSpells : ['Enchant','Scroll','RemoveEnchantment','Power','Accuracy','Puissance','Fortify','Deflect','Lighten','StaffSpell','Powerstone'],
  HealingSpells : ['LendStrength','LendHealth','RecoverStrength','Awaken','MinorHealing','MajorHealing'],
  KnowledgeSpells : ['DetectMagic','Aura','Seeker','Trace','IdentifySpell','AnalyzeMagic'],
  LightDarknessSpells : ['Light','ContinualLight','Flash','Darkness','Blur'],
  MakingBreakingSpells : ['FindWeakness','Weaken','Shatter','Restore','Rejoin','Repair'],
  MindControlSpells : ['Fear','Bravery','Foolishness','Daze','MassDaze','Sleep','MassSleep'],
  SeekSpells : ['SeekEarth','SeekWater'],
  AnimalControlSpells : ['ReptileControl','BirdControl','MammalControl'],
/* Disabling these versions of the above Groups, as they include the Magic supplement colleges and spells
  MagicColleges : ['Air','Earth','Fire','Water','AnimalSpells','BodyControl','CommunicationEmpathy','Enchantment','Food','Healing','IllusionCreation',
              'Knowledge','LightDarkness','MakingBreaking','Meta','MindControl','Movement','Necromantic','Plant','ProtectionWarning','Sound'],
  AirSpells : ['AirJet','BodyofAir','BreatheWater','Clouds','ControlAirElemental','CreateAir','CreateAirElemental','DestroyAir','EarthtoAir','Lightning','NoSmell','Odor','PredictWeather','PurifyAir','Rain','ShapeAir','Stench','SummonAirElemental','WalkonAir','Whirlwind','Windstorm'],
  AnimalSpells : ['BeastLink','BeastPossession','BeastSeeker','BeastSpeech','BeastSummoning','BeastSoother','BirdControl','FishControl','InsectControl','MammalControl','Master','MolluskControl','ReptileControl','Rider','RiderWithin','Shapeshifting','ShapeshiftOthers'],
  AnimalControlSpells : ['BirdControl','FishControl','InsectControl','MammalControl','MolluskControl','ReptileControl'],
  BodyControlSpells : ['AlterVisage','AlterBody','Climbing','Clumsiness','CurseMissile','Deathtouch','Dexterity','Fatigue','Hinder','Itch','Might','Pain','ParalyzeLimb','ResistPain','RootedFeet','Roundabout','Sickness','Spasm','StrikeBlind','StrikeDeaf','StrikeDumb','Stun','Tanglefoot','TotalParalysis','Vigor','WitherLimb'],
  FoodSpells : ['Banquet','Cook','CreateFood','Decay','Distill','Ferment','MonksBanquet','PoisonFood','PreserveFood','PurifyFood','SeekFood','TestFood','WatertoWine'],
  IllusionCreationSpells : ['ComplexIllusion','ControlCreation','ControlIllusion','CreateAnimal','CreateObject','CreateServant','CreateWarrior','DispelCreation','DispelIllusion','IllusionDisguise','IllusionShell','Independence','KnowIllusion','PerfectIllusion','SimpleIllusion'],
  MetaSpells : ['ActivateRunes','Bless','ConcealMagic','Curse','Counterspell','Delay','DispelMagic','DrainMana','GreatWard','Pentagram','Link','MagicResistance','Reflect','Reflex','RemoveCurse','RestoreMana','Scryguard','Scrywall','SpellShield','Ward'],
  MovementSpells : ['AirGolem','Apportation','Blink','EtherealBody','Flight','Glue','GreatHaste','Haste','HawkFlight','Levitation','LightenBurden','Lockmaster','Locksmith','Manipulate','Poltergeist','QuickMarch','SlowFall','Swim','Teleport','TeleportOther','Undo','Wallwalker','WingedKnife'],
  NecromanticSpells : ['Age','Animation','Banish','ControlZombie','DeathVision','Pestilence','PlanarSummons','Resurrection','SenseSpirit','SkullSpirit','SoulJar','StealHealth','StealStrength','StealYouth','SummonDemon','SummonShade','SummonSpirit','TurnZombie','Zombie'],
  PlantSpells : ['AnimatePlant','BlessPlants','CreatePlant','ForestWarning','HealPlant','HidePath','IdentifyPlant','PlantForm','PlantGrowth','PlantSense','SeekPlant','ShapePlant','TangleGrowth','WitherPlant'],
  ProtectionWarningSpells : ['Armor','ForceDome','IronArm','Nightingale','Magelock','MissileShield','MysticMist','ReverseMissiles','SenseDanger','ShieldSpell','TeleportShield','Umbrella','UtterDome','Watchdog','WeatherDome'],
  SeekSpells : ['SeekEarth','SeekFood','SeekPlant','SeekWater'],
  SoundSpells : ['DelayedMessage','FarHearing','GreatVoice','Hush','InvisibleWizardEar','KeenEars','MageStealth','Noise','Scribe','Silence','Sound','SoundJet','SoundVision','Thunderclap','Voices','WallofSilence','WizardEar'],
 */
};
// alternate names for groups defined above
Groups.Craft = Groups.CraftSkills;
Groups.Air = Groups.AirSpells;
Groups.Animal = Groups.AnimalSpells;
Groups.AnimalControl = Groups.AnimalControlSpells;
// Groups.BC = Groups.BodyControlSpells;
// Groups.BCSpells = Groups.BodyControlSpells;
// Groups.BodyControl = Groups.BodyControlSpells;
// Groups.BodyControlBCSpells = Groups.BodyControlSpells;
Groups.CE = Groups.CommunicationEmpathySpells;
Groups.CESpells = Groups.CommunicationEmpathySpells;
Groups.Communication = Groups.CommunicationEmpathySpells;
Groups.CommunicationEmpathy = Groups.CommunicationEmpathySpells;
Groups.CommunicationEmpathyCESpells = Groups.CommunicationEmpathySpells;
Groups.Earth = Groups.EarthSpells;
Groups.Enchantment = Groups.EnchantmentSpells;
Groups.Fire = Groups.FireSpells;
// Groups.Food = Groups.FoodSpells;
Groups.Healing = Groups.HealingSpells;
// Groups.IC = Groups.IllusionCreationSpells;
// Groups.Illusion = Groups.IllusionCreationSpells;
// Groups.IllusionCreation = Groups.IllusionCreationSpells;
// Groups.IllusionCreationICSpells = Groups.IllusionCreationSpells;
Groups.Knowledge = Groups.KnowledgeSpells;
Groups.LD = Groups.LightDarknessSpells;
Groups.LightDarkness = Groups.LightDarknessSpells;
Groups.LightDarknessLDSpells = Groups.LightDarknessSpells;
Groups.Magical = Groups.MagicalSkills;
Groups.Math = Groups.MathSkills;
Groups.KnowledgeSpells = Groups.Knowledge;
// Groups.Meta = Groups.MetaSpells;
Groups.MB = Groups.MakingBreakingSpells;
Groups.MakingBreaking = Groups.MakingBreakingSpells;
Groups.MakingBreakingMBSpells = Groups.MakingBreakingSpells;
Groups.MC = Groups.MindControlSpells;
Groups.MindControl = Groups.MindControlSpells;
Groups.MindControlMCSpells = Groups.MindControlSpells;
// Groups.Movement = Groups.MovementSpells;
// Groups.Necromantic = Groups.NecromanticSpells;
// Groups.Plant = Groups.PlantSpells;
// Groups.PW = Groups.ProtectionWarningSpells;
// Groups.ProtectionWarning = Groups.ProtectionWarningSpells;
// Groups.ProtectionWarningPWSpells = Groups.ProtectionWarningSpells;
Groups.Rune = Groups.RuneSkills;
// Groups.Sound = Groups.SoundSpells;
Groups.Science = Groups.ScienceSkills;
Groups.Scientific = Groups.ScienceSkills;
Groups.ScientificSkills = Groups.ScienceSkills;
Groups.Social = Groups.SocialSkills;
Groups.Water = Groups.WaterSpells;

var GroupNames = {
  Magery    : 'Magery Types',
  AnimalSkills : 'Animal Skills',
  ArtisticSkills : 'Artistic Skills',
  AthleticSkills : 'Athletic Skills',
  CombatWeaponSkills : 'Combat/Weapon skills',
  MagicalSkills : 'Magical Skills',
  CraftSkills : 'Craft Skills',
  SoftCraftSkills : 'Soft Craft Skills',
  EsotericSkills : 'Esoteric Skills',
  HobbySkills : 'Hobby Skills',
  KnowledgeSkills : 'Knowledge Skills',
  LanguageSkills : 'Language Skills',
  MathSkills : 'Math Skills',
  MedicalSkills : 'Medical Skills',
  MilitarySkills : 'Military Skills',
  OutdoorSkills : 'Outdoor Skills',
  ProfessionalSkills : 'Professional Skills',
  PsiSkills : 'Psi Skills',
  RuneSkills : 'Rune Skills',
  ScienceSkills : 'Science Skills',
  SocialSkills : 'Social Skills',
  ThiefSpySkills : 'Thief/Spy Skills',
  VehicleSkills : 'Vehicle Skills',
  MagicColleges : 'Magic Colleges',
  AirSpells : 'Air College Spells',
  AnimalSpells : 'Animal College Spells',
  AnimalControlSpells : 'Animal Control Spells',
  BodyControlSpells : 'Body Control College Spells',
  CommunicationEmpathySpells : 'Communication and Empathy College Spells',
  EarthSpells : 'Earth College Spells',
  EnchantmentSpells : 'Enchantment College Spells',
  FireSpells : 'Fire College Spells',
  FoodSpells : 'Food College Spells',
  HealingSpells : 'Healing College Spells',
  IllusionCreationSpells : 'Illusion/Creation College Spells',
  KnowledgeSpells : 'Knowledge College Spells',
  LightDarknessSpells : 'Light and Darkness College Spells',
  MakingBreakingSpells : 'Making and Breaking College Spells',
  MetaSpells : 'Meta-Spells',
  MindControlSpells : 'Mind Control College Spells',
  MovementSpells : 'Movement College Spells',
  NecromanticSpells : 'Necromantic College Spells',
  PlantSpells : 'Plant College Spells',
  ProtectionWarningSpells : 'Protection and Warning College Spells',
  SoundSpells : 'Sound College Spells',
  WaterSpells : 'Water College Spells',
  SeekSpells : 'Seek Spells'
};

var collegeNames = {
    Air: 'Air',
    AirAirSpells: 'Air',
    Animal: 'Animal',
    AnimalSpells: 'Animal',
    BC: 'Body Control',
    BCSpells: 'Body Control',
    BodySpells: 'Body Control',
    BodyControl: 'Body Control',
    BodyControlSpells: 'Body Control',
    BodyControlBCSpells: 'Body Control',
    CE: 'Comm & Empathy',
    CESpells: 'Comm & Empathy',
    Communication: 'Comm & Empathy',
    CommunicationSpells: 'Comm & Empathy',
    CommunicationEmpathy: 'Comm & Empathy',
    CommunicationEmpathySpells: 'Comm & Empathy',
    CommunicationEmpathyCESpells: 'Comm & Empathy',
    Earth: 'Earth',
    EarthSpells: 'Earth',
    Enchantment: 'Enchantment',
    EnchantmentSpells: 'Enchantment',
    Fire: 'Fire',
    FireSpells: 'Fire',
    Food: 'Food',
    FoodSpells: 'Food',
    Healing: 'Healing',
    HealingSpells: 'Healing',
    IllusionCreation: 'Illusion & Creation',
    IllusionCreationSpells: 'Illusion & Creation',
    Knowledge: 'Knowledge',
    KnowledgeSpells: 'Knowledge',
    LD: 'Light & Darkness',
    LightDarkness: 'Light & Darkness',
    LightDarknessSpells: 'Light & Darkness',
    LightDarknessLDSpells: 'Light & Darkness',
    MakingBreaking: 'Making & Breaking',
    MakingBreakingSpells: 'Making & Breaking',
    Meta: 'Meta-Spells',
    MetaSpells: 'Meta-Spells',
    MC: 'Mind Control',
    MindControl: 'Mind Control',
    MindControlSpells: 'Mind Control',
    MindControlMCSpells: 'Mind Control',
    Movement: 'Movement',
    MovementSpells: 'Movement',
    Necromantic: 'Necromantic',
    NecromanticSpells: 'Necromantic',
    Plant: 'Plant',
    PlantSpells: 'Plant',
    PW: 'Protection & Warning',
    Protection: 'Protection & Warning',
    ProtectionWarning: 'Protection & Warning',
    ProtectionWarningSpells: 'Protection & Warning',
    ProtectionWarningPWSpells: 'Protection & Warning',
    Sound: 'Sound',
    SoundSpells: 'Sound',
    Water: 'Water',
    WaterSpells: 'Water'
};


/****  Spells  ****/

Spells = {};


// Spells.SpellName.stats = { duration: '1 min', castcost: 2, maintaincost: 1, time: 5, notes: '' };
// Spells.SpellName.classes = { reg: true, area: true, riq: true, rwi: true, rst: true, rht: true, rdx: true, info: true, block: true, spcl: true, msl: true, melee: true, ench: true };
// <Animal>
// Beast Summoning
Spells.BeastSummoning = new Skill( "Beast Summoning", 'IQ', 2, "B3E155" );
Spells.BeastSummoning.classes = { reg: true };
Spells.BeastSummoning.stats = { duration: '1 min', castcost: 3, maintaincost: 2 };
Prerequisites.BeastSummoning_requires_BeastSoother = { target: 'BeastSummoning', prereq: 'BeastSoother' };
// Beast-Soother
Spells.BeastSoother = new Skill( "Beast-Soother", 'IQ', 2, "B3E155" );
Spells.BeastSoother.classes = { reg: true };
Spells.BeastSoother.stats = { castcost: '1 to 3' };
Prerequisites.BeastSoother_requires_Persuasion_pgroup1    = { target: 'BeastSoother', prereq: 'Persuasion',    pgroup: 1 };
Prerequisites.BeastSoother_requires_AnimalEmpathy_pgroup1 = { target: 'BeastSoother', prereq: 'AnimalEmpathy', pgroup: 1, category: 'ADS' };
// Bird Control
Spells.BirdControl = new Skill( "Bird Control", 'IQ', 2, "B3E155" );
Spells.BirdControl.classes = { reg: true, riq: true };
Spells.BirdControl.stats = { duration: '1 min', castcost: 3, maintaincost: 2 };
Prerequisites.BirdControl_requires_BeastSoother = { target: 'BirdControl', prereq: 'BeastSoother' };
// Mammal Control
Spells.MammalControl = new Skill( "Mammal Control", 'IQ', 2, "B3E155" );
Spells.MammalControl.classes = { reg: true, riq: true };
Spells.MammalControl.stats = { duration: '1 min', castcost: 3, maintaincost: 2 };
Prerequisites.MammalControl_requires_BeastSoother_pgroup1 = { target: 'MammalControl', prereq: 'BeastSoother'/*, pgroup: 1*/ };
//Prerequisites.MammalControl_requires_Charm_pgroup1        = { target: 'MammalControl', prereq: 'Charm',        pgroup: 1 };   // Charm doesn't exist in Basic
// Reptile Control
Spells.ReptileControl = new Skill( "Reptile Control", 'IQ', 2, "B3E155" );
Spells.ReptileControl.classes = { reg: true, riq: true };
Spells.ReptileControl.stats = { duration: '1 min', castcost: 3, maintaincost: 2 };
Prerequisites.ReptileControl_requires_BeastSoother = { target: 'ReptileControl', prereq: 'BeastSoother' };


// <Communication & Empathy>
// Mind-Reading
Spells.MindReadingSpell = new Skill( "Mind-Reading", 'IQ', 2, "B3E155" );
Spells.MindReadingSpell.classes = { reg: true, riq: true };
Spells.MindReadingSpell.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 10 };
Prerequisites.MindReadingSpell_requires_Truthsayer = { target: 'MindReadingSpell', prereq: 'Truthsayer' };
// Persuasion
Spells.Persuasion = new Skill( "Persuasion", 'IQ', 2, "B3E155" );
Spells.Persuasion.classes = { reg: true, riq: true };
Spells.Persuasion.stats = { duration: '1 min', castcost: '2&times; Rxn+' };
Prerequisites.Persuasion_requires_SenseEmotion = { target: 'Persuasion', prereq: 'SenseEmotion' };
// Sense Emotion
Spells.SenseEmotion = new Skill( "Sense Emotion", 'IQ', 2, "B3E155" );
Spells.SenseEmotion.classes = { reg: true };
Spells.SenseEmotion.stats = { castcost: 2 };
Prerequisites.SenseEmotion_requires_SenseFoes = { target: 'SenseEmotion', prereq: 'SenseFoes' };
// Sense Foes
Spells.SenseFoes = new Skill( "Sense Foes", 'IQ', 2, "B3E155" );
Spells.SenseFoes.classes = { info: true, area: true };
Spells.SenseFoes.stats = { castcost: 1 };
// Sense Life
Spells.SenseLife = new Skill( "Sense Life", 'IQ', 2, "B3E155" );
Spells.SenseLife.classes = { info: true, area: true };
Spells.SenseLife.stats = { castcost: 0.5 };
// Truthsayer
Spells.Truthsayer = new Skill( "Truthsayer", 'IQ', 2, "B3E155" );
Spells.Truthsayer.classes = { info: true, riq: true };
Spells.Truthsayer.stats = { castcost: 2 };
Prerequisites.Truthsayer_requires_SenseEmotion = { target: 'Truthsayer', prereq: 'SenseEmotion' };


// <Earth>
// Control Earth Elemental
Spells.ControlEarthElemental = new Skill( "Control Earth Elemental", 'IQ', 2, "B3E157" );
Spells.ControlEarthElemental.classes = { reg: true, rst: true, riq: true };
Spells.ControlEarthElemental.stats = { duration: '1 min', castcost: '1/8 attribute total', maintaincost: 'half', time: 2 };
Prerequisites.ControlEarthElemental_requires_SummonEarthElemental = { target: 'ControlEarthElemental', prereq: 'SummonEarthElemental' };
// Create Earth
Spells.CreateEarth = new Skill( "Create Earth", 'IQ', 2, "B3E156" );
Spells.CreateEarth.classes = { reg: true };
Spells.CreateEarth.stats = { duration: 'permanent', castcost: '4/hex create, 2/hex solidify' };
Prerequisites.CreateEarth_requires_EarthtoStone = { target: 'CreateEarth', prereq: 'EarthtoStone' };
// Create Earth Elemental
Spells.CreateEarthElemental = new Skill( "Create Earth Elemental", 'IQ', 2, "B3E157" );
Spells.CreateEarthElemental.classes = { spcl: true };
Spells.CreateEarthElemental.stats = { castcost: '1/4 attribute total', time: 'attribute-total seconds' };
Prerequisites.CreateEarthElemental_requires_Magery2               = { target: 'CreateEarthElemental', prereq: 'Magery', level: 2, category: 'ADS' };
Prerequisites.CreateEarthElemental_requires_ControlEarthElemental = { target: 'CreateEarthElemental', prereq: 'ControlEarthElemental' };
// Earth to Air
Spells.EarthtoAir = new Skill( "Earth to Air", 'IQ', 2, "B3E156" );
Spells.EarthtoAir.classes = { reg: true };
Spells.EarthtoAir.stats = { duration: 'permanent', castcost: '1/ft<sup>3</sup>, 8/hex' };
Prerequisites.EarthtoAir_requires_CreateAir  = { target: 'EarthtoAir', prereq: 'CreateAir' };
Prerequisites.EarthtoAir_requires_ShapeEarth = { target: 'EarthtoAir', prereq: 'ShapeEarth' };
// Earth to Stone
Spells.EarthtoStone = new Skill( "Earth to Stone", 'IQ', 2, "B3E156" );
Spells.EarthtoStone.classes = { reg: true };
Spells.EarthtoStone.stats = { duration: 'permanent', castcost: '3 up to 20#, or 5/hex' };
Prerequisites.EarthtoStone_requires_Magery1    = { target: 'EarthtoStone', prereq: 'Magery', level: 1, category: 'ADS' };
Prerequisites.EarthtoStone_requires_ShapeEarth = { target: 'EarthtoStone', prereq: 'ShapeEarth' };
// Earth Vision
Spells.EarthVision = new Skill( "Earth Vision", 'IQ', 2, "B3E156" );
Spells.EarthVision.classes = { reg: true };
Spells.EarthVision.stats = { duration: 30, castcost: '2 per 10 yds penetration' };
Prerequisites.EarthVision_requires_ShapeEarth = { target: 'EarthVision', prereq: 'ShapeEarth' };
// Seek Earth
Spells.SeekEarth = new Skill( "Seek Earth", 'IQ', 2, "B3E156" );
Spells.SeekEarth.classes = { info: true };
Spells.SeekEarth.stats = { castcost: 3, time: 10 };
// Shape Earth
Spells.ShapeEarth = new Skill( "Shape Earth", 'IQ', 2, "B3E156" );
Spells.ShapeEarth.classes = { reg: true };
Spells.ShapeEarth.stats = { castcost: '2/hex', maintaincost: '1/hex' };
Prerequisites.ShapeEarth_requires_SeekEarth = { target: 'ShapeEarth', prereq: 'SeekEarth' };
// Stone Missile
Spells.StoneMissile = new Skill( "Stone Missile", 'IQ', 2, "B3E156" );
Spells.StoneMissile.classes = { msl: true };
Spells.StoneMissile.stats = { castcost: '1 - 3', time: '1 - 3', notes: "The missile does 1d+1 damage for each energy point spent in casting it." };
Prerequisites.StoneMissile_requires_CreateEarth = { target: 'StoneMissile', prereq: 'CreateEarth' };
// Stone to Earth
Spells.StonetoEarth = new Skill( "Stone to Earth", 'IQ', 2, "B3E156" );
Spells.StonetoEarth.classes = { reg: true };
Spells.StonetoEarth.stats = { duration: 'permanent', castcost: '6 up to 20#, or 10/hex' };
Prerequisites.StonetoEarth_requires_EarthtoStone_pgroup1 = { target: 'StonetoEarth', prereq: 'EarthtoStone',     pgroup: 1 };
Prerequisites.StonetoEarth_requires_4Earth_pgroup1       = { target: 'StonetoEarth', prereq: 'Earth', number: 4, pgroup: 1 };
// Summon Earth Elemental
Spells.SummonEarthElemental = new Skill( "Summon Earth Elemental", 'IQ', 2, "B3E156" );
Spells.SummonEarthElemental.classes = { spcl: true };
Spells.SummonEarthElemental.stats = { duration: '1 hr', castcost: 4, time: 30, notes: 'GM rolls 2d for minutes to appear.  Cannot be maintained.' };
Prerequisites.SummonEarthElemental_requires_Magery1                      = { target: 'SummonEarthElemental', prereq: 'Magery', level: 1, category: 'ADS' };
Prerequisites.SummonEarthElemental_requires_4Earth                       = { target: 'SummonEarthElemental', prereq: 'Earth', number: 4 };
Prerequisites.SummonEarthElemental_requires_8Earth_pgroup1               = { target: 'SummonEarthElemental', prereq: 'Earth', number: 8,     pgroup: 1 };
Prerequisites.SummonEarthElemental_requires_SummonAirElemental_pgroup1   = { target: 'SummonEarthElemental', prereq: 'SummonAirElemental',   pgroup: 1 };
Prerequisites.SummonEarthElemental_requires_SummonFireElemental_pgroup1  = { target: 'SummonEarthElemental', prereq: 'SummonFireElemental',  pgroup: 1 };
Prerequisites.SummonEarthElemental_requires_SummonWaterElemental_pgroup1 = { target: 'SummonEarthElemental', prereq: 'SummonWaterElemental', pgroup: 1 };


// <Air>
// Breathe Water
Spells.BreatheWater = new Skill( "Breathe Water", 'IQ', 2, "B3E157" );
Spells.BreatheWater.classes = { reg: true };
Spells.BreatheWater.stats = { duration: '1 min', castcost: 4, maintaincost: 2 };
Prerequisites.BreatheWater_requires_CreateAir    = { target: 'BreatheWater', prereq: 'CreateAir' };
Prerequisites.BreatheWater_requires_DestroyWater = { target: 'BreatheWater', prereq: 'DestroyWater' };
// Clouds
Spells.Clouds = new Skill( "Clouds", 'IQ', 2, "B3E157" );
Spells.Clouds.classes = { area: true };
Spells.Clouds.stats = { duration: '10 min', castcost: 1/20, maintaincost: 'same', time: 10 };
Prerequisites.Clouds_requires_4Water = { target: 'Clouds', number: 4, prereq: 'Water' };
Prerequisites.Clouds_requires_4Air   = { target: 'Clouds', number: 4, prereq: 'Air' };
// Control Air Elemental
Spells.ControlAirElemental = new Skill( "Control Air Elemental", 'IQ', 2, "B3E158" );
Spells.ControlAirElemental.classes = { reg: true, rst: true, riq: true };
Spells.ControlAirElemental.stats = { duration: '1 min', castcost: '1/8 attribute total', maintaincost: 'half', time: 2 };
Prerequisites.ControlAirElemental_requires_SummonAirElemental = { target: 'ControlAirElemental', prereq: 'SummonAirElemental' };
// Create Air
Spells.CreateAir = new Skill( "Create Air", 'IQ', 2, "B3E157" );
Spells.CreateAir.classes = { area: true };
Spells.CreateAir.stats = { castcost: 1, duration: '5 turns' };
Prerequisites.CreateAir_requires_PurifyAir = { target: 'CreateAir', prereq: 'PurifyAir' };
// Create Air Elemental
Spells.CreateAirElemental = new Skill( "Create Air Elemental", 'IQ', 2, "B3E158" );
Spells.CreateAirElemental.classes = { spcl: true };
Spells.CreateAirElemental.stats = { castcost: '1/4 attribute total', time: 'attribute-total seconds' };
Prerequisites.CreateAirElemental_requires_Magery2             = { target: 'CreateAirElemental', prereq: 'Magery', level: 2, category: 'ADS' };
Prerequisites.CreateAirElemental_requires_ControlAirElemental = { target: 'CreateAirElemental', prereq: 'ControlAirElemental' };
// Lightning
Spells.Lightning = new Skill( "Lightning", 'IQ', 2, "B3E158" );
Spells.Lightning.classes = { msl: true };
Spells.Lightning.stats = { castcost: '1/1d-1 damage, max 3d-3', time: '1 to 3' };  // castcost: '≤ Magery/sec, ≤ 3 secs'
Prerequisites.Lightning_requires_6Air = { target: 'Lightning', number: 6, prereq: 'Air' };
// Predict Weather
Spells.PredictWeather = new Skill( "Predict Weather", 'IQ', 2, "B3E157" );
Spells.PredictWeather.classes = { info: true };
Spells.PredictWeather.stats = { castcost: '2&times; days', time: '5 sec/day' };
Prerequisites.PredictWeather_requires_4Air = { target: 'PredictWeather', prereq: 'Air', number: 4 };
// Purify Air
Spells.PurifyAir = new Skill( "Purify Air", 'IQ', 2, "B3E157" );
Spells.PurifyAir.classes = { area: true };
Spells.PurifyAir.stats = { castcost: 1 };
// Rain
Spells.Rain = new Skill( "Rain", 'IQ', 2, "B3E157" );
Spells.Rain.classes = { area: true };
Spells.Rain.stats = { duration: '1 hr', castcost: 1/10, maintaincost: 'same', time: 10 };
Prerequisites.Rain_requires_Clouds = { target: 'Rain', prereq: 'Clouds' };
// Shape Air
Spells.ShapeAir = new Skill( "Shape Air", 'IQ', 2, "B3E157" );
Spells.ShapeAir.classes = { reg: true };
Spells.ShapeAir.stats = { castcost: '1 to 10', duration: '1 min' };
Prerequisites.ShapeAir_requires_CreateAir = { target: 'ShapeAir', prereq: 'CreateAir' };
// Summon Air Elemental
Spells.SummonAirElemental = new Skill( "Summon Air Elemental", 'IQ', 2, "B3E158" );
Spells.SummonAirElemental.classes = { spcl: true };
Spells.SummonAirElemental.stats = { duration: '1 hr', castcost: 4, time: 30, notes: 'GM rolls 2d for minutes to appear.  Cannot be maintained.' };
Prerequisites.SummonAirElemental_requires_Magery1                      = { target: 'SummonAirElemental', prereq: 'Magery', level: 1, category: 'ADS' };
Prerequisites.SummonAirElemental_requires_4Air                         = { target: 'SummonAirElemental', prereq: 'Air', number: 4 };
Prerequisites.SummonAirElemental_requires_8Air_pgroup1                 = { target: 'SummonAirElemental', prereq: 'Air', number: 8,       pgroup: 1 };
Prerequisites.SummonAirElemental_requires_SummonEarthElemental_pgroup1 = { target: 'SummonAirElemental', prereq: 'SummonEarthElemental', pgroup: 1 };
Prerequisites.SummonAirElemental_requires_SummonFireElemental_pgroup1  = { target: 'SummonAirElemental', prereq: 'SummonFireElemental',  pgroup: 1 };
Prerequisites.SummonAirElemental_requires_SummonWaterElemental_pgroup1 = { target: 'SummonAirElemental', prereq: 'SummonWaterElemental', pgroup: 1 };
// Walk on Air
Spells.WalkonAir = new Skill( "Walk on Air", 'IQ', 2, "B3E157" );
Spells.WalkonAir.classes = { reg: true };
Spells.WalkonAir.stats = { duration: '1 min', castcost: 3, maintaincost: 2 };
Prerequisites.WalkonAir_requires_ShapeAir = { target: 'WalkonAir', prereq: 'ShapeAir' };


// <Fire>
// Cold
Spells.Cold = new Skill( "Cold", 'IQ', 2, "B3E159" );
Spells.Cold.classes = { reg: true };
Spells.Cold.stats = { duration: '1 min', castcost: 'see notes', notes: "&dagger; 1 for an object up to the size of a fist, 2 for up to a ft&sup3;, 3/hex for larger objects. Each minute lowers the target's temperature by 20&deg;. Time can be halved by doubling the energy spent, and so on, but one cannot use less energy per minute for a slower cooling.", maintaincost: 'same' };
Prerequisites.Cold_requires_Heat = { target: 'Cold', prereq: 'Heat' };
// Control Fire Elemental
Spells.ControlFireElemental = new Skill( "Control Fire Elemental", 'IQ', 2, "B3E159" );
Spells.ControlFireElemental.classes = { reg: true, rst: true, riq: true };
Spells.ControlFireElemental.stats = { duration: '1 min', castcost: '1/8 attribute total', maintaincost: 'half', time: 2 };
Prerequisites.ControlFireElemental_requires_SummonFireElemental = { target: 'ControlFireElemental', prereq: 'SummonFireElemental' };
// Create Fire
Spells.CreateFire = new Skill( "Create Fire", 'IQ', 2, "B3E158" );
Spells.CreateFire.classes = { area: true };
Spells.CreateFire.stats = { duration: '1 min', castcost: 2, maintaincost: 'half' };
Prerequisites.CreateFire_requires_IgniteFire = { target: 'CreateFire', prereq: 'IgniteFire' };
// Create Fire Elemental
Spells.CreateFireElemental = new Skill( "Create Fire Elemental", 'IQ', 2, "B3E159" );
Spells.CreateFireElemental.classes = { spcl: true };
Spells.CreateFireElemental.stats = { castcost: '1/4 attribute total', time: 'attribute-total seconds' };
Prerequisites.CreateFireElemental_requires_Magery2              = { target: 'CreateFireElemental', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.CreateFireElemental_requires_ControlFireElemental = { target: 'CreateFireElemental', prereq: 'ControlFireElemental' };
// Extinguish Fire
Spells.ExtinguishFire = new Skill( "Extinguish Fire", 'IQ', 2, "B3E158" );
Spells.ExtinguishFire.classes = { reg: true };
Spells.ExtinguishFire.stats = { duration: 'Once out, a fire stays out.', castcost: '3/hex' };
Prerequisites.ExtinguishFire_requires_IgniteFire = { target: 'ExtinguishFire', prereq: 'IgniteFire' };
// Fireball
Spells.Fireball = new Skill( "Fireball", 'IQ', 2, "B3E159" );
Spells.Fireball.classes = { msl: true };
Spells.Fireball.stats = { castcost: '1 - 3', time: '1 - 3', notes: "The fireball does 1 die damage for each energy point spent in casting it." };
Prerequisites.Fireball_requires_Magery1    = { target: 'Fireball', prereq: 'Magery', level: 1, category: 'ADS' };
Prerequisites.Fireball_requires_CreateFire = { target: 'Fireball', prereq: 'CreateFire' };
Prerequisites.Fireball_requires_ShapeFire  = { target: 'Fireball', prereq: 'ShapeFire' };
// Heat
Spells.Heat = new Skill( "Heat", 'IQ', 2, "B3E158" );
Spells.Heat.classes = { reg: true };
Spells.Heat.stats = { duration: '1 min', castcost: 'see notes', notes: "&dagger; 1 for an object up to the size of a fist, 2 for up to a ft&sup3;, 3/hex for larger objects. Each minute raises the target's temperature by 20&deg;. Time can be halved by doubling the energy spent, and so on, but one cannot use less energy per minute for a slower heating.", maintaincost: 'same' };
Prerequisites.Heat_requires_CreateFire = { target: 'Heat', prereq: 'CreateFire' };
Prerequisites.Heat_requires_ShapeFire  = { target: 'Heat', prereq: 'ShapeFire' };
// Ignite Fire
Spells.IgniteFire = new Skill( "Ignite Fire", 'IQ', 2, "B3E158" );
Spells.IgniteFire.classes = { reg: true };
Spells.IgniteFire.stats = { castcost: '1-4', maintaincost: 'same' };
// Resist Fire
Spells.ResistFire = new Skill( "Resist Fire", 'IQ', 2, "B3E159" );
Spells.ResistFire.classes = { reg: true };
Spells.ResistFire.stats = { duration: '1 min', castcost: '2/person or hex', maintaincost: '1/person or hex', notes: 'Cost doubles if subject must resist a blast furnace or volcano; cost triples if subject must resist the heat of a star, nuclear bomb, etc. Only the first level of protection is necessary against combat-type Fire spells.' };
Prerequisites.ResistFire_requires_ExtinguishFire = { target: 'ResistFire', prereq: 'ExtinguishFire' };
Prerequisites.ResistFire_requires_Cold           = { target: 'ResistFire', prereq: 'Cold' };
// Shape Fire
Spells.ShapeFire = new Skill( "Shape Fire", 'IQ', 2, "B3E158" );
Spells.ShapeFire.classes = { area: true };
Spells.ShapeFire.stats = { duration: '1 min', castcost: 2, maintaincost: 'half' };
Prerequisites.ShapeFire_requires_IgniteFire = { target: 'ShapeFire', prereq: 'IgniteFire' };
// Summon Fire Elemental
Spells.SummonFireElemental = new Skill( "Summon Fire Elemental", 'IQ', 2, "B3E159" );
Spells.SummonFireElemental.classes = { spcl: true };
Spells.SummonFireElemental.stats = { duration: '1 hr', castcost: 4, time: 30, notes: 'GM rolls 2d for minutes to appear.  Cannot be maintained.' };
Prerequisites.SummonFireElemental_requires_Magery1                      = { target: 'SummonFireElemental', prereq: 'Magery', level: 1, category: 'ADS' };
Prerequisites.SummonFireElemental_requires_4Fire                        = { target: 'SummonFireElemental', prereq: 'Fire', number: 4 };
Prerequisites.SummonFireElemental_requires_8Fire_pgroup1                = { target: 'SummonFireElemental', prereq: 'Fire', number: 8,      pgroup: 1 };
Prerequisites.SummonFireElemental_requires_SummonAirElemental_pgroup1   = { target: 'SummonFireElemental', prereq: 'SummonAirElemental',   pgroup: 1 };
Prerequisites.SummonFireElemental_requires_SummonEarthElemental_pgroup1 = { target: 'SummonFireElemental', prereq: 'SummonEarthElemental', pgroup: 1 };
Prerequisites.SummonFireElemental_requires_SummonWaterElemental_pgroup1 = { target: 'SummonFireElemental', prereq: 'SummonWaterElemental', pgroup: 1 };


// <Water>
// Control Water Elemental
Spells.ControlWaterElemental = new Skill( "Control Water Elemental", 'IQ', 2, "B3E160" );
Spells.ControlWaterElemental.classes = { reg: true, rst: true, riq: true };
Spells.ControlWaterElemental.stats = { duration: '1 min', castcost: '1/8 attribute total', maintaincost: 'half', time: 2 };
Prerequisites.ControlWaterElemental_requires_SummonWaterElemental = { target: 'ControlWaterElemental', prereq: 'SummonWaterElemental' };
// Create Water
Spells.CreateWater = new Skill( "Create Water", 'IQ', 2, "B3E159" );
Spells.CreateWater.classes = { reg: true };
Spells.CreateWater.stats = { castcost: '2/gal', duration: 'The created water is permanent.' };
Prerequisites.CreateWater_requires_PurifyWater = { target: 'CreateWater', prereq: 'PurifyWater' };
// Create Water Elemental
Spells.CreateWaterElemental = new Skill( "Create Water Elemental", 'IQ', 2, "B3E160" );
Spells.CreateWaterElemental.classes = { spcl: true };
Spells.CreateWaterElemental.stats = { castcost: '1/4 attribute total', time: 'attribute-total seconds' };
Prerequisites.CreateWaterElemental_requires_Magery2 = { target: 'CreateWaterElemental', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.CreateWaterElemental_requires_ControlWaterElemental = { target: 'CreateWaterElemental', prereq: 'ControlWaterElemental' };
// Destroy Water
Spells.DestroyWater = new Skill( "Destroy Water", 'IQ', 2, "B3E159" );
Spells.DestroyWater.classes = { area: true };
Spells.DestroyWater.stats = { castcost: 3, duration: 'permanent', notes: 'In deep water, a hex is only 2 yards deep.' };
Prerequisites.DestroyWater_requires_CreateWater = { target: 'DestroyWater', prereq: 'CreateWater' };
// Fog
Spells.Fog = new Skill( "Fog", 'IQ', 2, "B3E159" );
Spells.Fog.classes = { area: true };
Spells.Fog.stats = { duration: '1 min', castcost: 2, maintaincost: 1 };
Prerequisites.Fog_requires_ShapeWater = { target: 'Fog', prereq: 'ShapeWater' };
// Ice Sphere
Spells.IceSphere = new Skill( "Ice Sphere", 'IQ', 2, "B3E160" );
Spells.IceSphere.classes = { msl: true };
Spells.IceSphere.stats = { castcost: '1 - 3', time: '1 - 3', notes: "The sphere does 1 die damage for each energy point spent in casting it." };
Prerequisites.IceSphere_requires_ShapeWater = { target: 'IceSphere', prereq: 'ShapeWater' };
// Purify Water
Spells.PurifyWater = new Skill( "Purify Water", 'IQ', 2, "B3E159" );
Spells.PurifyWater.classes = { spcl: true };
Spells.PurifyWater.stats = { time: 'see notes', castcost: '1/gal', duration: 'Purified water stays pure unless re-contaminated.', notes: 'Usually 5 to 10 seconds per gallon, unless a large container and ring are used.' };
Prerequisites.PurifyWater_requires_SeekWater = { target: 'PurifyWater', prereq: 'SeekWater' };
// Seek Water
Spells.SeekWater = new Skill( "Seek Water", 'IQ', 2, "B3E159" );
Spells.SeekWater.classes = { info: true };
Spells.SeekWater.stats = { castcost: 2 };
// Shape Water
Spells.ShapeWater = new Skill( "Shape Water", 'IQ', 2, "B3E159" );
Spells.ShapeWater.classes = { reg: true };
Spells.ShapeWater.stats = { duration: '1 min', time: 2, castcost: '1 per gallon', maintaincost: 1, notes: 'maintenance cost is NOT per gallon; just 1 FP' };
Prerequisites.ShapeWater_requires_CreateWater = { target: 'ShapeWater', prereq: 'CreateWater' };
// Summon Water Elemental
Spells.SummonWaterElemental = new Skill( "Summon Water Elemental", 'IQ', 2, "B3E160" );
Spells.SummonWaterElemental.classes = { spcl: true };
Spells.SummonWaterElemental.stats = { duration: '1 hr', castcost: 4, time: 30, notes: 'GM rolls 2d for minutes to appear.  Cannot be maintained.' };
Prerequisites.SummonWaterElemental_requires_Magery1                      = { target: 'SummonWaterElemental', prereq: 'Magery', level: 1, category: 'ADS' };
Prerequisites.SummonWaterElemental_requires_4Water                       = { target: 'SummonWaterElemental', prereq: 'Water', number: 4 };
Prerequisites.SummonWaterElemental_requires_8Water_pgroup1               = { target: 'SummonWaterElemental', prereq: 'Water', number: 8,     pgroup: 1 };
Prerequisites.SummonWaterElemental_requires_SummonAirElemental_pgroup1   = { target: 'SummonWaterElemental', prereq: 'SummonAirElemental',   pgroup: 1 };
Prerequisites.SummonWaterElemental_requires_SummonEarthElemental_pgroup1 = { target: 'SummonWaterElemental', prereq: 'SummonEarthElemental', pgroup: 1 };
Prerequisites.SummonWaterElemental_requires_SummonFireElemental_pgroup1  = { target: 'SummonWaterElemental', prereq: 'SummonFireElemental',  pgroup: 1 };
// Walk on Water
Spells.WalkonWater = new Skill( "Walk on Water", 'IQ', 2, "B3E159" );
Spells.WalkonWater.classes = { reg: true };
Spells.WalkonWater.stats = { duration: '1 min', time: 4, castcost: 3, maintaincost: 2 };
Prerequisites.WalkonWater_requires_ShapeWater = { target: 'WalkonWater', prereq: 'ShapeWater' };


// <Enchantment>
// Accuracy
Spells.Accuracy = new Skill( "Accuracy", 'IQ', 2, "B3E160" );
Spells.Accuracy.classes = { ench: true };
Spells.Accuracy.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Accuracy</i> (B160).' };
Prerequisites.Accuracy_requires_5Air = { target: 'Accuracy', number: 5, prereq: 'Air' };
Prerequisites.Accuracy_requires_Enchant = { target: 'Accuracy', prereq: 'Enchant' };
// Deflect
Spells.Deflect = new Skill( "Deflect", 'IQ', 2, "B3E161" );
Spells.Deflect.classes = { ench: true };
Spells.Deflect.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Deflect</i> (B161).' };
Prerequisites.Deflect_requires_Enchant = { target: 'Deflect', prereq: 'Enchant' };
// Enchant
Spells.Enchant = new Skill( "Enchant", 'IQ', 3, "B3E160" );
Spells.Enchant.classes = { ench: true };
Spells.Enchant.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Enchant</i> (B160).' };
Prerequisites.Enchant_requires_Magery2 = { target: 'Enchant', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.Enchant_requires_10othercolleges = { target: 'Enchant', number: 10, prereq: 'MagicColleges', meta: true };
// Fortify
Spells.Fortify = new Skill( "Fortify", 'IQ', 2, "B3E161" );
Spells.Fortify.classes = { ench: true };
Spells.Fortify.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Fortify</i> (B161).' };
Prerequisites.Fortify_requires_Enchant = { target: 'Fortify', prereq: 'Enchant' };
// Lighten
Spells.Lighten = new Skill( "Lighten", 'IQ', 2, "B3E161" );
Spells.Lighten.classes = { ench: true };
Spells.Lighten.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Lighten</i> (B161).' };
Prerequisites.Lighten_requires_Enchant = { target: 'Lighten', prereq: 'Enchant' };
// Power
Spells.Power = new Skill( "Power", 'IQ', 2, "B3E160" );
Spells.Power.classes = { ench: true };
Spells.Power.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Power</i> (B160).' };
Prerequisites.Power_requires_RecoverStrength = { target: 'Power', prereq: 'RecoverStrength' };
// Powerstone
Spells.Powerstone = new Skill( "Powerstone", 'IQ', 2, "B3E161" );
Spells.Powerstone.classes = { ench: true };
Spells.Powerstone.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Powerstone</i> (B161).' };
Prerequisites.Powerstone_requires_Enchant = { target: 'Powerstone', prereq: 'Enchant' };
// Puissance
Spells.Puissance = new Skill( "Puissance", 'IQ', 2, "B3E160" );
Spells.Puissance.classes = { ench: true };
Spells.Puissance.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Puissance</i> (B160).' };
Prerequisites.Puissance_requires_5Earth = { target: 'Puissance', number: 5, prereq: 'Earth' };
// Remove Enchantment
Spells.RemoveEnchantment = new Skill( "Remove Enchantment", 'IQ', 2, "B3E160" );
Spells.RemoveEnchantment.classes = { ench: true };
Spells.RemoveEnchantment.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Accuracy</i> (B160).' };
Prerequisites.RemoveEnchantment_requires_Enchant = { target: 'RemoveEnchantment', prereq: 'Enchant' };
// Scroll
Spells.Scroll = new Skill( "Scroll", 'IQ', 2, "B3E160" );
Spells.Scroll.classes = { ench: true };
Spells.Scroll.stats = { duration: 'scroll lasts indefinitely', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Scroll</i> (B160).' };
Prerequisites.Scroll_requires_Literacy = { target: 'Scroll', category: 'ADS', prereq: 'Literacy' };
Prerequisites.Scroll_requires_Magery1 = { target: 'Scroll', category: 'ADS', prereq: 'Magery', level: 1 };
// Staff
Spells.StaffSpell = new Skill( "Staff", 'IQ', 2, "B3E161" );
Spells.StaffSpell.classes = { ench: true };
Spells.StaffSpell.stats = { castcost: 30, duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B152-153), <i>Staff</i> (B161), also see B149 sidebar.' };
Prerequisites.StaffSpell_requires_Enchant = { target: 'StaffSpell', prereq: 'Enchant' };


// <Healing>
// Awaken
Spells.Awaken = new Skill( "Awaken", 'IQ', 2, "B3E162" );
Spells.Awaken.classes = { area: true };
Spells.Awaken.stats = { castcost: 1 };
Prerequisites.Awaken_requires_LendHealth = { target: 'Awaken', prereq: 'LendHealth' };
// Lend Health
Spells.LendHealth = new Skill( "Lend Health", 'IQ', 2, "B3E162" );
Spells.LendHealth.classes = { reg: true };
Spells.LendHealth.stats = { duration: '1 hr', castcost: '1/HT loaned' };
Prerequisites.LendHealth_requires_LendStrength = { target: 'LendHealth', prereq: 'LendStrength' };
// Lend Strength
Spells.LendStrength = new Skill( "Lend Strength", 'IQ', 2, "B3E162" );
Spells.LendStrength.classes = { reg: true };
Spells.LendStrength.stats = { castcost: '1/FP restored' };
Prerequisites.LendStrength_requires_Magery1_pgroup1 = { target: 'LendStrength', category: 'ADS', prereq: 'Magery', level: 1,  pgroup: 1 };
Prerequisites.LendStrength_requires_Empathy_pgroup1 = { target: 'LendStrength', category: 'ADS', prereq: 'Empathy',           pgroup: 1 };
// Major Healing
Spells.MajorHealing = new Skill( "Major Healing", 'IQ', 3, "B3E162" );
Spells.MajorHealing.classes = { reg: true };
Spells.MajorHealing.stats = { castcost: '1-4', notes: 'restores 2 HT/pt spent' };
Prerequisites.MajorHealing_requires_Magery1 = { target: 'MajorHealing', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.MajorHealing_requires_MinorHealing = { target: 'MajorHealing', prereq: 'MinorHealing' };
// Minor Healing
Spells.MinorHealing = new Skill( "Minor Healing", 'IQ', 2, "B3E162" );
Spells.MinorHealing.classes = { reg: true };
Spells.MinorHealing.stats = { castcost: '1-3', notes: 'restores 1 HT/pt spent' };
Prerequisites.MinorHealing_requires_LendHealth = { target: 'MinorHealing', prereq: 'LendHealth' };
// Recover Strength
Spells.RecoverStrength = new Skill( "Recover Strength", 'IQ', 2, "B3E162" );
Spells.RecoverStrength.classes = { spcl: true };
Spells.RecoverStrength.stats = { castcost: 0, duration: '&mdash;', notes: 'speeds Fatigue recovery; see B162' };
Prerequisites.RecoverStrength_requires_Magery1 = { target: 'RecoverStrength', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.RecoverStrength_requires_LendStrength = { target: 'RecoverStrength', prereq: 'LendStrength' };


// <Knowledge>
// Analyze Magic
Spells.AnalyzeMagic = new Skill( "Analyze Magic", 'IQ', 2, "B3E163" );
Spells.AnalyzeMagic.classes = { info: true, res: true };
Spells.AnalyzeMagic.stats = { castcost: 8, time: '1 hr' };
Prerequisites.AnalyzeMagic_requires_IdentifySpell = { target: 'AnalyzeMagic', prereq: 'IdentifySpell' };
// Aura
Spells.Aura = new Skill( "Aura", 'IQ', 2, "B3E163" );
Spells.Aura.classes = { info: true };
Spells.Aura.stats = { castcost: 3 };
Prerequisites.Aura_requires_DetectMagic = { target: 'Aura', prereq: 'DetectMagic' };
// Detect Magic
Spells.DetectMagic = new Skill( "Detect Magic", 'IQ', 2, "B3E162" );
Spells.DetectMagic.classes = { reg: true };
Spells.DetectMagic.stats = { castcost: 2, time: 5 };
Prerequisites.DetectMagic_requires_Magery1 = { target: 'DetectMagic', category: 'ADS', prereq: 'Magery', level: 1 };
// Identify Spell
Spells.IdentifySpell = new Skill( "Identify Spell", 'IQ', 2, "B3E163" );
Spells.IdentifySpell.classes = { info: true };
Spells.IdentifySpell.stats = { castcost: 2 };
Prerequisites.IdentifySpell_requires_DetectMagic = { target: 'IdentifySpell', prereq: 'DetectMagic' };
// Seeker
Spells.Seeker = new Skill( "Seeker", 'IQ', 2, "B3E163" );
Spells.Seeker.classes = { info: true };
Spells.Seeker.stats = { castcost: 3 };
Prerequisites.Seeker_requires_Magery1 = { target: 'Seeker', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.Seeker_requires_IQ = { target: 'Seeker', category: 'stat', level: 12, prereq: 'IQ' };
Prerequisites.Seeker_requires_SeekSpells = { target: 'Seeker', number: 2, prereq: 'SeekSpells' };
// Trace
Spells.Trace = new Skill( "Trace", 'IQ', 2, "B3E163" );
Spells.Trace.classes = { reg: true };
Spells.Trace.stats = { castcost: 3, maintaincost: 1, duration: '1 hr', time: '1 min' };
Prerequisites.Trace_requires_Seeker = { target: 'Trace', prereq: 'Seeker' };


// <Light & Darkness>
// Blur
Spells.Blur = new Skill( "Blur", 'IQ', 2, "B3E163" );
Spells.Blur.classes = { reg: true };
Spells.Blur.stats = { castcost: '1-5', maintaincost: 'same', time: 2, duration: '1 min' };
Prerequisites.Blur_requires_Darkness = { target: 'Blur', prereq: 'Darkness' };
// Continual Light
Spells.ContinualLight = new Skill( "Continual Light", 'IQ', 2, "B3E163" );
Spells.ContinualLight.classes = { reg: true };
Spells.ContinualLight.stats = { castcost: '2-6', duration: '2d days' };
Prerequisites.ContinualLight_requires_Light = { target: 'ContinualLight', prereq: 'Light' };
// Darkness
Spells.Darkness = new Skill( "Darkness", 'IQ', 2, "B3E163" );
Spells.Darkness.classes = { area: true };
Spells.Darkness.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
Prerequisites.Darkness_requires_ContinualLight = { target: 'Darkness', prereq: 'ContinualLight' };
// Flash
Spells.Flash = new Skill( "Flash", 'IQ', 2, "B3E163" );
Spells.Flash.classes = { reg: true };
Spells.Flash.stats = { castcost: 4, time: 2 };
Prerequisites.Flash_requires_ContinualLight = { target: 'Flash', prereq: 'ContinualLight' };
// Light
Spells.Light = new Skill( "Light", 'IQ', 2, "B3E163" );
Spells.Light.classes = { reg: true };
Spells.Light.stats = { castcost: 1, maintaincost: 1, duration: '1 min' };


// <Making & Breaking>
// Find Weakness
Spells.FindWeakness = new Skill( "Find Weakness", 'IQ', 2, "B3E164" );
Spells.FindWeakness.classes = { info: true };
Spells.FindWeakness.stats = { castcost: 1, time: 2 };
Prerequisites.FindWeakness_requires_Earth = { target: 'FindWeakness', number: 1, prereq: 'Earth' };
Prerequisites.FindWeakness_requires_Air   = { target: 'FindWeakness', number: 1, prereq: 'Air' };
Prerequisites.FindWeakness_requires_Fire  = { target: 'FindWeakness', number: 1, prereq: 'Fire' };
Prerequisites.FindWeakness_requires_Water = { target: 'FindWeakness', number: 1, prereq: 'Water' };
// Rejoin
Spells.Rejoin = new Skill( "Rejoin", 'IQ', 2, "B3E164" );
Spells.Rejoin.classes = { reg: true };
Spells.Rejoin.stats = { castcost: "1/10 lb", maintaincost: "half", duration: "10 min", time: "4/10 lb" };
Prerequisites.Rejoin_requires_Weaken = { target: 'Rejoin', prereq: 'Weaken' };
Prerequisites.Rejoin_requires_Restore = { target: 'Rejoin', prereq: 'Restore' };
// Repair
Spells.Repair = new Skill( "Repair", 'IQ', 2, "B3E164" );
Spells.Repair.classes = { reg: true };
Spells.Repair.stats = { castcost: "2/5 lb", duration: "permanent", time: "1/10 lb" };
Prerequisites.Repair_requires_Magery2 = { target: 'Repair', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.Repair_requires_Rejoin = { target: 'Repair', prereq: 'Rejoin' };
// Restore
Spells.Restore = new Skill( "Restore", 'IQ', 2, "B3E164" );
Spells.Restore.classes = { reg: true };
Spells.Restore.stats = { castcost: '2/hex', maintaincost: 'half', duration: '10 min', time: 3 };
Prerequisites.Restore_requires_Weaken_pgroup1         = { target: 'Restore', prereq: 'Weaken',         pgroup: 1 };
// Shatter
Spells.Shatter = new Skill( "Shatter", 'IQ', 3, "B3E164" );
Spells.Shatter.classes = { reg: true };
Spells.Shatter.stats = { castcost: '1/d damage, max 3d' };
Prerequisites.Shatter_requires_Magery1 = { target: 'Shatter', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.Shatter_requires_Weaken  = { target: 'Shatter', prereq: 'Weaken' };
// Weaken
Spells.Weaken = new Skill( "Weaken", 'IQ', 2, "B3E164" );
Spells.Weaken.classes = { reg: true };
Spells.Weaken.stats = { castcost: 2, duration: "permanent", time: 5 };
Prerequisites.Weaken_requires_FindWeakness = { target: 'Weaken', prereq: 'FindWeakness' };


// <Mind Control>
// Bravery
Spells.Bravery = new Skill( "Bravery", 'IQ', 2, "B3E164" );
Spells.Bravery.classes = { area: true, riq: true };
Spells.Bravery.stats = { castcost: 2, duration: '1 hr', notes: 'Resisted by IQ-1' };
Prerequisites.Bravery_requires_Fear = { target: 'Bravery', prereq: 'Fear' };
// Daze
Spells.Daze = new Skill( "Daze", 'IQ', 2, "B3E164" );
Spells.Daze.classes = { reg: true, rht: true };
Spells.Daze.stats = { duration: '1 min', castcost: 3, maintaincost: 2, time: 2 };
Prerequisites.Daze_requires_Foolishness = { target: 'Daze', prereq: 'Foolishness' };
// Fear
Spells.Fear = new Skill( "Fear", 'IQ', 2, "B3E164" );
Spells.Fear.classes = { area: true, riq: true };
Spells.Fear.stats = { castcost: 1, duration: '10 min' };
Prerequisites.Fear_requires_SenseEmotion = { target: 'Fear', prereq: 'SenseEmotion' };
// Foolishness
Spells.Foolishness = new Skill( "Foolishness", 'IQ', 2, "B3E164" );
Spells.Foolishness.classes = { reg: true, riq: true };
Spells.Foolishness.stats = { castcost: '1-5', maintaincost: '½ cast cost', duration: '1 min' };
Prerequisites.Foolishness_requires_IQ = { target: 'Foolishness', category: 'stat', level: 12, prereq: 'IQ' };
// Mass Daze
Spells.MassDaze = new Skill( "Mass Daze", 'IQ', 2, "B3E164" );
Spells.MassDaze.classes = { area: true, rht: true };
Spells.MassDaze.stats = { castcost: 2, time: '1/pt spent', notes: 'Min radius 2 yds.' };
Prerequisites.MassDaze_requires_Daze = { target: 'MassDaze', prereq: 'Daze' };
Prerequisites.MassDaze_requires_IQ = { target: 'MassDaze', category: 'stat', level: 13, prereq: 'IQ' };
// Mass Sleep
Spells.MassSleep = new Skill( "Mass Sleep", 'IQ', 2, "B3E164" );
Spells.MassSleep.classes = { area: true, rht: true };
Spells.MassSleep.stats = { castcost: 3, time: '1/pt spent', notes: 'Min radius 2 yds.' };
Prerequisites.MassSleep_requires_Sleep = { target: 'MassSleep', prereq: 'Sleep' };
Prerequisites.MassSleep_requires_IQ = { target: 'MassSleep', category: 'stat', level: 13, prereq: 'IQ' };
// Sleep
Spells.Sleep = new Skill( "Sleep", 'IQ', 2, "B3E164" );
Spells.Sleep.classes = { reg: true, rht: true };
Spells.Sleep.stats = { castcost: 4, time: 3 };
Prerequisites.Sleep_requires_Daze = { target: 'Sleep', prereq: 'Daze' };


Groups.Spells = [];
for ( var s in Spells ) {
    Spells[s].key = s;        // also add the label as the 'key' attribute
    Spells[s].spellify();
}

// create a Colleges hash to use for sorting, etc.
var CollegeHash = {};

for( var ci=0; ci<Groups.MagicColleges.length; ci++ ) {
    var college = Groups.MagicColleges[ci];
    var CollegeSpellList = Groups[college];
 //   console.log("fetched list for "+college+" college:\n"+CollegeSpellList);
    for( var si=0; si<CollegeSpellList.length; si++ ) {
        var spell = CollegeSpellList[si];
        if( CollegeHash.hasOwnProperty(college) ) CollegeHash[college].push(spell);
        else CollegeHash[college] = [spell];
    }
}
// alert( JSONstring.make(CollegeHash) );

// create a skill categories hash to use for sorting, etc.
// do it here because Groups needs to already be defined ( I *could* move the Groups stuff up higher... )
var CategoriesHash = {};
for( var ci=0; ci<Groups.SkillCategories.length; ci++ ) {
    var category = Groups.SkillCategories[ci];
    var CategorySkillList = Groups[category];
 //   console.log("fetched list for "+category+" category:\n"+CategorySkillList);
    for( var si=0; si<CategorySkillList.length; si++ ) {
        var skill = CategorySkillList[si];
        if( CategoriesHash.hasOwnProperty(category) ) CategoriesHash[category].push(skill);
        else CategoriesHash[category] = [skill];
    }
}
// alert( JSONstring.make(CategoriesHash) );


/****  Equipment  ****/

// Empty objects BasicEquipment, ShieldItems, ArmorItems, and Weapons are declared in the equipment.js file.

// These Groups defined here for use by Item.goeswith attributes in BasicEquipment below.
Groups.knives = ['Dagger','KnifeSmall','KnifeLarge'];
Groups.swords = ['Broadsword','BroadswordThr','BastardSword','BastardSwordThr',
                 'Greatsword','GreatswordThr','Shortsword','Smallsword','Saber'];
Groups.blades = Groups.swords.concat(Groups.knives);
Groups.cuttingWeapons = ['Hatchet','Axe','ThrowingAxe','GreatAxe','Scythe','Glaive','Halberd','Poleaxe'];
Groups.cuttingTools = ['Axe','Hatchet','Shovel','SwissArmyKnife','SurvivalKnife'];
Groups.edged = Groups.blades.concat(Groups.cuttingWeapons.concat(Groups.cuttingTools));
Groups.bows = ['Bow','ShortBow','Longbow','CompositeBow'];
Groups.crossbows = ['Crossbow'];
Groups.pistols = ['Revolver38','Revolver44M','LaserPistol','BlasterPistol',
                  'Mauser96','MsrLuger','CM191145ACP','WltrPPK','FNHP35','RugerSTD','AMTBackup',
                  'Beretta92','Glock17','IMIEagle','Needler','GaussNeedler','Stunner'];
Groups.revolvers = ['ColtTexas','SWRussian','WNol455W','SWM10','ColtPython','SWM29','WheellockPistol',
                    'FlintlockPistol','WogdonPistol'];
Groups.handguns = Groups.pistols.concat(Groups.revolvers);
Groups.shotguns = ['Blunderbuss8G','Ithaca10G','RemingtonM870_12G'];
Groups.rifles = ['Cannonlock','MatchlockMusket','BrownBess','KentuckyRifle','FergusonRifle',
                 'BakerRifle','E53','MH71','RemRifle','Spr73','Win73','Lebel86','Sharps50',
                 'Win94','Msr98k','LEMk3l','M1903AI','HHExpress','M1Garand','AK47','FNFAL','HKG3',
                 'Ml6','AUG','HKPSG1','NeedleRifle','LaserRifle','GaussNeedleRifle','BlastRifle',
                 'Disruptor','StunRifle'];
Groups.submachineguns = ['Thompson','MP40','PPSh41','IMIUzi','HKMP5'];
Groups.longguns = Groups.rifles.concat(Groups.shotguns).concat(Groups.submachineguns);
Groups.guns = Groups.handguns.concat(Groups.longguns);

var u = null;		// use for undefined attributes here below

/* Basic Equipment                                'name',                weight, cost, TL, LC, ref  */
BasicEquipment = {};

BasicEquipment.coincopper = new Equipment( 'coin', 1/250, 1, 1, 6, "B212");
BasicEquipment.coincopper.detail = 'copper';
BasicEquipment.coinsilver = new Equipment( 'coin', 1/250, 4, 1, 6, "B212");
BasicEquipment.coinsilver.detail = 'silver';
BasicEquipment.coingold = new Equipment( 'coin', 1/250, 80, 1, 6, "B212");
BasicEquipment.coingold.detail = 'gold';

// food
BasicEquipment.Rations           = new Equipment( 'rations',                0.5,    2,  0,  6, 'B212' );
BasicEquipment.Rations.detail = "traveler’s";
BasicEquipment.Rations.notes = ['dried meat and cheese'];
BasicEquipment.Rations.unit = 'meal';
BasicEquipment.Rations.many = 20;
BasicEquipment.Water             = new Equipment( 'water',                    2,    0,  0,  6, 'B212' );
BasicEquipment.Water.unit = 'qt';
BasicEquipment.Water.continuous = true;
BasicEquipment.Water.many = 2;
BasicEquipment.Wine              = new Equipment( 'wine',                     2,    2,  1,  6, 'B212' );
BasicEquipment.Wine.unit = 'qt';
BasicEquipment.Wine.continuous = true;
BasicEquipment.Wine.many = 1;
BasicEquipment.Brandy            = new Equipment( 'brandy',                   2,   15,  1,  6, 'B212' );
BasicEquipment.Brandy.unit = 'qt';
BasicEquipment.Brandy.continuous = true;
BasicEquipment.Brandy.many = 1;
BasicEquipment.CheapLiquer       = new Equipment( 'liquer',                   3,   10,  3,  6, 'B213' );
BasicEquipment.CheapLiquer.detail = "cheap";
BasicEquipment.CheapLiquer.unit = 'qt';
BasicEquipment.CheapLiquer.continuous = true;
BasicEquipment.CheapLiquer.many = 1;
BasicEquipment.GoodLiquer        = new Equipment( 'liquer',                   3,   20,  4,  6, 'B213' );
BasicEquipment.GoodLiquer.detail = "good";
BasicEquipment.GoodLiquer.continuous = true;
BasicEquipment.GoodLiquer.unit = 'qt';
BasicEquipment.GoodLiquer.many = 1;
BasicEquipment.ConcRations       = new Equipment( 'rations',                  2,   50,  7,  6, 'B213' );
BasicEquipment.ConcRations.detail = 'concentrated';
BasicEquipment.ConcRations.unit = 'wk';
BasicEquipment.ConcRations.many = 2;
Groups.food = ['Rations','Water','Wine','Brandy','CheapLiquer','GoodLiquer','ConcRations'];

// medical gear
BasicEquipment.FirstAidKit       = new Equipment( 'first-aid kit',            2,   30,  1,  6, 'B212' );
BasicEquipment.FirstAidKit.notes = ['adds 1 to First Aid skill'];
BasicEquipment.CrashKit          = new Equipment( 'crash kit',               10,  100,  5,  6, 'B212' );
BasicEquipment.CrashKit.notes = ['adds 2 to First Aid skill'];
BasicEquipment.BlackBag          = new Equipment( 'black bag',               15,  300,  5,  6, 'B212' );
BasicEquipment.BlackBag.notes = ['adds 2 to First Aid skill; -2 to Surgery skill without at least this much'];

// climbing, etc
BasicEquipment.Cord              = new Equipment( 'cord ',                 0.05,  0.1,  1,  6, 'B213' );
BasicEquipment.Cord.detail = "3/16″";
BasicEquipment.Cord.notes = ['supports 90 lbs.'];
BasicEquipment.Cord.continuous = true;
BasicEquipment.Cord.unit = 'yd';
BasicEquipment.Cord.many = 10;
BasicEquipment.ThinRope          = new Equipment( 'rope',                  0.15,  0.5,  0,  6, 'B213' );
BasicEquipment.ThinRope.detail = "3/8″";
BasicEquipment.ThinRope.notes = ['supports 300 lbs.'];
BasicEquipment.ThinRope.continuous = true;
BasicEquipment.ThinRope.unit = 'yd';
BasicEquipment.ThinRope.many = 20;
BasicEquipment.ThickRope         = new Equipment( 'rope',                   0.5,  2.5,  0,  6, 'B213' );
BasicEquipment.ThickRope.detail = "3/4″";
BasicEquipment.ThickRope.notes = ['supports 1,100 lbs.'];
BasicEquipment.ThickRope.continuous = true;
BasicEquipment.ThickRope.unit = 'yd';
BasicEquipment.ThickRope.many = 10;
BasicEquipment.Cable             = new Equipment( 'cable',                  1.7,   10,  1,  6, 'B213' );
BasicEquipment.Cable.detail = '1½″';
BasicEquipment.Cable.notes = ['supports 3,700 lbs.'];
BasicEquipment.Cable.continuous = true;
BasicEquipment.Cable.unit = 'yd';
BasicEquipment.Cable.many = 10;
BasicEquipment.IronSpike         = new Equipment( 'spike',                  0.5,    1,  2,  6, 'B213' );
BasicEquipment.IronSpike.detail = "iron";
BasicEquipment.IronSpike.many = 4;
BasicEquipment.Grapnel           = new Equipment( 'grapnel',                  2,   20,  2,  6, 'B213' );
BasicEquipment.Grapnel.detail = "light";
BasicEquipment.Grapnel.notes = ['can support 300 lbs.'];
BasicEquipment.Lockpicks         = new Equipment( 'lockpicks',                0,   30,  2,  6, 'B213' );
BasicEquipment.Lockpicks.unit = 'set';
BasicEquipment.LockpicksQuality  = new Equipment( 'lockpicks',                0,  200,  3,  6, 'B213' );
BasicEquipment.LockpicksQuality.detail = "quality";
BasicEquipment.LockpicksQuality.notes = ['+1 on all attempts'];
BasicEquipment.LockpicksQuality.unit = 'set';
BasicEquipment.handcuffs         = new Equipment( 'handcuffs',                1,   50,  5,  6, 'B213' );
BasicEquipment.handcuffs.unit = 'pair';
Groups.thiefgear
  = ['Cord','ThinRope','ThickRope','Cable','IronSpike','Grapnel','LockpicksQuality','handcuffs'];

// tools
BasicEquipment.Pole              = new Equipment( 'pole',                     3,    5,  0,  6, 'B212' );
BasicEquipment.Pole.description = '6 ft';
BasicEquipment.Pick              = new Equipment( 'pick',                     8,   16,  1,  6, 'B212' );
BasicEquipment.Pick.description = 'tool';
BasicEquipment.Shovel            = new Equipment( 'shovel',                   6,   30,  1,  6, 'B212' );
BasicEquipment.Crowbar3ft        = new Equipment( "crowbar",                  3,    8,  2,  6, 'B213' );
BasicEquipment.Crowbar3ft.detail = "3' iron";
BasicEquipment.Crowbar5ft        = new Equipment( "crowbar",                 10,   10,  2,  6, 'B212' );
BasicEquipment.Crowbar5ft.detail = "5' iron";
BasicEquipment.CuttingTorch      = new Equipment( 'cutting torch',            7,   75,  6,  6, 'B213' );
BasicEquipment.GasBottle        = new Equipment( 'gas',                      1,    1,  6,  6, 'B213' );
BasicEquipment.GasBottle.notes = ['for cutting torch'];
BasicEquipment.GasBottle.detail = "bottled";
BasicEquipment.GasBottle.continuous = true;
BasicEquipment.GasBottle.unit = 'lb';
BasicEquipment.Hammer            = new Equipment( 'hammer',                   4,   12,  0,  6, 'B212' );
BasicEquipment.Hammer.description = 'tool';
BasicEquipment.Hammer.notes = ['a small sledge, not a carpentry hammer'];
BasicEquipment.Hatchet           = new Equipment( 'hatchet',                  2,   20,  0,  6, 'B212' );
BasicEquipment.Hatchet.description = 'tool';
BasicEquipment.Hatchet.notes = ['for chopping wood, -1 to skill in combat'];
BasicEquipment.Axe               = new Equipment( 'axe',                      6,   15,  2,  6, 'B213' );
BasicEquipment.Axe.description = 'tool';
BasicEquipment.SwissArmyKnife    = new Equipment( 'knife',                    0,   25,  6,  6, 'B213' );
BasicEquipment.SwissArmyKnife.detail = "Swiss Army";
BasicEquipment.SwissArmyKnife.notes = ['if this is the only tool a mechanic has, he rolls at -3 instead of -5'];
BasicEquipment.SurvivalKnife     = new Equipment( 'knife',                  1.5,   40,  6,  6, 'B213' );
BasicEquipment.SurvivalKnife.detail = "survival";
BasicEquipment.SurvivalKnife.notes = ['large knife: handle contains variety of miniaturized survival equipment'];
BasicEquipment.ToolKit           = new Equipment( 'tool kit',                40,  600,  4,  6, 'B213' );
BasicEquipment.ToolKit.notes = ['includes the basic equipment every mechanic needs'];
BasicEquipment.Watch             = new Equipment( 'watch',                    0,   25,  5,  6, 'B213' );
BasicEquipment.Whetstone         = new Equipment( 'whetstone',                1,    5,  1,  6, 'B212' );
BasicEquipment.Whetstone.notes = ['for sharpening tools and weapons; Armourer <i>may find</i> one after an hour’s search and a skill roll'];
Groups.tools = ['Pole','Pick','Shovel','Crowbar3ft','Crowbar5ft','CuttingTorch','GasBottle',
                'Hammer','Hatchet','Axe','SwissArmyKnife','SurvivalKnife','ToolKit','Watch','Whetstone'];

// outdoor
BasicEquipment.PersonalBasics    = new Equipment( 'personal basics',          0,    5,  1,  6, 'B212' );
BasicEquipment.PersonalBasics.notes = ['fantasy: (the things nobody but an idiot leaves home without) -2 to any Survival roll if you’re without them: Spoon, fork, and cup; flint/steel or matches; towel; toiletries; etc'];
BasicEquipment.PersonalBasics.unit = 'set';
BasicEquipment.GroupBasics       = new Equipment( 'group basics',            20,   50,  1,  6, 'B212' );
BasicEquipment.GroupBasics.notes = ['a sturdy box with all the <i>ordinary</i> things a group of 3 to 8 would take camping: cookpots, a bit of rope, hatchet, etc.'];
BasicEquipment.GroupBasics.unit = 'box';
BasicEquipment.Torch             = new Equipment( 'torch',                    1,    3,  0,  6, 'B212' );
BasicEquipment.Torch.notes = ['will burn for one hour'];
BasicEquipment.Torch.maxTL = 5;
BasicEquipment.Lantern           = new Equipment( 'lantern',                  2,   20,  2,  6, 'B212' );
BasicEquipment.LanternOil        = new Equipment( 'oil',                      1,    2,  2,  6, 'B212' );
BasicEquipment.LanternOil.detail = "lantern";
BasicEquipment.LanternOil.notes = ['1 pint burns 24 hours'];
BasicEquipment.LanternOil.continuous = true;
BasicEquipment.LanternOil.unit = 'pt';
BasicEquipment.LanternOil.many = 2;
BasicEquipment.LanternOil.maxTL = 6;
BasicEquipment.tent1person       = new Equipment( 'tent',                     5,   50,  2,  6, 'B212' );
BasicEquipment.tent1person.detail = "1-person";
BasicEquipment.tent1person.notes = ['Includes ropes; no poles needed'];
BasicEquipment.tent2personLT     = new Equipment( 'tent',                    12,   80,  2,  6, 'B212' );
BasicEquipment.tent2personLT.detail = "2-person";
BasicEquipment.tent2personLT.notes = ['Includes ropes; a 6-foot pole must be carried or improvised.  Poles included TL6+'];
BasicEquipment.tent2personTL6    = new Equipment( 'tent',                     5,   80,  6,  6, 'B213' );
BasicEquipment.tent2personTL6.detail = "2-person";
BasicEquipment.tent2personTL6.notes = ['Includes ropes and poles'];
BasicEquipment.tent4personLT     = new Equipment( 'tent',                    30,  150,  2,  6, 'B212' );
BasicEquipment.tent4personLT.detail = "4-person";
BasicEquipment.tent4personLT.notes = ['Includes ropes; 2 6-foot poles are required.  Poles included TL6+'];
BasicEquipment.tent4personTL6    = new Equipment( 'tent',                    12,  150,  6,  6, 'B213' );
BasicEquipment.tent4personTL6.detail = "4-person";
BasicEquipment.tent4personTL6.notes = ['Includes ropes and poles'];
BasicEquipment.tent20person      = new Equipment( 'tent',                   100,  300,  2,  6, 'B212' );
BasicEquipment.tent20person.detail = "20-person";
BasicEquipment.tent20person.notes = ['Includes ropes; 16 6-foot poles are required.'];
BasicEquipment.woolblanket       = new Equipment( 'blanket',                  5,   20,  1,  6, 'B212' );
BasicEquipment.woolblanket.detail = "wool";
BasicEquipment.woolblanket.notes = ['heavy wool'];
BasicEquipment.SleepingBagLight  = new Equipment( 'sleeping bag',             7,   25,  5,  6, 'B213' );
BasicEquipment.SleepingBagLight.detail = "light";
BasicEquipment.SleepingBagLight.notes = ['for normal conditions'];
BasicEquipment.SleepingBag       = new Equipment( 'sleeping bag',            15,  100,  3,  6, 'B212' );
BasicEquipment.SleepingBag.notes = ['for freezing weather'];
BasicEquipment.FishingNet        = new Equipment( 'fishing net',             10,   30,  1,  6, 'B212' );
BasicEquipment.bottle1qt         = new Equipment( 'bottle',                   1,    3,  1,  6, 'B212' );
BasicEquipment.bottle1qt.detail = "1 qt ceramic";
BasicEquipment.bottle1gal        = new Equipment( 'bottle',                   4,    5,  1,  6, 'B212' );
BasicEquipment.bottle1gal.detail = "1 gal ceramic";
BasicEquipment.wineskin1gal      = new Equipment( 'wineskin',                 0,   10,  1,  6, 'B212' );
BasicEquipment.wineskin1gal.detail = "1 gal";
BasicEquipment.wineskin5gal      = new Equipment( 'wineskin',                 1,   30,  1,  6, 'B212' );
BasicEquipment.wineskin5gal.detail = "5 gal";
BasicEquipment.canteen           = new Equipment( 'canteen',                  1,   10,  5,  6, 'B213' );
BasicEquipment.canteen.detail = "1 qt";
BasicEquipment.canteen.notes = ['blanket-covered, holds one quart (TL6+); weighs 3 lbs when full'];
BasicEquipment.LanternElectric   = new Equipment( 'lantern',                  2,   30,  6,  6, 'B213' );
BasicEquipment.LanternElectric.detail = "electric";
BasicEquipment.Flashlight        = new Equipment( 'flashlight',               1,   10,  6,  6, 'B213' );
BasicEquipment.Flashlight.notes = ['requires 3 batteries'];
BasicEquipment.FlashlightHvy     = new Equipment( 'flashlight',               3,   50,  6,  6, 'B213' );
BasicEquipment.FlashlightHvy.detail = 'heavy';
BasicEquipment.FlashlightHvy.notes = ['requires 3 batteries, acts as baton in combat'];
BasicEquipment.FishingGear       = new Equipment( 'fishing gear',             7,   25,  2,  6, 'B213' );
BasicEquipment.FishingGear.notes = ['rod. reel, tackle, etc.'];
BasicEquipment.FishingGear.unit = 'set';
BasicEquipment.GunKit            = new Equipment( 'gun cleaning kit',         1,   20,  4,  6, 'B213' );
BasicEquipment.GunKit.notes = ['everything needed to keep a firearm clean in the field'];
BasicEquipment.GunKit.goeswith = Groups.guns;
BasicEquipment.pouch             = new Equipment( 'pouch',                    0,   10,  1,  6, 'B212' );
BasicEquipment.pouch.detail = 'small';
BasicEquipment.pouch.many = 3;
BasicEquipment.pouch.notes = ['will hold 3 lbs.'];
BasicEquipment.purse             = new Equipment( 'pouch/purse',            0.5,   20,  1,  6, 'B212' );
BasicEquipment.purse.detail = 'large';
BasicEquipment.purse.many = 2;
BasicEquipment.purse.notes = ['will hold 10 lbs.'];
BasicEquipment.backpack          = new Equipment( 'backpack',                 3,   60,  1,  6, 'B212' );
BasicEquipment.backpack.notes = ['will hold 40 lbs. of gear'];
BasicEquipment.BackpackWFrame    = new Equipment( 'backpack',                10,  100,  2,  6, 'B212' );
BasicEquipment.BackpackWFrame.detail = 'large';
BasicEquipment.BackpackWFrame.notes = ['with frame, will hold 100 lbs. of gear'];
BasicEquipment.battery           = new Equipment( 'battery',                  0,    1,  6,  6, 'B213' );
BasicEquipment.binoculars2x      = new Equipment( 'binoculars',               2,   40,  5,  6, 'B213' );
BasicEquipment.binoculars2x.detail = '2.5× mag';
BasicEquipment.binoculars2x.notes = ['sports fan’s set'];
BasicEquipment.binoculars2x.unit = 'pair';
BasicEquipment.binoculars7x      = new Equipment( 'binoculars',               3,  400,  6,  6, 'B213' );
BasicEquipment.binoculars7x.detail = '7× mag';
BasicEquipment.binoculars7x.notes = ['military issue; better view with rangefinder reticle - up to 2,000 yards'];
BasicEquipment.binoculars7x.unit = 'pair';
BasicEquipment.WalkieTalkie      = new Equipment( 'walkie-talkie',            3,   75,  6,  6, 'B213' );
BasicEquipment.WalkieTalkie.notes = ['range 2 miles'];
BasicEquipment.HeadsetComm       = new Equipment( 'headset communicator',           0.5,   20,  7,  6, 'B213' );
BasicEquipment.HeadsetComm.notes = ['worn on the head - range ¼ mile'];
BasicEquipment.Radio             = new Equipment( 'radio',                  0.5,   15,  6,  6, 'B213' );
BasicEquipment.Radio.notes = ['needs 1 battery'];
BasicEquipment.RadioShortwave    = new Equipment( 'radio',                    1,   70,  6,  6, 'B213' );
BasicEquipment.RadioShortwave.detail = 'shortwave';
BasicEquipment.RadioShortwave.notes = ['needs 3 batteries'];
BasicEquipment.miniTV            = new Equipment( 'TV',                       3,  200,  7,  6, 'B213' );
BasicEquipment.miniTV.detail = 'miniature color';
BasicEquipment.miniTV.notes = ['needs 6 batteries'];

Groups.outdoor = ['PersonalBasics','GroupBasics',
                  'Torch','Lantern','LanternOil','Flashlight','FlashlightHvy','LanternElectric',
                  'tent1person','tent2personLT','tent4personLT','tent2personTL6','tent4personTL6','tent20person',
                  'woolblanket','SleepingBagLight','SleepingBag',
                  'bottle1qt','bottle1gal','wineskin1gal','wineskin1gal','canteen',
                  'FishingNet','FishingGear','GunKit','Whetstone',
                  'pouch','purse','backpack','BackpackWFrame',
                  'battery','binoculars2x','binoculars7x','WalkieTalkie','HeadsetComm','Radio','RadioShortwave'];
Groups.campinggear = Groups.tools.concat(Groups.outdoor);

// transportation
BasicEquipment.SaddleBitBridle   = new Equipment( 'saddle, bit, bridle',     20,  150,  0,  6, 'B212' );
BasicEquipment.SaddleBitBridle.notes = ['for horse, mule. etc.'];
BasicEquipment.Saddle            = new Equipment( 'saddle',                  10,  100,  0,  6, 'CII41' );
BasicEquipment.BitBridle         = new Equipment( 'bit & bridle',             2,   20,  0,  6, 'CII41' );
BasicEquipment.saddlewar         = new Equipment( 'saddle',                  25,  300,  2,  6, 'CII41' );
BasicEquipment.saddlewar.detail = "war";
BasicEquipment.saddlewar.notes = ["A high-backed saddle for battle.","Gives +1 to Riding skill whenever the rider rolls to stay in the saddle."];
BasicEquipment.spurs             = new Equipment( 'spurs',                    1,   20,  2,  6, 'CII41' );
BasicEquipment.spurs.notes = ["An emblem of knighthood in some lands.","Dress spurs would be $100 or more for sil- ver, much more for gold, and might weigh more."];
BasicEquipment.Wagon1horse       = new Equipment( 'wagon',                  300,  400,  1,  6, 'B212' );
BasicEquipment.Wagon1horse.detail = '1-horse';
BasicEquipment.Wagon1horse.notes = ['carries up to 1 ton'];
BasicEquipment.Wagon2horse       = new Equipment( 'wagon',                  500,  700,  1,  6, 'B212' );
BasicEquipment.Wagon2horse.detail = '2-horse';
BasicEquipment.Wagon2horse.notes = ['carries up to 2 tons'];
BasicEquipment.Wagon4horse       = new Equipment( 'wagon',                  800, 1000,  1,  6, 'B212' );
BasicEquipment.Wagon4horse.detail = '4-horse';
BasicEquipment.Wagon4horse.notes = ['carries up to 4 tons'];
BasicEquipment.WagonOxTeam       = new Equipment( 'wagon',                 1200, 1500,  1,  6, 'B212' );
BasicEquipment.WagonOxTeam.detail = 'ox-team';
BasicEquipment.WagonOxTeam.notes = ['carries up to 10 tons'];
BasicEquipment.Rowboat           = new Equipment( 'rowboat',                300,  500,  1,  6, 'B212' );
BasicEquipment.Rowboat.notes = ['carries up to 1,000 lbs., slowly'];
BasicEquipment.Canoe             = new Equipment( 'canoe',                  100,  300,  0,  6, 'B212' );
BasicEquipment.Canoe.notes = ['carries up to 600 lbs.'];
//BasicEquipment.Bicycle           = new Equipment( 'bicycle',                 10,   60,  5,  6, 'B213' );

// weapon tools & ammo
BasicEquipment.Quiver            = new Equipment( 'quiver',                 0.5,   10,  1,  6, 'B207' );
BasicEquipment.Quiver.goeswith = Groups.bows;
BasicEquipment.Arrow             = new Equipment( 'arrow',                  1/8,    2,  1,  6, 'B207' );
BasicEquipment.Arrow.goeswith = Groups.bows;
BasicEquipment.Arrow.many = 12;
BasicEquipment.CrossbowBolt      = new Equipment( 'crossbow bolt',         1/16,    2,  1,  6, 'B207' );
BasicEquipment.CrossbowBolt.many = 12;
BasicEquipment.CrossbowBolt.goeswith = Groups.crossbows;
BasicEquipment.ProddPellet       = new Equipment( 'prodd pellet',          1/16,  0.1,  1,  6, 'B207' );
BasicEquipment.ProddPellet.many = 20;
BasicEquipment.ProddPellet.goeswith = ['Prodd'];
BasicEquipment.SpearThrower      = new Equipment( 'spear thrower',            2,   20,  0,  6, 'B207' );
BasicEquipment.SpearThrower.goeswith = ['Javelin','Spear'];
BasicEquipment.GoatsFoot         = new Equipment( "goat's foot",              2,   50,  2,  6, 'B207' );
BasicEquipment.GoatsFoot.goeswith = ['Crossbow','Prodd'];
Groups.weapongear = ['Quiver','Arrow','CrossbowBolt','SpearThrower','GoatsFoot'];
BasicEquipment.BowCase           = new Equipment( 'bow case',                 1,   25,  1,  6, 'CII27' );
BasicEquipment.BowCase.goeswith = Groups.bows;
BasicEquipment.Bowstring         = new Equipment( 'bowstring',                0,    5,  1,  6, 'CII27' );
BasicEquipment.Bowstring.goeswith = Groups.bows;
BasicEquipment.Bracer            = new Equipment( 'bracer',                 0.3,    8,  1,  6, 'CII27' );
BasicEquipment.Bracer.goeswith = Groups.bows;
BasicEquipment.arrowbodkin       = new Equipment( 'arrow',                  1/8,    2,  3,  6, 'CII28' );
BasicEquipment.arrowbodkin.detail = "bodkin point";
BasicEquipment.arrowbodkin.goeswith = Groups.bows;
BasicEquipment.arrowbodkin.many = 12;
BasicEquipment.arrowblunt        = new Equipment( 'arrow',                  1/8,    2,  1,  6, 'CII28' );
BasicEquipment.arrowblunt.detail = "blunt point";
BasicEquipment.arrowblunt.goeswith = Groups.bows;
BasicEquipment.arrowbowelraker   = new Equipment( 'arrow',                  1/8,    2,  3,  6, 'CII28' );
BasicEquipment.arrowbowelraker.detail = "bowel-raker";
BasicEquipment.arrowbowelraker.goeswith = Groups.bows;
BasicEquipment.arrowflaming      = new Equipment( 'arrow',                  1/8,    2,  1,  6, 'CII29' );
BasicEquipment.arrowflaming.detail = "flaming";
BasicEquipment.arrowflaming.goeswith = Groups.bows;
BasicEquipment.arrowfrogcrotch   = new Equipment( 'arrow',                  1/8,    2,  3,  6, 'CII29' );
BasicEquipment.arrowfrogcrotch.detail = "frog-crotch";
BasicEquipment.arrowfrogcrotch.goeswith = Groups.bows;
BasicEquipment.arrowhummingbulb  = new Equipment( 'arrow',                  1/8,    2,  3,  6, 'CII29' );
BasicEquipment.arrowhummingbulb.detail = "humming bulb";
BasicEquipment.arrowhummingbulb.goeswith = Groups.bows;
BasicEquipment.arrowwillowleaf   = new Equipment( 'arrow',                  1/8,    2,  3,  6, 'CII29' );
BasicEquipment.arrowwillowleaf.detail = "willow-leaf";
BasicEquipment.arrowwillowleaf.goeswith = Groups.bows;

BasicEquipment.powercellAA       = new Equipment( 'power cell',          1/8000,    2,  8,  6, 'B247' );
BasicEquipment.powercellAA.detail = 'AA';
BasicEquipment.powercellA        = new Equipment( 'power cell',           1/400,   10,  8,  6, 'B247' );
BasicEquipment.powercellA.detail = 'A';
BasicEquipment.powercellB        = new Equipment( 'power cell',            1/20,   30,  8,  6, 'B247' );
BasicEquipment.powercellB.detail = 'B';
BasicEquipment.powercellC        = new Equipment( 'power cell',             1/2,  100,  8,  6, 'B247' );
BasicEquipment.powercellC.detail = 'C';
BasicEquipment.powercellD        = new Equipment( 'power cell',               5,  500,  8,  6, 'B247' );
BasicEquipment.powercellD.detail = 'D';
BasicEquipment.powercellE        = new Equipment( 'power cell',              20, 2000,  8,  6, 'B247' );
BasicEquipment.powercellE.detail = 'E';

BasicEquipment.SmallComputer     = new Equipment( 'computer',                 2, 1000,  8,  6, 'CII15' );
BasicEquipment.SmallComputer.detail = 'small';
BasicEquipment.SmallComputer.notes= ['Complexity TL-6. Runs for 1 year on a B cell.'];
BasicEquipment.Minicomputer      = new Equipment( 'computer',                40,15000,  8,  6, 'CII15' );
BasicEquipment.Minicomputer.detail = 'mini';
BasicEquipment.Minicomputer.notes = ['Complexity TL-5. Runs on building power, or for 6 months on a C cell.'];
BasicEquipment.Microframe        = new Equipment( 'computer',               200,40000,  8,  6, 'CII15' );
BasicEquipment.Microframe.detail = 'microframe';
BasicEquipment.Microframe.notes   = ['Complexity TL-4. Runs on building power, or for 6 months on an E cell.'];
BasicEquipment.Mainframe         = new Equipment( 'computer',               500,200000, 8,  6, 'CII15' );
BasicEquipment.Mainframe.detail = 'mainframe';
BasicEquipment.Mainframe.notes    = ['Complexity TL-3. Runs on building or vehicle power, or for 1 week on a bank of 50+ E cells.'];
BasicEquipment.Macroframe        = new Equipment( 'computer',              4000,2000000,8,  6, 'CII15' );
BasicEquipment.Macroframe.detail = 'macroframe';
BasicEquipment.Macroframe.notes   = ['Complexity TL-2. Must be permanently connected to building or vehicle power.'];
BasicEquipment.TerminalTL56      = new Equipment( 'computer terminal',      100, 2000,  5,  6, 'CII16' );
BasicEquipment.TerminalTL78      = new Equipment( 'computer terminal',       40, 1000,  7,  6, 'CII16' );
BasicEquipment.TerminalTL9       = new Equipment( 'computer terminal',       20,  500,  9,  6, 'CII16' );
BasicEquipment.TerminalTL10      = new Equipment( 'computer terminal',       10,  250, 10,  6, 'CII16' );
BasicEquipment.MassDataStorage   = new Equipment( 'mass data storage',      500,10000,  8,  6, 'CII16' );
BasicEquipment.MassDataStorage.detail = '1TB';
BasicEquipment.MassDataStorage.unit = 'device';
BasicEquipment.RemovableDataMedia= new Equipment( 'data disk',                0,    5,  8,  6, 'CII16' );
BasicEquipment.Printer           = new Equipment( 'printer',                  4,  100,  7,  6, 'CII16' );
BasicEquipment.PaperPrinter      = new Equipment( 'paper',                0.005, 0.01,  7,  6, 'CII16' );
BasicEquipment.PaperPrinter.detail = 'printer';
BasicEquipment.PaperPrinter.unit = 'sheet';
BasicEquipment.Scanner           = new Equipment( 'scanner',                  2,   40,  8,  6, 'CII16' );
// not doing computer programs
BasicEquipment.ScorpionBolt = new Equipment( 'bolt', 1, u, 3, 6, 'CII37' );
BasicEquipment.ScorpionBolt.detail = 'scorpion';
BasicEquipment.BallistaSmallBolt = BasicEquipment.ScorpionBolt.clone();
BasicEquipment.BallistaSmallBolt.detail = 'small ballista';
BasicEquipment.FireSiphonOil = new Equipment( 'oil', 8, 25, 3, 6, 'CII39' );
BasicEquipment.FireSiphonOil.detail = 'flamethrower';
BasicEquipment.FireSiphonOil.unit = 'gal';
BasicEquipment.GreekFire = new Equipment( 'Greek fire', 8, 75, 3, 6, 'CII39' );
BasicEquipment.GreekFire.continuous = true;
BasicEquipment.GreekFire.unit = 'gal';
// experimental
BasicEquipment.SaberwBasketHilt= new Weapon('Saber w/ basket hilt',                    3,   875,  4,  4,   -4, 'edged', 'CII23');
BasicEquipment.SaberwBasketHilt.bulk = -4;
BasicEquipment.SaberwBasketHilt.qualEffectGp = 'edged';
BasicEquipment.SaberwBasketHilt.PDB = 1;
BasicEquipment.SaberwBasketHilt.location = ['domHand'];
BasicEquipment.SaberwBasketHilt.wieldOptions = { Fencing          : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                                                      { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' }, maxDamage: '1d+2' } ] };

for ( var e in BasicEquipment ) {
    if( !BasicEquipment[e].hasOwnProperty('key') ) BasicEquipment[e].key = e;
}

// GURPS Lite 3e does not provide a list of Basic Equipment


/* Shields                                  'name', weight, cost, TL, LC, PDB, DR, pen,  HP, Skill,          ref  */
ShieldItems = {};
ShieldItems.LightCloak        = new Shield( 'cloak',     2,   20,  1,  4,   1,  1,   1,   3, 'Cloak',     'CII23' );    ShieldItems.LightCloak.detail = 'light';
ShieldItems.HeavyCloak        = new Shield( 'cloak',     5,   50,  1,  4,   2,  1,   2,   5, 'Cloak',     'CII23' );    ShieldItems.HeavyCloak.detail = 'heavy';
ShieldItems.Buckler           = new Shield( 'buckler',   2,   25,  0,  4,   1,  3,   5,  20, 'Buckler',     'B76' );
ShieldItems.SmallShield       = new Shield( 'shield',    8,   40,  0,  4,   2,  3,   5,  30, 'Shield',      'B76' );    // delay SmallShield.detail until after Chimalli, Timbe shields cloned
ShieldItems.BuffaloHideShield = new Shield( 'shield',    8,   40,  0,  4,   2,  3,   5,  30, 'Shield',    'CII43' );    ShieldItems.BuffaloHideShield.detail = 'buffalo hide';
ShieldItems.BuffaloHideShield.composition = 'hide';
ShieldItems.Chimalli = ShieldItems.SmallShield.clone(); ShieldItems.Chimalli.name = "chimalli"; ShieldItems.Chimalli.composition = 1; ShieldItems.Chimalli.reference = 'CII43';
ShieldItems.Timbe = ShieldItems.SmallShield.clone(); ShieldItems.Timbe.name = "timbe"; ShieldItems.Timbe.TL = 3; ShieldItems.Timbe.composition = 1; ShieldItems.Timbe.reference = 'CII45';
ShieldItems.SmallShield.detail = 'small';
ShieldItems.MediumShield      = new Shield( 'shield',   15,   60,  1,  4,   3,  3,   7,  40, 'Shield',      'B76' );    // delay MediumShield.detail until after Heater, Saxon shields cloned
ShieldItems.ComancheShield    = new Shield( 'shield',   15,   60,  1,  4,   3,  6,  10,  40, 'Shield',    'CII43' );    ShieldItems.ComancheShield.detail = 'comanche';
ShieldItems.ComancheShield.composition = 1;
ShieldItems.HeaterShield = ShieldItems.MediumShield.clone(); ShieldItems.HeaterShield.name = "heater"; ShieldItems.HeaterShield.TL = 3; ShieldItems.HeaterShield.reference = 'CII44';
ShieldItems.SaxonShield  = ShieldItems.MediumShield.clone(); ShieldItems.SaxonShield.detail = "saxon"; ShieldItems.SaxonShield.TL  = 3; ShieldItems.SaxonShield.reference  = 'CII44';
ShieldItems.MediumShield.detail = 'medium';
ShieldItems.LargeShield       = new Shield( 'shield',   25,   90,  1,  4,   4,  3,   9,  60, 'Shield',      'B76' );    // delay LargeShield.detail until after Scutum and Kite are cloned
ShieldItems.Scutum     = ShieldItems.LargeShield.clone(); ShieldItems.Scutum.name = "scutum";   ShieldItems.Scutum.TL = 2;     ShieldItems.Scutum.reference = 'CII45';
ShieldItems.KiteShield = ShieldItems.LargeShield.clone(); ShieldItems.KiteShield.name = "kite"; ShieldItems.KiteShield.TL = 3; ShieldItems.KiteShield.reference = 'CII44';
ShieldItems.LargeShield.detail = 'large';
ShieldItems.VikingShield      = new Shield( 'shield',   12,   45,  3,  4,   4,  2,   5,  40, 'Shield',    'CII45' );    ShieldItems.VikingShield.detail = 'Viking';
ShieldItems.VikingShield.notes =["See notes on CII45-6 for special combat rules."]
ShieldItems.ForceShield       = new Shield( 'shield',  0.5, 1500, 11,  5,   4,  3,   u,   u, 'ForceShield', 'B76' );    ShieldItems.ForceShield.detail = 'force';

for ( var s in ShieldItems ) {
    if( !ShieldItems[s].hasOwnProperty('key') ) ShieldItems[s].key = s;
}

/* Armor                                    'name',                      wt, cost, TL, LC, DR, PD, location*, ref */
ArmorItems = {};

// clothes
ArmorItems.SummerClothing      = new Armor( 'clothing',                   2,   20,  0,  6,  0,  0, suitParts, 'B72' );
ArmorItems.SummerClothing.detail = "summer";
ArmorItems.SummerClothing.layerable = true;
ArmorItems.SummerClothing.unit = 'outfit';
ArmorItems.WinterClothing      = new Armor( 'clothing',                   5,   60,  0,  6,  1,  0, suitParts, 'B72' );
ArmorItems.WinterClothing.detail = "winter";
ArmorItems.WinterClothing.layerable = true;
ArmorItems.WinterClothing.unit = 'outfit';
ArmorItems.Rags                = new Armor( 'clothes',                    1,    2,  0,  6,  0,  0, suitParts, 'B210' );
ArmorItems.Rags.detail = "peasant";
ArmorItems.Rags.description = 'rags, status -2';
ArmorItems.Rags.unit = 'set';
ArmorItems.LowClassClothes     = new Armor( 'clothes',                    1,   10,  0,  6,  0,  0, suitParts, 'B210' );
ArmorItems.LowClassClothes.detail = "lower-class";
ArmorItems.LowClassClothes.description = 'status -1';
ArmorItems.LowClassClothes.unit = 'outfit';
ArmorItems.MidClassClothes     = new Armor( 'clothes',                    1,   40,  0,  6,  0,  0, suitParts, 'B210' );
ArmorItems.MidClassClothes.detail = "middle-class";
ArmorItems.MidClassClothes.description = "status 0-1";
ArmorItems.MidClassClothes.unit = 'outfit';
ArmorItems.HighClassClothes    = new Armor( 'clothes',                    1,  200,  0,  6,  0,  0, suitParts, 'B210' );
ArmorItems.HighClassClothes.detail = "upper-class";
ArmorItems.HighClassClothes.description = "status 2-5";
ArmorItems.HighClassClothes.unit = 'outfit';
ArmorItems.NobleClothes        = new Armor( 'clothes',                    1, 1000,  0,  6,  0,  0, suitParts, 'B210' );
ArmorItems.NobleClothes.detail = "noble";
ArmorItems.NobleClothes.description = "status 6+";
ArmorItems.NobleClothes.unit = 'ensemble';
ArmorItems.RagsWinter          = new Armor( 'clothes',                    3,    4,  0,  6,  1,  0, suitParts, 'B210' );
ArmorItems.RagsWinter.detail = "peasant winter";
ArmorItems.RagsWinter.description = 'rags, status -2';
ArmorItems.RagsWinter.unit = 'set';
ArmorItems.LowClassClothesWinter=new Armor( 'clothes',                    3,   20,  0,  6,  1,  0, suitParts, 'B210' );
ArmorItems.LowClassClothesWinter.detail = "lower-class winter";
ArmorItems.LowClassClothesWinter.description = 'status -1';
ArmorItems.LowClassClothesWinter.unit = 'outfit';
ArmorItems.MidClassClothesWinter=new Armor( 'clothes',                    3,   80,  0,  6,  1,  0, suitParts, 'B210' );
ArmorItems.MidClassClothesWinter.detail = "middle-class winter";
ArmorItems.MidClassClothesWinter.description = "status 0-1";
ArmorItems.MidClassClothesWinter.unit = 'outfit';
ArmorItems.HighClassClothesWinter=new Armor('clothes',                    3,  400,  0,  6,  1,  0, suitParts, 'B210' );
ArmorItems.HighClassClothesWinter.detail = "upper-class winter";
ArmorItems.HighClassClothesWinter.description = "status 2-5";
ArmorItems.HighClassClothesWinter.unit = 'outfit';
ArmorItems.NobleClothesWinter  = new Armor( 'clothes',                    3, 2000,  0,  6,  1,  0, suitParts, 'B210' );
ArmorItems.NobleClothesWinter.detail = "noble winter";
ArmorItems.NobleClothesWinter.description = "status 6+";
ArmorItems.NobleClothesWinter.unit = 'ensemble';
ArmorItems.Sandals             = new Armor( 'sandals',                    1,   10,  0,  6,  0,  0, ['domFoot','offFoot'], 'B210' );
ArmorItems.Sandals.unit = 'pair';
ArmorItems.Slippers            = new Armor( 'slippers',                   1,   10,  0,  6,  0,  0, ['domFoot','offFoot'], 'B210' );
ArmorItems.Slippers.unit = 'pair';
ArmorItems.Shoes               = new Armor( 'shoes',                      2,   40,  1,  6,  1,  1, ['domFoot','offFoot'], 'B210' );
ArmorItems.Shoes.detail = 'leather';
ArmorItems.Poncho              = new Armor( 'poncho',                     3,   10,  0,  6,  1,  1, ['neck','torso','waist','groin'], 'CII41' );
ArmorItems.Poncho.detail = 'fur';
ArmorItems.FurCoat             = new Armor( 'fur coat',                   6,   10,  0,  6,  1,  1, ['neck','torso','waist','domArm','offArm'], 'CII41' );
ArmorItems.FurLoincloth        = new Armor( 'fur loincloth',              0,   10,  0,  6,  1,  1, ['groin','waist'], 'B283' );
ArmorItems.FurLoincloth.flexible  = true;
ArmorItems.FurLoincloth.layerable = true;
ArmorItems.FurTunic            = new Armor( 'fur tunic',                  2,   10,  0,  6,  1,  1, ['neck','torso','waist'], 'CII41' );
ArmorItems.FurLeggings         = new Armor( 'fur leggings',               2,   10,  0,  6,  1,  1, ['domLeg','offLeg'], 'CII45' );
ArmorItems.FurLeggings.layerable = true;
ArmorItems.FurBoots            = new Armor( 'fur boots',                  2,   10,  0,  6,  0,  1, ['domFoot','offFoot'], 'CII46' );
ArmorItems.FurMittens          = new Armor( 'fur mittens',                0,   10,  0,  6,  0,  1, ['domHand','offHand'], 'CII46' );
ArmorItems.FurMittens.notes = ["-2 penalty to all weapon skill rolls."];
ArmorItems.Overcoat            = new Armor( 'overcoat',                  10,   50,  3,  5,  1,  0, ['torso','waist','groin','domArm','offArm','domLeg','offLeg'], 'B210' );

ArmorItems.Galerus             = new Armor( 'galerus',                    7,  105,  2,  6,  4,  3, ['offArm'], 'CII46' );
ArmorItems.Galerus.PDB = 2; ArmorItems.Galerus.Skill = 'Shield';  // Galerus can be used to parry/block

ArmorItems.MailPalmedGloveDom  = new Armor( 'mail-palmed glove',        0.5,   50,  4,  6,  3,  3, ['domHand'], 'CII46' );
ArmorItems.MailPalmedGloveDom.description = "dominant-hand";
ArmorItems.MailPalmedGloveDom.splitDR = 1;  ArmorItems.MailPalmedGloveDom.splitPD = 1;
ArmorItems.MailPalmedGloveDom.notes = ["-2 penalty to all weapon skill rolls.","It gives PD 3, DR 3 against cutting and impaling attacks, unless the impaling attack comes from a blade less than one inch wide, in which case protection is PD 0, DR 1. The flexible mail gives only PD 1, DR 1 against crushing attacks."];
ArmorItems.MailPalmedGloveOff  = new Armor( 'mail-palmed glove',        0.5,   50,  4,  6,  3,  3, ['offHand'], 'CII46' );
ArmorItems.MailPalmedGloveOff.description = "off-hand";
ArmorItems.MailPalmedGloveOff.splitDR = 1;  ArmorItems.MailPalmedGloveOff.splitPD = 1;
ArmorItems.MailPalmedGloveOff.notes = ["It gives PD 3, DR 3 against cutting and impaling attacks, unless the impaling attack comes from a blade less than one inch wide, in which case protection is PD 0, DR 1. The flexible mail gives only PD 1, DR 1 against crushing attacks."];

ArmorItems.StrawOvercoat       = new Armor( 'straw overcoat',            10,    1,  3,  5,  1,  0, ['torso','waist','groin'], 'CII43' );

ArmorItems.CaneBreastplate     = new Armor( 'cane breastplate',           4,   50,  1,  5,  2,  2, ['torso','waist','groin'], 'CII42' );
ArmorItems.CaneBreastplate.notes = ["protects only from front"];
ArmorItems.Ichcauipilli        = new Armor( 'ichcauipilli',               3,  100,  1,  5,  1,  1, ['torso','waist','groin'], 'B210' );
ArmorItems.Ichcauipilli.layerable = true;

ArmorItems.CottonArmCoverings  = new Armor( 'cotton arm coverings',       1,   50,  1,  6,  1,  0, ['domArm','offArm'], 'CII46' );
ArmorItems.CottonArmCoverings.layerable = true;
ArmorItems.CottonLegCoverings  = new Armor( 'cotton leg coverings',       1,   50,  1,  6,  1,  0, ['domLeg','offLeg'], 'CII46' );
ArmorItems.CottonLegCoverings.layerable = true;

ArmorItems.ClothArmorSuit      = new Armor( 'cloth armor',               14,  180,  1,  5,  1,  1, bodySuit, 'B72' );
ArmorItems.ClothArmorSuit.detail = 'suit of';
ArmorItems.ClothArmorSuit.layerable = true;
ArmorItems.ClothArmorSuit.maxTL = 4;
ArmorItems.ClothCap            = new Armor( 'cloth cap',                  0,    5,  1,  6,  1,  1, ['skull'], 'B210' );
ArmorItems.ClothCap.layerable = true;
ArmorItems.ClothArmor          = new Armor( 'cloth armor',                6,   30,  1,  5,  1,  1, ['torso','waist','groin'], 'B210' );
ArmorItems.ClothArmor.layerable = true;
ArmorItems.ClothArmorSleeves   = new Armor( 'cloth armor sleeves',        2,   20,  1,  5,  1,  1, ['domArm','offArm'], 'B210' );
ArmorItems.ClothArmorSleeves.layerable = true;
ArmorItems.ClothLeggings       = new Armor( 'cloth leggings',             2,   20,  1,  5,  1,  1, ['domLeg','offLeg'], 'B210' );
ArmorItems.ClothLeggings.layerable = true;
ArmorItems.ClothGloves         = new Armor( 'cloth gloves',               0,   15,  1,  6,  1,  1, ['domHand','offHand'], 'B210' );
ArmorItems.ClothGloves.layerable = true;
ArmorItems.BuffCoat            = new Armor( 'buff coat',                 16,  210,  4,  5,  2,  2, bodySuit, 'CII43' );
ArmorItems.BuffCoat.detail = 'leather';
ArmorItems.BuffCoat.flexible = true;

ArmorItems.FlakJacketB72       = new Armor( 'flak jacket',               17,  220,  6,  5,  3,  2, ['torso','waist'], 'B72' );
ArmorItems.FlakJacketB72.detail = 'B72';
ArmorItems.FlakJacketB72.description = 'as described on page B72';
ArmorItems.FlakJacketB211      = new Armor( 'flak jacket',               12,  150,  6,  5,  4,  2, ['torso','waist'], 'B211' );
ArmorItems.FlakJacketB211.detail = 'B211';
ArmorItems.FlakJacketB211.description = 'as described on page B211';

ArmorItems.LeatherJacket       = new Armor( 'jacket',                     4,   50,  1,  6,  1,  1, ['torso','waist','domArm','offArm'], 'B210' );
ArmorItems.LeatherJacket.detail = 'leather';
ArmorItems.LeatherJacket.layerable = true;
ArmorItems.LightLeatherArmor   = new Armor( 'leather armor',             10,  210,  1,  5,  1,  1, bodySuit, 'B72' );
ArmorItems.LightLeatherArmor.detail = 'suit of light';
ArmorItems.LightLeatherArmor.maxTL = 4;
ArmorItems.LeatherArmorSuit    = new Armor( 'leather armor',             20,  350,  1,  5,  2,  2, bodySuit, 'B72' );
ArmorItems.LeatherArmorSuit.detail = 'suit of';
ArmorItems.LeatherArmorSuit.maxTL = 4;
ArmorItems.LeatherHelm         = new Armor( 'leather helm',             0.5,   20,  1,  5,  2,  2, ['skull','face'], 'B210' );
ArmorItems.LeatherArmor        = new Armor( 'leather armor',             10,  100,  1,  5,  2,  2, ['torso','waist','groin'], 'B210' );
ArmorItems.LeatherSleeves      = new Armor( 'leather armor sleeves',      2,   50,  1,  5,  2,  2, ['domArm','offArm'], 'B210' );
ArmorItems.LeatherSleeves.layerable = true;
ArmorItems.LeatherLeggings     = new Armor( 'leather leggings',           4,   60,  1,  5,  2,  2, ['domLeg','offLeg'], 'B210' );
ArmorItems.LeatherLeggings.layerable = true;
ArmorItems.LeatherGloves       = new Armor( 'leather gloves',             0,   30,  1,  6,  2,  2, ['domHand','offHand'], 'B210' );
ArmorItems.LeatherDo           = new Armor( 'do',                         9,   60,  3,  5,  2,  2, ['torso','waist','groin'], 'CII43' );
ArmorItems.LeatherDo.detail = 'leather';
ArmorItems.LeatherDoSuit       = new Armor( 'do suit',                   20,  140,  3,  5,  2,  2, suitParts, 'CII43' );
ArmorItems.LeatherDoSuit.detail = 'leather';
ArmorItems.BambooDo            = new Armor( 'do',                        11,  100,  3,  5,  3,  2, ['torso','waist','groin'], 'CII43' );
ArmorItems.BambooDo.detail = 'bamboo-reinforced';
ArmorItems.BambooDoSuit        = new Armor( 'do suit',                   25,  220,  3,  5,  3,  2, suitParts, 'CII43' );
ArmorItems.BambooDoSuit.detail = 'bamboo-reinforced';
ArmorItems.SteelDo             = new Armor( 'do',                        15,  100,  3,  5,  4,  3, ['torso','waist','groin'], 'CII43' );
ArmorItems.SteelDo.detail = 'steel';
ArmorItems.SteelDoSuit         = new Armor( 'do suit',                   35,  375,  3,  5,  4,  3, suitParts, 'CII43' );
ArmorItems.SteelDoSuit.detail = 'steel';
ArmorItems.NinjaArmor          = new Armor( 'ninja armor',               20,  100,  3,  5,  3,  1, ['torso','waist','groin'], 'CII43' );
ArmorItems.KendoArmor          = new Armor( 'kendo armor',               10,  700,  5,  5,  3,  2, ['face','neck','torso','waist','groin'], 'CII43' );
ArmorItems.KendoArmor.splitDR = 2;  ArmorItems.KendoArmor.splitPD = 1;
ArmorItems.KendoArmor.notes = ["The kendo suit has PD 2, DR 3 against blunt attacks, and PD 1, DR 2 against cutting and impaling attacks."];
ArmorItems.MartialArtsArmorTL7 = new Armor( 'martial-arts armor',        10,  100,  7,  5,  3,  1, ['face','neck','torso','waist','groin'], 'CII44' );
ArmorItems.MartialArtsArmorTL7.splitDR = 2;
ArmorItems.MartialArtsArmorTL7.notes = ["Provides PD 1, DR 3 against crushing attacks and PD 1, DR 2 against cutting and impaling attacks."];

ArmorItems.Boots               = new Armor( 'boots',                      3,   80,  1,  6,  2,  2, ['domFoot','offFoot'], 'B210' );

ArmorItems.WoodenArmorSuit     = new Armor( 'wooden armor',              10,  120,  1,  5,  3,  2, ['torso','waist','groin'], 'CII42' );
ArmorItems.WoodenArmorSuit.notes = ["An ornamented corselet made of wooden slats over an elkskin undershirt."];

ArmorItems.ChainmailSuit       = new Armor( 'chainmail armor',           45,  550,  3,  5,  4,  3, bodySuit, 'B72' );
ArmorItems.ChainmailSuit.detail = 'suit of';
ArmorItems.ChainmailSuit.splitDR = 2;  ArmorItems.ChainmailSuit.splitPD = 1;
//ArmorItems.ChainmailSuit.layerable = true;
ArmorItems.ChainmailSuit.maxTL = 4;
ArmorItems.ChainmailSuit.notes = ["Normally, chainmail is worn <i>over</i> padded cloth armor. The combination has a PD of 3 and DR of 4. Exception: Against <i>impaling</i> weapons, it has PD 1 and DR 2. The cost and weight for a complete set of chainmail, as given in the <i>Equipment and Encumbrance</i> chapter (pp. 71-77). assume that padded cloth is included. Worn by itself, <i>without</i> cloth armor underneath, chainmail would have a PD of 3 and a DR of 3 (PD 0. DR 1 vs. impaling). Using chainmail this way is not efficient in terms of cost or weight!"];
ArmorItems.ChainCoif           = new Armor( 'chainmail coif',             4,   55,  2,  5,  3,  3, ['skull','neck'], 'B210' );
ArmorItems.ChainCoif.splitDR = 1;  ArmorItems.ChainCoif.splitPD = 0;
ArmorItems.ChainCoif.layerable = true;
ArmorItems.ChainCoif.maxTL = 4;
ArmorItems.ChainCoif.notes = ["Normally, chainmail is worn <i>over</i> padded cloth armor. The combination has a PD of 3 and DR of 4. Exception: Against <i>impaling</i> weapons, it has PD 1 and DR 2. The cost and weight for a complete set of chainmail, as given in the <i>Equipment and Encumbrance</i> chapter (pp. 71-77). assume that padded cloth is included. Worn by itself, <i>without</i> cloth armor underneath, chainmail would have a PD of 3 and a DR of 3 (PD 0. DR 1 vs. impaling). Using chainmail this way is not efficient in terms of cost or weight!"];
ArmorItems.Chainmail           = new Armor( 'chainmail',                 25,  230,  2,  5,  3,  3, ['torso','waist','groin'], 'B210' );
ArmorItems.Chainmail.splitDR = 1;  ArmorItems.Chainmail.splitPD = 0;
ArmorItems.Chainmail.layerable = true;
ArmorItems.Chainmail.maxTL = 4;
ArmorItems.Chainmail.notes = ["Normally, chainmail is worn <i>over</i> padded cloth armor. The combination has a PD of 3 and DR of 4. Exception: Against <i>impaling</i> weapons, it has PD 1 and DR 2. The cost and weight for a complete set of chainmail, as given in the <i>Equipment and Encumbrance</i> chapter (pp. 71-77). assume that padded cloth is included. Worn by itself, <i>without</i> cloth armor underneath, chainmail would have a PD of 3 and a DR of 3 (PD 0. DR 1 vs. impaling). Using chainmail this way is not efficient in terms of cost or weight!"];
ArmorItems.ChainmailSleeves    = new Armor( 'chainmail sleeves',          9,   70,  2,  5,  3,  3, ['domArm','offArm'], 'B210' );
ArmorItems.ChainmailSleeves.splitDR = 1;  ArmorItems.ChainmailSleeves.splitPD = 0;
ArmorItems.ChainmailSleeves.layerable = true;
ArmorItems.ChainmailSleeves.maxTL = 4;
ArmorItems.ChainmailSleeves.notes = ["Normally, chainmail is worn <i>over</i> padded cloth armor. The combination has a PD of 3 and DR of 4. Exception: Against <i>impaling</i> weapons, it has PD 1 and DR 2. The cost and weight for a complete set of chainmail, as given in the <i>Equipment and Encumbrance</i> chapter (pp. 71-77). assume that padded cloth is included. Worn by itself, <i>without</i> cloth armor underneath, chainmail would have a PD of 3 and a DR of 3 (PD 0. DR 1 vs. impaling). Using chainmail this way is not efficient in terms of cost or weight!"];
ArmorItems.ChainmailLeggings   = new Armor( 'chainmail leggings',        15,  110,  2,  5,  3,  3, ['domLeg','offLeg'], 'B210' );
ArmorItems.ChainmailLeggings.splitDR = 1;  ArmorItems.ChainmailLeggings.splitPD = 0;
ArmorItems.ChainmailLeggings.layerable = true;
ArmorItems.ChainmailLeggings.maxTL = 4;
ArmorItems.ChainmailLeggings.notes = ["Normally, chainmail is worn <i>over</i> padded cloth armor. The combination has a PD of 3 and DR of 4. Exception: Against <i>impaling</i> weapons, it has PD 1 and DR 2. The cost and weight for a complete set of chainmail, as given in the <i>Equipment and Encumbrance</i> chapter (pp. 71-77). assume that padded cloth is included. Worn by itself, <i>without</i> cloth armor underneath, chainmail would have a PD of 3 and a DR of 3 (PD 0. DR 1 vs. impaling). Using chainmail this way is not efficient in terms of cost or weight!"];
ArmorItems.ChainMailVest      = new Armor( 'mail vest',                   8,   10,  5,  5,  3,  3, ['neck','torso','waist'], 'CII43' );
ArmorItems.ChainMailVest.splitDR = 1;   ArmorItems.ChainMailVest.flexible = true;
ArmorItems.ChainMailVest.splitPD = 0;   ArmorItems.ChainMailVest.layerable = true;

ArmorItems.BoxingGloves        = new Armor( 'boxing gloves',              2,   60,  5,  6,  2,  1, ['domHand','offHand'], 'CII46' );
ArmorItems.BoxingGloves.notes = ["Halve damage done by a punch (if the Stun damage rules are being used, GMs may rule that the gloves do full Stun damage)."];

ArmorItems.BodyArmorCivilWar   = new Armor( 'body armor',                12,   18,  5,  5, 10,  4, ['torso','waist','groin'], 'B211' );
ArmorItems.BodyArmorCivilWar.detail = 'Civil War';
ArmorItems.BodyArmorCivilWar.notes = ["protects only from front"];
ArmorItems.BulletproofVest     = new Armor( 'bulletproof vest',          25,  100,  6,  5,  6,  4, ['neck','torso','waist'], 'CII43' );
ArmorItems.BulletproofVest.layerable = true;
ArmorItems.Cuirass             = new Armor( 'cuirass',                   30,  200,  6,  5,  7,  4, ['torso','waist'], 'CII43' );
ArmorItems.SnipersArmor        = new Armor( 'sniper’s armor',            70,  300,  6,  3, 20,  4, ['skull','face','neck','torso','waist','groin'], 'CII43' );
ArmorItems.SnipersArmor.notes = ["Covers only the front.","So stiff and awkward that Move is halved while wearing it.","All sense rolls are at -3."];
ArmorItems.ArmoredOvercoat       = new Armor( 'armored overcoat',        22,  500,  7,  5, 12,  1, suitParts, 'CII43' );
ArmorItems.ArmoredOvercoat.notes = ["Bulky and awkward; reduces Move by 1 and is -2 to any Acrobatics, Climbing or similar skill roll."];

ArmorItems.KevlarMilitaryVest  = new Armor( 'military kevlar vest',       5,  200,  7,  5,  5,  2, ['neck','torso','waist'], 'B211' );
ArmorItems.EOD_BodyArmor       = new Armor( 'EOD body armor',            35,  600,  7,  5, 30,  3, fullSuit, 'B211' );
ArmorItems.EOD_BodyArmor.notes = ["Mobility restricting: DX -3.","Head DR 20, face DR 10, arms/legs/feet DR 10."];
ArmorItems.BodyArmorKevlarVest = new Armor( 'body armor vest, kevlar',    6,  425,  7,  5, 16,  2, ['torso','waist','groin'], 'B211' );
ArmorItems.BodyArmorVestInserts= new Armor( 'body armor vest inserts',   38,  380,  7,  5, 19,  0, ['torso','waist'], 'B211' );
ArmorItems.BodyArmorVestInserts.layerable = true;
ArmorItems.KevlarVest          = new Armor( 'kevlar vest',              2.5,  200,  7,  5, 14,  2, ['torso','waist'], 'B211' );

ArmorItems.ScaleSuit           = new Armor( 'scale armor',               50,  750,  2,  5,  4,  3, bodySuit, 'B72' );
ArmorItems.ScaleSuit.detail = 'suit of';
ArmorItems.ScaleSuit.maxTL = 4;
ArmorItems.PotHelm             = new Armor( 'pot-helm',                   5,  100,  2,  5,  4,  3, ['skull'], 'B210' );
ArmorItems.Scale               = new Armor( 'scale',                     35,  420,  2,  5,  4,  3, ['torso','waist','groin'], 'B210' );
ArmorItems.ScaleSleeves        = new Armor( 'scale sleeves',             14,  210,  2,  5,  4,  3, ['domArm','offArm'], 'B210' );
ArmorItems.ScaleLeggings       = new Armor( 'scale leggings',            21,  250,  2,  5,  4,  3, ['domLeg','offLeg'], 'B210' );

ArmorItems.BronzeHelmet        = new Armor( 'helmet',                   7.5,  160,  1,  5,  3,  3, ['skull','face'], 'CII40' );
ArmorItems.BronzeHelmet.detail = 'bronze';
ArmorItems.RomanBronzeHelmet   = new Armor( 'helmet',                   5.5,   80,  2,  5,  3,  3, ['skull'], 'CII40' );
ArmorItems.RomanBronzeHelmet.detail = 'Roman bronze';
// I had to split the Gladiator's helmet into two pieces, because the DR differs
ArmorItems.RomanGladiatorsHelmet=new Armor( 'helmet',                     5,  120,  2,  5,  4,  3, ['skull'], 'CII40' );
ArmorItems.RomanGladiatorsHelmet.detail = 'Roman gladiator’s';
ArmorItems.RomanGladiatorsHelmet.goeswith = ["GladiatorsFaceNet"];
ArmorItems.GladiatorsFaceNet   = new Armor( 'face net',                   1,   30,  2,  5,  3,  1, ['face'], 'CII40' );
ArmorItems.GladiatorsFaceNet.detail = 'Roman gladiator’s';
ArmorItems.GladiatorsFaceNet.splitDR = 1;
ArmorItems.GladiatorsFaceNet.goeswith = ["RomanGladiatorsHelmet"];
// Legionaire's helmet
ArmorItems.FaceMask            = new Armor( 'face mask',                 15,  100,  3,  5,  4,  3, ['face'], 'CII41' );
// Lobsterback
ArmorItems.NinjaHat            = new Armor( 'ninja hat',                  2,   50,  3,  5,  3,  1, ['skull'], 'CII41' );
ArmorItems.ReinforcedCoif      = new Armor( 'reinforced coif',            3,  500,  3,  5,  2,  2, ['skull','neck'], 'B210' );
ArmorItems.ReinforcedCoif.notes = ["Arab; an open-faced chainmail cap made of high-quality mail. Gives PD 2, DR 2, even against impaling attacks."];
ArmorItems.ReinforcedCoif.layerable = true;
ArmorItems.VikingHelmet        = new Armor( 'helmet',                     7,  200,  3,  5,  4,  4, ['skull'], 'CII41' );
ArmorItems.VikingHelmet.detail = 'Viking';
ArmorItems.SteelSkullcap       = new Armor( 'skullcap',                   3,    5,  5,  5,  4,  2, ['skull'], 'CII41' );
ArmorItems.SteelSkullcap.detail = 'steel';
ArmorItems.SteelSkullcap.layerable = true;
ArmorItems.SteelSkullcap.notes = ["Protects only top of head."];
ArmorItems.CasqueAdrian        = new Armor( 'casque adrian',              4,   20,  6,  5,  4,  2, ['skull'], 'CII41' )
// Cuirassier's Dress Helmet
ArmorItems.Pickelhaube         = new Armor( 'pickelhaube',                2,   10,  6,  5,  1,  1, ['skull'], 'CII41' );
ArmorItems.Stahlhelm           = new Armor( 'stahlhelm',                  5,   20,  6,  5,  4,  4, ['skull'], 'CII41' );
ArmorItems.SteelSkullcapTL6    = new Armor( 'skullcap',                   2,   20,  6,  5,  3,  2, ['skull'], 'CII41' );
ArmorItems.SteelSkullcapTL6.detail = 'steel';
ArmorItems.SteelSkullcapTL6.layerable = true;
ArmorItems.SteelSkullcapTL6.notes = ["Protects only top of head."];

ArmorItems.LoricaSegmentata    = new Armor( 'lorica segmentata',         35,  650,  2,  5,  5,  3, ['torso','waist'], 'CII42' );
ArmorItems.LoricaSegmentata.splitDR = 3;  ArmorItems.LoricaSegmentata.splitPD = 2;
ArmorItems.SegmentedArmor = ArmorItems.LoricaSegmentata.clone();  ArmorItems.SegmentedArmor.name = "segmented armor";
ArmorItems.LoricaSegmentataLeather=new Armor( 'lorica segmentata',     11.5,  130,  2,  5,  3,  2, ['torso','waist'], 'CII42' );
ArmorItems.LoricaSegmentataLeather.detail = 'leather';
ArmorItems.LoricaSegmentataLeather.splitDR = 2;
ArmorItems.SegmentedArmorLeather = ArmorItems.LoricaSegmentataLeather.clone();  ArmorItems.SegmentedArmorLeather.name = "segmented armor";
ArmorItems.StuddedLeatherSkirt = new Armor( 'studded leather skirt',      4,   60,  2,  5,  3,  2, ['groin'], 'CII42' );
ArmorItems.StuddedLeatherSkirt.splitDR = 1;   ArmorItems.StuddedLeatherSkirt.splitPD = 1;
ArmorItems.StuddedLeatherSkirt.flexible = true;
ArmorItems.ArmoredShirt        = new Armor( 'armored shirt',             12, 2000,  3,  5,  3,  2, ['torso','waist','groin'], 'CII42' );
ArmorItems.ArmoredShirt.notes = ["Arab; a high-quality mail shirt, designed to protect against an assassin's blade."];
ArmorItems.ArmoredShirt.layerable = true;

ArmorItems.DendraPanoply       = new Armor( 'dendra panoply',            50, 3000,  1,  5,  6,  4, ['face','neck','torso','waist','groin'], 'CII41' );
ArmorItems.BronzeCorselet      = new Armor( 'corselet',                  40, 1300,  1,  3,  5,  4, ['torso','waist','groin'], 'CII42' );
ArmorItems.BronzeCorselet.detail = "bronze";
ArmorItems.BronzeBreastplate   = new Armor( 'breastplate',               20,  400,  2,  5,  4,  4, ['neck','torso','waist','groin'], 'B210' );
ArmorItems.BronzeBreastplate.detail = "bronze";
ArmorItems.BronzeCuirass       = new Armor( 'cuirass',                   23,  550,  2,  5,  4,  4, ['neck','torso','waist','groin'], 'CII42' );
ArmorItems.BronzeCuirass.detail = "bronze";
ArmorItems.BronzeCuirass.notes = ["A bronze corselet with PD 4, DR 4 for the front. The back of the armor was usually leather (PD 2, DR 2)."];
ArmorItems.BronzeGreaves       = new Armor( 'greaves',                   17,  300,  1,  5,  3,  3, ['domLeg','offLeg'], 'CII46' );
ArmorItems.BronzeGreaves.detail = "bronze";
ArmorItems.BronzeGreavesRoman = ArmorItems.BronzeGreaves.clone();
ArmorItems.BronzeGreavesRoman.detail = "Roman bronze";  ArmorItems.BronzeGreavesRoman.cost = 270;
ArmorItems.BronzeGreavesRoman.notes = ["Protects front only."];

ArmorItems.SteelBreastplate    = new Armor( 'breastplate',               18,  500,  3,  5,  5,  4, ['neck','torso','waist','groin'], 'CII43' );
ArmorItems.SteelBreastplate.detail = "steel";
ArmorItems.SteelBreastplateTL5 = new Armor( 'breastplate',               12,  180,  5,  5, 10,  4, ['neck','torso','waist','groin'], 'CII43' );
ArmorItems.SteelBreastplateTL5.detail = "steel";
ArmorItems.SteelBreastplateTL5.notes = ["Protects only the torso, and only from in front."];
ArmorItems.Gauntlets           = new Armor( 'gauntlets',                  2,  100,  2,  5,  4,  3, ['domHand','offHand'], 'B210' );
ArmorItems.Sollerets           = new Armor( 'sollerets',                  7,  150,  3,  5,  4,  3, ['domFoot','offFoot'], 'B210' );

ArmorItems.HalfPlate           = new Armor( 'half-plate armor',          70, 2000,  2,  5,  5,  4, bodySuit.concat(['skull','face']), 'B72' );
ArmorItems.HalfPlate.detail = 'suit of';
ArmorItems.HalfPlate.maxTL = 4;

ArmorItems.LightPlate          = new Armor( 'plate armor',               90, 4000,  3,  5,  6,  4, bodySuit.concat(['skull','face']), 'B72' );
ArmorItems.LightPlate.detail = 'suit of light';
ArmorItems.LightPlate.maxTL = 4;
ArmorItems.SteelCorselet       = new Armor( 'corselet',                  35, 1300,  3,  5,  6,  4, ['torso','waist','groin'], 'B210' );
ArmorItems.SteelCorselet.detail = 'steel';
ArmorItems.Vambraces           = new Armor( 'plate vambraces',           15, 1000,  3,  5,  6,  4, ['domArm','offArm'], 'B210' );
ArmorItems.Greaves             = new Armor( 'plate greaves',             20, 1100,  3,  5,  6,  4, ['domLeg','offLeg'], 'B210' );

ArmorItems.HeavyPlate          = new Armor( 'plate armor',              110, 6000,  3,  5,  7,  4, bodySuit.concat(['skull','face']), 'B72' );
ArmorItems.HeavyPlate.detail = 'suit of heavy';
ArmorItems.HeavyPlate.maxTL = 4;
ArmorItems.Greathelm           = new Armor( 'greathelm',                 10,  340,  3,  5,  7,  4, ['skull','face','neck'], 'B210' );
ArmorItems.HeavySteelCorselet  = new Armor( 'corselet',                  45, 2300,  3,  5,  7,  4, ['torso','waist','groin'], 'B210' );
ArmorItems.HeavySteelCorselet.detail = 'heavy steel';
ArmorItems.HeavyVambraces      = new Armor( 'plate vambraces',           20, 1500,  3,  5,  7,  4, ['domArm','offArm'], 'B210' );
ArmorItems.HeavyVambraces.detail = 'heavy';
ArmorItems.HeavyGreaves        = new Armor( 'plate greaves',             25, 1600,  3,  5,  7,  4, ['domLeg','offLeg'], 'B210' );
ArmorItems.HeavyGreaves.detail = 'heavy';
ArmorItems.PlateTL7            = new Armor( 'plate armor',               60,25000,  7,  5, 20,  4, bodySuit.concat(['skull','face']), 'CII44' );
ArmorItems.PlateTL7.detail = 'suit of modern steel';
ArmorItems.GreathelmTL7        = new Armor( 'greathelm',                  8, 1500,  7,  5, 20,  4, ['skull','face','neck'], 'CII44' );
ArmorItems.GreathelmTL7.detail = 'modern steel';
ArmorItems.SteelCorseletTL7    = new Armor( 'corselet',                  22,10000,  7,  5, 20,  4, ['torso','waist','groin'], 'CII44' );
ArmorItems.SteelCorseletTL7.detail = 'modern steel';
ArmorItems.VambracesTL7        = new Armor( 'vambraces',                 10, 6000,  7,  5, 10,  4, ['domArm','offArm'], 'CII44' );
ArmorItems.VambracesTL7.detail = 'modern steel';
ArmorItems.GreavesTL7          = new Armor( 'greaves',                   15, 6500,  7,  5, 12,  4, ['domLeg','offLeg'], 'CII44' );
ArmorItems.GreavesTL7.detail = 'modern steel';
ArmorItems.GauntletsTL7        = new Armor( 'gauntlets',                  1,  400,  7,  5,  6,  4, ['domHand','offHand'], '' );
ArmorItems.GauntletsTL7.detail = 'modern steel';
ArmorItems.SolleretsTL7        = new Armor( 'sollerets',                  4,  600,  7,  5,  6,  4, ['domFoot','offFoot'], 'CII44' );
ArmorItems.SolleretsTL7.detail = 'modern steel';

ArmorItems.LightKevlar         = new Armor( 'light kevlar',               5,  220,  7,  3,  4,  2, ['torso'], 'B72' );
ArmorItems.LightKevlar.splitDR = 2;  ArmorItems.LightKevlar.splitPD = 1;
ArmorItems.HeavyKevlar         = new Armor( 'heavy kevlar',               9,  420,  7,  3, 12,  2, ['torso'], 'B72' );
ArmorItems.HeavyKevlar.splitDR = 2;  ArmorItems.HeavyKevlar.splitPD = 1;

ArmorItems.LightBodyArmor      = new Armor( 'body armor',                22,  270,  7,  3, 15,  4, bodySuit, 'B72' );
ArmorItems.LightBodyArmor.detail = 'suit of light';

ArmorItems.ArmorInsertTL7Front = new Armor( 'insert',                   0.5,   30,  7,  3,  1,  1, ['torso','waist'], 'CII45' );
ArmorItems.ArmorInsertTL7Front.detail = 'front torso';
ArmorItems.ArmorInsertTL7Front.unit = 'DR';    ArmorItems.ArmorInsertTL7Front.layerable = true;
ArmorItems.ArmorInsertTL7Front.notes = ["Protects against attacks from the front only.","Includes vitals; hit location area 17-18.","Inserts can add from 5 to 50 to DR."]
ArmorItems.ArmorInsertTL7Back  = new Armor( 'insert',                   0.5,   30,  7,  3,  1,  1, ['torso','waist'], 'CII45' );
ArmorItems.ArmorInsertTL7Back.detail = 'back torso';
ArmorItems.ArmorInsertTL7Back.unit = 'DR';    ArmorItems.ArmorInsertTL7Back.layerable = true;
ArmorItems.ArmorInsertTL7Back.notes = ["Protects against attacks from the back only.","Includes vitals; hit location area 17-18.","Inserts can add from 5 to 50 to DR."]
ArmorItems.ArmorInsertTL7Breast= new Armor( 'insert',                   0.5,   10,  7,  3,  1,  1, ['torso'], 'CII45' );
ArmorItems.ArmorInsertTL7Breast.detail = 'vitals';
ArmorItems.ArmorInsertTL7Breast.unit = 'DR';    ArmorItems.ArmorInsertTL7Breast.layerable = true;
ArmorItems.ArmorInsertTL7Breast.notes = ["Protects vitals; hit location area 17-18.","Inserts can add from 5 to 50 to DR."]
ArmorItems.ArmorInsertTL7Groin = new Armor( 'insert',                   0.5,   10,  7,  3,  1,  1, [,'groin'], 'CII45' );
ArmorItems.ArmorInsertTL7Groin.detail = 'groin';
ArmorItems.ArmorInsertTL7Groin.unit = 'DR';    ArmorItems.ArmorInsertTL7Groin.layerable = true;
ArmorItems.ArmorInsertTL7Groin.notes = ["Inserts can add from 5 to 50 to DR."]

//ArmorItems.MartialArtsArmorTL7 = new Armor( 'martial-arts armor',       0.5,   10,  7,  3,  3,  1, [], 'CII45' );

//ArmorItems.ArmorInsertTL7 = new Armor( '',               0.5, 10,  7,  3,  1,  1, [], 'CII45' );

ArmorItems.Reflec              = new Armor( 'reflec armor',               4,  320,  8,  2,  0,  0, bodySuit, 'B72' );
ArmorItems.Reflec.detail = 'suit of';
ArmorItems.Reflec.splitDR = 0;  ArmorItems.Reflec.splitPD = 3;

ArmorItems.MediumBodyArmor     = new Armor( 'body armor',                32, 1520,  8,  2, 25,  6, bodySuit, 'B72' );
ArmorItems.MediumBodyArmor.detail = 'suit of medium';

ArmorItems.HeavyCombatArmor    = new Armor( 'combat armor',              52, 2520,  9,  1, 50,  6, bodySuit, 'B72' );
ArmorItems.HeavyCombatArmor.detail = 'suit of heavy';

ArmorItems.CID_helmet          = new Armor( 'CID helmet',                 8,  300,  8,  2, 18,  4, ['skull'], 'B211' );
ArmorItems.CID_visor           = new Armor( 'CID visor',                  2,  300,  8,  2, 10,  2, ['eyes','face'], 'B211' );
ArmorItems.CID_suit            = new Armor( 'CID suit',                  40,  510,  8,  2, 18,  4, bodySuit, 'CII44' );
ArmorItems.CID_jacket          = new Armor( 'CID jacket w/ gloves',      25,  300,  8,  2, 40,  4, ['neck','torso','waist','groin','domArm','offArm','domHand','offHand'], 'B211' );
// ArmorItems.CID_vest            = new Armor( 'CID vest',                  18,  180,  8,  2, 40,  4, ['neck','torso','waist'], 'B211' );
// ArmorItems.CID_sleeves         = new Armor( 'CID sleeves',                5,   90,  8,  2, 12,  2, ['domArm','offArm'], 'B211' );
ArmorItems.CID_gloves          = new Armor( 'CID gloves',                 2,   30,  8,  2, 12,  2, ['domHand','offHand'], 'B211' );
ArmorItems.CID_pants           = new Armor( 'CID pants',                 10,  140,  8,  2, 12,  2, ['domLeg','offLeg'], 'B211' );
ArmorItems.CID_boots           = new Armor( 'CID boots',                  5,   70,  8,  2, 15,  3, ['domFoot','offFoot'], 'B211' );

ArmorItems.LightMonocrysVest   = new Armor( 'monocrys vest',              3,  400,  8,  3,  8,  2, ['neck','torso','waist'], 'CII44' );
ArmorItems.LightMonocrysVest.detail = 'light';
ArmorItems.LightMonocrysVest.splitDR = 2;  ArmorItems.LightMonocrysVest.splitPD = 1;
ArmorItems.LightMonocrysSuit   = new Armor( 'monocrys suit',              7, 1000,  8,  3,  8,  2, suitParts, 'CII44' );
ArmorItems.LightMonocrysSuit.detail = 'light';
ArmorItems.LightMonocrysSuit.splitDR = 2;  ArmorItems.LightMonocrysSuit.splitPD = 1;
ArmorItems.MediumMonocrysVest  = new Armor( 'monocrys vest',              5,  600,  8,  3, 16,  2, ['neck','torso','waist'], 'CII44' );
ArmorItems.MediumMonocrysVest.detail = 'medium';
ArmorItems.MediumMonocrysVest.splitDR = 2;  ArmorItems.MediumMonocrysVest.splitPD = 1;
ArmorItems.MediumMonocrysSuit  = new Armor( 'monocrys suit',             12, 1500,  8,  3, 16,  2, suitParts, 'CII44' );
ArmorItems.MediumMonocrysSuit.detail = 'medium';
ArmorItems.MediumMonocrysSuit.splitDR = 2;  ArmorItems.MediumMonocrysSuit.splitPD = 1;
ArmorItems.HeavyMonocrysVest   = new Armor( 'monocrys vest',              7,  800,  8,  3, 24,  2, ['neck','torso','waist'], 'CII44' );
ArmorItems.HeavyMonocrysVest.detail = 'heavy';
ArmorItems.HeavyMonocrysVest.splitDR = 2;  ArmorItems.HeavyMonocrysVest.splitPD = 1;
ArmorItems.HeavyMonocrysSuit   = new Armor( 'monocrys suit',             16, 2000,  8,  3, 24,  2, suitParts, 'CII44' );
ArmorItems.HeavyMonocrysSuit.detail = 'heavy';
ArmorItems.HeavyMonocrysSuit.splitDR = 2;  ArmorItems.HeavyMonocrysSuit.splitPD = 1;

ArmorItems.ICA_corselet        = new Armor( 'ICA corselet',              20,  850,  9,  1, 65,  6, bodyParts, 'CII44' );
ArmorItems.ICA_sleeves         = new Armor( 'ICA sleeves',                8,  300,  9,  1, 50,  6, ['domArm','offArm'], 'CII44' );
ArmorItems.ICA_gauntlets       = new Armor( 'ICA gauntlets',              2,  125,  9,  1, 25,  5, ['domHand','offHand'], 'CII44' );
ArmorItems.ICA_pantsboots      = new Armor( 'ICA pants/boots',           15,  600,  9,  1, 50,  6, ['domLeg','offLeg','domFoot','offFoot'], 'CII44' );
ArmorItems.ICA_helmet          = new Armor( 'ICA helmet',                12,  500,  9,  1, 50,  6, ['skull'], 'CII44' );
ArmorItems.ICA_visor           = new Armor( 'ICA visor',                  3,  175,  9,  1, 35,  4, ['eyes','face'], 'CII44' );

ArmorItems.ReflexArmor         = new Armor( 'reflex armor',              10, 4000, 10,  3, 30,  5, suitParts.concat(['domFoot','offFoot']), 'CII44' );
ArmorItems.ReflexArmor.splitDR = 15;  ArmorItems.ReflexArmor.splitPD = 2;
ArmorItems.ReflexArmor.notes = ["Reflex armor detects an incoming melee weapon, thrown weapon or low-tech projectile attack automatically. Bullets, rockets and sonic beams are detected on a roll of 14 or less, and hypervelocity Gauss needles only on a 12 or less. If it detects an attack, the armor protects with PD 5, DR 30. The armor's proximity sensors are not fast enough to detect laser, blaster or other beam weapon attacks, but the tough, energy-resistant bioplastic gives some protection (PD 2, DR 15) against beams or any projectiles it fails to detect in time.","The armor's sensors are powered by a built-in B cell for three months of continuous use."];

ArmorItems.Cybersuit           = new Armor( 'cybersuit',                  0,20000, 11,  3, 80,  5, fullSuit, 'CII45' );
ArmorItems.Cybersuit.notes = ["Weighs 35 lbs, but weight does not count against encumbrance or DX when worn.",
                              "+1 to Dodge if laser sight is used.",
                              "Can amplify ST up to max of 20.",
                              "-3 to Vision rolls (normal light or IR) to spot wearer."];

ArmorItems.EnergyClothSuit     = new Armor( 'energy cloth - suit',        4, 5600, 11,  3, 50,  4, bodySuitParts.concat(['skull']), 'CII45' );
ArmorItems.EnergyClothSuit.layerable = true;
ArmorItems.EnergyClothSuit.notes = ["Incorporates a “thermal-superconducting layer” which halves the damage of lasers and their ilk, before the cloth’s DR is subtracted.",
                                    "Any crushing attack does 1 point of damage for each '6' rolled, regardless of DR."];
ArmorItems.EnergyClothVest = ArmorItems.EnergyClothSuit.clone();  ArmorItems.EnergyClothVest.name = "energy cloth - vest";  ArmorItems.EnergyClothVest.location = ['neck','torso','waist'];

ArmorItems.TinHatWWI           = new Armor( "British 'tin hat' helmet",   4,   70,  6,  5,  4,  2, ['skull'], 'B211' );
ArmorItems.GermanHelmetWWII    = new Armor( "German 'coal scuttle' helmet",5,  60,  6,  5,  4,  4, ['skull'], 'B211' );
ArmorItems.USArmyHelmetWWII    = new Armor( "US Army M1 helmet",          4,   30,  6,  5,  4,  3, ['skull'], 'B211' );
ArmorItems.RiotHelmet          = new Armor( "police riot helmet",         3,   75,  7,  5,  5,  4, ['skull'], 'B211' );
ArmorItems.RiotHelmet.splitDR = 2;
ArmorItems.USArmyHelmetTL7     = new Armor( "US Army PASGT helmet",       3,  125,  7,  5,  5,  4, ['skull'], 'B211' );

// barding
ArmorItems.ClothTrappings      = new Armor( 'barding',                   30,  380,  2,  6,  2,  2, ['skull','face','neck','torso','waist'], 'CII41' );
ArmorItems.ClothTrappings.detail = "leather/cloth full";
ArmorItems.ClothTrappings.description = "Full Trappings (suit)";
ArmorItems.LightMailTrappings  = new Armor( 'barding',                   70,  600,  2,  6,  3,  4, ['skull','face','neck','torso','waist'], 'CII41' );
ArmorItems.LightMailTrappings.detail = "light mail full";
ArmorItems.LightMailTrappings.splitDR = 2;  ArmorItems.LightMailTrappings.splitPD = 1;
ArmorItems.LightMailTrappings.description = "Full Trappings (suit)";
ArmorItems.ScaleTrappings      = new Armor( 'barding',                   90, 1000,  2,  6,  3,  4, ['skull','face','neck','torso','waist'], 'CII41' );
ArmorItems.ScaleTrappings.detail = "scale full";
ArmorItems.ScaleTrappings.description = "Full Trappings (suit)";

ArmorItems.MailBarding            = new Armor('barding',                 50,  440,  2,  6,  3,  4, ['torso','waist'], 'CII41' );
ArmorItems.MailBarding.detail = "mail";
ArmorItems.MailBarding.splitDR = 2;  ArmorItems.MailBarding.splitPD = 1;
ArmorItems.MailBarding.description = "body armor only";
ArmorItems.PlatePeytral        = new Armor( 'peytral',                   40, 1000,  2,  6,  4,  6, ['skull','face','neck'], 'CII41' );
ArmorItems.PlatePeytral.detail = "plate";

for ( var e in ArmorItems ) {
    if( !ArmorItems[e].hasOwnProperty('key') ) ArmorItems[e].key = e;
}

/* Armor                                    'name',                      wt, cost, TL, LC, DR, PD, location*, */

Groups.ArmorGURPSLite = ['ClothArmorSuit','LeatherJacket','LightLeatherArmor','LeatherArmorSuit',
                         'ChainmailSuit','ScaleSuit','HalfPlate','LightPlate','HeavyPlate',
                         'LightKevlar','HeavyKevlar','LightBodyArmor','MediumBodyArmor','HeavyCombatArmor'];


/* Weapons                            'name',               weight,  cost, TL, LC, bulk, 'qualEffGp' [pole/axe|edged|mace/cr|bow|gun/bw], 'reference' */
Weapons = {};


// "natural" weapons
Weapons.fist            = new Weapon('fist',                     0,     0,  0,  6,    0, 'natural', '' );
Weapons.fist.wieldOptions         = { DX          : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C' } ],
                                      Boxing      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C', note: ['Boxing (CI132) improves punching damage only (Add ⅕ of your Boxing skill level (round down) to the damage you do.).'] } ],
                                      Brawling    : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ],
                                      Karate      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };
Weapons.foot            = new Weapon('foot',                     0,     0,  0,  6,    0, 'natural', '271' );
Weapons.foot.wieldOptions         = {'DX-2'       : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C,1' } ],
                                      Kicking     : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C,1', note: ['Kicking defaults to DX-2, Brawling-2, or Karate-2.  Use special damage rules from the base skill used for the Kicking technique.','Kicking skill must be added to character sheet to see correct Kicking skill level and Kicking parry.'] } ] };
Weapons.bluntclawedhand = new Weapon('claws (hand)',             0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.bluntclawedhand.detail = 'blunt';
Weapons.bluntclawedhand.wieldOptions={DX          : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type:  'cr' }, reach: 'C' } ],
                                    //  Boxing      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C', note: ['Boxing (CI132) improves punching damage only (Add ⅕ of your Boxing skill level (round down) to the damage you do.).'] } ],
                                      Brawling    : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type:  'cr' }, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ],
                                      Karate      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type:  'cr' }, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };
Weapons.bluntclawedfoot = new Weapon('claws (feet)',             0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.bluntclawedfoot.detail = 'blunt';
Weapons.bluntclawedfoot.wieldOptions={'DX-2'      : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  2, type:  'cr' }, reach: 'C,1' } ],
                                      Kicking     : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  2, type:  'cr' }, reach: 'C,1', note: ['Kicking defaults to DX-2, Brawling-2, or Karate-2.  Use special damage rules from the base skill used for the Kicking technique.','Kicking skill must be added to character sheet to see correct Kicking skill level and Kicking parry.'] } ] };
Weapons.sharpclawedhand = new Weapon('claws (hand)',             0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.sharpclawedhand.detail = 'sharp';
Weapons.sharpclawedhand.wieldOptions={DX          : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C' } ],
                                      Brawling    : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ],
                                      Karate      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };
Weapons.sharpclawedfoot = new Weapon('claws (feet)',             0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.sharpclawedfoot.detail = 'sharp';
Weapons.sharpclawedfoot.wieldOptions={'DX-2'      : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cut'}, reach: 'C,1' } ],
                                      Kicking     : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cut'}, reach: 'C,1', note: ['Kicking defaults to DX-2, Brawling-2, or Karate-2.  Use special damage rules from the base skill used for the Kicking technique.','Kicking skill must be added to character sheet to see correct Kicking skill level and Kicking parry.'] } ] };
Weapons.talonedhand     = new Weapon('talons (hand)',            0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.talonedhand.wieldOptions =  { DX          : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 'C' },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C' } ],
                                      Brawling    : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ],
                                      Karate      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };
Weapons.talonedfoot     = new Weapon('talons (feet)',            0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.talonedfoot.wieldOptions =  { DX          : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 'C,1' },
                                                      { title:'stabbing kick',  hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C,1' } ],
                                      Brawling    : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 'C,1', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] },
                                                      { title:'stabbing kick',  hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C,1', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ],
                                      Karate      : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 'C,1', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] },
                                                      { title:'stabbing kick',  hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C,1', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };
Weapons.longtalonedhand = new Weapon('talons (hand)',            0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.longtalonedhand.detail = 'long';
Weapons.longtalonedhand.wieldOptions={DX          : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'sw',  mods:  2, type:  'cut'}, reach: 'C' },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  2, type:  'imp'}, reach: 'C' } ],
                                      Brawling    : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'sw',  mods:  2, type:  'cut'}, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  2, type:  'imp'}, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ],
                                      Karate      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'sw',  mods:  2, type:  'cut'}, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  2, type:  'imp'}, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };
Weapons.longtalonedfoot = new Weapon('talons (feet)',            0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.longtalonedfoot.detail = 'long';
Weapons.longtalonedfoot.wieldOptions={DX          : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'sw',  mods:  2, type:  'cut'}, reach: 'C' },
                                                      { title:'stabbing kick',  hands: 'none', strength:  0, damage: { base: 'thr', mods:  2, type:  'imp'}, reach: 'C' } ],
                                      Brawling    : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'sw',  mods:  2, type:  'cut'}, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] },
                                                      { title:'stabbing kick',  hands: 'none', strength:  0, damage: { base: 'thr', mods:  2, type:  'imp'}, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ],
                                      Karate      : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'sw',  mods:  2, type:  'cut'}, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] },
                                                      { title:'stabbing kick',  hands: 'none', strength:  0, damage: { base: 'thr', mods:  2, type:  'imp'}, reach: 'C', note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };
// Teeth and fangs are described in Compendium I, on page 67, but they use a unique ST-damage table from Basic, pg 140.
// This is modeled using the new 'bite' damage type, implemented in the getWeaponObjectDamageStrings() method, in the gurps.js file.
Weapons.teeth           = new Weapon('teeth',                    0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.teeth.wieldOptions        = { DX          : [ { title:'bite',           hands: 'none', strength:  0, damage: { base:'bite', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Brawling    : [ { title:'bite',           hands: 'none', strength:  0, damage: { base:'bite', mods:  0, type:  'cr' }, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ] };
Weapons.sharpteeth      = new Weapon('teeth',                    0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.sharpteeth.detail = 'sharp';
Weapons.sharpteeth.wieldOptions   = { DX          : [ { title:'bite',           hands: 'none', strength:  0, damage: { base:'bite', mods:  0, type:  'cut'}, reach: 'C' } ],
                                      Brawling    : [ { title:'bite',           hands: 'none', strength:  0, damage: { base:'bite', mods:  0, type:  'cut'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };
Weapons.fangs           = new Weapon('fangs',                    0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.fangs.wieldOptions        = { DX          : [ { title:'bite',           hands: 'none', strength:  0, damage: { base:'bite', mods:  0, type:  'imp'}, reach: 'C' } ],
                                      Brawling    : [ { title:'bite',           hands: 'none', strength:  0, damage: { base:'bite', mods:  0, type:  'imp'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };
Weapons.crushingstriker = new Weapon('striker',                  0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.crushingstriker.detail = 'crushing';
Weapons.crushingstriker.wieldOptions={DX          : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Brawling    : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ] };
Weapons.clawedstriker   = new Weapon('striker',                  0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.clawedstriker.detail = 'clawed';
Weapons.clawedstriker.wieldOptions= { DX          : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  2, type:  'cr' }, reach: 'C' } ],
                                      Brawling    : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  2, type:  'cr' }, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ] };
Weapons.buttinghorns    = new Weapon('horns',                    0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.buttinghorns.detail = 'butting';
Weapons.buttinghorns.wieldOptions = { DX          : [ { title:'butt',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Brawling    : [ { title:'butt',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C', note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ] };
Weapons.longtusks       = new Weapon('tusks',                    0,     0,  0,  6,    0, 'natural', 'CI67' );
Weapons.longtusks.description = 'long';
Weapons.longtusks.wieldOptions   =  { DX          : [ { title:'slash',          hands: 'none', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 1 },
                                                      { title:'gore',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 1 } ],
                                      Brawling    : [ { title:'slash',          hands: 'none', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 1, note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] },
                                                      { title:'gore',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 1, note: ['Brawling (B50) increases all unarmed damage (Add 1/10 of your Brawling skill level (round down) to the damage you do.).'] } ],
                                      Karate      : [ { title:'slash',          hands: 'none', strength:  0, damage: { base: 'sw',  mods:  0, type:  'cut'}, reach: 1, note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] },
                                                      { title:'gore',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 1, note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };

// Axes/Maces
Weapons.Hatchet         = new Weapon('hatchet',                  2,    40,  0,  4,   -2, 'pole/axe', 'B206, B207');
Weapons.Hatchet.wieldOptions      = { AxeMace           : [ { title: 'chop',    hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' }, note: ["Throwable. 1 turn to ready."] } ],
                                      AxeThrowing       : [ { title: 'throw',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' }, accuracy: 1,       halfDamageRange: 1.5, maximumRange: 2.5, snapShot: 11, rangeBasedOnST: true } ] };
Weapons.Axe             = new Weapon('axe',                      4,    50,  0,  4,   -4, 'pole/axe', 'B206');
Weapons.Axe.wieldOptions          = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cut' }, note: ["1 turn to ready."] } ] };
Weapons.Axe.maxTL = 4;
Weapons.ThrowingAxe     = new Weapon('axe',                      4,    60,  1,  4,   -3, 'pole/axe', 'B206, B207');
Weapons.ThrowingAxe.detail = 'throwing';
Weapons.ThrowingAxe.maxTL = 4;
Weapons.ThrowingAxe.wieldOptions  = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cut' }, note: ["Throwable. 1 turn to ready."] } ],
                                      AxeThrowing       : [ { title: 'throw',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, accuracy: 2,       halfDamageRange:   1, maximumRange: 1.5, snapShot: 10, rangeBasedOnST: true } ] };
Weapons.GreatAxe        = new Weapon('great axe',                8,   100,  0,  4,   -5, 'pole/axe', 'B206');
Weapons.GreatAxe.maxTL = 4;
Weapons.GreatAxe.wieldOptions     = { TwoHandedAxeMace  : [ { title: '',        hands: 'both', strength: 13, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '1,2', note: ["1 turn to ready.","Becomes unready if used to parry.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
Weapons.SmallMace       = new Weapon('mace',                     3,    35,  3,  4,   -3,'mace/cr', 'B206');
Weapons.SmallMace.detail = 'small';
Weapons.SmallMace.wieldOptions    = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type:  'cr' }, note: ["1 turn to ready."] } ],
                                      AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type:  'cr' }, accuracy: 1,       halfDamageRange:   1, maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ] };
Weapons.Mace            = new Weapon('mace',                     5,    50,  3,  4,   -4, 'mace/cr', 'B206');
Weapons.Mace.maxTL = 4;
Weapons.Mace.wieldOptions         = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type:  'cr' }, note: ["1 turn to ready."] } ],
                                      AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type:  'cr' }, accuracy: 1,       halfDamageRange: 0.5, maximumRange:   1, snapShot: 12, rangeBasedOnST: true } ] };
Weapons.Pick            = new Weapon('pick',                     3,    70,  3,  4,   -4, 'pole/axe', 'B206');
Weapons.Pick.wieldOptions         = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'imp' }, note: ["1 turn to ready. May get <i>stuck</i>."] } ] };
Weapons.Warhammer       = new Weapon('warhammer',                7,   100,  0,  4,   -5, 'pole/axe', 'B206');
Weapons.Warhammer.wieldOptions    = { TwoHandedAxeMace  : [ { title: '',        hands: 'both', strength: 13, damage: { base: 'sw',  mods:  3, type: 'imp' }, reach: '1,2', note: ["1 turn to ready.","May get <i>stuck</i>.","Becomes unready if used to parry. Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
Weapons.Maul            = new Weapon('maul',                    12,    80,  0,  4,   -6, 'mace/cr', 'B206');
Weapons.Maul.maxTL = 4;
Weapons.Maul.wieldOptions         = { TwoHandedAxeMace  : [ { title: '',        hands: 'both', strength: 14, damage: { base: 'sw',  mods:  4, type:  'cr' }, reach: '1,2', note: ["1 turn to ready.","Becomes unready if used to parry.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
Weapons.Scythe          = new Weapon('scythe',                   5,    15,  1,  4,   -6, 'edged', 'B206');
Weapons.Scythe.notes = ["Becomes <i>unready</i> if used to parry."];
Weapons.Scythe.wieldOptions       = { TwoHandedAxeMace  : [ { title: 'swing',   hands: 'both', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cut' }, note: ["1 turn to ready."] },
                                                            { title: 'chop',    hands: 'both', strength:  6, damage: { base: 'sw',  mods:  0, type: 'imp' }, note: ["-2 to hit when impaling."] } ] };

// Swords
Weapons.Broadsword      = new Weapon('broadsword',               3,   500,  2,  4,   -5, 'edged', 'B206');
Weapons.Broadsword.maxTL = 5;
Weapons.Broadsword.wieldOptions   = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'cr'  }, note: ["Standard broadsword has <i>blunt</i> point."] } ] };
Weapons.ThrustingBroadsword=new Weapon('broadsword',             3,   600,  2,  4,   -5, 'edged', 'B206');
Weapons.ThrustingBroadsword.detail = 'thrusting';
Weapons.ThrustingBroadsword.notes = ["More expensive because of sharp point."]
Weapons.ThrustingBroadsword.wieldOptions = { Broadsword : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' } } ] };
Weapons.Bastardsword    = new Weapon('bastard sword',            5,   650,  2,  4,   -6, 'edged', 'B206, B207');
Weapons.Bastardsword.wieldOptions = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2', note: ["1 turn to ready after swing.","Becomes unready if used to parry."] },
                                                            { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'cr'  }, reach:     2, note: ["Becomes unready if used to parry.","Standard bastard sword has <i>blunt</i> point."] } ],
                                      TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2' },
                                                            { title: 'thrust',  hands: 'both', strength: 10, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach:     2, note: ["Standard bastard sword has <i>blunt</i> point."] } ] };
Weapons.ThrustingBastardsword=new Weapon('bastard sword',        5,   750,  2,  4,   -6, 'edged', 'B206, B207');
Weapons.ThrustingBastardsword.detail = 'thrusting';
Weapons.ThrustingBastardsword.notes = ["More expensive because of sharp point."];
Weapons.ThrustingBastardsword.wieldOptions={ Broadsword : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2', note: ["1 turn to ready after swing.","Becomes unready if used to parry."] },
                                                            { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  2, type: 'imp' }, reach:     2, note: ["Becomes unready if used to parry."] } ],
                                         TwoHandedSword : [ { title: 'swing',   hands: 'both', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2' },
                                                            { title: 'thrust',  hands: 'both', strength: 10, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:     2 } ] };
Weapons.Greatsword    = new Weapon('greatsword',                 7,   800,  2,  4,   -6, 'edged', 'B207');
Weapons.Greatsword.maxTL = 4;
Weapons.Greatsword.wieldOptions = { TwoHandedSword      : [ { title: 'swing',   hands: 'both', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '1,2' },
                                                            { title: 'thrust',  hands: 'both', strength: 12, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach:     2, note: ["Usually has <i>blunt</i> point."] } ] };
Weapons.ThrustingGreatsword=new Weapon('greatsword',             7,   900,  2,  4,   -6, 'edged', 'B207');
Weapons.ThrustingGreatsword.detail = 'thrusting';
Weapons.ThrustingGreatsword.notes = ["As greatsword, with thrusting point."];
Weapons.ThrustingGreatsword.wieldOptions={TwoHandedSword: [ { title: 'swing',   hands: 'both', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '1,2' },
                                                            { title: 'thrust',  hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:     2 } ] };
Weapons.Shortsword      = new Weapon('shortsword',               2,   400,  2,  4,   -4, 'edged', 'B206');
Weapons.Shortsword.maxTL = 5;
Weapons.Shortsword.wieldOptions   = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'imp' } } ] };
Weapons.Baton           = new Weapon('baton',                    1,    20,  0,  4,   -2, 'mace/cr', 'B206');
Weapons.Baton.notes = ["A short, well-balanced club."];
Weapons.Baton.wieldOptions        = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cr'  } },
                                                            { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'cr'  } } ],
                                      ShortStaff        : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cr'  } },    // Short Staff is in CI135
                                                            { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'cr'  } } ]};
Weapons.Smallsword      = new Weapon('smallsword',             1.5,   400,  4,  4,   -3, 'edged', "CII24");
Weapons.Smallsword.notes = ["Basic p206 version weighs 1 lb."];
Weapons.Smallsword.maxTL = 5;
Weapons.Smallsword.wieldOptions   = { Fencing           : [ { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'imp' }, maxDamage: '1d+1' } ] };
Weapons.Rapier          = new Weapon('rapier',                 1.5,   500,  4,  4,   -4, 'edged', 'B206');
Weapons.Rapier.maxTL = 5;
Weapons.Rapier.wieldOptions       = { Fencing           : [ { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2', maxDamage: '1d+1' } ] };
Weapons.Saber           = new Weapon('saber',                    2,   700,  4,  4,   -4, 'edged', 'B206');
Weapons.Saber.maxTL = 5;
Weapons.Saber.wieldOptions        = { Fencing           : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' } },
       /* saber is pretty different between e3 and e4 */    { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' }, maxDamage: '1d+2' } ] };
Weapons.Forcesword      = new Weapon('force sword',              2,  3000, 11,  4,   -2, '');
Weapons.Forcesword.wieldOptions   = { ForceSword        : [ { title: 'swing',   hands:  'dom', strength:  6, damage: { base: 8,  mods:  0, type: 'cut' }, reach: 1, note: ["It takes one turn to activate it, one further turn for the blade to form and stabilize. It runs for 5 minutes on a $100 C power cell (p. 119)."] },
                                                            { title: 'thrust',  hands:  'dom', strength:  6, damage: { base: 4,  mods:  0, type: 'imp' }, reach: 1, note: ["It takes one turn to activate it, one further turn for the blade to form and stabilize. It runs for 5 minutes on a $100 C power cell (p. 119)."] } ] };

// Flails
Weapons.Morningstar     = new Weapon('morningstar',              6,    80,  3,  4,   -4, 'mace/cr', 'B206');
Weapons.Morningstar.maxTL = 4;
Weapons.Morningstar.wieldOptions  = { Flail             : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type:  'cr' }, note: ["1 turn to ready.","Becomes unready if used to parry.","Any attempt to <i>parry</i> a flail weapon is at a -4. Fencing weapons cannot parry flails."] } ] };
Weapons.Flail           = new Weapon('flail',                    8,   100,  3,  4,   -4, 'mace/cr', 'B206');
Weapons.Flail.maxTL = 4;
Weapons.Flail.wieldOptions        = { Flail             : [ { title: '',        hands: 'both', strength: 13, damage: { base: 'sw',  mods:  4, type:  'cr' }, reach: '1,2', note: ["2-handed.","1 turn to ready.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry.","Any attempt to <i>parry</i> a flail weapon is at a -4. Fencing weapons cannot parry flails."] } ] };

// Knives               /* Weapons with ranges expressed as "ST+adds" are very rare, and only 3e.  Knives, and the Net. */
Weapons.KnifeLarge      = new Weapon('knife',                    1,   40,  0,  4,   -2, 'edged', 'B206, B207');
Weapons.KnifeLarge.detail = 'large';
Weapons.KnifeLarge.notes = ["Throwable."]
Weapons.KnifeLarge.wieldOptions   = { Knife             : [ { title: 'swing',   hands:  'dom', strength:  6, damage: { base: 'sw',  mods: -2, type: 'cut' }, maxDamage: '1d+2', reach: 'C,1', parryBonus: -1 },
                                                            { title: 'thrust',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', reach: 'C',   parryBonus: -1 } ],
                                      MainGauche        : [ { title: 'swing',   hands:  'off', strength:  6, damage: { base: 'sw',  mods: -2, type: 'cut' }, maxDamage: '1d+2', reach: 'C,1',                 note: ["Parry is ⅔ Main-Gauche skill."] },
                                                            { title: 'thrust',  hands:  'off', strength:  6, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', reach: 'C',                   note: ["Parry is ⅔ Main-Gauche skill."] } ],
                                      KnifeThrowing     : [ { title: 'throw',   hands:  'dom', strength:  6, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', halfDamageRange: -2,  maximumRange: 5,   snapShot: 12, rangeBasedOnST: 'add' } ] };
Weapons.KnifeSmall      = new Weapon('knife',                  0.5,   30,  0,  4,   -1, 'edged', 'B206, B207');
Weapons.KnifeSmall.detail = 'small';
Weapons.KnifeSmall.notes = ["Throwable."]
Weapons.KnifeSmall.wieldOptions   = { Knife             : [ { title: 'swing',   hands:  'dom', strength:  5, damage: { base: 'sw',  mods: -3, type: 'cut' }, maxDamage: '1d+1', reach: 'C,1', parryBonus: -1 },
                                                            { title: 'thrust',  hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',   parryBonus: -1 } ],
                                      MainGauche        : [ { title: 'swing',   hands:  'off', strength:  5, damage: { base: 'sw',  mods: -3, type: 'cut' }, maxDamage: '1d+1', reach: 'C,1',                 note: ["Parry is ⅔ Main-Gauche skill."] },
                                                            { title: 'thrust',  hands:  'off', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',                   note: ["Parry is ⅔ Main-Gauche skill."] } ],
                                      KnifeThrowing     : [ { title: 'throw',   hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', halfDamageRange: -5,  maximumRange: 0,   snapShot: 11, rangeBasedOnST: 'add' } ] };
Weapons.Dagger          = new Weapon('dagger',                0.25,    20,  0,  4,   -1, 'edged', 'B206, B207');
Weapons.Dagger.notes = ["Throwable."];
Weapons.Dagger.wieldOptions       = { Knife             : [ { title: 'thrust',  hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d',   reach: 'C',   parryBonus: -1 } ],
                                      MainGauche        : [ { title: 'thrust',  hands:  'off', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d',   reach: 'C',                   note: ["Parry is ⅔ Main-Gauche skill."] } ],
                                      KnifeThrowing     : [ { title: 'throw',   hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d',   halfDamageRange: -5,  maximumRange: 0,   snapShot: 12, rangeBasedOnST: 'add' } ] };

// Polearms
Weapons.Javelin         = new Weapon('javelin',                  2,    30,  1,  4,   -4, 'pole/axe', 'B206-7');
Weapons.Javelin.maxTL = 3;
Weapons.Javelin.wieldOptions      = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'imp' }, note: ["Primarily for throwing."] } ],
                                      SpearThrowing     : [ { title: 'throw',   hands:  'dom', strength:  6, damage: { base: 'thr', mods:  1, type: 'imp' }, accuracy: 3,       halfDamageRange: 1.5, maximumRange: 2.5, snapShot: 10, rangeBasedOnST: true } ],
                                      SpearThrower      : [ { title: 'thrower', hands:  'dom', strength:  6, damage: { base: 'sw',  mods:  1, type: 'imp' }, accuracy: 3,       halfDamageRange: 2,   maximumRange: 3,   snapShot: 10, rangeBasedOnST: true } ] };
Weapons.Spear           = new Weapon('spear',                    4,    40,  0,  4,   -6, 'pole/axe', 'B206, B207');
Weapons.Spear.maxTL = 3;
Weapons.Spear.wieldOptions        = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '1',   note: ["Used 1-handed.","Throwable.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                                            { title: '2 hands', hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1,2', note: ["Same spear used 2-handed.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ],
                                      SpearThrowing     : [ { title: 'thrown',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, accuracy: 2,       halfDamageRange: 1,   maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ],
                                      SpearThrower      : [ { title: 'thrower', hands:  'dom', strength:  9, damage: { base: 'sw',  mods:  3, type: 'imp' }, accuracy: 2,       halfDamageRange: 1.5, maximumRange: 2,   snapShot: 12, rangeBasedOnST: true } ] };
Weapons.Glaive          = new Weapon('glaive',                   8,   100,  1,  3,   -8, 'pole/axe', 'B206');
Weapons.Glaive.maxTL = 5;
Weapons.Glaive.wieldOptions       = { Polearm           : [ { title:'swing',    hands: 'both', strength: 11, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '2,3', note: ["2 turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry."] },
                                                            { title:'thrust',   hands: 'both', strength: 11, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1-3', note: ["1 turn to ready after thrust.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry."] } ] };
Weapons.Poleaxe         = new Weapon('poleaxe',                 12,   150,  3,  3,   -8, 'pole/axe', 'B206');
Weapons.Poleaxe.maxTL = 5;
Weapons.Poleaxe.wieldOptions      = { Polearm     : [ { title:'crushing swing', hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cr'  }, reach: '2,3', note: ["2 turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry."] },
                                                      { title:'cutting swing',  hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cut' }, reach: '2,3', note: ["2 turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry."] } ] };
Weapons.Halberd         = new Weapon('halberd',                 12,   150,  3,  3,   -8, 'pole/axe', 'B206');
Weapons.Halberd.maxTL = 5;
Weapons.Halberd.wieldOptions      = { Polearm           : [ { title:'ax sw',    hands: 'both', strength: 13, damage: { base: 'sw',  mods:  5, type: 'cut' }, reach: '2,3', note: ["2 turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry."] },
                                                            { title:'imp sw',   hands: 'both', strength: 13, damage: { base: 'sw',  mods:  4, type: 'imp' }, reach: '2,3', note: ["2 turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry.","May get <i>stuck</i>."] },
                                                            { title:'thrust',   hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1-3', note: ["1 turn to ready after thrust.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry."] } ] };
Weapons.Lance           = new Weapon('lance',                    6,    60,  3,  3,  -10, 'pole/axe', 'B206');
Weapons.Lance.wieldOptions        = { Lance             : [ { title:'',         hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:   4,   note: ["May not parry. See B135 for readying."] } ] };

// Staff
Weapons.Quarterstaff    = new Weapon('quarterstaff',             4,    10,  0,  4,   -8, 'mace/cr', 'B206, B207');
Weapons.Quarterstaff.wieldOptions = { StaffSkill        : [ { title: 'swing',   hands: 'both', strength:  6, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', note: ["Parry is ⅔ Staff skill."] },
                                                            { title: 'thrust',  hands: 'both', strength:  6, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', note: ["Parry is ⅔ Staff skill."] } ],
                                      TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', note: ["Using sword technique with staff."] },
                                                            { title: 'thrust',  hands: 'both', strength:  9, damage: { base: 'thr', mods:  1, type: 'cr'  }, reach:   2,   note: ["Using sword technique with staff."] } ] };
Weapons.LightClub       = new Weapon('club',                     3,    10,  0,  4,   -3, 'mace/cr', 'B206');
Weapons.LightClub.detail = 'light';
Weapons.LightClub.wieldOptions    = { Broadsword        : [ { title: '',        hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cr'  }, reach:   1 } ] };

// Special weapons
Weapons.Whip            = new Weapon('whip',                     2,    20,  1,  4,    0, '', 'B207');
Weapons.Whip.wieldOptions         = { Whip              : [ { title:  '',       hands: 'dom',  strength: 10, damage: { base: 'sw',  mods: -2, type: 'cr'  }, reach: '1/yd', maxDamage: '1d-1', note: ['Specify length and adjust stats accordingly.','Requires yds-1 (min 0, max 2) turns to ready.','Parry is ⅓ of Whip skill.'] } ] };
Weapons.Bolas           = new Weapon('bolas',                    2,    20,  1,  4,   -2, '', 'B207');
Weapons.Bolas.wieldOptions        = { Bolas             : [ { title:  '',       hands: 'dom',  strength:  0, damage: { base: 'thr', mods: -1, type: 'spcl'}, halfDamageRange:   u, maximumRange:   3,  snapShot: 12,              rangeBasedOnST: true, note: ['See B49.'] } ] };
Weapons.Blowpipe        = new Weapon('blowpipe',                 1,    30,  0,  4,   -6, '', 'B207');
Weapons.Blowpipe.wieldOptions     = { Blowpipe          : [ { title:  '',       hands: 'both', strength:  0, damage: { base:    u,  mods:  0, type: u     }, halfDamageRange:   u, maximumRange:   4,  snapShot: 10, accuracy: 1, rangeBasedOnST: true, note: ['See p.49'] } ] };
Weapons.Blowpipe.shots = 1;
// Lasso B207
Weapons.Blackjack       = new Weapon('blackjack',                1,    20,  0,  4,    0, '', 'B206');
Weapons.Blackjack.wieldOptions    = { Blackjack         : [ { title:  '',       hands: 'dom',  strength:  7, damage: { base: 'thr', mods:  0, type: 'cr'  }, reach: 'C',   note: ["May not parry."] } ] };
// Large Net B207
// Melee Net B207
Weapons.SapGloves       = new Weapon('sap gloves',               1,    50,  7,  4,  '-',  'other', 'CII46' );
Weapons.SapGloves.PD = 2; Weapons.SapGloves.DR = 4; Weapons.SapGloves.location = ['domHand','offHand']; // armor for hands
Weapons.SapGloves.wieldOptions    = { DX                : [ { title:'punch',    hands: 'dom',  strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Boxing            : [ { title:'punch',    hands: 'dom',  strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Brawling          : [ { title:'punch',    hands: 'dom',  strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Karate            : [ { title:'punch',    hands: 'dom',  strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ] };

// slings, bows, and crossbows - should have RoF=1, readyTurns=2 (4 for a crossbow)
// see Reloading Time, B3e pg 96s
Weapons.Sling           = new Weapon('sling',                  0.5,    10,  0,  4,    0, '', 'B207');
Weapons.Sling.wieldOptions        = { Sling             : [ { title:  '',       hands: 'dom',  strength:  0, damage: { base: 'sw',  mods:  0, type: 'cr'  }, halfDamageRange:   6, maximumRange:  10,  snapShot: 12,              rangeBasedOnST: true, note: ['Fires rocks'] } ] };
Weapons.StaffSling      = new Weapon('sling',                    2,    20,  1,  4,   -6, '', 'B207');
Weapons.StaffSling.detail = 'staff';
Weapons.StaffSling.wieldOptions   = { Sling             : [ { title:  '',       hands: 'dom',  strength:  0, damage: { base: 'sw',  mods:  1, type: 'cr'  }, halfDamageRange:  10, maximumRange:  15,  snapShot: 14, accuracy: 1, rangeBasedOnST: true, note: ['Fires rocks'] } ] };
Weapons.StaffSling.maxTL = 4;
Weapons.StaffSling.shots = 1;
Weapons.StaffSling.reload = 2;
Weapons.ShortBow        = new Weapon('bow',                      2,    50,  0,  4,   -6, 'bow', 'B207');
Weapons.ShortBow.detail = 'short';
Weapons.ShortBow.wieldOptions     = { Bow               : [ { title:  '',       hands: 'both', strength:  7, damage: { base: 'thr', mods:  0, type: 'imp' }, halfDamageRange:  10, maximumRange:  15,  snapShot: 12, accuracy: 1, rangeBasedOnST: true, maxDamage: '1d+3' } ] };
Weapons.ShortBow.weaponST = true;
Weapons.ShortBow.shots = 1;
Weapons.Bow             = new Weapon('bow',                      2,   100,  0,  4,   -7, 'bow', 'B207');
Weapons.Bow.wieldOptions          = { Bow               : [ { title:  '',       hands: 'both', strength: 10, damage: { base: 'thr', mods:  1, type: 'imp' }, halfDamageRange:  15, maximumRange:  20,  snapShot: 13, accuracy: 2, rangeBasedOnST: true, maxDamage: '1d+4' } ] };
Weapons.Bow.weaponST = true;
Weapons.Bow.shots = 1;
Weapons.Longbow         = new Weapon('longbow',                  3,   200,  0,  4,   -8, 'bow', 'B207');
Weapons.Longbow.maxTL = 5;
Weapons.Longbow.wieldOptions      = { Bow               : [ { title:  '',       hands: 'both', strength: 11, damage: { base: 'thr', mods:  2, type: 'imp' }, halfDamageRange:  15, maximumRange:  20,  snapShot: 15, accuracy: 3, rangeBasedOnST: true, maxDamage: '1d+4' } ] };
Weapons.Longbow.weaponST = true;
Weapons.Longbow.shots = 1;
Weapons.CompositeBow    = new Weapon('bow',                      4,   900,  1,  4,   -7, 'bow', 'B207');
Weapons.CompositeBow.detail = 'composite';
Weapons.CompositeBow.wieldOptions = { Bow               : [ { title:  '',       hands: 'both', strength: 10, damage: { base: 'thr', mods:  3, type: 'imp' }, halfDamageRange:  20, maximumRange:  25,  snapShot: 14, accuracy: 3, rangeBasedOnST: true, maxDamage: '1d+4' } ] };
Weapons.CompositeBow.weaponST = true;
Weapons.CompositeBow.shots = 1;
Weapons.Crossbow        = new Weapon('crossbow',                 6,   150,  2,  4,   -6, 'bow', 'B207');
Weapons.Crossbow.maxTL = 5;
Weapons.Crossbow.wieldOptions     = { Crossbow          : [ { title:  '',       hands: 'both', strength:  7, damage: { base: 'thr', mods:  4, type: 'imp' }, halfDamageRange:  20, maximumRange:  25,  snapShot: 12, accuracy: 4, rangeBasedOnST: true, maxDamage: '3d' } ] };
Weapons.Crossbow.weaponST = true;
Weapons.Crossbow.shots = 1;
Weapons.Prodd           = new Weapon('prodd',                    6,   150,  2,  4,   -6, 'bow', 'B207');
Weapons.Prodd.maxTL = 4;
Weapons.Prodd.wieldOptions        = { Crossbow          : [ { title:  '',       hands: 'both', strength:  7, damage: { base: 'thr', mods:  4, type: 'cr'  }, halfDamageRange:  20, maximumRange:  25,  snapShot: 12, accuracy: 2, rangeBasedOnST: true, note: ["Fires lead pellets."] } ] };
Weapons.Prodd.weaponST = true;
Weapons.Prodd.shots = 1;
Weapons.OilFlask        = new Weapon("oil flask",                1,    50,  2,  4,    0, '', 'B207');
Weapons.OilFlask.wieldOptions     = { Throwing          : [ { title:  '',       hands:  'dom', strength:  0, damage: { base:    '', mods:  0, type:'fire' }, halfDamageRange:   u, maximumRange: 3.5,  snapShot: 13, rangeBasedOnST: true } ] };

// Guns
Weapons.Revolver38      = new Weapon('revolver',                 2,   400,  6,  3,   -2, 'gun/bw');
Weapons.Revolver38.detail = '.38';
Weapons.Revolver38.wieldOptions   = { Guns6_Revolver    : [ { title: '',        hands:  'dom', strength:  8, damage: { base: 2,     mods: -1, type: 'cr'  }, halfDamageRange: 120, maximumRange: 1500, snapShot: 10, accuracy: 2, rateOfFire: '3~',  recoil: -2 } ] };
Weapons.Revolver38.shots = 6;
Weapons.Thompson45ACP   = new Weapon('Thompson .45 ACP',        12,   120,  6,  3,   -5, 'gun/bw');
Weapons.Thompson45ACP.wieldOptions= { Guns              : [ { title:  '',       hands: 'both', strength: 11, damage: { base: 2,     mods:  1, type:  'cr' }, halfDamageRange: 190, maximumRange: 1750, snapShot: 11, accuracy: 7, rateOfFire: '20*', recoil: -3 } ] }; // see B209
Weapons.Thompson45ACP.shots = 30;
// Weapons.Beretta92       = new Weapon('Berretta 92, 9mm',       2.5,   400,  7,  3,   -3, 'gun/bw');
// Weapons.Beretta92.wieldOptions    = { Guns              : [ { title:  '',       hands:  'dom', strength:  9, damage: { base: 2,     mods:  2, type:  'cr' }, halfDamageRange: 150, maximumRange: 1867, snapShot: 10, accuracy: 3, rateOfFire: '3~',  recoil: -1 } ] }; // see B208
// Weapons.Beretta92.shots = 15;
// Weapons.AMTBackup       = new Weapon('AMT Backup, 9mm',          1,   180,  7,  3,   -1, 'gun/bw');
// Weapons.AMTBackup.wieldOptions    = { Guns              : [ { title:  '',       hands:  'dom', strength:  9, damage: { base: 2,     mods:  0, type:  'cr' }, halfDamageRange: 125, maximumRange: 1467, snapShot: 11, accuracy: 0, rateOfFire: '3~',  recoil: -2 } ] }; // see B208
// Weapons.AMTBackup.shots = 5;
Weapons.AK47            = new Weapon('AK-47 7.62mm',          10.5,   290,  7,  3,   -5, 'gun/bw');
Weapons.AK47.wieldOptions         = { Guns              : [ { title:  '',       hands: 'both', strength: 10, damage: { base: 5,     mods:  1, type:  'cr' }, halfDamageRange: 400, maximumRange: 3011, snapShot: 12, accuracy: 7, rateOfFire: '10*', recoil: -1 } ] }; // see B209
Weapons.AK47.shots = 30;
Weapons.Revolver44M     = new Weapon('revolver',              3.25,   100,  7,  3,   -3, 'gun/bw');
Weapons.Revolver44M.detail = '.44M';
Weapons.Revolver44M.wieldOptions    = { Guns7_Revolver  : [ { strength: 11, damage: { base: 3, mods: 0, type: 'cr' }, halfDamageRange: 200, maximumRange: 2500, snapShot: 10, accuracy: 2, rateOfFire: 3,  recoil: 4 } ] };
Weapons.Revolver44M.shots = 6;
Weapons.Revolver44M.reload = '3i';

// Beam Weapons
Weapons.LaserPistol     = new Weapon('pistol',                   2,  1000,  8,  3,   -2, 'gun/bw', 'B208');
Weapons.LaserPistol.detail = 'laser';
Weapons.LaserPistol.wieldOptions = { BeamWeapons_Pistol        : [ { title: '',        hands:  'dom', strength:  0, damage: { base: 1,     mods:  0, type: 'imp' }, halfDamageRange: 400, maximumRange:  500, snapShot:  9, accuracy: 7, rateOfFire: '4*',  recoil:  0 } ] }; // see B208
Weapons.LaserPistol.shots = 20;
// LaserPistol duplicated below
Weapons.BlasterPistol   = new Weapon('pistol',                   2,  2000,  9,  3,   -2, 'gun/bw', 'B208');
Weapons.BlasterPistol.detail = 'blaster';
Weapons.BlasterPistol.wieldOptions = { BeamWeapons_Pistol      : [ { title: '',        hands:  'dom', strength:  0, damage: { base: 6,     mods:  0, type: 'imp' }, halfDamageRange: '-', maximumRange:  300, snapShot: 10, accuracy: 6, rateOfFire: '3~',  recoil: -1 } ] }; // see B208
Weapons.BlasterPistol.shots = 20;

// grenades, etc.
Weapons.USMk2DefGrenade = new Weapon('grenade',                0.5,     u,  6,  0,   -2,  u, 'B209');
Weapons.USMk2DefGrenade.detail = 'US Mk 2 defensive';
Weapons.USMk2DefGrenade.wieldOptions={ Throwing                : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 2,     mods: -1, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 3-5 sec'] } ] };
Weapons.USMk67DefGrenade = new Weapon('grenade',                 1,     u,  7,  0,   -2,  u, 'B209');
Weapons.USMk67DefGrenade.detail = 'US Mk 67 defensive';
Weapons.USMk67DefGrenade.wieldOptions={ Throwing               : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 5,     mods:  2, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 4-5 sec'] } ] };
Weapons.USMk68DefGrenade = new Weapon('grenade',                 1,     u,  7,  0,   -2,  u, 'B209');
Weapons.USMk68DefGrenade.detail = 'US Mk 68 defensive';
Weapons.USMk68DefGrenade.wieldOptions={ Throwing               : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 5,     mods:  2, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: impact'] } ] };
Weapons.USANM8SmokeGrenade = new Weapon('grenade',             0.5,     u,  7,  0,   -2,  u, 'B209');
Weapons.USANM8SmokeGrenade.detail = 'US AN-M8 smoke';
Weapons.USANM8SmokeGrenade.wieldOptions={ Throwing             : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: u,     mods:  u, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 1-2 sec'] } ] };
Weapons.USM59OfnsGrenade = new Weapon('grenade',               0.5,     u,  7,  0,   -2,  u, 'B209');
Weapons.USM59OfnsGrenade.detail = 'US M59 offensive';
Weapons.USM59OfnsGrenade.wieldOptions={ Throwing               : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 5,     mods:  2, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: impact'] } ] };
Weapons.UKNo36DefGrenade = new Weapon('grenade',               0.5,     u,  6,  0,   -2,  u, 'B209');
Weapons.UKNo36DefGrenade.detail = 'UK No. 36 defensive';
Weapons.UKNo36DefGrenade.wieldOptions={ Throwing               : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 2,     mods: -1, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 3-5 sec'] } ] };
Weapons.UKjamtinGrenade = new Weapon('grenade',                0.5,     u,  6,  0,   -2,  u, 'B209');
Weapons.UKjamtinGrenade.detail = "UK 'jam tin'";
Weapons.UKjamtinGrenade.wieldOptions={ Throwing                : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 5,     mods:  0, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 0-8 sec'] } ] };
Weapons.GEpotatomasherGrenade = new Weapon('grenade',          0.3,     u,  6,  0,   -2,  u, 'B209');
Weapons.GEpotatomasherGrenade.detail = "GE 'potato masher'";
Weapons.GEpotatomasherGrenade.wieldOptions={ Throwing          : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 2,     mods: -2, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 2-4 sec'] } ] };
Weapons.USSRRGD5DefGrenade = new Weapon('grenade',             0.6,     u,  7,  0,   -2,  u, 'B209');
Weapons.USSRRGD5DefGrenade.detail = 'USSR RGD-5 defensive';
Weapons.USSRRGD5DefGrenade.wieldOptions={ Throwing             : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 3,     mods: -1, type:  'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 3-4 sec'] } ] };

// generated by perl script from TSV file made (mostly by hand) from PDF
Weapons.Mauser96        = new Weapon('Mauser ’96',             2.75,   20,  6,  3,    u, 'gun/bw', 'B208');
Weapons.Mauser96.wieldOptions     = { Guns6_Pistol                 : [ { strength: 10, hands:  'dom', damage: { base: 2, mods:  1, type: 'cr' }, halfDamageRange:  140, maximumRange: 1800, snapShot: 11, accuracy:  3, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.Mauser96.shots = 10;
Weapons.MsrLuger        = new Weapon('Mauser Luger',              2,   25,  6,  3,    u, 'gun/bw', 'B208');
Weapons.MsrLuger.maxTL = 7;
Weapons.MsrLuger.wieldOptions     = { Guns6_Pistol                 : [ { strength:  9, hands:  'dom', damage: { base: 2, mods:  2, type: 'cr' }, halfDamageRange:  175, maximumRange: 1900, snapShot:  8, accuracy:  4, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.MsrLuger.shots = 8;
Weapons.CM191145ACP     = new Weapon('CM1911..45 ACP',         2.75,   30,  6,  3,    u, 'gun/bw', 'B208');
Weapons.CM191145ACP.wieldOptions  = { Guns6_Pistol                 : [ { strength: 10, hands:  'dom', damage: { base: 2, mods:  0, type: 'cr' }, halfDamageRange:  175, maximumRange: 1700, snapShot: 10, accuracy:  2, rateOfFire: '3~',  recoil: -2 } ] };
Weapons.CM191145ACP.shots = 7;
Weapons.WltrPPK         = new Weapon('Walther PPK',            1.25,   75,  6,  3,    u, 'gun/bw', 'B208');
Weapons.WltrPPK.wieldOptions      = { Guns6_Pistol                 : [ { strength:  8, hands:  'dom', damage: { base: 2, mods: -1, type: 'cr' }, halfDamageRange:  100, maximumRange: 1467, snapShot: 10, accuracy:  2, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.WltrPPK.shots = 7;
Weapons.FNHP35          = new Weapon('FNHP35',                  2.5,   80,  6,  3,    u, 'gun/bw', 'B208');
Weapons.FNHP35.wieldOptions       = { Guns6_Pistol                 : [ { strength:  9, hands:  'dom', damage: { base: 2, mods:  2, type: 'cr' }, halfDamageRange:  150, maximumRange: 1867, snapShot: 10, accuracy:  3, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.FNHP35.shots = 13;
Weapons.RugerSTD        = new Weapon('Ruger STD',               2.5,   25,  6,  3,    u, 'gun/bw', 'B208');
Weapons.RugerSTD.wieldOptions     = { Guns6_Pistol                 : [ { strength:  7, hands:  'dom', damage: { base: 1, mods:  1, type: 'cr' }, halfDamageRange:   75, maximumRange: 1200, snapShot:  9, accuracy:  4, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.RugerSTD.shots = 9;
Weapons.AMTBackup       = new Weapon('AMT backup',                1,  180,  7,  3,    u, 'gun/bw', 'B208');
Weapons.AMTBackup.wieldOptions    = { Guns7_Pistol                 : [ { strength:  8, hands:  'dom', damage: { base: 2, mods:  0, type: 'cr' }, halfDamageRange:  125, maximumRange: 1467, snapShot: 11, accuracy:  0, rateOfFire: '3~',  recoil: -2 } ] };
Weapons.AMTBackup.shots = 5;
Weapons.Beretta92       = new Weapon('Beretta 92',              2.5,  400,  7,  3,    u, 'gun/bw', 'B208');
Weapons.Beretta92.wieldOptions    = { Guns7_Pistol                 : [ { strength:  9, hands:  'dom', damage: { base: 2, mods:  2, type: 'cr' }, halfDamageRange:  150, maximumRange: 1867, snapShot: 10, accuracy:  3, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.Beretta92.shots = 15;
Weapons.Glock17         = new Weapon('Glock 17',                  2,  450,  7,  3,    u, 'gun/bw', 'B208');
Weapons.Glock17.wieldOptions      = { Guns7_Pistol                 : [ { strength:  9, hands:  'dom', damage: { base: 2, mods:  2, type: 'cr' }, halfDamageRange:  150, maximumRange: 1867, snapShot: 10, accuracy:  3, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.Glock17.shots = 17;
Weapons.IMIEagle        = new Weapon('IMI Eagle',               4.5,  750,  7,  3,   -3, 'gun/bw', 'B208');
Weapons.IMIEagle.wieldOptions     = { Guns7_Pistol                 : [ { strength: 12, hands:  'dom', damage: { base: 3, mods:  0, type: 'cr' }, halfDamageRange:  230, maximumRange: 2500, snapShot: 12, accuracy:  3, rateOfFire: '3~',  recoil: -3 } ] };
Weapons.IMIEagle.shots = 9;
Weapons.Needler         = new Weapon('needler',                   1,  800,  8,  3,    u, 'gun/bw', 'B208');
Weapons.Needler.wieldOptions      = { Guns8_Pistol                 : [ { strength:  u, hands:  'dom', damage: { base: 1, mods:  2, type: 'imp'}, halfDamageRange:  100, maximumRange:  300, snapShot:  9, accuracy:  1, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.Needler.shots = 100;
Weapons.GaussNeedler    = new Weapon('Gauss needler',           1.5, 2000,  8,  3,    u, 'gun/bw', 'B208');
Weapons.GaussNeedler.wieldOptions = { Guns8_Pistol                 : [ { strength:  u, hands:  'dom', damage: { base: 1, mods:  2, type: 'imp'}, halfDamageRange:  100, maximumRange:  300, snapShot: 10, accuracy:  4, rateOfFire: '12',  recoil: -1 } ] };
Weapons.GaussNeedler.shots = '100/B';
Weapons.LaserPistol     = new Weapon('pistol',                    2, 1000,  8,  3,   -2, 'gun/bw', 'B208');
Weapons.LaserPistol.detail = 'laser';
Weapons.LaserPistol.wieldOptions  = { BeamWeapons8_Pistol          : [ { strength:  u, hands:  'dom', damage: { base: 1, mods:  0, type: 'imp'}, halfDamageRange:  400, maximumRange:  500, snapShot:  9, accuracy:  7, rateOfFire: '3~',  recoil: 0 } ] };
Weapons.LaserPistol.shots = '20/C';
Weapons.Stunner         = new Weapon('stunner',                   1,  800,  9,  6,    u, 'gun/bw', 'B208');
Weapons.Stunner.wieldOptions      = { BeamWeapons9_Pistol          : [ { strength:  u, hands:  'dom', damage: { base: u, mods:  0, type:'stun'}, halfDamageRange:   12, maximumRange:   20, snapShot: 10, accuracy:  3, rateOfFire: '3~',  recoil: 0 } ] };
Weapons.Stunner.shots = '40/C';
Weapons.Blaster         = new Weapon('blaster',                   2, 2000,  9,  3,    u, 'gun/bw', 'B208');
Weapons.Blaster.wieldOptions      = { BeamWeapons9_Pistol          : [ { strength:  8, hands:  'dom', damage: { base: 2, mods:  6, type: 'imp'},                        maximumRange:  300, snapShot: 10, accuracy:  6, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.Blaster.shots = '20/C';
Weapons.ColtTexas       = new Weapon('Colt Texas',                4,   10,  5,  3,    u, 'gun/bw', 'B208');
Weapons.ColtTexas.wieldOptions    = { BlackPowderWeapons_Revolver  : [ { strength: 10, hands:  'dom', damage: { base: 2, mods: -1, type: 'cr' }, halfDamageRange:  100, maximumRange: 1100, snapShot: 10, accuracy:  1, rateOfFire:  '1',  recoil: -1 } ] };
Weapons.ColtTexas.shots = 5;
Weapons.SWRussian       = new Weapon('S&W Russian',             2.5,   20,  5,  3,    u, 'gun/bw', 'B208');
Weapons.SWRussian.wieldOptions    = { Guns5_Revolver               : [ { strength: 10, hands:  'dom', damage: { base: 2, mods:  0, type: 'cr' }, halfDamageRange:  150, maximumRange: 1700, snapShot: 10, accuracy:  3, rateOfFire:  '1',  recoil: -2 } ] };
Weapons.SWRussian.shots = 6;
Weapons.WNol455W        = new Weapon('W Nol,.455W',               3,   40,  5,  3,    u, 'gun/bw', 'B208');
Weapons.WNol455W.wieldOptions     = { Guns5_Revolver               : [ { strength: 11, hands:  'dom', damage: { base: 2, mods:  0, type: 'cr' }, halfDamageRange:  160, maximumRange: 1600, snapShot: 11, accuracy:  2, rateOfFire: '3~',  recoil: -3 } ] };
Weapons.WNol455W.shots = 6;
// SWM10 = Revolver38
Weapons.SWM10           = new Weapon('S&W M10',                   2,   20,  6,  3,    u, 'gun/bw', 'B208');
Weapons.SWM10.wieldOptions        = { Guns6_Revolver               : [ { strength:  8, hands:  'dom', damage: { base: 2, mods: -1, type: 'cr' }, halfDamageRange:  120, maximumRange: 1934, snapShot: 10, accuracy:  2, rateOfFire: '3~',  recoil: -1 } ] };
Weapons.SWM10.shots = 6;
Weapons.ColtPython      = new Weapon('Colt Python',               3,  100,  7,  3,    u, 'gun/bw', 'B208');
Weapons.ColtPython.wieldOptions   = { Guns7_Revolver               : [ { strength: 10, hands:  'dom', damage: { base: 3, mods: -1, type: 'cr' }, halfDamageRange:  185, maximumRange: 2034, snapShot: 10, accuracy:  3, rateOfFire: '3~',  recoil: -2 } ] };
Weapons.ColtPython.shots = 6;
// SWM29 = Revolver44M 
Weapons.SWM29           = new Weapon('S&W M29',                3.25,  100,  7,  3,    u, 'gun/bw', 'B208');
Weapons.SWM29.wieldOptions        = { Guns7_Revolver               : [ { strength: 11, hands:  'dom', damage: { base: 3, mods:  0, type: 'cr' }, halfDamageRange:  200, maximumRange: 2500, snapShot: 10, accuracy:  2, rateOfFire: '3~',  recoil: -3 } ] };
Weapons.SWM29.shots = 6;
Weapons.WheellockPistol = new Weapon('pistol',                 3.25,  700,  4,  3,    u, 'gun/bw', 'B208');
Weapons.WheellockPistol.detail = 'wheellock';
Weapons.WheellockPistol.wieldOptions= { BlackPowderWeapons_NonRepeatingPistol:[{strength:10,hands:'dom',damage:{base:1, mods:  1, type: 'cr' }, halfDamageRange:   75, maximumRange:  400, snapShot: 13, accuracy:  1, rateOfFire:'1/60', recoil: -1 } ] };
Weapons.WheellockPistol.shots = 1;
Weapons.FlintlockPistol = new Weapon('pistol',                    3,  200,  5,  3,    u, 'gun/bw', 'B208');
Weapons.FlintlockPistol.detail = 'flintlock';
Weapons.FlintlockPistol.wieldOptions= { BlackPowderWeapons_NonRepeatingPistol:[{strength:10,hands:'dom',damage:{base:2, mods: -1, type: 'cr' }, halfDamageRange:   75, maximumRange:  467, snapShot: 11, accuracy:  1, rateOfFire:'1/20', recoil: -1 } ] };
Weapons.FlintlockPistol.shots = 1;
Weapons.WogdonPistol    = new Weapon('pistol',                 2.75,   20,  5,  3,    u, 'gun/bw', 'B208');
Weapons.WogdonPistol.detail = 'Wogdon';
Weapons.WogdonPistol.wieldOptions = { BlackPowderWeapons_NonRepeatingPistol:[ { strength: 9,hands:'dom',damage:{base:2, mods: -1, type: 'cr' }, halfDamageRange:   75, maximumRange:  467, snapShot: 10, accuracy:  3, rateOfFire:'1/20', recoil: -1 } ] };
Weapons.WogdonPistol.shots = 1;
Weapons.Blunderbuss8G   = new Weapon('blunderbuss 8G',           12,   15,  5,  4,    u, 'gun/bw', 'B209');
Weapons.Blunderbuss8G.wieldOptions= { BlackPowderWeapons_Shotgun   : [ { strength: 13, hands: 'both', damage: { base: 5, mods:  0, type: 'cr' }, halfDamageRange:   15, maximumRange:  100, snapShot: 14, accuracy:  3, rateOfFire:'1/15', recoil: -4 } ] };
Weapons.Blunderbuss8G.shots = 1;
Weapons.Ithaca10G       = new Weapon('Ithaca 10G',               10,   45,  6,  4,    u, 'gun/bw', 'B209');
Weapons.Ithaca10G.wieldOptions    = { Guns6_Shotgun                : [ { strength: 13, hands: 'both', damage: { base: 5, mods:  0, type: 'cr' }, halfDamageRange:   25, maximumRange:  150, snapShot: 12, accuracy:  5, rateOfFire: '2~',  recoil: -4 } ] };
Weapons.Ithaca10G.shots = 2;
Weapons.RemingtonM870_12G=new Weapon('Remington M870 12-guage',  8,   235,  7,  4,   -6, 'gun/bw', 'B209');
Weapons.RemingtonM870_12G.wieldOptions={ Guns7_Shotgun             : [ { strength: 12, hands: 'both', damage: { base: 4, mods:  0, type: 'cr' }, halfDamageRange:   25, maximumRange:  150, snapShot: 12, accuracy:  5, rateOfFire: '3~',  recoil: -3 } ] };
Weapons.RemingtonM870_12G.shots = 5;
Weapons.Cannonlock      = new Weapon('cannon-lock',               5,  300,  4,  4,    u, 'gun/bw', 'B209');
Weapons.Cannonlock.wieldOptions   = { BlackPowderWeapons_Rifle     : [ { strength: 10, hands: 'both', damage: { base: 2, mods:  0, type: 'cr' }, halfDamageRange:  100, maximumRange:  600, snapShot: 20, accuracy:  1, rateOfFire:'1/60', recoil: -3 } ] };
Weapons.Cannonlock.shots = 1;
Weapons.MatchlockMusket = new Weapon('musket',                   20,  400,  4,  4,    u, 'gun/bw', 'B209');
Weapons.MatchlockMusket.detail = 'matchlock';
Weapons.MatchlockMusket.wieldOptions={BlackPowderWeapons_Rifle     : [ { strength: 12, hands: 'both', damage: { base: 4, mods:  0, type: 'cr' }, halfDamageRange:  100, maximumRange:  600, snapShot: 18, accuracy:  2, rateOfFire:'1/60', recoil: -2 } ] };
Weapons.MatchlockMusket.shots = 1;
Weapons.BrownBess       = new Weapon('Brown Bess',               13,   10,  5,  4,    u, 'gun/bw', 'B209');
Weapons.BrownBess.wieldOptions    = { BlackPowderWeapons_Rifle     : [ { strength: 11, hands: 'both', damage: { base: 3, mods:  0, type: 'cr' }, halfDamageRange:  100, maximumRange: 1500, snapShot: 15, accuracy:  5, rateOfFire:'1/15', recoil: -3 } ] };
Weapons.BrownBess.shots = 1;
Weapons.KentuckyRifle   = new Weapon('rifle',                  6.75,   40,  5,  4,    u, 'gun/bw', 'B209');
Weapons.KentuckyRifle.detail = 'Kentucky';
Weapons.KentuckyRifle.wieldOptions= { BlackPowderWeapons_Rifle     : [ { strength: 10, hands: 'both', damage: { base: 4, mods:  0, type: 'cr' }, halfDamageRange:  400, maximumRange: 3700, snapShot: 15, accuracy:  7, rateOfFire:'1/20', recoil: -2 } ] };
Weapons.KentuckyRifle.shots = 1;
Weapons.FergusonRifle   = new Weapon('rifle',                     7,   60,  5,  4,    u, 'gun/bw', 'B209');
Weapons.FergusonRifle.detail = 'Ferguson';
Weapons.FergusonRifle.wieldOptions= { BlackPowderWeapons_Rifle     : [ { strength: 10, hands: 'both', damage: { base: 4, mods:  0, type: 'cr' }, halfDamageRange:  400, maximumRange: 3700, snapShot: 14, accuracy:  7, rateOfFire:'1/10', recoil: -2 } ] };
Weapons.FergusonRifle.shots = 1;
Weapons.BakerRifle      = new Weapon('rifle',                  9.25,   20,  5,  4,    u, 'gun/bw', 'B209');
Weapons.BakerRifle.detail = 'Baker';
Weapons.BakerRifle.wieldOptions   = { BlackPowderWeapons_Rifle     : [ { strength: 12, hands: 'both', damage: { base: 4, mods:  0, type: 'cr' }, halfDamageRange:  300, maximumRange: 2500, snapShot: 15, accuracy:  7, rateOfFire:'1/20', recoil: -3 } ] };
Weapons.BakerRifle.shots = 1;
Weapons.E53             = new Weapon('E’53',                    8.5,   15,  5,  4,    u, 'gun/bw', 'B209');
Weapons.E53.wieldOptions          = { BlackPowderWeapons_Rifle     : [ { strength: 10, hands: 'both', damage: { base: 3, mods:  0, type: 'cr' }, halfDamageRange:  700, maximumRange: 2100, snapShot: 15, accuracy:  8, rateOfFire:'1/15', recoil: -2 } ] };
Weapons.E53.shots = 1;
Weapons.MH71            = new Weapon('MH ’71',                  6.5,   20,  5,  4,    u, 'gun/bw', 'B209');
Weapons.MH71.wieldOptions         = { Guns5_Rifle                  : [ { strength: 10, hands: 'both', damage: { base: 4, mods:  0, type: 'cr' }, halfDamageRange:  600, maximumRange: 2030, snapShot: 15, accuracy:  7, rateOfFire: '1/4', recoil: -2 } ] };
Weapons.MH71.shots = 1;
Weapons.RemRifle        = new Weapon('rifle',                  9.25,   55,  5,  4,    u, 'gun/bw', 'B209');
Weapons.RemRifle.detail = 'Remington .45C';
Weapons.RemRifle.wieldOptions     = { Guns5_Rifle                  : [ { strength: 10, hands: 'both', damage: { base: 4, mods:  0, type: 'cr' }, halfDamageRange:  700, maximumRange: 2100, snapShot: 15, accuracy:  8, rateOfFire: '1/4', recoil: -2 } ] };
Weapons.RemRifle.shots = 1;
Weapons.Spr73           = new Weapon('Springfield ’73',           9,   20,  5,  4,    u, 'gun/bw', 'B209');
Weapons.Spr73.wieldOptions        = { Guns5_Rifle                  : [ { strength: 11, hands: 'both', damage: { base: 4, mods:  0, type: 'cr' }, halfDamageRange:  700, maximumRange: 2100, snapShot: 15, accuracy:  8, rateOfFire: '1/4', recoil: -2 } ] };
Weapons.Spr73.shots = 1;
Weapons.Win73           = new Weapon('Winchester ’73',          7.1,   40,  5,  4,    u, 'gun/bw', 'B209');
Weapons.Win73.wieldOptions        = { Guns5_Rifle                  : [ { strength: 10, hands: 'both', damage: { base: 3, mods:  0, type: 'cr' }, halfDamageRange:  300, maximumRange: 2200, snapShot: 13, accuracy:  7, rateOfFire: '2~',  recoil: -2 } ] };
Weapons.Win73.shots = 6;
Weapons.Lebel86         = new Weapon('Lebel ’86',                10,  125,  5,  4,    u, 'gun/bw', 'B209');
Weapons.Lebel86.wieldOptions      = { Guns5_Rifle                  : [ { strength: 12, hands: 'both', damage: { base: 6, mods:  1, type: 'cr' }, halfDamageRange: 1000, maximumRange: 3900, snapShot: 15, accuracy: 10, rateOfFire: '1/2', recoil: -3 } ] };
Weapons.Lebel86.shots = 8;
Weapons.Sharps50        = new Weapon('Sharps 50',                11,  150,  5,  4,    u, 'gun/bw', 'B209');
Weapons.Sharps50.wieldOptions     = { Guns5_Rifle                  : [ { strength: 12, hands: 'both', damage: { base: 6, mods:  0, type: 'cr' }, halfDamageRange:  600, maximumRange: 3300, snapShot: 15, accuracy:  7, rateOfFire: '1/4', recoil: -3 } ] };
Weapons.Sharps50.shots = 1;
Weapons.Win94           = new Weapon('Winchester ’94',            7,  475,  5,  4,    u, 'gun/bw', 'B209');
Weapons.Win94.wieldOptions        = { Guns5_Rifle                  : [ { strength: 10, hands: 'both', damage: { base: 5, mods:  0, type: 'cr' }, halfDamageRange:  450, maximumRange: 3011, snapShot: 13, accuracy:  8, rateOfFire: '2~',  recoil: -1 } ] };
Weapons.Win94.shots = 6;
Weapons.Msr98k          = new Weapon('Mauser ’98k',             9.5,  170,  6,  4,    u, 'gun/bw', 'B209');
Weapons.Msr98k.wieldOptions       = { Guns6_Rifle                  : [ { strength: 12, hands: 'both', damage: { base: 7, mods:  0, type: 'cr' }, halfDamageRange: 1000, maximumRange: 3972, snapShot: 14, accuracy: 11, rateOfFire: '1/2', recoil: -3 } ] };
Weapons.Msr98k.shots = 5;
Weapons.LEMk3l          = new Weapon('LE Mk3#l',               10.2,  130,  6,  4,    u, 'gun/bw', 'B209');
Weapons.LEMk3l.wieldOptions       = { Guns6_Rifle                  : [ { strength: 12, hands: 'both', damage: { base: 6, mods:  1, type: 'cr' }, halfDamageRange: 1000, maximumRange: 3800, snapShot: 14, accuracy: 10, rateOfFire:   '1', recoil: -2 } ] };
Weapons.LEMk3l.shots = 10;
Weapons.M1903AI         = new Weapon('M1 903 A I ',             9.5,  135,  6,  4,    u, 'gun/bw', 'B209');
Weapons.M1903AI.wieldOptions      = { Guns6_Rifle                  : [ { strength: 12, hands: 'both', damage: { base: 7, mods:  1, type: 'cr' }, halfDamageRange: 1000, maximumRange: 3710, snapShot: 14, accuracy: 11, rateOfFire: '1/2', recoil: -3 } ] };
Weapons.M1903AI.shots = 5;
Weapons.HHExpress       = new Weapon('H&H Express',              16,  200,  6,  2,    u, 'gun/bw', 'B209');
Weapons.HHExpress.wieldOptions    = { Guns6_Rifle                  : [ { strength: 13, hands: 'both', damage: { base:10, mods:  0, type: 'cr' }, halfDamageRange: 1500, maximumRange: 5063, snapShot: 16, accuracy:  7, rateOfFire:   '2', recoil: -6 } ] };
Weapons.HHExpress.shots = 2;
Weapons.M1Garand        = new Weapon('M1 Garand',                10,  590,  6,  4,    u, 'gun/bw', 'B209');
Weapons.M1Garand.wieldOptions     = { Guns6_Rifle                  : [ { strength: 12, hands: 'both', damage: { base: 7, mods:  1, type: 'cr' }, halfDamageRange: 1000, maximumRange: 3710, snapShot: 14, accuracy: 11, rateOfFire:  '3~', recoil: -3 } ] };
Weapons.M1Garand.shots = 8;
Weapons.AK47            = new Weapon('AK-47',                  10.5,  290,  7,  1,    u, 'gun/bw', 'B209');
Weapons.AK47.wieldOptions         = { Guns7_Rifle                  : [ { strength: 10, hands: 'both', damage: { base: 5, mods:  1, type: 'cr' }, halfDamageRange:  400, maximumRange: 3011, snapShot: 12, accuracy:  7, rateOfFire: '10*', recoil: -1 } ] };
Weapons.AK47.shots = 30;
Weapons.FNFAL           = new Weapon('FN-FAL',                   11,  900,  7,  1,    u, 'gun/bw', 'B209');
Weapons.FNFAL.wieldOptions        = { Guns7_Rifle                  : [ { strength: 11, hands: 'both', damage: { base: 7, mods:  0, type: 'cr' }, halfDamageRange: 1000, maximumRange: 4655, snapShot: 14, accuracy: 11, rateOfFire: '11*', recoil: -2 } ] };
Weapons.FNFAL.shots = 20;
Weapons.HKG3            = new Weapon('H&K G3',                   11,  550,  7,  1,    u, 'gun/bw', 'B209');
Weapons.HKG3.wieldOptions         = { Guns7_Rifle                  : [ { strength: 11, hands: 'both', damage: { base: 7, mods:  0, type: 'cr' }, halfDamageRange: 1000, maximumRange: 4655, snapShot: 14, accuracy: 10, rateOfFire: '10*', recoil: -2 } ] };
Weapons.HKG3.shots = 20;
Weapons.Ml6             = new Weapon('Ml 6',                      8,  540,  7,  1,    u, 'gun/bw', 'B209');
Weapons.Ml6.wieldOptions          = { Guns7_Rifle                  : [ { strength:  9, hands: 'both', damage: { base: 5, mods:  0, type: 'cr' }, halfDamageRange:  500, maximumRange: 3843, snapShot: 12, accuracy: 11, rateOfFire: '12*', recoil: -1 } ] };
Weapons.Ml6.shots = 20;
Weapons.AUG             = new Weapon('AUG',                       9,  540,  7,  1,    u, 'gun/bw', 'B209');
Weapons.AUG.wieldOptions          = { Guns7_Rifle                  : [ { strength:  9, hands: 'both', damage: { base: 5, mods:  0, type: 'cr' }, halfDamageRange:  500, maximumRange: 3843, snapShot: 11, accuracy: 10, rateOfFire: '11*', recoil: -1 } ] };
Weapons.AUG.shots = 30;
Weapons.HKPSG1          = new Weapon('H&K PSG 1',                11, 4500,  7,  4,    u, 'gun/bw', 'B209');
Weapons.HKPSG1.wieldOptions       = { Guns7_Rifle                  : [ { strength: 12, hands: 'both', damage: { base: 7, mods:  0, type: 'cr' }, halfDamageRange: 1200, maximumRange: 4655, snapShot: 15, accuracy: 13, rateOfFire:  '3~', recoil: -2 } ] };
Weapons.HKPSG1.shots = 20;
Weapons.NeedleRifle     = new Weapon('rifle',                     5, 1200,  8,  4,    u, 'gun/bw', 'B209');
Weapons.NeedleRifle.detail = 'needle';
Weapons.NeedleRifle.wieldOptions  = { Guns8_Rifle                  : [ { strength:  8, hands: 'both', damage: { base: 2, mods:  0, type: 'imp'}, halfDamageRange:  300, maximumRange:  800, snapShot: 13, accuracy:  9, rateOfFire:  '3~', recoil: -1 } ] };
Weapons.NeedleRifle.shots = 100;
Weapons.LaserRifle      = new Weapon('rifle',                     5, 2000,  8,  4,    u, 'gun/bw', 'B209');
Weapons.LaserRifle.detail = 'laser';
Weapons.LaserRifle.wieldOptions   = { BeamWeapons8_Rifle           : [ { strength:  u, hands: 'both', damage: { base: 2, mods:  0, type: 'imp'}, halfDamageRange:  900, maximumRange: 1200, snapShot: 15, accuracy: 13, rateOfFire:  '3~', recoil: 0 } ] };
Weapons.LaserRifle.shots = '12/C';
Weapons.MilitaryLaserRifle = new Weapon('rifle',                  9, 4000,  8,  1,    u, 'gun/bw', 'B209');
Weapons.MilitaryLaserRifle.detail = 'military laser';
Weapons.MilitaryLaserRifle.wieldOptions= { BeamWeapons8_Rifle      : [ { strength:  u, hands: 'both', damage: { base: 2, mods:  0, type: 'imp'}, halfDamageRange: 1500, maximumRange: 2000, snapShot: 12, accuracy: 15, rateOfFire:  '8*', recoil: 0 } ] };
Weapons.MilitaryLaserRifle.shots = '140/D';
Weapons.GaussNeedleRifle = new Weapon('rifle',                    6, 2500,  8,  1,    u, 'gun/bw', 'B209');
Weapons.GaussNeedleRifle.detail = 'gauss needle';
Weapons.GaussNeedleRifle.wieldOptions= { Guns8_Rifle               : [ { strength:  9, hands: 'both', damage: { base: 2, mods:  1, type: 'imp'}, halfDamageRange:  500, maximumRange: 1000, snapShot: 14, accuracy: 11, rateOfFire: '20*', recoil: -1 } ] };
Weapons.GaussNeedleRifle.shots = '100/B';
Weapons.BlastRifle      = new Weapon('rifle',                    10, 5300,  9,  2,    u, 'gun/bw', 'B209');
Weapons.BlastRifle.detail = 'blast';
Weapons.BlastRifle.wieldOptions   = { BeamWeapons9_Rifle           : [ { strength:  9, hands: 'both', damage: { base:12, mods:  0, type: 'imp'}, halfDamageRange:  400, maximumRange:  800, snapShot: 14, accuracy: 13, rateOfFire:  '3~', recoil: -1 } ] };
Weapons.BlastRifle.shots = '12/C';
Weapons.Disruptor       = new Weapon('disruptor',                 9, 5250,  9,  2,    u, 'gun/bw', 'B209');
Weapons.Disruptor.wieldOptions    = { BeamWeapons9_Rifle           : [ { strength:  u, hands: 'both', damage: { base: 6, mods:  0, type: 'imp'}, halfDamageRange:  500, maximumRange: 1000, snapShot: 13, accuracy: 10, rateOfFire:  '3~', recoil: 0 } ] };
Weapons.Disruptor.shots = '20/C';
Weapons.StunRifle       = new Weapon('rifle',                     4, 1000,  9,  5,    u, 'gun/bw', 'B209');
Weapons.StunRifle.detail = 'stun';
Weapons.StunRifle.wieldOptions    = { BeamWeapons9_Rifle           : [ { strength:  u, hands: 'both', damage: { base: u, mods:  0, type:'stun'}, halfDamageRange:  300, maximumRange: 1000, snapShot: 12, accuracy: 10, rateOfFire:  '3~', recoil: 0 } ] };
Weapons.StunRifle.shots = '20/C';
Weapons.Thompson        = new Weapon('Thompson',                 12,  120,  6,  1,    u, 'gun/bw', 'B209');
Weapons.Thompson.wieldOptions     = { Guns6_Submachinegun          : [ { strength: 11, hands: 'both', damage: { base: 2, mods:  1, type: 'cr' }, halfDamageRange:  190, maximumRange: 1750, snapShot: 11, accuracy:  7, rateOfFire: '20*', recoil: -3 } ] };
Weapons.Thompson.shots = 30;
Weapons.MP40            = new Weapon('MP40',                   10.5,   70,  6,  1,    u, 'gun/bw', 'B209');
Weapons.MP40.wieldOptions         = { Guns6_Submachinegun          : [ { strength: 10, hands: 'both', damage: { base: 3, mods: -1, type: 'cr' }, halfDamageRange:  160, maximumRange: 1900, snapShot: 10, accuracy:  6, rateOfFire:   '8', recoil: -1 } ] };
Weapons.MP40.shots = 32;
Weapons.PPSh41          = new Weapon('PPSh41',                   12,   65,  6,  1,    u, 'gun/bw', 'B209');
Weapons.PPSh41.wieldOptions       = { Guns6_Submachinegun          : [ { strength: 10, hands: 'both', damage: { base: 3, mods: -1, type: 'cr' }, halfDamageRange:  160, maximumRange: 1900, snapShot: 10, accuracy:  6, rateOfFire:  '16', recoil: -1 } ] };
Weapons.PPSh41.shots = 71;
Weapons.IMIUzi          = new Weapon('IMI Uzi',                 9.5,  150,  7,  1,    u, 'gun/bw', 'B209');
Weapons.IMIUzi.wieldOptions	=       { Guns7_Submachinegun          : [ { strength: 10, hands: 'both', damage: { base: 3, mods: -1, type: 'cr' }, halfDamageRange:  160, maximumRange: 1900, snapShot: 10, accuracy:  7, rateOfFire: '10*', recoil: -1 } ] };
Weapons.IMIUzi.shots = 32;
Weapons.HKMP5           = new Weapon('H&K MP5',                7.25,  340,  7,  1,    u, 'gun/bw', 'B209');
Weapons.HKMP5.wieldOptions        = { Guns7_Submachinegun          : [ { strength: 10, hands: 'both', damage: { base: 3, mods: -1, type: 'cr' }, halfDamageRange:  160, maximumRange: 1900, snapShot: 10, accuracy:  8, rateOfFire: '10*', recoil: -1 } ] };
Weapons.HKMP5.shots = 30;
/* Weapons                            'name',               weight,  cost, TL, LC, bulk, qualEffGp
Weapons.WeaponName      = new Weapon('Name',                     3,    50,  1,  4,   -4, 'mace/cr');
Weapons.WeaponName.wieldOptions   = { Skill1            : [ {},
                                                            {} ],
                                      Skill2            : [ {},
                                                            {} ] };
*/
// Compendium II weapons
Weapons.AxeBoarding      = Weapons.Axe.clone();
Weapons.AxeBoarding.detail = "boarding";
Weapons.AxeBoarding.TL = 4;
Weapons.AxeBoarding.reference = "CII19";
Weapons.Cleaver          = Weapons.Hatchet.clone();
Weapons.Cleaver.TL = 3;
Weapons.Cleaver.name = "cleaver";
Weapons.Cleaver.reference = "CII19";
Weapons.Francisca        = Weapons.Hatchet.clone();
Weapons.Francisca.name = "francisca";
Weapons.Francisca.TL = 2;
Weapons.Francisca.reference = "CII20";
Weapons.HammerClub       = new Weapon('hammer', 4, 35, 2, 4, -2, 'mace/cr', 'CII20');
Weapons.HammerClub.wieldOptions = { AxeMace : [ { title: '', hands: 'dom', strength: 12, damage: { base: 'sw',  mods: 2, type: 'cr' }, note: ["1 turn to ready.","Becomes unready if used to parry."] } ] };
Weapons.HeavyClub        = new Weapon('club', 2, 20, 1, 4, -2, 'mace/cr', 'CII20');
Weapons.HeavyClub.detail = "heavy";
Weapons.HeavyClub.wieldOptions = { AxeMace : [ { title: '', hands: 'dom', strength: 0, damage: { base: 'sw',  mods: 2, type: 'cr' }, note: ["1 turn to ready.","Becomes unready if used to parry."] } ] };
Weapons.Kama             = new Weapon('kama', 3, 70, 3, 4, -4, 'edged', 'CII20');
Weapons.Kama.wieldOptions = { AxeMace : [ { title: '', hands: 'dom', strength: 11, damage: { base: 'sw',  mods: 2, type: 'cut' }, reach: '1,2', note: ["1 turn to ready.","Becomes unready if used to parry.","When the sickle-blade is attached to a chain, it creates the kusari-gama."] } ] };
Weapons.Masakari         = Weapons.Axe.clone();
Weapons.Masakari.detail = "masakari";
Weapons.Masakari.TL = 3;
Weapons.Masakari.reference = "CII19";
Weapons.Nata             = Weapons.Hatchet.clone();
Weapons.Nata.TL = 3;
Weapons.Nata.name = "nata";
Weapons.Nata.reference = "CII19";
Weapons.Gumbai           = new Weapon('gumbai', 3, 100, 3, 4, -1, 'edged', 'CII20');
Weapons.Gumbai.description = "iron fan";
Weapons.Gumbai.wieldOptions = { AxeMace : [ { title: '', hands: 'dom', strength: 11, damage: { base: 'sw',  mods: 2, type: 'cr' }, reach: 'C,1', note: ["1 turn to ready.","Becomes unready if used to parry."] } ] };
Weapons.TomahawkMetal    = new Weapon('tomahawk', 2.5, 45, 1, 4, -2, 'pole/axe', 'CII20');
Weapons.TomahawkMetal.detail = "metal";
Weapons.TomahawkMetal.wieldOptions = { AxeMace : [ { title: 'blade', hands: 'dom', strength: 8, damage: { base: 'sw',  mods: 1, type: 'cut' }, note: ["May be thrown."] },
                                                   { title: 'spike', hands: 'dom', strength: 8, damage: { base: 'sw',  mods: 0, type: 'imp' }, note: ["May be thrown."] } ],
                                       AxeThrowing : [ { title: 'thrown',  hands:  'dom', strength: 8, damage: { base: 'sw',  mods:  1, type:  'cut' }, accuracy: 2, halfDamageRange: 1.5, maximumRange: 2.5, snapShot: 10, rangeBasedOnST: true } ] };
Weapons.TomahawkStone    = new Weapon('tomahawk', 3, 10, 1, 4, -2, 'pole/axe', 'CII20');
Weapons.TomahawkStone.detail = "stone";
Weapons.TomahawkStone.wieldOptions = { AxeMace : [ { title: '', hands: 'dom', strength: 9, damage: { base: 'sw',  mods: 1, type: 'cr' } } ],
                                       AxeThrowing : [ { title: 'thrown',  hands:  'dom', strength: 9, damage: { base: 'sw',  mods:  1, type:  'cr' }, accuracy: 1, halfDamageRange: 1, maximumRange: 1.5, snapShot: 10, rangeBasedOnST: true } ] };
Weapons.Fukiya           = Weapons.Blowpipe.clone();
Weapons.Fukiya.name = "fukiya";
Weapons.Fukiya.reference = "CII20";
Weapons.Daikyu           = Weapons.CompositeBow.clone();
Weapons.Daikyu.name = "dai-kyu";
delete Weapons.Daikyu.detail;
Weapons.Daikyu.reference = "CII21";
Weapons.Daikyu.notes = ["Asymmetrical (⅔ above grip), so may be used from horseback."];
Weapons.Hankyu           = Weapons.ShortBow.clone();
Weapons.Hankyu.name = 'han-kyu';
Weapons.Hankyu.description = 'half-bow';
delete Weapons.Hankyu.detail;
Weapons.Hankyu.cost = 600;
Weapons.Hankyu.weight = 2.5;
Weapons.Hankyu.notes = ['+1 to Holdout'];
Weapons.Hankyu.reference = "CII21";
Weapons.Backsword        = Weapons.ThrustingBroadsword.clone();
Weapons.Backsword.name = "backsword";
delete Weapons.Backsword.detail;
Weapons.Backsword.cost = 550;
Weapons.Backsword.TL = 4;
Weapons.Backsword.reference = "CII22";
Weapons.Backsword.notes = ["single-edged","basket hilt, +1 PD for parries, 4 DR for dom. hand"];
Weapons.CavalrySaber     = Weapons.ThrustingBroadsword.clone();
Weapons.CavalrySaber.detail = 'cavalry';
Weapons.CavalrySaber.name = 'saber';
Weapons.CavalrySaber.cost = 500;
Weapons.CavalrySaber.reference = "CII22";
delete Weapons.CavalrySaber.notes;
Weapons.CavalrySaber.wieldOptions.Broadsword[1].damage.mods = 1;
Weapons.Dau              = new Weapon('dau', 5, 700, 3, 4, -5, 'edged', 'CII21');
Weapons.Dau.wieldOptions = { Broadsword : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' } },
                                            { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  0, type: 'imp' } } ] };
Weapons.Estoc            = new Weapon('estoc', 2, 500, 3, 4, -5, 'edged', 'CII21');
Weapons.Estoc.notes = ["A narrow stabbing sword, three to four feet long and weighing about two pounds. The blade is round, square or triangular in cross-section, with no sharpened edges, for forcing its way through the links of chain mail. An estoc is normally used for thrusting attacks."];
Weapons.Estoc.wieldOptions = { Broadsword : [ { title: 'swing',  hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cr'  } },
                                              { title: 'thrust', hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' } } ] };
Weapons.HookSword        = new Weapon('hook sword', 3, 200, 3, 4, -5, 'edged', 'CII21');
Weapons.HookSword.wieldOptions = { Broadsword : [ { title: 'swing', hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cr'  }, note: ["can use Jitte/Sai skill to disarm with hook"] } ],
                                   Karate :     [ { title: 'slash', hands:  'dom', strength: 10, damage: { base: 'thr', mods:  0, type: 'cut' }, reach: 'C,1', note: ["Attack using bladed handguard."] } ],
                                   Brawling :   [ { title: 'slash', hands:  'dom', strength: 10, damage: { base: 'thr', mods:  0, type: 'cut' }, reach: 'C,1', note: ["Attack using bladed handguard."] } ] };
Weapons.Jiann            = new Weapon('jiann', 3, 700, 3, 4, -5, 'edged', 'CII21');
Weapons.Jiann.notes = ["Used primarily for thrusting."];
Weapons.Jiann.wieldOptions = { Broadsword : [ { title: 'swing',  hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                              { title: 'thrust', hands:  'dom', strength:  8, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2' } ],
                                  Fencing : [ { title: 'swing',  hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' }, note: ["Parry is ⅔ Fencing skill."] },
                                              { title: 'thrust', hands:  'dom', strength:  8, damage: { base: 'thr', mods:  1, type: 'imp' }, note: ["Parry is ⅔ Fencing skill."], reach: '1,2' } ]};
Weapons.Kombo            = Weapons.LightClub.clone();
Weapons.Kombo.reference = "CII22";
Weapons.Kombo.TL = 1;
Weapons.Kombo.name = "kombo";
Weapons.Macauitl         = new Weapon('macauitl', 3,   500,  1,  4,   -5, 'edged', 'CII21');
Weapons.Macauitl.wieldOptions = { Broadsword : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["One turn to ready after swing."] },
                                                 { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  0, type: 'cr'  }, note: ["Standard macauitl has <i>blunt</i> point."] } ] };
Weapons.SharpMacauitl    = new Weapon('macauitl', 3,   550,  1,  4,   -5, 'edged', 'CII21');
Weapons.SharpMacauitl.detail = 'sharp';
Weapons.SharpMacauitl.wieldOptions = { Broadsword : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["One turn to ready after swing."] },
                                                      { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  0, type: 'cut' } } ] };
Weapons.Otta             = Weapons.LightClub.clone();
delete Weapons.Otta.detail;   // deletes "light" detail from LightClub clone
Weapons.Otta.name = "otta";
Weapons.Otta.reference = "CII22";
Weapons.Otta.notes = ["S-shaped Indian club."];
Weapons.Otta.cost = 60;
Weapons.Otta.TL = 3;
Weapons.Otta.wieldOptions.Broadsword.push({ title: 'thrust', hands: 'dom', strength: 10, damage: { base: 'thr',  mods:  1, type: 'cr'  }, reach: 1 });
Weapons.Scimitar     = Weapons.CavalrySaber.clone();
Weapons.Scimitar.reference = "CII22";
Weapons.Scimitar.name = 'scimitar';
delete Weapons.Scimitar.detail;

// Spatha (TL2): An iron thrusting broadsword used by Roman cavalry troopers; treat as a thrusting broadsword.
Weapons.Spatha = Weapons.ThrustingBroadsword.clone();
Weapons.Spatha.name = 'spatha';
delete Weapons.Spatha.detail;
Weapons.Spatha.notes = [" An iron thrusting broadsword used by Roman cavalry troopers."];
Weapons.Spatha.reference = "CII22";

Weapons.SwordRapier      = new Weapon('sword-rapier', 2.75, 500, 4, 4, -4, 'pole/axe', 'CII20');
Weapons.SwordRapier.wieldOptions = { Broadsword : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                    { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2' } ],
                                     Fencing :    [ { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2' } ]};
Weapons.ChuKoNu         = new Weapon('chu-ko-nu', 10,   500,  3,  4,   -7, 'bow', 'CII23');
Weapons.ChuKoNu.wieldOptions = { Crossbow : [ { title:  '', hands: 'both', strength: 9, damage: { base: 'thr', mods:  2, type: 'imp' }, halfDamageRange: 15, maximumRange: 20, snapShot: 10, accuracy: 4, recoil: -2, rangeBasedOnST: true } ] };
Weapons.ChuKoNu.shots = 10;
Weapons.CompositeCrossbow = new Weapon('crossbow', 7,   950,  3,  4,   -6, 'bow', 'CII23');
Weapons.CompositeCrossbow.detail = "composite";
Weapons.CompositeCrossbow.wieldOptions = { Crossbow : [ { title:  '', hands: 'both', strength: 7, damage: { base: 'thr', mods:  5, type: 'imp' }, maxDamage: '3d+2', halfDamageRange: 25, maximumRange: 30, snapShot: 12, accuracy: 4, rangeBasedOnST: true } ] };
Weapons.PistolCrossbow  = new Weapon('crossbow',   4,   150,  3,  4,   -4, 'bow', 'CII23' );
Weapons.PistolCrossbow.detail = 'pistol';
Weapons.PistolCrossbow.wieldOptions = { Crossbow : [ { title:  '',    hands:  'dom', strength: 7, damage: { base: 'thr', mods:  2, type: 'imp' }, halfDamageRange: 15, maximumRange: 20, snapShot: 10, accuracy: 1, rangeBasedOnST: true, note: ["Maximum bow ST 5."] } ] };
Weapons.PistolCrossbow.weaponST = true;
Weapons.PistolCrossbow.shots = 1;
Weapons.PistolCrossbow.reload = 4;
Weapons.CombatFan       = new Weapon('combat fan', 1,    40,  3,  4,   -1, 'other', 'CII23');
Weapons.CombatFan.wieldOptions = { Karate : [ { title:'closed', hands:  'dom', strength: 0, damage: { base: 'thr', mods:  0, type: 'cr'  }, reach: 'C,1', note: ["Receives Karate bonuses."] } ],
                                   'DX-2' : [ { title:'closed', hands:  'dom', strength: 0, damage: { base: 'thr', mods:  0, type: 'cr'  }, reach: 'C,1', note: ["Receives Karate bonuses."] },
                                              { title: 'open' , hands:  'dom', strength: 0, damage: { base: 'thr', mods: -2, type: 'cut' }, reach: 'C', maxDamage: '1d+2' } ] };
Weapons.NekoDe          = new Weapon('neko-de',    1,   100,  3,  4,    1, 'other', 'CII23');
Weapons.NekoDe.notes = ["+4 to Holdout when folded.","Receives Brawling or Karate bonuses."];
Weapons.NekoDe.wieldOptions = { Karate :   [ { title: 'stab', hands: 'dom', strength: 0, damage: { base: 'thr', mods:  0, type: 'imp' }, reach: 'C' },
                                             { title: 'chop', hands: 'dom', strength: 0, damage: { base: 'thr', mods:  0, type: 'cut' }, reach: 'C' } ],
                                Brawling : [ { title: 'stab', hands: 'dom', strength: 0, damage: { base: 'thr', mods:  0, type: 'imp' }, reach: 'C' },
                                             { title: 'chop', hands: 'dom', strength: 0, damage: { base: 'thr', mods:  0, type: 'cut' }, reach: 'C' } ]};
Weapons.Shuriken        = new Weapon('shuriken', 0.1,     3,  3,  4,    0, 'other', 'CII31');
Weapons.Shuriken.notes = ["Usually in a set of nine."];
Weapons.Shuriken.wieldOptions = { Shuriken : [ { title: 'thrown',  hands: 'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'cut' }, maxDamage: '1d+2', rangeBasedOnST: true, halfDamageRange: -5, maximumRange:  0, rangeBasedOnST: 'add', accuracy: 1, snapShot: 8 } ],
                                  Brawling : [ { title: 'punch',   hands: 'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                    Karate : [ { title: 'punch',   hands: 'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ] };
Weapons.Shuriken.reload = 1;
// Weapons.Tekko = Weapons.BrassKnuckles.clone(); except that 3e doesn't define Brass Knuckles (B112)
Weapons.DressSmallsword = new Weapon('smallsword', 1,   300,  4,  4,   -3, 'edged', 'CII24');
Weapons.DressSmallsword.detail = "dress";
Weapons.DressSmallsword.wieldOptions = { Fencing : [ { title: 'thrust', hands: 'dom', strength: 0, damage: { base: 'thr', mods: 0, type: 'imp' }, maxDamage: '1d' } ] };
Weapons.FencingSaber    = new Weapon('saber',      2,   400,  4,  4,   -4, 'edged', 'CII24');
Weapons.FencingSaber.detail = "fencing";
Weapons.FencingSaber.notes = ["It has a l-in-3 chance of breaking if it hits DR 2 or more when swung."];
Weapons.FencingSaber.wieldOptions = { Fencing : [ { title: 'swing',  hands: 'dom', strength: 0, damage: { base: 'sw', mods: -1, type: 'cut' }, maxDamage: '1d' },
                                                  { title: 'thrust', hands: 'dom', strength: 0, damage: { base: 'thr', mods: 1, type: 'imp' }, maxDamage: '1d+2' } ] };
Weapons.RapierEarly     = Weapons.Rapier.clone();
Weapons.RapierEarly.reference = "CII24";
Weapons.RapierEarly.detail = "early";
Weapons.RapierEarly.notes = ["Before 1620."];
Weapons.RapierEarly.weight = 2.5;
Weapons.RapierEarly.wieldOptions.Fencing[0].strength = 7;
Weapons.RapierLate      = Weapons.Rapier.clone();
Weapons.RapierLate.reference = "CII24";
Weapons.RapierLate.detail = "late";
Weapons.RapierLate.notes = ["After 1630."];
Weapons.RapierLate.weight = 2;
Weapons.RapierLate.wieldOptions.Fencing[0].strength = 7;
Weapons.RapierSlashing  = Weapons.Saber.clone();
Weapons.RapierSlashing.reference = "CII24";
Weapons.RapierSlashing.name = "rapier";
Weapons.RapierSlashing.detail = "slashing";
Weapons.RapierSlashing.cost = 1000;
Weapons.RapierSlashing.wieldOptions.Fencing[0].note = ["1 turn to ready after a swing."];
Weapons.RapierSlashing.wieldOptions.Fencing[0].reach = '1,2';
Weapons.RapierSlashing.wieldOptions.Fencing[1].reach = '1,2';
Weapons.RapierSlashing.wieldOptions.Fencing[1].maxDamage = '1d+1';
Weapons.LightSwordCane  = Weapons.Baton.clone();
Weapons.LightSwordCane.detail = 'light';
Weapons.LightSwordCane.name = 'sword cane';
Weapons.LightSwordCane.TL = 3;
Weapons.LightSwordCane.notes = ["Acts as a scabbard for a concealed dress smallsword; bought separately."];
Weapons.LightSwordCane.cost = 50;
Weapons.LightSwordCane.weight = 1.5;
Weapons.LightSwordCane.reference = "CII24";
Weapons.SwordCane       = Weapons.LightClub.clone();
delete Weapons.SwordCane.detail;
Weapons.SwordCane.name = 'sword cane';
Weapons.SwordCane.TL = 3;
Weapons.SwordCane.notes = ["Acts as a scabbard for a concealed smallsword; bought separately."];
Weapons.SwordCane.cost = 50;
Weapons.SwordCane.weight = 2.5;
Weapons.SwordCane.reference = "CII24";
Weapons.Nunchaku        = new Weapon('nunchaku',   2,    20,  3,  4,    0, 'mace/cr', "CII25");
Weapons.Nunchaku.notes = ["1 turn to ready.","Becomes <i>unready</i> if used to parry.","Any attempt to parry a flail is at -4; attempts to block are at -2. Fencing weapons cannot parry flails."]
Weapons.Nunchaku.wieldOptions     = { Flail    : [ { title: '', hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2' } ] };
Weapons.NunchakuCollapsible = Weapons.Nunchaku.clone();
Weapons.NunchakuCollapsible.detail = 'collapsible';
Weapons.NunchakuCollapsible.bulk = 1;
Weapons.NunchakuCollapsible.TL = 7;
Weapons.GrainFlail      = new Weapon('flail',      8,    20,  1,  4,   -7, 'other', "CII25");
Weapons.GrainFlail.detail = 'grain';
Weapons.GrainFlail.notes = ["1 turn to ready.","Becomes <i>unready</i> if used to parry.","Any attempt to parry a flail is at -4; attempts to block are at -2. Fencing weapons cannot parry flails."]
Weapons.GrainFlail.wieldOptions     = { Flail : [ { title: '', hands: 'both', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '2,3' } ] };
// Kusari has a Flail wield option
Weapons.ThreePartStaff  = new Weapon('three-part staff', 5, 60, 3, 4,  -3, 'mace/cr', "CII25")
Weapons.ThreePartStaff.notes = ["1 turn to ready.","Becomes <i>unready</i> if used to parry.","Any attempt to parry a flail is at -4; attempts to block are at -2. Fencing weapons cannot parry flails.","All attacks are at DX-1."]
Weapons.ThreePartStaff.wieldOptions = { Flail : [ { title: '',          hands: 'both', strength: 11, damage: { base: 'sw', mods: 4, type: 'cr' }, reach: '1-3' },
                                                  { title: '2 attacks', hands: 'both', strength: 11, damage: { base: 'sw', mods: 2, type: 'cr' }, reach: 'C,1' } ] };
Weapons.Garrote         = new Weapon('garrote',  1/8,     1,  1,  4,    2, 'other', "CII25");
Weapons.Garrote.wieldOptions = { Garrote : [ { title: '', hands: 'both', strength: 0, damage: { base: 'thr', mods: 0, type: 'cr' }, reach: 'C' } ] };
Weapons.GarroteWire     = new Weapon('garrote', 1/16,     5,  7,  4,    2, 'other', "CII25");
Weapons.GarroteWire.detail = 'wire';
Weapons.GarroteWire.wieldOptions = { Garrote : [ { title: '', hands: 'both', strength: 0, damage: { base: 'thr', mods: 0, type: 'cut' }, reach: 'C' } ] };
Weapons.Harpoon         = new Weapon('harpoon',    6,    60,  2,  4,  -10, 'pole/axe', "CII25");
Weapons.Harpoon.wieldOptions = { Harpoon : [ { title:'', hands: 'dom', strength: 11, damage: { base: 'thr', mods: 5, type: 'imp' },  halfDamageRange: 1, maximumRange: 1.5, snapShot: 11, accuracy: 2, rangeBasedOnST: true } ] };
Weapons.Jitte           = new Weapon('jitte',      1,    20,  3,  4,   -1, 'other', "CII26");
Weapons.Jitte.wieldOptions = { JitteSai : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cr' }, reach: 'C' },
                                            { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'cr' }, reach: 'C,1', note: ["Blunt point; used to disarm."] } ] };
Weapons.Sai             = new Weapon('sai',        1,    30,  3,  4,   -1, 'other', "CII26");
Weapons.Sai.wieldOptions = { JitteSai : [ { title: 'swing',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cr'  }, reach: 'C' },
                                          { title: 'thrust',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  0, type: 'imp' }, reach: 'C,1', note: ["Sharp point; can also disarm."] } ] };
Weapons.Tjabang = Weapons.Jitte.clone();
Weapons.Tjabang.name = "tjabang";
Weapons.TjabangSharp = Weapons.Sai.clone();
Weapons.TjabangSharp.name = "tjabang";
Weapons.TjabangSharp.detail = "sharp";
// tokushu keibo has a JitteSai wield option
Weapons.Katana          = new Weapon('katana',     5,   650,  3,  4,   -4, 'blade', "CII26" );
Weapons.Katana.wieldOptions = { Katana : [ { title: 'swing',            hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2' },
                                           { title: 'swing, scabbarded',hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cr'  }, reach: '1,2', note: ["Used to subdue."] },
                                           { title: 'thrust',           hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'imp' } },
                                           { title: 'swing, 2 hands',   hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["Parry is ⅔ Katana skill when used two-handed."] },
                                           { title: 'swing, scabbarded, 2 hands',hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cr' }, reach: '1,2', note: ["Parry is ⅔ Katana skill when used two-handed."] },
                                           { title: 'thrust, 2 hands',  hands: 'both', strength: 11, damage: { base: 'thr', mods:  1, type: 'imp' },               note: ["Parry is ⅔ Katana skill when used two-handed."] } ] };
Weapons.Bokken          = new Weapon('bokken',     5,    40,  3,  4,   -4, 'pole/axe', "CII26" );
Weapons.Bokken.notes = ["hardwood (katana) training sword"];
Weapons.Bokken.wieldOptions = { Katana : [ { title: 'swing',            hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cr' }, reach: '1,2' },
                                           { title: 'thrust',           hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'cr' } },
                                           { title: 'swing, 2 hands',   hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cr' }, reach: '1,2', note: ["Parry is ⅔ Katana skill when used two-handed."] },
                                           { title: 'thrust, 2 hands',  hands: 'both', strength: 11, damage: { base: 'thr', mods:  1, type: 'cr' },               note: ["Parry is ⅔ Katana skill when used two-handed."] } ] };
Weapons.Gum             = new Weapon('gum',        5,   650,  3,  4,   -4, 'blade', "CII26" );
Weapons.Gum.wieldOptions = { Katana : [ { title: 'swing',            hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2' },
                                        { title: 'thrust',           hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'imp' } },
                                        { title: 'swing, 2 hands',   hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["Parry is ⅔ Katana skill when used two-handed."] },
                                        { title: 'thrust, 2 hands',  hands: 'both', strength: 11, damage: { base: 'thr', mods:  1, type: 'imp' },               note: ["Parry is ⅔ Katana skill when used two-handed."] } ] };
// Jo has a Katana wield option, copy from Bokken
Weapons.Shinai          = new Weapon('shinai',     3,    40,  3,  4,   -4, 'pole/axe', "CII26" );
Weapons.Shinai.notes = ["bamboo (katana) training sword"];
Weapons.Shinai.wieldOptions = { Katana : [ { title: 'swing',            hands:  'dom', strength: 9, damage: { base: 'sw',  mods: -1, type: 'cr' }, reach: '1,2' },
                                           { title: 'thrust',           hands:  'dom', strength: 9, damage: { base: 'thr', mods: -1, type: 'cr' } },
                                           { title: 'swing, 2 hands',   hands: 'both', strength: 9, damage: { base: 'sw',  mods:  0, type: 'cr' }, reach: '1,2', note: ["Parry is ⅔ Katana skill when used two-handed."] },
                                           { title: 'thrust, 2 hands',  hands: 'both', strength: 9, damage: { base: 'thr', mods: -1, type: 'cr' },               note: ["Parry is ⅔ Katana skill when used two-handed."] } ] };
Weapons.Tachi           = new Weapon('tachi',      5,   650,  3,  4,   -4, 'blade', "CII26" );
Weapons.Tachi.notes = ["Used on horseback."];
Weapons.Tachi.wieldOptions = { Katana : [ { title: 'swing',  hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2' },
                                          { title: 'thrust', hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'imp' } } ] };
Weapons.BadikSmall = Weapons.Dagger.clone();
Weapons.BadikSmall.name = 'badik';
Weapons.BadikSmall.detail = 'small';
Weapons.BadikSmall.TL = 3;
delete Weapons.BadikSmall.notes;
delete Weapons.BadikSmall.wieldOptions.KnifeThrowing;
Weapons.BadikSmall.reference = "CII27";
Weapons.Badik = Weapons.KnifeSmall.clone();
Weapons.Badik.name = 'badik';
delete Weapons.Badik.detail;
Weapons.Badik.reference = "CII27";
Weapons.Badik.TL = 3;
delete Weapons.Badik.notes;
delete Weapons.Badik.wieldOptions.KnifeThrowing;
Weapons.BadikLarge = Weapons.KnifeLarge.clone();
Weapons.BadikLarge.name = 'badik';
Weapons.BadikLarge.reference = "CII27";
Weapons.BadikLarge.TL = 3;
delete Weapons.BadikLarge.notes;
delete Weapons.BadikLarge.wieldOptions.KnifeThrowing;
Weapons.Balisong        = new Weapon('balisong knife', 0.5,   30,  0,  4,   -1, 'edged', "CII27");
Weapons.Balisong.notes = ["+1 to Holdout skill."]
Weapons.Balisong.wieldOptions = { Knife      : [ { title: 'swing',   hands:  'dom', strength:  0, damage: { base: 'sw',  mods: -3, type: 'cut' }, maxDamage: '1d+1', reach: 'C,1', parryBonus: -1 },
                                                 { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',   parryBonus: -1 } ],
                                  MainGauche : [ { title: 'swing',   hands:  'off', strength:  0, damage: { base: 'sw',  mods: -3, type: 'cut' }, maxDamage: '1d+1', reach: 'C,1',                 note: ["Parry is ⅔ Main-Gauche skill."] },
                                                 { title: 'thrust',  hands:  'off', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',                   note: ["Parry is ⅔ Main-Gauche skill."] } ] };
Weapons.Hishi = Weapons.Dagger.clone();
Weapons.Hishi.name = 'hishi';
Weapons.Hishi.reference = "CII27";
Weapons.KatarSmall      = new Weapon('katar',            2,   40,  3,  4,   -2, 'edged', "CII27");
Weapons.KatarSmall.detail = 'small';
Weapons.KatarSmall.notes = ["Perpendicular grip."]
Weapons.KatarSmall.wieldOptions = { Knife : [ { title: 'swing',   hands:  'dom', strength:  0, damage: { base: 'sw',  mods: -3, type: 'cut' }, reach: 'C,1' },
                                              { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: 'C' } ] };
Weapons.Kozuka = Weapons.KnifeSmall.clone();
Weapons.Kozuka.name = 'kozuka';
delete Weapons.Kozuka.detail;
Weapons.Kozuka.reference = "CII27";
// kris?  just a new name for any edged weapon
Weapons.PenKnife = Weapons.Dagger.clone();
Weapons.PenKnife.name = 'knife';
Weapons.PenKnife.detail = 'pen';
Weapons.PenKnife.reference = "CII27";
Weapons.PenKnife.cost = 50;
Weapons.PenKnife.TL = 6;
Weapons.PenKnife.weight = 0;
Weapons.Pisau = Weapons.KnifeSmall.clone();
Weapons.Pisau.name = 'pisau';
delete Weapons.Pisau.detail;
Weapons.Pisau.reference = "CII27";
Weapons.PunalSmall = Weapons.Dagger.clone();
Weapons.PunalSmall.name = 'punal';
Weapons.PunalSmall.detail = 'small';
Weapons.PunalSmall.reference = "CII27";
Weapons.PunalSmall.TL = 3;
Weapons.Punal = Weapons.KnifeSmall.clone();
Weapons.Punal.name = 'punal';
delete Weapons.Punal.detail;
Weapons.Punal.reference = "CII27";
Weapons.Punal.TL = 3;
Weapons.PunalLarge = Weapons.KnifeLarge.clone();
Weapons.PunalLarge.name = 'punal';
Weapons.PunalLarge.reference = "CII27";
Weapons.PunalLarge.TL = 3;
Weapons.KnifeWheel      = new Weapon('knife-wheel',    1.5,   75,  3,  4,   -2, 'edged', "CII27");
Weapons.KnifeWheel.notes = ["Usually used in pairs.","Gives PD 1 for parrying."]
Weapons.KnifeWheel.wieldOptions = { Knife : [ { title: 'slash',   hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'cut' }, reach: 'C' },
                                              { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: 'C' } ],
                               MainGauche : [ { title: 'slash',   hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'cut' }, reach: 'C' },
                                              { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: 'C' } ] };
Weapons.SlashingWheel   = new Weapon('slashing wheel',   1,   60,  3,  4,   -2, 'edged', "CII27");
Weapons.SlashingWheel.notes = ["Usually used in pairs.","Gives PD 1 for parrying."]
Weapons.SlashingWheel.wieldOptions = { Knife : [ { title: 'slash',   hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'cut' }, reach: 'C' },
                                                 { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: 'C' } ],
                                  MainGauche : [ { title: 'slash',   hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'cut' }, reach: 'C' },
                                                 { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: 'C' } ] };
Weapons.MainGauche   = new Weapon('main-gauche',  5/4,   50,  4,  4,   -1, 'edged', "CII29");
Weapons.MainGauche.wieldOptions = { Knife : [ { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: 'C', maxDamage: '1d+2' },
                                              { title: 'slash',   hands:  'dom', strength:  0, damage: { base: 'sw',  mods: -3, type: 'cut' }, reach: 'C,1' } ],
                               MainGauche : [ { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: 'C', maxDamage: '1d+2' },
                                              { title: 'slash',   hands:  'dom', strength:  0, damage: { base: 'sw',  mods: -3, type: 'cut' }, reach: 'C,1' } ],
                            KnifeThrowing : [ { title: 'throw',   hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+2',   halfDamageRange: -5,  maximumRange: 0,   snapShot: 12, rangeBasedOnST: 'add' } ] };
Weapons.Stiletto   = new Weapon('stiletto',  0.3,   20,  4,  4,   -1, 'edged', "CII29");
Weapons.Stiletto.wieldOptions = { Knife : [ { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: 'C', maxDamage: '1d+1' } ],
                             MainGauche : [ { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: 'C', maxDamage: '1d+1' } ],
                          KnifeThrowing : [ { title: 'throw',   hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1',   halfDamageRange: -5,  maximumRange: 0,   snapShot: 12, rangeBasedOnST: 'add' } ] };
Weapons.Tanto = Weapons.KnifeLarge.clone();
Weapons.Tanto.name = 'tanto';
delete Weapons.Tanto.detail;
Weapons.Tanto.reference = "CII27";
//Weapons.Tanto = Weapons.KnifeSmall.clone();
Weapons.TrenchKnife = Weapons.BadikLarge.clone();
Weapons.TrenchKnife.name = 'knife';
Weapons.TrenchKnife.detail = 'trench';
Weapons.TrenchKnife.reference = "CII27";
//Weapons.TrenchKnife = Weapons.KnifeSmall.clone();
Weapons.TrenchKnife.TL = 6;
Weapons.TrenchKnife.cost = 55;
Weapons.TrenchKnife.weight = 1.5;
// has a Brass Knuckles (i.e., Brawling) wield option
// Paku? stick used with Knife Throwing skill - would need 3 entries (dagger, small, and large) all identical to Knife except only Knife Throwing and Shuriken options and -1 damage
Weapons.ChainStaff = new Weapon('chain-staff',  4+5, 80,  3, 4, -5, 'other', "CII28");
Weapons.ChainStaff.notes = ["Requires both Staff and Kusari skills; roll against the lower of the two.","All kusari weapons are blocked at -2 and parried at -4."]
Weapons.ChainStaff.wieldOptions = { StaffSkill : [ { title: 'swing',  hands: 'both', strength:  6, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', note: ["Parry is ⅔ Staff skill."] },
                                                   { title: 'thrust', hands: 'both', strength:  6, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', note: ["Parry is ⅔ Staff skill."] } ],
                                        Kusari : [ { title: 'kusari', hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1-4', note: ["1 turn/yd of reach to ready after attack.","Becomes <i>unready</i> if used to parry.","Can be used to grapple; see pCII34."] } ] };
Weapons.Kusari = new Weapon('kusari',   5, 70,  3, 4, -2, 'other', "CII28");
Weapons.Kusari.notes = ["All kusari weapons are blocked at -2 and parried at -4."]
Weapons.Kusari.wieldOptions = { Kusari : [ { title: 'swing',  hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1-4', note: ["1 turn/yd of reach to ready after attack.","Becomes <i>unready</i> if used to parry.","Can be used to grapple; see pCII34."] } ] };
Weapons.KusariGama      = new Weapon('kusari-gama', 3, 80, 3, 4, -4, 'edged', "CII28");
Weapons.KusariGama.notes = ["All kusari weapons are blocked at -2 and parried at -4."]
Weapons.KusariGama.wieldOptions = { Kusari : [ { title: 'kama',   hands: 'dom',  strength: 11, damage: { base: 'sw',  mods: 2, type: 'cut' }, reach: '1,2', note: ["1 turn to ready after swing.","Becomes <i>unready</i> if used to parry."] } ] };
Weapons.ManrikiGusari   = new Weapon('manriki-gusari',  3,  60,  3,  4, -2, 'other', "CII28");
Weapons.ManrikiGusari.notes = ["1 turn to ready after each use.","Becomes <i>unready</i> if used to parry.","Can grapple, using kusari rules, see pCII34."]
Weapons.ManrikiGusari.wieldOptions = { Kusari : [ { title: '', hands: 'dom', strength: 11, damage: { base: 'sw',  mods: 4, type: 'cr'  }, reach: '1,2' } ] };
Weapons.OhGama          = new Weapon('oh-gama', 8, 130, 3, 4, -8, 'edged', "CII28");
Weapons.OhGama.notes = ["Cinematic weapon.","All kusari weapons are blocked at -2 and parried at -4."]
Weapons.OhGama.wieldOptions = { Kusari : [ { title: '', hands: 'dom',  strength: 11, damage: { base: 'sw',  mods: 4, type: 'cut' }, reach: '1-4', note: ["1 turn to ready after swing.","Becomes <i>unready</i> if used to parry."] } ] };
Weapons.Xyston = Weapons.Lance.clone();
Weapons.Xyston.name = 'xyston';
Weapons.Xyston.TL = 1;
Weapons.Xyston.reference = "CII29";
Weapons.Xyston.notes = ["Use <i>rider's</i> ST to compute damage, instead of mount's."];
Weapons.WhipMonowire    = new Weapon('whip',                   0.5,   900, 9,  4,    0, 'other', 'CII29');
Weapons.WhipMonowire.detail = 'monowire';
Weapons.WhipMonowire.armorDivisor = 10;
Weapons.WhipMonowire.wieldOptions = { Whip : [ { title:  '',  hands:  'dom', strength:  0, damage: { base: 'sw',  mods: -2, type: 'cut'  }, reach: '1-7', parryBonus: -2, note: ['See CI135 or CII29 for special rules.'] } ] };
// Iaculum CII29; clone of small (melee) net, B207
Weapons.Bill = Weapons.Glaive.clone();
Weapons.Bill.name = 'bill';
Weapons.Bill.reference = "CII29";
Weapons.Bill.notes = ["See CII29 for special pulling rules."];
Weapons.DahDauHeavy     = new Weapon('dah-dau', 12,   150,  3,  4,   -8, 'cr/imp', 'CII30');
Weapons.DahDauHeavy.detail = 'heavy';
Weapons.DahDauHeavy.notes = ["Requires two hands.","Requires a Ready maneuver to change reach."];
Weapons.DahDauHeavy.wieldOptions = { Polearm           : [ { title:'swing',    hands: 'both', strength: 13, damage: { base: 'sw',  mods:  5, type: 'cut' }, reach: '2,3', note: ["2 turns to ready after swing."] },
                                                           { title:'thrust',   hands: 'both', strength: 13, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1-3', note: ["1 turn to ready after thrust."] } ] };
Weapons.HorseCutterHeavy = Weapons.DahDauHeavy.clone();
Weapons.HorseCutterHeavy.name = "horse-cutter";
Weapons.Naginata        = new Weapon('naginata',  6,   100,  3,  4,   -8, 'cr/imp', 'CII30,CII35,CII36');
Weapons.Naginata.notes = ["Requires two hands."];
Weapons.Naginata.wieldOptions = { Polearm           : [ { title:'swing',    hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["1 turn to ready after swing."] },
                                                        { title:'thrust',   hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:  2 } ],
                                  StaffSkill        : [ { title:'swing',    hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', note: ["Staff technique, with shaft."] },
                                                        { title:'thrust',   hands: 'both', strength:  9, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', note: ["Staff technique, with blunt end."] } ],
                                  TwoHandedSword    : [ { title:'swing',    hands: 'both', strength:  9, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach:  2,    note: ["Sword technique; 1 turn to ready after swing."] },
                                                        { title:'thrust',   hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:  2,    note: ["Sword technique; no time to ready."] } ] };
Weapons.DahDauLight     = new Weapon('dah-dau',  8,   120,  3,  4,   -8, 'cr/imp', 'CII30,CII35');
Weapons.DahDauLight.detail = 'light';
Weapons.DahDauLight.notes = ["Requires two hands.","Requires a Ready maneuver to change reach."];
Weapons.DahDauLight.wieldOptions = { Polearm           : [ { title:'swing',    hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cut' }, reach: '1,2', note: ["2 turns to ready after swing."] },
                                                           { title:'thrust',   hands: 'both', strength: 12, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '1,2', note: ["1 turn to ready after thrust."] } ],
                                     StaffSkill        : [ { title:'swing',    hands: 'both', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', note: ["Staff technique, with shaft."] },
                                                           { title:'thrust',   hands: 'both', strength: 12, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', note: ["Staff technique, with blunt end."] } ] };
Weapons.HorseCutterLight = Weapons.DahDauLight.clone();
Weapons.HorseCutterLight.name = "horse-cutter";
Weapons.Latajang        = new Weapon('latajang',  7,   100,  3,  4,   -8, 'cr/imp', 'CII30');
Weapons.Latajang.notes = ["Requires two hands.","Requires a Ready maneuver to change reach."];
Weapons.Latajang.wieldOptions = { Polearm : [ { title:'swing',    hands: 'both', strength:  7, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["1 turn to ready after swing."] },
                                              { title:'thrust',   hands: 'both', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2', note: ["1 turn to ready after thrust."] } ] };
Weapons.MonksSpade      = new Weapon('monk’s spade',  6,   100,  3,  4,   -8, 'cr/imp', 'CII30');
Weapons.MonksSpade.notes = ["Requires two hands.","Requires a Ready maneuver to change reach."];
Weapons.MonksSpade.wieldOptions = { Polearm : [ { title:'blade',  hands: 'both', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2', note: ["1 turn to ready after swing."] },
                                                { title:'shaft',  hands: 'both', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cr'  }, reach: '1,2', note: ["1 turn to ready after swing."] },
                                                { title:'spade',  hands: 'both', strength: 10, damage: { base: 'thr', mods:  2, type: 'cut' }, reach: '1,2', note: ["1 turn to ready after thrust."] } ] };
Weapons.YuehYaChaan = Weapons.MonksSpade.clone();
Weapons.YuehYaChaan.name = 'yueh-ya-chaan';
Weapons.DanBong         = new Weapon('dan bong', 1, 10, 1, 4, -3, 'mace/cr', 'CII30');
Weapons.DanBong.notes = ["Korean short sticks, generally used in pairs."];
Weapons.DanBong.wieldOptions = { ShortStaff : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cr'  } },
                                                { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'cr'  } } ]};
Weapons.EscrimaStick    = new Weapon('escrima stick', 1, 20, 1, 4, -3, 'mace/cr', 'CII30');
Weapons.EscrimaStick.notes = ["A simple length of wood, used one-handed."];
Weapons.EscrimaStick.wieldOptions = { Shortsword : [ { title: 'swing',   hands: 'dom',  strength: 0,  damage: { base: 'sw',  mods:  0, type: 'cr'  } },
                                                     { title: 'thrust',  hands: 'dom',  strength: 0,  damage: { base: 'thr', mods:  0, type: 'cr'  } } ],
                                      ShortStaff : [ { title: 'swing',   hands: 'dom',  strength: 0,  damage: { base: 'sw',  mods:  0, type: 'cr'  } },
                                                     { title: 'thrust',  hands: 'dom',  strength: 0,  damage: { base: 'thr', mods:  0, type: 'cr'  } } ]};
Weapons.Jo              = new Weapon('jo', 2, 10, 1, 4, -4, 'mace/cr', 'CII30');
Weapons.Jo.notes = ["A simple length of wood, used one-handed."];
Weapons.Jo.wieldOptions = { ShortStaff : [ { title: 'swing',   hands: 'dom',  strength: 0,  damage: { base: 'sw',  mods: 1, type: 'cr'  } },
                                           { title: 'thrust',  hands: 'dom',  strength: 0,  damage: { base: 'thr', mods: 1, type: 'cr'  } } ]};
Weapons.TokushuKeibo  = Weapons.Baton.clone();
Weapons.TokushuKeibo.name = 'tokushu keibo';
Weapons.TokushuKeibo.TL = 7;
Weapons.TokushuKeibo.bulk = 1;
Weapons.TokushuKeibo.notes = ["Collapsible stainless steel baton that easily fits in a pocket when closed (+1 to Holdout).","Takes 1 turn to ready or a Fast-Draw (Tokushu Keibo) roll to ready it on the same turn."];
Weapons.TokushuKeibo.cost = 20;
Weapons.TokushuKeibo.weight = 1;
Weapons.TokushuKeibo.reference = "CII30";
Weapons.TokushuKeibo.wieldOptions.JitteSai = [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cr' }, reach: 'C', note: ["Has jitte-like hand guards, and it can be used as a jitte, but at -3 skill - the guards are very small."] },
                                               { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'cr' }, reach: 'C,1', note: ["Blunt point; used to disarm.","Has jitte-like hand guards, and it can be used as a jitte, but at -3 skill - the guards are very small."] } ];

Weapons.TokushuKeiboSpringAction  = Weapons.TokushuKeibo.clone();
Weapons.TokushuKeiboSpringAction.notes = ["Collapsible stainless steel baton that easily fits in a pocket when closed (+1 to Holdout).","No Fast-Draw roll required to extend in same turn as ready."];
Weapons.TokushuKeiboSpringAction.description = "spring-action";
Weapons.TokushuKeiboSpringAction.cost = 50;
Weapons.Tongkat = Weapons.EscrimaStick.clone();
Weapons.Tongkat.name = 'tongkat';
Weapons.Bolo            = new Weapon('bolo', 3, 400, 3, 4, -4, 'edged', 'CII30');
Weapons.Bolo.wieldOptions = { Shortsword : [ { title: 'swing',   hands: 'dom',  strength: 10,  damage: { base: 'sw',  mods: 1, type: 'cut'  } } ]};
Weapons.Machete = Weapons.Bolo.clone();
Weapons.Machete.name = 'machete';
Weapons.Parang = Weapons.Bolo.clone();
Weapons.Parang.name = 'parang';
Weapons.BronzeAgeSword = Weapons.Shortsword.clone();
Weapons.BronzeAgeSword.name = 'sword';
Weapons.BronzeAgeSword.detail = 'Bronze-age';
Weapons.BronzeAgeSword.TL = 1;
Weapons.BronzeAgeSword.reference = "CII30";
Weapons.BronzeAgeSword.notes = ["A short, stabbing sword, leaf-shaped with no edge."];
Weapons.BronzeAgeSword.wieldOptions.Shortsword[0].damage.type = 'cr';
Weapons.ButterflySword  = new Weapon('butterfly sword', 3, 400, 3, 4, -4, 'edged', 'CII30');
Weapons.ButterflySword.notes = ["Heavy, saber-like, Chinese chopping weapon, commonly used in pairs. Useless for thrusting."];
Weapons.ButterflySword.wieldOptions = { Shortsword : [ { title: 'swing',   hands: 'dom',  strength: 10,  damage: { base: 'sw',  mods:  1, type: 'cut' } } ] };
Weapons.Cutlass         = new Weapon('cutlass', 2, 300, 4, 4, -4, 'edged', 'CII31' );
Weapons.Cutlass.wieldOptions = { Shortsword : [ { title: 'swing',   hands: 'dom',  strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' }, reach: 'C,1' },
                                                { title: 'thrust',  hands: 'dom',  strength:  7, damage: { base: 'thr', mods:  0, type: 'imp' }, reach: 'C,1' } ] };
Weapons.DanSangGum = Weapons.Bolo.clone();
Weapons.DanSangGum.name = 'dan sang gum';
Weapons.DanSangGum.reference = 'CII31';
Weapons.DanSangGum.notes = ["Often used in pairs."];
Weapons.KatarLarge      = new Weapon('katar',            2,   40,  3,  4,   -2, 'edged', "CII31");
Weapons.KatarLarge.detail = 'large';
Weapons.KatarLarge.notes = ["Perpendicular grip.","A sword-sized katar."]
Weapons.KatarLarge.wieldOptions = { Shortsword : [ { title: 'swing',   hands: 'dom',  strength: 0,  damage: { base: 'sw',  mods: -1, type: 'cut' } },
                                                   { title: 'thrust',  hands: 'dom',  strength: 0,  damage: { base: 'thr', mods:  1, type: 'imp' } } ] };
Weapons.Gladius = Weapons.Shortsword.clone();
Weapons.Gladius.name = 'gladius';
Weapons.Gladius.reference = "CII31";
Weapons.Gladius.notes = ["A Roman stabbing shortsword, issued to all legionnaires.","Balanced and designed as a stabbing, not cutting, weapon. Effective skill is increased by 1 for thrusting attacks, and reduced by 1 for swings."];
Weapons.NinjaTo = Weapons.Shortsword.clone();
Weapons.NinjaTo.name = 'ninja-to';
Weapons.NinjaTo.reference = "CII31";
Weapons.NinjaTo.notes = ["Some ninja-tos were built to be concealed inside staffs by removing the hilt-guard.","The sword sheath usually has a built-in blowpipe."];
Weapons.Pedang = Weapons.Shortsword.clone();
Weapons.Pedang.name = 'pedang';
Weapons.Pedang.TL = 3;
Weapons.Pedang.reference = "CII31";
Weapons.Sica = Weapons.Bolo.clone();
Weapons.Sica.name = 'sica';
Weapons.Sica.TL = 2;
Weapons.Sica.reference = 'CII31';
Weapons.Sica.notes = ["A weapon used by Roman gladiators, this was a heavy, chopping shortsword that did swing+1 cutting damage."];
Weapons.Wakizashi = Weapons.Shortsword.clone();
Weapons.Wakizashi.name = 'wakizashi';
Weapons.Wakizashi.TL = 3;
Weapons.Wakizashi.reference = "CII31";
Weapons.Wakizashi.notes = ["A Japanese shortsword; used in conjunction with the katana by the samurai class, and as a main weapon by most other social classes."];
// Paku
Weapons.Piau = Weapons.Shuriken.clone();
Weapons.Piau.name = 'piau';
Weapons.Piau.reference = 'CII31';
Weapons.SonicShuriken   = new Weapon('sonic shuriken', 0.5, 400,  3,  4,    0, 'other', "CII31");
Weapons.SonicShuriken.wieldOptions = { Throwing : [ { title: 'thrown',  hands: 'dom', strength:  0, damage: { base: 1, mods: 3, type: 'cut' }, rangeBasedOnST: true, halfDamageRange: -5, maximumRange:  0, rangeBasedOnST: 'add', accuracy: 1, snapShot: 8 } ],
                                       Shuriken : [ { title: 'thrown',  hands: 'dom', strength:  0, damage: { base: 1, mods: 3, type: 'cut' }, rangeBasedOnST: true, halfDamageRange: -5, maximumRange:  0, rangeBasedOnST: 'add', accuracy: 1, snapShot: 8 } ],
                                  KnifeThrowing : [ { title: 'thrown',  hands: 'dom', strength:  0, damage: { base: 1, mods: 3, type: 'cut' }, rangeBasedOnST: true, halfDamageRange: -5, maximumRange:  0, rangeBasedOnST: 'add', accuracy: 1, snapShot: 8 } ] };
Weapons.SonicShuriken.reload = 1;
Weapons.BellySpear =  Weapons.Spear.clone();
Weapons.BellySpear.name = "belly spear";
Weapons.BellySpear.TL = 2;
Weapons.BellySpear.cost = 100;
Weapons.BellySpear.reference = "CII32";
Weapons.BellySpear.notes = ["Half damage when pulled out."];
delete Weapons.BellySpear.wieldOptions.SpearThrower;
Weapons.BoarSpear =  Weapons.Spear.clone();
Weapons.BoarSpear.name = "boar spear";
Weapons.BoarSpear.TL = 3;
Weapons.BoarSpear.reference = "CII32";
Weapons.BoarSpear.wieldOptions.Spear[0].note.splice(1,1);
delete Weapons.BoarSpear.wieldOptions.SpearThrowing;
delete Weapons.BoarSpear.wieldOptions.SpearThrower;
Weapons.BoardingPike =  Weapons.BoarSpear.clone();
Weapons.BoardingPike.name = "boarding pike";
Weapons.BoardingPike.TL = 4;
Weapons.BoardingPike.notes = ["A hooked spear used in Age-of-Sail boarding actions."];
// Butt-Spike
Weapons.Chiang =  Weapons.Spear.clone();
Weapons.Chiang.name = "chiang";
Weapons.Chiang.TL = 3;
Weapons.Fuxina           = new Weapon('fuxina',  5,  80,  0,  4,  -7, 'pole/axe', 'CII32');
Weapons.Fuxina.TL = 2;
Weapons.Fuxina.notes = ["This was a trident used by Roman gladiators.","Damage is thrust+1 impaling for each stabbing point. On an ordinary hit against the body, only one point hits; if the roll is made by 1, two points hit, and if it is made by 2+, all three points hit. DR protects separately. (Against a limb, only one point would hit. Against the head, one point is effective on an ordinary attack, two on a success by 2 or more.)","Because this spear is very tip-heavy, the user is always at a -2 skill penalty."];
Weapons.Fuxina.wieldOptions = { Spear : [ { title: '1 hand',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1',   note: ["Used 1-handed.","Throwable.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                          { title: '2 hands', hands: 'both', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '1,2', note: ["Same spear used 2-handed.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ],
                        SpearThrowing : [ { title: 'thrown',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, accuracy: 2,       halfDamageRange: 1,   maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ] };
Weapons.SouthernTigerFork = Weapons.Fuxina.clone();
Weapons.SouthernTigerFork.name = "southern-tiger fork";
Weapons.SouthernTigerFork.TL = 3;
Weapons.SouthernTigerFork.notes.shift();
Weapons.Hasta =  Weapons.Spear.clone();
Weapons.Hasta.name = "hasta";
Weapons.Hasta.TL = 2;
Weapons.Hasta.reference = "CII32";
Weapons.Kamax =  Weapons.Spear.clone();
Weapons.Kamax.name = "kamax";
Weapons.Kamax.TL = 1;
Weapons.Kamax.reference = "CII32";
Weapons.Kamax.notes = ["The kamax does normal two-handed spear damage (thrust+3 impaling) but has a 2-hex reach when used from horseback against targets on the ground."];
Weapons.Kontos           = new Weapon('kontos',  6,  90,  3,  4,  -6, 'pole/axe', 'CII32');
Weapons.Kontos.notes = ["Cannot parry."];
Weapons.Kontos.wieldOptions = { Spear : [ { title: '2 hands', hands: 'both', strength: 12, damage: { base: 'thr', mods:  4, type: 'imp' }, reach: '2,3' } ] };
Weapons.LongSpear        = new Weapon('spear',  5,  60,  3,  4,  -6, 'pole/axe', 'CII32');
Weapons.LongSpear.detail = 'long';
Weapons.LongSpear.notes = ["Cannot parry."];
Weapons.LongSpear.wieldOptions = { Spear : [ { title: '1 hand',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '2,3', note: ["Used 1-handed.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                             { title: '2 hands', hands: 'both', strength: 10, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '2,3', note: ["Same spear used 2-handed.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ],
                           SpearThrowing : [ { title: 'thrown',  hands:  'dom', strength: 12, damage: { base: 'thr', mods:  2, type: 'imp' }, accuracy: 1,  note: ["Barely throwable; -2 to skill."],  halfDamageRange: 0.5,   maximumRange: 1,  snapShot: 15,  rangeBasedOnST: true } ] };
Weapons.Pike             = new Weapon('pike',  16, 180,  3,  4, -10, 'pole/axe', 'CII32');
Weapons.Pike.notes = ["Cannot parry.","Takes 1 full turn to move point to a new hex.","Anyone carrying a pike is at -3 to DX."];
Weapons.Pike.wieldOptions = { Spear : [ { title: '2 hands', hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '4-6' } ] };
Weapons.Pilum = Weapons.Javelin.clone();
Weapons.Pilum.name = "pilum";
Weapons.Pilum.TL = 2;
Weapons.Pilum.reference = "CII33";
Weapons.Rochin          = new Weapon('rochin',  2,  30,  3,  4,  -6, 'pole/axe', 'CII33');
Weapons.Rochin.wieldOptions = { Spear : [ { title: '1 hand',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' } } ] };
Weapons.Yari =  Weapons.BoarSpear.clone();
Weapons.Yari.name = "yari";
Weapons.Yari.reference = "CII33";
delete Weapons.Yari.wieldOptions.Spear;
Weapons.Yarinage = Weapons.Javelin.clone();
Weapons.Yarinage.name = "yarinage";
Weapons.Yarinage.TL = 3;
Weapons.Yarinage.reference = "CII33";
Weapons.Dart            = new Weapon('dart',  1,  30,  1,  4,  -4,  'pole/axe', 'CII34');
Weapons.Dart.wieldOptions = { SpearThrowing : [ { title: 'thrown',  hands:  'dom', strength:  7, damage: { base: 'thr', mods: -1, type: 'imp' }, accuracy: 3,  halfDamageRange: 2,   maximumRange: 3,  snapShot: 9,  rangeBasedOnST: true,  note: ["Usually launched from a spear thrower."] } ],
                               SpearThrower : [ { title: 'thrower', hands:  'dom', strength:  7, damage: { base: 'thr', mods: -1, type: 'imp' }, accuracy: 3,  halfDamageRange: 2,   maximumRange: 3,  snapShot: 9,  rangeBasedOnST: true } ] };
Weapons.Bo = Weapons.Quarterstaff.clone();
Weapons.Bo.name = "bo";
Weapons.Bo.TL = 1;
Weapons.Bo.reference = "CII34";
Weapons.Bo.notes = ["A man-tall bamboo staff."];
Weapons.Bong = Weapons.Bo.clone();
Weapons.Bong.name = "bong";
Weapons.Bong.notes = ["A Korean quarterstaff."];
Weapons.Muchan          = new Weapon('muchan',  1,  10,  1,  4,  -4, 'mace/cr', 'CII34');
Weapons.Muchan.notes = ["Baton-sized, but used two-handed."];
Weapons.Muchan.wieldOptions = { StaffSkill : [ { title: 'swing',   hands: 'both', strength:  0, damage: { base: 'sw',  mods:  0, type: 'cr'  }, note: ["Parry is ⅔ Staff skill."] },
                                               { title: 'thrust',  hands: 'both', strength:  0, damage: { base: 'thr', mods:  0, type: 'cr'  }, note: ["Parry is ⅔ Staff skill."] } ] };
Weapons.Sodegarami      = new Weapon('sodegarami',  4,  100,  3,  4,  -8, 'mace/cr', 'CII35');
Weapons.Sodegarami.notes = ["A Japanese barbed staff, can be used as a standard staff, or to grapple hair or clothing."];
Weapons.Sodegarami.wieldOptions = { StaffSkill : [ { title: 'grapple', hands: 'both', strength:  6, damage: { base:   u,   mods:  u, type: 'spcl'}, note: ["Parry is ⅔ Staff skill."] },
                                                   { title: 'swing',   hands: 'both', strength:  6, damage: { base: 'sw',  mods:  2, type: 'cr'  }, note: ["Parry is ⅔ Staff skill."] },
                                                   { title: 'thrust',  hands: 'both', strength:  6, damage: { base: 'thr', mods:  2, type: 'cr'  }, note: ["Parry is ⅔ Staff skill."] } ] };
Weapons.Tetsubo         = new Weapon('tetsubo',  10,  100,  3,  4,  -8, 'mace/cr', 'CII35');
Weapons.Tetsubo.notes = ["An iron bar, used as a staff."];
Weapons.Tetsubo.wieldOptions = { StaffSkill : [ { title: 'swing',   hands: 'both', strength:  13, damage: { base: 'sw',  mods:  4, type: 'cr'  }, reach: '1,2', note: ["Parry is ⅔ Staff skill."] },
                                                { title: 'thrust',  hands: 'both', strength:  13, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', note: ["Parry is ⅔ Staff skill."] } ],
                             TwoHandedSword : [ { title: 'swing',   hands: 'both', strength:  13, damage: { base: 'sw',  mods:  4, type: 'cr'  }, reach: '1,2', note: ["Using sword technique with staff.","1 turn to ready after swing."] },
                                                { title: 'thrust',  hands: 'both', strength:  13, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach:   2,   note: ["Using sword technique with staff."] } ] };
Weapons.Toya = Weapons.Quarterstaff.clone();
Weapons.Toya.name = "toya";
Weapons.Toya.TL = 1;
Weapons.Toya.reference = "CII35";
Weapons.Toya.notes = ["An Indonesian staff, usually made of bamboo."];
Weapons.Boomerang       = new Weapon('boomerang',  1,  10,  1,  4,  -3, '', 'CII35');
Weapons.Boomerang.wieldOptions = { ThrowingStick : [ { title: '',  hands: 'dom',  strength: 7, damage: { base: 'sw',  mods:  1, type: 'cr'  },  halfDamageRange: 6, maximumRange: 10,  snapShot: 11,  accuracy: 2,  rangeBasedOnST: true,  note: ['<i>Does not</i> return when thrown.'] } ] };

Weapons.Tonfa           = new Weapon('tonfa',  1,  10,  1,  4,  -4, 'mace/cr', 'CII34');
Weapons.Tonfa.wieldOptions = { Tonfa : [ { title: 'swing',   hands: 'dom', strength:  7, damage: { base: 'sw',  mods:  1, type: 'cr' },               note: ["Parry is ⅔ Tonfa skill."] },
                                         { title: 'thrust',  hands: 'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'cr' }, reach: 'C,1', note: ["Parry is ⅔ Tonfa skill."] } ],
                              Karate : [ { title: 'punch',   hands: 'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'cr' }, reach: 'C',   note: ['Karate (B51) improves all unarmed damage (Add ⅕ of your Karate skill level (round down) to the damage you do.).'] } ] };
Weapons.Gada            = new Weapon('gada',  9,  60,  3,  4,   -6, 'mace/cr', 'CII35');
Weapons.Gada.notes = ["A heavy wooden mace with a round head, from India."];
Weapons.Gada.wieldOptions         = { TwoHandedAxeMace  : [ { title: '',        hands: 'both', strength: 13, damage: { base: 'sw',  mods: 3, type: 'cr' }, reach: '1,2', note: ["1 turn to ready after swing."] },
                                                            { title: 'thrust',  hands:  'dom', strength: 13, damage: { base: 'thr', mods: 2, type: 'cr' },               note: ["1 turn to ready after thrust."] } ] };
Weapons.Claymore = Weapons.ThrustingBastardsword.clone();
Weapons.Claymore.name = "claymore";
delete Weapons.Claymore.detail;
Weapons.Claymore.TL = 3;
Weapons.Claymore.reference = "CII36";
delete Weapons.Claymore.notes;
Weapons.ClaymoreLarge = Weapons.ThrustingGreatsword.clone();
Weapons.ClaymoreLarge.name = "claymore";
Weapons.ClaymoreLarge.detail = 'large';
Weapons.ClaymoreLarge.TL = 3;
Weapons.ClaymoreLarge.reference = "CII36";
delete Weapons.ClaymoreLarge.notes;
Weapons.TwoHandedMacauitl = new Weapon('macauitl',  5,  650,  1,  4,  -5, 'other', 'CII36');
Weapons.TwoHandedMacauitl.detail = 'two-handed';
Weapons.TwoHandedMacauitl.notes = ["Two-handed version is three to five feet long."];
Weapons.TwoHandedMacauitl.wieldOptions = { TwoHandedSword : [ { title: 'swing',   hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["One turn to ready after swing."] },
                                                              { title: 'thrust',  hands:  'dom', strength: 12, damage: { base: 'thr', mods:  0, type: 'cr'  }, reach: '1,2', note: ["Usually blunt."] } ] };
Weapons.SharpTwoHandedMacauitl = new Weapon('macauitl',  5,  700,  1,  4,  -5, 'other', 'CII36');
Weapons.SharpTwoHandedMacauitl.detail = 'sharp two-handed';
Weapons.SharpTwoHandedMacauitl.notes = ["Two-handed version is three to five feet long."];
Weapons.SharpTwoHandedMacauitl.wieldOptions = { TwoHandedSword : [ { title: 'swing',   hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["One turn to ready after swing."] },
                                                                   { title: 'thrust',  hands:  'dom', strength: 12, damage: { base: 'thr', mods:  0, type: 'cut' }, reach: '1,2' } ] };
Weapons.Nodachi         = new Weapon('nodachi',  7,   800,  3,  4,   -6, 'edged', 'CII36');
Weapons.Nodachi.notes = ["A long, slightly-curved Japanese greatsword with a long grip and a blunt tip, usually worn over the shoulder in a back sheath."];
Weapons.Nodachi.wieldOptions = { TwoHandedSword : [ { title: 'swing',   hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cut' }, reach: '1,2' },
                                                    { title: 'thrust',  hands: 'both', strength: 12, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: 2 } ] };
Weapons.ChainWhip       = new Weapon('whip',  3,  50,  3,  4,  -2, '', 'CII36');
Weapons.ChainWhip.detail = 'chain';
Weapons.ChainWhip.unit = 'yd';  Weapons.ChainWhip.continuous = true;
Weapons.ChainWhip.notes = ["Becomes <i>unready</i> if used to parry.","Requires [yds long] turns to ready.","See p. B52; cannot entangle.","Parry is ⅓ of Whip skill."];
Weapons.ChainWhip.wieldOptions = { Whip : [ { title: '',  hands: 'dom',  strength: 12,  damage: { base: 'sw', mods: 1, type: 'cr' },  reach: '1-4' } ] };
Weapons.Urumi           = new Weapon('urumi',  4,  400,  3,  4,  -6, '', 'CII36');
Weapons.Urumi.notes = ["Becomes <i>unready</i> if used to parry.","See p. B52.","Parry is ⅓ of Whip skill."];
Weapons.Urumi.wieldOptions = { Whip : [ { title: '',  hands: 'dom',  strength: 8,  damage: { base: 'sw', mods: -1, type: 'cr' },  reach: '1-3',  maxDamage: '1d+2' } ] };

// Weapons.WeaponKey     = new Weapon('name', weight, cost, TL, LC, bulk, 'pole/axe|edged|mace/cr|bow|gun/bw', 'reference');
Weapons.Arcuballista    = new Weapon('arcuballista', 100, 1000, 3, u, u, 'bow', 'CII37');
Weapons.Arcuballista.notes = ["Fires up to 10 bolts simultaneously; takes 20 turns to reload.","Anyone can fire it, but ST 9 is required to use the rewinding windlass."];
Weapons.Arcuballista.wieldOptions = { Gunner3_Arbalest : [ { strength: 9, hands: u, damage: { base: 3, mods: 0, type: 'imp' },  halfDamageRange: 300,  maximumRange: 1000,  snapShot: u,  accuracy: 2,  rateOfFire: '10/20' } ] };

Weapons.Scorpion        = new Weapon('scorpion', u, '-', 3, u, u, 'bow', 'CII37');
Weapons.Scorpion.notes = ["A heavy crossbow that can be carried by one man; usually requires a crew of two."];
Weapons.Scorpion.wieldOptions = { Gunner3_Arbalest : [ { strength: u, hands: u, damage: { base: 4, mods: 0, type: 'imp' },  halfDamageRange: 400,  maximumRange: 500,  snapShot: u,  accuracy: 5,  rateOfFire: "1/120" } ] };
Weapons.BallistaSmall   = Weapons.Scorpion.clone();
Weapons.BallistaSmall.name = 'ballista';  Weapons.BallistaSmall.detail = 'small';
Weapons.BallistaMedium   = new Weapon('ballista', u, '-', 3, u, u, 'bow', 'CII37');
Weapons.BallistaMedium.detail = 'medium';
Weapons.BallistaMedium.wieldOptions = { Gunner3_Arbalest : [ { strength: u, hands: u, damage: { base: 6, mods: 0, type: 'imp' },  halfDamageRange: 400,  maximumRange: 500,  snapShot: u,  accuracy: 5,  rateOfFire: "1/120" } ] };
Weapons.BallistaLarge    = new Weapon('ballista', u, '-', 3, u, u, 'bow', 'CII37');
Weapons.BallistaLarge.detail = 'large';
Weapons.BallistaLarge.notes = ["Large ballistas fire huge, iron-tipped javelins, and are only built during sieges.","They do from 8d to 5d x 2 impaling damage."];
Weapons.BallistaLarge.wieldOptions = { Gunner3_Arbalest : [ { strength: u, hands: u, damage: { base: 8, mods: 0, type: 'imp' },  halfDamageRange: 400,  maximumRange: 500,  snapShot: u,  accuracy: 5,  rateOfFire: "1/120" } ] };
Weapons.Flamethrower = new Weapon('flamethrower', 200, 1000, 3, u, u, u, 'CII39');
Weapons.Flamethrower.wieldOptions = { FireSiphon : [ { strength: u, hands: 'both', damage: { base: u, mods: 0, type: 'burn' },  halfDamageRange: 15,  maximumRange: 30,  snapShot: u,  accuracy: 7 } ] };
Weapons.TrebuchetSmall    = new Weapon('trebuchet', 1000, 800, 3, u, u, 'other', 'CII37');
Weapons.TrebuchetSmall.detail = 'small';
Weapons.TrebuchetSmall.notes = ["A <i>small</i> trebuchet requires a crew of ten.","It cannot fire at targets closer than 200 yards."];
Weapons.TrebuchetSmall.wieldOptions = { Gunner3_Catapult : [ { strength: u, hands: u, damage: { base: 10, mods: 0, type: 'cr' },  halfDamageRange: 1000,  maximumRange: 1500,  snapShot: u,  accuracy: 1,  rateOfFire: "1/240" } ] };
Weapons.TrebuchetLarge    = new Weapon('trebuchet', u, '-', 3, u, u, 'other', 'CII37');
Weapons.TrebuchetLarge.detail = 'large';
Weapons.TrebuchetLarge.notes = ["See damage rules for <i>Catapults</i>, CII38.","Stats here are for a trebuchet large enough to launch 350-lb stones."];
Weapons.TrebuchetLarge.wieldOptions = { Gunner3_Catapult : [ { strength: u, hands: u, damage: { base: 200, mods: 0, type: 'cr' },  halfDamageRange: 200,  maximumRange: 600,  snapShot: u,  accuracy: 3,  rateOfFire: "1/600" } ] };

Weapons._38Special      = Weapons.Revolver38.clone();
Weapons._38Special.key  = "Revolver38";
Weapons._38Special.name = "Special";
Weapons.Colt45      = Weapons.CM191145ACP.clone();
Weapons.Colt45.key  = "CM191145ACP";
Weapons.Colt45.name = "Colt .45";

for ( var e in Weapons ) {
    if( !Weapons[e].hasOwnProperty('key') ) Weapons[e].key = e;
}

Groups.WeaponsGURPSLite = ['Axe','Baton','Blackjack','Bow','Broadsword','Colt45','CompositeBow',
                           'Crossbow','Dagger','Flail','Glaive','Glock17','GreatAxe','Greatsword',
                           'Halberd','Javelin','KnifeLarge','KnifeSmall',
                           'LightClub','Longbow','Mace','Maul','Morningstar','MsrLuger',
                           'Poleaxe','Prodd','Quarterstaff','Rapier','RemingtonM870_12G','Revolver38','Revolver44M',
                           'Saber','Shortsword','ShortBow','Sling','Smallsword','Spear','StaffSling',
                           'ThrowingAxe','WltrPPK'];


/****  Templates  ****/

/* CharacterTypes are random character generator type 'templates'
  attributes: the sum ST + DX + IQ + HT should equal zero.
  Skills and Traits should be subsets of those found in GURPS Lite.
*/
var CharacterTypes = {};
CharacterTypes.rando = {
  attributes: { ST: 0, IQ: 0, DX: 0, HT: 0 },
  ads: AdsGURPSLite,
  disads: DisadsGURPSLite,
  skills: SkillsGURPSLite,
  wpnNum: 1,
  wpnBudg: 0.25,    // this means Rando can spend up to 25% of his/her Starting Wealth (based on TL) on a weapon
  weapons: Groups.WeaponsGURPSLite,
  armNum: 0.5,    // this means Rando is only 50% likely to have any armor
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite,
  sldNum: 0,
  shields: [],
  eqpNum: 4,
  eqpBudg: 0.2,
  equipment: Object.keys( BasicEquipment ).filter( function(e) { return (BasicEquipment[e].weight<=10 ) ? true : false; } )
};
CharacterTypes.brick = {
  attributes: { ST: 2, IQ: -1, DX: -1, HT: 1 },
  ads: ['HighPainThreshold','Toughness','HardtoKill'],
  disads: ['BadTemper','Bully','Fat',
           'Overconfidence','Overweight','AppearanceUgly','AppearanceUnattractive'],
           /* not in GURPS Lite: ['Bloodlust','Berserk','Clueless','EasyToRead','Gullibility',] */
  skills: ['Brawling','Karate','Wrestling','Intimidation'],   // weapon skills added later
           /* not in GURPS Lite: ['Carousing','Lifting',] */
  wpnNum: 2,
  wpnBudg: 0.5,
  weapons: Groups.WeaponsGURPSLite.filter( function(w) { var Wpn=Weapons[w]; return ( Wpn.strength()>=11 || Wpn.TL>4 ) ? true : false; } ),
  armNum: 1,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite,
  sldNum: 1,
  shields: ['MediumShield','LargeShield','ForceShield'],
  eqpNum: 1,
  equipment: Groups.weapongear.concat(['Torch','Flashlight','FlashlightHvy','GunKit','binoculars2x','WalkieTalkie'])
};
CharacterTypes.twitchy = {
  attributes: { ST: 0, IQ: -2, DX: 2, HT: 0 },
  ads: ['CombatReflexes','DangerSense','Ambidexterity','Fit'],
  disads: ['Impulsiveness','Overconfidence','OntheEdge','Curious','Alcoholic'],
  skills: ['FastTalk','FastDraw','Carousing','Brawling','Judo','Riding_horse','SexAppeal','Jumping','Throwing'],
  wpnNum: 2,
  wpnBudg: 0.25,
  weapons: Groups.WeaponsGURPSLite.filter( function(w) { return (Weapons[w].weight<=5 ) ? true : false; } ),
  armNum: 0.5,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite.filter( function(a) { return (ArmorItems[a].weight<=20 ) ? true : false; } ),
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: ['oil1pt','wineskin1gal','ration','woolblanket','backpack','Whetstone']
};
CharacterTypes.ranger = {
  attributes: { ST: 0, IQ: 0, DX: 0, HT: 0 },
  ads: ['AbsoluteDirection','AcuteHearing','AcuteVision','CommonSense','CombatReflexes','DangerSense',
        'NightVision','Toughness'],  // not in GURPS Lite: 'Fit','CulturalAdaptability',
  disads: ['CodeofHonor','Honesty','SenseOfDuty','Stubborn','Truthfulness','Vow'],
            // not in GURPS Lite: 'Curious','Enemy','Innumerate','Loner','OntheEdge','Paranoia','Secret','Shyness',
  skills: ['Astronomy','Boating','Brawling','Camouflage','Climbing','Driving','FirstAid','Jumping',
           'Naturalist','Navigation','Piloting','Riding_horse','Stealth','Survival','Swimming','Tactics',
           'Throwing','Tracking'],  // not in GURPS Lite: 'Fishing','Hiking','Mimicry',
  wpnNum: 1,
  wpnBudg: 0.6,
  weapons: Groups.WeaponsGURPSLite,
  armNum: 1,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite.filter(
           function(a) { return (ArmorItems[a].weight<=20 ) ? true : false; }
         ).concat(['LeatherJacket','Boots','LeatherGloves']),
  sldNum: 0,
  shields: [],
  reqdEquip: ['backpack','Rations','PersonalBasics'],
  eqpNum: 2,
  equipment: Groups.campinggear.concat(Groups.food,Groups.thiefgear,Groups.weapongear).filter(
               function(a) { return (BasicEquipment[a].weight<10) ? true : false; }
             )
};
CharacterTypes.thief = {
  attributes: { ST: -1, IQ: 0, DX: 1, HT: -1 },
  ads: ['AbsoluteDirection','AcuteHearing','Charisma','DangerSense','DoubleJointed','Fearlessness',
        'Luck','NightVision','PerfectBalance'],
  // not in GURPS Lite: 'Flexibility',
  disads: ['Coward','Greed','Impulsiveness','Lazy','Overconfidence','Skinny','Stubborn'],
  // not in GURPS Lite: 'Curious','CombatParalysis','Enemy','Kleptomania','Paranoia',,'Trickster'
  skills: ['Acrobatics','Brawling','Climbing','Disguise','Escape','FastTalk','Forgery','Holdout',
           'Jumping','Lockpicking','Merchant','Pickpocket','Shadowing','Stealth','Streetwise',
           'Throwing','Traps'],
           // not in e3lite: 'DetectLies','Filch','LipReading','Poisons','Scrounging',
  wpnNum: 1,
  wpnBudg: 0.25,
  weapons: Groups.WeaponsGURPSLite.filter( function(w) { if(Weapons[w].bulk && Weapons[w].bulk<-2) return false; return (Weapons[w].weight<=2) ? true : false; } ),
  armNum: 0.5,
  armBudg: 0.25,
  armor: Groups.ArmorGURPSLite.filter( function(a) { return ( ArmorItems[a].weight<=15 ) ? true : false; } ),
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Groups.thiefgear.concat(['purse','pouch'])
};
CharacterTypes.investigator = {
  attributes: { ST: -1, IQ: 1, DX: 0, HT: 0 },
  ads: ['Alertness','Appearance','Charisma','DangerSense','LanguageTalent','LegalEnforcementPowers',
        'Literacy','Luck','RapidHealing','SingleMinded','StrongWill','Toughness','WealthComfortablex2'],
  disads: ['CompulsiveBehavior','Duty','Greed','Honesty','Overconfidence','Pacifism','SenseOfDuty',
           'Stubborn','PovertyStrugglingx12'],
  skills: ['Climbing','Stealth','Criminology','Disguise','ElectronicsOperation','Holdout','Law',
           'Interrogation','Lockpicking','Occultism','Photography','Research','Shadowing',
           'Traps','Writing','Pickpocket','ComputerProgramming','Diagnosis','Brawling',
           'FastTalk','SexAppeal','Acrobatics','Karate','AreaKnowledge','ComputerOperation','Acting',
           'Swimming','Boating','Driving','Piloting','Riding_horse','Streetwise','Running'],
           //  not in GURPS Lite: 'Carousing',
  langNum: 2,
  languages: ['French','Latin','Greek','German','Hieroglyphics','Hebrew'],
  wpnNum: 1,
  wpnBudg: 0.25,
  weapons: Object.keys(Weapons).filter( function(w) { return ( Weapons[w].qualityEffectGroup && Weapons[w].qualityEffectGroup.match(/gun/gi) /*&& Weapons[w].weight<=2.5*/ ) ? true : false; } ),
  armNum: 0,
  armBudg: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 4,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.watermage = {
  attributes: { ST: -1, IQ: 2, DX: -1, HT: -1 },
  requiredAds: ['Magery'],
  ads: ['Charisma','Flexibility','Intuition','StrongWill','Versatile','ExtraFatigue'],
  disads: ['Overconfidence','Callous','Coward','Indecisive','Selfish'],
  skills: ['ControlWaterElemental','CreateWater','CreateWaterElemental','DestroyWater','Fog',
           'IceSphere','PurifyWater','SeekWater','ShapeWater','SummonWaterElemental','WalkonWater',
           'SpellThrowing_IceSphereStoneMissile'],
  wpnNum: 0,
  weapons: [],
  armNum: 0.25,
  armBudg: 0.25,
  armor: ['ClothArmorSuit','LeatherJacket','LightLeatherArmor','LeatherArmorSuit',
          'LightKevlar','HeavyKevlar','LightBodyArmor'],
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.stormmage = {
  attributes: { ST: -1, IQ: 1, DX: 0, HT: -1 },
  requiredAds: ['Magery'],
  ads: ['Luck','AppearanceAttractive','AbsoluteDirection','AcuteVision','Daredevil','PerfectBalance',
        'Charisma','Intuition','StrongWill','ExtraFatigue'],
  disads: ['Overconfidence','Callous','Impulsiveness','LowEmpathy','ManicDepressive'],
  skills: ['ControlAirElemental','CreateAir','CreateAirElemental','Lightning','PredictWeather',
           'PurifyAir','ShapeAir','SummonAirElemental','WalkonAir','ControlWaterElemental',
           'CreateWater','CreateWaterElemental','DestroyWater','Fog','IceSphere','PurifyWater',
           'SeekWater','ShapeWater','SummonWaterElemental','WalkonWater','SpellThrowing_Lightning',
           'SpellThrowing_IceSphereStoneMissile'],
  wpnNum: 0,
  weapons: [],
  armNum: 0.25,
  armBudg: 0.25,
  armor: ['ClothArmorSuit','LeatherJacket','LightLeatherArmor','LeatherArmorSuit',
          'LightKevlar','HeavyKevlar','LightBodyArmor'],
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.airmage = {
  attributes: { ST: -2, IQ: 1, DX: 1, HT: -2 },
  requiredAds: ['Magery'],
  ads: ['Luck','AppearanceAttractive','AbsoluteDirection','AcuteVision','Daredevil','PerfectBalance','ExtraFatigue'],
  disads: ['Overconfidence','Impulsiveness','AbsentMinded','LowEmpathy','ManicDepressive',
           'Skinny','Gullibility'],
  skills: ['ControlAirElemental','CreateAir','CreateAirElemental','Lightning','PredictWeather',
           'PurifyAir','ShapeAir','SummonAirElemental','WalkonAir','SpellThrowing_Lightning'],
  wpnNum: 0,
  weapons: [],
  armNum: 0,
  armBudg: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.firestormmage = {
  attributes: { ST: -2, IQ: 1, DX: 1, HT: -2 },
  requiredAds: ['Magery'],
  ads: ['Luck','AppearanceAttractive','Daredevil','PerfectBalance','Charisma','ExtraFatigue'],
  disads: ['AbsentMinded','BadTemper','Clueless','Gullibility','Impulsiveness',
           'LowEmpathy','ManicDepressive','Overconfidence','Pyromania','Skinny'],
  skills: ['ControlAirElemental','CreateAir','CreateAirElemental','Lightning','PredictWeather',
           'PurifyAir','ShapeAir','SummonAirElemental','WalkonAir',
           'Cold','ControlFireElemental','CreateFire','CreateFireElemental','ExtinguishFire',
           'Fireball','Heat','IgniteFire','ResistFire','ShapeFire','SummonFireElemental',
           'SpellThrowing_Lightning','SpellThrowing_Ball'],
  wpnNum: 0,
  weapons: [],
  armNum: 0.25,
  armBudg: 0.25,
  armor: ['ClothArmorSuit','LeatherJacket','LightLeatherArmor','LeatherArmorSuit',
          'LightKevlar','HeavyKevlar','LightBodyArmor'],
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.firemage = {
  attributes: { ST: -2, IQ: 2, DX: 0, HT: -2 },
  requiredAds: ['Magery'],
  ads: ['Charisma','AppearanceAttractive','Daredevil','ExtraFatigue'],
  disads: ['BadTemper','Overconfidence','Sadism','Clueless','Impulsiveness','Pyromania'],
  skills: ['Cold','ControlFireElemental','CreateFire','CreateFireElemental','ExtinguishFire',
           'Fireball','Heat','IgniteFire','ResistFire','ShapeFire','SummonFireElemental',
           'SpellThrowing_Ball'],
  wpnNum: 0,
  weapons: [],
  armNum: 0.25,
  armBudg: 0.25,
  armor: ['ClothArmorSuit','LeatherJacket','LightLeatherArmor','LeatherArmorSuit',
          'LightKevlar','HeavyKevlar','LightBodyArmor'],
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.lavamage = {
  attributes: { ST: -1, IQ: 1, DX: 0, HT: -1 },
  ads: ['Charisma','Daredevil','SingleMinded','StrongWill','ExtraFatigue'],
  requiredAds: ['Magery'],
  disads: ['BadTemper','Clueless','Gullibility','Impulsiveness','Oblivious','Overconfidence',
           'Pyromania','Sadism','Stubborn','Truthfulness'],
  skills: ['Cold','ControlFireElemental','CreateFire','CreateFireElemental','ExtinguishFire',
           'Fireball','Heat','IgniteFire','ResistFire','ShapeFire','SummonFireElemental',
           'ControlEarthElemental','CreateEarth','CreateEarthElemental','EarthtoAir','EarthtoStone',
           'EarthVision','SeekEarth','ShapeEarth','StoneMissile','StonetoFlesh',
           'SummonEarthElemental','SpellThrowing_Ball','SpellThrowing_IceSphereStoneMissile'],
  wpnNum: 0,
  weapons: [],
  armNum: 0.5,
  armBudg: 0.25,
  armor: ['ClothArmorSuit','LeatherJacket','LightLeatherArmor','LeatherArmorSuit',
          'LightKevlar','HeavyKevlar','LightBodyArmor'],
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: []
};
CharacterTypes.earthmage = {
  attributes: { ST: -1, IQ: 2, DX: -1, HT: -1 },
  requiredAds: ['Magery'],
  ads: ['CommonSense','SingleMinded','StrongWill','ExtraFatigue'],
  disads: ['AppearanceUnattractive','Overconfidence','Stubborn','Clueless','Oblivious',
           'Truthfulness','EasyToRead','Gullibility','Hidebound','Overweight'],
  skills: ['ControlEarthElemental','CreateEarth','CreateEarthElemental','EarthtoAir',
           'EarthtoStone','EarthVision','SeekEarth','ShapeEarth','StoneMissile',
           'StonetoFlesh','SummonEarthElemental','SpellThrowing_IceSphereStoneMissile'],
  wpnNum: 0,
  weapons: [],
  armNum: 0.75,
  armBudg: 0.25,
  armor: ['ClothArmorSuit','LeatherJacket','LightLeatherArmor','LeatherArmorSuit',
          'LightKevlar','HeavyKevlar','LightBodyArmor'],
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.spring_mage = {
  attributes: { ST: -1, IQ: 1, DX: 0, HT: -1, HP: 0, Will: 0, Per: 0, FP: 1, Speed: 0, Move: 0 },
  requiredAds: ['Magery'],
  ads:    ['AbsoluteDirection','CommonSense','Intuition','StrongWill','ExtraFatigue'],
  disads: ['Overconfidence','Selfish','Stubborn','Truthfulness'],
  skills:  removeDups( Groups.WaterSpells.concat( Groups.EarthSpells ) ),
  wpnNum: 0,
  weapons: [],
  armNum: 0.5,
  armBudg: 0.25,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Object.keys( BasicEquipment ),
  themes: ['blue','brown','purple','water'],
};

//CharacterTypes.scout = {};
/*CharacterTypes.none = {
  attributes: { ST: 0, IQ: 0, DX: 0, HT: 0 },
  ads: [],
  disads: [],
  skills: [],
  wpnNum: 1,
  weapons: [],
  armNum: 1,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: []
};*/


// moving templates to the bottom because it is just barely conceivable that they might be able to contain equipment.
var Templates = {};


Templates._blank = {
  name  : '',
  value :  0,		// set here, or calculate as a derived quantity?  SET, I want this to reflect the original, unchanging value.  Also makes a useful checksum.
  ref   : '',
  traits : [
    // attribute & 2nd char mods (added using the Traits in this library for that purpose, e.g. IncreasedHT, ReducedHitPoints, DecreasedBasicMove)
    // traits, by referring to Basic Library Trait objects, i.e.
    // Traits.key.clone(),
    // new Trait('name',type,PMS,cost,[levels]);		// any Traits defined here MUST be given a key below, INCLUDING QUIRKS
  ],
  metatraits : [],
  skills : [],
  adjustments : []  // no need to add these for existing traits; they should already apply - reserve for traits defined inside the template
};
// Then levels, descriptions, etc. for objects included inside Template object, i.e.
// Templates._blank.traits[n].levels = ##;
// Templates._blank.traits[n].description = "text";

/*  Should these become a data class?

    Templates.Vulcan = new Template( 'Vulcan', 120, 'GURPS Space, pg 45' );
    Templates.Vulcan.traits = [
        Traits.RacialSTModifier.clone(),
        Traits.RacialIQModifier.clone(),
        etc.
    ];

    Not very much advantage to this, unless I come up with some clever class methods.
*/


/*  These fantasy race templates are mostly from Fantasy Folk, 2nd edition.
    I felt that a few standard races were needed here. */



Templates.Dwarf = {
  name  : 'Dwarf',
  value :  40,
  art   : '../images/lineart/g33.png',
  artX  : '../images/lineart/g23.png',
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
Templates.Dwarf.traits[0].levels  =  2;  // +2 ST
Templates.Dwarf.traits[1].levels  =  2;  // +2 Fatigue
Templates.Dwarf.traits[2].levels  =  1;  // +1 DR
Templates.Dwarf.traits[3].levels  =  1;  // Extended Lifespan +1
Templates.Dwarf.traits[5].levels  =  1;  // Hard to Kill +1
Templates.Dwarf.traits[7].key     =  'CraftsTalent';  // keys are undefined for de novo Trait objects
Templates.Dwarf.traits[7].levels  =  3;  // Craft skills +3
Templates.Dwarf.traits[10].levels =  1;  // Reduced Move -1
Templates.Dwarf.traits[10].description = 'running';  // Reduced Move mode
Templates.Dwarf.traits[11].key = 'Q1';
Templates.Dwarf.traits[12].key = 'Q2';
Templates.Dwarf.traits[13].key = 'Q3';
Templates.Dwarf.skills[0].points  =  4;  // Axe/Mace at DX+1 (4 pts)
Templates.Dwarf.skills[1].points  =  2;  // Merchant at IQ   (2 pts)

Templates.ElfBasic = {
  name : 'Elf',
  value : 40,
  art   : '../images/lineart/g21.gif',
  artX  : '../images/lineart/g16.gif',
  ref : "B3E11",
  traits : [
    Traits.RacialDXModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.RacialSTModifier.clone(),
    Traits.CombatReflexes.clone(),
    Traits.Magery.clone(),
  ]
};
Templates.ElfBasic.traits[0].levels =  1;  // +1 DX
Templates.ElfBasic.traits[1].levels =  1;  // +1 IQ
Templates.ElfBasic.traits[2].levels = -1;  // -1 ST
Templates.ElfBasic.traits[4].levels =  1;  // Magery 1

Templates.ElfFF = {
  name : 'Elf',
  value : 40,
  art   : '../images/lineart/g21.gif',
  artX  : '../images/lineart/g16.gif',
  ref : "FF2E58",
  traits : [
    Traits.RacialDXModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.Appearance.clone(),
    Traits.CombatReflexes.clone(),
    Traits.Magery.clone(),
    Traits.MusicalAbility.clone(),
    Traits.Unaging.clone(),
    new Trait( "Elven skill bonuses (Bard, Savoir-Faire)", 'A', 'M' , 3 ),
    Traits.RacialSTModifier.clone(),
    Traits.CodeofHonor.clone(),
    Traits.SenseOfDuty.clone(),
  ],
  adjustments : [
    { from: 'ElvenskillbonusesBardSavoirFaire', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'Bard' },
    { from: 'ElvenskillbonusesBardSavoirFaire', fromCategory: 'AD', amount: 2, targetCategory: 'SK', target: 'SavoirFaire' },
  ]
};
Templates.ElfFF.traits[0].levels =  1;  // +1 DX
Templates.ElfFF.traits[1].levels =  1;  // +1 IQ
Templates.ElfFF.traits[2].levels =  1;  // +1 Appearance - Attractive
Templates.ElfFF.traits[4].levels =  1;  // Magery 1
Templates.ElfFF.traits[5].levels =  2;  // Musical Ability 2
Templates.ElfFF.traits[7].key = 'ElvenskillbonusesBardSavoirFaire';  // keys are undefined for de novo Trait objects
Templates.ElfFF.traits[8].levels = -1;  // -1 ST
Templates.ElfFF.traits[9].description = "live an elegant life";
Templates.ElfFF.traits[9].levels =  2;
Templates.ElfFF.traits[10].description = "nature";
Templates.ElfFF.traits[10].levels =  3;

Templates.HalfElf = {
  name  : 'Half-Elf',
  value : 30,
  art   : '../images/lineart/g21.gif',
  artX  : '../images/lineart/g16.gif',
  ref   : "FF2E58",
  traits : [
    Traits.RacialIQModifier.clone(),
    Traits.Magery.clone(),
    Traits.ExtendedLifespan.clone(),
  ],

};
Templates.HalfElf.traits[0].levels = 1;  // +1 IQ
Templates.HalfElf.traits[1].levels = 1;  // Magery 1
Templates.HalfElf.traits[2].levels = 1;  // Extended Lifespan level 1

Templates.Gnome = {
  name  : 'Gnome',
  value :  25,
  art   : '../images/lineart/g13.gif',
  artX  : '../images/lineart/g43.png',
  ref   : 'FF2E50',
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
Templates.Gnome.traits[0].levels =  1;  // +1 DR
Templates.Gnome.traits[2].levels =  1;  // +1 FP
Templates.Gnome.traits[3].levels =  1;  // Hard to Kill +1
Templates.Gnome.traits[5].levels =  4;  // Soft Craft skills +4
Templates.Gnome.traits[5].key = "SoftCraftsTalent";
Templates.Gnome.traits[6].levels =  1;  // Reduced Move -1
Templates.Gnome.traits[6].description = 'running';  // Reduced Move mode
Templates.Gnome.traits[7].key = "Quirk1";
Templates.Gnome.traits[8].key = "Quirk2";
Templates.Gnome.traits[9].key = "Quirk3";

Templates.Goblin = {
  name : 'Goblin',
  value : 5,
  art   : '../images/lineart/g24.png',
  artX  : '../images/lineart/g14.gif',
  ref : "FF2E86",
  traits : [
    Traits.RacialDXModifier.clone(),
    Traits.RacialIQModifier.clone(),
    Traits.NightVision.clone(),
    Traits.RacialSTModifier.clone(),
    Traits.Impulsiveness.clone(),
  ],
};
Templates.Goblin.traits[0].levels =  1;  // +1 DX
Templates.Goblin.traits[1].levels =  1;  // +1 IQ
Templates.Goblin.traits[3].levels = -2;  // -2 ST

Templates.Halfling = {
  name  : 'Halfling',
  value : 10,
  art   : '../images/lineart/g13.gif',
  artX  : '../images/lineart/g43.png',
  ref   : "FF2E95",
  traits : [
    Traits.RacialSTModifier.clone(),
    Traits.RacialDXModifier.clone(),
    Traits.RacialHTModifier.clone(),
    Traits.Reputation.clone(),
    Traits.Silence.clone(),
    new Trait( "Halfling skill bonus: +2 to Bow", 'A', 'P' , 4 ),
    new Trait( "Halfling skill bonus: +2 to Sling", 'A', 'P' , 4 ),
    new Trait( "Halfling skill bonus: +2 to Throwing", 'A', 'P' , 4 ),
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
Templates.Halfling.traits[0].levels = -3;  // -3 ST
Templates.Halfling.traits[1].levels =  1;  // +1 DX
Templates.Halfling.traits[2].levels =  1;  // +1 HT
Templates.Halfling.traits[3].levels =  1;  // +1 reaction
Templates.Halfling.traits[3].description = "good neighbors";
Templates.Halfling.traits[4].levels =  1;  // Silence 1
Templates.Halfling.traits[5].key    = "HalflingBowBonus";
Templates.Halfling.traits[6].key    = "HalflingSlingBonus";
Templates.Halfling.traits[7].key    = "HalflingThrowingBonus";
Templates.Halfling.traits[8].description = "hospitality";
Templates.Halfling.traits[8].levels =  1;
Templates.Halfling.traits[10].levels =  1;  // Reduced Move -1
Templates.Halfling.traits[10].description = 'running';  // Reduced Move mode
Templates.Halfling.traits[11].key = 'Q1';
Templates.Halfling.skills[0].points =  4;  // Stealth at DX+1 (4 pts)

Templates.Orc = {
  name  : 'Orc',
  value : -10,
  art   : '../images/lineart/g25.png',
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
Templates.Orc.traits[0].levels =  2;  // +2 HT
Templates.Orc.traits[1].levels =  1;  // +1 HP
Templates.Orc.traits[2].levels =  2;  // Acute Hearing +2
Templates.Orc.traits[3].levels = -2;  // -2 IQ
Templates.Orc.traits[4].levels =  2;  // 'thoroughly' Intolerant
Templates.Orc.traits[5].levels = -3;  // -3 reputation
Templates.Orc.skills[0].points =  1;  // Brawling at DX (1 pt)


for ( var t in Templates ) {
    if( !Templates[t].hasOwnProperty('key') ) Templates[t].key = t;
};
// special symbols: ≤ ≥ ± × ÷ « » ° ⁰ ⁱ ² ³ ∞ 
