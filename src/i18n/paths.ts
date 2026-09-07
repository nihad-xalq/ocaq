export const routes = {
  home: "",
  library: "kitabxana",
  specialists: "mutexessisler",
  works: "islerimiz",
  contact: "elaqe",
} as const;

export type RouteKey = keyof typeof routes;

export const routeSegments = Object.values(routes).filter(Boolean);
