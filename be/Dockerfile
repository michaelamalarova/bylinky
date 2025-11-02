# Použijte oficiální image Node.js
# Image obsahuje předem nainstalovaný Node.js a npm
FROM node:18

# Nastavte pracovní adresář v kontejneru (izolovane prostredi ktere vytvori docker)
WORKDIR /usr/src/app

# Zkopírujte package.json a nainstalujte závislosti
COPY package*.json ./

RUN npm install

# Zkopírujte zbytek aplikace
COPY . .

RUN npm install cors

# Otevřete port 3000
EXPOSE 3000

CMD ["node", "server.js"]  
