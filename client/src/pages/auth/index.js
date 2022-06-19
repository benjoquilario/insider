import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import Input from '../../components/Input';
import { initialForm } from '../../utilities/intialState';

const Auth = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('profile')) return navigate('/', location.search);
  }, [navigate, location]);

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
  };

  const handleChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();

    if (isSignup) dispatch(signup(formData, navigate, location));
    else dispatch(signin(formData, navigate, location));
  };

  return (
    <div className="flex items-center justify-center h-full w-full min-h-screen">
      <div className="flex flex-col items-center justify-center max-w-full md:max-w-[400px] mx-auto mt-0 min-h-[430px] md:min-h-auto bg-white w-4/5 md:w-full py-[20px] px-[40px] text-center rounded">
        <h1 className="text-2xl mt-[13px] mb-[20px] font-semibold text-gray-900">
          {isSignup ? 'Sign Up to Insider' : 'Sign In to Insider'}
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center">
            {isSignup && (
              <div className="flex gap-2">
                <Input
                  handleChange={handleChange}
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                />
                <Input
                  handleChange={handleChange}
                  type="text"
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </div>
            )}
            <Input
              handleChange={handleChange}
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
            />
            <Input
              handleChange={handleChange}
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
            />
            {isSignup && (
              <Input
                handleChange={handleChange}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
              />
            )}
            <button
              type="submit"
              className="inline-block bg-[#6a55fa] text-sm font-semibold py-[8px] px-[30px] mt-2 w-full rounded text-white"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={switchMode}
              className="flex items-center justify-center text-sm mt-[30px] text-[#8596A5]"
            >
              Not registered?
              <span className="ml-1 text-[#3DB4F2]">Create an account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
