import React, { ReactElement, useEffect } from "react";
import { withRouter, useRouter } from "next/router";
import { NextPageWithLayout } from "../../pages/_app";
import { AuthSelector } from "../../libs/store/Auth/selectors";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import Navigation from "../widgets/navigation";
import Footer from "../widgets/footer";
import LoginNav from "../widgets/loginnav";

interface ShopProps {
  children?: React.ReactNode;
}

const ClientLayout: NextPageWithLayout<ShopProps> = ({
  children,
}: ShopProps) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { user } = useAppSelector(AuthSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <>
      {/* <LoginNav /> */}
      <Navigation />
      <main className=" bg-gray-50">{children}</main>
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default ClientLayout;
