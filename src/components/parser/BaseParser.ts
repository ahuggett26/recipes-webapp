import parse, { Element } from "html-react-parser";
import type { DOMNode } from "html-react-parser";

abstract class BaseParser {
    parseDomNode(domNode: DOMNode): void {
        if (!(domNode.type === "tag")) {
            // console.log("isn't element: ", domNode);
            return;
        }
        console.log("domNode: ", domNode as Element);
        if (this.isIngredient()) {
            return;
        }
    }
    
    parseRecipe(htmltext: string) {
        parse(htmltext, {
            replace: this.parseDomNode
        })
    }

    hasClass(node: object) {
        // return node["attribs"][]
    }

    abstract isIngredient(): boolean;
    // abstract isIngredient(domNode: Element): boolean;
}

export default BaseParser;