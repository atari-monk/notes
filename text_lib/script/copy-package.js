const copyFileToBuild = require("C:/atari-monk/code/web-shared/js_script/copy-package");

const projName = 'dom-lib'
const sourceFile = `../${projName}/package.json`
const targetDir = `../${projName}/build`

copyFileToBuild(sourceFile, targetDir)
