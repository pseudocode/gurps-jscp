/* - - - + - - - - + - - - - + - - - -\/- - - - +|- - - - +|- - - - +|- - - - */

/*------------------------------------------------------------------------------
This javascript file contains functions that are called by events on the
character sheet page, as well as certain variables and utilities that did
not seem suited to abstraction as classes of their own.
During development, code that may later be moved into separate documents
may be found here.
------------------------------------------------------------------------------*/

var ch = document.loadedCharacter;

var reportLevel = 0;

String.prototype.toTitleCase = function() {
    return this.replace(/([\w&`'‘’"“.@:\/\{\(\[<>_]+-? *)/g, function(match, p1, index, title) {        // '
        if (index > 0 && title.charAt(index - 2) !== ":" &&
            match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1)
            return match.toLowerCase();
        if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1)                             // '
            return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
        if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 ||
            title.substring(index - 1, index + 1).search(/[\])}]/) > -1)
            return match;
        return match.charAt(0).toUpperCase() + match.substr(1);
    });
};

function randomPassword(length) {
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    pass = "";
    for(x=0;x<length;x++) {
        i = Math.floor(Math.random() * 62);
        pass += chars.charAt(i);
    }
    return pass;
}

/* javascript client-side include functions */
// This function does not require access to the internet to retrieve local files.
// However, it breaks in Chrome and IE, which seem to consider this a security risk of some kind.
function clientSideInclude(id, url) {
    // get a request object
    var req = false;
    // For Safari, Firefox, and other non-MS browsers
    if (window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch (e) {
            req = false;
        }
    }
    else if (window.ActiveXObject) {
        // For Internet Explorer on Windows
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                req = false;
            }
        }
    }
    var element = document.getElementById(id);
    if (!element) {
        alert("Bad id " + id + "passed to clientSideInclude.  You need a div or span element with this id in your page.");
        return;
    }
    if (req) {
        // Synchronous request, wait till we have it all
        req.open('GET', url, false);
        req.send(null);
        element.innerHTML = req.responseText;
    }
    else {
        element.innerHTML = "Sorry, your browser does not support XMLHTTPRequest objects. "
                          + "This page requires Internet Explorer 5 or better for Windows, "
                          + "or Firefox for any system, or Safari. "
                          + "Other compatible browsers may also exist.";
    }
}
function doCSIs() {
    clientSideInclude('navWrapper',    'includes/GURPSnav.html');
    clientSideInclude('csheet_dialogs','includes/dboxes.html');
    clientSideInclude('csheet_grimoire_wrapper','includes/grimoire.html');
}
/* end CSI stuff */

function doOnloads() {
    $('.dialog').draggable({ handle: '.titlebar'});
    $('.dialog').resizable();       // doesn't work at all
    $('.dialog').mousedown( function() {
        incrementZindex( this.id );
    } );
    sessionStorage.setItem('zdb',10)
    $("#open_new_"+sheet+"_sheet_link").addClass('ready');
    $('#dialogIDs').val('');
    $(document).keydown(catchKeys);
    if( window.console && reportLevel ) console.log('onloads done');
}

/* A little object 'class' to handle the #d+# syntax (i.e., 2d-1 or 1d+2) */
function DieRoll( d, a ) {
 // alert('dice: '+d+"\nadds: "+a);
    // try to cast to numeric
    var dice = 1*d;
    var adds = 1*a;
    // error handling for nonsense?  both params must be integers, 'dice' must also be positive
    if( !(parseInt(dice,10)===dice) || dice<0 ) { alert('first argument (dice: '+d+') to DieRoll is not a positive integer'); return; }
    if( !(parseInt(adds,10)===adds) ) { alert('second argument (adds: '+a+') to DieRoll is not an integer'); return; }
    this.dice = dice;
    this.adds = adds;
}
DieRoll.prototype.modify = function( mod, recalcDice ) {
  //  console.log("[DieRoll.modify] "+this.toString()+", "+signed(mod));
    let re = /^\d+d[+-]?\d?$/;
    if( isNaN(mod) && mod.match(re) ) {
        let roll = mod.split('d');
        this.dice += 1*roll[0];
        let adds = roll[1];
        if( adds.match(/\+/) ) { adds = adds.slice(1); }
        this.adds += 1*adds;
    }
    else this.adds += 1*mod;
	//	console.log("[DieRoll.modify] = "+this.toString());
    this.normalize();
	//	console.log("[DieRoll.modify] = "+this.toString());
	  return this;
}
DieRoll.prototype.modifyPerDie = function( mod ) {
    this.modify( mod*this.dice ); // console.log("[DieRoll.modifyPerDie] ");
    this.normalize();
	  return this;
}
DieRoll.prototype.toString = function() {
    if( !this ) { return; }
    var adds = (this.adds==0) ? '' : this.adds;
    return this.dice+'d'+signed(adds);
}
function DieRollFromString(rollString) {
    let re = /^\d+d?[+-]?\d?$/;
    if( ! rollString.match(re) ) { return null; }
    let roll = rollString.split('d');
    let dice = roll[0];
    let adds = roll[1] || 0;
    if( roll.length==1 ) {
        dice = 0;
        adds = roll[0];
    }
    if( adds && adds.match(/\+/) ) { adds = adds.slice(1); }
    return new DieRoll(dice,adds);
}
DieRoll.prototype.normalize = function() {
    if( this.adds<=-7 ) {
        if( this.dice<=2 ) {
            this.dice = 1;
            this.adds = -5;
            return;
        }
        this.dice -= 2;
        this.adds += 7;
        this.normalize();
    }
    else if( this.adds<=-4 ) {
        if( this.dice==1 ) {
            if( this.adds < -5 ) this.adds = -5;
            return;
        }
        this.dice -= 1;
        this.adds += 4;
        return;
    }
    // else if( this.adds<=4 ) { return; }
    else if( this.adds<=2 ) { return; }
    else if( this.adds<7 ) {
        this.dice += 1;
        this.adds -= 4;
        return;
    }
    else if( this.adds>=7 ) {
        this.dice += 2;
        this.adds -= 7;
        this.normalize();
    }
}
DieRoll.prototype.roll = function() {
    var sum = this.adds;
    for( d=1; d<=this.dice; d++ ) {
        sum += Math.floor(6*Math.random())+1;
    }
    return (sum<1) ? 1 : sum;
}
// use for comparing DieRolls, or whatever
DieRoll.prototype.avg = function() {
    return 3.5*this.dice + this.adds;
}
// DieRoll comparison
DieRoll.prototype.isGT = function( DieRoll2 ) {
 // alert("[DieRoll.isGT] is "+this.dice+"d>"+DieRoll2.dice+"d?");
    if( this.dice > DieRoll2.dice ) return true;    // want 2d-2 to be considered greater than 1d+2, even though it technically isn't (because 1d+2 modified with +1 gives 2d-2)
 // alert("[DieRoll.isGT] is "+this.avg()+">"+DieRoll2.avg()+"?");
    if( this.avg() > DieRoll2.avg() ) {
        return true;
    }
    return false;
}
/* end DieRoll class stuff */

/* Ruleset object class */
function Ruleset( e3, e3lite, e4, e4lite ) {
    this.e3     = (e3)     ? true : false;
    this.e3lite = (e3lite) ? true : false;
    this.e4     = (e4)     ? true : false;
    this.e4lite = (e4lite) ? true : false;
}
Ruleset.prototype.toString = function() {
    var ruleArray = [];
    if( this.e3 )     { ruleArray.push('e3'); }
    if( this.e3lite ) { ruleArray.push('e3lite'); }
    if( this.e4 )     { ruleArray.push('e4'); }
    if( this.e4lite ) { ruleArray.push('e4lite'); }
    return ruleArray.join(', ');
}
Ruleset.prototype.compatWith = function(ruleset) {  // ruleset is a String
    for( var i in this ) {
        if( this[i] && i==ruleset ) return true;
    }
    return false;
}
/* end Ruleset stuff */

/*  reference abbreviations hash
  This list is at http://www.sjgames.com/gurps/abbrevs.html
  Almost all titles are indicated to be 3rd-edition referent (excepting only Dragons).
  Since I know there are numerous 4e supplements now (notably the Dungeon Fantasy series), this list is necessarily out-of-date.
  A forum post from Rev. Pee Kitty claims that there are no 4th edition abbreviations other than "B" for Basic.
  NOTE:  I will sometimes append edition information to abbreviations, as I have several variants of some books.
  So GURPS High Tech, 2nd edition would be abbreviated HT2E.  I note that many of the abbreviations below have
  edition information specified (e.g., HT is the abbreviation for High-Tech, 3rd edition specifically).
  Anyway, so abbreviations like HT2E44, for "GURPS High-Tech, 2nd edition, page 44" are valid.
*/
var titleForAbbreviation = {
    A: "Aliens",
    AA: "Wild Cards: Aces Abroad",
    AC: "Alpha Centauri",
    AD: "Autoduel",
    AE: "Alternate Earths",
    AET: "Alternate Earths 2",
    AH: "Atomic Horror",
    AN: "Arabian Nights",
    AON: "Age of Napoleon",
    ASJ: "All-Star Jam 2004",
    AT: "Atlantis",
    AZ: "Aztecs",
//     B: "Basic Set (Third Edition, Revised)",
//     B: "Basic Set: Characters and Campaigns (Deluxe Edition)",
    // I will keep this a valid hash by using
    B: "Basic Set",
    // with edition information appended as above (eg "B3E"), which will be stripped before lookup here
    BB: "Bunnies & Burrows",
    BD: "Transhuman Space: Broken Dreams",
    BE: "Bestiary",
    BIO: "Bio-Tech (First Edition)",
    BO: "Black Ops",
    BP: "Blue Planet",
    BT: "Blood Types",
    C: "Cops",
    CA: "Camelot",
    CB: "Cabal",
    CCS: "Callahan's Crosstime Saloon",
    CF: "Castle Falkenstein",
    CH: "China",
    CI: "Compendium I",
    CII: "Compendium II",
    CL: "Cliffhangers",
    CM: "Celtic Myth",
    CN: "Creatures of the Night",
    CO: "Conan",
    CT: "CthulhuPunk",
    CV: "Covert Ops",
    CW: "Cyberworld",
    CY: "Cyberpunk",
    CYA: "Cyberpunk Adventures",
    D: "Dinosaurs",
    'D:DN1': "Deadlands Dime Novel 1 – Aces and Eights",
    'D:DN2': "Deadlands Dime Novel 2 – Wanted: Undead or Alive",
    'D:H': "Deadlands: Hexes",
    'D:V': "Deadlands: Varmints",
    DA: "Discworld Also",
    DB: "Transhuman Space: Deep Beyond",
    DL: "Deadlands: Weird West",
    DR: "Dragons",
    E: "Espionage",
    EG: "Egypt",
    F: "Fantasy (Second Edition)",
    FA: "Fantasy Adventures",
    FAE: "Faerie",
    FB: "Fantasy Bestiary",
    FF: "Fantasy Folk",
    FII: "Fantasy II: The Mad Lands",
    FW: "Transhuman Space: Fifth Wave",
    G: "Grimoire",
    GB: "Goblins",
    GR: "Greece",
    GT: "Traveller",
    H: "Horror (Third Edition)",
    HA: "Fantasy: Harkwood",
    HB: "Hellboy Sourcebook and Roleplaying Game",
    HF: "Transhuman Space: High Frontier",
    HO: "Horseclans",
    HT: "High-Tech (Third Edition)",
    HU: "Humanx",
    I: "Illuminati",
    IA: "Ice Age",
    IN: "In Nomine",
    IOU: "IOU",
    IR: "Imperial Rome",
    IST: "Supers: International Super Teams",
    ITW: "Transhuman Space: In The Well",
    J: "Japan",
    L: "Lensman",
    LI: "Lite (Third Edition, Revised)",
    LT: "Low-Tech (First Edition)",
    M: "Magic (Second Edition)",
    MA: "Martial Arts (Second Edition)",
    MAA: "Martial Arts Adventures",
    MAO: "Middle Ages 1",
    MAR: "Mars",
    MD: "Supers: Mixed Doubles",
    ME: "Mecha",
    MF: "Modern Firepower",
    MI: "Magic Items 1",
    MIiii: "Magic Items 3",
    MIT: "Magic Items 2",
    MO: "Monsters",
    MTA: "Mage: The Ascension",
    MTM: "Man to Man",
    MY: "Myth",
    NS: "New Sun",
    OD: "Transhuman Space: Orbital Decay",
    OE: "Operation Endgame",
    OG: "Ogre",
    OSF: "Old Stone Fort",
    OT: "Castle Falkenstein: The Ottoman Empire",
    OW: "Old West",
    P: "Psionics",
    PA: "Planet of Adventure",
    PF: "Transhuman Space: Personnel Files",
    PK: "Planet Krishna",
    PM: "Places of Mystery",
    PR: "Prisoner",
    PYi: "Best of Pyramid 1",
    PYii: "Best of Pyramid 2",
    R: "Religion",
    RAT1: "AADA Road Atlas V1: The East Coast",
    RAT2: "AADA Road Atlas V2: The West Coast",
    RAT3: "AADA Road Atlas V3: The South",
    RAT4: "AADA Road Atlas V4: Australia",
    RAT5: "AADA Road Atlas V5: The Midwest",
    RAT6: "AADA Road Atlas V6: The Free Oil States",
    RAT7: "AADA Road Atlas V7: Mountain West",
    RG: "Rogues",
    RH: "Robin Hood",
    RI: "Riverworld",
    RO: "Robots",
    RS: "Reign of Steel",
    RU: "Russia",
    S: "Space (Third Edition)",
    SA: "Space Adventures",
    SAT1: "Space Atlas",
    SAT2: "Space Atlas 2",
    SAT3: "Space Atlas 3",
    SAT4: "Space Atlas 4",
    SB: "Space Bestiary",
    SC: "Supporting Cast",
    SCR: "Screampunk",
    SH: "Shapeshifters",
    SO: "Special Ops",
    SP: "Scarlet Pimpernel",
    SPI: "Spirits",
    SS: "Super Scum",
    SSS: "Transhuman Space: Spacecraft of the Solar System",
    ST: "Supertemps",
    STE: "Steam-Tech",
    STM: "Steampunk",
    SU: "Supers (Second Edition)",
    SUA: "Supers Adventures",
    SW: "Swashbucklers",
    SWT: "SWAT",
    T: "Technomancer",
    'T:AI': "Traveller: Alien Races 1",
    'T:AII': "Traveller: Alien Races 2",
    'T:AIII': "Traveller: Alien Races 3",
    'T:AIV': "Traveller: Alien Races 4",
    'T:BC': "Traveller: Behind The Claw",
    'T:BH': "Traveller: Heroes 1 – Bounty Hunters",
    'T:FI': "Traveller: First In",
    'T:FT': "Traveller: Far Trader",
    'T:GF': "Traveller: Ground Forces",
    'T:GM': "Traveller GM's Screen",
    'T:H': "Traveller: Humaniti",
    'T:Ji': "Traveller: The Best of JTAS 1",
    'T:MC': "Traveller: Modular Cutter",
    'T:N': "Traveller: Nobles",
    'T:PS1': "Traveller: Planetary Survey 1 – Kamsii",
    'T:PS2': "Traveller: Planetary Survey 2 – Denuli",
    'T:PS3': "Traveller: Planetary Survey 3 – Granicus",
    'T:PS4': "Traveller: Planetary Survey 4 – Glisten",
    'T:PS5': "Traveller: Planetary Survey 5 – Tobibak",
    'T:PS6': "Traveller: Planetary Survey 6 – Darkmoon",
    'T:RF': "Traveller: Rim of Fire",
    'T:S': "Traveller: Starships",
    'T:SM': "Traveller: Star Mercs",
    'T:ST': "Traveller: Starports",
    'T:SW': "Traveller: Sword Worlds",
    TE: "Space: Terradyne",
    TI: "Timeline",
    TM: "Transhuman Space: Toxic Memes",
    TR: "Fantasy: Tredroy",
    TS: "Transhuman Space",
    TT: "Time Travel",
    TTA: "Time Travel Adventures",
    U: "Uplift",
    UN: "Undead",
    UP: "Transhuman Space: Under Pressure",
    USER: "user-defined",     // for custom objects
    UT: "Ultra-Tech (Second Edition, Revised)",
    UTT: "Ultra-Tech 2",
    V: "Villains",
    VC: "Vampire Companion",
    VE: "Vehicles",
    VEL: "Vehicles Lite",
    VI: "Vikings",
    VO: "Voodoo",
    VTM: "Vampire: The Masquerade",
    VXi: "Vehicles Expansion 1",
    VXii: "Vehicles Expansion 2",
    W: "WWII",
    'W:AKM': "WWII: All the King's Men",
    'W:D': "WWII: Dogfaces",
    'W:FH': "WWII: Frozen Hell",
    'W:GL': "WWII: Grim Legions",
    'W:HS': "WWII: Hand of Steel",
    'W:IC': "WWII: Iron Cross",
    'W:MP': "WWII: Motor Pool",
    'W:RH': "WWII: Return to Honor",
    'W:WW': "WWII: Weird War II",
    WA: "Warriors",
    WAC: "War Against the Chtorr",
    WC: "Wild Cards",
    WI: "Wizards",
    WT: "Warehouse 23",
    WTA: "Werewolf: The Apocalypse",
    WW: "Witch World",
    WWi: "Who's Who 1",
    WWii: "Who's Who 2",
    Y: "Y2K"
}
var edNames = {
    1: 'First',
    2: 'Second',
    3: 'Third',
    4: 'Fourth',
    5: 'Fifth'
}
var edAbrvs = {
    1: '1st',
    2: '2nd',
    3: '3rd',
    4: '4th',
    5: '5th'
}
var edAbrvsHTML = {
    1: '1<sup>st</sup>',
    2: '2<sup>nd</sup>',
    3: '3<sup>rd</sup>',
    4: '4<sup>th</sup>',
    5: '5<sup>th</sup>'
}
function expandMiniref( miniref, plaintext ) {
		if( !miniref ) return '';			// console.log(miniref);
    var references = [];
    // complex cases: "CII29,30;B3E159" "M3E44-45" "Basic Set 3rd ed., pg 236 (appendix); Compendium I, pg 24"
    // (should I error-check for already-expanded refs?)
    // split on semicolons first; should separate refs into single-source groups
    var groups = miniref.split(/;\s*/);
    if( !groups ) groups = [miniref];   // makes a single group if there is no semicolon
    for( var g=0; g<groups.length; g++ ) {
        var group = groups[g];
        // split on commas/dashes next, for cases like "CII29,30" and "B3E174-5"
        var delims = group.match(/,\s*|-/);
        // console.log('delims:'); console.log(delims);
        var delim = (delims) ? delims[0] : '';
        // console.log("delim = "+delim);
        var pagesets = group.split(/,\s*|-/);
        if( !pagesets ) pagesets = [group];   // makes a single page set if there is no comma or dash
        // console.log('pagesets:'); console.log(pagesets);
        var prefix = '';
        var abbrv  = '';
        var edtn   = '';
        var pages  = [];
        // loop over these page sets, parsing abbreviation, edition, and page numbers
        for( var p=0; p<pagesets.length; p++ ) {
            var set = pagesets[p];   // e.g. "CII29", "B3E174", or "30"
            var tokens = set.match(/(.*?)(\d+)$/i);    // so tokens should get e.g. ["B3E174","B3E","174"] or ["30","","30"] (matches always keeps the whole matched string at index 0)
            if( !tokens ) continue;
            // console.log('tokens:'); console.log(tokens);
            //   save prefix (eg. "B3E") for re-use if it goes missing
            if( isNaN(tokens[1]) ) prefix = tokens[1];
            // console.log("prefix = "+prefix);
            //   shave off edition part of tokens like "B3E"
            var edmatches = prefix.match(/(.*)(\d)E/);    // edmatches = ["B3E","B","3E"]
            var abbrv = ( edmatches ) ? edmatches[1] : prefix;
            var edtn  = ( edmatches ) ? edmatches[2] : '';
            // console.log("abbrv = "+abbrv);
            // console.log("edtn = "+edtn);
            pages.push(tokens.pop());
        }
        // console.log('pages:'); console.log(pages);
        var pp = (pages.length>1) ? 'pp' : 'pg';
        // get reference from titleForAbbreviation
        // the pages array should only have >1 element if delim also exists (check?)
        var pgs = ( pages.length>1 && delim ) ? pages.join(delim) : pages[0];
        var title = titleForAbbreviation[abbrv];
        if( !title ) continue;
        // edition stuff
        var edFromTitle = ( title.match(/edition/i) ) ? title.match(/\((.*)\s+edition.*/i)[1] : '';
        var newEd = '';
        // console.log("edFromTitle = "+edFromTitle);
        // console.log("edNames[edtn] = "+edNames[edtn]);
        // console.log("edAbrvsHTML[edtn] = "+edAbrvsHTML[edtn]);
        let ednAbrv = ( plaintext ) ? edAbrvs[edtn] : edAbrvsHTML[edtn];
        if( edtn && ednAbrv != edFromTitle ) {
            newEd = " ("+ednAbrv+" Edition)";
            var edTokens = title.match(/(.*)\s+\(/i);
            var title = (edTokens) ? edTokens[1] : title;
        }
        // console.log("title = "+title);
        // console.log("newEd = "+newEd);
        references.push(title+newEd+', '+pp+' '+pgs);
    }
    // console.log('references:'); console.log(references);
    return (references.length>0) ? references.join('; ') : miniref;
}

/* useful global variables */
var months   = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var linkerProps = [ 'modifier', 'adjustment', 'prerequisite', 'default' ];
var traitTypeNames = { A: 'advantage', D: 'disadvantage', P: 'perk', Q: 'quirk', S: 'spacer', H: 'header' }
var Difficulties = [ 'Easy', 'Average', 'Hard', 'Very Hard' ];
var Dffclts = [ 'E', 'A', 'H', 'VH' ];
var skillDifficultyLevels = { Easy: 0, Average: 1, Hard: 2, 'Very Hard': 3 };
var spellClassesList = [ 'reg', 'area', 'info', 'block', 'spcl', 'msl', 'melee', 'ench' ];  // These should either be 'universal' (in which case, define in the 'useful globals' area above), or library-specific.  If the latter, generate the checkboxes on the form instead of hard-coding them.
var spellClassNames = { reg: 'Regular', area: 'Area', info: 'Information', spcl: 'Special',
                        msl: 'Missile', melee: 'Melee', block: 'Blocking', ench: 'Enchantment',
                        riq: 'Resisted by IQ', rst: 'Resisted by ST', rht: 'Resisted by HT',
                        rdx: 'Resisted by DX', rwi: 'Resisted by Will', rsp: 'Resisted by subject spell' };   // for decoding the terse keys used in the Spell.stats object
var qualities = ['cheap','good','fine','very fine'];
// body parts (for armor, etc.)
var bodyAreaParts = { head: 'skull', body: 'torso', arms: 'domArm', legs: 'domLeg', hands: 'domHand', feet: 'domFoot' };
var headParts = ['skull','eyes','face'];
var bodyParts = ['neck','torso','waist','groin'];
var vitalParts= ['groin','jaw','kidneys','nose','throat'];
var limbParts = ['domArm','offArm','domLeg','offLeg'];
var suitParts = bodyParts.concat(limbParts);
var hdftParts = ['domHand','offHand','domFoot','offFoot'];
var xtrmParts = limbParts.concat(hdftParts);
var bodySuitParts = bodyParts.concat(xtrmParts);
var bodySuit = ['suit'].concat(bodySuitParts);
//var fullSuitParts =
var allBodyParts = headParts.concat(bodySuitParts);
var fullSuit = ['suit'].concat(allBodyParts);
var encumbrances = ['None','Light','Medium','Heavy','X-Heavy'];
var symbolFor = { 'footnote' : '<sup style="font-size:50%; vertical-align:top">&dagger;</sup>' };	// default vertical-align is 'super', which increases td height by 3 px and messes up tables
var RefPrefxs = {
    'B'   : 'Basic Set 3rd ed.',
    'CI'  : 'Compendium I',
    'CII' : 'Compendium II',
    'M3'  : 'Magic 3rd ed.',
    'BCh' : 'Basic Set 4th ed. - Characters',
    'BCa' : 'Basic Set 4th ed. - Campaigns'
};
var RulesetOptionsList = [
    { text: 'GURPS 3rd Edition', value: 'e3' },
    { text: 'GURPS Lite 3rd Edition', value: 'e3lite', disabled: true },
    { text: 'GURPS 4th Edition', value: 'e4' },
    { text: 'GURPS Lite 4th Edition', value: 'e4lite' },
];
var RulesetNames = {
    'e3'     : 'GURPS 3rd Edition',
    'e3lite' : 'GURPS Lite 3rd Edition',
    'e4'     : 'GURPS 4th Edition',
    'e4lite' : 'GURPS Lite 4th Edition'
};
var themes = ['','blood','blue','brown','green','metal','orange','purple','water'];
var blueTheme = {
    font: '',
    hilite: '',
    light: '',
};
var colors = blueTheme;
/* themes
Blue
.fill-in font: blue
.editable font: green
.ready background-color: #DDEEFF                      (light blue)
.editable/clickable/:hover background-color: #EEE9BF  (light brown)
.zrow background-color: #EAF3FA                       (very light blue)
.titlebar background-color: #CCDDEE                   (muted blue)
.dialog border color: #AABBCC;                        ()
Green
.fill-in font: green
.editable font: ???
.ready background-color: #CFC                         (light bright green)  (EFE is a very light green)
.editable/clickable/:hover background-color: #EEE9BF  (light brown)
.zrow background-color: #DDF0DD                       (very light green)
.titlebar background-color: #CDC                      (muted green)
.dialog border color: #aba;                           ()
Brown
.fill-in font: ???
.editable font: ???
.ready background-color: #EEE9BF                      (light brown)
.editable/clickable/:hover background-color: #CFC     (light bright green)
.zrow background-color: #F8F2D0                       (light beige)
*/
var unitsFor = {
    'English' : { 'length' : 'in', 'weight' : 'lb' },
    'MKS'     : { 'length' : 'm',  'weight' : 'kg' },
    'CGS'     : { 'length' : 'cm', 'weight' : 'g' }
};
var nameForUnit = {
  'cm'  : 'centimeter',
  'ft'  : 'foot',
  'g'   : 'gram',
  'gal' : 'gallon',
  'in'  : 'inch',
  'kg'  : 'kilogram',
  'lb'  : 'pound',
  'm'   : 'mile',
  'mi'  : 'mile',
  'pt'  : 'pint',
  'qt'  : 'quart',
  'wk'  : 'week',
  'yd'  : 'yard',
};
// single-letter symbols for scales, in thousands or thousandths (with blanks for zero of either)
var bigScaleSymbols   = ['','k','M','G','T','P'];
var smallScaleSymbols = ['','m','μ','n','p','f'];

// these are used to preserve library object items that have been overwritten by 'custom' items in the Character object
var OverriddenAdjustments = {};
var OverriddenDefaults = {};
var OverriddenModifiers = {};
var OverriddenPrerequisites = {};
var OverriddenTemplates = {};

/* utilities */
function getCheckedValue(radioObj) {
  if(!radioObj)
    return "";
  var radioLength = radioObj.length;
  if(radioLength == undefined)
    if(radioObj.checked)
      return radioObj.value;
    else
      return "";
  for(var i = 0; i < radioLength; i++) {
    if(radioObj[i].checked) {
      return radioObj[i].value;
    }
  }
  return "";
}

function simulate( element, eventName ) {
    var options = extend( defaultOptions, arguments[2] || {} );
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}
// these take DOM objects (not just their names) as arguments
function getRadioGroupValue( radioGroup ) {
    for( j=0; j<radioGroup.length; j++ ) {
        if( radioGroup[j].checked ) {
            return radioGroup[j].value;
        }
    }
}
function setRadioGroupValue( radioGroup, value ) {
    for( j=0; j<radioGroup.length; j++ ) {
        radioGroup[j].checked = false;
        if( radioGroup[j].value == value ) {
            radioGroup[j].checked = true;
        }
    }
}

function makeNumberOptionsList( low, high, selectIndex, descend ) {
    //alert('makeNumberOptionsList( '+low+', '+high+', '+selectIndex+', '+descend+' )');
    var doSelected = ( typeof selectIndex == 'undefined' ) ? false : true;
    if( selectIndex<low  ) selectIndex=low;    //alert('( selectIndex>high )? '+(selectIndex>high));
    if( selectIndex>high ) selectIndex=high;   //alert(selectIndex);
    var opts = [];
    for( var i=low; i<=high; i++ ) {
        var selAtt = ( doSelected && i==selectIndex ) ? 'selected="selected"' : '';
        opts.push('  <option value="'+i+'" '+selAtt+'>'+i+'</option>');
    }
    if( descend ) opts.reverse();
    return opts;
}

function makeNumberOptions( low, high, indent, selectIndex, descend ) {
    var opts = makeNumberOptionsList( low, high, selectIndex, descend );
    opts.unshift(indent);
    opts.push('');
    return opts.join("\n"+indent);
}

function makeListOptions( optionsArray, startIndex, indent, selectIndex ) { //console.log(optionsArray);
    var doSelected = ( typeof selectIndex == 'undefined' ) ? false : true;
    var opts = [indent];
    for( var i in optionsArray ) {
        var opt = (optionsArray[i]) ? optionsArray[i] : +i+1;
        var selAtt = ( doSelected && startIndex==selectIndex ) ? 'selected="selected"' : '';
        opts.push('  <option value="'+startIndex+'" '+selAtt+'>'+opt+'</option>');
        startIndex++;
    }
    opts.push('');
    return opts.join("\n"+indent);
}

function makeOptions( optionHash, selectIndex, indent ) {
    // these have no guaranteed order because the parameter is a hash!
    var doSelected = ( typeof selectIndex == 'undefined' ) ? false : true;
    var opts = [indent];
    for( var val in optionHash ) {
        var text = optionHash[val];
        var selAtt = ( doSelected && val==selectIndex ) ? 'selected="selected"' : '';
        opts.push('  <option value="'+val+'" '+selAtt+'>'+text+'</option>');
    }
    opts.push('');
    return opts.join("\n"+indent);
}

function makeObjectOptions( optionsArray, selectIndex, indent ) {
    var opts = [indent];
    for( var i in optionsArray ) {
        var item = optionsArray[i];
        var key  = item.key;
        var text = item.value.name;
        if( !text ) continue;
        var selAtt = ( selectIndex && key==selectIndex ) ? 'selected="selected"' : '';
        opts.push('  <option value="'+key+'" '+selAtt+'>'+text+'</option>');
    }
    opts.push('');
    return opts.join("\n"+indent);
}
// takes a list of option objects { text: 'option text', value: 'value' [, title: 'option tool-tip text' ] [, disabled: true ] }
//	and returns a list of HTML options <option value="value">name</option>
function makeSelectListOptions( options, selectedOptionValue ) {
		var optionsHTML = [];
		for( var opt=0; opt<options.length; opt++ ) {
		    var option = options[opt];
		    var sel   = ( typeof selectedOptionValue != 'undefined' && option.value==selectedOptionValue ) ? ' selected="selected"' : '';
        var disbl = ( option.disabled ) ? ' disabled="disabled"' : '';
        var title = ( option.title ) ? ' title="'+option.title+'"' : '';
		    optionsHTML.push('<option value="'+option.value+'"'+title+disbl+sel+'>'+option.text+'</option>');
		}
		return optionsHTML;
}

function makeSkillOptionsList( skillSet, sortKey, skillToSelect ) {

    // sort items from the appropriate library data object according to the sort key
    var SkillsObj = eval(skillSet);
    var skillItems = [];
    for( var label in SkillsObj ) {
        if( !SkillsObj[label].name ) continue;
				skillItems.push( { key: label, value: SkillsObj[label] } );
    }
    skillItems.sort(
        function(a,b) {
            if( !a.value[sortKey] && !b.value[sortKey] ) return 0;
            if( !a.value[sortKey] ) return -1;
            if( !b.value[sortKey] ) return  1;
            if( isNaN(a.value[sortKey]) && isNaN(b.value[sortKey]) ) {
                if( a.value[sortKey].toLowerCase() < b.value[sortKey].toLowerCase() ) return -1;
                if( a.value[sortKey].toLowerCase() > b.value[sortKey].toLowerCase() ) return  1;
                return 0;
            }
            else { return a.value[sortKey] - b.value[sortKey]; }
        }
    );

    // loop over sorted skill items array to make menu options
    var skillOptionsHTML = [''];
  SKILLS:
    for( var n in skillItems ) {
        var label = skillItems[n].key;
        var putativeSkill = skillItems[n].value;
        if( putativeSkill.name ) {
            // push option for this skill
            var skillName  = putativeSkill.name;
            var selected = ( skillToSelect && skillToSelect==label ) ? 'selected="selected"' : '';
            skillOptionsHTML.push('<option value="'+label+'" title="ref for '+label+'" '+selected+'>'+skillName+'</option>');
        }
        else {
            skillOptionsHTML.push('<option value="'+label+'">['+label+' row]</option>');
        }
    }
    return skillOptionsHTML;
}

function makeSortedKeyItemList( LibObject, sortKey ) {
    var objItems = [];
    for( var memberLabel in LibObject ) {
        objItems.push( { key: memberLabel, value: LibObject[memberLabel] } );
    }
    objItems.sort(
        function(a,b) {
            if( !a.value[sortKey] && !b.value[sortKey] ) return 0;
            if( !a.value[sortKey] ) return -1;
            if( !b.value[sortKey] ) return  1;
            if( sortKey=='colleges' ) {  // should make this conditional on 'value' being an array (or perhaps an object)
                if( a.value[sortKey][0].toLowerCase() < b.value[sortKey][0].toLowerCase() ) return -1;
                if( a.value[sortKey][0].toLowerCase() > b.value[sortKey][0].toLowerCase() ) return  1;
                return 0;
            }
            else if( isNaN(a.value[sortKey]) ) {
                if( a.value[sortKey].toLowerCase() < b.value[sortKey].toLowerCase() ) return -1;
                if( a.value[sortKey].toLowerCase() > b.value[sortKey].toLowerCase() ) return  1;
                return 0;
            }
            else { return a.value[sortKey] - b.value[sortKey]; }
        }
    );
    return objItems;
}

function makeTime(secs) {
    if( isNaN(secs) ) return secs;
    var hrs = Math.round( secs/3600 );
    var mins = Math.round( (secs - hrs*3600)/60 );
    secs = secs - mins*60 - hrs*3600;
    var timeString = (hrs) ? hrs+' hr'+es(hrs) : '';
    timeString += (mins) ? mins+' min'+es(mins) : '';
    timeString += (secs) ? secs+' sec'+es(secs) : '';
    return timeString;
}

function signed(num) {
    var sign = (num>0) ? '+' : '';
    return sign+num;
}

function es(n,align) {
    if( isNaN(n) ) { return ''; }
    if( n==0 ) { return 's'; }
    var sp = (align) ? '&ensp;' : '';
    return ( -1<=n && n<=1 ) ? sp : 's';
   // return ( n<-1 || n>1 ) ? 's' : sp;
    // there's an argument for simply using "return (n==1) ? sp : 's';"
    // wait, shouldn't n=0 return 's'?  "I have 0 arrow" sounds weird, it should be "I have 0 arrows".
    // so return ( Num.abs(n)==1 ) ? '' : 's' or ( n==1 || n==-1 ) ? '' : 's'
}

function plural( word, n ) {
    if( !word ) return word;
    var pluralize = ( es(n)=='s' ) ? true : false;
    if( pluralize ) {
        // special cases
        if( word.match(/^ft$/i) ) return word;
        if( word.match(/\s*foot$/i) ) return word.replace('foot','feet');
        if( word.match(/\s*mouse$/i) ) return word.replace('mouse','mice');
        if( word.match(/^goose$/i) ) return word.replace('goose','geese');
        // also wo/man, child, person, tooth are irregular
        // but sheep, series, fish, cod, salmon, aircraft, cattle, scissors, swine, deer, trousers DO NOT CHANGE for plural
        if( word.match(/\s*die\s*/i) ) return word.replace('die','dice');
        if( word.match(/\s*staff\s*/i) ) return word.replace('staff','staves');
        // some (most? but definitely not all!) words ending in 'o' take 'es' instead of 's': tomato, volcano, potato, hero
        // algorithm
        var lastLetter = word.substr(-1);
        var endPair    = word.substr(-2);
        // console.log("'"+word+"' ends with pair '"+endPair+"' and last letter '"+lastLetter+"'");
        if( endPair.match(/pus/i) ) { return word.replace(/pus$/, 'i' ); }
        else if( endPair.match(/ch|sh/i) || lastLetter.match(/[sxz]/i) ) { return word+'es'; }
        // exceptions to the 'f(e)->ves' rule: roof, proof, belief
        else if( lastLetter.match(/f/i) ) { return word.replace( /f$/, 'ves' ); }
        else if( endPair.match(/fe/i) ) { return word.replace(/fe$/, 'ves' ); }
        else if( endPair.match(/tum/i) ) { return word.replace(/tum$/, 'ta' ); }
        else if( lastLetter.match(/y/i) && !word.substr(-2,1).match(/[aeiou]/) ) { return word.replace(/y$/,'ies'); }
        else if( lastLetter.match(/[^a-zA-Z]/i) ) { return word+"&rsquo;s"; }
        else { return word+'s'; }
    }
    else return word;
}

function length2string( length, measurePref ) {
    if( measurePref && !measurePref.match(/english/i) ) {
        if( measurePref.match(/mks/i) ) {
            return length+" m";
        }
        if( measurePref.match(/cgs/i) ) {
            return length+" cm";
        }
        // others can be added here
    }
    else {
        var feet   = Math.floor(length/12);
        var inches = Math.round(length%12);
        return feet+"′"+inches+'″';
    }
}
function inches2string( inches, measurePref ) {   // this one assumes input in inches, converts to other systems if needed
    if( !measurePref ) measurePref = ch.preferences.units.measure;
    if( !measurePref.match(/english/i) ) {
        if( measurePref.match(/mks/i) ) {
            return Math.round(2.54*inches)/100+" m";
        }
        if( measurePref.match(/cgs/i) ) {
            return Math.round(2.54*inches)+" cm";
        }
        // others can be added here
    }
    else {
        var feet = Math.floor(inches/12);
        var inch = Math.round(inches%12);
        return feet+"′"+inch+"″";   // 'prime' and 'double-prime'; &apos;, &quot;
    }
}

function arrayDiff(array1, array2) {
    const temp = [];
    array1 = array1.toString().split(',').map(Number);
    array2 = array2.toString().split(',').map(Number);
    for (var i in array1) {
        if(!array2.includes(array1[i])) temp.push(array1[i]);
    }
    for(i in array2) {
        if(!array1.includes(array2[i])) temp.push(array2[i]);
    }
    return temp.sort((a,b) => a-b);
}

function convertWeight( wt, measurePref ) {
    if( measurePref.match(/english/i) ) { return wt; }
    else {
        if( measurePref.match(/mks/i) ) { return wt*0.453592; }
        if( measurePref.match(/cgs/i) ) { return wt*453.592; }
        // others can be added here
    }
}

function makeMixedFraction(num) {
    var frac = '';
    if( isFraction(num,2) ) {
        if( isFraction(num,2)==1 ) frac = '½';
    }
    else if( isFraction(num,3) ) {
 // alert('isFraction('+num+',3): '+isFraction(num,3));
        if( isFraction(num,3)==1 ) frac = '⅓';
        if( isFraction(num,3)==2 ) frac = '⅔';
    }
    else if( isFraction(num,4) ) {
        if( isFraction(num,4)==1 ) frac = '¼';
        if( isFraction(num,4)==3 ) frac = '¾';
    }
    else if( isFraction(num,5) ) {
        if( isFraction(num,5)==1 ) frac = '⅕';
        if( isFraction(num,5)==2 ) frac = '⅖';
        if( isFraction(num,5)==3 ) frac = '⅗';
        if( isFraction(num,5)==4 ) frac = '⅘';
    }
    else if( isFraction(num,6) ) {
        if( isFraction(num,6)==1 ) frac = '⅙';
        if( isFraction(num,6)==5 ) frac = '⅚';
    }
    else if( isFraction(num,7)==1 ) frac = '⅐';
    else if( isFraction(num,8) ) {
        if( isFraction(num,8)==1 ) frac = '⅛';
        if( isFraction(num,8)==3 ) frac = '⅜';
        if( isFraction(num,8)==5 ) frac = '⅝';
        if( isFraction(num,8)==7 ) frac = '⅞';
    }
    else if( isFraction(num, 9)==1 ) frac = '⅑';
    else if( isFraction(num,10)==1 ) frac = '⅒';
    else {    // if no convenient fraction, return the number unchanged
        return num;
    }
    return ((Math.abs(num)<1) ? '' : Math.trunc(num)) + frac;
}
function makeFraction(num) {
    for( var d=1; d<=20; d++ ) {
        if( isFraction(num,d) ) return isFraction(num,d)+'/'+d;
    }
    for( var d=25; d<=100; d+=5 ) {
        if( isFraction(num,d) ) return isFraction(num,d)+'/'+d;
    }
    return num;
}
function makeHTMLfraction(num) {
    for( var d=1; d<=20; d++ ) {
        if( isFraction(num,d) ) return '<sup>'+isFraction(num,d)+'</sup>&frasl;<sub>'+d+'</sub>';
    }
    for( var d=25; d<=100; d+=5 ) { // console.log("is "+num+" a fraction with "+d+" as its denominator?");
        if( isFraction(num,d) ) return '<sup>'+isFraction(num,d)+'</sup>&frasl;<sub>'+d+'</sub>';
    }
    return num;
}
function isFraction( num, denom ) {
    var mult  = num*denom;
    var round = Math.round(mult);
    if( Math.abs(mult-round)<0.000001 ) return Math.abs(round%denom);   // so if num is 1.666666666667, returns 2 (as in "1 and ⅔")
    else return false;
}

/*
The idea here is transform/round/transform.  First you find a transformation parameter,
which is a power of 10 that is close to (either below or above) the given number.
Then divide the number by 10 raised to [that power, minus the desired number of significant figures,
plus 1 (unless using the power below)] - this is the transformation.
Then round to the nearest integer, then transform back by multiplying by the same power of 10.
I think that using the floor (or ceiling) function works equally well for positive and negative numbers.
*/
function roundToSigFigs( num, figs ) {                // console.log("got num="+num+", and figs="+figs);
    if( num==0 ) return 0;
    if( !figs ) {   
        let zerospos = (num+'').indexOf('00');
        // console.log(num+', '+zerospos);
        figs = ( zerospos==-1 ) ? (num+'').length : zerospos;
    }
    var log10  = Math.log(Math.abs(num))/Math.LN10;   //  console.log("log="+log10);
    var power  = Math.floor(log10) - figs + 1;        //  console.log("power="+power);
    var factor = Math.pow( 10, power );               //  console.log("factor="+factor);
                                                      //  console.log("rounded transform = "+Math.round( num/factor ));
    var result = Math.round( num/factor ) * factor;   //  console.log("result="+result);
    return Math.round( 10000000*result )/10000000;  // the 10000000000 is a hack to avoid the javascript decimal multiplication error
   // return result;
}
function scaleToFit( num, width ) {
    // while loop to find large-number abbreviations
      // count how many times 1000 will divide, define appropriate suffix (i.e. 1->K, 2->M, 3->G, etc.)
      // use roundToSigFigs to get numerical part
    if( num>=Math.pow(10,width) ) {
        var scale, rounded, thousands = 0;
        do {
            thousands++;
            scale = Math.pow(1000,thousands);
            rounded = Math.round(num/scale);
        } while( rounded.toString().length>=width )
        return rounded+bigScaleSymbols[thousands];
        // isn't all of this a different way to do roundToSigFigs( num, figs )?
    }
    else if( num<1 && num.toString().length>=width ) {
        var scale, rounded, thousandths = smallScaleSymbols.length+1;
        do {
            thousandths--;
            scale = Math.pow(0.001,thousandths);
            rounded = Math.round(num/scale);
        } while( rounded.toString().length>=width )
        return rounded+smallScaleSymbols[thousandths];
    }
    else if( num.toString().length>=width ) {
        return (num.toString().substr(0,width).match(/\./) ) ? roundToSigFigs( num, width-1 ) : roundToSigFigs( num, width );
    }
    else return num;
    // do something similar for very small numbers?
    // for numbers with lots of digits to the right of the decimal, try makeMixedFraction
      // count fraction as a single digit and re-measure fit
      // if no fraction (result==input), use roundToSigFigs( num, width ) (i.e., figs=width)
    //
}
function abbreviateNumber( num ) {
    //  Shortens large (or tiny) numbers in a sensible way, using the common scales ( kilo-, mega-, micro-, etc.)
    //  Results will always be 1 to 4 characters in length.
    //  Checks if num has a fractional part, i.e., if it looks like (##)&frac##;.  If so, it works with the numerical prefix (but does not round).
    //  UNICODE FRACTIONS break isNaN(); it returns an error instead of true or false.
    //  I can't find a TEST for unicode nums; unless I want to use a try-catch.  Which I don't - lazy...
    //  So I have just made sure that unicode fractions don't get here at the calls.
    if( isNaN(num) ) {
        if( num && num.match(/&/) ) {
            var tokens = num.split('&');  // alert(tokens);
            if( tokens[0].length>=4 )
                num = tokens[0];    // and pass on to filters below
            else return num;
        }
        else return false;
    }
    if( num>=Math.pow(10,4) ) {
        var scale, rounded, thousands = 0;
        do {
            thousands++;
            scale = Math.pow(1000,thousands);
            rounded = Math.round(num/scale);
        } while( rounded.toString().length>=4 )
        return rounded+bigScaleSymbols[thousands];
        // isn't all of this a different way to do roundToSigFigs( num, figs )?
    }
    else if( num==0 ) {
        return num;
    }
    else if( num<0.001 ) {
        var scale, rounded, thousandths = smallScaleSymbols.length+1;
        do {
            thousandths--;
            scale = Math.pow(0.001,thousandths);
            rounded = Math.round(num/scale);
        } while( rounded.toString().length>3 )
        return rounded+smallScaleSymbols[thousandths];
    }
    else if( num<1 && num.toString().length>=4 ) {
        return roundToSigFigs( num, 2 );
    }
    else if( num.toString().length>4 ) {
        return (num.toString().substr(0,4).match(/\./) ) ? roundToSigFigs( num, 3 ) : roundToSigFigs( num, 4 );
    }
    else return num;
}

function titleCase( word ) {
    word.toLowerCase();
    var W = word.charAt(0).toUpperCase();
    return W+word.substr(1);
}

function a_n( word ) {
    var let1 = word.charAt(0);
    return ( let1.match(/[aeiou]/i) ) ? 'an' : 'a';
}

var nameStartFor = {
    elf    : ['Ael','Aer','Af','Ah','Al','Am','Ama','An','Ang','Ansr','Ar','Ari','Arn','Aza','Bael','Bes','Cael','Cal','Cas','Cel','Cla','Cor','Cy','Dae','Dho','Dre','Du','Eil','Eir','El','Er','Ev','Fean','Fera','Fi','Fir','Fis','Gael','Gal','Gar','Gil','Glor','Ha','Hu','Ia','Il','Ja','Jar','Ka','Kan','Ker','Keth','Koeh','Kor','Ky','La','Laf','Lam','Leg','Lim','Lue','Ly','Mai','Mal','Mara','My','Na','Nai','Nim','Nu','Ny','Py','Raer','Re','Ren','Rhy','Ru','Rua','Rum','Rid','Sae','Seh','Sel','Sha','She','Si','Sim','Sol','Sum','Syl','Ta','Tahl','Tho','Ther','Thro','Tia','Tra','Ty','Uth','Ver','Vil','Von','Ya','Za','Zy'],
    dwarf  : ['B','Ba','Bal','Bel','Bi','Bo','Bom','Bro','Bul','Cal','Da','Dim','Do','Dol','Dru','Du',/*'Dw',*/'Dwa','Fa','Far','Fi','Fim','Flo','Fra','Fre','Fun','Ga','Gam','Gil','Gim','Glo','Gri','Gro','Gru','Ha','Her','I','Khi','Ki','Kil','Lo','Mi','Mor','Mun','Na','Nar','No','Nor','O','Rag','Sim','Sto','Tel','Tho','Thra','Thri','Thro'/*,'Thr'*/],
    goblin : ['Baa','Bog','Chiz','Fel','Ga','Gaz','Giz','Gob','Gor','Grip','Haz','Nib','Nu','Rag','Skee','Toov'],
    orc    : ['A','Bad','Balc','Bol','Gol','Gor','Grish','Grim','Gut','Lag','Lug','Mau','Mor','Morg','Mug','Muz','No','Og','Orc','Oth','Rad','Rot','Sha','Skab','Skar','Sna','Sni','Uf','Ug','Uz','Zod','Zog'],
    demon  : ['A','Ab','Ad','Ag','Ah','Am','And','Ar','As','Ash','Az','Ba','Be','Bel','Bi','Bo','Bol','Bu','Ca','Car','Cer','Cha','Ci','Cla','Cor','Cro','Cul','Cur','Dan','Dec','El','Flav','Fo','For','Fur','Ga','Gam','Gla','Gri','Gu','Ha','Hal','Hi','Hu','I','In','Ki','La','Ler','Li','Lu','Ma','Mal','Mam','Mar','Mas','Mel','Me','Meph','Mer','Mo','Mol','Mu','Na','Ne','Ni','O','Or','Pa','Pi','Pro','Prus','Pul','Pur','Ra','Ro','Ron','Ru','Sa','Sab','Sal','Se','Sha','She','Shi','Shu','Si','So','Sto','Su','Sur','Ta','Te','Tha','Ti','To','Tu','U','Ua','Va','Van','Ve','Vo','Vu','Vul','Xez','Ya','Za','Ze','Zi','Zo','Zu']
}
nameStartFor.elfbasic = nameStartFor.elfff = nameStartFor.elf;
var nameMiddleFor = {
    elf    : ['ad','ae','ael','aer','aias','ah','aith','al','ali','am','an','ar','ari','aro','as','ath','avel','brar','dar','deth','dre','drim','dul','e','ean','el','emar','en','er','ess','evar','fel','fin','hal','har','hel','ian','iat','ik','il','iel','im','in','ir','is','ith','kash','ki','lan','lam','lar','las','lian','lis','lon','lyn','mah','mil','mus','nal','nes','nin','nis','on','or','oth','que','quis','rah','rad','rail','ri','ria','ran','reth','ro','ruil','sal','san','sar','sel','sha','spar','tae','tas','ten','thal','thar','ther','thi','thus','ti','tril','ual','uath','us','van','var','vain','via','vin','wyn','ya','yr','yth','zair'],
    dwarf  : ['aim','ak','bun','bur','din','dri','fur','gar','gin','grim','il','in','kon','li','lin','m','min','munn','ni','num','ond','rak','r','ri','ril','rim','rin','rum','rund','til','tri','var','vi','vund','zad'],
    goblin : ['bik','bolt','git','hook','jik','kin','nat','nok','nuk','rek','rod','ruk','tek','thas','tot','zah','zak','zix'],
    orc    : [],	// no 3-syllable orc names
    demon  : ['a','al','ba','ber','bi','bo','ca','ci','cri','cu','de','dra','e','for','he','hri','i','la','lo','ma','mi','mo','mon','no','o','phe','phi','ra','ris','sag','sak','sal','si','so','sto','ta','za','ze','zi','zo','zu']
}
nameMiddleFor.elfbasic = nameMiddleFor.elfff = nameMiddleFor.elf;
var nameEndingFor = {
    elf    : ['ae','ael','aer','aias','ah','aith','al','ali','am','an','ar','ari','aro','as','ath','avel','born','brar','dar','del','deth','dre','drim','dul','ean','el','emar','en','er','ess','evar','fel','hal','har','hel','ian','iat','ik','il','iel','im','in','ir','is','ith','kash','ki','lan','lam','lar','las','lian','lis','lon','lyn','mah','mil','mus','nal','nes','nin','nis','on','or','oth','que','quis','rah','rad','rail','ria','ran','reth','ro','rond','ruil','sal','san','sar','sel','sha','spar','tae','tas','ten','thal','thar','ther','thi','thus','ti','tril','ual','uath','us','van','var','vain','via','vin','wyn','ya','yr','yth','zair'],
    dwarf  : ['aim','ak','bun','bur','din','dri','for','fur','gar','gin','grim','il','in','kon','li','lin','m','min','munn','ni','num','ond','rak','r','ri','ril','rim','rin','rum','rund','til','tri','var','vi','vund','zad'],
    goblin : ['bik','bolt','git','hook','i','il','ki','kin','nat','nok','nuk','rek','rod','ruk','thas','zah','zak','zix'],
    orc    : ['arg','bad','bag','bal','barg','bug','bul','dog','dreg','duf','dush','fim','fug','g','ga','gash','gog','gol','gor','gork','gorn','grat','grod','gul','hur','luk','meg','nak','nik','rod','runt','sog','thak','thug','wort','zod','zog','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],	// want many orc names to be monosyllabic
    demon  : ['al','as','ax','az','bas','beth','bia','bos','bub','bus','cas','chu','deus','eos','fax','fer','flas','for','fur','gat','gim','gin','go','gor','gos','grim','hem','ial','iel','im','in','is','ius','lar','lam','lan','laas','lech','les','let','lim','lion','lith','lor','lu','maa','mac','man','mon','moth','muz','nas','nos','nus','par','phar','phas','pes','pos','qel','ras','rax','ri','rim','rith','ris','ros','roth','sion','so','son','su','than','thin','thius','thym','tis','tius','tos','um','us','val','vol','vul','we','yal','zael','zal','zam','zan','zel','zex','zim','zir','zul','zum']
}
nameEndingFor.elfbasic = nameEndingFor.elfff = nameEndingFor.elf;
var familyNameEndingfor = {
    elf    : ['star','loft','deep','run'],
    dwarf  : ['duum','fik','heim','hig','holm','skagg','lum'],
    goblin : ['crag','rock'],
}
familyNameEndingfor.elfbasic = familyNameEndingfor.elfff = familyNameEndingfor.elf;
function makeNameFor( race ) {
    if( !nameStartFor.hasOwnProperty(race) ) return '';
	  var middleProbFor = {
			  elf    : 0.4,
 			  dwarf  : 0.1,
 			  goblin : 0.2,
 			  orc    : 0,
 			  demon  : 0.6
	  };
	  var pre  = nameStartFor[race][Math.floor(Math.random()*nameStartFor[race].length)];
	  var mid = '';
	  while( Math.random()<middleProbFor[race] ) {
	  	  mid += nameMiddleFor[race][Math.floor(Math.random()*nameMiddleFor[race].length)];
	  };
	  var end  = nameEndingFor[race][Math.floor(Math.random()*nameEndingFor[race].length)];
	  return pre+mid+end;
}
function makeFamilyNameFor( race ) {
    console.log("[makeFamilyNameFor]("+race+")")
  //  if( race=='dwarf' ) return ( makeNameFor( race ) + familyNameEndingfor[race][Math.floor(Math.random()*familyNameEndingfor[race].length)] ).toTitleCase();
    if( race=='dwarf' ) {
        var gndr = (ch.description.gender=='male') ? 'son' : 'daughter';
        if(ch.description.gender=='non') gndr = 'child';
        return ', ' + gndr + ' of ' + makeNameFor( race );
    }
  //  if( race=='dwarf' ) return makeNameFor( race ) + familyNameEndingfor[race][Math.floor(Math.random()*familyNameEndingfor[race].length)];
    if( race.match('elf') ) return ' ' + makeNameFor( race ) + familyNameEndingfor[race][Math.floor(Math.random()*familyNameEndingfor[race].length)];
    if( race=='orc' ) {
        var name = '';
        do { name = nameEndingFor[race][Math.floor(Math.random()*nameEndingFor[race].length)]; } while( !name )
        /*
        */
        return ' ' + name.toTitleCase();
    }
    return '';
}
var clanAdjectiveFor = {
    elf    : ['misty','green','hidden','white','blue','golden'],
    orc    : ['white','burning','red','black','yellow','bronze','iron','shattered']
};
clanAdjectiveFor.elfbasic = clanAdjectiveFor.elfff = clanAdjectiveFor.elf;
var clanNounFor = {
    elf    : ['forest','mountains','sea','lake','river'],
    orc    : ['hand','moon','ax','mountain','skull','cave','fang','claw','fist','rock','bone']
};
clanNounFor.elfbasic = clanNounFor.elfff = clanNounFor.elf;
function makeClanNameFor( race ) {
    if( race=='dwarf' ) return ' of ' + makeNameFor( race ) + familyNameEndingfor[race][Math.floor(Math.random()*familyNameEndingfor[race].length)];
    // if( race.match('elf') ) return ' of the ' + makeNameFor( race ) + familyNameEndingfor[race][Math.floor(Math.random()*familyNameEndingfor[race].length)];
    if( race=='orc' || race.match('elf') ) {
        var name = '';
        /*
        do { name = nameEndingFor[race][Math.floor(Math.random()*nameEndingFor[race].length)]; } while( !name )
        */
        name += ' of the ' + ( clanAdjectiveFor[race][Math.floor(Math.random()*clanAdjectiveFor[race].length)]
             + ' ' + clanNounFor[race][Math.floor(Math.random()*clanNounFor[race].length)] ).toTitleCase();
        return name.toTitleCase();
    }
    return '';
}

function inputLabelDisableToggle( inputID ) {
    // figure out structure of label/input pair (nested or not)
    // get handles for each
    var Input = $('#'+inputID);
    // toggle disabled state for input
    var stateToggle = ( $(Input).prop('disabled') ) ? false : true;
    $(Input).prop('disabled',stateToggle);
    // toggle grey state for label
}
function disableLabeledInput( inputID ) {
    // figure out structure of label/input pair (nested or not) and get handles for each
    var Input = $('#'+inputID);
    var Label;
    if( $('#'+inputID).parent().is('label') ) Label = $('#'+inputID).parent();
    else Label = $('label[for="'+inputID+'"]');
    // give disabled state to input and make label text grey
    $(Input).prop('checked',false);
    $(Input).prop('disabled',true);
    $(Label).css('color','grey');
}
function enableLabeledInput( inputID ) {
    // figure out structure of label/input pair (nested or not) and get handles for each
    var Input = $('#'+inputID);
    var Label;
    if( $('#'+inputID).parent().is('label') ) Label = $('#'+inputID).parent();
    else Label = $('label[for="'+inputID+'"]');
    // remove disabled state for input and remove grey state for label
    $(Input).prop('disabled',false);
    $(Label).css('color','');
}
function toggleRandomNaming( raceTemplateSelectElmt ) {
    let race = $(raceTemplateSelectElmt).val();
    if( Object.keys(nameStartFor).indexOf(race.toLowerCase())>=0 )
        {  enableLabeledInput("newCharRandomName"); }
    else
        { disableLabeledInput("newCharRandomName"); }
    if( race.match(/dwarf|elf|orc/i) )
        {  enableLabeledInput("newCharRandomFamilyName");  enableLabeledInput("newCharRandomClanName"); }
    else
        { disableLabeledInput("newCharRandomFamilyName"); disableLabeledInput("newCharRandomClanName"); }
}
function applyRaceSketch( raceTemplateSelectElmt ) {
    let race = $(raceTemplateSelectElmt).val();
    let gnd = $('input[name=newCharGender]:checked').val();
    let raceTpt = Templates[race];
    if( raceTpt && raceTpt.art ) {
        if( gnd!='male' && raceTpt.artX ) $('#newCharSketch').prop('src',raceTpt.artX);
        else $('#newCharSketch').prop('src',raceTpt.art);
    }
    else {  //console.log("[applyRaceSketch] no Template (human?); using gender "+gnd)
        $('#newCharSketch').prop('src','../images/'+gnd+'.gif');
    }
}

/* These shouldn't be used instead of the (no doubt much better) jQuery versions. */
function hasClass(el, name) {
    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
}
function addClass(el, name) {
    if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
}
function removeClass(el, name) {
    if (hasClass(el, name)) {
        el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
    }
}

/* Open Dialog Box ID Queue
  treat the 'open dialog IDs' queue this way so that you can conveniently change implementation of the queue if you want */
function pushIDontoOpenDboxQueue(id) {
    let openIDs = $('#dialogIDs').val();
    if( openIDs ) openIDs += ','+id;
    else openIDs = id;
    $('#dialogIDs').val(openIDs);
}
function popIDfromOpenDboxQueue() {
    let openIDs = $('#dialogIDs').val().split(',');
    // deal with zero-length array?
    let popID = openIDs.pop();
    $('#dialogIDs').val(openIDs.join(','));
    return popID;
}
function removeIDfromOpenDboxQueue(id) {  // this function is called sometimes (like by incrementZindex) to *check* if the ID is in the queue, and if so to remove it
    let openIDs = $('#dialogIDs').val();
    if( openIDs ) {
        openIDs = openIDs.split(',').filter( elmt => elmt!==id );
        $('#dialogIDs').val(openIDs.join(','));
    }
}

function setupDialog(boxID) {
    // console.log("setting up dialog "+boxID);
    // push box dialog ID onto "open" queue
    pushIDontoOpenDboxQueue( boxID );
    // put this box in front
    incrementZindex( boxID );
    // display this box
    document.getElementById( boxID ).style.display = 'block';
    // something happens when the box is closed...?

    // also assign listener to 'enter' key, activating (or replicating the behavior assigned to) the 'do it' button, whatever that might be
    // this would also need to be a (re)assignment thing, like escape key, since there are 30+ dialogs
}
function closeDialog(id) {
    removeIDfromOpenDboxQueue(id);
    $('#'+id).hide();
    return false;
}

function catchKeys(e) {
    switch( e.keyCode ) {
      //  case 13: enterSubmit(e);
        case 27: escapeClose(e);
        case 83: {
        		// is the command key (224) or the control key (
        }
    }
    // console.log('catchKeys fired:');
    // console.log(e);
}

function escapeClose(e) {
    let hideID = popIDfromOpenDboxQueue();
    $('#'+hideID).hide();
}
function enterSubmit(e) {
    // fire the callback function
    console.log("enterSubmit fired");
    let hideID = popIDfromOpenDboxQueue();
    $('#'+hideID).hide();
}

function synchronizeScrolling(divA, divB, divNo) {
    var div1 = $('#' + divA);
    var div2 = $('#' + divB);
    if (!div1 || !div2) return;
    var control = null;
    if (divNo == 1) control = div1;
    else if (divNo == 2) control = div2;
    if (control == null) return;
    else {
        div1.scrollLeft(control.scrollLeft());
        div2.scrollLeft(control.scrollLeft());
        div1.scrollTop(control.scrollTop());
        div2.scrollTop(control.scrollTop());
    }
}

function getAdjustmentsFor( target ) {
    var adjListObj = {};
    for( var x in Adjustments ) {
        var adjustmentItem = Adjustments[x];
        var targetORtokens = target.split('|');
        var targetRE = new RegExp('^'+targetORtokens.join('$|^')+'$', 'gi'); // alert(targetRE);
        if( adjustmentItem.target && adjustmentItem.target.match(targetRE) )
            adjListObj[x] = adjustmentItem;
    }
    return adjListObj;
}

function getAdjustmentsFrom( source ) {
    var adjListObj = {};
    for( var x in Adjustments ) {
        var adjustmentItem = Adjustments[x];
        var fromRE = new RegExp('^'+source+'$', 'gi'); // alert(fromRE);
        if( adjustmentItem.from && adjustmentItem.from.match(fromRE) )
            adjListObj[x] = adjustmentItem;
    }
    return adjListObj;
}

// returns a pgroup-structured Prerequisites tree
function structuredPrereqsFor( chPropObj ) {
    var ch = document.loadedCharacter;
    var structuredPrereqs = {};
    var alpha = 'abcdefghijklmnopqrstuvwxyz';
    var letters = alpha.split('');
    var li = 0;
    for( var pi in Prerequisites ) {
        var PrereqObj = Prerequisites[pi];
        var target = PrereqObj.target;
        if( chPropObj.key==target ) {   // console.log(chPropObj.key+' matches '+target);
            // check for specialization match (skill objects only, I think)
            if( PrereqObj.hasOwnProperty('targetSpec') && chPropObj.hasOwnProperty('specialization') ) {
                 if( PrereqObj.targetSpec!=chPropObj.specialization ) { continue; }
            }
           // console.log( JSONstring.make(PrereqObj)+"\n\n matches "+chPropObj.key+'; including');
            var pgroup = ( PrereqObj.hasOwnProperty( 'pgroup' ) ) ? PrereqObj.pgroup : letters[li++];
            if( !structuredPrereqs[pgroup] ) structuredPrereqs[pgroup] = [];
            structuredPrereqs[pgroup].push( PrereqObj );
        }
    }
    return structuredPrereqs;
}

function inGroup( itemKey, groupKey ) {
    if( Groups[groupKey].indexOf(itemKey)>=0 ) return true;
    else return false;
}

var AttributeCostFunction3e = function( levels ) {
         if( levels >=  8 ) return 100 + 25*(levels-7);
    else if( levels >=  6 ) return  60 + 20*(levels-5);
    else if( levels >=  4 ) return  30 + 15*(levels-3);
    else if( levels >= -1 ) return       10*levels;
    else if( levels == -2 ) return -15;
    else if( levels <  -2 ) return       10*(levels+1);
}

function incrementZindex( id ) {
    var z = sessionStorage.getItem('zdb');
    if( !z ) z = 10;
    var box = document.getElementById( id );
    if( !box ) return;
    if( box.style.zIndex==z ) return;
    z++;
    // console.log("[incrementZindex] setting "+id+" z-index to "+z);
    box.style.zIndex = z;
    // move this ID to top of escape queue
    removeIDfromOpenDboxQueue(id);
    pushIDontoOpenDboxQueue(id);
    // remember
    sessionStorage.setItem('zdb',z)
}

function toggleTraitExpansion(event,tkey,m) {   // console.log(tkey)
    // toggle direction of chevron
    if( $('#chev_'+tkey).hasClass('closed') ) $('#chev_'+tkey).removeClass('closed')
    else $('#chev_'+tkey).addClass('closed');
    // toggle boolean 'expand'
    // console.log("ch.getTrait("+tkey+","+m+")");
    let chtrait = ch.getTrait(tkey,m);
    // console.log(chtrait);
    chtrait.expand = !chtrait.expand;
    // catch bubbling event
    event.stopPropagation();
    buildCombinedTraitsTable(ch);
    hidePopupList();

}

/* Cookies */
// If I want to save JSON-stringified character objects in cookies, I'll have to encode my JSON further.
// Cookies are semicolon-delimited, and the storer doesn't seem to like brackets either.
/* As with the class functions above, jQuery does these much better anyway. */
function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
function getCookie( name ) {
    //if( window.console && reportLevel ) { console.log("in getCookie, document.cookie is "+document.cookie); }
    var ca = document.cookie.split('; ');
    if( window.console && reportLevel ) { console.log("in getCookie, document.cookie contains\n  "+ca.join("\n  ")); }
    for( var i=0; i < ca.length; i++ ) {
        var c = ca[i];
        var matches = c.split('=');
        //if( window.console && reportLevel ) { console.log("in getCookie, matches is '"+matches); }
        if( matches[0]==name ) return matches[1];
    }
    return null;
}
function deleteCookie(name) {
    setCookie(name,"",-1);
}
function alterCookie( name, key, value ) {
    var cookieVal = getCookie(name);
}
/*  Do I use these cookie functions anywhere?
    Looks like just one place: in the openCharacterDialog() function,
    which is not being used either, I think. */

/*  initializeSheet
  This function is called at the bottom of the markup for each character sheet page document.
  It runs several tests, and initializes the loaded character. Display prefs are no longer set here.
  As prefs are now associated with the Character object; this is now dealt with by loadCharacter().
*/
function initializeSheet() {
    // if( window.console && reportLevel )
    //     console.log('[initializeSheet] type of loadedCharacter object is '+typeof(document.loadedCharacter)+' (timestamp: '+(new Date().getTime())+')');
   // console.log("[initializeSheet] adding 'ready' class to #open_new_"+sheet+"_sheet_link navbar item");
    document.undoIndex = 0;
    document.undoQueue = [];
    // let reportLevel = 1;
    if( typeof document.loadedCharacter=='undefined' ) {
        if( !Storage ) alert("HTML5 Web Storage is not suppported by this browser.\nUnsaved character data will be vulnerable to accidental refreshes, etc.  Save frequently!");
       // var ch;

        // do a try-catch to get the cached ID and use it
        try {
            var cachedID = sessionStorage.getItem('cachedCharacterID') /*'rQNYVXckqxuL'*/;
            if( window.console && cachedID && reportLevel ) { console.log('[initializeSheet] cached ID '+cachedID+' in sessionStorage for a stored character; retrieving...'); }
            // console.log( sessionStorage.getItem( cachedID ) );
            ch = newCharacterFromJSON( sessionStorage.getItem( cachedID ) );
            if( window.console && reportLevel ) { console.log('[initializeSheet] loaded '+ch.description.name+' from sessionStorage (timestamp: '+(new Date().getTime())+')'); }
//             var library = ( !libraryList && ch && ch.gameInfo.ruleset=='e3' )
//                         ? 'basic3e_library.js'
//                         : 'basic4e_library.js'
//             $.getScript('libraries/'+library).done( function() { loadCharacter( ch, null ); } );   // Bare code in the chosen library file is run when this is done;
            doOnloads();
            loadCharacter( ch, null );    // remove if the $.getScript() above is re-instated
            return;
        } catch(e) {
            console.log("[initializeSheet] error loading file from sessionStorage:\n\t"+e);
        }
        // once here, there is no cached character - also no loaded library, so we have to work from sheet type
        if( window.console /*&& reportLevel*/ ) { console.log('[initializeSheet] no cached ID match; instantiating a new Character object'); }
        if( sheet.match(/3e/) ) { rules = 'e3'; TL = 3; library = 'basic3e_library.js' }
        else                    { rules = 'e4'; TL = 7; library = 'basic4e_library.js' }
        ch = new Character('New Character',100,rules,TL);  // this assumes a library is already loaded; ruleset and defaultTL vars are set there
      //  console.log("[initializeSheet] new character gender: "+ch.description.gender);
        var gender = ( Math.random()>0.5 ) ? 'male' : 'female';
      //  console.log("[initializeSheet] randomized gender: "+gender);
        ch.gender(gender);    // definitely use this; it affects ch.desc.gender, ch.desc.artPath, and (later?) ch.desc.height/weight all at once

        if( window.console /*&& reportLevel*/ ) { console.log('[initializeSheet] loaded '+ch.description.name+' (timestamp: '+(new Date().getTime())+')'); }
        // loadCharacter cannot be placed here, or the getScript above may be executed asynchronously with it.
        // If the Character object contains any customized objects that are copied into library objects by loadCharacter, they would then be OVERWRITTEN when the library is loaded.
    }
    else { alert("there is already a loaded Character?"); }
    doOnloads();
    loadCharacter( ch, null );
}


/*---------------------------- Menu bar functions ----------------------------*/

function genericDialog() {
    setupDialog('genericDialog');
}
function genericDialogCallback() {
    console.log("[genericDialogCallback] fired")
    return false;
}

function newCharacterDialog(rs) {
   // document.getElementById('newCharTL').innerHTML = makeNumberOptions( 0, 15, '            ', 2 );
    var ruleset = (rs) ? rs : ch.gameInfo.ruleset;
    // add notice (with specified ruleset) to Random Character Generation text
    $('#charGenRulesetReset').html('Ruleset will be set to <b><i>'+window.libraryName+'</i></b> (the active ruleset).');
   // var TechLevelOptionsList = (ruleset.match(/e3/)) ? TechLevelOptionsList3e : TechLevelOptionsList4e;
    var ptsLimit = (ruleset.match(/e3/)) ? 40 : Math.floor($('#newCharPoints').val()/2);
    $('#newCharDisadPointsLimit').val(ptsLimit);
    $('#chosenSketch').val('');
    document.getElementById('newCharRuleset').innerHTML
        = "\n              "
        + makeSelectListOptions( RulesetOptionsList, ruleset ).join("\n              ")
        + "\n            ";
    document.getElementById('newCharTL').innerHTML
        = "\n              "
        + makeSelectListOptions( TechLevelOptionsList, ch.gameInfo.TL ).join("\n              ")
        + "\n            ";
    var genderRand = 10*Math.random();
    var gnd = ( genderRand<1 ) ? 'non' : ( genderRand<5 ) ? 'female' : 'male';   // console.log("[newCharacterDialog] randomly-generated gender: "+gnd);
    $('#newCharSketch').prop('src','../images/'+gnd+'.gif');
    $('input[type=radio]').val([gnd]);
		if( $('#newCharRaceTemplate').html() ) {
		    let raceKey = $('#newCharRaceTemplate').val();
		    let raceTpt = Templates[raceKey];
		    if( raceTpt && raceTpt.art ) {
		        // console.log("[newCharacterDialog]\n\t gender=='male'? "+(gnd=='male')+"\n\t Template.artX? "+raceTpt.artX);
            if( gnd!='male' && raceTpt.artX ) $('#newCharSketch').prop('src',raceTpt.artX);
            else $('#newCharSketch').prop('src',raceTpt.art);
		    }
		}
		else {		// do this so that selections stick
		    var templateOpts = ['','<option value="human">human</option>'];
		    for( var t in Templates ) {
		        let Tmplt = Templates[t]
		    		if( t.match(/_/) || Tmplt.meta ) continue;
		    		templateOpts.push('<option value="'+t+'">'+Tmplt.name+'</option>');
		    }
		    templateOpts.push('');
		    $('#newCharRaceTemplate').html( templateOpts.join("\n                  ") );
		}
    // random character form elements
    var charTypes = Object.keys( CharacterTypes );
    var selectedType = $('#newCharType').val();
    var charTypeOptsHTML = [];
    for( var k=0; k<charTypes.length; k++ ) {
        var type = charTypes[k];
        var sltd = (type==selectedType) ? 'selected="selected"' : '';
        charTypeOptsHTML.push('<option value="'+type+'"' +sltd+'>'+type.replace(/_/g,' ').toTitleCase()+'</option>');
    }
    document.getElementById('newCharType').innerHTML
        = "\n                          " + charTypeOptsHTML.join("\n                          ") + "\n                        ";
    //document.getElementById('newCharRandomName').disabled = true;
    toggleRandomNaming( $("#newCharRaceTemplate") );
    setupDialog('newCharDialog');
    return false;
}

function loadNewCharacterFromDialog() {
   // alert('in loadNewCharacterFromDialog, Character starts as '+ch.description.name);
    // get form value(s)
    var charName =   document.getElementById('newCharName').value || 'New Character';
    var points   = 1*document.getElementById('newCharPoints').value;
    var ruleset  =   document.getElementById('newCharRuleset').value;
    var tl       = 1*document.getElementById('newCharTL').value;
    var disadLim = 1*document.getElementById('newCharDisadPointsLimit').value;
    var quirkLim = 1*document.getElementById('newCharQuirkPointsLimit').value;
    var gender   =   $("input[name=newCharGender]:checked").val();
    var sketch   =   $('#chosenSketch').val();

    // check points input
    if( isNaN(points) ) {
        alert("'Point Value' must be a number");
        return;
    }

    // save current Character, if there is one (what if the current Character is the same as the selected Character?)
   // if( ch ) { ch.store(); }

   // alert('in loadNewCharacterFromDialog, Character has been saved');

    /* instantiate new Character */
    var ch = new Character( charName, points, ruleset, tl );
    // console.log("[loadNewCharacterFromDialog] brand-new character");
    ch.gameInfo.disadPointsLimit = disadLim;
    ch.gameInfo.quirkPointsLimit = quirkLim;
    ch.gender(gender);

    /* apply any race template */
    var raceTemplateKey = $('#newCharRaceTemplate').val();
    if( !raceTemplateKey.match(/human/i) ) {
    		applyTemplate( raceTemplateKey, ch );
    }

    /* apply chosen sketch, if any */
    if( sketch ) ch.description.artPath = "../images/lineart/"+sketch;

    /* give new 4e characters a native language and culture
    if( ruleset.match(/4/) ) {
        ch.traits.push( new Trait('home','A','M',0,false,'USER') );
        ch.traits[0].key = 'CulturalFamiliarity';
        ch.traits[0].description = 'native';
        ch.traits.push( new Trait('native','A','M',-1,true,'USER') );
        ch.traits[1].key = 'Language';
        ch.traits[1].description = 'Spoken';
        ch.traits[1].levelNames = ["Native","Literate","Semi-Literate","[Illiterate]"];
        ch.traits[1].highestLevel = 3;
        ch.traits[1].lowestLevel = 0;
        ch.traits[1].levels = 0;
        ch.traits.push( new Trait('native','A','M',-1,true,'USER') );
        ch.traits[2].key = 'Language';
        ch.traits[2].description = 'Written';
        ch.traits[2].levelNames = ["Native","Literate","Semi-Literate","[Illiterate]"];
        ch.traits[2].highestLevel = 3;
        ch.traits[2].lowestLevel = 0;
        ch.traits[2].levels = 0;
    }*/
    /* give new 3e characters a native language
    if( ruleset.match(/3/) ) {
        var langskl = new Skill('native','IQ',1,'USER');
        ch.skills.push( langskl );
        ch.skills[0].key = 'Language';
        ch.skills[0].description = 'native language';
    }*/

    /* 'random' character generation */
    var chGen = ( document.getElementById('characterGenerationFormWrapper').style.display!='none' ) ? true : false;
    if( chGen ) {
        ch.gameInfo.ruleset = window.ruleset;   // avoid incompatibilities with loaded library
        var charType = $("#newCharType").val();
        var charTemplate = CharacterTypes[charType];
       // alert(JSONstring.make(charTemplate));
        if( $("#newCharRandomGender").prop('checked') ) { console.log('randomize gender'); ch.gender( (Math.random()>0.5) ? 'female' : 'male' ); console.log("ch.gender() : "+ch.gender()); }
        /* attributes */
        var atts = ['ST','DX','IQ','HT'];
        var minStat = 7;
        var availPts = points - ch.totalPoints();     // so here, ch.totalPoints() should be zero, thus availPts = points
        let attCap = $("#newCharAttCapAmount").val();
        if( !$("#newCharAttCap").prop('checked') ) attCap = false;
        let statsPtLimit = ( attCap ) ? attCap : 0.75*availPts;   // stats should use most of available points, unless capped (after template cost; skills will be offset by disads)
        var statBump = (ch.gameInfo.ruleset.match(/3/))
                     ?  Math.floor(statsPtLimit/50)
                     :  Math.floor(statsPtLimit/75);
        var statsPtCost = 0;
        var stats = {};		// was just setting = charTemplate.attributes, but that made a POINTER, which was saving my values from one call to the next.
      //  alert("at declaration, stats:\n"+JSONstring.make(stats)+",\n stats points: "+statsPtCost);
        for( var i=0; i<4; i++ ) {    // assign starting values for main attribute stats, adjusted for point total, and some randomness
            var att = atts[i];
            stats[att] = charTemplate.attributes[att];
            var attStatVar = Math.floor( polarBoxMuller() );    // Gauss (normal, 1 st. dev.)
            /* stats object vs ch.attributePoints
              My technique here was to build a stats object, then after it was built, to reverse
              engineer from it the points to be put into ch.attributePoints.  This backfires
              when a racial template is involved, as I *start* by using ch[att](), which gives
              the calculated values for each stat *taking racial template into account*.
              So for an Orc, IQ-2 and HT+2 appear at the beginning, and are built into the points,
              but are then applied *again, after* points (or outside of points).
              So should I just use '10' instead of ch[att]() at the beginning?
            */
          //  console.log("setting "+att+" = "+10+"+"+stats[att]+"+"+statBump+"+"+attStatVar);
          //  alert("setting "+att+" = "+10+"+"+stats[att]+"+"+statBump+"+"+attStatVar);
            stats[att] += 10 + statBump + attStatVar;            // adjust template values for points and randomness
            if( stats[att]<minStat ) stats[att] = minStat;
            statsPtCost += attLevel2Pts( stats[att], att );
        }   // AFTER THIS POINT, stats[att] are actual stats (avg 10), not just the variances stored in the charTemplate.
        //console.log("after initialization, stats:\n"+JSONstring.make(stats)+",  stats points: "+statsPtCost);
        //console.log("ch.gender() : "+ch.gender());
        if( ch.gender()=='female' && $("#newCharGenderLens").prop('checked') ) {
            stats['ST']--; stats['HT']++;
          //  console.log("nudged stats for female gender (ST-1, HT+1)");
            console.log("after gender lens, stats:\n"+JSONstring.make(stats)+",  stats points: "+statsPtCost);
        }
      //  console.log("after initialization, ch.attributePoints:\n"+JSONstring.make(ch.attributePoints));
        var wtdStatsArr = makeWeightedKeysList(charTemplate.attributes);
        while( statsPtCost<statsPtLimit ) {
          	var p = Math.floor(wtdStatsArr.length*Math.random());
            var att = wtdStatsArr[p];
            //console.log("chose stat "+p+" ["+att+"] for bump, from list ("+wtdStatsArr+")");
            var oldStatPts = attLevel2Pts( stats[att], att );  // console.log('oldStatPts: '+oldStatPts);
          //  stats[att] = stats[att] + Poisson(1);
            if(stats[att]) {stats[att]++} else {stats[att]=1};
            var newStatPts = attLevel2Pts( stats[att], att );  // console.log('newStatPts: '+newStatPts);
            statsPtCost += newStatPts - oldStatPts;
          //  alert('stats points: '+statsPtCost+"\n stats: "+JSONstring.make(stats));
            if(newStatPts-oldStatPts) console.log("bumped "+att+" to "+stats[att]);
        }
        /*  * A different way to pick which attribute gets bumped:
            Create a weight system this way:  stats that are higher get twice as many chances to be chosen for each increment from baseline.
            Stats that are reduced either get half as many chances (if they are at an even number) or cause all other stats to get doubled,
            again once for each increment from baseline.  An example:
            Brick gets ST +3, IQ -2, and HT +1.
            Start with each getting one chance (out of 4).  ST gets doubled 3 times to 8 chances, so now there are 11 altogether,
            with ST accounting for 8 of them.  IQ is reduced by 2, and currently has only 1 chance, so we double all the others twice;
            now ST has 32, DX has 4, HT has 4 and IQ has 1 chance (for a total of 41).
            Finally HT gets a +1, so double its chances to 8.
            Final situation: ST has 32, IQ has 1, DX has 4, and HT has 8, for a total of 45.
            Then when picking randomly among the stats, ST has a 32/45 chance, IQ a 1/45 chance, DX a 4/45 chance, and HT an 8/45 chance of being bumped.
        */
      //  console.log("after stat building, stats:\n"+JSONstring.make(stats)+",\n stats points: "+statsPtCost);
      //  console.log("after stat building, ch.attributePoints:\n"+JSONstring.make(ch.attributePoints));
      //  console.log(JSONstring.make(stats));
      //  console.log(statsPtCost+' points');
        for( var stat in stats ) {    // interpret stats as points and place in ch.attributePoints object
            var statLvl = stats[stat];
            ch.attPoints( stat, attLevel2Pts( statLvl, stat ) );
        }
      //  console.log("after assigning points from stats to ch, stats:\n"+JSONstring.make(stats)+",\n stats points: "+statsPtCost);
      //  console.log("after assigning points from stats to ch, ch.attributePoints:\n"+JSONstring.make(ch.attributePoints));
       // alert("ST is "+ch.ST()+", height is "+ch.height()+", (unmodified) weight is "+ch.weight());
        /* random adjustments to height & weight */
      //  console.log("height starting at "+ch.height());
        ch.height( ch.description.height + Math.round(2*polarBoxMuller()) );
      //  console.log("height after Box-Muller: "+ch.height());
      //  console.log("weight starting at "+ch.weight());
        var WtStDev = weightSDbyST[ch.ST()];
        ch.weight( ch.description.weight + Math.round(WtStDev*polarBoxMuller()) );
      //  console.log("weight after Box-Muller: "+ch.weight());

        /* disads */
        var tmpltDisads = charTemplate.disads.slice(0);
        do {
            if( tmpltDisads.length==0 ) { /* iterating may well use up all possibilities in template */
                console.log("disad list exhausted");
                break;
                // could do an 'if-else' here and look at whole list when template is empty
            }
            // pick one from template
            var ri = Math.floor( tmpltDisads.length*Math.random() );
            var di = tmpltDisads[ri];
            console.log("will try to attach disad "+ri+", '"+di+"'");
            tmpltDisads.splice(ri,1);   // remove this disad from template to avoid duplication
            var newTraitObject = Traits[di].clone();
            console.log("is the (base) value of "+newTraitObject.name+" more than the points left for disadvantages?\n"+(-newTraitObject.cost)+">"+disadLim+"+"+ch.disadsPoints());
            if( -newTraitObject.cost>disadLim+ch.disadsPoints() ) {  /* this condition may create infinite loops */
                console.log("'"+newTraitObject.name+"' exceeds disad limit.");
                continue;                // don't attach this one
            }
            if(newTraitObject.hasOwnProperty('description') && newTraitObject.description==true ) newTraitObject.description = '';
            // deal with levels
            if( newTraitObject.hasLevels ) {
               // newTraitObject.levels = Math.abs( Math.floor( polarBoxMuller() ) );   // zero is most common level this way
               // newTraitObject.levels = Poisson(1)+1;
                newTraitObject.levels = Math.abs( Math.floor( polarBoxMuller() ) ) + 1;
                if( newTraitObject.hasOwnProperty('highestLevel') && newTraitObject.levels>newTraitObject.highestLevel )
                    newTraitObject.levels = newTraitObject.highestLevel;
                // now should check to see if this many levels causes the Trait to be too expensive
                // use a while loop?  // should be OK to decrement levels until cost is low enough; a single level was already found to be acceptable
                while( -newTraitObject.finalCost()>disadLim-ch.disadsPoints() )  // should be comparing two positives
	              { newTraitObject.levels-- }
            }
            // deal with group conflicts
            if( newTraitObject.hasOwnProperty('group') && ch.hasTraitGroup(newTraitObject.group) ) {
                console.log("'"+newTraitObject.group+"' group is already represented.");
                tmpltDisads.splice(ri,1);
                continue;
            }
            if(newTraitObject.hasOwnProperty('multiple') ) newTraitObject.multiple = 1;
            // mods
            if( newTraitObject.hasOwnProperty('mods') ) {
                var mods = newTraitObject.mods.split(/,\s*/);
                for( var i=0; i<mods.length; i++ ) {
                    var modArray = Modifiers[mods[i].replace(/\W+/g,'')];   // this is a 2-level nested array
                    var rqdModsAr = [];
                    for( var j=0; j<modArray.length; j++ ) {
                        var subModAr = modArray[j];
                        if( mods[i].match(/phobia/i) ) {
                            rqdModsAr.push(subModAr);
                            continue;
                        }
                        for( var k=0; k<subModAr.length; k++ ) {
                            if( subModAr[k].hasOwnProperty('required') ) {
                                rqdModsAr.push(subModAr);
                                break;
                            }
                        }
                    }
                    for( var n=0; n<rqdModsAr.length; n++ ) {
                        var rqdModAr = rqdModsAr[n];
                        var modLevel = Math.min( Poisson(1), rqdModAr.length-1 );
                        if(mods[i].match(/phobia/i)) modLevel = Math.floor( rqdModAr.length*Math.random() );
                        var modItem = rqdModAr[rqdModAr.length-modLevel-1];   // actual chosen modifier object (e.g., "Self-control: Resist fairly often")
                       // alert(JSONstring.make(modItem));
                        // what to do about modifiers (e.g. Battle Rage) that are not required?  You can tell them apart, btw
                        var modsArrayType;
                        switch( modItem.type ) {
                          case 'constantMod':
                            modsArrayType = 'ConstantModsArray';
                            break;
                          case 'enhanceLimit':
                            modsArrayType = 'EnhLimsArray';
                            break;
                          case 'multiplier':
                            modsArrayType = 'MultipliersArray';
                            break;
                        }
                        if( !newTraitObject.hasOwnProperty(modsArrayType) ) { newTraitObject[modsArrayType] = []; }
                      //    alert(newTraitObject.name+" takes mods: "+newTraitObject.mods
//                                +",\n taking level "+modLevel+":\n"
//                                +modItem);
                        newTraitObject[modsArrayType].push( { text: modItem.text, value: eval(modItem.mod) } );
                    }
                }
                // now should check to see if this set of mods causes the Trait to be too expensive
                // use a while loop?  // this is the levels code; figure out a good version for mods (hard?)
              //  while( -newTraitObject.finalCost()>disadLim+ch.disadsPoints() )
	            //  { newTraitObject.levels-- }
            }
            // check points against disad limit
          //  console.log(newTraitObject);
          //  console.log("point value for "+newTraitObject.name+": "+newTraitObject.finalCost());
            ch.traits.push( newTraitObject );
          //  alert(ch.firstName()+" disad total: "+ch.disadsPoints());
        } while( -ch.disadsPoints()</*0.75**/disadLim || ch.traits.length<3 );
      //  alert("after disads, character point value is "+ch.totalPoints());

        /* advantages */
        // do while( points left )
        //    pick an ad (use weights, list from charTemplate)
        var ptBuffer = (points>100) ? 0.25*points : 25;		// THIS controls what portion of points are spent on advantages (and thus on skills)
        console.log("is "+ch.totalPoints()+" < "+points+"-"+ptBuffer+"?");
        var newTraitObject;
        var adTotalPoints = ch.advantagesTotalPoints();
        var reqdAds = charTemplate.hasOwnProperty('requiredAds');
        console.log("is "+adTotalPoints+" < 0.5*"+disadLim+"?");
        if( adTotalPoints<0.5*disadLim || reqdAds ) {
        	  var tmpltAds = charTemplate.ads.slice(0);   // console.log("template ads: "+tmpltAds);
        	  var tmpltRequiredAds = ( reqdAds ) ? charTemplate.requiredAds.slice(0) : [];   console.log("template required ads: "+tmpltRequiredAds);
		        while( ch.totalPoints()<(points-ptBuffer) || reqdAds ) {   // how does this condition interact with the adTotalPoints<0.5*disadLim condition above it?
		        	  var ad;
		        		if( reqdAds ) {
		        		  //  console.log("before pop:");
		        		  //  console.log(tmpltRequiredAds);
				            ad = tmpltRequiredAds.pop(); // console.log('popped '+ad+' from required Ads array');
		        		  //  console.log("after pop:");
		        		  //  console.log(tmpltRequiredAds);
		            }
		            else if( tmpltAds.length ) {
		        		  //  console.log(tmpltAds);
				            var ri = Math.floor( tmpltAds.length*Math.random() );
				            ad = tmpltAds[ri];  console.log('picked '+ad+' from Ads array');
				          //  if( ad.match(/talent/i) ) continue;   // what's this for?  rando, I suppose
		            }
		            else {
		                console.log("advantage list exhausted");
		                break;
	              }
                console.log("about to try to clone "+ad);
                newTraitObject = Traits[ad].clone();
              //  console.log(newTraitObject);
                if( !newTraitObject.multiple ) {    // remove this ad from template to avoid duplication, unless it can be taken multiple times
                    if( !reqdAds ) console.log("splicing out "+tmpltAds.splice(ri,1));   // unless it's a required Ad; in that case it's been popped off already
                    // and keep the newTraitObject, unless it has a group conflict (next)
                }
		            if( tmpltRequiredAds.length==0 ) reqdAds = false;
                // deal with group conflicts
                if( newTraitObject.hasOwnProperty('group') && ch.hasTraitGroup(newTraitObject.group) ) {
                    console.log(newTraitObject.name+" is in the "+newTraitObject.group+" group; we have one already")
                    console.log("'"+newTraitObject.group+"' group is already represented.");
                    continue;   // toss the newTraitObject
                }
              //  console.log('made it past the groups filter');
              //  if( newTraitObject.cost>20 || !newTraitObject.exoticSprntl.match(/mundane/i) ) continue;  // can't filter this way with mages
		          //  console.log("[loadNewCharacterFromDialog] will try to attach advantage '"+newTraitObject.name+"'");
		          //  alert("will try to attach advantage '"+newTraitObject.name+"'");
		            // deal with levels
		            if( newTraitObject.hasLevels ) {
		              //  alert("levels for '"+newTraitObject.name+"'");
		                let pbmConst = (newTraitObject.name=='Magery') ? 10 : 6;
		                newTraitObject.levels = Math.abs( Math.floor( (10/newTraitObject.cost)*polarBoxMuller() ) ) + 1;
		                if( newTraitObject.hasOwnProperty('highestLevel') && newTraitObject.levels>newTraitObject.highestLevel )
		                    newTraitObject.levels = newTraitObject.highestLevel;
		            }
		          //  alert("mods for '"+newTraitObject.name+"'?\n"+JSONstring.make(newTraitObject));
		            // mods?
		            if( newTraitObject.hasOwnProperty('mods') ) {
		                console.log(newTraitObject.name+" takes mods; getting some");
		                var mods = newTraitObject.mods.split(/,\s*/);
		                for( var i=0; i<mods.length; i++ ) {
		                    console.log("[random character] getting mod "+(i+1)+": Modifiers["+mods[i].replace(/\W+/g,'')+"]");
		                    var modArray = Modifiers[mods[i].replace(/\W+/g,'')];   // modArray is a 2-level nested array
		                    console.log(modArray);
		                    var rqdModsAr = [];
		                    for( var j=0; j<modArray.length; j++ ) {
		                        var subModAr = modArray[j];
		                        if( mods[i].match(/phobia/i) ) {
		                            rqdModsAr.push(subModAr);
		                            continue;
		                        }
		                        for( var k=0; k<subModAr.length; k++ ) {
		                            if( subModAr[k].hasOwnProperty('required') ) {
		                                rqdModsAr.push(subModAr);
		                                break;
		                            }
		                        }
		                    }
		                    for( var n=0; n<rqdModsAr.length; n++ ) {
		                        var rqdModAr = rqdModsAr[n];
		                        var modLevel = Math.min( Poisson(1), rqdModAr.length-1 );
		                        var modItem = rqdModAr[rqdModAr.length-modLevel-1];   // actual chosen modifier object (e.g., "Self-control: Resist fairly often")
		                       // alert(JSONstring.make(modItem));
		                        // what to do about modifiers (e.g. Battle Rage) that are not required?  You can tell them apart, btw
		                        var modsArrayType;
		                        switch( modItem.type ) {
		                          case 'constantMod':
		                            modsArrayType = 'ConstantModsArray';
		                            break;
		                          case 'enhanceLimit':
		                            modsArrayType = 'EnhLimsArray';
		                            break;
		                          case 'multiplier':
		                            modsArrayType = 'MultipliersArray';
		                            break;
		                        }
		                        if( !newTraitObject.hasOwnProperty(modsArrayType) ) { newTraitObject[modsArrayType] = []; }
		                          // alert(newTraitObject.name+" takes mods: "+newTraitObject.mods
		                          //       +",\n taking level "+modLevel+":\n"
		                          //       +modItem);
		                        newTraitObject[modsArrayType].push( { text: modItem.text, value: modItem.mod } );
		                    }
		                }
		            }
		            ch.traits.push( newTraitObject );
		            //ch.attachTrait( newTraitObject );
		          //  console.log("is "+ch.totalPoints()+" < "+points+"-"+ptBuffer+"?");
		        } // points remaining loop
        } // disadLim branch

      //  alert("after ads, character point value is "+ch.totalPoints());

        /* equipment
            Filters now in place in the libraries will pre-filter for 'constant' things like weight.
            Other criteria should be filtered here, as they will vary for characters.
            ST, cost (should vary by TL - use Starting Wealth?), etc.
        */
        // weapons
        var tmpltWeapons = charTemplate.weapons.slice(0);  // makes a clone of the Template weapons array
        // console.log(tmpltWeapons);
        for( var v=0; v<charTemplate.wpnNum; v++ ) {
            var wi = Math.floor( tmpltWeapons.length*Math.random() );
          //  alert("choosing weapon "+wi+" from ("+tmpltWeapons+")");
            if( !tmpltWeapons[wi] ) { alert("no appropriate weapons found in library"); break; }
            var wp = tmpltWeapons[wi];
            tmpltWeapons.splice(wi,1);
          //  if( Math.random()>1/(ch.weapons.length+1) ) continue;
            console.log("will try to take "+wp);
            var Weapon = Weapons[wp].clone();
            console.log(Weapon);
            if( !ch.hasSTforWeapon( Weapon ) ) { console.log('rejecting '+wp+'; required ST too high'); v--; continue; }
            if( Weapon.TL>ch.gameInfo.TL || (Weapon.maxTL && Weapon.maxTL<ch.gameInfo.TL) ) { console.log('rejecting '+wp+'; TL ('+Weapon.TL+') wrong'); v--; continue; }   // redo this loop iteration if TL is too low or high
            if( Weapon.cost>ch.gameInfo.startingWealth*charTemplate.wpnBudg ) { console.log('rejecting '+wp+'; too expensive'); v--; continue; }
            Weapon.number = 1;
            if( Weapon.hasOwnProperty('weaponST') ) Weapon.weaponST = ch.ST();
            ch.weapons.push( Weapon );
            ch.collections.default.push( Weapon );
        }
        // shield
        var tmpltShields = charTemplate.shields.slice(0);  // makes a clone of the Template shield array
      //  console.log(tmpltShields);
        var taken = 1;
        for( var v=0; v<charTemplate.sldNum; v++ ) {
            if(ch.gameInfo.TL>4) { break; }
            var si = Math.floor( tmpltShields.length*Math.random() );
            if( !tmpltShields[si] ) { /*alert("no appropriate shield available");*/ break; }
            var sh = tmpltShields[si];
            tmpltShields.splice(si,1);
          //  if( Math.random()>0.5 ) continue;
          //  console.log("will try to take "+sh);
            var Shield = ShieldItems[sh].clone();
            if( Shield.TL>ch.gameInfo.TL || (Shield.maxTL && Shield.maxTL<ch.gameInfo.TL) ) { console.log('rejecting '+sh+', TL ('+Shield.TL+') wrong'); v--; continue; }   // redo this loop iteration if TL is too low or high
            Shield.number = 1;
            ch.equipment.push( Shield );
            ch.collections.default.push( Shield );
            taken++;
        }
        // armor
        var tmpltArmor = charTemplate.armor.slice(0);  // makes a clone of the Template armor array
        console.log(tmpltArmor);
        var taken = 1;
        var suit = false;
        var armorNum = charTemplate.armNum;
        if( armorNum>0 && armorNum<1 ) { armorNum = ( Math.floor( Math.random()/(1-armorNum) )==0 ) ? 0 : 1; }
        for( var v=0; v<armorNum; v++ ) {
            var ai = Math.floor( tmpltArmor.length*Math.random() );
            if( !tmpltArmor[ai] ) { alert("no appropriate armor found in library"); break; }
            var ar = tmpltArmor[ai];
            tmpltArmor.splice(ai,1);
          //  if( Math.random()>0.5*tmpltArmor.length ) continue;
            console.log("will try to take "+ar);
            var Armor = ArmorItems[ar].clone();
            if( Armor.TL>ch.gameInfo.TL || (Armor.maxTL && Armor.maxTL<ch.gameInfo.TL) ) { console.log('rejecting '+ar+', TL ('+Armor.TL+') wrong'); v--; continue; }   // redo this loop iteration if TL is too low or high
            if( Armor.cost>ch.gameInfo.startingWealth*charTemplate.armBudg ) { console.log('rejecting '+ar+'; too expensive'); v--; continue; }
            if( ar.match(/suit/i) || (Armor.detail && Armor.detail.match(/suit/i)) ) suit = true;
            Armor.number = 1;
            ch.equipment.push( Armor );
           if( taken==1 ) ch.collections.default.push( 'wear' );   // wear the first armor
            ch.collections.default.push( Armor );
            taken++;
        }
        // clothing - see B4E266
        if( !ch.gameInfo.ruleset.match(/lite/) ) {
            var status = ch.status();
            var Clothes = {};
            console.log("[newchar] get some clothes, ruleset is "+ch.gameInfo.ruleset+", status is "+status);
            if( ch.gameInfo.ruleset.match(/4/) ) {
                if( status<0 ) status = (status==-1) ? '_1' : '_2';
                console.log("[newchar] getting ClothingStatus"+status);
                Clothes = ArmorItems['ClothingStatus'+status];
            }
            if( ch.gameInfo.ruleset.match(/3/) ) {
                var nameForStatus = ['MidClass','MidClass','HighClass','HighClass','HighClass','Noble'];
                var ClothingClass = nameForStatus[status];
                if( status<0 ) ClothingClass = (status<-1) ? 'Rags' : 'LowClass';
                var ClothingKey = ClothingClass+"Clothes";
                console.log("[newchar] getting "+ClothingKey);
                Clothes = ArmorItems[ClothingKey];
                delete Clothes.description;
            }
            Clothes.number = Math.max(Poisson(2),1);
            console.log("[newchar] clothing: ");    console.log(Clothes);
        	  if( suit ) {
        	      if( Clothes.number>1 ) { Clothes.number--; ch.equipment.push( Clothes ); ch.collections.default.push( Clothes );}
        	  }
        	  else {
        	      ch.equipment.push( Clothes );
                ch.collections.default.push( 'wear' );
                ch.collections.default.push( Clothes );
        	  }
        	  console.log("[newchar] default collection after adding, and possibly wearing, clothes:");   console.log(ch.collections.default);
        }
        // other stuff
        if( charTemplate.hasOwnProperty('reqdEquip') ) {
        	  var tmpltReqdEquip = charTemplate.reqdEquip.slice(0);  // makes a clone of the Template reqdEquip array
        	  for( var r=0; r<tmpltReqdEquip.length; r++ ) {
        	  	  var Item = BasicEquipment[tmpltReqdEquip[r]].clone();
        	  	  Item.number = (Item.many) ? Math.max(Poisson(Item.many),1) : 1;
        	  	  ch.equipment.push( Item );
                ch.collections.default.push( Item );
        	  }
        }
        var tmpltEquipment = charTemplate.equipment.slice(0);  // makes a clone of the Template equipment array
      //  console.log(tmpltEquipment);
        for( var v=0; v<charTemplate.eqpNum; v++ ) {
            var ei = Math.floor( tmpltEquipment.length*Math.random() );
            if( !tmpltEquipment[ei] ) { alert("no appropriate basic equipment found in library"); break; }
            var eq = tmpltEquipment[ei];
            if( ch.hasItem(eq) ) { v--; continue; }		// skip immediately items already taken (required)
            tmpltEquipment.splice(ei,1);
          //  if( Math.random()>0.5*tmpltEquipment.length ) continue;
            console.log("will try to take "+eq);
          //  console.log(BasicEquipment[eq]);
            var Item = BasicEquipment[eq].clone();
          //  console.log(Item);
            if( Item.hasOwnProperty('goeswith') ) {   // if this is something like 'arrow', check to see if it makes sense to take it
                var hasgoeswith = false;
              //  console.log('goeswith:');
              //  console.log(Item.goeswith);
                for( var i=0; i<Item.goeswith.length; i++ ) {
                    if( ch.hasItem( Item.goeswith[i] ) ) hasgoeswith = true;
                }
                if( !hasgoeswith ) { console.log(eq+' rejected because accompanying item is missing'); v--; continue; }
            }
            if( Item.weight>10 )         { v--; continue; }   // repeat this loop iteration
            if( Item.TL>ch.gameInfo.TL || (Item.maxTL && Item.maxTL<ch.gameInfo.TL) ) { console.log('rejecting '+eq+', TL ('+Item.TL+') wrong'); v--; continue; }   // redo this loop iteration if TL is too low or high
            Item.number = (Item.many) ? Math.max(Poisson(Item.many),1) : 1;  // if a continuous distribution is used, may want to round
          //  if( !Item.continuous ) Item.number = Math.floor(Item.number);   // need a continuous distribution (not Poisson) for this to matter (Gamma: https://www.jstor.org/stable/2344879?seq=2#page_scan_tab_contents)
          //  console.log("taking "+Item.number+" "+Item.name+es(Item.number));
            ch.equipment.push( Item );
            ch.collections.default.push( Item );
        }

        /* skills (do this after equipment to make sure skills for weapons are taken) */
      //  if( !confirm("Magery level: "+ch.getTrait('Magery').levels) ) return;
        if( ch.totalPoints()<points ) {
            // first make sure weapons are supported
          //  console.log("ch.weapons: ");
          //  console.log(ch.weapons);
          weapon:
            for( i=0; i<ch.weapons.length; i++ ) {
                console.log("* Weapon "+(i+1)+": getting skills for "+ch.weapons[i].name);
                var wSkls = Object.keys( ch.weapons[i].wieldOptions );
              //  console.log(ch.weapons[i].name+" wield skills: "+wSkls);
                for( j=0; j<wSkls.length; j++ ) {
                		if( ch.skills.length>0 && Math.random()>1/(j+1) ) break;		// diminishing odds for each weapon skill in list
                    var skl = wSkls[j];
                    var spc = null;
                    if( skl.match(/_/i) ) {
                        var tokens = skl.split(/_/i);
                        skl = tokens[0];
                        spc = tokens[1];
                    }
                		var tlsp = spc;
                    var tl = null;
                    if( skl.match(/\d/) ) {
                        tl  = skl.match(/\d/).join();  // alert("TL extracted: "+tl);
                        skl = skl.split(/\d/)[0];
                    }
                    if( tl && !tlsp ) tlsp = tl;
                 //  console.log("adding wieldOptions["+j+"] skill '"+wSkls[j]+"', unless we already have it");
                 //  console.log("ch.skills: "+JSONstring.make(ch.skills));
                 //  console.log("do we? "+ch.hasSkill(skl,tlsp));   // would be better to be able to send wSkls[j] (e.g. "Guns7_Shotgun") and have hasSkill assess all 3 conditions
                    if( ch.hasSkill(skl,tlsp) ) continue;
                  //  console.log("don't have wieldOptions["+j+"] skill '"+wSkls[j]+"'; getting and adding");
                    if( !Skills.hasOwnProperty(skl) ) { console.log("wieldOptions["+j+"] skill '"+wSkls[j]+"' isn't a Skill; moving to next wield option"); continue; }
                    var Skill = Skills[skl].clone();
                  //  alert(JSONstring.make(Skill))
                    Skill.points = 1;
                    if( spc ) Skill.specialization = spc;
                    if( tl  ) Skill.TL = tl;
                  //  alert("unshifting this onto ch.skills array:\n"+JSONstring.make(Skill))
                    ch.skills.unshift( Skill );   // put weapon skills in list BEFORE skills that are part of the template, so they are more likely to have points added
                }
            }
            console.log("weapon skills loop completed");
          shield:
            for( i=0; i<ch.equipment.length; i++ ) {
                var Item = ch.equipment[i];
                if( !Item.hasOwnProperty("PDB") ) continue;   // looking only for shields
                console.log(Item.name+" wield skill: "+Item.skill);
                var skl = Item.skill;
                var spc = '';
                if( skl.match(/_/i) ) {
                    var tokens = skl.split(/_/i);
                    skl = tokens[0];
                    spc = tokens[1];
                }
                console.log("adding wield skill "+skl+", unless we already have it");
                if( ch.hasSkill[skl] ) continue;
                console.log("don't have "+skl+"; getting and adding");
                var Skill = Skills[skl];
                Skill.points = 1;
                if( spc ) Skill.specialization = spc;
                ch.skills.push( Skill );
            }
            console.log("shield skills loop completed");
            // then choose from list, if you want more skills ch.totalPoints()<0.9*points
            var ptRatio = ( charType.match(/mage/i) ) ? 1 : 1.5;  // if ptRatio is lower, you get more skills at lower levels (use values from 1.5 to 2)
            var tmpltSkills = charTemplate.skills.slice(0);
            // console.log("tmpltSkills skills:\n"+JSONstring.make(tmpltSkills));
            var qualified = tmpltSkills.filter( function(sKey) { return ch.hasPrereqsFor(sKey) } );
            // console.log("qualified skills:\n"+JSONstring.make(qualified));
            while( ( ch.skills.length<1 || ((points-ch.totalPoints())/ch.skills.length)>ptRatio ) && tmpltSkills.length && qualified.length ) {

                var psi = Math.floor( qualified.length*Math.random() );
                var psk = qualified[psi];
                // find psk in tmpltSkills:
               //  console.log("index of "+psk+" in tmpltSkills: "+tmpltSkills.indexOf(psk));

                var spc = '';
                if( psk.match(/_/i) ) {
                    var tokens = psk.split(/_/i);  // alert(tokens);
                    psk = tokens[0];
                    spc = tokens[1];               // alert(spc);
                }
                // this does nothing here at all, as the skills don't have the TL part of the 'nameTL_spec' format here
                var tl = '';
                if( psk.match(/\d/) ) {
                    psk = psk.split(/\d/)[0];
                    tl = psk.match(/\d*/);
                }
                if( tl && tl>ch.gameInfo.TL ) continue;   // but I'd sure like SOMETHING like this
                if( ch.hasSkill[psk] ) continue;
                console.log("trying to add "+psk+" skill [index "+psi+"]");
                var Skill;
                try {	Skill = Skills[psk].clone_proto(); }
                catch(err) {
	   	             	console.log("did not find '"+psk+"' in the Skills list; trying Spells");
		                try {	Skill = Spells[psk].clone_proto(); }
		                catch(err) { /*console.log("did not find '"+psk+"' in the Spells list either");*/ continue; }
                }
		            if( Skill.minTL && Skill.minTL>ch.gameInfo.TL ) { console.log('rejecting '+Skill.name+' skill; minimum TL ('+Skill.minTL+') too high'); qualified.splice(psi,1); continue; }   // skip if Skill minTL is too high
              //  alert(JSONstring.make(Skill));
                if( !ch.hasPrereqsFor(Skill) ) {  // unnecessary when using the 'qualified' array
                    // console.log("ch lacks prereqs for "+psk);
                  //  console.log("skills:\n"+JSONstring.make(ch.skills)+":\ntraits:\n"+JSONstring.make(ch.traits));
                    continue;
                }
                // should now deal with Skill.TLs and Skill.specRequiredList
                if( Skill.TLs ) Skill.TL = (tl) ? tl : ch.gameInfo.TL;
                if( Skill.specRequiredList ) {
//                     Skill.specialization = (Skill.specRequiredList.length)
//                                          ? Skill.specRequiredList[Math.floor(Math.random()*Skill.specRequiredList.length)]
//                                          : 'specialty';
                    Skill.specialization = 'specialty';
                    if(Skill.specRequiredList.length) {  // console.log(Skill.name+" has specs in specRequiredList");
                        if( Skill.TLspecs ) {  // console.log(Skill.name+" has TLspecs");
                            randSpcIndex = Math.floor(Math.random()*Skill.specRequiredList.length);
                            //alert("testing "+Skill.name+" specialization "+randSpcIndex+"; does Skill.TLspecs[Skill.specRequiredList["+randSpcIndex+"]] include TL"+ch.gameInfo.TL+"?");
                            do {
                                let randSpcIndex = Math.floor(Math.random()*Skill.specRequiredList.length);
                                //alert("testing "+Skill.name+" specialization "+randSpcIndex+"; does Skill.TLspecs[Skill.specRequiredList["+randSpcIndex+"]] include TL"+ch.gameInfo.TL+"?");
                                Skill.specialization = Skill.specRequiredList[randSpcIndex];
                                //alert("testing "+Skill.name+" ["+Skill.specialization+"]; does Skill.TLspecs["+Skill.specialization+"] include TL"+ch.gameInfo.TL+"?");
                            }
                            while( Skill.TLspecs[Skill.specialization].length && !Skill.TLspecs[Skill.specialization].includes(ch.gameInfo.TL) )
                        }
                        else { Skill.specialization = Skill.specRequiredList[Math.floor(Math.random()*Skill.specRequiredList.length)] }
                    }
                }
                var rebuiltSkLbl = (spc) ? psk+tl+'_'+spc : psk+tl;
                // console.log("splicing skill "+rebuiltSkLbl+" out of tmpltSkills array at index "+tmpltSkills.indexOf(rebuiltSkLbl));
                tmpltSkills.splice(tmpltSkills.indexOf(rebuiltSkLbl),1);

                Skill.points = 1;
                if( ch.gameInfo.ruleset.match(/3/) && Skill.hasOwnProperty('spell') ) {
                    var SkillLevel = Skill.pointsToLevel(Skill.points) + ch.getTrait('Magery').levels;  // simplified, hopefully good enough
                    while( SkillLevel<12 ) {
                        console.log("[loadNewCharacterFromDialog];\n"+Skill.name+" skill level is too low ("+Skill.level()+"), doubling points");
                        Skill.points *= 2;
                        SkillLevel = Skill.pointsToLevel(Skill.points) + ch.getTrait('Magery').levels;
                    }
                }
                if( spc ) Skill.specialization = spc;
                ch.skills.push( Skill );
                console.log("added "+psk+" supplementary skill");
                // re-generate 'qualified' array of skills for which ch has prerequisites (so its length can be tested in loop condition)
                // console.log("regenerating 'qualified' array");
                // console.log("tmpltSkills skills:\n"+JSONstring.make(tmpltSkills));
                qualified = tmpltSkills.filter( function(sKey) { return ch.hasPrereqsFor(sKey) } );
                // console.log("qualified skills:\n"+JSONstring.make(qualified));
            }
            // if( ch.skills.length>=1 && ((points-ch.totalPoints())/ch.skills.length)<=ptRatio )
            //     console.log("stop adding supp. skills because sufficient skills to meet ptRatio have been added");
            // if( !tmpltSkills.length )
            //     console.log("stop adding supp. skills because template has run out");
            // if( !qualified.length )
            //     console.log("stop adding supp. skills because all skills with reachable prerequisites have been taken");
        }
        var numSkills = ch.skills.length;
        while( ch.totalPoints()<points && numSkills ) {             // add points to existing skills until you run out

         		var si = (ch.hasTrait('Magery'))
         		       ? Math.floor( numSkills*Math.random() )
         		       : Math.min( Geometric(0.4-1/numSkills)-1, numSkills-1 );   // 0.5 weighs pretty strongly to first skill, 0.3 spreads it out with peak at skill 3 or so
         	//	alert("picked skill "+si);
         	//	console.log("picked skill "+si+' ('+ch.skills[si].name+')'+", comparing to ch.skills.length="+numSkills);
         		if( si>=numSkills ) continue;

         		if( ch.skills[si].points>3 )
         				ch.skills[si].points += 4;
         		else
         				ch.skills[si].points *= 2;
        }
        ch.skills.sort( function(a,b) { if( a.name.toLowerCase() < b.name.toLowerCase() ) return -1; if( a.name.toLowerCase() > b.name.toLowerCase() ) return  1; } );
        // console.log(JSONstring.make(ch.skills));

        /* quirks */
        if(ch.totalPoints()>points) console.log("point value exceeds desired limit; need to add "+(ch.totalPoints()-points)+" quirks");
        while( ch.totalPoints()>points ) {             // add quirks to offset any point excess
         		var qi = Math.floor( QuirksList.length*Math.random() );
         		var qText = QuirksList[qi];
         		// console.log('adding "'+qText+'" quirk');
         		var Quirk = new Trait( qText, 'Q', 'PMSo', -1, false, 'QuirksList' );
         		// console.log(Quirk);
         		ch.traits.push( Quirk );
        }

        // NOW should wield the shield first, then the weapon (which will unwield the shield, if weapon is two-handed)
        var shieldIndex = ch.hasShield();
        if( shieldIndex ) ch.readyShield( shieldIndex );
        var weaponIndex = ch.hasWeapon();
        var weaponObj = ch.collections.default[weaponIndex];
        var optionSkill;
        if( weaponIndex ) {
            for( var wOptSkl in weaponObj.wieldOptions ) {
                if( ch.hasSkill(wOptSkl) ) {
                    optionSkill = wOptSkl;
                    break;
                }
            }
            ch.wieldWeapon( weaponIndex, optionSkill );
        }

        /* randomized, Poisson-distributed age
        var mat = 18; var lambda = 5;
        var ageAdj = ch.adjustmentsTo('Aging');
        if(ageAdj) { mat *= ageAdj; lambda *= ageAdj; }
        ch.description.age = mat+Poisson(lambda);
        console.log("[random character] Poisson-distributed age: "+ch.description.age); */

        // randomized, geometrically-distributed age
        var mat = 18; var a = 0.2;
        var ageAdj = ch.adjustmentsTo('Aging');
        if(ageAdj) { mat *= ageAdj; a /= ageAdj; }
        if( ch.hasTrait("Unaging") ) a = 0.01;
        ch.description.age = mat + Geometric(a) - 1;
        console.log("[random character] geometrically-distributed ("+mat+" + Geometric("+a+") - 1) age: "+ch.description.age);

        /* apply some descriptives and preferences */
        ch.description.appearance = ch.description.race +' '+ charType.replace(/_/g,' ').toTitleCase() /*+ ' ('+ch.height()+', '+ch.weight()+')'*/;   // weight is always unmodified by 'build' traits at this point
        ch.description.shortStory = ch.description.appearance;
        ch.preferences.display.traitsScroll = true;
        let tmpltThemes = charTemplate.themes;
        if( tmpltThemes )
            ch.preferences.display.theme = tmpltThemes[Math.floor(Math.random()*tmpltThemes.length)];

		    /* generate a random name */
		    var makeName = $("#newCharRandomName").prop('checked');
		    if( makeName && !raceTemplateKey.match(/human/i) ) {
		        var randomName = makeNameFor( raceTemplateKey.toLowerCase() );
    		    if( randomName ) ch.description.name = randomName;
		    }
		    var addFamilyName = $("#newCharRandomFamilyName").prop('checked');
		    if( addFamilyName && !raceTemplateKey.match(/human/i) ) {
		        var familyName = makeFamilyNameFor( raceTemplateKey.toLowerCase() );
    		    if( familyName ) ch.description.name += familyName;
		    }
		    var addClanName = $("#newCharRandomClanName").prop('checked');
		    if( addClanName && !raceTemplateKey.match(/human/i) ) {
		        var clanName = makeClanNameFor( raceTemplateKey.toLowerCase() );
    		    if( clanName ) ch.description.name += clanName;
		    }

		    /* set some prefs */
		    ch.preferences.display.showStartingCash = false;
		    ch.preferences.display.TLinfo = false;

    }  // end if( chGen ) branch

    // replace currently loaded character with new initialized Character object
    document.loadedCharacter = ch;

   // alert('in loadNewCharacterFromDialog, Character re-initialized as '+document.loadedCharacter.description.name);

    // hide the newCharDialog
    document.getElementById('newCharDialog').style.display = 'none';

    // call loadCharacter
    // console.log(JSONstring.make(ch));
    // ch.viewCharacterAsFile();
    loadCharacter( document.loadedCharacter, null );
    return false;
}
function polarBoxMuller() {
    var x1, x2, w;
    do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
    }
    while( w>=1 );
    w = Math.sqrt( (-2.0 * Math.log( w ) ) / w );
    return x1 * w;
}
function Poisson(lambda) {
  //console.log("Poisson got lambda="+lambda);
    var L = Math.exp(-lambda);
    var k = 0;
    var p = 1;
    do {
        k++;
        p *= Math.random();
    } while( p>L );
  //console.log("Poisson returns "+(k-1));
    return k-1;
}
function Geometric(a) {
    /*  Geometric distribution, 0 < a < 1
        For input a between 0 and 1, generates a random variable from the discrete geometric distribution.
        Input lower a for numbers distributed closer to 1, higher a for more spread-out distributions.
    */
    var x = 1;
    var u = Math.random();
    while( u>a && x<1000000*a ) {   // the x<1000000a bit makes this not exactly Geometric, but should keep this loop from running forever
        x++;
        u = Math.random();
    }
    return x;
}
function makeWeightedKeysList(hash) {
		var frqs = {};
		for ( var k in hash ) if( k.match(/ST|IQ|DX|HT/i) || hash[k]>0 ) frqs[k] = 1;
	//	alert(JSONstring.make(frqs));
		for ( var k in hash ) {
		    if( hash[k]==0 && !k.match(/ST|IQ|DX|HT/i) ) continue;
				var w = hash[k];
			//	alert("hash["+k+"]="+w);
				if(w>0) {
						frqs[k] *= Math.pow(2,w);
				}
				else if (w<0) {
					  for( var n in frqs ) {
					  		if( n==k || !n.match(/ST|IQ|DX|HT/i) ) continue;
					  		frqs[n] *= Math.pow(2,-w);
					  }
				}
			//	alert("after doing "+k+", frqs=\n"+JSONstring.make(frqs));
		}
	//	alert(JSONstring.make(frqs));
		var list = [];
		for( var att in frqs ) {
				var frq = frqs[att];
			//	alert("frqs["+att+"]="+frq);
				for( var i=0; i<frq; i++ ) list.push(att);
		}
		return list;
}

/* Persistence */
function openCharacterDialog() {
    var charIDs = getCookie( 'characterIDsNames' );
    if( !charIDs ) { if( window.console ) { console.log('no stored character IDs found'); } }
    /* create a floating div with a short form in it */
    var openCharFormHTML = new Array();
    openCharFormHTML.push('<form method="post">');
    openCharFormHTML.push('  <div class="titlebar">Select a saved character to load:</div>');
    openCharFormHTML.push('  <div style="padding: 1em; text-align: center;">');
    openCharFormHTML.push('    <select id="openCharSelect" size="6" style="width: 250px;">');
    // get the Character list and create select options
    if( charIDs ) {
     // alert('charIDs: '+charIDs);
        var storedCharacterInfo = charIDs.split(',');
     // alert('storedCharacterInfo: '+storedCharacterInfo);
        for( var index in storedCharacterInfo ) {
            var pair    = storedCharacterInfo[index];
            var chIDarr = pair.split(':');
            var ChID    = chIDarr[0];
            var ChName  = chIDarr[1];
            openCharFormHTML.push('      <option title="'+ChID+'" value="'+ChID+'">'+ChName+'</option>');
        }
    }
    openCharFormHTML.push('    </select>');
    openCharFormHTML.push('  </div>');
    openCharFormHTML.push('  <input type="submit" value="Cancel" style="float: left;  width: auto; margin: 1em;" onClick="document.getElementById(\'openCharDialog\').style.display=\'none\'; return false;">');
    openCharFormHTML.push('  <input type="submit" value="Load"   style="float: right; width: auto; margin: 1em;" onClick="loadSavedCharacterFromDialog(); return false;">');
    openCharFormHTML.push('</form>');
    document.getElementById('openCharDialog').innerHTML = openCharFormHTML.join("\n");
    setupDialog('openCharDialog');
    return false;
}

/*  The retrieveCharacter function was intended to retrieve Character files stored in DOM localStorage.
    I have made great strides in the paradigm of storing files on disk, more like a normal app,
    so I don't think I want to use localStorage for a conventional 'Save' functionality any more.
    I am also now using localStorage for a different purpose, to back up
    the loaded Character for protection from accidental reloads, etc.  I think this means that
    a loadStoredCharacter-type functionality is no longer required.
*/
function retrieveCharacter( ID ) {
    alert("retrieving using ID "+ID);
 // var CharacterJSON = $.jStorage.get( ID );
    var CharacterJSON = localStorage.getItem( ID );
    // alert("retrieved:\n"+CharacterJSON);
    var retrievedCh = JSONstring.toObject(CharacterJSON);
    return retrievedCh;
};

function expireCharacter( ID ) {
    // done with direct use of localStorage:
    localStorage.removeItem( ID );

 // don't forget to remove the corresponding entry in the stored characterIDsNames
};

function loadSavedCharacterFromDialog() {
    // get form value(s)
    var menu = document.getElementById('openCharSelect');
    var charName = menu.options[menu.selectedIndex].text;
    var charID = menu.options[menu.selectedIndex].value;
    if( window.console ) { console.log("got name:"+charName+" - ID:"+charID+" pair" ); }
    // hide the openCharDialog
    document.getElementById('openCharDialog').style.display = 'none';

    // save current Character, if there is one (what if the current Character is the same as the selected Character?)
   // document.loadedCharacter.store();
    // retrieve the selected Character from storage
    var ch = retrieveCharacter( charID );
   // alert("about to load reconstituted character:\n"+JSONstring.make(ch));
    // call loadCharacter
    loadCharacter( ch, null );
    return false;
}

function openFileDialog() {
    setupDialog('openFileDialog');
    return false;
}

function openURLDialog() {
    setupDialog('openRemoteFileDialog');
    return false;
}

/* This now works using the HTML5 File API!! */
/* http://www.w3.org/TR/FileAPI/#dfn-filereader */
/* Load-into-new-page isn't working */
function loadCharacterFromFile( intoPage ) {
    // open the new page, if asked
    win = ( intoPage ) ? window.open( intoPage, '_blank' ) : window.self;

    // grab the filesObject associated with the file selected (do this in calling window)
    var filesObject = document.getElementById('selectedFile').files;
    characterFile = filesObject[0];
    characterFileName = characterFile.name;   // global variable to be used for naming later downloads, etc.
    // console.log(characterFile);

    // create a FileReader object and use it to read the characterFile into memory
    var reader = new FileReader();
    // add a function that will run later, when the reader has finished slurping the file
    reader.onloadend = function() {     // when the reader is finished reading the file,
        // reconstitute Character from JSON and load
      //  alert("reader.result:\n"+reader.result);
        // console.log(reader.result);
        var retrievedCh = newCharacterFromJSON( reader.result );
      //  alert("in loadCharacterFromFile, retrievedCh (newCharacterFromJSON applied to reader.result()) is:\n"+JSONstring.make(retrievedCh) );
        // console.log('[loadCharacterFromFile] about to load '+retrievedCh.description.name+' into '+intoPage+' page');

        if( win==window.self ) {
            loadCharacter( retrievedCh, null )
        }
        else {
            win.setTimeout( function() { /*win.alert("before loadCharacter, ch is:\n"+JSONstring.make(retrievedCh) );*/ win.loadCharacter( retrievedCh, null ) }, 500 );
        }

    }
    // slurp the file (attach the onloadend function first)
    reader.readAsText( characterFile );
    // this is asynchronous; I need to WAIT for it to be done before using it - that's the onloadend function

    // close the dialog window
    document.getElementById('openFileDialog').style.display = 'none';

    return;
}
function loadCharacterFromURL() {
    var win = window.self;
    var url = $('#fileURL').val();
    console.log("[loadCharacterFromURL] has this url: "+url);

    // Both of the following work.  I think I trust the jQuery a little more.

/*
    // see http://www.html5rocks.com/en/tutorials/file/xhr2/
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', url, true );
    xhr.responseType = 'json';
    xhr.onload = function(e) {
        if( this.status==200 ) {
            var retrievedCh = this.response;
            console.log('[loadCharacterFromURL] about to load '+retrievedCh.description.name);
            loadCharacter( retrievedCh, null );
		}
	};
	xhr.send();
*/

    $.getJSON(
        url,
        function() {
            console.log("getJSON succeeded");
        }
    ).done(
        function( json ) {
            console.log('[loadCharacterFromURL] ready to load '+json.description.name);
            loadCharacter( json, null );
        }
    ).fail(
        function( jqxhr, textStatus, error ) {
            console.log('[loadCharacterFromURL] remote JSON request failed: '+textStatus+", "+error);
        }
    ).always(
        function() {
            console.log('[loadCharacterFromURL] sent request with url='+this.url);
        }
    );

    // close the dialog window
    document.getElementById('openRemoteFileDialog').style.display = 'none';
    return;
}


function openTranslateGDFsWindow() {
    var options = 'width=400,height=400,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no';
    var translateGDFsWindow = window.open('includes/translateGDFs.html','Translate GURPS Data Files',options);
}


function editCharacterInfoDialog() {
    document.getElementById('editCharacterShowCreateDate').innerHTML = 'created '+ch.getCreateDate();
    var desc = ch.description;
    $("#editCharacterName").val( desc.name );
    $("#editCharacterHeight").val( ch.height() );
    $("#editCharacterWeight").val( ch.weight() );
    $("#editCharacterAge").val( desc.age );
    $("input[name=editCharacterGender][value="+desc.gender+"]").prop('checked',true);
    $("#editCharacterRace").val( desc.race );
    document.getElementById('gameInfoRuleset').innerHTML
        = makeSelectListOptions( RulesetOptionsList, ch.gameInfo.ruleset ).join("\n              ");
    setupDialog('editCharacterInfoDialog');
}

function editGameInfoDialog() {
    document.getElementById( 'playerInfoName' ).value = (ch.playerInfo.name) ? ch.playerInfo.name: '';
    document.getElementById('gameInfoTL').innerHTML
        = "\n                  "
        + makeSelectListOptions( TechLevelOptionsList, ch.gameInfo.TL ).join("\n                  ")
        + "\n                ";
    document.getElementById(   'gameInfoGM'   ).value = (ch.gameInfo.GM) ? ch.gameInfo.GM: '';
    document.getElementById('gameInfoCampaign').value = (ch.gameInfo.campaign) ? ch.gameInfo.campaign : '';
    document.getElementById('basicStartingWealth').value =  ch.gameInfo.startingWealth;
    document.getElementById('disadPointsLimit').value =  ch.gameInfo.disadPointsLimit;
    document.getElementById('quirkPointsLimit').value =  ch.gameInfo.quirkPointsLimit;
    setupDialog('editGameInfoDialog');
}
function modifyGameInfo( form ) {
    ch.gameInfo.ruleset = form.gameInfoRuleset.value;
    ch.gameInfo.TL = 1*form.gameInfoTL.value;
    ch.gameInfo.disadPointsLimit = 1*form.disadPointsLimit.value;
    ch.gameInfo.quirkPointsLimit = 1*form.quirkPointsLimit.value;
    document.getElementById('editGameInfoDialog').style.display='none';
    loadCharacter( ch, 'Change Game Info' );
    return false;
}

function editLinkersDialog( linker ) {

    if( !linker ) linker = 'adjustments';
    $('#editLinkersSelect').val(linker);

    var linkerHeadRows = {
      defaults:      ['  <tr><td><b>Target</b></td><td><b>Defaults From</b></td></tr>'],
      prerequisites: ['  <tr><td><b>Target</b></td><td><b>Requires</b></td></tr>'],
      adjustments:   ['  <tr><td><b>Target</b></td><th colspan="2" style="text-align:center;"><b>Adjustment</b></th><td><b>From</b></td></tr>'],
      groups:        ['  <tr><td><b>Group</b></td><td style="width:6em;text-align:center;"><b>members</b></td></tr>'],
    };
    $('#editLinkersThead').html(['',linkerHeadRows[linker],''].join("\n            "));
    var Rows = [''];
    for( var i in ch[linker] ) {
        var onclick = "editLinkerDialog('"+linker+"','"+i+"'); return false;";
        onclick = 'onclick="'+onclick+'"';
        var Linker = ch[linker][i];
        var disabled = '';
        if( !Linker.target && !linker.match(/group/i) ) {
            if( ch[linker+'_disabled'] ) {
                Linker = ch[linker+'_disabled'][i];   // i is a key, not an index; should work here too
                disabled = ' style="color:indianred"';
            }
            else {
                console.log(Linker);
                alert("that's weird; ch["+linker+"_disabled] doesn't exist");
            }
        }
        // console.log(i+": "+JSONstring.make(Linker));
        var target = Linker.target;
       // if( !target && linker!='groups' ) continue;    // skip lines for disabled Linkers
        if( Linker.hasOwnProperty('targetSpec') && Linker.targetSpec ) target += ' ('+Linker.targetSpec+')';
        var from = ( Linker.hasOwnProperty('prereq') ) ? Linker.prereq :  Linker.from;
        var fromObject;
        // branch on linker type
        switch(linker) {
            case 'defaults':
                fromObject = ch.getSkill(from);
                var hilite = ( fromObject || (from && from.match(/ST|DX|IQ|HT/i)) ) ? 'class="ready" ' : '';
                from += ( Linker.hasOwnProperty('fromSpec') && Linker.fromSpec ) ? ' ('+Linker.fromSpec+')' : '';
                from += (Linker.penalty) ? signed(Linker.penalty) : '';
                
                if( Linker.hasOwnProperty('penalty') && !Linker.penalty
                    && Linker.hasOwnProperty('category') && Linker.category.match(/stat/i) )
                    from = 'no default';
                Rows.push('  <tr '+hilite+onclick+disabled+'><td>'+target+'</td><td>'+from+'</td></tr>');
                break;
            case 'prerequisites':
                fromObject = ( Linker.hasOwnProperty('category') && Linker.category.match(/ad|di/i) ) ? ch.getTrait(from) : ch.getSkill(from);
                // so at this point if fromObject is null, it's (maybe) because ch doesn't have it.  so mark row accordingly?
                if(fromObject) from = fromObject.name;
                var hilite = (fromObject) ? 'class="ready" ' : '';
                from += ( Linker.hasOwnProperty('prereqSpec') && Linker.prereqSpec ) ? ' ('+Linker.prereqSpec+')' : '';
                var cat = '';
                if( Linker.hasOwnProperty('category') && Linker.category ) {
                    if(Linker.category.match(/ad/i)) from += ' trait';
                    if(Linker.category.match(/sk/i)) from += ' skill';
                }
                from += ( Linker.hasOwnProperty('level') && Linker.level ) ? ' '+Linker.level+'+' : '';
                if( Linker.hasOwnProperty('number') && Linker.number ) from = Linker.number+' '+from;
                Rows.push('  <tr '+hilite+onclick+disabled+'><td>'+target+'</td><td>'+from+'</td></tr>');
                break;
            case 'adjustments':
                fromObject = ( Linker.hasOwnProperty('fromCategory') && Linker.fromCategory.match(/sk/i) ) ? ch.getSkill(from) : ch.getTrait(from);
                // so at this point if fromObject is null, it's (maybe) because ch doesn't have it.  so mark row accordingly?
                if(fromObject) from = fromObject.name;
                var hilite = (fromObject) ? 'class="ready" ' : '';
                var fcat = '';
                if( Linker.hasOwnProperty('fromCategory') && Linker.fromCategory ) {
                    // what, exactly?  mostly 'AD' or 'DI', who cares, but some are 'stats', and one says 'enc' (should that be something like char2nd?)
                }
                var tcat = '';
                if( Linker.hasOwnProperty('targetCategory') && Linker.targetCategory ) {
                    if(Linker.targetCategory.match(/CL|GR/i)) target += ' group';
                    if(Linker.targetCategory.match(/sk/i)) target += ' skill';
                    // there are a few more of these now; check library
                }
                var per = ( !fromObject || !fromObject.hasLevels || (Linker.hasOwnProperty('per') && !Linker.per) ) ? '' : 'per level';
                Rows.push('  <tr '+hilite+onclick+disabled+'><td>'+target+'</td><td style="text-align:right;">'+signed(Linker.amount)+'</td><td>'+per+'</td><td>'+from+'</td></tr>');
                break;
            case 'groups':
                var usingGroup = ch.hasThisPrereq( { target: '', prereq: i, number: 1 } );
                var hilite = ( usingGroup ) ? 'class="ready" ' : '';
                // style if you put the list in the td: word-wrap:break-word;white-space:normal
                Rows.push('  <tr '+hilite+onclick+disabled+'><td>'+i+'</td><td style="text-align:center;">'+Linker.length+'</td></tr>');
                break;
        }
    }
    Rows.push('');
    $('#editLinkersTbody').html(Rows.join("\n            "));
/*
Defaults have target, targetSpec, from,   penalty,   fromSpec, category
Prereqs  have target, targetSpec, prereq,          prereqSpec, category, level, pgroup
Adjusts  have target, targetSpec, from,    amount, targetCategory, fromCategory, per, upto
*/
    setupDialog('editLinkersDialog');
    return false;
}
function editLinkerDialog( linker, key ) {
  //  alert(key+": "+JSONstring.make(ch[linker][key]));
    $('#editLinker_newPropertyKey').val('');
    $('#editLinker_newPropertyValue').val('');

    var Rows = [''];
    for( var i in ch[linker][key] ) {
      //  var delClick = '<input type="radio" onclick="delete ch.'+linker+'.'+key+'.'+i+'; editLinkerDialog(\''+linker+'\',\''+key+'\');" title="remove '+i+': '+ch[linker][key][i]+'" />';
        var onclick = ( linker.match(/group/i) ) ? 'ch.'+linker+'.'+key+'.splice('+i+',1);' : 'delete ch.'+linker+'.'+key+'.'+i+';';
        onclick += ' editLinkerDialog(\''+linker+'\',\''+key+'\');';
        var delClick = '<a style="cursor:pointer;"><img src="../images/icon_delete.gif" title="remove '+i+': '+ch[linker][key][i]+'" onclick="'+onclick+'"></a>';
        Rows.push('  <tr><th>'+i+'&ensp;</th><td><input class="'+linker+'LinkerProp" name="'+i+'" value="'+ch[linker][key][i]+'" style="width:100%" /></td><td>'+delClick+'</td></tr>');
    }

    // store these in the form
    $('#editLinker_linker').val(linker);
    $('#editLinker_key').val(key);

    Rows.push('');
    $('#editLinkerTbody').html(Rows.join("\n            "));

    $('#linkerType').html((key+" "+linker.slice(0,-1)).toTitleCase());
    setupDialog('editLinkerDialog');
}
function addLinkerAttribute() {
    var form = document.forms['editLinkerForm'];
    var lnkr = form.editLinker_linker.value;
    var lkey = form.editLinker_key.value;
    var akey = form.editLinker_newPropertyKey.value;
  //  console.log('[addLinkerAttribute] adding to '+lkey+' '+lnkr+":\n"+document.loadedCharacter[lnkr][lkey]);
    if( lnkr.match(/group/i) )
      document.loadedCharacter[lnkr][lkey].push( form.editLinker_newPropertyValue.value );
    else
      document.loadedCharacter[lnkr][lkey][akey] = form.editLinker_newPropertyValue.value;
  //  console.log('[addLinkerAttribute] '+lkey+' '+lnkr+" now looks like:\n"+document.loadedCharacter[lnkr][lkey]);
    editLinkerDialog(lnkr,lkey);
    return false;
}
function disableLinker( linker, key ) {
    // console.log("[disableLinker] called with args\n  linker: "+linker+"\n  key: "+key);
    // store the disabled Linker object in ch[linker+'_disabled']
    if( !ch[linker+'_disabled'] ) ch[linker+'_disabled'] = {};
    ch[linker+'_disabled'][key] = ch[linker][key];
    // console.log("[disableLinker] ch[linker+'_disabled'][key]:");
    // console.log(ch[linker+'_disabled'][key]);
    // then disable it in ch[linker]
    if(linker=='groups') {
        ch[linker][key] = [];   // groups are lists
    }
    else ch[linker][key] = {};
    document.getElementById('editLinkerDialog').style.display = 'none';
    loadCharacter(ch,'disable Linker');
    editLinkersDialog( linker );
}
function deleteLinker( linker, key ) {
  //  console.log("[deleteLinker] called with args\n  linker: "+linker+"\n  key: "+key);
    delete ch[linker][key];
    document.getElementById('editLinkerDialog').style.display = 'none';
    loadCharacter(ch,'delete Linker');
    editLinkersDialog( linker );
}
function editLinker( linker, key ) {
  //  console.log("[editLinker] called with args\n  linker: "+linker+"\n  key: "+key);
    if( !linker.match(/group/i) ) {
        var LinkerObj = {};
        // read the new values and re-create the linker object
        $('.'+linker+'LinkerProp').each(
            function() {
                var name  = $(this).attr('name');
                var value = $(this).val();
                value = ( isNaN(value) ) ? value : 1*value;
                LinkerObj[name] = value;
            }
        );
      //  console.log("[editLinker] after 'each' loop, LinkerObj is\n"+JSONstring.make(LinkerObj));
        // overwrite the one in ch
        ch[linker][key] = LinkerObj;
    }
    // if it IS a group, all the changes were already applied
    document.getElementById('editLinkerDialog').style.display = 'none';
    loadCharacter(ch,'edit Linker');    // makes the change 'sticky' (loadCharacter saves the update in web storage)
    editLinkersDialog( linker );
}


function showReports() {
    setupDialog('reportsDialog');
    $('#reportFrame').html('');
    $('#reportLibraryBasis').html("<li>"+libraryList.join("</li><li>")+"</li>");
  //  ch.makeCollegesReport();
}


function uploadCharacterArtWindow() {
  // var options = 'width=360,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no';
    var options = 'width=360,height=400,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no';
    window.open('includes/CharArt.html','Upload',options);
}

function applyCharacterArtDialog() {
    document.getElementById('characterArtPath').value = ch.description.artPath;
    setupDialog('applyCharacterArtDialog');
}

function applyCharacterArt() {
    // close the dialog window
    document.getElementById('applyCharacterArtDialog').style.display = 'none';
    // get path to art file
    var artPath = /*path ||*/ document.getElementById('characterArtPath').value;
    // attach art file path to character object
    ch.description.artPath = artPath;
    // load it
    loadCharacterArt(artPath);
    // reload the character so these changes stick
    loadCharacter( ch, "Select Art" );
}
function loadCharacterArt(path) {
    if( document.getElementById('characterArt') ) {
      //  document.getElementById('characterArt').innerHTML = '<img src="'+path+'" style="max-width:100%; height:100%; vertical-align:middle" />';
        document.getElementById('characterArt').style.backgroundImage = 'url("'+path+'")';
        document.getElementById('characterArt').style.backgroundPosition = 'top';
        document.getElementById('characterArt').style.backgroundSize = 'cover';
    }
    return;
}

/* Display preferences */
function openPrefsDialog() {
    setupDialog('editPrefsDialog');
    $('#selectThemePref').val(ch.preferences.display.theme);
    $('#watermarkPref'  ).val(ch.preferences.display.watermark);
    $('#unitSystemPref' ).val(ch.preferences.units.measure);
    // var grimoireShown = ch.preferences.display.grimoire;
    // if( window.console && reportLevel>2 ) { console.log('[openPrefsDialog] grimoireShown = '+grimoireShown); }
    $('#autoAdjustBuildPref'    ).prop('checked',ch.preferences.autoAdjustBuild);
    $('#showGrimoire'           ).prop('checked',ch.preferences.display.grimoire);
    $('#useShortnames'          ).prop('checked',ch.preferences.display.shortnames);
    $('#useSkilltypes'          ).prop('checked',ch.preferences.display.skilltypes);
    $('#showTLinfo'             ).prop('checked',ch.preferences.display.TLinfo);
    $('#useFractions'           ).prop('checked',ch.preferences.display.fractions);
    $('#AdjustTraitRowsPref'    ).prop('checked',ch.preferences.display.adjTraitRows);
    $('#startingWealthCasePref' ).prop('checked',ch.preferences.display.showStartingCash);
    $('#showAllProperty'        ).prop('checked',ch.preferences.display.property);
    $('#traitsScrollPref'       ).prop("checked",ch.preferences.display.traitsScroll);
    $('#traitsSuppPagePref'     ).prop("checked",ch.preferences.display.traitsSupp);
   // $('#traitsSuppPageStartPref').prop("checked",ch.preferences.display.traitsSuppAll);
    $('#skillsScrollPref'       ).prop("checked",ch.preferences.display.skillsScroll);
    $('#skillsSuppPagePref'     ).prop("checked",ch.preferences.display.skillsSupp);
   // $('#skillsSuppPageStartPref').prop("checked",ch.preferences.display.skillsSuppAll);
    $('#stuffScrollPref'        ).prop("checked",ch.preferences.display.stuffScroll);
    $('#stuffSuppPagePref'      ).prop("checked",ch.preferences.display.stuffSupp);
   // $('#stuffSuppPageStartPref' ).prop("checked",ch.preferences.display.stuffSuppAll);
    $('#comboSuppPagePref'      ).prop("checked",ch.preferences.display.suppCombo);
    // show/hide the Adjust Trait Rows form element depending on sheet
    if( document.getElementById('ads_partitioned_table') ) $('#AdjustTraitRows').show();
    else $('#AdjustTraitRows').hide();
}

function applyTheme( theme ) {
    if( !theme ) theme = ch.preferences.display.theme;
     // alert("applying "+theme+" theme");
    var css_path = "../css/gurps_"+theme+".css";  // 'grey' theme is what you get if the theme var here is empty, because gurps_.css doesn't exist.  Page falls back to CSS in gurps.css
    document.getElementById('themeCSSlink').href = css_path;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function printBlankSheet() {
    document.getElementById('blankCSSlink').href = "../css/gurps_blank.css";
    await sleep(1000);
    window.print();
  //  await sleep(5000);
    document.getElementById('blankCSSlink').href = '';
    return false;
}
function setWatermark( state ) {
    if( !state ) state = ch.preferences.display.watermark;
    // clear all watermarks first (otherwise going from 'all' to '1st page' leaves the others there)
    $('.wrapper').each(
        function() {
            this.style.background = '';
            this.style.backgroundSize = '';
            this.style.backgroundRepeat = '';
        }
    );
    // now set state according to value of 'state' param
    if( state==1 ) {
        if( window.console && reportLevel>1 ) { console.log('applying watermark to first page'); }
        $('#csheet_wrapper').each(  // for single-page character sheet layouts
            function() {
                this.style.background = 'url(../images/gel.png),url('+ch.description.artPath+')';
                this.style.backgroundSize = '100%';
                this.style.backgroundRepeat = 'no-repeat';
            }
        );
        $('#csheet_pg1_wrapper').each(
            function() {
                this.style.background = 'url(../images/gel.png),url('+ch.description.artPath+')';
                this.style.backgroundSize = '100%';
                this.style.backgroundRepeat = 'no-repeat';
            }
        );
    }
    else if( state==2 ) {
        if( window.console && reportLevel>1 ) { console.log('applying watermark to all pages after first'); }
        $('.wrapper').each(
            function( i ) {
                if( i>0 ) { // starts at second instance of .wrapper class
                    this.style.background = 'url(../images/gel.png),url('+ch.description.artPath+')';
                    this.style.backgroundSize = '100%';
                }
            }
        );
    }
    else if( state=='all' ) {
        if( window.console && reportLevel>1 ) { console.log('applying watermark to all pages'); }
        $('.wrapper').each(
            function() {
                this.style.background = 'url(../images/gel.png),url('+ch.description.artPath+')';
                this.style.backgroundSize = '100%';
            }
        );
    }
    else {
        if( window.console && reportLevel>1 ) { console.log('clearing watermark from all pages'); }
    }
}
function setGrimoireViz( state ) {
    if( !state ) state = ch.preferences.display.grimoire;
    if( window.console && reportLevel>2 ) { console.log('[setGrimoireViz] show? '+state); }
    if( state ) {
        if( window.console && reportLevel>1 ) { console.log('showing grimoire page'); }
        $('#csheet_grimoire_wrapper').show('slow');
    }
    else {
        if( window.console && reportLevel>1 ) { console.log('hiding grimoire page'); }
        $('#csheet_grimoire_wrapper').hide('slow');
    }
}
function setPropertyViz( state ) {
    if( !state ) state = ch.preferences.display.property;
    if( window.console && reportLevel>2 ) { console.log('[setPropertyViz] show? '+state); }
    if( state ) {
        if( window.console && reportLevel>1 ) { console.log('showing property page'); }
        $('#csheet_allBelongings_wrapper').show('slow');
    }
    else {
        if( window.console && reportLevel>1 ) { console.log('hiding property page'); }
        $('#csheet_allBelongings_wrapper').hide('slow');
    }
}

function savePrefs() {
    if( window.console && reportLevel>2 ) { console.log('[savePrefs] saving preferences with Character'); }

    ch.preferences.display.theme        = document.getElementById('selectThemePref').value;
    ch.preferences.display.watermark    = document.getElementById('watermarkPref').value;
    ch.preferences.display.grimoire     = document.getElementById('showGrimoire').checked;
    ch.preferences.display.shortnames   = document.getElementById('useShortnames').checked;
    ch.preferences.display.skilltypes   = document.getElementById('useSkilltypes').checked;
    ch.preferences.display.property     = document.getElementById('showAllProperty').checked;
    ch.preferences.display.TLinfo       = document.getElementById('showTLinfo').checked;
    ch.preferences.display.fractions    = document.getElementById('useFractions').checked;
    ch.preferences.units.measure        = document.getElementById('unitSystemPref').value;
    ch.preferences.autoAdjustBuild      = document.getElementById('autoAdjustBuildPref').checked;
    ch.preferences.display.showStartingCash = document.getElementById('startingWealthCasePref').checked;
    ch.preferences.display.adjTraitRows = document.getElementById('AdjustTraitRowsPref').checked;
    ch.preferences.display.suppCombo    = document.getElementById('comboSuppPagePref').checked;
    ch.preferences.display.traitsScroll = document.getElementById('traitsScrollPref').checked;
    ch.preferences.display.traitsSupp   = document.getElementById('traitsSuppPagePref').checked;
  //  ch.preferences.display.traitsSuppAll= document.getElementById('traitsSuppPageStartPref').checked;
    ch.preferences.display.skillsScroll = document.getElementById('skillsScrollPref').checked;
    ch.preferences.display.skillsSupp   = document.getElementById('skillsSuppPagePref').checked;
  //  ch.preferences.display.skillsSuppAll= document.getElementById('skillsSuppPageStartPref').checked;
    ch.preferences.display.stuffScroll  = document.getElementById('stuffScrollPref').checked;
    ch.preferences.display.stuffSupp    = document.getElementById('stuffSuppPagePref').checked;
  //  ch.preferences.display.stuffSuppAll = document.getElementById('stuffSuppPageStartPref').checked;

    loadCharacter(ch);
}
// depending on _where_ the prefs are saved, they will persist with the Character, the csheet, or
// with the entire package.  Other ways I haven't thought of may exist.  Could give user options.

function applyPrefs() {   // called from inside loadCharacter
    var chUnitSystem = ch.preferences.units.measure;
    if( window.console && reportLevel ) { console.log('applying preferences ('+chUnitSystem+') stored with '+ch.description.name); }
    applyTheme(ch.preferences.display.theme);
    setWatermark();
    setGrimoireViz();
    setPropertyViz();
    // Speed/Range table
    $('#SpeedRangeTableEnglish').hide();
    $('#SpeedRangeTableSI').hide();
    if( chUnitSystem.match(/English/i) ) $('#SpeedRangeTableEnglish').show();
    else $('#SpeedRangeTableSI').show();
    // dialog weight labels
    totalWeight = ch.totalEquipmentQuantity('actualWeight');
    var wtUnits = ( chUnitSystem.match(/cgs/i) )
                ? unitsFor[chUnitSystem].weight+'ram'+es(totalWeight)
                : unitsFor[chUnitSystem].weight+es(totalWeight);
    $('#customEquipmentItemWeightUnit').html( wtUnits );	// not working on ch load; applyPrefs too early?
    $('#editEquipmentWeightUnit').html( wtUnits );	      // but this one does - hm?  Called differently?
    $('#customArmorWeightUnit').html( wtUnits );	        // doesn't work
    $('#customShieldWeightUnit').html( wtUnits );	        // doesn't work
    $('#editCharacterInfoWeightUnit').html( wtUnits );    // doesn't work
    $('#editCharacterWeight').val( ch.weight() );
    $('#customWeaponItemWeightUnit').html( wtUnits );     // doesn't work
    // dialog height labels
    var htUnits = 'in';
    switch( chUnitSystem ) {
        case "MKS" : htUnits = 'm';  break;
        case "CGS" : htUnits = 'cm'; break;
    }
    $('#editCharacterHeight').val( ch.height() );
    $('#editCharacterInfoHeightUnit').html( htUnits );
    // these resolve after first edit of page; applyPrefs is called again and the changes happen
}

// Collections
function openManageEquipmentCollectionsWindow() {
    // var options = 'width=600,height=500,location=no,menubar=no,scrollbars=no,status=no,titlebar=no,toolbar=no';
    // var ManageEquipmentCollectionsWindow = window.open('includes/Collections.html','Manage Equipment Collections',options);
}
function manageCollectionsDialog() {
    setupDialog('manageCollectionsDialog');
    loadManageCollectionsMenus();
}
/*
function loadManageEquipmentCollectionsWindow( CollectionsWindow, selectedCollectionID ) {
    var chCollections = ch.collections;
    var selectedCollection = chCollections[selectedCollectionID];
    // load all owned Equipment items into menu on left
    var equipmentGroups = ['equipment','handWeapons','rangedWeapons','weapons','armor','shields','collections'];
    var allMenuOptions = [];
    for( var gp in equipmentGroups ) {
				var eGroup = equipmentGroups[gp];
				var itemsInGroup = 0;
				allMenuOptions.push('<optgroup label="'+eGroup+'">');
				for( var eIndex in ch[eGroup] ) {
						var item = ch[eGroup][eIndex];
						if( eIndex=='equipped' ) continue;
						// disable collections that contain the right-hand menu collection
						var disable=''; var title = '';
						if( eGroup=='collections' && collectionXcontainsCollectionY( item, selectedCollection ) ) {
						    disable = ' disabled="disabled"';
						    title   = ' title="this collection contains the '+selectedCollection[0]+' collection"';
						}
						var name = (item.name) ? item.name : item[0];
						var eValue = (eGroup=='collections') ? eIndex : eGroup+'_'+eIndex;
						allMenuOptions.push('	<option value="'+eValue+'"'+disable+title+'>'+name+'</option>');
						itemsInGroup++;
				}
				if(itemsInGroup) { allMenuOptions.push('</optgroup>'); }
				else { allMenuOptions.pop(); }
    }
		CollectionsWindow.document.getElementById('allOwnedEquipmentMenu').innerHTML
				= "\n					"+allMenuOptions.join("\n					")+"\n				";
		// load list of Collections into various select menus on page
		var showingCollOptions = [];
		var otherCollOptions = [];
		for( var cLabel in chCollections ) {
				if( cLabel=='equipped' ) continue;
		    var coll = ch.collections[cLabel];
		    var selected = ( cLabel==selectedCollectionID ) ? 'selected="selected"' : '';
		    showingCollOptions.push('	<option value="'+cLabel+'" '+selected+'>'+coll[0]+'</option>');
		    otherCollOptions.push(  '	<option value="'+cLabel+'">'+coll[0]+'</option>');
		}
		CollectionsWindow.document.getElementById('collectionsMenu').innerHTML
				= "\n				"+showingCollOptions.join("\n				")+"\n				";
		CollectionsWindow.document.getElementById('collectionAMenu').innerHTML
				= "\n				"+otherCollOptions.join("\n				")+"\n				";
		CollectionsWindow.document.getElementById('collectionBMenu').innerHTML
				= "\n				"+otherCollOptions.join("\n				")+"\n				";
    // load selected Collection items into menu on right
    var selectedCollectionMenu = [];
		for( var i in selectedCollection ) {
		    var item = selectedCollection[i];
		    if( i==0 ) {
		        // do clever things with this item, which is actually the collection name, then
		        continue;
		    }
        if( item.line ) continue;   // skip formatting 'items'
		    // catch items that are nested collections here
				var name = (item.name) ? item.name : item[0]+' (collection)';
				selectedCollectionMenu.push('	<option value="'+i+'">'+name+'</option>');
		}
		CollectionsWindow.document.getElementById('collectionEquipmentMenu').innerHTML
				= "\n				"+selectedCollectionMenu.join("\n				")+"\n				";
}
*/
function loadManageCollectionsMenus( selectedCollectionID ) {
    var chCollections = ch.collections;
    if( !selectedCollectionID ) selectedCollectionID = chCollections.equipped;
    var selectedCollection = chCollections[selectedCollectionID];
    document.getElementById('allOwnedEquipmentMenu').title   = 'Click on an item to copy it into the '+selectedCollection[0]+' collection.';
    document.getElementById('collectionEquipmentMenu').title = 'Click on an item to remove it from the '+selectedCollection[0]+' collection.';
    document.getElementById('deleteCollectionButton').disabled = false;
    document.getElementById('renameCollectionButton').disabled = false;
 //   document.getElementById('editCollectionListButton').disabled = false;
    // load all owned Equipment items into menu on left
    var equipmentGroups = ['equipment','weapons','collections'];
    var allMenuOptions = [];
    for( var gp in equipmentGroups ) {
        var eGroup = equipmentGroups[gp];
        var optgroupOptions = [];
        for( var eIndex in ch[eGroup] ) {
            var item = ch[eGroup][eIndex];
            if( eIndex=='equipped' ) continue;
            if( item.hasOwnProperty('line') ) continue;
            let Item = (eGroup=='collections') ? item : cloneEquipmentFromGenericObject(item);
            var name = (Item.name) ? Item.name : item[0];
            // disable collections that contain the right-hand menu collection
            var disable=''; var title = '';
            //  if(eGroup=='collections') alert(name+' collection containment: '+collectionXcontainsCollectionY( item, selectedCollection ));
            if( selectedCollection && eGroup=='collections' && collectionXcontainsCollectionY( item, selectedCollection ) ) {
                disable = ' disabled="disabled"';
                title   = ' title="the '+name+' collection contains (or is) the '+selectedCollection[0]+' collection"';
            }
            // append quantity of non-singular items  quant+plural(item.name,item.number)
            var quant = ( Item.number>1 ) ? Item.number+' ' : '';
            let itemString = ( Item.print )
                           ? Item.print()
                           : (Item.name) ? quant+plural(Item.name,Item.number) : item[0];
            var eValue = (eGroup=='collections') ? eIndex : eGroup+'_'+eIndex;
            optgroupOptions.push('	<option value="'+eValue+'"'+disable+title+'>'+itemString+'</option>');
        }
        if( optgroupOptions.length ) {
            allMenuOptions = allMenuOptions.concat( ['<optgroup label="'+eGroup+'">'], optgroupOptions, ['</optgroup>'] );
        }
    }
 //   alert(JSONstring.make(allMenuOptions));
    document.getElementById('allOwnedEquipmentMenu').innerHTML
        = "\n					"+allMenuOptions.join("\n					")+"\n				";
    // load list of Collections into various select menus on page
    var showingCollOptions = [];
    var otherCollOptions = [];
    for( var cLabel in chCollections ) {
        if( cLabel=='equipped' ) continue;
        var coll = ch.collections[cLabel];
        var selected = ( cLabel==selectedCollectionID ) ? 'selected="selected"' : '';
        showingCollOptions.push('	<option value="'+cLabel+'" '+selected+'>'+coll[0]+'</option>');
        otherCollOptions.push(  '	<option value="'+cLabel+'">'+coll[0]+'</option>');
    }
    var collMenu = document.getElementById('collectionsMenu');
    collMenu.innerHTML
        = "\n				"+showingCollOptions.join("\n				")+"\n				";
    document.getElementById('collectionAMenu').innerHTML
        = "\n				"+otherCollOptions.join("\n				")+"\n				";
    document.getElementById('collectionBMenu').innerHTML
        = "\n				"+otherCollOptions.join("\n				")+"\n				";
    // load selected Collection items into menu on right
    var selectedCollectionMenu = [], disable = '';
    if( selectedCollectionID=='default' ) {
        disable = ' disabled="disabled"';
        document.getElementById('allOwnedEquipmentMenu').title = '';
        document.getElementById('collectionEquipmentMenu').title = 'The default collection cannot be edited.';
        document.getElementById('deleteCollectionButton').disabled = true;
        document.getElementById('renameCollectionButton').disabled = true;
 //       document.getElementById('editCollectionListButton').disabled = true;
    }
    for( var i in selectedCollection ) {
        var item = selectedCollection[i];
        if( i==0 )  continue;                         // skip the collection name
        if( typeof item == 'string' ) continue;       // skip wear/wield and use skill entries
        //if( item.hasOwnProperty('line') ) continue;   // skip format items (spacers, headings)
        let Item = (item.name) ? cloneEquipmentFromGenericObject(item) : item;
        // get item/collection name (and label items that are actually nested collections)
        var name = (Item.name) ? Item.name : Item[0]+' (collection)';
//         if( item.hasOwnProperty('line') ) {
//             name = ( item.line ) ? '<span style="font-variant:smallcaps">'+item.line+'</span> (heading)' : '[spacer row]';
//         }
    //  if( selectedCollectionID!='default' ) alert(name);
        // append quantity of non-singular items
        var quant = ( Item.number>1 ) ? Item.number+' ' : '';
        let itemString = ( Item.print )
                       ? Item.print()
                       : (Item.name) ? quant+plural(Item.name,Item.number) : item[0]+' [collection]';
        if( item.hasOwnProperty('line') )
            itemString = (Item.line) ? '[heading: '+Item.line+']' : '[spacer]';
        selectedCollectionMenu.push('	<option value="'+i+'"'+disable+'>'+itemString+'</option>');
    }
 //   alert(JSONstring.make(selectedCollectionMenu));
    document.getElementById('collectionEquipmentMenu').innerHTML
        = "\n				"+selectedCollectionMenu.join("\n				")+"\n				";
    // update form elements for selected collection
    var selectedCollection = collMenu.options[collMenu.selectedIndex].text;
    document.getElementById('deleteCollectionNamed').innerHTML = selectedCollection;
    document.getElementById('renameCollectionNamed').innerHTML = selectedCollection;
    document.getElementById('duplicateCollectionNamed').innerHTML = selectedCollection;
    document.getElementById('editCollectionListButton').setAttribute(
        'onclick',
        "openEditListDialog('collections:"+selectedCollectionID+"'); return false;"
    )
}

function toggleCollectionFormViz(id) {
    var ncForm = document.getElementById(id);
    var vizState = ncForm.style.visibility;
    ncForm.style.visibility = ( vizState=='hidden' ) ? 'visible' : 'hidden';
}

function collectionXcontainsCollectionY( collX, collY ) {
 // console.log("[collectionXcontainsCollectionY('"+collX[0]+"','"+collY[0]+"')]");
    var chCollections = ch.collections;
    if( collX.name || collY.name ) return false;  // normal (non-collection) equipment items have 'name' attributes
    if( collX[0]==collY[0] ) return true;   // same collection; 'contains' itself
    for( var i in collX ) {
        if( i==0 ) continue;  // skip the 0-index (name) item
      //  console.log("length collX["+i+"] (collection '"+collX[0]+"') is "+(collX[i].length));
       // console.log("[collectionXcontainsCollectionY] collX["+i+"] (collection '"+collX[0]+"'):");
       // console.log(collX[i]);
        if( !collX[i].length || (typeof collX[i])=='String' ) continue;
       // console.log(collX[i][0]+"\n"+collY[0]);   // reveals that a number of odd comparisons are taking place; tweak for better speed
        if( collX[i][0]==collY[0] ) return true;  // the normal test for direct inclusion
        if( collectionXcontainsCollectionY( collX[i], collY ) ) return true;
    }
    return false;
}

function addToCollection( itemIndex, itemGroup, collectionLabel ) {
 // alert("itemIndex: "+itemIndex+"\nitemGroup: "+itemGroup+"\ncollectionLabel: "+collectionLabel);
    // get the item from loadedCharacter
    var itemObj = ch[itemGroup][itemIndex];
 // alert("item:\n"+JSONstring.make(itemObj));
    var thisCollection = ch.collections[collectionLabel];

    // detect a multiple item, and ask how many of them to move
    var num = ( itemObj.number>1 )
            ? requestHowManyToMove(itemObj)
            : 1;
		// if this item is not already in the Collection,
    // if I can move individual items of a multiple set, this code needs to ask a better question (e.g., are ALL of these already in the collection?)
		var alreadyThere = false;
		for( var i in thisCollection ) {
				var itemFromCollection = thisCollection[i]
				if( itemFromCollection==itemObj ) {   // will this only return true if all fields (including number) are equal?
						alreadyThere = true;
						break;
				}
		}

		// push this item onto 'current' Collection
		if( !alreadyThere /* && !nested */ ) {
		    var movedItem;
		    if( itemObj.hasOwnProperty('number') && num!=itemObj.number ) {  // alert("item numbers don't match; cloning a new item object");
		        // Need to clone the equipment object if the moved one will have a different number. (Apparently itemObj isn't a real Equipment object...)
		        movedItem = cloneEquipmentFromGenericObject( itemObj );
		        movedItem.number = 1*num;
		    }
		    else movedItem = itemObj;
 // alert("moved item:\n"+JSONstring.make(movedItem));
	    	thisCollection.push(movedItem);
	  }

    // re-order the collections in the Character object
   // console.log("[addToCollection] will now re-order the new character.collections, if needed:");
   // console.log(ch.collections);
    ch.reorderCollections();
   // console.log("[addToCollection] collection re-ordering complete");
    // need to reload Character before reloading the window
   // console.log("[addToCollection] new character.collections:");
   // console.log(ch.collections);
    var itemName = (itemObj.name) ? itemObj.name : itemObj[0];
    loadCharacter( ch, 'Add '+itemName.substr(0,10) );
   // console.log("[addToCollection] character reloaded");
    // re-call the function that populates the window, with new collection opened
    loadManageCollectionsMenus( collectionLabel );
}
function requestHowManyToMove(itemObj) {
    var num = 'x';
    var naughty = '';
    do {
        let itemString = plural(itemObj.name,2);
        if( itemObj.unit ) {
            let unitName = ( nameForUnit[itemObj.unit] ) ? nameForUnit[itemObj.unit] : itemObj.unit;
            itemString = plural(unitName,2)+' of '+itemObj.name;
        }
        num = prompt( naughty+"How many "+itemString+" would you like to add?", itemObj.number );
        naughty = "Your input needs to be a number (≤ "+itemObj.number+").\n";
    }
    while( isNaN(num) || num>itemObj.number );
    return num;
}

function removeFromCollection( itemNum, collectionLabel ) {
    var itemObj = ch.collections[collectionLabel][itemNum];
    var itemName = (itemObj.name) ? itemObj.name : itemObj[0];
    // splice itemNum (the index of the item to remove) out of the indicated Collection
    ch.collections[collectionLabel].splice( itemNum, 1 );
    // need to reload Character before reloading the window
    loadCharacter( ch, 'remove '+itemName.substr(0,10) );
    // reload the window
    loadManageCollectionsMenus( collectionLabel );
}

// this function may once again be unnecessary, as I have added a reload to the removeFromCollection function
function applyChangesToCollections() {
    document.getElementById('manageCollectionsDialog').style.display='none';
    loadCharacter( ch );
}
// if so, then I might want to go back to having only a 'Done' button

// these three functions are very similar - can I combine them?
function deleteCollectionScript() {
    // get the label for the current Collection
    var collectionLabel = document.getElementById('collectionsMenu').value;
 //   alert('deleting '+collectionLabel);
    if( !collectionLabel ) return false;

    // delete the indicated collection from the ch.collections object
    delete ch.collections[collectionLabel];

    // refresh window
    ch.reorderCollections();
    loadManageCollectionsMenus();
 //   loadCharacter( ch, "Delete '"+collectionName+"' Collection" );
    loadCharacter( ch, "Delete Collection" );
}
function makeNewCollectionScript() {
    var collectionName = document.getElementById('newCollectionName').value;
    if( !collectionName ) return false;
    // create the collection and add it to Character object
    var newCollection = [ collectionName ];
   // alert('adding '+JSONstring.make(newCollection));
    var collectionLabel = collectionName.replace(/[\s\/\W]+/g,'');
    ch.collections[collectionLabel] = newCollection;
    // refresh window and reset the new Collection input
    ch.reorderCollections();
 //   loadCharacter( ch, "Create '"+collectionName+"' Collection" );
    loadCharacter( ch, "Create Collection" );
    loadManageCollectionsMenus( collectionLabel );
    // document.getElementById('newCollectionFormToggle').checked = false;
    // document.getElementById('newCollectionFormWrapper').style.visibility = 'hidden';
}
function renameCollectionScript() {
    // get the label for the current Collection
    var collectionLabel = document.getElementById('collectionsMenu').value;
    if( !collectionLabel ) return false;
    // get the new name text
    var newCollectionName = document.getElementById('collectionRename').value;
    // rename the Collection
    ch.collections[collectionLabel][0] = newCollectionName;
    // refresh window and reset the rename input
 //   loadCharacter( ch, "Rename Collection As '"+collectionName+"'" );
    loadCharacter( ch, "Rename Collection" );
    loadManageCollectionsMenus( collectionLabel );
    // document.getElementById('renameCollectionFormToggle').checked = false;
    // document.getElementById('renameCollectionFormWrapper').style.visibility = 'hidden';
}
function duplicateCollectionScript() {
    // get the label for the current Collection
    var collectionLabel = document.getElementById('collectionsMenu').value;
    if( !collectionLabel ) return false;
    // get the new name text
    var newCollectionName = document.getElementById('collectionDuplicate').value;
    // duplicate the Collection
    var CollSet = new Set( ch.collections[collectionLabel].slice(0) );
    // add the duplicate Collection with the new name
    var newCollLabel = newCollectionName.replace(/\s+|\W+/g,'');
    ch.collections[newCollLabel] = CollSet.array();
    ch.collections[newCollLabel][0] = newCollectionName;
    // refresh window and reset the duplicate input
    loadCharacter( ch, "clone Collection" );
    loadManageCollectionsMenus( newCollLabel );
}

function combineCollections( setOp ) {
    var CollAlabel = document.getElementById('collectionAMenu').value;
    var CollBlabel = document.getElementById('collectionBMenu').value;
    var newCollName = document.getElementById('combinedCollectionName').value;
    if( !( CollAlabel && CollBlabel && newCollName ) ) {
        alert('Choose a collection from each menu, and type a new collection name.');
        return false;
    }
    var CollASet = new Set( ch.collections[CollAlabel].slice(1) );
    var CollBSet = new Set( ch.collections[CollBlabel].slice(1) );
    var newCollLabel = newCollName.replace(/\s+/g,'');

    var newCollSet = CollASet[setOp](CollBSet);
   // alert(JSONstring.make(newCollSet));
    ch.collections[newCollLabel] = newCollSet.array();
    ch.collections[newCollLabel].unshift(newCollName);
    // refresh window and reset the input
    loadCharacter( ch, "Combine Collections" );
    loadManageCollectionsMenus( newCollLabel )
    // document.getElementById('collectionMathFormToggle').checked = false;
    // document.getElementById('collectionMathFormWrapper').style.visibility = 'hidden';
}

function removeDups(array) {
  let unique = {};
  array.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

function collectionArmorBodyPartSlice( collection, part, prop ) {
    // preserves collection order in slice
    var slice = [];
    for( var i=1; i<collection.length; i++ ) {
        var item = collection[i];
        if( !item.location ) continue;  // skip non-armor equipment
        if( !collection[i-1] || collection[i-1]!='wear' ) continue;  // skip non-worn items
        var what = ( item.location.indexOf(part)>=0 && item.hasOwnProperty(prop) ) ? item[prop] : 0;
        if( what ) slice.push( what );
    }
    return slice;
}

function equipWith( cLabel ) {
    ch.collections.equipped = cLabel;
    loadCharacter( ch, "Equip With Collection" );
}

function showCollectionContents( cLabel, event ) {
    var rowsHTML = ['','<colgroup><col /><col style="width:60px;text-align:right;" /></colgroup>'];
    rowsHTML.push('<style>#collectionPopup td {padding: 2px 8px 1px 15px;}</style>');
    rowsHTML.push('<tbody id="collectionPopup">');
    var zebra = 'class="zrow"';
    for( var i in ch.collections[cLabel] ) {
        if(i==0) continue;  // or make a header or something with the name
        zebra = ( zebra ) ? '' : 'class="zrow"';
        var item = ch.collections[cLabel][i];
        var Item = cloneEquipmentFromGenericObject(item);
        var num  = (item.number) ? item.number : 1;
        var quant = (num>1) ? num+' ' : '';
        if( item.hasOwnProperty('line') ) {
            rowsHTML.push('<tr><th colspan="2">'+item.line+'</th></tr>');
            continue;
        }
        var entry = ( item.hasOwnProperty('name') ) ? Item.print() : item[0]+' (collection)';
        var weight = ( item.hasOwnProperty('weight') ) ? actualWeight(item) : ch.totalEquipmentQuantity('actualWeight',ch.getCollectionLabelByName(item[0]));
        var wt = ( weight=='-' ) ? "&nbsp;&ndash;&nbsp;" : roundToSigFigs(num*weight)+'&nbsp;lb'+es(num*weight);
        rowsHTML.push('<tr '+zebra+'> <td>'+entry+'</td> <td style="text-align:right;">'+wt+'</td> </tr>');
    }
    rowsHTML.push('</tbody>');
    displayPopupList( event, rowsHTML.join("\n") );
}

function displayableLength( collection ) {
    var nonDisplayItems = 0;
    for( var i=0; i<collection.length; i++ ) {
        var item = collection[i];
        // this condition counts only things like 'wear', 'ready', etc. (formatting items are still objects)
       // if( typeof item != 'object' ) console.log("collection item "+i+" isn't an object, it's type is "+(typeof item));
        if( typeof item != 'object' ) nonDisplayItems++;
    }
    return collection.length - nonDisplayItems;
}

function makeModsPopupRows( trait ) {
    var rowsHTML = [];
    for( var i in trait.ConstantModsArray ) {
        var mod = trait.ConstantModsArray[i];
        var text = mod.text;
        var val  = mod.value;
        rowsHTML.push('<tr> <td>&ensp;'+text+'</td> <th style="text-align:right">'+signed(val)+'</th> <td></td> </tr>');
    }
    for( var i in trait.MultipliersArray ) {
        var mod = trait.MultipliersArray[i];
        var text = mod.text;
        var val  = (ch.preferences.display.fractions) ? makeHTMLfraction(mod.value) : mod.value;
        rowsHTML.push('<tr> <td>&ensp;'+text+'</td> <th style="text-align:right">&times;</th> <th>'+val+'</th> </tr>');
    }
    var modsTotal = 0;
    for( var i in trait.EnhLimsArray ) {
        var mod = trait.EnhLimsArray[i];
        var text = mod.text;
        var val  = mod.value;
        modsTotal += val;
        rowsHTML.push('<tr> <td>&ensp;'+text+'</td> <th style="text-align:right">'+signed(val)+'</th> <th>%</th> </tr>');
    }
    if(modsTotal<-80) {
        rowsHTML.push('<tr> <td colspan="3" style="text-align:center; font-style:italic">Total cost reflects maximum Limitations total of -80%</td> </tr>');
    }
    return rowsHTML;
}

function showLongTrait( tLabel, event ) {
    var rowsHTML = ['','<colgroup><col /><col style="width:30px;text-align:center;" /><col style="width:25px;text-align:left;" /></colgroup>'];
   // rowsHTML.push('<style>#longTraitPopup th {padding: 3px 15px;}</style>');
    rowsHTML.push('<tbody id="longTraitPopup">');
    var matches = tLabel.match(/(\D+)(\d*)/);
    var trait = ch.getTrait( matches[1], matches[2] );
 //   alert("ch.getTrait("+matches[1]+','+matches[2]+"):\n"+JSONstring.make(trait));
    var desc = (trait.description) ? ': '+trait.description : '';
    var lvlsName = ( trait.hasOwnProperty('levelsName') ) ? trait.levelsName : 'level'+es(trait.levels);    // not using?

    var baseCost = trait.cost;
    if( trait.hasOwnProperty('levels') ) {
        // add levels phrase
        baseCost += '/lvl &times; '+trait.levels+' level'+es(trait.levels);
        // if(fixedCost), wrap with 'fixedCost + (' and ')'   (you will NEVER have a fixedCost if you don't also have levels)
        if(trait.hasOwnProperty('fixedCost')) baseCost = trait.fixedCost+' &plus; ('+baseCost+')';
        // append ' = '+trait.finalCost()
        baseCost += ' = '+trait.finalCost(1);
    }
    rowsHTML.push('<tr class="zrow"> <th colspan="3" style="padding: 3px 15px;">'+trait.name+desc+'</th> </tr>');

    rowsHTML.push('<tr style="font-style:italic; font-size:0.85em;"> <td colspan="3" style="text-align:center">Cost before modifiers: '+baseCost+'&ensp;pts</td> </tr>');
    var modsRows = makeModsPopupRows( trait );
    var hasMods = modsRows.length;
    rowsHTML = rowsHTML.concat( modsRows );
    if( hasMods ) {
        rowsHTML.push('<tr style="text-align:right"> <th style="text-align:right">Total cost:</th> <th>'+trait.finalCost()+'</th> <th style="text-align:left">pts</th> </tr>');
        rowsHTML.push('</tbody>');
        displayPopupList( event, rowsHTML.join("\n") );
    }
}

function undo() {
 // alert('in undo, index '+document.undoIndex+" of:\n"+JSONstring.make(document.undoQueue));
		if( document.undoIndex==0 ) return false;
    /* transaction: Undo (and Redo) menu text (& dis/enable), undoIndex decrement, character object load */
    var redoText = document.undoQueue[ document.undoIndex ].change;
		document.undoIndex--;
		var queuedCharObj = document.undoQueue[ document.undoIndex ];
    // alter 'Undo' and/or 'Redo' text appropriately
    var undoTextSpan = document.getElementById('undoMenuText');
		if( document.undoIndex==0 ) { // this is after decrement; not redundant with the conditional above
		    // disable the 'Undo' menu item
		    undoTextSpan.style.color = 'grey';
            undoTextSpan.removeAttribute('onclick');
            undoTextSpan.className = 'disabled';
            undoTextSpan.innerHTML = "Can't Undo";
		}
		else {
		    undoTextSpan.innerHTML = 'Undo '+queuedCharObj.change;
		}
    var redoTextSpan = document.getElementById('redoMenuText');
    redoTextSpan.style.color = null;
    redoTextSpan.removeAttribute('class');
    redoTextSpan.setAttribute('onclick',"redo()");
    redoTextSpan.innerHTML = 'Redo '+redoText;
    // load the character retrieved from the queue
		loadCharacter( queuedCharObj.character, 'undo' ); // 'undo' cues loadCharacter to not call enqueue
		return false;
}
function redo() {
 // alert('in redo, index '+document.undoIndex+" of:\n"+JSONstring.make(document.undoQueue));
    if( document.undoIndex==document.undoQueue.length-1 ) return false;
    /* transaction: Redo (and Undo) menu text (& dis/enable), undoIndex increment, character object load */
    var undoText = document.undoQueue[ document.undoIndex ].change;
		document.undoIndex++;
		var queuedCharObj = document.undoQueue[ document.undoIndex ];
    // alter 'Undo' and/or 'Redo' text appropriately
    var redoTextSpan = document.getElementById('redoMenuText');
		if( document.undoIndex==document.undoQueue.length-1 ) {
		    // disable the 'Redo' menu item
		    redoTextSpan.style.color = 'grey';
		    redoTextSpan.removeAttribute('onclick');
		    redoTextSpan.className = 'disabled';
        redoTextSpan.innerHTML = "Can't Redo";
		}
		else {
        redoTextSpan.innerHTML = 'Redo '+queuedCharObj.change;
		}
    var undoTextSpan = document.getElementById('undoMenuText');
    undoTextSpan.style.color = null;
    undoTextSpan.removeAttribute('class');
    undoTextSpan.setAttribute('onclick',"undo()");
    undoTextSpan.innerHTML = 'Undo '+undoText;
    // load the character retrieved from the queue
		loadCharacter( queuedCharObj.character, 'redo' ); // 'redo' cues loadCharacter to not call enqueue
		return false;
}
function enqueueLoadedCharacter( changeText ) {
    // The call to this function is filtered so that here we can assume that the loaded character is not an 'undo' or a 'redo'.
 // alert('in enqueueLoadedCharacter, text is '+changeText);
    // start by enabling the 'Undo' menu item if it's there (it may be enabled already)
    var undoTextSpan = document.getElementById('undoMenuText');
    if( undoTextSpan ) {
        undoTextSpan.style.color = null;
        undoTextSpan.removeAttribute('class');
        undoTextSpan.removeAttribute('class');
        undoTextSpan.setAttribute('onclick',"undo()");
    }
    if( changeText==null ) {
		    // disable the 'Undo' menu item
		    if( undoTextSpan ) {
            undoTextSpan.style.color = 'grey';
            undoTextSpan.removeAttribute('onclick');
		    }
        // zero queue, initialize index
        document.undoQueue = [];
        document.undoIndex = 0;
    }
    if( document.undoIndex != document.undoQueue.length-1 ) {
        // User has backed up into the undo queue before making NEW changes and activating loadCharacter;
        // need to clip off the now-irrelevant end of the queue before enqueue-ing this Character.
        document.undoQueue = document.undoQueue.slice( 0, document.undoIndex+1 );
        // document.undoQueue.splice( document.undoIndex, document.undoQueue.length-(document.undoIndex+1) );
        document.undoIndex = document.undoQueue.length - 1;
    }
    /* transaction: Undo menu text (& dis/enable), undoIndex increment/reset, undo object push */
    // create and save queued Character object
    var queuedCharObj = {
        character: document.loadedCharacter.clone(),
        change:    changeText
    };
    document.undoQueue.push( queuedCharObj );
    // if I want an undo limit, this is where to impose that (by clipping the 'beginning' of the queue)
    // set the undoIndex
    document.undoIndex = document.undoQueue.length - 1;   // can't just increment, may have cut queue
    if( document.undoIndex ) {  // put change text (if any) in the Undo menu
        if( changeText ) undoTextSpan.innerHTML = 'Undo '+changeText;
    }
    return false;
}


/* Character-Building */

function clearRowHighlights( table ) {    // use singular, i.e. 'trait' or 'skill'
    let row = 1;
    let rowElmt = document.getElementById(table+row);
    while( rowElmt ) {
        $('#'+table+row).removeClass('ready');
        rowElmt = document.getElementById(table+row++);
    }
}
function addFormatRow( table, line ) {

    let lineValue = ( line.match(/head/i) ) ? prompt('heading text:','') : false;
    ch[table+'s'].push( { line: lineValue } );

}

// Traits
function selectTraitsDialog( selectedValue, sortKey ) {

    // console.log("[selectTraitsDialog] selectedValue: "+selectedValue+"; sortKey:"+sortKey);

   // document.getElementById('selectTraitLevelsWrapper').style.visibility='hidden';

    if( !selectedValue ) selectedValue = document.getElementById('selectTraitMenu').value;
    if( !sortKey ) sortKey = document.getElementById('selectTraitSort').value;
    if( !sortKey ) sortKey = 'name';
    // console.log("[selectTraitsDialog] after getElementById's:\n  selectedValue: "+selectedValue+"; sortKey:"+sortKey);

    document.getElementById('selectCustomTraitLevels').innerHTML
        = makeNumberOptions( 0, 10, "            " );

    // get filter inputs
    var adsFilter = document.selectTraitsForm.adsCheckbox.checked;
    var ddsFilter = document.selectTraitsForm.disadsCheckbox.checked;
    var phsFilter = document.selectTraitsForm.physicalCheckbox.checked;
    var mntFilter = document.selectTraitsForm.mentalCheckbox.checked;
    var socFilter = document.selectTraitsForm.socialCheckbox.checked;
    var grpFilter = document.selectTraitsForm.groupsCheckbox.checked;
    var munFilter = document.selectTraitsForm.mundaneCheckbox.checked;
    var corFilter = document.selectTraitsForm.coreRulesCheckbox.checked;
    var cinFilter = document.selectTraitsForm.cinematicCheckbox.checked;
    var exoFilter = document.selectTraitsForm.exoticsCheckbox.checked;
    var supFilter = document.selectTraitsForm.supernaturalsCheckbox.checked;
 // alert("phsFilter: "+phsFilter+"\nmntFilter: "+mntFilter+"\nsocFilter: "+socFilter);
    // keep in mind that these are 'true' when the box is checked, which means SHOW those things.
    if( ch.gameInfo.ruleset.match(/e4/) ) { $('#traitsCoreRulesFilterRow').hide(); }

    // sort items from the Traits data object according to the sort key
    var traitItems = [];
    for( var memberName in Traits ) {
        var Trait = Traits[memberName];     /*.clone()*/
        traitItems.push( { key: memberName, value: Trait } );
    }
    // sort by name every time, so that other sorts will give results sorted within categories
    traitItems.sort(
        function(a,b) {
            if( !a.name && !b.name ) return 0;
            if( !a.name ) return -1;
            if( !b.name ) return  1;
            if( a.name.toLowerCase() < b.name.toLowerCase() ) return -1;
            if( a.name.toLowerCase() > b.name.toLowerCase() ) return  1;
            return 0;
        }
    );
    // then do the key sort
    traitItems.sort(
        function(a,b) {
            if( !a.value[sortKey] && !b.value[sortKey] ) return 0;
            if( !a.value[sortKey] ) return -1;
            if( !b.value[sortKey] ) return  1;
            if( isNaN(a.value[sortKey]) && isNaN(b.value[sortKey]) ) {
                if( a.value[sortKey].toLowerCase() < b.value[sortKey].toLowerCase() ) return -1;
                if( a.value[sortKey].toLowerCase() > b.value[sortKey].toLowerCase() ) return  1;
                return 0;
            }
            else { return a.value[sortKey] - b.value[sortKey]; }
        }
    );
 //   alert(traitItems.length);
    //    traitItems.push( { key: 'spacer',  value: Traits.spacer } );
    //    traitItems.push( { key: 'heading', value: Traits.heading } );

    // loop over (sorted) ads/disads in the traitItems object to fill menu options
    var selectTraitMenuOptionsHTML = new Array();
    var savedVal;
  Traits:
    for( var n in traitItems ) {
        var protoTraitName = traitItems[n].key;
        var protoTrait = traitItems[n].value;
        if( protoTrait.name ) {  // filter out non-Trait attributes of the Traits object
            // console.log("[selectTraitsDialog] processing "+protoTrait.name+" trait:"); console.log(protoTrait);

            /* filter out various subclasses */
            // filter for ruleset compatibility
            if(  protoTrait.ruleset && protoTrait.ruleset != ch.gameInfo.ruleset ) { continue; }  // needs to be made Ruleset object compliant
            // filter for type Advantage/Perk vs Disadvantage/Quirk
            if( !protoTrait.type.match(/A|P/i) && !ddsFilter ) { continue; }
            if( !protoTrait.type.match(/D|Q/i) && !adsFilter ) { continue; }
            // filter by physMntlScl class
            if( !protoTrait.physMntlScl.match(/M|So/i)   && !phsFilter ) { continue; }
            if( !protoTrait.physMntlScl.match(/P|So/i)   && !mntFilter ) { continue; }
            if( !protoTrait.physMntlScl.match(/M|P/i)    && !socFilter ) { continue; }
            if( !protoTrait.physMntlScl.match(/So/i)     && !phsFilter && !mntFilter )  { continue; }   // filters out 'PM' traits if only 'Social' remains ticked
            if( !protoTrait.physMntlScl.match(/M/i)      && !phsFilter && !socFilter )  { continue; }   // similar, for 'PSo' (of which there are none right now)
            if( !protoTrait.physMntlScl.match(/P/i)      && !mntFilter && !socFilter )  { continue; }   // similar, for 'MSo'
            // Core Rules filter
            if( !protoTrait.reference.match(/B\d+E/i)    &&  corFilter ) { continue; }
            // filter cinematic traits
            if(  protoTrait.cinematic                    && !cinFilter ) { continue; }
            // filter by exoticSprntl class
            if( !protoTrait.exoticSprntl                 && !munFilter ) { continue; }
            if(  protoTrait.exoticSprntl=='Exotic'       && !exoFilter ) { continue; }
            if(  protoTrait.exoticSprntl=='Supernatural' && !supFilter ) { continue; }

            // filter on prerequisites
            var disableNoPrereq = '';
            // find matching Prerequisite objects!!
            let matchingPrereqs = structuredPrereqsFor( protoTrait );
          PREREQS:
            for( let pgp in matchingPrereqs ) {           // a set of matchingPrereqs is a structured 'and'; you must satisfy ALL of these
                var pgroupList = matchingPrereqs[pgp];    // a pgroupList is always an 'or' group of prerequisites; you only have to satisfy one
                // if(pgroupList.length) console.log(pgroupList);
                // now iterate over the pgroup list of prerequisite objects
                var pgroupSatisfied = false;    // Set to 'true' whenever a prerequisite is satisfied.
              PGROUPLIST:
                for( var k=0; k<pgroupList.length; k++ ) {
                    var prereqItem = pgroupList[k];
                    // console.log(prereqItem);
                    if( ch.hasThisPrereq( prereqItem ) ) {
                        pgroupSatisfied = true;
                        break PGROUPLIST;
                    }
                }
                // If at least one of the Prerequisites in a pgroup list is satisfied, pgroupSatisfied gets set to 'true'.
                // But if the loop over a pgroup list finishes with NO Prerequisites in that list satisfied, pgroupSatisfied remains 'false'.
                // In the 'false' case we must set disableNoPrereq to ' disabled="disabled"', and break out of the PREREQS loop over the matchingPrereqs object.
                if( !pgroupSatisfied ) {
                    disableNoPrereq = ' disabled="disabled"';
                    break PREREQS;
                }
                //  if code reaches this point without hitting the PREREQS break, disableNoPrereq will be ''.
            } // end loop over matchingPrereqs object.
            // console.log(disableNoPrereq);

            var asx = '';
            var chTrait = ch.getTrait(protoTraitName);  // gets 'false' if Character doesn't have it
            if( chTrait ) {
          			// console.log(ch.firstName()+' has '+chTrait.name);		console.log(chTrait);
               // if( chTrait.levels==0 ) {}
                // mark or omit already-taken ads/disads
                if( chTrait.multiple ) { asx = '*'; }  // mark with * but print anyway
                else { continue; }
            }
            // also omit ads/disads in a group already taken
            if( !grpFilter && protoTrait.group && ch.hasTraitGroup(protoTrait.group) )
                { continue Traits; }

            // color ads green and disads red; some will remain black (e.g. 'Ally')
            var color = 'black';
//             if(protoTrait.cost<0) { color = 'darkred'; }
//             if(protoTrait.cost>0) { color = 'darkgreen'; }
            var traitsort = protoTrait.type;
            if( traitsort.match(/A/i) && traitsort.match(/D/i) ) { color = 'black'; }
            else if( traitsort.match(/Q/i) ) { color = 'purple'; }
            else if( traitsort.match(/D/i) ) { color = 'darkred'; }
            else if( traitsort.match(/P/i) ) { color = 'teal'; }
            else if( traitsort.match(/A/i) ) { color = 'darkgreen'; }
            if( disableNoPrereq ) { color = 'grey'; }
            var bgcolor = '';
            if(protoTrait.cost<0) { bgcolor = 'mistyrose'; }
            if(protoTrait.cost>0) { bgcolor = 'honeydew'; }

            // put in an optgroup divider, for certain sort keys (large categories)
            var skVal = protoTrait[sortKey];
            if( sortKey.match(/cost|physMntlScl|exoticSprntl|group/) && skVal!=savedVal ) {
                var label = skVal;
                if( skVal=='M' ) label = 'Mental';
                if( skVal=='P' ) label = 'Physical';
                if( skVal=='MP') label = 'Mental/Physical';
                if( skVal=='So') label = 'Social';
                if(n!=0) selectTraitMenuOptionsHTML.push('          </optgroup>');
                selectTraitMenuOptionsHTML.push('          <optgroup label="'+label+'">');
            }

            var selected = ( selectedValue && selectedValue==protoTraitName ) ? 'selected="selected"' : '';

            // push option for this trait
            var ref = protoTrait.reference;
            var title = ( ref ) ? expandMiniref( ref, true ) : 'ref for '+protoTraitName;
            title += ( disableNoPrereq ) ? '; missing prerequisites' : '';
            selectTraitMenuOptionsHTML.push('            <option style="color:'+color+'" value="'+protoTraitName+'" title="'+title+'" '+disableNoPrereq+selected+'>'+protoTrait.name+asx+'</option>');
        }
        else {
            selectTraitMenuOptionsHTML.push('            <option value="'+protoTraitName+'">['+protoTraitName+' row]</option>');
        }
        savedVal = skVal;
    }
    selectTraitMenuOptionsHTML.push('          ');
    // clear enhancements/limitations table
//     document.getElementById('newTraitEnhanceLimitsTable').innerHTML = "";
//     document.getElementById('newTraitEnhanceLimitRows').value = 0;
    document.getElementById('newTraitEnhanceLimitRows').value = 0;
    // clear multiplier table and hide
//    document.getElementById('newTraitMultipliersTableTbody').innerHTML = "";
    document.getElementById('newTraitMultiplierRows').value = 0;
    // clear 'constant' modifier table and hide
//     document.getElementById('newTraitConstantModsTableTbody').innerHTML = "";
    document.getElementById('newTraitConstantModRows').value = 0;
    // initialize other form elements
    document.getElementById('TraitNote').innerHTML = '&nbsp;';
    document.getElementById('selectTraitMenu').innerHTML = selectTraitMenuOptionsHTML.join("\n");
    document.getElementById('describeTrait').removeAttribute('value');
    document.getElementById('selectTraitSubmit').value = 'take this trait';
  //  document.getElementById('selectTraitSubmit').disabled = 'disabled';
    setupDialog('selectTraitDialog');
    // custom trait options menus
    var traitOptionsHTML
        = makeObjectOptions( makeSortedKeyItemList( Traits, 'name' ), false, '                ' );
    document.getElementById('customTraitPrerequisiteTraitMenu').innerHTML = traitOptionsHTML;
    document.getElementById( 'customTraitAdjustingTraitMenu'  ).innerHTML = traitOptionsHTML;
    var skillsOptionsHTML
        = makeObjectOptions( makeSortedKeyItemList( Skills, 'name' ), false, '                ' );
    document.getElementById('customTraitAdjustsSkillMenu').innerHTML    = skillsOptionsHTML;

    if( selectedValue ) showTraitInfoInDialog(selectedValue);

    // $('#trait'+(ch.traits.length+1)).addClass('ready');    // SHOULD be highlightTargetPosition('traits') or something

    return false;
}

function spendingLimit( pos ) {
    var unspentPoints = ch.description.pointTotal - ch.totalPoints();
  //  alert("unspent points:\n"+unspentPoints);
    var disadQuirkPointsLimit = ch.gameInfo.disadPointsLimit + ch.gameInfo.quirkPointsLimit;
  //  alert("limit:\n"+disadQuirkPointsLimit);
    var unusedDisadPoints = disadQuirkPointsLimit + ch.disadsQuirksPoints();
  //  alert("unusedDisadPoints:\n"+unusedDisadPoints);
    return ( pos ) ? unspentPoints+unusedDisadPoints : unusedDisadPoints;
}

var savedChoiceGpID = '';
function addNewEnhLimDivRow( IDprefix, choiceGpID ) {
    var enhLimRows = document.getElementById(IDprefix+'EnhanceLimitRows').value;
    enhLimRows++;
    var IDstring = IDprefix+'EnhanceLimit'+enhLimRows;
    var newWrapperDiv = document.createElement("div");
    newWrapperDiv.setAttribute('id',IDprefix+'EnhanceLimit'+enhLimRows+'Wrapper');
    newWrapperDiv.setAttribute('style',"clear:both;");
    // alert(choiceGpID);
    if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
    		var checked = (choiceGpID) ? '' : ' checked="checked"';
    		newWrapperDiv.innerHTML += "\n              "+'<input type="checkbox"'+checked+' id="toggle_'+IDstring+'" title="apply" onclick="toggleModifier(this)">';
    }
    if( choiceGpID ) {
		    newWrapperDiv.innerHTML += "\n              "+'<input type="radio" name="'+choiceGpID+'" id="choose_'+IDstring+'" title="select" disabled="disabled" onchange="chooseModifier(this)">';
    }
		newWrapperDiv.innerHTML += "\n              "+'<input id="'+IDstring+'Text" style="width:220px;" />';
		newWrapperDiv.innerHTML += "\n              "+'<input id="'+IDstring+'Value" style="width:25px; text-align:right;" type="text" onchange="updateTraitCost(this.form)" />%';
		newWrapperDiv.innerHTML += "\n            ";
		document.getElementById(IDprefix+'EnhanceLimitsTable').appendChild(newWrapperDiv);
		document.getElementById(IDprefix+'EnhanceLimitsTable').innerHTML += "\n            ";
    document.getElementById(IDprefix+'EnhanceLimitRows').value = enhLimRows;
    return IDstring;
}
function addNewModDivRow( IDprefix, modType, choiceGpID ) {
    var modRows = document.getElementById(IDprefix+modType+'Rows').value;
    modRows++;
    var IDstring = IDprefix+modType+modRows;
    var newWrapperHTMLarray = ['','<div id="'+IDprefix+modType+modRows+'Row" style="clear:both;">'];
    if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
    		var checked = (choiceGpID) ? '' : ' checked="checked"';
    		newWrapperHTMLarray.push('  <div style="width:20px;"><input type="checkbox"'+checked+' id="toggle_'+IDstring+'" title="apply" onclick="toggleModifier(this)"></div>');
    }
    else {
        newWrapperHTMLarray.push('  <div style="width:20px;">&nbsp;</div>');
    }
    if( choiceGpID ) {
		    newWrapperHTMLarray.push('  <div style="width:20px;"><input type="radio" name="'+choiceGpID+'" id="choose_'+IDstring+'" title="select" disabled="disabled" onchange="chooseModifier(this)"></div>');
    }
    else {
        newWrapperHTMLarray.push('  <div style="width:20px;">&nbsp;</div>');
    }
		newWrapperHTMLarray.push('  <div style="width:70%; padding-right:10px;"><input id="'+IDstring+'Text" style="width:100%;" /></div>');
    let pct = (modType=='EnhanceLimit') ? '%' : '';
    let tms = (modType=='Multiplier') ? '&times;' : '';
    let wth = 8;  if(modType=='Multiplier') wth = 9;  if(modType=='ConstantMod') wth = 11;
    let aln = (modType=='EnhanceLimit') ? 'right' : 'left';
    newWrapperHTMLarray.push('  '+tms+'<input id="'+IDstring+'Value" type="text" style="width:'+wth+'%; text-align:'+aln+';" onchange="updateTraitCost(this.form)" />'+pct);
    newWrapperHTMLarray.push('</div>');
		//document.getElementById(IDprefix+modType+'sTable').appendChild(newWrapperDiv);
		document.getElementById(IDprefix+modType+'sTable').insertAdjacentHTML( 'beforeend', newWrapperHTMLarray.join("\n                  ") );
    document.getElementById(IDprefix+modType+'Rows').value = modRows;
    return IDstring;
}
function makeModsTbodyInputGroup( IDprefix, Modifier, modnum ) {    // console.log(Modifier);
    let groupType = '';
    for( let g in Modifier ) {    // loop over subgroups (e.g., the 'point value' or 'group size' subgroups of the 'Ally' Modifier)
        var subGroup = Modifier[g];   // an array of ModItem objects, like the group that all have text like 'point value: ##' in the (4e) 'Ally' Modifier object.  all ModItem objects in a group will (must!) share a 'type'.
        var choiceGpID = (subGroup.length>1) ? 'group'+modnum+g : '';    // group ID defined by structure of Modifier object
        let rowHTML = [''];
        let cbID = '';
        let required = false;
        groupType = subGroup[0].type;
        //  console.log("choiceGpID: '"+choiceGpID+"'");
        for( let m in subGroup ) {    // loop over modifier items in subgroup
            let modItem = subGroup[m];    //  (e.g. { text: "point value: 50%  of PC", mod: 2,  type: 'constantMod' }; may also have 'levels' or 'required' properties)
            // console.log(JSONstring.make(modItem));
            let plus = (modItem.type=='multiplier' || modItem.mod=='') ? '' : '+';
            let modInputID;
            let CapitalizedType = modItem.type.charAt(0).toUpperCase() + modItem.type.substr(1);
            // console.log("setting thisModTypeRows = document.getElementById('"+IDprefix+CapitalizedType+"Rows')");
            let thisModTypeRows = document.getElementById(IDprefix+CapitalizedType+'Rows').value;
            thisModTypeRows++;
            let IDstring = IDprefix+CapitalizedType+thisModTypeRows;
            let textDisabled = 'disabled="disabled"';
            let valuDisabled = 'disabled="disabled"';
            let radioChecked = '';
            if( modItem.required ) {
                required = true;
                textDisabled = '';
                valuDisabled = '';
                radioChecked = 'checked="checked"';
            }
            // build rows
            rowHTML.push('  <tr id="'+IDstring+'Row">');
            // console.log("group: "+choiceGpID+", saved group: "+savedChoiceGpID);
            if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
                cbID = 'toggle_'+IDstring;
                rowHTML.push('    <td><input type="checkbox" id="toggle_'+IDstring+'" title="apply" onclick="toggleModifier(this)"></td>');
            }
            else {
                rowHTML.push('    <td></td>');
            }
            if( choiceGpID ) {
                rowHTML.push('    <td><input type="radio" name="'+choiceGpID+'" id="choose_'+IDstring+'" '+radioChecked+' title="select" disabled="disabled" onchange="chooseModifier(this)"></td>');
            }
            else {
                rowHTML.push('    <td></td>');
            }
            rowHTML.push('    <td><input id="'+IDstring+'Text" value="'+modItem.text+'" '+textDisabled+' /></td>'); /*style="width:200px;"*/
            let modVal = (modItem.mod<0) ? modItem.mod : plus+modItem.mod;
            let pct = (modItem.type=='enhanceLimit') ? '%' : '';
            let tms = (modItem.type=='multiplier') ? '&times;' : '';
            let wth = 8;  if(modItem.type=='multiplier') wth = 9;  if(modItem.type=='constantMod') wth = 11;
            let aln = (modItem.type=='enhanceLimit') ? 'right' : 'left';
            rowHTML.push('    <td>'+tms+'<input id="'+IDstring+'Value" value="'+modVal+'" style="width:'+wth+'%; text-align:'+aln+';" type="text" onchange="updateTraitCost(this.form)" '+valuDisabled+' />'+pct+'</td>'); /*style="width: 50px;"*/
            rowHTML.push('  </tr>');
            // console.log(modItem.type);
            // console.log(modInputID);
            savedChoiceGpID = choiceGpID;
            document.getElementById(IDprefix+CapitalizedType+'Rows').value = thisModTypeRows;
        }
        rowHTML.push('');
        //console.log(rowHTML);
        if( groupType=='multiplier'  ) document.getElementById(IDprefix+'MultipliersTableTbody').insertAdjacentHTML( 'beforeend', rowHTML.join("\n                  ") );
        if( groupType=='constantMod' ) document.getElementById(IDprefix+'ConstantModsTable'    ).insertAdjacentHTML( 'beforeend', rowHTML.join("\n                  ") );
        if( groupType=='enhanceLimit') document.getElementById(IDprefix+'EnhanceLimitsTable'   ).insertAdjacentHTML( 'beforeend', rowHTML.join("\n                  ") );
        // console.log("group: "+choiceGpID+" ('"+subGroup[0].text.split(/\s+/)[0]+"', "+groupType+", length "+subGroup.length+")\n  required: "+required);
        if( required ) {
        		// console.log('simulating click on DOM element '+cbID);
            let cb = document.getElementById(cbID);
            simulate( cb, 'click' );  // doing it this way enables all the radio buttons in the group
            if(subGroup.length>1) cb.disabled = true;
        }
    }
}
function makeModsDivInputGroup( IDprefix, Modifier, modnum ) {    //console.log(Modifier);
    let groupType = '';
    for( let g in Modifier ) {    // loop over subgroups (e.g., the 'point value' or 'group size' subgroups of the 'Ally' Modifier)
        var subGroup = Modifier[g];   // an array of ModItem objects, like the group that all have text like 'point value: ##' in the (4e) 'Ally' Modifier object.  all ModItem objects in a group will (must!) share a 'type'.
        var choiceGpID = (subGroup.length>1) ? 'group'+modnum+g : '';    // group ID defined by structure of Modifier object
        let rowdivHTML = [''];
        let cbID = '';
        let required = false;
        groupType = subGroup[0].type;
        let CapitalizedType = groupType.charAt(0).toUpperCase() + groupType.substr(1);
        //  console.log("choiceGpID: '"+choiceGpID+"'");
        for( let m in subGroup ) {    // loop over modifier items in subgroup
            let modItem = subGroup[m];    //  (e.g. { text: "point value: 50%  of PC", mod: 2,  type: 'constantMod' }; may also have 'levels' or 'required' properties)
            // console.log(JSONstring.make(modItem));
            let plus = (modItem.type=='multiplier' || modItem.mod=='') ? '' : '+';
            let modInputID;
            // let CapitalizedType = modItem.type.charAt(0).toUpperCase() + modItem.type.substr(1);   // moved to before loop; mmmaybe some cases where this matters?
            // console.log("setting thisModTypeRows = document.getElementById('"+IDprefix+CapitalizedType+"Rows')");
            let thisModTypeRows = document.getElementById(IDprefix+CapitalizedType+'Rows').value;
            thisModTypeRows++;
            let IDstring = IDprefix+CapitalizedType+thisModTypeRows;
            let textDisabled = 'disabled="disabled"';
            let valuDisabled = 'disabled="disabled"';
            let radioChecked = '';
            if( modItem.required ) {
                required = true;
                textDisabled = '';
                valuDisabled = '';
                radioChecked = 'checked="checked"';
            }
            // build rows
            rowdivHTML.push('  <div id="'+IDstring+'Row">');
            // console.log("group: "+choiceGpID+", saved group: "+savedChoiceGpID);
            if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
                cbID = 'toggle_'+IDstring;
                rowdivHTML.push('    <div style="width:20px;"><input type="checkbox" id="toggle_'+IDstring+'" title="apply" onclick="toggleModifier(this)"></div>');
            }
            else {
                rowdivHTML.push('    <div style="width:20px;">&nbsp;</div>');
            }
            if( choiceGpID ) {
                rowdivHTML.push('    <div style="width:20px;"><input type="radio" name="'+choiceGpID+'" id="choose_'+IDstring+'" '+radioChecked+' title="select" disabled="disabled" onchange="chooseModifier(this)"></div>');
            }
            else {
                rowdivHTML.push('    <div style="width:20px;">&nbsp;</div>');
            }
            rowdivHTML.push('    <div style="width:70%; padding-right:10px;"><input id="'+IDstring+'Text" value="'+modItem.text+'" '+textDisabled+' style="width:100%" /></div>'); /*style="width:200px;"*/

            let modVal = (modItem.mod<0) ? modItem.mod : plus+modItem.mod;
            let pct = (modItem.type=='enhanceLimit') ? '%' : '';
            let tms = (modItem.type=='multiplier') ? '&times;' : '';
            let wth = 8;  if(modItem.type=='multiplier') wth = 9;  if(modItem.type=='constantMod') wth = 11;
            let aln = (modItem.type=='enhanceLimit') ? 'right' : 'left';
            rowdivHTML.push('    '+tms+'<input id="'+IDstring+'Value" value="'+modVal+'" style="width:'+wth+'%; text-align:'+aln+';" type="text" onchange="updateTraitCost(this.form)" '+valuDisabled+' />'+pct); /*style="width: 50px;"*/

            rowdivHTML.push('  </div>');
            // console.log(modItem.type);
            // console.log(modInputID);
            savedChoiceGpID = choiceGpID;
            document.getElementById(IDprefix+CapitalizedType+'Rows').value = thisModTypeRows;
        }
        rowdivHTML.push('');
        //console.log(rowdivHTML);
        document.getElementById(IDprefix+CapitalizedType+'sTable').insertAdjacentHTML( 'beforeend', rowdivHTML.join("\n                  ") );
        // console.log("group: "+choiceGpID+" ('"+subGroup[0].text.split(/\s+/)[0]+"', "+groupType+", length "+subGroup.length+")\n  required: "+required);
        if( required ) {
        		// console.log('simulating click on DOM element '+cbID);
            let cb = document.getElementById(cbID);
            simulate( cb, 'click' );  // doing it this way enables all the radio buttons in the group
            if(subGroup.length>1) cb.disabled = true;
        }
    }
}
/*    deprecated functions that added modifier rows to various forms using the insertRow() DOM function - very very slowly!!
function addNewEnhLimRow( IDprefix, choiceGpID ) {
    var enhLimRows = document.getElementById(IDprefix+'EnhanceLimitRows').value;
    var newWrapperTR = document.getElementById(IDprefix+'EnhanceLimitsTable').insertRow(enhLimRows);
    enhLimRows++;
    var IDstring = IDprefix+'EnhanceLimit'+enhLimRows;
    newWrapperTR.setAttribute('id',IDprefix+'EnhanceLimit'+enhLimRows+'Row');
    // if there isn't a group ID, or this isn't the first row in a group, put a checkbox
    if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
        var checked = (choiceGpID) ? '' : ' checked="checked"';
        newWrapperTR.innerHTML += "\n              "+'<td><input type="checkbox"'+checked+' id="toggle_'+IDstring+'" title="apply" onclick="toggleModifier(this)"></td>';
    }
    else {
        newWrapperTR.innerHTML += "\n              "+'<td></td>';
    }
		// if there is a group ID, put a radio button
    if( choiceGpID ) {
        newWrapperTR.innerHTML += "\n              "+'<td><input type="radio" name="'+choiceGpID+'" id="choose_'+IDstring+'" title="select" disabled="disabled" onchange="chooseModifier(this)"></td>';
    }
    else {
        newWrapperTR.innerHTML += "\n              "+'<td></td>';
    }
    newWrapperTR.innerHTML     += "\n              "+'<td style="width:200px;"><input id="'+IDstring+'Text" value="my text" /></td>';
    newWrapperTR.innerHTML     += "\n              "+'<td style="width: 50px;"><input id="'+IDstring+'Value" style="width:24px; text-align:left;" type="text" onchange="updateTraitCost(this.form)" />%</td>';
    newWrapperTR.innerHTML     += "\n            ";
    document.getElementById(IDprefix+'EnhanceLimitRows').value = enhLimRows;
    savedChoiceGpID = choiceGpID;
    return IDstring;
}
function addNewMultiplierRow( IDprefix, choiceGpID ) {
    var multRows = document.getElementById(IDprefix+'MultiplierRows').value;
    var newWrapperTR = document.getElementById(IDprefix+'MultipliersTable').insertRow(multRows);
    multRows++;
    var IDstring = IDprefix+'Multiplier'+multRows;
		newWrapperTR.setAttribute('id',IDprefix+'Multiplier'+multRows+'Row');
		// if there isn't a group ID, or this isn't the first row in a group, put a checkbox
    if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
    		var checked = (choiceGpID) ? '' : ' checked="checked"';
    		newWrapperTR.innerHTML += "\n              "+'<td><input type="checkbox"'+checked+' id="toggle_'+IDstring+'" title="apply" onclick="toggleModifier(this)"></td>';
    }
    else {
    		newWrapperTR.innerHTML += "\n              "+'<td></td>';
    }
		// if there is a group ID, put a radio button
    if( choiceGpID ) {
		    newWrapperTR.innerHTML += "\n              "+'<td><input type="radio" name="'+choiceGpID+'" id="choose_'+IDstring+'" title="select" disabled="disabled" onchange="chooseModifier(this)"></td>';
    }
    else {
    		newWrapperTR.innerHTML += "\n              "+'<td></td>';
    }
    newWrapperTR.innerHTML     += "\n              "+'<td style="width:200px;"><input id="'+IDstring+'Text" /></td>';
    newWrapperTR.innerHTML     += "\n              "+'<td style="width: 50px;">&times;<input id="'+IDstring+'Value" style="width:28px; text-align:left;" type="text" onchange="updateTraitCost(this.form)" /></td>';
    newWrapperTR.innerHTML     += "\n            ";
    document.getElementById(IDprefix+'MultiplierRows').value = multRows;
    savedChoiceGpID = choiceGpID;
    return IDstring;
}
function addNewConstantModRow( IDprefix, choiceGpID ) {
    var cmodRows = document.getElementById(IDprefix+'ConstantModRows').value;
    var newWrapperTR = document.getElementById(IDprefix+'ConstantModsTable').insertRow(cmodRows);
    cmodRows++;
    var IDstring = IDprefix+'ConstantMod'+cmodRows;
    newWrapperTR.setAttribute('id',IDprefix+'ConstantMod'+cmodRows+'Row');
	// if there isn't a group ID, or this isn't the first row in a group, put a checkbox
    if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
        var checked = (choiceGpID) ? '' : ' checked="checked"';
        newWrapperTR.innerHTML += "\n              "+'<td><input type="checkbox"'+checked+' id="toggle_'+IDstring+'" title="apply" onclick="toggleModifier(this)"></td>';
    }
    else {
        newWrapperTR.innerHTML += "\n              "+'<td></td>';
    }
    // if there is a group ID, put a radio button
    if( choiceGpID ) {
        newWrapperTR.innerHTML += "\n              "+'<td><input type="radio" name="'+choiceGpID+'" id="choose_'+IDstring+'" title="select" disabled="disabled" onchange="chooseModifier(this)"></td>';
    }
    else {
        newWrapperTR.innerHTML += "\n              "+'<td></td>';
    }
    newWrapperTR.innerHTML     += "\n              "+'<td style="width:200px;"><input id="'+IDstring+'Text" /></td>';
    newWrapperTR.innerHTML     += "\n              "+'<td style="width: 50px;"><input id="'+IDstring+'Value" style="width:36px; text-align:left;" type="text" onchange="updateTraitCost(this.form)" /></td>';
    newWrapperTR.innerHTML     += "\n            ";
    document.getElementById(IDprefix+'ConstantModRows').value = cmodRows;
    savedChoiceGpID = choiceGpID;
    return IDstring;
}
// using this combined function will require some changes to Enhancement/Limitation HTML (sometimes EnhLim, sometimes EnhanceLimit, etc)
function addNewModifierRow( IDprefix, modifier, choiceGpID ) {
    var modRows = document.getElementById(IDprefix+modifier+'Rows').value;
    modRows++;
		var newWrapperDiv = document.createElement("div");
		newWrapperDiv.setAttribute('id',IDprefix+modifier+modRows+'Wrapper');
		newWrapperDiv.setAttribute('style',"clear:both;");
    // newWrapperDiv.innerHTML  = "\n            "+'<a><img id="delete_'+IDprefix+modifier+modRows+'" src="../images/icon_delete.gif" title="delete" onclick="toggleModifier(this)"></a>';
    if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
		    newWrapperDiv.innerHTML += "\n            "+'<input type="checkbox" checked="checked" id="toggle_'+IDprefix+modifier+modRows+'" title="apply" onclick="toggleModifier(this)">';
    }
    if( choiceGpID ) {
		    newWrapperDiv.innerHTML += "\n            "+'<input type="radio" name="'+choiceGpID+'" id="choose_'+IDprefix+'EnhanceLimit'+modRows+'" title="select" onchange="chooseModifier(this)">';
    }
		newWrapperDiv.innerHTML += "\n            "+'<input id="'+IDprefix+modifier+modRows+'Text" style="width:100%;" />';
		newWrapperDiv.innerHTML += "\n            "+'<input id="'+IDprefix+modifier+modRows+'Value" style="width:30px; text-align:left;" type="text" onchange="updateTraitCost(this.form)" />%';
		document.getElementById(IDprefix+modifier+'sWrapper').appendChild(newWrapperDiv);
    document.getElementById(IDprefix+modifier+'Rows').value = modRows;
}
*/
function addNewCustomizerRow( IDprefix, customizer, choiceGpID ) {
 // alert(IDprefix+customizer+'Rows');
    var custRows = document.getElementById(IDprefix+customizer+'Rows').value;
		var newWrapperTR = document.getElementById(IDprefix+customizer+'sTable').insertRow(custRows);
    custRows++;
		newWrapperTR.setAttribute('id',IDprefix+customizer+custRows+'Row');
		var TRinnerHTMLlines = [];
		TRinnerHTMLlines.push('');
    if( !choiceGpID || choiceGpID!=savedChoiceGpID ) {
    		var checked = (choiceGpID) ? '' : ' checked="checked"';
		    TRinnerHTMLlines.push('  <td><input type="checkbox"'+checked+' id="toggle_'+IDprefix+customizer+custRows+'" title="apply" onclick="toggleModifier(this)" /></td>');
    }
    else {
    		TRinnerHTMLlines.push('  <td></td>');
    }
		// if there is a group ID, put a radio button
    if( choiceGpID ) {
		    TRinnerHTMLlines.push('  <td><input type="radio" name="'+choiceGpID+'" id="choose_'+IDprefix+customizer+custRows+'" title="select" disabled="disabled" onchange="chooseCustomizer(this)" /></td>');
    }
    else {
    		TRinnerHTMLlines.push('  <td></td>');
    }
		TRinnerHTMLlines.push('  <td><input id="'+IDprefix+customizer+custRows+'Text" style="width:100%;" /></td>');
	//	TRinnerHTMLlines.push('<td><input id="'+IDprefix+customizer+custRows+'Value" style="width:30px; text-align:left;" type="text" /></td>');

		TRinnerHTMLlines.push('');
    newWrapperTR.innerHTML = TRinnerHTMLlines.join("\n                              ");

    document.getElementById(IDprefix+customizer+'Rows').value = custRows;
}

function toggleModifier( chBox ) {
    // var titleText = chBox.title;
   //  chBox.title = ( chBox.checked ) ? 'apply' : 'remove';
		var idRoot = chBox.id.substr(7);
 // alert(idRoot);
		var thisForm = document.getElementById(idRoot+'Text').form;

 // document.getElementById(idRoot+'Text').style.color  = ( titleText=='delete' ) ? 'grey' : '';
 // document.getElementById(idRoot+'Value').style.color = ( titleText=='delete' ) ? 'grey' : '';
		// style change indicates 'slated for deletion', but how do I use that?

    var modGroupName = ( document.getElementById('choose_'+idRoot) )
                     ? document.getElementById('choose_'+idRoot).name
                     : false;

    if( modGroupName ) {
        var modGroupObj = document.selectTraitsForm[modGroupName];
		    if( chBox.checked ) {		    // if this is a check 'on',
            //   iterate over radio button group
            // is there a selection?
            var selection = 0;
            for( var i in modGroupObj ) {
                var rb = modGroupObj[i];
                if( rb.checked ) {
                    selection = 1*i+1;  // so that button '0' counts as 'true'
                }
                // while we're iterating over them, enable all of the radio buttons
                rb.disabled = false;
            }
            if( selection ) {   // if there is already a selection,
                // enable that option, do nothing else
                var selectionID = modGroupObj[selection-1].id.substr(7);
                document.getElementById(selectionID+'Text' ).disabled = false;
                document.getElementById(selectionID+'Value').disabled = false;
            }
            else {              // otherwise,
                // select and enable the first option
                var selectionID = modGroupObj[0].id.substr(7);
                document.getElementById('choose_'+selectionID).checked = true;  // could do modGroupObj.checked = true;
                document.getElementById(selectionID+'Text' ).disabled = false;
                document.getElementById(selectionID+'Value').disabled = false;
            }
		    }
		    else {		    // otherwise,
		        // all options should be disabled (but leave selection alone)
            for( var i in modGroupObj ) {
                if( !modGroupObj[i].id ) continue;
                modGroupObj[i].disabled = true;
                var rbID = modGroupObj[i].id.substr(7);
                document.getElementById(rbID+'Text' ).disabled = true;
                document.getElementById(rbID+'Value').disabled = true;
            }
		    }
		}
		else {
        document.getElementById(idRoot+'Text' ).disabled = ( chBox.checked ) ? false : true;
        if( document.getElementById(idRoot+'Value') ) {
            document.getElementById(idRoot+'Value').disabled = ( chBox.checked ) ? false : true;
        }
		}

		// need to toss control on to appropriate showInfo function, to update cost preview
		updateTraitCost( thisForm );
}

function chooseModifier( rButton ) {
    var idRoot = rButton.id.substr(7);
    var rbGroupObj = document.selectTraitsForm[rButton.name];
    for( var i in rbGroupObj ) {
        var rb = rbGroupObj[i];
        if( !rb.id ) continue;
        var rbIdRoot = rb.id.substr(7);
        document.getElementById(rbIdRoot+'Text' ).disabled = ( rb.checked ) ? false : true;
        document.getElementById(rbIdRoot+'Value').disabled = ( rb.checked ) ? false : true;
    }
  //  alert(idRoot+'Text');
    updateTraitCost(document.getElementById(idRoot+'Text').form);
}

function updateTraitCost(form) {
 //   alert(form.id);
    // fork based on which form I'm in
    if( form.id=='selectTraitsForm' ) {
        // get trait selected
        var selectElmt = document.getElementById('selectTraitMenu');
        var traitIndex = selectElmt.options[selectElmt.selectedIndex].value;    // more reliable for IE7 and such
        // alert(traitIndex);
        let selectedTrait = Traits[traitIndex];
        if( selectedTrait.type.match(/D/i) ) {
            let totalDisadPts = Math.abs( ch.disadsPoints() + ch.attrDisadPoints() );
            let clonedTrait = cloneTraitFromGenericObject(selectedTrait);
            if( clonedTrait.hasLevels ) clonedTrait.levels = document.getElementById('selectTraitLevels').value;
            if( totalDisadPts - clonedTrait.finalCost() > ch.gameInfo.disadPointsLimit ) {
                document.getElementById('TraitNote').innerHTML
                    = "<em>"+clonedTrait.print()+"</em> would push "+ch.firstName()+"'s disad total to "+(totalDisadPts-clonedTrait.finalCost())+" (game limit is "+ch.gameInfo.disadPointsLimit+").";
            }
        }
        showTraitPointValue();
    }
    else if(form.id=='editTraitForm') {
        showPointCostOrRecoup();
    }
}
function showTraitPointValue() {
/*  This function does NOT simply duplicate the effort in Trait.finalCost();
    here, the Trait doesn't actually have any mods attached to it, and we
    must gather form data and calculate cost AS IF they were attached.
    A possible improvement would be to gather form data, create a temporary
    faux Trait with modifiers attached, and then use finalCost.  This might
    have advantages if the way finalCost calculates were to change. */

    // get the currently-selected ad/disad object
    var traitIndex = document.getElementById('selectTraitMenu').value;
    if( !traitIndex ) return;
    var Trait = Traits[traitIndex];

    // localise some of the Trait attributes, then alter local values according to form inputs
    var levels = Trait.levels;
    if( Trait.hasLevels ) {
        levels = document.getElementById('selectTraitLevels').value;
    }
    else { levels = 1; }
    var baseCostInput = document.getElementById('basicTraitCost');
    var baseCost = baseCostInput.value;
    if( baseCostInput.style.visibility=='hidden' || !baseCost ) { baseCost = (isNaN(Trait.cost)) ? 0 : Trait.cost; }
 //   alert(baseCost);

    // when (if ever) should it be the baseCost, rather than the newCost, that gets modified?
    // i.e., how do modifiers get applied to traits with levels?  (moot for multipliers and enh/lims)
    // could apply the constant mods section to baseCost, then initialize newCost, then proceed...
    var fixedCost = ( Trait.hasOwnProperty('fixedCost') ) ? Trait.fixedCost : 0;
    var newCost = fixedCost + levels*baseCost;
 //   alert('before Mods: '+newCost);

    // deal with each of the various Mods
    var modRow = 1;
    while( document.getElementById('newTraitConstantMod'+modRow+'Text') ) {
        if( !document.getElementById('newTraitConstantMod'+modRow+'Value').disabled ) {
            newCost += 1*document.getElementById('newTraitConstantMod'+modRow+'Value').value;
        }
        modRow++;
    }
    modRow = 1;
    while( document.getElementById('newTraitMultiplier'+modRow+'Text') ) {
        if( !document.getElementById('newTraitMultiplier'+modRow+'Value').disabled ) {
        //  alert(1*eval(document.getElementById('newTraitMultiplier'+modRow+'Value').value));   // eval() necessary because some multiplier values are expressed as fractions, e.g. "1/2"
            newCost *= 1*eval(document.getElementById('newTraitMultiplier'+modRow+'Value').value);
        }
        modRow++;
    }
    modRow = 1;
    var newMods = 0;
    while( document.getElementById('newTraitEnhanceLimit'+modRow+'Text') ) {
        if( !document.getElementById('newTraitEnhanceLimit'+modRow+'Value').disabled ) {
            newMods += 1*document.getElementById('newTraitEnhanceLimit'+modRow+'Value').value;
        }
        modRow++;
    }
    var title = '';
    var asx = '';
    if(newMods<-80) {
        newMods=-80;
        title = ' title="Limitations total cannot exceed -80%" ';
        asx = '*';
    }
    newCost *= 1+newMods/100;
    newCost = Math.ceil( Math.round(newCost*10000)/10000 );   // trim off floating-point arithmetic errors, then round up
 //   alert('after Mods: '+newCost);

    // display calculated cost
    document.getElementById('totalTraitCost').innerHTML = (Trait.cost=='att') ? '' : '&emsp;(<i'+title+'>'+newCost+' point'+es(newCost)+asx+'</i>)';
  //  alert( newCost+' point'+es(baseCost) );
}

function showTraitInfoInDialog( TraitName ) {
    // initialize all supplementary input divs first
    document.getElementById('selectTraitLevelsWrapper').style.visibility='hidden';
    document.getElementById( 'basicTraitCostWrapper'  ).style.visibility='hidden';
    document.getElementById(     'basicTraitCost'     ).style.visibility='hidden';
    document.getElementById('TraitInstructionsWrapper').style.visibility='hidden';
    document.getElementById(         'TraitNote'      ).innerHTML = '';
    $('#TraitNote').removeClass('ready');
    $("#describeTraitWrapper").css('visibility','hidden');
    $("#describeTraitWrapper").removeClass('required');
    $("#describeTraitMenu").css('display','none');
    $("#describeTraitMenu").html('');
    $("#describeTrait").css('display','none');
    $("#describeTrait").val('');
    $("#describeTrait").removeClass('disabled');
    $("#describeTrait").prop('disabled',false);
    document.getElementById(         'TraitInstructions').innerHTML = '&nbsp;';
    document.getElementById('customTraitExoticSprntl').value = 'Mundane';
    document.getElementById('customTraitType').value = 'A';
    document.getElementById('customTraitFixedCost').value = 0;
    document.getElementById('basicTraitCost').value = '';
    customTraitLevelSwitch('off');

    // localize the ad/disad member attributes
    var selectedTrait = Traits[TraitName];
    var cost         = selectedTrait.cost;
    var fixedCost    = selectedTrait.fixedCost;
    var hasLevels    = selectedTrait.hasLevels;
    var posNegLevels = selectedTrait.posNegLevels;
    var lowestLevel  = selectedTrait.lowestLevel;
    var highestLevel = selectedTrait.highestLevel;
    var reqBasicCost = selectedTrait.requestBasicCost;
    var description  = selectedTrait.description;
    var instructions = selectedTrait.instructions;
    var multiple     = selectedTrait.multiple;
    var takesMults   = selectedTrait.takesMultipliers;
    var takesCMods   = selectedTrait.takesConstantMods;
    var levelsName   = (selectedTrait.hasOwnProperty('levelsName')) ? selectedTrait.levelsName : 'level';

    var perLevel = '';
    if( hasLevels ) {
        var lowest = ( fixedCost && fixedCost!=0 ) ? 0 : 1;
        if( posNegLevels ) {
            lowest = ( cost==0 ) ? -Math.abs(spendingLimit(false)) : -Math.abs(spendingLimit(false)/cost);
  //          if( cost=='att' ) lowest = -9;
        }
        lowest = Math.round(lowest);
        if( selectedTrait.hasOwnProperty('lowestLevel') )  { lowest = lowestLevel; }
        var highest = (cost==0) ? 20 : Math.abs( 2*spendingLimit(false)/cost );
        if( cost=='att' ) highest = 10;
        if( highestLevel ) { highest = highestLevel; }
        if( highest<=lowest ) highest = lowest + 2;
        var startIndex = ( selectedTrait.hasOwnProperty('lowestLevel') ) ? lowestLevel : 1;
        document.getElementById('selectTraitLevels').innerHTML
            = ( selectedTrait.hasOwnProperty('levelNames') )
            ? makeListOptions( selectedTrait.levelNames, startIndex, '          ' )
            : makeNumberOptions( lowest, highest, '          ' );
        document.getElementById('selectTraitLevelsWrapper').style.visibility='visible';
        perLevel = ' per '+levelsName;
        document.getElementById('selectTraitLevelsName').innerHTML = (selectedTrait.levelsNameNonPlural) ? levelsName : plural(levelsName,2);
        document.getElementById('customTraitLevelsName').innerHTML = levelsName;
    }
    if( reqBasicCost || cost=='varies' ) {
        document.getElementById('basicTraitCostWrapper').style.visibility='visible';
        document.getElementById('basicTraitCost').style.visibility='visible';
        document.getElementById('basicTraitCost').value = ( reqBasicCost && reqBasicCost!==true ) ? reqBasicCost : '';
    }
    if( multiple || description ) {
				if( document.loadedCharacter.getTrait(TraitName) || document.loadedCharacter.hasTraitGroup(selectedTrait.group) ) {
						document.getElementById('TraitNote').innerHTML
								= document.loadedCharacter.firstName()+' already has a version of this trait.&ensp;';
				}
        $("#describeTraitWrapper").css('visibility','visible');
        $("#describeTrait").css('display','inline');
        if( Array.isArray(description) ) {    // menu if description.length>1, otherwise enabled text input, filled with description[0]
            if( description.length>1 ) {
                $("#describeTrait").css('display','none');
                $("#describeTraitMenu").css('display','inline-block');
                $("#describeTraitMenu").html( description.map( txt => '<option value="'+txt+'">'+txt+'</option>').join("\n") );
            }
            else $("#describeTrait").val( description );
        }
        else if(multiple) $("#describeTrait").val('');
        else {
            $("#describeTrait").val( description );
            $("#describeTrait").prop('disabled',true);
            $("#describeTrait").addClass('disabled');
            $("#describeTrait").attr('title','description can be edited after taking this '+traitTypeNames[selectedTrait.type])
        }
    }
    /* if selectedTrait is a disad, and its finalCost would cause ( ch.disadsPoints() + ch.attrDisadPoints() )
        to exceed ch.gameInfo.disadPointsLimit, display a warning */
    if( selectedTrait.type && selectedTrait.type.match(/D/i) ) {
        let totalDisadPts = Math.abs( ch.disadsPoints() + ch.attrDisadPoints() );
        if( totalDisadPts - selectedTrait.finalCost() > ch.gameInfo.disadPointsLimit ) {
						$('#TraitNote').addClass('ready');
						document.getElementById('TraitNote').innerHTML
								+= "<em>"+selectedTrait.print()+"</em> would push "+ch.firstName()+"'s disad total to "+(totalDisadPts-selectedTrait.finalCost())+" (game limit is "+ch.gameInfo.disadPointsLimit+").";
        }
    }
    if( instructions ) {
        document.getElementById('TraitInstructions').style.visibility='visible';
        document.getElementById('TraitInstructions').innerHTML = instructions;
    }

    if( document.getElementById('newTraitEnhanceLimitsTable') )
        document.getElementById('newTraitEnhanceLimitsTable').innerHTML = "";
    document.getElementById('newTraitEnhanceLimitRows').value = 0;

    document.getElementById('newTraitMultipliersTable').innerHTML = "";
    document.getElementById('newTraitMultiplierRows').value = 0;
		if( document.getElementById('newTraitMultipliersWrapper') )
    		document.getElementById('newTraitMultipliersWrapper').style.display = (takesMults) ? 'block' : 'none';

    document.getElementById('newTraitConstantModsTable').innerHTML = "";
    document.getElementById('newTraitConstantModRows').value = 0;
    if( document.getElementById('newTraitConstantModsWrapper') )
        document.getElementById('newTraitConstantModsWrapper').style.display = (takesCMods) ? 'block' : 'none';

    document.getElementById('selectTraitSubmit').innerHTML
        = (selectedTrait.buttonLabel)
        ? 'Take <i>'+selectedTrait.buttonLabel+'</i>'
        : ( selectedTrait.hasOwnProperty('name') )
            ? 'Take <i>'+selectedTrait.name+'</i>'
            : 'Insert '+TraitName+' line';
    //  document.getElementById('selectTraitSubmit').disabled = null;
    // initialize custom trait modifiers form
    document.getElementById('customTraitConstantModsTableTbody').innerHTML = "";
    document.getElementById('customTraitConstantModRows').value = 0;
    document.getElementById('customTraitMultipliersTableTbody').innerHTML = "";
    document.getElementById('customTraitMultiplierRows').value = 0;
    document.getElementById('customTraitEnhanceLimitsTable').innerHTML = "";
    document.getElementById('customTraitEnhanceLimitRows').value = 0;
    // echo stats in custom form
    document.getElementById('customTraitName').value = selectedTrait.name;
    document.getElementById('customTraitPointCost').value = cost;
    document.getElementById('customTraitEchoCost').innerHTML = cost;
    document.getElementById('customTraitExoticSprntl').value = selectedTrait.exoticSprntl || "Mundane";   // console.log( selectedTrait.exoticSprntl );
    document.getElementById('customTraitClass').value = selectedTrait.physMntlScl;
    document.getElementById('customTraitType').value = selectedTrait.type;
    document.getElementById('customTraitDescription').value
        = ( !selectedTrait.hasOwnProperty('description') || description==true ) ? '' : description;
    if( hasLevels ) {
        // can this be moved into the if( hasLevels ) branch above?
        customTraitLevelSwitch('on');
        if( fixedCost ) document.getElementById('customTraitFixedCost').value = fixedCost;
    }

    // populate mod rows with [usually disabled] options from applicable mods
    var modsString = selectedTrait.mods;
    if( modsString ) {
        var mods = modsString.split(/,\s*/);
        for( let i in mods ) {
            var modGroupLabel = mods[i].replace(/\W+/g,'');
            var modGroup = Modifiers[modGroupLabel];    // e.g., the 'Ally' modifier group
      //      alert(JSONstring.make(modGroup));
/*
            for( var g in modGroup ) {    // loop over subgroups (e.g., the 'point value' or 'group size' subgroups of the 'Ally' mod group)
                var subGroup = modGroup[g];
                var choiceGpID = (subGroup.length>1) ? 'group'+i+g : '';    // group ID defined by structure of Modifier object
                // removing the alternative way to define group IDs, via 'category: ' headings in the text:
                // var matches = subGroup[0].text.match(/(.+):\s*(.*)/);
                // if( matches ) choiceGpID = matches[1];
                var checkbox = false;
                var required = false;
      //          alert("choiceGpID: '"+choiceGpID+"'");
                for( var m in subGroup ) {    // loop over modifier items in subgroup
                    var modItem = subGroup[m];    //  (e.g. { text: "point value: 50%  of PC", mod: 2,  type: 'constantMod' }; may also have 'levels' or 'required' properties)
          //          alert(JSONstring.make(modItem));
                    var modInputID;
                    var plus = '+';
                    if( modItem.type=='constantMod' ) {
		      //              alert('addNewConstantModRow');
                        modInputID = addNewConstantModRow( 'newTrait', choiceGpID );
                        document.getElementById('TraitConstantModsWrapper').style.display = 'block';
                    }
                    if( modItem.type=='multiplier' ) {
		      //              alert('addNewMultiplierRow');
                        modInputID = addNewMultiplierRow( 'newTrait', choiceGpID );
                        document.getElementById('TraitMultipliersWrapper').style.display = 'block';
                        plus = '';
                    }
                    if( modItem.type=='enhanceLimit' ) {
		      //              alert('addNewEnhLimRow');
                        modInputID = addNewEnhLimRow( 'newTrait', choiceGpID );
                    }
	        //          alert(modInputID);
                    document.getElementById(modInputID+'Text').value  = modItem.text;
                    document.getElementById(modInputID+'Text').disabled = true;
                    document.getElementById(modInputID+'Value').value += (modItem.mod>0) ? plus+modItem.mod : modItem.mod;
                    document.getElementById(modInputID+'Value').disabled = true;
                    if( document.getElementById("toggle_"+modInputID) ) {
                        checkbox = document.getElementById("toggle_"+modInputID);
                        checkbox.checked = false;
                    }
                    if( modItem.required ) {
                        required = true;
                        document.getElementById(modInputID+'Text').disabled = false;
                        document.getElementById(modInputID+'Value').disabled = false;
                        if(document.getElementById('choose_'+modInputID)) {
                            document.getElementById('choose_'+modInputID).checked = true;
                        }
                    }
                }
       //         alert( "group: "+choiceGpID+"\ncheckbox:\n"+checkbox+"\nrequired: "+required );
                if( required && checkbox ) {
                    simulate( checkbox, 'click' );  // doing it this way enables all the radio buttons in the group
                    checkbox.disabled = true;
                }
            }
*/
            let wrapperDisplay = { constantMod: false, multiplier: false };
            for( var g in modGroup ) {    // loop over subgroups (e.g., the 'point value' or 'group size' subgroups of the 'Ally' mod group)
                var subGroup = modGroup[g];
                for( var m in subGroup ) {    // loop over modifier items in subgroup
                    var modItem = subGroup[m];    //  (e.g. { text: "point value: 50%  of PC", mod: 2,  type: 'constantMod' }; may also have 'levels' or 'required' properties)
                    if( modItem.type!='enhanceLimit' ) wrapperDisplay[modItem.type] = true;
                }
            }
            makeModsDivInputGroup( 'newTrait', modGroup, i );
            if( wrapperDisplay.constantMod ) document.getElementById('newTraitConstantModsWrapper').style.display = 'block';
            if( wrapperDisplay.multiplier  ) document.getElementById('newTraitMultipliersWrapper' ).style.display = 'block';

        }
    }
    savedChoiceGpID = '';

    var fixedCostPlus = ( fixedCost ) ? fixedCost+' + ' : '';
    if( selectedTrait.hasOwnProperty('name') ) {
				document.getElementById('displayCostLevels').innerHTML = ( cost=='att') ? 'Cost: attribute progression' : 'Cost: '+fixedCostPlus+cost+perLevel;
				showTraitPointValue();
    }
    else {
				document.getElementById('displayCostLevels').innerHTML = '&nbsp;';
				document.getElementById('totalTraitCost').innerHTML = '&nbsp;';
    }
}

function loadTraitFromDialog() {

    let debug = 0;

    /* form */
    let name, type, cost, physMntlScl, exSpr, hasLevels, levels, fixedCost, description;
    var TraitKey = document.getElementById('selectTraitMenu').value;
    var custom = ( document.getElementById('customTraitFormWrapper').style.display!='none' ) ? true : false;

    /* make the new Trait object */
    var newTraitObject;
    if( TraitKey=='spacer' ) {    // create empty 'Trait' object
        newTraitObject = { line : false };
    }
    else if( TraitKey=='heading' ) {
        // need to get heading text from somewhere...
        var headingText = prompt("heading text:",'');
        if( headingText ) {
            newTraitObject = { line : headingText };
        }
        else { return false; }
    }
    else if( custom ) {  // instantiate a new Trait object
        name = document.getElementById('customTraitName').value;
        type = document.getElementById('customTraitType').value;
        cost = 1*document.getElementById('customTraitPointCost').value;
        physMntlScl = document.getElementById('customTraitClass').value;
        hasLevels = document.getElementById('customTraitLevelsToggle').checked;
        fixedCost = 1*document.getElementById('customTraitFixedCost').value;
        exSpr = document.getElementById('customTraitExoticSprntl').value;
        description = document.getElementById('customTraitDescription').value;
        levels = 1*document.getElementById('selectCustomTraitLevels').value;
        TraitKey = name.replace(/\W+/g,'');
        newTraitObject = new Trait( name, type, physMntlScl, cost, hasLevels, 'USER' );
        if( exSpr!='M' ) newTraitObject.exoticSprntl = exSpr;
        if( fixedCost ) newTraitObject.fixedCost = fixedCost;
    }
    else {  // get a clone of this Trait from the Traits object
    //  alert("[loadTraitFromDialog] Traits["+TraitKey+"]:\n"+JSONstring.make(Traits[TraitKey]));
        levels = 1*document.getElementById('selectTraitLevels').value;
        newTraitObject = cloneTraitFromGenericObject( Traits[TraitKey] );
        hasLevels = newTraitObject.hasLevels;
        cost = newTraitObject.cost;
        description = document.getElementById('describeTrait').value || document.getElementById('describeTraitMenu').value;
        if( typeof(cost)=='string' && cost.match('varies') ) {
            newTraitObject.cost = 1*document.getElementById('basicTraitCost').value;
        }
        // for traits with a cost of 'att', leave the cost alone (it will be dealt with downstream)
    }
    // console.log("[loadTraitFromDialog] after initial Trait creation:\n"+JSONstring.make(newTraitObject));
    // error-check for non-numeric cost at this point?
    if( !(description || custom) && newTraitObject.description ) {
        alert('description required');
        $("#describeTraitWrapper").addClass('required');
        return;
    }

    /* Attach optional parameters according to form entries */
    if(  hasLevels  ) newTraitObject.levels = levels;
    if( description ) newTraitObject.description = description;
  //  alert("[loadTraitFromDialog] after adding levels and description:\n"+JSONstring.make(newTraitObject));

    // modify for constant mods
    var cmods = 1;
    var IDprefix = ( custom ) ? 'customTrait' : 'newTrait';
    while( document.getElementById(IDprefix+'ConstantMod' +cmods+'Row') ) {
        if( document.getElementById(IDprefix+'ConstantMod'+cmods+'Value').disabled ) { cmods++; continue; }
        if( !newTraitObject.ConstantModsArray ) { newTraitObject.ConstantModsArray = []; }
        // wrap adding modifier in conditional in case of blanks, extras, out-of-sequence, etc.
        var cmodValueString = document.getElementById(IDprefix+'ConstantMod'+cmods+'Value').value;
 //     alert('in loadTraitFromDialog, got mod value: '+cmodValueString);
        // should check this input here; must be (or parse to) an integer
        var cmodValue = 1;
 //     alert('after defining cmodValue='+cmodValue);
        if( cmodValueString.match(/^\+/) ) {
            cmodValueString = cmodValueString.substr(1);
        }
        cmodValue = 1*cmodValueString;
  //    alert('in loadTraitFromDialog, parsed mod value: '+cmodValue);
   //     if( cmodValue ) {
            var ConstantModObj = {
                text  : document.getElementById(IDprefix+'ConstantMod'+cmods+'Text').value,
                value : cmodValue,
            };
            newTraitObject.ConstantModsArray.push( ConstantModObj );
   //     }
        cmods++;  // used this way, doesn't necessarily count constant modifiers
    }
    // modify for multipliers
    var mults = 1;
    while( document.getElementById(IDprefix+'Multiplier'  +mults+'Row') ) {
        if( document.getElementById(IDprefix+'Multiplier'+mults+'Value').disabled ) { mults++; continue; }
        if( !newTraitObject.MultipliersArray ) { newTraitObject.MultipliersArray = []; }
        // wrap adding modifier in conditional in case of blanks, extras, out-of-sequence, etc.
        var multValueString = document.getElementById(IDprefix+'Multiplier'+mults+'Value').value;
        // var multValue = 1;
        // if( multValueString.match('/') ) {
        //     multValueTokens = multValueString.split('/');
        //     multValue = multValueTokens[0]/multValueTokens[1];
        // }
        // else { multValue = 1*multValueString; }
        // See, I kinda want values like '1/3' to get stored as strings, and converted later.
        // But they can be entered as numbers, even if they are written as fractions!  value: 1/3 is totally valid JSON!
 //       if( multValue!=1 ) {
            var MultiplierObj = {
                text  : document.getElementById(IDprefix+'Multiplier'+mults+'Text').value,
                // value : multValue,
                value : multValueString,
            };
            newTraitObject.MultipliersArray.push( MultiplierObj );
 //       }
        mults++;  // used this way, doesn't necessarily count multipliers
    }
    // modify for enhancements/limitations
    var enhLims = 1;
    while( document.getElementById(IDprefix+'EnhanceLimit'+enhLims+'Row') ) {
       if( document.getElementById(IDprefix+'EnhanceLimit'+enhLims+'Value').disabled ) { enhLims++; continue; }
       if( !newTraitObject.EnhLimsArray ) { newTraitObject.EnhLimsArray = []; }
        // wrap adding modifier in conditional in case of blanks, extras, out-of-sequence, etc.
        var elVal = document.getElementById(IDprefix+'EnhanceLimit'+enhLims+'Value').value;
        if( isNaN(elVal) ) {
            alert(elVal+" is not a valid value.");
            return;
        }
        else {
            var EnhLimObj = {
                text  :   document.getElementById(IDprefix+'EnhanceLimit'+enhLims+'Text').value,
                value : 1*elVal,
            };
            newTraitObject.EnhLimsArray.push( EnhLimObj );
        }
        enhLims++;  // used this way, doesn't necessarily count enhancements and limitations
    }
  //  alert("[loadTraitFromDialog] after applying modifiers:\n"+JSONstring.make(newTraitObject));

    // see if loadedCharacter already has this trait (so that 'multiple' can be set)
    var ch = document.loadedCharacter;
    if( newTraitObject.multiple ) {
        ch.resequenceMultipleTraits();    // just to be sure, re-sequence these traits before getting a count
        var hasTrait = ch.hasTrait(TraitKey);   // hasTrait is the number of instances of the trait taken by ch
      //  alert(hasTrait);
        if( hasTrait ) {
            newTraitObject.multiple = hasTrait + 1;
    //        alert(JSONstring.make(newTraitObject));
        }
        else {  // set multiple to '1' for a first instance of a multiple trait
            newTraitObject.multiple = 1;
        }
    }
  //  alert("[loadTraitFromDialog] after multiples check:\n"+JSONstring.make(newTraitObject));

    // store the key label from the Traits object (unless the object already has one)
    if( !newTraitObject.hasOwnProperty('key') ) newTraitObject.key = TraitKey;

    // apply custom trait adjustments
    if( custom ) {
        var n=1;
        while( document.getElementById('customTraitAdjustsSkill'+n+'Label') ) {
            var targetSkill = document.getElementById('customTraitAdjustsSkill'+n+'Label').value;
            var adjAmount = 1*document.getElementById('customTraitAdjustsSkill'+n+'Modifier').value;
            var adjObj = { from: TraitKey, fromCategory: 'AD', amount: adjAmount, target: targetSkill, targetCategory: 'SK' };
            var adjLabel = targetSkill+'_from_'+TraitKey;
            ch.adjustments[adjLabel] = adjObj;
            n++;
        }
    }

    // check for disads that exceed the game limit
  //  alert( Math.abs(ch.disadsPoints())+'+'+Math.abs(newTraitObject.finalCost())+' > '+ch.gameInfo.disadPointsLimit );
//     var totalDisadPts = Math.abs( ch.disadsPoints() + ch.attrDisadPoints() );
//     if( newTraitObject.finalCost()<0 ) totalDisadPts += Math.abs( newTraitObject.finalCost() );
//     if( newTraitObject.finalCost()<0 && totalDisadPts > ch.gameInfo.disadPointsLimit ) {
//         var overrule = confirm("Taking this disadvantage will push "+ch.description.name+"'s disadvantage point total ("+totalDisadPts+") beyond the game limit of "+ch.gameInfo.disadPointsLimit+".  See B26 (3rd edition) or B11 (4th edition) for more information.  \n\nProceed?");
//         if( !overrule ) return false;
//     }

    // console.log('in loadTraitFromDialog: is '+newTraitObject.name+' an instance of the Trait object? '+( newTraitObject instanceof Trait ));
  //  alert("[loadTraitFromDialog] after disad limit check:\n"+JSONstring.make(newTraitObject));

    /* attach the new ad or disad to the loaded Character */
    //ch.traits.push( newTraitObject );
    if( newTraitObject instanceof Trait ) {
				ch.attachTrait( newTraitObject );
    }
    else {
				ch.traits.push( newTraitObject );
    }
		if(debug)
		    console.log(newTraitObject.name+" trait attached");

    // increment the selection in the menu, if the current selection will be going away
    var newIndex = 1*document.getElementById('selectTraitMenu').selectedIndex;
    if( Traits[TraitKey] && !Traits[TraitKey].multiple ) { newIndex++; }
    var selectedKey = document.getElementById('selectTraitMenu').options[newIndex].value;

    /* cause character to be reloaded so that the new ad or disad becomes visible */
		if(debug>2)
        console.log("[loadTraitFromDialog] about to (re)load this character: "+JSONstring.make(ch));
    let msg = ( newTraitObject.name ) ? "Add "+newTraitObject.name.substr(0,10) : 'Add format line' ;
    loadCharacter( ch, msg );
    // clearRowHighlights('trait');    // SHOULD be part of highlightTargetPosition(), and called by the verbObjectDialog() function
    selectTraitsDialog( selectedKey );
    return false;
}

function customTraitLevelSwitch( levelSwitch ) {
    var td = document.getElementById('customTraitLevelsInputTD');
    var cb = document.getElementById('customTraitLevelsToggle');
    if( levelSwitch=='on' ) {
 //       alert('levelSwitch on');
        td.style.visibility = 'visible';
        cb.checked = true;
    }
    else if( levelSwitch=='off' ) {
 //       alert('levelSwitch off');
        td.style.visibility = 'hidden';
        cb.checked = false;
    }
 //   alert(td.style.visibility);
}

// several bits of duplicated code in these 4 functions...
function editTraitDialog( selectedTraitIndex ) {
    if( selectedTraitIndex ) {     // tick the corresponding type checkbox (in case it isn't already)
    }
    else {      // disable the submit button
      document.getElementById('editTraitSubmit').value = '';
      document.getElementById('editTraitSubmit').innerHTML = 'make a selection to edit';
      document.getElementById('editTraitSubmit').disabled = true;
    }
    // get filter states
//     var showAds    = document.editTraitForm[ 'showAdsEdit'  ].checked;
//     var showDisads = document.editTraitForm['showDisadsEdit'].checked;
//     var showPerks  = document.editTraitForm['showPerksEdit' ].checked;
//     var showQuirks = document.editTraitForm['showQuirksEdit'].checked;
/*  Removed trait type filters
  For the moment, I have commented out the entire Filters fieldset from this dialog box.
  The only filters present were for ads/disads/perks/quirks.  These distinctions are now
  less meaningful than before, and the filters will need to be implemented differently.
  Haven't decided yet if it is worth the trouble to filter such short lists anyway.
*/
    // reset 'edit' form values
    document.getElementById('editNameText').value = '';
    document.getElementById('editTraitIndex').value = null;        // hidden input with ad/disad label
    document.getElementById('editDescription').value = '';
    document.getElementById('editTraitLevelsName').innerHTML = 'Level';
    document.getElementById('editLevelsTR').style.visibility = 'hidden';
    setDisplay( 'closed', 'editTraitModifiersTable', 'editTraitModifiersToggleButton', 'block' );
    // loop over Character's trait groups to populate select list
    var editTraitMenuHTML = new Array();
    var menuIndex = 0;
    var selectedTraitMenuIndex = 0;
//         if( !showAds    && traitGroup=='advantage'    ) continue;
//         if( !showPerks  && traitGroup=='perk'         ) continue;
//         if( !showDisads && traitGroup=='disadvantage' ) continue;
//         if( !showQuirks && traitGroup=='quirk'        ) continue;
    for( var traitIndex in document.loadedCharacter.traits ) {
        var trait = document.loadedCharacter.traits[traitIndex];
        var cost = trait.cost;
        if( trait.name ) {
            var sel = ( selectedTraitIndex==traitIndex ) ? ' selected="selected"' : '';
            if( sel ) selectedTraitMenuIndex = menuIndex;
            // var pqt = ( cost==-1 ) ? ' (quirk)' : '';
            // if( cost==1 ) { pqt = ' (perk)' };
            var pqt = ( trait.type=='Q' ) ? ' (quirk)' : '';
            if( trait.type=='P' ) { pqt = ' (perk)' };
            if( trait.hasOwnProperty('inTemplate') ) { pqt = ' ('+trait.inTemplate+' template)' }
            let ref = ( trait.reference ) ? trait.reference : '';
            editTraitMenuHTML.push('<option value="'+traitIndex+'"'+sel+' title="'+expandMiniref(ref,true)+'">'+trait.name+pqt+'</option>');
            menuIndex++;
        }
        if( traitIndex==selectedTraitIndex ) {
            showEditTraitInfoInDialog( selectedTraitIndex );
        }
    }

    document.getElementById('editTraitMenu').innerHTML = "\n            "+editTraitMenuHTML.join("\n            ")+"\n          ";
    //alert('scrolling menu to index '+selectedTraitMenuIndex+"\noption value: "+document.getElementById('editTraitMenu').options[selectedTraitMenuIndex].value);
   // document.getElementById('editTraitMenu').options[selectedTraitMenuIndex].scrollIntoView();  // doesn't work (at least not on first open of the dialog)
   // $('#editTraitMenu option[value='+selectedTraitIndex+']').attr("selected", true );  // also doesn't work
    setupDialog('editTraitDialog');
    showEditTraitInfoInDialog( selectedTraitIndex );
}
function showPointCostOrRecoup() {

    // get the currently-selected ad/disad object
    var traitIndex = document.getElementById('editTraitIndex').value;
    if( !traitIndex ) return;
    var eTrait = document.loadedCharacter.traits[traitIndex];
    // get radio selection
    var action = getRadioGroupValue(document.editTraitForm['editTraitAction']);
    // show or hide the enhancement/limitation list according to whether the radio button is selected
   // if( action=='remodify' ) { document.getElementById('editEnhLimTR2').style.display = 'table-row'; }
   // else { document.getElementById('editEnhLimTR2').style.display = 'none'; }
   // document.getElementById('editEnhLimTR2').style.display = 'table-row';

    // localise some of the Trait attributes, then alter local values according to form inputs
    var currentPtVal = eTrait.finalCost();
    var levels = eTrait.levels;
    if( eTrait.hasLevels ) {
        levels = document.getElementById('newTraitLevel').value;
    }
    else { levels = 1; }
    var baseCost = document.getElementById('editCostValue').value;
    if( !baseCost ) { baseCost = eTrait.cost; }

    // when (if ever) should it be the baseCost, rather than the newCost, that gets modified?
    // i.e., how do modifiers get applied to traits with levels?  (moot for multipliers and enh/lims)
    // could apply the constant mods section to baseCost, then initialize newCost, then proceed...
    var fixedCost = ( eTrait.hasOwnProperty('fixedCost') ) ? eTrait.fixedCost : 0;
    var newCost = fixedCost + levels*baseCost;
 //   alert(newCost);
    if( eTrait.hasOwnProperty('ConstantModsArray') ) {
        var modRow = 1;
        while( document.getElementById('editTraitConstantMod'+modRow+'Text') ) {
            if( !document.getElementById('editTraitConstantMod'+modRow+'Value').disabled ) {
                newCost += 1*document.getElementById('editTraitConstantMod'+modRow+'Value').value;
            }
            modRow++;
        }
    }
    if( eTrait.hasOwnProperty('MultipliersArray') ) {
        var modRow = 1;
        while( document.getElementById('editTraitMultiplier'+modRow+'Text') ) {
            if( !document.getElementById('editTraitMultiplier'+modRow+'Value').disabled ) {
     //         alert(1*eval(document.getElementById('editTraitMultiplier'+modRow+'Value').value));   // eval() necessary because some multiplier values are expressed as fractions, e.g. "1/2"
                newCost *= 1*eval(document.getElementById('editTraitMultiplier'+modRow+'Value').value);
            }
            modRow++;
        }
    }
    if( eTrait.hasOwnProperty('EnhLimsArray') ) {
        var modRow = 1;
        var newMods = 0;
        while( document.getElementById('editTraitEnhanceLimit'+modRow+'Text') ) {
            if( !document.getElementById('editTraitEnhanceLimit'+modRow+'Value').disabled ) {
                newMods += 1*document.getElementById('editTraitEnhanceLimit'+modRow+'Value').value;
            }
            modRow++;
        }
        newCost *= 1+newMods/100;
    }
    newCost = Math.ceil( newCost );
    if( action.match(/delete/i) ) newCost = 0;

    // display new cost and change in value
    //alert('costDiff = '+newCost+' - '+currentPtVal);
    var costDiff = newCost - currentPtVal;   // alert('costDiff = '+costDiff);
    var fname = document.loadedCharacter.firstName();
    var getpay  = (costDiff<0) ?  fname+' would recover' : 'would cost '+fname;
    var absCost = (costDiff<0) ? -1*costDiff : costDiff;
    if( action.match(/delete/i) ) {
        document.getElementById('displayTraitRefund').innerHTML = getpay+' '+' '+absCost+' point'+es(baseCost);
    }
    else /*if( (levels!=eTrait.levels) || (baseCost!=eTrait.cost) || (newMods!=eTrait.EnhLimSum()) )*/ {
        document.getElementById('displayTraitRefund').innerHTML
            = 'new cost: '+newCost+' points ('+getpay+' '+absCost+' pt'+es(absCost)+')';
    }
    document.getElementById('editAction').innerHTML = action;
}
function showEditTraitInfoInDialog( traitIndex ) {
   // alert(traitIndex);
    // if traitIndex is not provided, see if something is selected anyway
    if( !traitIndex ) { traitIndex = document.getElementById('editTraitMenu').value; }
    // return, if no label can be found
    if( !traitIndex ) { return; }
  //  alert(traitIndex);
    // hide and clear inputs
    document.getElementById('editNameText').value = '';             // edit name input box
    document.getElementById('editTraitIndex').value = null;        // hidden input with ad/disad label
    document.getElementById('displayTraitRefund').innerHTML = '&nbsp;';
    document.getElementById('editLevelsTR').style.visibility = 'hidden';
    document.getElementById('editLevelsTD').innerHTML = '          <select id="newTraitLevel" onchange="showPointCostOrRecoup()"></select>'+"\n"
    document.getElementById('editRevalueTR1').style.display = 'none';
 //   document.getElementById('editDescriptionTR1').style.display = 'none';
 //   document.getElementById('editTraitCategoryTR').style.display = 'none';
    document.getElementById('editTraitCategory').value = 'M';
    document.getElementById('editCostValue').value = null;
    document.getElementById('editDescription').value = '';
    document.getElementById('editTraitsListFormattingTable').style.display = 'none';
    document.getElementById('editTraitFieldsTable').style.display = 'none';
    //document.getElementById('editTraitConstantModsTableTbody').innerHTML = '';
    //document.getElementById('editTraitMultipliersTableTbody').innerHTML = '';
    document.getElementById('editTraitEnhanceLimitsTable').innerHTML = '';
    setDisplay( 'closed', 'editTraitModifiersTable', 'editTraitModifiersToggleButton', 'block' );
    // get action
    var action = getRadioGroupValue(document.editTraitForm['editTraitAction']);
    if( action==undefined ) {
        document.getElementById('deleteTraitAction').checked = true;
        action = 'delete';
    }
    else if( action.match(/edit/i) ) {
        // show and populate formatting options
        document.getElementById('editTraitFieldsTable').style.display = 'table';
    }
    else if( action.match(/insert/i) ) {
        // show and populate formatting options
        document.getElementById('editTraitsListFormattingTable').style.display = 'table';
    }

    var ch = document.loadedCharacter;
    var eTrait = ch.traits[traitIndex];
   // alert(JSONstring.make(eTrait));
    // get cost info
    var cost = ( eTrait.hasOwnProperty('finalCost') ) ? eTrait.finalCost() : eTrait.cost;
    var absCost = (cost<0) ? -1*cost   : cost;
    var getpay  = (cost>0) ? 'recover' : 'will cost';
    document.getElementById('editCostValue').value = cost;

    /*  alter dbox according to the properties of the selected ad/disad  */

    // always-present properties (name and physMntlScl type)
    document.getElementById('editNameText').value = eTrait.name;
    editTraitForm.elements['editTraitPMS'].value = eTrait.physMntlScl;
    editTraitForm.elements['editTraitType'].value = eTrait.type;

	// levels
    if( eTrait.hasOwnProperty('levels') ) {   // console.log("[showEditTraitInfoInDialog] eTrait has levels:"); console.log(eTrait);
           // lowest and highest here are kind of hacks - can I do better?
        let lvls = Math.round( eTrait.levels );
        let perLevelCost = cost/lvls;   // in a few cases, this will be an *average* cost-per-level (3e Racial[ATT]Modifiers, for instance)
        var lowest = ( eTrait.fixedCost ) ? 0 : 1;
        if( eTrait.hasOwnProperty('posNegLevels') ) {
            lowest = Math.floor( ch.gameInfo.disadPointsLimit/perLevelCost );
            // alert('has posNegLevels, lowest set to '+lowest);
            if( lowest>0 ) lowest = -lowest;
        }
        if( eTrait.hasOwnProperty('lowestLevel') )  { lowest = eTrait.lowestLevel; }
       // alert('highest: ('+ch.description.pointTotal+'-'+ch.totalPoints()+')/'+perLevelCost);
        var highest = ( eTrait.hasOwnProperty('highestLevel') )
                    ?   eTrait.highestLevel
                    :   ( perLevelCost==0 )
                        ? lvls + 10
                        : lvls + Math.floor(Math.abs((ch.description.pointTotal-ch.totalPoints())/perLevelCost)) + 3;
        var optsHTML  = ( eTrait.hasOwnProperty('levelNames') )
                      ?   makeListOptions( eTrait.levelNames, lowest, '          ', lvls )
                      :   makeNumberOptions( lowest, highest, '                ', lvls );
       // alert("calling makeNumberOptions( "+lowest+", "+highest+", '            ', "+lvls+" )");
        document.getElementById('editLevelsTD').innerHTML = "\n                "+'<select id="newTraitLevel" onchange="showPointCostOrRecoup()">'
                                                          + optsHTML
                                                          + "</select>\n              ";
        var levelsName   = (eTrait.hasOwnProperty('levelsName')) ? eTrait.levelsName : 'level';
        document.getElementById('editTraitLevelsName').innerHTML = levelsName.toTitleCase();
        document.getElementById('editLevelsTR').style.visibility = 'visible';
    }
    // description
    if( eTrait.description ) {
        document.getElementById('editDescription').value = eTrait.description;
        // document.getElementById('editDescriptionTR1').style.display = 'table-row';
    }
    // category (mundane, exotic, supernatural)
    if( eTrait.exoticSprntl ) {
        editTraitForm.elements['editTraitCategory'].value = eTrait.exoticSprntl;
        // document.getElementById('editTraitCategoryTR').style.display = 'table-row';
    }
    // constant mods input
    var modsPresent = false;
    if( document.getElementById('editTraitConstantModsTable') )
        document.getElementById('editTraitConstantModsTable').innerHTML = '';
    document.getElementById('editTraitConstantModRows').value = 0;
    if( document.getElementById('editTraitMultipliersTable') )
        document.getElementById('editTraitMultipliersTable').innerHTML = '';
    document.getElementById('editTraitMultiplierRows').value = 0;
//     if( document.getElementById('editTraitEnhanceLimitsTable') )
//         document.getElementById('editTraitEnhanceLimitsTable').innerHTML = '';
    document.getElementById('editTraitEnhanceLimitRows').value = 0;
    if( eTrait.ConstantModsArray ) {
//         // put current values into inputs
//         var mods = eTrait.ConstantModsArray.length;
//         for( var m in eTrait.ConstantModsArray ) {
//             addNewConstantModRow('editTrait');
//             var mod = eTrait.ConstantModsArray[m];
//             document.getElementById('editTraitConstantMod'+(1*m+1)+'Value').value = eTrait.ConstantModsArray[m].value;
//             document.getElementById('editTraitConstantMod'+(1*m+1)+'Text' ).value = eTrait.ConstantModsArray[m].text;
//         }
        // to use makeModsTbodyInputGroup instead of addNewConstantModRow, try to convert eTrait.ConstantModsArray into a valid Modifier object
        for( let mi=0; mi<eTrait.ConstantModsArray.length; mi++ ) {
            let cmod = eTrait.ConstantModsArray[mi];
            cmod.type = 'constantMod'; cmod.mod = cmod.value; cmod.required = true;
            //console.log(cmod);
          //  makeModsTbodyInputGroup( 'editTrait', [[cmod]], 0 );
            makeModsDivInputGroup( 'editTrait', [[cmod]], 0 );
        }
        modsPresent = true;
    }
    // multipliers input
    if( eTrait.MultipliersArray ) {
//         // put current values into inputs
        for( let mi=0; mi<eTrait.MultipliersArray.length; mi++ ) {
            let mmod = eTrait.MultipliersArray[mi];
            mmod.type = 'multiplier'; mmod.mod = mmod.value; mmod.required = true;
            //console.log(mmod);
            makeModsDivInputGroup( 'editTrait', [[mmod]], 0 );
        }
        modsPresent = true;
    }
    // enhancement/limitation input
    if( eTrait.EnhLimsArray ) {
//         // put current values into inputs
        for( let mi=0; mi<eTrait.EnhLimsArray.length; mi++ ) {
            let elmod = eTrait.EnhLimsArray[mi];
            elmod.type = 'enhanceLimit'; elmod.mod = elmod.value; elmod.required = true;
            // console.log(elmod);
            makeModsDivInputGroup( 'editTrait', [[elmod]], 0 );
        }
        modsPresent = true;
    }
    if( modsPresent ) setDisplay( 'open', 'editTraitModifiersTable', 'editTraitModifiersToggleButton', 'block' );
    // base cost input
    if( eTrait.requestBasicCost ) {     // cost was user-defined; display inputs for editing cost and description
        // show inputs
        document.getElementById('editRevalueTR1').style.display = 'table-row';
    }

    // write selected trait label into hidden form field
    document.getElementById('editTraitIndex').value = traitIndex;
    // create button-friendly version of the trait name
    var shortName = ( eTrait.name.length>20 ) ? eTrait.name.slice(0,16)+'...' : eTrait.name ;
    // place trait name in remove/edit radio button labels
    document.getElementById('adType_Name_remove').innerHTML = '<i>'+shortName+'</i> trait';
    document.getElementById('TraitType_Name_format').innerHTML = '<em>'+shortName+'</em> trait';
    document.getElementById('adType_Name_edit').innerHTML = '<i>'+shortName+'</i> trait';
    // rewrite Submit button text
    document.getElementById('editTraitSubmit').value = '';
    document.getElementById('editTraitSubmit').innerHTML = '<span id="editAction">'+action+'</span> <i>'+shortName+'</i> trait';
    document.getElementById('editTraitSubmit').disabled = null;
    // call function to display new cost and difference
    showPointCostOrRecoup()
}
function editTrait( traitIndex ) {
    // get trait (try menu first - if that doesn't work, try the hidden field)
    if( !traitIndex ) { traitIndex = document.getElementById('editTraitMenu').value; }
    if( !traitIndex ) { traitIndex = document.getElementById('editTraitIndex').value; }
    if( !traitIndex ) { alert('no trait chosen'); return; }
    traitIndex = 1*traitIndex;
 // alert(traitIndex);
    var ch = document.loadedCharacter;
    var traitList = ch.traits;
    var nameText = traitList[traitIndex].name;
    var chTrait = traitList[traitIndex];
   // alert(JSONstring.make(chTrait));

    // get action
    let action = getRadioGroupValue(document.editTraitForm['editTraitAction']);
    // do action
    if( action=='delete' ) {
        if(!confirm("remove '"+nameText+"'?")) return;
        // if this trait is a template trait, there is much more to do
        if( chTrait.hasOwnProperty('templateTrait') ) {
            // find and delete all matching 'inTemplate' traits
            var templateKey = chTrait.key;
            for( var ti=0; ti<ch.traits.length; ti++ ) {
                var trait = ch.traits[ti];
              //  alert("testing "+trait.name+" for inTemplate match: "+trait.inTemplate+"=="+templateKey+"?");
                if( trait.hasOwnProperty('inTemplate') && trait.inTemplate==templateKey ) {
                 //   alert("removing (or altering) trait:\n"+JSONstring.make(trait));
                    //  fetch corresponding template trait for comparison
                    var tTrait = {};
                    var tTraitsList = ch.templates[templateKey].traits;
                    for( tti=0; tti<tTraitsList.length; tti++ ) {
                     //   alert("tTraitsList["+tti+"].key==trait.key?\n"+tTraitsList[tti].key+"=="+trait.key );
                        if( tTraitsList[tti].key==trait.key ) {
                            tTrait = tTraitsList[tti];
                            break;
                        }
                    }
                   // alert("matching trait:\n"+JSONstring.make(tTrait));
                    // decide whether to simply remove the trait, or leave it (altered) because the character has modified it from the template
                    if( !trait.hasOwnProperty('levels') || trait.levels==tTrait.levels || (trait.levels<tTrait.levels && !trait.hasOwnProperty('posNegLevels')) ) {
                        // splice out an exact match, or a diminished one if it can't take negative levels, or any trait that doesn't take levels
                        if( ch.traits.splice(ti,1) ) ti--;    // because iterator would skip next entry otherwise
                    }
                    else {    // subtract template levels from a modified trait, then delete the inTemplate property
                        trait.levels -= tTrait.levels;
                        delete trait.inTemplate;
                    }

                }
            }
            // subtract template added skill points (and delete template skills with zero points)
            var skillsList = ch.skills;
            for( var si=0; si<skillsList.length; si++ ) {
                var skill = skillsList[si];
       //         alert("testing "+skill.name+" for inTemplate match: "+skill.inTemplate+"=="+templateKey+"?");
                if( skill.hasOwnProperty('inTemplate') && trait.inTemplate==templateKey ) {    //    test for matching inTemplate property
                    // if a template skill is found, fetch the corresponding skill from the template for comparison
                    var tSkill;
                    var tSkillsList = ch.templates[templateKey].skills;
                    for( tsi=0; tsi<tSkillsList.length; tsi++ ) {
                        if( tSkillsList[tsi].key==skill.key ) {
                            tSkill = tSkillsList[tsi];
                            break;
                        }
                    }
 //                   alert("matching skill:\n"+JSONstring.make(tSkill));
                    // decide whether to simply remove the skill, or leave it (altered) because the character has added extra points to it
                    if( skill.points<=tSkill.points ) {   // splice skill out of the ch.skills list
            //            alert("match; splicing "+skill.name+" out of the skills list at position "+si);
                        if( ch.skills.splice(si,1) ) si--;    // because iterator would skip next entry otherwise
                    }
                    else {    // subtract the points contributed by the template, then delete the inTemplate property
                        skill.points -= tSkill.points;
                        delete skill.inTemplate;
                    }
                }

            }   // skill items loop
            // delete template adjustments
            var chAdjObj = ch.adjustments;
            for( var ai in chAdjObj ) {
                var chAdj = chAdjObj[ai];
                if( chAdj.hasOwnProperty('inTemplate') && chAdj.inTemplate==templateKey ) {
                    delete chAdj[ai];
                }
            }
            // finally, delete the attached template object
            if( ch.templates.hasOwnProperty(templateKey) )
                delete ch.templates[templateKey];
        }
        // splice out the requested trait
        traitList.splice(traitIndex,1);
        ch.resequenceMultipleTraits();
    }
    else if( action.match(/insert/i) ) {
        // insert what kind of formatting?
        var formatItem = getRadioGroupValue( document.editTraitForm['insertTraitsListFormattingChbox'] );
        // create the format object (make it a 'real' Trait object so the disad limit check below will work)
        if( formatItem=='heading' ) {
            var headingText = document.getElementById('insertTraitHeadingText').value;
            var formatObj = cloneTraitFromGenericObject({ line: headingText });
        }
        else if( formatItem=='space' ) {
            var formatObj = cloneTraitFromGenericObject({ line: false });
        }
        // add it to the Character.traits array, inserting it after the index skill
      //  alert("splicing formatting item at position "+(traitIndex+1) );
        traitList.splice( traitIndex+1, 0, formatObj );
      //  alert(JSONstring.make(traitList));
    }
    else /* action=='edit' */ {
        // update always-there Trait attributes using the form
        nameText = document.getElementById('editNameText').value;
        chTrait.name = nameText;
        chTrait.type = document.getElementById('editTraitType').value;
        chTrait.physMntlScl = document.getElementById('editTraitPMS').value;
        traitExSup = document.getElementById('editTraitCategory').value;
        chTrait.exoticSprntl = traitExSup;
        // update level if trait has them
        if( chTrait.hasOwnProperty('levels') ) {
            chTrait.levels = 1*document.getElementById('newTraitLevel').value;
        }
        // update cost (form elements currently not being shown)
 //       chTrait.cost = 1*document.getElementById('editCostValue').value;
        // update description from form
      //  if( document.getElementById('editDescription').value ) {
            chTrait.description = document.getElementById('editDescription').value;
      //  }

        // update constant mods
        let modRow = 1;
        let constantModsArray = [];
        while( document.getElementById('editTraitConstantMod'+modRow+'Text') ) {
            if( !document.getElementById('editTraitConstantMod'+modRow+'Value').disabled ) {
                constantModsArray.push(
                    { text  :      document.getElementById('editTraitConstantMod'+modRow+'Text' ).value,
                      value : eval(document.getElementById('editTraitConstantMod'+modRow+'Value').value) } );
            }
            modRow++;
        }
        if( constantModsArray.length>0 ) chTrait.ConstantModsArray = constantModsArray;

        // update multipliers
        modRow = 1;
        let multipliersArray = [];
        while( document.getElementById('editTraitMultiplier'+modRow+'Text') ) {
            if( !document.getElementById('editTraitMultiplier'+modRow+'Value').disabled ) {
                let val = document.getElementById('editTraitMultiplier'+modRow+'Value').value;
                try {
                    multipliersArray.push(
                        { text  : document.getElementById('editTraitMultiplier'+modRow+'Text' ).value,
                          value : eval(val) } );
                }
                catch(err) { alert("'"+val+"' is not a number.") }
            }
            modRow++;
        }
        if( multipliersArray.length>0 ) chTrait.MultipliersArray = multipliersArray;
       // alert(JSONstring.make(chTrait));

        // update enhancment/limitations
        modRow = 1;
        let enhLimsArray = [];
        while( document.getElementById('editTraitEnhanceLimit'+modRow+'Text') ) {
            if( !document.getElementById('editTraitEnhanceLimit'+modRow+'Value').disabled ) {
                enhLimsArray.push(
                    { text  :      document.getElementById('editTraitEnhanceLimit'+modRow+'Text' ).value,
                      value : eval(document.getElementById('editTraitEnhanceLimit'+modRow+'Value').value) } );
            }
            modRow++;
        }
        if( enhLimsArray.length>0 ) chTrait.EnhLimsArray = enhLimsArray;
        // what if removing?  enhLimsArray.length==0, but we want to save change anyway
        else if( chTrait.EnhLimsArray ) { delete chTrait.EnhLimsArray }
     // console.log(JSONstring.make(chTrait));
    }

    // check for disads that exceed the game limit
    // formula wrong: if this is an edit, this disad's cost is in both the chTrait.finalCost() and in ch.disadsQuirksPoints().
    // alert( Math.abs(ch.disadsQuirksPoints())+' > '+ch.gameInfo.disadPointsLimit );
    var disadLimitPoints = Math.abs( ch.disadsPoints() + ch.attrDisadPoints() );
//     if( chTrait.finalCost()<0 && disadLimitPoints>ch.gameInfo.disadPointsLimit ) {
//         var overrule = confirm("Taking this disadvantage will push "+ch.description.name+"'s disadvantage point total ("+disadLimitPoints+") beyond the game limit of "+ch.gameInfo.disadPointsLimit+".  See B26 (3rd edition) or B11 (4th edition) for more information.  \n\nProceed?");
//         if( !overrule ) return false;
//     }

    // put the dialog box away
    document.getElementById('editTraitDialog').style.display = 'none';

    // cause character to be reloaded so that the edited trait gets shown
    let editMenuName = (nameText.length>10) ? nameText.toTitleCase().substr(0,10) : nameText;
    loadCharacter( ch, action+" "+editMenuName );
}

function customTalentDialog( skillSet, sortKey, skillToSelect ) {
    if( !skillSet ) {   // try to get it from the form
        skillSet = getCheckedValue( document.getElementById("customTalentForm").skillSetSelector );
    }
    console.log(skillSet);
    if( !sortKey ) sortKey = 'name';

    // sort items from the appropriate library data object according to the sort key
    var SkillsObj = (skillSet) ? eval(skillSet) : Skills;
    var skillItems = [];
    for( var label in SkillsObj ) {
        if( !SkillsObj[label].name ) continue;
				skillItems.push( { key: label, value: SkillsObj[label] } );
    }
    skillItems.sort(
        function(a,b) {
            if( !a.value[sortKey] && !b.value[sortKey] ) return 0;
            if( !a.value[sortKey] ) return -1;
            if( !b.value[sortKey] ) return  1;
            if( isNaN(a.value[sortKey]) && isNaN(b.value[sortKey]) ) {
                if( a.value[sortKey].toLowerCase() < b.value[sortKey].toLowerCase() ) return -1;
                if( a.value[sortKey].toLowerCase() > b.value[sortKey].toLowerCase() ) return  1;
                return 0;
            }
            else { return a.value[sortKey] - b.value[sortKey]; }
        }
    );

    var selectSkillsMenu = document.getElementById('selectTalentSkillsMenu');
    // loop over sorted skill items array to make menu options
    selectSkillsMenu.innerHTML = '';
    var skillOptionsHTML = [''];
  SKILLS:
    for( var n in skillItems ) {
        var label = skillItems[n].key;
        var putativeSkill = skillItems[n].value;
        if( putativeSkill.name ) {
            // push option for this skill
            var skillName  = putativeSkill.name;
            var selected = ( skillToSelect && skillToSelect==label ) ? 'selected="selected"' : '';
            skillOptionsHTML.push('            <option value="'+label+'" title="ref for '+label+'" '+selected+'>'+skillName+'</option>');
        }
        else {
            skillOptionsHTML.push('            <option value="'+label+'">['+label+' row]</option>');
        }
    }
    skillOptionsHTML.push('          ');
    selectSkillsMenu.innerHTML = skillOptionsHTML.join("\n");

    var selectedSkillsMenu = document.getElementById('selectedTalentSkillsMenu');
    // update or initialize the custom talent skills list
    updateCustomTalent();
    // loop over customTalentList array to make menu options
    selectedSkillsMenu.innerHTML = '';
    var skillOptionsHTML = [''];
  TLIST:
    for( var n in customTalentList ) {
        var label = customTalentList[n];
        var putativeSkill = SkillsObj[label];   // combined skill/spell talents impossible when this is done this way
        if( putativeSkill.name ) {
            // push option for this skill
            var skillName  = putativeSkill.name;
            skillOptionsHTML.push('            <option value="'+label+'" title="ref for '+label+'">'+skillName+'</option>');
        }
        else {
            skillOptionsHTML.push('            <option value="'+label+'">['+label+' row]</option>');
        }
    }
    skillOptionsHTML.push('          ');
    selectedSkillsMenu.innerHTML = skillOptionsHTML.join("\n");

    setupDialog('customTalentDialog');
    return false;
}
function talentCost() {
    if( typeof customTalentList==='undefined' ) { return 0; }
    else if( ch.gameInfo.ruleset.match(/3/) ) { return 6; }
    else {
        var length = customTalentList.length;
        if( length<=6 ) return 5;
        else if( length<=12 ) return 10;
        else return 15;
    }
    // it sure looks to me like a linear 1 point per skill in the Talent group would be about right...
}
function updateCustomTalent( skillMenu ) {
    if( typeof customTalentList==='undefined' ) { customTalentList = []; }
    if( !skillMenu ) return;
    if( skillMenu.name=='selectTalentSkillsMenu' ) {
        if( customTalentList.indexOf(skillMenu.value)>=0 ) return;    // skip skills already picked
        customTalentList.push( skillMenu.value );
    }
    else {
        customTalentList.splice( customTalentList.indexOf(skillMenu.value), 1 );
    }
   // alert(skillMenu.value);
    customTalentDialog( false, false, skillMenu.value );
  //  alert(JSONstring.make(customTalentList));
    document.getElementById('customTalentCalculatedCost').innerHTML = talentCost();
}
function createCustomTalent( customTalentForm ) {
    var TalentName  = customTalentForm.TalentName.value;
    if( !TalentName.replace(/\W+/g,'') ) {
      alert('Please name your Talent!');
      return false;
    }
    var TalentLabel = TalentName.replace(/\W+/g,'')+'Talent';
    var TalentTrait = new Trait( TalentName+" Talent", 'A', 'M', talentCost(), true, 'USER' );
    TalentTrait.highestLevel = 4;
    TalentTrait.key = TalentLabel;

    /* where to put the adjustments?
    Even if the Talent is to be added only 'temporarily' to the Traits object,
    so that it can be taken by characters for a bit, all of the adjustments must be placed
    somewhere persistent, so that the Talent works.  So I think to claim that there is an
    option to make the Talent temporarily available, as distinct from actually adding it to
    a new character, is disingenuous.
    It would be nice to figure out some way that you could create a Talent, and THEN open
    an existing character, and give the Talent to that character.  But the Trait machinery
    would need to know somehow that in THIS case, it needs to copy the relevant adjustments
    into the character object.
    A clumsy, but effective, fix would be to ALWAYS copy relevant adjustments when a
    character takes a trait.  This would still leave open the unlikely possibility of a new
    adjustment depending on an existing trait that a character has already taken -
    the new adjustment might not work in that (probably very rare) case.  Or would it?
    Would a 'loadAdjustments' attribute for the Talent trait be useful? */

    /* deal with new talent as requested by user */
    var saveOpt = getCheckedValue( customTalentForm.talentSaveOption );
    if( saveOpt=='apply' ) {
        TalentTrait.levels = customTalentForm.selectTalentLevel.value;
    		var ch = document.loadedCharacter;
        if( customTalentForm.selectTalentTarget.value=='new' ) ch = new Character( 'New Character', 100, 'e4' );
        // attach the talent to the (new) character object
        ch.traits.push(TalentTrait);
        // adjustments also need to be added to ch.adjustments
        for( var i in customTalentList ) {
            var skillLabel = customTalentList[i];
            // create an Adjustment object for each skill in the list
            var adjustment = { from: TalentLabel, amount: 1, upto: 4, targetCategory: 'SK', target: skillLabel };
            var adjLabel = skillLabel+'_from_'+TalentLabel;
            ch.adjustments[adjLabel] = adjustment;
        }
        // group?
 //       loadCharacter( ch, "Add '"+TalentName+"' Talent" );
        loadCharacter( ch, "Add Talent" );
    }
    else if( saveOpt=='offer' ) {
        Traits[TalentLabel] = TalentTrait;
    		// and add the adjustments to the Adjustments library object
        for( var i in customTalentList ) {
            var skillLabel = customTalentList[i];
            // create an Adjustment object for each skill in the list
            var adjustment = { from: TalentLabel, amount: 1, upto: 4, targetCategory: 'SK', target: skillLabel };
            var adjLabel = skillLabel+'_from_'+TalentLabel;
            Adjustments[adjLabel] = adjustment;
        }
        Groups[TalentLabel] = customTalentList;
    }
    else if( saveOpt=='export' ) {
    		// this might be a little more complex; several moving parts (could just concatenate them...)
    		var json = 'Traits.'+TalentLabel+' = '+JSONstring.make(TalentTrait)+';';
    		json += "\n\n";
        for( var i in customTalentList ) {
            var skillLabel = customTalentList[i];
            // create an Adjustment object for each skill in the list
            var Adjustment = { from: TalentLabel, amount: 1, upto: 4, targetCategory: 'SK', target: skillLabel };
            var AdjLabel = skillLabel+'_from_'+TalentLabel;
            json += 'Adjustments.'+AdjLabel+' = '+JSONstring.make(Adjustment)+';';
            json += "\n";
        }
    		json += "\n\n";
    		json += 'Groups.'+TalentLabel+' = '+JSONstring.make(customTalentList)+';';
    		alert(json);
    }

    for( var i in customTalentList ) {
        var skillLabel = customTalentList[i];
        // create an Adjustment object for each skill in the list
        var Adjustment = { from: TalentLabel, amount: 1, upto: 4, targetCategory: 'SK', target: skillLabel };
        var AdjLabel = skillLabel+'_from_'+TalentLabel;
    }

}

function createQuirkPerkDialog() {
    setupDialog('quirkPerkDialog');
    return false;
}

function loadQuirkPerkFromDialog() {
    var ch = document.loadedCharacter;
    // hide the quirkPerkDialog
    document.getElementById('quirkPerkDialog').style.display = 'none';
    // get text, and quirk/perk choice
    var pqtext   = document.getElementById('quirkPerkDescription').value;
    var pqtype   = 'Q';
    var pqcost   = -1;
    if( document.quirkPerkForm.quirkPerkChoice[1].checked ) {
        var pqtype   = 'P';
        var pqcost   =  1;
    }
   // alert("got text '"+pqtext+"', a "+pqchoice+", (goes in "+traitTypeNames[pqtype]+"s)");

    var pq = new Trait( pqtext, pqtype );
    pq.cost = pqcost;

    // check for quirks that exceed the game limit
   // alert( Math.abs(ch.quirksPoints())+'+'+Math.abs(pq.finalCost())+' > '+ch.gameInfo.quirkPointsLimit );
//     if( pq.finalCost()<0 && Math.abs(ch.quirksPoints()+pq.finalCost())>ch.gameInfo.quirkPointsLimit ) {
//         var overrule = confirm("Taking this quirk will push "+ch.description.name+"'s quirks point total beyond the game limit of "+ch.gameInfo.quirkPointsLimit+".\nProceed?");
//         if( !overrule ) return false;
//     }

    ch.traits.push( pq );

   // alert('in loadQuirkPerkFromDialog: is "'+pq.name+'" an instance of the Trait object? '+( pq instanceof Trait ));

    // cause character to be reloaded so that the Quirk/Perk becomes visible
    loadCharacter( ch, "Add "+traitTypeNames[pqtype].toTitleCase() );
    createQuirkPerkDialog();
    return false;
}

// Skills
function selectSkillDialog( selectedValue, sortKey ) {
   // console.log( "at beginning of selectSkillDialog, Spells has "+Object.keys(Spells).length+" keys" );

    var skillClass = document.getElementById('selectSkillOrSpell').value;
    document.getElementById('selectSkillTLcollegeWrapper').style.visibility='hidden';
    document.getElementById('selectedSkillPrereqs').innerHTML='';
    // snap custom skills fieldset closed
    document.getElementById('customSkillFormWrapper').style.display='none';
    document.getElementById('customSkillToggleButton').src='../images/plus_blue.gif';
    document.getElementById('customSkillCustomSpellFormWrapper').style.display='none';
    document.getElementById('selectedSpellCostStats').innerHTML = '&nbsp;<br /><i>no stats available</i>';

    var sortMenu = document.getElementById('selectSkillSort');
    if( !sortKey ) sortKey = sortMenu.value;
    if( !sortKey ) sortKey = 'name';
  //  alert(sortKey);

    // get filter inputs
    var attFilter = [];
    var attList = ['IQ','DX','HT','ST'];
    var dFilter = [];
    var dList = ['easy','average','hard','veryhard'];
    // alter lists and form qua edition, if needed
    var ch = document.loadedCharacter;
    if( ch.gameInfo.ruleset.match(/e4/) ) {
        attList = ['IQ','DX','HT','ST','Per','Will'];
        $('#skillsFiltersTable4eAttsRow').show();
        $('#skillsFiltersTableCoreRulesRow').hide();
    }
    for( var attIndex in attList ) {
        var att = attList[attIndex];
        attFilter[att] = document.selectSkillForm[att+'Checkbox'].checked;
    }
    for( var dIndex in dList ) {
        var dfl = dList[dIndex];
        dFilter[dfl] = document.selectSkillForm[dfl+'Checkbox'].checked;
    }
    var SkillCategoryDisplayOption = document.getElementById('SkillCategoryDisplayMenu').value;
 //   alert(SkillCategoryDisplayOption);
    var SkillPrereqDisplayOption   = document.getElementById('SkillPrereqDisplayMenu').value;
    var SpellCollegeDisplayOption  = document.getElementById('SpellCollegeDisplayMenu').value;
    // personalize the prerequisites message
    document.getElementById('selectSkillsFiltersPrereqNoticeCharacter').innerHTML
        = ch.firstName();
    let corFilter = document.selectSkillForm.coreRulesCheckbox.checked;

    var SkillsLibObj = ( skillClass=='Skill' ) ? Skills : Spells;
      //  alert( JSONstring.make(SkillsLibObj) );
    // configure display according to Skill object type
    if( skillClass=='Skill' ) {
        // show the skill specializations table and hide the spell stats line
        document.getElementById('skillSpecializationsTable').style.display = 'table';
        document.getElementById('spellStatsTable').style.display = 'none';
        // remove 'by college' sort option
        for( i=sortMenu.length-1; i>=0; i-- ) {
            if( sortMenu.options[i].value=='college' ) {
                sortMenu.remove(i);
            }
        }
        // hide the spells-only filter options
       // document.getElementById('SkillPrereqDisplayTR').style.display = 'none';
        document.getElementById('SpellCollegeFilterTR').style.display = 'none';
        // populate the min TL span
        document.getElementById('displayChTL2').innerHTML = ch.gameInfo.TL;
        // show the skill category filter
        if( Groups.hasOwnProperty('SkillCategories') ) {
            var hasCategoryOpt = false;
            for( i=sortMenu.length-1; i>=0; i-- ) {   // first, make sure it isn't already there
                if( sortMenu.options[i].value=='category' ) {
                    hasCategoryOpt = true;
                }
            }
            if ( !hasCategoryOpt ) {                   // then add the option if it isn't
                var elOptNew = document.createElement('option');
                elOptNew.text  = 'category';
                elOptNew.value = 'category';
                sortMenu.add( elOptNew );
            }
            var SkillCategoryOptionsHTML = '<option value="all">(all)</option>';
            for( var sci=0; sci<Groups.SkillCategories.length; sci++ ) {
                var skillCat = Groups.SkillCategories[sci];
                var sel = (skillCat==SkillCategoryDisplayOption) ? ' selected="selected"' : '';
                SkillCategoryOptionsHTML += "\n                      "
                    + '<option value="'+skillCat+'"'+sel+'>'+skillCat.replace(/skills/i,'')+'</option>';
            }
            document.getElementById('SkillCategoryDisplayMenu').innerHTML = SkillCategoryOptionsHTML;
            document.getElementById('SkillCategoryFilterTR').style.display = 'table-row';
        }
    }
    else {
        // show the spell stats line and hide the skill specializations table         YO! What about spells that require a specialization, huh? (*cough* Plane Shift *cough* Shapeshifting *cough*)
        document.getElementById('skillSpecializationsTable').style.display = 'none';
        document.getElementById('spellStatsTable').style.display = 'table';
        // Spells, so add 'by college' sort option
        var hasCollegeOpt = false;
        for( i=sortMenu.length-1; i>=0; i-- ) {   // first, make sure it isn't already there
            if( sortMenu.options[i].value=='college' ) {
                hasCollegeOpt = true;
            }
        }
        if ( !hasCollegeOpt ) {                   // then add the option if it isn't
            var elOptNew = document.createElement('option');
            elOptNew.text  = 'college';
            elOptNew.value = 'college';
            sortMenu.add( elOptNew );
        }
        // remove 'by category' sort option (won't be there in a 4th edition library)
        for( i=sortMenu.length-1; i>=0; i-- ) {
            if( sortMenu.options[i].value=='category' ) {
                sortMenu.remove(i);
            }
        }
        // display spell customizing fields
        document.getElementById('customSkillCustomSpellFormWrapper').style.display='block';
        // hide the skill category filter
        if( Groups.hasOwnProperty('SkillCategories') )
            document.getElementById('SkillCategoryFilterTR').style.display = 'none';
        // show the spells-only filter options
       // document.getElementById('SkillPrereqDisplayTR').style.display = 'table-row';
        document.getElementById('SpellCollegeFilterTR').style.display = 'table-row';
        // populate the spell filter-by-college and custom spell colleges menus
        // loop over the Group.MagicColleges array
        // use these to pick out entries in the collegeNames hash
        // build menu options with these hash entries
        var optsHTML = ['','  <option value="all">(any)</option>'];
        Groups.MagicColleges.sort();
        for( var c=0; c<Groups.MagicColleges.length; c++ ) {
            var collKey = Groups.MagicColleges[c];
            var collName = (collegeNames[collKey]) ? collegeNames[collKey] : collKey;
            var selected = (collKey==SpellCollegeDisplayOption) ? ' selected="selected"' : '';
            optsHTML.push('  <option value="'+collKey+'"'+selected+'>'+collName+'</option>');
        }
        optsHTML.push('');
        $('#SpellCollegeDisplayMenu').html( optsHTML.join("\n                    ") );    // filter
        optsHTML.splice(1,1);   // cutting out the 'any' option
        $('#customSkillSpellCollegeMenu').html( optsHTML.join("\n                    ") );
        // pre-select the usual options for Type and Difficulty for spells
        $('#customSkillType').val('M');
        $('#customSkillDifficulty').val('2');
        // Attribute must be done a little later, as the menu gets re-populated below
    }
    document.getElementById('customSkillFieldsetLegendText').innerHTML = 'Custom '+skillClass;

    // localize Character object
    var ch = document.loadedCharacter;
    // personalize the 'character already has this' message
    document.getElementById('nameHasSkill').innerHTML = ch.firstName();

    // populate trait menus
    var traitOptionsHTML
        = makeObjectOptions( makeSortedKeyItemList( Traits, 'name' ), false, '                ' );
    // populate skill menus
    var skillOptionsHTML
        = makeObjectOptions( makeSortedKeyItemList( Skills, 'name' ), false, '                ' );
    // populate spell menus
    var spellOptionsHTML
        = makeObjectOptions( makeSortedKeyItemList( Spells, 'name' ), false, '                ' );

    // populate group menus
   // console.log(Object.keys(Groups));
    var groupsHash = {};
  GRPKEYS:
    for( var k=0; k<Object.keys(Groups).length; k++ ) {
        var gpKey  = Object.keys(Groups)[k];
        var gpName = GroupNames[gpKey];
        if( GroupNames[gpKey]==undefined ) {
            name = collegeNames[gpKey];
            if( name==undefined ) continue GRPKEYS; // gpName = gpKey;
            name = name.replace(/\//,' and ');
            gpName = name+' College Spells';
        }
       // if( gpName==undefined ) gpName = gpKey;
        if( !groupsHash[gpName] ) {
          //  console.log('setting groupsHash['+gpName+']='+gpKey);
            groupsHash[gpName] = gpKey;
        }
       // else
          //  console.log('groupsHash['+gpName+'] already set; skipping '+gpKey);
    }
    var groupOptionsHTML = [''];
    // for( var k=0; k<Object.keys(Groups).length; k++ ) {
    //     var gpKey  = Object.keys(Groups)[k];
    //     var gpName = GroupNames[gpKey];
    //     if( !GroupNames[gpKey] ) gpName = collegeNames[gpKey];
    //     groupOptionsHTML.push('  <option value="'+gpKey+'">'+gpName+'</option>');
    // }
    for( var nm in groupsHash ) {
        var gpKey = groupsHash[nm];
        if( !GroupNames[nm] ) gpKey = collegeNames[nm];
        groupOptionsHTML.push('  <option value="'+gpKey+'">'+nm+'</option>');
    }
    groupOptionsHTML.push('');
   // alert(groupOptionsHTML);
    $('#customSkillPrerequisiteGroupsMenu').html( groupOptionsHTML.join("\n                    ") );

    // populate Attribute menu under Custom Skill/Spell fieldset depending on ruleset
    // (AttributeOptionsList is a var defined in the library js)
    var AttOptionsList = makeSelectListOptions( AttributeOptionsList, 'DX' );
    AttOptionsList.unshift('  ');
    AttOptionsList.push('');
    var attOptionsHTML = AttOptionsList.join("\n                          ");
    // inject the options HTML into the appropriate select elements
    document.getElementById('customSkillDefaultSkillsMenu').innerHTML      = skillOptionsHTML;
    document.getElementById('customSkillPrerequisiteSkillsMenu').innerHTML = skillOptionsHTML;
    document.getElementById('customSkillPrerequisiteSpellsMenu').innerHTML = spellOptionsHTML;
    document.getElementById('customSkillAdjustingTraitMenu').innerHTML     = traitOptionsHTML;
    document.getElementById('customSkillPrerequisiteTraitsMenu').innerHTML = traitOptionsHTML;
    document.getElementById('CustomSpellResistedByMenu').innerHTML         = attOptionsHTML;
    document.getElementById('customSkillAttribute').innerHTML              = attOptionsHTML;
    if( skillClass=='Spell' ) $('#customSkillAttribute').val('IQ');

    // sort items from the Skills data object according to the sort key
    var skillItems = [];
    for( var memberName in SkillsLibObj ) {
        // alert(memberName+":\n"+JSONstring.make(SkillsLibObj[memberName]));
        let SklItem = SkillsLibObj[memberName];
        skillItems.push( { key: memberName, value: SklItem } );
    }
    skillItems.sort(
        function(a,b) {
            if( !a.value[sortKey] && !b.value[sortKey] ) return 0;
            if( !a.value[sortKey] ) return -1;
            if( !b.value[sortKey] ) return  1;
            if( isNaN(a.value[sortKey]) && isNaN(b.value[sortKey]) ) {
                if( a.value[sortKey].toLowerCase() < b.value[sortKey].toLowerCase() ) return -1;
                if( a.value[sortKey].toLowerCase() > b.value[sortKey].toLowerCase() ) return  1;
                return 0;
            }
            else { return a.value[sortKey] - b.value[sortKey]; }
        }
    );
    // sort by category using the CategoriesHash
    if( Groups.hasOwnProperty('SkillCategories') && skillClass=='Skill' && sortKey=='category' ) {
        // clear skillItems array, then repopulate from CategoriesHash
        skillItems = [];
        skillItems.push( { key: 'spacer',  value: SkillsLibObj['spacer'] } );
        skillItems.push( { key: 'heading', value: SkillsLibObj['heading'] } );
        // get a sorted array of the category name keys
        var categories = [];
        for( var k in CategoriesHash ) categories.push(k);
        categories.sort();    // sorted category names
        // push items onto the skillItems array by looping over categories, then spells
       // for( var sKey in CategoriesHash ) {
        for( var ci=0; ci<categories.length; ci++ ) {
            var categorySkills = CategoriesHash[categories[ci]];
            categorySkills.sort();
       // console.log(JSONstring.make(categorySkills));
            for( var si=0; si<categorySkills.length; si++ ) {
                var memberName = categorySkills[si];
                skillItems.push( { key: memberName, value: SkillsLibObj[memberName], category: categories[ci] } );
            }
        }
    }
    // sort by colleges using the CollegeHash
    if( skillClass=='Spell' && sortKey=='college' ) {
        // clear skillItems array, then repopulate from CollegeHash
        skillItems = [];
        skillItems.push( { key: 'spacer',  value: SkillsLibObj['spacer'] } );
        skillItems.push( { key: 'heading', value: SkillsLibObj['heading'] } );
        // get a sorted array of the college name keys
        var colleges = [];
        for(var k in CollegeHash) colleges.push(k);
        colleges.sort();    // sorted college names
        // push items onto the skillItems array by looping over colleges, then spells
       // for( var sKey in CollegeHash ) {
        for( var ci=0; ci<colleges.length; ci++ ) {
            var collegeSpells = CollegeHash[colleges[ci]];
            collegeSpells.sort();
            for( var si=0; si<collegeSpells.length; si++ ) {
                var memberName = collegeSpells[si];
                skillItems.push( { key: memberName, value: SkillsLibObj[memberName], college: colleges[ci] } );
            }
        }
    }

    // loop over Skills in Skills object to make menu options
    var skillOptionsHTML = [''];
    var savedVal;
  SKILLS:
    for( var n in skillItems ) {
        var memberName = skillItems[n].key;
        var putativeSkill = skillItems[n].value;
       // if( memberName.match(/Adjustable/) )
       // alert(memberName+":\n"+JSONstring.make(putativeSkill));
        // console.log(memberName+":\n"+JSONstring.make(putativeSkill));
        if( putativeSkill.name ) {

            // filter out skills already taken
            var canTakeMultiple = false;
            if( ch.hasSkill(memberName) ) {
               // console.log("[selectSkillDialog] "+ch.firstName()+" has the "+putativeSkill.name+" skill:");
               // console.log( putativeSkill );
                if( putativeSkill.specRequiredList ) canTakeMultiple = true;
               // if( canTakeMultiple) console.log(" but this skill is specialized; showing");
                if( putativeSkill.TLs && ch.preferences.display.TLinfo ) canTakeMultiple = true;
               // if( putativeSkill.TLs && ch.preferences.display.TLinfo ) console.log(" but this skill has Tech Levels (and ch wants these shown)");
               // if( !canTakeMultiple ) console.log("skipping display of "+putativeSkill.name);
                if( !canTakeMultiple ) continue SKILLS;
            }
            // filter for attributes checked
            for( var attIndex in attList ) {
                var att = attList[attIndex];
                if(  putativeSkill.attribute==att && !attFilter[att] ) { continue SKILLS; }
            }
            // filter for difficulties checked
            for( var dIndex in dList ) {
                var dfl = dList[dIndex];
                if(  putativeSkill.difficulty==dIndex && !dFilter[dfl] ) { continue SKILLS; }
            }
            // filter on prerequisites (spells only)
            var disableNoPrereq = '';
            var noPrereqTitleText = '';
            if( SkillPrereqDisplayOption && !putativeSkill.chHasPrereqs() ) {
                if( SkillPrereqDisplayOption=='hide' )    { continue SKILLS; }
                if( SkillPrereqDisplayOption=='mark' )    { disableNoPrereq = ' style="color:#843"'; noPrereqTitleText = '; missing prerequisites' }
                if( SkillPrereqDisplayOption=='disable' ) { disableNoPrereq = ' disabled="disabled"'; noPrereqTitleText = '; missing prerequisites' }
            }
            // filter on spell college
            if( skillClass=='Spell' && SpellCollegeDisplayOption!='all' ) {
                var foundCollege = false;
                // for( var i in putativeSkill.colleges ) {
                //     if( putativeSkill.colleges[i].match(SpellCollegeDisplayOption) ) foundCollege = true;
                // }
                // console.log("Groups["+SpellCollegeDisplayOption+"]: (length "+Groups[SpellCollegeDisplayOption].length+")\n"+Groups[SpellCollegeDisplayOption]);
                for( var i=0; i<Groups[SpellCollegeDisplayOption].length; i++ ) {
                    // console.log("Groups["+SpellCollegeDisplayOption+"]["+i+"]: "+Groups[SpellCollegeDisplayOption][i]);
                    if( Groups[SpellCollegeDisplayOption][i]==putativeSkill.key ) foundCollege = true;
                }
                foundCollege = putativeSkill.isInGroup(SpellCollegeDisplayOption);
                if( !foundCollege ) { continue SKILLS; }
            }
            // filter on skill category
            if( skillClass=='Skill' && SkillCategoryDisplayOption && SkillCategoryDisplayOption!='all' ) {
                var foundCat = putativeSkill.isInGroup(SkillCategoryDisplayOption);
               // console.log(putativeSkill.name+" in "+SkillCategoryDisplayOption+"?\t"+foundCat);
                if( !foundCat ) { continue SKILLS; }
            }
            // filter on minimum Tech Level
            if( skillClass=='Skill' && document.getElementById('SkillDialogSameTLcheckbox').checked
                && putativeSkill.minTL && putativeSkill.minTL>ch.gameInfo.TL ) {
              continue SKILLS;
            }
            // Core Rules filter
            if( !putativeSkill.reference.match(/B\d+E/i)    &&  corFilter ) { continue; }

            // put in an optgroup divider, except for certain sort keys (no categories, like 'name')
            var skVal = putativeSkill[sortKey];
            if( sortKey.match('college') )  skVal = skillItems[n].college;
            if( sortKey.match('category') ) skVal = skillItems[n].category;
            if( !sortKey.match(/name/) && skVal!=savedVal ) {
                if(n!=0) skillOptionsHTML.push('          </optgroup>');
                var label = ( sortKey.match('difficulty') ) ? Difficulties[skVal] : skVal;
                skillOptionsHTML.push('          <optgroup label="'+label+'">');
            }
       // console.log(putativeSkill.name);

            // push option for this skill
            var skillName  = putativeSkill.name;
            var asx = (canTakeMultiple) ? '*' : '';
            var selected = ( selectedValue && selectedValue==memberName ) ? 'selected="selected"' : '';
            var ref = putativeSkill.reference;
            var title = ( ref ) ? ref : 'ref for '+memberName;
            title += noPrereqTitleText;
            skillOptionsHTML.push('            <option value="'+memberName+'" title="'+title+'" '+disableNoPrereq+selected+'>'+skillName+asx+'</option>');
        }
        else {
            skillOptionsHTML.push('            <option value="'+memberName+'">['+memberName+' row]</option>');
        }
        savedVal = skVal;
    }
    if( sortKey.match(/difficulty|attribute/) ) {
        skillOptionsHTML.push('          </optgroup>');
    }
    skillOptionsHTML.push('          ');
    // console.log("[selectSkillDialog] adding "+skillOptionsHTML.length+" options to the skills menu");
    document.getElementById('selectSkillMenu').innerHTML = skillOptionsHTML.join("\n");

    // show or hide the 'type' field in the custom skill form
    if( ch.gameInfo.ruleset.match(3) ) {
        document.getElementById('customSkillTypeLabelCell').style.visibility='visible';
        document.getElementById('customSkillTypeInputCell').style.visibility='visible';
    }
    else {
        document.getElementById('customSkillTypeLabelCell').style.visibility='hidden';
        document.getElementById('customSkillTypeInputCell').style.visibility='hidden';
    }

    // initialize submit button
    document.getElementById('selectSkillSubmit').innerHTML = 'take this '+skillClass.toLowerCase();
    $('#selectSkillSubmit').prop('disabled',true);
    // show the dialog
    setupDialog('selectSkillDialog');
    return false;
}
function showSkillInfoInDialog( SkillKey ) {
    var diffNames = new Array('Easy','Average','Hard','Very Hard');
    var ch = document.loadedCharacter;
    // hide the supplementary input divs first
    document.getElementById('customSkillWildcardRow').style.visibility='hidden';
    document.getElementById('selectedSkillPrereqs').innerHTML='';
    document.getElementById('selectSkillTLSpecWrapper').style.display='none';
    document.getElementById('selectSkillTLcollegeWrapper').style.visibility='hidden';
   // document.getElementById('skillSpecializationWrapper').style.display='none';
   // document.getElementById('skillSpecializationTR').style.visibility='hidden';
    document.getElementById('skillSpecializationTR').style.display='none';
    document.getElementById('selectSkillSpecializationWrapper').style.display='none';
    document.getElementById('selectSkillSpecialization').innerHTML = '';
    document.getElementById('specifySkillSpecializationWrapper').style.display='none';
    document.getElementById('specifySkillSpecialization').value='';
    document.getElementById('selectSkillOptSpecWrapper').style.display='none';
   // document.getElementById('selectSkillOptSpecWrapper').style.visibility='hidden';
    document.getElementById('selectSkillOptSpec').value='';
    document.getElementById('optionalSpecializationInputWrapper').style.visibility
      = ( document.getElementById('optSpecChbox').checked ) ? 'inherit' : 'hidden';
    document.getElementById('hasVersionNoticeBox').style.visibility='hidden';
    document.getElementById('optSpecChbox').removeAttribute('checked');
   // document.getElementById('optSpecChbox').checked = false;
    // un-select all the options in the custom spell colleges multi-select
    var cMenuOptions = document.getElementById('customSkillSpellCollegeMenu').options;
    for( var ci=0; ci<cMenuOptions.length; ci++ ) cMenuOptions[ci].selected = false;
    // un-check all the custom spell class checkboxes
    document.getElementById('SpellClassResistedCB').checked = false;
    for( var cli=0; cli<spellClassesList.length; cli++ )
        document.getElementById('SpellClassCB_'+spellClassesList[cli]).checked = false;
    // clear other stats in custom spell form
    document.getElementById('customSkillSpell_time').value = '';
    document.getElementById('customSkillSpell_duration').value = '';
    var spellStats = [ 'castcost', 'maintaincost' ];
    for( var g=0; g<spellStats.length; g++ )
        document.getElementById('customSkillSpell_'+spellStats[g]).value = '';

    var custom = ( document.getElementById('customSkillFormWrapper').style.display!='none' ) ? true : false;

    // localize the skill, so as to access its member attributes
    var SkillGp = document.getElementById('selectSkillOrSpell').value;
    var SkillsLibObj = ( SkillGp=='Skill' ) ? Skills : Spells;
    var selectedSkill = SkillsLibObj[SkillKey] || {};
    // console.log(selectedSkill);
    var att = selectedSkill.attribute;
    var dif = selectedSkill.difficulty;
    var typ = selectedSkill.type;

    // then show and populate the appropriate form inputs
    document.getElementById('customSkillName').value = selectedSkill.name || '';
    document.getElementById('customSkillAttribute').value = att;
    document.getElementById('customSkillType').value = typ;
    document.getElementById('customSkillDifficulty').value = dif;
    var basedOn = ( (typ=='M' && att!='IQ') || (typ=='P' && att!='DX') ) ? ', based on '+att : '';
    if( typ ) typ = ( typ=='M' ) ? 'Mental' : 'Physical';
    if( ch.gameInfo.ruleset.match(3) ) {
        document.getElementById('displayAttDiff').innerHTML
            = (typ)
            ? typ+' / '+diffNames[dif]+basedOn
            : '';
        document.getElementById('customSkillDifficulty').options[3].disabled = ( typ=='Mental' ) ? false : true;
    }
    else {
        document.getElementById('displayAttDiff').innerHTML
            = (att)
            ? att+' / '+diffNames[dif]
            : '';
    }
		if( selectedSkill.wildcard ) {
				document.getElementById('customSkillWildcard').checked = true;
		    document.getElementById('customSkillWildcardRow').style.visibility='visible';
		}
		else document.getElementById('customSkillWildcard').checked = false;
    // populate TL menus if skill has TLs; show them if ch.preferences.display.TLinfo is 'true'
    if( selectedSkill.hasOwnProperty('TLs') ) {
        document.getElementById('selectSpellCollegeInfo').style.display='none';
        document.getElementById('selectSkillTLwrapper').style.display='block';
        // get TL range from Skill object, or generate a range
        var TLs = selectedSkill.TLs;
        if( typeof selectedSkill.TLs != 'Array' ) {
            TLs = [];
            for(var i=1; i<15; i++) { TLs.push(i); }
        }
       // if( window.console ) { console.log("in showSkillInfoInDialog, TLs (array) is "+TLs); }
        // write the options HTML
        var TLoptionsHTML = [''];
        for( var tl=0; tl<TLs.length; tl++ ) {
            var TL = TLs[tl];
            var TLdisabled = ( !selectedSkill.hasOwnProperty('specRequiredList') && ch.hasSkill(SkillKey,TL)) ? ' disabled="disabled"' : '';
            var TLmenuFired = document.getElementById('TLmenuFired').value;
            var TLselected = ( !TLdisabled && (TL==TLmenuFired || (!TLmenuFired && TL==ch.TL())) ) ? ' selected="selected"' : '';
            TLoptionsHTML.push('                <option value="'+TL+'"'+TLselected+TLdisabled+'>'+TL+'</option>');
        }
        TLoptionsHTML.push('              ');
        document.getElementById('selectSkillTL').innerHTML = TLoptionsHTML.join("\n");
        document.getElementById('customSkillTL').innerHTML = TLoptionsHTML.join("\n");
        if( ch.preferences.display.TLinfo )
            document.getElementById('selectSkillTLcollegeWrapper').style.visibility='visible';
    }
    if( selectedSkill.TLspecs ) {
        document.getElementById('selectSkillTLcollegeWrapper').style.visibility='visible';
        document.getElementById('selectSkillTLwrapper').style.display='block';  // console.log("showing TL menu");
        document.getElementById('selectSkillTLSpecWrapper').style.display='block';
        // an alternative to this would be to figure out a way to take this information and use it
        //  to disable unavailable Tech Level options when a specialization is selected
        // OR disable unavailable specializations when certain Tech Levels are selected
        var TLspecOptionsHTML = [];
        var selectedTL = 1*document.getElementById('selectSkillTL').value;
        for( var tls in selectedSkill.TLspecs ) {
            var tlspecRange = selectedSkill.TLspecs[tls];
            // console.log(tlspecRange);    // console.log("includes selected TL ("+selectedTL+")?\t"+(tlspecRange.includes(selectedTL)));
            var disabled = ( tlspecRange.includes(selectedTL) ) ? '' : 'disabled="disabled"';
            TLspecOptionsHTML.push('                      <option value="'+tls+'" '+disabled+'>'+tls+'/TL'+selectedTL+'</option>');
        }
        TLspecOptionsHTML.push('                    ');
        document.getElementById('selectSkillTLSpec').innerHTML = TLspecOptionsHTML.join("\n");
    }
    else {
        if( selectedSkill.spell ) {
            document.getElementById('selectSkillTLcollegeWrapper').style.visibility='visible';
            document.getElementById('selectSpellCollegeInfo').style.display='block';
            document.getElementById('selectSkillTLwrapper').style.display='none';
            var colleges = [];
            for( ci=0; ci<Groups.MagicColleges.length; ci++ ) {
                var spellCollege = Groups.MagicColleges[ci];
                if( selectedSkill.isInGroup( spellCollege ) ) {
                  // add this college to list for display under main select
                  colleges.push( collegeNames[spellCollege] );
                  // also select this college in custom spell Colleges multi-select
                  var cMenuOptions = document.getElementById('customSkillSpellCollegeMenu').options;
                  for( var cj=0; cj<cMenuOptions.length; cj++ ) {
                      var cOpt = cMenuOptions[cj];
                      if( cOpt.value==spellCollege ) cOpt.selected = true;
                  }
                }
            }
            document.getElementById('selectSpellCollegeInfo').innerHTML = colleges.join('<br>');

            var statsLine = '';
            // spell classes
            var spellClasses = selectedSkill.classes;
            if( spellClasses ) {
                var classesForStatsLine = [];
                for( var spellClass in spellClasses ) {
                    classesForStatsLine.push( spellClassNames[spellClass] );
                   // alert("spellClassNames["+spellClass+"]: "+spellClassNames[spellClass]);
                    var resClassMatches = spellClass.match(/^r\w\w/);
                   // alert(resClassMatches);
                    if( spellClass!='reg' && resClassMatches ) {
                        document.getElementById('SpellClassResistedCB').checked = true;
                        // select the proper stat
                        var stat = resClassMatches[0].slice(1);
             //           alert(stat);
                        document.getElementById('CustomSpellResistedByMenu').value = stat.toUpperCase();
                    }
                    else
                        document.getElementById('SpellClassCB_'+spellClass).checked = true;
                }
                statsLine += ( classesForStatsLine.length ) ? '<b><i>'+classesForStatsLine.join('; ')+'</i></b><br />' : '';
            }
            // spell stats
            var spellStats = selectedSkill.stats;
            document.getElementById('selectedSpellCostStats').innerHTML = '&nbsp;<br /><i>no stats available</i>';
            if( spellStats ) {
                var castcost     = spellStats.castcost;
                var maintaincost = spellStats.maintaincost;
                var duration     = spellStats.duration;
                var time         = spellStats.time;
          //      alert(JSONstring.make(spellStats));
                // display stats
                if( castcost ) {
                    var timeUnits = ( isNaN(time) ) ? '' : 'turn'+es(time);
                    statsLine += ( spellClasses && spellClasses.area ) ? 'base cost: '+castcost : 'cost: '+castcost;
                    statsLine += (maintaincost) ? ', '+maintaincost+' to maintain' : '';
                    statsLine += (time) ? '; '+time+' '+timeUnits+' to cast' : '';
                    statsLine += (duration) ? '; duration: '+duration : '';
                    document.getElementById('selectedSpellCostStats').innerHTML = statsLine;
                }

                // fill stats in custom spell form
                for( var spellStat in spellStats ) {
                 // alert(spellStat);
                    if(spellStat=='notes') continue;
                    document.getElementById('customSkillSpell_'+spellStat).value = spellStats[spellStat];
                }
            }

            // check appropriate spell class boxes in the custom spell form
        }
        var selectedSpec = '';
        var specInstructions;
        if( selectedSkill.hasOwnProperty('specRequiredList') ) {
            // if this is a spell, we need to show the specializations table (normally hidden for spells)
            if( selectedSkill.spell )
                document.getElementById('skillSpecializationsTable').style.display = 'table';
            //console.log("has specRequiredList");
            selectedSpec = document.getElementById('selectSkillSpecChosen').value;
            // get specialization options from Skill object
            var specializations = selectedSkill.specRequiredList;
            // if a term other than 'specialization' is provided, use it
            var specCatName = ( selectedSkill.hasOwnProperty('specCategName') )
                            ? selectedSkill.specCategName
                            : 'specialization';
           // document.getElementById('skillSpecializationTR').style.visibility='visible';
            document.getElementById('skillSpecializationTR').style.display='table-row';
            if( specializations.length>0 ) {      // write the options HTML
                var specOptionsHTML = [''];
                for( var s in specializations ) {
                    var spec = specializations[s];
                    // if spec has already been taken, skip it
                    // if( ch.hasSkill(SkillKey,spec) ) continue;
                    // if spec has already been taken, disable it
                    var disabledSpec = ( (!selectedSkill.hasOwnProperty('TLs') || !ch.preferences.display.TLinfo ) && ch.hasSkill(SkillKey,spec) ) ? ' disabled="disabled"' : '';
                    var specSelected = ( spec==selectedSpec ) ? ' selected="selected"' : '';
                    specOptionsHTML.push('                      <option value="'+spec+'"'+specSelected+disabledSpec+'>'+spec+'</option>');
                }
                specOptionsHTML.push('                    ');
                if( !selectedSpec ) selectedSpec = specializations[0];
                document.getElementById('selectSkillSpecialization').innerHTML = specOptionsHTML.join("\n");
                document.getElementById('selectSkillSpecializationWrapper').style.display='inline';
                specInstructions = "Select "+a_n(specCatName)+' '+specCatName;
            }
            else {																// show the text input
                document.getElementById('specifySkillSpecializationWrapper').style.display='inline';
    //                specInstructions = "You must specify "+a_n(specCatName)+' '+specCatName;
                specInstructions = "Choose "+a_n(specCatName)+' '+specCatName;
            }
            specInstructions = specInstructions.replace(/\s/g,"&nbsp;");
            document.getElementById('selectSkillSpecInstructions').innerHTML = specInstructions;
        }
        else if( selectedSkill.spell ) {            // if this is a spell, (re-)hide the specializations table
                document.getElementById('skillSpecializationsTable').style.display = 'none';
        }
        //else if( !selectedSkill.spell && selectedSkill.attribute=="IQ" && selectedSkill.difficulty>0 ) {
        else if( !selectedSkill.spell && att=="IQ" && selectedSkill.dif>0 ) {
           // document.getElementById('selectSkillOptSpecWrapper').style.visibility='visible';
            document.getElementById('selectSkillOptSpecWrapper').style.display='table-row';
            // this option needs to be either/or with required specializations!
        }
        if( ch.hasSkill(SkillKey) ) {
            document.getElementById('hasVersionNoticeBox').style.visibility='visible';
        }
    }

    // show prerequisite information
    var spec = ( selectedSkill.hasOwnProperty('specRequiredList') )
             ? $('#selectSkillSpecialization').val()
             : false;
    //console.log('calling makePrereqsTable( '+selectedSkill+', '+spec+', '+SkillGp+', "          ")');
    document.getElementById('selectedSkillPrereqs').innerHTML = makePrereqsTable( selectedSkill, spec, SkillGp, "          " );

    // update the submit button text
    var customCaveat = ( custom ) ? ' custom' : '';
    document.getElementById('selectSkillSubmit').innerHTML
        = ( selectedSkill.hasOwnProperty('name') )
        ? 'Take <i>'+selectedSkill.name+'</i>'+customCaveat+' '+SkillGp.toLowerCase()
        : 'Insert '+SkillKey+' line';
    $('#selectSkillSubmit').prop('disabled',false);
    document.getElementById('TLmenuFired').value='';
}
function makePrereqsTable(  skillObj, selectedSpec, skillGp, indent, overrides ) {  // the 'skillGp' parameter should be capitalized, e.g. 'Skill' or 'Spell'
  //  alert(skillGp);
    if( !skillObj.hasOwnProperty('name') ) return '';
    var skillPrereqs = skillObj.prerequisitesFor();
  //  alert(JSONstring.make(skillPrereqs));
  //            alert( "Overridden Prereqs:\n"+JSONstring.make(OverriddenPrerequisites) );
    var prereqRows = [''];
    if( skillPrereqs.length>0 ) {
        prereqRows.push('  <table style="margin-top:1em">');
        prereqRows.push('    <colgroup>');
        prereqRows.push('      <col></col>');
        prereqRows.push('      <col style="width:30%"></col>');
        prereqRows.push('      <col style="width:2em"></col>');
        prereqRows.push('    </colgroup>');
        prereqRows.push('    <tbody>');
        var oHeader = ( overrides ) ? '<th style="text-align:center;width:3em">Over-<br />ride</th>' : '';
        prereqRows.push('      <tr style="border-bottom:1px solid blue; font-weight:bold"><td>Prerequisite</td><td>Type</td><td style="text-align:center">OR<br />grp</td>'+oHeader+'</tr>');
        var bgdClass = 'class="zrow"';
        var pRow = 1;
        for( var r in skillPrereqs ) {
            if( r=='length' ) continue;
            var prereqObj = skillPrereqs[r];
            //alert(JSONstring.make(prereqObj));
            // overridden prereqs
            var oTD = '';
            if( overrides ) {
                var checked = '';
                if( OverriddenPrerequisites.hasOwnProperty(r) ) {
                  //alert("replacing prereqObj with this:\n"+JSONstring.make(OverriddenPrerequisites[r]));
                    checked = 'checked="checked"';
                    prereqObj = OverriddenPrerequisites[r];
                  //alert("replaced prereqObj:\n"+JSONstring.make(prereqObj));
                }
                oTD = '<td style="text-align:center"><input id="prereq'+pRow+'" value="'+r+'" type="checkbox" '+checked+' style="height:9px" /></td>';
            }
            if( prereqObj.hasOwnProperty('targetSpec') ) {
                //alert(selectedSpec+' vs '+prereqObj.targetSpec);
                if( selectedSpec!=prereqObj.targetSpec ) continue;
            }
            var prereq   = prereqObj.prereq;
  //          alert(prereq);
            var prqSpec  = ( prereqObj.hasOwnProperty('prereqSpec') ) ? prereqObj.prereqSpec : null;
            var prqNum   = ( prereqObj.hasOwnProperty('number') )     ? prereqObj.number     : null;
            var specText = ( prqSpec )                                ? ' ('+prqSpec+') '    : '';
            var levText  = ( prereqObj.hasOwnProperty('level') )      ? '-'+prereqObj.level  : '';
            var pgroup   = ( prereqObj.hasOwnProperty('pgroup') )     ? prereqObj.pgroup     : '';
            var cat      = ( prereqObj.hasOwnProperty('category') )   ? prereqObj.category   : skillGp;
            if( cat.match(/^sk/i) ) cat = 'Skill';
            if( cat.match(/^sp/i) ) cat = 'Spell';
            if( cat.match(/^ad/i) ) cat = 'advantage';
            if( cat.match(/^di/i) ) cat = 'disadvantage';
     //       alert(cat);
            var prereqTargetObj = ( cat.match(/^s[kp]/i) ) ? eval( cat + 's' )[prereq] : Traits[prereq];
            cat = cat.toLowerCase();
            if( cat.match(/stat/i) ) prereqTargetObj = { name: prereq };
            if( prqNum ) prereqTargetObj = { name: prqNum+' '+prereq+' '+cat+'s' };
     //       alert(JSONstring.make(prereqTargetObj));
            if( prqNum ) cat += ' group';
            if( !prereqTargetObj ) continue;
            var prereqName = prereqTargetObj.name;
            var ORindent = ( pgroup ) ? '&emsp;' : '';
            var bgdClassAtt = ( bgdClassAtt ) ? '' : bgdClass;
            prereqRows.push('      <tr '+bgdClassAtt+'><td>'+ORindent+prereqName+levText+specText+'</td><td>'+cat+'</td><td style="text-align:center">'+pgroup+'</td>'+oTD+'</tr>');
            pRow++;
        }
        prereqRows.push('    </tbody>');
        prereqRows.push('  </table>');
        prereqRows.push('');
    }
    return prereqRows.join("\n"+indent);
}
function printPrereqs(  skillObj, selectedSpec, skillGp ) {  // the 'skillGp' parameter should be capitalized, e.g. 'Skill' or 'Spell'
  //  alert(skillGp);
    if( !skillObj.hasOwnProperty('name') ) return '';
    var skillPrereqs = skillObj.prerequisitesFor();
  //  alert(JSONstring.make(skillPrereqs));
  //            alert( "Overridden Prereqs:\n"+JSONstring.make(OverriddenPrerequisites) );
    var prereqstrings = [];
    var orprereqs = {};
    if( skillPrereqs.length>0 ) {

        for( var r in skillPrereqs ) {
            if( r=='length' ) continue;
            var prereqObj = skillPrereqs[r];
            //alert(JSONstring.make(prereqObj));
            // overridden prereqs
            if( prereqObj.hasOwnProperty('targetSpec') ) {
                //alert(selectedSpec+' vs '+prereqObj.targetSpec);
                if( selectedSpec!=prereqObj.targetSpec ) continue;
            }
            var prereq   = prereqObj.prereq;
  //          alert(prereq);
            var prqSpec  = ( prereqObj.hasOwnProperty('prereqSpec') ) ? prereqObj.prereqSpec : null;
            var prqNum   = ( prereqObj.hasOwnProperty('number') )     ? prereqObj.number     : null;
            var specText = ( prqSpec )                                ? ' ('+prqSpec+') '    : '';
            var levText  = ( prereqObj.hasOwnProperty('level') )      ? '-'+prereqObj.level  : '';
            var pgroup   = ( prereqObj.hasOwnProperty('pgroup') )     ? prereqObj.pgroup     : '';
            var cat      = ( prereqObj.hasOwnProperty('category') )   ? prereqObj.category   : skillGp;
            if( cat.match(/^sk/i) ) cat = 'Skill';
            if( cat.match(/^sp/i) ) cat = 'Spell';
            if( cat.match(/^ad/i) ) cat = 'advantage';
            if( cat.match(/^di/i) ) cat = 'disadvantage';
     //       alert(cat);
            var prereqTargetObj = ( cat.match(/^s[kp]/i) ) ? eval( cat + 's' )[prereq] : Traits[prereq];
            cat = cat.toLowerCase();
            if( cat.match(/stat/i) ) prereqTargetObj = { name: prereq };
            if( prqNum ) prereqTargetObj = { name: prqNum+' '+prereq };
     //       alert(JSONstring.make(prereqTargetObj));
            if( prqNum ) cat += ' group';
            if( !prereqTargetObj ) continue;
            var prereqName = prereqTargetObj.name;
            var prereqString = prereqName+levText+specText;
            if( pgroup ) {
                if( orprereqs[pgroup] ) orprereqs[pgroup].push(prereqString);
                else orprereqs[pgroup] = [prereqString];
            }
            else prereqstrings.push(prereqString);
        }
    }
    // iterate over the 'or' groups, making them into strings like "this or this or this" and push each onto the front of prereqstrings
    for( var porgp in orprereqs ) {
        prereqstrings.unshift( orprereqs[porgp].join(" <i>or</i> ") );
    }
    return prereqstrings.join(", ");
}
var visited = {};   // to kill infinite recursion loops (Possession requires Beast Possession(or) requires Possession(or))
function countPrereqs(  skillObj, selectedSpec, skillGp ) {   // console.log(skillObj);
    if( !skillObj.hasOwnProperty('name') ) return '';
    var skillPrereqs = skillObj.prerequisitesFor();
    // turn each prereq object into a number:
    let counts = [];
    let Counts = {};
    if( skillPrereqs.length>0 ) {
        var count = skillPrereqs.length;
        for( var p in skillPrereqs ) {
            if( p=='length' ) continue;
            var prereqObj = skillPrereqs[p];  //console.log(prereqObj);
            if( prereqObj.hasOwnProperty('targetSpec') ) {
                if( selectedSpec!=prereqObj.targetSpec ) continue;
            }
            var prereq = prereqObj.prereq;
            if( prereq=='override') continue;
            if( visited[prereq] ) continue;
            else { visited[prereq] = true; /*console.log('adding '+prereq+' to visited store');*/ }
    //   some prereq objects can be assigned a number directly:
    //     trait prereqs (Magery 1, Animal Empathy) are equivalent to '0'
            if( prereqObj.hasOwnProperty('category') && !prereqObj.category.match(/gr/i) ) count = 0;
    //     things like '2 spells from each of 4 colleges' can just be turned into '8'
            else if( prereqObj.hasOwnProperty('number') ) { count = prereqObj.number; count *= (prereqObj.hasOwnProperty('mult')) ? prereq.mult : 1; }
    //   for the others, do a tree search to the 'root'
    //   (i.e., follow prereqs (i.e. recursively call this function) until they run out, in every branch, and take min path length)
            else {
                // recursion here (count is 1 for this node, plus count returned by recursive call with subgraph)
                // get Spell referred to by 'prereq' attribute
                // console.log("[countPrereqs] preparing recursive call: pSpell = eval(("+skillGp+"s)["+prereqObj.prereq+"]");
                var pSpell = eval(skillGp+'s')[prereqObj.prereq];
                // console.log("[countPrereqs] recursive call: countPrereqs( "+pSpell.name+", "+prereqObj.prereqSpec+", "+skillGp+" )");
                count = 1 + countPrereqs( pSpell, prereqObj.prereqSpec, skillGp );
            }
            counts.push( count );
            if( prereqObj.pgroup ) {
                //console.log("found a prereq with a pgroup: "+p);
                for( let pi in Counts ) {
                    //console.log("should we replace Counts["+pi+"]?");
                    if( Counts[pi].pgroup==prereqObj.pgroup ) {
                        //console.log("pgroups match");
                        //console.log("is count lower? "+(count<Counts[pi].count));
                        if( count<Counts[pi].count ) Counts[pi].count = count;
                        else Counts[prereqObj.pgroup] = { count: count, pgroup: prereqObj.pgroup };
                    }
                }
            }
            Counts[prereq] = { count: count, pgroup: prereqObj.pgroup };
        }
    }
    else return 0;
  //  if( skillObj.key=='Banish' ) console.log(counts);
    // replace each 'or' group of numbers with the minimum of those numbers
    // return the sum of the remaining numbers
//     console.log(counts);
//     console.log(Counts);

    return counts.reduce((a,b)=>a+b,0);
}
function makeDefaultsTable( skillObj, selectedSpec, skillGp, indent, overrides ) {  // the 'skillGp' parameter should be capitalized, e.g. 'Skill' or 'Spell'
    if( !skillObj.hasOwnProperty('name') ) return '';
    var skillDefaults = skillObj.defaults('SK');
    //alert( JSONstring.make(skillDefaults) );
    // get default being used
    var defaultKey = '';
    var bestVrPts = 0;
    var enoughVpts = ( ruleset.match(3) ) ? 0.5 : 1;
    for( var d in skillDefaults ) {
        if( d=='length' ) continue;
        var Default = skillDefaults[d];
        //alert( JSONstring.make( Default ) );
        var from = Default.from;
        if( !from || from.match(/DX|IQ|HT|ST|Will|Per/) ) {
            delete skillDefaults[d];
            skillDefaults.length--;
            continue;
        }
        var spec = ( Default.fromSpec ) ? Default.fromSpec : null;
        var defSkillObj = document.loadedCharacter.getSkill(from,spec);
        //alert("skill matching this default:\n"+JSONstring.make(defSkillObj));
        if( !defSkillObj ) {
            delete skillDefaults[d];
            skillDefaults.length--;
            continue;
        }
        //alert('default from '+from+":\n"+JSONstring.make(defSkillObj));
        // if a skill with required specializations gives a certain default between specialties,
        // like Engineer (defaults to Engineer-other at -4), a *perfect* match of specialties should be skipped.
        // Engineer-Civil doesn't default to itself at -4.
        //alert("inclusion test:\n"+Default.target+'=='+from+" && "+defSkillObj.specialization+'!='+skillObj.specialization+"\n"+(Default.target==from)+' && '+(defSkillObj.specialization!=skillObj.specialization));
        if( Default.target==from && defSkillObj.specialization!=skillObj.specialization ) {
            // delete?
            continue;
        }
        if( Default.hasOwnProperty('targetSpec') ) {
            //alert(selectedSpec+' vs '+Default.targetSpec);
            // delete?
            if( selectedSpec!=Default.targetSpec ) continue;
        }
        //alert('skillObj.virtualPointsFrom( ['+defSkillObj.name+'], '+Default.penalty+' )');
        var vPts = skillObj.virtualPointsFrom( defSkillObj, Default.penalty );
        if( vPts>bestVrPts ) {
            bestVrPts = vPts;
            defaultKey = defSkillObj.key;
            // this should perhaps only get done if vPts is enough to matter? (0.5 in 3e, 1 in 4e)
        }
    }
    //alert( JSONstring.make(skillDefaults) );
    //alert(defaultKey);
    var radioColWidth = ( skillDefaults.length>1 && bestVrPts>=enoughVpts ) ? '2em' : '0';
    var table = '';
    var tableHTMLlines = [''];
    tableHTMLlines.push('  <table>');
    tableHTMLlines.push('    <colgroup>');
    tableHTMLlines.push('      <col style="width:'+radioColWidth+'; text-align:center"></col>');
    tableHTMLlines.push('      <col></col>');
    tableHTMLlines.push('      <col style="text-align:center"></col>');
    tableHTMLlines.push('    </colgroup>');
    tableHTMLlines.push('    <tbody>');
    // var radioCol = ( skillDefaults.length>1 && bestVrPts>=enoughVpts ) ? '<td></td>' : '';
    if( skillDefaults.length>0 )
        tableHTMLlines.push('      <tr style="border-bottom:1px solid blue; font-weight:bold"><td></td><td>Default</td><td style="text-align:center">point equivalent</td></tr>');
    var bgdClass = 'class="zrow"';
    //var bgdClassAtt = bgdClass;   // set first row to have no background
    var attDefaultDefined = false;
    var skillDefaultFound = false;
    var from = '';
    var checked = '';
    for( var dKey in skillDefaults ) {
        if( dKey=='length' ) continue;
        var Default = skillDefaults[dKey];
        //alert( JSONstring.make( Default ) );
        // do stuff for this Default object
        from = Default.from;
        if( !from || from.match(/DX|IQ|HT|ST|Will|Per/) ) continue;
        // if( from.match(/DX|IQ|HT|ST|Will|Per/) ) attDefaultDefined = true;
        var defSkillObj = document.loadedCharacter.getSkill(from);
        var target   = Default.target;
        var category = Default.category;
        var fromSpec = ( Default.fromSpec ) ? ' ('+Default.fromSpec+')' : '';
        var penalty  = (Default.penalty) ? Default.penalty : '';
        var text = ( category=='stat' && !penalty ) ? 'no default' : '<label for="use_'+from+'_default">'+from+fromSpec+penalty+'</label>';
        //alert('from: '+from+"\ndefault key: "+defaultKey);
        checked = ( from==defaultKey && bestVrPts>=enoughVpts ) ? 'checked="checked"' : '';
        if( skillObj.hasOwnProperty('useDefaultFrom') ) checked = ( from==skillObj.useDefaultFrom ) ? 'checked="checked"' : '';
        var radio = ( skillDefaults.length>1 && bestVrPts>=enoughVpts ) ? '<input id="use_'+from+'_default" type="radio" name="defaultUsed" value="'+from+'" '+checked+' />' : '';
        var rowTitle = 'radio buttons are shown if more than one usable default exists';
        //var points = Math.round( 10*skillObj.virtualPointsFrom( defSkillObj, penalty ) )/10;
        var vPts = skillObj.virtualPointsFrom( defSkillObj, penalty );    //alert(vPts);
        var fracCharFor = { 0.5 : '&frac12;', 0.25 : '&frac14;', 0.125 : '&#8539;' };
        var points = ( vPts<0.1 ) ? 0 : ( ( vPts>=1 ) ? vPts : fracCharFor[Math.round(1000*vPts)/1000] );
        var s = ( vPts<0.1 || vPts>1 ) ? 's' : '';
        var bgdClassAtt = ( bgdClassAtt ) ? '' : bgdClass;
        tableHTMLlines.push( '      <tr '+bgdClassAtt+' title="'+rowTitle+'"><td>'+radio+'</td><td>'+text+'</td><td style="text-align:center">'+points+' point'+s+'</td></tr>' );
        // if( from==defaultKey ) skillDefaultFound = true;
    }
    // checked = '';
    // if( !attDefaultDefined ) {
    //     //alert('no attribute defaults found; show standard one');
    //     var attribute = skillObj.attribute;
    //     var penalty   = -4 - skillObj.difficulty;
    //     if( !skillDefaultFound ) checked = 'checked="checked"';
    //     //if(checked) alert('ticking this standard default');
    //     tableHTMLlines.push( '<tr><td><input type="radio" name="defaultUsed" '+checked+' /></td><td>'+attribute+penalty+'</td></tr>' );
    // }
    tableHTMLlines.push('    </tbody>');
    tableHTMLlines.push('  </table>');
    tableHTMLlines.push('');
    var tableHTML = tableHTMLlines.join("\n"+indent);
    return tableHTML;
}

function loadSkillFromDialog() {

    var ch = document.loadedCharacter;

    var menu = document.getElementById('selectSkillMenu');
    var newSkill;

    // get option values
    var SkillKey = menu.value;
    var skillishThingAdded = SkillKey.toTitleCase();
    var custom = ( document.getElementById('customSkillFormWrapper').style.display!='none' ) ? true : false;
    var SkillGp = document.getElementById('selectSkillOrSpell').value;

    if( SkillKey=='spacer' ) {    // create empty 'Skill' object
        newSkill = { line : false };
    }
    else if( SkillKey=='heading' ) {
        // need to get heading text from somewhere...
        var headingText = prompt("heading text:",'');
        if( headingText ) {
            newSkill = { line : headingText };
        }
        else { return false; }
    }
    else if( custom ) {
        var form = document.getElementById('selectSkillForm');

        // construct new Skill object
        var name =   form.customSkillName.value;
        var att  =   form.customSkillAttribute.value;
        var type =   form.customSkillType.value;
        var diff = 1*form.customSkillDifficulty.value;
 //       alert("calling constructor Skill( "+name+", "+att+", "+diff+" )");
        newSkill = new Skill( name, att, diff, 'USER' );

        // set the skill type, for 3rd edition characters (will be set by constructor, but can be changed this way)
        if( ch.gameInfo.ruleset.match(3) )
            newSkill.type = type;

        var skillLbl = name.replace(/\W+/g,'')+SkillGp;
        newSkill.key = skillLbl;

        // attach tech level
        if( form.customSkillTLCheckbox.checked ) {
            var TL = 1*form.customSkillTL.value;
            if(TL) newSkill.TL = TL;
            form.customSkillTLCheckbox.checked = false;
        }

        // attach required specialization
        if( form.customSkillReqSpecCheckbox.checked ) {
            var spec = form.customSkillReqSpec.value;
            if(spec) newSkill.specialization = spec;
            form.customSkillReqSpecCheckbox.checked = false;
        }

        // attach optional specializations
        if( form.customSkillOptSpec1Checkbox.checked ) {
            var optSpecs = [];
            var os = 1;
            while( form['customSkillOptSpec'+os].value ) {
                optSpecs.push(form['customSkillOptSpec'+os].value);
                os++;
            }
            if( optSpecs.length ) { newSkill.optSpecsArray = optSpecs; }
            form.customSkillOptSpec1Checkbox.checked = false;
            form.customSkillOptSpec2Checkbox.checked = false;
        }

        // tag wildcard skills
        if( form.customSkillWildcard.checked ) {
            newSkill.wildcard = true;
        }

        // attach spell attributes
        if( SkillGp=="Spell" ) {
            // get spell classes
            var spClasses = {};
            for( var sci=0; sci<spellClassesList.length; sci++ ) {
                var spClass = spellClassesList[sci];
                if( document.getElementById('SpellClassCB_'+spClass).checked ) {
                    //console.log("[loadSkillFromDialog] adding '"+spClass+"' spell class to classes for this spell");
                    spClasses[spClass] = true;
                }
            }
            if( document.getElementById('SpellClassResistedCB').checked ) {
                var rstat = document.getElementById('CustomSpellResistedByMenu').value.toLowerCase();
                spClasses['r'+rstat] = true;
            }
            newSkill.classes = spClasses;
            // get spell stats (any requirements that these be numeric?)
            var spStats = {};
            newSkill.stats = spStats;
            var castcost = document.getElementById('customSkillSpell_castcost').value;
            if( castcost ) spStats['castcost'] = castcost;
            var maintaincost = document.getElementById('customSkillSpell_maintaincost').value;
            if( maintaincost ) spStats['maintaincost'] = maintaincost;
            var duration = document.getElementById('customSkillSpell_duration').value;
            if( duration && duration!='instant' ) spStats['duration'] = duration;
            var time = document.getElementById('customSkillSpell_time').value;
            if( time & time!=1 ) spStats['time'] = time;
            // add spell to college lists
            var spellColleges = $('#customSkillSpellCollegeMenu').val() || [];
            var customCollege = $('#customSkillSpell_customCollege').val();
            if( customCollege ) {
                customCollege = customCollege.replace(/\W+/g,'');
                if( spellColleges ) spellColleges.push(customCollege)
                else spellColleges = [customCollege];
                if( !ch.groups ) ch.groups = {};
                if( ch.groups[customCollege] ) ch.groups[customCollege].push(newSkill)
                else ch.groups[customCollege] = [newSkill];
            }
            for( var ci=0; ci<spellColleges.length; ci++) {
                var spellCollege = spellColleges[ci];
                var collegeGroup = Groups[spellCollege];
                if( !collegeGroup ) {   // this seems to add an empty college group when there is a name in the Colleges list but no corresponding group in the library - when would that happen?
                    Groups[spellCollege] = [];
                    collegeGroup = Groups[spellCollege];
                }
                collegeGroup.push( newSkill.key );
                if( !ch.groups ) ch.groups = {};
                ch.groups[spellCollege] = collegeGroup;   // Attach the entire collegeGroup, with added custom spell(s), to ch.groups[spellCollege].
                                                          // In loadCharacter, this Character.groups object will be used to replace the Groups[spellCollege] group from the library.
                // alert("[loadSkillFromDialog] attached the "+spellCollege+" group to Character.groups:\n"+JSONstring.make(ch.groups));
            }
           // alert("Groups."+spellCollege+":\n\n"+JSONstring.make(Groups[spellCollege]));
           // alert("ch.groups:\n\n"+JSONstring.make(ch.groups));
        }

        // create custom attribute defaults
        if( document.getElementById('customSkillCustomAttDefaultsTD').style.visibility!='hidden' ) {
            var attDefListLength = form.customSkillCustomAttDefaultListLastRowID.value;
    //        alert('looping over '+attDefListLength+' custom attribute defaults');
            for( var m=1; m<=attDefListLength; m++ ) {
                if( !form['customSkillCustomAttDefault'+m+'Label'] ) continue;
                var defaultAtt =   form['customSkillCustomAttDefault'+m+'Label'].value;
                var defaultPen = 1*form['customSkillCustomAttDefault'+m+'Penalty'].value;
                var Default = { target: skillLbl, penalty: defaultPen, from: defaultAtt };
    //            alert("created Default:\n"+JSONstring.make(Default));
                ch.defaults[skillLbl+'_from_'+defaultAtt] = Default;
            }
       //     simulate( form.attDefaultsCheckbox, 'click' )
        }

        // create defaults
        if( document.getElementById('customSkillDefaultSkillsMenu').style.display!='none' ) {
            var defSkListLength = form.customSkillDefaultSkillListLastRowID.value;
            for( var m=1; m<=defSkListLength; m++ ) {
                if( !form['customSkillDefaultSkill'+m+'Label'] ) continue;
                var defaultSkl =   form['customSkillDefaultSkill'+m+'Label'].value;
                var defaultPen = 1*form['customSkillDefaultSkill'+m+'Modifier'].value;
                var Default = { target: skillLbl, penalty: defaultPen, category: 'SK', from: defaultSkl };
                var fromSpecLbl = '';
                var targSpecLbl = '';
                // if a specialization is specified in the Default-from skill...
                if( form['customSkillDefaultSkill'+m+'Specialization'] ) {
                    var specIndex = form['customSkillDefaultSkill'+m+'Specialization'].selectedIndex;
                    var fromSpec = form['customSkillDefaultSkill'+m+'Specialization'][specIndex].text;
        //            alert(specialization);
                    Default.fromSpec = fromSpec;
                    fromSpecLbl = fromSpec.replace(/\W+/g,'');
                }
                // if this custom skill has a specialization, use it as target specialization for Default
                if( newSkill.hasOwnProperty('specialization') ) {
                    var targSpec =  newSkill.specialization;
                    Default.targetSpec = targSpec;
                    targSpecLbl = targSpec.replace(/\W+/g,'');
                }
     //           alert("created Default:\n"+JSONstring.make(Default));
                ch.defaults[skillLbl+targSpecLbl+'_from_'+defaultSkl+fromSpecLbl] = Default;
            }
       //     simulate( form.defaultsCheckbox, 'click' )
        }

        // create skill prerequisites
        if( document.getElementById('customSkillPrerequisiteSkillsMenu').style.display!='none' ) {
            var prereqSkillsListLength = form.customSkillPrerequisiteSkillListLastRowID.value;
            for( var m=1; m<=prereqSkillsListLength; m++ ) {
                if( !form['customSkillPrerequisiteSkill'+m+'Label'] ) continue;
                var prereqSkl =   form['customSkillPrerequisiteSkill'+m+'Label'].value;
                var prereqLvl = 1*form['customSkillPrerequisiteSkill'+m+'Level'].value;
                var Prerequisite = { target: skillLbl, category: 'SK', prereq: prereqSkl };
    //            alert("created Prerequisite:\n"+JSONstring.make(Prerequisite));
                ch.prerequisites[skillLbl+'_requires_'+prereqSkl+prereqLvl] = Prerequisite;
            }
       //     simulate( form.skillPrereqsCheckbox, 'click' )
        }

        // create spell prerequisites
        if( document.getElementById('customSkillPrerequisiteSpellsMenu').style.display!='none' ) {
            var prereqSpellsListLength = form.customSkillPrerequisiteSpellListLastRowID.value;
            for( var m=1; m<=prereqSpellsListLength; m++ ) {
                if( !form['customSkillPrerequisiteSpell'+m+'Label'] ) continue;
                var prereqSkl =   form['customSkillPrerequisiteSpell'+m+'Label'].value;
              //  var prereqLvl = 1*form['customSkillPrerequisiteSpell'+m+'Level'].value;
                var Prerequisite = { target: skillLbl, /*category: 'SK',*/  prereq: prereqSkl };
              //  if( prereqLvl!=12 ) Prerequisite.level = prereqLvl;
              //  alert("created Prerequisite:\n"+JSONstring.make(Prerequisite));
                ch.prerequisites[skillLbl+'_requires_'+prereqSkl/*+prereqLvl*/] = Prerequisite;
            }
        }

        // create group prerequisites
        if( document.getElementById('customSkillPrerequisiteGroup').style.display!='none' ) {
            var prereqGroup = form['customSkillPrerequisiteGroupsMenu'].value;
            var num       = 1*form['customSkillPrerequisiteGroupNumberMenu'].value;
            var Prerequisite = { target: skillLbl, number: num, prereq: prereqGroup };
            ch.prerequisites[skillLbl+'_requires_'+num+prereqGroup] = Prerequisite;
        }

        // create trait prerequisites
        if( document.getElementById('customSkillPrerequisiteTraitsMenu').style.display!='none' ) {
            var prereqTraitListLength = form.customSkillPrerequisiteTraitListLastRowID.value;
            for( var m=1; m<=prereqTraitListLength; m++ ) {
                if( !form['customSkillPrerequisiteTrait'+m+'Label'] ) continue;
                var prereqTrait = form['customSkillPrerequisiteTrait'+m+'Label'].value;
                // { target: 'MuscleReading', category: 'ADS', prereq: 'TrainedbyaMaster' };
                var Prerequisite = { target: skillLbl, category: 'ADS', prereq: prereqTrait };
                if( form['customSkillPrerequisiteTrait'+m+'Level'] ) Prerequisite.level = 1*form['customSkillPrerequisiteTrait'+m+'Level'].value;
              //  alert("created Prerequisite:\n"+JSONstring.make(Prerequisite));
                ch.prerequisites[skillLbl+'_requires_'+prereqTrait] = Prerequisite;
            }
      //      simulate( form.traitPrereqsCheckbox, 'click' )
        }

        // create Adjustments
        if( document.getElementById('customSkillAdjustingTraitMenu').style.display!='none' ) {
            var adjListLength = form.customSkillAdjustingTraitListLastRowID.value;
    //        alert('looping over '+adjListLength+' adjustment traits');
            for( var m=1; m<=adjListLength; m++ ) {
                if( !form['customSkillAdjustingTrait'+m+'Label'] ) continue;
                var adjTrait =   form['customSkillAdjustingTrait'+m+'Label'].value;
                var adjAmt   = 1*form['customSkillAdjustingTrait'+m+'Modifier'].value;
                var Adjustment = { from: adjTrait, amount: adjAmt, targetCategory: 'SK', target: skillLbl };
    //            alert("created Adjustment:\n"+JSONstring.make(Adjustment));
                ch.adjustments[skillLbl+'_from_'+adjTrait] = Adjustment;
            }
       //     simulate( form.adjustmentsCheckbox, 'click' )
        }

        removeAllListTableRows();

    } // end if( custom )
    else {                                // do skill selection stuff
        var selectedSkill = {};

        // set indicated TL and specialization, if any
        var TL   = document.getElementById('selectSkillTL').value || '';
        var spec = document.getElementById('specifySkillSpecialization').value
                 || document.getElementById('selectSkillSpecialization').value
                 || document.getElementById('selectSkillTLSpec').value
                 || '';

        // localize the skill/spell, so as to access its member attributes
        selectedSkill = ( SkillGp=='Spell' ) ? Spells[SkillKey] : Skills[SkillKey];
        // need to check various flags to decide what form items to query and attach values from

        // create new Skill object by cloning
        newSkill = selectedSkill.clone_proto();

        if( selectedSkill.TLs && document.getElementById('selectSkillTL').value ) {
            newSkill.TL = 1*document.getElementById('selectSkillTL').value;
        }
        if( selectedSkill.hasOwnProperty('specRequiredList') ) {
            if( document.getElementById('specifySkillSpecialization').value ) {   // typed in spec
                newSkill.specialization = document.getElementById('specifySkillSpecialization').value;
            }
            else if( document.getElementById('selectSkillSpecialization').value ) {   // from specs menu
                newSkill.specialization = document.getElementById('selectSkillSpecialization').value;
            }
            else if( document.getElementById('selectSkillTLSpec').value ) {   // from TL specs menu
                newSkill.specialization = document.getElementById('selectSkillTLSpec').value;
            }
            // if no specialization was given, abort back to dialog
            if( !newSkill.specialization ) {
                alert('You must choose a specialization');
                return false;
            }
        }
        var optSpecs = [];
        if( document.getElementById('selectSkillOptSpec').value ) {
            optSpecs.push( document.getElementById('selectSkillOptSpec').value );
        }
        if( optSpecs.length>0 ) newSkill.optSpecsArray = optSpecs;
        // only one optional specialization?  see how it is done in the editSkill function.

        // if this is actually a technique, need to add a useDefaultFrom attribute (only Kicking so far)
        // console.log(newSkill);
        if( newSkill.attribute.match(/^T|M/) ) {
            if( spec ) newSkill.useDefaultFrom = Skills[spec];
        }

        // find applicable Adjustments and attach them to the Character

        // attach key to Skill object
  //      newSkill.key = SkillKey;
        // too simple?  is it there already anyway?   PUT BACK FOR CUSTOM SKILL

        skillishThingAdded = "'"+newSkill.name+"'";

        // increment the selection in the menu, if the current selection will be going away
        var newIndex = 1*menu.selectedIndex;
        if( !selectedSkill.hasOwnProperty('specRequiredList') ) { newIndex--; }
        var selectedValue = (menu.options[newIndex]) ? menu.options[newIndex].value : null;
    }

    if( SkillGp=="Spell" ) newSkill.spell = true;
  //  alert(JSONstring.make(newSkill));

    // give points to the skill, if indicated
    if( !SkillKey.match(/spacer|heading/) ) {
        var pts = document.getElementById('selectSkillPts').value;
        if( pts ) { newSkill.points = 1*pts; }
    }

    // attach new Skill or Spell to Character
    ch.skills.push( newSkill );

    // cause character to be reloaded so that the skill becomes visible
    loadCharacter( ch, "Add "+SkillGp /*+skillishThingAdded*/ );
    selectSkillDialog( selectedValue );
    return false;
}

function addListTR( listType, menu ) {
    var ch = document.loadedCharacter;
    var listTbl = document.getElementById(listType+'sList');
    listTbl.style.display = 'block';
    // get and increment last row ID
    var i = 1*document.getElementById(listType+'ListLastRowID').value + 1;
    // create new row
    var newTR = listTbl.insertRow(-1);
    // create 'delete' icon cell
    var delTD = newTR.insertCell(0);
    delTD.innerHTML = '<a><img id="delete_'+i+'" src="../images/icon_delete.gif" title="delete row" onclick="removeListTR('+i+',\''+listType+'\')"></a>';
    delTD.style.textAlign = 'center';
    delTD.style.border = 'none';
    // create skill/trait name cell and fill with (text of) option selected in the 'menu' object
    var lblTD = newTR.insertCell(1);
    var label = menu.value;
    lblTD.innerHTML = menu.options[menu.selectedIndex].text;
    // AND with a hidden field containing the option value
    lblTD.innerHTML += '<input type="hidden" id="'+listType+i+'Label" name="'+listType+i+'Label" value="'+label+'" />';
   // lblTD.style.border = '1px solid silver';
    // create cell for penalty, level, modifier, etc. menu/input
    if( listType.match(/customattdefault/i) ) {
        // create 'penalty' cell and fill with (text of) option selected in customSkillAttDefaultPenaltyMenu
        var penTD = newTR.insertCell(2);
        var penMenu = document.getElementById('customSkillAttDefaultPenaltyMenu');
        pen = penMenu.options[penMenu.selectedIndex].text;
        penTD.innerHTML = pen;
        penTD.innerHTML += '<input type="hidden" id="'+listType+i+'Penalty" name="'+listType+i+'Penalty" value="'+pen+'" />';
        penTD.style.textAlign = 'center';
    }
    else if( listType.match(/defaultskill/i) ) {
        // if this skill has a list of specializations, create a 'specialization' cell with a select menu
        var selSkObj = Skills[label];
        var specTD = newTR.insertCell(2);
        if( selSkObj.hasOwnProperty('specRequiredList') ) {
            var specOptsHash = {};
            for( var n in selSkObj.specRequiredList ) {
                var spec = selSkObj.specRequiredList[n];
                specOptsHash[n] = spec;
            }
            specTD.innerHTML = "\n                        "+'<select id="'+listType+i+'Specialization">'
                             + makeOptions( specOptsHash, false, '                        ' )
                             + "</select>\n                      ";
        }
        // create 'penalty' cell and fill with text input element
        var penTD = newTR.insertCell(3);
        var penVal = -(4+1*document.getElementById('customSkillDifficulty').value);
       // penTD.innerHTML = '<input id="'+listType+'Penalty'+i+'" name="'+listType+'Penalty'+i+'" value="'+penVal+'" type="text" style="width:100%" />';
        penTD.innerHTML = "\n                        "+'<select id="'+listType+i+'Modifier">'
                        + makeNumberOptions( -10, 0, '                        ', penVal, true )
                        + "</select>\n                      ";
    }
    else if( listType.match(/prerequisiteskill/i) ) {
        // create 'level' cell and fill with numeric select menu
        var lvlTD = newTR.insertCell(2);
        lvlTD.innerHTML = "\n                        "+'<select id="'+listType+i+'Level">'
                        + makeNumberOptions( 10, 20, '                        ', 12 )
                        + "</select>\n                      ";
    }
    else if( listType.match(/prerequisitetrait/i) ) {
        var prereqTraitObj = Traits[label];
        if( prereqTraitObj.hasLevels ) {
            var lvlTD = newTR.insertCell(2);
           // var topLvl = if( prereqTraitObj.hasOwnProperty('highestLevel') ) ? that : 10;
            lvlTD.innerHTML = "\n                        "+'<select id="'+listType+i+'Level">'
                            + makeNumberOptions( 1, 10, '                        ', 1 )
                            + "</select>\n                      ";
        }
    }
    else if( listType.match(/adjustingtrait|adjustsskill|adjustsattribute/i) ) {
        // create 'mod' cell and fill with custom numeric select menu
        var lvlTD = newTR.insertCell(2);
        // var selLvl = ( ch.getTrait[menu.value].finalCost()>0 ) ? 1 : -1;
        var opts = [''];
        opts.push('<select id="'+listType+i+'Modifier" name="'+listType+i+'Modifier">');
        for( var j=6; j>=-5; j-- ) {
            if( j==0 ) continue;
            var selAtt = ( j==1 ) ? 'selected="selected"' : '';
            // it would be even better if this were set to -1 for disadvantages
            // var selAtt = ( j==selLvl ) ? 'selected="selected"' : '';
            opts.push('  <option value="'+j+'" '+selAtt+'>'+signed(j)+'</option>');
        }
        opts.push('</select>');
        opts.push('');
        lvlTD.innerHTML = opts.join("\n                            ");
        // create 'per level' cell and fill with checkbox input
        // var perlvlTD = newTR.insertCell(3);
        // perlvlTD.innerHTML = '<input id="customSkill'+listType+i+'PerLevel" name="customSkill'+listType+i+'PerLevel" type="checkbox" />';
        // perlvlTD.style.textAlign = 'center';
        // turns out that this isn't going to get used - 'per level' is ASSUMED if the trait HAS levels
        // I suppose I could put something here to indicate which traits will get this treatment...
    }

    // save new last row ID
    document.getElementById(listType+'ListLastRowID').value = i;
}
function removeListTR( rowID, listType ) {
    var listTbl = document.getElementById(listType+'sList');
    // figure out rowNum from rowID
    var lastRowID = document.getElementById(listType+'ListLastRowID').value;
    var rowNum = 1;   // start at 1 to avoid deleting the header row
    for( var i=1; i<=lastRowID; i++ ) {
        var inptObj = document.getElementById(listType+'Penalty'+i);
        if( inptObj ) {
            if( i==rowID ) break;
            rowNum++;
        }
    }
    // delete the right row
 //   alert("try to delete row "+rowNum);
    listTbl.deleteRow( rowNum );
}
function removeAllListTableRows() {
    $("table#customSkillsOptionsTable table[id$='sList']").each(
        function() {
            var id = this.id;
            var listType = id.substring( 11, id.indexOf('sList') );
          //  alert(listType);
            // got the listTypes, now I can loop and use deleteRow
            var lastRowID = document.getElementById('customSkill'+listType+'ListLastRowID').value;
          //  alert(lastRowID);
          //  for( var i=1; i<=lastRowID; i++ ) {
            for( var i=lastRowID; i>=1; i-- ) {
              //  alert(i);
                this.deleteRow( i );
            }
            this.style.display = 'none';
            document.getElementById('customSkill'+listType+'ListLastRowID').value = 0;
        }
    );
}

function editSkillDialog( chosenSkillIndex ) {
    // alert("skill index: "+chosenSkillIndex);
    var ch = document.loadedCharacter;

    // alert("is index "+chosenSkillIndex+" a number: "+!isNaN(chosenSkillIndex)+"?");
    if( isNaN( chosenSkillIndex ) ) {
        document.getElementById('editSkillSubmit').value = '';
        document.getElementById('editSkillSubmit').innerHTML = 'make a selection to edit';
        document.getElementById('editSkillSubmit').disabled = true;
    }

    // create skill menu lists
    var skillMenuOptionList = [];
    var defaultSkillMenuOptionList = [];
    var inOptGroup = false;
    for( var s in ch.skills ) {
        var skillItem = ch.skills[s];
        if( skillItem.hasOwnProperty('line') ) {
            if( skillItem.line ) {
                // push an optgroup line or lines
                if(inOptGroup) { skillMenuOptionList.push('</optgroup>'); }
                skillMenuOptionList.push('<optgroup label="'+skillItem.line+'">');
                inOptGroup = true;
            }
            else {
                inOptGroup = false;
                skillMenuOptionList.push('</optgroup>');
                // and skip this item
            }
        }
        else {
            // push an option line
            var sel = ( !isNaN(chosenSkillIndex) && chosenSkillIndex==s ) ? ' selected="selected"' : '';
            skillMenuOptionList.push('  <option value="'+s+'"'+sel+'>'+skillItem.print()+'</option>');
          //  if( skillItem.attribute!="M" && skillItem.attribute!="T" ) {
		            defaultSkillMenuOptionList.push('  <option value="'+s+'"'+sel+'>'+skillItem.print()+'</option>');
          //  }
        }
    }
    document.getElementById('editSkillMenu').innerHTML
        = "\n            "+skillMenuOptionList.join("\n            ")+"\n          ";
    $('#editSkillTechManDefaultSkillList').html("\n            "+defaultSkillMenuOptionList.join("\n            ")+"\n          ");
    //if( skillMenuOptionList.length && !isNaN(chosenSkillIndex) )
        showEditSkillInfoInDialog( chosenSkillIndex );

    // show or hide the 'type' field
    if( ch.gameInfo.ruleset.match(3) ) {
        document.getElementById('editSkillTypeLabelCell').style.visibility='visible';
        document.getElementById('editSkillTypeInputCell').style.visibility='visible';
    }
    else {
        document.getElementById('editSkillTypeLabelCell').style.visibility='hidden';
        document.getElementById('editSkillTypeInputCell').style.visibility='hidden';
    }

    // populate spell editing menus
    var optsHTML = [''];
    Groups.MagicColleges.sort();
    for( var c=0; c<Groups.MagicColleges.length; c++ ) {
        var collKey = Groups.MagicColleges[c];
        var collName = (collegeNames[collKey]) ? collegeNames[collKey] : collKey;
        optsHTML.push('  <option value="'+collKey+'">'+collName+'</option>');
    }
    optsHTML.push('');
    $('#editSkillSpellCollegeMenu').html( optsHTML.join("\n                    ") );
    var AttOptionsList = makeSelectListOptions( AttributeOptionsList );
    AttOptionsList.unshift('  ');
    AttOptionsList.push('');
    var attOptionsHTML = AttOptionsList.join("\n                          ");
    $('#editSpellResistedByMenu').html( attOptionsHTML );

    setupDialog('editSkillDialog');
}
function showEditSkillInfoInDialog( chosenSkillIndex ) {
    // alert("skill index: "+chosenSkillIndex);
    var ch = document.loadedCharacter;    // get reference to loaded Character
    // hide and clear inputs
    document.getElementById('editSkillNameText').value = null;
    document.getElementById('editSkillDescription').value = null;
    document.getElementById('editSkillReqSpecialization').value = null;
    document.getElementById('editSkillOptionsTable').style.display = 'none';
    document.getElementById('editSkillsListFormattingTable').style.display = 'none';
    document.getElementById('editSkillSpecializationsTR1').style.display = 'none';
    document.getElementById('editSkillSpecializationsTR2').style.display = 'none';
    document.getElementById('editSkillSpecializationsTR3').style.display = 'none';
    // document.getElementById('editSkillPrerequisitesTR').style.display = 'none';
    document.getElementById('editSkillTechLevelInputLabelTD').style.display = 'none';
    document.getElementById('editSkillTechLevelInputTD').style.display = 'none';
    document.getElementById('skillType_Name_remove').innerHTML = '';
    document.getElementById('skillType_Name_format').innerHTML = '';
    document.getElementById('skillType_Name_edit').innerHTML   = '';
    document.getElementById('editSkillOptSpecializationsTable').innerHTML   = '';
    $("#editSkillTechManFieldsTR1").css('display','none');
    $("#editSkillTechManFieldsTR2").css('display','none');

    // get action
    var action = getRadioGroupValue( document.editSkillForm['editSkillAction'] );
    if( action==undefined ) {
        document.getElementById('deleteSkillAction').checked = true;
        action = 'delete';
    }

    // if no index is provided, show the cleared form and return
    // alert("index "+chosenSkillIndex+" is a number: "+!isNaN(chosenSkillIndex) );
    if( isNaN( chosenSkillIndex ) /*|| chosenSkillIndex==''*/ ) {
        document.getElementById('editSkillSubmit').innerHTML = 'make a selection to <span id="editAction">'+action;
        return false;
    }

    var menu = document.getElementById('editSkillMenu');
    var menuSelectedIndex = menu.selectedIndex;
    menu.options[menuSelectedIndex].scrollIntoView();

    // only show applicable skill group filters
    // var chSkills = ch.skills;
    // var hasSkills = (chSkills.length>0) ? 1 : 0;
    // var chSpells = ch.spells;
    // var hasSpells = (chSpells.length>0) ? 1 : 0;
    // if( hasSkills+hasSpells>1 ) {
    //     document.getElementById('editSkillsGroupFiltersTable').style.display = 'block';
    //     for( var gp in skillTypes ) {
    //         var Group = titleCase(skillTypes[gp]);
    //         if( ch[skillTypes[gp]+'s'].length>0 )
    //             document.getElementById('show'+Group+'sEditTD').style.display = 'table-cell';
    //     }
    // }

    // get the skill (from loadedCharacter) referred to by chosenSkillTypeIndex
    var chosenSkillType = 'Skill';
    var eSkill = ch.skills[chosenSkillIndex];
    var eSkillName = eSkill.print();
    if( eSkill.hasOwnProperty('spell') ) chosenSkillType = 'Spell';
    if( eSkill.attribute=='M' ) chosenSkillType += ' Maneuver';
    if( eSkill.attribute=='T' ) chosenSkillType += ' Technique';
  //  console.log("[showEditSkillInfoInDialog] chosenSkillType: "+chosenSkillType);
    // also get the 'prototype' of this skill
    var SkillGp = null;
    try {
        SkillGp = eval( chosenSkillType+'s' );
    }
    catch(err) {}
    var pSkill = (SkillGp) ? SkillGp[eSkill.key] : null;


    /* alter the dialog box display according to the properties of the selected skill */

    document.getElementById('editTitlebarSkilltype').innerHTML = eSkillName;
    document.getElementById('skillType_Name_remove').innerHTML = '<em>'+eSkillName+'</em> '+chosenSkillType;
    document.getElementById('skillType_Name_format').innerHTML = '<em>'+eSkill.name+'</em> '+chosenSkillType;
    document.getElementById('skillType_Name_edit').innerHTML   = '<em>'+eSkillName+'</em> '+chosenSkillType;

    // do the property editing logic inside-out compared to traits (skills always have some editable properties)
    if( action=='edit' ) {
        // show and populate edit fields only for properties found in the skill
        document.getElementById('editSkillOptionsTable').style.display = 'block';
        // skill name
        document.getElementById('editSkillNameText').value = eSkill.name;
        document.getElementById('editSkillNameTR').style.display = 'table-row';
        // description (I don't see any of these in the Skills library object!)
        if( eSkill.description ) {
            document.getElementById('editSkillDescription').value = eSkill.description;
            document.getElementById('editSkillDescriptionTR').style.display = 'table-row';
        }
        // attribute
        var skillAttributes = ['ST','DX','IQ','HT','Will','Per'];
        //alert(eSkill.attribute);
        var selectAttTD = document.getElementById('editSkillAttributeInputTD');
        var inputHTML = ['','<select id="editSkillAttribute" name="editSkillAttribute">'];
        for( var a in skillAttributes ) {
            var att = skillAttributes[a];
            var selected   = ( eSkill.attribute==att ) ? 'selected="selected" ' : '';
            var style_note = ( eSkill.attribute==att ) ? 'style="font-weight:bold;color:#DEF;background-color:#777" ' : '';
            if( pSkill && pSkill.attribute==att ) style_note = 'style="font-weight:bold;color:#DEF;background-color:#777" title="Controlling attribute from ruleset" ';
            inputHTML.push('  <option value="'+att+'" '+selected+style_note+'>'+att+'</option>')
        }
        inputHTML.push('</select>');
        inputHTML.push('');
        selectAttTD.innerHTML = inputHTML.join("\n                      ");
        // type
        var skillTypes = { 'M': 'Mental', 'P': 'Physical' };
        var inputHTML = ['','<select id="editSkillType" name="editSkillType">'];
        for( var t in skillTypes ) {
            var type = skillTypes[t];
            var selected   = ( eSkill.type==t ) ? 'selected="selected" ' : '';
            var style_note = ( eSkill.type==t ) ? 'style="font-weight:bold;color:#DEF;background-color:#777" ' : '';
            if( pSkill && pSkill.type==t ) style_note = 'style="font-weight:bold;color:#DEF;background-color:#777" title="Skill type from ruleset" ';
            inputHTML.push('  <option value="'+t+'" '+selected+style_note+'>'+type+'</option>')
        }
        inputHTML.push('</select>');
        inputHTML.push('');
        document.getElementById('editSkillTypeInputCell').innerHTML = inputHTML.join("\n                      ");
        // difficulty
        var selectTD = document.getElementById('editSkillDifficultyInputTD');
        var inputHTML = [''];
        inputHTML.push('  <select id="editSkillDifficulty" name="editSkillDifficulty">');
        for( var dif in skillDifficultyLevels ) {
            var difLev = skillDifficultyLevels[dif];
            var selected   = ( eSkill.difficulty==difLev ) ? 'selected="selected" ' : '';
            var style_note = ( eSkill.difficulty==difLev ) ? 'style="color:#DEF;background-color:#777" ' : '';
            if( pSkill && pSkill.difficulty==difLev ) style_note = 'style="color:#DEF;background-color:#777" title="difficulty from ruleset" ';
            inputHTML.push('    <option value="'+difLev+'" '+selected+style_note+'/>'+dif+'</option>')
        }
        inputHTML.push('  </select>');
        inputHTML.push('');
        selectTD.innerHTML = inputHTML.join("\n                      ");
        // tech level   editSkillTechLevelInput
        if( eSkill.hasOwnProperty('TL') ) {
            var tlTD = document.getElementById('editSkillTechLevelInputTD');
            var inputHTML = [''];
            inputHTML.push('  <select id="editSkillTechLevel" name="editSkillTechLevel" style="width:100%">');
            for( var i in TechLevelOptionsList ) {
                var TLobj = TechLevelOptionsList[i];
                var selected = '';
                var style_note = '';
                if( eSkill.hasOwnProperty('TL') && eSkill.TL==TLobj.value ) {
                    selected   = 'selected="selected" ';
                    style_note = 'style="color:#DEF;background-color:#777" title="difficulty from ruleset" ';
                }
                inputHTML.push('    <option value="'+TLobj.value+'" title="'+TLobj.title+'" '+selected+style_note+'/>'+TLobj.value+'</option>')
            }
            inputHTML.push('  </select>');
            inputHTML.push('');
            tlTD.innerHTML = inputHTML.join("\n                      ");
            document.getElementById('editSkillTechLevelInputLabelTD').style.display = 'table-cell';
            document.getElementById('editSkillTechLevelInputTD').style.display = 'table-cell';
        }
        // specializations
        if( eSkill.hasOwnProperty('specRequiredList') ) {
            // put current value into input text box
            document.getElementById('editSkillReqSpecialization').value = eSkill.specialization;
            document.getElementById('editSkillSpecializationsTR1').style.display = 'table-row';
        }
        if( eSkill.hasOwnProperty('specRequiredList') && eSkill.specRequiredList.length ) {
            var opts = ['                          '];
            for( var i in eSkill.specRequiredList ) {
                var opt = (eSkill.specRequiredList[i]) ? eSkill.specRequiredList[i] : +i+1;
                var selAtt = ( opt==eSkill.specialization ) ? 'selected="selected"' : '';
                opts.push('  <option value="'+opt+'" '+selAtt+'>'+opt+'</option>');
            }
            opts.push('');
            document.getElementById('editSkillListSpecialization').innerHTML = opts.join("\n"+'                          ');
            document.getElementById('editSkillSpecializationsTR3').style.display = 'table-row';   // TR3 may not be between TR1 and TR2
        }
        if(  ( eSkill.attribute=="IQ" && eSkill.difficulty>0 )
            || eSkill.hasOwnProperty('optSpecsArray') ) {   // optional specializations
            // clear opt specs table
            var CRindent = "\n                          ";
            document.getElementById('editSkillOptSpecializationsTable').innerHTML = CRindent+"  <tbody>"+CRindent+"    </tbody>"+CRindent+"";
            document.getElementById('editSkillOptSpecializationRows').value = 0;
            // load existing opt specs, if any
            if( eSkill.hasOwnProperty('optSpecsArray') ) {
                for( var s in eSkill.optSpecsArray ) {
                    addNewCustomizerRow('editSkill','OptSpecialization');
                    var spec = eSkill.optSpecsArray[s];
                    document.getElementById('editSkillOptSpecialization'+(1*s+1)+'Text' ).value
                        = eSkill.optSpecsArray[s];
                }
                document.getElementById('editSkillOptSpecializationRows').value = eSkill.optSpecsArray.length;
            }
            else { document.getElementById('editSkillOptSpecializationRows').value = 0; }
            document.getElementById('editSkillSpecializationsTR2').style.display = 'table-row';
        }   // always present optional specialization field for skills like this
        var spec = (eSkill.specialization) ? eSkill.specialization.replace(/\W+/g,'') : false;
        // spell fields
        for( var r=1; r<10; r++ ) {        // show/hide spell editing fields
            var spellFieldRow = $("#editSpellFieldsRow"+r);
            if( spellFieldRow ) {
                if( chosenSkillType.match(/spell/i) ) spellFieldRow.show();
                else spellFieldRow.hide();
            }
        }
        if( chosenSkillType.match(/spell/i) ) {
            // pre-select the right spell colleges
            $("#editSkillSpellCollegeMenu").val('');  // unsets college selection(s)
            Groups.MagicColleges.sort();
            for( var c=0; c<Groups.MagicColleges.length; c++ ) {
                var collKey = Groups.MagicColleges[c];
                var collName = (collegeNames[collKey]) ? collegeNames[collKey] : collKey;
                // if( eSkill.isInGroup(collKey) ) console.log("[showEditSkilInfoInDialog] selecting "+collName+" in the Edit Colleges menu (key: "+collKey+")");
                if( eSkill.isInGroup(collKey) ) $("#editSkillSpellCollegeMenu option[value='"+collKey+"']").prop("selected",true);  // can select multiple colleges
            }
            // custom colleges?
            // if( not in Groups.colleges ) put this.college in #customSkillSpell_customCollege input box?

            // tick the right spell classes
            $('[id^="editSpellClassCB_"]').prop("checked",false);   // unchecks most of the checkboxes
            $("#editSpellClassResistedCB").prop("checked",false);   // unchecks the remaining one
            for( var cls in eSkill.classes ) {             //  console.log("[showEditSkillInfoInDialog] spell class: "+cls);
                // treat 'reg' separately, filter cls's starting with 'r' for Resisted By stuff later
                if( cls.match(/reg/i) ) {
                    $("#editSpellClassCB_reg").prop("checked",true);
                }
                else if( cls.match(/^r/i) ) {   // 'resisted by' classes
                    $("#editSpellClassResistedCB").prop("checked",true);
                    // then select the right attribute in editSpellResistedByMenu
                    var stat = cls.substr(1);
                    stat = stat.toUpperCase();
                    if( stat.match(/wi/i) ) stat = "Will";
                    if( stat.match(/^p/i) ) stat = "Per";
                    console.log("[showEditSkillInfoInDialog] trying to select "+stat+" in the editSpellResistedByMenu");
                    $('#editSpellResistedByMenu').val( stat );
                }
                else {
                    $("#editSpellClassCB_"+cls).prop("checked",true);
                }
            }
            // pre-fill spell cost, time to cast, duration and notes fields
            for( var skey in eSkill.stats ) {
                if( skey.match(/note/i) ) $("#editSkillSpell_"+skey).html(eSkill.stats[skey]);
                $("#editSkillSpell_"+skey).val(eSkill.stats[skey]);
            }
        }
        // maneuver/technique fields
        if( chosenSkillType.match(/man|tech/i) ) {
        		$("#editSkillTechManFieldsTR1").css('display','table-row');
        		$("#editSkillTechManFieldsTR2").css('display','table-row');
        		$("#editSkillAttribute").prop('disabled', 'disabled');
						/* select current values */
						// base skill
						var baseSkillOptVal;
						$("#editSkillTechManDefaultSkillList option").each(		// indicate (only) current base skill in select list
							function() {
								$(this).removeAttr("style");
								if( ch.skills[$(this).val()].key==eSkill.useDefaultFrom.key ) {
									$(this).css({color:"#DEF",backgroundColor:"#777"});
									baseSkillOptVal = $(this).val();
								}
							}
						);
						$("#editSkillTechManDefaultSkillList").val(baseSkillOptVal);		// SELECT current base skill
        		// base skill 'penalty'
        		var penaltyOptsHTML = "\n                            "
        		                    + makeNumberOptionsList( -30, 4, eSkill.techniqueDefaultPenalty, true ).join("\n                            ")
        		                    + "\n                          ";
        		$("#editSkillTechManDefaultPenalty").html( penaltyOptsHTML );
						$("#editSkillTechManDefaultPenalty option").each(		// indicate (only) current default in select list
							function() {
								$(this).removeAttr("style");
								if( $(this).val()==eSkill.techniqueDefaultPenalty ) {
									$(this).css({color:"#DEF",backgroundColor:"#777"});
								}
							}
						);
						$("#editSkillTechManDefaultPenalty").val(eSkill.techniqueDefaultPenalty);		// SELECT current default (redundant with list construction above)
						// skill 'penalty' max
						if( eSkill.hasOwnProperty('maxRelLevel') ) $('#techniqueMaxIncrease').prop('disabled',false)
						else $('#techniqueMaxIncrease').prop('disabled','disabled');
						$("#editSkillTechManMaxIncrease option").each(		// indicate (only) current max in select list
							function() {
								$(this).removeAttr("style");
								if( $(this).val()==eSkill.maxRelLevel ) {
									$(this).css({color:"#DEF",backgroundColor:"#777"});
								}
							}
						);
						$("#editSkillTechManMaxIncrease").val(eSkill.maxRelLevel);		// SELECT current max
        }
        // prereqs and defaults
        document.getElementById('skillPrereqsList').innerHTML = makePrereqsTable( eSkill, spec, chosenSkillType, "                        ", true );
        //alert( JSONstring.make(eSkill.defaults()) );
        document.getElementById('skillDefaultsList').innerHTML = makeDefaultsTable( eSkill, spec, chosenSkillType, "                        ", true );   // need this to be empty sometimes!

    //    var matchingPrereqs = eSkill.prerequisitesFor();
    //    if( matchingPrereqs.length>0 ) {
    // //       alert("populating table with matching prereqs:\n"+JSONstring.make(matchingPrereqs));
    //        var n = 1;
    //        // what exactly do I want to do with these?  List them on the form somehow...
    //        var prereqsListHTMLlines = [''];
    //        prereqsListHTMLlines.push('  <tbody>');
    //        prereqsListHTMLlines.push('    <tr style="border:border-bottom:1px solid blue"><th style="text-align:center">Prerequisite</th><th style="text-align:center">Override</th></tr>');
    //        for( var i in matchingPrereqs ) {
    //            if( i=='length') continue;
    //            var prereqItem = matchingPrereqs[i];
    //            // combine pgroup entries somehow
    //            // fetch a better name?
    //            // check checkbox if there is an override for this prereq
    //            var checked = ( prereqItem.prereq=='override' ) ? 'checked="checked"' : '';
    //            prereqsListHTMLlines.push('    <tr><th>'+prereqItem.prereq+'</th><td><input id="prereq'+n+'" value="'+i+'" type="checkbox" '+checked+' /></td></tr>');
    //            n++;
    //        }
    //        prereqsListHTMLlines.push('  </tbody>');
    //        prereqsListHTMLlines.push('');
    //        document.getElementById('skillPrereqsList').innerHTML
    //            = prereqsListHTMLlines.join("\n                        ");
    //        document.getElementById('editSkillPrerequisitesTR').style.display = 'table-row';
    //    }
    //    else {
    //        // hide the table
    //        document.getElementById('skillPrereqsList').innerHTML = '';
    //    }
    }
    else if( action.match(/insert/i) ) {
        // show and populate formatting options
        document.getElementById('editSkillsListFormattingTable').style.display = 'table';
        var formatItem = getRadioGroupValue( document.editSkillForm['insertSkillsListFormattingChbox'] );
        action = 'insert ' + formatItem + ' after';   // you must ensure no further uses of 'action' other than submit button text, or define an actionText variable instead of this
    }

    // rewrite Submit button text
    document.getElementById('editSkillSubmit').value = '';
    document.getElementById('editSkillSubmit').innerHTML = '<span id="editAction">'+action+'</span> <em>'+eSkillName+'</em> '+chosenSkillType;
    document.getElementById('editSkillSubmit').disabled = null;
    // should leave submit button disabled if 'insert' is the action, but no formatting is selected
}
function editSkill( skillIndex ) {

    var ch = document.loadedCharacter;

    // get action
    var action = getCheckedValue( document.editSkillForm['editSkillAction'] );
 //   alert(action);
    // act accordingly
    if( action.match(/insert/i) ) {
        // insert what kind of formatting?
        var formatItem = getCheckedValue( document.editSkillForm['insertSkillsListFormattingChbox'] );
  //      alert(formatItem);
        // create the format object
        if( formatItem=='heading' ) {
            var headingText = document.getElementById('insertSkillHeadingText').value;
            var formatObj = { line: headingText };
        }
        else if( formatItem=='space' ) {
            var formatObj = { line: false };
        }
        // add it to the Character.skills array, inserting it after the index skill
        ch.skills.splice( 1*skillIndex+1, 0, formatObj );
    }
    else if( action=='delete' ) {
        if(!confirm("remove '"+ch.skills[skillIndex].name+"' skill?")) return;
        ch.skills.splice(skillIndex,1);
    }
    else {  // edit
        var eSkill = ch.skills[skillIndex];

        // update basic skill attributes
        eSkill.name       =   document.editSkillForm['editSkillNameText'].value;
        if( !$('#editSkillAttribute').prop('disabled') )		// condition needed in case this skill is a maneuver/technique
		        eSkill.attribute  =   document.editSkillForm['editSkillAttribute'].value;
        eSkill.type       =   document.editSkillForm['editSkillType'].value;
        eSkill.difficulty = 1*document.editSkillForm['editSkillDifficulty'].value;
        if( document.getElementById('editSkillTechLevelInputTD').style.display!='none' ) {
            var TL = document.getElementById('editSkillTechLevel').value;
            eSkill.TL = 1*TL;
        }

        // maneuver/technique attributes
        if( eSkill.attribute.match(/M|T/) ) {
						if( eSkill.hasOwnProperty('techniqueDefaultPenalty') )
								eSkill.techniqueDefaultPenalty = 1*$('#editSkillTechManDefaultPenalty').val();
						if( eSkill.hasOwnProperty('maxRelLevel') )
								eSkill.maxRelLevel = 1*$('#editSkillTechManMaxIncrease').val();
        }

        // update required specialization
        var newSpecText = document.editSkillForm['editSkillReqSpecialization'].value;
        if( eSkill.hasOwnProperty('specialization') || newSpecText ) {
            if( newSpecText.match(/\w/) ) {
                eSkill.specialization = newSpecText;
            }
            else {
                alert('this skill requires a specialization');
                return false;
            }
        }

        // update optional specialization(s)
        var optSpecRow = 1;
        var optSpecs = [];
        while( document.getElementById('editSkillOptSpecialization'+optSpecRow+'Text') ) {
            if( document.getElementById('toggle_editSkillOptSpecialization'+optSpecRow).checked ) {
                if( document.getElementById('editSkillOptSpecialization'+optSpecRow+'Text').value.match(/\w/) )
                    optSpecs.push( document.getElementById('editSkillOptSpecialization'+optSpecRow+'Text' ).value );
            }
            optSpecRow++;
        }
        if( optSpecs.length>0 ) { eSkill.optSpecsArray = optSpecs; }    // clunky; overwrites optSpecsArray even if there are no changes
        else { delete eSkill.optSpecsArray; }

        // update or add description
        var newDescription = document.getElementById('editSkillDescription').value;
        if( newDescription ) {
            eSkill.description = newDescription;
        }
        else delete eSkill.description;   // so that descriptions can be removed

        // update spell properties, if present
        // colleges?  do I want to mess with this?
        if( eSkill.hasOwnProperty('spell') ) {
            var statKeys = [ 'duration', 'castcost', 'maintaincost', 'time', 'notes' ];
            console.log("[editSkill] Spell.stat keys: "+statKeys);
            eSkill.stats = {};	// erases classes present
            for( var ski=0; ski<statKeys.length; ski++ ) {
                var statKey = statKeys[ski];
                var statVal = $("#editSkillSpell_"+statKey).val();
                if(statVal) { eSkill.stats[statKey] = ( isNaN(statVal) ) ? statVal : 1*statVal; }
              //  if( !isNaN( eSkill.stats[statKey] ) eSkill.stats[statKey] = 1*eSkill.stats[statKey];
            }
            console.log("[editSkill] after updating spell stats:\n"+JSONstring.make(eSkill));
            eSkill.classes = {};	// erases classes present
            $('[id^="editSpellClassCB_"]').each(
                function() {
                    if( $(this).prop('checked') ) {
                        var spellClassAbrv = $(this).attr('id').substr(17);
                        eSkill.classes[spellClassAbrv] = true;
                    }
                }
            )
            console.log("[editSkill] after updating spell classes:\n"+JSONstring.make(eSkill));
        }

        // override prerequisites
        var n = 1;
        while( document.getElementById('prereq'+n) ) {
            var chBox = document.getElementById('prereq'+n);
            var prereqKey = chBox.value;
            if( chBox.checked ) {
                // fetch the prerequisite object that is to be overridden
                var prereqToOverride = Prerequisites[prereqKey];
                // need an 'if' here, in case this isn't a change, and this next line tries to replace the entry with an 'override' prereq object
               /* if( prereqToOverride.prereq=='override' ) */ OverriddenPrerequisites[prereqKey] = prereqToOverride;
                // alert("in editSkill; prereqToOverride is\n"+JSONstring.make(prereqToOverride));
                ch.prerequisites[prereqKey] = { target: prereqToOverride.target, prereq: 'override' };
                if( prereqToOverride.hasOwnProperty('pgroup') )
                    ch.prerequisites[prereqKey].pgroup = prereqToOverride.pgroup;
            }
            else if( ch.prerequisites.hasOwnProperty(prereqKey) && ch.prerequisites[prereqKey].prereq=="override" ) {
                // need to REMOVE corresponding "override" prereq from ch.prerequisites
                console.log("deleting no-longer-overridden Prerequisite "+prereqKey+" from ch.prerequisites");
                delete ch.prerequisites[prereqKey];
                // But when loadCharacter was last run, the prereq in the Prerequisites library object
                // was overwritten by this one - it's still there.  Need to bring the old one back.
                // Fortunately, I have saved the overwritten prerequisites, so I can roll back changes:
         //       alert('restoring '+prereqKey+' from OverriddenPrerequisites');
                Prerequisites[prereqKey] = OverriddenPrerequisites[prereqKey];
                console.log("deleting no-longer-overridden Prerequisite "+prereqKey+" from OverriddenPrerequisites object");
                delete OverriddenPrerequisites[prereqKey];
            }
            n++;
        }

        // update default-from skill (form element id: defaultUsed) (Skill object field: useDefaultFrom)
        // how to know that this should be *changed*?  what do I check before doing this, or must I always do it?
        var defaultChoiceGp = document.editSkillForm['defaultUsed'];
        if( defaultChoiceGp ) {
            var defChoice = getCheckedValue( defaultChoiceGp );
            // is defChoice the expected default?
            eSkill.useDefaultFrom = defChoice;
        }

        // update base attribute

    }
    // put the dialog box away
    document.getElementById('editSkillDialog').style.display = 'none';
    // cause character to be reloaded so that the edited ad or disad gets shown
    loadCharacter( ch, "Edit Skill" );
}
function removeSkill( skillID ) {
    if( !skillID ) { skillID = document.getElementById('removeSkillMenu').value };
 //   var skillTokens = skillID.split('_');
    document.loadedCharacter.skills.splice( skillID, 1 );
    document.getElementById('removeSkillDialog').style.display = 'none';
    loadCharacter( document.loadedCharacter, "Remove Skill" );
}
// Techniques (ne'e Maneuvers)
function defineTechniqueDialog() {
    // populate default select list
		var techniqueDefaultListHTML = [''];
    var disabledTitleAtt = ' title="Skills on which a maneuver/technique is to be based must be known at a skill level of 12+."';
    var skillsArr = document.loadedCharacter.skills;
    for( var m=0; m<skillsArr.length; m++ ) {
        var skill = skillsArr[m];
        if( skill.name ) {
            var option = ( skill.level()<12 )
                ? '  <option value="'+m+'"'+disabledTitleAtt+' disabled="disabled">'+skill.print()+'</option>'
                : '  <option value="'+m+'">'+skill.print()+'</option>';
            techniqueDefaultListHTML.push(option);
        }
    }
    techniqueDefaultListHTML.push('');
    var penaltyOptsHTML = "\n                            "
                        + makeNumberOptionsList( -30, 4, false, true ).join("\n                            ")
                        + "\n                          ";
    $("#defineTechniqueDefaultPenalty").html( penaltyOptsHTML );
    // pre-select 'M' or 'T' radio according to character.gameInfo.ruleset value
    var form = document.getElementById('defineTechniqueForm');
    if( document.loadedCharacter.gameInfo.ruleset=='e3' ) { setRadioGroupValue( form.techniqueCostTable, 'M' ); }
    else { setRadioGroupValue( form.techniqueCostTable, 'T' ); }
    document.getElementById('selectTechniqueDefaultSkillMenu').innerHTML = techniqueDefaultListHTML.join("\n                ");
    setupDialog('defineTechniqueDialog');
}
function showTechniqueInfoInWindow( form ) {
    // alter max text
    var skillIndex = form.techniqueDefaultSkill.value;
    var chSkill = document.loadedCharacter.skills[skillIndex];
    console.log("[showTechniqueInfoInWindow] fetched skill "+skillIndex+":\n"+JSONstring.make(chSkill));
    var skillName = chSkill.name;
    document.getElementById('techniqueDefaultFromName').innerHTML = skillName;
    // alter submit button
    var techniqueName = form.techniqueName.value;
    if( techniqueName ) {
        document.getElementById('TechniqueSubmitName').innerHTML = techniqueName;
    }
}
function attachTechniqueToCharacter( form ) {
    // localize form values
    var techniqueName              = form.techniqueName.value;
    var techniqueDefaultSkillIndex = form.techniqueDefaultSkill.value;
    if( !techniqueDefaultSkillIndex ) {
				alert("You must choose a skill from the list on which to base this maneuver/technique.");
				return false;
    }
    var techniqueDefaultPenalty = 1*form.techniqueDefaultPenalty.value;
    var techniqueDifficulty     = 1*getRadioGroupValue( form.techniqueDifficulty );
    var techniqueCostTable      = getRadioGroupValue( form.techniqueCostTable );
    var techniqueSpecialization = form.techniqueSpecChbox.checked;
    var techniqueMaxIncrease    = (form.techniqueBonusChbox.checked)
                                ? 1*form.techniqueMaxIncrease.value
                                : null;
    var techniqueDescription    = (form.techniqueDescChbox.checked)
                                ? form.techniqueDescription.value
                                : null;

    // need to fix reference to default skill

    // build object
    var techniqueSkill = new Skill( techniqueName, techniqueCostTable, techniqueDifficulty );
    // if default-to skill is a spell, spellify techniqueSkill
    if( document.loadedCharacter.skills[techniqueDefaultSkillIndex].spell )
        techniqueSkill.spellify();
		// need to parse the label, and get and attach an actual reference to the default skill
    techniqueSkill.useDefaultFrom = document.loadedCharacter.skills[techniqueDefaultSkillIndex];
    techniqueSkill.techniqueDefaultPenalty = 1*techniqueDefaultPenalty;
    if( techniqueSpecialization ) techniqueSkill.specialization = techniqueSkill.useDefaultFrom.name;
    if( techniqueMaxIncrease!=null ) techniqueSkill.maxRelLevel = techniqueMaxIncrease;
    if( techniqueDescription!=null ) techniqueSkill.description = techniqueDescription;
    // make a key
    var pKey = techniqueName.replace(/\W+/g,'');
    var ki = '';
    while( Skills.hasOwnProperty(pKey+ki) ) { if( ki=='' ) { ki=1 } else { ki++; } }    // ensure uniqueness
    techniqueSkill.key = pKey+ki;
  //  alert(JSONstring.make(techniqueSkill));

    // attach to Character & reload
		document.loadedCharacter.skills.push(techniqueSkill);
    loadCharacter( document.loadedCharacter, "Add Technique" );

    // close dialog box
    document.getElementById('defineTechniqueDialog').style.display='none';
    return false;
}

// Languages
var langLevelNames = {
    "Spoken"  : ["[None]","Broken","Accented","Native"],
    "Written" : ["[Illiterate]","Semi-Literate","Literate","Native"]
};
// some 'global' vars to track ch languages info (set by running getCharacterLanguagesInfo)
var hasNativeLanguage = false;
var chLanguages = {};
function getCharacterLanguagesInfo() {
    var ch = document.loadedCharacter;
    hasNativeLanguage = false;
    chLanguages = {};
  CHLANGAD:
    for( var i in ch.traits ) {
        var tr = ch.traits[i];
        if( tr.hasOwnProperty('key') && tr.key.match(/^language/i) ) {
            // note languages already taken
            chLanguages[tr.name] = true;
            // note if language is native:
            if( tr.cost<0 ) hasNativeLanguage = true;
        }
    }
  CHLANGSK:
    for( var i in ch.skills ) {
        var sk = ch.skills[i];
        if( sk.hasOwnProperty('key') && sk.key.match(/^language/i) ) {
            // note languages already taken
            chLanguages[sk.name] = true;
            // note if language is native:
            if( sk.hasOwnProperty('description') && sk.description.match(/^native/i) ) hasNativeLanguage = true;
        }
    }
}
function languagesDialog( edit, langInfoFromCsheet ) {

    var ch = document.loadedCharacter;
		getCharacterLanguagesInfo();
  // alert( "chLanguages:\n"+JSONstring.make(chLanguages)+"\n\nhasNativeLanguage: "+hasNativeLanguage );

    var imp = ( ch.gameInfo.ruleset.match(3) ) ? 3 : 4;
    var index;
    if( langInfoFromCsheet ) {  // defer branch (why?)
        // parse any language info passed (if this function was called by clicking on a language in the sheet, to edit it, for instance)
        var tokens = langInfoFromCsheet.split('_');
        index = tokens[0];
        imp = tokens[1];
    }
    else {    // if this function was called from the 'Languages' menu item (i.e., no edit or langInfoFromCsheet)
        // disable the implementation picker
        if( !edit ) document.getElementById('languageImplementation').disabled = true;
    }

    // initialize form elements
    // document.getElementById('native').removeAttribute('disabled');  // defer
    // document.getElementById('nativeLabel').style.color = 'inherit';  // defer
    document.getElementById('languagesDialogTitlebarVerb').innerHTML = ( edit ) ? 'Edit' : 'Choose';

		// look for and load language skills and language traits into menu
    var languageOptionsHTML = [''];
    var clickedLangName = false;  // defer
    if( edit ) {
        // for( var i=0; i<ch.traits.length; i++ ) {  // defer
        //     var pLangTrait = ch.traits[i];
        //     if( i==index ) clickedLangName = pLangTrait.name;
        // }
        var langAdSeen = {};
        for( var adi=0; adi<ch.traits.length; adi++ ) {
            var pLangTrait = ch.traits[adi];
            if( pLangTrait.hasOwnProperty('key') && pLangTrait.key.match(/^language/i) ) {
                if( pLangTrait.key.match(/talent/i) ) continue;  // skip Language Talent
                var langName = pLangTrait.name;
                var langRef  = pLangTrait.reference || '';
                // if this language was clicked on the sheet, pre-select the corresponding comprehension menu
                if( langInfoFromCsheet && (adi==index || langName==clickedLangName) && !pLangTrait.description.match(/native/i) ) {  // defer
      //              alert('setting value for '+langName+' in '+pLangTrait.description+'Comp menu');
                    document.getElementById(pLangTrait.description+'Comp').value = pLangTrait.levels;
                }
                // have we seen it before?  if so, skip
                if( langAdSeen.hasOwnProperty(langName) ) continue;
                // if not, make an option for it
                var selected = ( adi==index ) ? ' selected="selected"' : '';  // defer
                languageOptionsHTML.push('            <option value="'+adi+'_4" title="'+langRef+'"'+selected+'>'+langName+'</option>');
                // and mark it as 'seen'
                langAdSeen[langName] = /*(adi==index) ? 'clicked' :*/ true;
            }
        }
        for( var sk=0; sk<ch.skills.length; sk++ ) {
            var pLangSkill = ch.skills[sk];
            if( pLangSkill.hasOwnProperty('key') && pLangSkill.key.match(/^language/i) ) {
                var langName = pLangSkill.name;
                var langRef  = pLangSkill.reference || '';
                languageOptionsHTML.push('            <option value="'+sk+'_3" title="'+langRef+'"'+selected+'>'+langName+'</option>');
            }
        }
      // alert('edit mode; setting languageNewOrEdit to '+langName);
        document.getElementById('languageNewOrEdit').value = langName;
        document.getElementById('languageImplementation').disabled = true;
    }
    else {
        if( hasNativeLanguage ) {
          // alert('has native language; disabling checkbox');
            var nativeCB = document.languagesForm.native;
            nativeCB.checked = false;
            nativeCB.disabled = true;
            document.getElementById('nativeLabel').style.color = 'grey';
        }
        for( var key in Traits ) {
            var pLangTrait = Traits[key];
            if( pLangTrait.key=="Language" ) {
                // filter out languages already taken - how?

                var langName = pLangTrait.name;
                var langRef  = pLangTrait.reference || '';
                languageOptionsHTML.push('            <option value="'+key+'_4" title="'+langRef+'">'+langName+'</option>');
            }
        }
        for( var k in Skills ) {
            var pLangSkill = Skills[k];
            if( !pLangSkill.key ) continue;
            if( pLangSkill.key.match(/^language/i) ) {
                // filter out languages already taken - use a hash like above?
           //     if( ch.hasSkill(key) ) { continue LANG; }    this wouldn't work - they all have the SAME key
                var langName = pLangSkill.name;
                var langRef  = pLangSkill.reference || '';
                languageOptionsHTML.push('            <option value="'+key+'_3" title="'+langRef+'">'+langName+'</option>');
            }
        }
        document.getElementById('languageNewOrEdit').value = 'new';
        document.getElementById('languageImplementation').disabled = false;
    }

    if( languageOptionsHTML.length==1 ) {
        // display 'nothing found' message in select menu
        var source = ( edit ) ? 'for '+ch.description.name : 'in libraries';
        languageOptionsHTML.push('            <option>[no languages found '+source+']</option>');
        document.getElementById( 'selectLanguageMenu' ).disabled = true;
        // hide the select menu
	//	    document.getElementById('selectLanguageMenu').style.display = 'none';
    }
    else {                              // some language skills or ads were found
        document.getElementById( 'selectLanguageMenu' ).disabled = false;
 //       toggleDisplay( document.getElementById('customLanguagesToggleButton'), 'customLanguageSubform', 'block' );
    }
    languageOptionsHTML.push('          ');
    document.getElementById( 'selectLanguageMenu' ).innerHTML = languageOptionsHTML.join("\n");

    // adjust 4e menu options for presence (or absence) of Language Talent trait
    if( ch.hasTrait('LanguageTalent') ) {
        $('#SpokenComp option[value="1"]').html('accented');
        $('#SpokenComp option[value="2"]').html("'native'");
        $('#SpokenComp option[value="3"]').hide();
        $('#WrittenComp option[value="1"]').html('literate');
        $('#WrittenComp option[value="2"]').html("'native'");
        $('#WrittenComp option[value="3"]').hide();
    }
    else {  // restore non-LanguageTalent state
        $('#SpokenComp option[value="1"]').html('broken');
        $('#SpokenComp option[value="2"]').html("accented");
        $('#SpokenComp option[value="3"]').show();
        $('#WrittenComp option[value="1"]').html('semi-literate');
        $('#WrittenComp option[value="2"]').html('literate');
        $('#WrittenComp option[value="3"]').show();
    }

    // pre-select implementation matching game info
    document.languagesForm.languageImplementation.value = imp;

    setupDialog('languagesDialog');

    // if( langInfoFromCsheet )
        languageInfo( langInfoFromCsheet );
}
function synchWritten( lvl ) {
    var writtenCompMenu = document.getElementById('WrittenComp');
    for( var i=0; i<4; i++) {
        if( writtenCompMenu.options[i].value == lvl ) {
            writtenCompMenu.selectedIndex = i;
        }
    }
}
/*  languageInfo()

jobs:
populate "Language name" field and put language name in submit button text
set "Language is" language implementation menu selection
populate "Language comprehension/difficulty" field(s)
check/uncheck and enable/disable the native language checkbox (set to 'checked' if there are NO languages (no native language??) yet, or if the selected language is the native language)
if Language dialog is launched by clicking on a language in the character sheet,
  select that language in the menu (if it is present there)

start events:
click on language in menu
click on language in character sheet
click on implementation selection
type in "Language name" field
will also be called from languagesDialog()

parameters:
language selected
native status
name
implementation
comprehension/difficulty level(s)

also available is the chLanguages hash built by getCharacterLanguagesInfo:
{
  "Cantonese": true,
  "English": true,
  "Language Name": true
}
and the hasNativeLanguage variable (Boolean), also set by getCharacterLanguagesInfo

pseudo-code:
gather available info
create a language object using that info
populate/adjust form elements to match object

*/
function languageInfo( langInfo ) {
 // alert(langInfo);
    // localize
    var ch = document.loadedCharacter;
    var form = document.languagesForm;
    var langMenu = form.selectLanguageMenu;
    var nativeCB = form.native;
    var customLangNameInput = form.customLanguageName;
    // initialize some variables
    var languageName = 'this language';
    var customLangName = customLangNameInput.value;
    var nativeCB_on = nativeCB.checked;
    var noLangInfo = ( langInfo ) ? false : true;
    // initialize form elements
    nativeCB.removeAttribute('disabled');
  //  nativeCB.checked = false;
  //  nativeCB.removeAttribute('checked');
    document.getElementById('nativeLabel').style.color = 'inherit';
    // alert("'native' checkbox checked: "+nativeCB_on);

    // get language clicked on, or selected from menu, if any
    if( !langInfo ) langInfo = langMenu.value;
    var chRuleset = ( ch.gameInfo.ruleset.match(3) ) ? 3 : 4;
    var langKey;
    var langImp = form.languageImplementation.value;
    if( langInfo ) {   // false when nothing selected in menu, but TRUE when a language in the c-sheet is clicked (and currently up for grabs when a language is selected, but this function is called from a different form element action)

        // select and scroll to indicated menu option
        $('#selectLanguageMenu').val( langInfo );
        //menu.options[menuSelectedIndex].scrollIntoView();

        var tokens = langInfo.split('_');
     // alert(tokens);
        langKey = tokens[0];    // langKey is either an array index (integer) or an object key (text)
        langImp = tokens[1];    //
     //   form.languageImplementation.value = langImp;    // doing this here prevents changing the implementation for an existing language; just sayin'
        if( langMenu.selectedIndex>=0 )
            languageName  = langMenu.options[langMenu.selectedIndex].text;
    }

    // The normal way would be to get the language object (skill or trait) at this point,
    // if there is one, and populate the form using its properties.  Can we do this here?
    // Does this change what I've been doing, which tends to work in the other direction?
  // alert( langImp );
  // alert( "langKey: "+langKey );
  // alert( "isNaN(langKey): "+isNaN(langKey) );
    var selectedLang;
   // alert(chRuleset);
    if( chRuleset==4 ) {
        selectedLang = ( isNaN(langKey) ) ? Traits[langKey] : ch.traits[langKey];
        // if a trait from ch.traits is grabbed here, it will be only one of a pair
    }
    else if( chRuleset==3 ) {
        selectedLang = ( isNaN(langKey) ) ? Skills[langKey] : ch.skills[langKey];
    }
    // alert(JSONstring.make(selectedLang));
    if( selectedLang ) languageName = selectedLang.name;

		// if( customLangName && customLangName!=languageName ) languageName = customLangName;
    customLangNameInput.value = languageName;
    if( selectedLang )
        customLangNameInput.value = selectedLang.name

    // enable language implementation selector (why?)
    // form.languageImplementation.disabled = false;
    // form.languageImplementation.removeAttribute('disabled');
    form.languageDifficulty.removeAttribute('disabled');

		// live update the point cost of advantage when level choice changes

    // show language options code - toggle visibility of 'difficulty' vs 'comprehension' inputs
    var imp = form.languageImplementation.value;
    for( var i=3; i<=4; i++ ) {
        var optionsTR = document.getElementById(i+'e_language_options');
        if( i==imp ) optionsTR.style.display='table-row';
        else optionsTR.style.display='none';
    }

    var langNameMarkup = (languageName=='this language') ? languageName : '<i>'+languageName+'</i>'

    // update the 'Take/Edit language' button with language name
    var verb = (document.getElementById('languagesDialogTitlebarVerb').innerHTML=='Edit') ? 'Save changes to' : 'Take';
    // form.languageSubmit.value = verb+' '+languageName;
    form.languageSubmit.innerHTML = verb+' '+langNameMarkup;
    form.languageSubmit.removeAttribute('disabled');
    if( verb.match(/changes/) ) {   // put language name in a hidden field; will need to fetch the right one if the name gets edited
        document.getElementById('languageNewOrEdit').value = languageName;
      //  alert('edit mode; setting languageNewOrEdit to '+languageName);
    }

    // has a native language already been defined for this character?
    getCharacterLanguagesInfo();
  //  alert(JSONstring.make(chLanguages));

    // update 'native language' label with language and character names
    $('#nativeLabel').html('&ensp;<span id="language_name">This</span> is <span id="languages_charname">your character</span>\'s native language');
    var chName = ch.description.name;
    if( chName != 'New Character' )
        $('#languages_charname').html( chName );
    else
        $('#languages_charname').html('your character');
    $('#language_name').html( langNameMarkup );
 //   alert('hasNativeLanguage: '+hasNativeLanguage+"\n\'description' matches '/native/i':\n"+selectedLang.description.match(/^native/i)+"\n\nselectedLang:\n"+JSONstring.make(selectedLang));

    // the native checkbox/label starts out unchecked and enabled (initialized above)
    if( hasNativeLanguage && !noLangInfo ) {
        if( selectedLang && ( (chRuleset==4 && selectedLang.cost<0) || (chRuleset==3 && selectedLang.description=="native") ) ) {
            nativeCB.checked = true;  // if this language is the character's native language, then check the box
            // and put "this is ch's native language" statement in <label> tag
        }
        else {    // disable the checkbox and label
            // alert('disabling native language form elements');
            nativeCB.checked = false;
            nativeCB.disabled = true;
            document.getElementById('nativeLabel').style.color = 'grey';
            $('#nativeLabel').html('&ensp;'+chName+' already has a native language');
        }
    }

    // initialize comprehension menus for normal (non-native) languages
    var spokenCompMenuOpts  = [ "[none]",       "broken",        "accented", "'native'" ];
    var writtenCompMenuOpts = [ "[illiterate]", "semi-literate", "literate", "'native'" ];
    if( nativeCB.checked ) {
        spokenCompMenuOpts.reverse();
        writtenCompMenuOpts.reverse();
    }
    $('#SpokenComp').html('');
    $.each( spokenCompMenuOpts, function(i, value) {
         $('#SpokenComp')
             .append($("<option></option>")
             .attr("value",i)
             .text(value));
    });
    $('#WrittenComp').html('');
    $.each( writtenCompMenuOpts, function(i, value) {
         $('#WrittenComp')
             .append($("<option></option>")
             .attr("value",i)
             .text(value));
    });

    document.getElementById('adLanguagePointsNotice').innerHTML = '<td colspan="2">&nbsp;</td>';

    // set language level(s) according to selected language
    if( imp==4 ) {
        if( isNaN(langKey) ) {
            // goes here if languageInfo() was called by clicking on the 'native' checkbox
        }
        else {
            var twinLang;
            var langTraits = ch.getTraits('Language');
            //alert(JSONstring.make(langTraits));
            for( var n=0; n<langTraits.length; n++ ) {
                var languageObj = langTraits[n];
                if( languageObj.name==selectedLang.name && languageObj.description!=selectedLang.description )
                    twinLang = languageObj;
            }
            //alert("twin language object:\n"+JSONstring.make(twinLang));
            var spokenLang;
            var writtenLang;
            if( selectedLang.description.match(/spoken/i) ) {
                spokenLang  = selectedLang;
                writtenLang = twinLang;
            }
            else {
                writtenLang = selectedLang;
                spokenLang  = twinLang;
            }
            form.SpokenComp.value  = spokenLang.levels;
            form.WrittenComp.value = writtenLang.levels;
        }
    }
    if( chRuleset==3 ) {
          // alert('ruleset 3, langKey='+langKey);
        form.languageDifficulty.value = selectedLang.difficulty;
    }
    if( nativeCB.checked ) {
        // alert('disabling difficulty/comprehension form elements');
        if( imp==4 ) {            // 'native' is checked, 4th edition language
            if( isNaN(langKey) ) {    // nothing selected in menu, so
                // pre-select the 'highest' competency in each (normal sitch for a native language)
                form.SpokenComp.value  = 0;
                form.WrittenComp.value = 0;
            }
            else {    // there is a menu selection, so
                // use selected language(s) levels to set values of competency menu options
                form.SpokenComp.value  = spokenLang.levels;
                form.WrittenComp.value = writtenLang.levels;
            }
            // and disable the disallowed options for a native language
            form.SpokenComp.options[3].disabled = true;   // disable Spoken: none option
            form.WrittenComp.options[1].disabled = true;  // disable Written: literate option
            // change notice
            document.getElementById('languageWrittenMenuLabel').innerHTML = "Written*";
            //document.getElementById('adLanguagePointsNotice').innerHTML = '<td colspan="2" style="text-align:center">* you can get -3 pts for "illiterate", or -2 for "semi-literate", in your native language</td>';
            document.getElementById('adLanguagePointsNotice').innerHTML = '<td colspan="2" style="text-align:center">* you can get points for reduced literacy or eloquence in your native language</td>';
        }

        form.languageDifficulty.disabled = true;
        if( imp==4 ) {
        }
    }
    else {  // restore non-native_language state
  //      alert('enabling language difficulty/comprehension form elements');
        form.SpokenComp.options[0].removeAttribute('disabled');
        form.WrittenComp.options[2].removeAttribute('disabled');
        if( imp==4 ) {
            document.getElementById('languageWrittenMenuLabel').innerHTML = "Written";
            document.getElementById('adLanguagePointsNotice').innerHTML = '<td></td><td style="text-align:center">(1 point/level each)</td>';
        }
    }
}
function loadLanguage( langForm ) {
    var ch = document.loadedCharacter;
    var langName = langForm.customLanguageName.value;
    var langImp = ( langForm.languageImplementation.value==3 ) ? 'skill' : 'advantage'; //  alert(langForm.languageImplementation.value);
    var editLang = langForm.languageNewOrEdit.value;
    var newLang = ( editLang=='new' );
    var nativeCB = langForm.native.checked;

    var langObj = {};
    if( langImp=='skill' ) {            // attach language as a skill
        if( newLang ) {
            if( langName ) {                // so this is a custom language; read and use form values
                langObj = new Skill( langName, 'IQ', 1*langForm.languageDifficulty.value );
                langObj.key = 'Language';
            }
            else {                          // get language from menu
                langLabel = langForm.selectLanguageMenu.value;
                langObj = Skills[langLabel].clone();
            }
            langObj.points = ( nativeCB ) ? 0 : 1;
            if( nativeCB ) langObj.description = 'Native language';
      //    alert("about to attach this:\n"+JSONstring.make(langObj));
            ch.skills.push( langObj );
        }
        else { // edit
            // get pointer to correct item in ch.skills
            for( var i=0; i<ch.skills.length; i++ ) {
                var chLangSk = ch.skills[i];
              // alert('matching '+chLangSk.name+' to '+editLang);
                if( chLangSk.name && chLangSk.name==editLang ) {    // match ch skill name to language name recorded in languageNewOrEdit field when form was populated
                    langObj = chLangSk;
                    // edit attributes using form info
                    langObj.name = langName;
                    langObj.difficulty = 1*langForm.languageDifficulty.value;
                    if( nativeCB ) langObj.description = 'native';
                    else delete langObj.description;
                    // points can be edited directly on the sheet
                  //  alert(JSONstring.make(langObj));
                }
            }
            // This code does not account for the case where the language implementation changes (e.g., trait -> skill)
        }
    }
    else {                              // value=4; attach language as a trait (two, actually)
        if( newLang ) {

            langLabel = langForm.selectLanguageMenu.value;
            for( var mode in langLevelNames ) {
                var cost = ( nativeCB ) ? -1 : 1;
                langObj = ( langName )  // test for custom language (open Language Options section instead?)
                        ? new Trait( langName, 'L', 'M', cost, true, 'USER' )
                        : Traits[langLabel].clone();
                langObj.levels = 1*langForm[mode+'Comp'].value;
                langObj.highestLevel = 3;
                langObj.lowestLevel = 0;
                langObj.levelNames = langLevelNames[mode].slice();  // slice to make a shallow copy, rather than a reference
                if( nativeCB ) langObj.levelNames.reverse();
                langObj.description = mode;
                langObj.key = 'Language';
                //  alert("about to attach this:\n"+JSONstring.make(langObj));
                ch.traits.push( langObj );
            }
        }
        else { // edit
            // get pointer to correct item in ch.traits
            var p = 0;
            for( var i=0; i<ch.traits.length; i++ ) {
                var chLangAd = ch.traits[i];
                if( chLangAd.name && chLangAd.name==editLang ) {  // this should match twice (Spoken/Written)
                    langObj = chLangAd;
                    var mode = langObj.description;     // 'Spoken' or 'Written'
                    // edit attributes using form info
                    langObj.name = langName;
                    langObj.levels = /*( nativeCB )
                                   ? 3 - 1*langForm[mode+'Comp'].value
                                   :*/ 1*langForm[mode+'Comp'].value;
                    var nativeBit  = ( nativeCB ) ? -1 : 1;
                    if( langObj.cost != nativeBit ) {   // native-ness is being changed (either direction)
                        langObj.cost *= -1;             // toggle cost
                        langObj.levelNames.reverse();   // reverse level names array
                    }
                }
            }
            // This code does not account for the case where the language implementation changes (e.g., skill -> trait)
        }

    }
		loadCharacter( ch, "Add Language" );
}

// Cultural Familiarities
// some 'global' vars to track ch cultures info
var hasNativeCulture = false;
var chCultures   = {};
function getCharacterCulturesInfo(ch) {
    hasNativeCulture = false;
    for( var i in ch.traits ) {
        var ad = ch.traits[i];
        if( ad.key=="CulturalFamiliarity" ) {
            if( ad.description=='native' ) hasNativeCulture = true;
        }
    }
}
function culturalFamiliaritiesDialog() {
    document.getElementById('cultureFormSource').removeAttribute('value');

		// look for and load culture advantages
    var cultureOptionsHTML = [''];
  TRAIT:
    for( var key in Traits ) {
        var pCulTrait = Traits[key];
        if( pCulTrait.key=="CulturalFamiliarity" ) {
            // filter out cultural familiarities already taken
            var culName = pCulTrait.name;
            if( chCultures.hasOwnProperty(culName) ) continue TRAIT;
            cultureOptionsHTML.push('            <option value="'+key+'" title="ref for '+key+'">'+culName+'</option>');
        }
    }
    if( cultureOptionsHTML.length==1 ) {
        cultureOptionsHTML.push('            <option disabled="disabled">[no cultures found in libraries]</option>');
        // hide the select menu
	//	    document.getElementById('selectCultureMenuWrapper').style.display = 'none';
    }
    cultureOptionsHTML.push('          ');
    document.getElementById( 'selectCultureMenu' ).innerHTML = cultureOptionsHTML.join("\n");

    setupDialog('specifyCulturesDialog');

    showCultureInfo();
}
function showCultureInfo() {

    var culSelectMenu = document.getElementById('selectCultureMenu');
    var nativeCB = document.getElementById('nativeCulture');
    var focusID = document.activeElement.id;

		// a character may only have one native culture - uncheck and disable box if one is found
		getCharacterCulturesInfo( document.loadedCharacter );
    if( hasNativeCulture ) {
        document.getElementById('nativeCultureLabel').style.color = 'grey';
        if( nativeCB.checked ) simulate( nativeCB, 'click' );
        nativeCB.disabled = true;
    }
    else {
        document.getElementById('nativeCultureLabel').style.color = 'inherit';
        nativeCB.removeAttribute('disabled');
    }
    // use character name in 'native culture' label
    var chName = document.loadedCharacter.description.name;
    if( chName != 'New Character' )
        document.getElementById('charname').innerHTML = chName;
    else
        document.getElementById('charname').innerHTML = 'your character';

    // update the 'Take culture' button with culture name
    var culNameFromList = ( culSelectMenu.selectedIndex>=0 ) ? culSelectMenu.options[culSelectMenu.selectedIndex].text : '';
    var customCulName   = document.getElementById('customCultureName').value;
    document.getElementById('cultureFormSource').value = focusID;
    var culName = ( focusID=='customCultureName' ) ? customCulName : culNameFromList;
    document.getElementById('specifyCultureSubmit').innerHTML
        = ( culName ) ? "Take <em>"+culName+"</em> culture" : 'take this culture';
    if( culName )
        document.getElementById('specifyCultureSubmit').removeAttribute('disabled');
    else
        document.getElementById('specifyCultureSubmit').disabled = 'disabled';

    // show or hide the culture (dis)similarity radios
    var nativeChecked = nativeCB.checked;
    if( nativeChecked ) {
        document.getElementById('cultureSimilarity').style.display = 'none';
    }
    else {
        document.getElementById('cultureSimilarity').style.display = 'table';
    }

}
function loadCulture( culForm ) {
    var culName = culForm.customCultureName.value;
    var source  = culForm.cultureFormSource.value;
    if( !source ) return false;

    var nativeCB = culForm.native.checked;
    var culObj;

    // 'native' culture defaults
    var cost = (nativeCB)
             ? 0
             : 1*getRadioGroupValue(culForm.cultureDissimilarity);
    if( source=='customCultureName' ) {   // so this is a user-entered culture
        culObj = new Trait( culName, 'C', 'M', cost, false, 'USER' );
        culObj.key = 'CulturalFamiliarity';
    }
    else {                     // get culture from menu
        culLabel = culForm.selectCultureMenu.value;
        culObj = Traits[culLabel].clone();
        culObj.cost = cost;
    }
    if( nativeCB ) culObj.description = 'native';

  // alert("about to attach this:\n"+JSONstring.make(culObj));
    document.loadedCharacter.traits.push( culObj );

    loadCharacter( document.loadedCharacter, "Add Familiarity" );

    showCultureInfo();
}

// Templates
function openChooseTemplateWindow() {
    // var options = 'width=400,height=500,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no';
    // var chooseTemplateWindow = window.open('includes/templates.html','Use A Template',options);
}
function chooseTemplateDialog() {
    // load templates into menu
    var templateOptionsHTML = [''];
    for( var i in Templates ) {
        var Template = Templates[i];
        var name = Template.name;
        if( !name ) continue;
        templateOptionsHTML.push('            <option value="'+i+'">'+name+'</option>');
    }
    templateOptionsHTML.push('          ');
    document.getElementById( 'chooseTemplateMenu' ).innerHTML = templateOptionsHTML.join("\n");
    document.getElementById('chooseTemplateSubmit').value = 'apply this template';
    document.getElementById('chooseTemplateSubmit').disabled = 'disabled';
    // update and display dialog
    document.getElementById('chooseTemplateSummary').innerHTML = '';
    showTemplateInfo();
    setupDialog('chooseTemplateDialog');
    return false;
}
function showTemplateInfo() {
    var templateMenu = document.getElementById('chooseTemplateMenu');
    var templateName = (templateMenu.selectedIndex>=0) ? templateMenu.options[templateMenu.selectedIndex].text : '';
    var nameMarkup   = '';
    if(templateName) nameMarkup = "<em>"+templateName+"</em>";
    // update Submit button text
    document.getElementById('chooseTemplateSubmit').innerHTML
        = "Apply "+nameMarkup+" template";
    // build summary
    if(templateMenu.selectedIndex>=0) {
        var templateKey = templateMenu.options[templateMenu.selectedIndex].value;
        document.getElementById('chooseTemplateSummary').innerHTML = buildTemplateSummary( Templates[templateKey] );
    }
    document.getElementById('chooseTemplateSubmit').removeAttribute('disabled');
}
function showTemplate( tLabel, event ) {   console.log(tLabel);

    let rowsHTML = ['','<colgroup><col /><col style="width:30px;text-align:center" /><col style="width:25px;text-align:left" /></colgroup>'];
    rowsHTML.push('<tbody>');
    let matches = tLabel.match(/(\D+)(\d*)/);
    // let template = ( Templates[matches[1]] ) ? Templates[matches[1]] : ch.templates[matches[1]];
    // let template = ( ch.templates[matches[1]] ) ? ch.templates[matches[1]] : Templates[matches[1]];
    let template = Templates[matches[1]];
    // console.log(template);
    // alert("Templates["+matches[1]+"]:\n\n"+JSONstring.make(template));
    let ch_templateTrait = ch.getTrait(matches[1]);
    // alert(JSONstring.make(ch_templateTrait));
    // alert(ch_templateTrait.finalCost());

    let kind = (template.meta) ? 'Meta-Trait' : 'Template';
    rowsHTML.push('<tr style="background-color:#ccc"> <th colspan="3">'+template.name+' '+kind+' ('+template.value+' points)</th> </tr>');
    if(template.hasOwnProperty('ref')) rowsHTML.push('<tr style="background-color:#ccc;font-size:9px;"><td colspan="3" style="text-align:center;"><i>'+expandMiniref(template.ref)+'</i></td> </tr>');
 //   rowsHTML.push('<tr style="font-style:italic"> <td colspan="2" style="text-align:center">Base cost: '+template.cost+'&ensp;pts</td> <td></td> </tr>');
    for( var sub in template ) {
        // sub will be 'traits', 'skills', etc.
        if( sub.match(/name|key|art|ref|adjust|default/) ) continue;
        if( !template[sub].length ) continue;
        rowsHTML.push('<tr style="background-color:#eee"> <td style="font-style:italic; font-weight:bold">'+sub+':</td> <td></td> <td></td> </tr>');
        let zebra = '';
        for( let i in template[sub] ) {
            let element = template[sub][i];
            if( element.hasOwnProperty('line') ) continue;
   //         alert(sub+' '+element.name+":\n\n"+element.constructor.name);
            let itemCost;
            zebra = ( zebra ) ? '' : 'class="zrow"';
            let pts;
            if( sub.match(/trait/) ) {
                // attribute traits don't render cost correctly (they say 'varies' in the cost param)
                // skip elements that have been edited out of this character's template
                let st = ( ch.hasTrait(element.key) ) ? '' : ' style="color:grey; text-decoration:line-through;"';
                // console.log(element);
                if( !element.hasOwnProperty('finalCost') ) element = cloneTraitFromGenericObject( element );
                let indent = (element.inTemplate && element.inTemplate!=template.key) ? '&emsp;&bull;&emsp;' : '';
                itemCost = (element.templateTrait) ? '' : element.finalCost();
                pts = (element.templateTrait) ? '' : '&nbsp;pt'+es( itemCost );
                let mt = (element.templateTrait) ? ' meta-trait (<i>'+element.finalCost()+' pt'+es(element.finalCost())+'</i>):' : '';
                rowsHTML.push('<tr '+zebra+st+'> <td>&emsp;'+indent+element.print({hidechev:true})+mt+'</td> <th style="text-align:right">'+itemCost+'</th> <th>'+pts+'</th> </tr>');
            }
            else if( sub=='skills' ) {
                if( !element.hasOwnProperty('print') ) element = cloneSkill( element );
                itemCost = element.points;
                s = es( itemCost );
                rowsHTML.push('<tr '+zebra+'> <td>&emsp;'+element.print()+' ('+element.type+'/'+element.diff()+') at '+element.relLevel()+'</td> <td style="text-align:right;font-weight:bold">'+itemCost+'</td> <td style="font-weight:bold">&nbsp;pt'+s+'</td> </tr>');
            }
            else {
            }
        }
    }
    let modsRows = makeModsPopupRows( ch_templateTrait );
    let hasMods = modsRows.length;
    if( hasMods ) {
        rowsHTML.push('<tr> <td style="font-style:italic; font-weight:bold">'+kind+' Modifiers:</td> <td></td> <td></td> </tr>');
    }
    rowsHTML = rowsHTML.concat( modsRows );
    let valPlural = es(template.value);
    rowsHTML.push('<tr style="text-align:right; border-top: 1px solid lightgrey"> <th style="text-align:right">Total cost:</th> <th>'+ch_templateTrait.finalCost()+'</th> <th style="text-align:left">&nbsp;pts</th> </tr>');
    rowsHTML.push('</tbody>');
    displayPopupList( event, rowsHTML.join("\n") );
}
function buildTemplateSummary( TemplateObj ) {
    var attmods = []; var secmods = []; var ads = []; var disads = []; var quirks = []; var features = []; var metatraits = []; var adjustments = [];
    var templateHTML = ['<style> .phrase {white-space:nowrap} </style>'];
    var meta = TemplateObj.hasOwnProperty('meta');
  //  templateHTML.push('<div class="objRow '+Zclass+'" style="padding:5px">');
    templateHTML.push('<div style="margin-bottom:4px;"><b><i style="font-size:1.25em">'+TemplateObj.name+'</i>&emsp;'+((meta) ? 'meta-trait' : 'template' )+'</b><b style="float:right">'+TemplateObj.value+' points</b></div>');
    var costCheck = 0;
    // traits
    for( var t=0; t<TemplateObj.traits.length; t++ ) {
        var Trait = cloneTraitFromGenericObject(TemplateObj.traits[t]);  // console.log(Trait);
        if( Trait.hasOwnProperty('line') ) continue;
        Trait.index = t;		// tells Trait.print(), etc. to treat this Trait like one that has been taken by a character
        let tcost = Trait.finalCost();
        let ttype = Trait.type;
        /* if( (Trait.hasOwnProperty('templateTrait') ) ) console.log("Template trait "+Trait.key+".finalCost = "+tcost); */
        if( Trait.inTemplate ) {
            metatraits.push(Trait);
        }

        else if( Trait.name.match(/^(In|De)creased/) ) {
						if( Trait.name.match(/Strength|Dexterity|Intelligence|Health$/) ) attmods.push(Trait);
						else secmods.push(Trait);
				}
				else if( Trait.name.match(/^Racial.*Modifier/) ) attmods.push(Trait);
				else if( Trait.name.match(/^Size/) ) secmods.push(Trait);
				else if( Trait.name.match(/Will$/) ) secmods.push(Trait);
        else if( tcost==0 ) features.push(Trait);
        else if( ttype.match(/[A]/i) && ttype.match(/[D]/i) && Trait.hasOwnProperty('levels') ) {
            if( tcost<0 ) disads.push(Trait);
            else ads.push(Trait);
        }
        else if( ttype.match(/[AP]/i) ) {
            ads.push(Trait);
        }
        else if( ttype.match(/Q/i) ) quirks.push(Trait);
        else {    // these traits will mostly be disads, but as written this will also catch types U, H, and S (except that types H and S are filtered above)
            disads.push(Trait);
        }
    }
    if( attmods.length ) {
        templateHTML.push('<i><b>Attribute Modifiers:</b></i>&ensp;');
        var attmodstext = [];
        for( var a=0; a<attmods.length; a++ ) {
            var attModObj = attmods[a];
            //console.log(attModObj.key);
            let matched = attModObj.key.match(/(Increased|Decreased|Racial)(.{2})/);
            //console.log(matched);
            var levs = signed(attModObj.levels);
            if(attModObj.key.match(/Decreased/i)) levs = '-'+attModObj.levels;
            var attModStr = matched[2]+levs;
            //console.log(attModStr);
            attmodstext.push('<span class="phrase">'+attModStr+' ['+attModObj.finalCost()+']</span>');
            costCheck += (attModObj.hasOwnProperty('templateTrait')) ? 0 : attModObj.finalCost();
        }
        templateHTML.push(attmodstext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    console.log("[buildTemplateSummary] after attributes, costcheck="+costCheck);
    if( secmods.length ) {
        templateHTML.push('<i><b>Secondary Characteristic Modifiers:</b></i>&ensp;');
        var secmodstext = [];
        for( var a=0; a<secmods.length; a++ ) {
            var secModObj = secmods[a];
            // console.log(secModObj.key);
            let matched = secModObj.key.match(/(Strong|Weak)(.{4})/)
            						|| secModObj.key.match(/(Increased|Decreased|Racial)(.{3})/)
            						|| secModObj.key.match(/(Increased|Decreased)(.{2})/);
            // console.log(matched);
            var levs = signed(secModObj.levels);
            if(secModObj.key.match(/Weak/i)) levs = '-'+secModObj.levels;
            var secModStr = (matched) ? matched[2]+levs : secModObj.print();
            secmodstext.push('<span class="phrase">'+secModStr+' ['+secModObj.finalCost()+']</span>');
            costCheck += (secModObj.hasOwnProperty('templateTrait')) ? 0 : secModObj.finalCost();
        }
        templateHTML.push(secmodstext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    console.log("[buildTemplateSummary] after secondaries, costcheck="+costCheck);
    if( ads.length ) {
        templateHTML.push('<i><b>Advantages:</b></i>&ensp;');
        var adstext = [];
        for( var a=0; a<ads.length; a++ ) {
            var AdObj = ads[a];
            // console.log(TemplateObj.name+' Template '+AdObj.name+' cloned');
            if(AdObj.key.match(/bonus/i)) break;   // This 'fake' Trait is never printed in a Template or Meta-Trait description in a GURPS publication as an *advantage*.  Instead, they are shown under a "Racial Skill Modifiers" heading.
            adstext.push('<span class="phrase">'+AdObj.print({hidechev:true})+' ['+AdObj.finalCost()+']</span>');
            costCheck += (AdObj.hasOwnProperty('templateTrait')) ? 0 : AdObj.finalCost();
        }
        templateHTML.push(adstext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    console.log("[buildTemplateSummary] after advantages, costcheck="+costCheck);
    if( disads.length ) {
        templateHTML.push('<i><b>Disadvantages:</b></i>&ensp;');
        var disadstext = [];
        for( var a=0; a<disads.length; a++ ) {
            var disadObj = disads[a];
            // console.log(disadObj);
            disadstext.push('<span class="phrase">'+disadObj.print({hidechev:true})+' ['+disadObj.finalCost()+']</span>');
            costCheck += (disadObj.hasOwnProperty('templateTrait')) ? 0 : disadObj.finalCost();
        }
        templateHTML.push(disadstext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    console.log("[buildTemplateSummary] after disads, costcheck="+costCheck);
    if( quirks.length ) {
        templateHTML.push('<i><b>Quirks:</b></i>&ensp;');
        var quirkstext = [];
        for( var a=0; a<quirks.length; a++ ) {
            var quirkObj = quirks[a];
            quirkstext.push('<span class="phrase">'+quirkObj.print()+' ['+quirkObj.finalCost()+']</span>');
            costCheck += (quirkObj.hasOwnProperty('templateTrait')) ? 0 : quirkObj.finalCost();
        }
        templateHTML.push(quirkstext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    console.log("[buildTemplateSummary] after quirks, costcheck="+costCheck);
    if( features.length ) {
        templateHTML.push('<i><b>Features:</b></i>&ensp;');
        var featurestext = [];
        for( var a=0; a<features.length; a++ ) {
            var featureObj = features[a];
            featurestext.push('<span class="phrase">'+featureObj.print()+'</span>');
        }
        templateHTML.push(featurestext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    console.log("[buildTemplateSummary] after features, costcheck="+costCheck);
    if( metatraits.length ) {
        templateHTML.push('<i><b>Meta-Traits:</b></i>&ensp;');
        var metatraitsHash = {};
        for( var mt=0; mt<metatraits.length; mt++ ) {
            var MetaTraitObj = metatraits[mt];
            if( MetaTraitObj.hasOwnProperty('templateTrait') ) {
                if( !metatraitsHash[MetaTraitObj.key] ) metatraitsHash[MetaTraitObj.key] = { metatrait: MetaTraitObj, subtraitnames: [] };
            }
            else {
                // var subtraitObj = {name: MetaTraitObj.name,cost:MetaTraitObj.cost};
                // if( metatraitsHash[MetaTraitObj.inTemplate] ) metatraitsHash[MetaTraitObj.inTemplate].push(subtraitObj);
                // else metatraitsHash[MetaTraitObj.inTemplate] = [subtraitObj];
                var subtraitname = MetaTraitObj.name;
                if( metatraitsHash[MetaTraitObj.inTemplate] ) metatraitsHash[MetaTraitObj.inTemplate].subtraitnames.push(subtraitname);
                else metatraitsHash[MetaTraitObj.inTemplate] = { metatrait: MetaTraitObj, subtraitnames: [subtraitname] };
            }
            costCheck += (MetaTraitObj.hasOwnProperty('templateTrait')) ? 0 : MetaTraitObj.finalCost();
        }
        var metatraitstext = [];
        for( let mtKey in metatraitsHash ) {      // console.log(metatraitsHash[mtKey]);
            metatraitstext.push('<span class="phrase">'+metatraitsHash[mtKey].metatrait.name+' ['+metatraitsHash[mtKey].metatrait.cost+']</span> (<span class="phrase">'+metatraitsHash[mtKey].subtraitnames.join('</span>, <span class="phrase">')+'</span>)');
        }
        templateHTML.push(metatraitstext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    console.log("[buildTemplateSummary] after metatraits, costcheck="+costCheck);
    if( TemplateObj.adjustments && TemplateObj.adjustments.length ) {
        templateHTML.push('<i><b>Racial Skill Modifiers:</b></i>&ensp;');      // what other kinds might there be?  how would I sort them above?
        var adjustmentstext = [];
        // problem: one-to-many relationship btw traits and adjustments
        // need to collect these in a hash, perhaps, and print them outside loop
        var modsHash = {};
        for( var aj=0; aj<TemplateObj.adjustments.length; aj++ ) {
            var adjustmentObj = TemplateObj.adjustments[aj];
            // { from: 'Thanatologyskillbonus', fromCategory: 'AD', amount: 1, targetCategory: 'SK', target: 'Thanatology' }
            // get the adjustmentObj.from and look through the TemplateObj.traits array for matches
            var fromTraitKey = adjustmentObj.from;
            var FromTrait;
            var fromtraitpoints;
            // console.log(TemplateObj.traits);
            for( let ti=0; ti<TemplateObj.traits.length; ti++ ) {
                var Trait = TemplateObj.traits[ti];
                // console.log('does '+Trait.key+'=='+fromTraitKey+'?')
                if( Trait.key==fromTraitKey ) {
                    FromTrait = Trait;
                    fromtraitpoints = ( FromTrait.levels ) ? FromTrait.levels*FromTrait.cost : FromTrait.cost;
                    var modAmount = ( FromTrait.levels ) ? FromTrait.levels*adjustmentObj.amount : adjustmentObj.amount;
                    // don't increment costCheck here; it was already incremented for the FromTrait in the first partitioning loop over TemplateObj.traits
                    // console.log('calculating points: '+FromTrait.levels+'*'+FromTrait.cost);
                   // adjustmentstext.push(signed(modAmount)+' to '+adjustmentObj.target+' ['+fromtraitpoints+']');
                    if( !modsHash[fromTraitKey] ) modsHash[fromTraitKey] = { modstring: [], amount: fromtraitpoints };
                    let whatsmodified = GroupNames[ adjustmentObj.target ] || adjustmentObj.target;
                    modsHash[fromTraitKey].modstring.push( signed(modAmount)+' to '+whatsmodified );
                    break;
                }
            }
        }
        for( var key in modsHash ) {
            adjustmentstext.push(modsHash[key].modstring.join(', ')+' ['+modsHash[key].amount+']');
        }
        templateHTML.push(adjustmentstext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    // skills
    if( TemplateObj.skills && TemplateObj.skills.length ) {
        templateHTML.push('<i><b>Skills/Spells:</b></i>&ensp;');
        var skillstext = [];
        for( var a=0; a<TemplateObj.skills.length; a++ ) {
            var skillObj = cloneSkill(TemplateObj.skills[a],false );
            costCheck += skillObj.points;
            var relLvl = skillObj.relLevelNaive(skillObj.points);
            var relLvlTxt = (relLvl==0) ? '' : signed(relLvl);
            skillstext.push( '<span class="phrase">'+skillObj.print()+' ('+skillObj.type+'/'+skillObj.diff()+') at '+skillObj.attribute+relLvlTxt+' ['+skillObj.points+']</span>' );
        }
        templateHTML.push(skillstext.join('; ')+'.');
        templateHTML.push('<br />');
    }
    console.log("[buildTemplateSummary] after skills, costcheck="+costCheck);
    var tref = '';
    if(TemplateObj.ref) {
         tref = expandMiniref( TemplateObj.ref );
    }
    else {
         tref = '<span style="color:red;">no reference</span>';
        // flagTemplates = true;
    }
    templateHTML.push('<div style="text-align:right;"><i>'+tref+'</i></div>');

    if( costCheck != TemplateObj.value ) {
        templateHTML.push('<span style="color:orangered;">Point tally ['+costCheck+'] does not match value ['+TemplateObj.value+'] given for Template.</span>');
        flagTemplates = true;
    }
    templateHTML.push('</div>');
    return templateHTML.join("\n");
}
function applyTemplate( templateOrID, character ) {
    if( !templateOrID ) return false;
    // templateOrID may be a template (JSON) object (from Save As Template via createTemplate function) or an existing template ID (from Use a Template dialog submit)
    var template = ( templateOrID.hasOwnProperty('name') ) ? templateOrID : Templates[templateOrID];
    // console.log(template);
    let templateTraitType = (template.value>0) ? 'A' : 'D';
    var templateTrait = new Trait( template.name, templateTraitType, 'P', template.value, false, template.ref );
    templateTrait.templateTrait = true;
    templateTrait.key = template.key;
    if( template.hasOwnProperty('multiple') ) templateTrait.multiple = true;
    var ch = ( character ) ? character : document.loadedCharacter;
    ch.traits.push( templateTrait );
    if(  template.art && ch.description.artPath.match(/\.\.\/images/i) ) {
        if( ch.description.gender != 'male' && template.artX ) ch.description.artPath = template.artX;
        else ch.description.artPath = template.art;
    }
    if( !template.meta ) ch.description.race = template.name;
    for( var grp in template ) {
        var propList = template[grp];
        for( var n=0; n<propList.length; n++ ) {
            var prop = propList[n];
            // make a clone of the property, add template attributes, and attach it to loadedCharacter
            if( grp=='traits' ) {
                var clonedTrait = cloneTraitFromGenericObject( prop );
                if( !clonedTrait.inTemplate ) clonedTrait.inTemplate = template.key;
              //  alert(JSONstring.make(clonedTrait));
                ch[grp].push( clonedTrait );
            }
            else if( grp=='skills' ) {
                // console.log("[applyTemplate] about to clone\n"); console.log(prop);
                var clonedSkill = cloneSkill( prop );
                if( !clonedSkill.inTemplate ) clonedSkill.inTemplate = template.key;
                //  alert(JSONstring.make(clonedSkill));
                // console.log("[applyTemplate] cloned skill:\n"); console.log(clonedSkill);
                ch[grp].push( clonedSkill );
            }
            else if( grp=='metatraits' ) {
                // recursive call to applyTemplate?  what would I *want* this branch to do?
                // not sure a 'metatraits' property is needed at the Template JSON object level;
                // by the time the JSON object is instantiated, any meta-traits should already have
                // been spun out as a set of traits with 'templateTrait' or 'inTemplate' properties
                /* Hm.
                    This function (applyTemplate) is also the one called if the Template object
                    has just been instantiated from a library.  The library "code" is directly
                    translated into a javascript object; this code is the next thing to touch it.
                    So it seems likely that putting meta-traits into a special bin (here.metatraits)
                    and then processing these either recursively or more directly (as some
                    assumptions can be made, such as the assumption that only prop.traits needs to
                    be handled) may be required.
                */
                // var MetaTrait = applyTemplate( prop, ch );
//                 var MetaTrait = prop;           // rename prop Template object for clarity
//                 // add a templateTrait trait?  YES
//                 var metatraittrait = new Trait( MetaTrait.name, 'A', 'P', MetaTrait.value, false, template.ref );
//                 metatraittrait.templateTrait = true;
//                 metatraittrait.inTemplate = template.key;
//                 metatraittrait.key = MetaTrait.key;
//                 ch.traits.push( metatraittrait );
//                 for( var st=0; st<MetaTrait.traits.length; st++ ) {
//                     var clonedSubTrait = cloneTraitFromGenericObject( MetaTrait.traits[st] );
//                     clonedSubTrait.inTemplate = MetaTrait.key;
//                     console.log(clonedSubTrait);
//                     ch.traits.push( clonedSubTrait );
//                 }
            }
            else if( grp.match(/weapon|equip/) ) {
                console.log("attaching template equipment");
                prop.inTemplate = template.key;
                ch[grp][n] = prop;    // these are currently implemented as sub-objects, rather than lists
                // need to add equipment to default collection
                // first, push 'wield' for weapons, 'wear' for armor, 'ready' for shields, and DON'T PUSH ANYTHING for basic equipment
                let ww = '';
                if( prop.wieldOptions ) ww = 'wield';
                if( prop.location ) ww = 'wear';
                if( prop.PDB ) ww = 'ready';
                if( ww ) ch.collections.default.push( ww );
                if( grp.match(/weapon/i) ) {  // then if it's a weapon,
                    // grab the first wield option key and push that
                    ch.collections.default.push( Object.keys( prop.wieldOptions )[0] );
                }
                // then push the item
                ch.collections.default.push(prop);
                /* ch.collections.default should look like
                    "default collection",
                    "wield",
                    "<skillname, i.e., wieldOptions array key 0>",
                    "<weaponObj>",
                    "wear",
                    "<armorObj>",
                    "<equipObj>",
                */
            }
            else if( !grp.match(/name|value|art|ref|key/) ) {
                // this attaches these properties to one of the linker-object-corresponding sub-objects in the Character object
                // e.g., Character.templates or Character.adjustments
                console.log("[applyTemplate] trying to apply a "+grp);
                prop.inTemplate = template.key;
                ch[grp][n] = prop;    // these are currently implemented as sub-objects, rather than lists
            }
        }
    }
    ch.templates[template.key] = template;    // NOT not necessary!  Required when Template is from a supplemental library.
    // console.log(ch);
    loadCharacter( ch, "Apply Template" );
}
// These go with the 'Save As Template' menu command
function saveAsTemplateDialog() {
    // pre-populate the 'templateName' field with the name from the character sheet
    var name = document.loadedCharacter.description.name;
    document.getElementById('templateName').value = name;
    document.getElementById('newTemplateName').innerHTML = name;
    // display the dialog
    document.getElementById('saveAsTemplateDialog').style.display='block';
}
function createTemplate() {

    /* create template from loadedCharacter */
    // process all attributes, traits, and skills to create a generic template object
    // (tally a total point value as you go along)

    var ch = document.loadedCharacter;

    var template = {};
    template.name = document.getElementById('templateName').value;

    var tptVal = 0;
    var multComp = true;
    // process attributes
    for( var att in ch.attributePoints ) {
        var attPts = ch.attributePoints[att];
        if( attPts==0 ) { continue; }
        tptVal += 1*attPts;
        // console.log("[createTemplate] "+attPts+" points for "+att+" attribute: "+tptVal);
        // build the key/name for the appropriate attribute-modifying trait, and calculate the right level for that trait
        var traitKeyString = '';
        var traitLevels = 0;
        if( ch.gameInfo.ruleset.match(/e3/) ) {
            // note that under e3 rules, only ST|DX|IQ|HT may have non-zero points
            traitKeyString = 'Racial'+att+'Modifier';
            traitLevels = attributePtsToLevelPre4e( attPts ) - 10;    /* removed Math.abs( ) wrapper - why was it there?  Can't use it because attribute mods will quite often be negative. */
            if( att.match(/ST/) ) {   // apply the 'Enhanced ST' rules from Compendium I, pg. 8
                // evaluate level
                var STlevels = STptsToLevelPre4e( attPts );
                traitLevels = STlevels - 10;
                if( STlevels>15 ) {
                    traitKeyString = 'EnhancedST';
                    // append to trait key, scale traitLevels
                    if( STlevels>30 ) {
                        traitKeyString += '31plus';
                        traitLevels = STlevels - 30;
                    }
                    else if( STlevels>23 ) {
                        traitKeyString += '24_30';
                        traitLevels = STlevels - 23;
                    }
                    else {
                        traitKeyString += '16_23';
                        traitLevels = STlevels - 15;
                    }
                }
            }
            // otherwise proceed with traitKeyString = 'RacialDXModifier', or similar
        }
        else {
            var direction = (attPts>0) ? 'Increased' : 'Decreased';
            var ptDivisor = ( att.match(/DX|IQ/) ) ? 20 : 5;  // 'default' of 5 catches Per, Speed, Move, Will
            traitKeyString = direction;
            if( att.match(/ST|DX|IQ|HT|Per|Speed|Move|Will/) ) {
                if( att.match(/ST|HT/) ) ptDivisor = 10;
                if( att.match(/Move/) ) traitKeyString += 'Basic';
                traitKeyString += att;
            }
            if( att.match(/Will/) ) {
                traitKeyString = (attPts>0) ? 'StrongWill' : 'WeakWill';
            }
            if( att.match(/FP/) ) {
                ptDivisor = 3;
                traitKeyString += att;
            }
            if( att.match(/HP/) ) {
                ptDivisor = 2;
                traitKeyString += att;
            }
            // should deal with Tech Level here now, too
            traitLevels = Math.abs( Math.floor( attPts/ptDivisor ) );
        }
        // define attribute modifying trait
        //console.log('cloning '+traitKeyString);
        var attTrait = Traits[traitKeyString].clone();
        attTrait.levels = traitLevels;
        // attach trait to the template
        if( !template.hasOwnProperty('traits') ) { template.traits = []; }
        template.traits.push( attTrait );
        //console.log("Adding attribute trait:\n\n"+JSONstring.make(attTrait)+"\n\ntemplate point value changed by "+attPts+" to "+tptVal);
    }

    // process traits
    for( var att in ch.traits ) {
        /*  This branch correctly handles meta-traits that are part of a JCSP "template" file.
            Any meta-traits there exist as a set of basic Trait objects with special property
            attributes (Trait.templateTrait and Trait.inTemplate).  These just get passed into
            the Template.traits array, and it just works.
            No need for a separate meta-traits branch. */
        if( !template.hasOwnProperty('traits') ) { template.traits = []; }
        var TraitTrait = cloneTraitFromGenericObject( ch.traits[att] );
        if( TraitTrait.type && !TraitTrait.key ) TraitTrait.key = TraitTrait.type+att;
        tptVal += ( TraitTrait.inTemplate ) ? 0 : TraitTrait.finalCost();   // don't count template or meta-trait sub-trait values (we're counting the templateTrait instead)
//         if( TraitTrait.templateTrait ) console.log("[createTemplate] "+TraitTrait.finalCost()+" points for "+TraitTrait.name+" trait: "+tptVal);
//         else if( TraitTrait.inTemplate ) console.log("[createTemplate] "+TraitTrait.finalCost()+" points for "+TraitTrait.name+" trait counted as part of "+Templates[TraitTrait.inTemplate].name);
//         else console.log("[createTemplate] "+TraitTrait.finalCost()+" points for "+TraitTrait.name+" trait: "+tptVal);
        if( !TraitTrait.hasOwnProperty('multiple') ) multComp = false;
        template.traits.push( TraitTrait );
        //console.log("Adding trait:\n\n"+JSONstring.make(TraitTrait)+"\n\ntemplate point value changed by "+TraitTrait.finalCost()+" to "+tptVal);
    }

    // process skills (includes spells)
    for( var att in ch.skills ) {
        if( !template.hasOwnProperty('skills') ) { template.skills = []; }
        var skill = ch.skills[att].clone();
        tptVal += skill.points;
        // console.log("[createTemplate] "+skill.points+" points for "+skill.name+" skill: "+tptVal);
        template.skills.push( skill );
      // alert("Adding skill:\n\n"+JSONstring.make(skill)+"\n\ntemplate point value changed by "+skill.points+" to "+tptVal);
    }

    // process linker properties
    for( var lt=0; lt<linkerProps.length; lt++ ) {
        var linkerPropType = linkerProps[lt]+'s';
 //       alert(linkerPropType);
        for( const prop in ch[linkerPropType] ) {
            if( !template.hasOwnProperty(linkerPropType) ) { template[linkerPropType] = {}; }
            template[linkerPropType][prop] = ch[linkerPropType][prop];
        }
    }

    // attach properties
    template.value = tptVal;
    template.art   = ch.description.artPath;
    template.key   = template.name.replace(/\W/g,'');
//    if( multComp ) template.multiple = 1;
  //  alert(JSONstring.make(template));

    /* deal with new template as requested by user */
    var saveOpt = getCheckedValue( document.getElementById('saveAsTemplateForm').templateSaveOption );
    if( saveOpt=='apply' ) {
        // create a new clean character object (do this using the New Character d-box instead?)
        var newCh = new Character( 'New Character', 100, ch.gameInfo.ruleset );
        // attach the template to the new character object
        // (necessary for variations from template to be accounted properly; this template won't exist anywhere else for comparison)
        newCh.templates[template.key] = template;
   //     alert("attached template as '"+template.key+"' to new Character object:\n\n"+JSONstring.make(newCh));
        // after attaching the template, load this character
        // clear 'undo' queue?
        loadCharacter( newCh );
        // only now can we *apply* the template to the new character
        applyTemplate( template );
    }
    else if( saveOpt=='offer' ) {
        Templates[template.key] = template;
    }
    else if( saveOpt=='export' ) {
    	//	alert( JSONstring.make( template ) );
    		simulate(document.getElementById('SaveAsFileLink'),'click');
    }
    else {}

    // hide the saveAsTemplateDialog
    document.getElementById('saveAsTemplateDialog').style.display = 'none';

}


// Equipment, Weapons, & Armor
function selectEquipmentDialog( sortKey ) {
		var ch = document.loadedCharacter;

    if( !sortKey ) sortKey = document.getElementById('selectEquipmentSort').value;
    if( !sortKey ) sortKey = 'name';

    // blank all supplementary input divs (so previously-written contents don't persist)
    document.getElementById('displayEquipmentWeight').innerHTML = '';
    document.getElementById('displayEquipmentCost').innerHTML = '';
    document.getElementById('selectEquipmentAmount').value = 1;
    $('.customEquipmentUnitsCell').prop('disabled',false);

    // filtering
    var showAllTLs = document.selectEquipmentForm.allTLCheckbox.checked;
    var coreFilter = document.selectEquipmentForm.coreRulesCheckbox.checked;

    if( ch.gameInfo.ruleset.match(/e4/) ) { $('#equipmentCoreRulesFilterRow').hide(); }

    var equipmentItems  = [];
    for( var memberKey in BasicEquipment ) {
				equipmentItems.push( { key: memberKey, value: BasicEquipment[memberKey] } );
    }

 //     alert(sortKey);
		equipmentItems.sort(
        function(a,b) {
            if( !a.value[sortKey] ) return 0;
            if( sortKey=='name' ) {   // use name+detail, if detail is available
                var aName = ( a.detail ) ? a.value['name']+a.value['detail'] : a.value['name'];
                var bName = ( b.detail ) ? b.value['name']+b.value['detail'] : b.value['name'];
                if( aName.toLowerCase() < bName.toLowerCase() ) return -1;
                if( aName.toLowerCase() > bName.toLowerCase() ) return  1;
                return 0;
            }
            else if( isNaN(a.value[sortKey]) ) {
                if( a.value[sortKey].toLowerCase() < b.value[sortKey].toLowerCase() ) return -1;
                if( a.value[sortKey].toLowerCase() > b.value[sortKey].toLowerCase() ) return  1;
                return 0;
            }
            else { return a.value[sortKey] - b.value[sortKey]; }
        }
    );

    // loop over (filtered) items in the Equipment object to fill menu options
    var selectEquipmentMenuOptionsHTML = [''];
    var savedVal;
    for( var n in equipmentItems ) {
        var memberKey = equipmentItems[n].key;
        var member = equipmentItems[n].value;
        if( member.name ) {  // filter out non-Equipment attributes of the BasicEquipment object
            // Core Rules filter
            console.log(member);
            if( coreFilter && !member.reference.match(/B/) ) { continue; }
            // filter Tech Levels
            if( !showAllTLs && member.TL > ch.gameInfo.TL ) { continue; }
            // put in an optgroup divider, for certain sort keys (large categories)
            var skVal  = member[sortKey];
            if( sortKey.match(/TL|LC/) && skVal!=savedVal ) {
                if(n!=0) selectEquipmentMenuOptionsHTML.push('          </optgroup>');
                selectEquipmentMenuOptionsHTML.push('          <optgroup label="'+skVal+'">');
            }
            let labelAfter  = ( member.detail ) ? ', '+member.detail : '';
            let labelBefore = ( member.detail ) ? member.detail+' '  : '';
            let itemDesc = ( member.description ) ? ' ('+member.description+')'  : '';
            let ref = member.reference;
            let title = ( ref ) ? expandMiniref( ref, true ) : 'ref for '+member.name;
            selectEquipmentMenuOptionsHTML.push('            <option value="'+memberKey+'" title="'+title+'">'+labelBefore+member.name+itemDesc+'</option>');
        }
        savedVal = skVal;
    }
    if( sortKey.match(/TL|LC/) ) {
        selectEquipmentMenuOptionsHTML.push('          </optgroup>');
    }
    selectEquipmentMenuOptionsHTML.push('        ');
    document.getElementById('selectEquipmentMenu').innerHTML = selectEquipmentMenuOptionsHTML.join("\n");
    var indent = '                  ';
    document.getElementById('customEquipmentItemTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsCompactList ).join("\n  "+indent)+"\n"+indent;
    document.getElementById('customEquipmentItemLC').innerHTML
        = makeSelectListOptions( LegalityClassOptionsList ).join("\n  "+indent)+"\n"+indent;
    // document.getElementById('selectEquipmentSubmit').value = 'take this item';
    // document.getElementById('selectEquipmentSubmit').disabled = 'disabled';
    setupDialog('selectEquipmentDialog');
    return false;
}
function showEquipmentInfoInDialog( itemName ) {
    // localize the Equipment member attributes
    //var eqItem = BasicEquipment[itemName];
    var eqItem = (itemName) ? BasicEquipment[itemName] : BasicEquipment[$('#selectEquipmentMenu').val()];
   // alert(JSONstring.make(eqItem));
    var name   = eqItem.name;
    var weight = eqItem.weight;
    var cost   = eqItem.cost;
    var TL     = eqItem.TL;
    var LC     = eqItem.LC;
    var indent = '                  ';
    // convert weight if prefs indicate
    var ch = document.loadedCharacter;
    var unit = 'lb';
    var unitPref = ch.preferences.units.measure;
    //  weight = ( unitPref.match(/mks/i) ) ?  convertWeight( 10*weight, unitPref )/10 : 10*convertWeight( weight/10, unitPref );
    //	console.log("[showEquipmentInfoInDialog] converted weight: "+convertWeight( weight, unitPref ))
  	if( !unitPref.match(/english/i) )
    		weight = roundToSigFigs( convertWeight( weight, unitPref ), 3 );
    if( unitPref.match(/mks/i) ) { unit = 'kg'; }
    if( unitPref.match(/cgs/i) ) { unit = 'gram'; }
    // populate the appropriate divs
    if(eqItem.continuous) {
        $('.customEquipmentUnitsCell').prop('disabled',false);
        $('#customEquipmentContinuous').prop( "checked", true );
        $('#customEquipmentItemUnit').val(eqItem.unit);
    }
    else {
        $('.customEquipmentUnitsCell').prop('disabled',true);
        $('#customEquipmentContinuous').prop( "checked", false );
        $('#customEquipmentItemUnit').val('');
    }
    let unitName = ( nameForUnit[eqItem.unit] ) ? nameForUnit[eqItem.unit] : eqItem.unit;
    var per = (eqItem.continuous) ? ' per '+unitName : '';
    var numUnits = $('#selectEquipmentAmount').val();
    if( parseInt(numUnits)!=numUnits && !eqItem.continuous ) { alert('"How many" must be an integer for this item.'); $('#selectEquipmentAmount').val(1); return; }
    var unitText = (eqItem.unit) ? plural(unitName,numUnits) : '';
    document.getElementById('displayContinuousEquipmentUnits').innerHTML = '&nbsp;'+unitText;
    let displayWt = ( ch.preferences.display.fractions ) ? makeHTMLfraction(weight*numUnits) : Math.round(weight*numUnits*100)/100;
    document.getElementById('displayEquipmentWeight').innerHTML = displayWt+' '+unit+es(weight*numUnits)/*+per*/;
    var costStr = ( Math.trunc(cost)==cost ) ? cost*numUnits : Number(Math.round(cost*numUnits+'e2')+'e-2').toFixed(2);
    document.getElementById('displayEquipmentCost').innerHTML = '$'+costStr;
    document.getElementById('customEquipmentItemUnit').value =  (eqItem.unit) ? eqItem.unit : '';
    // echo stats in custom form
    document.getElementById('customEquipmentItemName').value = name;
    document.getElementById('customEquipmentItemDetail').value = (eqItem.detail) ? eqItem.detail : '';
    document.getElementById('customEquipmentItemCost').value = cost;
    document.getElementById('customEquipmentItemWeight').value = weight;
    if(eqItem.description) document.getElementById('customEquipmentItemDescription').value = eqItem.description;
    else document.getElementById('customEquipmentItemDescription').value = '';
    document.getElementById('customEquipmentItemTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsCompactList, TL ).join("\n  "+indent)+"\n"+indent;
    document.getElementById('customEquipmentItemLC').innerHTML
        = makeSelectListOptions( LegalityClassOptionsList, LC ).join("\n  "+indent)+"\n"+indent;
//     console.log(eqItem.name)
//     console.log(eqItem.notes)
//     console.log(!(eqItem.notes))
//     console.log( (eqItem.notes) ? eqItem.notes.join("\n") : '');
    document.getElementById('customEquipmentItemNotes').value = (eqItem.notes) ? eqItem.notes.join("\n") : '';
    // personalize and activate the Submit button
    var truncName = ( name.length>25 ) ? name.substr(0,22)+'&hellip;' : name;
    var buttonLabel = ( unitText )
                    ? numUnits+' '+unitText+' of '+truncName
                    : ( ( numUnits>1 ) ? numUnits+' '+plural(truncName,numUnits) : plural(truncName,numUnits) );
    document.getElementById('selectEquipmentSubmit').innerHTML
        = 'take <em id="selectEquipmentSubmitName" style="max-width:15em; text-overflow:ellipsis">'+buttonLabel+'</em>';
    // document.getElementById('selectEquipmentSubmit').disabled = null;
}
function loadBasicEquipmentFromDialog() {
    var ch = document.loadedCharacter;
    // get form inputs
    var itemName =   document.getElementById('selectEquipmentMenu').value;    // = name of item
    var itemNum  = 1*document.getElementById('selectEquipmentAmount').value;
    var itemWeight, itemCost, itemCostAdd, itemTL, itemLC;
    var custom = ( document.getElementById('customEquipmentTable').style.display!='none' ) ? true : false;
    if( custom ) {
        itemName    =   document.getElementById('customEquipmentItemName').value;
        itemDetl    =   document.getElementById('customEquipmentItemDetail').value;
        itemDesc    =   document.getElementById('customEquipmentItemDescription').value;
        itemNotes   =   document.getElementById('customEquipmentItemNotes').value;
        itemWeight  =   document.getElementById('customEquipmentItemWeight').value;
        itemCost    = 1*document.getElementById('customEquipmentItemCost').value;
        itemCostAdd = 1*document.getElementById('customEquipmentItemAddedCost').value;
        itemTL      = 1*document.getElementById('customEquipmentItemTL').value;
        itemLC      = 1*document.getElementById('customEquipmentItemLC').value;
        itemCont    =   document.getElementById('customEquipmentContinuous').checked;
        itemUnit    =   document.getElementById('customEquipmentItemUnit').value;
        // validate weight, and deal with entered fractions
    // console.log(itemWeight);
        var match = itemWeight.match(/^(\d+)\/(\d+)$/);
        if( match ) {
          //  alert('looks like a fraction: '+match[1]+'/'+match[2]);
            itemWeight = match[1]/match[2];
        }
        // adjust weight if prefs are set to a non-English measure system
        var unitsPref = ch.preferences.units.measure;
        if( unitsPref.match(/english/i) ) {
            if( unitsPref.match(/mks/i) ) {
                itemWeight = itemWeight*2.2;
            }
            if( unitsPref.match(/cgs/i) ) {
                itemWeight = itemWeight/454;
            }
        }
    }
    // validate inputs
    if( !itemName )      { alert("Please select an equipment item.");   return false; }
    if( isNaN(itemNum) ) { alert("The 'How many' input must be a number."); return false; }
    if( custom ) {
      // console.log(itemWeight);
        if( isNaN(itemWeight) )  { alert("The weight must be a number."); return false; }
        if( isNaN(itemCost) )    { alert("The cost must be a number."); return false; }
        if( isNaN(itemCostAdd) ) { alert("The added cost must be a number."); return false; }
    }

    // hide the selectEquipmentDialog
    document.getElementById('selectEquipmentDialog').style.display = 'none';

    // instantiate new equipment item using form information
    var newItem;
    if( custom ) {
        newItem = new Equipment( itemName, itemWeight, 1*itemCost, 1*itemTL, 1*itemLC );
        newItem.number = itemNum;
        if( itemDetl )  newItem.detail = itemDetl;
        if( itemDesc )  newItem.description = itemDesc;
        if( itemNotes ) newItem.notes = itemNotes.split("\n");
        if( itemCont )  newItem.continuous = itemCont;
        if( itemUnit )  newItem.unit = itemUnit;
        if( itemCostAdd ) newItem.addedCost = 1*itemCostAdd;
        var keyText = itemName.replace(/[\s\/\W]+/g,'');
        do {
            newItem.key = keyText;
            keyText += '_';
        } while( BasicEquipment[keyText] );
    }
    else {
        // clone the item using the selected item key
        newItem = BasicEquipment[itemName].clone();
        newItem.number = itemNum;
    }
  //  alert(JSONstring.make(newItem));

    // attach to Character
    ch.equipment.push( newItem );
    ch.collections.default.push( newItem );

    // cause character to be reloaded so that the new equipment becomes visible
    loadCharacter( ch, "Add Equipment" );
   // alert('finished reloading character in loadBasicEquipmentFromDialog ');
    selectEquipmentDialog();
    // 'return false' happens in the onclick function
}

function editEquipmentDialog( selectedItemLoadedCollectionIndex, collection ) {
 // alert("[editEquipmentDialog("+selectedItemLoadedCollectionIndex+")] called");
    setupDialog('editEquipmentDialog');
    var ch = document.loadedCharacter;
    var itemLocation;   // itemLocation will be an array
    if( selectedItemLoadedCollectionIndex ) {
        // maybe need to figure out the right default collection index?
        // because this one will be the loaded collection index, if this script was called by a click-to-edit
        var equippedColl = ( collection ) ? collection : ch.collections.equipped;
        var itemInColl   = ch.collections[equippedColl][selectedItemLoadedCollectionIndex];
      //  alert("[editEquipmentDialog] ch.collections["+equippedColl+"]["+selectedItemLoadedCollectionIndex+"]:\n"+JSONstring.make(itemInColl));
        var itemLocation = ch.locateItem( itemInColl );   // itemLocation is an array
        var selectedItemGroup      = itemLocation[0];
        var selectedItemGroupIndex = itemLocation[1];
     //   alert(JSONstring.make(itemLocation));
    }
    else {      // disable the submit button
        document.getElementById('editEquipmentVerb').innerHTML = 'make a selection to edit';
        document.getElementById('editEquipmentShortName').innerHTML = '';
 //       document.getElementById('editEquipmentSubmit').disabled = true;
    }
    // customize form for ruleset
    document.getElementById('editShieldBucklerChoiceCell').style.display = ( ruleset.match(3) ) ? 'none' : 'table-cell';
    document.getElementById('editArmorDialogPDrow').style.display = ( ruleset.match(3) ) ? 'table-row' : 'none';
    document.getElementById(    'editShieldPDB'   ).innerHTML = ( ruleset.match(3) ) ? 'PD' : 'DB';
    document.getElementById(    'editShieldPDB'   ).title = ( ruleset.match(3) ) ? 'Passive Defense' : 'Defense Bonus';
    document.getElementById( 'editShieldPDBlabel' ).title = ( ruleset.match(3) ) ? 'Passive Defense' : 'Defense Bonus';
    document.getElementById( 'editShieldDialogPDB').title = ( ruleset.match(3) ) ? 'Passive Defense' : 'Defense Bonus';
    document.getElementById('editShieldDialogSkill').innerHTML
        = makeSelectListOptions( ShieldSkillsOptionsList ).join("\n                    ")+"\n                  ";
    showEditEquipmentInfoInDialog( itemLocation );
    // adjust form weight units for measure system preference
    var unitsPref = ch.preferences.units.measure;
    var wtUnits = ( unitsPref.match(/cgs/i) )
                ? unitsFor[unitsPref].weight+'ram'+es(totalWeight)
                : unitsFor[unitsPref].weight+es(totalWeight);
  //  console.log('setting Edit Equipment dialog weight unit to '+wtUnits);
    $('#editEquipmentWeightUnit').html( wtUnits );

    var editEquipmentMenuHTML = [];

    // populate select list (this code adapted from loadManageEquipmentCollectionsWindow function)
    var equipmentGroups = ['equipment','weapons'];
    for( var gp in equipmentGroups ) {
		var eGroup = equipmentGroups[gp];
		var itemsInGroup = 0;
		editEquipmentMenuHTML.push('<optgroup label="'+eGroup+'">');
		for( var eIndex in ch[eGroup] ) {
        var item = ch[eGroup][eIndex];
        var eValue = eGroup+'_'+eIndex;
        // alert("comparing eGroup "+eGroup+", eIndex "+eIndex+"\nwith selectedItemGroup "+selectedItemGroup+", selectedItemGroupIndex "+selectedItemGroupIndex);
        var sel = ( selectedItemGroup==eGroup && selectedItemGroupIndex==eIndex )
                ? ' selected="selected"' : '';
        editEquipmentMenuHTML.push('	<option value="'+eValue+'"'+sel+'>'+item.name+'</option>');
        itemsInGroup++;
		}
		if(itemsInGroup) { editEquipmentMenuHTML.push('</optgroup>'); }
		else { editEquipmentMenuHTML.pop(); }
    }
    document.getElementById('editEquipmentMenu').innerHTML
        = "\n            "+editEquipmentMenuHTML.join("\n            ")+"\n          ";
}
function showEditEquipmentInfoInDialog( itemLocation ) {
    // alert(JSONstring.make(itemLocation));
    var ch = document.loadedCharacter;

    document.getElementById('editEquipmentFormTables').style.display = 'none';
    document.getElementById('editArmorTable').style.display = 'none';
    document.getElementById('editArmorCoverageTable').style.display = 'none';
    document.getElementById('editWeaponTable').style.display = 'none';
    document.getElementById('editShieldFormTable').style.display = 'none';

    // get action
    var action = getRadioGroupValue(document.editEquipmentForm['editEquipmentAction']);
    // alert(action);
    if( action==undefined ) {
        //document.getElementById('deleteTraitAction').checked = true;
        action = 'remove';
    }

    if( !itemLocation ) {
        document.getElementById('editEquipmentTable').style.display = 'none';
        //         var eValue = document.getElementById('editEquipmentMenu').value;
        //         if( eValue ) {
        //             itemLocation = eValue.split('_');
        //         }
        //         else { return; }
        return;
    }

    var eItem = ch[itemLocation[0]][itemLocation[1]];
    // alert(JSONstring.make(eItem));

    // create button-friendly version of the trait name
    var shortName = ( eItem.name.length>40 ) ? eItem.name.slice(0,36)+'...' : eItem.name ;
    document.getElementById('editEquipmentShortName').innerHTML = '<i>'+shortName+'</i>';

    //  populate edit fields with current values
    if( action=='edit' )
        document.getElementById('editEquipmentFormTables').style.display = 'table';
    document.getElementById('editEquipmentTable').style.display = 'table';
    document.getElementById('editEquipmentNameText').value = eItem.name;
    document.getElementById('editEquipmentDetailText').value
        = (eItem.detail) ? eItem.detail : '';
    document.getElementById('editEquipmentDescriptionText').value
        = (eItem.description) ? eItem.description : '';
    document.getElementById('editEquipmentNotesText').value
        = (eItem.notes) ? eItem.notes.join("\n") : '';
    var weight = eItem.weight;
    var unitPref = ch.preferences.units.measure;
  //  weight = ( unitPref.match(/mks/i) ) ?  convertWeight( 10*weight, unitPref )/10 : 10*convertWeight( weight/10, unitPref );
  //	console.log("[showEditEquipmentInfoInDialog] converted weight: "+convertWeight( weight, unitPref ))
  	if( !unitPref.match(/english/i) )
    		weight = roundToSigFigs( convertWeight( weight, unitPref ), 3 );
    document.getElementById('editEquipmentWeight'   ).value = weight;
    document.getElementById('editEquipmentCost'     ).value = eItem.cost;
    document.getElementById('editEquipmentAddedCost').value = (eItem.addedCost) ? eItem.addedCost : '';
    document.getElementById('editEquipmentNumber'   ).value = eItem.number;
    document.getElementById('editEquipmentItemUnit' ).value = (eItem.unit) ? eItem.unit : '';
    document.getElementById('editEquipmentContinuity').checked = eItem.continuous;
    document.getElementById('editEquipmentItemTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsList,     eItem.TL ).join("\n                    ")+"\n                  ";
    document.getElementById('editEquipmentItemLC').innerHTML
        = makeSelectListOptions( LegalityClassOptionsList, eItem.LC ).join("\n                    ")+"\n                  ";

    // if item is armor, show and populate armor editing table
    if( eItem.hasOwnProperty('location') ) {
        document.getElementById('editArmorTable').style.display = 'table';
        document.getElementById('editArmorCoverageTable').style.display = 'table';
    }
    document.getElementById('editArmorDialogDR').value = eItem.DR;
    document.getElementById('editArmorDialogPD').value = eItem.PD;
    document.getElementById('editArmorDialogsplitDR').value = (eItem.splitDR) ? eItem.splitDR : '';
    document.getElementById('editArmorDialogsplitPD').value = (eItem.splitPD) ? eItem.splitPD : '';
    document.getElementById('editArmorDialoglayerableCB').checked = (eItem.layerable) ? true : false;
    for( var l in allBodyParts ) {
        var loc = allBodyParts[l];
        document.getElementById('editArmorDialog'+loc+'CB').checked = false;
        document.getElementById('editArmorDialogsuitCB').checked = false;
    }
    for( var l in eItem.location ) {
        var loc = eItem.location[l];
        document.getElementById('editArmorDialog'+loc+'CB').checked = true;
    }
    document.getElementById('editArmorDialogsplitPDcell').style.display = ( eItem.hasOwnProperty('splitPD') ) ? 'table-cell' : 'none';
    document.getElementById('editArmorDialogsplitDRcell').style.display = ( eItem.hasOwnProperty('splitDR') ) ? 'table-cell' : 'none';

    // if item is a weapon, show and populate weapon editing table
    if( eItem.hasOwnProperty('wieldOptions') )
        document.getElementById('editWeaponTable').style.display = 'table';
    // echo stats in custom form
    var wST = ( eItem.weaponST ) ? eItem.weaponST : 'null';
    var wSToptionlist = makeNumberOptionsList( 7, 25, wST, false );
    wSToptionlist.unshift('  <option value="null">N/A</option>');
    wSToptionlist.unshift('');
    wSToptionlist.push('');
    document.getElementById('editWeaponItemST').innerHTML = wSToptionlist.join("\n"+'                    ');
    document.getElementById('editWeaponItemShots').value = eItem.shots || '';
    document.getElementById('editWeaponItemBulk').innerHTML
        = makeNumberOptions( -10, 0, '                    ', eItem.bulk, true );
    document.getElementById('editWeaponItemQualGp').innerHTML
        = makeSelectListOptions( QualityEffectGroupOptionsList, eItem.qualityEffectGroup ).join("\n                    ")+"\n                  ";
    // figure out how to show the ranged weapons row only if there are ranged wield options (set a flag during loop over wieldOptions?)
    // echo wield option values too
    // clear options table
    var indent = '                      ';
    var optionsTableHTML = ['','<tbody>'];
    optionsTableHTML.push('  <tr style="line-height:normal;">');
    optionsTableHTML.push('    <th>&emsp;</th>');
    optionsTableHTML.push('    <th>Skill</th>');
    optionsTableHTML.push('    <th>Attack Mode</th>');
    optionsTableHTML.push('    <th>Hands</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Type</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Base</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Mods</th>');
    optionsTableHTML.push('    <th style="text-align:center">ST</th>');
    optionsTableHTML.push('    <th style="text-align:center">Max Dmg</th>');
    optionsTableHTML.push('    <th style="text-align:center">Note</th>');
    optionsTableHTML.push('    <th style="text-align:center"></th>');
    optionsTableHTML.push('    <th style="text-align:center">Reach</th>');
    optionsTableHTML.push('    <th style="text-align:center">Parry<br />Bonus</th>');
    optionsTableHTML.push('    <th style="text-align:center">ST&rarr;<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">&half; Dmg<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">Max<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">SS</th>');
    optionsTableHTML.push('    <th style="text-align:center">Acc</th>');
    optionsTableHTML.push('    <th style="text-align:center">RoF</th>');
    optionsTableHTML.push('    <th style="text-align:center">Rcl</th>');
    optionsTableHTML.push('  </tr>');
    optionsTableHTML.push('</tbody>');
    optionsTableHTML.push('');
    document.getElementById('editWeaponAttackOptionsTable').innerHTML = optionsTableHTML.join("\n"+indent);
    document.getElementById('editWeaponAttackOptionsTable').style.display = 'block';
    document.getElementById('editWeaponAttackOptionRows').value = 0;
    document.getElementById('editWeaponItemAttackOptionSkillsMenu').innerHTML
        = makeSkillOptionsList( 'Skills', 'name' ).join("\n                      ")+"\n                    ";
    var row = 1;
    for( var optName in eItem.wieldOptions ) {
     // alert('option '+optName+', row: '+row);
        for( var opt=0; opt<eItem.wieldOptions[optName].length; opt++ ) {
            //alert('addNewAttackOptionRow( '+optName+', '+row+', '+eItem.wieldOptions[optName][opt]+", null, edit )");
            addNewAttackOptionRow( optName, row, eItem.wieldOptions[optName][opt], null, 'edit' );
            //alert( document.getElementById('editWeaponAttackOptionsTable').innerHTML );
            row++;
        }
    }

    // if item is a shield, show and populate shield editing table
    if( eItem.hasOwnProperty('PDB') ) {
        document.getElementById('editShieldFormTable').style.display = 'table';
    }
    document.getElementById('editShieldDialogPDB').value = eItem.PDB;
    document.getElementById('editShieldDialogDR').value = eItem.DR;
    document.getElementById('editShieldDialogHP').value = eItem.HP;
    document.getElementById('editShieldDialogSkill').value = eItem.skill;
    if( eItem.composition )
        document.getElementById('editShieldComposition').value = eItem.composition;
    document.getElementById('editShieldBuckler').checked = ( eItem.buckler ) ? true : false;
    var bucklerCB = document.getElementById('editShieldBuckler');

  	//	weapon quality
    // this stuff should move into the weapon conditional above
    if( eItem.hasOwnProperty('quality') ) {
        var indent = '                  ';
        var qualitiesMenuHTML = [""];
        for( var val in qualities ) {
            var qual = qualities[val];
            var sel  = (val==eItem.quality) ? ' selected="selected"' : '';
        if( val>2 && eItem.qualityEffectGroup && !eItem.qualityEffectGroup.match(/edge|blade/) ) continue;
            qualitiesMenuHTML.push('  <option value="'+val+'"'+sel+'>'+qual+'</option>');
        }
        document.getElementById('editEquipmentQualityLevel').innerHTML
            = indent + qualitiesMenuHTML.join("\n"+indent) + "\n"+indent;
        document.getElementById('editEquipmentQualityTD').style.display = 'table-cell';
        document.getElementById('editEquipmentQualityLabelTD').style.display = 'table-cell';
    }
    // if I offer this, I will need to use the cloneWeaponWithQuality(?) function to alter cost and damage

    // rewrite Submit button text
    document.getElementById('editEquipmentVerb').innerHTML = action;
    document.getElementById('editEquipmentSubmit').disabled = null;

}
function editEquipment() {

    var ch = document.loadedCharacter;

		// get item selected in menu
		var itemIndex = document.getElementById('editEquipmentMenu').value;
		var a = itemIndex.split('_');
		var eItemGroup = a[0];
		var eItemIndex = a[1];
		var eItem = ch[eItemGroup][eItemIndex];
	//	alert(JSONstring.make(eItem));
	  // console.log(eItem);

    // get action
    var action = getRadioGroupValue(document.editEquipmentForm['editEquipmentAction']);

    // do action
    if( action=='remove' ) {
        if( !confirm("Remove '"+eItem.name+"' from possessions?\n(Item will be deleted from ALL collections.)") ) return;
        ch.removeItem(eItem);
    }
    else {
        // collect, validate, update eItem for basic equipment form entries
        var newName   = document.getElementById('editEquipmentNameText').value;
        var newWeight = document.getElementById('editEquipmentWeight').value;
        var newCost   = document.getElementById('editEquipmentCost').value;
        var newCostAdd= document.getElementById('editEquipmentAddedCost').value;
        var newNumber = document.getElementById('editEquipmentNumber').value;
        var newDesc   = document.getElementById('editEquipmentDescriptionText').value;
        var newNotes  = document.getElementById('editEquipmentNotesText').value;
        var newDetl   = document.getElementById('editEquipmentDetailText').value;
        var newUnit   = document.getElementById('editEquipmentItemUnit').value;
        var newCont   = document.getElementById('editEquipmentContinuity').checked;
        var newTL     = document.getElementById('editEquipmentItemTL').value;
        var newLC     = document.getElementById('editEquipmentItemLC').value;
        // validate weight, and deal with entered fractions
        var match = newWeight.match(/^(\d+)\/(\d+)$/);
        if( match ) {
          //  alert('looks like a fraction: '+match[1]+'/'+match[2]);
            newWeight = match[1]/match[2];
        }
        // adjust weight if prefs are set to a non-English measure system
        var unitsPref = ch.preferences.units.measure;
        if( unitsPref.match(/english/i) ) {
            if( unitsPref.match(/mks/i) ) {
                newWeight = newWeight*2.2;
            }
            if( unitsPref.match(/cgs/i) ) {
                newWeight = newWeight/454;
            }
        }
        if( isNaN(newWeight) )  { alert("'"+newWeight +"' is not a valid weight (must be a number)."); return; }
        if( isNaN(newCost) )    { alert("'"+newCost   +"' is not a valid cost (must be a number)."); return; }
        if( isNaN(newCostAdd) ) { alert("'"+newCostAdd+"' is not a valid added cost (must be a number)."); return; }
        if( isNaN(newNumber) )  { alert("'"+newNumber +"' is not a valid number of items."); return; }
        // update item
        eItem.name        =   newName;
        eItem.weight      = 1*newWeight;
        eItem.cost        = 1*newCost;
        eItem.number      = 1*newNumber;
        eItem.TL          = 1*newTL;
        eItem.LC          = 1*newLC;
        // for optional properties, add if present in form, otherwise delete from object
        if( newCostAdd ) eItem.addedCost   = 1*newCostAdd;
        else if( eItem.addedCost && !newCostAdd ) delete eItem.addedCost;
        if( newDetl ) eItem.detail = newDetl;
        else if( eItem.detail && !newDetl ) delete eItem.detail;
        if( newDesc ) eItem.description = newDesc;
        else if( eItem.description && !newDesc ) delete eItem.description;
        if( newNotes ) eItem.notes = newNotes.split("\n");
        else if( eItem.notes && !newNotes ) delete eItem.notes;
        if( newUnit ) eItem.unit = newUnit;
        else if( eItem.unit && !newUnit ) delete eItem.unit;
        if( newCont ) eItem.continuous = true;
        else if( eItem.continuous && !newCont ) delete eItem.continuous;

        // collect, validate, update eItem for shield item form entries
        if( document.getElementById('editShieldFormTable').style.display=='table' ) {
            var newPDB    = document.getElementById('editShieldDialogPDB').value;
            var newDR     = document.getElementById('editShieldDialogDR').value;
            var newHP     = document.getElementById('editShieldDialogHP').value;
            var newSkill  = document.getElementById('editShieldDialogSkill').value;
            var newComp   = document.getElementById('editShieldComposition').value;
            var newIsBklr = document.getElementById('editShieldBuckler').checked;
            if( isNaN(newPDB) ) { alert("'"+newPDB+"' is not a valid Defense (must be a number)."); return; }
            if( isNaN(newDR) )  { alert("'"+newDR +"' is not a valid shield DR (must be a number)."); return; }
            if( isNaN(newHP) )  { alert("'"+newHP +"' is not a valid shield Hit Points (must be a number)."); return; }
            eItem.PDB         = 1*newPDB;
            eItem.DR          = 1*newDR;
            eItem.HP          = 1*newHP;
            eItem.skill       =   newSkill;
            eItem.composition =   newComp;
            eItem.buckler     =   newIsBklr;
        }

        // collect, validate, update eItem for armor item form entries
        if( document.getElementById('editArmorTable').style.display=='table' ) {
            // DR, PD, splits (group collect/validate/update because of conditionals)
            var newDR = document.getElementById('editArmorDialogDR').value;
            if( isNaN(newDR) )  { alert("'"+newDR +"' is not a valid PD (must be a number)."); return; }
            eItem.DR = 1*newDR;
            if( document.getElementById('editArmorDialogPDrow').style.display!='none' ) {
                var newPD = document.getElementById('editArmorDialogPD').value;
                if( isNaN(newPD) )  { alert("'"+newPD +"' is not a valid PD (must be a number)."); return; }
                eItem.PD = 1*newPD;
                if( document.getElementById('editArmorDialogsplitPDcell').style.display!='none' ) {
                    var newSplitPD = document.getElementById('editArmorDialogsplitPD').value;
                    if( isNaN(newSplitPD) )  { alert("'"+newSplitPD +"' is not a valid (split) PD (must be a number)."); return; }
                    eItem.splitPD = 1*newSplitPD;
                }
            }
            if( document.getElementById('editArmorDialogsplitDRcell').style.display!='none' ) {
                var newSplitDR = document.getElementById('editArmorDialogsplitDR').value;
                if( isNaN(newSplitDR) )  { alert("'"+newSplitDR +"' is not a valid (split) DR (must be a number)."); return; }
                eItem.splitDR = 1*newSplitDR;
            }
            // layers
            itemLayers  =   document.getElementById('editArmorDialoglayerableCB').checked;
            if( itemLayers  ) eItem.layerable = itemLayers;
            // locations
            var loc = [];
            for( var i in allBodyParts ) {
                var l = allBodyParts[i];
                if( document.getElementById('editArmorDialog'+l+'CB').checked ) loc.push(l);
            }
            eItem.location = loc;
        }

        // collect, validate, update eItem for weapon item form entries
        if( document.getElementById('editWeaponTable').style.display=='table' ) {
            // quality
            eItem.quality = 1*document.getElementById('editEquipmentQualityLevel').value;
            eItem.qualityEffectGroup = document.getElementById('editWeaponItemQualGp').value;
            // weapon ST, if appropriate
            if( document.getElementById('editWeaponItemST').value != 'null' )
                eItem.weaponST = 1*document.getElementById('editWeaponItemST').value;
            // bulk & shots
            eItem.bulk  = 1*document.getElementById('editWeaponItemBulk').value;
            eItem.shots = 1*document.getElementById('editWeaponItemShots').value;
            // attack options
            var wieldOptions = {};
            for( var rid=1; rid<=100; rid++ ) {
                if( !document.getElementById('editWeaponAttackOption'+rid+'SkillKey') ) continue;
                var option = {};
                option.title    =   document.getElementById('editWeaponAttackOption'+rid+'Title').value;
                option.hands    =   document.getElementById('editWeaponAttackOption'+rid+'Hands').value;
                option.strength = 1*document.getElementById('editWeaponAttackOption'+rid+'ST').value; // allow text?
                var base = document.getElementById('editWeaponAttackOption'+rid+'DmgBase').value;
                option.damage   = {
                    base: ( isNaN(base) ) ? base : 1*base,
                    mods: 1*document.getElementById('editWeaponAttackOption'+rid+'DmgMods').value,
                    type: document.getElementById('editWeaponAttackOption'+rid+'DmgType').value
                };
                var maxDam = document.getElementById('editWeaponAttackOption'+rid+'MaxDmg').value;
                if(maxDam) option.maxDamage = maxDam;
                var note   = document.getElementById('editWeaponAttackOption'+rid+'note').value;
                if( note ) option.note = [note];
                // localize melee/ranged form values
                var reach    =   document.getElementById('editWeaponAttackOption'+rid+'reach').value;
                var pryBonus =   document.getElementById('editWeaponAttackOption'+rid+'parryBonus').value;
                var rngFrmST =   document.getElementById('editWeaponAttackOption'+rid+'rangeFromST').checked;
                var hlfDmRng = 1*document.getElementById('editWeaponAttackOption'+rid+'hlfDmgRange').value;
                var maxDmRng = 1*document.getElementById('editWeaponAttackOption'+rid+'maxDmgRange').value;
                var snapShot = 1*document.getElementById('editWeaponAttackOption'+rid+'SS').value;    // 3rd edition only
                var accuracy =   document.getElementById('editWeaponAttackOption'+rid+'Acc').value;
                var rof      =   document.getElementById('editWeaponAttackOption'+rid+'RoF').value;
                var recoil   = 1*document.getElementById('editWeaponAttackOption'+rid+'Rcl').value;
                // conditionally attach these
                if( document.getElementById('editWeaponAttackOption'+rid+'reach').disabled ) {
                    if( rngFrmST ) option.rangeBasedOnST = rngFrmST;
                    if( hlfDmRng ) option.halfDamageRange = hlfDmRng;
                    if( maxDmRng ) option.maximumRange = maxDmRng;
                    if( snapShot ) option.snapShot = snapShot;
                    if( accuracy ) option.accuracy = accuracy;
                    if(   rof    ) option.rateOfFire = rof;
                    if(  recoil  ) option.recoil = recoil;
                }
                else {
                    if(  reach  )  option.reach = reach;
                    if( pryBonus ) option.parryBonus = pryBonus;
                }
                //   alert(JSONstring.make(option));
                // then push this option into a wield option group (make a new one if needed)
                var skillKey    =   document.getElementById('editWeaponAttackOption'+rid+'SkillKey').value;
                if( !wieldOptions[skillKey] ) wieldOptions[skillKey] = [];
                wieldOptions[skillKey].push( option );
            }
            eItem.wieldOptions = wieldOptions;

        }

    }

    // alert(JSONstring.make(eItem));

    // editing weights doesn't seem to affect encumbrance, either - hm

    // put the dialog box away
    document.getElementById('editEquipmentDialog').style.display = 'none';
    // reload character so that edited equipment gets shown
    loadCharacter( ch, action.toTitleCase()+" Equipment" );
}

function selectArmorDialog(sortKey) {

    if( !sortKey ) sortKey = 'name';
    var ch = document.loadedCharacter;

    // blank all supplementary input divs (so previously-written contents don't persist)
    document.getElementById('displayArmorWeight' ).innerHTML = '&nbsp;';
    document.getElementById('displayArmorCost'   ).innerHTML = '';
    document.getElementById('displayArmorDefense').innerHTML = '';
    document.getElementById( 'selectArmorAmount' ).value = 1;

    // filtering
    var showSameTL   = document.getElementById('armorDialogSameTLradio').checked;
    var showAvailTLs = document.getElementById('armorDialogAvailableTLradio').checked;
    var showAllTLs   = document.getElementById('armorDialogAllTLradio').checked;
    var coreFilter   = document.selectArmorForm.coreRulesCheckbox.checked;
    var bodyPartsArr = document.selectArmorForm.armorBodyPartRadioGroup;
    var bodyPart = 'all';
    for( var n in bodyPartsArr ) {
        var partButton = bodyPartsArr[n];
       // alert( partButton.value+', '+partButton.checked );      // yes!
        if( partButton.checked ) { bodyPart = partButton.value; }
    }
    //   alert(bodyPart);
    if( ch.gameInfo.ruleset.match(/e4/) ) {
        $('#armorCoreRulesFilterRow').hide();
    }

    // sort items from the Skills data object according to the sort key
    var armor_Items = [];
    for( var memberName in ArmorItems ) {
				armor_Items.push( { key: memberName, value: ArmorItems[memberName] } );
    }
    armor_Items.sort(
        function(a,b) {
            if( !a.value[sortKey] ) return 0;
            if( isNaN(a.value[sortKey]) ) {
                var aName = ( a.detail ) ? a.value['name']+a.value['detail'] : a.value['name'];
                var bName = ( b.detail ) ? b.value['name']+b.value['detail'] : b.value['name'];
                if( aName.toLowerCase() < bName.toLowerCase() ) return -1;
                if( aName.toLowerCase() > bName.toLowerCase() ) return  1;
                return 0;
            }
            else { return a.value[sortKey] - b.value[sortKey]; }
        }
    );

    // loop over (filtered) items in the Armor object to fill menu options
    var selectArmorMenuOptionsHTML = [''];
    var savedVal;
    for( var n in armor_Items ) {
        var memberLbl = armor_Items[n].key;
        var member = armor_Items[n].value;
        if( member.name ) {  // filter out non-Armor attributes of the ArmorItems object

            // filter Tech Levels
            if( showAvailTLs && member.TL >  ch.gameInfo.TL ) { continue; }
            if( showSameTL   && member.TL != ch.gameInfo.TL ) { continue; }
            // Core Rules filter
            if( coreFilter && member.reference && !member.reference.match(/B/) ) { continue; }
            // filter body parts
            if( bodyPart != 'all' ) {
                var locs = member.location;
                var partSeen = false;
                for( var i in member.location ) {
                    var part = member.location[i];
                    if( part == bodyPart ) { partSeen = true; }
                    if( bodyPart=='head'  && part.match(/skull|face|eyes/i) ) { partSeen = true; continue; }
                    if( bodyPart=='body'  && part.match(/torso|waist/i) ) { partSeen = true; continue; }
                    if( bodyPart=='arms'  && part.match('Arm')  ) { partSeen = true; continue; }
                    if( bodyPart=='legs'  && part.match('Leg')  ) { partSeen = true; continue; }
                    if( bodyPart=='hands' && part.match('Hand') ) { partSeen = true; continue; }
                    if( bodyPart=='feet'  && part.match('Foot') ) { partSeen = true; continue; }
                }
                if( !partSeen ) { continue; }
            }

            // put in an optgroup divider, for certain sort keys (large categories)
            var skVal = member[sortKey];
            if( sortKey.match(/TL|DR|weight/) && skVal!=savedVal ) {
                if(n!=0) selectArmorMenuOptionsHTML.push('          </optgroup>');
                selectArmorMenuOptionsHTML.push('          <optgroup label="'+skVal+'">');
            }
            // push option for this item
            var labelAfter  = ( member.detail ) ? ', '+member.detail : '';
            var labelBefore = ( member.detail ) ? member.detail+' '  : '';
            selectArmorMenuOptionsHTML.push('        <option value="'+memberLbl+'">'+labelBefore+member.name+'</option>');
        }
        savedVal = skVal;
    }
    if( sortKey.match(/TL|DR/) ) {
        selectArmorMenuOptionsHTML.push('          </optgroup>');
    }

    document.getElementById('customArmorDialogPDrow').style.display = (ruleset.match(3)) ? 'table-row' : 'none';
    document.getElementById('customArmorDialogTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsList, ch.gameInfo.TL ).join("\n                    ")+"\n                  ";
    document.getElementById('customArmorDialogLC').innerHTML
        = makeSelectListOptions( LegalityClassOptionsList, 4 ).join("\n                    ")+"\n                  ";
    document.getElementById( 'selectArmorMenu' ).innerHTML = selectArmorMenuOptionsHTML.join("\n");
    document.getElementById('displayChArmorTL1').innerHTML = ch.gameInfo.TL;
    document.getElementById('displayChArmorTL2').innerHTML = ch.gameInfo.TL;
    document.getElementById('selectArmorSubmit').value = 'take this item';
    document.getElementById('selectArmorSubmit').disabled = 'disabled';
    setupDialog('selectArmorDialog');
    return false;
}
function showArmorInfoInDialog( itemName ) {
    var ch = document.loadedCharacter;
    // localize the Armor member attributes
    var armorItem = ArmorItems[itemName];
    var TL        = armorItem.TL;
    var weight    = armorItem.weight;
    // convert weight if prefs indicate
    var ch = document.loadedCharacter;
    var unit = 'lb';
    var unitPref = ch.preferences.units.measure;
  //	console.log("[showArmorInfoInDialog] converted weight: "+convertWeight( weight, unitPref ))
  	if( !unitPref.match(/english/i) )
    		weight = roundToSigFigs( convertWeight( weight, unitPref ), 3 );
    if( unitPref.match(/mks/i) ) { unit = 'kg'; }
    if( unitPref.match(/cgs/i) ) { unit = 'gram'; }
    // populate the appropriate divs
    document.getElementById('displayArmorWeight').innerHTML = weight+' '+unit+es(weight);
    var costStr = ( Math.trunc(armorItem.cost)==armorItem.cost ) ? armorItem.cost : Number(Math.round(armorItem.cost+'e2')+'e-2').toFixed(2);
    document.getElementById('displayArmorCost').innerHTML = '$'+costStr;
    var PDinfo = ( armorItem.PD ) ? 'PD: '+armorItem.PD+', ' : '';
    document.getElementById('displayArmorDefense').innerHTML = PDinfo+'DR: '+armorItem.DR;
    document.getElementById('displayCoverage').innerHTML = 'Covers: '+armorItem.location.join(', ');
    // echo stats in custom form
    document.getElementById('customArmorDialogName').value = (armorItem.detail) ? armorItem.detail+' '+armorItem.name : armorItem.name;
    document.getElementById('customArmorDialogCost').value = armorItem.cost;
    document.getElementById('customArmorDialogWeight').value = weight;
    document.getElementById('customArmorDialogDR').value = armorItem.DR;
    document.getElementById('customArmorDialogPD').value = armorItem.PD;
    document.getElementById('customArmorDialogsplitDR').value = (armorItem.splitDR) ? armorItem.splitDR : '';
    document.getElementById('customArmorDialogsplitPD').value = (armorItem.splitPD) ? armorItem.splitPD : '';
    document.getElementById('customArmorDialoglayerableCB').checked = (armorItem.layerable) ? true : false;
    for( var l in allBodyParts ) {
        var loc = allBodyParts[l];
        document.getElementById('customArmorDialog'+loc+'CB').checked = false;
        document.getElementById('customArmorDialogsuitCB').checked = false;
    }
    for( var l in armorItem.location ) {
        var loc = armorItem.location[l];
        document.getElementById('customArmorDialog'+loc+'CB').checked = true;
    }
    document.getElementById('customArmorDialogsplitPDcell').style.display = ( armorItem.hasOwnProperty('splitPD') ) ? 'table-cell' : 'none';
    document.getElementById('customArmorDialogsplitDRcell').style.display = ( armorItem.hasOwnProperty('splitDR') ) ? 'table-cell' : 'none';
    document.getElementById('customArmorDialogTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsList, armorItem.TL ).join("\n                    ")+"\n                  ";
    document.getElementById('customArmorDialogLC').innerHTML
        = makeSelectListOptions( LegalityClassOptionsList, armorItem.LC ).join("\n                    ")+"\n                  ";

    // personalize and activate the Submit button
    //    document.getElementById('selectArmorSubmit').value = 'take ' + armorItem.name;
    document.getElementById('selectArmorSubmit').innerHTML = 'take <em>' + armorItem.name + '</em>';
    document.getElementById('selectArmorSubmit').disabled = null;
}
function loadArmorFromDialog() {
    ch = document.loadedCharacter;
    // get form inputs
    var itemName = document.getElementById('selectArmorMenu').value;    // = name of item
    var itemNum  = 1*document.getElementById('selectArmorAmount').value;
    var itemWeight, itemCost, itemDR, itemPD, itemSplitDR, itemSplitPD, itemLayers, itemLC, itemTL;
    var custom = ( document.getElementById('customArmorTables').style.display!='none' ) ? true : false;
    if( custom ) {
        itemName    =   document.getElementById('customArmorDialogName').value;
        itemDesc    =   document.getElementById('customArmorDialogDescription').value;
        itemWeight  = 1*document.getElementById('customArmorDialogWeight').value;
        itemCost    = 1*document.getElementById('customArmorDialogCost').value;
        itemCostAdd = 1*document.getElementById('customArmorDialogAddedCost').value;
        itemDR      = 1*document.getElementById('customArmorDialogDR').value;
        itemSplitDR = 1*document.getElementById('customArmorDialogsplitDR').value;
        itemPD      = 1*document.getElementById('customArmorDialogPD').value;
        itemSplitPD = 1*document.getElementById('customArmorDialogsplitPD').value;
        itemLayers  =   document.getElementById('customArmorDialoglayerableCB').checked;
        itemLC      = 1*document.getElementById('customArmorDialogLC').value;
        itemTL      = 1*document.getElementById('customArmorDialogTL').value;
        // adjust if prefs are set to a non-English measure system
        var unitsPref = ch.preferences.units.measure;
        if( unitsPref.match(/english/i) ) {
            if( unitsPref.match(/mks/i) ) {
                itemWeight = itemWeight*2.2;
            }
            if( unitsPref.match(/cgs/i) ) {
                itemWeight = itemWeight/454;
            }
        }
    }
    // validate inputs
    if( !itemName )      { alert("Please select an armor item.");   return false; }
    if( isNaN(itemNum) ) { alert("The 'How many' input must be a number."); return false; }
    if( custom ) {
        if( isNaN(itemWeight) )  { alert("The weight must be a number."); return false; }
        if( isNaN(itemCost) )    { alert("The cost must be a number."); return false; }
        if( isNaN(itemCostAdd) ) { alert("The added cost must be a number."); return false; }
        if( isNaN(itemDR) )      { alert("The DR must be a number."); return false; }
        if( isNaN(itemSplitDR) ) { alert("The 'split' DR must be a number."); return false; }
        if( isNaN(itemPD) )      { alert("The PD must be a number."); return false; }
        if( isNaN(itemSplitPD) ) { alert("The 'split' PD must be a number."); return false; }
    }

    // hide the selectArmorDialog
    document.getElementById('selectArmorDialog').style.display = 'none';

    var newItem;
    if( custom ) {
        // instantiate a new Armor object
        // TL? legality class?
        var loc = [];
        for( var i in allBodyParts ) {
            var l = allBodyParts[i];
            if( document.getElementById('customArmorDialog'+l+'CB').checked ) loc.push(l);
        }
        newItem = new Armor( itemName, itemWeight, itemCost, itemTL, itemLC, itemDR, itemPD, loc );
        if( itemCostAdd ) newItem.addedCost = itemCostAdd;
        if( itemDesc )  newItem.description = itemDesc;
        // split PD/DR, layers, etc.
        if( itemSplitDR ) newItem.splitDR = itemSplitDR;
        if( itemSplitPD ) newItem.splitPD = itemSplitPD;
        if( itemLayers  ) newItem.layerable = itemLayers;
    }
    else {
        // clone the item using the selected item key
        newItem = ArmorItems[itemName].clone();
    }
    newItem.number = itemNum;

    // attach to Character
  //  alert('attach '+itemName+' to '+ch.description.name+"\n"+JSONstring.make(newItem));
    ch.equipment.push( newItem );
    ch.collections.default.push( newItem );

    // cause character to be reloaded so that the new armor becomes visible
    loadCharacter( ch, "Add Armor" );
    //    alert('finished reloading character in loadArmorFromDialog ');
    selectArmorDialog();
    // 'return false' happens in the onclick function
}

function selectShieldDialog() {
    var ch = document.loadedCharacter;
    // blank all supplementary input divs (so previously-written contents don't persist)
    document.getElementById('displayShieldWeight').innerHTML = '';
    document.getElementById('displayShieldCost').innerHTML = '';
    document.getElementById('displayShieldDefense').innerHTML = '&nbsp;';
    document.getElementById('selectShieldAmount').value = 1;
    // set up composition menu
    document.getElementById('selectMetalShield').disabled = ( ch.gameInfo.TL<2 );
    document.getElementById('selectPlasticShield').disabled = ( ch.gameInfo.TL<7 );
    // customize form for ruleset
    document.getElementById( 'customShieldPDB' ).innerHTML = ( ruleset.match(3) ) ? 'PD' : 'DB';
    document.getElementById( 'customShieldPDB'     ).title = ( ruleset.match(3) ) ? 'Passive Defense' : 'Defense Bonus';
    document.getElementById('customShieldPDBlabel' ).title = ( ruleset.match(3) ) ? 'Passive Defense' : 'Defense Bonus';
    document.getElementById('customShieldDialogPDB').title = ( ruleset.match(3) ) ? 'Passive Defense' : 'Defense Bonus';

    document.getElementById('customShieldDialogSkill').innerHTML
        = makeSelectListOptions( ShieldSkillsOptionsList ).join("\n                    ")+"\n                  ";

    // ruleset-specific display for some fields
    if( ch.gameInfo.ruleset.match(/e4/) ) { $('#shieldsCoreRulesFilterRow').hide(); }
    document.getElementById('selectShieldBucklerChoiceCell').style.display = ( ruleset.match(3) ) ? 'none' : 'table-cell';
    document.getElementById('selectShieldBuckler').checked = false;

    // filtering
    var showAllTLs = document.getElementById('shieldDialogAllTLcheckbox').checked;
    var coreFilter = document.selectShieldForm.coreRulesCheckbox.checked;

    // loop over (filtered) items in the Shield object to fill menu options
    var selectShieldMenuOptionsHTML = new Array();
    for( var memberName in ShieldItems ) {
        var member = ShieldItems[memberName];
        if( member.name ) {  // filter out non-Shield attributes of the ShieldItems object
            // filter Tech Levels
            if( !showAllTLs && member.TL > ch.gameInfo.TL ) { continue; }
            // Core Rules filter
            if( coreFilter && member.reference && !member.reference.match(/B/) ) { continue; }
            var detail = ( member.detail ) ? member.detail+' '  : '';
            selectShieldMenuOptionsHTML.push('        <option value="'+memberName+'">'+detail+member.name+'</option>');
        }
    }
    document.getElementById('customShieldDialogTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsList, ch.gameInfo.TL ).join("\n                    ")+"\n                  ";
    document.getElementById( 'selectShieldMenu' ).innerHTML = selectShieldMenuOptionsHTML.join("\n");
    document.getElementById('selectShieldSubmit').value = 'take this item';
    document.getElementById('selectShieldSubmit').disabled = 'disabled';
    setupDialog('selectShieldDialog');
    return false;
}
function showShieldInfoInDialog( itemName ) {
    var ch = document.loadedCharacter;
    // localize the Shield member attributes
    // console.log(ShieldItems[itemName]);
    var shieldItem = ShieldItems[itemName].clone();       // console.log(shieldItem);
    // convert weight if prefs indicate
    var unit = 'lb';
    var unitPref = ch.preferences.units.measure;
  	// console.log("[showShieldInfoInDialog] converted weight: "+convertWeight( shieldItem.weight, unitPref ))
  	if( !unitPref.match(/english/i) )
    		shieldItem.weight = roundToSigFigs( convertWeight( shieldItem.weight, unitPref ), 3 );
    if( unitPref.match(/mks/i) ) { unit = 'kg'; }
    if( unitPref.match(/cgs/i) ) { unit = 'gram'; }
    // disable 'composition' or 'buckler' inputs, if inappropriate
    if( !shieldItem.skill.match(/shield|buckler/i) || shieldItem.skill.match(/force/i) || shieldItem.composition===1 ) {       // console.log("[showShieldInfoInDialog] disabling composition select");
        document.getElementById('selectShieldComposition').disabled = "disabled";
        document.getElementById('selectShieldComposition').value = 'null';
    }
    else document.getElementById('selectShieldComposition').disabled = false;
    var bucklerCB = document.getElementById('selectShieldBuckler');
    if( ruleset.match(3) || shieldItem.name.match(/large/i) || !shieldItem.skill.match(/shield/i) || shieldItem.skill.match(/force/i) ) {
        bucklerCB.disabled = true;
        bucklerCB.checked = false;
    }
    else bucklerCB.disabled = false;
    // adjust shieldItem stats if needed based on composition or buckler status
    if( ruleset.match(4) && bucklerCB.checked ) {
        shieldItem.name += ' (buckler)';
        shieldItem.skill = 'Shield_Buckler';
        shieldItem.buckler = true;
    }

    // composition (don't adjust weight or cost here; these are taken care of by actualCost and actualWeight functions)
//     var madeof = document.getElementById('selectShieldComposition').value;
//     shieldItem.composition = (madeof) ? madeof : null;
    var madeof = shieldItem.composition ? shieldItem.composition : null;
    console.log(madeof);
    if( madeof && madeof.match(/metal/) ) {
        shieldItem.description = (shieldItem.description) ? shieldItem.description+' metal' : 'metal';
        shieldItem.HP     *= 2;
        if( shieldItem.TL<4 )
            shieldItem.TL  = ( ruleset.match(3) ) ? 2 : 3;
        if( ruleset.match(4) ) shieldItem.DR += 3;
        // else shieldItem.pen *= 2;
    }
    if( madeof && madeof.match(/plastic/) ) {
        shieldItem.description = (shieldItem.description) ? shieldItem.description+' plastic' : 'plastic';
        if( shieldItem.TL<4 )
            shieldItem.TL  = 7;
    }

    // alert(JSONstring.make(shieldItem));
    // populate the stats divs
    var shieldWght = actualWeight(shieldItem);
    var shieldCost = actualCost(shieldItem);
    document.getElementById('displayShieldWeight').innerHTML = shieldWght+' '+unit+es(shieldWght);
    document.getElementById('displayShieldCost').innerHTML = '$'+shieldCost;
    var PDBterm = ( ruleset.match(3) ) ? 'Passive Defense' : 'Defense Bonus';
    document.getElementById('displayShieldDefense').innerHTML = PDBterm+': '+shieldItem.PDB;
    // echo stats in custom form
    document.getElementById('customShieldDialogName').value = shieldItem.name;

    document.getElementById('customShieldDialogDetail').value = (shieldItem.detail) ? shieldItem.detail : '';
    document.getElementById('customShieldDialogDescription').value = (shieldItem.description) ? shieldItem.description : '';

    document.getElementById('customShieldDialogCost').value = shieldCost;
    document.getElementById('customShieldDialogWeight').value = shieldWght;
    document.getElementById('customShieldDialogPDB').value = shieldItem.PDB;
    document.getElementById('customShieldDialogDR').value = shieldItem.DR;
    document.getElementById('customShieldDialogHP').value = shieldItem.HP;
    document.getElementById('customShieldDialogSkill').value = shieldItem.skill;
    document.getElementById('customShieldDialogTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsList, shieldItem.TL ).join("\n                    ")+"\n                  ";
    document.getElementById('customShieldDialogLC').innerHTML
        = makeSelectListOptions( LegalityClassOptionsList, shieldItem.LC ).join("\n                    ")+"\n                  ";
    // personalize and activate the Submit button
    document.getElementById('selectShieldSubmit').innerHTML = 'take <em>' + shieldItem.name + '</em>';
    document.getElementById('selectShieldSubmit').disabled = null;
}
function loadShieldFromDialog() {
    // get form inputs
    var itemName  = document.getElementById('selectShieldMenu').value;    // = name of item
    var itemNum   = document.getElementById('selectShieldAmount').value;
    var itemComp  = ( document.getElementById('selectShieldComposition').disabled )
                  ? null
                  : document.getElementById('selectShieldComposition').value;
    var itemSkill = document.getElementById('customShieldDialogSkill').value;
    var custom = ( document.getElementById('customShieldFormWrapper').style.display!='none' ) ? true : false;
    if( custom ) {
        itemName    =   document.getElementById('customShieldDialogName').value;
        itemWeight  = 1*document.getElementById('customShieldDialogWeight').value;
        itemCost    = 1*document.getElementById('customShieldDialogCost').value;
        itemPDB     = 1*document.getElementById('customShieldDialogPDB').value;
        itemDR      = 1*document.getElementById('customShieldDialogDR').value;
        itemHP      = 1*document.getElementById('customShieldDialogHP').value;
        itemLC      = 1*document.getElementById('customShieldDialogLC').value;
        itemTL      = 1*document.getElementById('customShieldDialogTL').value;
        // adjust if prefs are set to a non-English measure system
        var unitsPref = ch.preferences.units.measure;
        if( unitsPref.match(/english/i) ) {
            if( unitsPref.match(/mks/i) ) {
                itemWeight = itemWeight*2.2;
            }
            if( unitsPref.match(/cgs/i) ) {
                itemWeight = itemWeight/454;
            }
        }
    }
    // validate inputs
    if( !itemName )      { alert("Please select a shield.");   return false; }
    if( isNaN(itemNum) ) { alert("The 'How many' input must be a number."); return false; }
    if( custom ) {
        if( isNaN(itemWeight) )  { alert("The weight must be a number."); return false; }
        if( isNaN(itemCost) )    { alert("The cost must be a number."); return false; }
        if( isNaN(itemPDB) )     { var PDB = (ruleset.match(3)) ? 'PD' : 'DB'; alert("The "+PDB+" must be a number."); return false; }
        if( isNaN(itemDR) )      { alert("The DR must be a number."); return false; }
        if( isNaN(itemHP) )      { alert("The HT must be a number."); return false; }
    }

    // hide the selectShieldDialog
    document.getElementById('selectShieldDialog').style.display = 'none';

    var newItem;
    if( custom ) {
        newItem = new Shield( itemName, itemWeight, itemCost, itemTL, itemLC, itemPDB, itemDR, itemHP, itemSkill );
    }
    else {
        // clone the item using the selected item key
        newItem = ShieldItems[itemName].clone();
    }
    newItem.number = 1*itemNum;
    newItem.skill = itemSkill;
    if( itemComp && !(itemComp=='null') ) {
        newItem.composition = itemComp;
        // adjust newItem stats if needed for composition and buckler-ness
        if( itemComp.match(/metal/) ) {
            newItem.cost   *= ( ruleset.match(3) ) ? 4 : 5;
            newItem.weight *= ( ruleset.match(3) ) ? 3 : 2;
            newItem.HP     *= 2;
            if( newItem.TL<4 )
                newItem.TL  = ( ruleset.match(3) ) ? 2 : 3;
            if( ruleset.match(4) ) newItem.DR += 3;
            else newItem.DR = 6;
        }
        if( itemComp.match(/plastic/) ) {
            newItem.weight *= 0.5;
            if( newItem.TL<4 )
                newItem.TL  = 7;
        }
    }
    if( ruleset.match(4) && document.getElementById('selectShieldBuckler').checked ) {
        newItem.buckler = true;
    }
    // alert(JSONstring.make(newItem));

    // attach to Character
    //    alert('attach '+itemName+' to '+document.loadedCharacter.description.name);
    console.log('attach '+itemName+' to '+document.loadedCharacter.description.name);
    console.log(newItem);
    document.loadedCharacter.equipment.push( newItem );
    document.loadedCharacter.collections.default.push( newItem );

    // cause character to be reloaded so that the new shield becomes visible
    loadCharacter( document.loadedCharacter, "Add Shield" );
    //    alert('finished reloading character in loadShieldFromDialog ');
    selectShieldDialog();
    // 'return false' happens in the onclick function
}

function selectWeaponDialog(sortKey,filterKey) {

    if( !sortKey ) sortKey = document.getElementById('selectWeaponSort').value;
    if( !sortKey ) sortKey = 'name';

    // blank all supplementary input divs (so previously-written contents don't persist)
    document.getElementById('displayWeaponWeight').innerHTML = '';
    document.getElementById('displayWeaponCost').innerHTML = '';
    document.getElementById('displayWeaponDamage').innerHTML = '';
    document.getElementById('selectWeaponAmount').value = 1;
    if( document.getElementById('selectWeaponQuality')[1] )
        document.getElementById('selectWeaponQuality')[1].selected = "selected";
    document.getElementById('displayWeaponWieldOptionSkillKey').innerHTML = '';
   // $('#displayWeaponWieldOptionSkillKey').html();

    // filtering
    var showAllTLs = document.getElementById('WeaponDialogAllTLCheckbox').checked;
    var coreFilter = document.selectWeaponForm.coreRulesCheckbox.checked;
    var showAllSTs = document.getElementById('WeaponDialogSTreqCheckbox').checked;
    var showType   = document.getElementById('WeaponDialogTypeFilter').value;
    var groupFilterElmt = document.getElementById('WeaponDialogGroupFilter');
    var showGroup  = groupFilterElmt.value;  // console.log(showGroup);
   // console.log("[selectWeaponDialog] filterKey="+filterKey+"; showGroup="+showGroup);
    var groupFilterOpts =  ['','<option value="all">all</option>'];
    groupFilterOpts
        = groupFilterOpts.concat( makeSelectListOptions( QualityEffectGroupOptionsList, showGroup ) );
    groupFilterElmt.innerHTML = groupFilterOpts.join("\n                    ") + "\n                  ";

    if( ch.gameInfo.ruleset.match(/e4/) ) {
        $('#weaponsCoreRulesFilterRow').hide();
    }

    // sort items from the Weapons data object according to the sort key
    var weaponItems  = [];
    for( var memberName in Weapons ) {
				weaponItems.push( { key: memberName, value: Weapons[memberName] } );
    }
		weaponItems.sort(
        function(a,b) {
            if( !a.value[sortKey] && !b.value[sortKey] ) return 0;
            if( !a.value[sortKey] ) return -1;
            if( !b.value[sortKey] ) return  1;
            if( isNaN(a.value[sortKey]) ) {
                if( a.value[sortKey].toLowerCase() < b.value[sortKey].toLowerCase() ) return -1;
                if( a.value[sortKey].toLowerCase() > b.value[sortKey].toLowerCase() ) return  1;
                return 0;
            }
            else { return a.value[sortKey] - b.value[sortKey]; }
        }
    );
    // if I want to be able to sort weapons based on any field inside of a wieldOption,
    // I'm going to have to get fancier here.

    // loop over and filter (sorted) items in the weaponItems object to fill menu options
    var selectWeaponMenuOptionsHTML = [''];
    var savedVal;
    for( var n in weaponItems ) {
        var label = weaponItems[n].key;
        var pWeapon = weaponItems[n].value;
        if( pWeapon.name ) {  // filter out non-Weapon members of the Weapons object

            // filter by Tech Level
            if( !showAllTLs && pWeapon.TL>document.loadedCharacter.gameInfo.TL ) { continue; }
            // filter by ST requirement (loop over every option in each option group)
            var lowestSTreq = 1;
            for( var optSkill in pWeapon.wieldOptions ) {
                var optGroup = pWeapon.wieldOptions[optSkill];
                for( var opt in optGroup ) {
                    var option = optGroup[opt];
                    // filter out options incompatible with character ruleset
                    var chRuleset = document.loadedCharacter.gameInfo.ruleset;
                    if( option.ruleset && !option.ruleset.compatWith(chRuleset) ) { continue; }
                    if( option.strength>lowestSTreq ) { lowestSTreq = option.strength; }
                }
            }
            if( !showAllSTs && lowestSTreq>document.loadedCharacter.ST() ) { continue; }
            // Core Rules filter
            if( coreFilter && pWeapon.reference && !pWeapon.reference.match(/B/) ) { continue; }
            // filter by ranged/hand weapon type
            if( showType!='all' ) {
                var hasOnlyRangedOptions = true;
                var  hasNoRangedOptions  = true;
                for( var optSkill in pWeapon.wieldOptions ) {
                    for( var opt in pWeapon.wieldOptions[optSkill] ) {
                        if( pWeapon.wieldOptions[optSkill][opt].hasOwnProperty('maximumRange') ) {
                            hasNoRangedOptions = false;
                        }
                        else hasOnlyRangedOptions = false;
                    }
                }
                if( hasNoRangedOptions   && (showType=='ranged') ) { continue; }
                if( hasOnlyRangedOptions && (showType=='hand')   ) { continue; }
            }
            // filter by quality group (filter on this all the time; otherwise oddness happens when other filter criteria are changed)
            if( showGroup != 'all' ) {
                if( pWeapon.qualityEffectGroup != showGroup ) { continue; }
            }

            // put in an optgroup divider, for certain sort keys (large categories)
            var skVal  = pWeapon[sortKey];
            if( sortKey.match(/TL|LC|weight|quality/) && skVal!=savedVal ) {
                if(n!=0) selectWeaponMenuOptionsHTML.push('          </optgroup>');
                selectWeaponMenuOptionsHTML.push('          <optgroup label="'+skVal+'">');
            }

            // push weapon item option
            let ref = pWeapon.reference;
            let title = ( ref ) ? expandMiniref( ref, true ) : 'ref for '+label;
            var labelBefore = ( pWeapon.detail ) ? pWeapon.detail+' '  : '';
            selectWeaponMenuOptionsHTML.push('        <option value="'+label+'" title="'+title+'">'+labelBefore+pWeapon.name+'</option>');
        }
        savedVal = skVal;
    }
    if( sortKey.match(/TL|LC/) ) {
        selectWeaponMenuOptionsHTML.push('          </optgroup>');
    }
    document.getElementById('selectWeaponMenu').innerHTML = selectWeaponMenuOptionsHTML.join("\n");
    // populate custom form skill list
    document.getElementById('customWeaponItemAttackOptionSkillsMenu').innerHTML
        = makeSkillOptionsList( 'Skills', 'name' ).join("\n                      ")+"\n                    ";
    // clear options table
    var indent = '                      ';
    var optionsTableHTML = ['','<tbody>'];
    optionsTableHTML.push('  <tr style="line-height:normal;">');
    optionsTableHTML.push('    <th>&emsp;</th>');
    optionsTableHTML.push('    <th>Skill</th>');
    optionsTableHTML.push('    <th>Attack</th>');
    optionsTableHTML.push('    <th>Hands</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Type</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Base</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Mods</th>');
    optionsTableHTML.push('    <th style="text-align:center">ST</th>');
    optionsTableHTML.push('    <th style="text-align:center">Max Dmg</th>');
    optionsTableHTML.push('    <th style="text-align:center">Reach</th>');
    optionsTableHTML.push('    <th style="text-align:center">Parry<br />Bonus</th>');
    optionsTableHTML.push('    <th style="text-align:center">ST&rarr;<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">&half; Dmg<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">Max<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">SS</th>');
    optionsTableHTML.push('    <th style="text-align:center">Acc</th>');
    optionsTableHTML.push('    <th style="text-align:center">RoF</th>');
    optionsTableHTML.push('    <th style="text-align:center">Rcl</th>');
    optionsTableHTML.push('  </tr>');
    optionsTableHTML.push('</tbody>');
    optionsTableHTML.push('');
    document.getElementById('customWeaponAttackOptionsTable').innerHTML = optionsTableHTML.join("\n"+indent);
    document.getElementById('customWeaponAttackOptionsTable').style.display = 'none';
    document.getElementById('attackOptionRows').value = 0;
    /*  populate some custom weapon inputs  */
    document.getElementById('customWeaponItemBulk').innerHTML
        = makeNumberOptions( -10, 0, '          ', 0, true );
    document.getElementById('customWeaponItemQualGp').innerHTML
        = makeSelectListOptions( QualityEffectGroupOptionsList ).join("\n                    ")+"\n                  ";
    document.getElementById('customWeaponItemTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsList, document.loadedCharacter.gameInfo.TL ).join("\n                    ")+"\n                  ";
    document.getElementById('customWeaponItemLC').innerHTML
        = makeSelectListOptions( LegalityClassOptionsList ).join("\n                    ")+"\n                  ";
    // buttons, etc.
    document.getElementById('selectWeaponSubmit').value = 'take this weapon';
    document.getElementById('selectWeaponSubmit').disabled = 'disabled';
    setupDialog('selectWeaponDialog');
    return false;
}
function addNewAttackOptionRow( skillKey, row, optionObj, attackType, dBoxPref ) {
  // alert( "key: "+skillKey+"\nrow: "+row );
    if( !dBoxPref ) dBoxPref = 'custom';
    document.getElementById(dBoxPref+'WeaponAttackOptionsTable').style.display = 'block';
    var newWrapperTR = document.getElementById(dBoxPref+'WeaponAttackOptionsTable').insertRow(row);
    newWrapperTR.setAttribute('id',dBoxPref+'WeaponAttackOption'+row+'Row');
    // alert( document.getElementById(dBoxPref+'WeaponAttackOptionsTable').innerHTML );

    if( !optionObj ) optionObj = { damage: { base: 1, type: 'cr', mods: 0 } };
    if( !attackType ) attackType = ( optionObj.maximumRange ) ? 'ranged' : 'melee';
    var disableM = ( attackType.match(/range/i) ) ? ' disabled="disabled"' : '';
    var disableR = ( attackType.match(/range/i) ) ? '' : ' disabled="disabled"';

    /*  create row cells  */
    var indent = '                          ';
    var TDs = [''];
    TDs.push('<td><a><img id="delete_'+row+'" src="../images/icon_delete.gif" title="delete this attack option" onclick="removeAttackOptionRow('+row+',\'edit\')"></a></td>');
    TDs.push('<td><span   id="'+dBoxPref+'WeaponAttackOption'+row+'SkillName"></span><input id="'+dBoxPref+'WeaponAttackOption'+row+'SkillKey" type="hidden" /></td>');
    TDs.push('<td><input  id="'+dBoxPref+'WeaponAttackOption'+row+'Title" style="width:6em" /></td>');
    TDs.push('<td style="text-align:center">'+"\n"+indent+'  <select id="'+dBoxPref+'WeaponAttackOption'+row+'Hands"></select>'+"\n"+indent+'</td>');
    TDs.push('<td style="text-align:center">'+"\n"+indent+'  <select id="'+dBoxPref+'WeaponAttackOption'+row+'DmgType"></select>'+"\n"+indent+'</td>');
    TDs.push('<td style="text-align:center">'+"\n"+indent+'  <select id="'+dBoxPref+'WeaponAttackOption'+row+'DmgBase"></select>'+"\n"+indent+'</td>');
    TDs.push('<td style="text-align:center">'+"\n"+indent+'  <select id="'+dBoxPref+'WeaponAttackOption'+row+'DmgMods"></select>'+"\n"+indent+'</td>');
    TDs.push('<td style="text-align:center">'+"\n"+indent+'  <select id="'+dBoxPref+'WeaponAttackOption'+row+'ST"></select>'+"\n"+indent+'</td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'MaxDmg" style="width:4em" /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'note" style="width:10em" /></td>');
    TDs.push('<td style="text-align:center">&emsp;</td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'reach" style="width:4em"'+disableM+' /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'parryBonus" style="width:3em"'+disableM+' /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'rangeFromST" type="checkbox"'+disableR+' /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'hlfDmgRange" style="width:3em"'+disableR+' /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'maxDmgRange" style="width:3em"'+disableR+' /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'SS" style="width:2em"'+disableR+' /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'Acc" style="width:2em"'+disableR+' /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'RoF" style="width:2em"'+disableR+' /></td>');
    TDs.push('<td style="text-align:center"><input  id="'+dBoxPref+'WeaponAttackOption'+row+'Rcl" style="width:2em"'+disableR+' /></td>');
    TDs.push('');
    newWrapperTR.innerHTML = TDs.join("\n"+indent);

    /*  populate cells  */
  //  alert(JSONstring.make(optionObj));
   // alert('setting '+dBoxPref+'WeaponAttackOption'+row+'SkillName innerHTML to '+skillKey);
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'SkillName').innerHTML = skillKey;
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'SkillKey').value = skillKey;
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'Title').value = optionObj.title || '';
    var handsOptions = [{ text: 'dom. hand', value: 'dom' }, { text: 'off hand', value: 'off' }, { text: 'both hands', value: 'both' }, ];
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'Hands').innerHTML
        = "\n    "+indent+makeSelectListOptions( handsOptions, optionObj.hands ).join("\n    "+indent)+"\n  "+indent;
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'DmgType').innerHTML
        = "\n    "+indent+makeSelectListOptions( DamageTypeOptionsList, optionObj.damage.type ).join("\n    "+indent)+"\n  "+indent;
    var dmgBaseOptions
        = [ { text: 'swing', value: 'sw' }, { text: 'thrust', value: 'thr' },
            { text: '1d', value: 1 }, { text: '2d', value: 2 }, { text: '3d', value: 3 },
            { text: '4d', value: 4 }, { text: '5d', value: 5 }, { text: '6d', value: 6 },
            { text: '7d', value: 7 }, { text: '8d', value: 8 }, { text: '9d', value: 9 }, ];
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'DmgBase').innerHTML
        = "\n    "+indent+makeSelectListOptions( dmgBaseOptions, optionObj.damage.base ).join("\n    "+indent)+"\n  "+indent;
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'DmgMods').innerHTML
        = makeNumberOptions( -4, 7, indent+'  ', optionObj.damage.mods, false );
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'ST').innerHTML
        = makeNumberOptions( 5, 30, indent+'  ', optionObj.strength, false );
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'MaxDmg').value = optionObj.maxDamage || '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'note').value   = (optionObj.note) ? optionObj.note.join("  ") : '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'reach').value  = optionObj.reach || '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'parryBonus').value
        = (optionObj.hasOwnProperty('parryBonus')) ? optionObj.parryBonus : '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'rangeFromST').checked
        = (optionObj.hasOwnProperty('rangeBasedOnST')) ? optionObj.rangeBasedOnST : false;
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'maxDmgRange').value = optionObj.maximumRange || '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'hlfDmgRange').value = optionObj.halfDamageRange || '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'SS').value = optionObj.snapShot || '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'Acc').value
        = (optionObj.hasOwnProperty('accuracy')) ? optionObj.accuracy : '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'RoF').value = optionObj.rateOfFire || '';
    document.getElementById(dBoxPref+'WeaponAttackOption'+row+'Rcl').value
        = (optionObj.hasOwnProperty('recoil')) ? optionObj.recoil : '';

    // save rows in form
    document.getElementById('attackOptionRows').value = row;
}
function removeAttackOptionRow( rowID, dBoxPref ) {
    var attackOptionsTbl = document.getElementById(dBoxPref+'WeaponAttackOptionsTable');
    // rowID may not match row number, if some rows have been deleted - figure this out:
    var rowNum = 1;                       // rowNum tracks real row index
    for( var i=1; i<=100; i++ ) {   // i iterates over row IDs (which were original row numbers, but some may now be missing)
        var inptObj = document.getElementById(dBoxPref+'WeaponAttackOption'+i+'SkillName');
        if( inptObj ) {
            if( i==rowID ) break;
            rowNum++;
        }
    }
    attackOptionsTbl.deleteRow( rowNum );
    document.getElementById('attackOptionRows').value--;
    if( document.getElementById('attackOptionRows').value==0 )
        document.getElementById(dBoxPref+'WeaponAttackOptionsTable').style.display = 'none';
}
function showWeaponInfoInDialog( wLabel ) {
    document.getElementById('displayWeaponSTmenu').style.visibility = 'hidden';
    document.getElementById('selectWeaponST').innerHTML = '';
    $("#customWeaponItemAddedCost").val('');
    $("#customWeaponItemDescription").val('');
    $("#customWeaponItemDetail").val('');
    if( wLabel ) {
        document.getElementById('weaponLabel').value = wLabel;
        if(document.getElementById('selectWeaponQuality')[1])
            document.getElementById('selectWeaponQuality')[1].selected = "selected";
    }
    else { wLabel = document.getElementById('weaponLabel').value; }
    //    alert(JSONstring.make(Weapons[wLabel]));
    // get optional parameters from form
    var quality = 1*document.getElementById('selectWeaponQuality').value;
    var addedCost = 1*$('#customWeaponItemAddedCost').val();
    // clear options table
    var indent = '                      ';
    var optionsTableHTML = ['','<tbody>'];
    optionsTableHTML.push('  <tr style="line-height:normal;">');
    optionsTableHTML.push('    <th>&emsp;</th>');
    optionsTableHTML.push('    <th style="text-align:center">Skill</th>');
    optionsTableHTML.push('    <th style="text-align:center">Attack Mode</th>');
    optionsTableHTML.push('    <th style="text-align:center">Hands</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Type</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Base</th>');
    optionsTableHTML.push('    <th style="text-align:center">Dmg<br />Mods</th>');
    optionsTableHTML.push('    <th style="text-align:center">ST</th>');
    optionsTableHTML.push('    <th style="text-align:center">Max Dmg</th>');
    optionsTableHTML.push('    <th style="text-align:center">Note</th>');
    optionsTableHTML.push('    <th style="text-align:center"></th>');
    optionsTableHTML.push('    <th style="text-align:center">Reach</th>');
    optionsTableHTML.push('    <th style="text-align:center">Parry<br />Bonus</th>');
    optionsTableHTML.push('    <th style="text-align:center">ST&rarr;<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">&half; Dmg<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">Max<br />Range</th>');
    optionsTableHTML.push('    <th style="text-align:center">SS</th>');
    optionsTableHTML.push('    <th style="text-align:center">Acc</th>');
    optionsTableHTML.push('    <th style="text-align:center">RoF</th>');
    optionsTableHTML.push('    <th style="text-align:center">Rcl</th>');
    optionsTableHTML.push('  </tr>');
    optionsTableHTML.push('</tbody>');
    optionsTableHTML.push('');
    document.getElementById('customWeaponAttackOptionsTable').innerHTML = optionsTableHTML.join("\n"+indent);
    document.getElementById('customWeaponAttackOptionsTable').style.display = 'block';
    document.getElementById('attackOptionRows').value = 0;

    // localize the Weapon member attributes needed
    //    var Weapon = Weapons[wLabel].cloneWeaponWithQuality(quality);
    var Weapon = Weapons[wLabel];
    // attach optional parameters
    Weapon.quality = quality;
    if( addedCost ) Weapon.addedCost = addedCost;
  //  alert(JSONstring.make(Weapon));
    var name        = Weapon.name;
    var detail      = Weapon.detail || '';
    var description = Weapon.description || '';
    var weight      = actualWeight(Weapon);  // method takes composition, etc. into account
    var cost        = actualCost(Weapon);    // method takes weapon quality, etc. into account
    var TL          = Weapon.TL;
    var LC          = Weapon.LC;
    var AD          = Weapon.armorDivisor;
    var bulk        = Weapon.bulk;
    var shots       = Weapon.shots;
    var qualGp      = Weapon.qualityEffectGroup;
    var minST       = 1;
    var maxST       = 25;
    // weaponST? shots?
    // convert weight if prefs indicate
    var ch = document.loadedCharacter;
    var unit = 'lb';
    var unitPref = ch.preferences.units.measure;
  //  weight = ( unitPref.match(/mks/i) ) ?  convertWeight( 10*weight, unitPref )/10 : 10*convertWeight( weight/10, unitPref );
  //	console.log("[showWeaponInfoInDialog] converted weight: "+convertWeight( weight, unitPref ))
  	if( !unitPref.match(/english/i) )
    		weight = roundToSigFigs( convertWeight( weight, unitPref ), 3 );
    if( unitPref.match(/mks/i) ) { unit = 'kg'; }
    if( unitPref.match(/cgs/i) ) { unit = 'gram'; }

    // (show and) populate the appropriate divs
    document.getElementById('displayWeaponWeight').innerHTML = weight+' '+unit+es(weight);
    document.getElementById('displayWeaponCost').innerHTML = '$'+cost;

    // (show and) populate stats for first wield option
    var dmgSumms = new Array();
    var wOpts = Weapon.wieldOptions;
    for( var optName in wOpts ) { // this loop runs only once
        var optionGroup = wOpts[optName];
        for( var o=0; o<optionGroup.length; o++ ) {
            var dmgStr = Weapon.damage( optName, optionGroup[o].title );
            if( !dmgStr ) dmgStr = '';
            dmgSumms.push( dmgStr );
        }
        var tokens = optName.split('_');
        var matches = tokens[0].match(/\d+/);
        var TLsuff = (matches) ? '/TL'+Number(matches[0]) : '';
        var subtokens = tokens[0].split(/\d/);
        var skillKey = subtokens[0];
        var spec = (tokens[1]) ? ' ('+tokens[1]+')' : '';
        var more = ( Object.keys(wOpts).length>1 )
            ? ' &amp; '+(Object.keys(wOpts).length-1)+' other'+es(Object.keys(wOpts).length-1)
            : '';
//        $('#displayWeaponWieldOptionSkillKey').html('<span style="font-weight:bold">'+skillKey+TLsuff+spec+'</span>'++more);
        var optSkill = Skills[skillKey];
        var optSkillPrint = (skillKey.match('DX')) ? skillKey : optSkill.print();
        var skillblurb = '<span style="font-weight:bold">'+optSkillPrint+TLsuff+spec+'</span> skill'+more+'';
        $('#displayWeaponWieldOptionSkillKey').html(skillblurb);
        break;  // show only first wieldOption stats
    }
    document.getElementById('displayWeaponDamage').innerHTML = dmgSumms.join(', ');

    // once a ST is specified for a bow or whatever, should the damage get specific?

    if( Weapon.weaponST ) {
        document.getElementById('displayWeaponSTmenu').style.visibility = 'visible';
        document.getElementById('selectWeaponST').innerHTML
            = makeNumberOptions( minST, maxST, '          ', ch.ST(), false );
    }

    // some quality choices should not be available for some weapon groups
    var options = [];
    for( var opt=0; opt<qualities.length; opt++ ) {
        var sel = (opt==Weapon.quality || ( Weapon.quality==null && opt=='' ) ) ? ' selected="selected"' : '';
        // console.log("[showWeaponInfoInDialog] populating quality group menu:\n  opt: "+opt+"\n  qualGP: "+qualGp);
        if( ( !qualGp || ( qualGp && qualGp.match(/other|natural/) ) ) && opt!=1 ) continue;
        if( opt>2 && qualGp && !qualGp.match(/edge|blade|gun/) ) continue;
        if( qualGp && qualGp.match(/bow/) && opt==0 ) continue;
        //  console.log("[showWeaponInfoInDialog] pushing quality group option:\n  "+qualities[opt]);
        options.push('<option value="'+opt+'"'+sel+'>'+qualities[opt]+'</option>');
    }
    document.getElementById('selectWeaponQuality').innerHTML = options.join("\n            ");

    // echo stats in custom form
    document.getElementById('customWeaponItemName').value = name;
    document.getElementById('customWeaponItemDescription').value = description;
    document.getElementById('customWeaponItemCost').value = cost;
    document.getElementById('customWeaponItemCost').title = ( Weapon.quality==1 ) ? '' : 'Cost has been adjusted for quality.';
    document.getElementById('customWeaponItemWeight').value = weight;
    document.getElementById('customWeaponItemShots').value = shots || '';
    document.getElementById('customWeaponItemBulk').innerHTML
        = makeNumberOptions( -10, 0, '          ', bulk, true );
    document.getElementById('customWeaponItemQualGp').innerHTML
        = makeSelectListOptions( QualityEffectGroupOptionsList, qualGp ).join("\n                    ")+"\n                  ";
    document.getElementById('customWeaponItemTL').innerHTML
        = makeSelectListOptions( TechLevelOptionsList, TL ).join("\n                    ")+"\n                  ";
    document.getElementById('customWeaponItemLC').innerHTML
        = makeSelectListOptions( LegalityClassOptionsList, LC ).join("\n                    ")+"\n                  ";
    // weaponST, shots?
    document.getElementById('customWeaponItemNotes').value = (Weapon.notes) ? Weapon.notes.join("\n") : '';
    // echo wield option values too
    var row = 1;
    for( var optName in Weapon.wieldOptions ) {
  //    alert('option '+optName+', row: '+row);
        for( var opt=0; opt<Weapon.wieldOptions[optName].length; opt++ ) {
            addNewAttackOptionRow( optName, row, Weapon.wieldOptions[optName][opt] );
            row++;
        }
    }

    // personalize and activate the Submit button
    document.getElementById('selectWeaponSubmit').innerHTML
        = 'take <em id="selectWeaponSubmitName" style="max-width:15em; text-overflow:ellipsis">'+plural(name,document.getElementById('selectWeaponAmount').value)+'</em>';
    document.getElementById('selectWeaponSubmit').disabled = null;
}
function loadWeaponFromDialog() {
    ch = document.loadedCharacter;
    // get form inputs
    var weaponName =   document.getElementById('selectWeaponMenu').value;    // = name of weapon
    var weaponNum  = 1*document.getElementById('selectWeaponAmount').value;
    var weaponST   = 1*document.getElementById('selectWeaponST').value;
    var weaponQual = 1*document.getElementById('selectWeaponQuality').value;
//	alert("[loadWeaponFromDialog] weapon qual: "+weaponQual);
    var weaponName, weaponWeight, weaponCost, weaponCostAdd, weaponTL, weaponLC, weaponBulk, weaponShots, weaponNote, weaponQualGp;
    weaponCostAdd = null;
    var custom = ( document.getElementById('customWeaponTable').style.display!='none' ) ? true : false;
    if( custom ) {
        weaponName    =   document.getElementById('customWeaponItemName').value;
        weaponWeight  = 1*document.getElementById('customWeaponItemWeight').value;
        weaponCost    = 1*document.getElementById('customWeaponItemCost').value;
        weaponCostAdd = 1*document.getElementById('customWeaponItemAddedCost').value;
        weaponLC      = 1*document.getElementById('customWeaponItemLC').value;
        weaponTL      = 1*document.getElementById('customWeaponItemTL').value;
        weaponBulk    = 1*document.getElementById('customWeaponItemBulk').value;
        weaponShots   =   document.getElementById('customWeaponItemShots').value;
        weaponQualGp  =   document.getElementById('customWeaponItemQualGp').value;
        weaponDesc    =   document.getElementById('customWeaponItemDescription').value;
        weaponNotes   =   document.getElementById('customWeaponItemNotes').value;
        // adjust if prefs are set to a non-English measure system
        var unitsPref = ch.preferences.units.measure;
        if( unitsPref.match(/english/i) ) {
            if( unitsPref.match(/mks/i) ) {
                weaponWeight = weaponWeight*2.2;
            }
            if( unitsPref.match(/cgs/i) ) {
                weaponWeight = weaponWeight/454;
            }
        }
    }
    // validate inputs
    if( !weaponName )      { alert("Please select a weapon."); return false; }
    if( isNaN(weaponNum) ) { alert("The 'How many' input must be a number."); return false; }
    if( custom ) {
        if( isNaN(weaponWeight) ) { alert("The weight must be a number."); return false; }
        if( isNaN(weaponCost) )   { alert("The cost must be a number."); return false; }
        if( isNaN(weaponCostAdd) ){ alert("The added cost must be a number."); return false; }
    }
    // other numerical inputs are select lists

    // hide the selectWeaponDialog
    document.getElementById('selectWeaponDialog').style.display = 'none';

    // make the new weapon item
    var newWeapon = {};
    if( custom ) {
        // instantiate a new Weapon equipment object
        newWeapon = new Weapon( weaponName, weaponWeight, weaponCost, weaponTL, weaponLC, weaponBulk, weaponQualGp );
      //  alert("[loadWeaponFromDialog] newly instantiated custom weapon:\n"+JSONstring.make(newWeapon));
        // attach wield/attack options
        var wieldOptions = {};
        for( var rid=1; rid<=100; rid++ ) {
            if( !document.getElementById('customWeaponAttackOption'+rid+'SkillKey') ) continue;
            var option = {};
            option.title    =   document.getElementById('customWeaponAttackOption'+rid+'Title').value;
            option.hands    =   document.getElementById('customWeaponAttackOption'+rid+'Hands').value;
            option.strength = 1*document.getElementById('customWeaponAttackOption'+rid+'ST').value; // allow text?
            var base = document.getElementById('customWeaponAttackOption'+rid+'DmgBase').value;
            option.damage   = {
                base: ( isNaN(base) ) ? base : 1*base,
                mods: 1*document.getElementById('customWeaponAttackOption'+rid+'DmgMods').value,
                type: document.getElementById('customWeaponAttackOption'+rid+'DmgType').value
            };
            var maxDam = document.getElementById('customWeaponAttackOption'+rid+'MaxDmg').value;
            if(maxDam) option.maxDamage = maxDam;
            var note   = document.getElementById('customWeaponAttackOption'+rid+'note').value;
            if( note ) option.note = [note];
            // localize melee/ranged form values and conditionally attach them
            if( document.getElementById('customWeaponAttackOption'+rid+'reach').disabled ) {
                var rngFrmST =   document.getElementById('customWeaponAttackOption'+rid+'rangeFromST').checked;
                var maxDmRng = 1*document.getElementById('customWeaponAttackOption'+rid+'maxDmgRange').value;
                var hlfDmRng = 1*document.getElementById('customWeaponAttackOption'+rid+'hlfDmgRange').value;
                var snapShot = 1*document.getElementById('customWeaponAttackOption'+rid+'SS').value;    // 3rd edition only
                var accuracy =   document.getElementById('customWeaponAttackOption'+rid+'Acc').value;
                var rof      =   document.getElementById('customWeaponAttackOption'+rid+'RoF').value;
                var recoil   = 1*document.getElementById('customWeaponAttackOption'+rid+'Rcl').value;
                if( rngFrmST ) option.rangeBasedOnST = rngFrmST;
                if( hlfDmRng ) option.halfDamageRange = hlfDmRng;
                if( maxDmRng ) option.maximumRange = maxDmRng;
                if( snapShot ) option.snapShot = snapShot;
                if( accuracy ) option.accuracy = accuracy;
                if(   rof    ) option.rateOfFire = rof;
                if(  recoil  ) option.recoil = recoil;
            }
            else {
                var reach    =   document.getElementById('customWeaponAttackOption'+rid+'reach').value;
                var pryBonus =   document.getElementById('customWeaponAttackOption'+rid+'parryBonus').value;
                if(  reach  )  option.reach = reach;
                if( pryBonus ) option.parryBonus = pryBonus;
            }
            //   alert(JSONstring.make(option));
            // then push this option into a wield option group (make a new one if needed)
            var skillKey    =   document.getElementById('customWeaponAttackOption'+rid+'SkillKey').value;
            if( !wieldOptions[skillKey] ) wieldOptions[skillKey] = [];
            wieldOptions[skillKey].push( option );
        }
        newWeapon.wieldOptions = wieldOptions;
        if( weaponShots ) { newWeapon.shots = weaponShots; }
        if( weaponCostAdd ) { newWeapon.addedCost = weaponCostAdd; }
        if( weaponDesc ) { newWeapon.description = weaponDesc; }
        if( weaponNotes ) newWeapon.notes = weaponNotes.split("\n");
    }
    else {
        // clone the item from the library
        newWeapon = Weapons[weaponName];
      //  alert("[loadWeaponFromDialog] newly instantiated standard weapon:\n"+JSONstring.make(newWeapon));
    }
    if( weaponST )  newWeapon.weaponST = weaponST;
    newWeapon.quality = weaponQual;
    if( weaponQual != 1 ) {
    	  if(!newWeapon.description) newWeapon.description = qualities[weaponQual]+' quality';
    	  else newWeapon.description += ', '+qualities[weaponQual]+' quality';
        if( custom ) {
            // need to 'un-actual' the cost found, if it is modified for quality
            var savedAddedCost = newWeapon.addedCost;
            newWeapon.addedCost = 0;    // temporarily zero the added cost, to isolate the effect of quality on actual cost
          //  alert('[loadWeaponFromDialog] adjusting custom cost for quality; ×'+newWeapon.cost/actualCost(newWeapon));
            newWeapon.cost *= newWeapon.cost/actualCost(newWeapon);
            newWeapon.addedCost = savedAddedCost;
        }
    }
    newWeapon.number  = weaponNum;
  //  alert("[loadWeaponFromDialog] configured weapon to be attached to character:\n"+JSONstring.make(newWeapon));

    /* attach weapon object to loaded Character object */
    // alert(JSONstring.make(ch.weapons));
    // make this object distinct from all previous members
 //   newWeapon.instance = ch.weapons.length;
    // push weapon object onto weapon and default collection arrays
    // alert(JSONstring.make(newWeapon));
    /*  Whoa.
        In order to get the 'same' object to show up twice in the array, instead of a (JSONcirc) reference,
        you have to refresh the web page between adding the two items.  What's happening?
    */
    ch.weapons.push( newWeapon );
    ch.collections.default.push( newWeapon );

    // cause character to be reloaded so that the new equipment becomes visible
    loadCharacter( ch, 'Add Weapon' );
    selectWeaponDialog();
}

function selectWieldOptionsDialog( weaponObj, id ) {
   // alert(JSONstring.make(weaponObj));

    // blank all supplementary input divs (so previously-written contents don't persist)
    document.getElementById( 'selectWieldSkillMenu' ).innerHTML = '';
    document.getElementById('wieldOptionsWeaponName').innerHTML = weaponObj.name;
    document.getElementById('displayWieldSkillLevel').innerHTML = '';

    // loop over items in the wieldOptions object to fill menu options
    var selectWieldSkillMenuOptionsHTML = new Array('');
    for( var optName in weaponObj.wieldOptions ) {
        var option = weaponObj.wieldOptions[optName];   // used?
        // should I skip options with incompatible rulesets?  If I do, it will mess up assumptions about selectedIndex in the dialog.  Make these options disabled?
        var chSkill = document.loadedCharacter.getSkill(optName);
        var defaultNotice = '';
        var name;
        if( chSkill ) {
            name = chSkill.name;
        }
        else {
            // if ch doesn't have this skill, put a notice next to this menu option
            defaultNotice = ( !Skills.hasOwnProperty(optName) ) ? '' : ' (default level)';
            name = optName;
        }
        selectWieldSkillMenuOptionsHTML.push('<option value="'+optName+'">'+name+defaultNotice+'</option>');
        // maybe all such filters should be switchable/filtered -
        // i.e., a checkbox to include/exclude ruleset incompatible options, or skills the character does not have?
    }
    document.getElementById('selectWieldSkillMenu').innerHTML
        = selectWieldSkillMenuOptionsHTML.join("\n            ")+"\n          ";

    // wield skill specializations?  hasn't come up yet

    // filtering (tech level, if nothing else)

    if(id) document.selectWieldOptionsForm.id.value = id;
    document.getElementById('selectWieldOptionsSubmit').value = 'use these options';
    document.getElementById('selectWieldOptionsSubmit').disabled = 'disabled';
    setupDialog('selectWieldOptionsDialog');

    return false;
}
function showWieldSkillInfoInDialog( SkillName ) {
    // localize vars
    var selectedSkill = document.loadedCharacter.skills[SkillName];
    var name = ( selectedSkill ) ? selectedSkill.name : SkillName;

    // get the parry using this skill
    var collItemID = document.selectWieldOptionsForm.id.value;
    var eqCollection = document.loadedCharacter.collections.equipped;
    var weaponObj = document.loadedCharacter.collections[eqCollection][collItemID];
   // var parry = document.loadedCharacter.parry( weaponObj, SkillName );

    // populate divs
   // document.getElementById('displayWieldSkillLevel').innerHTML = 'parry: '+parry;

    // personalize and activate the Submit button
    document.getElementById('selectWieldOptionsSubmit').value = 'use '+name+' skill';
    document.getElementById('selectWieldOptionsSubmit').disabled = null;
}

function makeEditListTableRows( itemsArray, indent ) {
    let rows = [indent];
    let directives = [];
    for( let i=0; i<itemsArray.length; i++ ) {
        let cells = [];
  //      let z = ( z ) ? '' : ' class="zrow"';
        let item = itemsArray[i];

        let name = item.name;
        let spec = (item.specialization) ? ': '+item.specialization : '';
        let TL   = (item.TL && ch.preferences.display.TLinfo) ? '/TL'+item.TL : '';
        let detl = (item.detail) ? item.detail+' ' : '';
        let nmbr = (item.number && item.number>1) ? item.number+' ' : '';
        if( item.number ) name = plural(name,item.number);
        let bkgd = '';
        let nameCell = '<td>'+nmbr+detl+name+TL+spec+'</td>';
        if( item.hasOwnProperty('line') ) {
            let cellStyle = '';
            let cellContent = '';
            let cellTitle = 'double-click to remove this formatting item from the list';
            if( item.line ) {
                cellContent = item.line;
                cellStyle = "font-weight:bold"
                bkgd = "background-color:#ede";
            }
            else {
                cellContent = '[&emsp;spacer row&emsp;]';
                cellStyle = "text-align:center"
                bkgd = "background-color:#dee";
            }
            nameCell = '<td style="'+cellStyle+'" title="'+cellTitle+'" ondblclick="removeItemFromList(this.parentNode.id); return false;">'+cellContent+'</td>';
        }
        else if( item[1] && item[1].name ) {
            nameCell = '<td><b>reference to collection (<i>'+item[0]+'</i>)</b></td>';
                bkgd = "background-color:#ded";
            // initialize directives array
        }
        else if( typeof item != 'object' ) {
            nameCell = '<td style="display:none">[directive: '+item+']</td>';
            // push something onto directives array
    //        nameCell = '<td>[directive: '+item+']</td>';
        }
        else if( item.hasOwnProperty('inTemplate') && item.hasOwnProperty('physMntlScl') ) {
            nameCell = '<td style="display:none">[template trait: '+item+']</td>';
        }
        else if( item.hasOwnProperty('templateTrait') ) {
            let mTrait = item.key;
            nameCell  = '<td style="background-color:#eed">'+name+' <i>meta-trait</i><ul style="padding:0 0 0 5px;margin:0;list-style-position:inside;list-style-type:none;background-color:#fff">';
            // loop here to pull out subtraits
            for( let j=0; j<itemsArray.length; j++ ) {
                let pSubTrait = itemsArray[j];
                if( !pSubTrait.hasOwnProperty('inTemplate') ) continue;
                if( pSubTrait.inTemplate==mTrait )
                    nameCell += '<li>'+pSubTrait.name+'</li>';
            }
            nameCell += '</ul></td>';
        }
        cells.push(nameCell);
        rows.push('  <tr id="item'+i+'" class="underlined" style="'+bkgd+'">'+cells.join()+'</tr>');
    }
    rows.push('');
    return rows.join("\n"+indent);
}
function getListFromPath( listPath, cont ) {
    // console.log("[getListFromPath] getting "+listPath+" list");
    var ch = document.loadedCharacter;
    var List = ch[listPath];
    var listContainer = ch;
    // handle listPaths such as "collections:default", which means use ch['collections']['default']
    if( listPath.match(/:/) ) {
        var listTokens = listPath.split(/:/);
        listObj = ch[listTokens[0]];
        for( var i=1; i<listTokens.length; i++ ) {
            listContainer = listObj;
            var token = listTokens[i];
            listObj = listObj[token];
        }
        List = listObj;
    }
    return ( cont ) ? listContainer : List;
}
function openEditListDialog( listPath ) {
    var ch = document.loadedCharacter;
  //  console.log("[openEditListDialog] listPath: "+listPath);
    var listLabel = listPath.split(/:/).slice(-1)[0];   // this awkward statement extracts the last path token
    setupDialog('editListDialog');
    var List = getListFromPath( listPath );  // alert(List.length);
    var listOptionsHTML = ( List.length )
                        ? makeEditListTableRows( List, '                ' )
                        : '<tr><td style="text-align:center">no '+listLabel+' found</td></tr>';
    document.getElementById('editListTableBody').innerHTML  = listOptionsHTML;
    $( function() {
        $( "#editListTableBody" ).sortable({ items:"tr:not(.nailedDown)", distance: 5 });
        // console.log('selectable firing');
        // $( "#editListTableBody" ).selectable({
        //     filter: "td",
        //     selected: function( event, ui ) { console.log('selected'); }
        // });
    } );
    document.getElementById('editListType').value = listPath;
		document.getElementById('addSpacerButton').setAttribute(
        'onclick', "addFormatItemToList('"+listPath+"'); return false;"
    )
		document.getElementById('addHeadingButton').setAttribute(
        'onclick', "addFormatItemToList('"+listPath+"',true); return false;"
    )
    // hack to add button to switch between Skills and Spells lists
    if( listPath.match(/skills/i) ) {
        $('#editOtherListButton').click(
            function() {
                openEditListDialog('spells')
            }
        );
        $('#editOtherList').html('Spells');
        $('#editOtherListButton').show();
    }
    else if( listPath.match(/spells/i) ) {
        $('#editOtherListButton').click(
            function() {
                openEditListDialog('skills')
            }
        );
        $('#editOtherListButton').show();
        $('#editOtherList').html('Skills');
    }
    else {
        $('#editOtherListButton').unbind('click');
        $('#editOtherListButton').hide();
    }
    // insert list label into dbox header
    var headerListLabel = (listPath.match(/:/)) ? listPath.split(/:/).reverse().join(' ') : listLabel;
    var titleCaseListLabel = headerListLabel.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    $('#listName').html(titleCaseListLabel);
    // stick the listPath into the dialog hidden field
    $('#editListType').val(listPath);
    return false;
}
function addFormatItemToList( listPath, text ) {
    var List = getListFromPath( listPath );
    var listContainer = getListFromPath( listPath, true );
    var listLabel = listPath.split(/:/).slice(-1)[0];   // this awkward statement extracts the last path token
    var item = {};
    if( text && !(typeof text==='string') )
        text = prompt("Heading text:");
    item.line = ( text ) ? text : false;
    List.push( item );
    listContainer[listLabel] = List;
    openEditListDialog( listPath );
}
function removeItemFromList( itemID ) {
    var listPath = $('#editListType').val();
    // alert(listPath+', '+itemID);
    // use args to identify list, and item in list
    // var list = ch[listPath];
    var List = getListFromPath( listPath );
    var index = Number(itemID.substr(4));
    var item = List[index];
   // alert(JSONstring.make(item));
    if( confirm("remove this formatting item?") ) {
        // use splice to cut that item out of the List
        List.splice(index,1);
        openEditListDialog(listPath);
    }
}
function applyListEdits() {
    var ch = document.loadedCharacter;
    var listPath = document.getElementById('editListType').value;
    var listLabel = listPath.split(/:/).slice(-1)[0];
    var ids = [];
    $("#editListTableBody tr").each(
      function() {
          var id = Number(this.id.substr(4));
          ids.push(id);
      }
    );
  //  alert(ids);
    var oldList  = getListFromPath( listPath );
    // get directives (and items WITH directives), and inTemplate traits
    var directivesHash = {};
    var directives = [];
    var templateTraitsHash = {};
    for( var n=0; n<oldList.length; n++ ) {
        var listItem = oldList[n];
  //      alert( typeof listItem );
        if( n>0 && typeof listItem!='object' ) { // alert('directive: '+listItem);
            directives.push( listItem );
        }
        else if( directives.length>0 ) { /* last item was a directive, but this one isn't (i.e., this is a target) */
  //        alert('target: '+listItem.name);
            directivesHash[ listItem.name+'_'+n ] = directives;
            directives = [];
        }
  //      alert("was this item a directive?\n"+lastItemDir);
        // else
        if( listItem.hasOwnProperty('inTemplate') ) {
            var templateIn = listItem.inTemplate;
            // if( trait-indicated-by-inTemplate has 'multiple' attribute ) templateIn += trait-indicated-by-inTemplate.multiple    // necessary to handle, say, 4e Iconic C-31's pair of Weapon Pods
            if( templateTraitsHash[templateIn] ) templateTraitsHash[templateIn].push( listItem );
            else templateTraitsHash[templateIn] = [ listItem ];
        }
    }
 //   alert(JSONstring.make(directivesHash));
 //   alert(FormatJSON(templateTraitsHash));
    var listContainer = getListFromPath( listPath, true );
    var newList = [];
    for( var i=0; i<ids.length; i++ ) {
        var index = ids[i];
        if( index>0 && typeof oldList[index]!='object' ) continue;        // if oldList[index] is a directive, skip it
   //     alert("looking for "+oldList[index].name+'_'+index+" in the directivesHash");
        // if oldList[index] is a directive target, prepend the appropriate directive items
        if( directivesHash[ oldList[index].name+'_'+index ] ) newList = newList.concat( directivesHash[ oldList[index].name+'_'+index ] );
        newList.push( oldList[index] );
    }
   // alert( JSONstring.make(newList) );
    listContainer[listLabel] = newList;
    loadCharacter( ch, 'list edit' );
    openEditListDialog( listPath );
}

function toggleInput( chbox, elmts ) {
 // alert(elmts);
    var vis = (chbox.checked) ? 'visible' : 'hidden';
    // var dis = (chbox.checked) ? 'block' : 'none';
    for( var i in elmts ) {
        var elmt = elmts[i];
 //       if( elmt.style.visibility ) {
   //         alert("changing '"+elmt.style.visibility+"' to '"+vis+"'");
            elmt.style.visibility = vis;
 //       }
        // 'display' is a problem - need to know whether to toggle between 'none' and 'block', 'inline-block', 'table-cell', etc.
        // if( elmt.style.display ) {
        //     alert("changing '"+elmt.style.display+"' to '"+dis+"'");
        //     elmt.style.display = dis;
        // }
    }
}

function toggleDisplayCB( chbox, elmts ) {
    var dis = (chbox.checked) ? 'block' : 'none';
    for( var i in elmts ) {
        var elmt = elmts[i];
        elmt.style.display = dis;
    }
}

function toggleViewCB( chbox, style, opt, elmts ) {
    var off = ( style.match('vis') ) ? 'hidden' : 'none';
    var view = (chbox.checked) ? opt : off;
    for( var i in elmts ) {
        var elmt = elmts[i];
        elmt.style[style] = view;
    }
}

function toggleFieldset( button, target ) {
    var val = button.value;
    if( val=='+' ) {
        button.value='-';
        document.getElementById(target).style.display
            = ( target.match(/table/i) )
            ? 'table'
            : 'block';
    }
    if( val=='-' ) {
        button.value='+';
        document.getElementById(target).style.display='none';
    }
}

function toggleFieldset2( button, target ) {
   // alert('fired');
    var img = button.src;
    if( img.match(/plus/) ) {
        button.src='../images/minus_blue.gif';
        document.getElementById(target).style.display
            = ( target.match(/table/i) )
            ? 'table'
            : 'block';
    }
    if( img.match(/minus/) ) {
        button.src='../images/plus_blue.gif';
        document.getElementById(target).style.display='none';
    }
}

function toggleDisplay( button, target, displayStyle ) {
   // alert('fired');
    var img = button.src;
    if( img.match(/plus/) ) {
        button.src='../images/minus_blue.gif';
        document.getElementById(target).style.display=displayStyle;
    }
    if( img.match(/minus/) ) {
        button.src='../images/plus_blue.gif';
        document.getElementById(target).style.display='none';
    }
}

function setDisplay( state, targetID, buttonID, displayStyle ) {
   // alert('fired');
    var button = document.getElementById( buttonID );
    if( state.match(/open/) ) {
        button.src = '../images/minus_blue.gif';
        document.getElementById( targetID ).style.display = displayStyle;
    }
    if( state.match(/close/) ) {
        button.src = '../images/plus_blue.gif';
        document.getElementById( targetID ).style.display = 'none';
    }
}

function toggleVisibility( button, target, visStyle ) {
   // alert('fired');
    var img = button.src;
    if( img.match(/plus/) ) {
        button.src='../images/minus_blue.gif';
        document.getElementById(target).style.visibility=visStyle;
    }
    if( img.match(/minus/) ) {
        button.src='../images/plus_blue.gif';
        document.getElementById(target).style.visibility='hidden';
    }
}

function toggleRemoteFieldset( remoteWindow, button, target ) {
    var img = button.src;
    if( img.match(/plus/) ) {
        button.src='../images/minus_blue.gif';
        remoteWindow.document.getElementById(target).style.display
            = ( target.match(/table/i) )
            ? 'table'
            : 'block';
    }
    if( img.match(/minus/) ) {
        button.src='../images/plus_blue.gif';
        remoteWindow.document.getElementById(target).style.display='none';
    }
}

/*-------------------------- end Menu bar functions --------------------------*/


/*---------------------- Character rendering functions -----------------------*/

function click2useToggle( itemID, wieldSkill ) {
    var ch = document.loadedCharacter;
    var chBody = ch.body;
    var equippedCollectionKey = ch.collections.equipped;
    var equippedCollection = ch.collections[equippedCollectionKey];
    var eItem = equippedCollection[itemID];
    // alert(JSONstring.make(eItem));
    var type =  'equipment';
    if( eItem.wieldOptions )  { type = 'weapon'; }
    else if( eItem.location ) { type = 'armor'; }
    else if( eItem.hasOwnProperty('HP') ) { type = 'shield'; }
    var prevItem = ( equippedCollection[itemID-1] ) ? equippedCollection[itemID-1] : false;
    var penPrevItem = ( equippedCollection[itemID-2] ) ? equippedCollection[itemID-2] : false;

    var changeText = '';

    if( type=='armor' ) {
        if( prevItem=='wear' ) {    // need to take item off
            ch.takeOffArmor( itemID );
            changeText = 'Remove Armor';
        }
        else {                // need to put item on
            ch.putOnArmor( itemID );
            changeText = 'Put On Armor';
        }
    }
    else if( type=='shield' ) {
        if( prevItem=='ready' ) {    // need to take item off
            ch.putAwayShield( itemID );
            changeText = 'Put Away Shield';
        }
        else {      // wield shield
            ch.readyShield( itemID );
            changeText = 'Wield Shield';
        }
    }
    else {  // assume type is 'weapon'
        if( penPrevItem=='wield' ) {     // need to put it away
            ch.putAwayWeapon( itemID );
            changeText = 'Put Away Weapon';
        }
        else {              // need to wield it
            if( ch.hasTrait('Ambidexterity') ) {
              //  console.log("[click2useToggle] ch is ambidextrous; calling selectWieldOptionsDialog");
                if( !wieldSkill ) { selectWieldOptionsDialog( eItem, itemID ); return; }
                selectHand( eItem, wieldSkill );
            }
            ch.wieldWeapon( itemID, wieldSkill );
            changeText = 'Wield Weapon';
        }

    }   // end 'weapon' branch

    loadCharacter( ch, changeText );
}
function selectHand( Wpn, wieldSkill ) {
    var hand = Wpn.wieldOptions[wieldSkill][0].hands;
    if( hand=='both' || hand=='none' ) return;
    var msg = "This "+Wpn.name+" is wielded using the "+wieldSkill+" skill, in the "+hand+" hand.  Click 'OK' to wield this way, or 'Cancel' to switch to the other hand.";
    if( !confirm(msg) ) {
        Wpn.wieldOptions[wieldSkill][0].hands = (hand=='dom') ? 'off' : 'dom';
    }
    // console.log("[selectHand] "+Wpn.wieldOptions[wieldSkill][0].hands);
    return;
}


/* display */

/*
    Think of loadCharacter as a function that takes the set of 'facts' that make up the
    Character object and injects them into something like a form, which is the character sheet.
    loadCharacter should handle passing (the right pieces of) the object to the right subroutines,
    based on which character sheet is active.
    Presentation-specific stuff, like how many rows are in a certain kind of table, needs to be
    abstracted in some fashion.  Specific CSS, for things like wielded weapons or the encumbrance
    row where the character falls with the current configuration, need to be abstract too; i.e.,
    adding or removing a class instead of saying 'background-color:#DDEEFF;'.
*/
function loadCharacter( chToLoad, changeText ) {       // console.log(chToLoad);


    var stamp = new Date().getTime();
    var subStamp = stamp;
    var startTime = stamp;
    if( window.console && reportLevel ) { console.log("[loadCharacter] begin load of character "+chToLoad.name+": "+stamp); }

    // cycling through the JSON intermediate here fixes problems with equipment object list handling
    var chJSON = JSONstring.make(chToLoad);   // console.log(chJSON);
    ch = newCharacterFromJSON(chJSON);   // this now does TWO things: the JSON recycle, and setting the *global* ch var equal to chToLoad
    // console.log("[loadCharacter] right after JSON recycle, ch is:\n"+JSONstring.make(ch) );
    if( window.console && reportLevel )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] (re-)instantiated Character object; loading "+ch.description.name+": "+(newStamp-stamp)+' ms'); stamp = newStamp; }

    if( !ch ) { alert("no valid character to load"); return; }

    // attach ch object to document (if it is delivered from, say, newCharacterFromJSON, it isn't already attached)
    document.loadedCharacter = ch;

    // create a local Group of language skills for 3e characters
    if( !ch.groups.KnownLanguages ) {
        ch.groups.KnownLanguages = [];
        ch.groups.KnownLanguages.push();
    }

    // attach local Modifier, Adjustment, Prerequisite, etc. linking objects to the corresponding library objects
    // also attach *custom* skills and spells found locally
    var libraryObjectNames = ['Modifiers','Adjustments','Prerequisites','Defaults','Templates','Skills','Spells','Groups'];
    for( var i in libraryObjectNames ) {
        var objName = libraryObjectNames[i];
        try { eval(objName); } catch(e) { continue; }   // for 'lite' libraries, which may not have Templates, Prereqs, etc.
        var libraryObj = eval(objName);
        //  alert("keys currently in the "+objName+" library object:\n"+Object.keys(libraryObj)+"\n");
        var propName  = objName.toLowerCase();
        //  console.log(propName+" library object:\n"+JSONstring.make(libraryObj));
        if( propName.match(/spells/i) ) propName = 'skills';  // because there is no Character.spells sub-object now (we still need to look through the Spells library object though)
        for( var m in ch[propName] ) {    // these are (indices of) objects inside ch.skills, ch.modifiers, ch.adjustments, etc.
           // alert('looking at character.'+propName+' entry '+m+" in:\n"+JSONstring.make(ch[propName]));
            if( m==undefined || m=="undefined" ) continue;
            var itemObj = ch[propName][m];
            if( itemObj.hasOwnProperty('line') ) continue;
            if( itemObj.key ) m = itemObj.key;    // now doing this for ALL objects with keys; addresses problems with doubled Adjustments and such
            if( libraryObj.hasOwnProperty(key) && !propName.match(/group/i) ) {
                // if we are looking at skills or spells, skip those that exist in the library object; we don't want to overwrite these
                if( propName.match(/skill|spell/i) ) continue;
                // store the property that is about to be overwritten, so that you can roll back the change
                eval('Overridden'+objName)[m] = libraryObj[m];
            }
            if(  itemObj.spell && objName.match(/skill/i) ) continue;  // don't attach custom spells to the Skills library object
            if( !itemObj.spell && objName.match(/spell/i) ) continue;  // don't attach anything but spells to the Spells library object
           // console.log('attaching '+propName+'.'+m+' to '+objName+":\n"+JSONstring.make(itemObj));
            if( propName.match(/group/i) ) {
                // in here, itemObj is a list
                //  console.log("modifying the Groups["+m+"] array, which looks like this:\n"+Groups[m]);
                if( Groups[m] ) {   // This Group already exists; need to add to it from the character itemObj instead of just (re)assigning it.
                    // if( m=="MagicColleges")
                        // console.log("[loadCharacter] Attaching local "+m+": addToGroup( "+m+", "+itemObj+" )");
                    addToGroup( m, itemObj );
                    // If this Group doesn't already exist in the library, a simple assignment as below is all that is needed to create it there.
                }
                else {
                    //if( libraryObj.hasOwnProperty('undefined') ) { console.log('in loop and !Groups['+m+'] branch; about to attach itemObj and push onto Groups'); console.log( libraryObj.undefined ); }
                    libraryObj[m] = itemObj;    // simple assignment works if this is a new group
                    // DO NOT try to add new spell colleges here; that's done in the supplemental library already
                    // but if I don't do it here, they don't show up in the Colleges report unless the library is currently loaded
                }
              //  console.log("now it looks like this:\n"+Groups[m]+"\n\n");
            }
            else {
                // console.log('in '+propName+' loop; about to attach itemObj '+m); console.log(itemObj);
                libraryObj[m] = itemObj;
            }
        }
        if( libraryObj.hasOwnProperty('undefined') ) { delete libraryObj.undefined; }
        //if( propName=="adjustments" )
        //console.log(propName+" library object:\n"+JSONstring.make(libraryObj));
    }
    //alert(Object.keys(Templates));

    // place character name in <title> tag of page
    document.title = /*'GURPS: '+*/ch.description.name;

    if( ch.preferences ) applyPrefs();

    /* load description and game information */
    if( ch.gameInfo.ruleset==sheetrs ) {
        $("#edition_watermark").css('visibility','hidden');
        $("#edition_watermark").removeAttr('title');
    }
    else {
        $("#edition_watermark div").html( ch.gameInfo.ruleset+' character' );
        $("#edition_watermark").attr('title', ch.description.name+' is an '+ch.gameInfo.ruleset+' character; this is a(n) '+sheetrs+'-oriented character sheet.\nWatch for inconsistencies.');
        $("#edition_watermark").css('visibility','visible');
    }
    // I'm just going to check each of these individually, rather than do sheet-specific subs.
    if( document.getElementById(   'nameBox'   ) ) {
        document.getElementById(   'nameBox'   ).value = ch.description.name;
    }
    let nbi = 2;
    while( document.getElementById('nameBox'+nbi) ) {    // note this one writes to innerHTML instead of value (not an editable field, on the 2-page e4 c-sheet)
        document.getElementById('nameBox'+nbi++).innerHTML = ch.description.name;
    }
    if( document.getElementById(  'playerBox'  ) ) {
        document.getElementById(  'playerBox'  ).value = ch.playerInfo.name;
    }
    // turn this into a loop like for nameBox# above
    let pbi = 2;
    while( document.getElementById('playerBox'+pbi) ) {
        document.getElementById('playerBox'+pbi++).innerHTML = (ch.playerInfo.name) ? ch.playerInfo.name : '&nbsp;';
    }
    if( document.getElementById( 'campaignBox' ) ) {
        document.getElementById( 'campaignBox' ).value = (ch.gameInfo.campaign) ? ch.gameInfo.campaign : '';
    }
    if( document.getElementById(    'GMBox'    ) ) {
        document.getElementById(    'GMBox'    ).value = (ch.gameInfo.GM) ? ch.gameInfo.GM : '';
    }
    if( document.getElementById( 'editionBox'  ) ) {
        document.getElementById( 'editionBox'  ).innerHTML = ch.edition();
    }
    var autoAdjustBuildMsg = ( ch.preferences.autoAdjustBuild ) ? "auto-adjustment of height/weight is ON\n  (go to Edit→Preferences to turn off)" : '';
    if( document.getElementById(  'heightBox'  ) ) {
        var cHt = ch.description.height;
        if( autoAdjustBuildMsg && isNaN(cHt) ) autoAdjustBuildMsg += "\nNB: auto-adjustment may not work because height is non-numeric";
      //  console.log("[loadCharacter heightBox] ch.description.height="+cHt);
        $('#heightBox').val( isNaN(cHt) ? cHt : inches2string(cHt) );
        $('#heightBox').parent().attr('title',autoAdjustBuildMsg);
    }
    if( document.getElementById(  'weightBox'  ) ) {
        $('#weightBox').val( ch.weight()+' '+ch.weightUnit() );
        $('#weightBox').parent().attr('title',autoAdjustBuildMsg);
    }
    if( document.getElementById( 'sizeModBox'  ) ) {
        document.getElementById( 'sizeModBox'  ).value = signed( ch.SM() );
    }
    if( document.getElementById(   'ageBox'    ) ) {
        document.getElementById(   'ageBox'    ).value = ch.description.age;
    }
    if( document.getElementById(   'raceBox'   ) ) {
        document.getElementById(   'raceBox'   ).value = ch.description.race;
    }
    if( document.getElementById('appearanceBox') ) {
        document.getElementById('appearanceBox').value = ch.description.appearance;
        document.getElementById('appearanceBox').innerHTML = ch.description.appearance;
    }
    if( document.getElementById('shortStoryBox') ) {
        document.getElementById('shortStoryBox').value = ch.description.shortStory;
    }
    if( document.getElementById('pointTotalBox') ) {
        document.getElementById('pointTotalBox').value = ch.description.pointTotal;
    }
    if( document.getElementById(  'gameTLBox'  ) ) {
        document.getElementById(  'gameTLBox'  ).value = ch.gameInfo.TL;
    }
    if( document.getElementById(   'dateBox'   ) ) {
        var today = new Date();
        document.getElementById(   'dateBox'   ).innerHTML = today.getDate() +' '+ months[today.getMonth()].substr(0,3) +' '+ today.getFullYear();
    }
    if( document.getElementById('dateCreatedBox') ) {
        document.getElementById('dateCreatedBox').innerHTML = ch.getCreateDate(true);
        document.getElementById('dateCreatedBox').setAttribute( 'title', 'created '+ch.getCreateDate() );
        var n=1;
        while( document.getElementById('dateCreatedBox'+n) ) {
            document.getElementById('dateCreatedBox'+n).innerHTML = ch.getCreateDate(true);
            document.getElementById('dateCreatedBox'+n).setAttribute( 'title', 'created '+ch.getCreateDate() );
            n++;
        }
    }
    if( document.getElementById('characterArt') ) {
        var gender = ( ch.description.gender ) ? ch.description.gender : '';
        if( !gender ) gender=="non";
        var src = ( ch.description.artPath ) ? ch.description.artPath : '../images/'+gender+'.gif';
        loadCharacterArt(src);
    }
    if( ch.description.sequence && document.getElementById('sequenceBox') ) {
        document.getElementById('sequenceBox').value = ch.description.sequence;
    }
    // longer text fields
    if( document.getElementById('statusTextLine1') ) {
        clearMultiLineTextArea('statusText');
        writeMultiLineText( ch.description.statusText, 'statusText' );
    }
    if( document.getElementById('repTextLine1') ) {
        clearMultiLineTextArea('repText');
        var repTextArray = [];
        // loop over traits, collecting reputation details and adding to repText
        for( var tid in ch.traits ) {
            var trait = ch.traits[tid];
            var key   = trait.key;
            if( trait.name ) {
                if( key=='Reputation' ) {
                    var repTextEntryArray = [];
                    for( var rdid in trait.MultipliersArray ) {
                        var multObj = trait.MultipliersArray[rdid];
                      //  if( multObj.text.match(/frequency/i) ) { continue; }
                        repTextEntryArray.push( multObj.text/*+', x'+multObj.value*/ );
                    }
                    repTextArray.push( trait.description+': '+signed(trait.levels)+' from '+repTextEntryArray.join(', ') );
                }
            }
        }
        // then add the repText from the Character description object
        var reputationText = repTextArray.join('; ') + ' '+ch.description.repText;
        writeMultiLineText( reputationText, 'repText' );
    }
    if( document.getElementById('storyLine1') ) {
        clearMultiLineTextArea('story');
        writeMultiLineText( ch.description.story, 'story' );
    }
    if( document.getElementById('storyBox') ) { // use 'value' if storyBox is a textarea (or other input element), use 'innerHTML' if storyBox is a 'contenteditable' div
        if(ch.description.story) {
            document.getElementById('storyBox').value = ch.description.story;
            document.getElementById('storyBox').innerHTML = ch.description.story;
        }
        else if(ch.description.shortStory) {
            document.getElementById('storyBox').value = ch.description.shortStory;
            document.getElementById('storyBox').innerHTML = ch.description.shortStory;
        }
        else {
            document.getElementById('storyBox').value = '';
            document.getElementById('storyBox').innerHTML = '';
        }
    }
    if( document.getElementById('goalsLine1') ) {
        clearMultiLineTextArea('goals');
        writeMultiLineText( ch.description.goals, 'goals', 10 );
    }
    if( document.getElementById('goalsBox') ) {
        if(ch.description.goals)
            document.getElementById('goalsBox').value = ch.description.goals;
        else
            document.getElementById('goalsBox').value = '';
    }
    if( document.getElementById('notesLine1') ) {
        clearMultiLineTextArea('notes');
        writeMultiLineText( ch.description.notes, 'notes' );
    }
    if( document.getElementById('notesBox') ) {
        if(ch.description.notes)
            document.getElementById('notesBox').value = ch.description.notes;
        else
            document.getElementById('notesBox').value = '';
    }
    if( document.getElementById('adventureBox') ) {
        if(ch.description.adventure)
            document.getElementById('adventureBox').value = ch.description.adventure;
        else
            document.getElementById('adventureBox').value = '';
    }
    if( window.console && reportLevel )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] finished loading description and game info: "+(newStamp-stamp)+' ms'); stamp = newStamp; }
 //   alert( 'BMI: '+ch.BMI() );
   // alert("in loadCharacter, finished loading description");
   // subStamp = new Date().getTime();

    /* load attributes info */
    document.getElementById('STbox').innerHTML = ch.ST();
    if(document.getElementById('STpts')) document.getElementById('STpts').value = ch.STpoints();
    document.getElementById('DXbox').innerHTML = ch.DX();
    if(document.getElementById('DXpts')) document.getElementById('DXpts').value = ch.DXpoints();
    document.getElementById('IQbox').innerHTML = ch.IQ();
    if(document.getElementById('IQpts')) document.getElementById('IQpts').value = ch.IQpoints();
    document.getElementById('HTbox').innerHTML = ch.HT();
    let startingHTboxFontSize = document.getElementById('HTbox').style.fontSize;  console.log(startingHTboxFontSize);
    if( ch.gameInfo.ruleset.match('e4') || ch.HT() == ch.HP() ) {
        /* The real switch here should be whether there is a box for HP, or maybe FP, separate from HT */
        /* restore normal font-size? */
    }
    else /*if( ch.gameInfo.ruleset.match('e3') )*/ {
        document.getElementById('HTbox').style.fontSize = (startingHTboxFontSize) ? '24px' : 'smaller';
        document.getElementById('HTbox').innerHTML += '/'+ch.HP();
    }
    if(document.getElementById('HTpts')) document.getElementById('HTpts').value = ch.HTpoints();
    if( window.console && reportLevel )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] finished loading attributes: "+(newStamp-stamp)+' ms'); stamp = newStamp; }
    subStamp = new Date().getTime();
   // alert("in loadCharacter, finished loading attributes");

    /* load secondary characteristics info (None of these even appear on the e3 c-sheet. */
    /*  The e4 sheet can be used to display a e3 character, though, so e4-e3 switches are used. */
    // Hit Points (HP)
    if( document.getElementById('HPbox') ) {
        document.getElementById('HPbox').innerHTML   = ch.HP();
        if( document.getElementById('HPpts') ) {
		        if( ch.gameInfo.ruleset.match('e4') ) {
                document.getElementById('HPpts').onclick = null;
                // make an editable input box
                document.getElementById('HPpts').innerHTML
                    = "\n                  "
                    + '<input type="text" class=" fill-in editable" value="'+ch.attributePoints.HP+'"'
                    + ' title="+/- 2 pts per level"'
                    + ' onChange="loadedCharacter.attPoints(\'HP\',(isNaN(this.value))?0:1*this.value); loadCharacter(loadedCharacter, \'change points\');" />'
                    + "\n                ";
		        }
		        else {  // put values directly in the table cell (has fill-in class, but isn't editable)
		            var ExtraHitPointsCost   = ( ch.hasTrait( 'ExtraHitPoints') )  ? ch.getTrait( 'ExtraHitPoints' ).finalCost() : 0;
		            var ReducedHitPointsCost = ( ch.hasTrait('ReducedHitPoints') ) ? ch.getTrait('ReducedHitPoints').finalCost() : 0;
		            document.getElementById('HPpts').innerHTML
		                = ExtraHitPointsCost + ReducedHitPointsCost;
		            document.getElementById('HPpts').onclick
		                = function() { alert('Adjust Hit Points by taking levels of the Extra Hit Points advantage or Reduced Hit Points disadvantage.') };
		        }
        }
    }
    if( ch.description.currentHP && document.getElementById('hitsTakenBox') ) {
        document.getElementById('currentHPbox').value = ch.description.currentHP;
    }
    if( window.console && reportLevel>1 )
        { var newSubStamp = new Date().getTime(); console.log("    Hit Points done: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }
    // Will
    if( document.getElementById('Willbox') ) {
        document.getElementById('Willbox').innerHTML = ch.Will();
        if( document.getElementById('Willpts') ) {
		        if( ch.gameInfo.ruleset.match('e4') ) {
                document.getElementById('Willpts').onclick = null;
                // make an editable input box
                document.getElementById('Willpts').innerHTML
                    = "\n                  "
                    + '<input type="text" class=" fill-in editable" value="'+ch.attributePoints.Will+'"'
                    + ' title="+/- 5 pts per level"'
                    + ' onChange="loadedCharacter.attPoints(\'Will\',(isNaN(this.value))?0:1*this.value); loadCharacter(loadedCharacter, \'change points\');" />'
                    + "\n                ";
            }
		        else {  // put values directly in the table cell (has fill-in class, but isn't editable)
		            var StrongWillCost = ( ch.hasTrait('StrongWill') ) ? ch.getTrait('StrongWill').finalCost() : 0;
		            var WeakWillCost   = ( ch.hasTrait( 'WeakWill')  ) ? ch.getTrait( 'WeakWill' ).finalCost() : 0;
		            document.getElementById('Willpts').innerHTML
		                = StrongWillCost + WeakWillCost;
		            document.getElementById('Willpts').onclick
		                = function() { alert('Adjust Will by taking levels of the Strong Will advantage or Weak Will disadvantage.') };
		        }
        }
    }
    if( window.console && reportLevel>1 )
        { var newSubStamp = new Date().getTime(); console.log("    Will done: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }
    // Perception
    if( document.getElementById('Perbox') ) {
        document.getElementById('Perbox').innerHTML  = ch.Per();
        if( document.getElementById('Perpts') ) {
		        if( ch.gameInfo.ruleset.match('e4') ) {
                document.getElementById('Perpts').onclick = null;
                // make an editable input box
                document.getElementById('Perpts').innerHTML
                    = "\n                  "
                    + '<input type="text" class=" fill-in editable" value="'+ch.attributePoints.Per+'"'
                    + ' title="+/- 5 pts per level"'
                    + ' onChange="loadedCharacter.attPoints(\'Per\',(isNaN(this.value))?0:1*this.value); loadCharacter(loadedCharacter, \'change points\');" />'
                    + "\n                ";
            }
		        else {  // put values directly in the table cell (has fill-in class, but isn't editable)
		            document.getElementById('Perpts').innerHTML
		                = ( ch.hasTrait('Alertness') ) ? ch.getTrait('Alertness').finalCost() : 0;
		            document.getElementById('Perpts').onclick
		                = function() { alert('Adjust Perception by taking levels of the Alertness advantages.') };
		        }
        }
    }
    if( window.console && reportLevel>1 )
        { var newSubStamp = new Date().getTime(); console.log("    Perception done: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }
    // Fatigue Points (FP)
    if( document.getElementById('FPbox') ) {
        document.getElementById('FPbox').innerHTML   = ch.FP();
        if( document.getElementById('FPpts') ) {
		        if( ch.gameInfo.ruleset.match('e4') ) {
                document.getElementById('FPpts').onclick = null;
                // make an editable input box
                document.getElementById('FPpts').innerHTML
                    = "\n                  "
                    + '<input type="text" class=" fill-in editable" value="'+ch.attributePoints.FP+'"'
                    + ' title="+/- 3 pts per level"'
                    + ' onChange="loadedCharacter.attPoints(\'FP\',(isNaN(this.value))?0:1*this.value); loadCharacter(loadedCharacter, \'change points\');" />'
                    + "\n                ";
            }
		        else {  // put values directly in the table cell (has fill-in class, but isn't editable)
		            document.getElementById('FPpts').innerHTML
		                = ( ch.hasTrait('ExtraFatigue') ) ? ch.getTrait('ExtraFatigue').finalCost() : 0;
		            document.getElementById('FPpts').onclick
		                = function() { alert('Adjust Fatigue Points by taking levels of the Extra Fatigue advantage. (There is no \'Reduced Fatigue\' disadvantage.)') };
		        }
        }
    }
    if( ch.description.currentFP && document.getElementById('currentFPbox') ) {
        document.getElementById('fatigueBox').value = ch.description.currentFP;
    }
    if( window.console && reportLevel>1 )
        { var newSubStamp = new Date().getTime(); console.log("    Fatigue Points done: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }

    /* Attribute-derived and encumbrance-based values */
    // load damage, speed, lift, and move
    if(document.getElementById('ThrDmg'))
        document.getElementById('ThrDmg').innerHTML = ch.basicDamage('thr').toString();
    if(document.getElementById('SwDmg'))
        document.getElementById('SwDmg').innerHTML  = ch.basicDamage('sw').toString();
    if(document.getElementById('PunchDmg'))
        document.getElementById('PunchDmg').innerHTML = ch.basicDamage('thr').modify(-1).toString();
    if(document.getElementById('BiteDmg'))
        document.getElementById('BiteDmg').innerHTML = ch.basicDamage('thr').modify(-1).toString();
    if(document.getElementById('KickDmg'))
		    document.getElementById('KickDmg').innerHTML = ch.basicDamage('thr').toString();
    document.getElementById('basicSpeedBox').innerHTML = ch.basicSpeed().toFixed(2);
    document.getElementById('basicSpeedBox').title = ch.adjustmentsTo('Speed',true);
    if( window.console && reportLevel>1 )
        { var newSubStamp = new Date().getTime(); console.log("    Speed fetched: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }
    var lift = ch.basicLift();
    if( window.console && reportLevel>1 )
        { var newSubStamp = new Date().getTime(); console.log("    Lift fetched: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }
    if( document.getElementById('basicLiftBox') ) {
        document.getElementById('basicLiftBox').innerHTML  = lift;
    }
    if( document.getElementById('BL_def') ) {
        document.getElementById('BL_def').innerHTML  = (ch.gameInfo.ruleset.match(/4/)) ? '(ST &times; ST)/5' : '(2 &times; ST)';
    }
    var move = ch.basicMove();  //alert(move);
    if( window.console && reportLevel>1 )
        { var newSubStamp = new Date().getTime(); console.log("    Move fetched: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }
    if( document.getElementById('basicMoveBox') ) {
        document.getElementById('basicMoveBox').innerHTML  = move;
        document.getElementById('basicMoveBox').title = ch.adjustmentsTo('Move',true);
    }
    // Move box should have a popup like Basic Speed
    var mvPtsBox = document.getElementById('AlteredMovePointsBox');
    var spPtsBox = document.getElementById('AlteredSpeedPointsBox');
    if( mvPtsBox ) {
        if( ch.gameInfo.ruleset.match('e4') ) {
            // basic Speed
            spPtsBox.innerHTML
              = "\n                  "
              + '<input type="text" class=" fill-in editable" style="width:90%; height:16px; margin-top:-4px;" value="'+ch.attributePoints.Speed+'"'
              + ' title="&plusmn;5 pts per &plusmn;0.25"'
              + ' onChange="loadedCharacter.attributePoints.Speed=(isNaN(this.value))?0:1*this.value; loadCharacter(loadedCharacter, \'change points\');" />'
              + "\n                ";
            spPtsBox.onclick = null;
            // basic Move
            mvPtsBox.innerHTML
              = "\n                  "
              + '<input type="text" class=" fill-in editable" style="width:90%; height:16px; margin-top:-4px;" value="'+ch.attributePoints.Move+'"'
              + ' title="&plusmn;5 pts per &plusmn;1 yd/sec"'
              + ' onChange="loadedCharacter.attributePoints.Move=(isNaN(this.value))?0:1*this.value; loadCharacter(loadedCharacter, \'change points\');" />'
              + "\n                ";
            mvPtsBox.onclick = null;
          }
          else {
            spPtsBox.innerHTML
                = ( ch.adjustmentsTo('Speed' ) ) ? ch.getTrait('IncreasedSpeed').finalCost() + ch.getTrait('DecreasedSpeed').finalCost() : 0;
            spPtsBox.onclick
                = function() { alert('Adjust Basic Speed by taking the Increased Basic Speed advantage or Decreased Basic Speed disadvantage.') };
            mvPtsBox.innerHTML = 0;
            mvPtsBox.onclick
                = function() { alert('Move can be decreased directly by taking the Reduced Move disadvantage. (Move can be increased indirectly by taking the Running skill.)') };
          }
    }
    else {
        // display any points in Speed or Move as pseudo-advantages?
        // I think this has to be done in the buildCombinedTraitsTable function.
    }
    // load encumbrance, adjusted move, dodge table
    var dodgeBonus = ch.adjustmentsTo('Dodge');
    var encFactors = ( ch.hasTrait('ExtraEncumbrance') ) ? [1,2.5,5,10,15] : [1,2,3,6,10];
    if( window.console && reportLevel>1 ) { var newSubStamp = new Date().getTime(); console.log("    dodgeBonus fetched: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }
    for( var i=0; i<5; i++ ) {
        var encFactor = encFactors[i];
        if( document.getElementById('EMD_table_mult'+i) ) {
            document.getElementById('EMD_table_mult'+i).innerHTML
                = encFactor*((sheet.match(/3e/)) ? 2 : 1);
        }
        if( document.getElementById('EMD_table_moveAdj'+i) ) {
            document.getElementById('EMD_table_moveAdj'+i).innerHTML
                = (ch.gameInfo.ruleset.match(/3/)) ? '&minus; '+i : '&times; '+(5-i)/5;
        }
        if( document.getElementById('EMD_table_swimAdj0') && i==0 ) document.getElementById('EMD_table_swimAdj0').innerHTML = '&nbsp;&ensp;&nbsp;&emsp;';
        if( document.getElementById('EMD_table_swimAdj'+i) && i>0 ) {
            document.getElementById('EMD_table_swimAdj'+i).innerHTML
                = (ch.gameInfo.ruleset.match(/3/)) ? '&minus; '+i : '&times; '+(5-i)/5;
        }
        if( document.getElementById('EMD_table_flyAdj'+i) ) {
            document.getElementById('EMD_table_flyAdj'+i).innerHTML
                = (ch.gameInfo.ruleset.match(/3/)) ? '&minus; '+(4*i) : '&times; '+(5-i)/5;
        }
        if( document.getElementById('encumbrance'+i+'Box') ) {
            document.getElementById('encumbrance'+i+'Box').innerHTML
                = roundToSigFigs( convertWeight( Math.round(10*encFactor*ch.liftUnit())/10, ch.preferences.units.measure ), 3 );
        }
        if( document.getElementById('move'+i+'Box') ) {
            document.getElementById('move'+i+'Box').innerHTML = ch.encumberedMove(i);
            var encMoveTxt = (i>0) ? ( (ch.gameInfo.ruleset.match(/4/)) ? " × " + (10-2*i)/10 + " (1-0.2×enc) " : " - " + i + " (encumbrance) " ) + ch.adjustmentsTo('Move',true) + ", rounded down (min 1 unless enc>X-hvy)" : "";
            document.getElementById('move'+i+'Box').title = ch.basicMove() + " (Basic Move)" + encMoveTxt;
        }
        var sprint = Math.max( 1.2*ch.encumberedMove(i), ch.encumberedMove(i)+1 );
        if( document.getElementById('sprint'+i+'Box') ) {
            document.getElementById('sprint'+i+'Box').innerHTML = Math.round(10*sprint)/10;
            document.getElementById('sprint'+i+'Box').title = "Move +20% (after first turn, min +1), rounded down";
        }
        if( document.getElementById('run'+i+'Box') ) {
            var sprint = Math.max( 1.2*ch.encumberedMove(i), ch.encumberedMove(i)+1 );
            document.getElementById('run'+i+'Box').innerHTML = Math.round(10*sprint/2)/10;
            document.getElementById('run'+i+'Box').title = "½ of sprint";
        }
        if( document.getElementById('hike'+i+'Box') ) {
            document.getElementById('hike'+i+'Box').innerHTML = Math.round(10*ch.encumberedMove(i));   // round instead of trunc; just correcting for javascript math errors here, encumberedMove should already be truncated
            document.getElementById('hike'+i+'Box').title = "10 × raw encumbered Move miles/day";
        }
        if( document.getElementById('bjump'+i+'Box') ) {
            document.getElementById('bjump'+i+'Box').innerHTML = Math.round(ch.encumberedBroadJump(i));   // round instead of trunc; just correcting for javascript math errors here, encumberedMove should already be truncated
            var encBJumpTxt = (i>0) ? (10-2*i)/10 + " × " : "";
            document.getElementById('bjump'+i+'Box').title = encBJumpTxt + "[(2 × "+ch.basicMove()+" (Basic Move) – 3]" + " feet";
        }
        if( document.getElementById('vjump'+i+'Box') ) {
            document.getElementById('vjump'+i+'Box').innerHTML = Math.round(ch.encumberedHighJump(i));   // round instead of trunc; just correcting for javascript math errors here, encumberedMove should already be truncated
            var encVJumpTxt = (i>0) ? (10-2*i)/10 + " × " : "";
            document.getElementById('vjump'+i+'Box').title = encVJumpTxt + "[(6 × "+ch.basicMove()+" (Basic Move) – 10]" + " inches";
        }
        if( document.getElementById('swim'+i+'Box') ) {
            document.getElementById('swim'+i+'Box').innerHTML = Math.max( Math.round((10-2*i)*ch.encumberedSwim()),1);
            var encSwimTxt = (i>0) ? " × " + (10-2*i)/10 + " (1-0.2×enc) " : "";
            document.getElementById('swim'+i+'Box').title = "10 × [" + ch.encumberedSwim() + " (Water Move)" + encSwimTxt + ch.adjustmentsTo('WaterMove',true) + "]";
        }
        if( document.getElementById('watermove'+i+'Box') ) {
            document.getElementById('watermove'+i+'Box').innerHTML = ch.encumberedSwim(i);
            var encSwimTxt = (i>0) ? " × " + (10-2*i)/10 + " (1-0.2×enc) " : "";
            document.getElementById('watermove'+i+'Box').title = ch.basicSwim() + " (Water Speed)" + encSwimTxt + ch.adjustmentsTo('WaterMove',true) + ", rounded down (min 1 unless enc>X-hvy)";
        }
        if( document.getElementById('airmove'+i+'Box') ) {
            document.getElementById('airmove'+i+'Box').innerHTML = ch.encumberedFly(i);
            var encFlyTxt = (i>0) ? " × " + (10-2*i)/10 + " (1-0.2×enc) " : "";
            document.getElementById('airmove'+i+'Box').title = ch.basicFly() + ( (ch.gameInfo.ruleset.match(/4/)) ? " (2×Basic Speed)" : " (2×Basic Move)" ) + encFlyTxt + ch.adjustmentsTo('AirMove',true) + ", rounded down";
        }
        if( document.getElementById('fly'+i+'Box') ) {
            document.getElementById('fly'+i+'Box').innerHTML = Math.trunc(1.2*ch.encumberedFly(i));
            document.getElementById('fly'+i+'Box').title = "Air Move +20% (after first turn), rounded down";
        }
        if( document.getElementById('dodge'+i+'Box') ) {
        		var dodge = ch.dodge() - i;
            document.getElementById('dodge'+i+'Box').innerHTML = (dodge<0) ? 0 : dodge;
            var encDodgeTxt = (i>0) ? " - " + i + " (encumbrance)" : "";
            var dodge4eAdj = (ch.gameInfo.ruleset.match(/4/)) ? " + 3" : "";
            document.getElementById('dodge'+i+'Box').title = ch.basicSpeed() + " (Basic Speed)" + dodge4eAdj + encDodgeTxt + ", rounded down";
        }
    }
    if( window.console && reportLevel>1 ) { var newSubStamp = new Date().getTime(); console.log("    encumbrance/move/dodge table filled: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }

    if( window.console && reportLevel )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] finished loading secondary characteristics: "+(newStamp-stamp)+' ms'); stamp = newStamp; }
   // alert("in loadCharacter, finished loading secondary characteristics");
    subStamp = new Date().getTime();

    // add character notes here?

    /* load languages, familiarities, reaction mods, etc. */

    // clear languages table
    var lrow = 1;
    var tr = document.getElementById('language'+lrow);
    while( tr ) {
        document.getElementById('language'+lrow+'Name').innerHTML  = '';
        if( document.getElementById('language'+lrow+'SpokenLevel' ) ) {
            document.getElementById('language'+lrow+'SpokenLevel' ).innerHTML  = '';
            document.getElementById('language'+lrow+'SpokenLevel' ).checked  = false;   // in case this is a radio, as with the DF sheet
        }
        if( document.getElementById('language'+lrow+'WrittenLevel') ) {
            document.getElementById('language'+lrow+'WrittenLevel').innerHTML  = '';
            document.getElementById('language'+lrow+'WrittenLevel').checked  = false;   // in case this is a radio, as with the DF sheet
        }
        document.getElementById('language'+lrow+'Cost').innerHTML = '';
        lrow++;
        tr = document.getElementById('language'+lrow);
    }
    var langRowsAvail = lrow-1;

    // clear cultures table
//     var cRow = 1;
//     var tr = document.getElementById('culture'+cRow);
//     while( tr ) {
//         document.getElementById('culture'+cRow+'Name').innerHTML = '';
//         document.getElementById('culture'+cRow+'Cost').innerHTML = '';
//         cRow++;
//         tr = document.getElementById('culture'+cRow);
//     }
//     var culRowsAvail = cRow-1;

    // clear cultures table
    var cRow = 1;
    while( document.getElementById('culture'+cRow+'Name') ) {
        document.getElementById('culture'+cRow+'Name').innerHTML = '';
        document.getElementById('culture'+cRow+'Cost').innerHTML = '';
        cRow++;
    }
    var culRowsAvail = cRow-1;
    // clear social traits
    if( document.getElementById('occupationBox') ) document.getElementById('occupationBox').value = '';
    if( document.getElementById('wealthBox') ) document.getElementById('wealthBox').innerHTML = '';
    if( document.getElementById('wealthPtsBox') ) document.getElementById('wealthPtsBox').innerHTML = '';
    if( document.getElementById('incomeBox') ) document.getElementById('incomeBox').innerHTML = '';
    if( document.getElementById('incomePtsBox') ) document.getElementById('incomePtsBox').innerHTML = '';
    if( document.getElementById('debtBox') ) document.getElementById('debtBox').innerHTML = '';
    if( document.getElementById('debtPtsBox') ) document.getElementById('debtPtsBox').innerHTML = '';
    if( document.getElementById('statusBox') ) document.getElementById('statusBox').innerHTML = '';
    if( document.getElementById('statusPtsBox') ) document.getElementById('statusPtsBox').innerHTML = '';
    if( document.getElementById('rankBox') ) document.getElementById('rankBox').innerHTML = '';
    if( document.getElementById('rankPtsBox') ) document.getElementById('rankPtsBox').innerHTML = '';
    if( document.getElementById('privsBox') ) document.getElementById('privsBox').innerHTML = '';
    if( document.getElementById('limsBox') ) document.getElementById('limsBox').innerHTML = '';
    if( document.getElementById('relationshipsBox') ) document.getElementById('relationshipsBox').value = '';

    // loop over character skills, looking for languages and printing them in the Languages area
    // alert(JSONstring.make(ch.skills));
    if( document.getElementById('languages') ) {
        var langRowNum = 1;
       // for( var sid in ch.skills ) {
        for( var sid=0; sid<ch.skills.length; sid++ ) {
            var skill = ch.skills[sid];
            // console.log(skill);
            var langRow = document.getElementById('language'+langRowNum);
            if( langRow && skill.key && skill.key.match(/^language$/i) ) {
                // console.log(skill);
                var skillNameCell = document.getElementById('language'+langRowNum+'Name');
                skillNameCell.innerHTML = skill.name;
                // add onclick to edit, style clickable
                skillNameCell.setAttribute('onclick',"languagesDialog(true,'"+sid+"_3')");
                $(skillNameCell).addClass('clickable');
                if( skill.language=='native' ) {
                    document.getElementById('language'+langRowNum+'Name').innerHTML += ' (native)';
                    document.getElementById('language'+langRowNum+'Cost').innerHTML = 0;
                }
                else {
                    document.getElementById('language'+langRowNum+'SpokenLevel').innerHTML = skill.level();
                    document.getElementById('language'+langRowNum+'WrittenLevel').innerHTML = skill.level();
                    document.getElementById('language'+langRowNum+'Cost').innerHTML
                        = ( skill.dash && skill.points==0 )
                        ? '-'
                        : 1*skill.points;
                }
                langRowNum++;
            }
        }
    }
    // alert("[loadCharacter] finished adding languages");

    // loop over character traits
    // pick out and process language ads, etc.
    var TLcost      = 0;
    var TLmods      = 0;
    var langsFound  = {};   // language ads come in pairs; this lets me combine them
    var langRowNum  = 1;
    var culRowNum   = 1;
    var relationships = [];
    var baseSW = StartingWealth_for_TL[ch.gameInfo.TL];
    var sw = ch.startingWealth();
  TRAIT:
    for( var tid in ch.traits ) {
        var trait = ch.traits[tid];
//						        alert("found a trait:\n"+JSONstring.make(trait));
        if( trait.key ) {   // skip formatting entries

            var name = trait.name;
          //  alert('found '+name+":\n"+JSONstring.make(trait));
            var mode = trait.description;
            var levs = trait.levels;    // this will be adjusted for Language Talent, etc.

            // LANGUAGES
            if( document.getElementById('language1') && trait.key.match(/^language$/i) ) {
                       //     console.log(trait);
                // kick out if langRowNum>langRowsAvail?
                var Mode = mode.charAt(0).toUpperCase() + mode.substr(1).toLowerCase();
                var lvlCost = trait.cost * levs;  // this must NOT be adjusted (so calculate immediately)
        		    //    alert("found a language entry for '"+name+"'");
                // now need to _adjust_ this, sometimes (e.g. a language ad level adjusted by Language Talent)
                // can I do this in some way other than ad hoc?
                var adjTxt = '';
                if( ch.hasTrait('LanguageTalent') && trait.cost>0 ) {
                    levs++;
                    adjTxt = "+1 level for Language Talent";
                }
                // what if a (screwed up) character has the 3e Language Talent and 4e (i.e. non-skill) languages?

                // has a row already been started with this language?
                if( langsFound.hasOwnProperty(name) ) {		// if so, put the 'level' in the appropriate column
                    existLangRow = langsFound[name];
                    //  console.log('second '+name+' entry; writing on row '+existLangRow);
                    if( levs>0 ) {
                        let LangModeLevCell = document.getElementById('language'+existLangRow+Mode+'Level');
                        let LangCostCell = document.getElementById('language'+existLangRow+'Cost');
                        if( LangModeLevCell.hasAttribute('type') ) { // it's a radio, not a cell
                            // console.log('[loadChar] tick '+Mode+' for '+trait.name);
                            if( trait.cost<0 ) continue TRAIT;
                            LangModeLevCell.checked = true;
                        }
                        else {
                            LangModeLevCell.innerHTML = trait.levelNames[levs];
                            if(adjTxt) {
                                LangModeLevCell.title = adjTxt;
                                LangModeLevCell.innerHTML += symbolFor['footnote'];
                            }
                        }
                        let extantCost = LangCostCell.innerHTML;
                        // console.log('[loadChar] incrementing cost for '+trait.name+', '+extantCost+'+'+lvlCost);
                        LangCostCell.innerHTML = 1*extantCost + lvlCost;
                    }
                }
                else {		// if not, start a new row
      			        //alert('first '+name+' entry; writing on row '+langRowNum);
                    let LangNameCell = document.getElementById('language'+langRowNum+'Name');
                    let LangMdLvCell = document.getElementById('language'+langRowNum+Mode+'Level');
                    let LangCostCell = document.getElementById('language'+langRowNum+'Cost');
                    if( !LangNameCell ) continue TRAIT; // might be too many
                    langsFound[name] = langRowNum;   // record row for this language
                        LangNameCell.innerHTML = name;
                        LangCostCell.innerHTML = lvlCost;
                        // add onclick to edit, style clickable
                        LangNameCell.parentNode.setAttribute('onclick',"languagesDialog(true,'"+tid+"_4')");
                        $(LangNameCell).parent().addClass('clickable');
                    if( LangMdLvCell && LangMdLvCell.hasAttribute('type') ) { // it's a radio, not a cell
                        // console.log('[loadChar] tick '+Mode+' for '+trait.name);
                        // skip 'native' languages
                        if( trait.cost<0 ) continue TRAIT;
                        LangMdLvCell.checked = true;
                    }
                    else {
                        if( trait.cost<0 ) {
                            LangNameCell.innerHTML += ' (native)';
                        }
                        if( levs>0 ) {
                            LangMdLvCell.innerHTML = trait.levelNames[levs];
                            if(adjTxt) {
                                LangMdLvCell.title = adjTxt;
                                LangMdLvCell.innerHTML += symbolFor['footnote'];
                            }
                        }
                    }
                    langRowNum++;
                }
                continue TRAIT;
            }

            // TECH LEVEL & cultural familiarities
            if( trait.group && trait.group.match(/TechLevel/) ) {
                // the only Traits in this group were deprecated in favor of a different treatment of Tech Levels as a Trait
                TLmods = levs;
                TLcost = trait.cost * levs;
                if(TLcost<0) TLmods *= -1;
            }
            if( document.getElementById('culture'+culRowNum+'Name') && trait.key=='CulturalFamiliarity' ) {
  //               alert('found '+name);
                document.getElementById('culture'+culRowNum+'Name').innerHTML = name;
                if( mode=='native' ) {
                    document.getElementById('culture'+culRowNum+'Name').innerHTML += ' (native)';
                    document.getElementById('culture'+culRowNum+'Cost').innerHTML = 0;
                }
                else {
                    document.getElementById('culture'+culRowNum+'Cost').innerHTML = trait.cost;
                }
                culRowNum++;
                continue TRAIT;
            }

            // SOCIAL TRAITS
            if( document.getElementById('social') ) {  // console.log("[loadCharacter: social traits]");
                if( document.getElementById('occupationBox') ) {
                    document.getElementById('occupationBox').value = (ch.description.occupation) ? ch.description.occupation : '';
                }
                if( document.getElementById('wealthBox') ) {
                    if( trait.group && trait.group.match(/wealth/i) ) {
                        document.getElementById('wealthBox').innerHTML += trait.name + " (" + trait.description + ": $" + sw + ")";
                        document.getElementById('wealthPtsBox').innerHTML = trait.finalCost();
                    }
                    if( trait.key.match(/multimillionaire/i) ) {
                        document.getElementById('wealthBox').innerHTML += trait.name + " " + trait.levels;
                        var totalSW = 10*sw*trait.levels+'';
                        document.getElementById('wealthBox').title = "Multimillionaire: total starting wealth of $" + totalSW.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                    }
                }
                if( document.getElementById('incomeBox') && trait.key.match(/income$/i) ) {
                    document.getElementById('incomeBox').innerHTML = trait.name + ": " + trait.levels + "% SW ($" + 0.01*trait.levels*sw + "/mo)";
                    document.getElementById('incomePtsBox').innerHTML = trait.finalCost();
                }
                if( document.getElementById('debtBox') && trait.key.match(/^debt/i) ) {
                    document.getElementById('debtBox').innerHTML = trait.name + ": " + trait.levels + "% SW ($" + 0.01*trait.levels*sw + "/mo)";
                    document.getElementById('debtPtsBox').innerHTML = trait.finalCost();
                }
                if( document.getElementById('statusBox') && trait.key.match(/status/i) ) {
                    document.getElementById('statusBox').innerHTML = trait.name + " " + trait.levels + " (" + trait.description + ")";
                    document.getElementById('statusPtsBox').innerHTML = trait.finalCost();
                }
                if( document.getElementById('rankBox') && trait.key.match(/rank$/i) ) {
                    document.getElementById('rankBox').innerHTML = trait.name + " " + trait.levels + " (" + trait.description + ")";
                    document.getElementById('rankPtsBox').innerHTML = trait.finalCost();
                }
                if( document.getElementById('privileges') ) {
                    if( trait.key.match(/hospitality|investment|clearance/i) ) { document.getElementById('privsBox').innerHTML
                        += '<span title="'+trait.description+'">' + trait.name + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
//                     if( trait.key.match(/investment/i) ) { document.getElementById('privsBox').innerHTML
//                         += '<span title="'+trait.description+'">' + trait.name + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
//                     if( trait.key.match(/enforcement/i) ) { document.getElementById('privsBox').innerHTML
//                         += '<span title="'+trait.description+'">' + trait.name + "-" + trait.levels + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
                    if( trait.key.match(/LegalImmunity|enforcement/i) ) { document.getElementById('privsBox').innerHTML
                        += '<span title="'+trait.description+'">' + trait.name + "-" + trait.levels + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
//                     if( trait.key.match(/clearance/i) ) { document.getElementById('privsBox').innerHTML
//                         += '<span title="'+trait.description+'">' + trait.name + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
                    if( trait.key.match(/regard/i) ) { document.getElementById('privsBox').innerHTML
                        += '<span title="'+trait.description+'">' + trait.name + " +" + trait.levels + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
                    if( trait.key.match(/tenure/i) ) { document.getElementById('privsBox').innerHTML
                        += '<span>' + trait.name + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
                }
                if( document.getElementById('limits') ) {
                    if( trait.key.match(/duty/i) ) { document.getElementById('limsBox').innerHTML
                        += '<span title="'+trait.description+'">' + trait.name + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
                    if( trait.key.match(/secret/i) ) { document.getElementById('limsBox').innerHTML
                        += '<span title="'+trait.description+'">' + trait.name + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
                    if( trait.key.match(/stigma/i) ) { document.getElementById('limsBox').innerHTML
                        += '<span title="'+trait.description+'">' + trait.name + " " + trait.levels + " [" + trait.finalCost() + "]" + '&emsp;' + '</span>'; }
                }
            }
            if( document.getElementById('relationships') ) {  // console.log("[loadCharacter: social traits]");
                    if( trait.key.match(/patron/i)  ) { relationships.push(trait.name + " (" + trait.description + ")" + " [" + trait.finalCost() + "]"); }
                    if( trait.key.match(/ally/i)    ) { relationships.push(trait.name + " (" + trait.description + ")" + " [" + trait.finalCost() + "]"); }
                    if( trait.key.match(/enemy/i)   ) { relationships.push(trait.name + " (" + trait.description + ")" + " [" + trait.finalCost() + "]"); }
                    if( trait.key.match(/contact/i) ) { relationships.push(trait.name + " (" + trait.description + ")" + " [" + trait.finalCost() + "]"); }
                    if( trait.key=='Dependent'      ) { relationships.push(trait.name + " (" + trait.description + ")" + " [" + trait.finalCost() + "]"); }
            }

            // ATTACH ADJUSTMENTS
            var potentialAdjustments = getAdjustmentsFrom( trait.key );    // attach all Adjustments that this Trait can cause (regardless of whether ch has the target)
						for( var k in potentialAdjustments ) {
						    ch.attachLinker( potentialAdjustments[k], k );
						}

        } // if trait has a name

    }		// loop over traits
    if( document.getElementById('relationshipsBox') )
        document.getElementById('relationshipsBox').value = relationships.join('; ');

    if( window.console && reportLevel>1 ) { var newSubStamp = new Date().getTime(); console.log("    languages done: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }

    // REACTION AREA
    var genderlessMods = 0;
    var   genderedMods = 0;
    // general reaction modifiers
    var rxnMod = ch.adjustmentsTo('Reaction');
   // alert('reaction mod: '+rxnMod);
    // appearance
    var apncMod = ch.adjustmentsTo('Appearance');
   // alert(apncMod);
    if( apncMod>1 ) {
        genderlessMods += 2;
          genderedMods += (apncMod-1)*2;
    }
    else {
        genderlessMods += apncMod;
          genderedMods += apncMod;
    }
  //  alert('genderless: '+genderlessMods+', gendered: '+genderedMods);
    var genderlessModsText = signed( genderlessMods );
    var   genderedModsText = signed(   genderedMods );
    if( document.getElementById('appearanceModsBox') ) {
        var AppearanceModsText = ( genderlessMods==genderedMods ) ? genderlessModsText : genderlessModsText+'/'+genderedModsText;
        document.getElementById('appearanceModsBox').innerHTML = AppearanceModsText;
    }
    // reputation
    // note that since there are NO adjustments to Reputation in the 4e library, this will ALWAYS put a "0" in the reputationModsBox for a 4e character
    var repMods = ch.adjustmentsTo('Reputation');
    if( document.getElementById('reputationModsBox') ) {
        var repModsText = signed(repMods);
        document.getElementById('reputationModsBox').innerHTML = repModsText;
    }
    // status
    var statusLevel = 0;
    if( document.getElementById('statusModsBox') ) {
        statusLevel = ch.status();
        //let statusLevelText = (statusLevel) ? statusLevel+' levels' : '';
        let statusLevelText = signed(statusLevel);
        document.getElementById('statusModsBox').innerHTML = statusLevelText;
    }
    // combined reaction mod
    // genderlessMods += repMods;
    //   genderedMods += repMods;
    genderlessMods += rxnMod;
      genderedMods += rxnMod;
    genderlessModsText = signed( genderlessMods );
    genderedModsText = signed( genderedMods );
    var reactionModsText = ( genderlessMods==genderedMods ) ? genderlessModsText : genderlessModsText+'/'+genderedModsText;
    if( document.getElementById('reactionModsBox') ) {
        document.getElementById('reactionModsBox').innerHTML = reactionModsText;
    }
    if( window.console && reportLevel>1 ) { var newSubStamp = new Date().getTime(); console.log("    reaction mods done: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }

    // CHARACTER TECH LEVEL
    var TLbox = document.getElementById('TLbox');
    if( TLbox ) {
        TLbox.innerHTML   = TechLevelOptionsList[ch.TL()].text;
        var TLdiff = ch.TL() - ch.gameInfo.TL;
        if( TLdiff ) TLbox.title = signed(TLdiff)+' from campaign Tech Level of '+ch.gameInfo.TL;
        var TLcost = document.getElementById('TLcost');
        if( ch.gameInfo.ruleset.match('e4') ) {
            TLcost.onclick = null;
            // make an editable input box
            TLcost.innerHTML
                = "\n                  "
                + '<input type="text" class=" fill-in editable" style="text-align:center; width:16px; height:15px; margin-top:-3px;" value="'+ch.attributePoints.TL+'"'
                + ' title="+/- 5 pts per level"'
                + ' onChange="loadedCharacter.attributePoints.TL=(isNaN(this.value))?0:1*this.value; loadCharacter(loadedCharacter, \'change points\');" />'
                + "\n                ";
        }
        else {  // put values directly in the table cell (has fill-in class, but isn't editable)
            TLcost.innerHTML = 0;
            TLcost.onclick
                = function() { alert('Adjust relative Tech Level by taking levels of the Tech Level Difference advantage.') };
        }
    }
    if( window.console && reportLevel>1 )
        { var newSubStamp = new Date().getTime(); console.log("    Tech Level done: "+(newSubStamp-subStamp)+' ms'); newSubStamp = newStamp; }


    if( ch.preferences.display.suppCombo ) {  // display the supplementary page
        if( window.console && reportLevel>1 ) { console.log("showing csheet_suppCombo_wrapper; comboSuppPagePref="+ch.preferences.display.suppCombo); }
        $("#csheet_suppCombo_wrapper").show('slow');
    }
    else $("#csheet_suppCombo_wrapper").hide();


    /* load Ads, Disads, Perks, and Quirks */

    if( ch.preferences.display.traitsSupp ) {  // display the supplementary traits page
        if( window.console && reportLevel>1 ) console.log("showing csheet_suppTraits_wrapper");
        $("#csheet_suppTraits_wrapper").show('slow');
    }
    else {
        if( window.console && reportLevel>1 ) console.log("hiding csheet_suppTraits_wrapper");
        $("#csheet_suppTraits_wrapper").hide();   // hide the supplemental traits page
    }

    if( document.getElementById('ad-disad-table') || document.getElementById('TraitsBox') ) {
        buildCombinedTraitsTable( ch );
    }
    // else?
    if( document.getElementById('ads_disads_partitioned_table') || document.getElementById('ads_partitioned_table') ) {
        buildPartitionedTraitsTable( ch );
    }
    if( window.console && reportLevel>1 ) { var newSubStamp = new Date().getTime(); console.log("    regular traits done: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }

    if( window.console && reportLevel )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] finished loading ads, disads, perks and quirks: "+(newStamp-stamp)+' ms'); stamp = newStamp; }
    // console.log("in loadCharacter, finished loading ads, disads, perks and quirks");


    /* load Skills and Spells */

    subStamp = new Date().getTime();

    // prep the skills table HTML
    clearAndCountSkillsTableRows();

    // overflow handling
    $("#skills_table").parent().css('overflow-y','');  // disable scrolling for skills table
    $("#spells_table").parent().css('overflow-y','');  // disable scrolling for spells table, if present
    var tableSize = 1*document.getElementById('skillsTableVisibleLength').value;
    if( ch.preferences.display.skillsSupp ) {  // display the supplementary skills page
        $("#csheet_suppSkills_wrapper").show('slow');
    }
    else {
        $("#csheet_suppSkills_wrapper").hide();   // hide the supplemental skills page
    }

    // write this character's skills and spells into the table

    var n = 1;    // rows iterator

    // build single skills array (concatenate ch.skills and ch.spells)  NB:  Now that ch.spells no longer exists, I could rewrite this section a bit.  Keep in mind when/if I ever abstract this part of loadCharacter to a separate function.
    // count spacers, headings, and total skill entries
    var headingEntries = 0;
    var spacerEntries = 0;
    var skillArrayLengthFor = {};
    var allSkills = ch.skills;        // console.log(allSkills);
    var theseSkills = ch.skills;

    skillArrayLengthFor['skills'] = theseSkills.length;
  //  alert(JSONstring.make(theseSkills));
    for( var skIndex in theseSkills ) {
        var SkillEntry = theseSkills[skIndex];
        if( SkillEntry.hasOwnProperty('line') ) {
            if( SkillEntry.line ) { headingEntries++; }
            else { spacerEntries++; }
        }
    }

    var allSkillEntries = allSkills.length;    // this number includes spacers and headings

    // set cramp level
    var skillsTotal = allSkillEntries - spacerEntries - headingEntries;
    var cramped = ( allSkillEntries>tableSize ) ? 1 : 0;
    if( cramped && (allSkillEntries-spacerEntries)>tableSize ) cramped++;
    // if there is no sane way to squeeze everything into the primary table,
    if( cramped && skillsTotal>tableSize ) {
        cramped=0;                      // don't try to squeeze if skills can't fit anyway
        // check preference for skills overflow
        if( ch.preferences.display.skillsScroll ) {  // implement scrolling
            $("#skills_table").parent().css('overflow-y','auto');
//             var stWidth = $("#skills_table").parent().width();
//             $("#skills_table").parent().css('width',stWidth+10);
        }
    }
  //  alert("tableSize: "+tableSize+"\nallSkillEntries: "+allSkillEntries+"\nheadingEntries: "+headingEntries+"\nspacerEntries: "+spacerEntries+"\n\ncramped: "+cramped);

    // demo of another way to get ID prefix for skill row elements:
  //  console.log("found this type of skill row: "+document.querySelector('#skills_table td[id^="skill"]').id);
    var compact = ( document.getElementById('skillCompact1') ) ? 'compact' : '';
  //  if( compact ) cramped = 2;

    var tableIDprefs = ['','supp_','suppCombo_'];
    var skMark = 0;
  IDPREFS:		// each skill table on the sheet has a different ID prefix
    for( var tp=0; tp<tableIDprefs.length; tp++ ) {

//         var idPrefix = ( compact ) ? 'skillCompact' : 'skill';
//         idPrefix = tableIDprefs[tp] + idPrefix;
        let idPrefix = tableIDprefs[tp];
        idPrefix += ( compact ) ? 'skillCompact' : 'skill';
        n = (tp) ? tableSize+1 : 1;   //console.log("for "+idPrefix+" table, starting at n="+n+", where we will put skill from ch.skills array at skMark="+skMark);
        if( tp && ch.skills.length<tableSize ) continue IDPREFS;

        if( window.console && reportLevel>2 )
            console.log("for( var skIndex=skMark; skIndex<allSkills.length; skIndex++ ):\nfor( skIndex="+skMark+"; skIndex<"+allSkills.length+"; skIndex++ )");
        var t = 0;
     //   var skIndexAdjust = 0;
        for( var skIndex=skMark; skIndex<allSkills.length; skIndex++ ) {
            // console.log("[loadCharacter:IDPREFS:allSkills loop] processing skill index "+skIndex);
            var lvl  = '';
            var TL   = '';
            var spec = '';
            var pSkill = allSkills[skIndex];      // console.log(pSkill);
            var skillType = ( pSkill.hasOwnProperty('spell') ) ? 'spell' : 'skill';

            if( window.console && reportLevel>3 )
                console.log("accessing skill cell "+idPrefix+n);
            skillCell = document.getElementById(idPrefix+n);
            if( !skillCell ) {
                //if( window.console && reportLevel>1 )
                //    console.log("no cell "+idPrefix+n+", terminating skills-printing loop");
                break;
            }
           // if( pSkill.key=="Merchant" )
           // console.log(JSONstring.make(pSkill));

            if( !document.getElementById('SkillsBox') ) skillCell.parentNode.removeAttribute('style');

            // print heading row for heading 'skills'
            if( pSkill.hasOwnProperty('line') ) {
                if( pSkill.line ) {   // something in this field; use text as a header
                    if( cramped<2 ) {
                        if( window.console && reportLevel>2 )
                            console.log("[loadCharacter] writing '"+pSkill.line+"' heading into cell "+idPrefix+n);
                        /* write the heading text */
                        skillCell.innerHTML = pSkill.line;
                        skillCell.style.fontWeight =  'bold';
                        // still want to be able to shift-click to delete the heading
                        skillCell.setAttribute('onmousedown',"if(event.shiftKey){removeSkill("+skIndex+")}");
                        skillCell.title = 'shift-click to remove this heading';
                        n++;
                    }
                    else console.log("[loadCharacter] skipping format field '"+pSkill.line+"'; cramped = "+cramped);
                    continue;
                }
                else {      // line==false, so it's a spacer
                    if( !cramped ) {   // unless cramped, then just restart loop without skipping a line
                        if( window.console && reportLevel>2 )
                            console.log("putting a spacer line into cell "+idPrefix+n);
                        // still want to be able to remove this spacer with a shift-click
                        skillCell.setAttribute('onmousedown',"if(event.shiftKey){removeSkill("+skIndex+")}");
                        skillCell.parentElement.title = 'shift-click to remove this spacer';
                        n++;
                    }
                    continue;
                }
            }
            if( window.console && reportLevel>2 )
                console.log("loading "+pSkill.name+", a "+pSkill.constructor.name+" into cell "+idPrefix+n);

            // attach linkers for the skill
            var prereqs = pSkill.prerequisitesFor();
            for( var k in prereqs ) ch.attachLinker( prereqs[k], k );
            // console.log("got prerequisites for "+pSkill.name);
            // tried doing this whenever prereqs are checked (i.e., in Skill.chHasPrereqs)
            // but it got activated for lots of skills not attached to the character
            var defaults = pSkill.defaults();  // alert(defaults.length);
            for( var k in defaults ) ch.attachLinker( defaults[k], k );
            if( pSkill.key ) {
                var adjustments = getAdjustmentsFor( pSkill.key );
                for( var k in adjustments ) ch.attachLinker( adjustments[k], k );
						}
						// else console.log('[loadCharacter skills loop] '+pSkill.name+' has no key');   // Techniques!
						var groupsIn = pSkill.groupsIsIn();
          //  if(groupsIn.length && pSkill.name=='Mind-Reading') alert(pSkill.name+' is in these groups: '+groupsIn);
						for( var g in groupsIn ) ch.attachLinker( Groups[groupsIn[g]], groupsIn[g] );

						// Adjustments to Groups will be tricky, if the group is defined or extended in a supplemental library.

            // print skill, with specialization & tech level (see 'Skill Notation', GURPS4e pg. 170)
           //  if(pSkill.key=='Forgery')
                // console.log(JSONstring.make(pSkill));
            // n will likely have changed; need to re-acquire the right cell
            var skillCell = document.getElementById(idPrefix+n);
            // write skill name
            var skillTypeName = skillType;
            if( pSkill.attribute=='M' ) skillTypeName = 'maneuver';
            if( pSkill.attribute=='T' ) skillTypeName = 'technique';
            // console.log("[loadCharacter] about to print "+pSkill.name);
            // console.log(pSkill);
            let lengthlimit = ( document.getElementById('skillsTableNameLengthLimit') ) ? 1*document.getElementById('skillsTableNameLengthLimit').value : false;
            skillCell.innerHTML  =  pSkill.print( compact, lengthlimit );
            // console.log("[loadCharacter] setting listeners for "+pSkill.name);
            skillCell.className += ' clickable';
            skillCell.title      = 'click to edit '+pSkill.name+' '+skillTypeName+', shift-click to remove';
            // set listeners
            skillCell.setAttribute('onmousedown',"if(event.shiftKey){removeSkill("+skIndex+")} else{editSkillDialog("+skIndex+")}");
            if( pSkill.key && pSkill.key.match(/language/i) )
            skillCell.setAttribute('onmousedown',"if(event.shiftKey){removeSkill("+skIndex+")} else{languagesDialog(true,'"+skIndex+"_3')}");
            // console.log("[loadCharacter] skill row "+n+" listeners done");
            // write skill level (STILL too simple; what about opt. + req. spec cases?  Geology?  4th edition spec rules, for God's sake???)
            lvl = pSkill.level();
            if( pSkill.optSpecsArray ) {
                if( ch.gameInfo.ruleset.match('3') ) {
                    lvl = (lvl-pSkill.optSpecsArray.length)+'/'+(lvl+5);
                }
                else {
                  //  lvl = (lvl+1)+'/'+(lvl-2);
                    // this should be more complex; see B169-170 for 4th ed. optional specialization rules
                    // could clone pSkill, reduce its difficulty level by 1, and then call level()...
                    pSkillClone = pSkill.clone();
                    pSkillClone.difficulty--;
                    lvl = pSkillClone.level();
                    lvl = lvl+'/'+(lvl-2);
                }
            }
            if( document.getElementById(idPrefix+n+'Level') )
                document.getElementById(idPrefix+n+'Level').innerHTML = lvl;
            var adjString = pSkill.adjustments(true);
            if( adjString && compact ) skillCell.innerHTML += '<span title="'+adjString+'">'+symbolFor['footnote']+'</span>';
            if( adjString && document.getElementById(idPrefix+n+'Level') ) {
                document.getElementById(idPrefix+n+'Level').title = adjString;
                document.getElementById(idPrefix+n+'Level').innerHTML += symbolFor['footnote'];
            }
            skillCell.innerHTML += ( document.getElementById('SkillsBox') && skIndex+1<allSkills.length ) ? ',&nbsp;' : '&emsp;';
            // console.log("[loadCharacter] skill row "+n+" level cell done");

            // write relative level
            if( document.getElementById(idPrefix+n+'RelLevel') ) { // console.log("found a RelLevel cell");
                document.getElementById(idPrefix+n+'RelLevel').innerHTML = pSkill.relLevel();
            }
            if( document.getElementById('skill'+n+'RelLevel') ) { // console.log("found a RelLevel cell");
                document.getElementById('skill'+n+'RelLevel').innerHTML = pSkill.relLevel();
            }

            // write points, and label the input element
            // if I go to not having inputs for unused rows, I will need to (conditionally?) build and insert the input element here
            var ptsInput;
            if( document.getElementById(idPrefix+n+'points') ) { console.log("found a 'points' element: "+idPrefix+n+'points'); ptsInput = document.getElementById(idPrefix+n+'points'); }
            else if( document.getElementById(idPrefix+n+'ptsCell') ) {
                // console.log("found a ptsCell: "+idPrefix+n+'ptsCell');
                ptsInput = document.createElement('input');
                ptsInput.setAttribute('id',idPrefix+n+'points');
                ptsInput.setAttribute('type','text');
                ptsInput.setAttribute('value','');
                ptsInput.setAttribute('class',' fill-in editable');
                ptsInput.setAttribute('style','height:16px; margin-top:-4px;');
                document.getElementById(idPrefix+n+'ptsCell').appendChild(ptsInput);
            }
            if( ptsInput ) {    // doesn't get defined for some sheets
                ptsInput.name = skIndex;
                ptsInput.value = pSkill.Points();
                ptsInput.setAttribute('onchange', 'changePoints(this.name,this.value); loadCharacter(loadedCharacter, \'change points\')');
            }

						if( document.getElementById(idPrefix+n+'points') ) {
		            var enoughVpts = ( ruleset.match(3) ) ? 0.5 : 1;
		            if( pSkill.virtualPoints()>=enoughVpts ) {
		                document.getElementById(idPrefix+n+'points').title = pSkill.virtualPoints(true);
		                //document.getElementById('skill'+n+'ptsCell').innerHTML += symbolFor['footnote'];  // can't figure how to make this work - the points are going into an <input>, which makes it harder.
		            }
		            // add e3 Eidetic Memory adjustment to title, if present
		            if( ch.hasTrait('EideticMemoryE3') && pSkill.type=='M' && !pSkill.spell && pSkill.points ) {
		                var semicolon = ( document.getElementById(idPrefix+n+'points').title ) ? '; ' : '';
		                document.getElementById(idPrefix+n+'points').title += semicolon+'×'+2*ch.getTrait('EideticMemoryE3').levels+' for Eidetic Memory';
		            }
	          }
            n++;
        } // end skIndex loop

        // record marker for point in allSkills to start when printing in supplemental pages
     //    if( window.console ) console.log("if( !tp && skMark==0 && n>tableSize ) skMark = tableSize:\nif( "+(!tp)+" && "+skMark+"==0 && "+n+">"+tableSize+" ) skMark = "+tableSize);
        if( !tp && skMark==0 && n>tableSize ) skMark = tableSize;
        /*if( ch.preferences.display.skillsSuppAll )*/ // skMark = 0;

        if( window.console && reportLevel>1 )
            { var newSubStamp = new Date().getTime(); console.log("    skills (all types) loaded into "+idPrefix+" table: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }

    } // end IDPREFS ([main], 'supp_', 'suppCombo_') loop

    // grimoire or spell table
    if( document.getElementById('csheet_grimoire_wrapper') ) {

        document.getElementById('grimoireOwner').innerHTML = ch.description.name;
        document.getElementById('grimoire_table_body').innerHTML = "\n\
        <tr style=\"text-align:center; vertical-align:bottom; line-height:10px; font-size:10px; border:none; font-family: fantasy\">\n\
          <th>Spell Name</th>\n\
          <th>Class</th>\n\
          <th>Time to Cast</th>\n\
          <th>Duration</th>\n\
          <th>Cost to Cast</th>\n\
          <th>Cost to Maintain</th>\n\
          <th>Notes</th>\n\
        </tr>";
    }

		var n = 1;
    for( var spIndex=0; spIndex<ch.skills.length; spIndex++ ) {

        var spell = ch.skills[spIndex];
        if( !spell.name ) continue;     // skip formatting entries here
        if( !spell.hasOwnProperty('spell') ) continue;     // skip non-spell skills
       // alert("formatting spell for printing:\n"+JSONstring.make(spell));

        // collect (or set to default) spell attributes
        if( !spell.classes || spell.classes.length==0 ) { spell.classes = { reg: true }; }
        var clstxt = '';
        var clsArr = new Array;
        for( cls in spell.classes ) { clstxt += cls+'<br />'; clsArr.push(cls); }
        var clsStr = clsArr.join(', ');
        var stats = spell.stats;
        var time2cast = ( stats && stats.time         ) ? stats.time         : 1;
        if( !isNaN(time2cast) ) time2cast += ' sec';
        if( clstxt.match(/block/) ) time2cast = 'block';
        var duration  = ( stats && stats.duration     ) ? stats.duration     : 'instant';
        var castcost  = ( stats && stats.castcost     ) ? stats.castcost     : '&mdash;';
        let ccost = ( isNaN(castcost) ) ? castcost : makeHTMLfraction(castcost);
        var maintcost = ( stats && stats.maintaincost ) ? stats.maintaincost : '&mdash;';
        var notes     = ( stats && stats.notes        ) ? stats.notes        : '';

        var time2castTitle = ( time2cast.length>=8 ) ? ' title="'+time2cast+'"'  : '';
        var durationTitle  = (  duration.length>=8 ) ? ' title="'+duration+'"'  : '';
        var castcostTitle  = (  castcost.length>=8 ) ? ' title="'+castcost+'"'  : '';
        var maintcostTitle = ( maintcost.length>=8 ) ? ' title="'+maintcost+'"' : '';
        var notesTitle     = (     notes.length>50 ) ? ' title="'+notes+'"' : '';

        var spec           = (spell.specialization)  ? " ("+spell.specialization+")" : '';  // there's at least 1 of these: Plane Shift

        if( document.getElementById('grimoire_table_body') ) {
            document.getElementById('grimoire_table_body').innerHTML += "\n\
        <tr class=\"fill-in\">\n\
          <td style=\"text-align:left;\">"+spell.name+spec+" - "+spell.level()+"</td>\n\
          <td>"+clstxt+"</td>\n\
          <td "+time2castTitle+">"+time2cast+"</td>\n\
          <td "+durationTitle+">"+duration+"</td>\n\
          <td "+castcostTitle+" style=\"white-space:normal\">"+ccost+"</td>\n\
          <td "+maintcostTitle+">"+maintcost+"</td>\n\
          <td style=\"text-align:left; white-space:normal\""+notesTitle+" style=\"border-right:none; text-align:left\">"+notes+"</td>\n\
        </tr>";
        }

        // also fill lines in any 'Spells' table present
        if( document.getElementById('spell_name'+n) ) {
            document.getElementById('spell_name'+n).innerHTML = spell.name+spec;
            document.getElementById('spell_name'+n).parentNode.style.display = 'table-row';
        }
        if( document.getElementById('spell'+n+'Level') ) {
            document.getElementById('spell'+n+'Level').innerHTML = spell.level();
        }
        if( document.getElementById('spell'+n+'ptsCell') ) {
            ptsInput = document.createElement('input');
            ptsInput.setAttribute('id','spell'+n+'points');
            ptsInput.setAttribute('type','text');
            ptsInput.setAttribute('value','');
            ptsInput.setAttribute('class',' fill-in editable');
            ptsInput.setAttribute('style','height:16px; margin-top:-4px;');
            document.getElementById('spell'+n+'ptsCell').appendChild(ptsInput);
        }
        if( document.getElementById('spell_class'+n) ) {
            document.getElementById('spell_class'+n).innerHTML = clsStr;
        }
        if( document.getElementById('spell_duration'+n) ) {
            document.getElementById('spell_duration'+n).innerHTML = duration;
            if( duration.length>=16 ) document.getElementById('spell_duration'+n).title = duration;
        }
        if( document.getElementById('spell_cost'+n) ) {
            let ccost = ( isNaN(castcost) ) ? castcost : makeHTMLfraction(castcost);
            document.getElementById('spell_cost'+n).innerHTML
              = ( maintcost.match && maintcost.match(/&mdash;/) )
              ? ccost
              : ccost+' ('+maintcost+') ';
            $('#spell_cost'+n).attr( 'title', $('<textarea/>').html(castcost).text()+' ('+$('<textarea/>').html(maintcost).text()+')' );
            // the $.html.text trick decodes HTML special characters in the casting cost text
        }
        if( document.getElementById('spell_time'+n) ) {
            document.getElementById('spell_time'+n).innerHTML = time2cast;
            if( time2cast.length>=8 ) $('#spell_time'+n).attr( 'title', $('<textarea/>').html(time2cast).text() );
        }
        if( document.getElementById('spell_notes'+n) ) {
            document.getElementById('spell_notes'+n).innerHTML = notes;
            document.getElementById('spell_notes'+n).title = notes;
        }
        n++;
    }

    if( $("#spells_table") && ch.preferences.display.skillsScroll ) {  // implement scrolling
        $("#spells_table").parent().css('overflow-y','auto');
    }

    if( document.getElementById('grimoire_table_body') ) {
        document.getElementById('grimoire_table_body').innerHTML += "\n      ";
    }
    if( window.console && reportLevel>1 ) { var newSubStamp = new Date().getTime(); console.log("    grimoire done: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }

    if( window.console && reportLevel )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] finished loading "+skillsTotal+" skills: "+(newStamp-stamp)+' ms'); stamp = newStamp; }
   // alert("in loadCharacter, finished loading skills");
   // subStamp = new Date().getTime();


    /* EQUIPMENT */
    var totalWeight = 0;
    var totalCost   = 0;
		// load Collections into Equip sub-menu
    if( document.getElementById('navbarCollectionsList') ) {
        var collectionsListItems = [];
        for( var cLabel in ch.collections ) {
            if( cLabel=='equipped' ) continue;
            var collection = ch.collections[cLabel];
            var ready = (cLabel==ch.collections.equipped) ? 'class="ready"' : '';
            collectionsListItems.push('<li><a '+ready+' onclick="equipWith(\''+cLabel+'\')" style="width:90px">'+collection[0]+'</a></li>');
        }
        document.getElementById('navbarCollectionsList').innerHTML = collectionsListItems.join("\n            	");
    }

    if( window.console && reportLevel>1 )
        console.log("hiding csheet_suppEquipment_wrapper");
    $("#csheet_suppEquipment_wrapper").hide();   // hide the supplemental equipment page

    // get Collection to be loaded
    var collectionToLoadID = ch.collections.equipped;
    // alert("encumbrance: "+ch.encumbrance(collectionToLoadID)+"\nencumbered move: "+ch.encumberedMove(collectionToLoadID));

    // test current character sheet HTML document for existence of various table types, then call appropriate load function
    clearAndCountPossessionsTableRows();
    if( document.getElementById('weapons_possessions_table') ) {
        $("#weapons_possessions_table").parent().css('overflow-y','');  // disable scrolling
        loadPossessionsTable( collectionToLoadID );
    }

    if( document.getElementById('armor_possessions_table') ) {
        $("#armor_possessions_table").parent().css('overflow-y','');  // disable scrolling
        loadPossessionsTable( collectionToLoadID );
    }

    if( document.getElementById('equipment_table') ) {
        loadPossessionsTable( collectionToLoadID );
    }

    if( document.getElementById('WeaponStatsBox') || document.getElementById('EquipmentStatsBox') ) {
        var i = 1;
        var eItemElmt = document.getElementById('equipItemCompact'+i);
        while( eItemElmt ) {
            eItemElmt.innerHTML = '';
            i++;
            eItemElmt = document.getElementById('equipItemCompact'+i);
        }
        loadPossessionsTable( collectionToLoadID, 20 );
    }

    if( document.getElementById('weapon_ranges_table') ) {
        var wrRows = clearAndCountWeaponRangesTableRows();
        loadWeaponRangesTable( collectionToLoadID, wrRows );
    }

    if( document.getElementById('hand_weapons_table') ) {
        var hwRows = clearAndCountWeaponsTableRows('hand');
      //     console.log("[loadCharacter] counted weapon table rows: "+hwRows);
        loadWeaponsTable( 'hand', collectionToLoadID, hwRows );
    }

    if( document.getElementById('ranged_weapons_table') ) {
        var rwRows = clearAndCountWeaponsTableRows('ranged');
        loadWeaponsTable( 'ranged', collectionToLoadID, rwRows );
    }

    if( document.getElementById('all_weapons_table') ) {
        var wRows = clearAndCountWeaponsTableRows('all');
        loadWeaponsTable( 'all', collectionToLoadID, wRows );
    }

    if( window.console && reportLevel )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] finished loading equipment: "+(newStamp-stamp)+' ms'); stamp = newStamp; }
   // alert("in loadCharacter, finished loading equipment");
   // subStamp = new Date().getTime();

    // initialize DR, Block, Parry
    if( document.getElementById('DRbox') ) {
        document.getElementById('DRbox').innerHTML = 0;
        // DRbox font-size might have been changed to accommodate a split DR
        document.getElementById('DRbox').style.fontSize = '3em';
    }
    document.getElementById('parryBox').innerHTML = 0;
    document.getElementById('blockBox').innerHTML = 0;

    /* after loading equipment, calculate and show total weight -> encumbrance, PD, DR, block, and total money spent. */
    // total weight
    var totalWeight = ch.totalEquipmentQuantity('actualWeight',collectionToLoadID);
    // increase totalWeight if character has a BMI disad (these will apply only for 3e rules because these adjustments will only be in that library)
    // increase totalWeight for Increased Density advantage
    // looks like Weight needs to be included among the targets for Adjustments
    var BMIencAdjustment = ch.adjustmentsTo('encumbranceFromBMI');
    var BMIaddedEnc = 0;
    if( BMIencAdjustment && ch.gameInfo.ruleset.match(/3/) ) {   // need to do this ad-hoc, even though these Adjustments won't be in 4e library, in case a character gets exposed to both libraries and ends up in 4e (with attached Adjustments)
 //       alert( "BMIencAdjustment:\n"+BMIencAdjustment );
        BMIaddedEnc = Math.round((ch.description.weight * BMIencAdjustment)/*/(1 + BMIencAdjustment)*/);
        totalWeight += BMIaddedEnc;
 //       alert( "new totalWeight:\n"+totalWeight );
    }
    /* encumbrance */
    // Machinery for single-row encumbrance table display has been added and works, if you want it.
    // initialize rows
    for( var i=0; i<5; i++ ) {
        var EMD_table_row = $('#EMD_table_row'+i);
        EMD_table_row.removeClass('ready');
        if( $("#EMD_table").hasClass('1row') ) EMD_table_row.hide();
    }
    // note the current encumbrance
    var enc = ch.encumbrance();
    if( $("#EMD_table").hasClass('1row') ) { $('#EMD_table_row'+enc).show(); }
    else { $('#EMD_table_row'+enc).addClass('ready'); }

    var encTableBox;
    if( document.getElementById('encumbranceTableBox') ) {
        encTableBox = document.getElementById('encumbranceTableBox');
    }
    if( document.getElementById('enc_mv_dodge') ) {
        encTableBox = document.getElementById('enc_mv_dodge');
    }
    if(encTableBox)	{
        encTableBox.title = ( BMIaddedEnc ) ? "Includes "+BMIaddedEnc+" lbs from body weight disad.\n" : "";
    }
    $('#encumbranceBox').html(encumbrances[enc]+' ('+enc+')');
	// If encumbrance exceeds X-heavy, character cannot move.  Show using warning backgrounds.
    // clear 'warn' from class of encTableBox, MvmtMoveBox, and dodgeDefenseBox (had to use jQuery for this)
    if(encTableBox)	$(encTableBox).removeClass('warn');
    if( document.getElementById('MvmtMoveBox') ) $(MvmtMoveBox).removeClass('warn');
    if( document.getElementById('dodgeDefenseBox') ) $(dodgeDefenseBox).removeClass('warn');
    if( encTableBox && enc>4 ) {
        encTableBox.className += ' warn';
        if( document.getElementById('MvmtMoveBox') ) {
            document.getElementById('MvmtMoveBox').className += ' warn';
        }
        if( document.getElementById('dodgeDefenseBox') ) {
            document.getElementById('dodgeDefenseBox').className += ' warn';
        }
    }
    // populate Totals in equipment table (do after calculating encumbrance, which is done in pounds always - so far)
    totalWeight = roundToSigFigs( convertWeight( totalWeight, ch.preferences.units.measure ), 4 );
    if( ch.preferences.display.fractions )
        totalWeight = makeMixedFraction( convertWeight( totalWeight, ch.preferences.units.measure ) )
  //  if( totalWeight==0 ) { totalWeight = ''; }
    var unitsPref = ch.preferences.units.measure;
    var wtUnits = ( unitsPref.match(/cgs/i) )
                ? unitsFor[unitsPref].weight+'ram'+es(totalWeight)
                : unitsFor[unitsPref].weight.toTitleCase()+es(totalWeight)+'.';
   // $('#totalWeight').html(totalWeight+' '+wtUnits);
    $('#totalWeight').html('<span class="fill-in">'+totalWeight+'</span> '+wtUnits);
    var tWtTitle = ( BMIaddedEnc ) ? "Includes "+BMIaddedEnc+" lbs from body weight disad." : '';
    $('#totalWeight').attr('title',tWtTitle);
		// encumbered move
    if( document.getElementById('encumberedMoveBox') ) {
     // alert("Encumbered Move: "+move+" - "+enc+"\nch.encumberedMove(): "+ch.encumberedMove(collectionToLoadID)+', min 1');
        document.getElementById('encumberedMoveBox').innerHTML = ch.encumberedMove();
        document.getElementById('encumberedMoveBox').title = ch.basicSpeed() + " (Basic Speed) - " + enc + " (encumbrance) " + ch.adjustmentsTo('Move',true) + ", rounded down\n(min 1 unless enc > X-hvy)";
    }
    if( document.getElementById('encumberedSwimBox') ) {
      // alert("Encumbered Swim: "+move+" - 2*"+enc+"\nch.encumberedSwim(): "+ch.encumberedSwim(collectionToLoadID)+', min 1');
        document.getElementById('encumberedSwimBox').innerHTML = ch.encumberedSwim();
        document.getElementById('encumberedSwimBox').title
            = ( ch.hasTrait('Amphibious') )
            ? "Amphibious, so = encumbered Move (not including Fat encumbrance), plus Water Move adjustments: " + ch.adjustmentsTo('WaterMove',true)
            : "(" + ch.levelOfSkillWithInfo('Swimming') + " (Swimming skill) - " + 2*enc + " (2×encumbrance) )/10" + ch.adjustmentsTo('WaterMove',true) + ", rounded down\n(min 1 unless enc > X-hvy)";
            // the adjustmentsTo() arg might need to be "Swim" for 4e and "WaterMove" for 3e - check
    }
    if( document.getElementById('encumberedFlyBox') ) {
        document.getElementById('encumberedFlyBox').innerHTML = ch.encumberedFly();
        document.getElementById('encumberedFlyBox').title = ch.basicFly() + " (2×Basic Speed) - " + (2*enc) + " (2×encumbrance) " + ch.adjustmentsTo('Fly',true) + ", rounded down";
    }
    /* PD */
    if( sheet.match('3e') ) {

        // then assign the 'torso' PD value to the generic PD variable

        // PD by body part
        var allArmorPD;       // these here to catch torso armor for the armor PD calculation below
        var allArmorSplitPD;
        var bodyPDsource = '';
        for( var areaLabel in bodyAreaParts ) {
            // translate area mentioned in character sheet to a Character.body part
            var bodyPart = bodyAreaParts[areaLabel];            // console.log("bodyAreaParts["+areaLabel+"]:\n"+bodyAreaParts[areaLabel]);
            // get that part's PD
            var armorPDs = ch.armorPD(areaLabel,true);
            // console.log("[loadCharacter()]\n"+bodyPart+":\n"+armorPDs);
            var armorPD = armorPDs[0];
            var armorSplitPD = armorPDs[1];
            var PDsource = armorPDs[2];
            if( bodyPart=='torso' ) bodyPDsource = PDsource;

            var splitPDappend = ( armorSplitPD || armorSplitPD===0 ) ? '/'+armorSplitPD : '';
            if( document.getElementById(areaLabel+'ArmorPDbox') ) {
                document.getElementById(areaLabel+'ArmorPDbox').innerHTML = armorPD + splitPDappend;
                if( PDsource ) document.getElementById(areaLabel+'ArmorPDbox').title = PDsource;
            }
            if( bodyPart=='torso' ) { allArmorPD = armorPD; allArmorSplitPD = armorSplitPD; }
        }
        // all armor PD
        if( document.getElementById('armorPDbox') ) {
            allArmorsplitPDappend = ( allArmorSplitPD || allArmorSplitPD===0 ) ? '/'+allArmorSplitPD : '';
            document.getElementById('armorPDbox').innerHTML = (allArmorPD) ? allArmorPD + allArmorsplitPDappend : '';
            document.getElementById('armorPDbox').title = bodyPDsource;
        }
        // shield PD
        var shieldPD = 0;
        var collectionToLoad = ch.collections[collectionToLoadID];
        for( var k=1; k<collectionToLoad.length; k++ ) {
            var equipmentObj = collectionToLoad[k];
            var prevItem = collectionToLoad[k-1];
            if( equipmentObj.PDB && prevItem=='ready' ) {
                // found one; save the shield PD
                shieldPD = equipmentObj.PDB;
                break;
            }
        }
        if( document.getElementById('shieldPDbox') ) {
            document.getElementById('shieldPDbox').innerHTML = (shieldPD) ? shieldPD : '&nbsp;';  // sheet may need contents to render properly
        }
        // other PD
        var otherPD = ch.adjustmentsTo('PD');
        var i=1;
        while( document.getElementById('otherPDbox'+i) ) {   // clear the table
            document.getElementById('otherPDbox'+i).innerHTML = '&nbsp;';
            document.getElementById('otherPDsourceBox'+i).innerHTML = '&nbsp;';
            i++;
        }
        /*  ch.adjustmentsTo('PD',true) will return a string like this:  "+2: Toughness, +5: Body of Stone" */
        var otherPDsources = ch.adjustmentsTo('PD',true).split(',');
        i=1;
        for( var s in otherPDsources ) {
            var source = otherPDsources[s];
            if( !source ) continue;
            var sourceTokens = source.split(': ');
            if( document.getElementById('otherPDbox'+i) ) {
                document.getElementById('otherPDbox'+i).innerHTML = sourceTokens[0];
            }
            if( document.getElementById('otherPDsourceBox'+i) ) {
                document.getElementById('otherPDsourceBox'+i).innerHTML = sourceTokens[1];
                i++;
            }
            // do these out-of-order so that i gets incremented at the end
        }
        var otherPD = ch.adjustmentsTo('PD');
        if( document.getElementById('otherPDbox') ) {
            document.getElementById('otherPDbox').innerHTML = (otherPD) ? Math.floor( otherPD ) : '&nbsp;';
        }
        var PassiveDefense = Math.floor( allArmorPD + shieldPD + otherPD );
        var splitPassiveDefense = ( allArmorSplitPD ) ? '/' + (allArmorSplitPD + shieldPD + otherPD) : '';
    //    alert('armorPD: '+allArmorPD+"\nshieldPD: "+shieldPD+"\notherPD: "+otherPD+"\nPassiveDefense: "+PassiveDefense);
        if( document.getElementById('PDbox') ) {
            document.getElementById('PDbox').innerHTML = (PassiveDefense) ? PassiveDefense+splitPassiveDefense : '';
        }
    }

    /* DR */
    // armor DR

    var allArmorDR;
    var allArmorSplitDR;
    var DRadjustments = ch.adjustmentsTo('DR');
    /*  ch.adjustmentsTo('DR',true) will return a string like this:  "+2: Toughness,+5: Body of Stone" */
    var DRsourceText = ch.adjustmentsTo('DR',true);
    var bodyDRsource = '';
    var allDRsources = DRsourceText.split(',');
    var nonArmorDRsources = allDRsources;
    for( var areaLabel in bodyAreaParts ) {
        // translate area mentioned in character sheet to a Character.body part
        var bodyPart = bodyAreaParts[areaLabel];          // alert("bodyAreaParts["+areaLabel+"]:\n"+bodyAreaParts[areaLabel]);
        // get that part's DR
        var armorDRs = ch.armorDR(areaLabel,true); // alert(armorDRs);
        var armorDR = armorDRs[0];
        var armorSplitDR = armorDRs[1];
        var DRsource = armorDRs[2];
        var splitDRappend = ( armorSplitDR || armorSplitDR===0 ) ? '/'+armorSplitDR : '';
        if( bodyPart=='torso' ) bodyDRsource = DRsource;  // save to be used below for the armorSummaryBox
        if( document.getElementById(areaLabel+'ArmorDRbox') ) {
            document.getElementById(areaLabel+'ArmorDRbox').innerHTML = armorDR + splitDRappend;
            document.getElementById(areaLabel+'ArmorDRbox').title = (DRsource) ? DRsource : '';
            if( document.getElementById(areaLabel+'Armorbox') ) {
                document.getElementById(areaLabel+'Armorbox').innerHTML =  (DRsource) ? DRsource : '';
                document.getElementById(areaLabel+'Armorbox').title =  (DRsource) ? DRsource : '';
            }
        }
        if( bodyPart=='torso' ) { allArmorDR = armorDR; allArmorSplitDR = armorSplitDR; }
    }
    for( var partIndex in allBodyParts ) {
        var partLabel = allBodyParts[partIndex];   // alert(partLabel);
        var armorDRs = ch.armorDR(partLabel,true,true); // alert(partLabel+': '+armorDRs);
        var armorDR = armorDRs[0];
        var armorSplitDR = armorDRs[1];
        var DRsource = armorDRs[2];
        var splitDRappend = ( armorSplitDR || armorSplitDR===0 ) ? '/'+(armorSplitDR+DRadjustments) : '';
        // repeated here for fine-grained character sheet presentations
        if( partLabel=='skull' ) { armorDR += 2; }   // skull gets +2 DR (report here, or elsewhere?)
        if( document.getElementById(partLabel+'ArmorDRbox') ) {
            document.getElementById(partLabel+'ArmorDRbox').innerHTML = (armorDR+DRadjustments) + splitDRappend;
            document.getElementById(partLabel+'ArmorDRbox').title  = (partLabel=='skull') ? 'skull DR' : '';
            document.getElementById(partLabel+'ArmorDRbox').title += (DRsource) ? ' + ' + DRsource : '';
            if( document.getElementById(partLabel+'Armorbox') ) {
                document.getElementById(partLabel+'Armorbox').innerHTML = (DRsource) ? DRsource : '';
                document.getElementById(partLabel+'Armorbox').title = (DRsource) ? DRsource : '';
            }
        }
        if( document.getElementById(partLabel+'ArmorDRoverlay') ) {
            document.getElementById(partLabel+'ArmorDRoverlay').innerHTML = 'DR ' + (armorDR+DRadjustments) + splitDRappend;
            if( DRsource ) document.getElementById(partLabel+'ArmorDRoverlay').parentElement.title = DRsource;
        }
    }

    if( document.getElementById('armorSummaryBox') ) {
        document.getElementById('armorSummaryBox').innerHTML = (allArmorDR) ? bodyDRsource : '';
        document.getElementById('armorSummaryBox').title = bodyDRsource;
    }
    if( document.getElementById('armorDRbox') ) {
        allArmorsplitDRappend = ( allArmorSplitDR || allArmorSplitDR===0 ) ? '/'+allArmorSplitDR : '';
        document.getElementById('armorDRbox').innerHTML = (allArmorDR) ? allArmorDR + allArmorsplitDRappend : '';
    }
    // non-armor DR
    var i=1;
    while( document.getElementById('nonArmorDRbox'+i) ) {   // clear the table
        document.getElementById('nonArmorDRbox'+i).innerHTML = '&nbsp;';
        if( document.getElementById('nonArmorDRsourceBox'+i) )
            document.getElementById('nonArmorDRsourceBox'+i).innerHTML = '&nbsp;';
        i++;
    }
    i=1;
    for( var s in nonArmorDRsources ) {
        var source = nonArmorDRsources[s];
        if( !source ) continue;
        var sourceTokens = source.split(': ');
        if( document.getElementById('nonArmorDRbox'+i) ) {
            document.getElementById('nonArmorDRbox'+i).innerHTML = sourceTokens[0];
        }
        if( document.getElementById('nonArmorDRsourceBox'+i) ) {
            document.getElementById('nonArmorDRsourceBox'+i).innerHTML = sourceTokens[1];
            i++;
        }
        // do these out-of-order so that i gets incremented at the end
    }
    if( document.getElementById('nonArmorDRbox') ) {
        var nonArmorDR = DRadjustments;
        document.getElementById('nonArmorDRbox').innerHTML = (nonArmorDR) ? Math.floor( nonArmorDR ) : '';
    }
    // boil it down for a total DR
    var DamageReduction = Math.floor( allArmorDR + DRadjustments );
    var splitDamageReduction = ( allArmorSplitDR ) ? '/' + (allArmorSplitDR + DRadjustments) : '';
 //   alert('armorDR: '+allArmorDR+"\nch.adjustmentsTo(DR): "+DRadjustments+"\nsplitDamageReduction: "+splitDamageReduction);
    if( document.getElementById('DRbox') ) {
        document.getElementById('DRbox').innerHTML = DamageReduction + splitDamageReduction;
        if( allArmorSplitDR && allArmorDR>9 ) {
          //  console.log('We need to display a split DR, and parentElement.clientWidth is '+document.getElementById('DRbox').parentElement.clientWidth);
            document.getElementById('DRbox').style.fontSize
                = ( document.getElementById('DRbox').parentElement.clientWidth>=65 )
                ? '2.5em' : '2em';
        }
    }

    /* Active Defenses */
    // 3rd edition sheets show PD separately; do not include in 3e sheet Active Defenses boxes
//     var activeDefenseBonus = ch.adjustmentsTo('ActiveDefense');
//     if( window.console && reportLevel>1 ) { var newSubStamp = new Date().getTime(); console.log("    activeDefenseBonus fetched: "+(newSubStamp-subStamp)+' ms'); subStamp = newSubStamp; }
    var readiedShield = ch.readiedShield();  // alert("readied shield found:\n"+JSONstring.make(readiedShield));
    //var PDorDB = (ch.gameInfo.ruleset.match(/4/)) ? 'DB' : 'PD';
    var PDbonus  = ( PassiveDefense ) ? '+'+PassiveDefense : '';
    var shieldDB = (ch.gameInfo.ruleset.match(/4/) && readiedShield) ? readiedShield.PDB : 0;
    // DODGE
    if( document.getElementById('dodgeBox') ) {
        var rawDodge = (enc<5) ? Math.max(ch.dodge()-enc,1) : 0;
        //alert(ch.dodge()+' - '+r+' + '+dodgeBonus+' + '+activeDefenseBonus);
        document.getElementById('dodgeBox').innerHTML = rawDodge /* +PDbonus */;
        var dodgeTitleText = 'basic speed ('+ch.basicSpeed()+')'
                           + ' - encumbrance ('+ch.encumbrance(collectionToLoadID)+')'
                           + ( ( ch.adjustmentsTo('Dodge') ) ? ' + adjustments ('+ch.adjustmentsTo('Dodge')+')' : '' )
                           + ( ( ch.gameInfo.ruleset.match(/4/) ) ? ' + 3' : '' );
        // if( ch.gameInfo.ruleset.match(/4/) ) dodgeTitleText += ' + shield '+PDorDB+' ('+shieldDB+')';
        //if( ch.gameInfo.ruleset.match(/3/) && PDbonus ) dodgeTitleText += ' + PD ('+PDbonus+')';
        document.getElementById('dodgeBox').title = dodgeTitleText;
    }
    // PARRY
    var parryHash = ch.parry('','',true);
    // alert(JSONstring.make(parryHash));
    var shieldPDBtitleText = /*(ch.gameInfo.ruleset.match(/4/) && readiedShield) ? ' + shield '+PDorDB+' ('+shieldDB+')' : '';
    shieldPDBtitleText +=*/ (ch.gameInfo.ruleset.match(/4/) ) ? ' + 3' : '';
    document.getElementById('parryBox').innerHTML = (parryHash.level)
      ? parryHash.level + parryHash.bonus + parryHash.adjustments + parryHash.base
      : '-';
    var ratio = parryHash['ratio'];
    var pratio = (ratio) ? ', '+ratio+' skill' : '';
    document.getElementById('parryBox').title = (parryHash.level==null)
      ? 'cannot parry with '+parryHash.skill+' skill'
      : parryHash.skill + ' ('+parryHash.level+pratio+') + '+ parryHash.weapon + ' parry bonus ('+parryHash.bonus+') + adjustments ('+parryHash.adjString+')' + shieldPDBtitleText;
    // BLOCK
    if( document.getElementById('blockBox') ) {
        var blockHash = ch.block();
        // alert(JSONstring.make(blockHash));
        document.getElementById('blockBox').innerHTML = (readiedShield) ? blockHash.base + blockHash.level + blockHash.bonus + blockHash.adjustments : '-';
        var blockBaseTitleText = (blockHash.base) ? ' + '+blockHash.base : '';
        var blockTitleText = ( ch.gameInfo.ruleset.match(/4/) ) ? ' + shield DB ('+shieldDB+')' : '';
        //if( ch.gameInfo.ruleset.match(/3/) && PDbonus ) blockTitleText += ' + PD ('+PDbonus+')';
        document.getElementById('blockBox').title = (readiedShield)
            ? 'half of ' + blockHash.skill + ' skill ('+blockHash.level+')' + blockTitleText + /*blockBaseTitleText +*/ ' + adjustments ('+blockHash.adjustments+')' + shieldPDBtitleText
            : 'cannot block without a shield';
    }

    if( window.console && reportLevel>1 )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] finished calculating defenses: "+(newStamp-stamp)+' ms'); stamp = newStamp; }
   // alert("in loadCharacter, finished calculating defenses");
   // subStamp = new Date().getTime();

    // alert("copied Ad/Disad ("+TraitName+"):\n"+JSONstring.make(ch[type][TraitName]) );
    // alert("Object  instance?\n"+(ch[type][TraitName] instanceof Object) );
    // alert("Trait instance?\n"+(ch[type][TraitName] instanceof Trait) );

    // total money spent (all owned equipment regardless of collection loaded)

    // total value of loaded collection
    totalCost  = ch.totalEquipmentQuantity('actualcost',collectionToLoadID);
    if( totalCost==0 ) { totalCost = ''; }
    $('#totalCost').html('$<span class="fill-in">'+totalCost+'</span>');
    /* Note that 'cost' now tells totalEquipmentQuantity to add all Item.cost and Item.addedCost parameters together. */

    /* load points summary information */
    $('#attsEtcPoints').html( ch.attsEtcPoints() );
    $('#adsEtcPoints').html( ch.adsEtcPoints() );
    $('#adsPerksPoints').html( ch.adsPerksPoints() );
    // $('#pureAdsPoints').html( ch.pureAdsPoints() );    prove me wrong
    $('#familiaritiesPoints').html( ch.familiaritiesPoints() );
    $('#famsTLsPoints').html( (ch.familiaritiesPoints()+ch.attributePoints.TL) );    
    if( document.getElementById('disadsQuirksPoints') ) {
        document.getElementById('disadsQuirksPoints').innerHTML = ch.disadsQuirksPoints();
        document.getElementById('disadsQuirksPoints').title
            = "Disadvantages Limit (disads + low stats, see B11): "+ch.disadLimitPoints()+"/"+ch.gameInfo.disadPointsLimit+"; "+-(ch.quirksPoints())+" quirks";
    }
    else {
        $('#disadsPoints').html(ch.disadsPoints());
        if( document.getElementById('disadsPoints') ) 
            document.getElementById('disadsPoints').title
            = "Disadvantages Limit: "+ch.disadLimitPoints()+"/"+ch.gameInfo.disadPointsLimit;
        $('#quirksPoints').html(ch.quirksPoints());
    }
    $('#skillsTotalPoints').html( ( ch.preferences.display.fractions ) ? makeMixedFraction( ch.skillsTotalPoints() ) : ch.skillsTotalPoints() );
    $('#spellsTotalPoints').html( ( ch.preferences.display.fractions ) ? makeMixedFraction( ch.spellsTotalPoints() ) : ch.spellsTotalPoints() );
    if( document.getElementById('otherPoints') ) {
        document.getElementById('otherPoints').innerHTML = ch.otherPoints();
    }
    var unspentPts = ch.description.pointTotal - ch.totalPoints();
    $('#unspentPointsBox').html( ( ch.preferences.display.fractions ) ? makeMixedFraction( unspentPts ) : unspentPts );
    if( document.getElementById('sumPointsBox') ) {
        document.getElementById('sumPointsBox').innerHTML = ( ch.preferences.display.fractions )
                                                          ? makeMixedFraction( ch.totalPoints() )
                                                          : ch.totalPoints();
    }
    if( window.console && reportLevel )
        { var newStamp = new Date().getTime(); console.log("[loadCharacter] finished loading points summary: "+(newStamp-stamp)+' ms'); stamp = newStamp; }
   // alert("in loadCharacter, finished loading points summary");
   // subStamp = new Date().getTime();

    // save current Character object in the 'undo' queue (unless this load is part of an 'undo' or 'redo')
    if( changeText!='undo' && changeText!='redo' ) enqueueLoadedCharacter( changeText );
   // alert("in loadCharacter, undoQueue is:\n"+JSONstring.make(document.undoQueue) );
   // alert("saved characters: "+document.undoQueue.length );

    /* Seems like maybe I should save in DOM/web storage every time the character is loaded. */
    ch.store();
    if( window.console && reportLevel>1 )
        console.log("[loadCharacter] stored");

    if( window.console && reportLevel>0 ) {
        var newStamp = new Date().getTime();
        console.log("[loadCharacter] loadCharacter done, total time: "+(newStamp-startTime)+' ms');
    }

    populateLoadedLibrariesList();


  //  console.log(JSONstring.make(ch.adjustments));
    //alert(ch.BMI());
  //  console.log( "at end of loadCharacter, Spells has "+Object.keys(Spells).length+" keys" );
}
// end of loadCharacter

/* loadCharacter sheet-specific subroutines */

function buildCombinedTraitsTable( ch ) {

    var tableSize = ( document.getElementById('traitsTableVisibleLength') )
                  ? 1*document.getElementById('traitsTableVisibleLength').value
                  : 1*document.getElementById('TraitTableVisibleLength').value;
    var displayedTraits = ch.countDisplayedTraits();
    var totalTraits = ch.countDisplayedTraits('adpq');    // count all 'normal' trait items
    var crampedTraits = ( displayedTraits>tableSize );
    if( totalTraits>tableSize ) crampedTraits = false;    // no point in squeezing if you won't see all the Traits anyway
    if( document.getElementById('TraitsBox') ) crampedTraits = true;

    var tableIDprefs = ['','supp_','suppCombo_'];
    var adMark = 0;
  IDPREFS:
    for( var tp=0; tp<tableIDprefs.length; tp++ ) {

        var idPrefix = tableIDprefs[tp];

        var row = (tp) ? tableSize+1 : 1;

        // clear this table
        var td = document.getElementById(idPrefix+'trait'+row);
        while( td ) {
            td.innerHTML  = '&nbsp;';
            td.removeAttribute('title');
            td.removeAttribute('onmousedown');
            td.removeAttribute('onmouseover');
            td.removeAttribute('onmouseout');
            removeClass( td, 'clickable' );
            if( document.getElementById(idPrefix+'trait'+row+'Cost') )
      		      document.getElementById(idPrefix+'trait'+row+'Cost').innerHTML = '&nbsp;';
            var tr = td.parentNode;
            if( !tp /*&& ch.preferences.display.traitsScroll*/ && row>tableSize ) {  // hide further rows
               // console.log('while clearing '+idPrefix+' table, hiding trait row '+row);
                tr.style.display = 'none';
            }
            // get next row before looping
            row++;
            td = document.getElementById(idPrefix+'trait'+row);
        }

        //console.log("if( tp && displayedTraits<tableSize ) continue IDPREFS:");
        //console.log('if( '+tp+' && '+displayedTraits+'<'+tableSize+' ) continue IDPREFS:');
        if( tp && displayedTraits<tableSize ) continue IDPREFS;

        row = (tp) ? tableSize+1 : 1;

        /* create entries for traits */
        // make concatenated traits array to loop over (helps with doing supplemental pages)
        var traitsList = [];

        // create entries for attribute adjustments to secondary attributes
        // (not usually displayed on sheets with a combined traits table, but check)
        if( !document.getElementById('HPbox') ) {
            var secTraits = {
              HP    : ['Hit Points',2,'P'],
              FP    : ['Fatigue Points',3,'P'],
              Will  : ['Will',5,'M'],
              Per   : ['Perception',5,'M'],
              Speed : ['Speed',20,'P'],
              Move  : ['Move',5,'P']
            };
            for( var secTrait in secTraits ) {
                var secTraitPts = ch.attributePoints[secTrait];
                if( secTraitPts != 0 ) {   // alert("adding "+secTrait+" pseudo-trait, because has "+secTraitPts+" points in it");
                    // create pseudo-entry
                    var secTraitName = secTraits[secTrait][0];
                    var secTraitCost = secTraits[secTrait][1];
                    var participle = (secTraitPts>0) ? 'Increased ' : 'Decreased ';
                    var secTraitType = (secTraitPts>0) ? 'A' : 'D';
                    var levels = secTraitPts/secTraitCost;
                    // old way:
                   // document.getElementById(idPrefix+'trait'+row).innerHTML = participle + secTraitName + ', ' + signed(levels);
                   // document.getElementById(idPrefix+'trait'+row+'Cost').innerHTML = secTraitPts;
                   // row++;
                    // new way:
                    var secTraitObj = new Trait( secTraitName, secTraitType,  secTraits[secTrait][2], secTraitCost, true, null );
                    secTraitObj.levels = levels;
                    traitsList.push( secTraitObj );
                }
            }
        }
        // append 'normal' traits (ads, disads, perks, quirks)
        traitsList = traitsList.concat( ch.traits );
        // alert(JSONstring.make(traitsList))
        // loop over concatenated single list to print out traits
        // console.log('for( var m='+adMark+'; m<'+traitsList.length+'; m++ )');
      TRAITS:
        for( var m=adMark; m<traitsList.length; m++ ) {
            var trait = cloneTraitFromGenericObject( traitsList[m] );
            if( window.console && reportLevel>2 )
                console.log("row "+row+": "+JSONstring.make(trait));
            if( window.console && reportLevel>2 )
                console.log("fetching cell "+idPrefix+'trait'+row);
            var td = document.getElementById(idPrefix+'trait'+row);
            if( !td ) {
                if( window.console && reportLevel>1 )
                    console.log("no cell "+idPrefix+'trait'+row+", terminating traits-printing loop");
                break;
            }
            if( trait.hasOwnProperty('line') && !crampedTraits ) {
                if( trait.line ) {  // (arrange to) print a heading line
                    document.getElementById(idPrefix+'trait'+row).innerHTML = '<b>'+trait.line+'</b>';
                }  // otherwise this is a spacer
                // switch on row display, if this row is overflow and scrolling is desired
                if( row>tableSize && ch.preferences.display.traitsScroll ) {
                    if( window.console && reportLevel>3 )
                        console.log('showing '+partition+' row '+row);
                    if(td.parentNode.style.display) td.parentNode.style.display = null;
                }
                row++;    // increment row counter in either case
                continue;
            }
            if(  trait.key=='Language' && (document.getElementById('languages') || crampedTraits) ) { continue; }
            if(  trait.key=='CulturalFamiliarity' && (document.getElementById('tech_culture') || crampedTraits) ) { continue; }
            // Also need to (conditionally) skip traits that adjust attributes and secondary characteristics.
            if( (trait.group && trait.group.match(/TechLevel/)) && (crampedTraits || document.getElementById('tech_culture')) ) { continue; }
            var popupMethod = 'showLongTrait';
            var doUnTraits = false;
            if( trait.hasOwnProperty('templateTrait') /*&& !trait.expand*/ ) {
                // console.log("[buildCombinedTraitsTable] found a template trait; setting doUnTraits = true:\n\n"+JSONstring.make(trait));
                popupMethod = 'showTemplate';
                doUnTraits = true;
            }
            // alert(trait.name+": "+popupMethod+"\n\n"+JSONstring.make(trait));
            if( trait.name ) {    // print trait
                if( window.console && reportLevel )
                    console.log(trait.name);
                if( trait.hasOwnProperty('inTemplate') ) { continue; }     // skip template traits here
                    //console.log(trait);
                td.innerHTML  = trait.print({hideenhlims:true,hidemults:true,hidecmods:true,hidedesc:true}) /*+ '&emsp;<a style="color:grey;">^</a>'*/;
                if( document.getElementById('TraitsBox') && m+1<traitsList.length ) td.innerHTML += ',&nbsp;';
                if( window.console && reportLevel>2 )
                    console.log("printed '"+trait.print()+"' on row "+row);
                td.className += (td.className.match('clickable')) ? '' : ' clickable';
                td.title      = 'click to edit "'+trait.name+'"';
                td.setAttribute('onmousedown', 'if(event.shiftKey){} else {editTraitDialog('+m+')}');
                let traitKey = trait.key;
                let mult = ( trait.hasOwnProperty('multiple') && typeof(trait.multiple)=='number' ) ? trait.multiple : '';
                if( !trait.expand ) {
                    td.setAttribute('onmouseover', popupMethod+'("'+traitKey+mult+'",event)');
                    td.setAttribute('onmouseout' , 'hidePopupList()');
                }
                // print points
                if( document.getElementById(idPrefix+'trait'+row+'Cost') )
      		      		document.getElementById(idPrefix+'trait'+row+'Cost').innerHTML = trait.finalCost();

                // switch on row display, if this row is overflow and scrolling is desired
                // console.log('if( '+row+'>'+tableSize+' && '+ch.preferences.display.traitsScroll+' )');
                if( !tp && row>tableSize && ch.preferences.display.traitsScroll ) {
                    if( window.console && reportLevel>3 )
                        console.log('showing '+idPrefix+' row '+row);
                    if(td.parentNode.style.display) td.parentNode.style.display = null;
                }

                // expand meta-traits and modifiers, if asked
                if( trait.expand ) {
                    if( trait.hasOwnProperty('templateTrait') ) {
                        let traitsInTemplate = Templates[traitKey].traits;
                        for( var tit in traitsInTemplate ) {
                            let traitInTemplate = traitsInTemplate[tit];  //console.log(traitInTemplate);
                            traitInTemplate = cloneTraitFromGenericObject( traitInTemplate );
                            row++;
                            let st = ( ch.hasTrait(traitInTemplate.key) ) ? '' : ' style="text-decoration:line-through;"';
                            document.getElementById(idPrefix+'trait'+row).innerHTML  = '<small'+st+'>&ensp;<i>'+traitInTemplate.print({hidechev:true})+'</i></small>';
                        }
                    }
                    if( trait.description ) {
                            row++;
                            document.getElementById(idPrefix+'trait'+row).innerHTML  = '<small>&ensp;'+trait.description+'</small>';
                    }
                    if( trait.hasOwnProperty('EnhLimsArray') ) {
                        for( let emod of trait.EnhLimsArray ) {
                            row++;
                            document.getElementById(idPrefix+'trait'+row).innerHTML  = '<small>&ensp;<i>'+emod.text+'</i></small>';
                        }
                    }
                    if( trait.hasOwnProperty('ConstantModsArray') ) {
                        for( let cmod of trait.ConstantModsArray ) {
                            row++;
                            document.getElementById(idPrefix+'trait'+row).innerHTML  = '<small>&ensp;<i>'+cmod.text+'</i></small>';
                        }
                    }
                    if( true && trait.hasOwnProperty('MultipliersArray') ) {
                        for( let mmod of trait.MultipliersArray ) {
                            row++;
                            document.getElementById(idPrefix+'trait'+row).innerHTML  = '<small>&ensp;<i>'+mmod.text+'</i></small>';
                        }
                    }
                }

                // alert("finished printing "+trait.name+" trait entry; look at 'un-traits' next");
                // NOW deal with un-traits, if this trait was a Template
                if( doUnTraits ) {
                    var traitTemplateKey = trait.key;
                    //console.log(Templates);
                  // alert(JSONstring.make(Templates['Ghar']));
                    var template = Templates[traitTemplateKey];		// what if this Template was in an imported library that isn't around anymore?  Then it will still be here, imported from ch.
                    // alert("looking at "+traitTemplateKey+" Template:\n\n"+JSONstring.make(template));
                    var traitsInTemplate = template.traits;
                    for( var j in traitsInTemplate ) {
                        var traitInTemplate = traitsInTemplate[j];  //console.log(traitInTemplate);
                        if( !traitInTemplate.hasOwnProperty('finalCost') )    // just making sure traitInTemplate is a real Trait object
                            traitInTemplate = cloneTraitFromGenericObject( traitInTemplate );
                      //  if( !traitInTemplate.hasOwnProperty('finalCost') )
                      //      alert("Trait "+traitInTemplate.name+" had to be cloned because it doesn't have a 'finalCost' attribute");
                      //  alert("fetching local trait matching "+traitInTemplate.name+":\n ch.getTrait( "+traitInTemplate.key+", "+traitInTemplate.multiple+" )");
                        // find corresponding trait in the character
                        // console.log(traitInTemplate);
                        var chTraitFromTemplate = ( traitInTemplate.hasOwnProperty('multiple') )
                                                ? ch.getTrait( traitInTemplate.key, traitInTemplate.multiple )
                                                : ch.getTrait( traitInTemplate.key );
                        // console.log(chTraitFromTemplate);
                        // compare trait to template version
                      //  alert("comparing local "+traitInTemplate.name+" trait to library version");
                        var costDiff = -traitInTemplate.finalCost();
                        // console.log("local trait "+traitInTemplate.name+" cost: "+(-costDiff));
                        var diffText = '';
                        if( chTraitFromTemplate ) {   // prepare altered trait un-trait line
                            // e.g.: "Night Vision 3, -2 from average Dwarf     -2 pts"
                            costDiff += chTraitFromTemplate.finalCost();
                            var chTraitLevels = ( chTraitFromTemplate.hasOwnProperty('levels') )
                                              ? ' '+chTraitFromTemplate.levels
                                              : '';
                            diffText  = chTraitFromTemplate.name+chTraitLevels+', '
                                      + signed(costDiff)+' points from average '+template.name;
                        }
                        else {                        // prepare missing trait un-trait line
                            // e.g.: "No Magery (normal Elf has Magery 0 advantage)    -5 pts"
                            var traitDescText = ( traitInTemplate.hasOwnProperty('levels') )
                                              ? traitInTemplate.levels
                                              : '';
                            if( traitInTemplate.hasOwnProperty('description') ) traitDescText = traitInTemplate.description;
                            diffText  = ' No '+traitInTemplate.name
                                      + ' (normal '+trait.name+' has <span class="italic">'+traitInTemplate.name+' '+traitDescText+'</span> trait)';
                        }
                        if( costDiff ) {    // if there is a difference in cost, print the 'un-trait' entry
                            row++;
                            // alert("cost difference found; printing "+traitInTemplate.name+" 'un-trait' entry:\n"+diffText+"\non row "+row);
                            document.getElementById(idPrefix+'trait'+row).innerHTML = diffText;    // can't use td, because it wasn't refreshed after row++ above
                            if( document.getElementById(idPrefix+'trait'+row+'Cost') )
      		      								document.getElementById(idPrefix+'trait'+row+'Cost').innerHTML = costDiff;
                        }
                    }  // loop over traits in the template
                }  // if( doUnTraits ) branch

                row++;

            } // if( named trait ) branch
            // remember position in traits array when we exceeded the normal table size (so supp tables can start there)
            if( !tp && adMark==0 && row>tableSize ) adMark = m+1;
        }   /* loop over the concatenated trait objects list */

    }  // end tableIDprefs loop

    var overflow = (ch.preferences.display.traitsScroll) ? 'auto' : '';
    if( window.console && reportLevel>1 )
        console.log("setting ad-disad-table parent container overflow-y: "+overflow);
    $("#ad-disad-table").parent().css('overflow-y',overflow);

}

function buildPartitionedTraitsTable( ch ) {
    var traitPartitions = ['ad','disad'];
    var rowCounts = { ad:1*$('#adTableVisibleLength').val(), disad:1*$('#disadTableVisibleLength').val() };
    var totalRows = rowCounts['ad'] + rowCounts['disad'];

    // count traits of each type
    var traitGroups = Object.keys(traitTypeNames);
    var traitCounts = { advantage:0, perk:0, disadvantage:0, quirk:0, spacer:0, heading:0 };
    var totalTraits = 0;
    for( var tgi in traitGroups ) {
        var traitGroup = traitGroups[tgi];
        for( var m in ch.traits ) {  // alert(JSONstring.make(ch.traits[m]));
            var pTrait = cloneTraitFromGenericObject( ch.traits[m] );
            if( pTrait.type != traitGroup ) {
                // alert('type ['+pTrait.type+'] does not match group ['+traitGroup+']'+"\n"+JSONstring.make(ch.traits[m]));
                continue;
            }
            if( document.getElementById('languages')    && pTrait.key=='Language' ) { continue; }
            if( document.getElementById('tech_culture') && pTrait.key=='CulturalFamiliarity' ) { continue; }
            if( document.getElementById('tech_culture') && pTrait.group && pTrait.group.match(/TechLevel/) ) { continue; }
            if( pTrait.hasOwnProperty('inTemplate') ) { continue; }
            traitCounts[traitTypeNames[traitGroup]]++;
        }
    }
    var totalAPs = traitCounts['advantage'] + traitCounts['perk'] + traitCounts['spacer'];
    if( !totalAPs ) totalAPs = 1;
    var totalDQs = traitCounts['disadvantage'] + traitCounts['quirk'] + traitCounts['spacer'];
    if( !totalDQs ) totalDQs = 1;
    // alert( "traitCounts:\n"+JSONstring.make(traitCounts) );

    // adjust distribution of partition rows (ONLY applies to main table, never supplement page tables!)
    // BUT the supplement pages need to know how much of each list remains to be printed.
    // repartitioning is not appropriate for some sheets (i.e. landscape1) - check traitsTableRepartitionable field
    if(  ch.preferences.display.adjTraitRows && $("#traitsTableRepartitionable").val()==1
         && (totalAPs>rowCounts['ad'] || totalDQs>rowCounts['disad']) ) {
        var totalTraits = totalAPs + totalDQs;
        var bestAProws = Math.max( Math.round(totalAPs/totalTraits*totalRows), 1 );
        var bestDQrows = Math.max( Math.round(totalDQs/totalTraits*totalRows), 1 );
        // if these two sum more than the total number of trait rows, decrement the ads rows
        if( bestAProws+bestDQrows>totalRows ) bestAProws--;
        if( reportLevel>2 )
            console.log('[buildPartitionedTraitsTable] want '+bestAProws+' rows for advantages and perks, and '+bestDQrows+' rows for disads and quirks');
        for( var idx in traitPartitions ) {
            var partition = traitPartitions[idx];
            var bestRows = (partition=='ad') ? bestAProws : bestDQrows;
            rowCounts[partition] = bestRows;
        }
    }
  //  alert('after repartitioning, rowCounts is { ad: '+rowCounts['ad']+', disad: '+rowCounts['disad']+' }');
    var crampedAds = ( totalAPs>rowCounts['ad'] );
    var crampedDisads = ( totalDQs>rowCounts['disad'] ) ? true : false;
    if( reportLevel>2 )
        console.log('[buildPartitionedTraitsTable] crampedDisads is '+crampedDisads+" (this isn't finished)");
    // dang it; not yet right - take spacer rows, etc. into account

    for( var idx in traitPartitions ) {
        var partition = traitPartitions[idx];
        var adMark = 0;   // CRAP - this needs to re-initialize between partitions...?  why isn't it?

        var tableIDprefs = ['','supp_','suppCombo_'];
      IDPREFS:
        for( var tp=0; tp<tableIDprefs.length; tp++ ) {
            var idPrefix = tableIDprefs[tp];
            if( reportLevel>2 )
                console.log('[buildPartitionedTraitsTable] starting '+idPrefix+partition+' table');

            // clear table partition
            var row = /*(tp) ? rowCounts[partition]+1 :*/ 1;
            var td = document.getElementById(idPrefix+partition+row);
            if( ch.preferences.display.adjTraitRows ) { $('#'+partition+'s_partitioned_table').parent().css('height',''); }
  //          else                                      $('#'+partition+'s_partitioned_table').parent().css('height',???);    // how to reset this?
            while( td ) {
               if( reportLevel>2 )
                   console.log('[buildPartitionedTraitsTable] clearing '+idPrefix+partition+' row '+row);
                td.innerHTML = '&nbsp;';
                td.removeAttribute('title');
                td.removeAttribute('onmousedown');
                td.removeAttribute('onmouseover');
                td.removeAttribute('onmouseout');
                removeClass( td, 'clickable' );
                document.getElementById(idPrefix+partition+row+'Cost').innerHTML = '&nbsp;';
                var tr = td.parentNode;
                if( tp==0 && /*ch.preferences.display.traitsScroll &&*/ row>rowCounts[partition] ) {  // hide further rows (only main table)
                    if( window.console && reportLevel>2 )
                        console.log('[buildPartitionedTraitsTable] while clearing table, hiding '+idPrefix+partition+' row '+row);
                    tr.style.display = 'none';
                }
                else { tr.style.display = ''; }   // reset, in case rows were hidden by loading a previous character
                // get next row before looping
                row++;
                td = document.getElementById(idPrefix+partition+row);
            }

            /* create entries for traits */
            // make concatenated traits array to loop over (helps with doing supplemental pages)
            var traitsList = [];

            // create entries for attribute adjustments to secondary attributes
            // (not usually displayed on sheets with a combined traits table, but check)
            if( !document.getElementById('HPbox') ) {
                var secTraits = {
                  HP    : ['Hit Points',2,'P'],
                  FP    : ['Fatigue Points',3,'P'],
                  Will  : ['Will',5,'M'],
                  Per   : ['Perception',5,'M'],
                  Speed : ['Speed',20,'P'],
                  Move  : ['Move',5,'P']
                };
                for( var secTrait in secTraits ) {
                    var secTraitPts = ch.attributePoints[secTrait];
                    if( secTraitPts != 0 ) {
                        // create pseudo-entry
                        var secTraitName = secTraits[secTrait][0];
                        var secTraitCost = secTraits[secTrait][1];
                        var participle = (secTraitPts>0) ? 'Increased ' : 'Decreased ';
                        var secTraitType = (secTraitPts>0) ? 'A' : 'D';
                        var levels = secTraitPts/secTraitCost;
                        var secTraitObj = new Trait( secTraitName, secTraitType, secTraits[secTrait][2], secTraitCost, true, null );
                        secTraitObj.levels = levels;
                        if( (secTraitPts>0 && partition=='ad') || (secTraitPts<0 && partition=='disad') )
                            traitsList.push( secTraitObj );
                    }
                }
            }
            // append 'normal' traits (ads, disads, perks, quirks)
            for( var k=0; k<ch.traits.length; k++ ) {
                var trait = ch.traits[k];
                trait.index = k;
                var flipper = (partition=='ad') ? 1 : -1;
                if( flipper*trait.finalCost() > 0 ) traitsList.push( trait );
                if( flipper>0 && trait.finalCost()==0 && !trait.hasOwnProperty('line') ) traitsList.push( trait );   // push zero cost traits (but not spacers) onto Ads array
                let prevPushedTrait = traitsList[traitsList.length-1];
                if( trait.hasOwnProperty('line') && !trait.line && !(prevPushedTrait && prevPushedTrait.hasOwnProperty('line') && !prevPushedTrait.line) ) traitsList.push( trait );   // this pushes all spacers into both lists
                // still not printing headers in partitioned trait tables - not sure how
            }
            // console.log("for table "+idPrefix+partition+", traitsList is\n"+JSONstring.make(traitsList))

            // if all traits in this partition fit on the standard table, skip out of this (supplementary) table
            if( tp && traitsList.length<rowCounts[partition] ) { continue IDPREFS; /*alert("skipping "+idPrefix+partition+", all of these fit on the standard table");*/ }
            // or should I use totalTraits?  how to account for spacers/headers, etc.?
            if( ch.preferences.display.traitsSuppAll ) adMark = 0;

            // loop over concatenated single list to print out traits
           //  alert('for( var m='+adMark+'; m<'+traitsList.length+'; m++ )');
            if( reportLevel>2 )
                console.log('[buildPartitionedTraitsTable] for( var m='+adMark+'; m<'+traitsList.length+'; m++ )');

            // re-initialize the row iterator (after it was used to clear this table partition)
            row = /*(tp) ? rowCounts[partition]+1 :*/ 1;		// tp: table prefix; empty for tables on main page
            var startingTraitName = ( traitsList[adMark] ) ? traitsList[adMark].name : 'none';
            if( reportLevel>2 )
                console.log('[buildPartitionedTraitsTable] starting '+idPrefix+partition+' table partition loop\n  at trait item '+adMark+' ('+startingTraitName+'), table row '+row);
          TRAITS:
            for( var m=adMark; m<traitsList.length; m++ ) {
                // get next trait object
                var pTrait = cloneTraitFromGenericObject( traitsList[m] );
                pTrait.index = traitsList[m].index;
                // access next table row cell
              //  if( tp ) alert('grabbing cell '+idPrefix+partition+row);
                var td = document.getElementById(idPrefix+partition+row);
                if( !td ) continue IDPREFS;

                if( window.console && reportLevel>2 ) {console.log(JSONstring.make(pTrait));}
                if( pTrait.hasOwnProperty('line') ) {
                    if( pTrait.line ) {
                        // print a heading line
                        td.innerHTML = '<b>'+pTrait.line+'</b>';
                    }   // otherwise this is a spacer
                    // switch on row display, if this row is overflow and scrolling is desired
                    if( tp==0 && row>rowCounts[partition] && ch.preferences.display.traitsScroll ) {
                        console.log('[buildPartitionedTraitsTable] showing '+idPrefix+partition+' row '+row);
                        if(td.parentNode.style.display) td.parentNode.style.display = null;
                    }
                    row++;    // increment row counter in either case
                    continue;
                }
                if( document.getElementById('languages')    && pTrait.key=='Language' ) { continue; }
                if( document.getElementById('tech_culture') && pTrait.key=='CulturalFamiliarity' ) { continue; }
                if( document.getElementById('tech_culture') && pTrait.group && pTrait.group.match(/TechLevel/) ) { continue; }
                var popupMethod = 'showLongTrait';
                var doUnTraits = false;
                if( pTrait.hasOwnProperty('templateTrait') ) {
                    popupMethod = 'showTemplate';
                    doUnTraits = true;
                }
                if( pTrait.name ) {
                    var traitTypeName = traitTypeNames[pTrait.type];
                    // put information on this row
                    // skip template traits here
                    if( pTrait.hasOwnProperty('inTemplate') ) { continue; }
                    if( reportLevel>2 )
                        console.log("[buildPartitionedTraitsTable] printing "+pTrait.name);
                    td.innerHTML  = pTrait.print();
                    td.className += (td.className.match('clickable')) ? '' : ' clickable';
                    td.title      = 'click to edit "'+pTrait.name+'" '+traitTypeName;
                    td.setAttribute('onmousedown', 'if(event.shiftKey){} else {editTraitDialog('+pTrait.index+')}');   // the index 'm' should be the position of this trait in the Character.traits array (but it won't be if m is 'restarted' for the Disads loop)
                    var traitKey = ( pTrait.hasOwnProperty('multiple') ) ? pTrait.key+pTrait.multiple : pTrait.key;
                    td.setAttribute('onmouseover', popupMethod+'("'+traitKey+'",event)');
                    td.setAttribute('onmouseout' , 'hidePopupList()');
                    // print points
                    document.getElementById(idPrefix+partition+row+'Cost').innerHTML = pTrait.finalCost();
                    // switch on row display, if this row is overflow and scrolling is desired
                    if( tp==0 && row>rowCounts[partition] && ch.preferences.display.traitsScroll ) {
                        console.log('[buildPartitionedTraitsTable] showing '+idPrefix+partition+' row '+row);
                        if(td.parentNode.style.display) td.parentNode.style.display = null;
                    }
                    row++;
                    // NOW deal with un-traits, if this trait was a Template
                    if( doUnTraits ) {
                        var traitTemplateKey = pTrait.key;
                      //  alert(JSONstring.make(Templates[traitTemplateKey]));
                        var traitsInTemplate  = Templates[traitTemplateKey].traits;
                        for( var j=0; j<traitsInTemplate.length; j++ ) {
                            var traitInTemplate = traitsInTemplate[j];
                            if( !traitInTemplate.hasOwnProperty('finalCost') )
                                traitInTemplate = cloneTraitFromGenericObject( traitInTemplate );
                           // alert("cloned trait from library template:\n"+JSONstring.make(traitInTemplate));
                            // find corresponding trait in the character
                            var chTraitFromTemplate = ( traitInTemplate.hasOwnProperty('multiple') )
                                                    ? ch.getTrait( traitInTemplate.key, traitInTemplate.multiple )
                                                    : ch.getTrait( traitInTemplate.key );
                           // alert("trait "+traitInTemplate.key+" fetched from character:\n"+JSONstring.make(chTraitFromTemplate));
                            // compare trait to template version
                            var costDiff = -traitInTemplate.finalCost();
                            var diffText;
                            if( chTraitFromTemplate ) {   // prepare altered trait un-trait line
                                // e.g.: "Night Vision 3, -2 from average Dwarf     -2 pts"
                                costDiff += chTraitFromTemplate.finalCost();
                                var chTraitLevels = ( chTraitFromTemplate.hasOwnProperty('levels') )
                                                  ? ' '+chTraitFromTemplate.levels
                                                  : '';
                                diffText  = chTraitFromTemplate.name+chTraitLevels+', '
                                          + signed(costDiff)+' points from average '+Templates[traitTemplateKey].name;
                            }
                            else {                        // prepare missing trait un-trait line
                                if( reportLevel>2 )
                                    alert("[buildPartitionedTraitsTable] "+traitInTemplate.key+" does not exist in the character version of this template");
                                // e.g.: "No Magery (normal Elf has Magery 0 advantage)    -5 pts"
                                var traitDescText = ( traitInTemplate.hasOwnProperty('levels') )
                                                  ? traitInTemplate.levels
                                                  : '';
                                if( traitInTemplate.hasOwnProperty('description') ) traitDescText = traitInTemplate.description;
                                diffText  = ' No '+traitInTemplate.name
                                          + ' (normal '+pTrait.name+' has <span class="italic">'+traitInTemplate.name+' '+traitDescText+'</span> trait)';
                            }
                          //  alert(diffText);
                            if( costDiff ) {    // if there is a difference in cost, print the 'un-trait' entry
                              //  alert("[buildPartitionedTraitsTable] cost of trait in template: "+traitInTemplate.finalCost());
                                if( chTraitFromTemplate && reportLevel>2 )
                                    alert("[buildPartitionedTraitsTable] cost of trait in character: "+chTraitFromTemplate.finalCost());
                              //  alert("[buildPartitionedTraitsTable] cost difference; printing "+traitInTemplate.name+" 'un-trait' entry:\n"+diffText+"\non row "+row);
                                document.getElementById(idPrefix+partition+row).innerHTML = diffText;
                                document.getElementById(idPrefix+partition+row+'Cost').innerHTML = costDiff;
                                // switch on row display, if this row is overflow and scrolling is desired
                                // (I have to do this everywhere row is incremented inside a loop)
                                if( tp==0 && row>rowCounts[partition] && ch.preferences.display.traitsScroll ) {
                                    console.log('[buildPartitionedTraitsTable] showing '+idPrefix+partition+' row '+row);
                                    if(td.parentNode.style.display) td.parentNode.style.display = null;
                                }
                                row++;
                            }
                        }  // loop over traits in the template

                    }  // if( doUnTraits ) branch
                } // if( named trait ) branch
                // remember position in traits array when we exceeded the normal table size (so supp tables can start there)
                if( !tp && adMark==0 && row>rowCounts[partition] ) adMark = m+1;
            }   /* loop over the trait objects found in traitsList */

        }   /* loop over the table ID prefixes within this partition */

        var overflow = (ch.preferences.display.traitsScroll) ? 'auto' : '';
        if( window.console && reportLevel>1 )
            console.log("[buildPartitionedTraitsTable] setting "+partition+"s_partitioned_table overflow-y: "+overflow);
        $("#"+partition+"s_partitioned_table").parent().css('overflow-y',overflow);
    }   /* loop over the two ad/disad table partitions */

}

function clearAndCountSkillsTableRows() {
    var tableLength = 1*$("#skillsTableVisibleLength").val();
    var idPrefix = (document.getElementById('skillCompact1')) ? 'skillCompact' : 'skill';
    clearSkillTableRows( idPrefix, 1 );
    clearSkillTableRows( 'supp_'+idPrefix, tableLength+1 );
    clearSkillTableRows( 'suppCombo_'+idPrefix, tableLength+1 );
    clearSpellTableRows();
}

function clearSkillTableRows( idPrefix, startRow ) {
    var tableLength = $("#skillsTableVisibleLength").val();
    var row = startRow;
   // alert(document.getElementById('skills_table').rows.length);
    while( document.getElementById(idPrefix+row) ) {
        // clear and reset name cell
        var nameCell = document.getElementById(idPrefix+row);
        nameCell.innerHTML = '&nbsp;';
        nameCell.className = ( document.getElementById('SkillsBox') ) ? 'fill-in' : 'underlined fill-in';
        nameCell.removeAttribute('title');
        nameCell.removeAttribute('colspan');

        if( document.getElementById(idPrefix+row+'points') ) {   // if points input elements are found, remove them
            document.getElementById(idPrefix+row+'points').parentNode.innerHTML = '';
        }
        if( document.getElementById(idPrefix+row+'ptsCell') )
            document.getElementById(idPrefix+row+'ptsCell').style.removeProperty('display');    // show the Pt. Cost cell, in case it was hidden

        // unset listeners
        // var ptsCellInput = document.getElementById('skill'+row+'points');
        // if(ptsCellInput) ptsCellInput.removeAttribute('onchange');
        nameCell.removeAttribute('onmousedown');

        // clear skill level cell (all sheets)
        var lvlCell;
        if( document.getElementById(idPrefix+row+'Level') ) {
            lvlCell = document.getElementById(idPrefix+row+'Level');
            lvlCell.innerHTML = '';
            // lvlCell.style.display = 'table-cell';
            lvlCell.style.display = null;
            lvlCell.removeAttribute('title');
        }
        else if( document.getElementById(idPrefix+row) ){
            // skip these
        }
        // clear relative level cell, if this column is used
        var rlvlCell;
        if( document.getElementById(idPrefix+row+'RelLevel') ) {
            rlvlCell = document.getElementById(idPrefix+row+'RelLevel');
            rlvlCell.innerHTML = '';
            rlvlCell.style.display = 'table-cell';
        }
        // clear any title attributes, bold style
        nameCell.style.removeProperty('font-weight');
        nameCell.removeAttribute('title');
        nameCell.parentNode.removeAttribute('title');
    //    nameCell.style.removeProperty('title');
        // set visibility for regular table cells beyond enclosing div
        //alert("row>tableLength && !idPrefix.match(/supp/)?\n"+row+'>'+tableLength+' && '+!idPrefix.match(/supp/) );
        if( row>tableLength && !idPrefix.match(/supp/) )
            nameCell.parentNode.style.display = 'none';
        row++;
    }
    return;
}
function clearSpellTableRows() {
	  if( !$("#spellsTableVisibleLength") ) return;
    var tableLength = $("#spellsTableVisibleLength").val();
    var row = 1;
    while( document.getElementById('spell_name'+row) ) {
        var nameCell     = document.getElementById('spell_name'+row);
        var classCell    = document.getElementById('spell_class'+row);
        var durationCell = document.getElementById('spell_duration'+row);
        var costCell     = document.getElementById('spell_cost'+row);
        var timeCell     = document.getElementById('spell_time'+row);
        var notesCell    = document.getElementById('spell_notes'+row);
        // clear and reset all cell contents
        if(nameCell)     nameCell.innerHTML = '&nbsp;';
        if(classCell)    classCell.innerHTML = '&nbsp;';
        if(durationCell) durationCell.innerHTML = '&nbsp;';
        if(costCell)     costCell.innerHTML = '&nbsp;';
        if(timeCell)     timeCell.innerHTML = '&nbsp;';
        if(notesCell)    notesCell.innerHTML = '&nbsp;';
        // clear titles
        if(costCell)     costCell.removeAttribute('title');
        if(durationCell) durationCell.removeAttribute('title');
        if(timeCell)     timeCell.removeAttribute('title');
        if(notesCell)    notesCell.removeAttribute('title');
        // set visibility for regular table cells beyond enclosing div
        if( row>tableLength )
            nameCell.parentNode.style.display = 'none';
        row++;
    }
    return;
}

/* The skills table is populated in-line in the loadCharacter function */

function clearAndCountPossessionsTableRows() {
    var tableLength = 1*$("#stuffTableVisibleLength").val();
    clearPossessionsTableRows( '', 1 );
    clearPossessionsTableRows( 'all_', 1 );
    clearPossessionsTableRows( 'supp_', tableLength+1 );
    clearPossessionsTableRows( 'suppCombo_', tableLength+1 );
    // clearPossessionsTableRows returns number of last row processed - could return this value
}

function clearPossessionsTableRows( TRIDprefix, startRow ) {
    var tableLength = $("#stuffTableVisibleLength").val();
    var row=startRow;
    while( document.getElementById(TRIDprefix+'equipItem'+row+'_name') ) {
    		var equipNameCell = document.getElementById(TRIDprefix+'equipItem'+row+'_name');
        // reset row attributes
        var equipRow = equipNameCell.parentNode;
        equipRow.removeAttribute('class');
        $('#'+TRIDprefix+'equipItem'+row+'_name').parent().show();
        equipRow.removeAttribute('onmousedown');
        equipRow.removeAttribute('onmouseover');
        equipRow.removeAttribute('onmouseout');
        equipRow.removeAttribute('title');
        // make new row element/nodes to replace the ones taken out for basic equipment or shield rows
        if( equipNameCell.hasAttribute('colspan') ) {
            // get pointer(s) to cost cell, and to skill cell (if it exists)
            var cstCell = document.getElementById(TRIDprefix+'equipItem'+row+'_cost');
            var sklCell = document.getElementById(TRIDprefix+'equipItem'+row+'_skill');
            // make new damage type cell
            var dmgTypeCell = document.createElement('td');
            dmgTypeCell.setAttribute('id',TRIDprefix+'equipItem'+row+'_dmgType');
            dmgTypeCell.setAttribute('class','underlined fill-in');
            // make new damage amount cell
            var dmgAmtCell = document.createElement('td');
            dmgAmtCell.setAttribute('id',TRIDprefix+'equipItem'+row+'_dmgAmt');
            dmgAmtCell.setAttribute('class','underlined fill-in');
            // make new skill cell
            var skillCell = document.createElement('td');
            skillCell.setAttribute('id',TRIDprefix+'equipItem'+row+'_skill');
            skillCell.setAttribute('class','underlined fill-in');
            skillCell.setAttribute('style','text-align:center');
            if( sklCell ) {    // shield row fix
                // insert 2 cells to left of existing skill cell
                equipRow.insertBefore( dmgTypeCell, sklCell );
                equipRow.insertBefore(  dmgAmtCell, sklCell );
            }
            else {   // basic equipment row fix
                // insert 3 cells to left of cost cell
                equipRow.insertBefore( dmgTypeCell, cstCell );
                equipRow.insertBefore(  dmgAmtCell, cstCell );
                equipRow.insertBefore(   skillCell, cstCell );
            }
            // remove colspan attribute of name cell
            equipNameCell.removeAttribute('colspan');
           // console.log(equipNameCell);
        }
        // reset name cell
        equipNameCell.innerHTML = '&nbsp;';
        equipNameCell.removeAttribute('onmouseover');
        equipNameCell.removeAttribute('onmouseout');
        equipNameCell.removeAttribute('title');
        // clear damage stuff, if present
        if( document.getElementById(TRIDprefix+'equipItem'+row+'_dmgType') ) {
            document.getElementById(TRIDprefix+'equipItem'+row+'_dmgType').innerHTML = '';
            document.getElementById(TRIDprefix+'equipItem'+row+'_dmgAmt').innerHTML = '';
            document.getElementById(TRIDprefix+'equipItem'+row+'_dmgAmt').removeAttribute('title');
        }
        // clear skill level, if present
        if( document.getElementById(TRIDprefix+'equipItem'+row+'_skill') ) {
            document.getElementById(TRIDprefix+'equipItem'+row+'_skill').innerHTML = '';
        }
        // clear location cell, if present
        if( document.getElementById(TRIDprefix+'equipItem'+row+'_loc') ) {
            document.getElementById(TRIDprefix+'equipItem'+row+'_loc').innerHTML = '';
        }
        // cost
        document.getElementById(TRIDprefix+'equipItem'+row+'_cost').innerHTML = '&nbsp;';
        // weight
        document.getElementById(TRIDprefix+'equipItem'+row+'_weight').innerHTML = '';
        // set visibility for regular table cells beyond visible extent of enclosing div
        if( row>tableLength && !TRIDprefix ) { // console.log('hiding row '+row+' (parent of '+TRIDprefix+'equipItem'+row+'_name)');
            $('#'+TRIDprefix+'equipItem'+row+'_name').parent().hide();
            // in case cost/weight are displayed in a separate table
            $('#'+TRIDprefix+'equipItem'+row+'_cost').parent().hide();
        }
        row++;
    }
    while( document.getElementById(TRIDprefix+'equipItemCompact'+row) ) {
    		var equipCell = document.getElementById(TRIDprefix+'equipItemCompact'+row);
        equipCell.removeAttribute('class');
        equipCell.className = 'fill-in';
        equipCell.removeAttribute('onmousedown');
        equipCell.removeAttribute('onmouseover');
        equipCell.removeAttribute('onmouseout');
        equipCell.removeAttribute('title');
        row++;
    }
    return row-1;
}

function loadPossessionsTable( collectionID ) {

    var ch = document.loadedCharacter;
    var collection = ch.collections[collectionID];
    var wearWieldMenuListHTML = [];
    var visibleRows = 1*document.getElementById('stuffTableVisibleLength').value;
    var displayLength = displayableLength( collection );
    if( window.console && reportLevel>1 ) console.log("Displayable length of collection: "+displayLength);

    // need to implement wield/wear menu list stuff

    // var limited = ( displayLength>visibleRows ) ? true : false;
    // if( limited ) {
        // check preference for overflow
        if( ch.preferences.display.stuffSupp ) {  // display the supplementary page
            if( window.console ) { console.log("[loadPossessionsTable] showing csheet_suppEquipment_wrapper; stuffSuppPagePref="+ch.preferences.display.stuffSupp); }
            $("#csheet_suppEquipment_wrapper").show('slow');
        }
        if( ch.preferences.display.stuffScroll ) {  // implement scrolling
            if( window.console && reportLevel>1 ) { console.log("[loadPossessionsTable] giving weapons_possessions_table overflow-y property; stuffScrollPref="+ch.preferences.display.stuffScroll); }
            $("#weapons_possessions_table").parent().css('overflow-y','auto');
            $("#armor_possessions_table").parent().css('overflow-y','auto');
        }
    // }
    // try to determine if space will be cramped ( displayLength<=visibleRows, but won't be if suggested spaces are used, or weapon options are shown, etc.)
    var cramped = false;

    // see if this sheet uses a 'Weapons and' table or just a 'Possessions' table
    var showWeapons = ( document.getElementById('weapons_possessions_table') ) ? true : false;
    // this isn't a perfect way to do this, but works with the c-sheets I have now
    // and should continue to work, although it analyzes the *sheet*, rather than exactly the *table*
    // the problem with this is that it means I can only use one kind of table per sheet

    /*  ARMOR & POSSESSIONS table 'Location' column
        This offers an interesting challenge to the Collections model.
        It is quite reasonable to interpret this column as implying that one shouldn't list
        a collection here without expanding it; i.e., the Location column can be interpreted
        as being the Collection to which an item belongs.
        For example:  Corwin Bearclaw carries a backpack in which he has stowed several items
                      (his camping gear, a blanket, a first-aid kit, and his purse (which contains
                      in turn his money)).  These items could be listed thus:

                      ARMOR & POSSESSIONS                  |
                      Item                        Location | Cost       Weight
                      Backpack                        worn | $60         3 lbs
                      personal camping basics         pack | $10           -
                      blanket, heavy wool             pack | $20         5 lbs
                      first aid kit                   pack | $30         2 lbs
                      purse                           pack | $20        0.5 lb
                      gold and silver coins     purse,pack | $75           -

        How could such a listing be accomplished?  My first thought is that to do this, I need
        to extract most of the middle part of the loadPossessionsTable function as a new
        'print collection' function, which could then be used recursively:

          collection.prototype.printCollection( row );

        Is the loadPossessionsTable function almost this already?  Could I modify it just a little
        and rename it to get the same effect?  If so, I would need to make it aware that sometimes
        it should NOT expand collections (recursively).

        I have encountered this question before, when first developing the Collections machinery.

        For the moment, I have handled this issue in a different way, with collection pop-ups.
    */

    var tableTypePrefs = ['all_','','supp_','suppCombo_'];
    // record marker for point in collection to start when printing in supplemental pages
    var cMark = 1;  // collection[0] is always the collection name, not an equipment item
  TABLETYPES:
    for( var tp=0; tp<tableTypePrefs.length; tp++ ) {

        var idPref = tableTypePrefs[tp];  //console.log("[loadPossessionsTable] idPref: "+idPref);
        if( window.console && reportLevel>1 ) { console.log("[loadPossessionsTable] loading table "+idPref+"equip"); }
        var i = 1;
        var setDefault = ( idPref.match(/all_/i) ) ? ",'default'" : '';

        var readyNext = false;
        var wearNext  = false;
        var wieldNext = false;
        var wieldSkill = '';
        var wpRow = ( idPref.match(/supp/i) ) ? visibleRows+1 : 1;   // this makes it so that the script doesn't look for 'supp_equipItem1', which doesn't exist
      //  alert("testing displayLength: "+displayLength);
        if( idPref.match(/supp/i) && displayLength<visibleRows ) continue TABLETYPES;
      //  if( window.console ) { console.log("Set collection mark?\n if( !idPref.match(/supp/i) && cMark==1 && wpRow>visibleRows ): if( "+!idPref.match(/supp/i)+" && "+cMark+"==1 && "+wpRow+">"+visibleRows+" )"); }

        collection = ( idPref.match(/all_/i) ) ? ch.collections.default : ch.collections[collectionID];
        if( window.console && reportLevel>2 ) console.log("for( var i=cMark; i<collection.length; i++ ):\nfor( i="+cMark+"; i<"+collection.length+"; i++ )");

      COLLITEMS:
        for( i=cMark; i<collection.length; i++ ) {

            var naiveRow = wpRow;

          //  alert(typeof collection[i]);

            // var itemObj = ( collection[i].hasOwnProperty('line') || typeof collection[i] == 'string' || typeof collection[i] == 'array' )
            //             ? collection[i]
            //             : cloneEquipmentFromGenericObject( collection[i] );
            var itemObj = collection[i];
          //  alert("[loadPossessionsTable] collection item "+i+":\n"+JSONstring.make(itemObj)+"\n\nwieldNext is "+wieldNext);

            // note wear/wield indicators
            if( itemObj=='ready' ) { readyNext=true; continue COLLITEMS }
            if( itemObj=='wear'  ) {  wearNext=true; continue COLLITEMS }
            if( itemObj=='wield' ) {
                i++;
                wieldSkill=collection[i];
                wieldNext=true; continue COLLITEMS;
            }

            // need to know the equipment type, to decide how to display it
            // (now needed earlier than before, so weapons can be skipped in certain tables)
            var group = 'collection';
            if( itemObj.hasOwnProperty('HP') )        { group = 'shields';   itemObj = cloneEquipmentFromGenericObject( collection[i] ); }
            else if( itemObj.location )               { group = 'armor';     itemObj = cloneEquipmentFromGenericObject( collection[i] ); }
            else if( itemObj.wieldOptions )           { group = 'weapons';   itemObj = cloneEquipmentFromGenericObject( collection[i] ); }
            else if( itemObj.hasOwnProperty('line') ) { group = 'format'; }
            else if( itemObj.name )                   { group = 'equipment'; itemObj = cloneEquipmentFromGenericObject( collection[i] ); }
          //  console.log("[loadPossessionsTable] after determining group ("+group+"), item is:\n"+JSONstring.make(itemObj));
          //  alert('equipment item type: '+group);

            // skip weapon items in a 'Possessions' only table
            if( group=="weapon" && !showWeapons ) {
              //  alert("'not a weapon' test on item of group "+group);
                if( window.console && reportLevel>2 ) console.log("skipping a weapon item; this is a non-weapons-only table");
                continue COLLITEMS;
              //  alert(itemObj.name+" is a weapon");
            }

            if( window.console && reportLevel>3 ) { console.log("accessing equipment cell "+idPref+wpRow); }

            // if this is a compact equipment display, do this stuff and get out:
            if( !!document.getElementById('WeaponStatsBox') || !!document.getElementById('EquipmentStatsBox') ) {
              //  if( window.console ) { console.log('found a *StatsBox'); }
              //  alert('found a *StatsBox');
            	//	alert(document.body.contains(document.getElementById('WeaponStatsBox')));
            		if( !!document.getElementById('WeaponStatsBox') && group!='weapons' ) continue COLLITEMS;
            	//	alert('found something to print in '+idPref+'equipItemCompact'+i+': '+itemObj.name);
            	//  if( window.console ) console.log('found something to print in '+idPref+'equipItemCompact'+i+': '+itemObj.name);
            		var itemCell = document.getElementById(idPref+'equipItemCompact'+i);
                if( !itemCell ) {
                    if( window.console && reportLevel>1 ) { console.log("no cell "+idPref+'equipItemCompact'+i+", terminating "+collectionID+"-collection-printing loop"); }
                    break COLLITEMS;
                }
               // if( window.console ) console.log('got an itemCell:');
              //  if( window.console ) console.log(itemCell);
            		itemCell.innerHTML = itemObj.printCompact()+';&ensp;';
            	//	itemCell.innerHTML += (i+1<collection.length) ? ', ' : '';
                itemCell.setAttribute('onmousedown',"if(event.shiftKey){click2useToggle("+i+")} else{editEquipmentDialog("+i+setDefault+")}");
                itemCell.className = 'clickable '+itemCell.className;
                var un_wield;
              //  alert('wieldNext: '+wieldNext+"\nopt: "+opt);
              // if( window.console ) console.log('wieldNext: '+wieldNext+"\nopt: "+opt);
                if( wieldNext ) {
                    itemCell.setAttribute('class',itemCell.className+' ready');
                    un_wield = 'put away';
                }
                else /*if( opt==0 )*/ {      // add entry for this weapon to wieldMenuListHTML (but only once, so do it for the first option row)
                    wearWieldMenuListHTML.push('<li><a onclick="click2useToggle('+i+')" style="width:150px">'+itemObj.name+'</a></li>');
                    un_wield = 'wield';
                }
                itemCell.setAttribute('title',"shift-click to "+un_wield+' '+itemObj.name);
                wieldNext = false;
            		continue COLLITEMS;
            }

            // get pointers to the various table cells for this row (to avoid multiple accesses)
            var itemNameCell = document.getElementById(idPref+'equipItem'+wpRow+'_name');
            var itemDTypCell = document.getElementById(idPref+'equipItem'+wpRow+'_dmgType');
            var itemDAmtCell = document.getElementById(idPref+'equipItem'+wpRow+'_dmgAmt');
            var itemCostCell = document.getElementById(idPref+'equipItem'+wpRow+'_cost');
            var itemWghtCell = document.getElementById(idPref+'equipItem'+wpRow+'_weight');
            var itemLocnCell = document.getElementById(idPref+'equipItem'+wpRow+'_loc');
            var itemSkilCell = document.getElementById(idPref+'equipItem'+wpRow+'_skill');
            if( !itemNameCell ) {
                if( window.console && reportLevel>1 ) { console.log("no cell "+idPref+'equipItem'+wpRow+", terminating "+collectionID+"-collection-printing loop"); }
                break;
            }

            // detect row-skipping & heading 'items'; skip a row for them unless cramped
            if( group=="format" ) {
                if( itemObj.line ) {  // line field is not empty; use text as heading
                    itemNameCell.innerHTML
                        = '<span style="font-style:italic; font-weight:bold">'+itemObj.line+'</span>';
                    wpRow++;
                }
                else {                // if field is empty, print a spacer row (unless things are cramped)
                    if( !cramped ) { wpRow++; }
                }
                if( window.console && reportLevel>2 )
                    console.log("incrementing the row counter for a spacer or title entry at item "+i);
                continue COLLITEMS;
                // no need to re-localize cell vars if wpRow was incremented above; as loop is restarted here
            }


     //       if( collectionXcontainsCollectionY(collection,itemObj) )

            // some of these aren't being used any more...
            var name   = ( itemObj.hasOwnProperty( 'name' ) ) ? itemObj.name   : itemObj[0]+' <i>collection</i>';
            if( itemObj.detail ) name = itemObj.detail+' '+name;
            // var weight = ( itemObj.hasOwnProperty('weight') ) ? itemObj.weight : ch.totalEquipmentQuantity('weight',ch.getCollectionLabelByName(itemObj[0]));
            var weight = ( itemObj.hasOwnProperty('weight') ) ? actualWeight(itemObj) : ch.totalEquipmentQuantity( 'actualWeight' ,ch.getCollectionLabelByName(itemObj[0]));
            var cost   = ( itemObj.hasOwnProperty( 'cost' ) ) ?  actualCost(itemObj)  : ch.totalEquipmentQuantity(  'actualcost'  ,ch.getCollectionLabelByName(itemObj[0]));
            var num    = ( itemObj.hasOwnProperty('number') ) ? itemObj.number : 1;
            var quant  = ( num>1 ) ? num+' ' : '';
            var desc   = ( itemObj.hasOwnProperty('composition') ) ? ', '+itemObj.composition : '';   // shields
            desc += ( itemObj.buckler ) ? ' (buckler)' : '';
            desc += ( itemObj.hasOwnProperty('description') ) ? '; '+itemObj.description : '';
          //  alert('[loadPossessionsTable] description text: '+desc);
            if( window.console && reportLevel>3 ) { console.log("got display info for "+name+", item "+i); }

            // format item name for printing; shorten long names
            var maxLength = ( itemDTypCell && group=='weapons' )
                          ? (idPref) ? 30 : 16
                          : 40;
            var snip = ( itemDTypCell && group=='weapons' )
                     ? 5
                     : 15;
            var printName = name;
//             if( name && name.length>maxLength ) {
//              //   printName = name.substr(0,snip+2) + '...' + name.substr(-snip,snip);
//                 printName = name.substr(0,snip+8) + '...';
//             }
                 // if( name.match(/Quarterstaff/i) )
                 //   console.log("weapon printname: " + printName)

            // get weight formatted for printing; abbreviate long numbers
            var numWeight = ( itemObj.hasOwnProperty('name') )
						              ? ( isNaN(actualWeight(itemObj)) ) ? actualWeight(itemObj) : itemObj.number*actualWeight(itemObj)
						              : ch.totalEquipmentQuantity( 'actualWeight', ch.getCollectionLabelByName(itemObj[0]) );
						    // console.log("[loadPossessionsTable] numWeight for "+itemObj.name+" is "+numWeight);
            var convWt = abbreviateNumber( convertWeight( numWeight, ch.preferences.units.measure ) );
						    // console.log("[loadPossessionsTable] convWt for "+itemObj.name+" is "+convWt);
            if( ch.preferences.display.fractions ) convWt = makeMixedFraction( convWt );  //  alert('convWt: '+convWt);
            // else convWt = abbreviateNumber( convWt );
						    // console.log("[loadPossessionsTable] convWt for "+itemObj.name+" is "+convWt);
            var wtUnit = ( isNaN(numWeight) ) ? '' : unitsFor[ch.preferences.units.measure].weight;
            var esChar = es(numWeight,true);
            if( !esChar ) esChar = '&nbsp;';
          //  var printWeight= ( itemDTypCell && !idPref.match(/all_/i) )
            var printWeight= ( itemDTypCell && !idPref )
//                 ? ( convWt==0 ) ? '&ndash;'       : abbreviateNumber( convWt )                    // cramped situation; center-aligned cells
//                 : ( convWt==0 ) ? '&ndash;&emsp;' : abbreviateNumber( convWt )+' '+wtUnit+esChar; // less cramped; right-aligned
                ? ( convWt==0 ) ? '&ndash;'       : convWt                    // cramped situation; center-aligned cells
                : ( convWt==0 ) ? '&ndash;&emsp;' : convWt+' '+wtUnit+esChar; // less cramped; right-aligned

            // get cost for printing; abbreviate large costs
            var totalCost = cost*num;
              // alert("totalCost = "+cost+"*"+num+": "+totalCost);
            if( !idPref.match(/all_/i ) ) totalCost = abbreviateNumber(totalCost);
            if( !isNaN(totalCost) && totalCost != Math.trunc(totalCost) ) totalCost = Number.parseFloat(Math.round(totalCost+'e2')+'e-2').toFixed(2);
            var printCost = ( cost==0 ) ? '&ensp;&ndash;' : '$' + totalCost;

          //  if( window.console ) console.log("preparing to print "+name+" on "+idPref+" row "+wpRow);

            $('#'+idPref+'equipItem'+wpRow+'_name').parent().show();
            $('#'+idPref+'equipItem'+wpRow+'_cost').parent().show();

            // Name, cost, weight are always printed - do these before branching
            // if(itemObj.name) console.log(itemObj.print());
          //  itemNameCell.innerHTML = quant + plural(name,num) + desc;
            itemNameCell.innerHTML = (itemObj.name) ? itemObj.print() : quant+plural(name,num)+desc;
            if(itemObj.notes) itemNameCell.setAttribute('title',itemObj.notes.join("\n"));
            itemCostCell.innerHTML = printCost;
            itemWghtCell.innerHTML = printWeight;
            // Name will be reprinted if item is a weapon, as it is done differently for that case.

            // if about to print a non-weapon in a table with columns for damage, skill level, etc...
            if( group=='shields' && itemSkilCell ) {
                // get rid of damage cells, and stretch the name cell over
                var rowElmt = itemSkilCell.parentNode;
                rowElmt.removeChild( itemDTypCell );
                rowElmt.removeChild( itemDAmtCell );
               // console.log("attaching 'colspan=3' attribute to name cell in row "+wpRow);
                itemNameCell.setAttribute('colspan',3);
               // console.log(itemNameCell);
            }
            else if( group!='weapons' && itemDTypCell ) {
                // get rid of damage cells and skill level cell, and stretch the name cell over
                var rowElmt = itemDTypCell.parentNode;
                rowElmt.removeChild( itemDTypCell );
                rowElmt.removeChild( itemDAmtCell );
                rowElmt.removeChild( itemSkilCell );
               // console.log("attaching 'colspan=4' attribute to name cell in row "+wpRow);
                itemNameCell.setAttribute('colspan',4);
               // console.log(itemNameCell);
            }

            var equipTRelmt = itemNameCell.parentNode;
            equipTRelmt.setAttribute('onmousedown',"if(event.shiftKey){click2useToggle("+i+")} else{editEquipmentDialog("+i+setDefault+")}");
            var optionGroupSkillLabel;
            if( group=='weapons' ) {

                // start by instantiating itemObj as a Weapon object (this will allow figuring of damage viz quality, for instance)

                // select one of the wield option groups (i.e., Skill groups) to display
                // use wielded option group if one is found, otherwise use first option group (unless ruleset disallows it)
                var optionGroup;
                if( wieldNext ) {
                    optionGroupSkillLabel = wieldSkill;
                    optionGroup = itemObj.wieldOptions[optionGroupSkillLabel];
                    if( itemLocnCell ) {
                        itemLocnCell.innerHTML = 'wielded';
                    }
                }
                else {
                    optionGroupSkillLabel = null;
                    optionGroup = null;
                    for( var gpSkill in itemObj.wieldOptions ) {        // loop over wield skill option groups
                        optionGroupSkillLabel = gpSkill;                     // and save the first (allowed) group info
                        optionGroup = itemObj.wieldOptions[gpSkill];
                        break;                                          // then exit loop
                    }
                }
                var optionGroupSkill = ch.getSkill(optionGroupSkillLabel);

                // if( name.match(/halberd/i) )
                // alert(JSONstring.make(optionGroup));

                // analyze this option group and print corresponding weapon stats
                var optRowMax = 0;
              WOPTIONS:
                for( var opt=0; opt<optionGroup.length; opt++ ) {     // loop over the options within skill option group
                    var option = optionGroup[opt];
                    // alert("option "+opt+":\n"+JSONstring.make(option));

                    // filter out ruleset-incompatible wield options
                   // if( option.ruleset && !option.ruleset.e3 && !option.ruleset.e3lite ) { continue; }
                    // I probably want to do this, but this isn't how (functions aren't sheet or ruleset specific now)

                    // print name on first option line, '  "  ' on second
                    var nameEntry = '';
                   // if( opt==0 ) { nameEntry = quant + plural(name,num); }
                    if( opt==0 ) { nameEntry = quant + plural(printName,num); }
                    else if( opt>0 ) {     // this is the second line
                        wpRow++;
                        if( window.console && reportLevel>3 )
                            console.log("incrementing the row counter for "+name+" wield option "+opt);
                        // these must now be re-localized
                        if( wpRow!=naiveRow ) {
                            itemNameCell = document.getElementById(idPref+'equipItem'+wpRow+'_name');
                            itemDTypCell = document.getElementById(idPref+'equipItem'+wpRow+'_dmgType');
                            itemDAmtCell = document.getElementById(idPref+'equipItem'+wpRow+'_dmgAmt');
                            itemCostCell = document.getElementById(idPref+'equipItem'+wpRow+'_cost');
                            itemWghtCell = document.getElementById(idPref+'equipItem'+wpRow+'_weight');
                            itemLocnCell = document.getElementById(idPref+'equipItem'+wpRow+'_loc');
                            itemSkilCell = document.getElementById(idPref+'equipItem'+wpRow+'_skill');
                        }
                        if( !itemNameCell ) continue TABLETYPES;    // might run off end of table between options
                        equipTRelmt = itemNameCell.parentNode;
                        equipTRelmt.setAttribute('onmousedown',"if(event.shiftKey){click2useToggle("+i+")} else{editEquipmentDialog("+i+setDefault+")}");
                        // skip this if table doesn't display weapon stats
                        if( !itemDTypCell ) {
                            if( window.console && reportLevel>3 )
                                console.log("decrementing the row counter for wield option "+opt+"; no cells to print wield option stats in");
                            wpRow--;
                            continue WOPTIONS;
                        }
                       // var halfLength = Math.min(Math.ceil(name.length/2),12);
                        var halfLength = Math.min(Math.ceil(3*name.length/4),10);
                        var spaces = Array(halfLength).join('&nbsp;');
                        nameEntry = spaces+'&nbsp;"'+spaces;
                    }
                    nameEntry += ( option.title && itemDTypCell )
                          ?  ' ('+option.title/*.substr(0,3)*/+')'
                          :  '';
                    itemNameCell.innerHTML = nameEntry + desc;

                 //if( name.match(/Quarterstaff/i) )
                   // alert("printing weapon "+name+" (wield option "+opt+") on line "+wpRow);
                   // console.log("printing weapon "+name+" (wield option "+opt+") on line "+wpRow);
                   //console.log("printing weapon " + nameEntry + desc)

                    var dmgStrings = getWeaponObjectDamageStrings( itemObj, optionGroupSkillLabel, option, ch );

                    // prep damage objects for printing
                    if( itemDTypCell ) {
                        itemDTypCell.innerHTML = dmgStrings[3];
                    }
                    if( itemDAmtCell ) {
                        itemDAmtCell.innerHTML  = dmgStrings[0];
                        if( optionGroupSkill ) {
                            itemDAmtCell.setAttribute('title',dmgStrings[2])
                        }
                    }

                    // alter this weapon item row to allow click-to-use
                    if( !idPref.match(/all_/i) ) {
                          //  alert('enabling click-to-use on row '+wpRow);
                        equipTRelmt.className = 'clickable '+equipTRelmt.className;
                       // if( ch.ST()>=weaponST ) {
                        var un_wield;
                        if( wieldNext ) {
                            if( window.console && reportLevel>2 ) { console.log(ch.description.name+" is wielding the "+itemObj.name+", highlighting it on c-sheet"); }
                            equipTRelmt.setAttribute('class',equipTRelmt.className+' ready');
                            un_wield = 'put away';
                        }
                        else if( opt==0 ) {      // add entry for this weapon to wieldMenuListHTML (but only once, so do it for the first option row)
                            if( window.console && reportLevel>2 ) { console.log(ch.description.name+" is not wielding the "+itemObj.name+", adding it to Wield Item menu"); }
                            wearWieldMenuListHTML.push('<li><a onclick="click2useToggle('+i+')" style="width:150px">'+itemObj.name+'</a></li>');
                            un_wield = 'wield';
                        }
                        equipTRelmt.setAttribute('title',"shift-click to "+un_wield+' '+itemObj.name);
                       // }
                       // else {
                       //     itemNameCell).parentNode.setAttribute('title',"<weapon> ST too high; <character> cannot wield it");
                       // }
                    }

                    optRowMax=opt;
                       // alert('end of this wield option');
                }   // end of skill option group loop

                // print wield skill level, if that cell is present
               //  if( name.match(/halberd/i) )
               //  alert('writing '+optionGroupSkillLabel+' skill level to row ('+wpRow+'-'+optRowMax+')');
               // alert(JSONstring.make(optionGroupSkill));
                if( document.getElementById(idPref+'equipItem'+(wpRow-optRowMax)+'_skill') ) {
                    var optionSkillLevel = ch.levelOfSkillWithInfo( optionGroupSkillLabel );
                    document.getElementById(idPref+'equipItem'+(wpRow-optRowMax)+'_skill').innerHTML
                        = (optionSkillLevel)
                        ? '<b>'+optionSkillLevel+'</b>'
                        : '&ndash;';
                  // if( name.match(/halberd/i) )
                  //   alert( document.getElementById(idPref+'equipItem'+(wpRow-optRowMax)+'_skill').innerHTML );
                }
            } // end group=='weapon' branch

            else if( group=='armor' && !idPref.match(/all_/i) ) {
                // alter this equipment item row to allow click-to-use
                equipTRelmt.className = 'clickable '+equipTRelmt.className;
                var wear_takeoff;
                if( wearNext && !idPref.match(/all_/i) ) {
                    if( window.console && reportLevel>2 ) { console.log(ch.description.name+" is wearing the "+name+", highlighting it on c-sheet"); }
                    equipTRelmt.setAttribute('class',equipTRelmt.className+' ready');
                    wear_takeoff = 'take off';
                    if( itemLocnCell ) {
                        itemLocnCell.innerHTML = 'worn';
                    }
                }
                else {      // add entry for this armor to wearMenuListHTML
                    if( window.console && reportLevel>2 ) { console.log(ch.description.name+" is not wearing the "+itemObj.name+", adding it to Wear Item menu"); }
                    wearWieldMenuListHTML.push('<li><a onclick="click2useToggle('+i+')" style="width:150px">'+itemObj.name+'</a></li>');
                    wear_takeoff = 'wear';
                }
                equipTRelmt.setAttribute('title',"shift-click to "+wear_takeoff+' '+itemObj.name);
            } // end group=='armor' branch

            else if( group=='shields' ) {
                if( itemSkilCell ) {
                    let itemSklSpc = ( itemObj.skill )
                    itemSkilCell.innerHTML = '<b>'+ch.levelOfSkillWithInfo( itemObj.skill )+'</b>';
                }
                if( !idPref.match(/all_/i) ) {
                    // alter this equipment item row to allow click-to-use
                    equipTRelmt.className = 'clickable '+equipTRelmt.className;
                    var ready_putaway;
                    if( readyNext ) {
                        if( window.console && reportLevel>2 ) { console.log(ch.description.name+" is using the "+name+", highlighting it on c-sheet"); }
                        equipTRelmt.setAttribute('class',equipTRelmt.className+' ready');
                        ready_putaway = 'put away';
                        if( itemLocnCell ) {
                            itemLocnCell.innerHTML = 'ready';
                        }
                    }
                    else {      // add entry for this shield to wearMenuListHTML
                        if( window.console && reportLevel>2 ) { console.log(ch.description.name+" is not using the "+itemObj.name+", adding it to Wear Item menu"); }
                        wearWieldMenuListHTML.push('<li><a onclick="click2useToggle('+i+')" style="width:150px">'+itemObj.name+'</a></li>');
                        ready_putaway = 'ready';
                    }
                    equipTRelmt.setAttribute('title',"shift-click to "+ready_putaway+' '+name);
                }
            } // end group=='shields' branch

            else if( group=='collection' ) {
                equipTRelmt.setAttribute('onmousedown', 'if(event.shiftKey){} else {openEditListDialog("collections:'+ch.getCollectionLabelByName(itemObj[0])+'")}');
                equipTRelmt.setAttribute('onmouseover',"showCollectionContents('"+ch.getCollectionLabelByName(itemObj[0])+"',event)");
                equipTRelmt.setAttribute('onmouseout','hidePopupList()');
            } // end group=='collection' branch

            // no need for group=='equipment' branch, it seems

            // reset wear/wield flags
            wieldNext = false;
            wearNext  = false;

            wpRow++;

            if( !idPref && cMark==1 && wpRow>visibleRows ) cMark = i+1;

        } // collection loop

        // show starting cash
        if( ch.preferences.display.showStartingCash && wpRow<=visibleRows && document.getElementById(idPref+'equipItem'+wpRow+'_name') ) {
        		// console.log("printing 'cash' on row "+wpRow);
            document.getElementById(idPref+'equipItem'+wpRow+'_name').innerHTML = 'cash';
            document.getElementById(idPref+'equipItem'+wpRow+'_cost').innerHTML = '$' + 1*( ch.startingWealth() - ch.defaultCollectionValue() );
            //wpRow++;
        }

    } // table types (main, supp, suppCombo) loop

    // populate Wear / Wield Item menu
    if( document.getElementById('wearWieldItemMenu') ) {
        document.getElementById('wearWieldItemMenu').innerHTML   // need to reset first, else readying the only piece of equipment causes it to remain in the menu
            = '<a class="flywide">Wear / Wield Item</a>';
        // build a <ul> around joined up wearWieldMenuListHTML, stick it into menu <li> element (but only if there are entries)
        if( wearWieldMenuListHTML.length>0 ) {
            document.getElementById('wearWieldItemMenu').innerHTML
                += "\n            <ul style=\"width:150px\">\n                "
                +  wearWieldMenuListHTML.join("\n                ")
                +  "\n            </ul>\n        ";
        }
    }
    var overflow = (ch.preferences.display.stuffScroll) ? 'auto' : '';
    if( window.console && reportLevel>1 )
        console.log("setting weapons_possessions_table parent overflow-y: "+overflow);
    $("#weapons_possessions_table").parent().css('overflow-y',overflow);
    if( window.console && reportLevel>1 )
        console.log("setting equipment_table parent overflow-y: "+overflow);
    $("#equipment_table").parent().css('overflow-y',overflow);
}

function clearAndCountWeaponRangesTableRows() {
    var row=1;
    while( document.getElementById('ranged_weapon_name'+row) ) {
    		var rWeaponNameCell = document.getElementById('ranged_weapon_name'+row);
    		var rWeaponSSCell = document.getElementById('ranged_weapon_SS'+row);
    		var rWeaponAccCell = document.getElementById('ranged_weapon_acc'+row);
    		var rWeaponHalfDmgCell = document.getElementById('ranged_weapon_half'+row);
    		var rWeaponRangeCell = document.getElementById('ranged_weapon_range'+row);

        // reset row attributes
        var rWeaponRow = document.getElementById('ranged_weapon_name'+row).parentNode;
        // are there ever any?

        // clear cell contents
        rWeaponNameCell.innerHTML = '&nbsp;';
        rWeaponSSCell.innerHTML = '&nbsp;';
        rWeaponAccCell.innerHTML = '&nbsp;';
        rWeaponHalfDmgCell.innerHTML = '&nbsp;';
        rWeaponRangeCell.innerHTML = '&nbsp;';
        // does anything else need to be done?  class, title, style, javascript, etc?

        row++;
    }
    return row-1;
}

function loadWeaponRangesTable( collectionID, availRows ) {

    var ch = document.loadedCharacter;
    var collection = ch.collections[collectionID];

    var wrRow = 1;

    for( var i=1; i<collection.length; i++ ) {

        if( wrRow>availRows ) { break; /* should probably warn somehow, too */ }
        var itemObj = collection[i];
        if( !itemObj ) continue;

        // this will skip non-weapon items
        if( !itemObj.wieldOptions ) continue;
      //  alert("printing wield options for "+JSONstring.make(itemObj));

        for( var optionGroupSkill in itemObj.wieldOptions ) {
            var optionGroup = itemObj.wieldOptions[optionGroupSkill];
            var foundRangedStats = false;
            for( var opt=0; opt<optionGroup.length; opt++ ) {                 // loop over the options list within skill group
                var option = optionGroup[opt];
                if( !option.hasOwnProperty('maximumRange') ) { continue; }  // skip non-ranged wield options in generic weapon objects
                foundRangedStats = true;
               // alert("printing stats for "+itemObj.name+", "+optionGroupSkill+", '"+option.title+"' wield option");
                // print name
                nameEntry = (itemObj.detail) ? itemObj.detail+' '+itemObj.name : itemObj.name;
                document.getElementById('ranged_weapon_name'+wrRow).innerHTML = nameEntry;
                // SS
                document.getElementById('ranged_weapon_SS'+wrRow).innerHTML = option.snapShot;
                // Acc
                document.getElementById('ranged_weapon_acc'+wrRow).innerHTML = (option.accuracy) ? option.accuracy : 0;
                // half-D range
                document.getElementById('ranged_weapon_half'+wrRow).innerHTML = halfDamageRangeFor( itemObj, option );
                // max range
                document.getElementById('ranged_weapon_range'+wrRow).innerHTML = extremeRangeFor( itemObj, option );
                wrRow++;
            }
            // don't report range stats for each ranged wield skill (they will be the same, no?)
            if( foundRangedStats ) { break; }
        }
        // filled rows?
    }
    return;
}

function clearAndCountWeaponsTableRows( wType ) {
    let row=1;
    while( document.getElementById(wType+'_weapon_name'+row) ) {
    		let weaponNameCell       = document.getElementById(wType+'_weapon_name'+row);
    		let weaponMalfCell       = document.getElementById(wType+'_weapon_malf'+row);
    		let weaponDmgTypeCell    = document.getElementById(wType+'_weapon_dtype'+row);
    		let weaponDmgCell        = document.getElementById(wType+'_weapon_damage'+row);
    		let weaponReachCell      = document.getElementById(wType+'_weapon_reach'+row);
    		let weaponSSCell         = document.getElementById(wType+'_weapon_SS'+row);
    		let weaponAccCell        = document.getElementById(wType+'_weapon_acc'+row);
    		let weaponHalfDmgCell    = document.getElementById(wType+'_weapon_half'+row);
    		let weaponRangeCell      = document.getElementById(wType+'_weapon_range'+row);
    		let weaponCRangeCell     = document.getElementById(wType+'_weapon_crange'+row);
    		let weaponReachRangeCell = document.getElementById(wType+'_weapon_reachrange'+row);
    		let weaponROFCell        = document.getElementById(wType+'_weapon_rof'+row);
    		let weaponShotsCell      = document.getElementById(wType+'_weapon_shots'+row);
    		let weaponSTCell         = document.getElementById(wType+'_weapon_ST'+row);
    		let weaponBulkCell       = document.getElementById(wType+'_weapon_bulk'+row);
    		let weaponRecoilCell     = document.getElementById(wType+'_weapon_rcl'+row);
    		let weaponLCCell         = document.getElementById(wType+'_weapon_LC'+row);
    		let weaponNotesCell      = document.getElementById(wType+'_weapon_notes'+row);
    		let weaponParryCell      = document.getElementById(wType+'_weapon_parry'+row);
    		let weaponSkillPtsCell   = document.getElementById(wType+'_weapon_skPts'+row);
    		let weaponSkillLevelCell = document.getElementById(wType+'_weapon_skLevel'+row);
    		let weaponCostCell       = document.getElementById(wType+'_weapon_cost'+row);
    		let weaponWeightCell     = document.getElementById(wType+'_weapon_weight'+row);

        // reset row attributes
        let weaponRow = document.getElementById(wType+'_weapon_name'+row).parentNode;
        weaponRow.removeAttribute('title');
        // any others?

        // clear cell contents
    		if( weaponNameCell )       weaponNameCell.innerHTML = '&nbsp;';
    		if( weaponMalfCell )       weaponMalfCell.innerHTML = '&nbsp;';
    		if( weaponDmgTypeCell )    weaponDmgTypeCell.innerHTML = '&nbsp;';
    		if( weaponDmgCell ) {
    		    weaponDmgCell.innerHTML = '&nbsp;';
    		    weaponDmgCell.removeAttribute('title');
    		}
    		if( weaponReachCell )      weaponReachCell.innerHTML = '&nbsp;';
    		if( weaponSSCell )         weaponSSCell.innerHTML = '&nbsp;';
    		if( weaponAccCell )        weaponAccCell.innerHTML = '&nbsp;';
    		if( weaponHalfDmgCell )    weaponHalfDmgCell.innerHTML = '&nbsp;';
    		if( weaponRangeCell )      weaponRangeCell.innerHTML = '&nbsp;';
    		if( weaponCRangeCell )     weaponCRangeCell.innerHTML = '&nbsp;';
    		if( weaponReachRangeCell ) weaponReachRangeCell.innerHTML = '&nbsp;';
    		if( weaponROFCell )        weaponROFCell.innerHTML = '&nbsp;';
    		if( weaponShotsCell )      weaponShotsCell.innerHTML = '&nbsp;';
    		if( weaponSTCell )         weaponSTCell.innerHTML = '&nbsp;';
    		if( weaponBulkCell )       weaponBulkCell.innerHTML = '&nbsp;';
    		if( weaponRecoilCell )     weaponRecoilCell.innerHTML = '&nbsp;';
    		if( weaponLCCell )         weaponLCCell.innerHTML = '&nbsp;';
    		if( weaponNotesCell ) {
            weaponNotesCell.innerHTML = '&nbsp;';
            weaponNotesCell.removeAttribute('title');
            weaponNotesCell.removeAttribute('onmouseover');
            weaponNotesCell.removeAttribute('onmouseout');
    		}
    		if( weaponParryCell )      weaponParryCell.innerHTML = '&nbsp;';
    		if( weaponSkillPtsCell )   weaponSkillPtsCell.innerHTML = '&nbsp;';
    		if( weaponSkillLevelCell ) weaponSkillLevelCell.innerHTML = '&nbsp;';
    		if( weaponCostCell )       weaponCostCell.innerHTML = '&nbsp;';
    		if( weaponWeightCell )     weaponWeightCell.innerHTML = '&nbsp;';
        // does anything else need to be done?  class, title, style, javascript, etc?
        // remove (onmouseover and onmouseout) event listeners
        

        row++;
    }
    return row-1;
}

function loadWeaponsTable( wType, collectionID, availRows ) {

    var ch = document.loadedCharacter;
    var collection = ch.collections[collectionID];

    if( (wType=='ranged') && document.getElementById('ranged_weapons_headings_table') )
        document.getElementById('ranged_weapons_headings_table').style.display = 'none';

    // count attack options
    var wOptCount = 0;
    for( var i=1; i<collection.length; i++ ) {
        var iObj = collection[i];
        if( iObj.wieldOptions ) {
            for( var optGpKey in iObj.wieldOptions ) {
                for( var o in iObj.wieldOptions[optGpKey] ) {
                    if( wType=='all' || (wType=='ranged')==iObj.wieldOptions[optGpKey][o].hasOwnProperty('maximumRange') ) wOptCount++;
                }
            }
        }
    }
    // alert(wType+' weapon options: '+wOptCount);
    // alert('available rows: '+availRows);
    // now, you can compare this count to the number of rows in the tables, and set a flag
    // to decide whether to show all options, or only one per weapon
    var show1opt = ( wOptCount>availRows ) ? true : false;

    var wRow = 1;

    for( var i in collection ) {

        if( wRow>availRows ) { break; /* should probably warn somehow, too */ }

        if( i==0 ) continue;      // skip the collection name item
        var itemObj = collection[i];

        // for now, this will prevent dealing with recursion due to nested collections
        if( !itemObj ) continue;

        // this will skip non-weapon items
        if( !itemObj.wieldOptions ) continue;
       // alert('considering weapon object '+JSONstring.make(itemObj));

        var wieldSkill = ( itemObj.wielded ) ? itemObj.wieldSkill : false;  // CHANGE THIS
        // needs to see if this item is wielded (look at i-2), and if so get the
        // wield skill listed at i-1

        // look through the wield options; choose the best option to display
       // var option = '';
        var options = [];
        var optionSkillKeys = [];
        var optionSkillKey = '';
        var rangedWeapon = false;
        // These have to be explicitly cleared this way or the previous value is still there in subsequent loop iterations.  Using 'var' doesn't reset.
        // Would using 'let' reset?
        // first look for an option corresponding to the way the weapon is wielded & matching wType
        if( wieldSkill && show1opt ) {
  //        alert('wielded');
            var optionGroup = itemObj.wieldOptions[wieldSkill];
            for( var opt in optionGroup ) {
                if( optionGroup[opt].hasOwnProperty('maximumRange') == (wType=='ranged') || wType=='all' ) {
                 // alert(wType+' option in wielded group, take it');
                    options.push( optionGroup[opt] );
                    optionSkillKeys.push( wieldSkill );
                    optionSkillKey = wieldSkill;
                    if( show1opt ) break;
                }
            }
        }
        // if no such option is found, look for the first option matching wType
        if( options.length==0 ) {
  //        alert('no wielded option found, looking for any '+wType+' option');
          OPTGROUP:
            for( var optionGroupSkill in itemObj.wieldOptions ) {
                var optionGroup = itemObj.wieldOptions[optionGroupSkill];
                for( var opt in optionGroup ) {   // loop over the options list within skill group
      //            alert('considering option '+opt+":\n"+JSONstring.make(optionGroup[opt]));
                    // filter out ruleset-incompatible wield options
          //          if( optionGroup[opt].ruleset && !optionGroup[opt].ruleset.compatWith(ch.gameInfo.ruleset) ) { continue; }  // throws an error for the 3e2pg sheet
                    if( optionGroup[opt].hasOwnProperty('maximumRange') == (wType=='ranged') || wType=='all' ) {
             //         alert(wType+' option, take it');
                        options.push( optionGroup[opt] );
                        optionSkillKeys.push( optionGroupSkill );
                        optionSkillKey = optionGroupSkill;
                        if( show1opt ) break OPTGROUP;
                        if( (wType=='ranged') ) rangedWeapon = true;
            //          alert('looking for further options');
                    }
                }
            }
        }
        // need to know the skill for this wield option too
      //  alert(itemObj.name+" options:\n"+JSONstring.make(options));

        if( rangedWeapon && document.getElementById('ranged_weapons_headings_table') )
            document.getElementById('ranged_weapons_headings_table').style.display = 'table';

        var quality = itemObj.quality;

       // if( option ) {
        for( var j=0; j<options.length; j++ ) {
            var option = options[j];
           // alert("found an option to print:\n"+JSONstring.make(option));
            // print name
            document.getElementById(wType+'_weapon_name'+wRow).innerHTML = ((itemObj.detail) ? itemObj.detail+' ' : '') + itemObj.name;
            // print damage for this option
            if( document.getElementById(wType+'_weapon_damage'+wRow) ) {
                var dmgStrings = getWeaponObjectDamageStrings( itemObj, optionSkillKeys[j], option, ch );
              // alert('getWeaponObjectDamageStrings( '+itemObj+', '+optionSkillKeys[j]+', '+option+', '+ch+' )');
              // alert("damage strings:\n"+JSONstring.make(dmgStrings));
                if( document.getElementById(wType+'_weapon_dtype'+wRow) ) {
                    document.getElementById(wType+'_weapon_dtype'+wRow).innerHTML = dmgStrings[3];
                    document.getElementById(wType+'_weapon_damage'+wRow).innerHTML = dmgStrings[0];
                }
                else {
                    document.getElementById(wType+'_weapon_damage'+wRow).innerHTML = dmgStrings[1];
                }
                document.getElementById(wType+'_weapon_damage'+wRow).parentNode.setAttribute('title', dmgStrings[2] )
            }
            // malfunction
            if( document.getElementById(wType+'_weapon_malf'+wRow) ) {
                // No weapons with a 'malf' attribute.  I only see rules for this in e4, what gives?
                // It is a function of TL, not a weapon attribute - and only applies to firearms and grenades.
                // Much more about malf in Ultra-Tech 3e; but boils down to types like 'crit' and 'verified crit'.
            		var malf = '-';
            		if( itemObj.malfunction ) {
            		    malf = itemObj.malfunction;
            		}
            		else if( itemObj.qualityEffectGroup && itemObj.qualityEffectGroup.match('gun') ) {
            				var TL = itemObj.TL;
            				malf = (TL>5) ? 17 : 2*(TL+3);  // maybe should be 'crit' instead of 17 for TL>5
            		}
                document.getElementById(wType+'_weapon_malf'+wRow).innerHTML = malf;
            }
            /*  Many, perhaps most, of the wieldOption attributes used below are optional.
                For the moment, I have accessed these with the " (option.att) ? option.att : <defaultValue> " construction.
                Defaults are not being defined in a constructor, because I don't actually have a WieldOption object class.
            */
            // reach
            if( document.getElementById(wType+'_weapon_reach'+wRow) ) {
                if( option.halfDamageRange ) '-'
                else document.getElementById(wType+'_weapon_reach'+wRow).innerHTML = ( option.reach ) ? option.reach : 1;
            }
            // Range stuff
            var hlfDRange = halfDamageRangeFor( itemObj, option );
            var extrRange = extremeRangeFor( itemObj, option );
            // snapshot
            if( document.getElementById(wType+'_weapon_SS'+wRow) && extrRange ) {
                document.getElementById(wType+'_weapon_SS'+wRow).innerHTML = (option.snapShot) ? option.snapShot : '-';
            }
            // accuracy
            if( document.getElementById(wType+'_weapon_acc'+wRow) && extrRange ) {
                document.getElementById(wType+'_weapon_acc'+wRow).innerHTML = (option.accuracy) ? option.accuracy : 0;
            }
            // half-D range
            if( document.getElementById(wType+'_weapon_half'+wRow) && extrRange ) {
                document.getElementById(wType+'_weapon_half'+wRow).innerHTML = hlfDRange;
            }
            // max range
            if( document.getElementById(wType+'_weapon_range'+wRow) && extrRange ) {
                document.getElementById(wType+'_weapon_range'+wRow).innerHTML = extrRange;
            }
            // combined range
            if( document.getElementById(wType+'_weapon_crange'+wRow) && extrRange ) {
                document.getElementById(wType+'_weapon_crange'+wRow).innerHTML = hlfDRange + '/' + extrRange;
            }
            // reach/range
            if( document.getElementById(wType+'_weapon_reachrange'+wRow) ) {
                var rch = ( option.reach ) ? option.reach : 1;
                document.getElementById(wType+'_weapon_reachrange'+wRow).innerHTML = (extrRange) ? hlfDRange+'/'+extrRange : rch;
            }
            // rate-of-fire
            if( document.getElementById(wType+'_weapon_rof'+wRow) && extrRange ) {
                document.getElementById(wType+'_weapon_rof'+wRow).innerHTML = (option.rateOfFire) ? option.rateOfFire : 1;
            }
            // shots
            if( document.getElementById(wType+'_weapon_shots'+wRow) && extrRange ) {
                document.getElementById(wType+'_weapon_shots'+wRow).innerHTML = itemObj.shots || 1;
                if( !itemObj.shots ) document.getElementById(wType+'_weapon_shots'+wRow).title = 'single shot assumed';
            }
            // strength
            if( document.getElementById(wType+'_weapon_ST'+wRow) ) {
                var st = (option.strength) ? option.strength : '-';
                if( itemObj.weaponST ) st = itemObj.weaponST;
                document.getElementById(wType+'_weapon_ST'+wRow).innerHTML = st;
            }
            // bulk
            if( document.getElementById(wType+'_weapon_bulk'+wRow) ) {
                document.getElementById(wType+'_weapon_bulk'+wRow).innerHTML = itemObj.bulk;
            }
            // recoil
            if( document.getElementById(wType+'_weapon_rcl'+wRow) && extrRange ) {
                document.getElementById(wType+'_weapon_rcl'+wRow).innerHTML = (option.recoil) ? option.recoil : 0;
            }
            // legality class
            if( document.getElementById(wType+'_weapon_LC'+wRow) ) {
                document.getElementById(wType+'_weapon_LC'+wRow).innerHTML = itemObj.LC;
            }
            // note(s)
            if( document.getElementById(wType+'_weapon_notes'+wRow) ) {
                let noteTitleList = (option.note) ? option.note.slice() : [];
                // fix old-style text notes:
                if( !Array.isArray(noteTitleList) ) noteTitleList = [noteTitleList];
                if( option.maxDamage ) {
                    if(noteTitleList) noteTitleList.push("Max. damage "+option.maxDamage+".")
                    else noteTitleList = option.maxDamage
                }
                document.getElementById(wType+'_weapon_notes'+wRow).innerHTML = (noteTitleList.length) ? noteTitleList.join(" ") : '&emsp;-';
                document.getElementById(wType+'_weapon_notes'+wRow).removeAttribute('onmouseover');
                if( noteTitleList.length ) {
                    var noteTitleHTML = '<ul><li>'+noteTitleList.join('</li><li>')+'</li></ul>';
                    document.getElementById(wType+'_weapon_notes'+wRow).setAttribute('onmouseover', "displayPopupList(event,'"+noteTitleHTML+"')");
                    document.getElementById(wType+'_weapon_notes'+wRow).setAttribute('onmouseout' , 'hidePopupList()');
                }
            }
            // parry
            if( document.getElementById(wType+'_weapon_parry'+wRow) ) {
                if( option.halfDamageRange ) '-'
                else {
                    // ch.parry returns an array: [ parryValue, parryingSkill ]
                    // (parryingSkill is only returned if the optional reportSkill (3rd) parameter is 'true')
                    var parryHash = ch.parry( itemObj, optionSkillKeys[j], true );
                   // alert('ch.parry() return array: '+JSONstring.make(parryHash));
                    document.getElementById(wType+'_weapon_parry'+wRow).innerHTML
                        = (parryHash.level)
                        ? parryHash.base+parryHash.level+parryHash.adjustments+parryHash.bonus
                        : '-';
                    document.getElementById(wType+'_weapon_parry'+wRow).title = parryHash.skill+' parry';
                }
            }
            // skill points
            if( document.getElementById(wType+'_weapon_skPts'+wRow) ) {
                document.getElementById(wType+'_weapon_skPts'+wRow).innerHTML = ch.pointsInSkillWithInfo( optionSkillKeys[j] );
            }
            // skill level
            if( document.getElementById(wType+'_weapon_skLevel'+wRow) ) {
                var baseSkillLvl = ch.levelOfSkillWithInfo( optionSkillKeys[j] );
                var STpenalty = ( option.strength>ch.ST() ) ? ch.ST()-option.strength : 0;
                document.getElementById(wType+'_weapon_skLevel'+wRow).innerHTML = baseSkillLvl + STpenalty;
                if( option.strength>ch.ST() )
                    document.getElementById(wType+'_weapon_skLevel'+wRow).title = STpenalty+" ST penalty";
            }
            // cost (for a single weapon)
            if( document.getElementById(wType+'_weapon_cost'+wRow) && j==0 ) {
                document.getElementById(wType+'_weapon_cost'+wRow).innerHTML = '$'+actualCost(itemObj);
            }
            // weight (for a single weapon)
            if( document.getElementById(wType+'_weapon_weight'+wRow) && j==0 ) {
		            // get weight formatted for printing; abbreviate long numbers
		            var convWt = convertWeight( itemObj.weight, ch.preferences.units.measure );
		            if( ch.preferences.display.fractions ) convWt = makeMixedFraction( convWt );   // alert('convWt: '+convWt);
                else convWt = abbreviateNumber( convWt );
		            var wtUnit = unitsFor[ch.preferences.units.measure].weight;
		            var printWeight = ( convWt==0 ) ? '&ndash;&ensp;' : abbreviateNumber( convWt )+' '+wtUnit+es(itemObj.weight,true);
                document.getElementById(wType+'_weapon_weight'+wRow).innerHTML = printWeight;
            }
            // alert('option printed successfully');
            wRow++;
            if( show1opt ) break;
        } // end options loop
        // filled rows?
    } // end collection item loop
    return;
}

function getWeaponObjectDamageStrings( weaponObj, optionGroupSkill, option, ch ) {    // console.log(weaponObj);
    var base = ( option.damage ) ? option.damage.base : option.damageBase;
    var mods = ( option.damage ) ? option.damage.mods : option.damageMods;
    var perd = ( option.damage ) ? option.damage.perd : 0;
    var type = ( option.damage ) ? option.damage.type : option.damageType;
    var quality = weaponObj.quality;
    var group = weaponObj.qualityEffectGroup;
    // modify for weapon quality (only 'fine' and 'very fine' weapons have damage modified by quality)
    if( type && type.match(/cut|imp/) ) {
        if( quality==2 ) {        // fine weapons
            if( group.match(/edged|pole|blade/) ) {
                mods += 1;
            }
        }
        if( quality==3 ) {        // very fine weapons
            if( group.match(/edged|blade/) ) {
                mods += 2;
            }
        }
    }
    var dmgObj;
    if( isNaN(base) ) {  // this assumes that non-numeric base is either 'sw' or 'thr'
        var adjST = ch.ST() + ch.adjustmentsTo(base+'ST');    // and THIS assumes that 'base' is capitalized in a way that matches the library (i.e., 'swST' instead of 'SwStrength' or something)
        var effST = ( option.strength && adjST>3*option.strength ) ? 3*option.strength : adjST;
        var dmgST = ( weaponObj.weaponST ) ? weaponObj.weaponST : effST;
     //   dmgObj = basicDamage(dmgST,base);
        dmgObj = ch.basicDamage(base,dmgST);
        dmgObj.modify(mods);
        dmgObj.normalize();
    }
    else {
        dmgObj = new DieRoll( base, mods );
    }
    if( perd ) {   // console.log("adding "+perd+" per die");
        dmgObj.modifyPerDie(perd);
    }
    // These assume that the skill being sent as a parameter is correct; no validation is done here.
    if( optionGroupSkill=="Kicking" ) { // if skill is Kicking, replace with its default-from skill
        var KickingSkill = ch.getSkill("Kicking");
        if(KickingSkill) optionGroupSkill = KickingSkill.useDefaultFrom.key;
    }
    if( optionGroupSkill=="Brawling" ) {
        var BrawlingSkill = ch.getSkill("Brawling");
        if( BrawlingSkill ) {
            if( ch.gameInfo.ruleset.match(/4/) && BrawlingSkill.level() >= (ch.DX()+2) ) dmgObj.modifyPerDie(1);
            if( ch.gameInfo.ruleset.match(/3/) ) dmgObj.modify( Math.floor( (BrawlingSkill.level())/10 ) );
        }
    }
    if( optionGroupSkill=="Boxing" ) {
        var BoxingSkill = ch.getSkill("Boxing");
        if( BoxingSkill ) {
            if( ch.gameInfo.ruleset.match(/4/) && BoxingSkill.level() >= (ch.DX()+1) ) dmgObj.modifyPerDie(1);
            if( ch.gameInfo.ruleset.match(/4/) && BoxingSkill.level() >= (ch.DX()+2) ) dmgObj.modifyPerDie(1);
            if( ch.gameInfo.ruleset.match(/3/) ) dmgObj.modify( Math.floor( (BoxingSkill.level())/5 ) );
        }
    }
    if( optionGroupSkill=="Karate" ) {
        var KarateSkill = ch.getSkill("Karate");
        if( KarateSkill ) {
            if( ch.gameInfo.ruleset.match(/4/) && KarateSkill.level() >=  ch.DX()    ) dmgObj.modifyPerDie(1);
            if( ch.gameInfo.ruleset.match(/4/) && KarateSkill.level() >= (ch.DX()+1) ) dmgObj.modifyPerDie(1);
            if( ch.gameInfo.ruleset.match(/3/) ) dmgObj.modify( Math.floor( (KarateSkill.level())/5 ) );
        }
    }
    // console.log( dmgObj.toString() );
    if( option.maxDamage ) {
        var maxDmgObj = DieRollFromString( option.maxDamage );
      //  alert("[getWeaponObjectDamageStrings] comparing '"+weaponObj.name+' ('+option.title+")' calculated damage ("+dmgObj.toString()+") to max damage ("+option.maxDamage+")");
        if( dmgObj.isGT(maxDmgObj) ) { dmgObj=maxDmgObj; }
    }
    var AD = ( weaponObj.armorDivisor && weaponObj.armorDivisor!=1 ) ? '('+weaponObj.armorDivisor+')' : '';
    // console.log("[getWeaponObjectDamageStrings] "+weaponObj.name+" dmgObj: "); console.log(dmgObj); console.log(dmgObj.toString());

    var damageString = dmgObj.toString();
    var damageStringFull = damageString + AD + ' ' + type;
    var optTitle = ( option.title ) ? option.title+', ' : '';
    var skillStringForTitle = ( Skills[optionGroupSkill] != undefined )
                            ? optTitle+"using the "+Skills[optionGroupSkill].name+' skill'
                            : optTitle+'using '+optionGroupSkill;
    return [ damageString, damageStringFull, skillStringForTitle, type ];
}

function clearMultiLineTextArea( areaName ) {
    var row=1;
    while( document.getElementById(areaName+'Line'+row) ) {
        if( document.getElementById(areaName+'Line'+row).value ) {
            document.getElementById(areaName+'Line'+row).value = '';
        }
        row++;
    }
    return row-1;
}

function editMultiLineText( areaName ) {
    var row=1;
    var textLines = [];
    while( document.getElementById(areaName+'Line'+row) ) {
        // get all the text lines
        var lineValue = document.getElementById(areaName+'Line'+row).value;
        if( lineValue ) {
            textLines.push( lineValue );
            lineValue = '';
        }
        row++;
    }
    // concatenate into a single string; store in Character.description[areaName]
    document.loadedCharacter.description[areaName] = textLines.join(' ');
    // alert("after joining:\n"+textLines.join(' '));
}

function writeMultiLineText( text, areaName, firstLineIndent ) {
    if( !text ) return;
    var maxLineLength = (document.getElementById(areaName+'TableWidth'))
                      ? document.getElementById(areaName+'TableWidth').value
                      : 30;
        textWords = text.split(/\s/);
  //  alert("after tokenizing:\n"+JSONstring.make(textWords));
    // now I just need to put words back together into lines that aren't too long
    var lines = [];
    var firstLine = true;
    var nextWord = textWords.shift();
  LINE:
    while( textWords.length>0 || nextWord ) {
        var lineLength = maxLineLength;
        var line = nextWord;
       // if( !line ) { line = ' '; }
       // if( line.match('') ) { alert('break break'); lines.push(''); nextWord = ' '; continue LINE; }
        // start line with next word, then loop
        nextWord = textWords.shift() || '';		// in case there's nothing in there
        if( firstLine && firstLineIndent ) { lineLength -= firstLineIndent; }
      WORD:
        while( (line.length+nextWord.length)<lineLength && nextWord ) {
            // catch spacer token here
           // if( nextWord.match('') ) { alert('break'); lines.push(line); continue LINE; }
            line += ' '+nextWord;
            nextWord = '';
            // alert(textWords.length);
            if( textWords.length==0 ) { break; }
            nextWord = textWords.shift();
        }
        if( !line ) { line=' '; }
        lines.push(line);
        firstLine = false;
    }
  //  alert("after re-chunking:\n"+JSONstring.make(lines));
    var row=1;
    for( var l in lines ) {
        var line = lines[l];
        if( document.getElementById(areaName+'Line'+row) ) {
            document.getElementById(areaName+'Line'+row).value = line;
        }
        row++;
    }
    var repTextTable = document.getElementById('repTextTable');
    if( repTextTable ) repTextTable.title = text;
}
/*  got line-skipping to work with '<br>' ( matched with string.match('<br>') )
    and '\n' ( matched with string.match(\\n) ).
    Both needed to be space-separated tokens. Response block: lines.push(''); nextWord = textWords.shift(); continue LINE;
    Don't want to use either of these, though.  Both are 'eaten' by the algorithm
    I use to skip the lines, so that future edits don't have the line-breaks.
    In the case of <br>, it also fails to render on the 'Save as file' page.
    Noting that the space-based tokenizing gives a blank token when spaces beyond 1
    are encountered sequentially, I'm going to try to use that for line-skipping. */

function displayPopupList( event, tableHTML ) {
    // get some mouse info, to position window as a pop-up
    var xpos = event.clientX;    var ypos = event.clientY;
    // get refs to the necessary divs
 		var div   = document.getElementById('popupListDiv');
    var table = document.getElementById('popupListTable');
    // need to populate and display first, to use clientHeight below (out-of-position display is gone so fast you can't see it at all)
    table.innerHTML = tableHTML;
    div.style.display = 'block';
    //alert('mouse at ('+xpos+','+ypos+')');
//     div.style.minWidth = '200px';
//     div.style.maxWidth = '400px';
    // div.style.left = (xpos>400) ? (xpos-415)+'px' : (xpos+15)+'px';
    if(xpos>350) {
        let wi = div.clientWidth;
        div.style.left = (xpos-wi-15)+'px';
    } 
    else {
        div.style.left = (xpos+15)+'px';
    }
    let ht = div.clientHeight;
    div.style.top  = Math.max(50,ypos-ht-10)+'px';  // make sure top isn't obscured by menubar or goes beyond top of page
}

function hidePopupList() {
    document.getElementById('popupListDiv').style.display = 'none';
}

function generateChooseSketchGrid() {
    const sketchFilesDir = '../images/lineart/';
    // so far, I think I'm stuck hard-coding this list (even HTML5 fileList object can't do it; requires a 'file upload' form element)
    sketchFiles = ['blank.gif','g01.gif','g05.jpg','g06.jpg','g11.gif','g13.gif','g14.gif','g15.gif','g16.gif','g17.jpg',
    'g21.gif','g22.gif','g23.png','g24.png','g25.png','g31.png','g32.png','g33.png','g34.gif',
    'g41.gif','g42.png','g43.png','werecatY.jpg','werecat.jpg','gargoyle.jpg','dragon.png'];
    let html = ['<div style="padding:5px;">','<style>.sketchthumb {height:80px;float:left;z-index:1000;padding:2px;margin: 0 3px;}</style>'];
    for( let file of sketchFiles ) {
        html.push('<img class="sketchthumb clickable" src="'+sketchFilesDir+file+'" onclick="useThisSketch(\''+file+'\')" />');
    }
    html.push('</div>');
    return html.join("\n");
}
function useThisSketch(file) {
    //console.log(file);
    $('#newCharSketch').prop('src','../images/lineart/'+file);    // put this thumbnail in New Character dialog
    $('#chosenSketch').val(file);      // make it so this sketch goes in ch.description.artPath (how?) chosenSketch
    hidePopupList();
}

function displayChooseSketchGrid( event ) {
    // get some mouse info, to position window as a pop-up
    var xpos = event.clientX;    var ypos = event.clientY;

    // populate grid
    let grid = document.getElementById('chooseSketchGrid');

    // position and display
    grid.style.left = (xpos>400) ? (xpos-415)+'px' : (xpos+15)+'px';
    grid.style.top  = Math.max(50,ypos+10)+'px';
    grid.style.display = 'block';
}
function hideChooseSketchGrid() {
    document.getElementById('chooseSketchGrid').style.display = 'none';
}

/* Reports */
function buildReport( tableHTML, title ) {

    var cleanTitle = title.toLowerCase().replace(/[\s\/\W]+/g,'');

    // top HTML
    var HTML = [];
    HTML.push('<!DOCTYPE html>');
    HTML.push('<html>');
    HTML.push('<head>');
    HTML.push('  <script type="text/javascript" src="../code/jquery.js"></script>');
    HTML.push('  <title>'+title+' Report</title>');
    HTML.push('</head>');
    HTML.push('<body>');
    HTML.push('  <style>');
    HTML.push('    #report { margin: 2em 5%; }');
    HTML.push('    #spinner { display: none; position: fixed; left: 2em; top: 2em; z-index: 5; border: 5px solid #f3f3f3; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite; border-top: 5px solid #555; border-radius: 50%; width: 30px; height: 30px; }');
    HTML.push('    @-webkit-keyframes spin {');
    HTML.push('      0% { -webkit-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg); }');
    HTML.push('      100% { -webkit-transform: rotate(360deg); -ms-transform: rotate(360deg); transform: rotate(360deg); }');
    HTML.push('    }');
    HTML.push('    @keyframes spin {');
    HTML.push('      0% { -webkit-transform: rotate(0deg); -ms-transform: rotate(0deg); transform: rotate(0deg); }');
    HTML.push('      100% { -webkit-transform: rotate(360deg); -ms-transform: rotate(360deg); transform: rotate(360deg); }');
    HTML.push('    }');
    HTML.push('    .zrow { background-color: gainsboro; }');
    HTML.push('    .sortable { cursor: pointer; background-image:url("../images/gel.png"), url("../images/sortarrow.png"); background-repeat: repeat, no-repeat; background-size: contain; background-position: right; }');
    HTML.push('    .sortable:hover { color: #9C7C38; }');
    HTML.push('    .money:before { content: "$"; }');
    HTML.push('    .pounds { white-space: nowrap; }');
    HTML.push('    .pounds:after { content: " lbs"; }');
    HTML.push('    .'+cleanTitle+'table { border-collapse: collapse; width: 100%; font-size: 10pt; }');
    HTML.push('    .'+cleanTitle+'tableheader { text-align: center; margin: 0; }');
    HTML.push('    .'+cleanTitle+'table thead { position: -webkit-sticky; position: sticky; top: 0; background-color: white; height: 30px; }');
    HTML.push('    .'+cleanTitle+'table tbody tr:hover { background-color: aliceblue; }');
    HTML.push('    .colnames { font-style: italic; text-align: left; }');
    HTML.push('    .'+cleanTitle+'table th, .'+cleanTitle+'table td { padding: 2px 4px; }');
    HTML.push('    .scrollcell { max-height: 54px; overflow-x: hidden; overflow-y: auto; }');
    HTML.push('    .specialnotestd { font-size: 8pt; }');
    HTML.push('  </style>');
    HTML.push('  <div id="spinner"></div>');
    HTML.push('  <div id="report">');
    HTML.push('    <div class="'+cleanTitle+'tablewrapper">');
    HTML.push('      <button id="noteStyleToggle" style="position:fixed; right:8%; top:40px; z-index:1;" onclick="$(\'.specialnotestd div\').toggleClass(\'scrollcell\')">toggle scrolling<br>for long notes</button>');
    HTML.push('      <h2 class="'+cleanTitle+'tableheader"><b>'+title+'</b></h2>');
    HTML.push('      <h4 class="'+cleanTitle+'tableheader"><i>'+libraryList.join("<br />")+'</i></h4>');
    HTML.push( tableHTML );
    HTML.push('    </div> <!-- .'+cleanTitle+'tablewrapper -->');
    HTML.push('  </div> <!-- .report -->');
    HTML.push('  <script type="text/javascript">');
    HTML.push('    function toggleNoteStyle() { $(".specialnotestd div").toggleClass("scrollcell") }');
    HTML.push('    '+sortTable);
    HTML.push('    '+sorter);
    HTML.push('  </script>');
    HTML.push('</body>');
    HTML.push('</html>');
    // open new page
    var repWindow = window.open('',''+cleanTitle+'Report');
    // print HTML
    repWindow.document.open();
    repWindow.document.write(HTML.join("\n"));
    repWindow.document.close();
    return;
}
function buildTraitsReportTable( enhanced ) {
    // make a sortable array from Traits object

    var tables =['C'];    // placeholder (for 'combined'); simply needs to give tables array length 1
    if( $("#buildTraitsReportCombineSelect").val()=='partition' )
        tables = ['A','D','P','Q'];

    var TraitsArray = [];
    for( var tk in Traits ) {
        var Trait = Traits[tk];
        // make sure each Trait item object in the Traits library object has a matching key attribute
        if( !Trait.key || Trait.key!=tk ) Trait.key = tk;
        TraitsArray.push( Trait );
    }
    // sort by Trait name
    TraitsArray.sort( function(a,b) { return ( a.name > b.name ) ? 1 : -1; } );

    var displayEnh = (enhanced) ? '' : ' display:none;';

    // top HTML
    var HTML = [];
    HTML.push('      <style>');
    HTML.push('        .trait { text-align: left; }');
    if( tables.length>1 )
    HTML.push('        .type { display:none; }');
    HTML.push('        .adv  { color:darkgreen; }');
    HTML.push('        .dis  { color:darkred; }');
    HTML.push('        .prk  { color:teal; }');
    HTML.push('        .qrk  { color:purple; }');
    HTML.push('        .mntl { color:blue; }');
    HTML.push('        .phys { color:maroon; }');
    HTML.push('        .socl { color:green; }');
    HTML.push('        .spnl { color:purple; }');
    HTML.push('        .extc { color:#960; }');
    HTML.push('        .mps { text-align: center; }');
    HTML.push('        .mxs { text-align: center; }');
    HTML.push('        .mods { text-align: left; font-size: 10pt;'+displayEnh+' }');
    HTML.push('        .cost { text-align: center; }');
    HTML.push('        .ref { text-align: left; }');
    HTML.push('        h3 { margin: 0; }');
    HTML.push('        .traitstable { margin-bottom: 3em; }');
    HTML.push('      </style>');

    for( l=0; l<tables.length; l++ ) {
        var table = tables[l];

        var rowclass = 'zrow';
        var zrcount = 1;
        var tableDisplay = 'none';
        var RowsHTML = [];
        for( ti=0; ti<TraitsArray.length; ti++ ) {
            var Trait = TraitsArray[ti];     // console.log(Trait);
            var cost = Trait.cost;
            var finalCost = Trait.finalCost();
            // for partitioned tables, filter out wrong kind of trait for current table
            if( table=='D' && !Trait.type.match(/D/) ) continue;
            if( table=='A' && !Trait.type.match(/A/) ) continue;
            if( table=='P' && !Trait.type.match(/P/) ) continue;
            if( table=='Q' && !Trait.type.match(/Q/) ) continue;
            // so yeah, this means I go through the ENTIRE list of Traits for all four tables.  even if there are ZERO matching items (like Quirks in the 3e library).
            /* calculate cell contents */
            // trait type
            var types = [];
            if(Trait.type.match(/a/i)) types.push('<span class="adv">advantage</span>');
            if(Trait.type.match(/d/i)) types.push('<span class="dis">disadvantage</span>');
            if(Trait.type.match(/p/i)) types.push('<span class="prk">perk</span>');
            if(Trait.type.match(/q/i)) types.push('<span class="qrk">quirk</span>');
            // mental/physical/social trait
            var pms = [];
            if(Trait.physMntlScl.match(/m/i)) pms.push('<span class="mntl">mental</span>');
            if(Trait.physMntlScl.match(/p/i)) pms.push('<span class="phys">physical</span>');
            if(Trait.physMntlScl.match(/s/i)) pms.push('<span class="socl">social</span>');
            // exotic/supernatural traits
            var mxs = '', mxsSubclass = '';
            if( Trait.exoticSprntl && Trait.exoticSprntl.match(/ex/i) ) {
                mxs = 'exotic';
                mxsSubclass = 'extc';
            }
            if( Trait.exoticSprntl && Trait.exoticSprntl.match(/sup/i) ) {
                mxs = 'supernatural';
                mxsSubclass = 'spnl';
            }
            // adjustments caused
            var adjStrings = [];
            var AdjCatFor = { 'SK': 'skill', 'stats': '', 'GR': 'group', 'CL': 'group' };
            for( var akey in Adjustments ) {
                var AdjustmentItem = Adjustments[akey];
                if( AdjustmentItem.from==Trait.key ) {
                 // alert( JSONstring.make(AdjustmentItem) );
                    var adjAmt = makeHTMLfraction(AdjustmentItem.amount);
                    var adjSign = (adjAmt<0) ? '' : '+';
                    var perLev = ( Trait.hasLevels ) ? ' per level ' : '';
                    var targTp = ( AdjustmentItem.hasOwnProperty("targetCategory") ) ? ' ' + (AdjCatFor[AdjustmentItem.targetCategory] || '') : '';
                    //console.log("[buildTraitsReportTable] Adjustment "+akey+" has targetCategory '"+targTp+"'");
                    var target = ( targTp.match(/skill/i) && Skills[AdjustmentItem.target] ) ? Skills[AdjustmentItem.target].name : AdjustmentItem.target;
                    adjStrings.push( '<span style="white-space:nowrap;">' + adjSign + adjAmt + perLev + " to " + target + targTp + '</span>' );
                }
            }
            var mods = (adjStrings.length) ? adjStrings.join(", ") : '';
            // cost for value attribute
            var vcost = ( Trait.cost=='varies' ) ? -200 : Trait.cost;
            if( Trait.cost=='att' ) vcost=1000;
            if( Trait.hasOwnProperty('fixedCost') ) vcost += Trait.fixedCost;
            // jazz up cost if Trait has levels
            if( Trait.hasLevels ) {
                var lvlName = (Trait.levelsName) ? Trait.levelsName : 'lvl';
                if( Trait.fixedCost ) cost = Trait.fixedCost + signed(cost);
                cost += '/'+lvlName;
                if( Trait.lowestLevel ) cost += '; min '+Trait.lowestLevel;
                if( Trait.highestLevel ) cost += ', max '+Trait.highestLevel;
            }
            var ref = Trait.reference;
            RowsHTML.push('          <tr class="traitrow '+rowclass+'">');
            RowsHTML.push('            <td class="trait">'+Trait.name+'</td>');
            RowsHTML.push('            <td class="type">'+types.join('/<br>')+'</td>');
            RowsHTML.push('            <td class="mps">'+pms.join('/<br>')+'</td>');
            RowsHTML.push('            <td class="mxs '+mxsSubclass+'">'+mxs+'</td>');
            RowsHTML.push('            <td class="mods specialnotestd"><div class="scrollcell">'+mods+'</div></td>');
            RowsHTML.push('            <td class="cost" value="'+vcost+'">'+cost+'</td>');
            RowsHTML.push('            <td class="ref" title="'+expandMiniref(ref,true)+'">'+ref+'</td>');
            RowsHTML.push('          </tr>');
            tableDisplay = 'table';
            if(zrcount>0) { rowclass = (rowclass) ? '' : 'zrow'; zrcount=0; }
            zrcount++;
        }

        var heading = (table=='C') ? 'Traits' : traitTypeNames[table].toTitleCase()+'s';
        HTML.push('      '+( (table=='C') ? '' : '<h3 style="display:'+tableDisplay+';">'+heading+'</h3>' )+'');

        HTML.push('      <table id="'+heading+'_table" class="traitstable" style="display:'+tableDisplay+';">');
        HTML.push('        <colgroup>');
        HTML.push('          <col                       class="trait"/> <!-- Trait -->');
        HTML.push('          <col style="min-width:10%" class="type" /> <!-- type (ad, quirk, etc.) -->');
        HTML.push('          <col style="min-width:10%" class="mps"  /> <!-- mental/physical/social -->');
        HTML.push('          <col style="min-width:10%" class="mxs"  /> <!-- mndn/xtc/spntl -->');
        HTML.push('          <col style="min-width:20%" class="mods" /> <!-- Mods -->');
        HTML.push('          <col style="min-width:15%" class="cost" /> <!-- Cost -->');
        HTML.push('          <col style="min-width:10%" class="ref"  /> <!-- Ref -->');
        HTML.push('        </colgroup>');
        HTML.push('        <thead>');
        HTML.push('          <tr class="colnames">');
        HTML.push('            <th class="trait sortable" onclick="sortTable( document.getElementById(\''+heading+'_table\'), 0 )">Trait</th>');
        HTML.push('            <th class="type sortable"  onclick="sortTable( document.getElementById(\''+heading+'_table\'), 1 )">Type</th>');
        HTML.push('            <th class="mps sortable"   onclick="sortTable( document.getElementById(\''+heading+'_table\'), 2 )"><span class="mntl">M</span>/<span class="phys">P</span>/<span class="socl">S</span></th>');
        HTML.push('            <th class="mxs sortable"   onclick="sortTable( document.getElementById(\''+heading+'_table\'), 3 )"><span class="spnl">Supernatural</span><br />or <span class="extc">Exotic</span>?</th>');
        HTML.push('            <th class="mods">Modifiers from this trait</th>');
        HTML.push('            <th class="cost sortable"  onclick="sortTable( document.getElementById(\''+heading+'_table\'), 5 )">Cost</th>');
        HTML.push('            <th class="ref sortable"   onclick="sortTable( document.getElementById(\''+heading+'_table\'), 6 )">Reference</th>');
        HTML.push('          </tr>');
        HTML.push('        </thead>');
        HTML.push('        <tbody>');
        HTML.push('        '+RowsHTML.join("\n"));
        HTML.push('        </tbody>');
        HTML.push('      </table>');

    }
    return HTML.join("\n");
}
function buildSkillsReportTable( enhanced ) {
    // make a sortable array from Skills object
    var SkillsArray = [];
    for( var sk in Skills ) {
        var Skill = Skills[sk];
        // make sure each Skill item object in the Skills library object has a matching key attribute
        if( !Skill.key || Skill.key!=sk ) Skill.key = sk;
        SkillsArray.push( Skill );
    }
    // sort by Skill name
    SkillsArray.sort( function(a,b) { return ( a.name > b.name ) ? 1 : -1; } );

    var displayEnh = (enhanced) ? '' : ' display:none;';

    // top HTML
    var HTML = [];

    HTML.push('      <style>');
    HTML.push('        td.name { text-align: left; text-indent: -1em; padding-left: 1em; }');
    HTML.push('        .attr { text-align: center; }');
    HTML.push('        .dfct { text-align: center; }');
    HTML.push('        .dflt { text-align: left; }');
    HTML.push('        .adjs { text-align: left; font-size: 10pt;'+displayEnh+' }');
    HTML.push('        .preq { text-align: left; font-size: 10pt;'+displayEnh+' }');
    HTML.push('        .preq i { white-space: nowrap; }');
    HTML.push('        .refc { text-align: left; }');
    HTML.push('      </style>');
    HTML.push('      <table id="skills_table" class="skillstable">');
    HTML.push('        <colgroup>');
    HTML.push('          <col                       class="name" /> <!-- Skill Name -->');
    HTML.push('          <col style="min-width:5%"  class="attr" /> <!-- Attribute -->');
    HTML.push('          <col style="min-width:5%"  class="dfct" /> <!-- Difficulty -->');
    HTML.push('          <col style="min-width:30%" class="dflt" /> <!-- Defaults -->');
    HTML.push('          <col style="min-width:20%" class="adjs" /> <!-- Adjustments -->');
    HTML.push('          <col style="min-width:25%" class="preq" /> <!-- Prerequisites -->');
    HTML.push('          <col style="min-width:10%" class="refc" /> <!-- References -->');
    HTML.push('        </colgroup>');
    HTML.push('        <thead>');
    HTML.push('          <tr class="colnames">');
    HTML.push('            <th class="name sortable" onclick="sortTable( document.getElementById(\'skills_table\'), 0 )">Skill&nbsp;<span style="font-size:8pt;">(<sup>†</sup>must&nbsp;specialize)</span></th>');
    HTML.push('            <th class="attr sortable" onclick="sortTable( document.getElementById(\'skills_table\'), 1 )">Attr</th>');
    HTML.push('            <th class="dfct sortable" onclick="sortTable( document.getElementById(\'skills_table\'), 2 )">Diff</th>');
    HTML.push('            <th class="dflt">Defaults</th>');
    HTML.push('            <th class="adjs">Bonuses/Penalties</th>');
    HTML.push('            <th class="preq">Prerequisites</th>');
    HTML.push('            <th class="refc">Reference</th>');
    HTML.push('          </tr>');
    HTML.push('        </thead>');
    HTML.push('        <tbody>');

    var rowclass = 'zrow';
    var zrcount = 1;
    for( si=0; si<SkillsArray.length; si++ ) {
        var Skill = SkillsArray[si];
        if( !Skill.name ) continue;
        /* calculate row contents */

        // skill name
        var name = Skill.name;
        name = name.replace(" (edit to describe)","");
        if( Skill.TLs ) name += '/TL';
        // if( Skill.hasOwnProperty('specRequiredList') ) name += ' (must&nbsp;specialize)';
        if( Skill.hasOwnProperty('specRequiredList') ) name += '<sup>†</sup>';

        var attr = Skill.attribute;

        var dfct = ( ch.gameInfo.ruleset.match(3) ) ? Skill.type+'/' : '';
        dfct += Dffclts[Skill.difficulty];
        // if( Skill.key=="AreaKnowledge" ) console.log(Skill);

        // defaults
        var defaults = [];
        var DefaultLibraryItems = Skill.defaults();   // matching defaults ('target' will match Skill)
        var standardDefault = true;
        for( var dk in DefaultLibraryItems ) {
            if( dk=='length' ) continue;
            var Default = DefaultLibraryItems[dk];
            if( Default.penalty===false ) { standardDefault = false; break; }
            if( Default.category && Default.category.match(/stat/i) && Default.from==attr ) { standardDefault = false; break; }
        }
        if( standardDefault ) defaults.push(Skill.attribute+(-(1*Skill.difficulty+4)));
        for( var dk in DefaultLibraryItems ) {
            if( dk=='length' ) continue;
            var Default = DefaultLibraryItems[dk];
            if( Default.penalty===false ) continue;
            if( Default.targetSpec ) continue;
            var fromspec = (Default.fromSpec) ? '&nbsp;('+Default.fromSpec+')' : '';
            if( Default.target==Default.from ) fromspec = '&nbsp;(other)';
            var penalty = (Default.penalty==0) ? '' : Default.penalty;
            // defaults.push( ( (Skills[Default.from]) ? Skills[Default.from].name : Default.from ) + fromspec + penalty );
            defaults.push( '<span style="white-space:nowrap;">' + ( (Skills[Default.from]) ? Skills[Default.from].name : Default.from ) + fromspec + penalty + '</span>' );
        }
        var dflt = (defaults.length) ? defaults.join(', ') : 'none';

        // adjustments
        var AdjSlice = Skill.adjustmentsTo();
        var adjStrings = [];
        for( var a in AdjSlice ) {
            var adjustmentItem = AdjSlice[a];
            var target  = adjustmentItem.target;
            var from    = adjustmentItem.from;          // this will be the 'key' for a trait, stat, etc.
            if( Traits[from] ) from = Traits[from].name;
            var fromCat = adjustmentItem.fromCategory;  // 'stats', etc. (absence implies this is 'trait')
            var adjAmt  = adjustmentItem.amount;        // hopefully a number, even an integer
            var adjSign = (adjAmt<0) ? '' : '+';
            var once    = ( adjustmentItem.hasOwnProperty('per') && !adjustmentItem.per ) ? true : false;
            var ifrm    = ( fromCat && fromCat.match(/^sk|stat/) ) ? 'if' : 'from';
            if( Traits[from] && Traits[from].hasLevels ) ifrm = 'per level of';

            adjStrings.push( '<span style="white-space:nowrap;">'+adjSign+adjAmt+' '+ifrm+' '+from+'</span>' );
        }
        var adjs = ( adjStrings.length ) ? adjStrings.join('<br>') : '';

        // prerequisites
        //var PrereqTree = Skill.structuredPrereqsFor();
        //var prereqStringArray = buildStringForPrereqTree(PrereqTree);
        //var prereqString = prereqStringArray.join('&emsp;AND&emsp;');
        //var preq = ( prereqString ) ? prereqString : '';

        var spec = (Skill.specialization) ? Skill.specialization.replace(/\W+/g,'') : false;
        var preq = printPrereqs( Skill, spec, 'Skill' )

        var refc = (Skill.reference) ? Skill.reference : '';

        // these may now be unnecessary
        refc = refc.replace(/Basic Set - Characters, pg /,'B');
        refc = refc.replace(/Basic Set 3rd ed., pg /,'B');
        refc = refc.replace(/Compendium I, pg /,'CI');
        refc = refc.replace(/Compendium II, pg /,'CII');

        HTML.push('          <tr class="skillrow '+rowclass+'">');
        HTML.push('            <td class="name">'+name+'</td>');
        HTML.push('            <td class="attr">'+attr+'</td>');
        HTML.push('            <td class="dfct">'+dfct+'</td>');
        HTML.push('            <td class="dflt">'+dflt+'</td>');
        HTML.push('            <td class="adjs specialnotestd"><div class="scrollcell">'+adjs+'</div></td>');
        HTML.push('            <td class="preq specialnotestd"><div class="scrollcell">'+preq+'</div></td>');
        HTML.push('            <td class="refc">'+refc+'</td>');
        HTML.push('          </tr>');

        if(zrcount/*>1*/) { rowclass = (rowclass) ? '' : 'zrow'; zrcount=0; }
        zrcount++;

    }

    HTML.push('        </tbody>');
    HTML.push('      </table>');

    return HTML.join("\n");
}
function buildSpellsReportTable( groupBy ) {      //console.log("[buildSpellsReport] groupBy is "+groupBy);

    // top HTML
    var HTML = [];
    HTML.push('      <style>');
    HTML.push('        .allspellstable { border-collapse: collapse; width: 100%; font-size: 10pt; table-layout: fixed; max-height:100%; }');
    HTML.push('        .spellgroupheader { margin-top: 2em; }');
    HTML.push('        .allspellgroupheader { margin-top: 1em; }');
    HTML.push('        .allspellstable thead { position: -webkit-sticky; position: sticky; top: 0; background-color: white; height: 30px; }');
    HTML.push('        .name { text-align: left; /*white-space:nowrap;*/ }');
    HTML.push('        .cost { text-align: center; }');
    HTML.push('        .mntn { text-align: center; }');
    HTML.push('        .time { text-align: center; }');
    HTML.push('        .drtn { text-align: center; }');
    HTML.push('        .clgs { text-align: left; }');
    HTML.push('        .clss { text-align: left; }');
    HTML.push('        .prqs { text-align: left; }');
    HTML.push('        .pcnt { text-align: center; }');
    HTML.push('        .refc { text-align: left; }');
    HTML.push('        .colnames { font-style: italic; }');
    HTML.push('        .spellstable th, .spellstable td { padding: 2px 4px; }');
    HTML.push('      </style>');

    var all = 'all';
    var SpellGroups = Groups.Spells;
    if( groupBy ) {
        if( groupBy.match(/college|book/i) ) { SpellGroups = Groups.MagicColleges; SpellGroups.sort(); all = ''; }
    }
    else SpellGroups = ['Spells'];  // show single table with all spells by default

    // console.log(SpellGroups);

    for( var sg=0; sg<SpellGroups.length; sg++ ) {
    		var spellgroup = SpellGroups[sg];
        var SpellsArray = Groups[spellgroup].slice();    // make a copy, so that sorting is forgotten between calls
        // console.log( SpellsArray );
        if( groupBy.match(/book/i) ) SpellsArray.sort( function(a,b) { return ( Spells[a] && Spells[b] && Spells[a].reference>Spells[b].reference ) ? 1 : -1; } );
        else SpellsArray.sort();
        // 'book' order now depends on the SpellGroups (i.e., the College lists) to be in book order in the libraries
        // console.log(SpellsArray);

        // Build SpellsArray by setting it equal to one of the Spell College Group lists,
        // then sorting.  For a non-grouped display, SpellsArray = Groups.Spells
        var groupHeader = (collegeNames[SpellGroups[sg]]) ? collegeNames[SpellGroups[sg]] : '';
        HTML.push('      <div class="spellsgrouptablewrapper">');
        HTML.push('        <div class="'+all+'spellgroupheader"><b>'+groupHeader+'</b></div>');
        HTML.push('        <table id="'+spellgroup+'_table" class="'+all+'spellstable">');
        HTML.push('          <colgroup>');
        HTML.push('            <col                       class="name" /> <!-- Spell Name -->');
        HTML.push('            <col style="width:10%" class="clgs" /> <!-- Colleges -->');
        HTML.push('            <col style="width:10%" class="clss" /> <!-- Classes -->');
        HTML.push('            <col style="width:10%" class="cost" /> <!-- Energy Cost to Cast -->');
        HTML.push('            <col style="width:8%"  class="mntn" /> <!-- Energy Cost to Maintain -->');
        HTML.push('            <col style="width:8%"  class="time" /> <!-- Time to Cast -->');
        HTML.push('            <col style="width:10%" class="drtn" /> <!-- Duration -->');
        HTML.push('            <col                       class="prqs" /> <!-- Prerequisites style="min-width:15%" -->');
        HTML.push('            <col style="width:5%"  class="pcnt" /> <!-- Prereq Count -->');
        HTML.push('            <col style="width:6em"     class="refc" /> <!-- References -->');
        HTML.push('          </colgroup>');
        HTML.push('          <thead>');
        HTML.push('            <tr class="colnames">');
        HTML.push('              <th class="name sortable" onclick="sortTable( document.getElementById(\''+spellgroup+'_table\'), 0 )">Spell</th>');
        HTML.push('              <th class="clgs" title="use Group by College to sort">College(s)</th>');
        HTML.push('              <th class="clss sortable" onclick="sortTable( document.getElementById(\''+spellgroup+'_table\'), 2 )">Classes&nbsp;& Resistance</th>');
        HTML.push('              <th class="cost"><div style="color:crimson;">Energy<br/>to Cast</div></th>');
        HTML.push('              <th class="mntn"><div style="color:crimson;">Energy&nbsp;to<br/>Maintain</div></th>');
        HTML.push('              <th class="time"><div style="color:blue;">Time<br/>to Cast</div></th>');
        HTML.push('              <th class="drtn"><div style="color:blue;">Duration</div></th>');
        HTML.push('              <th class="prqs">Prerequisites</th>');
        HTML.push('              <th class="pcnt sortable" onclick="sortTable( document.getElementById(\''+spellgroup+'_table\'), 8 )">Prereq<br/>Count</th>');
        HTML.push('              <th class="refc">Reference</th>');
        HTML.push('            </tr>');
//         HTML.push('            <tr class="colnames">');
        // Spell Name
        // Colleges
        // Resistance
//         HTML.push('              <th class="cost" style="color:crimson;">Cast</th>');
//         HTML.push('              <th class="mntn" style="color:crimson;">Maintain</th>');
//         HTML.push('              <th class="time" style="color:blue;">Cast</th>');
//         HTML.push('              <th class="drtn" style="color:blue;">Duration</th>');
        // Prerequisites
       // HTML.push('              <th class="pcnt">Count</th>');
        // Reference
//         HTML.push('            </tr>');
        HTML.push('          </thead>');
        HTML.push('          <tbody>');
        var rowclass = 'zrow';
        var zrcount = 1;
        for( si=0; si<SpellsArray.length; si++ ) {
            var Spell = Spells[SpellsArray[si]];
            if( !Spell || !Spell.name ) continue;   // the !Spell part is for spurious entries in the Spells arrays left over from previously-loaded external libraries
            // console.log("[buildSpellsReportTable] building row for "+Spell.name);     // console.log(Spell);
            // calculate cell contents
            var name = Spell.name;
            if( Spell.difficulty>2 ) name += ' (VH)';
            var cost = Spell.stats.castcost;
            cost = ( isNaN(cost) ) ? cost : makeHTMLfraction(cost);
            var mntn = (Spell.stats.maintaincost) ? Spell.stats.maintaincost : '-';
            var time = Spell.stats.time;    time += ( isNaN(time) ) ? '' : ' sec';
            var drtn = Spell.stats.duration; drtn = ( drtn ) ? drtn : 'instant';
            var splClgsArray = Spell.spellColleges();
            var colleges = splClgsArray.map( x => collegeNames[x] );
            var clgs = colleges.join(', ');
            var clss = (Spell.classes) ? Object.keys(Spell.classes).map(x => spellClassNames[x]).join(',<br>') : '';
            var spec = (Spell.specialization) ? Spell.specialization.replace(/\W+/g,'') : false;
            var prqs = printPrereqs( Spell, spec, 'Spell' );
            visited = {};
            var pcnt = countPrereqs( Spell, spec, 'Spell' );
            var refttl = (Spell.reference) ? Spell.reference : '';
            var refc = (Spell.reference) ? Spell.reference : '';
            // shouldn't need these anymore
//             refc = refc.replace(/Basic Set - Characters, pg /,'B');
//             refc = refc.replace(/Basic Set - Campaigns, pg /,'BCa');
//             refc = refc.replace(/Basic Set 3rd ed., pg /,'B');
//             refc = refc.replace(/Compendium I, pg /,'CI');
//             refc = refc.replace(/Compendium II, pg /,'CII');
//             refc = refc.replace(/GURPS Magic, 2nd edition, pg/,'M2E');
//             refc = refc.replace(/GURPS Magic, 3rd edition, pg/,'M3E');
            HTML.push('            <tr class="spellrow '+rowclass+'" title="'+Spell.stats.notes+'">');
            HTML.push('              <td class="name">'+name+'</td>');
            HTML.push('              <td class="clgs">'+clgs+'</td>');
            HTML.push('              <td class="clss">'+clss+'</td>');
            HTML.push('              <td class="cost">'+cost+'</td>');
            HTML.push('              <td class="mntn">'+mntn+'</td>');
            HTML.push('              <td class="time">'+time+'</td>');
            HTML.push('              <td class="drtn">'+drtn+'</td>');
            HTML.push('              <td class="prqs specialnotestd"><div style="scrollcell">'+prqs+'</div></td>');
            HTML.push('              <td class="pcnt">'+pcnt+'</td>');
            HTML.push('              <td class="refc" title="'+refttl+'">'+refc+'</td>');
            HTML.push('            </tr>');
            // if(zrcount>1) { rowclass = (rowclass) ? '' : 'zrow'; zrcount=0; }
            rowclass = (rowclass) ? '' : 'zrow';
            zrcount++;
        }
        HTML.push('          </tbody>');
        HTML.push('        </table>');
        HTML.push('      </div> <!-- .spellsgrouptablewrapper -->');
    }

    return HTML.join("\n");
}
function buildEquipmentReportTable() {

    // sort Equipment objects (and keys)
    var EquipmentArray  = [];
    for( var k in BasicEquipment ) {
        var EquipObj = BasicEquipment[k];
        if( !EquipObj.key || EquipObj.key!=k ) EquipObj.key = k;
        EquipmentArray.push( EquipObj );
    }
    EquipmentArray.sort(
        function(a,b) { return (a.TL-b.TL) ? a.TL-b.TL : ( (a.name>b.name) ? 1 : -1 ); }
    );
    // console.log(EquipmentArray);

    var HTML = [];
    HTML.push('      <style>');
    HTML.push('        .equipmentgroup { margin: 0 0 2em; }');
    HTML.push('        .specialnotestd { font-size: 8pt; }');
    HTML.push('        .grey { background-color: #eee; }');
    HTML.push('        .TL  { text-align: center; }');
    HTML.push('        .equipmentgrouptable .cost { padding-left: 2%; }');
    HTML.push('        .equipmentgrouptable .wt   { text-align: right; padding-right: 2%; }');
    HTML.push('      </style>');
    HTML.push('      <table id="equipment_table" class="equipmenttable">');
    HTML.push('        <colgroup>');
    HTML.push('          <col style="width:4%"           class="TL" /> <!-- TL -->');
    HTML.push('          <col style="min-width:20%"      class="name" /> <!-- name -->');
    HTML.push('          <col style="font-size:smaller;" class="notes" /> <!-- notes -->');
    HTML.push('          <col style="width:8%"           class="cost" /> <!-- cost -->');
    HTML.push('          <col style="width:6%"           class="weight" /> <!-- weight -->');
    HTML.push('          <col style="width:6%"           class="ref" /> <!-- reference -->');
    HTML.push('        </colgroup>');
    HTML.push('        <thead>');
    HTML.push('          <tr class="colnames">');
    HTML.push('            <th class="TL sortable"   onclick="sortTable( document.getElementById(\'equipment_table\'), 0 )">TL</th>');
    HTML.push('            <th class="name sortable" onclick="sortTable( document.getElementById(\'equipment_table\'), 1 )">Name</th>');
    HTML.push('            <th class="notes">Special Notes</th>');
    HTML.push('            <th class="cost sortable" onclick="sortTable( document.getElementById(\'equipment_table\'), 3 )">Cost</th>');
    HTML.push('            <th class="wt sortable"   onclick="sortTable( document.getElementById(\'equipment_table\'), 4 )">&nbsp;Wt</th>');
    HTML.push('            <th class="ref">Ref</th>');
    HTML.push('          </tr>');
    HTML.push('        </thead>');
    HTML.push('        <tbody>');

    var zclass = 'grey';
    var zcounter = 0;

    for( var i=0; i<EquipmentArray.length; i++ ) {
        var Eqp = EquipmentArray[i];    //  console.log(Eqp);
        var name = Eqp.name;
        var detail = ( Eqp.detail ) ? Eqp.detail+' ' : '';
        var EqpName = detail + name;
        var notes = ( Eqp.notes ) ? Eqp.notes.join("<br />") : '';
        var cost = ( !Eqp.cost || Math.trunc(Eqp.cost) == Eqp.cost ) ? Eqp.cost : Eqp.cost.toFixed(2);
        let unitName = ( nameForUnit[Eqp.unit] ) ? nameForUnit[Eqp.unit] : Eqp.unit;
        var peritem = (Eqp.unit && Eqp.continuous) ? 'style="background-color:#F5F5DC" title="per '+unitName+'"' : '';
        zcounter++;
        HTML.push('          <tr class="'+zclass+'">');
        HTML.push('            <td class="TL">'+Eqp.TL+'</td>');      // tech level
        HTML.push('            <td class="name" value="'+name+'">'+EqpName.toTitleCase()+'</td>');     // name
        HTML.push('            <td class="notes "><div class="scrollcell">'+notes+'</div></td>');      // notes
        HTML.push('            <td class="cost money" '+peritem+'>'+cost+'</td>');     // cost
        HTML.push('            <td class="wt pounds" '+peritem+'>'+Eqp.weight+'</td>');     // weight
        HTML.push('            <td class="ref">'+Eqp.reference+'</td>');     // reference
        HTML.push('          </tr>');
        if( zcounter>1 ) { zclass = ( zclass=='grey' ) ? 'white' : 'grey'; zcounter = 0; }
    }
    HTML.push('        </tbody>');
    HTML.push('      </table>');

    return HTML.join("\n");
}
function buildArmorShieldsReportTable() {

    // sort Equipment objects (and keys)
    var EquipmentArray  = [];
    for( var a in ArmorItems ) {
        var ArmorObj = ArmorItems[a];
        if( !ArmorObj.key || ArmorObj.key!=a ) ArmorObj.key = a;
        EquipmentArray.push( ArmorObj );
    }
    for( var s in ShieldItems ) {
        var ShieldObj = ShieldItems[s];
        if( !ShieldObj.key || ShieldObj.key!=s ) ShieldObj.key = s;
        EquipmentArray.push( ShieldObj );
    }
    EquipmentArray.sort(
        function(a,b) { return (a.TL-b.TL) ? a.TL-b.TL : ( (a.name>b.name) ? 1 : -1 ); }
    );
    // console.log(EquipmentArray);

		var hide_PD = ( ruleset.match(3) ) ? '' : 'hide';

    var HTML = [];
    HTML.push('    <style>');
    HTML.push('      .armorshieldsheader { font-size: 12pt; }');
    HTML.push('      .grey { background-color: #eee; }');
    HTML.push('      .armorshieldstable .TL, .PD, .DR  { text-align: center; }');
    HTML.push('      .armorshieldstable .cost { padding-left: 2%; }');
    HTML.push('      .armorshieldstable .wt   { text-align: right; padding-right: 2%; }');
    HTML.push('      .armorshieldstable .hide { display: none; }');
    HTML.push('      .shield { background-color: antiquewhite; }');
    HTML.push('    </style>');
    HTML.push('    <table id="equipment_table" class="armorshieldstable">');
    HTML.push('      <colgroup>');
    HTML.push('        <col style="width:4%"           class="TL" /> <!-- TL -->');
    HTML.push('        <col style="min-width:20%"      class="name" /> <!-- name -->');
    HTML.push('        <col style="min-width:25%"      class="loc" /> <!-- location -->');
    HTML.push('        <col style="font-size:smaller;" class="notes" /> <!-- notes -->');
    if(ruleset.match(3))
    HTML.push('        <col style="width:5%"           class="PD" /> <!-- PD -->');
    HTML.push('        <col style="width:5%"           class="DR" /> <!-- DR -->');
    HTML.push('        <col style="width:8%"           class="cost" /> <!-- cost -->');
    HTML.push('        <col style="width:6%"           class="weight" /> <!-- weight -->');
    HTML.push('        <col style="width:6%"           class="ref" /> <!-- reference -->');
    HTML.push('      </colgroup>');
    HTML.push('      <thead>');
    HTML.push('        <tr class="colnames">');
    HTML.push('          <th class="TL sortable"   onclick="sortTable( document.getElementById(\'equipment_table\'), 0 )">TL</th>');
    HTML.push('          <th class="name sortable" onclick="sortTable( document.getElementById(\'equipment_table\'), 1 )">Name (<span class="shield">shields are indicated</span>)</th>');
    HTML.push('          <th class="loc">Location (PD/DB for shields)</th>');
    HTML.push('          <th class="notes">Special Notes</th>');
    HTML.push('          <th class="PD '+hide_PD+' sortable"   onclick="sortTable( document.getElementById(\'equipment_table\'), 4 )">PD</th>');
    HTML.push('          <th class="DR sortable"   onclick="sortTable( document.getElementById(\'equipment_table\'), 5 )">DR</th>');
    HTML.push('          <th class="cost sortable" onclick="sortTable( document.getElementById(\'equipment_table\'), 6 )">Cost</th>');
    HTML.push('          <th class="wt sortable"   onclick="sortTable( document.getElementById(\'equipment_table\'), 7 )">&nbsp;Wt</th>');
    HTML.push('          <th class="ref">Ref</th>');
    HTML.push('        </tr>');
    HTML.push('      </thead>');
    HTML.push('      <tbody>');

    var zclass = 'grey';
    var zcounter = 0;

    for( var i=0; i<EquipmentArray.length; i++ ) {
        var Eqp = EquipmentArray[i];
        var detail = ( Eqp.detail ) ? Eqp.detail+' ' : '';
        var EqpName = detail+Eqp.name;
        var loc = (Eqp.location) ? Eqp.location.join(", ") : '-';
        loc = loc.replace('domArm, offArm','arms');
        loc = loc.replace('domLeg, offLeg','legs');
        loc = loc.replace('domHand, offHand','hands');
        loc = loc.replace('domFoot, offFoot','feet');
        var shld = ( Eqp.PDB ) ? 'shield' : '';
        if( loc=='-' ) loc = (Eqp.PDB) ? Eqp.PDB : '?';
        var PD = ( Eqp.PDB ) ? Eqp.PDB : Eqp.PD;
        if( Eqp.hasOwnProperty('splitPD') ) PD += '/'+Eqp.splitPD;
        var DR = Eqp.DR;
        if( Eqp.hasOwnProperty('splitDR') ) DR += '/'+Eqp.splitDR;
        var notes = ( Eqp.notes ) ? Eqp.notes.join("<br />") : '';
		    var specialNotes = (Eqp.notes) ? Eqp.notes.slice() : [];
        zcounter++;
        HTML.push('        <tr class="'+zclass+' '+shld+'">');
        HTML.push('          <td class="TL">'+Eqp.TL+'</td>');      // tech level
        HTML.push('          <td class="name">'+EqpName.toTitleCase()+'</td>');     // name
        HTML.push('          <td class="loc">'+loc+'</td>');     // location
        HTML.push('          <td class="notes specialnotestd"><div class="scrollcell">'+specialNotes.join("&emsp;")+'</div></td>');	// special notes
        HTML.push('          <td class="PD '+hide_PD+'" value="'+((Eqp.PDB)?Eqp.PDB:Eqp.PD)+'">'+PD+'</td>');     // PD
        HTML.push('          <td class="DR" value="'+Eqp.DR+'">'+DR+'</td>');     // DR
        HTML.push('          <td class="cost money">'+Eqp.cost+'</td>');     // cost
        HTML.push('          <td class="wt pounds">'+Eqp.weight+'</td>');     // weight
        HTML.push('          <td class="ref">'+Eqp.reference+'</td>');     // reference
        HTML.push('        </tr>');
        if( zcounter>1 ) { zclass = ( zclass=='grey' ) ? 'white' : 'grey'; zcounter = 0; }
    }
    HTML.push('      </tbody>');
    HTML.push('    </table>');

    return HTML.join("\n");
}
function buildWeaponsReportTable( groupBy ) {
    // groupBy will be either 'weapon', 'quality', 'skill', or 'none'
    // grouping by skill gives the arrangement found in most GURPS books
    let sklTLsp_regex = /([a-zA-Z]+)\d*_(.*)/;
    let skillTL_regex = /([a-zA-Z]+)\d+$/;

    var WOstats = {};
    for( var k in Weapons ) {
        for( var wok in Weapons[k].wieldOptions ) {
            var wieldOpt = Weapons[k].wieldOptions[wok];
            var wock = (wok.match('_')) ? wok.split('_')[0] : wok;
            var matches=wock.match( skillTL_regex );
            if( matches && matches.length ) wock = matches[1];
            wock += (wok.split('_').length>1) ? '_'+wok.split('_')[1] : '';
            //console.log('from '+wok+', using '+wock);
            if( WOstats[wock] ) {
                WOstats[wock].count += wieldOpt.length;
                if(wieldOpt[0].reach)           WOstats[wock].rch   = true;
                if(wieldOpt[0].snapShot)        WOstats[wock].ss    = true;
                if(wieldOpt[0].accuracy)        WOstats[wock].acc   = true;
                if(wieldOpt[0].recoil)          WOstats[wock].rcl   = true;
                if(wieldOpt[0].halfDamageRange) WOstats[wock].hlf   = true;
                if(wieldOpt[0].maximumRange)    WOstats[wock].max   = true;
                if(wieldOpt[0].rateOfFire)      WOstats[wock].rof   = true;
                if(Weapons[k].shots)            WOstats[wock].shots = true;
                if(Weapons[k].bulk)             WOstats[wock].bulk  = true
            }
            else WOstats[wock] = {
                // initialize WOstats[wock] entry
                count :  wieldOpt.length,
                rch   : (wieldOpt[0].reach)           ? true : false,    // complicated because often omitted and assumed = 1
                ss    : (wieldOpt[0].snapShot)        ? true : false,
                acc   : (wieldOpt[0].accuracy)        ? true : false,
                rcl   : (wieldOpt[0].recoil)          ? true : false,
                hlf   : (wieldOpt[0].halfDamageRange) ? true : false,
                max   : (wieldOpt[0].maximumRange)    ? true : false,
                rof   : (wieldOpt[0].rateOfFire)      ? true : false,
                shots : (Weapons[k].shots)            ? true : false,
                bulk  : (Weapons[k].bulk)             ? true : false
            }
        }
    }
    var WOkeys = ( groupBy.match(/skill/i) ) ? Object.keys(WOstats) : [];
    WOkeys.sort();
		// console.log(WOstats);

    var QGstats = {};
    for( const w in Weapons ) {
        let Wpn = Weapons[w];
        let qgp = Wpn.qualityEffectGroup;
        for( var wo in Wpn.wieldOptions ) {
            let wieldOpt = Wpn.wieldOptions[wo];
            let wok = (wo.match('_')) ? wo.split('_')[0] : wo;
            let matches=wok.match(/(.*\w)\d+$/);
            if( matches && matches.length ) wok = matches[1];
            wok += (wo.split('_').length>1) ? '_'+wo.split('_')[1] : '';
            if( QGstats[qgp] ) {
                QGstats[qgp].count += wieldOpt.length;
                if(wieldOpt[0].reach)           QGstats[qgp].rch   = true;
                if(wieldOpt[0].snapShot)        QGstats[qgp].ss    = true;
                if(wieldOpt[0].accuracy)        QGstats[qgp].acc   = true;
                if(wieldOpt[0].recoil)          QGstats[qgp].rcl   = true;
                if(wieldOpt[0].halfDamageRange) QGstats[qgp].hlf   = true;
                if(wieldOpt[0].maximumRange)    QGstats[qgp].max   = true;
                if(wieldOpt[0].rateOfFire)      QGstats[qgp].rof   = true;
                if(Wpn.shots)                   QGstats[qgp].shots = true;
                if(Wpn.bulk)                    QGstats[qgp].bulk  = true;
            }
            else QGstats[qgp] = {
                count :  wieldOpt.length,
                rch   : (wieldOpt[0].reach)           ? true : false,
                ss    : (wieldOpt[0].snapShot)        ? true : false,
                acc   : (wieldOpt[0].accuracy)        ? true : false,
                rcl   : (wieldOpt[0].recoil)          ? true : false,
                hlf   : (wieldOpt[0].halfDamageRange) ? true : false,
                max   : (wieldOpt[0].maximumRange)    ? true : false,
                rof   : (wieldOpt[0].rateOfFire)      ? true : false,
                shots : (Wpn.shots)                   ? true : false,
                bulk  : (Wpn.bulk)                    ? true : false
            }
        }
    }

    // sort Weapons objects (and keys)
    var WeaponsKVarray  = [];
    for( var memberKey in Weapons ) {
        WeaponsKVarray.push( { key: memberKey, value: Weapons[memberKey] } );
    }
    WeaponsKVarray.sort(
        function(a,b) {
            var aWpn = a.value;
            var bWpn = b.value;
            var aDtl = (aWpn.detail) ? aWpn.detail : '';
            var bDtl = (bWpn.detail) ? bWpn.detail : '';
           // return (aWpn.TL-bWpn.TL) ? aWpn.TL-bWpn.TL : ( (aWpn.name+aDtl>bWpn.name+bDtl) ? 1 : -1 );    // sort by TL, then name
            return (aWpn.name+aDtl>bWpn.name+bDtl) ? 1 : -1;                                              // sort by name only
        }
    );
    // console.log(WeaponsKVarray);

    var optcols = ['rch','ss','acc','rcl','hlf','max','rof','shots','bulk'];
    var hide_rch = hide_ss = hide_acc = hide_rcl = hide_hlf = hide_max = hide_rof = hide_bulk = hide_shots = ' hide';

    var HTML = [];
    HTML.push('  <style>');
    HTML.push('    #report { margin: 2em 5%; }');
    HTML.push('    .equipmentgroup { margin: 2em 0 0; }');
    HTML.push('    .equipmentgroupheader { font-size: 12pt; }');
    HTML.push('    .weapongroupheader { font-size: 12pt; font-style: normal; background-color: white; vertical-align: top; }');
    HTML.push('    .equipmentgroupcolnames { font-style: italic; text-align: left; }');
    HTML.push('    .grey { background-color: #eee; }');
    HTML.push('    .weapon { text-indent:-5px; padding-left:8px !important; min-width:10%; /*white-space: nowrap;*/ }');
    HTML.push('    .weaponstable .wogp { text-align: right; padding-right: 2%; white-space: nowrap; }');
    HTML.push('     td.skgp { text-align: right; padding-right: 6px; font-weight: bold; white-space: nowrap; }');
    HTML.push('     td.wotitle { text-align: right; padding-right: 6px; font-style: italic; white-space: nowrap; }');
    HTML.push('    .ss  { text-align: center; }');
    HTML.push('    .bulk { text-align: center; }');
    HTML.push('    .shots{ text-align: center; }');
    HTML.push('    .rof { text-align: center; }');
    HTML.push('    .acc { text-align: center; }');
    HTML.push('    .hlf { text-align: center; }');
    HTML.push('    .max { text-align: center; }');
    HTML.push('    .ST  { text-align: center; }');
    HTML.push('    .TL  { text-align: center; }');
    HTML.push('    .qual { white-space: nowrap; }');
    HTML.push('    .note { max-width: 40%; min-width: 10%; }');
    HTML.push('    .ref { font-size: 9pt; font-style: italic; }');
    HTML.push('    .weaponstable .hide { display: none; }');
    HTML.push('    .weaponstable .cost { padding-left: 2%; min-width:5em; }');
    HTML.push('    .weaponstable .wt   { text-align: right; padding-right: 2%; min-width:4em; }');
    HTML.push('  </style>');

    /* give sorting options?
        Could do this by declaring some variables here to be used in place of the onclick statements in the <th> tags below.
        They could be filled perhaps only in cases where WOkeys has more than, say, half a dozen members.
        Seems like a nice idea until you think about how the rows are grouped in these tables . . . wield options together,
        with the weapon name appearing in only one of the rows, striping not calculated but done instead by wield option groups,
        several other properties you might want to sort by will only appear on the first row of a wield-option group (cost, weight).
        So then you think maybe you should try sorting GROUPS of rows (wield option groups).  But then what if you want to sort
        wield options by damage?  or put all the swing attacks together by sorting?
        
        That said, there are several tables where these problems disappear, and they are precisely the tables we are most likely
        to want to be able to sort: Guns tables, primarily.  Each weapon has but a single wield option, so each row is complete.
        Also, there are often 20, 30 or more weapons in a single table.  Can we detect tables like this?
        If we don't fiat it, we need to test each WeaponsKVarray array for the lengths of all wieldOptions arrays for all Weapons
        objects represented there.  If none are >1, THEN we can provide sorting for this table.  Whew!  Worth it, or not?
    */

    for( var n in WOkeys ) {    // build separate tables for every wield skill
        // this loop will not run if WOkeys is empty, as it should be when groupBy=='weapon' or 'none'
        var swok = WOkeys[n];
        // console.log("sorted/processed weapon option key "+swok);    // prints e.g. "weapon option key Guns_Pistol"
        // console.log(WOstats[swok]);    // prints WOstats object for this weapon option
        var zclass = 'grey';
        var zcounter = 0;

        hide_rch = hide_ss = hide_acc = hide_rcl = hide_hlf = hide_max = hide_rof = hide_bulk = hide_shots = ' hide';
        if( WOstats[swok].rch ) hide_rch = '';
        if( WOstats[swok].ss  ) hide_ss = '';
        if( WOstats[swok].acc ) hide_acc = '';
        if( WOstats[swok].rcl ) hide_rcl = '';
        if( WOstats[swok].hlf ) hide_hlf = '';
        if( WOstats[swok].max ) hide_max = '';
        if( WOstats[swok].rof ) hide_rof = '';
        if( WOstats[swok].shots ) hide_shots = '';
        if( WOstats[swok].bulk ) hide_bulk = '';

        // build wield option skill group header title
        var WOskillname = ( Skills[swok] ) ? Skills[swok].name : swok;
        if( WOskillname.match('_') ) {
            nametokens = WOskillname.split('_');
            var matches = nametokens[0].match( skillTL_regex );
            var token0 = ( matches && matches.length ) ? matches[1] : nametokens[0];
            token0 = ( Skills[token0] ) ? Skills[token0].name : token0;
            WOskillname = token0+' ('+nametokens[1]+')';
        }
        HTML.push('  <div class="equipmentgroup">');
        HTML.push('    <div class="equipmentgroupheader"><b>'+WOskillname.toUpperCase()+'</b></div>');
        HTML.push('    <table id="'+swok+'_table" class="weaponstable">');
        HTML.push('      <colgroup>');
        HTML.push('        <col style="/*min-width:15%*/" class="weapon" /> <!-- weapon -->');
        HTML.push('        <col style="/*width:10%*/" class="wotitle" /> <!-- wield option label -->');
        HTML.push('        <col style="width: 6%" class="damage" /> <!-- damage -->');
        HTML.push('        <col style="width: 4%" class="type" /> <!-- type -->');
        if( WOstats[swok].rch )   HTML.push('        <col style="width:5%" class="rch" /> <!-- reach -->');
        if( WOstats[swok].ss  )   HTML.push('        <col style="width:4%" class="ss"  /> <!-- snapshot -->');
        if( WOstats[swok].acc )   HTML.push('        <col style="width:4%" class="acc" /> <!-- accuracy -->');
        if( WOstats[swok].rcl )   HTML.push('        <col style="width:4%" class="rcl" /> <!-- recoil -->');
        if( WOstats[swok].hlf )   HTML.push('        <col style="width:6%" class="hlf" /> <!-- 1/2 dmg range -->');
        if( WOstats[swok].max )   HTML.push('        <col style="width:6%" class="max" /> <!-- max range -->');
        if( WOstats[swok].rof )   HTML.push('        <col style="width:5%" class="rof" /> <!-- rate of fire -->');
        if( WOstats[swok].shots ) HTML.push('        <col style="width:4%" class="shots" /> <!-- shots -->');
        HTML.push('        <col style="width: 8%;" class="cost" /> <!-- cost -->');
        HTML.push('        <col style="width: 6%;" class="weight" /> <!-- weight -->');
        if( WOstats[swok].bulk )  HTML.push('        <col style="width:4%" class="bulk" /> <!-- bulk -->');
        HTML.push('        <col style="width: 4%" class="ST" /> <!-- ST -->');
        HTML.push('        <col style="width: 4%" class="TL" /> <!-- TL -->');
        HTML.push('        <col style="/*width:25%;*/ font-size:smaller;" class="notes" /> <!-- notes -->');
        HTML.push('      </colgroup>');
        HTML.push('      <thead>');
        HTML.push('      <tr class="equipmentgroupcolnames">');
        HTML.push('        <th class="weapon">Weapon</th>');
        HTML.push('        <th class="wotitle">&nbsp;</th>');
        HTML.push('        <th class="damage">Dmg</th>');
        HTML.push('        <th class="type">Type</th>');
        HTML.push('        <th class="rch'+hide_rch+'">Reach</th>');
        HTML.push('        <th class="ss' +hide_ss +'">SS</th>');
        HTML.push('        <th class="acc'+hide_acc+'">Acc</th>');
        HTML.push('        <th class="rcl'+hide_rcl+'">Rcl</th>');
        HTML.push('        <th class="hlf'+hide_hlf+'">½&nbsp;Dmg Range</th>');
        HTML.push('        <th class="max'+hide_max+'">Max Range</th>');
        HTML.push('        <th class="rof'+hide_rof+'">RoF</th>');
        HTML.push('        <th class="shots'+hide_shots+'">shots</th>');
        HTML.push('        <th class="cost">Cost</th>');
        HTML.push('        <th class="wt">&nbsp;Wt</th>');
        HTML.push('        <th class="bulk'+hide_bulk+'">Bulk</th>');
        HTML.push('        <th class="ST">ST</th>');
        HTML.push('        <th class="TL">TL</th>');
        HTML.push('        <th class="notes">Special&nbsp;Notes</th>');
        HTML.push('      </tr>');
        HTML.push('      </thead>');

        for( var i=0; i<WeaponsKVarray.length; i++ ) {
            var KVpair = WeaponsKVarray[i];
            var wk  = KVpair.key;     // console.log(wk);
            var Wpn = KVpair.value;   // if( swok=='Knife' )  console.log(Wpn);
            Wpn.number = 1;       // so print() outputs singular name
            for( var lwok in Wpn.wieldOptions ) {   // console.log("    testing unprocessed weapon wield option group "+lwok);
                var Wopts = Wpn.wieldOptions[lwok];
                var lwokMatches = lwok.match( sklTLsp_regex );
                if( lwokMatches ) {
                    lwok  = lwokMatches[1];     // lwokMatches[0] is entire string, if regex matched at all
                    lwok += ( lwokMatches[2] ) ? '_'+lwokMatches[2] : '';     // lwokMatches[0] is entire string, if regex matched at all
                }

                if( lwok==swok ) {
                    var detail = ( Wpn.detail ) ? Wpn.detail+' ' : '';
                    var bulk = ( Wpn.bulk ) ? Wpn.bulk : '';
                    var shots = ( Wpn.shots ) ? Wpn.shots : '';
                    // var notes = ( Wpn.notes ) ? Wpn.notes.join("<br />") : '';
                    for( var woi in Wopts ) {
                        zcounter++;
                        var Wopt = Wopts[woi];
                        var wotitle = ( Wopt.title ) ? Wopt.title+':' : '';
                        var dmgStr = '';
                        if( Wopt.damage ) {
                            var base = Wopt.damage.base;
                            var mods = Wopt.damage.mods;
                            var type = Wopt.damage.type;
                            if( base=='' ) dmgStr = 'special';
                            else if( isNaN(base) ) dmgStr = Wopt.damage.base + ( (Wopt.damage.mods!=0) ? signed(Wopt.damage.mods) : '' );
                            else {
                                var roll = new DieRoll(base,mods);
                                dmgStr = roll.toString();
                            }
                        }
                        var dmgTyp = (Wopt.damage) ? Wopt.damage.type : 'special';
                        // var note = ( Wopt.note ) ? Wopt.note.join("<br />") : '';
                        // if( notes ) note = '<br />'+note;
                        // if( Wopt.maxDamage ) note += '<br />'+Wopt.maxDamage;
                        var st = ( Wopt.strength==null || Wopt.strength==0 ) ? '-' : Wopt.strength;
                        // optional columns
                        var rch = ( Wopt.reach ) ? Wopt.reach : 1;
                        var ss  = ( Wopt.snapShot ) ? Wopt.snapShot : '';
                        var acc = ( Wopt.accuracy ) ? Wopt.accuracy : '';
                        var rcl = ( Wopt.recoil ) ? Wopt.recoil : '';
                        var hlf = ( Wopt.halfDamageRange ) ? Wopt.halfDamageRange : '';
                        var max = ( Wopt.maximumRange ) ? Wopt.maximumRange : '';
                        var rof = ( Wopt.rateOfFire ) ? Wopt.rateOfFire : '';
                        // if( swok=='Knife' ) console.log("for "+Wpn.print()+", '"+Wopt.title+"' option ("+woi+"), 'special notes' is");
		                    var specialNotes = (Wpn.notes) ? Wpn.notes.slice() : [];
                        if( Wopt.note ) specialNotes = Wopt.note.concat( specialNotes );
                        if( Wopt.maxDamage ) specialNotes.push( "Max. damage "+Wopt.maxDamage+"." );

                        HTML.push('      <tr class="'+zclass+'" title="'+expandMiniref(Wpn.reference)+'">');
                        HTML.push('        <td class="weapon">'+((woi>0)?'':Wpn.print().toTitleCase())+'</td>');     // weapon
                        HTML.push('        <td class="wotitle">'+wotitle+'</td>');     // wield option 'title' (e.g., 'slash' or 'thrust')
                        HTML.push('        <td class="damage">'+dmgStr+'</td>');     // damage
                        HTML.push('        <td class="type">'+dmgTyp+'</td>');     // type
                        HTML.push('        <td class="rch'+hide_rch+'">&ensp;'+rch+'</td>');      // reach
                        HTML.push('        <td class="ss'+hide_ss+'">'+ss+'</td>');      // snapshot
                        HTML.push('        <td class="acc'+hide_acc+'">'+acc+'</td>');      // accuracy
                        HTML.push('        <td class="rcl'+hide_rcl+'">'+rcl+'</td>');      // recoil
                        var xst = (Wopt.rangeBasedOnST) ? 'ST' : '';
                        if( xst && Wopt.rangeBasedOnST!='add' ) xst += '×';
                        HTML.push('        <td class="hlf'+hide_hlf+'">'+xst+hlf+'</td>');     // 1/2 damage range
                        HTML.push('        <td class="max'+hide_max+'">'+xst+max+'</td>');     // max range
                        HTML.push('        <td class="rof'+hide_rof+'">'+rof+'</td>');     // rate of fire
                        HTML.push('        <td class="shots'+hide_shots+'">'+((woi>0)?'':shots)+'</td>');     // shots
                        HTML.push('        <td class="cost">'+((woi>0)?'':'$'+Wpn.cost)+'</td>');     // cost
                       // HTML.push('        <td class="cost money">'+((woi>0)?'':Wpn.cost)+'</td>');     // cost
                        HTML.push('        <td class="wt">'+((woi>0)?'':Wpn.weight+'&nbsp;lbs')+'</td>');     // weight
                        HTML.push('        <td class="bulk'+hide_bulk+'">'+((woi>0)?'':bulk)+'</td>');     // bulk
                        HTML.push('        <td class="ST">'+st+'</td>');     // minimum ST
                        HTML.push('        <td class="TL">'+((woi>0)?'':Wpn.TL)+'</td>');      // tech level
                        HTML.push('        <td class="notes specialnotestd"><div class="scrollcell">'+specialNotes.join("&emsp;")+'</div></td>');	// special notes
                        // HTML.push('        <td class="notes specialnotestd">'+notes+note+'</td>');      // special notes
                        HTML.push('      </tr>');
                    }
                    zclass = ( zclass=='grey' ) ? 'white' : 'grey';   // switch background for each new weapon
                }
            }  // wield options loop; prints set of this-skill-specific options for the weapon (e.g., the swing and thrust options for a sword using Broadsword skill)
        } // weapon loop
        HTML.push('    </table>');
        HTML.push('  </div> <!-- .equipmentgroup '+swok+' -->');
    }   // loop over distinct wield options, i.e., distinct SKILLS (Broadsword, Beam Weapons, etc.)
    if( WOkeys.length==0 ) {      // this branch includes the single, quality type, and weapon table options
        // re-sort the WeaponsKVarray array by name (sorted above by TL)
        WeaponsKVarray.sort(
            function(a,b) {
                var aWpn = a.value;
                var bWpn = b.value;
                var aDtl = (aWpn.detail) ? aWpn.detail : '';
                var bDtl = (bWpn.detail) ? bWpn.detail : '';
                return (aWpn.name.toLowerCase()+aDtl>bWpn.name.toLowerCase()+bDtl) ? 1 : -1;
            }
        );

        if( groupBy.match(/none/i) ) {    // build single table

            HTML.push('    <table id="weapons_table" class="weaponstable" style="margin-bottom:1em;">');
            HTML.push('      <colgroup>');
            HTML.push('        <col style=" class="weapon" /> <!-- weapon -->');
            HTML.push('        <col style="width:8%; " class="cost" /> <!-- cost -->');
            HTML.push('        <col style="width:6%; " class="weight" /> <!-- weight -->');
            HTML.push('        <col style="width:4%; " class="shots" /> <!-- shots -->');
            HTML.push('        <col style="width:4%; " class="bulk"  /> <!-- bulk -->');
            HTML.push('        <col style="width:4%; " class="TL" /> <!-- TL -->');
            HTML.push('        <col style="width:10%;" class="qual" /> <!-- quality group -->');
            HTML.push('        <col style="width:35%;" class="notes" /> <!-- notes -->');
            HTML.push('        <col style="width:8%; " class="ref" /> <!-- reference -->');
            HTML.push('      </colgroup>');
            HTML.push('      <thead>');
            HTML.push('      <tr class="equipmentgroupcolnames">');
            HTML.push('        <th class="weapon sortable" onclick="sortTable( document.getElementById(\'weapons_table\'), 0 )">Weapon</th>');
            HTML.push('        <th class="cost sortable"   onclick="sortTable( document.getElementById(\'weapons_table\'), 1 )">Cost</th>');
            HTML.push('        <th class="wt sortable"     onclick="sortTable( document.getElementById(\'weapons_table\'), 2 )">Wt&emsp;</th>');
            HTML.push('        <th class="shots sortable"  onclick="sortTable( document.getElementById(\'weapons_table\'), 3 )">Shots</th>');
            HTML.push('        <th class="bulk sortable"   onclick="sortTable( document.getElementById(\'weapons_table\'), 4 )">Bulk</th>');
            HTML.push('        <th class="TL sortable"     onclick="sortTable( document.getElementById(\'weapons_table\'), 5 )">TL</th>');
            HTML.push('        <th class="qual sortable"   onclick="sortTable( document.getElementById(\'weapons_table\'), 6 )">Quality Group</th>');
            HTML.push('        <th class="notes">Weapon&nbsp;Notes</th>');
            HTML.push('        <th class="ref">Reference</th>');
            HTML.push('      </tr>');
            HTML.push('      </thead>');

            var zclass = 'zrow';

            for( var w=0; w<WeaponsKVarray.length; w++ ) {
                var KVpair = WeaponsKVarray[w];
                var wk  = KVpair.key;      // console.log(wk);
                var Wpn = KVpair.value;    // console.log(Wpn);
                Wpn.number = 1;       // so print() outputs singular name
                var WOstats = {};   // in this loop, WOstats is regenerated for each weapon, and it doesn't need the wield skill layer
                // if( wk=='KnifeLarge' ) console.log(Wpn.wieldOptions);
                for( var wok in Wpn.wieldOptions ) {
                    var wieldOpt = Wpn.wieldOptions[wok];
                    // WOstats.count =  wieldOpt.length,
                    WOstats.ttl   = (WOstats.ttl || wieldOpt[0].title) ? true : false;
                    WOstats.rch   = (WOstats.rch || wieldOpt[0].reach) ? true : false;    // complicated because often omitted and assumed = 1 (could I choose whether to set=false or set=1 (ie true) based on presence of range options)
                    WOstats.ss    = (WOstats.ss  || wieldOpt[0].snapShot) ? true : false;
                    WOstats.acc   = (WOstats.acc || wieldOpt[0].accuracy) ? true : false;
                    WOstats.rcl   = (WOstats.rcl || wieldOpt[0].recoil) ? true : false;
                    WOstats.hlf   = (WOstats.hlf || wieldOpt[0].halfDamageRange) ? true : false;
                    WOstats.max   = (WOstats.max || wieldOpt[0].maximumRange) ? true : false;
                    WOstats.rof   = (WOstats.rof || wieldOpt[0].rateOfFire) ? true : false;
                }
                // console.log(WOstats);

                var detail = ( Wpn.detail ) ? Wpn.detail+' ' : '';
                var bulk  = ( Wpn.bulk  ) ? Wpn.bulk : '';
                var shots = ( Wpn.shots ) ? Wpn.shots : '';
                var notes = ( Wpn.notes ) ? Wpn.notes.join("<br />") : '&nbsp;';
                // console.log(Wpn.name+", "+Wpn.cost);
                var cost = ( !Wpn.cost || isNaN(Wpn.cost) || Math.trunc(Wpn.cost) == Wpn.cost ) ? Wpn.cost : Wpn.cost.toFixed(2);

                HTML.push('      <tr class="'+zclass+'">');
                HTML.push('        <td class="weapon"><b>&nbsp;'+Wpn.print().toTitleCase()+'</b></td>');
                HTML.push('        <td class="cost money">'+cost+'</td>');     // cost
                HTML.push('        <td class="wt pounds">'+actualWeight(Wpn)+'</td>');     // weight
                HTML.push('        <td class="shots">'+shots+'</td>');     // shots
                HTML.push('        <td class="bulk">'+bulk+'</td>');     // bulk
                HTML.push('        <td class="TL">'+Wpn.TL+'</td>');      // tech level
                HTML.push('        <td class="qual">'+name_for_qualityEffectGroup[Wpn.qualityEffectGroup]+'</td>');      // "quality effect" group
                HTML.push('        <td class="notes specialnotestd"><div class="scrollcell">'+notes+'</div></td>');      // notes
                HTML.push('        <td class="ref">&emsp;'+Wpn.reference+'</td>');      // reference
                HTML.push('      </tr>');

                zclass = ( zclass=='zrow' ) ? 'white' : 'zrow';

            }

            HTML.push('    </table> <!-- #'+wk+'_table -->');

        } // end if groupBy is 'none'
        else if( groupBy.match(/quality/i) ) {    // build tables for each quality effect group

            for( const qk in QualityEffectGroupTextForOption ) {
                hide_rch = hide_ss = hide_acc = hide_rcl = hide_hlf = hide_max = hide_rof = hide_bulk = hide_shots = ' hide';
                if( QGstats[qk].rch   ) hide_rch = '';
                if( QGstats[qk].ss    ) hide_ss = '';
                if( QGstats[qk].acc   ) hide_acc = '';
                if( QGstats[qk].rcl   ) hide_rcl = '';
                if( QGstats[qk].hlf   ) hide_hlf = '';
                if( QGstats[qk].max   ) hide_max = '';
                if( QGstats[qk].rof   ) hide_rof = '';
                if( QGstats[qk].shots ) hide_shots = '';
                if( QGstats[qk].bulk  ) hide_bulk = '';

                let bodyHTML = [];
                let zclass = 'grey';

                // header
                HTML.push('  <div class="equipmentgroup">');
                HTML.push('    <div class="equipmentgroupheader"><b>'+QualityEffectGroupTextForOption[qk].toUpperCase()+'</b></div>');
                HTML.push('    <table id="'+qk+'_table" class="weaponstable">');
                HTML.push('      <colgroup>');
                HTML.push('        <col style="min-width:10%" class="weapon" /> <!-- weapon -->');
                HTML.push('        <col style="width: 4%" class="TL" /> <!-- TL -->');
                HTML.push('        <col style="width: 8%" class="cost" /> <!-- cost -->');
                HTML.push('        <col style="width: 6%" class="weight" /> <!-- weight -->');
                if( QGstats[qk].bulk )  HTML.push('        <col style="width:4%" class="bulk" /> <!-- bulk -->');
                
                HTML.push('        <col class="wogp" /> <!-- wield option skill group label -->');
//                 HTML.push('        <col style="/*width:10%*/" class="skgp" /> <!-- wield skill label -->');
//                 HTML.push('        <col style="/*width:10%*/" class="wotitle" /> <!-- wield option label -->');
                HTML.push('        <col style="width: 6%" class="damage" /> <!-- damage -->');
                HTML.push('        <col style="width: 4%" class="type" /> <!-- type -->');
                HTML.push('        <col style="width: 4%" class="ST" /> <!-- ST -->');
                if( QGstats[qk].rch )   HTML.push('        <col style="width:5%" class="rch" /> <!-- reach -->');
                if( QGstats[qk].ss  )   HTML.push('        <col style="width:4%" class="ss"  /> <!-- snapshot -->');
                if( QGstats[qk].acc )   HTML.push('        <col style="width:4%" class="acc" /> <!-- accuracy -->');
                if( QGstats[qk].rcl )   HTML.push('        <col style="width:4%" class="rcl" /> <!-- recoil -->');
                if( QGstats[qk].hlf )   HTML.push('        <col style="width:6%" class="hlf" /> <!-- 1/2 dmg range -->');
                if( QGstats[qk].max )   HTML.push('        <col style="width:6%" class="max" /> <!-- max range -->');
                if( QGstats[qk].rof )   HTML.push('        <col style="width:5%" class="rof" /> <!-- rate of fire -->');
                if( QGstats[qk].shots ) HTML.push('        <col style="width:4%" class="shots" /> <!-- shots -->');
                HTML.push('        <col style="font-size:smaller; width:25%;" class="notes" /> <!-- notes -->');
                HTML.push('      </colgroup>');
                HTML.push('      <thead>');
                HTML.push('      <tr class="equipmentgroupcolnames">');
                // HTML.push('        <th class="weapon sortable" onclick="sortTable( document.getElementById(\''+qk+'_table\'), 0 )">Weapon</th>');
                // can't make ANY of the weapon-level columns sortable in this way; the FIRST rows in each weapon group all get sorted to one batch (because they have contents)
                HTML.push('        <th class="weapon">Weapon</th>');
                HTML.push('        <th class="TL">TL</th>');
                HTML.push('        <th class="cost">Cost</th>');
                HTML.push('        <th class="wt">&nbsp;Wt</th>');
                HTML.push('        <th class="bulk'+hide_bulk+'">Bulk</th>');
                HTML.push('        <th class="wogp">SkillTL (spec) &amp; <span style="font-weight:initial;">Wield Option</span></th>');
                HTML.push('        <th class="damage">Dmg</th>');
                HTML.push('        <th class="type">Type</th>');
                HTML.push('        <th class="ST">ST</th>');
                HTML.push('        <th class="rch'+hide_rch+'">Reach</th>');
                HTML.push('        <th class="ss' +hide_ss +'">SS</th>');
                HTML.push('        <th class="acc'+hide_acc+'">Acc</th>');
                HTML.push('        <th class="rcl'+hide_rcl+'">Rcl</th>');
                HTML.push('        <th class="hlf'+hide_hlf+'">½&nbsp;Dmg Range</th>');
                HTML.push('        <th class="max'+hide_max+'">Max Range</th>');
                HTML.push('        <th class="rof'+hide_rof+'">RoF</th>');
                HTML.push('        <th class="shots'+hide_shots+'">shots</th>');
                HTML.push('        <th class="notes">Notes</th>');
                HTML.push('      </tr>');
                HTML.push('      </thead>');

                for( let i=0; i<WeaponsKVarray.length; i++ ) {  // loop over all weapons, filter to this quality group, show those weapons
                    let KVpair = WeaponsKVarray[i];
                    let wk  = KVpair.key;     // console.log(wk);
                    let Wpn = KVpair.value;   // this is a Weapon object
                    // Weapon: name, cost, weight, tech level, bulk, reference (also quality group, but since we group by this below, no need to list here)

                    if( Wpn.qualityEffectGroup==qk ) {  // filter to this quality group

                        Wpn.number = 1;           // so print() outputs singular name
                        let wpnrow1 = true;

                        let detail = ( Wpn.detail ) ? Wpn.detail+' ' : '';
                        let bulk   = ( Wpn.bulk )   ? Wpn.bulk : '';
                        let shots  = ( Wpn.shots )  ? Wpn.shots : '';

                        let notes  = ( Wpn.notes )  ? Wpn.notes.slice() : [];

												let weaponRowSpan = 0;
												let weaponNote = false;
											WIELDOPTIONSPRELOOP:
                        for( let wog in Wpn.wieldOptions ) {
                            let WieldOptGp = Wpn.wieldOptions[wog];
                            for( let wo=0; wo<WieldOptGp.length; wo++ ) {
                                let wieldOpt = WieldOptGp[wo];
                                // compare notes
                                if( weaponNote!==false ) {	// if note is undefined, '', or exactly equal to weaponNote, increment
																		if( !wieldOpt.note || wieldOpt.note.join(',')==weaponNote ) { weaponRowSpan++ }
																		else { weaponRowSpan = -1; /*console.log("break "+Wpn.name+" on "+wieldOpt.note);*/ break WIELDOPTIONSPRELOOP; }
                                }
                                else {
                                		weaponNote = (wieldOpt.note) ? wieldOpt.note.join(',') : wieldOpt.note;
                                		weaponRowSpan = 1;
                                }
                            }
                        }
												let oneNote = ( weaponRowSpan>1 ) ? true : false;
												//console.log(Wpn.name+" note row span: "+weaponRowSpan);

                        for( let wog in Wpn.wieldOptions ) {
                            let WieldOptGp = Wpn.wieldOptions[wog];
                            // wield option skill group: wielding skill (technically maximum damage, ST, parry bonus, ranges, etc probably go here, but in practice are part of each option) 
                            let grprow1 = true;

                            // get wielding skill at this level
                            let wogMatches = wog.match( sklTLsp_regex );    // wogMatches is an array of matches, or null
                            let skill_spec = ( fullSkillNameFor[wog] ) ? fullSkillNameFor[wog] : wog;
                            if( wogMatches ) {     // wogMatches[0] is entire string, if regex matched at all
                                skill_spec  = ( fullSkillNameFor[wogMatches[1]] ) ? fullSkillNameFor[wogMatches[1]] : wogMatches[1];
                                skill_spec += (wogMatches[2]) ? ' ('+ wogMatches[2]+')' : '';
                            }

//                             if( WieldOptGp.note ) notes = WieldOptGp.note.concat( specialNotes );
//                             if( WieldOptGp.maxDamage ) notes.push( "Max. damage "+WieldOptGp.maxDamage+"." );

                            let groupRowSpan = 0;
                            let optGrpNote  = false;
                          OPTIONGROUPPRELOOP:
                            for( let wo=0; wo<WieldOptGp.length; wo++ ) {
                                let wieldOpt = WieldOptGp[wo];
                                // compare notes
                                if( optGrpNote!==false ) {	// if note is undefined, '', or exactly equal to optGrpNote, increment
																		if( !wieldOpt.note || wieldOpt.note.join(',')==optGrpNote ) { groupRowSpan++ }
																		else { groupRowSpan = -1; /*console.log("break "+Wpn.name+" on "+wieldOpt.note);*/ break OPTIONGROUPPRELOOP; }
                                }
                                else {
                                		optGrpNote = (wieldOpt.note) ? wieldOpt.note.join(',') : wieldOpt.note;
                                		groupRowSpan = 1;
                                }
                            }
                            let groupNote = ( groupRowSpan>1 ) ? true : false;

                            for( let wo=0; wo<WieldOptGp.length; wo++ ) {
                                let wieldOpt = WieldOptGp[wo];
                                // wield option: wield title (e.g., 'swing', 'thrown', etc.), damage stuff, hands, ST, reach, etc.
                                if( !grprow1 ) { skill_spec = ''; }

                                let wotitle = ( wieldOpt.title ) ? wieldOpt.title+':' : '';
                                let dmgStr = '';
                                if( wieldOpt.damage ) {
                                    let base = wieldOpt.damage.base;
                                    let mods = wieldOpt.damage.mods;
                                    let type = wieldOpt.damage.type;
                                    if( base=='' ) dmgStr = 'special';
                                    else if( isNaN(base) ) dmgStr = wieldOpt.damage.base + ( (wieldOpt.damage.mods!=0) ? signed(wieldOpt.damage.mods) : '' );
                                    else {
                                        let roll = new DieRoll(base,mods);
                                        dmgStr = roll.toString();
                                    }
                                }
                                let dmgTyp = (wieldOpt.damage) ? wieldOpt.damage.type : 'special';
                                let st = ( wieldOpt.strength==null || wieldOpt.strength==0 ) ? '-' : wieldOpt.strength;
                                // optional columns
                                let rch = ( wieldOpt.reach ) ? wieldOpt.reach : 1;
                                let ss  = ( wieldOpt.snapShot ) ? wieldOpt.snapShot : '';
                                let acc = ( wieldOpt.accuracy ) ? wieldOpt.accuracy : '';
                                let rcl = ( wieldOpt.recoil ) ? wieldOpt.recoil : '';
                                let hlf = ( wieldOpt.halfDamageRange ) ? wieldOpt.halfDamageRange : '';
                                let max = ( wieldOpt.maximumRange ) ? wieldOpt.maximumRange : '';
                                let rof = ( wieldOpt.rateOfFire ) ? wieldOpt.rateOfFire : '';
                                let fullnotes = ( wieldOpt.note ) ? notes.concat(wieldOpt.note) : notes;

                                // create table content rows
                                bodyHTML.push('      <tr class="'+zclass+'" title="'+expandMiniref(Wpn.reference)+'">');
                                if( wpnrow1 ) {
                                    bodyHTML.push('        <td class="weapon">'+((woi>0)?'':Wpn.print().toTitleCase())+'</td>');     // weapon
                                    bodyHTML.push('        <td class="TL">'+((woi>0)?'':Wpn.TL)+'</td>');      // tech level
                                    bodyHTML.push('        <td class="cost">'+((woi>0)?'':'$'+Wpn.cost)+'</td>');     // cost
                                   // bodyHTML.push('        <td class="cost money">'+((woi>0)?'':Wpn.cost)+'</td>');     // cost
                                    bodyHTML.push('        <td class="wt">'+((woi>0)?'':Wpn.weight+'&nbsp;lbs')+'</td>');     // weight
                                    bodyHTML.push('        <td class="bulk'+hide_bulk+'">'+((woi>0)?'':bulk)+'</td>');     // bulk
                                    //wpnrow1 = false;
                                }
                                else {
                                    bodyHTML.push('        <td class="weapon">&nbsp;</td>');
                                    bodyHTML.push('        <td class="TL">&nbsp;</td>');
                                    bodyHTML.push('        <td class="cost">&nbsp;</td>');
                                    bodyHTML.push('        <td class="wt">&nbsp;</td>');
                                    bodyHTML.push('        <td class="bulk'+hide_bulk+'">&nbsp;</td>');
                                }
                                bodyHTML.push('        <td class="wogp"><b>'+skill_spec+'</b>&emsp;<i>'+wotitle+'</i></td>');     // wield option group; e.g., Thrown Weapon (Shuriken) 	thrown:
                                bodyHTML.push('        <td class="damage">'+dmgStr+'</td>');     // damage
                                bodyHTML.push('        <td class="type">'+dmgTyp+'</td>');     // type
                                bodyHTML.push('        <td class="ST">'+st+'</td>');     // minimum ST
                                bodyHTML.push('        <td class="rch'+hide_rch+'">&ensp;'+rch+'</td>');      // reach
                                bodyHTML.push('        <td class="ss'+hide_ss+'">'+ss+'</td>');      // snapshot
                                bodyHTML.push('        <td class="acc'+hide_acc+'">'+acc+'</td>');      // accuracy
                                bodyHTML.push('        <td class="rcl'+hide_rcl+'">'+rcl+'</td>');      // recoil
                                let xst = (wieldOpt.rangeBasedOnST) ? 'ST' : '';
                                if( xst && wieldOpt.rangeBasedOnST!='add' ) xst += '×';
                                bodyHTML.push('        <td class="hlf'+hide_hlf+'">'+xst+hlf+'</td>');     // 1/2 damage range
                                bodyHTML.push('        <td class="max'+hide_max+'">'+xst+max+'</td>');     // max range
                                bodyHTML.push('        <td class="rof'+hide_rof+'">'+rof+'</td>');     // rate of fire
                                bodyHTML.push('        <td class="shots'+hide_shots+'">'+((woi>0)?'':shots)+'</td>');     // shots
																if( oneNote ) {
																		if( wpnrow1 ) {
		    		                            bodyHTML.push('        <td class="notes specialnotestd" rowspan="'+weaponRowSpan+'"><div class="scrollcell">'+fullnotes.join("&emsp;")+'</div></td>');	// special notes
																		}
																}
																else if( groupNote ) {
																		if( grprow1 ) {
		    		                            bodyHTML.push('        <td class="notes specialnotestd" rowspan="'+groupRowSpan+'"><div class="scrollcell">'+fullnotes.join("&emsp;")+'</div></td>');	// special notes
																		}
																}
																else {
		                                bodyHTML.push('        <td class="notes specialnotestd"><div class="scrollcell">'+fullnotes.join("&emsp;")+'</div></td>');	// special notes
																}
                                bodyHTML.push('      </tr>');
                                if( grprow1 ) { grprow1 = false; }
                                if( wpnrow1 ) { wpnrow1 = false; }
                            }
                        }   // end loop over wield options
                        zclass = ( zclass=='grey' ) ? 'white' : 'grey';   // switch background for each new weapon
                    }   // end if(quality effect group match) branch

                }   // end loop over Weapons
                // inject bodyHTML
                HTML.push( bodyHTML.join("\n") );
                // close table
                HTML.push('    </table>');
                HTML.push('  </div> <!-- .equipmentgroup '+qk+' -->');
            } // end loop over quality groups
        } // end if groupBy is 'quality'
        else {    // show each weapon in a separate box/table

            for( var w=0; w<WeaponsKVarray.length; w++ ) {
                var KVpair = WeaponsKVarray[w];
                var wk  = KVpair.key;      // console.log(wk);
                var Wpn = KVpair.value;    // console.log(Wpn);
                Wpn.number = 1;       // so print() outputs singular name
                var WOstats = {};   // in this loop, WOstats is regenerated for each weapon, and it doesn't need the wield skill layer
                // if( wk=='KnifeLarge' ) console.log(Wpn.wieldOptions);
                for( var wok in Wpn.wieldOptions ) {
                    var wieldOpt = Wpn.wieldOptions[wok];
                    // WOstats.count =  wieldOpt.length,
                    WOstats.ttl   = (WOstats.ttl || wieldOpt[0].title) ? true : false;
                    WOstats.rch   = (WOstats.rch || wieldOpt[0].reach) ? true : false;    // complicated because often omitted and assumed = 1 (could I choose whether to set=false or set=1 (ie true) based on presence of range options)
                    WOstats.ss    = (WOstats.ss  || wieldOpt[0].snapShot) ? true : false;
                    WOstats.acc   = (WOstats.acc || wieldOpt[0].accuracy) ? true : false;
                    WOstats.rcl   = (WOstats.rcl || wieldOpt[0].recoil) ? true : false;
                    WOstats.hlf   = (WOstats.hlf || wieldOpt[0].halfDamageRange) ? true : false;
                    WOstats.max   = (WOstats.max || wieldOpt[0].maximumRange) ? true : false;
                    WOstats.rof   = (WOstats.rof || wieldOpt[0].rateOfFire) ? true : false;
                }
                // console.log(WOstats);

                var detail = ( Wpn.detail ) ? Wpn.detail+' ' : '';
                var bulk  = ( Wpn.bulk  ) ? Wpn.bulk : '';
                var shots = ( Wpn.shots ) ? Wpn.shots : '';
                var notes = ( Wpn.notes ) ? Wpn.notes.join("<br />") : '&nbsp;';

                var zclass = 'white';
                var zcounter = 0;

                hide_rch = hide_ttl = hide_ss = hide_acc = hide_rcl = hide_hlf = hide_max = hide_rof = hide_bulk = hide_shots = ' hide';

                if( WOstats.ttl ) hide_ttl = '';
                if( WOstats.rch ) hide_rch = '';
                if( WOstats.ss  ) hide_ss = '';
                if( WOstats.acc ) hide_acc = '';
                if( WOstats.rcl ) hide_rcl = '';
                if( WOstats.hlf ) hide_hlf = '';
                if( WOstats.max ) hide_max = '';
                if( WOstats.rof ) hide_rof = '';
                if( Wpn.shots   ) hide_shots = '';
                if( Wpn.bulk    ) hide_bulk = '';

                HTML.push('  <div class="equipmentgroup" style="border: 1px solid powderblue; /*border-radius:5px;*/">');
                // table of weapon-level values (cost, weight, TL, etc)
                HTML.push('    <table id="'+wk+'_table" class="weaponstable" style="margin-bottom:1em;">');
                HTML.push('      <colgroup>');
                HTML.push('        <col style="min-width:15%" class="weapon" /> <!-- weapon -->');
                HTML.push('        <col style="width:10%" class="trans" /> <!-- transition cell -->');
                HTML.push('        <col style="width:8%" class="cost" /> <!-- cost -->');
                HTML.push('        <col style="width:6%" class="weight" /> <!-- weight -->');
                if( Wpn.shots) HTML.push('        <col style="width:4%" class="shots" /> <!-- shots -->');
                if( Wpn.bulk ) HTML.push('        <col style="width:4%" class="bulk"  /> <!-- bulk -->');
                HTML.push('        <col style="width:4%" class="TL" /> <!-- TL -->');
                HTML.push('        <col style="width:25%; font-size:smaller;" class="notes" /> <!-- notes -->');
                HTML.push('      </colgroup>');
                HTML.push('      <tr class="equipmentgroupcolnames" style="background-color:lightgrey;">');
                HTML.push('        <th class="weapon weapongroupheader">&nbsp;'+Wpn.print().toTitleCase()+'</th>');
                HTML.push('        <th class="trans" style="background-image: linear-gradient(to right, white , lightgrey);">&nbsp;</th>');
                HTML.push('        <th class="cost">Cost</th>');
                HTML.push('        <th class="wt">Wt&emsp;</th>');
                HTML.push('        <th class="shots'+hide_shots+'">Shots</th>');
                HTML.push('        <th class="bulk'+hide_bulk+'">Bulk</th>');
                HTML.push('        <th class="TL">TL</th>');
                HTML.push('        <th class="notes">Weapon&nbsp;Notes</th>');
                HTML.push('      </tr>');
                HTML.push('      <tr class="grey">');
                HTML.push('        <td class="ref" style="background-color: white;">&emsp;'+expandMiniref(Wpn.reference)+'</td>');      // reference
                HTML.push('        <td class="trans" style="background-image: linear-gradient(to right, white , #eee);">&nbsp;</td>');
                HTML.push('        <td class="cost">$'+Wpn.cost+'</td>');     // cost
                HTML.push('        <td class="wt">'+actualWeight(Wpn)+'&nbsp;lbs</td>');     // weight
                HTML.push('        <td class="shots'+hide_shots+'">'+shots+'</td>');     // shots
                HTML.push('        <td class="bulk'+hide_bulk+'">'+bulk+'</td>');     // bulk
                HTML.push('        <td class="TL">'+Wpn.TL+'</td>');      // tech level
                HTML.push('        <td class="notes specialnotestd"><div class="scrollcell">'+notes+'</div></td>');      // notes
                HTML.push('      </tr>');
                HTML.push('    </table> <!-- #'+wk+'_table -->');

                // table of wield options
                HTML.push('    <table id="'+wk+'_options_table" class="weaponstable">');
                HTML.push('      <colgroup>');
                HTML.push('        <col style="width:20%" class="skill" /> <!-- skill -->');
                if( WOstats.ttl  ) HTML.push('        <col style="width:10%; max-width:150px;" class="wotitle" /> <!-- option label -->');
                HTML.push('        <col style="width:6%" class="damage" /> <!-- damage -->');
                HTML.push('        <col style="width:4%" class="type" /> <!-- type -->');
                if( WOstats.rch  ) HTML.push('        <col style="width:5%" class="rch"   /> <!-- reach -->');
                if( WOstats.ss   ) HTML.push('        <col style="width:4%" class="ss"    /> <!-- snapshot -->');
                if( WOstats.acc  ) HTML.push('        <col style="width:4%" class="acc"   /> <!-- accuracy -->');
                if( WOstats.rcl  ) HTML.push('        <col style="width:4%" class="rcl"   /> <!-- recoil -->');
                if( WOstats.hlf  ) HTML.push('        <col style="width:6%" class="hlf"   /> <!-- 1/2 dmg range -->');
                if( WOstats.max  ) HTML.push('        <col style="width:6%" class="max"   /> <!-- max range -->');
                if( WOstats.rof  ) HTML.push('        <col style="width:5%" class="rof"   /> <!-- rate of fire -->');
                HTML.push('        <col style="width:4%" class="ST" /> <!-- ST -->');
                HTML.push('        <col style="width:40%; font-size:smaller;" class="note"   /> <!-- notes -->');
                HTML.push('      </colgroup>');
                HTML.push('      <tr class="equipmentgroupcolnames" style="background-color:lightgrey;">');
                HTML.push('        <th class="skill">Skill</th>');
                HTML.push('        <th class="wotitle'+hide_ttl+'">&nbsp;</th>');
                HTML.push('        <th class="damage">Dmg</th>');
                HTML.push('        <th class="type">Type</th>');
                HTML.push('        <th class="rch'+hide_rch+'">Reach</th>');
                HTML.push('        <th class="ss'+hide_ss+'">SS</th>');
                HTML.push('        <th class="acc'+hide_acc+'">Acc</th>');
                HTML.push('        <th class="rcl'+hide_rcl+'">Rcl</th>');
                HTML.push('        <th class="hlf'+hide_hlf+'">½&nbsp;Dmg Range</th>');
                HTML.push('        <th class="max'+hide_max+'">Max Range</th>');
                HTML.push('        <th class="rof'+hide_rof+'">RoF</th>');
                HTML.push('        <th class="ST">ST</th>');
                HTML.push('        <th class="note">Special&nbsp;Notes</th>');
                HTML.push('      </tr>');

                for( var lwok in Wpn.wieldOptions ) {   // console.log("    testing unprocessed weapon wield option group "+lwok);
                    var Wopts = Wpn.wieldOptions[lwok];
                    // build wield option skill group header title
                    var WOskillname = ( Skills[lwok] ) ? Skills[lwok].name : lwok;
                    if( WOskillname.match('_') ) {
                        nametokens = WOskillname.split('_');
                        var matches = nametokens[0].match(/([a-zA-Z]+)\d+$/);
                        var token0 = ( matches && matches.length ) ? matches[1] : nametokens[0];
                        token0 = ( Skills[token0] ) ? Skills[token0].name : token0;
                        WOskillname = token0+' ('+nametokens[1]+')';
                    }
                    for( var woi in Wopts ) {
                        zcounter++;
                        var Wopt = Wopts[woi];
                        var WOtitle = (Wopt.title) ? Wopt.title : '';
                        var dmgStr = '';
                        if( Wopt.damage ) {
                            var base = Wopt.damage.base;
                            var mods = Wopt.damage.mods;
                            var type = Wopt.damage.type;
                            if( base=='' ) dmgStr = 'special';
                            else if( isNaN(base) ) dmgStr = Wopt.damage.base + ( (Wopt.damage.mods!=0) ? signed(Wopt.damage.mods) : '' );
                            else {
                                var roll = new DieRoll(base,mods);
                                dmgStr = roll.toString();
                            }
                        }
                        var dmgTyp = (Wopt.damage) ? Wopt.damage.type : 'special';
                        var note = ( Wopt.note ) ? Wopt.note.join("<br />") : '';
                        note += ( Wopt.maxDamage ) ? "<br />Max damage "+Wopt.maxDamage+"." : '';
                       // if( notes ) note = '<br />'+note;
                        var st = ( Wopt.strength==null || Wopt.strength==0 ) ? '-' : Wopt.strength;
                        // optional columns
                        var rch = ( Wopt.reach ) ? Wopt.reach : 1;
                        var ss  = ( Wopt.snapShot ) ? Wopt.snapShot : '';
                        var acc = ( Wopt.accuracy ) ? Wopt.accuracy : '';
                        var rcl = ( Wopt.recoil ) ? Wopt.recoil : '';
                        var hlf = ( Wopt.halfDamageRange ) ? Wopt.halfDamageRange : '';
                        var max = ( Wopt.maximumRange ) ? Wopt.maximumRange : '';
                        var rof = ( Wopt.rateOfFire ) ? Wopt.rateOfFire : '';
                        HTML.push('      <tr class="'+zclass+'">');
                        HTML.push('        <td class="skill">'+((woi>0)?'':WOskillname)+'</td>');     // skill
                        HTML.push('        <td class="wotitle'+hide_ttl+'">'+WOtitle+'</td>');     // option label
                        HTML.push('        <td class="damage">'+dmgStr+'</td>');     // damage
                        HTML.push('        <td class="type">'+dmgTyp+'</td>');     // type
                        HTML.push('        <td class="rch'+hide_rch+'">&ensp;'+rch+'</td>');      // reach
                        HTML.push('        <td class="ss'+hide_ss+'">'+ss+'</td>');      // snapshot
                        HTML.push('        <td class="acc'+hide_acc+'">'+acc+'</td>');      // accuracy
                        HTML.push('        <td class="rcl'+hide_rcl+'">'+rcl+'</td>');      // recoil
                        var xst = (Wopt.rangeBasedOnST) ? 'ST' : '';
                        if( xst && Wopt.rangeBasedOnST!='add' ) xst += '×';
                        HTML.push('        <td class="hlf'+hide_hlf+'">'+xst+hlf+'</td>');     // 1/2 damage range
                        HTML.push('        <td class="max'+hide_max+'">'+xst+max+'</td>');     // max range
                        HTML.push('        <td class="rof'+hide_rof+'">'+rof+'</td>');     // rate of fire
                        HTML.push('        <td class="ST">'+st+'</td>');     // minimum ST
                        HTML.push('        <td class="note specialnotestd"><div class="scrollcell">'/*+notes*/+note+'</div></td>');      // notes
                        HTML.push('      </tr>');
                    }
                    zclass = ( zclass=='grey' ) ? 'white' : 'grey'; zcounter = 0;
                }   // wield options loop
                HTML.push('    </table> <!-- #'+wk+'_options_table -->');

                HTML.push('  </div> <!-- .equipmentgroup '+swok+' -->');
            } // end WeaponsKVarray loop

        } // end else
    }

    return HTML.join("\n");
}
function buildTemplatesReportTable() {                // console.log("[buildTemplatesReportTable]");

    // make a sortable array from Templates object
    var TemplatesArray = [];
    for( var t in Templates ) {
        var Template = Templates[t];
        // make sure each Template item object in the TemplatesArray library object has a matching key attribute
        if( !Template.key || Template.key!=t ) Template.key = t;
        TemplatesArray.push( Template );
    }
    // sort by Template name
    TemplatesArray.sort( function(a,b) { return ( a.name > b.name ) ? 1 : -1; } );

    var HTML = [];
    HTML.push('    <style>');
    HTML.push('      #noteStyleToggle  { display: none; }');
    HTML.push('      .templatesmetatraitstable .name     { white-space: nowrap; font-weight:bold; font-style: italic; font-size: 1.25em; }');
    HTML.push('      .templatesmetatraitstable .features { text-align: left; padding-right: 2%; }');
    HTML.push('      .templatesmetatraitstable .refpts   { text-align: right; white-space: nowrap; }');
    HTML.push('      .templatesmetatraitstable .glob     { white-space: nowrap; }');
    HTML.push('      .templatesmetatraitstable .ftrLbl   { text-align: right; vertical-align: top; font-style: italic; }');
    HTML.push('    </style>');

    HTML.push('    <table id="templatesmetatraits_table" class="templatesmetatraitstable">');
    HTML.push('      <colgroup>');
    HTML.push('        <col style="width:15%" class="name" /> <!-- name -->');
    HTML.push('        <col style=""  class="features" /> <!-- features -->');
    HTML.push('        <col style="width:10%"  class="refpts" /> <!-- points & reference -->');
    HTML.push('      </colgroup>');
    HTML.push('      <tbody>');

    var rowclass = 'zrow';

    for( var i=0; i<TemplatesArray.length; i++ ) {
        var Tplt = TemplatesArray[i];                 // console.log(Tplt.name+" template");
        if( !Tplt.name ) continue;
        var attmods = []; var secmods = []; var ads = []; var disads = []; var quirks = []; var features = []; var metatraits = []; var adjustments = [];
        var kind = (Tplt.hasOwnProperty('meta')) ? 'meta-trait' : 'template';
        for( var t=0; t<Tplt.traits.length; t++ ) {
            var Trait = cloneTraitFromGenericObject(Tplt.traits[t]);  // console.log(Trait.name+" trait");
            var tcost = Trait.finalCost();
            if( Trait.inTemplate ) {
                metatraits.push(Trait);
            }
            else if( tcost>0 ) {
                if( Trait.name.match(/^Increased/) ) {
                    if( Trait.name.match(/Strength|Dexterity|Intelligence|Health$/) ) attmods.push(Trait);
                    else secmods.push(Trait);
                }
                else if( Trait.name.match(/^Racial.*Modifier/) ) attmods.push(Trait);
                else ads.push(Trait);
            }
            else if( tcost==0 ) features.push(Trait);
            else if( tcost==-1 && Trait.cost==-1 ) quirks.push(Trait);
            else {    // these traits have costs <= -2
                if( Trait.name.match(/^Decreased/) ) {
                    if( Trait.name.match(/Strength|Dexterity|Intelligence|Health$/) ) attmods.push(Trait);
                    else secmods.push(Trait);
                }
                else disads.push(Trait);
            }
        }

        HTML.push('        <tr class="'+rowclass+'">');
        HTML.push('          <td><span class="name">'+Tplt.name.toTitleCase()+'</span>&emsp;'+kind+'</td>');     // name
        HTML.push('          <td></td>');
        HTML.push('          <td class="refpts"><b>'+Tplt.value+' points</b><br /><i>'+expandMiniref(Tplt.ref)+'</i></td>');     // points
        HTML.push('        </tr>');

        if( attmods.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl">Attribute Modifiers:</th>');
            var attmodstext = [];
            for( var a=0; a<attmods.length; a++ ) {
                var attModObj = cloneTraitFromGenericObject(attmods[a]);
                attmodstext.push(attModObj.print()+' ['+attModObj.finalCost()+']');
            }
            HTML.push('          <td colspan="3">'+attmodstext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        if( secmods.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl glob">Secondary Characteristic Modifiers:</th>');
            var secmodstext = [];
            for( var a=0; a<secmods.length; a++ ) {
                var secModObj = secmods[a];
                secmodstext.push(cloneTraitFromGenericObject(secModObj).print()+' ['+secModObj.finalCost()+']');
            }
            HTML.push('          <td colspan="3">'+secmodstext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        if( ads.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl">Advantages:</th>');
            var adstext = [];
            for( var a=0; a<ads.length; a++ ) {
                var AdObj = cloneTraitFromGenericObject(ads[a]);
                if(AdObj.key.match(/bonus/)) break;   // This 'fake' Trait is never printed in a Template or Meta-Trait description in a GURPS publication as an *advantage*.  Instead, it is shown under a "Racial Skill Modifiers" heading.
                adstext.push('<span class="glob">'+AdObj.print()+' ['+AdObj.finalCost()+']</span>');
            }
            HTML.push('          <td colspan="3">'+adstext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        if( disads.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl">Disadvantages:</th>');
            var disadstext = [];
            for( var a=0; a<disads.length; a++ ) {
                var DisadObj = cloneTraitFromGenericObject(disads[a]);
                disadstext.push('<span class="glob">'+DisadObj.print()+' ['+DisadObj.finalCost()+']</span>');
            }
            HTML.push('          <td colspan="3">'+disadstext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        if( quirks.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl">Quirks:</th>');
            var quirkstext = [];
            for( var a=0; a<quirks.length; a++ ) {
                var quirkObj = quirks[a];
                quirkstext.push(cloneTraitFromGenericObject(quirkObj).print()+' ['+quirkObj.finalCost()+']');
            }
            HTML.push('          <td colspan="3">'+quirkstext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        if( features.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl">Features:</th>');
            var featurestext = [];
            for( var a=0; a<features.length; a++ ) {
                var featureObj = features[a];
                featurestext.push(cloneTraitFromGenericObject(featureObj).print());
            }
            HTML.push('          <td colspan="3">'+featurestext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        if( metatraits.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl">Meta-Traits:</th>');
            var metatraitsHash = {};
            for( var mt=0; mt<metatraits.length; mt++ ) {
                var MetaTraitObj = metatraits[mt];
                if( MetaTraitObj.hasOwnProperty('templateTrait') ) {
                    if( !metatraitsHash[MetaTraitObj.key] ) metatraitsHash[MetaTraitObj.key] = { metatrait: MetaTraitObj, subtraitnames: [] };
                }
                else {
                    // var subtraitObj = {name: MetaTraitObj.name,cost:MetaTraitObj.cost};
                    // if( metatraitsHash[MetaTraitObj.inTemplate] ) metatraitsHash[MetaTraitObj.inTemplate].push(subtraitObj);
                    // else metatraitsHash[MetaTraitObj.inTemplate] = [subtraitObj];
                    var subtraitname = MetaTraitObj.name;
                    if( metatraitsHash[MetaTraitObj.inTemplate] ) metatraitsHash[MetaTraitObj.inTemplate].subtraitnames.push(subtraitname);
                    else metatraitsHash[MetaTraitObj.inTemplate] = { metatrait: MetaTraitObj, subtraitnames: [subtraitname] };
                }
            }
            var metatraitstext = [];
            for( let mtKey in metatraitsHash ) {
                metatraitstext.push( metatraitsHash[mtKey].metatrait.name+' ['+metatraitsHash[mtKey].metatrait.cost+'] ('+metatraitsHash[mtKey].subtraitnames.join(', ')+')' );
            }
            HTML.push('          <td colspan="3">'+metatraitstext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        if( Tplt.adjustments && Tplt.adjustments.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl">Racial Skill Modifiers:</th>');
            var adjustmentstext = [];
            var modsHash = {};
            for( var aj=0; aj<Tplt.adjustments.length; aj++ ) {
                var adjustmentObj = Tplt.adjustments[aj];
                var fromTraitKey = adjustmentObj.from;
                var FromTrait;
                var fromtraitpoints;
                for( let ti=0; ti<Tplt.traits.length; ti++ ) {
                    var Trait = Tplt.traits[ti];
                    if( Trait.key==fromTraitKey ) {
                        FromTrait = Trait;
                        fromtraitpoints = ( FromTrait.levels ) ? FromTrait.levels*FromTrait.cost : FromTrait.cost;
                        var modAmount = ( FromTrait.levels ) ? FromTrait.levels*adjustmentObj.amount : adjustmentObj.amount;
                        if( !modsHash[fromTraitKey] ) modsHash[fromTraitKey] = { modstring: [], amount: fromtraitpoints };
                        modsHash[fromTraitKey].modstring.push( signed(modAmount)+' to '+adjustmentObj.target );
                        break;
                    }
                }
            }
            for( var key in modsHash ) {
                adjustmentstext.push(modsHash[key].modstring.join(', ')+' ['+modsHash[key].amount+']');
            }
            HTML.push('          <td colspan="3">'+adjustmentstext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        if( Tplt.skills && Tplt.skills.length ) {
            HTML.push('        <tr class="'+rowclass+'">');
            HTML.push('          <th class="ftrLbl">Skills/Spells:</th>');
            var skillstext = [];
            for( var a=0; a<Tplt.skills.length; a++ ) {
                var skillObj = cloneSkill(Tplt.skills[a],false );
                var relLvl = skillObj.relLevelNaive(skillObj.points);
                var relLvlTxt = (relLvl==0) ? '' : signed(relLvl);
                skillstext.push( skillObj.print()+' ('+skillObj.diff()+') '+skillObj.attribute+relLvlTxt+' ['+skillObj.points+']' );
            }
            HTML.push('          <td colspan="3">'+skillstext.join('; ')+'</td>');
            HTML.push('        </tr>');
        }

        HTML.push('        </tr>');
        rowclass = (rowclass) ? '' : 'zrow';
    }
    HTML.push('      </tbody>');
    HTML.push('    </table>');

    return HTML.join("\n");
}
function sortTable( table, n ) {
      document.querySelectorAll("#spinner")[0].style.display = "block";   // WHY DOES THIS WORK WHEN getElementById() DOESN'T?!!?
      //console.log('spinner on');
      setTimeout( function(){ sorter( table, n ); }, 100 );
      //console.log('spinner off');
    }
function sorter( table, n ) {
      var rows, switching, i, j, x, xtd, xval, y, ytd, yval, switchUp, switchDown, dir, switchcount = 0;
      console.log("[sortTable] sorting column "+table.rows[0].getElementsByTagName("TH")[n].innerText);

      switching = true;
      // Set the sorting direction to ascending:
      dir = "asc";
      /* Make a loop that will continue until no switching has been done: */
      while( switching ) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        console.log(rows);
        /* Loop through all table rows (except the first, which contains table headers): */
        // scan down, bubble up
        for( i = 1; i < (rows.length - 1); i++ ) {
          // Start by saying there should be no switching:
          switchUp = false;
          /* Get the two elements you want to compare, one from current row and one from the next: */
          xtd = rows[i].getElementsByTagName("TD")[n];
          ytd = rows[i + 1].getElementsByTagName("TD")[n];
          x = (xtd.hasAttribute('value')) ? xtd.getAttribute('value') : xtd.innerHTML;
          y = (ytd.hasAttribute('value')) ? ytd.getAttribute('value') : ytd.innerHTML;
          console.log("[sorter] ascending: x='"+x+"' is in row "+i+", and y='"+y+"' is in row "+(i+1))
          xval = (isNaN(x) || !x) ? x.toLowerCase() : parseFloat(x);
          yval = (isNaN(y) || !y) ? y.toLowerCase() : parseFloat(y);
          /* Check if the two rows should switch place, based on the direction, asc or desc: */
          if( dir == "asc" ) {
            if( xval > yval ) {
              // If so, mark as a switch and break the loop:
              //console.log("[sortTable] "+rows[i].getElementsByTagName("TD")[0].innerHTML+": "+xval+" > "+yval+"; switch rows")
              switchUp = true;
              break;
            }
          } else if( dir == "desc" ) {
            if( xval < yval ) {
              // If so, mark as a switch and break the loop:
              switchUp = true;
              break;
            }
          }
        }
        if( switchUp ) {
          /* If an up switch has been marked, make the switch and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount ++;
        }
        // reverse bubble
        for( i = (rows.length - 2); i > 1; i-- ) {
          // Start by saying there should be no switching:
          switchDown = false;
          /* Get the two elements you want to compare, one from current row and one from the next: */
          xtd = rows[i].getElementsByTagName("TD")[n];
          ytd = rows[i - 1].getElementsByTagName("TD")[n];
          x = (xtd.hasAttribute('value')) ? xtd.getAttribute('value') : xtd.innerHTML;
          y = (ytd.hasAttribute('value')) ? ytd.getAttribute('value') : ytd.innerHTML;
          console.log("[sorter] descending: x='"+x+"' is in row "+i+", and y='"+y+"' is in row "+(i-1))
          xval = (isNaN(x) || !x) ? x.toLowerCase() : parseFloat(x);
          yval = (isNaN(y) || !y) ? y.toLowerCase() : parseFloat(y);
          /* Check if the two rows should switch place, based on the direction, asc or desc: */
          // isNaN comparisons sort non-numerics to low end of columns that are mostly numeric
          if( dir == "asc" ) {
            if( isNaN(xval) && !isNaN(yval) || xval < yval ) {
              // If so, mark as a switch and break the loop:
              //console.log("[sortTable] "+rows[i].getElementsByTagName("TD")[0].innerHTML+": "+xval+" > "+yval+"; switch rows")
              switchDown = true;
              break;
            }
          } else if( dir == "desc" ) {
            if( !isNaN(xval) && isNaN(yval) || xval > yval ) {
              // If so, mark as a switch and break the loop:
              switchDown = true;
              break;
            }
          }
        }
        if( switchDown ) {
          /* If a down switch has been marked, make the switch and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i - 1], rows[i + 2]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount ++;
        }

        if( !switchUp && !switchDown ) {
          /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
          if( switchcount == 0 && dir == "asc" ) {
            dir = "desc";
            switching = true;
          }
        }

      }
      // re-stripe
      var cls = '', zcounter = 0;
      for( j=1; j<rows.length; j++ ) {
        // if( zcounter>1 ) { cls = (cls=='zrow') ? '' : 'zrow'; zcounter = 0; }    // paired-row striping
        cls = (cls) ? '' : 'zrow';    // single-row striping
        cls += ( rows[j].className.match(/shield/) ) ? ' shield' : '';
        rows[j].className = cls;
        zcounter++;
      }
    document.getElementById("spinner").style.display = "none";
    }

/* library import functions */

var libObjectsHash = {
    Traits : { type: 'data' },
    Skills : { type: 'data' },
    Spells : { type: 'data' },
    BasicEquipment : { type: 'data' },
    Weapons : { type: 'data' },
    ShieldItems : { type: 'data' },
    ArmorItems : { type: 'data' },
    Templates : { type: 'data collection' },
    Modifiers : { type: 'data extension' },
    Groups : { type: 'data collection' },
    Adjustments : { type: 'linkage' },
    Defaults : { type: 'linkage' },
    Prerequisites : { type: 'linkage' }
}
var NewTraits = {};
var NewSkills = {};
var NewSpells = {};
var NewEquipment = {};
var NewDefaults = {};
var NewPrerequisites = {};
var NewAdjustments = {};
var NewTemplates = {};
var newLibObjects = [
    'NewTraits',
    'NewSkills',
    'NewSpells',
    'NewEquipment',
    'NewTemplates',
    'NewModifiers',
    'NewAdjustments',
    'NewDefaults',
    'NewPrerequisites'
]

function importLibraryDialog() {
    setupDialog('importLibraryDialog');
    $('#rulesetLibraryName').html(libraryList[0]);
    $('#loadedLibrariesList').html('');
    var llArray = ['<li>none</li>'];
    // console.log(libraryList);
    // console.log(libraryList.length);
    if( libraryList.length>1 ) {
        llArray = [];
        for( var ll=1; ll<libraryList.length; ll++ ) {
            // console.log(ll+'=='+libraryList.length);
            var cls = (ll==libraryList.length-1) ? 'class="newLib"' : '';
            llArray.push('<li '+cls+'>'+libraryList[ll]+'</li>');
        }
    }
    $('#loadedLibrariesList').append(llArray.join(''));
    if( document.getElementById('importedLibraryNoticeContainer') )
        window.setTimeout( $('#importedLibraryNoticeContainer').hide(), 5000 );
    return false;
}

// used when loading main libraries
function loadLibrary( lib, local, analyze, ch ) {
    if( lib.match(/[\/\\]/) ) {
        var tokens = lib.split(/[\/\\]/);
        lib = tokens.pop();
    }
    // console.log("[loadLibrary] called: ("+lib+', '+analyze+', '+ch+')');
	  libURL = (local) ? "libraries/"+lib : "http://cox-thurmond.net/jim/jcsp/libraries/"+lib;
  //  clearNewLibraryObjects();
    // console.log("[loadLibrary] $.get-ting "+libURL);
    // put spinner in dbox form container
    $.get(
        libURL,
        function( data, textStatus, jqxhr ) {
            // console.log(lib+' load report:');
            // console.log( data ); // Data returned
          // check whether this really is a library (how?)
            // console.log( "[loadLibrary $.getScript] $.getScript reports "+textStatus ); // Success
            // console.log( jqxhr.status ); // 200, we hope
            // console.log( "[loadLibrary $.getScript] Load was performed." );
        },
        'script'
    )
    .done(
        function( script, textStatus ) {
            // console.log("[loadLibrary] starting $.done function (loadCharacter and show libraries); analyze is "+analyze);
            // console.log("[loadLibrary.done] NewTemplates before processing:");
            // console.log(NewTemplates);
            // read and integrate the New[Object] library object variables
            // this will now be directed by the supplemental library, when it calls functions makeNew*()
            // note that processNewLibraryItems() only processes NEW things, in a supplemental library - has no operation in a base library
            if( analyze ) { processNewLibraryItems(), analyzeLibrary(  ); }    // analyzeLibrary() is in librarycleanup.html
            else {
                // console.log("[loadLibrary $.done] checking for ID to create menubar list: "+( document.getElementById('loadedLibrariesFlyout') ) );
                waitFor_loadedLibrariesFlyout();
                if( !ch ) {
                    importLibrarySettings(lib);
                    ch = document.loadedCharacter;
                }
                loadCharacter(ch);
            }
            // console.log( "$.done reports "+textStatus );
        }
    )
    .fail(
        function( jqxhr, settings, exception ) {
            // console.log("load failed: "+exception);
            // replace spinner
        }
    );
}
function waitFor_loadedLibrariesFlyout() {
//     if( !$('#loadedLibrariesFlyout') ) {
    if( !document.getElementById('loadedLibrariesFlyout') ) {
        window.requestAnimationFrame(waitFor_loadedLibrariesFlyout);
    }
    // console.log("[waitFor_loadedLibrariesFlyout] creating menubar list: "+libraryList);
    // console.log("     because loadedLibrariesFlyout now exists, right? "+document.getElementById('loadedLibrariesFlyout'));
    populateLoadedLibrariesList();
}
function populateLoadedLibrariesList() {
    // var ULwidth = ( libraryList[0].match(/compendi/i) ) ? '225px;' : '160px;';
    var ULwidth = '160px;';
    for( var l=0; l<libraryList.length; l++ ) { if(libraryList[l].match(/compendi/i)) ULwidth = '225px;' }
    var builtHTML = "<a class=\"flywide\">Loaded Libraries</a>\n"
        + "            <ul class=\"wider\" style=\"width:"+ULwidth+"\">\n"
        + "                <li style=\"width:"+ULwidth+"\"><a>" + libraryList.join("</a></li>\n                <li><a>") + "</a></li>\n"
      //  + "                <li style=\"width:"+ULwidth+"\">" + libraryList.join("</li>\n                <li>") + "</li>\n"
        + "            </ul>\n        ";
    if( !document.getElementById('loadedLibrariesFlyout') ) console.log('flyout not yet available in DOM');
    $('#loadedLibrariesFlyout').html(builtHTML);
}

function clearLibraryObjects() {
//     for( var libObjName in libObjectsHash ) {
//         try{
//             var libObject = eval(libObjName);
//             console.log("clearing "+libObjName);
//             libObject = {};
//         }
//         catch(err) {
//             console.log("did not eval "+libObjName);
//         }
//     }
}
function clearNewLibraryObjects() {
    for( var n=0; n<newLibObjects.length; n++ ) {
        try{
            var libObject = eval(newLibObjects[n]);
            // console.log("[clearNewLibraryObjects] clearing "+newLibObjects[n]);
            libObject = {};
            // console.log(libObject);
        }
        catch(err) {
            console.log("[clearNewLibraryObjects] did not eval "+newLibObjects[n]+"\n\t"+err);
        }
    }
}

function importLibrarySettings(lib) {

    var libraryObjectNames = ['traits','skills','spells','equipment','prerequisites','defaults','adjustments','templates'];
    clearNewLibraryObjects();

    $('#importLibrarySettingsDialog').remove();
    var NewItemsSettingsDboxHTML=[];
//     NewItemsSettingsDboxHTML.push('<div id="importLibrarySettingsDialog" class="dialog">');
    NewItemsSettingsDboxHTML.push('  <style>#importLibrarySettingsForm td {text-align:center}</style>');
    NewItemsSettingsDboxHTML.push('  <form id="importLibrarySettingsForm">');
//     NewItemsSettingsDboxHTML.push('    <div class="titlebar">Library Import Settings</div>');
    NewItemsSettingsDboxHTML.push('    <div class="dialogBody" style="margin-top:1em;">');
    NewItemsSettingsDboxHTML.push('      <table style="width:auto; margin-left:auto; margin-right:auto;">');
    NewItemsSettingsDboxHTML.push('        <colgroup><col /><col style="width:8em" /><col style="width:7em" /><col style="width:7em" /><col style="width:3em" /><col style="width:3em" /><col style="width:3em" /></colgroup>');
    NewItemsSettingsDboxHTML.push('        <tbody>');
    NewItemsSettingsDboxHTML.push('          <tr style="line-height:10px;"><th rowspan="2" colspan="2" style="text-align:left;">Item Type</th><th>number in</th><th>proposed</th> <th colspan="3" title="Click column heading to check that option for all library item types.">replace items?</th>                                                                                                                </tr>');
    NewItemsSettingsDboxHTML.push('          <tr style="line-height:14px;">                                                                   <th> library </th><th>revisions</th><th title="Always overwrite items with revisions from this supplemental library">yes</th><th title="Never overwrite anything; add only distinct items">no</th><th title="Ask whether to overwrite for each revised item\n(may be tedious...)">ask</th></tr>');
    // show stats for supplemental library import
    for( var n=0; n<libraryObjectNames.length; n++ ) {
        var name = libraryObjectNames[n];
       // if( name.match(/equip/i) ) continue;    // skip the 'equipment' part of this for now; fix once those library objects are merged
        var nameUC = name.charAt(0).toUpperCase()+name.slice(1);
        var LibItems = eval( nameUC );
        // console.log('[importLibrarySettings] eval(New'+nameUC+')');
        var NewItems = eval( 'New'+nameUC );
        var NewItemKeys = Object.keys(NewItems);
        var listLength = NewItemKeys.length;
        // console.log("\t"+listLength+' new '+nameUC+' found')
        var dups = 0;
        for( var i=0; i<listLength; i++ ) {
            if( LibItems[NewItemKeys[i]] ) dups++;
        }
        if( listLength>0 )
            NewItemsSettingsDboxHTML.push('          <tr><td>new&nbsp;</td><td style="text-align:left">'+name+'</td><td>'+listLength+'</td><td>'+dups+'</td><td><input type="radio" name="overwrite_'+name+'" value="true" checked="checked" /></td><td><input type="radio" name="overwrite_'+name+'" value="false" /></td><td><input type="radio" name="overwrite_'+name+'" value="ask" /></td></tr>');
    }
    NewItemsSettingsDboxHTML.push('        </tbody>');
    NewItemsSettingsDboxHTML.push('      </table>');
    NewItemsSettingsDboxHTML.push('    </div>');
//     NewItemsSettingsDboxHTML.push('    <input type="submit" value="Close"  style="float: left; width:auto; margin:1em;" onClick="document.getElementById(\'importLibrarySettingsDialog\').style.display=\'none\'; return false;" />');
    NewItemsSettingsDboxHTML.push('    <input type="button" value="Import '+lib+'" style="float:right; width:auto; margin:1em;" onClick="processNewLibraryItems(); return false;" />');
    NewItemsSettingsDboxHTML.push('  </form>');
    NewItemsSettingsDboxHTML.push('  <div style="clear:both;"></div>');
//     NewItemsSettingsDboxHTML.push('</div>');
//     var dbox = NewItemsSettingsDboxHTML.join("      \n");
//     $('#csheet_dialogs').prepend(dbox);
//     $('#importLibrarySettingsDialog').css('max-width','auto');
//     setupDialog('importLibrarySettingsDialog');

    $('#importLibrarySettingsFormContainer').html( NewItemsSettingsDboxHTML.join("      \n") );
    $('#importLibrarySettingsFormContainer').show();
    // console.log(NewTemplates);

    return;
}

function processNewLibraryItems() {
//     if( document.getElementById('importLibrarySettingsDialog') )
//         document.getElementById('importLibrarySettingsDialog').style.display = 'none';

    if( typeof newLibrary != 'undefined' ) libraryList.push( newLibrary );
    // if( newLibrary ) libraryList.push( newLibrary );

    if( document.getElementById('importLibrarySettingsFormContainer') )
        $('#importLibrarySettingsFormContainer').hide();

    var form = document.getElementById("importLibrarySettingsForm");
    var overwrite = "false";
    if( form && form.overwrite_traits ) {
        overwrite = form.overwrite_traits.value;
    }
    processNewTraits( overwrite.match(/true/i), overwrite.match(/ask/i) );
    if( form && form.overwrite_skills ) {
        overwrite = form.overwrite_skills.value;
    }
    processNewSkills( overwrite.match(/true/i), overwrite.match(/ask/i) );
    if( form && form.overwrite_spells ) {
        overwrite = form.overwrite_spells.value;
    }
    processNewSpells( overwrite.match(/true/i), overwrite.match(/ask/i) );
    if( form && form.overwrite_equipment ) {
        overwrite = form.overwrite_equipment.value;
    }
    processNewEquipment( overwrite.match(/true/i), overwrite.match(/ask/i) );
    if( form && form.overwrite_defaults ) {
        overwrite = form.overwrite_defaults.value;
    }
    processNewDefaults( overwrite.match(/true/i), overwrite.match(/ask/i) );
    if( form && form.overwrite_prerequisites ) {
        overwrite = form.overwrite_prerequisites.value;
    }
    processNewPrerequisites( overwrite.match(/true/i), overwrite.match(/ask/i) );
    if( form && form.overwrite_adjustments ) {
        overwrite = form.overwrite_adjustments.value;
    }
    processNewAdjustments( overwrite.match(/true/i), overwrite.match(/ask/i) );
    if( form && form.overwrite_templates ) {
        overwrite = form.overwrite_templates.value;
    }
    processNewTemplates( overwrite.match(/true/i), overwrite.match(/ask/i) );

    if( document.getElementById('importedLibraryNoticeContainer') )
        $('#importedLibraryNoticeContainer').show();

    if( document.getElementById("importLibraryDialog") ) importLibraryDialog();

    if( document.loadedCharacter )
        loadCharacter(document.loadedCharacter);
}

function processNewTraits( overwrite, vetting ) {
    for ( let t in NewTraits ) {
        NewTraits[t].key = t;        // also add the label as the 'key' attribute
        if( Traits.hasOwnProperty(t) ) {
            if( overwrite ) {
                var confirmed = ( vetting )
                              ? confirm("Do you wish to replace\n\n"+JSONstring.make(Traits[t])+"\n\nwith\n\n"+JSONstring.make(NewTraits[t])+"?")
                              : true;
                if( confirmed ) Traits[t] = NewTraits[t];
            }
        }
        else {
            Traits[t] = NewTraits[t];
        }
    }
}

function processNewSkills( overwrite, vetting ) {
    var NewSkillsGroup = [];
    for ( var s in NewSkills ) {
      //  console.log("[processNewSkills] processing NewSkill["+s+"]");
        NewSkills[s].key = s;        // also add the label as the 'key' attribute
        NewSkillsGroup.push(s);      // also build the 'NewSkillsGroup' group, consisting of every sskll above
        // vet any new Skill items that would overwrite an existing item
       // console.log("[processNewSkills] integrating NewSkills["+s+"]:\n"+JSONstring.make(NewSkills[s]));
        if( Skills.hasOwnProperty(s) ) {
            if( overwrite ) {
                var confirmed = ( vetting )
                              ? confirm("Do you wish to replace\n\n"+JSONstring.make(Skills[s])+"\n\nwith\n\n"+JSONstring.make(NewSkills[s])+"?")
                              : true;
                if( confirmed ) Skills[s] = NewSkills[s];
            }
        }
        else {
            Skills[s] = NewSkills[s];
        }
    }
    addToGroup("Skills",NewSkillsGroup);
    //console.log("[processNewSkills] Skills group after processing:");
    // console.log( Groups.Skills.sort() );
}

function makeNewSpells() {

    var NewSpellsSettingsDboxHTML=['<div id="makeNewSpellSettingsDialog" class="dialog">'];
    NewSpellsSettingsDboxHTML.push('  <form name="makeNewSpellSettingsForm">');
    NewSpellsSettingsDboxHTML.push('    <div class="titlebar">New Spell Import Settings</div>');
    NewSpellsSettingsDboxHTML.push('    <div class="dialogBody" style="margin-top:1em;">');
    NewSpellsSettingsDboxHTML.push('      <p>');
    NewSpellsSettingsDboxHTML.push('        Some spells in this library may be changes or updates to spells already present in the main rules library.');
    NewSpellsSettingsDboxHTML.push('        When this happens:');
    NewSpellsSettingsDboxHTML.push('      </p>');
    NewSpellsSettingsDboxHTML.push('      <br />');
    NewSpellsSettingsDboxHTML.push('      <input type="button" value="Overwrite all with spells from this supplemental library" style="" onClick="processNewSpells(true,false)" />');
    NewSpellsSettingsDboxHTML.push('      <br /><br />');
    NewSpellsSettingsDboxHTML.push('      <input type="button" value="Ask whether to overwrite for each conflicting spell" style="" onClick="processNewSpells(true,true)" />');
    NewSpellsSettingsDboxHTML.push('      <br /><br />');
    NewSpellsSettingsDboxHTML.push('      <input type="button" value="Never overwrite anything; add only non-conflicting spells" style="" onClick="processNewSpells(false,false)" />');
    NewSpellsSettingsDboxHTML.push('    </div>');
    NewSpellsSettingsDboxHTML.push('    <input type="submit" value="Close" style="float:  left; width: auto; margin: 1em;" onClick="document.getElementById(\'makeNewSpellSettingsDialog\').style.display=\'none\'; return false;" />');
    NewSpellsSettingsDboxHTML.push('  </form>');
    NewSpellsSettingsDboxHTML.push('</div>');
    var dbox = NewSpellsSettingsDboxHTML.join("      \n");
    $('body').append(dbox);

    setupDialog('makeNewSpellSettingsDialog');

    return;

}

function processNewSpells( overwrite, vetting ) {
    // var NewSpellsGroup = [];
    //console.log("[processNewSpells] about to process NewSpells object (length "+Object.keys(NewSpells).length+")");
    //console.log("[processNewSpells] 'Groups.Spells' has length "+Groups.Spells.length);
    for ( var s in NewSpells ) {
        //console.log("[processNewSpells] processing NewSpell["+s+"]");
        if( NewSpells.hasOwnProperty(s) ) {
            NewSpells[s].key = s;        // also add the label as the 'key' attribute
            // NewSpellsGroup.push(s);      // also build the 'NewSpellsGroup' group, consisting of every spell above
            NewSpells[s].spellify();
            // vet any new Spell items that would overwrite an existing item
            //console.log("[processNewSpells] integrating NewSpells["+s+"]:");
            //console.log(NewSpells[s]);
            if( Spells.hasOwnProperty(s) ) {
                if( overwrite ) {
                    var confirmed = ( vetting )
                                  ? confirm("Do you wish to replace\n\n"+JSONstring.make(Spells[s])+"\n\nwith\n\n"+JSONstring.make(NewSpells[s])+"?")
                                  : true;
                    if( confirmed ) Spells[s] = NewSpells[s];
                }
                //else console.log("[processNewSpells] skipped adding "+NewSpells[s].name+"\n  (NewSpells["+s+"]) to 'Spells' object");
            }
            else {
                //console.log("[processNewSpells] adding "+NewSpells[s].name+"\n  (NewSpells["+s+"]) to 'Spells' object");
                Spells[s] = NewSpells[s];
            }
        }
        //console.log("[processNewSpells] after processing NewSpell["+s+"],\n 'Groups.Spells' has length "+Groups.Spells.length);
    }
    //console.log("[processNewSpells] about to addToGroup('Spells',NewSpellGroup); NewSpellGroup looks like");
    //console.log(NewSpellsGroup);
    //console.log("[processNewSpells] before addToGroup, 'Groups.Spells' has length "+Groups.Spells.length);
    // this call to addToGroup probably isn't needed, because of the above call to spellify, which also tries to add to the Spells group
    // so I may not need the NewSpellsGroup at all.
    // addToGroup("Spells",NewSpellsGroup);
    //console.log("[processNewSpells] after addToGroup, 'Groups.Spells' has length "+Groups.Spells.length);
    // console.log("[processNewSpells] Spells group after processing:\n"+Groups.Spells.sort());
    //console.log("[processNewSpells] Spells group after processing:");
    //console.log( Groups.Spells.sort() );
}

function processNewEquipment( overwrite, vetting ) {
    for ( var e in NewEquipment ) {  // console.log("[makeNewEquipment] adding "+e);
        var NewItem = NewEquipment[e];
        // case out equipment types
        if( NewItem.hasOwnProperty('wieldOptions') ) {
            if( Weapons.hasOwnProperty(e) ) {
                if( overwrite ) {
                    var confirmed = ( vetting )
                                  ? confirm("Do you wish to replace\n\n"+JSONstring.make(Weapons[e])+"\n\nwith\n\n"+JSONstring.make(NewItem)+"?")
                                  : true;
                    if( confirmed ) Weapons[e] = NewItem;
                }
            }
            else {
                Weapons[e] = NewItem;
            }
        }
        else if( NewItem.hasOwnProperty('location') ) {
            if( ArmorItems.hasOwnProperty(e) ) {
                if( overwrite ) {
                    var confirmed = ( vetting )
                                  ? confirm("Do you wish to replace\n\n"+JSONstring.make(ArmorItems[e])+"\n\nwith\n\n"+JSONstring.make(NewItem)+"?")
                                  : true;
                    if( confirmed ) ArmorItems[e] = NewItem;
                }
            }
            else {
                ArmorItems[e] = NewItem;
            }
        }
        else if( NewItem.hasOwnProperty('PDB') ) {
            if( ShieldItems.hasOwnProperty(e) ) {
                if( overwrite ) {
                    var confirmed = ( vetting )
                                  ? confirm("Do you wish to replace\n\n"+JSONstring.make(ShieldItems[e])+"\n\nwith\n\n"+JSONstring.make(NewItem)+"?")
                                  : true;
                    if( confirmed ) ShieldItems[e] = NewItem;
                }
            }
            else {
                ShieldItems[e] = NewItem;
            }
        }
        else {
            if( BasicEquipment.hasOwnProperty(e) ) {
                if( overwrite ) {
                    var confirmed = ( vetting )
                                  ? confirm("Do you wish to replace\n\n"+JSONstring.make(BasicEquipment[e])+"\n\nwith\n\n"+JSONstring.make(NewItem)+"?")
                                  : true;
                    if( confirmed ) BasicEquipment[e] = NewItem;
                }
            }
            else {
                BasicEquipment[e] = NewItem;
            }
        }
        // take out 'else's if Equipment gets flattened, so that items can go into more than one type

    }
}

function processNewDefaults( overwrite, vetting ) {
    for ( let d in NewDefaults ) {
        NewDefaults[d].key = d;        // also add the label as the 'key' attribute
        if( Defaults.hasOwnProperty(d) ) {
            if( overwrite ) {
                var confirmed = ( vetting )
                              ? confirm("Do you wish to replace\n\n"+JSONstring.make(Defaults[d])+"\n\nwith\n\n"+JSONstring.make(NewDefaults[d])+"?")
                              : true;
                if( confirmed ) Defaults[d] = NewDefaults[d];
            }
        }
        else {
            Defaults[d] = NewDefaults[d];
        }
    }
}

function processNewPrerequisites( overwrite, vetting ) {
    for ( let p in NewPrerequisites ) {
        NewPrerequisites[p].key = p;        // also add the label as the 'key' attribute
        if( Prerequisites.hasOwnProperty(p) ) {
            if( overwrite ) {
                var confirmed = ( vetting )
                              ? confirm("Do you wish to replace\n\n"+JSONstring.make(Prerequisites[p])+"\n\nwith\n\n"+JSONstring.make(NewPrerequisites[p])+"?")
                              : true;
                if( confirmed ) Prerequisites[p] = NewPrerequisites[p];
            }
        }
        else {
            Prerequisites[p] = NewPrerequisites[p];
        }
    }
}

function processNewAdjustments( overwrite, vetting ) {
    for ( let a in NewAdjustments ) {
        NewAdjustments[a].key = a;        // also add the label as the 'key' attribute
        if( Adjustments.hasOwnProperty(a) ) {
            if( overwrite ) {
                var confirmed = ( vetting )
                              ? confirm("Do you wish to replace\n\n"+JSONstring.make(Adjustments[a])+"\n\nwith\n\n"+JSONstring.make(NewAdjustments[a])+"?")
                              : true;
                if( confirmed ) Adjustments[a] = NewAdjustments[a];
            }
        }
        else {
            Adjustments[a] = NewAdjustments[a];
        }
    }
}

function processNewTemplates( overwrite, vetting ) {
    // console.log("[processNewTemplates] NewTemplates before processing:");
    // console.log(NewTemplates);
    for ( var t in NewTemplates ) {
       // console.log(NewTemplates[t]);
        // vet any new Template item that would overwrite an existing item
//         if( Templates.hasOwnProperty(t) && confirm("Do you want to replace \n"+JSONstring.make(Templates[t])+"with \n"+JSONstring.make(NewTemplates[t])+"?") )
//             Templates[t] = NewTemplates[p];
//         else
            // Need to process meta-traits *before* these get attached to the Templates object
            // by promoting the included traits up to the level of the Template.traits array.
            var TemplateObj = NewTemplates[t];
            if( TemplateObj.metatraits && TemplateObj.metatraits.length ) {
                for( var mt=0; mt<TemplateObj.metatraits.length; mt++ ) {
                    var MetaTrait = TemplateObj.metatraits[mt];
                    // console.log(MetaTrait);
                    let mtType = (MetaTrait.value<0) ? 'D' : 'A';
                    var metatraitTrait = new Trait( MetaTrait.name, mtType, 'P', MetaTrait.value, false, MetaTrait.ref );
                    metatraitTrait.templateTrait = true;
                    metatraitTrait.inTemplate = TemplateObj.key;
                    metatraitTrait.key = MetaTrait.key;
                    TemplateObj.traits.push( metatraitTrait );
                    for( var st=0; st<MetaTrait.traits.length; st++ ) {
                        var clonedSubTrait = cloneTraitFromGenericObject( MetaTrait.traits[st] );
                        clonedSubTrait.inTemplate = MetaTrait.key;
                        //console.log(clonedSubTrait);
                        TemplateObj.traits.push( clonedSubTrait );
                    }
                }
                delete TemplateObj.metatraits;
            }
            // console.log(TemplateObj);
            Templates[t] = TemplateObj;
    }
    // console.log("[processNewTemplates] Templates after processing:");
    // console.log(Templates);
}

/* The 'add*' functions are called from inside supplemental libraries. */
function addGroups() {    // no references found in any library 2018-08
    // the 'arguments' array contains the list of group names to add
	for( var c=0; c<arguments.length; c++ ) {
		if(!Groups[arguments[c]] ) {
			Groups[arguments[c]] = [];
		}
	}
}

// will add a list of elements to an existing group, or if it doesn't exist, will create and populate the new group.
// appends, but checks for presence of each new element before adding it
function addToGroup( groupKey, AddToGroupList ) {
		ch = document.loadedCharacter;
    //if(AddToGroupList && groupKey=="Spells") console.log("[addToGroup] about to add "+AddToGroupList.length+" to 'Spells' group (length "+Groups.Spells.length+")");
    //if(AddToGroupList && groupKey=="Spells") console.log(AddToGroupList);
    if( !AddToGroupList ) return;
    if( !Groups[groupKey] ) Groups[groupKey] = [];
    for( var c=0; c<AddToGroupList.length; c++ ) {
        if( Groups[groupKey].indexOf(AddToGroupList[c])<0 ) {
            //if( groupKey=="Spells" )
              //console.log("[addToGroup] about to push AddToGroupList["+c+"]="+AddToGroupList[c]+"\n    onto "+groupKey+" group");
            Groups[groupKey].push(AddToGroupList[c]);
        }
    }
    if(ch) ch.attachLinker( AddToGroupList, groupKey );   // for situations where ch might not be defined, e.g., libraryCleanup
   // if( groupKey=='BodyControl' ) alert(Groups[groupKey]);
    //if( groupKey=="Spells" ) console.log("[addToGroup] 'Spells' group now contains "+Groups.Spells.length);
}

function addColleges() {
    // the 'arguments' array contains the list of group names to add
	for( var c=0; c<arguments.length; c++ ) {
		var college = arguments[c];
		if(!Groups[college] ) {
    		Groups[college] = [];
		}
		if( Groups.MagicColleges.indexOf(college)<0 ) {
			Groups.MagicColleges.push(college);
			if( !college.match(/spells$/i) )	// if the college name is not already '*Spells', make that group name a synonym
			//	Groups.MagicColleges[college+'Spells'] = Groups.MagicColleges[college];
				Groups[college+'Spells'] = Groups[college];
		}
	}
}


// http://joncom.be/code/javascript-json-formatter/
function RealTypeOf(v) {
  if (typeof(v) == "object") {
    if (v === null) return "null";
    if (v.constructor == (new Array).constructor) return "array";
    if (v.constructor == (new Date).constructor) return "date";
    if (v.constructor == (new RegExp).constructor) return "regex";
    return "object";
  }
  return typeof(v);
}
function FormatJSON(oData, sIndent) {
 //   if( window.console ) console.log(sIndent+"[FormatJSON]");
    if (arguments.length < 2) {
        var sIndent = "";
    }
    var sIndentStyle = "  ";
    var sDataType = RealTypeOf(oData);

    // open object
    if (sDataType == "array") {
        if (oData.length == 0) {
            return "[]";
        }
        var sHTML = "[";
    } else {
        var iCount = 0;
        $.each(oData, function() {
            iCount++;
            return;
        });
        if (iCount == 0) { // object is empty
            return "{}";
        }
        var sHTML = "{";
    }

    // loop through items
    var iCount = 0;
    $.each(oData, function(sKey, vValue) {
        if (iCount > 0 && typeof(vValue) != "function" && typeof(vValue) != "undefined" ) {
            sHTML += ",";
        }
        if (sDataType == "array") {
            sHTML += ("\n" + sIndent + sIndentStyle);
        } else if ( typeof(vValue) == "function" || typeof(vValue) == "undefined" ) {

        } else {
            sHTML += ("\n" + sIndent + sIndentStyle + "\"" + sKey + "\"" + ": ");
        }

        // display relevant data type
        switch (RealTypeOf(vValue)) {
            case "array":
            case "object":
                sHTML += FormatJSON(vValue, (sIndent + sIndentStyle));
                break;
            case "boolean":
            case "number":
                sHTML += vValue.toString();
                break;
            case "null":
                sHTML += "null";
                break;
            case "string":
                sHTML += ("\"" + vValue.replace(/"/g,'\\"') + "\"");
                break;
            default:
                // sHTML += ("TYPEOF: " + typeof(vValue));
        }

        // loop
        if( typeof(vValue) != "function" && typeof(vValue) != "undefined" ) iCount++;
    });

    // close object
    if (sDataType == "array") {
        sHTML += ("\n" + sIndent + "]");
    } else {
        sHTML += ("\n" + sIndent + "}");
    }

    // return
    return sHTML;
}
