/**
 * Allowlist of academic email domains accepted by the application form.
 *
 * Two layers:
 *   1. ALLOWED_DOMAIN_SUFFIXES — broad country-pattern suffixes
 *      (e.g. ".edu", ".ac.uk", ".edu.cn"). These match any subdomain.
 *   2. ALLOWED_INSTITUTION_DOMAINS — specific institutions in countries
 *      that don't use a dedicated academic SLD (e.g. ETH Zurich uses
 *      "ethz.ch"; German universities use "uni-*.de" or "*.de").
 *
 * For one-off exceptions, prefer the ALLOWED_OVERRIDE_EMAILS env var rather
 * than adding individual addresses here.
 */

/**
 * Suffixes matched via `endsWith`. The leading dot is intentional: it
 * prevents an attacker-controlled domain like `phish-edu.com` from
 * matching a suffix of `.edu`.
 */
export const ALLOWED_DOMAIN_SUFFIXES: readonly string[] = [
  // North America
  ".edu",
  ".ca",

  // Pan-European academic SLD
  ".edu.eu",

  // .edu.<cc> — country-specific academic second-level domains
  // (broad coverage; many countries use this pattern instead of .edu)
  ".edu.au", // Australia
  ".edu.bd", // Bangladesh
  ".edu.bh", // Bahrain
  ".edu.bo", // Bolivia
  ".edu.br", // Brazil
  ".edu.cn", // China
  ".edu.co", // Colombia
  ".edu.cu", // Cuba
  ".edu.do", // Dominican Republic
  ".edu.ec", // Ecuador
  ".edu.eg", // Egypt
  ".edu.gh", // Ghana
  ".edu.gt", // Guatemala
  ".edu.hk", // Hong Kong
  ".edu.in", // India
  ".edu.iq", // Iraq
  ".edu.jo", // Jordan
  ".edu.ke", // Kenya
  ".edu.kh", // Cambodia
  ".edu.kw", // Kuwait
  ".edu.lb", // Lebanon
  ".edu.lk", // Sri Lanka
  ".edu.mm", // Myanmar
  ".edu.mn", // Mongolia
  ".edu.mx", // Mexico
  ".edu.my", // Malaysia
  ".edu.ng", // Nigeria
  ".edu.np", // Nepal
  ".edu.om", // Oman
  ".edu.pa", // Panama
  ".edu.pe", // Peru
  ".edu.ph", // Philippines
  ".edu.pk", // Pakistan
  ".edu.pl", // Poland (some)
  ".edu.ps", // Palestine
  ".edu.py", // Paraguay
  ".edu.qa", // Qatar
  ".edu.sa", // Saudi Arabia
  ".edu.sg", // Singapore
  ".edu.sv", // El Salvador
  ".edu.sy", // Syria
  ".edu.tn", // Tunisia
  ".edu.tr", // Turkey
  ".edu.tw", // Taiwan
  ".edu.ua", // Ukraine
  ".edu.ve", // Venezuela
  ".edu.vn", // Vietnam
  ".edu.ye", // Yemen
  ".edu.za", // South Africa (alt)

  // .ac.<cc> — alternative academic second-level domains
  ".ac.ae", // UAE (alt)
  ".ac.at", // Austria
  ".ac.bd", // Bangladesh (alt)
  ".ac.be", // Belgium (some)
  ".ac.bw", // Botswana
  ".ac.cn", // China (alt)
  ".ac.cr", // Costa Rica
  ".ac.cy", // Cyprus
  ".ac.fj", // Fiji
  ".ac.id", // Indonesia
  ".ac.il", // Israel
  ".ac.in", // India
  ".ac.ir", // Iran
  ".ac.jp", // Japan
  ".ac.ke", // Kenya
  ".ac.kp", // North Korea
  ".ac.kr", // South Korea
  ".ac.lk", // Sri Lanka (alt)
  ".ac.lu", // Luxembourg
  ".ac.ma", // Morocco
  ".ac.mu", // Mauritius
  ".ac.np", // Nepal (alt)
  ".ac.nz", // New Zealand
  ".ac.pg", // Papua New Guinea
  ".ac.rs", // Serbia
  ".ac.ru", // Russia
  ".ac.rw", // Rwanda
  ".ac.ss", // South Sudan
  ".ac.th", // Thailand
  ".ac.tz", // Tanzania
  ".ac.ug", // Uganda
  ".ac.uk", // United Kingdom
  ".ac.uz", // Uzbekistan
  ".ac.za", // South Africa
  ".ac.zm", // Zambia
  ".ac.zw", // Zimbabwe
];

/**
 * Specific institutions that use a bare ccTLD without a dedicated
 * academic SLD. Match the exact domain or any subdomain.
 *
 * This is necessarily incomplete — many smaller European institutions
 * (especially in DE, FR, IT, ES, NL) don't follow a pattern. Use the
 * ALLOWED_OVERRIDE_EMAILS env var for individual exceptions.
 */
export const ALLOWED_INSTITUTION_DOMAINS: readonly string[] = [
  // Switzerland
  "ethz.ch",
  "epfl.ch",
  "uzh.ch",
  "unibe.ch",
  "unil.ch",
  "unibas.ch",
  "unige.ch",
  "usi.ch",
  "unisg.ch",
  "zhaw.ch",

  // Germany
  "tum.de",
  "lmu.de",
  "rwth-aachen.de",
  "uni-heidelberg.de",
  "uni-bonn.de",
  "uni-koeln.de",
  "uni-frankfurt.de",
  "uni-stuttgart.de",
  "uni-freiburg.de",
  "uni-tuebingen.de",
  "uni-leipzig.de",
  "uni-mannheim.de",
  "uni-goettingen.de",
  "uni-hamburg.de",
  "uni-muenster.de",
  "uni-mainz.de",
  "uni-jena.de",
  "uni-konstanz.de",
  "uni-potsdam.de",
  "uni-bremen.de",
  "uni-erlangen.de",
  "fu-berlin.de",
  "hu-berlin.de",
  "tu-berlin.de",
  "tu-darmstadt.de",
  "tu-dresden.de",
  "tu-muenchen.de",
  "kit.edu",

  // France
  "sciencespo.fr",
  "ens.fr",
  "ens-lyon.fr",
  "ens-paris-saclay.fr",
  "sorbonne-universite.fr",
  "u-bordeaux.fr",
  "univ-lyon1.fr",
  "univ-grenoble-alpes.fr",
  "univ-paris1.fr",
  "univ-paris3.fr",
  "u-paris.fr",
  "psl.eu",
  "hec.fr",

  // Sweden
  "ki.se",
  "lu.se",
  "kth.se",
  "su.se",
  "uu.se",
  "chalmers.se",
  "gu.se",
  "umu.se",
  "liu.se",

  // Norway
  "uio.no",
  "ntnu.no",
  "uib.no",
  "uit.no",
  "nmbu.no",

  // Finland
  "helsinki.fi",
  "aalto.fi",
  "tuni.fi",
  "oulu.fi",
  "abo.fi",
  "jyu.fi",
  "utu.fi",

  // Denmark
  "ku.dk",
  "dtu.dk",
  "au.dk",
  "sdu.dk",
  "cbs.dk",
  "ruc.dk",
  "aau.dk",

  // Netherlands
  "uva.nl",
  "tudelft.nl",
  "leidenuniv.nl",
  "vu.nl",
  "uu.nl",
  "ru.nl",
  "wur.nl",
  "tue.nl",
  "utwente.nl",
  "rug.nl",
  "eur.nl",
  "maastrichtuniversity.nl",

  // Italy
  "polimi.it",
  "polito.it",
  "unimi.it",
  "unibo.it",
  "uniroma1.it",
  "uniroma2.it",
  "unipi.it",
  "unipd.it",
  "unitn.it",
  "unito.it",
  "unifi.it",
  "unina.it",
  "uniba.it",
  "unica.it",
  "unipv.it",

  // Spain
  "uam.es",
  "uc3m.es",
  "ucm.es",
  "upm.es",
  "upv.es",
  "uv.es",
  "us.es",
  "uniovi.es",
  "uma.es",
  "unizar.es",

  // Portugal
  "tecnico.ulisboa.pt",
  "ulisboa.pt",
  "uminho.pt",
  "fc.ul.pt",
  "up.pt",
  "uc.pt",
  "uaveiro.pt",

  // Belgium
  "kuleuven.be",
  "ulb.be",
  "uclouvain.be",
  "ugent.be",
  "uantwerpen.be",
  "vub.be",
  "uliege.be",

  // Iceland
  "hi.is",
  "ru.is",

  // Ireland
  "tcd.ie",
  "ucd.ie",
  "nuigalway.ie",
  "ucc.ie",
  "dcu.ie",
  "mu.ie",
  "ul.ie",

  // Russia (some research institutions use bare .ru)
  "msu.ru",
  "spbu.ru",
  "hse.ru",
];

/**
 * Returns true if the given email domain is recognized as an academic
 * institution under either the suffix list or specific-institution list.
 *
 * Performs case-insensitive matching but expects the caller to pass a
 * lowercased domain for consistency.
 */
export function isAllowedUniversityDomain(domain?: string | null): boolean {
  if (typeof domain !== "string" || domain.length === 0) return false;

  const normalized = domain.toLowerCase();

  if (ALLOWED_DOMAIN_SUFFIXES.some((suffix) => normalized.endsWith(suffix))) {
    return true;
  }

  if (
    ALLOWED_INSTITUTION_DOMAINS.some(
      (d) => normalized === d || normalized.endsWith("." + d)
    )
  ) {
    return true;
  }

  return false;
}
