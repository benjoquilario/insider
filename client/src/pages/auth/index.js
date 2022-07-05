import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Ripples from 'react-ripples';
import { signin, signup } from '../../actions/auth';
import Input from '../../components/UI/Input';
import AuthLoading from '../../components/UI/Loading/AuthLoading';
import { initialForm } from '../../utilities/intialState';
import { CLEAR_ERROR } from '../../constants/ActionTypes';

const Auth = () => {
  const { errors, isLoading } = useSelector(state => state.auth);
  const [formData, setFormData] = useState(initialForm);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('profile'))
      return navigate('/', { replace: true });
  }, [navigate, location]);

  const switchMode = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
    dispatch({ type: CLEAR_ERROR });
    setFormData(initialForm);
  };

  const handleChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();

    if (isSignup) dispatch(signup(formData, navigate));
    else dispatch(signin(formData, navigate));
  };

  return (
    <div className="flex items-center justify-center h-full w-full min-h-screen">
      <div className="flex flex-col items-center justify-center max-w-full md:max-w-[400px] mx-auto mt-0 min-h-[430px] md:min-h-auto bg-white w-4/5 md:w-full py-[20px] px-[24px] md:px-[40px] text-center rounded-md shadow-md">
        <h1 className="text-2xl mt-[13px] mb-[20px] font-semibold text-gray-900">
          {isSignup ? (
            <div className="flex flex-col">
              <span className="text-base font-light tracking-tight">
                Create Account
              </span>
              <span className="text-lg font-normal tracking-wide">
                Create a new account
              </span>
            </div>
          ) : (
            <div className="flex flex-col ">
              <span className="text-base font-light tracking-tight">
                Welcome to Back!
              </span>
              <span className="text-lg font-normal tracking-wide">
                Sign in to your account
              </span>
            </div>
          )}
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center">
            {isSignup && (
              <div className="flex gap-2 w-full">
                <div className="flex flex-col items-start w-full mb-[8px]">
                  <Input
                    handleChange={handleChange}
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                    classes={`border border-gray-300 hover:border-gray-700 ${
                      errors?.firstName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  />

                  <p className="text-red-400 text-xs">{errors?.firstName}</p>
                </div>
                <div className="flex flex-col items-start w-full mb-[8px]">
                  <Input
                    handleChange={handleChange}
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    classes={`border border-gray-300 hover:border-gray-700 ${
                      errors?.lastName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  />
                  <p className="text-red-400 text-xs">{errors?.lastName}</p>
                </div>
              </div>
            )}
            <div className="flex flex-col items-start w-full mb-[8px]">
              <Input
                handleChange={handleChange}
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                classes={`border border-gray-300 hover:border-gray-700 ${
                  errors?.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              <p className="text-red-400 text-xs">{errors?.email}</p>
            </div>
            <div className="flex flex-col items-start w-full mb-[8px]">
              <Input
                handleChange={handleChange}
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                classes={`border border-gray-300 hover:border-gray-700 ${
                  errors?.password
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors?.password && (
                <p className="text-red-400 text-xs">{errors?.password}</p>
              )}
            </div>
            {isSignup && (
              <div className="flex flex-col items-start w-full mb-[8px]">
                <Input
                  handleChange={handleChange}
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  classes={`border border-gray-300 hover:border-gray-700 ${
                    errors?.password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
                <p className="text-red-400 text-xs">{errors?.password}</p>
              </div>
            )}
            <div className="mt-3 w-full">
              <Ripples color="#ffffff80" className="w-full">
                <button
                  type="submit"
                  className="inline-block bg-[#6a55fa] hover:bg-[#816ffb] text-sm font-semibold py-[9px] px-[30px] w-full rounded text-white text-center focusBtn"
                >
                  {isLoading ? (
                    <AuthLoading />
                  ) : (
                    <>{isSignup ? 'Sign Up' : 'Sign In'}</>
                  )}
                </button>
              </Ripples>
            </div>
            <button
              type="button"
              onClick={switchMode}
              className="flex items-center justify-center text-xs mt-[30px] text-[#8596A5]"
            >
              {isSignup ? (
                <>
                  Already have an account?
                  <span className="ml-1 text-[#3DB4F2]">Sign in</span>
                </>
              ) : (
                <>
                  Don't have an account?
                  <span className="ml-1 text-[#3DB4F2]">Sign Up</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
