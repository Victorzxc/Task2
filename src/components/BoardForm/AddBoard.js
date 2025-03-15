import axios from "axios";

export async function adddBoard(boardName) {
    try {
        const response = await axios.post("http://localhost:7000/board/createBoard", {name:boardName} , {
            headers: { Authorization: "Bearer " + localStorage.getItem("priton") }
        })

    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message)
            return data.message;
        }
    }
}