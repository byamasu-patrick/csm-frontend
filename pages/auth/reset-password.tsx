import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, withRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { resetPasswordAction } from "../../libs/store/Auth";
import { useAppDispatch } from "../../libs/store";

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<string>('');
    const router = useRouter(); 
    const [resetPassword, setResetPassword] = useState<string>('');
    
    const dispatch: any = useAppDispatch();

    const changePassword = () => {
      if(!newPassword && !confirmPassword){        
        setErrors('The new password fiels cannot be empty');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errors
        });
      }
      else if(newPassword !== confirmPassword){ 
        setErrors('The passwords entered do not match');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errors
        });
      }
      else{
        
        dispatch(resetPasswordAction({
          password: newPassword,
          token: resetPassword 
        }));
        router.push(`/signin`);
      }

    }

    return (
      <>        
        <div>
          <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
            <div className="relative max-w-xl mx-auto">
              <svg
                className="absolute left-full transform translate-x-1/2"
                width={404}
                height={404}
                fill="none"
                viewBox="0 0 404 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="85737c0e-0916-41d7-917f-596dc7edfa27"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
              </svg>
              <svg
                className="absolute right-full bottom-0 transform -translate-x-1/2"
                width={404}
                height={404}
                fill="none"
                viewBox="0 0 404 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="85737c0e-0916-41d7-917f-596dc7edfa27"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
              </svg>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
                  Create new password
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">

                </p>
              </div>
              <div className="mt-12">                
                <form 
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    changePassword();
                  }}
                  className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"> 
                  <div className="sm:col-span-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(evt) => setNewPassword(evt.target.value)}
                        autoComplete="password"
                        required                              
                        className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}    
                      />
                    </div>
                    <div className="flex items-center mt-1">
                      <input
                        id="show-password"
                        name="show-password"
                        type="checkbox"
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="show-password" className="ml-2 block text-sm text-gray-900">
                        show password
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm password
                    </label>
                    <div className="mt-1">

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                        required                              
                        className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                        `}
                      />
                    </div>                    
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="reset-password" className="block text-sm font-medium text-gray-700">
                      Reset Code
                    </label>
                    <div className="mt-1">

                      <input
                        id="reset-password"
                        name="reset-password"
                        type="text"
                        value={resetPassword}
                        onChange={(evt) => setResetPassword(evt.target.value)}
                        required                              
                        className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                        `}
                      />
                    </div>                    
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-start">                          
                      <div className="ml-3">
                        <p className="text-base text-gray-500">
                          Reset your password,  or{' '}
                              <Link href="/signin">
                                  <a className="font-medium text-orange-600 hover:text-orange-500">
                                  Sign in
                                  </a>
                              </Link>
                        </p>                               
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-5">
                <Link href="/signin" >
                  <a className="font-medium text-orange-600 hover:text-orange-500">
                    <span className="inset-0" aria-hidden="true" />
                    Go back to sign in page
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
              </div>
            </div>
          </div>
      </>
    )
};

export default ResetPassword;