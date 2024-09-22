/**
 * Definition to apply to the settings set in firebase
 */
interface SettingsDefinition {
  /** Password lock code */
  code: string;
  /** True if new recipes should be locked behind the password */
  lockNewRecipes: boolean;
}

export default SettingsDefinition;
