$package = Get-Content "package.json" -Raw | ConvertFrom-Json
$env = Get-Content "environment.json" -Raw | ConvertFrom-Json

$env.version = $package.version
$env | ConvertTo-Json | Set-Content "environment.json"
