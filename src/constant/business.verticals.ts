import {
  AcademicCapIcon,
  CakeIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  CpuChipIcon,
  TruckIcon,
  SparklesIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  GiftIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

import { ForwardRefExoticComponent, SVGProps } from "react";

export type HeroIcon = ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;

export interface BusinessVertical {
  title: string;
  desc: string;
  icon: HeroIcon;
}

export const businessVerticals: BusinessVertical[] = [
  {
    title: "Industry",
    desc: "Dami Puff, Cookies & Biscuits",
    icon: BriefcaseIcon,
  },
  {
    title: "Food",
    desc: "Hwa Tai, Richy, Tastee, Paldo, Monarko, Didian, Savorit, Chizzpa, Shazia Rice, Glacier, Tafeli etc",
    icon: CakeIcon,
  },
  {
    title: "Beverages",
    desc: "MacCoffee, MacTea, MacCereal, Barley Chhaang, NutriRite, Klassno, Creme, Royal Premix",
    icon: BeakerIcon,
  },
  {
    title: "Automobiles",
    desc: "Higer, Golden Dragon, Jubao, Hylong, Zotye, Lifan, Jonway, Grand Tiger, Hafei Lobo",
    icon: TruckIcon,
  },
  {
    title: "Hotels & Restaurants",
    desc: "Hotel Rara, Hotel Peaceland, Kudan Restaurant & Arksh Rooftop Garden & Grill",
    icon: BuildingStorefrontIcon,
  },
  {
    title: "Beauty & Cosmetics",
    desc: "Dream Skin: Korean Skin Care, K Beauty Makeup, Hair Care & Cosmetics",
    icon: SparklesIcon,
  },
  {
    title: "Health & Wellness",
    desc: "Nirvana Physiotherapy & Wellness Center: Lazimpat, Bhaktapur",
    icon: AcademicCapIcon,
  },
  {
    title: "Tours and Travels",
    desc: "Lifestyle Holidays, Book My Ticket, Stream Travel Services",
    icon: GlobeAltIcon,
  },
  {
    title: "Biotechnology",
    desc: "Atkotiya Agro Technologies",
    icon: DevicePhoneMobileIcon,
  },
  {
    title: "Construction Materials",
    desc: "Huaxia",
    icon: BuildingOffice2Icon,
  },
  {
    title: "Electronics & Technology",
    desc: "PQI, VNPT etc",
    icon: CpuChipIcon,
  },
  {
    title: "Vending machine",
    desc: "Godrej",
    icon: GiftIcon,
  },
];
