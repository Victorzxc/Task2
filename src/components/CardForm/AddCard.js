import axios from "axios";

export async function adddCard(cardName, id) {
    try {
        const response = await axios.post("http://localhost:7000/task/createTask", {
            name: cardName,
            listId: id
        }, {
            headers: { Authorization: "Bearer " + localStorage.getItem("priton") }
        })

    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message)
        }
    }
}