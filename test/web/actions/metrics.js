import * as lib from '../../common';
import spaceDashboardPage from 'web/page_objects/spaceDashboardPage'
import Constants from 'data/constants.json'

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

export async function addVisitor(count, key) {
    api = key;
    apiUrl = `https://client.appcurator.io/e?k=${api}`
    for (var i = 0; i < count; i++) {
        request = {
            api: apiUrl,
            data: {
                vid: `${lib.randomString.generate(10)}_vid`,
                e: [
                    {
                        idk: lib.randomString.generate(10),
                        tp: "it",
                        ca: Date.now(),
                        sa: Date.now() + 50
                    }
                ]
            },
            headers: header
        }
        lib.responseData.visitors.push(request.data);
        await lib.post(request);
    }
}
export async function addUsers(count, key) {
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
        await lib.post(request);
    }
}

export function getCount(type) {
    if (type == Constants.UserType.User)
        return spaceDashboardPage.totalUsersCount.getText();
    else if (type == Constants.UserType.Visitor)
        return spaceDashboardPage.totalVisitorsCount.getText();
    else if (type == Constants.UserType.Active)
        return spaceDashboardPage.totalActiveCount.getText();
    else
        return spaceDashboardPage.totalNewCount.getText();
} 