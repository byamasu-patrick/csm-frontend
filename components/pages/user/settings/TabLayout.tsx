import React from "react";
import { Tabs } from "flowbite-react";
import AccountTitleLayout from "./AccountTitleLayout";

function TabLayout() {
  return (
    <div>
      {" "}
      <AccountTitleLayout title={"My Orders"} />
      <div className="w-full mt-2">
        <div className="max-w-screen-2xl px-1 md:px-2 mx-auto">
          <div className="bg-white gap-4 p-4 md:p-8">
            <Tabs.Group aria-label="Tabs with icons" style="underline">
              <Tabs.Item title="Profile" className="bg-red-500">
                Profile content
              </Tabs.Item>
              <Tabs.Item active={true} title="Dashboard">
                Dashboard content
              </Tabs.Item>
              <Tabs.Item title="Settings">Settings content</Tabs.Item>
              <Tabs.Item title="Contacts">Contacts content</Tabs.Item>
              <Tabs.Item disabled={true} title="Disabled">
                Disabled content
              </Tabs.Item>
            </Tabs.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabLayout;
