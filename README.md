# Lecteur de synthèse vocale

Ce projet est un script JavaScript qui utilise l'API SpeechSynthesis pour lire le contenu d'un document HTML. Il ajoute un événement "click" aux boutons qui ont la classe "btn-speech", lorsque l'utilisateur clique sur l'un de ces boutons, il lit le contenu de la balise parente de ce bouton avec la synthèse vocale. Il remplace également certains mots pour améliorer la prononciation. Il vérifie également si le navigateur prend en charge cette API avant d'exécuter le script.

## Prérequis

- Un navigateur compatible avec l'API SpeechSynthesis.
- Un projet HTML qui utilise ces boutons avec la classe "btn-speech".

## Utilisation

1. Ajoutez le script à votre fichier HTML.
2. Assurez-vous que tous les boutons que vous souhaitez utiliser pour déclencher la lecture ont la classe "btn-speech".
3. Personnalisez la liste de mots à remplacer pour améliorer la prononciation.
4. Utilisez l'API SpeechSynthesis pour lire le contenu en cliquant sur les boutons avec la classe "btn-speech".

Exemple d'implémentation : https://cv.jprudence.com

## Note

Il est important de noter que certains mots peuvent être mal prononcés par la synthèse vocale, il est donc recommandé de les remplacer par des mots qui sonnent mieux. Cependant, cela peut varier en fonction des appareils et des navigateurs utilisés.
