import {
  createConnectTransport,
  ConnectTransportOptions,
} from "@connectrpc/connect-web";
import { Timestamp } from "@bufbuild/protobuf";
import {
  Currency,
  Deployment,
  createClient,
  withTokenAuth,
  Resolution,
} from "@enzymefinance/api";
import { VaultData } from "@/global";

const token = process.env.NEXT_PUBLIC_ENZYME_API_TOKEN || "";
const enzymeAddress = process.env.NEXT_PUBLIC_ENZYME_VAULT_ADDRESS || "";
const transport = createConnectTransport(
  withTokenAuth(token, {
    baseUrl: "https://api.enzyme.finance",
    httpVersion: "2",
  } as ConnectTransportOptions)
);
const client = createClient(transport);

export const fetchVaultData = async (): Promise<VaultData[]> => {
  if (!token || !enzymeAddress) {
    return [];
  }
  const to = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const from = new Date(new Date(to).setFullYear(to.getFullYear() - 2));

  const vault = await client.getVaultTimeSeries({
    address: enzymeAddress,
    deployment: Deployment.ETHEREUM,
    currency: Currency.USD,
    resolution: Resolution.ONE_DAY,
    range: {
      from: Timestamp.fromDate(from),
      to: Timestamp.fromDate(to),
    },
  });

  return vault.items.map((item) => ({
    timestamp: item.timestamp
      ? item.timestamp.toDate().toISOString().split("T")[0]
      : "",
    grossAssetValue: item.grossAssetValue,
    "Performance": item.netShareValue,
    numberOfShares: item.numberOfShares,
    priceIsValid: item.priceIsValid,
  }));
};
