// ITAM System Types based on Google Sheets structure

export interface Dashboard {
  antalKomplettaPaket: number;
  golv: number;
  malniva: number;
}

export interface Arende {
  startdatum: string;
  arendetyp: string;
  arendekategori: string;
  utvaldningsomrade: string;
  arendeital: string;
  arendebeskrivning: string;
  redoDag1: string;
  primarRisk: string;
  onboardingUppdaterad: string;
  ansvarig: string;
  anvandare: string;
  status: string;
  kommentar: string;
}

export interface Onboarding {
  arendeId: string;
  person: string;
  paketkodVald: string;
  matchMotStandard: string;
  undantag: string;
  reserveratPaket: string;
  leveransplats: string;
}

export interface Standardpaket {
  paketkod: string;
  paketnamn: string;
  dator: string;
  mobil: string;
  detaljtillbehor: string;
  skarmvadd: string;
  skarm: string;
  stdNiva: string;
  status: string;
  kommentar: string;
}

export interface Bestallning {
  bestallningsId: string;
  paketkod: string;
  antal: number;
  orsak: string;
  bestallningsdatum: string;
  bestalldAv: string;
  leverantor: string;
  leveransplats: string;
  forvantadLeverans: string;
  status: string;
  kommentar: string;
}

export interface PaketILager {
  paketId: string;
  paketkod: string;
  status: string;
  plats: string;
  komplett: string;
  senastKontrollerad: string;
}

export interface Utrustning {
  assetId: string;
  assettyp: string;
  modell: string;
  tillverkare: string;
  plattform: string;
  anvandare: string;
  status: string;
  plats: string;
  tilldelaDat: string;
  livscykel: string;
}

export type SheetName =
  | '0 - Dashboard'
  | '1 - Ärende'
  | '2 - Onboarding'
  | '3 - Standardpaket'
  | '4 - Beställningar'
  | '5 - Paket i Lager'
  | '6 - Utrustning (assets)';
