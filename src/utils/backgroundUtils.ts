import { CategoryType } from "@/components/CategorySelector";

export const getBackgroundClass = (category: CategoryType): string => {
  const backgrounds = {
    grocery: "from-green-100 via-emerald-50 to-teal-100",
    travel: "from-blue-100 via-sky-50 to-indigo-100",
    meal: "from-orange-100 via-amber-50 to-yellow-100",
    budget: "from-purple-100 via-violet-50 to-indigo-100",
    event: "from-pink-100 via-rose-50 to-red-100",
    bucket: "from-indigo-100 via-blue-50 to-sky-100",
    party: "from-fuchsia-100 via-pink-50 to-rose-100",
    custom: "from-purple-100 via-pink-50 to-blue-100"
  };
  
  return backgrounds[category] || backgrounds.custom;
};