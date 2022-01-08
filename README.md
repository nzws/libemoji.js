# @nzws/libemoji.js

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nzws/libemoji.js/Node%20CI?style=for-the-badge)](https://github.com/nzws/libemoji.js/actions)
[![npm (scoped)](https://img.shields.io/npm/v/@nzws/libemoji.js?style=for-the-badge)](https://github.com/nzws/libemoji.js/releases)
[![License](https://img.shields.io/github/license/nzws/libemoji.js?style=for-the-badge)](https://github.com/nzws/libemoji.js/blob/master/LICENSE)

> Unofficial nodejs wrapper for [emoji-gen/libemoji](https://github.com/emoji-gen/libemoji)

### Original Library

- [libemoji](https://github.com/emoji-gen/libemoji) by [emoji-gen](https://github.com/emoji-gen) Team
- [emojilib](https://github.com/emoji-gen/emojilib) by [emoji-gen](https://github.com/emoji-gen) Team

> ⚠ `libemoji.js` is an unofficial library, do not send any questions/issues about this to the original author.

## Usage

```
yarn add @nzws/libemoji.js # or `npm i @nzws/libemoji.js`
```

```typescript
import { generate } from '@nzws/libemoji.js';
import { promises } from 'fs';

void (async () => {
  const emoji = generate('えも\nじ', {
    width: 128,
    height: 128,
    color: '#1fddffff',
    backgroundColor: '#00000000',
    textAlign: 'center',
    textSizeFixed: false,
    disableStretch: false,
    typefaceFile: '/path/to/JapaneseFontFile.otf',
    typefaceName: '',
    format: 'png',
    quality: 100
  });

  await promises.writeFile('./example/emoji.png', emoji.buffer);
})();
```

## Development

### Requirements

- Node.js v16
  - yarn v2
- CMake
- Python 2.7 (recommend to use [asdf](https://github.com/asdf-vm/asdf))
- C11 Compiler
- C++14 Compiler

### Initialize

```
# Initialize
asdf install python 2.7.18
sudo apt install clang-format # for linux

yarn
yarn setup
```
