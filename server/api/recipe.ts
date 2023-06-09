import {eventHandler, readBody, sendError} from "h3";
import {readFile, writeFile} from "fs/promises";
import {authError} from "~/apiMessage/apiMessage";
import {getToken} from "#auth";
import Recipe from "~/classes/Recipe";

export default eventHandler(async (event ): Promise<any> => {
    const token = await getToken({event})
    if (!token) {
        sendError(event, authError());
        return;
    }

    const allRecipes: RecipeModel[] = JSON.parse(await readFile("./storage/recipes.json", "utf8"));

    const newRecipe = new Recipe(await readBody(event))

    allRecipes.push(newRecipe.ToModel())

   await writeFile("./storage/recipes.json",JSON.stringify(allRecipes),"utf8")

    return "Ajouté avec succès"
});