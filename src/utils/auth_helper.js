export const auth = {
  isAuthenticated: async () => {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt")) {
      return await JSON.parse(sessionStorage.getItem("jwt"));
    } else {
      return false;
    }
  },
  authenticate: async (jwt, cb) => {
    // console.log(await jwt);
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(await jwt));
    await cb();
  },
  clearJWT: async (cb) => {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    await cb();
    // optional
    // signOutUserAccount().then((data) => { // ricky has bugs - func returns null
    //     // document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    //     document.cookie = 't=; expires=5 * 60 * 1000; path=/;'
    // })
  },
  updateUser: async (user, cb) => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("jwt")) {
        let auth = await JSON.parse(sessionStorage.getItem("jwt"));
        auth.user = await user;
        sessionStorage.setItem("jwt", JSON.stringify(auth));
        await cb();
      }
    }
  },
};
