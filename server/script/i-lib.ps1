. "C:\atari-monk\Code\notes\script\CommonFunctions.ps1"

$libFolder = "server"
$libName = "notes_server"
$build = "$libFolder\build\"
$pack = "$libName-1.0.0.tgz"
$lib = $RepoPath + $build + $pack

$targetProjects = @(
  "$RepoPath\server_tests\"
)

Build-Lib
foreach ($targetProj in $targetProjects) {
  Copy-And-Install-Pack -packPath $lib -projDir $targetProj -packName $pack
}
