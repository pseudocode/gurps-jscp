/*  Assumptions
    This is a supplemental rules library.  It assumes that main library objects
    (Traits, Skills, Spells, Groups, Prerequisites, Adjustments, Modifiers)
    are already defined in another library file (basic4e_library.js, for instance).
    Add-on libraries like this one add new entries to those existing objects.
*/

// Spells.SpellName.classes = { reg: true, area: true, riq: true, rwi: true, rpe: true, rst: true, rht: true, rdx: true, info: true, block: true, spcl: true, msl: true, melee: true, ench: true };
// Spells.SpellName.stats = { duration: 'instant', castcost: '&mdash;', maintaincost: '&mdash;', time: 1, notes: '' };    // these are the defaults in loadCharacter

var newLibrary = "GURPS Magic, 3rd edition";   // this gets processed like NewEquipment, etc. in processNewLibraryItems(), not when this file gets loaded
/* This library is compatible with GURPS Basic Set, 4th edition */
var libAbrv = 'M3E';     // This should correspond to one found in the list is at http://www.sjgames.com/gurps/abbrevs.html (also in gurps.js:titleForAbbreviation)

addColleges('Air','Earth','Fire','Water','Animal','BodyControl','CommunicationEmpathy',
    'Enchantment','Food','Gate','Healing','IllusionCreation','Knowledge',
    'LightDarkness','MakingBreaking','Meta','MindControl','Movement',
    'Necromantic','Plant','ProtectionWarning','Sound','Technological','Weather');
// college names, if different from labels above
collegeNames.BodyControl = 'Body Control';
collegeNames.CommunicationEmpathy = 'Comm & Empathy';
collegeNames.IllusionCreation = 'Illusion & Creation';
collegeNames.LightDarkness = 'Light & Darkness';
collegeNames.MakingBreaking = 'Making & Breaking';
collegeNames.MindControl = 'Mind Control';
collegeNames.ProtectionWarning = 'Protection & Warning';

// non-College spell groups
addToGroup('AnimalControlSpells');  // this will only create an empty group; need to be able to count these somehow
addToGroup("ShapeSpells",
['ShapeAir','ShapeEarth','ShapeFire','ShapeWater','ShapeLight','ShapeDarkness','ShapeMetal',
'ShapePlant','ShapePlastic']);
addToGroup("ShapeSpells",['ShapeAir','ShapeEarth','ShapeFire','ShapeWater']);
addToGroup("LimitingSpells",['Limit','Name','Password','Link','Attune']);
addToGroup("WeaponEnchantment",['Bane','GracefulWeapon','LoyalSword','QuickDraw','PenetratingWeapon',
'DancingWeapon','DefendingWeapon','WeaponSpirit','Cornucopia','QuickAim','Accuracy','Puissance',
'GhostWeapon','SpellArrow','BlankSpellArrow','SpeedSpellArrow']);
addToGroup("ArmorEnchantment",['Fortify','Deflect','Lighten','DancingShield','DefendingShield']);
addToGroup("WizardToolEnchantment",['Powerstone','Manastone','StaffSpell','Homunculus','Effigy','SoulStone','CrystalBall','Lich','Wraith',]);
addToGroup("SeekSpells",['SeekAir','SeekCoastline','SeekEarth','SeekFire','SeekFood','SeekFuel',
'SeekGate','SeekMachine','SeekMagic','SeekPass','SeekPlant','SeekPlastic','SeekPower',
'SeekRadiation','SeekWater']);
addToGroup("ShiftingSpells",['Shapeshifting','AlterVisage','AlterBody','PlantForm','Shrink']);  // may be others
addToGroup("RestoreRelieveSpells",['RestoreSight','RestoreHearing','RestoreMemory','RestoreSpeech','RelieveParalysis']);
addToGroup("ResistSpells",
['ResistAcid','ResistCold','ResistDisease','ResistEnchantment','ResistFire','ResistLightning',
'ResistPain','ResistPoison','ResistPressure','ResistRadiation','ResistSound','ResistWater']);
addToGroup("AcidSpells",['CreateAcid','ResistAcid','RainofAcid','AcidBall','AcidJet','SpitAcid','EssentialAcid']);
addToGroup("LightningSpells",
['Lightning','ResistLightning','ExplosiveLightning','LightningWhip','WallofLightning',
'BallofLightning','LightningStare','BodyofLightning','LightningArmor','LightningWeapon',
'LightningMissiles']);
addToGroup("WalkThroughSpells",['WalkThroughEarth','WalkThroughPlants','WalkThroughWood','WalkThroughWater']);
addToGroup("ElementalColleges",["AirSpells","EarthSpells","FireSpells","WaterSpells"]);


// new college-aspected Magery traits
NewTraits.MageryBeast         = new Trait( "Beast-Magery", 'A', 'M', 6, true, "B4E66" );
NewTraits.MageryBeast.description = "Animal single-college Magery";
NewTraits.MageryBeast.exoticSprntl = 'Supernatural';
NewTraits.MageryBeast.group = 'CollegeAspectedMagery';
NewTraits.MageryFood          = new Trait( "Food-Magery", 'A', 'M', 6, true, "B4E66" );
NewTraits.MageryFood.description = "Food single-college Magery";
NewTraits.MageryFood.exoticSprntl = 'Supernatural';
NewTraits.MageryFood.group = 'CollegeAspectedMagery';
NewTraits.MageryIllusion      = new Trait( "Illusion-Magery", 'A', 'M', 6, true, "B4E66" );
NewTraits.MageryIllusion.description = "Illusion & Creation single-college Magery";
NewTraits.MageryIllusion.exoticSprntl = 'Supernatural';
NewTraits.MageryIllusion.group = 'CollegeAspectedMagery';
NewTraits.MageryMake          = new Trait( "Make-Magery", 'A', 'M', 6, true, "B4E66" );
NewTraits.MageryMake.description = "Making & Breaking single-college Magery";
NewTraits.MageryMake.exoticSprntl = 'Supernatural';
NewTraits.MageryMake.group = 'CollegeAspectedMagery';
NewTraits.MageryPlant         = new Trait( "Plant-Magery", 'A', 'M', 6, true, "B4E66" );
NewTraits.MageryPlant.description = "Plant single-college Magery";
NewTraits.MageryPlant.exoticSprntl = 'Supernatural';
NewTraits.MageryPlant.group = 'CollegeAspectedMagery';
NewTraits.MagerySound         = new Trait( "Sound-Magery", 'A', 'M', 6, true, "B4E66" );
NewTraits.MagerySound.description = "Sound single-college Magery";
NewTraits.MagerySound.exoticSprntl = 'Supernatural';
NewTraits.MagerySound.group = 'CollegeAspectedMagery';
NewTraits.MageryTech          = new Trait( "Tech-Magery", 'A', 'M', 6, true, "B4E66" );
NewTraits.MageryTech.description = "Technology single-college Magery";
NewTraits.MageryTech.exoticSprntl = 'Supernatural';
NewTraits.MageryTech.group = 'CollegeAspectedMagery';
NewTraits.MageryWeather        = new Trait( "Weather-Magery", 'A', 'M', 6, true, "B4E66" );
NewTraits.MageryWeather.description = "Weather single-college Magery";
NewTraits.MageryWeather.exoticSprntl = 'Supernatural';
NewTraits.MageryWeather.group = 'CollegeAspectedMagery';


addToGroup("AnimalSpells",
['PathofAnimal','AnimalControl','BeastLink','BeastPossession','BeastRouser','BeastSeeker','BeastSoother',
'BeastSpeech','BeastSummoning','GreatShapeshift','HybridControl','Master','PartialShapeshifting',
'PermanentBeastPossession','PermanentShapeshifting','ProtectAnimal','RepelAnimal','RepelHybrids',
'Rider','RiderWithin','Shapeshifting','ShapeshiftOthers','SpiderSilk']);
NewSpells.AnimalControl = new Skill( "Animal Control", 'IQ', 2, libAbrv+30 );
NewSpells.AnimalControl.classes = { reg: true, rwi: true };
NewSpells.AnimalControl.stats   = { duration: '1 min', castcost: 'Equal to the racial IQ of the most intelligent species within the category.', maintaincost: '½ C2C' };
NewSpells.AnimalControl.specRequiredList = [];
NewPrerequisites.AnimalControl_requires_BeastSoother = { target: 'AnimalControl', prereq: 'BeastSoother' };
NewSpells.BeastLink = new Skill( "Beast Link", 'IQ', 2, libAbrv+30 );
NewSpells.BeastLink.classes = { reg: true };
NewSpells.BeastLink.stats   = { duration: 'until called', castcost: 3, time: 5 };
NewPrerequisites.BeastLink_requires_BeastSummoning = { target: 'BeastLink', prereq: 'BeastSummoning' };
NewSpells.BeastPossession = new Skill( "Beast Possession", 'IQ', 2, libAbrv+32 );
NewSpells.BeastPossession.classes = { reg: true, rwi: true };
NewSpells.BeastPossession.stats   = { duration: '1 min', castcost: 6, maintaincost: 2, time: 5 };
NewPrerequisites.BeastPossession_requires_RiderWithin_pgroup1 = { target: 'BeastPossession', prereq: 'RiderWithin', pgroup: 1 };
NewPrerequisites.BeastPossession_requires_Possession_pgroup1  = { target: 'BeastPossession', prereq: 'Possession', pgroup: 1 };
NewSpells.BeastRouser = new Skill( "Beast-Rouser", 'IQ', 2, libAbrv+30 );
NewSpells.BeastRouser.classes = { reg: true };
NewSpells.BeastRouser.stats   = { duration: 'Until a reaction roll is called for or an hour passes.', castcost: '1 to 3', maintaincost: 'cannot be maintained' };
NewPrerequisites.BeastRouser_requires_Vexation_pgroup1      = { target: 'BeastRouser', prereq: 'Vexation',    pgroup: 1 };
NewPrerequisites.BeastRouser_requires_AnimalEmpathy_pgroup1 = { target: 'BeastRouser', prereq: 'AnimalEmpathy', pgroup: 1, category: 'ADS' };
NewSpells.BeastSeeker = new Skill( "Beast Seeker", 'IQ', 2, libAbrv+32 );
NewSpells.BeastSeeker.classes = { info: true };
NewSpells.BeastSeeker.stats   = { castcost: 3 };
NewPrerequisites.BeastSeeker_requires_BeastSummoning_pgroup1 = { target: 'BeastSeeker', prereq: 'BeastSummoning', pgroup: 1 };
NewPrerequisites.BeastSeeker_requires_Seeker_pgroup1 = { target: 'BeastSeeker', prereq: 'Seeker', pgroup: 1 };
NewPrerequisites.BeastSeeker_requires_SeekSpells_pgroup2 = { target: 'BeastSeeker', number: 2, prereq: 'SeekSpells', pgroup: 2 };
NewPrerequisites.BeastSeeker_requires_Seeker_pgroup2 = { target: 'BeastSeeker', prereq: 'Seeker', pgroup: 2 };
NewSpells.BeastSoother = new Skill( "Beast-Soother", 'IQ', 2, libAbrv+29 );
NewSpells.BeastSoother.classes = { reg: true };
NewSpells.BeastSoother.stats   = { castcost: '1 to 3' };
NewPrerequisites.BeastSoother_requires_Persuasion_pgroup1    = { target: 'BeastSoother', prereq: 'Persuasion',    pgroup: 1 };
NewPrerequisites.BeastSoother_requires_AnimalEmpathy_pgroup1 = { target: 'BeastSoother', prereq: 'AnimalEmpathy', pgroup: 1, category: 'ADS' };
NewSpells.BeastSpeech = new Skill( "Beast Speech", 'IQ', 2, libAbrv+31 );
NewSpells.BeastSpeech.classes = { reg: true };
NewSpells.BeastSpeech.stats   = { duration: '1 min', castcost: 4, maintaincost: 2 };
NewPrerequisites.BeastSpeech_requires_BeastSummoning = { target: 'BeastSpeech', prereq: 'BeastSummoning' };
NewSpells.BeastSummoning = new Skill( "Beast Summoning", 'IQ', 2, libAbrv+30 );
NewSpells.BeastSummoning.classes = { reg: true };
NewSpells.BeastSummoning.stats   = { duration: '1 min', castcost: 3, maintaincost: 2, notes: 'To call many animals, double the cost of the spell.' };
NewPrerequisites.BeastSummoning_requires_BeastSoother = { target: 'BeastSummoning', prereq: 'BeastSoother' };
NewSpells.GreatShapeshift = new Skill( "Great Shapeshift", 'IQ', 3, libAbrv+34 );
NewSpells.GreatShapeshift.classes = { spcl: true };
NewSpells.GreatShapeshift.stats   = { duration: '1 min', castcost: '20 + 1 per 5 add&rquo;l CP of template limit', maintaincost: '½ C2C', time: 5 };
NewPrerequisites.GreatShapeshift_requires_Magery3         = { target: 'GreatShapeshift', prereq: 'Magery', category: 'ADS', level: 3 };
NewPrerequisites.GreatShapeshift_requires_AlterBody       = { target: 'GreatShapeshift', prereq: 'AlterBody' };
NewPrerequisites.GreatShapeshift_requires_4ShiftingSpells = { target: 'GreatShapeshift', prereq: 'ShiftingSpells', number: 4 };
NewPrerequisites.GreatShapeshift_requires_15spells        = { target: 'GreatShapeshift', prereq: 'Spells', number: 15 };  // Alter Body, 4 Shapeshifting spells, and 10 others
NewSpells.HybridControl = new Skill( "Hybrid Control", 'IQ', 3, libAbrv+30 );
NewSpells.HybridControl.classes = { reg: true, rwi: true };
NewSpells.HybridControl.stats   = { duration: '1 min', castcost: 6, maintaincost: 3, notes: 'Prerequisite: All (Animal) Control spells relevant to the target.  Effective skill with this spell is the lowest of the various spells involved, including Hybrid Control.' };
NewPrerequisites.HybridControl_requires_2AnimalControlSpells = { target: 'HybridControl', number: 2, prereq: 'AnimalControl' };
NewSpells.Master = new Skill( "Master", 'IQ', 2, libAbrv+30 );
NewSpells.Master.classes = { reg: true, block: true, riq: true };
NewSpells.Master.stats   = { castcost: 2 };
NewPrerequisites.Master_requires_BeastSoother = { target: 'Master', prereq: 'BeastSoother' };
NewSpells.PartialShapeshifting = new Skill( "Partial Shapeshifting", 'IQ', 3, libAbrv+34 );
NewSpells.PartialShapeshifting.specRequiredList = [];
NewSpells.PartialShapeshifting.classes = { reg: true, rwi: true };
NewSpells.PartialShapeshifting.stats   = { duration: '1 hr', castcost: '3 to 10 or more', maintaincost: '½ C2C', time: 10 };
NewPrerequisites.PartialShapeshifting_requires_Magery3       = { target: 'PartialShapeshifting', prereq: 'Magery', category: 'ADS', level: 3 };
NewPrerequisites.PartialShapeshifting_requires_Shapeshifting = { target: 'PartialShapeshifting', prereq: 'Shapeshifting', prereqSpec: 'same' };
NewPrerequisites.PartialShapeshifting_requires_AlterBody     = { target: 'PartialShapeshifting', prereq: 'AlterBody' };
NewSpells.PermanentBeastPossession = new Skill( "Permanent Beast Possession", 'IQ', 3, libAbrv+32 );
NewSpells.PermanentBeastPossession.classes = { reg: true, rwi: true };
NewSpells.PermanentBeastPossession.stats   = { duration: '1 min', castcost: 20, time: '1 min' };
NewPrerequisites.PermanentBeastPossession_requires_Magery2         = { target: 'PermanentBeastPossession', prereq: 'Magery', category: 'ADS', level: 2 };
NewPrerequisites.PermanentBeastPossession_requires_BeastPossession = { target: 'PermanentBeastPossession', prereq: 'BeastPossession' };
NewSpells.PermanentShapeshifting = new Skill( "Permanent Shapeshifting", 'IQ', 3, libAbrv+33 );
NewSpells.PermanentShapeshifting.specRequiredList = [];
NewSpells.PermanentShapeshifting.classes = { reg: true };
NewSpells.PermanentShapeshifting.stats   = { castcost: '5 × cost for Shapeshifting (same animal)', time: '1 min' };
NewPrerequisites.PermanentShapeshifting_requires_Magery3          = { target: 'PermanentShapeshifting', prereq: 'Magery', category: 'ADS', level: 3 };
NewPrerequisites.PermanentShapeshifting_requires_ShapeshiftOthers = { target: 'PermanentShapeshifting', prereq: 'ShapeshiftOthers', prereqSpec: 'same' };
NewSpells.ProtectAnimal = new Skill( "Protect Animal", 'IQ', 2, libAbrv+32 );
NewSpells.ProtectAnimal.classes = { area: true };
NewSpells.ProtectAnimal.stats   = { duration: '1 min', time: '1 min', castcost: 1, maintaincost: 1 };
NewPrerequisites.ProtectAnimal_requires_Armor         = { target: 'ProtectAnimal', prereq: 'Armor' };
NewPrerequisites.ProtectAnimal_requires_Watchdog      = { target: 'ProtectAnimal', prereq: 'Watchdog' };
NewPrerequisites.ProtectAnimal_requires_3AnimalSpells = { target: 'ProtectAnimal', prereq: 'Animal', number: 3 };
NewSpells.RepelAnimal = new Skill( "Repel Animal", 'IQ', 2, libAbrv+31 );
NewSpells.RepelAnimal.classes = { area: true };
NewSpells.RepelAnimal.stats   = { duration: '1 hr', time: 10, castcost: 'Equal to the racial IQ of the most intelligent species within the category.', maintaincost: '½ C2C' };
NewSpells.RepelAnimal.specRequiredList = [];
NewPrerequisites.RepelAnimal_requires_AnimalControl = { target: 'RepelAnimal', prereq: 'AnimalControl', prereqSpec: 'same' };
NewSpells.RepelHybrids = new Skill( "Repel Hybrids", 'IQ', 3, libAbrv+31 );
NewSpells.RepelHybrids.classes = { area: true };
NewSpells.RepelHybrids.stats   = { duration: '1 hr', time: 10, castcost: 6, maintaincost: 3, notes: 'Prerequisite: All Repel (Animal) spells relevant to the target.  Effective skill with this spell is the lowest of the various spells involved, including Repel Hybrids.' };
NewSpells.RepelHybrids.specRequiredList = [];
NewPrerequisites.RepelHybrids_requires_HybridControl = { target: 'RepelHybrids', prereq: 'HybridControl' };
NewSpells.Rider = new Skill( "Rider", 'IQ', 2, libAbrv+31 );
NewSpells.Rider.classes = { reg: true };
NewSpells.Rider.stats   = { duration: '5 min', castcost: 2, maintaincost: 1, notes: 'You cannot use the Rider spell on a beast unless you know the appropriate Control spell and cast it first.' };
NewPrerequisites.Rider_requires_1AnimalControlSpell = { target: 'Rider', prereq: 'AnimalControl', number: 1 };
NewSpells.RiderWithin = new Skill( "Rider Within", 'IQ', 2, libAbrv+31 );
NewSpells.RiderWithin.classes = { reg: true };
NewSpells.RiderWithin.stats   = { duration: '1 min', castcost: 4, maintaincost: 1, time: 3, notes: 'The caster must know the (Animal) Control spell for the type of animal being &ldquo;ridden&rdquo; before he can use this spell on that type of animal.' };
NewPrerequisites.RiderWithin_requires_2AnimalControlSpells = { target: 'RiderWithin', prereq: 'AnimalControl', number: 2 };
NewSpells.Shapeshifting = new Skill( "Shapeshifting", 'IQ', 3, libAbrv+32  );
NewSpells.Shapeshifting.specRequiredList = [];
NewSpells.Shapeshifting.classes = { spcl: true };
NewSpells.Shapeshifting.stats   = { duration: '1 hr', castcost: '6, or 1/20 CP value (min 3)', maintaincost: '2, or 1/60 CP value (min 1)', time: 3 };
NewPrerequisites.Shapeshifting_requires_Magery1 = { target: 'Shapeshifting', prereq: 'Magery', category: 'ADS', level: 1 };
NewPrerequisites.Shapeshifting_requires_6spells = { target: 'Shapeshifting', prereq: 'Spells', number: 6 };
NewSpells.ShapeshiftOthers = new Skill( "Shapeshift Others", 'IQ', 3, libAbrv+33  );
NewSpells.ShapeshiftOthers.classes = { spcl: true, rwi: true };
NewSpells.ShapeshiftOthers.stats   = { duration: '1 hr', castcost: '6, or 1/20 CP value (min 6)', maintaincost: '2, or 1/60 CP value (min 2)', time: 30 };
NewPrerequisites.ShapeshiftOthers_requires_Magery2       = { target: 'ShapeshiftOthers', prereq: 'Magery', category: 'ADS', level: 2 };
NewPrerequisites.ShapeshiftOthers_requires_Shapeshifting = { target: 'ShapeshiftOthers', prereq: 'Shapeshifting' };
NewSpells.SpiderSilk = new Skill( "Spider Silk", 'IQ', 2, libAbrv+32 );
NewSpells.SpiderSilk.classes = { msl: true, spcl: true };
NewSpells.SpiderSilk.stats   = { castcost: '1 per 5yds (max 100yds)', maintaincost: '½ C2C' };
NewPrerequisites.SpiderSilk_requires_Magery1 = { target: 'SpiderSilk', prereq: 'Magery', category: 'ADS', level: 1 };
NewPrerequisites.SpiderSilk_requires_2Animal = { target: 'SpiderSilk', prereq: 'AnimalSpells', number: 2 };


addToGroup("AirSpells",
['AirJet','AirVision','AirVortex','AtmosphereDome','BallofLightning','BodyofLightning',
'BodyofAir','BodyofWind','BreatheAir','BreatheWater','Clouds','Concussion',
'ControlAirElemental','Cool','CreateAir','CreateAirElemental','DestroyAir',
'DevitalizeAir','EarthtoAir','EssentialAir','ExplosiveLightning','Lightning',
'LightningArmor','LightningMissiles','LightningWeapon','LightningWhip','LightningStare',
'NoSmell','Odor','PredictWeather','PurifyAir','Rain','ResistLightning','Sandstorm',
'SeekAir','ShapeAir','ShockingTouch','Snow','SparkCloud','SparkStorm','Stench','Storm',
'SummonAirElemental','WalkonAirSpell','WallofLightning','WallofWind','Warm','Wind','Windstorm']);
NewSpells.AirJet = new Skill( "Air Jet", 'IQ', 2, libAbrv+24 );
NewSpells.AirJet.classes = { reg: true };
NewSpells.AirJet.stats   = { castcost: '1 to 3', maintaincost: 'same', duration: 1 };
NewPrerequisites.AirJet_requires_ShapeAir = { target: 'AirJet', prereq: 'ShapeAir' };
NewSpells.AirVision = new Skill( "Air Vision", 'IQ', 2, libAbrv+24 );
NewSpells.AirVision.classes = { reg: true };
NewSpells.AirVision.stats   = { castcost: '1/mile', maintaincost: '½ C2C', duration: 1, notes: 'Does 2d damage (usually knockback only) per FP.  Range = # of dice.' };
NewPrerequisites.AirVision_requires_ShapeAir = { target: 'AirVision', prereq: 'ShapeAir' };
NewSpells.AirVortex = new Skill( "Air Vortex", 'IQ', 2, libAbrv+25 );
NewSpells.AirVortex.classes = { area: true, rht: true, rdx: true };
NewSpells.AirVortex.stats   = { duration: 10, castcost: 8, maintaincost: 3, time: 2 };
NewPrerequisites.AirVortex_requires_Magery2   = { target: 'AirVortex', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.AirVortex_requires_BodyofAir = { target: 'AirVortex', prereq: 'BodyofAir' };
NewPrerequisites.AirVortex_requires_Windstorm = { target: 'AirVortex', prereq: 'Windstorm' };
NewSpells.BodyofAir = new Skill( "Body of Air", 'IQ', 2, libAbrv+24 );
NewSpells.BodyofAir.classes = { reg: true, rht: true };
NewSpells.BodyofAir.stats   = { duration: '1 min', castcost: 4, maintaincost: 1, time: 5 };
NewPrerequisites.BodyofAir_requires_ShapeAir = { target: 'BodyofAir', prereq: 'ShapeAir' };
NewSpells.BodyofWind = new Skill( "Body of Wind", 'IQ', 2, libAbrv+27 );
NewSpells.BodyofWind.classes = { reg: true, rht: true };
NewSpells.BodyofWind.stats   = { duration: '1 min', castcost: 4, maintaincost: 1, time: 5 };
NewPrerequisites.BodyofWind_requires_Magery2 = { target: 'BodyofWind', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.BodyofWind_requires_BodyofAir = { target: 'BodyofWind', prereq: 'BodyofAir', level: 16 };
NewPrerequisites.BodyofWind_requires_Windstorm = { target: 'BodyofWind', prereq: 'Windstorm', level: 16 };
NewPrerequisites.BodyofWind_requires_5nonAirColleges = { target: 'BodyofWind', prereq: 'MagicColleges', number: 6 };
NewSpells.BreatheAir = new Skill( "Breathe Air", 'IQ', 2, libAbrv+26 );
NewSpells.BreatheAir.classes = { reg: true };
NewSpells.BreatheAir.stats   = { duration: '1 min', castcost: 3, maintaincost: 1 };
NewPrerequisites.BreatheAir_requires_CreateAir    = { target: 'BreatheAir', prereq: 'CreateWater' };
NewPrerequisites.BreatheAir_requires_DestroyWater = { target: 'BreatheAir', prereq: 'DestroyAir' };
NewSpells.Concussion = new Skill( "Concussion", 'IQ', 2, libAbrv+26 );
NewSpells.Concussion.classes = { msl: true };
NewSpells.Concussion.stats   = { castcost: '2/1d damage, max Magery&times;2/sec', time: '1 to 3 sec' };
NewPrerequisites.Concussion_requires_ShapeAir    = { target: 'Concussion', prereq: 'ShapeAir' };
NewPrerequisites.Concussion_requires_Thunderclap = { target: 'Concussion', prereq: 'Thunderclap' };
NewSpells.ControlAirElemental = new Skill( "Control Air Elemental", 'IQ', 2, libAbrv+28 );
NewSpells.ControlAirElemental.classes = { reg: true, rst: true, rwi: true };
NewSpells.ControlAirElemental.stats   = { duration: '1 min', castcost: '1/10 CP total', maintaincost: '½ C2C', time: 2 };
NewPrerequisites.ControlAirElemental_requires_SummonAirElemental = { target: 'ControlAirElemental', prereq: 'SummonAirElemental' };
NewSpells.CreateAir = new Skill( "Create Air", 'IQ', 2, libAbrv+23 );
NewSpells.CreateAir.classes = { area: true };
NewSpells.CreateAir.stats   = { castcost: 1, duration: '5 sec', notes: 'cannot be maintained' };
NewPrerequisites.CreateAir_requires_PurifyAir = { target: 'CreateAir', prereq: 'PurifyAir' };
NewSpells.CreateAirElemental = new Skill( "Create Air Elemental", 'IQ', 2, libAbrv+28 );
NewSpells.CreateAirElemental.classes = { spcl: true };
NewSpells.CreateAirElemental.stats   = { castcost: '1/5 CP total', time: 'CP-total seconds' };
NewPrerequisites.CreateAirElemental_requires_Magery2             = { target: 'CreateAirElemental', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.CreateAirElemental_requires_ControlAirElemental = { target: 'CreateAirElemental', prereq: 'ControlAirElemental' };
NewSpells.DestroyAir = new Skill( "Destroy Air", 'IQ', 2, libAbrv+24 );
NewSpells.DestroyAir.classes = { area: true };
NewSpells.DestroyAir.stats   = { castcost: 2 };
NewPrerequisites.DestroyAir_requires_CreateAir = { target: 'DestroyAir', prereq: 'CreateAir' };
NewSpells.DevitalizeAir = new Skill( "Devitalize Air", 'IQ', 2, libAbrv+25 );
NewSpells.DevitalizeAir.classes = { area: true };
NewSpells.DevitalizeAir.stats   = { castcost: 2 };
NewPrerequisites.DevitalizeAir_requires_DestroyAir = { target: 'DevitalizeAir', prereq: 'DestroyAir' };
NewSpells.EarthtoAir = new Skill( "Earth to Air", 'IQ', 2, libAbrv+25 );
NewSpells.EarthtoAir.classes = { reg: true };
NewSpells.EarthtoAir.stats   = { duration: 'permanent', time: 2, castcost: '1/ft&sup3;, 5/yd&sup3;, metal costs &times;3' };
NewPrerequisites.EarthtoAir_requires_CreateAir  = { target: 'EarthtoAir', prereq: 'CreateAir' };
NewPrerequisites.EarthtoAir_requires_ShapeEarth = { target: 'EarthtoAir', prereq: 'ShapeEarth' };
NewSpells.EssentialAir = new Skill( "Essential Air", 'IQ', 2, libAbrv+26 );
NewSpells.EssentialAir.classes = { area: true };
NewSpells.EssentialAir.stats   = { cost: 2, time: 3 };
NewPrerequisites.EssentialAir_requires_6Air = { target: 'EssentialAir', number: 6, prereq: 'Air' };
NewSpells.NoSmell = new Skill( "No-Smell", 'IQ', 2, libAbrv+24 );
NewSpells.NoSmell.classes = { reg: true };
NewSpells.NoSmell.stats   = { castcost: 2, maintaincost: 2, duration: '1 hr' };
NewPrerequisites.NoSmell_requires_PurifyAir = { target: 'NoSmell', prereq: 'PurifyAir' };
NewSpells.Odor = new Skill( "Odor", 'IQ', 2, libAbrv+24 );
NewSpells.Odor.classes = { area: true };
NewSpells.Odor.stats   = { castcost: 1, duration: '1 hr', notes: 'cannot be maintained' };
NewPrerequisites.Odor_requires_NoSmell = { target: 'Odor', prereq: 'NoSmell' };
NewSpells.PurifyAir = new Skill( "Purify Air", 'IQ', 2, libAbrv+23 );
NewSpells.PurifyAir.classes = { area: true };
NewSpells.PurifyAir.stats   = { castcost: 1, notes: 'cannot be maintained' };
NewSpells.Sandstorm = new Skill( "Sandstorm", 'IQ', 2, libAbrv+27 );
NewSpells.Sandstorm.classes = { area: true };
NewSpells.Sandstorm.stats   = { duration: '1 minute after reaching full strength', castcost: 3, maintaincost: '½ C2C', time: "The storm starts immediately, but the caster must concentrate for a number of seconds equal to the storm's radius in yards to bring the storm to full strength." };
NewPrerequisites.Sandstorm_requires_CreateEarth = { target: 'Sandstorm', prereq: 'CreateEarth' };
NewPrerequisites.Sandstorm_requires_Windstorm   = { target: 'Sandstorm', prereq: 'Windstorm' };
NewSpells.SeekAir = new Skill( "Seek Air", 'IQ', 2, libAbrv+23 );
NewSpells.SeekAir.classes = { info: true };
NewSpells.SeekAir.stats   = { castcost: 1 };
NewSpells.ShapeAir = new Skill( "Shape Air", 'IQ', 2, libAbrv+24 );
NewSpells.ShapeAir.classes = { reg: true };
NewSpells.ShapeAir.stats   = { castcost: '1 to 10', maintaincost: 'same', duration: '1 min' };
NewPrerequisites.ShapeAir_requires_CreateAir = { target: 'ShapeAir', prereq: 'CreateAir' };
NewSpells.Stench = new Skill( "Stench", 'IQ', 2, libAbrv+24 );
NewSpells.Stench.classes = { area: true };
NewSpells.Stench.stats   = { duration: '5 min', castcost: 1, notes: 'cannot be maintained' };
NewPrerequisites.Stench_requires_PurifyAir = { target: 'Stench', prereq: 'PurifyAir' };
NewSpells.SummonAirElemental = new Skill( "Summon Air Elemental", 'IQ', 2, libAbrv+27 );
NewSpells.SummonAirElemental.classes = { spcl: true };
NewSpells.SummonAirElemental.stats   = { duration: '1 hr', castcost: '1/10 CP total, min 4', time: 30, notes: 'GM rolls 2d for minutes to appear.  Cannot be maintained.' };
NewPrerequisites.SummonAirElemental_requires_Magery1                      = { target: 'SummonAirElemental', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.SummonAirElemental_requires_4Air                         = { target: 'SummonAirElemental', prereq: 'Air', number: 4 };
NewPrerequisites.SummonAirElemental_requires_8Air_pgroup1                 = { target: 'SummonAirElemental', prereq: 'Air', number: 8,       pgroup: 1 };
NewPrerequisites.SummonAirElemental_requires_SummonEarthElemental_pgroup1 = { target: 'SummonAirElemental', prereq: 'SummonEarthElemental', pgroup: 1 };
NewPrerequisites.SummonAirElemental_requires_SummonFireElemental_pgroup1  = { target: 'SummonAirElemental', prereq: 'SummonFireElemental',  pgroup: 1 };
NewPrerequisites.SummonAirElemental_requires_SummonWaterElemental_pgroup1 = { target: 'SummonAirElemental', prereq: 'SummonWaterElemental', pgroup: 1 };
NewSpells.WalkonAirSpell = new Skill( "Walk on Air", 'IQ', 2, libAbrv+25 );
NewSpells.WalkonAirSpell.classes = { reg: true };
NewSpells.WalkonAirSpell.stats   = { duration: '1 min', castcost: 3, maintaincost: 2 };
NewPrerequisites.WalkonAirSpell_requires_ShapeAir = { target: 'WalkonAirSpell', prereq: 'ShapeAir' };
NewSpells.WallofWind = new Skill( "Wall of Wind", 'IQ', 2, libAbrv+25 );
NewSpells.WallofWind.classes = { area: true };
NewSpells.WallofWind.stats   = { duration: '1 min', castcost: 2, maintaincost: '½ C2C', time: "The wall appears as soon as the casting starts, initially surrounding a one-yard-radius area; the caster may move the perimeter outward at a rate of one yard of radius per second of concentration." };
NewPrerequisites.WallofWind_requires_ShapeAir = { target: 'WallofWind', prereq: 'ShapeAir' };
NewSpells.Windstorm = new Skill( "Windstorm", 'IQ', 2, libAbrv+25 );
NewSpells.Windstorm.classes = { area: true };
NewSpells.Windstorm.stats   = { duration: '1 minute after reaching full strength', castcost: '2 or 4', maintaincost: '½ C2C', time: "The storm starts immediately, but the caster must concentrate for a number of seconds equal to the storm's radius in hexes to bring the storm to full strength." };
NewPrerequisites.Windstorm_requires_ShapeAir = { target: 'Windstorm', prereq: 'ShapeAir' };


addToGroup("BodyControlSpells",
['Agonize','AlterBody','AlterVisage','AlterVoice','Ambidexterity','Balance','Boost',
'Cadence','Choke','ClimbingSpell','Clumsiness','ControlLimb','Corpulence','Deathtouch',
'Debility','Decapitation','Enlarge','EnlargeOther','Frailty','Fumble','Gauntness',
'Grace','Haircut','HairGrowth','Hinder','HoldBreath','Hunger','Itch','LengthenLimb',
'Might','Nauseate','Pain','ParalyzeLimb','Perfume','Reflexes','ResistPain','Retch',
'RootedFeet','Roundabout','Sensitize','Shrink','ShrinkOther','Sickness','Spasm',
'StopSpasm','StrikeBarren','StrikeBlind','StrikeDeaf','StrikeDumb','StrikeNumb',
'Stun','Tanglefoot','Thirst','Tickle','TotalParalysis','Touch','TransformBody',
'TransformOther','Transmogrification','Vigor','WeakenBlood','WitherLimb']);
NewSpells.Agonize = new Skill( "Agonize", 'IQ', 2, libAbrv+40 );
NewSpells.Agonize.classes = { reg: true, rht: true };
NewSpells.Agonize.stats   = { duration: '1 min', castcost: 8, maintaincost: 6 };
NewPrerequisites.Agonize_requires_Magery2 = { target: 'Agonize', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Agonize_requires_Stun    = { target: 'Agonize', prereq: 'Sensitize' };
NewSpells.AlterBody = new Skill( "Alter Body", 'IQ', 2, libAbrv+41 );
NewSpells.AlterBody.classes = { reg: true, rht: true };
NewSpells.AlterBody.stats   = { duration: '1 hr', castcost: 8, maintaincost: 6, time: '2 min', notes: "May be made permanent, as an enchantment, for an energy cost of 200." };
NewPrerequisites.AlterBody_requires_AlterVisage = { target: 'AlterBody', prereq: 'AlterVisage' };
NewSpells.AlterVisage = new Skill( "Alter Visage", 'IQ', 2, libAbrv+41 );
NewSpells.AlterVisage.classes = { reg: true, rht: true };
NewSpells.AlterVisage.stats   = { duration: '1 hr', castcost: 4, maintaincost: 3, time: '1 min', notes: "May be made permanent, as an enchantment, for an energy cost of 40." };
NewPrerequisites.AlterVisage_requires_8BC                     = { target: 'AlterVisage', prereq: 'BC', number: 8 };
NewPrerequisites.AlterVisage_requires_Shapeshifting_pgroup1   = { target: 'AlterVisage', prereq: 'Shapeshifting',   pgroup: 1 };
NewPrerequisites.AlterVisage_requires_PerfectIllusion_pgroup1 = { target: 'AlterVisage', prereq: 'PerfectIllusion', pgroup: 1 };
NewSpells.AlterVoice = new Skill( "Alter Voice", 'IQ', 2, libAbrv+41 );
NewSpells.AlterVoice.classes = { reg: true, rht: true };
NewSpells.AlterVoice.stats   = { duration: '1 hr', castcost: 2, maintaincost: 2, time: '1 min', notes: "May be made permanent, as an enchantment, for an energy cost of 200." };
NewPrerequisites.AlterVoice_requires_4BC    = { target: 'AlterVoice', prereq: 'BC' ,   number: 4 };
NewPrerequisites.AlterVoice_requires_4Sound = { target: 'AlterVoice', prereq: 'Sound', number: 4 };
NewSpells.Ambidexterity = new Skill( "Ambidexterity", 'IQ', 2, libAbrv+39 );
NewSpells.Ambidexterity.classes = { reg: true };
NewSpells.Ambidexterity.stats   = { duration: '1 min', castcost: 3, maintaincost: 2 };
NewPrerequisites.Ambidexterity_requires_Grace = { target: 'Ambidexterity', prereq: 'Grace' };
NewSpells.Balance = new Skill( "Balance", 'IQ', 2, libAbrv+39 );
NewSpells.Balance.classes = { reg: true };
NewSpells.Balance.stats   = { duration: '1 min', castcost: 5, maintaincost: 3 };
NewPrerequisites.Balance_requires_Grace = { target: 'Balance', prereq: 'Grace' };
NewSpells.Boost = new Skill( "Boost", 'IQ', 2, libAbrv+37 );
NewSpells.Boost.classes = { reg: true, block: true };
NewSpells.Boost.stats   = { castcost: '1/att+, max +5', notes: "High skill does not reduce the cost to cast this spell." };
NewSpells.Boost.specRequiredList = ['Dexterity','Health','Intelligence','Strength'];
NewPrerequisites.BoostDX_requires_Grace  = { target: 'Boost', targetSpec: 'Dexterity',    prereq: 'Grace' };
NewPrerequisites.BoostHT_requires_Vigor  = { target: 'Boost', targetSpec: 'Health',       prereq: 'Vigor' };
NewPrerequisites.BoostIQ_requires_Wisdom = { target: 'Boost', targetSpec: 'Intelligence', prereq: 'Wisdom' };
NewPrerequisites.BoostST_requires_Might  = { target: 'Boost', targetSpec: 'Strength',     prereq: 'Might' };
NewSpells.Cadence = new Skill( "Cadence", 'IQ', 2, libAbrv+39 );
NewSpells.Cadence.classes = { reg: true };
NewSpells.Cadence.stats   = { duration: '1 hr', castcost: 5, maintaincost: 3, time: 10, notes: "Costs subject same energy/hr, unless subject is caster." };
NewPrerequisites.Cadence_requires_Grace = { target: 'Cadence', prereq: 'Grace' };
NewPrerequisites.Cadence_requires_Haste = { target: 'Cadence', prereq: 'Haste' };
NewSpells.Choke = new Skill( "Choke", 'IQ', 2, libAbrv+40 );
NewSpells.Choke.classes = { reg: true, rht: true };
NewSpells.Choke.stats   = { duration: '30 sec', castcost: 4, notes: "cannot be maintained" };
NewPrerequisites.Choke_requires_Magery1 = { target: 'Choke', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Choke_requires_Spasm   = { target: 'Choke', prereq: 'Spasm' };
NewPrerequisites.Choke_requires_5BC     = { target: 'Choke', number: 5, prereq: 'BC'};
NewSpells.ClimbingSpell = new Skill( "Climbing", 'IQ', 2, libAbrv+35 );
NewSpells.ClimbingSpell.classes = { reg: true };
NewSpells.ClimbingSpell.stats   = { duration: '1 min', castcost: '1 - 3', maintaincost: 'same', notes: "Climbing skill bonus is equal to twice the energy put into the spell." };
NewSpells.Clumsiness = new Skill( "Clumsiness", 'IQ', 2, libAbrv+36 );
NewSpells.Clumsiness.classes = { reg: true, rht: true };
NewSpells.Clumsiness.stats   = { duration: '1 min', castcost: '1/DX-, max -5', maintaincost: '½ C2C' };
NewPrerequisites.Clumsiness_requires_Spasm = { target: 'Clumsiness', prereq: 'Spasm' };
NewSpells.ControlLimb = new Skill( "Control Limb", 'IQ', 2, libAbrv+40 );
NewSpells.ControlLimb.classes = { reg: true, rwi: true };
NewSpells.ControlLimb.stats   = { duration: '5 sec', castcost: '2 (hand, etc.) or 3 (limb)', maintain: 'same' };
NewPrerequisites.ControlLimb_requires_Magery1 = { target: 'ControlLimb', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.ControlLimb_requires_Spasm   = { target: 'ControlLimb', prereq: 'Spasm' };
NewPrerequisites.ControlLimb_requires_5BC     = { target: 'ControlLimb', number: 5, prereq: 'BC' };
NewSpells.Corpulence = new Skill( "Corpulence", 'IQ', 3, libAbrv+43 );
NewSpells.Corpulence.classes = { reg: true, rht: true };
NewSpells.Corpulence.stats   = { duration: '10 min', castcost: 6, maintaincost: 6, time: 3 };
NewPrerequisites.Corpulence_requires_Magery2     = { target: 'Corpulence', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Corpulence_requires_CreateEarth = { target: 'Corpulence', prereq: 'CreateEarth' };
NewPrerequisites.Corpulence_requires_CreateWater = { target: 'Corpulence', prereq: 'CreateWater' };
NewPrerequisites.Corpulence_requires_AlterBody   = { target: 'Corpulence', prereq: 'AlterBody' };
NewPrerequisites.Corpulence_requires_4BC         = { target: 'Corpulence', prereq: 'BC', number: 4 };
NewSpells.Deathtouch = new Skill( "Deathtouch", 'IQ', 2, libAbrv+41 );
NewSpells.Deathtouch.classes = { melee: true };
NewSpells.Deathtouch.stats   = { castcost: '1/die damage, max 3d' };
NewPrerequisites.Deathtouch_requires_WitherLimb = { target: 'Deathtouch', prereq: 'WitherLimb' };
NewSpells.Debility = new Skill( "Debility", 'IQ', 2, libAbrv+36 );
NewSpells.Debility.classes = { reg: true, rht: true };
NewSpells.Debility.stats   = { duration: '1 min', castcost: '2/ST-, max -5', maintaincost: '½ C2C' };
NewSpells.Decapitation = new Skill( "Decapitation", 'IQ', 2, libAbrv+42 );
NewSpells.Decapitation.classes = { reg: true, rht: true };
NewSpells.Decapitation.stats   = { castcost: 4, time: 2, notes: "Resistance roll is HT+2." };
NewPrerequisites.Decapitation_requires_Magery2 = { target: 'Decapitation', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Decapitation_requires_Spasm   = { target: 'Decapitation', prereq: 'AlterBody' };
NewSpells.Enlarge = new Skill( "Enlarge", 'IQ', 3, libAbrv+42 );
NewSpells.Enlarge.classes = { reg: true };
NewSpells.Enlarge.stats   = { duration: '1 hr', castcost: '2/SM+', maintaincost: 'same', time: 5 };
NewPrerequisites.Enlarge_requires_Magery2   = { target: 'Enlarge', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Enlarge_requires_AlterBody = { target: 'Enlarge', prereq: 'AlterBody' };
NewSpells.EnlargeOther = new Skill( "Enlarge Other", 'IQ', 3, libAbrv+43 );
NewSpells.EnlargeOther.classes = { reg: true, rht: true };
NewSpells.EnlargeOther.stats   = { duration: '1 hr', castcost: '2/SM+', maintaincost: 'same', time: 10 };
NewPrerequisites.EnlargeOther_requires_Magery3   = { target: 'EnlargeOther', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.EnlargeOther_requires_AlterBody = { target: 'EnlargeOther', prereq: 'Enlarge' };
NewSpells.Frailty = new Skill( "Frailty", 'IQ', 2, libAbrv+37 );
NewSpells.Frailty.classes = { reg: true, rht: true };
NewSpells.Frailty.stats   = { duration: '1 min', castcost: '2/HT-, max -5', maintaincost: 'same' };
NewPrerequisites.Frailty_requires_LendEnergy = { target: 'Frailty', prereq: 'LendEnergy' };
NewSpells.Fumble = new Skill( "Fumble", 'IQ', 2, libAbrv+38 );
NewSpells.Fumble.classes = { block: true, rdx: true };
NewSpells.Fumble.stats   = { castcost: 3 };
NewPrerequisites.Fumble_requires_Clumsiness = { target: 'Fumble', prereq: 'Clumsiness' };
NewSpells.Gauntness = new Skill( "Gauntness", 'IQ', 3, libAbrv+43 );
NewSpells.Gauntness.classes = { reg: true, rht: true };
NewSpells.Gauntness.stats   = { duration: '10 min', castcost: 6, maintaincost: 6, time: 3 };
NewPrerequisites.Gauntness_requires_Magery2      = { target: 'Gauntness', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Gauntness_requires_EarthtoAir   = { target: 'Gauntness', prereq: 'EarthtoAir' };
NewPrerequisites.Gauntness_requires_DestroyWater = { target: 'Gauntness', prereq: 'DestroyWater' };
NewPrerequisites.Gauntness_requires_Hunger       = { target: 'Gauntness', prereq: 'Hunger' };
NewPrerequisites.Gauntness_requires_4BC          = { target: 'Gauntness', prereq: 'BC', number: 4 };
NewSpells.Grace = new Skill( "Grace", 'IQ', 2, libAbrv+37 );
NewSpells.Grace.classes = { reg: true };
NewSpells.Grace.stats   = { duration: '1 min', castcost: '4/DX+, max +5', maintaincost: 'same' };
NewPrerequisites.Grace_requires_Clumsiness = { target: 'Grace', prereq: 'Clumsiness' };
NewSpells.Haircut = new Skill( "Haircut", 'IQ', 2, libAbrv+39 );
NewSpells.Haircut.classes = { reg: true, rht: true };
NewSpells.Haircut.stats   = { castcost: 2, maintaincost: 2 };
NewPrerequisites.Haircut_requires_HairGrowth = { target: 'Haircut', prereq: 'HairGrowth' };
NewSpells.HairGrowth = new Skill( "Hair Growth", 'IQ', 2, libAbrv+39 );
NewSpells.HairGrowth.classes = { reg: true, rht: true };
NewSpells.HairGrowth.stats   = { duration: '5 sec', castcost: 1, maintaincost: 1 };
NewPrerequisites.HairGrowth_requires_5BC = { target: 'HairGrowth', prereq: 'BC', number: 5 };
NewSpells.Hinder = new Skill( "Hinder", 'IQ', 2, libAbrv+36 );
NewSpells.Hinder.classes = { reg: true, rht: true };
NewSpells.Hinder.stats   = { duration: '1 min', castcost: '1/Move-, max -4', maintaincost: 'same' };
NewPrerequisites.Hinder_requires_Haste_pgroup1      = { target: 'Hinder', prereq: 'Haste', pgroup: 1 };
NewPrerequisites.Hinder_requires_Clumsiness_pgroup1 = { target: 'Hinder', prereq: 'Clumsiness', pgroup: 1 };
NewSpells.HoldBreath = new Skill( "Hold Breath", 'IQ', 2, libAbrv+39 );
NewSpells.HoldBreath.classes = { reg: true };
NewSpells.HoldBreath.stats   = { duration: '1 min', castcost: 4, maintaincost: 2 };
NewPrerequisites.HoldBreath_requires_Magery1 = { target: 'HoldBreath', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.HoldBreath_requires_Vigor   = { target: 'HoldBreath', prereq: 'Vigor' };
NewSpells.Hunger = new Skill( "Hunger", 'IQ', 2, libAbrv+38 );
NewSpells.Hunger.classes = { reg: true, rht: true };
NewSpells.Hunger.stats   = { castcost: 2, time: 5 };
NewPrerequisites.Hunger_requires_Magery1  = { target: 'Hunger', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Hunger_requires_Debility = { target: 'Hunger', prereq: 'Debility' };
NewPrerequisites.Hunger_requires_Decay    = { target: 'Hunger', prereq: 'Decay' };
NewSpells.Itch = new Skill( "Itch", 'IQ', 2, libAbrv+35 );
NewSpells.Itch.classes = { reg: true, rht: true };
NewSpells.Itch.stats   = { duration: 'until scratched', castcost: 2, notes: "cannot be maintained" };
NewSpells.LengthenLimb = new Skill( "Lengthen Limb", 'IQ', 2, libAbrv+41 );
NewSpells.LengthenLimb.classes = { reg: true };
NewSpells.LengthenLimb.stats   = { duration: '1 min', castcost: 2, maintaincost: 2, time: 5 };
NewPrerequisites.LengthenLimb_requires_Magery3       = { target: 'LengthenLimb', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.LengthenLimb_requires_Shapeshifting = { target: 'LengthenLimb', prereq: 'Shapeshifting' };
NewSpells.Might = new Skill( "Might", 'IQ', 2, libAbrv+37 );
NewSpells.Might.classes = { reg: true };
NewSpells.Might.stats   = { duration: '1 min', castcost: '2/ST+, max +5', maintaincost: 'same' };
NewPrerequisites.Might_requires_LendEnergy = { target: 'Might', prereq: 'LendEnergy' };
NewSpells.Nauseate = new Skill( "Nauseate", 'IQ', 2, libAbrv+38 );
NewSpells.Nauseate.classes = { reg: true, rht: true };
NewSpells.Nauseate.stats   = { duration: 10, castcost: 2, maintaincost: 'same' };
NewPrerequisites.Nauseate_requires_Perfume = { target: 'Nauseate', prereq: 'Perfume' };
NewPrerequisites.Nauseate_requires_2BC = { target: 'Nauseate', number: 2, prereq: 'BodyControl'};
NewSpells.Pain = new Skill( "Pain", 'IQ', 2, libAbrv+36 );
NewSpells.Pain.classes = { reg: true, rht: true };
NewSpells.Pain.stats   = { duration: '1 sec', castcost: 2 , time: 2, notes: "cannot be maintained" };
NewPrerequisites.Pain_requires_Spasm = { target: 'Pain', prereq: 'Spasm' };
NewSpells.ParalyzeLimb = new Skill( "Paralyze Limb", 'IQ', 2, libAbrv+40 );
NewSpells.ParalyzeLimb.classes = { melee: true, rht: true };
NewSpells.ParalyzeLimb.stats   = { duration: '1 min', castcost: 3, notes: "cannot be maintained" };
NewPrerequisites.ParalyzeLimb_requires_Magery1    = { target: 'ParalyzeLimb', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.ParalyzeLimb_requires_5BC        = { target: 'ParalyzeLimb', prereq: 'BC', number: 5 };
NewPrerequisites.ParalyzeLimb_requires_Clumsiness = { target: 'ParalyzeLimb', prereq: 'Clumsiness' };
NewSpells.Perfume = new Skill( "Perfume", 'IQ', 2, libAbrv+35 );
NewSpells.Perfume.classes = { reg: true, rht: true };
NewSpells.Perfume.stats   = { castcost: 2, maintaincost: 1, duration: '10 min' };
NewPrerequisites.Perfume_requires_Odor = { target: 'Perfume', prereq: 'Odor' };
NewSpells.Reflexes = new Skill( "Reflexes", 'IQ', 2, libAbrv+39 );
NewSpells.Reflexes.classes = { reg: true };
NewSpells.Reflexes.stats   = { duration: '1 min', castcost: 5, maintaincost: 3 };
NewPrerequisites.Reflexes_requires_Grace = { target: 'Balance', prereq: 'Grace' };
NewPrerequisites.Reflexes_requires_Haste = { target: 'Balance', prereq: 'Haste' };
NewSpells.ResistPain = new Skill( "Resist Pain", 'IQ', 2, libAbrv+38 );
NewSpells.ResistPain.classes = { reg: true };
NewSpells.ResistPain.stats   = { duration: '1 min', castcost: 4, maintaincost: 2 };
NewPrerequisites.ResistPain_requires_Magery2 = { target: 'ResistPain', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.ResistPain_requires_Pain    = { target: 'ResistPain', prereq: 'Pain' };
NewSpells.Retch = new Skill( "Retch", 'IQ', 2, libAbrv+38 );
NewSpells.Retch.classes = { reg: true, rht: true };
NewSpells.Retch.stats   = { time: 4, castcost: 3, notes: "cannot be maintained" };
NewPrerequisites.Retch_requires_Nauseate = { target: 'Retch', prereq: 'Nauseate' };
NewPrerequisites.Retch_requires_Spasm    = { target: 'Retch', prereq: 'Spasm' };
NewSpells.RootedFeet = new Skill( "Rooted Feet", 'IQ', 2, libAbrv+36 );
NewSpells.RootedFeet.classes = { reg: true, rst: true };
NewSpells.RootedFeet.stats   = { duration: '1 min, or until broken', castcost: 3, notes: "cannot be maintained" };
NewPrerequisites.RootedFeet_requires_Hinder = { target: 'RootedFeet', prereq: 'Hinder' };
NewSpells.Roundabout = new Skill( "Roundabout", 'IQ', 2, libAbrv+36 );
NewSpells.Roundabout.classes = { reg: true, rht: true };
NewSpells.Roundabout.stats   = { castcost: 3 };
NewPrerequisites.Roundabout_requires_Tanglefoot = { target: 'Roundabout', prereq: 'Tanglefoot' };
NewSpells.Sensitize = new Skill( "Sensitize", 'IQ', 2, libAbrv+39 );
NewSpells.Sensitize.classes = { reg: true, rht: true };
NewSpells.Sensitize.stats   = { duration: '1 min', castcost: 3, maintaincost: 2 };
NewPrerequisites.Sensitize_requires_Magery1 = { target: 'Sensitize', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Sensitize_requires_Stun    = { target: 'Sensitize', prereq: 'Stun' };
NewSpells.Shrink = new Skill( "Shrink", 'IQ', 3, libAbrv+42 );
NewSpells.Shrink.classes = { reg: true };
NewSpells.Shrink.stats   = { duration: '1 hr', castcost: '2/SM-', maintaincost: 'same', time: '5 + 1/SM-' };
NewPrerequisites.Shrink_requires_Magery2   = { target: 'Shrink', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Shrink_requires_AlterBody = { target: 'Shrink', prereq: 'AlterBody' };
NewSpells.ShrinkOther = new Skill( "Shrink Other", 'IQ', 3, libAbrv+42 );
NewSpells.ShrinkOther.classes = { reg: true };
NewSpells.ShrinkOther.stats   = { duration: '1 hr', castcost: '2/SM-', maintaincost: 'same', time: 10 };
NewPrerequisites.ShrinkOther_requires_Magery3 = { target: 'ShrinkOther', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.ShrinkOther_requires_Shrink  = { target: 'ShrinkOther', prereq: 'Shrink' };
NewSpells.Spasm = new Skill( "Spasm", 'IQ', 2, libAbrv+35 );
NewSpells.Spasm.classes = { reg: true, rht: true };
NewSpells.Spasm.stats   = { castcost: 2, notes: "cannot be maintained" };
NewPrerequisites.Spasm_requires_Itch = { target: 'Spasm', prereq: 'Itch' };
NewSpells.StopSpasm = new Skill( "Stop Spasm", 'IQ', 2, libAbrv+35 );
NewSpells.StopSpasm.classes = { reg: true };
NewSpells.StopSpasm.stats   = { castcost: 2, notes: "cannot be maintained" };
NewPrerequisites.StopSpasm_requires_Spasm_pgroup1        = { target: 'StopSpasm', prereq: 'Spasm',        pgroup: 1 };
NewPrerequisites.StopSpasm_requires_LendVitality_pgroup1 = { target: 'StopSpasm', prereq: 'LendVitality', pgroup: 1 };
NewSpells.StrikeBarren = new Skill( "Strike Barren", 'IQ', 2, libAbrv+41 );
NewSpells.StrikeBarren.classes = { reg: true, rht: true };
NewSpells.StrikeBarren.stats   = { duration: 'permanent', castcost: 5, time: 30 };
NewPrerequisites.StrikeBarren_requires_Magery1       = { target: 'StrikeBarren', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.StrikeBarren_requires_Decay         = { target: 'StrikeBarren', prereq: 'Decay' };
NewPrerequisites.StrikeBarren_requires_StealVitality = { target: 'StrikeBarren', prereq: 'StealVitality' };
NewSpells.StrikeBlind = new Skill( "Strike Blind", 'IQ', 2, libAbrv+38 );
NewSpells.StrikeBlind.classes = { reg: true, rht: true };
NewSpells.StrikeBlind.stats   = { duration: '10 sec', castcost: 4, maintaincost: 2 };
NewPrerequisites.StrikeBlind_requires_Spasm = { target: 'StrikeBlind', prereq: 'Spasm' };
NewPrerequisites.StrikeBlind_requires_2LD   = { target: 'StrikeBlind', prereq: 'LD', number: 2 };
NewSpells.StrikeDeaf = new Skill( "Strike Deaf", 'IQ', 2, libAbrv+38 );
NewSpells.StrikeDeaf.classes = { reg: true, rht: true };
NewSpells.StrikeDeaf.stats   = { duration: '10 sec', castcost: 3, maintaincost: 1 };
NewPrerequisites.StrikeDeaf_requires_Spasm  = { target: 'StrikeDeaf', prereq: 'Spasm' };
NewPrerequisites.StrikeDeaf_requires_2Sound = { target: 'StrikeDeaf', prereq: 'Sound', number: 2 };
NewSpells.StrikeDumb = new Skill( "Strike Dumb", 'IQ', 2, libAbrv+38 );
NewSpells.StrikeDumb.classes = { reg: true, rht: true };
NewSpells.StrikeDumb.stats   = { duration: '10 sec', castcost: 3, maintaincost: 1 };
NewPrerequisites.StrikeDumb_requires_Spasm = { target: 'StrikeDumb', prereq: 'Spasm' };
NewSpells.StrikeNumb = new Skill( "Strike Numb", 'IQ', 2, libAbrv+40 );
NewSpells.StrikeNumb.classes = { reg: true, rht: true };
NewSpells.StrikeNumb.stats   = { duration: '10 sec', castcost: 3, maintaincost: 1 };
NewPrerequisites.StrikeNumb_requires_ResistPain = { target: 'StrikeNumb', prereq: 'ResistPain' };
NewSpells.Stun = new Skill( "Stun", 'IQ', 2, libAbrv+37 );
NewSpells.Stun.classes = { reg: true, rht: true };
NewSpells.Stun.stats   = { castcost: 2, notes: "cannot be maintained" };
NewPrerequisites.Stun_requires_Pain = { target: 'Stun', prereq: 'Pain' };
NewSpells.Tanglefoot = new Skill( "Tanglefoot", 'IQ', 2, libAbrv+36 );
NewSpells.Tanglefoot.classes = { reg: true, rdx: true };
NewSpells.Tanglefoot.stats   = { castcost: 2 };
NewPrerequisites.Tanglefoot_requires_Clumsiness = { target: 'Tanglefoot', prereq: 'Clumsiness' };
NewSpells.Thirst = new Skill( "Thirst", 'IQ', 2, libAbrv+38 );
NewSpells.Thirst.classes = { reg: true, rht: true };
NewSpells.Thirst.stats   = { castcost: 5, time: 10 };
NewPrerequisites.Thirst_requires_Magery1      = { target: 'Thirst', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Thirst_requires_Debility     = { target: 'Thirst', prereq: 'Debility' };
NewPrerequisites.Thirst_requires_DestroyWater = { target: 'Thirst', prereq: 'DestroyWater' };
NewSpells.Tickle = new Skill( "Tickle", 'IQ', 2, libAbrv+36 );
NewSpells.Tickle.classes = { reg: true, rwi: true };
NewSpells.Tickle.stats   = { duration: '1 min', castcost: 5, maintain: 5, notes: "maintenance requires concentration" };
NewPrerequisites.Tickle_requires_Spasm = { target: 'Tickle', prereq: 'Spasm' };
NewSpells.TotalParalysis = new Skill( "Total Paralysis", 'IQ', 2, libAbrv+40 );
NewSpells.TotalParalysis.classes = { melee: true, rht: true };
NewSpells.TotalParalysis.stats   = { duration: '1 min', castcost: 5, notes: "cannot be maintained" };
NewPrerequisites.TotalParalysis_requires_ParalyzeLimb = { target: 'TotalParalysis', prereq: 'ParalyzeLimb' };
NewSpells.Touch = new Skill( "Touch", 'IQ', 2, libAbrv+35 );
NewSpells.Touch.classes = { reg: true };
NewSpells.Touch.stats   = { castcost: 1 };
NewSpells.TransformBody = new Skill( "Transform Body", 'IQ', 2, libAbrv+43 );
NewSpells.TransformBody.classes = { spcl: true };
NewSpells.TransformBody.stats   = { duration: '1 hr', castcost: '1/10 CP value, min 5', maintaincost: '1/20 CP value, min 2', time: '1 min' };
NewSpells.TransformBody.specRequiredList = [];
NewPrerequisites.TransformBody_requires_AlterBody     = { target: 'TransformBody', prereq: 'AlterBody' };
NewPrerequisites.TransformBody_requires_Shapeshifting = { target: 'TransformBody', prereq: 'Shapeshifting', number: 3 };
NewSpells.TransformOther = new Skill( "Transform Other", 'IQ', 2, libAbrv+43 );
NewSpells.TransformOther.classes = { spcl: true, rwi: true };
NewSpells.TransformOther.stats   = { duration: '1 hr', castcost: '1/10 CP value, min 10', maintaincost: '1/20 CP value, min 4', time: '2 min' };
NewSpells.TransformOther.specRequiredList = [];
NewPrerequisites.TransformOther_requires_ShapeshiftOthers = { target: 'TransformOther', prereq: 'ShapeshiftOthers' };
NewPrerequisites.TransformOther_requires_TransformBody    = { target: 'TransformOther', prereq: 'TransformBody', prereqSpec: 'same' };
NewSpells.Transmogrification = new Skill( "Transmogrification", 'IQ', 2, libAbrv+43 );
NewSpells.Transmogrification.classes = { spcl: true, rwi: true };
NewSpells.Transmogrification.stats   = { duration: '1 hr', castcost: 20, maintaincost: 20, time: '2 min' };
NewPrerequisites.Transmogrification_requires_Magery3         = { target: 'Transmogrification', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.Transmogrification_requires_TransformOther  = { target: 'Transmogrification', prereq: 'TransformOther' };
NewPrerequisites.Transmogrification_requires_TransformObject = { target: 'Transmogrification', prereq: 'TransformObject' };
NewPrerequisites.Transmogrification_requires_FleshtoStone    = { target: 'Transmogrification', prereq: 'FleshtoStone' };
NewSpells.Vigor = new Skill( "Vigor", 'IQ', 2, libAbrv+37 );
NewSpells.Vigor.classes = { reg: true };
NewSpells.Vigor.stats   = { duration: '1 min', castcost: '2/HT+, max +5', maintaincost: 'same' };
NewPrerequisites.Vigor_requires_LendVitality_pgroup1 = { target: 'Vigor', prereq: 'LendVitality', pgroup: 1 };
NewPrerequisites.Vigor_requires_Frailty_pgroup1      = { target: 'Vigor', prereq: 'Frailty',      pgroup: 1 };
NewSpells.WeakenBlood = new Skill( "Weaken Blood", 'IQ', 2, libAbrv+40 );
NewSpells.WeakenBlood.classes = { reg: true, rht: true };
NewSpells.WeakenBlood.stats   = { duration: '1 day', castcost: 9, maintaincost: 5 };
NewPrerequisites.WeakenBlood_requires_Sickness_pgroup1      = { target: 'WeakenBlood', prereq: 'Sickness',      pgroup: 1 };
NewPrerequisites.WeakenBlood_requires_StealVitality_pgroup1 = { target: 'WeakenBlood', prereq: 'StealVitality', pgroup: 1 };
NewSpells.WitherLimb = new Skill( "Wither Limb", 'IQ', 2, libAbrv+40 );
NewSpells.WitherLimb.classes = { melee: true, rht: true };
NewSpells.WitherLimb.stats   = { duration: 'permanent', castcost: 5 };
NewPrerequisites.WitherLimb_requires_Magery2      = { target: 'WitherLimb', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.WitherLimb_requires_ParalyzeLimb = { target: 'WitherLimb', prereq: 'ParalyzeLimb' };


addToGroup("CommunicationEmpathySpells",
['SenseFoes','SenseLife','SenseEmotion','HideEmotion','Persuasion','Vexation','Truthsayer',
'DreamViewing','DreamSending','DreamProjection','HideThoughts','LendLanguage','BorrowLanguage',
'GiftofTongues','GiftofLetters','MindReadingSpell','MindSearch','MindSending','TelepathySpell',
'Retrogression','LendSkill','BorrowSkill','CompelTruth','CompelLie','Insignificance','Presence',
'Communication','Message','MachineSpeech','SoulRider','ControlPerson','Possession',
'DispelPossession','PermanentPossession','ExchangeBodies']);
NewSpells.SenseFoes = new Skill( "Sense Foes", 'IQ', 2, libAbrv+44 );
NewSpells.SenseFoes.classes = { info: true, area: true };
NewSpells.SenseFoes.stats = { castcost: 1 };
NewSpells.SenseLife = new Skill( "Sense Life", 'IQ', 2, libAbrv+45 );
NewSpells.SenseLife.classes = { info: true, area: true };
NewSpells.SenseLife.stats = { castcost: 0.5 };
NewSpells.SenseEmotion = new Skill( "Sense Emotion", 'IQ', 2, libAbrv+45 );
NewSpells.SenseEmotion.classes = { reg: true };
NewSpells.SenseEmotion.stats = { castcost: 2 };
NewPrerequisites.SenseEmotion_requires_SenseFoes = { target: 'SenseEmotion', prereq: 'SenseFoes' };
NewSpells.HideEmotion = new Skill( "Hide Emotion", 'IQ', 2, libAbrv+45 );
NewSpells.HideEmotion.classes = { reg: true };
NewSpells.HideEmotion.stats = { duration: '1 hr', castcost: 2, maintaincost: 2, notes: 'Resists emotion readings' };
NewPrerequisites.HideEmotion_requires_SenseEmotion = { target: 'HideEmotion', prereq: 'SenseEmotion' };
NewSpells.Persuasion = new Skill( "Persuasion", 'IQ', 2, libAbrv+45 );
NewSpells.Persuasion.classes = { reg: true, rwi: true };
NewSpells.Persuasion.stats = { duration: '1 min', castcost: '2&times; Rxn+' };
NewPrerequisites.Persuasion_requires_SenseEmotion = { target: 'Persuasion', prereq: 'SenseEmotion' };
NewSpells.Vexation = new Skill( "Vexation", 'IQ', 2, libAbrv+45 );
NewSpells.Vexation.classes = { reg: true, rwi: true };
NewSpells.Vexation.stats = { duration: '1 min', castcost: '2&times; Rxn-' };
NewPrerequisites.Vexation_requires_SenseEmotion = { target: 'Vexation', prereq: 'SenseEmotion' };
NewSpells.Truthsayer = new Skill( "Truthsayer", 'IQ', 2, libAbrv+45 );
NewSpells.Truthsayer.classes = { info: true, rwi: true };
NewSpells.Truthsayer.stats = { castcost: 2 };
NewPrerequisites.Truthsayer_requires_SenseEmotion = { target: 'Truthsayer', prereq: 'SenseEmotion' };
NewSpells.DreamViewing = new Skill( "Dream Viewing", 'IQ', 2, libAbrv+45 );
NewSpells.DreamViewing.classes = { reg: true, rwi: true };
NewSpells.DreamViewing.stats = { duration: '1 hr', castcost: 2, maintaincost: 1, time: 10 };
NewPrerequisites.DreamViewing_requires_Truthsayer = { target: 'DreamViewing', prereq: 'Truthsayer', pgroup: 1 };
NewPrerequisites.DreamViewing_requires_Sleep = { target: 'DreamViewing', prereq: 'Sleep', pgroup: 1 };
NewSpells.DreamSending = new Skill( "Dream Sending", 'IQ', 2, libAbrv+45 );
NewSpells.DreamSending.classes = { reg: true, rwi: true };
NewSpells.DreamSending.stats = { duration: '1 hr', castcost: 3, time: '1 min', notes: 'One try per night. Cannot be maintained.' };
NewPrerequisites.DreamSending_requires_DreamViewing = { target: 'DreamSending', prereq: 'DreamViewing', pgroup: 1 };
NewPrerequisites.DreamSending_requires_Sleep = { target: 'DreamSending', prereq: 'Sleep', pgroup: 1 };
NewSpells.DreamProjection = new Skill( "Dream Projection", 'IQ', 2, libAbrv+46 );
NewSpells.DreamProjection.classes = { reg: true };
NewSpells.DreamProjection.stats = { duration: '1 min', castcost: 3, maintaincost: 3, time: '1 min', notes: 'One try per night. Each minute allows the exchange of two sentences (one from the caster and one from the subject).' };
NewPrerequisites.DreamProjection_requires_DreamSending = { target: 'DreamProjection', prereq: 'DreamSending', pgroup: 1 };
NewSpells.HideThoughts = new Skill( "Hide Thoughts", 'IQ', 2, libAbrv+46 );
NewSpells.HideThoughts.classes = { reg: true };
NewSpells.HideThoughts.stats = { duration: '10 min', castcost: 3, maintaincost: 1 };
NewPrerequisites.HideThoughts_requires_Truthsayer = { target: 'HideThoughts', prereq: 'Truthsayer', pgroup: 1 };
NewPrerequisites.HideThoughts_requires_HideEmotion = { target: 'HideThoughts', prereq: 'HideEmotion', pgroup: 1 };
NewSpells.LendLanguage = new Skill( "Lend Language", 'IQ', 2, libAbrv+46 );
NewSpells.LendLanguage.classes = { reg: true };
NewSpells.LendLanguage.stats = { duration: '1 min', castcost: 3, maintaincost: 1, time: 3 };
NewPrerequisites.LendLanguage_requires_BeastSpeech = { target: 'LendLanguage', prereq: 'BeastSpeech', pgroup: 1 };
NewPrerequisites.LendLanguage_requires_3CommEmpthy = { target: 'LendLanguage', prereq: 'CommunicationEmpathySpells', number: 3, pgroup: 1 };
NewSpells.BorrowLanguage = new Skill( "Borrow Language", 'IQ', 2, libAbrv+46 );
NewSpells.BorrowLanguage.classes = { reg: true };
NewSpells.BorrowLanguage.stats = { duration: '1 min', castcost: 3, maintaincost: 1, time: 3 };
NewPrerequisites.BorrowLanguage_requires_LendLanguage = { target: 'BorrowLanguage', prereq: 'LendLanguage' };
NewSpells.GiftofTongues = new Skill( "Gift of Tongues", 'IQ', 3, libAbrv+46 );
NewSpells.GiftofTongues.classes = { reg: true };
NewSpells.GiftofTongues.stats = { duration: '1 min', castcost: '2: Broken, 4: Accented, 6: Native', maintaincost: '½ C2C', notes: 'Prerequisite languages must be spoken at Accented or better' };
NewPrerequisites.GiftofTongues_requires_BorrowLanguage = { target: 'GiftofTongues', prereq: 'BorrowLanguage' };
NewPrerequisites.GiftofTongues_requires_3SpokenLanguagesatAccented = { target: 'GiftofTongues', number: 3, prereq: 'Languages', description: 'Spoken', level: 2 };
NewSpells.GiftofLetters = new Skill( "Gift of Letters", 'IQ', 3, libAbrv+46 );
NewSpells.GiftofLetters.classes = { reg: true };
NewSpells.GiftofLetters.stats = { duration: '1 min', castcost: '2: Semi-Literate, 4: Literate, 6: Native', maintaincost: '½ C2C', notes: 'Prerequisite languages must be known at Literate or better' };
NewPrerequisites.GiftofLetters_requires_BorrowLanguage = { target: 'GiftofLetters', prereq: 'BorrowLanguage' };
NewPrerequisites.GiftofLetters_requires_3WrittenLanguagesatLiterate = { target: 'GiftofLetters', number: 3, prereq: 'Languages', description: 'Written', level: 2 };
NewSpells.MindReadingSpell = new Skill( "Mind-Reading", 'IQ', 2, libAbrv+46 );
NewSpells.MindReadingSpell.classes = { reg: true, rwi: true };
NewSpells.MindReadingSpell.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 10, notes: '-2 if the caster does not know the subject&rsquo;s native language; -2 if the subject is of a different race - or -4 or more if the subject is totally alien!' };
NewPrerequisites.MindReadingSpell_requires_Truthsayer = { target: 'MindReadingSpell', prereq: 'Truthsayer', pgroup: 1 };
NewPrerequisites.MindReadingSpell_requires_BorrowLanguage = { target: 'MindReadingSpell', prereq: 'BorrowLanguage', pgroup: 1 };
NewSpells.MindSearch = new Skill( "Mind-Search", 'IQ', 3, libAbrv+46 );
NewSpells.MindSearch.classes = { reg: true, rwi: true };
NewSpells.MindSearch.stats = { duration: '1 min', castcost: 6, maintaincost: 3, time: '1 min', notes: '-2 if the caster does not know the subject&rsquo;s native language; -2 if the subject is of a different race - or -4 or more if the subject is totally alien! If the subject has magically been caused to forget something, this spell cannot recover it.' };
NewPrerequisites.MindSearch_requires_MindReadingSpell = { target: 'MindSearch', prereq: 'MindReadingSpell' };
NewSpells.MindSending = new Skill( "Mind-Sending", 'IQ', 2, libAbrv+47 );
NewSpells.MindSending.classes = { reg: true };
NewSpells.MindSending.stats = { duration: '1 min', castcost: 4, maintaincost: 4, time: 4 };
NewPrerequisites.MindSending_requires_MindReadingSpell = { target: 'MindSending', prereq: 'MindReadingSpell' };
NewSpells.TelepathySpell = new Skill( "Telepathy", 'IQ', 3, libAbrv+47 );
NewSpells.TelepathySpell.classes = { reg: true };
NewSpells.TelepathySpell.stats = { duration: '1 min', castcost: 4, maintaincost: 4, time: 4, notes: 'Same casting and maintenance costs for each additional person added to link.' };
NewPrerequisites.TelepathySpell_requires_MindSending = { target: 'TelepathySpell', prereq: 'MindSending' };
NewSpells.Retrogression = new Skill( "Retrogression", 'IQ', 2, libAbrv+47 );
NewSpells.Retrogression.classes = { reg: true, rwi: true };
NewSpells.Retrogression.stats = { duration: 'The memory takes one second to relive (although it may seem like more to the subject).', castcost: 5, time: 10, notes: 'Cannot be maintained. One try per day.' };
NewPrerequisites.Retrogression_requires_MindSearch  = { target: 'Retrogression', prereq: 'MindSearch' };
NewPrerequisites.Retrogression_requires_MindSending = { target: 'Retrogression', prereq: 'MindSending' };
NewSpells.LendSkill = new Skill( "Lend Skill", 'IQ', 2, libAbrv+47 );
NewSpells.LendSkill.classes = { reg: true };
NewSpells.LendSkill.stats = { duration: '1 min', castcost: 3, maintaincost: 2, time: 3 };
NewPrerequisites.LendSkill_requires_MindSending = { target: 'LendSkill', prereq: 'MindSending' };
NewPrerequisites.LendSkill_requires_IQ = { target: 'LendSkill', category: 'stat', level: 11, prereq: 'IQ' };
NewSpells.BorrowSkill = new Skill( "Borrow Skill", 'IQ', 2, libAbrv+47 );
NewSpells.BorrowSkill.classes = { reg: true };
NewSpells.BorrowSkill.stats = { duration: '1 min', castcost: 4, maintaincost: 3, time: 3 };
NewPrerequisites.BorrowSkill_requires_LendSkill = { target: 'BorrowSkill', prereq: 'LendSkill' };
NewSpells.CompelTruth = new Skill( "Compel Truth", 'IQ', 2, libAbrv+47 );
NewSpells.CompelTruth.classes = { info: true, rwi: true };
NewSpells.CompelTruth.stats = { duration: '5 min', castcost: 4, maintaincost: 2 };
NewPrerequisites.CompelTruth_requires_Magery2 = { target: 'CompelTruth', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.CompelTruth_requires_Truthsayer = { target: 'CompelTruth', prereq: 'Truthsayer' };
// Compel Lie is under Mind Control spells
NewSpells.Insignificance = new Skill( "Insignificance", 'IQ', 2, libAbrv+48 );
NewSpells.Insignificance.classes = { reg: true };
NewSpells.Insignificance.stats = { duration: '1 hr', castcost: 4, maintaincost: 4, time: 10, notes: 'Presence and Insignificance resist each other.' };
NewPrerequisites.Insignificance_requires_Persuasion = { target: 'Insignificance', prereq: 'Persuasion' };
NewPrerequisites.Insignificance_requires_Avoid = { target: 'Insignificance', prereq: 'Avoid' };
NewSpells.Presence = new Skill( "Presence", 'IQ', 2, libAbrv+48 );
NewSpells.Presence.classes = { reg: true };
NewSpells.Presence.stats = { duration: '1 hr', castcost: 4, maintaincost: 4, time: 10, notes: 'Presence and Insignificance resist each other.' };
NewPrerequisites.Presence_requires_Persuasion = { target: 'Presence', prereq: 'Persuasion' };
NewPrerequisites.Presence_requires_Avoid = { target: 'Presence', prereq: 'Lure' };
NewSpells.Communication = new Skill( "Communication", 'IQ', 3, libAbrv+48 );
NewSpells.Communication.classes = { reg: true };
NewSpells.Communication.stats = { duration: '1 min', castcost: 4, maintaincost: 4, time: 4, notes: 'Same casting and maintenance costs for each additional person added to link.' };
NewPrerequisites.Communication_requires_WizardEye = { target: 'Communication', prereq: 'WizardEye' };
NewPrerequisites.Communication_requires_FarHearing = { target: 'Communication', prereq: 'FarHearing' };
NewPrerequisites.Communication_requires_Voices = { target: 'Communication', prereq: 'Voices' };
NewPrerequisites.Communication_requires_SimpleIllusion = { target: 'Communication', prereq: 'SimpleIllusion' };
// Message is under Tech Spells
// Machine Speech is under Tech Spells
NewSpells.SoulRider = new Skill( "Soul Rider", 'IQ', 2, libAbrv+49 );
NewSpells.SoulRider.classes = { reg: true, rwi: true };
NewSpells.SoulRider.stats = { duration: '1 min', castcost: 5, maintaincost: 2, time: 3 };
NewPrerequisites.SoulRider_requires_MindReadingSpell = { target: 'SoulRider', prereq: 'MindReadingSpell' };
NewSpells.ControlPerson = new Skill( "Control Person", 'IQ', 2, libAbrv+49 );
NewSpells.ControlPerson.classes = { reg: true, rwi: true };
NewSpells.ControlPerson.stats = { duration: '1 min', castcost: 6, maintaincost: 3, time: 10 };
NewPrerequisites.ControlPerson_requires_SoulRider_pgroup1 = { target: 'ControlPerson', prereq: 'SoulRider', pgroup: 1 };
NewPrerequisites.ControlPerson_requires_TelepathySpell_pgroup1 = { target: 'ControlPerson', prereq: 'TelepathySpell', pgroup: 1 };
NewSpells.Possession = new Skill( "Possession", 'IQ', 3, libAbrv+49 );
NewSpells.Possession.classes = { reg: true, rwi: true };
NewSpells.Possession.stats = { duration: '1 min', castcost: 10, maintaincost: 4, time: '1 min' };
NewPrerequisites.Possession_requires_Magery1 = { category: 'ADS', target: 'Possession', prereq: 'Magery', level: 1 };
NewPrerequisites.Possession_requires_ControlPerson_pgroup1   = { target: 'Possession', prereq: 'ControlPerson',   pgroup: 1 };
NewPrerequisites.Possession_requires_BeastPossession_pgroup1 = { target: 'Possession', prereq: 'BeastPossession', pgroup: 1 };
NewSpells.DispelPossession = new Skill( "Dispel Possession", 'IQ', 3, libAbrv+49 );
NewSpells.DispelPossession.classes = { reg: true, spcl: true };
NewSpells.DispelPossession.stats = { castcost: 10, time: 10, notes: 'Resisted by target spell. At GM discretion, "holy" religious status may be used as the prerequisite for this spell.' };
NewPrerequisites.DispelPossession_requires_SoulRider = { target: 'DispelPossession', prereq: 'SoulRider' };
NewPrerequisites.DispelPossession_requires_Possession = { target: 'DispelPossession', prereq: 'Possession' };
NewSpells.PermanentPossession = new Skill( "Permanent Possession", 'IQ', 3, libAbrv+49 );
NewSpells.PermanentPossession.classes = { reg: true, rwi: true };
NewSpells.PermanentPossession.stats = { castcost: 30, time: '5 min' };
NewPrerequisites.PermanentPossession_requires_Magery3 = { target: 'PermanentPossession', level: 3, category: 'ADS', prereq: 'Magery' };
NewPrerequisites.PermanentPossession_requires_Possession = { target: 'PermanentPossession', prereq: 'Possession' };
NewSpells.ExchangeBodies = new Skill( "Exchange Bodies", 'IQ', 3, libAbrv+49 );
NewSpells.ExchangeBodies.classes = { reg: true, rwi: true };
NewSpells.ExchangeBodies.stats = { castcost: 120, time: '1 hr' };
NewPrerequisites.ExchangeBodies_requires_PermanentPossession = { target: 'ExchangeBodies', prereq: 'PermanentPossession' };
NewPrerequisites.ExchangeBodies_requires_SoulJar = { target: 'ExchangeBodies', prereq: 'SoulJar' };


addToGroup("EarthSpells",
['SeekEarth','ShapeEarth','SeekPass','EarthVision','EarthtoStone','CreateEarth','EarthtoAir',
'FleshtoStone','StonetoEarth','PredictEarthMovement','SandJet','MudJet','StoneMissile','WalkThroughEarth',
'EarthtoWater','PartialPetrifaction','RainofStones','Entombment','EssentialEarth','StonetoFlesh',
'BodyofStone','Steelwraith','PurifyEarth','Sandstorm','Earthquake','Volcano','AlterTerrain',
'MoveTerrain','ControlEarthElemental','CreateEarthElemental','SummonEarthElemental']);
NewSpells.SeekEarth = new Skill( "Seek Earth", 'IQ', 2, libAbrv+50 );
NewSpells.SeekEarth.classes = { info: true };
NewSpells.SeekEarth.stats = { castcost: 3, time: 10 };
NewSpells.ShapeEarth = new Skill( "Shape Earth", 'IQ', 2, libAbrv+50 );
NewSpells.ShapeEarth.classes = { reg: true };
NewSpells.ShapeEarth.stats = { duration: '1 min', castcost: '1/yd&sup3;, min 2', maintaincost: '½ C2C', notes: "&times;2 cost for stone, &times;6 for worked stone." };
NewPrerequisites.ShapeEarth_requires_SeekEarth = { target: 'ShapeEarth', prereq: 'SeekEarth' };
NewSpells.SeekPass = new Skill( "Seek Pass", 'IQ', 2, libAbrv+51 );
NewSpells.SeekPass.classes = { info: true };
NewSpells.SeekPass.stats = { castcost: 3, time: 10 };
NewPrerequisites.SeekPass_requires_SeekEarth = { target: 'SeekPass', prereq: 'SeekEarth' };
NewSpells.EarthVision = new Skill( "Earth Vision", 'IQ', 2, libAbrv+51 );
NewSpells.EarthVision.classes = { reg: true };
NewSpells.EarthVision.stats = { duration: 30, castcost: '2/10yd depth' };
NewPrerequisites.EarthVision_requires_ShapeEarth = { target: 'EarthVision', prereq: 'ShapeEarth' };
NewSpells.EarthtoStone = new Skill( "Earth to Stone", 'IQ', 2, libAbrv+51 );
NewSpells.EarthtoStone.classes = { reg: true };
NewSpells.EarthtoStone.stats = { duration: 'permanent', castcost: '3/yd&sup3;, min 3' };
NewPrerequisites.EarthtoStone_requires_Magery1    = { target: 'EarthtoStone', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.EarthtoStone_requires_ShapeEarth = { target: 'EarthtoStone', prereq: 'ShapeEarth' };
NewSpells.CreateEarth = new Skill( "Create Earth", 'IQ', 2, libAbrv+51 );
NewSpells.CreateEarth.classes = { reg: true };
NewSpells.CreateEarth.stats = { duration: 'permanent', castcost: '2/yd&sup3; create (min 2), 1/yd&sup3; solidify mud (min 1)' };
NewPrerequisites.CreateEarth_requires_EarthtoStone = { target: 'CreateEarth', prereq: 'EarthtoStone' };
// Earth to Air under Air Spells
NewSpells.FleshtoStone = new Skill( "Flesh to Stone", 'IQ', 2, libAbrv+51 );
NewSpells.FleshtoStone.classes = { reg: true, rht: true };
NewSpells.FleshtoStone.stats = { duration: 'permanent, unless reversed by Stone to Flesh', castcost: '10; &times;2 for metal', time: 2 };
NewPrerequisites.FleshtoStone_requires_EarthtoStone = { target: 'FleshtoStone', prereq: 'EarthtoStone' };
NewSpells.StonetoEarth = new Skill( "Stone to Earth", 'IQ', 2, libAbrv+51 );
NewSpells.StonetoEarth.classes = { reg: true };
NewSpells.StonetoEarth.stats = { duration: 'permanent', castcost: '6/yd&sup3; (min 6)' };
NewPrerequisites.StonetoEarth_requires_EarthtoStone_pgroup1 = { target: 'StonetoEarth', prereq: 'EarthtoStone',     pgroup: 1 };
NewPrerequisites.StonetoEarth_requires_4Earth_pgroup1       = { target: 'StonetoEarth', prereq: 'Earth', number: 4, pgroup: 1 };
NewSpells.PredictEarthMovement = new Skill( "Predict Earth Movement", 'IQ', 2, libAbrv+51 );
NewSpells.PredictEarthMovement.classes = { info: true };
NewSpells.PredictEarthMovement.stats = { castcost: '2&times; days predicted', time: '5 seconds &times; days predicted', notes: 'Double the cost for a place outside the local area (beyond the horizon). Quadruple the cost for a place on another continent.' };
NewPrerequisites.PredictEarthMovement_requires_4Earth = { target: 'PredictEarthMovement', prereq: 'Earth', number: 4 };
NewSpells.SandJet = new Skill( "Sand Jet", 'IQ', 2, libAbrv+52 );
NewSpells.SandJet.classes = { reg: true };
NewSpells.SandJet.stats = { duration: 1, castcost: '1-3', maintaincost: 'same', notes: "The jet has a hex of range for each energy point spent in casting it." };
NewPrerequisites.SandJet_requires_CreateEarth = { target: 'SandJet', prereq: 'CreateEarth' };
NewPrerequisites.SandJet_requires_ShapeEarth  = { target: 'SandJet', prereq: 'ShapeEarth' };
NewSpells.MudJet = new Skill( "Mud Jet", 'IQ', 2, libAbrv+52 );
NewSpells.MudJet.classes = { reg: true };
NewSpells.MudJet.stats = { duration: 1, castcost: '1-3', maintaincost: 'same', notes: "The jet does 1d knockback, and has a hex of range, for each energy point spent in casting it." };
NewPrerequisites.MudJet_requires_WaterJet_pgroup1    = { target: 'MudJet', prereq: 'WaterJet',    pgroup: 1 };
NewPrerequisites.MudJet_requires_CreateWater_pgroup1 = { target: 'MudJet', prereq: 'CreateWater', pgroup: 1 };
NewPrerequisites.MudJet_requires_CreateEarth_pgroup2 = { target: 'MudJet', prereq: 'CreateEarth', pgroup: 2 };
NewPrerequisites.MudJet_requires_CreateWater_pgroup2 = { target: 'MudJet', prereq: 'CreateWater', pgroup: 2 };
NewPrerequisites.MudJet_requires_WaterJet_pgroup3    = { target: 'MudJet', prereq: 'WaterJet',    pgroup: 3 };
NewPrerequisites.MudJet_requires_SandJet_pgroup3     = { target: 'MudJet', prereq: 'SandJet',     pgroup: 3 };
NewPrerequisites.MudJet_requires_CreateEarth_pgroup4 = { target: 'MudJet', prereq: 'CreateEarth', pgroup: 4 };
NewPrerequisites.MudJet_requires_SandJet_pgroup4     = { target: 'MudJet', prereq: 'SandJet',     pgroup: 4 };
NewSpells.StoneMissile = new Skill( "Stone Missile", 'IQ', 2, libAbrv+52 );
NewSpells.StoneMissile.classes = { msl: true };
NewSpells.StoneMissile.stats = { castcost: 'up to Magery/sec; max 3 seconds', time: '1-3', notes: "Acc 2, ½D 40, Max 80. The missile does 1d+1 crushing damage per point of energy." };
NewPrerequisites.StoneMissile_requires_CreateEarth = { target: 'StoneMissile', prereq: 'CreateEarth' };
NewSpells.WalkThroughEarth = new Skill( "Walk Through Earth", 'IQ', 2, libAbrv+52 );
NewSpells.WalkThroughEarth.classes = { reg: true };
NewSpells.WalkThroughEarth.stats = { duration: 10, castcost: 3, maintaincost: 3, notes: '&times;2 to pass through stone, &times;3 for metal' };
NewPrerequisites.WalkThroughEarth_requires_4Earth = { target: 'WalkThroughEarth', prereq: 'Earth', number: 4 };
NewSpells.EarthtoWater = new Skill( "Earth to Water", 'IQ', 2, libAbrv+52 );
NewSpells.EarthtoWater.classes = { reg: true };
NewSpells.EarthtoWater.stats = { duration: 'permanent', castcost: '1/yd&sup3; to mud, &times;2 to water' };
NewPrerequisites.EarthtoWater_requires_Magery1     = { target: 'EarthtoWater', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.EarthtoWater_requires_CreateWater = { target: 'EarthtoWater', prereq: 'CreateWater' };
NewPrerequisites.EarthtoWater_requires_ShapeEarth  = { target: 'EarthtoWater', prereq: 'ShapeEarth' };
NewSpells.PartialPetrifaction = new Skill( "Partial Petrifaction", 'IQ', 3, libAbrv+52 );
NewSpells.PartialPetrifaction.classes = { melee: true, rht: true };
NewSpells.PartialPetrifaction.stats = { duration: 'permanent', castcost: 12, time: 3 };
NewPrerequisites.PartialPetrifaction_requires_Magery2  = { target: 'PartialPetrifaction', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.PartialPetrifaction_requires_FleshtoStone = { target: 'PartialPetrifaction', prereq: 'FleshtoStone' };
NewSpells.RainofStones = new Skill( "Rain of Stones", 'IQ', 2, libAbrv+53 );
NewSpells.RainofStones.classes = { area: true };
NewSpells.RainofStones.stats = { duration: '1 min', castcost: 1, maintaincost: 'same', notes: 'Min casting cost is 2.  Does 1d-1 crushing damage per second.  For double base cost, the Rain of Stones does 2d-2 per second!' };
NewPrerequisites.RainofStones_requires_Magery2    = { target: 'RainofStones', prereq: 'Magery', category: 'ADS', level: 2 };
NewPrerequisites.RainofStones_requires_CreateFire = { target: 'RainofStones', prereq: 'CreateEarth' };
NewSpells.Entombment = new Skill( "Entombment", 'IQ', 2, libAbrv+53 );
NewSpells.Entombment.classes = { reg: true, rht: true };
NewSpells.Entombment.stats = { duration: 'permanent, unless reversed by this spell', castcost: '10; 6 to reverse', time: 3 };
NewPrerequisites.Entombment_requires_Magery2 = { target: 'Entombment', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Entombment_requires_5Earth  = { target: 'Entombment', prereq: 'Earth', number: 5 };
NewSpells.EssentialEarth = new Skill( "Essential Earth", 'IQ', 2, libAbrv+53 );
NewSpells.EssentialEarth.classes = { area: true };
NewSpells.EssentialEarth.stats = { duration: '1 min', castcost: 8, time: 30 };
NewPrerequisites.EssentialEarth_requires_6Fire = { target: 'EssentialEarth', prereq: 'Earth', number: 6 };
NewSpells.StonetoFlesh = new Skill( "Stone to Flesh", 'IQ', 2, libAbrv+53 );
NewSpells.StonetoFlesh.classes = { reg: true };
NewSpells.StonetoFlesh.stats = { castcost: 10, time: 5, notes: 'Double cost to restore a person turned to metal.' };
NewPrerequisites.StonetoFlesh_requires_Magery2 = { target: 'StonetoFlesh', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.StonetoFlesh_requires_FleshtoStone = { target: 'StonetoFlesh', prereq: 'FleshtoStone' };
NewPrerequisites.StonetoFlesh_requires_StonetoEarth = { target: 'StonetoFlesh', prereq: 'StonetoEarth' };
NewSpells.BodyofStone = new Skill( "Body of Stone", 'IQ', 3, libAbrv+54 );
NewSpells.BodyofStone.classes = { reg: true, rht: true };
NewSpells.BodyofStone.stats = { duration: '1 min', castcost: 10, maintaincost: 5, time: 5 };
NewPrerequisites.BodyofStone_requires_StonetoFlesh = { target: 'BodyofStone', prereq: 'StonetoFlesh' };
NewSpells.Steelwraith = new Skill( "Steelwraith", 'IQ', 2, libAbrv+54 );
NewSpells.Steelwraith.classes = { reg: true, rht: true };
NewSpells.Steelwraith.stats = { duration: '1 min', castcost: 7, maintaincost: 4, time: 2 };
NewPrerequisites.Steelwraith_requires_Magery2 = { target: 'Steelwraith', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Steelwraith_requires_WalkThroughEarth = { target: 'Steelwraith', prereq: 'WalkThroughEarth' };
NewSpells.PurifyEarth = new Skill( "Purify Earth", 'IQ', 2, libAbrv+54 );
NewSpells.PurifyEarth.classes = { area: true };
NewSpells.PurifyEarth.stats = { duration: 'permanent', castcost: '2; &times;2 for poor soil', time: 30 };
NewPrerequisites.PurifyEarth_requires_MinorHealing = { target: 'PurifyEarth', prereq: 'CreateEarth' };
NewPrerequisites.PurifyEarth_requires_PlantGrowth  = { target: 'PurifyEarth', prereq: 'PlantGrowth' };
// Sandstorm under Air Spells
NewSpells.Earthquake = new Skill( "Earthquake", 'IQ', 2, libAbrv+54 );
NewSpells.Earthquake.classes = { area: true };
NewSpells.Earthquake.stats = { duration: '1 min', castcost: 2, maintaincost: 2, time: 30 };
NewPrerequisites.Earthquake_requires_Magery2     = { target: 'Earthquake', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Earthquake_requires_6Earth      = { target: 'Earthquake', prereq: 'Earth', number: 6 };
NewPrerequisites.Earthquake_requires_EarthVision = { target: 'Earthquake', prereq: 'EarthVision' };
NewSpells.Volcano = new Skill( "Volcano", 'IQ', 2, libAbrv+54 );
NewSpells.Volcano.classes = { reg: true };
NewSpells.Volcano.stats = { castcost: 15, maintaincost: 10, time: '1 hr', notes: 'One hour until the first effects are visible. Continued concentration for 8 hours each day is necessary to keep the volcano growing.' };
NewPrerequisites.Volcano_requires_Earthquake = { target: 'Volcano', prereq: 'Earthquake' };
NewPrerequisites.Volcano_requires_6Fire = { target: 'Volcano', number: 6, prereq: 'Fire' };
NewSpells.AlterTerrain = new Skill( "Alter Terrain", 'IQ', 3, libAbrv+55 );
NewSpells.AlterTerrain.classes = { area: true };
NewSpells.AlterTerrain.stats = { duration: '2d days', castcost: '1 (min 15)', time: 10 };
NewPrerequisites.AlterTerrain_requires_Magery3    = { target: 'AlterTerrain', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.AlterTerrain_requires_ShapeAir   = { target: 'AlterTerrain', prereq: 'ShapeAir' };
NewPrerequisites.AlterTerrain_requires_ShapeEarth = { target: 'AlterTerrain', prereq: 'ShapeEarth' };
NewPrerequisites.AlterTerrain_requires_ShapeFire  = { target: 'AlterTerrain', prereq: 'ShapeFire' };
NewPrerequisites.AlterTerrain_requires_ShapeWater = { target: 'AlterTerrain', prereq: 'ShapeWater' };
NewSpells.MoveTerrain = new Skill( "Move Terrain", 'IQ', 3, libAbrv+55 );
NewSpells.MoveTerrain.classes = { area: true };
NewSpells.MoveTerrain.stats = { duration: '1 hr', castcost: 10, maintaincost: 8, time: '1 min', notes: 'The effects, once the area is &ldquo;placed,&rdquo; are permanent.' };
NewPrerequisites.MoveTerrain_requires_AlterTerrain = { target: 'MoveTerrain', prereq: 'AlterTerrain' };
NewPrerequisites.MoveTerrain_requires_HideObject   = { target: 'MoveTerrain', prereq: 'HideObject' };
NewSpells.ControlEarthElemental = new Skill( "Control Earth Elemental", 'IQ', 2, libAbrv+55 );
NewSpells.ControlEarthElemental.classes = { reg: true, rst: true, riq: true };
NewSpells.ControlEarthElemental.stats = { duration: '1 min', castcost: "1/10 CP total", maintaincost: '½ C2C', time: 2 };
NewPrerequisites.ControlEarthElemental_requires_SummonEarthElemental = { target: 'ControlEarthElemental', prereq: 'SummonEarthElemental' };
NewSpells.CreateEarthElemental = new Skill( "Create Earth Elemental", 'IQ', 2, libAbrv+55 );
NewSpells.CreateEarthElemental.classes = { spcl: true };
NewSpells.CreateEarthElemental.stats = { castcost: '1/5 CP total', time: 'CP-total seconds' };
NewPrerequisites.CreateEarthElemental_requires_Magery2               = { target: 'CreateEarthElemental', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.CreateEarthElemental_requires_ControlEarthElemental = { target: 'CreateEarthElemental', prereq: 'ControlEarthElemental' };
NewSpells.SummonEarthElemental = new Skill( "Summon Earth Elemental", 'IQ', 2, libAbrv+55 );
NewSpells.SummonEarthElemental.classes = { spcl: true };
NewSpells.SummonEarthElemental.stats = { duration: '1 hr', castcost: 4, time: 30, notes: 'GM rolls 2d for minutes to appear.  Cannot be maintained.' };
NewPrerequisites.SummonEarthElemental_requires_Magery1                      = { target: 'SummonEarthElemental', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.SummonEarthElemental_requires_4Earth                       = { target: 'SummonEarthElemental', prereq: 'Earth', number: 4 };
NewPrerequisites.SummonEarthElemental_requires_8Earth_pgroup1               = { target: 'SummonEarthElemental', prereq: 'Earth', number: 8,     pgroup: 1 };
NewPrerequisites.SummonEarthElemental_requires_SummonAirElemental_pgroup1   = { target: 'SummonEarthElemental', prereq: 'SummonAirElemental',   pgroup: 1 };
NewPrerequisites.SummonEarthElemental_requires_SummonFireElemental_pgroup1  = { target: 'SummonEarthElemental', prereq: 'SummonFireElemental',  pgroup: 1 };
NewPrerequisites.SummonEarthElemental_requires_SummonWaterElemental_pgroup1 = { target: 'SummonEarthElemental', prereq: 'SummonWaterElemental', pgroup: 1 };


addToGroup("EnchantmentSpells",
['Enchant','TemporaryEnchantment','Scroll','Hex','Power','Speed','RemoveEnchantment',
'SuspendEnchantment','ResistEnchantment','LesserWish','Talisman','Amulet','AdjustableClothing',
'Golem','ImpressionBlocker','Malefice','Ensorcel','SpellStone','Wish','Hideaway','Leak','Simulacrum',
'Doppelganger','GreatWish','Bane','GracefulWeapon','LoyalSword','QuickDraw','PenetratingWeapon',
'DancingWeapon','DefendingWeapon','WeaponSpirit','Cornucopia','QuickAim','Accuracy','Puissance',
'GhostWeapon','SpellArrow','BlankSpellArrow','SpeedSpellArrow','Fortify','Deflect','Lighten',
'DancingShield','DefendingShield','Limit','Name','Password','Link','Attune','Powerstone',
'Manastone','StaffSpell','Homunculus','Effigy','SoulStone','CrystalBall','Lich','Wraith',]);
NewSpells.Enchant = new Skill( "Enchant", 'IQ', 3, libAbrv+56 );
NewSpells.Enchant.classes = { ench: true };
NewSpells.Enchant.stats = { duration: 'permanent', time: '&mdash;', notes: 'See <i>Enchanting</i> (Magic p16).' };
NewPrerequisites.Enchant_requires_Magery2 = { target: 'Enchant', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Enchant_requires_10othercolleges = { target: 'Enchant', number: 10, prereq: 'MagicColleges', meta: true };
NewSpells.TemporaryEnchantment = new Skill( "Temporary Enchantment", 'IQ', 3, libAbrv+56 );
NewSpells.TemporaryEnchantment.classes = { ench: true };
NewSpells.TemporaryEnchantment.stats = { duration: 'until all uses expended', time: '&mdash;', notes: 'See <i>Enchanting</i> (Magic p16).' };
NewPrerequisites.TemporaryEnchantment_requires_Enchant = { target: 'TemporaryEnchantment', prereq: 'Enchant' };
NewSpells.Scroll = new Skill( "Scroll", 'IQ', 2, libAbrv+57 );
NewSpells.Scroll.classes = { ench: true };
NewSpells.Scroll.stats = { duration: 'scroll lasts indefinitely', time: '&mdash;', notes: 'See <i>Enchanting</i> (Magic p16), <i>Scroll</i> (Magic p57). Prerequisite languages must be spoken at Accented or better' };
NewPrerequisites.Scroll_requires_Magery1 = { target: 'Scroll', category: 'ADS', prereq: 'Magery', level: 1 };
// can Languages prerequisite be modeled after Gift of Tongues/Letters?
NewPrerequisites.Scroll_requires_1writtenLanguageatLiterate = { target: 'Scroll', number: 1, prereq: 'Languages', description: 'Written' };
NewSpells.Hex = new Skill( "Hex", 'IQ', 2, libAbrv+57 );
NewSpells.Hex.classes = { ench: true };
NewSpells.Hex.stats = { castcost: 200 };
NewPrerequisites.Hex_requires_Enchant = { target: 'Hex', prereq: 'Enchant' };
NewSpells.Power = new Skill( "Power", 'IQ', 2, libAbrv+57 );
NewSpells.Power.classes = { ench: true };
NewSpells.Power.stats = { duration: 'permanent', castcost: 'See <i>Power</i> (Magic p57).' };
NewPrerequisites.Power_requires_Enchant = { target: 'Power', prereq: 'Enchant' };
NewPrerequisites.Power_requires_RecoverStrength = { target: 'Power', prereq: 'RecoverEnergy' };
NewSpells.Speed = new Skill( "Speed", 'IQ', 2, libAbrv+57 );
NewSpells.Speed.classes = { ench: true };
NewSpells.Speed.stats = { duration: 'permanent', castcost: 'See <i>Speed</i> (Magic p57).' };
NewPrerequisites.Speed_requires_Enchant = { target: 'Speed', prereq: 'Enchant' };
NewPrerequisites.Speed_requires_Haste = { target: 'Speed', prereq: 'Haste' };
NewSpells.RemoveEnchantment = new Skill( "Remove Enchantment", 'IQ', 2, libAbrv+58 );
NewSpells.RemoveEnchantment.classes = { ench: true };
NewSpells.RemoveEnchantment.stats = { duration: 'permanent', castcost: '100 or 1/10 of the cost to place the enchantment originally, whichever is more.' };
NewPrerequisites.RemoveEnchantment_requires_Enchant = { target: 'RemoveEnchantment', prereq: 'Enchant' };
NewSpells.SuspendEnchantment = new Skill( "Suspend Enchantment", 'IQ', 2, libAbrv+58 );
NewSpells.SuspendEnchantment.classes = { ench: true };
NewSpells.SuspendEnchantment.stats = { duration: '1 hr', castcost: '25 or 1/100 of the cost to place the enchantment originally, whichever is more.', maintaincost: '½ C2C' };
NewPrerequisites.SuspendEnchantment_requires_Enchant = { target: 'SuspendEnchantment', prereq: 'Enchant' };
NewSpells.ResistEnchantment = new Skill( "Resist Enchantment", 'IQ', 2, libAbrv+58 );
NewSpells.ResistEnchantment.classes = { ench: true };
NewSpells.ResistEnchantment.stats = { castcost: 'See <i>Resist Enchantment</i> cost table (Magic p58).' };
NewPrerequisites.ResistEnchantment_requires_1Limiting = { target: 'ResistEnchantment', prereq: 'LimitingSpells', number: 1 };
NewSpells.LesserWish = new Skill( "Lesser Wish", 'IQ', 3, libAbrv+58 );
NewSpells.LesserWish.classes = { ench: true };
NewSpells.LesserWish.stats = { castcost: 180 };
NewPrerequisites.LesserWish_requires_Enchant = { target: 'LesserWish', prereq: 'Enchant' };
NewSpells.Talisman = new Skill( "Talisman", 'IQ', 3, libAbrv+58 );
NewSpells.Talisman.specRequiredList = [];
NewSpells.Talisman.classes = { ench: true };
NewSpells.Talisman.stats = { castcost: 'See <i>Talisman</i> cost table (Magic p58).', notes: 'Spell (if any) opposed by Talisman is also a prerequisite.' };
NewPrerequisites.Talisman_requires_Enchant = { target: 'Talisman', prereq: 'Enchant' };
NewSpells.Amulet = new Skill( "Amulet", 'IQ', 3, libAbrv+58 );
NewSpells.Amulet.specRequiredList = [];
NewSpells.Amulet.classes = { ench: true };
NewSpells.Amulet.stats = { castcost: '50 per point of magic resistance (max 5)' };
NewPrerequisites.Amulet_requires_matchingTalisman = { target: 'Amulet', prereq: 'Talisman', prereqSpec: 'same', };
NewSpells.AdjustableClothing = new Skill( "Adjustable Clothing", 'IQ', 2, libAbrv+58 );
NewSpells.AdjustableClothing.classes = { ench: true };
NewSpells.AdjustableClothing.stats = { castcost: '50 for 10% adjustability, 100 for 25%, 150 for half/double, 200 for &times;/&divide; by 5' };
NewPrerequisites.AdjustableClothing_requires_Enchant = { target: 'AdjustableClothing', prereq: 'Enchant' };
NewPrerequisites.AdjustableClothing_requires_Reshape = { target: 'AdjustableClothing', prereq: 'Reshape' };
NewSpells.Golem = new Skill( "Golem", 'IQ', 3, libAbrv+59 );
NewSpells.Golem.classes = { ench: true };
NewSpells.Golem.stats = { castcost: '250 + 2/CP from base template', notes: 'Unusual golem materials may require different prerequisite spells.' };
NewPrerequisites.Golem_requires_Enchant    = { target: 'Golem', prereq: 'Enchant' };
NewPrerequisites.Golem_requires_ShapeEarth = { target: 'Golem', prereq: 'ShapeEarth' };
NewPrerequisites.Golem_requires_Animation  = { target: 'Golem', prereq: 'Animation' };
NewSpells.ImpressionBlocker = new Skill( "Impression Blocker", 'IQ', 2, libAbrv+60 );
NewSpells.ImpressionBlocker.classes = { ench: true };
NewSpells.ImpressionBlocker.stats = { castcost: '20/lb capacity (min 20)' };
NewPrerequisites.ImpressionBlocker_requires_Enchant  = { target: 'ImpressionBlocker', prereq: 'Enchant' };
NewPrerequisites.ImpressionBlocker_requires_Seeker   = { target: 'ImpressionBlocker', prereq: 'Seeker' };
NewPrerequisites.ImpressionBlocker_requires_Scrywall = { target: 'ImpressionBlocker', prereq: 'Scrywall' };
NewSpells.Malefice = new Skill( "Malefice", 'IQ', 3, libAbrv+60 );
NewSpells.Malefice.classes = { ench: true };
NewSpells.Malefice.stats = { duration: 'lasting spell (Magic p10)', castcost: 250 };
NewPrerequisites.Malefice_requires_Enchant = { target: 'Malefice', prereq: 'Enchant' };
NewPrerequisites.Malefice_requires_Seeker  = { target: 'Malefice', prereq: 'Seeker' };
NewSpells.Ensorcel = new Skill( "Ensorcel", 'IQ', 3, libAbrv+60 );
NewSpells.Ensorcel.classes = { ench: true };
NewSpells.Ensorcel.stats = { notes: '200&times; casting cost of spell being placed on subject' };
NewPrerequisites.Ensorcel_requires_Malefice = { target: 'Ensorcel', prereq: 'Malefice' };
NewSpells.SpellStone = new Skill( "Spell Stone", 'IQ', 2, libAbrv+60 );
NewSpells.SpellStone.classes = { ench: true };
NewSpells.SpellStone.stats = { castcost: '20&times; stored spell casting cost, plus maintenance if desired' };
NewPrerequisites.SpellStone_requires_Enchant = { target: 'SpellStone', prereq: 'Enchant' };
NewPrerequisites.SpellStone_requires_Delay   = { target: 'SpellStone', prereq: 'Delay' };
NewSpells.Wish = new Skill( "Wish", 'IQ', 3, libAbrv+61 );
NewSpells.Wish.classes = { ench: true };
NewSpells.Wish.stats = { castcost: 250, notes: 'Requires combined DX and IQ of 30+ to cast.' };
NewPrerequisites.Wish_requires_LesserWish = { target: 'Wish', prereq: 'LesserWish' };
NewPrerequisites.Wish_requires_15othercolleges = { target: 'Wish', number: 15, prereq: 'MagicColleges' };
NewSpells.Hideaway = new Skill( "Hideaway", 'IQ', 2, libAbrv+61 );
NewSpells.Hideaway.classes = { ench: true };
NewSpells.Hideaway.stats = { castcost: '50/lb capacity; 100 if does not count as encumbrance' };
NewPrerequisites.Hideaway_requires_Enchant = { target: 'Hideaway', prereq: 'Enchant' };
NewPrerequisites.Hideaway_requires_CreateObject = { target: 'Hideaway', prereq: 'CreateObject' };
NewPrerequisites.Hideaway_requires_Lighten = { target: 'Hideaway', prereq: 'Lighten' };
NewSpells.Leak = new Skill( "Leak", 'IQ', 2, libAbrv+61 );
NewSpells.Leak.classes = { ench: true };
NewSpells.Leak.stats = { castcost: 100 };
NewPrerequisites.Leak_requires_Delay = { target: 'Leak', prereq: 'Hideaway' };
NewSpells.Simulacrum = new Skill( "Simulacrum", 'IQ', 3, libAbrv+61 );
NewSpells.Simulacrum.classes = { ench: true };
NewSpells.Simulacrum.stats = { castcost: 'Double that of underlying golem' };
NewPrerequisites.Simulacrum_requires_Magery3 = { target: 'Simulacrum', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.Simulacrum_requires_Golem = { target: 'Simulacrum', prereq: 'Golem' };
NewPrerequisites.Simulacrum_requires_PerfectIllusion = { target: 'Simulacrum', prereq: 'PerfectIllusion' };
NewPrerequisites.Simulacrum_requires_IllusionDisguise = { target: 'Simulacrum', prereq: 'IllusionDisguise' };
NewSpells.Doppelganger = new Skill( "Doppelg&auml;nger", 'IQ', 3, libAbrv+62 );
NewSpells.Doppelganger.classes = { ench: true };
NewSpells.Doppelganger.stats = { castcost: 1000 };
NewPrerequisites.Doppelganger_requires_Magery3 = { target: 'Doppelganger', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.Doppelganger_requires_Golem   = { target: 'Doppelganger', prereq: 'Golem' };
NewPrerequisites.Doppelganger_requires_History = { target: 'Doppelganger', prereq: 'HistorySpell' };
NewPrerequisites.Doppelganger_requires_Enslave = { target: 'Doppelganger', prereq: 'Enslave' };
NewSpells.GreatWish = new Skill( "Great Wish", 'IQ', 3, libAbrv+62 );
NewSpells.GreatWish.classes = { ench: true };
NewSpells.GreatWish.stats = { castcost: 2000, notes: 'Requires combined DX and IQ of 30+ to cast.' };
NewPrerequisites.GreatWish_requires_Magery3 = { target: 'GreatWish', level: 3, category: 'ADS', prereq: 'Magery' };
NewPrerequisites.GreatWish_requires_Wish = { target: 'GreatWish', prereq: 'Wish' };
NewSpells.Bane = new Skill( "Bane", 'IQ', 2, libAbrv+62 );
NewSpells.Bane.classes = { ench: true };
NewSpells.Bane.stats = { castcost: 100, notes: 'The caster must also possess some item or relic pertaining to the person, creature, race, etc. involved.' };
NewPrerequisites.Bane_requires_Enchant = { target: 'Bane', prereq: 'Enchant' };
NewSpells.GracefulWeapon = new Skill( "Graceful Weapon", 'IQ', 2, libAbrv+63 );
NewSpells.GracefulWeapon.classes = { ench: true };
NewSpells.GracefulWeapon.stats = { castcost: '150/lb' };
NewPrerequisites.GracefulWeapon_requires_Enchant = { target: 'GracefulWeapon', prereq: 'Enchant' };
NewPrerequisites.GracefulWeapon_requires_Apportation = { target: 'GracefulWeapon', prereq: 'Apportation' };
NewSpells.LoyalSword = new Skill( "Loyal Sword", 'IQ', 2, libAbrv+63 );
NewSpells.LoyalSword.classes = { ench: true };
NewSpells.LoyalSword.stats = { castcost: '750/lb' };
NewPrerequisites.LoyalSword_requires_Enchant = { target: 'LoyalSword', prereq: 'Enchant' };
NewPrerequisites.LoyalSword_requires_Apportation = { target: 'LoyalSword', prereq: 'Apportation' };
NewSpells.QuickDraw = new Skill( "Quick-Draw", 'IQ', 2, libAbrv+63 );
NewSpells.QuickDraw.classes = { ench: true };
NewSpells.QuickDraw.stats = { castcost: '300/lb, 2000 for quiver/bag' };
NewPrerequisites.QuickDraw_requires_Enchant = { target: 'QuickDraw', prereq: 'Enchant' };
NewPrerequisites.QuickDraw_requires_Apportation = { target: 'QuickDraw', prereq: 'Apportation' };
NewSpells.PenetratingWeapon = new Skill( "Penetrating Weapon", 'IQ', 2, libAbrv+63 );
NewSpells.PenetratingWeapon.classes = { ench: true };
NewSpells.PenetratingWeapon.stats = { castcost: 'See <i>Penetrating Weapon</i> cost table (Magic p63).', notes: 'Double the cost if the subject is a missile weapon (<i>e.g.</i>, a bow). Divide the cost by 10 if subject is a missile (<i>e.g.</i>, an arrow). If the item falls in more than one class (weapon, missile weapon, missile), use the higher enchantment cost. In addition to weapons, any sort of cutting tool may be enchanted. Note that this spell may be recast at a higher level as per Accuracy.' };
NewPrerequisites.PenetratingWeapon_requires_Enchant = { target: 'PenetratingWeapon', prereq: 'Enchant' };
NewPrerequisites.PenetratingWeapon_requires_FindWeakness = { target: 'PenetratingWeapon', prereq: 'FindWeakness' };
NewSpells.DancingWeapon = new Skill( "Dancing Weapon", 'IQ', 2, libAbrv+63 );
NewSpells.DancingWeapon.classes = { ench: true };
NewSpells.DancingWeapon.stats = { castcost: '1000/lb', notes: 'Double the cost to get a weapon with a Basic Speed of 6, or with skill of 18. Multiply cost by 4 to get a weapon with both advantages.' };
NewPrerequisites.DancingWeapon_requires_Enchant = { target: 'DancingWeapon', prereq: 'Enchant' };
NewPrerequisites.DancingWeapon_requires_DancingObject = { target: 'DancingWeapon', prereq: 'DancingObject' };
NewSpells.DefendingWeapon = new Skill( "Defending Weapon", 'IQ', 2, libAbrv+64 );
NewSpells.DefendingWeapon.classes = { ench: true };
NewSpells.DefendingWeapon.stats = { castcost: '500 for +1 to parry, 1,000 for +2, and 2,000 for +3' };
NewPrerequisites.DefendingWeapon_requires_Enchant = { target: 'DefendingWeapon', prereq: 'Enchant' };
NewPrerequisites.DefendingWeapon_requires_DancingObject = { target: 'DefendingWeapon', prereq: 'DancingObject' };
NewSpells.WeaponSpirit = new Skill( "Weapon Spirit", 'IQ', 3, libAbrv+64 );
NewSpells.WeaponSpirit.classes = { ench: true };
NewSpells.WeaponSpirit.stats = { castcost: '100 per point of IQ transferred, plus 25 times the CP cost of each skill, plus 50 times the total CP cost of all the advantages and disadvantages (minimum of zero). Add 300 for Voices.' };
NewPrerequisites.WeaponSpirit_requires_Enchant = { target: 'WeaponSpirit', prereq: 'Enchant' };
NewPrerequisites.WeaponSpirit_requires_SummonSpirit = { target: 'WeaponSpirit', prereq: 'SummonSpirit' };
NewSpells.Cornucopia = new Skill( "Cornucopia", 'IQ', 2, libAbrv+64 );
NewSpells.Cornucopia.classes = { ench: true };
NewSpells.Cornucopia.stats = { castcost: '50&times $ value of missile' };
NewPrerequisites.Cornucopia_requires_Enchant = { target: 'Cornucopia', prereq: 'Enchant' };
NewPrerequisites.Cornucopia_requires_2WeaponEnchantment = { target: 'Cornucopia', number: 2, prereq: 'WeaponEnchantment' };
NewSpells.QuickAim = new Skill( "Quick-Aim", 'IQ', 2, libAbrv+65 );
NewSpells.QuickAim.classes = { ench: true };
NewSpells.QuickAim.stats = { castcost: 100, notes: 'For 200 energy, one Aim action may count for three turns of aiming. Halve the cost if subject is a missile (<i>e.g.</i>, a javelin or throwing axe). The enchantment doesn&rsquo;t work on ammunition (like arrows).' };
NewPrerequisites.QuickAim_requires_Enchant = { target: 'QuickAim', prereq: 'Enchant' };
NewPrerequisites.QuickAim_requires_Grace   = { target: 'QuickAim', prereq: 'Grace' };
NewSpells.Accuracy = new Skill( "Accuracy", 'IQ', 2, libAbrv+65 );
NewSpells.Accuracy.classes = { ench: true };
NewSpells.Accuracy.stats = { castcost: 'See <i>Accuracy</i> cost table (Magic p65).', notes: 'Divide cost by 10 if the subject is a missile (<i>e.g.</i>, an arrow or a bullet).' };
NewPrerequisites.Accuracy_requires_Enchant = { target: 'Accuracy', prereq: 'Enchant' };
NewPrerequisites.Accuracy_requires_5Air    = { target: 'Accuracy', number: 5, prereq: 'Air' };
NewSpells.Puissance = new Skill( "Puissance", 'IQ', 2, libAbrv+65 );
NewSpells.Puissance.classes = { ench: true };
NewSpells.Puissance.stats = { castcost: 'See <i>Puissance</i> cost table (Magic p65).', notes: 'Divide cost by 10 if the subject is a missile (<i>e.g.</i>, an arrow or a bullet). Double cost if the subject is a missile weapon (<i>e.g.</i>, a bow or a gun).' };
NewPrerequisites.Puissance_requires_Enchant = { target: 'Puissance', prereq: 'Enchant' };
NewPrerequisites.Puissance_requires_5Earth  = { target: 'Puissance', number: 5, prereq: 'Earth' };
NewSpells.GhostWeapon = new Skill( "Ghost Weapon", 'IQ', 2, libAbrv+65 );
NewSpells.GhostWeapon.classes = { ench: true };
NewSpells.GhostWeapon.stats = { castcost: '250/lb' };
NewPrerequisites.GhostWeapon_requires_Enchant  = { target: 'GhostWeapon', prereq: 'Enchant' };
NewPrerequisites.GhostWeapon_requires_Solidify = { target: 'GhostWeapon', prereq: 'Solidify' };
NewSpells.SpellArrow = new Skill( "Spell Arrow", 'IQ', 2, libAbrv+65 );
NewSpells.SpellArrow.classes = { ench: true };
NewSpells.SpellArrow.stats = { castcost: '30&times; stored spell casting cost, plus maintenance if desired' };
NewPrerequisites.SpellArrow_requires_SpellStone = { target: 'SpellArrow', prereq: 'SpellStone' };
NewSpells.BlankSpellArrow = new Skill( "Blank Spell Arrow", 'IQ', 3, libAbrv+66 );
NewSpells.BlankSpellArrow.classes = { ench: true };
NewSpells.BlankSpellArrow.stats = { castcost: '30&times; stored spell casting cost, plus maintenance if desired' };
NewPrerequisites.BlankSpellArrow_requires_SpellStone = { target: 'BlankSpellArrow', prereq: 'SpellArrow' };
NewSpells.SpeedSpellArrow = new Skill( "Speed Spell Arrow", 'IQ', 2, libAbrv+66 );
NewSpells.SpeedSpellArrow.classes = { ench: true };
NewSpells.SpeedSpellArrow.stats = { castcost: 'See <i>Speed Spell Arrow</i> cost table (Magic p66).' };
NewPrerequisites.SpeedSpellArrow_requires_Speed = { target: 'SpeedSpellArrow', prereq: 'Speed' };
NewPrerequisites.SpeedSpellArrow_requires_SpellStone = { target: 'SpeedSpellArrow', prereq: 'SpellArrow' };
NewSpells.Fortify = new Skill( "Fortify", 'IQ', 2, libAbrv+66 );
NewSpells.Fortify.classes = { ench: true };
NewSpells.Fortify.stats = { castcost: 'See <i>Fortify</i> cost table (Magic p66).' };
NewPrerequisites.Fortify_requires_Enchant = { target: 'Fortify', prereq: 'Enchant' };
NewSpells.Deflect = new Skill( "Deflect", 'IQ', 2, libAbrv+67 );
NewSpells.Deflect.classes = { ench: true };
NewSpells.Deflect.stats = { castcost: 'See <i>Deflect</i> cost table (Magic p67).' };
NewPrerequisites.Deflect_requires_Enchant = { target: 'Deflect', prereq: 'Enchant' };
NewSpells.Lighten = new Skill( "Lighten", 'IQ', 2, libAbrv+67 );
NewSpells.Lighten.classes = { ench: true };
NewSpells.Lighten.stats = { castcost: '100 to cut the item&rsquo;s weight by 25%. 500 to cut its weight in half.' };
NewPrerequisites.Lighten_requires_Enchant = { target: 'Lighten', prereq: 'Enchant' };
NewSpells.DancingShield = new Skill( "Dancing Shield", 'IQ', 2, libAbrv+67 );
NewSpells.DancingShield.classes = { ench: true };
NewSpells.DancingShield.stats = { castcost: '250/lb', notes: 'Double the cost to enchant a shield with a Basic Speed of 6, or with skill of 18. Quadruple cost to get both.' };
NewPrerequisites.DancingShield_requires_Enchant = { target: 'DancingShield', prereq: 'Enchant' };
NewPrerequisites.DancingShield_requires_DancingObject = { target: 'DancingShield', prereq: 'DancingObject' };
NewSpells.DefendingShield = new Skill( "Defending Shield", 'IQ', 2, libAbrv+67 );
NewSpells.DefendingShield.classes = { ench: true };
NewSpells.DefendingShield.stats = { castcost: '500 for +1 to Block, 1,000 for +2, and 2,000 for +3' };
NewPrerequisites.DefendingShield_requires_Enchant = { target: 'DefendingShield', prereq: 'Enchant' };
NewPrerequisites.DefendingShield_requires_Grace = { target: 'DefendingShield', prereq: 'Grace' };
NewSpells.Limit = new Skill( "Limit", 'IQ', 2, libAbrv+68 );
NewSpells.Limit.classes = { ench: true };
NewSpells.Limit.stats = { castcost: 200 };
NewPrerequisites.Limit_requires_Enchant = { target: 'Limit', prereq: 'Enchant' };
NewSpells.Name = new Skill( "Name", 'IQ', 2, libAbrv+68 );
NewSpells.Name.classes = { ench: true };
NewSpells.Name.stats = { castcost: '400, or 200 if the name is written on the item.' };
NewPrerequisites.Name_requires_Enchant = { target: 'Name', prereq: 'Enchant' };
NewSpells.Password = new Skill( "Password", 'IQ', 2, libAbrv+68 );
NewSpells.Password.classes = { ench: true };
NewSpells.Password.stats = { castcost: '400, or 200 if the password is written on the item.' };
NewPrerequisites.Password_requires_Enchant = { target: 'Password', prereq: 'Enchant' };
// Link under Meta Spells
NewSpells.Attune = new Skill( "Attune", 'IQ', 2, libAbrv+69 );
NewSpells.Attune.classes = { ench: true };
NewSpells.Attune.stats = { castcost: 200 };
NewPrerequisites.Attune_requires_Bane = { target: 'Attune', prereq: 'Bane' };
NewSpells.Powerstone = new Skill( "Powerstone", 'IQ', 2, libAbrv+69 );
NewSpells.Powerstone.classes = { ench: true };
NewSpells.Powerstone.stats = { castcost: 20 };
NewPrerequisites.Powerstone_requires_Enchant = { target: 'Powerstone', prereq: 'Enchant' };
NewSpells.Manastone = new Skill( "Manastone", 'IQ', 3, libAbrv+70 );
NewSpells.Manastone.classes = { ench: true };
NewSpells.Manastone.stats = { castcost: 5 };
NewPrerequisites.Manastone_requires_Enchant = { target: 'Manastone', prereq: 'Enchant' };
NewSpells.StaffSpell = new Skill( "Staff", 'IQ', 2, libAbrv+70 );
NewSpells.StaffSpell.classes = { ench: true };
NewSpells.StaffSpell.stats = { castcost: 30, duration: 'permanent' };
NewPrerequisites.StaffSpell_requires_Enchant = { target: 'StaffSpell', prereq: 'Enchant' };
NewSpells.Homunculus = new Skill( "Homunculus", 'IQ', 2, libAbrv+70 );
NewSpells.Homunculus.classes = { ench: true };
NewSpells.Homunculus.stats = { castcost: 800 };
NewPrerequisites.Homunculus_requires_Magery2     = { target: 'Homunculus', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Homunculus_requires_MindSending = { target: 'Homunculus', prereq: 'MindSending' };
NewSpells.Effigy = new Skill( "Effigy", 'IQ', 3, libAbrv+71 );
NewSpells.Effigy.classes = { ench: true };
NewSpells.Effigy.stats = { castcost: 1000 };
NewPrerequisites.Effigy_requires_Enchant = { target: 'Effigy', prereq: 'Enchant' };
NewPrerequisites.Effigy_requires_Scryguard = { target: 'Effigy', prereq: 'Scryguard' };
NewPrerequisites.Effigy_requires_Ward = { target: 'Effigy', prereq: 'Ward' };
NewSpells.SoulStone = new Skill( "Soul Stone", 'IQ', 3, libAbrv+71 );
NewSpells.SoulStone.classes = { ench: true };
NewSpells.SoulStone.stats = { castcost: 500, notes: 'One try; if the enchantment fails, the caster dies!' };
NewPrerequisites.SoulStone_requires_Magery3 = { target: 'SoulStone', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.SoulStone_requires_Enchant = { target: 'SoulStone', prereq: 'Enchant' };
NewPrerequisites.SoulStone_requires_SoulJar = { target: 'SoulStone', prereq: 'SoulJar' };
NewSpells.CrystalBall = new Skill( "Crystal Ball", 'IQ', 2, libAbrv+71 );
NewSpells.CrystalBall.classes = { ench: true };
NewSpells.CrystalBall.stats = { castcost: 1000 };
NewPrerequisites.CrystalBall_requires_Divination = { target: 'CrystalBall', prereq: 'Divination', prereqSpec: 'CrystalGazing' };
// Lich under Necromantic Spells
// Wraith under Necromantic Spells
addToGroup("WeaponEnchantment",
['Bane','GracefulWeapon','LoyalSword','QuickDraw','PenetratingWeapon','DancingWeapon','DefendingWeapon','WeaponSpirit',
'Cornucopia','QuickAim','Accuracy','Puissance','GhostWeapon','SpellArrow','BlankSpellArrow','SpeedSpellArrow']);


addToGroup("FireSpells",
['BodyofFlames','BreatheFire','BurningTouch','BurningDeath','Cold','ControlFireElemental',
'CreateFire','CreateFireElemental','DeflectEnergy','EssentialFlame','ExplosiveFireball',
'ExtinguishFire','FastFire','Fireball','FireCloud','Fireproof','FlameJet','FlamingArmor',
'FlamingMissiles','FlamingWeapon','IgniteFire','PhantomFlame','Heat','RainofFire','ResistCold',
'ResistFire','SeekFire','ShapeFire','SlowFire','Smoke','SummonFireElemental','Warmth']);
NewSpells.BodyofFlames = new Skill( "Body of Flames", 'IQ', 3, libAbrv+76 );
NewSpells.BodyofFlames.classes = { reg: true, rht: true };
NewSpells.BodyofFlames.stats = { duration: '1 min', castcost: 12, maintaincost: 4, time: 5, notes: "Subject gains the Body of Fire meta-trait (p. B262)." };
NewPrerequisites.BodyofFlames_requires_BreatheFire = { target: 'BodyofFlames', prereq: 'BreatheFire' };
NewSpells.BreatheFire = new Skill( "Breathe Fire", 'IQ', 3, libAbrv+76 );
NewSpells.BreatheFire.classes = { reg: true };
NewSpells.BreatheFire.stats = { castcost: '1 - 4', time: 2, notes: "Breath does 1+1d damage for each energy point spent in casting it.  Cannot be maintained." };
NewPrerequisites.BreatheFire_requires_Magery1    = { target: 'BreatheFire', prereq: 'Magery', category: 'ADS', level: 1 };
NewPrerequisites.BreatheFire_requires_FlameJet   = { target: 'BreatheFire', prereq: 'FlameJet' };
NewPrerequisites.BreatheFire_requires_ResistFire = { target: 'BreatheFire', prereq: 'ResistFire' };
NewSpells.BurningDeath = new Skill( "Burning Death", 'IQ', 3, libAbrv+76 );
NewSpells.BurningDeath.classes = { melee: true, rht: true };
NewSpells.BurningDeath.stats = { castcost: 3, maintaincost: 2 };
NewPrerequisites.BurningDeath_requires_Magery2  = { target: 'BurningDeath', prereq: 'Magery', category: 'ADS', level: 2 };
NewPrerequisites.BurningDeath_requires_Heat     = { target: 'BurningDeath', prereq: 'Heat' };
NewPrerequisites.BurningDeath_requires_Sickness = { target: 'BurningDeath', prereq: 'Sickness' };
NewSpells.BurningTouch = new Skill( "Burning Touch", 'IQ', 2, libAbrv+76 );
NewSpells.BurningTouch.classes = { melee: true };
NewSpells.BurningTouch.stats = { castcost: '1 - 3', notes: "Breath does 1+1d damage for each energy point spent in casting it.  Cannot be maintained." };
NewPrerequisites.BurningTouch_requires_Magery2 = { target: 'BurningTouch', prereq: 'Magery', category: 'ADS', level: 2 };
NewPrerequisites.BurningTouch_requires_6Fire   = { target: 'BurningTouch', prereq: 'Fire', number: 6 };
NewSpells.Cold = new Skill( "Cold", 'IQ', 2, libAbrv+74 );
NewSpells.Cold.classes = { reg: true };
NewSpells.Cold.stats = { duration: '1 min', castcost: 'see notes', maintaincost: 'same', time: '1 min', notes: "1 for an object up to the size of a fist, 2 for up to a ft&sup3;, 2/yd&sup3; for larger objects. Each minute lowers the target's temperature by 20&deg;. Temperature change can be doubled to 40&deg; per minute for double cost, tripled to 60&deg; per minute for triple cost, and so on. Slower cooling costs no less. Minimum temperature possible with this spell is 0K." };
NewPrerequisites.Cold_requires_Heat = { target: 'Cold', prereq: 'Heat' };
NewSpells.ControlFireElemental = new Skill( "Control Fire Elemental", 'IQ', 2, libAbrv+76 );
NewSpells.ControlFireElemental.classes = { reg: true, rst: true, riq: true };
NewSpells.ControlFireElemental.stats = { duration: '1 min', castcost: '1/10 CP total', maintaincost: '½ C2C', time: 2 };
NewPrerequisites.ControlFireElemental_requires_SummonFireElemental = { target: 'ControlFireElemental', prereq: 'SummonFireElemental' };
NewSpells.CreateFire = new Skill( "Create Fire", 'IQ', 2, libAbrv+72 );
NewSpells.CreateFire.classes = { area: true };
NewSpells.CreateFire.stats = { duration: '1 min', castcost: 2, maintaincost: '½ C2C' };
NewPrerequisites.CreateFire_requires_IgniteFire = { target: 'CreateFire', prereq: 'IgniteFire', pgroup: 1 };
NewPrerequisites.CreateFire_requires_SeekFire   = { target: 'CreateFire', prereq: 'SeekFire',   pgroup: 1 };
NewSpells.CreateFireElemental = new Skill( "Create Fire Elemental", 'IQ', 2, libAbrv+76 );
NewSpells.CreateFireElemental.classes = { spcl: true };
NewSpells.CreateFireElemental.stats = { castcost: '1/5 CP total', time: 'CP-total seconds' };
NewPrerequisites.CreateFireElemental_requires_Magery2              = { target: 'CreateFireElemental', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.CreateFireElemental_requires_ControlFireElemental = { target: 'CreateFireElemental', prereq: 'ControlFireElemental' };
NewSpells.DeflectEnergy = new Skill( "Deflect Energy", 'IQ', 2, libAbrv+73 );
NewSpells.DeflectEnergy.classes = { block: true };
NewSpells.DeflectEnergy.stats = { castcost: 1 };
NewPrerequisites.DeflectEnergy_requires_Magery1   = { target: 'DeflectEnergy', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.DeflectEnergy_requires_ShapeFire = { target: 'DeflectEnergy', prereq: 'ShapeFire' };
NewSpells.EssentialFlame = new Skill( "Essential Flame", 'IQ', 2, libAbrv+75 );
NewSpells.EssentialFlame.classes = { area: true };
NewSpells.EssentialFlame.stats = { duration: '1 min', castcost: 3, maintaincost: 2, time: 3 };
NewPrerequisites.EssentialFlame_requires_6Fire = { target: 'EssentialFlame', prereq: 'Fire', number: 6 };
NewSpells.ExplosiveFireball = new Skill( "Explosive Fireball", 'IQ', 2, libAbrv+75 );
NewSpells.ExplosiveFireball.classes = { msl: true };
NewSpells.ExplosiveFireball.stats = { castcost: 'up to 2&times;Magery/sec', time: '1 - 3', notes: "The fireball does 1 die damage for each 2 energy points spent in casting it, but also damages things in nearby hexes." };
NewPrerequisites.ExplosiveFireball_requires_Fireball = { target: 'ExplosiveFireball', prereq: 'Fireball' };
NewSpells.ExtinguishFire = new Skill( "Extinguish Fire", 'IQ', 2, libAbrv+72 );
NewSpells.ExtinguishFire.classes = { area: true };
NewSpells.ExtinguishFire.stats = { duration: 'Once out, a fire stays out.', castcost: 3 };
NewPrerequisites.ExtinguishFire_requires_IgniteFire = { target: 'ExtinguishFire', prereq: 'IgniteFire' };
NewSpells.FastFire = new Skill( "Fast Fire", 'IQ', 2, libAbrv+73 );
NewSpells.FastFire.classes = { reg: true };
NewSpells.FastFire.stats = { duration: '1 min', castcost: '2 or more', maintaincost: 'same', notes: "2 for a fire that burns at double the usual rate, 3 for a fire that burns at triple the usual rate, and so on.  Damage is proportionately increased." };
NewPrerequisites.FastFire_requires_SlowFire = { target: 'FastFire', prereq: 'SlowFire' };
NewSpells.Fireball = new Skill( "Fireball", 'IQ', 2, libAbrv+74 );
NewSpells.Fireball.classes = { msl: true };
NewSpells.Fireball.stats = { castcost: 'up to Magery/sec', time: '1 - 3', notes: "The fireball does 1 die damage for each energy point spent in casting it." };
NewPrerequisites.Fireball_requires_Magery1    = { target: 'Fireball', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Fireball_requires_CreateFire = { target: 'Fireball', prereq: 'CreateFire' };
NewPrerequisites.Fireball_requires_ShapeFire  = { target: 'Fireball', prereq: 'ShapeFire' };
NewSpells.FireCloud = new Skill( "Fire Cloud", 'IQ', 2, libAbrv+75 );
NewSpells.FireCloud.classes = { area: true };
NewSpells.FireCloud.stats = { duration: '10 sec', castcost: '1 - 5', maintaincost: 'same', time: '1 sec per base cost spent', notes: 'Does 1 pt fire damage per second per base cost energy spent.' };
NewPrerequisites.FireCloud_requires_ShapeAir = { target: 'FireCloud', prereq: 'ShapeAir' };
NewPrerequisites.FireCloud_requires_Fireball = { target: 'FireCloud', prereq: 'Fireball' };
NewSpells.Fireproof = new Skill( "Fireproof", 'IQ', 2, libAbrv+73 );
NewSpells.Fireproof.classes = { area: true };
NewSpells.Fireproof.stats = { duration: '1 day', castcost: 3, maintaincost: '½ C2C', time: '5 min', notes: "Can increase effect for cost×2." };
NewPrerequisites.Fireproof_requires_ExtinguishFire = { target: 'Fireproof', prereq: 'ExtinguishFire' };
NewSpells.FlameJet = new Skill( "Flame Jet", 'IQ', 2, libAbrv+73 );
NewSpells.FlameJet.classes = { reg: true };
NewSpells.FlameJet.stats = { duration: 1, castcost: '1 - 3', maintaincost: 'same', notes: "The jet does 1 die damage, and has a hex of range, for each energy point spent in casting it." };
NewPrerequisites.FlameJet_requires_CreateFire = { target: 'FlameJet', prereq: 'CreateFire' };
NewPrerequisites.FlameJet_requires_ShapeFire  = { target: 'FlameJet', prereq: 'ShapeFire' };
NewSpells.FlamingArmor = new Skill( "Flaming Armor", 'IQ', 2, libAbrv+75 );
NewSpells.FlamingArmor.classes = { reg: true };
NewSpells.FlamingArmor.stats = { duration: '1 min', castcost: 6, maintaincost: 3 };
NewPrerequisites.FlamingArmor_requires_Magery1    = { target: 'FlamingArmor', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.FlamingArmor_requires_ResistFire = { target: 'FlamingArmor', prereq: 'ResistFire' };
NewPrerequisites.FlamingArmor_requires_FlameJet   = { target: 'FlamingArmor', prereq: 'FlameJet' };
NewSpells.FlamingMissiles = new Skill( "Flaming Missiles", 'IQ', 2, libAbrv+75 );
NewSpells.FlamingMissiles.classes = { reg: true };
NewSpells.FlamingMissiles.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 3 };
NewPrerequisites.FlamingMissiles_requires_FlamingWeapon = { target: 'FlamingMissiles', prereq: 'FlamingWeapon' };
NewSpells.FlamingWeapon = new Skill( "Flaming Weapon", 'IQ', 2, libAbrv+75 );
NewSpells.FlamingWeapon.classes = { reg: true };
NewSpells.FlamingWeapon.stats = { duration: '1 min', castcost: 4, maintaincost: 1, time: 2 };
NewPrerequisites.FlamingWeapon_requires_Magery2 = { target: 'FlamingWeapon', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.FlamingWeapon_requires_Heat    = { target: 'FlamingWeapon', prereq: 'Heat' };
NewSpells.Heat = new Skill( "Heat", 'IQ', 2, libAbrv+74 );
NewSpells.Heat.classes = { reg: true };
NewSpells.Heat.stats = { duration: '1 min', castcost: 'see notes', maintaincost: 'same', time: '1 min', notes: "1 for an object up to the size of a fist, 2 for up to a ft&sup3;, 2/yd&sup3; for larger objects. Each minute raises the target's temperature by 20&deg;. Temperature change can be doubled to 40&deg; per minute for double cost, tripled to 60&deg; per minute for triple cost, and so on. Slower heating costs no less. Maximum temperature possible with this spell is 2,800&deg;." };
NewPrerequisites.Heat_requires_CreateFire = { target: 'Heat', prereq: 'CreateFire' };
NewPrerequisites.Heat_requires_ShapeFire  = { target: 'Heat', prereq: 'ShapeFire' };
NewSpells.IgniteFire = new Skill( "Ignite Fire", 'IQ', 2, libAbrv+72 );
NewSpells.IgniteFire.classes = { reg: true };
NewSpells.IgniteFire.stats = { castcost: '1-4', maintaincost: 'same' };
NewSpells.PhantomFlame = new Skill( "Phantom Flame", 'IQ', 2, libAbrv+73 );
NewSpells.PhantomFlame.classes = { area: true };
NewSpells.PhantomFlame.stats = { duration: '1 min', castcost: 1, maintaincost: 1 };
NewPrerequisites.PhantomFlame_requires_ShapeFire_pgroup1      = { target: 'PhantomFlame', prereq: 'ShapeFire',      pgroup: 1 };
NewPrerequisites.PhantomFlame_requires_SimpleIllusion_pgroup1 = { target: 'PhantomFlame', prereq: 'SimpleIllusion', pgroup: 1 };
NewSpells.RainofFire = new Skill( "Rain of Fire", 'IQ', 2, libAbrv+74 );
NewSpells.RainofFire.classes = { area: true };
NewSpells.RainofFire.stats = { duration: '1 min', castcost: 1, maintaincost: 'same', notes: 'Min casting cost is 2.  Does 1d-1 fire damage per second.  For double base cost, the Rain of Fire does 2d-2 per second!' };
NewPrerequisites.RainofFire_requires_Magery2    = { target: 'RainofFire', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.RainofFire_requires_CreateFire = { target: 'RainofFire', prereq: 'CreateFire' };
NewSpells.ResistCold = new Skill( "Resist Cold", 'IQ', 2, libAbrv+74 );
NewSpells.ResistCold.classes = { reg: true };
NewSpells.ResistCold.stats = { duration: '1 min', castcost: 2, maintaincost: 1, notes: 'Cost doubles if subject must resist cold of -40&deg; or more; cost triples if subject must resist the cold of absolute zero.' };
NewPrerequisites.ResistCold_requires_Heat = { target: 'ResistCold', prereq: 'Heat' };
NewSpells.ResistFire = new Skill( "Resist Fire", 'IQ', 2, libAbrv+74 );
NewSpells.ResistFire.classes = { reg: true };
NewSpells.ResistFire.stats = { duration: '1 min', castcost: 2, maintaincost: 1, notes: 'Cost doubles if subject must resist a blast furnace or volcano; cost triples if subject must resist the heat of a star, nuclear bomb, etc. Only the first level of protection is necessary against combat-type Fire spells.' };
NewPrerequisites.ResistFire_requires_Fireproof = { target: 'ResistFire', prereq: 'Fireproof' };
NewSpells.SeekFire = new Skill( "Seek Fire", 'IQ', 2, libAbrv+72 );
NewSpells.SeekFire.classes = { info: true };
NewSpells.SeekFire.stats   = { castcost: 1 };
NewSpells.ShapeFire = new Skill( "Shape Fire", 'IQ', 2, libAbrv+72 );
NewSpells.ShapeFire.classes = { area: true };
NewSpells.ShapeFire.stats = { duration: '1 min', castcost: 2, maintaincost: 1 };
NewPrerequisites.ShapeFire_requires_IgniteFire = { target: 'ShapeFire', prereq: 'IgniteFire' };
NewSpells.SlowFire = new Skill( "Slow Fire", 'IQ', 2, libAbrv+73 );
NewSpells.SlowFire.classes = { area: true };
NewSpells.SlowFire.stats = { duration: '1 min', castcost: '2 or more', maintaincost: 'same', notes: "2 for a fire that burns at ½ the usual rate, 3 for a fire that burns at ⅓ the usual rate, and so on." };
NewPrerequisites.SlowFire_requires_ExtinguishFire = { target: 'SlowFire', prereq: 'ExtinguishFire' };
NewSpells.Smoke = new Skill( "Smoke", 'IQ', 2, libAbrv+73 );
NewSpells.Smoke.classes = { area: true };
NewSpells.Smoke.stats = { duration: '5 min', castcost: 1, maintaincost: '½ C2C' };
NewPrerequisites.Smoke_requires_ShapeFire      = { target: 'Smoke', prereq: 'ShapeFire' };
NewPrerequisites.Smoke_requires_ExtinguishFire = { target: 'Smoke', prereq: 'ExtinguishFire' };
NewSpells.SummonFireElemental = new Skill( "Summon Fire Elemental", 'IQ', 2, libAbrv+76 );
NewSpells.SummonFireElemental.classes = { spcl: true };
NewSpells.SummonFireElemental.stats = { duration: '1 hr', castcost: '1/10 CP total, min 4', time: 30, notes: 'GM rolls 2d for minutes to appear.  Cannot be maintained.' };
NewPrerequisites.SummonFireElemental_requires_Magery1                      = { target: 'SummonFireElemental', prereq: 'Magery', category: 'ADS', level: 1 };
NewPrerequisites.SummonFireElemental_requires_4Fire                        = { target: 'SummonFireElemental', prereq: 'Fire', number: 4 };
NewPrerequisites.SummonFireElemental_requires_8Fire_pgroup1                = { target: 'SummonFireElemental', prereq: 'Fire', number: 8,      pgroup: 1 };
NewPrerequisites.SummonFireElemental_requires_SummonAirElemental_pgroup1   = { target: 'SummonFireElemental', prereq: 'SummonAirElemental',   pgroup: 1 };
NewPrerequisites.SummonFireElemental_requires_SummonEarthElemental_pgroup1 = { target: 'SummonFireElemental', prereq: 'SummonEarthElemental', pgroup: 1 };
NewPrerequisites.SummonFireElemental_requires_SummonWaterElemental_pgroup1 = { target: 'SummonFireElemental', prereq: 'SummonWaterElemental', pgroup: 1 };
NewSpells.Warmth = new Skill( "Warmth", 'IQ', 2, libAbrv+74 );
NewSpells.Warmth.classes = { reg: true };
NewSpells.Warmth.stats = { duration: '1 hr', castcost: 2, maintaincost: 1, time: 10, notes: 'Effectively increases the subject&rsquo;s &ldquo;local temperature&rdquo; by 30&deg;F towards his optimum comfort level (p. B93).' };
NewPrerequisites.Warmth_requires_Heat = { target: 'Warmth', prereq: 'Heat' };


addToGroup("FoodSpells",
['PathofFood','SeekFood','TestFood','Decay','Season','FarTasting','Mature','PurifyFood','Cook','PrepareGame',
'KnowRecipe','PoisonFood','Hunger','Thirst','FoulWater','PreserveFood','CreateFood','EssentialFood',
'WizardNose','WizardMouth','WatertoWine','Distill','FoolsBanquet','MonksBanquet','ScentsofthePast']);
NewSpells.SeekFood = new Skill( "Seek Food", 'IQ', 2, libAbrv+77 );
NewSpells.SeekFood.classes = { info: true };
NewSpells.SeekFood.stats = { castcost: 2 };
NewSpells.TestFood = new Skill( "Test Food", 'IQ', 2, libAbrv+77 );
NewSpells.TestFood.classes = { info: true };
NewSpells.TestFood.stats = { castcost: "1/meal, or 3 for 1-yd radius area" };
NewSpells.Decay = new Skill( "Decay", 'IQ', 2, libAbrv+77 );
NewSpells.Decay.classes = { reg: true };
NewSpells.Decay.stats = { castcost: "1/meal" };
NewPrerequisites.Decay_requires_TestFood = { target: 'Decay', prereq: 'TestFood' };
NewSpells.Season = new Skill( "Season", 'IQ', 2, libAbrv+77 );
NewSpells.Season.classes = { reg: true };
NewSpells.Season.stats = { duration: 'permanent', castcost: "2/meal", time: 10 };
NewPrerequisites.Season_requires_TestFood = { target: 'Season', prereq: 'TestFood' };
NewSpells.FarTasting = new Skill( "Far-Tasting", 'IQ', 2, libAbrv+77 );
NewSpells.FarTasting.classes = { reg: true };
NewSpells.FarTasting.stats = { duration: '1 min', castcost: 3, maintaincost: 1, time: 3 };
NewPrerequisites.FarTasting_requires_Magery1 = { target: 'FarTasting', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.FarTasting_requires_SeekFood_pgroup1 = { target: 'FarTasting', prereq: 'SeekFood', pgroup: 1 };
NewPrerequisites.FarTasting_requires_SeekAir_pgroup1  = { target: 'FarTasting', prereq: 'SeekAir',  pgroup: 1 };
NewSpells.Mature = new Skill( "Mature", 'IQ', 2, libAbrv+78 );
NewSpells.Mature.classes = { reg: true };
NewSpells.Mature.stats = { duration: "see Magic 4th ed.78", castcost: "1/lb", time: 10 };
NewPrerequisites.Mature_requires_Decay_pgroup1  = { target: 'Mature', prereq: 'Decay',  pgroup: 1 };
NewPrerequisites.Mature_requires_Season_pgroup1 = { target: 'Mature', prereq: 'Season', pgroup: 1 };
NewSpells.PurifyFood = new Skill( "Purify Food", 'IQ', 2, libAbrv+78 );
NewSpells.PurifyFood.classes = { reg: true };
NewSpells.PurifyFood.stats = { castcost: "1/lb" };
NewPrerequisites.PurifyFood_requires_Decay = { target: 'PurifyFood', prereq: 'Decay' };
NewSpells.Cook = new Skill( "Cook", 'IQ', 2, libAbrv+78 );
NewSpells.Cook.classes = { reg: true };
NewSpells.Cook.stats = { castcost: "1/meal", time: 5 };
NewPrerequisites.Cook_requires_TestFood   = { target: 'Cook', prereq: 'TestFood' };
NewPrerequisites.Cook_requires_CreateFire = { target: 'Cook', prereq: 'CreateFire' };
NewSpells.PrepareGame = new Skill( "Prepare Game", 'IQ', 2, libAbrv+78 );
NewSpells.PrepareGame.classes = { reg: true };
NewSpells.PrepareGame.stats = { duration: 'permanent', castcost: 2, time: 10 };
NewPrerequisites.PrepareGame_requires_PurifyFood = { target: 'PrepareGame', prereq: 'PurifyFood' };
NewSpells.KnowRecipe = new Skill( "Know Recipe", 'IQ', 2, libAbrv+78 );
NewSpells.KnowRecipe.classes = { info: true };
NewSpells.KnowRecipe.stats = { duration: 'instant; memory lasts 1 day, then fades like Memorize', castcost: 3, time: 15 };
NewPrerequisites.KnowRecipe_requires_FarTasting = { target: 'KnowRecipe', prereq: 'FarTasting' };
NewPrerequisites.KnowRecipe_requires_Season = { target: 'KnowRecipe', prereq: 'Season' };
NewSpells.PoisonFood = new Skill( "Poison Food", 'IQ', 2, libAbrv+78 );
NewSpells.PoisonFood.classes = { reg: true };
NewSpells.PoisonFood.stats = { castcost: "3/meal" };
NewPrerequisites.PoisonFood_requires_PurifyFood = { target: 'PoisonFood', prereq: 'PurifyFood' };
// Hunger under Body Control spells
// Thirst under Body Control spells
// Foul Water under Water spells
NewSpells.PreserveFood = new Skill( "Preserve Food", 'IQ', 2, libAbrv+79 );
NewSpells.PreserveFood.classes = { reg: true };
NewSpells.PreserveFood.stats = { duration: '1 wk', castcost: "2/lb", maintaincost: "1/lb" };
NewPrerequisites.PreserveFood_requires_Decay = { target: 'PreserveFood', prereq: 'Decay' };
NewSpells.CreateFood = new Skill( "Create Food", 'IQ', 2, libAbrv+79 );
NewSpells.CreateFood.classes = { reg: true };
NewSpells.CreateFood.stats = { duration: 'permanent', castcost: "2-4/meal", time: 30 };
NewPrerequisites.CreateFood_requires_Cook = { target: 'CreateFood', prereq: 'Cook' };
NewPrerequisites.CreateFood_requires_SeekFood = { target: 'CreateFood', prereq: 'SeekFood' };
NewSpells.EssentialFood = new Skill( "Essential Food", 'IQ', 2, libAbrv+79 );
NewSpells.EssentialFood.classes = { reg: true };
NewSpells.EssentialFood.stats = { duration: 'indefinite', castcost: "3/ or 5/meal", time: 30 };
NewPrerequisites.EssentialFood_requires_6Food = { target: 'EssentialFood', number: 6, prereq: 'Food' };
// Wizard Nose under Knowledge spells
// Wizard Mouth under Knowledge spells
NewSpells.WatertoWine = new Skill( "Water to Wine", 'IQ', 2, libAbrv+79 );
NewSpells.WatertoWine.classes = { reg: true };
NewSpells.WatertoWine.stats = { duration: 'permanent', castcost: "4/gal", time: 10, notes: "½ cost for beer, ×2 cost for spirits" };
NewPrerequisites.WatertoWine_requires_PurifyWater = { target: 'WatertoWine', prereq: 'PurifyWater' };
NewPrerequisites.WatertoWine_requires_Mature = { target: 'WatertoWine', prereq: 'Mature' };
NewSpells.Distill = new Skill( "Distill", 'IQ', 2, libAbrv+79 );
NewSpells.Distill.classes = { reg: true };
NewSpells.Distill.stats = { duration: 'permanent', castcost: "1/qt", time: 10 };
NewPrerequisites.Distill_requires_Mature = { target: 'Distill', prereq: 'Mature' };
NewPrerequisites.Distill_requires_DestroyWater = { target: 'Distill', prereq: 'DestroyWater' };
NewSpells.FoolsBanquet = new Skill( "Fool's Banquet", 'IQ', 2, libAbrv+79 );
NewSpells.FoolsBanquet.classes = { reg: true };
NewSpells.FoolsBanquet.stats = { duration: '1 day', castcost: "2/meal", time: 3 };
NewPrerequisites.FoolsBanquet_requires_Magery1     = { target: 'FoolsBanquet', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.FoolsBanquet_requires_Cook        = { target: 'FoolsBanquet', prereq: 'Cook' };
NewPrerequisites.FoolsBanquet_requires_Foolishness = { target: 'FoolsBanquet', prereq: 'Foolishness' };
NewSpells.MonksBanquet = new Skill( "Monk's Banquet", 'IQ', 2, libAbrv+79 );
NewSpells.MonksBanquet.classes = { reg: true };
NewSpells.MonksBanquet.stats = { duration: '24 hrs', castcost: 6 };
NewPrerequisites.MonksBanquet_requires_FoolsBanquet = { target: 'MonksBanquet', prereq: 'FoolsBanquet' };
NewPrerequisites.MonksBanquet_requires_ResistPain   = { target: 'MonksBanquet', prereq: 'ResistPain' };
// Scents of the Past under Knowledge spells


addToGroup("GateSpells",
['Teleport','TeleportOther','Blink','BlinkOther','Timeport','TimeportOther','Timeslip',
'TimeslipOther','RapidJourney','PlanarSummons','PlanarVisit','PlaneShift','PlaneShiftOther',
'Phase','PhaseOther','Beacon','TraceTeleport','DivertTeleport','TeleportShield','CreateDoor',
'SeekGate','ScryGate','ControlGate','CreateGate','SlowTime','AccelerateTime','HideObject',
'Sanctuary','SuspendTime','TimeOut']);
// Teleport under Movement spells
// TeleportOther under Movement spells
// Blink under Movement spells
// BlinkOther under Movement spells
NewSpells.Timeport = new Skill( "Timeport", 'IQ', 3, libAbrv+81 );
NewSpells.Timeport.classes = { spcl: true };
NewSpells.Timeport.stats = { castcost: "see table, Magic 4th ed.81" };
NewPrerequisites.Timeport_requires_Magery3  = { target: 'Timeport', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.Timeport_requires_Teleport = { target: 'Timeport', prereq: 'Teleport' };
NewSpells.TimeportOther = new Skill( "Timeport Other", 'IQ', 3, libAbrv+81 );
NewSpells.TimeportOther.classes = { spcl: true, rwi: true };
NewSpells.TimeportOther.stats = { castcost: "as Timeport, plus Teleport Other weight mods", notes: "resisted by Will+1" };
NewPrerequisites.TimeportOther_requires_Timeport = { target: 'TimeportOther', prereq: 'Timeport' };
NewSpells.Timeslip = new Skill( "Timeslip", 'IQ', 2, libAbrv+81 );
NewSpells.Timeslip.classes = { block: true };
NewSpells.Timeslip.stats = { castcost: "1/sec", notes: "The spell skill roll is at a -1 penalty for every second of intended displacement beyond the first one." };
NewPrerequisites.Timeslip_requires_Timeport = { target: 'Timeslip', prereq: 'Timeport' };
NewSpells.TimeslipOther = new Skill( "Timeslip Other", 'IQ', 2, libAbrv+81 );
NewSpells.TimeslipOther.classes = { block: true };
NewSpells.TimeslipOther.stats = { castcost: "1/sec", notes: "The spell skill roll is at a -1 penalty for every second of intended displacement beyond the first one." };
NewPrerequisites.TimeslipOther_requires_Timeport = { target: 'TimeslipOther', prereq: 'Timeport' };
NewSpells.RapidJourney = new Skill( "Rapid Journey", 'IQ', 3, libAbrv+82 );
NewSpells.RapidJourney.classes = { spcl: true };
NewSpells.RapidJourney.stats = { duration: '1 min', castcost: "as Timeport", maintaincost: "¼ cast cost", time: 5 };
NewPrerequisites.RapidJourney_requires_Magery3  = { target: 'RapidJourney', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.RapidJourney_requires_Teleport_pgroup1 = { target: 'RapidJourney', prereq: 'Teleport', pgroup: 1 };
NewPrerequisites.RapidJourney_requires_Timeport_pgroup1 = { target: 'RapidJourney', prereq: 'Timeport', pgroup: 1 };
NewSpells.PlanarSummons = new Skill( "Planar Summons", 'IQ', 2, libAbrv+82 );
NewSpells.PlanarSummons.specRequiredList = [];
NewSpells.PlanarSummons.classes = { spcl: true };
NewSpells.PlanarSummons.stats = { duration: 'Until the task is done or one hour, whichever is less. Usually.', castcost: "⅒ CP cost of summoned entity", time: '5 min', notes: 'Minimum energy cost is 20.' };
NewPrerequisites.PlanarSummons_requires_Magery1    = { target: 'PlanarSummons', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.PlanarSummons_requires_10colleges = { target: 'PlanarSummons', prereq: 'MagicColleges', number: 10, meta: true };
NewSpells.PlanarVisit = new Skill( "Planar Visit", 'IQ', 3, libAbrv+82 );
NewSpells.PlanarVisit.specRequiredList = [];
NewSpells.PlanarVisit.classes = { spcl: true };
NewSpells.PlanarVisit.stats = { duration: "1 min", castcost: 4, maintaincost: 2, time: 30 };
NewPrerequisites.PlanarVisit_requires_Magery2 = { target: 'PlanarVisit', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.PlanarVisit_requires_Projection_pgroup1    = { target: 'PlanarVisit', prereq: 'Projection',    pgroup: 1 };
NewPrerequisites.PlanarVisit_requires_PlanarSummons_pgroup1 = { target: 'PlanarVisit', prereq: 'PlanarSummons', pgroup: 1 };
NewSpells.PlaneShift = new Skill( "Plane Shift", 'IQ', 3, libAbrv+83 );
NewSpells.PlaneShift.specRequiredList = [];
NewSpells.PlaneShift.classes = { spcl: true };
NewSpells.PlaneShift.stats = { duration: 'permanent', castcost: 20, time: 5 };
NewPrerequisites.PlaneShift_requires_PlanarSummons = { target: 'PlaneShift', prereq: 'PlanarSummons', prereqSpec: 'same' };
NewSpells.PlaneShiftOther = new Skill( "Plane Shift Other", 'IQ', 3, libAbrv+83 );
NewSpells.PlaneShiftOther.specRequiredList = [];
NewSpells.PlaneShiftOther.classes = { reg: true, rwi: true };
NewSpells.PlaneShiftOther.stats = { duration: 'permanent', castcost: 20, time: 5, notes: "resisted by Will+1" };
NewPrerequisites.PlaneShiftOther_requires_PlaneShift = { target: 'PlaneShiftOther', prereq: 'PlaneShift' };
NewSpells.Phase = new Skill( "Phase", 'IQ', 2, libAbrv+83 );
NewSpells.Phase.classes = { block: true };
NewSpells.Phase.stats = { castcost: 3 };
NewPrerequisites.Phase_requires_PlanarSummons = { target: 'Phase', prereq: 'PlanarSummons' };
NewPrerequisites.Phase_requires_Magery3_pgroup1    = { target: 'Phase', prereq: 'Magery', level: 3, pgroup: 1, category: 'ADS' };
NewPrerequisites.Phase_requires_PlaneShift_pgroup1 = { target: 'Phase', prereq: 'PlaneShift',       pgroup: 1 };
NewPrerequisites.Phase_requires_Magery3_pgroup2      = { target: 'Phase', prereq: 'Magery', level: 3, pgroup: 2, category: 'ADS' };
NewPrerequisites.Phase_requires_EtherealBody_pgroup2 = { target: 'Phase', prereq: 'EtherealBody',     pgroup: 2 };
NewSpells.PhaseOther = new Skill( "Phase Other", 'IQ', 3, libAbrv+83 );
NewSpells.PhaseOther.classes = { block: true };
NewSpells.PhaseOther.stats = { castcost: 3 };
NewPrerequisites.PhaseOther_requires_Phase = { target: 'PhaseOther', prereq: 'Phase' };
NewSpells.Beacon = new Skill( "Beacon", 'IQ', 2, libAbrv+83 );
NewSpells.Beacon.classes = { area: true };
NewSpells.Beacon.stats = { duration: "24 hrs", castcost: 10, maintaincost: "½ C2C", time: 30, notes: "Caster must know corresponding spell (Teleport, Timeport, or Plane Shift) to create a Beacon for that spell." };
NewPrerequisites.Beacon_requires_Teleport_pgroup1   = { target: 'Beacon', prereq: 'Teleport',   pgroup: 1 };
NewPrerequisites.Beacon_requires_Timeport_pgroup1   = { target: 'Beacon', prereq: 'Timeport',   pgroup: 1 };
NewPrerequisites.Beacon_requires_PlaneShift_pgroup1 = { target: 'Beacon', prereq: 'PlaneShift', pgroup: 1 };
NewSpells.TraceTeleport = new Skill( "Trace Teleport", 'IQ', 2, libAbrv+84 );
NewSpells.TraceTeleport.classes = { info: true, rsp: true };
NewSpells.TraceTeleport.stats = { castcost: 3, notes: "Skill -1/min between the teleport and Trace Teleport.  Add'l -5 if caster didn't witness the teleport." };
NewPrerequisites.TraceTeleport_requires_Teleport_pgroup1   = { target: 'TraceTeleport', prereq: 'Teleport',   pgroup: 1 };
NewPrerequisites.TraceTeleport_requires_Timeport_pgroup1   = { target: 'TraceTeleport', prereq: 'Timeport',   pgroup: 1 };
NewPrerequisites.TraceTeleport_requires_PlaneShift_pgroup1 = { target: 'TraceTeleport', prereq: 'PlaneShift', pgroup: 1 };
NewSpells.DivertTeleport = new Skill( "Divert Teleport", 'IQ', 3, libAbrv+84 );
NewSpells.DivertTeleport.classes = { block: true, rsp: true };
NewSpells.DivertTeleport.stats = { castcost: "difference in distance cost for Teleport; min 3" };
NewPrerequisites.DivertTeleport_requires_Magery3       = { target: 'DivertTeleport', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.DivertTeleport_requires_TraceTeleport = { target: 'DivertTeleport', prereq: 'TraceTeleport' };
// Teleport Shield under Protection spells
NewSpells.CreateDoor = new Skill( "Create Door", 'IQ', 2, libAbrv+84 );
NewSpells.CreateDoor.classes = { reg: true };
NewSpells.CreateDoor.stats = { duration: "10 sec", castcost: "2/10ft² of door", maintaincost: 2, time: 5, notes: "The spell is at a -1 penalty per yard of obstruction thickness; there is no penalty if the obstruction is ½ yd thick or less." };
NewPrerequisites.CreateDoor_requires_Teleport = { target: 'CreateDoor', prereq: 'Teleport' };
NewPrerequisites.CreateDoor_requires_1WalkThroughSpell = { target: 'CreateDoor', number: 1, prereq: 'WalkThroughSpells' };
NewSpells.SeekGate = new Skill( "Seek Gate", 'IQ', 2, libAbrv+85 );
NewSpells.SeekGate.classes = { info: true };
NewSpells.SeekGate.stats = { castcost: 3, time: 10 };
NewPrerequisites.SeekGate_requires_Magery2    = { target: 'SeekGate', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.SeekGate_requires_SeekMagic  = { target: 'SeekGate', prereq: 'SeekMagic' };
NewPrerequisites.SeekGate_requires_10colleges = { target: 'SeekGate', prereq: 'MagicColleges', number: 10, meta: true };
NewSpells.ScryGate = new Skill( "Scry Gate", 'IQ', 2, libAbrv+85 );
NewSpells.ScryGate.classes = { reg: true };
NewSpells.ScryGate.stats = { duration: '1 min', castcost: 4, maintaincost: 4, time: 10 };
NewPrerequisites.ScryGate_requires_SeekGate = { target: 'ScryGate', prereq: 'SeekGate' };
NewSpells.ControlGate = new Skill( "Control Gate", 'IQ', 2, libAbrv+85 );
NewSpells.ControlGate.classes = { reg: true, rsp: true };
NewSpells.ControlGate.stats = { duration: '1 min', castcost: 6, maintaincost: 3, time: 10 };
NewPrerequisites.ControlGate_requires_Magery3  = { target: 'ControlGate', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.ControlGate_requires_SeekGate = { target: 'ControlGate', prereq: 'SeekGate' };
NewSpells.CreateGate = new Skill( "Create Gate", 'IQ', 3, libAbrv+85 );
NewSpells.CreateGate.classes = { reg: true };
NewSpells.CreateGate.stats = { duration: '1 min', castcost: "10× corresponding spell (Teleport, Timeport, or Plane Shift); modify for larger size", maintaincost: "same", time: "1/energy", notes: "Gate can be made permanent for 100× casting cost." };
NewPrerequisites.CreateGate_requires_ControlGate = { target: 'CreateGate', prereq: 'ControlGate' };
NewPrerequisites.CreateGate_requires_Teleport_pgroup1   = { target: 'CreateGate', prereq: 'Teleport',   pgroup: 1 };
NewPrerequisites.CreateGate_requires_Timeport_pgroup1   = { target: 'CreateGate', prereq: 'Timeport',   pgroup: 1 };
NewPrerequisites.CreateGate_requires_PlaneShift_pgroup1 = { target: 'CreateGate', prereq: 'PlaneShift', pgroup: 1 };
NewSpells.SlowTime = new Skill( "Slow Time", 'IQ', 3, libAbrv+86 );
NewSpells.SlowTime.classes = { area: true, rst: true, riq: true };
NewSpells.SlowTime.stats = { duration: '1 min', castcost: "time divisor in energy", maintaincost: "same", time: 2 };
NewPrerequisites.SlowTime_requires_Magery2             = { target: 'SlowTime', prereq: 'Magery',   level: 2, category: 'ADS' };
NewPrerequisites.SlowTime_requires_IQ13                = { target: 'SlowTime', prereq: 'IQ',       level: 13, category: 'stat' };
NewPrerequisites.SlowTime_requires_2eachfrom10colleges = { target: 'SlowTime', prereq: 'MagicColleges', number: 10, mult: 2, meta: true };
NewSpells.AccelerateTime = new Skill( "Accelerate Time", 'IQ', 3, libAbrv+86 );
NewSpells.AccelerateTime.classes = { area: true, rst: true, riq: true };
NewSpells.AccelerateTime.stats = { duration: '1 min', castcost: "time multiplier in energy", maintaincost: "same", time: 2 };
NewPrerequisites.AccelerateTime_requires_Magery2             = { target: 'AccelerateTime', prereq: 'Magery',   level: 2, category: 'ADS' };
NewPrerequisites.AccelerateTime_requires_IQ13                = { target: 'AccelerateTime', prereq: 'IQ',       level: 13, category: 'stat' };
NewPrerequisites.AccelerateTime_requires_2eachfrom10colleges = { target: 'AccelerateTime', prereq: 'MagicColleges', number: 10, mult: 2, meta: true };
NewSpells.HideObject = new Skill( "Hide Object", 'IQ', 2, libAbrv+86 );
NewSpells.HideObject.classes = { reg: true };
NewSpells.HideObject.stats = { duration: "1 hr", castcost: "1/lb", maintaincost: "same", time: 10 };
NewPrerequisites.HideObject_requires_Hideaway = { target: 'HideObject', prereq: 'Hideaway' };
NewPrerequisites.HideObject_requires_Teleport = { target: 'HideObject', prereq: 'Teleport' };
NewSpells.Sanctuary = new Skill( "Sanctuary", 'IQ', 3, libAbrv+86 );
NewSpells.Sanctuary.classes = { spcl: true };
NewSpells.Sanctuary.stats = { duration: '1 hr', castcost: 5, maintaincost: 5, time: 10 };
NewPrerequisites.Sanctuary_requires_Hideaway = { target: 'Sanctuary', prereq: 'Hideaway' };
NewPrerequisites.Sanctuary_requires_Teleport = { target: 'Sanctuary', prereq: 'Teleport' };
NewSpells.SuspendTime = new Skill( "Suspend Time", 'IQ', 3, libAbrv+86 );
NewSpells.SuspendTime.classes = { area: true, riq: true };
NewSpells.SuspendTime.stats = { duration: '1 day', castcost: 5, maintaincost: 5, time: "5 min" };
NewPrerequisites.SuspendTime_requires_Magery3  = { target: 'SuspendTime', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.SuspendTime_requires_SlowTime = { target: 'SuspendTime', prereq: 'SlowTime' };
NewSpells.TimeOut = new Skill( "Time Out", 'IQ', 3, libAbrv+87 );
NewSpells.TimeOut.classes = { area: true };
NewSpells.TimeOut.stats = { duration: 'An instant (outside time). Within the area, the caster and any other occupants have as much time as they need.', castcost: 5, maintaincost: 5, time: "5 min" };
NewPrerequisites.TimeOut_requires_Magery3        = { target: 'TimeOut', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.TimeOut_requires_AccelerateTime = { target: 'TimeOut', prereq: 'AccelerateTime' };


addToGroup("HealingSpells",
['BodyReading','FinalRest','LendEnergy','LendVitality','ShareEnergy','RecoverEnergy',
'RemoveContagion','StopSpasm','Awaken','RelieveSickness','ShareVitality','ResistDisease',
'ResistPoison','StopBleeding','MinorHealing','MajorHealing','GreatHealing','CureDisease',
'NeutralizePoison','InstantNeutralizePoison','RelieveAddiction','RelieveMadness','RestoreSight',
'RestoreHearing','RestoreMemory','RestoreSpeech','StopParalysis','RelieveParalysis','Restoration',
'InstantRestoration','Regeneration','InstantRegeneration','CureRadiation','Cleansing',
'SuspendedAnimation','HealingSlumber','HaltAging','Youth','Resurrection']);
NewSpells.BodyReading = new Skill( "Body Reading", 'IQ', 2, libAbrv+88 );
NewSpells.BodyReading.classes = { info: true, rwi: true };
NewSpells.BodyReading.stats = { castcost: 2, time: 30 };
NewPrerequisites.BodyReading_requires_SenseLife = { target: 'BodyReading', prereq: 'SenseLife' };
NewPrerequisites.BodyReading_requires_Awaken    = { target: 'BodyReading', prereq: 'Awaken' };
// Detect Poison under Protection and Warning spells
NewSpells.FinalRest = new Skill( "Final Rest", 'IQ', 2, libAbrv+89 );
NewSpells.FinalRest.classes = { reg: true };
NewSpells.FinalRest.stats = { duration: 'permanent', castcost: 20, time: '10 minutes or more', notes: 'This spell is always cast ceremonially.' };
NewPrerequisites.FinalRest_requires_Magery_pgroup1  = { target: 'FinalRest', category: 'ADS', prereq: 'Magery', level: 1,  pgroup: 1 };
NewPrerequisites.FinalRest_requires_SpiritEmpathy_pgroup1 = { target: 'FinalRest', prereq: 'SpiritEmpathy', category: 'ADS', pgroup: 1 };
NewSpells.LendEnergy = new Skill( "Lend Energy", 'IQ', 2, libAbrv+89 );
NewSpells.LendEnergy.classes = { reg: true };
NewSpells.LendEnergy.stats = { castcost: '1/FP restored' };
NewPrerequisites.LendEnergy_requires_Magery1_pgroup1 = { target: 'LendEnergy', category: 'ADS', prereq: 'Magery', level: 1, pgroup: 1 };
NewPrerequisites.LendEnergy_requires_Empathy_pgroup1 = { target: 'LendEnergy', category: 'ADS', prereq: 'Empathy',          pgroup: 1 };

NewSpells.LendVitality = new Skill( "Lend Vitality", 'IQ', 2, libAbrv+89 );
NewSpells.LendVitality.classes = { reg: true };
NewSpells.LendVitality.stats = { duration: '1 hr', castcost: '1/HT loaned' };
NewPrerequisites.LendVitality_requires_LendEnergy = { target: 'LendVitality', prereq: 'LendEnergy' };
NewSpells.ShareEnergy = new Skill( "Share Energy", 'IQ', 2, libAbrv+89 );
NewSpells.ShareEnergy.classes = { reg: true };
NewSpells.ShareEnergy.stats = { duration: 1, castcost: '2&times;FP shared' };
NewPrerequisites.ShareEnergy_requires_LendEnergy = { target: 'ShareEnergy', prereq: 'LendEnergy' };
NewSpells.RecoverEnergy = new Skill( "Recover Energy", 'IQ', 2, libAbrv+89 );
NewSpells.RecoverEnergy.classes = { spcl: true };
NewSpells.RecoverEnergy.stats = { castcost: 0, duration: '&mdash;', notes: 'speeds Fatigue recovery' };
NewPrerequisites.RecoverEnergy_requires_Magery1 = { target: 'RecoverEnergy', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.RecoverEnergy_requires_LendEnergy = { target: 'RecoverEnergy', prereq: 'LendEnergy' };
NewSpells.RemoveContagion = new Skill( "Remove Contagion", 'IQ', 2, libAbrv+90 );
NewSpells.RemoveContagion.classes = { area: true };
NewSpells.RemoveContagion.stats = { castcost: 3, time: 2 };
NewPrerequisites.RemoveContagion_requires_Decay_pgroup1 = { target: 'RemoveContagion', prereq: 'Decay', pgroup: 1 };
NewPrerequisites.RemoveContagion_requires_Clean_pgroup1 = { target: 'RemoveContagion', prereq: 'Clean', pgroup: 1 };
NewPrerequisites.RemoveContagion_requires_CureDisease_pgroup1 = { target: 'RemoveContagion', prereq: 'CureDisease', pgroup: 1 };
// Stop Spasm under Body Control spells
NewSpells.Awaken = new Skill( "Awaken", 'IQ', 2, libAbrv+90 );
NewSpells.Awaken.classes = { area: true };
NewSpells.Awaken.stats = { castcost: 1 };
NewPrerequisites.Awaken_requires_LendVitality = { target: 'Awaken', prereq: 'LendVitality' };
NewSpells.RelieveSickness = new Skill( "Relieve Sickness", 'IQ', 2, libAbrv+90 );
NewSpells.RelieveSickness.classes = { reg: true, rsp: true };
NewSpells.RelieveSickness.stats = { castcost: 2, duration: '10 min' };
NewPrerequisites.RelieveSickness_requires_LendVitality = { target: 'RelieveSickness', prereq: 'LendVitality' };
NewSpells.ShareVitality = new Skill( "Share Vitality", 'IQ', 2, libAbrv+90 );
NewSpells.ShareVitality.classes = { reg: true };
NewSpells.ShareVitality.stats = { duration: 'permanent', castcost: 0, time: '1/HP transferred' };
NewPrerequisites.ShareVitality_requires_LendEnergy = { target: 'ShareVitality', prereq: 'LendEnergy' };
NewSpells.ResistDisease = new Skill( "Resist Disease", 'IQ', 2, libAbrv+90 );
NewSpells.ResistDisease.classes = { reg: true };
NewSpells.ResistDisease.stats = { castcost: 4, maintaincost: 3, time: 10, duration: '1 hr' };
NewPrerequisites.ResistDisease_requires_RemoveContagion_pgroup1 = { target: 'ResistDisease', prereq: 'RemoveContagion', pgroup: 1 };
NewPrerequisites.ResistDisease_requires_Vigor_pgroup1 = { target: 'ResistDisease', prereq: 'Vigor', pgroup: 1 };
NewSpells.ResistPoison = new Skill( "Resist Poison", 'IQ', 2, libAbrv+91 );
NewSpells.ResistPoison.classes = { reg: true };
NewSpells.ResistPoison.stats = { castcost: 4, maintaincost: 3, time: 10, duration: '1 hr' };
NewPrerequisites.ResistPoison_requires_Vigor = { target: 'ResistPoison', prereq: 'Vigor' };
NewSpells.StopBleeding = new Skill( "Stop Bleeding", 'IQ', 2, libAbrv+91 );
NewSpells.StopBleeding.classes = { reg: true };
NewSpells.StopBleeding.stats = { castcost: '1; 10 for mortal wound' };
NewPrerequisites.StopBleeding_requires_LendVitality = { target: 'StopBleeding', prereq: 'LendVitality' };
NewSpells.MinorHealing = new Skill( "Minor Healing", 'IQ', 2, libAbrv+91 );
NewSpells.MinorHealing.classes = { reg: true };
NewSpells.MinorHealing.stats = { castcost: '1-3', notes: 'restores 1 HT/pt spent' };
NewPrerequisites.MinorHealing_requires_LendVitality = { target: 'MinorHealing', prereq: 'LendVitality' };
NewSpells.MajorHealing = new Skill( "Major Healing", 'IQ', 3, libAbrv+91 );
NewSpells.MajorHealing.classes = { reg: true };
NewSpells.MajorHealing.stats = { castcost: '1-4', notes: 'restores 2 HT/pt spent' };
NewPrerequisites.MajorHealing_requires_Magery1 = { target: 'MajorHealing', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.MajorHealing_requires_MinorHealing = { target: 'MajorHealing', prereq: 'MinorHealing' };
NewSpells.GreatHealing = new Skill( "Great Healing", 'IQ', 3, libAbrv+91 );
NewSpells.GreatHealing.classes = { reg: true };
NewSpells.GreatHealing.stats = { castcost: 20, time: '1 min' };
NewPrerequisites.GreatHealing_requires_Magery3 = { target: 'GreatHealing', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.GreatHealing_requires_MajorHealing = { target: 'GreatHealing', prereq: 'MajorHealing' };
NewSpells.CureDisease = new Skill( "Cure Disease", 'IQ', 2, libAbrv+91 );
NewSpells.CureDisease.classes = { reg: true };
NewSpells.CureDisease.stats = { castcost: 4, time: '10 min', notes: 'Only one try.' };
NewPrerequisites.CureDisease_requires_RelieveSickness = { target: 'CureDisease', prereq: 'RelieveSickness' };
NewPrerequisites.CureDisease_requires_MajorHealing = { target: 'CureDisease', prereq: 'MajorHealing' };
NewSpells.NeutralizePoison = new Skill( "Neutralize Poison", 'IQ', 2, libAbrv+92 );
NewSpells.NeutralizePoison.classes = { reg: true };
NewSpells.NeutralizePoison.stats = { castcost: 5, time: 30, notes: 'Only one try. -5 to cast unless successful Poisons roll made first.' };
NewPrerequisites.NeutralizePoison_requires_CureDisease_pgroup1 = { target: 'NeutralizePoison', prereq: 'CureDisease', pgroup: 1 };
NewPrerequisites.NeutralizePoison_requires_Magery3_pgroup1 = { target: 'NeutralizePoison', category: ' ADS', prereq: 'Magery', level: 3, pgroup: 1 };
NewPrerequisites.NeutralizePoison_requires_CureDisease_pgroup2 = { target: 'NeutralizePoison', prereq: 'CureDisease', pgroup: 2 };
NewPrerequisites.NeutralizePoison_requires_TestFood_pgroup2 = { target: 'NeutralizePoison', prereq: 'TestFood', pgroup: 2 };
NewSpells.InstantNeutralizePoison = new Skill( "Instant Neutralize Poison", 'IQ', 3, libAbrv+92 );
NewSpells.InstantNeutralizePoison.classes = { reg: true };
NewSpells.InstantNeutralizePoison.stats = { castcost: 8, notes: 'One try per day.' };
NewPrerequisites.InstantNeutralizePoison_requires_Magery2 = { target: 'InstantNeutralizePoison', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.InstantNeutralizePoison_requires_NeutralizePoison = { target: 'InstantNeutralizePoison', prereq: 'NeutralizePoison' };
NewSpells.RelieveAddiction = new Skill( "Relieve Addiction", 'IQ', 2, libAbrv+92 );
NewSpells.RelieveAddiction.classes = { reg: true };
NewSpells.RelieveAddiction.stats = { duration: '1 day', castcost: 6, time: 10 };
NewPrerequisites.RelieveAddiction_requires_NeutralizePoison = { target: 'RelieveAddiction', prereq: 'NeutralizePoison' };
NewSpells.RelieveMadness = new Skill( "Relieve Madness", 'IQ', 2, libAbrv+92 );
NewSpells.RelieveMadness.classes = { reg: true };
NewSpells.RelieveMadness.stats = { duration: '10 min', castcost: 2, time: 10 };
NewPrerequisites.RelieveMadness_requires_NeutralizePoison = { target: 'RelieveMadness', prereq: 'LendVitality' };
NewPrerequisites.RelieveMadness_requires_NeutralizePoison = { target: 'RelieveMadness', prereq: 'Wisdom' };
NewSpells.RestoreSight = new Skill( "Restore Sight", 'IQ', 2, libAbrv+92 );
NewSpells.RestoreSight.classes = { reg: true };
NewSpells.RestoreSight.stats = { duration: '1 hr', castcost: '½ restored Vision (Per &plus; Acute Vision)', maintaincost: '½ C2C', time: 5 };
NewPrerequisites.RestoreSight_requires_MinorHealing = { target: 'RestoreSight', prereq: 'MinorHealing' };
NewPrerequisites.RestoreSight_requires_KeenVision_pgroup1 = { target: 'RestoreSight', prereq: 'KeenVision', pgroup: 1 };
NewPrerequisites.RestoreSight_requires_StrikeBlind_pgroup1 = { target: 'RestoreSight', prereq: 'StrikeBlind', pgroup: 1 };
NewSpells.RestoreHearing = new Skill( "Restore Hearing", 'IQ', 2, libAbrv+92 );
NewSpells.RestoreHearing.classes = { reg: true };
NewSpells.RestoreHearing.stats = { duration: '1 hr', castcost: '½ restored Hearing (Per &plus; Acute Hearing)', maintaincost: '½ C2C', time: 5 };
NewPrerequisites.RestoreHearing_requires_MinorHealing = { target: 'RestoreHearing', prereq: 'MinorHealing' };
NewPrerequisites.RestoreHearing_requires_KeenHearing_pgroup1 = { target: 'RestoreHearing', prereq: 'KeenHearing', pgroup: 1 };
NewPrerequisites.RestoreHearing_requires_StrikeDeaf_pgroup1 = { target: 'RestoreHearing', prereq: 'StrikeDeaf', pgroup: 1 };
NewSpells.RestoreMemory = new Skill( "Restore Memory", 'IQ', 2, libAbrv+92 );
NewSpells.RestoreMemory.classes = { reg: true };
NewSpells.RestoreMemory.stats = { castcost: 3, time: 10 };
NewPrerequisites.RestoreMemory_requires_Awaken = { target: 'RestoreMemory', prereq: 'Awaken' };
NewPrerequisites.RestoreMemory_requires_IQ11 = { target: 'RestoreMemory', prereq: 'IQ', category: 'stat', level: 11 };
NewSpells.RestoreSpeech = new Skill( "Restore Speech", 'IQ', 2, libAbrv+93 );
NewSpells.RestoreSpeech.classes = { reg: true };
NewSpells.RestoreSpeech.stats = { duration: '1 hr', castcost: 5, maintaincost: 3, time: 5 };
NewPrerequisites.RestoreSpeech_requires_MinorHealing = { target: 'RestoreSpeech', prereq: 'MinorHealing' };
NewPrerequisites.RestoreSpeech_requires_GreatVoice_pgroup1 = { target: 'RestoreSpeech', prereq: 'GreatVoice', pgroup: 1 };
NewPrerequisites.RestoreSpeech_requires_StrikeDumb_pgroup1 = { target: 'RestoreSpeech', prereq: 'StrikeDumb', pgroup: 1 };
NewSpells.StopParalysis = new Skill( "Stop Paralysis", 'IQ', 2, libAbrv+93 );
NewSpells.StopParalysis.classes = { reg: true };
NewSpells.StopParalysis.stats = { castcost: '1 for limb; 2 for whole body' };
NewPrerequisites.StopParalysis_requires_MinorHealing_pgroup1 = { target: 'StopParalysis', prereq: 'MinorHealing', pgroup: 1 };
NewPrerequisites.StopParalysis_requires_MajorHealing_pgroup1 = { target: 'StopParalysis', prereq: 'MajorHealing', pgroup: 1 };
NewPrerequisites.StopParalysis_requires_ParalyzeLimb_pgroup2 = { target: 'StopParalysis', prereq: 'ParalyzeLimb', pgroup: 2 };
NewPrerequisites.StopParalysis_requires_MajorHealing_pgroup2 = { target: 'StopParalysis', prereq: 'MajorHealing', pgroup: 2 };
NewSpells.RelieveParalysis = new Skill( "Relieve Paralysis", 'IQ', 2, libAbrv+93 );
NewSpells.RelieveParalysis.classes = { reg: true };
NewSpells.RelieveParalysis.stats = { duration: '1 min', castcost: 'cripple threshold for affected limb(s)', maintaincost: 'same', time: 10 };
NewPrerequisites.RelieveParalysis_requires_StopParalysis = { target: 'RelieveParalysis', prereq: 'StopParalysis' };
NewSpells.Restoration = new Skill( "Restoration", 'IQ', 3, libAbrv+93 );
NewSpells.Restoration.classes = { reg: true };
NewSpells.Restoration.stats = { castcost: 15, time: '1 min', notes: 'One try.  1 month before the process of restoration is complete. The part may not be used at all until the month has passed; it simply won&rsquo;t work, even though it may appear to be healthy.' };
NewPrerequisites.Restoration_requires_MajorHealing_pgroup1 = { target: 'Restoration', prereq: 'MajorHealing', pgroup: 1 };
NewPrerequisites.Restoration_requires_2RestoreRelieveSpells_pgroup1 = { target: 'Restoration', number: 2, prereq: 'RestoreRelieveSpells', pgroup: 1 };
NewSpells.InstantRestoration = new Skill( "Instant Restoration", 'IQ', 3, libAbrv+93 );
NewSpells.InstantRestoration.classes = { reg: true };
NewSpells.InstantRestoration.stats = { castcost: 50, notes: 'One try.' };
NewPrerequisites.InstantRestoration_requires_Magery2 = { target: 'InstantRestoration', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.InstantRestoration_requires_Restoration = { target: 'InstantRestoration', prereq: 'Restoration' };
NewSpells.Regeneration = new Skill( "Regeneration", 'IQ', 3, libAbrv+93 );
NewSpells.Regeneration.classes = { reg: true };
NewSpells.Regeneration.stats = { duration: 'permanent', castcost: 20, time: '1 min', notes: 'One try.  1 month before the process of restoration is complete. The part may not be used at all until the month has passed.' };
NewPrerequisites.Regeneration_requires_Magery2 = { target: 'Regeneration', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Regeneration_requires_Restoration = { target: 'Regeneration', prereq: 'Restoration' };
NewSpells.InstantRegeneration = new Skill( "Instant Regeneration", 'IQ', 3, libAbrv+93 );
NewSpells.InstantRegeneration.classes = { reg: true };
NewSpells.InstantRegeneration.stats = { castcost: 80, notes: 'One try.' };
NewPrerequisites.InstantRegeneration_requires_Magery3 = { target: 'InstantRegeneration', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.InstantRegeneration_requires_Regeneration = { target: 'InstantRegeneration', prereq: 'Regeneration' };
// Cure Radiation under Tech Spells
NewSpells.Cleansing = new Skill( "Cleansing", 'IQ', 2, libAbrv+94 );
NewSpells.Cleansing.classes = { reg: true, spcl: true };
NewSpells.Cleansing.stats = { castcost: '2 for hand/foot, 4 for limb/torso, 6 for whole body', time: 3 };
NewPrerequisites.Cleansing_requires_MinorHealing = { target: 'Cleansing', prereq: 'MinorHealing' };
NewPrerequisites.Cleansing_requires_PurifyEarth  = { target: 'Cleansing', prereq: 'PurifyEarth' };
NewSpells.SuspendedAnimation = new Skill( "Suspended Animation", 'IQ', 2, libAbrv+94 );
NewSpells.SuspendedAnimation.classes = { reg: true, rht: true };
NewSpells.SuspendedAnimation.stats = { castcost: 6, time: 30 };
NewPrerequisites.SuspendedAnimation_requires_Sleep = { target: 'SuspendedAnimation', prereq: 'Sleep' };
NewPrerequisites.SuspendedAnimation_requires_4Healing = { target: 'SuspendedAnimation', number: 4, prereq: 'Healing' };
NewSpells.HealingSlumber = new Skill( "Healing Slumber", 'IQ', 2, libAbrv+94 );
NewSpells.HealingSlumber.classes = { reg: true };
NewSpells.HealingSlumber.stats = { duration: '1 hr / HP healed; up to 8', castcost: '6; 10 for 2&times; speed', notes: 'max 8 HP per day' };
NewPrerequisites.HealingSlumber_requires_Magery2 = { target: 'HealingSlumber', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.HealingSlumber_requires_Sleep = { target: 'HealingSlumber', prereq: 'Sleep' };
NewPrerequisites.HealingSlumber_requires_4Healing = { target: 'HealingSlumber', number: 4, prereq: 'Healing' };
NewSpells.HaltAging = new Skill( "Halt Aging", 'IQ', 3, libAbrv+94 );
NewSpells.HaltAging.classes = { reg: true };
NewSpells.HaltAging.stats = { duration: '1 month', castcost: 20, notes: 'One try per week.' };
NewPrerequisites.HaltAging_requires_Magery2  = { target: 'HaltAging', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.HaltAging_requires_8Healing = { target: 'HaltAging', prereq: 'Healing', number: 8 };
NewSpells.Youth = new Skill( "Youth", 'IQ', 3, libAbrv+94 );
NewSpells.Youth.classes = { reg: true };
NewSpells.Youth.stats = { duration: 'Subject starts aging again immediately.', castcost: 100, notes: 'One try per month.' };
NewPrerequisites.Youth_requires_Magery3   = { target: 'Youth', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.Youth_requires_HaltAging = { target: 'Youth', prereq: 'HaltAging' };
NewSpells.Resurrection = new Skill( "Resurrection", 'IQ', 3, libAbrv+94 );
NewSpells.Resurrection.classes = { reg: true };
NewSpells.Resurrection.stats = { castcost: 300, time: '2 hrs', notes: 'One try.' };
NewPrerequisites.Resurrection_requires_InstantRegeneration = { target: 'Resurrection', prereq: 'InstantRegeneration' };
NewPrerequisites.Resurrection_requires_SummonSpirit        = { target: 'Resurrection', prereq: 'SummonSpirit' };


addToGroup("IllusionCreationSpells",
['PathofIllusionCreation','SimpleIllusion','PhantomFlame','ComplexIllusion','PerfectIllusion','IllusionShell',
'IllusionDisguise','Independence','KnowIllusion','ControlIllusion','DispelIllusion','Inscribe',
'Phantom','Initiative','CreateObject','Duplicate','CreateServant','CreateWarrior','CreateAnimal',
'CreateMount','ControlCreation','DispelCreation']);
NewSpells.SimpleIllusion = new Skill( "Simple Illusion", 'IQ', 2, libAbrv+95 );
NewSpells.SimpleIllusion.classes = { area: true };
NewSpells.SimpleIllusion.stats = { castcost: 1, maintaincost: "½ C2C", duration: "1 min" };
NewPrerequisites.SimpleIllusion_requires_IQ = { target: 'SimpleIllusion', category: 'stat', prereq: 'IQ', level: 11 };
// Phantom Flame under Fire spells
NewSpells.ComplexIllusion = new Skill( "Complex Illusion", 'IQ', 2, libAbrv+96 );
NewSpells.ComplexIllusion.classes = { area: true };
NewSpells.ComplexIllusion.stats = { castcost: 2, maintaincost: "½ C2C", duration: "1 min" };
NewPrerequisites.ComplexIllusion_requires_Sound = { target: 'ComplexIllusion', prereq: 'Sound' };
NewPrerequisites.ComplexIllusion_requires_SimpleIllusion = { target: 'ComplexIllusion', prereq: 'SimpleIllusion' };
NewSpells.PerfectIllusion = new Skill( "Perfect Illusion", 'IQ', 2, libAbrv+96 );
NewSpells.PerfectIllusion.classes = { area: true };
NewSpells.PerfectIllusion.stats = { castcost: 3, maintaincost: "½ C2C", duration: "1 min", notes: 'Double cost to affect touch as well.' };
NewPrerequisites.PerfectIllusion_requires_Magery1 = { target: 'PerfectIllusion', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.PerfectIllusion_requires_ComplexIllusion = { target: 'PerfectIllusion', prereq: 'ComplexIllusion' };
NewSpells.IllusionShell = new Skill( "Illusion Shell", 'IQ', 2, libAbrv+96 );
NewSpells.IllusionShell.classes = { reg: true };
NewSpells.IllusionShell.stats = { castcost: '1 for hand-held objects, 2 for larger', maintaincost: "½ C2C", duration: "1 min" };
NewPrerequisites.IllusionShell_requires_SimpleIllusion = { target: 'IllusionShell', prereq: 'SimpleIllusion' };
NewSpells.IllusionDisguise = new Skill( "Illusion Disguise", 'IQ', 2, libAbrv+96 );
NewSpells.IllusionDisguise.classes = { reg: true };
NewSpells.IllusionDisguise.stats = { castcost: 3, duration: "same as target illusion" };
NewPrerequisites.IllusionDisguise_requires_SimpleIllusion = { target: 'IllusionDisguise', prereq: 'SimpleIllusion' };
NewSpells.Independence = new Skill( "Independence", 'IQ', 2, libAbrv+96 );
NewSpells.Independence.classes = { area: true };
NewSpells.Independence.stats = { castcost: 2, duration: "same as target illusion/creation", time: 'at least 5 seconds; equal to time to give instructions' };
NewPrerequisites.Independence_requires_SimpleIllusion = { target: 'Independence', prereq: 'SimpleIllusion' };
NewSpells.KnowIllusion = new Skill( "Know Illusion", 'IQ', 2, libAbrv+97 );
NewSpells.KnowIllusion.classes = { info: true };
NewSpells.KnowIllusion.stats = { castcost: 2 };
NewPrerequisites.KnowIllusion_requires_SimpleIllusion = { target: 'KnowIllusion', prereq: 'SimpleIllusion' };
NewSpells.ControlIllusion = new Skill( "Control Illusion", 'IQ', 2, libAbrv+97 );
NewSpells.ControlIllusion.classes = { reg: true, rsp: true };
NewSpells.ControlIllusion.stats = { castcost: 1, maintaincost: "as for controlled illusion", time: 2, notes: 'resisted by subject spell' };
NewPrerequisites.ControlIllusion_requires_PerfectIllusion = { target: 'ControlIllusion', prereq: 'PerfectIllusion' };
NewSpells.DispelIllusion = new Skill( "Dispel Illusion", 'IQ', 2, libAbrv+97 );
NewSpells.DispelIllusion.classes = { reg: true, rsp: true };
NewSpells.DispelIllusion.stats = { castcost: 1, notes: 'resisted by subject spell' };
NewPrerequisites.DispelIllusion_requires_ControlIllusion = { target: 'DispelIllusion', prereq: 'ControlIllusion' };
NewSpells.Inscribe = new Skill( "Inscribe", 'IQ', 2, libAbrv+97 );
NewSpells.Inscribe.classes = { reg: true, rwi: true };
NewSpells.Inscribe.stats = { duration: "1 min", castcost: 1, maintaincost: "same", notes: 'minimum cost 2' };
NewPrerequisites.Inscribe_requires_SimpleIllusion = { target: 'Inscribe', prereq: 'SimpleIllusion' };
NewPrerequisites.Inscribe_requires_Copy = { target: 'Inscribe', prereq: 'Copy' };
NewSpells.Phantom = new Skill( "Phantom", 'IQ', 3, libAbrv+97 );
NewSpells.Phantom.classes = { area: true };
NewSpells.Phantom.stats = { duration: "1 min", castcost: 5, maintaincost: "½ C2C", notes: 'For a base cost of 9, the phantom can have twice the normal ST (DX is unchanged).' };
NewPrerequisites.Phantom_requires_Magery2 = { target: 'Phantom', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Phantom_requires_SimpleIllusion = { target: 'Phantom', prereq: 'PerfectIllusion' };
NewPrerequisites.Phantom_requires_Hinder = { target: 'Phantom', prereq: 'Hinder' };
NewPrerequisites.Phantom_requires_Apportation = { target: 'Phantom', prereq: 'Apportation' };
NewSpells.Initiative = new Skill( "Initiative", 'IQ', 3, libAbrv+98 );
NewSpells.Initiative.classes = { area: true };
NewSpells.Initiative.stats = { duration: "same as target illusion/creation", time: 10, castcost: '&frac13; per point of DX or IQ increase (round up), plus 1 per skill; minimum base cost of 3.' };
NewPrerequisites.Initiative_requires_Independence = { target: 'Initiative', prereq: 'Independence' };
NewPrerequisites.Initiative_requires_Wisdom = { target: 'Initiative', prereq: 'Wisdom' };
NewSpells.CreateObject = new Skill( "Create Object", 'IQ', 3, libAbrv+98 );
NewSpells.CreateObject.classes = { reg: true };
NewSpells.CreateObject.stats = { duration: 'while (almost) touching sentient being', castcost: '2 per 5 lbs created', time: 'Equal to cost, in seconds.' };
NewPrerequisites.CreateObject_requires_Magery2 = { target: 'CreateObject', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.CreateObject_requires_CreateEarth = { target: 'CreateObject', prereq: 'CreateEarth' };
NewPrerequisites.CreateObject_requires_PerfectIllusion = { target: 'CreateObject', prereq: 'PerfectIllusion' };
NewSpells.Duplicate = new Skill( "Duplicate", 'IQ', 3, libAbrv+98 );
NewSpells.Duplicate.classes = { reg: true };
NewSpells.Duplicate.stats = { duration: 'while (almost) touching sentient being', castcost: '3 per 5 lbs created', time: 'Equal to cost, in seconds.' };
NewPrerequisites.Duplicate_requires_CreateObject = { target: 'Duplicate', prereq: 'CreateObject' };
NewPrerequisites.Duplicate_requires_Copy = { target: 'Duplicate', prereq: 'Copy' };
NewSpells.CreateServant = new Skill( "Create Servant", 'IQ', 2, libAbrv+98 );
NewSpells.CreateServant.classes = { reg: true };
NewSpells.CreateServant.stats = { duration: "1 min", castcost: 3, maintaincost: 1, time: 3, notes: 'For a skilled servitor, 4 to cast; 2 to maintain. For a Brute, 6 to cast; 2 to maintain.' };
NewPrerequisites.CreateServant_requires_Magery3 = { target: 'CreateServant', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.CreateServant_requires_IQ = { target: 'CreateServant', category: 'stat', prereq: 'IQ', level: 12 };
NewPrerequisites.CreateServant_requires_CreateObject = { target: 'CreateServant', prereq: 'CreateObject' };
NewSpells.CreateWarrior = new Skill( "Create Warrior", 'IQ', 2, libAbrv+98 );
NewSpells.CreateWarrior.classes = { reg: true };
NewSpells.CreateWarrior.stats = { duration: "1 min", castcost: 4, maintaincost: 4, time: 4, notes: 'For a Brute Warrior (ST 16), 6 to cast; 6 to maintain.' };
NewPrerequisites.CreateWarrior_requires_CreateServant = { target: 'CreateWarrior', prereq: 'CreateServant' };
NewSpells.CreateAnimal = new Skill( "Create Animal", 'IQ', 2, libAbrv+98 );
NewSpells.CreateAnimal.classes = { reg: true };
NewSpells.CreateAnimal.stats = { duration: "1 min", castcost: '2 &times; (SM+1)', maintaincost: '½ C2C', time: 'same as cost', notes: '' };
NewPrerequisites.CreateAnimal_requires_CreateWater = { target: 'CreateAnimal', prereq: 'CreateWater' };
NewPrerequisites.CreateAnimal_requires_CreateObject = { target: 'CreateAnimal', prereq: 'CreateObject' };
NewPrerequisites.CreateAnimal_requires_IQ = { target: 'CreateAnimal', category: 'stat', prereq: 'IQ', level: 12 };
NewSpells.CreateMount = new Skill( "Create Mount", 'IQ', 2, libAbrv+99 );
NewSpells.CreateMount.classes = { reg: true };
NewSpells.CreateMount.stats = { duration: '1 hr', castcost: 8, maintaincost: 3, time: 3, notes: 'Double the cost for a Brute mount, a Winged mount, a War-Trained mount, or a Racing mount. Triple the cost for a Winged Racing mount, <i>etc</i>.' };
NewPrerequisites.CreateMount_requires_Magery3 = { target: 'CreateMount', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.CreateMount_requires_CreateAnimal = { target: 'CreateMount', prereq: 'CreateAnimal' };
NewSpells.ControlCreation = new Skill( "Control Creation", 'IQ', 2, libAbrv+99 );
NewSpells.ControlCreation.classes = { reg: true, rsp: true };
NewSpells.ControlCreation.stats = { castcost: 1, maintaincost: "as for controlled illusion", time: 2, notes: 'resisted by subject spell' };
NewPrerequisites.ControlCreation_requires_CreateAnimal_pgroup1  = { target: 'ControlCreation', prereq: 'CreateAnimal',  pgroup: 1 };
NewPrerequisites.ControlCreation_requires_CreateServant_pgroup1 = { target: 'ControlCreation', prereq: 'CreateServant', pgroup: 1 };
NewSpells.DispelCreation = new Skill( "Dispel Creation", 'IQ', 2, libAbrv+99 );
NewSpells.DispelCreation.classes = { reg: true };
NewSpells.DispelCreation.stats = { castcost: '1 to dispel a nonliving subject, or 3 to dispel a living creation.', notes: 'resisted by subject spell' };
NewPrerequisites.DispelCreation_requires_ControlCreation = { target: 'DispelCreation', prereq: 'ControlCreation' };


addToGroup("KnowledgeSpells",
['Measurement','TellTime','Alarm','FarFeeling','FindDirection','TellPosition','TestLoad',
'SmallVision','EarthVision','AirVision','DetectMagic','SenseMana','Aura','IdentifySpell',
'MageSight','MageSense','SeekMagic','AnalyzeMagic','SummonShade','GlassWall','FarTasting',
'FarHearing','WaterVision','PlantVision','KnowLocation','KnowRecipe','WizardEye',
'InvisibleWizardEye','WizardMouth','WizardNose','WizardHand','PlasticVision','MetalVision',
'AstralVision','Memorize','Pathfinder',"Projection",'Seeker','Trace','HistorySpell',
'AncientHistory','Prehistory','ReconstructSpell','KnowTrueShape','Recall','RememberPath',
'SeeSecrets','Schematic','ScentsofthePast','ImagesofthePast','EchoesofthePast','Divination']);
NewSpells.Measurement = new Skill( "Measurement", 'IQ', 2, libAbrv+100 );
NewSpells.Measurement.classes = { area: true, info: true };
NewSpells.Measurement.stats = { castcost: 1 };
NewSpells.TellTime = new Skill( "Tell Time", 'IQ', 2, libAbrv+100 );
NewSpells.TellTime.classes = { info: true };
NewSpells.TellTime.stats = { castcost: 1 };
NewSpells.Alarm = new Skill( "Alarm", 'IQ', 2, libAbrv+100 );
NewSpells.Alarm.classes = { reg: true };
NewSpells.Alarm.stats = { duration: '1 week', castcost: 1 };
NewPrerequisites.Alarm_requires_TellTime = { target: 'Alarm', prereq: 'TellTime' };
NewSpells.FarFeeling = new Skill( "Far-Feeling", 'IQ', 2, libAbrv+100 );
NewSpells.FarFeeling.classes = { reg: true };
NewSpells.FarFeeling.stats = { duration: '1 min', castcost: 3, maintaincost: 1, time: 3 };
NewPrerequisites.FarFeeling_requires_Magery1 = { target: 'FarFeeling', category: 'ADS', prereq: 'Magery', level: 1 };
NewSpells.FindDirection = new Skill( "Find Direction", 'IQ', 2, libAbrv+101 );
NewSpells.FindDirection.classes = { info: true };
NewSpells.FindDirection.stats = { castcost: 2 };
NewPrerequisites.FindDirection_requires_Magery1 = { target: 'FindDirection', category: 'ADS', prereq: 'Magery', level: 1 };
NewSpells.TellPosition = new Skill( "Tell Position", 'IQ', 2, libAbrv+101 );
NewSpells.TellPosition.classes = { info: true };
NewSpells.TellPosition.stats = { castcost: 1 };
NewPrerequisites.TellPosition_requires_Measurement = { target: 'TellPosition', prereq: 'Measurement' };
NewSpells.TestLoad = new Skill( "Test Load", 'IQ', 2, libAbrv+101 );
NewSpells.TestLoad.classes = { area: true, info: true };
NewSpells.TestLoad.stats = { castcost: 1, notes: 'min. cost 2' };
NewPrerequisites.TestLoad_requires_Measurement = { target: 'TestLoad', prereq: 'Measurement' };
// Small Vision under Light & Darkness spells
// Earth Vision under Earth spells
// Air Vision under Air spells
NewSpells.DetectMagic = new Skill( "Detect Magic", 'IQ', 2, libAbrv+101 );
NewSpells.DetectMagic.classes = { reg: true };
NewSpells.DetectMagic.stats = { castcost: 2, time: 5 };
NewPrerequisites.DetectMagic_requires_Magery1 = { target: 'DetectMagic', category: 'ADS', prereq: 'Magery', level: 1 };
NewSpells.SenseMana = new Skill( "Sense Mana", 'IQ', 2, libAbrv+101 );
NewSpells.SenseMana.classes = { info: true };
NewSpells.SenseMana.stats = { castcost: 3, time: 5 };
NewPrerequisites.SenseMana_requires_DetectMagic = { target: 'SenseMana', prereq: 'DetectMagic' };
NewSpells.Aura = new Skill( "Aura", 'IQ', 2, libAbrv+101 );
NewSpells.Aura.classes = { info: true };
NewSpells.Aura.stats = { castcost: 3, notes: 'cost does not vary with size of subject' };
NewPrerequisites.Aura_requires_DetectMagic = { target: 'Aura', prereq: 'DetectMagic' };
NewSpells.IdentifySpell = new Skill( "Identify Spell", 'IQ', 2, libAbrv+102 );
NewSpells.IdentifySpell.classes = { info: true };
NewSpells.IdentifySpell.stats = { castcost: 2 };
NewPrerequisites.IdentifySpell_requires_DetectMagic = { target: 'IdentifySpell', prereq: 'DetectMagic' };
NewSpells.MageSight = new Skill( "Mage Sight", 'IQ', 2, libAbrv+102 );
NewSpells.MageSight.classes = { reg: true };
NewSpells.MageSight.stats = { duration: '1 min', castcost: 3, maintaincost: 2, time: 5 };
NewPrerequisites.MageSight_requires_DetectMagic = { target: 'MageSight', prereq: 'DetectMagic' };
NewSpells.MageSense = new Skill( "Mage Sense", 'IQ', 2, libAbrv+102 );
NewSpells.MageSense.classes = { info: true };
NewSpells.MageSense.stats = { duration: '1 min', castcost: 3, maintaincost: 2, time: 5 };
NewPrerequisites.MageSense_requires_DetectMagic = { target: 'MageSense', prereq: 'DetectMagic' };
NewSpells.SeekMagic = new Skill( "Seek Magic", 'IQ', 2, libAbrv+102 );
NewSpells.SeekMagic.classes = { info: true };
NewSpells.SeekMagic.stats = { castcost: 6, time: 10 };
NewPrerequisites.SeekMagic_requires_DetectMagic = { target: 'SeekMagic', prereq: 'DetectMagic' };
NewSpells.AnalyzeMagic = new Skill( "Analyze Magic", 'IQ', 2, libAbrv+102 );
NewSpells.AnalyzeMagic.classes = { info: true, res: true };
NewSpells.AnalyzeMagic.stats = { castcost: 8, time: '1 hr', notes: 'resisted by spells that conceal magic' };
NewPrerequisites.AnalyzeMagic_requires_IdentifySpell = { target: 'AnalyzeMagic', prereq: 'IdentifySpell' };
NewSpells.SummonShade = new Skill( "Summon Shade", 'IQ', 3, libAbrv+102 );
NewSpells.SummonShade.classes = { info: true, rwi: true };
NewSpells.SummonShade.stats = { duration: '1 min', castcost: 50, maintaincost: 20, time: '10 min', notes: 'One try per year, per subject.' };
NewPrerequisites.SummonShade_requires_SummonSpirit_pgroup1 = { target: 'SummonShade', prereq: 'SummonSpirit', pgroup: 1 };
NewPrerequisites.SummonShade_requires_Divination_pgroup1  = { target: 'SummonShade', prereq: 'Divination',    pgroup: 1 };
NewSpells.GlassWall = new Skill( "Glass Wall", 'IQ', 2, libAbrv+103 );
NewSpells.GlassWall.classes = { reg: true };
NewSpells.GlassWall.stats = { duration: '1 min', castcost: 4, maintaincost: 2 };
NewPrerequisites.GlassWall_requires_5Knowledge_pgroup1  = { target: 'GlassWall', prereq: 'Knowledge', number: 5, pgroup: 1 };
NewPrerequisites.GlassWall_requires_EarthVision_pgroup1 = { target: 'GlassWall', prereq: 'EarthVision',          pgroup: 1 };
// Far-Tasting under Food spells
// Far-Hearing under Sound spells
// Water Vision under Water spells
// Plant Vision under Plant spells
NewSpells.KnowLocation = new Skill( "Know Location", 'IQ', 2, libAbrv+103 );
NewSpells.KnowLocation.classes = { info: true };
NewSpells.KnowLocation.stats = { castcost: 2, time: 10 };
NewPrerequisites.KnowLocation_requires_Magery1 = { target: 'KnowLocation', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.KnowLocation_requires_TellPosition = { target: 'KnowLocation', prereq: 'TellPosition' };
// Know Recipe under Food spells
NewSpells.WizardEye = new Skill( "Wizard Eye", 'IQ', 2, libAbrv+104 );
NewSpells.WizardEye.classes = { reg: true };
NewSpells.WizardEye.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 2 };
NewPrerequisites.WizardEye_requires_Apportation = { target: 'WizardEye', prereq: 'Apportation' };
NewPrerequisites.WizardEye_requires_KeenVision  = { target: 'WizardEye', prereq: 'KeenVision' };
NewSpells.InvisibleWizardEye = new Skill( "Invisible Wizard Eye", 'IQ', 2, libAbrv+104 );
NewSpells.InvisibleWizardEye.classes = { reg: true };
NewSpells.InvisibleWizardEye.stats = { duration: '1 min', castcost: 5, maintaincost: 3, time: 4 };
NewPrerequisites.InvisibleWizardEye_requires_WizardEye    = { target: 'InvisibleWizardEye', prereq: 'WizardEye' };
NewPrerequisites.InvisibleWizardEye_requires_Invisibility = { target: 'InvisibleWizardEye', prereq: 'Invisibility' };
NewSpells.WizardMouth = new Skill( "Wizard Mouth", 'IQ', 2, libAbrv+104 );
NewSpells.WizardMouth.classes = { reg: true };
NewSpells.WizardMouth.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 2 };
NewPrerequisites.WizardMouth_requires_Apportation = { target: 'WizardMouth', prereq: 'Apportation' };
NewPrerequisites.WizardMouth_requires_FarTasting  = { target: 'WizardMouth', prereq: 'FarTasting' };
NewPrerequisites.WizardMouth_requires_GreatVoice  = { target: 'WizardMouth', prereq: 'GreatVoice' };
NewSpells.WizardNose = new Skill( "Wizard Nose", 'IQ', 2, libAbrv+104 );
NewSpells.WizardNose.classes = { reg: true };
NewSpells.WizardNose.stats = { duration: '1 min', castcost: 3, maintaincost: 2, time: 2 };
NewPrerequisites.WizardNose_requires_Apportation = { target: 'WizardNose', prereq: 'Apportation' };
NewPrerequisites.WizardNose_requires_FarTasting  = { target: 'WizardNose', prereq: 'FarTasting' };
NewSpells.WizardHand = new Skill( "Wizard Hand", 'IQ', 2, libAbrv+104 );
NewSpells.WizardHand.classes = { reg: true };
NewSpells.WizardHand.stats = { duration: '1 min', castcost: 4, maintaincost: 3, time: 3, notes: "Can be cast on two hands for 6, 4 to maintain." };
NewPrerequisites.WizardHand_requires_Manipulate = { target: 'WizardHand', prereq: 'Manipulate' };
NewPrerequisites.WizardHand_requires_FarFeeling = { target: 'WizardHand', prereq: 'FarFeeling' };
// Plastic Vision under Technological spells
// Metal Vision under Technological spells
NewSpells.AstralVision = new Skill( "Astral Vision", 'IQ', 3, libAbrv+105 );
NewSpells.AstralVision.classes = { reg: true };
NewSpells.AstralVision.stats = { duration: '1 min', castcost: 4, maintaincost: 2 };
NewPrerequisites.AstralVision_requires_SenseSpirit  = { target: 'AstralVision', prereq: 'SenseSpirit' };
NewPrerequisites.AstralVision_requires_SeeInvisible = { target: 'AstralVision', prereq: 'SeeInvisible' };
NewSpells.Memorize = new Skill( "Memorize", 'IQ', 3, libAbrv+105 );
NewSpells.Memorize.classes = { info: true, rwi: true };
NewSpells.Memorize.stats = { duration: '1 day', castcost: 3, time: 2, notes: 'One try per year, per subject.' };
NewPrerequisites.Memorize_requires_Wisdom_pgroup1 = { target: 'Memorize', prereq: 'Wisdom', pgroup: 1 };
NewPrerequisites.Memorize_requires_6Knowledge_pgroup1 = { target: 'Memorize', prereq: 'KnowledgeSpells', number: 6, pgroup: 1 };
NewSpells.Pathfinder = new Skill( "Pathfinder", 'IQ', 2, libAbrv+105 );
NewSpells.Pathfinder.classes = { info: true };
NewSpells.Pathfinder.stats = { castcost: 4, time: 10 };
NewPrerequisites.Pathfinder_requires_Magery1 = { target: 'Pathfinder', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.Pathfinder_requires_IQ = { target: 'Pathfinder', category: 'stat', level: 12, prereq: 'IQ' };
NewPrerequisites.Pathfinder_requires_SeekSpells = { target: 'Pathfinder', number: 2, prereq: 'SeekSpells' };
NewSpells.Projection = new Skill( "Projection", 'IQ', 2, libAbrv+105 );
NewSpells.Projection.classes = { reg: true };
NewSpells.Projection.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 3 };
NewPrerequisites.Projection_requires_SenseSpirit = { target: 'Projection', prereq: 'SenseSpirit' };
NewPrerequisites.Projection_requires_4Knowledge  = { target: 'Projection', number: 4, prereq: 'KnowledgeSpells' };
NewSpells.Seeker = new Skill( "Seeker", 'IQ', 2, libAbrv+105 );
NewSpells.Seeker.classes = { info: true };
NewSpells.Seeker.stats = { castcost: 3, notes: 'One try per week.' };
NewPrerequisites.Seeker_requires_Magery1     = { target: 'Seeker', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.Seeker_requires_IQ12        = { target: 'Seeker', category: 'stat', prereq: 'IQ', level: 12 };
NewPrerequisites.Seeker_requires_2SeekSpells = { target: 'Seeker', number: 2, prereq: 'SeekSpells' };
NewSpells.Trace = new Skill( "Trace", 'IQ', 2, libAbrv+106 );
NewSpells.Trace.classes = { reg: true };
NewSpells.Trace.stats = { castcost: 3, maintaincost: 1, duration: '1 hr', time: '1 min', notes: 'One try per day.' };
NewPrerequisites.Trace_requires_Seeker = { target: 'Trace', prereq: 'Seeker' };
NewSpells.HistorySpell = new Skill( "History", 'IQ', 2, libAbrv+106 );
NewSpells.HistorySpell.classes = { info: true };
NewSpells.HistorySpell.stats = { castcost: "3 for a day; 5 for a week; 8 for a month; 10 for a year", time: "1 second per energy to cast" };
NewPrerequisites.HistorySpell_requires_Trace = { target: 'HistorySpell', targetCat: 'spell', prereq: 'Trace' };
NewSpells.AncientHistory = new Skill( "Ancient History", 'IQ', 2, libAbrv+106 );
NewSpells.AncientHistory.classes = { info: true };
NewSpells.AncientHistory.stats = { castcost: "3 for a year; 5 for 10 years; 8 for 100 years; 10 for 1,000 years", time: "1 minute per energy to cast" };
NewPrerequisites.AncientHistory_requires_HistorySpell = { target: 'AncientHistory', targetCat: 'spell', prereq: 'HistorySpell' };
NewSpells.Prehistory = new Skill( "Prehistory", 'IQ', 2, libAbrv+106 );
NewSpells.Prehistory.classes = { info: true };
NewSpells.Prehistory.stats = { castcost: "3 for 1,000 years; 5 for 10,000 years; 8 for 100,000 years; 10 for longer", time: "1 hour per energy to cast" };
NewPrerequisites.Prehistory_requires_AncientHistory = { target: 'Prehistory', targetCat: 'spell', prereq: 'AncientHistory' };
NewSpells.ReconstructSpell = new Skill( "Reconstruct Spell", 'IQ', 2, libAbrv+106 );
NewSpells.ReconstructSpell.classes = { info: true };
NewSpells.ReconstructSpell.stats = { castcost: "3 + Time modifier (Magic p81)", time: 10 };
NewPrerequisites.ReconstructSpell_requires_Magery2 = { target: 'ReconstructSpell', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.ReconstructSpell_requires_HistorySpell = { target: 'ReconstructSpell', targetCat: 'spell', prereq: 'HistorySpell' };
NewPrerequisites.ReconstructSpell_requires_IdentifySpell = { target: 'ReconstructSpell', prereq: 'IdentifySpell' };
NewSpells.KnowTrueShape = new Skill( "Know True Shape", 'IQ', 2, libAbrv+106 );
NewSpells.KnowTrueShape.classes = { info: true };
NewSpells.KnowTrueShape.stats = { castcost: 2 };
NewPrerequisites.KnowTrueShape_requires_Magery1 = { target: 'KnowTrueShape', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.KnowTrueShape_requires_1ShiftingSpells = { target: 'KnowTrueShape', number: 1, prereq: 'ShiftingSpells' };
NewPrerequisites.KnowTrueShape_requires_Aura_pgroup1 = { target: 'KnowTrueShape', prereq: 'Aura', pgroup: 1 };
NewPrerequisites.KnowTrueShape_requires_KnowIllusion_pgroup1 = { target: 'KnowTrueShape', prereq: 'KnowIllusion', pgroup: 1 };
NewSpells.Recall = new Skill( "Recall", 'IQ', 2, libAbrv+106 );
NewSpells.Recall.classes = { reg: true };
NewSpells.Recall.stats = { castcost: 4, duration: '1 day', time: 10, notes: 'One try per day.' };
NewPrerequisites.Recall_requires_Magery2 = { target: 'Recall', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Recall_requires_Memorize = { target: 'Recall', prereq: 'Memorize' };
NewPrerequisites.Recall_requires_HistorySpell = { target: 'Recall', targetCat: 'spell', prereq: 'HistorySpell' };
NewSpells.RememberPath = new Skill( "Remember Path", 'IQ', 2, libAbrv+107 );
NewSpells.RememberPath.classes = { reg: true };
NewSpells.RememberPath.stats = { duration: '1 hr', castcost: 3, maintaincost: 1, time: 10, notes: 'One try per day.' };
NewPrerequisites.RememberPath_requires_FindDirection = { target: 'RememberPath',prereq: 'FindDirection' };
NewPrerequisites.RememberPath_requires_Memorize      = { target: 'RememberPath', prereq: 'Memorize' };
NewSpells.SeeSecrets = new Skill( "See Secrets", 'IQ', 2, libAbrv+107 );
NewSpells.SeeSecrets.classes = { reg: true };
NewSpells.SeeSecrets.stats = { duration: '1 min', castcost: 5, maintaincost: 2, time: 5 };
NewPrerequisites.SeeSecrets_requires_Seeker = { target: 'SeeSecrets', prereq: 'Seeker' };
NewPrerequisites.SeeSecrets_requires_Aura   = { target: 'SeeSecrets', prereq: 'Aura' };
// Schematic/TL under Technological spells
NewSpells.ScentsofthePast = new Skill( "Scents of the Past", 'IQ', 2, libAbrv+107 );
NewSpells.ScentsofthePast.classes = { reg: true };
NewSpells.ScentsofthePast.stats = { duration: '1 min', castcost: "1 + Time modifier (Magic p81)", maintaincost: 'same', time: 10 };
NewPrerequisites.ScentsofthePast_requires_Magery2      = { target: 'ScentsofthePast', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.ScentsofthePast_requires_HistorySpell = { target: 'ScentsofthePast', targetCat: 'spell', prereq: 'HistorySpell' };
NewPrerequisites.ScentsofthePast_requires_Odor         = { target: 'ScentsofthePast', prereq: 'Odor' };
NewSpells.ImagesofthePast = new Skill( "Images of the Past", 'IQ', 2, libAbrv+107 );
NewSpells.ImagesofthePast.classes = { reg: true };
NewSpells.ImagesofthePast.stats = { duration: '1 min', castcost: "3 + Time modifier (Magic p81)", maintaincost: 'same', time: 10 };
NewPrerequisites.ImagesofthePast_requires_Magery2        = { target: 'ImagesofthePast', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.ImagesofthePast_requires_HistorySpell   = { target: 'ImagesofthePast', targetCat: 'spell', prereq: 'HistorySpell' };
NewPrerequisites.ImagesofthePast_requires_SimpleIllusion = { target: 'ImagesofthePast', prereq: 'SimpleIllusion' };
NewSpells.EchoesofthePast = new Skill( "Echoes of the Past", 'IQ', 2, libAbrv+107 );
NewSpells.EchoesofthePast.classes = { reg: true };
NewSpells.EchoesofthePast.stats = { duration: '1 min', castcost: "2 + Time modifier (Magic p81)", maintaincost: 'same', time: 10 };
NewPrerequisites.EchoesofthePast_requires_Magery2      = { target: 'EchoesofthePast', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.EchoesofthePast_requires_HistorySpell = { target: 'EchoesofthePast', targetCat: 'spell', prereq: 'HistorySpell' };
NewPrerequisites.EchoesofthePast_requires_Voices       = { target: 'EchoesofthePast', prereq: 'Voices' };
NewSpells.Divination = new Skill( "Divination", 'IQ', 2, libAbrv+108 );
NewSpells.Divination.specRequiredList = [];
NewSpells.Divination.classes = { info: true };
NewSpells.Divination.stats = { castcost: 10, time: '1 hour, usually', notes: "See <i>Divination</i>, Magic p108. Long-distance and Time mods apply, also -4 for second attempt, -8 for third, <i>etc</i>." };
NewPrerequisites.Divination_requires_HistorySpell = { target: 'Divination', targetCat: 'spell', prereq: 'HistorySpell' };


addToGroup("LightDarknessSpells",
['Light','ContinualLight','Colors','RemoveShadow','ShapeLight','BrightVision','Infravision',
'NightVision','HawkVision','SmallVision','DarkVision','Darkness','Blackout','Glow','Gloom',
'LightJet','Flash','Mirror','RemoveReflection','WallOfLight','Shade','Blur','ShapeDarkness','Hide',
'SeeInvisible','MageLight','ContinualMageLight','Sunlight','ContinualSunlight','Invisibility',
'BodyofShadow','Sunbolt']);
NewSpells.Light = new Skill( "Light", 'IQ', 2, libAbrv+110 );
NewSpells.Light.classes = { reg: true };
NewSpells.Light.stats = { castcost: 1, maintaincost: 1, duration: '1 min' };
NewSpells.ContinualLight = new Skill( "Continual Light", 'IQ', 2, libAbrv+110 );
NewSpells.ContinualLight.classes = { reg: true };
NewSpells.ContinualLight.stats = { castcost: '2-6', duration: '2d days' };
NewPrerequisites.ContinualLight_requires_Light = { target: 'ContinualLight', prereq: 'Light' };
NewSpells.Colors = new Skill( "Colors", 'IQ', 2, libAbrv+110 );
NewSpells.Colors.classes = { reg: true };
NewSpells.Colors.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
NewPrerequisites.Colors_requires_Light = { target: 'Colors', prereq: 'Light' };
NewSpells.RemoveShadow = new Skill( "Remove Shadow", 'IQ', 2, libAbrv+110 );
NewSpells.RemoveShadow.classes = { reg: true, rwi: true };
NewSpells.RemoveShadow.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
NewPrerequisites.RemoveShadow_requires_Light = { target: 'RemoveShadow', prereq: 'Light' };
NewSpells.ShapeLight = new Skill( "Shape Light", 'IQ', 2, libAbrv+111 );
NewSpells.ShapeLight.classes = { reg: true };
NewSpells.ShapeLight.stats = { castcost: 2, maintaincost: 2, duration: '1 min' };
NewPrerequisites.ShapeLight_requires_Light = { target: 'ShapeLight', prereq: 'Light' };
NewSpells.BrightVision = new Skill( "Bright Vision", 'IQ', 2, libAbrv+111 );
NewSpells.BrightVision.classes = { reg: true };
NewSpells.BrightVision.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
NewPrerequisites.BrightVision_requires_KeenVision_pgroup1 = { target: 'BrightVision', prereq: 'KeenVision',    pgroup: 1 };
NewPrerequisites.BrightVision_requires_5LD_pgroup1        = { target: 'BrightVision', prereq: 'LD', number: 5, pgroup: 1 };
NewSpells.Infravision = new Skill( "Infravision", 'IQ', 2, libAbrv+111 );
NewSpells.Infravision.classes = { reg: true };
NewSpells.Infravision.stats = { castcost: 3, maintaincost: 1, duration: '1 min' };
NewPrerequisites.Infravision_requires_KeenVision_pgroup1 = { target: 'Infravision', prereq: 'KeenVision',    pgroup: 1 };
NewPrerequisites.Infravision_requires_5LD_pgroup1        = { target: 'Infravision', prereq: 'LD', number: 5, pgroup: 1 };
NewSpells.NightVision = new Skill( "Night Vision", 'IQ', 2, libAbrv+111 );
NewSpells.NightVision.classes = { reg: true };
NewSpells.NightVision.stats = { castcost: 3, maintaincost: 1, duration: '1 min' };
NewPrerequisites.NightVision_requires_KeenVision_pgroup1 = { target: 'NightVision', prereq: 'KeenVision',    pgroup: 1 };
NewPrerequisites.NightVision_requires_5LD_pgroup1        = { target: 'NightVision', prereq: 'LD', number: 5, pgroup: 1 };
NewSpells.HawkVision = new Skill( "Hawk Vision", 'IQ', 2, libAbrv+111 );
NewSpells.HawkVision.classes = { reg: true };
NewSpells.HawkVision.stats = { castcost: '2/Tele-Vis level', maintaincost: '½ C2C', duration: '1 min' };
NewPrerequisites.HawkVision_requires_KeenVision_pgroup1 = { target: 'HawkVision', prereq: 'KeenVision',    pgroup: 1 };
NewPrerequisites.HawkVision_requires_5LD_pgroup1        = { target: 'HawkVision', prereq: 'LD', number: 5, pgroup: 1 };
NewSpells.SmallVision = new Skill( "Small Vision", 'IQ', 2, libAbrv+111 );
NewSpells.SmallVision.classes = { reg: true };
NewSpells.SmallVision.stats = { castcost: 4, maintaincost: 2, time: 2, duration: '1 min', notes: 'double casting cost for each additional 10x magnification' };
NewPrerequisites.SmallVision_requires_KeenVision_pgroup1 = { target: 'SmallVision', prereq: 'KeenVision',    pgroup: 1 };
NewPrerequisites.SmallVision_requires_5LD_pgroup1        = { target: 'SmallVision', prereq: 'LD', number: 5, pgroup: 1 };
NewSpells.DarkVision = new Skill( "Dark Vision", 'IQ', 2, libAbrv+111 );
NewSpells.DarkVision.classes = { reg: true };
NewSpells.DarkVision.stats = { castcost: 5, maintaincost: 2, duration: '1 min' };
NewPrerequisites.DarkVision_requires_NightVision_pgroup1 = { target: 'DarkVision', prereq: 'NightVision', pgroup: 1 };
NewPrerequisites.DarkVision_requires_Infravision_pgroup1 = { target: 'DarkVision', prereq: 'Infravision', pgroup: 1 };
NewSpells.Darkness = new Skill( "Darkness", 'IQ', 2, libAbrv+111 );
NewSpells.Darkness.classes = { area: true };
NewSpells.Darkness.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
NewPrerequisites.Darkness_requires_ContinualLight = { target: 'Darkness', prereq: 'ContinualLight' };
NewSpells.Blackout = new Skill( "Blackout", 'IQ', 2, libAbrv+112 );
NewSpells.Blackout.classes = { area: true };
NewSpells.Blackout.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
NewPrerequisites.Blackout_requires_Darkness = { target: 'Blackout', prereq: 'Darkness' };
NewSpells.Glow = new Skill( "Glow", 'IQ', 2, libAbrv+112 );
NewSpells.Glow.classes = { area: true };
NewSpells.Glow.stats = { castcost: '½ for starlight; 1 for moonlight; 3/2 for torchlight; 2 for daylight', time: '1 sec for each ½-pt base cost', duration: '2d days' };
NewPrerequisites.Glow_requires_ContinualLight = { target: 'Glow', prereq: 'ContinualLight' };
NewSpells.Gloom = new Skill( "Gloom", 'IQ', 2, libAbrv+112 );
NewSpells.Gloom.classes = { area: true };
NewSpells.Gloom.stats = { castcost: '½ for torchlight; 1 for moonlight; 3/2 for starlight; 2 for total darkness', time: '1 sec for each ½-pt base cost', duration: '2d days' };
NewPrerequisites.Gloom_requires_ContinualLight = { target: 'Gloom', prereq: 'ContinualLight' };
NewSpells.LightJet = new Skill( "Light Jet", 'IQ', 2, libAbrv+112 );
NewSpells.LightJet.classes = { reg: true };
NewSpells.LightJet.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
NewPrerequisites.LightJet_requires_ContinualLight_pgroup1 = { target: 'LightJet', prereq: 'ContinualLight', pgroup: 1 };
NewPrerequisites.LightJet_requires_ShapeLight_pgroup1     = { target: 'LightJet', prereq: 'ShapeLight',     pgroup: 1 };
NewSpells.Flash = new Skill( "Flash", 'IQ', 2, libAbrv+112 );
NewSpells.Flash.classes = { reg: true };
NewSpells.Flash.stats = { castcost: 4, time: 2 };
NewPrerequisites.Flash_requires_ContinualLight = { target: 'Flash', prereq: 'ContinualLight' };
NewSpells.Mirror = new Skill( "Mirror", 'IQ', 2, libAbrv+112 );
NewSpells.Mirror.classes = { reg: true };
NewSpells.Mirror.stats = { castcost: 2, maintaincost: 2, duration: '1 min' };
NewPrerequisites.Mirror_requires_Colors = { target: 'Mirror', prereq: 'Colors' };
NewSpells.RemoveReflection = new Skill( "Remove Reflection", 'IQ', 2, libAbrv+113 );
NewSpells.RemoveReflection.classes = { reg: true, rwi: true };
NewSpells.RemoveReflection.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
NewPrerequisites.RemoveReflection_requires_RemoveShadow = { target: 'RemoveReflection', prereq: 'RemoveShadow' };
NewSpells.WallOfLight = new Skill( "Wall of Light", 'IQ', 2, libAbrv+113 );
NewSpells.WallOfLight.classes = { area: true };
NewSpells.WallOfLight.stats = { castcost: '1-3', maintaincost: 'same', duration: '1 min' };
NewPrerequisites.WallOfLight_requires_ContinualLight = { target: 'WallOfLight', prereq: 'ContinualLight' };
// Shade under Protection and Warning spells
NewSpells.Blur = new Skill( "Blur", 'IQ', 2, libAbrv+113 );
NewSpells.Blur.classes = { reg: true };
NewSpells.Blur.stats = { castcost: '1-5', maintaincost: 'same', time: 2, duration: '1 min', notes: 'Each point of energy gives -1 to the effective skill of any attack on the subject' };
NewPrerequisites.Blur_requires_Darkness_pgroup1 = { target: 'Blur', prereq: 'Darkness', pgroup: 1 };
NewPrerequisites.Blur_requires_Gloom_pgroup1    = { target: 'Blur', prereq: 'Gloom',    pgroup: 1 };
NewSpells.ShapeDarkness = new Skill( "Shape Darkness", 'IQ', 2, libAbrv+113 );
NewSpells.ShapeDarkness.classes = { area: true };
NewSpells.ShapeDarkness.stats = { castcost: 2, maintaincost: 2, duration: '1 min', notes: 'halve cost to shape (2-D) shadows' };
NewPrerequisites.ShapeDarkness_requires_Darkness = { target: 'ShapeDarkness', prereq: 'Darkness' };
NewSpells.Hide = new Skill( "Hide", 'IQ', 2, libAbrv+113 );
NewSpells.Hide.classes = { reg: true };
NewSpells.Hide.stats = { castcost: '1-5', maintaincost: 'same', time: 2, duration: '1 hr', notes: 'Each point of energy gives -1 to sense rolls to find the subject' };
NewPrerequisites.Hide_requires_Blur_pgroup1          = { target: 'Hide', prereq: 'Blur',          pgroup: 1 };
NewPrerequisites.Hide_requires_Forgetfulness_pgroup1 = { target: 'Hide', prereq: 'Forgetfulness', pgroup: 1 };
NewSpells.SeeInvisible = new Skill( "See Invisible", 'IQ', 2, libAbrv+113 );
NewSpells.SeeInvisible.classes = { reg: true };
NewSpells.SeeInvisible.stats = { castcost: 4, time: 2 };
NewPrerequisites.SeeInvisible_requires_Invisibility_pgroup1 = { target: 'SeeInvisible', prereq: 'Invisibility', pgroup: 1 };
NewPrerequisites.SeeInvisible_requires_DarkVision_pgroup1   = { target: 'SeeInvisible', prereq: 'DarkVision',   pgroup: 1 };
NewPrerequisites.SeeInvisible_requires_Invisibility_pgroup2 = { target: 'SeeInvisible', prereq: 'Invisibility', pgroup: 2 };
NewPrerequisites.SeeInvisible_requires_Infravision_pgroup2  = { target: 'SeeInvisible', prereq: 'Infravision',  pgroup: 2 };
NewSpells.MageLight = new Skill( "Mage Light", 'IQ', 2, libAbrv+113 );
NewSpells.MageLight.classes = { reg: true };
NewSpells.MageLight.stats = { castcost: '1-3', duration: '1 min' };
NewPrerequisites.MageLight_requires_MageSight = { target: 'MageLight', prereq: 'MageSight' };
NewPrerequisites.MageLight_requires_Light = { target: 'MageLight', prereq: 'Light' };
NewSpells.ContinualMageLight = new Skill( "Continual Mage Light", 'IQ', 2, libAbrv+113 );
NewSpells.ContinualMageLight.classes = { reg: true };
NewSpells.ContinualMageLight.stats = { castcost: '2-6', duration: '2d days' };
NewPrerequisites.ContinualMageLight_requires_MageLight = { target: 'ContinualMageLight', prereq: 'MageLight' };
NewPrerequisites.ContinualMageLight_requires_ContinualLight = { target: 'ContinualMageLight', prereq: 'ContinualLight' };
NewSpells.Sunlight = new Skill( "Sunlight", 'IQ', 2, libAbrv+114 );
NewSpells.Sunlight.classes = { area: true };
NewSpells.Sunlight.stats = { castcost: 2, maintaincost: 1, duration: '1 min' };
NewPrerequisites.Sunlight_requires_Magery1 = { target: 'Sunlight', prereq: 'Magery', category: 'ADS', level: 1 };
NewPrerequisites.Sunlight_requires_Blur = { target: 'Sunlight', prereq: 'Blur' };
NewPrerequisites.Sunlight_requires_Glow = { target: 'Sunlight', prereq: 'Glow' };
NewSpells.ContinualSunlight = new Skill( "Continual Sunlight", 'IQ', 2, libAbrv+114 );
NewSpells.ContinualSunlight.classes = { area: true };
NewSpells.ContinualSunlight.stats = { castcost: 3, duration: '2d days' };
NewPrerequisites.ContinualSunlight_requires_Sunlight = { target: 'ContinualSunlight', prereq: 'Sunlight' };
NewSpells.Invisibility = new Skill( "Invisibility", 'IQ', 2, libAbrv+114 );
NewSpells.Invisibility.classes = { reg: true };
NewSpells.Invisibility.stats = { castcost: 5, maintaincost: 3, time: 3, duration: '1 min' };
NewPrerequisites.Invisibility_requires_6LD = { target: 'Invisibility', number: 6, prereq: 'LD' };
NewPrerequisites.Invisibility_requires_Blur = { target: 'Invisibility', prereq: 'Blur' };
NewSpells.BodyofShadow = new Skill( "Body of Shadow", 'IQ', 3, libAbrv+114 );
NewSpells.BodyofShadow.classes = { reg: true, rht: true };
NewSpells.BodyofShadow.stats = { castcost: 6, maintaincost: 3, time: 5, duration: '1 min' };
NewPrerequisites.BodyofShadow_requires_Magery2       = { target: 'BodyofShadow', prereq: 'Magery', category: 'ADS', level: 2 };
NewPrerequisites.BodyofShadow_requires_ShapeDarkness = { target: 'BodyofShadow', prereq: 'ShapeDarkness' };
NewPrerequisites.BodyofShadow_requires_3Movement     = { target: 'BodyofShadow', number: 3, prereq: 'Movement' };
NewSpells.Sunbolt = new Skill( "Sunbolt", 'IQ', 2, libAbrv+114 );
NewSpells.Sunbolt.classes = { msl: true };
NewSpells.Sunbolt.stats   = { castcost: '1/1d-1 imp damage', time: '1 to 3' };  // castcost: '&le; Magery/sec, &le; 3 secs'
NewPrerequisites.Sunbolt_requires_6LD = { target: 'Sunbolt', number: 6, prereq: 'LD' };
NewPrerequisites.Sunbolt_requires_Sunlight = { target: 'Sunbolt', prereq: 'Sunlight' };
// Images of the Past under Knowledge spells


addToGroup("MakingBreakingSpells",
['PathofMakingBreaking','InspiredCreation','AwakenCraftSpirit','FindWeakness','Weaken','Restore','Clean','Soilproof',
'Dye','Copy','Rejoin','Shatter','AnimateObject','Inscribe','Stiffen','Knot','Reshape','Rive',
'Ruin','Explode','Fasten','Mapmaker','Repair','Shatterproof','Sharpen','Toughen','Transparency',
'MysticMark','WeaponSelf','TransformObject','ContractObject','ExtendObject','ShrinkObject',
'EnlargeObject','Disintegrate','Rebuild']);
NewSpells.InspiredCreation = new Skill( "Inspired Creation", 'IQ', 3, libAbrv+115 );
NewSpells.InspiredCreation.classes = { reg: true };
NewSpells.InspiredCreation.stats = { castcost: '5 per day to create work', duration: 'permanent', time: 'same as time to create work' };
NewSpells.AwakenCraftSpirit = new Skill( "Awaken Craft Spirit", 'IQ', 2, libAbrv+115 );
NewSpells.AwakenCraftSpirit.classes = { reg: true };
NewSpells.AwakenCraftSpirit.stats = { castcost: 3, maintaincost: 1, duration: '1 min', time: 5 };
NewPrerequisites.AwakenCraftSpirit_requires_InspiredCreation = { target: 'AwakenCraftSpirit', prereq: 'InspiredCreation' };
NewPrerequisites.AwakenCraftSpirit_requires_SenseSpirit = { target: 'AwakenCraftSpirit', prereq: 'SenseSpirit' };
NewSpells.FindWeakness = new Skill( "Find Weakness", 'IQ', 2, libAbrv+116 );
NewSpells.FindWeakness.classes = { info: true };
NewSpells.FindWeakness.stats = { castcost: '1, or 1/yd radius for large object; x2 if the subject is alive.', time: 2 };
NewPrerequisites.FindWeakness_requires_1Earth = { target: 'FindWeakness', number: 1, prereq: 'Earth' };
NewPrerequisites.FindWeakness_requires_1Air   = { target: 'FindWeakness', number: 1, prereq: 'Air' };
NewPrerequisites.FindWeakness_requires_1Fire  = { target: 'FindWeakness', number: 1, prereq: 'Fire' };
NewPrerequisites.FindWeakness_requires_1Water = { target: 'FindWeakness', number: 1, prereq: 'Water' };
NewSpells.Weaken = new Skill( "Weaken", 'IQ', 2, libAbrv+116 );
NewSpells.Weaken.classes = { reg: true };
NewSpells.Weaken.stats = { castcost: '2-6', duration: "permanent", time: 5 };
NewPrerequisites.Weaken_requires_FindWeakness = { target: 'Weaken', prereq: 'FindWeakness' };
NewSpells.Restore = new Skill( "Restore", 'IQ', 2, libAbrv+116 );
NewSpells.Restore.classes = { reg: true };
NewSpells.Restore.stats = { castcost: 2, maintaincost: 1, duration: '10 min', time: 3 };
NewPrerequisites.Restore_requires_FindWeakness_pgroup1   = { target: 'Restore', prereq: 'FindWeakness',   pgroup: 1 };
NewPrerequisites.Restore_requires_SimpleIllusion_pgroup1 = { target: 'Restore', prereq: 'SimpleIllusion', pgroup: 1 };
NewSpells.Clean = new Skill( "Clean", 'IQ', 2, libAbrv+116 );
NewSpells.Clean.classes = { area: true };
NewSpells.Clean.stats = { castcost: 2, duration: 'permanent' };
NewPrerequisites.Clean_requires_Restore = { target: 'Clean', prereq: 'Restore' };
NewSpells.Soilproof = new Skill( "Soilproof", 'IQ', 2, libAbrv+116 );
NewSpells.Soilproof.classes = { reg: true };
NewSpells.Soilproof.stats = { castcost: 2, maintaincost: 1, time: 2, duration: '10 min' };
NewPrerequisites.Soilproof_requires_Clean = { target: 'Soilproof', prereq: 'Clean' };
NewSpells.Dye = new Skill( "Dye", 'IQ', 2, libAbrv+116 );
NewSpells.Dye.classes = { reg: true };
NewSpells.Dye.stats = { castcost: '1 to 5', duration: '2d days', time: 3 };
NewPrerequisites.Dye_requires_Restore = { target: 'Dye', prereq: 'Restore' };
NewPrerequisites.Dye_requires_Colors  = { target: 'Dye', prereq: 'Colors' };
NewSpells.Copy = new Skill( "Copy", 'IQ', 2, libAbrv+116 );
NewSpells.Copy.classes = { reg: true };
NewSpells.Copy.stats = { castcost: '1+1/copy', duration: 'permanent', time: 5, notes: "The document copied may be 10 times longer if the caster doubles the energy cost; thus, 4 energy would produce one copy of a ten-page document, while 8 energy would copy a 100-page book." };
NewPrerequisites.Copy_requires_Dye = { target: 'Copy', prereq: 'Dye' };
NewPrerequisites.Copy_requires_Literacy = { target: 'Copy', category: 'ADS', prereq: 'Language' };
NewSpells.Rejoin = new Skill( "Rejoin", 'IQ', 2, libAbrv+116 );
NewSpells.Rejoin.classes = { reg: true };
NewSpells.Rejoin.stats = { castcost: "1/10 lb, min 2", maintaincost: "½ C2C", duration: "10 min", time: "4/10 lb" };
NewPrerequisites.Rejoin_requires_Weaken  = { target: 'Rejoin', prereq: 'Weaken' };
NewPrerequisites.Rejoin_requires_Restore = { target: 'Rejoin', prereq: 'Restore' };
NewSpells.Shatter = new Skill( "Shatter", 'IQ', 3, libAbrv+116 );
NewSpells.Shatter.classes = { reg: true };
NewSpells.Shatter.stats = { castcost: '1/d damage, max 3' };
NewPrerequisites.Shatter_requires_Magery1 = { target: 'Shatter', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.Shatter_requires_Weaken = { target: 'Shatter', prereq: 'Weaken' };
NewSpells.AnimateObject = new Skill( "Animate Object", 'IQ', 3, libAbrv+117 );
NewSpells.AnimateObject.classes = { reg: true, rwi: true };
NewSpells.AnimateObject.stats = { castcost: '1 / 5lbs; x2 for stone, x3 for metal', duration: '1 min', maintaincost: "same", time: 3 };
NewPrerequisites.AnimateObject_requires_Magery2      = { target: 'AnimateObject', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.AnimateObject_requires_3ShapeSpells = { target: 'AnimateObject', number: 3, prereq: 'Shape' };
// Inscribe under Illusion and Creation spells
NewSpells.Stiffen = new Skill( "Stiffen", 'IQ', 2, libAbrv+117 );
NewSpells.Stiffen.classes = { reg: true, rst: true };
NewSpells.Stiffen.stats = { castcost: '1/lb, min 2', maintaincost: '½ C2C', duration: '10 min', time: '2/lb' };
NewPrerequisites.Stiffen_requires_Rejoin = { target: 'Stiffen', prereq: 'Rejoin' };
NewSpells.Knot = new Skill( "Knot", 'IQ', 2, libAbrv+117 );
NewSpells.Knot.classes = { reg: true };
NewSpells.Knot.stats = { castcost: 2, time: 3, duration: "Until the password is spoken, or the rope is cut or broken!" };
NewPrerequisites.Knot_requires_Stiffen = { target: 'Knot', prereq: 'Stiffen' };
NewSpells.Reshape = new Skill( "Reshape", 'IQ', 2, libAbrv+117 );
NewSpells.Reshape.classes = { reg: true };
NewSpells.Reshape.stats = { castcost: 6, maintaincost: 3, duration: '1 min', time: 10 };
NewPrerequisites.Reshape_requires_Magery1 = { target: 'Reshape', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.Reshape_requires_Weaken = { target: 'Reshape', prereq: 'Weaken' };
NewPrerequisites.Reshape_requires_ShapeEarth_pgroup1 = { target: 'Reshape', prereq: 'ShapeEarth', pgroup: 1 };
NewPrerequisites.Reshape_requires_ShapePlant_pgroup1 = { target: 'Reshape', prereq: 'ShapePlant', pgroup: 1 };
NewSpells.Rive = new Skill( "Rive", 'IQ', 3, libAbrv+116 );
NewSpells.Rive.classes = { reg: true };
NewSpells.Rive.stats = { castcost: '1/d damage' };
NewPrerequisites.Rive_requires_Magery2 = { target: 'Rive', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Rive_requires_Shatter = { target: 'Rive', prereq: 'Shatter' };
NewSpells.Ruin = new Skill( "Ruin", 'IQ', 2, libAbrv+118 );
NewSpells.Ruin.classes = { reg: true };
NewSpells.Ruin.stats = { castcost: '2/lb', maintaincost: 'same', time: '5/lb', duration: "1 min", notes: "Each 1-minute casting has the general effect of aging the subject 5 years. It will remove 1 DR and 1 HP from most subjects. Weapons simply lose one grade of quality per casting, except for Very Fine weapons, which are unaffected!" };
NewPrerequisites.Ruin_requires_Magery1 = { target: 'Ruin', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.Ruin_requires_Weaken = { target: 'Ruin', prereq: 'Weaken' };
NewPrerequisites.Ruin_requires_Decay = { target: 'Ruin', prereq: 'Decay' };
NewSpells.Explode = new Skill( "Rive", 'IQ', 3, libAbrv+118 );
NewSpells.Explode.classes = { reg: true };
NewSpells.Explode.stats = { castcost: '2/d damage, max 6', notes: "2× cost will increase damage to 1d+2" };
NewPrerequisites.Explode_requires_Magery2 = { target: 'Explode', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Explode_requires_Shatter = { target: 'Explode', prereq: 'Shatter' };
NewPrerequisites.Explode_requires_Apportation = { target: 'Explode', prereq: 'Apportation' };
NewSpells.Fasten = new Skill( "Knot", 'IQ', 2, libAbrv+118 );
NewSpells.Fasten.classes = { reg: true, rdx: true };
NewSpells.Fasten.stats = { castcost: 3, duration: "permanent", notes: "add 1 to cost for a Knot" };
NewPrerequisites.Fasten_requires_Knot = { target: 'Fasten', prereq: 'Knot' };
NewSpells.Mapmaker = new Skill( "Mapmaker", 'IQ', 2, libAbrv+118 );
NewSpells.Mapmaker.classes = { spcl: true };
NewSpells.Mapmaker.stats = { castcost: 4, maintaincost: 2, duration: '1 hr', time: 10 };
NewPrerequisites.Mapmaker_requires_Inscribe    = { target: 'Mapmaker', prereq: 'Inscribe' };
NewPrerequisites.Mapmaker_requires_Measurement = { target: 'Mapmaker', prereq: 'Measurement' };
NewSpells.Repair = new Skill( "Repair", 'IQ', 2, libAbrv+118 );
NewSpells.Repair.classes = { reg: true };
NewSpells.Repair.stats = { castcost: "2 / 5lb", duration: "permanent", time: "1/lb, min 10" };
NewPrerequisites.Repair_requires_Magery2 = { target: 'Repair', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Repair_requires_Rejoin  = { target: 'Repair', prereq: 'Rejoin' };
NewSpells.Shatterproof = new Skill( "Shatterproof", 'IQ', 2, libAbrv+118 );
NewSpells.Shatterproof.classes = { reg: true };
NewSpells.Shatterproof.stats = { castcost: 3, maintaincost: 3, duration: '1 hr' };
NewPrerequisites.Shatterproof_requires_Repair  = { target: 'Shatterproof', prereq: 'Repair' };
NewPrerequisites.Shatterproof_requires_Shatter = { target: 'Shatterproof', prereq: 'Shatter' };
NewSpells.Sharpen = new Skill( "Sharpen", 'IQ', 2, libAbrv+118 );
NewSpells.Sharpen.classes = { reg: true };
NewSpells.Sharpen.stats = { castcost: "1/6in of edge", maintaincost: "½ C2C", duration: '1 min', time: 4, notes: "1 to cast on an arrow; 2 for a knife, spear or axe; 3 for a one-handed sword; 5 for a two-handed sword. Double these for +2 bonus, or triple for +3." };
NewPrerequisites.Sharpen_requires_Repair = { target: 'Sharpen', prereq: 'Repair' };
NewSpells.Toughen = new Skill( "Repair", 'IQ', 2, libAbrv+119 );
NewSpells.Toughen.classes = { reg: true };
NewSpells.Toughen.stats = { castcost: "1 / point of DR, max 8 for fist-sized object; x2 for ft^3, x3 for SM 0", duration: "1 hr", time: 5 };
NewPrerequisites.Toughen_requires_Shatterproof  = { target: 'Toughen', prereq: 'Shatterproof' };
NewSpells.Transparency = new Skill( "Repair", 'IQ', 2, libAbrv+119 );
NewSpells.Transparency.classes = { reg: true };
NewSpells.Transparency.stats = { castcost: 4, maintaincost: 2, duration: "1 min", time: 10 };
NewPrerequisites.Transparency_requires_Dye  = { target: 'Transparency', prereq: 'Dye' };
NewPrerequisites.Transparency_requires_StonetoEarth  = { target: 'Transparency', prereq: 'StonetoEarth' };
NewSpells.MysticMark = new Skill( "Mystic Mark", 'IQ', 2, libAbrv+119 );
NewSpells.MysticMark.classes = { reg: true };
NewSpells.MysticMark.stats = { castcost: 3, duration: "see notes", time: 10, notes: "Mystic Mark is a lasting spell that fades with time. Every month, roll against the Mystic Mark’s Endurance (p. 10). On an ordinary failure, the Mark’s Endurance is reduced by the margin of failure. On a critical failure or when the Mark’s Endurance reaches 0, the spell expires. Marks placed on durable objects are themselves more durable; apply the DR of the surface as a bonus to the &ldquo;fading&rdquo; roll." };
NewPrerequisites.MysticMark_requires_Dye  = { target: 'MysticMark', prereq: 'Dye' };
NewPrerequisites.MysticMark_requires_StonetoEarth  = { target: 'MysticMark', prereq: 'StonetoEarth' };
NewSpells.WeaponSelf = new Skill( "Weapon Self", 'IQ', 3, libAbrv+119 );
NewSpells.WeaponSelf.classes = { reg: true };
NewSpells.WeaponSelf.stats = { castcost: 8, maintaincost: 4, duration: '1 min', time: 5, notes: "" };
NewPrerequisites.WeaponSelf_requires_Magery2         = { target: 'WeaponSelf', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.WeaponSelf_requires_Apportation     = { target: 'WeaponSelf', prereq: 'Apportation' };
NewPrerequisites.WeaponSelf_requires_6MakingBreaking = { target: 'WeaponSelf', prereq: 'MakingBreaking', number: 6 };
NewPrerequisites.WeaponSelf_requires_Reshape         = { target: 'WeaponSelf', prereq: 'Reshape' };
NewSpells.TransformObject = new Skill( "Transform Object", 'IQ', 3, libAbrv+120 );
NewSpells.TransformObject.classes = { reg: true, rwi: true };
NewSpells.TransformObject.stats = { castcost: '1/lb; x2 to/from stone, x3 to/from metal', maintaincost: 'same', duration: '1 hr', time: 'cost' };
NewPrerequisites.TransformObject_requires_Magery2 = { target: 'TransformObject', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.TransformObject_requires_Reshape = { target: 'TransformObject', prereq: 'Reshape' };
NewPrerequisites.TransformObject_requires_4Create = { target: 'TransformObject', prereq: 'Create', number: 4 };
NewSpells.ContractObject = new Skill( "Contract Object", 'IQ', 3, libAbrv+120 );
NewSpells.ContractObject.classes = { reg: true };
NewSpells.ContractObject.stats = { castcost: '1/lb/halving', maintaincost: 'same', duration: '1 hr', time: 3 };
NewPrerequisites.ContractObject_requires_Magery2 = { target: 'ContractObject', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.ContractObject_requires_TransformObject = { target: 'ContractObject', prereq: 'TransformObject' };
NewSpells.ExtendObject = new Skill( "Extend Object", 'IQ', 3, libAbrv+120 );
NewSpells.ExtendObject.classes = { reg: true };
NewSpells.ExtendObject.stats = { castcost: '1/lb/doubling', maintaincost: 'same', duration: '1 hr', time: 3 };
NewPrerequisites.ExtendObject_requires_Magery2 = { target: 'ExtendObject', category: 'ADS', prereq: 'Magery', level: 3 };
NewPrerequisites.ExtendObject_requires_TransformObject = { target: 'ExtendObject', prereq: 'TransformObject' };
NewSpells.ShrinkObject = new Skill( "Shrink Object", 'IQ', 3, libAbrv+120 );
NewSpells.ShrinkObject.classes = { reg: true };
NewSpells.ShrinkObject.stats = { castcost: '1/lb/SM-', maintaincost: 'same', duration: '1 hr', time: 3 };
NewPrerequisites.ShrinkObject_requires_ContractObject = { target: 'ShrinkObject', prereq: 'ContractObject' };
NewSpells.EnlargeObject = new Skill( "Shrink Object", 'IQ', 3, libAbrv+120 );
NewSpells.EnlargeObject.classes = { reg: true };
NewSpells.EnlargeObject.stats = { castcost: '1/lb/SM+', maintaincost: 'same', duration: '1 hr', time: 3 };
NewPrerequisites.EnlargeObject_requires_ExtendObject = { target: 'EnlargeObject', prereq: 'ExtendObject' };
NewSpells.Disintegrate = new Skill( "Disintegrate", 'IQ', 3, libAbrv+120 );
NewSpells.Disintegrate.classes = { reg: true };
NewSpells.Disintegrate.stats = { castcost: '1/d damage, max 4d', duration: 'permanent' };
NewPrerequisites.Disintegrate_requires_Magery2      = { target: 'Disintegrate', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Disintegrate_requires_Shatter      = { target: 'Disintegrate', prereq: 'Shatter' };
NewPrerequisites.Disintegrate_requires_Ruin         = { target: 'Disintegrate', prereq: 'Ruin' };
NewPrerequisites.Disintegrate_requires_EarthtoAir   = { target: 'Disintegrate', prereq: 'EarthtoAir' };
NewPrerequisites.Disintegrate_requires_DestroyAir   = { target: 'Disintegrate', prereq: 'DestroyAir' };
NewPrerequisites.Disintegrate_requires_DestroyWater = { target: 'Disintegrate', prereq: 'DestroyWater' };
// Rebuild under Technological spells


addToGroup("MetaSpells",
['Counterspell','Scryguard','SuspendSpell','Ward','SeekMagic','ConcealMagic','Reflect','Scrywall',
'GreatWard','FalseAura','MagicResistance','Scryfool','PenetratingSpell','CatchSpell','SuspendMagic',
'DisplaceSpell','SpellShield','SpellWall','Pentagram','SuspendCurse','SuspendMana','DispelMagic',
'LendSpell','RemoveCurse','ChargePowerstone','Spellguard','RemoveAura','DrainMana','RestoreMana',
'StealSpell','Telecast','HangSpell','MaintainSpell','ThrowSpell','Bless','Curse','SuspendMagery',
'DrainMagery','Delay','Link','Reflex']);
NewSpells.Counterspell = new Skill( "Counterspell", 'IQ', 2, libAbrv+121 );
NewSpells.Counterspell.classes = { reg: true, rsp: true };
NewSpells.Counterspell.stats = { castcost: '½ countered spell unmodified cost', time: 5 };
NewPrerequisites.Counterspell_requires_Magery1 = { target: 'Counterspell', category: 'ADS', prereq: 'Magery', level: 1 };
NewSpells.Scryguard = new Skill( "Scryguard", 'IQ', 2, libAbrv+121 );
NewSpells.Scryguard.classes = { reg: true };
NewSpells.Scryguard.stats = { castcost: 3, maintaincost: 1, duration: '10 hrs', time: 5 };
NewPrerequisites.Scryguard_requires_Magery1 = { target: 'Scryguard', category: 'ADS', prereq: 'Magery', level: 1 };
NewSpells.SuspendSpell = new Skill( "Suspend Spell", 'IQ', 2, libAbrv+121 );
NewSpells.SuspendSpell.classes = { reg: true, rsp: true };
NewSpells.SuspendSpell.stats = { duration: '1 min', castcost: '1/10 countered spell unmodified cost', maintaincost: 'same', time: 5 };
NewPrerequisites.SuspendSpell_requires_Magery1 = { target: 'SuspendSpell', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.SuspendSpell_requires_Counterspell = { target: 'SuspendSpell', prereq: 'Counterspell' };
NewSpells.Ward = new Skill( "Ward", 'IQ', 2, libAbrv+122 );
NewSpells.Ward.classes = { block: true, rsp: true };
NewSpells.Ward.stats = { castcost: '2 (3 for another)' };
NewPrerequisites.Ward_requires_Magery1 = { target: 'Ward', category: 'ADS', prereq: 'Magery', level: 1 };
// Seek Magic under Knowledge spells
NewSpells.ConcealMagic = new Skill( "Conceal Magic", 'IQ', 2, libAbrv+122 );
NewSpells.ConcealMagic.classes = { reg: true };
NewSpells.ConcealMagic.stats = { castcost: '1 to 5', maintaincost: 'same', duration: '10 hrs', time: 3 };
NewPrerequisites.ConcealMagic_requires_Magery1 = { target: 'ConcealMagic', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.ConcealMagic_requires_DetectMagic = { target: 'ConcealMagic', prereq: 'DetectMagic' };
NewSpells.Reflect = new Skill( "Reflect", 'IQ', 2, libAbrv+122 );
NewSpells.Reflect.classes = { block: true, rsp: true };
NewSpells.Reflect.stats = { castcost: '4 (6 for another)' };
NewPrerequisites.Reflect_requires_Ward = { target: 'Reflect', prereq: 'Ward' };
NewSpells.Scrywall = new Skill( "Scrywall", 'IQ', 2, libAbrv+122 );
NewSpells.Scrywall.classes = { area: true };
NewSpells.Scrywall.stats = { castcost: 3, maintaincost: 2, duration: '10 hrs', time: 'energy cost in seconds' };
NewPrerequisites.Scrywall_requires_Scryguard = { target: 'Scrywall', prereq: 'Scryguard' };
NewSpells.GreatWard = new Skill( "Great Ward", 'IQ', 2, libAbrv+122 );
NewSpells.GreatWard.classes = { block: true, rsp: true };
NewSpells.GreatWard.stats = { castcost: '1/subject (min 4)' };
NewPrerequisites.GreatWard_requires_Magery2 = { target: 'GreatWard', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.GreatWard_requires_Ward = { target: 'GreatWard', prereq: 'Ward' };
NewSpells.FalseAura = new Skill( "False Aura", 'IQ', 2, libAbrv+122 );
NewSpells.FalseAura.classes = { reg: true, area: true, riq: true };
NewSpells.FalseAura.stats = { castcost: 4, maintaincost: '½', duration: '10 hrs', time: 10 };
NewPrerequisites.FalseAura_requires_ConcealMagic = { target: 'FalseAura', prereq: 'ConcealMagic' };
NewPrerequisites.FalseAura_requires_Aura = { target: 'FalseAura', prereq: 'Aura' };
NewSpells.MagicResistance = new Skill( "Magic Resistance", 'IQ', 2, libAbrv+123 );
NewSpells.MagicResistance.classes = { reg: true, rwi: true };
NewSpells.MagicResistance.stats = { castcost: '1 to 5', maintaincost: 'same', duration: '1 min', time: 3 };
NewPrerequisites.MagicResistance_requires_Magery1 = { target: 'MagicResistance', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.MagicResistance_requires_7colleges = { target: 'MagicResistance', number: 7, prereq: 'MagicColleges', meta: true };
NewSpells.Scryfool = new Skill( "Scryfool", 'IQ', 2, libAbrv+123 );
NewSpells.Scryfool.classes = { reg: true, rwi: true };
NewSpells.Scryfool.stats = { castcost: 4, maintaincost: 2, duration: '10 hrs', time: 10 };
NewPrerequisites.Scryfool_requires_Magery2 = { target: 'Scryfool', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Scryfool_requires_SenseObservation = { target: 'Scryfool', prereq: 'SenseObservation' };
NewPrerequisites.Scryfool_requires_SimpleIllusion = { target: 'Scryfool', prereq: 'SimpleIllusion' };
NewSpells.PenetratingSpell = new Skill( "Penetrating Spell", 'IQ', 2, libAbrv+123 );
NewSpells.PenetratingSpell.classes = { reg: true };
NewSpells.PenetratingSpell.stats = { castcost: '2 to 10', duration: 'until linked spell expires', time: 3 };
NewPrerequisites.PenetratingSpell_requires_Delay = { target: 'PenetratingSpell', prereq: 'Delay' };
NewPrerequisites.PenetratingSpell_requires_FindWeakness = { target: 'PenetratingSpell', prereq: 'FindWeakness' };
NewSpells.CatchSpell = new Skill( "Catch Spell", 'IQ', 3, libAbrv+123 );
NewSpells.CatchSpell.classes = { block: true, spcl: true };
NewSpells.CatchSpell.stats = { castcost: 3 };
NewPrerequisites.CatchSpell_requires_Magery2 = { target: 'CatchSpell', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.CatchSpell_requires_DX12 = { target: 'CatchSpell', prereq: 'DX', category: 'stat', level: 12 };
NewPrerequisites.CatchSpell_requires_ReturnMissile = { target: 'CatchSpell', prereq: 'ReturnMissile' };
NewSpells.SuspendMagic = new Skill( "Suspend Magic", 'IQ', 2, libAbrv+123 );
NewSpells.SuspendMagic.classes = { area: true, rsp: true };
NewSpells.SuspendMagic.stats = { castcost: 3, maintaincost: 2, duration: '1 min', time: 'energy cost in seconds' };
NewPrerequisites.SuspendMagic_requires_SuspendSpell = { target: 'SuspendMagic', prereq: 'SuspendSpell' };
NewPrerequisites.SuspendMagic_requires_9spells = { target: 'SuspendMagic', number: 9, prereq: 'Spells' };
NewSpells.DisplaceSpell = new Skill( "Displace Spell", 'IQ', 2, libAbrv+124 );
NewSpells.DisplaceSpell.classes = { reg: true, rsp: true };
NewSpells.DisplaceSpell.stats = { castcost: '&frac14; moved spell unmodified cost', duration: 'until resisted or caster stops concentrating', time: 5 };
NewPrerequisites.DisplaceSpell_requires_SuspendMagic = { target: 'DisplaceSpell', prereq: 'SuspendMagic' };
NewSpells.SpellShield = new Skill( "Spell Shield", 'IQ', 2, libAbrv+124 );
NewSpells.SpellShield.classes = { area: true };
NewSpells.SpellShield.stats = { castcost: 3, maintaincost: 2, duration: '1 min' };
NewPrerequisites.SpellShield_requires_Magery2 = { target: 'SpellShield', level: 2, category: 'ADS', prereq: 'Magery' };
NewPrerequisites.SpellShield_requires_Scryguard = { target: 'SpellShield', prereq: 'Scryguard' };
NewPrerequisites.SpellShield_requires_MagicResistance = { target: 'SpellShield', prereq: 'MagicResistance' };
NewSpells.SpellWall = new Skill( "Spell Wall", 'IQ', 2, libAbrv+124 );
NewSpells.SpellWall.classes = { reg: true };
NewSpells.SpellWall.stats = { castcost: '2/yd width', maintaincost: 'same', duration: '1 min', notes: "Wall is 4 yds high (or wide, if cast parallel to floor).  Can be made twice (etc.) as tall for twice (etc.) the cost." };
NewPrerequisites.SpellWall_requires_SpellShield = { target: 'SpellWall', prereq: 'SpellShield' };
NewSpells.Pentagram = new Skill( "Pentagram", 'IQ', 2, libAbrv+124 );
NewSpells.Pentagram.classes = { spcl: true };
NewSpells.Pentagram.stats = { castcost: "1/ft&sup2; protected (min 10)", duration: 'permanent unless broken', time: "1 sec/ft&sup2;" };
NewPrerequisites.Pentagram_requires_SpellShield = { target: 'Pentagram', prereq: 'SpellShield' };
NewSpells.SuspendCurse = new Skill( "Suspend Curse", 'IQ', 2, libAbrv+125 );
NewSpells.SuspendCurse.classes = { reg: true, rsp: true };
NewSpells.SuspendCurse.stats = { castcost: 10, maintaincost: 10, duration: '10 min', time: '1 min' };
NewPrerequisites.SuspendCurse_requires_Magery1 = { target: 'SuspendCurse', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.SuspendCurse_requires_12colleges = { target: 'SuspendCurse', number: 12, prereq: 'MagicColleges', meta: true };
NewSpells.SuspendMana = new Skill( "Suspend Mana", 'IQ', 3, libAbrv+125 );
NewSpells.SuspendMana.classes = { area: true };
NewSpells.SuspendMana.stats = { castcost: 5, duration: 'see notes', time: '10 min', notes: "The mana is restored at a rate depending on the surrounding mana level. In a low-mana zone, the area affected by the spell shrinks by one yard in radius every three days; in normal mana, by one yard every hour; in high mana or very high mana, by one yard every minute! A critical failure costs the caster a level of Magery for 2d days. At the end of that time, the caster should roll vs. IQ+Magery; any roll except a critical failure means that the lost Magery is regained - a critical failure means the loss is permanent!" };
NewPrerequisites.SuspendMana_requires_SuspendMagic = { target: 'SuspendMana', prereq: 'SuspendMagic' };
NewPrerequisites.SuspendMana_requires_10colleges = { target: 'SuspendMana', number: 10, prereq: 'MagicColleges', meta: true };
NewSpells.DispelMagic = new Skill( "Dispel Magic", 'IQ', 2, libAbrv+126 );
NewSpells.DispelMagic.classes = { area: true, rsp: true };
NewSpells.DispelMagic.stats = { castcost: 3, time: '1/pt spent', duration: 'Dispelled magic is permanently gone.' };
NewPrerequisites.DispelMagic_requires_Counterspell = { target: 'DispelMagic', prereq: 'Counterspell' };
NewPrerequisites.DispelMagic_requires_12Spells = { target: 'DispelMagic', number: 12, prereq: 'Spells' };
NewSpells.LendSpell = new Skill( "Lend Spell", 'IQ', 2, libAbrv+126 );
NewSpells.LendSpell.classes = { reg: true };
NewSpells.LendSpell.stats = { castcost: "same as maintenance cost of lent spell", time: 3, duration: 'permanent' };
NewPrerequisites.LendSpell_requires_Magery1   = { target: 'LendSpell', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.LendSpell_requires_LendSkill = { target: 'LendSpell', prereq: 'LendSkill' };
NewPrerequisites.LendSpell_requires_6colleges = { target: 'LendSpell', number: 6, prereq: 'MagicColleges', meta: true };
NewSpells.RemoveCurse = new Skill( "Remove Curse", 'IQ', 2, libAbrv+126 );
NewSpells.RemoveCurse.classes = { area: true, rsp: true };
NewSpells.RemoveCurse.stats = { castcost: 20, time: '1 hr' };
NewPrerequisites.RemoveCurse_requires_Magery2    = { target: 'RemoveCurse', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.RemoveCurse_requires_15colleges = { target: 'RemoveCurse', number: 15, prereq: 'MagicColleges', meta: true };
NewSpells.ChargePowerstone = new Skill( "Charge Powerstone", 'IQ', 3, libAbrv+126 );
NewSpells.ChargePowerstone.classes = { reg: true };
NewSpells.ChargePowerstone.stats = { castcost: '3/pt recharged', time: '10 minutes' };
NewPrerequisites.ChargePowerstone_requires_Magery3    = { target: 'ChargePowerstone', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.ChargePowerstone_requires_Powerstone = { target: 'ChargePowerstone', prereq: 'Powerstone' };
NewPrerequisites.ChargePowerstone_requires_LendEnergy = { target: 'ChargePowerstone', prereq: 'LendEnergy' };
NewSpells.Spellguard = new Skill( "Spellguard", 'IQ', 3, libAbrv+127 );
NewSpells.Spellguard.classes = { reg: true };
NewSpells.Spellguard.stats = { castcost: '1 to 3', maintaincost: 'same', duration: '10 hrs', time: 'energy cost in seconds', notes: "energy cost not reduced by high skill" };
NewPrerequisites.Spellguard_requires_DispelMagic = { target: 'Spellguard', prereq: 'DispelMagic' };
NewSpells.RemoveAura = new Skill( "Remove Aura", 'IQ', 2, libAbrv+127 );
NewSpells.RemoveAura.classes = { reg: true, rwi: true };
NewSpells.RemoveAura.stats = { castcost: 5, time: 10 };
NewPrerequisites.RemoveAura_requires_DispelMagic = { target: 'RemoveAura', prereq: 'DispelMagic' };
NewPrerequisites.RemoveAura_requires_Aura = { target: 'RemoveAura', prereq: 'Aura' };
NewSpells.DrainMana = new Skill( "Drain Mana", 'IQ', 3, libAbrv+127 );
NewSpells.DrainMana.classes = { area: true };
NewSpells.DrainMana.stats = { castcost: 10, time: '1 hr', duration: 'permanent', notes: "Critical failure costs caster 1 level of Magery." };
NewPrerequisites.DrainMana_requires_DispelMagic = { target: 'DrainMana', prereq: 'DispelMagic' };
NewPrerequisites.DrainMana_requires_SuspendMana = { target: 'DrainMana', prereq: 'SuspendMana' };
NewSpells.RestoreMana = new Skill( "Restore Mana", 'IQ', 3, libAbrv+127 );
NewSpells.RestoreMana.classes = { area: true };
NewSpells.RestoreMana.stats = { castcost: 10, time: '1 hr', duration: 'permanent' };
NewPrerequisites.RestoreMana_requires_DispelMagic = { target: 'RestoreMana', prereq: 'DispelMagic' };
NewPrerequisites.RestoreMana_requires_SuspendMana = { target: 'RestoreMana', prereq: 'SuspendMana' };
NewSpells.StealSpell = new Skill( "Steal Spell", 'IQ', 3, libAbrv+127 );
NewSpells.StealSpell.classes = { reg: true, rsp: true };
NewSpells.StealSpell.stats = { castcost: "same as maintenance cost of stolen spell", time: 'energy cost in seconds', duration: 'permanent' };
NewPrerequisites.StealSpell_requires_LendSpell = { target: 'StealSpell', prereq: 'LendSpell' };
NewPrerequisites.StealSpell_requires_GreatWard = { target: 'StealSpell', prereq: 'GreatWard' };
NewSpells.Telecast = new Skill( "Telecast", 'IQ', 3, libAbrv+128 );
NewSpells.Telecast.classes = { spcl: true };
NewSpells.Telecast.stats = { castcost: 'as Teleport', maintaincost: 'same', time: '1 min', duration: 5, notes: "energy cost not reduced by high skill" };
NewPrerequisites.Telecast_requires_Magery3 = { target: 'Telecast', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.Telecast_requires_Teleport = { target: 'Telecast', prereq: 'Teleport' };
NewPrerequisites.Telecast_requires_WizardEye = { target: 'Telecast', prereq: 'WizardEye' };
NewPrerequisites.Telecast_requires_10colleges = { target: 'Telecast', number: 10, prereq: 'MagicColleges', meta: true };
NewSpells.HangSpell = new Skill( "Hang Spell", 'IQ', 3, libAbrv+128 );
NewSpells.HangSpell.classes = { spcl: true };
NewSpells.HangSpell.stats = { castcost: "same as maintenance cost of Hung spell", maintaincost: 'same', time: 10, duration: '1 hr' };
NewPrerequisites.HangSpell_requires_Delay = { target: 'HangSpell', prereq: 'Delay' };
NewSpells.MaintainSpell = new Skill( "Maintain Spell", 'IQ', 3, libAbrv+128 );
NewSpells.MaintainSpell.classes = { spcl: true };
NewSpells.MaintainSpell.stats = { castcost: "same as maintenance cost of subject spell for as long as caster wants it to last (min 1 for each 5 maintenance 'periods')", time: 2, duration: 'until energy pool is drained or subject spell lapses' };
NewPrerequisites.MaintainSpell_requires_Link = { target: 'MaintainSpell', prereq: 'Link' };
NewSpells.ThrowSpell = new Skill( "Throw Spell", 'IQ', 3, libAbrv+128 );
NewSpells.ThrowSpell.classes = { spcl: true, msl: true };
NewSpells.ThrowSpell.stats = { castcost: 3, duration: 'until thrown' };
NewPrerequisites.ThrowSpell_requires_Delay = { target: 'ThrowSpell', prereq: 'Delay' };
NewPrerequisites.ThrowSpell_requires_CatchSpell = { target: 'ThrowSpell', prereq: 'CatchSpell' };
NewSpells.Bless = new Skill( "Bless", 'IQ', 2, libAbrv+129 );
NewSpells.Bless.classes = { reg: true };
NewSpells.Bless.stats = { castcost: "10, 50, or 500 for 1- to 3-point Blessing", time: 'energy cost in minutes', duration: 'lasting' };
NewPrerequisites.Bless_requires_Magery2 = { target: 'Bless', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Bless_requires_2spellsfrom10colleges = { target: 'Bless', number: 10, prereq: 'MagicColleges', meta: true, mult: 2 };
NewSpells.Curse = new Skill( "Curse", 'IQ', 2, libAbrv+129 );
NewSpells.Curse.classes = { reg: true };
NewSpells.Curse.stats = { castcost: "3, 10, or 20 for 1- to 3-point Curse", time: '2× Curse level in seconds', duration: 'lasting' };
NewPrerequisites.Curse_requires_Magery2 = { target: 'Curse', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Curse_requires_2spellsfrom10colleges = { target: 'Curse', number: 10, prereq: 'MagicColleges', meta: true, mult: 2 };
NewSpells.SuspendMagery = new Skill( "Suspend Magery", 'IQ', 3, libAbrv+130 );
NewSpells.SuspendMagery.classes = { reg: true, rwi: true };
NewSpells.SuspendMagery.stats = { castcost: 12, maintaincost: 'same', duration: '1 hr', time: 10 };
NewPrerequisites.SuspendMagery_requires_Magery2 = { target: 'SuspendMagery', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.SuspendMagery_requires_2spellsfrom10colleges = { target: 'SuspendMagery', number: 10, prereq: 'MagicColleges', meta: true, mult: 2 };
NewSpells.DrainMagery = new Skill( "Drain Magery", 'IQ', 3, libAbrv+130 );
NewSpells.DrainMagery.classes = { reg: true, rwi: true };
NewSpells.DrainMagery.stats = { castcost: 30, duration: 'permanent', time: '10 min', notes: "Critical failure costs caster 1 level of Magery and 1 point of IQ." };
NewPrerequisites.DrainMagery_requires_Magery3 = { target: 'DrainMagery', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.DrainMagery_requires_SuspendMagery = { target: 'DrainMagery', prereq: 'SuspendMagery' };
NewSpells.Delay = new Skill( "Delay", 'IQ', 2, libAbrv+130 );
NewSpells.Delay.classes = { reg: true };
NewSpells.Delay.stats = { castcost: 3, maintaincost: 3, duration: '2 hrs', time: 10 };
NewPrerequisites.Delay_requires_Magery3 = { target: 'Delay', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.Delay_requires_15Spells = { target: 'Delay', prereq: 'Spells', number: 15 };
NewSpells.Link = new Skill( "Link", 'IQ', 2, libAbrv+131 );
NewSpells.Link.classes = { area: true };
NewSpells.Link.stats = { castcost: 8, duration: 'until triggered, and its linked spells expire', time: '4 hrs' };
NewPrerequisites.Link_requires_Delay = { target: 'Link', prereq: 'Delay' };
NewSpells.Reflex = new Skill( "Reflex", 'IQ', 2, libAbrv+132 );
NewSpells.Reflex.classes = { spcl: true };
NewSpells.Reflex.stats = { castcost: 'same as cost of subject spell (min 1)', maintaincost: 'same', duration: '1 hr', time: 10 };
NewPrerequisites.Reflex_requires_Delay = { target: 'Reflex', prereq: 'Delay' };
NewPrerequisites.Reflex_requires_Ward = { target: 'Reflex', prereq: 'Ward' };


addToGroup("MindControlSpells",
['KeenHearing','KeenVision','KeenSense','DullSense','Alertness','Dullness','Fear','Panic','Terror','Bravery','RearVision',
'Berserker','Foolishness','Daze','MentalStun','Disorient','Encrypt','Fascinate','Forgetfulness',
'Sleep','Wisdom','Boost','WeakenWill','StrengthenWill','Memorize','Loyalty','Command','Drunkenness',
'Madness','EmotionControl','MassDaze','Mindlessness','CompelLie','Lure','MassSleep','PeacefulSleep',
'Sickness','WillLock','Oath','PermanentForgetfulness','Recall','Vigil','RelieveMadness','Charm',
'Ecstasy','Enthrall','PermanentMadness','DreamSending','DreamProjection','FalseMemory','Avoid',
'Nightmare','Hallucination','LesserGeas','Suggestion','MassSuggestion','GlibTongue','Enslave',
'GreatHallucination','GreatGeas']);
addToGroup("KeenSenseSpells",['KeenHearing','KeenVision','KeenSense']);
NewSpells.KeenHearing = new Skill( "Keen Hearing", 'IQ', 2, libAbrv+133 );
NewSpells.KeenHearing.classes = { reg: true };
NewSpells.KeenHearing.stats = { duration: '30 min', castcost: '1/+1; max 5', maintaincost: '½ C2C' };
NewSpells.KeenVision = new Skill( "Keen Vision", 'IQ', 2, libAbrv+133 );
NewSpells.KeenVision.classes = { reg: true };
NewSpells.KeenVision.stats = { duration: '30 min', castcost: '1/+1; max 5', maintaincost: '½ C2C' };
NewSpells.KeenSense = new Skill( "Keen Sense", 'IQ', 2, libAbrv+133 );
NewSpells.KeenSense.specRequiredList = [];
NewSpells.KeenSense.classes = { reg: true };
NewSpells.KeenSense.stats = { duration: '30 min', castcost: '1/+1; max 5', maintaincost: '½ C2C' };
NewSpells.DullSense = new Skill( "Dull Sense", 'IQ', 2, libAbrv+133 );
NewSpells.DullSense.specRequiredList = [];
NewSpells.DullSense.classes = { reg: true, rht: true };
NewSpells.DullSense.stats = { duration: '30 min', castcost: '1/-2; max 6', maintaincost: '½ C2C' };
NewSpells.Alertness = new Skill( "Alertness", 'IQ', 3, libAbrv+133 );
NewSpells.Alertness.classes = { reg: true };
NewSpells.Alertness.stats = { duration: '10 min', castcost: '2/+1; max 5', maintaincost: '½ C2C' };
NewPrerequisites.Alertness_requires_2KeenSenseSpells = { target: 'Alertness', prereq: 'KeenSenseSpells', number: 2 };
NewSpells.Dullness = new Skill( "Dullness", 'IQ', 3, libAbrv+134 );
NewSpells.Dullness.classes = { reg: true, rht: true };
NewSpells.Dullness.stats = { duration: '10 min', castcost: '2/-1; max 10', maintaincost: '½ C2C' };
NewPrerequisites.Dullness_requires_2DullSense = { target: 'Dullness', prereq: 'DullSense', number: 2 };
NewSpells.Fear = new Skill( "Fear", 'IQ', 2, libAbrv+134 );
NewSpells.Fear.classes = { area: true, rwi: true };
NewSpells.Fear.stats = { castcost: 1, duration: '10 min' };
NewPrerequisites.Fear_requires_SenseEmotion_pgroup1 = { target: 'Fear', prereq: 'SenseEmotion', pgroup: 1 };
NewPrerequisites.Fear_requires_Empathy_pgroup1 = { target: 'Fear', category: 'ADS', prereq: 'Empathy', pgroup: 1 };
NewSpells.Panic = new Skill( "Panic", 'IQ', 2, libAbrv+134 );
NewSpells.Panic.classes = { area: true, rwi: true };
NewSpells.Panic.stats = { castcost: 4, maintaincost: 2, duration: '1 min' };
NewPrerequisites.Panic_requires_Fear = { target: 'Panic', prereq: 'Fear' };
NewSpells.Terror = new Skill( "Terror", 'IQ', 2, libAbrv+134 );
NewSpells.Terror.classes = { area: true, rwi: true };
NewSpells.Terror.stats = { castcost: 4 };
NewPrerequisites.Terror_requires_Fear = { target: 'Terror', prereq: 'Fear' };
NewSpells.Bravery = new Skill( "Bravery", 'IQ', 2, libAbrv+134 );
NewSpells.Bravery.classes = { area: true, rwi: true };
NewSpells.Bravery.stats = { castcost: 2, duration: '1 hr', notes: 'Resisted by Will-1' };
NewPrerequisites.Bravery_requires_Fear = { target: 'Bravery', prereq: 'Fear' };
NewSpells.RearVision = new Skill( "Rear Vision", 'IQ', 2, libAbrv+134 );
NewSpells.RearVision.classes = { reg: true };
NewSpells.RearVision.stats = { castcost: 3, maintaincost: 1, duration: '1 min' };
NewPrerequisites.RearVision_requires_Alertness = { target: 'RearVision', prereq: 'Alertness' };
NewSpells.Berserker = new Skill( "Berserker", 'IQ', 2, libAbrv+134 );
NewSpells.Berserker.classes = { reg: true, rwi: true };
NewSpells.Berserker.stats = { castcost: 3, maintaincost: 2, time: 4, duration: '10 min' };
NewPrerequisites.Berserker_requires_Bravery = { target: 'Berserker', prereq: 'Bravery' };
NewSpells.Foolishness = new Skill( "Foolishness", 'IQ', 2, libAbrv+134 );
NewSpells.Foolishness.classes = { reg: true, rwi: true };
NewSpells.Foolishness.stats = { castcost: '1/IQ-1; max 5', maintaincost: '½ C2C', duration: '1 min' };
NewPrerequisites.Foolishness_requires_IQ = { target: 'Foolishness', category: 'stat', level: 12, prereq: 'IQ' };
NewSpells.Daze = new Skill( "Daze", 'IQ', 2, libAbrv+134 );
NewSpells.Daze.classes = { reg: true, rht: true };
NewSpells.Daze.stats = { duration: '1 min', castcost: 3, maintaincost: 2, time: 2 };
NewPrerequisites.Daze_requires_Foolishness = { target: 'Daze', prereq: 'Foolishness' };
NewSpells.MentalStun = new Skill( "Mental Stun", 'IQ', 2, libAbrv+135 );
NewSpells.MentalStun.classes = { reg: true, rwi: true };
NewSpells.MentalStun.stats = { castcost: 2 };
NewPrerequisites.MentalStun_requires_Daze_pgroup1 = { target: 'MentalStun', prereq: 'Daze', pgroup: 1 };
NewPrerequisites.MentalStun_requires_Stun_pgroup1 = { target: 'MentalStun', prereq: 'Stun', pgroup: 1 };
NewSpells.Disorient = new Skill( "Disorient", 'IQ', 2, libAbrv+135 );
NewSpells.Disorient.classes = { area: true, rwi: true };
NewSpells.Disorient.stats = { castcost: 1, time: 10 };
NewPrerequisites.Disorient_requires_Foolishness = { target: 'Disorient', prereq: 'Foolishness' };
NewSpells.Encrypt = new Skill( "Encrypt", 'IQ', 2, libAbrv+135 );
NewSpells.Encrypt.classes = { reg: true };
NewSpells.Encrypt.stats = { castcost: 'see Magic 4th ed.135', duration: '1 wk' };
NewPrerequisites.Encrypt_requires_Daze = { target: 'Encrypt', prereq: 'Daze' };
NewSpells.Fascinate = new Skill( "Fascinate", 'IQ', 2, libAbrv+135 );
NewSpells.Fascinate.classes = { reg: true, block: true, rwi: true };
NewSpells.Fascinate.stats = { castcost: 4, duration: 'indefinite' };
NewPrerequisites.Fascinate_requires_Daze = { target: 'Fascinate', prereq: 'Daze' };
NewSpells.Forgetfulness = new Skill( "Forgetfulness", 'IQ', 2, libAbrv+135 );
NewSpells.Forgetfulness.classes = { reg: true, rwi: true };
NewSpells.Forgetfulness.stats = { castcost: 3, maintaincost: 3, duration: '1 hr', time: 10, notes: 'Resisted by Will-1' };
NewPrerequisites.Forgetfulness_requires_Magery1 = { target: 'Forgetfulness', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.Forgetfulness_requires_Foolishness = { target: 'Forgetfulness', prereq: 'Foolishness' };
NewSpells.Sleep = new Skill( "Sleep", 'IQ', 2, libAbrv+135 );
NewSpells.Sleep.classes = { reg: true, rht: true };
NewSpells.Sleep.stats = { castcost: 4, time: 3 };
NewPrerequisites.Sleep_requires_Daze = { target: 'Sleep', prereq: 'Daze' };
NewSpells.Wisdom = new Skill( "Wisdom", 'IQ', 2, libAbrv+135 );
NewSpells.Wisdom.classes = { reg: true };
NewSpells.Wisdom.stats = { duration: '1 min', castcost: '4/IQ+1; max +5', maintaincost: 'same' };
NewPrerequisites.Wisdom_requires_6MC = { target: 'Wisdom', number: 6, prereq: 'MindControlSpells' };
// Boost under Body Control spells
NewSpells.WeakenWill = new Skill( "Weaken Will", 'IQ', 2, libAbrv+136 );
NewSpells.WeakenWill.classes = { reg: true, rwi: true };
NewSpells.WeakenWill.stats = { duration: '1 min', castcost: '2/Will-1; max -5', maintaincost: '½ C2C' };
NewPrerequisites.WeakenWill_requires_Magery1 = { target: 'WeakenWill', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.WeakenWill_requires_Foolishness = { target: 'WeakenWill', prereq: 'Foolishness' };
NewSpells.StrengthenWill = new Skill( "Strengthen Will", 'IQ', 2, libAbrv+136 );
NewSpells.StrengthenWill.classes = { reg: true };
NewSpells.StrengthenWill.stats = { duration: '1 min', castcost: '1/Will+1; max +5', maintaincost: '½ C2C' };
NewPrerequisites.StrengthenWill_requires_Magery1 = { target: 'StrengthenWill', category: 'ADS', prereq: 'Magery', level: 1 };
NewPrerequisites.StrengthenWill_requires_6MC = { target: 'StrengthenWill', number: 6, prereq: 'MindControlSpells' };
// Memorize under Knowledge spells
NewSpells.Loyalty = new Skill( "Loyalty", 'IQ', 2, libAbrv+136 );
NewSpells.Loyalty.classes = { reg: true, rwi: true };
NewSpells.Loyalty.stats = { duration: '1 hr', castcost: 2, maintaincost: 2, time: 2, notes: 'x2 cost if target does not know caster, x3 if foe' };
NewPrerequisites.Loyalty_requires_Bravery = { target: 'Loyalty', prereq: 'Bravery' };
NewPrerequisites.Loyalty_requires_3MC = { target: 'Loyalty', number: 3, prereq: 'MindControlSpells' };
NewSpells.Command = new Skill( "Command", 'IQ', 2, libAbrv+136 );
NewSpells.Command.classes = { block: true, rwi: true };
NewSpells.Command.stats = { castcost: 2 };
NewPrerequisites.Command_requires_Magery2 = { target: 'Command', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Command_requires_Forgetfulness = { target: 'Command', prereq: 'Forgetfulness' };
NewSpells.Drunkenness = new Skill( "Drunkenness", 'IQ', 2, libAbrv+136 );
NewSpells.Drunkenness.classes = { reg: true, rwi: true };
NewSpells.Drunkenness.stats = { duration: '1 min', castcost: '1/stats-1; max -5', maintaincost: '½ C2C', time: 2 };
NewPrerequisites.Drunkenness_requires_Foolishness = { target: 'Drunkenness', prereq: 'Foolishness' };
NewPrerequisites.Drunkenness_requires_Clumsiness  = { target: 'Drunkenness', prereq: 'Clumsiness' };
NewSpells.Madness = new Skill( "Madness", 'IQ', 2, libAbrv+136 );
NewSpells.Madness.classes = { reg: true, rwi: true };
NewSpells.Madness.stats = { castcost: '2-6', maintaincost: '½ C2C', duration: '1 min', time: 2, notes: 'Resisted by Will-2; see Magic 4th ed.136 for effects' };
NewPrerequisites.Madness_requires_Forgetfulness_pgroup1 = { target: 'Madness', prereq: 'Forgetfulness', pgroup: 1 };
NewPrerequisites.Madness_requires_Drunkenness_pgroup1   = { target: 'Madness', prereq: 'Drunkenness',   pgroup: 1 };
NewSpells.EmotionControl = new Skill( "Emotion Control", 'IQ', 2, libAbrv+137 );
NewSpells.EmotionControl.classes = { area: true, rwi: true };
NewSpells.EmotionControl.stats = { duration: '1 hr', castcost: 2 };
NewPrerequisites.EmotionControl_requires_Loyalty_pgroup1    = { target: 'EmotionControl', prereq: 'Loyalty', pgroup: 1 };
NewPrerequisites.EmotionControl_requires_MentalStun_pgroup1 = { target: 'EmotionControl', prereq: 'MentalStun', pgroup: 1 };
NewSpells.MassDaze = new Skill( "Mass Daze", 'IQ', 2, libAbrv+137 );
NewSpells.MassDaze.classes = { reg: true, rht: true };
NewSpells.MassDaze.stats = { duration: '1 min', castcost: 2, maintaincost: 1, time: '1/energy spent', notes: 'min radius 2 yds' };
NewPrerequisites.MassDaze_requires_Daze = { target: 'MassDaze', prereq: 'Daze' };
NewPrerequisites.MassDaze_requires_IQ13 = { target: 'MassDaze', category: 'stat', prereq: 'IQ', level: 13 };
NewSpells.Mindlessness = new Skill( "Mindlessness", 'IQ', 3, libAbrv+137 );
NewSpells.Mindlessness.classes = { reg: true, rwi: true };
NewSpells.Mindlessness.stats = { castcost: 8, maintaincost: 4, duration: '1 min', time: 5 };
NewPrerequisites.Mindlessness_requires_Magery2 = { target: 'Mindlessness', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.Mindlessness_requires_Forgetfulness = { target: 'Mindlessness', prereq: 'Forgetfulness' };
NewSpells.CompelLie = new Skill( "Compel Lie", 'IQ', 2, libAbrv+137 );
NewSpells.CompelLie.classes = { reg: true, rwi: true };
NewSpells.CompelLie.stats = { duration: '5 min', castcost: 4, maintaincost: 2 };
NewPrerequisites.CompelLie_requires_EmotionControl = { target: 'CompelLie', prereq: 'EmotionControl' };
NewSpells.Lure = new Skill( "Lure", 'IQ', 2, libAbrv+137 );
NewSpells.Lure.classes = { area: true, rwi: true };
NewSpells.Lure.stats = { duration: '1 hr', castcost: 1, maintaincost: 'same', time: 10 };
NewPrerequisites.Lure_requires_EmotionControl = { target: 'Lure', prereq: 'EmotionControl' };
NewSpells.MassSleep = new Skill( "Mass Sleep", 'IQ', 2, libAbrv+137 );
NewSpells.MassSleep.classes = { area: true, rht: true };
NewSpells.MassSleep.stats = { castcost: 3, time: '1/energy spent', notes: 'min radius 2 yds' };
NewPrerequisites.MassSleep_requires_Sleep = { target: 'MassSleep', prereq: 'Sleep' };
NewPrerequisites.MassSleep_requires_IQ13  = { target: 'MassSleep', prereq: 'IQ', level: 13, category: 'stat' };
NewSpells.PeacefulSleep = new Skill( "Peaceful Sleep", 'IQ', 2, libAbrv+138 );
NewSpells.PeacefulSleep.classes = { reg: true };
NewSpells.PeacefulSleep.stats = { duration: '8 hrs', castcost: 4, time: 30, notes: 'requires willing subject' };
NewPrerequisites.PeacefulSleep_requires_Sleep   = { target: 'PeacefulSleep', prereq: 'Sleep' };
NewPrerequisites.PeacefulSleep_requires_Silence = { target: 'PeacefulSleep', prereq: 'Silence' };
NewSpells.Sickness = new Skill( "Sickness", 'IQ', 2, libAbrv+138 );
NewSpells.Sickness.classes = { reg: true, rht: true };
NewSpells.Sickness.stats   = { duration: '1 min', castcost: 3, maintaincost: 3, time: 4 };
NewPrerequisites.Sickness_requires_Drunkenness_pgroup1 = { target: 'Sickness', prereq: 'Drunkenness', pgroup: 1 };
NewPrerequisites.Sickness_requires_Pestilence_pgroup1  = { target: 'Sickness', prereq: 'Pestilence',  pgroup: 1 };
NewSpells.WillLock = new Skill( "Will Lock", 'IQ', 2, libAbrv+138 );
NewSpells.WillLock.classes = { area: true, rst: true, rwi: true };
NewSpells.WillLock.stats = { duration: '1 day', castcost: 3, time: 'time required to circle area 3 times (widdershins)' };
NewPrerequisites.WillLock_requires_EmotionControl = { target: 'WillLock', prereq: 'EmotionControl' };
NewSpells.Oath = new Skill( "Oath", 'IQ', 2, libAbrv+138 );
NewSpells.Oath.classes = { reg: true };
NewSpells.Oath.stats = { duration: 'permanent', castcost: 4, time: '1 min', notes: 'requires willing subject' };
NewPrerequisites.Oath_requires_Magery1 = { target: 'Oath', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Oath_requires_EmotionControl = { target: 'Oath', prereq: 'EmotionControl' };
NewSpells.PermanentForgetfulness = new Skill( "Permanent Forgetfulness", 'IQ', 3, libAbrv+138 );
NewSpells.PermanentForgetfulness.classes = { reg: true, rwi: true };
NewSpells.PermanentForgetfulness.stats = { duration: 'permanent', castcost: 15, time: '1 hr' };
NewPrerequisites.PermanentForgetfulness_requires_Magery2       = { target: 'PermanentForgetfulness', prereq: 'Magery', level: 2,  category: 'ADS' };
NewPrerequisites.PermanentForgetfulness_requires_IQ13          = { target: 'PermanentForgetfulness', prereq: 'IQ',     level: 13, category: 'stat' };
NewPrerequisites.PermanentForgetfulness_requires_Forgetfulness = { target: 'PermanentForgetfulness', prereq: 'Forgetfulness' };
// Recall under Knowledge spells
NewSpells.Vigil = new Skill( "Vigil", 'IQ', 3, libAbrv+138 );
NewSpells.Vigil.classes = { reg: true };
NewSpells.Vigil.stats = { duration: '1 night', castcost: 8, notes: "Each successive night's casting on the same subject is at a cumulative -3 to skill." };
NewPrerequisites.Vigil_requires_Magery2    = { target: 'Vigil', prereq: 'Magery', level: 2,  category: 'ADS' };
NewPrerequisites.Vigil_requires_Sleep      = { target: 'Vigil', prereq: 'Sleep' };
NewPrerequisites.Vigil_requires_LendEnergy = { target: 'Vigil', prereq: 'LendEnergy' };
// RelieveMadness under Healing spells
NewSpells.Charm = new Skill( "Charm", 'IQ', 2, libAbrv+139 );
NewSpells.Charm.classes = { reg: true, rwi: true };
NewSpells.Charm.stats   = { duration: '1 min', castcost: 6, maintaincost: 3, time: 3 };
NewPrerequisites.Charm_requires_Magery1 = { target: 'Charm', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Charm_requires_Loyalty = { target: 'Charm', prereq: 'Loyalty' };
NewPrerequisites.Charm_requires_8MC     = { target: 'Charm', prereq: 'MindControlSpells', number: 8 };
NewSpells.Ecstasy = new Skill( "Ecstasy", 'IQ', 3, libAbrv+139 );
NewSpells.Ecstasy.classes = { reg: true, rwi: true };
NewSpells.Ecstasy.stats   = { duration: '10 sec', castcost: 6, time: 3 };
NewPrerequisites.Ecstasy_requires_Magery2        = { target: 'Ecstasy', prereq: 'Magery', level: 2,  category: 'ADS' };
NewPrerequisites.Ecstasy_requires_EmotionControl = { target: 'Ecstasy', prereq: 'EmotionControl' };
NewSpells.Enthrall = new Skill( "Enthrall", 'IQ', 2, libAbrv+139 );
NewSpells.Enthrall.classes = { spcl: true, rwi: true };
NewSpells.Enthrall.stats = { duration: '1 hr', castcost: 3, maintaincost: 3 };
NewPrerequisites.Enthrall_requires_Forgetfulness = { target: 'Enthrall', prereq: 'Forgetfulness' };
NewPrerequisites.Enthrall_requires_Daze = { target: 'Enthrall', prereq: 'Daze' };
NewPrerequisites.Enthrall_requires_Slow = { target: 'Enthrall', prereq: 'Slow' };
NewSpells.PermanentMadness = new Skill( "Permanent Madness", 'IQ', 3, libAbrv+139 );
NewSpells.PermanentMadness.classes = { reg: true, rwi: true };
NewSpells.PermanentMadness.stats = { duration: 'permanent', castcost: 20, time: '10 min', notes: 'Resisted by Will-2' };
NewPrerequisites.PermanentMadness_requires_Magery2 = { target: 'PermanentMadness', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.PermanentMadness_requires_Madness = { target: 'PermanentMadness', prereq: 'Madness' };
NewPrerequisites.PermanentMadness_requires_IQ13    = { target: 'PermanentMadness', prereq: 'IQ',    level: 13, category: 'stat' };
// DreamSending under Communication and Empathy spells
// DreamProjection under Communication and Empathy spells
NewSpells.FalseMemory = new Skill( "False Memory", 'IQ', 2, libAbrv+139 );
NewSpells.FalseMemory.classes = { reg: true, rwi: true };
NewSpells.FalseMemory.stats = { duration: 'variable', castcost: '3/hr, 8/day', maintaincost: '3/hr, 4/day', time: 5, notes: 'Resisted by Will-2' };
NewPrerequisites.FalseMemory_requires_Forgetfulness = { target: 'FalseMemory', prereq: 'Forgetfulness' };
NewPrerequisites.FalseMemory_requires_7MC = { target: 'FalseMemory', number: 7, prereq: 'MindControlSpells' };
NewSpells.Avoid = new Skill( "Avoid", 'IQ', 2, libAbrv+140 );
NewSpells.Avoid.classes = { area: true };
NewSpells.Avoid.stats = { duration: '1 hr', castcost: 3, maintaincost: 3, time: "1 min" };
NewPrerequisites.Avoid_requires_Hide = { target: 'Avoid', prereq: 'Hide' };
NewPrerequisites.Avoid_requires_Fear = { target: 'Avoid', prereq: 'Fear' };
NewPrerequisites.Avoid_requires_Forgetfulness = { target: 'Avoid', prereq: 'Forgetfulness' };
NewSpells.Nightmare = new Skill( "Nightmare", 'IQ', 2, libAbrv+140 );
NewSpells.Nightmare.classes = { reg: true, rwi: true };
NewSpells.Nightmare.stats = { duration: '1 hr', castcost: 6, time: "1 min" };
NewPrerequisites.Nightmare_requires_Magery2     = { target: 'Nightmare', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Nightmare_requires_DeathVision = { target: 'Nightmare', prereq: 'DeathVision' };
NewPrerequisites.Nightmare_requires_Fear        = { target: 'Nightmare', prereq: 'Fear' };
NewPrerequisites.Nightmare_requires_Sleep       = { target: 'Nightmare', prereq: 'Sleep' };
NewSpells.Hallucination = new Skill( "Hallucination", 'IQ', 2, libAbrv+140 );
NewSpells.Hallucination.classes = { reg: true, rwi: true };
NewSpells.Hallucination.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 2 };
NewPrerequisites.Hallucination_requires_Madness = { target: 'Hallucination', prereq: 'Madness' };
NewPrerequisites.Hallucination_requires_Suggestion = { target: 'Hallucination', prereq: 'Suggestion' };
NewSpells.LesserGeas = new Skill( "Lesser Geas", 'IQ', 3, libAbrv+140 );
NewSpells.LesserGeas.classes = { reg: true, rwi: true };
NewSpells.LesserGeas.stats = { duration: 'until fulfilled', castcost: 12, time: 30 };
NewPrerequisites.LesserGeas_requires_Magery2 = { target: 'LesserGeas', category: 'ADS', prereq: 'Magery', level: 2 };
NewPrerequisites.LesserGeas_requires_10MC    = { target: 'LesserGeas',      number: 10, prereq: 'MindControlSpells' };
NewSpells.Suggestion = new Skill( "Suggestion", 'IQ', 2, libAbrv+140 );
NewSpells.Suggestion.classes = { reg: true, rwi: true };
NewSpells.Suggestion.stats = { duration: '10 min', castcost: 4, maintaincost: 3, time: 10 };
NewPrerequisites.Suggestion_requires_EmotionControl = { target: 'Suggestion', prereq: 'EmotionControl' };
NewPrerequisites.Suggestion_requires_Forgetfulness  = { target: 'Suggestion', prereq: 'Forgetfulness' };
NewSpells.MassSuggestion = new Skill( "Mass Suggestion", 'IQ', 2, libAbrv+141 );
NewSpells.MassSuggestion.classes = { area: true, rwi: true };
NewSpells.MassSuggestion.stats = { duration: '10 min', castcost: 4, maintaincost: 2, time: '1/energy spent' };
NewPrerequisites.MassSuggestion_requires_Suggestion = { target: 'MassSuggestion', prereq: 'Suggestion' };
NewSpells.GlibTongue = new Skill( "GlibTongue", 'IQ', 2, libAbrv+141 );
NewSpells.GlibTongue.classes = { reg: true, rwi: true };
NewSpells.GlibTongue.stats = { duration: '5 min', castcost: 2, maintaincost: 1 };
NewPrerequisites.GlibTongue_requires_Suggestion = { target: 'GlibTongue', prereq: 'Suggestion' };
NewSpells.Enslave = new Skill( "Enslave", 'IQ', 3, libAbrv+141 );
NewSpells.Enslave.classes = { reg: true, rwi: true };
NewSpells.Enslave.stats   = { duration: 'permanent', castcost: 30 };
NewPrerequisites.Enslave_requires_Charm = { target: 'Enslave', prereq: 'Charm' };
NewPrerequisites.Enslave_requires_TelepathySpell = { target: 'Enslave', prereq: 'TelepathySpell' };
NewSpells.GreatHallucination = new Skill( "Great Hallucination", 'IQ', 2, libAbrv+140 );
NewSpells.GreatHallucination.classes = { reg: true, rwi: true };
NewSpells.GreatHallucination.stats = { duration: '1 min', castcost: 6, maintaincost: 3, time: 4 };
NewPrerequisites.GreatHallucination_requires_Magery2       = { target: 'GreatHallucination', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.GreatHallucination_requires_Hallucination = { target: 'GreatHallucination', prereq: 'Hallucination' };
NewSpells.GreatGeas = new Skill( "Great Geas", 'IQ', 3, libAbrv+141 );
NewSpells.GreatGeas.classes = { reg: true, rwi: true };
NewSpells.GreatGeas.stats = { duration: 'permanent', castcost: 30, time: "1 min" };
NewPrerequisites.GreatGeas_requires_Magery3    = { target: 'GreatGeas', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.GreatGeas_requires_15MC       = { target: 'GreatGeas', prereq: 'MindControlSpells', number: 15 };
NewPrerequisites.GreatGeas_requires_LesserGeas = { target: 'GreatGeas', prereq: 'LesserGeas' };


addToGroup("MovementSpells",
['Haste','Apportation','Glue','Grease','Hinder','DeflectMissile','HoldFast','IncreaseBurden','Jump',
'Levitation','LightenBurden','Locksmith','LongMarch','Poltergeist','QuickMarch','SlowFall',
'Wallwalker','DancingObject','DistantBlow','Lockmaster','Manipulate','Slow','Undo','WingedKnife',
'Flight','LightTread','Slide','FlyingCarpet','HawkFlight','WizardHand','EtherealBody','GreatHaste',
'Pull','Repel','Swim','Teleport','TeleportOther','Blink','BlinkOther','Beacon','TraceTeleport',
'RapidJourney','DivertTeleport','AirVortex','Freedom','CloudWalking','CloudVaulting']);
NewSpells.Haste = new Skill( "Haste", 'IQ', 2, libAbrv+142 );
NewSpells.Haste.classes = { reg: true };
NewSpells.Haste.stats = { duration: '1 min', castcost: "2/Move+1", maintaincost: '½ C2C', time: 2 };
NewSpells.Apportation = new Skill( "Apportation", 'IQ', 2, libAbrv+142 );
NewSpells.Apportation.classes = { reg: true, rwi: true };
NewSpells.Apportation.stats = { duration: '1 min', castcost: "see Magic 4th ed.142" };
NewPrerequisites.Apportation_requires_Magery1 = { target: 'Apportation', prereq: 'Magery', level: 1, category: 'ADS' };
NewSpells.Glue = new Skill( "Glue", 'IQ', 2, libAbrv+142 );
NewSpells.Glue.classes = { area: true };
NewSpells.Glue.stats = { duration: '10 min', castcost: 3, maintaincost: "same" };
NewPrerequisites.Glue_requires_Haste = { target: 'Glue', prereq: 'Haste' };
NewSpells.Grease = new Skill( "Grease", 'IQ', 2, libAbrv+142 );
NewSpells.Grease.classes = { area: true };
NewSpells.Grease.stats = { duration: '10 min', castcost: 3, maintaincost: "same" };
NewPrerequisites.Grease_requires_Haste = { target: 'Grease', prereq: 'Haste' };
// Hinder under Body Control spells
NewSpells.DeflectMissile = new Skill( "Deflect Missile", 'IQ', 2, libAbrv+143 );
NewSpells.DeflectMissile.classes = { block: true };
NewSpells.DeflectMissile.stats = { castcost: 1 };
NewPrerequisites.DeflectMissile_requires_Apportation = { target: 'DeflectMissile', prereq: 'Apportation' };
NewSpells.HoldFast = new Skill( "Hold Fast", 'IQ', 2, libAbrv+143 );
NewSpells.HoldFast.classes = { block: true };
NewSpells.HoldFast.stats = { castcost: "1/yd knockback negated" };
NewPrerequisites.HoldFast_requires_Apportation = { target: 'HoldFast', prereq: 'Apportation' };
NewSpells.IncreaseBurden = new Skill( "Increase Burden", 'IQ', 2, libAbrv+143 );
NewSpells.IncreaseBurden.classes = { reg: true, rwi: true };
NewSpells.IncreaseBurden.stats = { duration: '10 min', castcost: "1/25lbs to double, x2 to triple, x4 to quadruple weight", maintaincost: '½ C2C', time: 3 };
NewPrerequisites.IncreaseBurden_requires_Apportation = { target: 'IncreaseBurden', prereq: 'Apportation' };
NewSpells.Jump = new Skill( "Jump", 'IQ', 2, libAbrv+143 );
NewSpells.Jump.classes = { reg: true };
NewSpells.Jump.stats = { duration: "1 min", castcost: "1-3", notes: "The increase in the subject's Basic Move (for purposes of jumping ONLY) is equal to twice the energy put into the spell." };
NewPrerequisites.Jump_requires_Apportation = { target: 'Jump', prereq: 'Apportation' };
NewSpells.Levitation = new Skill( "Levitation", 'IQ', 2, libAbrv+143 );
NewSpells.Levitation.classes = { reg: true, rst: true, rwi: true };
NewSpells.Levitation.stats = { duration: "1 min", castcost: "1/80lbs; min 2", maintaincost: '½ C2C', time: 2 };
NewPrerequisites.Levitation_requires_Apportation = { target: 'Levitation', prereq: 'Apportation' };
NewSpells.LightenBurden = new Skill( "Lighten Burden", 'IQ', 2, libAbrv+143 );
NewSpells.LightenBurden.classes = { reg: true };
NewSpells.LightenBurden.stats = { duration: "10 min", castcost: "3: -25%, 5: -50% wt", maintaincost: '½ C2C', time: 3 };
NewPrerequisites.LightenBurden_requires_Apportation = { target: 'LightenBurden', prereq: 'Apportation' };
NewSpells.Locksmith = new Skill( "Locksmith", 'IQ', 2, libAbrv+143 );
NewSpells.Locksmith.classes = { reg: true };
NewSpells.Locksmith.stats = { duration: "1 min", castcost: 2, maintaincost: 2 };
NewPrerequisites.Locksmith_requires_Apportation = { target: 'Locksmith', prereq: 'Apportation' };
NewSpells.LongMarch = new Skill( "Long March", 'IQ', 2, libAbrv+143 );
NewSpells.LongMarch.classes = { reg: true, rst: true };
NewSpells.LongMarch.stats = { duration: "1 day", castcost: 3, time: "1 min" };
NewPrerequisites.LongMarch_requires_Magery1 = { target: 'LongMarch', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.LongMarch_requires_Clumsiness_pgroup1 = { target: 'LongMarch', prereq: 'Clumsiness', pgroup: 1 };
NewPrerequisites.LongMarch_requires_Debility_pgroup1   = { target: 'LongMarch', prereq: 'Debility',   pgroup: 1 };
NewSpells.Poltergeist = new Skill( "Poltergeist", 'IQ', 2, libAbrv+144 );
NewSpells.Poltergeist.classes = { msl: true, rht: true };
NewSpells.Poltergeist.stats = { castcost: "1: 10lbs (1d), 2: 25lbs (1d+1)" };
NewPrerequisites.Poltergeist_requires_Apportation = { target: 'Poltergeist', prereq: 'Apportation' };
NewSpells.QuickMarch = new Skill( "Quick March", 'IQ', 2, libAbrv+144 );
NewSpells.QuickMarch.classes = { reg: true };
NewSpells.QuickMarch.stats = { duration: "1 day's march", castcost: 4, time: "1 min", notes: "At the end of the day's travel, the subject loses 10 FP and must sleep." };
NewPrerequisites.QuickMarch_requires_Magery1 = { target: 'QuickMarch', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.QuickMarch_requires_Haste   = { target: 'QuickMarch', prereq: 'Haste' };
NewSpells.SlowFall = new Skill( "Slow Fall", 'IQ', 2, libAbrv+144 );
NewSpells.SlowFall.classes = { reg: true };
NewSpells.SlowFall.stats = { duration: "1 min", castcost: "1/50 lbs", maintaincost: '½ C2C' };
NewPrerequisites.SlowFall_requires_Apportation = { target: 'SlowFall', prereq: 'Apportation' };
NewSpells.Wallwalker = new Skill( "Wallwalker", 'IQ', 2, libAbrv+144 );
NewSpells.Wallwalker.classes = { reg: true };
NewSpells.Wallwalker.stats = { duration: "1 min", castcost: "1/50 lbs; min 2", maintaincost: '½ C2C' };
NewPrerequisites.Wallwalker_requires_Apportation = { target: 'Wallwalker', prereq: 'Apportation' };
NewSpells.DancingObject = new Skill( "Dancing Object", 'IQ', 2, libAbrv+144 );
NewSpells.DancingObject.classes = { reg: true };
NewSpells.DancingObject.stats = { duration: "1 hr", castcost: 4, maintaincost: 2, time: 10 };
NewPrerequisites.DancingObject_requires_Magery2     = { target: 'DancingObject', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.DancingObject_requires_Apportation = { target: 'DancingObject', prereq: 'Apportation' };
NewSpells.DistantBlow = new Skill( "Distant Blow", 'IQ', 2, libAbrv+144 );
NewSpells.DistantBlow.classes = { reg: true };
NewSpells.DistantBlow.stats = { duration: "5 sec", castcost: 3, maintaincost: 3, time: 3 };
NewPrerequisites.DistantBlow_requires_Magery2     = { target: 'DistantBlow', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.DistantBlow_requires_Apportation = { target: 'DistantBlow', prereq: 'Apportation' };
NewSpells.Lockmaster = new Skill( "Lockmaster", 'IQ', 2, libAbrv+144 );
NewSpells.Lockmaster.classes = { reg: true };
NewSpells.Lockmaster.stats = { castcost: 3, time: 10, notes: "resisted by Magelock" };
NewPrerequisites.Lockmaster_requires_Locksmith_pgroup1   = { target: 'Lockmaster', prereq: 'Locksmith',   pgroup: 1 };
NewPrerequisites.Lockmaster_requires_Magery2_pgroup1     = { target: 'Lockmaster', prereq: 'Magery',      pgroup: 1, level: 2, category: 'ADS' };
NewPrerequisites.Lockmaster_requires_Locksmith_pgroup2   = { target: 'Lockmaster', prereq: 'Locksmith',   pgroup: 2 };
NewPrerequisites.Lockmaster_requires_Apportation_pgroup2 = { target: 'Lockmaster', prereq: 'Apportation', pgroup: 2 };
NewSpells.Manipulate = new Skill( "Manipulate", 'IQ', 2, libAbrv+145 );
NewSpells.Manipulate.classes = { reg: true };
NewSpells.Manipulate.stats = { duration: "1 min", castcost: "4/10lbs", maintaincost: "3/10lbs", time: 3 };
NewPrerequisites.Manipulate_requires_Locksmith = { target: 'Manipulate', prereq: 'Locksmith' };
NewSpells.Slow = new Skill( "Slow", 'IQ', 2, libAbrv+145 );
NewSpells.Slow.classes = { reg: true, rht: true };
NewSpells.Slow.stats = { duration: "10 sec", castcost: 5, maintaincost: 4, time: 3 };
NewPrerequisites.Slow_requires_Magery1    = { target: 'Slow', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Slow_requires_Clumsiness = { target: 'Slow', prereq: 'Haste' };
NewPrerequisites.Slow_requires_Debility   = { target: 'Slow', prereq: 'Hinder' };
NewSpells.Undo = new Skill( "Undo", 'IQ', 2, libAbrv+145 );
NewSpells.Undo.classes = { reg: true, rwi: true };
NewSpells.Undo.stats = { castcost: "2+1/fastening; 6 to Undo everything in a hex" };
NewPrerequisites.Undo_requires_Locksmith = { target: 'Undo', prereq: 'Locksmith' };
NewSpells.WingedKnife = new Skill( "Winged Knife", 'IQ', 2, libAbrv+145 );
NewSpells.WingedKnife.classes = { msl: true };
NewSpells.WingedKnife.stats = { castcost: "1/lb", notes: "x2 for non-throwing weapon" };
NewPrerequisites.WingedKnife_requires_Poltergeist = { target: 'WingedKnife', prereq: 'Poltergeist' };
NewSpells.Flight = new Skill( "Flight", 'IQ', 3, libAbrv+145 );
NewSpells.Flight.classes = { reg: true };
NewSpells.Flight.stats = { duration: "1 min", castcost: 5, maintaincost: 3, time: 2 };
NewPrerequisites.Flight_requires_Magery2    = { target: 'Flight', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Flight_requires_Levitation = { target: 'Flight', prereq: 'Levitation' };
NewSpells.LightTread = new Skill( "Light Tread", 'IQ', 2, libAbrv+145 );
NewSpells.LightTread.classes = { reg: true };
NewSpells.LightTread.stats = { duration: "10 min", castcost: 4, maintaincost: 1, notes: "If the caster also knows Hide Path, an extra point of energy to cast and maintain will ensure that even vegetation won't bear any trace of the subject's passage." };
NewPrerequisites.LightTread_requires_Apportation = { target: 'LightTread', prereq: 'Apportation' };
NewPrerequisites.LightTread_requires_ShapeEarth  = { target: 'LightTread', prereq: 'ShapeEarth' };
NewSpells.Slide = new Skill( "Slide", 'IQ', 2, libAbrv+145 );
NewSpells.Slide.classes = { reg: true, rwi: true };
NewSpells.Slide.stats = { duration: "1 min", castcost: 2, maintaincost: "same" };
NewPrerequisites.Slide_requires_Apportation = { target: 'Slide', prereq: 'Apportation' };
NewPrerequisites.Slide_requires_Grease = { target: 'Slide', prereq: 'Grease' };
NewSpells.FlyingCarpet = new Skill( "Flying Carpet", 'IQ', 3, libAbrv+146 );
NewSpells.FlyingCarpet.classes = { reg: true };
NewSpells.FlyingCarpet.stats = { duration: "10 min", castcost: "1/ft&sup2;", maintaincost: '½ C2C', time: 5, notes: "each ft&sup2; will carry ~25lbs" };
NewPrerequisites.FlyingCarpet_requires_Magery2_pgroup1   = { target: 'FlyingCarpet', prereq: 'Magery',    pgroup: 1, level: 2, category: 'ADS' };
NewPrerequisites.FlyingCarpet_requires_Flight_pgroup1    = { target: 'FlyingCarpet', prereq: 'Flight',    pgroup: 1 };
NewPrerequisites.FlyingCarpet_requires_WalkonAirSpell_pgroup2 = { target: 'FlyingCarpet', prereq: 'WalkonAirSpell', pgroup: 2 };
NewPrerequisites.FlyingCarpet_requires_Flight_pgroup2    = { target: 'FlyingCarpet', prereq: 'Flight',    pgroup: 2 };
NewSpells.HawkFlight = new Skill( "Hawk Flight", 'IQ', 3, libAbrv+146 );
NewSpells.HawkFlight.classes = { reg: true };
NewSpells.HawkFlight.stats = { duration: "1 min", castcost: 8, maintaincost: 4, time: 3 };
NewPrerequisites.HawkFlight_requires_Flight = { target: 'HawkFlight', prereq: 'Flight' };
// WizardHand under Knowledge spells
NewSpells.EtherealBody = new Skill( "Ethereal Body", 'IQ', 3, libAbrv+146 );
NewSpells.EtherealBody.classes = { reg: true };
NewSpells.EtherealBody.stats = { duration: "10 sec", castcost: 8, maintaincost: 4, time: 30 };
NewPrerequisites.EtherealBody_requires_Magery3_pgroup1   = { target: 'EtherealBody', prereq: 'Magery',    level: 3, pgroup: 1, category: 'ADS' };
NewPrerequisites.EtherealBody_requires_6Movement_pgroup1 = { target: 'EtherealBody', prereq: 'Movement', number: 6, pgroup: 1 };
NewPrerequisites.EtherealBody_requires_BodyofAir_pgroup2 = { target: 'EtherealBody', prereq: 'BodyofAir',           pgroup: 2 };
NewPrerequisites.EtherealBody_requires_6Movement_pgroup2 = { target: 'EtherealBody', prereq: 'Movement', number: 6, pgroup: 2 };
NewSpells.GreatHaste = new Skill( "Great Haste", 'IQ', 3, libAbrv+146 );
NewSpells.GreatHaste.classes = { reg: true };
NewSpells.GreatHaste.stats = { duration: "10 sec", castcost: 5, time: 3, notes: "at spell's end, the subject also loses 5 FP (unless the caster was the subject)" };
NewPrerequisites.GreatHaste_requires_Magery1 = { target: 'GreatHaste', prereq: 'Magery', level: 1,  category: 'ADS' };
NewPrerequisites.GreatHaste_requires_IQ12    = { target: 'GreatHaste', prereq: 'IQ',     level: 12, category: 'stat' };
NewPrerequisites.GreatHaste_requires_Haste   = { target: 'GreatHaste', prereq: 'Haste' };
NewSpells.Pull = new Skill( "Pull", 'IQ', 2, libAbrv+146 );
NewSpells.Pull.classes = { reg: true };
NewSpells.Pull.stats = { duration: "1 min", castcost: "1/2ST of pull", time: 5 };
NewPrerequisites.Pull_requires_Magery2    = { target: 'Pull', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Pull_requires_4Movement  = { target: 'Pull', prereq: 'MovementSpells', number: 4 };
NewPrerequisites.Pull_requires_Levitation = { target: 'Pull', prereq: 'Levitation' };
NewSpells.Repel = new Skill( "Repel", 'IQ', 2, libAbrv+147 );
NewSpells.Repel.classes = { reg: true };
NewSpells.Repel.stats = { duration: "1 min", castcost: "1/2ST of push", time: 5 };
NewPrerequisites.Repel_requires_Magery2    = { target: 'Repel', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Repel_requires_4Movement  = { target: 'Repel', prereq: 'MovementSpells', number: 4 };
NewPrerequisites.Repel_requires_Levitation = { target: 'Repel', prereq: 'Levitation' };
NewSpells.Swim = new Skill( "Swim", 'IQ', 2, libAbrv+147 );
NewSpells.Swim.classes = { reg: true };
NewSpells.Swim.stats = { duration: "1 min", castcost: 6, maintaincost: 3, time: 3 };
NewPrerequisites.Swim_requires_ShapeWater = { target: 'Swim', prereq: 'ShapeWater' };
NewPrerequisites.Swim_requires_Levitation = { target: 'Swim', prereq: 'Levitation' };
NewSpells.Teleport = new Skill( "Teleport", 'IQ', 3, libAbrv+147 );
NewSpells.Teleport.classes = { spcl: true };
NewSpells.Teleport.stats = { castcost: "3+", notes: "see Magic 4th ed.147 for costs, distances, and skill penalties" };
NewPrerequisites.Teleport_requires_HawkFlight_pgroup1 = { target: 'Teleport', prereq: 'HawkFlight',                       pgroup: 1 };
NewPrerequisites.Teleport_requires_IQ13_pgroup1       = { target: 'Teleport', prereq: 'IQ', level: 13, category: 'stat',  pgroup: 1 };
NewPrerequisites.Teleport_requires_HawkFlight_pgroup2 = { target: 'Teleport', prereq: 'HawkFlight',                       pgroup: 2 };
NewPrerequisites.Teleport_requires_10colleges_pgroup2 = { target: 'Teleport', prereq: 'MagicColleges', number: 10, meta: true, pgroup: 2 };
NewSpells.TeleportOther = new Skill( "Teleport Other", 'IQ', 3, libAbrv+147 );
NewSpells.TeleportOther.classes = { reg: true, rwi: true };
NewSpells.TeleportOther.stats = { castcost: "as Teleport, with weight mods", notes: "resisted by Will+1; see Magic 4th ed.147 for costs, distances, weight multipliers, and skill penalties" };
NewPrerequisites.TeleportOther_requires_Magery3  = { target: 'TeleportOther', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.TeleportOther_requires_Teleport = { target: 'TeleportOther', prereq: 'Teleport' };
NewSpells.Blink = new Skill( "Blink", 'IQ', 2, libAbrv+148 );
NewSpells.Blink.classes = { block: true };
NewSpells.Blink.stats = { castcost: 2 };
NewPrerequisites.Blink_requires_Teleport = { target: 'Blink', prereq: 'Teleport' };
NewSpells.BlinkOther = new Skill( "Blink Other", 'IQ', 3, libAbrv+148 );
NewSpells.BlinkOther.classes = { block: true };
NewSpells.BlinkOther.stats = { castcost: 2 };
NewPrerequisites.BlinkOther_requires_Blink = { target: 'BlinkOther', prereq: 'Blink' };
// Beacon under Gate spells
// TraceTeleport under Gate spells
// RapidJourney under Gate spells
// DivertTeleport under Gate spells
// AirVortex under Air spells
NewSpells.Freedom = new Skill( "Freedom", 'IQ', 2, libAbrv+148 );
NewSpells.Freedom.classes = { reg: true };
NewSpells.Freedom.stats = { duration: "1 min", castcost: '2/+1; max +5', maintaincost: "same" };
NewPrerequisites.Freedom_requires_3BC       = { target: 'Freedom', prereq: 'BodyControlSpells',       number: 3 };
NewPrerequisites.Freedom_requires_3Movement = { target: 'Freedom', prereq: 'MovementSpells',          number: 3 };
NewPrerequisites.Freedom_requires_3PW       = { target: 'Freedom', prereq: 'ProtectionWarningSpells', number: 3 };
NewSpells.CloudWalking = new Skill( "Cloud-Walking", 'IQ', 2, libAbrv+148 );
NewSpells.CloudWalking.classes = { reg: true };
NewSpells.CloudWalking.stats = { duration: "1 hr", castcost: 3, maintaincost: 2 };
NewPrerequisites.CloudWalking_requires_WalkonAirSpell   = { target: 'CloudWalking', prereq: 'WalkonAirSpell' };
NewPrerequisites.CloudWalking_requires_WalkonWater = { target: 'CloudWalking', prereq: 'WalkonWater' };
NewSpells.CloudVaulting = new Skill( "Cloud-Vaulting", 'IQ', 3, libAbrv+148 );
NewSpells.CloudVaulting.classes = { reg: true };
NewSpells.CloudVaulting.stats = { duration: "100 mi/sec", castcost: 7 };
NewPrerequisites.CloudVaulting_requires_Magery2   = { target: 'CloudVaulting', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.CloudVaulting_requires_Jump      = { target: 'CloudVaulting', prereq: 'Jump' };
NewPrerequisites.CloudVaulting_requires_WalkonAirSpell = { target: 'CloudVaulting', prereq: 'WalkonAirSpell' };


addToGroup("NecromanticSpells",
['DeathVision','FinalRest','SenseSpirit','SummonSpirit','Animation','AwakenCraftSpirit',
'StealEnergy','StealVitality','Materialize','Solidify','AffectSpirits','WeakenBlood','SkullSpirit',
'TurnSpirit','Zombie','ControlZombie','TurnZombie','ZombieSummoning','MassZombie','AstralVision',
'SlowHealing','StopHealing','CommandSpirit','StrikeBarren','Age','Pestilence','Evisceration',
'AnimateShadow','RottingDeath','SoulJar','SummonDemon','Banish','BurningDeath','Resurrection',
'EntrapSpirit','RepelSpirits','BindSpirit','StealAttribute','StealSkill','StealYouth','StealBeauty',
'AstralBlock','Lich','Wraith']);
NewSpells.DeathVision = new Skill( "Death Vision", 'IQ', 2, libAbrv+149 );
NewSpells.DeathVision.classes = { reg: true };
NewSpells.DeathVision.stats = { castcost: 2, time: 3 };
NewPrerequisites.DeathVision_requires_Magery1 = { target: 'DeathVision', prereq: 'Magery', level: 1, category: 'ADS' };
// FinalRest under Healing spells
NewSpells.SenseSpirit = new Skill( "Sense Spirit", 'IQ', 2, libAbrv+149 );
NewSpells.SenseSpirit.classes = { info: true, area: true };
NewSpells.SenseSpirit.stats = { castcost: 0.5 };
NewPrerequisites.SenseSpirit_requires_DeathVision_pgroup1 = { target: 'SenseSpirit', prereq: 'DeathVision',      pgroup: 1 };
NewPrerequisites.SenseSpirit_requires_SenseLife_pgroup1   = { target: 'SenseSpirit', prereq: 'SenseLife',        pgroup: 1 };
NewPrerequisites.SenseSpirit_requires_DeathVision_pgroup2 = { target: 'SenseSpirit', prereq: 'DeathVision',      pgroup: 2 };
NewPrerequisites.SenseSpirit_requires_Magery1_pgroup2     = { target: 'SenseSpirit', prereq: 'Magery', level: 1, pgroup: 2, category: 'ADS' };
NewSpells.SummonSpirit = new Skill( "Summon Spirit", 'IQ', 2, libAbrv+150 );
NewSpells.SummonSpirit.classes = { info: true, rwi: true };
NewSpells.SummonSpirit.stats = { duration: "1 min", castcost: 20, maintaincost: 10, time: "5 min", notes: "Halve these costs if the spell is cast at the site of death or over the corpse of the person being contacted; quarter these costs if both conditions are met." };
NewPrerequisites.SummonSpirit_requires_Magery2 = { target: 'SummonSpirit', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.SummonSpirit_requires_DeathVision = { target: 'SummonSpirit', prereq: 'DeathVision' };
NewSpells.Animation = new Skill( "Animation", 'IQ', 3, libAbrv+150 );
NewSpells.Animation.classes = { reg: true };
NewSpells.Animation.stats = { castcost: 3, maintaincost: '½ C2C', time: 5, notes: "Multiply cost by SM+1 for objects larger than human size. Double cost to animate stone; triple to animate metal." };
NewPrerequisites.Animation_requires_SummonSpirit = { target: 'Animation', prereq: 'SummonSpirit' };
// AwakenCraftSpirit under Making and Breaking spells
NewSpells.StealEnergy = new Skill( "Steal Strength", 'IQ', 2, libAbrv+150 );
NewSpells.StealEnergy.classes = { reg: true };
NewSpells.StealEnergy.stats = { castcost: 0, time: "1 min / 3 FP drained", notes: "For every 3 FP taken from the subject, the caster regains 1 FP. The subject must either be willing or totally helpless (e.g., bound or unconscious). The caster must touch the subject." };
NewPrerequisites.StealEnergy_requires_MinorHealing = { target: 'StealEnergy', prereq: 'MinorHealing' };
NewSpells.StealVitality = new Skill( "Steal Vitality", 'IQ', 2, libAbrv+150 );
NewSpells.StealVitality.classes = { reg: true };
NewSpells.StealVitality.stats = { castcost: 0, time: "1 min / 3 HP drained", notes: "For every 3 HP taken from the subject, the caster regains 1 HP. The subject must either be willing or totally helpless (e.g., bound or unconscious). The caster must touch the subject." };
NewPrerequisites.StealVitality_requires_StealEnergy = { target: 'StealVitality', prereq: 'StealEnergy' };
NewSpells.Materialize = new Skill( "Materialize", 'IQ', 2, libAbrv+150 );
NewSpells.Materialize.classes = { reg: true, rst: true, riq: true };
NewSpells.Materialize.stats = { duration: "1 min", castcost: 5, maintaincost: 5 };
NewPrerequisites.Materialize_requires_SummonSpirit = { target: 'Materialize', prereq: 'SummonSpirit' };
NewSpells.Solidify = new Skill( "Solidify", 'IQ', 2, libAbrv+151 );
NewSpells.Solidify.classes = { reg: true, rst: true, riq: true };
NewSpells.Solidify.stats = { duration: "1 min", castcost: 50, maintaincost: 10 };
NewPrerequisites.Solidify_requires_Materialize = { target: 'Solidify', prereq: 'Materialize' };
NewSpells.AffectSpirits = new Skill( "Affect Spirits", 'IQ', 2, libAbrv+151 );
NewSpells.AffectSpirits.classes = { reg: true };
NewSpells.AffectSpirits.stats = { duration: "1 min", castcost: 4, maintaincost: 2, time: 2 };
NewPrerequisites.AffectSpirits_requires_Solidify = { target: 'AffectSpirits', prereq: 'Solidify' };
// WeakenBlood under Body Control spells
NewSpells.SkullSpirit = new Skill( "Skull-Spirit", 'IQ', 2, libAbrv+151 );
NewSpells.SkullSpirit.classes = { reg: true };
NewSpells.SkullSpirit.stats = { duration: "24 hrs", castcost: 20 };
NewPrerequisites.SkullSpirit_requires_4Ne = { target: 'SkullSpirit', prereq: 'NecromanticSpells', number: 4 };
NewSpells.TurnSpirit = new Skill( "Turn Spirit", 'IQ', 2, libAbrv+151 );
NewSpells.TurnSpirit.classes = { reg: true, rwi: true };
NewSpells.TurnSpirit.stats = { duration: "10 sec", castcost: 4, maintaincost: 2, notes: "Every point of extra casting energy reduces the spirit's resistance by 1." };
NewPrerequisites.TurnSpirit_requires_Fear = { target: 'TurnSpirit', prereq: 'Fear' };
NewPrerequisites.TurnSpirit_requires_SenseSpirit = { target: 'TurnSpirit', prereq: 'SenseSpirit' };
NewSpells.Zombie = new Skill( "Zombie", 'IQ', 2, libAbrv+151 );
NewSpells.Zombie.classes = { reg: true };
NewSpells.Zombie.stats = { duration: "permanent", castcost: 8, time: "1 min" };
NewPrerequisites.Zombie_requires_SummonSpirit = { target: 'Zombie', prereq: 'SummonSpirit' };
NewPrerequisites.Zombie_requires_LendVitality = { target: 'Zombie', prereq: 'LendVitality' };
NewSpells.ControlZombie = new Skill( "Control Zombie", 'IQ', 2, libAbrv+152 );
NewSpells.ControlZombie.classes = { reg: true };
NewSpells.ControlZombie.stats = { duration: "permanent", castcost: 3 };
NewPrerequisites.ControlZombie_requires_Zombie = { target: 'ControlZombie', prereq: 'Zombie' };
NewSpells.TurnZombie = new Skill( "Turn Zombie", 'IQ', 2, libAbrv+152 );
NewSpells.TurnZombie.classes = { area: true };
NewSpells.TurnZombie.stats = { duration: "turning lasts 1 day", castcost: 2, time: 4 };
NewPrerequisites.TurnZombie_requires_Zombie_pgroup1     = { target: 'TurnZombie', prereq: 'Zombie',     pgroup: 1 };
NewSpells.ZombieSummoning = new Skill( "Zombie Summoning", 'IQ', 2, libAbrv+153 );
NewSpells.ZombieSummoning.classes = { spcl: true };
NewSpells.ZombieSummoning.stats = { duration: "1 min", castcost: 5, maintaincost: 2, time: 4, notes: "All zombies within a 10-mile radius (more for a very successful casting) will be summoned." };
NewPrerequisites.ZombieSummoning_requires_Zombie = { target: 'ZombieSummoning', prereq: 'Zombie' };
NewSpells.MassZombie = new Skill( "Mass Zombie", 'IQ', 3, libAbrv+153 );
NewSpells.MassZombie.classes = { area: true };
NewSpells.MassZombie.stats = { duration: "permanent", castcost: 7, time: "minutes = yds radius", notes: "min radius 2" };
NewPrerequisites.MassZombie_requires_Zombie = { target: 'MassZombie', prereq: 'Zombie' };
NewPrerequisites.MassZombie_requires_Charisma2 = { target: 'MassZombie', prereq: 'Charisma', level: 2, category: 'ADS' };
// AstralVision under Knowledge spells
NewSpells.SlowHealing = new Skill( "Slow Healing", 'IQ', 2, libAbrv+153 );
NewSpells.SlowHealing.classes = { reg: true, rht: true };
NewSpells.SlowHealing.stats = { duration: "1 day", castcost: "1-5", maintaincost: "same", time: 30, notes: "Casting cost is subtracted from any healing roll." };
NewPrerequisites.SlowHealing_requires_Magery1 = { target: 'SlowHealing', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.SlowHealing_requires_Frailty = { target: 'SlowHealing', prereq: 'Frailty' };
NewPrerequisites.SlowHealing_requires_StealVitality = { target: 'SlowHealing', prereq: 'StealVitality' };
NewSpells.StopHealing = new Skill( "Stop Healing", 'IQ', 2, libAbrv+153 );
NewSpells.StopHealing.classes = { reg: true };
NewSpells.StopHealing.stats = { duration: "1 day", castcost: "1-5", maintaincost: "same", time: 30, notes: "Every healing attempt on the subject must be made as a Quick Contest between the healer's skill and the Stop Healing spell's Endurance (p. 10)." };
NewPrerequisites.StopHealing_requires_SlowHealing = { target: 'StopHealing', prereq: 'SlowHealing' };
NewSpells.CommandSpirit = new Skill( "Command Spirit", 'IQ', 2, libAbrv+153 );
//NewSpells.CommandSpirit.specRequiredList = ['banshee','spectre','manitou'];
NewSpells.CommandSpirit.specCategName = 'spirit class';
NewSpells.CommandSpirit.classes = { reg: true, rwi: true };
NewSpells.CommandSpirit.stats = { duration: "1 min", castcost: "1/10CP of spirit", maintaincost: '½ C2C', time: 2, notes: "Casting cost is subtracted from any healing roll." };
NewPrerequisites.CommandSpirit_requires_SummonSpirit = { target: 'CommandSpirit', prereq: 'SummonSpirit' };
NewPrerequisites.CommandSpirit_requires_TurnSpirit = { target: 'CommandSpirit', prereq: 'TurnSpirit' };
// StrikeBarren under Body Control spells
NewSpells.Age = new Skill( "Age", 'IQ', 3, libAbrv+154 );
NewSpells.Age.classes = { reg: true, rht: true };
NewSpells.Age.stats = { duration: "permanent", castcost: "10-50", time: "1 min" };
NewPrerequisites.Age_requires_6Ne_pgroup1   = { target: 'Age', prereq: 'Necromantic', number: 6, pgroup: 1 };
NewPrerequisites.Age_requires_Youth_pgroup1 = { target: 'Age', prereq: 'Youth',                  pgroup: 1 };
NewSpells.Pestilence = new Skill( "Pestilence", 'IQ', 2, libAbrv+154 );
NewSpells.Pestilence.classes = { reg: true };
NewSpells.Pestilence.stats = { duration: "permanent", castcost: 6, time: 30, notes: "min radius 2" };
NewPrerequisites.Pestilence_requires_Magery1 = { target: 'Pestilence', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Pestilence_requires_StealVitality = { target: 'Pestilence', prereq: 'StealVitality' };
NewPrerequisites.Pestilence_requires_Decay = { target: 'Pestilence', prereq: 'Decay' };
NewSpells.Evisceration = new Skill( "Evisceration", 'IQ', 3, libAbrv+154 );
NewSpells.Evisceration.classes = { melee: true, rht: true, riq: true };
NewSpells.Evisceration.stats = { castcost: 10, time: 5 };
NewPrerequisites.Evisceration_requires_Magery3 = { target: 'Evisceration', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.Evisceration_requires_Apportation = { target: 'Evisceration', prereq: 'Apportation' };
NewPrerequisites.Evisceration_requires_StealVitality = { target: 'Evisceration', prereq: 'StealVitality' };
NewSpells.AnimateShadow = new Skill( "Animate Shadow", 'IQ', 2, libAbrv+154 );
NewSpells.AnimateShadow.classes = { reg: true, rht: true };
NewSpells.AnimateShadow.stats = { duration: "5 sec", castcost: 4, maintaincost: "same", time: 2 };
NewPrerequisites.AnimateShadow_requires_SkullSpirit = { target: 'AnimateShadow', prereq: 'SkullSpirit' };
NewPrerequisites.AnimateShadow_requires_ShapeDarkness = { target: 'AnimateShadow', prereq: 'ShapeDarkness' };
NewSpells.RottingDeath = new Skill( "Rotting Death", 'IQ', 3, libAbrv+154 );
NewSpells.RottingDeath.classes = { melee: true, rht: true };
NewSpells.RottingDeath.stats = { duration: "1 sec", castcost: 3, maintaincost: 2, time: 5 };
NewPrerequisites.RottingDeath_requires_Magery2 = { target: 'RottingDeath', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.RottingDeath_requires_Sickness = { target: 'RottingDeath', prereq: 'Sickness' };
NewPrerequisites.RottingDeath_requires_Pestilence = { target: 'RottingDeath', prereq: 'Pestilence' };
NewSpells.SoulJar = new Skill( "Soul Jar", 'IQ', 3, libAbrv+154 );
NewSpells.SoulJar.classes = { reg: true };
NewSpells.SoulJar.stats = { duration: "permanent", castcost: 8, time: "1 min" };
NewPrerequisites.SoulJar_requires_Magery1 = { target: 'SoulJar', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.SoulJar_requires_6Ne = { target: 'SoulJar', number: 6, prereq: 'Necromantic' };
NewPrerequisites.SoulJar_requires_StealVitality = { target: 'SoulJar', prereq: 'StealVitality' };
NewSpells.SummonDemon = new Skill( "Summon Demon", 'IQ', 2, libAbrv+155 );
NewSpells.SummonDemon.classes = { spcl: true };
NewSpells.SummonDemon.stats = { duration: "1 hr", castcost: "1/10CP of demon; min 20", time: "5 min" };
NewPrerequisites.SummonDemon_requires_Magery1    = { target: 'SummonDemon', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.SummonDemon_requires_10colleges = { target: 'SummonDemon', prereq: 'MagicColleges', number: 10, meta: true };
NewSpells.Banish = new Skill( "Banish", 'IQ', 2, libAbrv+156 );
NewSpells.Banish.classes = { spcl: true, rwi: true };
NewSpells.Banish.stats = { castcost: "1/10CP of demon; min 10", time: 5, notes: "The caster will not know in advance how much energy the spell will require, and may fall unconscious or even wound himself in casting the Banish." };
NewPrerequisites.Banish_requires_Magery1    = { target: 'Banish', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Banish_requires_10colleges = { target: 'Banish', prereq: 'MagicColleges', number: 10, meta: true };
// BurningDeath under Fire spells
// Resurrection under Healing spells
NewSpells.EntrapSpirit = new Skill( "Entrap Spirit", 'IQ', 2, libAbrv+157 );
NewSpells.EntrapSpirit.classes = { spcl: true };
NewSpells.EntrapSpirit.stats = { duration: "5 min", castcost: "(ST+IQ)/5", maintaincost: "(ST+IQ)/10" };
NewPrerequisites.EntrapSpirit_requires_Magery1 = { target: 'EntrapSpirit', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.EntrapSpirit_requires_SoulJar = { target: 'EntrapSpirit', prereq: 'SoulJar' };
NewPrerequisites.EntrapSpirit_requires_TurnSpirit = { target: 'EntrapSpirit', prereq: 'TurnSpirit' };
NewSpells.RepelSpirits = new Skill( "Repel Spirits", 'IQ', 2, libAbrv+158 );
NewSpells.RepelSpirits.classes = { area: true };
NewSpells.RepelSpirits.stats = { duration: "1 hr", castcost: 4, maintaincost: '½ C2C', time: 10 };
NewPrerequisites.RepelSpirits_requires_TurnSpirit = { target: 'RepelSpirits', prereq: 'Banish' };
NewPrerequisites.RepelSpirits_requires_TurnSpirit = { target: 'RepelSpirits', prereq: 'TurnSpirit' };
NewSpells.BindSpirit = new Skill( "Bind Spirit", 'IQ', 3, libAbrv+158 );
NewSpells.BindSpirit.specCategName = 'spirit class';
NewSpells.BindSpirit.classes = { reg: true, riq: true };
NewSpells.BindSpirit.stats = { duration: "permanent", castcost: "1/3CP of spirit; min 30", time: "5 min" };
NewPrerequisites.BindSpirit_requires_CommandSpirit = { target: 'BindSpirit', prereq: 'CommandSpirit', prereqSpec: 'same' };
NewPrerequisites.BindSpirit_requires_SoulJar = { target: 'BindSpirit', prereq: 'SoulJar' };
NewSpells.StealAttribute = new Skill( "Steal Attribute", 'IQ', 3, libAbrv+158 );
NewSpells.StealAttribute.specRequiredList = ['Grace','Vigor','Wisdom','Might'];
NewSpells.StealAttribute.classes = { reg: true, rht: true, riq: true, rst: true, rdx: true };
NewSpells.StealAttribute.stats = { duration: "1 day", castcost: "1/CP stolen; min 10", time: "1 min" };
NewPrerequisites.StealAttribute_requires_Magery3 = { target: 'StealAttribute', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.StealMight_requires_StealVitality = { target: 'StealAttribute', targetSpec: 'Might', prereq: 'StealVitality' };
NewPrerequisites.StealMight_requires_Debility      = { target: 'StealAttribute', targetSpec: 'Might', prereq: 'Debility' };
NewPrerequisites.StealWisdom_requires_StealVitality = { target: 'StealAttribute', targetSpec: 'Wisdom', prereq: 'StealVitality' };
NewPrerequisites.StealWisdom_requires_Foolishness   = { target: 'StealAttribute', targetSpec: 'Wisdom', prereq: 'Foolishness' };
NewPrerequisites.StealGrace_requires_StealVitality = { target: 'StealAttribute', targetSpec: 'Grace', prereq: 'StealVitality' };
NewPrerequisites.StealGrace_requires_Clumsiness    = { target: 'StealAttribute', targetSpec: 'Grace', prereq: 'Clumsiness' };
NewPrerequisites.StealVigor_requires_StealEnergy = { target: 'StealAttribute', targetSpec: 'Vigor', prereq: 'StealEnergy' };
NewPrerequisites.StealVigor_requires_Frailty     = { target: 'StealAttribute', targetSpec: 'Vigor', prereq: 'Frailty' };
NewSpells.StealSkill = new Skill( "Steal Skill", 'IQ', 3, libAbrv+158 );
NewSpells.StealSkill.classes = { reg: true, rwi: true };
NewSpells.StealSkill.stats = { duration: "24 hrs", castcost: "1/CP stolen; min 10", time: "1 min" };
NewPrerequisites.StealSkill_requires_Magery3     = { target: 'StealSkill', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.StealSkill_requires_BorrowSkill = { target: 'StealSkill', prereq: 'BorrowSkill' };
NewPrerequisites.StealSkill_requires_Daze        = { target: 'StealSkill', prereq: 'Daze' };
NewSpells.StealYouth = new Skill( "Steal Youth", 'IQ', 3, libAbrv+158 );
NewSpells.StealYouth.classes = { reg: true, rht: true };
NewSpells.StealYouth.stats = { duration: "permanent", castcost: "10-30", time: "1 hr" };
NewPrerequisites.StealYouth_requires_Youth = { target: 'StealYouth', prereq: 'Youth' };
NewPrerequisites.StealYouth_requires_Age = { target: 'StealYouth', prereq: 'Age' };
NewPrerequisites.StealYouth_requires_StealVitality = { target: 'StealYouth', prereq: 'StealVitality' };
NewSpells.StealBeauty = new Skill( "Steal Beauty", 'IQ', 3, libAbrv+159 );
NewSpells.StealBeauty.classes = { reg: true };
NewSpells.StealBeauty.stats = { duration: "24 hrs", castcost: "1/CP change; min 10", time: 30 };
NewPrerequisites.StealBeauty_requires_Magery3 = { target: 'StealBeauty', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.StealBeauty_requires_AlterVisage = { target: 'StealBeauty', prereq: 'AlterVisage' };
NewPrerequisites.StealBeauty_requires_StealVitality = { target: 'StealBeauty', prereq: 'StealVitality' };
NewSpells.AstralBlock = new Skill( "Astral Block", 'IQ', 2, libAbrv+159 );
NewSpells.AstralBlock.classes = { area: true };
NewSpells.AstralBlock.stats = { duration: "10 min", castcost: "4, or 15/yd&#179;", maintaincost: '½ C2C', time: 2 };
NewPrerequisites.AstralBlock_requires_SummonSpirit = { target: 'AstralBlock', prereq: 'SummonSpirit' };
NewPrerequisites.AstralBlock_requires_RepelSpirits = { target: 'AstralBlock', prereq: 'RepelSpirits' };
NewSpells.Lich = new Skill( "Lich", 'IQ', 3, libAbrv+159 );
NewSpells.Lich.classes = { ench: true };
NewSpells.Lich.stats = { castcost: "Equal to the lich's point total in his undead form; min 100." };
NewPrerequisites.Lich_requires_Magery3 = { target: 'Lich', prereq: 'Magery', level:  3, category: 'ADS' };
NewPrerequisites.Lich_requires_IQ13    = { target: 'Lich', prereq: 'IQ',     level: 13, category: 'stat' };
NewPrerequisites.Lich_requires_Enchant = { target: 'Lich', prereq: 'Enchant' };
NewPrerequisites.Lich_requires_SoulJar = { target: 'Lich', prereq: 'SoulJar' };
NewPrerequisites.Lich_requires_Zombie  = { target: 'Lich', prereq: 'Zombie' };
NewSpells.Wraith = new Skill( "Wraith", 'IQ', 3, libAbrv+160 );
NewSpells.Wraith.classes = { ench: true, rht: true };
NewSpells.Wraith.stats = { castcost: 500 };
NewPrerequisites.Wraith_requires_Magery3   = { target: 'Wraith', prereq: 'Magery', level:  3, category: 'ADS' };
NewPrerequisites.Wraith_requires_IQ13      = { target: 'Wraith', prereq: 'IQ',     level: 13, category: 'stat' };
NewPrerequisites.Wraith_requires_Enchant   = { target: 'Wraith', prereq: 'Enchant' };
NewPrerequisites.Wraith_requires_HaltAging = { target: 'Wraith', prereq: 'HaltAging' };
NewPrerequisites.Wraith_requires_SoulJar   = { target: 'Wraith', prereq: 'SoulJar' };


addToGroup("PlantSpells",
['PathofPlant','SeekPlant','IdentifyPlant','HealPlant','ShapePlant','BlessPlants','HidePath','PlantGrowth',
'PlantVision','PollenCloud','Blight','Blossom','Conceal','ForestWarning','TangleGrowth',
'PurifyEarth','CreatePlant','FalseTracks','PlantSense','RejuvenatePlant','WitherPlant',
'WalkThroughPlants','WalkThroughWood','PlantControl','EssentialWood','AnimatePlant','PlantForm',
'PlantSpeech','RainofNuts','ArborealImmurement','PlantFormOther','BodyofWood','BodyofSlime']);
NewSpells.SeekPlant = new Skill( "Seek Plant", 'IQ', 2, libAbrv+161 );
NewSpells.SeekPlant.classes = { info: true };
NewSpells.SeekPlant.stats = { castcost: 2 };
NewSpells.IdentifyPlant = new Skill( "Identify Plant", 'IQ', 2, libAbrv+161 );
NewSpells.IdentifyPlant.classes = { info: true };
NewSpells.IdentifyPlant.stats = { castcost: 2 };
NewPrerequisites.IdentifyPlant_requires_SeekPlant = { target: 'IdentifyPlant', prereq: 'SeekPlant' };
NewSpells.HealPlant = new Skill( "Heal Plant", 'IQ', 2, libAbrv+161 );
NewSpells.HealPlant.classes = { area: true };
NewSpells.HealPlant.stats = { castcost: 3, time: "1 min" };
NewPrerequisites.HealPlant_requires_IdentifyPlant = { target: 'HealPlant', prereq: 'IdentifyPlant' };
NewSpells.ShapePlant = new Skill( "Shape Plant", 'IQ', 2, libAbrv+161 );
NewSpells.ShapePlant.classes = { reg: true };
NewSpells.ShapePlant.stats = { duration: "1 min", castcost: 3, maintaincost: 1, time: 10, notes: "Double cost if the material is no longer living." };
NewPrerequisites.ShapePlant_requires_IdentifyPlant = { target: 'ShapePlant', prereq: 'IdentifyPlant' };
NewSpells.BlessPlants = new Skill( "Bless Plants", 'IQ', 2, libAbrv+161 );
NewSpells.BlessPlants.classes = { area: true };
NewSpells.BlessPlants.stats = { duration: "1 growing season", castcost: 1, time: "5 min" };
NewPrerequisites.BlessPlants_requires_HealPlant = { target: 'BlessPlants', prereq: 'HealPlant' };
NewSpells.HidePath = new Skill( "Hide Path", 'IQ', 2, libAbrv+162 );
NewSpells.HidePath.classes = { reg: true };
NewSpells.HidePath.stats = { duration: "1 min", castcost: 1, maintaincost: 1 };
NewPrerequisites.HidePath_requires_HealPlant = { target: 'HidePath', prereq: 'HealPlant' };
NewSpells.PlantGrowth = new Skill( "Plant Growth", 'IQ', 2, libAbrv+162 );
NewSpells.PlantGrowth.classes = { area: true };
NewSpells.PlantGrowth.stats = { duration: "1 min", castcost: 3, maintaincost: 2, time: 10 };
NewPrerequisites.PlantGrowth_requires_HealPlant = { target: 'PlantGrowth', prereq: 'HealPlant' };
NewSpells.PlantVision = new Skill( "Plant Vision", 'IQ', 2, libAbrv+162 );
NewSpells.PlantVision.classes = { reg: true };
NewSpells.PlantVision.stats = { duration: "30 sec", castcost: "1/10 yds; 100 yds max", maintaincost: "same" };
NewPrerequisites.PlantVision_requires_ShapePlant = { target: 'PlantVision', prereq: 'ShapePlant' };
NewSpells.PollenCloud = new Skill( "Pollen Cloud", 'IQ', 2, libAbrv+162 );
NewSpells.PollenCloud.classes = { area: true, rht: true };
NewSpells.PollenCloud.stats = { duration: "up to 5 min (min 10 sec)", castcost: 1, notes: "Duration depends on windiness." };
NewPrerequisites.PollenCloud_requires_ShapePlant = { target: 'PollenCloud', prereq: 'ShapePlant' };
NewSpells.Blight = new Skill( "Blight", 'IQ', 2, libAbrv+162 );
NewSpells.Blight.classes = { area: true };
NewSpells.Blight.stats = { duration: "1 growing season", castcost: 1, time: 5 };
NewPrerequisites.Blight_requires_PlantGrowth = { target: 'Blight', prereq: 'PlantGrowth' };
NewSpells.Blossom = new Skill( "Blossom", 'IQ', 2, libAbrv+162 );
NewSpells.Blossom.classes = { area: true };
NewSpells.Blossom.stats = { duration: "1 hr", castcost: 2, time: "5 min" };
NewPrerequisites.Blossom_requires_PlantGrowth = { target: 'Blossom', prereq: 'PlantGrowth' };
NewSpells.Conceal = new Skill( "Conceal", 'IQ', 2, libAbrv+162 );
NewSpells.Conceal.classes = { area: true };
NewSpells.Conceal.stats = { duration: "1 hr", castcost: "1-3", maintaincost: "same", time: 4, notes: "Base cost 1 to cast in a forest or jungle setting (or underwater); 2 in plains or savanna; 3 in tundra." };
NewPrerequisites.Conceal_requires_PlantGrowth = { target: 'Conceal', prereq: 'PlantGrowth' };
NewSpells.ForestWarning = new Skill( "Forest Warning", 'IQ', 2, libAbrv+162 );
NewSpells.ForestWarning.classes = { area: true };
NewSpells.ForestWarning.stats = { duration: "10 hrs", castcost: "½ (min 2)", maintaincost: "same" };
NewPrerequisites.ForestWarning_requires_SenseDanger_pgroup1 = { target: 'ForestWarning', prereq: 'SenseDanger',      pgroup: 1 };
NewPrerequisites.ForestWarning_requires_4Plant_pgroup1      = { target: 'ForestWarning', prereq: 'Plant', number: 4, pgroup: 1 };
NewSpells.TangleGrowth = new Skill( "Tangle Growth", 'IQ', 2, libAbrv+162 );
NewSpells.TangleGrowth.classes = { area: true };
NewSpells.TangleGrowth.stats = { duration: "1 min", castcost: "1 for grass, 2 for bushes or trees", maintaincost: "½ C2C", time: 2 };
NewPrerequisites.TangleGrowth_requires_PlantGrowth = { target: 'TangleGrowth', prereq: 'PlantGrowth' };
// PurifyEarth under Earth spells
NewSpells.CreatePlant = new Skill( "Create Plant", 'IQ', 2, libAbrv+163 );
NewSpells.CreatePlant.classes = { area: true };
NewSpells.CreatePlant.stats = { duration: "permanent", castcost: "4: grasses, 8: bushes, 15: trees", time: "1 sec for each energy spent" };
NewPrerequisites.CreatePlant_requires_Magery1     = { target: 'CreatePlant', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.CreatePlant_requires_PlantGrowth = { target: 'CreatePlant', prereq: 'PlantGrowth' };
NewSpells.FalseTracks = new Skill( "False Tracks", 'IQ', 2, libAbrv+163 );
NewSpells.FalseTracks.classes = { reg: true, rwi: true };
NewSpells.FalseTracks.stats = { duration: "1 min", castcost: 2, maintaincost: 1 };
NewPrerequisites.FalseTracks_requires_ShapePlant = { target: 'FalseTracks', prereq: 'ShapePlant' };
NewPrerequisites.FalseTracks_requires_ShapeEarth = { target: 'FalseTracks', prereq: 'ShapeEarth' };
NewSpells.PlantSense = new Skill( "Plant Sense", 'IQ', 2, libAbrv+163 );
NewSpells.PlantSense.classes = { reg: true };
NewSpells.PlantSense.stats = { duration: "1 min", castcost: 3, maintaincost: 2, notes: "Resisted by Hide Path" };
NewPrerequisites.PlantSense_requires_ForestWarning = { target: 'PlantSense', prereq: 'ForestWarning' };
NewPrerequisites.PlantSense_requires_HidePath      = { target: 'PlantSense', prereq: 'HidePath' };
NewSpells.RejuvenatePlant = new Skill( "Rejuvenate Plant", 'IQ', 2, libAbrv+163 );
NewSpells.RejuvenatePlant.classes = { reg: true };
NewSpells.RejuvenatePlant.stats = { duration: "permanent", castcost: 3 };
NewPrerequisites.RejuvenatePlant_requires_Magery1     = { target: 'RejuvenatePlant', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.RejuvenatePlant_requires_PlantGrowth = { target: 'RejuvenatePlant', prereq: 'PlantGrowth' };
NewSpells.WitherPlant = new Skill( "Wither Plant", 'IQ', 2, libAbrv+163 );
NewSpells.WitherPlant.classes = { area: true, rht: true };
NewSpells.WitherPlant.stats = { duration: "permanent", castcost: 2, time: 10 };
NewPrerequisites.WitherPlant_requires_Blight = { target: 'WitherPlant', prereq: 'Blight' };
NewSpells.WalkThroughPlants = new Skill( "Walk Through Plants", 'IQ', 2, libAbrv+163 );
NewSpells.WalkThroughPlants.classes = { reg: true };
NewSpells.WalkThroughPlants.stats = { duration: "1 min", castcost: 3, maintaincost: 1 };
NewPrerequisites.WalkThroughPlants_requires_HidePath   = { target: 'WalkThroughPlants', prereq: 'HidePath' };
NewPrerequisites.WalkThroughPlants_requires_ShapePlant = { target: 'WalkThroughPlants', prereq: 'ShapePlant' };
NewSpells.WalkThroughWood = new Skill( "Walk Through Wood", 'IQ', 2, libAbrv+164 );
NewSpells.WalkThroughWood.classes = { reg: true };
NewSpells.WalkThroughWood.stats = { duration: "1 sec", castcost: 3, maintaincost: 2 };
NewPrerequisites.WalkThroughWood_requires_WalkThroughPlants = { target: 'WalkThroughWood', prereq: 'WalkThroughPlants' };
NewSpells.PlantControl = new Skill( "Plant Control", 'IQ', 2, libAbrv+164 );
NewSpells.PlantControl.classes = { reg: true, rwi: true };
NewSpells.PlantControl.stats = { duration: "1 min", castcost: 3, maintaincost: "½ C2C" };
NewPrerequisites.PlantControl_requires_PlantSense = { target: 'PlantControl', prereq: 'PlantSense' };
NewSpells.EssentialWood = new Skill( "Essential Wood", 'IQ', 2, libAbrv+164 );
NewSpells.EssentialWood.classes = { reg: true };
NewSpells.EssentialWood.stats = { duration: "permanent", castcost: 8, time: 30 };
NewPrerequisites.EssentialWood_requires_6Plant = { target: 'EssentialWood', prereq: 'Plant', number: 6 };
NewSpells.AnimatePlant = new Skill( "Animate Plant", 'IQ', 2, libAbrv+164 );
NewSpells.AnimatePlant.classes = { reg: true };
NewSpells.AnimatePlant.stats = { duration: "1 min", castcost: 3, maintaincost: "½ C2C", time: 5, notes: "Double cost if the plant is to pull itself up and walk (Move 4) on its roots!" };
NewPrerequisites.AnimatePlant_requires_7Plant = { target: 'AnimatePlant', number: 7, prereq: 'Plant' };
NewSpells.PlantForm = new Skill( "Plant Form", 'IQ', 2, libAbrv+164 );
NewSpells.PlantForm.classes = { spcl: true };
NewSpells.PlantForm.stats = { duration: "1 hr", castcost: 5, maintaincost: 2, time: 2 };
NewPrerequisites.PlantForm_requires_Magery1 = { target: 'PlantForm', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.PlantForm_requires_6Plant  = { target: 'PlantForm', prereq: 'Plant', number: 6 };
NewSpells.PlantSpeech = new Skill( "Plant Speech", 'IQ', 2, libAbrv+164 );
NewSpells.PlantSpeech.classes = { reg: true };
NewSpells.PlantSpeech.stats = { duration: "1 min", castcost: 3, maintaincost: 2, notes: "Each minute allows one question and answer." };
NewPrerequisites.PlantSpeech_requires_Magery1    = { target: 'PlantSpeech', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.PlantSpeech_requires_PlantSense = { target: 'PlantSpeech', prereq: 'PlantSense' };
NewSpells.RainofNuts = new Skill( "Rain of Nuts", 'IQ', 2, libAbrv+165 );
NewSpells.RainofNuts.classes = { area: true };
NewSpells.RainofNuts.stats = { duration: "1 min", castcost: 0.1, maintaincost: "same", time: 2, notes: "For double cost, the caster may double the effect of the spell (-2 skill penalties and visibility -1 per 4 yards), if the GM agrees that the woods are sufficiently dense and wild." };
NewPrerequisites.RainofNuts_requires_Magery1    = { target: 'RainofNuts', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.RainofNuts_requires_6Plant     = { target: 'RainofNuts', prereq: 'Plant', number: 6 };
NewPrerequisites.RainofNuts_requires_ShapePlant = { target: 'RainofNuts', prereq: 'ShapePlant' };
NewSpells.ArborealImmurement = new Skill( "Arboreal Immurement", 'IQ', 2, libAbrv+165 );
NewSpells.ArborealImmurement.classes = { reg: true, rht: true };
NewSpells.ArborealImmurement.stats = { duration: "indefinite", castcost: 8, time: 3, notes: "5 to reverse an Arboreal Immurement." };
NewPrerequisites.ArborealImmurement_requires_Magery2         = { target: 'ArborealImmurement', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.ArborealImmurement_requires_WalkThroughWood = { target: 'ArborealImmurement', prereq: 'WalkThroughWood' };
NewSpells.PlantFormOther = new Skill( "Plant Form Other", 'IQ', 3, libAbrv+165 );
NewSpells.PlantFormOther.classes = { spcl: true, rwi: true };
NewSpells.PlantFormOther.stats = { duration: "1 hr", castcost: 5, maintaincost: 2, time: 30 };
NewPrerequisites.PlantFormOther_requires_Magery2   = { target: 'PlantFormOther', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.PlantFormOther_requires_PlantForm = { target: 'PlantFormOther', prereq: 'PlantForm' };
NewSpells.BodyofWood = new Skill( "Body of Wood", 'IQ', 2, libAbrv+165 );
NewSpells.BodyofWood.classes = { reg: true, rht: true };
NewSpells.BodyofWood.stats = { duration: "1 min", castcost: 7, maintaincost: 3, time: 5, notes: "The spell expires if the subject loses consciousness." };
NewPrerequisites.BodyofWood_requires_Magery2   = { target: 'BodyofWood', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.BodyofWood_requires_PlantForm = { target: 'BodyofWood', prereq: 'PlantForm' };
NewSpells.BodyofSlime = new Skill( "Body of Slime", 'IQ', 2, libAbrv+165 );
NewSpells.BodyofSlime.classes = { reg: true, rht: true };
NewSpells.BodyofSlime.stats = { duration: "1 min", castcost: 6, maintaincost: 2, time: 5, notes: "The spell expires if the subject loses consciousness." };
NewPrerequisites.BodyofSlime_requires_Magery2    = { target: 'BodyofSlime', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.BodyofSlime_requires_PlantForm  = { target: 'BodyofSlime', prereq: 'PlantForm' };
NewPrerequisites.BodyofSlime_requires_ShapeWater = { target: 'BodyofSlime', prereq: 'ShapeWater' };


addToGroup("ProtectionWarningSpells",
['SenseDanger','DetectPoison','Magelock','Block','Hardiness','Watchdog','ProtectAnimal',
'Nightingale','SenseObservation','ShieldSpell','Armor','TurnBlade','Bladeturning','Umbrella',
'DeflectMissile','MissileShield','CatchMissile','ReverseMissiles','ReturnMissile','ReflectGaze',
'MysticMist','Shade','ResistPoison','ResistDisease','ResistSound','ResistWater','ResistLightning',
'Warmth','Coolness','IronArm','WeatherDome','AtmosphereDome','ResistPressure','ResistRadiation',
'ResistAcid','Freedom','TeleportShield','ForceDome','ForceWall','UtterDome','UtterWall']);
NewSpells.SenseDanger = new Skill( "Sense Danger", 'IQ', 2, libAbrv+166 );
NewSpells.SenseDanger.classes = { info: true };
NewSpells.SenseDanger.stats = { castcost: 3 };
NewPrerequisites.SenseDanger_requires_SenseFoes_pgroup1   = { target: 'SenseDanger', prereq: 'SenseFoes',   pgroup: 1 };
NewPrerequisites.SenseDanger_requires_DangerSense_pgroup1 = { target: 'SenseDanger', prereq: 'DangerSense', pgroup: 1, category: 'AD' };
NewSpells.DetectPoison = new Skill( "Detect Poison", 'IQ', 2, libAbrv+166 );
NewSpells.DetectPoison.classes = { area: true, info: true };
NewSpells.DetectPoison.stats = { castcost: 2, time: 2 };
NewPrerequisites.DetectPoison_requires_SenseDanger_pgroup1 = { target: 'DetectPoison', prereq: 'SenseDanger', pgroup: 1 };
NewPrerequisites.DetectPoison_requires_TestFood_pgroup1    = { target: 'DetectPoison', prereq: 'TestFood',    pgroup: 1 };
NewSpells.Magelock = new Skill( "Magelock", 'IQ', 2, libAbrv+166 );
NewSpells.Magelock.classes = { reg: true };
NewSpells.Magelock.stats = { duration: "6 hr", castcost: 3, maintaincost: 2, time: 4, notes: "resists Lockmaster spell" };
NewPrerequisites.Magelock_requires_Magery1 = { target: 'Magelock', prereq: 'Magery', level: 1, category: 'ADS' };
NewSpells.Block = new Skill( "Block", 'IQ', 2, libAbrv+166 );
NewSpells.Block.classes = { block: true };
NewSpells.Block.stats = { castcost: "1/DB+; max 5" };
NewPrerequisites.Block_requires_Magery1 = { target: 'Block', prereq: 'Magery', level: 1, category: 'ADS' };
NewSpells.Hardiness = new Skill( "Hardiness", 'IQ', 2, libAbrv+167 );
NewSpells.Hardiness.classes = { block: true };
NewSpells.Hardiness.stats = { castcost: "1/DR+; max 5" };
NewPrerequisites.Hardiness_requires_Block = { target: 'Hardiness', prereq: 'Block' };
NewSpells.Watchdog = new Skill( "Watchdog", 'IQ', 2, libAbrv+167 );
NewSpells.Watchdog.classes = { area: true };
NewSpells.Watchdog.stats = { duration: "10 hr", castcost: 1, maintaincost: 1, time: 10 };
NewPrerequisites.Watchdog_requires_SenseDanger = { target: 'Watchdog', prereq: 'SenseDanger' };
// ProtectAnimal under Animal spells
NewSpells.Nightingale = new Skill( "Nightingale", 'IQ', 2, libAbrv+167 );
NewSpells.Nightingale.classes = { area: true };
NewSpells.Nightingale.stats = { duration: "10 hr", castcost: 2, maintaincost: 2 };
NewPrerequisites.Nightingale_requires_SenseDanger = { target: 'Nightingale', prereq: 'SenseDanger' };
NewSpells.SenseObservation = new Skill( "Sense Observation", 'IQ', 2, libAbrv+167 );
NewSpells.SenseObservation.classes = { area: true };
NewSpells.SenseObservation.stats = { duration: "1 hr", castcost: "1; or 3 for a being", maintaincost: "½ C2C", time: 5 };
NewPrerequisites.SenseObservation_requires_SenseDanger_pgroup1 = { target: 'SenseObservation', prereq: 'SenseDanger', pgroup: 1 };
NewPrerequisites.SenseObservation_requires_Scryguard_pgroup1   = { target: 'SenseObservation', prereq: 'Scryguard',   pgroup: 1 };
NewSpells.ShieldSpell = new Skill( "Shield", 'IQ', 2, libAbrv+167 );
NewSpells.ShieldSpell.classes = { reg: true };
NewSpells.ShieldSpell.stats = { duration: "1 min", castcost: "2/PD+; max +4", maintaincost: "½ C2C" };
NewPrerequisites.ShieldSpell_requires_Magery2 = { target: 'ShieldSpell', prereq: 'Magery', level: 2, category: 'ADS' };
NewSpells.Armor = new Skill( "Armor", 'IQ', 2, libAbrv+167 );
NewSpells.Armor.classes = { reg: true };
NewSpells.Armor.stats = { duration: "1 min", castcost: "2/DR+; max +5", maintaincost: "½ C2C" };
NewPrerequisites.Armor_requires_ShieldSpell = { target: 'Armor', prereq: 'ShieldSpell' };
NewSpells.TurnBlade = new Skill( "Turn Blade", 'IQ', 2, libAbrv+167 );
NewSpells.TurnBlade.classes = { block: true };
NewSpells.TurnBlade.stats = { castcost: 1 };
NewPrerequisites.TurnBlade_requires_Apportation_pgroup1 = { target: 'TurnBlade', prereq: 'Apportation', pgroup: 1 };
NewPrerequisites.TurnBlade_requires_Spasm_pgroup1       = { target: 'TurnBlade', prereq: 'Spasm',       pgroup: 1 };
NewSpells.Bladeturning = new Skill( "Bladeturning", 'IQ', 2, libAbrv+168 );
NewSpells.Bladeturning.classes = { reg: true };
NewSpells.Bladeturning.stats = { duration: "1 min", castcost: 2, maintaincost: "same" };
NewPrerequisites.Bladeturning_requires_ShieldSpell_pgroup1 = { target: 'Bladeturning', prereq: 'ShieldSpell', pgroup: 1 };
NewPrerequisites.Bladeturning_requires_TurnBlade_pgroup1   = { target: 'Bladeturning', prereq: 'TurnBlade',   pgroup: 1 };
// Umbrella under Water spells
// DeflectMissile under Movement spells
NewSpells.MissileShield = new Skill( "Missile Shield", 'IQ', 2, libAbrv+168 );
NewSpells.MissileShield.classes = { reg: true };
NewSpells.MissileShield.stats = { duration: "1 min", castcost: 5, maintaincost: 2 };
NewPrerequisites.MissileShield_requires_Apportation_pgroup1 = { target: 'MissileShield', prereq: 'Apportation', pgroup: 1 };
NewPrerequisites.MissileShield_requires_ShieldSpell_pgroup1 = { target: 'MissileShield', prereq: 'ShieldSpell', pgroup: 1 };
NewSpells.CatchMissile = new Skill( "Catch Missile", 'IQ', 2, libAbrv+168 );
NewSpells.CatchMissile.classes = { block: true };
NewSpells.CatchMissile.stats = { castcost: 2 };
NewPrerequisites.CatchMissile_requires_DeflectMissile = { target: 'CatchMissile', prereq: 'DeflectMissile' };
NewSpells.ReverseMissiles = new Skill( "Reverse Missiles", 'IQ', 2, libAbrv+168 );
NewSpells.ReverseMissiles.classes = { reg: true };
NewSpells.ReverseMissiles.stats = { duration: "1 min", castcost: 7, maintaincost: 3 };
NewPrerequisites.ReverseMissiles_requires_MissileShield_pgroup1 = { target: 'ReverseMissiles', prereq: 'MissileShield', pgroup: 1 };
NewPrerequisites.ReverseMissiles_requires_ForceDome_pgroup1     = { target: 'ReverseMissiles', prereq: 'ForceDome',     pgroup: 1 };
NewSpells.ReturnMissile = new Skill( "Return Missile", 'IQ', 2, libAbrv+168 );
NewSpells.ReturnMissile.classes = { block: true };
NewSpells.ReturnMissile.stats = {castcost: 2 };
NewPrerequisites.ReturnMissile_requires_DeflectMissile = { target: 'ReturnMissile', prereq: 'CatchMissile' };
NewSpells.ReflectGaze = new Skill( "Reflect Gaze", 'IQ', 3, libAbrv+168 );
NewSpells.ReflectGaze.classes = { block: true };
NewSpells.ReflectGaze.stats = { castcost: 2, notes: "resists gaze attacks" };
NewPrerequisites.ReflectGaze_requires_Mirror = { target: 'ReflectGaze', prereq: 'Mirror' };
NewSpells.MysticMist = new Skill( "Mystic Mist", 'IQ', 2, libAbrv+168 );
NewSpells.MysticMist.classes = { area: true };
NewSpells.MysticMist.stats = { duration: "10 hr", castcost: 1, maintaincost: "same", time: "5 min" };
NewPrerequisites.MysticMist_requires_Magery1             = { target: 'MysticMist', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.MysticMist_requires_Watchdog_pgroup1    = { target: 'MysticMist', prereq: 'Watchdog',    pgroup: 1 };
NewPrerequisites.MysticMist_requires_ShieldSpell_pgroup1 = { target: 'MysticMist', prereq: 'ShieldSpell', pgroup: 1 };
NewSpells.Shade = new Skill( "Shade", 'IQ', 2, libAbrv+169 );
NewSpells.Shade.classes = { reg: true };
NewSpells.Shade.stats = { duration: "1 hr", castcost: 1, maintaincost: "½ C2C", time: 10 };
NewPrerequisites.Shade_requires_ContinualLight_pgroup1 = { target: 'Shade', prereq: 'ContinualLight', pgroup: 1 };
NewPrerequisites.Shade_requires_ShieldSpell_pgroup1    = { target: 'Shade', prereq: 'ShieldSpell',    pgroup: 1 };
// ResistPoison under Healing spells
// ResistDisease under Healing spells
// ResistSound under Sound spells
// ResistWater under Water spells
// ResistLightning under Weather spells
// Warmth under Fire spells
// Coolness under Water spells
NewSpells.IronArm = new Skill( "Iron Arm", 'IQ', 2, libAbrv+169 );
NewSpells.IronArm.classes = { block: true };
NewSpells.IronArm.stats = { castcost: 1 };
NewPrerequisites.IronArm_requires_ResistPain = { target: 'IronArm', prereq: 'ResistPain' };
NewPrerequisites.IronArm_requires_DX11       = { target: 'IronArm', prereq: 'DX', level: 11, category: 'stat' };
NewSpells.WeatherDome = new Skill( "Weather Dome", 'IQ', 2, libAbrv+169 );
NewSpells.WeatherDome.classes = { area: true };
NewSpells.WeatherDome.stats = { duration: "6 hr", castcost: 3, maintaincost: 2 };
NewPrerequisites.WeatherDome_requires_2Air   = { target: 'WeatherDome', prereq: 'Air',   number: 2 };
NewPrerequisites.WeatherDome_requires_2Earth = { target: 'WeatherDome', prereq: 'Earth', number: 2 };
NewPrerequisites.WeatherDome_requires_2Fire  = { target: 'WeatherDome', prereq: 'Fire',  number: 2 };
NewPrerequisites.WeatherDome_requires_2Water = { target: 'WeatherDome', prereq: 'Water', number: 2 };
NewSpells.AtmosphereDome = new Skill( "Atmosphere Dome", 'IQ', 2, libAbrv+169 );
NewSpells.AtmosphereDome.classes = { area: true };
NewSpells.AtmosphereDome.stats = { duration: "6 hr", castcost: 4, maintaincost: "½ C2C" };
NewPrerequisites.AtmosphereDome_requires_PurifyAir   = { target: 'AtmosphereDome', prereq: 'PurifyAir' };
NewPrerequisites.AtmosphereDome_requires_WeatherDome = { target: 'AtmosphereDome', prereq: 'WeatherDome' };
NewSpells.ResistPressure = new Skill( "Resist Pressure", 'IQ', 2, libAbrv+169 );
NewSpells.ResistPressure.classes = { reg: true };
NewSpells.ResistPressure.stats = { duration: "1 min", castcost: "2-5; see table Magic 4th ed.170", maintaincost: "1-3; see table Magic 4th ed.170" };
NewPrerequisites.ResistPressure_requires_WeatherDome = { target: 'ResistPressure', prereq: 'WeatherDome' };
// ResistRadiation under Technological spells
// ResistAcid under Water spells
// Freedom under Movement spells
NewSpells.TeleportShield = new Skill( "Teleport Shield", 'IQ', 2, libAbrv+170 );
NewSpells.TeleportShield.classes = { area: true };
NewSpells.TeleportShield.stats = { duration: "1 hr", castcost: "⅓; min 3 yds", maintaincost: "same", time: 10, notes: "Any attempt to Teleport (or Blink) into or out of the area of effect is at -5 to skill. Doubling the energy cost increases the penalty to -10; tripling it increases the penalty to -15!" };
NewPrerequisites.TeleportShield_requires_Watchdog            = { target: 'TeleportShield', prereq: 'Watchdog' };
NewPrerequisites.TeleportShield_requires_SpellShield_pgroup1 = { target: 'TeleportShield', prereq: 'SpellShield', pgroup: 1 };
NewPrerequisites.TeleportShield_requires_Teleport_pgroup1    = { target: 'TeleportShield', prereq: 'Teleport',    pgroup: 1 };
NewSpells.ForceDome = new Skill( "Force Dome", 'IQ', 2, libAbrv+170 );
NewSpells.ForceDome.classes = { area: true };
NewSpells.ForceDome.stats = { duration: "10 min", castcost: 3, maintaincost: 2 };
NewPrerequisites.ForceDome_requires_Magery1     = { target: 'ForceDome', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.ForceDome_requires_WeatherDome = { target: 'ForceDome', prereq: 'WeatherDome' };
NewPrerequisites.ForceDome_requires_Apportation = { target: 'ForceDome', prereq: 'Apportation' };
NewSpells.ForceWall = new Skill( "Force Wall", 'IQ', 2, libAbrv+170 );
NewSpells.ForceWall.classes = { reg: true };
NewSpells.ForceWall.stats = { duration: "10 min", castcost: "2/yd", maintaincost: "same" };
NewPrerequisites.ForceWall_requires_ForceDome   = { target: 'ForceWall', prereq: 'ForceDome' };
NewSpells.UtterDome = new Skill( "Utter Dome", 'IQ', 2, libAbrv+170 );
NewSpells.UtterDome.classes = { area: true };
NewSpells.UtterDome.stats = { duration: "1 min", castcost: 6, maintaincost: 4 };
NewPrerequisites.UtterDome_requires_Magery2     = { target: 'UtterDome', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.UtterDome_requires_ForceDome   = { target: 'UtterDome', prereq: 'ForceDome' };
NewPrerequisites.UtterDome_requires_SpellShield = { target: 'UtterDome', prereq: 'SpellShield' };
NewSpells.UtterWall = new Skill( "Utter Wall", 'IQ', 2, libAbrv+170 );
NewSpells.UtterWall.classes = { reg: true };
NewSpells.UtterWall.stats = { duration: "1 min", castcost: "4/yd", maintaincost: "same" };
NewPrerequisites.UtterWall_requires_UtterDome = { target: 'UtterWall', prereq: 'UtterDome' };
NewPrerequisites.UtterWall_requires_SpellWall = { target: 'UtterWall', prereq: 'SpellWall' };


addToGroup("SoundSpells",
['PathofSound','Sound','KeenHearing','Silence','SoundVision','Thunderclap','Voices','Garble','ImitateVoice',
'WallofSilence','Hush','MageStealth','GreatVoice','Noise','DelayedMessage','ResistSound','SoundJet',
'Concussion','Converse','FarHearing','Scribe','MusicalScribe','Message','WizardMouth','AlterVoice',
'SilverTongue','EchoesofthePast','WizardEar','InvisibleWizardEar']);
NewSpells.Sound = new Skill( "Sound", 'IQ', 2, libAbrv+171 );
NewSpells.Sound.classes = { reg: true };
NewSpells.Sound.stats = { duration: "5 sec or 1 min", castcost: "2 (1 for 5 sec)", maintaincost: "1/min" };
// KeenHearing under Mind Control spells
NewSpells.Silence = new Skill( "Silence", 'IQ', 2, libAbrv+171 );
NewSpells.Silence.classes = { area: true };
NewSpells.Silence.stats = { duration: "1 min", castcost: 2, maintaincost: 1 };
NewPrerequisites.Silence_requires_Sound = { target: 'Silence', prereq: 'Sound' };
NewSpells.SoundVision = new Skill( "Sound Vision", 'IQ', 2, libAbrv+171 );
NewSpells.SoundVision.classes = { reg: true };
NewSpells.SoundVision.stats = { duration: "1 min", castcost: 5, maintaincost: 2 };
NewPrerequisites.SoundVision_requires_AcuteHearing_pgroup1 = { target: 'SoundVision', prereq: 'AcuteHearing', pgroup: 1, category: ' ADS' };
NewPrerequisites.SoundVision_requires_KeenHearing_pgroup1  = { target: 'SoundVision', prereq: 'KeenHearing',  pgroup: 1 };
NewSpells.Thunderclap = new Skill( "Thunderclap", 'IQ', 2, libAbrv+171 );
NewSpells.Thunderclap.classes = { reg: true };
NewSpells.Thunderclap.stats = { castcost: 2 };
NewPrerequisites.Thunderclap_requires_Sound = { target: 'Thunderclap', prereq: 'Sound' };
NewSpells.Voices = new Skill( "Voices", 'IQ', 2, libAbrv+172 );
NewSpells.Voices.classes = { reg: true };
NewSpells.Voices.stats = { duration: "1 min", castcost: 3, maintaincost: 2 };
NewPrerequisites.Voices_requires_Sound = { target: 'Voices', prereq: 'Sound' };
NewSpells.Garble = new Skill( "Garble", 'IQ', 2, libAbrv+172 );
NewSpells.Garble.classes = { reg: true, rwi: true };
NewSpells.Garble.stats = { duration: "1 min", castcost: 4, maintaincost: 2 };
NewPrerequisites.Garble_requires_Voices = { target: 'Garble', prereq: 'Voices' };
NewSpells.ImitateVoice = new Skill( "Imitate Voice", 'IQ', 2, libAbrv+172 );
NewSpells.ImitateVoice.classes = { reg: true, rht: true };
NewSpells.ImitateVoice.stats = { duration: "1 min", castcost: 3, maintaincost: 1 };
NewPrerequisites.ImitateVoice_requires_Voices = { target: 'ImitateVoice', prereq: 'Voices' };
NewSpells.WallofSilence = new Skill( "Wall of Silence", 'IQ', 2, libAbrv+172 );
NewSpells.WallofSilence.classes = { area: true };
NewSpells.WallofSilence.stats = { duration: "1 min", castcost: 2, maintaincost: 1 };
NewPrerequisites.WallofSilence_requires_Silence = { target: 'WallofSilence', prereq: 'Silence' };
NewSpells.Hush = new Skill( "Hush", 'IQ', 2, libAbrv+172 );
NewSpells.Hush.classes = { reg: true, rwi: true };
NewSpells.Hush.stats = { duration: "1 min (10 sec if resistance tried)", castcost: 2, maintaincost: 1, time: 2 };
NewPrerequisites.Hush_requires_Silence = { target: 'Hush', prereq: 'Silence' };
NewSpells.MageStealth = new Skill( "Mage-Stealth", 'IQ', 2, libAbrv+172 );
NewSpells.MageStealth.classes = { reg: true };
NewSpells.MageStealth.stats = { duration: "1 min", castcost: 3, maintaincost: 2, time: 3 };
NewPrerequisites.MageStealth_requires_Hush = { target: 'MageStealth', prereq: 'Hush' };
NewSpells.GreatVoice = new Skill( "Great Voice", 'IQ', 2, libAbrv+173 );
NewSpells.GreatVoice.classes = { reg: true };
NewSpells.GreatVoice.stats = { duration: "1 min", castcost: 3, maintaincost: 1, time: 2 };
NewPrerequisites.GreatVoice_requires_Voices      = { target: 'GreatVoice', prereq: 'Voices' };
NewPrerequisites.GreatVoice_requires_Thunderclap = { target: 'GreatVoice', prereq: 'Thunderclap' };
NewSpells.Noise = new Skill( "Noise", 'IQ', 2, libAbrv+173 );
NewSpells.Noise.classes = { area: true };
NewSpells.Noise.stats = { duration: "5 sec", castcost: 4, maintaincost: 2 };
NewPrerequisites.Noise_requires_WallofSilence = { target: 'Noise', prereq: 'WallofSilence' };
NewSpells.DelayedMessage = new Skill( "Delayed Message", 'IQ', 2, libAbrv+173 );
NewSpells.DelayedMessage.classes = { area: true };
NewSpells.DelayedMessage.stats = { duration: "until triggered", castcost: "3/sentence-idea", time: 4 };
NewPrerequisites.DelayedMessage_requires_Magery1   = { target: 'DelayedMessage', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.DelayedMessage_requires_Voices    = { target: 'DelayedMessage', prereq: 'Voices' };
NewPrerequisites.DelayedMessage_requires_SenseLife = { target: 'DelayedMessage', prereq: 'SenseLife' };
NewSpells.ResistSound = new Skill( "Noise", 'IQ', 2, libAbrv+173 );
NewSpells.ResistSound.classes = { reg: true };
NewSpells.ResistSound.stats = { duration: "1 min", castcost: 2, maintaincost: 1 };
NewPrerequisites.ResistSound_requires_4Sound = { target: 'ResistSound', prereq: 'Sound', number: 4 };
NewSpells.SoundJet = new Skill( "Sound Jet", 'IQ', 2, libAbrv+173 );
NewSpells.SoundJet.classes = { reg: true };
NewSpells.SoundJet.stats = { duration: "1 sec", castcost: "1-4", maintaincost: "same", notes: "Range in yards is equal to energy cost." };
NewPrerequisites.SoundJet_requires_GreatVoice = { target: 'SoundJet', prereq: 'GreatVoice' };
// Concussion under Air spells
NewSpells.Converse = new Skill( "Noise", 'IQ', 2, libAbrv+173 );
NewSpells.Converse.classes = { reg: true };
NewSpells.Converse.stats = { duration: "while eye contact maintained", castcost: 2 };
NewPrerequisites.Converse_requires_Magery1 = { target: 'Converse', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Converse_requires_Garble  = { target: 'Converse', prereq: 'Garble' };
NewPrerequisites.Converse_requires_Silence = { target: 'Converse', prereq: 'Silence' };
NewSpells.FarHearing = new Skill( "Far-Hearing", 'IQ', 2, libAbrv+173 );
NewSpells.FarHearing.classes = { info: true };
NewSpells.FarHearing.stats = { duration: "1 min", castcost: 4, maintaincost: 2, time: 3, notes: "caster must NOT be Deaf or Hard Of Hearing" };
NewPrerequisites.FarHearing_requires_Magery1 = { target: 'FarHearing', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.FarHearing_requires_4Sound  = { target: 'FarHearing', prereq: 'Sound', number: 4 };
NewSpells.Scribe = new Skill( "Scribe", 'IQ', 2, libAbrv+174 );
NewSpells.Scribe.classes = { reg: true };
NewSpells.Scribe.stats = { duration: "1 min", castcost: 3, maintaincost: 1, notes: "must have Accented or better <b>written</b> comprehension in at least one language" };
NewPrerequisites.Scribe_requires_Voices        = { target: 'Scribe', prereq: 'Voices' };
NewPrerequisites.Scribe_requires_DancingObject = { target: 'Scribe', prereq: 'DancingObject' };
NewSpells.MusicalScribe = new Skill( "Musical Scribe", 'IQ', 2, libAbrv+174 );
NewSpells.MusicalScribe.classes = { reg: true };
NewSpells.MusicalScribe.stats = { duration: "1 min", castcost: 3, maintaincost: 1, time: 3, notes: "Increase cost by 1 (both casting and maintenance) if the paper supplied is not properly ruled for musical notation." };
NewPrerequisites.MusicalScribe_requires_Scribe = { target: 'MusicalScribe', prereq: 'Scribe' };
NewSpells.Message = new Skill( "Message", 'IQ', 2, libAbrv+174 );
NewSpells.Message.classes = { reg: true };
NewSpells.Message.stats = { duration: "distance/50mph", castcost: "1/15 message length in seconds", time: "duration in seconds", notes: "Double speed for x2 energy cost. Resisted by spells that block sound." };
NewPrerequisites.Message_requires_GreatVoice = { target: 'Message', prereq: 'GreatVoice' };
NewPrerequisites.Message_requires_Seeker     = { target: 'Message', prereq: 'Seeker' };
// WizardMouth under Knowledge spells
// AlterVoice under Body Control spells
NewSpells.SilverTongue = new Skill( "Silver Tongue", 'IQ', 2, libAbrv+174 );
NewSpells.SilverTongue.classes = { reg: true };
NewSpells.SilverTongue.stats = { duration: "1 min", castcost: 3, maintaincost: 2 };
NewPrerequisites.SilverTongue_requires_Voices         = { target: 'SilverTongue', prereq: 'Voices' };
NewPrerequisites.SilverTongue_requires_EmotionControl = { target: 'SilverTongue', prereq: 'EmotionControl' };
// EchoesofthePast under Knowledge spells
NewSpells.WizardEar = new Skill( "Wizard Ear", 'IQ', 2, libAbrv+174 );
NewSpells.WizardEar.classes = { reg: true };
NewSpells.WizardEar.stats = { duration: "1 min", castcost: 4, maintaincost: 3, time: 2 };
NewPrerequisites.WizardEar_requires_Apportation = { target: 'WizardEar', prereq: 'Apportation' };
NewPrerequisites.WizardEar_requires_FarHearing  = { target: 'WizardEar', prereq: 'FarHearing' };
NewPrerequisites.WizardEar_requires_SoundVision = { target: 'WizardEar', prereq: 'SoundVision' };
NewSpells.InvisibleWizardEar = new Skill( "Invisible Wizard Ear", 'IQ', 2, libAbrv+174 );
NewSpells.InvisibleWizardEar.classes = { reg: true };
NewSpells.InvisibleWizardEar.stats = { duration: "1 min", castcost: 5, maintaincost: 3, time: 4 };
NewPrerequisites.InvisibleWizardEar_requires_WizardEar    = { target: 'InvisibleWizardEar', prereq: 'WizardEar' };
NewPrerequisites.InvisibleWizardEar_requires_Invisibility = { target: 'InvisibleWizardEar', prereq: 'Invisibility' };


// Technological spells
/* LocalGroups
   is a hedge against the possibility that Groups is undefined. Note that if it is,
   lots of other shit in this library stops working. So probably unnecessary. */
var LocalGroups = {};
LocalGroups.MachineSpells = ['SeekMachine','RevealFunction','MachineControl','MachineSummoning',
'MachineSpeech','Glitch','Malfunction','Schematic','Rebuild','AnimateMachine','MachinePossession',
'PermanentMachinePossession','AwakenComputer'];
addToGroup("MachineSpells",LocalGroups.MachineSpells);
LocalGroups.EnergySpells = ['SeekPower','SeekFuel','TestFuel','PreserveFuel','PurifyFuel','CreateFuel',
'EssentialFuel','StopPower','LendPower','Propel','ConductPower','StealPower','DrawPower',
'MagneticVision','RadioHearing','SpectrumVision'];
addToGroup("EnergySpells",LocalGroups.EnergySpells);
LocalGroups.RadiationSpells = ['SeeRadiation','SeekRadiation','Irradiate','ExtinguishRadiation',
'ResistRadiation','CureRadiation','RadiationJet','BreatheRadiation'];
addToGroup("RadiationSpells",LocalGroups.RadiationSpells);
LocalGroups.MetalPlasticSpells = ['SeekPlastic','IdentifyMetal','IdentifyPlastic','ShapeMetal',
'ShapePlastic','MetalVision','PlasticVision','BodyofMetal','BodyofPlastic'];
addToGroup("MetalPlasticSpells",LocalGroups.MetalPlasticSpells);
addToGroup("TechnologicalSpells",
LocalGroups.MachineSpells.concat(LocalGroups.EnergySpells.concat(LocalGroups.RadiationSpells.concat(LocalGroups.MetalPlasticSpells))) );
// Machine spells sub-college:
NewSpells.SeekMachine = new Skill( "Seek Machine", 'IQ', 2, libAbrv+175 );
NewSpells.SeekMachine.TLs = true;
NewSpells.SeekMachine.classes = { info: true };
NewSpells.SeekMachine.stats = { castcost: 3, time: 10 };
NewSpells.RevealFunction = new Skill( "Reveal Function", 'IQ', 2, libAbrv+176 );
NewSpells.RevealFunction.TLs = true;
NewSpells.RevealFunction.classes = { info: true, rsp: true };
NewSpells.RevealFunction.stats = { castcost: 8, time: "10 min" };
NewPrerequisites.RevealFunction_requires_SeekMachine = { target: 'RevealFunction', prereq: 'SeekMachine' };
NewSpells.MachineControl = new Skill( "Machine Control", 'IQ', 2, libAbrv+176 );
NewSpells.MachineControl.TLs = true;
NewSpells.MachineControl.classes = { reg: true };
NewSpells.MachineControl.stats = { duration: "1 min", castcost: 6, maintaincost: 3 };
NewPrerequisites.MachineControl_requires_RevealFunction = { target: 'MachineControl', prereq: 'RevealFunction' };
NewPrerequisites.MachineControl_requires_Locksmith = { target: 'MachineControl', prereq: 'Locksmith' };
NewPrerequisites.MachineControl_requires_Lightning = { target: 'MachineControl', prereq: 'Lightning' };
NewSpells.MachineSummoning = new Skill( "Machine Summoning", 'IQ', 2, libAbrv+176 );
NewSpells.MachineSummoning.TLs = true;
NewSpells.MachineSummoning.classes = { reg: true };
NewSpells.MachineSummoning.stats = { duration: "1 min", castcost: 4, maintaincost: 2, time: 4 };
NewPrerequisites.MachineSummoning_requires_MachineControl = { target: 'MachineSummoning', prereq: 'MachineControl' };
NewSpells.MachineSpeech = new Skill( "Machine Speech", 'IQ', 2, libAbrv+176 );
NewSpells.MachineSpeech.TLs = true;
NewSpells.MachineSpeech.classes = { reg: true };
NewSpells.MachineSpeech.stats = { duration: "1 min", castcost: 5, maintaincost: 3 };
NewPrerequisites.MachineSpeech_requires_MachineSummoning = { target: 'MachineSpeech', prereq: 'MachineSummoning' };
NewSpells.Glitch = new Skill( "Glitch", 'IQ', 2, libAbrv+176 );
NewSpells.Glitch.TLs = true;
NewSpells.Glitch.classes = { reg: true, rht: true };
NewSpells.Glitch.stats = { castcost: 3 };
NewPrerequisites.Glitch_requires_MachineControl = { target: 'Glitch', prereq: 'MachineControl' };
NewSpells.Malfunction = new Skill( "Malfunction", 'IQ', 2, libAbrv+177 );
NewSpells.Malfunction.TLs = true;
NewSpells.Malfunction.classes = { melee: true, rht: true };
NewSpells.Malfunction.stats = { duration: "1 min", castcost: 5 };
NewPrerequisites.Malfunction_requires_Magery2 = { target: 'Malfunction', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.Malfunction_requires_Glitch  = { target: 'Malfunction', prereq: 'Glitch' };
NewSpells.Schematic = new Skill( "Schematic", 'IQ', 3, libAbrv+177 );
NewSpells.Schematic.TLs = true;
NewSpells.Schematic.classes = { info: true };
NewSpells.Schematic.stats = { duration: "1 min", castcost: "4 + 1/ton", maintaincost: "½ C2C", time: 5 };
NewPrerequisites.Schematic_requires_RevealFunction = { target: 'Schematic', prereq: 'RevealFunction' };
NewPrerequisites.Schematic_requires_History = { target: 'Schematic', prereq: 'HistorySpell' };
NewSpells.Rebuild = new Skill( "Rebuild", 'IQ', 3, libAbrv+177 );
NewSpells.Rebuild.TLs = true;
NewSpells.Rebuild.classes = { reg: true };
NewSpells.Rebuild.stats = { duration: "permanent", castcost: "29 + 1/500lbs", maintaincost: 2, time: "energy cost in seconds" };
NewPrerequisites.Rebuild_requires_Magery3 = { target: 'Rebuild', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.Rebuild_requires_Repair = { target: 'Rebuild', prereq: 'Repair' };
NewPrerequisites.Rebuild_requires_CreateObject = { target: 'Rebuild', prereq: 'CreateObject' };
NewPrerequisites.Rebuild_requires_3spellsfrom4elements = { target: 'Rebuild', number: 4, prereq: 'ElementalColleges', meta: true, mult: 3 };
//NewPrerequisites.Rebuild_requires_Schematic = { target: 'Rebuild', prereq: 'Schematic' };
NewSpells.AnimateMachine = new Skill( "Animate Machine", 'IQ', 3, libAbrv+177 );
NewSpells.AnimateMachine.TLs = true;
NewSpells.AnimateMachine.classes = { reg: true, rwi: true };
NewSpells.AnimateMachine.stats = { duration: "1 min", castcost: "8 + log₂(tons); min 8", maintaincost: "½ C2C", time: "energy cost in seconds" };
NewPrerequisites.AnimateMachine_requires_MachineControl_pgroup1 = { target: 'AnimateMachine', prereq: 'MachineControl', pgroup: 1 };
NewPrerequisites.AnimateMachine_requires_Animation_pgroup1      = { target: 'AnimateMachine', prereq: 'Animation',      pgroup: 1 };
NewPrerequisites.AnimateMachine_requires_MachineControl_pgroup2 = { target: 'AnimateMachine', prereq: 'MachineControl', pgroup: 2 };
NewPrerequisites.AnimateMachine_requires_AnimateObject_pgroup2  = { target: 'AnimateMachine', prereq: 'AnimateObject',  pgroup: 2 };
NewSpells.MachinePossession = new Skill( "Machine Possession", 'IQ', 2, libAbrv+178 );
NewSpells.MachinePossession.TLs = true;
NewSpells.MachinePossession.classes = { reg: true, rwi: true };
NewSpells.MachinePossession.stats = { duration: "1 min", castcost: 6, maintaincost: 2, time: 30 };
NewPrerequisites.MachinePossession_requires_MachineControl_pgroup1 = { target: 'MachinePossession', prereq: 'MachineControl', pgroup: 1 };
NewPrerequisites.MachinePossession_requires_RiderWithin_pgroup1    = { target: 'MachinePossession', prereq: 'RiderWithin',    pgroup: 1 };
NewPrerequisites.MachinePossession_requires_MachineControl_pgroup2 = { target: 'MachinePossession', prereq: 'MachineControl', pgroup: 2 };
NewPrerequisites.MachinePossession_requires_SoulRider_pgroup2      = { target: 'MachinePossession', prereq: 'SoulRider',      pgroup: 2 };
NewSpells.PermanentMachinePossession = new Skill( "Permanent Machine Possession", 'IQ', 3, libAbrv+178 );
NewSpells.PermanentMachinePossession.TLs = true;
NewSpells.PermanentMachinePossession.classes = { reg: true, rwi: true };
NewSpells.PermanentMachinePossession.stats = { duration: "indefinite", castcost: 30, time: "5 min" };
NewPrerequisites.PermanentMachinePossession_requires_Magery3 = { target: 'PermanentMachinePossession', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.PermanentMachinePossession_requires_MachinePossession = { target: 'PermanentMachinePossession', prereq: 'MachinePossession' };
NewSpells.AwakenComputer = new Skill( "Awaken Computer", 'IQ', 2, libAbrv+178 );
NewSpells.AwakenComputer.TLs = true;
NewSpells.AwakenComputer.classes = { reg: true };
NewSpells.AwakenComputer.stats = { duration: "1 hr", castcost: 8, maintaincost: 2, time: 10 };
NewPrerequisites.AwakenComputer_requires_Animation = { target: 'AwakenComputer', prereq: 'Animation' };
NewPrerequisites.AwakenComputer_requires_Wisdom = { target: 'AwakenComputer', prereq: 'Wisdom' };
// Energy spells sub-college:
NewSpells.SeekPower = new Skill( "Seek Power", 'IQ', 2, libAbrv+179 );
NewSpells.SeekPower.TLs = true;
NewSpells.SeekPower.classes = { info: true };
NewSpells.SeekPower.stats = { castcost: 3, time: 10 };
NewSpells.SeekFuel = new Skill( "Seek Fuel", 'IQ', 2, libAbrv+179 );
NewSpells.SeekFuel.TLs = true;
NewSpells.SeekFuel.classes = { info: true };
NewSpells.SeekFuel.stats = { castcost: 3, time: 10 };
NewSpells.TestFuel = new Skill( "Test Fuel", 'IQ', 2, libAbrv+179 );
NewSpells.TestFuel.TLs = true;
NewSpells.TestFuel.classes = { info: true };
NewSpells.TestFuel.stats = { castcost: "1/lb, 1/gal, or 3 for 1-yd radius area" };
NewSpells.PreserveFuel = new Skill( "Preserve Fuel", 'IQ', 2, libAbrv+179 );
NewSpells.PreserveFuel.TLs = true;
NewSpells.PreserveFuel.classes = { reg: true };
NewSpells.PreserveFuel.stats = { duration: "1 wk", castcost: "4/lb", maintaincost: "½ C2C" };
NewPrerequisites.PreserveFuel_requires_TestFuel = { target: 'PreserveFuel', prereq: 'TestFuel' };
NewSpells.PurifyFuel = new Skill( "Purify Fuel", 'IQ', 2, libAbrv+179 );
NewSpells.PurifyFuel.TLs = true;
NewSpells.PurifyFuel.classes = { reg: true };
NewSpells.PurifyFuel.stats = { castcost: "½/lb (min 1)" };
NewPrerequisites.PurifyFuel_requires_PurifyWater_pgroup1 = { target: 'PurifyFuel', prereq: 'PurifyWater', pgroup: 1 };
NewPrerequisites.PurifyFuel_requires_Decay_pgroup1       = { target: 'PurifyFuel', prereq: 'Decay',       pgroup: 1 };
NewSpells.CreateFuel = new Skill( "Create Fuel", 'IQ', 2, libAbrv+179 );
NewSpells.CreateFuel.TLs = true;
NewSpells.CreateFuel.classes = { reg: true };
NewSpells.CreateFuel.stats = { duration: "permanent", castcost: "1/TL-lb (min 1)", time: 30 };
NewPrerequisites.CreateFuel_requires_SeekPower = { target: 'CreateFuel', prereq: 'SeekPower' };
NewPrerequisites.CreateFuel_requires_2TransmutationSpells = { target: 'CreateFuel', number: 2, prereq: 'TransmutationSpells' };   // what are Transmutation spells??
NewSpells.EssentialFuel = new Skill( "Essential Fuel", 'IQ', 2, libAbrv+179 );
NewSpells.EssentialFuel.TLs = true;
NewSpells.EssentialFuel.classes = { reg: true };
NewSpells.EssentialFuel.stats = { duration: "permanent", castcost: "1/lb", time: 10 };
NewPrerequisites.EssentialFuel_requires_6EnergySpells = { target: 'EssentialFuel', number: 6, prereq: 'EnergySpells' };
NewSpells.StopPower = new Skill( "Stop Power", 'IQ', 2, libAbrv+179 );
NewSpells.StopPower.TLs = true;
NewSpells.StopPower.classes = { area: true };
NewSpells.StopPower.stats = { duration: "1 min", castcost: 3, maintaincost: "½ C2C", time: 3 };
NewPrerequisites.StopPower_requires_Magery1 = { target: 'StopPower', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.StopPower_requires_SeekPower = { target: 'StopPower', prereq: 'SeekPower' };
NewSpells.LendPower = new Skill( "Lend Power", 'IQ', 2, libAbrv+180 );
NewSpells.LendPower.TLs = true;
NewSpells.LendPower.classes = { reg: true };
NewSpells.LendPower.stats = { duration: "indefinite", castcost: "10/kWh (see "+libAbrv+"178-9)" };
NewPrerequisites.LendPower_requires_Magery2 = { target: 'LendPower', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.LendPower_requires_SeekPower = { target: 'LendPower', prereq: 'SeekPower' };
NewSpells.Propel = new Skill( "Propel", 'IQ', 2, libAbrv+180 );
NewSpells.Propel.TLs = true;
NewSpells.Propel.classes = { reg: true };
NewSpells.Propel.stats = { duration: "10 min", castcost: "see formula, "+libAbrv+"180)", maintaincost: "same" };
NewPrerequisites.Propel_requires_CreateFuel = { target: 'Propel', prereq: 'CreateFuel' };
NewPrerequisites.Propel_requires_DancingObject = { target: 'Propel', prereq: 'DancingObject' };
NewSpells.ConductPower = new Skill( "Conduct Power", 'IQ', 3, libAbrv+180 );
NewSpells.ConductPower.TLs = true;
NewSpells.ConductPower.classes = { spcl: true };
NewSpells.ConductPower.stats = { duration: "1 min", castcost: "—", maintaincost: 1 };
NewPrerequisites.ConductPower_requires_Magery1 = { target: 'ConductPower', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.ConductPower_requires_SeekPower = { target: 'ConductPower', prereq: 'SeekPower' };
NewSpells.StealPower = new Skill( "Steal Power", 'IQ', 3, libAbrv+180 );
NewSpells.StealPower.TLs = true;
NewSpells.StealPower.classes = { reg: true };
NewSpells.StealPower.stats = { castcost: "restored FP = <skill>% of source power potential", time: 5 };
NewPrerequisites.StealPower_requires_Magery2 = { target: 'StealPower', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.StealPower_requires_MinorHealing = { target: 'StealPower', prereq: 'MinorHealing' };
NewPrerequisites.StealPower_requires_ConductPower = { target: 'StealPower', prereq: 'ConductPower' };
NewSpells.DrawPower = new Skill( "Draw Power", 'IQ', 3, libAbrv+180 );
NewSpells.DrawPower.TLs = true;
NewSpells.DrawPower.classes = { spcl: true };
NewSpells.DrawPower.stats = { duration: "1 min", castcost: "—", maintaincost: 1 };
NewPrerequisites.DrawPower_requires_StealPower = { target: 'DrawPower', prereq: 'StealPower' };
NewPrerequisites.DrawPower_requires_2spellsfrom10colleges = { target: 'DrawPower', number: 10, prereq: 'MagicColleges', meta: true, mult: 2 };
NewSpells.MagneticVision = new Skill( "Magnetic Vision", 'IQ', 2, libAbrv+181 );
NewSpells.MagneticVision.classes = { reg: true };
NewSpells.MagneticVision.stats = { duration: "1 min", castcost: 2, maintaincost: 1 };
NewPrerequisites.MagneticVision_requires_KeenVision = { target: 'MagneticVision', prereq: 'KeenVision' };
NewSpells.RadioHearing = new Skill( "Radio Hearing", 'IQ', 2, libAbrv+181 );
NewSpells.RadioHearing.classes = { reg: true };
NewSpells.RadioHearing.stats = { duration: "1 min", castcost: 2, maintaincost: 1 };
NewPrerequisites.RadioHearing_requires_KeenHearing = { target: 'RadioHearing', prereq: 'KeenHearing' };
NewSpells.SpectrumVision = new Skill( "Spectrum Vision", 'IQ', 3, libAbrv+181 );
NewSpells.SpectrumVision.classes = { reg: true };
NewSpells.SpectrumVision.stats = { duration: "1 min", castcost: 4, maintaincost: "same" };
NewPrerequisites.SpectrumVision_requires_Infravision = { target: 'SpectrumVision', prereq: 'Infravision' };
// Radiation spells sub-college
NewSpells.SeeRadiation = new Skill( "See Radiation", 'IQ', 2, libAbrv+181 );
NewSpells.SeeRadiation.classes = { reg: true };
NewSpells.SeeRadiation.stats = { duration: "1 min", castcost: 3, maintaincost: 2 };
NewSpells.SeekRadiation = new Skill( "Seek Radiation", 'IQ', 2, libAbrv+181 );
NewSpells.SeekRadiation.classes = { info: true };
NewSpells.SeekRadiation.stats = { castcost: 3, time: 10 };
NewPrerequisites.SeekRadiation_requires_SeeRadiation = { target: 'SeekRadiation', prereq: 'SeeRadiation' };
NewSpells.Irradiate = new Skill( "Irradiate", 'IQ', 2, libAbrv+181 );
NewSpells.Irradiate.classes = { area: true };
NewSpells.Irradiate.stats = { duration: "1 hr", castcost: "1 per 10rads/hr", maintaincost: "½ C2C" };
NewPrerequisites.Irradiate_requires_2Earth = { target: 'Irradiate', number: 2, prereq: 'EarthSpells' };
NewPrerequisites.Irradiate_requires_2Fire  = { target: 'Irradiate', number: 2, prereq: 'FireSpells' };
NewSpells.ExtinguishRadiation = new Skill( "Extinguish Radiation", 'IQ', 3, libAbrv+181 );
NewSpells.ExtinguishRadiation.classes = { reg: true };
NewSpells.ExtinguishRadiation.stats = { duration: "permanent", castcost: "1 per 10rads/hr" };
NewPrerequisites.ExtinguishRadiation_requires_Magery2 = { target: 'ExtinguishRadiation', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.ExtinguishRadiation_requires_ExtinguishFire = { target: 'ExtinguishRadiation', prereq: 'ExtinguishFire' };
NewPrerequisites.ExtinguishRadiation_requires_EarthtoAir = { target: 'ExtinguishRadiation', prereq: 'EarthtoAir' };
NewPrerequisites.ExtinguishRadiation_requires_Irradiate = { target: 'ExtinguishRadiation', prereq: 'Irradiate' };
NewSpells.ResistRadiation = new Skill( "Resist Radiation", 'IQ', 2, libAbrv+182 );
NewSpells.ResistRadiation.classes = { reg: true };
NewSpells.ResistRadiation.stats = { duration: "1 min", castcost: "log(PF), i.e., 1 for PF10, 2 for PF100, 3 for PF1000 (see pg B436)", maintaincost: "½ C2C" };
NewPrerequisites.ResistRadiation_requires_3RadiationSpells  = { target: 'ResistRadiation', number: 3, prereq: 'RadiationSpells' };
NewSpells.CureRadiation = new Skill( "Cure Radiation", 'IQ', 3, libAbrv+182 );
NewSpells.CureRadiation.classes = { reg: true };
NewSpells.CureRadiation.stats = { duration: "permanent", castcost: "1/10rads removed (min 5)", time: 30 };
NewPrerequisites.CureRadiation_requires_ResistRadiation = { target: 'CureRadiation', prereq: 'ResistRadiation' };
NewPrerequisites.CureRadiation_requires_MajorHealing = { target: 'CureRadiation', prereq: 'MajorHealing' };
NewSpells.RadiationJet = new Skill( "Radiation Jet", 'IQ', 2, libAbrv+182 );
NewSpells.RadiationJet.classes = { reg: true };
NewSpells.RadiationJet.stats = { duration: "1 sec", castcost: "1 to 3", maintaincost: "same", notes: "The jet inflicts 10 rads per point of energy in the spell to a human-sized target. The jet has range equal to energy spent." };
NewPrerequisites.RadiationJet_requires_Irradiate = { target: 'RadiationJet', prereq: 'Irradiate' };
NewPrerequisites.RadiationJet_requires_ResistRadiation = { target: 'RadiationJet', prereq: 'ResistRadiation' };
NewSpells.BreatheRadiation = new Skill( "Breathe Radiation", 'IQ', 3, libAbrv+182 );
NewSpells.BreatheRadiation.classes = { reg: true };
NewSpells.BreatheRadiation.stats = { duration: "1 sec", castcost: "1 to 4", time: 2, notes: "The jet inflicts 10 rads per point of energy in the spell to a human-sized target. The jet has range equal to energy spent." };
NewPrerequisites.BreatheRadiation_requires_Magery2 = { target: 'BreatheRadiation', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.BreatheRadiation_requires_RadiationJet = { target: 'BreatheRadiation', prereq: 'RadiationJet' };
// Metal and Plastic spells sub-college
NewSpells.SeekPlastic = new Skill( "Seek Plastic", 'IQ', 2, libAbrv+182 );
NewSpells.SeekPlastic.classes = { info: true };
NewSpells.SeekPlastic.stats = { castcost: 3, time: 10 };
NewSpells.IdentifyMetal = new Skill( "Identify Metal", 'IQ', 2, libAbrv+182 );
NewSpells.IdentifyMetal.classes = { info: true };
NewSpells.IdentifyMetal.stats = { castcost: 1 };
NewPrerequisites.IdentifyMetal_requires_SeekEarth = { target: 'IdentifyMetal', prereq: 'SeekEarth' };
NewSpells.IdentifyPlastic = new Skill( "Identify Plastic", 'IQ', 2, libAbrv+182 );
NewSpells.IdentifyPlastic.classes = { info: true };
NewSpells.IdentifyPlastic.stats = { castcost: 1 };
NewPrerequisites.IdentifyPlastic_requires_SeekPlastic = { target: 'IdentifyPlastic', prereq: 'SeekPlastic' };
NewSpells.ShapeMetal = new Skill( "Shape Metal", 'IQ', 2, libAbrv+182 );
NewSpells.ShapeMetal.classes = { reg: true };
NewSpells.ShapeMetal.stats = { duration: "1 min", castcost: "6 (4 for soft metal)", maintaincost: "½ C2C" };
NewPrerequisites.ShapeMetal_requires_Magery1 = { target: 'ShapeMetal', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.ShapeMetal_requires_ShapeEarth_pgroup1  = { target: 'ShapeMetal', prereq: 'ShapeEarth',                     pgroup: 1 };
NewPrerequisites.ShapeMetal_requires_6TechSpells_pgroup1 = { target: 'ShapeMetal', prereq: 'TechnologicalSpells', number: 6, pgroup: 1 };
NewSpells.ShapePlastic = new Skill( "Shape Plastic", 'IQ', 2, libAbrv+183 );
NewSpells.ShapePlastic.classes = { reg: true };
NewSpells.ShapePlastic.stats = { duration: "1 min", castcost: 6, maintaincost: 3 };
NewPrerequisites.ShapePlastic_requires_Magery1 = { target: 'ShapePlastic', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.ShapePlastic_requires_ShapePlant_pgroup1  = { target: 'ShapePlastic', prereq: 'ShapePlant',                     pgroup: 1 };
NewPrerequisites.ShapePlastic_requires_6TechSpells_pgroup1 = { target: 'ShapePlastic', prereq: 'TechnologicalSpells', number: 6, pgroup: 1 };
NewSpells.MetalVision = new Skill( "Metal Vision", 'IQ', 2, libAbrv+183 );
NewSpells.MetalVision.classes = { reg: true };
NewSpells.MetalVision.stats = { duration: "30 sec", castcost: "2/5yds depth (max 50 yds)", maintaincost: "same" };
NewPrerequisites.MetalVision_requires_ShapeMetal = { target: 'MetalVision', prereq: 'ShapeMetal' };
NewSpells.PlasticVision = new Skill( "Plastic Vision", 'IQ', 2, libAbrv+183 );
NewSpells.PlasticVision.classes = { reg: true };
NewSpells.PlasticVision.stats = { duration: "30 sec", castcost: "2/5yds depth (max 50 yds)", maintaincost: "same" };
NewPrerequisites.PlasticVision_requires_ShapePlastic = { target: 'PlasticVision', prereq: 'ShapePlastic' };
NewSpells.BodyofMetal = new Skill( "Body of Metal", 'IQ', 3, libAbrv+183 );
NewSpells.BodyofMetal.classes = { reg: true, rht: true };
NewSpells.BodyofMetal.stats = { duration: "1 min", castcost: 12, maintaincost: 6, time: 5 };
NewPrerequisites.BodyofMetal_requires_Magery2 = { target: 'BodyofMetal', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.BodyofMetal_requires_ShapeMetal = { target: 'BodyofMetal', prereq: 'ShapeMetal' };
NewSpells.BodyofPlastic = new Skill( "Body of Plastic", 'IQ', 3, libAbrv+183 );
NewSpells.BodyofPlastic.classes = { reg: true, rht: true };
NewSpells.BodyofPlastic.stats = { duration: "1 min", castcost: 10, maintaincost: 5, time: 5 };
NewPrerequisites.BodyofPlastic_requires_Magery2 = { target: 'BodyofPlastic', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.BodyofPlastic_requires_ShapePlastic = { target: 'BodyofPlastic', prereq: 'ShapePlastic' };


addToGroup("WaterSpells",
['SeekWater','SeekCoastline','PurifyWater','CreateWater','DestroyWater','IcyWeapon','ShapeWater',
'Frost','Umbrella','BodyofWater','FoulWater','Freeze','Fog','IceSlick','IceSphere','IcyMissiles',
'MeltIce','ResistWater','SnowShoes','WalkonWater','Waves','WaterJet','WaterVision','Whirlpool',
'Coolness','CreateIce','Dehydrate','IceDagger','IcyTouch','WalkThroughWater','DrySpring',
'EarthtoWater','EssentialWater','Frostbite','SnowJet','BreatheWater','BreatheAir','Swim',
'BodyofIce','BoilWater','CondenseSteam','CreateAcid','CreateSpring','Current','Tide','FleshtoIce',
'CreateSteam','Distill','ResistAcid','SummonWaterElemental','ControlWaterElemental',
'CreateWaterElemental','Rain','Snow','Hail','MudJet','Geyser','RainofAcid','SteamJet','AcidBall',
'AcidJet','RainofIceDaggers','Storm','IcyBreath','BreatheSteam','SpitAcid','EssentialAcid']);
NewSpells.SeekWater = new Skill( "Seek Water", 'IQ', 2, libAbrv+184 );
NewSpells.SeekWater.classes = { info: true };
NewSpells.SeekWater.stats = { castcost: 2 };
NewSpells.SeekCoastline = new Skill( "Seek Coastline", 'IQ', 2, libAbrv+184 );
NewSpells.SeekCoastline.classes = { info: true };
NewSpells.SeekCoastline.stats = { castcost: 3, time: 10 };
NewPrerequisites.SeekCoastline_requires_SeekWater = { target: 'SeekCoastline', prereq: 'SeekWater' };
NewSpells.PurifyWater = new Skill( "Purify Water", 'IQ', 2, libAbrv+184 );
NewSpells.PurifyWater.classes = { spcl: true };
NewSpells.PurifyWater.stats = { time: 'time required to pour water through ring', castcost: '1/gal', duration: 'Purified water stays pure unless re-contaminated.', notes: 'Usually 5 to 10 seconds per gallon, unless a large container and ring are used.' };
NewPrerequisites.PurifyWater_requires_SeekWater = { target: 'PurifyWater', prereq: 'SeekWater' };
NewSpells.CreateWater = new Skill( "Create Water", 'IQ', 2, libAbrv+184 );
NewSpells.CreateWater.classes = { reg: true };
NewSpells.CreateWater.stats = { castcost: '2/gal', duration: 'permanent' };
NewPrerequisites.CreateWater_requires_PurifyWater = { target: 'CreateWater', prereq: 'PurifyWater' };
NewSpells.DestroyWater = new Skill( "Destroy Water", 'IQ', 2, libAbrv+185 );
NewSpells.DestroyWater.classes = { area: true };
NewSpells.DestroyWater.stats = { castcost: 3, maintaincost: "same", duration: 'permanent', notes: 'In deep water, a hex is only 2 yards deep.' };
NewPrerequisites.DestroyWater_requires_CreateWater = { target: 'DestroyWater', prereq: 'CreateWater' };
NewSpells.IcyWeapon = new Skill( "Icy Weapon", 'IQ', 2, libAbrv+185 );
NewSpells.IcyWeapon.classes = { reg: true };
NewSpells.IcyWeapon.stats = { duration: '1 min', castcost: 3, maintaincost: 1, time: 3 };
NewPrerequisites.IcyWeapon_requires_CreateWater = { target: 'IcyWeapon', prereq: 'CreateWater' };
NewSpells.ShapeWater = new Skill( "Shape Water", 'IQ', 2, libAbrv+185 );
NewSpells.ShapeWater.classes = { reg: true };
NewSpells.ShapeWater.stats = { duration: "1 min", castcost: "1/20 gal", maintaincost: "same", time: 2 };
NewPrerequisites.ShapeWater_requires_CreateWater = { target: 'ShapeWater', prereq: 'CreateWater' };
// Frost under Weather spells
NewSpells.Umbrella = new Skill( "Umbrella", 'IQ', 2, libAbrv+185 );
NewSpells.Umbrella.classes = { reg: true };
NewSpells.Umbrella.stats = { duration: "10 min", castcost: 1, time: 2 };
NewPrerequisites.Umbrella_requires_ShapeWater_pgroup1  = { target: 'Umbrella', prereq: 'ShapeWater',  pgroup: 1 };
NewPrerequisites.Umbrella_requires_ShieldSpell_pgroup1 = { target: 'Umbrella', prereq: 'ShieldSpell', pgroup: 1 };
NewSpells.BodyofWater = new Skill( "Body of Water", 'IQ', 2, libAbrv+185 );
NewSpells.BodyofWater.classes = { reg: true, rht: true };
NewSpells.BodyofWater.stats = { duration: "1 min", castcost: 5, maintaincost: 2, time: 5 };
NewPrerequisites.BodyofWater_requires_ShapeWater = { target: 'BodyofWater', prereq: 'ShapeWater' };
NewSpells.FoulWater = new Skill( "Foul Water", 'IQ', 2, libAbrv+185 );
NewSpells.FoulWater.classes = { area: true };
NewSpells.FoulWater.stats = { castcost: 3 };
NewPrerequisites.FoulWater_requires_PurifyWater = { target: 'FoulWater', prereq: 'PurifyWater' };
NewPrerequisites.FoulWater_requires_Decay       = { target: 'FoulWater', prereq: 'Decay' };
NewSpells.Freeze = new Skill( "Freeze", 'IQ', 2, libAbrv+185 );
NewSpells.Freeze.classes = { reg: true };
NewSpells.Freeze.stats = { duration: "10 min, or until it melts", castcost: "2-6, or 3/yd&sup3;", time: 10, notes: "2 for an object up to the size of a fist, 4 for up to a cubic foot, 6 for a cubic yard" };
NewPrerequisites.Freeze_requires_ShapeWater = { target: 'Freeze', prereq: 'ShapeWater' };
// Fog under Weather spells
NewSpells.IceSlick = new Skill( "Ice Slick", 'IQ', 2, libAbrv+186 );
NewSpells.IceSlick.classes = { area: true };
NewSpells.IceSlick.stats = { duration: "until it melts", castcost: 3, time: "2 sec/yd radius" };
NewPrerequisites.IceSlick_requires_Frost = { target: 'IceSlick', prereq: 'Frost' };
NewSpells.IceSphere = new Skill( "Ice Sphere", 'IQ', 2, libAbrv+186 );
NewSpells.IceSphere.classes = { msl: true };
NewSpells.IceSphere.stats = { castcost: 'up to Magery/sec; max 3 seconds', time: '1-3', notes: "The sphere does 1 die damage per point of energy." };
NewPrerequisites.IceSphere_requires_ShapeWater = { target: 'IceSphere', prereq: 'ShapeWater' };
NewSpells.IcyMissiles = new Skill( "Icy Missiles", 'IQ', 2, libAbrv+186 );
NewSpells.IcyMissiles.classes = { reg: true };
NewSpells.IcyMissiles.stats = { duration: "1 min", castcost: 4, maintaincost: 2, time: 3 };
NewPrerequisites.IcyMissiles_requires_IcyWeapon = { target: 'IcyMissiles', prereq: 'IcyWeapon' };
NewSpells.MeltIce = new Skill( "Melt Ice", 'IQ', 2, libAbrv+186 );
NewSpells.MeltIce.classes = { area: true };
NewSpells.MeltIce.stats = { duration: "10 min if below freezing", castcost: "1, min 2", maintaincost: "same", time: 10 };
NewPrerequisites.MeltIce_requires_Heat_pgroup1   = { target: 'MeltIce', prereq: 'Heat',   pgroup: 1 };
NewPrerequisites.MeltIce_requires_Freeze_pgroup1 = { target: 'MeltIce', prereq: 'Freeze', pgroup: 1 };
NewSpells.ResistWater = new Skill( "Resist Water", 'IQ', 2, libAbrv+186 );
NewSpells.ResistWater.classes = { reg: true };
NewSpells.ResistWater.stats = { duration: "1 min", castcost: 2, maintaincost: 1 };
NewPrerequisites.ResistWater_requires_ShapeWater_pgroup1 = { target: 'ResistWater', prereq: 'ShapeWater', pgroup: 1 };
NewPrerequisites.ResistWater_requires_Umbrella_pgroup1   = { target: 'ResistWater', prereq: 'Umbrella', pgroup: 1 };
NewPrerequisites.ResistWater_requires_DestroyWater_pgroup2 = { target: 'ResistWater', prereq: 'DestroyWater', pgroup: 2 };
NewPrerequisites.ResistWater_requires_Umbrella_pgroup2     = { target: 'ResistWater', prereq: 'Umbrella', pgroup: 2 };
NewSpells.SnowShoes = new Skill( "Snow Shoes", 'IQ', 2, libAbrv+186 );
NewSpells.SnowShoes.classes = { reg: true };
NewSpells.SnowShoes.stats = { duration: "1 min", castcost: 2, maintaincost: 1, time: 2 };
NewPrerequisites.SnowShoes_requires_ShapeWater = { target: 'SnowShoes', prereq: 'ShapeWater' };
NewSpells.WalkonWater = new Skill( "Walk on Water", 'IQ', 2, libAbrv+186 );
NewSpells.WalkonWater.classes = { reg: true };
NewSpells.WalkonWater.stats = { duration: "1 min", castcost: 3, maintaincost: 2, time: 4 };
NewPrerequisites.WalkonWater_requires_ShapeWater = { target: 'WalkonWater', prereq: 'ShapeWater' };
// Waves under Weather spells
NewSpells.WaterJet = new Skill( "Water Jet", 'IQ', 2, libAbrv+187 );
NewSpells.WaterJet.classes = { reg: true };
NewSpells.WaterJet.stats = { duration: "1 sec", castcost: '1-3', notes: "The jet does 1 die damage per point of energy. The jet has range equal to energy spent." };
NewPrerequisites.WaterJet_requires_ShapeWater = { target: 'WaterJet', prereq: 'ShapeWater' };
NewSpells.WaterVision = new Skill( "Water Vision", 'IQ', 2, libAbrv+187 );
NewSpells.WaterVision.classes = { info: true };
NewSpells.WaterVision.stats = { duration: "30 sec", castcost: "1/20 yds of depth (max 200 yds)", maintaincost: "same" };
NewPrerequisites.WaterVision_requires_ShapeWater = { target: 'WaterVision', prereq: 'ShapeWater' };
NewSpells.Whirlpool = new Skill( "Whirlpool", 'IQ', 2, libAbrv+187 );
NewSpells.Whirlpool.classes = { area: true };
NewSpells.Whirlpool.stats = { duration: "1 min + radius sec", castcost: 2, maintaincost: "½ C2C", time: "radius secs" };
NewPrerequisites.Whirlpool_requires_ShapeWater = { target: 'Whirlpool', prereq: 'ShapeWater' };
NewSpells.Coolness = new Skill( "Coolness", 'IQ', 2, libAbrv+187 );
NewSpells.Coolness.classes = { reg: true };
NewSpells.Coolness.stats = { duration: "1 hr", castcost: 2, maintaincost: 1, time: 10 };
NewPrerequisites.Coolness_requires_Cold = { target: 'Coolness', prereq: 'Cold' };
NewSpells.CreateIce = new Skill( "Create Ice", 'IQ', 2, libAbrv+188 );
NewSpells.CreateIce.classes = { reg: true };
NewSpells.CreateIce.stats = { duration: "until it melts", castcost: "2/gal" };
NewPrerequisites.CreateIce_requires_Freeze = { target: 'CreateIce', prereq: 'Freeze' };
NewSpells.Dehydrate = new Skill( "Dehydrate", 'IQ', 2, libAbrv+188 );
NewSpells.Dehydrate.classes = { reg: true, rht: true };
NewSpells.Dehydrate.stats = { duration: "permanent", castcost: "1/1d-1 damage; max 3", time: 2 };
NewPrerequisites.Dehydrate_requires_5Water       = { target: 'Dehydrate', number: 5, prereq: 'Water' };
NewPrerequisites.Dehydrate_requires_DestroyWater = { target: 'Dehydrate', prereq: 'DestroyWater' };
NewSpells.IceDagger = new Skill( "Ice Dagger", 'IQ', 2, libAbrv+188 );
NewSpells.IceDagger.classes = { msl: true };
NewSpells.IceDagger.stats = { castcost: 'up to Magery/sec; max 3 seconds', time: "1-3", notes: "1d-1 imp damage per energy spent" };
NewPrerequisites.IceDagger_requires_IceSphere_pgroup1 = { target: 'IceDagger', prereq: 'IceSphere', pgroup: 1 };
NewPrerequisites.IceDagger_requires_WaterJet_pgroup1  = { target: 'IceDagger', prereq: 'WaterJet',  pgroup: 1 };
NewSpells.IcyTouch = new Skill( "Icy Touch", 'IQ', 2, libAbrv+188 );
NewSpells.IcyTouch.classes = { melee: true };
NewSpells.IcyTouch.stats = { duration: "10 min if above freezing", castcost: "2/&frac14; inch ice", maintaincost: "same", time: "1/&frac14; inch ice" };
NewPrerequisites.IcyTouch_requires_Magery1 = { target: 'IcyTouch', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.IcyTouch_requires_4Water  = { target: 'IcyTouch', prereq: 'Water', number: 4 };
NewSpells.WalkThroughWater = new Skill( "Walk Through Water", 'IQ', 2, libAbrv+188 );
NewSpells.WalkThroughWater.classes = { reg: true };
NewSpells.WalkThroughWater.stats = { duration: "1 sec", castcost: 4, maintaincost: 3, time: 3 };
NewPrerequisites.WalkThroughWater_requires_Magery1    = { target: 'WalkThroughWater', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.WalkThroughWater_requires_ShapeWater = { target: 'WalkThroughWater', prereq: 'ShapeWater' };
NewSpells.DrySpring = new Skill( "Dry Spring", 'IQ', 2, libAbrv+188 );
NewSpells.DrySpring.classes = { reg: true };
NewSpells.DrySpring.stats = { duration: "permanent", castcost: "3× gal/hr reduction in flow", time: "1 min" };
NewPrerequisites.DrySpring_requires_DestroyWater = { target: 'DrySpring', prereq: 'DestroyWater' };
NewPrerequisites.DrySpring_requires_ShapeEarth   = { target: 'DrySpring', prereq: 'ShapeEarth' };
// EarthtoWater under Earth spells
NewSpells.EssentialWater = new Skill( "Essential Water", 'IQ', 2, libAbrv+189 );
NewSpells.EssentialWater.classes = { reg: true };
NewSpells.EssentialWater.stats = { duration: "permanent", castcost: "3/gal" };
NewPrerequisites.EssentialWater_requires_6Water = { target: 'EssentialWater', number: 6, prereq: 'Water' };
NewSpells.Frostbite = new Skill( "Frostbite", 'IQ', 2, libAbrv+189 );
NewSpells.Frostbite.classes = { reg: true, rht: true };
NewSpells.Frostbite.stats = { duration: "permanent", castcost: "1/1d damage; max 3", time: 3 };
NewPrerequisites.Frostbite_requires_Frost  = { target: 'Frostbite', prereq: 'Frost' };
NewPrerequisites.Frostbite_requires_Freeze = { target: 'Frostbite', prereq: 'Freeze' };
NewSpells.SnowJet = new Skill( "Snow Jet", 'IQ', 2, libAbrv+189 );
NewSpells.SnowJet.classes = { reg: true };
NewSpells.SnowJet.stats = { duration: "1 sec", castcost: '1-3', maintaincost: "same", notes: "The jet does 1 die knockback per point of energy. The jet has range equal to energy spent." };
NewPrerequisites.SnowJet_requires_WaterJet  = { target: 'SnowJet', prereq: 'WaterJet' };
NewPrerequisites.SnowJet_requires_Freeze    = { target: 'SnowJet', prereq: 'Freeze' };
NewSpells.BreatheWater = new Skill( "Breathe Water", 'IQ', 2, libAbrv+189 );
NewSpells.BreatheWater.classes = { reg: true };
NewSpells.BreatheWater.stats   = { duration: '1 min', castcost: 4, maintaincost: 2 };
NewPrerequisites.BreatheWater_requires_CreateAir    = { target: 'BreatheWater', prereq: 'CreateAir' };
NewPrerequisites.BreatheWater_requires_DestroyWater = { target: 'BreatheWater', prereq: 'DestroyWater' };
// BreatheAir under Air spells
// Swim under Movement spells
NewSpells.BodyofIce = new Skill( "Body of Ice", 'IQ', 3, libAbrv+189 );
NewSpells.BodyofIce.classes = { reg: true, rht: true };
NewSpells.BodyofIce.stats = { duration: "1 min", castcost: 7, maintaincost: 3, time: 5 };
NewPrerequisites.BodyofIce_requires_Magery2     = { target: 'BodyofIce', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.BodyofIce_requires_BodyofWater = { target: 'BodyofIce', prereq: 'BodyofWater' };
NewPrerequisites.BodyofIce_requires_Freeze      = { target: 'BodyofIce', prereq: 'Freeze' };
NewSpells.BoilWater = new Skill( "Boil Water", 'IQ', 2, libAbrv+189 );
NewSpells.BoilWater.classes = { reg: true };
NewSpells.BoilWater.stats = { duration: "permanent", castcost: "2-6, or 3/&#8531;yd&sup3;", time: 10, notes: "Costs 2 for a fist-sized quantity of water (makes about a hex of steam), 4 for a cubic foot's worth (makes about 40 cubic yards of steam), 6 for a square yard of water to a foot's depth (makes about 400 cubic yards of steam), 3 for each additional third of a cubic yard." };
NewPrerequisites.BoilWater_requires_ShapeWater = { target: 'BoilWater', prereq: 'ShapeWater' };
NewPrerequisites.BoilWater_requires_Heat       = { target: 'BoilWater', prereq: 'Heat' };
NewSpells.CondenseSteam = new Skill( "Condense Steam", 'IQ', 2, libAbrv+189 );
NewSpells.CondenseSteam.classes = { area: true };
NewSpells.CondenseSteam.stats = { duration: "permanent", castcost: "1 (min 2)", time: 10 };
NewPrerequisites.CondenseSteam_requires_Cold_pgroup1      = { target: 'CondenseSteam', prereq: 'Cold',      pgroup: 1 };
NewPrerequisites.CondenseSteam_requires_BoilWater_pgroup1 = { target: 'CondenseSteam', prereq: 'BoilWater', pgroup: 1 };
NewSpells.CreateAcid = new Skill( "Create Acid", 'IQ', 2, libAbrv+190 );
NewSpells.CreateAcid.classes = { reg: true };
NewSpells.CreateAcid.stats = { duration: "permanent", castcost: "4/gal", time: 2 };
NewPrerequisites.CreateAcid_requires_CreateWater = { target: 'CreateAcid', prereq: 'CreateWater' };
NewPrerequisites.CreateAcid_requires_CreateEarth = { target: 'CreateAcid', prereq: 'CreateEarth' };
NewSpells.CreateSpring = new Skill( "Create Spring", 'IQ', 2, libAbrv+190 );
NewSpells.CreateSpring.classes = { reg: true };
NewSpells.CreateSpring.stats = { duration: "permanent", castcost: "5x gal/hr increase in flow", time: "1 min" };
NewPrerequisites.CreateSpring_requires_DrySpring  = { target: 'CreateSpring', prereq: 'DrySpring' };
NewPrerequisites.CreateSpring_requires_ShapeWater = { target: 'CreateSpring', prereq: 'ShapeWater' };
// Current under Weather spells
// Tide under Weather spells
NewSpells.FleshtoIce = new Skill( "Flesh to Ice", 'IQ', 3, libAbrv+190 );
NewSpells.FleshtoIce.classes = { reg: true, rht: true };
NewSpells.FleshtoIce.stats = { duration: "permanent", castcost: 12, maintaincost: 3, time: 2 };
NewPrerequisites.FleshtoIce_requires_Magery1     = { target: 'FleshtoIce', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.FleshtoIce_requires_Frostbite   = { target: 'FleshtoIce', prereq: 'Frostbite' };
NewPrerequisites.FleshtoIce_requires_BodyofWater = { target: 'FleshtoIce', prereq: 'BodyofWater' };
NewSpells.CreateSteam = new Skill( "Create Steam", 'IQ', 2, libAbrv+190 );
NewSpells.CreateSteam.classes = { area: true };
NewSpells.CreateSteam.stats = { duration: "up to 5 min (min 10 sec)", castcost: 2, notes: "Duration depends on windiness." };
NewPrerequisites.CreateSteam_requires_BoilWater = { target: 'CreateSteam', prereq: 'BoilWater' };
// Distill under Food spells
NewSpells.ResistAcid = new Skill( "Resist Acid", 'IQ', 2, libAbrv+190 );
NewSpells.ResistAcid.classes = { reg: true };
NewSpells.ResistAcid.stats = { duration: "1 min", castcost: 2, maintaincost: "½ C2C", notes: "costs 6 to resist Essential Acid" };
NewPrerequisites.ResistAcid_requires_CreateAcid = { target: 'ResistAcid', prereq: 'CreateAcid' };
NewSpells.SummonWaterElemental = new Skill( "Summon Water Elemental", 'IQ', 2, libAbrv+190 );
NewSpells.SummonWaterElemental.classes = { spcl: true };
NewSpells.SummonWaterElemental.stats = { duration: '1 hr', castcost: '1/10 CP total, min 4', time: 30, notes: 'GM rolls 2d for minutes to appear.  Cannot be maintained.' };
NewPrerequisites.SummonWaterElemental_requires_Magery1                      = { target: 'SummonWaterElemental', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.SummonWaterElemental_requires_4Water                       = { target: 'SummonWaterElemental', prereq: 'Water', number: 4 };
NewPrerequisites.SummonWaterElemental_requires_8Water_pgroup1               = { target: 'SummonWaterElemental', prereq: 'Water', number: 8,     pgroup: 1 };
NewPrerequisites.SummonWaterElemental_requires_SummonAirElemental_pgroup1   = { target: 'SummonWaterElemental', prereq: 'SummonAirElemental',   pgroup: 1 };
NewPrerequisites.SummonWaterElemental_requires_SummonEarthElemental_pgroup1 = { target: 'SummonWaterElemental', prereq: 'SummonEarthElemental', pgroup: 1 };
NewPrerequisites.SummonWaterElemental_requires_SummonFireElemental_pgroup1  = { target: 'SummonWaterElemental', prereq: 'SummonFireElemental',  pgroup: 1 };
NewSpells.ControlWaterElemental = new Skill( "Control Water Elemental", 'IQ', 2, libAbrv+190 );
NewSpells.ControlWaterElemental.classes = { reg: true, rwi: true, rst: true };
NewSpells.ControlWaterElemental.stats = { duration: '1 min', castcost: '1/10 CP total', maintaincost: '½ C2C', time: 2 };
NewPrerequisites.ControlWaterElemental_requires_SummonWaterElemental = { target: 'ControlWaterElemental', prereq: 'SummonWaterElemental' };
NewSpells.CreateWaterElemental = new Skill( "Create Water Elemental", 'IQ', 2, libAbrv+190 );
NewSpells.CreateWaterElemental.classes = { spcl: true };
NewSpells.CreateWaterElemental.stats = { castcost: '1/5 CP total', time: 'CP-total seconds' };
NewPrerequisites.CreateWaterElemental_requires_Magery2               = { target: 'CreateWaterElemental', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.CreateWaterElemental_requires_ControlWaterElemental = { target: 'CreateWaterElemental', prereq: 'ControlWaterElemental' };
// Rain under Weather spells
// Snow under Weather spells
// Hail under Weather spells
// Mud Jet under Earth spells
NewSpells.Geyser = new Skill( "Geyser", 'IQ', 3, libAbrv+190 );
NewSpells.Geyser.classes = { area: true };
NewSpells.Geyser.stats = { duration: "1 sec", castcost: 5, maintaincost: 2, time: 5 };
NewPrerequisites.Geyser_requires_6Water         = { target: 'Geyser', number: 6, prereq: 'Water' };
NewPrerequisites.Geyser_requires_CreateSpring   = { target: 'Geyser', prereq: 'CreateSpring' };
NewPrerequisites.Geyser_requires_4Earth_pgroup1 = { target: 'Geyser', number: 4, prereq: 'Earth', pgroup: 1 };
NewPrerequisites.Geyser_requires_4Fire_pgroup1  = { target: 'Geyser', number: 4, prereq: 'Fire',  pgroup: 1 };
NewSpells.RainofAcid = new Skill( "Rain of Acid", 'IQ', 2, libAbrv+191 );
NewSpells.RainofAcid.classes = { area: true };
NewSpells.RainofAcid.stats = { duration: "1 min", castcost: 3, maintaincost: 3 };
NewPrerequisites.RainofAcid_requires_Magery2     = { target: 'RainofAcid', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.RainofAcid_requires_CreateWater = { target: 'RainofAcid', prereq: 'CreateWater' };
NewPrerequisites.RainofAcid_requires_CreateEarth = { target: 'RainofAcid', prereq: 'CreateEarth' };
NewSpells.SteamJet = new Skill( "Steam Jet", 'IQ', 2, libAbrv+191 );
NewSpells.SteamJet.classes = { reg: true };
NewSpells.SteamJet.stats = { duration: "1 sec", castcost: '1-3', maintaincost: "same", notes: "The jet does 1d-1 scalding per point of energy. The jet has range equal to energy spent." };
NewPrerequisites.SteamJet_requires_WaterJet  = { target: 'SteamJet', prereq: 'WaterJet' };
NewPrerequisites.SteamJet_requires_BoilWater = { target: 'SteamJet', prereq: 'BoilWater' };
NewSpells.AcidBall = new Skill( "Acid Ball", 'IQ', 2, libAbrv+191 );
NewSpells.AcidBall.classes = { msl: true };
NewSpells.AcidBall.stats = { castcost: 'up to Magery/sec; max 3 seconds', time: "1-3", notes: "1d damage per energy spent" };
NewPrerequisites.AcidBall_requires_Magery2    = { target: 'AcidBall', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.AcidBall_requires_CreateAcid = { target: 'AcidBall', prereq: 'CreateAcid' };
NewSpells.AcidJet = new Skill( "Acid Jet", 'IQ', 2, libAbrv+192 );
NewSpells.AcidJet.classes = { reg: true };
NewSpells.AcidJet.stats = { duration: "1 sec", castcost: '1-3', maintaincost: "same", notes: "The jet does 1d-1 damage per point of energy. The jet has range equal to energy spent." };
NewPrerequisites.AcidJet_requires_Magery2    = { target: 'AcidJet', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.AcidJet_requires_WaterJet   = { target: 'AcidJet', prereq: 'WaterJet' };
NewPrerequisites.AcidJet_requires_CreateAcid = { target: 'AcidJet', prereq: 'CreateAcid' };
NewSpells.RainofIceDaggers = new Skill( "Rain of Ice Daggers", 'IQ', 2, libAbrv+192 );
NewSpells.RainofIceDaggers.classes = { area: true };
NewSpells.RainofIceDaggers.stats = { duration: "1 min", castcost: "1 (min 2)", notes: "Cost x2 does 1d/sec damage" };
NewPrerequisites.RainofIceDaggers_requires_Magery2   = { target: 'RainofIceDaggers', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.RainofIceDaggers_requires_Hail      = { target: 'RainofIceDaggers', prereq: 'Hail' };
NewPrerequisites.RainofIceDaggers_requires_IceDagger = { target: 'RainofIceDaggers', prereq: 'IceDagger' };
// Storm under Weather spells
NewSpells.IcyBreath = new Skill( "Icy Breath", 'IQ', 3, libAbrv+192 );
NewSpells.IcyBreath.classes = { reg: true };
NewSpells.IcyBreath.stats = { duration: "1 sec", castcost: "1-4", time: 2, notes: "Does 1d+1 damage for every point of energy in the spell." };
NewPrerequisites.IcyBreath_requires_Magery1    = { target: 'IcyBreath', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.IcyBreath_requires_SnowJet    = { target: 'IcyBreath', prereq: 'SnowJet' };
NewPrerequisites.IcyBreath_requires_ResistCold = { target: 'IcyBreath', prereq: 'ResistCold' };
NewSpells.BreatheSteam = new Skill( "Breathe Steam", 'IQ', 3, libAbrv+192 );
NewSpells.BreatheSteam.classes = { reg: true };
NewSpells.BreatheSteam.stats = { duration: "1 sec", castcost: "1-4", time: 2, notes: "The jet does 1d scalding per point of energy. The jet has range equal to energy spent." };
NewPrerequisites.BreatheSteam_requires_Magery1    = { target: 'BreatheSteam', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.BreatheSteam_requires_SteamJet   = { target: 'BreatheSteam', prereq: 'SteamJet' };
NewPrerequisites.BreatheSteam_requires_ResistFire = { target: 'BreatheSteam', prereq: 'ResistFire' };
NewSpells.SpitAcid = new Skill( "Spit Acid", 'IQ', 3, libAbrv+192 );
NewSpells.SpitAcid.classes = { reg: true };
NewSpells.SpitAcid.stats = { duration: "1 sec", castcost: "1-4", time: 2, notes: "The jet does 1d damage per point of energy. The jet has range equal to energy spent." };
NewPrerequisites.SpitAcid_requires_Magery3    = { target: 'SpitAcid', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.SpitAcid_requires_AcidJet    = { target: 'SpitAcid', prereq: 'AcidJet' };
NewPrerequisites.SpitAcid_requires_ResistAcid = { target: 'SpitAcid', prereq: 'ResistAcid' };
NewSpells.EssentialAcid = new Skill( "Essential Acid", 'IQ', 3, libAbrv+192 );
NewSpells.EssentialAcid.classes = { reg: true };
NewSpells.EssentialAcid.stats = { duration: "permanent", castcost: "8/gal" };
NewPrerequisites.EssentialAcid_requires_Magery3 = { target: 'EssentialAcid', prereq: 'Magery', level: 3, category: 'ADS' };
NewPrerequisites.EssentialAcid_requires_6Acid   = { target: 'EssentialAcid', prereq: 'AcidSpells', number: 6 };


addToGroup("WeatherSpells",
['Frost','Fog','PredictWeather','Waves','Clouds','Current','Tide','Wind','Rain','Snow','Hail',
'Warm','Cool','Storm','Lightning','ResistLightning','ExplosiveLightning','LightningWhip',
'ShockingTouch','SparkCloud','SparkStorm','WallofLightning','BallofLightning','LightningStare',
'BodyofLightning','LightningArmor','LightningWeapon','LightningMissiles']);
NewSpells.Frost = new Skill( "Frost", 'IQ', 2, libAbrv+193 );
NewSpells.Frost.classes = { area: true };   // 
NewSpells.Frost.stats   = { duration: "until it melts", castcost: 1 };
NewPrerequisites.Frost_requires_CreateWater_pgroup1 = { target: 'Frost', prereq: 'CreateWater', pgroup: 1 };
NewPrerequisites.Frost_requires_Cold_pgroup1        = { target: 'Frost', prereq: 'Cold',        pgroup: 1 };
NewSpells.Fog = new Skill( "Fog", 'IQ', 2, libAbrv+193 );
NewSpells.Fog.classes = { area: true };
NewSpells.Fog.stats = { duration: '1 min', castcost: 2, maintaincost: "½ C2C" };
NewPrerequisites.Fog_requires_ShapeWater = { target: 'Fog', prereq: 'ShapeWater' };
NewSpells.PredictWeather = new Skill( "Predict Weather", 'IQ', 2, libAbrv+193 );
NewSpells.PredictWeather.classes = { info: true };
NewSpells.PredictWeather.stats   = { castcost: '2&times; days', time: '5 sec/day', notes: "Double the cost for a location outside the general area (say, over the horizon). Quadruple the cost for a place on another continent." };
NewPrerequisites.PredictWeather_requires_4Air = { target: 'PredictWeather', prereq: 'Air', number: 4 };
NewSpells.Waves = new Skill( "Waves", 'IQ', 2, libAbrv+194 );
NewSpells.Waves.classes = { spcl: true, area: true };   // 
NewSpells.Waves.stats   = { duration: '1 hr', castcost: 1/60, maintaincost: 'same', time: "1 min" };
NewPrerequisites.Waves_requires_ShapeWater = { target: 'Waves', prereq: 'ShapeWater' };
NewSpells.Clouds = new Skill( "Clouds", 'IQ', 2, libAbrv+194 );
NewSpells.Clouds.classes = { area: true };
NewSpells.Clouds.stats   = { duration: '10 min', castcost: 1/20, maintaincost: 'same', time: 10 };
NewPrerequisites.Clouds_requires_2Water = { target: 'Clouds', prereq: 'Water', number: 2 };
NewPrerequisites.Clouds_requires_2Air   = { target: 'Clouds', prereq: 'Air', number: 2 };
NewSpells.Current = new Skill( "Current", 'IQ', 2, libAbrv+194 );
NewSpells.Current.classes = { spcl: true, area: true };   // 
NewSpells.Current.stats   = { duration: '1 hr', castcost: 1/50, maintaincost: 'same', time: "1 min" };
NewPrerequisites.Current_requires_6Water = { target: 'Current', prereq: 'Water', number: 6 };
NewSpells.Tide = new Skill( "Tide", 'IQ', 2, libAbrv+194 );
NewSpells.Tide.classes = { spcl: true, area: true };   // 
NewSpells.Tide.stats   = { duration: '1 hr', castcost: 1/30, maintaincost: 'same', time: "1 min" };
NewPrerequisites.Tide_requires_8Water = { target: 'Tide', prereq: 'Water', number: 8 };
NewSpells.Wind = new Skill( "Wind", 'IQ', 2, libAbrv+195 );
NewSpells.Wind.classes = { spcl: true, area: true };   // 
NewSpells.Wind.stats   = { duration: '1 hr', castcost: 1/50, maintaincost: 'same', time: "1 min" };
NewPrerequisites.Wind_requires_Windstorm = { target: 'Wind', prereq: 'Windstorm' };
NewSpells.Rain = new Skill( "Rain", 'IQ', 2, libAbrv+195 );
NewSpells.Rain.classes = { area: true };
NewSpells.Rain.stats   = { duration: '1 hr', castcost: 1/10, maintaincost: 'same', time: "1 min", notes: "Cost to make rain doubles in a desert or other area (GM's determination) where rain is unnatural. Cost to prevent rain doubles in a naturally rainy or swampy area." };
NewPrerequisites.Rain_requires_Clouds = { target: 'Rain', prereq: 'Clouds' };
NewSpells.Snow = new Skill( "Snow", 'IQ', 2, libAbrv+195 );
NewSpells.Snow.classes = { area: true };
NewSpells.Snow.stats   = { duration: '1 hr', castcost: 1/15, maintaincost: 'same', notes: "Each additional 1/15 energy per yard radius increases the amount of snow by 1 inch per hour." };
NewPrerequisites.Snow_requires_Clouds = { target: 'Snow', prereq: 'Clouds' };
NewPrerequisites.Snow_requires_Frost  = { target: 'Snow', prereq: 'Frost' };
NewSpells.Hail = new Skill( "Hail", 'IQ', 2, libAbrv+195 );
NewSpells.Hail.classes = { area: true };
NewSpells.Hail.stats   = { duration: '1 hr', castcost: 1/5, maintaincost: 'same', notes: "For 5 times the cost, the GM may allow really big hailstones, doing 1d-2 crushing damage per second." };
NewPrerequisites.Hail_requires_Snow = { target: 'Hail', prereq: 'Snow' };
NewSpells.Warm = new Skill( "Warm", 'IQ', 2, libAbrv+195 );
NewSpells.Warm.classes = { area: true };
NewSpells.Warm.stats   = { duration: '1 hr', castcost: 1/10, maintaincost: 'same', time: "1 min per 1/10 energy spent" };
NewPrerequisites.Warm_requires_Heat = { target: 'Warm', prereq: 'Heat' };
NewPrerequisites.Warm_requires_4Air = { target: 'Warm', prereq: 'Air', number: 4 };
NewSpells.Cool = new Skill( "Cool", 'IQ', 2, libAbrv+195 );
NewSpells.Cool.classes = { area: true };
NewSpells.Cool.stats   = { duration: '1 hr', castcost: 1/10, maintaincost: 'same', time: "1 min per 1/10 energy spent" };
NewPrerequisites.Cool_requires_Cold = { target: 'Cool', prereq: 'Cold' };
NewPrerequisites.Cool_requires_4Air = { target: 'Cool', prereq: 'Air', number: 4 };
NewSpells.Storm = new Skill( "Storm", 'IQ', 2, libAbrv+195 );
NewSpells.Storm.classes = { area: true };
NewSpells.Storm.stats   = { duration: '1 hr', castcost: 1/50, maintaincost: 'same', time: "1 min", notes: "storm takes ~1 hr to build or dissipate" };
NewPrerequisites.Storm_requires_Rain = { target: 'Storm', prereq: 'Rain' };
NewPrerequisites.Storm_requires_Hail = { target: 'Storm', prereq: 'Hail' };
// Weather Dome under Protection & Warning spells
// Cloud-Walking under Movement spells
// Cloud-Vaulting under Movement spells
NewSpells.ResistLightning = new Skill( "Resist Lightning", 'IQ', 2, libAbrv+196 );
NewSpells.ResistLightning.classes = { reg: true };
NewSpells.ResistLightning.stats = { duration: '1 min', castcost: 2, maintaincost: 1 };
NewPrerequisites.ResistLightning_requires_6Air = { target: 'ResistLightning', prereq: 'Air', number: 6 };
NewSpells.Lightning = new Skill( "Lightning", 'IQ', 2, libAbrv+196 );
NewSpells.Lightning.classes = { msl: true };
NewSpells.Lightning.stats = { castcost: 'up to Magery/sec; max 3 seconds', time: '1 to 3', notes: "The bolt does 1d-1 burning damage per energy point." };
NewPrerequisites.Lightning_requires_Magery1 = { target: 'Lightning', prereq: 'Magery', level: 1, category: 'ADS' };
NewPrerequisites.Lightning_requires_6Air    = { target: 'Lightning', prereq: 'Air', number: 6 };
NewSpells.ExplosiveLightning = new Skill( "Explosive Lightning", 'IQ', 2, libAbrv+196 );
NewSpells.ExplosiveLightning.classes = { msl: true };
NewSpells.ExplosiveLightning.stats = { castcost: 'up to 2×Magery/sec; max 3 seconds', time: '1 to 3', notes: "The bolt does 1d-1 burning damage per full 2 points of energy." };
NewPrerequisites.ExplosiveLightning_requires_Lightning = { target: 'ExplosiveLightning', prereq: 'Lightning' };
NewSpells.LightningWhip = new Skill( "Lightning Whip", 'IQ', 2, libAbrv+196 );
NewSpells.LightningWhip.classes = { reg: true };
NewSpells.LightningWhip.stats = { duration: '10 sec', castcost: "½ yds reach (max 8 yds)", maintaincost: "same", time: 2 };
NewPrerequisites.LightningWhip_requires_Lightning = { target: 'LightningWhip', prereq: 'Lightning' };
NewSpells.ShockingTouch = new Skill( "Shocking Touch", 'IQ', 2, libAbrv+196 );
NewSpells.ShockingTouch.classes = { melee: true };
NewSpells.ShockingTouch.stats = { castcost: "1-3" };
NewPrerequisites.ShockingTouch_requires_Lightning = { target: 'ShockingTouch', prereq: 'Lightning' };
NewSpells.SparkCloud = new Skill( "Spark Cloud", 'IQ', 2, libAbrv+196 );
NewSpells.SparkCloud.classes = { area: true };
NewSpells.SparkCloud.stats = { duration: '10 sec', castcost: "1-5", time: "1-5", notes: "cloud does 1pt/sec damage for each base cost energy spent" };
NewPrerequisites.SparkCloud_requires_Lightning = { target: 'SparkCloud', prereq: 'ShapeAir' };
NewPrerequisites.SparkCloud_requires_Lightning = { target: 'SparkCloud', prereq: 'Lightning' };
NewSpells.SparkStorm = new Skill( "Spark Storm", 'IQ', 2, libAbrv+197 );
NewSpells.SparkStorm.classes = { area: true };
NewSpells.SparkStorm.stats   = { duration: '1 min after reaching full strength', castcost: '2, 4, or 6', maintaincost: "½ C2C", time: "The storm starts immediately, but the caster must concentrate for a number of seconds equal to the storm's radius in hexes to bring the storm to full strength." };
NewPrerequisites.SparkStorm_requires_Windstorm = { target: 'SparkStorm', prereq: 'Windstorm' };
NewPrerequisites.SparkStorm_requires_Lightning = { target: 'SparkStorm', prereq: 'Lightning' };
NewSpells.WallofLightning = new Skill( "Wall of Lightning", 'IQ', 2, libAbrv+197 );
NewSpells.WallofLightning.classes = { area: true };
NewSpells.WallofLightning.stats = { duration: '1 min', castcost: "2-6", maintaincost: "same" };
NewPrerequisites.WallofLightning_requires_Lightning = { target: 'WallofLightning', prereq: 'Lightning' };
NewSpells.BallofLightning = new Skill( "Ball of Lightning", 'IQ', 2, libAbrv+197 );
NewSpells.BallofLightning.classes = { msl: true };
NewSpells.BallofLightning.stats = { duration: '1 min', castcost: 'up to 2×Magery/sec; max 3 seconds', maintaincost: "½ C2C", time: '1 to 3', notes: "The ball does 1d-1 burning damage per full 2 points of energy." };
NewPrerequisites.BallofLightning_requires_Apportation = { target: 'BallofLightning', prereq: 'Apportation' };
NewPrerequisites.BallofLightning_requires_Lightning   = { target: 'BallofLightning', prereq: 'Lightning' };
NewSpells.LightningStare = new Skill( "Lightning Stare", 'IQ', 2, libAbrv+198 );
NewSpells.LightningStare.classes = { reg: true };
NewSpells.LightningStare.stats = { duration: "1 sec", castcost: "1-4", time: 2, notes: "Does 1d burning damage per point of energy. Range 2 yds per energy spent." };
NewPrerequisites.LightningStare_requires_Lightning = { target: 'LightningStare', prereq: 'Lightning' };
NewPrerequisites.LightningStare_requires_ResistLightning = { target: 'LightningStare', prereq: 'ResistLightning' };
NewSpells.BodyofLightning = new Skill( "Body of Lightning", 'IQ', 2, libAbrv+198 );
NewSpells.BodyofLightning.classes = { reg: true, rht: true };
NewSpells.BodyofLightning.stats = { duration: '1 min', castcost: 12, maintaincost: 4, time: 5 };
NewPrerequisites.BodyofLightning_requires_Magery2   = { target: 'BodyofLightning', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.BodyofLightning_requires_Lightning = { target: 'BodyofLightning', prereq: 'Lightning' };
NewSpells.LightningArmor = new Skill( "Lightning Armor", 'IQ', 2, libAbrv+198 );
NewSpells.LightningArmor.classes = { reg: true };
NewSpells.LightningArmor.stats = { duration: '1 min', castcost: 7, maintaincost: 4 };
NewPrerequisites.LightningArmor_requires_6Lightning = { target: 'Lightning', prereq: 'LightningSpells', number: 6 };
NewPrerequisites.LightningArmor_requires_ResistLightning = { target: 'LightningArmor', prereq: 'ResistLightning' };
NewSpells.LightningWeapon = new Skill( "Lightning Weapon", 'IQ', 2, libAbrv+198 );
NewSpells.LightningWeapon.classes = { reg: true };
NewSpells.LightningWeapon.stats = { duration: '1 min', castcost: 4, maintaincost: 1, time: 2 };
NewPrerequisites.LightningWeapon_requires_Magery2   = { target: 'LightningWeapon', prereq: 'Magery', level: 2, category: 'ADS' };
NewPrerequisites.LightningWeapon_requires_Lightning = { target: 'LightningWeapon', prereq: 'Lightning' };
NewSpells.LightningMissiles = new Skill( "Lightning Missiles", 'IQ', 2, libAbrv+198 );
NewSpells.LightningMissiles.classes = { reg: true };
NewSpells.LightningMissiles.stats = { duration: '1 min', castcost: 4, maintaincost: 2, time: 3, notes: "Cost doubles if the missiles to be fired are nonmetallic." };
NewPrerequisites.LightningMissiles_requires_LightningWeapon = { target: 'LightningMissiles', prereq: 'LightningWeapon' };


NewSpells.PathofAnimal = new Skill( "Path of Animal", 'IQ', 3, 'B4E242' );
NewSpells.PathofFood = new Skill( "Path of Food", 'IQ', 3, 'B4E242' );
NewSpells.PathofIllusionCreation = new Skill( "Path of Illusion & Creation", 'IQ', 3, 'B4E242' );
NewSpells.PathofMakingBreaking = new Skill( "Path of Making & Breaking", 'IQ', 3, 'B4E242' );
NewSpells.PathofPlant = new Skill( "Path of Plant", 'IQ', 3, 'B4E242' );
NewSpells.PathofSound = new Skill( "Path of Sound", 'IQ', 3, 'B4E242' );
NewSpells.PathofTech = new Skill( "Path of Technology", 'IQ', 3, 'B4E242' );
NewSpells.PathofWeather = new Skill( "Path of Weather", 'IQ', 3, 'B4E242' );


NewSkills.PathofAnimal = new Skill( "Path of Animal", 'IQ', 3, 'B4E242' );
NewSkills.PathofFood = new Skill( "Path of Food", 'IQ', 3, 'B4E242' );
NewSkills.PathofIllusionCreation = new Skill( "Path of Illusion & Creation", 'IQ', 3, 'B4E242' );
NewSkills.PathofMakingBreaking = new Skill( "Path of Making & Breaking", 'IQ', 3, 'B4E242' );
NewSkills.PathofPlant = new Skill( "Path of Plant", 'IQ', 3, 'B4E242' );
NewSkills.PathofSound = new Skill( "Path of Sound", 'IQ', 3, 'B4E242' );


/* do not call spellify here; it will always be called during processing of the library */

NewAdjustments.AnimalSpells_from_BeastMagery      = { from: 'MageryBeast',    amount: 1, targetCategory: 'GR', target: 'AnimalSpells' };
NewAdjustments.FoodSpells_from_FoodMagery         = { from: 'MageryFood',     amount: 1, targetCategory: 'GR', target: 'FoodSpells' };
NewAdjustments.IllusionSpells_from_IllusionMagery = { from: 'MageryIllusion', amount: 1, targetCategory: 'GR', target: 'IllusionCreationSpells' };
NewAdjustments.MakeBreakSpells_from_MakeMagery    = { from: 'MageryMake',     amount: 1, targetCategory: 'GR', target: 'MakingBreakingSpells' };
NewAdjustments.PlantSpells_from_PlantMagery       = { from: 'MageryPlant',    amount: 1, targetCategory: 'GR', target: 'PlantSpells' };
NewAdjustments.SoundSpells_from_SoundMagery       = { from: 'MagerySound',    amount: 1, targetCategory: 'GR', target: 'SoundSpells' };
NewAdjustments.TechSpells_from_TechMagery         = { from: 'MageryTech',     amount: 1, targetCategory: 'GR', target: 'TechSpells' };
NewAdjustments.WeatherSpells_from_WeatherMagery   = { from: 'MageryWeather',  amount: 1, targetCategory: 'GR', target: 'WeatherSpells' };

NewAdjustments.PathofAnimal_from_MageryRitual               = { target: 'PathofAnimal',               targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
NewAdjustments.PathofFood_from_MageryRitual                 = { target: 'PathofFood',                 targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
NewAdjustments.PathofIllusionCreation_from_MageryRitual     = { target: 'PathofIllusionCreation',     targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
NewAdjustments.PathofMakingBreaking_from_MageryRitual       = { target: 'PathofMakingBreaking',       targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
NewAdjustments.PathofPlant_from_MageryRitual                = { target: 'PathofPlant',                targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
NewAdjustments.PathofSound_from_MageryRitual                = { target: 'PathofSound',                targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
NewAdjustments.PathofTech_from_MageryRitual                 = { target: 'PathofTech',                 targetCategory: 'SK', amount: 1, from: 'MageryRitual' };
NewAdjustments.PathofWeather_from_MageryRitual              = { target: 'PathofWeather',              targetCategory: 'SK', amount: 1, from: 'MageryRitual' };


NewDefaults.PathofAnimal_from_RitualMagic  = { target: 'PathofAnimal', penalty: -6, from: 'RitualMagic' };
NewDefaults.PathofAnimal_from_Thaumatology = { target: 'PathofAnimal', penalty: -6, from: 'Thaumatology' };
NewDefaults.PathofFood_from_RitualMagic  = { target: 'PathofFood', penalty: -6, from: 'RitualMagic' };
NewDefaults.PathofFood_from_Thaumatology = { target: 'PathofFood', penalty: -6, from: 'Thaumatology' };
NewDefaults.PathofIllusionCreation_from_RitualMagic  = { target: 'PathofIllusionCreation', penalty: -6, from: 'RitualMagic' };
NewDefaults.PathofIllusionCreation_from_Thaumatology = { target: 'PathofIllusionCreation', penalty: -6, from: 'Thaumatology' };
NewDefaults.PathofMakingBreaking_from_RitualMagic  = { target: 'PathofMakingBreaking', penalty: -6, from: 'RitualMagic' };
NewDefaults.PathofMakingBreaking_from_Thaumatology = { target: 'PathofMakingBreaking', penalty: -6, from: 'Thaumatology' };
NewDefaults.PathofPlant_from_RitualMagic  = { target: 'PathofPlant', penalty: -6, from: 'RitualMagic' };
NewDefaults.PathofPlant_from_Thaumatology = { target: 'PathofPlant', penalty: -6, from: 'Thaumatology' };
NewDefaults.PathofSound_from_RitualMagic  = { target: 'PathofSound', penalty: -6, from: 'RitualMagic' };
NewDefaults.PathofSound_from_Thaumatology = { target: 'PathofSound', penalty: -6, from: 'Thaumatology' };
NewDefaults.PathofTech_from_RitualMagic  = { target: 'PathofTech', penalty: -6, from: 'RitualMagic' };
NewDefaults.PathofTech_from_Thaumatology = { target: 'PathofTech', penalty: -6, from: 'Thaumatology' };
NewDefaults.PathofWeather_from_RitualMagic  = { target: 'PathofWeather', penalty: -6, from: 'RitualMagic' };
NewDefaults.PathofWeather_from_Thaumatology = { target: 'PathofWeather', penalty: -6, from: 'Thaumatology' };


NewPrerequisites.PathofAnimal_requires_RitualMagic_pgroup1  = { target: 'PathofAnimal', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
NewPrerequisites.PathofAnimal_requires_Thaumatology_pgroup1 = { target: 'PathofAnimal', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
NewPrerequisites.PathofFood_requires_RitualMagic_pgroup1  = { target: 'PathofFood', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
NewPrerequisites.PathofFood_requires_Thaumatology_pgroup1 = { target: 'PathofFood', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
NewPrerequisites.PathofIllusionCreation_requires_RitualMagic_pgroup1  = { target: 'PathofIllusionCreation', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
NewPrerequisites.PathofIllusionCreation_requires_Thaumatology_pgroup1 = { target: 'PathofIllusionCreation', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
NewPrerequisites.PathofMakingBreaking_requires_RitualMagic_pgroup1  = { target: 'PathofMakingBreaking', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
NewPrerequisites.PathofMakingBreaking_requires_Thaumatology_pgroup1 = { target: 'PathofMakingBreaking', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
NewPrerequisites.PathofPlant_requires_RitualMagic_pgroup1  = { target: 'PathofPlant', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
NewPrerequisites.PathofPlant_requires_Thaumatology_pgroup1 = { target: 'PathofPlant', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
NewPrerequisites.PathofSound_requires_RitualMagic_pgroup1  = { target: 'PathofSound', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
NewPrerequisites.PathofSound_requires_Thaumatology_pgroup1 = { target: 'PathofSound', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
NewPrerequisites.PathofTech_requires_RitualMagic_pgroup1  = { target: 'PathofTech', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
NewPrerequisites.PathofTech_requires_Thaumatology_pgroup1 = { target: 'PathofTech', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };
NewPrerequisites.PathofWeather_requires_RitualMagic_pgroup1  = { target: 'PathofWeather', category: 'SK', prereq: 'RitualMagic', pgroup: 1 };
NewPrerequisites.PathofWeather_requires_Thaumatology_pgroup1 = { target: 'PathofWeather', category: 'SK', prereq: 'Thaumatology', pgroup: 1 };


// aliases
Groups.Air = Groups.AirSpells;
Groups.Earth = Groups.EarthSpells;
Groups.Fire = Groups.FireSpells;
Groups.Water = Groups.WaterSpells;
Groups.Animal = Groups.AnimalSpells;
Groups.BodyControl = Groups.BodyControlSpells;
Groups.CommunicationEmpathy = Groups.CommunicationEmpathySpells;
Groups.Enchantment = Groups.EnchantmentSpells;
Groups.Food = Groups.FoodSpells;
Groups.Gate = Groups.GateSpells;
Groups.Healing = Groups.HealingSpells;
Groups.IllusionCreation = Groups.IllusionCreationSpells;
Groups.Knowledge = Groups.KnowledgeSpells;
Groups.LightDarkness = Groups.LightDarknessSpells;
Groups.MakingBreaking = Groups.MakingBreakingSpells;
Groups.Meta = Groups.MetaSpells;
Groups.MindControl = Groups.MindControlSpells;
Groups.Movement = Groups.MovementSpells;
Groups.Necromantic = Groups.NecromanticSpells;
Groups.Plant = Groups.PlantSpells;
Groups.ProtectionWarning = Groups.ProtectionWarningSpells;
Groups.Shape = Groups.ShapeSpells;
Groups.Sound = Groups.SoundSpells;
Groups.Tech = Groups.Technology = Groups.TechnologySpells = Groups.TechSpells = Groups.Technological = Groups.TechnologicalSpells;
Groups.Weather = Groups.WeatherSpells;


// importLibrarySettings();


/* Here's an attempt to enhance objects existing in Basic Set libraries */
if( CharacterTypes ) {
    CharacterTypes.water_mage.skills      = removeDups( CharacterTypes.water_mage.skills.concat( Groups.Water ) );
    CharacterTypes.storm_mage.skills      = removeDups( CharacterTypes.storm_mage.skills.concat( Groups.Water, Groups.Air ) );
    CharacterTypes.air_mage.skills        = removeDups( CharacterTypes.air_mage.skills.concat( Groups.Air ) );
    CharacterTypes.firestorm_mage.skills  = removeDups( CharacterTypes.firestorm_mage.skills.concat( Groups.Air, Groups.Fire ) );
    CharacterTypes.fire_mage.skills       = removeDups( CharacterTypes.fire_mage.skills.concat( Groups.Fire ) );
    CharacterTypes.lava_mage.skills       = removeDups( CharacterTypes.lava_mage.skills.concat( Groups.Fire, Groups.Earth ) );
    CharacterTypes.earth_mage.skills      = removeDups( CharacterTypes.earth_mage.skills.concat( Groups.Earth ) );
    CharacterTypes.spring_mage.skills     = removeDups( CharacterTypes.spring_mage.skills.concat( Groups.Earth, Groups.Water ) );
}


// NewTemplates._blank = {
//   name : '',
//   value : 0,
//   ref : libAbrv+##,
//   traits : [
//     // attribute & 2nd char mods
//     // traits
//   ],
//   metatraits : [
//     e.g.
//     Template.MetaTraitTemplate,
//   ],
//   skills : [],
//   spells : [],
//   adjustments : []  // no need to add these for existing ads/disads; they should already apply - reserve for traits defined inside the template
// };

NewTemplates.SmallAirElemental = {
  name : 'Air Elemental (small)',
  value : 40,
  ref : libAbrv+28,
  traits : [
    Traits.DecreasedST.clone(),         // 0
    Traits.DecreasedDX.clone(),
    Traits.DecreasedIQ.clone(),
    Traits.DecreasedHT.clone(),
    Traits.SizeModifier.clone(),
    Traits.IncreasedHP.clone(),         // 5
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),
    Traits.DoesntSleep.clone(),
    Traits.Flight.clone(),
    Traits.Resistant.clone(),           // 10
    Traits.InjuryTolerance.clone(),
    Traits.NoFineManipulators.clone(),
    Traits.NoLegsAerial.clone(),
    Traits.Vulnerability.clone(),
  ],
  skills : [],
  spells : [],
  adjustments : []
};
NewTemplates.SmallAirElemental.traits[0].levels = 4;  // ST-4
NewTemplates.SmallAirElemental.traits[1].levels = 1;  // DX-1
NewTemplates.SmallAirElemental.traits[2].levels = 2;  // IQ-2
NewTemplates.SmallAirElemental.traits[3].levels = 3;  // HT-3
NewTemplates.SmallAirElemental.traits[4].levels =-1;  // SM-1
NewTemplates.SmallAirElemental.traits[5].levels = 2;  // HP+2
NewTemplates.SmallAirElemental.traits[9].EnhLimsArray = [{text:"Lighter Than Air",value :-10}];     // Flight
NewTemplates.SmallAirElemental.traits[10].ConstantModsArray = [{text:"metabolic hazards",value:30}];// Resistant (Immunity)
NewTemplates.SmallAirElemental.traits[10].MultipliersArray  = [{text:"immunity",value:1}];          // Resistant (Immunity)
NewTemplates.SmallAirElemental.traits[11].ConstantModsArray = [{text:"Diffuse",value :100}];        // Injury Tolerance
NewTemplates.SmallAirElemental.traits[14].levels = 2;                                               // Vulnerability level 2 (occasional)
NewTemplates.SmallAirElemental.traits[14].MultipliersArray  = [{text:"Damage ×2",value:2}];         // Vulnerability damage x2
NewTemplates.SmallAirElemental.traits[14].description = 'Vacuum and wind-based attacks';            // Vulnerability

NewTemplates.SmallEarthElemental = {
  name : 'Earth Elemental (small)',
  value : 40,
  ref : libAbrv+55,
  traits : [
    Traits.IncreasedST.clone(),       // 0
    Traits.DecreasedDX.clone(),
    Traits.DecreasedIQ.clone(),
    Traits.SizeModifier.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),  // 5
    Traits.DoesntSleep.clone(),
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.PressureSupport.clone(),   // 10
    Traits.VacuumSupport.clone(),
  ],
  skills : [],
  spells : [],
  adjustments : []
};
NewTemplates.SmallEarthElemental.traits[0].levels = 1;  // ST+1
NewTemplates.SmallEarthElemental.traits[1].levels = 2;  // DX-2
NewTemplates.SmallEarthElemental.traits[2].levels = 4;  // IQ-4
NewTemplates.SmallEarthElemental.traits[3].levels =-1;  // SM-1
NewTemplates.SmallEarthElemental.traits[7].levels = 2;  // DR+2
NewTemplates.SmallEarthElemental.traits[8].ConstantModsArray = [{text:"metabolic hazards",value:30}];// Resistant (Immunity)
NewTemplates.SmallEarthElemental.traits[8].MultipliersArray  = [{text:"immunity",value:1}];          // Resistant (Immunity)
NewTemplates.SmallEarthElemental.traits[9].ConstantModsArray = [{text:"Homogenous",value :40}];      // Injury Tolerance
NewTemplates.SmallEarthElemental.traits[10].levels = 3;                                              // Pressure Support 3

NewTemplates.ClayGolem = {
  name  : "Clay Golem",
  value : 0,
  ref : libAbrv+59,
  traits :[
    Traits.IncreasedST.clone(),               // 0
    Traits.IncreasedDX.clone(),
    Traits.DecreasedIQ.clone(),
    Traits.IncreasedHT.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),          // 5
    Traits.DoesntSleep.clone(),
    Traits.HighPainThreshold.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.SingleMinded.clone(),              // 10
    Traits.Unaging.clone(),
    Traits.Unfazeable.clone(),
    Traits.VacuumSupport.clone(),
    Traits.CannotLearn.clone(),
    Traits.DisturbingVoice.clone(),           // 15
    Traits.NoSenseofSmellTaste.clone(),
    Traits.Reprogrammable.clone(),
    Traits.SocialStigma.clone(),
    Traits.Unhealing.clone(),
    new Trait( "Unnatural", "D", "M", -50 ),       // 20
    Traits.PovertyDeadBrokex0.clone(),
    new Trait( "Neither has nor spends Fatigue Points", "A", "P", 0 )
  ],
  skills : [
    new Skill( "10 points of skills", 'DX', 0 ),
    new Skill( "appropriate to", 'DX', 1 ),
    new Skill( "the golem's", 'DX', 1 ),
    new Skill( "intended", 'DX', 2 ),
    new Skill( "function.", 'IQ', 0 ),
  ],
  metatraits : [
    Templates.Automaton
  ]
}
NewTemplates.ClayGolem.traits[0].levels = 5;  // ST+5
NewTemplates.ClayGolem.traits[1].levels = 1;  // DX+1
NewTemplates.ClayGolem.traits[2].levels = 2;  // IQ-2
NewTemplates.ClayGolem.traits[3].levels = 4;  // HT+4
NewTemplates.ClayGolem.traits[8].ConstantModsArray = [{text:"metabolic hazards",value:30}];         // Resistant (Immunity)
NewTemplates.ClayGolem.traits[8].MultipliersArray  = [{text:"immunity",value:1}];                   // Resistant (Immunity)
NewTemplates.ClayGolem.traits[9].ConstantModsArray = [{text:"Homogenous, No Blood",value :45}];     // Injury Tolerance
NewTemplates.ClayGolem.traits[18].levels = -2;                                                      // Social Stigma -2
NewTemplates.ClayGolem.traits[18].description = "Valuable Property";                                // Social Stigma: valuable property
NewTemplates.ClayGolem.traits[19].levels = 2;                                                       // Unhealing (Total)
NewTemplates.ClayGolem.traits[20].key = 'Unnatural';
NewTemplates.ClayGolem.traits[21].key = 'NoFatigue';
NewTemplates.ClayGolem.skills[0].points = 2; NewTemplates.ClayGolem.skills[0].key = 'skilla';       // keys need to be defined here, since these are de novo Skill objects
NewTemplates.ClayGolem.skills[1].points = 2; NewTemplates.ClayGolem.skills[1].key = 'skillb';
NewTemplates.ClayGolem.skills[2].points = 2; NewTemplates.ClayGolem.skills[2].key = 'skillc';
NewTemplates.ClayGolem.skills[3].points = 2; NewTemplates.ClayGolem.skills[3].key = 'skilld';
NewTemplates.ClayGolem.skills[4].points = 2; NewTemplates.ClayGolem.skills[4].key = 'skille';


NewTemplates.SmallFireElemental = {
  name : 'Fire Elemental (small)',
  value : 40,
  ref : libAbrv+76,
  traits : [
    Traits.DecreasedST.clone(),         // 0
    Traits.DecreasedDX.clone(),
    Traits.DecreasedIQ.clone(),
    Traits.DecreasedHT.clone(),
    Traits.SizeModifier.clone(),
    Traits.IncreasedHP.clone(),         // 5
    Traits.BurningAttack.clone(),
    Traits.Charisma.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),
    Traits.DoesntSleep.clone(),         // 10
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.NoFineManipulators.clone(),
    Traits.Weakness.clone(),            // 15
  ],
  skills : [],
  spells : [],
  adjustments : []
};
NewTemplates.SmallFireElemental.traits[0].levels = 2;   // ST -2
NewTemplates.SmallFireElemental.traits[1].levels = 1;   // DX -1
NewTemplates.SmallFireElemental.traits[2].levels = 2;   // IQ -2
NewTemplates.SmallFireElemental.traits[3].levels = 3;   // HT -3
NewTemplates.SmallFireElemental.traits[4].levels =-1;   // SM -1
NewTemplates.SmallFireElemental.traits[5].levels = 2;   // HP +2
NewTemplates.SmallFireElemental.traits[6].levels = 2;                                               // Burning Attack 2d
NewTemplates.SmallFireElemental.traits[6].EnhLimsArray = [{text:"Always On",value :-40},{text:"Aura",value :80},{text:"Melee Attack, reach C",value :-30}];
NewTemplates.SmallFireElemental.traits[7].levels = 1;                                               // Charisma 1
NewTemplates.SmallFireElemental.traits[8].EnhLimsArray = [{text:"Oxygen Combustion",value :-50}];   // Doesn't Breathe limitation
NewTemplates.SmallFireElemental.traits[11].levels = 10; // DR 10
NewTemplates.SmallFireElemental.traits[11].EnhLimsArray = [{text:"Limited: Heat/Fire",value :-40}]; // DR limitation
NewTemplates.SmallFireElemental.traits[12].ConstantModsArray = [{text:"metabolic hazards",value:30}];// Resistant (Immunity)
NewTemplates.SmallFireElemental.traits[12].MultipliersArray  = [{text:"immunity",value:1}];         // Resistant (Immunity)
NewTemplates.SmallFireElemental.traits[13].ConstantModsArray = [{text:"Diffuse",value :100}];       // Injury Tolerance
NewTemplates.SmallFireElemental.traits[15].description = "Water";                                   // Weakness: Water
NewTemplates.SmallFireElemental.traits[15].MultipliersArray  = [{text:"common",value:2}];           // Weakness: Common substance
NewTemplates.SmallFireElemental.traits[15].ConstantModsArray = [{text:"1d/min",value:-20}];         // Weakness: damage rate 1d/min


NewTemplates.Mummy = {
  name  : "Mummy",
  value : -107,
  ref : libAbrv+152,
  traits :[
    Traits.IncreasedST.clone(),           // 0
    Traits.IncreasedHP.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),
    Traits.DoesntSleep.clone(),
    Traits.HighPainThreshold.clone(),     // 5
    Traits.Resistant.clone(),
    Traits.Resistant.clone(),
    Traits.Indomitable.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.SingleMinded.clone(),          // 10
    Traits.TemperatureTolerance.clone(),
    Traits.Unaging.clone(),
    Traits.Unfazeable.clone(),
    Traits.Monstrous.clone(),
    Traits.CannotLearn.clone(),           // 15
    Traits.Dependency.clone(),
    Traits.DisturbingVoice.clone(),
    Traits.Fragile.clone(),
    Traits.Fragile.clone(),
    Traits.Reprogrammable.clone(),        // 20
    Traits.SocialStigma.clone(),
    Traits.Unhealing.clone(),
    Traits.PovertyDeadBrokex0.clone(),
    new Trait( "Affected by Control Zombie, Pentagram, and Turn Zombie", "D", "M", 0 ),
    new Trait( "No mental skills", "D", "M", 0 ),
    new Trait( "Sterile", "D", "P", 0 ),
  ],
  metatraits : [
    Templates.Automaton
  ],
}
NewTemplates.Mummy.traits[0].levels = 1;  // ST +1
NewTemplates.Mummy.traits[1].levels = 4;  // HP +4
NewTemplates.Mummy.traits[6].multiple = 1;
NewTemplates.Mummy.traits[6].ConstantModsArray = [{text:"metabolic hazards",value:30}];  // Resistant (metabolic hazards)
NewTemplates.Mummy.traits[6].MultipliersArray  = [{text:"immunity",value:1}];            // Resistant (Immunity)
NewTemplates.Mummy.traits[7].multiple = 2;
NewTemplates.Mummy.traits[7].ConstantModsArray = [{text:"all mind control",value:30}];   // Resistant (mind control)
NewTemplates.Mummy.traits[7].MultipliersArray  = [{text:"immunity",value:1}];            // Resistant (Immunity)
NewTemplates.Mummy.traits[9].ConstantModsArray = [{text:"No Blood, No Brains, No Vitals, Unliving",value :35}];  // Injury Tolerance
NewTemplates.Mummy.traits[11].levels = 10;                                               // Temperature Tolerance 10
NewTemplates.Mummy.traits[14].EnhLimsArray = [{text:"Universal",value :25}];             // Monstrous: Universal
NewTemplates.Mummy.traits[16].description = "mana";                                      // Dependency: mana
NewTemplates.Mummy.traits[16].ConstantModsArray = [{text:"Availability: Common",value:-10}];  // Dependency
NewTemplates.Mummy.traits[16].MultipliersArray  = [{text:"Frequency: Constantly (1 HT/min)",value:5}];  // Dependency
NewTemplates.Mummy.traits[18].ConstantModsArray = [{text:"Combustible",value:-5}];       // Fragile
NewTemplates.Mummy.traits[18].multiple = 1;
NewTemplates.Mummy.traits[19].ConstantModsArray = [{text:"Unnatural",value:-50}];        // Fragile
NewTemplates.Mummy.traits[19].multiple = 2;
NewTemplates.Mummy.traits[21].levels = -4;                                               // Social Stigma -4
NewTemplates.Mummy.traits[21].description = "dead";                                      // Social Stigma
NewTemplates.Mummy.traits[22].levels = 2;                                                // Unhealing (Total)

NewTemplates.Skeleton = {
  name  : "Skeleton",
  value : -162,
  ref : libAbrv+152,
  traits :[
    Traits.DecreasedST.clone(),           // 0
    Traits.IncreasedDX.clone(),
    Traits.DecreasedIQ.clone(),
    Traits.IncreasedSpeed.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),      // 5
    Traits.DoesntSleep.clone(),
    Traits.DamageResistance.clone(),
    Traits.HighPainThreshold.clone(),
    Traits.Resistant.clone(),
    Traits.Resistant.clone(),             // 10
    Traits.Indomitable.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.SingleMinded.clone(),
    Traits.TemperatureTolerance.clone(),
    Traits.Unaging.clone(),               // 15
    Traits.Unfazeable.clone(),
    Traits.VacuumSupport.clone(),
    Traits.Monstrous.clone(),
    Traits.CannotLearn.clone(),
    Traits.Dependency.clone(),            // 20
    Traits.Fragile.clone(),
    Traits.Fragile.clone(),
    Traits.Mute.clone(),
    Traits.NoSenseofSmellTaste.clone(),
    Traits.Reprogrammable.clone(),        // 25
    Traits.Skinny.clone(),
    Traits.SocialStigma.clone(),
    Traits.Unhealing.clone(),
    Traits.Vulnerability.clone(),
    Traits.PovertyDeadBrokex0.clone(),    // 30
    new Trait( "Cannot Float", "Q", "P", -1 ),
    new Trait( "Sexless", "Q", "P", -1 ),
    new Trait( "Affected by Control Zombie, Pentagram, and Turn Zombie", "D", "M", 0 ),
    new Trait( "No mental skills", "D", "M", 0 ),
    new Trait( "Skull has only 2 total DR", "D", "P", 0 ), // 35
  ],
  metatraits : [
    Templates.Automaton
  ],
}
NewTemplates.Skeleton.traits[0].levels = 1;  // ST -1
NewTemplates.Skeleton.traits[1].levels = 2;  // DX +2
NewTemplates.Skeleton.traits[2].levels = 2;  // IQ -2
NewTemplates.Skeleton.traits[3].levels = 4;  // Basic Speed +1 (4 x 0.25)
NewTemplates.Skeleton.traits[7].levels = 2;  // DR 2
NewTemplates.Skeleton.traits[9].multiple = 1;
NewTemplates.Skeleton.traits[9].ConstantModsArray = [{text:"metabolic hazards",value:30}];          // Resistant (metabolic hazards)
NewTemplates.Skeleton.traits[9].MultipliersArray  = [{text:"immunity",value:1}];                    // Resistant (Immunity)
NewTemplates.Skeleton.traits[10].multiple = 2;
NewTemplates.Skeleton.traits[10].ConstantModsArray = [{text:"all mind control",value:30}];          // Resistant (mind control)
NewTemplates.Skeleton.traits[10].MultipliersArray  = [{text:"immunity",value:1}];                   // Resistant (Immunity)
NewTemplates.Skeleton.traits[12].ConstantModsArray = [{text:"No Blood, No Brains, No Eyes, No Vitals, Unliving",value :40}];  // Injury Tolerance
NewTemplates.Skeleton.traits[14].levels = 10;                                                       // Temperature Tolerance 10
NewTemplates.Skeleton.traits[18].EnhLimsArray = [{text:"Universal",value :25}];                     // Monstrous: Universal
NewTemplates.Skeleton.traits[20].description = "mana";                                              // Dependency: mana
NewTemplates.Skeleton.traits[20].ConstantModsArray = [{text:"Availability: Common",value:-10}];     // Dependency
NewTemplates.Skeleton.traits[20].MultipliersArray  = [{text:"Frequency: Constantly (1 HT/min)",value:5}];  // Dependency
NewTemplates.Skeleton.traits[21].ConstantModsArray = [{text:"Brittle",value:-15}];                  // Fragile (Brittle)
NewTemplates.Skeleton.traits[21].multiple = 1;
NewTemplates.Skeleton.traits[21].key = 'FragileBrittle';
NewTemplates.Skeleton.traits[22].ConstantModsArray = [{text:"Unnatural",value:-50}];                // Fragile (Unnatural)
NewTemplates.Skeleton.traits[22].multiple = 2;
NewTemplates.Skeleton.traits[22].key = 'FragileUnnatural';
NewTemplates.Skeleton.traits[27].levels = -4;                                                       // Social Stigma -4
NewTemplates.Skeleton.traits[27].description = "dead";                                              // Social Stigma
NewTemplates.Skeleton.traits[28].levels = 2;                                                        // Unhealing (Total)
NewTemplates.Skeleton.traits[29].levels = 3;                                                        // Vulnerability level 3 (common)
NewTemplates.Skeleton.traits[29].MultipliersArray  = [{text:"Damage ×2",value:2}];                  // Vulnerability damage x2
NewTemplates.Skeleton.traits[29].description = 'Crushing Attacks';                                  // Vulnerability


NewTemplates.Zombie = {
  name  : "Zombie",
  value : -168,
  ref : libAbrv+152,
  traits :[
    Traits.IncreasedST.clone(),               // 0
    Traits.DecreasedIQ.clone(),
    Traits.IncreasedHP.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),
    Traits.DoesntSleep.clone(),               // 5
    Traits.HighPainThreshold.clone(),
    Traits.Resistant.clone(),
    Traits.Resistant.clone(),
    Traits.Indomitable.clone(),
    Traits.InjuryTolerance.clone(),           // 10
    Traits.SingleMinded.clone(),
    Traits.TemperatureTolerance.clone(),
    Traits.Unaging.clone(),
    Traits.Unfazeable.clone(),
    Traits.Monstrous.clone(),                 // 15
    Traits.BadSmell.clone(),
    Traits.CannotLearn.clone(),
    Traits.Dependency.clone(),
    Traits.DisturbingVoice.clone(),
    Traits.Fragile.clone(),                   // 20
    Traits.NoSenseofSmellTaste.clone(),
    Traits.Reprogrammable.clone(),
    Traits.SocialStigma.clone(),
    Traits.Unhealing.clone(),
    Traits.PovertyDeadBrokex0.clone(),        // 25
    new Trait( "Sexless", "Q", "P", -1 ),
    new Trait( "Affected by Control Zombie, Pentagram, and Turn Zombie", "D", "M", 0 ),
    new Trait( "No mental skills", "D", "M", 0 ),
    new Trait( "Will become a Skeleton", "D", "P", 0 ),
  ],
  metatraits : [
    Templates.Automaton
  ],
}
NewTemplates.Zombie.traits[0].levels = 1;  // ST +1
NewTemplates.Zombie.traits[1].levels = 2;  // IQ -2
NewTemplates.Zombie.traits[2].levels = 4;  // HP +4
NewTemplates.Zombie.traits[7].multiple = 1;
NewTemplates.Zombie.traits[7].ConstantModsArray = [{text:"metabolic hazards",value:30}];            // Resistant (metabolic hazards)
NewTemplates.Zombie.traits[7].MultipliersArray  = [{text:"immunity",value:1}];                      // Resistant (Immunity)
NewTemplates.Zombie.traits[8].multiple = 2;
NewTemplates.Zombie.traits[8].ConstantModsArray = [{text:"all mind control",value:30}];             // Resistant (mind control)
NewTemplates.Zombie.traits[8].MultipliersArray  = [{text:"immunity",value:1}];                      // Resistant (Immunity)
NewTemplates.Zombie.traits[10].ConstantModsArray = [{text:"No Blood, Unliving",value :25}];         // Injury Tolerance
NewTemplates.Zombie.traits[12].levels = 10;                                                         // Temperature Tolerance 10
NewTemplates.Zombie.traits[15].EnhLimsArray = [{text:"Universal",value :25}];                       // Monstrous: Universal
NewTemplates.Zombie.traits[18].description = "mana";                                                // Dependency: mana
NewTemplates.Zombie.traits[18].ConstantModsArray = [{text:"Availability: Common",value:-10}];       // Dependency
NewTemplates.Zombie.traits[18].MultipliersArray  = [{text:"Frequency: Constantly (1 HT/min)",value:5}];  // Dependency
NewTemplates.Zombie.traits[20].ConstantModsArray = [{text:"Unnatural",value:-50}];                  // Fragile
NewTemplates.Zombie.traits[20].multiple = 2;
NewTemplates.Zombie.traits[23].levels = -4;                                                         // Social Stigma -4
NewTemplates.Zombie.traits[23].description = "dead";                                                // Social Stigma
NewTemplates.Zombie.traits[24].levels = 2;                                                          // Unhealing (Total)


NewTemplates.Demon = {
  name  : "Demon",
  value : 200,
  ref : libAbrv+155,
  traits :[
    Traits.IncreasedST.clone(),           // 0
    Traits.IncreasedDX.clone(),
    Traits.IncreasedHT.clone(),
    Traits.IncreasedHP.clone(),
    Traits.ClawsSharp.clone(),
    Traits.DamageResistance.clone(),      // 5
    Traits.Flight.clone(),
    Traits.IncreasedAirMove.clone(),      // this is NOT a modifier to Flight; it is a separate advantage
    Traits.Resistant.clone(),
    Traits.Resistant.clone(),
    Traits.Magery0.clone(),               // 10
    Traits.NightVision.clone(),
    Traits.StrikingST.clone(),
    Traits.TeethSharp.clone(),
    Traits.Monstrous.clone(),
    Traits.Bloodlust.clone(),             // 15
    Traits.Bully.clone(),
    Traits.Callous.clone(),
    Traits.Pacifism.clone(),
    Traits.Fragile.clone(),
    Traits.Sadism.clone(),                // 20
    Traits.Selfish.clone(),
    Traits.SocialStigma.clone(),
    new Trait( "Affected by True Faith and Pentagram", "D", "M", 0 ),
  ],
  skills : [
    Skills.Acting.clone(),
    Skills.Brawling.clone(),
    Skills.Broadsword.clone(),
    Skills.FastTalk.clone(),
    Skills.HiddenLore.clone(),
    Skills.Intimidation.clone(),
    Skills.Stealth.clone(),
  ]
}
NewTemplates.Demon.traits[0].levels = 7;  // ST +7
NewTemplates.Demon.traits[1].levels = 2;  // DX +2
NewTemplates.Demon.traits[2].levels = 4;  // HT +4
NewTemplates.Demon.traits[3].levels = 8;  // HP +8
NewTemplates.Demon.traits[5].levels = 5;  // DR 5
NewTemplates.Demon.traits[6].EnhLimsArray = [{text:"Winged",value:-25}];                            // Flight, winged
NewTemplates.Demon.traits[7].levels = 5;                                                            // +5 yds/sec to Air Move
NewTemplates.Demon.traits[8].multiple = 1;
NewTemplates.Demon.traits[8].ConstantModsArray = [{text:"metabolic hazards",value:30}];             // Resistant (metabolic hazards)
NewTemplates.Demon.traits[8].MultipliersArray  = [{text:"immunity",value:1}];                       // Resistant (Immunity)
NewTemplates.Demon.traits[9].multiple = 2;
NewTemplates.Demon.traits[9].ConstantModsArray = [{text:"mind-affecting magic",value:30}];          // Resistant (mind control)
NewTemplates.Demon.traits[9].MultipliersArray  = [{text:"immunity",value:1}];                       // Resistant (Immunity)
NewTemplates.Demon.traits[11].levels = 5;                                                           // Night Vision 5
NewTemplates.Demon.traits[12].levels = 2;                                                           // Striking ST +2
NewTemplates.Demon.traits[15].MultipliersArray = [{text:"12",value:1}];                             // Bloodlust (12)
NewTemplates.Demon.traits[16].MultipliersArray = [{text:"12",value:1}];                             // Bully (12)
NewTemplates.Demon.traits[18].ConstantModsArray = [{text:"cannot harm innocents",value:-10}];       // Pacifism: cannot harm innocents
NewTemplates.Demon.traits[18].EnhLimsArray = [{text:"Prevents direct harm of truly good or holy folks only",value:-50}];  // Pacifism
NewTemplates.Demon.traits[19].ConstantModsArray = [{text:"Unnatural",value:-50}];                   // Fragile
NewTemplates.Demon.traits[20].MultipliersArray = [{text:"12",value:1}];                             // Sadism (12)
NewTemplates.Demon.traits[21].MultipliersArray = [{text:"12",value:1}];                             // Selfish (12)
NewTemplates.Demon.traits[22].levels = -3;                                                          // Social Stigma -3
NewTemplates.Demon.traits[22].description = "monster";                                              // Social Stigma
NewTemplates.Demon.skills[0].points = 1;
NewTemplates.Demon.skills[1].points = 4;
NewTemplates.Demon.skills[2].points = 2;
NewTemplates.Demon.skills[3].points = 4;
NewTemplates.Demon.skills[4].points = 1; NewTemplates.Demon.skills[4].specialization = 'Demon Lore';
NewTemplates.Demon.skills[5].points = 4;
NewTemplates.Demon.skills[6].points = 2;


NewTemplates.Lich = {
  name  : "Lich",
  value : 105,
  ref : libAbrv+160,
  traits :[
    Traits.DecreasedST.clone(),           // 0
    Traits.IncreasedDX.clone(),
    Traits.IncreasedHT.clone(),
    Traits.IncreasedSpeed.clone(),
    Traits.IncreasedHP.clone(),
    Traits.IncreasedFP.clone(),           // 5
    Traits.DoesntBreathe.clone(),
    Traits.DoesntEatorDrink.clone(),
    Traits.DoesntSleep.clone(),
    Traits.DamageResistance.clone(),
    Traits.HighPainThreshold.clone(),     // 10
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.TemperatureTolerance.clone(),
    Traits.Unaging.clone(),
    Traits.Unfazeable.clone(),            // 15
    Traits.VacuumSupport.clone(),
    Traits.Monstrous.clone(),
    Traits.Dependency.clone(),
    Traits.Fragile.clone(),
    Traits.Fragile.clone(),               // 20
    Traits.NoSenseofSmellTaste.clone(),
    Traits.Skinny.clone(),
    Traits.SocialStigma.clone(),
    Traits.Vulnerability.clone(),
    new Trait( "Cannot Float", "Q", "P", -1 ), // 25
    new Trait( "Sexless", "Q", "P", -1 ),
    new Trait( "Affected by Pentagram", "D", "M", 0 ),
    new Trait( "Can be turned using True Faith", "D", "M", 0 ),
    new Trait( "Skull has only 2 total DR", "D", "P", 0 ),
    new Trait( 'Thanatology skill bonus', "D", 'M', 2, true ),// 30
  ],
  adjustments : [
    { from: 'Thanatologyskillbonus', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'Thanatology' },
  ],
}
NewTemplates.Lich.traits[0].levels = 1;  // ST -1
NewTemplates.Lich.traits[1].levels = 2;  // DX +2
NewTemplates.Lich.traits[2].levels = 2;  // HT +2
NewTemplates.Lich.traits[3].levels = 4;  // Basic Speed +1 (4 x 0.25)
NewTemplates.Lich.traits[4].levels = 3;  // HP +3
NewTemplates.Lich.traits[5].levels = 3;  // FP +3
NewTemplates.Lich.traits[9].levels = 2;  // DR 2
NewTemplates.Lich.traits[11].ConstantModsArray = [{text:"metabolic hazards",value:30}];             // Resistant (metabolic hazards)
NewTemplates.Lich.traits[11].MultipliersArray  = [{text:"immunity",value:1}];                       // Resistant (Immunity)
NewTemplates.Lich.traits[12].ConstantModsArray = [{text:"No Blood, No Brains, No Eyes, No Vitals, Unliving",value :40}];  // Injury Tolerance
NewTemplates.Lich.traits[13].levels = 10;                                                           // Temperature Tolerance 10
NewTemplates.Lich.traits[17].EnhLimsArray = [{text:"Universal",value :25}];                         // Monstrous: Universal
NewTemplates.Lich.traits[18].description = "mana";                                                  // Dependency: mana
NewTemplates.Lich.traits[18].ConstantModsArray = [{text:"Availability: Common",value:-10}];         // Dependency
NewTemplates.Lich.traits[18].MultipliersArray  = [{text:"Frequency: Constantly (1 HT/min)",value:5}];  // Dependency
NewTemplates.Lich.traits[19].ConstantModsArray = [{text:"Brittle",value:-15}];                      // Fragile (Brittle)
NewTemplates.Lich.traits[19].multiple = 1;
NewTemplates.Lich.traits[19].key = 'FragileBrittle';
NewTemplates.Lich.traits[20].ConstantModsArray = [{text:"Unnatural",value:-50}];                    // Fragile (Unnatural)
NewTemplates.Lich.traits[20].EnhLimsArray = [{text:"Mitigated by potion, monthly",value :-70}];
NewTemplates.Lich.traits[20].multiple = 2;
NewTemplates.Lich.traits[20].key = 'FragileUnnatural';
NewTemplates.Lich.traits[23].levels = -4;                                                           // Social Stigma -4
NewTemplates.Lich.traits[23].description = "dead";                                                  // Social Stigma
NewTemplates.Lich.traits[24].levels = 3;                                                            // Vulnerability level 3 (common)
NewTemplates.Lich.traits[24].MultipliersArray  = [{text:"Damage ×2",value:2}];                      // Vulnerability damage x2
NewTemplates.Lich.traits[24].description = 'Crushing Attacks';                                      // Vulnerability
NewTemplates.Lich.traits[30].levels = 1;                                                            // Thanatology +1
NewTemplates.Lich.traits[30].key = 'Thanatologyskillbonus';


NewTemplates.Wraith = {
  name  : "Wraith",
  value : 233,
  ref : libAbrv+160,
  traits :[
    Traits.IncreasedST.clone(),             // 0
    Traits.IncreasedHT.clone(),
    Traits.IncreasedHP.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),               // 5
    Traits.InjuryTolerance.clone(),
    Traits.Magery.clone(),
    Traits.NightVision.clone(),
    Traits.SupernaturalDurability.clone(),
    Traits.TemperatureTolerance.clone(),    // 10
    Traits.Unaging.clone(),
    Traits.Unfazeable.clone(),
    Traits.Horrific.clone(),
    Traits.Bloodlust.clone(),
    Traits.Callous.clone(),                 // 15
    Traits.Dependency.clone(),
    Traits.DisturbingVoice.clone(),
    Traits.SocialStigma.clone(),
    Traits.SupernaturalFeature.clone(),
    Traits.SupernaturalFeature.clone(),     // 20
    Traits.Unhealing.clone(),
    new Trait( "Loves Battle", "Q", "M", -1 ),
    new Trait( "Sexless", "Q", "P", -1 ),
    Traits.Magery0.clone(),   // at the end to avoid having to re-calculate all the indices below
  ],
  skills : [
    NewSpells.Deathtouch.clone(),
    NewSpells.StealVitality.clone(),
    NewSpells.EtherealBody.clone(),
  ]
}
NewTemplates.Wraith.traits[0].levels = 5;  // ST +5
NewTemplates.Wraith.traits[1].levels = 5;  // HT +5
NewTemplates.Wraith.traits[2].levels = 5;  // HP +5
NewTemplates.Wraith.traits[4].levels = 4;  // DR 4
NewTemplates.Wraith.traits[5].multiple = 1;
NewTemplates.Wraith.traits[5].ConstantModsArray = [{text:"metabolic hazards",value:30}];  // Resistant (metabolic hazards)
NewTemplates.Wraith.traits[5].MultipliersArray  = [{text:"immunity",value:1}];            // Resistant (Immunity)
NewTemplates.Wraith.traits[6].ConstantModsArray = [{text:"No Blood, No Brains, No Vitals, Unliving",value :35}];  // Injury Tolerance
NewTemplates.Wraith.traits[7].levels = 1;                                                 // Magery 1
NewTemplates.Wraith.traits[8].levels = 9;                                                 // Night Vision 9
NewTemplates.Wraith.traits[9].description = "Spells, Magic Weapons";                      // Supernatural Durability "Achille's Heel"
NewTemplates.Wraith.traits[10].levels = 10;                                               // Temperature Tolerance 10
NewTemplates.Wraith.traits[14].MultipliersArray = [{text:"12",value:1}];                  // Bloodlust (12)
NewTemplates.Wraith.traits[16].description = "Wraith item";                               // Dependency: mana
NewTemplates.Wraith.traits[16].ConstantModsArray = [{text:"Availability: Rare",value:-30}]; // Dependency
NewTemplates.Wraith.traits[16].MultipliersArray  = [{text:"Frequency: Constantly (1 HT/min)",value:5}];  // Dependency
NewTemplates.Wraith.traits[18].levels = -4;                                               // Social Stigma -4
NewTemplates.Wraith.traits[18].description = "dead";                                      // Social Stigma
NewTemplates.Wraith.traits[19].levels = 1;
NewTemplates.Wraith.traits[19].description = 'no body heat';
NewTemplates.Wraith.traits[19].multiple = 1;
NewTemplates.Wraith.traits[20].levels = 2;
NewTemplates.Wraith.traits[20].description = 'pallor';
NewTemplates.Wraith.traits[20].multiple = 2;
NewTemplates.Wraith.traits[21].levels = 1;                                                // Unhealing (Partial)
NewTemplates.Wraith.traits[21].description = "Can heal with Steal HT";                    // Unhealing (Partial)
NewTemplates.Wraith.skills[0].points = 20; NewTemplates.Wraith.skills[0].spell = true;    // Deathtouch
NewTemplates.Wraith.skills[1].points = 20; NewTemplates.Wraith.skills[1].spell = true;    // Steal Vitality
NewTemplates.Wraith.skills[2].points = 20; NewTemplates.Wraith.skills[2].spell = true;    // Ethereal Body


NewTemplates.BodyOfWood = {
  name  : "Body of Wood",
  value : 76,
  ref : libAbrv+165,
  meta  : true,
  traits :[
    Traits.DecreasedSpeed.clone(),
    Traits.LiftingST.clone(),
    Traits.BluntClaws.clone(),
    Traits.DamageResistance.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.Numb.clone(),
    new Trait( "Affected by Plant spells", "D", "P", 0 )
  ],
}
NewTemplates.BodyOfWood.traits[0].levels = 4;
NewTemplates.BodyOfWood.traits[1].levels = 5;
NewTemplates.BodyOfWood.traits[3].levels = 2;
NewTemplates.BodyOfWood.traits[3].EnhLimsArray = [{text:"Semi-Ablative",value :-20}];
NewTemplates.BodyOfWood.traits[5].ConstantModsArray = [{text:"metabolic hazards",value:30}];
NewTemplates.BodyOfWood.traits[5].MultipliersArray  = [{text:"immunity",value:1}];
NewTemplates.BodyOfWood.traits[6].ConstantModsArray = [{text:"Homogenous",value :40}];

NewTemplates.BodyOfSlime = {
  name  : "Body of Slime",
  value : 60,
  ref : libAbrv+165,
  meta  : true,
  traits :[
    Traits.Amphibious.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.BadSmell.clone(),
    Traits.DisturbingVoice.clone(),
    Traits.Invertebrate.clone(),
    new Trait( "Affected by Plant spells", "D", "P", 0 )
  ],
}
NewTemplates.BodyOfSlime.traits[2].ConstantModsArray = [{text:"metabolic hazards",value:30}];
NewTemplates.BodyOfSlime.traits[2].MultipliersArray  = [{text:"immunity",value:1}];
NewTemplates.BodyOfSlime.traits[3].ConstantModsArray = [{text:"Homogenous",value :40}];

NewTemplates.BodyOfPlastic = {
  name  : "Body of Plastic",
  value : 125,
  ref : libAbrv+183,
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
NewTemplates.BodyOfPlastic.traits[1].levels = 1;
NewTemplates.BodyOfPlastic.traits[2].ConstantModsArray = [{text:"metabolic hazards",value:30}];
NewTemplates.BodyOfPlastic.traits[2].MultipliersArray  = [{text:"immunity",value:1}];
NewTemplates.BodyOfPlastic.traits[3].ConstantModsArray = [{text:"Homogenous, No Blood",value :45}];
NewTemplates.BodyOfPlastic.traits[4].levels = 1;

NewTemplates.SmallWaterElemental = {
  name : 'Water Elemental (small)',
  value : 30,     // this is *corrected* for the mis-pricing of Invertebrate disad in Magic 3e template work-up
  ref : libAbrv+191,
  traits : [
    Traits.DecreasedST.clone(),
    Traits.DecreasedDX.clone(),
    Traits.DecreasedIQ.clone(),
    Traits.DecreasedHT.clone(),
    Traits.SizeModifier.clone(),
    // the rest is *almost* the Body of Water meta-trait (exactly the same but without the Constriction Attack)
    Traits.Amphibious.clone(),            // 5
    Traits.Chameleon.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DoesntSleep.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),       // 10
    Traits.PressureSupport.clone(),
    Traits.Slippery.clone(),
    Traits.Invertebrate.clone(),          // Magic 3e says this is worth -10; Basic 4e says nope -20
    Traits.Vulnerability.clone(),
  ],
  skills : [],
  spells : [],
  adjustments : []
};
NewTemplates.SmallWaterElemental.traits[0].levels = 3;  // ST-3
NewTemplates.SmallWaterElemental.traits[1].levels = 2;  // DX-2
NewTemplates.SmallWaterElemental.traits[2].levels = 3;  // IQ-3
NewTemplates.SmallWaterElemental.traits[3].levels = 2;  // HT-2
NewTemplates.SmallWaterElemental.traits[4].levels =-1;  // SM-1
NewTemplates.SmallWaterElemental.traits[6].levels = 1;                                              // Chameleon 1
NewTemplates.SmallWaterElemental.traits[9].ConstantModsArray = [{text:"metabolic hazards",value:30}];// Resistant (Immunity)
NewTemplates.SmallWaterElemental.traits[9].MultipliersArray  = [{text:"immunity",value:1}];         // Resistant (Immunity)
NewTemplates.SmallWaterElemental.traits[10].ConstantModsArray = [{text:"Diffuse",value :100}];      // Injury Tolerance
NewTemplates.SmallWaterElemental.traits[11].levels = 3;                                             // Pressure Support 3
NewTemplates.SmallWaterElemental.traits[12].levels = 5;                                             // Slippery 5
NewTemplates.SmallWaterElemental.traits[14].levels = 1;                                             // Vulnerability level 1 (rare)
NewTemplates.SmallWaterElemental.traits[14].MultipliersArray  = [{text:"Damage ×2",value:2}];       // Vulnerability damage x2
NewTemplates.SmallWaterElemental.traits[14].description = 'Dehydration';                            // Vulnerability

NewTemplates.BodyOfLightning = {
  name  : "Body of Lightning",
  value : 56,
  ref : libAbrv+198,
  meta  : true,
  traits :[
    Traits.DecreasedST.clone(),
    Traits.IncreasedHP.clone(),
    Traits.BurningAttack.clone(),
    Traits.DoesntBreathe.clone(),
    Traits.DamageResistance.clone(),
    Traits.Resistant.clone(),
    Traits.InjuryTolerance.clone(),
    Traits.NoManipulators.clone(),
    new Trait( "Affected by Energy spells", "D", "P", 0 ),
    new Trait( "Taboo Trait", "D", "P", 0 )
  ],
}
NewTemplates.BodyOfLightning.traits[0].levels = 10;
NewTemplates.BodyOfLightning.traits[1].levels = 10;
NewTemplates.BodyOfLightning.traits[2].levels = 1;
NewTemplates.BodyOfLightning.traits[2].EnhLimsArray = [{text:"Always On",value :-40},{text:"Aura",value :80},{text:"Melee Attack, reach C",value :-30}];
NewTemplates.BodyOfLightning.traits[4].levels = 10;
NewTemplates.BodyOfLightning.traits[4].EnhLimsArray = [{text:"Limited: Electricity",value :-40}];
NewTemplates.BodyOfLightning.traits[5].ConstantModsArray = [{text:"metabolic hazards",value:30}];
NewTemplates.BodyOfLightning.traits[5].MultipliersArray  = [{text:"immunity",value:1}];
NewTemplates.BodyOfLightning.traits[6].ConstantModsArray = [{text:"Diffuse",value :100}];
NewTemplates.BodyOfLightning.traits[9].description = "fixed ST";

for ( var t in NewTemplates ) {
    if( !NewTemplates[t].hasOwnProperty('key') ) NewTemplates[t].key = t;
};

if(window.console) console.log(newLibrary+" library file load finished");
//if(window.console) console.log("when "+newLibrary+" library file load finished, Groups.Spells.length is "+Groups.Spells.length);
//if(window.console) console.log(Groups.Spells);

