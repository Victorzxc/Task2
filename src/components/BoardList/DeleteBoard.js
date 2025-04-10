import {$api} from "../../api.js";


export async function deleteBoard(idBoard) {
    try {
        const response = await $api.delete("/board/deleteBoard", {
            params: {
                boardId:idBoard
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