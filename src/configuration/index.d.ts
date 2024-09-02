type ConfigKey = 'backendHost'|'fileServerHost'|'lineClientId'|'lineClientSecret'|'lineRedirectUri'|'googleClientId'|'googleClientSecret'|'googleRedirectUri'|'facebookClientId'|'facebookClientSecret'|'facebookRedirectUri';


export default function Configuration(name: ConfigKey): string;

