/* The following block generates a random string */


class Common {

    get random()  { 
        let allowedChars = "abcdefghiklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let stringLength = 8;
        let randomstring = '';
        for (var i = 0; i < stringLength; i++) {
            var rnum = Math.floor(Math.random() * allowedChars.length);
            randomstring += allowedChars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }

    waitForExistAndVisible(ev){
        ev.waitForExist();
        ev.waitForVisible();
    }
}

export default new Common();