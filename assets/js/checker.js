function checkTokens() {
   const tokens = $("#textarea").val().split("\n").map(token => token.trim()).filter(token => token.length > 0);
   if (tokens.length === 0) {
      alert("riphook.xyz | please fill a token list.");
      return;
   }
   if (tokens.length > 1000) {
      alert("riphook.xyz | too many tokens! please enter a maximum of 1000 tokens.");
      return;
   }

   let validCount = 0;
   let invalidCount = 0;
   let boostCount = 0;
   let providedCount = tokens.length;

   const checkToken = function (token) {
      return new Promise((resolve, reject) => {
         $.ajax({
            url: "https://discord.com/api/v10/users/@me",
            method: "GET",
            headers: {
               "Authorization": token
            },
            success: function (data) {
               if (data.premium_type && data.premium_type > 0) {
                  boostCount++;
               }
               validCount++;
               resolve();
            },
            error: function (xhr) {
               invalidCount++;
               reject();
            }
         });
      });
   };

   let promises = tokens.map(token => checkToken(token));

   Promise.allSettled(promises).then(() => {
      alert(`riphook.xyz | ${providedCount} total tokens provided - ${validCount} valid, ${invalidCount} invalid, ${boostCount} boost.`);
   }).catch((error) => {
      console.error(error);
   });
}function checkTokens() {
    const tokens = $("#textarea").val().split("\n").map(token => token.trim()).filter(token => token.length > 0);
    if (tokens.length === 0) {
       alert("riphook.xyz | please fill a token list.");
       return;
    }
    if (tokens.length > 1000) {
       alert("riphook.xyz | too many tokens! please enter a maximum of 1000 tokens.");
       return;
    }
 
    let validCount = 0;
    let invalidCount = 0;
    let boostCount = 0;
    let providedCount = tokens.length;
 
    const checkToken = function (token) {
       return new Promise((resolve, reject) => {
          $.ajax({
             url: "https://discord.com/api/v10/users/@me",
             method: "GET",
             headers: {
                "Authorization": token
             },
             success: function (data) {
                if (data.premium_type && data.premium_type > 0) {
                   boostCount++;
                }
                validCount++;
                resolve();
             },
             error: function (xhr) {
                invalidCount++;
                reject();
             }
          });
       });
    };
 
    let promises = tokens.map(token => checkToken(token));
 
    Promise.allSettled(promises).then(() => {
       alert(`riphook.xyz | ${providedCount} total tokens provided - ${validCount} valid, ${invalidCount} invalid, ${boostCount} boost.`);
    }).catch((error) => {
       console.error(error);
    });
 }