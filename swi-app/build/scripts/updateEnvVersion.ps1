$package = Get-Content "package.json" | ConvertFrom-Json
$env = Get-Content "environment.json" | ConvertFrom-Json

$env.version = $package.version
$env | ConvertTo-Json | Set-Content "environment.json"
