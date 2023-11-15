. "C:\atari-monk\Code\notes\script\CommonFunctions.ps1"

$libFolder = "lib"
$libName = "notes_lib"
$build = "$libFolder\build\"
$pack = "$libName-1.0.0.tgz"
$lib = $RepoPath + $build + $pack

$targetProjects = @(
  "$RepoPath\server\",
  "$RepoPath\editor\",
  "$RepoPath\reader\"
)

Build-Lib
foreach ($targetProj in $targetProjects) {
  Copy-And-Install-Pack -packPath $lib -projDir $targetProj -packName $pack
}
