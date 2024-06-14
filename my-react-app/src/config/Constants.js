export const dashboardUrl = () =>{
    const getuser = JSON.parse(localStorage.getItem('USER'));
    if (getuser) {
        if (getuser.roleid == 1) {
            return '/user/dashboard';
        }
        if (getuser.roleid == 2) {
            return '/guest/dashboard';
        }
    }

}