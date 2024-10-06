import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const UpdateAddressForm = () => {
  const [auth, setAuth] = useAuth();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState("Home");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { address, phone, name } = auth?.user;
    setName(name);
    setAddress(address);
    setPhone(phone);
  }, [auth?.user]);

  const validate = () => {
    const validationErrors = {};
    if (!name) validationErrors.name = "Name is required.";
    if (!phone || !/^[0-9]{10}$/.test(phone))
      validationErrors.phone = "Valid phone number is required.";
    if (!address) validationErrors.address = "Address is required.";
    if (!city) validationErrors.city = "City is required.";
    if (!pin || !/^[0-9]{6}$/.test(pin))
      validationErrors.pin = "Valid 6-digit pin code is required.";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const { data } = await axios.put("/api/v1/auth/update-address", {
        name,
        address,
        phone,
        city,
        pin,
        landmark,
        addressType,
      });

      if (data.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <section className="section-b-space">
      <div className="custom-container">
        <form className="address-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <div className="form-input mb-3">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Enter your name"
                required
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="form-input mb-3">
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                placeholder="Enter your number"
                required
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone}</small>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Street Address</label>
            <div className="form-input mb-3">
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((prev) => ({ ...prev, address: "" }));
                }}
                placeholder="Enter your address"
                required
              />
              {errors.address && (
                <small className="text-danger">{errors.address}</small>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Landmark</label>
            <div className="form-input mb-3">
              <input
                type="text"
                className="form-control"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Enter your landmark"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label">City</label>
                <div className="form-input mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setErrors((prev) => ({ ...prev, city: "" }));
                    }}
                    placeholder="Enter city"
                    required
                  />
                  {errors.city && (
                    <small className="text-danger">{errors.city}</small>
                  )}
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label className="form-label">Pin Code</label>
                <div className="form-input mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setErrors((prev) => ({ ...prev, pin: "" }));
                    }}
                    placeholder="Enter pin"
                    required
                  />
                  {errors.pin && (
                    <small className="text-danger">{errors.pin}</small>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address Type</label>
            <ul className="address-type">
              <li>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="addressType"
                    value="Home"
                    checked={addressType === "Home"}
                    onChange={(e) => setAddressType(e.target.value)}
                  />
                  <label className="form-check-label">Home</label>
                </div>
              </li>
              <li>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="addressType"
                    value="Office"
                    checked={addressType === "Office"}
                    onChange={(e) => setAddressType(e.target.value)}
                  />
                  <label className="form-check-label">Office</label>
                </div>
              </li>
              <li>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="addressType"
                    value="Other"
                    checked={addressType === "Other"}
                    onChange={(e) => setAddressType(e.target.value)}
                  />
                  <label className="form-check-label">Other</label>
                </div>
              </li>
            </ul>
          </div>

          <div className="footer-modal d-flex gap-3">
            <button type="button" className="btn gray-btn btn-inline mt-0 w-50">
              Cancel
            </button>
            <button
              type="submit"
              className="theme-btn btn btn-inline mt-0 w-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateAddressForm;
