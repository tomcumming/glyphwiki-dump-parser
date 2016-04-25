import gdp = require('../dist/glyphwiki-dump-parser');

var result = gdp.GlyphWikiDumpParser.parseFile('test_dump.txt', false);

var tests = [
  result.size === 500,
  result.get('aj1-01416') !== undefined
    ? result.get('aj1-01416').code === '99:0:0:0:0:200:200:u87f9'
    : false
];

tests.forEach((value, index) => {
  if(!value) console.log('FAIL: test ' + (index + 1)); 
});

if(tests.filter(v => !v).length > 0)
  process.exit(1);
else
  console.log('PASS');

