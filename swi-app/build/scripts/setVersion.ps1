# These are project build parameters in TeamCity
# Depending on the branch, we will use different major/minor versions
[System.Reflection.Assembly]::LoadWithPartialName("System.Web.Extensions")
$ser = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$json = Get-Content "package.json" | Out-String
$obj = $ser.DeserializeObject($json)
$majorVerion = ($obj['version'] -split "\.")[0]
$minorVerion = ($obj['version'] -split "\.")[1]
$buildCounter = "%teamcity.build.counter%" 
$buildNumber = "$majorVerion.$minorVerion.$buildCounter"
Write-Host "##teamcity[buildNumber '$buildNumber']"