import * as React from 'react';
import { useContext } from 'react';


type User = {
  name: string,
  id?: string
}

type News = {
  title: string,
  id?: string
}

const defaultUser = null ;
const defaultNews = null ;
const UserContex = React.createContext<User | null>(defaultUser);
const NewsContex = React.createContext<News | null>(defaultNews);
export default function Index(){
  return (
    <UserContex.Provider value={{name: 'LightXJ'}}>
      <NewsContex.Provider value={{title: 'Hello useContext'}}>
        <ChildComponent />
      </NewsContex.Provider>
    </UserContex.Provider>
  )
}

function ChildComponent(){
  const user = useContext(UserContex);
  const news = useContext(NewsContex);
  return (
    <div>{user?.name} - {news?.title}</div>
  )
}

 Index;