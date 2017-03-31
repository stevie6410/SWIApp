(ROBOCOPY ".\out\installer" "\\DCWSAORA001P\Pubs\SWIApp\installer") ^& IF %ERRORLEVEL% LEQ 1 exit 0
