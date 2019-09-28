import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';
import PatientServiceClient from './services/patient-service';
import Patient from './components/patient';
import './App.css';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      patientHistory: [],
      patients: []
    }
  }

  componentDidMount = () => {
    this.getPatients();
    this.pollPatients();
  }

  pollPatients = () => {
    setInterval(this.getPatients, 1000);
  }

  colorByMew = (mew) => {
    if (mew < 2) {
      return "white";
    }
    else if (mew >= 2 && mew < 4) {
      return "yellow";
    }
    else if (mew >= 4) {
      return "red";
    }
  }

  getPatients = async () => {
    const patients = await new PatientServiceClient().getPatients();
    patients.forEach((patient, _) => {
      if (this.state.patientHistory) {
        this.state.patientHistory.forEach(async (p, _) => {
          if (patient.name == p.name && this.calculateMews(patient) >= 4 && this.calculateMews(p) < 4) {
            await new PatientServiceClient().sendMessage(patient.name);
          }
        })
      }
    });
    const sortedPatients = this.sortPatientsByMew(patients);
    const patientDivs = Array.from(
        sortedPatients.map((patient, _) => {
            const mew = this.calculateMews(patient);
            const color =  this.colorByMew(mew);
            return <Patient patient={patient} color={color} />
          }
        )
    );
    this.setState({
      patientHistory: patients,
    });
    this.setState({
      patients: patientDivs,
    });
  }   

  sortPatientsByMew = (patients) => {
    const patientsWithMews = Array.from(patients.map((patient, _) => {
      return {
        patient: patient,
        mew: this.calculateMews(patient)
      };
    }));
    const sortedPatients = patientsWithMews.sort((patient1, patient2) => patient2.mew - patient1.mew);
    return Array.from(sortedPatients.map((patient, _) => patient.patient));
  }

  calculateMews = (patient) => { 
    // from smart band
    const pulse = patient.pulse[patient.pulse.length - 1];
    const respiration = patient.respiration[patient.respiration.length - 1];
    const temperature = patient.temperature[patient.temperature.length - 1];
    
    // entered by nurse
    const blood_pressure = null;
    // const neuro = patient.neuro;
    
    // do we need these? 
    // const hrsSinceOp = patient.time;  
  
    let mews = 0; 
  
    if (pulse <= 40) {
      mews += 2;
    } 
    else if (pulse >= 41 && pulse <= 50) {
      mews += 1;
    } 
    else if (pulse >= 51 && pulse <= 100) {
      mews += 0;
    } 
    else if (pulse >= 101 && pulse <= 110) {
      mews += 1;
    } 
    else if (pulse >= 111 && pulse <= 129) {
      mews += 2;
    } 
    else {
      mews += 3;
    }
  
    if(respiration <= 8) {
      mews += 2;
    } else if(respiration >= 9 && respiration <= 14) {
      mews += 0;
    } else if(respiration >= 15 && respiration <= 20) {
      mews += 1;
    } else if(respiration >= 21 && respiration <= 29) {
      mews += 2; 
    } else {
      mews += 3;
    }
  
    // Only include if we have blood pressure
    // if (blood_pressure) {
    //   if(blood_pressure <= 70) {
    //     mews += 3;
    //   } else if(blood_pressure >= 71 && blood_pressure <= 80) {
    //     mews += 2;
    //   } else if(blood_pressure >= 81 && blood_pressure <= 100) {
    //     mews += 1;
    //   } else if(blood_pressure >= 101 && blood_pressure <= 199) {
    //     mews += 0;
    //   } else if(blood_pressure >= 200) {
    //     mews += 2;
    //   }
    // }
  
    if(temperature <= 35) {
      mews += 2;
    } else if(temperature >= 35.1 && temperature <= 36) {
      mews += 1;
    } else if(temperature >= 36.1 && temperature <= 38) {
      mews += 0;
    } else if(temperature >= 38.1 && temperature <= 38.5) {
      mews += 1; 
    } else if(temperature >= 38.6) {
      mews += 2;
    }
    
    return mews;
  }

  render() {
    return (
      <div className="App">
        <Navbar>
          <NavbarBrand href="/" className="mr-auto">Early Morning</NavbarBrand>
            <Nav>
            </Nav>
        </Navbar>
		<div className='header'>
			<h1> Patient Status : MEWS </h1>
		</div>
        <div className='content'>
          {this.state.patients}
        </div>
      </div>
    );
  }
}

export default App;
