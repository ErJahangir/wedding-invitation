import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchInvitation } from "@/api/invitation.api";
import { storeGuestName } from "@/utils/storage";
import { safeBase64 } from "@/utils/base64";

const InvitationContext = createContext(null);

export function InvitationProvider({ children }) {
  const location = useLocation();

  // Store guest name only
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const guestParam = params.get("guest");

    if (!guestParam) return;

    try {
      const decoded = safeBase64.decode(guestParam);
      if (decoded) storeGuestName(decoded);
    } catch (err) {
      console.error("Guest decode failed:", err);
    }
  }, [location.search]);

  // 🚀 React Query — fetch the single invitation
  const {
    data: config,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invitation"],
    queryFn: async () => {
      const response = await fetchInvitation();
      if (response.success) return response.data;
      throw new Error(response.error || "Failed to load invitation");
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <InvitationContext.Provider
      value={{
        config,
        isLoading,
        error: error?.message,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitation() {
  const context = useContext(InvitationContext);
  if (!context)
    throw new Error("useInvitation must be used within InvitationProvider");
  return context;
}
