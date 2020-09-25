/*
JSONstring v 1.02
copyright 2006-2010 Thomas Frank
(Small sanitizer added to the toObject-method, May 2008)
(Scrungus fix to some problems with quotes in strings added in July 2010)

This EULA grants you the following rights:

Installation and Use. You may install and use an unlimited number of copies of the SOFTWARE PRODUCT.

Reproduction and Distribution. You may reproduce and distribute an unlimited number of copies of the SOFTWARE PRODUCT either in whole or in part; each copy should include all copyright and trademark notices, and shall be accompanied by a copy of this EULA. Copies of the SOFTWARE PRODUCT may be distributed as a standalone product or included with your own product.

Commercial Use. You may sell for profit and freely distribute scripts and/or compiled scripts that were created with the SOFTWARE PRODUCT.

Based on Steve Yen's implementation:
http://trimpath.com/project/wiki/JsonLibrary

Sanitizer regExp:
Andrea Giammarchi 2007

*/
/*  Jim Thurmond, Nov 2013
I have modified the toJsonStringArray function moderately, to output nicely-indented JSON
similar to the output of the FormatJSON function found at:

  // http://joncom.be/code/javascript-json-formatter/

To achieve this, I have shamelessly stolen some of the ideas found there, and added them to
this code.
*/

JSONstring={
	compactOutput:false, 		
	includeProtos:false, 	
	includeFunctions: false,
	detectCirculars:true,
	restoreCirculars:true,
	tab:'  ',
	make:function(arg,restore) {
		this.restore=restore;
		this.mem=[];this.pathMem=[];
		return this.toJsonStringArray(arg,false,this.tab).join('');
	},
	toObject:function(x){
		if(!this.cleaner){
			try{this.cleaner=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}
			catch(a){this.cleaner=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}
		};
		if(!this.cleaner.test(x)){return {}};
		eval("this.myObj="+x);
		if(!this.restoreCirculars || !alert){return this.myObj};
		if(this.includeFunctions){
			var x=this.myObj;
			for(var i in x){
        if(typeof x[i]=="string" && !x[i].indexOf("JSONincludedFunc:")){
          x[i]=x[i].substring(17);
          eval("x[i]="+x[i])
        }
			}
		};
		this.restoreCode=[];
		this.make(this.myObj,true);
		var r=this.restoreCode.join(";")+";";
		eval('r=r.replace(/\\W([0-9]{1,})(\\W)/g,"[$1]$2").replace(/\\.\\;/g,";")');
		eval(r);
		return this.myObj;
	},
	toJsonStringArray:function(arg,out,indent) {
		if(!out){this.path=[]};
		out = out || [];
		var u; // undefined
		switch (typeof arg) {
		case 'object':
			this.lastObj=arg;
			if(this.detectCirculars){
				var m=this.mem; var n=this.pathMem;
				for(var i=0;i<m.length;i++){
					if(arg===m[i]){
						out.push('"JSONcircRef:'+n[i]+'"');return out
					}
				};
				m.push(arg); n.push(this.path.join("."));
			};
			if (arg) {
				if (arg.constructor == Array) {
				  if(!arg.length) {
				    out.push('[]');
				    return out;
				  }
					out.push('['+'\n'+indent);
					for (var i = 0; i < arg.length; ++i) {
						this.path.push(i);
						if (i > 0)
							out.push(',\n'+indent);
						this.toJsonStringArray(arg[i],out,indent+this.tab);
						this.path.pop();
					}
					var gIndent = indent.slice(0,-this.tab.length);
					out.push('\n'+gIndent+']');
					return out;
				} else if (typeof arg.toString != 'undefined') {
          var iCount = 0;
          $.each(arg, function() {
              iCount++;
              return;
          });
          if (iCount == 0) { // object is empty
				    out.push('{}');
				    return out;
          }
					out.push('{'+'\n'+indent);
					var first = true;
					for (var i in arg) {
						if(!this.includeProtos && arg[i]===arg.constructor.prototype[i]){continue};
						this.path.push(i);
						var curr = out.length; 
						if (!first)
							out.push(this.compactOutput?',':',\n'+indent);
						this.toJsonStringArray(i,out,indent+this.tab);
						out.push(': ');                    
						this.toJsonStringArray(arg[i],out,indent+this.tab);
						if (out[out.length - 1] == u)
							out.splice(curr, out.length - curr);
						else
							first = false;
						this.path.pop();
					}
					var gIndent = indent.slice(0,-this.tab.length);
					out.push('\n'+gIndent+'}');
					return out;
				}
				return out;
			}
			out.push('null');
			return out;
		case 'unknown':
		case 'undefined':
		case 'function':
			if(!this.includeFunctions){out.push(u);return out};
			arg="JSONincludedFunc:"+arg;
			out.push('"');
			var a=['\\','\\\\','\n','\\n','\r','\\r','"','\\"'];arg+=""; 
			for(var i=0;i<8;i+=2){arg=arg.split(a[i]).join(a[i+1])};
			out.push(arg);
			out.push('"');
			return out;
		case 'string':
			if(this.restore && arg.indexOf("JSONcircRef:")==0){
				this.restoreCode.push('this.myObj.'+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.myObj."));
			};
			out.push('"');
			var a=['\n','\\n','\r','\\r','"','\\"'];
			arg+=""; for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])};
			out.push(arg);
			out.push('"');
			return out;
		default:
			out.push(String(arg));
			return out;
		}
	}
};