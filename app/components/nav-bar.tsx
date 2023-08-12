'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { BiSolidUserCircle } from 'react-icons/bi';
import { CgMenuRightAlt } from 'react-icons/cg';

export default function NavBar() {
  return (
    <header className="px-8 py-3 border-b bg-white flex justify-between items-center">
      <div className="flex gap-2 cursor-pointer">
        Icon
        <p>res2earn</p>
      </div>

      <nav className='flex items-center gap-10'>
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="light"
            >
              <CgMenuRightAlt size={35} className='text-gray-500' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="light"
              color="primary"
            >
              <BiSolidUserCircle size={35} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </nav>
    </header>
  )
}