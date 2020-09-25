/*------------------------------------------------------------------------------
  This javascript file contains the Character object/class
  and associated methods and variables.
------------------------------------------------------------------------------*/

// These constants are from GURPS Basic whenever possible.  Exceptions are noted.
//  ST:   0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20
var heightsByST3e   // which amounts to ST + 59 (B3e p15; which only shows values for ST 5 to 16)
    = [  59,  60,  61,  62,  63,  64,  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,  78,  79 ];
var heightsByST4e
    = [  20,  32,  37,  43,  48,  53,  57,  60,  63,  66,  68,  70,  73,  76,  79,  80,  81,  82,  83,  84,  85 ];
var heightSDbyST = 2; // (B4e height ranges are 10 inches wide for all ST values)
    // (B3e p15 sidebar 'Modifications' implies SD of ~10 lb and ~2 in regardless of ST, etc.)
//  ST:   0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20
var weightsByST3e   // which MOSTLY amounts to ~100+5*ST (except with stalls at ST 5 and ST 7), until ST 14+ when it becomes 30 + 10*ST (see B3e p15)
    = [ 105, 110, 115, 120, 130, 130, 135, 135, 140, 145, 150, 155, 160, 165, 170, 180, 190, 200, 210, 220, 230 ];
var weightsByST4e   // (B4e p18; which only shows values for ST 6 to 14 so others are extrapolation)
    = [   7,  20,  35,  45,  60,  75,  90, 105, 120, 135, 145, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340 ];
var weightSDbyST    // (B4e p18; adapted from ranges, only shown there for ST 6 to 14 so others are extrapolation)
    = [   1,   2,   3,   4,   5,   7,  10,  10,  10,  10,  10,  12,  13,  15,  17,  20,  20,  20,  20,  20,  20 ];
// age: birth, 1,   3,   5,   7,   9,  11/small adult, etc.
// age equiv., B3E13:    3,   4,   6,   8,  10,  13
// these age equivalents used to get heights and weights for low ST values (adapted from http://halls.md/growthchart-boys-girls-height-weight/)
// according to that data, average modern European/white males (ST 10, we presume) should be 5'10" tall.
// Other studies show that average height has increased by about 4" (10cm) during the past two centuries, and was very stable before that (at ~170cm, or 67") for at least 2000 years.
// This means through TL 4, heights average 170 cm, or 5'7", then increase about 1" during every subsequent Tech Level.

/****************************  Character Object  ******************************/
function Character( name, pointTotal, ruleset, TL ) {


    /* - - - - - - - - - - - - PRIVATE  MEMBERS - - - - - - - - - - - - - */
    // variables declared with 'var', parameters to the constructor,
    // and methods declared as "function func(...) {...}"
    // These are still instance-specific, rather than being 'class constants'
    var that = this;    // just in case
    var date = new Date();
    var ID   = randomPassword(12);


    /*- - - - - - - - - - - - PRIVILEGED METHODS - - - - - - - - - - - - -*/
    // These methods can access private members.
    // BUT the syntax for access within these methods is not "this.privateProperty = newValue;",
    // it is just "privateProperty = newValue;" (without the "this.").

  //  this.ID = function() { return ID; }   // this probably doesn't do what you are thinking!  I believe it generates a NEW random string every time it is called!

    this.pointTotal = function( newPts ) {
        if( !isNaN(newPts) ) {
            this.description.pointTotal = newPts;
        }
        return pointTotal;
    };

    /* Attributes and Secondary Characteristics */
    // get-setters for attribute points
    // NOTE that these can't be used as they are to set points for an attribute to zero!
    // Actually, they can - as long as you DON'T try to coerce the args to a number when you call these:
    // loadedCharacter.DXpoints(this.value) works (zero gets passed as "0", a string,
    //  which evaluates to 'true' when used in a conditional.
    // loadedCharacter.DXpoints(1*this.value) DOES NOT work, for the reason given above.
    // So we coerce values to numbers in the code below instead.
    this.STpoints = function( pts ) {
        if( pts || pts===0 ) {
            var oldST = this.ST();
            this.attributePoints.ST = 1*pts;
            if( this.preferences.autoAdjustBuild ) {
                this.adjustBuild(oldST);
            }
        }
        else { return this.attributePoints.ST; }
    };
    this.DXpoints = function( pts ) {
        if( pts || pts===0 ) { this.attributePoints.DX = 1*pts; }
        else { return this.attributePoints.DX; }
    };
    this.IQpoints = function( pts ) {
        if( pts || pts===0 ) { this.attributePoints.IQ = 1*pts; }
        else { return this.attributePoints.IQ; }
    };
    this.HTpoints = function( pts ) {
        if( pts || pts===0 ) { this.attributePoints.HT = 1*pts; }
        else { return this.attributePoints.HT; }
    };
    this.attPoints = function( att, pts ) {    // this is an alternative for the get-setters above
        if( pts || pts===0 ) {
            var oldST = this.ST();
            this.attributePoints[att] = 1*pts;
            if( this.preferences.autoAdjustBuild ) {
                this.adjustBuild(oldST);
            }
        }
        else { return this.attributePoints[att]; }
    };
    // "getters" for attribute levels (actually formulas; these are all derived quantities)
    this.ST = function() {
        var levelFromPoints = ( this.gameInfo.ruleset.match('e4') )
                            ? 10 + Math.floor( this.attributePoints.ST/10 )
                            : STptsToLevelPre4e( this.attributePoints.ST );
        var adjustments = this.adjustmentsTo('Strength|ST');
        return levelFromPoints + adjustments;
    };
    this.DX = function() {
        var levelFromPoints = ( this.gameInfo.ruleset.match('e4') )
                            ? 10 + Math.floor( this.attributePoints.DX/20 )
                            : attributePtsToLevelPre4e( this.attributePoints.DX );
        var adjustments = this.adjustmentsTo('Dexterity|DX');
        return levelFromPoints + adjustments;
    };
    this.IQ = function() {
        var levelFromPoints = ( this.gameInfo.ruleset.match('e4') )
                            ? 10 + Math.floor( this.attributePoints.IQ/20 )
                            : attributePtsToLevelPre4e( this.attributePoints.IQ );
        var adjustments = this.adjustmentsTo('Intelligence|IQ');
        return levelFromPoints + adjustments;
    };
    this.HT = function() {
        var levelFromPoints = ( this.gameInfo.ruleset.match('e4') )
                            ? 10 + Math.floor( this.attributePoints.HT/10 )
                            : attributePtsToLevelPre4e( this.attributePoints.HT );
        var adjustments = this.adjustmentsTo('Health|HT');
        return levelFromPoints + adjustments;
    };
    // "getters" for secondary characteristics (formulas; these are all derived quantities)
    // Note that the points for these are handled as advantages, e.g., Extra Hit Points, in e3
    // but are handled like primary characteristics, with costs to increase or decrease, in e4
    this.HP = function() {
        let levelFromPoints = ( this.gameInfo.ruleset.match('e4') )
                            ? 1*this.ST() + Math.floor(this.attributePoints.HP/2)
                            : 1*this.HT();
        let adjustments = this.adjustmentsTo('HP');
        return levelFromPoints + adjustments;
    };
    this.Will = function() {
    		var will = 1*this.IQ() + this.adjustmentsTo('Will');
        if( this.gameInfo.ruleset.match('e4') ) {
            will += Math.floor( this.attributePoints.Will/5 );
        }
        return will;
    };
    this.Per = function() {
        var adjustments = this.adjustmentsTo('Per');
 //       alert(this.IQ()+" + Math.floor( "+this.attributePoints.Per+"/5 ) + "+adjustments);
        return 1*this.IQ() + Math.floor( this.attributePoints.Per/5 ) + adjustments;
    };
    this.Vision = function() {
        var adjustments = this.adjustmentsTo('Vision');
        return 1*this.IQ() + adjustments;
    };
    this.Hearing = function() {
        var adjustments = this.adjustmentsTo('Hearing');
        return 1*this.IQ() + adjustments;
    };
    this.FP = function() {
        var levelFromPoints = ( this.gameInfo.ruleset.match('e4') )
                            ? 1*this.HT() + Math.floor(this.attributePoints.FP/3)
                            : 1*this.ST();
        var adjustments = this.adjustmentsTo('Fatigue|FP');
        return levelFromPoints + adjustments;
    };
    this.basicSpeed = function() {
        return (this.HT() + this.DX() + Math.floor( this.attributePoints.Speed/5 ))/4 + this.adjustmentsTo('Speed');
    };
    this.basicLift = function() {    // e3 doesn't use Basic Lift, per se, but the ST×2 value obviously fills the same role
        var ST = this.ST();
        if( this.hasTrait('LiftingST') ) { ST += this.getTrait('LiftingST').levels; }
        var rawLift = ( this.gameInfo.ruleset.match(/3/) ) ? 2*ST : (ST*ST)/5;
        return ( rawLift<10 ) ? rawLift : Math.round(rawLift);
    };
    /* I'll need to keep basicMove; it will be a basis for the [mode]Move methods.  Remove any "No Legs" etc. adjustments. */
    this.basicMove = function(raw) {
     //       alert( "return Math.floor( "+this.basicSpeed()+" + "+this.attributePoints.Move+"/5 + "+this.adjustmentsTo('Move')+" )" );
     // console.log( "return Math.floor( "+this.basicSpeed()+" + "+this.attributePoints.Move+"/5 + "+this.adjustmentsTo('Move')+" )" );
        var rawMove = this.basicSpeed() + this.attributePoints.Move/5 + this.adjustmentsTo('Move');
        if( this.hasTrait('NoLegsAquatic') ) rawMove /= 5;    // if I start to use basicRun, move this there.  ALSO, if I work out how to handle multiplicative adjustments, this should become one of those instead of being ad hoc here.
        return (raw) ? rawMove : Math.floor( rawMove );
    };
    /* consider renaming these from basic[Mode] to combat[Mode] (or perhaps groundMove, airMove, waterMove, from B4E354) */
    /* basicRun is experimental, and not used anywhere yet */
    this.basicRun = function(raw) {
        // for some purposes, this is where a "Move" adjustment should be applied, rather than in basicMove.
        // for instance, Reduced Move due to short legs (Dwarves, Pelicans, or Alligators) would not affect swimming or flying speed.
        // Reduced Move due to stiffness, e.g. from Body of Metal, *would* probably affect all kinds of movement.
        let basicRun = this.basicMove(raw);
        return basicRun + this.adjustmentsTo('Run');    // I'd need to implement some Adjustments.to_Run_from_X
    };
    this.basicSwim = function(raw) {
        let basicSwim = ( this.gameInfo.ruleset.match(/3/) ) ? this.levelOfSkillWithInfo('Swimming')/10 : this.basicMove(raw)/5;
        if( this.hasTrait('Amphibious') ) basicSwim = this.basicMove(raw);
        if( this.hasTrait('NoLegsAquatic') ) basicSwim = 5*this.basicMove(raw);		// because it will have been divided by 5 in basicMove()
        return basicSwim + this.adjustmentsTo('Swim');    // as far as I can tell, there will be NO such adjustments (all apply to Water Move (i.e., Encumbered Swim) instead)
    };
    this.basicFly = function(raw) {
        let basicFly = ( this.hasTrait('Flight') ) ? 2*( ( this.gameInfo.ruleset.match(/3/) ) ? this.basicMove(raw) : this.basicSpeed() ) : 0;
        return basicFly /*+ this.adjustmentsTo('Fly')*/;    // as far as I can tell, there will be NO such adjustments (all apply to Air Move instead)
    };
    this.liftUnit = function() {
        return ( this.gameInfo.ruleset.match(/3/) ) ? 2*this.ST() : this.basicLift();
    };
    this.encumbrance = function( collectionID, swim ) {
        if( !collectionID ) { collectionID = this.collections.equipped; }
        var encLvls = ( this.hasTrait('ExtraEncumbrance') ) ? [1,2.5,5,10,15] : [1,2,3,6,10];
        var weight = this.totalEquipmentQuantity('actualWeight',collectionID);
        // add fat weight for 3e
        if( this.gameInfo.ruleset.match(/3/) ) {
            if( !swim )
                weight += Math.round(this.description.weight * this.adjustmentsTo('encumbranceFromBMI'));
        }
        var liftUnit = this.liftUnit();
        //alert("encumbrance weight ratio: "+weight+'/'+liftUnit+' = '+( weight/liftUnit ));
        var weightRatio = weight/liftUnit;
        // if( weightRatio>15 ) return null;  // with the special meaning that the character cannot carry this much weight (editions agree, modulo difference in calculating encUnit)
        if( weightRatio>encLvls[4] ) { return 5; }     // with the special meaning that this is too much weight to carry for any distance; this is the maximum the character can carry AT ALL (e3 says 'a few feet at a time' [B76], e4 says spend 1FP/sec [Campaigns:353])
        if( weightRatio>encLvls[3] ) { return 4; }
        if( weightRatio>encLvls[2] ) { return 3; }
        if( weightRatio>encLvls[1] ) { return 2; }
        if( weightRatio>encLvls[0] ) { return 1; }
        return 0;
    };
    this.encumberedMove = function( enc, raw ) {
        var move = this.basicMove(raw);
        if( isNaN(enc) ) { enc = this.encumbrance( this.collections.equipped ); }
        var e4encMoveMult = (1-0.2*enc).toFixed(1);    // ridiculous that toFixed(1) is necessary, but 0.2*3 was coming out as 0.6000000000000001.
        var e4encumberedMove = (raw) ? e4encMoveMult*move : Math.floor(e4encMoveMult*move);
        var encumberedMove = (this.gameInfo.ruleset.match(/4/)) ? e4encumberedMove : move - enc;
        return (enc<5) ? Math.max( encumberedMove, 1 ) : 0;
    };
    /* Should these be distinct from the basic[Mode] functions above? Maybe combine into groundMove, airMove, waterMove. */
    this.encumberedRun = function( enc, raw ) {
    };
    this.encumberedSwim = function( enc, raw ) {
        if( isNaN(enc) ) { enc = this.encumbrance( this.collections.equipped, true ); }
      //  var encumberedSwim = Math.floor( (10*this.basicSwim() - 2*enc)/10 );    // unclear in 4e: B354 says both "modified downward for encumbrance" and "Water Move 1 and Heavy Encumbrance would let you swim four yards in 10 seconds" - Heavy Encumbrance is 3, not 6.  I think they mean that Encumbrance should be doubled here, just like it is in 3rd edition.
        var e4encMoveMult = (1-0.2*enc).toFixed(1);
        var encumberedSwim = e4encMoveMult*this.basicSwim(raw);   // 3e: B91; 4e: B354
        //console.log("[ch.encumberedSwim] basic encumbered ("+enc+") swim: "+encumberedSwim);
        // encumberedSwim *= this.adjustmentsTo('WaterMove');
        encumberedSwim += this.adjustmentsTo('WaterMove');
        if( !raw ) encumberedSwim = Math.floor(encumberedSwim);
        var rawLim = (raw) ? 0.1 : 1;
        return (enc<5) ? Math.max( encumberedSwim, rawLim ) : 0;
    };
    this.encumberedFly = function( enc, raw ) {
        var fly = this.basicFly();
        if( isNaN(enc) ) { enc = this.encumbrance( this.collections.equipped ); }
        var rawEncumberedFly = (this.gameInfo.ruleset.match(/4/)) ? (Math.round(10-2*enc)/10*fly) : (fly - 4*enc);
        var encumberedFly = (raw) ? rawEncumberedFly : Math.floor(rawEncumberedFly);
        if( encumberedFly==0 ) return 0;  // no adjusting a zero flight move
        encumberedFly += (raw) ? this.adjustmentsTo('AirMove') : Math.floor(this.adjustmentsTo('AirMove'));
        return (enc<5) ? Math.max( encumberedFly, 0 ) : 0;
    };
    /* experimental; combine basic[Mode]+encumbered[Mode] */
    this.airMove = function( enc, raw ) {
        if( !enc ) enc = 0;
        // adjust for Enhanced Move (Air) (calculated differently for 3e vs 4e), Super Flight (3e)
        // 4e Enhanced Move progresses geometrically, like 3e Super [Mode] trait; Enhanced Move 3e is LINEAR
        if( this.hasTrait('EnhancedMoveAir') ) {
            // branch on ruleset
        }
        else if( this.hasTrait('SuperFlight') ) {}
    }
    this.groundMove = function( enc, raw ) {
        if( !enc ) enc = 0;
        let rawMove = this.basicSpeed() + this.attributePoints.Move/5 + this.adjustmentsTo('Move');
        // I'd prefer to have this^ be this.basicMove(raw), where that function would now do JUST the Basic Speed +/- attPoints.Move/5 part. Or something.
        if( this.hasTrait('NoLegsAquatic') ) rawMove /= 5;        // NoLegsAquatic adjustment should be a (multiplicative) Adjustment object in the library
        return (raw) ? rawMove : Math.floor( rawMove );
    }
    this.waterMove = function( enc, raw ) {
        if( !enc ) enc = 0;
        let basicSwim = (raw) ? this.basicMove(raw)/5 : Math.floor(this.basicMove()/5);  // B4E354
        if( this.gameInfo.ruleset.match(/3/) ) basicSwim = this.levelOfSkillWithInfo('Swimming')/10;  // B3E91
        if( this.hasTrait('Amphibious') ) basicSwim = this.basicMove(raw);
        if( this.hasTrait('NoLegsAquatic') ) basicSwim = 5*this.basicMove(raw);		// because it will have been divided by 5 in basicMove()
        return Math.max( basicSwim + this.adjustmentsTo('waterMove') - 2*enc, 1 );
    }
    /* Along with eliminating basic[Mode] and encumbered[Mode] methods in favor of [mode]Move methods, I should define a set of Run/Swim/Fly methods
      for "top speed" movement as defined under the Enhanced Move traits in CI54 and B4E52. */
    /*  Long-distance ground/water/air movement (B4E, chapter 10, ~pp350-360)
        This might require another method (or set of them), because many things affect distance movement separately from [mode]Move.
        * Hiking
          For long-distance ground movement (or "hiking"), the basis is Move - encumbrance - injury adjustments - exhaustion adjustments.
          After that, apply any Enhanced Move adjustments.  Then add any Hiking skill bonus.  Then apply terrain and weather mods.
        * Swimming
          There are no separate rules for sprint swimming vs long-distance swimming, except for frequency of Fatigue rolls (B4E355).
        * Flying
          For long-distance flight, use Air Move - encumbrance (x2?) - injury - fatigue ("exactly as you would for ground Move." B4E354)
          Then apply Enhance Move (Air), and Flight skill bonuses.  Terrain doesn't apply, weather is left to the DM.
    */
    this.encumberedHighJump = function( enc ) {    // (6*BM)-10 inches
        var move = this.basicMove();
        if( isNaN(enc) ) { enc = this.encumbrance( this.collections.equipped ); }
        var e4encMoveMult = (1-0.2*enc).toFixed(1);
        return (enc<5) ? Math.max( e4encMoveMult*(6*move-10), 1 ) : 0;
    };
    this.encumberedBroadJump = function( enc ) {    // (2*BM)-3 feet
        var move = this.basicMove();
        if( isNaN(enc) ) { enc = this.encumbrance( this.collections.equipped ); }
        var e4encMoveMult = (1-0.2*enc).toFixed(1);
        return (enc<5) ? Math.max( e4encMoveMult*(2*move-3), 1 ) : 0;
    };
    this.gender = function( gen ) {   // this is a getter/setter
        if( gen ) {
            this.description.gender = gen;
            if( this.description.artPath.match(/male\.gif/i) ) { this.description.artPath = '../images/'+gen+'.gif'; }
        }
        return this.description.gender;
    };
    this.race = function( r ) {   // this is a getter/setter
        if( r ) { this.description.race = r; }
        return this.description.race;
    };
    this.height = function( ht ) {
      // console.log("[character.height] param ht="+ht);
        if( ht ) {  // set height, converting to inches if necessary (round some, because javascript
                    // is wonky about division, but not so much as to make it weird for tiny characters)
            if( isNaN(ht) ) {
              console.log("[character.height] param ht isNaN");
                if( matches=ht.match(/(\d*)′(\d*)/) ) { this.description.height = 12*matches[1]+1*matches[2]; }
                else
                if( matches=ht.match(/(\d*)'(\d*)/) ) { this.description.height = 12*matches[1]+1*matches[2]; }
                else
                if( matches=ht.match(/(\d*\.?\d*)\s*cm/) ) { this.description.height = Math.round(matches[1]*3937)/10000; }
                else
                if( matches=ht.match(/(\d*\.?\d*)\s*m$/) ) { this.description.height = Math.round(matches[1]*3937)/100; }
                else { this.description.height = ht; }
            }
            else if( this.preferences.units.measure.match(/mks/i) ) { this.description.height = Math.round(ht*3937)/100; }
            else if( this.preferences.units.measure.match(/cgs/i) ) { this.description.height = Math.round(ht*3937)/10000; }
            else { this.description.height = 1*ht; }
        }
        else {      // return height, converting from inches if necessary
            var cheight = this.description.height;
            if( isNaN(cheight) ) { return cheight; }
            else {
                var unitsPref = this.preferences.units.measure;
                if( unitsPref.match(/mks/i) ) { return Math.round(cheight*2.54)/100; }
                else
                if( unitsPref.match(/cgs/i) ) { return Math.round(cheight*2.54); }
                else { return Math.round(cheight); }
            }
        }
    };
    this.weight = function( wt ) {
        if( wt ) {  // set weight, converting to pounds if necessary (round some, because javascript
                    // is wonky about multiplication, but not so much as to make it weird for tiny characters)
            var adjWt;
            if( isNaN(wt) ) {
             // console.log("[character.weight] param wt isNaN");
                if( matches=wt.match(/(\d*\.?\d*)\s*lb/) ) {adjWt = matches[1];}    // if( unitsPref != 'English' ) { if( confirm() ) this.preferences.units.measure = 'English'; }
                else
                if( matches=wt.match(/(\d*\.?\d*)\s*k/)  ) {adjWt = Math.round(matches[1]*22.0462)/10;}
                else
                if( matches=wt.match(/(\d*\.?\d*)\s*g/)  ) {adjWt = Math.round(matches[1]*22.0462)/10000;}
                else { this.description.weight = 1*wt; return; }
            }
            else if( this.preferences.units.measure.match(/mks/i) ) { adjWt = Math.round(wt*22.0462)/10; }
            else if( this.preferences.units.measure.match(/cgs/i) ) { adjWt = Math.round(wt*22.0462)/10000; }
            else { adjWt = wt; }
             // console.log("[character.weight] adjWt = "+adjWt);
            if( this.hasTraitGroup('build') || this.hasTraitGroup('BMI') ) {   // Fat, VeryFat, Overweight, Skinny
                if( this.hasTrait('Skinny') )     {adjWt /= 2/3;}
                if( this.hasTrait('Overweight') || (this.hasTrait('Obesity') && this.getTrait('Obesity').levels==1) ) {adjWt /= 1.3;}
                if( this.hasTrait('Fat') || (this.hasTrait('Obesity') && this.getTrait('Obesity').levels==2) )        {adjWt /= 1.5;}
                if( this.hasTrait('VeryFat') || (this.hasTrait('Obesity') && this.getTrait('Obesity').levels==3) )    {adjWt /= 2;}
            }
            this.description.weight = 1*adjWt;
        }
        else {      // return weight, converting from pounds if necessary
            var cweight = this.description.weight;
            if( isNaN(cweight) ) { return cweight; }
            else {
                if( this.hasTraitGroup('build') || this.hasTraitGroup('BMI') ) {   // Fat, VeryFat, Overweight, Skinny
                    if( this.hasTrait('Skinny') )     {cweight *= 2/3;}
                    if( this.hasTrait('Overweight') || (this.hasTrait('Obesity') && this.getTrait('Obesity').levels==1) ) {cweight *= 1.3;}
                    if( this.hasTrait(    'Fat'   ) || (this.hasTrait('Obesity') && this.getTrait('Obesity').levels==3) ) {cweight *= 1.5;}
                    if( this.hasTrait(  'VeryFat' ) || (this.hasTrait('Obesity') && this.getTrait('Obesity').levels==3) ) {cweight *= 2;}
                }
                var unitsPref = this.preferences.units.measure;
                if( unitsPref.match(/mks/i) ) {return Math.round(cweight*0.453592);}
                else
                if( unitsPref.match(/cgs/i) ) {return Math.round(cweight*453.592);}
                else {return Math.round(cweight);}
            }
        }
    };
    this.weightUnit = function() {
        var unitsPref = this.preferences.units.measure;
        if( unitsPref.match(/mks/i) ) {return 'kg';}
        else
        if( unitsPref.match(/cgs/i) ) {return 'g';}
        else {return 'lb';}
    };
    this.BMI = function() {
        //if( isNaN(this.height()) || isNaN(this.weight()) ) return null;
        rawBMI = this.weight()/Math.pow(this.height(),2);
        SI_BMI = rawBMI.toFixed(1);
        EnglishBMI = (703*rawBMI);
        EnglishBMI = EnglishBMI.toFixed(1);  // valid if height and weight are given in inches and pounds (usual situation, and currently FORCED by the height() and weight() methods)
      //  return () ? SI_BMI : EnglishBMI;
        return EnglishBMI;
    };
    this.adjustBuild = function( oldST ) {
        if( isNaN( this.description.height ) ) { console.log("[Character.adjustBuild] could not adjust non-numeric height ("+this.description.height+")"); return false; }
        if( isNaN( this.description.weight ) ) { console.log("[Character.adjustBuild] could not adjust non-numeric weight ("+this.description.weight+")"); return false; }
        // var heights = (this.gameInfo.ruleset.match(3)) ? heightsByST3e : heightsByST4e;
        // var weights = (this.gameInfo.ruleset.match(3)) ? weightsByST3e : weightsByST4e;
        // var oldAvHt = heights[oldST];
        // var oldAvWt = weights[oldST];
        // var newAvHt = heights[this.ST()];
        // var newAvWt = weights[this.ST()];
        var oldAvHt = this.ST2height( oldST );
        var oldAvWt = this.ST2weight( oldST );
        var newAvHt = this.ST2height( this.ST() );
        var newAvWt = this.ST2weight( this.ST() );
        console.log("[ch.adjustBuild] htsDiff = "+newAvHt+" - "+oldAvHt);
        console.log("[ch.adjustBuild] wtsDiff = "+newAvWt+" - "+oldAvWt);
        var htsDiff = newAvHt - oldAvHt;    // this is in inches
        var wtsDiff = newAvWt - oldAvWt;    // this is in pounds
      // this.height( this.height() + htsDiff );
      // this.weight( this.weight() + wtsDiff );
        this.description.height += htsDiff;
        this.description.weight += wtsDiff;
    };
    this.basicDamage = function( type, str ) {
      // codifies rules found at B3E248 and B4E16
      // alert( str+"\n"+type );
        var effST = (str) ? str : this.ST() + this.adjustmentsTo(type+'ST')
      // alert('[ch.basicDamage] effST: '+effST);
        var dice = 1;
        var adds = 0;
        if( type=='bite' ) {    // see table, B140 (should only be used in 3e rulesets/libraries)
            if( effST<15 ) {
                adds = -(5-Math.floor(effST/3));
            }
            else {
                dice = Math.floor( (effST+9)/20 );
                adds = Math.floor( (effST-1)/5 - 2 )%4 - 1;
            }
        }
        else if( type=='sw' ) {  // swing
            if( effST<9 ) {
                adds = -(5-Math.floor((effST-1)/2));
                // dice are always 1 in this range
            }
            else if( effST<28 ) {  /* ST 10 - 27 */
                dice = Math.floor((effST-9)/4)+1;
                adds = ((effST-9)%4)-1;
            }
            else if( effST<41 ) {  /* ST 28 - 40 */
                dice = Math.floor(((1+effST)/2)/4)+2;
                adds = (Math.floor((1+effST)/2)%4)-1;
            }
            else if( effST<100 ) { /* ST 70 - 99 */
                dice = Math.floor(effST/10)+3;
                if(effST<60) {
                    adds = ( (effST%10)<5 ) ? -1 : 1;
                }
                else {
                    adds = ( (effST%10)<5 ) ? 0 : 2;
                }
            }
            else {                 /* ST>=100 */
                dice = Math.floor(effST/10)+3;
            }
        }
        else { // thrust
            if( effST<11 ) { adds = -(6-Math.floor((effST-1)/2)); }
            else if( effST<40 ) {  /* ST 11 - 39 */
                dice = Math.floor((effST-11)/8)+1;
                adds = ( (Math.floor((effST-1)/2)-5)%4 )-1;
            }
            // thrust damage ad-hoc between ST 40 and ST 70; easier to just case it out
            else if( effST<45 ) {
                dice =  4;
                adds =  1;
            }
            else if( effST<50 ) {
                dice =  5;
            }
            else if( effST<55 ) {
                dice =  5;
                adds =  2;
            }
            else if( effST<60 ) {
                dice =  6;
            }
            else if( effST<65 ) {
                dice =  7;
                adds = -1;
            }
            else if( effST<70 ) {
                dice =  7;
                adds =  1;
            }
            else if( effST<100 ) { /* ST 70 - 99 */
                dice = Math.floor(effST/10)+1;
                adds = ( (effST%10)<5 ) ? 0 : 2;
            }
            else {                 /* effST>=100 */
                dice = Math.floor(effST/10)+1;
            }
        }
        return new DieRoll( dice, adds );
    };

    this.SM = function() {
        var SM = Number(this.description.sizeMod);
        var SMtrait = this.getTrait('SizeModifier');
        var adjustments = this.adjustmentsTo('SizeModifier|SM');
       // alert("SM trait levels: "+SMtrait.levels+"\nSM trait adjustments: "+adjustments);
        if( SMtrait ) { SM += SMtrait.levels + adjustments; }
        return SM;
    };

    this.TL = function() {
        var adjustments = this.adjustmentsTo('TL');
        return 1*this.gameInfo.TL + Math.floor( this.attributePoints.TL/5 ) + adjustments;
    };

    this.status = function() {
        var adjustments = this.adjustmentsTo('status');
        var Status = this.getTrait('Status');
        var status = (Status && Status.levels) ? Status.levels : 0;
        //console.log("[ch.status] returning "+status+"+"+adjustments);
        return status + adjustments;
    };

    this.campaign = function( newCampaign ) {
        if( newCampaign ) this.gameInfo.campaign = newCampaign;
        else return this.gameInfo.campaign;
    };
    this.GM = function( newGM ) {
        if( newGM ) this.gameInfo.GM = newGM;
        else return this.gameInfo.GM;
    };

    this.edition = function() {
       // console.log("[character.edition] returning RulesetNames["+this.gameInfo.ruleset+"] = "+RulesetNames[this.gameInfo.ruleset]);
        return RulesetNames[this.gameInfo.ruleset];
    };

    /* points accounting */
    // attributes total
    this.attributePointsTotal = function() {
        return 1*this.attributePoints.ST+1*this.attributePoints.DX+1*this.attributePoints.IQ+1*this.attributePoints.HT;
    };
    // secondary characteristics points total
    this.secCharPointsTotal = function() {
        return  this.attributePoints.HP + this.attributePoints.Will  + this.attributePoints.Per
              + this.attributePoints.FP + this.attributePoints.Speed + this.attributePoints.Move;
    };
    // summary total for these
    this.attsEtcPoints = function() {
        return this.attributePointsTotal() + this.secCharPointsTotal();
    };
    // does this need to be a privileged method?
    this.pointsFromUnTraits = function(unTraitType) {
        var pts = 0;
        for( var member in this.traits ) { // loop over character traits
            var pTrait = this.traits[member];
            // see if this trait is an inTemplate trait
            if( pTrait.hasOwnProperty('inTemplate') ) { // if so,
                continue;
            } // if this trait has the inTemplate property
            // catch templates here, so we can loop over traits of matching template and compare
            if( pTrait.hasOwnProperty('templateTrait') ) {
//               alert("template:\n"+JSONstring.make(pTrait));
                var traitTemplateKey = pTrait.key;
   //               alert("looking for/at Templates["+traitTemplateKey+"] in Templates library object");
                var template = Templates[traitTemplateKey];
                // var template = ( Templates[traitTemplateKey] ) ? Templates[traitTemplateKey] : this.templates[traitTemplateKey];
                var traitsInTemplate = template.traits;
                for( var j in traitsInTemplate ) {
                    var traitInTemplate = traitsInTemplate[j];
                    if( !traitInTemplate.hasOwnProperty('finalCost') )
                        traitInTemplate = cloneTraitFromGenericObject( traitInTemplate );
                    // find corresponding trait in the character
                    var chTraitFromTemplate = ( traitInTemplate.hasOwnProperty('multiple') )
                                            ? this.getTrait( traitInTemplate.key, traitInTemplate.multiple )
                                            : this.getTrait( traitInTemplate.key );
           //         alert(JSONstring.make(chTraitFromTemplate));
                    // compare trait to template version
                    var costDiff = -traitInTemplate.finalCost();
                    if( chTraitFromTemplate ) {   // tally cost difference to add to pts

                        costDiff += chTraitFromTemplate.finalCost();
                    }
                    var CostDiffTraitType = ( costDiff>0 ) ? 'advantages' : 'disadvantages';  // do I need to account perks and quirks?
                    if( costDiff && CostDiffTraitType==unTraitType ) {    // if there is a difference in cost, AND the trait type corresponding to the cost difference matches what I'm looking for, add it to pts
                        pts += costDiff;
                        // alert("looking for "+unTraitType+":\n\n"+JSONstring.make(chTraitFromTemplate)+"\n\n differs by "+costDiff+" from\n\n"+JSONstring.make(traitInTemplate)+"\n\n total un-points: "+pts);
                    }
                }  // loop over traits in the template
            } // if( templateTrait ) branch
        } // loop over this.traits
        return pts;
    };
    this._traitsTotalPoints = function(traitType) {
        var pts = 0;
        for( var member in this.traits ) {
            var pTrait = cloneTraitFromGenericObject( this.traits[member] );
            if( pTrait.isInvalid() ) { pTrait.repair() }
            if( pTrait.hasOwnProperty('inTemplate') ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; in Template");*/ continue; }
            if( pTrait.hasOwnProperty('line') ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; line");*/ continue; }
            //console.log(pTrait);
            if( !pTrait.type ) pTrait.repair();
            if( pTrait.type.match(/AD/i) ) {
                // disqualify traits that are actually the wrong type
                let computedType = pTrait.getType();
                //console.log("[_traitsTotalPoints] "+pTrait.name+" computed type is "+computedType+"; looking for "+traitType);
                if( computedType+'s' != traitType ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; computed type ("+computedType+") does not match");*/ continue; }
            }
            if( traitType=='advantages'    && !pTrait.type.match(/A/i) ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; type does not match A");*/ continue; }
            if( traitType=='disadvantages' && !pTrait.type.match(/D/i) ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; type does not match D");*/ continue; }
            if( traitType=='languages'     && !pTrait.type.match(/L/i) ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; type does not match L");*/ continue; }
            if( traitType=='cultures'      && !pTrait.type.match(/C/i) ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; type does not match C");*/ continue; }
            if( traitType=='perks'         && !pTrait.type.match(/P/i) ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; cost != 1");*/ continue; }
            if( traitType=='quirks'        && pTrait.finalCost() != -1 ) { /*console.log(pTrait.name+" disqualified as a(n) "+traitType+"; cost != -1");*/ continue; }
            if( typeof pTrait.finalCost != 'undefined' ) { pts += 1*pTrait.finalCost(); }
            // console.log("[Character._traitsTotalPoints("+traitType+")] "+pTrait.name+" pTrait.finalCost="+pTrait.finalCost());
         // if( traitType.match(/quirk/i) ) // alert("_traitsTotalPoints just added "+pTrait.finalCost()+" points from "+pTrait.name);
          // console.log(pTrait);
        }
        //alert("_traitsTotalPoints at "+pts+" points after tallying "+traitType);
        //alert('plus '+this.pointsFromUnTraits(traitType)+' points from un-traits');
        pts += this.pointsFromUnTraits(traitType);
        return pts;
    };
    this.advantagesTotalPoints = function() { /* this includes 4e Languages & Cultural Familiarities, and Perks */
        return this._traitsTotalPoints('advantages');
    };
    this.perksTotalPoints = function() { return this._traitsTotalPoints('perks'); };
    this.adsPerksPoints = function() { return this.advantagesTotalPoints() + this.perksTotalPoints(); }
    // Languages & Cultural Familiarities points total
    this.familiaritiesPoints = function() {   /* obsolete, now that these have their own trait types */
        var famsPts = 0;
        // tote up all Traits with key=Language to get languages
        let langFams = this.getTraits('Language');
        for( let langObj of langFams ) {
            famsPts += 1*langObj.finalCost();
        }
        // ditto for Traits with key=CulturalFamiliarity for those
        let cultFams = this.getTraits('CulturalFamiliarity');
        for( let cfObj of cultFams ) {
            famsPts += 1*cfObj.finalCost();
        }
        return famsPts;
    }
    this.familiaritiesPoints = function() { return this._traitsTotalPoints('languages') + this._traitsTotalPoints('cultures'); }
    // advantages, without Languages, Cultural Familiarities, Perks
    // summary total for these
    this.adsEtcPoints = function() {
        // console.log("[Character.adsEtcPoints] returning "+this.advantagesTotalPoints()+" + "+this.perksTotalPoints()+" + "+this.attributePoints.TL+" + "+this.familiaritiesPoints());
        return this.advantagesTotalPoints() + this.perksTotalPoints() + this.attributePoints.TL + this.familiaritiesPoints();
    };
    // for correct accounting of disadvantage limit
    this.attrDisadPoints = function() {
        var attDisadPts = 0;
        for( const att in this.attributePoints ) {
            if( this.attributePoints.hasOwnProperty(att) ) {
              var attPts = this.attributePoints[att];
              if( attPts<0 ) {
                  if( this.gameInfo.ruleset.match(/3/) && this[att]()<8 )
                      attDisadPts += attPts;
                  else if( this.gameInfo.ruleset.match(/4/) )
                      attDisadPts += attPts;
              }
            }
        }
       // if(attdisadPts) console.log("[ch.attrDisadPoints] returning "+attdisadPts);
        return attDisadPts;
    }
    // Disads/Quirks points total
    this.disadsPoints = function() { return this._traitsTotalPoints('disadvantages'); };
    this.quirksPoints = function() { return this._traitsTotalPoints('quirks'); };
    this.disadsQuirksPoints = function() { return this.disadsPoints() + this.quirksPoints(); }

    this.disadLimitPoints = function() {
        // disad points + low status, etc + lowered attributes
        // loop over ch.attributePoints, and sum the negative points?
        var lowAtts = 0;
        for( let att in this.attributePoints ) {
            if( this.attributePoints[att]<0 ) lowAtts += this.attributePoints[att];
        }
        // quirks??
        return -( lowAtts + this.disadsPoints() );
    }

    this.pointsFromTemplateSkillVariances = function() {
        pts = 0;
        for( var s in this.skills ) {
            var skill = this.skills[s];
            // see if this skill is an inTemplate trait
            if( skill.hasOwnProperty('inTemplate') ) {
                // fetch the corresponding template
                var templateKey = skill.inTemplate;
                var corrTemplate = Templates[templateKey];
                for( var p in corrTemplate.skills ) { // loop through to find the corresponding skill
                    var templateSkill = corrTemplate.skills[p];
                    // see if this is the matching skill in the template (What about skills that can be taken multiple times, with the same key?)
                    if( templateSkill.key==skill.key ) {  // if so,
                        // compare this corresponding skill in the template to the inTemplate skill in the Character object
                        var costDiff = skill.points - templateSkill.points;
         //             alert("comparing\n"+JSONstring.make(templateSkill)+"\nto\n"+JSONstring.make(skill));
            //          alert(JSONstring.make(skill)+"\n\n differs by "+costDiff+" from\n\n"+JSONstring.make(templateSkill));
                        pts += costDiff;
                    } // if this is the corresponding skill from the template
                } // loop over template skills
            } // if this skill has the inTemplate property
        } // loop over character skills
        return pts;
    };
    // Skills points total
    this.skillsTotalPoints = function() {
        var pts = 0;
        var skillsObj = this.skills;
        for( var m=0;  m<skillsObj.length; m++ ) {
            var skill = skillsObj[m];
            if( skill.hasOwnProperty('inTemplate') ) { continue; }
            if( skill.hasOwnProperty('line') ) { continue; }
            if( skill.points ) { pts += 1*skill.points; }
            if( window.console && reportLevel>2 ) { console.log("[skillsTotalPoints] skill points total: "+pts+" (after '"+skill.name+"' skill)"); }
        }
        pts += this.pointsFromTemplateSkillVariances();
        return pts;
    };
    this.spellsTotalPoints = function() {
        let pts = 0;
        let skillsObj = this.skills;
        for( var m=0;  m<skillsObj.length; m++ ) {
            let skill = skillsObj[m];
            if( skill.hasOwnProperty('inTemplate') ) { continue; }
            if( skill.hasOwnProperty('line') ) { continue; }
            if(!skill.hasOwnProperty('spell') ) { continue; }
            if( skill.points ) { pts += 1*skill.points; }
            if( window.console && reportLevel>2 ) { console.log("[spellsTotalPoints] spell points total: "+pts+" (after '"+skill.name+"' skill)"); }
        }
        return pts;
    };

    // other points?
    this.otherPoints = function() { return '-'; };
    // in B4e, Prof. Headley's character sheet shows 36 points under 'Other'; they are his Ritual Paths and Spells.

    // Total Points Summary Total
    this.totalPoints = function() {
      //  console.log("[ch.totalPoints]:\n  atts: "+this.attsEtcPoints()+"\n  skills: "+this.skillsTotalPoints()+"\n  ads: "+this.adsEtcPoints()+"\n  disads: "+this.disadsQuirksPoints());
        return 1*this.attsEtcPoints() + 1*this.skillsTotalPoints()
             + 1*this.adsEtcPoints()  + 1*this.disadsQuirksPoints();  // add others as you define them
    };

    /* weight and encumbrance accounting */
    // this is currently being handled by loadCharacter; not sure that is the right place for it
    this.totalWeightCost = function() {
        var weight = 0;
        var cost   = 0;
        for( var item in this.equipment ) {}
        for( var item in this.armor ) {}
        for( var item in this.handWeapons ) {}
        for( var item in this.rangedWeapons ) {}
        return [ weight, cost ];
    };

    /* Persistence */

    this.putInLocalStorage = function( fileName ) {    /*  This function is not currently being used.  */
        if( !localStorage ) { alert("You will not be able to save characters.\n(No localStorage found)"); }
        if( window.console && reportLevel ) { console.log('saving '+this.description.name); }

        /* pack and store Character*/
        // create a JSON string of the Character object
        var CharacterJSON = JSONstring.make(this);
        var ID = this.description.ID;
        // store it
  //      if( window.console && reportLevel>3 ) { console.log('before storing, size of DOM cache: '+$.jStorage.storageSize()); }
  //      $.jStorage.set( ID, CharacterJSON );
  //      if( window.console && reportLevel>3 ) { console.log('after storing, size of DOM cache: '+$.jStorage.storageSize()); }
  //      if( window.console && reportLevel>3 ) { console.log('stored keys: '+$.jStorage.index()); }
        if( window.console && reportLevel>3 ) { console.log('before storing, there are '+localStorage.length+' items in the DOM cache'); }
        localStorage.setItem( ID, CharacterJSON );
        if( window.console && reportLevel>3 ) { console.log('after storing, there are '+localStorage.length+' items in the DOM cache'); }

        /* add the Character ID to a stored list */
        if( window.console && reportLevel>2 ) { console.log('in save: getting the stored IDs: '+getCookie('characterIDsNames')); }
        // get the stored list of IDs
        var storedCharacterInfo = getCookie('characterIDsNames');
        var delim = ( storedCharacterInfo ) ? ',' : '';
        // check to see if this character (ID->name) is already stored, first
        if( !storedCharacterInfo ) {
            if( window.console && reportLevel>2 ) { console.log('no saved names, starting list'); }
            storedCharacterInfo = ID+':'+this.description.name;
        }
        else if( !storedCharacterInfo || !storedCharacterInfo.match( ID ) ) {
            // if not there, add it to the list
            if( window.console && reportLevel>2 ) { console.log('new saved name'); }
            storedCharacterInfo += delim+ID+':'+this.description.name;
        } else { if( window.console && reportLevel>2 ) { console.log(ID+' was already stored'); } }
        // store the updated IDs->names object
//        alert("storing ID->name info:\n"+storedCharacterInfo);
        setCookie( 'characterIDsNames', storedCharacterInfo, 500 );
        setCookie( 'characterIDcache', ID, 500 );
    };


    this.saveAsFile = function() {
        // check this.description.createDate; if false (i.e., if this file has never been saved before), set it
        if( this.description.createDate===false ) this.description.createDate = date.getTime();

        // look for global characterFileName (saved when this character was loaded from a file, perhaps)
        // if none found, make a usable name from ch.description.name
        var saveFileName = ( characterFileName ) ? characterFileName : ch.description.name;
        saveFileName = saveFileName.replace(/\s+/g,'_');
        saveFileName = saveFileName.replace(/\W+/g,'');
        saveFileName = saveFileName.replace(/gurps$/,'');
        saveFileName = saveFileName.replace(/jcsp$/,'');
        saveFileName += ".jcsp"

        // create dynamic <a /> tag, populate, and click 
        var a = document.createElement("a");
        a.href = 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSONstring.make(this));
        a.download = saveFileName;
        document.body.appendChild(a);
        a.click();
        // remove tag once it is used
        setTimeout(
          function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  // where is url defined?
          },
          0
        ); 
    }


    /* This function is called by loadCharacter near its end. */
    this.store = function() {

        var ID = this.description.ID;

        try {
            var oldCachedID = sessionStorage.getItem( 'cachedCharacterID' );
            if( oldCachedID ) sessionStorage.removeItem( oldCachedID );
    //         JSONstringIncFuncsState = JSONstring.includeFunctions;
    //         JSONstring.includeFunctions = true;
            var CharacterJSON = JSONstring.make(this);
    //         JSONstring.includeFunctions = JSONstringIncFuncsState;
            sessionStorage.setItem( ID, CharacterJSON );
            sessionStorage.setItem( 'cachedCharacterID', ID );
        } catch(e) {
            console.log("[Character.store] unable to cache character in sessionStorage: "+e.message);
        }

    };

    /*
      Use this function to save many preferences simultaneously, as from the Edit Preferences form.
      These are "display" preferences: where to put overflow skills, whether to show Grimoire, etc.
      Will also store CSS themes here; any theme stored in the Character object should override
      a CSS theme stored at a less-specific level.
      Will require a new branch in the Character object...
    */
    this.setDisplayPreferences = function() {
    };
    /* Huh.  After I put this here, I put a function for this in gurps.js.  Should it go here?
      Maybe what should happen is that the guts should go here, and the function in gurps.js
      should call this one (for now).  I could point the gurps.js function at different things
      depending on how exactly I want to implement preferences this way.
    */
    // is this all superfluous after rework of these prefs forms?  may never call this OR the other function now.


    /*- - - - - - - - - - - - - PUBLIC MEMBERS - - - - - - - - - - - - - -*/
    // These are still instance-specific,
    // but each instance gets a copy of these when it is instantiated.
    // Public methods should be set outside the constructor, using prototype
    // (because they are 'constant' - the same for every Character instance).

    // put this first, because the ruleset affects defaults for other members
    this.gameInfo = {
        ruleset  :  ruleset || 'e4',
        campaign : '',
        GM       : '',
        TL       :  TL || 3,
        startingWealth : StartingWealth_for_TL[TL] || 1000,    // StartingWealth_for_TL is defined in each edition library
        disadPointsLimit : 40,
        quirkPointsLimit : 5
    };

    this.description = {
        name       :  name,
        ID         :  ID,
        //createDate :  date.getTime(),
        createDate :  false,
        pointTotal :  pointTotal,
        height     :  ( this.gameInfo.ruleset.match(3) ) ?  69 : 68,    // default height, in inches
        weight     :  ( this.gameInfo.ruleset.match(3) ) ? 150 : 145,   // default weight, in pounds  (if this weight is auto-adjusted, it is 'basic' weight, BEFORE any adjustments from 'build' traits)
        sizeMod    :  0,
        gender     : 'male',
        age        :  20,
        race       : 'human',
        appearance : '',
        statusText : '',
        repText    : '',
        shortStory : '',
        story      : '',
        goals      : '',
        notes      : '',
        artPath    : '../images/male.gif'
    };

    this.playerInfo = {
        name  : ''
    };

    this.preferences = {     // analogs (with default values) for each entity in Preferences dialog
        display : {
            theme        : 'blue',
            watermark    : 0,
            grimoire     : false,
            property     : false,
            TLinfo       : true,
            fractions    : false,
            shortnames   : false,
            skilltypes   : false,
            adjTraitRows : false,
        showStartingCash : false,
            traitsScroll : false,
            traitsSupp   : false,
            skillsScroll : true,
            skillsSupp   : false,
            stuffScroll  : true,
            stuffSupp    : false,
         // traitsSuppAll: false,
         // skillsSuppAll: false,
         // stuffSuppAll : false,
            suppCombo    : false
        },
        units : {
            measure: 'English',
            money: '$'
        },
        autoAdjustBuild : false
    };

    this.attributePoints = {
        ST   : 0,
        DX   : 0,
        IQ   : 0,
        HT   : 0,
        HP   : 0,
        Will : 0,
        Per  : 0,
        FP   : 0,
        Speed: 0,
        Move : 0,
        TL   : 0
    };

    // console.log("[Character.constructor] gameInfo:");
    // console.log(this.gameInfo);

    this.traits        = new Array();

    this.skills        = new Array();

    // These are for all equipment belonging to the character.
    this.equipment     = new Array();
    this.weapons       = new Array();

    // Equipment collections
    this.collections = {
    		equipped : 'default',                 // this will be the *label* for the collection being used
    		default  : [ 'default collection' ]		// use first array slot for collection name
    	//	collect2 : [ 'colletion 2', equipmentItem1, equipItem2, etc. ]
    };

    // spaces to add custom or local Modifiers, Adjustments, etc.
    this.templates = {};
    this.groups = {};       // things listed here will be added to local Group items (no replacement)
    this.modifiers = {};
    this.adjustments = {};
    this.prerequisites = {};
    this.defaults = {};

}  // end Character object constructor


/* - - - - - - - - - - - - public Character methods - - - - - - - - - - - - - */

// adjustmentsTo() works only when the Adjustments are strictly additive; does not work for multipliers like Enhanced Move
Character.prototype.adjustmentsTo = function( target, returnString, report ) {
    var totalAdjustment = 0;
    var cumMultiplicativeAdjustment = 1;
    var adjStrings = [];
    var loops = 0;
    if( window.console && reportLevel>2 ) { var stamp = new Date().getTime(); console.log("starting ADJUSTMENT loop: "+stamp); }
    //console.log(Adjustments);
    var targetORtokens = target.split('|');
    var targetRE = new RegExp('^'+targetORtokens.join('$|^')+'$', 'gi'); // console.log(targetRE);
  ADJUSTMENT:
    for( var x in Adjustments ) {
        var adjustmentItem = Adjustments[x];
        loops++;

        // pick out those with a target equal to the one we're looking for
        if( adjustmentItem.target && adjustmentItem.target.match(targetRE) ) {
            if(report) alert("found an adjustment ("+x+") for "+target+":\n"+JSONstring.make(adjustmentItem));
          //if( window.console && reportLevel>3 )
            // console.log("found an adjustment ("+x+") for "+target+":"); console.log(adjustmentItem);
            var from    = adjustmentItem.from;            // this will be the 'key' for a trait, stat, etc.
            if(report) alert('from: '+from);
            var fromCat = adjustmentItem.fromCategory;    // 'stats', etc. (absence implies this is 'trait')
            if(report) alert('fromCat: '+fromCat);
            var adjAmt  = eval(adjustmentItem.amount);        // hopefully a number, even an integer (but not always, like with Enhanced Move half-levels)
            if(report) alert('adjAmt: '+adjAmt);

            // is the 'from' a trait, stat, or what?
            if( fromCat && fromCat.match(/stat/) ) {
                // look at 'from', to see if it is a true statement about the loaded character
                // I'm assuming it looks like 'IQ>=12' or some similar logic statement
                // (also handle the 'always apply' case: handled as a 'stat' adjustment, with a blank 'from')
                var op = from.match(/\W+/g);
                var condTokens = from.split(/\W+/g);
              //  alert('comparing '+condTokens[0]+' to '+condTokens[1]);
                // if so, add the adjustment amount
                if(
                    ( op=='>'  && this[condTokens[0]]()>condTokens[1] )
                    ||
                    ( op=='>=' && this[condTokens[0]]()>=condTokens[1] )
                    ||
                    ( op=='='  && this[condTokens[0]]()==condTokens[1] )
                    ||
                    ( op=='<=' && this[condTokens[0]]()<=condTokens[1] )
                    ||
                    ( op=='<'  && this[condTokens[0]]()<condTokens[1] )
                    ||
                    ( !from )
                  ) {
                    totalAdjustment += adjAmt;
                    var adjSign = (adjAmt<0) ? '' : '+';
                    adjStrings.push( adjSign + adjAmt + ": " + from );
                }
            }   // fromCat = stat branch
            else if( fromCat && fromCat.match(/^sk/i) ) {    // 3e Move_from_Running, Language_from_Linguistics, [defense]_from_PrecognitiveParry (none in 4e?)
                var chSkill = this.getSkill(from);            // Precognitive Parry Adjustment to active defenses
                // if the 'from' isn't a skill the character has, this Item should get skipped
                if( this.hasSkill(from) ) {
                    if(report)
                      alert("character has this skill:\n"+JSONstring.make(chSkill));
                    var skLevel = this.getSkill( from ).level();
                    //  alert("skill level:\n"+skLevel);
                    // if( type=='points' ), scale the adjustment to be equivalent in value to what that number of points would give (if no other points were applied)
                    // That may not be adequate - want to add this to virtual points, really.
                    //  Maybe don't use this kind here, and instead grab these adjustments somehow in Skill.virtualPoints()?
                    if( adjustmentItem.hasOwnProperty('per') ) {
                        adjAmt = 1*adjAmt/adjustmentItem.per;
                    }
                    else {  // assume "per level" unless told otherwise via "per" property above
                        adjAmt = 1*adjAmt*skLevel;
                    }
                    totalAdjustment += adjAmt;
                    var adjSign = (adjAmt<0) ? '' : '+';
                    adjStrings.push( adjSign + adjAmt + ": " + from );
                    if(report)
                      alert("totalAdjustment += "+adjAmt);
                }
            }
            // other 'from' category branches?
            else {   // assume all other cases are fromCategory: 'trait'
                var chTraits = this.getTraits(from);
                // if the 'from' isn't a trait the character has, this Item should get skipped
                if( chTraits.length ) {
                  // if(report)
                   //  alert("getTraits returned these traits:\n"+JSONstring.make(chTraits));
                    for( var t=0; t<chTraits.length; t++ ) {
                        var chTrait = chTraits[t];
                        // if(target=='status')
                       //  alert("character has this trait:\n"+JSONstring.make(chTrait));
                        //    console.log("have a source trait ("+chTrait.name+") for adjustment ("+x+") for "+target+":\n"+JSONstring.make(adjustmentItem));
                        var adjustmentAmount = adjAmt;
                      //  alert("adjustment amount before levels: "+adjustmentAmount);
                        var adjSign = (adjAmt<0) ? '' : '+';
                        if( chTrait.hasOwnProperty('levels') && (!adjustmentItem.type || !adjustmentItem.type=='*') )
                            adjustmentAmount *= ( adjustmentItem.hasOwnProperty('per') && !adjustmentItem.per ) ? 1 : chTrait.levels;

                        // other necessary processing?
                        // One possible way to handle an Adjustment like the one for Magery (which adjusts a class - Spells)
                        //  would be to check here for whether the 'this' Skill fits into a class, then look for
                        //  adjustments to that class.  Cumbersome...
                        // Another way to do it would be to check for class-level adjustments in the 'level' function.

                        // I think doing this function as a method for the Character object opens up
                        // some possibilities.  If I use an optional parameter, I could look
                        // for group or class adjustments that way, for instance.
                        // My current inclination is to deal with some of that level outside of here.
                        // For instance, if I'm looking for adjustments to a character's dodge score,
                        // I will sent at least two requests to this function:
                        //    ch.adjustmentsTo('Dodge')
                        //    ch.adjustmentsTo('ActiveDefenses')
                        // if(target=='status')
                        //   console.log("totalAdjustment += "+adjustmentAmount);
                        //  console.log("totalAdjustment += "+adjustmentAmount);
                        if( !totalAdjustment ) totalAdjustment = adjustmentAmount;
                      //  else if( adjustmentItem.type=='*' ) cumMultiplicativeAdjustment *= adjustmentAmount ** chTrait.levels;  // separate accumulator for multiplicative adjustments; applies after ADJUSTMENT loop
                        else totalAdjustment += adjustmentAmount;
                        if( adjustmentItem.type=='*' ) {
//                             cumMultiplicativeAdjustment *= adjustmentAmount ** chTrait.levels;  // separate accumulator for multiplicative adjustments; applies after ADJUSTMENT loop
//                             console.log("[ch.adjustmentsTo] '*'-type adjustment; cumMult is "+cumMultiplicativeAdjustment);
//                             adjStrings.push( '×' + Math.round(100*cumMultiplicativeAdjustment)/100 + ": " + chTrait.name );
                        }
                        else {
                            // totalAdjustment += adjustmentAmount;
                            adjStrings.push( adjSign + Math.round(10*adjustmentAmount)/10 + ": " + chTrait.name );
                        }
                    }
                }   // Character has this trait
            }   // fromCat==trait
        }   // target match branch
    }   // Adjustments loop
    // totalAdjustment *= cumMultiplicativeAdjustment;   this means if you have +3 and *2 adjustments, they will be applied in that order: (x + 3)*2 = 2x + 6, instead of 2x + 3.
                                                      // still wrong!  I always call this method thus:  basicValue + ch.ajustmentsTo(thing);  A multiplicative adjustment ADDED to the base value doesn't work.
    if( window.console && reportLevel>2 ) { var stamp = new Date().getTime(); console.log("ending "+loops+" ADJUSTMENT loop iterations: "+stamp); }
    if(report)
      alert("adjustmentsTo("+target+") is returning '"+((returnString) ? adjStrings.join(', ') : totalAdjustment)+"'");
    return (returnString) ? adjStrings.join(', ') : totalAdjustment;
}
Character.prototype.adjusted = function( target, returnString, report ) {

    // Constitute a 'base' for the adjustment
    if( !this.hasOwnProperty(target) ) return false;
    let targetBase = ch[target]();
    /* For this "constituted base" idea to work, there needs to be a perfect 1-1 matchup between method names found here,
       and targets used in library Adjustment items, except those with targetCategory="SK".  This could be relaxed slightly,
       in the sense that some of the non-SK Adjustment items (e.g. Aging) are not actually being used. I can perhaps expect
       that if I ever decide to use them in a character sheet, I would need to write Character methods for them anyway.
       
       If I am able to implement this, I should put some documentation in the libraries near the Adjustments:
       Valid target values include:
       *  any Skill object key (must also set targetCategory = "SK")
       *  any Group object key (must also set targetCategory = "GR" or "CL")
       *  any Character class method which can be called with NO arguments, returning a numerical value
       
       That bit about no arguments is going to bite me in the ass.
       My most important use for this method is to get adjusted Moves, and these must take encumbrance into account.
       This may require a basicAirMove and basicWaterMove to complement the new conceptualization of basic[Ground]Move.
       So this would need to be used INSIDE some encumbered[Mode]Move methods:
          let unencumberedMove = this.adjusted('[mode]Move')  // would call analogies to basicMove; no encumbrance but additive and multiplicative adjustments to basic Move in that medium applied
       then do the encumbrance calculations (differently for each medium)
       WATCH FOR INFILOOP CONDITIONS!
       */

    /*  This function could work this way:
        Let x be base amount (skill level, move, etc); needs to be passed in as an argument.
        This function would return

            multiplicativeAdj * ( x + additiveAdj ),

        where additiveAdj = ch.adjustmentsTo( target )
        and multiplicativeAdj is calculated as demonstrated in adjustmentsTo(), even though it doesn't work usefully there.
    */
    let multAdj = 1;

  ADJUSTMENT:   // now only looking for multiplicative adjustments
    for( var x in Adjustments ) {
        let adjustmentItem = Adjustments[x];
        let multAdj = 1;

        const targetORtokens = target.split('|');
        const targetRE = new RegExp('^'+targetORtokens.join('$|^')+'$', 'gi'); // alert(targetRE);
        if( adjustmentItem.target && adjustmentItem.target.match(targetRE)      // match target
            && adjustmentItem.type && adjustmentItem.type=='*' ) {              // only multiplicative Adjustments here
            // localize adjustmentItem attributes
            let from    = adjustmentItem.from;
            let fromCat = adjustmentItem.fromCategory;
            let adjAmt  = eval(adjustmentItem.amount);
            if( fromstat ) {
            }
            else if( fromskill ) {
            }
            else {  // fromtrait
                let chTraits = this.getTraits(from);
                if( chTraits.length ) {   // if this Character has one or more instances of the target Trait,
                    for( let t=0; t<chTraits.length; t++ ) {
                        let chTrait = chTraits[t];
                        if( chTrait.hasOwnProperty('levels') ) {
                            let fromLevels = ( adjustmentItem.hasOwnProperty('per') && !adjustmentItem.per ) ? 1 :  chTrait.levels;
                            multAdj *= ( adjAmt==1 || adjAmt==false ) ? (fromLevels+1) : adjAmt**fromLevels;
                        }
                        else multAdj *= adjAmt;
                    }
                }
            } // fromtrait
        }   // target match branch
    }   // ADJUSTMENT Adjustments loop
//     return ( returnString )
//           ? "("+adjStrings.join(', ')+")×"+ch.adjustmentsTo( target, returnString )
//           : multAdj * ( targetBase + ch.adjustmentsTo( target ) );
    return multAdj * ( targetBase + ch.adjustmentsTo( target ) );
}

Character.prototype.viewCharacterAsFile = function() {
    // instructions
    // create a JSON string of the Character object
    var CharacterJSON = JSONstring.make(this); // alert(CharacterJSON);
  //  CharacterJSON = FormatJSON( this );
    // create a new window, access its document, and write the JSON there
  //  alert(characterFileName);
    var JSONwindow = window.open('',characterFileName);
    JSONwindow.name = ( characterFileName ) ? characterFileName : 'character.jcsp';
    JSONwindow.status = ( characterFileName ) ? characterFileName : 'character.jcsp';
    var JSONdocument = JSONwindow.document;
    JSONdocument.title = ( characterFileName ) ? characterFileName : 'character.jcsp';

    JSONdocument.write("<head>\n<title>"+this.description.name+".jcsp</title>\n</head>\n\n");
    JSONdocument.write("<pre>\n"+CharacterJSON+"\n</pre>");
    JSONdocument.close();
}

Character.prototype.makeTemplate = function() {
    // convert attributes into trait objects
    // copy these and regular traits as new traits with 'inTemplate' attributes
    // put them where?
    // do something clever with skills
    // what if there are linker objects (adjustments, defaults, etc.)?
    // create a new meta-trait for this template
    // * name from description.name
    // * point value from description.pointTotal
}

// Skill methods (many, perhaps all, have analogs under the Skill or Skills objects)
Character.prototype.hasSkill = function( skillKey, spec ) {
   // console.log("[hasSkill] looking for "+skillKey+" in skills, with spec "+spec);
    for( var m in this.skills ) {
        var skill = this.skills[m];
        // in each, look for skill with matching key
        if( skill.key==skillKey ) {
           // console.log(skill);
            if( spec && isNaN(spec) ) {
                if( spec!=skill.specialization ) continue;
            }
            else if( spec!=skill.TL ) continue;
            cutoff = ( this.gameInfo.ruleset.match('e4') ) ? 1 : 0.5;
            return ( skill.points<cutoff ) ? false : true;
        }
    }
    return false;
};
Character.prototype.getSkill = function( skillKey, spec, not ) {
    // want to be able to get things like "any Guns skill with a different specialization"
		// if skillKey is a number, assume it is an index in the ch.skills array
    // console.log("[Ch.getSkill] looking for "+skillKey);
    if( Number.isInteger(skillKey) ) {
    		return this.skills[skillKey];
    }
    // search for a skill in ch.skills with this key attribute
    for( var s=0; s<this.skills.length; s++ ) {
        if( this.skills[s].key==skillKey ) {
            if( spec )
                if( not ) {
                    if( this.skills[s].specialization==spec ) continue
                    else return this.skills[s];
                }
                else {
                    if( this.skills[s].specialization==spec ) return this.skills[s]
                    else continue;
                }
            else
                return this.skills[s];
        }
    }
    return false;
};
Character.prototype.pointsInSkillWithInfo = function( skillKey, TL, spec ) {
    //  alert( "skillKey: "+skillKey+"\nTL: "+TL+"\nspec: "+spec );
    if( skillKey.match('_') && !(TL || spec) ) {    // skillKey in the 'Guns6_Pistol' format; contains TL and spec info
        tokens = skillKey.split('_');
        matches = tokens[0].match(/\d+/);
        TL = (matches) ? Number(matches[0]) : null;
        subtokens = tokens[0].split(/\d/);
        skillKey = subtokens[0];
        spec = tokens[1];
       //  alert('got skillKey '+skillKey+"\nTL "+TL+"\n spec "+spec);
    }
    if( spec ) spec = spec.toLowerCase();
    for( var s in this.skills ) {
        var TLmatch   = ( !TL   || this.skills[s].TL==TL ) ? true : false;
        var specialization = (this.skills[s].specialization) ? this.skills[s].specialization.replace(/\W+/g,'') : null;
        var specMatch = ( !spec || (specialization && specialization.toLowerCase()==spec) ) ? true : false;
        if( this.skills[s].key==skillKey && TLmatch && specMatch ) {
            return this.skills[s].points;
        }
    }
    return 0;
};
Character.prototype.pointsInSkillWithIndex = function( SkillIndex ) {  // Skill object has a similar method
    return (this.skills[SkillIndex])
        ? this.skills[SkillIndex].points
        : 0;
};
Character.prototype.levelOfSkillWithInfo = function( skillKey, TL, spec ) {
 // alert( "skillKey: "+skillKey+"\nTL: "+TL+"\nspec: "+spec );
    if( skillKey.match('DX') ) {
        var tokens = (skillKey.match('-')) ? skillKey.split('-') : ['DX',0];
        return this.DX() - tokens[1];
    }
    if( skillKey.match('_') && !(TL || spec) ) {    // skillKey in the 'Guns6_Pistol' or 'BlackPowderWeapons_Shotgun' format; contains [TL and] spec info
        tokens = skillKey.split('_');
        matches = tokens[0].match(/\d+/);
        TL = (matches) ? Number(matches[0]) : null;
        subtokens = tokens[0].split(/\d/);
        skillKey = subtokens[0];
        spec = tokens[1];
      //  alert('got skillKey '+skillKey+"\nTL "+TL+"\n spec "+spec);
    }
    if( spec ) spec = spec.toLowerCase();
    for( var s in this.skills ) {
     //  alert("skill key match ("+this.skills[s].key+" == "+skillKey+"): "+( this.skills[s].key==skillKey ));
     //  alert("specialization match ("+this.skills[s].specialization+" == "+spec+"): "+( !spec || this.skills[s].specialization.toLowerCase()==spec.toLowerCase() ));
     //  alert("TL match ("+this.skills[s].TL+" == "+TL+"): "+( !TL   || this.skills[s].TL==TL ));
        var TLmatch   = ( !TL   || this.skills[s].TL==TL ) ? true : false;
        var specialization = (this.skills[s].specialization) ? this.skills[s].specialization.replace(/\W+/g,'') : null;
        var specMatch = ( !spec || ( specialization && specialization.toLowerCase()==spec.toLowerCase() ) ) ? true : false;
        if( this.skills[s].key==skillKey && TLmatch && specMatch ) {
  //        alert("returning a matching skill level for "+skillKey+" ("+spec+"):\n"+this.skills[s].level());
            return this.skills[s].level();
        }
    }
    // if Character doesn't have the skill, this should return a default skill level (or zero if the skill isn't recognized at all):
    return ( Skills[skillKey] ) ? Skills[skillKey].level() : 0;
};
Character.prototype.levelOfSkillWithIndex = function( SkillIndex ) {
   // alert('points in '+SkillIndex+': '+this.skills[SkillIndex].points );
    return ( this.skills[SkillIndex] )
        ? this.skills[SkillIndex].level()
        : 0;
};
Character.prototype.hasThisPrereq = function( prereqItem ) {

    // console.log("prerequisite:\n"+JSONstring.make(prereqItem));
    var pKey = prereqItem.prereq;
    var pTgt = prereqItem.target;

    // removed an 'if( this isn't a spell, but the prerequisite is ) return true;' case - hard to do here and probably unnecessary
    if( pKey=='override' ) {
       // alert('overridden prerequisite');
        return true;
    }
    else
    if( prereqItem.hasOwnProperty('category') && !prereqItem.category.match(/sk|sp/i) ) {  // trait or attribute prereq
        var cat = prereqItem.category;
        // search character's (dis)advantages, stats, or whatever is indicated by cat
        if( cat.match(/ad|di/i) ) {   // console.log("checking the "+pKey+" prereq for "+prereqItem.target);
            if( this.hasTrait(pKey) ) {
                var Trait = this.getTrait(pKey);
                if( prereqItem.hasOwnProperty('level') ) {   /* console.log("is "+Trait.levels+"<"+prereqItem.level+"?\t"+(Trait.levels<prereqItem.level)); */
                    if(Trait.levels<prereqItem.level) return false;
                }
                // other conditional properties?
                // console.log('returning "true"');
                return true;
            }
        }
        if( cat.match('stat') ) {
            // this assumes that the pKey will exactly match an attribute or secondary characteristic
            // (i.e., ST, DX, IQ, HT, FP, HP, Will, Per, etc.)
            if( this[pKey]() >= prereqItem.level ) return true;
        }
    }
    else
    if( prereqItem.hasOwnProperty('number') ) {
       // if( pTgt=='RemoveCurse' )
       // alert("target '"+prereqItem.target+"' has a numeric prerequisite:\n"+JSONstring.make(prereqItem));
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
        // What about colleges-level prerequisites?  Enchant requires spells from 10 different colleges.
        var num = prereqItem.number;
        // find a group
        var Group;
        if( Groups.hasOwnProperty(pKey) ) {
            Group = Groups[pKey];
        }
        else {
            for( var l in Groups ) {
                // l is 'Necromantic', pKey is 'Ne'; try to do a match of start of l to pKey
                var regex = new RegExp("^"+pKey,"g");
                if( l.match(regex) ) {
                    Group = Groups[l];
                    break;
                }
            }
        }
        // now loop over character skills, counting how many of them are in the Group
        if( Group ) {
         // if( pTgt=='RemoveCurse' )
            // console.log("found a matching group:\n"+JSONstring.make(Group));
            var count = 0;

            if( prereqItem.hasOwnProperty('meta') ) {
              // alert("meta prereq for group "+pKey+":\n"+JSONstring.make(prereqItem));
                var multiplicity = ( prereqItem.hasOwnProperty('mult') ) ? prereqItem.mult : 1;
                // presumably we already have a meta-list, since Group exists, so loop over these
              METAGROUP:
                for( var g in Group ) {
                    // each g is a key in Groups too, so
                    var group = Group[g];   // whoa, that's deep

                    /* I don't think this omission is supported in the rules! */
                    // skip any group that 'this' is a member of
                   // alert(count+": Should I count the "+group+" college/group? checking to see if "+prereqItem.target+" is a member of that group...");
                   /* if( Groups[group].indexOf(prereqItem.target)>=0 ) console.log("### skip the "+group+" college/group! "+prereqItem.target+" is a member. ###"); */
                   // if( Groups[group].indexOf(prereqItem.target)>=0 ) continue;

                   // alert('looking in '+group+' group');
                    // now do the same kind of loop as below
                    var mult = 0;
                    for( var s in this.skills ) {
                        var chSkill = this.skills[s];
                        if( !chSkill.name ) continue;           // skip formatting 'skills'
                        if( chSkill.key==pTgt ) continue;   // skip 'this' skill
                        // if chSkill is in Group, increment mult
                        // console.log('checking for '+chSkill.key+' in '+group+":\n"+Groups[group]);
                        if( Groups[group] && Groups[group].indexOf(chSkill.key)>=0 ) {
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
                // do the loop over character skills array to count things
                for( var s=0; s<this.skills.length; s++ ) {
                    var chSkill = this.skills[s];
                    // skip 'this' skill
                    if(chSkill.key==pTgt) continue;
                    // if chSkill is in Group, increment count
                    if( Group.indexOf(chSkill.key)>=0 ) count++;
                }

            }

            // check prerequisite condition after all members of the Group have been examined
         // if( pTgt=='RemoveCurse' )
          //  alert("character has "+count+" (other) '"+pKey+"' spells");
          //  console.log("character has "+count+" (other) '"+pKey+"' spells to satisfy the prerequisite for "+prereqItem.target+"; needs "+num);
            if( count >= num ) { return true; }
          //  else { alert(this.description.name+" does not have "+num+" skills/spells from '"+pKey+"'."); }
        }
        else {
           // alert("Could not parse group prerequisite for "+pTgt);
        }
    }
    else {
      // alert("looking for a standard skill/spell prerequisite: "+pKey);
      // alert("this.skills:\n"+JSONstring.make(this.skills))
        for( var s in this.skills ) {
            var putvPrereq = this.skills[s];
        // if( pTgt=="PurifyAir" )
        // alert("testing "+putvPrereq.name+":\n"+JSONstring.make(putvPrereq));
        /*                    var typeMatch = (   (skillType=='spells' && this.spell)
                                     || (skillType=='skills' && !this.spell)
                                     || (prereqItem.hasOwnProperty('category') && skillType.match(prereqItem.category.toLowerCase())) )
                                  ? true : false;
                    if( !typeMatch ) continue;
        */                    // alert("( "+putvPrereq.hasOwnProperty('specialization')+" && "+prereqItem.hasOwnProperty('prereqSpec')+" ) && ( "+prereqItem.prereqSpec+"!="+putvPrereq.specialization+" )" );
            if(   ( putvPrereq.hasOwnProperty('specialization') && prereqItem.hasOwnProperty('prereqSpec') )
               && ( prereqItem.prereqSpec!=putvPrereq.specialization ) )
                continue;
              // if( pTgt=="MinorHealing" )
              // alert(putvPrereq.name+" passes type and specialization match filters");
            if( putvPrereq.key==pKey ) {
              // alert("found a key-matching skill");
                var reqLevel = ( prereqItem.hasOwnProperty('level') ) ? prereqItem.level : 12;
                if( this.gameInfo.ruleset.match('e3') ) {   // 3e: pKey skill must be known at level 12+
                  // if( pTgt=="MinorHealing" )
                  //   alert("level of putative prerequisite skill: "+putvPrereq.noDefaultsLevel()+"\nrequired level: "+reqLevel);
                    if( putvPrereq.noDefaultsLevel() >= reqLevel ) {
                        return true;
                    }
                }
                else {        // 4e: pKey skill must have at least 1 point applied to it
                  // alert(JSONstring.make(putvPrereq));
                    if( putvPrereq.points >= 1 ) {
                        // but there may also be a level requirement
                        if( prereqItem.hasOwnProperty('level') ) {
                            if( putvPrereq.noDefaultsLevel() >= reqLevel ) {
                                return true;
                            }
                        }
                        else { return true; }
                        // if no level requirement, having 1+ points is enough
                        // alert(putvPrereq.name+" has points")
                    }
                }
            }
        }
    }
    return false;
};
Character.prototype.hasPrereqsFor = function( skill ) {

    if( !(skill instanceof Skill) ) { // console.log("[hasPrereqsFor] skill passed: "+skill);
        // parse out skill keys with form SkillKeyTL_specialization
      //  var skillTokens = ( skill.match(/_/i) ) ? skill.match(/(.+)(\d*)_?(.*)/i) : skill;
        var skillTokens = ( skill.match(/_/i) ) ? skill.split(/_/) : [skill];
        if( skillTokens[0].match(/\d/) ) {
            var skillTLTokens = skillTokens[0].match(/(.+)(\d*)/i);
            var skillTL = skillTokens.shift();
            skillTokens = skillTLTokens.concat(skillTokens);
        }
      //  alert(skillTokens);
        skill = skillTokens[0];
        skill = (Skills.hasOwnProperty(skill)) ? Skills[skill] : Spells[skill];  // assume it's a label/key, in this case
    }
    if( !skill ) return false;

    /* if( skill.key=="EarthtoAir" ) console.log("[hasPrereqsFor] checking prereqs for "+skill.name); */

    /* Magery alternatives - short-circuit the normal spell prerequisites */
    // These are ad-hoc.  What if a new advantage comes along that does something similar?
    if( skill.spell ) {
      //  alert("looking for prereqs for '"+skill.name+"' spell");
        if( this.hasTrait('PowerInvestiture') ) { return true; }
        else if( this.hasTrait('MageryRitual') ) {
            var colleges = skill.colleges;
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
               // alert("looking for "+pathSkillLabel+" path skill");
                if( this.hasSkill(pathSkillLabel) ) return true;
            }
            console.log("[ch.hasPrereqsFor] is returning 'false' because "+ch.name()+" has Ritual Magery, but does not have any of the appropriate Paths ["+colleges.join(', ')+"]");
            return false;
        }
    }

    var matchingPrereqs = skill.structuredPrereqsFor();
    // if( skill.key=="Entombment" )
    // alert( JSONstring.make( matchingPrereqs ) );

    /* if( skill.key=="EarthtoAir" ) console.log( JSONstring.make( matchingPrereqs ) ); */

    // analyze all items in the matchingPrereqs object list
  PREREQS:
    for( var pgp in matchingPrereqs ) {
        var pgroupList = matchingPrereqs[pgp];    // a pgroupList is always an 'or' group of prerequisites; you only have to satisfy one
        // alert( JSONstring.make( pgroupList ) );

        // now iterate over the pgroup list of prerequisite objects
        var pgroupSatisfied = false;    // Set to 'true' whenever a prerequisite is satisfied.
      PGROUPLIST:
        for( var k=0; k<pgroupList.length; k++ ) {

            var prereqItem = pgroupList[k];

            if( this.hasThisPrereq( prereqItem ) ) { /* if( skill.key=="Entombment" ) alert(JSONstring.make(prereqItem)+' prereq satisfied'); */
                pgroupSatisfied = true;     /*  if( skill.key=="EarthtoAir" ) console.log("ch has "+prereqItem.prereq+" prereq for "+prereqItem.target); */
                break PGROUPLIST;
            }

            /* if( skill.key=="EarthtoAir" && !pgroupSatisfied ) */ console.log("ch does not have "+prereqItem.prereq+" prereq for "+prereqItem.target);
        }
        /* if( skill.key=="EarthtoAir" && !pgroupSatisfied ) console.log("ch does not have this prereq:\n"+JSONstring.make(prereqItem)); */
        // If at least one of the Prerequisites in each pgroup list is satisfied, we'll return 'true'.
        // But if the loop over a pgroup list finishes with NO Prerequisites in that list satisfied,
        //  then we can and must immediately return 'false'.
        if( !pgroupSatisfied ) return false;

    } // end loop over matchingPrereqs
    // if every pgroup list is traversed without tripping the pgroupSatisfied trigger,
    return true;
};
Character.prototype.reorderSkills = function( idArray ) {
    // alert(idArray);
    // see how general you can keep this - ch.reorderStuff()?
    var ids = [];
    var lowestIDseen = 1000;
    var highestIDseen = 0;
    for( var i=0; i<idArray.length; i++ ) {
        var DOMid = idArray[i];
 //       alert(DOMid);
        var matches = DOMid.match(/(\D+)(\d+)(\w+)/);
  //      alert(matches);
        if( !matches ) continue;
        var rowID = 1*matches[2];
        if( rowID<lowestIDseen ) lowestIDseen = rowID;
        if( rowID>highestIDseen ) highestIDseen = rowID;
        ids.push(rowID);
    }
  //  alert(JSONstring.make(ids));
 //   alert(lowestIDseen);
//    alert(highestIDseen);
    var resortedSkillsArray = [];
    for( var i=0; i<ids.length; i++ ) {
        var id = ids[i];
        var skillItem = this.skills[id-1];  // how general is this offset?
//        alert("got this at ID "+id+":\n"+JSONstring.make(skillItem));
        if(skillItem) resortedSkillsArray.push( skillItem );
        else resortedSkillsArray.push( {} );    // empty object will be interpreted as a spacer
        // It would be better to detect empty rows between skill entries, and put spacers in the array.
        // (Put a spacer in whenever empty rows are seen, all the way to the end of the idArray,
        //  and then trim trailing spacers? How?   Count empty rows instead, and then if a non-
        //  empty entry comes along, retroactively push that many spacers on before the entry?)
        // If it turns out that I need to loop twice anyway, I'll be doing this to get
        // a first/lowest and last/highest 'used' ID.  I could then just put in a spacer
        // for any empty rows before the last used ID.
    }
 //   alert(JSONstring.make(resortedSkillsArray));
    this.skills = resortedSkillsArray;

    this.store();
    window.location.reload();
}

Character.prototype.SpellCollegeSkill = function( coll ) {
    if( !this.gameInfo.ruleset.match(3) ) return 0;
    let collLvl = 0;
    for( let s in ch.skills ) {
        let chSkill = ch.skills[s];
        if( chSkill.points>=1 && Groups[coll] && Groups[coll].indexOf(chSkill.key)>=0 ) {
            let spLvl = chSkill.level();
            if( spLvl>11 ) collLvl++;
            if( spLvl>15 ) collLvl += 0.5;
            if( spLvl>19 ) collLvl += 0.5;
            // console.log("[ch.SpellCollegeSkill] "+chSkill.name+"-"+spLvl+", "+collLvl);
        }
    }
    return Math.trunc(Math.min(collLvl,this.IQ()+this.getTrait("Magery").levels,20));   // M85
}

Character.prototype.firstName = function() {
    var fullName = this.description.name;
    var nameTokens = fullName.split(' ');
    return nameTokens[0];
};
Character.prototype.lastName = function() {
    var fullName = this.description.name;
    var nameTokens = fullName.split(' ');
    return ( nameTokens.length>1 ) ? nameTokens.slice(1).join(' ') : fullName;
};

// Trait methods
Character.prototype.hasTrait = function( traitKey ) {
    var mult = 0;
    for( var m in this.traits ) {
        var trait = this.traits[m];
        // in each, look for trait with matching key
        if( trait.key==traitKey ) {
            // drill deeper if this is a 'multiple' trait and the character may have several instances of it
            if( trait.hasOwnProperty('multiple') ) {
                // this depends on presence of 'multiple' property in any such trait
                mult++;     // or, I could replace mult if trait.multiple is higher - should be the same, no?  (maybe not - what about removal of some of these traits?  ouch...) (but now I resequence them before calling this)
                continue;   // instead of returning
            }
            return true;
        }
    }
    if( mult ) { return mult; }
    return false;
};
Character.prototype.getTrait = function( traitKey, mult ) {
    if( !traitKey ) return false;
    // console.log( [traitKey,mult] );
    for( var m in this.traits ) {
        var trait = this.traits[m];
        // in each, look for trait with matching key
        if( trait.key==traitKey ) {
            // drill deeper if this is a 'multiple' trait and the character may have several instances of it
            if( trait.hasOwnProperty('multiple') && typeof(trait.multiple)=='number' ) {
                if( !mult ) {
   //                 alert("Returning first possible match for '"+trait.name+"'.\nThis trait may have multiple instances, but no distinguishing criteria were provided.");
                    return trait;
                }
                if( trait.multiple!=mult ) { continue; }
            }
            return trait;
        }
    }
    return false;
};
Character.prototype.getTraits = function( traitKey /* filter */ ) {
    var matchingTraits = [];
    for( var m in this.traits ) {
        var trait = this.traits[m];
        // in each, look for trait with matching key (or match all of them, if no key is given)
        if( trait.key==traitKey ) {
            /* if( trait fails filter condition ) continue; */
            matchingTraits.push(trait);
        }
    }
    return matchingTraits;
};
Character.prototype.getMatchingTraits = function( traitKeyPattern ) {
    var matchingTraits = [];
    for( var m in this.traits ) {
        var trait = this.traits[m];
        if( trait.key && trait.key.match(traitKeyPattern) ) {
            matchingTraits.push(trait);
        }
    }
    return matchingTraits;
};
Character.prototype.attachTrait = function( traitObj ) {
		// validate trait (properties have correct types, etc.)
		let invalid = traitObj.isInvalid();
		if( invalid ) { alert(invalid); return false; }
		//console.log('[ch.attachTrait] validated '+traitObj.name+'; assigning index');
		// check/assign index
		let topIndex = 0;
		let indices = [];
		for( let i=0; i<this.traits.length; i++ ) {
				let thisIndex = this.traits[i].index;
		    if( thisIndex>topIndex ) topIndex = thisIndex;
		    indices[thisIndex] = true;
		}
		//console.log('[ch.attachTrait] indices array built');
		// assign first unused index value to traitObj
		if( !indices.length ) traitObj.index = 1;
		for( let n=1; n<indices.length+1; n++ ) {
				if( n>indices.length || !indices[n] ) {
						traitObj.index = n;
						break;
				}
		}
		//console.log('[ch.attachTrait] index assigned; attaching '+traitObj.name+' trait');
		this.traits.push( traitObj );
};
Character.prototype.resequenceMultipleTraits = function() {
// This method will reassign consecutive 'multiple' values for each group of traits with identical keys.
// Use it after deleting a trait that the character has several instances of (e.g., the 'Ally' ad),
// to avoid gaps in the sequence which might fool software as to how many instances are there, etc.
    var traitKeys = {};
    for( var m in this.traits ) {
        var trait = this.traits[m];
        if( traitKeys.hasOwnProperty(trait.key) ) {
            traitKeys[trait.key]++;
            if( !trait.hasOwnProperty('multiple') ) { /* wtf? */ }
        }
        else {
            traitKeys[trait.key] = 1;
        }
        if( trait.hasOwnProperty('multiple') ) { trait.multiple = traitKeys[trait.key]; }
    }
}
Character.prototype.hasTraitGroup = function( group ) {
    for( var m in this.traits ) {
        var trait = this.traits[m];
        // look for trait with matching group
        if( trait.group ) {   // a few Traits are in more than one group; this is indicated by a comma-separated list, e.g. Traits.Unaging.groups = "aging, lifespan";
            var groups = trait.group.split(/,\s*/);
            for( var g=0; g<groups.length; g++ ) {
                if( group==groups[g] ) return true;
            }
        }
    }
    return false;
};
Character.prototype.getTraitInGroup = function( group ) {
    for( var m in this.traits ) {
        var trait = this.traits[m];
        // look for trait with matching group
        if( trait.group && trait.group==group ) {
            return trait;
        }
    }
    return false;
};
/* special method for Magery advantage, to save lots of writing elsewhere
Character.prototype.hasMagery = function( level ) {
    if( this.gameInfo.ruleset.match('e4') ) {
        if( level<1 && this.traits.Magery0E4 ) { return true; }
        if( this.traits.MageryE4 && this.traits.MageryE4.levels>=level ) { return true; }
    }
    if( this.gameInfo.ruleset=='e3' ) {
        if( this.traits.MageryE3 && this.traits.MageryE3.levels>=level ) { return true; }
    }
    return false;
};
*/ // now obsolete, of course...sigh (but a search 2019-April found no use of this function)
Character.prototype.countDisplayedTraits = function( traitTypes ) {   // traitTypes can be 'a' to count advantages, or 'dq' to count disads+quirks, etc.
		var count = 0;
	TRAITS:
		for( var t=0; t<this.traits.length; t++ ) {
		    var trait = this.traits[t];
        if( !trait.name ) { continue; }
        if( trait.key=='Language' ) { continue; }
        if( trait.key=='CulturalFamiliarity' ) { continue; }
        if( trait.inTemplate ) { continue; }
        if( trait.isInvalid() && !trait.repair() ) continue;
        let regex = new RegExp('['+traitTypes+']',"i");
        // console.log("[ch.countDisplayedTraits] "+trait.name);
        // console.log("[ch.countDisplayedTraits] testing "+trait.type+" against "+traitTypes);
        if( traitTypes && !trait.type.match(regex) ) { continue; }
				count++;
		}
		return count;
}

Character.prototype.attachLinker = function( linkerObj, label ) {
    if( label==undefined || label=="undefined" ) return false;
    if( linkerObj.hasOwnProperty('prereq') ) {
        if( !this.prerequisites.hasOwnProperty(label) )
            this.prerequisites[label] = linkerObj;
    }
    else if( linkerObj.hasOwnProperty('penalty') ) {
     // console.log('[Character.attachLinker] may attach a default: '+label);
        if( !this.defaults.hasOwnProperty(label) )
         // console.log('[Character.attachLinker] attaching');
            this.defaults[label] = linkerObj;
    }
    else if( linkerObj.hasOwnProperty('amount') ) {
        if( !this.adjustments.hasOwnProperty(label) )
            this.adjustments[label] = linkerObj;
    }
    else if( linkerObj.constructor===Array ) {
      //console.log("[Character.attachLinker] attaching array object to ch.groups."+label+": "+linkerObj);
        if( this.groups.hasOwnProperty(label) ) {
            for( var i=0; i<linkerObj.length; i++ ) {
                if( this.groups[label].indexOf(linkerObj[i])<0 ) this.groups[label].push( linkerObj[i] );
            }
        }
        else
            this.groups[label] = linkerObj;
    }
    return true;
}

// equipment methods
Character.prototype.hasItem = function( itemKey ) {
    for( var i=1; i<this.collections.default.length; i++ ) {
        var collItem = this.collections.default[i];
        if( typeof(collItem) != 'object' ) continue;    // skip things like 'wield' and wield skills (also collections, but they shouldn't come up here)
      //  console.log(collItem.key+'=='+itemKey);
        if( collItem.hasOwnProperty('key') && collItem.key==itemKey ) return true;
    }
    return false;
}
Character.prototype.locateItem = function( itemObj, collection ) {
 // alert('[Character.locateItem] locating item '+JSONstring.make(itemObj));
    if( collection ) {  // look for the item only in the specified collection
        // loop over items in the specified collection
        for( var cIndex in this.collections[collection] ) {
            var item = this.collections[collection][cIndex];
            // check for match (name, cost, weight)
            if( itemObj.name==item.name ) {
                if( itemObj.weight==item.weight && itemObj.cost==item.cost ) {
                    // return group and index
                    return [collection,cIndex];
                }
            }
        }
    }
    else {  // look in the equipment sections, not the collections
        // loop over equipment groups
        var equipmentGroups = ['equipment','weapons'];
        for( var gp in equipmentGroups ) {
            var eGroup = equipmentGroups[gp];
            // loop over items in each group
            for( var eIndex in this[eGroup] ) {
                var item = this[eGroup][eIndex];
                // check for match (name, cost, weight)
                if( itemObj.name==item.name ) {
                    if( itemObj.weight==item.weight && itemObj.cost==item.cost ) {
                        // return group and index
                        return [eGroup,eIndex];
                    }
                }
            }
        }
    }
    // if no matches are found,
    return false;
}
Character.prototype.removeItem = function( itemObj, index ) {
   // alert("before removeItem does ANYTHING:\n"+JSONstring.make(this.collections));
    // loop over all collections, removing references to this item
    for( var cKey in this.collections ) {
        if( cKey=='equipped' ) continue;    // skip this attribute; it isn't a collection
        var collection = this.collections[cKey];
         // alert("before removeItem touches collection '"+cKey+"':\n"+JSONstring.make(collection));
        // the trick is, I have to remove the object from the default collection LAST, as that is the 'original' one
        if( cKey=='default' ) continue;
        // alert('removing '+itemObj.name+' from the '+collection[0]+' collection');
        this.removeItemFromCollection( itemObj, collection );
    }
    // then after the loop, remove the item from the default collection
    this.removeItemFromCollection( itemObj, this.collections['default'] );

    // loop over equipment groups
    // there are situations where there will be two IDENTICAL items!  need to be able to distinguish them here!
    var equipmentGroups = ['equipment','weapons'];
    for( var gp in equipmentGroups ) {
        var eGroup = equipmentGroups[gp];
        // loop over items in each group
        for( var eIndex in this[eGroup] ) {
            var item = this[eGroup][eIndex];
            // check for match (name, cost, weight)
            if( itemObj.name==item.name ) {
                if( itemObj.weight==item.weight && itemObj.cost==item.cost ) {
                    // remove the item
                    // alert('removing '+itemObj.name+' from '+eGroup);
                    this[eGroup].splice(eIndex,1);
                }
            }
        }
    }
}
Character.prototype.removeItemFromCollection = function( itemObj, collection ) {
    itemObj = cloneEquipmentFromGenericObject(itemObj);   // in case itemObj isn't actually an Equipment item yet (for the isSameAs() method)
    for( var eIndex=0; eIndex<collection.length; eIndex++ ) {
        var item = collection[eIndex];
        // check for match
        if( itemObj.isSameAs(item) ) {
            // take off armor, put away weapon, sling shield (to remove flags from collection)
            if( itemObj.hasOwnProperty('wieldOptions')  ) { eIndex = this.putAwayWeapon(eIndex) }
            else if( itemObj.hasOwnProperty('location') ) { eIndex = this.takeOffArmor(eIndex)  }
            else if( itemObj.hasOwnProperty('DB')       ) { eIndex = this.putAwayShield(eIndex) }
            // then remove the item from the collection
            collection.splice( eIndex, 1 );
            break;    // if there are several identical items, only remove one of them
        }
    }
}
Character.prototype.defaultCollectionValue = function() {
    var sum = 0;
    for( var i=1; i<this.collections.default.length; i++ ) {
        var collItem = this.collections.default[i];
        if( typeof(collItem) != 'object' ) continue;    // skip things like 'wield' and wield skills (also collections, but they shouldn't come up here)
      //  console.log(collItem.key+'=='+itemKey);
        sum += actualCost( collItem ) * collItem.number;
    }
    return sum;
}

Character.prototype.dodge = function() {
    var readiedShield = this.readiedShield();
    var adjust_4e_dodge = ( this.gameInfo.ruleset.match(/4/) ) ? 3 : 0;
    var adjust_3e_dodge = ( this.gameInfo.ruleset.match(/3/) ) ? this.adjustmentsTo('Move') : 0;
    // 4e shield Passive Defense ONLY applies to attacks from front or shield-side hexes (B374); don't include by default
  //  if( this.gameInfo.ruleset.match(/4/) ) adjust_4e_dodge += (readiedShield) ? readiedShield.PDB : 0;
  //  alert( "Math.floor( "+this.basicSpeed()+" + "+adjust_4e_dodge+" + "+this.adjustmentsTo('Dodge')+" )" );
    return Math.floor( this.basicSpeed() + adjust_4e_dodge + adjust_3e_dodge + this.adjustmentsTo('Dodge') );
}

// weapon methods
Character.prototype.hasSTforWeapon = function( Weapon ) {
    for( var skl in Weapon.wieldOptions ) {
        var wieldOptsForSkill = Weapon.wieldOptions[skl];
        for( var i=0; i<wieldOptsForSkill.length; i++ ) {
            if( wieldOptsForSkill[i].strength<=this.ST() ) return true;
        }
    }
    return false;
}
Character.prototype.wieldWeapon = function( weaponIndexInCollection, wieldSkill ) {
  //  alert("[ch.wieldWeapon] called with index "+weaponIndexInCollection+" and skill "+wieldSkill);

    var equippedCollectionKey = this.collections.equipped;
    var equippedCollection = this.collections[equippedCollectionKey];
    var weaponObj = equippedCollection[weaponIndexInCollection];
  //  alert(weaponObj.name);

    /* ensure we have a wield skill to use below */
    if( !wieldSkill ) {
        var numOptions = 0;
        for( var optSkill in weaponObj.wieldOptions ) { numOptions++; }     // hm - what if ruleset filtering in selectWieldOptionsDialog will reduce options to 1?
        if( numOptions>1 ) {    // if there are multiple wield options,
            // need to populate hidden field there with index parameter for wieldWeapon on return here
            document.selectWieldOptionsForm.id.value = weaponIndexInCollection;
            selectWieldOptionsDialog( weaponObj );
            return;
        }
        else {  // use the single option
            for( var w in weaponObj.wieldOptions ) {
                wieldSkill = w;
                break;
            }
        }   // end 'single option available' branch
    }
    else {  // selectWieldOptionsDialog may have been used to select wield skill;
            // hide AND RESET the selectWieldOptionsDialog, just in case
            // (without reset, next weapon clicked on gets a bogus wieldSkill, left over from this use of form)
        document.getElementById('selectWieldOptionsDialog').style.display = 'none';
        document.getElementById('selectWieldSkillMenu').selectedIndex = -1;
    }

    // Haven't needed this yet, but if necessary, get the wieldSkill specialization (or should this come in as an optional parameter?)
    var wieldSkillSpec = document.getElementById('selectSkillSpecialization').value;

    /* now figure out and make required changes to the collection */
    var wieldedWeaponNewIndex;
    var handsUsedForNewWeapon = weaponObj.wieldOptions[wieldSkill][0].hands;  // 'dom', 'off', 'both', or 'none'
    // scan the collection, looking for wielded items
    for( var i=1; i<equippedCollection.length; i++ ) {
        var item = equippedCollection[i];
        if( item==weaponObj ) { wieldedWeaponNewIndex = i; }
        var typeofitem = typeof item;
        if( typeofitem.match(/string/i) && item.match(/wield/i) ) { // found a ready weapon
            var handsUsedForThisWeapon = equippedCollection[i+2].wieldOptions[equippedCollection[i+1]][0].hands;
            // delete flags associated with items that would use the same hand or hands, unless either use 'none'
            if( handsUsedForNewWeapon=='none' || handsUsedForThisWeapon=='none' ) continue;
            if( handsUsedForNewWeapon=='both' || handsUsedForThisWeapon=='both'
                || handsUsedForNewWeapon==handsUsedForThisWeapon ) {
                // if( ch.hasTrait('ambidexterity') ) then IF there is no weapon/shield in the 'off' hand,
                equippedCollection.splice( i, 2 );  // simpler, and faster, than calling putAwayWeapon
                i--;   // decrement i by 1 (right?), and continue looping
            }
        }
        else
        if( typeofitem.match(/string/i) && item.match(/ready/i) ) { // found a ready shield
            if( handsUsedForNewWeapon=='both' ) {
                equippedCollection.splice( i, 1 );  // simpler, and faster, than calling putAwayWeapon
                i--;
            }
        }
    }
    // then, insert a flag and wield skill for the current weapon
    equippedCollection.splice( wieldedWeaponNewIndex, 0, 'wield', wieldSkill );

}
Character.prototype.putAwayWeapon = function( weaponIndexInCollection ) {
    var equippedCollectionKey = this.collections.equipped;
    var equippedCollection = this.collections[equippedCollectionKey];
    if( equippedCollection[weaponIndexInCollection-2]=='wield' ) {  // this allows me to call putAwayWeapon even when I don't know whether the weapon is being wielded
   //   alert("splicing 'wield' and wield skill entries out of the collection, at position "+( weaponIndexInCollection-2));
        equippedCollection.splice( weaponIndexInCollection-2, 2 );
        weaponIndexInCollection -= 2;
    }
    return weaponIndexInCollection;
}
Character.prototype.hasWeapon = function() {
    var equippedCollection = this.collections[this.collections.equipped];
    for( var k=1; k<equippedCollection.length; k++ ) {
        if( equippedCollection[k].wieldOptions ) {
            return k;
        }
    }
    return false;
}
Character.prototype.wieldedWeapon = function() {  // not in use anywhere?   if this gets used later, rewrite to return an array of ALL wielded weapons
    var weaponItem = false;
    var equippedCollection = this.collections[this.collections.equipped];
    for( var k=1; k<equippedCollection.length; k++ ) {
        var equipmentObj = equippedCollection[k];
        var prevItem = equippedCollection[k-1];
        if( equipmentObj.hasOwnProperty('wieldOptions') && prevItem=='ready' ) {    // found one; save the weapon item
            weaponItem = equipmentObj;
            break;
        }
    }
    return weaponItem;
}
Character.prototype.parry = function( wantedWeaponObj, skillLbl, reportSkill ) {
    // This is based on the skill used to wield the parrying weapon, or an unarmed combat skill.
    // Wielded weapon should have an associated 'skill-being-used'; use this skill to calculate parry.
    // If no weapon is wielded, use best (default) unarmed combat skill.
   // alert("wantedWeaponObj:\n"+JSONstring.make(wantedWeaponObj)+"\nskillLbl: "+skillLbl+"\nreportSkill: "+reportSkill);

    // If a 'skill' parameter is passed, calculates parry based on this skill instead of searching for one.

    var parryingSkillName = '';
    var equippedCollection = this.collections[this.collections.equipped];
    var parryHash = {'skill':'','base':0};

    // get a weapon object and a wielding skill
    var wieldedWeaponObj;
    var wieldingSkillLbl = skillLbl;
    if( !wantedWeaponObj ) {
      WLIST:
        for( var i=1; i<equippedCollection.length; i++ ) {
            var weaponObj = equippedCollection[i];
            if( !weaponObj.wieldOptions ) continue WLIST;   // filter for weapons
            if( skillLbl ) {   // short-circuit if a wield skill was specified (but no weapon) (this branch isn't used, AFAIK)
                // if this weapon matches the one hidden in the Wield Options dbox
                if( i==document.selectWieldOptionsForm.id.value ) {
                    wieldedWeaponObj = weaponObj;  // use this weapon instead of looking for a wielded one
                    break WLIST;
                }
                wieldingSkillLbl = skillLbl;      // use this skill instead of looking for a wielded weapon skill
            }
            else {      // if no wield skill is specified, look for a wielded weapon
                if( equippedCollection[i-2] && equippedCollection[i-2]=='wield' ) {
                    // get wielding skill label
                    wieldingSkillLbl = equippedCollection[i-1];
                    // alert("wield option for "+wieldingSkillLbl+":\n"+JSONstring.make(weaponObj.wieldOptions[wieldingSkillLbl]));
                    // return 0 if this weapon is wielded with a skill that corresponds to an attack option with no melee attacks
                    var melee = false;
                    for( opti=0; opti<weaponObj.wieldOptions[wieldingSkillLbl].length; opti++ ) {
                        if( !weaponObj.wieldOptions[wieldingSkillLbl][opti].maximumRange ) {    // I'm running out of tests for melee vs. ranged attack options...
                            melee = true;
                            break;
                        }
                    }
                    if( !melee ) {
                        parryHash['level'] = null;
                        parryHash['weapon'] = weaponObj.name;
                        parryHash['skill'] = wieldingSkillLbl;
                        return parryHash;
                    }
                    // if we get to here, weapon is being wielded for hand combat, so can parry
                    // (there will be other caveats here - lances, whips, etc.)
                    // save the weapon and its wielding skill ID; break out of WLIST loop
                    wieldedWeaponObj = weaponObj;
                    break WLIST;
                }
            }
        }
    }
    // falls through to here if the wantedWeaponObj parameter was sent
    else if( isNaN(wantedWeaponObj) ) {     // wantedWeaponObj is actually an object
        wieldedWeaponObj = wantedWeaponObj;
        if( skillLbl ) wieldingSkillLbl = skillLbl;
        else {       // just grab the first skill label in the wieldOptions object
            for( var x in wantedWeaponObj.wieldOptions ) {
              // alert(x);
                wieldingSkillLbl = x;
                break;
            }
        }
    }
    else {  // 'wantedWeaponObj' is really an equipment item id (I can't find where this option is being used...)
        var equippedCollection = this.collections.equipped;
        wieldedWeaponObj = this.collections[equippedCollection][wantedWeaponObj];
        if( !skillLbl ) { wieldingSkillLbl = wieldedWeaponObj.wieldSkill; }  // what if this is null (i.e., this weapon isn't actually being wielded?)
        // need to rewrite to use collection-use flags instead
    }

    // console.log("wielding skill:\n"+wieldingSkillLbl);
    // console.log(JSONstring.make(wieldedWeaponObj));
    // console.log(JSONstring.make(Skills[wieldingSkillLbl]));

    // do this before deciding on parry skill, so that if skill is one of the unarmed, we can adjust parryAdjustments appropriately
    var parryAdjustments = this.adjustmentsTo('Parry');
    var parryAdjustmentsString = (this.adjustmentsTo('Parry',true)=='') ? [] : [this.adjustmentsTo('Parry',true)];

    // decide on a parry skill level
    var parrySkillLevel = 0;
    if( wieldingSkillLbl.match('DX') ) {      // if label indicates DX (at least one of these, Brass Knuckles)
        var tokens = (wieldingSkillLbl.match('-')) ? wieldingSkillLbl.split('-') : ['DX',0];
        parrySkillLevel = this.DX() - tokens[1];
        parryingSkillName = 'from '+wieldingSkillLbl;
        if( ch.hasTrait("EnhancedParryHands") ) {
            parryAdjustments += ch.getTrait("EnhancedParryHands").levels;
            parryAdjustmentsString.push( ch.getTrait("EnhancedParryHands").levels + ": Enhanced Hand Parry");
        }
    }
    else if( wieldingSkillLbl ) {       // if a wielding skill was found, get Character's level with that skill
        var chParrySkill = this.getSkill(wieldingSkillLbl);
        if( !chParrySkill ) chParrySkill = Skills[wieldingSkillLbl];
        // chParrySkill may not be found, if character doesn't have it and ruleset isn't native
        // console.log("[Character.parry] chParrySkill matching "+wieldingSkillLbl+":\n"+JSONstring.make(chParrySkill));
        parryingSkillName = (chParrySkill) ? chParrySkill.name : wieldingSkillLbl;
        var chHasPointsInParrySkill = ( chParrySkill ) ? chParrySkill.points : false;
      // alert(parryingSkillName+" is a Skill: "+(chParrySkill instanceof Skill));
        parrySkillLevel = (chParrySkill) ? chParrySkill.level( this ) : "??";
      // alert("using "+wieldingSkillLbl+", skill level is "+parrySkillLevel);
    }
    else {                              // if not, determine the best bare-hand skill level
        var UCskills = ['Boxing','Brawling','Judo','Karate','SumoWrestling','Wrestling'];   // a Group!!
        for( var i in UCskills ) {
            var UCskillLbl = UCskills[i];
            var UCskill = this.getSkill( UCskillLbl );
            if( !UCskill ) { continue; }
            var UCskillLevel = UCskill.level();
            if( UCskillLevel > parrySkillLevel ) {
                parrySkillLevel = UCskillLevel;
                parryingSkillName = UCskill.name;
            }
        }
        if( this.DX()>parrySkillLevel ) {
            parrySkillLevel = this.DX();
            parryingSkillName = 'from DX';
        }
        if( ch.hasTrait("EnhancedParryHands") ) {
            parryAdjustments += ch.getTrait("EnhancedParryHands").levels;
            parryAdjustmentsString.push( ch.getTrait("EnhancedParryHands").levels + ": Enhanced Hand Parry");
        }
    }
    parryHash['skill'] = parryingSkillName;
    // console.log("[Ch.parry] parrying skill: "+parryingSkillName+"-"+parrySkillLevel);

    // calculate parry
    var parryBonusFromWeapon = (wieldedWeaponObj && wieldedWeaponObj.wieldOptions[wieldingSkillLbl][0].parryBonus)
        ?  wieldedWeaponObj.wieldOptions[wieldingSkillLbl][0].parryBonus
        :  0;
    parryHash['weapon'] = (wieldedWeaponObj) ? wieldedWeaponObj.name : '';
    if( ch.hasTrait("EnhancedParryWeapon") && parryingSkillName==ch.getTrait("EnhancedParryWeapon").description ) {
        parryAdjustments += ch.getTrait("EnhancedParryWeapon").levels;
        parryAdjustmentsString.push(ch.getTrait("EnhancedParryWeapon").levels + ": Enhanced " + wieldingSkillLbl + " Parry");
    }
    parryHash['bonus'] = 1*parryBonusFromWeapon;
    parryHash['adjustments'] = 1*parryAdjustments;
    parryHash['adjString'] = (parryAdjustmentsString.length) ? parryAdjustmentsString.join(", ") : '0';
    // if(non-parrying skill, e.g. Bow) { return 0; }     else
    if( this.gameInfo.ruleset.match(/3/) ) {    // e3 rules
        /* This conditional is inadequate.  Maybe make a Group or two and use those? */
        if( wieldingSkillLbl.match(/ShortStaff|Tonfa|StaffSkill|Fencing|MainGauche/) || parryingSkillName.match(/Boxing|Brawling|Judo|Karate/) ) {
          // alert("e3 2/3 parry rules:\n(2/3)*"+parrySkillLevel+" + parry bonus "+parryBonusFromWeapon+" + Combat Reflexes bonus "+parryAdjustments);
            parryHash['level'] = Math.floor(2*parrySkillLevel/3);
            parryHash['ratio'] = '⅔';
        }
        else if( wieldingSkillLbl.match(/Whip/i) ) {
          // alert("e3 Whip parry rules:\n(1/3)*"+parrySkillLevel+" + parry bonus "+parryBonusFromWeapon+" + Combat Reflexes bonus "+parryAdjustments);
            parryHash['level'] = Math.floor(parrySkillLevel/3);
            parryHash['ratio'] = '⅓';
        }
        else {
          // alert("e3 normal parry rules:\n"+parrySkillLevel+"/2 + parry bonus "+parryBonusFromWeapon+" + Combat Reflexes bonus "+parryAdjustments);
            parryHash['level'] = Math.floor(parrySkillLevel/2);
            parryHash['ratio'] = '½';
        }
    }
    else {  // e4 rules
        // if( wieldedWeaponObj ) { alert("looking up parry bonus:\n"+JSONstring.make(wieldedWeaponObj.wieldOptions[wieldingSkillLbl][0])); }
        // alert("e4 parry: 3 + "+Math.floor(parrySkillLevel/2)+' + '+parryBonusFromWeapon+' + '+parryAdjustments);
        parryHash['base']  = 3;
        parryHash['level'] = Math.floor(parrySkillLevel/2);
        parryHash['ratio'] = '½';
    }
    return parryHash;
}

// shield methods
Character.prototype.readyShield = function( shieldIndexInCollection ) {

    var equippedCollectionKey = this.collections.equipped;
    var equippedCollection = this.collections[equippedCollectionKey];
    var shieldObj = equippedCollection[shieldIndexInCollection];

    /* now figure out and make required changes to the collection */
    var readiedShieldNewIndex;
    // scan the collection, looking for items that may need to be put away before readying shield
    for( var i=1; i<equippedCollection.length; i++ ) {
        var item = equippedCollection[i];
        if( item==shieldObj ) { readiedShieldNewIndex = i; }
        var typeofitem = typeof item;
        if( typeofitem.match(/string/i) && item.match(/wield/i) ) { // found a readied weapon
            var handsUsedForThisItem = equippedCollection[i+2].wieldOptions[equippedCollection[i+1]][0].hands;
            // delete flags associated with items that would use the same hand or hands
            if( handsUsedForThisItem.match(/both|off/i) ) {
                // splice this 'ready' entry out of the collection
                equippedCollection.splice( i, 2 );  // simpler, and faster, than calling putAwayWeapon
                // decrement i by 1 (right?), and continue looping
                i--;
            }
        }
        else
        if( typeofitem.match(/string/i) && item.match(/ready/i) ) { // found a readied shield
            // no choice; can't use 2 shields at once
            equippedCollection.splice( i, 1 );
            i--;
        }
    }
    // then, insert a 'ready' flag for the current shield
    equippedCollection.splice( readiedShieldNewIndex, 0, 'ready' );

}
Character.prototype.putAwayShield = function( shieldIndexInCollection ) {
    var equippedCollectionKey = this.collections.equipped;
    var equippedCollection = this.collections[equippedCollectionKey];
    if( equippedCollection[shieldIndexInCollection-1]=='ready' ) {  // this allows me to call putAwayShield even when I don't know whether the shield is being used
   //   alert("splicing 'ready' out of the collection, at position "+( shieldIndexInCollection-1));
        equippedCollection.splice( shieldIndexInCollection-1, 1 );
        shieldIndexInCollection--;
    }
    return shieldIndexInCollection;
}
Character.prototype.hasShield = function() {
    var equippedCollection = this.collections[this.collections.equipped];
    for( var k=1; k<equippedCollection.length; k++ ) {
        if( equippedCollection[k].PDB ) {
            return k;
        }
    }
    return false;
}
Character.prototype.readiedShield = function() {
    var shieldItem = false;
    var equippedCollection = this.collections[this.collections.equipped];
    for( var k=1; k<equippedCollection.length; k++ ) {
        var equipmentObj = equippedCollection[k];
        var prevItem = equippedCollection[k-1];
        if( equipmentObj.PDB && prevItem=='ready' ) {    // found one; save the shield item
            shieldItem = equipmentObj;
            break;
        }
    }
    return shieldItem;
}
Character.prototype.block = function() {

    // Is character using a shield?
    var shieldItem = this.readiedShield();
    var blockHash = {'skill':shieldItem.skill,'base':0,'shield':shieldItem.name,'bonus':0};

    var blockSkillLevel = ( shieldItem ) ? this.levelOfSkillWithInfo( shieldItem.skill ) : 'Shield';

    // calculate block from skill
    var block = Math.floor(blockSkillLevel/2);
    blockHash['level'] = Math.floor(blockSkillLevel/2);
    if( this.gameInfo.ruleset.match(/4/) ) {
        block += 3;                             // +3 for 4th Ed. rules, instead of PD
        blockHash['base'] = 3;                  // +3 for 4th Ed. rules, instead of PD
        if(shieldItem) block += shieldItem.PDB; // add Defense Bonus for shield
        if(shieldItem) blockHash['bonus'] = shieldItem.PDB; // Defense Bonus for shield
    }
    // add any adjustments
    block += this.adjustmentsTo('Block') + this.adjustmentsTo('ActiveDefense');
    blockHash['adjustments'] = this.adjustmentsTo('Block') + this.adjustmentsTo('ActiveDefense');
    return blockHash;
}

/*  armor methods  */
Character.prototype.putOnArmor = function( armorItemIndexInCollection ) {
/*  Takes (the index of) an armor item and reconfigures the collection in a way that is consistent
    with that piece being worn.  This is done by iterating over the equipped collection, looking
    for already-worn armor pieces that are inconsistent with the new armor (in terms of body part
    coverage and layerability), and 'removing' these (by removing the 'wear' flag associated with
    them in the collection).  When that is done, a 'wear' flag is inserted for this armor item.   */

//  alert('got index '+armorItemIndexInCollection);

    var equippedCollectionKey = this.collections.equipped;
    var equippedCollection = this.collections[equippedCollectionKey];
    var armorItem = equippedCollection[armorItemIndexInCollection];
    var locArr = armorItem.location;

    // If the new armor is layerable, we need only put it on.
    // If not, we may have to remove some already-worn armor first (and then put the new armor on):
    if( !armorItem.layerable ) {
        /* loop over the collection, looking for incompatible worn armor items and removing them */
      COLLECTION:
        for( var i=1; i<equippedCollection.length; i++ ) {
            var item = equippedCollection[i];
  //          alert(JSONstring.make(item));
            if( item=='wear' ) {    // then the next item is armor, and worn
                item = equippedCollection[++i];   // get next item
     //           alert("pre-incremented i to "+i+", got next item:\n"+JSONstring.make(item));
                // check for incompatibility
                if( item.layerable ) continue COLLECTION; // layerable items are always compatible
              LOCATIONS:
                for( var l=0; l<locArr.length; l++ ) {
                    // at each location to be covered by the new armor, check for coverage by this already-worn armor
                    var loc = locArr[l];
                    if( item.location.indexOf(loc)>=0 ) {     // so this already-worn armor item covers this location too
                        equippedCollection.splice( i-1, 1 );  // 'remove' this armor (by removing the 'wear' flag above it)
                        i = 1; continue COLLECTION;           // restart the collection loop
                    }
                }
            }
        }
    }
    // now put on the new armor
 //   alert("splicing 'wear' into the collection, at position "+equippedCollection.indexOf(armorItem));
    equippedCollection.splice( equippedCollection.indexOf(armorItem), 0, 'wear' );
    // if indexOf() doesn't work here, I'll need to keep track of changes to armorItemIndexInCollection instead

}
Character.prototype.takeOffArmor = function( armorItemIndexInCollection ) {
    var equippedCollectionKey = this.collections.equipped;
    var equippedCollection = this.collections[equippedCollectionKey];
    if( equippedCollection[armorItemIndexInCollection-1]=='wear' ) {  // this allows me to call putAwayShield even when I don't know whether the shield is being used
   //   alert("splicing 'wear' out of the collection, at position "+( armorItemIndexInCollection-1));
        equippedCollection.splice( armorItemIndexInCollection-1, 1 );
        armorItemIndexInCollection--;
    }
    return armorItemIndexInCollection;
}
Character.prototype.armorDR = function( bodyPartName, reportSources, detailed ) {
    bodyPartName = bodyPartName || 'torso';   // use torso if bodyPartName is omitted (use torso for general DR)
    if( bodyPartName.match('body') ) { bodyPartName = 'torso'; }
    // deal with aggregate body parts like 'legs' and 'head'
    if( bodyPartName.match('head') && !detailed ) { bodyPartName = 'skull'; }
    if( bodyPartName.match('arm')  && !detailed ) { bodyPartName = 'domArm'; }
    if( bodyPartName.match('leg')  && !detailed ) { bodyPartName = 'domLeg'; }
    if( bodyPartName.match('hand') && !detailed ) { bodyPartName = 'domHand'; }
    if( bodyPartName.match('feet') && !detailed ) { bodyPartName = 'domFoot'; }

    // scan equipped collection for worn armor
    var eqCollection = this.collections[this.collections.equipped];
    var basicDR = 0;
    var splitDR = 0;
    var armor   = [];
    for( var i=1; i<eqCollection.length; i++ ) {
        var item = eqCollection[i];
        if( !eqCollection[i-1] || eqCollection[i-1]!='wear' ) continue;  // skip non-worn items (also skips all non-armor equipment)
        // item is now worn armor
        if( item.location.indexOf(bodyPartName)<0 ) continue;   // skip items not covering the body area of interest
      //  alert(JSONstring.make(item));
        armor.push(item.name);
        basicDR += item.DR * ( (item.unit) ? item.number : 1 );
        splitDR += ( (item.splitDR) ? item.splitDR : item.DR ) * ( (item.unit) ? item.number : 1 );
    }
    // test for combos that don't add efficiently (e.g. chain+plate, chain only adds 2; see B72)
    if( this.gameInfo.ruleset.match(/3/) && armor.join().match(/chain/i) && armor.join().match(/plate|corselet/i) ) basicDR -= 2;
    if( splitDR==basicDR ) { splitDR = undefined; }		// prevents reporting as 'DR/splitDR' when they are the same
    var DRs = [ basicDR, splitDR ];
    if( reportSources ) DRs.push(armor.join(' + '));
    return DRs;
}
Character.prototype.armorPD = function( bodyPartName, reportSources ) {
    bodyPartName = bodyPartName || 'torso';   // use torso if bodyPartName is omitted (use torso for general PD)
    if( bodyPartName.match('body') ) { bodyPartName = 'torso'; }
    // deal with aggregate body parts like 'legs' and 'head'
    if( bodyPartName.match('head') ) { bodyPartName = 'skull'; }
    if( bodyPartName.match('arm') )  { bodyPartName = 'domArm'; }
    if( bodyPartName.match('leg') )  { bodyPartName = 'domLeg'; }
    if( bodyPartName.match('hand') ) { bodyPartName = 'domHand'; }
    if( bodyPartName.match('feet') ) { bodyPartName = 'domFoot'; }

    // scan equipped collection for worn armor
    var layerables = 0;
    var eqCollection = this.collections[this.collections.equipped];
    var basicPD = 0
    var splitPD = undefined;
    var armor   = [];
    for( var i=1; i<eqCollection.length; i++ ) {
        var item = eqCollection[i];
        if( !item.location ) continue;  // skip non-armor equipment (not needed? see armorDR())
        if( !eqCollection[i-1] || eqCollection[i-1]!='wear' ) continue;  // skip non-worn items
        // item is now worn armor
        if( item.location.indexOf(bodyPartName)<0 ) continue;   // skip items not covering the body area of interest
      //  alert(JSONstring.make(item));
        armor.push(item.name);
        layerables++;
        basicPD = item.PD;
        if( item.hasOwnProperty('splitPD') ) splitPD = item.splitPD;
        // take both PDs from the same item - it can't make sense to do otherwise
        if( !item.layerable ) {    // if the item isn't layerable, it's 'outside', so this is our PD
        		if( !item.hasOwnProperty('splitPD') ) {
        			  splitPD = undefined;	// underlying split PDs don't matter, and shouldn't be shown
        			  armor = [item.name];	// list only this armor item as PD source (will be incorrect for chain|cloth)
        		}
        		break;
        }
    }
    if( splitPD==basicPD ) { splitPD = undefined; }
    armorString = armor.join(' + ');
    // correct for combos that don't follow the 'outer PD wins' rule
    if( armorString.match(/chain/i) && armorString.match(/cloth/i) ) splitPD = 1;   // B72 or B210
    if(splitPD && layerables>1) armorString += "\n"+this.description.name+" is wearing two or more 'layerable' layers of armor.  In this case, JCSP cannot tell in which order these were put on, so it uses the order in which they appear in the collection (inner layers before outer ones) to determine Passive Defense.";
    var PDs = [ basicPD, splitPD ];
    if( reportSources ) PDs.push(armorString);
  //  alert("[ch.armorPD()]\n"+bodyPartName+" popped PDs array:\n"+PDs);
    return PDs;
}

// other utility methods
Character.prototype.getCollectionLabelByName = function( collectionName ) {
    for( var cLabel in this.collections ) {
        var cName = this.collections[cLabel][0];
        if( cName == collectionName ) return cLabel;
    }
    return null;
}
/* Should be considered a 'beta' function
  This function makes use of the fact that currently, all browser implementations of JS objects
  preserve the order of members as they were created.  This is not guaranteed!
  If I re-implement the Character.collections sub-object as an array, this function will need to
  be rewritten.
*/
Character.prototype.reorderCollections = function() {
  // re-sorts collections so as to avoid a JSON issue that happens when contained collections
  // are listed after the collections that contain them.
    var collections = this.collections;
    // Implement the algorithm by 'sorting' the collection keys according to the algorithm,
    // then populate a new object in that order.
    var newCollectionKeys = [];
    for( var ok in collections ) newCollectionKeys.push(ok);
  //  alert("[Ch.reorderCollections] about to re-order "+newCollectionKeys);
    var index = 2;
    for( var key in collections ) {
    //    if( newCollectionKeys.length==0 ) { newCollectionKeys.push( collections[key] ); }
        if( key=='equipped' ) { continue; }
        else if( key=='default' )  { continue; }
        else {
            for( var k=0; k<newCollectionKeys.length; k++ ) {
             // console.log("[Ch.reorderCollections] will now check containment by collections["+key+"] of collections["+newCollectionKeys[k]+"]:");
             // console.log(collectionXcontainsCollectionY( collections[key], collections[newCollectionKeys[k]] ));
                if(     newCollectionKeys[k]!=key
                    &&  collectionXcontainsCollectionY( collections[key], collections[newCollectionKeys[k]] )
                    &&  k>index ) {
                    // get (key for) collection to move
                    var collKeyToMove = newCollectionKeys[k];
                  // alert('saving collection key '+k+': '+collKeyToMove);
                 // console.log('saving collection key '+k+': '+collKeyToMove);
                    // splice it out
                    newCollectionKeys.splice(k,1);
                    // splice it back in at new position
                  // alert('splicing '+collKeyToMove+' back into array at position '+index);
                 // console.log('splicing '+collKeyToMove+' back into array at position '+index);
                    newCollectionKeys.splice( index, 0, collKeyToMove );
                  // alert(JSONstring.make(newCollectionKeys));
                    // restart loop
                    k=0;
                }
            }
        }
        index++;
    }
    var newCollections = {};
    for( var i in newCollectionKeys ) {
        var key = newCollectionKeys[i];
        newCollections[key] = collections[key];
    }
    this.collections = newCollections;
}
Character.prototype.totalEquipmentQuantity = function( measure, eSubset ) {
	//alert("[ch.totalEquipmentQuantity] measure: "+measure+", eSubset: "+eSubset)
		// loop over each of equipment group toting up weights, costs, or whatever 'measure' is
		var totalQuantity = 0;
		var equipTypes = ['equipment','weapons'];
		// regard eSubset as an equipment type first
		for( var et in equipTypes ) {
				var equipType = equipTypes[et];
				if( eSubset && equipType.match(eSubset) ) {
          //  alert('eSubset: '+eSubset+"\nequipType: "+equipType);
            var equipGroup = this[equipType];
            //alert(JSONstring.make(equipGroup));
            for( var equipItemLabel in equipGroup ) {
                var equipItem = equipGroup[equipItemLabel];
              //  alert("[ch.totalEquipmentQuantity] equipItem:\n"+JSONstring.make(equipItem))
                if( equipItem[measure] ) {
                    totalQuantity += /* ( measure.match(/cost/i) ) ? equipItem.number*actualCost(equipItem) : */ equipItem.number*equipItem[measure]
                }
                else if( equipItem.number && measure.match(/actualcost/i) ) { // number check skips non-item collection members
                    totalQuantity += equipItem.number*actualCost(equipItem)
                }
                else if( equipItem.number && measure.match(/actualweight/i) ) { // number check skips non-item collection members
                    totalQuantity += equipItem.number*actualWeight(equipItem)
                }
            }
				}
			  //alert('total '+measure+' so far: '+totalQuantity);
		}
		//if( totalQuantity ) alert('eSubset ('+eSubset+') matched an equipment type; total so far is '+totalQuantity);
		// if nothing has been counted yet, see if eSubset is a collection instead
		var subsetCollection = this.collections[eSubset];
		if( !totalQuantity && subsetCollection ) {
        // alert("toting "+measure+" in '"+eSubset+"' collection");
        for( var i=1; i<subsetCollection.length; i++ ) {
            //alert("this.collections["+eSubset+"]["+i+"]:\n"+JSONstring.make(subsetCollection[i]));
            var equipItem = subsetCollection[i];
			  		if( equipItem[measure] ) {
			  		  //if( measure=='cost' ) alert('actual cost: '+actualCost(equipItem));
			  		    totalQuantity += /* ( measure.match(/cost/i) ) ? equipItem.number*actualCost(equipItem) : */ equipItem.number*equipItem[measure]
                  //  alert('running '+measure+' total: '+totalQuantity);
			  		}
            else if( equipItem.number && measure.match(/actualcost/i) ) {
			  		  //alert(equipItem.name+' actual cost: '+actualCost(equipItem));
                totalQuantity += ( isNaN(actualCost(equipItem)) ) ? 0 : equipItem.number*actualCost(equipItem)
            }
            else if( equipItem.number && measure.match(/actualweight/i) ) {
                totalQuantity += ( isNaN(actualWeight(equipItem)) ) ? 0 : equipItem.number*actualWeight(equipItem)
            }
			  		else if( equipItem.hasOwnProperty('line') ) continue;   // skip formatting 'items'
			  		else if( typeof(equipItem)=='string' ) continue;   // skip wield/wear directive 'items'
			  		else if( !equipItem.name ) {    // recurse on sub-collections
			  		    totalQuantity += this.totalEquipmentQuantity( measure, this.getCollectionLabelByName(equipItem[0]) );
                //alert('added collection for '+this.totalEquipmentQuantity( measure, this.getCollectionLabelByName(equipItem[0]) ));
			  		}
        }
		}
	//	alert('returning '+measure+' of '+totalQuantity+' for '+eSubset);
		return totalQuantity;
}
Character.prototype.getCreateDate = function( short ) {
    if( this.description.createDate===false ) return '&emsp;[new]&emsp;';
    var date = new Date( this.description.createDate );
    // date info
    var year   = date.getFullYear();
    var month  = date.getMonth();
    var dayMo  = date.getDate();    // day of the month (1-31)
    // that's enough for the short date
    var shortDate = months[month].substr(0,3)+' '+dayMo+', '+year;  // months is an array defined in gurps.js
    if( short ) { return shortDate; }
    // weekday and time info
    var wkday  = date.getDay();     // numeric, 0-6
    var hour   = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var ap = (hour < 12) ? "AM" : "PM";
    if (hour > 12) { hour = hour - 12; }
    if (hour == 0) { hour = 12; }
//    if (hour   < 10) { hour   = "0" + hour;   }
    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }
    var time = hour+':'+minute+':'+second+' '+ap;
    var longDateTime = weekDays[wkday]+' '+shortDate+', at '+time;  // weekDays is an array defined in gurps.js
    return longDateTime;
}

// report methods
Character.prototype.makeCollegesReport = function() {

		let MyColleges = [];
		for( let g in this.groups ) {	if( g.match(/spells/i) ) { MyColleges.push(g) } }

    // this toggles open state of colleges report div
    if( $('#reportFrame').html() ) { $('#reportFrame').html(''); return; }

    // start document
    let reportHTML = [];
    let colleges = [];
  COLLEGES:
    for( let g=0; g<MyColleges.length; g++ ) {
        let college = MyColleges[g];

        // unique the college
        let collegename = collegeNames[college];
        if( colleges.indexOf(collegename)>-1 ) continue;
        if( collegename==undefined ) continue;  // this has the effect of filtering out all added non-magic-college entries in the Groups.MagicColleges array

       // alert('looking in '+college+' college');
        let spellListHTML = [];
        let mult = 0;
        for( let s in ch.skills ) {
            let chSkill = ch.skills[s];
            if( !chSkill.spell ) continue;          // skip non-spell skills
            if( !chSkill.name ) continue;           // skip formatting 'skills'
            if( chSkill.key==this.key ) continue;   // skip 'this' spell
            // if chSkill is in MagicColleges, increment mult
           // alert('checking for '+chSkill.key+' in '+college+":\n"+Groups.MagicColleges);
           // console.log('checking for '+chSkill.key+' in '+college+":\n"+Groups[college]);
            // adding '&& Groups.MagicColleges' condition, since prereqs may be attached to character with targets that don't exist in present library
            if( chSkill.points>=1 && Groups[college] && Groups[college].indexOf(chSkill.key)>=0 ) {
                mult++;
              //  console.log('  found '+chSkill.name+' from the '+college+' college');
				        spellListHTML.push("      <li><i>"+chSkill.name+"</i></li>");
            }
        }
        if( mult>=1 ) {
            let collegeSkillPts = this.SpellCollegeSkill(college);    // SpellCollegeSkill returns 0 for 4e characters
            // console.log("[ch.makeCollegesReport] collegeSkillPts: "+collegeSkillPts)
        		colleges.push(collegename);		// add college name to counter if any spells matched
        		let collegeSkill = (collegeSkillPts) ? ', <span title="see '+expandMiniref('M85',true)+'">improvisation skill '+collegeSkillPts+'</span>' : '';
		        reportHTML.push("<p>");
		        reportHTML.push("  <b>"+collegename+" ("+mult+" spell"+es(mult)+collegeSkill+"):</b>");
		        reportHTML.push("  <ul>");
		        reportHTML.push("    "+spellListHTML.join(", \n"));
		        reportHTML.push("  </ul>");
		        reportHTML.push("</p>");
        }
    }
  //  alert(colleges.length);

    // wrap up document
    reportHTML.unshift('<h3 style="text-align:center;">'+colleges.length+' colleges</h3>');
    // inject
    $('#reportFrame').html(reportHTML.join("\n"));
}

// These functions return average heights and weights for a given ST, based on tables found in the rulebooks.
// The adjustBuild function will use these to change these values when ST is changed,
//  for characters with the 'adjustBuild' parameter turned on.
Character.prototype.ST2height = function( ST ) {
    if( this.gameInfo.ruleset.match(3) ) return ST+59;    // B3e p15; which only shows values for ST 5 to 16
    else return (ST<=20) ? heightsByST4e[ST] : ST+65;
}
Character.prototype.ST2weight = function( ST ) {
    if( this.gameInfo.ruleset.match(3) ) {
        // B3e p15; which only shows values for ST 5 to 16
        if( ST==4 ) return 130;
        else if( ST<7 ) return 105+5*ST;
        else if( ST<15 ) return 100+5*ST;
        else return 30+10*ST;
    }
    else {
        // B4e p18, which shows ranges (these are middle values from those) for ST 6 to 14
        if( ST==0 )    return 7;
        else if( ST<3 ) return 5+ST*15;   // low-ST values from http://halls.md/growthchart-boys-girls-height-weight/
        else if( ST<10 ) return ST*15;
        else if( ST==10 ) return 145;
        else return 20*ST-60; // ST 11+
    }
}

Character.prototype.startingWealth = function() {
    var sw = this.gameInfo.startingWealth || StartingWealth_for_TL[this.gameInfo.TL];    // this may be set as different from StartingWealth_for_TL[TL]
    var wealthTrait = this.getTraitInGroup('wealth');
    if( wealthTrait ) {
        var key = wealthTrait.key;
             if( key.match(/broke/i) )       sw  = 0;
        else if( key.match(/poor/i) )        sw *= 0.2;
        else if( key.match(/struggling/i) )  sw *= 0.5;
        else if( key.match(/comfortable/i) ) sw *= 2;
        else if( key.match(/wealthy.5/i) )   sw *= 5;
        else if( key.match(/wealthy.20/i) )  sw *= 20;
        else if( key.match(/filthyrich/i) )  sw *= 100;
        // Multimillionaire multiplies ON TOP OF Filthy Rich
        if( key.match(/multimillionaire/i) ) sw *= 10*wealthTrait.levels;
    }
    return sw;
}

Character.prototype.clone = function() {
    var file = JSONstring.make(this);
    return newCharacterFromJSON( file );
}
/*************************** end  Character Object ****************************/


function attributePtsToLevelPre4e( pts ) {
    var adj;
    if     ( pts<=-20  ) { adj = Math.floor( pts/10 ) - 1; }
    else if( pts<=-15  ) { adj = -2; }
    else if( pts<=-10  ) { adj = -1; }
    else if( pts<=  0  ) { adj =  0; }
    else if( pts<= 30  ) { adj = Math.floor( pts/10 ); }
    else if( pts<= 60  ) { adj = Math.floor( pts/15 ) + 1; }
    else if( pts<= 100 ) { adj = Math.floor( pts/20 ) + 2; }
    else                 { adj = Math.floor( pts/25 ) + 3; }
    return 10 + adj;
}
function STptsToLevelPre4e( pts ) {
    var adj;
    if     ( pts <= 60  ) return attributePtsToLevelPre4e( pts )
    else if( pts <= 140 ) { adj = Math.floor( pts/10 ) -   1; }
    else if( pts <= 175 ) { adj = Math.floor( pts/5  ) -  15; }
    else                  { adj = Math.floor( pts*2  ) - 330; }
    return 10 + adj;
}
function attributeLevelToPtsPre4e( attLvl ) {
    var adjLvl = attLvl - 10;
    var pts;
    if     ( adjLvl <  -2  ) { pts = 10*(adjLvl+1); }
    else if( adjLvl == -2  ) { pts = -15; }
    else if( adjLvl <=  3  ) { pts = 10*(adjLvl); }
    else if( adjLvl <=  5  ) { pts = 15*(adjLvl-1); }
    else if( adjLvl <=  7  ) { pts = 20*(adjLvl-2); }
    else                     { pts = 25*(adjLvl-3); }
    return pts;
}
function STlevelToPtsPre4e( STlvl ) {
    var adjLvl = STlvl - 10;
    var pts;
    // if ( adjLvl < 5 ) attributeLevelToPtsPre4e( STlvl );    replaces first 4 lines below
    if     ( adjLvl <  -2  ) { pts = 10*(adjLvl+1); }
    else if( adjLvl == -2  ) { pts = -15; }
    else if( adjLvl <=  3  ) { pts = 10*(adjLvl); }
    else if( adjLvl <=  5  ) { pts = 15*(adjLvl-1); }
    else if( adjLvl <=  13 ) { pts = 10*(adjLvl+1); }
    else if( adjLvl <=  20 ) { pts =  5*(adjLvl+15); }
    else                     { pts =    (adjLvl+330)/2; }
    return pts;
}
function attLevel2Pts( lvl, att ) {
  //  console.log("[attLevel2Pts] parms lvl="+lvl+", att="+att);
    if( lvl==undefined || att==undefined ) { return 0 }
    else if( ruleset.match('e4') ) {
    	  if( att=='HP' ) return 2*lvl;
    	  if( att=='FP' ) return 3*lvl;
    	  if( att.match(/ST|IQ|DX|HT/i) )
            return ( att=='IQ' || att=='DX' ) ? 20*( lvl - 10 ) : 10*( lvl - 10 );
        else return 5*lvl;
    }
    else {
        return ( att=='ST' ) ? STlevelToPtsPre4e( lvl ) : attributeLevelToPtsPre4e( lvl );
    }
}

function newCharacterFromJSON( jsonFile ) {  // console.log(jsonFile);
 //  alert(jsonFile);
//         JSONstringIncFuncsState = JSONstring.includeFunctions;
//         JSONstring.includeFunctions = true;
    var pseudoCharacter = JSONstring.toObject( jsonFile );
    // if( window.console ) { console.log("[newCharacterFromJSON] instantiated pseudoCharacter object from JSON:\n"+JSONstring.make(pseudoCharacter)); }
//         JSONstring.includeFunctions = JSONstringIncFuncsState;
  // for(var n in pseudoCharacter ) console.log("pseudoCharacter."+n+"\n"+JSONstring.make(pseudoCharacter[n]));
    var newCharacter = new Character( pseudoCharacter.description.name, pseudoCharacter.description.pointTotal );
   // if( window.console ) { console.log("[newCharacterFromJSON] instantiated new Character object"); }

    newCharacter.attributePoints  = pseudoCharacter.attributePoints;
    newCharacter.description      = pseudoCharacter.description;
    newCharacter.playerInfo       = pseudoCharacter.playerInfo;
    newCharacter.gameInfo         = pseudoCharacter.gameInfo;
    newCharacter.preferences      = pseudoCharacter.preferences
                                 ||
    {
        display : {     // analogs (with default values) for each entity in Preferences dialog
            theme        : 'blue',
            watermark    : 0,
            grimoire     : false,
            property     : false,
            TLinfo       : true,
            adjTraitRows : false,
            traitsScroll : false,
            traitsSupp   : false,
            skillsScroll : true,
            skillsSupp   : false,
            stuffScroll  : true,
            stuffSupp    : false,
            suppCombo    : false,
        },
        units : {
            measure: 'English',
            money: '$'
        },
        autoAdjustBuild : false
    };    // this can go again after all archived character files have updated themselves
    // add these new preferences properties if they are absent (older character files)
    if( !newCharacter.preferences.hasOwnProperty('autoAdjustBuild') ) newCharacter.preferences.autoAdjustBuild = false;
    if( !newCharacter.preferences.display.hasOwnProperty('shortnames') ) newCharacter.preferences.display.shortnames = false;
    if( !newCharacter.preferences.display.hasOwnProperty('TLinfo') )    // can probably remove this after everybody has been updated
        newCharacter.preferences.display.TLinfo = true;

    newCharacter.skills = new Array();

//        alert("character skills:\n"+JSONstring.make(pseudoCharacter.skills));
//        alert("Skills object:\n"+JSONstring.make(Skills));
    for( var skillIndex=0; skillIndex<pseudoCharacter.skills.length; skillIndex++ ) {

        var pseudoSkill = pseudoCharacter.skills[skillIndex];
        var key = pseudoSkill.key;

        // deal with formatting 'skill' objects
        if( pseudoSkill.hasOwnProperty('line') ) {
            newCharacter.skills[skillIndex] = pseudoSkill;
            continue;
        }

        if( Skills[key] ) { // corresponding Skill exists in the corresponding skill set object

            // if(key=="Armoury")
                  // console.log("'pseudoSkill' before cloning and attachment:\n"+JSONstring.make(pseudoSkill));

            newCharacter.skills[skillIndex] = cloneSkillWithKey( pseudoSkill, key );
          //  if(key=="Language")
          //   alert( skillIndex+":\n"+JSONstring.make(newCharacter.skills[skillIndex]) );

        }
        else {    // no exactly corresponding Skill (either it has a TL and/or specialization, or it's a custom skill)

            var baseSkillName  = '';
            var tl = null;
            var specialization = null;

            //   Emulate what is done in loadSkillFromDialog (?) to make a TL/spec version.
            if( pseudoSkill.key && pseudoSkill.key.match(/[_|\d]/) ) {
                if( window.console && reportLevel>2 ) { console.log(pseudoSkill.printName+" has tech levels or a specialization"); }
                var skillNameParts = pseudoSkill.key.split('_');
                specialization = skillNameParts[1];
                if( skillNameParts[0].match(/\d/) ) {
                    tl = skillNameParts[0].substr( skillNameParts[0].length-1, 1 );
                    baseSkillName = skillNameParts[0].substr( 0, skillNameParts[0].length-1 );
                }
                else {
                    baseSkillName = skillNameParts[0];
                }
//                    alert("got base skill "+baseSkillName+"\nmatched tech level "+tl+"\nmatched specialization "+specialization);

            }
            // the branch above needs to be revisited in light of skills in arrays
            else {
                baseSkillName = skillIndex;
            }
            // baseSkillName is actually a numeric index now

            if( Skills[baseSkillName] ) { // instantiate new Skill object based on Skill in Skills  BUT...if baseSkillName is an index (from the Character.skills object), and we use it as an index in the Skills library object, it will always find something!  Something wrong!!
                newCharacter.skills[skillIndex] = cloneSkill( Skills[baseSkillName] );
                newCharacter.skills[skillIndex].points = pseudoSkill.points;
               // console.log( skillIndex+":\n"+JSONstring.make(newCharacter.skills[skillIndex]) );
            }
            else {      // instantiate new Skill object using data in the pseudoCharacter generic object
                newCharacter.skills[skillIndex]
                    = new Skill( pseudoSkill.printName, pseudoSkill.attribute, pseudoSkill.difficulty );
                // this Skill will still get the prototype methods
                for( var prop in pseudoSkill ) {
                    newCharacter.skills[skillIndex][prop] = pseudoSkill[prop];
                }
            }

            if( tl ) { newCharacter.skills[skillIndex].TL = tl; }
            if( specialization ) { newCharacter.skills[skillIndex].specialization = pseudoSkill.specialization; }
            if( pseudoSkill.line ) {
                newCharacter.skills[skillIndex].line = pseudoSkill.line;
                continue;   // attach no point attribute to format 'skills'
            }

        }
//        if(key=="Language")
//          alert("after skill attachment:\n"+JSONstring.make(newCharacter.skills[skillIndex]));
        newCharacter.skills[skillIndex].points = pseudoSkill.points;

    }

   // if( window.console ) { console.log("[newCharacterFromJSON] cloned skills"); }

    // traits (clone individually so they get Trait object status in newCharacter
    for( var traitIndex in pseudoCharacter.traits ) {
        newCharacter.traits[traitIndex] = cloneTraitFromGenericObject( pseudoCharacter.traits[traitIndex] );
    }
   // if( window.console ) { console.log("[newCharacterFromJSON] cloned traits"); }

    // objects cloned this way won't be of the right class - generic objects
    // (I think only the items in equipment and weapons are ever non-generic anyway)
    newCharacter.equipment       = pseudoCharacter.equipment;

    newCharacter.weapons         = pseudoCharacter.weapons;
    // this commented code seems to work fine, but I decided not to 'fix' this since it wasn't broken
//     for( var wi in pseudoCharacter.weapons ) {
//         newCharacter.weapons[wi] = cloneEquipmentFromGenericObject( pseudoCharacter.weapons[wi] );
//     }

    newCharacter.collections     = pseudoCharacter.collections;
   // if( window.console ) { console.log("[newCharacterFromJSON] imported collections"); }

    newCharacter.templates       = pseudoCharacter.templates;
   // if( window.console ) { console.log("[newCharacterFromJSON] imported templates"); }

    newCharacter.modifiers       = pseudoCharacter.modifiers || {};
    newCharacter.adjustments     = pseudoCharacter.adjustments || {};
    newCharacter.prerequisites   = pseudoCharacter.prerequisites || {};
    newCharacter.defaults        = pseudoCharacter.defaults || {};
   // if( window.console ) { console.log("[newCharacterFromJSON] imported linkers"); }

    if( pseudoCharacter.modifiers_disabled     ) newCharacter.modifiers_disabled     = pseudoCharacter.modifiers_disabled;
    if( pseudoCharacter.adjustments_disabled   ) newCharacter.adjustments_disabled   = pseudoCharacter.adjustments_disabled;
    if( pseudoCharacter.prerequisites_disabled ) newCharacter.prerequisites_disabled = pseudoCharacter.prerequisites_disabled;
    if( pseudoCharacter.defaults_disabled      ) newCharacter.defaults_disabled      = pseudoCharacter.defaults_disabled;
   // if( window.console ) { console.log("[newCharacterFromJSON] imported disabled linkers"); }

    newCharacter.groups          = pseudoCharacter.groups || {};
   // if( window.console ) { console.log("[newCharacterFromJSON] imported groups"); }

    return newCharacter;
}
