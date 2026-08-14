Steps to deploy in SSH:

npm build
open powershell
scp -P 8312 -r .\out\* [direction]@[filedirection] example: scp -P 8312 -r .\out\* mcpr2027@ccc.inaoep.mx:/home/mcpr2027/public_html/

ssh mcpr2027@ccc.inaoep.mx -p 8312
Cic.mcpr.27
find public_html -type f -exec chmod 644 {} \;
find public_html -type d -exec chmod 755 {} \;
