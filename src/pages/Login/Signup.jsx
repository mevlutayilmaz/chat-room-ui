import React from "react";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { signup } from "../../api/auth";

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) =>
    await signup(data.nameSurname, data.username, data.email, data.imageUrl, data.password);

  return (
    <section className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <h4 className="text-center mb-4 font-weight-bold text-uppercase text-dark">
                  Signup
                </h4>

                <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-4">
                    <label htmlFor="nameSurname" className="form-label">
                      Name Surname
                    </label>
                    <input
                      type="nameSurname"
                      {...register("nameSurname", {
                        required: "Name Surname is required",
                      })}
                      id="nameSurname"
                      className="form-control form-control"
                      placeholder="Name Surname"
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="username"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      id="username"
                      className="form-control form-control"
                      placeholder="Username"
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      id="email"
                      className="form-control form-control"
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="imageUrl" className="form-label">
                      Image Url
                    </label>
                    <input
                      type="imageUrl"
                      {...register("imageUrl", {
                        required: "Image Url is required",
                      })}
                      id="imageUrl"
                      className="form-control form-control"
                      placeholder="Image Url"
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      id="password"
                      className="form-control form-control"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary btn-lg w-100">
                      Signup
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <p className="text-muted mb-2">Or signup with</p>
                  <div className="d-flex justify-content-center">
                    <a href="#" className="text-dark mx-2">
                      <FaFacebookF size={30} />
                    </a>
                    <a href="#" className="text-dark mx-2">
                      <FaTwitter size={30} />
                    </a>
                    <a href="#" className="text-dark mx-2">
                      <FaGoogle size={30} />
                    </a>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    Have an account?{" "}
                    <a href="/login" className="text-primary">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
