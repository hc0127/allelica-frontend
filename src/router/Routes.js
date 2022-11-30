const Routes = {
    Auth: {
      Login: "/login",
    },
    Units: {
          Register: '/register',
          Patients: '/patients',
          PatientCard: '/patients/patientcard',
          Calendar: (id = ':unitId') => `/units/calendar/${id}`
      },
    ChangePassword: "/changepassword",
    Reports: "/reports",
  };
  
export default Routes;
  