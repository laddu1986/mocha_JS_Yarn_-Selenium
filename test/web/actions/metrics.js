import * as lib from '../../common';
import CommonPage from 'web/page_objects/common'
const header = {
    "Host": "client.appcurator.io",
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://dev.demospace.org/",
    "Content-Type": "text/plain",
    "Origin": "https://dev.demospace.org",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
}
var request, apiUrl, api;
export function addUsers(count, key) {
    api = key;
    apiUrl = `https://client.appcurator.io/e?k=${api}`;
    for (var i = 0; i < count; i++) {
        request = {
            api: apiUrl,
            data: {
                uid: `${lib.randomString.generate(10)}_uid`,
                e: [
                    {
                        idk: lib.randomString.generate(10),
                        tp: "id",
                        ca: Date.now(),
                        fields: {
                            email: `${lib.randomString.generate(5)}@demospace.org`,
                            displayName: `${lib.randomString.generate(5)}_name`
                        },
                        sa: Date.now() + 50
                    }
                ]
            },
            headers: header
        }
        lib.responseData.users.push(request.data);
        lib.post(request);
    }
}

export function getUserStatsCount(val) {
    return CommonPage.userStats.value[val].getText();
}