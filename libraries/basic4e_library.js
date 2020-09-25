/* alert('loading the 4th edition rules library'); */
var libraryName = 'GURPS Basic Set 4th edition';
var libraryList = [libraryName];
var ruleset = 'e4';
var CostOfLiving_for_Status = {
    '-2' : 100,
    '-1' : 300,
     0 : 600,
     1 : 1200,
     2 : 3000,
     3 : 12000,
     4 : 60000,
     5 : 600000,
     6 : 6000000,
     7 : 60000000,
     8 : 600000000,
};
var defaultTL = 7;
var StartingWealth_for_TL = [250,500,750,1000,2000,5000,10000,15000,20000,30000,50000,75000,100000,100000,100000,100000];
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
];  // Basic: Characters p27
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
];  // Basic: Characters p27
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
];  // Basic: Characters p27
var LegalityClassOptionsList = [
    { text: 'Open (4)',       value: 4,  title: 'Computer; sword; shotgun; motor scooter', def: 'The item is openly available in most societies, but tightly controlled societies might restrict access or use.' },
    { text: 'Licensed (3)',   value: 3,  title: 'Automobile; handgun; hunting rifle',      def: 'The item requires registration with the authorities in most societies. Registration might involve a fee or examination, and might be denied to criminals, minors, <i>etc</i>.' }, // prescription medicines?
    { text: 'Restricted (2)', value: 2,  title: 'Assault rifle; armored vehicles',         def: 'Only military, police, or intelligence agencies may possess the item in most societies – although some licensed civilians might be permitted to keep it <i>on their own property</i>.' },
    { text: 'Military (1)',   value: 1,  title: 'Anti-tank weapons; fighting vehicles',    def: 'The item is available only to armed forces or secret spy agencies in most societies.' },
    { text: 'Banned (0)',     value: 0,  title: 'nuclear and biological weapons',          def: 'The item is restricted to the armed forces of certain governments, who will go to extremes to keep it out of the hands of individuals and “have-not” governments.' }
];  // Basic: Characters p267 (see also Basic: Campaigns p507)
var DamageTypeOptionsList = [
    { text: 'affliction',     value: 'aff' },
    { text: 'burning',        value: 'burn' },
    { text: 'corrosion',      value: 'cor' },
    { text: 'crushing',       value: 'cr' },
    { text: 'cutting',        value: 'cut' },
    { text: 'fatigue',        value: 'fat' },
    { text: 'impaling',       value: 'imp' },
    { text: 'small piercing', value: 'pi-' },
    { text: 'piercing',       value: 'pi' },
    { text: 'large piercing', value: 'pi+' },
    { text: 'huge piercing',  value: 'pi++' },
    { text: 'special',        value: 'spec' },
    { text: 'toxic',          value: 'tox' }
];  // Basic: Characters p269
var QualityEffectGroupTextForOption = {
		'natural' : 'natural',
		'other'   : 'other',
		'blade'   : 'blade',
		'cut'     : 'cutting non-blade',
	  'cr/imp'  : 'crushing or impaling',
	  'bow'     : 'muscle-powered ranged',
	  'gun'     : 'firearm'
};
var QualityEffectGroupOptionsList = [
    { text: 'natural',               value: 'natural' },
    { text: 'other',                 value: 'other' },
    { text: 'blade',                 value: 'blade' },
    { text: 'cutting non-blade',     value: 'cut' },
    { text: 'crushing or impaling',  value: 'cr/imp' },
    { text: 'muscle-powered ranged', value: 'bow' },
    { text: 'firearm',               value: 'gun' }
];  // Basic: Characters p274 and p277
var ShieldSkillsOptionsList = [
    { text: 'Shield', value: 'Shield_Shield' },
    { text: 'Shield (Buckler)',  value: 'Shield_Buckler' },
    { text: 'Shield (Force)', value: 'Shield_Force' },
    { text: 'Cloak', value: 'Cloak' }
];
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

Traits.SpatialSense3D      = new Trait( "3D Spatial Sense", 'A', 'MP', 10, false, "B4E34" );
Traits.SpatialSense3D.mods = 'Signal';
Traits.Vision360           = new Trait( "360° Vision", 'A', 'P', 25, false, "B4E34" );
Traits.Vision360.exoticSprntl = 'Exotic';
Traits.Vision360.mods = "Eyestalks";
//Traits.AccelerationTolerance = new Trait( "Acceleration Tolerance", 'P', 10, false );
Traits.AbsentMinded        = new Trait( "Absent-Minded", 'D', 'M', -15, false, "B4E122" );
Traits.AbsoluteDirection   = new Trait( "Absolute Direction", 'A', 'MP', 5, false, "B4E34" );
Traits.AbsoluteDirection.mods = 'Signal';
// 3D Spacial Sense is before the A's
Traits.AbsoluteTiming      = new Trait( "Absolute Timing", 'A', 'M', 2, false, "B4E35" );
Traits.AbsoluteTiming.cinematic = true;
// Chronolocation is in the C's
Traits.Accessory           = new Trait( "Accessory", 'P', 'P', 1, false, "B4E100" );
Traits.Accessory.exoticSprntl = 'Exotic';
Traits.AcuteVision         = new Trait( "Acute Vision", 'A', 'P', 2, true, "B4E35" );
Traits.AcuteVision.group = 'vision';
Traits.AcuteHearing        = new Trait( "Acute Hearing", 'A', 'P', 2, true, "B4E35" );
//Traits.AcuteHearing.posNegLevels = true;
Traits.AcuteHearing.group = 'hearing';
Traits.AcuteTasteSmell     = new Trait( "Acute Taste/Smell", 'A', 'P', 2, true, "B4E35" );
Traits.AcuteTouch          = new Trait( "Acute Touch", 'A', 'P', 2, true, "B4E35" );
Traits.Addiction           = new Trait( "Addiction", 'D', 'MP', 0, false, "B4E122" );
Traits.Addiction.multiple = true;
Traits.Addiction.mods = "Addiction";
Traits.AdministrativeRank  = new Trait( "Administrative Rank", 'A', 'So', 5, true, "B4E30" );
Traits.Affliction          = new Trait( "Affliction", 'A', 'P', 10, true, "B4E35" );
Traits.Affliction.exoticSprntl = 'Exotic';
Traits.Affliction.mods = "Affliction, Attack";
Traits.Affliction.multiple = true;
Traits.AlcoholTolerance    = new Trait( "Alcohol Tolerance", 'P', 'P', 1, false, "B4E100" );
Traits.AlcoholismLegal     = new Trait( "Alcoholism, legal", 'D', 'P', -15, false, "B4E122" );
Traits.AlcoholismIllegal   = new Trait( "Alcoholism, illegal", 'D', 'P', -20, false, "B4E122" );
Traits.Ally                = new Trait( "Ally", 'A', 'So', 0, false, "B4E36" );
// Traits.Ally.instructions = 'you must choose a point value and frequency below';
Traits.Ally.multiple = true;
Traits.Ally.mods = "Ally, Frequency of Appearance, Favor";
Traits.AlteredTimeRate     = new Trait( "Altered Time Rate", 'A', 'M', 100, true, "B4E38" );
Traits.AlteredTimeRate.exoticSprntl = 'Exotic';
Traits.AlternateIdentity   = new Trait( "Alternate Identity", 'A', 'So', 10, true, "B4E39" );
Traits.AlternateIdentity.fixedCost = -5;
Traits.AlternateIdentity.highestLevel = 2;
Traits.AlternateIdentity.levelNames = ['Legal','Illegal'];
Traits.Ambidexterity       = new Trait( "Ambidexterity", 'A', 'P', 5, false, "B4E39" );
Traits.Amnesia             = new Trait( "Amnesia", 'D', 'M', -15, true, "B4E123" );
Traits.Amnesia.fixedCost = 5;
Traits.Amnesia.lowestLevel = 1;
Traits.Amnesia.levelNames = ['Partial','Total'];
Traits.Amphibious          = new Trait( "Amphibious", 'A', 'P', 10, false, "B4E40" );
Traits.Amphibious.exoticSprntl = 'Exotic';
Traits.AnimalEmpathy       = new Trait( "Animal Empathy", 'A', 'M', 5, false, "B4E40" );
Traits.AnimalFriendTalent  = new Trait( "Animal Friend Talent", 'A', "M", 5, true, "B4E89-90" );
Traits.AnimalFriendTalent.highestLevel = 4;
Traits.Anosmia             = new Trait( "Anosmia", 'D', 'P', -5, false, "B4E146" );
Traits.ArmDX1arm           = new Trait( "Arm DX, 1 arm", 'A', 'P', 12, true, "B4E40" );
Traits.ArmDX1arm.levelsName = "DX +";
Traits.ArmDX1arm.exoticSprntl = 'Exotic';
Traits.ArmDX2arms          = new Trait( "Arm DX, 2 arms", 'A', 'P', 16, true, "B4E40" );
Traits.ArmDX2arms.levelsName = "DX +";
Traits.ArmDX2arms.exoticSprntl = 'Exotic';
Traits.ArmST1arm           = new Trait( "Arm ST, 1 arm", 'A', 'P', 3, true, "B4E40" );
Traits.ArmST1arm.levelsName = "ST +";
Traits.ArmST1arm.exoticSprntl = 'Exotic';
Traits.ArmST2arms           = new Trait( "Arm ST, 2 arms", 'A', 'P', 5, true, "B4E40" );
Traits.ArmST2arms.levelsName = "ST +";
Traits.ArmST2arms.exoticSprntl = 'Exotic';
Traits.ArmST3arms           = new Trait( "Arm ST, 3 arms", 'A', 'P', 8, true, "B4E40" );
Traits.ArmST3arms.levelsName = "ST +";
Traits.ArmST3arms.exoticSprntl = 'Exotic';
Traits.ArtificerTalent     = new Trait( "Artificer Talent", 'A', 'M', 10, true, "B4E89-90" );
Traits.ArtificerTalent.highestLevel = 4;
Traits.Autotrance          = new Trait( "Autotrance", 'P', 'M', 1, false, "B4E101" );

Traits.BadBack             = new Trait( "Bad Back", 'D', "P", -10, true, "B4E123" );
Traits.BadBack.fixedCost = -5;
Traits.BadBack.lowestLevel = 1;
Traits.BadBack.highestLevel = 2;
Traits.BadBack.levelsName = 'severity';
Traits.BadBack.levelNames = ['mild','severe'];
Traits.BadGrip             = new Trait( "Bad Grip", 'D', "P", -5, true, "B4E123" );
Traits.BadGrip.levelsName = 'penalty on gripping task roll';
Traits.BadGrip.levelNames = [-2,-4,-6,-8];
Traits.BadGrip.group = 'manipulators';
Traits.BadSight            = new Trait( "Bad Sight", 'D', "P", -25, false, "B4E123" );
Traits.BadSight.description = ['near-sighted','far-sighted'];
Traits.BadSight.mods = 'vision';
Traits.BadSight.group = 'vision';
Traits.BadSmell            = new Trait( "Bad Smell", 'D', "P", -10, false, "B4E124" );
Traits.BadTemper           = new Trait( "Bad Temper", 'D', "M", -10, false, "B4E124" );
Traits.BadTemper.mods = "Self-Control";
Traits.BeakSharp           = new Trait( "Beak, sharp", 'A', 'P', 1, false, "B4E91" );
Traits.BeakSharp.exoticSprntl = 'Exotic';
Traits.Berserk             = new Trait( 'Berserk', 'D', 'M', -10, false, "B4E124" );
Traits.Berserk.mods = "Self-Control, BattleRage";
Traits.Bestial             = new Trait( "Bestial", 'D', "M", -10, false, "B4E124" );
Traits.Bestial.exoticSprntl = 'Exotic';
Traits.Bestial.mods = 'Savage';
Traits.Binding             = new Trait( "Binding", 'A', "P", 2, true, "B4E40" );
Traits.Binding.exoticSprntl = 'Exotic';
Traits.BlessedDivination = new Trait( "Blessed, Divination", 'A', 'M', 10, true, "B4E40" );
Traits.BlessedDivination.highestLevel = 2;
Traits.BlessedDivination.levelNames = ['Blessed','Very Blessed'];
Traits.BlessedDivination.description = [];
Traits.BlessedDivination.exoticSprntl = 'Supernatural';
Traits.BlessedHeroicFeats = new Trait( "Blessed, Heroic Feats", 'A', 'M', 10, false, "B4E40" );
Traits.BlessedHeroicFeats.exoticSprntl = 'Supernatural';
Traits.BlessedHeroicFeats.description = ['ST', 'DX', 'HT'];
Traits.Blindness           = new Trait( "Blindness", 'D', "P", -50, false, "B4E124" );
Traits.Blindness.group = 'vision';
Traits.Bloodlust           = new Trait( "Bloodlust", 'D', "M", -10, false, "B4E125" );
Traits.Bloodlust.mods = "Self-Control";
Traits.Brachiator          = new Trait( "Brachiator", 'A', 'P', 5, false, "B4E41" );
Traits.Brachiator.exoticSprntl = 'Exotic';
Traits.BreathHolding       = new Trait( "Breath-Holding", 'A', 'P', 2, true, "B4E41" );
Traits.BreathHolding.exoticSprntl = 'Exotic';
Traits.Bully               = new Trait( "Bully", 'D', 'M', -10, false, "B4E125" );
Traits.Bully.mods = "Self-Control";
Traits.BusinessAcumenTalent= new Trait( "Business Acumen Talent", 'A', "M", 10, true, "B4E89" );
Traits.BusinessAcumenTalent.highestLevel = 4;

Traits.Callous             = new Trait( "Callous", 'D', 'M', -5, false, "B4E125" );
Traits.Callous.group = 'empathy';
Traits.CannotLearn         = new Trait( "Cannot Learn", 'D', 'M', -30, false, "B4E125" );
// Traits.CannotSpeak         = new Trait( "Cannot Speak", 'P', -10, true, "B4E125" );
// Traits.CannotSpeak.fixedCost = -5;
// Traits.CannotSpeak.lowestLevel = 1;
// Traits.CannotSpeak.levelNames = ['can vocalize','mute'];
Traits.CannotSpeak         = new Trait( "Cannot Speak", 'D', 'P', -15, false, "B4E125" );
Traits.CannotSpeak.instructions = "see also 'Mute'";
Traits.Catfall             = new Trait( "Catfall", 'A', 'P', 10, false, "B4E41" );
Traits.Catfall.exoticSprntl = 'Exotic';
Traits.Chameleon           = new Trait( "Chameleon", 'A', 'P', 5, true, "B4E41" );
Traits.Chameleon.exoticSprntl = 'Exotic';
Traits.Chameleon.mods = 'Chameleon';
Traits.Channeling          = new Trait( "Channeling", 'A', 'M', 10, false, "B4E41" );
Traits.Channeling.exoticSprntl = 'Supernatural';
Traits.Charisma            = new Trait( 'Charisma', 'A', 'M', 5, true, "B4E41" );
Traits.Charitable          = new Trait( "Charitable", 'D', 'M', -15, false, "B4E125" );
Traits.Charitable.mods = "Self-Control";
Traits.ChronicDepression   = new Trait( "Chronic Depression", 'D', 'M', -15, false, "B4E126" );
Traits.ChronicDepression.mods = "Self-Control";
Traits.ChronicPain         = new Trait( "Chronic Pain", 'D', 'M', -5, true, "B4E126" );
Traits.ChronicPain.mods = "Interval, Frequency of Appearance";
Traits.ChronicPain.levelsName = 'severity level';
Traits.ChronicPain.levelNames = ['mild','severe','agonizing'];
Traits.Chummy              = new Trait( "Chummy", 'D', 'M', -5, false, "B4E126" );
Traits.Chronolocation      = new Trait( "Chronolocation", 'A', 'M', 5, false, "B4E35" );
Traits.Chronolocation.cinematic = true;
Traits.ClaimtoHospitality  = new Trait( "Claim to Hospitality", 'A', 'So', 0, false, "B4E41" );
Traits.ClaimtoHospitality.mods = 'Hospitality Group';
Traits.ClaimtoHospitality.multiple = true;
Traits.Clairsentience      = new Trait( "Clairsentience", 'A', 'M', 50, false, "B4E42" );
Traits.Clairsentience.exoticSprntl = 'Exotic';
Traits.Clairsentience.mods = 'ESP,Clairsentience';
// Claws advantage group
Traits.BluntClaws          = new Trait( "Blunt Claws", 'A', 'P', 3, false, "B4E42" );
Traits.BluntClaws.exoticSprntl = 'Exotic';
//Traits.BluntClaws.group = 'claws';
Traits.Hooves              = new Trait( "Hooves", 'A', 'P', 3, false, "B4E42" );
Traits.Hooves.exoticSprntl = 'Exotic';
//Traits.Hooves.group = 'claws';
Traits.SharpClaws           = new Trait( "Sharp Claws", 'A', 'P', 5, false, "B4E42" );
Traits.SharpClaws.exoticSprntl = 'Exotic';
//Traits.SharpClaws.group = 'claws';
Traits.Talons              = new Trait( "Talons", 'A', 'P', 8, false, "B4E43" );
Traits.Talons.exoticSprntl = 'Exotic';
//Traits.Talons.group = 'claws';
Traits.LongTalons          = new Trait( "Long Talons", 'A', 'P', 11, false, "B4E43" );
Traits.LongTalons.exoticSprntl = 'Exotic';
//Traits.LongTalons.group = 'claws';
Traits.ClericalInvestment  = new Trait( "Clerical Investment", 'A', 'So', 5, false, "B4E43" );
// Traits.ClericalMagic       = new Trait( "Clerical Magic", 'M', 'varies', false );
// Traits.ClericalMagic.description = [];
// Traits.ClericalMagic.exoticSprntl = 'Supernatural';
Traits.Clinging  = new Trait( "Clinging", 'A', 'P', 20, false, "B4E42" );
Traits.Clinging.exoticSprntl = 'Exotic';
Traits.Clinging.mods = 'Clinging';
Traits.Clueless            = new Trait( "Clueless", 'D', 'M', -10, false, "B4E126" );
Traits.CodeofHonor         = new Trait( "Code of Honor", 'D', 'M', -5, true, "B4E127" );
Traits.CodeofHonor.highestLevel = 3;
Traits.CodeofHonor.multiple = true;
Traits.ColdBlooded         = new Trait( "Cold-Blooded", 'D', 'P', -5, true, "B4E127" );
Traits.ColdBlooded.exoticSprntl = 'Exotic';
Traits.ColdBlooded.levelsName = 'threshold temperature';
Traits.ColdBlooded.levelNames = ['50&deg;','65&deg;'];
Traits.Colorblindness      = new Trait( "Colorblindness", 'D', 'P', -10, false, "B4E127" );
Traits.CombatParalysis     = new Trait( "Combat Paralysis", 'D', 'M', -15, false, "B4E127" );
Traits.CombatParalysis.group = 'reflexes';
Traits.CombatReflexes      = new Trait( "Combat Reflexes", 'A', 'M', 15, false, "B4E43" );
Traits.CombatReflexes.group = 'reflexes';
Traits.CommonSense         = new Trait( "Common Sense", 'A', 'M', 10, false, "B4E43" );
Traits.CompartmentalizedMind = new Trait( "Compartmentalized Mind", 'A', 'M', 50, true, "B4E43" );
Traits.CompartmentalizedMind.exoticSprntl = 'Exotic';
Traits.CompartmentalizedMind.mods = 'CompartmentalizedMind';
Traits.CompulsiveBehavior  = new Trait( "Compulsive Behavior", 'D', 'M', -5, true, "B4E128" );
Traits.CompulsiveBehavior.mods = "Self-Control";
Traits.CompulsiveBehavior.highestLevel = 3;
Traits.CompulsiveBehavior.multiple = true;
Traits.Confused            = new Trait( "Confused", 'D', 'M', -10, false, "B4E129" );
Traits.Confused.mods = "Self-Control";
Traits.ConstrictionAttack  = new Trait( "Constriction Attack", 'A', 'P', 15, false, "B4E43" );
Traits.ConstrictionAttack.exoticSprntl = 'Exotic';
Traits.Contact             = new Trait( "Contact", 'A', 'So', 1, true, "B4E44" );
Traits.Contact.multiple = true;
Traits.Contact.mods = "Contact, Reliability, Frequency of Appearance, Favor";
Traits.Contact.highestLevel = 4;
Traits.Contact.levelNames = ['12+','15+','18+','21+'];
Traits.Contact.levelsName = 'effective skill';
Traits.CourtesyRank        = new Trait( "Courtesy Rank", 'A', 'So', 1, true, "B4E29" );
Traits.Coward              = new Trait( "Cowardice", 'D', 'M', -10, false, "B4E129" );
Traits.Coward.mods = "Self-Control";
Traits.CulturalAdaptability = new Trait( "Cultural Adaptability", 'A', 'M', 10, false, "B4E46" );
Traits.CulturalAdaptability.cinematic = true;
Traits.XenoAdaptability    = new Trait( "Xeno-Adaptability", 'A', 'M', 20, false, "B4E46" );
Traits.XenoAdaptability.cinematic = true;
// Traits.CulturalFamiliarity = new Trait( "Cultural Familiarity", 'M', 1, true );
// Traits.CulturalFamiliarity.description = 'native';
// Traits.CulturalFamiliarity.highestLevel = 2;
Traits.Curious             = new Trait( "Curious", 'D', 'M', -5, false, "B4E129" );
Traits.Curious.mods = "Self-Control";
Traits.Cursed              = new Trait( "Cursed", 'D', 'M', -75, false, "B4E129" );
Traits.Cursed.exoticSprntl = 'Supernatural';

Traits.DamageResistance    = new Trait( "Damage Resistance", 'A', 'P', 5, true, "B4E46" );
Traits.DamageResistance.exoticSprntl = 'Exotic';
Traits.DamageResistance.multiple = true;
Traits.DamageResistance.mods = "DR,Limited Defense";
Traits.DangerSense         = new Trait( "Danger Sense", 'A', 'M', 15, false, "B4E47" );
Traits.DangerSense.mods = "ESP";
Traits.DangerSense.group = 'precog';
Traits.Daredevil           = new Trait( "Daredevil", 'A', 'M', 15, false, "B4E47" );
Traits.DarkVision          = new Trait( "Dark Vision", 'A', 'P', 25, false, "B4E47" );
Traits.DarkVision.exoticSprntl = 'Exotic';
Traits.DarkVision.takesConstantMods = true;
Traits.DarkVision.mods = "Dark Vision";
Traits.DarkVision.group = "Dark Vision";
Traits.Deaf                = new Trait( 'Deafness', 'D', 'P', -20, false, "B4E129" );
Traits.Deaf.group = 'hearing';
Traits.Debt                = new Trait( "Debt", 'D', 'So', -1, true, "B4E26" );
Traits.Debt.levelsName = '% of Starting Wealth';
Traits.Debt.levelsNameNonPlural = true;
Traits.Debt.highestLevel = 20;
// These are here to facilitate Template creation.  A character should use the point adjustments on the sheet instead.
Traits.DecreasedDX         = new Trait( "Decreased Dexterity", 'D',      'P', -20, true, "B4E15" );
Traits.DecreasedDX.instructions = "use this trait only to build Templates";
Traits.DecreasedHT         = new Trait( "Decreased Health", 'D',         'P', -10, true, "B4E15" );
Traits.DecreasedHT.instructions = "use this trait only to build Templates";
Traits.DecreasedIQ         = new Trait( "Decreased Intelligence", 'D',   'M', -20, true, "B4E15" );
Traits.DecreasedIQ.instructions = "use this trait only to build Templates";
Traits.DecreasedST         = new Trait( "Decreased Strength", 'D',       'P', -10, true, "B4E14" );
Traits.DecreasedST.instructions = "use this trait only to build Templates";
Traits.DecreasedPer        = new Trait( "Decreased Perception", 'D',     'M',  -5, true, "B4E16" );
Traits.DecreasedPer.instructions = "use this trait only to build Templates";
Traits.DecreasedSpeed      = new Trait( "Decreased Basic Speed", 'D',    'P',  -5, true, "B4E17" );
Traits.DecreasedSpeed.instructions = "use this trait only to build Templates";
Traits.DecreasedSpeed.levelsName = '0.25';
Traits.DecreasedBasicMove  = new Trait( "Decreased Basic Move", 'D',     'P',  -5, true, "B4E17" );
Traits.DecreasedBasicMove.instructions = "use this trait only to build Templates";
Traits.DecreasedAirMove    = new Trait( "Decreased Air Move", 'D',       'P',  -2, true, "B4E18" );
Traits.DecreasedAirMove.instructions = "use this trait only to build Templates";
Traits.DecreasedWaterMove  = new Trait( "Decreased Water Move", 'D',     'P',  -5, true, "B4E18" );
Traits.DecreasedWaterMove.instructions = "use this trait only to build Templates";
Traits.DecreasedHitPoints  = new Trait( "Decreased Hit Points", 'D',     'P',  -2, true, "B4E16" );
Traits.DecreasedHitPoints.instructions = "use this trait only to build Templates";
Traits.DecreasedFatigue    = new Trait( "Decreased Fatigue Points", 'D', 'P',  -3, true, "B4E16" );
Traits.DecreasedFatigue.instructions = "use this trait only to build Templates";
Traits.DecreasedTimeRate   = new Trait( "Decreased Time Rate", 'D', 'M', -100, false, "B4E129" );
Traits.DecreasedTimeRate.exoticSprntl = 'Exotic';
Traits.DeepSleeper         = new Trait( "Deep Sleeper", 'P', 'P', 1, false, "B4E101" );
// Traits.DelusionMinor       = new Trait( "Minor Delusion", 'M', -5, false, "B4E130" );
// Traits.DelusionMinor.multiple = true;
// Traits.DelusionMajor       = new Trait( "Major Delusion", 'M', -10, false, "B4E130" );
// Traits.DelusionMajor.multiple = true;
// Traits.DelusionSevere      = new Trait( "Severe Delusion", 'M', -15, false, "B4E130" );
// Traits.DelusionSevere.multiple = true;
Traits.Delusion            = new Trait( "Delusion", 'D', 'M', -5, true, "B4E130" );
Traits.Delusion.multiple = true;
//Traits.Delusion.levelsName = 'severity';
Traits.Delusion.levelNames = ['Minor','Major','Severe'];
Traits.Dependency          = new Trait( "Dependency", 'D', 'P', 0, false, "B4E130" );
Traits.Dependency.exoticSprntl = 'Exotic';
Traits.Dependency.mods = "Dependency,Legality";
Traits.Dependency.multiple = true;
Traits.Dependent           = new Trait( "Dependent", 'D', 'So', 0, false, "B4E131" );
Traits.Dependent.takesMultipliers = true;
Traits.Dependent.multiple = true;     // character can take this ad or disad multiple times
Traits.Dependent.mods = "Dependent, Frequency of Appearance";
Traits.Destiny             = new Trait( "Destiny", 'AD', 'So', 5, true, "B4E48, 131" );
Traits.Destiny.exoticSprntl = 'Supernatural';
Traits.Destiny.lowestLevel = -3;
Traits.Destiny.highestLevel = 3;
Traits.Destiny.levelNames = ["Great Disadvantage", "Major Disadvantage", "Minor Disadvantage", '', "Minor Advantage", "Major Advantage", "Great Advantage"];
Traits.Destiny.multiple = true;
Traits.Destiny.description = [];
// Traits.DestinyAd           = new Trait( "Destiny", 'So', 5, true, "B4E48, 131" );
// Traits.DestinyAd.exoticSprntl = 'Supernatural'
// Traits.DestinyAd.levelNames = [ "Minor Advantage", "Major Advantage", "Great Advantage" ];
// Traits.DestinyDisad        = new Trait( "Destiny", 'So', -5, true, "B4E48, 131" );
// Traits.DestinyDisad.exoticSprntl = 'Supernatural'
// Traits.DestinyDisad.levelNames = [ "Minor Disadvantage", "Major Disadvantage","Great Disadvantage" ];

// Traits.Detect              = new Trait( "Detect", 'MP',  5, true, "B4E48" );
// Traits.Detect.exoticSprntl = 'Exotic';
// Traits.Detect.multiple = true;
// Traits.Detect.mods = 'Detect';
// Traits.Detect.levelNames = ["Rare", "Occasional", '', "Common", '', "Very Common"];
Traits.Detect              = new Trait( "Detect", 'A', 'MP', 5, false, "B4E48" );
Traits.Detect.exoticSprntl = 'Exotic';
Traits.Detect.multiple = true;
Traits.Detect.mods = 'Detect';
// Traits.DetectRare          = new Trait( "Detect", 'MP',  5, false, "B4E48" );
// Traits.DetectRare.description = '[rare]';
// Traits.DetectRare.exoticSprntl = 'Exotic';
// Traits.DetectOccasional    = new Trait( "Detect", 'MP', 10, false, "B4E48" );
// Traits.DetectOccasional.description = '[occasional]';
// Traits.DetectOccasional.exoticSprntl = 'Exotic';
// Traits.DetectCommon        = new Trait( "Detect", 'MP', 20, false, "B4E48" );
// Traits.DetectCommon.description = '[common]';
// Traits.DetectCommon.exoticSprntl = 'Exotic';
// Traits.DetectVeryCommon    = new Trait( "Detect", 'MP', 30, false, "B4E48" );
// Traits.DetectVeryCommon.description = '[very common]';
// Traits.DetectVeryCommon.exoticSprntl = 'Exotic';
Traits.DigitalMind         = new Trait( "Digital Mind", 'A', 'P', 5, false, "B4E48" );
//Traits.DiplomaticImmunity  = new Trait( "Diplomatic Immunity", 'So', 20, false );
Traits.DisciplineOfFaith   = new Trait( "Discipline Of Faith", 'D', 'M', -5, true, "B4E132" );
Traits.DisciplineOfFaith.description = [];
Traits.DisciplineOfFaith.instructions = 'describe religious discipline (Ascetic, Monastic, Ritualistic, <i>etc</i>.)';
Traits.DisciplineOfFaith.highestLevel = 3;
Traits.DiscriminatoryHearing= new Trait( "Discriminatory Hearing", 'A', 'P', 15, false, "B4E49" );
Traits.DiscriminatorySmell = new Trait( "Discriminatory Smell", 'A', 'P', 15, false, "B4E49" );
Traits.DiscriminatoryTaste = new Trait( "Discriminatory Taste", 'A', 'P', 10, false, "B4E49" );
Traits.DisturbingVoice     = new Trait( "Disturbing Voice", 'D', 'P', -10, false, "B4E132" );
Traits.DisturbingVoice.group = "voice";
Traits.DivineCurse         = new Trait( "Divine Curse", 'D', 'M', 'varies', false, "B4E132" );
Traits.DivineCurse.exoticSprntl = 'Supernatural';
Traits.DivineCurse.instructions = 'if Curse is as a Vow or other disad, take that disad instead and edit it to show that it is a Curse';
Traits.DoesntBreathe       = new Trait( "Doesn't Breathe", 'A', 'P', 20, false, "B4E49" );
Traits.DoesntBreathe.mods = "DoesntBreathe";
Traits.DoesntEatorDrink    = new Trait( "Doesn't Eat or Drink", 'A', 'P', 10, false, "B4E50" );
Traits.DoesntEatorDrink.exoticSprntl = 'Exotic';
Traits.DoesntSleep         = new Trait( "Doesn't Sleep", 'A', 'P', 20, false, "B4E50" );
Traits.DoesntSleep.exoticSprntl = 'Exotic';
Traits.Dominance           = new Trait( "Dominance", 'A', 'M', 20, false, "B4E50" );
Traits.Dominance.exoticSprntl = 'Supernatural';
Traits.Dominance.description = [];
Traits.Dominance.instructions = 'specify infectious attack type';
Traits.DoubleJointed       = new Trait( "Double-Jointed", 'A', 'P', 15, false, "B4E56" );
Traits.DoubleJointed.group = 'flex';
Traits.Draining            = new Trait( "Draining", 'D', 'P', -5, true, "B4E132" );
Traits.Draining.exoticSprntl = 'Supernatural';
Traits.Draining.levelsName = 'substance availability';
Traits.Draining.levelNames = ["Common","Occasional","Rare"];
Traits.Draining.mods = "Legality";
Traits.Dread               = new Trait( "Dread", 'D', 'M', -1, true, "B4E132" );
Traits.Dread.multiple = true;
// Traits.Dread.fixedCost = -9;
// Traits.Dread.lowestLevel = 1;
// Traits.Dread.highestLevel = 11;
Traits.Dread.fixedCost = -10;
Traits.Dread.lowestLevel = 0;
Traits.Dread.highestLevel = 10;
Traits.Dread.levelsName = 'extra yard';
Traits.Dread.levelNames = ['0 (1 yard)','1 (2 yards)','2 (3 yards)','3 (4 yards)','4 (5 yards)','5 (6 yards)','6 (7 yards)','7 (8 yards)','8 (9 yards)','9 (10) yards','10 (11 yards)'];
// Traits.Dread.levelNames = ['1 yard','2 yards','3 yards','4 yards','5 yards','6 yards','7 yards','8 yards','9 yards','10 yards','11 yards'];
Traits.Dread.mods = 'Rarity,Dread';
Traits.Dread.exoticSprntl = 'Supernatural';
Traits.Duplication         = new Trait( "Duplication", 'A', 'MP', 35, true, "B4E51" );
Traits.Duplication.exoticSprntl = 'Exotic';
Traits.Duplication.levelsName = 'duplicate';
Traits.Duplication.mods = 'Duplication';
Traits.Duty                = new Trait( "Duty", 'D', 'So', 0, false, "B4E133" );
Traits.Duty.multiple = true;
Traits.Duty.mods = "Frequency Base Cost, Duty";
Traits.Dwarfism            = new Trait( "Dwarfism", 'D', 'P', -15, false, "B4E19" );
Traits.Dyslexia            = new Trait( "Dyslexia", 'D', 'M', -10, false, "B4E132" );

Traits.EasytoKill          = new Trait( "Easy to Kill", 'D', 'P', -2, true, "B4E134" );
Traits.EasytoRead          = new Trait( "Easy to Read", 'D', 'M', -10, false, "B4E134" );
Traits.EideticMemory       = new Trait( "Eidetic Memory", 'A', 'M', 5, false, "B4E51" );
Traits.EideticMemory.group = 'memory';
Traits.ElasticSkin         = new Trait( "Elastic Skin", 'A', 'P', 20, false, "B4E51" );
Traits.ElasticSkin.exoticSprntl = 'Exotic';
Traits.Electrical          = new Trait( "Electrical", 'D', 'P', -20, false, "B4E134" );
Traits.Electrical.exoticSprntl = 'Exotic';
Traits.Empathy             = new Trait( "Empathy", 'A', 'M', 15, false, "B4E51" );
Traits.Empathy.exoticSprntl = 'Supernatural';
Traits.Empathy.group = 'empathy';
// Traits.Enemy               = new Trait( "Enemy", 'So', 0, false, "B4E135" );
Traits.Enemy               = new Trait( "Enemy", 'D', 'So', -5, true, "B4E135" );
Traits.Enemy.multiple = true;
Traits.Enemy.mods = "Enemy, Frequency of Appearance";
Traits.Enemy.levelsName = "power level";
Traits.Enemy.highestLevel = 8;
//Traits.Enemy.levelNames = ['weaker (50% pts)','','','','','','','formidable group'];  // blanks are now handled by makeListOptions, it subs in level
Traits.EnhancedBlockShield = new Trait( "Enhanced Block, Shield", 'A', 'P', 5, true, "B4E51" );
Traits.EnhancedBlockShield.cinematic = true;
Traits.EnhancedBlockCloak  = new Trait( "Enhanced Block, Cloak", 'A', 'P', 5, true, "B4E51" );
Traits.EnhancedBlockCloak.cinematic = true;
Traits.EnhancedDodge       = new Trait( "Enhanced Dodge", 'A', 'P', 15, true, "B4E51" );
Traits.EnhancedDodge.cinematic = true;
// Traits.EnhancedMoveHalf    = new Trait( "Enhanced Move (half-levels)", 'P', 10, true, "B4E52" );
// Traits.EnhancedMoveHalf.multiple = true;
// Traits.EnhancedMoveHalf.description = "choose 1: Air, Ground, Space, Water";
// Traits.EnhancedMoveHalf.levelsName = 'half-level';
// or instead:
//Traits.EnhancedMoveHalf.levelNames = [ 1, 1.5, 2, 2.5, 3, 3.5, 4, etc. ];    can I define this as a progression or formula somehow?
Traits.EnhancedMoveAir     = new Trait( "Enhanced Move, Air", 'A',    'P', 10, true, "B4E52" );
Traits.EnhancedMoveAir.levelsName = 'half-level';
Traits.EnhancedMoveAir.mods = "EnhancedMove";
Traits.EnhancedMoveGround  = new Trait( "Enhanced Move, Ground", 'A', 'P', 10, true, "B4E52" );
Traits.EnhancedMoveGround.mods = "EnhancedMove,EnhancedMoveGround";
Traits.EnhancedMoveGround.levelsName = 'half-level';
Traits.EnhancedMoveSpace   = new Trait( "Enhanced Move, Space", 'A',  'P', 10, true, "B4E52" );
Traits.EnhancedMoveSpace.mods = "EnhancedMove,EnhancedMoveSpace";
Traits.EnhancedMoveSpace.levelsName = 'half-level';
Traits.EnhancedMoveWater   = new Trait( "Enhanced Move, Water", 'A',  'P', 10, true, "B4E52" );
Traits.EnhancedMoveWater.mods = "EnhancedMove";
Traits.EnhancedMoveWater.levelsName = 'half-level';
Traits.EnhancedParryHands = new Trait( "Enhanced Parry, bare hands", 'A', 'P', 5, true, "B4E51" );
Traits.EnhancedParryHands.cinematic = true;
Traits.EnhancedParryWeapon = new Trait( "Enhanced Parry, 1 weapon", 'A', 'P', 5, true, "B4E51" );
Traits.EnhancedParryWeapon.description = [];
Traits.EnhancedParryWeapon.instructions = "indicate a weapon skill";
Traits.EnhancedParryWeapon.cinematic = true;
Traits.EnhancedParry       = new Trait( "Enhanced Parry", 'A', 'P', 10, true, "B4E51" );
Traits.EnhancedParry.cinematic = true;
Traits.EnhancedTimeSense   = new Trait( "Enhanced Time Sense", 'A', 'P', 45, false, "B4E52" );
Traits.EnhancedTimeSense.exoticSprntl = 'Exotic';
Traits.EnhancedTimeSense.group = 'reflexes';
Traits.EnhancedTracking    = new Trait( "Enhanced Tracking", 'A', 'P', 5, true, "B4E53" );
Traits.EnhancedTracking.exoticSprntl = 'Exotic';
Traits.Epilepsy            = new Trait( "Epilepsy", 'D', 'P', -30, false, "B4E136" );
Traits.ESPTalent           = new Trait( "ESP Talent", 'A', 'M', 5, true, "B4E257" );
Traits.ESPTalent.exoticSprntl = 'Exotic';
Traits.ExtendedLifespan    = new Trait( "Extended Lifespan", 'A', 'P', 2, true, "B4E53" );
Traits.ExtendedLifespan.exoticSprntl = 'Exotic';
Traits.ExtendedLifespan.group = "lifespan";
Traits.ExtendedLifespan.levelsName = 'lifespan doubling';
Traits.ExtraArms           = new Trait( "Extra Arms", 'A', 'P', 10, true, "B4E53" );
Traits.ExtraArms.exoticSprntl = 'Exotic';
Traits.ExtraArms.levelsName = 'extra arm';
Traits.ExtraArms.multiple = true;
Traits.ExtraArms.mods = "Arms";
Traits.ExtraAttack         = new Trait( "Extra Attack", 'A', 'P', 25, true, "B4E53" );
// Traits.ExtraFatigue        = new Trait( "Extra Fatigue", 'P', 3, true, "B4E16 (use this trait only to build Templates)" );
Traits.ExtraHead           = new Trait( "Extra Head", 'A', 'P', 15, true, "B4E54" );
Traits.ExtraHead.exoticSprntl = 'Exotic';
Traits.ExtraHead.mods = "ExtraHead";
Traits.ExtraLegs           = new Trait( "Extra Legs", 'A', 'P', 5, true, "B4E54" );
Traits.ExtraLegs.description = [];
Traits.ExtraLegs.highestLevel = 3;
Traits.ExtraLegs.exoticSprntl = 'Exotic';
Traits.ExtraLegs.levelNames = ['3-4 legs','5-6 legs','7+ legs'];
Traits.ExtraLegs.mods = "Legs";
Traits.ExtraLife           = new Trait( "Extra Life", 'A', 'P', 25, true, "B4E55" );
Traits.ExtraLife.exoticSprntl = 'Supernatural';
Traits.ExtraLife.levelsName = 'extra life';
Traits.ExtraLife.group = 'life';
Traits.ExtraLife.mods = 'ExtraLives';
Traits.ExtraMouth          = new Trait( "Extra Mouth", 'A', 'P', 5, true, "B4E55" );
Traits.ExtraMouth.exoticSprntl = 'Supernatural';
Traits.ExtraSleep          = new Trait( "Extra Sleep", 'D', 'P', -2, true, "B4E136" );
Traits.ExtraSleep.highestLevel = 4;
Traits.ExtraSleep.levelsName = 'extra hour';

Traits.Fanaticism          = new Trait( "Fanaticism", 'D', 'M', -15, false, "B4E136" );
Traits.Fanaticism.description = [];
Traits.Fanaticism.mods = 'Fanatic';
Traits.FashionSense        = new Trait( "Fashion Sense", 'A', 'M', 5, false, "B4E21" );
Traits.Fat                 = new Trait( 'Fat', 'D', 'P', -3, false, "B4E19" );
Traits.Fat.group = 'build';
Traits.VeryFat             = new Trait( 'Very Fat', 'D', 'P', -5, false, "B4E19" );
Traits.VeryFat.group = 'build';
Traits.Favor               = new Trait( "Favor", 'A', 'So', 0, false, "B4E55" );
Traits.Favor.instructions = "Take an Ally, Contact, or Patron with the Favor modifier, instead of this advantage.";
// Traits.Favor.mods = "Ally, Contact, Reliability, Patron, Favor";
Traits.Fearfulness         = new Trait( "Fearfulness", 'D', 'M', -2, true, "B4E136" );
Traits.Fearfulness.group = 'fear';
Traits.Fearlessness        = new Trait( "Fearlessness", 'A', 'M', 2, true, "B4E55" );
Traits.Fearlessness.group = 'fear';
Traits.FilterLungs         = new Trait( "Filter Lungs", 'A', 'P', 5, false, "B4E55" );
Traits.FilterLungs.exoticSprntl = 'Exotic';
Traits.Fit                 = new Trait( "Fit", 'A', 'P', 5, false, "B4E55" );
Traits.Fit.group = 'fitness';
Traits.Unfit               = new Trait( "Unfit", 'D', 'P', -5, false, "B4E160" );
Traits.Unfit.group = 'fitness';
Traits.VeryFit             = new Trait( "Very Fit", 'A', 'P', 15, false, "B4E55" );
Traits.VeryFit.group = 'fitness';
Traits.VeryUnfit           = new Trait( "Very Unfit", 'D', 'P', -15, false, "B4E160" );
Traits.VeryUnfit.group = 'fitness';
Traits.Flashbacks          = new Trait( "Flashbacks", 'D', 'M', 0, false, "B4E136" );
Traits.Flashbacks.mods = 'Flashbacks';
Traits.Flexibility         = new Trait( "Flexibility", 'A', 'P', 5, false, "B4E56" );
Traits.Flexibility.group = 'flex';
Traits.Flight              = new Trait( "Flight", 'A', 'P', 40, false, "B4E56" );
Traits.Flight.exoticSprntl = 'Exotic';
Traits.Flight.mods = "Flight";
Traits.Fragile             = new Trait( "Fragile", 'D', 'P', 0, false, "B4E136" );
Traits.Fragile.multiple = true;
Traits.Fragile.mods = 'Fragile';
Traits.Fragile.exoticSprntl = 'Exotic';
Traits.FrightensAnimals    = new Trait( "Frightens Animals", 'D', 'P', -10, false, "B4E137" );
Traits.FrightensAnimals.exoticSprntl = 'Supernatural';
Traits.Fur                 = new Trait( "Fur", 'P', 'P', 1, false, "B4E101" );
Traits.Fur.exoticSprntl = 'Exotic';

Traits.GIntolerance        = new Trait( "G-Intolerance", 'D', 'P', -10, true, "B4E137" );
Traits.GIntolerance.levelsName = 'G-increment';
Traits.GIntolerance.levelNames = ['0.1G','0.05G'];
Traits.Gadgeteer           = new Trait( "Gadgeteer", 'A', 'M', 25, true, "B4E56" );
Traits.Gadgeteer.highestLevel = 2;
Traits.Gadgeteer.levelNames = ['(normal)','Quick'];
Traits.Gadgeteer.cinematic = true;
Traits.GExperience         = new Trait( "G-Experience", 'A', 'M', 1, false, "B4E57" );
Traits.GExperience.multiple = true;
Traits.GExperience.description = [];
Traits.GExperience.instructions = "specify a grativy level; e.g. '0.16G' (Earth's moon)";
Traits.GExperienceAll      = new Trait( "G-Experience, all", 'A', 'M', 10, false, "B4E57" );
Traits.GiftedArtistTalent = new Trait( "Gifted Artist Talent", 'A', 'M', 5, true, "B4E89-90" );
Traits.GiftedArtistTalent.highestLevel = 4;
Traits.Gizmos              = new Trait( "Gizmos", 'A', 'M', 5, true, "B4E57" );
Traits.Gizmos.cinematic = true;
Traits.Gizmos.levelsName = 'gizmo';
Traits.Gigantism           = new Trait( "Gigantism", 'AD', 'P', 0, false, "B4E20" );
Traits.Gluttony            = new Trait( "Gluttony", 'D', 'M', -5, false, "B4E137"  );
Traits.Gluttony.mods = "Self-Control";
Traits.Greed               = new Trait( "Greed", 'D', 'M', -15, false, "B4E137" );
Traits.Greed.mods = "Self-Control";
Traits.GreenThumbTalent = new Trait( "Green Thumb Talent", 'A', 'M', 5, true, "B4E89-90" );
Traits.GreenThumbTalent.highestLevel = 4;
Traits.Gregarious          = new Trait( "Gregarious", 'D', 'M', -10, false, "B4E126" );
Traits.Growth              = new Trait( "Growth", 'A', 'P', 10, true, "B4E58" );
Traits.Growth.exoticSprntl = 'Exotic';
Traits.Growth.mods = 'Growth';
// prerequisite of ST = 5 x max height/length in yards (can get -40% Size limitation if ST is only available when grown)
Traits.GuiltComplex        = new Trait( "Guilt Complex", 'D', 'M', -5, false, "B4E137" );
Traits.Gullibility         = new Trait( "Gullibility", 'D', 'M', -10, false, "B4E137" );
Traits.Gullibility.mods = "Self-Control";
Traits.Gunslinger          = new Trait( "Gunslinger", 'A', 'M', 25, false, "B4E58" );
Traits.Gunslinger.cinematic = true;

Traits.HamFisted           = new Trait( "Ham-Fisted", 'D', 'P', -5, true, "B4E138" );
Traits.HamFisted.levelNames = ['DX-3 for manual skills','DX-6 for manual skills'];
Traits.HamFisted.group = 'dex';
Traits.HardOfHearing       = new Trait( "Hard of Hearing", 'D', 'P', -10, false, "B4E138" );
Traits.HardtoKill          = new Trait( "Hard to Kill", 'A', 'P', 2, true, "B4E58" );
Traits.HardtoKill.cinematic = true;
Traits.HardtoSubdue        = new Trait( "Hard to Subdue", 'A', 'P', 2, true, "B4E59" );
Traits.HardtoSubdue.cinematic = true;
Traits.HealerTalent        = new Trait( "Healer Talent", 'A', 'M', 10, true, "B4E89-90" );
Traits.HealerTalent.highestLevel = 4;
Traits.Healing             = new Trait( "Healing", 'A', 'M', 30, false, "B4E59" );
Traits.Healing.exoticSprntl = 'Exotic';
Traits.Healing.mods = "Healing, PsychicHealing";
Traits.Hemophilia          = new Trait( "Hemophilia", 'D', 'P', -30, false, "B4E138" );
Traits.Hermaphromorph      = new Trait( "Hermaphromorph", 'A', 'P', 5, false, "B4E59" );
Traits.Hermaphromorph.exoticSprntl = 'Exotic';
Traits.ManualDexterity     = new Trait( "High Manual Dexterity", 'A', 'P', 5, true, "B4E59" );
Traits.ManualDexterity.levelsName = 'manual skill +';
Traits.ManualDexterity.highestLevel = 4;
Traits.ManualDexterity.group = 'dex';
Traits.Hidebound           = new Trait( "Hidebound", 'D', 'M', -5, false, "B4E138" );
Traits.HighPainThreshold   = new Trait( "High Pain Threshold", 'A', 'P', 10, false, "B4E59" );
Traits.HighPainThreshold.group = 'durable';
Traits.HigherPurpose       = new Trait( "Higher Purpose", 'A', 'M', 5, false, "B4E59" );
Traits.HigherPurpose.description = [];
Traits.HigherPurpose.instructions = 'describe like a Code of Honor';
Traits.HigherPurpose.exoticSprntl = 'Supernatural';
Traits.Honesty             = new Trait( "Honesty", 'D', 'M', -10, false, "B4E138" );
Traits.Honesty.mods = "Self-Control";
Traits.HonestFace          = new Trait( "Honest Face", 'P', 'P', 1, false, "B4E101" );
Traits.Horizontal          = new Trait( "Horizontal", 'D', 'P', -10, false, "B4E139" );
Traits.Horizontal.exoticSprntl = 'Exotic';
Traits.Hunchback           = new Trait( "Hunchback", 'D', 'P', -10, false, "B4E139" );
Traits.HyperspectralVision = new Trait( "Hyperspectral Vision", 'A', 'P', 25, false, "B4E60" );
Traits.HyperspectralVision.exoticSprntl = 'Exotic';
Traits.HyperspectralVision.mods = "HyperspectralVision";

Traits.Illuminated         = new Trait( "Illuminated", 'A', 'M', 15, false, "B4E60" );
Traits.Illuminated.exoticSprntl = 'Supernatural';
Traits.ImprovedGTolerance  = new Trait( "Improved G-Tolerance", 'A', 'P', 5, true, "B4E60" );
Traits.ImprovedGTolerance.levelsName = 'G-increment';
Traits.ImprovedGTolerance.levelNames = ['0.3G','0.5G','1G','5G','10G'];
Traits.Impulsiveness       = new Trait( "Impulsiveness", 'D', 'M', -10, false, "B4E139" );
Traits.Impulsiveness.mods = "Self-Control";
// skill incompetencies
Traits.IncreasedConsumption= new Trait( "Increased Consumption", 'D', 'P', -10, true, "B4E139" );
// Traits.IncreasedConsumption.levelNames = ['6 meals/day (4-hr endurance)','12 meals/day (2-hr endurance)','24 meals/day (1-hr endurance)'];
// // Traits.IncreasedConsumption.levelsName = '6*$ meals/day (4/$-hr endurance)';
// Traits.IncreasedConsumption.levelsName = "meals/day doubling";
Traits.IncreasedConsumption.levelsName = "^2 × 3 daily meal";
Traits.IncreasedConsumption.group = "consumption";
Traits.IncreasedDX         = new Trait( "Increased Dexterity", 'A',      'P', 20, true, "B4E15" );
Traits.IncreasedDX.instructions = "use this trait only to build Templates";
Traits.IncreasedHT         = new Trait( "Increased Health", 'A',         'P', 10, true, "B4E15" );
Traits.IncreasedHT.instructions = "use this trait only to build Templates";
Traits.IncreasedIQ         = new Trait( "Increased Intelligence", 'A',   'M', 20, true, "B4E15" );
Traits.IncreasedIQ.instructions = "use this trait only to build Templates";
Traits.IncreasedST         = new Trait( "Increased Strength", 'A',       'P', 10, true, "B4E14" );
Traits.IncreasedST.instructions = "use this trait only to build Templates";
Traits.IncreasedPer        = new Trait( "Increased Perception", 'A',     'M',  5, true, "B4E16" );
Traits.IncreasedPer.instructions = "use this trait only to build Templates";
Traits.IncreasedSpeed      = new Trait( "Increased Basic Speed", 'A',    'P',  5, true, "B4E17" );
Traits.IncreasedSpeed.instructions = "use this trait only to build Templates";
Traits.IncreasedSpeed.levelsName = '0.25';
Traits.IncreasedBasicMove  = new Trait( "Increased Basic Move", 'A',     'P',  5, true, "B4E17" );
Traits.IncreasedBasicMove.instructions = "use this trait only to build Templates";
Traits.IncreasedAirMove    = new Trait( "Increased Air Move", 'A',       'P',  2, true, "B4E18" );
Traits.IncreasedAirMove.instructions = "use this trait only to build Templates";
Traits.IncreasedWaterMove  = new Trait( "Increased Water Move", 'A',     'P',  5, true, "B4E18" );
Traits.IncreasedWaterMove.instructions = "use this trait only to build Templates";
Traits.IncreasedHP         = new Trait( "Increased Hit Points", 'A',     'P',  2, true, "B4E16" );
Traits.IncreasedHP.instructions = "use this trait only to build Templates";
Traits.IncreasedFP         = new Trait( "Increased Fatigue Points", 'A', 'P',  3, true, "B4E16" );
Traits.IncreasedFP.instructions = "use this trait only to build Templates";
Traits.IncreasedLifeSupport= new Trait( "Increased Life Support", 'D', 'P', 0, false, "B4E139" );
Traits.IncreasedLifeSupport.exoticSprntl = 'Exotic';
Traits.IncreasedLifeSupport.mods = 'LifeSupport';
Traits.Incurious           = new Trait( "Incurious", 'D', 'M', -5, false, "B4E140" );
Traits.Incurious.mods = "Self-Control";
Traits.Indecisive          = new Trait( "Indecisive", 'D', 'M', -10, false, "B4E140" );
Traits.Indecisive.mods = "Self-Control";
Traits.IndependentIncome   = new Trait( "Independent Income", 'A', 'So', 1, true, "B4E26" );
Traits.IndependentIncome.levelsName = '% of Starting Wealth';
Traits.IndependentIncome.levelsNameNonPlural = true;
Traits.IndependentIncome.highestLevel = 20;
Traits.Indomitable         = new Trait( "Indomitable", 'A', 'M', 15, false, "B4E60" );
Traits.InfectiousAttack    = new Trait( "Infectious Attack", 'D', 'P', -5, false, "B4E140" );
Traits.InfectiousAttack.exoticSprntl = 'Supernatural';
Traits.InfectiousAttack.multiple = true;
// Traits.InfectiousAttack.mods = 'Attack';
Traits.Infravision         = new Trait( "Infravision", 'A', 'P', 10, false, "B4E60" );
Traits.Infravision.exoticSprntl = 'Exotic';
Traits.Infravisiononly     = new Trait( "Infravision only", 'A', 'P', 0, false, "B4E60" );
Traits.Infravisiononly.exoticSprntl = 'Exotic';
// Traits.InherentMagicKnackstype = new Trait( "Inherent Magic: Knacks (type)", 'M', 'varies', false );
// Traits.InherentMagicKnackstype.exoticSprntl = 'Supernatural';
Traits.InjuryTolerance     = new Trait( "Injury Tolerance", 'A', 'P', 0, false, "B4E60" );
Traits.InjuryTolerance.mods = 'Injury';
Traits.InjuryTolerance.exoticSprntl = 'Exotic';
// Innate Attack group
Traits.BurningAttack       = new Trait( "Burning Attack", 'A', 'P', 5, true, "B4E61" );
Traits.BurningAttack.exoticSprntl = 'Exotic';
Traits.BurningAttack.multiple = true;
Traits.BurningAttack.mods = 'Attack';
Traits.CorrosiveAttack     = new Trait( "Corrosive Attack", 'A', 'P', 10, true, "B4E61" );
Traits.CorrosiveAttack.exoticSprntl = 'Exotic';
Traits.CorrosiveAttack.multiple = true;
Traits.CorrosiveAttack.mods = 'Attack';
Traits.CrushingAttack      = new Trait( "Crushing Attack", 'A', 'P', 5, true, "B4E61" );
Traits.CrushingAttack.exoticSprntl = 'Exotic';
Traits.CrushingAttack.multiple = true;
Traits.CrushingAttack.mods = 'Attack';
Traits.CuttingAttack       = new Trait( "Cutting Attack", 'A', 'P', 7, true, "B4E61" );
Traits.CuttingAttack.exoticSprntl = 'Exotic';
Traits.CuttingAttack.multiple = true;
Traits.CuttingAttack.mods = 'Attack';
Traits.FatigueAttack       = new Trait( "Fatigue Attack", 'A', 'P', 10, true, "B4E61" );
Traits.FatigueAttack.exoticSprntl = 'Exotic';
Traits.FatigueAttack.multiple = true;
Traits.FatigueAttack.mods = 'Attack';
Traits.ImpalingAttack      = new Trait( "Impaling Attack", 'A', 'P', 8, true, "B4E61" );
Traits.ImpalingAttack.exoticSprntl = 'Exotic';
Traits.ImpalingAttack.multiple = true;
Traits.ImpalingAttack.mods = 'Attack';
Traits.SmallPiercingAttack = new Trait( "Small Piercing Attack", 'A', 'P', 3, true, "B4E62" );
Traits.SmallPiercingAttack.exoticSprntl = 'Exotic';
Traits.SmallPiercingAttack.multiple = true;
Traits.SmallPiercingAttack.mods = 'Attack';
Traits.PiercingAttack      = new Trait( "Piercing Attack", 'A', 'P', 5, true, "B4E62" );
Traits.PiercingAttack.exoticSprntl = 'Exotic';
Traits.PiercingAttack.multiple = true;
Traits.PiercingAttack.mods = 'Attack';
Traits.LargePiercingAttack = new Trait( "Large Piercing Attack", 'A', 'P', 6, true, "B4E62" );
Traits.LargePiercingAttack.exoticSprntl = 'Exotic';
Traits.LargePiercingAttack.multiple = true;
Traits.LargePiercingAttack.mods = 'Attack';
Traits.HugePiercingAttack  = new Trait( "Huge Piercing Attack", 'A', 'P', 8, true, "B4E62" );
Traits.HugePiercingAttack.exoticSprntl = 'Exotic';
Traits.HugePiercingAttack.multiple = true;
Traits.HugePiercingAttack.mods = 'Attack';
Traits.ToxicAttack         = new Trait( "Toxic Attack", 'A', 'P', 4, true, "B4E62" );
Traits.ToxicAttack.exoticSprntl = 'Exotic';
Traits.ToxicAttack.multiple = true;
Traits.ToxicAttack.mods = 'Attack';
// back to regularly scheduled 'I's
Traits.Innumerate          = new Trait( "Innumerate", 'D', 'M', -5, false, "B4E140" );
Traits.InsomniacMild       = new Trait( "Insomniac, mild", 'D', 'P', -10, false, "B4E140" );
Traits.InsomniacSevere     = new Trait( "Insomniac, severe", 'D', 'P', -15, false, "B4E140" );
Traits.Insubstantiality    = new Trait( "Insubstantiality", 'A', 'MP', 80, false, "B4E62" );
Traits.Insubstantiality.exoticSprntl = 'Supernatural';
Traits.Insubstantiality.mods = "Insubstantiality, Carry Objects";
Traits.Intolerance         = new Trait( "Intolerance", 'D', 'M', -10, false, "B4E140" );
Traits.IntoleranceSpec     = new Trait( "Intolerance, specific", 'D', 'M', -1, true, "B4E140" );
Traits.IntoleranceSpec.highestLevel = 5;
Traits.IntoleranceSpec.multiple = true;
Traits.IntoleranceSpec.description = [];
Traits.IntoleranceSpec.instructions = 'class, ethnicity, nationality, religion, sex, species, <i>etc</i>.';
Traits.Intuition           = new Trait( "Intuition", 'A', 'M', 15, false, "B4E63" );
Traits.IntuitiveMathematician = new Trait( "Intuitive Mathematician", 'A', 'M', 5, false, "B4E66" );
Traits.IntuitiveMathematician.group = 'mathematician';
Traits.Invisibility        = new Trait( "Invisibility", 'A', 'MP', 40, false, "B4E63" );
Traits.Invisibility.exoticSprntl = 'Exotic';
Traits.Invisibility.mods = 'Invisibility, Carry Objects';
Traits.Invertebrate        = new Trait( "Invertebrate", 'D', 'P', -20, false, "B4E140" );
Traits.Invertebrate.exoticSprntl = 'Exotic';

Traits.Jealousy            = new Trait( "Jealousy", 'D', 'M', -10, false, "B4E140" );
Traits.Jumper              = new Trait( "Jumper", 'A', 'M', 100, false, "B4E64" );
Traits.Jumper.description = ['time-jumper','world-jumper'];
Traits.Jumper.exoticSprntl = 'Supernatural';
Traits.Jumper.mods = 'Jumper, Warp Jump';

Traits.Killjoy             = new Trait( "Killjoy", 'D', 'P', -15, false, "B4E140" );
Traits.Kleptomania         = new Trait( "Kleptomania", 'D', 'M', -15, false, "B4E141" );
Traits.Kleptomania.mods = "Self-Control";
Traits.Klutz               = new Trait( "Klutz", 'D', 'P', -5, false, "B4E141" );

Traits.LameCrippledLeg     = new Trait( "Lame, crippled leg", 'D', 'P', -10, false, "B4E141" );
Traits.LameOneLeg          = new Trait( "Lame, one leg", 'D', 'P', -20, false, "B4E141" );
Traits.LameLegless         = new Trait( "Lame, legless", 'D', 'P', -30, false, "B4E141" );
Traits.LameParaplegic      = new Trait( "Lame, paraplegic", 'D', 'P', -30, false, "B4E141" );
Traits.LanguageTalent      = new Trait( "Language Talent", 'A', 'M', 10, false, "B4E65" );
Traits.Lazy                = new Trait( "Laziness", 'D', 'M', -10, false, "B4E142" );
Traits.Lecherousness       = new Trait( "Lecherousness", 'D', 'M', -15, false, "B4E142" );
Traits.Lecherousness.mods = "Self-Control";
Traits.LegalEnforcementPowers = new Trait( "Legal Enforcement Powers", 'A', 'So', 5, true, "B4E65" );
Traits.LegalEnforcementPowers.highestLevel = 3;
Traits.LegalImmunity       = new Trait( "Legal Immunity", 'A', 'So', 5, true, "B4E65" );
Traits.LegalImmunity.highestLevel = 3;
Traits.LegalImmunity.mods = "Pouch";
Traits.LessSleep           = new Trait( "Less Sleep", 'A', 'P', 2, true, "B4E65" );
Traits.LessSleep.highestLevel = 4;
Traits.Lifebane            = new Trait( "Lifebane", 'D', 'M', -10, false, "B4E142" );
Traits.Lifebane.exoticSprntl = 'Supernatural';
Traits.LiftingST           = new Trait( "Lifting ST", 'A', 'P', 3, true, "B4E65" );
Traits.LiftingST.exoticSprntl = 'Exotic';
Traits.LiftingST.posNegLevels = true;
Traits.LiftingST.lowestLevel = -5;
Traits.LightSleeper        = new Trait( "Light Sleeper", 'D', 'P', -5, false, "B4E142" );
Traits.LightningCalculator = new Trait( "Lightning Calculator", 'A', 'M', 2, false, "B4E66" );
Traits.LightningCalculator.group = 'mathematician';
Traits.Loner               = new Trait( "Loner", 'D', 'M', -5, false, "B4E142" );
Traits.Loner.mods = "Self-Control";
Traits.Longevity           = new Trait( "Longevity", 'A', 'P', 2, false, "B4E66" );
Traits.Longevity.group = "aging";
Traits.LowEmpathy          = new Trait( "Low Empathy", 'D', 'M', -20, false, "B4E142" );
Traits.LowEmpathy.group = 'empathy';
Traits.LowPainThreshold    = new Trait( "Low Pain Threshold", 'D', 'P', -10, false, "B4E142" );
Traits.LowSelfImage        = new Trait( "Low Self-Image", 'D', 'M', -10, false, "B4E143" );
Traits.Luck                = new Trait( "Luck", 'A', 'M', 15, false, "B4E66" );
Traits.Luck.mods = "Luck";
Traits.Luck.group = 'luck';
Traits.LuckExtraordinary   = new Trait( "Extraordinary Luck", 'A', 'M', 30, false, "B4E66" );
Traits.LuckExtraordinary.cinematic = true;
Traits.LuckExtraordinary.mods = "Luck";
Traits.LuckExtraordinary.group = 'luck';
Traits.LuckRidiculous      = new Trait( "Ridiculous Luck", 'A', 'M', 60, false, "B4E66" );
Traits.LuckRidiculous.cinematic = true;
Traits.LuckRidiculous.mods = "Luck";
Traits.LuckRidiculous.group = 'luck';
Traits.Lunacy              = new Trait( "Lunacy", 'D', 'M', -10, false, "B4E143" );

Traits.Magery0             = new Trait( "Magery 0", 'A', 'M', 5, false, "B4E66" );
Traits.Magery0.exoticSprntl = 'Supernatural';
Traits.Magery0.instructions = 'Magery 0 is a prerequisite for any other Magery.';
Traits.Magery              = new Trait( "Magery", 'A', 'M', 10, true, "B4E66" );
//Traits.Magery.fixedCost = 5;
Traits.Magery.exoticSprntl = 'Supernatural';
Traits.Magery.mods = 'Magery';
//Traits.Magery.group = 'Magery';
Traits.Magery.multiple = true;
Traits.Magery.instructions = 'Magery 0 is a prerequisite for any other Magery.  College-aspected Magery advantages are listed separately.';
Traits.MageryAir           = new Trait( "Air-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryAir.exoticSprntl = 'Supernatural';
Traits.MageryAir.group = 'CollegeAspectedMagery';
Traits.MageryEarth         = new Trait( "Earth-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryEarth.exoticSprntl = 'Supernatural';
Traits.MageryEarth.group = 'CollegeAspectedMagery';
Traits.MageryFire          = new Trait( "Fire-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryFire.exoticSprntl = 'Supernatural';
Traits.MageryFire.group = 'CollegeAspectedMagery';
Traits.MageryWater         = new Trait( "Water-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryWater.exoticSprntl = 'Supernatural';
Traits.MageryWater.group = 'CollegeAspectedMagery';
Traits.MageryBody          = new Trait( "Body-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryBody.description = "Body-Control single-college Magery";
Traits.MageryBody.exoticSprntl = 'Supernatural';
Traits.MageryBody.group = 'CollegeAspectedMagery';
Traits.MageryLife          = new Trait( "Life-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryLife.description = "Healing single-college Magery";
Traits.MageryLife.exoticSprntl = 'Supernatural';
Traits.MageryLife.group = 'CollegeAspectedMagery';
Traits.MageryDeath         = new Trait( "Death-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryDeath.description = "Necromancy single-college Magery";
Traits.MageryDeath.exoticSprntl = 'Supernatural';
Traits.MageryDeath.group = 'CollegeAspectedMagery';
Traits.MageryMind          = new Trait( "Mind-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryMind.description = "Mind-Control single-college Magery";
Traits.MageryMind.exoticSprntl = 'Supernatural';
Traits.MageryMind.group = 'CollegeAspectedMagery';
Traits.MageryLight         = new Trait( "Light-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryLight.description = "Light & Darkness single-college Magery";
Traits.MageryLight.exoticSprntl = 'Supernatural';
Traits.MageryLight.group = 'CollegeAspectedMagery';
Traits.MageryMove          = new Trait( "Move-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryMove.description = "Movement single-college Magery";
Traits.MageryMove.exoticSprntl = 'Supernatural';
Traits.MageryMove.group = 'CollegeAspectedMagery';
Traits.MageryKen           = new Trait( "Ken-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryKen.description = "Knowledge single-college Magery";
Traits.MageryKen.exoticSprntl = 'Supernatural';
Traits.MageryKen.group = 'CollegeAspectedMagery';
Traits.MageryTalk          = new Trait( "Talk-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryTalk.description = "Comm & Empathy single-college Magery";
Traits.MageryTalk.exoticSprntl = 'Supernatural';
Traits.MageryTalk.group = 'CollegeAspectedMagery';
Traits.MageryWard          = new Trait( "Ward-Magery", 'A', 'M', 6, true, "B4E66" );
Traits.MageryWard.description = "Protection single-college Magery";
Traits.MageryWard.exoticSprntl = 'Supernatural';
Traits.MageryWard.group = 'CollegeAspectedMagery';
Traits.MageryRitual        = new Trait( "Ritual Magery", 'A', 'M', 10, true, "B4E242" );
Traits.MageryRitual.fixedCost = 5;
Traits.MageryRitual.exoticSprntl = 'Supernatural';
Traits.MageryRitual.mods = 'Magery';
Traits.MageryRitual.group = 'Magery';
Traits.MagicResistance     = new Trait( "Magic Resistance", 'A', 'M', 2, true, "B4E67" );
Traits.MagicResistance.exoticSprntl = 'Supernatural';
Traits.MagicResistance.mods = 'MagicResistance';
// Traits.MagicResistance.group = 'ManaEnhanceResist';
Traits.MagicSusceptibility = new Trait( "Magic Susceptibility", 'D', 'M', -3, true, "B4E143" );
Traits.MagicSusceptibility.exoticSprntl = 'Supernatural';
Traits.MagicSusceptibility.highestLevel = 5;
// Traits.MagicSusceptibility.group = 'ManaEnhanceResist';
Traits.Maintenance         = new Trait( "Maintenance", 'D', 'P', -10, true, "B4E143" );
Traits.Maintenance.description = [];
Traits.Maintenance.instructions = 'What kind of care; describe required skills, traits and facilities';
Traits.Maintenance.mods = 'Maintenance';
Traits.ManaDamper          = new Trait( "Mana Damper", 'A', 'M', 10, false, "B4E67" );
Traits.ManaDamper.exoticSprntl = 'Supernatural';
Traits.ManaDamper.mods = "Mana";
Traits.ManaDamper.group = 'Magery';
Traits.ManaEnhancer        = new Trait( "Mana Enhancer", 'A', 'M', 50, false, "B4E68" );
Traits.ManaEnhancer.exoticSprntl = 'Supernatural';
Traits.ManaEnhancer.highestLevel = 2;
Traits.ManaEnhancer.mods = "Mana";
// Traits.ManaEnhancer.group = 'ManaEnhanceResist';
Traits.ManicDepressive     = new Trait( "Manic-Depressive", 'D', 'M', -20, false, "B4E143" );
Traits.MathAbilityTalent = new Trait( "Mathematical Ability Talent", 'A', "M", 10, true, "B4E89-90" );
Traits.MathAbilityTalent.highestLevel = 4;
// Traits.MechanicalTelepathy = new Trait( "Mechanical Telepathy", 'P', 120, false );
Traits.Medium              = new Trait( "Medium", 'A', 'M', 10, false, "B4E68" );
Traits.Medium.exoticSprntl = 'Supernatural';
Traits.Megalomania         = new Trait( "Megalomania", 'D', 'M', -10, false, "B4E144" );
Traits.MetabolismControl   = new Trait( "Metabolism Control", 'A', 'P', 5, true, "B4E68" );
Traits.MetabolismControl.exoticSprntl = 'Exotic';
Traits.MetabolismControl.mods = 'Metabolism';
Traits.MicrosopicVision    = new Trait( "Microsopic Vision", 'A', 'P', 5, true, "B4E68" );
Traits.MicrosopicVision.exoticSprntl = 'Exotic';
Traits.MicrosopicVision.levelsName = 'mag ×10 e';
Traits.Mimicry             = new Trait( "Mimicry", 'A', 'M', 10, false, "B4E68" );
Traits.Mimicry.exoticSprntl = 'Exotic';
Traits.MindControl         = new Trait( "Mind Control", 'A', 'M', 50, false, "B4E68" );
Traits.MindControl.exoticSprntl = 'Exotic';
Traits.MindControl.mods = "MindControl, TP";
Traits.Mindlink            = new Trait( "Mindlink, one person", 'A', 'M', 5, false, "B4E70" );
Traits.Mindlink.description = [];
Traits.Mindlink.exoticSprntl = 'Supernatural';
Traits.Mindlink.mods = "MindReading, Telecommunication, Telesend";
Traits.MindlinkGroup       = new Trait( "Mindlink, group", 'A', 'M', 10, true, "B4E70" );
Traits.MindlinkGroup.description = [];
Traits.MindlinkGroup.exoticSprntl = 'Supernatural';
Traits.MindlinkGroup.levelsName = 'group size ×10 increment';
Traits.MindlinkGroup.mods = "MindReading, Telecommunication, Telesend";
Traits.MindProbe           = new Trait( "Mind Probe", 'A', 'M', 20, false, "B4E69" );
Traits.MindProbe.exoticSprntl = 'Exotic';
Traits.MindProbe.mods = "MindReading";
Traits.MindReading         = new Trait( "Mind Reading", 'A', 'M', 30, false, "B4E69" );
Traits.MindReading.exoticSprntl = 'Exotic';
Traits.MindReading.mods = "MindReading, TP";
Traits.MindShield          = new Trait( "Mind Shield", 'A', 'M', 4, true, "B4E70" );
Traits.MindShield.exoticSprntl = 'Exotic';
Traits.MindShield.mods = "MindShield, TP";
Traits.Miserliness         = new Trait( "Miserliness", 'D', 'M', -10, false, "B4E144" );
Traits.Miserliness.mods = "Self-Control";
Traits.MissingFinger       = new Trait( "Missing Finger", 'D', 'P', -2, false, "B4E144" );
Traits.MissingThumb        = new Trait( "Missing Thumb", 'D',  'P', -5, false, "B4E144" );
Traits.MistakenIdentity    = new Trait( "Mistaken Identity", 'D', 'So', -5, false, "B4E21" );
Traits.ModularAbProgram    = new Trait( "Modular Ability, program", 'A', 'MP', 4, true, "B4E71");
Traits.ModularAbProgram.fixedCost = 6;
Traits.ModularAbProgram.exoticSprntl = 'Exotic';
Traits.ModularAbProgram.lowestLevel = 1;
Traits.ModularAbProgram.levelsName = 'ability pt';
Traits.ModularAbProgram.multiple = true;
Traits.ModularAbProgram.mods = "ModularAbilities";
Traits.ModularAbChipSlot   = new Trait( "Modular Ability, chip slot", 'A', 'MP', 3, true, "B4E71" );
Traits.ModularAbChipSlot.fixedCost = 5;
Traits.ModularAbChipSlot.exoticSprntl = 'Exotic';
Traits.ModularAbChipSlot.lowestLevel = 1;
Traits.ModularAbChipSlot.levelsName = 'ability pt';
Traits.ModularAbChipSlot.multiple = true;
Traits.ModularAbChipSlot.mods = "ModularAbilities";
Traits.ModularAbMemorized  = new Trait( "Modular Ability, memorized", 'A', 'MP', 3, true, "B4E71" );
Traits.ModularAbMemorized.fixedCost = 5;
Traits.ModularAbMemorized.exoticSprntl = 'Exotic';
Traits.ModularAbMemorized.lowestLevel = 1;
Traits.ModularAbMemorized.levelsName = 'ability pt';
Traits.ModularAbMemorized.multiple = true;
Traits.ModularAbMemorized.mods = "ModularAbilities";
Traits.ModularAbCosmic     = new Trait( "Modular Ability, cosmic", 'A', 'MP', 10, true, "B4E71" );
Traits.ModularAbCosmic.exoticSprntl = 'Exotic';
Traits.ModularAbCosmic.levelsName = 'ability pt';
Traits.ModularAbCosmic.mods = "ModularAbilities";
Traits.MotionSickness      = new Trait( "Motion Sickness", 'D', 'P', -10, false, "B4E144" );
Traits.MundaneBackground   = new Trait( "Mundane Background", 'D', 'M', -10, false, "B4E144" );
Traits.MusicalAbilityTalent= new Trait( "Musical Ability Talent", 'A', "M", 5, true, "B4E89-90" );
Traits.MusicalAbilityTalent.highestLevel = 4;
Traits.Mute                = new Trait( "Mute", 'D', 'P', -25, false, "B4E125" );
Traits.Mute.instructions = "see also 'Cannot Speak'";
Traits.Mute.group = "voice";

Traits.NeurologicalDisorder= new Trait( "Neurological Disorder", 'D', 'P', -20, true, "B4E144" );
Traits.NeurologicalDisorder.fixedCost = 5;
Traits.NeurologicalDisorder.levelNames = ['Mild','Severe','Crippling'];
Traits.Neutralize          = new Trait( "Neutralize", 'A', 'M', 50, false, "B4E71" );
Traits.Neutralize.exoticSprntl = 'Exotic';
Traits.Neutralize.mods = 'Neutralize';
Traits.NictatingMembrane   = new Trait( "Nictating Membrane", 'A', 'P', 1, true, "B4E71" );
Traits.NictatingMembrane.exoticSprntl = 'Exotic';
Traits.NightBlindness      = new Trait( "Night Blindness", 'D', 'P', -10, false, "B4E144" );
Traits.NightBlindness.group = "Dark Vision";
Traits.Nightmares          = new Trait( "Nightmares", 'D', 'M', -5, false, "B4E144" );
Traits.Nightmares.mods = "Self-Control";
Traits.NightVision         = new Trait( "Night Vision", 'A', 'P', 1, true, "B4E71" );
Traits.NightVision.highestLevel = 9;
Traits.NightVision.group = "Dark Vision";
Traits.NoDepthPerception   = new Trait( "No Depth Perception", 'D', 'P', -15, false, "B4E145" );
Traits.NoDepthPerception.group = 'monocular';
Traits.NoFineManipulators  = new Trait( "No Fine Manipulators", 'D', 'P', -30, false, "B4E145" );
Traits.NoFineManipulators.exoticSprntl = 'Exotic';
Traits.NoFineManipulators.group = 'manipulators';
// Traits.NoFineManipulators  = new Trait( "No Fine Manipulators", 'D', 'P', -20, true, "B4E145" );
// Traits.NoFineManipulators.exoticSprntl = 'Exotic';
// Traits.NoFineManipulators.fixedCost = -10;
// Traits.NoFineManipulators.lowestLevel  = 1;
// Traits.NoFineManipulators.highestLevel = 2;
// Traits.NoFineManipulators.levelNames = ['','No Manipulators'];
Traits.NoHangover          = new Trait( "No Hangover", 'P', 'P', 1, false, "B4E101" );
// Traits.NoLegs              = new Trait( "No Legs", 'D', 'P', 0, false, "B4E145" );
// Traits.NoLegs.instructions = "use as a Racial disadvantage only";
// Traits.NoLegs.exoticSprntl = 'Exotic';
// Traits.NoLegs.group = 'no legs';
// Traits.NoLegs.mods = 'NoLegs';
Traits.NoLegsAerial        = new Trait( "No Legs, Aerial", 'D', 'P', 0, false, "B4E145" );
Traits.NoLegsAerial.exoticSprntl = 'Exotic';
Traits.NoLegsAerial.group = 'no legs';
Traits.NoLegsAquatic       = new Trait( "No Legs, Aquatic", 'D', 'P', 0 , false, "B4E145");
Traits.NoLegsAquatic.exoticSprntl = 'Exotic';
Traits.NoLegsAquatic.mods = 'NoLegsAquatic';
Traits.NoLegsAquatic.group = 'no legs';
Traits.NoLegsBounceRollSlither = new Trait( "No Legs, Bounces, Rolls, or Slithers", 'D', 'P', 0, false, "B4E145" );
Traits.NoLegsBounceRollSlither.exoticSprntl = 'Exotic';
Traits.NoLegsBounceRollSlither.group = 'no legs';
Traits.NoLegsSemiAquatic   = new Trait( "No Legs, Semi-Aquatic", 'D', 'P', 0, false, "B4E145" );
Traits.NoLegsSemiAquatic.exoticSprntl = 'Exotic';
Traits.NoLegsSemiAquatic.group = 'no legs';
Traits.NoLegsSessile       = new Trait( "No Legs, Sessile", 'D', 'P', -50, false, "B4E145" );
Traits.NoLegsSessile.exoticSprntl = 'Exotic';
Traits.NoLegsSessile.group = 'no legs';
Traits.NoLegsTrackedWheeled= new Trait( "No Legs, Tracked or Wheeled", 'D', 'P', -20, false, "B4E145" );
Traits.NoLegsTrackedWheeled.exoticSprntl = 'Exotic';
Traits.NoLegsTrackedWheeled.group = 'no legs';
Traits.NoManipulators      = new Trait( "No Manipulators", 'D', 'P', -50, false, "B4E145" );
Traits.NoManipulators.exoticSprntl = 'Exotic';
Traits.NoManipulators.group = 'manipulators';
Traits.NoSenseofHumor      = new Trait( "No Sense of Humor", 'D', 'M', -10, false, "B4E146" );
// No Sense of Taste/Smell defined as a clone of Anosmia (above)
Traits.Nocturnal           = new Trait( "Nocturnal", 'D', 'M', -20, false, "B4E146" );
Traits.Nocturnal.exoticSprntl = 'Exotic';
Traits.Nocturnal.mods = 'Nocturnal';
Traits.Noisy               = new Trait( "Noisy", 'D', 'P', -2, true, "B4E146" );
Traits.NonIconographic     = new Trait( "Non-Iconographic", 'D', 'M', -10, false, "B4E146" );
Traits.Numb                = new Trait( "Numb", 'D', 'P', -20, false, "B4E146" );

Traits.Obesity           = new Trait( 'Obesity', 'D', 'P', -2, true, "B4E19" );
Traits.Obesity.fixedCost = 1;
Traits.Obesity.lowestLevel = 1;
Traits.Obesity.levelNames = ['Overweight','Fat','Very Fat'];
Traits.Obesity.highestLevel = 3;
Traits.Obesity.group = 'build';
Traits.Oblivious           = new Trait( "Oblivious", 'D', 'M', -5, false, "B4E146" );
Traits.Oblivious.group = 'empathy';
Traits.Obscure             = new Trait( "Obscure", 'A', 'P', 2, true, "B4E72" );
Traits.Obscure.exoticSprntl = 'Exotic';
Traits.Obscure.mods = "Obscure";
Traits.Obsession           = new Trait( "Obsession", 'D', 'M', -5, true, "B4E146" );
Traits.Obsession.mods = "Self-Control";
Traits.Obsession.description = [];
Traits.Obsession.levelNames = ['short-term','long-term'];
Traits.OdiousPersonalHabit = new Trait( "Odious Personal Habit", 'D', 'So', -5, true, "B4E22" );
Traits.OdiousPersonalHabit.highestLevel = 3;
Traits.OdiousPersonalHabit.multiple = true;
Traits.OntheEdge           = new Trait( "On the Edge", 'D', 'M', -15, false, "B4E146" );
Traits.OntheEdge.mods = "Self-Control";
Traits.OneArm              = new Trait( "One Arm", 'D', 'P', -20, false, "B4E147" );
Traits.OneEye              = new Trait( "One Eye", 'D', 'P', -15, false, "B4E147" );
Traits.OneEye.group = 'monocular';
Traits.OneHand             = new Trait( "One Hand", 'D', 'P', -15, false, "B4E147" );
Traits.Oracle              = new Trait( "Oracle", 'A', 'M', 15, false, "B4E72" );
Traits.Oracle.exoticSprntl = 'Supernatural';
Traits.OutdoorsmanTalent   = new Trait( "Outdoorsman Talent", 'A', 'M', 10, true, "B4E89-90" );
Traits.OutdoorsmanTalent.highestLevel = 4;
Traits.Overconfidence      = new Trait( "Overconfidence", 'D', 'M', -5, false, "B4E148" );
Traits.Overconfidence.mods = "Self-Control";
Traits.Overweight          = new Trait( 'Overweight', 'D', 'P', -1, false, "B4E19" );
Traits.Overweight.group = 'build';

Traits.Pacifism            = new Trait( "Pacifism", 'D', 'M', 0, false, "B4E148" );
Traits.Pacifism.mods = 'Pacifism';
Traits.Paranoia            = new Trait( "Paranoia", 'D', 'M', -10, false, "B4E148" );
Traits.ParabolicHearing    = new Trait( "Parabolic Hearing", 'A', 'P', 4, true, "B4E72" );
Traits.ParabolicHearing.exoticSprntl = 'Exotic';
Traits.ParabolicHearing.levelsName = 'range ×2';
Traits.Patron              = new Trait( "Patron", 'A', 'So', 5, true, "B4E72" );
Traits.Patron.multiple = true;
Traits.Patron.fixedCost = 5;
Traits.Patron.lowestLevel = 1;
Traits.Patron.highestLevel = 5;
Traits.Patron.levelsName = 'power level';
Traits.Patron.levelNames = ["person ≥150% pts, or 1000×SW org","person ≥200% pts, or 10000×SW org","person unlim pts, or 100000×SW org","1000000×SW org","Gov't, multinat, or god"];
Traits.Patron.mods = "Patron, Frequency of Appearance, Favor";
Traits.Payload             = new Trait( "Payload", 'A', 'P', 1, true, "B4E74" );
Traits.Payload.exoticSprntl = 'Exotic';
Traits.Payload.levelsName = '10×BL';
Traits.Payload.multiple = true;
Traits.Payload.mods = "Payload";
Traits.PenetratingVision    = new Trait( "Penetrating Vision", 'A', 'P', 10, true, "B4E74" );
Traits.PenetratingVision.exoticSprntl = 'Exotic';
Traits.PenetratingVision.levelsName = '6&Prime;×';
Traits.PenetratingVision.mods = 'Penetrating Vision';
Traits.PenetratingVoice    = new Trait( "Penetrating Voice", 'P', 'P', 1, false, "B4E101" );
Traits.PerfectBalance      = new Trait( "Perfect Balance", 'A', 'P', 15, false, "B4E74" );
Traits.PeripheralVision    = new Trait( "Peripheral Vision", 'A', 'P', 15, false, "B4E74" );
Traits.PeripheralVision.mods = "PeripheralVision";
Traits.Permeation          = new Trait( "Permeation", 'A', 'P', 0, false, "B4E75" );
Traits.Permeation.exoticSprntl = 'Exotic';
Traits.Permeation.mods = "Permeation, Carry Objects";
Traits.PhantomVoices              = new Trait( "Phantom Voices", 'D', 'M', -5, true, "B4E148" );
Traits.PhantomVoices.levelNames = ['annoying','disturbing','diabolical'];
Traits.Phobia              = new Trait( "Phobia", 'D', 'M', 0, false, "B4E148" );
Traits.Phobia.instructions = 'choose a phobia below, or define one by adding a modifier below';
Traits.Phobia.multiple = true;
Traits.Phobia.mods = 'Self-Control, Phobias';
Traits.PhotographicMemory  = new Trait( "Photographic Memory", 'A', 'M', 10, false, "B4E51" );    // shouldn't this be a clone of Eidetic?
Traits.PhotographicMemory.group = 'memory';
Traits.Pitiable            = new Trait( "Pitiable", 'A', 'So', 5, false, "B4E22" );
Traits.PlantEmpathy        = new Trait( "Plant Empathy", 'A', 'M', 5, false, "B4E75" );
Traits.Possession          = new Trait( "Possession", 'A', 'M', 100, false, "B4E75" );
Traits.Possession.exoticSprntl = 'Exotic';
Traits.Possession.mods = "Possession";
Traits.PostCombatShakes    = new Trait( "Post-Combat Shakes", 'D', 'M', -5, false, "B4E150" );
Traits.PostCombatShakes.mods = "Self-Control";
Traits.PowerInvestiture    = new Trait( "Power Investiture", 'A', 'M', 10, true, "B4E76" );
Traits.PowerInvestiture.exoticSprntl = 'Supernatural';
Traits.Precognition        = new Trait( "Precognition", 'A', 'M', 25, false, "B4E76" );
Traits.Precognition.exoticSprntl = 'Supernatural';
Traits.Precognition.mods = "ESP, Precognition";
Traits.Precognition.group = 'precog';
Traits.PressureSupport     = new Trait( "Pressure Support", 'A', 'P', 5, true, "B4E76" );
Traits.PressureSupport.exoticSprntl = 'Exotic';
Traits.PressureSupport.lowestLevel  = 1;
Traits.PressureSupport.highestLevel = 3;
// Traits.PressureSupport.mods = "Sups Enhancements, Sups Limitations";
Traits.ProtectedSense      = new Trait( "Protected Sense", 'A', 'P', 5, false, "B4E78" );
Traits.ProtectedSense.exoticSprntl = 'Exotic';
Traits.ProtectedSense.multiple = true;
Traits.ProtectedSense.description = [];
Traits.ProtectedSense.instructions = "vision, hearing, Detect, <i>etc</i>.";
Traits.PsiStatic           = new Trait( "Psi Static", 'A', 'M', 30, false, "B4E78" );
Traits.PsiStatic.exoticSprntl = 'Supernatural';
Traits.PsiStatic.mods = "PsiStatic";
Traits.Psychometry         = new Trait( "Psychometry", 'A', 'M', 20, false, "B4E78" );
Traits.Psychometry.exoticSprntl = 'Supernatural';
Traits.Psychometry.mods = "ESP";
Traits.PsychicHealingTalent= new Trait( "Psychic Healing Talent", 'A', 'M', 5, true, "B4E256" );
Traits.PsychicHealingTalent.exoticSprntl = 'Exotic';
Traits.PKTalent            = new Trait( "Psychokinesis Talent", 'A', 'M', 5, true, "B4E256" );
Traits.PKTalent.exoticSprntl = 'Exotic';
Traits.Puppet              = new Trait( "Puppet", 'A', 'M', 5, false, "B4E78" );
Traits.Puppet.exoticSprntl = 'Supernatural';
Traits.PuppetGroup         = new Trait( "Puppet Group", 'A', 'M', 10, false, "B4E78" );
Traits.PuppetGroup.exoticSprntl = 'Supernatural';
Traits.Pyromania           = new Trait( "Pyromania", 'D', 'M', -5, false, "B4E150" );
Traits.Pyromania.mods = "Self-Control";

Traits.Quadriplegic        = new Trait( "Quadriplegic", 'D', 'P', -80, false, "B4E150" );

Traits.RacialMemoryPassive = new Trait( "Racial Memory, passive", 'A', 'M', 15, false, "B4E78");
Traits.RacialMemoryPassive.exoticSprntl = 'Supernatural';
Traits.RacialMemoryActive = new Trait( "Racial Memory, active", 'A', 'M', 40, false, "B4E78" );
Traits.RacialMemoryActive.exoticSprntl = 'Supernatural';
Traits.RadiationTolerance  = new Trait( "Radiation Tolerance", 'A', 'M', 5, true, "B4E79" );
Traits.RadiationTolerance.exoticSprntl = 'Exotic';
Traits.RadiationTolerance.highestLevel = 9;
Traits.RadiationTolerance.levelNames = [2,5,10,20,50,100,200,500,1000];
Traits.RadiationTolerance.levelsName = 'divisor';
Traits.MilitaryRank        = new Trait( "Rank", 'A', 'So', 5, true, "B4E29" );
Traits.MilitaryRank.highestLevel = 8;
Traits.MilitaryRank.description = [];
Traits.MilitaryRank.takesMultipliers = true;
Traits.MilitaryRank.mods = "Rank-Status, Rank-Wealth";
Traits.RapidHealing        = new Trait( "Rapid Healing", 'A', 'P', 5, false, "B4E79" );
Traits.RapidHealing.group = 'healing';
Traits.VeryRapidHealing    = new Trait( "Very Rapid Healing", 'A', 'P', 15, false, "B4E79" );
Traits.VeryRapidHealing.group = 'healing';
Traits.RapierWit           = new Trait( "Rapier Wit", 'A', 'M', 5, false, "B4E79" );
Traits.Reawakened          = new Trait( "Reawakened", 'A', 'M', 10, false, "B4E80" );
Traits.Reawakened.exoticSprntl = 'Supernatural';
Traits.Recovery            = new Trait( "Recovery", 'A', 'P', 10, false, "B4E80" );
Traits.Recovery.exoticSprntl = 'Exotic';
Traits.ReducedConsumption   = new Trait( "Reduced Consumption", 'A', 'P', 2, true, "B4E80" );
Traits.ReducedConsumption.highestLevel = 4;
Traits.ReducedConsumption.levelNames = ['2 meals/day','1 meal/day','1 meal/week','1 meal/month'];
Traits.ReducedConsumption.mods = "consumption";
Traits.ReducedConsumption.group = "consumption";
Traits.Regeneration        = new Trait( "Regeneration", 'A', 'P', 0, false, "B4E80" );
Traits.Regeneration.exoticSprntl = 'Exotic';
Traits.Regeneration.mods = 'Regeneration';
Traits.Regeneration.group = 'healing';
Traits.Regrowth        = new Trait( "Regrowth", 'A', 'P', 40, false, "B4E80" );
Traits.Regrowth.exoticSprntl = 'Exotic';
Traits.Regrowth.mods = 'Regrowth';
Traits.ReligiousRank       = new Trait( "Religious Rank", 'A', 'So', 5, true, "B4E29" );  // another name for 'Status'
Traits.Reprogrammable      = new Trait( "Reprogrammable", 'D', 'M', -10, false, "B4E150" );
Traits.Reprogrammable.exoticSprntl = 'Exotic';
Traits.Reputation          = new Trait( "Reputation", 'AD', 'So', 5, true, "B4E26" );
Traits.Reputation.multiple = true;
Traits.Reputation.posNegLevels = true;
Traits.Reputation.lowestLevel = -4;
Traits.Reputation.highestLevel = 4;
Traits.Reputation.mods = "Reputation";
Traits.Resistant           = new Trait( "Resistant", 'A', 'P', 0, false, "B4E80" );
Traits.Resistant.multiple = true;
Traits.Resistant.mods = 'Resistant';
Traits.RestrictedDiet      = new Trait( "Restricted Diet", 'D', 'P', -10, true, "B4E151" );
Traits.RestrictedDiet.description = [];
Traits.RestrictedDiet.lowestLevel  = 1;
Traits.RestrictedDiet.highestLevel = 4;
Traits.RestrictedDiet.levelNames = ['very common','common','occasional','rare'];
Traits.RestrictedDiet.mods = 'Restricted Diet';
Traits.RestrictedVision    = new Trait( "Restricted Vision", 'D', 'P', -15, true, "B4E151" );
Traits.RestrictedVision.lowestLevel  = 1;
Traits.RestrictedVision.highestLevel = 2;
Traits.RestrictedVision.levelNames = ['no peripheral vision','tunnel vision'];
Traits.Revulsion           = new Trait( "Revulsion", 'D', 'P', -5, true, "B4E151" );
Traits.Revulsion.exoticSprntl = 'Supernatural';
Traits.Revulsion.lowestLevel  = 1;
Traits.Revulsion.highestLevel = 3;
Traits.Revulsion.levelNames = ['very common','common','occasional'];

Traits.Sadism              = new Trait( "Sadism", 'D', 'M', -15, false, "B4E152" );
Traits.Sadism.mods = "Self-Control";
Traits.SanitizedMetabolism = new Trait( "Sanitized Metabolism", 'P', 'P', 1, false, "B4E101" );
Traits.SanitizedMetabolism.exoticSprntl = 'Exotic';
Traits.ScanningSenseRadar  = new Trait( "Scanning Sense, Radar", 'A', 'P', 20, false, "B4E81" );
Traits.ScanningSenseRadar.mods = 'ScanningSense';
Traits.ScanningSenseRadar.exoticSprntl = 'Exotic';
Traits.ScanningSenseImagingRadar = new Trait( "Scanning Sense, Imaging Radar", 'A', 'P', 20, false, "B4E81" );
Traits.ScanningSenseImagingRadar.mods = 'ScanningSense';
Traits.ScanningSenseImagingRadar.exoticSprntl = 'Exotic';
Traits.ScanningSenseLadar  = new Trait( "Scanning Sense, Ladar", 'A', 'P', 20, false, "B4E81" );
Traits.ScanningSenseLadar.mods = 'ScanningSense';
Traits.ScanningSenseLadar.exoticSprntl = 'Exotic';
Traits.ScanningSenseParaRadar = new Trait( "Scanning Sense, Para-Radar", 'A', 'P', 40, false, "B4E81" );
Traits.ScanningSenseParaRadar.mods = 'ScanningSense';
Traits.ScanningSenseParaRadar.exoticSprntl = 'Exotic';
Traits.ScanningSenseSonar  = new Trait( "Scanning Sense, Sonar", 'A', 'P', 20, false, "B4E81" );
Traits.ScanningSenseSonar.mods = 'ScanningSense';
Traits.ScanningSenseSonar.exoticSprntl = 'Exotic';
Traits.Sealed              = new Trait( "Sealed", 'A', 'P', 15, false, "B4E82" );
Traits.Sealed.exoticSprntl = 'Exotic';
Traits.Secret              = new Trait( "Secret", 'D', 'So', 0, false, "B4E152" );
Traits.Secret.multiple = true;
Traits.Secret.mods = 'Secret';
Traits.SecurityClearance  = new Trait( "Security Clearance", 'A', 'So', 15, false, "B4E82" );
Traits.SecurityClearance.description = [];
Traits.SecurityClearance.instructions = 'granting organization, title, <i>etc</i>.';
Traits.SecurityClearance.multiple = true;
Traits.SecurityClearance.mods = 'Clearance';
Traits.SeeInvisible        = new Trait( "See Invisible", 'A', 'P', 15, false, "B4E83" );
Traits.SeeInvisible.exoticSprntl = 'Exotic';
Traits.SeeInvisible.multiple = true;
Traits.SeeInvisible.description = [];
Traits.SeeInvisible.instructions = 'invisibility type';
Traits.SelfDestruct        = new Trait( "Self-Destruct", 'D', 'P', -10, false, "B4E153" );
Traits.SelfDestruct.exoticSprntl = 'Exotic';
Traits.SelfDestruct.group = "aging";
Traits.Selfish             = new Trait( "Selfish", 'D', 'M', -5, false, "B4E153" );
Traits.Selfish.mods = "Self-Control";
Traits.Selfless            = new Trait( "Selfless", 'D', 'M', -5, false, "B4E153" );
Traits.Selfless.mods = "Self-Control";
Traits.SemiUpright         = new Trait( "Semi-Upright", 'D', 'P', -5, false, "B4E153" );
Traits.SemiUpright.exoticSprntl = 'Exotic';
Traits.SenseOfDuty         = new Trait( "Sense of Duty", 'D', 'M', 0, false, "B4E153" );
Traits.SenseOfDuty.multiple = true;
Traits.SenseOfDuty.mods = 'Duty Group';
Traits.Sensitive           = new Trait( "Sensitive", 'A', 'M', 5, false, "B4E51" );
Traits.SensitiveTouch      = new Trait( "Sensitive Touch", 'A', 'P', 10, false, "B4E83" );
Traits.SensitiveTouch.exoticSprntl = 'Exotic';
Traits.Serendipity         = new Trait( "Serendipity", 'A', 'M', 15, true, "B4E83" );
Traits.Serendipity.levelsName = 'game session coincidence';
// Traits.Serendipity.highestLevel = 2;
Traits.ShadowForm          = new Trait( "Shadow Form", 'A', 'P', 50, false, "B4E83" );
Traits.ShadowForm.exoticSprntl = 'Exotic';
Traits.ShadowForm.mods = 'Carry Objects';
Traits.ShadowFormAlwaysOn  = new Trait( "Shadow Form, always on", 'D', 'P', -20, false, "B4E83" );
Traits.ShadowFormAlwaysOn.exoticSprntl = 'Exotic';
Traits.ShadowFormAlwaysOn.mods = 'Carry Objects';
Traits.ShapeshiftingAlternateForm= new Trait( "Shapeshifting, Alternate Form", 'A', 'P', 15, false, "B4E83" );
Traits.ShapeshiftingAlternateForm.exoticSprntl = 'Exotic';
Traits.ShapeshiftingAlternateForm.multiple = true;
Traits.ShapeshiftingAlternateForm.takesConstantMods = true;
Traits.ShapeshiftingAlternateForm.mods = 'Cosmetic, Alternate Form';
Traits.ShapeshiftingMorph  = new Trait( "Shapeshifting, Morph", 'A', 'P', 100, false, "B4E84" );
Traits.ShapeshiftingMorph.exoticSprntl = 'Exotic';
Traits.ShapeshiftingMorph.takesConstantMods = true;
Traits.ShapeshiftingMorph.mods = 'Cosmetic, Morph';
Traits.ShortAttentionSpan   = new Trait( "Short Attention Span", 'D', 'M', -10, false, "B4E153" );
Traits.ShortAttentionSpan.mods = "Self-Control";
Traits.ShortLifespan       = new Trait( "Short Lifespan", 'D', 'M', -10, true, "B4E154" );
Traits.ShortLifespan.exoticSprntl = 'Exotic';
Traits.ShortLifespan.group = "lifespan";
Traits.ShortLifespan.highestLevel = 4;
//Traits.ShortLifespan.levelsName = '½ × lifespan';
Traits.ShortLifespan.levelsName = 'lifespan&divide;2';
Traits.Shrinking           = new Trait( "Shrinking", 'A', 'P', 5, true, "B4E85" );
Traits.Shrinking.exoticSprntl = 'Exotic';
Traits.Shrinking.levelsName = 'Size Modifier';
Traits.Shrinking.mods = 'Carry Objects, Shrinking';
Traits.Shtick              = new Trait( "Shtick", 'P', 'MP', 1, false, "B4E101" );
Traits.Shtick.description = [];
Traits.Shyness             = new Trait( "Shyness", 'D', 'M', -5, true, "B4E154" );
// Traits.Shyness.mods = 'Shyness';
Traits.Shyness.levelNames = ['mild','severe','','crippling'];
Traits.SignatureGear       = new Trait( "Signature Gear", 'A', 'So', 'varies', false, "B4E85" );
Traits.SignatureGear.instructions = 'point value is 1/(50% SW) or as an Ally (for androids, custom vehicles, <i>etc</i>.)';
Traits.Silence             = new Trait( "Silence", 'A', 'P', 5, true, "B4E85" );
Traits.Silence.exoticSprntl = 'Exotic';
Traits.SingleMinded        = new Trait( "Single-Minded", 'A', 'M', 5, false, "B4E85" );
Traits.SizeModifier        = new Trait( "Size Modifier", 'AD', 'P', 0, true, "B4E19" );
Traits.SizeModifier.posNegLevels = true;
Traits.SizeModifier.lowestLevel = -10;
Traits.SizeModifier.highestLevel = 10;
Traits.Skinny              = new Trait( 'Skinny', 'D', 'P', -5, false, "B4E18" );
Traits.Skinny.group = 'build';
Traits.SlaveMentality      = new Trait( 'Slave Mentality', 'D', 'M', -40, false, "B4E154" );
Traits.Sleepwalker         = new Trait( 'Sleepwalker', 'D', 'M', -5, false, "B4E154" );
Traits.Sleepwalker.mods = "Self-Control";
Traits.Sleepy              = new Trait( "Sleepy", 'D', 'P', 0, false, "B4E154" );
Traits.Sleepy.instructions = "use this as a Racial disadvantage only";
Traits.Sleepy.exoticSprntl = 'Exotic';
Traits.Sleepy.mods = "Sleepy";
// Traits.Sleepy1_2Time       = new Trait( "Sleepy (1/2 of the time)", 'P', -8, false, "B4E154 (this is a racial trait)" );
// Traits.Sleepy1_2Time.exoticSprntl = 'Exotic';
// Traits.Sleepy2_3Time       = new Trait( "Sleepy (2/3 of the time)", 'P', -16 );
// Traits.Sleepy2_3Time.exoticSprntl = 'Exotic';
// Traits.Sleepy3_4Time       = new Trait( "Sleepy (3/4 of the time)", 'P', -20 );
// Traits.Sleepy3_4Time.exoticSprntl = 'Exotic';
// Traits.Sleepy7_8Time       = new Trait( "Sleepy (7/8 of the time)", 'P', -26 );
// Traits.Sleepy7_8Time.exoticSprntl = 'Exotic';
Traits.Slippery            = new Trait( "Slippery", 'A', 'P', 2, true, "B4E85" );
Traits.Slippery.exoticSprntl = 'Exotic';
Traits.Slippery.highestLevel = 5;
Traits.SlowEater           = new Trait( "Slow Eater", 'D', 'P', -10, false, "B4E155" );
Traits.SlowEater.exoticSprntl = 'Exotic';
Traits.SlowHealing         = new Trait( "Slow Healing", 'D', 'P', -5, true, "B4E155" );
Traits.SlowHealing.highestLevel = 3;
Traits.SlowHealing.group = 'healing';
Traits.SlowHealing.levelsName = 'double HT roll interval ×';
Traits.SlowHealing.exoticSprntl = 'Exotic';
Traits.SlowRiser           = new Trait( "Slow Riser", 'D', 'P', -5, false, "B4E155" );
Traits.SmoothOperatorTalent= new Trait( "Smooth Operator Talent", 'A', 'M', 15, true, "B4E89-90" );
Traits.SmoothOperatorTalent.highestLevel = 4;
Traits.Snatcher            = new Trait( "Snatcher", 'A', 'M', 80, false, "B4E86" );
Traits.Snatcher.exoticSprntl = 'Supernatural';
Traits.Snatcher.takesConstantMods = true;
Traits.Snatcher.mods = "Snatcher";
Traits.SocialChameleon     = new Trait( "Social Chameleon", 'A', 'M', 5, false, "B4E86" );
Traits.SocialChameleon.cinematic = true;
Traits.SocialDisease       = new Trait( "Social Disease", 'D', 'P', -5, false, "B4E155" );
Traits.SocialRegard        = new Trait( "Social Regard", 'A', 'So', 5, true, "B4E86" );
Traits.SocialRegard.highestLevel = 4;
Traits.SocialRegard.levelsName = 'Rxn +';
Traits.SocialStigma        = new Trait( "Social Stigma", 'D', 'So', 5, true, "B4E155" );
Traits.SocialStigma.multiple = true;
Traits.SocialStigma.highestLevel = -1;
Traits.SocialStigma.posNegLevels = true;
Traits.SocialStigma.levelsName = 'Rxn';
Traits.SocialStigma.levelsNameNonPlural = true;
Traits.SpaceSickness       = new Trait( "Space Sickness", 'D', 'P', -10, false, "B4E156" );
Traits.SpeakUnderwater     = new Trait( "Speak Underwater", 'A', 'P', 5, false, "B4E87" );
Traits.SpeakUnderwater.exoticSprntl = 'Exotic';
Traits.SpeakUnderwater.mods = "SpeakUnderwater";
Traits.SpeakWithAnimals    = new Trait( "Speak With Animals", 'A', 'M', 25, false, "B4E87" );
Traits.SpeakWithAnimals.exoticSprntl = 'Exotic';
Traits.SpeakWithAnimals.mods = "SpeakwithAnimals";
Traits.SpeakWithPlants     = new Trait( "Speak With Plants", 'A', 'M', 15, false, "B4E87" );
Traits.SpeakWithPlants.exoticSprntl = 'Exotic';
Traits.SpecialRapport      = new Trait( "Special Rapport", 'A', 'M', 5, false, "B4E88" );
Traits.SpecialRapport.exoticSprntl = 'Supernatural';
Traits.SpecialRapport.multiple = true;
Traits.SpinesShort         = new Trait( "Spines, short", 'A', 'P', 1, false, "B4E88" );
Traits.SpinesShort.exoticSprntl = 'Exotic';
Traits.SpinesLong          = new Trait( "Spines, long", 'A', 'P', 3, false, "B4E88" );
Traits.SpinesLong.exoticSprntl = 'Exotic';
Traits.SpiritEmpathy       = new Trait( "Spirit Empathy", 'A', 'M', 10, false, "B4E88" );
Traits.SpiritEmpathy.exoticSprntl = 'Supernatural';
Traits.SpiritEmpathy.mods = "SpiritEmpathy";
Traits.SplitPersonality    = new Trait( "Split Personality", 'D', 'M', -15, false, "B4E156" );
Traits.SplitPersonality.mods = "Self-Control";
Traits.Squeamish           = new Trait( "Squeamish", 'D', 'M', -10, false, "B4E156" );
Traits.Squeamish.mods = "Self-Control";
Traits.Status              = new Trait( "Status", 'AD', 'So', 5, true, "B4E28" );
Traits.Status.multiple = true;
Traits.Status.posNegLevels = true;
Traits.Status.lowestLevel  = -4;
Traits.Status.highestLevel = 8;
Traits.Stretching          = new Trait( "Stretching", 'A', 'P', 6, true, "B4E88" );
Traits.Stretching.exoticSprntl = 'Exotic';
Traits.Stretching.levelsName = 'Size Modifier +';
Traits.StressAtavism       = new Trait( "Stress Atavism", 'D', 'M', -5, true, "B4E156" );
Traits.StressAtavism.exoticSprntl = 'Exotic';
Traits.StressAtavism.fixedCost = -5;
Traits.StressAtavism.levelNames = ['Mild','Moderate','Severe'];
Traits.StressAtavism.mods = "Self-Control";
Traits.StrikerCrushing     = new Trait( "Striker, crushing", 'A', 'P', 5, false, "B4E88" );
Traits.StrikerCrushing.description = [];
Traits.StrikerCrushing.multiple = true;
Traits.StrikerCrushing.exoticSprntl = 'Exotic';
Traits.StrikerCrushing.mods = "Strikers";
Traits.StrikerPiercing     = new Trait( "Striker, piercing", 'A', 'P', 5, false, "B4E88" );
Traits.StrikerPiercing.multiple = true;
Traits.StrikerPiercing.exoticSprntl = 'Exotic';
Traits.StrikerPiercing.mods = "Strikers";
Traits.StrikerLgPiercing   = new Trait( "Striker, large piercing", 'A', 'P', 6, false, "B4E88" );
Traits.StrikerLgPiercing.multiple = true;
Traits.StrikerLgPiercing.exoticSprntl = 'Exotic';
Traits.StrikerLgPiercing.mods = "Strikers";
Traits.StrikerCutting      = new Trait( "Striker, cutting", 'A', 'P', 7, false, "B4E88" );
Traits.StrikerCutting.multiple = true;
Traits.StrikerCutting.exoticSprntl = 'Exotic';
Traits.StrikerCutting.mods = "Strikers";
Traits.StrikerImpaling     = new Trait( "Striker, impaling", 'A', 'P', 8, false, "B4E88" );
Traits.StrikerImpaling.multiple = true;
Traits.StrikerImpaling.exoticSprntl = 'Exotic';
Traits.StrikerImpaling.mods = "Strikers";
// Traits.Striker             = new Trait( "Striker", 'P', 1, true, "B4E88" );
// Traits.Striker.exoticSprntl = 'Exotic';
// Traits.Striker.fixedCost = 4;
// Traits.Striker.highestLevel = 4;
// Traits.Striker.levelNames = ['crushing|piercing','lg piercing','cutting','impaling'];
// Traits.Striker.multiple = true;
// Traits.Striker.mods = "Strikers";
Traits.StrikingST          = new Trait( "Striking ST", 'A', 'P', 5, true, "B4E88" );
Traits.StrikingST.exoticSprntl = 'Exotic';
Traits.StrikingST.levelsName = 'ST +';
Traits.StrongWill          = new Trait( "Strong Will", 'A', 'M', 5, true, "B4E16" );
Traits.Stubborn            = new Trait( "Stubbornness", 'D', 'M', -5, false, "B4E157" );
Traits.Stuttering          = new Trait( "Stuttering", 'D', 'P', -10, false, "B4E157" );
Traits.SubsonicHearing     = new Trait( "Subsonic Hearing", 'A', 'P', 5, false, "B4E89" );
Traits.SubsonicHearing.exoticSprntl = 'Exotic';
Traits.SubsonicHearing.group = 'subsonic';
Traits.SubsonicHearing.mods = 'subsonic';
Traits.SubsonicSpeech      = new Trait( "Subsonic Speech", 'A', 'P', 10, false, "B4E89" );
Traits.SubsonicSpeech.exoticSprntl = 'Exotic';
Traits.SubsonicSpeech.group = 'subsonic';
Traits.SubsonicSpeech.mods = 'subsonic';
Traits.SuperClimbing       = new Trait( "Super Climbing", 'A', 'P', 3, true, "B4E89" );
Traits.SuperClimbing.exoticSprntl = 'Exotic';
Traits.SuperJump           = new Trait( "Super Jump", 'A', 'P', 10, true, "B4E89" );
Traits.SuperJump.exoticSprntl = 'Exotic';
Traits.SuperLuck           = new Trait( "Super Luck", 'A', 'M', 100, false, "B4E89" );
Traits.SuperLuck.exoticSprntl = 'Supernatural';
Traits.SupernaturalDurability= new Trait( "Supernatural Durability", 'A', 'P', 150, false, "B4E89" );
Traits.SupernaturalDurability.exoticSprntl = 'Supernatural';
Traits.SupernaturalDurability.description = [];
Traits.SupernaturalDurability.instructions = 'specify vulnerability';
Traits.SupernaturalDurability.group = 'durable';
Traits.SupernaturalFeature = new Trait( "Supernatural Feature", 'D', 'P', -5, true, "B4E157" );
Traits.SupernaturalFeature.description = [];
Traits.SupernaturalFeature.instructions = "generally -1 reaction, +1 to deduce your secret, per level";
Traits.SupernaturalFeature.lowestLevel  = 1;
Traits.SupernaturalFeature.highestLevel = 2;
Traits.SupernaturalFeature.multiple = true;
Traits.SupernaturalFeature.levelNames = ['inconspicuous','conspicuous'];
Traits.SupernaturalFeature.exoticSprntl = 'Supernatural';
Traits.Supersensitive      = new Trait( "Supersensitive", 'D', 'M', -15, false, "B4E158" );
Traits.Supersensitive.exoticSprntl = 'Supernatural';
Traits.SusceptibleVeryCommon= new Trait( "Susceptible, very common substance", 'D', 'P', -4, true, "B4E158" );
Traits.SusceptibleVeryCommon.multiple = true;
Traits.SusceptibleVeryCommon.highestLevel = 5;
Traits.SusceptibleCommon    = new Trait( "Susceptible, common substance",      'D', 'P', -2, true, "B4E158" );
Traits.SusceptibleCommon.multiple = true;
Traits.SusceptibleCommon.highestLevel = 5;
Traits.SusceptibleOccasional= new Trait( "Susceptible, occasional substance",  'D', 'P', -1, true, "B4E158" );
Traits.SusceptibleOccasional.multiple = true;
Traits.SusceptibleOccasional.highestLevel = 5;

Traits.TechLevel           = new Trait( "Tech Level Difference", 'AD', 'M', 5, true, "B4E22-23" );
Traits.TechLevel.posNegLevels = true;
Traits.TechLevel.lowestLevel = -3;
Traits.TechLevel.highestLevel = 3;
Traits.TechLevel.levelsName = 'TL';
// Traits.TechLevelLow        = new Trait( "Low Tech Level", 'M', -5, true );
// Traits.TechLevelLow.group = "TechLevel";
// Traits.TechLevelHigh       = new Trait( "High Tech Level", 'M', 5, true );
// Traits.TechLevelHigh.group = "TechLevel";
Traits.TeethSharp          = new Trait( "Teeth, Sharp", 'A', 'P', 1, false, "B4E91" );
Traits.TeethSharp.exoticSprntl = 'Exotic';
Traits.Fangs               = new Trait( "Fangs", 'A', 'P', 2, false, "B4E91" );
Traits.Fangs.exoticSprntl = 'Exotic';
Traits.TelecommunicationIR = new Trait( "Telecommunication, Infrared", 'A', 'MP', 10, false, "B4E91" );
Traits.TelecommunicationIR.mods = 'Telecommunication, TP';
Traits.TelecommunicationIR.exoticSprntl = 'Exotic';
Traits.TelecommunicationLaser = new Trait( "Telecommunication, Laser", 'A', 'MP', 15, false, "B4E91" );
Traits.TelecommunicationLaser.mods = 'Telecommunication, TP';
Traits.TelecommunicationLaser.exoticSprntl = 'Exotic';
Traits.TelecommunicationRadio = new Trait( "Telecommunication, Radio", 'A', 'MP', 10, false, "B4E91" );
Traits.TelecommunicationRadio.mods = 'Radio, Telecommunication, TP';
Traits.TelecommunicationRadio.exoticSprntl = 'Exotic';
Traits.TelecommunicationTelesend = new Trait( "Telecommunication, Telesend", 'A', 'MP', 30, false, "B4E91" );
Traits.TelecommunicationTelesend.mods = 'Telesend, Telecommunication, TP';
Traits.Telekinesis         = new Trait( "Telekinesis", 'A', 'MP', 5, true, "B4E92" );
Traits.Telekinesis.description = [];
Traits.Telekinesis.instructions = 'specify mechanism, PK, magnetism, tractor beam, <i>etc</i>.';
Traits.Telekinesis.exoticSprntl = 'Exotic';
Traits.Telekinesis.mods = 'Magnetic, PK';
Traits.TelepathyTalent     = new Trait( "Telepathy Talent", 'A', 'M', 5, true, "B4E257" );
Traits.TelepathyTalent.exoticSprntl = 'Exotic';
Traits.TeleportationTalent = new Trait( "Teleportation Talent", 'A', 'M', 5, true, "B4E257" );
Traits.TeleportationTalent.exoticSprntl = 'Exotic';
Traits.TelescopicVision    = new Trait( "Telescopic Vision", 'A', 'P', 5, true, "B4E92" );
Traits.TelescopicVision.exoticSprntl = 'Exotic';
Traits.TelescopicVision.mods = "TeleViz";
Traits.TemperatureControl  = new Trait( "Temperature Control", 'A', 'MP', 5, true, "B4E92" );
Traits.TemperatureControl.exoticSprntl = 'Exotic';
Traits.TemperatureControl.mods = "Temperature,PK";
Traits.TemperatureTolerance= new Trait( "Temperature Tolerance", 'A', 'P', 1, true, "B4E93" );
Traits.TemperatureTolerance.levelsName = '+HT&deg;';
Traits.TemporalInertia     = new Trait( "Temporal Inertia", 'A', 'M', 15, false, "B4E93" );
Traits.TemporalInertia.exoticSprntl = 'Supernatural';
Traits.Tenure              = new Trait( "Tenure", 'A', 'So', 5, false, "B4E93" );
Traits.TerrainAdaptation   = new Trait( "Terrain Adaptation", 'A', 'P', 5, false, "B4E93" );
Traits.TerrainAdaptation.description = [];
Traits.TerrainAdaptation.instructions = 'specify terrain type (ice, sand, snow, <i>etc</i>.)';
Traits.TerrainAdaptation.multiple = true;
Traits.TerrainAdaptation.exoticSprntl = 'Exotic';
Traits.TerrainAdaptation.mods = "terrain";
Traits.TerminallyIll       = new Trait( "Terminally Ill", 'D', 'P', -25, true, "B4E158" );
Traits.TerminallyIll.group = "aging";
Traits.TerminallyIll.fixedCost = -25;
Traits.TerminallyIll.lowestLevel = 1;
Traits.TerminallyIll.levelsName = 'remaining time';
Traits.TerminallyIll.levelNames = ['≤2 years','≤1 year','≤1 month'];
Traits.Terror              = new Trait( "Terror", 'A', 'M', 10, true, "B4E93" );
Traits.Terror.fixedCost = 30;
Traits.Terror.exoticSprntl = 'Supernatural';
Traits.Terror.description = [];
Traits.Terror.instructions = 'howl, stare, <i>etc</i>. (must clearly indicate vision- vs hearing-based)';
Traits.Terror.levelsName = 'Fright Check -1';
Traits.Terror.mods = 'AlwaysOn';
Traits.Timesickness        = new Trait( "Timesickness", 'D', 'P', -10, false, "B4E158" );
Traits.Timesickness.mods = 'Timesickness';
Traits.TotalKlutz          = new Trait( "Total Klutz", 'D', 'P', -15, false, "B4E141" );
Traits.Trademark           = new Trait( "Trademark", 'D', 'M', -5, true, "B4E159" );
Traits.Trademark.description = [];
Traits.Trademark.levelNames = ['Simple','Complex','Elaborate'];
Traits.TrainedbyaMaster    = new Trait( "Trained by a Master", 'A', 'M', 30, false, "B4E93" );
Traits.TrainedbyaMaster.cinematic = true;
Traits.Trickster           = new Trait( "Trickster", 'D', 'M', -15, false, "B4E159" );
Traits.Trickster.mods = "Self-Control";
Traits.Truthfulness        = new Trait( "Truthfulness", 'D', 'M', -5, false, "B4E159" );
Traits.Truthfulness.mods = "Self-Control";
Traits.TrueFaith           = new Trait( "True Faith", 'A', 'M', 15, false, "B4E94" );
Traits.TrueFaith.exoticSprntl = 'Supernatural';
Traits.Tunneling           = new Trait( "Tunneling", 'A', 'P', 5, true, "B4E94" );
Traits.Tunneling.fixedCost = 30;
Traits.Tunneling.exoticSprntl = 'Exotic';
Traits.Tunneling.levelsName = 'Tunneling Move point';

Traits.Ultrahearing        = new Trait( "Ultrahearing", 'A', 'P', 5, false, "B4E94" );
Traits.Ultrahearing.exoticSprntl = 'Exotic';
Traits.Ultrahearing.group = 'ultrasonic';
Traits.Ultrahearing.mods = 'HFOnly';
Traits.UltrasonicSpeech    = new Trait( "Ultrasonic Speech", 'A', 'P', 10, false, "B4E94" );
Traits.UltrasonicSpeech.exoticSprntl = 'Exotic';
Traits.UltrasonicSpeech.group = 'ultrasonic';
Traits.UltrasonicSpeech.mods = "HFOnly";
Traits.Ultravision         = new Trait( "Ultravision", 'A', 'P', 10, false, "B4E94" );
Traits.Ultravision.exoticSprntl = 'Exotic';
Traits.Ultravision.mods = 'HFOnly';
Traits.Unaging             = new Trait( "Unaging", 'A', 'P', 15, false, "B4E95" );
Traits.Unaging.exoticSprntl = 'Exotic';
Traits.Unaging.group = "aging, lifespan";
Traits.Unaging.mods = "Unaging";
Traits.UncontrollableAppetite= new Trait( "Uncontrollable Appetite", 'D', 'M', -15, false, "B4E159" );
Traits.UncontrollableAppetite.exoticSprntl = 'Supernatural';
Traits.UncontrollableAppetite.multiple = true;
Traits.UncontrollableAppetite.mods = "Self-Control";
Traits.Unfazeable          = new Trait( "Unfazeable", 'A', 'M', 15, false, "B4E95" );
Traits.Unhealing           = new Trait( "Unhealing", 'D', 'P', -10, true, "B4E160" );
Traits.Unhealing.exoticSprntl = 'Exotic';
Traits.Unhealing.fixedCost = -10;
Traits.Unhealing.lowestLevel = 1;
Traits.Unhealing.levelNames = ['Partial','Total'];
Traits.Unhealing.group = 'healing';
Traits.Unique              = new Trait( "Unique", 'D', 'M', -5, false, "B4E160" );
Traits.Unique.exoticSprntl = 'Supernatural';
Traits.UniversalDigestion  = new Trait( "Universal Digestion", 'A', 'P', 5, false, "B4E95" );
Traits.UniversalDigestion.exoticSprntl = 'Exotic';
Traits.Unkillable          = new Trait( "Unkillable", 'A', 'P', 50, true, "B4E95" );
Traits.Unkillable.exoticSprntl = 'Exotic';
Traits.Unkillable.highestLevel = 3;
Traits.Unkillable.mods = "Unkillable";
Traits.Unluckiness         = new Trait( "Unluckiness", 'D', 'M', -10, false, "B4E160" );
Traits.UnnaturalFeature    = new Trait( "Unnatural Feature", 'D', 'P', -1, true, "B4E22" );
Traits.UnnaturalFeature.description = [];
Traits.UnnaturalFeature.instructions = "describe feature origin (-1 Disguise/Shadowing, +1 identify or follow you, per level)";
Traits.UnnaturalFeature.multiple = true;
Traits.UnnaturalFeature.highestLevel = 5;
Traits.UnusualBackground   = new Trait( "Unusual Background", 'A', 'M', 'varies', false, "B4E96" );
Traits.UnusualBackground.description = [];
Traits.UnusualBackground.requestBasicCost = 10;
Traits.UnusualBiochemistry = new Trait( "Unusual Biochemistry", 'D', 'P', -5, false, "B4E160" );
Traits.UnusualBiochemistry.exoticSprntl = 'Exotic';

Traits.VacuumSupport       = new Trait( "Vacuum Support", 'A', 'P', 5, false, "B4E96" );
Traits.VacuumSupport.exoticSprntl = 'Exotic';
Traits.VampiricBite        = new Trait( "Vampiric Bite", 'A', 'P', 5, true, "B4E96" );
Traits.VampiricBite.fixedCost = 25;
Traits.VampiricBite.lowestLevel = 1;
Traits.VampiricBite.levelsName = 'HT/turn ';
//Traits.VampiricBite.levelNames = [' '];
Traits.VampiricBite.exoticSprntl = 'Exotic';
Traits.Versatile           = new Trait( "Versatile", 'A', 'M', 5, false, "B4E96" );
Traits.VibrationSense      = new Trait( "Vibration Sense", 'A', 'P', 10, false, "B4E96" );
Traits.VibrationSense.exoticSprntl = 'Exotic';
Traits.VibrationSense.description = [];
Traits.VibrationSense.instructions = 'description must include whether ability works in air or water';
Traits.VibrationSense.mods = 'VibSense';
Traits.Visualization       = new Trait( "Visualization", 'A', 'M', 10, false, "B4E96" );
Traits.Visualization.exoticSprntl = 'Supernatural';
Traits.Voice               = new Trait( "Voice", 'A', 'P', 10, false, "B4E97" );
Traits.Voice.group = "voice";
Traits.MinorVow            = new Trait( "Minor Vow", 'D', 'M', -5, false, "B4E161" );
Traits.MinorVow.multiple = true;
Traits.MajorVow            = new Trait( "Major Vow", 'D', 'M', -10, false, "B4E161" );
Traits.MajorVow.multiple = true;
Traits.GreatVow            = new Trait( "Great Vow", 'D', 'M', -15, false, "B4E161" );
Traits.GreatVow.multiple = true;
Traits.Vow                 = new Trait( "Vow", 'D', 'M', -5, true, "B4E160" );
Traits.Vow.levelNames = ['minor','major','great'];
Traits.Vow.cinematic = true;
Traits.Vow.multiple = true;
Traits.Vulnerability       = new Trait( "Vulnerability", 'D', 'P', -5, true, "B4E160" );
Traits.Vulnerability.exoticSprntl = 'Exotic';
Traits.Vulnerability.multiple  = true;
Traits.Vulnerability.lowestLevel  = 1;
Traits.Vulnerability.highestLevel = 4;
Traits.Vulnerability.levelNames = ["rare attack","occasional attack","common attack","very common attack"];
// Traits.Vulnerability.lowestLevel  = 1;
// Traits.Vulnerability.highestLevel = 3;
// Traits.Vulnerability.levelsName = "damage multiplier";
// Traits.Vulnerability.levelNames = ["×2","×3","×4"];
Traits.Vulnerability.mods = "Vulnerability, Fatigue Only";

Traits.WalkonAir           = new Trait( "Walk on Air", 'A', 'P', 20, false, "B4E97" );
Traits.WalkonAir.exoticSprntl = 'Exotic';
Traits.WalkonLiquid        = new Trait( "Walk on Liquid", 'A', 'P', 15, false, "B4E97" );
Traits.WalkonLiquid.exoticSprntl = 'Exotic';
Traits.Warp                = new Trait( "Warp", 'A', 'M', 100, false, "B4E97" );
Traits.Warp.exoticSprntl = 'Supernatural';
Traits.Warp.mods = "Warp, Carrying Capacity, Warp Jump, Psi Teleport";
Traits.WeakBite            = new Trait( "Weak Bite", 'D', 'P', -2, false, "B4E161" );
Traits.WeakBite.exoticSprntl = 'Exotic';
Traits.WeakWill            = new Trait( "Weak Will", 'D', 'M', -5, true, "B4E16" );
Traits.Weakness            = new Trait( "Weakness", 'D', 'P', 0, false, "B4E161" );
Traits.Weakness.exoticSprntl = 'Exotic';
Traits.Weakness.multiple = true;
Traits.Weakness.mods = "Rarity, Damage Rate, Fatigue Only, Variable";
Traits.WeaponMaster = new Trait( "Weapon Master", 'A', 'M', 5, true, "B4E99" );
Traits.WeaponMaster.fixedCost = 15;
Traits.WeaponMaster.description = [];
Traits.WeaponMaster.cinematic = true;
Traits.WeaponMaster.lowestLevel = 1;
Traits.WeaponMaster.levelNames = ['1 weapon','2 weapons','small class of weapons',
    'medium class of weapons','large class of weapons','all weapons'];
Traits.WeirdnessMagnet     = new Trait( "Weirdness Magnet", 'D', 'M', -15, false, "B4E161" );
Traits.WeirdnessMagnet.exoticSprntl = 'Supernatural';
Traits.WildTalent          = new Trait( "Wild Talent", 'A', 'M', 20, true, "B4E99" );
Traits.WildTalent.exoticSprntl = 'Supernatural';
Traits.WildTalent.levelsName = 'each game session use';
Traits.WildTalent.mods = 'Wild Talent, Emergencies';
Traits.Workaholic          = new Trait( "Workaholic", 'D', 'M', -5, false, "B4E162" );
Traits.Wounded             = new Trait( "Wounded", 'D', 'P', -5, false, "B4E162" );

Traits.Xenophilia          = new Trait( "Xenophilia", 'D', 'M', -10, false, "B4E162" );
Traits.Xenophilia.mods = "Self-Control";

Traits.Zeroed              = new Trait( "Zeroed", 'A', 'So', 10, false, "B4E100" );

// physical appearance group (done for 4e)
Traits.Transcendent  = new Trait( "Transcendent", 'A', 'P', 20, false, "B4E21" );
Traits.Transcendent.group = 'appearance';
Traits.Transcendent.description = '+2 rxn; +8 by those attracted to your sex';
Traits.Transcendent.exoticSprntl = 'Supernatural';
Traits.VeryBeautiful = new Trait( "Very Beautiful", 'A', 'P', 16, false, "B4E21" );
Traits.VeryBeautiful.group = 'appearance';
Traits.VeryBeautiful.description = '+2 rxn; +6 by those attracted to your sex';
Traits.VeryHandsome  = new Trait( "Very Handsome", 'A', 'P', 16, false, "B4E21" );
Traits.VeryHandsome.group = 'appearance';
Traits.VeryHandsome.description = '+2 rxn; +6 by those attracted to your sex';
Traits.Beautiful     = new Trait( "Beautiful", 'A', 'P', 12, false, "B4E21" );
Traits.Beautiful.group = 'appearance';
Traits.Beautiful.description = '+2 rxn; +4 by those attracted to your sex';
Traits.Handsome      = new Trait( "Handsome", 'A', 'P', 12, false, "B4E21" );
Traits.Handsome.group = 'appearance';
Traits.Handsome.description = '+2 rxn; +4 by those attracted to your sex';
Traits.Attractive    = new Trait( "Attractive", 'A', 'P', 4, false, "B4E21" );
Traits.Attractive.group = 'appearance';
Traits.Attractive.description = '+1 rxn';
Traits.Unattractive  = new Trait( "Unattractive", 'D', 'P', -4, false, "B4E21" );
Traits.Unattractive.group = 'appearance';
Traits.Unattractive.description = '-1 rxn';
Traits.Ugly          = new Trait( "Ugly", 'D', 'P', -8, false, "B4E21" );
Traits.Ugly.group = 'appearance';
Traits.Ugly.description = '-2 rxn';
Traits.Hideous       = new Trait( "Hideous", 'D', 'P', -16, false, "B4E21" );
Traits.Hideous.group = 'appearance';
Traits.Hideous.description = '-4 rxn';
Traits.Monstrous     = new Trait( "Monstrous", 'D', 'P', -20, false, "B4E21" );
Traits.Monstrous.group = 'appearance';
Traits.Monstrous.description = '-5 rxn';
Traits.Monstrous.exoticSprntl = 'Supernatural';
Traits.Horrific      = new Trait( "Horrific", 'D', 'P', -24, false, "B4E21" );
Traits.Horrific.group = 'appearance';
Traits.Horrific.description = '-6 rxn';
Traits.Horrific.exoticSprntl = 'Supernatural';

// could do this way
Traits.Appearance          = new Trait( "Appearance", 'AD', 'P', 4, true, "B4E21" );
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

// Wealth group
// Traits.Wealth              = new Trait( "Wealth", 'So', 10, true );
// Traits.Wealth.description = [];
// Traits.Wealth.posNegLevels = true;
// Traits.Wealth.lowestLevel = -3;
// Traits.Wealth.highestLevel = 4;
Traits.PovertyDeadBrokex0   = new Trait( "Poverty, Dead Broke", 'D', 'So', -25, false, "B4E25" );
Traits.PovertyDeadBrokex0.buttonLabel = 'Dead Broke';
Traits.PovertyDeadBrokex0.group = 'wealth';
Traits.PovertyDeadBrokex0.description = 'clothes only';
Traits.PovertyPoorx15       = new Trait( "Poverty, Poor", 'D', 'So', -15, false, "B4E25" );
Traits.PovertyPoorx15.buttonLabel = 'Poor';
Traits.PovertyPoorx15.group = 'wealth';
Traits.PovertyPoorx15.description = '⅕ starting wealth';
Traits.PovertyStrugglingx12 = new Trait( "Poverty, Struggling", 'D', 'So', -10, false, "B4E25" );
Traits.PovertyStrugglingx12.buttonLabel = 'Struggling';
Traits.PovertyStrugglingx12.group = 'wealth';
Traits.PovertyStrugglingx12.description = '½ starting wealth';
Traits.WealthComfortablex2 = new Trait( "Wealth, Comfortable", 'A', 'So', 10, false, "B4E25" );
Traits.WealthComfortablex2.buttonLabel = 'Comfortable';
Traits.WealthComfortablex2.group = 'wealth';
Traits.WealthComfortablex2.description = '2× starting wealth';
// Traits.WealthComfortablex2.mods = "Wealth";
Traits.WealthWealthyx5     = new Trait( "Wealth, Wealthy", 'A', 'So', 20, false, "B4E25" );
Traits.WealthWealthyx5.buttonLabel = 'Wealthy';
Traits.WealthWealthyx5.group = 'wealth';
Traits.WealthWealthyx5.description = '5× starting wealth';
// Traits.WealthWealthyx5.mods = "Wealth";
Traits.WealthVeryWealthyx20 = new Trait( "Wealth, Very Wealthy", 'A', 'So', 30, false, "B4E25" );
Traits.WealthVeryWealthyx20.buttonLabel = 'Very Wealthy';
Traits.WealthVeryWealthyx20.group = 'wealth';
Traits.WealthVeryWealthyx20.description = '20× starting wealth';
Traits.WealthFilthyRichx100 = new Trait( "Wealth, Filthy Rich", 'A', 'So', 50, false, "B4E25" );
Traits.WealthFilthyRichx100.buttonLabel = 'Filthy Rich';
Traits.WealthFilthyRichx100.group = 'wealth';
Traits.WealthFilthyRichx100.description = '100× starting wealth';
Traits.Multimillionaire    = new Trait( "Multimillionaire", 'A', 'So', 25, true, "B4E25" );
Traits.Multimillionaire.description = 'wealth × 10 / level';
//Traits.Multimillionaire.levelsName = "×10 to Starting Wealth";
Traits.Multimillionaire.levelsName = "Wealth ×10";

// Quirks from Basic pp. 162-165
Traits.Attentive           = new Trait("Attentive", 'Q', 'M', -1, false, "B4E163" );
Traits.BroadMinded         = new Trait("Broad-Minded", 'Q', 'M', -1, false, "B4E163" );
Traits.Careful             = new Trait("Careful", 'Q', 'M', -1, false, "B4E163" );
Traits.Chauvinistic        = new Trait("Chauvinistic", 'Q', 'M', -1, false, "B4E163" );
Traits.Congenial           = new Trait("Congenial", 'Q', 'M', -1, false, "B4E164" );
Traits.TrivialDelusion     = new Trait("Trivial Delusion", 'Q', 'M', -1, false, "B4E164" );
Traits.Dislike             = new Trait("Dislike", 'Q', 'M', -1, false, "B4E164" );
Traits.Distractible        = new Trait("Distractible", 'Q', 'M', -1, false, "B4E164" );
Traits.Dreamer             = new Trait("Dreamer", 'Q', 'M', -1, false, "B4E164" );
Traits.Dull                = new Trait("Dull", 'Q', 'M', -1, false, "B4E164" );
Traits.Habit               = new Trait("Habit", 'Q', 'M', -1, false, "B4E164" );
Traits.Expression          = new Trait("Expression", 'Q', 'M', -1, false, "B4E164" );
Traits.Humble              = new Trait("Humble", 'Q', 'M', -1, false, "B4E164" );
Traits.Imaginative         = new Trait("Imaginative", 'Q', 'M', -1, false, "B4E164" );
Traits.Incompetence        = new Trait("Incompetence", 'Q', 'M', -1, false, "B4E164" );
Traits.Like                = new Trait("Like", 'Q', 'M', -1, false, "B4E164" );
Traits.Nosy                = new Trait("Nosy", 'Q', 'M', -1, false, "B4E164" );
Traits.TrivialObsession    = new Trait("Trivial Obsession", 'Q', 'M', -1, false, "B4E164" );
Traits.PersonalityChange   = new Trait("Personality Change", 'Q', 'M', -1, false, "B4E164" );
Traits.Proud               = new Trait("Proud", 'Q', 'M', -1, false, "B4E164" );
Traits.Responsive          = new Trait("Responsive", 'Q', 'M', -1, false, "B4E164" );
Traits.Staid               = new Trait("Staid", 'Q', 'M', -1, false, "B4E164" );
Traits.QuickTrademark      = new Trait("Quick Trademark", 'Q', 'M', -1, false, "B4E164" );
Traits.Uncongenial         = new Trait("Uncongenial", 'Q', 'M', -1, false, "B4E165" );
Traits.TrivialVow          = new Trait("Trivial Vow", 'Q', 'M', -1, false, "B4E165" );
Traits.AccelerationWeakness= new Trait("Acceleration Weakness", 'Q', 'P', -1, false, "B4E165" );
Traits.AlcoholIntolerance  = new Trait("Alcohol Intolerance", 'Q', 'P', -1, false, "B4E165" );
Traits.Bowlegged           = new Trait("Bowlegged", 'Q', 'P', -1, false, "B4E165" );
Traits.CannotFloat         = new Trait("Cannot Float", 'Q', 'P', -1, false, "B4E165" );
Traits.DistinctiveFeature  = new Trait("Distinctive Feature", 'Q', 'P', -1, false, "B4E165" );
Traits.Hangovers           = new Trait("Horrible Hangovers", 'Q', 'P', -1, false, "B4E165" );
Traits.MinorAddiction      = new Trait("Minor Addiction", 'Q', 'P', -1, false, "B4E165" );
Traits.MinorHandicap       = new Trait("Minor Handicap", 'Q', 'P', -1, false, "B4E165" );
Traits.NervousStomach      = new Trait("Nervous Stomach", 'Q', 'P', -1, false, "B4E165" );
Traits.Neutered            = new Trait("Neutered", 'Q', 'P', -1, false, "B4E165" );
Traits.Sexless             = new Trait("Sexless", 'Q', 'P', -1, false, "B4E165" );

/*
// some Star Wars languages for testing
Traits.GalacticBasic = new Trait( "Galactic Basic", 'M', 2, true, "B24, BS33" );
Traits.GalacticBasic.key = "Language";
Traits.Gamorrean = new Trait( "Gamorrean", 'M', 2, true, "B24, BS33" );
Traits.Gamorrean.key = "Language";
Traits.Gand = new Trait( "Gand", 'M', 2, true, "B24, BS33" );
Traits.Gand.key = "Language";
Traits.Geonosian = new Trait( "Geonosian", 'M', 2, true, "B24, BS33" );
Traits.Geonosian.key = "Language";
// Traits.GranSpoken = new Trait( "Gran (Spoken)", 'M', 1, true, "B24, BS33" );
// Traits.GranSpoken.key = "Language";
// Traits.GranWritten = new Trait( "Gran (Written)", 'M', 1, true, "B24, BS33" );
// Traits.GranWritten.key = "Language";
Traits.Gran = new Trait( "Gran", 'M', 2, true, "B24, BS33" );
Traits.Gran.key = "Language";
// Traits.GunganSpoken = new Trait( "Gungan (Spoken)", 'M', 1, true, "B24, BS33" );
// Traits.GunganSpoken.key = "Language";
// Traits.GunganWritten = new Trait( "Gungan (Written)", 'M', 1, true, "B24, BS33" );
// Traits.GunganWritten.key = "Language";
Traits.Gungan = new Trait( "Gungan", 'M', 2, true, "B24, BS33" );
Traits.Gungan.key = "Language";

// some cultural familiarities for testing
Traits.EastAsian = new Trait( "East Asian", 'M', 1, false, "B23" );
Traits.EastAsian.key = "CulturalFamiliarity";
Traits.Muslim = new Trait( "Muslim", 'M', 1, false, "B23" );
Traits.Muslim.key = "CulturalFamiliarity";
Traits.Western = new Trait( "Western", 'M', 1, false, "B23" );
Traits.Western.key = "CulturalFamiliarity";
*/
for( var t in Traits ) {
    if( !Traits[t].hasOwnProperty('key') ) Traits[t].key = t;
}
// should probably not do types here
// Traits.spacer = { type: 'S' };
// Traits.heading = { heading: '', type: 'H' };

// alternate names for traits (Trait object keys will be different, so these must be defined after the add-key loop above)
// (give them a 'key' attribute equal to the trait they are cloned from, so that Adjustments, etc. will work)
Traits.Transcendent.copyAs("Appearance, Transcendent");
Traits.VeryBeautiful.copyAs("Appearance, Very Beautiful");
Traits.VeryHandsome.copyAs("Appearance, Very Handsome");
Traits.Beautiful.copyAs("Appearance, Beautiful");
Traits.Handsome.copyAs("Appearance, Handsome");
Traits.Attractive.copyAs("Appearance, Attractive");
Traits.Unattractive.copyAs("Appearance, Unattractive");
Traits.Ugly.copyAs("Appearance, Ugly");
Traits.Hideous.copyAs("Appearance, Hideous");
Traits.Monstrous.copyAs("Appearance, Monstrous");
Traits.Horrific.copyAs("Appearance, Horrific");
Traits.NoLegsAerial.copyAs("Aerial");
Traits.NoLegsAquatic.copyAs("Aquatic");
Traits.ShapeshiftingAlternateForm.copyAs("Alternate Form");
Traits.TotalKlutz.copyAs("Klutz, Total");
Traits.ShapeshiftingMorph.copyAs("Morph");
Traits.Anosmia.copyAs("No Sense of Smell/Taste");
Traits.ScanningSenseRadar.copyAs("Radar");
Traits.ScanningSenseImagingRadar.copyAs("Imaging Radar");
Traits.ScanningSenseLadar.copyAs("Ladar");
Traits.ScanningSenseParaRadar.copyAs("Para-Radar");
Traits.ScanningSenseSonar.copyAs("Sonar");
Traits.BluntClaws.copyAs("Claws, Blunt");
Traits.SharpClaws.copyAs("Claws, Sharp");
Traits.Talons.copyAs("Claws, Talons");
Traits.BeakSharp.copyAs("Sharp Beak");
Traits.TeethSharp.copyAs("Sharp Teeth");
Traits.Fangs.copyAs("Teeth, Fangs");
Traits.DamageResistance.copyAs("DR");
Traits.TelecommunicationIR.copyAs("Infrared Communication");
Traits.TelecommunicationIR.copyAs("IR Communication");
Traits.TelecommunicationLaser.copyAs("Laser Communication");
Traits.TelecommunicationRadio.copyAs("Radio");
Traits.TelecommunicationTelesend.copyAs("Telesend");
Traits.NoLegsTrackedWheeled.copyAs("Tracked");
Traits.NoLegsTrackedWheeled.copyAs("Wheeled");
Traits.NoLegsSessile.copyAs("Sessile");
Traits.NoLegsBounceRollSlither.copyAs("Rolling");
Traits.NoLegsBounceRollSlither.copyAs("Slithering");
Traits.NoLegsBounceRollSlither.copyAs("Bouncing");

var AdsGURPSLite = ['AcuteHearing','AcuteVision','AcuteTasteSmell','AcuteTouch','Ambidexterity',
'AnimalEmpathy','Catfall','CombatReflexes','DangerSense','Daredevil','Empathy',
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
'Amoral', 'Appearance Change', 'Argumentative', 'Aristocratic', 'Atheist', 'Attentive', 'Bad Posture',
'Bitter', 'Blunt', 'Boring', 'Born Goon', 'Bowlegged', 'Broad-Minded', 'Bulky Frame',
'Can Be Turned By True Faith', "Can't Read Music", 'Cannot Float', 'Care', 'Careful planner',
'Careful', 'Carries backup weapons', 'Chauvinistic', 'Checkered Past', 'Cheerful', 'Clean freak',
'Clumsy Runner', 'Code of Honor', 'Cold Intolerance', 'Collector', 'College Incompetence', 'Combat Hesitancy',
'Complicated', 'Compulsion', 'Congenial', 'Cooperative', 'Cosmetic Eyeglasses', 'Credulous', 'Crude',
'Cruel', 'Crush', 'Cyclothymic', 'Cynical', 'Daily Ritual', 'Damned', 'Dead Giveaway', 'Dead Weight',
'Decisive', 'Delusion', 'Delusional Competence', 'Depressing', 'Desirous', 'Determined',
'Disadvantage Embellishment', 'Disciplined', 'Dishonest Face', 'Dislike', 'Dislikes haste', 'Disorganized',
'Distinctive Features', 'Distinctive Speech', 'Distractible', 'Docile', 'Doesn&lsquo;t trust banks', 'Dorky',
'Dreamer', 'Dual Identity', 'Dull', 'Dull Taste or Smell', 'Dweeby', 'Easily Frustrated', 'Easily Influenced',
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
'Willful Ignorance', 'Wishy-Washy', 'Won&lsquo;t carry a load'];


/****  Modifiers  ****/
var Modifiers = {};
Modifiers.Addiction = [
    [
        { text: "Cheap: up to 0.1% of avg Starting Wealth",     mod:  -5, type: 'constantMod', required: true },
        { text: "Expensive: up to 0.5% of avg Starting Wealth", mod: -10, type: 'constantMod' },
        { text: "Very Expensive: >0.5% of avg Starting Wealth", mod: -20, type: 'constantMod' }
    ],
    [
        { text: "Incapacitating/Hallucinogenic", mod: -10, type: 'constantMod' }
    ],
    [
        { text:  "Highly Addictive", mod:  -5, type: 'constantMod' },
        { text: "Totally Addictive", mod: -10, type: 'constantMod' }
    ],
    [
        { text: "Legal", mod: 5, type: 'constantMod' }
    ]
];
Modifiers.Affliction = [
    [
        { text: "Coma", mod: 250, type: 'enhanceLimit' }
    ],
    [
        { text: "Cumulative", mod: 400, type: 'enhanceLimit' }
    ],
    [
        { text: "Heart Attack", mod: 300, type: 'enhanceLimit' }
    ],
    [
        { text: "Stunning", mod: 10, type: 'enhanceLimit' }
    ]
];
Modifiers.Ally = [
    [
        { text: "point value: 25%  of PC", mod: 1,  type: 'constantMod', required: true },
        { text: "point value: 50%  of PC", mod: 2,  type: 'constantMod' },
        { text: "point value: 75%  of PC", mod: 3,  type: 'constantMod' },
        { text: "point value: 100% of PC", mod: 5,  type: 'constantMod' },
        { text: "point value: 150% of PC", mod: 10, type: 'constantMod' }
    ],
    [
        { text: "group size: 6-10",      mod: 6,  type: 'multiplier' },
        { text: "group size: 11-20",     mod: 8,  type: 'multiplier' },
        { text: "group size: 21-50",     mod: 10, type: 'multiplier' },
        { text: "group size: 50-100",    mod: 12, type: 'multiplier' },
       // { text: "group size: ×10/×6 (i.e. ×12 for 100, ×18 for 1000, etc.)", mod: 6,  type: 'multiplier', levels: true }
        { text: "large group: up to 1000 is ×18, 10,000 is ×24, <i>etc</i>.", mod: 18,  type: 'multiplier', levels: true }
    ],
    [
        { text: "Puppet minion", mod: 0, type: 'enhanceLimit' },
        { text: "Minion", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Special Abilities", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Summonable", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "Unwilling", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Sympathy: death reduces ally's HT to 0, reciprocal", mod: -25, type: 'enhanceLimit' },
        { text: "Sympathy: death reduces ally's HT to 0, not reciprocal", mod: -5, type: 'enhanceLimit' },
        { text: "Sympathy: death kills ally, reciprocal", mod: -50, type: 'enhanceLimit' },
        { text: "Sympathy: death kills ally, not reciprocal", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.AlternateForm = [
  [
    { text: "more powerful form - edit (90% of points above your racial template value)", mod: 20, type: 'constantMod' }
  ]
];
Modifiers.AlwaysOn = [
  [
    { text: "Always On", mod: -20, type: 'enhanceLimit' }
  ]
];
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
Modifiers.Attack = [
//  [
//      { text: "Alternative Attack", mod: 1/5, type: 'multiplier' },
//  ],
    [
        { text: "Accurate", mod: 5, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Area Effect, ×2 yards radius", mod: 50, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Armor Divisor 2",  mod:  50, type: 'enhanceLimit' },
        { text: "Armor Divisor 3",  mod: 100, type: 'enhanceLimit' },
        { text: "Armor Divisor 5",  mod: 150, type: 'enhanceLimit' },
        { text: "Armor Divisor 10", mod: 200, type: 'enhanceLimit' },
        { text: "Contact Agent", mod: 50, type: 'enhanceLimit' },
        { text: "Follow-up", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Aura", mod: 80, type: 'enhanceLimit' }
    ],
    [
        { text: "Based on ST",   mod: 20, type: 'enhanceLimit' },
        { text: "Based on DX",   mod: 20, type: 'enhanceLimit' },
        { text: "Based on IQ",   mod: 20, type: 'enhanceLimit' },
        { text: "Based on HT",   mod: 20, type: 'enhanceLimit' },
        { text: "Based on Per",  mod: 20, type: 'enhanceLimit' },
        { text: "Based on Will", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Blood Agent (with Cone or Area Effect)", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "Cone", mod: 10, type: 'enhanceLimit', levels: true, baseMod: 50 }
        // jet, melee attack, rapid fire, emanation
    ],
    [
        { text: "Contact Agent (with Cone or Area Effect)", mod: 150, type: 'enhanceLimit' }
    ],
    [
        { text: "Cosmic (not attack or defense)", mod: 50, type: 'enhanceLimit' },
        { text: "Cosmic (defense or countermeasure)", mod: 50, type: 'enhanceLimit' },
        { text: "Cosmic (lingering attack effect)", mod: 100, type: 'enhanceLimit' },
        { text: "Cosmic (irresistible attack)", mod: 300, type: 'enhanceLimit' }
    ],
    [
        { text: "Cyclic, every second",     mod: 100, type: 'enhanceLimit' },
        { text: "Cyclic, every 10 seconds", mod:  50, type: 'enhanceLimit' },
        { text: "Cyclic, every minute",     mod:  40, type: 'enhanceLimit' },
        { text: "Cyclic, every hour",       mod:  20, type: 'enhanceLimit' },
        { text: "Cyclic, every day",        mod:  10, type: 'enhanceLimit' }
    ],
    [
        { text: "Delay: Fixed (specify time)",        mod:  0, type: 'enhanceLimit' },
        { text: "Delay: Variable (up to 10 seconds)", mod: 10, type: 'enhanceLimit' },
        { text: "Delay: Variable (unlimited)",        mod: 20, type: 'enhanceLimit' },
        { text: "Delay: Triggered (specify trigger)", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Double Blunt Trauma", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Double Knockback", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Drifting", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Explosion", mod: 50, type: 'enhanceLimit', levels: true }
    ],
    // not an attack Enhancement
    // [
 //        { text: "Extended Duration: 3×",        mod:  20, type: 'enhanceLimit' },
 //        { text: "Extended Duration: 10×",       mod:  40, type: 'enhanceLimit' },
 //        { text: "Extended Duration: 30×",       mod:  60, type: 'enhanceLimit' },
 //        { text: "Extended Duration: 100×",      mod:  80, type: 'enhanceLimit' },
 //        { text: "Extended Duration: 300×",      mod: 100, type: 'enhanceLimit' },
 //        { text: "Extended Duration: 1000×",     mod: 120, type: 'enhanceLimit' },
 //        { text: "Extended Duration: Permanent", mod: 150, type: 'enhanceLimit' }
    // ],
    [
        { text: "Fragmentation, per die", mod: 15, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Follow-Up: Natural weapon", mod:   0, type: 'enhanceLimit' },
        { text: "Follow-Up: Passive weapon", mod: -50, type: 'enhanceLimit' }
//      { text: "Follow-Up: Innate Attack",  mod: 50, type: 'enhanceLimit' }  this is more like a multiplier (x2), but only for the enhancements on the Innate Attack
    ],
    [
        { text: "Guided", mod: 50, type: 'enhanceLimit' },
        { text: "Homing (vision-based)", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Hazard: Dehydration",  mod: 20, type: 'enhanceLimit' },
        { text: "Hazard: Drowning",     mod:  0, type: 'enhanceLimit' },
        { text: "Hazard: Freezing",     mod: 20, type: 'enhanceLimit' },
        { text: "Hazard: Missed Sleep", mod: 50, type: 'enhanceLimit' },
        { text: "Hazard: Starvation",   mod: 40, type: 'enhanceLimit' },
        { text: "Hazard: Suffocation",  mod:  0, type: 'enhanceLimit' }
    ],
    [
        { text: "Incendiary", mod: 10, type: 'enhanceLimit' }
    ],
    [
        { text: "Increased Area", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Instantaneous", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Jet", mod: 0, type: 'enhanceLimit' }
    ],
    [
        { text: "Link", mod: 10, type: 'enhanceLimit' },
        { text: "Link, separable", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Low Signature", mod: 10, type: 'enhanceLimit' },
        { text: "No Signature", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Malediction (-1/yard)", mod: 100, type: 'enhanceLimit' },
        { text: "Malediction (Speed/Range mods)", mod: 150, type: 'enhanceLimit' },
        { text: "Malediction (Long-Distance mods)", mod: 200, type: 'enhanceLimit' }
    ],
    [
        { text: "Mobile", mod: 40, type: 'enhanceLimit' }
    ],
    [
        { text: "Movable Area", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Overhead", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Persistent", mod: 40, type: 'enhanceLimit' }
    ],
    [
        { text: "Radiation (toxic attack)",   mod:  25, type: 'enhanceLimit' },
        { text: "Radiation (burning attack)", mod: 100, type: 'enhanceLimit' }
    ],
    // [
    //     { text: "Ranged", mod: 40, type: 'enhanceLimit' }
    // ],
    [
        { text: "Rapid Fire: RoF 2",       mod:  40, type: 'enhanceLimit' },
        { text: "Rapid Fire: RoF 3",       mod:  50, type: 'enhanceLimit' },
        { text: "Rapid Fire: RoF 4-7",     mod:  40, type: 'enhanceLimit' },
        { text: "Rapid Fire: RoF 8-15",    mod: 100, type: 'enhanceLimit' },
        { text: "Rapid Fire: RoF 16-30",   mod: 150, type: 'enhanceLimit' },
        { text: "Rapid Fire: RoF 31-70",   mod: 200, type: 'enhanceLimit' },
        { text: "Rapid Fire: RoF 71-150",  mod: 250, type: 'enhanceLimit' },
        { text: "Rapid Fire: RoF 151-300", mod: 300, type: 'enhanceLimit' }
    ],
    [
        { text: "Reduced Fatigue Cost", mod: 20, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Selective Effect", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Surge", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Wall", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Accessibility (Small Limitation)", mod: -10, type: 'enhanceLimit' },
        { text: "Accessibility (Medium Limitation)", mod: -20, type: 'enhanceLimit' },
        { text: "Accessibility (Large Limitation)", mod: -30, type: 'enhanceLimit' }
    ],
    [
        { text: "Always On (small limitation)", mod: -20, type: 'enhanceLimit' },
        { text: "Always On (large limitation)", mod: -40, type: 'enhanceLimit' }
    ],
    [
        { text: "Costs Fatigue every use/minute, per FP", mod: -5, type: 'enhanceLimit' },
        { text: "Costs Fatigue each second, per FP", mod: -10, type: 'enhanceLimit' }
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
        { text: "Nuisance Effect (variable)", mod: -5, type: 'constantMod', levels: true }
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
        { text: "½D Range ÷2",            mod:  -5, type: 'enhanceLimit' },
        { text: "½D Range ÷5",            mod: -10, type: 'enhanceLimit' },
        { text: "Range (½D and Max) ÷2",  mod: -10, type: 'enhanceLimit' },
        { text: "½D Range ÷10",           mod: -15, type: 'enhanceLimit' },
        { text: "Range (½D and Max) ÷5",  mod: -20, type: 'enhanceLimit' },
        { text: "Range (½D and Max) ÷10", mod: -30, type: 'enhanceLimit' },
    ],
    [
        { text: "Takes Extra Time (per Ready time doubling)", mod: -10, type: 'enhanceLimit' }
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
/*Modifiers.Atavism = [
 [
     { text: "Severity: Mild", mod: -12, type: 'constantMod' },
     { text: "Severity: Moderate", mod: 16, type: 'constantMod' },
     { text: "Severity: Severe", mod: -20, type: 'constantMod' }
 ],
 [
     { text: "Frequency: Common", mod: 1, type: 'multiplier' },
     { text: "Frequency: Uncommon", mod: 1/2, type: 'multiplier' },
     { text: "Frequency: Rare", mod: 1/4, type: 'multiplier' }
 ]
];*/
Modifiers.BattleRage = [
    [
        { text: "Battle Rage", mod: 50, type: 'enhanceLimit' }
    ]
];
Modifiers.BiteDamage = [
    [
        { text: "Additional damage (+1)", mod: "5/+5", type: 'constantMod' }
    ]
];
/*  Meta-Trait Modifiers
Not sure exactly what to do with these, as the meta-traits are not going to appear
in the Traits list.  Applying Modifiers to them *after* they have been applied works.
Need to modify the code that does the pop-up to take these into account...
*/
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
        { text: "Unswitchable", mod: -40, type: 'enhanceLimit' }
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
Modifiers.CarryingCapacity = [
    [
        { text: "Naked",       mod: -30, type: 'enhanceLimit' },
        { text: "Can Carry Objects up to Light encumbrance",       mod: 10, type: 'enhanceLimit' },
        { text: "Can Carry Objects up to Medium encumbrance",      mod: 20, type: 'enhanceLimit' },
        { text: "Can Carry Objects up to Heavy encumbrance",       mod: 30, type: 'enhanceLimit' },
        { text: "Can Carry Objects up to Extra-Heavy encumbrance", mod: 50, type: 'enhanceLimit' }
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
        { text: "Extended", mod: 20, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Cannot turn off", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.Clairsentience = [
    [
        { text: "Clairaudience", mod: -30, type: 'enhanceLimit' },
        { text: "Clairosmia",    mod: -60, type: 'enhanceLimit' },
        { text: "Clairvoyance",  mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Visible", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.Clearance = [
    [
        { text: "Minor Organization", mod: "1/2", type: 'multiplier' }
    ],
    [
        { text: "Narrow", mod: -5, type: 'constantMod' }
    ],
    [
        { text: "Need-to-know Only", mod: -5, type: 'constantMod' }
    ]
];
Modifiers.Clinging = [
    [
        { text: "Only one Substance: Common", mod: -40, type: 'enhanceLimit' },
        { text: "Only one Substance: Rare",   mod: -60, type: 'enhanceLimit' },
        { text: "Only one Substance: Absurd", mod: -80, type: 'enhanceLimit' }
    ]
];
Modifiers.CompartmentalizedMind = [
    [
        { text: "Controls", mod: -50, type: 'enhanceLimit' },
        { text: "Dedicated Controls", mod: -80, type: 'enhanceLimit' }
    ]
];
Modifiers.consumption = [
    [
        { text: "Cast-Iron Stomach", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Food Only", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Water Only", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Contact = [
    [
        { text: "Supernatural Talents", mod: 1, type: 'constantMod' }
  ],
  [
    { text: "Group", mod: 5, type: 'multiplier' }
    ]
];
Modifiers.Cosmetic = [
  [
    { text: "cosmetic", mod: -50, type: 'enhanceLimit' }
  ]
];
Modifiers.DamageRate = [
    [
        { text: "Damage Rate: 1d per 30 minutes", mod:  -5, type: 'constantMod', required: true },
        { text: "Damage Rate: 1d per 5 minutes",  mod: -10, type: 'constantMod' },
        { text: "Damage Rate: 1d per minute",     mod: -20, type: 'constantMod' }
    ]
];
Modifiers.DarkVision = [
    [
        { text: "Can see color", mod: 20, type: 'enhanceLimit' }
    ]
];
Modifiers.Dependency = [
    [
        { text: "Availability: Rare",        mod: -30, type: 'constantMod' },
        { text: "Availability: Occasional",  mod: -20, type: 'constantMod' },
        { text: "Availability: Common",      mod: -10, type: 'constantMod', required: true },
        { text: "Availability: Very Common", mod:  -5, type: 'constantMod' }
    ],
    [
        { text: "Aging @ 2 years per 1 HT lost", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Frequency: Constantly (1 HT/min)",    mod:   5,    type: 'multiplier' },
        { text: "Frequency: Hourly (1 HT/10 mins)",    mod:   4,    type: 'multiplier' },
        { text: "Frequency: Daily (1 HT/hr)",          mod:   3,    type: 'multiplier' },
        { text: "Frequency: Weekly (1 HT/6 hrs)",      mod:   2,    type: 'multiplier' },
        { text: "Frequency: Monthly (1 HT/day)",       mod:   1,    type: 'multiplier', required: true },
        { text: "Frequency: Seasonally (1 HT/3 days)", mod: "1/3",  type: 'multiplier' },
        { text: "Frequency: Yearly (1 HT/2 wks)",      mod: "1/10", type: 'multiplier' }
    ]
];
Modifiers.Dependent = [
    [
        { text: "Point Value: 76-100%", mod:  -1, type: 'constantMod' },
        { text: "Point Value: 51-75%",  mod:  -2, type: 'constantMod' },
        { text: "Point Value: 26-50%",  mod:  -5, type: 'constantMod', required: true },
        { text: "Point Value: up to 25%",   mod: -10, type: 'constantMod' },
        { text: "Point Value: up to 0 pts", mod: -15, type: 'constantMod' }
    ],
    [
        { text: "Employer/Acquaintance", mod: "1/2", type: 'multiplier' },
        { text: "Friend", mod: 1, type: 'multiplier', required: true },
        { text: "Loved One", mod: 2, type: 'multiplier' }
    ],
    [
        { text: "Group of 2 or more", mod: 2, type: 'multiplier' }
    ]
];
Modifiers.Detect = [
    [
        { text: "Rare",        mod:  0, type: 'constantMod', required: true },
        { text: "Occasional",  mod:  5, type: 'constantMod' },
        { text: "Common",      mod: 15, type: 'constantMod' },
        { text: "Very Common", mod: 25, type: 'constantMod' }
    ],
    [
        { text: "Precise", mod: 100, type: 'enhanceLimit' },
        { text: "Vague", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Signal Detection", mod: 0, type: 'enhanceLimit' }
    ]
];
/*Modifiers.Destiny = [
 [
     { text: "Great Advantage",    mod: 15,  type: 'constantMod' },
     { text: "Major Advantage",    mod: 10,  type: 'constantMod' },
     { text: "Minor Advantage",    mod: 5,   type: 'constantMod' },
     { text: "Minor Disadvantage", mod: -5,  type: 'constantMod' },
     { text: "Major Disadvantage", mod: -10, type: 'constantMod' },
     { text: "Great Disadvantage", mod: -15, type: 'constantMod' }
 ]
];*/
Modifiers.Digit = [
    [
        { text: "Finger", mod: -2, type: 'constantMod' }
    ],
    [
        { text: "Thumb", mod: -5, type: 'constantMod' }
    ]
];
Modifiers.Divine = [
    [
        { text: "Major Deity", mod: 25, type: 'constantMod' },
        { text: "Minor Deity", mod: 20, type: 'constantMod' }
    ],
    [
        { text: "Higher Favor", mod: "5/+5", type: 'constantMod' },
        { text: "Lower Favor", mod: "-5/-5", type: 'constantMod' }
    ]
];
Modifiers.DoesntBreathe = [
    [
        { text: "Gills", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Oxygen Absorption", mod: -25, type: 'enhanceLimit' }
    ],
    [
        { text: "Oxygen Combustion", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Oxygen Storage: ×25",  mod: -50, type: 'enhanceLimit' },
        { text: "Oxygen Storage: ×50",  mod: -40, type: 'enhanceLimit' },
        { text: "Oxygen Storage: ×100", mod: -30, type: 'enhanceLimit' },
        { text: "Oxygen Storage: ×200", mod: -20, type: 'enhanceLimit' },
        { text: "Oxygen Storage: ×300", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.DR = [
    [
        { text: "Absorption (apply points to only 1 trait)", mod: 80, type: 'enhanceLimit' },
        { text: "Absorption (apply points only to healing)", mod: 80, type: 'enhanceLimit' },
        { text: "Absorption", mod: 100, type: 'enhanceLimit' },
        { text: "Reflection", mod: 100, type: 'enhanceLimit'}
    ],
    [
        { text: "Force Field", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Hardened", mod: 20, type: 'enhanceLimit', levels: true, highestLevel: 6 }
    ],
    [
        { text: "Ablative", mod: -80, type: 'enhanceLimit' },
        { text: "Semi-Ablative", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "Can't Wear Armor", mod: -40, type: 'enhanceLimit' }
    ],
    [
        { text: "Only 1 Hit Location: -10% × hit penalty", mod: -10, type: 'enhanceLimit', levels: true },
        { text: "Front Only", mod: -20, type: 'enhanceLimit'},
        { text: "Back Only",  mod: -40, type: 'enhanceLimit'},
        { text: "Left Only",  mod: -40, type: 'enhanceLimit'},
        { text: "Right Only", mod: -40, type: 'enhanceLimit'},
        { text: "Top Only",   mod: -40, type: 'enhanceLimit'},
        { text: "Underside Only", mod: -40, type: 'enhanceLimit'}
    ],
    [
        { text: "Flexible", mod: -20, type: 'enhanceLimit' },
        { text: "Tough Skin", mod: -40, type: 'enhanceLimit' }
    ]
];
Modifiers.Dread = [
    [
        { text: "Cannot be trapped", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Duplication = [
    [
        { text: "Duplicated Gear", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "No Sympathetic Injury", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Digital", mod: -60, type: 'enhanceLimit' }
    ],
    [
        { text: "Shared Fatigue/Health", mod: -40, type: 'enhanceLimit' }
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
        { text: "Entire Race", mod: -20, type: 'constantMod' }
    ]
];
Modifiers.Emergencies = [
    [
        { text: "Emergencies Only", mod: -30, type: 'enhanceLimit' }
    ]
];
Modifiers.Enemy = [
//  [
//      { text: "Power: One person, point value ~50%",                     mod:  -5, type: 'constantMod' },
//      { text: "Power: One person, point value ~100%",                    mod: -10, type: 'constantMod', required: true },
//      { text: "Power: Evil Twin",                                        mod: -10, type: 'constantMod' },
//      { text: "Power: Small group (3-5), point values ~50%",             mod: -10, type: 'constantMod' },
//      { text: "Power: One person, point value at least  150%",                   mod: -20, type: 'constantMod' },
//      { text: "Power: Medium group (6-20), point values ~50%",           mod: -20, type: 'constantMod' },
//      { text: "Power: Large group (21-1000), point values ~50%",         mod: -30, type: 'constantMod' },
//      { text: "Power: Medium group (6-20), some with high point values", mod: -30, type: 'constantMod' },
//      { text: "Power: Formidable Group",                                 mod: -40, type: 'constantMod' }
//  ],
    [
        { text: "Intent: Watcher", mod: "1/4", type: 'multiplier' },
        { text: "Intent: Rival",   mod: "1/2", type: 'multiplier' },
        { text: "Intent: Hunter",  mod:   1,   type: 'multiplier', required: true }
    ],
    [
        { text: "Evil Twin who is more skilled than you", mod: -5, type: 'constantMod' }
    ],
    [
        { text: "Evil Twin who has abilities you don't", mod: -5, type: 'constantMod' }
    ],
    [
        { text: "Unknown Enemy", mod: -5, type: 'constantMod' }
    ]
];
Modifiers.EnhancedMove = [
    [
        { text: "Handling Bonus", mod: 5, upto: 5, type: 'enhanceLimit' },
        { text: "Handling Penalty", mod: -5, upto: 5, type: 'enhanceLimit' }
    ]
];
Modifiers.EnhancedMoveSpace = [
    [
        { text: "Newtonian", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.EnhancedMoveGround = [
    [
        { text: "Road-Bound", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.EnhancedTime = [
    [
        { text: "Psionics Instantaneous", mod: 15, type: 'constantMod' }
    ]
];
Modifiers.ESP = [
    [
        { text: "ESP", mod: -10, type: 'enhanceLimit' }
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
Modifiers.ExtraHead = [
    [
        { text: "Extraneous", mod: -20, type: 'enhanceLimit' }
    ]
];
Modifiers.ExtraLives = [
    [
        { text: "Copy", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "Requires New Body", mod: -20, type: 'enhanceLimit' },
        { text: "Requires Illegal, Rare, or Expensive New Body", mod: -40, type: 'enhanceLimit' }
    ]
];
Modifiers.Eyestalks = [
    [
        { text: "Easy to hit (stalks, large, etc.)", mod: -20, type: 'enhanceLimit' }
    ]
];
Modifiers.Fanatic = [
    [
        { text: "Extreme (+3 Will, but willing to die for cause)", mod: 0, type: 'constantMod' }
    ]
];
Modifiers.Fatigue = [
    [
        { text: "Only for Magic and Psionics", mod: "1/3", type: 'multiplier' }
    ]
];
Modifiers.FatigueOnly = [
    [
        { text: "Fatigue Only", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Favor = [
    [
        { text: "Favor", mod: "1/5", type: 'multiplier' }
    ]
];
Modifiers.Flashbacks = [
    [
        { text: "Severity: 2d seconds, -2 to rolls", mod:  -5, type: 'constantMod', required: true },
        { text: "Severity: 1d minutes, -5 to rolls", mod: -10, type: 'constantMod' },
        { text: "Severity: 3d minutes, complete",    mod: -20, type: 'constantMod' }
    ]
];
Modifiers.Flight = [
    [
        { text: "Space Flight: Newtonian", mod: 25, type: 'enhanceLimit' },
        { text: "Space Flight", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Space Flight Only", mod: -75, type: 'enhanceLimit' }
    ],
    [
        { text: "Wings",       mod: -25, type: 'enhanceLimit' },
        { text: "Small Wings", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Lighter Than Air", mod: -10, type: 'enhanceLimit' }
    ],
    [
    { text: "Gliding: Enhanced Move doubles top speed", mod: -50, type: 'enhanceLimit' },
    { text: "Gliding: Enhanced Move halves deceleration", mod: -50, type: 'enhanceLimit' },
        { text: "Gliding: Controlled", mod: -45, type: 'enhanceLimit' },
        { text: "Cannot Hover", mod: -15, type: 'enhanceLimit' }
    ],
    [
        { text: "Low Ceiling: 30 ft", mod: -10, type: 'enhanceLimit' },
        { text: "Low Ceiling: 10 ft", mod: -20, type: 'enhanceLimit' },
        { text: "Low Ceiling: 5 ft",  mod: -25, type: 'enhanceLimit' }
    ]
];
Modifiers.Fragile = [
    [
        { text: "Brittle",     mod: -15, type: 'constantMod' }
    ],
    [
        { text: "Combustible", mod:  -5, type: 'constantMod' }
    ],
    [
        { text: "Explosive",   mod: -15, type: 'constantMod' }
    ],
    [
        { text: "Flammable",   mod: -10, type: 'constantMod' }
    ],
    [
        { text: "Unnatural",   mod: -50, type: 'constantMod' }
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
Modifiers.FrequencyofAppearance = [
    [
        { text: "Frequency: Constantly (no roll required)", mod: 4, type: 'multiplier' },
        { text: "Frequency: Almost all the time (15 or less)", mod: 3, type: 'multiplier' },
        { text: "Frequency: Quite often (12 or less)", mod: 2, type: 'multiplier' },
        { text: "Frequency: Fairly often (9 or less)", mod: 1, type: 'multiplier', required: true },
        { text: "Frequency: Rarely (6 or less)", mod: '1/2', type: 'multiplier' }
    ]
];
Modifiers.Growth = [
    [
        { text: "Maximum Size Only", mod: 0, type: 'enhanceLimit' }
    ]
];
Modifiers.Hardened = [
    [
        { text: "Hardened", mod: "+30%/+30", type: 'enhanceLimit' }
    ]
];
Modifiers.PsychicHealing = [
    [
        { text: "Psychic Healing",  mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.Healing = [
    [
        { text: "Disease Only",  mod: -40, type: 'enhanceLimit' },
        { text: "Injuries Only", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "Faith Healing", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Own Race Only", mod: -20, type: 'enhanceLimit' },
        { text: "Xenohealing (All Mammals)", mod: 20, type: 'enhanceLimit' },
        { text: "Xenohealing (All Earthly Life)", mod: 40, type: 'enhanceLimit' },
        { text: "Xenohealing (All Carbon-Based Life)", mod: 60, type: 'enhanceLimit' },
        { text: "Xenohealing (Anything Alive)", mod: 80, type: 'enhanceLimit' },
        { text: "Xenohealing (Anything Animate)", mod: 100, type: 'enhanceLimit' }
    ]
];
Modifiers.HFOnly = [
    [
        { text: "High-Frequency Only", mod: 0, type: 'multiplier' }
    ]
];
Modifiers.HospitalityGroup = [
    [
        { text: "Single friend", mod:  1, type: 'constantMod' },
        { text: "Small family",  mod:  2, type: 'constantMod' },
        { text: "Society/Guild", mod:  5, type: 'constantMod', required: true },
        { text: "Vast alliance", mod: 10, type: 'constantMod' }
    ]
];
Modifiers.HyperspectralVision = [
    [
        { text: "Extended Low-Band",  mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Extended High-Band", mod: 30, type: 'enhanceLimit' }
    ]
];
Modifiers.Injury = [
    [
        { text: "Diffuse",     mod: 100, type: 'constantMod' },
        { text: "Homogeneous", mod: 40,  type: 'constantMod' },
        { text: "Unliving",    mod: 20,  type: 'constantMod' }
    ],
    [
        { text: "No Blood",  mod: 5, type: 'constantMod' }
    ],
    [
        { text: "No Brain",  mod: 5, type: 'constantMod' },
        { text: "No Head",   mod: 7, type: 'constantMod' }
    ],
    [
        { text: "No Eyes",   mod: 5, type: 'constantMod' }
    ],
    [
        { text: "No Neck",   mod: 5, type: 'constantMod' }
    ],
    [
        { text: "No Vitals", mod: 5, type: 'constantMod' }
    ]
];
Modifiers.Insubstantiality = [
    [
        { text: "Affect Substantial", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "Partial Insubstantiality: Self Only", mod: 20, type: 'enhanceLimit' },
        { text: "Partial Insubstantiality: Self & Objects Carried", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "Always On",  mod: -50, type: 'enhanceLimit' },
        { text: "Usually On", mod: -40, type: 'enhanceLimit' }
    ]
];
Modifiers.Interval = [
    [
        { text: "Occurrance lasts 1 hour",   mod: 0.5, type: 'multiplier' },
        { text: "Occurrance lasts 2 hours",  mod: 1,   type: 'multiplier', required: true },
        { text: "Occurrance lasts 4 hours",  mod: 1.5, type: 'multiplier' },
        { text: "Occurrance lasts 8 hours",  mod: 2,   type: 'multiplier' }
    ]
];
Modifiers.Invisibility = [
    [
        { text: "Affects Machines", mod: 50, type: 'enhanceLimit' },
        { text: "Affects Machines Only", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Switchable", mod: 10, type: 'enhanceLimit' },
        { text: "Usually On", mod:  5, type: 'enhanceLimit' }
    ],
    [
        { text: "Invisible to (vision type)", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Substantial Only", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Visible Reflection", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Visible Shadow", mod: -10, type: 'enhanceLimit' }
    ]
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
Modifiers.Legality = [
    [
        { text: "Illegal", mod: -5, type: 'constantMod' }
    ]
];
Modifiers.Legs = [
    [
        { text: "Cannot Kick", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Long, +1 SM", mod: 100, type: 'enhanceLimit', levels: true }
    ]
];
Modifiers.LifeSupport = [
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
        { text: "Massive; at least  a ton", mod: -10, type: 'constantMod' }
    ]
];
Modifiers.LimitedDefense = [
    [
        { text: "Source: Very Common", mod: -20, type: 'enhanceLimit' },
        { text: "Source: Common", mod: -40, type: 'enhanceLimit' },
        { text: "Source: Occasional", mod: -60, type: 'enhanceLimit' },
        { text: "Source: Rare", mod: -80, type: 'enhanceLimit' }
    ]
];
Modifiers.Luck = [
    [
        { text: "Active", mod: -40, type: 'enhanceLimit' }
    ],
    [
        { text: "Aspected (choose class)", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "Defensive", mod: -20, type: 'enhanceLimit' }
    ]
];
Modifiers.Magery = [
    [
        { text: "Aspected (<em>e.g.</em> Song/Dance, Day/Night, Solitary)", mod: -40, type: 'enhanceLimit' }, /* Single-College, */
        { text: "Strongly Aspected (<em>e.g.</em> Dark, Musical)", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.MagicResistance = [
    [
        { text: "Compatible With Magery", mod: 150, type: 'enhanceLimit' }
    ]
];
Modifiers.Magnetic = [
    [
        { text: "Ferrous Metals Only", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Maintenance = [
    [
        { text: "Interval: Monthly",         mod: '1/5', type: 'multiplier' },
        { text: "Interval: Bi-weekly",       mod: '1/3', type: 'multiplier' },
        { text: "Interval: Weekly",          mod: '1/2', type: 'multiplier' },
        { text: "Interval: Every other day", mod: '3/4', type: 'multiplier' },
        { text: "Interval: Daily",           mod:   1,   type: 'multiplier', required: true },
        { text: "Interval: Twice daily",     mod:   2,   type: 'multiplier' },
        { text: "Interval: 3-5 times daily", mod:   3,   type: 'multiplier' },
        { text: "Interval: Constant",        mod:   5,   type: 'multiplier' }
    ]
];
Modifiers.Mana = [
    [
        { text: "Area Effect, ×2 yards radius", mod: 50, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Switchable", mod: 100, type: 'enhanceLimit' }
    ]
];
Modifiers.Metabolism = [
    [
        { text: "Hibernation", mod: -60, type: 'enhanceLimit' }
    ]
];
Modifiers.MindControl = [
    [
        { text: "cybernetic", mod: 50, type: 'enhanceLimit' },
        { text: "cybernetic only", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "sensory", mod: 20, type: 'enhanceLimit' },
        { text: "sensory only", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "universal", mod: 50, type: 'enhanceLimit' },
        { text: "racial", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "telecommunication", mod: -20, type: 'enhanceLimit' }
    ]
];
Modifiers.MindReading = [
    [
        { text: "conditioning", mod: 50, type: 'enhanceLimit' },
        { text: "conditioning only", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "no memory", mod: 10, type: 'enhanceLimit' }
    ],
    [
        { text: "puppet", mod: -40, type: 'enhanceLimit' }
    ]
];
Modifiers.MindShield = [
    [
        { text: "cybernetic", mod: 50, type: 'enhanceLimit' }
    ]
];
Modifiers.ModularAbilities = [
    [
        { text: "physical abilities only", mod: 50, type: 'enhanceLimit' },
        { text: "mental or physical abilities", mod: 100, type: 'enhanceLimit' },
        { text: "spells only", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "virtual", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Morph = [
  [
    { text: "extra 'capacity' - edit (points above your racial template value)", mod: 20, type: 'constantMod' }
  ],
  [
    { text: "Not limited to living things", mod: 50, type: 'enhanceLimit' }
  ],
  [
    { text: "Mass Conservation", mod: -20, type: 'enhanceLimit' },
    { text: "Retains Shape", mod: -20, type: 'enhanceLimit' }
  ]
];
Modifiers.Neutralize = [
    [
        { text: "Power Theft", mod: 200, type: 'enhanceLimit' }
    ],
    [
        { text: "One Power", mod: -50, type: 'enhanceLimit' }
    ]
];
/*Modifiers.NoLegs = [
    [
        { text: "Aerial", mod: 0, type: 'constantMod', required: true },
        { text: "Aquatic", mod: 0, type: 'constantMod' },
        { text: "Bounces, Rolls, or Slithers", mod: 0, type: 'constantMod' },
        { text: "Semi-Aquatic", mod: 0, type: 'constantMod' },
        { text: "Sessile", mod: -50, type: 'constantMod' },
        { text: "Tracked or Wheeled", mod: -20, type: 'constantMod' }
    ],
];*/
Modifiers.NoLegsAquatic = [
    [
        { text: "Can't armor movers", mod: -5, type: 'constantMod' }
    ],
    [
        { text: "Can't dive", mod: -5, type: 'constantMod' }
    ]
];
Modifiers.Nocturnal = [
    [
        { text: "Permanent Paralysis", mod: 100, type: 'enhanceLimit' }
    ]
];
Modifiers.Obscure = [
    [
        { text: "Defensive", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Extended", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Ranged", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Stealthy", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "Always On", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.OldTech = [
    [
        { text: "Old Technology", mod: -50, type: 'enhanceLimit' }
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
Modifiers.Patron = [
    [
        { text: "Gives Equipment", mod:  50, type: 'enhanceLimit' },
        { text: "Gives Valuable Equipment", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "Highly Accessible", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Socially/Politically powerful", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Unusual magic, technology, or other abilities", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "Hands-off", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Secret", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Unwilling", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Payload = [
    [
        { text: "Exposed", mod: -50, type: 'enhanceLimit' }
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
Modifiers.PeripheralVision = [
    [
        { text: "Easy to Hit Eyes", mod: -20, type: 'enhanceLimit' }
    ]
];
Modifiers.Permeation = [
    [
        { text: "Very Common substance", mod: 40, type: 'constantMod' },
        { text: "Common substance",      mod: 20, type: 'constantMod', required: true },
        { text: "Occasional substance",  mod: 10, type: 'constantMod' },
        { text: "Rare substance",        mod: 5,  type: 'constantMod' }
    ],
//  [
//      { text: "Affects Carried Objects up to No encumbrance",     mod:  10, type: 'enhanceLimit' },
//      { text: "Affects Carried Objects up to Light encumbrance",  mod:  20, type: 'enhanceLimit' },
//      { text: "Affects Carried Objects up to Medium encumbrance", mod:  50, type: 'enhanceLimit' },
//      { text: "Affects Carried Objects up to Heavy encumbrance",  mod: 100, type: 'enhanceLimit' }
//  ],
    [
        { text: "Tunnel", mod: 40, type: 'enhanceLimit' }
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
        { text: "Weapons (Hoplophobia)", mod: -20, type: 'constantMod' }
    ]
];
Modifiers.PK = [
    [
        { text: "Psychokinetic", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.Possession = [
    [
        { text: "Assimilation", mod: 10, type: 'enhanceLimit' }
    ],
    [
        { text: "Chronic", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Mind Swap", mod: 10, type: 'enhanceLimit' }
    ],
    [
        { text: "Telecontrol", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Digital",    mod: -40, type: 'enhanceLimit' },
        { text: "Magical",    mod: -10, type: 'enhanceLimit' },
        { text: "Parasitic",  mod: -60, type: 'enhanceLimit' },
        { text: "Spiritual",  mod: -20, type: 'enhanceLimit' },
        { text: "Telepathic", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Mindlink Required", mod: -40, type: 'enhanceLimit' }
    ],
    [
        { text: "No Memory Access", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Puppets Only", mod: -30, type: 'enhanceLimit' }
    ]
];
Modifiers.Pouch = [
    [
        { text: "Diplomatic Pouch", mod: 5, type: 'constantMod' }
    ]
];
Modifiers.Precognition = [
    [
        { text: "Can't See Own Death", mod: -60, type: 'enhanceLimit' },
        { text: "One Event Type", mod: -40, type: 'enhanceLimit' }
    ]
];
Modifiers.PsiStatic = [
    [
        { text: "Area Effect, ×2 yards radius", mod: 50, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Switchable", mod: 100, type: 'enhanceLimit' }
    ],
    [
        { text: "Resistable", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.PsiTeleport = [
    [
        { text: "Psionic Teleportation", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.RadarSense = [
    [
        { text: "See inside any object", mod: 40, type: 'enhanceLimit' }
    ],
    [
        { text: "You can See colors", mod: 20, type: 'enhanceLimit' }
    ],
    [
        { text: "Low-Res", mod: 0, type: 'constantMod' }
    ],
    [
        { text: "Imaging & Low-Res modes", mod: 50, type: 'enhanceLimit' }
    ]
];
Modifiers.Radio = [
    [
        { text: "Short Wave", mod: 50, type: 'enhanceLimit' }
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
/*  A general Rarity limitation mod group, abstracted from several here (Clinging, Limited Defense, Penetrating Vision
Modifiers.Rarity = [
    [
        { text: "Very Common", mod: -20, type: 'enhanceLimit' },
        { text: "Common",      mod: -40, type: 'enhanceLimit' },
        { text: "Occasional",  mod: -60, type: 'enhanceLimit' },
        { text: "Rare",        mod: -40, type: 'enhanceLimit' }
    ]
];
*/
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
        { text: "Frequency: Everything", mod: 1, type: 'multiplier' },
        { text: "Frequency: Common", mod: '3/4', type: 'multiplier' },
        { text: "Frequency: Occasional", mod: '1/2', type: 'multiplier' },
        { text: "Frequency: Rare", mod: '1/4', type: 'multiplier' },
        { text: "Frequency: Very Rare", mod: '1/8', type: 'multiplier' }
    ]
];
Modifiers.Regeneration = [
    [
        { text: "Slow (1 HP / 12 hrs)", mod: 10, type: 'constantMod' },
        { text: "Regular (1 HP/hr)", mod: 25, type: 'constantMod', required: true },
        { text: "Fast (1 HP/min)", mod: 50, type: 'constantMod' },
        { text: "Very Fast (1 HP/sec)", mod: 100, type: 'constantMod' },
        { text: "Extreme (10 HP/sec)", mod: 150, type: 'constantMod' }
    ],
    [
      { text: "Heals Radiation", mod: 40, type: 'enhanceLimit' }
    ],
    [
      { text: "Radiation Only", mod: -60, type: 'enhanceLimit' }
    ]
];
Modifiers.Regrowth = [
    [
      { text: "Minor", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Reliability = [
    [
        { text: "Completely Reliable", mod: 3,     type: 'multiplier' },
        { text: "Usually Reliable",    mod: 2,     type: 'multiplier' },
        { text: "Somewhat Reliable",   mod: 1,     type: 'multiplier', required: true },
        { text: "Unreliable",          mod: '1/2', type: 'multiplier' }
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
        { text: "+8 HT rolls", mod: '1/2', type: 'multiplier' },
        { text: "+3 HT rolls", mod: '1/3', type: 'multiplier' }
    ],
    [
        { text: "Mental Resistance (rolls vs Will)", mod: 0, type: 'constantMod' }
    ]
];
Modifiers.RestrictedDiet = [
    [
        { text: "Substitution", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Savage = [
    [
        { text: "Savage behavior", mod: -5, type: 'constantMod' }
    ]
];
Modifiers.ScanningSense = [
    [
        { text: "Extended Arc: 240°", mod: 75,  type: 'enhanceLimit' },
        { text: "Extended Arc: 360°", mod: 125, type: 'enhanceLimit' }
    ],
    [
        { text: "Low-Probability Intercept (LPI) mode", mod: 10,  type: 'enhanceLimit' }
    ],
    [
        { text: "Multi-Mode", mod: 50,  type: 'enhanceLimit' }
    ],
    [
        { text: "Penetrating", mod: 50,  type: 'enhanceLimit' }
    ],
    [
        { text: "Targeting", mod: 20,  type: 'enhanceLimit' },
        { text: "Targeting Only", mod: -40,  type: 'enhanceLimit' }
    ]
];
Modifiers.Secret = [
    [
        { text: "Secret Identity", mod: 0, type: 'constantMod' },
        { text: "Secret Identity, Status 3+", mod: -10, type: 'constantMod' }
    ],
    [
        { text: "Serious Embarrassment", mod: -5, type: 'constantMod', required: true },
        { text: "Utter Rejection", mod: -10, type: 'constantMod' },
        { text: "Imprisonment or Exile", mod: -20, type: 'constantMod' },
        { text: "Possible Death", mod: -30, type: 'constantMod' }
    ]
];
Modifiers.SecretCommunication = [
    [
        { text: "Cannot be perceived by other races", mod: 40, type: 'enhanceLimit' }
    ],
    [
        { text: "Only general concepts and emotions", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.SelfControl = [
  [
    { text: "Self-control: Resist quite rarely (roll of 6 or less)", mod: 2, type: 'multiplier' },
    { text: "Self-control: Resist fairly often (roll of 9 or less)", mod: "3/2", type: 'multiplier' },
    { text: "Self-control: Resist quite often (roll of 12 or less)", mod: 1, type: 'multiplier', required: true },
    { text: "Self-control: Resist almost all the time (roll of 15 or less)", mod: "1/2", type: 'multiplier' }
  ]
];
Modifiers.Shrinking = [
    [
        { text: "Affects Others (per person)", mod: 50, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Full Hit Points", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Full DR", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Full Move", mod: 30, type: 'enhanceLimit' }
    ],
    [
        { text: "Full Damage", mod: 100, type: 'enhanceLimit' }
    ]
];
/*Modifiers.Shyness = [
    [
//      { text: "Mild",      mod:  -5, type: 'constantMod', required: true },
//      { text: "Severe",    mod: -10, type: 'constantMod' },
//      { text: "Crippling", mod: -20, type: 'constantMod' }
        { text: "Mild",      mod: 1, type: 'multiplier', required: true },
        { text: "Severe",    mod: 2, type: 'multiplier' },
        { text: "Crippling", mod: 4, type: 'multiplier' }
    ]
];*/
Modifiers.Signal = [
    [
        { text: "Requires Signal", mod: -20, type: 'enhanceLimit' }
    ]
];
Modifiers.Sleepy = [
    [
        { text: "sleeps 1/2 of the time", mod:  -8, type: 'constantMod', required: true },
        { text: "sleeps 2/3 of the time", mod: -16, type: 'constantMod' },
        { text: "sleeps 3/4 of the time", mod: -20, type: 'constantMod' },
        { text: "sleeps 7/8 of the time", mod: -26, type: 'constantMod' }
    ]
];
Modifiers.Smell = [
    [
        { text: "Detect Emotional state", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Offensive Odor: Common", mod: -50, type: 'enhanceLimit' },
        { text: "Offensive Odor: Occasionally", mod: -20, type: 'enhanceLimit' },
        { text: "Offensive Odor: Rare", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.Smoke = [
    [
        { text: "Can see through it", mod: 20, type: 'enhanceLimit' }
    ]
];
Modifiers.Snatcher = [
    [
        { text: "Permanent", mod: 300, type: 'enhanceLimit' }
    ],
    [
        { text: "Specialized: Only Metal", mod: -5, type: 'enhanceLimit' },
        { text: "Specialized: No Metal", mod: -20, type: 'enhanceLimit' },
        { text: "Specialized: Only Money", mod: -10, type: 'enhanceLimit' },
        { text: "Specialized: Only Weapons", mod: -10, type: 'enhanceLimit' },
        { text: "Specialized: Only Information", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "Stunning", mod: -10, type: 'enhanceLimit' }
    ],
    [
        { text: "Unpredictable", mod: -25, type: 'enhanceLimit' }
    ],
    [
        { text: "Weight limit: 3 lbs", mod:  -5, type: 'enhanceLimit' },
        { text: "Weight limit: 2 lbs", mod: -10, type: 'enhanceLimit' },
        { text: "Weight limit: 1 lb",  mod: -15, type: 'enhanceLimit' },
        { text: "Weight limit: 4 oz",  mod: -25, type: 'enhanceLimit' },
        { text: "Weight limit: 1 oz",  mod: -30, type: 'enhanceLimit' }
    ]
];
Modifiers.SpeakUnderwater = [
    [
        { text: "Communicate with people on the surface", mod: 50, type: 'enhanceLimit' }
    ]
];
Modifiers.SpeakwithAnimals = [
    [
        { text: "Specialized: Only One Type (land, aquatic, etc.)", mod: -40, type: 'enhanceLimit' },
        { text: "Specialized: Only One Class (Mammals, Birds, etc.)", mod: -50, type: 'enhanceLimit' },
        { text: "Specialized: Only One Family (Felines, Parrots, etc.)", mod: -60, type: 'enhanceLimit' },
        { text: "Specialized: Only One Species", mod: -80, type: 'enhanceLimit' }
    ]
];
Modifiers.SpiritEmpathy = [
    [
        { text: "Only One Spirit Class (Angels, Ghosts, etc.)", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.Strikers = [
    [
        { text: "Long, per SM+", mod: 100, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Cannot Parry", mod: -40, type: 'enhanceLimit' }
    ],
    [
        { text: "Clumsy, per -1 to hit", mod: -20, type: 'enhanceLimit', levels: true }
    ],
    [
        { text: "Limited Arc", mod: -40, type: 'enhanceLimit' }
    ],
    [
        { text: "Weak", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.subsonic = [
    [
        { text: "Low-Frequency Only", mod: 0, type: 'multiplier' }
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
        { text: "Reduced Fatigue Cost, per FP", mod: 20, type: 'enhanceLimit' }
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
        { text: "Costs Fatigue every use/minute, per FP", mod: -5, type: 'enhanceLimit' },
        { text: "Costs Fatigue each second, per FP", mod: -10, type: 'enhanceLimit' }
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
        { text: "Nuisance Effect (per -1 to Rxn)", mod: -5, type: 'enhanceLimit' }
    ],
    [
        { text: "Nuisance Effect (obvious)", mod: -5, type: 'enhanceLimit' }
    ],
    [
        { text: "Nuisance Effect (inconvenient)", mod: -5, type: 'enhanceLimit' }
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
        { text: "½D Range ÷2",            mod:  -5, type: 'enhanceLimit' },
        { text: "½D Range ÷5",            mod: -10, type: 'enhanceLimit' },
        { text: "Range (½D and Max) ÷2",  mod: -10, type: 'enhanceLimit' },
        { text: "½D Range ÷10",           mod: -15, type: 'enhanceLimit' },
        { text: "Range (½D and Max) ÷5",  mod: -20, type: 'enhanceLimit' },
        { text: "Range (½D and Max) ÷10", mod: -30, type: 'enhanceLimit' }
    ],
    [
        { text: "Takes Extra Time (per Ready time doubling)", mod: -10, type: 'enhanceLimit' }
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
Modifiers.Telecommunication = [
    [
        { text: "Universal", mod: 50, type: 'enhanceLimit' }
    ],
    [
        { text: "Video", mod: 40, type: 'enhanceLimit' }
    ],
    [
        { text: "Racial", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "Receive Only", mod: -50, type: 'enhanceLimit' },
        { text: "Send Only", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Vague", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.TP = [
    [
        { text: "Telepathic", mod: -10, type: 'enhanceLimit' }
    ]
];
Modifiers.Telesend = [
    [
        { text: "Broadcast", mod: 50, type: 'enhanceLimit' }
    ]
];
Modifiers.TeleViz = [
    [
        { text: "No Targeting", mod: -60, type: 'enhanceLimit' }
    ]
];
Modifiers.Temperature = [
    [
        { text: "Cold Only", mod: -50, type: 'enhanceLimit' },
        { text: "Heat Only", mod: -50, type: 'enhanceLimit' }
    ]
];
Modifiers.terrain = [
    [
        { text: "One Terrain Only", mod: 0, type: 'multiplier' }
    ]
];
Modifiers.Timesickness = [
    [
        { text: "Severity: Nuisance", mod: -2, type: 'constantMod' },
        { text: "Severity: Mild", mod: -5, type: 'constantMod', required: true },
        { text: "Severity: Severe", mod: -10, type: 'constantMod' },
        { text: "Severity: Very Severe", mod: -15, type: 'constantMod' },
        { text: "Severity: Nightmare", mod: -15, type: 'constantMod' },
        { text: "Severity: Critical", mod: -20, type: 'constantMod' }
    ],
    [
        { text: "Frequency: Rare", mod: '1/2', type: 'multiplier' },
        { text: "Frequency: Frequent", mod: 1, type: 'multiplier', required: true },
        { text: "Frequency: Very Frequent", mod: '3/2', type: 'multiplier' },
        { text: "Frequency: Acute", mod: 2, type: 'multiplier' }
    ]
];
Modifiers.Unaging = [
    [
        { text: "Age in Either Direction At Will", mod: 20, type: 'enhanceLimit' }
    ]
];
Modifiers.Unkillable = [
    [
        { text: "Achille's Heel: Rare", mod: -10, type: 'enhanceLimit' },
        { text: "Achille's Heel: Occasional", mod: -30, type: 'enhanceLimit' },
        { text: "Achille's Heel: Common", mod: -50, type: 'enhanceLimit' }
    ],
    [
        { text: "Hindrance: Rare", mod: -5, type: 'enhanceLimit' },
        { text: "Hindrance: Occasional", mod: -15, type: 'enhanceLimit' },
        { text: "Hindrance: Common", mod: -25, type: 'enhanceLimit' }
    ],
    [
        { text: "Reincarnation", mod: -20, type: 'enhanceLimit' }
    ],
    [
        { text: "Trigger: Rare", mod: -25, type: 'enhanceLimit' },
        { text: "Trigger: Occasional", mod: -15, type: 'enhanceLimit' },
        { text: "Trigger: Common", mod: -5, type: 'enhanceLimit' }
    ]
];
Modifiers.Variable = [
    [
        { text: "Sensitive to received intensity (÷2 for barriers, ×2 for intense sources)", mod: -40, type: 'enhanceLimit' }
    ]
];
Modifiers.VibSense = [
    [
        { text: "Universal (air and water)", mod: 50, type: 'enhanceLimit' }
    ]
];
Modifiers.vision = [
    [
        { text: "Mitigator - glasses, contact lenses, <i>etc.</i>", mod: -60, type: 'enhanceLimit' }
    ]
];
Modifiers.Vulnerability = [
    [
        { text: "Damage ×2", mod: 2, type: 'multiplier', required: true },
        { text: "Damage ×3", mod: 3, type: 'multiplier' },
        { text: "Damage ×4", mod: 4, type: 'multiplier' }
    ]
];
/*Modifiers.Vulnerability = [
    [
        { text: "rare attack",        mod:  -5, type: 'constantMod', required: true },
        { text: "occasional attack",  mod: -10, type: 'constantMod' },
        { text: "common attack",      mod: -15, type: 'constantMod' },
        { text: "very common attack", mod: -20, type: 'constantMod' },
    ]
];*/
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
Modifiers.WildTalent = [
    [
        { text: "Retention", mod: 25, type: 'enhanceLimit' }
    ],
    [
        { text: "Focused: Mental skills only", mod: -20, type: 'enhanceLimit' },
        { text: "Focused: Physical skills only", mod: -20, type: 'enhanceLimit' },
        { text: "Focused: Chi skills only", mod: -20, type: 'enhanceLimit' }
    ]
];


/****  Bonuses & Penalties  ****/
/*  Adjustments
  properties
    from:           key for adjustment basis (usually a Trait)
    amount:         number; how (much) the target value should be changed by this adjustment (per level of basis, if applicable, but see "per" property)
    target:         key for object with a numerical value in a Character object, which will be changed by the adjustment amount; a Skill, Group, or Character property
    valid target values include:
      *  any Skill object key (must also set targetCategory = "SK")
      *  any Group object key (must also set targetCategory = "GR" or "CL")
      *  any Character class method which can be called with NO arguments, returning a numerical value
      other target values may not be supported
  optional properties
    targetSpec:     when only one specialization of the target should be affected by the adjustment, indicate which to adjust, for targets which have specs
    targetCategory: SK (Skill), GR|CL (Group), or Character property type such as stat, defense, movement, etc.  (only sporadically used in practice, less useful than you'd think)
    type:           flag for non-standard adjustments; most often used to designate a multiplicative adjustment (type: '*')
    per:            Boolean; defaults to true, but when set to false indicates that a target should have the adjustment amount applied only once even if the from object has levels
    upto:           for adjustments with a cap on how many levels can be applied, indicate highest level to use

*/
Adjustments = {};

Adjustments.Acrobatics_from_PerfectBalance = { from: 'PerfectBalance', amount: 1, targetCategory: 'SK', target: 'Acrobatics' };
Adjustments.Acting_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Acting' };
// Acting_from_Shyness adjustment taken care of by 'People Skills' adjustment
// Adjustments.ActiveDefense_from_CombatReflexes    = { from: 'CombatReflexes',    amount: 1, targetCategory: 'defense', target: 'ActiveDefense' };  // split and directly target Block, Dodge, and Parry (DONE)
// Adjustments.ActiveDefense_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', amount: 1, targetCategory: 'defense', target: 'ActiveDefense' };  // split and directly target Block, Dodge, and Parry (DONE)
Adjustments.Aerobatics_from_PerfectBalance = { from: 'PerfectBalance', amount: 1, targetCategory: 'SK', target: 'Aerobatics' };
Adjustments.Aerobatics_from_SpatialSense3D = { from: 'SpatialSense3D', amount: 2, targetCategory: 'SK', target: 'Aerobatics' };
Adjustments.Aging_from_ExtendedLifespan = { from: 'ExtendedLifespan', amount: 2,   type: '*', target: 'Aging' };
Adjustments.Aging_from_ShortLifespan    = { from: 'ShortLifespan',    amount: 1/2, type: '*', target: 'Aging' };
Adjustments.AirMove_from_DecreasedAirMove = { from: 'DecreasedAirMove', amount: -1, targetCategory: 'movement', target: 'AirMove' };
Adjustments.AirMove_from_IncreasedAirMove = { from: 'IncreasedAirMove', amount:  1, targetCategory: 'movement', target: 'AirMove' };
// Adjustments.AirMove_from_EnhancedMoveAir = { from: 'EnhancedMoveAir', amount: 1.414, target: 'AirMove', type: '*' };  // Enhanced Move (env) advantages come in half-levels
//Adjustments.Animal_from_AnimalEmpathy = { from: 'AnimalEmpathy', amount: 4, targetCategory: 'CL', target: 'Animal' };
Adjustments.Aquabatics_from_PerfectBalance = { from: 'PerfectBalance', amount: 1, targetCategory: 'SK', target: 'Aquabatics' };
Adjustments.Artistic_from_Versatile = { from: 'Versatile', amount: 1, targetCategory: 'CL', target: 'Artistic' };

Adjustments.BlindFighting_from_AcuteHearing    = { from: 'AcuteHearing',    amount: 1, targetCategory: 'SK', target: 'BlindFighting' };
Adjustments.BlindFighting_from_ESPTalent       = { from: 'ESPTalent',       amount: 1, targetCategory: 'SK', target: 'BlindFighting' };
Adjustments.BlindFighting_from_TelepathyTalent = { from: 'TelepathyTalent', amount: 1, targetCategory: 'SK', target: 'BlindFighting' };
Adjustments.Block_from_CombatReflexes      = { from: 'CombatReflexes',      amount: 1, targetCategory: 'defense', target: 'Block' };
Adjustments.Block_from_EnhancedBlockCloak  = { from: 'EnhancedBlockCloak',  amount: 1, targetCategory: 'defense', target: 'Block' };
Adjustments.Block_from_EnhancedBlockShield = { from: 'EnhancedBlockShield', amount: 1, targetCategory: 'defense', target: 'Block' };
Adjustments.Block_from_EnhancedTimeSense   = { from: 'EnhancedTimeSense',   amount: 1, targetCategory: 'defense', target: 'Block' };
Adjustments.BodyLanguage_from_AcuteVision = { from: 'AcuteVision', amount: 1, targetCategory: 'SK', target: 'BodyLanguage' };
Adjustments.BodySense_from_SpatialSense3D    = { from: 'SpatialSense3D',    amount: 3, targetCategory: 'SK', target: 'BodySense' };
Adjustments.BodySense_from_AbsoluteDirection = { from: 'AbsoluteDirection', amount: 3, targetCategory: 'SK', target: 'BodySense' };

Adjustments.Captivate_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Captivate' };
Adjustments.Carousing_from_Killjoy    = { from: 'Killjoy',    amount: -3, targetCategory: 'SK', target: 'Carousing' };
Adjustments.Carousing_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Carousing' };
// Carousing_from_Shyness adjustment taken care of by 'People Skills' adjustment
Adjustments.Climbing_from_BadGrip        = { from: 'BadGrip',        amount: -2, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_Brachiator     = { from: 'Brachiator',     amount:  2, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_DoubleJointed  = { from: 'DoubleJointed',  amount:  5, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_Flexibility    = { from: 'Flexibility',    amount:  3, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Climbing_from_PerfectBalance = { from: 'PerfectBalance', amount:  1, targetCategory: 'SK', target: 'Climbing' };
Adjustments.Computer_from_IntuitiveMathematician = { from: 'IntuitiveMathematician',    amount: 3, targetCategory: 'GR', target: 'Computer' };
Adjustments.Connoisseur_from_Killjoy = { from: 'Killjoy', amount: -3, targetCategory: 'SK', target: 'Connoisseur' };
Adjustments.Criminology_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Criminology' };

Adjustments.DetectLies_from_Sensitive  = { from: 'Sensitive',  amount:  1, targetCategory: 'SK', target: 'DetectLies' };
Adjustments.DetectLies_from_Empathy    = { from: 'Empathy',    amount:  3, targetCategory: 'SK', target: 'DetectLies' };
Adjustments.DetectLies_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'DetectLies' };
Adjustments.Diplomacy_from_Voice      = { from: 'Voice',      amount:  2, targetCategory: 'SK', target: 'Diplomacy' };
Adjustments.Diplomacy_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Diplomacy' };
Adjustments.Diplomacy_from_Oblivious  = { from: 'Oblivious',  amount: -1, targetCategory: 'SK', target: 'Diplomacy' };
Adjustments.Diplomacy_from_Stuttering = { from: 'Stuttering', amount: -2, targetCategory: 'SK', target: 'Diplomacy' };
// Diplomacy_from_Shyness adjustment taken care of by 'People Skills' adjustment
Adjustments.Disguise_from_Dwarfism    = { from: 'Dwarfism',    amount: -2, targetCategory: 'SK', target: 'Disguise' };
Adjustments.Disguise_from_ElasticSkin = { from: 'ElasticSkin', amount:  4, targetCategory: 'SK', target: 'Disguise' };
Adjustments.Disguise_from_Fat         = { from: 'Fat',         amount: -2, targetCategory: 'SK', target: 'Disguise' };
Adjustments.Disguise_from_Gigantism   = { from: 'Gigantism',   amount: -2, targetCategory: 'SK', target: 'Disguise' };
Adjustments.Disguise_from_Overweight  = { from: 'Overweight',  amount: -1, targetCategory: 'SK', target: 'Disguise' };
Adjustments.Disguise_from_VeryFat     = { from: 'VeryFat',     amount: -3, targetCategory: 'SK', target: 'Disguise' };
Adjustments.Dodge_from_CombatReflexes    = { from: 'CombatReflexes',    amount: 1, targetCategory: 'defense', target: 'Dodge' };
Adjustments.Dodge_from_EnhancedDodge     = { from: 'EnhancedDodge',     amount: 1, targetCategory: 'defense', target: 'Dodge' };
Adjustments.Dodge_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', amount: 1, targetCategory: 'defense', target: 'Dodge' };
// Adjustments.DR_from_Absorptiontype = { from: 'Absorptiontype', amount: 2, target: 'DR' };
Adjustments.DR_from_DamageResistance = { from: 'DamageResistance', amount: 1, target: 'DR' };
// Adjustments.DR_from_HideThickHide = { from: 'HideThickHide', amount: 1, target: 'DR' };
// Adjustments.DR_from_IncreasedDensity = { from: 'IncreasedDensity', amount: 1, target: 'DR' };
// Adjustments.DR_from_ScalesArmorPlates = { from: 'ScalesArmorPlates', amount: 3, target: 'DR' };
// Adjustments.DR_from_ScalesCarapace = { from: 'ScalesCarapace', amount: 2, target: 'DR' };
// Adjustments.DR_from_ScalesHeavy = { from: 'ScalesHeavy', amount: 1, target: 'DR' };
// Adjustments.DR_from_ScalesNormal = { from: 'ScalesNormal', amount: 1, target: 'DR' };
// Adjustments.DR_from_Toughness = { from: 'Toughness', amount: 1, target: 'DR' };
// Adjustments.DR_from_VacuumAdaptation = { from: 'VacuumAdaptation', amount: 1, target: 'DR' };
Adjustments.DX_from_DecreasedDX = { from: 'DecreasedDX', amount: -1, targetCategory: 'stats', target: 'DX' };
Adjustments.DX_from_IncreasedDX = { from: 'IncreasedDX', amount:  1, targetCategory: 'stats', target: 'DX' };

Adjustments.Engineering_from_IntuitiveMathematician = { from: 'IntuitiveMathematician', amount: 2, targetCategory: 'GR', target: 'Engineering' };
Adjustments.Engineering_from_Versatile = { from: 'Versatile', amount: 1, targetCategory: 'GR', target: 'Engineering' };
Adjustments.EroticArt_from_DoubleJointed = { from: 'DoubleJointed', amount: 5, targetCategory: 'SK', target: 'EroticArt' };
Adjustments.EroticArt_from_Flexibility = { from: 'Flexibility', amount: 3, targetCategory: 'SK', target: 'EroticArt' };
Adjustments.EroticArt_from_Killjoy = { from: 'Killjoy', amount: -3, targetCategory: 'SK', target: 'EroticArt' };
Adjustments.Escape_from_DoubleJointed = { from: 'DoubleJointed', amount: 5, targetCategory: 'SK', target: 'Escape' };
Adjustments.Escape_from_Flexibility   = { from: 'Flexibility',   amount: 3, targetCategory: 'SK', target: 'Escape' };
Adjustments.Escape_from_Slippery = { from: 'Slippery', amount: 1, targetCategory: 'SK', target: 'Escape' };

Adjustments.Exorcism_baseline_penalty        = { from: 'always',             amount: -4, targetCategory: 'SK', target: 'Exorcism'/*, fromCategory: 'stats'*/ };
Adjustments.Exorcism_from_BlessedHeroicFeats = { from: 'BlessedHeroicFeats', amount:  4, targetCategory: 'SK', target: 'Exorcism' };
Adjustments.Exorcism_from_BlessedDivination  = { from: 'BlessedDivination',  amount:  4, targetCategory: 'SK', target: 'Exorcism', per: false };
Adjustments.Exorcism_from_PowerInvestiture   = { from: 'PowerInvestiture',   amount:  4, targetCategory: 'SK', target: 'Exorcism', per: false };
Adjustments.Exorcism_from_TrueFaith          = { from: 'TrueFaith',          amount:  4, targetCategory: 'SK', target: 'Exorcism' };

Adjustments.FastDraw_from_CombatReflexes = { from: 'CombatReflexes', amount: 1, targetCategory: 'SK', target: 'FastDraw' };
Adjustments.FastDraw_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', amount: 1, targetCategory: 'SK', target: 'FastDraw' };
Adjustments.FastDraw_from_HamFisted = { from: 'HamFisted', amount: -3, targetCategory: 'SK', target: 'FastDraw' };
Adjustments.FastTalk_from_Voice = { from: 'Voice', amount: 2, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.FastTalk_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.FastTalk_from_Oblivious = { from: 'Oblivious', amount: -1, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.FastTalk_from_Stuttering = { from: 'Stuttering', amount: -2, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.FastTalk_from_Truthfulness = { from: 'Truthfulness', amount: -5, targetCategory: 'SK', target: 'FastTalk' };
Adjustments.FastTalk_from_SubsonicSpeech = { from: 'SubsonicSpeech', amount: -2, targetCategory: '"SK', target: 'FastTalk' };
// Adjustments.Fatigue_from_ExtraFatigue = { from: 'ExtraFatigue', amount: 1, targetCategory: 'stats', target: 'Fatigue' };
// Adjustments.Fatigue_from_ExtraFatigueRacial = { from: 'ExtraFatigueRacial', amount: 1, targetCategory: 'stats', target: 'Fatigue' };
Adjustments.Fatigue_from_DecreasedFatigue = { from: 'DecreasedFatigue', amount: -1, targetCategory: 'stats', target: 'Fatigue' };
Adjustments.Fatigue_from_IncreasedFP = { from: 'IncreasedFP', amount: 1, targetCategory: 'stats', target: 'Fatigue' };
// Adjustments.FazSense_from_AcuteFaz = { from: 'AcuteFaz', amount: 1, targetCategory: 'sense', target: 'FazSense' };
Adjustments.Flight_from_SpatialSense3D = { from: 'SpatialSense3D', amount: 2, targetCategory: 'SK', target: 'Flight' };
Adjustments.Flight_from_PerfectBalance = { from: 'PerfectBalance', amount: 1, targetCategory: 'SK', target: 'Flight' };
// no adjustments to Fly, which is analogous to Speed (all adjustments apply to Air Move instead; Fly depends *only* on Basic Speed)
Adjustments.FortuneTelling_from_Charisma = { from: 'Charisma', amount: 1, targetCategory: 'SK', target: 'FortuneTelling' };
Adjustments.FortuneTelling_from_Sensitive = { from: 'Sensitive', amount: 1, targetCategory: 'SK', target: 'FortuneTelling' };
Adjustments.FortuneTelling_from_Empathy = { from: 'Empathy', amount: 3, targetCategory: 'SK', target: 'FortuneTelling' };
Adjustments.FreeFall_from_SpatialSense3D = { from: 'SpatialSense3D', amount: 2, targetCategory: 'SK', target: 'FreeFall' };
// Adjustments.FrightCheck_from_Collected = { from: 'Collected', amount: 3, targetCategory: '', target: 'FrightCheck' };
Adjustments.FrightCheck_from_CombatReflexes    = { from: 'CombatReflexes', amount: 2, targetCategory: '', target: 'FrightCheck' };
// Adjustments.FrightCheck_from_CoolMundane = { from: 'CoolMundane', amount: 1, targetCategory: '', target: 'FrightCheck' };
// Adjustments.FrightCheck_from_Edgy = { from: 'Edgy', amount: -1, targetCategory: '', target: 'FrightCheck' };
Adjustments.FrightCheck_from_EnhancedTimeSense = { from: 'EnhancedTimeSense', amount: 2, targetCategory: '', target: 'FrightCheck' };
Adjustments.FrightCheck_from_Fearlessness = { from: 'Fearlessness', amount: 1, targetCategory: '', target: 'FrightCheck' };
// Adjustments.FrightCheck_from_Imperturbable = { from: 'Imperturbable', amount: 5, targetCategory: '', target: 'FrightCheck' };

Adjustments.Gambling_from_Killjoy = { from: 'Killjoy', amount: -3, targetCategory: 'SK', target: 'Gambling' };

Adjustments.Hearing_from_AcuteHearing = { from: 'AcuteHearing', amount: 1, targetCategory: 'sense', target: 'Hearing' };
Adjustments.Hearing_from_HardofHearing = { from: 'HardOfHearing', amount: -4, targetCategory: 'sense', target: 'Hearing' };
Adjustments.HitPoints_from_IncreasedHP = { from: 'IncreasedHP', amount: 1, target: 'HP', targetCategory: 'stats' };
Adjustments.HitPoints_from_DecreasedHitPoints = { from: 'DecreasedHitPoints', amount: -1, target: 'HP', targetCategory: 'stats' };
Adjustments.HT_from_DecreasedHT = { from: 'DecreasedHT', amount: -1, targetCategory: 'stats', target: 'HT' };
Adjustments.HT_from_IncreasedHT = { from: 'IncreasedHT', amount:  1, targetCategory: 'stats', target: 'HT' };

Adjustments.Interrogation_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Interrogation' };
Adjustments.IQ_from_DecreasedIQ = { from: 'DecreasedIQ', amount: -1, targetCategory: 'stats', target: 'IQ' };
Adjustments.IQ_from_IncreasedIQ = { from: 'IncreasedIQ', amount:  1, targetCategory: 'stats', target: 'IQ' };
Adjustments.ImmovableStance_from_PerfectBalance = { from: 'PerfectBalance', amount: 4, targetCategory: 'SK', target: 'ImmovableStance' };
Adjustments.Intimidation_from_Hideous   = { from: 'Hideous',   amount:  2, targetCategory: 'SK', target: 'Intimidation' };
Adjustments.Intimidation_from_Monstrous = { from: 'Monstrous', amount:  3, targetCategory: 'SK', target: 'Intimidation' };
Adjustments.Intimidation_from_Horrific  = { from: 'Horrific',  amount:  4, targetCategory: 'SK', target: 'Intimidation' };
Adjustments.Intimidation_from_Oblivious = { from: 'Oblivious', amount: -1, targetCategory: 'SK', target: 'Intimidation' };

Adjustments.Language_from_LanguageTalent = { from: 'LanguageTalent', amount: 1, targetCategory: 'AD', target: 'Language' };
Adjustments.Leadership_from_Charisma   = { from: 'Charisma',   amount:  1, targetCategory: 'SK', target: 'Leadership' };
Adjustments.Leadership_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Leadership' };
Adjustments.Linguistics_from_CulturalAdaptability = { from: 'CulturalAdaptability', amount: 2, targetCategory: 'SK', target: 'Linguistics' };
Adjustments.Linguistics_from_LanguageTalent = { from: 'LanguageTalent', amount: 1, targetCategory: 'SK', target: 'Linguistics' };
// these apply only for DX-based Lockpicking rolls

// Adjustments.Manual_from_ManualDexterity = { from: 'ManualDexterity', amount: 1, targetCategory: 'GR', target: 'Manual' };
Adjustments.ManualDexteritySkills_from_ManualDexterity = { from: 'ManualDexterity', amount:  1, targetCategory: 'GR', target: 'ManualDexteritySkills' };
Adjustments.ManualDexteritySkills_from_HamFisted       = { from: 'HamFisted',       amount: -3, targetCategory: 'GR', target: 'ManualDexteritySkills' };
Adjustments.Math_from_IntuitiveMathematician = { from: 'IntuitiveMathematician', amount: 3, targetCategory: 'GR', target: 'Math' };
// Adjustments.Mechanic_from_DoubleJointed = { from: 'DoubleJointed', amount: 3, targetCategory: 'SK', target: 'Mechanic' };
// Adjustments.Mechanic_from_Flexibility   = { from: 'Flexibility',   amount: 5, targetCategory: 'SK', target: 'Mechanic', per: false };
// Adjustments.Mechanic_from_Stretching    = { from: 'Stretching',    amount: 5, targetCategory: 'SK', target: 'Mechanic', per: false };
Adjustments.MeleeWeaponSkills_from_BadGrip  = { from: 'BadGrip',  amount: -2, targetCategory: 'GR', target: 'MeleeWeaponSkills' };
Adjustments.MentalStrength_from_StrongWill = { from: 'StrongWill', amount:  1, targetCategory: 'SK', target: 'MentalStrength' };
Adjustments.MentalStrength_from_WeakWill   = { from: 'WeakWill',   amount: -1, targetCategory: 'SK', target: 'MentalStrength' };
// Adjustments.Merchant_from_CompulsiveSpendthriftMild = { from: 'CompulsiveSpendthriftMild', amount: -1, targetCategory: 'SK', target: 'Merchant' };
// Adjustments.Merchant_from_CompulsiveSpendthriftSerious = { from: 'CompulsiveSpendthriftSerious', amount: -2, targetCategory: 'SK', target: 'Merchant' };
// Adjustments.Merchant_from_CompulsiveSpendthriftWastrel = { from: 'CompulsiveSpendthriftWastrel', amount: -5, targetCategory: 'SK', target: 'Merchant' };
// Adjustments.Merchant_from_CompulsiveSpendingMild = { from: 'CompulsiveSpendingMild', amount: -1, targetCategory: 'SK', target: 'Merchant' };
// Adjustments.Merchant_from_CompulsiveSpendingSerious = { from: 'CompulsiveSpendingSerious', amount: -2, targetCategory: 'SK', target: 'Merchant' };
// Adjustments.Merchant_from_CompulsiveSpendingWastrel = { from: 'CompulsiveSpendingWastrel', amount: -5, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Merchant_from_Gullibility = { from: 'Gullibility', amount: -3, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Merchant_from_LowEmpathy  = { from: 'LowEmpathy',  amount: -3, targetCategory: 'SK', target: 'Merchant' };
Adjustments.Move_from_DecreasedBasicMove = { from: 'DecreasedBasicMove', amount: -1, targetCategory: 'movement', target: 'Move' };
Adjustments.Move_from_Dwarfism           = { from: 'Dwarfism',           amount: -1, targetCategory: 'movement', target: 'Move' };
Adjustments.Move_from_Gigantism          = { from: 'Gigantism',          amount:  1, targetCategory: 'movement', target: 'Move' };
Adjustments.Move_from_IncreasedBasicMove = { from: 'IncreasedBasicMove', amount:  1, targetCategory: 'movement', target: 'Move' };
Adjustments.Music_from_MusicalAbilityTalent = { from: 'MusicalAbilityTalent', amount: 1, targetCategory: 'GR', target: 'Music' };

Adjustments.NavigationSea_from_AbsoluteDirection     = { from: 'AbsoluteDirection', amount: 3, targetCategory: 'SK', target: 'Navigation', targetSpec: 'Sea' };
Adjustments.NavigationAir_from_AbsoluteDirection     = { from: 'AbsoluteDirection', amount: 3, targetCategory: 'SK', target: 'Navigation', targetSpec: 'Air' };
Adjustments.NavigationLand_from_AbsoluteDirection    = { from: 'AbsoluteDirection', amount: 3, targetCategory: 'SK', target: 'Navigation', targetSpec: 'Land' };
Adjustments.NavigationSpace_from_SpatialSense3D      = { from: 'SpatialSense3D',    amount: 2, targetCategory: 'SK', target: 'Navigation', targetSpec: 'Space' };
Adjustments.NavigationHyperspace_from_SpatialSense3D = { from: 'SpatialSense3D',    amount: 2, targetCategory: 'SK', target: 'Navigation', targetSpec: 'Hyperspace' };

Adjustments.Panhandling_from_Charisma = { from: 'Charisma', amount:  1, targetCategory: 'SK', target: 'Panhandling' };
Adjustments.Parry_from_CombatReflexes      = { from: 'CombatReflexes',      amount: 1, targetCategory: 'defense', target: 'Parry' };
Adjustments.Parry_from_EnhancedParry       = { from: 'EnhancedParry',       amount: 1, targetCategory: 'defense', target: 'Parry' };
Adjustments.Parry_from_EnhancedParryHands  = { from: 'EnhancedParryHands',  amount: 1, targetCategory: 'defense', target: 'HandParry' };
Adjustments.Parry_from_EnhancedParryWeapon = { from: 'EnhancedParryWeapon', amount: 1, targetCategory: 'defense', target: 'WeaponParry' };
Adjustments.Parry_from_EnhancedTimeSense   = { from: 'EnhancedTimeSense',   amount: 1, targetCategory: 'defense', target: 'Parry' };
Adjustments.PathofBodyControl_from_MageryRitual          = { target: 'PathofBodyControl',          targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofCommunicationEmpathy_from_MageryRitual = { target: 'PathofCommunicationEmpathy', targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofEarth_from_MageryRitual                = { target: 'PathofEarth',                targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofAir_from_MageryRitual                  = { target: 'PathofAir',                  targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofFire_from_MageryRitual                 = { target: 'PathofFire',                 targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofWater_from_MageryRitual                = { target: 'PathofWater',                targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofEnchantment_from_MageryRitual          = { target: 'PathofEnchantment',          targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofGate_from_MageryRitual                 = { target: 'PathofGate',                 targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofHealing_from_MageryRitual              = { target: 'PathofHealing',              targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofKnowledge_from_MageryRitual            = { target: 'PathofKnowledge',            targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofLightDarkness_from_MageryRitual        = { target: 'PathofLightDarkness',        targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofMetaSpells_from_MageryRitual           = { target: 'PathofMetaSpells',           targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofMindControl_from_MageryRitual          = { target: 'PathofMindControl',          targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofMovement_from_MageryRitual             = { target: 'PathofMovement',             targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofNecromancy_from_MageryRitual           = { target: 'PathofNecromancy',           targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PathofProtectionWarning_from_MageryRitual    = { target: 'PathofProtectionWarning',    targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
Adjustments.PeopleSkills_from_Shyness = { from: 'Shyness', amount: -1, targetCategory: 'GR', target: 'PeopleSkills' };
Adjustments.Per_from_DecreasedPer = { from: 'DecreasedPer', amount: -1, targetCategory: 'stats', target: 'Per' };
Adjustments.Per_from_IncreasedPer = { from: 'IncreasedPer', amount: 1, targetCategory: 'stats', target: 'Per' };
Adjustments.Per_from_Alertness = { from: 'Alertness', amount: 1, targetCategory: 'stats', target: 'Per' };	// for 3rd-edition characters
Adjustments.Performance_from_Voice      = { from: 'Voice',      amount:  2, targetCategory: 'SK', target: 'Performance' };
Adjustments.Performance_from_Stuttering = { from: 'Stuttering', amount: -2, targetCategory: 'SK', target: 'Performance' };
Adjustments.Persuade_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Persuade' };
Adjustments.Piloting_from_SpatialSense3D = { from: 'SpatialSense3D', amount: 1, targetCategory: 'SK', target: 'Piloting' };
Adjustments.Piloting_from_PerfectBalance = { from: 'PerfectBalance', amount: 1, targetCategory: 'SK', target: 'Piloting' };
Adjustments.PlantCare_from_PlantEmpathy = { from: 'PlantEmpathy', amount: 4, targetCategory: 'GR', target: 'PlantCare' };
Adjustments.PlantID_from_PlantEmpathy = { from: 'PlantEmpathy', amount: 2, targetCategory: 'GR', target: 'PlantID' };
Adjustments.Politics_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Politics' };
Adjustments.Politics_from_Voice      = { from: 'Voice', amount:  2, targetCategory: 'SK', target: 'Politics' };
// not clear any of the Psychology modifiers should be enshrined as real Adjustments, as they are all somewhat conditional
// Adjustments.Psychology_from_Sensitive  = { from: 'Sensitive', amount: 1, targetCategory: 'SK', target: 'Psychology' };
// Adjustments.Psychology_from_Empathy    = { from: 'Empathy', amount: 3, targetCategory: 'SK', target: 'Psychology' };
// Adjustments.Psychology_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Psychology' };
// Adjustments.Psychology_from_Callous    = { from: 'Callous', amount: -3, targetCategory: 'SK', target: 'Psychology' };
Adjustments.PublicSpeaking_from_Charisma   = { from: 'Charisma',   amount:  1, targetCategory: 'SK', target: 'PublicSpeaking' };
Adjustments.PublicSpeaking_from_Voice      = { from: 'Voice',      amount:  2, targetCategory: 'SK', target: 'PublicSpeaking' };
Adjustments.PublicSpeaking_from_Stuttering = { from: 'Stuttering', amount: -2, targetCategory: 'SK', target: 'PublicSpeaking' };

// Adjustments.Reaction_from_Appearance           = { from: 'Appearance',           amount: 1, targetCategory: 'GR', target: 'Reaction' }
Adjustments.Reaction_from_Charisma             = { from: 'Charisma',             amount: 1, targetCategory: 'GR', target: 'Reaction' };
Adjustments.Reaction_from_CulturalAdaptability = { from: 'CulturalAdaptability', amount: 1, targetCategory: 'GR', target: 'Reaction' };
//Adjustments.Reputation_from_Reputation = { from: 'Reputation', amount: 1, target: 'Reputation' };
Adjustments.RitualMagic_from_MageryRitual = { from: 'MageryRitual', amount: 1, targetCategory: 'SK', target: 'RitualMagic' };

Adjustments.SavoirFaire_from_Clueless   = { from: 'Clueless',   amount: -4, targetCategory: 'SK', target: 'SavoirFaire' };
Adjustments.SavoirFaire_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'SavoirFaire' };
Adjustments.SavoirFaire_from_Oblivious  = { from: 'Oblivious',  amount: -1, targetCategory: 'SK', target: 'SavoirFaire' };
Adjustments.SexAppeal_from_Voice      = { from: 'Voice',      amount:  2, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Oblivious  = { from: 'Oblivious',  amount: -1, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Stuttering = { from: 'Stuttering', amount: -2, targetCategory: 'SK', target: 'SexAppeal' };
// SexAppeal_from_Shyness adjustment taken care of by 'People Skills' adjustment
Adjustments.SexAppeal_from_Horrific      = { from: 'Horrific',      amount: -12, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Monstrous     = { from: 'Monstrous',     amount: -10, targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Hideous       = { from: 'Hideous',       amount: -8,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Ugly          = { from: 'Ugly',          amount: -4,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Unattractive  = { from: 'Unattractive',  amount: -2,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Attractive    = { from: 'Attractive',    amount:  1,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Appearance    = { from: 'Appearance',    amount:  2,  targetCategory: 'SK', target: 'SexAppeal' };   // this one has levels (doing it this way is only wrong for someone with Appearance 1 (attractive), which this Adjustment will give a +2 to Sex Appeal for, when it should just be +1
Adjustments.SexAppeal_from_Handsome      = { from: 'Handsome',      amount:  4,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Beautiful     = { from: 'Beautiful',     amount:  4,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_VeryHandsome  = { from: 'VeryHandsome',  amount:  6,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_VeryBeautiful = { from: 'VeryBeautiful', amount:  6,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.SexAppeal_from_Transcendent  = { from: 'Transcendent',  amount:  8,  targetCategory: 'SK', target: 'SexAppeal' };
Adjustments.Singing_from_Voice      = { from: 'Voice',      amount:  2, targetCategory: 'SK', target: 'Singing' };
Adjustments.Singing_from_Stuttering = { from: 'Stuttering', amount: -2, targetCategory: 'SK', target: 'Singing' };
Adjustments.Social_from_CulturalAdaptability = { from: 'CulturalAdaptability', amount:  1, targetCategory: 'CL', target: 'Social' };
Adjustments.Social_from_Oblivious            = { from: 'Oblivious',            amount: -1, targetCategory: 'CL', target: 'Social' };
Adjustments.Speed_from_DecreasedSpeed = { from: 'DecreasedSpeed', amount: -0.25, targetCategory: 'movement', target: 'Speed' };
Adjustments.Speed_from_IncreasedSpeed = { from: 'IncreasedSpeed', amount:  0.25, targetCategory: 'movement', target: 'Speed' };
Adjustments.Spells_from_Magery            = { from: 'Magery',      amount: 1, targetCategory: 'GR', target: 'Spells' };
Adjustments.AirSpells_from_AirMagery      = { from: 'MageryAir',   amount: 1, targetCategory: 'GR', target: 'AirSpells' };
Adjustments.EarthSpells_from_EarthMagery  = { from: 'MageryEarth', amount: 1, targetCategory: 'GR', target: 'EarthSpells' };
Adjustments.FireSpells_from_FireMagery    = { from: 'MageryFire',  amount: 1, targetCategory: 'GR', target: 'FireSpells' };
Adjustments.WaterSpells_from_WaterMagery  = { from: 'MageryWater', amount: 1, targetCategory: 'GR', target: 'WaterSpells' };
Adjustments.BCSpells_from_BodyMagery      = { from: 'MageryBody',  amount: 1, targetCategory: 'GR', target: 'BodyControlSpells' };
Adjustments.CESpells_from_TalkMagery      = { from: 'MageryTalk',  amount: 1, targetCategory: 'GR', target: 'CommunicationEmpathySpells' };
Adjustments.HealingSpells_from_LifeMagery = { from: 'MageryLife',  amount: 1, targetCategory: 'GR', target: 'HealingSpells' };
Adjustments.NecSpells_from_DeathMagery    = { from: 'MageryDeath', amount: 1, targetCategory: 'GR', target: 'NecromanticSpells' };
Adjustments.MCSpells_from_MindMagery      = { from: 'MageryMind',  amount: 1, targetCategory: 'GR', target: 'MindControlSpells' };
Adjustments.LDSpells_from_LightMagery     = { from: 'MageryLight', amount: 1, targetCategory: 'GR', target: 'LightDarknessSpells' };
Adjustments.MovementSpells_from_MoveMagery= { from: 'MageryMove',  amount: 1, targetCategory: 'GR', target: 'MovementSpells' };
Adjustments.KnowledgeSpells_from_KenMagery= { from: 'MageryKen',   amount: 1, targetCategory: 'GR', target: 'KnowledgeSpells' };
Adjustments.MetaSpells_from_MetaMagery    = { from: 'MageryMeta',  amount: 1, targetCategory: 'GR', target: 'MetaSpells' };
Adjustments.PWSpells_from_WardMagery      = { from: 'MageryWard',  amount: 1, targetCategory: 'GR', target: 'ProtectionWarningSpells' };
Adjustments.Spells_from_PowerInvestiture = { from: 'PowerInvestiture', amount: 1, targetCategory: 'GR', target: 'Spells' };
Adjustments.ST_from_DecreasedST = { from: 'DecreasedST', amount: -1, targetCategory: 'stats', target: 'ST' };
Adjustments.ST_from_IncreasedST = { from: 'IncreasedST', amount:  1, targetCategory: 'stats', target: 'ST' };
// Adjustments.Status_from_Status                = { from: 'Status',               amount: 1,          targetCategory: 'AD', target: 'Status' };  // remove; Status is being calculated by starting with levels of the Status advantage anyway
Adjustments.Status_from_WealthWealthyx5       = { from: 'WealthWealthyx5',      amount: 1,          targetCategory: 'AD', target: 'Status' };
Adjustments.Status_from_WealthVeryWealthyx20  = { from: 'WealthVeryWealthyx20', amount: 1,          targetCategory: 'AD', target: 'Status' };
Adjustments.Status_from_WealthFilthyRichx100  = { from: 'WealthFilthyRichx100', amount: 1,          targetCategory: 'AD', target: 'Status' };
Adjustments.Statusupto2_from_Multimillionaire = { from: 'Multimillionaire',     amount: 1, upto: 2, targetCategory: 'AD', target: 'Status' };
Adjustments.Stealth_from_Chameleon    = { from: 'Chameleon',    amount: 1, targetCategory: 'SK', target: 'Stealth' };
Adjustments.Stealth_from_Encumbrance  = { from: 'Encumbrance',  amount:-1, targetCategory: 'SK', target: 'Stealth', fromCategory: 'stats' };
Adjustments.Stealth_from_Invisibility = { from: 'Invisibility', amount: 9, targetCategory: 'SK', target: 'Stealth' };
Adjustments.Stealth_from_Silence      = { from: 'Silence',      amount: 1, targetCategory: 'SK', target: 'Stealth' };
Adjustments.Streetwise_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Streetwise' };
Adjustments.Streetwise_from_Oblivious  = { from: 'Oblivious',  amount: -1, targetCategory: 'SK', target: 'Streetwise' };
Adjustments.Suggest_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'Suggest' };
Adjustments.SwayEmotions_from_LowEmpathy = { from: 'LowEmpathy', amount: -3, targetCategory: 'SK', target: 'SwayEmotions' };
// no adjustments to Swim, which is analogous to Speed (all adjustments apply to Water Move instead; Swim depends *only* on Basic Speed)
// I want to redefine this.  "Swim/Run/Fly" should refer to the many-turn, straight-line movement discussed in Enhanced Move.
// These should be used to populate the [Sprint/Swim/Fly]Boxes in the character sheets.
Adjustments.Swimming_from_Fat        = { from: 'Fat',        amount: 3, targetCategory: 'SK', target: 'Swimming' };
Adjustments.Swimming_from_Overweight = { from: 'Overweight', amount: 1, targetCategory: 'SK', target: 'Swimming' };
Adjustments.Swimming_from_VeryFat    = { from: 'VeryFat',    amount: 5, targetCategory: 'SK', target: 'Swimming' };
Adjustments.SwingDamage_from_StrikingST = { from: 'StrikingST', amount: 1, targetCategory: 'stats', target: 'swST' };

Adjustments.TasteSmell_from_AcuteTasteSmell = { from: 'AcuteTasteSmell', amount: 1, targetCategory: 'sense', target: 'TasteSmell' };
Adjustments.TasteSmell_from_DiscriminatorySmell = { from: 'DiscriminatorySmell', amount: 4, targetCategory: 'sense', target: 'TasteSmell' };
Adjustments.Teaching_from_Callous = { from: 'Callous', amount: -3, targetCategory: 'SK', target: 'Teaching' };
Adjustments.Thaumatology_from_Magery = { from: 'Magery', amount: 1, targetCategory: 'SK', target: 'Thaumatology' };
Adjustments.Thaumatology_from_MageryRitual = { from: 'MageryRitual', amount: 1, targetCategory: 'SK', target: 'Thaumatology' };
Adjustments.ThrustDamage_from_StrikingST = { from: 'StrikingST', amount: 1, targetCategory: 'stats', target: 'thrST' };
Adjustments.TL_from_TechLevel = { from: 'TechLevel', amount: 1, targetCategory: 'TL', target: 'TL' };
Adjustments.Tracking_from_DiscriminatorySmell = { from: 'DiscriminatorySmell', amount: 4, targetCategory: 'SK', target: 'Tracking' };

Adjustments.Vision_from_AcuteVision = { from: 'AcuteVision', amount: 1, targetCategory: 'sense', target: 'Vision' };

Adjustments.WaterMove_from_DecreasedWaterMove = { from: 'DecreasedWaterMove', amount: -1, targetCategory: 'movement', target: 'WaterMove' };
Adjustments.WaterMove_from_IncreasedWaterMove = { from: 'IncreasedWaterMove', amount:  1, targetCategory: 'movement', target: 'WaterMove' };
//Adjustments.WaterMove_from_EnhancedMoveWater = { from: 'EnhancedMoveWater', amount: 1.414, target: 'WaterMove', type: '*' };  // Enhanced Move (env) advantages come in half-levels
Adjustments.Will_from_Selfless = { from: 'Selfless', amount: -1, target: 'Will', targetCategory: 'stats' };
Adjustments.Will_from_StrongWill = { from: 'StrongWill', amount: 1, target: 'Will', targetCategory: 'stats' };
Adjustments.Will_from_WeakWill = { from: 'WeakWill', amount: -1, target: 'Will', targetCategory: 'stats' };

Adjustments.Appearance_from_AppearanceHorrific      = { from: 'Horrific',      amount: -6, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceMonstrous     = { from: 'Monstrous',     amount: -5, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceHideous       = { from: 'Hideous',       amount: -4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceUgly          = { from: 'Ugly',          amount: -2, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceUnattractive  = { from: 'Unattractive',  amount: -1, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceAttractive    = { from: 'Attractive',    amount:  1, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceHandsome      = { from: 'Handsome',      amount:  3, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceBeautiful     = { from: 'Beautiful',     amount:  3, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceVeryHandsome  = { from: 'VeryHandsome',  amount:  4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceVeryBeautiful = { from: 'VeryBeautiful', amount:  4, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_AppearanceTranscendent  = { from: 'Transcendent',  amount:  5, targetCategory: 'GR', target: 'Appearance' };
Adjustments.Appearance_from_Appearance              = { from: 'Appearance',    amount:  1, targetCategory: 'GR', target: 'Appearance' }

/* Adjustments for Talents */
Adjustments.AnimalFriendTalentGroup_from_AnimalFriendTalent     = { from: "AnimalFriendTalent",   amount: 1, upto: 4, targetCategory: "GR", target: "AnimalFriendTalent" };
Adjustments.ArtificerTalentGroup_from_ArtificerTalent           = { from: "ArtificerTalent",      amount: 1, upto: 4, targetCategory: "GR", target: "ArtificerTalent" };
Adjustments.BusinessAcumenTalentGroup_from_BusinessAcumenTalent = { from: "BusinessAcumenTalent", amount: 1, upto: 4, targetCategory: "GR", target: "BusinessAcumenTalent" };
Adjustments.GiftedArtistTalentGroup_from_GiftedArtistTalent     = { from: "GiftedArtistTalent",   amount: 1, upto: 4, targetCategory: "GR", target: "GiftedArtistTalent" };
Adjustments.GreenThumbTalentGroup_from_GreenThumbTalent         = { from: "GreenThumbTalent",     amount: 1, upto: 4, targetCategory: "GR", target: "GreenThumbTalent" };
Adjustments.HealerTalentGroup_from_HealerTalent                 = { from: "HealerTalent",         amount: 1, upto: 4, targetCategory: "GR", target: "HealerTalent" };
Adjustments.MathAbilityTalentGroup_from_MathAbilityTalent       = { from: "MathAbilityTalent",    amount: 1, upto: 4, targetCategory: "GR", target: "MathAbilityTalent" };
Adjustments.MusicalAbilityTalentGroup_from_MusicalAbilityTalent = { from: "MusicalAbilityTalent", amount: 1, upto: 4, targetCategory: "GR", target: "MusicalAbilityTalent" };
Adjustments.OutdoorsmanTalentGroup_from_OutdoorsmanTalent       = { from: "OutdoorsmanTalent",    amount: 1, upto: 4, targetCategory: "GR", target: "OutdoorsmanTalent" };
Adjustments.SmoothOperatorTalentGroup_from_SmoothOperatorTalent = { from: "SmoothOperatorTalent", amount: 1, upto: 4, targetCategory: "GR", target: "SmoothOperatorTalent" };


// The common 'Magery' prerequisite needs to be satisfied by aspected and other non-traditional forms of Magery.
// Create a 'Magery' list/group?  or just a bunch of prereqs in a pgroup?
// Harder; this violates the Principle of Updates (new Magery versions would have to be added to the same pgroup - is this actually a violation?).
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
    category:   Allowed values (so far) are SK, ADS, stats.  Specifies type for prereq, not target.
    level:      For prereqs where levels make sense (all skills, many traits), a minimum level may be specified.
    pgroup:     Used to indicate that two (or more) Prerequisite items with the same target are to be logically
                joined using 'or' instead of the usual 'and'.  If two items are to be connected in this way, give
                each of them a pgroup attribute, with the same numeric value.
*/

Prerequisites.Accuracy_requires_5Air = { target: 'Accuracy', number: 5, prereq: 'Air' };
Prerequisites.Accuracy_requires_Enchant = { target: 'Accuracy', prereq: 'Enchant' };
// Prerequisites.AlternateIdentityLegal_requires_LegalEnforcementPowers = { target: 'AlternateIdentityLegal', category: 'ADS', prereq: 'LegalEnforcementPowers' };
Prerequisites.Aquabatics_requires_Swimming_pgroup1 = { target: 'Aquabatics', category: 'SK', prereq: 'Swimming', pgroup: 1 };
Prerequisites.Aquabatics_requires_Amphibious_pgroup1 = { target: 'Aquabatics', category: 'ADS', prereq: 'Amphibious', pgroup: 1 };
Prerequisites.Aquabatics_requires_Aquatic_pgroup1 = { target: 'Aquabatics', category: 'ADS', prereq: 'Aquatic', pgroup: 1 };
Prerequisites.Astronomy_requires_Mathematics = { target: 'Astronomy', category: 'SK', prereq: 'Mathematics', prereqSpec: 'Applied' };

Prerequisites.BlindFighting_requires_TrainedbyaMaster_pgroup1 = { target: 'BlindFighting', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.BlindFighting_requires_WeaponMaster_pgroup1     = { target: 'BlindFighting', category: 'ADS', prereq: 'WeaponMaster', pgroup: 1 };
Prerequisites.BodyControl_requires_TrainedbyaMaster = { target: 'BodyControl', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.BodyControl_requires_BreathControl    = { target: 'BodyControl', category: 'SK',  prereq: 'BreathControl' };
Prerequisites.BodyControl_requires_Meditation       = { target: 'BodyControl', category: 'SK',  prereq: 'Meditation' };
Prerequisites.BrainHacking_requires_ComputerHacking = { target: 'BrainHacking', category: 'SK', prereq: 'ComputerHacking' };
Prerequisites.Brainwashing_requires_Psychology = { target: 'Brainwashing', category: 'SK', prereq: 'Psychology' };
Prerequisites.BreakingBlow_requires_TrainedbyaMaster = { target: 'BreakingBlow', category: 'ADS', prereq: 'TrainedbyaMaster' };

Prerequisites.Captivate_requires_Suggest = { target: 'Captivate', category: 'SK', level: 12, prereq: 'Suggest' };
Prerequisites.ComputerHacking_requires_ComputerProgramming = { target: 'ComputerHacking', category: 'SK', prereq: 'ComputerProgramming' };


Prerequisites.EarthtoAir_requires_CreateAir = { target: 'EarthtoAir', prereq: 'CreateAir' };
Prerequisites.EarthtoAir_requires_CreateAir = { target: 'EarthtoAir', prereq: 'CreateAir' };
Prerequisites.EarthtoAir_requires_ShapeEarth = { target: 'EarthtoAir', prereq: 'ShapeEarth' };
Prerequisites.EarthtoAir_requires_ShapeEarth = { target: 'EarthtoAir', prereq: 'ShapeEarth' };
Prerequisites.EarthtoStone_requires_Magery1 = { target: 'EarthtoStone', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.EarthtoStone_requires_ShapeEarth = { target: 'EarthtoStone', prereq: 'ShapeEarth' };
Prerequisites.Engineer_requires_MathematicsApplied  = { target: 'Engineer',                            category: 'SK', prereq: 'Mathematics', prereqSpec: 'Applied' };
Prerequisites.EngineerMaterials_requires_Chemistry  = { target: 'Engineer', targetSpec: 'Materials',   category: 'SK', prereq: 'Chemistry' };
Prerequisites.EngineerMaterials_requires_Metallurgy = { target: 'Engineer', targetSpec: 'Materials',   category: 'SK', prereq: 'Metallurgy' };
Prerequisites.EngineerParachronic_requires_Physics  = { target: 'Engineer', targetSpec: 'Parachronic', category: 'SK', prereq: 'Physics' };
Prerequisites.EngineerTemporal_requires_Physics     = { target: 'Engineer', targetSpec: 'Temporal',    category: 'SK', prereq: 'Physics' };
Prerequisites.EnhancedMoveAir_requires_Flight = { target: 'EnhancedMoveAir', category: 'ADS', prereq: 'Flight' };
Prerequisites.EnhancedMoveWater_requires_Amphibious = { target: 'EnhancedMoveWater', category: 'ADS', prereq: 'Amphibious', pgroup: 1 };
Prerequisites.EnhancedMoveWater_requires_Aquatic    = { target: 'EnhancedMoveWater', category: 'ADS', prereq: 'Aquatic', pgroup: 1 };
Prerequisites.EnhancedMoveSpace_requires_SpaceFlight          = { target: 'EnhancedMoveSpace', category: 'ADS', prereq: 'Flight', prereqEnh: 'Space Flight', pgroup: 1 };
Prerequisites.EnhancedMoveSpace_requires_NewtonianSpaceFlight = { target: 'EnhancedMoveSpace', category: 'ADS', prereq: 'Flight', prereqEnh: 'Newtonian Space Flight', pgroup: 1 };
Prerequisites.Enthrallment_requires_PublicSpeaking = { target: 'Enthrallment', category: 'SK',  level: 12, prereq: 'PublicSpeaking' };
Prerequisites.Enthrallment_requires_Charisma1      = { target: 'Enthrallment', category: 'ADS', level: 1,  prereq: 'Charisma' };
Prerequisites.EroticArt_requires_SexAppeal13 = { target: 'EroticArt', level: 13, category: 'SK', prereq: 'SexAppeal' };
Prerequisites.ExplosivesExplosiveOrdnanceDisposal_requires_DX12 = { target: 'Explosives', targetSpec: 'ExplosiveOrdnanceDisposal', category: 'stat', level: 12, prereq: 'DX' };
Prerequisites.ExtinguishFire_requires_IgniteFire = { target: 'ExtinguishFire', prereq: 'IgniteFire' };

//Prerequisites.Flight_requires_FlightAd = { target: 'Flight', category: 'ADS', prereq: 'Flight' };

Prerequisites.GroupPerformance_requires_Diplomacy_pgroup1    = { target: 'GroupPerformance', prereq: 'Diplomacy',    pgroup: 1 };
Prerequisites.GroupPerformance_requires_Intimidation_pgroup1 = { target: 'GroupPerformance', prereq: 'Intimidation', pgroup: 1 };
Prerequisites.GroupPerformance_requires_Leadership_pgroup1   = { target: 'GroupPerformance', prereq: 'Leadership',   pgroup: 1 };
Prerequisites.GroupPerformanceChoreography_requires_Dancing = { target: 'GroupPerformance', targetSpec: 'Choreography', prereq: 'Dancing' };
Prerequisites.GroupPerformanceConducting_requires_MusicalInstrument        = { target: 'GroupPerformance', targetSpec: 'Conducting', prereq: 'MusicalInstrument',            pgroup: 2 };
Prerequisites.GroupPerformanceConducting_requires_2MusicalInstrumentSkills = { target: 'GroupPerformance', targetSpec: 'Conducting', prereq: 'MusicalInstrument', number: 2, pgroup: 3 };
Prerequisites.GroupPerformanceConducting_requires_Singing                  = { target: 'GroupPerformance', targetSpec: 'Conducting', prereq: 'Singing',                      pgroup: 3 };
Prerequisites.GroupPerformanceDirecting_requires_Performance = { target: 'GroupPerformance', targetSpec: 'Directing', prereq: 'Performance' };
Prerequisites.GroupPerformanceFightChoreography_requires_StageCombat = { target: 'GroupPerformance', targetSpec: 'FightChoreography', prereq: 'StageCombat' };

// Prerequisites.Hyperflight1day_requires_Flight = { target: 'Hyperflight1day', category: 'ADS', prereq: 'Flight' };
// Prerequisites.Hyperflight1day_requires_SuperFlight = { target: 'Hyperflight1day', category: 'ADS', prereq: 'SuperFlight' };
// Prerequisites.Hyperflight1xspeedoflight_requires_Flight = { target: 'Hyperflight1xspeedoflight', category: 'ADS', prereq: 'Flight' };
// Prerequisites.Hyperflight1xspeedoflight_requires_SuperFlight = { target: 'Hyperflight1xspeedoflight', category: 'ADS', prereq: 'SuperFlight' };

Prerequisites.ImmovableStance_requires_TrainedbyaMaster = { target: 'ImmovableStance', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.IncreasedWaterMove_requires_Swimming   = { target: 'IncreasedWaterMove', category: 'SK', prereq: 'Swimming',   pgroup: 1 };
Prerequisites.IncreasedWaterMove_requires_Amphibious = { target: 'IncreasedWaterMove', category: 'AD', prereq: 'Amphibious', pgroup: 1 };
Prerequisites.IncreasedWaterMove_requires_Aquatic    = { target: 'IncreasedWaterMove', category: 'AD', prereq: 'Aquatic',    pgroup: 1 };
Prerequisites.InvisibilityArt_requires_TrainedbyaMaster = { target: 'InvisibilityArt',            category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.InvisibilityArt_requires_Hypnotism14      = { target: 'InvisibilityArt', level: 14, category: 'SK',  prereq: 'Hypnotism' };
Prerequisites.InvisibilityArt_requires_Stealth14        = { target: 'InvisibilityArt', level: 14, category: 'SK',  prereq: 'Stealth' };



Prerequisites.Lance_requires_Riding = { target: 'Lance', category: 'SK', prereq: 'Riding' };
Prerequisites.LightWalk_requires_TrainedbyaMaster = { target: 'LightWalk', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.LightWalk_requires_Acrobatics14 = { target: 'LightWalk', level: 14, category: 'SK',  prereq: 'Acrobatics' };
Prerequisites.LightWalk_requires_Stealth14 = { target: 'LightWalk', level: 14, category: 'SK',  prereq: 'Stealth' };

Prerequisites.Magery_requires_Magery0      = { target: 'Magery',      category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryAir_requires_Magery0   = { target: 'MageryAir',   category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryEarth_requires_Magery0 = { target: 'MageryEarth', category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryFire_requires_Magery0  = { target: 'MageryFire',  category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryWater_requires_Magery0 = { target: 'MageryWater', category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryBody_requires_Magery0  = { target: 'MageryBody',  category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryTalk_requires_Magery0  = { target: 'MageryTalk',  category: 'AD', prereq: 'Magery0' };
// Prerequisites.MageryBeast_requires_Magery0 = { target: 'MageryBeast', category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryLife_requires_Magery0  = { target: 'MageryLife',  category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryDeath_requires_Magery0 = { target: 'MageryDeath', category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryMind_requires_Magery0  = { target: 'MageryMind',  category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryLight_requires_Magery0 = { target: 'MageryLight', category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryMove_requires_Magery0  = { target: 'MageryMove',  category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryKen_requires_Magery0   = { target: 'MageryKen',   category: 'AD', prereq: 'Magery0' };
// Prerequisites.MageryGate_requires_Magery0  = { target: 'MageryGate',  category: 'AD', prereq: 'Magery0' };
// Prerequisites.MageryMeta_requires_Magery0  = { target: 'MageryMeta',  category: 'AD', prereq: 'Magery0' };
Prerequisites.MageryWard_requires_Magery0  = { target: 'MageryWard',  category: 'AD', prereq: 'Magery0' };
Prerequisites.MentalStrength_requires_TrainedbyaMaster_pgroup1 = { target: 'MentalStrength', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.MentalStrength_requires_WeaponMaster_pgroup1     = { target: 'MentalStrength', category: 'ADS', prereq: 'WeaponMaster', pgroup: 1 };
Prerequisites.Multimillionaire_requires_WealthFilthyRichx100 = { target: 'Multimillionaire', category: 'ADS', prereq: 'WealthFilthyRichx100' };
Prerequisites.MusicalComposition_requires_MusicalInstrument = { target: 'MusicalComposition', category: 'SK', prereq: 'MusicalInstrument' };
Prerequisites.MusicalInfluence_requires_MusicalAbility1   = { target: 'MusicalInfluence', category: 'AD', prereq: 'MusicalAbilityTalent', level: 1 };
Prerequisites.MusicalInfluence_requires_MusicalInstrument = { target: 'MusicalInfluence', category: 'SK', prereq: 'MusicalInstrument',    level: 12, pgroup: 1 };
Prerequisites.MusicalInfluence_requires_Singing           = { target: 'MusicalInfluence', category: 'SK', prereq: 'Singing',              level: 12, pgroup: 1 };



Prerequisites.Packing_requires_AnimalHandling = { target: 'Packing', category: 'SK', prereq: 'AnimalHandling' };
Prerequisites.PathofAir_requires_RitualMagic_pgroup1  = { target: 'PathofAir', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofAir_requires_Thaumatology_pgroup1 = { target: 'PathofAir', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofBodyControl_requires_RitualMagic_pgroup1  = { target: 'PathofBodyControl', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofBodyControl_requires_Thaumatology_pgroup1 = { target: 'PathofBodyControl', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofCommunicationEmpathy_requires_RitualMagic_pgroup1  = { target: 'PathofCommunicationEmpathy', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofCommunicationEmpathy_requires_Thaumatology_pgroup1 = { target: 'PathofCommunicationEmpathy', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofEarth_requires_RitualMagic_pgroup1  = { target: 'PathofEarth', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofEarth_requires_Thaumatology_pgroup1 = { target: 'PathofEarth', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofEnchantment_requires_RitualMagic_pgroup1  = { target: 'PathofEnchantment', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofEnchantment_requires_Thaumatology_pgroup1 = { target: 'PathofEnchantment', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofFire_requires_RitualMagic_pgroup1  = { target: 'PathofFire', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofFire_requires_Thaumatology_pgroup1 = { target: 'PathofFire', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofGate_requires_RitualMagic_pgroup1  = { target: 'PathofGate', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofGate_requires_Thaumatology_pgroup1 = { target: 'PathofGate', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofHealing_requires_RitualMagic_pgroup1  = { target: 'PathofHealing', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofHealing_requires_Thaumatology_pgroup1 = { target: 'PathofHealing', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofKnowledge_requires_RitualMagic_pgroup1  = { target: 'PathofKnowledge', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofKnowledge_requires_Thaumatology_pgroup1 = { target: 'PathofKnowledge', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofLightDarkness_requires_RitualMagic_pgroup1  = { target: 'PathofLightDarkness', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofLightDarkness_requires_Thaumatology_pgroup1 = { target: 'PathofLightDarkness', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofMindControl_requires_RitualMagic_pgroup1  = { target: 'PathofMindControl', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofMindControl_requires_Thaumatology_pgroup1 = { target: 'PathofMindControl', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofMetaSpells_requires_RitualMagic_pgroup1  = { target: 'PathofMetaSpells', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofMetaSpells_requires_Thaumatology_pgroup1 = { target: 'PathofMetaSpells', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofMovement_requires_RitualMagic_pgroup1  = { target: 'PathofMovement', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofMovement_requires_Thaumatology_pgroup1 = { target: 'PathofMovement', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofNecromancy_requires_RitualMagic_pgroup1  = { target: 'PathofNecromancy', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofNecromancy_requires_Thaumatology_pgroup1 = { target: 'PathofNecromancy', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofProtectionWarning_requires_RitualMagic_pgroup1  = { target: 'PathofProtectionWarning', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofProtectionWarning_requires_Thaumatology_pgroup1 = { target: 'PathofProtectionWarning', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PathofWater_requires_RitualMagic_pgroup1  = { target: 'PathofWater', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
Prerequisites.PathofWater_requires_Thaumatology_pgroup1 = { target: 'PathofWater', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
Prerequisites.PharmacyHerbal_requires_Naturalist = { target: 'Pharmacy', targetSpec: 'Herbal', category: 'SK', prereq: 'Naturalist' };
Prerequisites.Physics_requires_MathematicsApplied = { target: 'Physics', category: 'SK', prereq: 'Mathematics', prereqSpec: 'Applied' };
Prerequisites.PowerBlow_requires_TrainedbyaMaster_pgroup1 = { target: 'PowerBlow', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.PowerBlow_requires_WeaponMaster_pgroup1     = { target: 'PowerBlow', category: 'ADS', prereq: 'WeaponMaster',     pgroup: 1 };
Prerequisites.Power_requires_Enchant = { target: 'Power', prereq: 'Enchant' };
Prerequisites.Power_requires_RecoverEnergy = { target: 'Power', prereq: 'RecoverEnergy' };
Prerequisites.PredictWeather_requires_4Air = { target: 'PredictWeather', number: 4, prereq: 'Air' };
Prerequisites.PressurePoints_requires_TrainedbyaMaster_pgroup1 = { target: 'PressurePoints', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.PressurePoints_requires_WeaponMaster_pgroup1     = { target: 'PressurePoints', category: 'ADS', prereq: 'WeaponMaster',     pgroup: 1 };
Prerequisites.PressureSecrets_requires_PressurePoints16 = { target: 'PressureSecrets', level: 16, category: 'SK', prereq: 'PressurePoints' };
Prerequisites.PressureSecrets_requires_TrainedbyaMaster = { target: 'PressureSecrets', category: 'ADS', prereq: 'TrainedbyaMaster' };
Prerequisites.Puissance_requires_5Earth = { target: 'Puissance', number: 5, prereq: 'Earth' };
Prerequisites.Puissance_requires_Enchant = { target: 'Puissance', prereq: 'Enchant' };
Prerequisites.PurifyWater_requires_SeekWater = { target: 'PurifyWater', prereq: 'SeekWater' };
Prerequisites.Push_requires_TrainedbyaMaster = { target: 'Push', category: 'AD', prereq: 'TrainedbyaMaster' };


Prerequisites.RapidHealing_requires_HT = { target: 'RapidHealing', category: 'stat', level: 10, prereq: 'HT' };
Prerequisites.ResistFire_requires_Cold = { target: 'ResistFire', prereq: 'Cold' };
Prerequisites.ResistFire_requires_ExtinguishFire = { target: 'ResistFire', prereq: 'ExtinguishFire' };

Prerequisites.Scuba_requires_Swimming = { target: 'Scuba', category: 'SK', prereq: 'Swimming' };
Prerequisites.SenseEmotion_requires_SenseFoes = { target: 'SenseEmotion', prereq: 'SenseFoes' };
Prerequisites.ShapeAir_requires_CreateAir = { target: 'ShapeAir', prereq: 'CreateAir' };
Prerequisites.ShapeEarth_requires_SeekEarth = { target: 'ShapeEarth', prereq: 'SeekEarth' };
Prerequisites.ShapeFire_requires_IgniteFire = { target: 'ShapeFire', prereq: 'IgniteFire' };
Prerequisites.ShapeWater_requires_CreateWater = { target: 'ShapeWater', prereq: 'CreateWater' };
Prerequisites.Shiphandling_requires_Leadership        = { target: 'Shiphandling',                          category: 'SK', prereq: 'Leadership' };
Prerequisites.ShiphandlingAirship_requires_Airshipman = { target: 'Shiphandling', targetSpec: 'Airship',   category: 'SK', prereq: 'Crewman',    prereqSpec: 'Airshipman' };
Prerequisites.ShiphandlingAirship_requires_NavAir     = { target: 'Shiphandling', targetSpec: 'Airship',   category: 'SK', prereq: 'Navigation', prereqSpec: 'Air' };
Prerequisites.ShiphandlingShip_requires_Seamanship    = { target: 'Shiphandling', targetSpec: 'Ship',      category: 'SK', prereq: 'Crewman',    prereqSpec: 'Seamanship' };
Prerequisites.ShiphandlingShip_requires_NavSea        = { target: 'Shiphandling', targetSpec: 'Ship',      category: 'SK', prereq: 'Navigation', prereqSpec: 'Sea' };
Prerequisites.ShiphandlingSpaceship_requires_Spacer   = { target: 'Shiphandling', targetSpec: 'Spaceship', category: 'SK', prereq: 'Crewman',    prereqSpec: 'Spacer' };
Prerequisites.ShiphandlingSpaceship_requires_NavSpace = { target: 'Shiphandling', targetSpec: 'Spaceship', category: 'SK', prereq: 'Navigation', prereqSpec: 'Space' };
Prerequisites.ShiphandlingStarship_requires_Spacer    = { target: 'Shiphandling', targetSpec: 'Starship',  category: 'SK', prereq: 'Crewman',    prereqSpec: 'Spacer' };
Prerequisites.ShiphandlingStarship_requires_NavHSpace = { target: 'Shiphandling', targetSpec: 'Starship',  category: 'SK', prereq: 'Navigation', prereqSpec: 'Hyperspace' };
Prerequisites.ShiphandlingSub_requires_Submariner     = { target: 'Shiphandling', targetSpec: 'Submarine', category: 'SK', prereq: 'Crewman',    prereqSpec: 'Submariner' };
Prerequisites.ShiphandlingSub_requires_NavSea         = { target: 'Shiphandling', targetSpec: 'Submarine', category: 'SK', prereq: 'Navigation', prereqSpec: 'Sea' };
Prerequisites.Sleep_requires_Daze = { target: 'Sleep', prereq: 'Daze' };
// Prerequisites.StonetoEarth_requires_4Earth_pgroup2       = { target: 'StonetoEarth', prereq: '4Earth',       pgroup: 2 };
Prerequisites.StonetoEarth_requires_EarthtoStone_pgroup1 = { target: 'StonetoEarth', prereq: 'EarthtoStone', pgroup: 1 };
Prerequisites.Suggest_requires_Persuade = { target: 'Suggest', category: 'SK', prereq: 'Persuade', level: 12 };
Prerequisites.Surgery_requires_Physician = { target: 'Surgery', category: 'SK', prereq: 'Physician', pgroup: 1 };
Prerequisites.Surgery_requires_FirstAid  = { target: 'Surgery', category: 'SK', prereq: 'FirstAid', pgroup: 1 };
Prerequisites.SwayEmotions_requires_Persuade = { target: 'SwayEmotions', category: 'SK', level: 12, prereq: 'Persuade' };

Prerequisites.ThrowingArt_requires_TrainedbyaMaster_pgroup1 = { target: 'ThrowingArt', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.ThrowingArt_requires_WeaponMaster_pgroup1     = { target: 'ThrowingArt', category: 'ADS', prereq: 'WeaponMaster',     pgroup: 1 };
Prerequisites.Trace_requires_Seeker = { target: 'Trace', prereq: 'Seeker' };
Prerequisites.Truthsayer_requires_SenseEmotion = { target: 'Truthsayer', prereq: 'SenseEmotion' };


Prerequisites.WalkonAir_requires_ShapeAir = { target: 'WalkonAir', prereq: 'ShapeAir' };
// Prerequisites.WealthFilthyRichx100_requires_Status = { target: 'WealthFilthyRichx100', level: 0, category: 'AD', prereq: 'Status' };
// Prerequisites.WealthVeryWealthyx20_requires_Status = { target: 'WealthVeryWealthyx20', level: 0, category: 'AD', prereq: 'Status' };
// Prerequisites.WealthWealthyx5_requires_Status = { target: 'WealthWealthyx5', level: 0, category: 'AD', prereq: 'Status' };


Prerequisites.ZenArchery_requires_Bow18            = { target: 'ZenArchery', category: 'SK',  prereq: 'Bow', level: 18 };
Prerequisites.ZenArchery_requires_TrainedbyaMaster = { target: 'ZenArchery', category: 'ADS', prereq: 'TrainedbyaMaster', pgroup: 1 };
Prerequisites.ZenArchery_requires_WeaponMaster     = { target: 'ZenArchery', category: 'ADS', prereq: 'WeaponMaster', pgroup: 1 };
Prerequisites.ZenArchery_requires_Meditation       = { target: 'ZenArchery', category: 'SK',  prereq: 'Meditation' };

/* Technique/Maneuver prerequisites (omit since I am not including Techniques/Maneuvers)
Prerequisites.ArmorWristLock_requires_Judo_pgroup1 = { target: 'ArmorWristLock', category: 'SK', prereq: 'Judo', pgroup: 1 };
Prerequisites.ArmorWristLock_requires_Wrestling_pgroup2 = { target: 'ArmorWristLock', category: 'SK', prereq: 'Wrestling', pgroup: 2 };
Prerequisites.BackKick_requires_Karate = { target: 'BackKick', category: 'SK', prereq: 'Karate' };
Prerequisites.ChokeHold_requires_Wrestling_pgroup1 = { target: 'ChokeHold', category: ' SK', prereq: 'Wrestling', pgroup: 1 };
Prerequisites.ChokeHold_requires_Judo_pgroup1 = { target: 'ChokeHold', category: 'SK', prereq: 'Judo', pgroup: 1 };
Prerequisites.CloseCombatKnife_requires_Knife = { target: 'CloseCombatKnife', category: 'SK', prereq: 'Knife' };
Prerequisites.CloseCombatWeapon_requires_Weapon = { target: 'CloseCombatWeapon', category: 'SK', prereq: 'Weapon' };
Prerequisites.DualWeaponAttackKnife_requires_Knife = { target: 'DualWeaponAttackKnife', category: 'SK', prereq: 'Knife' };
Prerequisites.DualWeaponAttackWeapon_requires_Weapon = { target: 'DualWeaponAttackWeapon', category: 'SK', prereq: 'Weapon' };
Prerequisites.ElbowStrike_requires_Karate = { target: 'ElbowStrike', category: 'SK', prereq: 'Karate' };
Prerequisites.HerbLore_requires_Naturalist = { target: 'HerbLore', category: 'SK', prereq: 'Naturalist' };
Prerequisites.HitLocationKarate_requires_Karate = { target: 'HitLocationKarate', category: 'SK', prereq: 'Karate' };
Prerequisites.HitLocationweapon_requires_Weapon = { target: 'HitLocationweapon', category: 'SK', prereq: 'Weapon' };
Prerequisites.JumpKick_requires_Karate = { target: 'JumpKick', category: 'SK', prereq: 'Karate' };
Prerequisites.Kicking_requires_Brawling_pgroup1 = { target: 'Kicking', category: ' SK', prereq: 'Brawling', pgroup: 1 };
Prerequisites.Kicking_requires_Karate_pgroup1 = { target: 'Kicking', category: 'SK', prereq: 'Karate', pgroup: 1 };
Prerequisites.KneeStrike_requires_Brawling_pgroup2 = { target: 'KneeStrike', category: ' SK', prereq: 'Brawling', pgroup: 2 };
Prerequisites.KneeStrike_requires_Karate_pgroup1 = { target: 'KneeStrike', category: 'SK', prereq: 'Karate', pgroup: 1 };
Prerequisites.OffHandWeaponTrainingKnife_requires_Knife = { target: 'OffHandWeaponTrainingKnife', category: 'SK', prereq: 'Knife' };
Prerequisites.OffHandWeaponTrainingWeapon_requires_Weapon = { target: 'OffHandWeaponTrainingWeapon', category: 'SK', prereq: 'Weapon' };
*/

/****  Skills  ****/
var planetTypes
    = ['Earth-like','Gas Giants','Hostile Terrestrial','Ice Dwarfs','Ice Worlds','Rock Worlds'];

// Make entries in fullSkillNameFor only for skills with multiple-word names.
// Absence will be interpreted to mean that the object key and the full name are identical.
var fullSkillNameFor = {
    AnimalHandling        : 'Animal Handling',
    AreaKnowledge         : 'Area Knowledge',
    AxeMace               : 'Axe/Mace',
    BeamWeapons           : 'Beam Weapons',
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
    CurrentAffairs        : 'Current Affairs',
    DetectiveWildcard     : 'Detective!',
    DetectLies            : 'Detect Lies',
    DivingSuit            : 'Diving Suit',
    DriveWildcard         : 'Drive!',
    ElectronicsOperation  : 'Electronics Operation',
    ElectronicsRepair     : 'Electronics Repair',
    EnvironmentSuit       : 'Environment Suit',
    EsotericMedicine      : 'Esoteric Medicine',
    ExpertSkill           : 'Expert Skill',
    FastDraw              : 'Fast-Draw',
    FastTalk              : 'Fast-Talk',
    FireEating            : 'Fire Eating',
    FirstAid              : 'First Aid',
    FlyingLeap            : 'Flying Leap',
    ForceSword            : 'Force Sword',
    ForceWhip             : 'Force Whip',
    ForcedEntry           : 'Forced Entry',
    FortuneTelling        : 'Fortune-Telling',
    ForwardObserver       : 'Forward Observer',
    FreeFall              : 'Free Fall',
    FreightHandling       : 'Freight Handling',
    GeographyPhysical     : 'Geography (Physical)',
    GeographyPolitical    : 'Geography (Political)',
    GeographyRegional     : 'Geography (Regional)',
    GroupPerformance      : 'Group Performance',
    GunWildcard           : 'Gun!',
    HazardousMaterials    : 'Hazardous Materials',
    HiddenLore            : 'Hidden Lore',
    ImmovableStance       : 'Immovable Stance',
    InnateAttack          : 'Innate Attack',
    IntelligenceAnalysis  : 'Intelligence Analysis',
    InvisibilityArt       : 'Invisibility Art',
    KnotTying             : 'Knot-Tying',
    LightWalk             : 'Light Walk',
    LiquidProjector       : 'Liquid Projector',
    MainGauche            : 'Main-Gauche',
    MarketAnalysis        : 'Market Analysis',
    MentalStrength        : 'Mental Strength',
    MindBlock             : 'Mind Block',
    MonowireWhip          : 'Monowire Whip',
    MusicWildcard         : 'Music!',
    MusicalComposition    : 'Musical Composition',
    MusicalInfluence      : 'Musical Influence',
    MusicalInstrument     : 'Musical Instrument',
    NBCSuit               : 'NBC Suit',
    ParryMissileWeapons   : 'Parry Missile Weapons',
    PowerBlow             : 'Power Blow',
    PressurePoints        : 'Pressure Points',
    PressureSecrets       : 'Pressure Secrets',
    PublicSpeaking        : 'Public Speaking',
    ReligiousRitual       : 'Religious Ritual',
    RitualMagic           : 'Ritual Magic',
    SavoirFaire           : 'Savoir-Faire',
    ScienceWildcard       : 'Science!',
    SexAppeal             : 'Sex Appeal',
    SleightofHand         : 'Sleight of Hand',
    SpearThrower          : 'Spear Thrower',
    SpeedReading          : 'Speed Reading',
    StaffSkill            : 'Staff',
    StageCombat           : 'Stage Combat',
    SumoWrestling         : 'Sumo Wrestling',
    SwayEmotions          : 'Sway Emotions',
    SwordWildcard         : 'Sword!',
    SymbolDrawing         : 'Symbol Drawing',
    ThrowingArt           : 'Throwing Art',
    ThrownWeapon          : 'Thrown Weapon',
    TwoHandedAxeMace      : 'Two-Handed Axe/Mace',
    TwoHandedFlail        : 'Two-Handed Flail',
    TwoHandedSword        : 'Two-Handed Sword',
    UrbanSurvival         : 'Urban Survival',
    VaccSuit              : 'Vacc Suit',
    WeirdScience          : 'Weird Science',
    ZenArchery            : 'Zen Archery',
}

Skills = {};

Skills.Accounting = new Skill( 'Accounting', 'IQ', 2, 'B4E174' );
Skills.Acrobatics = new Skill( 'Acrobatics', 'DX', 2, 'B4E174' );
Skills.Aerobatics = new Skill( 'Aerobatics', 'DX', 2, 'B4E174' );
Skills.Aquabatics = new Skill( 'Aquabatics', 'DX', 2, 'B4E176' );
Skills.Acting = new Skill( 'Acting', 'IQ', 1, 'B4E174' );
Skills.Administration = new Skill( 'Administration', 'IQ', 1, 'B4E174' );
Skills.Alchemy = new Skill( "Alchemy", 'IQ', 3, 'B4E174' );
Skills.Alchemy.TLs = true;
Skills.AnimalHandling = new Skill( 'Animal Handling', 'IQ', 1, 'B4E175' );
Skills.AnimalHandling.specRequiredList = ['Canines','Equines','Felines','Raptors'];
Skills.AnimalHandling.specCategName = 'order/family';
Skills.Anthropology = new Skill( "Anthropology", 'IQ', 2, 'B4E175' );
Skills.Anthropology.specRequiredList = ['human'];
Skills.Anthropology.specCategName = 'species';
Skills.Anthropology.shortname = "Anthro";
Skills.Archaeology = new Skill( "Archaeology", 'IQ', 2, 'B4E176' );
Skills.Architecture = new Skill( "Architecture", 'IQ', 1, 'B4E176' );
Skills.Architecture.TLs = true;
Skills.AreaKnowledge = new Skill( 'Area Knowledge', 'IQ', 0, 'B4E176' );
Skills.AreaKnowledge.specRequiredList = [];
Skills.AreaKnowledge.specCategName = 'area';
Skills.AreaKnowledge.shortname = "AK";
Skills.Armoury = new Skill( 'Armoury', 'IQ', 1, 'B4E178' );
Skills.Armoury.TLs = true;
Skills.Armoury.specRequiredList = ['Battlesuits','Body Armor','Force Shields','Heavy Weapons',
      'Melee Weapons','Missile Weapons','Small Arms','Vehicular Armor'];
Skills.Armoury.TLspecs = {
  'Battlesuits'     : [9,10,11,12,13,14,15],
  'Body Armor'      : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Force Shields'   : [11,12,13,14,15],
  'Heavy Weapons'   : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Melee Weapons'   : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Missile Weapons' : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Small Arms'      : [5,6,7,8,9,10,11,12,13,14,15],
  'Vehicular Armor' : [5,6,7,8,9,10,11,12,13,14,15],
};
Skills.Artillery = new Skill( "Artillery", 'IQ', 1, 'B4E178' );
Skills.Artillery.TLs = true;
Skills.Artillery.minTL = 2;
Skills.Artillery.specRequiredList = ['Beams','Bombs','Cannon','Catapult','Guided Missile','Torpedoes'];
Skills.Artillery.TLspecs = {
  'Beams'          : [9,10,11,12,13,14,15],
  'Bombs'          : [5,6,7,8,9,10,11,12,13,14,15],
  'Cannon'         : [5,6,7,8,9,10,11,12,13,14,15],
  'Catapult'       : [2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Guided Missile' : [7,8,9,10,11,12,13,14,15],
  'Torpedoes'      : [6,7,8,9,10,11,12,13,14,15],
};
Skills.Artist = new Skill( "Artist", 'IQ', 2, 'B4E179' );
Skills.Artist.specRequiredList = ['Body Art','Calligraphy','Drawing','Illumination','Illusion',
      'Interior Decorating','Painting','Pottery','Scene Design','Sculpting','Woodworking'];
Skills.Artist.specCategName = 'art form';
Skills.Astronomy = new Skill( 'Astronomy', 'IQ', 2, 'B4E179' );
Skills.Astronomy.TLs = true;
Skills.Autohypnosis = new Skill( "Autohypnosis", 'Will', 2, 'B4E179' );
Skills.AxeMace = new Skill( 'Axe/Mace', 'DX', 1, 'B4E208' );

Skills.Bartender = new Skill( "Bartender", 'IQ', 1, 'B4E216' );
Skills.Battlesuit = new Skill( "Battlesuit", 'DX', 1, 'B4E179' );   // also listed as a specialization under 'Environment Suit'
Skills.Battlesuit.TLs = true;
Skills.Battlesuit.minTL = 9;
Skills.BeamWeapons = new Skill( 'Beam Weapons', 'DX', 0, 'B4E179' );
Skills.BeamWeapons.shortname = "BW";
Skills.BeamWeapons.TLs = true;
Skills.BeamWeapons.minTL = 8;
Skills.BeamWeapons.specRequiredList = ['pistol','projector','rifle'];
Skills.BeamWeapons.specCategName = 'weapon type';
Skills.Bicycling = new Skill( 'Bicycling', 'DX', 0, 'B4E180' );
Skills.Bioengineering = new Skill( "Bioengineering", 'IQ', 2, 'B4E180' );
Skills.Bioengineering.specRequiredList = ['Cloning','Genetic Engineering','Tissue Engineering'];
Skills.Bioengineering.TLs = true;
Skills.Bioengineering.minTL = 8;
Skills.Biology = new Skill( "Biology", 'IQ', 3, 'B4E180' );
Skills.Biology.TLs = true;
Skills.Biology.specRequiredList = planetTypes;
Skills.Biology.specCategName = 'planet type';
Skills.BlindFighting = new Skill( "Blind Fighting", 'Per', 3, 'B4E180' );
Skills.Blowpipe = new Skill( "Blowpipe", 'DX', 2, 'B4E180' );
Skills.Boating = new Skill( "Boating", 'DX', 1, 'B4E180' );
Skills.Boating.specRequiredList = ['Powerboat','Motorboat','Sailboat','Unpowered'];
Skills.Boating.TLspecs = {
  'Powerboat' : [4,5,6,7,8,9,10,11,12,13,14,15],
  'Motorboat' : [5,6,7,8,9,10,11,12,13,14,15],
  'Sailboat'  : [2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Unpowered' : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
};
Skills.Boating.specCategName = 'boat type';
Skills.Boating.TLs = true;
Skills.BodyControl = new Skill( "Body Control", 'HT', 3, 'B4E181' );
Skills.BodyLanguage = new Skill( "Body Language", 'Per', 1, 'B4E181' );
Skills.BodySense = new Skill( "Body Sense", 'DX', 2, 'B4E181' );
Skills.Bolas = new Skill( 'Bolas', 'DX', 1, 'B4E181' );
Skills.Bow = new Skill( 'Bow', 'DX', 1, 'B4E182' );
Skills.Boxing = new Skill( 'Boxing', 'DX', 1, 'B4E182' );
Skills.BrainHacking = new Skill( "Brain Hacking", 'IQ', 2, 'B4E182' );
Skills.BrainHacking.TLs = true;
Skills.Brainwashing = new Skill( "Brainwashing", 'IQ', 2, 'B4E182' );
Skills.Brainwashing.TLs = true;
Skills.Brawling = new Skill( 'Brawling', 'DX', 0, 'B4E182' );
Skills.BreakingBlow = new Skill( "Breaking Blow", 'IQ', 2, 'B4E182' );
Skills.BreathControl = new Skill( "Breath Control", 'HT', 2, 'B4E182' );
Skills.Broadsword = new Skill( 'Broadsword', 'DX', 1, 'B4E208' );

Skills.Camouflage = new Skill( "Camouflage", 'IQ', 0, 'B4E183' );
Skills.Captivate = new Skill( "Captivate", 'Will', 2, 'B4E191' );
Skills.Carousing = new Skill( 'Carousing', 'HT', 0, 'B4E183' );
Skills.Carpentry = new Skill( "Carpentry", 'IQ', 0, 'B4E183' );
Skills.Cartography = new Skill( "Cartography", 'IQ', 1, 'B4E183' );
Skills.Cartography.TLs = true;
Skills.Cartography.minTL = 1;
Skills.Chemistry = new Skill( "Chemistry", 'IQ', 2, 'B4E183' );
Skills.Chemistry.TLs = true;
Skills.Chemistry.minTL = 5;
Skills.Climbing = new Skill( 'Climbing', 'DX', 1, 'B4E183' );
Skills.Cloak = new Skill( "Cloak", 'DX', 1, 'B4E184' );
// combat art skills
Skills.ComputerHacking = new Skill( "Computer Hacking", 'IQ', 3, 'B4E184' );
Skills.ComputerHacking.shortname = "Hacking";
Skills.ComputerHacking.TLs = true;
Skills.ComputerHacking.minTL = 7;
Skills.ComputerHacking.cinematic = true;
Skills.ComputerOperation = new Skill( "Computer Operation", 'IQ', 0, 'B4E184' );
Skills.ComputerOperation.shortname = "Computer Op";
Skills.ComputerOperation.TLs = true;
Skills.ComputerOperation.minTL = 7;
Skills.ComputerProgramming = new Skill( "Computer Programming", 'IQ', 2, 'B4E184' );
Skills.ComputerProgramming.shortname = "Programming";
Skills.ComputerProgramming.TLs = true;
Skills.ComputerProgramming.minTL = 7;
Skills.Connoisseur = new Skill( "Connoisseur", 'IQ', 1, 'B4E185' );
Skills.Connoisseur.specRequiredList = [];
Skills.Cooking = new Skill( 'Cooking', 'IQ', 1, 'B4E185' );
Skills.Counterfeiting = new Skill( "Counterfeiting", 'IQ', 2, 'B4E185' );
Skills.Counterfeiting.TLs = true;
Skills.Counterfeiting.minTL = 2;
Skills.Crewman = new Skill( "Crewman", 'IQ', 0, 'B4E185' );
Skills.Crewman.TLs = true;
Skills.Crewman.specRequiredList = ['Airshipman','Seamanship','Spacer','Submariner'];
Skills.Crewman.TLspecs = {
  'Airshipman' : [5,6,7,8,9,10,11,12,13,14,15],
  'Seamanship' : [2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Spacer'     : [8,9,10,11,12,13,14,15],
  'Submariner' : [5,6,7,8,9,10,11,12,13,14,15],
};
Skills.Crewman.specCategName = 'vessel class';
Skills.Criminology = new Skill( 'Criminology', 'IQ', 1, 'B4E186' );
Skills.Criminology.TLs = true;
Skills.Crossbow = new Skill( 'Crossbow', 'DX', 0, 'B4E186' );
Skills.Cryptography = new Skill( "Cryptography", 'IQ', 2, 'B4E186' );
Skills.Cryptography.TLs = true;
Skills.Cryptography.minTL = 3;
Skills.CurrentAffairs = new Skill( 'Current Affairs', 'IQ', 0, 'B4E186' );
Skills.CurrentAffairs.TLs = true;
Skills.CurrentAffairs.specRequiredList = ['Business','Headline News','High Culture','People',
      'Politics','Popular Culture','Regional','Science & Technology','Sports','Travel'];
Skills.CurrentAffairs.specCategName = 'area';

Skills.Dancing = new Skill( "Dancing", 'DX', 1, 'B4E187' );
Skills.DetectiveWildcard = new Skill( "Detective!", 'IQ', 3, 'B4E175' );
Skills.DetectiveWildcard.wildcard = true;
Skills.DetectLies = new Skill( 'Detect Lies', 'Per', 2, 'B4E187' );
Skills.Diagnosis = new Skill( "Diagnosis", 'IQ', 2, 'B4E187' );
Skills.Diagnosis.TLs = true;
Skills.Diplomacy = new Skill( "Diplomacy", 'IQ', 2, 'B4E187' );
Skills.Disguise = new Skill( "Disguise", 'IQ', 1, 'B4E187' );
Skills.Disguise.TLs = true;
Skills.Disguise.specRequiredList = ['own species','other species (edit to specify)'];
Skills.Disguise.specCategName = 'species';
Skills.DivingSuit = new Skill( "Diving Suit", 'DX', 1, 'B4E187' );   // also listed as a specialization under 'Environment Suit'
Skills.DivingSuit.TLs = true;
Skills.DivingSuit.minTL = 5;
Skills.Dreaming = new Skill( "Dreaming", 'Will', 2, 'B4E188' );
Skills.DriveWildcard = new Skill( "Drive!", 'DX', 3, 'B4E175' );
Skills.DriveWildcard.wildcard = true;
Skills.Driving = new Skill( "Driving", 'DX', 1, 'B4E188' );
Skills.Driving.TLs = true;
Skills.Driving.minTL = 6;
Skills.Driving.specRequiredList = ['Automobile','Construction Equipment','Halftrack',
      'Heavy Wheeled','Hovercraft','Locomotive','Mecha','Motorcyle','Tracked'];
Skills.Driving.TLspecs = {
  'Automobile'             : [  6,7,8,9,10,11,12,13,14,15],
  'Construction Equipment' : [  6,7,8,9,10,11,12,13,14,15],
  'Halftrack'              : [  6,7,8,9,10,11,12,13,14,15],
  'Heavy Wheeled'          : [  6,7,8,9,10,11,12,13,14,15],
  'Hovercraft'             : [    7,8,9,10,11,12,13,14,15],
  'Locomotive'             : [5,6,7,8,9,10,11,12,13,14,15],
  'Mecha'                  : [        9,10,11,12,13,14,15],
  'Motorcyle'              : [  6,7,8,9,10,11,12,13,14,15],
  'Tracked'                : [    7,8,9,10,11,12,13,14,15]
};
Skills.Driving.specCategName = 'vehicle type';
Skills.Dropping = new Skill( "Dropping", 'DX', 1, 'B4E189' );

Skills.Economics = new Skill( "Economics", 'IQ', 2, 'B4E189' );
Skills.Electrician = new Skill( "Electrician", 'IQ', 1, 'B4E189' );
Skills.Electrician.TLs = true;
Skills.Electrician.minTL = 6;
Skills.ElectronicsOperation = new Skill( "Electronics Operation", 'IQ', 1, 'B4E189' );
Skills.ElectronicsOperation.shortname = "Electronics Op";
Skills.ElectronicsOperation.TLs = true;
Skills.ElectronicsOperation.minTL = 7;
Skills.ElectronicsOperation.specRequiredList = ['Communications','Electronic Warfare',
      'Force Shields','Matter Transmitters','Media','Medical','Parachronic','Psychotronics',
      'Scientific','Security','Sensors','Sonar','Surveillance','Temporal'];
Skills.ElectronicsOperation.specRequiredList = {
  'Communications'      : [5,6,7,8,9,10,11,12,13,14,15],
  'Electronic Warfare'  : [    7,8,9,10,11,12,13,14,15],
  'Force Shields'       : [             11,12,13,14,15],
  'Matter Transmitters' : [                         15],
  'Media'               : [5,6,7,8,9,10,11,12,13,14,15],
  'Medical'             : [  6,7,8,9,10,11,12,13,14,15],
  'Parachronic'         : [          10,11,12,13,14,15],
  'Psychotronics'       : [        9,10,11,12,13,14,15],
  'Scientific'          : [5,6,7,8,9,10,11,12,13,14,15],
  'Security'            : [    7,8,9,10,11,12,13,14,15],
  'Sensors'             : [    7,8,9,10,11,12,13,14,15],
  'Sonar'               : [  6,7,8,9,10,11,12,13,14,15],
  'Surveillance'        : [5,6,7,8,9,10,11,12,13,14,15],
  'Temporal'            : [          10,11,12,13,14,15]
};
Skills.ElectronicsRepair = new Skill( "Electronics Repair", 'IQ', 1, 'B4E190' );
Skills.ElectronicsRepair.TLs = true;
Skills.ElectronicsRepair.minTL = 7;
Skills.ElectronicsRepair.specRequiredList = [ 'Communications','Electronic Warfare',
      'Force Shields','Matter Transmitters','Media','Medical','Parachronic','Psychotronics',
      'Scientific','Security','Sensors','Sonar','Surveillance','Temporal','Computers'];
Skills.ElectronicsRepair.specRequiredList = {
  'Communications'      : [5,6,7,8,9,10,11,12,13,14,15],
  'Electronic Warfare'  : [    7,8,9,10,11,12,13,14,15],
  'Force Shields'       : [             11,12,13,14,15],
  'Matter Transmitters' : [                         15],
  'Media'               : [5,6,7,8,9,10,11,12,13,14,15],
  'Medical'             : [  6,7,8,9,10,11,12,13,14,15],
  'Parachronic'         : [          10,11,12,13,14,15],
  'Psychotronics'       : [        9,10,11,12,13,14,15],
  'Scientific'          : [5,6,7,8,9,10,11,12,13,14,15],
  'Security'            : [    7,8,9,10,11,12,13,14,15],
  'Sensors'             : [    7,8,9,10,11,12,13,14,15],
  'Sonar'               : [  6,7,8,9,10,11,12,13,14,15],
  'Surveillance'        : [5,6,7,8,9,10,11,12,13,14,15],
  'Temporal'            : [          10,11,12,13,14,15],
  'Computers'           : [    7,8,9,10,11,12,13,14,15]
};
Skills.Engineer = new Skill( "Engineer", 'IQ', 2, 'B4E190' );
Skills.Engineer.TLs = true;
Skills.Engineer.specRequiredList = ['Artillery','Civil','Clockwork','Combat','Electrical',
      'Electronics','Materials','Microtechnology','Mining','Nanotechnology','Parachronic',
      'Psychotronics','Robotics','Small Arms','Temporal','Automobiles','Ships','Starships'];
Skills.Engineer.TLspecs = {
  'Artillery' : [2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Automobiles'     : [  6,7,8,9,10,11,12,13,14,15],
  'Civil' : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Clockwork' : [2,  4,5,6,7,8,9,10,11,12,13,14,15],
  'Combat': [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Electrical'      : [5,6,7,8,9,10,11,12,13,14,15],
  'Electronics'     : [5,6,7,8,9,10,11,12,13,14,15],
  'Materials':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Microtechnology' : [      8,9,10,11,12,13,14,15],
  'Mining': [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Nanotechnology'  : [        9,10,11,12,13,14,15],
  'Parachronic'     : [          10,11,12,13,14,15],
  'Psychotronics'   : [        9,10,11,12,13,14,15],
  'Robotics'        : [    7,8,9,10,11,12,13,14,15],
  'Ships'     : [2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Small Arms'    : [4,5,6,7,8,9,10,11,12,13,14,15],
  'Starships'       : [        9,10,11,12,13,14,15],
  'Temporal'        : [          10,11,12,13,14,15],
};
Skills.Engineer.specCategName = 'field';
Skills.Enthrallment = new Skill("Enthrallment", 'Will', 2, 'B4E191');
Skills.EnvironmentSuit = new Skill( "Environment Suit", 'DX', 1, 'B4E192' );
Skills.EnvironmentSuit.shortname = "E-Suit";
Skills.EnvironmentSuit.TLs = true;
Skills.EnvironmentSuit.minTL = 6;
Skills.EnvironmentSuit.specRequiredList = ['Battlesuit','Diving Suit','NBC Suit','Vacc Suit'];
Skills.EnvironmentSuit.TLspecs = {
  'Battlesuit'  : [        9,10,11,12,13,14,15],
  'Diving Suit' : [5,6,7,8,9,10,11,12,13,14,15],
  'NBC Suit'    : [    7,8,9,10,11,12,13,14,15],
  'Vacc Suit'   : [        9,10,11,12,13,14,15],
};
Skills.EnvironmentSuit.specCategName = 'suit type';
Skills.EroticArt = new Skill( "Erotic Art", 'DX', 1, 'B4E192' );
Skills.Escape = new Skill( "Escape", 'DX', 2, 'B4E192' );
Skills.EsotericMedicine = new Skill( "Esoteric Medicine", 'Per', 2, 'B4E192' );
Skills.Exorcism = new Skill( "Exorcism", 'Will', 2, 'B4E193' );
Skills.ExpertSkill = new Skill( "Expert Skill", 'IQ', 2, 'B4E193' );
Skills.ExpertSkill.specRequiredList = [];
Skills.ExpertSkill.specCategName = 'theme';
Skills.Explosives = new Skill( "Explosives", 'IQ', 1, 'B4E194' );
Skills.Explosives.TLs = true;
Skills.Explosives.minTL = 4;
Skills.Explosives.specRequiredList = ['Demolition','Explosive Ordnance Disposal','Fireworks',
      'Nuclear Ordnance Disposal','Underwater Demolition'],

Skills.Falconry = new Skill( 'Falconry', 'IQ', 1, 'B4E194' );
Skills.Farming = new Skill( "Farming", 'IQ', 1, 'B4E194' );
Skills.Farming.TLs = true;
Skills.FastDraw = new Skill( 'Fast-Draw', 'DX', 0, 'B4E194' );
Skills.FastDraw.specRequiredList = [ 'Force Sword', 'Knife', 'Long Arm', 'pistol',
                                     'Sword', 'Two-Handed Sword', 'Arrow', 'Ammo' ];
Skills.FastDraw.specCategName = 'weapon or ammo type';
Skills.FastTalk = new Skill( 'Fast-Talk', 'IQ', 1, 'B4E195' );
Skills.Filch = new Skill( "Filch", 'DX', 1, 'B4E195' );
Skills.Finance = new Skill( 'Finance', 'IQ', 2 , 'B4E195');
Skills.FireEating = new Skill( "Fire Eating", 'DX', 1, 'B4E195' );
Skills.FirstAid = new Skill( 'First Aid', 'IQ', 0, 'B4E195' );
Skills.FirstAid.TLs = true;
Skills.Fishing = new Skill( 'Fishing', 'Per', 0, 'B4E195' );
Skills.Flail = new Skill( 'Flail', 'DX', 2, 'B4E208' );
Skills.Flight = new Skill( "Flight", 'HT', 1, 'B4E195' );
Skills.FlyingLeap = new Skill( "Flying Leap", 'IQ', 2, 'B4E196' );
Skills.ForceSword = new Skill( 'Force Sword', 'DX', 1, 'B4E208' );
Skills.ForceWhip = new Skill( "Force Whip", 'DX', 1, 'B4E209' );
Skills.ForcedEntry = new Skill( "Forced Entry", 'DX', 0, 'B4E196' );
Skills.Forensics = new Skill( "Forensics", 'IQ', 2, 'B4E196' );
Skills.Forensics.TLs = true;
Skills.Forensics.minTL = 4;
Skills.Forgery = new Skill( "Forgery", 'IQ', 2, 'B4E196' );
Skills.Forgery.TLs = true;
Skills.FortuneTelling = new Skill( "Fortune-Telling", 'IQ', 1, 'B4E196' );
Skills.ForwardObserver = new Skill( "Forward Observer", 'IQ', 1, 'B4E196' );
Skills.ForwardObserver.TLs = true;
Skills.ForwardObserver.minTL = 6;
Skills.FreeFall = new Skill( "Free Fall", 'DX', 1, 'B4E197' );
Skills.FreightHandling = new Skill( "Freight Handling", 'IQ', 1, 'B4E197' );
Skills.FreightHandling.TLs = true;

Skills.Gambling = new Skill( 'Gambling', 'IQ', 1, 'B4E197' );
Skills.Games = new Skill( "Games", 'IQ', 0, 'B4E197' );
Skills.Games.specRequiredList = [];
Skills.Games.specCategName = 'game';
Skills.Gardening = new Skill( "Gardening", 'IQ', 0, 'B4E197' );
Skills.Garrote = new Skill( "Garrote", 'DX', 0, 'B4E197' );
Skills.GeographyPhysical = new Skill( "Geography (Physical)", 'IQ', 2, 'B4E198' );
Skills.GeographyPhysical.TLs = true;
Skills.GeographyPhysical.specRequiredList = planetTypes;
Skills.GeographyPhysical.specCategName = 'planet type';
Skills.GeographyPolitical = new Skill( "Geography (Political)", 'IQ', 2, 'B4E198' );
Skills.GeographyPolitical.TLs = true;
Skills.GeographyRegional = new Skill( "Geography (Regional)", 'IQ', 2, 'B4E198' );
Skills.GeographyRegional.TLs = true;
Skills.GeographyRegional.specRequiredList = [];
Skills.GeographyRegional.specCategName = 'region';
Skills.Geology = new Skill( "Geology", 'IQ', 2, 'B4E198' );
Skills.Geology.TLs = true;
Skills.Geology.specRequiredList = planetTypes;
Skills.Geology.specCategName = 'planet type';
Skills.Gesture = new Skill( "Gesture", 'IQ', 0, 'B4E198' );
Skills.GroupPerformance = new Skill( 'Group Performance', 'IQ', 1, 'B4E198' );
Skills.GroupPerformance.specRequiredList = ['Choreography','Conducting','Directing','Fight Choreography'];
Skills.GroupPerformance.specCategName = 'performing art';
Skills.GunWildcard = new Skill( "Gun!", 'DX', 3, 'B4E175' );
Skills.GunWildcard.wildcard = true;
Skills.Gunner = new Skill( 'Gunner', 'DX', 0, 'B4E198' );
Skills.Gunner.TLs = true;
Skills.Gunner.minTL = 2;
Skills.Gunner.specRequiredList = ['Beams','Cannon','Catapult','Machine Gun','Rockets'];
Skills.Gunner.TLspecs = {
  'Beams'       : [9,10,11,12,13,14,15],
  'Cannon'      : [4,5,6,7,8,9,10,11,12,13,14,15],
  'Catapult'    : [2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Rockets'     : [7,8,9,10,11,12,13,14,15],
  'Machine Gun' : [5,6,7,8,9,10,11,12,13,14,15],
};
Skills.Gunner.specCategName = 'weapon type';
Skills.Guns = new Skill( 'Guns', 'DX', 0, 'B4E198' );
Skills.Guns.TLs = true;
Skills.Guns.minTL = 4;
Skills.Guns.specRequiredList = ['Grenade Launcher','Gyroc','Light Anti-Armor Weapon',
      'Light Machine Gun','Musket','pistol','Rifle','Shotgun','Submachine Gun'];
Skills.Guns.TLspecs = {
  'Grenade Launcher'        : [7,8,9,10,11,12,13,14,15],
  'Gyroc'                   : [9,10,11,12,13,14,15],
  'Light Anti-Armor Weapon' : [6,7,8,9,10,11,12,13,14,15],
  'Light Machine Gun'       : [5,6,7,8,9,10,11,12,13,14,15],
  'Musket'                  : [4,5,6,7,8,9,10,11,12,13,14,15],
  'pistol'                  : [4,5,6,7,8,9,10,11,12,13,14,15],
  'Rifle'                   : [4,5,6,7,8,9,10,11,12,13,14,15],
  'Shotgun'                 : [5,6,7,8,9,10,11,12,13,14,15],
  'Submachine Gun'          : [6,7,8,9,10,11,12,13,14,15],
};
Skills.Guns.specCategName = 'weapon type';

Skills.HazardousMaterials = new Skill( "Hazardous Materials", 'IQ', 1, 'B4E199' );
Skills.HazardousMaterials.shortname = "HazMat";
Skills.HazardousMaterials.TLs = true;
Skills.HazardousMaterials.minTL = 5;
Skills.HazardousMaterials.specRequiredList = [];
Skills.HazardousMaterials.specCategName = 'HazMat type';
Skills.Heraldry = new Skill( "Heraldry", 'IQ', 1, 'B4E199' );
Skills.HerbLore = new Skill( "Herb Lore", 'IQ', 3, 'B4E199' );
Skills.HiddenLore = new Skill( "Hidden Lore", 'IQ', 1, 'B4E199' );
Skills.HiddenLore.specRequiredList = ['Conspiracies','Demon Lore','Faerie Lore','Spirit Lore'];
Skills.HiddenLore.specCategName = 'body of secret knowledge';
Skills.Hiking = new Skill( "Hiking", 'HT', 1, 'B4E200' );
Skills.History = new Skill( "History", 'IQ', 2, 'B4E200' );
Skills.History.specRequiredList = [];
Skills.History.specCategName = 'region, era, culture, <i>etc</i>.';
Skills.HobbyDXbased = new Skill( "Hobby Skill, DX-based (edit to describe)", 'DX', 0, 'B4E200' );
Skills.HobbyDXbased.specRequiredList = [];
Skills.HobbyIQbased = new Skill( "Hobby Skill, IQ-based (edit to describe)", 'IQ', 0, 'B4E200' );
Skills.HobbyIQbased.specRequiredList = [];
Skills.Holdout = new Skill( "Holdout", 'IQ', 1, 'B4E200' );
Skills.Housekeeping = new Skill( "Housekeeping", 'IQ', 0, 'B4E200' );
Skills.Hypnotism = new Skill( "Hypnotism", 'IQ', 2, 'B4E201' );

Skills.ImmovableStance = new Skill( "Immovable Stance", 'DX', 2, 'B4E201' );
Skills.InnateAttack = new Skill( "Innate Attack", 'DX', 0, 'B4E201' );
Skills.InnateAttack.specRequiredList = ['Beam','Breath','Gaze','Projectile'];
Skills.IntelligenceAnalysis = new Skill( "Intelligence Analysis", 'IQ', 2, 'B4E201' );
Skills.IntelligenceAnalysis.shortname = "Intel";
Skills.IntelligenceAnalysis.TLs = true;
Skills.IntelligenceAnalysis.minTL = 5;
Skills.Interrogation = new Skill( "Interrogation", 'IQ', 1, 'B4E202' );
Skills.Intimidation = new Skill( 'Intimidation', 'Will', 1, 'B4E202' );
Skills.InvisibilityArt = new Skill( "Invisibility Art", 'IQ', 3, 'B4E202' );

Skills.Jeweler = new Skill( 'Jeweler', 'IQ', 2, 'B4E203' );
Skills.Jeweler.TLs = true;
Skills.JitteSai = new Skill( "Jitte/Sai", 'DX', 1, 'B4E208' );
Skills.Judo = new Skill( 'Judo', 'DX', 2, 'B4E203' );
Skills.Jumping = new Skill( "Jumping", 'DX', 0, 'B4E203' );

Skills.Karate = new Skill( 'Karate', 'DX', 2, 'B4E203' );
Skills.Kiai = new Skill( "Kiai", 'HT', 2, 'B4E203' );
Skills.Kicking = new Skill( "Kicking", 'T', 2, 'B4E231' );
Skills.Kicking.techniqueDefaultPenalty = -2;
Skills.Kicking.maxRelLevel = 0;
Skills.Kicking.specRequiredList = ['Brawling','Karate'];
Skills.Knife = new Skill( 'Knife', 'DX', 0, 'B4E208' );
Skills.KnotTying = new Skill( 'Knot-Tying', 'DX', 0, 'B4E203' );
Skills.Kusari = new Skill( "Kusari", 'DX', 2, 'B4E209' );

Skills.Lance = new Skill( "Lance", 'DX', 1, 'B4E204' );
Skills.Lasso = new Skill( "Lasso", 'DX', 1, 'B4E204' );
Skills.Law = new Skill( "Law", 'IQ', 2, 'B4E204' );
Skills.Law.specRequiredList = [];
Skills.Law.specCategName = 'region &amp; field, or body of law';
Skills.Leadership = new Skill( 'Leadership', 'IQ', 1, 'B4E204' );
Skills.Leatherworking = new Skill( 'Leatherworking', 'DX', 0, 'B4E205' );
Skills.Lifting = new Skill( "Lifting", 'HT', 1, 'B4E205' );
Skills.LightWalk = new Skill( "Light Walk", 'DX', 2, 'B4E205' );
Skills.Linguistics = new Skill( "Linguistics", 'IQ', 2, 'B4E205' );
Skills.LipReading = new Skill( "Lip Reading", 'Per', 1, 'B4E205' );
Skills.LiquidProjector = new Skill( "Liquid Projector", 'DX', 0, 'B4E205' );
Skills.LiquidProjector.TLs = true;
Skills.LiquidProjector.minTL = 4;
Skills.LiquidProjector.specRequiredList = ['Flamethrower','Sprayer','Squirt Gun','Water Cannon'];
Skills.LiquidProjector.specCategName = 'weapon type';
Skills.Literature = new Skill( "Literature", 'IQ', 2, 'B4E205' );
Skills.Lockpicking = new Skill( 'Lockpicking', 'IQ', 1, 'B4E206' );
Skills.Lockpicking.TLs =  true;
Skills.Lockpicking.minTL =  2;

Skills.Machinist = new Skill( "Machinist", 'IQ', 1, 'B4E206' );
Skills.Machinist.TLs = true;
Skills.Machinist.minTL = 2;
Skills.MainGauche = new Skill( "Main-Gauche", 'DX', 1, 'B4E208' );
Skills.Makeup = new Skill( "Makeup", 'IQ', 0, 'B4E206' );
Skills.Makeup.TLs = true;
Skills.MarketAnalysis = new Skill( "Market Analysis", 'IQ', 2, 'B4E207' );
Skills.Masonry = new Skill( "Masonry", 'IQ', 0, 'B4E207' );
Skills.Mathematics = new Skill( 'Mathematics', 'IQ', 2, 'B4E207' );
Skills.Mathematics.TLs = true;
Skills.Mathematics.minTL =  1;
Skills.Mathematics.specRequiredList = ['Applied', 'Computer Science', 'Cryptology',
                                       'Pure', 'Statistics', 'Surveying'];
Skills.Mechanic = new Skill( "Mechanic", 'IQ', 1, 'B4E207' );
Skills.Mechanic.TLs = true;
Skills.Mechanic.minTL = 2;
Skills.Mechanic.specRequiredList = [];
Skills.Meditation = new Skill( "Meditation", 'Will', 2, 'B4E207' );
Skills.MentalStrength = new Skill( "Mental Strength", 'Will', 0, 'B4E209' );
Skills.Merchant = new Skill( 'Merchant', 'IQ', 1, 'B4E209' );
Skills.Metallurgy = new Skill( 'Metallurgy', 'IQ', 2, 'B4E209' );
Skills.Metallurgy.TLs =  true;
Skills.Meteorology = new Skill( 'Meteorology', 'IQ', 1, 'B4E209' );
Skills.Meteorology.TLs =  true;
Skills.Meteorology.specRequiredList = planetTypes;
Skills.Mimicry = new Skill( "Mimicry", 'IQ', 2, 'B4E210' );
Skills.Mimicry.specRequiredList = ['Speech', 'Bird Calls', 'Animal Sounds'];
Skills.MindBlock = new Skill( "Mind Block", 'Will', 1, 'B4E210' );
Skills.MonowireWhip = new Skill( "Monowire Whip", 'DX', 2, 'B4E209' );
Skills.Mount = new Skill( "Mount", 'DX', 1, 'B4E210' );
Skills.MusicWildcard = new Skill( "Music!", 'IQ', 3, 'B4E175' );
Skills.MusicWildcard.wildcard = true;
Skills.MusicalComposition = new Skill( "Musical Composition", 'IQ', 2, 'B4E210' );
Skills.MusicalComposition.shortname = "Composition";
Skills.MusicalInfluence = new Skill( "Musical Influence", 'IQ', 3, 'B4E210' );
Skills.MusicalInfluence.cinematic = true;
Skills.MusicalInstrument = new Skill( "Musical Instrument", 'IQ', 2, 'B4E211' );
Skills.MusicalInstrument.shortname = "Instrument";
Skills.MusicalInstrument.specRequiredList = [];
Skills.MusicalInstrument.specCategName = 'instrument';

Skills.Naturalist = new Skill( 'Naturalist', 'IQ', 2, 'B4E211' );
Skills.Navigation = new Skill( 'Navigation', 'IQ', 1, 'B4E211' );
Skills.Navigation.TLs = true;
Skills.Navigation.specRequiredList = ['Land','Sea','Air','Space','Hyperspace'];
Skills.Navigation.TLspecs = {
  'Land'       : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Sea'        : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Air'        : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Space'      : [9,10,11,12,13,14,15],
  'Hyperspace' : [10,11,12,13,14,15],
};
Skills.NBCSuit = new Skill( "NBC Suit", 'DX', 1, 'B4E211' );   // also listed as a specialization under 'Environment Suit'
Skills.NBCSuit.TLs = true;
Skills.NBCSuit.minTL = 6;
Skills.Net = new Skill( "Net", 'DX', 2, 'B4E211' );

Skills.Observation = new Skill( "Observation", 'Per', 1, 'B4E211' );
Skills.Occultism = new Skill( "Occultism", 'IQ', 1, 'B4E212' );

Skills.Packing = new Skill( 'Packing', 'IQ', 1, 'B4E212' );
Skills.Paleontology = new Skill( "Paleontology", 'IQ', 2, 'B4E212' );
Skills.Paleontology.TLs = true;
Skills.Paleontology.minTL = 5;
Skills.Paleontology.specRequiredList = ['Micropaleontology','Paleoanthropology','Paleobotany','Paleozoology'];
Skills.Panhandling = new Skill( "Panhandling", 'IQ', 0, 'B4E212' );
Skills.Parachuting = new Skill( "Parachuting", 'DX', 0, 'B4E212' );
Skills.Parachuting.TLs = true;
Skills.Parachuting.minTL = 6;
Skills.ParryMissileWeapons = new Skill( "Parry Missile Weapons", 'DX', 2, 'B4E212' );
/* Where do these "Path of ..." skills come from, anyway?
  B4E242 or Magic (Variations: Ritual Magic, pg 200)
  These are the 'magic college' skills.  So do they actually go under Spells? */
Skills.PathofBodyControl = new Skill( "Path of Body Control", 'IQ', 3, 'B4E242' );
Skills.PathofCommunicationEmpathy = new Skill( "Path of Communication & Empathy", 'IQ', 3, 'B4E242' );
Skills.PathofEarth = new Skill( "Path of Earth", 'IQ', 3, 'B4E242' );
Skills.PathofAir = new Skill( "Path of Air", 'IQ', 3, 'B4E242' );
Skills.PathofFire = new Skill( "Path of Fire", 'IQ', 3, 'B4E242' );
Skills.PathofWater = new Skill( "Path of Water", 'IQ', 3, 'B4E242' );
Skills.PathofEnchantment = new Skill( "Path of Enchantment", 'IQ', 3, 'B4E242' );
Skills.PathofGate = new Skill( "Path of Gate", 'IQ', 3, 'B4E242' );
Skills.PathofHealing = new Skill( "Path of Healing", 'IQ', 3, 'B4E242' );
Skills.PathofKnowledge = new Skill( "Path of Knowledge", 'IQ', 3, 'B4E242' );
Skills.PathofLightDarkness = new Skill( "Path of Light & Darkness", 'IQ', 3, 'B4E242' );
Skills.PathofMetaSpells = new Skill( "Path of Meta-Spells", 'IQ', 3, 'B4E242' );
Skills.PathofMindControl = new Skill( "Path of Mind Control", 'IQ', 3, 'B4E242' );
Skills.PathofMovement = new Skill( "Path of Movement", 'IQ', 3, 'B4E242' );
Skills.PathofNecromancy = new Skill( "Path of Necromancy", 'IQ', 3, 'B4E242' );
Skills.PathofProtectionWarning = new Skill( "Path of Protection & Warning", 'IQ', 3, 'B4E242' );
Skills.Performance = new Skill( "Performance", 'IQ', 1, 'B4E212' );
Skills.Persuade = new Skill( "Persuade", 'Will', 2, 'B4E191' );
Skills.Pharmacy = new Skill( "Pharmacy", 'IQ', 2, 'B4E213' );
Skills.Pharmacy.TLs = true;
Skills.Pharmacy.specRequiredList = ['Herbal','Synthetic'];
Skills.Philosophy = new Skill( "Philosophy", 'IQ', 2, 'B4E213' );
Skills.Philosophy.specRequiredList = [];
Skills.Photography = new Skill( "Photography", 'IQ', 1, 'B4E213' );
Skills.Photography.TLs = true;
Skills.Photography.minTL = 5;
Skills.Physician = new Skill( 'Physician', 'IQ', 2, 'B4E213' );
Skills.Physician.TLs = true;
Skills.Physics = new Skill( 'Physics', 'IQ', 3, 'B4E213' );
Skills.Physics.TLs = true;
Skills.Physics.minTL = 4;
Skills.Physiology = new Skill( "Physiology", 'IQ', 2, 'B4E213' );
Skills.Physiology.TLs = true;
Skills.Physiology.minTL = 4;
Skills.Physiology.specRequiredList = [];
Skills.Physiology.specCategName = 'species';
Skills.Pickpocket = new Skill( 'Pickpocket', 'DX', 2, 'B4E213' );
Skills.Piloting = new Skill( 'Piloting', 'DX', 1, 'B4E214' );
Skills.Piloting.TLs = true;
Skills.Piloting.minTL = 5;
Skills.Piloting.specRequiredList = ['Aerospace','Autogyro','Contragravity','Flight Pack','Glider',
    'Heavy Airplane','Helicopter','High-Performance Airplane','High-Performance Spacecraft',
    'Light Airplane','Lighter-Than-Air','Lightsail','Low-G Wings','Low-Performance Spacecraft',
    'Ultralight','Vertol'];
Skills.Piloting.TLspecs = {
  'Aerospace' :                 [7,8,9,10,11,12,13,14,15],
  'Autogyro' :                  [7,8,9,10,11,12,13,14,15],
  'Contragravity' :                         [12,13,14,15],
  'Flight Pack' :                     [10,11,12,13,14,15],
  'Glider' :                  [6,7,8,9,10,11,12,13,14,15],
  'Heavy Airplane' :          [6,7,8,9,10,11,12,13,14,15],
  'Helicopter' :                [7,8,9,10,11,12,13,14,15],
  'High-Performance Airplane' : [7,8,9,10,11,12,13,14,15],
  'High-Performance Spacecraft' :   [9,10,11,12,13,14,15],
  'Light Airplane' :          [6,7,8,9,10,11,12,13,14,15],
  'Lighter-Than-Air' :        [6,7,8,9,10,11,12,13,14,15],
  'Lightsail' :                     [9,10,11,12,13,14,15],
  'Low-G Wings' : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Low-Performance Spacecraft' :  [8,9,10,11,12,13,14,15],
  'Ultralight' :                [7,8,9,10,11,12,13,14,15],
  'Vertol' :                        [9,10,11,12,13,14,15],
};
Skills.Poetry = new Skill( "Poetry", 'IQ', 1, 'B4E214' );
Skills.Poisons = new Skill( 'Poisons', 'IQ', 2, 'B4E214' );
Skills.Poisons.TLs = true;
Skills.Polearm = new Skill( 'Polearm', 'DX', 1, 'B4E208' );
Skills.Politics = new Skill( "Politics", 'IQ', 1, 'B4E215' );
Skills.PowerBlow = new Skill( "Power Blow", 'Will', 2, 'B4E215' );
Skills.PressurePoints = new Skill( "Pressure Points", 'IQ', 2, 'B4E215' );
Skills.PressureSecrets = new Skill( "Pressure Secrets", 'IQ', 3, 'B4E215' );
Skills.PressureSecrets.cinematic = true;
Skills.ProfSkillDXbased = new Skill( "Professional Skill, DX-based (edit to describe)", 'DX', 1, 'B4E215' );
Skills.ProfSkillDXbased.specRequiredList = [];
Skills.ProfSkillIQbased = new Skill( "Professional Skill, IQ-based (edit to describe)", 'IQ', 1, 'B4E215' );
Skills.ProfSkillIQbased.specRequiredList = [];
Skills.Propaganda = new Skill( "Propaganda", 'IQ', 1, 'B4E216' );
Skills.Propaganda.TLs = true;
Skills.Prospecting = new Skill( "Prospecting", 'IQ', 1, 'B4E216' );
Skills.Psychology = new Skill( "Psychology", 'IQ', 2, 'B4E216' );
Skills.PublicSpeaking = new Skill( "Public Speaking", 'IQ', 1, 'B4E216' );
Skills.Push = new Skill( "Push", 'DX', 2, 'B4E216' );

Skills.Rapier = new Skill( 'Rapier', 'DX', 1, 'B4E208' );
Skills.ReligiousRitual = new Skill( "Religious Ritual", 'IQ', 2, 'B4E217' );
Skills.ReligiousRitual.shortname = "Ritual";
Skills.ReligiousRitual.specRequiredList = [];
Skills.Research = new Skill( "Research", 'IQ', 1, 'B4E217' );
Skills.Research.TLs = true;
Skills.Research.minTL = 2;
Skills.Riding = new Skill( 'Riding', 'DX', 1, 'B4E217' );
Skills.Riding.specRequiredList = [];
Skills.Riding.specCategName = 'riding beast';
Skills.RitualMagic = new Skill( "Ritual Magic", 'IQ', 3, 'B4E218' );
Skills.RitualMagic.specRequiredList = [];
Skills.Running = new Skill( 'Running', 'HT', 1, 'B4E218' );

Skills.Saber = new Skill( "Saber", 'DX', 1, 'B4E208' );
Skills.SavoirFaire = new Skill( 'Savoir-Faire', 'IQ', 0, 'B4E218' );
Skills.SavoirFaire.specRequiredList = ['Dojo','High Society','Mafia','Military','Police','Servant','other'];
Skills.ScienceWildcard = new Skill( "Science!", 'IQ', 3, 'B4E175' );
Skills.ScienceWildcard.wildcard = true;
Skills.Scrounging = new Skill( 'Scrounging', 'Per', 0, 'B4E218' );
Skills.Scuba = new Skill( 'Scuba', 'IQ', 1, 'B4E219' );
Skills.Scuba.TLs = true;
Skills.Scuba.minTL = 6;
Skills.Search = new Skill( "Search", 'Per', 1, 'B4E219' );
Skills.Sewing = new Skill( "Sewing", 'DX', 0, 'B4E219' );
Skills.Sewing.TLs = true;
Skills.SexAppeal = new Skill( "Sex Appeal", 'HT', 1, 'B4E219' );
Skills.Shadowing = new Skill( "Shadowing", 'IQ', 1, 'B4E219' );
Skills.Shield = new Skill( 'Shield', 'DX', 0, 'B4E220' );
Skills.Shield.specRequiredList = ['Shield','Buckler','Force'];
Skills.Shield.TLspecs = {
  'Shield'  : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Buckler' : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Force'   : [11,12,13,14,15],
};
Skills.Shiphandling = new Skill( "Shiphandling", 'IQ', 2, 'B4E220' );
Skills.Shiphandling.TLs = true;
Skills.Shiphandling.specRequiredList = ['Airship','Ship','Spaceship','Starship','Submarine'];
Skills.Shiphandling.TLspecs = {
  'Airship'    : [5,6,7,8,9,10,11,12,13,14,15],
  'Ship'       : [2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  'Spaceship'  : [8,9,10,11,12,13,14,15],
  'Starship'   : [9,10,11,12,13,14,15],
  'Submariner' : [5,6,7,8,9,10,11,12,13,14,15],
};
Skills.Shortsword = new Skill( 'Shortsword', 'DX', 1, 'B4E209' );
Skills.Singing = new Skill( "Singing", 'HT', 0, 'B4E220' );
Skills.Skating = new Skill( "Skating", 'HT', 2, 'B4E220' );
Skills.Skiing = new Skill( "Skiing", 'HT', 2, 'B4E221' );
Skills.SleightofHand = new Skill( "Sleight of Hand", 'DX', 2, 'B4E221' );
Skills.Sling = new Skill( "Sling", 'DX', 2, 'B4E221' );
Skills.Smallsword = new Skill( "Smallsword", 'DX', 1, 'B4E208' );
Skills.Smith = new Skill( "Smith", 'IQ', 1, 'B4E221' );
Skills.Smith.TLs = true;
Skills.Smith.minTL = 1;
Skills.Smith.specRequiredList = ['Copper','Iron','Lead and Tin'];
Skills.Smuggling = new Skill( "Smuggling", 'IQ', 1, 'B4E221' );
Skills.Sociology = new Skill( "Sociology", 'IQ', 2, 'B4E221' );
Skills.Soldier = new Skill( "Soldier", 'IQ', 1, 'B4E221' );
Skills.Soldier.TLs = true;
Skills.Spear = new Skill( 'Spear', 'DX', 1, 'B4E208' );
Skills.SpearThrower = new Skill( 'Spear Thrower', 'DX', 1 , 'B4E222');
Skills.SpeedReading = new Skill( "Speed Reading", 'IQ', 1 , 'B4E222');
Skills.Sports = new Skill( "Sports", 'DX', 1, 'B4E222' );
Skills.Sports.specRequiredList = [];
Skills.Sports.specCategName = 'sport';
Skills.StaffSkill = new Skill( 'Staff', 'DX', 1, 'B4E208' );
Skills.StageCombat = new Skill( "Stage Combat", 'DX', 1, 'B4E222' );
Skills.Stealth = new Skill( 'Stealth', 'DX', 1, 'B4E222' );
Skills.Strategy = new Skill( "Strategy", 'IQ', 2, 'B4E222' );
Skills.Strategy.specRequiredList = [];
Skills.Streetwise = new Skill( 'Streetwise', 'IQ', 1, 'B4E223' );
Skills.Submarine = new Skill( "Submarine", 'DX', 1, 'B4E223' );
Skills.Submarine.TLs = true;
Skills.Submarine.minTL = 5;
Skills.Submarine.specRequiredList = ['Free-Flooding Sub','Large Sub','Mini-Sub'];
Skills.Suggest = new Skill( "Suggest", 'Will', 2, 'B4E191' );
Skills.SumoWrestling = new Skill( "Sumo Wrestling", 'DX', 1, 'B4E223' );
Skills.SumoWrestling.shortname = "Sumo";
Skills.Surgery = new Skill( 'Surgery', 'IQ', 3, 'B4E223' );
Skills.Surgery.TLs = true;
Skills.Survival = new Skill( 'Survival', 'Per', 1, 'B4E223' );
Skills.Survival.specRequiredList = ['Artic','Desert','Island/Beach','Jungle','Mountains','Plains',
      'Swampland','Woodlands','Bank','Deep Ocean Vent','Fresh-Water Lake','Open Ocean','Reef',
      'River/Stream','Salt-Water Sea','Tropical Lagoon','Radioactive','Urban'];
Skills.SwayEmotions = new Skill( "Sway Emotions", 'Will', 2, 'B4E191' );
Skills.Swimming = new Skill( "Swimming", 'HT', 0, 'B4E224' );
Skills.SwordWildcard = new Skill( "Sword!", 'DX', 3, 'B4E175' );
Skills.SwordWildcard.wildcard = true;
Skills.SymbolDrawing = new Skill( "Symbol Drawing", 'IQ', 2, 'B4E224' );
Skills.SymbolDrawing.specRequiredList = [];
Skills.SymbolDrawing.specCategName = 'magical tradition';

Skills.Tactics = new Skill( 'Tactics', 'IQ', 2, 'B4E224' );
Skills.Teaching = new Skill( "Teaching", 'IQ', 1, 'B4E224' );
Skills.Teamster = new Skill( "Teamster", 'IQ', 1, 'B4E225' );
Skills.Teamster.specRequiredList = [];
Skills.Thaumatology = new Skill( "Thaumatology", 'IQ', 3, 'B4E225' );
Skills.Theology = new Skill( "Theology", 'IQ', 2, 'B4E226' );
Skills.Theology.specRequiredList = [];
Skills.Throwing = new Skill( "Throwing", 'DX', 1, 'B4E226' );
Skills.ThrowingArt = new Skill( "Throwing Art", 'DX', 2, 'B4E226' );
Skills.ThrowingArt.cinematic = true;
Skills.ThrownWeapon = new Skill( 'Thrown Weapon', 'DX', 0, 'B4E226' );
Skills.ThrownWeapon.specRequiredList = ['Axe/Mace','Dart','Harpoon','Knife','Shuriken','Spear','Stick'];
Skills.ThrownWeapon.specCategName = 'weapon type';
Skills.Tonfa = new Skill( "Tonfa", 'DX', 1, 'B4E209' );
Skills.Tracking = new Skill( 'Tracking', 'Per', 1, 'B4E226' );
Skills.Traps = new Skill( 'Traps', 'IQ', 1, 'B4E226' );
Skills.Traps.TLs = true;
Skills.TwoHandedAxeMace = new Skill( 'Two-Handed Axe/Mace', 'DX', 1, 'B4E208' );
Skills.TwoHandedAxeMace.shortname = "2H Axe/Mace";
Skills.TwoHandedFlail = new Skill( 'Two-Handed Flail', 'DX', 2, 'B4E208' );
Skills.TwoHandedFlail.shortname = "2H Flail";
Skills.TwoHandedSword = new Skill( 'Two-Handed Sword', 'DX', 1, 'B4E209' );
Skills.TwoHandedSword.shortname = "2H Sword";
Skills.Typing = new Skill( "Typing", 'DX', 0, 'B4E228' );

Skills.UrbanSurvival = new Skill( "Urban Survival", 'Per', 1, 'B4E228' );

Skills.VaccSuit = new Skill( "Vacc Suit", 'DX', 1, 'B4E228' );   // also listed as a specialization under 'Environment Suit'
Skills.VaccSuit.TLs = true;
Skills.VaccSuit.minTL = 7;
Skills.Ventriloquism = new Skill( 'Ventriloquism', 'IQ', 2, 'B4E228' );
Skills.Veterinary = new Skill( 'Veterinary', 'IQ', 2, 'B4E228' );
Skills.Veterinary.TLs = true;

Skills.WeirdScience = new Skill( "Weird Science", 'IQ', 3, 'B4E228' );
Skills.Whip = new Skill( 'Whip', 'DX', 1, 'B4E209' );
Skills.Wrestling = new Skill( 'Wrestling', 'DX', 1, 'B4E228' );
/* have done the 4th edition review to here */
Skills.Writing = new Skill( "Writing", 'IQ', 1, 'B4E228' );

Skills.ZenArchery = new Skill( "Zen Archery", 'IQ', 3, 'B4E228' );

// Skills.Patois = new Skill( "Patois", 'IQ', 0 );
// Skills.Patois.key = "language";

// add a 'key' attribute to each skill with value equal to its label in the Skills, etc. object
for( var l in Skills ) {
    if( !Skills[l].hasOwnProperty('key') ) Skills[l].key = l;
}
// Skills.spacer = {};
// Skills.heading = { heading: '' };

// AFTER the 'key' attribute has been added, tack on clones of skills under different names

// I could do straight clone-skill-with-new-name clones with a function, but I
// would need a hash as input, rather than the array I would use to expand
// specializations (see below):
// var cloneAs = {  'New Name 1' : 'originalSkill1Key', 'New Name 2' : 'originalSkill1Key',
//                  'New Name 3' : 'originalSkill2Key', etc. }

// skills that are separate listings of specialties within other skills (Airshipman, Battlesuit, etc.)

// could I write a createSeparateSkillsForSpecializationsOf() function?
// Then I could do this:
// var SkillsToExpand = ['Crewman',etc];
// createSeparateSkillsForSpecializationsOf( SkillsToExpand );
//
// The function might look something like:
// for( var a in SkillsToExpand ) {
//      var skill = Skills[a];
//      var specs = skill.specializations;
//      for( var b in specs ) {
//          var spec = specs[b];
//          var specKey = spec.replace(/\w//g);
//          Skills[specKey] = skill.clone();
//          // remove specializations array and related stuff from new skill
//          // add some things?
//      }
//  }

Skills.WeatherSense = Skills.Meteorology.clone_proto();     // hum - need to use clone_proto to get properties like TLs to copy
Skills.WeatherSense.name = "Weather Sense";
delete Skills.WeatherSense.TLs;
delete Skills.WeatherSense.specRequiredList;

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
/*  attribute rules
                Example:  { target: 'AxeMace', penalty: -4, from: 'Flail' }
    target:     Always a Skill key
    targetSpec: For skills with pre-defined specializations, where the specialties will have
                distinct prerequisites.
    penalty:    Deduction from level of skill defaulting from.
    from:       Skill (or other source) from which the default derives.
                Use "from: IQ," or similar to indicate non-standard attribute default.
    fromSpec:   For skills with specializations, where the specialties will have distinct defaults.
                You can use "fromSpec: 'same'", for skills with user-defined required specializations
                that should match the specializations of the Default skills.
                If you use "fromSpec: 'same'", don't specify a targetSpec.
    category:   Most defaults come from skills, but many come from character attributes or other
                sources.  Use "category: 'stat'" for defaults from attributes.
                NB: Attribute defaults appropriate for difficulty of the skill are assumed by
                level-calculating code (i.e, average mental skills default to IQ-5).
                If the default is non-standard: "penalty: -5, from: 'IQ', category: 'stat'" (e.g.),
                or there is no attribute default: "penalty: false, category: 'stat'".
                The "from" attribute should be omitted in this case.
*/
Defaults.Accounting_from_Finance               = { target: 'Accounting',                         penalty: -4, from: 'Finance' };
Defaults.Accounting_from_MathematicsStatistics = { target: 'Accounting', fromSpec: 'Statistics', penalty: -5, from: 'Mathematics' };
Defaults.Accounting_from_Merchant              = { target: 'Accounting',                         penalty: -5, from: 'Merchant' };
//Defaults.Acting_from_Bard = { target: 'Acting', penalty: -5, from: 'Bard' };
Defaults.Acting_from_Performance = { target: 'Acting', penalty: -2, from: 'Performance' };
Defaults.Acting_from_PublicSpeaking = { target: 'Acting', penalty: -5, from: 'PublicSpeaking' };
Defaults.Administration_from_Merchant = { target: 'Administration', penalty: -3, from: 'Merchant' };
Defaults.Alchemy_from_stat = { target: 'Alchemy', penalty: false, category: 'stat' };
Defaults.Anthropology_from_Paleontology = { target: 'Anthropology', penalty: -2, from: 'Paleontology', fromSpec: 'Paleoanthropology' };
Defaults.Anthropology_from_Sociology    = { target: 'Anthropology', penalty: -3, from: 'Sociology' };
Defaults.Architecture_from_EngineerCivil = { target: 'Architecture', penalty: -4, from: 'Engineer', fromSpec: 'Civil' };
// Several like: Defaults.Armoury_from_Smith = { target: 'Armoury', targetSpec: 'Melee Weapons', penalty: -3, from: 'Smith', fromSpec: 'Bronze' }; but only at TL1
Defaults.Armoury_from_Engineer = { target: 'Armoury', penalty: -4, from: 'Engineer', fromSpec: 'same' };
Defaults.ArtistInteriorDecorating_from_Architecture = { target: 'Artist', targetSpec: 'Interior Decorating', penalty: -3, from: 'Architecture' };
Defaults.ArtistSceneDesign_from_Architecture = { target: 'Artist', targetSpec: 'Scene Design', penalty: -3, from: 'Architecture' };
Defaults.ArtistWoodworking_from_Carpentry = { target: 'Artist', targetSpec: 'Woodworking', penalty: -3, from: 'Carpentry' };
Defaults.Autohypnosis_from_stat       = { target: 'Autohypnosis', penalty: false, category: 'stat' };
Defaults.Autohypnosis_from_Meditation = { target: 'Autohypnosis', penalty: -4, from: 'Meditation' };
Defaults.AxeMace_from_Flail            = { target: 'AxeMace', penalty: -4, from: 'Flail' };
Defaults.AxeMace_from_TwoHandedAxeMace = { target: 'AxeMace', penalty: -3, from: 'TwoHandedAxeMace' };

Defaults.Bartender_from_Carousing = { target: 'Bartender',  penalty: -3, from: 'Carousing' };
// Defaults.Battlesuit_from_EnvironmentSuitNBCSuit  = { target: 'Battlesuit',  penalty: -2, from: 'EnvironmentSuit', fromSpec: 'NBC Suit' };
// Defaults.Battlesuit_from_EnvironmentSuitVaccSuit = { target: 'Battlesuit',  penalty: -2, from: 'EnvironmentSuit', fromSpec: 'Vacc Suit' };
Defaults.Battlesuit_from_DivingSuit = { target: 'Battlesuit', penalty: -4, from: 'DivingSuit' };
Defaults.Battlesuit_from_NBCSuit    = { target: 'Battlesuit', penalty: -2, from: 'NBCSuit' };
Defaults.Battlesuit_from_VaccSuit   = { target: 'Battlesuit', penalty: -2, from: 'VaccSuit' };
Defaults.Bicycling_from_DrivingMotorcycle = { target: 'Bicycling', penalty: -4, from: 'Driving', fromSpec: 'Motorcycle' };
Defaults.Bioengineering_from_stat    = { target: 'Bioengineering', penalty: false, category: 'stat' };
Defaults.Bioengineering_from_Biology = { target: 'Bioengineering', penalty: -5, from: 'Biology' };
Defaults.Biology_from_IQ = { target: 'Biology', penalty: -6, from: 'IQ', category: 'stat' };
Defaults.Biology_from_Naturalist = { target: 'Biology', penalty: -6, from: 'Naturalist' };
Defaults.BlindFighting_from_stat = { target: 'BlindFighting', penalty: false, category: 'stat' };
Defaults.Boating_from_IQ = { target: 'Boating', penalty: -5, from: 'IQ', category: 'stat' };
Defaults.BoatingMotorboat_from_BoatingPowerboat = { target: 'Boating', targetSpec: 'Motorboat', penalty: -2, from: 'Boating', fromSpec: 'Powerboat' };
Defaults.BoatingMotorboat_from_BoatingSailboat  = { target: 'Boating', targetSpec: 'Motorboat', penalty: -3, from: 'Boating', fromSpec: 'Sailboat' };
Defaults.BoatingMotorboat_from_BoatingUnpowered = { target: 'Boating', targetSpec: 'Motorboat', penalty: -3, from: 'Boating', fromSpec: 'Unpowered' };
Defaults.BoatingPowerboat_from_BoatingMotorboat = { target: 'Boating', targetSpec: 'Powerboat', penalty: -2, from: 'Boating', fromSpec: 'Motorboat' };
Defaults.BoatingPowerboat_from_BoatingSailboat  = { target: 'Boating', targetSpec: 'Powerboat', penalty: -4, from: 'Boating', fromSpec: 'Sailboat' };
Defaults.BoatingPowerboat_from_BoatingUnpowered = { target: 'Boating', targetSpec: 'Powerboat', penalty: -4, from: 'Boating', fromSpec: 'Unpowered' };
Defaults.BoatingSailboat_from_BoatingMotorboat  = { target: 'Boating', targetSpec: 'Sailboat',  penalty: -3, from: 'Boating', fromSpec: 'Motorboat' };
Defaults.BoatingSailboat_from_BoatingPowerboat  = { target: 'Boating', targetSpec: 'Sailboat',  penalty: -4, from: 'Boating', fromSpec: 'Powerboat' };
Defaults.BoatingSailboat_from_BoatingUnpowered  = { target: 'Boating', targetSpec: 'Sailboat',  penalty: -3, from: 'Boating', fromSpec: 'Unpowered' };
Defaults.BoatingUnpowered_from_BoatingMotorboat = { target: 'Boating', targetSpec: 'Unpowered', penalty: -3, from: 'Boating', fromSpec: 'Motorboat' };
Defaults.BoatingUnpowered_from_BoatingPowerboat = { target: 'Boating', targetSpec: 'Unpowered', penalty: -4, from: 'Boating', fromSpec: 'Powerboat' };
Defaults.BoatingUnpowered_from_BoatingSailboat  = { target: 'Boating', targetSpec: 'Unpowered', penalty: -3, from: 'Boating', fromSpec: 'Sailboat' };
Defaults.BodyControl_from_stat = { target: 'BodyControl', penalty: false, category: 'stat' };
Defaults.BodyLanguage_from_stat       = { target: 'BodyLanguage', penalty: false, category: 'stat' };
Defaults.BodyLanguage_from_DetectLies = { target: 'BodyLanguage', penalty: -4, from: 'DetectLies' };
Defaults.BodyLanguage_from_Psychology = { target: 'BodyLanguage', penalty: -4, from: 'Psychology' };
Defaults.BodySense_from_Acrobatics = { target: 'BodySense', penalty: -3, from: 'Acrobatics' };
Defaults.Bolas_from_stat = { target: 'Bolas', penalty: false, category: 'stat' };
Defaults.Boxing_from_stat = { target: 'Boxing', penalty: false, category: 'stat' };
Defaults.BrainHacking_from_stat = { target: 'BrainHacking', penalty: false, category: 'stat' };
Defaults.Brainwashing_from_stat = { target: 'Brainwashing', penalty: false, category: 'stat' };
Defaults.Brawling_from_stat = { target: 'Brawling', penalty: false, category: 'stat' };
Defaults.BreakingBlow_from_stat = { target: 'BreakingBlow', penalty: false, category: 'stat' };
Defaults.BreathControl_from_stat = { target: 'BreathControl', penalty: false, category: 'stat' };
Defaults.Broadsword_from_ForceSword     = { target: 'Broadsword', penalty: -4, from: 'ForceSword' };
Defaults.Broadsword_from_Rapier         = { target: 'Broadsword', penalty: -4, from: 'Rapier' };
Defaults.Broadsword_from_Saber          = { target: 'Broadsword', penalty: -4, from: 'Saber' };
Defaults.Broadsword_from_Shortsword     = { target: 'Broadsword', penalty: -2, from: 'Shortsword' };
Defaults.Broadsword_from_TwoHandedSword = { target: 'Broadsword', penalty: -4, from: 'TwoHandedSword' };

Defaults.Camouflage_from_Survival = { target: 'Camouflage', penalty: -2, from: 'Survival' };
Defaults.Captivate_from_stat = { target: 'Captivate', penalty: false, category: 'stat' };
Defaults.Cartography_from_GeographyPolitical = { target: 'Cartography', penalty: -2, from: 'GeographyPolitical' };
Defaults.Cartography_from_GeographyRegional  = { target: 'Cartography', penalty: -2, from: 'GeographyRegional' };
Defaults.Cartography_from_GeographyPhysical  = { target: 'Cartography', penalty: -2, from: 'GeographyPhysical' };
Defaults.Cartography_from_MathematicsSurveying = { target: 'Cartography', penalty: -2, from: 'Mathematics', fromSpec: 'Surveying' };
Defaults.Cartography_from_Navigation = { target: 'Cartography', penalty: -4, from: 'Navigation' };
Defaults.Chemistry_from_Alchemy = { target: 'Chemistry', penalty: -3, from: 'Alchemy' };
Defaults.Cloak_from_Net    = { target: 'Cloak', penalty: -4, from: 'Net' };
Defaults.Cloak_from_Shield = { target: 'Cloak', penalty: -4, from: 'Shield' };
Defaults.ComputerHacking_from_stat = { target: 'ComputerHacking', penalty: false, category: 'stat' };
Defaults.ComputerProgramming_from_stat = { target: 'ComputerProgramming', penalty: false, category: 'stat' };
Defaults.ConnoisseurLiterature_from_Literature = { target: 'Connoisseur', targetSpec: 'Literature', penalty: -3, from: 'Literature' };
Defaults.ConnoisseurLiterature_from_Poetry = { target: 'Connoisseur', targetSpec: 'Literature', penalty: -3, from: 'Poetry' };
Defaults.ConnoisseurLiterature_from_Writing = { target: 'Connoisseur', targetSpec: 'Literature', penalty: -3, from: 'Writing' };
Defaults.ConnoisseurMusic_from_GroupPerformanceConducting = { target: 'Connoisseur', targetSpec: 'Music', penalty: -3, from: 'GroupPerformance', fromSpec: 'Conducting' };
Defaults.ConnoisseurMusic_from_MusicalComposition = { target: 'Connoisseur', targetSpec: 'Music', penalty: -3, from: 'MusicalComposition' };
Defaults.ConnoisseurMusic_from_MusicalInstrument = { target: 'Connoisseur', targetSpec: 'Music', penalty: -3, from: 'MusicalInstrument' };
Defaults.Cooking_from_Housekeeping = { target: 'Cooking', penalty: -5, from: 'Housekeeping' };
Defaults.Counterfeiting_from_Forgery = { target: 'Counterfeiting', penalty: -2, from: 'Forgery' };
Defaults.Criminology_from_Psychology = { target: 'Criminology', penalty: -4, from: 'Psychology' };
Defaults.Cryptography_from_stat = { target: 'Cryptography', penalty: false, category: 'stat' };
Defaults.Cryptography_from_Mathematics = { target: 'Cryptography', penalty: -5, from: 'Mathematics', fromSpec: 'Cryptology' };
Defaults.CurrentAffairs_from_Research = { target: 'CurrentAffairs', penalty: -4, from: 'Research' };

Defaults.DetectLies_from_BodyLanguage = { target: 'DetectLies', penalty: -4, from: 'BodyLanguage' };
Defaults.DetectLies_from_Psychology = { target: 'DetectLies', penalty: -4, from: 'Psychology' };
Defaults.Diagnosis_from_FirstAid = { target: 'Diagnosis', penalty: -8, from: 'FirstAid' };
Defaults.Diagnosis_from_Physician = { target: 'Diagnosis', penalty: -4, from: 'Physician' };
Defaults.Diagnosis_from_Veterinary = { target: 'Diagnosis', penalty: -5, from: 'Veterinary' };
Defaults.Diplomacy_from_Politics = { target: 'Diplomacy', penalty: -6, from: 'Politics' };
Defaults.Disguise_from_Makeup = { target: 'Disguise', penalty: -3, from: 'Makeup' };
Defaults.DivingSuit_from_Battlesuit = { target: 'DivingSuit', penalty: -4, from: 'Battlesuit' };
Defaults.DivingSuit_from_NBCSuit    = { target: 'DivingSuit', penalty: -4, from: 'NBCSuit' };
Defaults.DivingSuit_from_Scuba      = { target: 'DivingSuit', penalty: -2, from: 'Scuba' };
Defaults.DivingSuit_from_VaccSuit   = { target: 'DivingSuit', penalty: -4, from: 'VaccSuit' };
Defaults.Driving_from_IQ = { target: 'Driving', penalty: -5, from: 'IQ', category: 'stat' };
Defaults.DrivingAutomobile_from_Driving = { target: 'Driving', targetSpec: 'Automobile', penalty: -4, from: 'Driving' };
Defaults.DrivingAutomobile_from_DrivingHeavyWheeled = { target: 'Driving', targetSpec: 'Automobile', penalty: -2, from: 'Driving', fromSpec: 'HeavyWheeled' };
Defaults.DrivingConstructionEquipment_from_Driving = { target: 'Driving', targetSpec: 'ConstructionEquipment', penalty: -5, from: 'Driving' };
Defaults.DrivingHalftrack_from_DrivingTracked = { target: 'Driving', targetSpec: 'Halftrack', penalty: -2, from: 'Driving', fromSpec: 'Tracked' };
Defaults.DrivingHalftrack_from_Driving = { target: 'Driving', targetSpec: 'Halftrack', penalty: -4, from: 'Driving' };
Defaults.DrivingHeavyWheeled_from_DrivingTracked = { target: 'Driving', targetSpec: 'HeavyWheeled', penalty: -2, from: 'Driving', fromSpec: 'Automobile' };
Defaults.DrivingHeavyWheeled_from_Driving = { target: 'Driving', targetSpec: 'HeavyWheeled', penalty: -4, from: 'Driving' };
Defaults.DrivingHovercraft_from_Driving = { target: 'Driving', targetSpec: 'Hovercraft', penalty: -5, from: 'Driving' };
Defaults.DrivingLocomotive_from_Driving = { target: 'Driving', targetSpec: 'Locomotive', penalty: -5, from: 'Driving' };
Defaults.DrivingMecha_from_Battlesuit = { target: 'Driving', targetSpec: 'Mecha', penalty: -3, from: 'Battlesuit' };
Defaults.DrivingMecha_from_Driving = { target: 'Driving', targetSpec: 'Mecha', penalty: -5, from: 'Driving' };
Defaults.DrivingMotorcycle_from_Bicycling = { target: 'Driving', targetSpec: 'Motorcycle', penalty: -4, from: 'Bicycling' };
Defaults.DrivingTracked_from_DrivingHalftrack = { target: 'Driving', targetSpec: 'Tracked', penalty: -2, from: 'Driving', fromSpec: 'Halftrack' };
Defaults.DrivingTracked_from_Driving = { target: 'Driving', targetSpec: 'Tracked', penalty: -4, from: 'Driving' };
Defaults.Dropping_from_DX = { target: 'Dropping', penalty: -3, from: 'DX', category: 'stat' };
Defaults.Dropping_from_Throwing = { target: 'Dropping', penalty: -4, from: 'Throwing' };

Defaults.Economics_from_Finance = { target: 'Economics', penalty: -3, from: 'Finance', };
Defaults.Economics_from_MarketAnalysis = { target: 'Economics', penalty: -5, from: 'MarketAnalysis', };
Defaults.Economics_from_Merchant = { target: 'Economics', penalty: -6, from: 'Merchant' };
Defaults.Electrician_from_EngineerElectrical = { target: 'Electrician', penalty: -3, from: 'Engineer', fromSpec: 'Electrical' };
Defaults.ElectronicsOperation_from_ElectronicsRepair = { target: 'ElectronicsOperation', penalty: -5, from: 'ElectronicsRepair', fromSpec: 'same' };
Defaults.ElectronicsOperation_from_EngineerElectronics = { target: 'ElectronicsOperation', penalty: -5, from: 'Engineer', fromSpec: 'Electronics' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Communications     = { target: 'ElectronicsOperation', targetSpec: 'Communications',     penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Communications' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_ElectronicWarfare  = { target: 'ElectronicsOperation', targetSpec: 'ElectronicWarfare',  penalty: -5, from: 'ElectronicsRepair', fromSpec: 'ElectronicWarfare' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_ForceShields       = { target: 'ElectronicsOperation', targetSpec: 'ForceShields',       penalty: -5, from: 'ElectronicsRepair', fromSpec: 'ForceShields' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_MatterTransmitters = { target: 'ElectronicsOperation', targetSpec: 'MatterTransmitters', penalty: -5, from: 'ElectronicsRepair', fromSpec: 'MatterTransmitters' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Media              = { target: 'ElectronicsOperation', targetSpec: 'Media',              penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Media' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Medical            = { target: 'ElectronicsOperation', targetSpec: 'Medical',            penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Medical' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Parachronic        = { target: 'ElectronicsOperation', targetSpec: 'Parachronic',        penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Parachronic' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Psychotronics      = { target: 'ElectronicsOperation', targetSpec: 'Psychotronics',      penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Psychotronics' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Scientific         = { target: 'ElectronicsOperation', targetSpec: 'Scientific',         penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Scientific' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Security           = { target: 'ElectronicsOperation', targetSpec: 'Security',           penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Security' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Sensors            = { target: 'ElectronicsOperation', targetSpec: 'Sensors',            penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Sensors' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Sonar              = { target: 'ElectronicsOperation', targetSpec: 'Sonar',              penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Sonar' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Surveillance       = { target: 'ElectronicsOperation', targetSpec: 'Surveillance',       penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Surveillance' };
// Defaults.ElectronicsOperation_from_ElectronicsRepair_Temporal           = { target: 'ElectronicsOperation', targetSpec: 'Temporal',           penalty: -5, from: 'ElectronicsRepair', fromSpec: 'Temporal' };
Defaults.ElectronicsRepair_from_ElectronicsOperation                    = { target: 'ElectronicsRepair', penalty: -3, from: 'ElectronicsOperation', fromSpec: 'same' };
Defaults.ElectronicsRepair_from_EngineerElectronics                     = { target: 'ElectronicsRepair', penalty: -3, from: 'Engineer', fromSpec: 'Electronics' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Communications     = { from: 'ElectronicsOperation', targetSpec: 'Communications',     penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Communications' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_ElectronicWarfare  = { from: 'ElectronicsOperation', targetSpec: 'ElectronicWarfare',  penalty: -3, target: 'ElectronicsRepair', fromSpec: 'ElectronicWarfare' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_ForceShields       = { from: 'ElectronicsOperation', targetSpec: 'ForceShields',       penalty: -3, target: 'ElectronicsRepair', fromSpec: 'ForceShields' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_MatterTransmitters = { from: 'ElectronicsOperation', targetSpec: 'MatterTransmitters', penalty: -3, target: 'ElectronicsRepair', fromSpec: 'MatterTransmitters' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Media              = { from: 'ElectronicsOperation', targetSpec: 'Media',              penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Media' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Medical            = { from: 'ElectronicsOperation', targetSpec: 'Medical',            penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Medical' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Parachronic        = { from: 'ElectronicsOperation', targetSpec: 'Parachronic',        penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Parachronic' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Psychotronics      = { from: 'ElectronicsOperation', targetSpec: 'Psychotronics',      penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Psychotronics' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Scientific         = { from: 'ElectronicsOperation', targetSpec: 'Scientific',         penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Scientific' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Security           = { from: 'ElectronicsOperation', targetSpec: 'Security',           penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Security' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Sensors            = { from: 'ElectronicsOperation', targetSpec: 'Sensors',            penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Sensors' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Sonar              = { from: 'ElectronicsOperation', targetSpec: 'Sonar',              penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Sonar' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Surveillance       = { from: 'ElectronicsOperation', targetSpec: 'Surveillance',       penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Surveillance' };
// Defaults.ElectronicsRepair_from_ElectronicsOperation_Temporal           = { from: 'ElectronicsOperation', targetSpec: 'Temporal',           penalty: -3, target: 'ElectronicsRepair', fromSpec: 'Temporal' };
Defaults.Engineer_from_stat                                           = { target: 'Engineer',                                penalty: false, category: 'stat' };
Defaults.Engineer_from_Engineer                                       = { target: 'Engineer',                                penalty: -4, from: 'Engineer',             fromSpec: 'other' };
Defaults.EngineerArtillery_from_ArmouryHeavyWeapons                   = { target: 'Engineer', targetSpec: 'Artillery',       penalty: -6, from: 'Armoury',              fromSpec: 'HeavyWeapons' };
Defaults.EngineerCivil_from_Architecture                              = { target: 'Engineer', targetSpec: 'Civil',           penalty: -6, from: 'Architecture' };
Defaults.EngineerClockwork_from_MechanicClockwork                     = { target: 'Engineer', targetSpec: 'Clockwork',       penalty: -6, from: 'Mechanic',             fromSpec: 'Clockwork' };
Defaults.EngineerCombat_from_ExplosivesDemolition                     = { target: 'Engineer', targetSpec: 'Combat',          penalty: -6, from: 'Explosives',           fromSpec: 'Demolition' };
Defaults.EngineerElectrical_from_Electrician                          = { target: 'Engineer', targetSpec: 'Electrical',      penalty: -6, from: 'Electrician' };
Defaults.EngineerElectronics_from_ElectronicsRepair                   = { target: 'Engineer', targetSpec: 'Electronics',     penalty: -6, from: 'ElectronicsRepair' };
Defaults.EngineerMaterials_from_Chemistry                             = { target: 'Engineer', targetSpec: 'Materials',       penalty: -6, from: 'Chemistry' };
Defaults.EngineerMaterials_from_Metallurgy                            = { target: 'Engineer', targetSpec: 'Materials',       penalty: -6, from: 'Metallurgy' };
Defaults.EngineerMicrotechnology_from_MechanicMicromachines           = { target: 'Engineer', targetSpec: 'Microtechnology', penalty: -6, from: 'Mechanic',             fromSpec: 'Micromachines' };
Defaults.EngineerMining_from_ExplosivesDemolition                     = { target: 'Engineer', targetSpec: 'Mining',          penalty: -6, from: 'Explosives',           fromSpec: 'Demolition' };
Defaults.EngineerMining_from_Geology                                  = { target: 'Engineer', targetSpec: 'Mining',          penalty: -6, from: 'Geology' };
Defaults.EngineerNanotechnology_from_MechanicNanomachines             = { target: 'Engineer', targetSpec: 'Nanotechnology',  penalty: -6, from: 'Mechanic',             fromSpec: 'Nanomachines' };
Defaults.EngineerParachronic_from_ElectronicsOperationParachronic     = { target: 'Engineer', targetSpec: 'Parachronic',     penalty: -6, from: 'ElectronicsOperation', fromSpec: 'Parachronic' };
Defaults.EngineerPsychotronics_from_ElectronicsOperationPsychotronics = { target: 'Engineer', targetSpec: 'Psychotronics',   penalty: -6, from: 'ElectronicsOperation', fromSpec: 'Psychotronics' };
Defaults.EngineerRobotics_from_MechanicRobotics                       = { target: 'Engineer', targetSpec: 'Robotics',        penalty: -6, from: 'Mechanic',             fromSpec: 'Robotics' };
Defaults.EngineerSmallArms_from_ArmourySmallArms                      = { target: 'Engineer', targetSpec: 'SmallArms',       penalty: -6, from: 'Armoury',              fromSpec: 'SmallArms' };
Defaults.EngineerTemporal_from_ElectronicsOperationTemporal           = { target: 'Engineer', targetSpec: 'Temporal',        penalty: -6, from: 'ElectronicsOperation', fromSpec: 'Temporal' };
Defaults.EngineerAutomobiles_from_MechanicAutomobiles                 = { target: 'Engineer', targetSpec: 'Automobiles',     penalty: -6, from: 'Mechanic',             fromSpec: 'Automobiles' };
Defaults.EngineerShips_from_MechanicShips                             = { target: 'Engineer', targetSpec: 'Ships',           penalty: -6, from: 'Mechanic',             fromSpec: 'Ships' };
Defaults.EngineerStarships_from_MechanicStarships                     = { target: 'Engineer', targetSpec: 'Starships',       penalty: -6, from: 'Mechanic',             fromSpec: 'Starships' };
Defaults.Enthrallment_from_stat = { target: 'Enthrallment', penalty: false, category: 'stat' };
Defaults.EnvironmentSuitDivingSuit_from_Scuba                   = { target: 'EnvironmentSuit', targetSpec: 'Diving Suit', penalty: -2, from: 'Scuba' };
Defaults.EnvironmentSuitBattlesuit_from_EnvironmentSuitNBCSuit  = { target: 'EnvironmentSuit', targetSpec: 'Battlesuit',  penalty: -2, from: 'EnvironmentSuit', fromSpec: 'NBC Suit' };
Defaults.EnvironmentSuitBattlesuit_from_EnvironmentSuitVaccSuit = { target: 'EnvironmentSuit', targetSpec: 'Battlesuit',  penalty: -2, from: 'EnvironmentSuit', fromSpec: 'Vacc Suit' };
Defaults.EnvironmentSuitNBCSuit_from_EnvironmentSuitBattlesuit  = { target: 'EnvironmentSuit', targetSpec: 'NBC Suit',    penalty: -2, from: 'EnvironmentSuit', fromSpec: 'Battlesuit' };
Defaults.EnvironmentSuitNBCSuit_from_EnvironmentSuitVaccSuit    = { target: 'EnvironmentSuit', targetSpec: 'NBC Suit',    penalty: -2, from: 'EnvironmentSuit', fromSpec: 'Vacc Suit' };
Defaults.EnvironmentSuitVaccSuit_from_EnvironmentSuitBattlesuit = { target: 'EnvironmentSuit', targetSpec: 'Vacc Suit',   penalty: -2, from: 'EnvironmentSuit', fromSpec: 'Battlesuit' };
Defaults.EnvironmentSuitVaccSuit_from_EnvironmentSuitNBCSuit    = { target: 'EnvironmentSuit', targetSpec: 'Vacc Suit',   penalty: -2, from: 'EnvironmentSuit', fromSpec: 'NBC Suit' };
Defaults.EnvironmentSuitDivingSuit_from_EnvironmentSuit         = { target: 'EnvironmentSuit', targetSpec: 'Diving Suit', penalty: -4, from: 'EnvironmentSuit' };
Defaults.EroticArt_from_Acrobatics = { target: 'EroticArt', penalty: -5, from: 'Acrobatics' };
Defaults.Exorcism_from_ReligiousRitual = { target: 'Exorcism', penalty: -3, from: 'ReligiousRitual' };
Defaults.Exorcism_from_RitualMagic     = { target: 'Exorcism', penalty: -3, from: 'RitualMagic' };
Defaults.Exorcism_from_Theology        = { target: 'Exorcism', penalty: -3, from: 'Theology' };
Defaults.ExpertSkill_from_stat = { target: 'ExpertSkill', penalty: false, category: 'stat' };
Defaults.ExplosivesDemolition_from_EngineerCombat = { target: 'Explosives', targetSpec: 'Demolition',                  penalty: -3, from: 'Engineer',   fromSpec: 'Combat' };
Defaults.ExplosivesDemolition_from_EngineerMining = { target: 'Explosives', targetSpec: 'Demolition',                  penalty: -3, from: 'Engineer',   fromSpec: 'Mining' };
Defaults.ExplosivesFireworks_from_Chemistry       = { target: 'Explosives', targetSpec: 'Fireworks',                   penalty: -3, from: 'Chemistry' };
Defaults.Explosives_from_Explosives               = { target: 'Explosives',                                            penalty: -4, from: 'Explosives' };
Defaults.ExplosivesDemolition_from_ExplosivesUD   = { target: 'Explosives', targetSpec: 'Demolition',                  penalty: -2, from: 'Explosives', fromSpec: 'Underwater Demolition' };
Defaults.ExplosivesUD_from_ExplosivesDemolition   = { target: 'Explosives', targetSpec: 'Underwater Demolition',       penalty: -2, from: 'Explosives', fromSpec: 'Demolition' };
Defaults.ExplosivesEOD_from_ExplosivesNOD         = { target: 'Explosives', targetSpec: 'Explosive Ordnance Disposal', penalty: -2, from: 'Explosives', fromSpec: 'Nuclear Ordnance Disposal' };
Defaults.ExplosivesNOD_from_ExplosivesEOD         = { target: 'Explosives', targetSpec: 'Nuclear Ordnance Disposal',   penalty: -2, from: 'Explosives', fromSpec: 'Explosive Ordnance Disposal' };

Defaults.Falconry_from_AnimalHandlingRaptors = { target: 'Falconry', penalty: -3, from: 'AnimalHandling', fromSpec: 'Raptors' };
Defaults.Farming_from_Biology = { target: 'Farming', penalty: -5, from: 'Biology' };
Defaults.Farming_from_Gardening = { target: 'Farming', penalty: -3, from: 'Gardening' };

Defaults.FastDraw_from_stat = { target: 'FastDraw', penalty: false, category: 'stat' };
Defaults.FastTalk_from_Acting = { target: 'FastTalk', penalty: -5, from: 'Acting' };
Defaults.Finance_from_stat = { target: 'Finance', penalty: false, category: 'stat' };
Defaults.Finance_from_Accounting = { target: 'Finance', penalty: -4, from: 'Accounting' };
Defaults.Finance_from_Economics = { target: 'Finance', penalty: -3, from: 'Economics' };
Defaults.Finance_from_Merchant = { target: 'Finance', penalty: -6, from: 'Merchant' };
Defaults.Filch_from_Pickpocket = { target: 'Filch', penalty: -4, from: 'Pickpocket' };
Defaults.Filch_from_SleightofHand = { target: 'Filch', penalty: -4, from: 'SleightofHand' };
Defaults.FireEating_from_stat = { target: 'FireEating', penalty: false, category: 'stat' };
Defaults.FirstAid_from_EsotericMedicine = { target: 'FirstAid', penalty: 0, from: 'EsotericMedicine' };
Defaults.FirstAid_from_Physician = { target: 'FirstAid', penalty: 0, from: 'Physician' };
Defaults.FirstAid_from_Veterinary = { target: 'FirstAid', penalty: -4, from: 'Veterinary' };
Defaults.Flail_from_AxeMace        = { target: 'Flail', penalty: -4, from: 'AxeMace' };
Defaults.Flail_from_TwoHandedFlail = { target: 'Flail', penalty: -3, from: 'TwoHandedFlail' };
Defaults.FlyingLeap_from_stat = { target: 'FlyingLeap', penalty: false, category: 'stat' };
Defaults.ForceSword_from_Broadsword     = { target: 'ForceSword', penalty: -3, from: 'Broadsword' };
Defaults.ForceSword_from_JitteSai       = { target: 'ForceSword', penalty: -3, from: 'JitteSai' };
Defaults.ForceSword_from_Knife          = { target: 'ForceSword', penalty: -3, from: 'Knife' };
Defaults.ForceSword_from_Shortsword     = { target: 'ForceSword', penalty: -3, from: 'Shortsword' };
Defaults.ForceSword_from_TwoHandedSword = { target: 'ForceSword', penalty: -3, from: 'TwoHandedSword' };
Defaults.ForceWhip_from_Kusari       = { target: 'ForceWhip', penalty: -3, from: 'Kusari' };
Defaults.ForceWhip_from_MonowireWhip = { target: 'ForceWhip', penalty: -3, from: 'MonowireWhip' };
Defaults.ForceWhip_from_Whip         = { target: 'ForceWhip', penalty: -3, from: 'Whip' };
Defaults.ForcedEntry_from_stat = { target: 'ForcedEntry', penalty: false, category: 'stat' };
Defaults.Forensics_from_Criminology = { target: 'Forensics', penalty: -4, from: 'Criminology' };
Defaults.Forgery_from_Counterfeiting = { target: 'Forgery', penalty: -2, from: 'Counterfeiting' };
Defaults.FortuneTelling_from_FastTalk = { target: 'FortuneTelling', penalty: -3, from: 'FastTalk' };
Defaults.FortuneTelling_from_Occultism = { target: 'FortuneTelling', penalty: -3, from: 'Occultism' };
Defaults.ForwardObserver_from_Artillery = { target: 'ForwardObserver', penalty: -5, from: 'Artillery' };
// Defaults.ForwardObserver_from_ElectronicsOperation = { target: 'ForwardObserver', penalty: -5, from: 'ElectronicsOperation' };    // only at TL 7+
Defaults.FreeFall_from_HT = { target: 'FreeFall', penalty: -5, from: 'HT' };

Defaults.Gambling_from_MathematicsStatistics = { target: 'Gambling', penalty: -5, from: 'Mathematics', fromSpec: 'Statistics' };
Defaults.Gardening_from_Farming = { target: 'Gardening', penalty: -3, from: 'Farming' };
Defaults.GeographyPhysical_from_GeographyPolitical = { target: 'GeographyPhysical',  penalty: -5, from: 'GeographyPolitical' };
Defaults.GeographyPhysical_from_GeographyRegional  = { target: 'GeographyPhysical',  penalty: -5, from: 'GeographyRegional' };
Defaults.GeographyPolitical_from_GeographyPhysical = { target: 'GeographyPolitical', penalty: -5, from: 'GeographyPhysical' };
Defaults.GeographyPolitical_from_GeographyRegional = { target: 'GeographyPolitical', penalty: -5, from: 'GeographyPolitical' };
Defaults.GeographyRegional_from_GeographyPhysical  = { target: 'GeographyRegional',  penalty: -5, from: 'GeographyPolitical' };
Defaults.GeographyRegional_from_GeographyPolitical = { target: 'GeographyRegional',  penalty: -5, from: 'GeographyPolitical' };
Defaults.GeographyPhysical_from_Geology = { target: 'GeographyPhysical', penalty: -4, from: 'Geology', fromSpec: 'same' };
Defaults.GeographyPhysical_from_Meteorology = { target: 'GeographyPhysical', penalty: -4, from: 'Meteorology', fromSpec: 'same' };
Defaults.GeographyPolitical_from_Economics = { target: 'GeographyPolitical', penalty: -4, from: 'Economics' };
Defaults.GeographyRegional_from_AreaKnowledge = { target: 'GeographyRegional', penalty: -6, from: 'AreaKnowledge', fromSpec: 'same' };
Defaults.Geology_from_GeographyPhysical = { target: 'Geology', penalty: -4, from: 'GeographyPhysical' };
Defaults.Geology_from_Prospecting = { target: 'Geology', penalty: -5, from: 'Prospecting' };
Defaults.GroupPerformanceChoreography_from_Dancing = { target: 'GroupPerformance', targetSpec: 'Choreography', penalty: -2, from: 'Dancing' };
Defaults.GroupPerformanceConducting_from_MusicalInstrument = { target: 'GroupPerformance', targetSpec: 'Conducting', penalty: -2, from: 'MusicalInstrument' };
Defaults.GroupPerformanceConducting_from_Singing = { target: 'GroupPerformance', targetSpec: 'Conducting', penalty: -2, from: 'Singing' };
Defaults.GroupPerformanceDirecting_from_Performance = { target: 'GroupPerformance', targetSpec: 'Directing', penalty: -5, from: 'Performance' };
Defaults.GroupPerformanceFightChoreography_from_StageCombat = { target: 'GroupPerformance', targetSpec: 'Fight Choreography', penalty: -2, from: 'StageCombat' };
Defaults.Gunner_from_Gunner = { target: 'Gunner', penalty: -4, from: 'Gunner' };
Defaults.Guns_from_Guns = { target: 'Guns', penalty: -2, from: 'Guns' };
// some gun-specialization-to-gun-specialization defaults are at -4; I didn't feel like going to that much trouble (would mean defining something like 40 defaults)
// it might be nice if more-specific defaults could override less-specific ones, instead of the current scheme of just taking whichever default is best
// in this particular instance though, it sounds like it would still take ~20 default entries to deal with those -4 default cases
// What would happen if I defined 6: fromSpecs GL/Gyroc/LAW to any Gun, and from any Gun to targetSpecs GL/Gyroc/LAW?

Defaults.ThrownWeaponHarpoon_from_ThrownWeaponSpear = { target: 'ThrownWeaponHarpoon', penalty: -2, from: 'ThrownWeaponSpear' };
Defaults.HazardousMaterials_from_HazardousMaterials = { target: 'HazardousMaterials', penalty: -5, from: 'HazardousMaterials' };  // 'mundane' cross-specialty default
Defaults.Heraldry_from_SavoirFaire = { target: 'Heraldry', penalty: -3, from: 'SavoirFaire', fromSpec: 'High Society' };
Defaults.HerbLore_from_stat = { target: 'HerbLore', penalty: false, category: 'stat' };
Defaults.HiddenLore_from_stat = { target: 'HiddenLore', penalty: false, category: 'stat' };
Defaults.Holdout_from_SleightofHand = { target: 'Holdout', penalty: -3, from: 'SleightofHand' };
Defaults.Hypnotism_from_stat = { target: 'Hypnotism', penalty: false, category: 'stat' };

Defaults.ImmovableStance_from_stat = { target: 'ImmovableStance', penalty: false, category: 'stat' };
Defaults.InnateAttack_from_InnateAttack = { target: 'InnateAttack', penalty: -2, from: 'InnateAttack' };
Defaults.IntelligenceAnalysis_from_Strategy = { target: 'IntelligenceAnalysis', penalty: -6, from: 'Strategy' };
Defaults.Interrogation_from_Intimidation = { target: 'Interrogation', penalty: -3, from: 'Intimidation' };
Defaults.Interrogation_from_Psychology   = { target: 'Interrogation', penalty: -4, from: 'Psychology' };
Defaults.Intimidation_from_Acting = { target: 'Intimidation', penalty: -3, from: 'Acting' };
Defaults.InvisibilityArt_from_stat = { target: 'InvisibilityArt', penalty: false, category: 'stat' };

Defaults.Jeweler_from_SmithCu   = { target: 'Jeweler', penalty: -4, from: 'Smith', fromSpec: 'Copper' };
Defaults.Jeweler_from_SmithPbSn = { target: 'Jeweler', penalty: -4, from: 'Smith', fromSpec: 'Lead and Tin' };
Defaults.JitteSai_from_ForceSword = { target: 'JitteSai', penalty: -4, from: 'ForceSword' };
Defaults.JitteSai_from_MainGauche = { target: 'JitteSai', penalty: -4, from: 'MainGauche' };
Defaults.JitteSai_from_Shortsword = { target: 'JitteSai', penalty: -3, from: 'Shortsword' };
Defaults.Judo_from_stat = { target: 'Judo', penalty: false, category: 'stat' };
Defaults.Jumping_from_stat = { target: 'Jumping', penalty: false, category: 'stat' };

Defaults.Karate_from_stat = { target: 'Karate', penalty: false, category: 'stat' };
Defaults.Kiai_from_stat = { target: 'Kiai', penalty: false, category: 'stat' };
Defaults.Knife_from_ForceSword = { target: 'Knife', penalty: -3, from: 'ForceSword' };
Defaults.Knife_from_MainGauche = { target: 'Knife', penalty: -3, from: 'MainGauche' };
Defaults.Knife_from_Shortsword = { target: 'Knife', penalty: -3, from: 'Shortsword' };
Defaults.KnotTying_from_Climbing          = { target: 'KnotTying', penalty: -4, from: 'Climbing' };
Defaults.KnotTying_from_CrewmanSeamanship = { target: 'KnotTying', penalty: -4, from: 'Crewman', fromSpec: 'Seamanship' };
//Defaults.ThrownWeaponKnife_from_DX = { target: 'ThrownWeaponKnife', penalty: -4, from: 'DX' };
Defaults.Kusari_from_TwoHandedFlail = { target: 'Kusari', penalty: -4, from: 'TwoHandedFlail' };
Defaults.Kusari_from_ForceWhip      = { target: 'Kusari', penalty: -3, from: 'ForceWhip' };
Defaults.Kusari_from_MonowireWhip   = { target: 'Kusari', penalty: -3, from: 'MonowireWhip' };
Defaults.Kusari_from_Whip           = { target: 'Kusari', penalty: -3, from: 'Whip' };

Defaults.Lance_from_Spear = { target: 'Lance', penalty: -3, from: 'Spear' };
Defaults.Lasso_from_stat = { target: 'Lasso', penalty: false, category: 'stat' };
Defaults.Lifting_from_stat = { target: 'Lifting', penalty: false, category: 'stat' };
Defaults.LightWalk_from_stat = { target: 'LightWalk', penalty: false, category: 'stat' };
Defaults.Linguistics_from_stat = { target: 'Linguistics', penalty: false, category: 'stat' };
Defaults.LipReading_from_Per = { target: 'LipReading', penalty: -10, from: 'Per' };
Defaults.LiquidProjector_from_LiquidProjector = { target: 'LiquidProjector', penalty: -4, from: 'LiquidProjector' };

Defaults.Machinist_from_Mechanic = { target: 'Machinist', penalty: -5, from: 'Mechanic' };
Defaults.MainGauche_from_JitteSai   = { target: 'MainGauche', penalty: -4, from: 'JitteSai' };
Defaults.MainGauche_from_Knife      = { target: 'MainGauche', penalty: -4, from: 'Knife' };
Defaults.MainGauche_from_Rapier     = { target: 'MainGauche', penalty: -3, from: 'Rapier' };
Defaults.MainGauche_from_Saber      = { target: 'MainGauche', penalty: -3, from: 'Saber' };
Defaults.MainGauche_from_Smallsword = { target: 'MainGauche', penalty: -3, from: 'Smallsword' };
Defaults.Makeup_from_Disguise = { target: 'Makeup', penalty: -2, from: 'Disguise' };
Defaults.MarketAnalysis_from_Economics = { target: 'MarketAnalysis', penalty: -5, from: 'Economics' };
Defaults.MarketAnalysis_from_Merchant  = { target: 'MarketAnalysis', penalty: -4, from: 'Merchant' };
Defaults.Mathematics_from_Mathematics            = { target: 'Mathematics',                                 penalty: -5, from: 'Mathematics' };
Defaults.MathematicsApplied_from_Engineer        = { target: 'Mathematics', targetSpec: 'Applied',          penalty: -5, from: 'Engineer' };
Defaults.MathematicsApplied_from_Physics         = { target: 'Mathematics', targetSpec: 'Applied',          penalty: -5, from: 'Physics' };
Defaults.MathematicsCS_from_ComputerProgramming  = { target: 'Mathematics', targetSpec: 'Computer Science', penalty: -5, from: 'ComputerProgramming' };
Defaults.MathematicsCryptology_from_Cryptography = { target: 'Mathematics', targetSpec: 'Cryptology',       penalty: -5, from: 'Cryptography' };
Defaults.MathematicsSurveying_from_Cartography   = { target: 'Mathematics', targetSpec: 'Surveying',        penalty: -3, from: 'Cartography' };
Defaults.MathematicsSurveying_from_Navigation    = { target: 'Mathematics', targetSpec: 'Surveying',        penalty: -4, from: 'Navigation' };
Defaults.Mechanic_from_Mechanic  = { target: 'Mechanic', penalty: -4, from: 'Mechanic' };
Defaults.Mechanic_from_Engineer  = { target: 'Mechanic', penalty: -4, from: 'Engineer', fromSpec: 'same' };
Defaults.Mechanic_from_Machinist = { target: 'Mechanic', penalty: -5, from: 'Machinist' };
Defaults.Meditation_from_Autohypnosis = { target: 'Meditation', penalty: -4, from: 'Autohypnosis' };
Defaults.MentalStrength_from_stat = { target: 'MentalStrength', penalty: false, category: 'stat' };
Defaults.Merchant_from_Finance        = { target: 'Merchant', penalty: -6, from: 'Finance' };
Defaults.Merchant_from_MarketAnalysis = { target: 'Merchant', penalty: -4, from: 'MarketAnalysis' };
Defaults.Metallurgy_from_stat      = { target: 'Metallurgy', penalty: false, category: 'stat' };
Defaults.Metallurgy_from_Chemistry = { target: 'Metallurgy', penalty: -5, from: 'Chemistry' };
Defaults.Metallurgy_from_Jeweler   = { target: 'Metallurgy', penalty: -8, from: 'Jeweler' };
Defaults.Metallurgy_from_Smith     = { target: 'Metallurgy', penalty: -8, from: 'Smith' };
Defaults.MimicryAnimalSounds_from_Naturalist       = { target: 'Mimicry', targetSpec: 'Animal Sounds', penalty: -6, from: 'Naturalist' };
Defaults.MimicryAnimalSounds_from_MimicryBirdCalls = { target: 'Mimicry', targetSpec: 'Animal Sounds', penalty: -6, from: 'Mimicry', fromSpec: 'BirdCalls' };
Defaults.MimicryBirdCalls_from_Naturalist          = { target: 'Mimicry', targetSpec: 'Bird Calls',    penalty: -6, from: 'Naturalist' };
Defaults.MimicrySpeech_from_Acting                 = { target: 'Mimicry', targetSpec: 'Speech',        penalty: -6, from: 'Acting' };
Defaults.MimicrySpeech_from_Linguistics            = { target: 'Mimicry', targetSpec: 'Speech',        penalty: -4, from: 'Linguistics' };
Defaults.MindBlock_from_Meditation = { target: 'MindBlock', penalty: -5, from: 'Meditation' };
Defaults.MonowireWhip_from_ForceWhip = { target: 'MonowireWhip', penalty: -3, from: 'ForceWhip' };
Defaults.MonowireWhip_from_Kusari    = { target: 'MonowireWhip', penalty: -3, from: 'Kusari' };
Defaults.MonowireWhip_from_Whip      = { target: 'MonowireWhip', penalty: -3, from: 'Whip' };
Defaults.MusicalComposition_from_stat              = { target: 'MusicalComposition', penalty: false, category: 'stat' };
Defaults.MusicalComposition_from_MusicalInstrument = { target: 'MusicalComposition', penalty: -2, from: 'MusicalInstrument' };
Defaults.MusicalComposition_from_Poetry            = { target: 'MusicalComposition', penalty: -2, from: 'Poetry' };
Defaults.MusicalInfluence_from_stat = { target: 'MusicalInfluence', penalty: false, category: 'stat' };

Defaults.Naturalist_from_Biology = { target: 'Naturalist', penalty: -3, from: 'Biology' };
Defaults.NavigationSea_from_stat                      = { target: 'Navigation', targetSpec: 'Sea',        penalty: false, category: 'stat' };
Defaults.NavigationSea_from_NavigationAir             = { target: 'Navigation', targetSpec: 'Sea',        penalty: -2,    from: 'Navigation',  fromSpec: 'Air' };
Defaults.NavigationSea_from_NavigationLand            = { target: 'Navigation', targetSpec: 'Sea',        penalty: -2,    from: 'Navigation',  fromSpec: 'Land' };
Defaults.NavigationSea_from_Astronomy                 = { target: 'Navigation', targetSpec: 'Sea',        penalty: -5,    from: 'Astronomy' };
//Defaults.NavigationSea_from_Seamanship                = { target: 'Navigation', targetSpec: 'Sea',        penalty: -5,    from: 'Seamanship' };
Defaults.NavigationSea_from_CrewmanSeamanship         = { target: 'Navigation', targetSpec: 'Sea',        penalty: -5,    from: 'Crewman',     fromSpec: 'Seamanship' };
Defaults.NavigationAir_from_stat                      = { target: 'Navigation', targetSpec: 'Air',        penalty: false, category: 'stat' };
Defaults.NavigationAir_from_NavigationSea             = { target: 'Navigation', targetSpec: 'Air',        penalty: -2,    from: 'Navigation',  fromSpec: 'Sea' };
Defaults.NavigationAir_from_NavigationLand            = { target: 'Navigation', targetSpec: 'Air',        penalty: -2,    from: 'Navigation',  fromSpec: 'Land' };
Defaults.NavigationAir_from_Astronomy                 = { target: 'Navigation', targetSpec: 'Air',        penalty: -5,    from: 'Astronomy' };
Defaults.NavigationLand_from_Cartography              = { target: 'Navigation', targetSpec: 'Land',       penalty: -4,    from: 'Cartography' };
Defaults.NavigationLand_from_NavigationAir            = { target: 'Navigation', targetSpec: 'Land',       penalty: -2,    from: 'Navigation',  fromSpec: 'Air' };
Defaults.NavigationLand_from_NavigationSea            = { target: 'Navigation', targetSpec: 'Land',       penalty: -2,    from: 'Navigation',  fromSpec: 'Sea' };
Defaults.NavigationLand_from_MathematicsSurveying     = { target: 'Navigation', targetSpec: 'Land',       penalty: -4,    from: 'Mathematics', fromSpec: 'Surveying' };
Defaults.NavigationSpace_from_stat                    = { target: 'Navigation', targetSpec: 'Space',      penalty: false, category: 'stat' };
Defaults.NavigationSpace_from_NavigationHyperspace    = { target: 'Navigation', targetSpec: 'Space',      penalty: -4,    from: 'Navigation',  fromSpec: 'Hyperspace' };
Defaults.NavigationSpace_from_Astronomy               = { target: 'Navigation', targetSpec: 'Space',      penalty: -4,    from: 'Astronomy' };
Defaults.NavigationSpace_from_MathematicsApplied      = { target: 'Navigation', targetSpec: 'Space',      penalty: -4,    from: 'Mathematics', fromSpec: 'Applied' };
Defaults.NavigationHyperspace_from_stat               = { target: 'Navigation', targetSpec: 'Hyperspace', penalty: false, category: 'stat' };
Defaults.NavigationHyperspace_from_NavigationSpace    = { target: 'Navigation', targetSpec: 'Hyperspace', penalty: -5,    from: 'Navigation',  fromSpec: 'Space' };
Defaults.NavigationHyperspace_from_Astronomy          = { target: 'Navigation', targetSpec: 'Hyperspace', penalty: -4,    from: 'Astronomy' };
Defaults.NavigationHyperspace_from_MathematicsApplied = { target: 'Navigation', targetSpec: 'Hyperspace', penalty: -4,    from: 'Mathematics', fromSpec: 'Applied' };

Defaults.NBCSuit_from_Battlesuit = { target: 'NBCSuit', penalty: -2, from: 'Battlesuit' };
Defaults.NBCSuit_from_DivingSuit = { target: 'NBCSuit', penalty: -4, from: 'DivingSuit' };
Defaults.NBCSuit_from_VaccSuit   = { target: 'NBCSuit', penalty: -2, from: 'VaccSuit' };

Defaults.Net_from_stat  = { target: 'Net', penalty: false, category: 'stat' };
Defaults.Net_from_Cloak = { target: 'Net', penalty: -5,    from: 'Cloak' };

Defaults.Observation_from_Shadowing = { target: 'Observation', penalty: -5, from: 'Shadowing' };

Defaults.Packing_from_AnimalHandlingEquines = { target: 'Packing', penalty: -6, from: 'AnimalHandling', fromSpec: 'Equines' };
Defaults.Paleontology_from_stat    = { target: 'Paleontology', penalty: false, category: 'stat' };
Defaults.Paleontology_from_Biology = { target: 'Paleontology', penalty: -4, from: 'Biology' };
Defaults.PaleontologyPaleoanthropology_from_Anthropology = { target: 'Paleontology', targetSpec: 'Paleoanthropology', penalty: -2, from: 'Anthropology' };
Defaults.Panhandling_from_PublicSpeaking = { target: 'Panhandling', penalty: -3, from: 'PublicSpeaking' };
Defaults.Panhandling_from_FastTalk       = { target: 'Panhandling', penalty: -2, from: 'FastTalk' };
Defaults.ParryMissileWeapons_from_stat = { target: 'ParryMissileWeapons', penalty: false, category: 'stat' };
Defaults.PathofBodyControl_from_RitualMagic = { target: 'PathofBodyControl', penalty: -6, from: 'RitualMagic' };
Defaults.PathofCommunicationEmpathy_from_RitualMagic = { target: 'PathofCommunicationEmpathy', penalty: -6, from: 'RitualMagic' };
Defaults.PathofEarth_from_RitualMagic = { target: 'PathofEarth', penalty: -6, from: 'RitualMagic' };
Defaults.PathofAir_from_RitualMagic = { target: 'PathofAir', penalty: -6, from: 'RitualMagic' };
Defaults.PathofFire_from_RitualMagic = { target: 'PathofFire', penalty: -6, from: 'RitualMagic' };
Defaults.PathofWater_from_RitualMagic = { target: 'PathofWater', penalty: -6, from: 'RitualMagic' };
Defaults.PathofEnchantment_from_RitualMagic = { target: 'PathofEnchantment', penalty: -6, from: 'RitualMagic' };
Defaults.PathofGate_from_RitualMagic = { target: 'PathofGate', penalty: -6, from: 'RitualMagic' };
Defaults.PathofHealing_from_RitualMagic = { target: 'PathofHealing', penalty: -6, from: 'RitualMagic' };
Defaults.PathofKnowledge_from_RitualMagic = { target: 'PathofKnowledge', penalty: -6, from: 'RitualMagic' };
Defaults.PathofLightDarkness_from_RitualMagic = { target: 'PathofLightDarkness', penalty: -6, from: 'RitualMagic' };
Defaults.PathofMetaSpells_from_RitualMagic = { target: 'PathofMetaSpells', penalty: -6, from: 'RitualMagic' };
Defaults.PathofMindControl_from_RitualMagic = { target: 'PathofMindControl', penalty: -6, from: 'RitualMagic' };
Defaults.PathofMovement_from_RitualMagic = { target: 'PathofMovement', penalty: -6, from: 'RitualMagic' };
Defaults.PathofNecromancy_from_RitualMagic = { target: 'PathofNecromancy', penalty: -6, from: 'RitualMagic' };
Defaults.PathofProtectionWarning_from_RitualMagic = { target: 'PathofProtectionWarning', penalty: -6, from: 'RitualMagic' };
Defaults.PathofBodyControl_from_Thaumatology = { target: 'PathofBodyControl', penalty: -6, from: 'Thaumatology' };
Defaults.PathofCommunicationEmpathy_from_Thaumatology = { target: 'PathofCommunicationEmpathy', penalty: -6, from: 'Thaumatology' };
Defaults.PathofEarth_from_Thaumatology = { target: 'PathofEarth', penalty: -6, from: 'Thaumatology' };
Defaults.PathofAir_from_Thaumatology = { target: 'PathofAir', penalty: -6, from: 'Thaumatology' };
Defaults.PathofFire_from_Thaumatology = { target: 'PathofFire', penalty: -6, from: 'Thaumatology' };
Defaults.PathofWater_from_Thaumatology = { target: 'PathofWater', penalty: -6, from: 'Thaumatology' };
Defaults.PathofEnchantment_from_Thaumatology = { target: 'PathofEnchantment', penalty: -6, from: 'Thaumatology' };
Defaults.PathofGate_from_Thaumatology = { target: 'PathofGate', penalty: -6, from: 'Thaumatology' };
Defaults.PathofHealing_from_Thaumatology = { target: 'PathofHealing', penalty: -6, from: 'Thaumatology' };
Defaults.PathofKnowledge_from_Thaumatology = { target: 'PathofKnowledge', penalty: -6, from: 'Thaumatology' };
Defaults.PathofLightDarkness_from_Thaumatology = { target: 'PathofLightDarkness', penalty: -6, from: 'Thaumatology' };
Defaults.PathofMetaSpells_from_Thaumatology = { target: 'PathofMetaSpells', penalty: -6, from: 'Thaumatology' };
Defaults.PathofMindControl_from_Thaumatology = { target: 'PathofMindControl', penalty: -6, from: 'Thaumatology' };
Defaults.PathofMovement_from_Thaumatology = { target: 'PathofMovement', penalty: -6, from: 'Thaumatology' };
Defaults.PathofNecromancy_from_Thaumatology = { target: 'PathofNecromancy', penalty: -6, from: 'Thaumatology' };
Defaults.PathofProtectionWarning_from_Thaumatology = { target: 'PathofProtectionWarning', penalty: -6, from: 'Thaumatology' };
Defaults.Performance_from_Acting         = { target: 'Performance', penalty: -2, from: 'Acting' };
Defaults.Performance_from_PublicSpeaking = { target: 'Performance', penalty: -2, from: 'PublicSpeaking' };
Defaults.Persuade_from_stat = { target: 'Persuade', penalty: false, category: 'stat' };
Defaults.PharmacyHerbal_from_Biology      = { target: 'Pharmacy', targetSpec: 'Herbal',    penalty: -5, from: 'Biology' };
Defaults.PharmacyHerbal_from_HerbLore     = { target: 'Pharmacy', targetSpec: 'Herbal',    penalty: -5, from: 'HerbLore' };
Defaults.PharmacyHerbal_from_Naturalist   = { target: 'Pharmacy', targetSpec: 'Herbal',    penalty: -5, from: 'Naturalist' };
Defaults.PharmacySynthetic_from_Chemistry = { target: 'Pharmacy', targetSpec: 'Synthetic', penalty: -5, from: 'Chemistry' };
Defaults.PharmacySynthetic_from_Physician = { target: 'Pharmacy', targetSpec: 'Synthetic', penalty: -5, from: 'Physician' };
Defaults.Photography_from_ElectronicsOpMedia = { target: 'Photography', penalty: -5, from: 'ElectronicsOperation', fromSpec: 'Media' };
Defaults.Physician_from_IQ         = { target: 'Physician', penalty: -7,  from: 'IQ', category: 'stat' };  // expected would be IQ-6
Defaults.Physician_from_FirstAid   = { target: 'Physician', penalty: -11, from: 'FirstAid' };
Defaults.Physician_from_Veterinary = { target: 'Physician', penalty: -5,  from: 'Veterinary' };
Defaults.Physics_from_IQ = { target: 'Physics', penalty: -6, from: 'IQ', category: 'stat' };  // expected would be IQ-7
Defaults.Physiology_from_Diagnosis = { target: 'Physiology', penalty: -5, from: 'Diagnosis' };
Defaults.Physiology_from_Physician = { target: 'Physiology', penalty: -5, from: 'Physician' };
Defaults.Physiology_from_Surgery   = { target: 'Physiology', penalty: -5, from: 'Surgery' };
Defaults.Pickpocket_from_Filch         = { target: 'Pickpocket', penalty: -5, from: 'Filch' };
Defaults.Pickpocket_from_SleightofHand = { target: 'Pickpocket', penalty: -4, from: 'SleightofHand' };
// Defaults.Piloting_from_DX                               = { target: 'Piloting', penalty: false, from: 'DX', category: 'stat' };  // but has an attribute default, from IQ
Defaults.Piloting_from_stat                             = { target: 'Piloting', penalty: false, category: 'stat' };  // but has an attribute default, from IQ
Defaults.Piloting_from_IQ                               = { target: 'Piloting', penalty: -6, from: 'IQ', category: 'stat' };  // expected would be DX-5
Defaults.PilotingAerospace_from_PilotingHPAirplane      = { target: 'Piloting', targetSpec: 'Aerospace', penalty: -2, from: 'Piloting', fromSpec: 'High-Performance Airplane' };
Defaults.PilotingAerospace_from_Piloting                = { target: 'Piloting', targetSpec: 'Aerospace', penalty: -4, from: 'Piloting' };
Defaults.PilotingAutogyro_from_PilotingHelicopter       = { target: 'Piloting', targetSpec: 'Autogyro', penalty: -3, from: 'Piloting', fromSpec: 'Helicopter' };
Defaults.PilotingAutogyro_from_PilotingHvyAirplane      = { target: 'Piloting', targetSpec: 'Autogyro', penalty: -4, from: 'Piloting', fromSpec: 'Heavy Airplane' };
Defaults.PilotingAutogyro_from_PilotingHPAirplane       = { target: 'Piloting', targetSpec: 'Autogyro', penalty: -4, from: 'Piloting', fromSpec: 'High-Performance Airplane' };
Defaults.PilotingAutogyro_from_PilotingLtAirplane       = { target: 'Piloting', targetSpec: 'Autogyro', penalty: -4, from: 'Piloting', fromSpec: 'Light Airplane' };
Defaults.PilotingAutogyro_from_Piloting                 = { target: 'Piloting', targetSpec: 'Autogyro', penalty: -5, from: 'Piloting' };
Defaults.PilotingContragrav_from_PilotingVertol         = { target: 'Piloting', targetSpec: 'Contragravity', penalty: -3, from: 'Piloting', fromSpec: 'Vertol' };
Defaults.PilotingContragrav_from_Piloting               = { target: 'Piloting', targetSpec: 'Contragravity', penalty: -5, from: 'Piloting' };
Defaults.PilotingFlightPack_from_PilotingVertol         = { target: 'Piloting', targetSpec: 'Flight Pack', penalty: -3, from: 'Piloting', fromSpec: 'Vertol' };
Defaults.PilotingFlightPack_from_Piloting               = { target: 'Piloting', targetSpec: 'Flight Pack', penalty: -5, from: 'Piloting' };
Defaults.PilotingGlider_from_PilotingLtAirplane         = { target: 'Piloting', targetSpec: 'Glider', penalty: -2, from: 'Piloting', fromSpec: 'Light Airplane' };
Defaults.PilotingGlider_from_PilotingUltralight         = { target: 'Piloting', targetSpec: 'Glider', penalty: -2, from: 'Piloting', fromSpec: 'Ultralight' };
Defaults.PilotingGlider_from_Piloting                   = { target: 'Piloting', targetSpec: 'Glider', penalty: -4, from: 'Piloting' };
Defaults.PilotingHvyAirplane_from_PilotingHPAirplane    = { target: 'Piloting', targetSpec: 'Heavy Airplane', penalty: -2, from: 'Piloting', fromSpec: 'High-Performance Airplane' };
Defaults.PilotingHvyAirplane_from_PilotingLtAirplane    = { target: 'Piloting', targetSpec: 'Heavy Airplane', penalty: -2, from: 'Piloting', fromSpec: 'Light Airplane' };
Defaults.PilotingHvyAirplane_from_Piloting              = { target: 'Piloting', targetSpec: 'Heavy Airplane', penalty: -4, from: 'Piloting' };
Defaults.PilotingHelicopter_from_PilotingAutogyro       = { target: 'Piloting', targetSpec: 'Helicopter', penalty: -2, from: 'Piloting', fromSpec: 'Autogyro' };
Defaults.PilotingHelicopter_from_PilotingVertol         = { target: 'Piloting', targetSpec: 'Helicopter', penalty: -4, from: 'Piloting', fromSpec: 'Vertol' };
Defaults.PilotingHelicopter_from_Piloting               = { target: 'Piloting', targetSpec: 'Helicopter', penalty: -5, from: 'Piloting' };
Defaults.PilotingHPAirplane_from_PilotingAerospace      = { target: 'Piloting', targetSpec: 'High-Performance Airplane', penalty: -2, from: 'Piloting', fromSpec: 'Aerospace' };
Defaults.PilotingHPAirplane_from_PilotingHvyAirplane    = { target: 'Piloting', targetSpec: 'High-Performance Airplane', penalty: -2, from: 'Piloting', fromSpec: 'Heavy Airplane' };
Defaults.PilotingHPAirplane_from_PilotingLtAirplane     = { target: 'Piloting', targetSpec: 'High-Performance Airplane', penalty: -2, from: 'Piloting', fromSpec: 'Light Airplane' };
Defaults.PilotingHPAirplane_from_Piloting               = { target: 'Piloting', targetSpec: 'High-Performance Airplane', penalty: -4, from: 'Piloting' };
Defaults.PilotingHPSpacecraft_from_PilotingAerospace    = { target: 'Piloting', targetSpec: 'High-Performance Spacecraft', penalty: -4, from: 'Piloting', fromSpec: 'Aerospace' };
Defaults.PilotingHPSpacecraft_from_PilotingLPSpacecraft = { target: 'Piloting', targetSpec: 'High-Performance Spacecraft', penalty: -2, from: 'Piloting', fromSpec: 'Low-Performance Spacecraft' };
Defaults.PilotingLtAirplane_from_PilotingGlider         = { target: 'Piloting', targetSpec: 'Light Airplane', penalty: -2, from: 'Piloting', fromSpec: 'Glider' };
Defaults.PilotingLtAirplane_from_PilotingHvyAirplane    = { target: 'Piloting', targetSpec: 'Light Airplane', penalty: -2, from: 'Piloting', fromSpec: 'Heavy Airplane' };
Defaults.PilotingLtAirplane_from_PilotingHPAirplane     = { target: 'Piloting', targetSpec: 'Light Airplane', penalty: -2, from: 'Piloting', fromSpec: 'High-Performance Airplane' };
Defaults.PilotingLtAirplane_from_PilotingUltralight     = { target: 'Piloting', targetSpec: 'Light Airplane', penalty: -2, from: 'Piloting', fromSpec: 'Ultralight' };
Defaults.PilotingLtAirplane_from_Piloting               = { target: 'Piloting', targetSpec: 'Light Airplane', penalty: -4, from: 'Piloting' };
Defaults.PilotingLTAir_from_Piloting                    = { target: 'Piloting', targetSpec: 'Lighter-Than-Air', penalty: -5, from: 'Piloting' };
Defaults.PilotingLightsail_from_PilotingLPSpacecraft    = { target: 'Piloting', targetSpec: 'Lightsail', penalty: -4, from: 'Piloting', fromSpec: 'Low-Performance Spacecraft' };
Defaults.PilotingLowGWings_from_PilotingGlider          = { target: 'Piloting', targetSpec: 'Low-G Wings', penalty: -4, from: 'Piloting', fromSpec: 'Glider' };
Defaults.PilotingLPSpacecraft_from_PilotingAerospace    = { target: 'Piloting', targetSpec: 'Low-Performance Spacecraft', penalty: -4, from: 'Piloting', fromSpec: 'Aerospace' };
Defaults.PilotingLPSpacecraft_from_PilotingHPSpacecraft = { target: 'Piloting', targetSpec: 'Low-Performance Spacecraft', penalty: -2, from: 'Piloting', fromSpec: 'High-Performance Spacecraft' };
Defaults.PilotingUltralight_from_PilotingGlider         = { target: 'Piloting', targetSpec: 'Ultralight', penalty: -2, from: 'Piloting', fromSpec: 'Glider' };
Defaults.PilotingUltralight_from_PilotingLtAirplane     = { target: 'Piloting', targetSpec: 'Ultralight', penalty: -2, from: 'Piloting', fromSpec: 'Light Airplane' };
Defaults.PilotingUltralight_from_PilotingHPAirplane     = { target: 'Piloting', targetSpec: 'Ultralight', penalty: -4, from: 'Piloting', fromSpec: 'High-Performance Airplane' };
Defaults.PilotingUltralight_from_PilotingHvyAirplane    = { target: 'Piloting', targetSpec: 'Ultralight', penalty: -4, from: 'Piloting', fromSpec: 'Heavy Airplane' };
Defaults.PilotingUltralight_from_Piloting               = { target: 'Piloting', targetSpec: 'Ultralight', penalty: -5, from: 'Piloting' };
Defaults.PilotingVertol_from_PilotingContragravity      = { target: 'Piloting', targetSpec: 'Vertol', penalty: -3, from: 'Piloting', fromSpec: 'Contragravity' };
Defaults.PilotingVertol_from_PilotingHelicopter         = { target: 'Piloting', targetSpec: 'Vertol', penalty: -4, from: 'Piloting', fromSpec: 'Helicopter' };
Defaults.PilotingVertol_from_Piloting                   = { target: 'Piloting', targetSpec: 'Vertol', penalty: -5, from: 'Piloting' };
Defaults.Poetry_from_Writing = { target: 'Poetry', penalty: -5, from: 'Writing' };
Defaults.Poisons_from_Chemistry = { target: 'Poisons', penalty: -5, from: 'Chemistry' };
Defaults.Poisons_from_Pharmacy  = { target: 'Poisons', penalty: -3, from: 'Pharmacy' };
Defaults.Poisons_from_Physician = { target: 'Poisons', penalty: -3, from: 'Physician' };
Defaults.Polearm_from_Spear            = { target: 'Polearm', penalty: -4, from: 'Spear' };
Defaults.Polearm_from_Staff            = { target: 'Polearm', penalty: -4, from: 'StaffSkill' };
Defaults.Polearm_from_TwoHandedAxeMace = { target: 'Polearm', penalty: -4, from: 'TwoHandedAxeMace' };
Defaults.Politics_from_Diplomacy = { target: 'Politics', penalty: -5, from: 'Diplomacy' };
Defaults.PowerBlow_from_stat = { target: 'PowerBlow', penalty: false, category: 'stat' };
Defaults.PressurePoints_from_stat = { target: 'PressurePoints', penalty: false, category: 'stat' };
Defaults.PressureSecrets_from_stat = { target: 'PressureSecrets', penalty: false, category: 'stat' };
Defaults.Propaganda_from_Merchant   = { target: 'Propaganda', penalty: -5, from: 'Merchant' };
Defaults.Propaganda_from_Psychology = { target: 'Propaganda', penalty: -4, from: 'Psychology' };
Defaults.Prospecting_from_Geology = { target: 'Prospecting', penalty: -4, from: 'Geology' };
Defaults.Psychology_from_Sociology = { target: 'Psychology', penalty: -4, from: 'Sociology' };
Defaults.PublicSpeaking_from_Acting      = { target: 'PublicSpeaking', penalty: -5, from: 'Acting' };
Defaults.PublicSpeaking_from_Performance = { target: 'PublicSpeaking', penalty: -2, from: 'Performance' };
Defaults.PublicSpeaking_from_Politics    = { target: 'PublicSpeaking', penalty: -5, from: 'Politics' };
Defaults.Push_from_stat = { target: 'Push', penalty: false, category: 'stat' };

Defaults.Rapier_from_Broadsword = { target: 'Rapier', penalty: -4, from: 'Broadsword' };
Defaults.Rapier_from_MainGauche = { target: 'Rapier', penalty: -3, from: 'MainGauche' };
Defaults.Rapier_from_Saber      = { target: 'Rapier', penalty: -3, from: 'Saber' };
Defaults.Rapier_from_Smallsword = { target: 'Rapier', penalty: -3, from: 'Smallsword' };
Defaults.ReligiousRitual_from_stat        = { target: 'ReligiousRitual', penalty: false, category: 'stat' };
Defaults.ReligiousRitual_from_RitualMagic = { target: 'ReligiousRitual', penalty: -6, from: 'RitualMagic', fromSpec: 'same' };
Defaults.ReligiousRitual_from_Theology    = { target: 'ReligiousRitual', penalty: -4, from: 'Theology',    fromSpec: 'same' };
Defaults.Research_from_Writing = { target: 'Research', penalty: -3, from: 'Writing' };
Defaults.Riding_from_AnimalHandling = { target: 'Riding', penalty: -3, from: 'AnimalHandling', fromSpec: 'same' };
Defaults.RitualMagic_from_stat            = { target: 'RitualMagic', penalty: false, category: 'stat' };
Defaults.RitualMagic_from_ReligiousRitual = { target: 'RitualMagic', penalty: -6, from: 'ReligiousRitual', fromSpec: 'same' };

Defaults.Saber_from_Broadsword = { target: 'Saber', penalty: -4, from: 'Broadsword' };
Defaults.Saber_from_MainGauche = { target: 'Saber', penalty: -3, from: 'MainGauche' };
Defaults.Saber_from_Rapier     = { target: 'Saber', penalty: -3, from: 'Rapier' };
Defaults.Saber_from_Shortsword = { target: 'Saber', penalty: -4, from: 'Shortsword' };
Defaults.Saber_from_Smallsword = { target: 'Saber', penalty: -3, from: 'Smallsword' };
Defaults.SavoirFaireMafia_from_Streetwise = { target: 'SavoirFaire', targetSpec: 'Mafia', penalty: -3, from: 'Streetwise' };
Defaults.SavoirFaireHiSoc_from_SavoirFaireServant = { target: 'SavoirFaire', targetSpec: 'High Society', penalty: -2, from: 'SavoirFaire', fromSpec: 'Servant' };
Defaults.SavoirFaireServant_from_SavoirFaireHiSoc = { target: 'SavoirFaire', targetSpec: 'Servant', penalty: -2, from: 'SavoirFaire', fromSpec: 'High Society' };
Defaults.Scuba_from_DivingSuit = { target: 'Scuba', penalty: -2, from: 'Diving Suit' };
Defaults.Scuba_from_EnvSuitDivingSuit = { target: 'Scuba', penalty: -2, from: 'EnvironmentSuit', fromSpec: 'Diving Suit' };
Defaults.Search_from_Criminology = { target: 'Search', penalty: -5, from: 'Criminology' };
Defaults.SexAppeal_from_HT = { target: 'SexAppeal', penalty: -3, from: 'HT', category: 'stat' };
Defaults.Shadowing_from_Observation = { target: 'Shadowing', penalty: -5, from: 'Observation' };
// Defaults.Shadowing_from_Stealth     = { target: 'Shadowing', penalty: -4, from: 'Stealth' };

Defaults.ShieldBuckler_from_ShieldForceShield = { target: 'Shield', targetSpec: 'Buckler', penalty: -2, from: 'Shield', fromSpec: 'Force' };
Defaults.ShieldBuckler_from_ShieldShield      = { target: 'Shield', targetSpec: 'Buckler', penalty: -2, from: 'Shield', fromSpec: 'Shield' };
Defaults.ShieldForceShield_from_ShieldBuckler = { target: 'Shield', targetSpec: 'Force',   penalty: -2, from: 'Shield', fromSpec: 'Buckler' };
Defaults.ShieldForceShield_from_ShieldShield  = { target: 'Shield', targetSpec: 'Force',   penalty: -2, from: 'Shield', fromSpec: 'Shield' };
Defaults.ShieldShield_from_ShieldBuckler      = { target: 'Shield', targetSpec: 'Shield',  penalty: -2, from: 'Shield', fromSpec: 'Buckler' };
Defaults.ShieldShield_from_ShieldForceShield  = { target: 'Shield', targetSpec: 'Shield',  penalty: -2, from: 'Shield', fromSpec: 'Force' };

Defaults.ShiphandlingAirship_from_Airshipman     = { target: 'Shiphandling', targetSpec: 'Airship',   penalty: -5, from: 'Crewman',   fromSpec: 'Airshipman' };
Defaults.ShiphandlingAirship_from_PilotingLTAir  = { target: 'Shiphandling', targetSpec: 'Airship',   penalty: -5, from: 'Piloting',  fromSpec: 'Lighter-Than-Air' };
Defaults.ShiphandlingShip_from_Seamanship        = { target: 'Shiphandling', targetSpec: 'Ship',      penalty: -5, from: 'Crewman',   fromSpec: 'Seamanship' };
Defaults.ShiphandlingSpaceship_from_Spacer       = { target: 'Shiphandling', targetSpec: 'Spaceship', penalty: -5, from: 'Crewman',   fromSpec: 'Spacer' };
Defaults.ShiphandlingSpaceship_from_HPSpacecraft = { target: 'Shiphandling', targetSpec: 'Spaceship', penalty: -5, from: 'Piloting',  fromSpec: 'High-Performance Spacecraft' };
Defaults.ShiphandlingSpaceship_from_LPSpacecraft = { target: 'Shiphandling', targetSpec: 'Spaceship', penalty: -5, from: 'Piloting',  fromSpec: 'Low-Performance Spacecraft' };
Defaults.ShiphandlingStarship_from_Spacer        = { target: 'Shiphandling', targetSpec: 'Starship',  penalty: -5, from: 'Crewman',   fromSpec: 'Spacer' };
Defaults.ShiphandlingStarship_from_HPSpacecraft  = { target: 'Shiphandling', targetSpec: 'Starship',  penalty: -5, from: 'Piloting',  fromSpec: 'High-Performance Spacecraft' };
Defaults.ShiphandlingStarship_from_LPSpacecraft  = { target: 'Shiphandling', targetSpec: 'Starship',  penalty: -5, from: 'Piloting',  fromSpec: 'Low-Performance Spacecraft' };
Defaults.ShiphandlingSub_from_Submariner         = { target: 'Shiphandling', targetSpec: 'Submarine', penalty: -5, from: 'Crewman',   fromSpec: 'Submariner' };
Defaults.ShiphandlingSub_from_SubLgSub           = { target: 'Shiphandling', targetSpec: 'Submarine', penalty: -5, from: 'Submarine', fromSpec: 'Large Sub' };
Defaults.Shortsword_from_Broadsword = { target: 'Shortsword', penalty: -2, from: 'Broadsword' };
Defaults.Shortsword_from_ForceSword = { target: 'Shortsword', penalty: -4, from: 'ForceSword' };
Defaults.Shortsword_from_JitteSai   = { target: 'Shortsword', penalty: -3, from: 'JitteSai' };
Defaults.Shortsword_from_Knife      = { target: 'Shortsword', penalty: -4, from: 'Knife' };
Defaults.Shortsword_from_Saber      = { target: 'Shortsword', penalty: -4, from: 'Saber' };
Defaults.Shortsword_from_Smallsword = { target: 'Shortsword', penalty: -4, from: 'Smallsword' };
Defaults.Shortsword_from_Tonfa      = { target: 'Shortsword', penalty: -3, from: 'Tonfa' };
Defaults.SleightofHand_from_stat  = { target: 'SleightofHand', penalty: false, category: 'stat' };
Defaults.SleightofHand_from_Filch = { target: 'SleightofHand', penalty: -5, from: 'Filch' };
Defaults.Smallsword_from_MainGauche = { target: 'Smallsword', penalty: -3, from: 'MainGauche' };
Defaults.Smallsword_from_Rapier     = { target: 'Smallsword', penalty: -3, from: 'Rapier' };
Defaults.Smallsword_from_Saber      = { target: 'Smallsword', penalty: -3, from: 'Saber' };
Defaults.Smallsword_from_Shortsword = { target: 'Smallsword', penalty: -4, from: 'Shortsword' };
Defaults.Smith_from_Smith     = { target: 'Smith',                             penalty: -4, from: 'Smith' };
Defaults.SmithCu_from_Smith   = { target: 'Smith', targetSpec: 'Copper',       penalty: -4, from: 'Jeweler' };
Defaults.SmithSnPb_from_Smith = { target: 'Smith', targetSpec: 'Lead and Tin', penalty: -4, from: 'Jeweler' };
Defaults.Sociology_from_Anthropology = { target: 'Sociology', penalty: -3, from: 'Anthropology' };
Defaults.Sociology_from_Psychology   = { target: 'Sociology', penalty: -4, from: 'Psychology' };
Defaults.Spear_from_Polearm = { target: 'Spear', penalty: -2, from: 'Polearm' };
Defaults.Spear_from_Staff   = { target: 'Spear', penalty: -4, from: 'StaffSkill' };
Defaults.SpearThrower_from_ThrownWeaponSpear = { target: 'SpearThrower', penalty: -4, from: 'ThrownWeapon', fromSpec: 'Spear' };
Defaults.SpeedReading_from_stat  = { target: 'SpeedReading', penalty: false, category: 'stat' };
Defaults.StaffSkill_from_Polearm = { target: 'StaffSkill', penalty: -2, from: 'Polearm' };
Defaults.StaffSkill_from_Spear   = { target: 'StaffSkill', penalty: -4, from: 'Spear' };
Defaults.StageCombat_from_stat               = { target: 'StageCombat', penalty: false, category: 'stat' };
Defaults.StageCombat_from_CombatWeaponSkills = { target: 'StageCombat', penalty: -3, category: 'GR', from: 'CombatWeaponSkills' };
Defaults.StageCombat_from_CombatWeaponArt    = { target: 'StageCombat', penalty: -2, category: 'GR', from: 'CombatWeaponArt' };
Defaults.StageCombat_from_Performance        = { target: 'StageCombat', penalty: -3, from: 'Performance' };
Defaults.Stealth_from_IQ = { target: 'Stealth', penalty: -5, from: 'IQ', category: 'stat' };
Defaults.Strategy_from_IntelligenceAnalysis = { target: 'Strategy', penalty: -6, from: 'IntelligenceAnalysis' };
Defaults.Strategy_from_Tactics              = { target: 'Strategy', penalty: -6, from: 'Tactics' };
Defaults.Suggest_from_stat = { target: 'Suggest', penalty: false, category: 'stat' };
Defaults.SumoWrestling_from_stat = { target: 'SumoWrestling', penalty: false, category: 'stat' };
Defaults.Surgery_from_stat = { target: 'Surgery', penalty: false, category: 'stat' };
Defaults.Surgery_from_FirstAid   = { target: 'Surgery', penalty: -12, from: 'FirstAid' };
Defaults.Surgery_from_Physician  = { target: 'Surgery', penalty: -5,  from: 'Physician' };
Defaults.Surgery_from_Physiology = { target: 'Surgery', penalty: -8,  from: 'Physiology' };
Defaults.Surgery_from_Veterinary = { target: 'Surgery', penalty: -5,  from: 'Veterinary' };
Defaults.Survival_from_Naturalist = { target: 'Survival', penalty: -3, from: 'Naturalist' };
//Defaults.Survival_from_Survival = { target: 'Survival', penalty: -3, from: 'Survival' };
// Survival-to-Survival defaults are complex
Defaults.SwayEmotions_from_stat = { target: 'SwayEmotions', penalty: false, category: 'stat' };
Defaults.SymbolDrawing_from_RitualMagic = { target: 'SymbolDrawing', penalty: -4, from: 'RitualMagic', fromSpec: 'same' };

Defaults.Tactics_from_Strategy = { target: 'Tactics', penalty: -6, from: 'Strategy' };
Defaults.Teamster_from_AnimalHandling = { target: 'Teamster', penalty: -4, from: 'AnimalHandling', fromSpec: 'same' };
Defaults.Teamster_from_Riding         = { target: 'Teamster', penalty: -2, from: 'Riding',         fromSpec: 'same' };
Defaults.Theology_from_ReligiousRitual = { target: 'Theology', penalty: -4, from: 'ReligiousRitual', fromSpec: 'same' };
Defaults.Throwing_from_DX       = { target: 'Throwing', penalty: -3, from: 'DX', category: 'stat' };
Defaults.Throwing_from_Dropping = { target: 'Throwing', penalty: -4, from: 'Dropping' };
Defaults.ThrowingArt_from_stat = { target: 'ThrowingArt', penalty: false, category: 'stat' };
Defaults.ThrownWeaponDart_from_Throwing             = { target: 'ThrownWeapon', targetSpec: 'Dart',     penalty: -2, from: 'Throwing' };
Defaults.ThrownWeaponHarpoon_from_ThrownWeaponSpear = { target: 'ThrownWeapon', targetSpec: 'Harpoon',  penalty: -2, from: 'ThrownWeapon', fromSpec: 'Spear' };
Defaults.ThrownWeaponShuriken_from_Throwing         = { target: 'ThrownWeapon', targetSpec: 'Shuriken', penalty: -2, from: 'Throwing' };
Defaults.ThrownWeaponSpear_from_SpearThrower        = { target: 'ThrownWeapon', targetSpec: 'Spear',    penalty: -4, from: 'SpearThrower' };
Defaults.ThrownWeaponSpear_from_ThrownWeaponHarpoon = { target: 'ThrownWeapon', targetSpec: 'Spear',    penalty: -2, from: 'ThrownWeapon', fromSpec: 'Harpoon' };
Defaults.Tonfa_from_Shortsword = { target: 'Tonfa', penalty: -3, from: 'Shortsword' };
Defaults.Tracking_from_Naturalist = { target: 'Tracking', penalty: -5, from: 'Naturalist' };
Defaults.Traps_from_Lockpicking = { target: 'Traps', penalty: -3, from: 'Lockpicking' };
Defaults.TwoHandedAxeMace_from_AxeMace        = { target: 'TwoHandedAxeMace', penalty: -3, from: 'AxeMace' };
Defaults.TwoHandedAxeMace_from_Polearm        = { target: 'TwoHandedAxeMace', penalty: -4, from: 'Polearm' };
Defaults.TwoHandedAxeMace_from_TwoHandedFlail = { target: 'TwoHandedAxeMace', penalty: -4, from: 'TwoHandedFlail' };
Defaults.TwoHandedFlail_from_Flail            = { target: 'TwoHandedFlail', penalty: -3, from: 'Flail' };
Defaults.TwoHandedFlail_from_Kusari           = { target: 'TwoHandedFlail', penalty: -4, from: 'Kusari' };
Defaults.TwoHandedFlail_from_TwoHandedAxeMace = { target: 'TwoHandedFlail', penalty: -4, from: 'TwoHandedAxeMace' };
Defaults.TwoHandedSword_from_Broadsword = { target: 'TwoHandedSword', penalty: -4, from: 'Broadsword' };
Defaults.TwoHandedSword_from_ForceSword = { target: 'TwoHandedSword', penalty: -4, from: 'ForceSword' };

Defaults.VaccSuit_from_Battlesuit = { target: 'VaccSuit', penalty: -2, from: 'Battlesuit' };
Defaults.VaccSuit_from_DivingSuit = { target: 'VaccSuit', penalty: -4, from: 'DivingSuit' };
Defaults.VaccSuit_from_NBCSuit    = { target: 'VaccSuit', penalty: -2, from: 'NBCSuit' };
Defaults.Ventriloquism_from_stat = { target: 'Ventriloquism', penalty: false, category: 'stat' };
Defaults.Veterinary_from_AnimalHandling = { target: 'Veterinary', penalty: -6, from: 'AnimalHandling' };
Defaults.Veterinary_from_Physician      = { target: 'Veterinary', penalty: -5, from: 'Physician' };
Defaults.Veterinary_from_Surgery        = { target: 'Veterinary', penalty: -5, from: 'Surgery' };

Defaults.WeirdScience_from_stat = { target: 'WeirdScience', penalty: false, category: 'stat' };
Defaults.Whip_from_Kusari       = { target: 'Whip', penalty: -3, from: 'Kusari' };
Defaults.Whip_from_MonowireWhip = { target: 'Whip', penalty: -3, from: 'MonowireWhip' };
Defaults.Whip_from_ForceWhip    = { target: 'Whip', penalty: -3, from: 'ForceWhip' };
Defaults.Wrestling_from_stat = { target: 'Wrestling', penalty: false, category: 'stat' };

Defaults.ZenArchery_from_stat = { target: 'ZenArchery', penalty: false, category: 'stat' };


//console.log("about to load Groups");
var Groups = {
  // Magery    : ['Magery','MageryAirCollegeOnly','MageryAnimalCollegeOnly','MageryBodyControlCollegeOnly','MageryCommunicationEmpathyCollegeOnly','MageryEarthCollegeOnly','MageryEnchantmentCollegeOnly','MageryFireCollegeOnly','MageryFoodCollegeOnly','MageryHealingCollegeOnly','MageryIllusionCreationCollegeOnly','MageryKnowledgeCollegeOnly','MageryLightDarknessCollegeOnly','MageryMakingBreakingCollegeOnly','MageryMetaSpellsCollegeOnly','MageryMindControlCollegeOnly','MageryMovementCollegeOnly','MageryMoonAspected','MageryNecromanticCollegeOnly','MageryOneCollegeOnly','MageryPlantCollegeOnly','MageryProtectionWarningCollegeOnly','MagerySolitary','MagerySoundCollegeOnly','MageryStarAspected','MagerySunAspected','MageryWaterCollegeOnly'],
  // skill categories
  AnimalSkills : ['AnimalHandling','Falconry','Packing','Riding','Teamster','Veterinary'],
  AnimalSkillsGURPSLite : ['AnimalHandling','Riding'],
  ArtisticSkills : ['Artist','Dancing','FireEating','Gardening','MusicalComposition','MusicalInstrument',
		    'Photography','Poetry','Singing','StageCombat','SymbolDrawing','Writing'],
  AthleticSkills : ['Acrobatics','Aerobatics','Aquabatics','Bicycling','BreathControl','FreeFall','Jumping',
		    'Parachuting','Riding','Running', 'Scuba','Skiing','Swimming','Throwing', 'BodySense',
		    'Flight','Hiking','Lifting','Skating','StageCombat'],
  AthleticSkillsGURPSLite : ['Acrobatics','Bicycling','Hiking','Jumping','Riding','Swimming','Throwing'],
  EmotionSkills : ['Acting','Carousing','Criminology','DetectLies','Diplomacy','Enthrallment',
                   'FastTalk','Interrogation','Leadership','Merchant','Politics','Psychology',
                   'SavoirFaire','SexAppeal','Sociology','Streetwise'],
  ManualDexteritySkills : ['Artist','Jeweler','KnotTying','Leatherworking','Lockpicking',
                           'Pickpocket','Sewing','SleightofHand','Surgery'],
  // Groups defined under Melee Weapon 'skill', B208-9
  FencingSkills : ['MainGauche','Rapier','Saber','Smallsword'],
  FlailSkills : ['Flail','TwoHandedFlail'],
  ImpactWeaponSkills : ['AxeMace','TwoHandedAxeMace'],
  PoleWeaponSkills : ['Polearm','Spear','StaffSkill'],
  SwordSkills : ['Broadsword','ForceSword','JitteSai','Knife','Shortsword','TwoHandedSword'],
  WhipSkills : ['ForceWhip','Kusari','MonowireWhip','Whip'],
  CombatSkills : ['Battlesuit','BodyLanguage','Boxing','Brawling','Cloak','FastDraw','Judo','Karate',
  								'ParryMissileWeapons','Shield','SumoWrestling','Wrestling'],
  WeaponSkills : ['AxeMace','BeamWeapons','Bolas','Bow','Broadsword','Crossbow','Flail','ForceSword',
                  'ForceWhip','Garrote','Gunner','Guns','JitteSai','Knife','Kusari','Lance','Lasso',
                  'MainGauche','MonowireWhip','Net','Polearm','Shortsword','Sling','Spear',
                  'SpearThrower','StaffSkill','Throwing','ThrownWeapon','Tonfa','TwoHandedAxeMace',
                  'TwoHandedSword','Whip'],
//   CombatWeaponSkills : ['AxeMace','Battlesuit','BeamWeapons','BodyLanguage','Bolas','Bow','Boxing',
//                         'Brawling','Broadsword','Cloak','Crossbow','FastDraw','Flail','ForceSword',
//                         'ForceWhip','Garrote','Gunner','Guns','JitteSai','Judo','Karate','Knife',
//                         'Kusari','Lance','Lasso','MainGauche','MonowireWhip','Net',
//                         'ParryMissileWeapons','Polearm','Shield','Shortsword','Sling','Spear',
//                         'SpearThrower','StaffSkill','Stage','SumoWrestling','Throwing',
//                         'ThrownWeapon','Tonfa','TwoHandedAxeMace','TwoHandedSword','Whip','Wrestling'],
  PeopleSkills : ['Acting','Carousing','Diplomacy','FastTalk','Intimidation','Leadership',
                  'Merchant','Panhandling','Performance','Politics','PublicSpeaking','SavoirFaire',
                  'SexAppeal','Streetwise','Teaching'],
  PhysiologicalSkills : ['BodyLanguage','Diagnosis','FirstAid','Physician','PressurePoints','PressureSecrets','Surgery'],
  // Talent skill groups
  AnimalFriendTalent : ["AnimalHandling","Falconry","Packing","Riding","Teamster","Veterinary"],
  ArtificerTalent : ["Armoury","Carpentry","Electrician","ElectronicsRepair","Engineer","Machinist","Masonry","Mechanic","Smith"],
  BusinessAcumenTalent : ["Accounting", "Administration", "Economics", "Finance", "Gambling", "MarketAnalysis", "Merchant", "Propaganda"],
  GiftedArtistTalent: ['Artist', 'Jeweler', 'Leatherworking', 'Photography', 'Sewing'],
  GreenThumbTalent: ['Biology', 'Farming', 'Gardening', 'HerbLore', 'Naturalist'],
  HealerTalent: ['Diagnosis',   'EsotericMedicine', 'FirstAid', 'Pharmacy', 'Physician', 'Physiology', 'Psychology', 'Surgery', 'Veterinary'],
  MathAbilityTalent : ["Accounting","Astronomy","Cryptography","Engineer","Finance","MarketAnalysis","Mathematics","Physics"],
  MusicalAbilityTalent : ["GroupPerformance_Conducting","MusicalComposition","MusicalInfluence","MusicalInstrument","Singing"],
  OutdoorsmanTalent : ["Camouflage","Fishing","Mimicry","Naturalist","Navigation","Survival","Tracking"],
  SmoothOperatorTalent : ["Acting","Carousing","DetectLies","Diplomacy","FastTalk","Intimidation","Leadership","Panhandling","Politics","PublicSpeaking","SavoirFaire","SexAppeal","Streetwise"],
  // spell colleges and categories
  MagicColleges : ['Air','Earth','Fire','Water','BodyControl','CommunicationEmpathy','Enchantment','Gate','Healing','Knowledge','LightDarkness','Meta','MindControl','Movement','Necromantic','ProtectionWarning'],   // Basic 4e spells
  // colleges from Magic 3e (GURPS 4e), but not found in Basic 4e: 'Animal','Food','IllusionCreation','MakingBreaking','Plant','Sound','Tech','Weather'
  // These are in 'book order,' which preserves some sense of the prerequisite chain:
  AirSpells : ['PathofAir','PurifyAir','CreateAir','ShapeAir','NoSmell','PredictWeather','BreatheWater','WalkonAir','EarthtoAir','Stench','Lightning'],   // Basic 4e spells
  BodyControlSpells : ['PathofBodyControl','Itch','Spasm','Pain','Clumsiness','Hinder','RootedFeet','ParalyzeLimb','WitherLimb','Deathtouch'],   // Basic 4e spells
  CommunicationEmpathySpells   : ['PathofCommunicationEmpathy','SenseFoes','SenseEmotion','Truthsayer','MindReadingSpell','HideThoughts'],   // Basic 4e spells
  EarthSpells : ['PathofEarth','SeekEarth','ShapeEarth','EarthtoStone','EarthtoAir','CreateEarth','FleshtoStone','StonetoEarth','StonetoFlesh','Entombment'],   // Basic 4e spells
  FireSpells : ['PathofFire','IgniteFire','CreateFire','ShapeFire','DeflectEnergy','ExtinguishFire','Heat','Cold','ResistCold','ResistFire','Fireball','ExplosiveFireball'],   // Basic 4e spells
  GateSpells : ['PathofGate','PlanarSummons','PlaneShift'],   // Basic 4e spells
  HealingSpells : ['PathofHealing','LendEnergy','LendVitality','RecoverEnergy','Awaken','MinorHealing','MajorHealing','GreatHealing'],   // Basic 4e spells
  KnowledgeSpells : ['PathofKnowledge','DetectMagic','Aura','Seeker','Trace','IdentifySpell','AnalyzeMagic'],   // Basic 4e spells
  LightDarknessSpells : ['PathofLightDarkness','Light','ContinualLight','Darkness','Blur'],   // Basic 4e spells
  MetaSpells : ['PathofMetaSpells','Counterspell','DispelMagic'],   // Basic 4e spells
  MindControlSpells : ['PathofMindControl','Foolishness','Forgetfulness','Daze','MassDaze','Sleep','MassSleep','Command'],   // Basic 4e spells
  MovementSpells : ['PathofMovement','Haste','Hinder','GreatHaste','Apportation','Lockmaster','DeflectMissile'],   // Basic 4e spells
  NecromanticSpells : ['PathofNecromancy','DeathVision','SenseSpirit','SummonSpirit','Zombie','TurnZombie','SummonDemon','Banish'],   // Basic 4e spells
  ProtectionWarningSpells : ['PathofProtectionWarning','ShieldSpell','Armor','Magelock'],   // Basic 4e spells
  WaterSpells : ['PathofWater','SeekWater','PurifyWater','CreateWater','DestroyWater','BreatheWater','ShapeWater','Fog','IcyWeapon'],   // Basic 4e spells
  EnchantmentSpells : ['PathofEnchantment','Enchant','Accuracy','Deflect','Fortify','Power','Puissance','StaffSpell'],   // Basic 4e spells
  SeekSpells : ['SeekEarth','SeekWater']
};
Groups.MeleeWeaponSkills = Groups.FencingSkills.concat( Groups.FlailSkills, Groups.ImpactWeaponSkills,
                           Groups.PoleWeaponSkills, Groups.SwordSkills, Groups.WhipSkills );
CombatWeaponSkills = Groups.CombatSkills.concat( Groups.WeaponSkills );
//console.log("first Groups object done");
// alternate keys for groups defined above
Groups.AnimalFriend = Groups.AnimalFriendTalent;
Groups.BusinessAcumen = Groups.BusinessAcumenTalent;
//Groups.MageryAds = Groups.Magery;

Groups.Air = Groups.AirSpells;
Groups.BC                  = Groups.BodyControlSpells;
Groups.BCSpells            = Groups.BodyControlSpells;
Groups.BodySpells          = Groups.BodyControlSpells;
Groups.BodyControl         = Groups.BodyControlSpells;
Groups.BodyControlBCSpells = Groups.BodyControlSpells;
Groups.CE                           = Groups.CommunicationEmpathySpells;
Groups.CESpells                     = Groups.CommunicationEmpathySpells;
Groups.Communication                = Groups.CommunicationEmpathySpells;
Groups.CommunicationSpells          = Groups.CommunicationEmpathySpells;
Groups.CommunicationEmpathy         = Groups.CommunicationEmpathySpells;
Groups.CommunicationEmpathyCESpells = Groups.CommunicationEmpathySpells;
Groups.Earth = Groups.EarthSpells;
Groups.Enchantment = Groups.EnchantmentSpells;
Groups.Fire = Groups.FireSpells;
Groups.Gate = Groups.GateSpells;
Groups.Healing = Groups.HealingSpells;
Groups.Knowledge = Groups.KnowledgeSpells;
Groups.LD                    = Groups.LightDarknessSpells;
Groups.LightDarkness         = Groups.LightDarknessSpells;
Groups.LightDarknessLDSpells = Groups.LightDarknessSpells;
Groups.Meta = Groups.MetaSpells;
Groups.MC                  = Groups.MindControlSpells;
Groups.MindControl         = Groups.MindControlSpells;
Groups.MindControlMCSpells = Groups.MindControlSpells;
Groups.Movement = Groups.MovementSpells;
Groups.Necromantic = Groups.NecromanticSpells;
Groups.PW                        = Groups.ProtectionWarningSpells;
Groups.Protection                = Groups.ProtectionWarningSpells;
Groups.ProtectionWarning         = Groups.ProtectionWarningSpells;
Groups.ProtectionWarningPWSpells = Groups.ProtectionWarningSpells;
Groups.Seek = Groups.SeekSpells;
Groups.Water = Groups.WaterSpells;
Groups.SpellColleges = Groups.MagicColleges;
//console.log("first Groups add-ons done");

var GroupNames = {
  // Magery : 'Magery Types',
  AnimalSkills : 'Animal Skills',
  ArtisticSkills : 'Artistic Skills',
  AthleticSkills : 'Athletic Skills',
  WeaponSkills : '/Weapon skills',
  MeleeWeaponSkills : 'Melee weapon skills',
  MagicalSkills : 'Magical Skills',
  PhysiologicalSkills : 'Physiological Skills',
  AnimalFriendTalent : "'Animal Friend' Talent Skills",
  BusinessAcumenTalent : "'Business Acumen' Talent Skills",
  HealerTalent: "'Healer' Talent Skills",
  MathAbilityTalent : "'Mathematical Ability' Talent Skills",
  MusicalAbilityTalent : "'Musical Ability' Talent Skills",
  MagicColleges : 'Magic Colleges',
  AirSpells : 'Air College Spells',
  BodyControlSpells : 'Body Control College Spells',
  CommunicationEmpathySpells   : 'Communication and Empathy College Spells',
  EarthSpells : 'Earth College Spells',
  EnchantmentSpells : 'Enchantment College Spells',
  FireSpells : 'Fire College Spells',
  GateSpells : 'Gate College Spells',
  HealingSpells : 'Healing College Spells',
  KnowledgeSpells : 'Knowledge College Spells',
  LightDarknessSpells : 'Light and Darkness College Spells',
  MetaSpells : 'Meta-Spells',
  MindControlSpells : 'Mind Control College Spells',
  MovementSpells : 'Movement College Spells',
  NecromanticSpells : 'Necromantic College Spells',
  ProtectionWarningSpells : 'Protection and Warning College Spells',
  WaterSpells : 'Water College Spells',
  SeekSpells : 'Seek Spells'
};
var collegeNames = {
    Air: 'Air',
    AirAirSpells: 'Air',
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
    Gate: 'Gate',
    GateSpells: 'Gate',
    Healing: 'Healing',
    HealingSpells: 'Healing',
    Knowledge: 'Knowledge',
    KnowledgeSpells: 'Knowledge',
    LD: 'Light & Darkness',
    LightDarkness: 'Light & Darkness',
    LightDarknessSpells: 'Light & Darkness',
    LightDarknessLDSpells: 'Light & Darkness',
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
    PW: 'Protection & Warning',
    Protection: 'Protection & Warning',
    ProtectionWarning: 'Protection & Warning',
    ProtectionWarningSpells: 'Protection & Warning',
    ProtectionWarningPWSpells: 'Protection & Warning',
    Water: 'Water',
    WaterSpells: 'Water',
};
// many of the colleges dealt with in collegeNames, GroupNames, and given aliases above are not in basic 4e



/****  Spells  ****/

Spells = {};

/* Ritual Magic college spells (B242 or Magic4e 200) */
Spells.PathofBodyControl = new Skill( "Path of Body Control", 'IQ', 3, 'B4E242' );
Spells.PathofCommunicationEmpathy = new Skill( "Path of Communication & Empathy", 'IQ', 3, 'B4E242' );
Spells.PathofEarth = new Skill( "Path of Earth", 'IQ', 3, 'B4E242' );
Spells.PathofAir = new Skill( "Path of Air", 'IQ', 3, 'B4E242' );
Spells.PathofFire = new Skill( "Path of Fire", 'IQ', 3, 'B4E242' );
Spells.PathofWater = new Skill( "Path of Water", 'IQ', 3, 'B4E242' );
Spells.PathofEnchantment = new Skill( "Path of Enchantment", 'IQ', 3, 'B4E242' );
Spells.PathofGate = new Skill( "Path of Gate", 'IQ', 3, 'B4E242' );
Spells.PathofHealing = new Skill( "Path of Healing", 'IQ', 3, 'B4E242' );
Spells.PathofKnowledge = new Skill( "Path of Knowledge", 'IQ', 3, 'B4E242' );
Spells.PathofLightDarkness = new Skill( "Path of Light & Darkness", 'IQ', 3, 'B4E242' );
Spells.PathofMetaSpells = new Skill( "Path of Meta-Spells", 'IQ', 3, 'B4E242' );
Spells.PathofMindControl = new Skill( "Path of Mind Control", 'IQ', 3, 'B4E242' );
Spells.PathofMovement = new Skill( "Path of Movement", 'IQ', 3, 'B4E242' );
Spells.PathofNecromancy = new Skill( "Path of Necromancy", 'IQ', 3, 'B4E242' );
Spells.PathofProtectionWarning = new Skill( "Path of Protection & Warning", 'IQ', 3, 'B4E242' );

// Spells.SpellName.classes = { reg: true, area: true, riq: true, rwi: true, rpe: true, rst: true, rht: true, rdx: true, info: true, block: true, spcl: true, msl: true, melee: true, ench: true };
// Spells.SpellName.stats = { duration: 'instant', castcost: '&mdash;', maintaincost: '&mdash;', time: 1, notes: '' };    // these are the defaults in loadCharacter


// <Body Control>
// Clumsiness
Spells.Clumsiness = new Skill( "Clumsiness", 'IQ', 2, 'B4E244' );
Spells.Clumsiness.classes = { reg: true, rht: true };
Spells.Clumsiness.stats = { duration: '1 min', castcost: '1-5', notes: '1/DX-, max -5', maintaincost: '½ C2C' };
Prerequisites.Clumsiness_requires_Spasm = { target: 'Clumsiness', prereq: 'Spasm' };
// Deathtouch
Spells.Deathtouch = new Skill( "Deathtouch", 'IQ', 2, 'B4E245' );
Spells.Deathtouch.classes = { melee: true };
Spells.Deathtouch.stats = { castcost: '1-3', notes: '1/die damage, max 3d' };
Prerequisites.Deathtouch_requires_WitherLimb = { target: 'Deathtouch', prereq: 'WitherLimb' };
// Hinder
Spells.Hinder = new Skill( "Hinder", 'IQ', 2, 'B4E244' );
Spells.Hinder.classes = { reg: true, rht: true };
Spells.Hinder.stats = { duration: '1 min', castcost: '1-4', notes: '1/Move-, max -4', maintaincost: 'same' };
Prerequisites.Hinder_requires_Haste_pgroup1 = { target: 'Hinder', prereq: 'Haste', pgroup: 1 };
Prerequisites.Hinder_requires_Clumsiness_pgroup1 = { target: 'Hinder', prereq: 'Clumsiness', pgroup: 1 };
// Itch
Spells.Itch = new Skill( "Itch", 'IQ', 2, 'B4E244' );
Spells.Itch.classes = { reg: true, rht: true };
Spells.Itch.stats = { duration: 'Until the subject takes a turn to scratch.', castcost: 2 };
// Pain
Spells.Pain = new Skill( "Pain", 'IQ', 2, 'B4E244' );
Spells.Pain.classes = { reg: true, rht: true };
Spells.Pain.stats = { duration: '1 sec', castcost: 2  };
Prerequisites.Pain_requires_Spasm = { target: 'Pain', prereq: 'Spasm' };
// Paralyze Limb
Spells.ParalyzeLimb = new Skill( "Paralyze Limb", 'IQ', 2, 'B4E244' );
Spells.ParalyzeLimb.classes = { melee: true, rht: true };
Spells.ParalyzeLimb.stats = { duration: '1 min', castcost: 3 };
Prerequisites.ParalyzeLimb_requires_Magery1 = { target: 'ParalyzeLimb', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.ParalyzeLimb_requires_5BC = { target: 'ParalyzeLimb', number: 5, prereq: 'BC' };
Prerequisites.ParalyzeLimb_requires_Pain = { target: 'ParalyzeLimb', prereq: 'Pain' };
// Rooted Feet
Spells.RootedFeet = new Skill( "Rooted Feet", 'IQ', 2, 'B4E244' );
Spells.RootedFeet.classes = { reg: true, rst: true };
Spells.RootedFeet.stats = { duration: '1 min, or until broken', castcost: 3 };
Prerequisites.RootedFeet_requires_Hinder = { target: 'RootedFeet', prereq: 'Hinder' };
// Spasm
Spells.Spasm = new Skill( "Spasm", 'IQ', 2, 'B4E244' );
Spells.Spasm.classes = { reg: true, rht: true };
Spells.Spasm.stats = { duration: 'a moment', castcost: 2 };
Prerequisites.Spasm_requires_Itch = { target: 'Spasm', prereq: 'Itch' };
// Wither Limb
Spells.WitherLimb = new Skill( "Wither Limb", 'IQ', 2 , 'B4E244');
Spells.WitherLimb.classes = { melee: true, rht: true };
Spells.WitherLimb.stats = { duration: 'permanent', castcost: 5 };
Prerequisites.WitherLimb_requires_Magery2 = { target: 'WitherLimb', category: 'ADS', prereq: 'Magery', level: 2 };
Prerequisites.WitherLimb_requires_ParalyzeLimb = { target: 'WitherLimb', prereq: 'ParalyzeLimb' };


// <Communication & Empathy:CE>
// Hide Thoughts
Spells.HideThoughts = new Skill( "Hide Thoughts", 'IQ', 2, 'B4E245' );
Spells.HideThoughts.classes = { reg: true };
Spells.HideThoughts.stats = { duration: '10 min', castcost: 3, maintaincost: 1 };
Prerequisites.HideThoughts_requires_Truthsayer = { target: 'HideThoughts', prereq: 'Truthsayer' };
// Mind-Reading
Spells.MindReadingSpell = new Skill( "Mind-Reading", 'IQ', 2, 'B4E245' );
Spells.MindReadingSpell.classes = { reg: true, rwi: true };
Spells.MindReadingSpell.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 10 };
Prerequisites.MindReadingSpell_requires_Truthsayer = { target: 'MindReadingSpell', prereq: 'Truthsayer' };
// Sense Emotion
Spells.SenseEmotion = new Skill( "Sense Emotion", 'IQ', 2, 'B4E245' );
Spells.SenseEmotion.classes = { reg: true };
Spells.SenseEmotion.stats = { castcost: 2 };
Prerequisites.SenseEmotion_requires_SenseFoes = { target: 'SenseEmotion', prereq: 'SenseFoes' };
// Sense Foes
Spells.SenseFoes = new Skill( "Sense Foes", 'IQ', 2, 'B4E245' );
Spells.SenseFoes.classes = { info: true, area: true };
Spells.SenseFoes.stats = { castcost: 1 };
// Truthsayer
Spells.Truthsayer = new Skill( "Truthsayer", 'IQ', 2, 'B4E245' );
Spells.Truthsayer.classes = { info: true, rwi: true };
Spells.Truthsayer.stats = { castcost: 2 };
Prerequisites.Truthsayer_requires_SenseEmotion = { target: 'Truthsayer', prereq: 'SenseEmotion' };


// <Earth>
// Create Earth
Spells.CreateEarth = new Skill( "Create Earth", 'IQ', 2, 'B4E246' );
Spells.CreateEarth.classes = { reg: true };
Spells.CreateEarth.stats = { duration: 'permanent', castcost: '1 or 2 per yd&sup3;', notes: '2 per cubic yard to create earth from nothingness (minimum 2); 1 per cubic yard to solidify mud into good earth (minimum 1).' };
Prerequisites.CreateEarth_requires_EarthtoStone = { target: 'CreateEarth', prereq: 'EarthtoStone' };
// Earth to Air
Spells.EarthtoAir = new Skill( "Earth to Air", 'IQ', 2, 'B4E243' );
Spells.EarthtoAir.classes = { reg: true };
Spells.EarthtoAir.stats = { duration: 'permanent', castcost: '1/ft&sup3; or 5/yd&sup3;', notes: '1 to transform one cubic foot of earth/stone to air, giving enough air for one person to breathe for 1 minute. To transform larger quantities of earth/stone at once, the cost is 5 per cubic yard.', time: 2 };
Prerequisites.EarthtoAir_requires_CreateAir  = { target: 'EarthtoAir', prereq: 'CreateAir' };
Prerequisites.EarthtoAir_requires_ShapeEarth = { target: 'EarthtoAir', prereq: 'ShapeEarth' };
// Earth to Stone
Spells.EarthtoStone = new Skill( "Earth to Stone", 'IQ', 2, 'B4E245' );
Spells.EarthtoStone.classes = { reg: true };
Spells.EarthtoStone.stats = { duration: 'permanent', castcost: '3/yd&sup3;', castcost: 'minimum cost: 3' };
Prerequisites.EarthtoStone_requires_Magery1     = { target: 'EarthtoStone', prereq: 'Magery', level: 1, category: 'ADS' };
Prerequisites.EarthtoStone_requires_ShapeEarth = { target: 'EarthtoStone', prereq: 'ShapeEarth' };
// Entombment
Spells.Entombment = new Skill( "Entombment", 'IQ', 2 , 'B4E246');
Spells.Entombment.classes = { reg: true, rht: true };
Spells.Entombment.stats = { duration: 'permanent, unless reversed by this spell', castcost: 10, notes: 'only 6 to reverse an entombment', time: 3 };
Prerequisites.Entombment_requires_Magery2 = { target: 'Entombment', prereq: 'Magery', level: 2, category: 'ADS' };
Prerequisites.Entombment_requires_5Earth  = { target: 'Entombment', prereq: 'Earth', number: 5 };
// Flesh to Stone
Spells.FleshtoStone = new Skill( "Flesh to Stone", 'IQ', 2, 'B4E246' );
Spells.FleshtoStone.classes = { reg: true, rht: true };
Spells.FleshtoStone.stats = { duration: 'permanent, unless reversed by Stone to Flesh', castcost: 10, time: 2 };
Prerequisites.FleshtoStone_requires_EarthtoStone = { target: 'FleshtoStone', prereq: 'EarthtoStone' };
// Seek Earth
Spells.SeekEarth = new Skill( "Seek Earth", 'IQ', 2, 'B4E245' );
Spells.SeekEarth.classes = { info: true };
Spells.SeekEarth.stats = { castcost: 3, time: 10 };
// Shape Earth
Spells.ShapeEarth = new Skill( "Shape Earth", 'IQ', 2, 'B4E245' );
Spells.ShapeEarth.classes = { reg: true };
Spells.ShapeEarth.stats = { castcost: '1/yd&sup3;', maintaincost: '½ C2C' };
Prerequisites.ShapeEarth_requires_SeekEarth = { target: 'ShapeEarth', prereq: 'SeekEarth' };
// Stone to Flesh
Spells.StonetoFlesh = new Skill( "Stone to Flesh", 'IQ', 2, 'B4E246' );
Spells.StonetoFlesh.classes = { reg: true };
Spells.StonetoFlesh.stats = { duration: 'permanent', castcost: 10, time: 5 };
Prerequisites.StonetoFlesh_requires_Magery2 = { target: 'StonetoFlesh', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.StonetoFlesh_requires_StonetoEarth = { target: 'StonetoFlesh', prereq: 'StonetoEarth' };
Prerequisites.StonetoFlesh_requires_FleshtoStone = { target: 'StonetoFlesh', prereq: 'FleshtoStone' };
// Stone to Earth
Spells.StonetoEarth = new Skill( "Stone to Earth", 'IQ', 2, 'B4E246' );
Spells.StonetoEarth.classes = { reg: true };
Spells.StonetoEarth.stats = { duration: 'permanent', castcost: '6/yd&sup3;' };
Prerequisites.StonetoEarth_requires_EarthtoStone_pgroup1 = { target: 'StonetoEarth', prereq: 'EarthtoStone',     pgroup: 1 };
Prerequisites.StonetoEarth_requires_4Earth_pgroup1       = { target: 'StonetoEarth', prereq: 'Earth', number: 4, pgroup: 1 };


// <Air>
// Breathe Water
Spells.BreatheWater = new Skill( "Breathe Water", 'IQ', 2, 'B4E243' );
Spells.BreatheWater.classes = { reg: true };
Spells.BreatheWater.stats = { duration: '1 min', castcost: 4, maintaincost: 2 };
Prerequisites.BreatheWater_requires_CreateAir = { target: 'BreatheWater', prereq: 'CreateAir' };
Prerequisites.BreatheWater_requires_DestroyWater = { target: 'BreatheWater', prereq: 'DestroyWater' };
// Create Air
Spells.CreateAir = new Skill( "Create Air", 'IQ', 2, 'B4E243' );
Spells.CreateAir.classes = { area: true };
Spells.CreateAir.stats = { castcost: 1, duration: 5 };
Prerequisites.CreateAir_requires_PurifyAir = { target: 'CreateAir', prereq: 'PurifyAir' };
// Lightning
Spells.Lightning = new Skill( "Lightning", 'IQ', 2, 'B4E244' );
Spells.Lightning.classes = { msl: true };
Spells.Lightning.stats = { castcost: 'up to Magery/sec, for 3 secs', time: '1 - 3', notes: "The bolt does 1d-1 burning damage per energy point.&#13;(The caster's fingers sparkle as the spell builds up.)" };
Prerequisites.Lightning_requires_6Air = { target: 'Lightning', number: 6, prereq: 'Air' };
Prerequisites.Lightning_requires_Magery1 = { target: 'Lightning', level: 1, category: 'ADS', prereq: 'Magery' };
// No-Smell
Spells.NoSmell = new Skill( "No-Smell", 'IQ', 2, 'B4E243' );
Spells.NoSmell.classes = { reg: true };
Spells.NoSmell.stats = { castcost: 2, maintaincost: 2, duration: '1 hr' };
Prerequisites.NoSmell_requires_PurifyAir = { target: 'NoSmell', prereq: 'PurifyAir' };
// Predict Weather
Spells.PredictWeather = new Skill( "Predict Weather", 'IQ', 2, 'B4E243' );
Spells.PredictWeather.classes = { info: true };
Spells.PredictWeather.stats = { castcost: '2 &times days', time: '5 sec/day' };
Prerequisites.PredictWeather_requires_4Air = { target: 'PredictWeather', number: 4, prereq: 'Air' };
// Purify Air
Spells.PurifyAir = new Skill( "Purify Air", 'IQ', 2, 'B4E243' );
Spells.PurifyAir.classes = { area: true };
Spells.PurifyAir.stats = { castcost: 1 };
// Shape Air
Spells.ShapeAir = new Skill( "Shape Air", 'IQ', 2, 'B4E243' );
Spells.ShapeAir.classes = { reg: true };
Spells.ShapeAir.stats = { castcost: '1 to 10', duration: 60 };
Prerequisites.ShapeAir_requires_CreateAir = { target: 'ShapeAir', prereq: 'CreateAir' };
// Stench
Spells.Stench = new Skill( "Stench", 'IQ', 2, 'B4E244' );
Spells.Stench.classes = { area: true };
Spells.Stench.stats = { duration: '5 min, except in windy areas', castcost: 1 };
Prerequisites.Stench_requires_PurifyAir = { target: 'Stench', prereq: 'PurifyAir' };
// Walk on Air
Spells.WalkonAir = new Skill( "Walk on Air", 'IQ', 2, 'B4E243' );
Spells.WalkonAir.classes = { reg: true };
Spells.WalkonAir.stats = { duration: 60, castcost: 3, maintaincost: 2 };
Prerequisites.WalkonAir_requires_ShapeAir = { target: 'WalkonAir', prereq: 'ShapeAir' };

// <Fire>
// Ignite Fire
Spells.IgniteFire = new Skill( "Ignite Fire", 'IQ', 2, 'B4E246' );
Spells.IgniteFire.classes = { reg: true };
Spells.IgniteFire.stats = { castcost: '1-4', maintaincost: 'same', notes: "1 &ndash; for an effect as though a match had been held to the subject: lights a candle, pipe, or tinder in one second.&#13;2 &ndash; for an effect as though a torch had been held to the subject: ignites paper or loose cloth in one second, ordinary clothes being worn in four seconds.&#13;3 &ndash; for an effect as though a blowtorch had been held to the subject: ignites dry firewood or clothes being worn in one second, leather in two seconds, heavy wood in six seconds.&#13;4 &ndash; for an effect as though burning magnesium or phosphorus had been held to the subject: ignites coal in one second, heavy wood in two seconds." };
// Create Fire
Spells.CreateFire = new Skill( "Create Fire", 'IQ', 2, 'B4E246' );
Spells.CreateFire.classes = { area: true };
Spells.CreateFire.stats = { duration: '1 min', castcost: 2, maintaincost: '½ C2C' };
Prerequisites.CreateFire_requires_IgniteFire = { target: 'CreateFire', prereq: 'IgniteFire' };
// Shape Fire
Spells.ShapeFire = new Skill( "Shape Fire", 'IQ', 2, 'B4E246' );
Spells.ShapeFire.classes = { area: true };
Spells.ShapeFire.stats = { duration: '1 min', castcost: 2, maintaincost: '½ C2C' };
Prerequisites.ShapeFire_requires_IgniteFire = { target: 'ShapeFire', prereq: 'IgniteFire' };
// Deflect Energy
Spells.DeflectEnergy = new Skill( "Deflect Energy", 'IQ', 2, 'B4E246' );
Spells.DeflectEnergy.classes = { block: true };
Spells.DeflectEnergy.stats = { duration: '1 min', castcost: 1 };
Prerequisites.DeflectEnergy_requires_Magery1    = { target: 'DeflectEnergy', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.DeflectEnergy_requires_ShapeFire = { target: 'DeflectEnergy', prereq: 'ShapeFire' };
// Extinguish Fire
Spells.ExtinguishFire = new Skill( "Extinguish Fire", 'IQ', 2, 'B4E247' );
Spells.ExtinguishFire.classes = { area: true };
Spells.ExtinguishFire.stats = { duration: 'Once out, a fire stays out.', castcost: 3 };
Prerequisites.ExtinguishFire_requires_IgniteFire = { target: 'ExtinguishFire', prereq: 'IgniteFire' };
// Heat
Spells.Heat = new Skill( "Heat", 'IQ', 2, 'B4E247' );
Spells.Heat.classes = { reg: true };
Spells.Heat.stats = { duration: '1 min', castcost: '1-4&dagger;', notes: '&dagger; 1 for an object up to the size of a fist, 2 for an object up to one yd&sup3;, and 2/yd&sup3; for a larger object. Temperature change can be doubled to 40&deg; per minute for double cost, tripled to 60&deg; per minute for triple cost, and so on. Slower heating costs no less.', maintaincost: 'same' };
Prerequisites.Heat_requires_CreateFire = { target: 'Heat', prereq: 'CreateFire' };
Prerequisites.Heat_requires_ShapeFire = { target: 'Heat', prereq: 'ShapeFire' };
// Cold
Spells.Cold = new Skill( "Cold", 'IQ', 2, 'B4E247' );
Spells.Cold.classes = { reg: true };
Spells.Cold.stats = { duration: '1 min', castcost: '1-4&dagger;', notes: '&dagger; 1 for an object up to the size of a fist, 2 for an object up to one yd&sup3;, and 2/yd&sup3; for a larger object. Temperature change can be doubled to 40&deg; per minute for double cost, tripled to 60&deg; per minute for triple cost, and so on. Slower cooling costs no less.', maintaincost: 'same' };
Prerequisites.Cold_requires_Heat = { target: 'Cold', prereq: 'Heat' };
// Resist Cold
Spells.ResistCold = new Skill( "Resist Cold", 'IQ', 2, 'B4E247' );
Spells.ResistCold.classes = { reg: true };
Spells.ResistCold.stats = { duration: '1 min', castcost: 2, maintaincost: 1, notes: 'Cost doubles if subject must resist cold of -40&deg; or more; cost triples if subject must resist the cold of absolute zero.' };
Prerequisites.ResistCold_requires_CreateFire = { target: 'ResistCold', prereq: 'CreateFire' };
Prerequisites.ResistCold_requires_Heat = { target: 'ResistCold', prereq: 'Heat' };
// Resist Fire
Spells.ResistFire = new Skill( "Resist Fire", 'IQ', 2, 'B4E247' );
Spells.ResistFire.classes = { reg: true };
Spells.ResistFire.stats = { duration: '1 min', castcost: 2, maintaincost: 1, notes: 'Cost doubles if subject must resist a blast furnace or volcano; cost triples if subject must resist the heat of a star, nuclear bomb, <i>etc</i>. Only the first level of protection is necessary against combat-type Fire spells.' };
Prerequisites.ResistFire_requires_ExtinguishFire = { target: 'ResistFire', prereq: 'ExtinguishFire' };
Prerequisites.ResistFire_requires_Cold = { target: 'ResistFire', prereq: 'Cold' };
// Fireball
Spells.Fireball = new Skill( "Fireball", 'IQ', 2, 'B4E247' );
Spells.Fireball.classes = { msl: true };
Spells.Fireball.stats = { castcost: 'up to Magery/sec, for 3 secs', time: '1 - 3', notes: "The fireball does 1d burning damage per energy point." };
Prerequisites.Fireball_requires_Magery1 = { target: 'Fireball', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.Fireball_requires_CreateFire = { target: 'Fireball', prereq: 'CreateFire' };
Prerequisites.Fireball_requires_ShapeFire = { target: 'Fireball', prereq: 'ShapeFire' };
// Explosive Fireball
Spells.ExplosiveFireball = new Skill( "Explosive Fireball", 'IQ', 2, 'B4E247' );
Spells.ExplosiveFireball.classes = { msl: true };
Spells.ExplosiveFireball.stats = { castcost: 'up to twice Magery/sec, for 3 secs', time: '1 - 3', notes: "The fireball does 1d burning damage per full 2 points of energy." };
Prerequisites.ExplosiveFireball_requires_Fireball = { target: 'ExplosiveFireball', prereq: 'Fireball' };


// <Water>
// Seek Water
Spells.SeekWater = new Skill( "Seek Water", 'IQ', 2, 'B4E253' );
Spells.SeekWater.classes = { info: true };
Spells.SeekWater.stats = { castcost: 2 };
// Purify Water
Spells.PurifyWater = new Skill( "Purify Water", 'IQ', 2, 'B4E253' );
Spells.PurifyWater.classes = { spcl: true };
Spells.PurifyWater.stats = { time: 'see notes', castcost: '1/gal', duration: 'Purified water stays pure unless re-contaminated.', notes: 'Usually 5 to 10 seconds per gallon, unless a large container and ring are used.' };
Prerequisites.PurifyWater_requires_SeekWater = { target: 'PurifyWater', prereq: 'SeekWater' };
// Create Water
Spells.CreateWater = new Skill( "Create Water", 'IQ', 2, 'B4E253' );
Spells.CreateWater.classes = { reg: true };
Spells.CreateWater.stats = { castcost: '2/gal', duration: 'The created water is permanent.' };
Prerequisites.CreateWater_requires_PurifyWater = { target: 'CreateWater', prereq: 'PurifyWater' };
// Destroy Water
Spells.DestroyWater = new Skill( "Destroy Water", 'IQ', 2, 'B4E253' );
Spells.DestroyWater.classes = { area: true };
Spells.DestroyWater.stats = { castcost: 3, duration: 'permanent', notes: 'In deep water, the area is only 2 yards in height (or depth).' };
Prerequisites.DestroyWater_requires_CreateWater = { target: 'DestroyWater', prereq: 'CreateWater' };
// Shape Water
Spells.ShapeWater = new Skill( "Shape Water", 'IQ', 2, 'B4E253' );
Spells.ShapeWater.classes = { reg: true };
Spells.ShapeWater.stats = { castcost: '1 per 20 gal shaped', duration: '1 min', maintaincost: 'same' };
Prerequisites.ShapeWater_requires_CreateWater = { target: 'ShapeWater', prereq: 'CreateWater' };
// Fog
Spells.Fog = new Skill( "Fog", 'IQ', 2, 'B4E253' );
Spells.Fog.classes = { area: true };
Spells.Fog.stats = { duration: '1 min', castcost: 2, maintaincost: 1 };
Prerequisites.Fog_requires_ShapeWater = { target: 'Fog', prereq: 'ShapeWater' };
// Icy Weapon
Spells.IcyWeapon = new Skill( "Icy Weapon", 'IQ', 2, 'B4E253' );
Spells.IcyWeapon.classes = { reg: true };
Spells.IcyWeapon.stats = { duration: '1 min', castcost: 3, maintaincost: 1, time: 3 };
Prerequisites.IcyWeapon_requires_CreateWater = { target: 'IcyWeapon', prereq: 'CreateWater' };


// <Enchantment>
// Accuracy
Spells.Accuracy = new Skill( "Accuracy", 'IQ', 2, 'B4E480' );
Spells.Accuracy.classes = { ench: true };
Spells.Accuracy.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B481), <i>Accuracy</i> (B480).' };
Prerequisites.Accuracy_requires_Enchant = { target: 'Accuracy', prereq: 'Enchant' };
Prerequisites.Accuracy_requires_5Air = { target: 'Accuracy', number: 5, prereq: 'Air' };
// Deflect
Spells.Deflect = new Skill( "Deflect", 'IQ', 2, 'B4E480' );
Spells.Deflect.classes = { ench: true };
Spells.Deflect.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B481), <i>Deflect</i> (B480).' };
Prerequisites.Deflect_requires_Enchant = { target: 'Deflect', prereq: 'Enchant' };
// Enchant
Spells.Enchant = new Skill( "Enchant", 'IQ', 3, 'B4E480' );
Spells.Enchant.classes = { ench: true };
Spells.Enchant.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B481).' };
Prerequisites.Enchant_requires_Magery2 = { target: 'Enchant', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.Enchant_requires_10othercolleges = { target: 'Enchant', number: 10, prereq: 'MagicColleges', meta: true };
// Fortify
Spells.Fortify = new Skill( "Fortify", 'IQ', 2, 'B4E480' );
Spells.Fortify.classes = { ench: true };
Spells.Fortify.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B481), <i>Fortify</i> (B480).' };
Prerequisites.Fortify_requires_Enchant = { target: 'Fortify', prereq: 'Enchant' };
// Power
Spells.Power = new Skill( "Power", 'IQ', 2, 'B4E480' );
Spells.Power.classes = { ench: true };
Spells.Power.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B481), <i>Power</i> (B480).' };
Prerequisites.Power_requires_Enchant       = { target: 'Power', prereq: 'Enchant' };
Prerequisites.Power_requires_RecoverEnergy = { target: 'Power', prereq: 'RecoverEnergy' };
// Puissance
Spells.Puissance = new Skill( "Puissance", 'IQ', 2, 'B4E481' );
Spells.Puissance.classes = { ench: true };
Spells.Puissance.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B481), <i>Puissance</i> (B480).' };
Prerequisites.Puissance_requires_5Earth = { target: 'Puissance', number: 5, prereq: 'Earth' };
// Staff
Spells.StaffSpell = new Skill( "Staff", 'IQ', 2, 'B4E481' );
Spells.StaffSpell.classes = { ench: true };
Spells.StaffSpell.stats = { castcost: 30, duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (B481), <i>Magic Staffs</i> (B240)' };
Prerequisites.StaffSpell_requires_Enchant = { target: 'StaffSpell', prereq: 'Enchant' };


// <Gate:IC>
// Planar Summons
Spells.PlanarSummons = new Skill( "Planar Summons", 'IQ', 2, 'B4E247' );
Spells.PlanarSummons.classes = { spcl: true };
Spells.PlanarSummons.stats = { duration: 'Until the task is done or one hour, whichever is less. Usually.', castcost: "1/10CP", time: '5 min', notes: 'Minimum energy cost is 20.' };
Prerequisites.PlanarSummons_requires_Magery1 = { target: 'PlanarSummons', level: 1, category: 'ADS', prereq: 'Magery' };
Prerequisites.PlanarSummons_requires_10colleges = { target: 'PlanarSummons', number: 10, prereq: 'MagicColleges', meta: true };
// Plane Shift
Spells.PlaneShift = new Skill( "Plane Shift", 'IQ', 3, 'B4E248' );
Spells.PlaneShift.specRequiredList = [];
Spells.PlaneShift.classes = { spcl: true };
Spells.PlaneShift.stats = { duration: 'permanent', castcost: 20, time: 5 };
Prerequisites.PlaneShift_requires_PlanarSummons = { target: 'PlaneShift', prereq: 'PlanarSummons' };


// <Healing>
// Lend Energy
Spells.LendEnergy = new Skill( "Lend Energy", 'IQ', 2, 'B4E248' );
Spells.LendEnergy.classes = { reg: true };
Spells.LendEnergy.stats = { castcost: '1/FP restored' };
Prerequisites.LendEnergy_requires_Magery1_pgroup1 = { target: 'LendEnergy', category: 'ADS', prereq: 'Magery', level: 1, pgroup: 1 };
Prerequisites.LendEnergy_requires_Empathy_pgroup1 = { target: 'LendEnergy', category: 'ADS', prereq: 'Empathy',          pgroup: 1 };
// Lend Vitality
Spells.LendVitality = new Skill( "Lend Vitality", 'IQ', 2, 'B4E248' );
Spells.LendVitality.classes = { reg: true };
Spells.LendVitality.stats = { duration: '1 hr', castcost: '1/HP restored' };
Prerequisites.LendVitality_requires_LendEnergy = { target: 'LendVitality', prereq: 'LendEnergy' };
// Recover Energy
Spells.RecoverEnergy = new Skill( "Recover Energy", 'IQ', 2, 'B4E248' );
Spells.RecoverEnergy.classes = { spcl: true };
Spells.RecoverEnergy.stats = { castcost: 0, duration: '&mdash;', notes: 'speeds FP recovery; see B248' };
Prerequisites.RecoverEnergy_requires_Magery1 = { target: 'RecoverEnergy', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.RecoverEnergy_requires_LendEnergy = { target: 'RecoverEnergy', prereq: 'LendEnergy' };
// Awaken
Spells.Awaken = new Skill( "Awaken", 'IQ', 2, 'B4E248' );
Spells.Awaken.classes = { area: true };
Spells.Awaken.stats = { castcost: 1 };
Prerequisites.Awaken_requires_LendVitality = { target: 'Awaken', prereq: 'LendVitality' };
// Minor Healing
Spells.MinorHealing = new Skill( "Minor Healing", 'IQ', 2, 'B4E248' );
Spells.MinorHealing.classes = { reg: true };
Spells.MinorHealing.stats = { castcost: '1-3', notes: 'restores 1 HP/FP spent' };
Prerequisites.MinorHealing_requires_LendVitality = { target: 'MinorHealing', prereq: 'LendVitality' };
// Major Healing
Spells.MajorHealing = new Skill( "Major Healing", 'IQ', 3, 'B4E248' );
Spells.MajorHealing.classes = { reg: true };
Spells.MajorHealing.stats = { castcost: '1-4', notes: 'restores 2 HP/FP spent' };
Prerequisites.MajorHealing_requires_Magery1 = { target: 'MajorHealing', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.MajorHealing_requires_MinorHealing = { target: 'MajorHealing', prereq: 'MinorHealing' };
// Great Healing
Spells.GreatHealing = new Skill( "Great Healing", 'IQ', 3, 'B4E248' );
Spells.GreatHealing.classes = { reg: true };
Spells.GreatHealing.stats = { castcost: 20, notes: 'restores all missing HP' };
Prerequisites.GreatHealing_requires_Magery3 = { target: 'GreatHealing', category: 'ADS', prereq: 'Magery', level: 3 };
Prerequisites.GreatHealing_requires_MajorHealing = { target: 'GreatHealing', prereq: 'MajorHealing' };


// <Knowledge>
// Detect Magic
Spells.DetectMagic = new Skill( "Detect Magic", 'IQ', 2, 'B4E249' );
Spells.DetectMagic.classes = { reg: true };
Spells.DetectMagic.stats = { castcost: 2, time: 5 };
Prerequisites.DetectMagic_requires_Magery1 = { target: 'DetectMagic', category: 'ADS', prereq: 'Magery', level: 1 };
// Aura
Spells.Aura = new Skill( "Aura", 'IQ', 2, 'B4E249' );
Spells.Aura.classes = { info: true };
Spells.Aura.stats = { castcost: 3 };
Prerequisites.Aura_requires_DetectMagic = { target: 'Aura', prereq: 'DetectMagic' };
// Seeker
Spells.Seeker = new Skill( "Seeker", 'IQ', 2, 'B4E249' );
Spells.Seeker.classes = { info: true };
Spells.Seeker.stats = { castcost: 3 };
Prerequisites.Seeker_requires_Magery1 = { target: 'Seeker', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.Seeker_requires_IQ12 = { target: 'Seeker', category: 'stat', level: 12, prereq: 'IQ' };
Prerequisites.Seeker_requires_SeekSpells = { target: 'Seeker', number: 2, prereq: 'Seek' };
// Trace
Spells.Trace = new Skill( "Trace", 'IQ', 2, 'B4E249' );
Spells.Trace.classes = { reg: true };
Spells.Trace.stats = { castcost: 3, maintaincost: 1, duration: '1 hr', time: '1 min' };
Prerequisites.Trace_requires_Seeker = { target: 'Trace', prereq: 'Seeker' };
// Identify Spell
Spells.IdentifySpell = new Skill( "Identify Spell", 'IQ', 2, 'B4E249' );
Spells.IdentifySpell.classes = { info: true };
Spells.IdentifySpell.stats = { castcost: 2 };
Prerequisites.IdentifySpell_requires_DetectMagic = { target: 'IdentifySpell', prereq: 'DetectMagic' };
// Analyze Magic
Spells.AnalyzeMagic = new Skill( "Analyze Magic", 'IQ', 2, 'B4E249' );
Spells.AnalyzeMagic.classes = { info: true, res: true };
Spells.AnalyzeMagic.stats = { castcost: 8, time: '1 hr' };
Prerequisites.AnalyzeMagic_requires_IdentifySpell = { target: 'AnalyzeMagic', prereq: 'IdentifySpell' };


// <Light & Darkness:LD>
// Light
Spells.Light = new Skill( "Light", 'IQ', 2, 'B4E249' );
Spells.Light.classes = { reg: true };
Spells.Light.stats = { castcost: 1, maintaincost: 1, duration: '1 min' };
// Continual Light
Spells.ContinualLight = new Skill( "Continual Light", 'IQ', 2, 'B4E249' );
Spells.ContinualLight.classes = { reg: true };
Spells.ContinualLight.stats = { castcost: '2-6', duration: '2d days', notes: 'Does <i>not</i> count as a spell "on".' };
Prerequisites.ContinualLight_requires_Light = { target: 'ContinualLight', prereq: 'Light' };
// Darkness
Spells.Darkness = new Skill( "Darkness", 'IQ', 2, 'B4E250' );
Spells.Darkness.classes = { area: true };
Spells.Darkness.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
Prerequisites.Darkness_requires_ContinualLight = { target: 'Darkness', prereq: 'ContinualLight' };
// Blur
Spells.Blur = new Skill( "Blur", 'IQ', 2, 'B4E250' );
Spells.Blur.classes = { reg: true };
Spells.Blur.stats = { castcost: '1-5', maintaincost: 'same', time: 2, duration: '1 min' };
Prerequisites.Blur_requires_Darkness = { target: 'Blur', prereq: 'Darkness' };


// <Meta-Spells>
// Counterspell
Spells.Counterspell = new Skill( "Counterspell", 'IQ', 2, 'B4E250' );
Spells.Counterspell.classes = { reg: true, res: true };
Spells.Counterspell.stats = { castcost: '½ countered spell cost', time: 5 };
Prerequisites.Counterspell_requires_Magery1 = { target: 'Counterspell', category: 'ADS', prereq: 'Magery', level: 1 };
// Dispel Magic
Spells.DispelMagic = new Skill( "Dispel Magic", 'IQ', 2, 'B4E250' );
Spells.DispelMagic.classes = { area: true };
Spells.DispelMagic.stats = { castcost: 3, time: '1/FP spent', duration: 'Dispelled magic is permanently gone.' };
Prerequisites.DispelMagic_requires_Counterspell = { target: 'DispelMagic', prereq: 'Counterspell' };
Prerequisites.DispelMagic_requires_13spells = { target: 'DispelMagic', number: 13, category: 'GR', prereq: 'Spells' };


// <Mind Control>
// Foolishness
Spells.Foolishness = new Skill( "Foolishness", 'IQ', 2, 'B4E250' );
Spells.Foolishness.classes = { reg: true, rwi: true };
Spells.Foolishness.stats = { castcost: '1-5', maintaincost: '½ C2C', duration: '1 min' };
Prerequisites.Foolishness_requires_IQ = { target: 'Foolishness', category: 'stat', level: 12, prereq: 'IQ' };
// Forgetfulness
Spells.Forgetfulness = new Skill( "Forgetfulness", 'IQ', 2, 'B4E250' );
Spells.Forgetfulness.classes = { reg: true, rwi: true };
Spells.Forgetfulness.stats = { duration: '1 hr', castcost: 3, maintaincost: 3, time: 10 };
Prerequisites.Forgetfulness_requires_Magery1 = { target: 'Forgetfulness', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.Forgetfulness_requires_IQ = { target: 'Forgetfulness', category: 'stat', level: 12, prereq: 'IQ' };
Prerequisites.Forgetfulness_requires_Foolishness = { target: 'Forgetfulness', prereq: 'Foolishness' };
// Daze
Spells.Daze = new Skill( "Daze", 'IQ', 2, 'B4E250' );
Spells.Daze.classes = { reg: true, rht: true };
Spells.Daze.stats = { duration: '1 min', castcost: 3, maintaincost: 2, time: 2 };
Prerequisites.Daze_requires_Foolishness = { target: 'Daze', prereq: 'Foolishness' };
// Mass Daze
Spells.MassDaze = new Skill( "Mass Daze", 'IQ', 2, 'B4E251' );
Spells.MassDaze.classes = { area: true, rht: true };
Spells.MassDaze.stats = { duration: '1 min', castcost: 2, maintaincost: 1, time: '1/pt spent', notes: 'Min radius 2 yds.' };
Prerequisites.MassDaze_requires_Daze = { target: 'MassDaze', prereq: 'Daze' };
Prerequisites.MassDaze_requires_IQ = { target: 'MassDaze', category: 'stat', level: 13, prereq: 'IQ' };
// Sleep
Spells.Sleep = new Skill( "Sleep", 'IQ', 2, 'B4E251' );
Spells.Sleep.classes = { reg: true, rht: true };
Spells.Sleep.stats = { castcost: 4, time: 3 };
Prerequisites.Sleep_requires_Daze = { target: 'Sleep', prereq: 'Daze' };
// Mass Sleep
Spells.MassSleep = new Skill( "Mass Sleep", 'IQ', 2, 'B4E251' );
Spells.MassSleep.classes = { area: true, rht: true };
Spells.MassSleep.stats = { castcost: 3, time: '1/pt spent', notes: 'Min radius 2 yds.' };
Prerequisites.MassSleep_requires_Sleep = { target: 'MassSleep', prereq: 'Sleep' };
Prerequisites.MassSleep_requires_IQ = { target: 'MassSleep', category: 'stat', level: 13, prereq: 'IQ' };
// Command
Spells.Command = new Skill( "Command", 'IQ', 2, 'B4E251' );
Spells.Command.classes = { block: true, rwi: true };
Spells.Command.stats = { castcost: 2 };
Prerequisites.Command_requires_Magery2 = { target: 'Command', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.Command_requires_Forgetfulness = { target: 'Command', prereq: 'Forgetfulness' };


// <Movement>
// Haste
Spells.Haste = new Skill( "Haste", 'IQ', 2, 'B4E251' );
Spells.Haste.classes = { reg: true };
Spells.Haste.stats = { duration: '1 min', castcost: '2/Move+1', maintaincost: '1/Move+1', time: 2, notes: 'Max bonus 3' };
// Great Haste
Spells.GreatHaste = new Skill( "Great Haste", 'IQ', 3, 'B4E251' );
Spells.GreatHaste.classes = { reg: true };
Spells.GreatHaste.stats = { duration: '10 sec', castcost: 5, time: 3, notes: 'At spell’s end, subject loses 5 FP (unless caster was the subject).' };
Prerequisites.GreatHaste_requires_Magery1     = { target: 'GreatHaste', category: 'ADS', prereq: 'Magery',     level: 1, pgroup: 1 };
Prerequisites.GreatHaste_requires_MoveMagery1 = { target: 'GreatHaste', category: 'ADS', prereq: 'MageryMove', level: 1, pgroup: 1 };
Prerequisites.GreatHaste_requires_Haste = { target: 'GreatHaste', prereq: 'Haste' };
Prerequisites.GreatHaste_requires_IQ12 = { target: 'GreatHaste', category: 'stat', level: 12, prereq: 'IQ' };
// Apportation
Spells.Apportation = new Skill( "Apportation", 'IQ', 2, 'B4E251' );
Spells.Apportation.classes = { reg: true, rwi: true };
Spells.Apportation.stats = { duration: '1 min', castcost: 'up to 4/100 lbs', maintaincost: 'same', time: 2, notes: '1 for up to 1 lb; 2 for 10 lb; 3 for 50 lb; 4 for 200 lb; plus 4/100 lbs' };
Prerequisites.Apportation_requires_Magery1     = { target: 'Apportation', category: 'ADS', prereq: 'Magery',     level: 1, pgroup: 1 };
Prerequisites.Apportation_requires_MoveMagery1 = { target: 'Apportation', category: 'ADS', prereq: 'MageryMove', level: 1, pgroup: 1 };
// Lockmaster
Spells.Lockmaster = new Skill( "Lockmaster", 'IQ', 2, 'B4E251' );
Spells.Lockmaster.classes = { reg: true, res: true };
Spells.Lockmaster.stats = { castcost: 3, time: 10 };
Prerequisites.Lockmaster_requires_Magery2     = { target: 'Lockmaster', prereq: 'Magery', level: 2, category: 'ADS' };
Prerequisites.Lockmaster_requires_Apportation = { target: 'Lockmaster', prereq: 'Apportation' };
// Deflect Missile
Spells.DeflectMissile = new Skill( "Deflect Missile", 'IQ', 2, 'B4E251' );
Spells.DeflectMissile.classes = { block: true };
Spells.DeflectMissile.stats = { castcost: 1 };
Prerequisites.DeflectMissile_requires_Apportation = { target: 'DeflectMissile', prereq: 'Apportation' };


// Spells.SpellName.classes = { reg: true, area: true, riq: true, rwi: true, rst: true, rht: true, rdx: true, info: true, block: true, spcl: true, msl: true, melee: true, ench: true };
// Spells.SpellName.stats = { duration: true, castcost: true, maintaincost: true, time: true, notes: true };


// <Necromantic>
// Death Vision
Spells.DeathVision = new Skill( "Death Vision", 'IQ', 2, 'B4E251' );
Spells.DeathVision.classes = { reg: true };
Spells.DeathVision.stats = { duration: 1, castcost: 2, time: 3 };
Prerequisites.DeathVision_requires_Magery1 = { target: 'DeathVision', category: 'ADS', prereq: 'Magery', level: 1 };
// Sense Spirit
Spells.SenseSpirit = new Skill( "Sense Spirit", 'IQ', 2, 'B4E252' );
Spells.SenseSpirit.classes = { info: true, area: true };
Spells.SenseSpirit.stats = { castcost: '½' };
Prerequisites.SenseSpirit_requires_DeathVision = { target: 'SenseSpirit', prereq: 'DeathVision' };
// Summon Spirit
Spells.SummonSpirit = new Skill( "Summon Spirit", 'IQ', 2, 'B4E252' );
Spells.SummonSpirit.classes = { info: true, res: true };
Spells.SummonSpirit.stats = { duration: '1 min', castcost: 20, maintaincost: 10, time: '5 min', notes: 'Halve costs if the spell is cast at the site of death or over the corpse of the person being contacted.' };
Prerequisites.SummonSpirit_requires_Magery2 = { target: 'SummonSpirit', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.SummonSpirit_requires_DeathVision = { target: 'SummonSpirit', prereq: 'DeathVision' };
// Zombie
Spells.Zombie = new Skill( "Zombie", 'IQ', 2, 'B4E252' );
Spells.Zombie.classes = { reg: true };
Spells.Zombie.stats = { duration: 'permanent', castcost: 8, time: '1 min', notes: 'Multiply cost by 1+SM for creatures larger than human-sized.' };
Prerequisites.Zombie_requires_SummonSpirit = { target: 'Zombie', prereq: 'SummonSpirit' };
Prerequisites.Zombie_requires_LendVitality = { target: 'Zombie', prereq: 'LendVitality' };
// Turn Zombie
Spells.TurnZombie = new Skill( "Turn Zombie", 'IQ', 2, 'B4E252' );
Spells.TurnZombie.classes = { area: true };
Spells.TurnZombie.stats = { duration: 'effect lasts 1 day', castcost: 2, time: 4 };
Prerequisites.TurnZombie_requires_Zombie = { target: 'TurnZombie', prereq: 'Zombie' };
// Summon Demon
Spells.SummonDemon = new Skill( "Summon Demon", 'IQ', 2, 'B4E252' );
Spells.SummonDemon.classes = { spcl: true };
Spells.SummonDemon.stats = { duration: '1 hr or task done', castcost: '1/10CP', time: '5 min', notes: 'Min cost 20' };
Prerequisites.SummonDemon_requires_Magery1 = { target: 'SummonDemon', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.SummonDemon_requires_10colleges = { target: 'SummonDemon', number: 10, prereq: 'MagicColleges', meta: true };
// Banish
Spells.Banish = new Skill( "Banish", 'IQ', 2, 'B4E252' );
Spells.Banish.classes = { spcl: true, rwi: true };
Spells.Banish.stats = { castcost: '1/10CP', time: 5, notes: 'Min cost 10' };
Prerequisites.Banish_requires_Magery1 = { target: 'Banish', category: 'ADS', prereq: 'Magery', level: 1 };
Prerequisites.Banish_requires_10colleges = { target: 'Banish', number: 10, prereq: 'MagicColleges', meta: true };


// <Protection & Warning>
// Shield
Spells.ShieldSpell = new Skill( "Shield", 'IQ', 2, 'B4E252' );
Spells.ShieldSpell.classes = { reg: true };
Spells.ShieldSpell.stats = { duration: '1 min', castcost: 'DB×2', maintaincost: 'half', notes: 'Max DB 4 (cost 8)' };
Prerequisites.Shield_requires_Magery2 = { target: 'ShieldSpell', level: 2, category: 'ADS', prereq: 'Magery' };
// Armor
Spells.Armor = new Skill( "Armor", 'IQ', 2, 'B4E253' );
Spells.Armor.classes = { reg: true };
Spells.Armor.stats = { duration: '1 min', castcost: 'DR×2', maintaincost: 'half', notes: 'Max DR 5 (cost 10)' };
Prerequisites.Armor_requires_Magery2 = { target: 'Armor', level: 2, category: 'ADS', prereq: 'Magery' };
Prerequisites.Armor_requires_ShieldSpell = { target: 'Armor', prereq: 'ShieldSpell' };
// Magelock
Spells.Magelock = new Skill( "Magelock", 'IQ', 2, 'B4E253' );
Spells.Magelock.classes = { reg: true };
Spells.Magelock.stats = { duration: '6 hr', castcost: 3, maintaincost: 2, time: 4, notes: 'resists Lockmaster spell' };
Prerequisites.Magelock_requires_Magery1 = { target: 'Magelock', category: 'ADS', prereq: 'Magery', level: 1 };



Groups.Spells = [];
for ( var s in Spells ) {
    Spells[s].key = s;        // also add the label as the 'key' attribute
    Spells[s].spellify();
}
/* I can use this trick to add attributes to sets of things elsewhere, too.
  I could do this with a 'if( ! attribute already there )' twist,
  to add something as a default attribute.
  To add a default to a sub-object attribute (like a wield option), I could
  do this in a little inner loop:
  for( var wo in weapon.wieldoptions ) {
    if( ! already there ) { add wo.attribute }
  }
*/

// create a Colleges hash to use for sorting, etc.
var CollegeHash = {};

for( var ci=0; ci<Groups.MagicColleges.length; ci++ ) {
    var college = Groups.MagicColleges[ci];
    var CollegeSpellList = Groups[college];
//     console.log("fetched list for "+college+" college:\n"+CollegeSpellList);
    for( var si=0; si<CollegeSpellList.length; si++ ) {
        var spell = CollegeSpellList[si];
        if( CollegeHash.hasOwnProperty(college) ) CollegeHash[college].push(spell);
        else CollegeHash[college] = [spell];
    }
}
// alert( JSONstring.make(CollegeHash) );
//     Eliminates the need for the college attribute in Spell objects!
//     And has other uses - emulate for sorting skills by type.


/****  Equipment  ****/

//  BasicEquipment, ShieldItems, ArmorItems, and Weapons objects are declared in the equipment.js file.

// These Groups defined here for use by Item.goeswith attributes in BasicEquipment below.
Groups.knives = ['Dagger','KnifeSmall','KnifeLarge'];
Groups.swords = ['Smallsword','Shortsword','Cutlass','Saber','CavalrySaber','Broadsword','BroadswordThr',
                 'Katana','BastardSword','BastardSwordThr','Greatsword','GreatswordThr'];
Groups.blades = Groups.swords.concat(Groups.knives);
Groups.cuttingWeapons = ['Axe','Hatchet','ThrowingAxe','GreatAxe','Scythe','Glaive','Naginata','Halberd','Poleaxe'];
Groups.cuttingTools = ['ironplow','saw','shovel'];
Groups.edged = Groups.blades.concat(Groups.cuttingWeapons.concat(Groups.cuttingTools));
Groups.bows = ['Bow','ShortBow','Longbow','CompositeBow'];
Groups.crossbows = ['Crossbow','PistolCrossbow'];
Groups.pistols = ['FlintlockPistol51','Derringer41','Revolver38','AutoPistol9mmTL6','AutoPistol9mmTL7',
                 'AutoPistol9mmTL9','AutoPistol44M','WheelLockPistol60','AutoPistol45','SnubRevolver38',
                  'HoldoutPistol380','Revolver357M','Revolver44M','AutoPistol40','GyrocPistol15mm',
                  'MachinePistol9mm','ElectrolaserPistol','LaserPistol','BlasterPistol'];
Groups.rifles = ['BoltActionRifle','FlintlockMusket75','RifleMusket577','Handgonne90',
                 'MatchlockMusket80','CartridgeRifle45','LeverActionCarbine30','BlasterRifle',
                 'AssaultRifle556mm','AssaultRifle762mmS','BattleRifle762mm','AssaultCarbine556mm',
                 'DartRifle11mm','SniperRifle338','ICW68mm','GaussRifle4mm','Blunderbuss8G',
                 'DoubleShotgun10G','PumpShotgun12G','AutoShotgun12G','SelfLoadingRifle762mm',
                 'ElectrolaserCarbine','LaserSniperRifle','LaserRifle','HeavyBlaster'];
Groups.guns = Groups.pistols.concat(Groups.rifles);

var u = null;       // use for undefined attributes here below

/* Basic Equipment                                 'name',               weight, cost, TL, LC, 'ref'   */
BasicEquipment = {};
// Camping and Survival Gear                       'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.backpackframe      = new Equipment( 'backpack',               10,  100,  1,  4, 'B288' );
BasicEquipment.backpackframe.detail = "frame";
BasicEquipment.backpackframe.notes = ['Holds 100 lbs. of gear.'],
BasicEquipment.backpacksmall      = new Equipment( 'backpack',                3,   60,  1,  4, 'B288' );
BasicEquipment.backpacksmall.detail = "small";
BasicEquipment.backpacksmall.notes = ['Holds 40 lbs. of gear.'];
BasicEquipment.blanket            = new Equipment( 'blanket',                 4,   20,  1,  4, 'B288' );
BasicEquipment.blanket.notes = ['A warm sleeping blanket.'];
BasicEquipment.ceramicbottle1qt   = new Equipment( 'bottle',                  1,    3,  1,  4, 'B288' );
BasicEquipment.ceramicbottle1qt.detail = "1 qt ceramic";
BasicEquipment.ceramicbottle1qt.notes = ['Holds 1 quart of liquid (2 lbs. if water).'];
BasicEquipment.steelcable         = new Equipment( 'cable',                 1.7,   10,  5,  4, 'B288' );
BasicEquipment.steelcable.detail = "1.5″ steel";
BasicEquipment.steelcable.notes = ['Supports 3,700 lbs.'],
BasicEquipment.steelcable.continuous = true;
BasicEquipment.steelcable.unit = 'yd';
BasicEquipment.steelcable.many = 8;
BasicEquipment.smcampstove        = new Equipment( 'stove',                   2,   50,  6,  4, 'B288' );
BasicEquipment.smcampstove.detail = "small camping";
BasicEquipment.smcampstove.notes = ['Uses 0.25 gallons kerosene per 4 hrs.'],
BasicEquipment.tallowcandle       = new Equipment( 'candle',                  1,    5,  1,  4, 'B288' );
BasicEquipment.tallowcandle.detail = "tallow";
BasicEquipment.tallowcandle.notes = ['Smoky! Lasts 12 hrs.'],
BasicEquipment.tallowcandle.many = 3;
BasicEquipment.canteen            = new Equipment( 'canteen',                 1,   10,  5,  4, 'B288' );
BasicEquipment.canteen.detail = "1 qt";
BasicEquipment.canteen.notes = ['Holds 1 quart of liquid (2 lbs. if water).'];
BasicEquipment.lighter            = new Equipment( 'lighter',                 0,   10,  6,  4, 'B288' );
BasicEquipment.lighter.detail = "cigarette";
BasicEquipment.lighter.notes = ['Lights fire.'],
BasicEquipment.climbinggear       = new Equipment( 'climbing gear',           4,   20,  2,  4, 'B288' );
BasicEquipment.climbinggear.notes = ['Hammer, spikes, carabiners.'],
BasicEquipment.climbinggear.unit = 'set';
BasicEquipment.compass            = new Equipment( 'compass',                 0,   50,  6,  4, 'B288' );
BasicEquipment.compass.notes = ['+1 to Navigation skill.'],
BasicEquipment.cord               = new Equipment( 'cord',                 0.05,  0.1,  1,  4, 'B288' );
BasicEquipment.cord.detail = "3/16″";
BasicEquipment.cord.notes = ['Supports 90 lbs.'],
BasicEquipment.cord.continuous = true;
BasicEquipment.cord.unit = 'yd';
BasicEquipment.cord.many = 10;
BasicEquipment.ropethin           = new Equipment( 'rope',                 0.15,  0.5,  0,  4, 'B288' );
BasicEquipment.ropethin.detail = "3/8″";
BasicEquipment.ropethin.notes = ['supports 300 lbs.'],
BasicEquipment.ropethin.continuous = true;
BasicEquipment.ropethin.unit = 'yd';
BasicEquipment.ropethin.many = 20;
BasicEquipment.ropethick          = new Equipment( 'rope',                  0.5,  2.5,  0,  4, 'B288' );
BasicEquipment.ropethick.detail = "3/4″";
BasicEquipment.ropethick.notes = ['supports 1,100 lbs.'],
BasicEquipment.ropethick.continuous = true;
BasicEquipment.ropethick.unit = 'yd';
BasicEquipment.ropethick.many = 10;
BasicEquipment.fishinggear        = new Equipment( 'fishhooks & line',        0,   50,  0,  4, 'B288' );
BasicEquipment.fishinggear.notes = ['Basic gear for Fishing skill; needs a pole.'],
BasicEquipment.fishinggear.unit = 'set';
BasicEquipment.flashlighthvy      = new Equipment( 'flashlight',              1,   20,  6,  4, 'B288' );
BasicEquipment.flashlighthvy.detail = "heavy";
BasicEquipment.flashlighthvy.notes = ["30' beam."],
BasicEquipment.flashlightmini     = new Equipment( 'flashlight',           0.25,   10,  7,  4, 'B288' );
BasicEquipment.flashlightmini.detail = "mini";
BasicEquipment.flashlightmini.notes = ["15' beam."],
BasicEquipment.gasoline           = new Equipment( 'gasoline',                6,  1.5,  6,  4, 'B288' );
BasicEquipment.gasoline.continuous = true;
BasicEquipment.gasoline.unit = 'gal';
BasicEquipment.gasoline.many = 2;
BasicEquipment.GPSreceiver        = new Equipment( 'GPS receiver',            3,  200,  8,  4, 'B288' );
BasicEquipment.GPSreceiver.notes = ['Satellite-updated; grants Absolute Direction (Requires Signal).'],
BasicEquipment.grapnel            = new Equipment( 'grapnel',                 2,   20,  5,  4, 'B288' );
BasicEquipment.grapnel.notes = ['Throw to ST×2 yards. Supports 300 lbs.'],
BasicEquipment.groupbasics        = new Equipment( 'group basics',           20,   50,  0,  4, 'B288' );
BasicEquipment.groupbasics.notes = ['Basic equipment for Cooking and Survival skill for a group. Cook pot, rope, hatchet, etc., for 3-8 campers.'],
BasicEquipment.groupbasics.unit = 'box';
BasicEquipment.piton              = new Equipment( 'spike/piton',           0.5,    1,  2,  4, 'B288' );
BasicEquipment.piton.detail = "iron";
BasicEquipment.piton.notes = ['For climbing, spiking doors, etc.'],
BasicEquipment.piton.many = 5;
BasicEquipment.kerosene           = new Equipment( 'kerosene',                6,  1.5,  6,  4, 'B288' );
BasicEquipment.kerosene.continuous = true;
BasicEquipment.kerosene.unit = 'gal';
BasicEquipment.kerosene.many = 2;
BasicEquipment.lantern            = new Equipment( 'lantern',                 2,   20,  2,  4, 'B288' );
BasicEquipment.lantern.notes = ['Burns for 24 hours on 1 pint of oil.'],
BasicEquipment.lantern.needs = 'lanternoil';
BasicEquipment.lifejacket         = new Equipment( 'life jacket',             6,  100,  6,  4, 'B288' );
BasicEquipment.lifejacket.notes = ['Floats up to 350 lbs.'],
BasicEquipment.matches            = new Equipment( 'matches',                 0,  1.5,  6,  4, 'B288' );
BasicEquipment.matches.notes = ['Start fires. Box of 50, waterproof.'],
BasicEquipment.matches.unit = 'box';
BasicEquipment.lanternoil         = new Equipment( 'oil',                     1,    2,  2,  4, 'B288' );
BasicEquipment.lanternoil.detail = "lantern";
BasicEquipment.lanternoil.notes = ['For lantern.'],
BasicEquipment.lanternoil.continuous = true;
BasicEquipment.lanternoil.unit = 'pt';
BasicEquipment.lanternoil.maxTL = 6;
BasicEquipment.lanternoil.many = 2;
BasicEquipment.parachute          = new Equipment( 'parachute',              30, 1000,  6,  4, 'B288' );
BasicEquipment.parachute.notes = ['Use with Parachuting skill. The wearer will fall at least 80 yards before it opens, and then descend at 5 yards/second.'],
BasicEquipment.personalbasics     = new Equipment( 'personal basics',         1,    5,  0,  4, 'B288' );
BasicEquipment.personalbasics.notes = ['Minimum gear for camping: -2 to any Survival roll without it. Includes utensils, tinderbox or flint and steel, towel, etc., as TL permits.'],
BasicEquipment.personalbasics.unit = 'set';
BasicEquipment.pole6ft            = new Equipment( 'pole',                    3,    5,  0,  4, 'B288' );
BasicEquipment.pole6ft.detail = "6′";
BasicEquipment.pole6ft.notes = ['For pitching tents, fishing, or prodding items.'],
BasicEquipment.pole10ft           = new Equipment( 'pole',                    5,    8,  0,  4, 'B288' );
BasicEquipment.pole10ft.detail = "10′";
BasicEquipment.pole10ft.notes = ["For things you wouldn't touch with a 6' pole."],
BasicEquipment.pole               = new Equipment( 'pole',                  0.5,  0.8,  0,  4, 'B288' );
BasicEquipment.pole.continuous = true;
BasicEquipment.pole.unit = 'ft';
BasicEquipment.pole.many = 8;
BasicEquipment.pouchsmall         = new Equipment( 'pouch/purse',             0,   10,  1,  4, 'B288' );
BasicEquipment.pouchsmall.detail = "small";
BasicEquipment.pouchsmall.notes = ['Holds 3 lbs.'];
BasicEquipment.pouchsmall.many = 3;
BasicEquipment.scubagear          = new Equipment( 'scuba gear',             32, 1500,  6,  4, 'B288' );
BasicEquipment.scubagear.notes = ['Basic equipment for Scuba skill: 2-hour underwater air tank, with regulator, facemask, etc.'];
BasicEquipment.scubagear.unit = 'rig';
BasicEquipment.sleepingbag        = new Equipment( 'sleeping bag',            7,   25,  6,  4, 'B288' );
BasicEquipment.sleepingbag.notes = ['For normal conditions.'];
BasicEquipment.inssleepingbag     = new Equipment( 'sleeping bag',           15,  100,  7,  4, 'B288' );
BasicEquipment.inssleepingbag.detail = "insulated";
BasicEquipment.inssleepingbag.notes = ['+3 HT to resist freezing.'];
BasicEquipment.sleepingfur        = new Equipment( 'sleeping fur',            8,   50,  0,  4, 'B288' );
BasicEquipment.sleepingfur.notes = ['Warm unless wet.'];
BasicEquipment.suitcase           = new Equipment( 'suitcase',                8,  250,  5,  4, 'B288' );
BasicEquipment.suitcase.detail = "hard";
BasicEquipment.suitcase.notes = ['Holds 100 lbs. DR 4, with key lock.'];
BasicEquipment.tent1man           = new Equipment( 'tent',                    5,   50,  0,  4, 'B288' );
BasicEquipment.tent1man.detail = "1-person";
BasicEquipment.tent1man.notes = ['Includes ropes; no poles needed'];
BasicEquipment.tent2man           = new Equipment( 'tent',                   12,   80,  0,  4, 'B288' );
BasicEquipment.tent2man.detail = "2-person";
BasicEquipment.tent2man.notes = ['Includes ropes; requires one 6-foot pole.'];
BasicEquipment.tent4man           = new Equipment( 'tent',                   30,  150,  0,  4, 'B288' );
BasicEquipment.tent4man.detail = "4-person";
BasicEquipment.tent4man.notes = ['Includes ropes; requires 2 poles.'];
BasicEquipment.tent20man          = new Equipment( 'tent',                  100,  300,  1,  4, 'B288' );
BasicEquipment.tent20man.detail = "20-person";
BasicEquipment.tent20man.notes = ['Includes ropes; requires 16 poles.'];
BasicEquipment.thermos            = new Equipment( 'bottle',                  2,   10,  5,  4, 'B288' );
BasicEquipment.thermos.detail = "thermos";
BasicEquipment.thermos.notes = ['Keeps 1 pint hot (24 hrs.) or cold (72 hrs.).'];
BasicEquipment.torch              = new Equipment( 'torch',                   1,    3,  0,  4, 'B288' );
BasicEquipment.torch.notes = ['Burns for 1 hr.'],
BasicEquipment.torch.many = 4;
BasicEquipment.torch.maxTL = 5;
BasicEquipment.rations            = new Equipment( 'ration',                0.5,    2,  0,  4, 'B288' );
BasicEquipment.rations.detail = "traveler’s";
BasicEquipment.rations.notes = ['One meal of dried meat, cheese, etc.'],
BasicEquipment.rations.many = 7;
BasicEquipment.H2Opurtablets      = new Equipment( 'tablets',                 0,    5,  6,  4, 'B288' );
BasicEquipment.H2Opurtablets.detail = "water purification";
BasicEquipment.H2Opurtablets.notes = ['Bottle of 50. Purify 1 quart each.'],
BasicEquipment.H2Opurtablets.unit = 'bottle';
BasicEquipment.wineskin1gal       = new Equipment( 'wineskin',             0.25,   10,  0,  4, 'B288' );
BasicEquipment.wineskin1gal.detail = "1 gal";
BasicEquipment.wineskin1gal.notes = ['Holds 1 gallon of liquid (8 lbs. if water).'];
BasicEquipment.wineskin1galfull   = new Equipment( 'wineskin',                8,   10,  0,  4, 'B288' );
BasicEquipment.wineskin1galfull.detail = "1 gal (full)";
BasicEquipment.wristwatch         = new Equipment( 'wristwatch',               0,  20,  6,  4, 'B288' );
Groups.campinggear = ['backpackframe','backpacksmall','blanket','ceramicbottle1qt','steelcable',
                      'smcampstove','tallowcandle','canteen','lighter','climbinggear','compass',
                      'cord','ropethin','ropethick','fishinggear','flashlighthvy','flashlightmini',
                      'gasoline','GPSreceiver','grapnel','groupbasics','piton','kerosene','lantern',
                      'lifejacket','matches','lanternoil','parachute','personalbasics','pole6ft','pole10ft',
                      'pouchsmall','scubagear','sleepingbag','inssleepingbag','sleepingfur',
                      'suitcase','tent1man','tent2man','tent4man','tent20man','thermos','torch',
                      'rations','H2Opurtablets','wineskin1gal','wineskin1galfull','wristwatch'];
// Communications and Information Gear             'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.battery            = new Equipment( 'battery',                 0,    1,  6,  4, 'B288' );
BasicEquipment.battery.many = 4;
BasicEquipment.cellphone          = new Equipment( 'cell phone',           0.25,  250,  8,  4, 'B288' );
BasicEquipment.cellphone.notes = ['Only works in some areas; $20/month fee.'],
BasicEquipment.laptopcomp         = new Equipment( 'computer',                3, 1500,  8,  4, 'B288' );
BasicEquipment.laptopcomp.detail = "laptop";
BasicEquipment.laptopcomp.notes = ['Modem plugs into phone.'],
BasicEquipment.wearablecomp       = new Equipment( 'computer',                2, 1000,  8,  4, 'B288' );
BasicEquipment.wearablecomp.detail = "wearable";
BasicEquipment.wearablecomp.notes = ['Display glasses and wireless modem.'],
BasicEquipment.drum               = new Equipment( 'drum',                   40,    2,  0,  4, 'B288' );
BasicEquipment.drum.notes = ['Audible for several miles.'],
BasicEquipment.minirecorder       = new Equipment( 'minirecorder',          0.5,  200,  7,  4, 'B288' );
BasicEquipment.minirecorder.notes = ['Palm-sized, with 3-hour tape (extra tapes are $5).'],
BasicEquipment.digitalrecorder    = new Equipment( 'minirecorder',          0.5,   30,  8,  4, 'B288' );
BasicEquipment.digitalrecorder.detail = "digital";
BasicEquipment.digitalrecorder.notes = ['Palm-sized, with 3-hour tape (extra tapes are $5).'],
BasicEquipment.backpackradio      = new Equipment( 'radio',                  15, 6000,  7,  4, 'B288' );
BasicEquipment.backpackradio.detail = "backpack";
BasicEquipment.backpackradio.notes = ['VHF radio. 20-mile range.'],
BasicEquipment.handradio          = new Equipment( 'radio',                   1,  100,  7,  4, 'B288' );
BasicEquipment.handradio.detail = "hand";
BasicEquipment.handradio.notes = ['Classic "walkie-talkie." 2-mile range.'],
BasicEquipment.headsetradio       = new Equipment( 'radio',                 0.5,  500,  8,  4, 'B288' );
BasicEquipment.headsetradio.detail = "headset";
BasicEquipment.headsetradio.notes = ['With throat mike. 1-mile range. Multiply cost by 10 for secure, encrypted version.'],
BasicEquipment.satellitephone     = new Equipment( 'phone',                   3, 3000,  8,  4, 'B288' );
BasicEquipment.satellitephone.detail = "satellite";
BasicEquipment.satellitephone.notes = ['Global range, satellite relay.'],
BasicEquipment.scribeskit         = new Equipment( 'scribe’s kit',      2,   50,  3,  4, 'B288' );
BasicEquipment.scribeskit.notes = ['Quills, inkbottles, penknife, paper.'],
BasicEquipment.transradio         = new Equipment( 'radio',                 0.5,   15,  7,  4, 'B288' );
BasicEquipment.transradio.detail = "transistor";
BasicEquipment.transradio.notes = ['Receive-only; picks up radio stations.'],
BasicEquipment.transradio.needs = 'battery';
BasicEquipment.miniTV             = new Equipment( 'TV',                      3,  150,  7,  4, 'B288' );
BasicEquipment.miniTV.detail = "mini";
BasicEquipment.miniTV.notes = ['5" × 5" flat-screen.'],
BasicEquipment.typewriter         = new Equipment( 'typewriter',             10,  200,  6,  4, 'B289' );
BasicEquipment.typewriter.maxTL = 7;
BasicEquipment.waxtablet          = new Equipment( 'wax tablet',              2,   10,  1,  4, 'B289' );
BasicEquipment.waxtablet.notes = ['For writing; erasable.'],
BasicEquipment.waxtablet.many = 2;
BasicEquipment.waxtablet.maxTL = 4;
Groups.commgear = ['battery','cellphone','laptopcomp','wearablecomp','drum','minirecorder',
                   'digitalrecorder','backpackradio','handradio','headsetradio','satellitephone',
                   'scribeskit','transradio','miniTV','typewriter','waxtablet'];
// Equestrian Gear                                 'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.bitbridle          = new Equipment( 'bit & bridle',            3,   35,  1,  4, 'B289' );
BasicEquipment.bitbridle.notes = ['+2 to control horse, or +3 if using both hands.'],
BasicEquipment.horseshoes         = new Equipment( 'horseshoes',              4,   50,  3,  4, 'B289' );
BasicEquipment.horseshoes.unit = 'set';
BasicEquipment.horseshoes.notes = ['Shod horses get +2 HT on any rolls for stamina on long rides.'],
BasicEquipment.saddletack         = new Equipment( 'saddle & tack',          15,  150,  2,  4, 'B289' );
BasicEquipment.saddletack.notes = ['Basic equipment for Riding skill.'],
BasicEquipment.saddlebags         = new Equipment( 'saddlebags',              3,  100,  1,  4, 'B289' );
BasicEquipment.saddlebags.notes = ['Hold 40 lbs.'];
BasicEquipment.saddlebags.unit = 'pair';
BasicEquipment.spurs              = new Equipment( 'spurs',                   0,   25,  2,  4, 'B289' );
BasicEquipment.spurs.notes = ['+1 to control a mount.'];
BasicEquipment.spurs.unit = 'pair';
BasicEquipment.saddlestirrups     = new Equipment( 'saddle',                 20,  125,  3,  4, 'B289' );
BasicEquipment.saddlestirrups.description = ' w/ stirrups';
BasicEquipment.saddlestirrups.notes = ['Make it easy to mount a horse and give +1 to control mount. Required to use Lance skill.'];
BasicEquipment.warsaddle          = new Equipment( 'war saddle',             35,  250,  3,  4, 'B289' );
BasicEquipment.warsaddle.notes = ['+1 to Riding skill to stay seated, 50% chance user will stay seated even if unconscious.'];
Groups.equestriangear = ['bitbridle','saddletack','saddlebags','spurs','saddlestirrups','warsaddle'];
// Law-Enforcement, Thief, and Spy Gear            'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.audiobug           = new Equipment( 'bug',                     0,  200,  7,  4, 'B289' );
BasicEquipment.audiobug.detail = "audio";
BasicEquipment.audiobug.notes = ['-7 to spot, 1/4-mile range, transmits for 1 week.'];
BasicEquipment.audiobug.many = 2;
BasicEquipment.bugstomper         = new Equipment( 'bug stomper',             2, 1200,  7,  3, 'B289' );
BasicEquipment.bugstomper.notes = ['Jams bugs in a 10-yard radius.'];
BasicEquipment.disguisekit        = new Equipment( 'disguise kit',           10,  200,  5,  4, 'B289' );
BasicEquipment.disguisekit.notes = ['+1 to Disguise skill.'];
BasicEquipment.elockpicks         = new Equipment( 'electronic lockpicks',    3, 1500,  7,  3, 'B289' );
BasicEquipment.elockpicks.notes = ['+2 to pick electronic locks.'];
BasicEquipment.elockpicks.unit = 'set';
BasicEquipment.handcuffs          = new Equipment( 'handcuffs',             0.5,   40,  5,  4, 'B289' );
BasicEquipment.handcuffs.notes = ['Give -5 to Escape.'];
BasicEquipment.handcuffs.unit = 'pair';
BasicEquipment.homingbeacon       = new Equipment( 'homing beacon',           0,   40,  7,  4, 'B289' );
BasicEquipment.homingbeacon.notes = ['Scanner tracks at 1-mile range.'];
BasicEquipment.lasermic           = new Equipment( 'laser microphone',        2,  500,  8,  3, 'B289' );
BasicEquipment.lasermic.notes = ['Eavesdrop through glass. 300-yd. range.'];
BasicEquipment.lockpicks          = new Equipment( 'lockpicks',               0,   50,  3,  4, 'B289' );
BasicEquipment.lockpicks.notes = ['Basic equipment for Lockpicking skill.'];
BasicEquipment.lockpicks.unit = 'set';
BasicEquipment.nanobug            = new Equipment( 'nanobug',                 0,  100,  8,  3, 'B289' );
BasicEquipment.nanobug.notes = ['Pinhead-sized audio-visual bug (-10 to spot).'];
BasicEquipment.shotgunmic         = new Equipment( 'microphone',              2,  250,  6,  4, 'B289' );
BasicEquipment.shotgunmic.detail = "shotgun";
BasicEquipment.shotgunmic.notes = ['Gives (TL-5) levels of Parabolic Hearing.'];
Groups.enforcementgear = ['audiobug','bugstomper','disguisekit','elockpicks','handcuffs',
                          'homingbeacon','lasermic','lockpicks','nanobug','shotgunmic'];
// Medical Gear                                    'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.antibiotics        = new Equipment( 'antibiotics',             0,   20,  6,  3, 'B289' );
BasicEquipment.antibiotics.notes = ['Prevents or cures (in 1d days) infections.'];
BasicEquipment.antibiotics.unit = 'course';
BasicEquipment.antitoxinkit       = new Equipment( 'antitoxin kit',         0.5,   25,  6,  4, 'B289' );
BasicEquipment.antitoxinkit.notes = ['Antidote for specific poison. 10 uses.'];
BasicEquipment.bandages           = new Equipment( 'bandages',                2,   10,  3,  4, 'B289' );
BasicEquipment.bandages.notes = ['Bandages for a half-dozen wounds. Might be clean cloth, adhesive dressings, or spray-on "plastiskin," depending on TL. Basic equipment for First Aid skill.'];
BasicEquipment.bandages.unit = 'set';
BasicEquipment.crashkit           = new Equipment( 'crash kit',              10,  200,  3,  4, 'B289' );
BasicEquipment.crashkit.notes = ['A complete kit for treating serious injuries. Includes sterile bandages, sutures, and drugs appropriate for the TL. At TL6+, includes IV drip, needle, and plasma. +2 to First Aid skill, and counts as improvised gear (-5) for Surgery.'];
BasicEquipment.firstaidkit        = new Equipment( 'first-aid kit',           2,   50,  1,  4, 'B289' );
BasicEquipment.firstaidkit.notes = ['A complete kit for treating wounds, with bandages, ointments, etc. +1 to First Aid skill.'];
BasicEquipment.surgicalinst       = new Equipment( 'surgical instruments',   15,  300,  3,  4, 'B289' );
BasicEquipment.surgicalinst.notes = ['Includes scalpels, forceps, etc. Basic equipment for Surgery skill.'];
BasicEquipment.surgicalinst.unit = 'set';
Groups.medicalgear = ['antibiotics','antitoxinkit','bandages','crashkit','firstaidkit','surgicalinst'];
// Optics and Sensors                              'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.binoculars         = new Equipment( 'binoculars',              2,  400,  6,  4, 'B289' );
BasicEquipment.binoculars.notes = ['Gives (TL-4) levels of Telescopic Vision.'];
BasicEquipment.binoculars.unit = 'pair';
BasicEquipment.camcorder          = new Equipment( 'camcorder',               1, 1000,  8,  4, 'B289' );
BasicEquipment.camcorder.notes = ['Has 10× zoom. Gives Night Vision 5.'];
BasicEquipment.camcorder.needs = 'battery';
BasicEquipment.camera35mm         = new Equipment( 'camera',                  3,   50,  6,  4, 'B289' );
BasicEquipment.camera35mm.detail = "35mm";
BasicEquipment.camera35mm.notes = ['Basic equipment for Photography skill. Extra film is 32 shots ($10, neg.). Better cameras cost much more!'];
BasicEquipment.metaldetectorwand  = new Equipment( 'metal detector wand',     1,   50,  7,  4, 'B289' );
BasicEquipment.metaldetectorwand.notes = ['+3 to find metal items.'];
BasicEquipment.metaldetectorwand.needs = 'battery';
BasicEquipment.digitalminicam     = new Equipment( 'minicam',                 0,  500,  8,  4, 'B289' );
BasicEquipment.digitalminicam.detail = "digital";
BasicEquipment.digitalminicam.notes = ['Stores pictures on optical disk.'];
BasicEquipment.nightvisiongoggles = new Equipment( 'night vision goggles',    2,  600,  8,  4, 'B289' );
BasicEquipment.nightvisiongoggles.notes = ['Give Night Vision 9.'];
BasicEquipment.nightvisiongoggles.needs = 'battery';
BasicEquipment.nightvisiongoggles.unit = 'pair';
BasicEquipment.spycamera          = new Equipment( 'camera',                  3,  500,  6,  4, 'B289' );
BasicEquipment.spycamera.detail = "spy";
BasicEquipment.spycamera.notes = ['Holds 36 exposures, uses microfilm.'];
BasicEquipment.telescope          = new Equipment( 'telescope',               6,  500,  4,  4, 'B289' );
BasicEquipment.telescope.notes = ['Gives (TL-3) levels of Telescopic Vision.'];
Groups.sensorsgear = ['binoculars','camcorder','camera35mm','metaldetectorwand','digitalminicam',
                      'nightvisiongoggles','spycamera','telescope'];
// Tools                                           'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.balanceweights     = new Equipment( 'balance & weights',       3,   35,  1,  4, 'B289' );
BasicEquipment.balanceweights.notes = ['For weighing goods.'];
BasicEquipment.balanceweights.unit = 'set';
BasicEquipment.crowbar            = new Equipment( 'crowbar',                 3,   20,  2,  4, 'B289' );
BasicEquipment.crowbar.notes = ['Treat as a small mace in combat, but at -1 to skill.'];
BasicEquipment.cuttingtorch       = new Equipment( 'cutting torch',          30,  500,  6,  4, 'B289' );
BasicEquipment.cuttingtorch.notes = ['1d+3(2) burn per second. Each gas bottle gives 30 seconds of cutting.'];
BasicEquipment.bottledgas        = new Equipment( 'gas',                     15,   50,  6,  4, 'B289' );
BasicEquipment.bottledgas.detail = "bottled";
BasicEquipment.bottledgas.unit = 'bottle';
BasicEquipment.bottledgas.notes = ['for cutting torch'],
BasicEquipment.knittingneedles    = new Equipment( 'knitting needles',        0,    5,  3,  4, 'B289' );
BasicEquipment.knittingneedles.notes = ['Per pair.'];
BasicEquipment.knittingneedles.unit = 'pair';
BasicEquipment.pickaxe            = new Equipment( 'pickaxe',                 8,   15,  2,  4, 'B289' );
BasicEquipment.pickaxe.notes = ['Improves digging speed.'];
BasicEquipment.ironplow           = new Equipment( 'plow',                  120,  220,  2,  4, 'B289' );
BasicEquipment.ironplow.detail = "iron";
BasicEquipment.ironplow.notes = ['Works rough soils.'];
BasicEquipment.ironplow.maxTL = 6;
BasicEquipment.woodenplow         = new Equipment( 'plow',                   60,   55,  1,  4, 'B289' );
BasicEquipment.woodenplow.detail = "wooden";
BasicEquipment.woodenplow.notes = ['Pulled by oxen.'];
BasicEquipment.woodenplow.maxTL = 4;
BasicEquipment.toolkitCarpentry   = new Equipment( 'toolkit',                20,  300,  1,  4, 'B289' );
BasicEquipment.toolkitCarpentry.detail = "Carpentry";
BasicEquipment.toolkitCarpentry.notes = ['Basic equipment for the Carpentry skill.'];
BasicEquipment.toolkitArmoury     = new Equipment( 'toolkit',                20,  600,  1,  4, 'B289' );
BasicEquipment.toolkitArmoury.detail = "Armoury";
BasicEquipment.toolkitArmoury.notes = ['Basic equipment for the Armoury skill.'];
BasicEquipment.toolkitExplosives  = new Equipment( 'toolkit',                20,  600,  5,  4, 'B289' );
BasicEquipment.toolkitExplosives.detail = "Explosives";
BasicEquipment.toolkitExplosives.notes = ['Basic equipment for the Explosives skill.'];
BasicEquipment.toolkitMachinist   = new Equipment( 'toolkit',                20,  600,  5,  4, 'B289' );
BasicEquipment.toolkitMachinist.detail = "Machinist";
BasicEquipment.toolkitMachinist.notes = ['Basic equipment for the Machinist skill.'];
BasicEquipment.toolkitMechanic    = new Equipment( 'toolkit',                20,  600,  5,  4, 'B289' );
BasicEquipment.toolkitMechanic.detail = "Mechanic";
BasicEquipment.toolkitMechanic.notes = ['Basic equipment for the Mechanic skill.'];
BasicEquipment.toolkitElectrician = new Equipment( 'toolkit',                20,  600,  6,  4, 'B289' );
BasicEquipment.toolkitElectrician.detail = "Electrician";
BasicEquipment.toolkitElectrician.notes = ['Basic equipment for the Electrician skill.'];
BasicEquipment.toolkitElecRepair  = new Equipment( 'toolkit',                10, 1200,  6,  4, 'B289' );
BasicEquipment.toolkitElecRepair.detail = "Electronics Repair";
BasicEquipment.toolkitElecRepair.notes = ['Basic equipment for the Electronics Repair skill.'];
BasicEquipment.saw                = new Equipment( 'saw',                     3,  150,  0,  4, 'B289' );
BasicEquipment.saw.detail = "tree";
BasicEquipment.saw.notes = ["A lumberjack's tool, not a carpentry saw."];
BasicEquipment.shovel             = new Equipment( 'shovel',                  6,   12,  1,  4, 'B289' );
BasicEquipment.shovel.notes = ['Speeds up digging.'];
BasicEquipment.spinningwheel      = new Equipment( 'spinning wheel',         40,  100,  3,  4, 'B289' );
BasicEquipment.spinningwheel.notes = ['Produces yarn six times as fast.'];
BasicEquipment.spinningwheel.maxTL = 5;
BasicEquipment.suitcaselab        = new Equipment( 'suitcase lab',           10, 3000,  3,  4, 'B289' );
BasicEquipment.suitcaselab.notes = ['Basic equipment for a specific scientific skill (e.g., Chemistry or Forensics).'];
BasicEquipment.suitcaselab.description = 'skillname';
BasicEquipment.wheelbarrow        = new Equipment( 'wheelbarrow',            18,   60,  2,  4, 'B289' );
BasicEquipment.wheelbarrow.notes = ['Holds 350 lbs. Divide effective weight of load by 5.'];
BasicEquipment.whetstone          = new Equipment( 'whetstone',               1,    5,  1,  4, 'B289' );
BasicEquipment.whetstone.notes = ['For sharpening tools and weapons.'];
BasicEquipment.whetstone.goeswith = Groups.edged;
Groups.tools = ['balanceweights','crowbar','cuttingtorch','knittingneedles','pickaxe','ironplow',
                'woodenplow','toolkitCarpentry','toolkitArmoury','toolkitExplosives',
                'toolkitMachinist','toolkitMechanic','toolkitElectrician','toolkitElecRepair','saw',
                'shovel','spinningwheel','suitcaselab','wheelbarrow','whetstone'];
// Weapon and  Accessories                         'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.goatsfoot          = new Equipment( "goat's foot",             2,   50,  3,  4, 'B276' );
BasicEquipment.goatsfoot.notes = ['Cocking lever to reload a high-ST crossbow or prodd. You can reload a weapon up to 4 ST over your own with 20 one-second Ready maneuvers.'];
BasicEquipment.goatsfoot.goeswith = ['Crossbow'];
BasicEquipment.goatsfoot.maxTL = 5;
BasicEquipment.leatherlanyard     = new Equipment( 'lanyard',                 0,    1,  0,  4, 'B289' );
BasicEquipment.leatherlanyard.detail = "leather";
BasicEquipment.leatherlanyard.notes = ['Lets you retrieve a dropped weapon on a DX roll. Each attempt requires a Ready maneuver. Can be cut: -6 to hit, DR 2, HP 2.'];
BasicEquipment.shoulderholster    = new Equipment( 'holster',                 1,   50,  5,  4, 'B289' );
BasicEquipment.shoulderholster.detail = "shoulder";
BasicEquipment.shoulderholster.notes = ['Allows use of Holdout, but gives -1 to Fast-Draw.'];
BasicEquipment.shoulderholster.goeswith = Groups.pistols;
BasicEquipment.beltholster        = new Equipment( 'holster',               0.5,   25,  5,  4, 'B289' );
BasicEquipment.beltholster.detail = "belt";
BasicEquipment.beltholster.notes = ['Fits most pistols.'];
BasicEquipment.beltholster.goeswith = Groups.pistols;
BasicEquipment.earmuffs           = new Equipment( 'ear muffs',               1,  200,  6,  4, 'B289' );
BasicEquipment.earmuffs.notes = ['Block loud noises (e.g., gunshots). Give Protected Hearing.'];
BasicEquipment.earmuffs.unit = 'pair';
BasicEquipment.steellanyard       = new Equipment( 'lanyard',                 0,   15,  6,  4, 'B289' );
BasicEquipment.steellanyard.detail = "woven steel";
BasicEquipment.steellanyard.notes = ['As leather lanyard, but DR 6, HP 4.'];
BasicEquipment.lasersight         = new Equipment( 'laser sight',             0,  100,  8,  4, 'B289' );
BasicEquipment.lasersight.notes = ['+1 to skill; see Laser Sights (p. 412).'];
BasicEquipment.lasersight.goeswith = Groups.guns;
BasicEquipment.scope4x            = new Equipment( 'scope',                 1.5,  150,  6,  4, 'B289' );
BasicEquipment.scope4x.detail = "4x";
BasicEquipment.scope4x.notes = ['+2 to Acc for aimed shots only.'];
BasicEquipment.scope4x.goeswith = Groups.rifles;
BasicEquipment.scope4xthermal     = new Equipment( 'scope',                   4, 8000,  6,  4, 'B289' );
BasicEquipment.scope4xthermal.detail = "4x thermal imaging";
BasicEquipment.scope4xthermal.notes = ['+2 to Acc for aimed shots only; gives the user Infravision.'];
BasicEquipment.scope4xthermal.goeswith = Groups.rifles;
BasicEquipment.hipquiver          = new Equipment( 'quiver',                  1,   15,  0,  4, 'B289' );
BasicEquipment.hipquiver.detail = "hip";
BasicEquipment.hipquiver.notes = ['Holds 20 arrows or bolts.'];
BasicEquipment.hipquiver.goeswith = Groups.bows;
BasicEquipment.shoulderquiver     = new Equipment( 'quiver',                0.5,   10,  0,  4, 'B289' );
BasicEquipment.shoulderquiver.detail = "shoulder";
BasicEquipment.shoulderquiver.notes = ['Holds 12 arrows or bolts.'];
BasicEquipment.shoulderquiver.goeswith = Groups.bows;
BasicEquipment.silencer           = new Equipment( 'silencer',                1,  400,  6,  3, 'B289' );
BasicEquipment.silencer.notes = ['Reduces damage by -1 per die; see Silencers (p. 412).'];
BasicEquipment.silencer.goeswith = Groups.guns;
BasicEquipment.webgear            = new Equipment( 'web gear',                2,   50,  6,  4, 'B289' );
BasicEquipment.webgear.description = 'climbing';
BasicEquipment.webgear.notes = ['Belt and suspenders with pouches and rings for gear.'];
BasicEquipment.webgear.unit = 'set';
Groups.weapongear = ['goatsfoot','hipquiver','leatherlanyard','shoulderholster','beltholster',
                     'earmuffs','steellanyard','lasersight','scope4x','scope4xthermal',
                     'shoulderquiver','silencer','webgear'];
// ammo                                            'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.blowpipedart       = new Equipment( 'dart',                 0.05,  0.1,  0,  4, 'B276' );
BasicEquipment.blowpipedart.detail = "blowpipe";
BasicEquipment.blowpipedart.goeswith = ["Blowpipe"];
BasicEquipment.blowpipedart.many = 5;
BasicEquipment.leadpellet         = new Equipment( 'pellet',               0.05,  0.1,  0,  4, 'B276' );
BasicEquipment.leadpellet.detail = "lead";
BasicEquipment.leadpellet.goeswith = ["Prodd","Sling"];
BasicEquipment.leadpellet.many = 30;
BasicEquipment.arrow              = new Equipment( 'arrow',                 0.1,    2,  0,  4, 'B276' );
BasicEquipment.arrow.goeswith = Groups.bows;
BasicEquipment.arrow.many = 12;
BasicEquipment.arrowbodkin        = new Equipment( 'arrow',                 0.1,    2,  3,  4, 'B277' );
BasicEquipment.arrowbodkin.detail = "bodkin point";
BasicEquipment.arrowbodkin.goeswith = Groups.bows;
BasicEquipment.arrowbodkin.many = 12;
BasicEquipment.crossbowbolt       = new Equipment( 'crossbow bolt',        0.06,    2,  0,  4, 'B276' );
BasicEquipment.crossbowbolt.goeswith = Groups.crossbows;
BasicEquipment.crossbowbolt.many = 12;
BasicEquipment.crossbowboltbodkin = new Equipment( 'crossbow bolt',        0.06,    2,  3,  4, 'B277' );
BasicEquipment.crossbowboltbodkin.detail = "bodkin point";
BasicEquipment.crossbowboltbodkin.goeswith = Groups.crossbows;
BasicEquipment.crossbowboltbodkin.many = 12;
BasicEquipment.atlatldart         = new Equipment( 'dart',                 0.05,  0.1,  0,  4, 'B276' );
BasicEquipment.atlatldart.detail = "atlatl";
BasicEquipment.atlatldart.goeswith = ["Atlatl"];
BasicEquipment.atlatldart.many = 5;
Groups.ammo = ['blowpipedart','arrow','crossbowbolt','arrowbodkin','crossbowboltbodkin','atlatldart'];
// vehicles                                        'name',                   wt,    $, TL, LC, 'ref'
BasicEquipment.dogsled            = new Equipment( 'dogsled',               300,  400,  0,  4, 'B464' );
BasicEquipment.dogsled.notes = ['carries up to 280 lbs., including operator','requires team of 14 dogs','carries a single rider/operator'];
BasicEquipment.chariot            = new Equipment( 'chariot',               180,  330,  1,  4, 'B464' );
BasicEquipment.chariot.notes = ['carries up to 400 lbs., including operator','requires team of 2 horses','can carry one passenger'];
BasicEquipment.wagon              = new Equipment( 'wagon',                 680,  680,  3,  6, 'B464' );
BasicEquipment.wagon.notes = ['carries up to 1000 lbs., including operator','requires team of 2 horses','can carry three passengers'];
BasicEquipment.coach              = new Equipment( 'coach',                2400,11000,  4,  6, 'B464' );
BasicEquipment.coach.notes = ['carries up to 2400 lbs., including operator','requires team of 4 horses','can carry three passengers'];
BasicEquipment.canoe              = new Equipment( 'canoe',                 200,  200,  0,  6, 'B464' );
BasicEquipment.canoe.notes = ['carries up to 400 lbs., including operator'];
// so far not including powered vehicles (Teamster and Boating skills only)
Groups.vehicles = ['dogsled','chariot','wagon','coach','canoe'];

//BasicEquipment.label              = new Equipment( '', , , );

/* experimental multi-class item */
// BasicEquipment.SaberBasketHilt    = new Weapon( 'Saber',                      2,  700,  4,  4,   -4, 'blade' );
// BasicEquipment.SaberBasketHilt.detail = "basket-hilt";
// BasicEquipment.SaberBasketHilt.PDB= 1;
// BasicEquipment.SaberBasketHilt.DR = 4;
// BasicEquipment.SaberBasketHilt.HP = 20;
// BasicEquipment.SaberBasketHilt.wieldOptions = { Saber      : [ { title: 'swung',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods: -1, type: 'cut' }, note: ["Fencing weapon (see Campaigns, pg. 404)"] },
//                                                                { title: 'thrust',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  1, type: 'imp' }, note: ["Fencing weapon (see Campaigns, pg. 404)"] } ] };


for ( var e in BasicEquipment ) {
    if( !BasicEquipment[e].hasOwnProperty('key') ) BasicEquipment[e].key = e;
}
Groups.Equipment = Object.keys(BasicEquipment);


/* Shields                             'name', weight, cost, TL, LC, PDB, DR, pen,  HP, Skill,           ref  */
ShieldItems = {};
ShieldItems.LightCloak   = new Shield( 'cloak',     2,   20,  1,  4,   1,  1,   u,   3, 'Cloak',         'B287' );   ShieldItems.LightCloak.detail = 'light';
ShieldItems.HeavyCloak   = new Shield( 'cloak',     5,   50,  1,  4,   2,  1,   u,   5, 'Cloak',         'B287' );   ShieldItems.HeavyCloak.detail = 'heavy';
ShieldItems.LightShield  = new Shield( 'shield',    2,   25,  0,  4,   1,  5,   u,  20, 'Shield_Shield', 'B287' );   ShieldItems.LightShield.detail = 'light';
ShieldItems.SmallShield  = new Shield( 'shield',    8,   40,  0,  4,   1,  6,   u,  30, 'Shield_Shield', 'B287' );   ShieldItems.SmallShield.detail = 'small';
ShieldItems.MediumShield = new Shield( 'shield',   15,   60,  1,  4,   2,  7,   u,  40, 'Shield_Shield', 'B287' );   ShieldItems.MediumShield.detail = 'medium';
ShieldItems.LargeShield  = new Shield( 'shield',   25,   90,  1,  4,   3,  9,   u,  60, 'Shield_Shield', 'B287' );   ShieldItems.LargeShield.detail = 'large';
ShieldItems.ForceShield  = new Shield( 'shield',  0.5, 1500, 11,  3,   3,100,   u, '-', 'Shield_Force',  'B287' );   ShieldItems.ForceShield.detail = 'force';
// The pen attribute will be calculated (DR+(HP/4)), probably by a 'get' function

for ( var s in ShieldItems ) {
    if( !ShieldItems[s].hasOwnProperty('key') ) ShieldItems[s].key = s;
}
Groups.Shields = Object.keys(ShieldItems);

Groups.ShieldsGURPSLite = ['SmallShield','MediumShield','LargeShield'];


/* Armor                                    'name',                      wt, cost, TL, LC, DR, PD, location*, ref */
ArmorItems = {};

// clothing
ArmorItems.ClothingStatus_2  = new Armor( 'clothing',                     2,   20,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus_2.detail = 'status -2';
ArmorItems.ClothingStatus_2.unit = 'outfit';
ArmorItems.ClothingStatus_1  = new Armor( 'clothing',                     2,   60,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus_1.detail = 'status -1';
ArmorItems.ClothingStatus_1.unit = 'outfit';
ArmorItems.ClothingStatus0   = new Armor( 'clothing',                     2,  120,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus0.unit = 'outfit';
ArmorItems.ClothingStatus1   = new Armor( 'clothing',                     2,  240,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus1.detail = 'status 1';
ArmorItems.ClothingStatus1.unit = 'outfit';
ArmorItems.ClothingStatus2   = new Armor( 'clothing',                     2,  600,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus2.detail = 'status 2';
ArmorItems.ClothingStatus2.unit = 'outfit';
ArmorItems.ClothingStatus3   = new Armor( 'clothing',                     2, 2400,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus3.detail = 'status 3';
ArmorItems.ClothingStatus3.unit = 'outfit';
ArmorItems.ClothingStatus4   = new Armor( 'clothing',                     2,12000,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus4.detail = 'status 4';
ArmorItems.ClothingStatus4.unit = 'outfit';
ArmorItems.ClothingStatus5   = new Armor( 'clothing',                    2,120000,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus5.detail = 'status 5';
ArmorItems.ClothingStatus5.unit = 'outfit';
ArmorItems.ClothingStatus6   = new Armor( 'clothing',                   2,1200000,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus6.detail = 'status 6';
ArmorItems.ClothingStatus6.unit = 'outfit';
ArmorItems.ClothingStatus7   = new Armor( 'clothing',                  2,12000000,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus7.detail = 'status 7';
ArmorItems.ClothingStatus7.unit = 'outfit';
ArmorItems.ClothingStatus8   = new Armor( 'clothing',                 2,120000000,  0,  6,  0,  0, suitParts, 'B266' );
ArmorItems.ClothingStatus8.detail = 'status 8';
ArmorItems.ClothingStatus8.unit = 'outfit';

ArmorItems.FurLoincloth        = new Armor( 'fur loincloth',              0,   10,  0,  4,  1,  u, ['groin'], 'B283' );
ArmorItems.FurLoincloth.flexible = true;
ArmorItems.FurLoincloth.layerable = true;
ArmorItems.FurTunic            = new Armor( 'fur tunic',                  2,   25,  0,  4,  1,  u, ['torso','waist'], 'B283' );
ArmorItems.FurTunic.flexible = true;
ArmorItems.FurTunic.layerable = true;

ArmorItems.ClothArmorSuit      = new Armor( 'cloth armor - suit',        14,  180,  1,  4,  1,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.ClothArmorSuit.flexible = true;
ArmorItems.ClothArmorSuit.layerable = true;
ArmorItems.ClothArmorSuit.maxTL = 4;
ArmorItems.ClothCap            = new Armor( 'cloth cap',                  0,    5,  1,  4,  1,  u, ['skull'], 'B284' );
ArmorItems.ClothCap.flexible = true;
ArmorItems.ClothCap.layerable = true;
ArmorItems.ClothArmor          = new Armor( 'cloth armor',                6,   30,  1,  4,  1,  u, ['torso','waist','groin'], 'B283' );
ArmorItems.ClothArmor.flexible = true;
ArmorItems.ClothArmorSleeves   = new Armor( 'cloth armor sleeves',        2,   20,  1,  4,  1,  u, ['domArm','offArm'], 'B283' );
ArmorItems.ClothArmorSleeves.flexible = true;
ArmorItems.ClothArmorSleeves.layerable = true;
ArmorItems.ClothLeggings       = new Armor( 'cloth leggings',             2,   20,  1,  4,  1,  u, ['domLeg','offLeg'] );
ArmorItems.ClothLeggings.flexible = true;
ArmorItems.ClothGloves         = new Armor( 'cloth gloves',               0,   15,  1,  4,  1,  u, ['domHand','offHand'], 'B284' );
ArmorItems.ClothGloves.flexible = true;
ArmorItems.ClothGloves.layerable = true;

ArmorItems.LightLeatherArmor   = new Armor( 'light leather armor - suit',10,  210,  1,  4,  1,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.LightLeatherLeggings= new Armor( 'light leather leggings',     2,   40,  1,  4,  1,  u, ['domLeg','offLeg'], 'B283' );
ArmorItems.LightLeatherLeggings.flexible = true;
ArmorItems.LightLeatherLeggings.layerable = true;
ArmorItems.LeatherPants        = new Armor( 'leather pants',              3,   40,  1,  4,  1,  u, ['domLeg','offLeg','groin'], 'B283' );
ArmorItems.LeatherPants.flexible = true;
ArmorItems.LeatherPants.layerable = true;
ArmorItems.LeatherCap          = new Armor( 'leather cap',                0,   32,  1,  4,  1,  u, ['skull'], 'B284' );
ArmorItems.LeatherCap.flexible = true;

ArmorItems.LeatherJacket       = new Armor( 'leather jacket',             4,   50,  1,  4,  1,  u, ['torso','waist','domArm','offArm'], 'B283' );
ArmorItems.LeatherJacket.flexible = true;
ArmorItems.LeatherJacket.layerable = true;

ArmorItems.Shoes               = new Armor( 'shoes',                      2,   40,  1,  4,  1,  u, ['domFoot','offFoot'], 'B284' );
ArmorItems.Shoes.detail = 'leather';
ArmorItems.Shoes.flexible = true;
ArmorItems.Shoes.layerable = true;

ArmorItems.LeatherArmorSuit    = new Armor( 'leather armor - suit',      20,  350,  1,  4,  2,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.LeatherArmorSuit.maxTL = 4;
ArmorItems.LeatherHelm         = new Armor( 'leather helm',             0.5,   20,  1,  4,  2,  u, ['skull','face'], 'B284' );
ArmorItems.LeatherArmor        = new Armor( 'leather armor',             10,  100,  1,  4,  2,  u, ['torso','waist','groin'], 'B283' );
ArmorItems.LeatherArmorSleeves = new Armor( 'leather armor sleeves',      2,   50,  1,  4,  2,  u, ['domArm','offArm'], 'B283' );
ArmorItems.LeatherLeggings     = new Armor( 'leather leggings',           4,   60,  1,  4,  2,  u, ['domLeg','offLeg'], 'B283' );
ArmorItems.LeatherLeggings.flexible = true;
ArmorItems.StuddedLeatherSkirt = new Armor( 'studded leather skirt',      4,   60,  1,  4,  3,  u, ['groin','domLeg','offLeg'], 'B283' );
ArmorItems.StuddedLeatherSkirt.splitDR = 2;
ArmorItems.StuddedLeatherSkirt.flexible = true;
ArmorItems.LeatherGloves       = new Armor( 'gloves',                     0,   30,  1,  4,  2,  u, ['domHand','offHand'], 'B284' );
ArmorItems.LeatherGloves.detail = 'leather';
ArmorItems.LeatherGloves.flexible = true;

ArmorItems.BuffCoat            = new Armor( 'buff coat',                 16,  210,  4,  4,  2,  u, ['neck','torso','waist','domArm','offArm','domLeg','offLeg'], 'B283' );
ArmorItems.BuffCoat.detail = 'leather';
ArmorItems.BuffCoat.flexible = true;

ArmorItems.Boots               = new Armor( 'boots',                      3,   80,  1,  4,  2,  u, ['domFoot','offFoot'], 'B284' );
ArmorItems.Boots.flexible = true;
ArmorItems.Boots.layerable = true;

ArmorItems.BronzeHelmet        = new Armor( 'bronze helmet',            7.5,  160,  1,  4,  3,  u, ['skull','face'], 'B284' );
ArmorItems.BronzePotHelm       = new Armor( 'bronze pot-helm',            5,   60,  1,  4,  3,  u, ['skull'], 'B284' );
ArmorItems.BronzeArmbands      = new Armor( 'bronze armbands',            9,  180,  1,  4,  3,  u, ['domArm','offArm'], 'B283' );
ArmorItems.BronzeGreaves       = new Armor( 'bronze greaves',            17,  270,  1,  4,  3,  u, ['domLeg','offLeg'], 'B283' );

ArmorItems.ChainmailSuit       = new Armor( 'chainmail - suit',          45,  550,  2,  3,  4,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.ChainmailSuit.splitDR = 2;  ArmorItems.ChainmailSuit.splitPD = 1;
ArmorItems.ChainmailSuit.maxTL = 4;
ArmorItems.ChainCoif           = new Armor( 'chainmail coif',             4,   55,  2,  3,  4,  u, ['skull','neck'], 'B284' );
ArmorItems.ChainCoif.splitDR = 2;  ArmorItems.ChainCoif.splitPD = 1;
ArmorItems.ChainCoif.flexible = true;
ArmorItems.ChainMailShirt      = new Armor( 'chainmail shirt',           16,  150,  2,  4,  4,  u, ['torso','waist'], 'B283' );
ArmorItems.ChainMailShirt.splitDR = 2;  ArmorItems.ChainMailShirt.splitPD = 1;
ArmorItems.ChainMailShirt.flexible = true;
ArmorItems.ChainMailShirt.layerable = true;
//ArmorItems.Chainmail           = new Armor( 'chainmail',                 25,  230,  2,  3,  4,  u, ['torso','waist','groin'] );
//ArmorItems.Chainmail.splitDR = 2;  ArmorItems.Chainmail.splitPD = 1;
//ArmorItems.Chainmail.flexible = true;
ArmorItems.ChainmailSleeves    = new Armor( 'chainmail sleeves',          9,   70,  2,  3,  4,  u, ['domArm','offArm'], 'B283' );
ArmorItems.ChainmailSleeves.splitDR = 2;  ArmorItems.ChainmailSleeves.splitPD = 1;
ArmorItems.ChainmailSleeves.flexible = true;
ArmorItems.ChainmailLeggings   = new Armor( 'chainmail leggings',        15,  110,  2,  3,  4,  u, ['domLeg','offLeg'], 'B283' );
ArmorItems.ChainmailLeggings.splitDR = 2;  ArmorItems.ChainmailLeggings.splitPD = 1;
ArmorItems.ChainmailLeggings.flexible = true;

ArmorItems.ChainmailHauberk    = new Armor( 'chainmail hauberk',         25,  230,  2,  3,  4,  u, ['torso','waist','groin'], 'B283' );
ArmorItems.ChainmailHauberk.splitDR = 2;
ArmorItems.ChainmailHauberk.flexible = true;
ArmorItems.DoubleMailHauberk   = new Armor( 'double mail hauberk',       44,  520,  3,  3,  5,  u, ['torso','waist','groin'], 'B283' );
ArmorItems.DoubleMailHauberk.splitDR = 3;
ArmorItems.DoubleMailHauberk.flexible = true;

ArmorItems.ScaleSuit           = new Armor( 'scale - suit',              50,  750,  2,  3,  4,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.ScaleSuit.maxTL = 4;
ArmorItems.PotHelm             = new Armor( 'pot-helm',                   5,  100,  2,  4,  4,  u, ['skull'], 'B284' );
ArmorItems.LightScale          = new Armor( 'scale',                     15,  150,  2,  3,  3,  u, ['torso','waist'], 'B283' );
ArmorItems.LightScale.detail = 'light';
ArmorItems.Scale               = new Armor( 'scale',                     35,  420,  2,  3,  4,  u, ['torso','waist','groin'], 'B283' );
ArmorItems.ScaleSleeves        = new Armor( 'scale sleeves',             14,  210,  2,  3,  4,  u, ['domArm','offArm'], 'B283' );
ArmorItems.ScaleLeggings       = new Armor( 'scale leggings',            21,  250,  2,  3,  4,  u, ['domLeg','offLeg'], 'B283' );

ArmorItems.LegionaryHelmet     = new Armor( 'helmet',                     6,  150,  2,  3,  4,  u, ['skull','face'], 'B284' );
ArmorItems.LegionaryHelmet.detail = 'legionary';
ArmorItems.BronzeBreastplate   = new Armor( 'bronze breastplate',        20,  400,  3,  3,  4,  u, ['torso','waist'], 'B283' );
ArmorItems.SteelBreastplate    = new Armor( 'steel breastplate',         18,  500,  3,  3,  5,  u, ['torso','waist'], 'B283' );
ArmorItems.Gauntlets           = new Armor( 'gauntlets',                  2,  100,  2,  4,  4,  u, ['domHand','offHand'], 'B284' );
ArmorItems.HeavyGauntlets      = new Armor( 'gauntlets',                2.5,  250,  3,  3,  5,  u, ['domHand','offHand'], 'B284' );
ArmorItems.HeavyGauntlets.detail = 'heavy';
ArmorItems.Sollerets           = new Armor( 'sollerets',                  7,  150,  3,  3,  4,  u, ['domFoot','offFoot'], 'B284' );

ArmorItems.HalfPlate           = new Armor( 'half-plate - suit',         70, 2000,  2,  3,  5,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.HalfPlate.maxTL = 4;
ArmorItems.LoricaSegmentata    = new Armor( 'lorica segmentata',         26,  680,  2,  3,  5,  u, ['torso','waist'], 'B283' );
ArmorItems.BronzeCorselet      = new Armor( 'bronze corselet',           40, 1300,  3,  3,  5,  u, ['torso','waist','groin'], 'B283' );
ArmorItems.SteelLaminatePlate  = new Armor( 'steel laminate plate',      30,  900,  3,  3,  5,  u, ['torso','waist','groin'], 'B283' );

ArmorItems.LightPlate          = new Armor( 'light plate - suit',        90, 4000,  3,  3,  6,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.LightPlate.maxTL = 4;
ArmorItems.Barrelhelm          = new Armor( 'barrel helm',               10,  240,  3,  3,  6,  u, ['skull','face','eyes','neck'], 'B284' );
ArmorItems.SteelCorselet       = new Armor( 'steel corselet',            35, 1300,  3,  3,  6,  u, ['torso','waist','groin'], 'B283' );
ArmorItems.Vambraces           = new Armor( 'plate vambraces',           15, 1000,  3,  3,  6,  u, ['domArm','offArm'], 'B283' );
ArmorItems.Greaves             = new Armor( 'plate greaves',             20, 1100,  3,  3,  6,  u, ['domLeg','offLeg'], 'B283' );

ArmorItems.HeavyPlate          = new Armor( 'plate - suit',             110, 6000,  3,  3,  7,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'] );
ArmorItems.HeavyPlate.detail = 'heavy';
ArmorItems.Greathelm           = new Armor( 'greathelm',                 10,  340,  3,  3,  7,  u, ['skull','face','neck'], 'B284' );
ArmorItems.HeavySteelCorselet  = new Armor( 'steel corselet',            45, 2300,  3,  3,  7,  u, ['torso','waist','groin'], 'B283' );
ArmorItems.HeavySteelCorselet.detail = 'heavy';
ArmorItems.HeavyVambraces      = new Armor( 'plate vambraces',           20, 1500,  3,  3,  7,  u, ['domArm','offArm'], 'B283' );
ArmorItems.HeavyVambraces.detail = 'heavy';
ArmorItems.HeavyGreaves        = new Armor( 'plate greaves',             25, 1600,  3,  3,  7,  u, ['domLeg','offLeg'], 'B283' );
ArmorItems.HeavyGreaves.detail = 'heavy';

ArmorItems.FaceMask            = new Armor( 'face mask',                  2,  100,  3,  3,  4,  u, ['face'], 'B284' );
ArmorItems.GasMask             = new Armor( 'gas mask',                   4,  100,  6,  4,  4,  u, ['eyes','face'], 'B285' );

ArmorItems.FlakJacket          = new Armor( 'flak jacket',               20,  500,  6,  3,  7,  u, ['torso','waist'], 'B284' );
ArmorItems.FlakJacket.maxTL = 7;

ArmorItems.FragVest            = new Armor( 'frag vest',                  9,  350,  7,  3,  5,  u, ['torso','waist','groin'], 'B284' );
ArmorItems.FragVest.splitDR = 2;    ArmorItems.FragVest.flexible = true;
ArmorItems.FragVestInserts     = new Armor( 'frag vest plate inserts',   15,  300,  7,  3, 20,  u, ['torso','waist'], 'B284' );

ArmorItems.ReinforcedBoots     = new Armor( 'boots',                      3,   75,  7,  4,  5,  u, ['domFoot','offFoot'], 'B284' );
ArmorItems.ReinforcedBoots.detail = 'reinforced';
ArmorItems.ReinforcedBoots.splitDR = 2;

ArmorItems.BallisticVest       = new Armor( 'ballistic vest',             2,  400,  8,  3,  8,  u, ['torso','waist'], 'B284' );
ArmorItems.BallisticVest.splitDR = 2;    ArmorItems.BallisticVest.flexible = true;
ArmorItems.TacticalVest        = new Armor( 'tactical vest',              9,  900,  8,  3, 12,  u, ['torso','waist','groin'], 'B284' );
ArmorItems.TacticalVest.splitDR = 5;    ArmorItems.TacticalVest.flexible = true;
ArmorItems.TacticalVestPlates  = new Armor( 'tactical vest trauma plates',9,  600,  8,  3, 23,  u, ['torso','waist'], 'B284' );

ArmorItems.BallisticSuit       = new Armor( 'ballistic suit',             6, 1000,  8,  2, 12,  u, ['neck','torso','waist','groin','domArm','offArm','domLeg','offLeg'], 'B284' );
ArmorItems.BallisticSuit.splitDR = 4;   ArmorItems.BallisticSuit.flexible = true;

ArmorItems.TacticalSuit        = new Armor( 'tactical suit',             15, 3000,  9,  2, 20,  u, ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'], 'B284' );
ArmorItems.TacticalSuit.splitDR = 10;   ArmorItems.TacticalSuit.flexible = true;

ArmorItems.BallisticGloves     = new Armor( 'ballistic gloves',           0,   30,  9,  4,  8,  u, ['domHand','offHand'], 'B284' );
ArmorItems.BallisticGloves.splitDR = 2;
ArmorItems.AssaultBoots        = new Armor( 'boots',                      3,  150,  9,  4, 12,  u, ['domFoot','offFoot'], 'B284' );
ArmorItems.AssaultBoots.detail = 'assault';
ArmorItems.AssaultBoots.splitDR = 6;
/*                                          'name',                      wt, cost, TL, LC, DR, PD, location*, */

for ( var a in ArmorItems ) {
    if( !ArmorItems[a].hasOwnProperty('key') ) ArmorItems[a].key = a;
}
Groups.Armor = Object.keys(ArmorItems);

Groups.ArmorGURPSLite = ['ClothArmorSuit','LeatherArmorSuit','ScaleSuit','ChainmailSuit','HalfPlate',
                         'LightPlate','FlakJacket','BallisticVest','TacticalVest'];


/* Weapons                            'name',               weight,  cost, TL, LC, bulk,  qualEffGp [blade|cut|cr/imp|bow|gun], ref */
Weapons = {};

// "natural" weapons
Weapons.fist            = new Weapon('fist',                     0,     0,  0,  4,    0, 'natural', 'B271' );
Weapons.fist.wieldOptions         = { DX          : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C' } ],
                                      Boxing      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C', note: ['Boxing (p. 182) improves punching damage (If you know Boxing at DX+1 level, add +1 per die to basic thrust damage when you calculate punching damage. Add +2 per die if you know Boxing at DX+2 or better!).'] } ],
                                      Brawling    : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ],
                                      Karate      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] } ] };
Weapons.bluntclawedhand = new Weapon('claws (hand)',             0,     0,  0,  4,    0, 'natural', 'B271' );
Weapons.bluntclawedhand.detail = 'blunt';
Weapons.bluntclawedhand.wieldOptions={DX          : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'cr' }, reach: 'C' } ],
                                    //  Boxing      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cr' }, reach: 'C', note: ['Boxing (p. 182) improves punching damage (If you know Boxing at DX+1 level, add +1 per die to basic thrust damage when you calculate punching damage. Add +2 per die if you know Boxing at DX+2 or better!).'] } ],
                                      Brawling    : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'cr' }, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ],
                                      Karate      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'cr' }, reach: 'C', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] } ] };
Weapons.sharpclawedhand = new Weapon('claws (hand)',             0,     0,  0,  4,    0, 'natural', 'B42' );
Weapons.sharpclawedhand.detail = 'sharp';
Weapons.sharpclawedhand.wieldOptions={DX          : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C' } ],
                                    //  Boxing      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Boxing (p. 182) improves punching damage (If you know Boxing at DX+1 level, add +1 per die to basic thrust damage when you calculate punching damage. Add +2 per die if you know Boxing at DX+2 or better!).'] } ],
                                      Brawling    : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ],
                                      Karate      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] } ] };
Weapons.talonedhand     = new Weapon('talons (hand)',            0,     0,  0,  4,    0, 'natural', 'B42' );
Weapons.talonedhand.wieldOptions =  { DX          : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C' },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'imp'}, reach: 'C' } ],
                                    //  Boxing      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Boxing (p. 182) improves punching damage (If you know Boxing at DX+1 level, add +1 per die to basic thrust damage when you calculate punching damage. Add +2 per die if you know Boxing at DX+2 or better!).'] },
                                    //                  { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'imp'}, reach: 'C', note: ['Boxing (p. 182) improves punching damage (If you know Boxing at DX+1 level, add +1 per die to basic thrust damage when you calculate punching damage. Add +2 per die if you know Boxing at DX+2 or better!).'] } ],
                                      Brawling    : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'imp'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ],
                                      Karate      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type:  'imp'}, reach: 'C', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] } ] };
Weapons.longtalonedhand = new Weapon('talons (hand)',            0,     0,  0,  4,    0, 'natural', 'B42' );
Weapons.longtalonedhand.detail = 'long';
Weapons.longtalonedhand.wieldOptions={DX          : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'cut'}, reach: 'C' },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'imp'}, reach: 'C' } ],
                                    //  Boxing      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'cut'}, reach: 'C', note: ['Boxing (p. 182) improves punching damage (If you know Boxing at DX+1 level, add +1 per die to basic thrust damage when you calculate punching damage. Add +2 per die if you know Boxing at DX+2 or better!).'] },
                                    //                  { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'imp'}, reach: 'C', note: ['Boxing (p. 182) improves punching damage (If you know Boxing at DX+1 level, add +1 per die to basic thrust damage when you calculate punching damage. Add +2 per die if you know Boxing at DX+2 or better!).'] } ],
                                      Brawling    : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'cut'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'imp'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ],
                                      Karate      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'cut'}, reach: 'C', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, perd: 1, type:  'imp'}, reach: 'C', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] } ] };
Weapons.foot            = new Weapon('foot',                     0,     0,  0,  4,    0, 'natural', 'B271' );
Weapons.foot.wieldOptions         = {'DX-2'       : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C,1' } ],
                                      Kicking     : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C,1', note: ['Kicking defaults to DX-2, Brawling-2, or Karate-2.  Use special damage rules from the base skill used for the Kicking technique.','Kicking skill must be added to character sheet to see correct Kicking skill level and Kicking parry.'] } ] };
Weapons.hoof            = new Weapon('hoof',                     0,     0,  0,  4,    0, 'natural', 'B271' );
Weapons.hoof.wieldOptions =         {'DX-2'       : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cr' }, reach: 'C,1' } ],
                                      Kicking     : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cr' }, reach: 'C,1', note: ['Kicking defaults to DX-2, Brawling-2, or Karate-2.  Use special damage rules from the base skill used for the Kicking technique.','Kicking skill must be added to character sheet to see correct Kicking skill level and Kicking parry.'] } ] };
Weapons.bluntclawedfoot = new Weapon('claws (feet)',             0,     0,  0,  4,    0, 'natural', 'B271' );   // this entry is identical to 'hoof'
Weapons.bluntclawedfoot.detail = 'blunt';
Weapons.bluntclawedfoot.wieldOptions={'DX-2'      : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cr' }, reach: 'C,1' } ],
                                      Kicking     : [ { title:'kick',           hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cr' }, reach: 'C,1', note: ['Kicking defaults to DX-2, Brawling-2, or Karate-2.  Use special damage rules from the base skill used for the Kicking technique.','Kicking skill must be added to character sheet to see correct Kicking skill level and Kicking parry.'] } ] };
Weapons.sharpclawedfoot = new Weapon('claws (feet)',             0,     0,  0,  4,    0, 'natural', 'B42' );
Weapons.sharpclawedfoot.detail = 'sharp';
Weapons.sharpclawedfoot.wieldOptions={'DX-2'      : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cut'}, reach: 'C,1' } ],
                                      Kicking     : [ { title:'swiping kick',   hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, type:  'cut'}, reach: 'C,1', note: ['Kicking defaults to DX-2, Brawling-2, or Karate-2.  Use special damage rules from the base skill used for the Kicking technique.','Kicking skill must be added to character sheet to see correct Kicking skill level and Kicking parry.'] } ] };
Weapons.talonedfoot     = new Weapon('talons (feet)',            0,     0,  0,  4,    0, 'natural', 'B42' );
Weapons.talonedfoot.wieldOptions =  { DX          : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cut'}, reach: 'C,1' },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C,1' } ],
                                      Brawling    : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cut'}, reach: 'C,1', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C,1', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ],
                                      Karate      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cut'}, reach: 'C,1', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'imp'}, reach: 'C,1', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] } ] };
Weapons.longtalonedfoot = new Weapon('talons (feet)',            0,     0,  0,  4,    0, 'natural', 'B42' );
Weapons.longtalonedfoot.detail = 'long';
Weapons.longtalonedfoot.wieldOptions={DX          : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cut'}, reach: 'C,1' },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'imp'}, reach: 'C,1' } ],
                                      Brawling    : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cut'}, reach: 'C,1', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'imp'}, reach: 'C,1', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ],
                                      Karate      : [ { title:'swipe',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cut'}, reach: 'C,1', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] },
                                                      { title:'stab',           hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'imp'}, reach: 'C,1', note: ['Karate (p. 203) improves damage with punches and kicks (If you know Karate at DX level, add +1 per die to basic thrust damage when you calculate damage with Karate attacks: punches, kicks, elbow strikes, etc. Add +2 per die if you know Karate at DX+1 or better!).'] } ] };
Weapons.teeth           = new Weapon('teeth',                    0,     0,  0,  4,    0, 'natural', 'B91' );
Weapons.teeth.wieldOptions        = { DX          : [ { title:'bite',           hands: 'none', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C' } ],
                                      Brawling    : [ { title:'bite',           hands: 'none', strength:  0, damage: { base: 'thr', mods: -1, type:  'cr' }, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };
Weapons.sharpteeth      = new Weapon('teeth',                    0,     0,  0,  4,    0, 'natural', 'B91' );
Weapons.sharpteeth.detail = 'sharp';
Weapons.sharpteeth.wieldOptions   = { DX          : [ { title:'bite',           hands: 'none', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C' } ],
                                      Brawling    : [ { title:'bite',           hands: 'none', strength:  0, damage: { base: 'thr', mods: -1, type:  'cut'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };
Weapons.fangs           = new Weapon('fangs',                    0,     0,  0,  4,    0, 'natural', 'B91' );
Weapons.fangs.wieldOptions        = { DX          : [ { title:'bite',           hands: 'none', strength:  0, damage: { base: 'thr', mods: -1, type:  'imp'}, reach: 'C' } ],
                                      Brawling    : [ { title:'bite',           hands: 'none', strength:  0, damage: { base: 'thr', mods: -1, type:  'imp'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };
Weapons.sharpbeak       = new Weapon('beak',                     0,     0,  0,  4,    0, 'natural', 'B91' );
Weapons.sharpbeak.detail = 'sharp';
Weapons.sharpbeak.wieldOptions    = { DX          : [ { title:'bite',           hands: 'none', strength:  0, damage: { base: 'thr', mods: -1, type:  'pi+'}, reach: 'C' } ],
                                      Brawling    : [ { title:'bite',           hands: 'none', strength:  0, damage: { base: 'thr', mods: -1, type:  'pi+'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };

Weapons.crushingstriker = new Weapon('striker',                  0,     0,  0,  4,    0, 'natural', 'B88' );
Weapons.crushingstriker.detail = 'crushing';
Weapons.crushingstriker.wieldOptions={DX          : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cr' }, reach: 'C' } ],
                                      Brawling    : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cr' }, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };

Weapons.piercingstriker = new Weapon('striker',                  0,     0,  0,  4,    0, 'natural', 'B88' );
Weapons.piercingstriker.detail = 'piercing';
Weapons.piercingstriker.wieldOptions={DX          : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'pi' }, reach: 'C' } ],
                                      Brawling    : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'pi' }, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };

Weapons.lgpiercingstriker= new Weapon('striker',                 0,     0,  0,  4,    0, 'natural', 'B88' );
Weapons.lgpiercingstriker.detail = 'large piercing';
Weapons.lgpiercingstriker.wieldOptions={DX        : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'pi+'}, reach: 'C' } ],
                                      Brawling    : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'pi+'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };

Weapons.cuttingstriker  = new Weapon('striker',                  0,     0,  0,  4,    0, 'natural', 'B88' );
Weapons.cuttingstriker.detail = 'cutting';
Weapons.cuttingstriker.wieldOptions={ DX          : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cut'}, reach: 'C' } ],
                                      Brawling    : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'cut'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };

Weapons.impalingstriker = new Weapon('striker',                  0,     0,  0,  4,    0, 'natural', 'B88' );
Weapons.impalingstriker.detail = 'impaling';
Weapons.impalingstriker.wieldOptions={DX          : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'imp'}, reach: 'C' } ],
                                      Brawling    : [ { title:'strike',         hands: 'none', strength:  0, damage: { base: 'thr', mods:  0, perd: 1, type:  'imp'}, reach: 'C', note: ['Brawling (p. 182) increases all unarmed damage (if you know Brawling at DX+2 level or better, add +1 per die to basic thrust damage).'] } ] };

// special weapons
Weapons.CattleProd      = new Weapon('cattle prod',              2,    50,  7,  4,   -5, 'other', 'B273' );
Weapons.CattleProd.wieldOptions   = { Shortsword        : [ { title: 'prod',    hands: 'dom',  strength:  3, damage: { base: 1,     mods: -3, type: 'burn'}, note: ['On a failed HT roll, victim is stunned for as long as weapon is in contact plus (20 - HT) seconds longer, and then can roll vs. HT-3 to recover.'] } ] };
Weapons.Chainsaw        = new Weapon('chainsaw',                13,   150,  6,  4,   -4, 'other', 'B274' );
Weapons.Chainsaw.wieldOptions     = { TwoHandedAxeMace  : [ { title: '',        hands: 'both', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["May not parry.","Noisy! Runs for two hours on half a gallon of gasoline.","Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] } ] };
Weapons.Whip            = new Weapon('whip',                     2,    20,  1,  4,   -3, 'other', 'B274');
Weapons.Whip.wieldOptions         = { Whip              : [ { title:  '',       hands:  'dom', strength:  6, damage: { base: 'sw',  mods: -2, type: 'cr'  }, reach: '1-7', parryBonus: -2, note: ['See B406 for special rules.'] } ] };
Weapons.WhipMonowire    = new Weapon('whip',                   0.5,   900, 10,  4,   -1, 'other', 'B272');
Weapons.WhipMonowire.detail = 'monowire';
Weapons.WhipMonowire.armorDivisor = 10;
Weapons.WhipMonowire.wieldOptions = { Whip              : [ { title:  '',       hands:  'dom', strength:  5, damage: { base: 'sw',  mods:  1, type: 'cr'  }, reach: '1-7', parryBonus: -2, note: ['See B406 for special rules.'] } ] };
Weapons.BrassKnuckles   = new Weapon('brass knuckles',        0.25,    10,  1,  4,  '-',  'other', 'B271' );
Weapons.BrassKnuckles.wieldOptions= { DX          : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Boxing      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Brawling    : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ],
                                      Karate      : [ { title:'punch',          hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C' } ] };

// cutting, non-blade weapons
Weapons.Axe             = new Weapon('axe',                      4,    50,  1,  4,   -3, 'cut', 'B271' );
Weapons.Axe.wieldOptions          = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, note: ["<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa)."] } ] };
Weapons.Axe.maxTL = 4;
Weapons.Hatchet         = new Weapon('hatchet',                  2,    40,  0,  4,   -2, 'cut', 'B271,276' );
Weapons.Hatchet.wieldOptions      = { AxeMace           : [ { title: 'chop',    hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' }, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapon Table</i> (p. 275)."] } ],
                                      ThrownWeapon_AxeMace:[{ title: 'throw',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' }, accuracy: 1,       halfDamageRange: 1.5, maximumRange: 2.5, rangeBasedOnST: true } ] };
Weapons.Hatchet.maxTL = 4;
Weapons.ThrowingAxe     = new Weapon('axe',                      4,    60,  1,  4,   -3, 'cut', 'B271,276' );
Weapons.ThrowingAxe.detail = 'throwing';
Weapons.ThrowingAxe.maxTL = 4;
Weapons.ThrowingAxe.wieldOptions  = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapon Table</i> (p. 275).","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa)."] } ],
                                      ThrownWeapon_AxeMace:[{ title: 'throw',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' }, accuracy: 1,       halfDamageRange: 1.5, maximumRange: 2.5, rangeBasedOnST: true } ] };
Weapons.Pick            = new Weapon('pick',                     3,    70,  3,  4,   -4, 'cr/imp', 'B271' );
Weapons.Pick.wieldOptions         = { AxeMace           : [ { title: '',        hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'imp' }, note: ["May get <i>stuck</i>. (See Campaigns, pg. 405)"] } ] };
Weapons.GreatAxe        = new Weapon('axe',                      8,   100,  1,  4,   -5, 'cut', 'B274');
Weapons.GreatAxe.detail = 'great';
Weapons.GreatAxe.wieldOptions     = { TwoHandedAxeMace  : [ { title: '',        hands: 'both', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '1,2', note: ["Requires a Ready maneuver to change reach.","Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).  Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] } ] };

Weapons.Scythe          = new Weapon('scythe',                   5,    15,  1,  4,   -6, 'cut', 'B274');
Weapons.Scythe.wieldOptions       = { TwoHandedAxeMace  : [ { title: 'swing',   hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).","Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] },
                                                            { title: 'chop',    hands: 'both', strength: 11, damage: { base: 'sw',  mods:  0, type: 'imp' }, note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).","Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST.  May get <i>stuck</i>. (See Campaigns, pg. 405)"] }, ] };
Weapons.Warhammer       = new Weapon('warhammer',                7,   100,  3,  4,   -5, 'cr/imp', 'B274');
Weapons.Warhammer.wieldOptions    = { TwoHandedAxeMace  : [ { title: '',        hands: 'both', strength: 12, damage: { base: 'sw',  mods:  3, type: 'imp' }, reach: '1,2', note: ["Requires a Ready maneuver to change reach.","Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).  Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] } ] };

// blades                             'name',               weight,  cost, TL, LC, bulk,  qualEffGp
Weapons.Dagger          = new Weapon('dagger',                0.25,    20,  0,  4,   -1, 'blade', 'B272,276' );
Weapons.Dagger.wieldOptions       = { Knife             : [ { title: 'thrust',  hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',   parryBonus: -1, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapon Table</i> (p. 275)."] } ],
                                      MainGauche        : [ { title: 'thrust',  hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',   note: ['With this skill, you may ignore the penalty for using the "off" hand on defense (attacks are still at -4) and the -1 for parrying with a knife. (p. 208).'] } ],
                                      ThrownWeapon_Knife: [ { title: 'thrown',  hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d',   rangeBasedOnST: true, halfDamageRange: 0.5, maximumRange: 1 } ] };
Weapons.KnifeSmall      = new Weapon('knife',                  0.5,    30,  0,  4,   -1, 'blade', 'B272,276' );
Weapons.KnifeSmall.detail = 'small';
Weapons.KnifeSmall.wieldOptions   = { Knife             : [ { title: 'swung',   hands:  'dom', strength:  5, damage: { base: 'sw',  mods: -3, type: 'cut' }, maxDamage: '1d+1', reach: 'C,1', parryBonus: -1, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapon Table</i> (p. 275)."] },
                                                            { title: 'thrust',  hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',   parryBonus: -1, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapon Table</i> (p. 275)."] } ],
                                      MainGauche        : [ { title: 'swung',   hands:  'dom', strength:  5, damage: { base: 'sw',  mods: -3, type: 'cut' }, maxDamage: '1d+1', reach: 'C,1', note: ['With this skill, you may ignore the penalty for using the "off" hand on defense (attacks are still at -4) and the -1 for parrying with a knife. (p. 208).'] },
                                                            { title: 'thrust',  hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',   note: ['With this skill, you may ignore the penalty for using the "off" hand on defense (attacks are still at -4) and the -1 for parrying with a knife. (p. 208).'] } ],
                                      ThrownWeapon_Knife: [ { title: 'thrown',  hands:  'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', rangeBasedOnST: true, halfDamageRange: 0.5, maximumRange: 1 } ] };
Weapons.KnifeLarge      = new Weapon('knife',                    1,    40,  0,  4,   -2, 'blade', 'B272,276' );
Weapons.KnifeLarge.detail = 'large';
Weapons.KnifeLarge.wieldOptions   = { Knife             : [ { title: 'swung',   hands:  'dom', strength:  6, damage: { base: 'sw',  mods: -2, type: 'cut' }, maxDamage: '1d+2', reach: 'C,1', parryBonus: -1, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapon Table</i> (p. 275)."] },
                                                            { title: 'thrust',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', reach: 'C',   parryBonus: -1, note: ["Can be thrown. See <i>Muscle-Powered Ranged Weapon Table</i> (p. 275)."] } ],
                                      MainGauche        : [ { title: 'swung',   hands:  'off', strength:  6, damage: { base: 'sw',  mods: -2, type: 'cut' }, maxDamage: '1d+2', reach: 'C,1', note: ['With this skill, you may ignore the penalty for using the "off" hand on defense (attacks are still at -4) and the -1 for parrying with a knife. (p. 208).'] },
                                                            { title: 'thrust',  hands:  'off', strength:  6, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', reach: 'C',   note: ['With this skill, you may ignore the penalty for using the "off" hand on defense (attacks are still at -4) and the -1 for parrying with a knife. (p. 208).'] } ],
                                      ThrownWeapon_Knife: [ { title: 'thrown',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', rangeBasedOnST: true, halfDamageRange: 0.8, maximumRange: 1.5 } ] };
Weapons.Smallsword      = new Weapon('smallsword',             1.5,   400,  4,  4,   -3, 'blade', 'B273' );
Weapons.Smallsword.wieldOptions   = { Smallsword        : [ { title: 'thrust',  hands:  'dom', strength:  5, damage: { base: 'thr', mods:  1, type: 'imp' }, note: ["Fencing weapon (see Campaigns, pg. 404)"] } ] };
Weapons.Shortsword      = new Weapon('shortsword',               2,   400,  2,  4,   -4, 'blade', 'B273' );
Weapons.Shortsword.maxTL = 5;
Weapons.Shortsword.wieldOptions   = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  0, type: 'imp' } } ] };
Weapons.Cutlass         = new Weapon('cutlass',                  2,   300,  2,  4,   -4, 'blade', 'B273' );
Weapons.Cutlass.wieldOptions      = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' }, note: ["Hilt counts as brass knuckles in close combat."] },
                                                            { title: 'thrust',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  0, type: 'imp' }, note: ["Hilt counts as brass knuckles in close combat."] } ] };
Weapons.Saber           = new Weapon('saber',                    2,   700,  4,  4,   -4, 'blade', 'B273' );
Weapons.Saber.wieldOptions        = { Saber             : [ { title: 'swung',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods: -1, type: 'cut' }, note: ["Fencing weapon (see Campaigns, pg. 404)"] },
                                                            { title: 'thrust',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  1, type: 'imp' }, note: ["Fencing weapon (see Campaigns, pg. 404)"] } ] };
                                      // saber is pretty different between e3 and e4
Weapons.CavalrySaber    = new Weapon('saber',                    3,   500,  4,  4,   -4, 'blade', 'B271' );
Weapons.CavalrySaber.detail = 'cavalry';
Weapons.CavalrySaber.wieldOptions = { Broadsword        : [ { title: 'swung',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'imp' } } ] };
Weapons.Rapier          = new Weapon('rapier',                2.75,   500,  4,  4,   -4, 'blade', 'B273' );
Weapons.Rapier.maxTL = 5;
Weapons.Rapier.wieldOptions       = { Rapier            : [ { title: 'thrust',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2', note: ["Fencing weapon (see Campaigns, pg. 404)"] } ] };
Weapons.Broadsword      = new Weapon('broadsword',               3,   500,  2,  4,   -4, 'blade', 'B271' );
Weapons.Broadsword.maxTL = 5;
Weapons.Broadsword.wieldOptions   = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'cr'  } } ] };
Weapons.BroadswordThr   = new Weapon('broadsword',               3,   600,  2,  4,   -4, 'blade', 'B271' );
Weapons.BroadswordThr.detail = 'thrusting';
Weapons.BroadswordThr.maxTL = 5;
Weapons.BroadswordThr.wieldOptions= { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                            { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' } } ] };
Weapons.Katana          = new Weapon('katana',                   5,   650,  3,  4,   -4, 'blade', 'B271,274' );
Weapons.Katana.wieldOptions       = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2' },
                                                            { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'imp' } } ],
                                      TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] },
                                                            { title: 'thrust',  hands: 'both', strength: 10, damage: { base: 'thr', mods:  1, type: 'imp' },               note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ] };
Weapons.BastardSword    = new Weapon('bastard sword',            5,   650,  3,  4,   -5, 'blade', 'B271,274' );
Weapons.BastardSword.wieldOptions = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2', note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa)"] },
                                                            { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'cr'  }, reach: 2,     note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa)"] } ],
                                      TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] },
                                                            { title: 'thrust',  hands: 'both', strength: 10, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: 2,     note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ] };
Weapons.BastardSwordThr = new Weapon('bastard sword',            5,   750,  3,  4,   -5, 'blade', 'B271,274' );
Weapons.BastardSwordThr.detail = 'thrusting';
Weapons.BastardSwordThr.wieldOptions={Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2', note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa)"] },
                                                            { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: 2,     note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa)"] } ],
                                      TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] },
                                                            { title: 'thrust',  hands: 'both', strength: 10, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: 2,     note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ] };
Weapons.Greatsword      = new Weapon('greatsword',               7,   800,  3,  4,   -6, 'blade', 'B274' );
Weapons.Greatsword.notes = ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."];
Weapons.Greatsword.wieldOptions   = { TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '1,2' },
                                                            { title: 'thrust',  hands: 'both', strength: 12, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: 2     } ] };
Weapons.GreatswordThr   = new Weapon('greatsword',               7,   900,  3,  4,   -6, 'blade', 'B274' );
Weapons.GreatswordThr.detail = 'thrusting';
Weapons.GreatswordThr.maxTL = 5;
Weapons.GreatswordThr.notes = ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."];
Weapons.GreatswordThr.wieldOptions= { TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '1,2' },
                                                            { title: 'thrust',  hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: 2     } ] };

Weapons.ForceSword      = new Weapon('force sword',              2, 10000, 11,  2,   -2, '', 'B272' );
Weapons.ForceSword.armorDivisor = 5;
Weapons.ForceSword.wieldOptions   = { ForceSword        : [ { title: '',        hands:  'dom', strength:  3, damage: { base: 8,     mods:  0, type: 'burn'}, reach: '1,2', note: ["This is an energy blade. Take a Ready maneuver to activate/deactivate. The blade cannot break, and damages any weapon or body part it parries <i>or which parries or blocks it</i>. Extra energy cells cost $100, weigh 0.5 lb., and last 300 seconds."] } ] };

// Polearms                           'name',               weight,  cost, TL, LC, bulk,  qualEffGp
Weapons.Glaive          = new Weapon('glaive',                   8,   100,  1,  4,   -8, 'cr/imp', 'B272');
Weapons.Glaive.wieldOptions       = { Polearm           : [ { title:'swing',    hands: 'both', strength: 11, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '2,3', note: ["Requires a Ready maneuver to change reach.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa). Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] },
                                                            { title:'thrust',   hands: 'both', strength: 11, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1-3', note: ["Requires a Ready maneuver to change reach.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa). Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.Naginata        = new Weapon('naginata',                 6,   100,  1,  4,   -8, 'cr/imp', 'B272,273,274');
Weapons.Naginata.wieldOptions     = { Polearm           : [ { title:'swing',    hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa).","Requires a Ready maneuver to change reach."] },
                                                            { title:'thrust',   hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:  2,    note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ],
                                      StaffSkill        : [ { title:'swing',    hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa).","Blunt end."] },
                                                            { title:'thrust',   hands: 'both', strength:  9, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ],
                                      TwoHandedSword    : [ { title:'swing',    hands: 'both', strength:  9, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach:  2,    note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa)."] },
                                                            { title:'thrust',   hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:  2,    note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] } ] };
Weapons.Halberd         = new Weapon('halberd',                 12,   300,  3,  4,   -8, 'cr/imp', 'B272');
Weapons.Halberd.wieldOptions      = { Polearm           : [ { title: 'blade swing',hands:'dom',strength: 13, damage: { base: 'sw',  mods:  5, type: 'cut' }, reach: '2,3', note: ["Requires a Ready maneuver to change reach.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa). Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] },
                                                            { title: 'pick swing',hands:'dom', strength: 13, damage: { base: 'sw',  mods:  4, type: 'imp' }, reach: '2,3', note: ["Requires a Ready maneuver to change reach.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa). Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST. May get <i>stuck</i>; see <i>Picks</i> (p. 405)."] },
                                                            { title: 'thrust',  hands:  'dom', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1-3', note: ["Requires a Ready maneuver to change reach.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa). Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] }, ] };
Weapons.Poleaxe         = new Weapon('poleaxe',                 10,   120,  3,  4,   -8, 'cr/imp', 'B272');
Weapons.Poleaxe.maxTL = 4;
Weapons.Poleaxe.wieldOptions      = { Polearm       : [ { title:'hammer swing', hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cr'  }, reach: '2,3', note: ["Requires a Ready maneuver to change reach.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa). Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] },
                                                        { title:'axe swing',    hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cut' }, reach: '2,3', note: ["Requires a Ready maneuver to change reach.","<i>Unbalanced</i>: you cannot use this weapon to parry if you have already used it to attack this turn (or vice versa). Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] } ] };
Weapons.Javelin         = new Weapon('javelin',                  2,    30,  1,  4,   -4, 'cr/imp', 'B273' );
Weapons.Javelin.wieldOptions      = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  1, type: 'imp' }, note: ["Can be thrown."] } ],
                                      ThrownWeapon_Spear: [ { title: 'thrown',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  1, type: 'imp' }, rangeBasedOnST: true, halfDamageRange: 1.5, maximumRange: 2.5,  accuracy: 3 } ],
                                      SpearThrower      : [ { title: 'atlatl',  hands:  'dom', strength:  6, damage: { base: 'sw',  mods:  1, type: 'imp' }, rangeBasedOnST: true, halfDamageRange:   2, maximumRange: 3,    accuracy: 3, note: ["Requires <i>two</i> hands to ready, but only <i>one</i> hand to attack."] } ] };
Weapons.Spear           = new Weapon('spear',                    4,    40,  0,  4,   -6, 'cr/imp', 'B273' );
Weapons.Spear.maxTL = 4;
Weapons.Spear.wieldOptions        = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '1',   note: ["Can be thrown.","Requires a Ready maneuver to change wield option."] },
                                                            { title: '2 hands', hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1,2', note: ["Can be thrown.","Requires a Ready maneuver to change reach or wield option."] } ],
                                     ThrownWeapon_Spear : [ { title: 'thrown',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, rangeBasedOnST: true, halfDamageRange:   1, maximumRange:  1.5, accuracy: 2, note: ["Can be thrown.","Requires a Ready maneuver to change wield option."] } ] };
Weapons.LongSpear       = new Weapon('spear',                    5,    60,  2,  4,   -8, 'cr/imp', 'B273' );
Weapons.LongSpear.detail = 'long';
Weapons.LongSpear.wieldOptions    = { Spear             : [ { title: '1 hand',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '2,3', note: ["Requires a Ready maneuver to change reach.","Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).  Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty."] },
                                                            { title: '2 hands', hands: 'both', strength: 10, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '2,3', note: ["Requires a Ready maneuver to change reach."] } ] };
Weapons.Quarterstaff    = new Weapon('quarterstaff',             4,    10,  0,  4,   -8, 'cr/imp', 'B273,274' );
Weapons.Quarterstaff.notes = ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."];
Weapons.Quarterstaff.wieldOptions = { StaffSkill        : [ { title: 'swung',   hands: 'both', strength:  6, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', parryBonus: 2 },
                                                            { title: 'thrust',  hands: 'both', strength:  6, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', parryBonus: 2 } ],
                                      TwoHandedSword    : [ { title: 'swung',   hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2',               },
                                                            { title: 'thrust',  hands: 'both', strength:  9, damage: { base: 'thr', mods:  1, type: 'cr'  }, reach: '2',                 } ] };
Weapons.Lance           = new Weapon('lance',                    6,    60,  3,  4,  -10, 'cr/imp', 'B272');
Weapons.Lance.wieldOptions        = { Lance             : [ { title:'',         hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:   4,   note: ["May not parry.","Damage increases in a mounted charge; see Cavalry Weapons (B4E397)"] } ] };

// blunt weapons                     'name',                weight,  cost, TL, LC, bulk, qualEffGp
Weapons.Baton           = new Weapon('baton',                    1,    20,  0,  4,   -2, 'cr/imp', 'B273');
Weapons.Baton.wieldOptions        = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  6, damage: { base: 'sw',  mods:  0, type: 'cr'  } },
                                                            { title: 'thrust',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  0, type: 'cr'  } }, ],
                                      Smallsword        : [ { title: 'swing',   hands:  'dom', strength:  6, damage: { base: 'sw',  mods:  0, type: 'cr'  }, note: ["Fencing weapon (see Campaigns, pg. 404)"] },
                                                            { title: 'thrust',  hands:  'dom', strength:  6, damage: { base: 'thr', mods:  0, type: 'cr'  }, note: ["Fencing weapon (see Campaigns, pg. 404)"] }, ] };
Weapons.ShortStaff          = Weapons.Baton.clone();
Weapons.ShortStaff.name     = "staff";
Weapons.ShortStaff.detail = 'short';
Weapons.BillieClub          = Weapons.Baton.clone();
Weapons.BillieClub.name     = "billie club";
Weapons.LightClub       = new Weapon('club',                     3,     5,  0,  4,   -3, 'cr/imp', 'B271' );
Weapons.LightClub.detail = 'light';
Weapons.LightClub.wieldOptions    = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cr'  } },
                                                            { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'cr'  } } ] };
Weapons.SmallMace       = new Weapon('mace',                     3,    35,  2,  4,   -2, 'cr/imp', 'B271,276' );
Weapons.SmallMace.detail = 'small';
Weapons.SmallMace.wieldOptions    = { AxeMace           : [ { title: '',        hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cr'  }, note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa)."] } ],
                                   ThrownWeapon_AxeMace : [ { title: 'thrown',  hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cr'  }, rangeBasedOnST: true, halfDamageRange: 1, maximumRange: 1.5, accuracy: 1 } ] };
Weapons.Mace            = new Weapon('mace',                     5,    50,  2,  4,   -3, 'cr/imp', 'B271,276' );
Weapons.Mace.wieldOptions         = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cr'  }, note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa)."] } ],
                                   ThrownWeapon_AxeMace : [ { title: 'thrown',  hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cr'  }, rangeBasedOnST: true, halfDamageRange: 0.5, maximumRange: 1, accuracy: 1 } ] };
Weapons.Mace.maxTL = 4;
Weapons.Morningstar     = new Weapon('morningstar',              6,    80,  3,  4,   -4, 'cr/imp', 'B272' );
Weapons.Morningstar.wieldOptions  = { Flail             : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type: 'cr'  }, note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).","Attempts to <i>parry</i> flails are at -4, and fencing weapons (&ldquo;F&rdquo; parry) cannot parry at all! Attempts to <i>block</i> flails are at -2. A nunchaku is small, and gives half these penalties."] } ] };
Weapons.Kusari          = new Weapon('kusari',                   6,    80,  3,  4,   -4, 'cr/imp', 'B272' );
Weapons.Kusari.wieldOptions       = { Kusari            : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1-4', note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).","Requires a Ready maneuver to change reach.  Attempts to <i>parry</i> flails are at -4, and fencing weapons (&ldquo;F&rdquo; parry) cannot parry at all! Attempts to <i>block</i> flails are at -2. A nunchaku is small, and gives half these penalties."] } ] };
Weapons.Nunchaku        = new Weapon('nunchaku',                 2,    20,  3,  4,    0, 'cr/imp', 'B272' );
Weapons.Nunchaku.wieldOptions     = { Flail             : [ { title: '',        hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  1, type: 'cr'  }, note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).","Attempts to <i>parry</i> nunchaku are at -2, and fencing weapons (&ldquo;F&rdquo; parry) cannot parry at all! Attempts to <i>block</i> nunchaku are at -1."] } ] };
Weapons.Maul            = new Weapon('maul',                    12,    80,  0,  4,   -6, 'cr/imp', 'B274' );
Weapons.Maul.wieldOptions         = { TwoHandedAxeMace  : [ { title: '',        hands: 'both', strength: 13, damage: { base: 'sw',  mods:  4, type: 'cr'  }, note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).","Requires two hands <i>and</i> becomes unready after you attack with it, unless you have at least 1.5 times the listed ST (round <i>up</i>). To use it in one hand without it becoming unready, you need at least <i>three times</i> the listed ST."] } ] };
Weapons.Flail           = new Weapon('flail',                    8,   100,  2,  4,   -6, 'cr/imp', 'B274' );
Weapons.Flail.wieldOptions        = { TwoHandedFlail    : [ { title: '',        hands: 'both', strength: 13, damage: { base: 'sw',  mods:  4, type: 'cr'  }, note: ["Unbalanced: you cannot use it to parry if you have already used it to attack this turn (or vice versa).","Requires a Ready maneuver to change reach.  Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty.  Attempts to <i>parry</i> flails are at -4, and fencing weapons (&ldquo;F&rdquo; parry) cannot parry at all! Attempts to <i>block</i> flails are at -2."] } ] };

// muscle-powered ranged weapons     'name',                weight,  cost, TL, LC, bulk, qualEffGp
Weapons.Blowpipe        = new Weapon('blowpipe',                 1,    30,  0,  4,   -6, 'bow', 'B275');
Weapons.Blowpipe.wieldOptions     = { Blowpipe          : [ { title:  '',       hands: 'both', strength:  2, damage: { base:    1,  mods: -3, type: 'pi-' }, halfDamageRange:   u, maximumRange:   4, accuracy: 1, rateOfFire: 1, rangeBasedOnST: true, note: ["Follow-up drug or poison attack if damage penetrates DR. Effects depend on the poison used; see <i>Poison</i> (Basic Set: Campaigns p437).","Requires <i>two</i> hands to ready, but only <i>one</i> hand to attack.  Darts cost $0.10."] } ] };
Weapons.Blowpipe.shots = 1;
Weapons.Blowpipe.reload = 2;
Weapons.Blowpipe.maxTL = 4;
Weapons.Bow             = new Weapon('bow',                      2,   100,  0,  4,   -7, 'bow', 'B275' );
Weapons.Bow.wieldOptions          = { Bow               : [ { title:  '',       hands: 'both', strength: 10, damage: { base: 'thr', mods:  1, type: 'imp' }, halfDamageRange:  15, maximumRange:   20, accuracy: 2, maxDamage: '1d+4', rangeBasedOnST: true, note: ["Requires two hands. Arrows cost $2."] } ] };
Weapons.Bow.weaponST = true;
Weapons.Bow.shots = 1;
Weapons.Bow.reload = 2;
Weapons.ShortBow        = new Weapon('bow',                      2,   50,  0,  4,   -6, 'bow', 'B275');
Weapons.ShortBow.detail = 'short';
Weapons.ShortBow.wieldOptions     = { Bow               : [ { title:  '',       hands: 'both', strength:  7, damage: { base: 'thr', mods:  0, type: 'imp' }, halfDamageRange:  10, maximumRange:   15, accuracy: 1, rateOfFire: 1, rangeBasedOnST: true, note: ["Requires two hands. Arrows cost $2."] } ] };
Weapons.ShortBow.maxTL = 5;
Weapons.ShortBow.weaponST = true;
Weapons.ShortBow.shots = 1;
Weapons.ShortBow.reload = 2;
Weapons.Longbow         = new Weapon('longbow',                  3,   200,  0,  4,   -8, 'bow', 'B275' );
Weapons.Longbow.wieldOptions      = { Bow               : [ { title:  '',       hands: 'both', strength: 11, damage: { base: 'thr', mods:  2, type: 'imp' }, halfDamageRange:  15, maximumRange:   20, accuracy: 3, maxDamage: '1d+4', rangeBasedOnST: true, note: ["Requires two hands. Arrows cost $2."] } ] };
Weapons.Longbow.maxTL = 5;
Weapons.Longbow.weaponST = true;
Weapons.Longbow.shots = 1;
Weapons.Longbow.reload = 2;
Weapons.CompositeBow    = new Weapon('bow',                      4,   900,  1,  4,   -7, 'bow', 'B275' );
Weapons.CompositeBow.detail = 'composite';
Weapons.CompositeBow.wieldOptions = { Bow               : [ { title:  '',       hands: 'both', strength: 10, damage: { base: 'thr', mods:  3, type: 'imp' }, halfDamageRange:  20, maximumRange:   25, accuracy: 3, rangeBasedOnST: true, note: ["Requires two hands. Arrows cost $2."] } ] };
Weapons.CompositeBow.weaponST = true;
Weapons.CompositeBow.shots = 1;
Weapons.CompositeBow.reload = 2;
Weapons.Crossbow        = new Weapon('crossbow',                 6,   150,  2,  4,   -6, 'bow', 'B276' );
Weapons.Crossbow.wieldOptions     = { Crossbow          : [ { title:  '',       hands: 'both', strength:  7, damage: { base: 'thr', mods:  4, type: 'imp' }, halfDamageRange:  20, maximumRange:   25, accuracy: 4, rangeBasedOnST: true, note: ["Requires two hands. Bolts cost $2."] } ] };
Weapons.Crossbow.maxTL = 5;
Weapons.Crossbow.weaponST = true;
Weapons.Crossbow.shots = 1;
Weapons.Crossbow.reload = 4;
Weapons.PistolCrossbow  = new Weapon('crossbow',                 4,   150,  3,  4,   -4, 'bow', 'B276' );
Weapons.PistolCrossbow.detail = 'pistol';
Weapons.PistolCrossbow.wieldOptions = { Crossbow        : [ { title:  '',       hands:  'dom', strength:  7, damage: { base: 'thr', mods:  4, type: 'imp' }, halfDamageRange:  15, maximumRange:   20, accuracy: 1, rangeBasedOnST: true, note: ["Requires <i>two</i> hands to ready, but only <i>one</i> hand to attack.  Bolts cost $2."] } ] };
Weapons.PistolCrossbow.weaponST = true;
Weapons.PistolCrossbow.shots = 1;
Weapons.PistolCrossbow.reload = 4;
Weapons.Prodd           = new Weapon('prodd',                    6,   150,  3,  4,   -6, 'bow', 'B276' );
Weapons.Prodd.wieldOptions        = { Crossbow          : [ { title:  '',       hands: 'both', strength:  7, damage: { base: 'thr', mods:  4, type: 'pi'  }, halfDamageRange:  20, maximumRange:   25, accuracy: 2, rangeBasedOnST: true, note: ["Requires two hands. Pellets cost $0.10."] } ] };
Weapons.Prodd.weaponST = true;
Weapons.Prodd.shots = 1;
Weapons.Prodd.reload = 4;
// non-bow
Weapons.Shuriken        = new Weapon('shuriken',               0.1,     3,  3,  4,    0, 'other', 'B276' );
Weapons.Shuriken.wieldOptions     = { ThrownWeapon_Shuriken : [ { title: 'thrown',  hands: 'dom', strength:  5, damage: { base: 'thr', mods: -1, type: 'cut' }, rangeBasedOnST: true, halfDamageRange: 0.5, maximumRange:  1, accuracy: 1, note: [""] } ] };
Weapons.Shuriken.reload = 1;
Weapons.Bolas           = new Weapon('bolas',                    2,    20,  0,  4,   -2, 'other', 'B275');
Weapons.Bolas.wieldOptions        = { Bolas             : [ { title:  '',       hands: 'dom',  strength:  7, damage: { base: 'thr', mods: -1, type: 'cr'  }, halfDamageRange:   u, maximumRange:   3, rateOfFire: 1,  rangeBasedOnST: true, note: ["May entangle or ensnare the target; see <i>Special Ranged Weapons</i> (Basic Set: Campaigns p411)."] } ] };
Weapons.Sling           = new Weapon('sling',                  0.5,    20,  0,  4,    0, 'other', 'B276' );
Weapons.Sling.wieldOptions        = { Sling             : [ { title:  '',       hands: 'dom',  strength:  6, damage: { base: 'sw',  mods:  0, type: 'pi'  }, halfDamageRange:   6, maximumRange:   10,              rangeBasedOnST: true,  note: ["Can fire stones (TL0, free) or lead bullets (TL2, $0.10). Lead bullets give +1 damage and double range.","Requires <i>two</i> hands to ready, but only <i>one</i> hand to attack."] } ] };
Weapons.Sling.shots = 1;
Weapons.Sling.reload = 2;
Weapons.StaffSling      = new Weapon('sling',                    2,    20,  1,  4,   -6, 'other', 'B276' );
Weapons.StaffSling.detail = 'staff';
Weapons.StaffSling.wieldOptions   = { Sling             : [ { title:  '',       hands: 'dom',  strength:  7, damage: { base: 'sw',  mods:  1, type: 'pi'  }, halfDamageRange:  10, maximumRange:   15, accuracy: 1, rangeBasedOnST: true,  note: ["Can fire stones (TL0, free) or lead bullets (TL2, $0.10). Lead bullets give +1 damage and double range.","Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.StaffSling.shots = 1;
Weapons.StaffSling.reload = 2;
Weapons.Atlatl          = new Weapon( "atlatl",                  1,    20,  0,  4,   -3, 'other', 'B276' );
Weapons.Atlatl.wieldOptions       = { SpearThrower      : [ { title:'w/ javelin',hands: 'dom', strength:  6, damage: { base: 'sw',  mods:  1, type: 'imp' }, halfDamageRange:   2, maximumRange:    3, accuracy: 3, rangeBasedOnST: true,  note: ["Requires <i>two</i> hands to ready, but only <i>one</i> hand to attack."] },
                                                            { title:'w/ dart',   hands: 'dom', strength:  5, damage: { base: 'sw',  mods: -1, type: 'imp' }, halfDamageRange:   3, maximumRange:    4, accuracy: 1, rangeBasedOnST: true,  note: ["Requires <i>two</i> hands to ready, but only <i>one</i> hand to attack."] } ] };
Weapons.Atlatl.maxTL = 2;
Weapons.SpearThrower = Weapons.Atlatl.clone();    Weapons.SpearThrower.name = "spear thrower";
/* bows and crossbows Groups defined above BasicEquipment definitions */

// guns                                'name',                weight,  cost, TL, LC, bulk, qualEffGp
Weapons.FlintlockPistol51 = new Weapon('pistol',                   3,   200,  4,  3,   -3, 'gun', 'B278' );
Weapons.FlintlockPistol51.detail = '.51 flintlock';
Weapons.FlintlockPistol51.wieldOptions={Guns4_Pistol    : [ { title:  '',       hands:  'dom', strength: 10, damage: { base: 2,     mods: -1, type: 'pi+' }, halfDamageRange:  75, maximumRange:  450, accuracy: 1, rateOfFire: 1, recoil: 2 } ] };
Weapons.FlintlockPistol51.shots = 1;
Weapons.FlintlockPistol51.reload = 20;
Weapons.Derringer41       = new Weapon('Derringer',              0.5,   100,  5,  3,   -1, 'gun', 'B278' );
Weapons.Derringer41.detail = '.41';
Weapons.Derringer41.wieldOptions    = { Guns5_Pistol    : [ { title: '',        hands:  'dom', strength:  9, damage: { base: 1,     mods:  0, type: 'pi+' }, halfDamageRange:  80, maximumRange:  650, accuracy: 1, rateOfFire: 1, recoil: 2 } ] };
Weapons.Derringer41.maxTL = 6;
Weapons.Derringer41.shots = 2;
Weapons.Derringer41.reload = '3i';
Weapons.Revolver36        = new Weapon('revolver',              2.5,   150,  5,  3,   -2, 'gun', 'B278' );
Weapons.Revolver36.detail = '.36';
Weapons.Revolver36.wieldOptions     = { Guns5_Pistol    : [ { title: '',        hands:  'dom', strength: 10, damage: { base: 2,     mods: -1, type: 'pi'  }, halfDamageRange: 120, maximumRange: 1300, accuracy: 1, rateOfFire: 1, recoil: 2 } ] };
Weapons.Revolver36.shots = 6;
Weapons.Revolver36.reload = '3i';
Weapons.Revolver38      = new Weapon('revolver',                  2,   400,  6,  3,   -2, 'gun', 'B278' );
Weapons.Revolver38.detail = '.38';
Weapons.Revolver38.wieldOptions     = { Guns6_Pistol    : [ { title: '',        hands:  'dom', strength:  8, damage: { base: 2,     mods: -1, type: 'pi'  }, halfDamageRange: 120, maximumRange: 1500, accuracy: 2, rateOfFire: 3, recoil: 2 } ] };
Weapons.Revolver38.shots = 6;
Weapons.Revolver38.reload = '3i';
Weapons.AutoPistol9mmTL6  = new Weapon('pistol',                2.4,   350,  6,  3,   -2, 'gun', 'B278' );
Weapons.AutoPistol9mmTL6.detail = '9mm auto (TL6)';
Weapons.AutoPistol9mmTL6.wieldOptions={ Guns6_Pistol    : [ { title: '',        hands:  'dom', strength:  9, damage: { base: 2,     mods: 2,  type: 'pi'  }, halfDamageRange: 150, maximumRange: 1850, accuracy: 2, rateOfFire: 3,  recoil: 2 } ] };
Weapons.AutoPistol9mmTL6.maxTL = 6;
Weapons.AutoPistol9mmTL6.shots = '8+1';
Weapons.AutoPistol9mmTL6.reload = 3;
Weapons.AutoPistol9mmTL7  = new Weapon('pistol',                2.6,   600,  7,  3,   -2, 'gun', 'B278' );
Weapons.AutoPistol9mmTL7.detail = '9mm auto (TL7)';
Weapons.AutoPistol9mmTL7.wieldOptions={ Guns7_Pistol    : [ { title: '',        hands:  'dom', strength:  9, damage: { base: 2,     mods: 2,  type: 'pi'  }, halfDamageRange: 150, maximumRange: 1850, accuracy: 2, rateOfFire: 3,  recoil: 2 } ] };
Weapons.AutoPistol9mmTL7.maxTL = 8;
Weapons.AutoPistol9mmTL7.shots = '15+1';
Weapons.AutoPistol9mmTL7.reload = 3;
Weapons.AutoPistol9mmTL9    = new Weapon('pistol',                2,   800,  9,  3,   -2, 'gun', 'B278' );
Weapons.AutoPistol9mmTL9.detail = '9mm auto (TL9)';
Weapons.AutoPistol9mmTL9.wieldOptions={ Guns9_Pistol    : [ { title: '',        hands:  'dom', strength:  9, damage: { base: 2,     mods: 2,  type: 'pi'  }, halfDamageRange: 150, maximumRange: 1900, accuracy: 2, rateOfFire: 3,  recoil: 2, note: ["Includes &ldquo;smartgun&rdquo; electronics (see Campaigns, pg. 278)."] } ] };
Weapons.AutoPistol9mmTL9.maxTL = 9;
Weapons.AutoPistol9mmTL9.shots = '18+1';
Weapons.AutoPistol9mmTL9.reload = 3;
Weapons.AutoPistol44M     = new Weapon('pistol',                4.5,   750,  8,  3,   -3, 'gun', 'B278' );
Weapons.AutoPistol44M.detail = '.44M auto';
Weapons.AutoPistol44M.wieldOptions  = { Guns8_Pistol    : [ { title:  '',       hands:  'dom', strength: 12, damage: { base: 3,     mods:  0, type: 'pi+' }, halfDamageRange: 230, maximumRange: 2500, accuracy: 2, rateOfFire: 3, recoil: 4 } ] };
Weapons.AutoPistol44M.shots = '9+1';
Weapons.AutoPistol44M.reload = 3;
Weapons.BoltActionRifle   = new Weapon('rifle',                 8.9,   350,  6,  3,   -5, 'gun', 'B279' );
Weapons.BoltActionRifle.detail = '7.62mm bolt-action';
Weapons.BoltActionRifle.wieldOptions= { Guns6_Rifle     : [ { title:  '',       hands: 'both', strength: 10, damage: { base: 7,      mods: 0, type: 'pi'  }, halfDamageRange: 1000, maximumRange: 4200, accuracy: 5, rateOfFire: 1, recoil: 4, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.BoltActionRifle.shots = '5+1';
Weapons.BoltActionRifle.reload = 3;
Weapons.FlintlockMusket75 = new Weapon('musket',                 13,   200,  4,  4,   -6, 'gun', 'B279' );
Weapons.FlintlockMusket75.detail = '.75 flintlock';
Weapons.FlintlockMusket75.wieldOptions={Guns4_Musket    : [ { title:  '',       hands: 'both', strength: 10, damage: { base: 4,     mods:  0, type: 'pi++'}, halfDamageRange:100,  maximumRange: 1500, accuracy: 2, rateOfFire: 1, recoil: 4 } ] };
Weapons.FlintlockMusket75.shots = 1;
Weapons.FlintlockMusket75.reload = 15;

// grenades, etc.
Weapons.grenadeBP           = new Weapon('grenade',                1,     5,  5,  2,   -2,  u, 'B277');
Weapons.grenadeBP.detail = 'black powder';
Weapons.grenadeBP.wieldOptions      = { Throwing        : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 3,      mods: 0, type: 'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 3-5 sec','explosive damage 1d frag.','Takes a Ready maneuver to light the fuse (impossible in rain, etc.) - or <i>five</i> Ready maneuvers if you must insert the fuse first! A Molotov cocktail shatters on impact; a black-powder grenade detonates 3-5 seconds later, depending on fuse length.'] } ] };
Weapons.grenadeConcussionTL6        = new Weapon('grenade',        1,    15,  6,  2,   -2,  u, 'B277');
Weapons.grenadeConcussionTL6.detail = 'TL6 concussion';
Weapons.grenadeConcussionTL6.wieldOptions={Throwing     : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 6,      mods: 0, type: 'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 4 sec','explosive damage','Takes one Ready maneuver to draw the grenade and a second Ready maneuver to pull the pin. Detonates 2-4 seconds later, depending on grenade type.'] } ] };
Weapons.grenadeFragmentationTL6     = new Weapon('grenade',        1,    10,  6,  2,   -2,  u, 'B277');
Weapons.grenadeFragmentationTL6.detail = 'TL6 fragmentation';
Weapons.grenadeFragmentationTL6.wieldOptions={Throwing  : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 4,      mods: 0, type: 'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 4 sec','explosive damage 2d frag.','Takes one Ready maneuver to draw the grenade and a second Ready maneuver to pull the pin. Detonates 2-4 seconds later, depending on grenade type.'] } ] };
Weapons.MolotovCocktail             = new Weapon('molotov cocktail',1,    2,  6,  3,   -2,  u, 'B277');
Weapons.MolotovCocktail.wieldOptions= { Throwing        : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: u,      mods: 0, type:'spec'}, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: special','Takes a Ready maneuver to light the fuse (impossible in rain, etc.) - or <i>five</i> Ready maneuvers if you must insert the fuse first! A Molotov cocktail shatters on impact; a black-powder grenade detonates 3-5 seconds later, depending on fuse length.'] } ] };
Weapons.grenadeChemical             = new Weapon('grenade',        1,    10,  7,  3,   -2,  u, 'B277');
Weapons.grenadeChemical.detail = 'chemical';
Weapons.grenadeChemical.wieldOptions= { Throwing        : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: u,      mods: 0, type:'spec'}, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 2 sec','Takes one Ready maneuver to draw the grenade and a second Ready maneuver to pull the pin. Detonates 2-4 seconds later, depending on grenade type.','Fills a 2-yard radius with smoke, tear gas, etc.; see <i>Poison Examples</i> (p. 439). The cloud lasts about 80 seconds under normal conditions. Exotic chemicals may cost more or have a lower LC.'] } ] };
Weapons.grenadeConcussionTL7        = new Weapon('grenade',        1,    40,  7,  2,   -2,  u, 'B277');
Weapons.grenadeConcussionTL7.detail = 'TL7 concussion';
Weapons.grenadeConcussionTL7.wieldOptions={Throwing     : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 5,      mods: 0, type: 'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 4 sec','damage x2','explosive damage','Takes one Ready maneuver to draw the grenade and a second Ready maneuver to pull the pin. Detonates 2-4 seconds later, depending on grenade type.'] } ] };
Weapons.grenadeFragmentationTL7     = new Weapon('grenade',        1,    40,  7,  2,   -2,  u, 'B277');
Weapons.grenadeFragmentationTL7.detail = 'TL7 fragmentation';
Weapons.grenadeFragmentationTL7.wieldOptions={Throwing  : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 8,      mods: 0, type: 'cr' }, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 4 sec','explosive damage 3d frag.','Takes one Ready maneuver to draw the grenade and a second Ready maneuver to pull the pin. Detonates 2-4 seconds later, depending on grenade type.'] } ] };
Weapons.grenadeStun                 = new Weapon('grenade',        1,    40,  8,  2,   -2,  u, 'B277');
Weapons.grenadeStun.detail = 'stun';
Weapons.grenadeStun.wieldOptions = { Throwing           : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: u,      mods: 0, type:'spec'}, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 2 sec','Takes one Ready maneuver to draw the grenade and a second Ready maneuver to pull the pin. Detonates 2-4 seconds later, depending on grenade type.','A Vision and Hearing-Based affliction that affects a 10-yard radius. The Protected Hearing and Protected Vision advantages each give +5 to the HT roll. If you fail to resist, you are stunned; roll against HT-5 to recover each turn. Also creates smoke in the area of effect.'] } ] };
Weapons.grenadePlasma               = new Weapon('grenade',        1,   100,  9,  1,   -2,  u, 'B277');
Weapons.grenadePlasma.detail = 'plasma';
Weapons.grenadePlasma.wieldOptions = { Throwing         : [ { title: 'thrown',  hands:  'dom', strength:  1, damage: { base: 6,      mods: 0, type:'burn'}, halfDamageRange:   u, maximumRange: 3.5, rangeBasedOnST: true, note: ['fuse: 2 sec','damage x4','explosive damage','Takes one Ready maneuver to draw the grenade and a second Ready maneuver to pull the pin. Detonates 2-4 seconds later, depending on grenade type.'] } ] };

Weapons.WheelLockPistol60   = new Weapon('pistol', 3.25, 200, 4, 3, -3, 'gun', 'B278' );
Weapons.WheelLockPistol60.detail = '.60 wheel-lock';
Weapons.WheelLockPistol60.wieldOptions  = { Guns4_Pistol : [ { strength: 10, damage: { base: 1, mods: 1, type: 'pi+' }, halfDamageRange: 75, maximumRange: 400, accuracy: 1, rateOfFire: 1,  recoil: 2 } ] };
Weapons.WheelLockPistol60.shots = 1;
Weapons.WheelLockPistol60.reload = 20;
Weapons.AutoPistol45    = new Weapon('pistol', 3, 300, 6, 3, -2, 'gun', 'B278' );
Weapons.AutoPistol45.detail = '.45 auto';
Weapons.AutoPistol45.wieldOptions   = { Guns6_Pistol : [ { strength: 10, damage: { base: 2, mods: 0, type: 'pi+' }, halfDamageRange: 175, maximumRange: 1700, accuracy: 2, rateOfFire: 3,  recoil: 3 } ] };
Weapons.AutoPistol45.shots = '7+1';
Weapons.AutoPistol45.reload = 3;
Weapons.SnubRevolver38  = new Weapon('revolver', 1.5, 250, 6, 3, -1, 'gun', 'B278' );
Weapons.SnubRevolver38.detail = '.38 snub';
Weapons.SnubRevolver38.wieldOptions = { Guns6_Pistol : [ { strength: 8, damage: { base: 1, mods: 2, type: 'pi' }, halfDamageRange: 120, maximumRange: 1250, accuracy: 1, rateOfFire: 3,  recoil: 3 } ] };
Weapons.SnubRevolver38.shots = 5;
Weapons.SnubRevolver38.reload = '3i';
Weapons.HoldoutPistol380    = new Weapon('pistol', 1.3, 300, 7, 3, -1, 'gun', 'B278' );
Weapons.HoldoutPistol380.detail = 'Holdout';
Weapons.HoldoutPistol380.detail = '.380';
Weapons.HoldoutPistol380.wieldOptions   = { Guns7_Pistol : [ { strength: 8, damage: { base: 2, mods: 0, type: 'pi' }, halfDamageRange: 125, maximumRange: 1500, accuracy: 1, rateOfFire: 3,  recoil: 3 } ] };
Weapons.HoldoutPistol380.shots = '5+1';
Weapons.HoldoutPistol380.reload = 3;
Weapons.Revolver357M    = new Weapon('revolver', 3, 500, 7, 3, -2, 'gun', 'B278' );
Weapons.Revolver357M.detail = '.357M';
Weapons.Revolver357M.wieldOptions   = { Guns7_Pistol : [ { strength: 10, damage: { base: 3, mods: -1, type: 'pi' }, halfDamageRange: 185, maximumRange: 2000, accuracy: 2, rateOfFire: 3,  recoil: 3 } ] };
Weapons.Revolver357M.shots = 6;
Weapons.Revolver357M.reload = '3i';
Weapons.Revolver44M = new Weapon('revolver', 3.25, 900, 7, 3, -3, 'gun', 'B278' );
Weapons.Revolver44M.detail = '.44M';
Weapons.Revolver44M.wieldOptions    = { Guns7_Pistol : [ { strength: 11, damage: { base: 3, mods: 0, type: 'pi+' }, halfDamageRange: 200, maximumRange: 2500, accuracy: 2, rateOfFire: 3,  recoil: 4 } ] };
Weapons.Revolver44M.shots = 6;
Weapons.Revolver44M.reload = '3i';
Weapons.AutoPistol40    = new Weapon('pistol', 2.1, 640, 8, 3, -2, 'gun', 'B278' );
Weapons.AutoPistol40.detail = '.40 auto';
Weapons.AutoPistol40.wieldOptions   = { Guns8_Pistol : [ { strength: 9, damage: { base: 2, mods: 0, type: 'pi+' }, halfDamageRange: 150, maximumRange: 1900, accuracy: 2, rateOfFire: 3,  recoil: 2 } ] };
Weapons.AutoPistol40.shots = '15+1';
Weapons.AutoPistol40.reload = 3;
Weapons.GyrocPistol15mm = new Weapon('pistol', 1, 200, 9, 3, -2, 'gun', 'B278' );
Weapons.GyrocPistol15mm.detail = '15mm gyroc';
Weapons.GyrocPistol15mm.wieldOptions    = { Guns9_Gyroc : [ { strength: 9, damage: { base: 6, mods: 0, type: 'pi++' }, maximumRange: 1900, accuracy: 1, rateOfFire: 3,  recoil: 1, note: ["Includes &ldquo;smartgun&rdquo; electronics (see Campaigns, pg. 278).","Rockets take time to accelerate. Divide damage by 3 at 1-2 yards, and by 2 at 3-10 yards."] } ] };
Weapons.GyrocPistol15mm.shots = 4;
Weapons.GyrocPistol15mm.reload = '3i';
Weapons.SMG45   = new Weapon('SMG', 15.7, 2200, 6, 2, -4, 'gun', 'B278' );
Weapons.SMG45.detail = '.45';
Weapons.SMG45.wieldOptions  = { Guns6_SMG : [ { hands: 'both', strength: 11, damage: { base: 2, mods: 1, type: 'pi+' }, halfDamageRange: 190, maximumRange: 1750, accuracy: 3, rateOfFire: 13,  recoil: 3, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.SMG45.shots = '50+1';
Weapons.SMG45.reload = 5;
Weapons.SMG9mmTL6  = new Weapon('SMG', 10.5, 700, 6, 2, -4, 'gun', 'B278' );
Weapons.SMG9mmTL6.detail = '9mm (TL6)';
Weapons.SMG9mmTL6.wieldOptions = { Guns6_SMG : [ { hands: 'both', strength: 10, damage: { base: 3, mods: -1, type: 'pi' }, halfDamageRange: 160, maximumRange: 1900, accuracy: 3, rateOfFire: 8,  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.SMG9mmTL6.shots = 32;
Weapons.SMG9mmTL6.reload = 3;
Weapons.MachinePistol9mm    = new Weapon('pistol', 5.5, 900, 7, 2, -3, 'gun', 'B278');
Weapons.MachinePistol9mm.detail = '9mm machine';
Weapons.MachinePistol9mm.wieldOptions   = { Guns7_SMG : [ { strength: 12, damage: { base: 2, mods: 2, type: 'pi' }, halfDamageRange: 160, maximumRange: 1900, accuracy: 2, rateOfFire: 20,  recoil: 3, note: ["Civilian semi-automatic version is RoF 3, -25% to cost, and +1 to LC."] } ] };
Weapons.MachinePistol9mm.shots = '25+1';
Weapons.MachinePistol9mm.reload = 3;
Weapons.SMG9mmTL7  = new Weapon('SMG', 7.5, 1200, 7, 2, -4, 'gun', 'B278');
Weapons.SMG9mmTL7.detail = '9mm (TL7)';
Weapons.SMG9mmTL7.wieldOptions = { Guns7_SMG : [ { hands: 'both', strength: 10, damage: { base: 3, mods: -1, type: 'pi' }, halfDamageRange: 160, maximumRange: 1900, accuracy: 4, rateOfFire: 13,  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.SMG9mmTL7.shots = '30+1';
Weapons.SMG9mmTL7.reload = 3;
Weapons.PDW46mm = new Weapon('PDW', 3.9, 800, 8, 2, -3, 'gun', 'B278');
Weapons.PDW46mm.detail = '4.6mm';
Weapons.PDW46mm.wieldOptions    = { Guns8_SMG : [ { hands: 'both', strength: 7, damage: { base: 4, mods: 1, type: 'pi-' }, halfDamageRange: 200, maximumRange: 2000, accuracy: 3, rateOfFire: 15,  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.PDW46mm.shots = '20+1';
Weapons.PDW46mm.reload = 3;
Weapons.GaussPDW4mm = new Weapon('PDW', 4.6, 3600, 10, 2, -3, 'gun', 'B278');
Weapons.GaussPDW4mm.detail = '4mm gauss';
Weapons.GaussPDW4mm.wieldOptions    = { Guns10_SMG : [ { hands: 'both', strength: 9, damage: { base: 4, mods: 0, type: 'pi-' }, halfDamageRange: 700, maximumRange: 2900, accuracy: '6+1', rateOfFire: 16,  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.GaussPDW4mm.shots = 80;
Weapons.GaussPDW4mm.reload = 3;
Weapons.Handgonne90 = new Weapon('handgonne', 15, 300, 3, 3, -6, 'gun', 'B279');
Weapons.Handgonne90.detail = '.90';
Weapons.Handgonne90.wieldOptions    = { Guns3_Musket : [ { hands: 'both', strength: 10, damage: { base: 2, mods: 0, type: 'pi++' }, halfDamageRange: 100, maximumRange: 600, accuracy: 0, rateOfFire: 1,  recoil: 4, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.Handgonne90.shots = 1;
Weapons.Handgonne90.reload = 60;
Weapons.MatchlockMusket80   = new Weapon('musket', 20, 150, 4, 4, -6, 'gun', 'B279');
Weapons.MatchlockMusket80.detail = 'matchlock .80';
Weapons.MatchlockMusket80.wieldOptions  = { Guns4_Musket : [ { hands: 'both', strength: 10, damage: { base: 4, mods: 0, type: 'pi++' }, halfDamageRange: 100, maximumRange: 600, accuracy: 2, rateOfFire: 1,  recoil: 3, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Firearm uses a musket rest. The weapon’s weight <i>includes</i> that of the rest. It takes a Ready maneuver to balance the weapon on the rest – but after that, any aimed shot fired while stationary and standing up is automatically braced (see <i>Aim</i>, Campaigns, pg. 364)."] } ] };
Weapons.MatchlockMusket80.shots = 1;
Weapons.MatchlockMusket80.reload = 60;
Weapons.RifleMusket577  = new Weapon('rifle-musket', 8.5, 150, 5, 3, -6, 'gun', 'B279');
Weapons.RifleMusket577.detail = '.577';
Weapons.RifleMusket577.wieldOptions = { Guns5_Rifle : [ { hands: 'both', strength: 10, damage: { base: 4, mods: 0, type: 'pi+' }, halfDamageRange: 700, maximumRange: 2100, accuracy: 4, rateOfFire: 1,  recoil: 3, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.RifleMusket577.shots = 1;
Weapons.RifleMusket577.reload = 15;
Weapons.CartridgeRifle45    = new Weapon('rifle', 6, 200, 5, 3, -6, 'gun', 'B279');
Weapons.CartridgeRifle45.detail = '.45 cartridge';
Weapons.CartridgeRifle45.wieldOptions   = { Guns5_Rifle : [ { hands: 'both', strength: 10, damage: { base: 5, mods: 0, type: 'pi+' }, halfDamageRange: 600, maximumRange: 2000, accuracy: 3, rateOfFire: 1,  recoil: 3, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.CartridgeRifle45.shots = 1;
Weapons.CartridgeRifle45.reload = 4;
Weapons.LeverActionCarbine30    = new Weapon('carbine', 7, 300, 5, 3, -4, 'gun', 'B279');
Weapons.LeverActionCarbine30.detail = '.30 lever-action';
Weapons.LeverActionCarbine30.wieldOptions   = { Guns5_Rifle : [ { hands: 'both', strength: 10, damage: { base: 5, mods: 0, type: 'pi' }, halfDamageRange: 450, maximumRange: 3000, accuracy: 4, rateOfFire: 1,  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.LeverActionCarbine30.maxTL = 6;
Weapons.LeverActionCarbine30.shots = '6+1';
Weapons.LeverActionCarbine30.reload = '3i';
Weapons.SelfLoadingRifle762mm   = new Weapon('rifle', 10, 600, 6, 3, -5, 'gun', 'B279');
Weapons.SelfLoadingRifle762mm.detail = '7.62mm self-loading';
Weapons.SelfLoadingRifle762mm.wieldOptions  = { Guns6_Rifle : [ { hands: 'both', strength: 10, damage: { base: 7, mods: 0, type: 'pi' }, halfDamageRange: 1000, maximumRange: 4200, accuracy: 5, rateOfFire: 3,  recoil: 3, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.SelfLoadingRifle762mm.maxTL = 7;
Weapons.SelfLoadingRifle762mm.shots = 8;
Weapons.SelfLoadingRifle762mm.reload = 3;
Weapons.AssaultRifle556mm   = new Weapon('rifle', 9, 800, 7, 2, -4, 'gun', 'B279');
Weapons.AssaultRifle556mm.detail = '5.56mm assault';
Weapons.AssaultRifle556mm.wieldOptions  = { Guns7_Rifle : [ { hands: 'both', strength: 9, damage: { base: 5, mods: 0, type: 'pi' }, halfDamageRange: 500, maximumRange: 3500, accuracy: 5, rateOfFire: 12,  recoil: 2, note: ["Civilian semi-automatic version is RoF 3, -25% to cost, and +1 to LC.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.AssaultRifle556mm.shots = '30+1';
Weapons.AssaultRifle556mm.reload = 3;
Weapons.AssaultRifle762mmS  = new Weapon('rifle', 10.5, 300, 7, 2, -4, 'gun', 'B279');
Weapons.AssaultRifle762mmS.detail = '7.62mmS assault';
Weapons.AssaultRifle762mmS.wieldOptions = { Guns7_Rifle : [ { hands: 'both', strength: 10, damage: { base: 5, mods: 1, type: 'pi' }, halfDamageRange: 400, maximumRange: 3000, accuracy: 4, rateOfFire: 10,  recoil: 2, note: ["Civilian semi-automatic version is RoF 3, -25% to cost, and +1 to LC.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.AssaultRifle762mmS.shots = '30+1';
Weapons.AssaultRifle762mmS.reload = 3;
Weapons.BattleRifle762mm    = new Weapon('rifle', 11, 900, 7, 2, -5, 'gun', 'B279');
Weapons.BattleRifle762mm.detail = '7.62mm battle';
Weapons.BattleRifle762mm.wieldOptions   = { Guns7_Rifle : [ { hands: 'both', strength: 11, damage: { base: 7, mods: 0, type: 'pi' }, halfDamageRange: 1000, maximumRange: 4200, accuracy: 5, rateOfFire: 11,  recoil: 3, note: ["Civilian semi-automatic version is RoF 3, -25% to cost, and +1 to LC.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.BattleRifle762mm.shots = '20+1';
Weapons.BattleRifle762mm.reload = 3;
Weapons.AssaultCarbine556mm = new Weapon('carbine', 7.3, 900, 8, 2, -3, 'gun', 'B279');
Weapons.AssaultCarbine556mm.detail = '5.56mm assault';
Weapons.AssaultCarbine556mm.wieldOptions    = { Guns8_Rifle : [ { hands: 'both', strength: 9, damage: { base: 4, mods: 2, type: 'pi' }, halfDamageRange: 400, maximumRange: 3000, accuracy: 4, rateOfFire: 15,  recoil: 2, note: ["Civilian semi-automatic version is RoF 3, -25% to cost, and +1 to LC.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.AssaultCarbine556mm.shots = '30+1';
Weapons.AssaultCarbine556mm.reload = 3;
Weapons.DartRifle11mm   = new Weapon('rifle', 6.6, 1200, 8, 4, -5, 'gun', 'B279');
Weapons.DartRifle11mm.detail = '11mm dart';
Weapons.DartRifle11mm.wieldOptions  = { Guns8_Rifle : [ { hands: 'both', strength: 9, damage: { base: 1, mods: 0, type: 'pi-' }, halfDamageRange: 45, maximumRange: 145, accuracy: '5+1', rateOfFire: 1,  recoil: 2, note: ["If damage penetrates DR, the dart injects a drug or poison as a follow-up attack. For a tranquilizer dart, roll vs. HT-3; failure results in unconsciousness for minutes equal to the margin of failure.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.DartRifle11mm.shots = 1;
Weapons.DartRifle11mm.reload = 3;
Weapons.SniperRifle338  = new Weapon('rifle', 17.5, 5600, 8, 3, -6, 'gun', 'B279');
Weapons.SniperRifle338.detail = '.338 sniper';
Weapons.SniperRifle338.wieldOptions = { Guns8_Rifle : [ { hands: 'both', strength: 11, damage: { base: 9, mods: 1, type: 'pi' }, halfDamageRange: 1500, maximumRange: 5500, accuracy: '6+3', rateOfFire: 1,  recoil: 4, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Firearm with an attached bipod. When firing from a prone position using the bipod, treat the weapon as if it were braced <i>and</i> reduce its ST requirement to 2/3 of the listed value (round <i>up</i>); <i>e.g.</i>, ST 13 becomes ST 9."] } ] };
Weapons.SniperRifle338.shots = '4+1';
Weapons.SniperRifle338.reload = 3;
Weapons.ICW68mm = new Weapon('ICW', 12, 7000, 9, 1, -5, 'gun', 'B279');
Weapons.ICW68mm.detail = '6.8mm';
Weapons.ICW68mm.wieldOptions    = { Guns9_Rifle : [ { hands: 'both', strength: 10, damage: { base: 6, mods: 0, type: 'pi' }, halfDamageRange: 700, maximumRange: 4000, accuracy: '4+2', rateOfFire: 15,  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.ICW68mm.shots = '25+1';
Weapons.ICW68mm.reload = 3;
Weapons.GaussRifle4mm   = new Weapon('rifle', 8.5, 7100, 10, 2, -4, 'gun', 'B279');
Weapons.GaussRifle4mm.detail = '4mm gauss';
Weapons.GaussRifle4mm.wieldOptions  = { Guns10_Rifle : [ { hands: 'both', strength: 10, damage: { base: 6, mods: 2, type: 'pi-' }, halfDamageRange: 1200, maximumRange: 4800, accuracy: '7+2', rateOfFire: 12,  recoil: 2, note: ["Includes &ldquo;smartgun&rdquo; electronics (see Campaigns, pg. 278).", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.GaussRifle4mm.shots = 60;
Weapons.GaussRifle4mm.reload = 3;
Weapons.Blunderbuss8G   = new Weapon('blunderbuss', 12, 150, 4, 4, -5, 'gun', 'B279');
Weapons.Blunderbuss8G.detail = '8G';
Weapons.Blunderbuss8G.wieldOptions  = { Guns4_Shotgun : [ { hands: 'both', strength: 11, damage: { base: 1, mods: 0, type: 'pi' }, halfDamageRange: 15, maximumRange: 100, accuracy: 1, rateOfFire: '1×9',  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.Blunderbuss8G.shots = 1;
Weapons.Blunderbuss8G.reload = 15;
Weapons.DoubleShotgun10G    = new Weapon('shotgun', 10, 450, 5, 4, -5, 'gun', 'B279');
Weapons.DoubleShotgun10G.detail = '10G double';
Weapons.DoubleShotgun10G.wieldOptions   = { Guns5_Shotgun : [ { hands: 'both', strength: 11, damage: { base: 1, mods: 2, type: 'pi' }, halfDamageRange: 50, maximumRange: 125, accuracy: 3, rateOfFire: '2×9',  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.DoubleShotgun10G.shots = 2;
Weapons.DoubleShotgun10G.reload = '3i';
Weapons.PumpShotgun12G  = new Weapon('shotgun', 8, 240, 6, 4, -5, 'gun', 'B279');
Weapons.PumpShotgun12G.detail = '12G pump';
Weapons.PumpShotgun12G.wieldOptions = { Guns6_Shotgun : [ { hands: 'both', strength: 10, damage: { base: 1, mods: 1, type: 'pi' }, halfDamageRange: 50, maximumRange: 125, accuracy: 3, rateOfFire: '2×9',  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.PumpShotgun12G.maxTL = 8;
Weapons.PumpShotgun12G.shots = 5;
Weapons.PumpShotgun12G.reload = '3i';
Weapons.AutoShotgun12G  = new Weapon('shotgun', 8.4, 950, 7, 3, -5, 'gun', 'B279');
Weapons.AutoShotgun12G.detail = '12G auto';
Weapons.AutoShotgun12G.wieldOptions = { Guns7_Shotgun : [ { hands: 'both', strength: 10, damage: { base: 1, mods: 1, type: 'pi' }, halfDamageRange: 50, maximumRange: 125, accuracy: 3, rateOfFire: '3×9',  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.AutoShotgun12G.shots = '6+1';
Weapons.AutoShotgun12G.reload = '3i';
Weapons.ElectrolaserPistol  = new Weapon('pistol', 2.2, 1800, 9, 4, -2, 'gun', 'B280');
Weapons.ElectrolaserPistol.detail = 'electrolaser';
Weapons.ElectrolaserPistol.wieldOptions = { BeamWeapons9_Pistol : [ { strength: 4, damage: { base: 1, mods: -3, type: 'burn' }, halfDamageRange: 40, maximumRange: 80, accuracy: 4, rateOfFire: 3,  recoil: 1, note: ["Weapon requires atmosphere to function. No effect in trace atmosphere or vacuum!", "Burn damage has the Surge damage modifier (Campaigns, pg. 105). As well, whether or not any damage penetrates, the target must make a HT roll at -4, plus half the DR on the location struck (due to the armor divisor). On a failure, the electrical shock stuns him. He may roll against HT every turn at the same penalty (but without the DR bonus) to recover.", "Smoke, fog, rain, cloud, etc. give the target additional DR equal to the visibility penalty. For instance, if rain gives a penalty of -1 per 100 yards, a laser firing through 2,000 yards of rain must penetrate an extra DR 20."] } ] };
Weapons.ElectrolaserPistol.shots = 180;
Weapons.ElectrolaserPistol.reload = 3;
Weapons.LaserPistol = new Weapon('pistol', 3.3, 2800, 10, 3, -2, 'gun', 'B280');
Weapons.LaserPistol.detail = 'laser';
Weapons.LaserPistol.wieldOptions    = { BeamWeapons10_Pistol : [ { strength: 6, damage: { base: 3, mods: 0, type: 'burn' }, halfDamageRange: 250, maximumRange: 750, accuracy: 6, rateOfFire: 10,  recoil: 1, note: ["Smoke, fog, rain, cloud, etc. give the target additional DR equal to the visibility penalty. For instance, if rain gives a penalty of -1 per 100 yards, a laser firing through 2,000 yards of rain must penetrate an extra DR 20."] } ] };
Weapons.LaserPistol.shots = 400;
Weapons.LaserPistol.reload = 3;
Weapons.BlasterPistol   = new Weapon('pistol', 1.6, 2200, 11, 3, -2, 'gun', 'B280');
Weapons.BlasterPistol.detail = 'blaster';
Weapons.BlasterPistol.wieldOptions  = { BeamWeapons11_Pistol : [ { strength: 4, damage: { base: 3, mods: 0, type: 'burn' }, halfDamageRange: 300, maximumRange: 900, accuracy: 5, rateOfFire: 3,  recoil: 1, note: ["Burn damage has the Surge damage modifier (Campaigns, pg. 105).","In superscience games, an &ldquo;omni-blaster&rdquo; costs twice as much, but has a &ldquo;stun&rdquo; setting: damage becomes HT-3(3) aff for a pistol, HT-6(3) aff for a rifle. On a failed HT roll, the victim is unconsciousness for minutes equal to his margin of failure."] } ] };
Weapons.BlasterPistol.shots = 200;
Weapons.BlasterPistol.reload = 3;
Weapons.ElectrolaserCarbine = new Weapon('carbine', 3.7, 3900, 9, 3, -4, 'gun', 'B280');
Weapons.ElectrolaserCarbine.detail = 'electrolaser';
Weapons.ElectrolaserCarbine.wieldOptions    = { BeamWeapons9_Rifle : [ { hands: 'both', strength: 4, damage: { base: 1, mods: -3, type: 'burn' }, halfDamageRange: 160, maximumRange: 470, accuracy: '8+1', rateOfFire: 3,  recoil: 1, note: ["Weapon requires atmosphere to function. No effect in trace atmosphere or vacuum!", "Burn damage has the Surge damage modifier (Campaigns, pg. 105). As well, whether or not any damage penetrates, the target must make a HT roll at -4, plus half the DR on the location struck (due to the armor divisor). On a failure, the electrical shock stuns him. He may roll against HT every turn at the same penalty (but without the DR bonus) to recover.", "Smoke, fog, rain, cloud, etc. give the target additional DR equal to the visibility penalty. For instance, if rain gives a penalty of -1 per 100 yards, a laser firing through 2,000 yards of rain must penetrate an extra DR 20.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.ElectrolaserCarbine.shots = 360;
Weapons.ElectrolaserCarbine.reload = 3;
Weapons.LaserSniperRifle = new Weapon('rifle', 20, 20000, 9, 1, -8, 'gun', 'B280');
Weapons.LaserSniperRifle.detail = 'laser sniper';
Weapons.LaserSniperRifle.wieldOptions   = { BeamWeapons9_Rifle : [ { hands: 'both', strength: 10, damage: { base: 5, mods: 0, type: 'burn' }, halfDamageRange: 1100, maximumRange: 3300, accuracy: '12+2', rateOfFire: 3,  recoil: 1, note: ["Smoke, fog, rain, cloud, etc. give the target additional DR equal to the visibility penalty. For instance, if rain gives a penalty of -1 per 100 yards, a laser firing through 2,000 yards of rain must penetrate an extra DR 20.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.LaserSniperRifle.shots = 75;
Weapons.LaserSniperRifle.reload = 3;
Weapons.LaserRifle  = new Weapon('rifle', 10, 10000, 10, 2, -4, 'gun', 'B280');
Weapons.LaserRifle.detail = 'laser';
Weapons.LaserRifle.wieldOptions = { BeamWeapons10_Rifle : [ { hands: 'both', strength: 7, damage: { base: 5, mods: 0, type: 'burn' }, halfDamageRange: 700, maximumRange: 2100, accuracy: '12+2', rateOfFire: 10,  recoil: 1, note: ["Smoke, fog, rain, cloud, etc. give the target additional DR equal to the visibility penalty. For instance, if rain gives a penalty of -1 per 100 yards, a laser firing through 2,000 yards of rain must penetrate an extra DR 20.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.LaserRifle.shots = 150;
Weapons.LaserRifle.reload = 3;
Weapons.BlasterRifle    = new Weapon('rifle', 10, 18000, 11, 2, -4, 'gun', 'B280');
Weapons.BlasterRifle.detail = 'blaster';
Weapons.BlasterRifle.wieldOptions   = { BeamWeapons11_Rifle : [ { hands: 'both', strength: 7, damage: { base: 6, mods: 0, type: 'burn' }, halfDamageRange: 700, maximumRange: 2100, accuracy: '10+2', rateOfFire: 3,  recoil: 1, note: ["Burn damage has the Surge damage modifier (Campaigns, pg. 105).", "In superscience games, an &ldquo;omni-blaster&rdquo; costs twice as much, but has a &ldquo;stun&rdquo; setting: damage becomes HT-3(3) aff for a pistol, HT-6(3) aff for a rifle. On a failed HT roll, the victim is unconsciousness for minutes equal to his margin of failure.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.BlasterRifle.shots = 50;
Weapons.BlasterRifle.reload = 3;
Weapons.HeavyBlaster    = new Weapon('heavy blaster', 20, 23000, 11, 1, -6, 'gun', 'B280');
Weapons.HeavyBlaster.wieldOptions   = { BeamWeapons11_Rifle : [ { hands: 'both', strength: 10, damage: { base: 8, mods: 0, type: 'burn' }, halfDamageRange: 900, maximumRange: 2700, accuracy: '10+4', rateOfFire: 3,  recoil: 1, note: ["Burn damage has the Surge damage modifier (Campaigns, pg. 105).", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.HeavyBlaster.shots = 90;
Weapons.HeavyBlaster.reload = 5;

Weapons.ATGM115mm   = new Weapon('ATGM', 37, 20000, 7, 1, -10, 'gun', 'B281');
Weapons.ATGM115mm.detail = '115mm';
Weapons.ATGM115mm.wieldOptions  = { Artillery7_GuidedMissile : [ { hands: 'both', strength: 11, damage: { base: 6, mods: 0, type: 'cr' }, halfDamageRange: 200, maximumRange: 2000, accuracy: 3, rateOfFire: 1,  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Firearm with an attached bipod. When firing from a prone position using the bipod, treat the weapon as if it were braced <i>and</i> reduce its ST requirement to 2/3 of the listed value (round <i>up</i>); <i>e.g.</i>, ST 13 becomes ST 9.", "Has a minimum range: 10 yards for 40mm GL, 30 yards for 115mm ATGM, and 200 yards for 70mm SAM.", "Hazardous back-blast: 1d burn damage to anyone behind firer and within 15 yards (30 yards for ATGM).", "Guided attack (see Campaigns, pg. 412). Gunner uses <b>Artillery (Guided Missile)</b> to <i>attack</i>. &ldquo;1/2D&rdquo; range is <i>speed</i> in yards per second. Weight is for empty launcher/one missile."] } ] };
Weapons.ATGM115mm.shots = 1;
Weapons.ATGM115mm.reload = 20;
Weapons.SAM70mm = new Weapon('SAM', 18, 38000, 8, 1, -8, 'gun', 'B281');
Weapons.SAM70mm.detail = '70mm';
Weapons.SAM70mm.wieldOptions    = { Artillery8_GuidedMissile : [ { hands: 'both', strength: 10, damage: { base: 6, mods: 0, type: 'cr' }, halfDamageRange: 1000, maximumRange: 8800, accuracy: 7, rateOfFire: 1,  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Has a minimum range: 10 yards for 40mm GL, 30 yards for 115mm ATGM, and 200 yards for 70mm SAM.", "Hazardous back-blast: 1d burn damage to anyone behind firer and within 15 yards (30 yards for ATGM).", "Homing (Hyperspectral Vision) attack (see Campaigns, pg. 413), at the missile&srquo;s skill of 10. Firer rolls against <b>Artillery (Guided Missile)</b> to <i>aim</i>. On a success, the missile gets its Acc bonus. &ldquo;1/2D&rdquo; range is <i>speed</i> (yards/second). Weight is for empty launcher/one missile."] } ] };
Weapons.SAM70mm.shots = 1;
Weapons.SAM70mm.reload = 20;
Weapons.Scorpion    = new Weapon('scorpion', 110, 5000, 2, 2, -10, 'gun', 'B281');
Weapons.Scorpion.wieldOptions   = { Gunner2_Catapult : [ { hands: 'both', strength: 45, damage: { base: 5, mods: 0, type: 'imp' }, halfDamageRange: 415, maximumRange: 520, accuracy: 3, rateOfFire: 1,  recoil: '-', note: ["Weapon is usually mounted in a vehicle or gun carriage, or on a tripod. <i>Ignore</i> the listed ST and Bulk when firing the weapon from its tripod or mount; the ST requirement only applies when firing the weapon <i>without</i> its mount. Removing the weapon from its mount (or reattaching it) takes at least three one-second Ready maneuvers.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.Scorpion.shots = 1;
Weapons.Scorpion.reload = 30;
Weapons.HMG50   = new Weapon('HMG', 116, 14000, 6, 1, -8, 'gun', 'B281');
Weapons.HMG50.detail = '.50';
Weapons.HMG50.wieldOptions  = { Gunner6_MachineGun : [ { hands: 'both', strength: 20, damage: { base: 13, mods: 1, type: 'pi+' }, halfDamageRange: 1800, maximumRange: 7400, accuracy: 6, rateOfFire: '8!',  recoil: 2, note: ["Weapon is usually mounted in a vehicle or gun carriage, or on a tripod. <i>Ignore</i> the listed ST and Bulk when firing the weapon from its tripod or mount; the ST requirement only applies when firing the weapon <i>without</i> its mount. Removing the weapon from its mount (or reattaching it) takes at least three one-second Ready maneuvers.", "Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Detachable tripod weighs an <i>extra</i> 44 lbs."] } ] };
Weapons.HMG50.shots = 100;
Weapons.HMG50.reload = 5;
Weapons.UnderBarrel40mmGL   = new Weapon('grenade launcher', +3.5, 500, 7, 1, u, 'gun', 'B281');
Weapons.UnderBarrel40mmGL.detail = '40mm under-barrel';
Weapons.UnderBarrel40mmGL.wieldOptions  = { Guns7_GrenadeLauncher : [ { strength: 11, damage: { base: 4, mods: 0, type: 'cr' }, halfDamageRange: 150, maximumRange: 440, accuracy: 2, rateOfFire: 1,  recoil: 2, note: ["Has a minimum range: 10 yards for 40mm GL, 30 yards for 115mm ATGM, and 200 yards for 70mm SAM.", "Can clamp under the barrel of any TL7+ rifle or carbine. Use the rifle&srquo;s Bulk.", "Damage is not halved at 1/2D range, but loses its armor divisor of (10)."] } ] };
Weapons.UnderBarrel40mmGL.shots = 1;
Weapons.UnderBarrel40mmGL.reload = 3;
Weapons.Integral25mmGL  = new Weapon('grenade launcher', u, 0, 9, 1, u, 'gun', 'B281');
Weapons.Integral25mmGL.detail = '25mm integral';
Weapons.Integral25mmGL.wieldOptions = { Guns9_GrenadeLauncher : [ { strength: 10, damage: { base: 7, mods: 0, type: 'cr' }, maximumRange: 2200, accuracy: '4+2', rateOfFire: 1,  recoil: 3, note: ["Built into the TL9 ICW (Campaigns, pg. 279). Use the ICW’s Bulk. Has &ldquo;smartgun&rdquo; electronics (see Campaigns, pg. 278)."] } ] };
Weapons.Integral25mmGL.shots = 3;
Weapons.Integral25mmGL.reload = 3;
Weapons.Bazooka60mm = new Weapon('bazooka', 16.7, 1000, 7, 1, -6, 'gun', 'B281');
Weapons.Bazooka60mm.detail = '60mm';
Weapons.Bazooka60mm.wieldOptions    = { Guns7_LAW : [ { hands: 'both', strength: 10, damage: { base: 6, mods: 0, type: 'cr' }, halfDamageRange: 100, maximumRange: 650, accuracy: 3, rateOfFire: 1,  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Hazardous back-blast: 1d burn damage to anyone behind firer and within 15 yards (30 yards for ATGM).","Damage is not halved at 1/2D range, but loses its armor divisor of (10)."] } ] };
Weapons.Bazooka60mm.shots = 1;
Weapons.Bazooka60mm.reload = 4;
Weapons.RPG85mm = new Weapon('RPG', 21, 800, 7, 1, -6, 'gun', 'B281');
Weapons.RPG85mm.detail = '85mm';
Weapons.RPG85mm.wieldOptions    = { Guns7_LAW : [ { hands: 'both', strength: 10, damage: { base: 6, mods: 0, type: 'cr' }, halfDamageRange: 300, maximumRange: 1000, accuracy: '3+1', rateOfFire: 1,  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Hazardous back-blast: 1d burn damage to anyone behind firer and within 15 yards (30 yards for ATGM).","Damage is not halved at 1/2D range, but loses its armor divisor of (10)."] } ] };
Weapons.RPG85mm.shots = 1;
Weapons.RPG85mm.reload = 5;
Weapons.LAW84mm = new Weapon('LAW', 14.7, 750, 8, 1, -5, 'gun', 'B281');
Weapons.LAW84mm.detail = '84mm';
Weapons.LAW84mm.wieldOptions    = { Guns8_LAW : [ { hands: 'both', strength: 10, damage: { base: 6, mods: 0, type: 'cr' }, halfDamageRange: 330, maximumRange: 2300, accuracy: 3, rateOfFire: 1,  recoil: 1, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Hazardous back-blast: 1d burn damage to anyone behind firer and within 15 yards (30 yards for ATGM).","Damage is not halved at 1/2D range, but loses its armor divisor of (10)."] } ] };
Weapons.LAW84mm.shots = 1;
Weapons.LAW84mm.reload = '–';
Weapons.AutoRifle762mm  = new Weapon('rifle', 22, 6500, 6, 2, -6, 'gun', 'B281');
Weapons.AutoRifle762mm.detail = '7.62mm auto';
Weapons.AutoRifle762mm.wieldOptions = { Guns6_LMG : [ { hands: 'both', strength: 12, damage: { base: 7, mods: 0, type: 'pi' }, halfDamageRange: 1000, maximumRange: 4200, accuracy: 5, rateOfFire: '9!',  recoil: 3, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Firearm with an attached bipod. When firing from a prone position using the bipod, treat the weapon as if it were braced <i>and</i> reduce its ST requirement to 2/3 of the listed value (round <i>up</i>); <i>e.g.</i>, ST 13 becomes ST 9."] } ] };
Weapons.AutoRifle762mm.shots = 20;
Weapons.AutoRifle762mm.reload = 3;
Weapons.LMG762mm    = new Weapon('LMG', 30, 6600, 6, 1, -6, 'gun', 'B281');
Weapons.LMG762mm.detail = '7.62mm';
Weapons.LMG762mm.wieldOptions   = { Guns6_LMG : [ { hands: 'both', strength: 13, damage: { base: 7, mods: 0, type: 'pi' }, halfDamageRange: 1000, maximumRange: 4200, accuracy: 5, rateOfFire: '15!',  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Firearm with an attached bipod. When firing from a prone position using the bipod, treat the weapon as if it were braced <i>and</i> reduce its ST requirement to 2/3 of the listed value (round <i>up</i>); <i>e.g.</i>, ST 13 becomes ST 9."] } ] };
Weapons.LMG762mm.shots = 100;
Weapons.LMG762mm.reload = 5;
Weapons.SAW556mm    = new Weapon('SAW', 24, 4800, 7, 1, -6, 'gun', 'B281');
Weapons.SAW556mm.detail = '5.56mm';
Weapons.SAW556mm.wieldOptions   = { Guns7_LMG : [ { hands: 'both', strength: 12, damage: { base: 5, mods: 1, type: 'pi' }, halfDamageRange: 800, maximumRange: 3500, accuracy: 5, rateOfFire: '12!',  recoil: 2, note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST.", "Firearm with an attached bipod. When firing from a prone position using the bipod, treat the weapon as if it were braced <i>and</i> reduce its ST requirement to 2/3 of the listed value (round <i>up</i>); <i>e.g.</i>, ST 13 becomes ST 9."] } ] };
Weapons.SAW556mm.shots = 200;
Weapons.SAW556mm.reload = 5;
Weapons.Flamethrower    = new Weapon('flamethrower', 70, 1800, 6, 1, -8, 'gun', 'B281');
Weapons.Flamethrower.wieldOptions   = { LiquidProjector6_Flamethrower : [ { hands: 'both', strength: 10, damage: { base: 3, mods: 0, type: 'burn' }, maximumRange: 50, accuracy: '–', rateOfFire: 'Jet',  recoil: '-', note: ["Requires two hands. If you have at least 1.5 times the listed ST (round <i>up</i>), you can use this weapon in one hand, but it becomes <i>unready</i> after you attack with it. If you have at least <i>twice</i> the listed ST, you can wield it one-handed with no readiness penalty. But if it requires one hand to hold it and another to operate a moving part, like a bow or a pump shotgun, it <i>always</i> requires two hands, regardless of ST."] } ] };
Weapons.Flamethrower.shots = 10;
Weapons.Flamethrower.reload = '';

for ( var w in Weapons ) {
    if( !Weapons[w].hasOwnProperty('key') ) Weapons[w].key = w;
}
Groups.Weapons = Object.keys(Weapons);

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
                           'Longbow','ShortBow','Crossbow','ThrowingAxe','PumpShotgun12G',
                           'Derringer41','AutoPistol9mmTL6','AutoPistol9mmTL7','AutoPistol9mmTL9',
                           'Revolver357M','AutoPistol44M','LeverActionCarbine30',
                           'SelfLoadingRifle762mm','SniperRifle338'];


/****  Templates  ****/

/* random character generator type 'templates'
  Attributes: the sum ST + 2*DX + 2*IQ + HT should equal zero.
  Secondary characteristics: use sparingly, and don't use negatives.
*/
var CharacterTypes = {};
CharacterTypes.rando = {
  attributes: { ST: 0, IQ: 0, DX: 0, HT: 0, HP: 0, Will: 0, Per: 0, FP: 0, Speed: 0, Move: 0 },
  ads: Object.keys(Traits).filter(
              function(t) { let Trait=Traits[t]; return ( Trait.type && Trait.type.match(/A/i) ) ? true : false; }
          ).filter(
              function(t) { let Trait=Traits[t]; return ( isNaN(Trait.cost) || Trait.cost>25 || Trait.hasOwnProperty('exoticSprntl') ) ? false : true; }
          ),
  disads: Object.keys(Traits).filter(
              function(t) { let Trait=Traits[t]; return ( Trait.type && Trait.type.match(/D/i) ) ? true : false; }
          ).filter(
              function(t) { let Trait=Traits[t]; return ( isNaN(Trait.cost) || Trait.cost<-20 || Trait.hasOwnProperty('exoticSprntl') ) ? false : true; }
          ),
  skills: Object.keys(Skills).filter(
              function(s) { let Sk = Skills[s]; return ( Sk.hasOwnProperty('name') ) ? true : false; }
          ).filter(
              function(s) { let Sk = Skills[s]; return ( Sk.hasOwnProperty('wildcard') ) ? false : true; }
          ),
  wpnNum: 1,
  wpnBudg: 0.25,    // this means Rando can spend up to 25% of his/her Starting Wealth (based on TL) on a weapon
  weapons: Object.keys(Weapons).filter(
              function(w) { return ( Weapons[w].qualityEffectGroup=='natural' ) ? false : true; }
          ),
  armNum: 0.5,    // this means Rando is only 50% likely to have any armor
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite,
  sldNum: 0,
  shields: [],
  eqpNum: 4,
  eqpBudg: 0.2,
  equipment: Object.keys( BasicEquipment ).filter( function(e) { return (BasicEquipment[e].weight<=10 ) ? true : false; } ),
  themes: themes,   /* ['','blood','blue','brown','green','metal','orange','purple','water'] */
};
CharacterTypes.soldier_of_fortune = {
  attributes: { ST: 0, IQ: -1, DX: 1, HT: 0, HP: 4, Will: 0, Per: 4, FP: 0, Speed: 0, Move: 0 },
  ads:    ['Ambidexterity','Charisma','CombatReflexes','Fit','VeryFit','HighPainThreshold','Luck','MagicResistance',
           'OutdoorsmanTalent','MilitaryRank','RapidHealing','Reputation','Status','WealthComfortablex2'],
  disads: ['AlcoholismLegal','BadTemper','Bloodlust','CodeofHonor','CompulsiveBehavior','Duty','Fanaticism','Flashbacks',
           'Honesty','Impulsiveness','Lecherousness','Overconfidence','SenseOfDuty','Trademark'],
  skills: ['AnimalHandling','Armoury','Brawling'/*,'Crewman'*/,'FastDraw','Artillery','ForwardObserver','Driving','EnvironmentSuit',
           'Piloting','Riding_horse','Hiking','Acrobatics','FirstAid','Camouflage','Carousing','SavoirFaire','Tactics','Swimming',
           'Stealth','FreeFall','ElectronicsOperation','Explosives','Leadership','Observation','Survival','Tracking','UrbanSurvival'],
  exSkls: ['Hiking','Jumping','Karate','Swimming','Throwing'],
  wpnNum: 2,
  wpnBudg: 0.5,
  weapons: Groups.Weapons.filter( function(w) { var Wpn=Weapons[w]; return ( Wpn.strength()>=11 || Wpn.TL>4 ) ? true : false; } ),
  armNum: 1,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite,
  sldNum: 1,
  shields: Groups.ShieldsGURPSLite,
  eqpNum: 1,
  equipment: Groups.weapongear.concat(['rations','blanket','backpackframe','whetstone']),
  themes: ['','blood','blue','brown','metal','orange'],
};
CharacterTypes.brick = {
  attributes: { ST: 2, IQ: -1, DX: 0, HT: 1, HP: 2, Will: 0, Per: 0, FP: 0, Speed: 0, Move: 0 },
  ads:    ['CombatReflexes','HighPainThreshold','HardtoKill','HardtoSubdue','Fearlessness','Fit','VeryFit'],
  disads: ['BadTemper','Berserk','Bloodlust','Bully','Clueless','EasytoRead','Obesity','Gullibility','Ugly','Unattractive'],
  skills: ['AnimalHandling','Armoury','Boating','Boxing','Brawling','Carousing','Dropping','FastDraw',
           'Judo','Hiking','Jumping','Karate','Riding_horse','Swimming','Wrestling','Lifting'/*,'Crewman'*/],
  exSkls: ['Throwing'],
  wpnNum: 2,
  wpnBudg: 0.5,
  weapons: Groups.Weapons.filter( function(w) { var Wpn=Weapons[w]; return ( Wpn.strength()>=11 || Wpn.TL>4 ) ? true : false; } ),
  armNum: 1,
  armBudg: 0.4,
  armor: Groups.Armor,
  sldNum: 1,
  shields: Groups.Shields,
  eqpNum: 1,
  equipment: Groups.weapongear.concat(['wineskin1galfull','rations','blanket','backpackframe','whetstone']),
  themes: ['','blood','blue','brown','metal','orange'],
};
CharacterTypes.twitchy = {
  attributes: { ST: -1, IQ: -1, DX: 2, HT: -1, HP: 0, Will: 0, Per: 0, FP: 0, Speed: 0, Move: 1 },
  ads:    ['Ambidexterity','Charisma','CombatReflexes','DangerSense','Fit','VeryFit','Luck'],
  disads: ['BadTemper','CompulsiveBehavior','Curious','EasytoRead','Impulsiveness','Lazy',
           'Lecherousness','OntheEdge','Overconfidence','ShortAttentionSpan','Trademark'],
  skills: ['Acrobatics','Brawling','Carousing','Climbing','Driving','Escape','FastDraw_weapon','FastTalk','Gambling',
           'Jumping','Karate','Riding_horse','Scrounging','SexAppeal','Streetwise','Throwing'],
  exSkls: ['AnimalHandling','ComputerOperation',/*'Crewman',*/'ElectronicsOperation','ElectronicsRepair','EnvironmentSuit'],
  wpnNum: 2,
  wpnBudg: 0.25,
  weapons: Groups.WeaponsGURPSLite.filter( function(w) { return (Weapons[w].weight<=5 ) ? true : false; } ),
  armNum: 0.5,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite.filter( function(a) { return (ArmorItems[a].weight<=20 ) ? true : false; } ),
  sldNum: 0,
  shields: [],
  eqpNum: 1,
  equipment: ['lanternoil','ceramicbottle1qt','wineskin1galfull','rations','blanket','backpacksmall','whetstone','arrow'],
  themes: ['','blood','blue','brown','green','orange','purple'],
};
CharacterTypes.ranger = {
  attributes: { ST: 0, IQ: 0, DX: 0, HT: 0, HP: 0, Will: 0, Per: 1, FP: 0, Speed: 0, Move: 1 },
  requiredAds: ['OutdoorsmanTalent'],
  ads:    ['AbsoluteDirection','Attractive','Fit','CommonSense','CulturalAdaptability','AcuteHearing','AcuteVision','CombatReflexes','DangerSense','NightVision'],
  disads: ['Clueless','Curious','EasytoRead','Gullibility','OntheEdge','Paranoia','PovertyStrugglingx12','Shyness','Skinny','Stubborn','Truthfulness','Unattractive'],
          // not NPC-usable: 'CodeofHonor','Enemy','Honesty','Innumerate','Loner','Secret','SenseOfDuty',
  skills: ['Boating','Brawling','Camouflage','Climbing','Driving','FirstAid','Fishing','Hiking',
           'Jumping','Mimicry','Naturalist','Navigation','Piloting','Riding_horse','Stealth',
           'Survival_Mountains','Survival_Plains','Survival_Woodlands','Survival_Swampland','Survival_Desert',
           'Swimming','Tactics','Throwing','Tracking'],
  wpnNum: 1,
  wpnBudg: 0.6,
//  weapons: Groups.WeaponsGURPSLite,
  weapons: Groups.Weapons.filter(
              function(w) { return ( Weapons[w].qualityEffectGroup=='natural' ) ? false : true; }
          ),
  armNum: 1,
  armBudg: 0.4,
  armor: Groups.ArmorGURPSLite.filter(
           function(a) { return (ArmorItems[a].weight<=20 ) ? true : false; }
         ).concat(['LeatherJacket','Boots','LeatherGloves']),
  sldNum: 0,
  shields: [],
  reqdEquip: ['backpacksmall','rations','personalbasics'],
  eqpNum: 2,
  equipment: Groups.campinggear.concat(['whetstone','arrow']),
  themes: ['blue','brown','green','orange','purple','water'],
};
CharacterTypes.thief = {
  attributes: { ST: -1, IQ: 0, DX: 1, HT: -1, HP: 0, Will: 0, Per: 2, FP: 0, Speed: 0, Move: 0 },
  ads:    ['AbsoluteDirection','AcuteHearing','Charisma','DangerSense','DoubleJointed','Fearlessness','Flexibility','Luck','NightVision','PerfectBalance'],
  disads: ['Coward','Curious','Greed','Impulsiveness','Kleptomania','Lazy','Overconfidence','Paranoia','Skinny','Stubborn','Trickster',],
  skills: ['Climbing','DetectLies','Escape','FastTalk','Filch','Holdout','Jumping','LipReading','Lockpicking','Traps',
           'Pickpocket','Poisons','Scrounging','Shadowing','Smuggling','Stealth','Streetwise','Throwing'],
  exSkls: [],
  wpnNum: 1,
  wpnBudg: 0.25,
  weapons: Object.keys(Weapons).filter( function(w) { if( Weapons[w].qualityEffectGroup=='natural' || Weapons[w].bulk<-2 ) return false; return (Weapons[w].weight<=3) ? true : false; } ),
  armNum: 0.5,
  armBudg: 0.25,
  armor: Groups.ArmorGURPSLite.filter( function(a) { return (ArmorItems[a].weight<=15 ) ? true : false; } ),
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: ['climbinggear','ropethin','bugstomper','spycamera','nightvisiongoggles','ropethin',
  'flashlightmini','grapnel','pouchsmall','lockpicks','disguisekit','wearablecomp','elockpicks'],
  themes: ['','blue','brown','green','orange','purple'],
};
CharacterTypes.investigator = {
  attributes: { ST: -1, IQ: 1, DX: 1, HT: 0, HP: 1, Will: 0, Per: 4, FP: 0, Speed: 0, Move: 0 },
  ads:    ['Appearance','AlternateIdentity','Charisma','Contact','DangerSense','Gizmos','LanguageTalent',
           'LegalEnforcementPowers','Luck','RapidHealing','SecurityClearance','SmoothOperatorTalent','Zeroed'],
  languages: ['French','German','Greek','Hebrew','Hieroglyphics','Latin'],    // cultural familiarities too
  disads: ['AlcoholismLegal','Curious','Duty','Greed','Honesty','Pacifism','Secret','SenseOfDuty','Stubborn','PovertyStrugglingx12','Workaholic'],
  skills: ['Climbing','Filch','Stealth','Criminology','Disguise','ElectronicsOperation','Holdout',
           'Interrogation','Lockpicking','Occultism','Photography','Research','Shadowing','Smuggling',
           'Traps','Writing','Observation','Search','Pickpocket','ComputerProgramming','Diagnosis',
           'Forensics','IntelligenceAnalysis','Law','DetectLies','ComputerHacking'],
  exSkls: ['Brawling','ForcedEntry','Garrote','Boxing','Cloak','Acting','FastTalk','Judo','Karate','AreaKnowledge','Running',
           'ComputerOperation','CurrentAffairs','Carousing','Swimming','Boating','Driving','Piloting','Riding_horse','Hiking','Streetwise'],
  wpnNum: 1,
  wpnBudg: 0.25,
  weapons: Object.keys(Weapons).filter( function(w) { return ( Weapons[w].qualityEffectGroup && /*Weapons[w].qualityEffectGroup=='gun' &&*/ Weapons[w].qualityEffectGroup!='natural' && Weapons[w].weight<=3 ) ? true : false; } ),
  armNum: 0,
  armBudg: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 4,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.water_mage = {
  attributes: { ST: -1, IQ: 2, DX: -1, HT: -1, HP: 0, Will: 0, Per: 0, FP: 1, Speed: 0, Move: 0 },
  requiredAds: ['Magery0','Magery'],
  ads:    ['Charisma','Flexibility','Intuition','StrongWill','Versatile','MageryWater'],
  disads: ['Overconfidence','Callous','Coward','Indecisive','Selfish'],
  skills: ['SeekWater','PurifyWater','CreateWater','DestroyWater','ShapeWater','Fog','IcyWeapon'],
  wpnNum: 0,
  weapons: [],
  armNum: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Object.keys( BasicEquipment ),
  themes: ['water'],
};
CharacterTypes.storm_mage = {
  attributes: { ST: -1, IQ: 1, DX: 0, HT: -1, HP: 0, Will: 0, Per: 0, FP: 1, Speed: 0, Move: 0 },
  requiredAds: ['Magery0','Magery'],
  ads:    ['Luck','Attractive','AbsoluteDirection','AcuteVision','Daredevil','PerfectBalance',
           'Charisma','Intuition','StrongWill','MageryWater','MageryAir'],
  disads: ['Overconfidence','Callous','Impulsiveness','LowEmpathy','ManicDepressive'],
  skills:  removeDups( Groups.WaterSpells.concat( Groups.AirSpells, ['InnateAttack_Beam'] ) ),
  wpnNum: 0,
  weapons: [],
  armNum: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Object.keys( BasicEquipment ),
  themes: ['blue','water'],
};
CharacterTypes.air_mage = {
  attributes: { ST: -2, IQ: 1, DX: 1, HT: -2, HP: 0, Will: 0, Per: 0, FP: 1, Speed: 0, Move: 0 },
  requiredAds: ['Magery0','Magery'],
  ads: ['Luck','Attractive','AbsoluteDirection','AcuteVision','Daredevil','PerfectBalance','MageryAir'],
  disads: ['Overconfidence','Impulsiveness','AbsentMinded','LowEmpathy','ManicDepressive',
           'Skinny','Squeamish','Gullibility'],
  skills: ['CreateAir','Lightning','NoSmell','PredictWeather','PurifyAir','ShapeAir',
           'Stench','WalkonAir','InnateAttack_Beam'],
  wpnNum: 0,
  weapons: [],
  armNum: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.firestorm_mage = {
  attributes: { ST: -2, IQ: 1, DX: 1, HT: -2, HP: 0, Will: 0, Per: 0, FP: 1, Speed: 0, Move: 0 },
  requiredAds: ['Magery0','Magery'],
  ads: ['Luck','Attractive','AbsoluteDirection','AcuteVision','Daredevil','PerfectBalance','Charisma','MageryAir','MageryFire'],
  disads: ['AbsentMinded','BadTemper','Clueless','Gullibility','Impulsiveness','LowEmpathy',
           'ManicDepressive','Overconfidence','Sadism'],
  skills: ['CreateAir','Lightning','NoSmell','PredictWeather','PurifyAir','ShapeAir',
           'Stench','WalkonAir','InnateAttack_Beam','IgniteFire','CreateFire','ShapeFire',
           'DeflectEnergy','ExtinguishFire','Heat','Cold','ResistCold','ResistFire',
           'Fireball','ExplosiveFireball','InnateAttack_Projectile'],
  wpnNum: 0,
  weapons: [],
  armNum: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Object.keys( BasicEquipment )
};
CharacterTypes.fire_mage = {
  attributes: { ST: -1, IQ: 2, DX: 0, HT: -1, HP: 0, Will: 0, Per: 0, FP: 2, Speed: 0, Move: 0 },
  requiredAds: ['Magery0','Magery'],
  ads: ['Charisma','MageryFire'],
  disads: ['BadTemper','Overconfidence','Sadism','Clueless','Impulsiveness','Pyromania'],
  skills: ['IgniteFire','CreateFire','ShapeFire','DeflectEnergy','ExtinguishFire',
           'Heat','Cold','ResistCold','ResistFire','Fireball','ExplosiveFireball','InnateAttack_Projectile'],
  wpnNum: 0,
  weapons: [],
  armNum: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Object.keys( BasicEquipment ),
  themes: ['orange'],
};
CharacterTypes.lava_mage = {
  attributes: { ST: -1, IQ: 2, DX: -1, HT: -1, HP: 0, Will: 0, Per: 0, FP: 1, Speed: 0, Move: 0 },
  requiredAds: ['Magery0','Magery'],
  ads: ['Charisma','CommonSense','SingleMinded','StrongWill','MageryFire','MageryEarth'],
  disads: ['EasytoRead','Clueless','Impulsiveness','Overconfidence','Pyromania',
  				 'Sadism','Stubborn','Truthfulness'],
  skills: ['IgniteFire','CreateFire','ShapeFire','DeflectEnergy','ExtinguishFire',
           'Heat','Cold','ResistCold','ResistFire','Fireball','ExplosiveFireball',
           'CreateEarth','EarthtoAir','EarthtoStone','Entombment','FleshtoStone','SeekEarth',
           'ShapeEarth','StonetoFlesh','StonetoEarth','InnateAttack_Projectile'],
  wpnNum: 0,
  weapons: [],
  armNum: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Object.keys( BasicEquipment ),
  themes: ['brown','orange'],
};
CharacterTypes.earth_mage = {
  attributes: { ST: -1, IQ: 2, DX: -1, HT: -1, HP: 0, Will: 0, Per: 0, FP: 1, Speed: 0, Move: 0 },
  requiredAds: ['Magery0','Magery'],
  ads: ['Unattractive','CommonSense','SingleMinded','StrongWill','MageryEarth'],
  disads: ['EasytoRead','Clueless','Gullibility','Hidebound','Obesity','Oblivious','Overconfidence','Stubborn','Truthfulness'],
  skills: ['CreateEarth','EarthtoStone','Entombment','FleshtoStone','SeekEarth','ShapeEarth','StonetoFlesh','StonetoEarth'],
  wpnNum: 0,
  weapons: [],
  armNum: 0,
  armor: [],
  sldNum: 0,
  shields: [],
  eqpNum: 2,
  equipment: Object.keys( BasicEquipment ),
  themes: ['brown','green'],
};
CharacterTypes.spring_mage = {
  attributes: { ST: -1, IQ: 1, DX: 0, HT: -1, HP: 0, Will: 0, Per: 0, FP: 1, Speed: 0, Move: 0 },
  requiredAds: ['Magery0','Magery'],
  ads:    ['AbsoluteDirection','Intuition','StrongWill',  'MageryEarth','MageryWater'],
  disads: ['Overconfidence','Stubborn','Truthfulness'],
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
/* other combo mages
    Air-Earth:    sandstorm mage
    Fire-Water:   steam mage
   According to Affinities (M2E109), these two mage-types combine hostile families.
*/
//CharacterTypes.scout = {};
/*CharacterTypes.none = {
  attributes: { ST: 0, IQ: 0, DX: 0, HT: 0, HP: 0, Will: 0, Per: 0, FP: 0, Speed: 0, Move: 0 },
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
  value :  0,       // set here, or calculate as a derived quantity?  SET; I want this to reflect the original, unchanging value (provides a check too)
  ref   : '',
  art   : '',       // optional; [relative] path or URL for art file to be applied (in absence of other art) - inappropriate for meta-traits
  meta  : true,     // put this optional attribute in if this is a meta-trait (e.g., automaton) instead of a racial template
  traits : [
    // attribute & 2nd char mods (added using the Traits in this library for that purpose, e.g. IncreasedHT, DecreasedHitPoints, DecreasedBasicMove)
    // traits, by referring to Basic Library Trait objects, i.e.
    // Traits.key.clone(),
  ],
  metatraits : [],
  skills : [],      // this can include spells
  adjustments : []  // no need to add these for existing ads/disads; they should already apply - reserve for traits defined inside the template
};
// put modifiers here, for the entries above; i.e.
// Templates._blank.traits[2].levels = 3;
// Templates._blank.traits[4].description = 'gold';
// Templates._blank.traits[5].EnhLimsArray = [{text:"Winged",value:-25}];

/*

Templates.raven = {
  name  : 'raven',
  value : -25,
  traits : [
    Traits.DecreasedST.clone(),
    Traits.DecreasedIQ.clone(),
    Traits.IncreasedHT.clone(),
    Traits.IncreasedPer.clone(),
    Traits.Flight.clone(),
    Traits.ClawsSharp.clone(),
    Traits.SizeModifier.clone(),
  ],
};
Templates.raven.traits[0].levels =  6;  // -6 ST
Templates.raven.traits[1].levels =  2;  // -2 IQ
Templates.raven.traits[2].levels =  2;  // +2 DX
Templates.raven.traits[3].levels =  4;  // +4 Per
Templates.raven.traits[4].EnhLimsArray = [{text:"Winged",value:-25}];
Templates.raven.traits[6].levels = -1;  // -1 SM (a very large raven)
*/

Templates.Dragon = {
  name  : 'Dragon',
  value :  260,
  art   : '../images/lineart/dragon.png',
  ref   : 'B261',
  traits : [
    Traits.IncreasedST.clone(),
    Traits.SizeModifier.clone(),
    Traits.StrongWill.clone(),
    Traits.IncreasedPer.clone(),
    Traits.BurningAttack.clone(),
    Traits.ClawsTalons.clone(),            // 5
    Traits.DiscriminatorySmell.clone(),
    Traits.DamageResistance.clone(),
    Traits.EnhancedMoveAir.clone(),
    Traits.ExtraAttack.clone(),
    Traits.ExtraLegs.clone(),              // 10
    Traits.Flight.clone(),
    Traits.Longevity.clone(),
    Traits.Magery0.clone(),
    Traits.NightVision.clone(),
    Traits.StrikerCrushing.clone(),        // 15
    Traits.TeethFangs.clone(),
    Traits.BadGrip.clone(),
    Traits.Gluttony.clone(),
    Traits.Greed.clone(),
    Traits.Horizontal.clone(),             // 20
    Traits.Miserliness.clone(),
  ],
};
Templates.Dragon.traits[0].levels =  15;  // +15 ST
Templates.Dragon.traits[0].EnhLimsArray = [{text:"Size",value:-20}];
Templates.Dragon.traits[1].levels =  2;  // +2 Size Mod (a small dragon)
Templates.Dragon.traits[2].levels =  3;  // +3 Will
Templates.Dragon.traits[3].levels =  3;  // +3 Per
Templates.Dragon.traits[4].levels =  4;  // 4d fire damage
Templates.Dragon.traits[4].description = "breathes fire";
Templates.Dragon.traits[4].EnhLimsArray = [{text:"Cone, 5 yds",value:100},{text:"Limited Use: 3/day",value:-20},{text:"Reduced Range, ÷5",value:-20}];
Templates.Dragon.traits[7].levels =  6;  // DR 6
Templates.Dragon.traits[7].EnhLimsArray = [{text:"Can't Wear Armor",value:-40}];
Templates.Dragon.traits[8].levels =  1;  // 1 half-level of Enhanced Move (Air)
Templates.Dragon.traits[9].levels =  1;  // 1 extra attack
Templates.Dragon.traits[10].levels = 1;  // 4 legs
Templates.Dragon.traits[10].description = "4 legs";
Templates.Dragon.traits[11].EnhLimsArray = [{text:"Winged",value:-25}];
Templates.Dragon.traits[14].levels = 8;  // Night Vision 8
Templates.Dragon.traits[15].description = "tail";
Templates.Dragon.traits[17].levels =  3;  // very bad grip
Templates.Dragon.traits[18].MultipliersArray = [{text:"12",value:1}];
Templates.Dragon.traits[19].MultipliersArray = [{text:"12",value:1}];
Templates.Dragon.traits[21].MultipliersArray = [{text:"12",value:1}];


Templates.Dwarf = {
  name  : 'Dwarf',
  value :  35,
  art   : '../images/lineart/g33.png',
  artX  : '../images/lineart/g23.png',
  ref   : 'B261',
  traits : [
    Traits.IncreasedHT.clone(),
    Traits.StrongWill.clone(),
    Traits.SizeModifier.clone(),
    Traits.ArtificerTalent.clone(),
    Traits.ExtendedLifespan.clone(),
    Traits.NightVision.clone(),
    Traits.Detect.clone()
  ],
};
Templates.Dwarf.traits[0].levels =  1;  // +1 HT
Templates.Dwarf.traits[1].levels =  1;  // +1 Will
Templates.Dwarf.traits[2].levels = -1;  // -1 Size Mod
Templates.Dwarf.traits[3].levels =  1;  // Artificer 1
Templates.Dwarf.traits[4].levels =  1;  // Extended Lifespan 1
Templates.Dwarf.traits[5].levels =  5;  // Night Vision 5
Templates.Dwarf.traits[6].description = 'gold';
Templates.Dwarf.traits[6].ConstantModsArray = [{text:"Rare",value:0}];
Templates.Dwarf.traits[6].EnhLimsArray = [{text:"vague",value:-50}];


Templates.Elf = {
  name  : 'Elf',
  value :  70,
  art   : '../images/lineart/g21.gif',
  artX  : '../images/lineart/g16.gif',
  ref   : 'B316',
  traits : [
    Traits.IncreasedHT.clone(),
    Traits.IncreasedPer.clone(),
    Traits.AppearanceAttractive.clone(),
    Traits.LanguageTalent.clone(),
    Traits.Magery0.clone(),
    Traits.PerfectBalance.clone(),
    Traits.TelescopicVision.clone(),
    Traits.Unaging.clone(),
    Traits.Voice.clone(),
    Traits.DecreasedST.clone(),
  ],
  skills : [
    Skills.Connoisseur.clone(),
  ],
};
Templates.Elf.traits[0].levels =  1;  // +1 HT
Templates.Elf.traits[1].levels =  1;  // +1 Per
Templates.Elf.traits[6].levels =  1;  // Telescopic Vision 1
Templates.Elf.traits[9].levels =  1;  // -1 ST
Templates.Elf.skills[0].points =  1;  // IQ-1 (1 pt)
Templates.Elf.skills[0].specialization= 'Natural Environments';


Templates.Felinoid = {
  name  : 'Felinoid',
  value :  35,
  art   : '../images/lineart/werecatY.jpg',
  artX  : '../images/lineart/werecat.jpg',
  ref   : 'B261',
  traits :[
    Traits.IncreasedDX.clone(),
    Traits.AcuteHearing.clone(),
    Traits.AcuteTasteSmell.clone(),
    Traits.Catfall.clone(),
    Traits.ClawsSharp.clone(),
    Traits.CombatReflexes.clone(),
    Traits.DamageResistance.clone(),
    Traits.TeethSharp.clone(),
    Traits.TemperatureTolerance.clone(),
    new Trait( "Purring Voice", "A", "P", 0 ),
    new Trait( "Tail", "A", "P", 0 ),
    Traits.DecreasedST.clone(),
    Traits.Impulsiveness.clone(),
    Traits.Sleepy.clone(),
  ],
};
Templates.Felinoid.traits[0].levels = 1;      // +1 DX
Templates.Felinoid.traits[1].levels = 2;      // +2 Hearing
Templates.Felinoid.traits[2].levels = 1;      // +1 Taste/Smell
Templates.Felinoid.traits[6].levels = 1;      // DR 1
Templates.Felinoid.traits[8].levels = 1;      // Temp Tolerance 1
Templates.Felinoid.traits[9].key  = "PurringVoice";
Templates.Felinoid.traits[9].exoticSprntl  = "Ex";
Templates.Felinoid.traits[10].key = "Tail";
Templates.Felinoid.traits[10].exoticSprntl = "Ex";
Templates.Felinoid.traits[11].levels = 1;   // -1 ST
Templates.Felinoid.traits[12].MultipliersArray = [{text:"(12)",value:1}];
Templates.Felinoid.traits[13].ConstantModsArray = [{text:"sleeps 1/2 of the time",value:-8}];
delete Templates.Felinoid.traits[13].description;		// remove the "use only as racial disad" comment from Sleepy


Templates.Vampire = {
  name  : 'Vampire',
  value :  150,
  ref   : 'B262',
  traits : [
    Traits.IncreasedST.clone(),
    Traits.IncreasedHP.clone(),
    Traits.IncreasedPer.clone(),
    Traits.ShapeshiftingAlternateForm.clone(), // 3 bat
    Traits.ShapeshiftingAlternateForm.clone(), // 4 wolf
    Traits.DoesntBreathe.clone(),              // 5
    Traits.Dominance.clone(),                  // 6
    Traits.Resistant.clone(),                  // 7 Immunity to Metabolic Hazards
    Traits.InjuryTolerance.clone(),            // 8 Unliving
    Traits.Insubstantiality.clone(),           // 9
    Traits.NightVision.clone(),                // 10
    Traits.SpeakWithAnimals.clone(),           // 11
    Traits.Unaging.clone(),                    // 12
    Traits.Unkillable.clone(),                 // 13
    Traits.VampiricBite.clone(),               // 14
    Traits.Dependency.clone(),                 // 15
    Traits.DivineCurse.clone(),                // 16
    Traits.Draining.clone(),                   // 17
    Traits.Dread.clone(),                      // 18 Garlic
    Traits.Dread.clone(),                      // 19 Religious Symbols, 5 yds
    Traits.Dread.clone(),                      // 20 Running Water
    Traits.SupernaturalFeature.clone(),        // 21 No Body Heat
    Traits.SupernaturalFeature.clone(),        // 22 No Reflection
    Traits.SupernaturalFeature.clone(),        // 23 Pallor
    Traits.UncontrollableAppetite.clone(),     // 24 human blood
    Traits.Unhealing.clone(),                  // 25 Partial
    Traits.Weakness.clone(),                   // 26 (Sunlight, 1d/minute)

    new Trait( "Sterile", "D", "P", 0 ),
  ],
};
Templates.Vampire.traits[0].levels  =  6;  // +6 ST
Templates.Vampire.traits[1].levels  =  4;  // +4 HP
Templates.Vampire.traits[2].levels  =  3;  // +3 Per
Templates.Vampire.traits[3].description  =  'bat';
Templates.Vampire.traits[3].multiple = 1;
Templates.Vampire.traits[4].description  =  'wolf';
Templates.Vampire.traits[4].multiple = 2;
Templates.Vampire.traits[6].description  =  'Vampiric Bite';
Templates.Vampire.traits[7].description  =  'unliving';
Templates.Vampire.traits[7].ConstantModsArray  =  [{text:"metabolic hazards",value:30}];
Templates.Vampire.traits[7].MultipliersArray   =  [{text:"immunity",value:1}];
Templates.Vampire.traits[8].ConstantModsArray  =  [{text:"unliving",value:20}];
Templates.Vampire.traits[9].EnhLimsArray = [{ text:"Costs Fatigue, 2 FP", value:-10 }];
Templates.Vampire.traits[10].levels =  5;  // Night Vision 5
Templates.Vampire.traits[11].EnhLimsArray = [{ text:"Wolves and Bats", value:-60 }];
Templates.Vampire.traits[13].levels =  2;  // Unkillable 2
Templates.Vampire.traits[13].EnhLimsArray = [{ text:"Achilles' Heel: Wood", value:-50 }];
Templates.Vampire.traits[14].levels =  1;  // basic Vampiric Bite
Templates.Vampire.traits[15].ConstantModsArray = [{text:"Coffin with soil of homeland", value:-20}];
Templates.Vampire.traits[15].MultipliersArray  = [{text:"Daily (1 HT per hour)", value:3}];
Templates.Vampire.traits[16].cost = -10;
Templates.Vampire.traits[16].description = "Cannot enter dwelling for first time unless invited";
Templates.Vampire.traits[17].ConstantModsArray = [{text:"Illegal",value:-5}];
Templates.Vampire.traits[17].description = 'human blood';
Templates.Vampire.traits[17].levels = 1;
Templates.Vampire.traits[18].levels = 0;
Templates.Vampire.traits[18].description = 'garlic';
Templates.Vampire.traits[18].multiple = 1;
Templates.Vampire.traits[19].levels = 4;
Templates.Vampire.traits[19].description = 'religeous symbols';
Templates.Vampire.traits[19].multiple = 2;
Templates.Vampire.traits[20].levels = 0;
Templates.Vampire.traits[20].description = 'running water';
Templates.Vampire.traits[20].multiple = 3;
Templates.Vampire.traits[20].MultipliersArray  = [{text:"Common", value:2}];
Templates.Vampire.traits[21].levels = 1;
Templates.Vampire.traits[21].description = 'no body heat';
Templates.Vampire.traits[21].EnhLimsArray = [{ text:"except after feeding", value:-80 }];
Templates.Vampire.traits[21].multiple = 1;
Templates.Vampire.traits[22].levels = 2;
Templates.Vampire.traits[22].description = 'no reflection';
Templates.Vampire.traits[22].multiple = 2;
Templates.Vampire.traits[23].levels = 2;
Templates.Vampire.traits[23].description = 'pallor';
Templates.Vampire.traits[23].EnhLimsArray = [{ text:"except after feeding", value:-50 }];
Templates.Vampire.traits[23].multiple = 3;
Templates.Vampire.traits[24].MultipliersArray = [{text:"12",value:1}];
Templates.Vampire.traits[24].description = 'human blood';
Templates.Vampire.traits[25].levels = 1;
Templates.Vampire.traits[26].description = "sunlight";
Templates.Vampire.traits[26].ConstantModsArray = [{text:"1d per minute",value:-20}];
Templates.Vampire.traits[26].MultipliersArray  = [{text:"Very Common",value:3}];
Templates.Vampire.traits[27].key = "Sterile";

/* meta-traits */

Templates.BodyOfAir = {
  name  : "Body of Air",
  value :  36,
  ref   : 'B262',
  meta  : true,
  traits :[
    Traits.IncreasedHP.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.Flight.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.NoLegsAerial.clone(),
    new Trait( "Taboo Trait", "D", "P", 0 ),
    Traits.DecreasedST.clone(),
    Traits.NoManipulators.clone(),
    Traits.Vulnerability.clone(),
  ],
}
Templates.BodyOfAir.traits[0].levels = 10;
Templates.BodyOfAir.traits[2].EnhLimsArray = [{text:"Lighter Than Air",value :-10}];
Templates.BodyOfAir.traits[3].name = "Immunity";
Templates.BodyOfAir.traits[3].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.BodyOfAir.traits[3].description = "metabolic hazards";
Templates.BodyOfAir.traits[4].ConstantModsArray = [{text:"Diffuse",value :100}];
Templates.BodyOfAir.traits[6].key = "TabooTraitFixedST";
Templates.BodyOfAir.traits[6].description = "Fixed ST";
Templates.BodyOfAir.traits[7].levels = 10;
Templates.BodyOfAir.traits[8].levels = 2;
Templates.BodyOfAir.traits[9].levels = 2;
Templates.BodyOfAir.traits[9].MultipliersArray = [{text:"Damage ×2",value :2}];
Templates.BodyOfAir.traits[9].description = "Vacuum and wind-based";


Templates.BodyOfEarth = {
  name  : "Body of Earth",
  value :  175,
  ref   : 'B262',
  meta  : true,
  traits :[
    Traits.DoesntBreathe.clone(),
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.PressureSupport.clone(),
    Traits.Sealed.clone(),
    Traits.VacuumSupport.clone(),
    Traits.Invertebrate.clone(),
  ],
}
Templates.BodyOfEarth.traits[1].levels = 2;
Templates.BodyOfEarth.traits[2].name = "Immunity";
Templates.BodyOfEarth.traits[2].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.BodyOfEarth.traits[2].description = "metabolic hazards";
Templates.BodyOfEarth.traits[3].ConstantModsArray = [{text:"Diffuse",value :100}];
Templates.BodyOfEarth.traits[4].levels = 3;


Templates.BodyOfFire = {
  name  : "Body of Fire",
  value :  6,
  ref   : 'B262',
  meta  : true,
  traits :[
    Traits.IncreasedHP.clone(),
    Traits.BurningAttack.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    new Trait( "Taboo Trait", "D", "P", 0 ),
    Traits.DecreasedST.clone(),
    Traits.NoManipulators.clone(),
    Traits.Weakness.clone(),
  ],
}
Templates.BodyOfFire.traits[0].levels = 10;
Templates.BodyOfFire.traits[1].levels = 1;
Templates.BodyOfFire.traits[1].EnhLimsArray = [{text:"Always On",value:-40},{text:"Aura",value:80},{text:"Melee Attack, Reach C",value:-30}];
Templates.BodyOfFire.traits[2].EnhLimsArray = [{text:"Oxygen Combustion",value:-50}];
Templates.BodyOfFire.traits[3].levels = 10;
Templates.BodyOfFire.traits[3].EnhLimsArray = [{text:"Limited: Heat/Fire",value:-40}];
Templates.BodyOfFire.traits[4].name = "Immunity";
Templates.BodyOfFire.traits[4].ConstantModsArray = [{text:"Very Common",value:30}];
Templates.BodyOfFire.traits[4].description = "metabolic hazards";
Templates.BodyOfFire.traits[5].ConstantModsArray = [{text:"Diffuse",value:100}];
Templates.BodyOfFire.traits[6].key = "TabooTraitFixedST";
Templates.BodyOfFire.traits[6].description = "Fixed ST";
Templates.BodyOfFire.traits[7].levels = 10;
Templates.BodyOfFire.traits[8].levels = 2;
Templates.BodyOfFire.traits[9].description = "Water";
Templates.BodyOfFire.traits[9].ConstantModsArray = [{text:"1d/minute",value:-20}];
Templates.BodyOfFire.traits[9].MultipliersArray = [{text:"common",value:2}];


Templates.BodyOfIce = {
  name  : "Body of Ice",
  value :  99,
  ref   : 'B262',
  meta  : true,
  traits :[
    Traits.DoesntBreathe.clone(),
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.PressureSupport.clone(),
    Traits.Sealed.clone(),
    Traits.Slippery.clone(),
    Traits.TerrainAdaptation.clone(),
    Traits.VacuumSupport.clone(),
    Traits.Fragile.clone(),
    Traits.Vulnerability.clone(),
    Traits.Weakness.clone(),
  ],
}
Templates.BodyOfIce.traits[1].levels = 3;
Templates.BodyOfIce.traits[2].name = "Immunity";
Templates.BodyOfIce.traits[2].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.BodyOfIce.traits[2].description = "metabolic hazards";
Templates.BodyOfIce.traits[3].ConstantModsArray = [{text:"Homogenous, No Blood",value :45}];
Templates.BodyOfIce.traits[4].levels = 3;   // Pressure Support 3
Templates.BodyOfIce.traits[6].levels = 3;   // Slippery 3
Templates.BodyOfIce.traits[7].description = "Ice";
Templates.BodyOfIce.traits[8].levels = 3;   // Vacuum Support 3
Templates.BodyOfIce.traits[9].description = "";
Templates.BodyOfIce.traits[9].ConstantModsArray = [{text:"Brittle",value :-15}];
Templates.BodyOfIce.traits[10].levels = 3;   // Vulnerability to a common attack (heat/fire)
Templates.BodyOfIce.traits[10].description = "heat/fire";
Templates.BodyOfIce.traits[10].MultipliersArray = [{text:"Damage ×2",value:2}];
Templates.BodyOfIce.traits[11].description = "intense normal heat";
Templates.BodyOfIce.traits[11].ConstantModsArray = [{text:"Damage Rate: 1d per minute",value:-20}],
Templates.BodyOfIce.traits[11].EnhLimsArray = [{text:"Variable",value:-40}],
Templates.BodyOfIce.traits[11].MultipliersArray = [{text:"Occasional",value:1}]


Templates.BodyOfMetal = {
  name  : "Body of Metal",
  value :  175,
  ref   : 'B262',
  meta  : true,
  traits :[
    Traits.DoesntBreathe.clone(),
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.PressureSupport.clone(),
    Traits.Sealed.clone(),
    Traits.VacuumSupport.clone(),
  ],
}
Templates.BodyOfMetal.traits[1].levels = 9;
Templates.BodyOfMetal.traits[2].name = "Immunity";
Templates.BodyOfMetal.traits[2].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.BodyOfMetal.traits[2].description = "metabolic hazards";
Templates.BodyOfMetal.traits[3].ConstantModsArray = [{text:"Homogenous, No Blood",value :45}];
Templates.BodyOfMetal.traits[4].levels = 3;


Templates.BodyOfStone = {
  name  : "Body of Stone",
  value :  140,
  ref   : 'B262',
  meta  : true,
  traits :[
    Traits.DoesntBreathe.clone(),
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.PressureSupport.clone(),
    Traits.Sealed.clone(),
    Traits.VacuumSupport.clone(),
    Traits.Fragile.clone(),
  ],
}
Templates.BodyOfStone.traits[1].levels = 5;
Templates.BodyOfStone.traits[2].name = "Immunity";
Templates.BodyOfStone.traits[2].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.BodyOfStone.traits[2].description = "metabolic hazards";
Templates.BodyOfStone.traits[3].ConstantModsArray = [{text:"Homogenous, No Blood",value :45}];
Templates.BodyOfStone.traits[4].levels = 3;   // Pressure Support 3
Templates.BodyOfStone.traits[6].levels = 3;   // Vacuum Support 3
Templates.BodyOfStone.traits[7].description = "";
Templates.BodyOfStone.traits[7].ConstantModsArray = [{text:"Brittle",value :-15}];


Templates.BodyOfWater = {
  name  : "Body of Water",
  value :  175,
  ref   : 'B262',
  meta  : true,
  traits :[
    Traits.Amphibious.clone(),
    Traits.Chameleon.clone(),
    Traits.ConstrictionAttack.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.PressureSupport.clone(),
    Traits.Slippery.clone(),
    Traits.Invertebrate.clone(),
    Traits.Vulnerability.clone(),
  ],
}
Templates.BodyOfWater.traits[1].levels = 1; // Chameleon 1
Templates.BodyOfWater.traits[4].name = "Immunity";
Templates.BodyOfWater.traits[4].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.BodyOfWater.traits[4].description = "metabolic hazards";
Templates.BodyOfWater.traits[5].ConstantModsArray = [{text:"Diffuse",value :100}];
Templates.BodyOfWater.traits[6].levels = 3;   // Pressure Support 3
Templates.BodyOfWater.traits[7].levels = 5;   // Slippery 5
Templates.BodyOfWater.traits[9].levels = 1;
Templates.BodyOfWater.traits[9].MultipliersArray = [{text:"Damage ×2",value :2}];
Templates.BodyOfWater.traits[9].description = "Dehydration";


Templates.Machine = {
  name  : "Machine",
  value :  25,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    new Trait( "8-hr 'Battery'", "AD", "P", 0 ),
    new Trait( "No Fatigue Points", "AD", "P", 0 ),
    new Trait( "Unaging - Wear Instead", "AD", "P", 0 ),
    Traits.Unhealing.clone(),
  ],
}
Templates.Machine.traits[0].name = "Immunity";
Templates.Machine.traits[0].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.Machine.traits[0].description = "metabolic hazards";
Templates.Machine.traits[1].ConstantModsArray = [{text:"Unliving",value :20},{text:"No Blood",value :5}];
Templates.Machine.traits[2].key = "8hrBattery";
Templates.Machine.traits[3].key = "NoFP";
Templates.Machine.traits[4].key = "UnagingWearInstead";
Templates.Machine.traits[5].levels = 2;


Templates.AI = {
  name  : "AI",
  value :  32,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.AbsoluteTiming.clone(),
    Traits.DigitalMind.clone(),
    Traits.DoesntSleep.clone(),
    Traits.IntuitiveMathematician.clone(),
    Traits.PhotographicMemory.clone(),
    Traits.Reprogrammable.clone(),
  ],
}


Templates.Automaton = {
  name  : "Automaton",
  value : -85,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.Hidebound.clone(),
    Traits.Incurious.clone(),
    Traits.LowEmpathy.clone(),
    Traits.NoSenseofHumor.clone(),
    Traits.SlaveMentality.clone(),
  ],
}
Templates.Automaton.traits[1].MultipliersArray = [{text:"6",value:2}];


Templates.DomesticAnimal = {
  name  : "Domestic Animal",
  value : -30,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.CannotSpeak.clone(),
    Traits.Hidebound.clone(),
    Traits.SocialStigma.clone(),
    new Trait( "Taboo Trait", "D", "M", 0 ),
  ],
}
delete Templates.DomesticAnimal.traits[0].description;		// remove the "see also Mute" comment from Cannot Speak disad
Templates.DomesticAnimal.traits[2].levels = -2;
Templates.DomesticAnimal.traits[2].description = "Valuable Property";
Templates.DomesticAnimal.traits[3].key = "TabooTraitFixedIQ";
Templates.DomesticAnimal.traits[3].description = "Fixed IQ";


Templates.WildAnimal = {
  name  : "Wild Animal",
  value : -30,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.Bestial.clone(),
    Traits.CannotSpeak.clone(),
    Traits.Hidebound.clone(),
    new Trait( "Taboo Trait", "D", "M", 0 ),
  ],
}
delete Templates.WildAnimal.traits[1].description;		// remove the "see also Mute" comment from Cannot Speak disad
Templates.WildAnimal.traits[3].key = "TabooTraitFixedIQ";
Templates.WildAnimal.traits[3].description = "Fixed IQ";


Templates.GroundVehicle = {
  name  : "Ground Vehicle",
  value : -100,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.Horizontal.clone(),
    Traits.NoLegsTrackedWheeled.clone(),
    Traits.NoManipulators.clone(),
    Traits.Numb.clone()
  ],
}


Templates.Ichthyoid = {
  name  : "Ichthyoid",
  value : -50,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.NoLegsAquatic.clone(),
    Traits.NoManipulators.clone(),
  ],
}


Templates.Quadruped = {
  name  : "Quadruped",
  value : -35,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.ExtraLegs.clone(),
    Traits.Horizontal.clone(),
    Traits.NoFineManipulators.clone(),
  ],
}
Templates.Quadruped.traits[0].levels = 1;  // 4 legs


Templates.Vermiform = {
  name  : "Vermiform",
  value : -35,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.DoubleJointed.clone(),
    Traits.NoLegsBounceRollSlither.clone(),
    Traits.NoManipulators.clone(),
  ],
}


Templates.Spirit = {
  name  : "Spirit",
  value :  261,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),
    Traits.DoesntSleep.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.Insubstantiality.clone(),
    Traits.Invisibility.clone(),
    Traits.Unaging.clone(),
  ],
}
Templates.Spirit.traits[3].name = "Immunity";
Templates.Spirit.traits[3].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.Spirit.traits[3].description = "metabolic hazards";
Templates.Spirit.traits[4].EnhLimsArray = [{text:"Affect Substantial",value:100},{text:"Usually On",value:-40}];
Templates.Spirit.traits[5].EnhLimsArray = [{text:"Substantial Only",value:-10},{text:"Usually On",value:5}];


Templates.AstralEntity = {
  name  : "Astral Entity",
  value :  171,
  ref   : 'B263',
  meta  : true,
  traits :[
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),
    Traits.DoesntSleep.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.Insubstantiality.clone(),
    Traits.Invisibility.clone(),
    Traits.Unaging.clone(),
  ],
}
Templates.AstralEntity.traits[3].name = "Immunity";
Templates.AstralEntity.traits[3].ConstantModsArray = [{text:"Very Common",value :30}];
Templates.AstralEntity.traits[3].description = "metabolic hazards";
Templates.AstralEntity.traits[4].EnhLimsArray = [{text:"Always On",value:-50}];
Templates.AstralEntity.traits[5].EnhLimsArray = [{text:"Substantial Only",value:-10}];


for ( var t in Templates ) {
    if( !Templates[t].hasOwnProperty('key') ) Templates[t].key = t;
};
// special symbols: ≤ ≥ ± × ÷ « » ∞ †
/* unicode sybmols
      <carriage return>       &#13;
  ⁰   <superscript 0>
  ²   <superscript 2>         &sup2;
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
  
  ′   <feet, arc minutes>     &prime;
  ″   <inches, arc seconds>   &Prime;

  ½                           &frac12; or &#189;
  ⅓                           &#8531;
  ⅔                           &#8532;
  ¼                           &frac14; or &#188;
  ¾                           &frac34; or &‌#190;
  ⅕                           &‌#8533;
  ⅖ 	                       	&‌#8534;
  ⅗ 	                       	&‌#8535;
  ⅘ 	                       	&‌#8536;
  ⅙ 	                       	&‌#8537;
  ⅚ 	                       	&‌#8538;
  ⅐ 	                       	&‌#8528;
  ⅛ 	                      	&‌#8539;
  ⅜ 	                       	&‌#8540;
  ⅝ 	                       	&‌#8541;
  ⅞ 	                       	&‌#8542;
  ⅑ 	                       	&‌#8529;
  ⅒ 	                       	&‌#8530;
  /   <fraction slash>        &frasl; or &#8260;    uses kerning to create a tight fraction when used with HTML super- and subscripts
*/
// console.log(libraryName+' loaded');