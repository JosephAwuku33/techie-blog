import { IoSearchOutline } from "react-icons/io5";
import { FiTrendingUp } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import CreateBlogModal from "./CreateBlogModal";

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true); 
  const handleCloseModal = () => setIsModalOpen(false); 

  return (
    <section
      className="fixed bottom-3 bg-secondary md:bottom-auto md:left-0 w-[calc(100%-3rem)] md:mx-0 mx-6 md:w-20
     border md:border-l-0 md:border-t-0 md:border-b-0 border-primary text-white h-16 
     md:h-full flex md:flex-col items-center justify-evenly font-lexend-deca p-4"
    >

      <div className="text-center  p-2">
        <button className="bg-none">
          <IoSearchOutline color="#6EEB83" size={30} />
        </button>
        <p className="text-white text-xs">Search</p>
      </div>

      <div className="text-center  p-2">
        <button className="bg-none">
          <FiTrendingUp color="#6EEB83" size={30} />
        </button>
        <p className="text-white text-xs">Trending</p>
      </div>

      <div className="text-center  p-2">
        <button className="bg-none" onClick={handleOpenModal}>
          <FiPlusCircle color="#6EEB83" size={30}  />
        </button>
        <p className="text-white text-xs">Create</p>

        <CreateBlogModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </section>
  );
}

export default Sidebar;
