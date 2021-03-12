module.exports = {
    updateSession: (LOGIN_ID, SESSION_KEY, UPDATED_DT, USER_ID) => {
        pool.query('UPDATE USER_T SET SESSION_KEY=?,UPDATED_DT=?, USER_ID=? WHERE LOGIN_ID = ?', [SESSION_KEY, UPDATED_DT, USER_ID, LOGIN_ID], (error, result) => {
            if (error) throw error;
        });
    },

    validateSession: (req, res, data) => {

        pool.query('SELECT USER_ID,SESSION_KEY FROM USER_T WHERE ID=?', req.body.ID, (error, result) => {
            var retObj = {
                statcode: 103,
                statmsg: "Invalid data!"
            }
            if (error) {
                console.log(req.body.ID);
                console.log("validateSession");
                console.log(req.body);
		        console.log(data);
                retObj.statmsg = error.toString();
                res.send(retObj);
            }
            else {
                retObj.statcode = 200;
                retObj.statmsg = "Success";
                const Iv = result[0].USER_ID;
                const Key = result[0].SESSION_KEY;
                retObj.data = util.dataEncrypt(JSON.stringify(data), Iv, Key);                
                res.send(retObj);
            }
        })
    }
};
