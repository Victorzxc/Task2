import {$api} from "../../api.js";


export async function deleteList(idlist, idboard) {
    try {
        const response = await $api.delete("/list/deleteList", {
            params: {
                listId: idlist,
                boardId: idboard
            }
        })
        console.log(response)
    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message)
        }
    }
}