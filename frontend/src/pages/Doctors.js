import { useEffect, useState } from 'react';
import { doctorAPI } from '../services/api';
import './Doctors.css';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await doctorAPI.getAll();
      console.log('Doctors response:', response);
      
      if (Array.isArray(response)) {
        setDoctors(response);
      } else if (response.data && Array.isArray(response.data)) {
        setDoctors(response.data);
      } else {
        setDoctors([]);
        setError('No doctors found');
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch doctors');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page">
        <h1>Doctors</h1>
        {error && <div className="error-message">{error} <button onClick={fetchDoctors} style={{marginLeft: '10px'}}>Retry</button></div>}
        
        {loading && <div className="loading">Loading doctors...</div>}
        
        {!loading && (
          <div className="doctors-grid">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-header">
                    <h3>Dr. {doctor.name}</h3>
                  </div>
                  <div className="doctor-info">
                    <p><strong>Specialty:</strong> {doctor.specialty || 'General Practice'}</p>
                    <p><strong>Email:</strong> {doctor.email || 'N/A'}</p>
                    {doctor.bio && <p><strong>Bio:</strong> {doctor.bio}</p>}
                  </div>
                  <button className="book-btn">Book Appointment</button>
                </div>
              ))
            ) : (
              <div className="no-data">
                <p>No doctors available at the moment</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Doctors;
