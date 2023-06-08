import formidable from "formidable";
import https from "https";

import {paytmParams, paytmMerchantKey} from "../server.js";
import PaytmChecksum from "../paytm/PaytmChecksum.js";


export const addPaymentGateway=async(req, res)=>{
    try{
        let paytmChecksum=await PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);
        let params={
            ...paytmParams, "CHEKSUMHASH":paytmChecksum
        }
        res.status(200).json(params);
    }catch(err){
        res.status(500).json({error:error.message});
    }
}

export const paytmResponse=(request, response)=>{
    const form=new formidable.IncomingForm();
    let paytmChecksum=request.body.CHEKSUMHASH;
    delete request.body.CHEKSUMHASH;

    let isVerifySignature=PaytmChecksum.verifySignature(request.body, paytmMerchantKey, paytmChecksum);
    if(isVerifySignature)
    {
        let paytmParams={};
        paytmParams["MID"]=request.body.MID;
        paytmParams["ORDERID"]=request.body.ORDERID;

        PaytmChecksum.generateSignamture(paytmParams, paytmMerchantKey)
        .then((checksum)=>{
            paytmParams["CHEKSUMHASH"]=checksum;

            let post_data=JSON.stringify(paytmParams);

            let options={
                hostname:"securegw-stage.paytm.in",
                port:443,
                path:"/order/status",
                headers:{
                    "Content-Type":"application/json",
                    "Content-Type":post_data.length
                }
            }
            let res="";
            let post_req=https.request(options, (post_res)=>{
                post_res.on("data", (chunk)=>{
                    res+=chunk;
                });

                post_res.on("end", ()=>{
                    let result=JSON.parse(res);
                    response.redirect("http://localhost:3000")
                })
            });

            post_req.write(post_data);
            post_req.end();
        })
    }else{
        console.log("Checksum Mismatched");
    }
}