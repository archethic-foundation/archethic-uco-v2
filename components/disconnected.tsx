import { Button } from "./button.tsx";
import { ConnectButtonCustom } from "./connect-button.tsx";

export default function Disconnected() {
  return (
    <div className="flex flex-col gap-[50px]">
      <ConnectButtonCustom />
      <div className="flex flex-col gap-[20px] max-w-[748px] mx-auto">
        <div className="w-[294px] bg-purple h-[1px]"></div>
        <div className="flex flex-col gap-[15px]">
          <p className="text-18 font-medium">
            Archethic is updating its ERC-20 UCO token to a new version that is
            more secure and harmonized across all blockchains. If you hold UCO
            tokens, it is important to migrate them to this new version to
            ensure future compatibility.
          </p>
          <a href={"https://wiki.archethic.net/FAQ/migration-erc-token"} target={"_blank"}>
            <Button variant="secondary" className="w-fit">
              Learn more
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
