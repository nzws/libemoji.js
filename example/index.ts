// via local
import { generate } from '../lib';
// via npm
// import { generate } from '@nzws/libemoji.js';

import { promises } from 'fs';

void (async () => {
  const emoji = generate('えも\nじ', {
    textAlign: 'left',
    typefaceFile: './externals/libemoji/example/NotoSansMonoCJKjp-Bold.otf',
    color: '#1fddffff'
  });
  console.log(emoji);

  await promises.writeFile('./example/emoji.nogit.png', emoji.buffer);
  console.log('wrote emoji.nogit.png');
})();
