import {$api} from "../../api.js";

export async function putCard (potter){
    try {
        const response = await $api.put("/task/editTask", potter);


        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }


    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message)
        }
    }
}