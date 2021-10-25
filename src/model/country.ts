export interface Language {
  name: string;
}

export interface Country {
  name: string;
  flag: string;
  population: number;
  region: string;
  languages: Language[];
}
