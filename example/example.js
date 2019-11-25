const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/yourinfurakey"));

const MoneyMarketABI = require("./MoneyMarket");
const MoneyMarketAddress = '0x0eEe3E3828A45f7601D5F54bF49bB01d1A9dF5ea';
const MoneyMarketContract = new web3.eth.Contract(MoneyMarketABI, MoneyMarketAddress);

var account = '0x5ef01a9aB62f700BB0BCC0F11f9CF7aa8fc543fd';
var assetUSDx = '0xeb269732ab75a6fd61ea60b06fe994cd32a83549';

function contractMethodCall(contract, methodName, param = []) {

    if (!(contract instanceof Object) || methodName.constructor != String) {
        console.log('input param type error!!!')
        console.log(`contract:${typeof (contract)}`);
        console.log(`methodName:${typeof (methodName)}`);
        return 'error';
    }

    if (param.constructor != Array)
        param = [param];

    return new Promise(resolve => {
        contract.methods[methodName](...param).call().then(async result => { resolve(result) });
    })
}

async function main() {

    var marketsUSDx = await contractMethodCall(MoneyMarketContract, 'markets', [assetUSDx]);
    var supplyBalance = web3.utils.toBN(await contractMethodCall(MoneyMarketContract, 'getSupplyBalance', [account, assetUSDx]));


    console.log(web3.utils.toBN(marketsUSDx.supplyRateMantissa).mul(web3.utils.toBN(2102400)).toString()); //with 18 decimal
    console.log(web3.utils.toBN(supplyBalance).toString()); //with 18 decimal
}

main();