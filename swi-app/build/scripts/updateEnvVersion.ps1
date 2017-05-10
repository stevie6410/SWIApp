# $ser = New-Object System.Web.Script.Serialization.JavaScriptSerializer
# $json = Get-Content "package.json" | Out-String
$obj = Get-Content "package.json" | ConvertFrom-Json
$version = $obj['version']

$env = Get-Content "environment.json" | ConvertFrom-Json
$env.version = $version
$env | ConvertTo-Json | Set-Content "environment.json"
