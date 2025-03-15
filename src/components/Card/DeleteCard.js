import {$api} from "../../api.js";


export async function deleteCard(idTask, idList, idBoard) {
    try {
        const response = await $api.delete("/task/deleteTask", {
            params: {
                taskId:idTask,
                listId:idList,
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