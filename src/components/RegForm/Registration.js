import axios from "axios";

export async function rgstr(email, password, name) {
    try {
        const response = await axios.post("http://localhost:7000/auth/registration", { email: email, password: password, name: name })
        localStorage.setItem("priton", response.data.token)
    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message)
            return Promise.reject(data.message);
        }
    }
}