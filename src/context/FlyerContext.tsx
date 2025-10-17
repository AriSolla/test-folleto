import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import type {
  Flyer,
  Business,
  Group,
  Department,
  Product,
  FlyerData
} from '../models/Flyer';

// 1️⃣ Context type
interface FlyerContextType {
  flyer: Flyer;
  business: Business;
  groups: Group[];
  departments: Department[];
  productList: Product[];
  isLoading: boolean;
  loadFlyerData: (data: FlyerData, meta:any) => void;
  flyerDataFull: FlyerData | null;
  meta: any;
}

// 2️⃣ Context default + placeholder
const FlyerContext = createContext<FlyerContextType | undefined>(undefined);

// 3️⃣ Hook SEGURO para usar el context
export const useFlyer = (): FlyerContextType => {
  const context = useContext(FlyerContext);
  if (!context) {
    throw new Error('useFlyer debe usarse dentro de FlyerProvider');
  }
  return context;
};

// 4️⃣ Provider props
interface FlyerProviderProps {
  children: ReactNode;
}

// 5️⃣ Provider real
export const FlyerProvider: React.FC<FlyerProviderProps> = ({ children }) => {
  const [flyerDataFull, setFlyerDataFull] = useState<FlyerData | null>(null);

  const [meta, setMeta] = useState<any>()

  const [flyer, setFlyer] = useState<Flyer>({
    flyer_id: "",
    hashtag: "",
    expired_date: "", 
    valid_date: "",   
    comment: "",
    banners: null,
  });

  const [business, setBusiness] = useState<Business>({
    business_id: "", 
    store_id: "",     
    address: "",
    phone: "",
    email: "",
    name: "",
    working_hour: "",
    socialMedia: null,
    active_flyer: false,
    logo_image: "",
  });

  const [groups, setGroups] = useState<Group[]>([
    {
      group_id: '-1',
      name_id: 'TODOS',
      background: null,
      icon: null,
      departments: []
    }
  ]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFlyerData = (data: FlyerData, meta?:any) => {
    setMeta(meta)
    setFlyerDataFull(data); // <--- guardamos TODO el objeto
    setFlyer(data.flyer);

    const activeBusiness = data.business.filter(b => b.active_flyer);
    setBusiness(activeBusiness[0]);
    // setBusiness(activeBusiness.length > 0 ? activeBusiness[0] : null);
    

    const allGroups: Group[] = [
      {
        group_id: '-1',
        name_id: 'TODOS',
        background: null,
        icon: null,
        departments: []
      },
      ...data.groups
    ];

    const groupIndexMap = allGroups.reduce<Record<string, number>>(
      (map, group, index) => {
        map[group.group_id] = index;
        return map;
      },
      {}
    );

    const sortedProducts = [...data.products].sort((a, b) => {
      const groupAIndex =
        a.group_id?.[0] !== undefined
          ? groupIndexMap[a.group_id[0]]
          : Number.MAX_SAFE_INTEGER;
      const groupBIndex =
        b.group_id?.[0] !== undefined
          ? groupIndexMap[b.group_id[0]]
          : Number.MAX_SAFE_INTEGER;
      return groupAIndex - groupBIndex;
    });

    setGroups(allGroups);
    setProductList(sortedProducts);
    setDepartments(data.departments);
    setIsLoading(false);
  };

  return (
    <FlyerContext.Provider
      value={{
        flyer,
        business,
        groups,
        departments,
        productList,
        isLoading,
        loadFlyerData,
        flyerDataFull,
        meta
      }}
    >
      {children}
    </FlyerContext.Provider>
  );
};
