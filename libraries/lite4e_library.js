//alert('loading the GURPS Lite 4th edition rules library');
var libraryName = 'GURPS Lite 4th edition';
var libraryList = [libraryName];
var ruleset = 'e4lite';
var defaultTL = 8;
var StartingWealth_for_TL = [250,500,750,1000,2000,5000,10000,15000,20000,30000,50000,75000,100000];  // Lite4e pg18
var TechLevelOptionsList = [
    { text: 'Stone Age (0)',      value: 0,  title: 'Prehistory and later' },
    { text: 'Bronze Age (1)',     value: 1,  title: '3500 B.C.+' },
    { text: 'Iron Age (2)',       value: 2,  title: '1200 B.C.+' },
    { text: 'Medieval (3)',       value: 3,  title: '600 A.D.+' },
    { text: 'Age of Sail (4)',    value: 4,  title: '1450+' },
    { text: 'Industrial (5)',     value: 5,  title: '1730+' },
    { text: 'Mechanized Age (6)', value: 6,  title: '1880+' },
    { text: 'Nuclear Age (7)',    value: 7,  title: '1940+' },
    { text: 'Digital Age (8)',    value: 8,  title: '1980+' },
    { text: 'Microtech Age (9)',  value: 9,  title: '2025+?' },
    { text: 'Robotic Age (10)',   value: 10, title: '2070+?' },
    { text: 'Exotic Matter (11)', value: 11, title: 'GM discretion' },
    { text: 'Tech Level 12',      value: 12, title: 'GM discretion' },
    { text: 'Tech Level 13',      value: 13, title: 'GM discretion' },
    { text: 'Tech Level 14',      value: 14, title: 'GM discretion' },
    { text: 'Tech Level 15',      value: 15, title: 'GM discretion' }
];  // Lite4e p18
var TechLevelOptionsCompactList = [
    { text: '0',  value: 0,  title: 'Stone Age: Prehistory and later' },
    { text: '1',  value: 1,  title: 'Bronze Age: 3500 B.C.+' },
    { text: '2',  value: 2,  title: 'Iron Age: 1200 B.C.+' },
    { text: '3',  value: 3,  title: 'Medieval: 600 A.D.+' },
    { text: '4',  value: 4,  title: 'Age of Sail: 1450+' },
    { text: '5',  value: 5,  title: 'Industrial: 1730+' },
    { text: '6',  value: 6,  title: 'Mechanized Age: 1880+' },
    { text: '7',  value: 7,  title: 'Nuclear Age: 1940+' },
    { text: '8',  value: 8,  title: 'Digital Age: 1980+' },
    { text: '9',  value: 9,  title: 'Microtech Age: 2025+?' },
    { text: '10', value: 10, title: 'Robotic Age: 2070+?' },
    { text: '11', value: 11, title: 'Exotic Matter: GM discretion' },
    { text: '12', value: 12, title: 'Tech Level 12: GM discretion' },
    { text: '13', value: 13, title: 'Tech Level 13: GM discretion' },
    { text: '14', value: 14, title: 'Tech Level 14: GM discretion' },
    { text: '15', value: 15, title: 'Tech Level 15: GM discretion' }
];  // Lite4e p18
var TL_StartingWealth_OptionsList = [
    { text: '0  ($250)',     value: 250,    title: 'Stone Age: Prehistory and later' },
    { text: '1  ($500)',     value: 500,    title: 'Bronze Age: 3500 B.C.+' },
    { text: '2  ($750)',     value: 750,    title: 'Iron Age: 1200 B.C.+' },
    { text: '3  ($1,000)',   value: 1000,   title: 'Medieval: 600 A.D.+' },
    { text: '4  ($2,000)',   value: 2000,   title: 'Age of Sail: 1450+' },
    { text: '5  ($5,000)',   value: 5000,   title: 'Industrial: 1730+' },
    { text: '6  ($10,000)',  value: 10000,  title: 'Mechanized Age: 1880+' },
    { text: '7  ($15,000)',  value: 15000,  title: 'Nuclear Age: 1940+' },
    { text: '8  ($20,000)',  value: 20000,  title: 'Digital Age: 1980+' },
    { text: '9  ($30,000)',  value: 30000,  title: 'Microtech Age: 2025+?' },
    { text: '10 ($50,000)',  value: 50000,  title: 'Robotic Age: 2070+?' },
    { text: '11 ($75,000)',  value: 75000,  title: 'Exotic Matter: GM discretion' },
    { text: '12 ($100,000)', value: 100000, title: 'Tech Level 12: GM discretion' }
];  // Lite4e p18
var LegalityClassOptionsList = [
    { text: 'Open (4)',       value: 4,  title: 'Computer; sword; shotgun; motor scooter' },
    { text: 'Licensed (3)',   value: 3,  title: 'Automobile; handgun; hunting rifle' },
    { text: 'Restricted (2)', value: 2,  title: 'Assault rifle; armored vehicles' },
    { text: 'Military (1)',   value: 1,  title: 'Anti-tank weapons; fighting vehicles' },
    { text: 'Banned (0)',     value: 0,  title: 'nuclear and biological weapons' }
];  // not in Lite4e (leave for tool compatibility)
var DamageTypeOptionsList = [
  //  { text: 'affliction',     value: 'aff' },
    { text: 'burning',        value: 'burn' },
  //  { text: 'corrosion',      value: 'cor' },
    { text: 'crushing',       value: 'cr' },
    { text: 'cutting',        value: 'cut' },
  //  { text: 'fatigue',        value: 'fat' },
    { text: 'impaling',       value: 'imp' },
    { text: 'small piercing', value: 'pi-' },
    { text: 'piercing',       value: 'pi' },
    { text: 'large piercing', value: 'pi+' }
  //  { text: 'huge piercing',  value: 'pi++' },
  //  { text: 'special',        value: 'spec' },
  //  { text: 'toxic',          value: 'tox' }
];  // Lite4e p19
var QualityEffectGroupOptionsList = [
    { text: 'other',                 value: '' },
    { text: 'blades',                value: 'blade' },
    { text: 'cutting non-blade',     value: 'cut' },
    { text: 'crushing or impaling',  value: 'cr/imp' },
    { text: 'muscle-powered ranged', value: 'bow' },
    { text: 'firearms',              value: 'gun' }
];  // not in Lite4e (leave for tool compatibility)
var ShieldSkillsOptionsList = [
    { text: 'Shield', value: 'Shield_Shield' },
    { text: 'Shield (Buckler)',  value: 'Shield_Buckler' },
    { text: 'Shield (Force)', value: 'Shield_Force' }
];  // not in Lite4e (leave for tool compatibility)
var AttributeOptionsList = [
    { text: 'ST',   value: 'ST' },
    { text: 'DX',   value: 'DX' },
    { text: 'IQ',   value: 'IQ' },
    { text: 'HT',   value: 'HT' },
    { text: 'Will', value: 'Will' },
    { text: 'Per',  value: 'Per' }
];


/****  traits and traits  ****/
Traits = {};

/*  The 'group' flag
  indicates a set of ads/disads from which a character may only take one instance.
  A character cannot, for instance, be both 'attractive' and 'hideous'.
*/

// physical appearance group (done for 4e)
Traits.VeryBeautiful = new Trait( "Very Beautiful", 'A', 'P', 16, false, "LI4E7" );
Traits.VeryBeautiful.group = 'appearance';
Traits.VeryBeautiful.description = true;
Traits.VeryHandsome  = new Trait( "Very Handsome", 'A', 'P', 16, false, "LI4E7" );
Traits.VeryHandsome.group = 'appearance';
Traits.VeryHandsome.description = true;
Traits.Beautiful     = new Trait( "Beautiful", 'A', 'P', 12, false, "LI4E7" );
Traits.Beautiful.group = 'appearance';
Traits.Beautiful.description = true;
Traits.Handsome      = new Trait( "Handsome", 'A', 'P', 12, false, "LI4E7" );
Traits.Handsome.group = 'appearance';
Traits.Handsome.description = true;
Traits.Attractive    = new Trait( "Attractive", 'A', 'P', 4, false, "LI4E7" );
Traits.Attractive.group = 'appearance';
Traits.Attractive.description = true;
Traits.Unattractive  = new Trait( "Unattractive", 'D', 'P', -4, false, "LI4E6" );
Traits.Unattractive.group = 'appearance';
Traits.Unattractive.description = true;
Traits.Ugly          = new Trait( "Ugly", 'D', 'P', -8, false, "LI4E6" );
Traits.Ugly.group = 'appearance';
Traits.Ugly.description = true;
Traits.Hideous       = new Trait( "Hideous", 'D', 'P', -16, false, "LI4E6" );
Traits.Hideous.group = 'appearance';
Traits.Hideous.description = true;

// could do this way
Traits.Appearance          = new Trait( "Appearance" , 'AD', 'P', 4, true, "LI4E6" );
Traits.Appearance.group = 'appearance';
Traits.Appearance.mods = 'Appearance';
Traits.Appearance.hasLevels = true;
Traits.Appearance.posNegLevels = true;
Traits.Appearance.lowestLevel = -6;
Traits.Appearance.highestLevel = 5;
Traits.Appearance.levelNames
    = [ 'Horrific','Monstrous','Hideous','Revolting','Ugly','Unattractive','Average',
        'Attractive','Good-Looking','Handsome/Beautiful','Very Handsome/Beautiful','Transcendent'];
// If I do it this way, I could define the various separate ads above and below by cloning from this one.
// How to clone just a single level of a trait with levels?  (Analogous to similar problem with Skills)
// Then Adjustments could be done more simply:
// Adjustments.whatever_from_appearance = { from: 'Appearance', fromCat: 'AD', amount: 1, targetCat: 'SK', target: 'whatever' }
// This would get you a bonus (or penalty) equal to the level associated with that appearance.

Traits.AcuteVision         = new Trait( "Acute Vision", 'A', 'P', 2, true, "LI4E8" );
Traits.AcuteVision.group = 'vision';
Traits.AcuteHearing        = new Trait( "Acute Hearing", 'A', 'P', 2, true, "LI4E8" );
Traits.AcuteHearing.group = 'hearing';
Traits.AcuteTasteSmell     = new Trait( "Acute Taste/Smell", 'A', 'P', 2, true, "LI4E8" );
Traits.AcuteTouch          = new Trait( "Acute Touch", 'A', 'P', 2, true, "LI4E8" );
Traits.Ambidexterity       = new Trait( "Ambidexterity", 'A', 'P', 5, false, "LI4E8" );
Traits.AnimalEmpathy       = new Trait( "Animal Empathy", 'A', 'M', 5, false, "LI4E8" );
Traits.ArtificerTalent     = new Trait( "Artificer Talent", 'A', 'M', 10, true, "LI4E10" );
Traits.ArtificerTalent.highestLevel = 4;

Traits.BadSight            = new Trait( "Bad Sight", 'D', "P", -25, false, "LI4E10" );
Traits.BadSight.description = 'near- or far-sighted';
Traits.BadSight.mods = 'vision';
Traits.BadSight.group = 'vision';
Traits.BadTemper           = new Trait( "Bad Temper", 'D', "M", -10, false, "LI4E10" );
Traits.BadTemper.mods = "Self-Control";
Traits.Bloodlust           = new Trait( "Bloodlust", 'D', "M", -10, false, "LI4E10" );
Traits.Bloodlust.mods = "Self-Control";

Traits.Catfall             = new Trait( "Catfall", 'A', 'P', 10, false, "LI4E8" );
Traits.Catfall.exoticSprntl = 'Exotic';
Traits.Charisma            = new Trait( 'Charisma', 'A', 'M', 5, true, "LI4E7" );
Traits.CodeofHonor         = new Trait( "Code of Honor", 'D', 'M', -5, true, "LI4E10" );
Traits.CodeofHonor.highestLevel = 3;
Traits.CodeofHonor.multiple = true;
Traits.CombatReflexes      = new Trait( "Combat Reflexes", 'A', 'M', 15, false, "LI4E8" );
Traits.CombatReflexes.group = 'reflexes';
Traits.Curious             = new Trait( "Curious", 'D', 'M', -5, false, "LI4E11" );
Traits.Curious.mods = "Self-Control";

Traits.DangerSense         = new Trait( "Danger Sense", 'A', 'M', 15, false, "LI4E9" );
Traits.DangerSense.mods = "ESP";
Traits.DangerSense.group = 'precog';
Traits.Daredevil           = new Trait( "Daredevil", 'A', 'M', 15, false, "LI4E9" );
Traits.Delusion            = new Trait( "Delusion", 'D', 'M', -5, true, "LI4E11" );
Traits.Delusion.multiple = true;
Traits.Delusion.levelNames = ['Minor','Major','Severe'];
Traits.DoubleJointed       = new Trait( "Double-Jointed", 'A', 'P', 15, false, "LI4E9" );
Traits.DoubleJointed.group = 'flex';

Traits.Empathy             = new Trait( "Empathy", 'M', 'A', 15, false, "LI4E9" );
Traits.Empathy.exoticSprntl = 'Supernatural';
Traits.Empathy.group = 'empathy';
Traits.EnhancedBlockShield = new Trait( "Enhanced Block (Shield)", 'A', 'P', 5, false, "LI4E9" );
Traits.EnhancedBlockShield.cinematic = true;
Traits.EnhancedDodge       = new Trait( "Enhanced Dodge", 'A', 'P', 15, false, "LI4E9" );
Traits.EnhancedDodge.cinematic = true;
Traits.EnhancedParryHands = new Trait( "Enhanced Parry (bare hands)", 'A', 'P', 5, false, "LI4E9" );
Traits.EnhancedParryHands.cinematic = true;
Traits.EnhancedParryWeapon = new Trait( "Enhanced Parry (1 weapon)", 'A', 'P', 5, false, "LI4E9" );
Traits.EnhancedParryWeapon.description = "[indicate a weapon skill]";
Traits.EnhancedParryWeapon.cinematic = true;
Traits.EnhancedParry       = new Trait( "Enhanced Parry", 'A', 'P', 10, false, "LI4E9" );
Traits.EnhancedParry.cinematic = true;

Traits.Fearlessness        = new Trait( "Fearlessness", 'A', 'M', 2, true, "LI4E9" );
Traits.Fearlessness.group = 'fear';
Traits.Flexibility         = new Trait( "Flexibility", 'A', 'P', 5, false, "LI4E9" );
Traits.Flexibility.group = 'flex';

Traits.Gluttony            = new Trait( "Gluttony", 'D', 'M', -5, false, "LI4E11"  );
Traits.Gluttony.mods = "Self-Control";
Traits.Greed               = new Trait( "Greed", 'D', 'M', -15, false, "LI4E11" );
Traits.Greed.mods = "Self-Control";

Traits.HardOfHearing       = new Trait( "Hard of Hearing", 'D', 'P', -10, false, "LI4E11" );
Traits.HardtoKill          = new Trait( "Hard to Kill", 'A', 'P', 2, true, "LI4E9" );
Traits.HardtoKill.cinematic = true;
Traits.HighPainThreshold   = new Trait( "High Pain Threshold", 'A', 'P', 10, false, "LI4E9" );
Traits.HighPainThreshold.group = 'durable';
Traits.Honesty             = new Trait( "Honesty", 'D', 'M', -10, false, "LI4E11" );
Traits.Honesty.mods = "Self-Control";

Traits.Impulsiveness       = new Trait( "Impulsiveness", 'D', 'M', -10, false, "LI4E11" );
Traits.Impulsiveness.mods = "Self-Control";
Traits.Intolerance         = new Trait( "Intolerance", 'D', 'M', -10, false, "LI4E11" );
Traits.IntoleranceSpec     = new Trait( "Intolerance - specific", 'D', 'M', 'varies, -1 to -5', false, "LI4E11" );
Traits.IntoleranceSpec.multiple = true;
Traits.IntoleranceSpec.requestBasicCost = true;

Traits.Jealousy            = new Trait( "Jealousy", 'D', 'M', -10, false, "LI4E11" );
Traits.Jumper              = new Trait( "Jumper", 'A', 'M', 100, false, "LI4E9" );
Traits.Jumper.description = '[time-jumper or world-jumper]';
Traits.Jumper.exoticSprntl = 'Supernatural';
Traits.Jumper.mods = 'Jumper, Warp Jump';

Traits.LanguageTalent      = new Trait( "Language Talent", 'A', 'M', 10, false, "LI4E9" );
Traits.Lecherousness       = new Trait( "Lecherousness", 'D', 'M', -15, false, "LI4E11" );
Traits.Lecherousness.mods = "Self-Control";
Traits.Luck                = new Trait( "Luck", 'A', 'M', 15, false, "LI4E9" );
Traits.Luck.mods = "Luck";
Traits.Luck.group = 'luck';
Traits.LuckExtraordinary   = new Trait( "Extraordinary Luck", 'A', 'M', 30, false, "LI4E9" );
Traits.LuckExtraordinary.cinematic = true;
Traits.LuckExtraordinary.mods = "Luck";
Traits.LuckExtraordinary.group = 'luck';
Traits.LuckRidiculous      = new Trait( "Ridiculous Luck", 'A', 'M', 60, false, "LI4E9" );
Traits.LuckRidiculous.cinematic = true;
Traits.LuckRidiculous.mods = "Luck";
Traits.LuckRidiculous.group = 'luck';

Traits.NightVision         = new Trait( "Night Vision", 'A', 'P', 1, true, "LI4E9" );
Traits.NightVision.highestLevel = 9;
Traits.NightVision.group = "Dark Vision";

Traits.Obsession           = new Trait( "Obsession", 'D', 'M', -5, true, "LI4E11" );
Traits.Obsession.mods = "Self-Control";
Traits.Obsession.description = true;
Traits.Obsession.levelNames = ['short-term','long-term'];
Traits.OdiousPersonalHabit = new Trait( "Odious Personal Habit", 'D', 'So', -5, true, "LI4E22" );
Traits.OdiousPersonalHabit.highestLevel = 3;
Traits.OdiousPersonalHabit.multiple = true;
Traits.OutdoorsmanTalent   = new Trait( "Outdoorsman Talent", 'A', 'M', 10, true, "LI4E10" );
Traits.OutdoorsmanTalent.highestLevel = 4;
Traits.Overconfidence      = new Trait( "Overconfidence", 'D', 'M', -5, false, "LI4E11" );
Traits.Overconfidence.mods = "Self-Control";

Traits.Pacifism            = new Trait( "Pacifism", 'D', 'M', 0, false, "LI4E12" );
Traits.Pacifism.mods = 'Pacifism';
Traits.PerfectBalance      = new Trait( "Perfect Balance", 'A', 'P', 15, false, "LI4E10" );
Traits.Phobia              = new Trait( "Phobia", 'D', 'M', 0, false, "LI4E12" );
Traits.Phobia.description = 'choose a phobia below, or define one by adding a modifier below';
Traits.Phobia.multiple = true;
Traits.Phobia.mods = 'Self-Control, Phobias';

Traits.Reputation          = new Trait( "Reputation", 'A', 'So', 5, true, "LI4E26" );
Traits.Reputation.multiple = true;
Traits.Reputation.posNegLevels = true;
Traits.Reputation.lowestLevel = -4;
Traits.Reputation.highestLevel = 4;
Traits.Reputation.mods = "Reputation";
Traits.Resistant           = new Trait( "Resistant", 'A', 'P', 0, false, "LI4E10" );
Traits.Resistant.multiple = true;
Traits.Resistant.mods = 'Resistant';

Traits.SenseOfDuty         = new Trait( "Sense of Duty", 'D', 'M', 0, false, "LI4E12" );
Traits.SenseOfDuty.multiple = true;
Traits.SenseOfDuty.mods = 'Duty Group';
Traits.SmoothOperatorTalent= new Trait( "Smooth Operator Talent", 'A', 'M', 15, true, "LI4E10" );
Traits.SmoothOperatorTalent.highestLevel = 4;
Traits.Status              = new Trait( "Status", 'AD', 'So', 5, true, "LI4E28" );
Traits.Status.multiple = true;
Traits.Status.posNegLevels = true;
Traits.Status.lowestLevel  = -4;
Traits.Status.highestLevel = 8;

Traits.TechLevel           = new Trait( "Tech Level Difference", 'AD', 'M', 5, true, "LI4E22-23" );
Traits.TechLevel.posNegLevels = true;
Traits.TechLevel.lowestLevel = -3;
Traits.TechLevel.highestLevel = 3;
Traits.TechLevel.levelsName = 'TL';
Traits.Truthfulness        = new Trait( "Truthfulness", 'D', 'M', -5, false, "LI4E12" );
Traits.Truthfulness.mods = "Self-Control";

Traits.Unluckiness         = new Trait( "Unluckiness", 'D', 'M', -10, false, "LI4E12" );

Traits.Voice               = new Trait( "Voice", 'A', 'P', 10, false, "LI4E97" );
Traits.Voice.group = "voice";
Traits.Vow                 = new Trait( "Vow", 'D', 'M', -5, true, "LI4E12" );
Traits.Vow.levelNames = ['minor','major','great'];
Traits.Vow.cinematic = true;
Traits.Vow.multiple = true;
Traits.MinorVow            = new Trait( "Minor Vow", 'D', 'M', -5, false, "LI4E12" );
Traits.MinorVow.multiple = true;
Traits.MajorVow            = new Trait( "Major Vow", 'D', 'M', -10, false, "LI4E12" );
Traits.MajorVow.multiple = true;
Traits.GreatVow            = new Trait( "Great Vow", 'D', 'M', -15, false, "LI4E12" );
Traits.GreatVow.multiple = true;

// Wealth group
// Traits.Wealth              = new Trait( "Wealth", 'So', 10, true );
// Traits.Wealth.description = true;
// Traits.Wealth.posNegLevels = true;
// Traits.Wealth.lowestLevel = -3;
// Traits.Wealth.highestLevel = 4;
Traits.PovertyDeadBrokex0   = new Trait( "Poverty: Dead Broke", 'D', 'So', -25, false, "LI4E25" );
Traits.PovertyDeadBrokex0.buttonLabel = 'Dead Broke';
Traits.PovertyDeadBrokex0.group = 'wealth';
Traits.PovertyDeadBrokex0.description = 'clothes only';
Traits.PovertyPoorx15       = new Trait( "Poverty: Poor", 'D', 'So', -15, false, "LI4E25" );
Traits.PovertyPoorx15.buttonLabel = 'Poor';
Traits.PovertyPoorx15.group = 'wealth';
Traits.PovertyPoorx15.description = '1/5 starting wealth';
Traits.PovertyStrugglingx12 = new Trait( "Poverty: Struggling", 'D', 'So', -10, false, "LI4E25" );
Traits.PovertyStrugglingx12.buttonLabel = 'Struggling';
Traits.PovertyStrugglingx12.group = 'wealth';
Traits.PovertyStrugglingx12.description = '&half; starting wealth';
Traits.WealthComfortablex2 = new Trait( "Wealth: Comfortable", 'A', 'So', 10, false, "LI4E25" );
Traits.WealthComfortablex2.buttonLabel = 'Comfortable';
Traits.WealthComfortablex2.group = 'wealth';
Traits.WealthComfortablex2.description = 'double starting wealth';
Traits.WealthComfortablex2.mods = "Wealth";
Traits.WealthWealthyx5     = new Trait( "Wealth: Wealthy", 'A', 'So', 20, false, "LI4E25" );
Traits.WealthWealthyx5.buttonLabel = 'Wealthy';
Traits.WealthWealthyx5.group = 'wealth';
Traits.WealthWealthyx5.description = '5× starting wealth';
Traits.WealthWealthyx5.mods = "Wealth";
Traits.WealthVeryWealthyx20 = new Trait( "Wealth: Very Wealthy", 'A', 'So', 30, false, "LI4E25" );
Traits.WealthVeryWealthyx20.buttonLabel = 'Very Wealthy';
Traits.WealthVeryWealthyx20.group = 'wealth';
Traits.WealthVeryWealthyx20.description = '20× starting wealth';
Traits.WealthFilthyRichx100 = new Trait( "Wealth: Filthy Rich", 'A', 'So', 50, false, "LI4E25" );
Traits.WealthFilthyRichx100.buttonLabel = 'Filthy Rich';
Traits.WealthFilthyRichx100.group = 'wealth';
Traits.WealthFilthyRichx100.description = '100× starting wealth';

for ( var t in Traits ) {
    if( !Traits[t].hasOwnProperty('key') ) Traits[t].key = t;
}

// alternate names for traits (keys will be different, so these must be defined after the add-key loop above)
// (give them a 'key' attribute equal to the trait they are cloned from, so that Adjustments, etc. will work)
Traits.AppearanceVeryBeautiful      = Traits.VeryBeautiful.clone();
Traits.AppearanceVeryBeautiful.key  = "VeryBeautiful";
Traits.AppearanceVeryBeautiful.name = "Appearance: Very Beautiful";
Traits.AppearanceVeryHandsome       = Traits.VeryHandsome.clone();
Traits.AppearanceVeryHandsome.key   = "VeryHandsome";
Traits.AppearanceVeryHandsome.name  = "Appearance: Very Handsome";
Traits.AppearanceBeautiful          = Traits.Beautiful.clone();
Traits.AppearanceBeautiful.key      = "Beautiful";
Traits.AppearanceBeautiful.name     = "Appearance: Beautiful";
Traits.AppearanceHandsome           = Traits.Handsome.clone();
Traits.AppearanceHandsome.key       = "Handsome";
Traits.AppearanceHandsome.name      = "Appearance: Handsome";
Traits.AppearanceAttractive         = Traits.Attractive.clone();
Traits.AppearanceAttractive.key     = "Attractive";
Traits.AppearanceAttractive.name    = "Appearance: Attractive";
Traits.AppearanceUnattractive       = Traits.Unattractive.clone();
Traits.AppearanceUnattractive.key   = "Unattractive";
Traits.AppearanceUnattractive.name  = "Appearance: Unattractive";
Traits.AppearanceUgly               = Traits.Ugly.clone();
Traits.AppearanceUgly.key           = "Ugly";
Traits.AppearanceUgly.name          = "Appearance: Ugly";


var AdsGURPSLite = ['AcuteHearing','AcuteVision','AcuteTasteSmell','AcuteTouch','Ambidexterity',
'AnimalEmpathy','Catfall','Charisma','CombatReflexes','DangerSense','Daredevil','Empathy',
'EnhancedBlockShield','EnhancedDodge','EnhancedParryHands','EnhancedParryWeapon','EnhancedParry',
'Fearlessness','Flexibility','HardtoKill','HighPainThreshold','Jumper',
'LanguageTalent','Luck','NightVision','PerfectBalance','Resistant',
// Talents
'ArtificerTalent','OutdoorsmanTalent','SmoothOperatorTalent'];

var DisadsGURPSLite = ['BadSight','BadTemper','Bloodlust','Curious','Delusion','Gluttony','Greed',
'HardOfHearing','Honesty','Impulsiveness','Intolerance','Jealousy','Lecherousness',
'Obsession','Overconfidence','Pacifism','Phobia','SenseOfDuty','Truthfulness','Unluckiness','Vow'];

var QuirksList = ['Abrasive', 'Acceleration Weakness', 'Aches and Pains', 'Admiration',
'Affected by Magnetism', 'Alcohol Intolerance', 'Allergy', 'Alternative Sexuality', 'Ambitious',
'Amoral', 'Appearance Change', 'Argumentative', 'Aristocratic', 'Atheist', 'Attentive',
'Bad Posture', 'Bitter', 'Blunt', 'Boring', 'Born Goon', 'Bowlegged', 'Broad-Minded', 'Bulky Frame',
'Can Be Turned By True Faith', "Can't Read Music", 'Cannot Float', 'Care', 'Careful planner',
'Careful', 'Carries backup weapons', 'Chauvinistic', 'Checkered Past', 'Cheerful', 'Clean freak',
'Clumsy Runner', 'Code of Honor', 'Cold Intolerance', 'Collector', 'College Incompetence',
'Combat Hesitancy', 'Complicated', 'Compulsion', 'Congenial', 'Cooperative', 'Cosmetic Eyeglasses',
'Credulous', 'Crude', 'Cruel', 'Crush', 'Cyclothymic', 'Cynical', 'Daily Ritual', 'Damned',
'Dead Giveaway', 'Dead Weight', 'Decisive', 'Delusion', 'Delusional Competence', 'Depressing',
'Desirous', 'Determined', 'Disadvantage Embellishment', 'Disciplined', 'Dishonest Face', 'Dislike',
'Dislikes haste', 'Disorganized', 'Distinctive Features', 'Distinctive Speech', 'Distractible',
'Docile', 'Doesn&lsquo;t trust banks', 'Dorky', 'Dreamer', 'Dual Identity', 'Dull',
'Dull Taste or Smell,', 'Dweeby', 'Easily Frustrated', 'Easily Influenced', 'Easily Mistaken Sex',
'Easily Suppressed Disadvantage', 'Easily Winded', 'Eavesdropper', 'Enthusiastic', 'Epicure',
'Epitome', 'Expensive Habit', 'Expression', 'External Mood Influence', 'Extra Drawback',
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
'Sunburns Easily', 'Supernatural Dislike', 'Superstition', 'Susceptible to', 'Suspicious',
'Sybarite', 'Symbol-Shy', 'Taboo Traits', 'Tactless', 'Talkative', 'Tattletale', 'Taunting',
'Temperature Intolerance', 'Tests Positive for', 'Thin Skull', 'Third Person', 'Time-Server',
'Timid', 'Tiny Hands', 'Token', 'Tone-Deaf', 'Trademark', 'Treacherous', 'Trivial Destiny',
'Trivial Reputation', 'Trivial Secret', 'Twitchy', 'Unbelievable at', 'Uncongenial', 'Ungentlemanly',
'Unimaginative', 'Unwelcome Accessory', 'Variable Quirk', 'Villain-Worshipper', 'Vindictive', 'Vow',
'Willful Ignorance', 'Wishy-Washy', 'Won&lsquo;t carry a load'];


/****  Modifiers  ****/
var Modifiers = {};
Modifiers.Appearance = [
    [
        { text: "Androgynous", mod: 0, type: 'enhanceLimit' }
    ],
    [
        { text: "Impressive", mod: 0, type: 'enhanceLimit' }
    ],
    [
        { text: "Universal", mod: 25, type: 'enhanceLimit' }
    ],
    [
        { text: "Off-the-Shelf Looks", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Duty = [
    [
        { text: "Extremely Hazardous", mod: -5, type: 'constantMod' },
        { text: "Nonhazardous", mod: 5, type: 'constantMod' }
    ],
    [
        { text: "Involuntary", mod: -5, type: 'constantMod' }
    ]
];
Modifiers.DutyGroup = [
    [
        { text: "Individual",  mod:  -2, type: 'constantMod' },
        { text: "Small Group", mod:  -5, type: 'constantMod', required: true },
        { text: "Large Group", mod: -10, type: 'constantMod' },
        { text: "Entire Race", mod: -20, type: 'constantMod' },
    ]
];
Modifiers.ESP = [
    [
        { text: "ESP", mod: -10, type: 'enhanceLimit' }
    ],
];
Modifiers.Jumper = [
    [
        { text: "New Worlds", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Omni-Jump", mod: 10, type: 'enhanceLimit' }
    ],
    [
        { text: "Tracking", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Tunnel", mod: 40, type: 'enhanceLimit' }
    ],
    [
        { text: "Cannot Escort", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Cannot Follow", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "Drift", mod: -15, type: 'enhanceLimit' }
    ],
    [
        { text: "Limited Jump", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Maximum Range", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Stunning", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.Luck = [
    [
        { text: "Active", mod: -40, type: 'enhanceLimit' },
    ],
    [
        { text: "Aspected (choose class)", mod: -20, type: 'enhanceLimit' },
    ],
    [
        { text: "Defensive", mod: -20, type: 'enhanceLimit' },
    ]
];
Modifiers.Pacifism = [
    [
        { text: "Reluctant Killer",      mod:  -5, type: 'constantMod', required: true },
        { text: "Cannot Harm Innocents", mod: -10, type: 'constantMod' },
        { text: "Cannot Kill",           mod: -15, type: 'constantMod' },
        { text: "Self-Defense Only",     mod: -15, type: 'constantMod' },
        { text: "Total Nonviolence",     mod: -30, type: 'constantMod' }
    ]
];
Modifiers.Phobias = [
    [
        { text: "Being Alone (Autophobia)", mod: -15, type: 'constantMod' },
        { text: "Blood (Hemophobia)", mod: -10, type: 'constantMod' },
        { text: "Cats (Ailurophobia)", mod: -5, type: 'constantMod' },
        { text: "Crowds (Demophobia)", mod: -15, type: 'constantMod' },
        { text: "Darkness (Scotophobia)", mod: -15, type: 'constantMod' },
        { text: "Death and the Dead (Necrophobia)", mod: -10, type: 'constantMod' },
        { text: "Dirt (Mysophobia)", mod: -10, type: 'constantMod' },
        { text: "Dogs (Cynophobia)", mod: -5, type: 'constantMod' },
        { text: "Enclosed Spaces (Claustrophobia)", mod: -15, type: 'constantMod' },
        { text: "Fire (Pyrophobia)", mod: -5, type: 'constantMod' },
        { text: "Heights (Acrophobia)", mod: -10, type: 'constantMod' },
        { text: "Insects (Entomophobia)", mod: -10, type: 'constantMod' },
        { text: "Loud Noises (Brontophobia)", mod: -10, type: 'constantMod' },
        { text: "Machinery (Technophobia), up to TL4", mod: -5, type: 'constantMod' },
        { text: "Machinery (Technophobia), TL5+", mod: -15, type: 'constantMod' },
        { text: "Magic (Manaphobia), Magic is common", mod: -15, type: 'constantMod' },
        { text: "Magic (Manaphobia), Magic is uncommon", mod: -10, type: 'constantMod' },
        { text: "Magic (Manaphobia), Magic is 'not real'", mod: -5, type: 'constantMod' },
        { text: "Monsters (Teratophobia)", mod: -15, type: 'constantMod' },
        { text: "Number 13 (Triskaidekaphobia)", mod: -5, type: 'constantMod' },
        { text: "Oceans (Thalassophobia)", mod: -10, type: 'constantMod' },
        { text: "Open Spaces (Agoraphobia)", mod: -10, type: 'constantMod' },
        { text: "Psionic Powers (Psionophobia), Psi is common", mod: -15, type: 'constantMod' },
        { text: "Psionic Powers (Psionophobia), Psi is uncommon", mod: -10, type: 'constantMod' },
        { text: "Psionic Powers (Psionophobia), Psi is 'not real'", mod: -5, type: 'constantMod' },
        { text: "Reptiles (Herpetophobia)", mod: -10, type: 'constantMod' },
        { text: "Sex (Coitophobia)", mod: -10, type: 'constantMod' },
        { text: "Sharp Things (Aichmophobia), up to TL5", mod: -15, type: 'constantMod' },
        { text: "Sharp Things (Aichmophobia), TL6+", mod: -10, type: 'constantMod' },
        { text: "Spiders (Arachnophobia)", mod: -5, type: 'constantMod' },
        { text: "Strange and Unknown Things (Xenophobia)", mod: -15, type: 'constantMod' },
        { text: "Sun (Heliophobia)", mod: -15, type: 'constantMod' },
        { text: "Weapons (Hoplophobia)", mod: -20, type: 'constantMod' },
    ]
];
Modifiers.Reputation = [
    [
        { text: "People: Everyone", mod:1, type: 'multiplier' },
        { text: "People: Large class", mod: '1/2', type: 'multiplier' },
        { text: "People: Small class", mod: '1/3', type: 'multiplier' }
    ],
    [
        { text: "Frequency: Always", mod: 1, type: 'multiplier' },
        { text: "Frequency: Sometimes (10 or less)", mod: '1/2', type: 'multiplier' },
        { text: "Frequency: Occasionally (7 or less)", mod: '1/3', type: 'multiplier' }
    ]
];
Modifiers.Resistant = [
    [
        { text: "Very Common", mod: 30, type: 'constantMod' },
        { text: "Common",      mod: 15, type: 'constantMod' },
        { text: "Occasional",  mod: 10, type: 'constantMod', required: true },
        { text: "Rare",        mod: 5,  type: 'constantMod' }
    ],
    [
        { text: "Immunity",    mod: 1,     type: 'multiplier', required: true },
        { text: "+8 HT rolls", mod: "1/2", type: 'multiplier' },
        { text: "+3 HT rolls", mod: "1/3", type: 'multiplier' }
    ],
    [
        { text: "Mental Resistance (rolls vs Will)", mod: 0, type: 'constantMod' },
    ]
];
Modifiers.SelfControl = [
  [
    { text: "Self-control: Resist quite rarely (roll of 6 or less)", mod: 2, type: 'multiplier' },
    { text: "Self-control: Resist fairly often (roll of 9 or less)", mod: 1.5, type: 'multiplier' },
    { text: "Self-control: Resist quite often (roll of 12 or less)", mod: 1, type: 'multiplier', required: true },
    { text: "Self-control: Resist almost all the time (roll of 15 or less)", mod: 0.5, type: 'multiplier' }
  ]
];
Modifiers.vision = [
    [
        { text: "Mitigator - glasses, contact lenses, <i>etc.</i>", mod: -60, type: 'enhanceLimit' }
    ]
];
Modifiers.Warp = [
    [
        { text: "Blind", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Reliable, per +1 to IQ roll", mod: 5, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Range Limit, -5% × (10 + Warp range penalty)", mod: -5, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Hyperjump: speed of light", mod: -50, type: 'enhanceLimit' },
        { text: "Hyperjump: 1 light-year/day", mod: -25, type: 'enhanceLimit' }
    ]
];
Modifiers.WarpJump = [
    [
        { text: "Warp Jump", mod: 10, type: 'enhanceLimit' }
    ]
];


/****  Bonuses & Penalties  ****/
Adjustments = {};

Adjustments.Acrobatics_from_PerfectBalance = { from: 'PerfectBalance', amount: 1, targetCategory: 'SK', target: 'Acrobatics' };
Adjustments.ActiveDefense_from_CombatReflexes    = { from: 'CombatReflexes', amount: 1, target: 'ActiveDefense' };

Adjustments.Block_from_CombatReflexes      = { from: 'CombatReflexes',      amount: 1, target: 'Block' };
Adjustments.Block_from_EnhancedBlockShield = { from: 'EnhancedBlockShield', amount: 1, target: 'Block' };

Adjustments.Climbing_from_DoubleJointed  = { from: 'DoubleJointed',  amount:  5, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_Flexibility    = { from: 'Flexibility',    amount:  3, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_PerfectBalance = { from: 'PerfectBalance', amount:  1, targetCategory: 'SK', target: 'Climbing' };

Adjustments.Diplomacy_from_Voice      = { from: 'Voice',      amount:  2, targetCategory: 'SK', target: 'Diplomacy' };
Adjustments.Dodge_from_CombatReflexes = { from: 'CombatReflexes', amount:  1, target: 'Dodge' };
Adjustments.Dodge_from_EnhancedDodge  = { from: 'EnhancedDodge',  amount:  1, target: 'Dodge' };

Adjustments.Escape_from_DoubleJointed = { from: 'DoubleJointed', amount: 5, targetCategory: 'SK', target: 'Escape' };
Adjustments.Escape_from_Flexibility   = { from: 'Flexibility',   amount: 3, targetCategory: 'SK', target: 'Escape' };

Adjustments.FastTalk_from_Voice = { from: 'Voice', amount: 2, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.FastTalk_from_Truthfulness = { from: 'Truthfulness', amount: -5, targetCategory: 'SK', target: 'FastTalk' };


Adjustments.Hearing_from_AcuteHearing = { from: 'AcuteHearing', amount: 1, target: 'Hearing' };
Adjustments.Hearing_from_HardofHearing = { from: 'HardOfHearing', amount: -4, target: 'Hearing' };

Adjustments.Intimidation_from_Hideous   = { from: 'Hideous',   amount:  2, targetCategory: 'SK', target: 'Intimidation' };

Adjustments.Language_from_LanguageTalent = { from: 'LanguageTalent', amount: 1, targetCategory: 'AD', target: 'Language' };
Adjustments.Leadership_from_Charisma   = { from: 'Charisma',   amount:  1, targetCategory: 'SK', target: 'Leadership' };
Adjustments.Linguistics_from_LanguageTalent = { from: 'LanguageTalent', amount: 1, targetCategory: 'SK', target: 'Linguistics' };



Adjustments.Parry_from_CombatReflexes      = { from: 'CombatReflexes',      amount: 1, target: 'Parry' };
Adjustments.Parry_from_EnhancedParry       = { from: 'EnhancedParry',       amount: 1, target: 'Parry' };
Adjustments.Parry_from_EnhancedParryHands  = { from: 'EnhancedParryHands',  amount: 1, target: 'HandParry' };
Adjustments.Parry_from_EnhancedParryWeapon = { from: 'EnhancedParryWeapon', amount: 1, target: 'WeaponParry' };
Adjustments.Piloting_from_PerfectBalance = { from: 'PerfectBalance', amount: 1, targetCategory: 'SK', target: 'Piloting' };
Adjustments.PublicSpeaking_from_Charisma   = { from: 'Charisma',   amount:  1, targetCategory: 'SK', target: 'PublicSpeaking' };
Adjustments.PublicSpeaking_from_Voice      = { from: 'Voice',      amount:  2, targetCategory: 'SK', target: 'PublicSpeaking' };

Adjustments.Reaction_from_Charisma             = { from: 'Charisma',             amount: 1, targetCategory: 'GR', target: 'Reaction' };

Adjustments.SexAppeal_from_Voice      = { from: 'Voice',      amount:  2, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Handsome   = { from: 'Handsome',   amount:  4, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.Status_from_Status                = { from: 'Status',               amount: 1,         /* targetCategory: 'AD',*/ target: 'Status' };
Adjustments.Status_from_WealthWealthyx5       = { from: 'WealthWealthyx5',      amount: 1,          targetCategory: 'AD', target: 'Status' };
Adjustments.Status_from_WealthVeryWealthyx20  = { from: 'WealthVeryWealthyx20', amount: 1,          targetCategory: 'AD', target: 'Status' };
Adjustments.Status_from_WealthFilthyRichx100  = { from: 'WealthFilthyRichx100', amount: 1,          targetCategory: 'AD', target: 'Status' };

Adjustments.TasteSmell_from_AcuteTasteSmell = { from: 'AcuteTasteSmell', amount: 1, target: 'TasteSmell' };
Adjustments.TL_from_TechLevel = { from: 'TechLevel', amount: 1, targetCategory: '', target: 'TL' };


Adjustments.Vision_from_AcuteVision = { from: 'AcuteVision', amount: 1, target: 'Vision' };


Adjustments.Appearance_from_AppearanceHideous       = { from: 'Hideous',       amount: -4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceUgly          = { from: 'Ugly',          amount: -2, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceUnattractive  = { from: 'Unattractive',  amount: -1, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceAttractive    = { from: 'Attractive',    amount:  1, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceHandsome      = { from: 'Handsome',      amount:  3, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceBeautiful     = { from: 'Beautiful',     amount:  3, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceVeryHandsome  = { from: 'VeryHandsome',  amount:  4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceVeryBeautiful = { from: 'VeryBeautiful', amount:  4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_Appearance              = { from: 'Appearance',    amount:  1, targetCategory: 'GR', target: 'Appearance' }

/* Adjustments for Talents */
Adjustments.ArtificerTalentGroup_from_ArtificerTalent           = { from: "ArtificerTalent",      amount: 1, upto: 4, targetCategory: "GR", target: "ArtificerTalent" };
Adjustments.OutdoorsmanTalentGroup_from_OutdoorsmanTalent       = { from: "OutdoorsmanTalent",    amount: 1, upto: 4, targetCategory: "GR", target: "OutdoorsmanTalent" };
Adjustments.SmoothOperatorTalentGroup_from_SmoothOperatorTalent = { from: "SmoothOperatorTalent", amount: 1, upto: 4, targetCategory: "GR", target: "SmoothOperatorTalent" };

Prerequisites = {};


/****  Skills  ****/

Skills = {};
Skills.spacer = {};
Skills.heading = { heading:'' };

Skills.Acrobatics = new Skill( 'Acrobatics', 'DX', 2, 'LI4E13' );
Skills.Acting = new Skill( 'Acting', 'IQ', 1, 'LI4E13' );
Skills.AnimalHandling = new Skill( 'Animal Handling', 'IQ', 1, 'LI4E14' );
Skills.AnimalHandling.specializations = ['Canines','Equines','Felines','Raptors'];
Skills.AnimalHandling.specCategName = 'order/family';
Skills.Anthropology = new Skill( "Anthropology", 'IQ', 2, 'LI4E16' );
Skills.Anthropology.specializations = [];
Skills.Anthropology.specCategName = 'species';
Skills.Archaeology = new Skill( "Archaeology", 'IQ', 2, 'LI4E16' );
Skills.AreaKnowledge = new Skill( 'Area Knowledge', 'IQ', 0, 'LI4E14' );
Skills.AreaKnowledge.specRequiredList = [];
Skills.AreaKnowledge.specCategName = 'area';
Skills.Armoury = new Skill( 'Armoury', 'IQ', 1, 'LI4E14' );
Skills.Armoury.TLs = true;
Skills.Astronomy = new Skill( 'Astronomy', 'IQ', 2, 'LI4E16' );
Skills.Astronomy.TLs = true;
Skills.AxeMace = new Skill( 'Axe/Mace', 'DX', 1, 'LI4E15' );

Skills.Bicycling = new Skill( 'Bicycling', 'DX', 0, 'LI4E17' );
Skills.Biology = new Skill( "Biology", 'IQ', 3, 'LI4E16' );
Skills.Biology.TLs = true;
Skills.Blowpipe = new Skill( "Blowpipe", 'DX', 2, 'LI4E16' );
Skills.Boating = new Skill( "Boating", 'DX', 1, 'LI4E17' );
Skills.Boating.specRequiredList = ['Powerboat','Motorboat','Sailboat','Unpowered'];
Skills.Boating.specCategName = 'boat type';
Skills.Boating.TLs = true;
Skills.Bow = new Skill( 'Bow', 'DX', 1, 'LI4E16' );
Skills.Brawling = new Skill( 'Brawling', 'DX', 0, 'LI4E14' );
Skills.Broadsword = new Skill( 'Broadsword', 'DX', 1, 'LI4E15' );

Skills.Camouflage = new Skill( "Camouflage", 'IQ', 0, 'LI4E14' );
Skills.Carousing = new Skill( 'Carousing', 'HT', 0, 'LI4E14' );
Skills.Chemistry = new Skill( "Chemistry", 'IQ', 2, 'LI4E16' );
Skills.Chemistry.TLs = true;
Skills.Chemistry.minTL = 5;
Skills.Climbing = new Skill( 'Climbing', 'DX', 1, 'LI4E14' );
Skills.ComputerOperation = new Skill( "Computer Operation", 'IQ', 0, 'LI4E14' );
Skills.ComputerOperation.TLs = true;
Skills.ComputerOperation.minTL = 7;
Skills.ComputerProgramming = new Skill( "Computer Programming", 'IQ', 2, 'LI4E14' );
Skills.ComputerProgramming.TLs = true;
Skills.ComputerProgramming.minTL = 7;
Skills.Crewman = new Skill( "Crewman", 'IQ', 0, 'LI4E14' );
Skills.Crewman.TLs = true;
Skills.Criminology = new Skill( 'Criminology', 'IQ', 1, 'LI4E14' );
Skills.Criminology.TLs = true;
Skills.Crossbow = new Skill( 'Crossbow', 'DX', 0, 'LI4E16' );

Skills.Diagnosis = new Skill( "Diagnosis", 'IQ', 2, 'LI4E14' );
Skills.Diagnosis.TLs = true;
Skills.Diplomacy = new Skill( "Diplomacy", 'IQ', 2, 'LI4E15' );
Skills.Disguise = new Skill( "Disguise", 'IQ', 1, 'LI4E14' );
Skills.Disguise.TLs = true;
Skills.Driving = new Skill( "Driving", 'DX', 1, 'LI4E17' );
Skills.Driving.TLs = true;
Skills.Driving.minTL = 6;

Skills.ElectronicsOperation = new Skill( "Electronics Operation", 'IQ', 1, 'LI4E14' );
Skills.ElectronicsOperation.TLs = true;
Skills.ElectronicsOperation.minTL = 7;
Skills.Engineer = new Skill( "Engineer", 'IQ', 2, 'LI4E14' );
Skills.Engineer.TLs = true;
Skills.EnvironmentSuit = new Skill( "Environment Suit", 'DX', 1, 'LI4E14' );
Skills.EnvironmentSuit.TLs = true;
Skills.EnvironmentSuit.minTL = 6;
Skills.Escape = new Skill( "Escape", 'DX', 2, 'LI4E14' );
Skills.Explosives = new Skill( "Explosives", 'IQ', 1, 'LI4E14' );
Skills.Explosives.TLs = true;
Skills.Explosives.minTL = 4;

Skills.FastTalk = new Skill( 'Fast-Talk', 'IQ', 1, 'LI4E15' );
Skills.FirstAid = new Skill( 'First Aid', 'IQ', 0, 'LI4E14' );
Skills.FirstAid.TLs = true;
Skills.Flail = new Skill( 'Flail', 'DX', 2, 'LI4E15' );
Skills.LiquidProjector = new Skill( "Flamethrower", 'DX', 0, 'LI4E16' );
Skills.LiquidProjector.TLs = true;
Skills.LiquidProjector.minTL = 4;
Skills.Forgery = new Skill( "Forgery", 'IQ', 2, 'LI4E14' );
Skills.Forgery.TLs = true;

Skills.Gambling = new Skill( 'Gambling', 'IQ', 1, 'LI4E14' );
Skills.Geology = new Skill( "Geology", 'IQ', 2, 'LI4E16' );
Skills.Geology.TLs = true;
Skills.Gunner = new Skill( 'Gunner', 'DX', 0, 'LI4E15' );
Skills.Gunner.TLs = true;
Skills.Gunner.minTL = 2;
Skills.Gunner.specRequiredList = ['Beams','Cannon','Machine Gun'];
Skills.Gunner.specCategName = 'weapon type';
Skills.Guns = new Skill( 'Guns', 'DX', 0, 'LI4E16' );
Skills.Guns.TLs = true;
Skills.Guns.minTL = 4;
Skills.Guns.specRequiredList = ['Light Anti-Armor Weapon','Pistol','Rifle','Shotgun','Submachine Gun'];
Skills.Guns.specCategName = 'weapon type';

Skills.Hiking = new Skill( "Hiking", 'HT', 1, 'LI4E14' );
Skills.History = new Skill( "History", 'IQ', 2, 'LI4E15' );
Skills.History.specRequiredList = [];
Skills.History.specCategName = 'region, era, culture, <em>etc.</em>';
Skills.Holdout = new Skill( "Holdout", 'IQ', 1, 'LI4E15' );

Skills.Interrogation = new Skill( "Interrogation", 'IQ', 1, 'LI4E15' );
Skills.Intimidation = new Skill( 'Intimidation', 'Will', 1, 'LI4E15' );

Skills.Jumping = new Skill( "Jumping", 'DX', 0, 'LI4E15' );

Skills.Karate = new Skill( 'Karate', 'DX', 2, 'LI4E15' );
Skills.Knife = new Skill( 'Knife', 'DX', 0, 'LI4E15' );

Skills.Law = new Skill( "Law", 'IQ', 2, 'LI4E15' );
Skills.Leadership = new Skill( 'Leadership', 'IQ', 1, 'LI4E15' );
Skills.Literature = new Skill( "Literature", 'IQ', 2, 'LI4E15' );
Skills.Lockpicking = new Skill( 'Lockpicking', 'IQ', 1, 'LI4E15' );
Skills.Lockpicking.TLs =  true;
Skills.Lockpicking.minTL =  2;

Skills.Mathematics = new Skill( 'Mathematics', 'IQ', 2, 'LI4E15' );
Skills.Mathematics.TLs = true;
Skills.Mathematics.minTL =  1;
Skills.Mechanic = new Skill( "Mechanic", 'IQ', 1, 'LI4E15' );
Skills.Mechanic.TLs = true;
Skills.Mechanic.minTL = 2;
Skills.Merchant = new Skill( 'Merchant', 'IQ', 1, 'LI4E15' );

Skills.Naturalist = new Skill( 'Naturalist', 'IQ', 2, 'LI4E16' );
Skills.Navigation = new Skill( 'Navigation', 'IQ', 1, 'LI4E16' );
Skills.Navigation.TLs = true;

Skills.Observation = new Skill( "Observation", 'Per', 1, 'LI4E16' );
Skills.Occultism = new Skill( "Occultism", 'IQ', 1, 'LI4E16' );

Skills.Philosophy = new Skill( "Philosophy", 'IQ', 2, 'LI4E15' );
Skills.Philosophy.specRequiredList = [];
Skills.Photography = new Skill( "Photography", 'IQ', 1, 'LI4E16' );
Skills.Photography.TLs = true;
Skills.Photography.minTL = 5;
Skills.Physician = new Skill( 'Physician', 'IQ', 2, 'LI4E16' );
Skills.Physician.TLs = true;
Skills.Physics = new Skill( 'Physics', 'IQ', 3, 'LI4E16' );
Skills.Physics.TLs = true;
Skills.Physics.minTL = 4;
Skills.Pickpocket = new Skill( 'Pickpocket', 'DX', 2, 'LI4E16' );
Skills.Piloting = new Skill( 'Piloting', 'DX', 1, 'LI4E17' );
Skills.Piloting.TLs = true;
Skills.Piloting.minTL = 5;
Skills.Piloting.specRequiredList = [];
Skills.Polearm = new Skill( 'Polearm', 'DX', 1, 'LI4E15' );
Skills.Psychology = new Skill( "Psychology", 'IQ', 2, 'LI4E16' );
Skills.PublicSpeaking = new Skill( "Public Speaking", 'IQ', 1, 'LI4E16' );

Skills.Rapier = new Skill( 'Rapier', 'DX', 1, 'LI4E15' );
Skills.Research = new Skill( "Research", 'IQ', 1, 'LI4E16' );
Skills.Research.TLs = true;
Skills.Research.minTL = 2;
Skills.Riding = new Skill( 'Riding', 'DX', 1, 'LI4E16' );

Skills.SavoirFaire = new Skill( 'Savoir-Faire', 'IQ', 0, 'LI4E15' );
Skills.Scrounging = new Skill( 'Scrounging', 'Per', 0, 'LI4E16' );
Skills.Search = new Skill( "Search", 'Per', 1, 'LI4E16' );
Skills.SexAppeal = new Skill( "Sex Appeal", 'HT', 1, 'LI4E15' );
Skills.Shadowing = new Skill( "Shadowing", 'IQ', 1, 'LI4E16' );
Skills.Shield = new Skill( 'Shield', 'DX', 0, 'LI4E16' );
Skills.Shortsword = new Skill( 'Shortsword', 'DX', 1, 'LI4E15' );
Skills.Smallsword = new Skill( "Smallsword", 'DX', 1, 'LI4E15' );
Skills.Smuggling = new Skill( "Smuggling", 'IQ', 1, 'LI4E16' );
Skills.Sociology = new Skill( "Sociology", 'IQ', 2, 'LI4E16' );
Skills.Spear = new Skill( 'Spear', 'DX', 1, 'LI4E15' );
Skills.StaffSkill = new Skill( 'Staff', 'DX', 1, 'LI4E15' );
Skills.Stealth = new Skill( 'Stealth', 'DX', 1, 'LI4E17' );
Skills.Streetwise = new Skill( 'Streetwise', 'IQ', 1, 'LI4E15' );
Skills.Submarine = new Skill( "Submarine", 'DX', 1, 'LI4E17' );
Skills.Submarine.TLs = true;
Skills.Submarine.minTL = 5;
Skills.Survival = new Skill( 'Survival', 'Per', 1, 'LI4E17' );
Skills.Survival.specRequiredList = [];
Skills.Swimming = new Skill( "Swimming", 'HT', 0, 'LI4E17' );

Skills.Tactics = new Skill( 'Tactics', 'IQ', 2, 'LI4E17' );
Skills.Theology = new Skill( "Theology", 'IQ', 2, 'LI4E15' );
Skills.Theology.specRequiredList = [];
Skills.Throwing = new Skill( "Throwing", 'DX', 1, 'LI4E17' );
Skills.ThrownWeapon = new Skill( 'Thrown Weapon', 'DX', 0, 'LI4E17' );
Skills.ThrownWeapon.specRequiredList = ['Axe/Mace','Knife','Shuriken','Spear'];
Skills.ThrownWeapon.specCategName = 'weapon type';
Skills.Tracking = new Skill( 'Tracking', 'Per', 1, 'LI4E17' );
Skills.Traps = new Skill( 'Traps', 'IQ', 1, 'LI4E17' );
Skills.Traps.TLs = true;
Skills.TwoHandedSword = new Skill( 'Two-Handed Sword', 'DX', 1, 'LI4E15' );

Skills.Writing = new Skill( "Writing", 'IQ', 1, 'LI4E17' );

// add a 'key' attribute to each skill with value equal to its label in the Skills, etc. object
for ( var l in Skills ) {
    if( !Skills[l].hasOwnProperty('key') ) Skills[l].key = l;
}

var SkillsGURPSLite = [
// Athletic
'Acrobatics','Climbing','Hiking','Jumping','Riding','Swimming','Throwing',
// Outdoors
'AreaKnowledge','Camouflage','Navigation','Survival','Tracking',
// Humanities
'History','Literature','Philosophy','Research','Theology','Writing',
// Natural Sciences
'Astronomy','Biology','Chemistry','Geology','Naturalist','Physics','Mathematics',
// Social Sciences
'Anthropology','Archaeology','Occultism','Psychology','Sociology',
// Job
'AnimalHandling','ComputerOperation','Crewman','ElectronicsOperation','ElectronicsRepair','EnvironmentSuit',
// Professional
'Acting','Armoury','ComputerProgramming','Engineer','Law','Mechanic','Merchant','Photography',
// Medical
'Diagnosis','FirstAid','Physician',
// Influence skills
'Carousing','Diplomacy','FastTalk','Interrogation','Intimidation','Leadership','PublicSpeaking','SavoirFaire','SexAppeal',
// Melee weapon
'Rapier','Smallsword','Flail','AxeMace','Polearm','Spear','StaffSkill','Broadsword','Knife','Shortsword','TwoHandedSword',
// Missile weapon
'Gunner','Guns','Blowpipe','Bow','Crossbow',
// Martial
'Brawling','Karate','Shield','ThrownWeapon',
// Military
'Tactics','Observation','Explosives',
// Thief/Spy/Law Enforcement
'Criminology','Disguise','Escape','Forgery','Gambling','Holdout','Lockpicking','Pickpocket',
'Scrounging','Search','Shadowing','Smuggling','Stealth','Streetwise','Traps',
// Vehicle skills
'Bicycling','Boating','Driving','Piloting','Submarine'];


/****  Defaults  ****/
Defaults = {};

Defaults.Bicycling_from_IQ = { target: 'Bicycling', penalty: -4, from: 'IQ', category: 'stat' };
Defaults.Boating_from_IQ = { target: 'Boating', penalty: -5, from: 'IQ', category: 'stat' };
Defaults.Brawling_from_stat = { target: 'Brawling', penalty: false, category: 'stat' };
Defaults.Programming_from_stat = { target: 'ComputerProgramming', penalty: false, category: 'stat' };
Defaults.Driving_from_IQ = { target: 'Driving', penalty: -5, from: 'IQ', category: 'stat' };
Defaults.Engineer_from_stat = { target: 'Engineer', penalty: false, category: 'stat' };
Defaults.SexAppeal_from_HT = { target: 'SexAppeal', penalty: -3, from: 'HT', category: 'stat' };
Defaults.Jumping_from_stat = { target: 'Jumping', penalty: false, category: 'stat' };
Defaults.Karate_from_stat = { target: 'Karate', penalty: false, category: 'stat' };
Defaults.Physician_from_IQ = { target: 'Physician', penalty: -7,  from: 'IQ', category: 'stat' };
Defaults.Piloting_from_IQ = { target: 'Piloting', penalty: -6, from: 'IQ', category: 'stat' };
Defaults.Submarine_from_IQ = { target: 'Submarine', penalty: -5, from: 'IQ', category: 'stat' };
Defaults.Throwing_from_DX = { target: 'Throwing', penalty: -3, from: 'DX', category: 'stat' };


var Groups = {
  // skill categories
  AnimalSkills : ['AnimalHandling','Riding'],
  AthleticSkills : ['Acrobatics','Hiking','Jumping','Riding','Swimming','Throwing'],
  InfluenceSkills : ['Diplomacy','FastTalk','Intimidation','SavoirFaire','SexAppeal','Streetwise'],
  MeleeWeaponSkills : ['Flail','AxeMace','Polearm','Spear','StaffSkill','Broadsword','Knife','Shortsword','TwoHandedSword'],
  MissileWeaponSkills : ['Blowpipe','Bow','Crossbow','Gunner','Guns','LiquidProjector','ThrownWeapon'],
  NaturalScienceSkills : ['Astronomy','Biology','Chemistry','Geology','Physics'],
  PhysiologicalSkills : ['Diagnosis','FirstAid','Physician'],
  SocialScienceSkills : ['Anthropology','Archaeology','Psychology','Sociology'],
  VehicleSkills : ['Bicycling','Boating','Driving','Piloting','Submarine']
};
Groups.CombatWeaponSkills = Groups.MeleeWeaponSkills.concat(Groups.MissileWeaponSkills);
// Talent skill groups
Groups.ArtificerTalent = ["Armoury","ElectronicsRepair","Engineer","Mechanic"];
Groups.OutdoorsmanTalent = ["Camouflage","Naturalist","Navigation","Survival","Tracking"];
Groups.SmoothOperatorTalent = Groups.InfluenceSkills.concat(["Acting","Carousing","Leadership","PublicSpeaking"]);
// no magic in Lite 4e, but defining an empty group here prevents some sheet errors
Groups.Colleges = [];

var GroupNames = {
  AnimalSkills : 'Animal skills',
  AthleticSkills : 'Athletic skills',
  InfluenceSkills : 'Influence skills',
  MeleeWeaponSkills : 'Melee weapon skills',
  NaturalScienceSkills : 'Natural Science skills',
  PhysiologicalSkills : 'Physiological skills',
  SocialScienceSkills : 'Social Science skills',
  VehicleSkills : 'Vehicle skills',
};
var collegeNames = {};
var CollegeHash = {};
Spells = {};

/****  Equipment  ****/
/*
The GURPS Lite 4th edition document doesn't describe ANY equipment other than weapons, armor, and shields.
The equipment below is lifted from the 4th edition full rules.
*/

//  BasicEquipment, ShieldItems, ArmorItems, and Weapons objects are declared in the equipment.js file.

// These Groups defined here for use by Item.goeswith attributes in BasicEquipment below.
Groups.knives = ['KnifeLarge'];
Groups.swords = ['Shortsword','Broadsword','BroadswordThr','GreatswordThr'];
Groups.blades = Groups.swords.concat(Groups.knives);
Groups.cuttingWeapons = ['Axe','ThrowingAxe','Poleaxe'];
Groups.cuttingTools = ['ironplow','saw','shovel'];
Groups.edged = Groups.blades.concat(Groups.cuttingWeapons.concat(Groups.cuttingTools));
Groups.bows = ['ShortBow','Longbow'];
Groups.crossbows = ['Crossbow'];
Groups.pistols = ['Derringer41','AutoPistol9mmTL6','AutoPistol44M','Revolver357M'];
Groups.rifles = ['LeverActionCarbine30','SelfLoadingRifle762mm','SniperRifle338','PumpShotgun12G'];
Groups.guns = Groups.pistols.concat(Groups.rifles);

var u = null;       // use for undefined attributes here below

/* NB
  The GURPS Lite 4e rules do not contain ANY equipment other than weapons and shields.
  The basic equipment sets below are lifted from GURPS 4e, most importantly so
  that the random character generation software will still work in this setting.
  This has the side-effect of providing a decent subset of the basic equipment for
  normal character generation.
*/
/* Basic Equipment                                 'name',               weight, cost, TL, LC, 'ref'   */
BasicEquipment = {};
// Camping and Survival Gear                       'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.backpackframe      = new Equipment( 'backpack',               10,  100,  1,  u, 'B288' );
BasicEquipment.backpackframe.detail = "frame";
BasicEquipment.backpackframe.notes = ['Holds 100 lbs. of gear.'],
BasicEquipment.backpacksmall      = new Equipment( 'backpack',                3,   60,  1,  u, 'B288' );
BasicEquipment.backpacksmall.detail = "small";
BasicEquipment.backpacksmall.notes = ['Holds 40 lbs. of gear.'];
BasicEquipment.blanket            = new Equipment( 'blanket',                 4,   20,  1,  u, 'B288' );
BasicEquipment.blanket.notes = ['A warm sleeping blanket.'];
BasicEquipment.ceramicbottle1qt   = new Equipment( 'bottle',                  1,    3,  1,  u, 'B288' );
BasicEquipment.ceramicbottle1qt.detail = "1 qt ceramic";
BasicEquipment.ceramicbottle1qt.notes = ['Holds 1 quart of liquid (2 lbs. if water).'];
BasicEquipment.steelcable         = new Equipment( 'cable',                 1.7,   10,  5,  u, 'B288' );
BasicEquipment.steelcable.detail = "1.5″ steel";
BasicEquipment.steelcable.notes = ['Supports 3,700 lbs.'],
BasicEquipment.steelcable.continuous = true;
BasicEquipment.steelcable.unit = 'yd';
BasicEquipment.steelcable.many = 8;
BasicEquipment.smcampstove        = new Equipment( 'stove',                   2,   50,  6,  u, 'B288' );
BasicEquipment.smcampstove.detail = "small camping";
BasicEquipment.smcampstove.notes = ['Uses 0.25 gallons kerosene per 4 hrs.'],
BasicEquipment.tallowcandle       = new Equipment( 'candle',                  1,    5,  1,  u, 'B288' );
BasicEquipment.tallowcandle.detail = "tallow";
BasicEquipment.tallowcandle.notes = ['Smoky! Lasts 12 hrs.'],
BasicEquipment.tallowcandle.many = 3;
BasicEquipment.canteen            = new Equipment( 'canteen',                 1,   10,  5,  u, 'B288' );
BasicEquipment.canteen.detail = "1 qt";
BasicEquipment.canteen.notes = ['Holds 1 quart of liquid (2 lbs. if water).'];
BasicEquipment.lighter            = new Equipment( 'lighter',                 0,   10,  6,  u, 'B288' );
BasicEquipment.lighter.detail = "cigarette";
BasicEquipment.lighter.notes = ['Lights fire.'],
BasicEquipment.climbinggear       = new Equipment( 'climbing gear',           4,   20,  2,  u, 'B288' );
BasicEquipment.climbinggear.notes = ['Hammer, spikes, carabiners.'],
BasicEquipment.climbinggear.unit = 'set';
BasicEquipment.compass            = new Equipment( 'compass',                 0,   50,  6,  u, 'B288' );
BasicEquipment.compass.notes = ['+1 to Navigation skill.'],
BasicEquipment.cord               = new Equipment( 'cord',                 0.05,  0.1,  1,  u, 'B288' );
BasicEquipment.cord.detail = "3/16″";
BasicEquipment.cord.notes = ['Supports 90 lbs.'],
BasicEquipment.cord.continuous = true;
BasicEquipment.cord.unit = 'yd';
BasicEquipment.cord.many = 10;
BasicEquipment.ropethin           = new Equipment( 'rope',                 0.15,  0.5,  0,  u, 'B288' );
BasicEquipment.ropethin.detail = "3/8″";
BasicEquipment.ropethin.notes = ['supports 300 lbs.'],
BasicEquipment.ropethin.continuous = true;
BasicEquipment.ropethin.unit = 'yd';
BasicEquipment.ropethin.many = 20;
BasicEquipment.ropethick          = new Equipment( 'rope',                  0.5,  2.5,  0,  u, 'B288' );
BasicEquipment.ropethick.detail = "3/4″";
BasicEquipment.ropethick.notes = ['supports 1,100 lbs.'],
BasicEquipment.ropethick.continuous = true;
BasicEquipment.ropethick.unit = 'yd';
BasicEquipment.ropethick.many = 10;
BasicEquipment.fishinggear        = new Equipment( 'fishhooks & line',        0,   50,  0,  u, 'B288' );
BasicEquipment.fishinggear.notes = ['Basic gear for Fishing skill; needs a pole.'],
BasicEquipment.fishinggear.unit = 'set';
BasicEquipment.flashlighthvy      = new Equipment( 'flashlight',              1,   20,  6,  u, 'B288' );
BasicEquipment.flashlighthvy.detail = "heavy";
BasicEquipment.flashlighthvy.notes = ["30' beam."],
BasicEquipment.flashlightmini     = new Equipment( 'flashlight',           0.25,   10,  7,  u, 'B288' );
BasicEquipment.flashlightmini.detail = "mini";
BasicEquipment.flashlightmini.notes = ["15' beam."],
BasicEquipment.gasoline           = new Equipment( 'gasoline',                6,  1.5,  6,  u, 'B288' );
BasicEquipment.gasoline.continuous = true;
BasicEquipment.gasoline.unit = 'gal';
BasicEquipment.gasoline.many = 2;
BasicEquipment.GPSreceiver        = new Equipment( 'GPS receiver',            3,  200,  8,  u, 'B288' );
BasicEquipment.GPSreceiver.notes = ['Satellite-updated; grants Absolute Direction (Requires Signal).'],
BasicEquipment.grapnel            = new Equipment( 'grapnel',                 2,   20,  5,  u, 'B288' );
BasicEquipment.grapnel.notes = ['Throw to ST×2 yards. Supports 300 lbs.'],
BasicEquipment.groupbasics        = new Equipment( 'group basics',           20,   50,  0,  u, 'B288' );
BasicEquipment.groupbasics.notes = ['Basic equipment for Cooking and Survival skill for a group. Cook pot, rope, hatchet, etc., for 3-8 campers.'],
BasicEquipment.groupbasics.unit = 'box';
BasicEquipment.piton              = new Equipment( 'spike/piton',           0.5,    1,  2,  u, 'B288' );
BasicEquipment.piton.detail = "iron";
BasicEquipment.piton.notes = ['For climbing, spiking doors, etc.'],
BasicEquipment.piton.many = 5;
BasicEquipment.kerosene           = new Equipment( 'kerosene',                6,  1.5,  6,  u, 'B288' );
BasicEquipment.kerosene.continuous = true;
BasicEquipment.kerosene.unit = 'gal';
BasicEquipment.kerosene.many = 2;
BasicEquipment.lantern            = new Equipment( 'lantern',                 2,   20,  2,  u, 'B288' );
BasicEquipment.lantern.notes = ['Burns for 24 hours on 1 pint of oil.'],
BasicEquipment.lantern.needs = 'lanternoil';
BasicEquipment.lifejacket         = new Equipment( 'life jacket',             6,  100,  6,  u, 'B288' );
BasicEquipment.lifejacket.notes = ['Floats up to 350 lbs.'],
BasicEquipment.matches            = new Equipment( 'matches',                 0,  1.5,  6,  u, 'B288' );
BasicEquipment.matches.notes = ['Start fires. Box of 50, waterproof.'],
BasicEquipment.matches.unit = 'box';
BasicEquipment.lanternoil         = new Equipment( 'oil',                     1,    2,  2,  u, 'B288' );
BasicEquipment.lanternoil.detail = "lantern";
BasicEquipment.lanternoil.notes = ['For lantern.'],
BasicEquipment.lanternoil.continuous = true;
BasicEquipment.lanternoil.unit = 'pt';
BasicEquipment.lanternoil.maxTL = 6;
BasicEquipment.lanternoil.many = 2;
BasicEquipment.parachute          = new Equipment( 'parachute',              30, 1000,  6,  u, 'B288' );
BasicEquipment.parachute.notes = ['Use with Parachuting skill. The wearer will fall at least 80 yards before it opens, and then descend at 5 yards/second.'],
BasicEquipment.personalbasics     = new Equipment( 'personal basics',         1,    5,  0,  u, 'B288' );
BasicEquipment.personalbasics.notes = ['Minimum gear for camping: -2 to any Survival roll without it. Includes utensils, tinderbox or flint and steel, towel, etc., as TL permits.'],
BasicEquipment.personalbasics.unit = 'set';
BasicEquipment.pole6ft            = new Equipment( 'pole',                    3,    5,  0,  u, 'B288' );
BasicEquipment.pole6ft.detail = "6′";
BasicEquipment.pole6ft.notes = ['For pitching tents, fishing, or prodding items.'],
BasicEquipment.pole10ft           = new Equipment( 'pole',                    5,    8,  0,  u, 'B288' );
BasicEquipment.pole10ft.detail = "10′";
BasicEquipment.pole10ft.notes = ["For things you wouldn't touch with a 6' pole."],
BasicEquipment.pole               = new Equipment( 'pole',                  0.5,  0.8,  0,  u, 'B288' );
BasicEquipment.pole.continuous = true;
BasicEquipment.pole.unit = 'ft';
BasicEquipment.pole.many = 8;
BasicEquipment.pouchsmall         = new Equipment( 'pouch/purse',             0,   10,  1,  u, 'B288' );
BasicEquipment.pouchsmall.detail = "small";
BasicEquipment.pouchsmall.notes = ['Holds 3 lbs.'];
BasicEquipment.pouchsmall.many = 3;
BasicEquipment.scubagear          = new Equipment( 'scuba gear',             32, 1500,  6,  u, 'B288' );
BasicEquipment.scubagear.notes = ['Basic equipment for Scuba skill: 2-hour underwater air tank, with regulator, facemask, etc.'];
BasicEquipment.scubagear.unit = 'rig';
BasicEquipment.sleepingbag        = new Equipment( 'sleeping bag',            7,   25,  6,  u, 'B288' );
BasicEquipment.sleepingbag.notes = ['For normal conditions.'];
BasicEquipment.inssleepingbag     = new Equipment( 'sleeping bag',           15,  100,  7,  u, 'B288' );
BasicEquipment.inssleepingbag.detail = "insulated";
BasicEquipment.inssleepingbag.notes = ['+3 HT to resist freezing.'];
BasicEquipment.sleepingfur        = new Equipment( 'sleeping fur',            8,   50,  0,  u, 'B288' );
BasicEquipment.sleepingfur.notes = ['Warm unless wet.'];
BasicEquipment.suitcase           = new Equipment( 'suitcase',                8,  250,  5,  u, 'B288' );
BasicEquipment.suitcase.detail = "hard";
BasicEquipment.suitcase.notes = ['Holds 100 lbs. DR 4, with key lock.'];
BasicEquipment.tent1man           = new Equipment( 'tent',                    5,   50,  0,  u, 'B288' );
BasicEquipment.tent1man.detail = "1-person";
BasicEquipment.tent1man.notes = ['Includes ropes; no poles needed'];
BasicEquipment.tent2man           = new Equipment( 'tent',                   12,   80,  0,  u, 'B288' );
BasicEquipment.tent2man.detail = "2-person";
BasicEquipment.tent2man.notes = ['Includes ropes; requires one 6-foot pole.'];
BasicEquipment.tent4man           = new Equipment( 'tent',                   30,  150,  0,  u, 'B288' );
BasicEquipment.tent4man.detail = "4-person";
BasicEquipment.tent4man.notes = ['Includes ropes; requires 2 poles.'];
BasicEquipment.tent20man          = new Equipment( 'tent',                  100,  300,  1,  u, 'B288' );
BasicEquipment.tent20man.detail = "20-person";
BasicEquipment.tent20man.notes = ['Includes ropes; requires 16 poles.'];
BasicEquipment.thermos            = new Equipment( 'bottle',                  2,   10,  5,  u, 'B288' );
BasicEquipment.thermos.detail = "thermos";
BasicEquipment.thermos.notes = ['Keeps 1 pint hot (24 hrs.) or cold (72 hrs.).'];
BasicEquipment.torch              = new Equipment( 'torch',                   1,    3,  0,  u, 'B288' );
BasicEquipment.torch.notes = ['Burns for 1 hr.'],
BasicEquipment.torch.many = 4;
BasicEquipment.torch.maxTL = 5;
BasicEquipment.rations            = new Equipment( 'ration',                0.5,    2,  0,  u, 'B288' );
BasicEquipment.rations.detail = "traveler’s";
BasicEquipment.rations.notes = ['One meal of dried meat, cheese, etc.'],
BasicEquipment.rations.many = 7;
BasicEquipment.H2Opurtablets      = new Equipment( 'tablets',                 0,    5,  6,  u, 'B288' );
BasicEquipment.H2Opurtablets.detail = "water purification";
BasicEquipment.H2Opurtablets.notes = ['Bottle of 50. Purify 1 quart each.'],
BasicEquipment.H2Opurtablets.unit = 'bottle';
BasicEquipment.wineskin1gal       = new Equipment( 'wineskin',             0.25,   10,  0,  u, 'B288' );
BasicEquipment.wineskin1gal.detail = "1 gal";
BasicEquipment.wineskin1gal.notes = ['Holds 1 gallon of liquid (8 lbs. if water).'];
BasicEquipment.wineskin1galfull   = new Equipment( 'wineskin',                8,   10,  0,  u, 'B288' );
BasicEquipment.wineskin1galfull.detail = "1 gal (full)";
BasicEquipment.wristwatch         = new Equipment( 'wristwatch',               0,  20,  6,  u, 'B288' );
Groups.campinggear = ['backpackframe','backpacksmall','blanket','ceramicbottle1qt','steelcable',
                      'smcampstove','tallowcandle','canteen','lighter','climbinggear','compass',
                      'cord','ropethin','ropethick','fishinggear','flashlighthvy','flashlightmini',
                      'gasoline','GPSreceiver','grapnel','groupbasics','piton','kerosene','lantern',
                      'lifejacket','matches','lanternoil','parachute','personalbasics','pole6ft','pole10ft',
                      'pouchsmall','scubagear','sleepingbag','inssleepingbag','sleepingfur',
                      'suitcase','tent1man','tent2man','tent4man','tent20man','thermos','torch',
                      'rations','H2Opurtablets','wineskin1gal','wineskin1galfull','wristwatch'];
// Communications and Information Gear             'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.battery            = new Equipment( 'battery',                 0,    1,  6,  u, 'B288' );
BasicEquipment.battery.many = 4;
BasicEquipment.cellphone          = new Equipment( 'cell phone',           0.25,  250,  8,  u, 'B288' );
BasicEquipment.cellphone.notes = ['Only works in some areas; $20/month fee.'],
BasicEquipment.laptopcomp         = new Equipment( 'computer',                3, 1500,  8,  u, 'B288' );
BasicEquipment.laptopcomp.detail = "laptop";
BasicEquipment.laptopcomp.notes = ['Modem plugs into phone.'],
BasicEquipment.wearablecomp       = new Equipment( 'computer',                2, 1000,  8,  u, 'B288' );
BasicEquipment.wearablecomp.detail = "wearable";
BasicEquipment.wearablecomp.notes = ['Display glasses and wireless modem.'],
BasicEquipment.drum               = new Equipment( 'drum',                   40,    2,  0,  u, 'B288' );
BasicEquipment.drum.notes = ['Audible for several miles.'],
BasicEquipment.minirecorder       = new Equipment( 'minirecorder',          0.5,  200,  7,  u, 'B288' );
BasicEquipment.minirecorder.notes = ['Palm-sized, with 3-hour tape (extra tapes are $5).'],
BasicEquipment.digitalrecorder    = new Equipment( 'minirecorder',          0.5,   30,  8,  u, 'B288' );
BasicEquipment.digitalrecorder.detail = "digital";
BasicEquipment.digitalrecorder.notes = ['Palm-sized, with 3-hour tape (extra tapes are $5).'],
BasicEquipment.backpackradio      = new Equipment( 'radio',                  15, 6000,  7,  u, 'B288' );
BasicEquipment.backpackradio.detail = "backpack";
BasicEquipment.backpackradio.notes = ['VHF radio. 20-mile range.'],
BasicEquipment.handradio          = new Equipment( 'radio',                   1,  100,  7,  u, 'B288' );
BasicEquipment.handradio.detail = "hand";
BasicEquipment.handradio.notes = ['Classic "walkie-talkie." 2-mile range.'],
BasicEquipment.headsetradio       = new Equipment( 'radio',                 0.5,  500,  8,  u, 'B288' );
BasicEquipment.headsetradio.detail = "headset";
BasicEquipment.headsetradio.notes = ['With throat mike. 1-mile range. Multiply cost by 10 for secure, encrypted version.'],
BasicEquipment.satellitephone     = new Equipment( 'phone',                   3, 3000,  8,  u, 'B288' );
BasicEquipment.satellitephone.detail = "satellite";
BasicEquipment.satellitephone.notes = ['Global range, satellite relay.'],
BasicEquipment.scribeskit         = new Equipment( 'scribe&rsquo;s kit',      2,   50,  3,  u, 'B288' );
BasicEquipment.scribeskit.notes = ['Quills, inkbottles, penknife, paper.'],
BasicEquipment.transradio         = new Equipment( 'radio',                 0.5,   15,  7,  u, 'B288' );
BasicEquipment.transradio.detail = "transistor";
BasicEquipment.transradio.notes = ['Receive-only; picks up radio stations.'],
BasicEquipment.transradio.needs = 'battery';
BasicEquipment.miniTV             = new Equipment( 'TV',                      3,  150,  7,  u, 'B288' );
BasicEquipment.miniTV.detail = "mini";
BasicEquipment.miniTV.notes = ['5" × 5" flat-screen.'],
BasicEquipment.typewriter         = new Equipment( 'typewriter',             10,  200,  6,  u, 'B289' );
BasicEquipment.typewriter.maxTL = 7;
BasicEquipment.waxtablet          = new Equipment( 'wax tablet',              2,   10,  1,  u, 'B289' );
BasicEquipment.waxtablet.notes = ['For writing; erasable.'],
BasicEquipment.waxtablet.many = 2;
BasicEquipment.waxtablet.maxTL = 4;
Groups.commgear = ['battery','cellphone','laptopcomp','wearablecomp','drum','minirecorder',
                   'digitalrecorder','backpackradio','handradio','headsetradio','satellitephone',
                   'scribeskit','transradio','miniTV','typewriter','waxtablet'];
// Equestrian Gear                                 'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.bitbridle          = new Equipment( 'bit & bridle',            3,   35,  1,  u, 'B289' );
BasicEquipment.bitbridle.notes = ['+2 to control horse, or +3 if using both hands.'],
BasicEquipment.horseshoes         = new Equipment( 'horseshoes',              4,   50,  3,  u, 'B289' );
BasicEquipment.horseshoes.unit = 'set';
BasicEquipment.horseshoes.notes = ['Shod horses get +2 HT on any rolls for stamina on long rides.'],
BasicEquipment.saddletack         = new Equipment( 'saddle & tack',          15,  150,  2,  u, 'B289' );
BasicEquipment.saddletack.notes = ['Basic equipment for Riding skill.'],
BasicEquipment.saddlebags         = new Equipment( 'saddlebags',              3,  100,  1,  u, 'B289' );
BasicEquipment.saddlebags.notes = ['Hold 40 lbs.'];
BasicEquipment.saddlebags.unit = 'pair';
BasicEquipment.spurs              = new Equipment( 'spurs',                   0,   25,  2,  u, 'B289' );
BasicEquipment.spurs.notes = ['+1 to control a mount.'];
BasicEquipment.spurs.unit = 'pair';
BasicEquipment.saddlestirrups     = new Equipment( 'saddle',                 20,  125,  3,  u, 'B289' );
BasicEquipment.saddlestirrups.description = ' w/ stirrups';
BasicEquipment.saddlestirrups.notes = ['Make it easy to mount a horse and give +1 to control mount. Required to use Lance skill.'];
BasicEquipment.warsaddle          = new Equipment( 'war saddle',             35,  250,  3,  u, 'B289' );
BasicEquipment.warsaddle.notes = ['+1 to Riding skill to stay seated, 50% chance user will stay seated even if unconscious.'];
Groups.equestriangear = ['bitbridle','saddletack','saddlebags','spurs','saddlestirrups','warsaddle'];
// Law-Enforcement, Thief, and Spy Gear            'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.audiobug           = new Equipment( 'bug',                     0,  200,  7,  u, 'B289' );
BasicEquipment.audiobug.detail = "audio";
BasicEquipment.audiobug.notes = ['-7 to spot, 1/4-mile range, transmits for 1 week.'];
BasicEquipment.audiobug.many = 2;
BasicEquipment.bugstomper         = new Equipment( 'bug stomper',             2, 1200,  7,  u, 'B289' );
BasicEquipment.bugstomper.notes = ['Jams bugs in a 10-yard radius.'];
BasicEquipment.disguisekit        = new Equipment( 'disguise kit',           10,  200,  5,  u, 'B289' );
BasicEquipment.disguisekit.notes = ['+1 to Disguise skill.'];
BasicEquipment.elockpicks         = new Equipment( 'electronic lockpicks',    3, 1500,  7,  u, 'B289' );
BasicEquipment.elockpicks.notes = ['+2 to pick electronic locks.'];
BasicEquipment.elockpicks.unit = 'set';
BasicEquipment.handcuffs          = new Equipment( 'handcuffs',             0.5,   40,  5,  u, 'B289' );
BasicEquipment.handcuffs.notes = ['Give -5 to Escape.'];
BasicEquipment.handcuffs.unit = 'pair';
BasicEquipment.homingbeacon       = new Equipment( 'homing beacon',           0,   40,  7,  u, 'B289' );
BasicEquipment.homingbeacon.notes = ['Scanner tracks at 1-mile range.'];
BasicEquipment.lasermic           = new Equipment( 'laser microphone',        2,  500,  8,  u, 'B289' );
BasicEquipment.lasermic.notes = ['Eavesdrop through glass. 300-yd. range.'];
BasicEquipment.lockpicks          = new Equipment( 'lockpicks',               0,   50,  3,  u, 'B289' );
BasicEquipment.lockpicks.notes = ['Basic equipment for Lockpicking skill.'];
BasicEquipment.lockpicks.unit = 'set';
BasicEquipment.nanobug            = new Equipment( 'nanobug',                 0,  100,  8,  u, 'B289' );
BasicEquipment.nanobug.notes = ['Pinhead-sized audio-visual bug (-10 to spot).'];
BasicEquipment.shotgunmic         = new Equipment( 'microphone',              2,  250,  6,  u, 'B289' );
BasicEquipment.shotgunmic.detail = "shotgun";
BasicEquipment.shotgunmic.notes = ['Gives (TL-5) levels of Parabolic Hearing.'];
Groups.enforcementgear = ['audiobug','bugstomper','disguisekit','elockpicks','handcuffs',
                          'homingbeacon','lasermic','lockpicks','nanobug','shotgunmic'];
// Medical Gear                                    'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.antibiotics        = new Equipment( 'antibiotics',             0,   20,  6,  u, 'B289' );
BasicEquipment.antibiotics.notes = ['Prevents or cures (in 1d days) infections.'];
BasicEquipment.antibiotics.unit = 'course';
BasicEquipment.antitoxinkit       = new Equipment( 'antitoxin kit',         0.5,   25,  6,  u, 'B289' );
BasicEquipment.antitoxinkit.notes = ['Antidote for specific poison. 10 uses.'];
BasicEquipment.bandages           = new Equipment( 'bandages',                2,   10,  3,  u, 'B289' );
BasicEquipment.bandages.notes = ['Bandages for a half-dozen wounds. Might be clean cloth, adhesive dressings, or spray-on "plastiskin," depending on TL. Basic equipment for First Aid skill.'];
BasicEquipment.bandages.unit = 'set';
BasicEquipment.crashkit           = new Equipment( 'crash kit',              10,  200,  3,  u, 'B289' );
BasicEquipment.crashkit.notes = ['A complete kit for treating serious injuries. Includes sterile bandages, sutures, and drugs appropriate for the TL. At TL6+, includes IV drip, needle, and plasma. +2 to First Aid skill, and counts as improvised gear (-5) for Surgery.'];
BasicEquipment.firstaidkit        = new Equipment( 'first-aid kit',           2,   50,  1,  u, 'B289' );
BasicEquipment.firstaidkit.notes = ['A complete kit for treating wounds, with bandages, ointments, etc. +1 to First Aid skill.'];
BasicEquipment.surgicalinst       = new Equipment( 'surgical instruments',   15,  300,  3,  u, 'B289' );
BasicEquipment.surgicalinst.notes = ['Includes scalpels, forceps, etc. Basic equipment for Surgery skill.'];
BasicEquipment.surgicalinst.unit = 'set';
Groups.medicalgear = ['antibiotic','antitoxinkit','bandages','crashkit','firstaidkit','surgicalinst'];
// Optics and Sensors                              'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.binoculars         = new Equipment( 'binoculars',              2,  400,  6,  u, 'B289' );
BasicEquipment.binoculars.notes = ['Gives (TL-4) levels of Telescopic Vision.'];
BasicEquipment.binoculars.unit = 'pair';
BasicEquipment.camcorder          = new Equipment( 'camcorder',               1, 1000,  8,  u, 'B289' );
BasicEquipment.camcorder.notes = ['Has 10× zoom. Gives Night Vision 5.'];
BasicEquipment.camcorder.needs = 'battery';
BasicEquipment.camera35mm         = new Equipment( 'camera',                  3,   50,  6,  u, 'B289' );
BasicEquipment.camera35mm.detail = "35mm";
BasicEquipment.camera35mm.notes = ['Basic equipment for Photography skill. Extra film is 32 shots ($10, neg.). Better cameras cost much more!'];
BasicEquipment.metaldetectorwand  = new Equipment( 'metal detector wand',     1,   50,  7,  u, 'B289' );
BasicEquipment.metaldetectorwand.notes = ['+3 to find metal items.'];
BasicEquipment.metaldetectorwand.needs = 'battery';
BasicEquipment.digitalminicam     = new Equipment( 'minicam',                 0,  500,  8,  u, 'B289' );
BasicEquipment.digitalminicam.detail = "digital";
BasicEquipment.digitalminicam.notes = ['Stores pictures on optical disk.'];
BasicEquipment.nightvisiongoggles = new Equipment( 'night vision goggles',    2,  600,  8,  u, 'B289' );
BasicEquipment.nightvisiongoggles.notes = ['Give Night Vision 9.'];
BasicEquipment.nightvisiongoggles.needs = 'battery';
BasicEquipment.nightvisiongoggles.unit = 'pair';
BasicEquipment.spycamera          = new Equipment( 'camera',                  3,  500,  6,  u, 'B289' );
BasicEquipment.spycamera.detail = "spy";
BasicEquipment.spycamera.notes = ['Holds 36 exposures, uses microfilm.'];
BasicEquipment.telescope          = new Equipment( 'telescope',               6,  500,  4,  u, 'B289' );
BasicEquipment.telescope.notes = ['Gives (TL-3) levels of Telescopic Vision.'];
Groups.sensorsgear = ['binoculars','camcorder','camera35mm','metaldetectorwand','digitalminicam',
                      'nightvisiongoggles','spycamera','telescope'];
// Tools                                           'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.balanceweights     = new Equipment( 'balance & weights',       3,   35,  1,  u, 'B289' );
BasicEquipment.balanceweights.notes = ['For weighing goods.'];
BasicEquipment.balanceweights.unit = 'set';
BasicEquipment.crowbar            = new Equipment( 'crowbar',                 3,   20,  2,  u, 'B289' );
BasicEquipment.crowbar.notes = ['Treat as a small mace in combat, but at -1 to skill.'];
BasicEquipment.cuttingtorch       = new Equipment( 'cutting torch',          30,  500,  6,  u, 'B289' );
BasicEquipment.cuttingtorch.notes = ['1d+3(2) burn per second. Each gas bottle gives 30 seconds of cutting.'];
BasicEquipment.bottledgas        = new Equipment( 'gas',                     15,   50,  6,  u, 'B289' );
BasicEquipment.bottledgas.detail = "bottled";
BasicEquipment.bottledgas.unit = 'bottle';
BasicEquipment.bottledgas.notes = ['for cutting torch'],
BasicEquipment.knittingneedles    = new Equipment( 'knitting needles',        0,    5,  3,  u, 'B289' );
BasicEquipment.knittingneedles.notes = ['Per pair.'];
BasicEquipment.knittingneedles.unit = 'pair';
BasicEquipment.pickaxe            = new Equipment( 'pickaxe',                 8,   15,  2,  u, 'B289' );
BasicEquipment.pickaxe.notes = ['Improves digging speed.'];
BasicEquipment.ironplow           = new Equipment( 'plow',                  120,  220,  2,  u, 'B289' );
BasicEquipment.ironplow.detail = "iron";
BasicEquipment.ironplow.notes = ['Works rough soils.'];
BasicEquipment.ironplow.maxTL = 6;
BasicEquipment.woodenplow         = new Equipment( 'plow',                   60,   55,  1,  u, 'B289' );
BasicEquipment.woodenplow.detail = "wooden";
BasicEquipment.woodenplow.notes = ['Pulled by oxen.'];
BasicEquipment.woodenplow.maxTL = 4;
BasicEquipment.toolkitCarpentry   = new Equipment( 'toolkit',                20,  300,  1,  u, 'B289' );
BasicEquipment.toolkitCarpentry.detail = "Carpentry";
BasicEquipment.toolkitCarpentry.notes = ['Basic equipment for the Carpentry skill.'];
BasicEquipment.toolkitArmoury     = new Equipment( 'toolkit',                20,  600,  1,  u, 'B289' );
BasicEquipment.toolkitArmoury.detail = "Armoury";
BasicEquipment.toolkitArmoury.notes = ['Basic equipment for the Armoury skill.'];
BasicEquipment.toolkitExplosives  = new Equipment( 'toolkit',                20,  600,  5,  u, 'B289' );
BasicEquipment.toolkitExplosives.detail = "Explosives";
BasicEquipment.toolkitExplosives.notes = ['Basic equipment for the Explosives skill.'];
BasicEquipment.toolkitMachinist   = new Equipment( 'toolkit',                20,  600,  5,  u, 'B289' );
BasicEquipment.toolkitMachinist.detail = "Machinist";
BasicEquipment.toolkitMachinist.notes = ['Basic equipment for the Machinist skill.'];
BasicEquipment.toolkitMechanic    = new Equipment( 'toolkit',                20,  600,  5,  u, 'B289' );
BasicEquipment.toolkitMechanic.detail = "Mechanic";
BasicEquipment.toolkitMechanic.notes = ['Basic equipment for the Mechanic skill.'];
BasicEquipment.toolkitElectrician = new Equipment( 'toolkit',                20,  600,  6,  u, 'B289' );
BasicEquipment.toolkitElectrician.detail = "Electrician";
BasicEquipment.toolkitElectrician.notes = ['Basic equipment for the Electrician skill.'];
BasicEquipment.toolkitElecRepair  = new Equipment( 'toolkit',                10, 1200,  6,  u, 'B289' );
BasicEquipment.toolkitElecRepair.detail = "Electronics Repair";
BasicEquipment.toolkitElecRepair.notes = ['Basic equipment for the Electronics Repair skill.'];
BasicEquipment.saw                = new Equipment( 'saw',                     3,  150,  0,  u, 'B289' );
BasicEquipment.saw.detail = "tree";
BasicEquipment.saw.notes = ["A lumberjack's tool, not a carpentry saw."];
BasicEquipment.shovel             = new Equipment( 'shovel',                  6,   12,  1,  u, 'B289' );
BasicEquipment.shovel.notes = ['Speeds up digging.'];
BasicEquipment.spinningwheel      = new Equipment( 'spinning wheel',         40,  100,  3,  u, 'B289' );
BasicEquipment.spinningwheel.notes = ['Produces yarn six times as fast.'];
BasicEquipment.spinningwheel.maxTL = 5;
BasicEquipment.suitcaselab        = new Equipment( 'suitcase lab',           10, 3000,  3,  u, 'B289' );
BasicEquipment.suitcaselab.notes = ['Basic equipment for a specific scientific skill (e.g., Chemistry or Forensics).'];
BasicEquipment.suitcaselab.description = 'skillname';
BasicEquipment.wheelbarrow        = new Equipment( 'wheelbarrow',            18,   60,  2,  u, 'B289' );
BasicEquipment.wheelbarrow.notes = ['Holds 350 lbs. Divide effective weight of load by 5.'];
BasicEquipment.whetstone          = new Equipment( 'whetstone',               1,    5,  1,  u, 'B289' );
BasicEquipment.whetstone.notes = ['For sharpening tools and weapons.'];
BasicEquipment.whetstone.goeswith = Groups.edged;
Groups.tools = ['balanceweights','crowbar','cuttingtorch','knittingneedles','pickaxe','ironplow',
                'woodenplow','toolkitCarpentry','toolkitArmoury','toolkitExplosives',
                'toolkitMachinist','toolkitMechanic','toolkitElectrician','toolkitElecRepair','saw',
                'shovel','spinningwheel','suitcaselab','wheelbarrow','whetstone'];
// Weapon and Combat Accessories                   'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.goatsfoot          = new Equipment( "goat's foot",             2,   50,  3,  u, 'B276' );
BasicEquipment.goatsfoot.notes = ['Cocking lever to reload a high-ST crossbow or prodd. You can reload a weapon up to 4 ST over your own with 20 one-second Ready maneuvers.'];
BasicEquipment.goatsfoot.goeswith = ['Crossbow'];
BasicEquipment.goatsfoot.maxTL = 5;
BasicEquipment.leatherlanyard     = new Equipment( 'lanyard',                 0,    1,  0,  u, 'B289' );
BasicEquipment.leatherlanyard.detail = "leather";
BasicEquipment.leatherlanyard.notes = ['Lets you retrieve a dropped weapon on a DX roll. Each attempt requires a Ready maneuver. Can be cut: -6 to hit, DR 2, HP 2.'];
BasicEquipment.shoulderholster    = new Equipment( 'holster',                 1,   50,  5,  u, 'B289' );
BasicEquipment.shoulderholster.detail = "shoulder";
BasicEquipment.shoulderholster.notes = ['Allows use of Holdout, but gives -1 to Fast-Draw.'];
BasicEquipment.shoulderholster.goeswith = Groups.pistols;
BasicEquipment.beltholster        = new Equipment( 'holster',               0.5,   25,  5,  u, 'B289' );
BasicEquipment.beltholster.detail = "belt";
BasicEquipment.beltholster.notes = ['Fits most pistols.'];
BasicEquipment.beltholster.goeswith = Groups.pistols;
BasicEquipment.earmuffs           = new Equipment( 'ear muffs',               1,  200,  6,  u, 'B289' );
BasicEquipment.earmuffs.notes = ['Block loud noises (e.g., gunshots). Give Protected Hearing.'];
BasicEquipment.earmuffs.unit = 'pair';
BasicEquipment.steellanyard       = new Equipment( 'lanyard',                 0,   15,  6,  u, 'B289' );
BasicEquipment.steellanyard.detail = "woven steel";
BasicEquipment.steellanyard.notes = ['As leather lanyard, but DR 6, HP 4.'];
BasicEquipment.lasersight         = new Equipment( 'laser sight',             0,  100,  8,  u, 'B289' );
BasicEquipment.lasersight.notes = ['+1 to skill; see Laser Sights (p. 412).'];
BasicEquipment.lasersight.goeswith = Groups.guns;
BasicEquipment.scope4x            = new Equipment( 'scope',                 1.5,  150,  6,  u, 'B289' );
BasicEquipment.scope4x.detail = "4x";
BasicEquipment.scope4x.notes = ['+2 to Acc for aimed shots only.'];
BasicEquipment.scope4x.goeswith = Groups.rifles;
BasicEquipment.scope4xthermal     = new Equipment( 'scope',                   4, 8000,  6,  u, 'B289' );
BasicEquipment.scope4xthermal.detail = "4x thermal imaging";
BasicEquipment.scope4xthermal.notes = ['+2 to Acc for aimed shots only; gives the user Infravision.'];
BasicEquipment.scope4xthermal.goeswith = Groups.rifles;
BasicEquipment.hipquiver          = new Equipment( 'quiver',                  1,   15,  0,  u, 'B289' );
BasicEquipment.hipquiver.detail = "hip";
BasicEquipment.hipquiver.notes = ['Holds 20 arrows or bolts.'];
BasicEquipment.hipquiver.goeswith = Groups.bows;
BasicEquipment.shoulderquiver     = new Equipment( 'quiver',                0.5,   10,  0,  u, 'B289' );
BasicEquipment.shoulderquiver.detail = "shoulder";
BasicEquipment.shoulderquiver.notes = ['Holds 12 arrows or bolts.'];
BasicEquipment.shoulderquiver.goeswith = Groups.bows;
BasicEquipment.silencer           = new Equipment( 'silencer',                1,  400,  6,  u, 'B289' );
BasicEquipment.silencer.notes = ['Reduces damage by -1 per die; see Silencers (p. 412).'];
BasicEquipment.silencer.goeswith = Groups.guns;
BasicEquipment.webgear            = new Equipment( 'web gear',                2,   50,  6,  u, 'B289' );
BasicEquipment.webgear.description = 'climbing';
BasicEquipment.webgear.notes = ['Belt and suspenders with pouches and rings for gear.'];
BasicEquipment.webgear.unit = 'set';
Groups.weapongear = ['goatsfoot','hipquiver','leatherlanyard','shoulderholster','beltholster',
                     'earmuffs','steellanyard','lasersight','scope4x','scope4xthermal',
                     'shoulderquiver','silencer','webgear'];
// ammo                                            'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.blowpipedart       = new Equipment( 'dart',                 0.05,  0.1,  0,  u, 'B276' );
BasicEquipment.blowpipedart.detail = "blowpipe";
BasicEquipment.blowpipedart.goeswith = ["Blowpipe"];
BasicEquipment.blowpipedart.many = 5;
BasicEquipment.leadpellet         = new Equipment( 'pellet',               0.05,  0.1,  0,  u, 'B276' );
BasicEquipment.leadpellet.detail = "lead";
BasicEquipment.leadpellet.goeswith = ["Prodd","Sling"];
BasicEquipment.leadpellet.many = 30;
BasicEquipment.arrow              = new Equipment( 'arrow',                 0.1,    2,  0,  u, 'B276' );
BasicEquipment.arrow.goeswith = Groups.bows;
BasicEquipment.arrow.many = 12;
BasicEquipment.arrowbodkin        = new Equipment( 'arrow',                 0.1,    2,  3,  u, 'B277' );
BasicEquipment.arrowbodkin.detail = "bodkin point";
BasicEquipment.arrowbodkin.goeswith = Groups.bows;
BasicEquipment.arrowbodkin.many = 12;
BasicEquipment.crossbowbolt       = new Equipment( 'crossbow bolt',        0.06,    2,  0,  u, 'B276' );
BasicEquipment.crossbowbolt.goeswith = Groups.crossbows;
BasicEquipment.crossbowbolt.many = 12;
BasicEquipment.crossbowboltbodkin = new Equipment( 'crossbow bolt',        0.06,    2,  3,  u, 'B277' );
BasicEquipment.crossbowboltbodkin.detail = "bodkin point";
BasicEquipment.crossbowboltbodkin.goeswith = Groups.crossbows;
BasicEquipment.crossbowboltbodkin.many = 12;
BasicEquipment.atlatldart         = new Equipment( 'dart',                 0.05,  0.1,  0,  u, 'B276' );
BasicEquipment.atlatldart.detail = "atlatl";
BasicEquipment.atlatldart.goeswith = ["Atlatl"];
BasicEquipment.atlatldart.many = 5;
Groups.ammo = ['blowpipedart','arrow','crossbowbolt','arrowbodkin','crossbowboltbodkin','atlatldart'];

for ( var e in BasicEquipment ) {
    if( !BasicEquipment[e].hasOwnProperty('key') ) BasicEquipment[e].key = e;
}


/* Shields                             'name',       weight, cost, TL, LC, PDB, DR,  HP, Skill, ref  */
ShieldItems = {};
ShieldItems.SmallShield  = new Shield( 'small shield',    8,   40,  0,  4,   1,  6,  30, 'Shield_Shield' );
ShieldItems.MediumShield = new Shield( 'medium shield',  15,   60,  1,  4,   2,  7,  40, 'Shield_Shield' );
ShieldItems.LargeShield  = new Shield( 'large shield',   25,   90,  1,  4,   3,  9,  60, 'Shield_Shield' );

for ( var s in ShieldItems ) {
    if( !ShieldItems[s].hasOwnProperty('key') ) ShieldItems[s].key = s;
}

Groups.ShieldsGURPSLite = ['SmallShield','MediumShield','LargeShield'];


/* Armor                                    'name',                      wt, cost, TL, LC, DR, PD, location*, ref */
ArmorItems = {};
ArmorItems.ClothArmor          = new Armor( 'cloth armor',               12,  150,  1,  u,  1,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.ClothArmor.flexible = true;
ArmorItems.ClothArmor.layerable = true;
ArmorItems.ClothArmor.maxTL = 4;
ArmorItems.LeatherArmor        = new Armor( 'leather armor',           19.5,  340,  1,  4,  2,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.LeatherArmor.maxTL = 4;
ArmorItems.LightScale          = new Armor( 'light scale',               49,  610,  2,  3,  3,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.LightScale.maxTL = 4;
ArmorItems.Chainmail           = new Armor( 'chainmail',                 58,  645,  2,  3,  4,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.Chainmail.maxTL = 4;
ArmorItems.SteelLaminate       = new Armor( 'steel laminate',            64, 1360,  2,  3,  5,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.SteelLaminate.maxTL = 4;
ArmorItems.LightPlate          = new Armor( 'plate armor',             89.5, 4040,  3,  3,  6,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.LightPlate.maxTL = 4;
ArmorItems.FlakJacket          = new Armor( 'flak jacket',               20,  500,  6,  3,  7,  u, ['torso','waist'] );
ArmorItems.FlakJacket.maxTL = 7;
ArmorItems.BallisticVest       = new Armor( 'ballistic vest',             2,  400,  8,  3,  8,  u, ['torso','waist'] );
ArmorItems.BallisticVest.flexible = true;
ArmorItems.TacticalVest        = new Armor( 'tactical vest',              9,  900,  8,  2, 12,  u, ['torso','waist','groin'] );
ArmorItems.TacticalVest.flexible = true;
/*                                          'name',                      wt, cost, TL, LC, DR, PD, location*, */

for ( var a in ArmorItems ) {
    if( !ArmorItems[a].hasOwnProperty('key') ) ArmorItems[a].key = a;
}

Groups.ArmorGURPSLite = ['ClothArmor','LeatherArmor','LightScale','Chainmail','SteelLaminate',
                         'LightPlate','FlakJacket','BallisticVest','TacticalVest'];


/* Weapons                            'name',               weight,  cost, TL, LC, bulk,  qualEffGp [blade|cut|cr/imp|bow|gun], ref */
Weapons = {};

Weapons.Axe             = new Weapon('Axe',                      4,    50,  1,  4,   -3, 'cut' );
Weapons.Axe.wieldOptions          = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' } } ] };
Weapons.Axe.maxTL = 4;
Weapons.Mace            = new Weapon('Mace',                     5,    50,  2,  4,   -3, 'cr/imp' );
Weapons.Mace.wieldOptions         = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cr'  } } ],
                                   ThrownWeapon_AxeMace : [ { title: 'thrown',  hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cr'  }, rangeBasedOnST: true, halfDamageRange: 0.5, maximumRange: 1, accuracy: 1 } ] };
Weapons.Mace.maxTL = 4;
Weapons.BrassKnuckles   = new Weapon('Brass Knuckles',        0.25,    10,  1,  4,  '-',  '' );
Weapons.BrassKnuckles.wieldOptions= { DX          : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Brawling    : [ { title:'Brawling punch', hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Karate      : [ { title:'Karate punch',   hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ] };
Weapons.Broadsword      = new Weapon('Broadsword',               3,   500,  2,  4,   -4, 'blade' );
Weapons.Broadsword.maxTL = 5;
Weapons.Broadsword.wieldOptions   = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'cr'  } } ] };
Weapons.BroadswordThr   = new Weapon('Broadsword',               3,   600,  2,  4,   -4, 'blade' );
Weapons.BroadswordThr.detail = 'Thrusting';
Weapons.BroadswordThr.maxTL = 5;
Weapons.BroadswordThr.wieldOptions= { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' } } ] };
Weapons.KnifeLarge      = new Weapon('Knife',                    1,    40,  0,  4,   -2, 'blade' );
Weapons.KnifeLarge.detail = 'Large';
Weapons.KnifeLarge.wieldOptions   = { Knife             : [ { title: 'swung',   hands:  'dom', strength:  6, damage: { base: 'sw',  mods: -2, type: 'cut' }, maxDamage: '1d+2', reach: 'C,1', parryBonus: -1, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapons</i> table (p. 21)."] },
                                                            { title: 'thrust',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', reach: 'C',   parryBonus: -1, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapons</i> table (p. 21)."] } ],
                                      ThrownWeapon_Knife: [ { title: 'thrown',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', rangeBasedOnST: true, halfDamageRange: 0.8, maximumRange: 1.5 } ] };
Weapons.Poleaxe         = new Weapon('Poleaxe',                 10,   120,  3,  3,   -8, 'cr/imp');
Weapons.Poleaxe.maxTL = 4;
Weapons.Poleaxe.wieldOptions      = { Polearm       : [ { title:'hammer swing', hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cr'  }, reach: '2,3', note: ["requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round up). To use it in one hand without it becoming unready, you need at least three times the listed ST."] },
                                                        { title:'axe swing',    hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cut' }, reach: '2,3', note: ["requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round up). To use it in one hand without it becoming unready, you need at least three times the listed ST."] } ] };
Weapons.Rapier          = new Weapon('Rapier',                2.75,   500,  4,  4,   -4, 'blade' );
Weapons.Rapier.maxTL = 5;
Weapons.Rapier.wieldOptions       = { Rapier            : [ { title: 'thrust',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2' } ] };
Weapons.Shortsword      = new Weapon('Shortsword',               2,   400,  2,  4,   -4, 'blade' );
Weapons.Shortsword.maxTL = 5;
Weapons.Shortsword.wieldOptions   = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  0, type: 'imp' } } ] };
Weapons.Spear           = new Weapon('Spear',                    4,    40,  0,  4,   -6, 'cr/imp' );
Weapons.Spear.maxTL = 4;
Weapons.Spear.wieldOptions        = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '1',   note: ["Can be thrown.","Requires a Ready maneuver to change wield option."] },
                                                            { title: '2 hands', hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1,2', note: ["Can be thrown.","Requires a Ready maneuver to change reach or wield option.","Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ],
                                     ThrownWeapon_Spear : [ { title: 'thrown',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, rangeBasedOnST: true, halfDamageRange:   1, maximumRange:  1.5, accuracy: 2, note: ["Can be thrown.","Requires a Ready maneuver to change wield option."] } ] };
Weapons.Quarterstaff    = new Weapon('Quarterstaff',             4,    10,  0,  4,   -8, 'cr/imp' );
Weapons.Quarterstaff.wieldOptions = { StaffSkill        : [ { title: 'swung',   hands: 'both', strength:  6, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', parryBonus: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] },
                                                            { title: 'thrust',  hands: 'both', strength:  6, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', parryBonus: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ],
                                      TwoHandedSword    : [ { title: 'swung',   hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2',                note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] },
                                                            { title: 'thrust',  hands: 'both', strength:  9, damage: { base: 'thr', mods:  1, type: 'cr'  }, reach: '2',                  note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ] };
Weapons.GreatswordThr   = new Weapon('Greatsword',               7,   900,  3,  4,   -6, 'blade' );
Weapons.GreatswordThr.detail = 'Thrusting';
Weapons.GreatswordThr.maxTL = 5;
Weapons.GreatswordThr.wieldOptions= { TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '1,2', note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] },
                                                            { title: 'thrust',  hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: 2,     note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ] };
Weapons.Longbow         = new Weapon('Longbow',                  3,   200,  0,  4,   -8, 'bow' );
Weapons.Longbow.wieldOptions      = { Bow               : [ { title:  '',       hands: 'both', strength: 11, damage: { base: 'thr', mods:  2, type: 'imp' }, halfDamageRange:  15, maximumRange:   20, accuracy: 3, maxDamage: '1d+4', rangeBasedOnST: true, note: ["Requires two hands. Arrows cost $2."] } ] };
Weapons.Longbow.maxTL = 5;
Weapons.Longbow.weaponST = true;
Weapons.Longbow.shots = 1;
Weapons.Longbow.reload = 2;
Weapons.ShortBow        = new Weapon('Bow',                      2,    50,  0,  4,   -6, 'bow');
Weapons.ShortBow.detail = 'Short';
Weapons.ShortBow.wieldOptions     = { Bow               : [ { title:  '',       hands: 'both', strength:  7, damage: { base: 'thr', mods:  0, type: 'imp' }, halfDamageRange:  10, maximumRange:   15, accuracy: 1, rateOfFire: 1, rangeBasedOnST: true, note: ["Requires two hands. Arrows cost $2."] } ] };
Weapons.ShortBow.maxTL = 5;
Weapons.ShortBow.weaponST = true;
Weapons.ShortBow.shots = 1;
Weapons.ShortBow.reload = 2;
Weapons.Crossbow        = new Weapon('Crossbow',                 6,   150,  2,  4,   -6, 'bow' );
Weapons.Crossbow.wieldOptions     = { Crossbow          : [ { title:  '',       hands: 'both', strength:  7, damage: { base: 'thr', mods:  4, type: 'imp' }, halfDamageRange:  20, maximumRange:   25, accuracy: 4, rangeBasedOnST: true, note: ["Requires two hands. Bolts cost $2."] } ] };
Weapons.Crossbow.maxTL = 5;
Weapons.Crossbow.weaponST = true;
Weapons.Crossbow.shots = 1;
Weapons.Crossbow.reload = 4;
Weapons.ThrowingAxe     = new Weapon('Axe',                      4,    60,  1,  4,   -3, 'cut' );
Weapons.ThrowingAxe.detail = 'Throwing';
Weapons.ThrowingAxe.maxTL = 4;
Weapons.ThrowingAxe.wieldOptions  = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' } } ],
                                      ThrownWeapon_AxeMace:[{ title: 'throw',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' }, accuracy: 1,       halfDamageRange: 1.5, maximumRange: 2.5, rangeBasedOnST: true } ] };
Weapons.Derringer41       = new Weapon('Derringer',              0.5,   100,  5,  3,   -1, 'gun' );
Weapons.Derringer41.detail = '.41';
Weapons.Derringer41.wieldOptions    = { Guns5_Pistol    : [ { title: '',        hands:  'dom', strength:  9, damage: { base: 1,     mods:  0, type: 'pi+' }, halfDamageRange:  80, maximumRange:  650, accuracy: 1, rateOfFire: 1, recoil: 2 } ] };
Weapons.Derringer41.maxTL = 6;
Weapons.Derringer41.shots = 2;
Weapons.Derringer41.reload = '3i';
Weapons.AutoPistol9mmTL6  = new Weapon('Pistol',                2.4,   350,  6,  3,   -2, 'gun');
Weapons.AutoPistol9mmTL6.detail = '9mm Auto (TL6)';
Weapons.AutoPistol9mmTL6.wieldOptions={ Guns6_Pistol    : [ { title: '',        hands:  'dom', strength:  9, damage: { base: 2,     mods: 2,  type: 'pi'  }, halfDamageRange: 150, maximumRange: 1850, accuracy: 2, rateOfFire: 3,  recoil: 2 } ] };
Weapons.AutoPistol9mmTL6.maxTL = 6;
Weapons.AutoPistol9mmTL6.shots = '8+1';
Weapons.AutoPistol9mmTL6.reload = 3;
Weapons.Revolver357M      = new Weapon('Revolver',                3,   500,  7,  3,   -2, 'gun');
Weapons.Revolver357M.detail = '.357M';
Weapons.Revolver357M.wieldOptions   = { Guns7_Pistol : [ { strength: 10, damage: { base: 3, mods: -1, type: 'pi' }, halfDamageRange: 185, maximumRange: 2000, accuracy: 2, rateOfFire: 3,  recoil: 3 } ] };
Weapons.Revolver357M.shots = 6;
Weapons.Revolver357M.reload = '3i';
Weapons.AutoPistol44M     = new Weapon('Pistol',                4.5,   750,  8,  3,   -3, 'gun' );
Weapons.AutoPistol44M.detail = '.44M Auto';
Weapons.AutoPistol44M.wieldOptions  = { Guns8_Pistol    : [ { title:  '',       hands:  'dom', strength: 12, damage: { base: 3,     mods:  0, type: 'pi+' }, halfDamageRange: 230, maximumRange: 2500, accuracy: 2, rateOfFire: 3, recoil: 4 } ] };
Weapons.AutoPistol44M.shots = '9+1';
Weapons.AutoPistol44M.reload = 3;
Weapons.LeverActionCarbine30    = new Weapon('Carbine', 7, 300, 5, 3, -4, 'gun');
Weapons.LeverActionCarbine30.detail = '.30 Lever-Action';
Weapons.LeverActionCarbine30.wieldOptions   = { Guns5_Rifle : [ { hands: 'both', strength: 10, damage: { base: 5, mods: 0, type: 'pi' }, halfDamageRange: 450, maximumRange: 3000, accuracy: 4, rateOfFire: 1,  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.LeverActionCarbine30.maxTL = 6;
Weapons.LeverActionCarbine30.shots = '6+1';
Weapons.LeverActionCarbine30.reload = '3i';
Weapons.SelfLoadingRifle762mm   = new Weapon('Rifle', 10, 600, 6, 3, -5, 'gun');
Weapons.SelfLoadingRifle762mm.detail = '7.62mm Self-Loading';
Weapons.SelfLoadingRifle762mm.wieldOptions  = { Guns6_Rifle : [ { hands: 'both', strength: 10, damage: { base: 7, mods: 0, type: 'pi' }, halfDamageRange: 1000, maximumRange: 4200, accuracy: 5, rateOfFire: 3,  recoil: 3, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.SelfLoadingRifle762mm.maxTL = 7;
Weapons.SelfLoadingRifle762mm.shots = 8;
Weapons.SelfLoadingRifle762mm.reload = 3;
Weapons.SniperRifle338  = new Weapon('Rifle', 17.5, 5600, 8, 3, -6, 'gun');
Weapons.SniperRifle338.detail = '.338 Sniper';
Weapons.SniperRifle338.wieldOptions = { Guns8_Rifle : [ { hands: 'both', strength: 11, damage: { base: 9, mods: 1, type: 'pi' }, halfDamageRange: 1500, maximumRange: 5500, accuracy: '6+3', rateOfFire: 1,  recoil: 4, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Firearm with an attached bipod. When firing from a prone position using the bipod, treat the weapon as if it were braced <i>and</i> reduce its ST requirement to 2/3 of the listed value (round <i>up</i>); <i>e.g.</i>, ST 13 becomes ST 9."] } ] };
Weapons.SniperRifle338.shots = '4+1';
Weapons.SniperRifle338.reload = 3;
Weapons.PumpShotgun12G  = new Weapon('Shotgun', 8, 240, 6, 4, -5, 'gun');
Weapons.PumpShotgun12G.detail = '12G Pump';
Weapons.PumpShotgun12G.wieldOptions = { Guns6_Shotgun : [ { hands: 'both', strength: 10, damage: { base: 1, mods: 1, type: 'pi' }, halfDamageRange: 50, maximumRange: 125, accuracy: 3, rateOfFire: '2×9',  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.PumpShotgun12G.maxTL = 8;
Weapons.PumpShotgun12G.shots = 5;
Weapons.PumpShotgun12G.reload = '3i';

for ( var w in Weapons ) {
    if( !Weapons[w].hasOwnProperty('key') ) Weapons[w].key = w;
}

/* Groups for pistols, rifles, and guns defined above BasicEquipment definitions */

/* Weapons                            'name',               weight,  cost, TL, LC, bulk, qualEffGp
Weapons.WeaponName      = new Weapon( 'name',                    3,    50,  1,  4,   -4, 'cr/imp' );
Weapons.WeaponName.wieldOptions   = { Skill1            : [ { title: 'swung',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' }, maxDamage: '1d+2' } ],
                                      Skill2            : [ { title: 'swung',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' }, maxDamage: '1d+2' } ] };
*/

Groups.WeaponsGURPSLite = ['Axe','Mace','BrassKnuckles','Broadsword','BroadswordThr','KnifeLarge',
                           'Poleaxe','Rapier','Shortsword','Spear','Quarterstaff','GreatswordThr',
                           'Longbow','ShortBow','Crossbow','ThrowingAxe',
                           'Derringer41','AutoPistol9mmTL6','PumpShotgun12G',
                           'Revolver357M','AutoPistol44M','LeverActionCarbine30',
                           'SelfLoadingRifle762mm','SniperRifle338'];

/****  Templates  ****/

var CharacterTypes = {};
CharacterTypes.rando = {
  attributes: { ST: 0, IQ: 0, DX: 0, HT: 0, HP: 0, Will: 0, Per: 0, FP: 0, Speed: 0, Move: 0 },
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
  attributes: { ST: 2, IQ: -1, DX: 0, HT: 1, HP: 2, Will: 0, Per: 0, FP: 0, Speed: 0, Move: 0 },
  ads:    ['CombatReflexes','HighPainThreshold','HardtoKill','Fearlessness'],
  disads: ['BadTemper','Bloodlust','Ugly','Unattractive'],
  skills: ['AnimalHandling','Armoury','Boating','Brawling','Carousing','Crewman'],
  exSkls: ['Hiking','Jumping','Karate','Riding_horse','Swimming','Throwing'],
  wpnNum: 2,
  wpnBudg: 0.5,
  weapons: Groups.WeaponsGURPSLite.filter( function(w) { var Wpn=Weapons[w]; return ( Wpn.strength()>=11 || Wpn.TL>4 ) ? true : false; } ),
  armNum: 1,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite,
  sldNum: 1,
  shields: Groups.ShieldsGURPSLite,
  eqpNum: 1,
  equipment: Groups.weapongear.concat(['wineskin1galfull','rations','blanket','backpackframe','whetstone']),
};
CharacterTypes.twitchy = {
  attributes: { ST: -1, IQ: -1, DX: 2, HT: -1, HP: 0, Will: 0, Per: 0, FP: 0, Speed: 0, Move: 1 },
  ads:    ['CombatReflexes','DangerSense','Ambidexterity'],
  disads: ['Impulsiveness','Overconfidence','Curious'],
  skills: ['Acrobatics','Brawling','Carousing','Climbing','Driving','Escape','FastTalk','Gambling',
           'Jumping','Karate','Riding_horse','Scrounging','SexAppeal','Streetwise','Throwing'],
  exSkls: ['AnimalHandling','ComputerOperation','Crewman','ElectronicsOperation','ElectronicsRepair','EnvironmentSuit'],
  wpnNum: 2,
  wpnBudg: 0.25,
  weapons: Groups.WeaponsGURPSLite.filter( function(w) { return (Weapons[w].weight<=5 ) ? true : false; } ),
  armNum: 0.5,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite.filter( function(a) { return (ArmorItems[a].weight<=20 ) ? true : false; } ),
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: ['lanternoil','ceramicbottle1qt','wineskin1galfull','rations','blanket','backpacksmall','whetstone','arrow']
};
CharacterTypes.ranger = {
  attributes: { ST: 0, IQ: 0, DX: 0, HT: 0, HP: 0, Will: 0, Per: 1, FP: 0, Speed: 0, Move: 1 },
  requiredAds: ['OutdoorsmanTalent'],
  ads:    ['AcuteHearing','AcuteVision','CombatReflexes','DangerSense','NightVision'],
  disads: ['CodeofHonor','Curious','Honesty','SenseOfDuty'],
  skills: ['Boating','Brawling','Camouflage','Climbing','Driving','FirstAid','Hiking','Jumping',
           'Naturalist','Navigation','Piloting','Riding','Stealth','Survival','Swimming','Tactics',
           'Throwing','Tracking'],
  wpnNum: 1,
  wpnBudg: 0.6,
  weapons: Groups.WeaponsGURPSLite,
  armNum: 1,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite.filter(
           function(a) { return (ArmorItems[a].weight<=20 ) ? true : false; }
         ),
  sldNum: 0,
  shields: [],
  reqdEquip: ['backpacksmall','rations','personalbasics'],
  eqpNum: 2,
  equipment: Groups.campinggear.concat(['whetstone','arrow'])
};
CharacterTypes.thief = {
  attributes: { ST: -1, IQ: 0, DX: 1, HT: -1, HP: 0, Will: 0, Per: 2, FP: 0, Speed: 0, Move: 0 },
  ads:    ['AcuteHearing','Charisma','DangerSense','DoubleJointed','Fearlessness','Flexibility','Luck','NightVision','PerfectBalance'],
  disads: ['Curious','Greed','Impulsiveness','Overconfidence'],
  skills: ['Climbing','Escape','FastTalk','Holdout','Jumping','Lockpicking','Traps',
           'Pickpocket','Scrounging','Shadowing','Smuggling','Stealth','Streetwise','Throwing'],
  wpnNum: 1,
  wpnBudg: 0.25,
  weapons: Groups.WeaponsGURPSLite.filter( function(w) { if(/*Weapons[w].bulk &&*/ Weapons[w].bulk<-2) return false; return (Weapons[w].weight<=3) ? true : false; } ),
  armNum: 0.5,
  armBudg: 0.25,
  armor: Groups.ArmorGURPSLite.filter( function(a) { return (ArmorItems[a].weight<=15 ) ? true : false; } ),
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: ['climbinggear','ropethin','bugstomper','spycamera','nightvisiongoggles','ropethin',
  'flashlightmini','grapnel','pouchsmall','lockpicks','disguisekit','wearablecomp','elockpicks']
};
CharacterTypes.investigator = {
  attributes: { ST: -1, IQ: 1, DX: 0, HT: -1, HP: 1, Will: 1, Per: 1, FP: 0, Speed: 0, Move: 0 },
  ads:    ['Appearance','DangerSense','Charisma','Daredevil','Fearlessness','LanguageTalent','Luck','SmoothOperatorTalent'],
  languages: ['French','German','Greek','Hebrew','Hieroglyphics','Latin'],
  disads: ['Curious','Delusion','Greed','Honesty','Obsession','Pacifism','PovertyStrugglingx12','SenseOfDuty','Vow'],
  skills: ['Climbing','Stealth','Criminology','Disguise','ElectronicsOperation','Holdout','Hiking',
           'Interrogation','Lockpicking','Occultism','Photography','Research','Shadowing','Smuggling',
           'Traps','Writing','Observation','Search','Pickpocket','ComputerProgramming','Diagnosis',
           'Brawling','Carousing','FastTalk','SavoirFaire','SexAppeal','Acrobatics','Karate','AreaKnowledge','Law',
           'ComputerOperation','Acting','Swimming','Boating','Driving','Piloting','Riding','Streetwise'],
  wpnNum: 1,
  wpnBudg: 0.25,
  weapons: Object.keys(Weapons).filter( function(w) { return ( Weapons[w].qualityEffectGroup=='gun' && Weapons[w].weight<=2.5 ) ? true : false; } ),
  armNum: 0,
  armBudg: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 4,
  equipment: Object.keys( BasicEquipment )
};

var Templates = {};


// special symbols: ≤ ≥ ± × ÷ « » ∞
/* sybmol unicodes
      <carriage return>       &#13;
  ³   <superscript 3>         &sup3;
  °                           &deg;
  ≤                           &le;
  ≥                           &ge;

  ±                           &plusmn;
  ×                           &times;
  ÷                           &divide;

  «
  »                           &raquo;
  ∞                           &infin;

  ½                           &frac12; or &#189;
*/
