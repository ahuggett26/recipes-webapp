import { Element } from "html-react-parser";
import BaseParser from "./BaseParser";

class BBCFoodParser extends BaseParser {
    override isIngredient(): boolean {
        return false;
    }
    
    // override isIngredient(node: Element): boolean {
    //     console.log("searching node: ", node);
    //     if (node.attribs.class.includes("recipe-ingredients__list-item")) {
    //         // const ingredient = node.;
    //         console.log("found node:", node);
    //         return true;
    //     } else {
    //         console.log(node.attribs.class);
    //     }
    //     return false;
    // }

}

export default BBCFoodParser;