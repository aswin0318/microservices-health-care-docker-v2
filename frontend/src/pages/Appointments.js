import { useEffect, useState } from 'react';
import { appointmentAPI, doctorAPI } from '../services/api';
import './Appointments.css';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    reason: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [appointmentsRes, doctorsRes] = await Promise.all([
        appointmentAPI.getAll(),
        doctorAPI.getAll(),
      ]);
      
      const apptData = Array.isArray(appointmentsRes) ? appointmentsRes : appointmentsRes?.data || [];
      const doctorData = Array.isArray(doctorsRes) ? doctorsRes : doctorsRes?.data || [];
      
      setAppointments(apptData);
      setDoctors(doctorData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load appointments or doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await appointmentAPI.create(formData.doctorId, formData.date, formData.reason);
      setShowForm(false);
      setFormData({ doctorId: '', date: '', reason: '' });
      fetchData();
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError(err.response?.data?.message || 'Failed to create appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const getSelectedDoctor = () => {
    return doctors.find(d => d.id === parseInt(formData.doctorId));
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading appointments...</div></div>;
  }

  return (
    <div className="container">
      <div className="page">
        <h1>📅 My Appointments</h1>
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
        
        <button 
          onClick={() => setShowForm(!showForm)} 
          className={`toggle-btn ${showForm ? 'cancel' : 'primary'}`}
        >
          {showForm ? '✕ Cancel' : '+ Book New Appointment'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="appointment-form">
            <h2>Book New Appointment</h2>
            
            <div className="form-group">
              <label htmlFor="doctorId">Select Doctor</label>
              <select
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                required
                disabled={submitting}
              >
                <option value="">-- Choose a doctor --</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Appointment Date & Time</label>
              <input
                id="date"
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Appointment</label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Describe your health concern or reason for visit"
                value={formData.reason}
                onChange={handleInputChange}
                rows="4"
                disabled={submitting}
              ></textarea>
            </div>

            {formData.doctorId && getSelectedDoctor() && (
              <div className="doctor-preview">
                <p><strong>Selected Doctor:</strong> Dr. {getSelectedDoctor().name}</p>
                <p><strong>Specialty:</strong> {getSelectedDoctor().specialty}</p>
              </div>
            )}

            <button type="submit" disabled={submitting} className="submit-btn">
              {submitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        )}

        <div className="appointments-list">
          <h2>Scheduled Appointments</h2>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-header">
                  <h3>Appointment #{appointment.id}</h3>
                  <span className={`status ${appointment.status?.toLowerCase() || 'scheduled'}`}>
                    {appointment.status || 'Scheduled'}
                  </span>
                </div>
                <div className="appointment-details">
                  {appointment.doctorName && (
                    <p><strong>👨‍⚕️ Doctor:</strong> Dr. {appointment.doctorName}</p>
                  )}
                  {appointment.doctorId && !appointment.doctorName && (
                    <p><strong>👨‍⚕️ Doctor ID:</strong> {appointment.doctorId}</p>
                  )}
                  {appointment.date && (
                    <p><strong>📅 Date & Time:</strong> {new Date(appointment.date).toLocaleString()}</p>
                  )}
                  {appointment.reason && (
                    <p><strong>📝 Reason:</strong> {appointment.reason}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">
              <p>No appointments scheduled. <button onClick={() => setShowForm(true)} style={{cursor: 'pointer', background: 'none', border: 'none', color: '#667eea', textDecoration: 'underline', padding: 0}}>Book one now!</button></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
