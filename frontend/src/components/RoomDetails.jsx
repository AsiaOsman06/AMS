import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RoomDetails.css";

const RoomDetails = () => {
  const { roomNumber } = useParams();
  const navigate = useNavigate(); // ✅ moved inside the component
  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5002/api/room-details/${roomNumber}`
        );
        setDetails(res.data);
      } catch (err) {
        setError("Unable to load room availability.");
      }
    };

    fetchDetails();
  }, [roomNumber]);

  return (
    <div className="room-details-container">
      <h2>Available Apartments for Room Plan #{roomNumber}</h2>
      {error && <p className="error">{error}</p>}

      <table className="availability-table">
        <thead>
          <tr>
            <th>Apartment</th>
            <th>Sq.Ft.</th>
            <th>Rent</th>
            <th>Date Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {details.map((apt) => (
            <tr key={apt.apartmentID}>
              <td>{apt.apartmentID}</td>
              <td>{apt.squareFeet}</td>
              <td>
                ${apt.minRent}–${apt.maxRent}
              </td>
              <td style={{ color: "green" }}>Available</td>
              <td>
                <button
                  className="apply-btn"
                  onClick={() =>
                    navigate(
                      `/apply?building=Building+1&room=${apt.apartmentID}`
                    )
                  }
                >
                  Apply Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomDetails;
