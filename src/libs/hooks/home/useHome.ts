import { fetcher } from "@/utils/util";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

// Interface untuk data account (sesuaikan dengan struktur response API Anda)
interface AccountData {
  id: string;
  name: string;
  email: string;
  // tambahkan property lain sesuai dengan response API
}

// Interface untuk parameter hook
interface UseAccountParams {
  isShouldFetch: boolean;
  option?: SWRConfiguration;
}

// Type untuk return value dari hook
type UseAccountReturn = SWRResponse<AccountData, Error>;

function useAccount(
  isShouldFetch: boolean, 
  option?: SWRConfiguration
): UseAccountReturn {
  const url = `/api/position`;

  const result = useSWR<AccountData, Error>(
    url, 
    fetcher, 
    option,
  );

  return result;
}

export { useAccount };