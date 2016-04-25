export module GlyphWikiDumpParser {
  
  export interface Definition {
    related: string,
    code: string
  }
  
  export var definitionRegex: RegExp = /\s*(\S+)\s*\|\s*(\S+)\s*\|\s*(\S+)/;
  
  // Throws an exception if the file could not be read
  // ignoreErrors will ignore parse errors
  export function parseFile(filename: string, ignoreErrors?: boolean): Map<string, Definition> {
    if(ignoreErrors === undefined)  ignoreErrors = true;
    
    var fs = require('fs');
    var contents = fs.readFileSync(filename, 'utf8');
    
    return parseString(contents);
  }
  
  export function parseString(dump: string, ignoreErrors?: boolean): Map<string, Definition> {
    if(ignoreErrors === undefined)  ignoreErrors = true;
    
    var lines = dump.split('\n');
    
    var ret = new Map<string, Definition>();
    
    lines.forEach((line, index) => {
      // Skip the first two lines (table headings)
      if(index > 1) {
        
        // Last line is often blank
        if(index === line.length - 1 && line === '') return;
        
        var match = definitionRegex.exec(line);
        if(match === null && !ignoreErrors) throw new Error('Failed to parse line:' + (index + 1));
        
        ret.set(match[1], { related: match[2], code: match[3] });
      }
    });
    
    return ret;
  }
  
}