import React from "react";
import Image from "next/image";
import Link from "next/link";
import { withRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from "formik";

const RecoverPassword: React.FC = () => {
    return (
        <>            
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
                Recover password
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Enter valid email to reset password 
              </p>
            </div>
            <div className="mt-12">
                <Formik
                    initialValues={{
                        email: "donald.phiri@gmail.com",
                        status: false,
                    }}
                    onSubmit={(data, { resetForm }) => {
                    
                    }}
                    >
                    {({ touched, errors, isSubmitting, values }) => (
                    <div className="">
                      <Form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div className="sm:col-span-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1">
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                               ${touched.email &&
                                   errors.email
                                   ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                   : "focus:ring-orange-500 focus:border-orange-500"
                                 }`}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          >
                            Recover Account
                          </button>
                        </div>
                      </Form>
                    </div>
                  )}
                </Formik>    
            </div>
            <div className="flex items-center mt-5">
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
        </>
    );
};

export default RecoverPassword;