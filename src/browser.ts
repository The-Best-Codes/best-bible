import * as BestBible from "./index";

// Expose the functions to the global scope (only if window is available)
if (typeof window !== "undefined") {
  (window as any).BestBible = BestBible;
}
