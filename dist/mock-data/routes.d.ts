import { LocalizedRoute, RouteProps } from "@types-app/index";
export type MockRoutesType = {
    home: RouteProps;
    about: RouteProps;
    contact: RouteProps;
    services: RouteProps;
    blog: RouteProps;
    "no-fallback": RouteProps;
    profile: RouteProps<{
        username: string;
    }>;
    post: RouteProps<{
        id: string;
    }>;
    category: RouteProps<{
        name: string;
    }>;
    product: RouteProps<{
        productId: string;
    }>;
    article: RouteProps<{
        slug: string;
    }>;
    userDetails: RouteProps<{
        userId: string;
        detailsKey: string;
    }>;
    productReview: RouteProps<{
        productId: string;
        reviewId: string;
    }>;
    blogPost: RouteProps<{
        year: string;
        month: string;
        slug: string;
    }>;
    event: RouteProps<{
        year: string;
        month: string;
        day: string;
    }>;
    bookChapter: RouteProps<{
        isbn: string;
        chapter: string;
    }>;
    docs: RouteProps<{
        path: ["docs", "guide"];
    }>;
    gallery: RouteProps<{
        images: string[];
    }>;
    files: RouteProps<{
        fileId: string[];
    }>;
    userFiles: RouteProps<{
        fileId: [
            userKey?: "userId",
            userValue?: string,
            fileCategoryKey?: "fileCategory",
            fileCategoryValue?: "document" | "image" | "video",
            uploadDateKey?: "uploadDate",
            uploadDateValue?: string
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
            creationYearValue?: string
        ];
    }>;
};
export type LocaleLabelType = "cs" | "sk" | "de-AT" | "de-DE" | "en";
export declare const defaultLocale: "en";
export declare const mockRoutes: Record<keyof MockRoutesType, LocalizedRoute<LocaleLabelType>>;
