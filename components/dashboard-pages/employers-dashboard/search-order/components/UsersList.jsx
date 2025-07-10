import React from "react";
import { Eye, BadgeCheck, BadgeAlert, OctagonAlert } from "lucide-react";
import { useRouter } from "next/navigation";

const UsersList = ({ users }) => {
  const router = useRouter();

  return (
    <div className="container mt-4">
      {users.length > 0 ? (
        <>
          <h4 className="mb-4">Search Results</h4>
          <div className="row">
            {users.map((candidate, index) => (
              <div
                key={candidate._id || `user-${index}`}
                className="col-md-6 col-lg-4 mb-4"
              >
                <div className="card shadow-sm h-100 border-0 rounded-4">
                  <div className="card-body">
                    <h5 className="fw-bold text-primary mb-1">
                      {candidate.candidate_name}
                    </h5>
                    <p className="text-muted small mb-2">
                      <strong>Phone:</strong> {candidate.candidate_mobile}
                    </p>

                    <ul className="list-unstyled small mb-3">
                      <li className="d-flex justify-content-between align-items-center">
                        <span>PAN:</span>
                        {renderStatusIcon(candidate.documents_verified?.pan)}
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <span>Passport:</span>
                        {renderStatusIcon(
                          candidate.documents_verified?.passport
                        )}
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <span>Aadhaar:</span>
                        {renderStatusIcon(
                          candidate.documents_verified?.aadhaar
                        )}
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <span>Driving License:</span>
                        {renderStatusIcon(
                          candidate.documents_verified?.driving_license
                        )}
                      </li>
                      <li className="d-flex justify-content-between align-items-center">
                        <span>EPIC:</span>
                        {renderStatusIcon(candidate.documents_verified?.epic)}
                      </li>
                      <li className="mt-2 text-muted">
                        <strong>Verified Date:</strong>{" "}
                        {candidate.verification_date || "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* <div className="alert alert-info text-center">No users found.</div> */}
        </>
      )}
    </div>
  );
};

// Function to render status icons
const renderStatusIcon = (status) => {
  if (status === true) {
    return <BadgeCheck size={18} className="text-success" title="Verified" />;
  }
  if (status === false) {
    return (
      <BadgeAlert size={18} className="text-danger" title="Not Verified" />
    );
  }
  return <OctagonAlert size={18} className="text-warning" title="No Data" />;
};

export default UsersList;
