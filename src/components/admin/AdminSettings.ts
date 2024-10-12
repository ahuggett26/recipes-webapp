import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import FirebaseService from "../../service/FirebaseService";
import { sha256 } from "js-sha256";

/**
 * Class for fetching and deciphering admin settings from firebase config
 */
class AdminSettings {
  /** Firebase service to fetch and set settings from */
  firebaseService: FirebaseService;
  /** The current set admin settings document */
  adminDoc: Promise<QueryDocumentSnapshot<DocumentData, DocumentData>>;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
    this.adminDoc = firebaseService.fetchAdminDoc();
  }

  /**
   * @returns true if an admin password code is set & enabled
   */
  public async isAdminCodeEnabled() {
    const fetchedDoc = await this.adminDoc;
    return fetchedDoc !== undefined && fetchedDoc.get("code") !== undefined && fetchedDoc.get("code") !== "";
  }

  /**
   * @param code Password code to compare to the set admin password code
   * @returns true if the inputted password matches the admin password
   */
  public async isAdminCodeCorrect(code: string) {
    return sha256(code) === (await this.adminDoc).get("code");
  }

  /**
   * @returns true if applying a new recipe is locked behind the admin password
   */
  public async isNewRecipesLocked() {
    const fetchedDoc = await this.adminDoc;
    return fetchedDoc !== undefined && fetchedDoc.get("lockNewRecipes") !== undefined;
  }

  /**
   * Saves the given settings into the firebase database
   *
   * @param code The new password code
   * @param lockNewRecipes the new {@link isNewRecipesLocked} setting
   */
  public async applySettings(code: string, lockNewRecipes: boolean) {
    this.firebaseService.saveAdminSettings({
      code: code === "" ? "" : sha256(code),
      lockNewRecipes,
    });
  }
}

export default AdminSettings;
