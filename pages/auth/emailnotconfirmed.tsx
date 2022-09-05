import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { ApiResponse } from "../../libs/models/auth/AuthModels";
import { authClient } from "../../libs/services/AuthService/authClients";
import { useAppSelector } from "../../libs/store";
import { AuthSelector } from "../../libs/store/Auth/selectors";


const EmailNotConfirmed = () => {
    const [isMailSent, setIsMailSent] = useState<boolean>(false);
   const router = useRouter();
   const resendEmail = async () => {
      const email = router.query['email'];
      // console.log(router.query);
      
      await authClient.post<ApiResponse>('SendActivationEmail', { email });
      setIsMailSent(true);

      if(isMailSent){
        Swal.fire({
          title: "Success",
          text: "Activation code sent to your email",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: 'rgb(234, 88, 12)',
        })
        .then(function (result) {
          if (result.value) {
              router.push({
                  pathname: '/auth/email-confirmation',
                  query: {
                     email: email,
                  },
               });
          }
        });
      }
    
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
          <div className="mt-12">
            <div className="col-span-12">
            <div className="mt-5">
                <h1 className="col-span-12 mt-4 text-lg text-gray-500">Email not confirmed. Please check your email and spam folder.</h1>
            </div>
            <div className="mt-5">
                <button 
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" onClick={resendEmail}>
                    Resend Email
                </button>
            </div>
                {/* <small className='col-span-12 text-danger d-block mt-6'>{isMailSent && "Activation mail sent!"}</small> */}
            </div>
            <div className="mt-5">
              <Link href={`/auth/email-confirmation?email=${router.query['email']}`} >
                <a className="font-medium text-orange-600 hover:text-orange-500">
                  <span className="inset-0" aria-hidden="true" />
                  Confirm your email
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
      </>
   );
};

export default EmailNotConfirmed;