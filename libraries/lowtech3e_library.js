var newLibrary = "GURPS Low-Tech";   // this gets processed like NewEquipment, etc. in processNewLibraryItems(), not when this file gets loaded
var libAbrv = 'LT';

/* skills */
// this (like all other 'skills' in Low-Tech) is actually a Maneuver, which I don't put in libraries
// NewSkills.RunningthePole            = new Skill( "Running the Pole",   'DX',     2, libAbrv + "75" );
// NewPrerequisites.RunningthePole_requires_Teamster = { target: 'RunningthePole'rereq: 'Teamster' };
// NewDefaults.RunningthePole_from_Acrobatics = { target: 'RunningthePole'enalty:  0, category: 'SK', from: 'Acrobatics' };
// NewDefaults.RunningthePole_from_Teamster   = { target: 'RunningthePole'enalty: -4, category: 'SK', from: 'Teamster' };

/* TL 0 */
NewEquipment.adzestone              = new Equipment('adze',               4,    50,  0,  6, libAbrv+'29');
NewEquipment.adzestone.detail = "stone";
NewEquipment.bowdrill               = new Equipment('bow drill',          1,    45,  0,  6, libAbrv+'29');
NewEquipment.burin                  = new Equipment('burin',              0,    40,  0,  6, libAbrv+'29');
NewEquipment.chopper                = new Equipment('chopper',            1,    10,  0,  6, libAbrv+'29');
NewEquipment.needle                 = new Equipment('needle',             0,   100,  0,  6, libAbrv+'29');
NewEquipment.sawTL0                 = new Equipment('saw',                3,   150,  0,  6, libAbrv+'29');
NewEquipment.sawTL0.detail = "TL0";
NewEquipment.scraper                = new Equipment('scraper',            1,    50,  0,  6, libAbrv+'29');
NewEquipment.spindle                = new Equipment('spindle',            1,     5,  0,  6, libAbrv+'29');
NewEquipment.distaff                = new Equipment('distaff',            2,     5,  0,  6, libAbrv+'29');
NewEquipment.snowshovel             = new Equipment('snow shovel',        2,    15,  0,  6, libAbrv+'30');
NewEquipment.snowshovel.notes = ["used to dig in snow at 0.075×ST y³/hr"];
NewEquipment.snowknife              = new Equipment('knife',              1,    10,  0,  6, libAbrv+'30');
NewEquipment.snowknife.detail = 'snow';
NewEquipment.snowknife.notes = ["made of bone or wood, used to cut blocks of compacted snow at 0.075×ST y³/hr",
                                "These can be used to build shelters with a roll against Survival-2 or Masonry, taking 2d man-hours per person accommodated."];
NewEquipment.snowgoggles            = new Equipment('goggles',            1,    15,  0,  6, libAbrv+'30');
NewEquipment.snowgoggles.detail = 'snow';
NewEquipment.snowgoggles.notes = ["Vision -3 while worn"];
NewEquipment.parka                  = new Equipment('parka',             10,   100,  0,  6, libAbrv+'30');
NewEquipment.parka.notes = ["+5 to HT or Survival rolls to withstand exposure."];
NewEquipment.mukluks                = new Equipment('mukluks',            2,    50,  0,  6, libAbrv+'30');
NewEquipment.mukluks.notes = ["+2 to Stealth for walking on snow"];
NewEquipment.snowshoes              = new Equipment('snowshoes',          2,    50,  0,  6, libAbrv+'30');
NewEquipment.snowshoes.notes = ["-2 to Move; long-distance speed 60%"];
NewEquipment.diggingstick           = new Equipment('stick',              2,    10,  0,  6, libAbrv+'30');
NewEquipment.diggingstick.detail = 'digging';
NewEquipment.diggingstick.notes = ["can turn over 0.06×ST y³/hr in sand or loose soil, or 0.03×ST y³/hr in ordinary soil"];
NewEquipment.flintpyrite            = new Equipment('flint/pyrite sparking kit', 1,  6,  0,  6, libAbrv+'30');
NewEquipment.bowpalette             = new Equipment('bow/palette firemaking kit', 1, 36, 0,  6, libAbrv+'30');
NewEquipment.fishhook               = new Equipment('fishhook',           0,    50,  0,  6, libAbrv+'30');
NewEquipment.skinfloat              = new Equipment('float',            2.5,  12.5,  0,  6, libAbrv+'31');
NewEquipment.skinfloat.detail = 'skin';
NewEquipment.skinfloat.unit = "ft³";
NewEquipment.skinfloat.notes = ["buoyancy 60 lbs/ft³"];
NewEquipment.claypotfloat           = new Equipment('float',            7.5,     2,  0,  6, libAbrv+'31');
NewEquipment.claypotfloat.detail = 'clay pot';
NewEquipment.claypotfloat.unit = "ft³";
NewEquipment.claypotfloat.notes = ["buoyancy 55 lbs/ft³"];
NewEquipment.woodblockfloat         = new Equipment('float',             30,     8,  0,  6, libAbrv+'31');
NewEquipment.woodblockfloat.detail = 'wood block';
NewEquipment.woodblockfloat.unit = "ft³";
NewEquipment.woodblockfloat.notes = ["buoyancy 32.5 lbs/ft³"];
NewEquipment.reedbundlefloat        = new Equipment('float',             15,     2,  0,  6, libAbrv+'31');
NewEquipment.reedbundlefloat.detail = 'reed bundle';
NewEquipment.reedbundlefloat.unit = "ft³";
NewEquipment.reedbundlefloat.notes = ["buoyancy 47.5 lbs/ft³"];
NewEquipment.logfloat               = new Equipment('float',             25,     2,  0,  6, libAbrv+'31');
NewEquipment.logfloat.detail = 'log'; NewEquipment.logfloat.description = "12″ diameter";
NewEquipment.logfloat.unit = "ft";
NewEquipment.logfloat.notes = ["buoyancy 25 lbs/ft"];
NewEquipment.rope1inch              = new Equipment('rope',             0.9,   1.5,  0,  6, libAbrv+'31');
NewEquipment.rope1inch.detail = '1″';
NewEquipment.rope1inch.unit = "yd";		NewEquipment.rope1inch.continuous = true;
NewEquipment.rope1inch.notes = ['supports 1800 lbs.'],
NewEquipment.rope3_8inch            = new Equipment('rope',           0.126,  0.21,  0,  6, libAbrv+'31');
NewEquipment.rope3_8inch.detail = '3/8″';
NewEquipment.rope3_8inch.unit = "yd";		NewEquipment.rope3_8inch.continuous = true;
NewEquipment.rope3_8inch.notes = ['supports 253 lbs.'],
NewEquipment.sickleTL0             = new Equipment('sickle',              5,    20,  0,  6, libAbrv+'31');
NewEquipment.sickleTL0.detail = "TL0";
NewEquipment.sleepingfur           = new Equipment('sleeping fur',        8,    50,  0,  6, libAbrv+'31');
// pouch, same as Basic
NewEquipment.waterskin1qt          = new Equipment('waterskin',           0 ,    5,  0,  6, libAbrv+'31');
NewEquipment.waterskin1qt.detail = "1 qt";
NewEquipment.waterskin1qt.notes = ['Holds 1 quart of liquid (2 lbs. if water).'];
NewEquipment.waterskin1gal         = new Equipment('waterskin',           0,    10,  0,  6, libAbrv+'31');
NewEquipment.waterskin1gal.detail = "1 gal";
NewEquipment.waterskin1gal.notes = ['Holds 1 gallon of liquid (8 lbs. if water).'];
NewEquipment.basket1gal            = new Equipment('basket',            0.5,     8,  0,  6, libAbrv+'31');
NewEquipment.basket1gal.detail = "1 gal";
NewEquipment.basket5gal            = new Equipment('basket',              1,    25,  0,  6, libAbrv+'31');
NewEquipment.basket5gal.detail = "5 gal";
NewEquipment.backpackwoven         = new Equipment('backpack',            2,    50,  0,  6, libAbrv+'31');
NewEquipment.backpackwoven.detail = "woven";
NewEquipment.potclay1gal           = new Equipment('pot, clay',           1,    10,  0,  6, libAbrv+'31');
NewEquipment.potclay1gal.detail = "1 gal";
NewEquipment.potclay5gal           = new Equipment('pot, clay',           2,    50,  0,  6, libAbrv+'31');
NewEquipment.potclay5gal.detail = "5 gal";
NewEquipment.drum                  = new Equipment('drum',                2,    40,  0,  6, libAbrv+'31');
// torch, same as Basic
NewEquipment.lamp                  = new Equipment('lamp',              0.5,    10,  0,  6, libAbrv+'31');
NewEquipment.lampwick              = new Equipment('lamp wick',           0,     1,  0,  6, libAbrv+'31');
// lamp oil, same as Basic except lasts half as long
NewEquipment.saddlequern1man       = new Equipment('quern',              20,    20,  0,  6, libAbrv+'31');
NewEquipment.saddlequern1man.detail = "1-man saddle";
NewEquipment.saddlequern1man.notes = ["makes 0.5×ST lb/hr flour"];
NewEquipment.saddlequern2man       = new Equipment('quern',              40,    50,  0,  6, libAbrv+'31');
NewEquipment.saddlequern2man.detail = "2-man saddle";
NewEquipment.saddlequern2man.notes = ["makes 0.75×(combined ST) lb/hr flour"];
/* TL 1 */
NewEquipment.woodenplowsmall       = new Equipment('plow',               20,    10,  1,  u, libAbrv+'55');
NewEquipment.woodenplowsmall.detail = "small";
NewEquipment.woodenplowsmall.description = "wooden";
NewEquipment.woodenplowlarge       = new Equipment('plow',              100,   100,  1,  u, libAbrv+'55');
NewEquipment.woodenplowlarge.detail = "large";
NewEquipment.woodenplowlarge.description = "wooden";
NewEquipment.sickleTL1              = new Equipment('sickle',             5,    15,  1,  6, libAbrv+'55');
NewEquipment.sickleTL1.detail = "TL1";
NewEquipment.sickleTL1.notes = ["curved handle for more natural cutting motion"];
NewEquipment.sawTL1                 = new Equipment('saw',                5,    10,  1,  6, libAbrv+'55');
NewEquipment.sawTL1.detail = "TL1";
NewEquipment.chisel24in             = new Equipment('chisel',             3,    30,  1,  6, libAbrv+'55');
NewEquipment.chisel24in.detail = "24″";
NewEquipment.chisel12in             = new Equipment('chisel',             1,    10,  1,  6, libAbrv+'55');
NewEquipment.chisel12in.detail = "12″";
NewEquipment.chisel12in.notes = ["late TL1; harder alloy than 24″ chisel"];
NewEquipment.adzebronzesmall        = new Equipment('adze',               5,    50,  1,  6, libAbrv+'55');
NewEquipment.adzebronzesmall.detail = "bronze";
NewEquipment.adzebronzesmall.description = "small";
NewEquipment.adzebronzelarge        = new Equipment('adze',              20,    70,  1,  6, libAbrv+'55');
NewEquipment.adzebronzelarge.detail = "bronze";
NewEquipment.adzebronzelarge.description = "large";
NewEquipment.bowdrillbronze         = new Equipment('bow drill',          1,    20,  1,  6, libAbrv+'55');
NewEquipment.bowdrillbronze.detail = "bronze";
NewEquipment.filebronze             = new Equipment('file',               2,    40,  1,  6, libAbrv+'55');
NewEquipment.filebronze.detail = "bronze";
NewEquipment.planeTL1               = new Equipment('plane',              3,    70,  1,  6, libAbrv+'55');
NewEquipment.spokeshave             = new Equipment('spokeshave',         5,    20,  1,  6, libAbrv+'55');
NewEquipment.tongssmall             = new Equipment('tongs',              2,    20,  1,  6, libAbrv+'56');
NewEquipment.tongssmall.description = "small";
NewEquipment.tongslarge             = new Equipment('tongs',              5,    50,  1,  6, libAbrv+'56');
NewEquipment.tongslarge.description = "large";
NewEquipment.cloak                  = new Equipment('cloak',              5,    50,  1,  6, libAbrv+'56');
NewEquipment.abacus                 = new Equipment('abacus',             2,    50,  1,  6, libAbrv+'56');
NewEquipment.balancesmall           = new Equipment('balance',            1,    25,  1,  6, libAbrv+'56');
NewEquipment.balancesmall.description = "small";
NewEquipment.weights                = new Equipment('weights',            2,    10,  1,  6, libAbrv+'56');
NewEquipment.weights.notes = ["for use with a balance"];
NewEquipment.ladder36ft             = new Equipment('ladder',            55,    90,  1,  6, libAbrv+'56');   // this is about 1.5 lbs/ft and $1.60/ft
NewEquipment.ladder36ft.detail = '36′';
NewEquipment.merkhet                = new Equipment('merkhet',            0,    10,  1,  6, libAbrv+'56');
NewEquipment.merkhet.notes = ["extremely fragile"];
NewEquipment.papyrus                = new Equipment('papyrus',         0.05,     1,  1,  6, libAbrv+'56');
NewEquipment.papyrus.unit = "sheet";
NewEquipment.timedcandle            = new Equipment('candle',             1,     5,  1,  6, libAbrv+'56');
NewEquipment.timedcandle.detail = "timed";
NewEquipment.timedcandle.notes = ["tallow or beeswax","2-12 hrs, set at manufacture"];
NewEquipment.trumpet                = new Equipment('trumpet',            2,   100,  1,  6, libAbrv+'56');
NewEquipment.trumpet.description = "brass";
NewEquipment.tabletwaxsmall         = new Equipment('tablet',             2,    10,  1,  6, libAbrv+'56');
NewEquipment.tabletwaxsmall.detail = "wax";
NewEquipment.tabletwaxsmall.description = "small";
NewEquipment.tabletwaxlarge         = new Equipment('tablet',            10,    50,  1,  6, libAbrv+'56');
NewEquipment.tabletwaxlarge.detail = "wax";
NewEquipment.tabletwaxlarge.description = "large";
/* TL 2 */
NewEquipment.harrowsmall            = new Equipment('harrow',            20,    20,  2,  6, libAbrv+'77');
NewEquipment.harrowsmall.description = "small";
NewEquipment.harrowsmall.notes = ["Commonly used in China during TL2, harrows did not appear in Europe until TL3."];
NewEquipment.harrowlarge            = new Equipment('harrow',           100,   200,  2,  6, libAbrv+'77');
NewEquipment.harrowlarge.description = "large";
NewEquipment.harrowlarge.notes = ["Commonly used in China during TL2, harrows did not appear in Europe until TL3."];
NewEquipment.moldboardplowsmall     = new Equipment('moldboard plow',    40,    40,  2,  6, libAbrv+'77');
NewEquipment.moldboardplowsmall.detail = "small";
NewEquipment.moldboardplowsmall.notes = ["Useful for heavy, marginal soils."];
NewEquipment.moldboardplowlarge     = new Equipment('moldboard plow',   200,   400,  2,  6, libAbrv+'77');
NewEquipment.moldboardplowlarge.detail = "large";
NewEquipment.moldboardplowlarge.notes = ["Useful for heavy, marginal soils."];
NewEquipment.pushscythe             = new Equipment('push-scythe',       15,    50,  2,  6, libAbrv+'77');
NewEquipment.wheelbarrow            = new Equipment('wheelbarrow',       18,    60,  2,  6, libAbrv+'77');
NewEquipment.wheelbarrow.notes = ['Divide effective weight of load by 5.'];
NewEquipment.bellows                = new Equipment('bellows',            5,   100,  2,  6, libAbrv+'78');
NewEquipment.screw                  = new Equipment('screw',              0,    25,  2,  6, libAbrv+'78');
NewEquipment.screw.notes = ['Prohibitively expensive; laboriously cut and filed by hand.'];
NewEquipment.handmill               = new Equipment('hand mill',          5,    20,  0,  6, libAbrv+'78');
NewEquipment.handmill.notes = ["makes ST lb/hr flour"];
NewEquipment.mattock                = new Equipment('mattock',            6,    20,  2,  6, libAbrv+'78');
NewEquipment.pickaxe                = new Equipment('pickaxe',            7,    18,  2,  6, libAbrv+'78');
NewEquipment.turfcutter             = new Equipment('turf cutter',        4,    15,  2,  6, libAbrv+'78');
NewEquipment.bridle                 = new Equipment('bridle',             1,    10,  1,  6, libAbrv+'78');
NewEquipment.bridle.notes = ["gives +1 to rolls to control a horse if used one-handed, or +2 to rolls if used two-handed"];
NewEquipment.bit                    = new Equipment('bit',                2,    25,  1,  6, libAbrv+'78');
NewEquipment.bit.notes = ["A bit must be used with a bridle.","The combination gives +2 to control the horse if used one-handed, or +3 if two-handed."];
NewEquipment.blanket                = new Equipment( 'blanket',           5,    50,  1,  6, libAbrv+'79');
NewEquipment.saddleriding           = new Equipment( 'saddle',           15,   150,  2,  6, libAbrv+'79');
NewEquipment.saddleriding.notes = ["gives +1 both to rolls to control the horse and to rolls to stay seated"];
NewEquipment.saddleromancavalry     = new Equipment( 'saddle',           25,   300,  2,  6, libAbrv+'79');
NewEquipment.saddleromancavalry.detail = "Roman cavalry";
NewEquipment.saddleromancavalry.notes = ["gives +1 to rolls to control the horse and +2 to rolls to stay seated"];
NewEquipment.spurs                  = new Equipment( 'spurs',             0,    25,  2,  6, libAbrv+'79');
NewEquipment.spurs.notes = ["aristocrats commonly wore ornamental spurs costing much more"];
NewEquipment.bandages               = new Equipment('bandages',           2,    30,  2,  6, libAbrv+'80');
NewEquipment.bandages.notes = ['Bandages for a half-dozen wounds.'];
//NewEquipment.burningglass           = new Equipment('burning glass',      ?,     ?,  2,  6, libAbrv+'80');
NewEquipment.soapsoft               = new Equipment('soap',               1,     5,  2,  6, libAbrv+'80');
NewEquipment.soapsoft.detail = "soft";
NewEquipment.soapsoft.description = "flask";
NewEquipment.soapsoft.notes = ['lasts 12 baths'];
NewEquipment.soaphard               = new Equipment('soap',             0.5,     8,  2,  6, libAbrv+'80');
NewEquipment.soaphard.detail = "hard";
NewEquipment.soaphard.description = "bar";
NewEquipment.soaphard.notes = ['lasts 10 baths'];
NewEquipment.surgicalkit            = new Equipment('surgical kit',      15,   300,  2,  6, libAbrv+'80');
NewEquipment.surgicalkit.notes = ['specialized surgical tools, including scalpels, saws for amputations, drills for getting sling bullets out of bonesrobes, forceps, needles, and catheters for drainage'];
NewEquipment.windrose               = new Equipment('windrose',           1,    25,  2,  6, libAbrv+'80');
NewEquipment.windrose.notes = ["only available in advanced TL2 cultures","reduces the penalty for lacking navigational equipment to -1"];
/* TL 3 */
NewEquipment.horsecollar            = new Equipment('horse collar',      30,   300,  3,  6, libAbrv+'103');
NewEquipment.knittingneedles        = new Equipment( 'knitting needles',  0,     5,  3,  6, libAbrv+'103');
NewEquipment.knittingneedles.description = "pair";
NewEquipment.spinningwheel          = new Equipment( 'spinning wheel',   40,   100,  3,  6, libAbrv+'103');
NewEquipment.spinningwheel.notes = ['Produces yarn six times as fast.'];
NewEquipment.compass                = new Equipment('compass',            5,    25,  3,  6, libAbrv+'103');
NewEquipment.compass.notes = ["eliminates the penalty for lacking navigational equipment"];
NewEquipment.sunshadowboard         = new Equipment('sun shadow board',  10,    20,  2,  6, libAbrv+'104');
NewEquipment.sunshadowboard.notes = ["reduces the penalty for Navigation rolls made using the noonday sun to -1"];
NewEquipment.sunstone               = new Equipment('sunstone',           1,    30,  2,  6, libAbrv+'104');
NewEquipment.sunstone.notes = ["reduces all daytime weather modifiers to Navigation rolls to -1"];
NewEquipment.horseshoessetinstalled = new Equipment('horseshoes',         4,    50,  2,  6, libAbrv+'104');
NewEquipment.horseshoessetinstalled.description = "set, installed";
NewEquipment.horseshoessetinstalled.notes = ["A shod horse gets +2 to daily HT rolls (see LT78)."];
NewEquipment.horseshoesset          = new Equipment('horseshoes',         4,    10,  2,  6, libAbrv+'104');
NewEquipment.horseshoesset.description = "set, DIY";
NewEquipment.horseshoesset.notes = ["A shod horse gets +2 to daily HT rolls (see LT78).","'installation' takes Blacksmith skill and 1-2 hrs"];
NewEquipment.horseshoessetinstalled = new Equipment('horseshoes',         4,    50,  2,  6, libAbrv+'104');
NewEquipment.horseshoessetinstalled.description = "set, installed";
NewEquipment.horseshoessetinstalled.notes = ["A shod horse gets +2 to daily HT rolls (see LT78)."];
NewEquipment.saddlewstirrups        = new Equipment( 'saddle w/ stirrups',20,  125,  2,  6, libAbrv+'104');
NewEquipment.saddlewstirrups.notes = ["A riding saddle with stirrups gives +1 to offset penalties to Riding skill to control the horse, and cancels all penalties to remain seated and to weapon skill.","A rider with stirrups can use the Lance skill."];
// Weight of war saddle plus stirrups: 35 lbs. Cost: $250.
NewEquipment.saddlewar              = new Equipment( 'saddle',           35,   250,  2,  6, libAbrv+'104');
NewEquipment.saddlewar.detail = "war";
NewEquipment.saddlewar.notes = ["This type of saddle has a 50% chance of keeping an unconscious rider in the saddle.","gives an extra +1 to Riding skill to stay seated, which may act as an actual bonus to skill"];
NewEquipment.astrolabe              = new Equipment('astrolabe',          2,   500,  3,  6, libAbrv+'105');
NewEquipment.handmirror             = new Equipment('mirror',             1,    15,  3,  6, libAbrv+'105');
NewEquipment.handmirror.detail = "hand";
NewEquipment.dressingmirror         = new Equipment('mirror',            10,   125,  3,  6, libAbrv+'105');
NewEquipment.dressingmirror.detail = "dressing";
NewEquipment.papersheet             = new Equipment('paper',              0,     2,  3,  6, libAbrv+'105');
NewEquipment.papersheet.unit = "sheet";
NewEquipment.paperfolio             = new Equipment('folio',              0,    10,  3,  6, libAbrv+'105');
NewEquipment.paperfolio.description = "8 sheets of paper";
NewEquipment.scribeskit             = new Equipment("scribe's kit",       2,    50,  3,  6, libAbrv+'105');
NewEquipment.scribeskit.notes = ['A scribe’s pen case contains several quills, bottles of ink (made from iron salts, nut galls, and gum), and a special sharpener (pen knife), as well as a supply of paper or parchment.'],
NewEquipment.spectacles             = new Equipment('spectacles',         1,   150,  3,  6, libAbrv+'105');





/* Armor                                        'name',                  wt,  cost, TL, LC, DRD, location, ref */
NewEquipment.ClothTrappings         = new Armor('Barding',               39,   470,  3,  6,  2,  2,  ['face','neck','torso','waist'], libAbrv+'80');
NewEquipment.ClothTrappings.detail = "Leather/Cloth";
NewEquipment.ClothTrappings.description = "Full Trappings (suit)";
// 2 other full trappings suits, TL3 [LT105]
NewEquipment.ClothChanfron          = new Armor('Chanfron',               3,    40,  2,  6,  2,  2,  ['face'], libAbrv+'80');
NewEquipment.ClothChanfron.detail = "Leather/Cloth";
NewEquipment.MailChanfron           = new Armor('Chanfron',               7,    60,  2,  6,  3,  4,  ['face'], libAbrv+'80');
NewEquipment.MailChanfron.detail = "Mail";
NewEquipment.MailChanfron.splitDR = 2;  NewEquipment.MailChanfron.splitPD = 1;
NewEquipment.ScaleChanfron          = new Armor('Chanfron',              12,   200,  2,  6,  3,  4,  ['face'], libAbrv+'80');
NewEquipment.ScaleChanfron.detail = "Scale";
NewEquipment.PlateChanfron          = new Armor('Chanfron',              12,   200,  3,  6,  5,  4,  ['face'], libAbrv+'80');
NewEquipment.PlateChanfron.detail = "Plate";
NewEquipment.ClothNeckArmor         = new Armor('Neck Armor',             6,    80,  2,  6,  2,  2,  ['neck'], libAbrv+'80');
NewEquipment.ClothNeckArmor.description = "horse";
NewEquipment.ClothNeckArmor.detail = "Leather/Cloth";
NewEquipment.MailNeckArmor          = new Armor('Neck Armor',            15,   100,  2,  6,  3,  4,  ['neck'], libAbrv+'80');
NewEquipment.MailNeckArmor.description = "horse";
NewEquipment.MailNeckArmor.detail = "Mail";
NewEquipment.MailNeckArmor.splitDR = 2;  NewEquipment.MailNeckArmor.splitPD = 1;
NewEquipment.ScaleNeckArmor         = new Armor('Neck Armor',            20,   320,  2,  6,  3,  4,  ['neck'], libAbrv+'80');
NewEquipment.ScaleNeckArmor.description = "horse";
NewEquipment.ScaleNeckArmor.detail = "Scale";
// cloth, maillate crinets TL3 [LT105]
// cloth, maillate flanchards TL3 [LT105]
// cloth, maillate crupper TL3 [LT105]
// cloth, maillate leggings TL3 [LT105]
NewEquipment.ClothBarding           = new Armor('Barding',               22,   260,  2,  6,  2,  2,  ['torso','waist'], libAbrv+'80');
NewEquipment.ClothBarding.detail = "Leather/Cloth";
NewEquipment.MailBarding            = new Armor('Barding',               50,   440,  2,  6,  3,  4,  ['torso','waist'], libAbrv+'80');
NewEquipment.MailBarding.detail = "Mail";
NewEquipment.MailBarding.splitDR = 2;  NewEquipment.MailBarding.splitPD = 1;
NewEquipment.ScaleBarding           = new Armor('Barding',               60,   480,  2,  6,  3,  4,  ['torso','waist'], libAbrv+'80');
NewEquipment.ScaleBarding.detail = "Scale";
NewEquipment.BronzePeytral          = new Armor('Peytral',               30,   250,  2,  6,  3,  4,  ['torso'], libAbrv+'80');
NewEquipment.BronzePeytral.detail = "Bronze";
// cloth, maillate peytrals at TL3 [LT105]




/* Weapons                                       'name',             weight,  cost, TL, LC, bulk, qual, ref */
// Axe/Mace
NewEquipment.Axe                    = new Weapon('Axe',                   4,    50,  0,  4,   -4,'pole/axe', libAbrv+'107');
NewEquipment.Axe.wieldOptions                 = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cut' }, note: ["One turn to ready after swing (see p. B104)."] } ] };
NewEquipment.Hatchet                = new Weapon('Hatchet',               2,    40,  0,  4,   -2,'pole/axe', libAbrv+'107');
NewEquipment.Hatchet.wieldOptions             = { AxeMace           : [ { title: '',        hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' }, note: ["Throwable.","One turn to ready after swing (see p. B104)."] } ],
                                                  AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' }, accuracy: 1,       halfDamageRange: 1.5, maximumRange: 2.5, snapShot: 11, rangeBasedOnST: true } ] };
NewEquipment.KnobbedClub            = new Weapon('Club',                  2,    20,  0,  4,   -2,'mace/cr', libAbrv+'107');
NewEquipment.KnobbedClub.detail = 'Knobbed';
NewEquipment.KnobbedClub.wieldOptions         = { AxeMace           : [ { title: '',        hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  1, type:  'cr' }, note: ["One turn to ready after swing (see p. B104)."] } ] };
NewEquipment.RoundMace              = new Weapon('Mace',                  5,    35,  0,  4,   -5,'mace/cr', libAbrv+'107');
NewEquipment.RoundMace.detail = 'Round';
NewEquipment.RoundMace.wieldOptions           = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type:  'cr' }, note: ["Throwable.","One turn to ready after swing (see p. B104)."] } ],
                                                  AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type:  'cr' }, accuracy: 1,       halfDamageRange: 0.5, maximumRange:   1, snapShot: 12, rangeBasedOnST: true } ] };
NewEquipment.SmallAxe               = new Weapon('Axe',                   3,    45,  0,  4,   -3,'pole/axe', libAbrv+'107');
NewEquipment.SmallAxe.detail = 'Small';
NewEquipment.SmallAxe.wieldOptions            = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["One turn to ready after swing (see p. B104)."] } ] };
NewEquipment.SmallRoundMace         = new Weapon('Mace',                  3,    25,  0,  4,   -3,'mace/cr', libAbrv+'107');
NewEquipment.SmallRoundMace.detail = 'Small Round';
NewEquipment.SmallRoundMace.wieldOptions      = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type:  'cr' }, note: ["Throwable.","One turn to ready after swing (see p. B104)."] } ],
                                                  AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type:  'cr' }, accuracy: 1,       halfDamageRange:   1, maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ] };
NewEquipment.SmallThrowingAxe       = new Weapon('Axe',                   3,    55,  0,  4,   -3,'pole/axe', libAbrv+'107');
NewEquipment.SmallThrowingAxe.detail = 'Small Throwing';
NewEquipment.SmallThrowingAxe.wieldOptions    = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["Throwable.","One turn to ready after swing (see p. B104)."] } ],
                                                  AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' }, accuracy: 1,       halfDamageRange:   1, maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ] };
NewEquipment.ThrowingAxe            = new Weapon('Axe',                   4,    60,  0,  4,   -4,'pole/axe', libAbrv+'107');
NewEquipment.ThrowingAxe.detail = 'Throwing';
NewEquipment.ThrowingAxe.wieldOptions         = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  2, type: 'cut' }, note: ["Throwable.","One turn to ready after swing (see p. B104)."] } ],
                                                  AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, accuracy: 2,       halfDamageRange:   1, maximumRange: 1.5, snapShot: 10, rangeBasedOnST: true } ] };
NewEquipment.EpsilonAxe             = new Weapon('Axe',                   4,    40,  1,  4,   -4,'pole/axe', libAbrv+'107');
NewEquipment.EpsilonAxe.detail = 'Epsilon';
NewEquipment.EpsilonAxe.wieldOptions          = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["One turn to ready after swing (see p. B104)."] } ] };
NewEquipment.Sickle                 = new Weapon('Sickle',                2,    40,  1,  4,   -2,'pole/axe', libAbrv+'107');
NewEquipment.Sickle.wieldOptions              = { AxeMace           : [ { title: '',        hands:  'dom', strength: 10, damage: { base: 'sw',  mods: -1, type: 'cut' }, note: ["One turn to ready after swing (see p. B104)."] } ] };
NewEquipment.Mace                   = new Weapon('Mace',                  5,    50,  2,  4,   -5,'mace/cr', libAbrv+'107');
NewEquipment.Mace.maxTL = 4;
NewEquipment.Mace.wieldOptions                = { AxeMace           : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type:  'cr' }, note: ["Throwable.","One turn to ready after swing (see p. B104)."] } ],
                                                  AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type:  'cr' }, accuracy: 1,       halfDamageRange: 0.5, maximumRange:   1, snapShot: 12, rangeBasedOnST: true } ] };
NewEquipment.SmallMace              = new Weapon('Mace',                  3,    35,  2,  4,   -3,'mace/cr', libAbrv+'107');
NewEquipment.SmallMace.detail = 'Small';
NewEquipment.SmallMace.wieldOptions           = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type:  'cr' }, note: ["Throwable.","One turn to ready after swing (see p. B104)."] } ],
                                                  AxeThrowing       : [ { title: 'thrown',  hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type:  'cr' }, accuracy: 1,       halfDamageRange:   1, maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ] };
NewEquipment.Pick                   = new Weapon('Pick',                  3,    70,  3,  4,   -4,'pole/axe', libAbrv+'107');
NewEquipment.Pick.wieldOptions                = { AxeMace           : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'imp' }, note: ["One turn to ready after swing (see p. B104).","May get <i>stuck</i> (see p. B96)."] } ] };
// Brawling
NewEquipment.HandAxe                = new Weapon('Axe',                 2.5,    30,  0,  4,   -2,'pole/axe', libAbrv+'107');
NewEquipment.HandAxe.detail = 'Hand';
NewEquipment.HandAxe.wieldOptions             = { Brawling          : [ { title: '',        hands:  'dom', strength:  6, damage: { base:'thr',  mods: -2, type: 'cut' }, reach: 'C,1', note: ["Cannot parry."] } ] };
NewEquipment.HiltlessKnife          = new Weapon('Knife',               0.5,    20,  0,  4,   -1, 'edged', libAbrv+'107');
NewEquipment.HiltlessKnife.detail = 'Hiltless';
NewEquipment.HiltlessKnife.wieldOptions       = { Brawling          : [ { title: '',        hands:  'dom', strength:null,damage: { base:'thr',  mods: -2, type: 'cut' }, reach: 'C,1', note: ["Max. dam. 1d+1.","Cannot parry."] } ] };
NewEquipment.BaghNakh               = new Weapon('Bagh Nakh',             1,   100,  3,  4,   -1, 'edged', libAbrv+'107');
NewEquipment.BaghNakh.wieldOptions            = { Brawling          : [ { title: '',        hands:  'dom', strength:null,damage: { base: 'sw',  mods: -2, type: 'cut' }, reach: 'C,1', note: ["Brawling/Karate bonuses."] } ] };
// Broadsword
NewEquipment.LightClub              = new Weapon('Club',                  2,    10,  0,  4,   -3, 'mace/cr');
NewEquipment.LightClub.detail = 'Light';
NewEquipment.LightClub.wieldOptions           = { Broadsword        : [ { title: '',        hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cr'  }, reach:   1 },
                                                                        { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'cr'  } } ] };
NewEquipment.Macauitl               = new Weapon('Macauitl',              3,   500,  2,  4,   -5, 'edged');
NewEquipment.Macauitl.wieldOptions            = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["One turn to ready after swing (see p. B104)."] },
                                                                        { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  0, type: 'cr'  }, note: ["Standard macauitl has <i>blunt</i> point."] } ] };
NewEquipment.SharpMacauitl          = new Weapon('Macauitl',              3,   500,  2,  4,   -5, 'edged');
NewEquipment.SharpMacauitl.detail = 'Sharp';
NewEquipment.SharpMacauitl.wieldOptions       = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["One turn to ready after swing (see p. B104)."] },
                                                                        { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  0, type: 'cut' } } ] };
NewEquipment.Khopesh                = new Weapon('Khopesh',               4,   450,  1,  4,   -5, 'edged');
NewEquipment.Khopesh.wieldOptions             = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, note: ["One turn to ready after swing (see p. B104)."] } ] };
NewEquipment.Broadsword             = new Weapon('Broadsword',            3,   500,  2,  4,   -5, 'edged');
NewEquipment.Broadsword.maxTL = 5;
NewEquipment.Broadsword.wieldOptions          = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                                        { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  1, type: 'cr'  }, note: ["Standard broadsword has <i>blunt</i> point."] } ] };
NewEquipment.Shotel                 = new Weapon('Shotel',                3,   500,  2,  4,   -5, 'edged');
NewEquipment.Shotel.wieldOptions              = { Broadsword        : [ { title: '',        hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'imp' }, note: ["One turn to ready after swing (see p. B104).","Target at -1 to block/parry."] } ] };
NewEquipment.ThrustingBroadsword    = new Weapon('Broadsword',            3,   600,  2,  4,   -5, 'edged');
NewEquipment.ThrustingBroadsword.detail = 'Thrusting';
NewEquipment.ThrustingBroadsword.wieldOptions = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                                        { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' } } ] };
NewEquipment.Bastardsword           = new Weapon('Bastard Sword',         5,   650,  3,  4,   -6, 'edged');
NewEquipment.Bastardsword.wieldOptions        = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2', note: ["One turn to ready after swing (see p. B104).","Becomes unready if used to parry."] },
                                                                        { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'cr'  }, reach:     2, note: ["Becomes unready if used to parry.","Standard Bastardsword has <i>blunt</i> point."] } ],
                                                  TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2' },
                                                                        { title: 'thrust',  hands: 'both', strength: 10, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach:     2, note: ["Standard Bastardsword has <i>blunt</i> point."] } ] };
NewEquipment.Dau                    = new Weapon('Dau',                   5,   700,  3,  4,   -5, 'edged');
NewEquipment.Dau.wieldOptions                 = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' } },
                                                                        { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  0, type: 'imp' } } ] };
NewEquipment.Estoc                  = new Weapon('Estoc',                 2,   500,  3,  4,   -5, 'edged');
NewEquipment.Estoc.wieldOptions               = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cr'  } },
                                                                        { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' } } ] };
NewEquipment.Jiann                  = new Weapon('Jiann',                 3,   700,  3,  4,   -5, 'edged');
NewEquipment.Jiann.wieldOptions               = { Broadsword        : [ { title: 'swing',   hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                                                        { title: 'thrust',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2' } ] };
NewEquipment.ThrustingBastardsword  = new Weapon('Bastard Sword',         5,   750,  3,  4,   -6, 'edged');
NewEquipment.ThrustingBastardsword.detail = 'Thrusting';
NewEquipment.ThrustingBastardsword.wieldOptions={ Broadsword        : [ { title: 'swing',   hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2', note: ["One turn to ready after swing (see p. B104).","Becomes unready if used to parry."] },
                                                                        { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  2, type: 'imp' }, reach:     2, note: ["Becomes unready if used to parry."] } ],
                                                  TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2' },
                                                                        { title: 'thrust',  hands: 'both', strength: 10, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:     2 } ] };
// Flail
NewEquipment.Flail                  = new Weapon('Flail',                 8,    20,  1,  4,   -4, 'mace/cr');
NewEquipment.Flail.detail = 'Grain';
NewEquipment.Flail.maxTL = 4;
NewEquipment.Flail.wieldOptions               = { Flail             : [ { title: '',        hands: 'both', strength: 12, damage: { base: 'sw',  mods:  2, type:  'cr' }, reach: '2,3', note: ["One turn to ready after swing (see p. B104).","Target at -2 to block, -4 to parry.","Must be <i>readied</i> for one turn to change between long and short grip."] } ] };
NewEquipment.Flail                  = new Weapon('Flail',                 8,   100,  3,  4,   -4, 'mace/cr');
NewEquipment.Flail.maxTL = 4;
NewEquipment.Flail.wieldOptions               = { Flail             : [ { title: '',        hands: 'both', strength: 13, damage: { base: 'sw',  mods:  4, type:  'cr' }, reach: '1,2', note: ["One turn to ready after swing (see p. B104).","Target at -2 to block, -4 to parry.","Must be <i>readied</i> for one turn to change between long and short grip."] } ] };
NewEquipment.Morningstar            = new Weapon('Morningstar',           6,    80,  3,  4,   -4, 'mace/cr');
NewEquipment.Morningstar.maxTL = 4;
NewEquipment.Morningstar.wieldOptions         = { Flail             : [ { title: '',        hands:  'dom', strength: 12, damage: { base: 'sw',  mods:  3, type:  'cr' }, note: ["One turn to ready after swing (see p. B104).","Target at -2 to block, -4 to parry."] } ] };
// Garrote
NewEquipment.Thong                  = new Weapon('Thong',                 0,    20,  0,  4,    0, 'mace/cr');
NewEquipment.Thong.wieldOptions               = { Garrote           : [ { title: '',        hands:  'dom', strength:null,damage: { base: 'thr', mods:  0, type:  'cr' }, reach: 'C', note: ["See p. CI134."] } ] };
NewEquipment.StickNoose             = new Weapon('Stick Noose',           2,    30,  0,  4,   -2, 'mace/cr');
NewEquipment.StickNoose.wieldOptions          = { Garrote           : [ { title: '',        hands:  'dom', strength:null,damage: { base: 'thr', mods:  0, type:  'cr' }, reach: '1,2', note: ["See p. CI134."] } ] };
// Katana
NewEquipment.Katana                 = new Weapon('Katana',                5,   650,  3,  4,   -5, 'edged');
NewEquipment.Katana.wieldOptions              = { Katana            : [ { title: '1 hand',  hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2' },
                                                                        { title: '2 hands', hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2' },
                                                                        { title: '1 hand, in scabbard',  hands:  'dom', strength: 11, damage: { base: 'sw',  mods:  1, type: 'cr' }, reach: '1,2' },
                                                                        { title: '2 hands, in scabbard', hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cr' }, reach: '1,2' },
                                                                        { title: 'thrust',  hands:  'dom', strength: 11, damage: { base: 'thr', mods:  1, type: 'imp' } } ] };
// Knife
NewEquipment.KnifeLarge             = new Weapon('Knife',                    1,   40,  0,  4,   -2, 'edged');
NewEquipment.KnifeLarge.detail = 'Large';
NewEquipment.KnifeLarge.wieldOptions          = { Knife             : [ { title: 'swing',   hands:  'dom', strength:  0, damage: { base: 'sw',  mods: -2, type: 'cut' }, maxDamage: '1d+2', reach: 'C,1', note: ["Throwable.","Maximum damage ld+2."] },
                                                                        { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', reach: 'C',   note: ["Throwable.","Maximum damage ld+2."] } ],
                                                  KnifeThrowing     : [ { title: 'throw',   hands:  'dom', strength:  0, damage: { base: 'thr', mods:  0, type: 'imp' }, maxDamage: '1d+2', halfDamageRange: -2,  maximumRange: 5,   snapShot: 12, rangeBasedOnST: 'add', note: ["Maximum damage ld+2."] } ] };
NewEquipment.KnifeSmall             = new Weapon('Knife',                  0.5,   30,  0,  4,   -1, 'edged');
NewEquipment.KnifeSmall.detail = 'Small';
NewEquipment.KnifeSmall.wieldOptions          = { Knife             : [ { title: 'swing',   hands:  'dom', strength:  0, damage: { base: 'sw',  mods: -3, type: 'cut' }, maxDamage: '1d+1', reach: 'C,1', note: ["Maximum damage ld+1."] },
                                                                        { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', reach: 'C',   note: ["Throwable; Maximum damage ld+1."] } ],
                                                  KnifeThrowing     : [ { title: 'throw',   hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d+1', halfDamageRange: -5,  maximumRange: 0,   snapShot: 11, rangeBasedOnST: 'add' } ] };
NewEquipment.Dagger                 = new Weapon('Dagger',                 0.5,   20,  1,  4,   -1, 'edged');
NewEquipment.Dagger.wieldOptions              = { Knife             : [ { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d',   reach: 'C',   note: ["Throwable; Maximum damage ld."] } ],
                                                  KnifeThrowing     : [ { title: 'throw',   hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d',   halfDamageRange: -5,  maximumRange: 0,   snapShot: 12, rangeBasedOnST: 'add' } ] };
NewEquipment.KnifeWheel             = new Weapon('Knife-Wheel',            1.5,   75,  3,  4,   -2, 'edged');
NewEquipment.KnifeWheel.wieldOptions          = { Knife             : [ { title: 'swing',   hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'cut' }, maxDamage: '1d',   reach: 'C',   note: ["Usually used in pairs.","Maximum damage ld.","Gives PD 1."] },
                                                                        { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods: -1, type: 'imp' }, maxDamage: '1d',   reach: 'C',   note: ["Usually used in pairs.","Maximum damage ld.","Gives PD 1."] } ] };
NewEquipment.SlashingWheel          = new Weapon('Slashing Wheel',           1,   60,  3,  4,   -1, 'edged');
NewEquipment.SlashingWheel.wieldOptions       = { Knife             : [ { title: 'swing',   hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'cut' }, reach: 'C', note: ["Usually used in pairs.","Gives PD 1."] } ] };
NewEquipment.KatarSmall             = new Weapon('Katar',                    1,   40,  3,  4,   -1, 'edged');
NewEquipment.KatarSmall.detail = 'Small';
NewEquipment.KatarSmall.wieldOptions          = { Knife             : [ { title: 'swing',   hands:  'dom', strength:  0, damage: { base: 'sw',  mods: -3, type: 'cut' }, reach: 'C,1', note: ["Perpendicular grip.","Parries at DX/2 or 2/3 Brawling."] },
                                                                        { title: 'thrust',  hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: 'C',   note: ["Perpendicular grip.","Parries at DX/2 or 2/3 Brawling."] } ] };
// Lance
NewEquipment.Lance                  = new Weapon('Lance',                    6,   60,  3,  3,  -10, 'pole/axe');
NewEquipment.Lance.wieldOptions               = { Lance             : [ { title:'',         hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach:   4,   note: ["Cannot parry.","See B136 for readying."] } ] };
// Polearm
NewEquipment.DaggerAxe              = new Weapon('Dagger-Axe',               9,  150,  1,  3,   -9, 'pole/axe');
NewEquipment.DaggerAxe.wieldOptions           = { Polearm           : [ { title:'swing',    hands: 'both', strength: 11, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '2,3', note: ["Must be <i>readied</i> for one turn to change between long and short grip.","Two turns to ready after swing."] } ] };
NewEquipment.Gaff                   = new Weapon('Gaff',                     7,  100,  1,  3,   -9, 'pole/axe');
NewEquipment.Gaff.wieldOptions                = { Polearm           : [ { title:'swing',    hands: 'both', strength: 10, damage: { base: 'thr', mods: -1, type: 'cut' }, maxDamage: '1d-1', reach: '2,3', note: ["Must be <i>readied</i> for one turn to change between long and short grip.","Max. dam. 1d-1.","Quick Contest of weapon skill vs. DX to engage target; Contest of ST for wielder or target to pull each other; damage inflicted only while pulling; hold on target lost after crippling damage to a limb."] } ] };
NewEquipment.BoardingHook = NewEquipment.Gaff.clone(); NewEquipment.BoardingHook.name = "Boarding Hook";
NewEquipment.FireLance              = new Weapon('Fire Lance',               5,   50,  3,  3,  -10, 'pole/axe');
NewEquipment.FireLance.wieldOptions           = { Polearm           : [ { title:'swing',    hands: 'both', strength:  9, damage: { base:     1, mods: -1, type:'spcl' }, reach: '3-5', note: ["Burns for 10 seconds."] } ] };
NewEquipment.Glaive                 = new Weapon('Glaive',                   8,  100,  3,  3,   -8, 'pole/axe');
NewEquipment.Glaive.maxTL = 5;
NewEquipment.Glaive.wieldOptions              = { Polearm           : [ { title:'swing',    hands: 'both', strength: 11, damage: { base: 'sw',  mods:  3, type: 'cut' }, reach: '2,3', note: ["Two turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                                                        { title:'thrust',   hands: 'both', strength: 11, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1-3', note: ["One turn to ready after thrust.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
NewEquipment.Halberd                = new Weapon('Halberd',                 12,  150,  3,  3,   -8, 'pole/axe');
NewEquipment.Halberd.maxTL = 5;
NewEquipment.Halberd.wieldOptions             = { Polearm           : [ { title:'ax sw',    hands: 'both', strength: 13, damage: { base: 'sw',  mods:  5, type: 'cut' }, reach: '2,3', note: ["Two turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                                                        { title:'imp sw',   hands: 'both', strength: 13, damage: { base: 'sw',  mods:  4, type: 'imp' }, reach: '2,3', note: ["Two turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","May get <i>stuck</i> (see p. B96)."] },
                                                                        { title:'thrust',   hands: 'both', strength: 13, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1-3', note: ["One turn to ready after thrust.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
NewEquipment.HeavyHorseCutter       = new Weapon('Horse-Cutter',            12,  150,  3,  3,   -8, 'pole/axe');
NewEquipment.HeavyHorseCutter.detail = "Heavy";
NewEquipment.HeavyHorseCutter.wieldOptions    = { Polearm           : [ { title:'swing',    hands: 'both', strength: 13, damage: { base: 'sw',  mods:  5, type: 'cut' }, reach: '2,3', note: ["Two turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                                                        { title:'thrust',   hands: 'both', strength: 13, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1-3', note: ["One turn to ready after thrust.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
NewEquipment.Latajang               = new Weapon('Latajang',                 7,  100,  3,  3,   -8, 'pole/axe');
NewEquipment.Latajang.wieldOptions            = { Polearm           : [ { title:'swing',    hands: 'both', strength: 10, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["One turn to ready after swing (see p. B104).","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                                                        { title:'thrust',   hands: 'both', strength: 10, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2', note: ["One turn to ready after thrust.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
NewEquipment.LightHorseCutter       = new Weapon('Horse-Cutter',             8,  120,  3,  3,   -8, 'pole/axe');
NewEquipment.LightHorseCutter.detail = "Light";
NewEquipment.LightHorseCutter.wieldOptions    = { Polearm           : [ { title:'swing',    hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cut' }, reach: '1,2', note: ["Two turns to ready after swing.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                                                        { title:'thrust',   hands: 'both', strength: 12, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1,2', note: ["One turn to ready after thrust.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
NewEquipment.MonksSpade             = new Weapon("Monk's Spade",             6,  100,  3,  3,   -8, 'pole/axe');
NewEquipment.MonksSpade.wieldOptions          = { Polearm           : [ { title:'swing',    hands: 'both', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' }, reach: '1,2', note: ["One turn to ready after swing (see p. B104).","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                                                        { title:'swing',    hands: 'both', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cr'  }, reach: '1,2', note: ["One turn to ready after swing (see p. B104).","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] },
                                                                        { title:'thrust',   hands: 'both', strength: 10, damage: { base: 'thr', mods:  2, type: 'cut' }, reach: '1,2', note: ["One turn to ready after thrust.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa."] } ] };
NewEquipment.Naginata               = new Weapon('Naginata',                 6,  100,  3,  3,   -8, 'pole/axe');
NewEquipment.Naginata.wieldOptions            = { Polearm           : [ { title:'swing',    hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cut' }, reach: '1,2', note: ["One turn to ready after swing (see p. B104)."] },
                                                                        { title:'thrust',   hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: 2 } ] };
NewEquipment.Poleaxe                = new Weapon('Poleaxe',                 10,  120,  1,  3,   -9, 'pole/axe');
NewEquipment.Poleaxe.wieldOptions             = { Polearm           : [ { title:'swing',    hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cut' }, reach: '2,3', note: ["Must be <i>readied</i> for one turn to change between long and short grip.","Two turns to ready after swing."] },
                                                                        { title:'swing',    hands: 'both', strength: 12, damage: { base: 'sw',  mods:  4, type: 'cr'  }, reach: '2,3', note: ["Must be <i>readied</i> for one turn to change between long and short grip.","Two turns to ready after swing."] } ] };
// Shortsword
NewEquipment.Baton                   = new Weapon('Baton',                   1,   20,  0,  4,   -2, 'mace/cr');
NewEquipment.Baton.wieldOptions               = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cr'  } },
                                                                        { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'cr'  } } ] };
NewEquipment.Shortsword              = new Weapon('Shortsword',              2,  300,  1,  4,   -4, 'edged');
NewEquipment.Shortsword.detail = "Stabbing";
NewEquipment.Shortsword.wieldOptions          = { Shortsword        : [ { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'imp' } } ] };
NewEquipment.Falchion                = new Weapon('Falchion',                3,  375,  2,  4,   -4, 'edged');
NewEquipment.Falchion.wieldOptions            = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  1, type: 'cut' } },
                                                                        { title: 'thrust',  hands:  'dom', strength: 10, damage: { base: 'thr', mods: -2, type: 'cr'  } } ] };
NewEquipment.LongKnife               = new Weapon('Knife',                 1.5,  120,  2,  4,   -4, 'edged');
NewEquipment.LongKnife.detail = "Long";
NewEquipment.LongKnife.wieldOptions           = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods: -1, type: 'cut' } },
                                                                        { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'imp' }, reach: 'C,1' } ] };
NewEquipment.Shortsword              = new Weapon('Shortsword',              2,  400,  2,  4,   -4, 'edged');
NewEquipment.Shortsword.wieldOptions          = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods:  0, type: 'cut' } },
                                                                        { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  0, type: 'imp' } } ] };
NewEquipment.LargeKatar              = new Weapon('Katar',                   2,  400,  3,  4,   -4, 'edged');
NewEquipment.LargeKatar.detail = 'Large';
NewEquipment.LargeKatar.wieldOptions          = { Shortsword        : [ { title: 'swing',   hands:  'dom', strength:  7, damage: { base: 'sw',  mods: -1, type: 'cut' }, note:["Parries at DX/2 or 2/3 Brawling."] },
                                                                        { title: 'thrust',  hands:  'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' }, note:["Parries at DX/2 or 2/3 Brawling."] } ] };
// Spear
NewEquipment.FireHardenedSpear       = new Weapon('Spear',                   2,   20,  0,  4,   -6, 'pole/axe', libAbrv+'108112');
NewEquipment.FireHardenedSpear.detail = "Fire-Hardened";
NewEquipment.FireHardenedSpear.wieldOptions   = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  0, type: 'imp' }, reach: '1',   note: ["One-handed.","Throwable.","Must be <i>readied</i> for one turn to change between long and short grip."] },
                                                                        { title: '2 hands', hands: 'both', strength:  8, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1,2', note: ["Two-handed.","Throwable.","Must be <i>readied</i> for one turn to change between long and short grip."] } ],
                                                  SpearThrowing     : [ { title: 'throw',   hands:  'dom', strength:  8, damage: { base: 'thr', mods:  1, type: 'imp' }, accuracy: 1, halfDamageRange: 1,   maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ],
                                                  SpearThrower      : [ { title: 'woomera', hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  1, type: 'imp' }, accuracy: 1, halfDamageRange: 1.5, maximumRange: 2,   snapShot: 12, rangeBasedOnST: true } ] };
NewEquipment.SmallPointedSpear       = new Weapon('Spear',                   3,   30,  0,  4,   -6, 'pole/axe', libAbrv+'108112');
NewEquipment.SmallPointedSpear.detail = "Small-Pointed";
NewEquipment.SmallPointedSpear.wieldOptions   = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  8, damage: { base: 'thr', mods:  1, type: 'imp' }, reach: '1',   note: ["One-handed.","Throwable.","Must be <i>readied</i> for one turn to change between long and short grip."] },
                                                                        { title: '2 hands', hands: 'both', strength:  8, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '1,2', note: ["Two-handed.","Throwable.","Must be <i>readied</i> for one turn to change between long and short grip."] } ],
                                                  SpearThrowing     : [ { title: 'throw',   hands:  'dom', strength:  9, damage: { base: 'thr', mods:  2, type: 'imp' }, accuracy: 1, halfDamageRange: 1,   maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ],
                                                  SpearThrower      : [ { title: 'woomera', hands:  'dom', strength:  9, damage: { base: 'sw',  mods:  2, type: 'imp' }, accuracy: 1, halfDamageRange: 1.5, maximumRange: 2,   snapShot: 12, rangeBasedOnST: true } ] };
NewEquipment.Spear                   = new Weapon('Spear',                   4,   40,  0,  4,   -6, 'pole/axe', libAbrv+'108112');
NewEquipment.Spear.wieldOptions               = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '1',   note: ["Used 1-handed.","Throwable.","Becomes unready if used to parry."] },
                                                                        { title: '2 hands', hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1,2', note: ["Same spear used 2-handed.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry."] } ],
                                                  SpearThrowing     : [ { title: 'throw',   hands:  'dom', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, accuracy: 2, halfDamageRange: 1,   maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ],
                                                  SpearThrower      : [ { title: 'thrower', hands:  'dom', strength:  9, damage: { base: 'sw',  mods:  3, type: 'imp' }, accuracy: 2, halfDamageRange: 1.5, maximumRange: 2,   snapShot: 12, rangeBasedOnST: true } ] };
NewEquipment.WoodenSpear             = new Weapon('Spear',                   2,   10,  0,  4,   -6, 'pole/axe', libAbrv+'109112');
NewEquipment.WoodenSpear.detail = "Wooden";
NewEquipment.WoodenSpear.wieldOptions         = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  8, damage: { base: 'thr', mods: -1, type: 'imp' }, reach: '1',   note: ["One-handed.","Throwable.","Must be <i>readied</i> for one turn to change between long and short grip."] },
                                                                        { title: '2 hands', hands: 'both', strength:  8, damage: { base: 'thr', mods:  0, type: 'imp' }, reach: '1,2', note: ["Two-handed.","Throwable.","Must be <i>readied</i> for one turn to change between long and short grip."] } ],
                                                  SpearThrowing     : [ { title: 'throw',   hands:  'dom', strength:  8, damage: { base: 'thr', mods:  0, type: 'imp' }, accuracy: 1, halfDamageRange: 1,   maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ],
                                                  SpearThrower      : [ { title: 'woomera', hands:  'dom', strength:  8, damage: { base: 'sw',  mods:  0, type: 'imp' }, accuracy: 1, halfDamageRange: 1.5, maximumRange: 2,   snapShot: 12, rangeBasedOnST: true } ] };
NewEquipment.Javelin                 = new Weapon('Javelin',                 2,   30,  1,  4,   -4, 'pole/axe', libAbrv+'109112');
NewEquipment.Javelin.wieldOptions             = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  0, damage: { base: 'thr', mods:  1, type: 'imp' }, note: ["One-handed.","Throwable."] } ],
                                                  SpearThrowing     : [ { title: 'throw',   hands:  'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' }, accuracy: 3,       halfDamageRange: 1.5, maximumRange: 2.5, snapShot: 10, rangeBasedOnST: true },
                                                                        { title: 'thong',   hands:  'dom', strength:  7, damage: { base: 'thr', mods:  1, type: 'imp' }, accuracy: 4,       halfDamageRange: 1.75,maximumRange: 2.75,snapShot: 12, rangeBasedOnST: true } ],
                                                  SpearThrower      : [ { title: 'atlatl',  hands:  'dom', strength:  6, damage: { base: 'sw',  mods:  1, type: 'imp' }, accuracy: 3,       halfDamageRange: 2,   maximumRange: 3,   snapShot: 11, rangeBasedOnST: true } ] };
NewEquipment.Iklwa                   = new Weapon('Iklwa',                   3,   40,  2,  4,   -4, 'pole/axe', libAbrv+'109112');
NewEquipment.Iklwa.wieldOptions               = { Spear             : [ { title: '1 hand',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' }, note: ["One-handed."] } ] };
NewEquipment.longspear               = new Weapon('spear',                   5,   60,  2,  4,   -8, 'pole/axe', libAbrv+'109112');
NewEquipment.longspear.detail = "long";
NewEquipment.longspear.wieldOptions           = { Spear             : [ { title: '1 hand',  hands:  'dom', strength: 10, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '2,3', note: ["One-handed.","Cannot parry.","May be thrown at -2.","Must be <i>readied</i> for one turn to change between long and short grip."] },
                                                                        { title: '2 hands', hands: 'both', strength: 10, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '2,3', note: ["Two-handed.","Must be <i>readied</i> for one turn to change between long and short grip."] } ],
                                                  SpearThrowing     : [ { title: 'throw',   hands:  'dom', strength: 10, damage: { base: 'thr', mods:  0, type: 'imp' }, accuracy: 1, halfDamageRange: 1,   maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true, note: ["Low-Tech does not give thrown long spear stats; I have increased min ST by 1 and left all other stats equal to normal spear."] } ],
                                                  SpearThrower      : [ { title: 'woomera', hands:  'dom', strength: 10, damage: { base: 'sw',  mods:  0, type: 'imp' }, accuracy: 1, halfDamageRange: 1.5, maximumRange: 2,   snapShot: 12, rangeBasedOnST: true, note: ["Low-Tech does not give thrown long spear stats; I have increased min ST by 1 and left all other stats equal to normal spear."] } ] };

// pike next (p109)




































































importLibrarySettings();

if(window.console) { console.log(newLibrary+" library file load finished") }
