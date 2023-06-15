import {
  GiShorts,
  GiTrousers,
  GiTravelDress,
  GiGemNecklace,
  GiLipstick,
  GiPhotoCamera,
  GiVibratingSmartphone,
  GiBigDiamondRing,
} from "react-icons/gi";
import { TbBabyCarriage } from "react-icons/tb";
import { MdOutlineSportsBaseball, MdOutlineKitchen } from "react-icons/md";
import { FcElectronics } from "react-icons/fc";
import { IoConstructOutline, IoShirtOutline } from "react-icons/io5";

export const convertSelectedImageToBase64 = (
  file: File,
  cbfunction: Function
) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cbfunction(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export const MalawiDistricts = [
  "City",
  "Dedza",
  "Dowa",
  "Kasungu",
  "Lilongwe",
  "Mchinji",
  "Nkhotakota",
  "Ntcheu",
  "Ntchisi",
  "Salima",
  "Chitipa",
  "Karonga",
  "Likoma",
  "Mzimba",
  "Nkhata Bay",
  "Rumphi",
  "Balaka",
  "Blantyre",
  "Chikwawa",
  "Chiradzulu",
  "Machinga",
  "Mangochi",
  "Mulanje",
  "Mwanza",
  "Nsanje",
  "Thyolo",
  "Phalombe",
  "Zomba",
  "Neno",
];

export const MalawiRegions = [
  "Region",
  "Central Region",
  "Northern Region",
  "Southern Region",
];

export const ProductCategories = [
  { name: "Jewelry", icon: <GiBigDiamondRing /> },
  { name: "Women fashion", icon: <GiTravelDress /> },
  {
    name: "Men fashion",
    icon: <IoShirtOutline />,
  },
  {
    name: "Kids fashion",
    icon: <TbBabyCarriage />,
  },
  { name: "Beauty and hair", icon: <GiLipstick /> },
  { name: "Sports", icon: <MdOutlineSportsBaseball /> },
  { name: "Consumer electronics", icon: <GiPhotoCamera /> },
  { name: "Telecommunications", icon: <GiVibratingSmartphone /> },
  { name: "Kitchen ware", icon: <MdOutlineKitchen /> },
  { name: "Construction", icon: <IoConstructOutline /> },
];
