// register protocol implementations
import "@wormhole-foundation/sdk-evm-ntt";
import "@wormhole-foundation/sdk-definitions-ntt";
// import "@wormhole-foundation/sdk-route-ntt";
import {
  useEthersProvider,
  useEthersSigner,
} from "../lib/wagmiEthersAdapter.js";
// import { getEvmSignerForSigner } from "@wormhole-foundation/sdk-evm";
import {
  wormhole,
  amount,
  // TransactionId,
  // signSendWait,
  Wormhole,
} from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk/evm";
import { useSwitchChain } from "wagmi";
// import evm from "@wormhole-foundation/sdk/platforms/evm";

const Bridge = () => {
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const { switchChain } = useSwitchChain();

  const bridge = async () => {
    if (!provider || !signer) return;
    const wh = await wormhole("Testnet", [evm]);
    // const wh = new Wormhole("Testnet", [evm.Platform]);
    const src = wh.getChain("Sepolia");

    const dst = wh.getChain("Fantom");
    // const srcSigner = await getEvmSignerForSigner(signer);

    const srcNtt = await src.getProtocol("Ntt", {
      ntt: {
        manager: "0x50cd27c3A19b5958D0C2556c982283E22B61Dbb3",
        token: "0x35a27866C848cb6290217024410bbcf75c0509f8",
        transceiver: {
          threshold: 1,
          wormhole: "0x299c51b298fAAa3B918a89bF76034eD94798DF56",
        },
      },
    });

    const dstNtt = await dst.getProtocol("Ntt", {
      ntt: {
        manager: "0x57dF1202dfEbd4D3088CB6F2376eE1D80375b32E",
        token: "0x0A16eAAb95dbEfa86348254DC0E28A7ADbE2fe86",
        transceiver: {
          threshold: 1,
          wormhole: "0xb487b6B9BC743499A028D51296507930e4061427",
        },
      },
    });
    const amt = amount.units(amount.parse("0.01", 18));

    const xfer = () =>
      srcNtt.transfer(
        Wormhole.chainAddress(src.chain, signer.address).address,
        amt,
        Wormhole.chainAddress(dst.chain, signer.address),
        {
          queue: false,
          automatic: false,
          gasDropoff: 0n,
        },
      );

    const txs = [];
    for await (const tx of xfer()) {
      const txx = await signer.sendTransaction(tx.transaction);
      txs.push(txx);
      await txx.wait();
      // signer.signTransaction(tx.transaction);
    }
    console.log(txs);

    // const txs = [
    //   {
    //     hash: "0x904a67c846973afb145f47dec2e2ffa28c34ac86313c2b7c5c8a9bdafd087c10",
    //   },
    // ];
    const vaa = await wh.getVaa(
      txs[txs.length - 1].hash,
      // @ts-ignore
      "Ntt:WormholeTransfer",
      25 * 60 * 1000,
    );
    console.log(vaa);
    //
    // // // Initiate the transfer (or set to recoverTxids to complete transfer)
    // // const txids: TransactionId[] = await signSendWait(src, xfer(), srcSigner);
    // // console.log("Source txs", txids);
    //
    // // const vaa = await wh.getVaa(
    // //   txids[txids.length - 1]!.txid,
    // //   // @ts-ignore
    // //   "Ntt:WormholeTransfer",
    // //   25 * 60 * 1000
    // // );
    // console.log(vaa);

    const dfer = () =>
      dstNtt.redeem(
        [vaa!],
        Wormhole.chainAddress(dst.chain, signer.address).address,
      );

    const dtxs = [];
    for await (const tx of dfer()) {
      console.log(tx);
      await switchChain({ chainId: +tx.transaction.chainId.toString() });
      const txx = await signer.sendTransaction(tx.transaction);
      dtxs.push(txx);
      await txx.wait();
      // signer.signTransaction(tx.transaction);
    }
    console.log(dtxs);

    // const dstTxids = await signSendWait(
    //   dst,
    //   dstNtt.redeem(
    //     [vaa!],
    //     Wormhole.chainAddress(dst.chain, signer.address).address
    //   ),
    //   srcSigner
    // );
    // console.log("dstTxids", dstTxids);
  };

  return <button onClick={bridge}>bridge</button>;
};

export default Bridge;
