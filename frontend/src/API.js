import axios from 'axios'

const APIEndPoint = "localhost:8000"

async function getEvents() {
    console.log("Clicked!")
    await axios.get(`http://${APIEndPoint}/alltasks`)
        .then(res => {
            //const events = res.data
            console.log("HELP ME")
            console.log(res.data)
            return res.data
        })
        .catch(error => {
            console.log(error)
            if (error.response) {
                // The server responded with a status code outside the 2xx range
                console.log('Error response:', error.response);
            } else if (error.request) {
                // The request was made but no response was received
                console.log('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error message:', error.message);
            }
        })
}

function postAssignment(params) {
    axios.post(`http://${APIEndPoint}/`, params)
        .then(res => {
            console.log(res.status)
        })
}

function postEvent() {
    axios.post(`http://${APIEndPoint}/`, params)
        .then(res => {
            console.log(res)
        })
}

export { getEvents, postAssignment, postEvent }