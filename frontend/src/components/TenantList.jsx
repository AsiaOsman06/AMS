import React from "react";

const TenantList = ({ tenants }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tenants</h2>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id} className="mb-2">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-xl">{tenant.name}</h3>
              <p>{tenant.email}</p>
              <p>{tenant.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantList;
