import React from "react";
import "./TenantList.css"; // ✅ Import the CSS file

const TenantList = ({ tenants }) => {
  return (
    <div className="tenant-list-container">
      <h2 className="tenant-list-title">Tenants</h2>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id} className="tenant-item">
            <h3 className="tenant-name">{tenant.name}</h3>
            <p className="tenant-contact">{tenant.email}</p>
            <p className="tenant-contact">{tenant.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantList;
