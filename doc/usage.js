var lvl = require('../index')
  , ast = require('mkast');
ast.src('# 1\n\n## 2\n\n### 3\n\n')
  .pipe(lvl({levels: [1, 2, -1, 0, 0, 0]}))
  .pipe(ast.stringify({indent: 2}))
  .pipe(process.stdout);
