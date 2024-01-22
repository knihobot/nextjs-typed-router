"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRoutes = exports.defaultLocale = void 0;
exports.defaultLocale = "en";
exports.mockRoutes = {
    // Normal routes without parameters
    home: { en: "/", cs: "/", sk: "/", "de-AT": "/", "de-DE": "/" },
    // @ts-ignore
    login: { en: "/login" },
    about: {
        en: "/about",
        cs: "/o-nas",
        sk: "/o-nas",
        "de-AT": "/ueber-uns",
        "de-DE": "/ueber-uns",
    },
    contact: {
        en: "/contact",
        cs: "/kontakt",
        sk: "/kontakt",
        "de-AT": "/kontakt",
        "de-DE": "/kontakt",
    },
    services: {
        en: "/services",
        cs: "/sluzby",
        sk: "/sluzby",
        "de-AT": "/dienstleistungen",
        "de-DE": "/dienstleistungen",
    },
    blog: {
        en: "/blog",
        cs: "/blog",
        sk: "/blog",
        "de-AT": "/blog",
        "de-DE": "/blog",
    },
    // Routes with one parameter
    profile: {
        en: "/profile/[username]",
        cs: "/profil/[username]",
        sk: "/profil/[username]",
        "de-AT": "/profil/[username]",
        "de-DE": "/profil/[username]",
    },
    post: {
        en: "/post/[id]",
        cs: "/clanek/[id]",
        sk: "/prispevok/[id]",
        "de-AT": "/beitrag/[id]",
        "de-DE": "/beitrag/[id]",
    },
    category: {
        en: "/category/[name]",
        cs: "/kategorie/[name]",
        sk: "/kategoria/[name]",
        "de-AT": "/kategorie/[name]",
        "de-DE": "/kategorie/[name]",
    },
    product: {
        en: "/product/[productId]",
        cs: "/produkt/[productId]",
        sk: "/produkt/[productId]",
        "de-AT": "/produkt/[productId]",
        "de-DE": "/produkt/[productId]",
    },
    article: {
        en: "/article/[slug]",
        cs: "/clanek/[slug]",
        sk: "/prispevok/[slug]",
        "de-AT": "/beitrag/[slug]",
        "de-DE": "/beitrag/[slug]",
    },
    // Routes with multiple parameters
    userDetails: {
        en: "/user/[userId]/details",
        cs: "/uzivatel/[userId]/detaily",
        sk: "/uzivatel/[userId]/detaily",
        "de-AT": "/benutzer/[userId]/details",
        "de-DE": "/benutzer/[userId]/details",
    },
    productReview: {
        en: "/product/[productId]/review/[reviewId]",
        cs: "/produkt/[productId]/recenze/[reviewId]",
        sk: "/produkt/[productId]/recenzia/[reviewId]",
        "de-AT": "/produkt/[productId]/bewertung/[reviewId]",
        "de-DE": "/produkt/[productId]/bewertung/[reviewId]",
    },
    blogPost: {
        en: "/blog/[year]/[month]/[slug]",
        cs: "/blog/[year]/[month]/[slug]",
        sk: "/blog/[year]/[month]/[slug]",
        "de-AT": "/blog/[year]/[month]/[slug]",
        "de-DE": "/blog/[year]/[month]/[slug]",
    },
    event: {
        en: "/event/[year]/[month]/[day]",
        cs: "/udalost/[year]/[month]/[day]",
        sk: "/udalost/[year]/[month]/[day]",
        "de-AT": "/veranstaltung/[year]/[month]/[day]",
        "de-DE": "/veranstaltung/[year]/[month]/[day]",
    },
    bookChapter: {
        en: "/book/[isbn]/chapter/[chapter]",
        cs: "/kniha/[isbn]/kapitola/[chapter]",
        sk: "/kniha/[isbn]/kapitola/[chapter]",
        "de-AT": "/buch/[isbn]/kapitel/[chapter]",
        "de-DE": "/buch/[isbn]/kapitel/[chapter]",
    },
    // Required catch-all routes
    docs: {
        en: "/docs/[...path]",
        cs: "/dokumentace/[...path]",
        sk: "/dokumentacia/[...path]",
        "de-AT": "/dokumentation/[...path]",
        "de-DE": "/dokumentation/[...path]",
    },
    gallery: {
        en: "/gallery/[...images]",
        cs: "/galerie/[...images]",
        sk: "/galeria/[...images]",
        "de-AT": "/galerie/[...images]",
        "de-DE": "/galerie/[...images]",
    },
    files: {
        en: "/files/[...fileId]",
        cs: "/soubory/[...fileId]",
        sk: "/subory/[...fileId]",
        "de-AT": "/dateien/[...fileId]",
        "de-DE": "/dateien/[...fileId]",
    },
    // Optional catch-all routes
    userFiles: {
        en: "/userFiles/[[...fileId]]",
        cs: "/uzivatelSoubory/[[...fileId]]",
        sk: "/uzivatelSubory/[[...fileId]]",
        "de-AT": "/benutzer/[[...fileId]]",
        "de-DE": "/benutzer/[[...fileId]]",
    },
    optionalGallery: {
        en: "/optional-gallery/[[...images]]",
        cs: "/volitelna-galerie/[[...images]]",
        sk: "/volitelna-galeria/[[...images]]",
        "de-AT": "/optionale-galerie/[[...images]]",
        "de-DE": "/optionale-galerie/[[...images]]",
    },
};
