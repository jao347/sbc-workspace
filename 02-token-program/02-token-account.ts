import "dotenv/config"
import base58 from "bs58"
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))
const publickey = new Web3.PublicKey(process.env.PUB_KEY || "ERRQMMUdtw8c4knDu9aLjnRxp9z4kLLc4fdM6AsgwN27") // PUBKEY of person you want to create the token account

const decoded = base58.decode(process.env.PRIVATE_KEY || "vMGwccjmUb1WkJuMGjbswZxovk3wkDTd6HkgMu3Q74maPdfcfp2rHhJ6LYP44Yuit1ExUdcu6cawoBmqRA2VQbM")
const keyPair = Web3.Keypair.fromSecretKey(decoded)
const tokenMint = "HNmqoLbDwgS9sNdWK2CLu7Q4EcRZgBxSJa7z1CyVrFRz"

async function main(){
    const tokenAccount  = await token.createAccount(
        connection, // connection
        keyPair, // signer
        new Web3.PublicKey(tokenMint), // mint public key
        publickey, // owner of the token-account
    );
    console.log(tokenAccount.toBase58());
}

main();