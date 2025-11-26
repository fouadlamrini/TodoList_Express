# cach redis
# ============================================================================
howa mkykhdmch f windows kykhdm f linux 
bach n7lo had mochkil kan installiw wsl (linux f windows)

# Etap1:
fta7 powershell tant que administrateur
sir l button windows 9lb 3la powerShell ghadi itl3 lik windows powershell
click droit
executer tant que administrateur
ktb f terminal 
wsl --install -d Ubuntu

# etap2: 
fta7 terminal dyal ubunto
sudo apt update
sudo apt upgrade -y
sudo apt install redis-server -y

# etap3:
executer redis
sudo service redis-server start

# etap4:
 verifier redis wach khdam
redis-cli ping
 khas y3tina pong
hadchi kykhli redis khdam fga3 les projet 
f terminal f projet dyali nktb Ghir npm run dev

# etap5:
ila bghit nw9f redis
ndkhl terminal ubunto mn button windows onktb 
sudo service redis-server stop



# documentation

https://colinchjs.github.io/2023-09-17/00-51-03-517363-implementing-server-side-caching-using-redis-in-expressjs-applications/ 
