import axios from "axios";

export async function addList(listName, id) {
    try {
        const response = await axios.post("http://localhost:7000/list/createList", {
            name: listName,
            boardId: id
        },
        
        {
            headers: { Authorization: "Bearer " + localStorage.getItem("priton") }
        })

    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message)
        }
    }
}