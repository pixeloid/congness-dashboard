# Konferencia Irányítópult

Modern konferencia- és rendezvénykezelő irányítópult React alapokon, a következő funkciókkal:

- Húzd és ejtsd program kezelés
- Több szekció támogatása
- Sablon alapú eseménytervezés
- Valós idejű időbeosztás számítások
- Reszponzív bento-stílusú felület

## Technológiai Stack

- React
- Vite
- Tailwind CSS
- DND Kit
- Date FNS

## Fejlesztés

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Éles verzió építése
npm run build
```

## Bírálati Rendszer Tesztelése

A különböző bírálati funkciók teszteléséhez használd ezeket a fiókokat:

### Szakmai Bírálók

1. Bejelentkezés Szakmai Bíráló 1-ként:

   - Email: szabo.anna@example.com
   - Absztraktokat bírálhat a határidő előtt
   - Nem hozhat végső döntéseket

2. Bejelentkezés Szakmai Bíráló 2-ként:
   - Email: kiss.marta@example.com
   - Absztraktokat bírálhat a határidő előtt
   - Nem hozhat végső döntéseket

### Főbíráló

Bejelentkezés Főbírálóként:

- Email: kovacs.peter@example.com
- Absztraktokat bírálhat a határidő előtt
- Végső döntéseket csak a határidő után hozhat

### Tesztesetek

1. "Új megközelítések az orvosi képalkotásban" (Aktív Bírálati Időszak):

   - Nemzetközi Orvosi Konferencia 2024
   - Szerző: Dr. Nagy János (nagy.janos@example.com)
   - Bírálati határidő: 2024. március 1.
   - Szakmai bírálók beküldhetnek bírálatokat
   - Főbíráló még nem hozhat végső döntést

2. "Gépi tanulás a diagnosztikai eljárásokban" (Bírálati Időszak Lezárult):
   - Nemzetközi Orvosi Konferencia 2024
   - Szerző: Dr. Johnson (accepted@example.com)
   - Bírálati határidő: 2024. január 20.
   - Szakmai bírálók nem küldhetnek új bírálatokat
   - Főbíráló hozhat végső döntést

### Tesztelési Lépések

1. Szakmai Bíráló Folyamat Tesztelése:

   - Bejelentkezés Szakmai Bíráló 1-ként
   - Navigálás a "Nemzetközi Orvosi Konferencia 2024" eseményhez
   - "Új megközelítések az orvosi képalkotásban" bírálása (működnie kell)
   - "Gépi tanulás a diagnosztikai eljárásokban" bírálása (letiltva kell lennie)

2. Főbíráló Folyamat Tesztelése:

   - Bejelentkezés Főbírálóként
   - Navigálás a "Nemzetközi Orvosi Konferencia 2024" eseményhez
   - Ellenőrizd, hogy az "Új megközelítések az orvosi képalkotásban" absztraktnál "várakozás a határidőre" látható
   - Ellenőrizd, hogy a "Gépi tanulás a diagnosztikai eljárásokban" absztraktnál megjelennek a végső döntési opciók:
     - Elfogadás szóbeli előadásként
     - Elfogadás poszterként
     - Elutasítás

3. Többszörös Bírálatok Tesztelése:
   - Bejelentkezés különböző bírálókként
   - Bírálatok beküldése az "Új megközelítések az orvosi képalkotásban" absztrakthoz:
     - Szakmai Bíráló 1: Klinikai kutatás és neurológia szempontjából
     - Szakmai Bíráló 2: Kardiológia és orvosi technológia szempontjából
   - Ellenőrizd, hogy a főbíráló csak a határidő után dönthet

## Licenc

Privát repository - Minden jog fenntartva
