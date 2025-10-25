"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface MyListContextType {
  myList: string[];
  toggleItem: (id: string) => void;
  isInList: (id: string) => boolean;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myListItems") || "[]");
    setMyList(stored);
  }, []);

  const toggleItem = (id: string) => {
    let updated: string[];

    if (myList.includes(id)) {
      updated = myList.filter((itemId) => itemId !== id);
    } else {
      updated = [...myList, id];
    }

    setMyList(updated);
    localStorage.setItem("myListItems", JSON.stringify(updated));
  };

  const isInList = (id: string) => {
    return myList.includes(id);
  };

  return (
    <MyListContext.Provider value={{ myList, toggleItem, isInList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = (): MyListContextType => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error("useMyList debe estar dentro de MyListProvider");
  }
  return context;
};
