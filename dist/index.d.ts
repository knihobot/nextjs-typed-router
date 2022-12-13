export declare function useRouterKnihobot(): {
    getRouteByName: (route: "index", params: Record<string, string> | undefined) => string;
} & import("next/dist/shared/lib/router/router").BaseRouter & Pick<import("next/router").Router, "replace" | "push" | "reload" | "back" | "forward" | "prefetch" | "beforePopState" | "events" | "isFallback" | "isReady" | "isPreview">;
