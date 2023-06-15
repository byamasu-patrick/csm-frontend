import React from "react";

type AccountTitleLayoutProps = {
  title: string;
};

function AccountTitleLayout({ title }: AccountTitleLayoutProps) {
  return (
    <div>
      <div className="w-full mt-2">
        <div className="max-w-screen-2xl px-1 md:px-2 mx-auto">
          <div className="bg-white gap-2 p-2 md:p-5">
            <h2 className="text-lg leading-5 font-medium text-gray-700">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountTitleLayout;
