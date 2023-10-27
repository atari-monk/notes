. "C:\atari-monk\Code\web-shared\ps1_script\CommonFunctions.ps1"
$repoPath = "C:\atari-monk\Code\notes"

$libName = "text_lib"
$build = "$libName\build"
$pack = "$libName-1.0.0.tgz"
$lib = "$repoPath\$build\$pack"

$targetProjects = @(
  "$repoPath\text_lib_tests\"
)

Build-Lib
foreach ($targetProj in $targetProjects) {
  Copy-And-Install-Pack -packPath $lib -projDir $targetProj -packName $pack
}
