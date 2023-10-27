const path = require('path')
const fs = require('fs')

function copyFileToBuild(sourceFile, targetDir) {
  const scriptDir = __dirname
  const projectRootDir = path.resolve(scriptDir, '.')
  console.log('scriptDir:', projectRootDir)
  const sourcePath = path.join(projectRootDir, sourceFile)
  console.log('sourcePath:', sourcePath)
  const targetPath = path.join(
    projectRootDir,
    targetDir,
    path.basename(sourceFile)
  )
  console.log('targetPath:', targetPath)

  if (!fs.existsSync(path.dirname(targetPath))) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  }

  fs.copyFileSync(sourcePath, targetPath)

  console.log(`Copied ${sourcePath} to ${targetPath}`)
}

const sourceFile = `../package.json`
const targetDir = `../build`

copyFileToBuild(sourceFile, targetDir)
// shared.copyFileToBuild2(
//   'C:/atari-monk/code/notes/text_lib/package.json',
//   'C:/atari-monk/code/notes/text_lib/build'
// )
