import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, withRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../libs/store";
import { AuthSelector } from "../libs/store/Auth/selectors";
import { clearAuthError, registerWithEmailAndPassword } from "../libs/store/Auth/actions";

const Signup: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const { isAuthenticated, error, isLoading } = useAppSelector(AuthSelector);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
     isAuthenticated && router.push('/');
  }, [isAuthenticated]);

  useEffect(() => {
     dispatch(clearAuthError());
  }, []);

  const submitForm = async (email:string , firstName: string, lastName: string, password: string) => {
    //  event.preventDefault();
     var result = await dispatch(
        registerWithEmailAndPassword({
           email,
           password,
           firstName,
           lastName,
        })
     );
     console.log(result);
     if (result.meta.requestStatus !== 'rejected')
        router.push({
           pathname: '/auth/emailnotconfirmed',
           query: {
              email: email,
           },
        });
  };

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
                  Sign up for a new account
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">

                </p>
              </div>
              <div className="mt-12">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    status: false,
                  }}
                  onSubmit={(data, { resetForm }) => {                    
                    
                    submitForm(data.email, data.firstName,
                      data.lastName, data.password);
                    resetForm({ values: {
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      status: false
                    } });
                  }}
                >
                  {({ touched, errors, isSubmitting, values }) => (
                    <div className="">
                      <Form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" >
                        <div className="sm:col-span-2">
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <div className="mt-1">
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                              autoComplete="firstName"
                               className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                ${touched.firstName &&
                                    errors.firstName
                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                    : "focus:ring-orange-500 focus:border-orange-500"
                                  }`}
                              placeholder="Donald"
                              // value={firstName}
                              // onChange={(event: any) => setEmail(event.target.value)}
                            />
                            <ErrorMessage
                              component="span"
                              name="firstName"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">

                            <Field
                              id="lastName"
                              name="lastName"
                              type="text"
                              placeholder="Phiri"
                              autoComplete="lastName"                              
                              className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                              ${touched.lastName &&
                                  errors.lastName
                                  ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                  : "focus:ring-orange-500 focus:border-orange-500"
                                }`}
                            />
                            <ErrorMessage
                              component="span"
                              name="lastName"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1">
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              placeholder="donald.phiri@gmail.com"
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
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <div className="mt-1">
                            <Field
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="password"
                              placeholder="Donald@2022"
                              required                              
                              className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                              ${touched.password &&
                                  errors.password
                                  ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                  : "focus:ring-orange-500 focus:border-orange-500"
                                }`}
                            />
                            <ErrorMessage
                              component="span"
                              name="password"
                              className="invalid-feedback"
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

                            <Field
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              placeholder="Donald@2022"
                              autoComplete="confirmPassword"
                              required                              
                              className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                              ${touched.confirmPassword &&
                                  errors.confirmPassword
                                  ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                  : "focus:ring-orange-500 focus:border-orange-500"
                                }`}
                            />
                            <ErrorMessage
                              component="span"
                              name="confirmPassword"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                             
                            </div>
                            <div className="ml-3">
                              <p className="text-base text-gray-500">
                                By signing up , you agree to the{' '}
                                <a href="#" className="font-medium text-gray-700 underline">
                                  Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a href="#" className="font-medium text-gray-700 underline">
                                  Cookie Policy
                                </a>
                                .
                              </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    Or{' '}
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
                            Sign up
                          </button>
                        </div>
                      </Form>
                    </div>
                  )}
                </Formik>
                {/* <div className="mt-5">
                  <Link href="/signin" >
                    <a className="font-medium text-orange-600 hover:text-orange-500">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Go back to sign in page
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </Link>
                </div> */}
              </div>

            </div>
          </div>
        </div>
        </>
    )
};

export default Signup;