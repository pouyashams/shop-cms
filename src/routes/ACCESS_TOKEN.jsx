import axios from "axios";


export default async function() {
    var access_token;
    var qs = require('qs');
    await axios({
        method: 'POST',
        url: `http://shop.isuncharge.com/isunshop/oauth/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic aXN1bjppc3Vuc2VjcmV0Zm9yYXBp`
        },
        data: qs.stringify({
            'grant_type': 'password',
            'client_id': 'isun',
            'client_secret': 'isunsecretforapi',
            'username': 'isun',
            'password': '123456'
        })
    })
        .then(response => {
            access_token = response.data.access_token;
        })
        .catch((error) => {
            console.log('error ' + error);
        });
    return access_token;
}