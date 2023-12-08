# Get EGS folders

[![NPM version](https://img.shields.io/npm/v/get-egs-folders?color=a1b858&label=)](https://www.npmjs.com/package/get-egs-folders)

This lib is inspired by [getSteamFolders](https://github.com/KelpyCode/getSteamFolders).

## Usage

Install package first:

```shell
# npm
npm i get-egs-folders

# Yarn
yarn add get-egs-folders
```

Import functions by named import:
```ts
import { getEgsMainLocation, getAllEgsGames } from 'get-egs-folders'
```

## API

### ``getAllEgsGames()``
#### => ``Promise<Record<string, { path: string; size: number; }>>``

```ts
const games = await getAllEgsGames();

console.log(games['Fortnite']);
```
