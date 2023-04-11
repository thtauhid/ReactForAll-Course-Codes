import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return <div className='flex items-center'>{props.children}</div>;
}
