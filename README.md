# Product vision
Noi vom realiza o aplicație web inspirată de Goodreads, folosind React, Node.Js și SQLite. Aplicația noastră este o platformă modernă și interactivă destinată pasionaților de lectură, care le permite să-și gestioneze și personalizeze experiența de citit. Utilizatorii pot crea conturi pentru a-și salva preferințele de lectură, pentru a organiza și urmări progresul lecturilor, precum și pentru a evalua și comenta cărțile citite, contribuind la o comunitate activă de cititori. <br/> <br/>
Pentru administratori, aplicația oferă un sistem eficient de gestionare a catalogului de cărți, permițând adăugarea, editarea și ștergerea titlurilor și categoriilor, astfel încât biblioteca virtuală să fie mereu actualizată și relevantă. Cu funcții de căutare avansată, organizare pe categorii și acces la profiluri publice ale utilizatorilor, aplicația încurajează descoperirea de noi lecturi și facilitează schimbul de opinii și recomandări între utilizatori. <br/> <br/>
Obiectivul final este de a crea o experiență digitală captivantă și interactivă care să susțină și să amplifice pasiunea pentru lectură și să ofere un spațiu personalizat pentru fiecare utilizator, fie că este un cititor ocazional sau un avid consumator de cărți.

# Requirements
## Functional Requirements
1. Gestionare utilizatori
    * Utilizatorii trebuie să poată crea un cont folosind email și parolă și să se autentifice securizat.
    * Utilizatorii trebuie să poată vizualiza profilul propriu, inclusiv lista de cărți din “Read” și “To Read”.
    * Utilizatorii trebuie să poată edita profilul și să își actualizeze preferințele de lectură.
2. Gestionare cărți
    * Administratorii trebuie să poată adăuga, edita și șterge cărți, incluzând detalii de bază (titlu, autor, descriere).
    * Utilizatorii trebuie să poată vizualiza o listă de cărți din catalogul comun.
    * Utilizatorii trebuie să poată accesa detalii despre o carte individuală (titlu, autor, descriere, rating mediu).
3. Interacțiuni utilizatori
    * Utilizatorii trebuie să poată adăuga cărți la listele personale “Read” și “To Read”.
    * Utilizatorii trebuie să poată evalua o carte pe o scară de 1-5 stele.
4. Căutare și navigare
    * Utilizatorii trebuie să poată căuta o carte după titlu sau autor.
    * Utilizatorii trebuie să poată filtra cărțile după categorii (e.g., Ficțiune, Istorie).
5. Gestionare categorii
    * Administratorii trebuie să poată crea, edita și șterge categorii pentru organizarea cărților.
## Non-Functional Requirements
1. Securitate de bază
    * Sistemul trebuie să aibă autentificare pentru utilizatori și să asigure păstrarea parolelor într-o formă securizată (de exemplu, folosind hashing simplu).
2. Performanță de bază
    * Aplicația trebuie să răspundă rapid pentru majoritatea acțiunilor uzuale, în special căutarea și afișarea listelor de cărți.
3. Compatibilitate de bază
    * Aplicația trebuie să funcționeze corect în browserul Chrome / Microsoft Edge, fără a fi necesară optimizarea pentru alte browsere sau dispozitive mobile.

# Features:
* Gestionarea conturilor utilizatorilor și autentificare securizată.
* Gestionarea cărților din bibliotecă (adăugare, vizualizare, editare și ștergere).
* Funcționalități de rating și recenzii pentru cărți.
* Funcționalități de catalogare și organizare a cărților în categorii.
* Gestionarea bibliotecii personale a utilizatorului, cu liste “Read” și “To Read”.
* Căutare și filtrare de cărți după titlu, autor sau taguri.
* Vizualizarea profilului personal și a profilului altor utilizatori.


# User stories
1. Ca Utilizator, vreau să îmi creez un cont pentru a-mi salva preferințele de cărți și pentru a-mi gestiona biblioteca personală.
2. Ca Utilizator, vreau să mă autentific în siguranță pentru a putea accesa profilul meu și a interacționa cu platforma.
3. Ca Administrator, vreau să adaug cărți noi cu detalii precum titlu, autor, rating, descriere și taguri, astfel încât utilizatorii să aibă cele mai noi opțiuni de explorat.
4. Ca Administrator, vreau să editez detaliile unei cărți existente pentru a corecta eventualele erori sau a face actualizări.
5. Ca Administrator, vreau să șterg cărți din catalog pentru a elimina intrările învechite sau incorecte de pe platformă.
6. Ca Utilizator, vreau să vizualizez informații detaliate despre o carte, inclusiv titlul, autorul, ratingul, descrierea și tagurile, pentru a decide dacă vreau să o citesc.
7. Ca Utilizator, vreau să evaluez cărțile citite pe o scală (1-5 stele) pentru a contribui la evaluările comunității și pentru a descoperi alte cărți care mi-ar plăcea.
8. Ca Utilizator, vreau să las comentarii la cărți pentru a-mi împărtăși gândurile și a participa la discuții cu alți cititori.
9. Ca Utilizator, vreau să citesc comentariile lăsate de alții la o carte pentru a obține perspective diferite.
10. Ca Utilizator, vreau să adaug cărți în biblioteca mea personală în listele „Citite” și „De citit” pentru a ține evidența celor citite și a celor pe care vreau să le citesc.
11. Ca Utilizator, vreau să vizualizez profilul meu personal unde pot vedea cărțile adăugate, evaluările și comentariile mele, pentru a-mi urmări parcursul lecturilor.
12. Ca Utilizator, vreau să vizualizez profilurile publice ale altor utilizatori, inclusiv listele lor de lectură și evaluările, pentru a descoperi cărți bazate pe recomandările lor.
13. Ca Utilizator, vreau să caut cărți după titlu, autor sau taguri pentru a găsi rapid ceea ce caut.
14. Ca Administrator, vreau să creez, să actualizez și să șterg categorii de cărți (ex: ficțiune, știință, mister) astfel încât utilizatorii să poată găsi ușor cărțile după gen.
15. Ca Utilizator, vreau să navighez cărțile după categorii (ex: ficțiune, mister) pentru a găsi genuri care îmi plac.

# User Personas 

## Andreea - Manager de proiect
Andreea, în vârstă de 30 de ani, este manager de proiect într-o corporație. În timpul liber este pasionată de lectură și își dorește să descopere cărți de calitate și recenzii relevante care să o ajute în alegerea lecturilor. Ea citește atât ficțiune, cât și cărți de dezvoltare personală. Uneori, consideră că recenziile disponibile sunt subiective sau insuficient argumentate, ceea ce îngreunează procesul de selecție. Andreea este un utilizator activ de aplicații web și mobile și se descurcă foarte bine cu platformele digitale.

## Maria - Elev
Maria, în vârstă de 14 ani, este elevă în clasa a opta. Ea își dorește să țină o evidență a tuturor cărților pe care vrea să le citească în viitor, deoarece în prezent nu are atât de mult timp liber. În plus, vrea să găsească recomandări de cărți potrivite pentru vârsta și interesele ei. Găsește uneori dificil să aleagă cărți potrivite și este influențată de recenziile și sugestiile de carte de pe rețelele sociale. Se descurcă foarte bine în utilizarea aplicațiilor web și mobile și este obișnuită cu platformele digitale.

## Ioana - Părinte
Ioana, în vârstă de 40 de ani, este mamă casnică. În timpul liber, este pasionată de lectură și își dorește să poată discuta despre cărțile citite cu alte persoane. De asemenea, este interesată să descopere cărți potrivite pentru copilul său, astfel încât să îl încurajeze să citească mai mult. Uneori, găsește dificil să aleagă cărți de calitate și nu are mereu acces la o comunitate de cititori activi. Folosește aplicații web și mobile, dar preferă platformele intuitive și ușor de utilizat.

## Mihai - Inginer software
Mihai, în vârstă de 35 de ani, lucrează într-o companie de tehnologie pe postul de inginer software. În ultima perioadă, nu mai are atât de mult timp liber și este foarte selectiv cu modul în care și-l petrece. Atunci când vrea să citească, își dorește să aleagă doar cărțile cele mai apreciate de public, bazându-se pe recenzii bine argumentate. El se descurcă foarte bine cu aplicațiile web și mobile și preferă soluții eficiente și bine optimizate.

# C4 Diagram

### System Context
![System_Context](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/structurizr-System_Context.png)

### Containers
![Containers](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/structurizr-Containers.png)

### Components
![Components](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/structurizr-Backend_Components.png)

# Class Diagram
![class_diagr](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/UML.jpeg)

# Use Case Diagram

![use_case_diagr](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/Decision%20tree.png)

# Planul de testare
## Obiectivele Testării
1. **Testarea Unităților**:
   - Testarea funcțiilor backend pentru a ne asigura că fiecare unitate de cod funcționează corect în mod izolat
   - Asigurarea că datele sunt procesate corect la nivelul fiecărei componente sau funcții

2. **Testarea End-to-End (E2E)**:
   - Testarea completă a fluxurilor de utilizator
   - Simularea acțiunilor utilizatorilor reali pentru a valida comportamentele aplicației în scenarii de utilizare reală

3. **Testarea Performanței**:
   - Evaluarea timpilor de încărcare a aplicației pentru a asigura o experiență rapidă și eficientă a utilizatorului
  
## Metodele Testării

Pentru fiecare nivel de testare, am folosit următoarele metode pentru a asigura că aplicația funcționează conform așteptărilor:

### 1. **Testarea Unitară (Unit Testing)** - **Jest**
   - **Descriere**: Testarea funcționalității componentelor backend la nivel de unitate, în mod izolat
   - **Scop**:Verificarea integrării și interacțiunilor dintre diferite părți ale aplicației, pentru a asigura un comportament consistent și corect pe întregul proces
   - **Rezultat**:
     
     ![Rezultat](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/jest_results.png)

   **Comandă pentru rularea testelor unitare**:
   
   npm test
### 2. **Testarea End-to-End (E2E)** - **Cypress**
   - **Descriere**: Testarea completă a fluxurilor de utilizatori din aplicație, asigurându-se că toate interacțiunile și funcționalitățile critice se comportă așa cum se așteaptă în scenariile reale.
   - **Scop**: Verificarea corectitudinii fiecărei părți a aplicației
   - **Exemplu**:
     - User Flow: Add Book to ReadMe, Comment, and Mark as Read: Acesta testează un flux complet pentru un utilizator care se conectează, adaugă o carte la lista de citit, adaugă un comentariu și marchează cartea ca citită
     - **Rezultate**:
       
     ![](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/e2e_3.png)

     ![](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/e2e_1.png)

     ![](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/e2e_2.png)

   **Comandă pentru rularea testelor E2E**:
   
   npx cypress open

### 3. **Testarea Performanței** - **Chrome Lighthouse**
   - **Descriere**: Testarea performanței aplicației pentru a evalua viteza de încărcare a paginilor, eficiența resurselor și performanța generală. Lighthouse este un instrument automatizat care oferă evaluări pentru performanță, accesibilitate, SEO și bune practici.
   - **Scop**: Identificarea posibilelor îmbunătățiri pentru viteza de încărcare și optimizarea aplicației, în scopul de a îmbunătăți experiența utilizatorilor și de a minimiza timpii de încărcare ai paginilor.
   - **Rezultat**:

     ![](https://github.com/unibuc-cs/software-engineering-product-code-girls/blob/main/backend/uploads/performance_results.png)

   - **Observatii**: Performanța paginii este  mai slabă (scor 55), afectată de timpi mari de încărcare și un Speed Index ridicat. Deși interactivitatea și stabilitatea vizuală sunt acceptabile, pagina necesită optimizări precum reducerea dimensiunii resurselor, îmbunătățirea caching-ului.


 




