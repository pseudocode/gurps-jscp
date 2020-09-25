var libraryName = "GURPS3 Ultra-Tech";
libraryList.push( libraryName );


/* Basic Equipment                               'name',             weight,  cost, TL, LC, ref  */
NewEquipment.AAcell              = new Equipment('AA cell',          1/8000,     2,  8,  6, 'UT5');
NewEquipment.Acell               = new Equipment('A cell',            1/400,    10,  8,  6, 'UT5');
NewEquipment.Bcell               = new Equipment('B cell',             1/20,    30,  8,  6, 'UT6');
NewEquipment.Ccell               = new Equipment('C cell',              1/2,   100,  8,  6, 'UT6');
NewEquipment.Dcell               = new Equipment('D cell',                5,   500,  8,  6, 'UT6');
NewEquipment.Ecell               = new Equipment('E cell',               20,  2000,  8,  6, 'UT6');

// NewEquipment.name                = new Equipment('name',                  2,   100,  8,  6, 'UT');
// NewEquipment.name                = new Equipment('name',                  2,   100,  8,  6, 'UT');
// NewEquipment.name                = new Equipment('name',                  2,   100,  8,  6, 'UT');
// NewEquipment.name                = new Equipment('name',                  2,   100,  8,  6, 'UT');
// NewEquipment.name                = new Equipment('name',                  2,   100,  8,  6, 'UT');
// NewEquipment.name                = new Equipment('name',                  2,   100,  8,  6, 'UT');
NewEquipment.ImplantComm         = new Equipment('communicator',          0,   500,  8,  6, 'UT30');
NewEquipment.ImplantComm.detail = "implant";
NewEquipment.ShortRangeComm      = new Equipment('communicator',        1/8,    50,  8,  6, 'UT30');
NewEquipment.ShortRangeComm.detail = "short-range";
NewEquipment.MediumRangeComm     = new Equipment('communicator',          1,   200,  8,  6, 'UT30');
NewEquipment.MediumRangeComm.detail = "medium-range";
NewEquipment.LongRangeComm       = new Equipment('communicator',         10,   600,  8,  6, 'UT30');
NewEquipment.LongRangeComm.detail = "long-range";
// NewEquipment.CommScrambler       = new Equipment('comm scrambler',      1/4,   100,  8,  6, 'UT31');
NewEquipment.AirMask             = new Equipment('Air mask',              2,   100,  8,  6, 'UT37');
NewEquipment.CBRfilter           = new Equipment('CBR filter',            1,   200,  8,  6, 'UT38');
NewEquipment.Nightshades         = new Equipment('Nightshades',         1/4,   600,  9,  6, 'UT58');


/* Armor                                    'name',                      wt,  cost, TL, LC, DR, PD, location*, */
NewEquipment.VaccSuit            = new Armor('Vacc suit',                10,  1000,  8,  6,  1,  0,  ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'], 'UT39');
NewEquipment.VaccSuitHeavyDuty   = new Armor('Vacc suit',                20,  1500,  8,  6,  3,  2,  ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'], 'UT39');
NewEquipment.VaccSuitHeavyDuty.detail = "heavy-duty";
NewEquipment.VaccSuitArmored     = new Armor('Vacc suit',                80,  4000,  8,  6, 30,  4,  ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'], 'UT39');
NewEquipment.VaccSuitArmored.detail = "armored";
// NewEquipment.VaccSuitHelmet      = new Armor('Vacc suit helmet',         10,  1000,  8,  6,  3,  2,  ['head');
NewEquipment.MonocrysLight       = new Armor('monocrys armor suit',       7,  1000,  8,  4,  8,  2,  ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'], 'UT28');
NewEquipment.MonocrysLight.detail = "light";
NewEquipment.MonocrysLight.splitDR = 2;  NewEquipment.MonocrysLight.splitPD = 1;
NewEquipment.MonocrysMedium      = new Armor('monocrys armor suit',      12,  1500,  8,  3, 16,  2,  ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'], 'UT28');
NewEquipment.MonocrysMedium.detail = "medium";
NewEquipment.MonocrysMedium.splitDR = 2;  NewEquipment.MonocrysMedium.splitPD = 1;
NewEquipment.MonocrysHeavy       = new Armor('monocrys armor suit',      16,  2000,  8,  2, 24,  2,  ['suit','neck','torso','waist','groin','domArm','offArm','domLeg','offLeg','domHand','offHand','domFoot','offFoot'], 'UT28');
NewEquipment.MonocrysHeavy.detail = "heavy";
NewEquipment.MonocrysHeavy.splitDR = 2;  NewEquipment.MonocrysHeavy.splitPD = 1;

/* Weapons                                       'name',             weight,  cost, TL, LC, bulk, qual, ref */
NewEquipment.Stunwand               = new Weapon('Stunwand',              1,   100,  8,  6,   -3, null, 'UT24' );
NewEquipment.Stunwand.wieldOptions = {
  Shortsword: [
    { title: 'swing',  hands: 'dom', strength: 7, damage: { base: 'sw',  mods: 0, type: 'cr/sp' }, note: ["In addition to any damage from being struck by the baton, the victim must make a HT-3 roll to avoid being stunned; if stunned, the victim loses 1d fatigue and remains stunned for as long as the weapon is in contact, and (20-HT) seconds longer, before any recovery rolls are permitted.  Using a B cell, srikes 20 times before losing power."] },
    { title: 'thrust', hands: 'dom', strength: 7, damage: { base: 'thr', mods: 0, type: 'cr/sp' }, note: ["In addition to any damage from being struck by the baton, the victim must make a HT-3 roll to avoid being stunned; if stunned, the victim loses 1d fatigue and remains stunned for as long as the weapon is in contact, and (20-HT) seconds longer, before any recovery rolls are permitted.  Using a B cell, srikes 20 times before losing power."] }
  ]
};
NewEquipment.HvyLaserPistol         = new Weapon('Heavy Laser Pistol',    3,  1500,  8,  2,   -3, null, 'UT22');
NewEquipment.HvyLaserPistol.shots = 12;
NewEquipment.HvyLaserPistol.wieldOptions = { BeamWeapons_LaserPistol: [ { hands: 'dom', damage: { base: 2,  mods: 0, type: 'imp' }, accuracy: 8, halfDamageRange: 300, maximumRange: 800, snapShot: 11, rateOfFire: 3, recoil: 0, note: ["C cell required"] } ] };
NewEquipment.Needler                = new Weapon('Needler',               1,   500,  8,  3,   -2, null, 'UT23');
NewEquipment.Needler.wieldOptions = { BeamWeapons_Needler: [ { hands: 'dom', damage: { base: 1,  mods: 2, type: 'imp' }, accuracy: 1, halfDamageRange: 100, maximumRange: 300, snapShot: 9, rateOfFire: '3~', recoil: -1 } ] };
NewEquipment.Needler.shots = 100;
NewEquipment.GyrocLaunchPistol      = new Weapon('Gyroc Launch Pistol',   4,   800,  8,  2,   -3, null, 'UT20');
NewEquipment.GyrocLaunchPistol.shots = '3/3/3';
NewEquipment.GyrocLaunchPistol.wieldOptions = { Guns_Gyroc: [ { hands: 'dom', damage: { base: 8,  mods: 0, type: 'imp' }, accuracy: 5, halfDamageRange: 1800, maximumRange: 2500, snapShot: 12, rateOfFire: '3~', recoil: 0, note: ["uses Gyroc ammo; see UT20s"] } ] };
NewEquipment.GyrocLaunchPistol.armorDivisor = 2;
NewEquipment.GyrocRocketCarbine     = new Weapon('Gyroc Rocket Carbine',  9,  1500,  8,  1,   -3, null, 'UT20');
NewEquipment.GyrocRocketCarbine.shots = '10/10';
NewEquipment.GyrocRocketCarbine.wieldOptions = { Guns_Gyroc: [ { hands: 'dom', damage: { base: 8,  mods: 0, type: 'imp' }, accuracy: 7, halfDamageRange: 1800, maximumRange: 2500, snapShot: 15, rateOfFire: 10, recoil: 0, note: ["uses Gyroc ammo; see UT20s"] } ] };
NewEquipment.GyrocRocketCarbine.armorDivisor = 2;

importLibrarySettings();

if(window.console) { console.log(libraryName+" library file load finished") }
