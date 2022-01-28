# Gestionnaire de taches planifiées Angular + Spring Boot

Ce petit projet a été réalisé dans un cadre de l'apprentissage d'Angular. Il permet de gérer une todolist. Les taches
peuvent être planifiées à une date et heure précise.

Les Apis sécurisées quant à elles utilisent Spring boot, ainsi que Spring Security 5
en combinaison avec un serveur d'authorisation/authentification OpenAPI/Oauth2 Keycloak. 

Cela peut être un bon point de départ si vous souhaitez apprendre à utiliser ces technologies.

## Fonctionnalités

- C.R.U.D. sur les taches.
- Recherche de taches sur différents critères, (titre, date, statut).

## Architecture

RESTful + Single page application

## Outils utilisés

### Front-End

- Angular 13.1.2
- Ngrx 13.0.2
- Material UI 13.1.2
- PrimeNG 13.0.4
- PrimeFlex 3.1.2
- ...

### Back-End

- Spring Boot 2.5.6
- Spring Security 5.5.3
- Spring Boot oauth2 client 2.5.6
- Keycloak (embarqué Spring Boot) 11.0.2
- Hibernate 5.4.32
- H2 1.4 
- ...

## Sources

### Front End

- **ui-server/todolist** : le code source du client Angular.

### Back End

- **ui-server** : serveur de resource et de distribution du build Angular, le contenu du build Angular (dist) se trouve
  dans le répertoire *src/main/resources/public*
- **client-server** : client oauth2 servant de point d'entrée à l'authentification, peut servir d'API Gateway pour
  accéder aux serveurs de resources.
- **keycloak** : serveur d'authentification et d'autorisations.
- **user-server** : serveur de resource utilisateur, séparé de Keycloak.
- **todo-server** : serveur de resource pour la gestion des taches.

## Demarrage

### Avec Intellij

Acceder à l'onglet **Services** *View/Tool Windows/Services*, l'onglet apparait dans le footer de l'IDE si ce n'est pas déja le cas. Si les services Spring
ne sont pas accessibles, vous pouvez les ajouter en cliquant sur *+ / Run configuration type / Spring Boot*, il vous
faudra ensuite cibler le classes principales de type Application annoté avec @SpringBootApplication. Ou plus simple accéder à ces
classes et executer les directement à l'aide de la flèche verte (clic-droit/run) les applications Spring Boot apparaitront alors dans l'onglet
**Services** si le type de configuration a été choisi au préalable.

Pour lancer l'application Angular vous pouvez le faire en ligne de commande en vous plaçant dans le répertoire 
*ui-server/todolist* et en exécutant la commande **ng serve** dans l'onglet **terminal**. Ou encore dans le fichier package.json, cliquez sur la flèche verte
située à coté de **"start": "ng serve"** l'application Angular devrait alors également apparaitre dans les services si vous avez ajouté la configuration
(*+ / Run configuration type / npm*).

Doc intellij sur les services : https://www.jetbrains.com/help/idea/services-tool-window.html#run-configs.

### Ordre de lancement

Le Serveur keycloak doit être lancé avant les autres services.
L'ordre n'a pas d'importance pour les autres services.

### UI

Si vous souhaitez exécuter le client Angular avec **ng serve**, l'application sera accessible à l'adresse http://localhost:4200
Si vous souhaitez faire des modifications et visualiser les changements en temps réels optez pour cette approche.

Si vous souhaitez accéder au client Angular via le service Spring Boot **ui-server**, il vous suffit de démarrer l'application. 
L'application sera accessible à l'adresse *http://localhost*. Cette application issue d'un build Angular est figée et ne se mettra pas à jour en temps
réel comme c'est le cas avec ng serve. Il vous faudra la reconstruire avec **ng build --configuration=dev-spring** (contexte configuration=dev-spring actif)
et déplacer le contenu du build dans le dossier de resources public */src/main/resources/public*.
Le plus simple et de copier le dossier généré dans *dist* (*todolist*) dans *resources* et de renommer en *public*.
Des moyens automatisés avec Maven existent également pour réaliser cette étape lors du build.

## Auteur

BEHI Monsio Jérémie

