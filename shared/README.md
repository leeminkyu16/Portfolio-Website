<p align="center">
    <img align="center" alt="logo" src="./readme-assets/icon-rounded.png" height=100px width=100px/>
    <h1 align="center"> Portfolio Website Shared </h1>
</p>

> Code shared between the frontend website and admin tools.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Technologies Used](#technologies-used)
- [Asset Formats](#asset-formats)
  - [Resume](#resume)
    - [resume/index](#resumeindex)
    - [resume/section/](#resumesection)
    - [resume/section/subsection](#resumesectionsubsection)
    - [resume/section/subsection/subsection-name-template](#resumesectionsubsectionsubsection-name-template)
    - [resume/section/subsection/subsection-name-data](#resumesectionsubsectionsubsection-name-data)
- [Functions](#functions)
  - [List to Object Resume](#list-to-object-resume)
  - [Object to List File Resume](#object-to-list-file-resume)
  - [Object to List Resume](#object-to-list-resume)

## Technologies Used

<table>
<tbody>
    <tr align="center">
        <td align="center" width="15%">
            <a href="https://www.typescriptlang.org/">
                <img
                    src="./readme-assets/typescript-square-icon.svg"
                    width="100%"
                    align="center"
                />
            </a>
        </td>
        <td align="center" width="15%">
            <a href="https://www.npmjs.com/">
                <img
                    src="./readme-assets/npm-square-icon.svg"
                    width="100%"
                    align="center"
                />
            </a>
        </td>
        <td align="center" width="15%">
            <a href="https://babeljs.io/">
                <img
                    src="./readme-assets/babel-square-icon.svg"
                    width="100%"
                    align="center"
                />
            </a>
        </td>
        <td align="center" width="15%">
            <a href="https://eslint.org/">
                <img
                    src="./readme-assets/eslint-square-icon.svg"
                    width="100%"
                    align="center"
                />
            </a>
        </td>
        <td align="center" width="15%">
            <a href="https://prettier.io/">
                <img
                    src="./readme-assets/prettier-square-icon.svg"
                    width="100%"
                    align="center"
                />
            </a>
        </td>
    </tr>
    <tr align="center">
        <td align="center" width="15%">
            <a href="https://www.typescriptlang.org/">
                <b>
                    Typescript
                </b>
            </a>
        </td>
        <td align="center" width="15%">
            <a href="https://www.npmjs.com/">
                <b>
                    npm
                </b>
            </a>
        </td>
        <td align="center" width="15%">
            <a href="https://babeljs.io/">
                <b>
                    Babel
                </b>
            </a>
        </td>
        <td align="center" width="15%">
            <a href="https://eslint.org/">
                <b>
                    ESLint
                </b>
            </a>
        </td>
        <td align="center" width="15%">
            <a href="https://prettier.io/">
                <b>
                    Prettier
                </b>
            </a>
        </td>
    </tr>
</tbody>
</table>

## Asset Formats

### Resume

#### resume/index

```js
[section, ...]
```

#### resume/section/

```js
[uniqueId, title, [subsection1, subsection2, ...]];
```

#### resume/section/subsection

```js
[uniqueId, title, cardSize, subsectionTemplate, subsectionData];
```

#### resume/section/subsection/subsection-name-template

```js
[uniqueId, elementType, elementParameter1, elementParameter2, ...];
```

#### resume/section/subsection/subsection-name-data

```js
[[uniqueId, elementData1, elementData2, ...], ...];
```

## Functions

### List to Object Resume

Converts `listResume` type arrays to `objectResume` type objects.

### Object to List File Resume

Converts `objectResume` type objects to a map of `string`s that maps file paths to the `javascript` code that represents the `listResume` version of the asset.

### Object to List Resume

Converts `objectResume` type objects to `listResume type` arrays.
