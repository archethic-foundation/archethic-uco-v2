import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight } from "lucide-react";
import { Button } from "./button.tsx";

export const ConnectButtonCustom = () => {
  // const { connectors, connect } = useConnect();
  // const [dialogOpen, setDialogOpen] = useState(false);
  //
  // const handleCloseDialog = () => setDialogOpen(false);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,

              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    className="mx-auto px-[30px] py-[15px] text-22 h-[54px] gap-[10px]"
                  >
                    Connect Wallet
                    <ArrowRight size="22" />
                  </Button>
                );
              }

              // if (chain.unsupported) {
              //   return (
              //     <button onClick={openChainModal} type="button">
              //       Wrong network
              //     </button>
              //   );
              // }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>

    // <>
    //   <dialog open={dialogOpen} onClose={handleCloseDialog}>
    //     <div className="fixed inset-0 grid place-content-center bg-black/75">
    //       <div className="w-full max-w-lg bg-white p-4 shadow-lg">
    //         {connectors
    //           .filter((c) => c.id != "io.metamask")
    //           .map((connector) => (
    //             <Button
    //               key={connector.uid}
    //               onClick={() => connect({ connector })}
    //             >
    //               {connector.name}
    //             </Button>
    //           ))}
    //         <button onClick={handleCloseDialog}>Close</button>
    //       </div>
    //     </div>
    //   </dialog>
    //   <Button
    //     className="flex items-center gap-[10px]"
    //     onClick={() => setDialogOpen(true)}
    //   >
    //     Connect Wallet <ArrowRight size="18" />
    //   </Button>
    // </>
  );
};
