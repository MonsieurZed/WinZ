import NodePowershell from "node-powershell";
const log = require("electron-log");
import {
  CommandNotFoundError,
  NotElevatedError,
  PackageInstallError,
  PackageNotFoundError,
} from "./customError";

const WINGET_URI =
  "https://github.com/microsoft/winget-cli/releases/download/v1.1.12653/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle";

export const commandPromise = (command) => {
  return new Promise(async (resolve, reject) => {
    const ps = new NodePowershell({
      debug: true,
      executableOptions: {
        "-ExecutionPolicy": "Bypass",
        "-NoProfile": true,
      },
    });
    let result = "";
    try {
      ps.addCommand(command);
      result = await ps.invoke();

      console.log("RESULT HAVE BEEN PRODUCE");
    } catch (error) {
      if (/CommandNotFoundException/gi.test(error))
        reject(new CommandNotFoundError(error));
    } finally {
      await ps.dispose();
    }

    if (/No package found/gi.test(result))
      reject(new PackageNotFoundError(result));
    if (/package was not found/gi.test(result))
      reject(PackageNotFoundError(result));
    if (/not running from an elevated/gi.test(result))
      reject(NotElevatedError(result));
    if (/remote server returned an error/gi.test(result))
      reject(PackageInstallError(result));

    resolve(result);
  });
};
