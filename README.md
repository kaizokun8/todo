# Gestionnaire de taches planifiées Angular + Spring Boot

Ce petit projet a été réalisé dans un cadre de l'apprentissage d'Angular. Il permet de gérer une todolist. Les taches
peuvent être planifiées à une date et heure précise.

## Fonctionnalitées

- C.R.U.D. sur les taches.
- Recherche de taches sur différents critères, (titre, date, statut).

## Architecture

Restfull + Single page application

## Outils utilisés

### Front-End

- Angular 13.1.2
- Ngrx 13.0.2
- PrimeNG 13.0.4
- PrimeFlex 3.1.2
- Material UI 13.1.2
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

- **ui-server/todolist** : le code source du client Angular

### Back End

- **ui-server** : serveur de resource et de distribution du build Angular, le contenu du build Angular (dist) se trouve
  dans le répertoire *src/main/resources/public*
- **client-server** : client oauth2 servant de point d'entrée à l'authentification, peut servir d'API Gateway pour
  accéder aux serveurs de resources.
- **keycloak** : serveur d'authentification et d'autorisations.
- **user-server** : serveur de resource utilisateur, séparé de keycloak.
- **todo-server** : serveur de resource de gestion des taches.

## Demarrage

### Avec Intellij

Acceder à l'onglet **Services** *View/Tool Windows/Services*, l'onglet apparait dans le footer de l'IDE si ce n'est pas déja le cas. Si les services Spring
ne sont pas accessibles, vous pouvez les ajouter en cliquant sur *+ / Run configuration type / Spring Boot*, il vous
faudra ensuite cibler le classes principales de type Application annoté avec @SpringBootApplication. Ou plus simple accéder à ces
classes et executer les directement à l'aide de la flèche verte (clic-droit/run) les applications Spring Boot apparaitront alors dans l'onglet
**Services** si le type de configuration a été choisi au préalable.

Pour lancer l'application Angular vous pouvez le faire en ligne de commande en vous plaçant dans le répertoire 
*ui-server/todolist* et en exécutant la commande **ng serve** dans l'onglet terminal. Ou encore dans le fichier package.json, cliquez sur la flèche verte
située à coté de **"start": "ng serve"** l'application Angular devrait alors également apparaitre dans les services si vous avez ajouté la configuration
(*+ / Run configuration type / npm*).

doc intellij : https://www.jetbrains.com/help/idea/services-tool-window.html#run-configs

### Ordre de lancement et profils

Le Serveur keycloak doit être lancé avant les autres services.

Si vous souhaitez exécuter le client Angular avec Ng serve, utilisez le profil maven **dev-angular-node-js**, dans ce
cas-là le service ui-server n'a pas besoin d'être exécuté. L'application sera accessible à
l'adresse http://localhost:4200.

Si vous souhaitez accéder au client Angular via le service Spring Boot ui-server, lancez le. Il vous faudra également
choisir le profil maven **dev-angular-spring-boot** et relancer le service client-server. L'application sera accessible
à l'adresse http://localhost. Cette application issue d'un build Angular et figée et ne sera pas à jour si vous la modifier,
il vous faudra la reconstruire et déplacer le contenu du build dans le dossier de resources public */src/main/resources/public*.
Si vous souhaitez faire des modifications et visualiser les changements en temps réels utilisez plutôt l'approche **ng serve**

## Auteur

BEHI Monsio Jérémie

