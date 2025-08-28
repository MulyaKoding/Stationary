import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// Interface for the hook's return value
interface UsePageTransitionReturn {
  isTransitioning: boolean;
}

/**
 * Custom hook that manages page transition state
 * Provides a loading state during route changes with a configurable delay
 * 
 * @param delay - Optional delay in milliseconds for the transition (default: 500ms)
 * @returns Object containing the current transition state
 */
const usePageTransition = (delay: number = 500): UsePageTransitionReturn => {
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname hook for current path
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    // Function to simulate route change start and complete
    const handleRouteChange = (): (() => void) => {
      setIsTransitioning(true);
      
      // Simulate the end of the transition after a delay
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, delay);

      return () => clearTimeout(timeoutId); // Clean up timeout
    };

    const cleanup: (() => void) = handleRouteChange();

    // Return cleanup function
    return cleanup;

    // Dependency on pathname to detect route changes
  }, [pathname, delay]);

  return { isTransitioning };
};

export default usePageTransition;