"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRoutes = exports.defaultLocale = void 0;
exports.defaultLocale = "en";
exports.mockRoutes = {
    // Normal routes without parameters
    home: {
        fallback: "/",
        en: { pathname: "/" },
        cs: { pathname: "/" },
        sk: { pathname: "/" },
        "de-AT": { pathname: "/" },
        "de-DE": { pathname: "/" },
    },
    // @ts-ignore
    account: { fallback: "/account", en: { pathname: "/account" } },
    "account/billing-history": {
        fallback: "/account/billing-history",
        en: { pathname: "/account/billing-history" },
    },
    "account/books": {
        fallback: "/account/books",
        en: { pathname: "/account/books" },
    },
    "account/details": {
        fallback: "/account/details",
        en: { pathname: "/account/details" },
    },
    "account/orders": {
        fallback: "/account/orders",
        en: { pathname: "/account/orders" },
    },
    "account/watchdog": {
        fallback: "/account/watchdog",
        en: { pathname: "/account/watchdog" },
    },
    "account/wishlist": {
        fallback: "/account/wishlist",
        en: { pathname: "/account/wishlist" },
    },
    login: { fallback: "/login", en: { pathname: "/login" } },
    listing: {
        fallback: "/p/[[...filters]]",
        en: { pathname: "/p/[[...filters]]" },
    },
    about: {
        fallback: "/about",
        en: { pathname: "/about" },
        cs: { pathname: "/o-nas" },
        sk: { pathname: "/o-nas" },
        "de-AT": { pathname: "/ueber-uns" },
        "de-DE": { pathname: "/ueber-uns" },
    },
    contact: {
        fallback: "/contact",
        en: { pathname: "/contact" },
        cs: { pathname: "/kontakt" },
        sk: { pathname: "/kontakt" },
        "de-AT": { pathname: "/kontakt" },
        "de-DE": { pathname: "/kontakt" },
    },
    services: {
        fallback: "/services",
        en: { pathname: "/services" },
        cs: { pathname: "/sluzby" },
        sk: { pathname: "/sluzby" },
        "de-AT": { pathname: "/dienstleistungen" },
        "de-DE": { pathname: "/dienstleistungen" },
    },
    blog: {
        fallback: "/blog",
        en: { pathname: "/blog" },
        cs: { pathname: "/blog" },
        sk: { pathname: "/blog" },
        "de-AT": { pathname: "/blog" },
        "de-DE": { pathname: "/blog" },
    },
    // Routes with one parameter
    profile: {
        fallback: "/profile/[username]",
        en: { pathname: "/profile/[username]" },
        cs: { pathname: "/profil/[username]" },
        sk: { pathname: "/profil/[username]" },
        "de-AT": { pathname: "/profil/[username]" },
        "de-DE": { pathname: "/profil/[username]" },
    },
    post: {
        fallback: "/post/[id]",
        en: { pathname: "/post/[id]" },
        cs: { pathname: "/clanek/[id]" },
        sk: { pathname: "/prispevok/[id]" },
        "de-AT": { pathname: "/beitrag/[id]" },
        "de-DE": { pathname: "/beitrag/[id]" },
    },
    category: {
        fallback: "/category/[name]",
        en: { pathname: "/category/[name]" },
        cs: { pathname: "/kategorie/[name]" },
        sk: { pathname: "/kategoria/[name]" },
        "de-AT": { pathname: "/kategorie/[name]" },
        "de-DE": { pathname: "/kategorie/[name]" },
    },
    product: {
        fallback: "/product/[productId]",
        en: { pathname: "/product/[productId]" },
        cs: { pathname: "/produkt/[productId]" },
        sk: { pathname: "/produkt/[productId]" },
        "de-AT": { pathname: "/produkt/[productId]" },
        "de-DE": { pathname: "/produkt/[productId]" },
    },
    article: {
        fallback: "/article/[slug]",
        en: { pathname: "/article/[slug]" },
        cs: { pathname: "/clanek/[slug]" },
        sk: { pathname: "/prispevok/[slug]" },
        "de-AT": { pathname: "/beitrag/[slug]" },
        "de-DE": { pathname: "/beitrag/[slug]" },
    },
    // Routes with multiple parameters
    userDetails: {
        fallback: "/user/[userId]/details/[detailsKey]",
        en: { pathname: "/user/[userId]/details/[detailsKey]" },
        cs: { pathname: "/uzivatel/[userId]/detaily/[detailsKey]" },
        sk: { pathname: "/uzivatel/[userId]/detaily/[detailsKey]" },
        "de-AT": { pathname: "/benutzer/[userId]/details/[detailsKey]" },
        "de-DE": { pathname: "/benutzer/[userId]/details/[detailsKey]" },
    },
    productReview: {
        fallback: "/product/[productId]/review/[reviewId]",
        en: { pathname: "/product/[productId]/review/[reviewId]" },
        cs: { pathname: "/produkt/[productId]/recenze/[reviewId]" },
        sk: { pathname: "/produkt/[productId]/recenzia/[reviewId]" },
        "de-AT": { pathname: "/produkt/[productId]/bewertung/[reviewId]" },
        "de-DE": { pathname: "/produkt/[productId]/bewertung/[reviewId]" },
    },
    blogPost: {
        fallback: "/blog/[year]/[month]/[slug]",
        en: { pathname: "/blog/[year]/[month]/[slug]" },
        cs: { pathname: "/blog/[year]/[month]/[slug]" },
        sk: { pathname: "/blog/[year]/[month]/[slug]" },
        "de-AT": { pathname: "/blog/[year]/[month]/[slug]" },
        "de-DE": { pathname: "/blog/[year]/[month]/[slug]" },
    },
    event: {
        fallback: "/event/[year]/[month]/[day]",
        en: { pathname: "/event/[year]/[month]/[day]" },
        cs: { pathname: "/udalost/[year]/[month]/[day]" },
        sk: { pathname: "/udalost/[year]/[month]/[day]" },
        "de-AT": { pathname: "/veranstaltung/[year]/[month]/[day]" },
        "de-DE": { pathname: "/veranstaltung/[year]/[month]/[day]" },
    },
    bookChapter: {
        fallback: "/book/[isbn]/chapter/[chapter]",
        en: { pathname: "/book/[isbn]/chapter/[chapter]" },
        cs: { pathname: "/kniha/[isbn]/kapitola/[chapter]" },
        sk: { pathname: "/kniha/[isbn]/kapitola/[chapter]" },
        "de-AT": { pathname: "/buch/[isbn]/kapitel/[chapter]" },
        "de-DE": { pathname: "/buch/[isbn]/kapitel/[chapter]" },
    },
    // Required catch-all routes
    docs: {
        fallback: "/docs/[...path]",
        en: { pathname: "/docs/[...path]" },
        cs: { pathname: "/dokumentace/[...path]" },
        sk: { pathname: "/dokumentacia/[...path]" },
        "de-AT": { pathname: "/dokumentation/[...path]" },
        "de-DE": { pathname: "/dokumentation/[...path]" },
    },
    gallery: {
        fallback: "/gallery/[...images]",
        en: { pathname: "/gallery/[...images]" },
        cs: { pathname: "/galerie/[...images]" },
        sk: { pathname: "/galeria/[...images]" },
        "de-AT": { pathname: "/galerie/[...images]" },
        "de-DE": { pathname: "/galerie/[...images]" },
    },
    files: {
        fallback: "/files/[...fileId]",
        en: { pathname: "/files/[...fileId]" },
        cs: { pathname: "/soubory/[...fileId]" },
        sk: { pathname: "/subory/[...fileId]" },
        "de-AT": { pathname: "/dateien/[...fileId]" },
        "de-DE": { pathname: "/dateien/[...fileId]" },
    },
    // Optional catch-all routes
    userFiles: {
        fallback: "/userFiles/[[...fileId]]",
        en: { pathname: "/userFiles/[[...fileId]]" },
        cs: { pathname: "/uzivatelSoubory/[[...fileId]]" },
        sk: { pathname: "/uzivatelSubory/[[...fileId]]" },
        "de-AT": { pathname: "/benutzerDateien/[[...fileId]]" },
        "de-DE": { pathname: "/benutzerDateien/[[...fileId]]" },
    },
    optionalGallery: {
        fallback: "/optional-gallery/[[...images]]",
        // For languages with no entry, it's omitted or can be set to a sensible default or null
        cs: { pathname: "/volitelna-galerie/[[...images]]" },
        sk: { pathname: "/volitelna-galeria/[[...images]]" },
        "de-AT": { pathname: "/optionale-galerie/[[...images]]" },
        "de-DE": { pathname: "/optionale-galerie/[[...images]]" },
    },
};
