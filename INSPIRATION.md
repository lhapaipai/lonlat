The best rollup config for typescript libraries
https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226

distinction HTMLProps HTMLAttributes AllHTMLAttributes, etc
https://stackoverflow.com/questions/64867112/difference-between-react-htmlpropshtmldivelement-and-react-detailedhtmlpropsr

tuto django react
https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react

react avec mapbox
https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

appli open-source react
excalidraw

exemple de thème
https://themeselection.com/item/sneat-bootstrap-html-admin-template/


badge style
https://img.shields.io/npm/v/classnames.svg?style=for-the-badge&labelColor=0869B8

exemple avec react-router
https://github.com/tienduy-nguyen/react-typescript-example

React Router tuto
https://reactrouter.com/en/main/start/tutorial#global-pending-ui

Hooks basic implementation
https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e


brevo partenaires déroulant
https://www.brevo.com/fr/


Frameworks basés sur React (Next, Remix, ...)
https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks


Beaucoup d'exemples dans cette section que je n'ai pas testés
https://react.dev/learn/you-might-not-need-an-effect
Intéressant de se rendre dans la sectio Recap et de faire les exemples

revoir les exemples de useDeferredValue après avoir vu Suspense.

Les valeurs globales ou modifiables peuvent-elles être des dépendances pour useEffect
https://react.dev/learn/lifecycle-of-reactive-effects> Les valeurs modifiables (y compris les variables globales) ne sont pas réactives.
  Une valeur modifiable comme location.pathname ne peut pas être une dépendance. Il est modifiable, il peut donc changer à tout moment complètement en dehors du flux de données de rendu React. Le changer ne déclencherait pas un nouveau rendu de votre composant. Par conséquent, même si vous l'avez spécifié dans les dépendances, React ne saurait pas resynchroniser l'effet lorsqu'il change. Cela enfreint également les règles de React car la lecture de données modifiables pendant le rendu (c'est-à-dire lorsque vous calculez les dépendances) brise la pureté du rendu. Au lieu de cela, vous devez lire et vous abonner à une valeur mutable externe avec useSyncExternalStore.

Il peut y avoir des warning eslint sur des dépendances de useEffect que l'on ne souhaite pas
https://react.dev/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events
```ts
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
    // 🔴 Avoid suppressing the linter like this:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  // ...
}


```
Une fois que useEffectEvent est devenu une partie stable de React, nous vous recommandons de ne jamais supprimer le linter.


Au revoir Mongo db article de developpez
« Au revoir MongoDB » : le témoignage d'un développeur qui a changé MongoDB pour PostgreSQL
https://mongodb.developpez.com/actu/346157/-Au-revoir-MongoDB-le-temoignage-d-un-developpeur-qui-a-change-MongoDB-pour-PostgreSQL-il-revele-aussi-les-inconvenients-et-les-limites-du-SGBD-NoSQL/

Vitest : Mocking modules
https://vitest.dev/guide/mocking.html#modules
