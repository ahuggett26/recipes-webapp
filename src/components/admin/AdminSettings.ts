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
