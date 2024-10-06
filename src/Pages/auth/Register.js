// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Layout from "../../Components/Layout/AllLayout";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [question, setQuestion] = useState("");
//   const navigate = useNavigate();
//   // form fn

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`/api/v1/auth/register/`, {
//         name,
//         email,
//         password,
//         phone,
//         address,
//         question,
//       });
//       if (res && res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
//       } else {
//         toast.error("Email Already Present");
//       }
//     } catch (error) {
//       toast.error("Email Already Present");
//     }
//   };
//   return (
//     <Layout>
//       <div className="auth-body">
//         <br />
//         <div className="text-warning fs-6 fw-bold text-center">
//           खाते नोंदणी करा
//         </div>
//         <br />
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <div className="custom-container">
//             <div className="form-group">
//               <label className="form-label">User Name</label>
//               <div className="form-input mb-4">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={name}
//                   onChange={(e) => {
//                     setName(e.target.value);
//                   }}
//                   placeholder="
//                   आपले नाव लिहा"
//                   required
//                 />
//                 <i className="iconsax icons" data-icon="user-1" />
//               </div>
//               <span className="field_error text-danger" id="name_error" />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Email id</label>
//               <div className="form-input mb-4">
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                   }}
//                   id="email"
//                   placeholder="तुमचा ईमेल टाका"
//                   required
//                 />
//                 <i className="iconsax icons" data-icon="mail" />
//               </div>
//             </div>
//             <div className="form-group">
//               <label className="form-label">Password</label>
//               <div className="form-input">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                   }}
//                   id="password"
//                   placeholder="तुमचा पासवर्ड टाका"
//                   required
//                 />
//                 <i className="iconsax icons" data-icon="key" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Mobile No.</label>
//                 <div className="form-input mb-4">
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={phone}
//                     onChange={(e) => {
//                       setPhone(e.target.value);
//                     }}
//                     id="mobile"
//                     placeholder="
//                     तुमचा मोबाईल नंबर टाका."
//                     required
//                   />
//                   <i className="iconsax icons" data-icon="user-1" />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Address</label>
//                 <div className="form-input mb-4">
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={address}
//                     onChange={(e) => {
//                       setAddress(e.target.value);
//                     }}
//                     placeholder="तुमचा पत्ता प्रविष्ट करा"
//                     required
//                   />
//                   <i className="iconsax icons" data-icon="user-1" />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">Fevorite Person</label>
//                 <div className="form-input mb-4">
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={question}
//                     onChange={(e) => {
//                       setQuestion(e.target.value);
//                     }}
//                     placeholder="
//                     तुमची आवडती व्यक्ती एंटर करा"
//                     required
//                   />
//                   <i className="iconsax icons" data-icon="user-1" />
//                 </div>
//               </div>
//               <div className="contact-btn">
//                 <button type="submit" className="btn auth-btn w-100">
//                   Register
//                 </button>
//               </div>
//               <div className="division">
//                 <span>OR</span>
//               </div>
//               <h4 className="signup pt-0">
//                 Already have an account ?
//                 <NavLink to="/login/"> Sign in</NavLink>
//               </h4>
//             </div>
//             ;
//           </div>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default Register;
