$ser = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$json = Get-Content "package.json" | Out-String
$obj = $ser.DeserializeObject($json)
$version = $obj['version']

$env = Get-Content "assets/environment.json" | ConvertFrom-Json
$env.version = $version
$env | ConvertTo-Json | Set-Content "environment.json"
