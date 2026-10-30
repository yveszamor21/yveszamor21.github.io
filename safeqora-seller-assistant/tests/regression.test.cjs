const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
function baseline(){
 const els=new Map(); const get=id=>{if(!els.has(id))els.set(id,{value:'',style:{},addEventListener(){},replaceChildren(){},append(){},scrollIntoView(){},focus(){}});return els.get(id)};
 const context={document:{getElementById:get,createElement:()=>({append(){}})},localStorage:{getItem:()=>null},window:{},navigator:{},setTimeout,clearTimeout,console};
 context.SafeQora=require("../core.js");vm.createContext(context);vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],context);
 for(const [k,v] of Object.entries({market:'Walmart',fulfillment:'WFS',minProfit:5,minROI:30,purchasePaid:10,purchaseTax:0,walmartPrice:30,walmartMatch:'verified',walmartRate:15,ship:4,inbound:3,storage:0,returns:0,prep:0,other:0,quantity:1,discount:0,transport:0,purchaseExtra:0,closing:0,referralMinimum:0,feesVerified:'unverified',walmartEligibility:'unknown'}))get(k).value=String(v);
 return {context,get};
}
test('Walmart profit includes inbound shipping',()=>{const {context}=baseline();assert.equal(vm.runInContext('calc()',context),8.5)});
test('invalid negative fee does not become a zero-cost estimate',()=>{const {context,get}=baseline();get('ship').value='-4';assert.equal(vm.runInContext('calc()',context),null)});
