const lib = require('./../../script/copy-package')

const projFolder = 'lib'
const sourceFile = `../${projFolder}/package.json`
const targetDir = `../${projFolder}/build`
const debug = false

const paths = lib.getPaths(sourceFile, targetDir)
if (debug) lib.printPaths(paths)
lib.copyFileToBuild(paths)
