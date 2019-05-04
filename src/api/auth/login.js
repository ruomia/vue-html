/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";
// 获取信息
export function userInfo() {
    return axios({
        url: "/admin/index/userinfo",
        method: "get",
    });
}

export function loginName(username, password) {
    // console.log(userName, pwd)
    return axios({
        url: "/admin/index/login",
        method: "post",
        data: { username, password }
    });
}

export function logout(uid, token) {
    return axios({
        url: "/admin/index/logout",
        method: "post",
        data: { uid, token }
    });
}

export function password(data) {
    return axios({
        url: "/admin/auth/login/password",
        method: "post",
        data: data
    });
}
