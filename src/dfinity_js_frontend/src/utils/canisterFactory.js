import { HttpAgent, Actor, getManagementCanister } from "@dfinity/agent";
// declarations
import { idlFactory as marketPlaceIdl } from "../../../declarations/dfinity_js_backend/dfinity_js_backend.did.js";
import { idlFactory as ledgerIdl } from "../../../declarations/ledger_canister/ledger_canister.did.js";

// Canister IDs
const MARKETPLACE_CANISTER_ID = process.env.DFINITY_JS_BACKEND_CANISTER_ID;
const LEDGER_CANISTER_ID = process.env.LEDGER_CANISTER_ID;
// Provider config
const AGENT_PROVIDER_URL = process.env.AGENT_PROVIDER_URL; //`${PROVIDER_HOST}:${PROVIDER_PORT}`;

export async function getMarketplaceCanister() {
    return await getCanister(MARKETPLACE_CANISTER_ID, marketPlaceIdl);
};

export async function getLedgerCanister() {
    return await getCanister(LEDGER_CANISTER_ID, ledgerIdl);
}

async function getCanister(canisterId, idl) {
    const authClient = window.auth.client; 
    const agent = new HttpAgent({
        host: AGENT_PROVIDER_URL, 
        identity: authClient.getIdentity()
    });
    
    
    await agent.fetchRootKey(); // needed for testing on local env
    return Actor.createActor(idl, {
        agent, 
        canisterId,
    });
}