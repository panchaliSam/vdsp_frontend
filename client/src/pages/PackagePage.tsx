import React, { useState, useEffect } from "react";
import { packageApi } from "../utils/api";

const PackagesPage = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: 0,
    noOfPhotos: 0,
  });
  const [editPackage, setEditPackage] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch packages on page load
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await packageApi.getPackages();
        if (Array.isArray(data)) {
          setPackages(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error(err); // Log the error
        setError("Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Create a new package
  const handleCreatePackage = async () => {
    setLoading(true);
    setError("");
    try {
      await packageApi.createPackage(newPackage);
      setNewPackage({ name: "", price: 0, noOfPhotos: 0 });
      const updatedPackages = await packageApi.getPackages();
      setPackages(updatedPackages);
    } catch (err) {
      console.error(err); // Log the error
      setError("Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing package
  const handleEditPackage = async () => {
    if (!editPackage) return;
    setLoading(true);
    setError("");
    try {
      await packageApi.updatePackage(editPackage.id, {
        name: editPackage.package_name,
        price: editPackage.package_price,
        noOfPhotos: editPackage.no_of_photos,
      });
      const updatedPackages = await packageApi.getPackages();
      setPackages(updatedPackages);
      setEditPackage(null); // Reset the editing state
    } catch (err) {
      console.error(err); // Log the error
      setError("Failed to update package");
    } finally {
      setLoading(false);
    }
  };

  // Delete a package
  const handleDeletePackage = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      await packageApi.deletePackage(id);
      const updatedPackages = await packageApi.getPackages();
      setPackages(updatedPackages);
    } catch (err) {
      console.error(err); // Log the error
      setError("Failed to delete package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Packages Management</h1>

      {/* Error message */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Display package list */}
      <h2>Package List</h2>
      <ul>
        {Array.isArray(packages) &&
          packages.map((pkg) => (
            <li key={pkg.id}>
              <strong>{pkg.package_name}</strong> - ${pkg.package_price} -{" "}
              {pkg.no_of_photos} Photos
              <button onClick={() => setEditPackage(pkg)}>Edit</button>
              <button onClick={() => handleDeletePackage(pkg.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>

      {/* Add new package */}
      <h2>Create Package</h2>
      <input
        type="text"
        value={newPackage.name}
        placeholder="Package Name"
        onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
      />
      <input
        type="number"
        value={newPackage.price}
        placeholder="Price"
        onChange={(e) =>
          setNewPackage({ ...newPackage, price: parseFloat(e.target.value) })
        }
      />
      <input
        type="number"
        value={newPackage.noOfPhotos}
        placeholder="Number of Photos"
        onChange={(e) =>
          setNewPackage({ ...newPackage, noOfPhotos: parseInt(e.target.value) })
        }
      />
      <button onClick={handleCreatePackage}>Create Package</button>

      {/* Edit existing package */}
      {editPackage && (
        <div>
          <h2>Edit Package</h2>
          <input
            type="text"
            value={editPackage.package_name}
            onChange={(e) =>
              setEditPackage({ ...editPackage, package_name: e.target.value })
            }
          />
          <input
            type="number"
            value={editPackage.package_price}
            onChange={(e) =>
              setEditPackage({
                ...editPackage,
                package_price: parseFloat(e.target.value),
              })
            }
          />
          <input
            type="number"
            value={editPackage.no_of_photos}
            onChange={(e) =>
              setEditPackage({
                ...editPackage,
                no_of_photos: parseInt(e.target.value),
              })
            }
          />
          <button onClick={handleEditPackage}>Update Package</button>
          <button onClick={() => setEditPackage(null)}>Cancel Edit</button>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;
