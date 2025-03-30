//file server.js
/*
server.js obvykle slouží jako hlavní soubor, který inicializuje Express aplikaci a spouští HTTP server. 
To znamená, že když spustíte aplikaci pomocí příkazu node server.js, tento soubor se vykoná jako první.

server.js inicializuje Express aplikaci (const app = express();) a nastavuje middleware, jako je body-parser.
Tento soubor definuje základní konfigurace, jako je připojení k databázi (mongoose.connect(...)), 
a zajišťuje, že server je připraven přijímat a zpracovávat HTTP požadavky.
*/

require('dotenv').config();
const express = require('express'); //Načte modul express, který je minimalistickým a flexibilním webovým frameworkem pro Node.js. express poskytuje robustní sadu funkcí pro webové a mobilní aplikace.
const mongoose = require('mongoose'); //Načte modul mongoose, což je knihovna pro MongoDB a Node.js, která poskytuje elegantní řešení pro práci s daty v MongoDB pomocí objektově orientovaného modelování.
const bodyParser = require('body-parser'); //Načte modul body-parser, který je middleware pro zpracování těla HTTP požadavků. Umožňuje extrahovat celá těla požadavků a uložit je do req.body.
const routes = require('./routes');
const app = express(); //Vytvoří a vraci novou instanci Express aplikace. app je hlavní objekt aplikace, který bude používat metody pro definování cest, middleware a další funkce.
const cors = require('cors');
/*
Express aplikace je objekt, který obsahuje všechny základní metody a vlastnosti potřebné pro definování webového serveru a zpracování HTTP požadavků a odpovědí. 
Tato aplikace slouží jako jádro, které přijímá HTTP požadavky, zpracovává je a vrací HTTP odpovědi.
Express nastaví několik základních vlastností a metod pro tuto aplikaci, které umožňují manipulaci s HTTP požadavky a odpověďmi.
Nová instance Express aplikace má vestavěné funkce pro definování middleware a trasování požadavků.
Middleware jsou funkce, které zpracovávají požadavky mezi přijetím požadavku serverem a odesláním odpovědi zpět klientovi.
Routing umožňuje definovat různé cesty (URLs) a metody HTTP (GET, POST, PUT, DELETE, atd.) pro zpracování těchto požadavků.
*/

//Připojí se k databázi MongoDB běžící na kontejneru mongo (definovaném v docker-compose.yml) na portu 27017 a používá databázi s názvem sberatel
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/sberatel';
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

//který se používá k analýze příchozích požadavků a extrahování dat z těla těchto požadavků. 
//V závislosti na konfiguraci může body-parser zpracovávat různé formáty dat, včetně JSON, URL encoded dat, a dalších.
//Bez body-parser middleware byste museli ručně parsovat tělo požadavku, což by bylo složité a náchylné k chybám
//Parsed data jsou zpřístupněna v req.body
app.use(bodyParser.json());

//kdyz dam app.use tak apka bude poslouchat na adrese /api a na vsech podadresach
app.use('/api', routes);

//Spustí server na portu 3000.
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
