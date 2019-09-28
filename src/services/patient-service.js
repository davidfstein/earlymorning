const URL = 'https://earlymorning-backend.herokuapp.com/api/';

class PatientServiceClient {

    getPatients() {
        return fetch(URL + 'patient')
            .then((response) => {
                return response.json();
            })
    }
}

export default PatientServiceClient;