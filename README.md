# Tecmoled
# Tableau de Bord Médical en Temps Réel

Ce projet consiste en la création d'un tableau de bord web permettant de visualiser et d'analyser en temps réel les données provenant d'une API Les utilisateurs auront la possibilité d'accéder au tableau de bord via une authentification sécurisée pour consulter les données et effectuer différentes manipulations.

## Fonctionnalités

- Authentification des utilisateurs pour un accès sécurisé.
- Manipulation des données, y compris le filtrage, la recherche et l'analyse des tendances.
- Interface conviviale et intuitive pour une utilisation facile.

## Technologies Utilisées

- Backend : Node.js, Express.js, MySQL
- Frontend : React.js, React-Vis (pour les graphiques)
- Authentification : Firebase Authentication
- Déploiement : Firebase

## Installation et Utilisation

1. Cloner le dépôt GitHub :

2. Installer les dépendances du backend et du frontend :
   cd backend
   npm install
   cd ../frontend
   npm install

3. Configurer les variables d'environnement :

- Renommer le fichier `.env.example` en `.env` dans le dossier backend et frontend.
- Ajouter vos clés d'API Firebase et d'autres configurations nécessaires.

4. Lancer le serveur backend et le serveur de développement frontend :
   cd frontend
   npm start

5. Accéder à l'application dans votre navigateur à l'adresse : `http://localhost:3000`

## Contributeurs

- [Billel KHANFRI](https://github.com/billelkhanfri)

N'hésitez pas à contribuer au projet en ouvrant des issues ou des pull requests pour suggérer des améliorations ou corriger des problèmes.

## Licence

Ce projet est sous licence MIT. Pour plus d'informations, veuillez consulter le fichier [LICENSE](LICENSE).
