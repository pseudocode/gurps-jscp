/* Object constructor for Ads and Disads (and Perks and Quirks and such, too) */
function Trait( name, type, physMntlScl, cost, hasLevels, ref ) {

    /* private members */
    // Constructor parameters automatically become private members.

    /* privileged methods */
    // getters for private (constant) vars

    /* public members */
    // 'publicize' these private members
    this.name              = name;            // Avoid commas; can mess up some functions that split on them
    this.type              = type;            // text - 1-letter codes [A: advantage, D: disadvantage, L: language (4e), P: perk, Q: quirk, H: header, S: spacer, U: unknown]; determined from source book.  Can enter more than one value; e.g. 'AD' for e.g. Status
    this.physMntlScl       = physMntlScl;     // 'P' (for 'physical'), 'M' (for 'mental') or 'So' (for 'social').  Can enter more than one value; e.g. 'MP'
    this.cost              = cost;            // This must either be an integer, or start with the word 'varies'.
    if( hasLevels )
        this.hasLevels     = hasLevels;       // Boolean
    this.reference         = ref;             // text - a book title or abbreviation* and page number[s, in pp-pp format], usually
                                              // * NB: use abbreviations found in gurps.js var titleForAbbreviation
/*  // overwrite (or add) these public members as appropriate
    this.key               = key;             // text - added to Trait objects as part of library processing; duplicates the Traits library object key into each Trait
    this.fixedCost         = 0;               // Integer - offsets basic level cost: cost = fixedCost + levels*costPerLevel
    this.EnhLimsArray      = [];              // array of { text:'description', value:percent } objects, containing all enhancements and limitations (percentage cost modifiers) applied to this ad/disad
    this.takesMultipliers  = false;           // Boolean (Enhancements and Limitations seem to be generic; any ad/disad can have them.  Multipliers only apply to a few.)
    this.MultipliersArray  = [];              // array of { text:'description', value:multiplier } objects, containing all cost multipliers applied to this ad/disad
    this.takesConstantMods = false;           // Boolean
    this.ConstantModsArray = [];              // array of { text:'description', value:constantmod } objects, containing all constant (+ or -) cost modifiers applied to this ad/disad
    this.levelsName        = 'rank', e.g.;    // string to be used instead of the word 'level'; i.e., 'rank 1'
    this.levelsNameNonPlural=false;           // Boolean; used to make level naming better when using %s, etc.
    this.levelNames        = ['low','hi'];    // array of terms to be used instead of 'level 1', etc.
    this.posNegLevels      = true;            // add this if the Ad/Disad can be either, i.e., something like Status which can be either an advantage or disadvantage, depending on level
    this.highestLevel      = 3;               // add this for a trait with levels that can only be taken to limited degree, e.g. 3rd-edition Magery (limited to 3 levels)
    this.lowestLevel       = 1;               // like highestLevel, but usually needed for traits with posNegLevels; e.g. Rank and Status only go from -4 to +8 in 3rd edition (I think).  MUST BE SET IF FIXEDCOST IS SET.
    this.ruleset           = 'e4'             // String [ e3, e3lite, e4, e4lite ] (only include if different versions exist)
                                              // needs to be changed to use the Ruleset object instead (DEPRECATED)
    this.requestBasicCost  = false;           // String
    this.description       = [];              // String or Array of Strings (often empty - if empty, instructions must be entered)
    this.instructions      = '';              // String - this text will appear in the selection form
    this.group             = '';              // String - use to make traits mutually exclusive, e.g. Beautiful and Hideous both have group attribute value 'appearance'
    this.multiple          = false;           // Boolean
    this.cinematic         = false;           // Boolean
    this.levels            = 0;               // integer - use when trait with levels is taken, to record how many levels
    this.exoticSprntl      = '';              // blank, absent or 'M' means 'mundane' (these may get autofilled); other choices are 'Exotic' and 'Supernatural'
    this.templateTrait     = true;            // this is a 'container' pseudo-trait, used to display a set of other traits packaged as a template
    this.inTemplate        = templateKey;     // traits 'contained' in a template are not displayed; this attribute marks these and associates them with their container
*/
}

var modArrayNames = ('ConstantModsArray','EnhLimsArray','MultipliersArray');

/* I note that GCS puts together my physMntlScl and exoticSprntl properties, and calls them 'type'.
	They are multi-valued there, i.e., you can take any combination of
	physical, mental, social, exotic, and supernatural. */

/* Trait object public methods */
// I don't want anything like Trait.prototype.has here.  Defined instead as a Character method.

// Use this prototype clone method to copy ads and disads from the AdsDisads object -
// so it's only for copying prototype ads/disads, not those that have been customized for a character.
// Omits the *Array object properties, for instance.
Trait.prototype.clone = function() {
  // alert(JSONstring.make(this));
    var newTrait = new Trait( this.name, this.type,  this.physMntlScl, this.cost, this.hasLevels, this.reference );
    if( this.hasOwnProperty('key') )               { newTrait.key=this.key; }
    if( this.hasOwnProperty('ruleset') )           { newTrait.ruleset=this.ruleset; }
    if( this.hasOwnProperty('multiple') )          { newTrait.multiple=true; }
    if( this.hasOwnProperty('group') )             { newTrait.group=this.group; }
    if( this.hasOwnProperty('cinematic') )         { newTrait.cinematic=true; }
    if( this.hasOwnProperty('exoticSprntl') )      { newTrait.exoticSprntl=this.exoticSprntl; }
//     else                                           { newTrait.exoticSprntl = ' Mundane'; }   // use space so it sorts before 'Exotic'
//     if( newTrait.exoticSprntl=='' )                { newTrait.exoticSprntl = ' Mundane'; }
//    if( this.hasOwnProperty('levels') )           { newTrait.levels=this.levels; }
    if( this.hasOwnProperty('costFunction') )      { newTrait.costFunction=this.costFunction; }
    if( this.hasOwnProperty('levelNames') )        { newTrait.levelNames=this.levelNames; }
    if( this.hasOwnProperty('levelsName') )        { newTrait.levelsName=this.levelsName; }
    if( this.hasOwnProperty('levelsNameNonPlural')){ newTrait.levelsNameNonPlural=this.levelsNameNonPlural; }
    if( this.hasOwnProperty('posNegLevels') )      { newTrait.posNegLevels=this.posNegLevels; }
    if( this.hasOwnProperty('lowestLevel') )       { newTrait.lowestLevel=this.lowestLevel; }
    if( this.hasOwnProperty('highestLevel') )      { newTrait.highestLevel=this.highestLevel; }
    if( this.hasOwnProperty('fixedCost') )         { newTrait.fixedCost=this.fixedCost; }
    if( this.hasOwnProperty('requestBasicCost') )  { newTrait.requestBasicCost=this.requestBasicCost; }    // keep in clone so that editing software knows this ad/disad's cost can be adjusted later by the player
    if( this.hasOwnProperty('description') )       { newTrait.description=this.description; }
    if( this.hasOwnProperty('takesMultipliers') )  { newTrait.takesMultipliers=this.takesMultipliers; }
    if( this.hasOwnProperty('takesConstantMods') ) { newTrait.takesConstantMods=this.takesConstantMods; }
    if( this.hasOwnProperty('mods') )              { newTrait.mods=this.mods; }
  // alert(JSONstring.make(this));
    return newTrait;
}
Trait.prototype.copyAs = function( newname ) {
    let keyname = newname.replace(/\W+/g,'');
    if( Traits[keyname] ) {
        alert('"'+keyname+'" is already a Trait key; cannot use "'+newname+'" for this copy.')
        return false;
    }
    Traits[keyname] = this.clone();
    Traits[keyname].key = this.key;   // RE-USE the original key.  This ensures that any Linkers that apply to the old "this" Trait also get applied to the copy.
    Traits[keyname].name = newname;
}
Trait.prototype.isInvalid = function() {
		// check property types, etc
		// console.log('[Trait.isInvalid] validating '+this.name);
		// console.log(this);
		if( !this.type || !this.type.match(/[adlcpqhsu]/i) ) return "invalid type: "+this.type+" (must be text; one or more of A, D, P, Q, H, S, or U)";
    if( this.hasOwnProperty('line') ) {
        if( this.type.match(/S|H/i) ) return false;
        else return "invalid format pseudo-trait";
    }
		if( !this.physMntlScl || !this.physMntlScl.match(/P|M|So/i) ) return "invalid physMntlScl: "+this.physMntlScl+" (must be text; one or more of P, M, or So)";
		if( isNaN(this.cost) && !this.cost.match(/^varies|att/i) ) return 'invalid cost: '+this.cost+' (must be numeric or start with "varies")';
		if( this.hasLevels && !( this.hasLevels===true || this.hasLevels===false ) ) {
				alert( JSONstring.make(this) );
				return 'invalid hasLevels: '+this.hasLevels+' (must be Boolean, and exactly "true" or "false")';
		}
/*		if( this.property && !( this.property requirements ) )
				return 'invalid property: '+this.property+' (must be blah blah blah)';*/
		// return 'false' (not invalid) if all tests above pass
		//console.log('[Trait.isInvalid] '+this.name+' trait is not invalid; returning false');
		return false;
}
Trait.prototype.repair = function() {  // console.log("repairing "+this.name); console.log(this);
		if( !this.type || !this.type.match(/[adlcpqhsu]/i) ) this.assignType();
    if( this.hasOwnProperty('line') ) return;
		if( !this.physMntlScl || !this.physMntlScl.match(/P|M|So/i) ) this.physMntlScl = "MPSo";
		if( isNaN(this.cost) && !this.cost.match(/^varies/i) ) this.cost = 0;
		if( this.hasLevels && !( this.hasLevels===true || this.hasLevels===false ) ) {
				this.hasLevels = false;
		}
}
// this method is essentially identical to Trait.prototype.type, below
Trait.prototype.assignType = function() {
    // test for formatting pseudo-traits
    if( this.hasOwnProperty('line') ) {
        if( this.line ) { this.type = 'H'; return; }
        else { this.type = 'S'; return; };
    }
    // language, cultures, etc traits
    if( this.key=='CulturalFamiliarity' || this.key=='SizeModifier' ) { this.type = 'A'; return; }
    if( this.key=='Language' ) { this.type = 'L'; return; }
		// easy test first
		let cost = this.finalCost();    // takes parity of levels into account if 'this' is a library trait rather than one that has been taken
		// if( cost!=0 but !cost ) this.type = "undefined"
		if( cost== 1 ) { this.type = 'P'; return; }
		if( cost==-1 ) { this.type = 'Q'; return; }
		if( cost > 0 ) { this.type = 'A'; return; }
		if( cost < 0 ) { this.type = 'D'; return; }
		if( cost==0 ) {
		    // look at mods
		    if( Traits[this.key].mods ) {
		        let modList = Traits[this.key].mods;   // comma-separated list of Modifier object keys
		        let mods = modList.split(/,\s*/);   console.log(mods);
            let modbias = 0;
		        for( let m=0; m<mods.length; m++ ) {
		            let modkey = mods[m].replace(/\W+/g,'');  console.log(modkey);
		            let modifier = Modifiers[modkey];    // modifier is an array of arrays of objects: { text: "text", mod: <num>, type: constantMod|enhanceLimit|multiplier [, required: bool, levels: bool] }
		            // positive constant mods are usually advantages
		            // enhancements are rarely, if ever, applied to disadvantages (limitations are often available for ads and disads)
		            // multipliers are pretty ambiguous; always positive (though values between 0 and 1 are analogous to negatives here), and applied to both ads and disads

		            // groups of arrays always(?) share type; look for a constantMod group first
		            for( let g=0; g<modifier.length; g++ ) {
		                let modgroup = modifier[g];     // modgroup is an array of modifier objects, hopefully with a shared type
		                let modtype = modgroup[0].type;
		                if( modtype=='multiplier' ) continue;    // don't even bother with multipliers
		                if( modtype=='constantMod' ) {
		                    for( let obj=0; obj<modgroup.length; obj++ ) {
		                        let modval = modgroup[obj].mod;
		                        if( modval==0 ) continue;
		                        if(modval>0) modbias++; else modbias--;
		                    }
		                }
		                else if( modtype=='enhanceLimit' ) {
		                    let modbias = 0;
		                    for( let obj=0; obj<modgroup.length; obj++ ) {
		                        let modval = modgroup[obj].mod;
		                        if( modval==0 ) continue;     // never applies to enhancement/limitations?
		                        if( modval>0 ) { modbias += 2; break; }   // enhancement group; strong evidence the mod target is an advantage (but only count the evidence once)
		                    }
		                }

		            }
            } // end loop over modifier grid
            if( modbias >= 0) { this.type = 'A'; return; }
            if( modbias <  0) { this.type = 'D'; return; }
		    } // end if(mods)
		    // rulebooks always divide ads and disads; maybe this should actually be defined or set in library...?
		    // certain things I treat as Traits are NOT listed under either Advantages or Disadvantages in the rulebooks; e.g. Status, Appearance, etc.

		} // end if(cost==0)
    return false;
}
Trait.prototype.finalCost = function( noMods ) {
    var fCost = this.cost || 0;
    var showMods = ( noMods ) ? false : true;
    var levels = (this.hasOwnProperty('levels') ) ? this.levels : 1;   // traits that are not associated with a character will not have the 'levels' property; assign these levels=1

    // if I ever have modifiers that modify level costs, they will need to go here (at this spot, not just in this function)
 //   alert("[Trait.finalCost] this trait:\n"+JSONstring.make(this));

    var fixedCost  = ( this.hasOwnProperty( 'fixedCost'  ) ) ? this.fixedCost : 0;
 //   if( this.hasOwnProperty('costFunction') ) alert("[Trait.finalCost] this.costFunction:\n"+JSONstring.make(this.costFunction));
    var levelsCost = ( this.hasOwnProperty('costFunction') ) ? this.costFunction(levels) : levels*this.cost;  // an attempt to attach custom cost functions to traits - not entirely successful
    if( this.hasLevels ) { fCost = fixedCost + levelsCost; }
  //  if(this.description=='no body heat') alert(this.name+": fixedCost ("+fixedCost+") + levelsCost ("+levelsCost+") = fCost = "+fCost);

    // 3rd edition 'Increased/Decreased (Attribute)' traits
//     if( this.hasOwnProperty('key') && this.key.match(/[In|De]creased/) && this.cost=='att' ) {
    if( this.cost=='att' ) {
        // for 'att' costs, REPLACE what was calculated in 'if( this.hasLevels )' line above - levels aren't linear
   //     fCost = ( this.key.match(/Increased|Decreased/i) ) ? attributeLevelToPtsPre4e( 10 + this.levels ) : attributeLevelToPtsPre4e( 10 - this.levels );
        fCost = AttributeCostFunction3e( levels );   // I'm depending on this function's existence, for these cases
        // console.log("[Trait.finalCost] 'att' cost, computed: "+fCost);
    }

    if( this.ConstantModsArray && showMods ) {
        cmod = this.ConstantMod();
        fCost += cmod;
    }

    if( this.EnhLimsArray && showMods ) {
        enhLimSum = this.EnhLimSum();
      	// javascript is a great language in many ways, but I hate the way it can't do basic arithmetic.
      	// This ridiculous chicanery is necessary to keep 1 + -0.8 from being equal to 0.1999999996.
        var multiplier = Math.round(1000000*(1+Math.round(enhLimSum)/100))/1000000;   // does using Math.floor instead solve this?
        //if(this.description=='pallor') alert("multiplying by 1 + Math.round("+enhLimSum+")/100 =\n\t1 + "+Math.round(enhLimSum)+"/100 =\n\t1 + "+Math.round(enhLimSum)/100+" =\n\t"+(1+Math.round(enhLimSum)/100)+" =\n\t"+multiplier+" when 'rounded'");
        fCost *= multiplier;
    }
    //alert(fCost);

    if( this.MultipliersArray && showMods ) {
        mult = this.Multiplier();
        fCost *= mult;
    }

    return Math.ceil( Math.round(1000*fCost)/1000 );     // round non-integer costs positively ( 5.2 becomes 6, -7.75 becomes -7 )
}
Trait.prototype.EnhLimSum = function() {
    if( this.EnhLimsArray ) {
        var enhLimSum = 0;
        for( var el in this.EnhLimsArray ) {
            enhLimSum += 1*this.EnhLimsArray[el].value;
        }
        // -80% minimum
        if( enhLimSum < -80 ) enhLimSum = -80;
        return enhLimSum;
    }
    else { return false; }
}
Trait.prototype.EnhLimDesc = function() {
    if( this.EnhLimsArray ) {
        var descArr = [];
        for( var el in this.EnhLimsArray ) {
            descArr.push( this.EnhLimsArray[el].text );
        }
        return descArr.join('; ');
    }
    else { return false; }
}
Trait.prototype.Multiplier = function() {
    var mult = 1;
    for( var m in this.MultipliersArray ) {
      //  alert("this.MultipliersArray["+m+"].value="+this.MultipliersArray[m].value+" evaluates to "+eval(this.MultipliersArray[m].value));
        mult *= eval(this.MultipliersArray[m].value);
    }
    return mult;
}
Trait.prototype.MultDesc = function(short) {
    if( this.MultipliersArray ) {
        var descArr = [];
        for( var m in this.MultipliersArray ) {
            let text = this.MultipliersArray[m].text;
		        // catch self-control items here and treat them differently
		        if( text.match(/self-control:/i) ) {
		        		var matches = text.match(/\(roll of (\d+) or less\)/i);
		        		var num = matches[1];
		        		text = num;
		        }
            if( short ) {
                var matches = text.match(/.*:\s+(.*)/);
                if( matches ) text = matches[1];
            }
		        // not sure this is good enough
		        // alternatively, catch before defining 'multText' in Trait.print() method below
		        //   make a local copy of MultipliersArray
		        //   catch the self-control entry, if present
		        //   process and 'eat' it
		        //   pass remainder of copy of MultipliersArray on to be dealt with as usual (perhaps with a length>0 proviso added)
            descArr.push( text );
        }
        return descArr.join('; ');
    }
    else { return false; }
}
Trait.prototype.ConstantMod = function() {
    var cmod = 0;
    for( var m in this.ConstantModsArray ) {
        cmod += this.ConstantModsArray[m].value;
    }
    return cmod;
}
Trait.prototype.ModsDesc = function(short) {
    if( this.ConstantModsArray ) {
        var descArr = [];
        for( var m in this.ConstantModsArray ) {
            var text = this.ConstantModsArray[m].text;
            if( short ) {
                var matches = text.match(/.*:\s+(.*)/);
                if( matches ) text = matches[1];
            }
            descArr.push( text );
        }
        return descArr.join('; ');
    }
    else { return false; }
}

Trait.prototype.sameAs = function(trait) {
    if( this.key != trait.key ) return false;
    for( var p in trait ) {
        if( this[p] != trait[p] ) {
            return false;
        }
    }
    return true;
}
Trait.prototype.print = function( opts ) {
    // the options object controls how modifiers, etc are displayed inline
    let options = opts || {};     // console.log(options);
    let levelsText = '';
    // <In|De>creased[att] traits should probably print as, e.g., 'ST-4' instead of 'Decreased Strength 4'
    if( this.hasLevels ) {
        // let levels = this.levels;
        let levels = (this.hasOwnProperty('levels') ) ? this.levels : 1;   // traits that are not associated with a character will not have the 'levels' property; assign these levels=1
//         var levelsName = ( this.hasOwnProperty('levelsName') ) ? ', '+this.levelsName : '';
        let levelsName = ( this.hasOwnProperty('levelsName') ) ? this.levelsName : '';
        if( this.hasOwnProperty('levelNames') ) {

//             var index = levels;
//             if( this.hasOwnProperty('lowestLevel') ) index -= this.lowestLevel;
            let index = (this.key=="Language") ? levels : levels - 1;  // this assumes array entries correspond with levels this way: ['level 1 name', 'level 2 name', etc.];
            if( this.hasOwnProperty( 'fixedCost' ) ) index = levels;    // level zero is likely the first entry in this situation
            if( this.hasOwnProperty('lowestLevel') ) index = levels - this.lowestLevel;    // because "levels - 1" assumes that lowestLevel = 1
//            else if( this.cost>0 ) index--;
            if( this.levelNames[index] ) levels = this.levelNames[index];

        }
        let plus = ( this.hasOwnProperty('posNegLevels') && (levels>0 && !isNaN(levels)) ) ? '+' : '';
    //    alert(plus);
        levelsText = ( this.hasOwnProperty('levelNames') ) ? ': ' : ' ';
        levelsText += plus+levels;
        if( levelsName )
            levelsText += ( this.hasOwnProperty('levelNames') )
            						? ' '+levelsName
            						: ' '+( (this.levelsNameNonPlural) ? levelsName : plural(levelsName,levels) );
    }

    let d = ( this.hasOwnProperty('description') && this.description ) ? true : false;
    let desc = ( this.hasOwnProperty('description') && this.description && !options.hidedesc /*&& this.hasOwnProperty('index')*/ ) ? ': '+this.description : '';

//		var enhLimPc = this.EnhLimSum();
//		if( enhLimPc>0 ) { enhLimPc = '+'+enhLimPc; }
//		var enhLim = (this.EnhLimsArray && this.EnhLimsArray.length>0) ? ' ('+this.EnhLimDesc()+'; '+enhLimPc+'%)' : '';

    let enhLimsTextArr = [];
    for( var eli in this.EnhLimsArray ) {
        enhLimItem = this.EnhLimsArray[eli];
        var valSign = (enhLimItem.value>0) ? '+' : '';
        enhLimsTextArr.push( enhLimItem.text + ', ' + valSign + enhLimItem.value + '%' );
    }
    let e = (this.EnhLimsArray && this.EnhLimsArray.length>0 ) ? true : false;
    let enhLim = (this.EnhLimsArray && this.EnhLimsArray.length>0 && !options.hideenhlims )
               ? ' (' + enhLimsTextArr.join('; ') + ')' : '';

    let multDesc = this.MultDesc(1);
//     var pMltTxt = ( this.hasOwnProperty('MultipliersArray') && !multDesc.match(/;/) && this.MultipliersArray[0].text.match(/self-control:/i) )
//                 ? ' ('+multDesc+')' : ' ('+multDesc+'; &times;'+this.Multiplier()+')';
//     var multText = ( this.hasOwnProperty('MultipliersArray') ) ? pMltTxt : '';
    let m = (multDesc) ? true : false;
    let multText = (multDesc && !options.hidemults) ?  ' ('+multDesc+')' :  '';

    let modValText = (this.ConstantMod()>=0 ) ? '+' +this.ConstantMod() : this.ConstantMod();   // there's a utility for this: signed(num) in gurps.js
    let cmodsText  = (this.ConstantModsArray && !options.hidecmods) ? ' ('+this.ModsDesc(1)+'; '+modValText+')' : '';
    let c = (this.ConstantModsArray) ? true : false;

    let cstate = (this.expand) ? '' : 'closed';
    let idsuff = (this.multiple && typeof(this.multiple)=='number' ) ? this.key+this.multiple : this.key;
    let chev = ( d || e || c || m || this.templateTrait ) ? '<img id="chev_'+idsuff+'" class="chev '+cstate+'" onmousedown="toggleTraitExpansion(event,\''+this.key+'\',\''+this.multiple+'\')" src="../images/chevdn.png" />' : '';
    if( options.hidechev ) chev = '';

    return this.name + levelsText + desc + enhLim + multText + cmodsText + chev;
}

/*  print format
  This might benefit from some adjustment.
  The compact form for display of the Self-Control mods has already been moved to the appropriate sub-method (MultDesc).
  The Iconics tend to use a format like this:
    Trait lvl# (control#) ( description; ConstantMod; EnhLim1[,val1]; EnhLim2[,val2];... )
  without including values for the modifiers - just the text.  This could work, since I am now distinguishing 'short' from normal descriptions.
  The current format looks like
    Trait levels: description (EnhLim1; EnhLim2;...) (MultText1; MultText2;...) (ConstModText1; ConstModText2;...)
*/

Trait.prototype.getType = function() {
    // test for formatting pseudo-traits
    if( this.hasOwnProperty('line') ) {
        if( this.line ) return 'heading';
        else return 'spacer';
    }
		// easy test first
		let cost = this.finalCost();    // takes parity of levels into account if 'this' is a library trait rather than one that has been taken
		// if( cost!=0 but !cost ) return "undefined"
		if( cost== 1 ) return 'perk';
		if( cost==-1 ) return 'quirk';
		if( cost>0 ) return 'advantage';
		if( cost<0 ) return 'disadvantage';
		if( cost==0 ) {
		    // look at mods
		    if( this.mods ) {
		        let modList = this.mods;   // comma-separated list of Modifier object keys
		        let mods = modList.split(/,\s*/);   console.log(mods);
            let modbias = 0;
		        for( let m=0; m<mods.length; m++ ) {
		            let modkey = mods[m].replace(/\W+/g,'');  console.log(modkey);
		            let modifier = Modifiers[modkey];    // modifier is an array of arrays of objects: { text: "text", mod: <num>, type: constantMod|enhanceLimit|multiplier [, required: bool, levels: bool] }
		            // positive constant mods are usually advantages
		            // enhancements are rarely, if ever, applied to disadvantages (limitations are often available for ads and disads)
		            // multipliers are pretty ambiguous; always positive (though values between 0 and 1 are analogous to negatives here), and applied to both ads and disads

		            // groups of arrays always(?) share type; look for a constantMod group first
		            for( let g=0; g<modifier.length; g++ ) {
		                let modgroup = modifier[g];     // modgroup is an array of modifier objects, hopefully with a shared type
		                let modtype = modgroup[0].type;
		                if( modtype=='multiplier' ) continue;    // don't even bother with multipliers
		                if( modtype=='constantMod' ) {
		                    for( let obj=0; obj<modgroup.length; obj++ ) {
		                        let modval = modgroup[obj].mod;
		                        if( modval==0 ) continue;
		                        if(modval>0) modbias++; else modbias--;
		                    }
		                }
		                else if( modtype=='enhanceLimit' ) {
		                    let modbias = 0;
		                    for( let obj=0; obj<modgroup.length; obj++ ) {
		                        let modval = modgroup[obj].mod;
		                        if( modval==0 ) continue;     // never applies to enhancement/limitations?
		                        if( modval>0 ) { modbias += 2; break; }   // enhancement group; strong evidence the mod target is an advantage (but only count the evidence once)
		                    }
		                }

		            }

		        } // end loop over modifier grid
		        if( modbias >  1 ) return 'advantage';
		        if( modbias < -1 ) return 'disadvantage';
		    } // end if(mods)
		    // rulebooks always divide ads and disads; maybe this should actually be defined or set in library...?
		    // certain things I treat as Traits are NOT listed under either Advantages or Disadvantages in the rulebooks; e.g. Status, Appearance, etc.

		} // end if(cost==0)
    return 'undetermined';
}

function getTraitTypeFromLabel( label ) {
    if( document.loadedCharacter.traits[label] ) {
        return document.loadedCharacter.traits[label].type();
    }
  //  if( window.console ) { console.log(label+' not found attached to '+document.loadedCharacter.description.name); }
    return null;
}

// use this one to 'clone' (i.e., restore to 'Trait' object-type status)
// the ad/disad generic objects attached to Character objects stored in JSON format.
function cloneTraitFromGenericObject( obj ) {
    var newTrait = new Trait( obj.name, obj.type, obj.physMntlScl, obj.cost, obj.hasLevels, obj.reference );
    if( obj.hasOwnProperty("key") )               { newTrait.key=obj.key; }
    if( obj.hasOwnProperty("ruleset") )           { newTrait.ruleset=obj.ruleset; }
    if( obj.hasOwnProperty("multiple") )          { newTrait.multiple=obj.multiple; }          // this will sometimes now contain an integer representing which instance this is of several instances of this trait the character has 
    if( obj.hasOwnProperty("group") )             { newTrait.group=obj.group; }
    if( obj.hasOwnProperty("cinematic") )         { newTrait.cinematic=true; }
    if( obj.hasOwnProperty("exoticSprntl") )      { newTrait.exoticSprntl=obj.exoticSprntl; }
    if( obj.hasOwnProperty("levels") )            { newTrait.levels=obj.levels; }
    if( obj.hasOwnProperty("index") )             { newTrait.index=obj.index; }
    if( obj.hasOwnProperty('costFunction') )      { newTrait.costFunction=obj.costFunction; }
    if( obj.hasOwnProperty("lowestLevel") )       { newTrait.lowestLevel=obj.lowestLevel; }
    if( obj.hasOwnProperty("highestLevel") )      { newTrait.highestLevel=obj.highestLevel; }
    if( obj.hasOwnProperty("posNegLevels") )      { newTrait.posNegLevels=obj.posNegLevels; }
    if( obj.hasOwnProperty("levelNames") )        { newTrait.levelNames=obj.levelNames; }
    if( obj.hasOwnProperty("levelsName") )        { newTrait.levelsName=obj.levelsName; }
    if( obj.hasOwnProperty('levelsNameNonPlural')){ newTrait.levelsNameNonPlural=obj.levelsNameNonPlural; }
    if( obj.hasOwnProperty("fixedCost") )         { newTrait.fixedCost=obj.fixedCost; }        // here I don't care to copy if fixedCost=0
    if( obj.hasOwnProperty("requestBasicCost") )  { newTrait.requestBasicCost=obj.requestBasicCost; } // keep in clone so that editing software knows this ad/disad's cost can be adjusted later by the player
    if( obj.hasOwnProperty("EnhLimsArray") )      { newTrait.EnhLimsArray=obj.EnhLimsArray; }           // doesn't appear in prototype clone method - no need
    if( obj.hasOwnProperty("MultipliersArray") )  { newTrait.MultipliersArray=obj.MultipliersArray; }   // doesn't appear in prototype clone method - no need
    if( obj.hasOwnProperty("ConstantModsArray") ) { newTrait.ConstantModsArray=obj.ConstantModsArray; } // doesn't appear in prototype clone method - no need
    if( obj.hasOwnProperty("description") )       { newTrait.description=obj.description; }
    if( obj.hasOwnProperty("inTemplate") )        { newTrait.inTemplate=obj.inTemplate; }               // doesn't appear in prototype clone method - no need
    if( obj.hasOwnProperty("templateTrait") )     { newTrait.templateTrait=obj.templateTrait; }         // doesn't appear in prototype clone method - no need
    if( obj.hasOwnProperty("line") )              { newTrait.line=obj.line; }
    if( obj.hasOwnProperty("expand") )            { newTrait.expand=obj.expand; }
    return newTrait;
}


// Traits object; 'copy' from here to add traits to characters
var Traits = {};

// object to store bonuses and penalties (e.g., 'Double-jointed' gives +3 to the Climbing skill)
var Adjustments = {};
