/*
    I know that there are helper functions that smooth out prototype-based inheritance
    like what I'm doing below.  I have chosen not to use them, because this is a small
    implementation, and I don't want to hide any of the inner workings from myself.
    After all, in the end the motivation for this entire project is to learn more about
    javascript, right?
*/
var LegalityClassOptionsList = [];    // because the library file is loaded after this one, so the constructor below was not loading happily
/* 'superclass' Equipment */
function Equipment( name, wt, cost, tl, lc, ref ) {
    this.name      = name;
    this.weight    = ( isNaN(wt) ) ? undefined : wt;
    this.cost      = cost;
    this.TL        = ( isNaN(tl) ) ? undefined : tl;
    this.LC        = 0;
    if( !isNaN(lc) ) { this.LC = lc }
    else {     // then look in rules library file for max LC
        for( var i=0; i<LegalityClassOptionsList.length; i++ ) {
            var LCoption = LegalityClassOptionsList[i];
            if( LCoption.value>this.LC ) this.LC = LCoption.value;
        }
    }
    this.reference = ref;
    this.number  = 0;    // modify for how many of the item are taken
    /* optional members */
    // this.ruleset = new Ruleset(1,1,1,1);
    // this.key
    // this.detail          // an adjective description, usually (like 'large' when the item name is 'knife')  Allows separate treatment of name (for ordering ,etc.) and full descriptive term.
    // this.description     // a longer descriptive phrase, which will appear after 'detail+name' in equipment tables, in parentheses or after a semicolon
    // this.notes           // ARRAY: brief descriptive or rule-oriented text from rulebook; e.g. notes for lockpics say "Basic equipment for Lockpicking skill."  Appears as a popover (title) in Equipment tables, but is not usually printed.
    // this.addedCost       // used in actualCost below
  /* members for items often taken in multiples: */
    // this.continuous      // Boolean ('false' or absent means 'discrete'); controls how multiples are described on sheets (i.e. "oil, 2 pts" vs. "2 arrows")
    // this.unit            // for continuous items:  feet (rope), gallons (liquid), pounds (weight - maybe not needed? but for flour or something?), etc.  Omitted for discrete (default) items.
    // this.instance        // integer/ID for distinguishing multiple identical items
  /* Only used by Random Character generator: */
    // this.many            // For items that are generally taken more than one at a time: arrows, candles, rations, etc.
                            // Should be set to an 'average' number, and random characters will get a Poisson-distributed number of these with lambda = this.many
    // this.goeswith        // Ammo items (so far) - when taken, check this field and unless one of the listed items is already attached, skip.
    // this.maxTL           // If present, indicates highest Tech Level during which this item is in widespread use.  If absent, assume some version of this item exists at any TL after its introduction.
}

function cloneEquipmentFromGenericObject( obj ) {   // name, wt, cost, tl, lc, pdb, dr, pen, hp, skill, ref
    var newItem = {};
    if( obj.wieldOptions )  newItem = new Weapon(    obj.name, 1*obj.weight, 1*obj.cost, 1*obj.TL, 1*obj.LC, 1*obj.bulk,  obj.qualityEffectGroup,       obj.reference );
    else if( obj.location ) newItem = new Armor(     obj.name, 1*obj.weight, 1*obj.cost, 1*obj.TL, 1*obj.LC, 1*obj.DR,  1*obj.PD,  obj.location,        obj.reference );
    else if( obj.PDB )      newItem = new Shield(    obj.name, 1*obj.weight, 1*obj.cost, 1*obj.TL, 1*obj.LC, 1*obj.PDB, 1*obj.DR, 1*obj.penetration, 1*obj.HP, obj.skill,  obj.reference );
    else                    newItem = new Equipment( obj.name, 1*obj.weight, 1*obj.cost, 1*obj.TL, 1*obj.LC,                                            obj.reference );
    // if these are done further down, attributes added before that will be lost

    if( obj.hasOwnProperty("number") )  { newItem.number = 1*obj.number; }

    // optional fields which can apply to all Equipment objects
    if( obj.detail )                    { newItem.detail = obj.detail; }
    if( obj.ruleset )                   { newItem.ruleset = obj.ruleset; }
    if( obj.key )                       { newItem.key = obj.key; }
    if( obj.unit )                      { newItem.unit = obj.unit; }
    if( obj.hasOwnProperty("continuous")){newItem.continuous = obj.continuous; }
    if( obj.hasOwnProperty("addedCost")){ newItem.addedCost = 1*obj.addedCost; }
    if( obj.description )               { newItem.description = obj.description; }
    if( obj.notes )                     { newItem.notes = obj.notes; }
    // used only by random character generation software
    if( obj.hasOwnProperty("many"))     { newItem.many = 1*obj.many; }
    if( obj.maxTL )                     { newItem.maxTL = obj.maxTL; }
    if( obj.goeswith )                  { newItem.goeswith = obj.goeswith; }

    // Armor subclass members
    if( obj.hasOwnProperty("splitPD") ) { newItem.splitPD = 1*obj.splitPD; }
    if( obj.hasOwnProperty("splitDR") ) { newItem.splitDR = 1*obj.splitDR; }
    if( obj.hasOwnProperty("DRvariesByTL")){newItem.DRvariesByTL = obj.DRvariesByTL; }    // did not find in any library 2016-10-26
    if( obj.hasOwnProperty("layerable")){ newItem.layerable = obj.layerable; }
    // multi-class objects may not get all of these in constructor:
    if( obj.key )                       { newItem.key = obj.key; }
    if( obj.PD )                        { newItem.PD = obj.PD; }
    if( obj.location )                  { newItem.location = obj.location; }

    // Shield subclass members
    if( obj.hasOwnProperty("skill") )   { newItem.skill = obj.skill; }
    if( obj.hasOwnProperty("composition") ) { newItem.composition = obj.composition; }
    if( obj.buckler )                   { newItem.buckler = obj.buckler; }
    // multi-class objects may not get all of these in constructor:
    if( obj.hasOwnProperty("PDB") )     { newItem.PDB = obj.PDB; }
    if( obj.hasOwnProperty("DR") )      { newItem.DR = 1*obj.DR; }
    if( obj.hasOwnProperty("HP") )      { newItem.HP = obj.HP; }
    if( obj.hasOwnProperty("skill") )   { newItem.skill = obj.skill; }

    // Weapon subclass members
    if( obj.hasOwnProperty("quality") ) { newItem.quality      = 1*obj.quality; }
    if( obj.weaponST )                  { newItem.weaponST     =   obj.weaponST; }  // no '1*' here because weapons in library objects will have 'true'
    if( obj.wieldOptions )              { newItem.wieldOptions =   obj.wieldOptions; } // as a glob
    if( obj.armorDivisor )              { newItem.armorDivisor = 1*obj.armorDivisor; }
    if( obj.hasOwnProperty("shots") )   { newItem.shots        =   obj.shots; }
    if( obj.hasOwnProperty("bulk") )    { newItem.bulk         =   obj.bulk; }
    // multi-class objects may not get all of these in constructor: 
    if( obj.qualityEffectGroup )        { newItem.qualityEffectGroup = obj.qualityEffectGroup; }

    // note that HandWeapon and RangedWeapon object types are not supported

    return newItem;
}

// Equipment prototype methods
Equipment.prototype.clone = function() {
    return cloneEquipmentFromGenericObject( JSONstring.toObject(JSONstring.make(this)) );
}
Equipment.prototype.print = function() {
    var name   = ( this.hasOwnProperty('name') )   ? this.name   : this[0]+' (collection)';
    var detail = ( this.detail ) ? this.detail+' ' : '';
    var num    = ( this.hasOwnProperty('number') ) ? this.number : 1;
    var units  = ( this.hasOwnProperty('unit') && (num>1 || this.continuous) ) ? ' '+plural(this.unit,this.number) : '';
    var quant  = ( num>1 || units ) ? num+units+' ' : '';
  // weapon quality?

    var maxLength = 20;
    var printName = ( name.length>maxLength ) ? name.substr(0,maxLength) : name;

    var desc   = ( this.hasOwnProperty('composition') ) ? ', '+this.composition : '';   // shields
    desc += ( this.buckler ) ? ' (buckler)' : '';
    desc += ( this.hasOwnProperty('description') ) ? ' ('+this.description+')' : '';

  //  return (units) ? quant + detail + name + desc : quant + plural(name,num) + desc;
    return (units) ? detail+name +', '+ quant + desc : quant + plural(detail+name,num) + desc;
 //   return quant + name;
}
Equipment.prototype.printCompact = function() {
    if( this.qualityEffectGroup ) {   // weapon
        return this.name+' ['+this.printWieldOptions('full')+']';
    }
    else if( this.PDB ) {   // shield
        return this.name+' (defense '+this.PDB+')';
    }
    else if( this.DR ) {    // armor
        var PD = (this.PD) ? ', PD '+this.PD : '';
        return this.name+' (DR '+this.DR+PD+')';
    }
    else {
        return this.print();
    }
}
Equipment.prototype.isWeapon = function() { return this.hasOwnProperty('wieldOptions') }
Equipment.prototype.isArmor  = function() { return this.hasOwnProperty('location') }
Equipment.prototype.isShield = function() { return this.hasOwnProperty('PDB') }
Equipment.prototype.isSameAs = function( that ) {
    if( this.name!=that.name ) return false;
    if( this.weight!=that.weight || this.cost!=that.cost ) return false;
    if( this.TL!=that.TL || this.LC!=that.LC ) return false;
    if( this.hasOwnProperty('detail') && this.detail!=that.detail ) return false;
    if( this.hasOwnProperty('location') && this.location.length!=that.location.length ) {
        if( this.location.length!=that.location.length ) return false;
        else {
            thissorted = this.slice().sort();
            thatsorted = that.slice().sort();
            for( var i=0; i<thissorted.length; i++ ) {
                if( thissorted[i] != thatsorted[i] ) return false;
            }
        }
    }
    if( this.hasOwnProperty('PD')  && this.PD !=that.PD  ) return false;
    if( this.hasOwnProperty('DR')  && this.DR !=that.DR  ) return false;
    if( this.hasOwnProperty('HP')  && this.HP !=that.HP  ) return false;
    if( this.hasOwnProperty('PDB') && this.PDB!=that.PDB ) return false;
    if( this.hasOwnProperty('bulk') && this.bulk!=that.bulk ) return false;
    if( this.hasOwnProperty('quality') && this.quality!=that.quality ) return false;
    if( this.hasOwnProperty('qualityEffectGroup') && this.qualityEffectGroup!=that.qualityEffectGroup ) return false;
    if( this.hasOwnProperty('instance') && this.instance!=that.instance ) return false;
    return true;
}

function actualCost( equipObj ) {
/*  Cost modified by equipment quality and addedCost (but NOT number!)
    The cost attribute of an Equipment object is the 'normal' cost of a typical ('good' quality) item of that sort.
    This method will return an item cost, modified by other attributes of the item,
    such as 'quality,' decoration, material, collectability, etc.
    This implies that quality (etc.) should NOT be used to alter the cost attribute directly,
    when creating an Equipment object.
    NB: Ultra-Tech pg 24 specifies that vibroblade and monowire prices should be applied
        BEFORE price multiplications for weapon quality, not after!
        Not sure how best to deal with this - here, with yet another addedCost-type field,
        or by using multiple entries in the Ultra-Tech library?  Both sound bad!
        Of course one can do this 'by hand' using the Edit Equipment dialog,
        but note that there's no obvious way to add '+1d' a ST-based weapon's damage!
*/
  //  alert(JSONstring.make(equipObj));
    var quality = equipObj.quality;
    var group   = equipObj.qualityEffectGroup;
  //  alert("[actualCost] group: "+group+"\nquality: "+quality);

    var actualCost = equipObj.cost;

    // Weapon objects have quality groups
    if( equipObj.hasOwnProperty('quality') ) {

        // cheap
        if( quality==0 ) {
          //  alert('[actualCost] cheap weapon');
            /*else*/ if( group.match(/edged|blade|pole|cut|mace|cr\/imp/) )
                actualCost *= 0.4;    // this is vague in 3rd edition; says cheap weapons of some types are "rarely made"
            else if( group.match(/gun/) )
                actualCost *= 0.6;    // there is no guidance on cheap firearms for 4th edition
            else /*if( group.match(/bow/) )*/
                actualCost *= ( document.loadedCharacter.gameInfo.TL<7 ) ? 0.4 : 0.2;
        }

        // good (default) - don't alter cost

        // fine: swords/knives, axe/polearms, maces, bows, guns (effects vary)
        if( quality==2 ) {
            if( group.match(/edged|blade/) )    actualCost *= 4;
            if( group.match(/pole|cut/) )       actualCost *= 10;
            if( group.match(/mace|cr\/imp/) )   actualCost *= 3;
            if( group.match(/bow/) )            actualCost *= 4;
            if( group.match(/gun/) )            actualCost *= 2;
              /* && loadedCharacter.gameInfo.ruleset.match(4) */
              // no guidance for fine firearm cost in 3rd edition
        }

        // very fine: swords/knives (others only rarely; no rule guidelines)
        if( quality==3 ) {
            if( group.match(/edged|blade/) )    actualCost *= 20;
            if( group.match(/gun/) )            actualCost *= 5;
              /* && loadedCharacter.gameInfo.ruleset.match(4) */
        }

    }

    // shield material
    if( equipObj.hasOwnProperty('composition') ) {
        var comp = equipObj.composition;
        if( comp && comp.match(/metal/i) ) actualCost *= ( document.loadedCharacter.gameInfo.ruleset.match(3) ) ? 4 : 5;
        /*
        if( comp.match(/metal/) ) {
            newItem.cost   *= ( ruleset.match(3) ) ? 4 : 5;
            newItem.weight *= ( ruleset.match(3) ) ? 3 : 2;
            newItem.HP     *= 2;
            if( newItem.TL<4 )
                newItem.TL  = ( ruleset.match(3) ) ? 2 : 3;
            if( ruleset.match(4) ) newItem.DR += 3;
            else newItem.DR = 6;
        }
        if( comp.match(/plastic/) ) {
            newItem.weight *= 0.5;
            if( newItem.TL<4 )
                newItem.TL  = 7;
        }
        */
    }

    // adjust for any other added cost (for nice materials, decoration, enchantments, provenance, etc.)
    if( equipObj.hasOwnProperty('addedCost') ) {
        actualCost += equipObj.addedCost;
    }

    return actualCost;
}

function actualWeight( equipObj ) {
    var actualWeight = equipObj.weight;               // console.log("[actualWeight] "+equipObj.name+" object has weight "+equipObj.weight);
    if(!actualWeight) return '-';
    if( /*equipObj.hasOwnProperty('composition')*/ equipObj.composition ) {    // console.log("[actualWeight] "+equipObj.name+" object has a composition: "+equipObj.composition);
        if( equipObj.composition.match(/metal/i) ) actualWeight *= ( document.loadedCharacter.gameInfo.ruleset.match(3) ) ? 3 : 2;
        else if( equipObj.composition.match(/plastic/i) ) actualWeight *= 0.5;
    }
    return actualWeight;
}

// Basic Equipment items (defined here; populated in BasicSetLib.js, and potentially added to by others)
var BasicEquipment = {};


/* 'sub'class Armor */
Armor.prototype = new Equipment;                   // This makes Armor inherit from Equipment
Armor.prototype.constructor = Armor;               // This makes 'ArmorObj instanceof Armor' true
function Armor( name, wt, cost, tl, lc, dr, pd, loc, ref ) {
    this.base = Equipment;
    this.base( name, wt, cost, tl, lc, ref );
    // Armor members
    this.PD       = pd;         // only e3 rules; not all armor defined in e3 ruleset
    this.DR       = dr;
    this.location = loc;        // array of locations covered by this armor
    /* Armor members that are only instantiated when needed
    this.splitDR = 2;
    this.splitPD = 1;
    this.DRvariesByTL = true;   // indicated by note 3 (e4 pp 284-5)
    this.layerable = true;      // indicated by note 1 plus * (e4 pp 283-4), or note 2 (e4 pp 284-5)
    */
}

// Armor prototype methods

// ArmorItems (defined here; populated in BasicSetLib.js, and potentially added to by others)
var ArmorItems = {};


/* 'sub'class Shield */
Shield.prototype = new Equipment;                    // This makes Shield inherit from Equipment
Shield.prototype.constructor = Shield;               // This makes 'ShieldObj instanceof Shield' true
function Shield( name, wt, cost, tl, lc, pdb, dr, pen, hp, skill, ref ) {
    this.base = Equipment;
    this.base( name, wt, cost, tl, lc, ref );
    // Shield members
    this.PDB         = pdb;                 // Passive Defense (e3) or Defense Bonus (e4)
    this.DR          = dr || 3;             // 'inherent' DR of shield (for shield destruction rules); doesn't add to character DR; in 3e this is 3 for wood/plastic, set to 6 for metal when added to sheet; in 4e these are given in shield description
    this.HP          = hp;                  // hit points of shield (for shield destruction rules)
    this.penetration = pen;                 // 'penetration' damage for shield (for shield destruction rules); calculated for 4e shields as dr+(hp/4), which will leave this attribute undefined
    this.skill       = skill || 'Shield';   // skill to be used to calculate block with this shield
   // this.composition = 'wood';              // can be set to 'wood', 'metal', or 'plastic' (I don't want a default here; force shields should not have a 'composition')
}
/*  Shield issues
  - One other question is whether pen is doubled for 3rd edition metal
    shields.  B120s says to "quadruple the cost, triple the weight, and double
    the damage it can take before destruction" for metal shields.  This
    certainly means to double the DR from 3 (for wood) to 6, as is stated
    further down the page.  The question is whether to double the numbers in
    the Damage column (pen/HP) in the table too.
    I think I will double pen as well, especially since this brings it closely
    in line with the explicit DR given for metal shields in 4th.
  - I currently recalculate cost, weight, etc. for shields based on
    composition (in the show/loadShieldFromDialog functions), and enter
    these new values in the object.  This is not consistent with what
    I do (for a good reason) with other Equipment modifiers like weapon
    quality, where I enter the basic values and use getter/setters with logic
    to return values corrected for things like materials.
    I should change how this is handled for shields.
*/
// Shield prototype methods
Shield.prototype.Pen = function() {
    return (this.penetration) ? this.penetration : Math.trunc( this.dr + (this.hp/4) );
}

// ShieldItems (defined here; populated in BasicSetLib.js, and potentially added to by others)
var ShieldItems = {};


/* 'sub'class Weapon */
Weapon.prototype = new Equipment;                   // This makes Weapon inherit from Equipment
Weapon.prototype.constructor = Weapon;              // This makes 'WeaponObj instanceof Weapon' true
function Weapon( name, wt, cost, tl, lc, bulk, qualEffectGp, ref ) {
    this.base = Equipment;
    this.base( name, wt, cost, tl, lc, ref );
    // Weapon members
    this.bulk   = bulk;                         // integer, Move & Attack modifier; equal to Holdout modifier (so usually negative); typically only defined for ranged weapons
    																						// see note B270; also list of Holdout mods B200
    this.qualityEffectGroup = qualEffectGp;     // ['edged','pole/axe','mace/cr','bow','gun/bw'] for determining changes to cheap, fine, etc. quality weapons (B74s)
                                                // ['natural','blade','cut','cr/imp','bow','gun','other'] for 4th edition weapons (pp 274, 277, 280) 
    // quality may be modified when weapon is selected, by loadWeaponFromDialog
    this.quality = 1;                           // number: 0 = cheap, 1 = good (default), 2 = fine, 3 = very fine
   // modified occasionally with Weapon definition, when armor divisor applies
    this.armorDivisor = 1;
/*  ALWAYS ADDED
    wieldOptions        // sub-object; keyed to Skill labels, values define how weapon behaves when wielded with that skill
                           (damage, hands required, strength required, ranges or reach, etc.)  See notes at file end.
    OPTIONAL
    this.shots;         // integer; weapon uses before reloading
    this.reload;        // integer; turns required for reload
*/
}
var name_for_qualityEffectGroup = {
    'bow'      : 'ranged',
    // 3rd edition
    'gun/bw'   : 'gun/beam',
    'edged'    : 'blade',
    'mace/cr'  : 'crushing',
    'pole/axe' : 'cutting/impaling',
    // 4th edition
    'blade'    : 'blade',
    'cr/imp'   : 'crushing/impaling',
    'cut'      : 'cutting',
    'gun'      : 'gun',
    'natural'  : 'natural',
    'other'    : '-',
}
// non-prototype functions, because 'weapon' objects are quite often not actually instantiated as Weapon objects
function actualRange( weaponObj, wieldOption ) {
    var quality = weaponObj.quality;
    var group   = weaponObj.qualityEffectGroup;
    if( !wieldOption ) wieldOption = weaponObj.wieldOptions[0];

    var maxDmgRg  = wieldOption.maximumRange;
    var halfDmgRg = wieldOption.halfDamageRange;
    if( quality==2 ) {
    }
}
function halfDamageRangeFor( weaponObj, wieldOption ) {
    var qualityRangeMultiplier = ( weaponObj.qualityEffectGroup && weaponObj.qualityEffectGroup.match(/bow/) && weaponObj.quality>1 ) ? 1.2 : 1;
    if( wieldOption.rangeBasedOnST )
        return ( wieldOption.rangeBasedOnST=='add' )
               ? ( ch.ST() + wieldOption.halfDamageRange )
               : Math.floor( ch.ST() * wieldOption.halfDamageRange * qualityRangeMultiplier );
    else return wieldOption.halfDamageRange;
}
function extremeRangeFor( weaponObj, wieldOption ) {
    var qualityRangeMultiplier = ( weaponObj.qualityEffectGroup && weaponObj.qualityEffectGroup.match(/bow/) && weaponObj.quality>1 ) ? 1.2 : 1;
    if( wieldOption.rangeBasedOnST )
        return ( wieldOption.rangeBasedOnST=='add' )
               ? ( ch.ST() + wieldOption.maximumRange )
               : Math.floor( ch.ST() * wieldOption.maximumRange * qualityRangeMultiplier );
    else return wieldOption.maximumRange;
}
function actualAcc( weaponObj ) {}
function actualMalf( weaponObj ) {}
// Weapon prototype methods
Weapon.prototype.printWieldOptions = function( full ) {
		var optStrings = [];
		for( var optSkl in this.wieldOptions ) {
				var optGp = this.wieldOptions[optSkl];
				for( var opt=0; opt<optGp.length; opt++ ) {
						var option = optGp[opt];

						optString = this.printWieldOption( optSkl, opt, full );

		        optStrings.push( optString );
				}
		}
		return optStrings.join('; ');
}
/*	The Weapon.wieldOptions attribute contains a wieldOptions object,
		which is a set of skill-label key / option-group value pairs.
		Each option group is implemented as an array of wieldOption objects. 
		Specifying a wield option requires an option group skill key, and an option group index.
		We need to attach this method to the prototype instead of defining a stand-alone with a wieldOption parameter,
		because the method needs properties from outside the wieldOption.
		(E.g., the skill-label and the Weapon object are required when calling the getWeaponObjectDamageStrings method.) */
Weapon.prototype.printWieldOption = function( optSkl, opt, full ) {
		var option = this.wieldOptions[optSkl][opt];
		var reach = ( option.hasOwnProperty('reach') ) ? '&nbsp;(reach&nbsp;'+option.reach+')' : '';
		var dmgStrings = getWeaponObjectDamageStrings( this, optSkl, option, document.loadedCharacter );
		var optTtl = ( option.title ) ? option.title : optSkl;
    var stats = (full) ? optTtl+reach+':&nbsp;'+dmgStrings[1] : dmgStrings[1];
    if( option.maximumRange && full ) {		// add some range stats
        if( option.accuracy ) stats += ', acc '+option.accuracy;
        if( option.halfDamageRange ) stats += ', rng '+halfDamageRangeFor( this, option )+'/'+extremeRangeFor( this, option );
    }
    return stats;
}
Weapon.prototype.actualCost = function() {
   // alert("[Weapon.actualCost] object:\n"+JSONstring.make(this));
	return actualCost(this);
}
Weapon.prototype.damage = function( wieldOptionLabel, wieldOptionTitle ) {
    /*  Damage modified by equipment quality (anything else? say presence of vibro or monowire?)
        The damage attributes in the wield options of a Weapon object are the 'normal' damage done
        by a typical item of that sort.
        This method will return damage modified by other attributes of the item, such as 'quality'.
        This implies that quality and such should NOT be used to alter damage attributes directly.
        
        This is not as straightforward as I was thinking...
        My DieRoll objects don't contain things like 'sw-1', they contain only integers.
        So the damage a (ST-based) weapon does depends on both its quality AND the user's ST.
        There are settings where the ST part isn't used, e.g. when displaying a weapon's stats
        in a dialog box, showing only 'thr+2' is what we want.

        So this method should return a string: like 'thr+2' or '3d-1', built from the damage
        sub-object of the wieldObject, but modified for things like weapon quality.
        Don't bother with using DieRolls now.
        (I may want a Damage object later that extends DieRoll...)

        This method is only being used in settings where the user's ST and skills are unknown,
        such as (maybe only?) the Select Weapon dialog box.
    */

    var quality = this.quality;
    var group = this.qualityEffectGroup;
    var wieldOption = this.wieldOptions[wieldOptionLabel];    // this is an array!!
    var title = (wieldOptionTitle) ? wieldOptionTitle : '';
    // because wieldOption is an array, I have to pick out the right element
    var base;
    var mods;
    var type;
    for( var oi=0; oi<wieldOption.length; oi++ ) {
        var wieldOptionAttack = wieldOption[oi];
        if( wieldOptionTitle && wieldOptionAttack.title != title ) continue;
        base = wieldOptionAttack.damage.base;
        mods = wieldOptionAttack.damage.mods;
        type = wieldOptionAttack.damage.type;
        perd = wieldOptionAttack.damage.perd;
        break;  // should only be one match, so exit loop when a match is found
    }
    // check that something was found
    if( !type ) return false;

    // only 'fine' and 'very fine' weapons have damage modified by quality
    if( type.match(/cut|imp/) ) {
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

    // build and return damage string
    if( typeof base == 'number' ) { base += 'd'; }
    var adds = (mods==0) ? '' : mods;
    var perdie = (perd) ? '+'+perd+'/d' : '';
    return base+signed(adds)+perdie+' '+type;

}
// high-quality bows get extra range; might need a Weapon.prototype.range method or two
Weapon.prototype.range = function( ilk, wieldOptionLabel, wieldOptionTitle ) {
    var quality = this.quality;
    var group = this.qualityEffectGroup;
    var type;
    for( var oi=0; oi<wieldOption.length; oi++ ) {
        var wieldOptionAttack = wieldOption[oi];
        if( wieldOptionTitle && wieldOptionAttack.title != title ) continue;
        type = wieldOptionAttack.damage.type;
        break;  // should only be one match, so exit loop when a match is found
    }
    if( quality>1 ) {
        range = 1.2*wieldOptionAttack[ilk]
    }
    /* leaving unfinished
    The range multiplier is being dealt with properly now in the two places that need to do it:
    loadWeaponRangesTable() and loadWeaponsTable().  They do the same thing, and it would probably
    be nice to move that code to a function like this one.  If you do this later, look at one of
    these functions in gurps.js; probably loadWeaponRangesTable().
    */
}
Weapon.prototype.armorDivisor = function( ad ) {
    if( ad ) { this.armorDivisor = ad; }
    return ad;
}
Weapon.prototype.addWieldOption = function( skill, title, hnds, base, mods, type, st ) {
    if( this.wieldOptions==undefined ) { this.wieldOptions = {}; }
    if( this.wieldOptions[skill]==undefined ) { this.wieldOptions[skill] = []; }
    this.wieldOptions[skill].push( {
        title      : title,		// text, something like 'swung' or '2-handed' (often left blank, i.e., '')
        hands      : hnds,		// 'dom', 'off', or 'both' (to facilitate wielding code - needed more info than 1|2)
        damageBase : base,		// either 'sw' or 'thr', or a number of dice
        damageMods : mods,		// integer, say 1 or -2, to be combined with base to get, e.g., '2d+1' or 'sw-2'
        damageType : type,		// 'cr', 'imp', etc.
        strength   : st 		  // number, ST required to use weapon this way (I haven't seen this vary between options for a single weapon, but it seems logical it could)
    } );
}
/* other attributes that can be added to the Weapon.wieldOption object

        readyTurns      : define if weapon becomes unready after attack; number of turns required to re-ready (omission should be interpreted as 'readyTurns : 0')
        reach           : DEFINE ONLY FOR HAND WEAPONS (if I do that, this could be used as a test)
                          usually a number (usually 1), but sometimes '1,2' or something similar indicating 1- OR 2-hex reach
        parryBonus      : number; some weapons give a parry bonus (e.g. 2 for quarterstaff in e4) or penalty (e.g. -1 for knife)
        snapShot        : number; adjusted skill required to avoid a -4 snap-shot penalty, when using the weapon without aiming (e3: B101, B115, B116 sidebar)
        accuracy        : number; accuracy bonus for weapon (used with this wield option); bonus to skill if weapon is aimed for at least 1 turn
        rangeBasedOnST  : Boolean; ranges are ST-based for some medieval weapons (bow, spear, etc) - use this flag to indicate that ranges should be calculated
        maximumRange    : number; farthest this weapon (or its missile) can go (and still do damage)
        halfDamageRange : number; range (in yards, right?) after which damage is halved
        rateOfFire      : number; shots per turn, between reloads
        recoil          : number; recoil penalty for weapon (B120)
        wielded         : DEPRECATED Boolean; used on Weapon objects attached to a Character (possibly redundant with wieldSkill)
        wieldSkill      : DEPRECATED skill label of wield option being used
        ruleset         : Ruleset object; encapsulates which rulesets this wield option is compatible with (can omission be interpreted as an all-true Ruleset object? or is it easier to always include it?)
        note            : array of text entries (use this attribute for option-specific notes; there is a "notes" attribute at the Weapon object level too)

    There are so many of these that I think in general I will be defining wield options using object literal syntax,
    instead of using the Weapon.addWieldOption() method.
    
    NOTE: The way damage is being added above is now DEPRECATED.  I think this function isn't being used; it should probably be removed.
    
    Note that I am trying to capture some information here that is not at this time displayed
    on any character sheet, e.g. readyTurns.  So far I'm not using this attribute, though.
*/
Weapon.prototype.strength = function() {
	//  console.log(this.name);
		var ST = 100;
	  for( var woptgp in this.wieldOptions ) {
      //  console.log("  wield option group: "+woptgp);
	  		var wieldOpts = this.wieldOptions[woptgp];
        for( var opt=0; opt<wieldOpts.length; opt++ ) {
            var optST = wieldOpts[opt].strength;
          //  console.log("  wield option "+woptgp+"["+opt+"] ST: "+optST);
            if( optST<ST ) ST = optST;
        }
	  }
	//  console.log("  strength = "+ST);
	  return ST;
}

// Weapons (defined here; populated in main library javascript file, and potentially added to by others)
var Weapons = {};

/*  SKILL-RELATED ATTRIBUTE GROUP
Weapons.Quarterstaff.wieldOptions = { StaffSkill        : [ { title: 'swing',   hands: 'both', strength:  6, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', note: ["Parry is 2/3 Staff skill."] },
                                                            { title: 'thrust',  hands: 'both', strength:  6, damage: { base: 'thr', mods:  2, type: 'cr'  }, reach: '1,2', note: ["Parry is 2/3 Staff skill."] } ],
                                      TwoHandedSword    : [ { title: 'swing',   hands: 'both', strength:  9, damage: { base: 'sw',  mods:  2, type: 'cr'  }, reach: '1,2', note: ["Using sword technique with staff."] },
                                                            { title: 'thrust',  hands: 'both', strength:  9, damage: { base: 'thr', mods:  1, type: 'cr'  }, reach:   2,   note: ["Using sword technique with staff."] } ] };
Weapons.Spear.wieldOptions        = { Spear             : [ { title: '1 hand',  hands:  'dom', strength:  9, damage: { base: 'thr', mods:  2, type: 'imp' }, reach: '1',   note: ["Used 1-handed.","Throwable.","Becomes unready if used to parry."] },
                                                            { title: '2 hands', hands: 'both', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, reach: '1,2', note: ["Same spear used 2-handed.","Must be <i>readied</i> for one turn to change from long to short grip or vice-versa.","Becomes unready if used to parry."] } ],
                                      SpearThrowing     : [ { title: 'throw',   hands:  'dom', strength:  9, damage: { base: 'thr', mods:  3, type: 'imp' }, accuracy: 2,       halfDamageRange: 1,   maximumRange: 1.5, snapShot: 11, rangeBasedOnST: true } ],
                                      SpearThrower      : [ { title: 'thrower', hands:  'dom', strength:  9, damage: { base: 'sw',  mods:  3, type: 'imp' }, accuracy: 2,       halfDamageRange: 1.5, maximumRange: 2,   snapShot: 12, rangeBasedOnST: true } ] };
in general,
Weapon.wieldOptions = { skillToUse1 : [ { title : 'use1', other atts }, { title : 'use2', other atts } ],
                        skillToUse2 : [ { atts } ] }
This would be added after the Quarterstaff declaration.
The length of the inner array would tell loadCharacter how many lines to use when filling entries under Hand/Ranged Weapons.
The 'title' attribute will be printed after the weapon name on that line: i.e., Quarterstaff (swung)
which would be accessed thus:
    var skillUsed = 'Staff';
    var parry = int( ch.Skills[skillUsed].level/2 ) + 3 + ch.handWeapons.Quarterstaff.wieldOptions[skillUsed].parryBonus
This doesn't really track with 4th Ed rules though; apparently you get a +2 parry bonus with a
quarterstaff no matter what skill you use it with.  In 3rd Ed, you got a parry 'bonus' by using 
your staff with the Staff skill, but you didn't if you used it with the Two-Handed Sword skill:
    var parry = ( ch.Skills[skillUsed] = 'Staff' ) ? int( 2*ch.Skills[skillUsed].level/3 ) : int( ch.Skills[skillUsed].level/2 );
(I can think of better ways to arrange that, too, like
    var pmult = ch.handWeapons.Quarterstaff.wieldOptions[skillUsed].parryMult;
    var parry = int( ch.Skills[skillUsed].level * pmult );
for instance.)
*/
