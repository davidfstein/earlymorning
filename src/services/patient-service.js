const URL = 'https://earlymorning-backend.herokuapp.com/api/';

class PatientServiceClient {

    getPatients() {
        return fetch(URL + 'patient')
            .then((response) => {
                return response.json();
            })
    }

    sendMessage(name) {
        return fetch(URL + 'message', {
            method: 'post', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"patient": name})
        })
        .then((response) => {
            return response.json();
        })
    }
}

export default PatientServiceClient;