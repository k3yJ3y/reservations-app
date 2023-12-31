# Reservations-app
## Opis
Aplikacija je enostranska spletna aplikacija (SPA), ustvarjena z uporabo tehnologij, kot so React, Node/Express in MySQL. Namenjena je omogočanju uporabnikom rezervacije poljubne entitete. Uporabniki lahko vpišejo naslov, datum in čas začetka ter datum in čas konca rezervacije v ustrezna polja. S pritiskom na gumb "Add reservation" lahko ustvarijo novo rezervacijo. Ustvarjene rezervacije se nato prikazujejo na seznamu rezervacij.

Na seznamu rezervacij so rezervacije urejene po datumu in času začetka, pri čemer so vizualno ločene glede na njihov status:
- Pretekle rezervacije so označene z rdečo barvo.
- Trenutno potekajoče rezervacije so označene zeleno.
- Rezervacije, ki se bodo zgodile v prihodnosti, so označene belo.
 
Uporabniki imajo možnost izbrisati posamezno rezervacijo s pritiskom na gumb v vrstici rezervacije, kar omogoča enostavno upravljanje s seznamom rezervacij. Celotna izkušnja je zasnovana tako, da omogoča hitro in pregledno rezervacijo entitet glede na časovne parametre.

### Demonstrativni video
Vabljeni k ogledu kratkega demonstracijskega videa, ki prikazuje delovanje same aplikacije. Video je dostopen na naslovu [https://youtu.be/lsayNLVujcE](https://youtu.be/lsayNLVujcE).

## Navodila
najprej klonirajte GitHub repozitorij na svoj računalnik
```
git clone https://github.com/k3yJ3y/reservations-app.git
```

### Nastavitev Zalednega Dela
1. Premaknite se v mapo backend: 
```cd backend```
2. Namestite odvisnosti: ```npm i```
3. Ustvarite datoteko .env v mapi backend in izpolnite naslednje podrobnosti:
```
DB_USER=Uporabniško ime za dostop do podatkovne baze.
DB_NAME=Ime podatkovne baze, v katero se bodo shranjevali podatki.
DB_PASS=Geslo za dostop do podatkovne baze.
DB_HOST=Server, kjer teče aplikacija. Uporabi 'localhost' ali '127.0.0.1' za lokalni razvoj.
PORT=Vrata, na katerih želiš, da bo aplikacija dostopna.
```
4. Poženite zaledni del z ```npm start``` ali ```npm run dev``` --> API bo dostopen na ```http://localhost:{PORT}```
5. V kolikor želite pognati teste uporabite ```npm test```

### Nastavitev Prednjega Dela
1. Premaknite se v mapo backend: 
```cd frontend```
2. namestite odvisnosti: ```npm i```
3. Ustvarite datoteko .env v mapi backend in izpolnite naslednje podrobnosti:
```REACT_APP_BACKEND_URL=http://localhost:{PORT}``` --> uporabite PORT na katerih je dostopen zaledni del aplikacije
4. Poženite prednji del z ```npm start```
5. V kolikor želite pognati teste uporabite ```npm test```

## Description
The application is a single page web application (SPA) built using technologies such as React, Node/Express and MySQL. It is intended to allow users to book any entity. Users can enter the address, start date and time, and end date and time of the reservation in the appropriate fields. By pressing the "Add reservation" button, they can create a new reservation. The created reservations are then displayed in the reservation list.

On the reservations list, entries are organized by the start date and time, and their status is visually indicated as follows:
- Past reservations are highlighted in red.
- Currently ongoing reservations are highlighted in green.
- Reservations scheduled for the future are marked in white.

Users have the option to delete individual reservations by pressing the button in the reservation row, allowing for easy management of the reservations list. The entire user experience is designed to facilitate a quick and clear reservation process for entities based on chronological parameters.

### Demonstrative video
You can also watch a short demonstrative video showcasing the functionality of the application at [https://youtu.be/lsayNLVujcE](https://youtu.be/lsayNLVujcE).

## Instructions
first clone the GitHub repository to your computer
```
git clone https://github.com/k3yJ3y/reservations-app.git
```

### Backend Setup
1. Move to the backend folder:
```cd backend```
2. Install dependencies: ```npm i```
3. Create an .env file in the backend folder and fill in the following details:
```
DB_USER=Username to access the database.
DB_NAME=The name of the database in which the data will be stored.
DB_PASS=Password to access the database.
DB_HOST=The server where the application is running. Use 'localhost' or '127.0.0.1' for local development.
PORT=The port on which you want the application to be accessible.
```
4. Start the backend with ```npm start``` or ```npm run dev``` --> API will be accessible at ```http://localhost:{PORT}```
5. If you want to run the tests, use ```npm test```

### Frontend Setup
1. Move to the backend folder:
```cd frontend```
2. install dependencies: ```npm i```
3. Create an .env file in the backend folder and fill in the following details:
```REACT_APP_BACKEND_URL=http://localhost:{PORT}``` --> use the PORT on which the backend of the application is accessible
4. Start the frontend with ```npm start```
5. If you want to run the tests, use ```npm test```
