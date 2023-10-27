. "C:\atari-monk\Code\web-shared\ps1_script\CommonFunctions.ps1"

$libName = "template-lib"
$build = "$libName\build\"
$pack = "$libName-1.0.0.tgz"
$lib = $RepoPath + $build + $pack

$targetProjects = @(
  "$RepoPath\your_proj1\",
  "$RepoPath\your_proj2\"
)

Build-Lib
foreach ($targetProj in $targetProjects) {
  Copy-And-Install-Pack -packPath $lib -projDir $targetProj -packName $pack
}
