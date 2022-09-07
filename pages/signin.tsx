import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../libs/store";
import { AuthSelector } from "../libs/store/Auth/selectors";
import { ErrorEnum } from "../libs/models/error-enums";
import { clearAuthError, signInWithEmailAndPassword } from "../libs/store/Auth/actions";
import Loader from "../components/widgets/loader";
import { FormatAlignCenterOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import { UserType } from "../libs/models/auth/AuthModels";

const Signin: React.FC = () => {
   const [password, setPassword] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [isLogingIn, setIsLogingIn] = useState<boolean>(false);
   const [errors, setErrors] = useState<string>('');
   const router = useRouter();   
   const [activeStatus, setActiveStatus] = useState(1);

   const { isAuthenticated, error, isLoading, user } = useAppSelector(AuthSelector);
   const dispatch: any = useAppDispatch();

   useEffect(() => {
      const returnUrl = router.query['returnUrl'];
      isAuthenticated && returnUrl && router.push(`${returnUrl}`);

      isAuthenticated && !returnUrl && (user?.userType == UserType.ShopOwner) && router.push('/shop');
      isAuthenticated && !returnUrl && (user?.userType == UserType.FreeUser) && router.push('/');
   }, [isAuthenticated]);

   useEffect(() => {
    if (error?.code === ErrorEnum.EmailNotConfirmed) {
       router.push({
          pathname: '/auth/emailnotconfirmed',
          query: {
             email: email,
          },
       });
      }
    }, [error]);

    useEffect(() => {
        dispatch(clearAuthError());
    }, []);

    useEffect(() => {
      if(user !== null){
        setIsLogingIn(!isLogingIn);
      }
    }, [user]);

    const submitForm = async () => {
      if(!email && !password){        
        setErrors('A valid email and password is required');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errors
        });
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setErrors('Invalid email address');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errors,
          confirmButtonText: 'OK',
           confirmButtonColor: 'rgb(249 115 22)',
        });
      }
      else{
        setIsLogingIn(!isLogingIn);
        dispatch(signInWithEmailAndPassword({ email, password }));
      }

    };


    return (
        <>  
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
          <div className="relative max-w-xl mx-auto">
            <svg
              className="absolute left-full -top-12 transform translate-x-1/2"
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
              className="absolute right-full -top-12 bottom-0 transform -translate-x-1/2"
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
            <div className="h-full min-h-full flex justify-center">          
              <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">               
                <div className="mx-auto w-full max-w-sm lg:w-96">
                  <div className="hover:cursor-pointer">
                    <Link href="/">
                      <img
                          src="cloud-stores.png"
                          width={70}
                          height={70}
                          alt="Cloud Stores Malawi Logo"
                          />
                    </Link>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                      Or{' '}
                      <Link href="/signup">
                        <a className="font-medium text-orange-600 hover:text-orange-500">
                          Create account
                        </a>
                      </Link>
                    </p>
                  </div>              
                  <div className="mt-8">
                      <div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Sign in with</p>
                          <div className="mt-1 grid grid-cols-3 gap-3">
                            <div>
                              <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                                <span className="sr-only">Sign in with Facebook</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                            </div>

                            <div>
                              <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                                <span className="sr-only">Sign in with Twitter</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                              </a>
                            </div>

                            <div>
                              <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                                <span className="sr-only">Sign in with Google</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"  viewBox="0 0 24 24" width="24px" height="24px">    
                                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className="mt-6">
                    <div className="mt-4">                 
                      <div className="">
                        <form 
                          onSubmit={(evt) => {
                            evt.preventDefault();
                            submitForm();
                          }}
                          className="space-y-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email address
                            </label>
                            <div className="mt-1">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(evt) => setEmail(evt.target.value) }
                                autoComplete="email"
                                className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                focus:ring-orange-500 focus:border-orange-500`}
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Password
                            </label>
                            <div className="mt-1">
                              <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(evt) => setPassword(evt.target.value) }
                                autoComplete="password"
                                required
                                className={`appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                  focus:ring-orange-500 focus:border-orange-500
                                `}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                              </label>
                            </div>

                            <div className="text-sm">
                              <Link href="/auth/recover-password">
                                <a className="font-medium text-orange-600 hover:text-orange-500">
                                  Forgot your password?
                                </a>
                              </Link>
                            </div>
                          </div>
                          <div>
                            <button
                              type="submit"
                              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                              Sign in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="hidden lg:block relative w-0 flex-1">
                <Image
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/backgrounds/bg-2.jpg"
                  layout='fill'
                  alt="Cloud Store Malawi"
                />
              
              </div> */}
              {
                isLogingIn ? <Loader /> : (<></>)
              }
            </div> 
          </div>
        </div>   
        
        </>
    )
};

export default Signin;