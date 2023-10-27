import "dotenv/config"
import base58 from "bs58"
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))

const publickey = new Web3.PublicKey(process.env.PUB_KEY || "ERRQMMUdtw8c4knDu9aLjnRxp9z4kLLc4fdM6AsgwN27")
const decoded = base58.decode(process.env.PRIVATE_KEY || "vMGwccjmUb1WkJuMGjbswZxovk3wkDTd6HkgMu3Q74maPdfcfp2rHhJ6LYP44Yuit1ExUdcu6cawoBmqRA2VQbM")
const keyPair = Web3.Keypair.fromSecretKey(decoded)

async function main(){
    const tokenMint = await token.createMint(
        connection,
        keyPair,
        publickey, // mint auth
        publickey, // freeze atuh
        9 //decimals
    )
    console.log(tokenMint.toBase58());
}

main();