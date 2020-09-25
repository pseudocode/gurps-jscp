/* Skill-related methods, that can't be attached via prototype */

function cloneSkill( oldSkill, fullCopy ) {
    // console.log("[cloneSkill] about to clone\n"); console.log(oldSkill);
    var newSkill = new Skill();
    for( var prop in oldSkill ) {
        if( !fullCopy && prop=='TLs' ) { continue; }     // there are actually several of these; want an if( grep prop in propsToSkip )...
        if( !fullCopy && prop=='specRequiredList' ) { continue; }
        if( oldSkill.hasOwnProperty(prop) ) newSkill[prop] = oldSkill[prop];
    }
    // if( !newSkill.type )
    //     newSkill.type = ( att.match(/IQ/i) ) ? 'M' : 'P';
    // console.log("[cloneSkill] returning clone\n"); console.log(newSkill);
    return newSkill;
}

function cloneSkillWithKey( skill, key ) {
    var newSkill = new Skill();
    var baseSkill = ( key && key.match(/^language$/i) ) ? null : Skills[key];
  //  if( baseSkill && key=="Language" ) alert("[cloneSkillWithKey] found a baseSkill "+JSONstring.make(baseSkill));
    if( !baseSkill ) baseSkill = Spells[key];
    for( var prop in baseSkill ) {
        if( prop=='TLs' ) { continue; }     // there are actually several of these; want an if( grep prop in propsToSkip )...
        if( prop=='specRequiredList' ) { continue; }
       // if( key=="Language" ) alert("[cloneSkillWithKey] copying baseSkill '"+baseSkill.name+"' property "+prop+": "+baseSkill[prop]);
        newSkill[prop] = baseSkill[prop];
    }
  //  alert("[cloneSkillWithKey] after attempt to find base skill, newSkill is "+JSONstring.make(newSkill));
    for( var prop in skill ) {
       // if( key=="Language" ) alert("[cloneSkillWithKey] copying skill '"+skill.name+"' property "+prop+": "+skill[prop]);
        newSkill[prop] = skill[prop];
    }
    return newSkill;
}

function cloneSkill1( oldSkill, chCopy ) {
    newSkill = new Skill();
    newSkill.name  = oldSkill.name;
    newSkill.attribute  = oldSkill.attribute;
    newSkill.difficulty = oldSkill.difficulty;
    // The Skill.prototype generic public methods already exist in newSkill.
    // Only 2 might not be generic in oldSkill (chHasPrereqs, and level).   THIS MAY HAVE CHANGED
    // Copy these, if they exist, this way:
    if( oldSkill.chHasPrereqs ) { newSkill.chHasPrereqs = oldSkill.chHasPrereqs; } // note no parenths - copies the function, not the value calculated by the function
    if( oldSkill.level )        { newSkill.level        = oldSkill.level; }

    /* What about Skill.TLs, Skill.specRequiredList, and Skill.TLspecs? */
    // If I'm creating a TL/spec-specific Skill from a template Skill in the Skills object,
    //  I deal with these attributes separately.  So I won't copy them in this case.
    // But this also means that if I'm copying from an existing Character,
    //  these will be gone already, turned into TL and specialization attributes.
    // So these attributes should NOT be copied in a clone.

    // These should only be copied if a flag is provided - copying from an existing Character
    if( chCopy ) {
        newSkill.points         = oldSkill.points;
        newSkill.TL             = oldSkill.TL;
        newSkill.specialization = oldSkill.specialization;
       // newSkill.hasVersion     = oldSkill.hasVersion;
    }

    return newSkill;
}

// Functional version of GURPS skill cost tables
// DEPRECATED; now using Skill.pointsToLevel instead
function skillPtsToLevel( points, attLevel, difclty, baseAtt ) {
//     // e3 Eidetic Memory adjustment
//     if( document.loadedCharacter.hasTrait('EideticMemoryE3') && baseAtt=='IQ' /* no way in this context to check spell status */ ) {
//         points *= 2*document.loadedCharacter.getTrait('EideticMemoryE3').levels;
//     }
//     // two regimes, linear and exponential, joined at an inflection point
//     var inflectionPt = ( baseAtt=='IQ' ) ? 2 : 8;		// 3rd edition rules
//     if( document.loadedCharacter.gameInfo.ruleset.match('e4') || difclty==3 ) { inflectionPt = 4; }
//     // deal with exponential case first
//     if( points<inflectionPt ) {
//         // inverse of formula below to calculate points from level (with att & dif as params)
//   //       alert("skillPtsToLevel is returning "+attLevel+' + Math.log('+points+')/Math.log(2) - '+difclty);
//         return attLevel + Math.floor( Math.log(points)/Math.log(2) ) - difclty;
//     }
//     // linear case
//     else {
//         var adj = Math.floor( Math.log(inflectionPt)/Math.log(2) ) - 1;
//   //       alert("skillPtsToLevel is returning "+attLevel+' + Math.floor('+points+'/'+inflectionPt+') - '+difclty+' + '+adj);
//          return attLevel + Math.floor(points/inflectionPt) - difclty + adj;
//  //       return attLevel + Math.floor(points/inflectionPt) - difclty + 1;
//     }
}

// calculates backwards - how many points to get a given skill level
function skillLevelToPts( level, attLevel, difclty, baseAtt ) {
//     var adjLev = level - attLevel + difclty;
// 	//alert("in skillLevelToPts\n"+level+" - "+attLevel+" + "+difclty+" = "+adjLev);
//     var inflectionPt = ( baseAtt=='IQ' ) ? 2 : 8;		// 3rd edition rules
//     if( document.loadedCharacter.gameInfo.ruleset.match('e4') || difclty==3 ) { inflectionPt = 4; }
// //     if( adjLev < -1 ) {
// //  //       alert('skillLevelToPts returning 0');
// //         return 0;
// //     }
// //     else
//     var points = ( adjLev < 4 ) ? Math.pow( 2, adjLev ) : inflectionPt*(adjLev - 0);
//     // before returning, need to adjust for e3 Eidetic Memory
//     if( document.loadedCharacter.hasTrait('EideticMemoryE3') && baseAtt=='IQ' /* no way in this context to check spell status */ ) {
//         points /= 2*document.loadedCharacter.getTrait('EideticMemoryE3').levels;
//     }
//     return ( document.loadedCharacter.gameInfo.ruleset.match('e4') ) ? Math.floor(points) : Math.floor(2*points)/2;
};

// this function is fired when the points field of a skill on the c-sheet is changed
function changePoints( skillIndex, pts ) {
  // console.log("in changePoints( "+skillIndex+", "+pts+" )");
    if( !skillIndex ) { return false; }
    if( pts=='-' ) { document.loadedCharacter.skills[skillIndex].dash = true; pts = 0; }
    else  document.loadedCharacter.skills[skillIndex].dash = false;
    if( isNaN(pts) )  { alert("points must be numbers"); return false;  }
    if( pts<0 )       { alert("points must be positive"); return false; }
    if( document.loadedCharacter.gameInfo.ruleset.match('e3') && !(2*pts%1==0) ) {
        alert("points must be in multiples of 0.5");
        return false;
    }
    if( document.loadedCharacter.gameInfo.ruleset.match('e4') && !(pts%1==0) ) {
        alert("only whole numbers of points are allowed");
        return false;
    }
    document.loadedCharacter.skills[skillIndex].points = 1*pts;
}
// does this actually belong in character.js?

    function buildStringForPrereqTree(PrereqTree) {
        var prereqStringArray = [];
        for( var t in PrereqTree ) {
            var prereqError = false;
            // print a structured statement
            var pGroupArray = PrereqTree[t];
            if( !pGroupArray ) continue;
      //      alert( JSONstring.make(pGroupArray) );
            var pGroupStringArray = [];
            for( var k=0; k<pGroupArray.length; k++ ) {
                var PrereqObj = pGroupArray[k];
                var prereq = PrereqObj.prereq;
                var prereqSpec = ( PrereqObj.hasOwnProperty('prereqSpec') ) ? PrereqObj.prereqSpec : null;
                var prereqSkill = Skills[prereq];
                var prereqSpell = Spells[prereq];
                var prereqTrait = Traits[prereq];
                var prereqGroup = Groups[prereq];
                // what about stat prereqs?
                var num = ( PrereqObj.hasOwnProperty('number') ) ? PrereqObj.number : '';
                var prereqType = '';
                var prereqName = '';
                var prereqLevel = '';
                if( prereqSkill ) {
                    prereqType = 'skill';
                    prereqName = prereqSkill.name;
                    if( prereqSpec ) prereqName += ' ('+prereqSpec+')';
                    prereqLevel = ( ruleset.match(/e3/) ) ?  '-12' : '';
                    if( PrereqObj.hasOwnProperty('level') ) prereqLevel = '-'+PrereqObj.level;
                }
                else if( prereqSpell ) {
                    prereqType = 'spell';
                    prereqName = prereqSpell.name;
                    prereqLevel = ( ruleset.match(/e3/) ) ?  '-12' : '';
                    if( PrereqObj.hasOwnProperty('level') ) prereqLevel = '-'+PrereqObj.level;
                }
                else if( prereqTrait ) {
                    prereqType = 'trait';
                    prereqName = prereqTrait.name;
                    if( PrereqObj.hasOwnProperty('level') ) prereqLevel = '-'+PrereqObj.level;
                }
                else if( prereqGroup || num ) {
                    prereqType = 'group';
                    prereqName = prereq;
                    num = PrereqObj.number + ' ';    // can get this as num = ( PrereqObj.hasOwnProperty('number') ) ? PrereqObj.number : 'nope';
                    // figure out how to use that cross-check (is it a group vs does it have the number attribute) - should there ever be a difference?
                    // this is something that should be reported: if the prereq object has the 'number' attribute, then the 'prereq' attribute should point to a Group object entry.
                    // like concerns.push('prereq has number attribute but no corresponding group');
                    // or vice-versa?
                    if( !prereqGroup ) {
                        prereqType += ', <span style="color:red">not found</span>';
                        prereqError = true;
                    }
                }
                else if( PrereqObj.hasOwnProperty('category') && PrereqObj.category.match('stat') ) {
                    prereqType = 'attribute';
                    prereqName = prereq;
                    if( PrereqObj.hasOwnProperty('level') ) prereqLevel = ' '+PrereqObj.level+'+';
                }
                else {   // prereq not found
                    prereqType = '<span style="color:red">prerequisite object not found</span>';
                    prereqName = prereq;
                    prereqError = true;
                }
                pGroupStringArray.push( num + '<i>'+prereqName+'</i>' + prereqLevel /*+ ' ['+prereqType+']'*/ );
            }
            // join pGroupStringArray with 'OR', and enclose in parenths if more than one
            var pGroupString = pGroupStringArray.join('&emsp;OR&emsp;')
            if( pGroupStringArray.length>1 /* && prereqStringArray.length>1 */ ) pGroupString = '[ '+pGroupString+' ]';
            var Zclass = ( prereqError ) ? 'class="errorZ"' : '';
            prereqStringArray.push( '<span '+Zclass+'>' + pGroupString + '</span>' );
        }
        return prereqStringArray;
    }

    function setFactor(PrereqTree) {
        // If PrereqTree has the form (A or B) and (A or C), return A or (B and C)
        // elements (A, B, etc.) here are prerequisite objects
    }

/*  Updated documentation - may be incomplete

    I'm using a Skill object with prototyped members,so many methods don't need to be defined each time.
    Creation (in the context of the Skills object - 'this') now looks like this:

        this.SkillLabel = new Skill( 'Skill Name', 'IQ', 1, 'rules reference' );

    'this.SkillLabel' would be 'this.SkillLabel_specialization_', if defining a specialized skill directly
    'this.SkillLabel.name' would then be printed as 'Skill Name (specialization)'
    The second parameter (attribute) can be IQ, DX, etc., or a secondary attribute like Will, Per, etc.
    The third parameter (difficulty) is encoded thus: 0=easy, 1=average, 2=hard, 3=very hard
    The fourth parameter is a rules page reference string, e.g. "Basic Set - Characters, pg 212" - it is optional.
    These four parameters exist for EVERY Skill, so they can be passed to the constructor.

    For basic skills, this is all.
    Defaults, prerequisites, adjustments for traits, etc. are all now dealt with using separate
    data structures that act like linking tables in a database: Defaults, Adjustments, Prerequisites

    * When the skill has TLs or specializations, there are special members added
      when the prototype Skill is defined:

        this.SkillLabel.TLs = true;  (or you can use an array like [ 3, 4, 5, 6 ] if skill is only available at certain tech levels, and has no specializations)
                                      Leave undefined if the Skill is the same at all tech levels.
        this.SkillLabel.specRequiredList = [ 'specName1', 'specName2', etc ],   // array: use to list available specializations, if tech level isn't relevant
                                         = [] use an empty array to indicate that specialization is required without listing; Select Skill will insist on entry
        this.SkillLabel.TLspecs          = {  specialization1 : [ 3, 4, 5 ],     // use this sub-object (hash) to decide which TL/spec combination versions
                                              specialization2 : [ 5, 6, 7, 8 ],  // of a skill to generate if using an init method, etc.
                                              specialization3 : [ 8, 9, 10 ] }   // Use this technique only if certain TL/specialization combinations are forbidden.
                                              // could just do lowest and highest; i.e.: spec1 : [2, 5]
          TLspecs is not being used.

      For skill spec/TL groups with complicated differences in prerequisites, defaults,
      etc., some skill variants may be defined as a separate skills.

    * These are 'optional' attributes (should be added when Skill is 'taken' by a Character, as needed):

        this.SkillLabel.shortname        =  text;
        this.SkillLabel.TL               =  7;
        this.SkillLabel.optSpecs         =  2;  (absent, 1, or 2, for how many optional specializations taken)  DEPRECATED?  I don't see any use of this attribute below.
        this.SkillLabel.specialization   =  text, instance; contains EXACTLY ONE specialization taken by character
        this.SkillLabel.specializationOf = 'parentSkill';  (what about this?  could I then do some sweet inheritance-fu?)  DEPRECATED?  I don't see any use of this attribute below.
        this.SkillLabel.OptSpecsArray    =  array, instance; contains one or two optional specializations taken by character
*/

function Skill( name, attribute, difficulty, reference ) {
    //if( !(this instanceof Skill) ) return new Skill( name, attribute, difficulty, reference );
    //if( !attribute ) return;
    this.name  = name;
    this.attribute  = attribute;
    this.difficulty = difficulty;
    this.reference  = (reference) ? reference : 'USER';
    this.points     = 0;
    this.type       = ( attribute && attribute.match(/IQ/i) ) ? 'M' : 'P';
}

/* Skill public methods */

//Skill.prototype.has = function() { return this.points<1 ? false : true; }  // Character object has a similar method

Skill.prototype.Points = function() {  // Character object has a similar method (can't use 'points' because that's already a non-function member)
    if( this.dash && this.points==0 ) return '-';
    // assume this.points is a multiple of 0.5; should be assured in changePoints above
    // if this.points is not an integer, subtract 0.5 and concat a '½' to the integer part
    // (can't use &frac12; because it goes into an input)
    if( document.loadedCharacter.preferences.display.fractions && !(this.points%1==0) )
        return ((this.points==0.5) ? '' : this.points-this.points%1) + '½';
    return 1*this.points;
}

Skill.prototype.isInGroup = function( groupLabel ) {
 //   console.log('Is '+this.name+' in the '+groupLabel+' group?');
    if( !Groups[groupLabel] ) return false;
  // if( groupLabel.match(/move/i) )
  //     console.log("[Skill.isInGroup] is "+this.name+" in the "+groupLabel+" group?\n  "+Groups[groupLabel].join("\n  "));
    for( var i=0; i<Groups[groupLabel].length; i++ ) {
        if( Groups[groupLabel][i]==this.key ) return true;
    }
    return false;
}

Skill.prototype.groupsIsIn = function() {
    var groupNames = [];
    for( const k in Groups ) {
        if( Groups.hasOwnProperty(k) && Groups[k].indexOf(this.key)>-1 ) groupNames.push(k);
    }
    // always add Spells group for a spell (and add the spell to the Spells group, if it isn't there already)
    if( groupNames.indexOf('Spells')<0 && this.hasOwnProperty('spell') && this.spell ) {
        groupNames.push('Spells');
        if( Groups['Spells'].indexOf(this.key)<0 ) Groups['Spells'].push(this.key);
    }
    return groupNames;
}

// returns a slice of the Prerequisites library object, consisting of items with target = Skill.key
// (also attaches a useful 'length' property)
Skill.prototype.prerequisitesFor = function() {
    var ch = document.loadedCharacter;
    var matchingPrereqs = {};
    var n = 0;
   // alert("[prerequisitesFor] looking for Prerequisite items matching "+this.key);
    for( var x in Prerequisites ) {
        var prereqItem = Prerequisites[x];
        // console.log("[prerequisitesFor] checking Prereq item "+x);
        // console.log(prereqItem);
        var target = prereqItem.target;
       // if( target.match(/illusion/i) ) alert("[prerequisitesFor] what about "+JSONstring.make(prereqItem));
        if( target==this.key ) {
           // alert("[prerequisitesFor] looking at "+JSONstring.make(prereqItem));
            // check for a type match before concluding that this prereq actually applies?
//             if( prereqItem.hasOwnProperty('targetCat') ) {
//                 if( !this.hasOwnProperty( prereqItem.targetCat ) ) { continue; }
//             }
            if( Spells.hasOwnProperty(prereqItem.target) && !this.hasOwnProperty('spell') ) continue;
            matchingPrereqs[x] = prereqItem;
            n++;
        }
        // console.log("[prerequisitesFor] finished with Prereq item "+x);
    }
    matchingPrereqs.length = n;
    return matchingPrereqs;
}

// returns a slice of the Defaults library object, consisting of items with target = Skill.key
// (also attaches a useful 'length' property)
Skill.prototype.defaults = function( subset ) {
    var ch = document.loadedCharacter;
    var matchingDefaults = {};
    var n = 0;
    for( var x in Defaults ) {
        var defaultItem = Defaults[x];
        if( defaultItem.target==this.key ) {
            // check for a specialization match before concluding that this default actually applies
            if( defaultItem.hasOwnProperty('targetSpec') ) {
                if( this.specialization != defaultItem.targetSpec ) { continue; }
            }
            //if( subset && (defaultItem.category || subset.match(/sk/i)) && !defaultItem.category.match(subset) ) continue;
            matchingDefaults[x] = defaultItem;
            n++;
        }
    }
    matchingDefaults.length = n;
    return matchingDefaults;
}

// returns a pgroup-structured Prerequisites tree
Skill.prototype.structuredPrereqsFor = function(bind) {
    var ch = document.loadedCharacter;
    var structuredPrereqs = {};
    var alpha = 'abcdefghijklmnopqrstuvwxyz';
    var letters = alpha.split('');
    var li = 0;
    for( var pi in Prerequisites ) {
        var PrereqObj = Prerequisites[pi];
        var target = PrereqObj.target;
         //if( target.match(/Physics/i) )
         // alert("[structuredPrereqsFor] what about "+JSONstring.make(PrereqObj));
        if( this.key==target ) {   // alert(this.key+' matches '+target);
            // check for specialization match
            if( PrereqObj.hasOwnProperty('targetSpec') && this.hasOwnProperty('specialization') ) {
                 if( PrereqObj.targetSpec!=this.specialization ) { continue; }
            }
           // alert( JSONstring.make(PrereqObj)+"\n\n matches "+this.key+'; including');
        //    if(bind) ch.attachLinker( PrereqObj, pi );
            var pgroup = ( PrereqObj.hasOwnProperty( 'pgroup' ) ) ? PrereqObj.pgroup : letters[li++];
            if( !structuredPrereqs[pgroup] ) structuredPrereqs[pgroup] = [];
            structuredPrereqs[pgroup].push( PrereqObj );
        }
    }
    return structuredPrereqs;
}
/* This function is ALMOST independent of skill objects.
  I need a totally independent version; so I'm going to have to copy this to gurps.js and adapt it.
  That means there will be two versions, and that probably means I should remove this one here, 
  and shift all of its usage to the new function.  Sometime. */

Skill.prototype.chHasPrereqs = function(ch,bind) {   // method version to use the Prerequisite library object

    if(!ch) ch = document.loadedCharacter;
    // alert("[skill.chHasPrereqs] does "+ch.name+" have the prerequisites for the "+this.name+" skill?");

    /* Magery alternatives - short-circuit the normal spell prerequisites */
    // These are ad-hoc.  What if a new advantage comes along that does something similar?
    if( this.spell ) {
      // console.log("looking for prereqs for '"+this.name+"' spell");
        if( ch.hasTrait('PowerInvestiture') ) { return true; }
        else if( ch.hasTrait('MageryRitual') ) {
            var colleges = this.spellColleges();
            for( var c in colleges ) {
                var collegeName = colleges[c];
                // does the character have the appropriate 'path' skill?
                // wait - do I need to do this?  this is prerequisites, here.
                // "Each spell is a Hard technique with a default to the associated college skill."
                // I interpret this to mean that each spell technique has its basis college skill as a prerequisite.
                // So yes, I do need to do this here.
                var tokens = collegeName.split(':');
                var collegeLabel = tokens[0].replace(/\W+/g,'');
                var pathSkillLabel = 'Pathof'+collegeLabel;
              //  alert("looking for "+pathSkillLabel+" path skill");
                if( ch.hasSkill(pathSkillLabel) ) return true;
            }
            return false;
        }
    }

    var matchingPrereqs = this.structuredPrereqsFor(bind);
//     if( this.key=="Flight" )
//         console.log( matchingPrereqs );

    /* Maneuvers and Techniques come with their own embedded prerequisites
       (unless they have not yet been taken by character) */
    if( this.attribute=="M" || this.attribute=="T" && this.hasOwnProperty("useDefaultFrom") ) {
        // build a new matchingPrereqs and sub in
        matchingPrereqs = {
            'a': [
                {
                    'target': this.key,
                    'prereq': this.useDefaultFrom.key
                }
            ]
        };
      //  alert( JSONstring.make( matchingPrereqs ) );
    }

    // analyze all items in the matchingPrereqs object list
  PREREQS:
    for( let pgp in matchingPrereqs ) {
        let pgroupList = matchingPrereqs[pgp];
      //  alert( JSONstring.make( pgroupList ) );

        // now iterate over the pgroup list of prerequisite objects
        var pgroupSatisfied = false;    // Set to 'true' whenever a prerequisite is satisfied.
      PGROUPLIST:
        for( let k=0; k<pgroupList.length; k++ ) {
            var prereqItem = pgroupList[k];
            var pKey = prereqItem.prereq;
//             if( this.key=="Flight" && pKey.match(/magery/i) )
//             console.log("prerequisite "+pgp+"["+k+"]\n"+JSONstring.make(prereqItem));

        /*  Alternative code refactor
          There are cases where it would be nice to know if a *single* prereq item is satisfied,
          rather than the aggregate set of prerequisites.  This question is best answered in the
          Character object, by a hasThisPrereq() function.  Such a function would encompass the code
          from here down to the end of the matchingPrereqs loop.  After the refactor, the code
          below could become just

            pgroups[pgroup] = ch.hasThisPrereq( prereqItem );

          or something similar.
        */
            var justify = false;  // turns on alerts stating justification for prerequisite satisfaction

            // assess this Prerequisite, to see if it is satisfied for this Character
            if( Spells.hasOwnProperty(pKey) && !this.hasOwnProperty('spell') ) {
                // no skill has any spell as a prerequisite, so such prerequisites are automatically satisfied
                // set pgroupSatisfied as 'true' and go to the next item in the PGROUPLIST
                // alert('spell prerequisite ('+pKey+') for a skill ('+this.name+')');
                pgroupSatisfied = true;  if(justify) alert('satisfied because no skill has a spell as a prereq');
            }
            else
            if( pKey=='override' ) {
                // set pgroupSatisfied as 'true' (loop will set this pgroup as satisfied, and go to the next pgroup)
               // alert('overridden prerequisite');
                pgroupSatisfied = true;  if(justify) alert('satisfied because overridden');
            }
            else
            if( prereqItem.hasOwnProperty('category') && !prereqItem.category.match(/sk|sp/i) ) {  // trait or attribute prereq
                var cat = prereqItem.category;
                // search character's (dis)advantages, stats, or whatever is indicated by cat
                // console.log('ch has the '+pKey+' trait: '+ch.hasTrait(pKey));
                // console.log('ch has traits matching '+pKey+': '+ch.getMatchingTraits(/magery/i).length);
                if( cat.match(/ad|di/i) ) {
                    // check Magery prerequisites first using collector to sum all applicable Magery ads
                    if( pKey.match(/magery/i) ) {
                        let sumMageryLevels = 0;
                        let matchedTraits = ch.getMatchingTraits(/magery/i);
                        for( let t=0; t<matchedTraits.length; t++ ) {
                            let matchedTrait = matchedTraits[t];
                            sumMageryLevels += matchedTrait.levels;
                            // console.log("added "+matchedTrait.levels+" levels to Magery collector (source: "+pKey+"); now at "+sumMageryLevels+" levels");
                            if( sumMageryLevels>=prereqItem.level ) { pgroupSatisfied = true; }
                        }
                    }
                    // independently, check for traits matching the prereq
                    if( ch.hasTrait(pKey) ) {

                        let chTrait = ch.getTrait(pKey);
                        if( prereqItem.hasOwnProperty('level') ) {
                            if( chTrait && chTrait.hasOwnProperty('levels') && chTrait.levels>=prereqItem.level ) {
                                pgroupSatisfied = true;
                                if(justify) alert('satisfied because '+ch.name+' has enough levels of '+chTrait.name);
                            }
                            // else {console.log("prerequisite "+pgp+"["+k+"]\n"+JSONstring.make(prereqItem)+"\nwas not satisfied because "+ch.name+' does not have enough levels of '+chTrait.name+".")}
                        }
                        else {
                            pgroupSatisfied = true;   if(justify) alert('satisfied because '+ch.name+' has '+chTrait.name);
                        }

                    }
                }
                else if( cat.match('stat') ) {
                    // this assumes that the pKey will exactly match an attribute or secondary characteristic
                    // (i.e., ST, DX, IQ, HT, FP, HP, Will, Per, etc.)
                    if( ch[pKey]() >= prereqItem.level ) {
                        pgroupSatisfied = true;  if(justify) alert('satisfied because '+ch.name+' has a high enough '+pKey);
                    }
                }
                if(pgroupSatisfied) break PGROUPLIST;
                // else console.log("prerequisite "+pgp+"["+k+"]\n"+JSONstring.make(prereqItem)+"\nwas not satisfied.");
            } // end 'category' branch
            else
            if( prereqItem.hasOwnProperty('number') ) {
                // indicates that the prereq is a group, like 'Earth' for Earth-college spells
                // So, first, figure out which group of spells (or what-have-you) to look for (this may be the hard part)
                //   1.  look for exact match of 'prereq' to a property of the Groups object
                //   2.  if that fails, try to match the start of the prereq to a property of the Groups object
                //       (i.e., prereq may be 'Ne'; try to match to Group property 'Necromantic' . . . this is STILL tricky)
                // then, loop over the spells/skills character already has
                // count how often a skill from the group appears in the character group
                // if that number matches or exceeds 'num', return true.
                //
                // There are other cases to deal with too:
                // The Conducting prerequisite can be satisfied with proficiency in 2 Musical Instruments.
                // These are not a group, but a single skill with different specializations.
                // So the first check will be to see if the prereq is a key for the Groups object.
                // If so, do what's described above.
                // If not, assume
                // another case is language prerequisites
                // in 3e, these are skill prerequisites, and fall into the net with little trouble
                // in 4e, these are TRAIT prereqs, and probably require their own branch here

               // if( this.key=='RemoveCurse' )
               // alert("target '"+prereqItem.target+"' has a numeric prerequisite:\n"+JSONstring.make(prereqItem));
                //console.log("[Skill.chHasPrereqs] target '"+prereqItem.target+"' has a numeric prerequisite:");
                //console.log(prereqItem);
                var num = prereqItem.number;
                if( Groups.hasOwnProperty(pKey) ) {
                    var Group = Groups[pKey];
                 // if( this.key=='RemoveCurse' )
                 //   alert("found a group matching '"+pKey+"':\n"+JSONstring.make(Group));
                    var count = 0;

                    if( prereqItem.hasOwnProperty('meta') ) {
                       // alert("meta prereq for group "+pKey+":\n"+JSONstring.make(prereqItem));
                        var multiplicity = ( prereqItem.hasOwnProperty('mult') ) ? prereqItem.mult : 1;
                        // presumably we already have a meta-list, since Group exists, so loop over these
                      METAGROUP:
                        for( var g=0; g<Group.length; g++ ) {
                            // each g is a key in Groups too, so
                            var group = Group[g];

                            /* I don't think this exclusion is supported in the rules! */
                            // skip any group that 'this' is a member of
                           // alert(count+": Should I count the "+group+" college/group? checking to see if "+prereqItem.target+" is a member of that group...");
                           // if( Groups[group].indexOf(prereqItem.target)>=0 ) console.log("### skip the "+group+" college/group! "+prereqItem.target+" is a member. ###");;
                           // if( Groups[group].indexOf(prereqItem.target)>=0 ) continue;

                           // alert('looking in '+group+' group');
                            // now do the same kind of loop as below
                            var mult = 0;
                            for( var s in ch.skills ) {
                                var chSkill = ch.skills[s];
                                if( !chSkill.name ) continue;           // skip formatting 'skills'
                                if( chSkill.key==this.key ) continue;   // skip 'this' skill
                                // if chSkill is in Group, increment mult
                               // alert('checking for '+chSkill.key+' in '+group+":\n"+Groups[group]);
                               // console.log('checking for '+chSkill.key+' in '+group+":\n"+Groups[group]);
                                // adding '&& Groups[group]' condition, since prereqs may be attached to character with targets that don't exist in present library
                                if( chSkill.points>=1 && Groups[group] && Groups[group].indexOf(chSkill.key)>=0 ) {
                                    mult++;
                                   // console.log('  found '+chSkill.name+' from the '+group+' college/group');
                                   // alert('found '+mult+' in '+group+' group (need '+multiplicity+')');
                                }
                                // if multiplicity requirement is reached, increment count and exit inner loop
                                if( mult>=multiplicity ) {
                                    count++;
                                    continue METAGROUP;
                                }
                            }
                        }
                    }
                    else {
                        // do the loop over character skills/spells to count things
                        for( var s in ch.skills ) {
                            var chSkill = ch.skills[s];
                            // skip 'this' skill
                            if(chSkill.key==this.key) continue;
                            // if chSkill is in Group, increment count
                            if( chSkill.points>=1 && Group.indexOf(chSkill.key)>=0 ) count++;
                        }
                    }

                    // check prerequisite condition after all members of the Group have been examined
                // if( this.key=='Wisdom' )
                 //  alert("character has "+count+" (other) '"+pKey+"' spells");
                   // console.log("character has "+count+" (other) '"+pKey+"' spells to satisfy the prerequisite for "+prereqItem.target+"; needs "+num);
                    if( count >= num ) {
                        pgroupSatisfied = true;  if(justify) alert('satisfied because '+ch.description.name+' has '+count+' '+pKey);
                    }
                  //  else { alert(ch.description.name+" does not have "+num+" skills/spells from '"+pKey+"'."); }
                }
                else if( ch.gameInfo.ruleset.match('e4') && pKey=="Languages" ) {  // console.log("[Skill.chHasPrereqs] Languages branch");
                    var count = 0;
                    for( var t in ch.traits ) {
                        var chTrait = ch.traits[t];
                        //console.log("[Skill.chHasPrereqs] Language?"); console.log(chTrait);
                        if( chTrait.key=="Language" && chTrait.description==prereqItem.description && (chTrait.levels>=prereqItem.level || chTrait.cost==-1) ) {
                            console.log("[Skill.chHasPrereqs] 4e Language meeting requirements; incrementing count");
                            count++;
                        }
                        console.log('[Skill.chHasPrereqs] '+ch.description.name+' now has '+count+' '+pKey);
                    }
                    if( count >= num ) {    console.log('[Skill.chHasPrereqs] Language prereq satisfied because '+ch.description.name+' has '+count+' '+prereqItem.description+' '+pKey);
                        pgroupSatisfied = true;  if(justify) alert('satisfied because '+ch.description.name+' has '+count+' '+pKey);
                    }
                }
                else {    // asks for number, but not a Group.  assume prereq targets are skills.
                    // assume prerequisite is something like "3 languages at skill 10+" (Gift of Tongues/Letters, 3e) or "any two Musical Instrument skills" (Group Performance; Conducting specialization)
                    // { target: 'GiftofTongues', number: 3, prereq: 'Languages', level: 10 }
                    var count = 0;
                    for( var s in ch.skills ) {
                        var chSkill = ch.skills[s];
                        if( chSkill.key==pKey || (pKey=="Languages" && (chSkill.key=="Language" || chSkill.key=="Native language")) ) {
                            console.log("[Skill.chHasPrereqs] key match. Language?"); console.log(chSkill);
                            if( ch.gameInfo.ruleset.match('e4') && chSkill.points>=1 ) {
                                if( prereqItem.hasOwnProperty('level') ) {
                                    if( chSkill.level()>=prereqItem.level ) count++;
                                }
                                else count++;   // no level required, so increment count
                            }
                            else {    // 3e case, where skill levels are usually specified
                                console.log("[Skill.chHasPrereqs] requirement: chSkill.level ["+chSkill.level()+"] >= prereqItem.level ["+prereqItem.level+"]");
                                if( prereqItem.hasOwnProperty('level') && chSkill.level()>=prereqItem.level ) {
                                    console.log("[Skill.chHasPrereqs] 3e skill meeting requirements; incrementing count");
                                    count++;
                                }
                                // no default case, I think
                            }
                        }
                    }
                    // console.log("found "+count+' '+pKey+" skills");
                    if( count >= num ) {    console.log('[Skill.chHasPrereqs] 3e skill prereq satisfied because '+ch.description.name+' has '+count+' '+pKey+' skills');
                        pgroupSatisfied = true;   if(justify) alert("Prerequisite\n"+JSONstring.make(prereqItem)+"\nis satisfied; "+count+" "+prereqItem.prereq+" items found");
                    }
                }
            } // end 'number' branch
            else {
              // alert("looking for a standard skill/spell prerequisite: "+pKey);
              // alert("ch.skills:\n"+JSONstring.make(ch.skills))
                for( var s in ch.skills ) {
                    var putvPrereqSkill = ch.skills[s];
                    if( putvPrereqSkill.key==pKey ) {
                      //  alert("found a key-matching skill");
                      // if( this.key=="RepelAnimal" )
                        // alert("testing "+putvPrereqSkill.name+":\n"+JSONstring.make(putvPrereqSkill));
                        if( prereqItem.hasOwnProperty('prereqSpec') && prereqItem.prereqSpec=='same' ) {
                            if( this.specialization!=putvPrereqSkill.specialization ) {
                                // alert("rejected because user-defined specializations don't match");
                                continue;
                            }
                        }
                        else if(   ( prereqItem.hasOwnProperty('prereqSpec') && putvPrereqSkill.hasOwnProperty('specialization') )
                                && ( prereqItem.prereqSpec!=putvPrereqSkill.specialization ) ) {
                            // alert("rejected because pre-defined specializations don't match");
                            continue;
                        }
                      // if( this.key=="RepelAnimal" )
                        // alert(putvPrereqSkill.name+" passes type and specialization match filters");
                        var reqLevel = ( prereqItem.hasOwnProperty('level') ) ? prereqItem.level : 12;
                        if( ch.gameInfo.ruleset.match('e3') ) {   // 3e: pKey skill must be known at level 12+
                          // if( this.key=="MinorHealing" )
                          //   alert("level of putative prerequisite skill: "+putvPrereqSkill.level()+"\nrequired level: "+reqLevel);
                            if( putvPrereqSkill.level() >= reqLevel ) {
                                pgroupSatisfied = true;  if(justify) alert('satisfied because '+ch.name+' has '+putvPrereqSkill.name+' at level '+putvPrereqSkill.level());
                            }
                        }
                        else {        // 4e: pKey skill must have at least 1 point applied to it
                          // alert(JSONstring.make(putvPrereqSkill));
                            if( putvPrereqSkill.points >= 1 ) {
                                // but there may also be a level requirement
                                if( prereqItem.hasOwnProperty('level') ) {
                                    if( putvPrereqSkill.level() >= reqLevel ) {
                                        pgroupSatisfied = true;  if(justify) alert('satisfied because '+ch.name+' has '+putvPrereqSkill.name+' at level '+putvPrereqSkill.level());
                                    }
                                }
                                else {
                                    pgroupSatisfied = true;  if(justify) alert('satisfied because '+ch.name+' has '+putvPrereqSkill.points+' points in '+putvPrereqSkill.name);
                                }
                                // if no level requirement, having 1+ points is enough
                                // alert(putvPrereqSkill.name+" has points")
                            }
                        }
                    }
                    //  if( this.key=="Shiphandling" && pgroupSatisfied )
                    //  alert(putvPrereqSkill.name+" satisfies prerequisite group "+pgp);
                }
                // No need to check further if one Prerequisite in a pgroup list is found to be satisfied.
                // alert('pgroupSatisfied: '+pgroupSatisfied);
                if(pgroupSatisfied) break PGROUPLIST;
                // else alert("prerequisite "+pgp+"["+k+"]\n"+JSONstring.make(prereqItem)+"\nwas not satisfied.");
            }
        }
        // If at least one of the Prerequisites in each pgroup list is satisfied, we'll return 'true'.
        // But if the loop over a pgroup list finishes with NO Prerequisites in that list satisfied,
        //  then we can and must immediately return 'false'.
        if( !pgroupSatisfied ) return false;

    } // end loop over matchingPrereqs

    // if every pgroup list is traversed without tripping the pgroupSatisfied trigger,
    return true;
}

Skill.prototype.attributeDefault = function() {
    // look at all items in the Defaults object list
    var DefaultsFound = {};
    for( var x in Defaults ) {
        var defaultItem = Defaults[x];
        // pick out those with a target equal to this Skill's key
        // alert("skill key:"+this.key+"\nDefault item target: "+defaultItem.target);
        if( defaultItem.target==this.key ) {
            // must check for specialization match before doing the defaultItem.penalty===false check
            if( this.specialization && defaultItem.targetSpec && this.specialization!=defaultItem.targetSpec ) continue;
          // if( this.key=='Piloting' )
          //   alert("found a default item:\n"+JSONstring.make(defaultItem));
            if( defaultItem.penalty===false ) { DefaultsFound[x] = 0; continue; }  // default level from this attribute is zero, but keep looking
            // I THINK this branch tries to filter out non-attribute defaults . . . ?
            if( !defaultItem.category || defaultItem.category=='stat' || defaultItem.from.match(/DX|IQ|HT|ST|Will/) ) {
             //   var defaultFrom = defaultItem.from;
             //   var penalty = defaultItem.penalty;
                if( document.loadedCharacter[defaultItem.from] )    // this may take care of missing category attributes
                    DefaultsFound[x] = Math.min( 20, document.loadedCharacter[defaultItem.from]() ) + defaultItem.penalty;
            }
            // if( defaultItem.category.match('stat') ) {}
        }
    }
  // if( this.key=='Piloting' )
  //   alert(JSONstring.make(DefaultsFound));
    // take the best one found AMONG THOSE THAT COME FROM AN ATTRIBUTE
    var bestDefault = 0;
    var defaultsWereFound = false;
    for( var y in DefaultsFound ) {
        defaultsWereFound = true;
        if( DefaultsFound[y]>bestDefault ) bestDefault = DefaultsFound[y];
    }
    if( defaultsWereFound ) return bestDefault;

    // you only get to here if NO other defaults were found
    return ( this.attribute=='M' || this.attribute=='T' )
        ? 0
        : Math.min( 20, document.loadedCharacter[this.attribute]() ) - (1*this.difficulty+4);
}

Skill.prototype.adjustmentsTo = function() {

    var AdjSlice = {};
    var key = this.key;

    for( var x in Adjustments ) {
        var adjustmentItem = Adjustments[x];
        var target = adjustmentItem.target;

        // select those with a target equal to this Skill's key, or that fit into a category containing this Skill
        var keep = false;
        if( target==this.key )
            keep = true;
        else if( target=='Spells' && this.hasOwnProperty('spell') && this.spell )
            keep = true;
        else if( adjustmentItem.targetCategory && adjustmentItem.targetCategory.match(/CL|GR/i) ) {
            var group = Groups[target];
            var grepped = (group)
                        ? $.grep( group, function(sk) { return sk==key; } )
                        : [];
            if( grepped.length>0 ) keep = true;
        }
        if( adjustmentItem.targetSpec && adjustmentItem.targetSpec!=this.specialization )
            keep = false;   // i.e., if the adjustment specifies a specialization within the adjusted skill, skip if it doesn't match
            // revisit; for this function I may want to return some of these

        if( keep ) AdjSlice[x] = adjustmentItem;

    }

  return AdjSlice;
}

Skill.prototype.adjustments = function(returnString) {

    var totalAdjustment = 0;
    var adjStrings = [];
    var loops = 0;
    var key = this.key;

    var ch = document.loadedCharacter;

    var adjHash = {};

  ADJUSTMENT:
    for( var x in Adjustments ) {
        var adjustmentItem = Adjustments[x];
        var target = adjustmentItem.target;
        if( !target ) continue;
        loops++;

        // select those with a target equal to this Skill's key, or that fit into a category containing this Skill
        var consider = false;
        /*if( x==='Language_from_Linguistics' ) { console.log(JSONstring.make(adjustmentItem)); console.log(target+'=='+this.key+'?'); //}*/
        if( target==this.key ) {
            consider = true;
            // console.log("consider "+x+" because we have a TARGET MATCH: "+target+" = "+this.key);
        }
        else if( target.match(/spells/i) && this.hasOwnProperty('spell') && this.spell ) {
            consider = true;
            //console.log("consider "+x+" because this skill is a SPELL");
        }
        else if( adjustmentItem.targetCategory && adjustmentItem.targetCategory.match(/CL|GR/i) ) {
            consider = true;
            //console.log("consider "+x+" because target category is Group");
        }
        if( adjustmentItem.targetSpec && adjustmentItem.targetSpec!=this.specialization )
            { consider = false; }   // i.e., if the adjustment specifies a specialization within the adjusted skill, skip if it doesn't match

        if( !adjHash[adjustmentItem.fromCategory] ) adjHash[adjustmentItem.fromCategory] = 1; else adjHash[adjustmentItem.fromCategory]++;

        if( consider ) {
            var from    = adjustmentItem.from;          // this will be the 'key' for a trait, stat, etc.
            var fromCat = adjustmentItem.fromCategory;  // 'stats', etc. (absence implies this is 'trait')
            var adjAmt  = adjustmentItem.amount;        // hopefully a number, even an integer
            var once    = ( adjustmentItem.hasOwnProperty('per') && !adjustmentItem.per ) ? true : false;

            // is the 'from' a trait, stat, or what?
            if( fromCat && fromCat.match(/stat/) ) {
                // console.log("[ch.adjustments] in fromCat=stats branch, from is "+from);
                // look at 'from', to see if it is a true statement about the loaded character
                // I'm assuming it looks like 'IQ>=12' or some similar logic statement
                // (also handle the 'always apply' case: handled as a 'stat' adjustment, with "from: 'always'")
                var op = from.match(/\W+/g);
                var condTokens = from.split(/\W+/g);
    //            alert('comparing '+condTokens[0]+' to '+condTokens[1]);
                // if so, add the adjustment amount
                if( ( op=='>'  && ch[condTokens[0]]()>condTokens[1] )
                    ||
                    ( op=='>=' && ch[condTokens[0]]()>=condTokens[1] )
                    ||
                    ( op=='='  && ch[condTokens[0]]()==condTokens[1] )
                    ||
                    ( op=='<=' && ch[condTokens[0]]()<=condTokens[1] )
                    ||
                    ( op=='<'  && ch[condTokens[0]]()<condTokens[1] )
                    ||
                    ( from.match(/always/i) )
                    ) {
                    totalAdjustment += adjAmt;
                    var adjSign = (adjAmt<0) ? '' : '+';
                    adjStrings.push( adjSign + adjAmt + ": " + from );
                }
                else if( from.match(/enc/i) && ch.encumbrance()>0 ) {
                    // console.log('found an encumbrance match');
                    totalAdjustment -= ch.encumbrance();
                    adjStrings.push( "-"+ch.encumbrance() + ": " + from );
                }
            }   // fromCat = stat branch
            else if( fromCat && fromCat.match(/^sk/i) ) {
                // if the 'from' isn't a skill the character has, this Item should get skipped
                if( ch.hasSkill(from) ) {   // console.log("character has the "+from+" skill; calculating adjustment based on"); console.log(adjustmentItem);
                    var skLevel = ch.getSkill( from ).level();
                    var adjustmentAmount = Math.trunc(1*adjAmt*skLevel);
                    if( adjustmentAmount<1 ) continue;
    //                  alert("skill level:\n"+skLevel);
                    // if( type=='points' ), scale the adjustment to be equivalent in value to what that number of points would give (if no other points were applied)
                    // That may not be adequate - want to add this to virtual points, really.
                    //  Maybe don't use this kind here, and instead grab these adjustments somehow in Skill.virtualPoints()?
                    if( adjustmentItem.hasOwnProperty('per') ) {
                        totalAdjustment += (adjustmentItem.per) ? adjustmentAmount : adjAmt;    // clearly needs something else besides adjAmt here
                    }
                    else {  // assume 'per level' unless told otherwise
                        totalAdjustment += adjustmentAmount;
                    }
                    var adjSign = (adjustmentAmount<0) ? '' : '+';
                    adjStrings.push( adjSign + adjustmentAmount + ": " + from );
//                     if(report)
//                         alert("totalAdjustment += "+adjustmentAmount);
                }
            }
            // other 'from' category branches?
            else {    // assume fromCat==trait
                var chTrait = ch.getTrait(from);
                // if the 'from' isn't a trait the character has, this Item should get skipped
                if( chTrait ) {  // console.log("[Skills.adjustments] considering this adjustment from trait "+chTrait.name); console.log(adjustmentItem);

//               if(this.key=="DestroyAir")
//                    alert("found a matching adjustment ("+x+") on loop "+loops+":\n"+JSONstring.make(adjustmentItem));

                    // all groups are now considered, so they need to be filtered
                    /*if( target.match(/spells/i) && this.hasOwnProperty('spell') && this.spell ) {
                        // then don't filter; spells may not always be in the Spells group
                    }
                    else*/
                    if( adjustmentItem.hasOwnProperty('targetCategory') && adjustmentItem.targetCategory.match(/CL|GR/i) ) {
                        // console.log('grepping Groups['+target+']');
                        var group = Groups[target];
                     //   if( group ) alert('Groups['+target+"] exists:\n"+JSONstring.make(group)+",\ngrepping it for "+this.key);
                        var grepped = (group)
                                    ? $.grep( group, function(sk) { return sk==key; } )
                                    : [];
                        // console.log('grep: '+JSONstring.make(grepped) );
                        if( !grepped.length>0 ) { continue; }   // skip if not found in group
                    }

//               if(this.key=="DestroyAir")
//                    alert("adjustment ("+x+") survived groups filter");
                    // console.log("adjustment ("+x+") survived groups filter");

                    var adjustmentAmount = adjAmt;
                    var adjSign = (adjAmt<0) ? '' : '+';
                    if( chTrait.hasOwnProperty('levels') && !once ) adjustmentAmount *= chTrait.levels;
                    // so I ASSUME that if a 'from' trait has levels, then the adjustment is per level

                    // are some bonuses going to be non-numeric? yes...some are like '=4pts'
                    // could that kind be dealt with in the level() function?  They are essentially virtual points.
                    // (except that isn't exactly what the bonus actually IS, in the rules)

                    // how do I figure out if an adjustment is per level of the ad or disad?
                    // I _think_ this is indicated in the GDF files with the 'upto()' tag...
                    //		var lvlMultiplier = ( use_levels_condition ) ? trait.levels : 1;

                    // other necessary processing?

          //      alert("totalAdjustment += "+adjustmentAmount);
                    totalAdjustment += adjustmentAmount;
                    adjStrings.push( adjSign + adjustmentAmount + ": " + chTrait.name );
                }   // Character has this trait
            }
        }   // target match branch

    }   // Adjustments loop

    // console.log(adjHash);

  return (returnString) ? adjStrings.join(', ') : Math.trunc(totalAdjustment);
}

Skill.prototype.noDefaultsLevel = function() {
    // skill level omitting any contribution from skills defaults
    // use when calculating virtual point contributions from default skills
  //  alert('skillPtsToLevel( '+this.points+', '+document.loadedCharacter[this.attribute]()+', '+this.difficulty+', '+this.attribute+')'+' + '+this.adjustments());
  //  return skillPtsToLevel(   this.points  ,   document.loadedCharacter[this.attribute]()  ,   this.difficulty  ,   this.attribute  )    +   this.adjustments();
    return this.pointsToLevel() + this.adjustments();
}

/*
  This method basically chooses which skill default to use, by calculating 'virtual points'
  contributions from each potential skill default, and returning the largest one.
  Note that the virtual points are based on skill levels calculated without skill defaults,
  (This ensures that there will be no recursion - which the rules prohibit anyway,)
  and that there are never any virtual points unless the skill from which this one defaults
  has (real) points in it (because Skill.pointsToLevel() returns '0' when there are no points).

*/
Skill.prototype.virtualPoints = function(returnString) {
    var defString = '';
    var bestVrPts = 0;
    var ch = document.loadedCharacter;

    /* Magery alternatives - short-circuit the normal spell defaults */
    if( this.spell ) {
        var vPts = 0;
        if( ch.hasTrait('MageryRitual') ) {
            var colleges = this.colleges;
            for( var c in colleges ) {
                var collegeName = colleges[c];
                var tokens = collegeName.split(':');
                var collegeLabel = tokens[0].replace(/\W+/g,'');
                var pathSkillLabel = 'Pathof'+collegeLabel;
                var defSkillObj = ch.getSkill(pathSkillLabel);
       //         alert(JSONstring.make(defSkillObj));
                if( defSkillObj ) {
                    var penalty = -6;   // but this isn't right - this may require TOO MUCH work
                    vPts = this.virtualPointsFrom( defSkillObj, penalty );
                    defString = vPts + ' pts from ' + defSkillObj.name;
                }
            }
        }
        return (returnString) ? defString : vPts;;
    }
    // can I do this with a simpler 'if( ch.hasPrereqs() )' branch, or something like that?

    // look at all items in the Defaults object list
  DEFAULTS:
    for( var x in Defaults ) {
        /*  pick the 'best' Default
            Compare 'this' Skill key with the 'target' attribute of each Default item.
            For matches, filter the default for some conditions, then fetch the matching default-from Skill object.
            Use that object to calculate virtual points for 'this' Skill, and store info for this
            default Skill if the vpoints are better than those previously stored.
            At the end of this process, check to see if useDefaultFrom is specified.
            If so, see if this default skill matches the useDefaultFrom param, and if it does,
            store this Skill's info and exit the loop, even if the vpoints are not as good.
        */
        var defaultItem = Defaults[x];
        if( defaultItem.target==this.key ) {
            // filter for target skill specializations
            if( defaultItem.targetSpec && defaultItem.targetSpec!=this.specialization )
                continue;   // i.e., if the default specifies a specialization within the target skill, skip if it doesn't match
         // if(defaultItem.target=='StageCombat') alert("Default item:\n"+JSONstring.make(defaultItem));
            // localize some stuff
            var defaultingFrom = defaultItem.from;
            var defSkillObj = ch.getSkill(defaultingFrom,this.specialization,true);  // get skill that does NOT match this.spec
            // what if defaultItem.from isn't a skill?
            if( defaultingFrom && defaultingFrom.match(/^DX|HT|IQ|ST|Will|Per|Vis|Hear$/) ) {
                if( defaultItem.penalty===false ) continue DEFAULTS;   // for un-Defaults, like Piloting does NOT default from DX (but it does default from IQ)
                /*  This branch comes from an errata sheet for GURPS Magic, 2nd edition,
                    first and second printing, which states:
                    "P. 111. Raphael Holyoak can buy Stealth-11 for 1½ points from the IQ-5 default.
                    Put ½ point in Knife (giving him Knife-10) to bring him back to 100 points."
                    I would have treated a stat default as a default from a skill with no points,
                    and thus void, if I had not seen this errata.  I guess their logic is that a
                    default from a skill with no points is really (usually) a default from a second
                    default (the stat default/s for the defaulting-from skill).
                    So if it's a FIRST-level default from a stat, it's worth something, I guess.
                    */
                var vPts = this.virtualPointsFromStat( defaultingFrom, defaultItem.penalty );
                if( vPts>bestVrPts ) {
                    bestVrPts = vPts;
                    var vPtsStr = ( document.loadedCharacter.preferences.display.fractions && !(vPts%1==0) )
                                ? ((vPts==0.5) ? '' : vPts - vPts%1) + '½'
                                : vPts;
                    defString = vPtsStr + ' pt'+es(vPts) + ' from ' + defaultingFrom + ' default';
                }
            }
            else if( defaultItem.category && defaultItem.category.match(/^GR/i) ) {
                /* if your skill defaults from a Group, that means it defaults from every skill in the group,
                   so find the best of these defaults */
                // console.log('looking for a group default for '+this.name+' in '+defaultingFrom);

                if( defaultingFrom=='Language' ) {
                    var putvDefLangObj = {};
                    var vPts = 0;
                    for( var sk=0; sk<ch.skills.length; sk++ ) {
                        putvDefLangObj = ch.skills[sk];
                        if( putvDefLangObj.key!="Language" ) continue;
                        // console.log("[Sk.virtualPoints] got a Language skill: "+JSONstring.make(putvDefLangObj));
                        vPts = this.virtualPointsFrom( putvDefLangObj, defaultItem.penalty );
                        if( vPts>bestVrPts ) {
                            // console.log('new best virtual points from a Language: '+vPts);
                            defSkillObj = putvDefLangObj;    // save this Language Skill oject
                        }
                    }
                }
                else {
                    var DFgroup = Groups[defaultingFrom];
                    // console.log(DFgroup);
                    if( !DFgroup ) break;
                    var putvDefSkillObj = {};
                    var vPts = 0;
                    for( var sk=0; sk<DFgroup.length; sk++ ) {
                        putvDefSkillObj = ch.getSkill(DFgroup[sk]);
                        if( !putvDefSkillObj ) continue;
                        if( putvDefSkillObj.key==this.key ) continue;   // the Group may include the current skill; if so, skip it
                        // console.log('found a putative default weapons skill: '+putvDefSkillObj.name);
                        vPts = this.virtualPointsFrom( putvDefSkillObj, defaultItem.penalty );
                        if( vPts>bestVrPts ) {
                            // console.log('new best virtual points: '+vPts);
                            defSkillObj = putvDefSkillObj;    // save this Skill oject
                        }
                    }
                }
            }
            // console.log(defaultItem);
            // console.log(defSkillObj);
         // if(defaultItem.target=='Shiphandling')
              //  alert("Default Skill object:\n"+JSONstring.make(defSkillObj));
            // now filter for default-from skill specializations
            if( defaultItem.hasOwnProperty('fromSpec') && defaultItem.fromSpec=='same' ) {
                if( defSkillObj.specialization!=this.specialization ) continue;
            }
            if( defaultItem.hasOwnProperty('fromSpec') && defaultItem.fromSpec=='other' ) {
                if( defSkillObj.specialization==this.specialization ) continue;
            }
            else if( defaultItem.hasOwnProperty('fromSpec') && defaultItem.fromSpec!=defSkillObj.specialization )
                continue;   // i.e., if the default specifies a specialization within the default-from skill, skip if it doesn't match
            // if there is a useDefaultFrom specified, exit loop if this is the matching skill
            // I worry about not hitting the useDefaultFrom key; can this happen?
            // NOW test for a solid match, and find the corresponding virtual points value
            if( defSkillObj ) {
             // alert("found a default item matching "+this.name+":\n"+JSONstring.make(defaultItem));
                if( defaultItem.category && !defaultItem.category.match(/SK|GR/i) ) continue;
                // if category=SK|GR or is missing, default is another Skill (or Spell, or whatever) = what I'm looking for
                var penalty = defaultItem.penalty;
                // if a skill with required specializations gives a certain default between specialties,
                // like Engineer (defaults to Engineer-other at -4), a *perfect* match including specializations should be skipped.
                // Engineer-Civil doesn't default to itself at -4.
                if( defaultItem.target==defaultItem.from && defSkillObj.specialization==this.specialization )
                    continue;
                // short-circuit if defSkillObj is 'false'? no need, that's the condition to be here
                // alert('this.virtualPointsFrom( '+defSkillObj.key+', '+penalty+' )');
                var vPts = this.virtualPointsFrom( defSkillObj, penalty );
                // alert("virtual points from "+defSkillObj.name+": "+vPts);
                if( vPts>bestVrPts ) {
                    bestVrPts = vPts;
    //                 this.useDefaultFrom = defaultingFrom;
                   // var sign = (vPts<0) ? '' : '+';
                    var specString = ( defSkillObj.specialization ) ? ' ('+defSkillObj.specialization+')' : '';
                    var vPtsStr = ( document.loadedCharacter.preferences.display.fractions && !(vPts%1==0) )
                                ? ((vPts==0.5) ? '' : vPts - vPts%1) + '½'
                                : vPts;
                    defString = vPtsStr + ' pt'+es(vPts) + ' from ' + defSkillObj.name + specString;
                }
            }
            if( this.hasOwnProperty('useDefaultFrom') ) {
              //  alert("default specified for "+this.name+" ("+this.useDefaultFrom+"); looking at "+x+" (defaultingFrom="+defaultingFrom+")");
              //  alert(JSONstring.make(defaultItem));
                if( this.useDefaultFrom==defaultingFrom ) {
                  //  alert(defSkillObj.name+" matches; setting virtual points to "+bestVrPts);
                    bestVrPts = 1*this.virtualPointsFrom( defSkillObj, defaultItem.penalty );
                    var specString = ( defSkillObj.specialization ) ? ' ('+defSkillObj.specialization+')' : '';
                    var bestVrPtsStr = ( document.loadedCharacter.preferences.display.fractions && !(bestVrPts%1==0) )
                                ? ((bestVrPts==0.5) ? '' : bestVrPts - bestVrPts%1) + '½'
                                : bestVrPts;
                    defString = bestVrPtsStr + ' pt'+es(bestVrPts)+' from ' + defSkillObj.name + specString;
                    break;
                }
            }
        } // if( key matches )
    } // Defaults loop
    return (returnString) ? defString : bestVrPts;
}

// utility for use inside virtualPoints methods, to wrap call to skillLevelToPts, er, Skill.levelToPoints
Skill.prototype.virtualPointsFrom = function( Skill, modification ) {
    var vpts = 0;
    if( Skill ) {
        var unmodifiedDefaultsFromSkillLevel = Skill.pointsToLevel();
  // if( this.key=='Surgery' )
        // alert(this.key+': this.levelToPoints( '+unmodifiedDefaultsFromSkillLevel+' + '+modification+' )' );
      //  vpts = skillLevelToPts(   unmodifiedDefaultsFromSkillLevel  +  modification  ,   document.loadedCharacter[this.attribute]()  ,   this.difficulty   ,   this.attribute  );
        vpts = this.levelToPoints( unmodifiedDefaultsFromSkillLevel  +  modification );
    }
    return vpts;
}
/* uses Character prototype methods for levels of stats and secondary characteristics */
Skill.prototype.virtualPointsFromStat = function( stat, modification ) {
    var ch = document.loadedCharacter;
  //  console.log("[virtualPointsFromStat("+stat+","+modification+")]");
  //  console.log(" vpts = this.levelToPoints( "+(ch[stat]()+modification)+" )");
    var level = ( ch[stat] ) ? ch[stat]() + modification : modification;
    var vpts = this.levelToPoints( level );
    return vpts;
}
/*  Note on defaults from skills with adjustments
I found this quote by Walter Milliken (Roleplayer #22, November 1990):
    Note: If the +4 Animal Empathy bonus is applied to Animal Handling, it
    should not be added to any skills defaulted to that skill, or purchased
    from a default to Animal Handling – this would otherwise double the
    effective bonus. This applies to any advantage that raises skill levels.
    [http://www.sjgames.com/gurps/Roleplayer/Roleplayer22/Default.html]
This means that bonuses added to the base skill should not be applied to a
default level calculation.
I found a similar reference (about Talents [http://www.sjgames.com/gurps/faq/FAQ4-3.html, 3.2.14])
that discussed this same limitation for the 4th edition rules.
*/

// utility for use inside virtualPoints methods, to handle looped calls to virtualPointsFrom due to TLs
Skill.prototype.bestTLdefault = function( skillLabel, mod, spec ) {
    var vptsMax = 0;
    var spec_suffix = ( spec ) ? '_'+spec+'_' : '';
    for( var tl=0; tl<20; tl++ ) {
        var skillTL = skillLabel+tl+spec_suffix;
        vpts = this.virtualPointsFrom( document.loadedCharacter.skills[skillTL], mod ); // returns 0 if skill doesn't exist
        if( vpts>vptsMax ) { vptsMax = vpts; }    // do I need to save which TL this is?
    }
    return vptsMax;
}

Skill.prototype.level = function() {
 // skill level, taking everything (I can think of) into account: skill defaults, advantages, etc.
  // alert("[Skill.level]; getting level for "+this.name);
    var ch = document.loadedCharacter;
//   if( this.key=='Research' )
//   alert("in level prototype method; chHasPrereqs will return "+this.chHasPrereqs()+" for "+this.name);
    if( !this.chHasPrereqs(ch,true) ) { return 0; }

    // Maneuver/Technique branch here (might need to know about prereqs)
    if( this.attribute=="M" || this.attribute=="T" && this.hasOwnProperty("useDefaultFrom") ) {
//     	if( this.name=='finger lock' )
     	  // alert(JSONstring.make(this));
        var skillToDefaultFrom = ch.getSkill(this.useDefaultFrom.key);    // var skill = ( this.useDefFrm.key ) ? ch.getSkill(key) : what?
//     	if( this.name=='finger lock' )
        // alert(skillToDefaultFrom.name);
        // console.log("[Skill.level] in Techniques branch, default-from skill is "+skillToDefaultFrom.name);
//     	if( this.name=='finger lock' )
        // alert(JSONstring.make(skillToDefaultFrom));
        var levelOfskillDefaultingFrom = skillToDefaultFrom.level();
        // console.log("[Skill.level] in Techniques branch, default-from skill level is "+levelOfskillDefaultingFrom);
      //  alert(skillToDefaultFrom.name+"\n"+levelOfskillDefaultingFrom);
        var baseDefaultPenalty = this.techniqueDefaultPenalty;
        var bonusFromPoints = this.techniqueBonus();
        // many Techniques have a maximum (relative) level; deal with this here
        var max = ( this.hasOwnProperty('maxRelLevel') )
                ? levelOfskillDefaultingFrom+this.maxRelLevel
                : 0;  // for logic below; not actually a default of 0
        // console.log("[Skill.level] in Techniques branch, max is "+max);
        // techniques based on skills with which the character has little experience can't be improved
        var lev = ( skillToDefaultFrom.points>=1 )
                ? levelOfskillDefaultingFrom + baseDefaultPenalty + bonusFromPoints
                : levelOfskillDefaultingFrom + baseDefaultPenalty;
        // console.log("[Skill.level] in Techniques branch, lev is "+lev);
        return (max) ? Math.min( lev, max ) : lev;
    }

    var vpts = 1*this.virtualPoints();
    var pts  = 1*this.points;

    // spells have NO default level; no points, no roll
    if( this.hasOwnProperty('spell') && pts==0 ) { return 0; }

    // Wildcard skills
    if( this.wildcard ) {
        vpts = 0;		// wildcard skills have no defaults
        pts /= 3;		// wildcard skills cost 3x points
    }

    // alter difficulty for 4th ed skill with an optional specialization
    var diffAdj = (this.optSpecsArray && ch.gameInfo.ruleset.match('4') ) ? -1 : 0;
//     if( this.key=='Research' )
//       alert("in level prototype method\npts: "+pts+"\nvpts: "+vpts+"\natt: "+ch[this.attribute]()+"\ndif: "+this.difficulty+'+'+diffAdj+"\natt: "+this.attribute);
    var levelFromPoints = this.pointsToLevel( pts + vpts );
    var attDefaultLevel = this.attributeDefault();
//   if( this.key=='Research' )
//     alert("in level prototype method\nlevelFromPoints: "+levelFromPoints+"\nattDefaultLevel: "+attDefaultLevel);
    if( levelFromPoints<attDefaultLevel ) levelFromPoints = attDefaultLevel;

    // native language aside
    if( this.key && this.key.match(/^language/i) && this.description && this.description.match(/^native/i) )
    		levelFromPoints = Math.floor( ch.IQ() + pts );

//   if( this.key=='Research' )
//     alert("levelFromPoints: "+levelFromPoints+"\nadjustments: "+this.adjustments());
  //  console.log("levelFromPoints: "+this.name+" at "+levelFromPoints+", adjustments: "+this.adjustments());
    // console.log("[Skill.level] about to request adjustments for\n"); console.log(this);
    return levelFromPoints + this.adjustments();
}

Skill.prototype.pointsToLevel = function( pts, ch ) {
    if( !ch ) ch = document.loadedCharacter;

    var points = pts || this.points;    // so you can find a hypothetical level for this skill, given a hypothetical number of points
    if( points<0.5 ) return 0;           // no points (or not enough to go up a level), no level (in this setting, anyway)
    // console.log("[Sk.pointsToLevel] "+points+" points in "+this.name);

    // e3 Eidetic Memory adjustment
    if( ch.hasTrait('EideticMemoryE3') && this.type=='M' && !this.spell ) {
        points *= 2*ch.getTrait('EideticMemoryE3').levels;
    }
    // three regimes: linear, exponential, VH/4th joined at an inflection point (the value of which depends on skill type (3e) and ruleset)
    var slope = ( this.type=='M' ) ? 2 : 8;		// 3rd edition rules
    if( ch.gameInfo.ruleset.match('e4') || this.difficulty==3 ) { slope = 4; }   // 4th edition (or 3e Very Hard skill) rules
    // set inflection point for points function
    var iPoint = ( this.type=='M' ) ? 1 : 3;        // 3rd edition rules
    if( ch.gameInfo.ruleset.match(4) || this.difficulty==3 ) { iPoint = 2; }

    // native language aside
    if( this.key && this.key.match(/^language/i) && this.description && this.description.match(/^native/i) )
    		return Math.floor( ch.IQ() + points );

    if( points<2*iPoint ) {    // deal with exponential case first
  // if( this.key=='Piloting' )
  //       alert("pointsToLevel() is returning "+ch[this.attribute]()+' + Math.log('+points+')/Math.log(2) - '+this.difficulty);
        return ch[this.attribute]() + Math.floor( Math.log(points)/Math.log(2) ) - this.difficulty;
    }
    else {    // linear case
        var adj = Math.floor( Math.log(slope)/Math.log(2) ) - 1;
        // alert("pointsToLevel() is returning "+ch[this.attribute]()+' + Math.floor('+points+'/'+slope+') - '+this.difficulty+' + '+adj);
        return ch[this.attribute]() + Math.floor(points/slope) - this.difficulty + adj;
    }
}

Skill.prototype.levelToPoints = function( lvl ) {
    var ch = document.loadedCharacter;
    var level = ( isNaN(lvl) ) ? this.noDefaultsLevel() : lvl;
    // console.log("[Skill.levelToPoints] "+this.name+" level = "+level);
    // set slope for points function
    var slope = ( this.type=='M' ) ? 2 : 8;		// 3rd edition rules
    if( ch.gameInfo.ruleset.match(4) || this.difficulty==3 ) { slope = 4; }
    // set inflection point for points function
    var iPoint = ( this.type=='M' ) ? 1 : 3;		// 3rd edition rules
    if( ch.gameInfo.ruleset.match(4) || this.difficulty==3 ) { iPoint = 2; }
    // 'adjusted' level - skill level relative to attribute and skill difficulty
    var adjLev = level - ch[this.attribute]() + this.difficulty;
    // then calculate another thing - adjusted level scaled for which curve (by skill type)

  // if( this.key=='Spear' )
    // console.log("[Skill.levelToPoints] adjLev = "+level+" - "+ch[this.attribute]()+" + "+this.difficulty+" = "+adjLev);
    // calculate points
    var points = ( adjLev < iPoint ) ? Math.pow( 2, adjLev ) : slope*(adjLev - iPoint + 1);	// 3e PE skills don't work with adjLev < 4-iPoint, at the iPoint
    // console.log("[Skill.levelToPoints] points: "+points)
    // before returning, need to adjust for e3 Eidetic Memory
    if( ch.hasTrait('EideticMemoryE3') && this.type=='M' && !this.spell ) {
        points /= 2*ch.getTrait('EideticMemoryE3').levels;
    }
    // return ( ch.gameInfo.ruleset.match('e4') ) ? Math.floor(points) : Math.floor(2*points)/2;
    return /*( adjLev < -1 ) ? 0 :*/ points;
}

Skill.prototype.relLevel = function() {
  // skill level, expressed relative to the controlling attribute (i.e., "IQ+1" instead of "13")
    var skillLevel = this.level();
    var controlAtt = this.attribute;
    if( !controlAtt ) return;
    if( controlAtt=="M" || controlAtt=="T" ) return "-";      // I can probably do better than this
    var cnAttLevel = document.loadedCharacter[controlAtt]();
    var diff = 1*skillLevel - 1*cnAttLevel;
    var sign = (diff>0) ? '+' : '';
    return (diff==0) ? controlAtt : controlAtt+sign+diff;
}
Skill.prototype.relLevelNaive = function( pts, ed ) {
    if( !ed ) ed==4;
    var slope = ( this.type=='M' ) ? 2 : 8;		// 3rd edition rules
    if( ed==3 || this.difficulty==3 ) { slope = 4; }   // 4th edition (or 3e Very Hard skill) rules
    var iPoint = ( this.type=='M' ) ? 1 : 3;        // 3rd edition rules
    if( ed==4 || this.difficulty==3 ) { iPoint = 2; }

    if( pts<2*iPoint ) {    // deal with exponential case first
        return Math.floor( Math.log(pts)/Math.log(2) ) - this.difficulty;
    }
    else {    // linear case
        var adj = Math.floor( Math.log(slope)/Math.log(2) ) - 1;
        return Math.floor(pts/slope) - this.difficulty + adj;
    }
}

Skill.prototype.diff = function() {
    var diffs = ['E','A','H','VH'];
    return diffs[this.difficulty];
}
Skill.prototype.difftype = function() {
    return this.type+this.diff();
}

Skill.prototype.clone = function() {
    return cloneSkill( this );
}

Skill.prototype.clone_proto = function() {
    return cloneSkill( this, true );
}

// Maneuver/Technique cost table function
Skill.prototype.techniqueBonus = function() {
    var points = this.points;
    var difficulty = this.difficulty;
    var bonus = 0;
    if( !points ) return bonus;
    if( this.attribute=="M" ) {         // Maneuver (3rd edition) cost table
        bonus = (points<2)
              ? 3 + Math.floor( Math.log(points)/Math.log(2) ) - difficulty
              : 3 + Math.floor( points/2 - difficulty );
    }
    else if( this.attribute=="T" ) {    // Technique (4th edition) cost table
        bonus = points - (difficulty - 1);
        if( difficulty>1 && points<2 ) bonus = 0;   // difficult techniques require 2 points before any benefit
    }
    return bonus;
}

// print out full line for skill
Skill.prototype.print = function( style, lengthlimit ) {
    let useshortname = ch && ch.preferences.display.shortnames && this.shortname;
    var name = ( useshortname ) ? this.shortname : this.name;
    if( !lengthlimit ) lengthlimit = 28;
    let sbstr = Math.round(lengthlimit/4);
    var TL   = (this.hasOwnProperty('TL') && ch && ch.preferences.display.TLinfo ) ? '/TL'+this.TL : '';
    var nameTL = name + TL;
    if( ch && ch.preferences.display.skilltypes ) nameTL += ' ['+((ch.gameInfo.ruleset.match('3'))?this.type:this.attribute)+'/'+Dffclts[this.difficulty]+']';
    var specsList =[];
    if( this.hasOwnProperty( 'description'  ) ) specsList.push( (style=='compact' && !useshortname ) ? this.description.substr(0,sbstr)    : this.description );
    if( this.hasOwnProperty('specialization') ) specsList.push( (style=='compact' && !useshortname ) ? this.specialization.substr(0,sbstr) : this.specialization );
    if( this.hasOwnProperty('optSpecsArray' ) ) specsList.push( this.optSpecsArray.join(' & ') );
    var specs = (specsList.length>0) ? ' ('+specsList.join(', ')+')' : '';
    var nameTLspecs = nameTL + specs;
    var lvl = '';
    if( style=='compact' ) {
        if( nameTLspecs.length>lengthlimit ) {
            //alert(nameTLspecs+' is too long ('+nameTLspecs.length+' characters); truncating name ('+name+')');
            nameTLspecs = name.substr(0,2) + name.substr(2,lengthlimit-(TL.length+specs.length+(15-sbstr)))
                        + '<span title="'+nameTLspecs+'">&hellip;</span>'
                        + name.substr(-2) + TL + specs;
        }
        // This algorithm causes problems for a skill with a short name and long-ish 'specs' (see Mater Cordelia's Axe/Mace skill).
        // The entirety of the skill name is sometimes truncated to preserve the entirety of the specs.  Not optimal.
        // For the time being, I have partly fixed this by abbreviating specializations if 'compact' style is indicated.
        lvl = this.level();
        if( this.optSpecsArray ) {
            if( ch && ch.gameInfo.ruleset.match('3') ) {
                lvl = (lvl-this.optSpecsArray.length)+'/'+(lvl+5);
            }
            else {    // see B169-170 for 4th ed. optional specialization rules
                pSkillClone = this.clone();
                pSkillClone.difficulty--;
                lvl = pSkillClone.level();
                lvl = lvl+'/'+(lvl-2);
            }
        }
        var lvldash = /*(style=='compact') ? '-' :*/ ' - ';
        lvl = '<span title="'+this.adjustments(true)+'">'+lvldash+lvl+'</span>';
    }
    return nameTLspecs+lvl;
}

Skill.prototype.spellColleges = function() {
    var colleges = {};
    for( var k=0; k<Groups.MagicColleges.length; k++ ) {
        var CollegeGp = Groups.MagicColleges[k];
        for( var i=0; i<Groups[CollegeGp].length; i++ ) {
            // console.log(CollegeGp+": "+Groups[CollegeGp][i]);
            if( Groups[CollegeGp][i]==this.key ) colleges[CollegeGp] = true;
        }
    }
    // console.log("[Skill.spellColleges] '"+this.name+"' is in the following colleges: "+Object.keys(colleges));
    return Object.keys(colleges);
}



/* Skills */
var Skills = {};

/* Spells (also Skills, but stored in a different bin in the Character object) */
var Spells = {};

// add 'spacer' and 'heading' proto-Skill objects to these two library objects here
// Skills.spacer  = { line: '' };
// Skills.heading = { line: '' };
// Spells.spacer  = { line: '' };
// Spells.heading = { line: '' };


// add a 'key' attribute to each skill with value equal to its label in the Skills object
// (unless there is already a key defined - e.g., for a 'language' skill)
for ( var l in Skills ) {
    if( !Skills[l].hasOwnProperty('key') ) Skills[l].key = l;
}
// this doesn't do anything here (as there are no skills in the Skills object yet), but I don't want to forget how to do this
// it should be placed after all skills are defined in the library.js

// add a 'spell' attribute to each skill attached to the Spell object
// also add the label as the 'key' attribute (unless there is already a key defined)
for ( var s in Spells ) {
    Spells[s].spell = true;
    if( !Spells[s].hasOwnProperty('key') ) Spells[s].key = s;
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
// this doesn't do anything here (as there are no spells in the Spells object yet), but I don't want to forget how to do this
// it should be placed after all spells are defined in the library.js
// now there, with a call to spellify() function below

Skill.prototype.spellify = function() {
    this.spell = true;   // add a 'spell' attribute
    addToGroup("Spells",[this.key]);  // add to the 'Spells' group
  //  Groups.Spells.push(this.key);   // why did I decide to do it this way instead?  it adds hundreds of blank entries to the Spells group
    // initialize 'stats' property with default values, if they are absent
    if( !this.hasOwnProperty('stats') ) {
        this.stats = { time: 1, duration: null, castcost: null, maintaincost: null, notes: '' };
    }
    else {
        if( !this.stats.time ) this.stats.time = (this.classes.block) ? 'instant' : 1;
        if( !this.stats.duration ) this.stats.duration = null;
        if( !this.stats.castcost ) this.stats.castcost = null;
        if( !this.stats.maintaincost ) this.stats.maintaincost = null;
        if( !this.stats.notes ) this.stats.notes = '';
    }
}


/* At some point, I need to upgrade all the tests for having a spell from
  'if( document.loadedCharacter.spells.spellName )'
  to something that only returns 'true' if the character has the spell skill at level 12+.
*/




function numSpells12plusInList( spellList ) {
    var howMany = 0;
    for( var s in spellList ) {
    		var thisSpell = document.loadedCharacter.spells[spellList[s]];  // now broken by list implementation
        if( thisSpell && thisSpell.level()>=12 ) { howMany++; }
    }
    return howMany;
}

function spellsFromListAtLeast( spellList, num ) {
    return ( numSpells12plusInList( spellList ) >= num ) ? true : false;
}



/* is this the right place to declare these? */
var Defaults = {};
var Prerequisites = {};
// probably not . . . library file?
