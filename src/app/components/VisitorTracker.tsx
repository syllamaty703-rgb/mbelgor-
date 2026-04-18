import { useEffect } from "react";
import { useLocation } from "react-router";
import { trackVisit } from "../utils/mockDb";

export function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    // Record page view whenever the location changes
    trackVisit(location.pathname);
  }, [location.pathname]);

  return null; // This component doesn't render anything
}
