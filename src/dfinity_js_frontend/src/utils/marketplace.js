import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

export async function createProduct(product) {
    return window.canister.marketplace.addProduct(product);
}

export async function getProducts() {
    try {
        return await window.canister.marketplace.getProducts();
    } catch (error) {
        if (error.name === "AgentHTTPResponseError") {
            const authClient = window.auth.client;
            await authClient.logout();
        }
        return [];
    }
}

export async function buyProduct(product) {
    const marketplaceCanister = window.canister.marketplace;
    const orderResponse = await marketplaceCanister.createOrder(product.id);
    const sellerPrincipal = Principal.from(orderResponse.Ok.seller);
    
    const sellerAddress = await marketplaceCanister.getAddressFromPrincipal(sellerPrincipal);
    const block = await transferICP(sellerAddress, orderResponse.Ok.price, orderResponse.Ok.memo);

    console.log(`block ${block}, memo: ${orderResponse.Ok.memo}, price: ${orderResponse.Ok.price}`);

    await marketplaceCanister.completePurchase(sellerPrincipal, product.id, orderResponse.Ok.price, block, orderResponse.Ok.memo);
}