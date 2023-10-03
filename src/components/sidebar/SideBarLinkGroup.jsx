import { useState } from 'react'

function SideBarLinkGroup({ children, activeCondition }) {
  const [open, setOpen] = useState(activeCondition);
  
  const handleCLick = () => {
    setOpen(!open)
  }

  return <li>{ children(handleCLick, open) }</li>
}

export default SideBarLinkGroup