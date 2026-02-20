import com1 from "@/assets/company/com1.png";
import com2 from "@/assets/company/com2.png";
import com3 from "@/assets/company/com3.png";
import com4 from "@/assets/company/com4.png";
import com5 from "@/assets/company/com5.png";
import { StaticImageData } from "next/image";

export interface Company {
  name: string;
  logo: StaticImageData;
}

// 2. Typed array of companies
export const companies: Company[] = [
  { name: "Arksh Agro", logo: com1 },
  { name: "Lakus Trading House", logo: com2 },
  { name: "Himalayan Organic Agro", logo: com3 },
  { name: "Urban Earth", logo: com4 },
  { name: "Hotel Rara", logo: com5 },
];
