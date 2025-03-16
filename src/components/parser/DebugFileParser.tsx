import React, { useState } from "react"
import BBCFoodParser from "./BBCFoodParser";
import BaseParser from "./BaseParser";

function DebugFileParse() {
    const [file, setFile] = useState<File>();
    const [website, setWebsite] = useState("");

    return (
        <div>
            <p><b>Add a html file:</b></p>
            <input type="file" className="mb-3" onChange={e => {
                if (e.target.files) {
                    setFile(e.target.files[0]);
                }
            }}/>
            <p><b>Recipe website:</b></p>
            <fieldset onChange={e => setWebsite((e.target as HTMLInputElement).value)}>
                <div>
                    <input type="radio" name="website" id="bbc-food" value="BBC Food"/>
                    <label htmlFor="bbc-food">BBC Food</label>
                </div>
                <div>
                    <input type="radio" name="website" id="bbc-goodfood" value="BBC Good Food"/>
                    <label htmlFor="bbc-goodfood">BBC Good Food</label>
                </div>
            </fieldset>

            <button className="btn btn-primary mt-4" onClick={() => {
                let parser: BaseParser | undefined;
                if (website === "BBC Food") {
                    parser = new BBCFoodParser();
                }
                if (parser && file) {
                    file?.text().then(htmlText => parser?.parseRecipe(htmlText));
                } else {
                    console.log("file or website not input");
                }
            }}>Parse</button>
        </div>
    )
}

export default DebugFileParse;