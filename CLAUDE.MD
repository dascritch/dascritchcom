## Projet

Page web statique servie sur le site `https://dascritch.com` 

Tu agis en tant qu'intégrateur front-end.

## Architecture

La partie visible du projet est dans le répertoire `public`. Dans le répertoire `version_2025`, tu retrouves l'ancienne version du site, à laquelle tu te réfèreras pour l'implémentation.
Le site peut faire référence à des assets venant d'un serveur `https://dascritch.net`

Les scripts `make.sh` et `parse.py` sont utilisés pour mettre à jour la page statique avant déploiement depuis des informations externes depuis les flux RSS `https://dascritch.net/feed/category/Webdev/rss2` et `https://dascritch.net/feed/tag/self-business/rss2`.

## Style de code

 - Tout code source doit utiliser la tabulation en indentation (en équivalent de 4 espaces)
 - Utilise le snake_case pour les noms de variables, de fonctions, d'éléments de stylage
 - Le code javascript doit être strictement cantonné en dehors du HTML dans un javascript à part, le point d'entrée est `interactions.js`
 - Le code CSS doit être strictement cantonné en dehors du HTML, le point d'entrée est `style.css`
 - Mets en préfixe `[Claude]` de tes commentaires dans le code
 - Le code HTML doit utiliser le plus possible les balises explicites du HTML5, et essayer d'éviter de multiplier les tags
 - Il doit marquer les informations en micro-format, il est important de garder les annotations au format hCard
 - Chaque élément important doit avoir un attribut `id`
 - Réutilise les règles CSS sur l'ensemble de la page, applique la règle DRY
 - Si du code génératif est prévu, il doit être en bash ou en python. Le javascript est réservé pour le front
 - Les dépendances du code source à des éléments externes doivent être minimales
 - Plus le code source est minimal, plus il est élégant

## Aspect graphique
 
L'aspect général est un rendu de plan technique sur fond bleu, avec un fond de quadrillage léger.

 - Le style utilise toujours la police `Titillium` pour les textes principaux. Le texte décoratif peut utiliser la police `IBM Plex Mono`.
 - L'aspect des textes principaux doit toujours être uniforme en taille, couleurs et dimensions entre chaque éléments. 
 - Le site doit avoir un aspect responsive, désigné en `mobile first`.
 - Le site est disponible en mode clair et en mode sombre utilisant les fonctions CSS natives.
 - Les ratios de contrastes, de dimension et de couleurs doivent être vérifiés afin de satisfaire les contraintes de lisibilité d'accessibilité.
 - Ne pas modifier du tout l'élément graphique `#carte`


## Notes importantes

 - Tu ne commites jamais le code git, tu envoies les modifications exclusivement en réponse du prompt, avec les fichiers complets et un `diff`
 - Tu ne modifies jamais les textes, ceux-ci doivent rester absolument verbatim
 - Tu ne modifies jamais les liens, ceux-ci sont très importants
 - Tu ne modifies jamais les images, ni y appliqer un étirement, ni y appliquer un filtre sauf demande expresse dans mon prompt
