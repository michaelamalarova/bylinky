# Použití oficiálního Node.js image jako základ
FROM node:18

# Nastavení pracovního adresáře
WORKDIR /app

# Kopírování package.json a package-lock.json
COPY package*.json ./

# Instalace závislostí
RUN npm install

# Kopírování zbytku aplikace
COPY . .

# Exponování portu aplikace
EXPOSE 3000


CMD ["npm", "run", "start.dev"]

