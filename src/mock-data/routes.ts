import { LocalizedRoute, RouteProps } from "@types-app/index";

export type MockRoutesType = {
  // Normal routes without parameters
  home: RouteProps;
  about: RouteProps;
  contact: RouteProps;
  services: RouteProps;
  blog: RouteProps;

  // Routes with one parameter
  profile: RouteProps<{ username: string }>;
  post: RouteProps<{ id: string }>;
  category: RouteProps<{ name: string }>;
  product: RouteProps<{ productId: string }>;
  article: RouteProps<{ slug: string }>;

  // Routes with multiple parameters
  userDetails: RouteProps<{ userId: string; detailsKey: string }>;
  productReview: RouteProps<{ productId: string; reviewId: string }>;
  blogPost: RouteProps<{ year: string; month: string; slug: string }>;
  event: RouteProps<{ year: string; month: string; day: string }>;
  bookChapter: RouteProps<{ isbn: string; chapter: string }>;

  // Required catch-all routes
  docs: RouteProps<{ path: ["docs", "guide"] }>;
  gallery: RouteProps<{ images: string[] }>;
  files: RouteProps<{ fileId: string[] }>;

  // Optional catch-all routes
  userFiles: RouteProps<{
    fileId: [
      userKey?: "userId",
      userValue?: string,
      fileCategoryKey?: "fileCategory",
      fileCategoryValue?: "document" | "image" | "video",
      uploadDateKey?: "uploadDate",
      uploadDateValue?: string,
    ];
  }>;
  optionalGallery: RouteProps<{
    images: [
      galleryKey?: "galleryId",
      galleryValue?: string,
      imageTypeKey?: "imageType",
      imageTypeValue?: "portrait" | "landscape" | "panorama",
      artistKey?: "artist",
      artistValue?: string,
      creationYearKey?: "creationYear",
      creationYearValue?: string,
    ];
  }>;
};

export type LocaleLabelType = "cs" | "sk" | "de-AT" | "de-DE" | "en";

export const defaultLocale: "en" = "en";

export const mockRoutes: Record<
  keyof MockRoutesType,
  LocalizedRoute<LocaleLabelType>
> = {
  // Normal routes without parameters
  home: {
    fallback: "/",
    en: "/",
    cs: "/",
    sk: "/",
    "de-AT": "/",
    "de-DE": "/",
  },
  // @ts-ignore
  account: { fallback: "/account", en: "/account" },
  "account/billing-history": {
    fallback: "/account/billing-history",
    en: "/account/billing-history",
  },
  "account/books": { fallback: "/account/books", en: "/account/books" },
  "account/details": { fallback: "/account/details", en: "/account/details" },
  "account/orders": { fallback: "/account/orders", en: "/account/orders" },
  "account/watchdog": {
    fallback: "/account/watchdog",
    en: "/account/watchdog",
  },
  "account/wishlist": {
    fallback: "/account/wishlist",
    en: "/account/wishlist",
  },
  // @ts-ignore
  login: { fallback: "/login", en: "/login" },
  listing: { fallback: "/p/[[...filters]]", en: "/p/[[...filters]]" },
  about: {
    fallback: "/about",
    en: "/about",
    cs: "/o-nas",
    sk: "/o-nas",
    "de-AT": "/ueber-uns",
    "de-DE": "/ueber-uns",
  },
  contact: {
    fallback: "/contact",
    en: "/contact",
    cs: "/kontakt",
    sk: "/kontakt",
    "de-AT": "/kontakt",
    "de-DE": "/kontakt",
  },
  services: {
    fallback: "/services",
    en: "/services",
    cs: "/sluzby",
    sk: "/sluzby",
    "de-AT": "/dienstleistungen",
    "de-DE": "/dienstleistungen",
  },
  blog: {
    fallback: "/blog",
    en: "/blog",
    cs: "/blog",
    sk: "/blog",
    "de-AT": "/blog",
    "de-DE": "/blog",
  },

  // Routes with one parameter
  profile: {
    fallback: "/profile/[username]",
    en: "/profile/[username]",
    cs: "/profil/[username]",
    sk: "/profil/[username]",
    "de-AT": "/profil/[username]",
    "de-DE": "/profil/[username]",
  },
  post: {
    fallback: "/post/[id]",
    en: "/post/[id]",
    cs: "/clanek/[id]",
    sk: "/prispevok/[id]",
    "de-AT": "/beitrag/[id]",
    "de-DE": "/beitrag/[id]",
  },
  category: {
    fallback: "/category/[name]",
    en: "/category/[name]",
    cs: "/kategorie/[name]",
    sk: "/kategoria/[name]",
    "de-AT": "/kategorie/[name]",
    "de-DE": "/kategorie/[name]",
  },
  product: {
    fallback: "/product/[productId]",
    en: "/product/[productId]",
    cs: "/produkt/[productId]",
    sk: "/produkt/[productId]",
    "de-AT": "/produkt/[productId]",
    "de-DE": "/produkt/[productId]",
  },
  article: {
    fallback: "/article/[slug]",
    en: "/article/[slug]",
    cs: "/clanek/[slug]",
    sk: "/prispevok/[slug]",
    "de-AT": "/beitrag/[slug]",
    "de-DE": "/beitrag/[slug]",
  },

  // Routes with multiple parameters
  userDetails: {
    fallback: "/user/[userId]/details/[detailsKey]",
    en: "/user/[userId]/details",
    cs: "/uzivatel/[userId]/detaily",
    sk: "/uzivatel/[userId]/detaily",
    "de-AT": "/benutzer/[userId]/details",
    "de-DE": "/benutzer/[userId]/details",
  },
  productReview: {
    fallback: "/product/[productId]/review/[reviewId]",
    en: "/product/[productId]/review/[reviewId]",
    cs: "/produkt/[productId]/recenze/[reviewId]",
    sk: "/produkt/[productId]/recenzia/[reviewId]",
    "de-AT": "/produkt/[productId]/bewertung/[reviewId]",
    "de-DE": "/produkt/[productId]/bewertung/[reviewId]",
  },
  blogPost: {
    fallback: "/blog/[year]/[month]/[slug]",
    en: "/blog/[year]/[month]/[slug]",
    cs: "/blog/[year]/[month]/[slug]",
    sk: "/blog/[year]/[month]/[slug]",
    "de-AT": "/blog/[year]/[month]/[slug]",
    "de-DE": "/blog/[year]/[month]/[slug]",
  },
  event: {
    fallback: "/event/[year]/[month]/[day]",
    en: "/event/[year]/[month]/[day]",
    cs: "/udalost/[year]/[month]/[day]",
    sk: "/udalost/[year]/[month]/[day]",
    "de-AT": "/veranstaltung/[year]/[month]/[day]",
    "de-DE": "/veranstaltung/[year]/[month]/[day]",
  },
  bookChapter: {
    fallback: "/book/[isbn]/chapter/[chapter]",
    en: "/book/[isbn]/chapter/[chapter]",
    cs: "/kniha/[isbn]/kapitola/[chapter]",
    sk: "/kniha/[isbn]/kapitola/[chapter]",
    "de-AT": "/buch/[isbn]/kapitel/[chapter]",
    "de-DE": "/buch/[isbn]/kapitel/[chapter]",
  },

  // Required catch-all routes
  docs: {
    fallback: "/docs/[...path]",
    en: "/docs/[...path]",
    cs: "/dokumentace/[...path]",
    sk: "/dokumentacia/[...path]",
    "de-AT": "/dokumentation/[...path]",
    "de-DE": "/dokumentation/[...path]",
  },
  gallery: {
    fallback: "/gallery/[...images]",
    en: "/gallery/[...images]",
    cs: "/galerie/[...images]",
    sk: "/galeria/[...images]",
    "de-AT": "/galerie/[...images]",
    "de-DE": "/galerie/[...images]",
  },
  files: {
    fallback: "/files/[...fileId]",
    en: "/files/[...fileId]",
    cs: "/soubory/[...fileId]",
    sk: "/subory/[...fileId]",
    "de-AT": "/dateien/[...fileId]",
    "de-DE": "/dateien/[...fileId]",
  },

  // Optional catch-all routes
  userFiles: {
    fallback: "/userFiles/[[...fileId]]",
    en: "/userFiles/[[...fileId]]",
    cs: "/uzivatelSoubory/[[...fileId]]",
    sk: "/uzivatelSubory/[[...fileId]]",
    "de-AT": "/benutzer/[[...fileId]]",
    "de-DE": "/benutzer/[[...fileId]]",
  },
  optionalGallery: {
    fallback: "/optional-gallery/[[...images]]",
    en: null,
    cs: "/volitelna-galerie/[[...images]]",
    sk: "/volitelna-galeria/[[...images]]",
    "de-AT": "/optionale-galerie/[[...images]]",
    "de-DE": "/optionale-galerie/[[...images]]",
  },
};
