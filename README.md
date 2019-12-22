# Mongoose Recipes

Para tener algo de información en la base de datos, tendrás que importar el json `./recipes.json` en una colección llamada **recipes**.

### Iteración 1 - Recipe Schema

Crea un modelo de receta en la ruta `/models/Recipe.js`. El esquema debe corresponderse con el siguiente.

-   **title**. Type `String`. Debe ser obligatorio y único.
-   **level**. Type `String`. Solo puede contener los siguientes valores: _Easy Peasy_ - _Amateur Chef_ - _UltraPro Chef_ (Recuerda el ENUM)
-   **ingredients**. Type `Array`.
-   **cuisine**. Type `String`. Es obligatorio.
-   **dishType**. Type `String`. Valores posibles: _Breakfast_ - _Dish_ - _Snack_ - _Drink_ - _Dessert_ - _Other_.
-   **image**. Type `String`. Valor por defecto: _https://images.media-allrecipes.com/images/75131.jpg_.
-   **duration**. Type `Number`. debe de tener un valor mínimo de 0
-   **creator**. Type `String`.
-   **created**. Type `Date`. Por defecto será la fecha actual.
-   **state**. Type `Boolean`, por defecto a true.

**BONUS** Controla los posibles errores dentro del esquema y añade mensajes para el cliente

**To run your code, remember you should use `$ node index.js`.**

### Iteración 2. Inserta el json de recetas.

Mete el contenido del archivo `recipes.js` en la base de datos. Puedes utilizar el método [`Model.insertMany`](https://mongoosejs.com/docs/api.html#model_Model.insertMany).

### Iteración 3 - get recipes

Ahora que tenemos contenido en nuestra base de datos, podemos comenzar a recoger documentos. Crea un endpoint que devuelva todas las recetas de la base de datos. Ponle un limite de 5 recetas por petición.

### Iteración 4 - create recipe

Crea un endpoint que permita crear nuevas recetas que se ajusten al esquema creado.

### Iteración 5 - update recipe

Las recetas exigen una revisión de vez en cuando. Por ejemplo, en el caso de la receta de **Rigatoni alla Genovese**, la duración es excesiva.

Crea un endpoint que permitir modificarlas. El endpoint deberá actualizarse y devolver el nuevo documento creado (no el viejo)

Deberá recoger la id por parámetros y el contenido de la actualización por el body

**BONUS2** Si has creado validaciones, habilita la opción para que las validaciones se apliquen en el update.

### Iteration 5 - Remove a recipe

Crea un endpoint que permite eliminar las recetas por id.
