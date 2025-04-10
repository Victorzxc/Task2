import {$api} from "../../api.js";

export async function putList (upList){
    try {
        console.log("putList: upList received", upList);
        const response = await $api.put("/list/editList", upList );

        console.log("putList: response", response);

        if (response.status >= 200 && response.status < 300) {
            console.log("putList: response.data", response.data);
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }


    } catch (error) {
        console.error("putList: error", error);
        if (error.response) {
            const { data } = error.response;
            console.log("putList: error.response.data.message", data.message);
        }
    }
}