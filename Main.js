//by metakul owner: Shubham kunwar




import * as mpl from "@metaplex-foundation/mpl-token-metadata";

import * as web3 from "@solana/web3.js";

import * as anchor from '@project-serum/anchor';

export function loadWalletKey(keypairFile:string): web3.Keypair {

    const fs = require("fs");

    const loaded = web3.Keypair.fromSecretKey(

      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),

    );

    return loaded;

  }

const INITIALIZE = false;

async function main(){

    console.log("let's name some tokens!");

    const myKeypair = loadWalletKey("/home/stant/stans-main-wallet/my-keypair.json");

    const mint = new web3.PublicKey("7pgm4HewLzLkddE7gA8PwaFxzAdfSupxfR5UMc3LXg1L");

    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));

    const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());

    const seed3 = Buffer.from(mint.toBytes());

    const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID);

    let creatorslist:  { address: web3.PublicKey; share: number; verified: boolean }[] = [

      {"address": myKeypair.publicKey, "share" : 100, "verified": true} ,

    ]

    const accounts = {

        metadata: metadataPDA,

        mint,

        mintAuthority: myKeypair.publicKey,

        payer: myKeypair.publicKey,

        updateAuthority: myKeypair.publicKey,

    }

    const dataV2 = {

        name: "METAKUL",

        symbol: "$KULL",

        uri:"https://raw.githubusercontent.com/shubham-kunwar/Name-solan-spl-token/main/Metadata.json",
        //metadata example with image uri


        // we don't need that

        sellerFeeBasisPoints: 500,

        creators: null,

        collection: null,

        uses: null

    }

    let ix;

    if (INITIALIZE) {

        const args =  {

            createMetadataAccountArgsV2: {

                data: dataV2,

                isMutable: true,

                updateAuthority: myKeypair.publicKey,

            }

        };

        ix = mpl.createCreateMetadataAccountV2Instruction(accounts, args);

    } else {

        const args =  {

            updateMetadataAccountArgsV2: {

                data: dataV2,

                isMutable: true,

                updateAuthority: myKeypair.publicKey,

                primarySaleHappened: true

            }

        };

        ix = mpl.createUpdateMetadataAccountV2Instruction(accounts, args)

    }

    const tx = new web3.Transaction();

    tx.add(ix);

    const connection = new web3.Connection("https://api.mainnet-beta.solana.com");

    const txid = await web3.sendAndConfirmTransaction(connection, tx, [myKeypair]);

    console.log(txid);

}

main();  
