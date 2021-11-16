# Piiquante

### Contexte du projet

Vous avez passé la dernière année en tant que développeur back-end indépendant et vous avez travaillé sur plusieurs projets de tailles et de difficultés variées.

La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet.
Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones ».
C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes ».

Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent.
Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.

### Prérequis

Vous devez avoir Node et npm installés localement sur votre machine.

#### Installation du front-end

Retirez le code de l'application front-end du repository du projet (https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6) et suivez les étapes suivantes :

1. Clonez le repository
2. Ouvrez un terminal (Linux/Mac) ou une invite de commande/PowerShell (Windows)
3. Exécutez npm install à partir du répertoire du projet
4. Exécutez npm start
   . Exécutez le back-end sur http://localhost:3000 seulement
5. Dans le dossier Back-end, créez un dossier "images" où seront stockées les photos des sauces
6. Dans le dossier Back-end, créer un fichier .env avec les paramètres SECRET_MONGOOSE et SECRET_TOKEN pour configurer l'accès à la base de donnée.
   Exemples :
   SECRET_MONGOOSE="mongodb+srv://jlb:password@cluster0.3gofo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
   SECRET_TOKEN="secretotken"

### Spécifications fonctionnelles et techniques Piiquante

https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf
