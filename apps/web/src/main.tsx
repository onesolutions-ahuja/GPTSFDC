import React from "react";
import {createRoot} from "react-dom/client";
import "./style.css";
function App(){
 const modules=["Object Manager","Page Builder","Dashboard Builder","Report Builder","Flow Builder","RBAC"];
 return <div className="shell"><header><strong>GPTSFDC</strong><span>Platform foundation</span></header><main><h1>Application workspace</h1><p>The metadata platform is under construction. Modules below are not yet operational.</p><section>{modules.map(name=><article key={name}><h2>{name}</h2><p>Not implemented</p></article>)}</section></main></div>;
}
createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
