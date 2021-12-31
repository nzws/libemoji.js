# @nzws/libemoji.js

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nzws/libemoji.js/Node%20CI?style=for-the-badge)](https://github.com/nzws/libemoji.js/actions)
[![npm (scoped)](https://img.shields.io/npm/v/@nzws/libemoji.js?style=for-the-badge)](https://github.com/nzws/libemoji.js/releases)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@nzws/libemoji.js?style=for-the-badge)](https://npmjs.com/@nzws/libemoji.js)
[![License](https://img.shields.io/github/license/nzws/libemoji.js?style=for-the-badge)](https://github.com/nzws/libemoji.js/blob/master/LICENSE)

> Unofficial nodejs wrapper for [emoji-gen/libemoji](https://github.com/emoji-gen/libemoji)

**⚠ This library is currently under development**

### Original Library

- [libemoji](https://github.com/emoji-gen/libemoji) by [emoji-gen](https://github.com/emoji-gen) Team

## Requirements

- Node.js v16
  - yarn v2
- CMake
- Python 2.7 (recommend to use [asdf](https://github.com/asdf-vm/asdf))
- C11 Compiler
- C++14 Compiler

## Usage

```
yarn add @nzws/libemoji.js # or npm i @nzws/libemoji.js
```

## Development

```
# Initialize
asdf install python 2.7.18
sudo apt install clang-format # for ubuntu 20.04

yarn
yarn setup

# Lint
yarn lint

# Format
yarn format

# Build
yarn build

# Test
yarn test
```
